"""Check real question/case resources and the full objective selection/report path."""
import json
import os
import shutil
import unittest
import uuid
from pathlib import Path
from unittest.mock import patch

from zhihu_mcp import tools, objectives


class ClinicalObjectives(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        cls.root = Path(__file__).parent / ('objectives-test-' + uuid.uuid4().hex)
        cls.root.mkdir()
        cls.env = patch.dict(os.environ, {'ZHIHU_SESSION_STORE': str(cls.root)})
        cls.env.start()
        cls.questions = {q['question_id']: q for level in tools.list_levels('clinical_medicine')
                         for q in tools.build_paper('clinical_medicine', level, sample=False)}

    @classmethod
    def tearDownClass(cls):
        cls.env.stop()
        shutil.rmtree(cls.root)

    def submitted_session(self):
        sid = tools.start_session('clinical_medicine')['session_id']
        paper = tools.get_pretest(sid)
        self.assertNotIn('exam_point', json.dumps(paper, ensure_ascii=False))
        result = tools.submit_pretest(sid, {})['pretest_result']
        question = result['detail'][0]
        row, status = objectives.lookup(question)
        self.assertEqual(status, 'ready')
        return sid, question, row

    def test_all_435_specific_objectives_are_bound_to_real_cases(self):
        resource = json.loads(objectives.RESOURCE.read_text(encoding='utf-8'))['objectives']
        self.assertEqual(set(resource), set(self.questions))
        self.assertEqual(len(resource), 435)
        self.assertEqual(len({r['exam_point'] for r in resource.values()}), 435)
        self.assertEqual(len({r['training_task'] for r in resource.values()}), 435)
        pool = tools._case_pool('clinical_medicine')
        for qid, question in self.questions.items():
            with self.subTest(qid=qid):
                row, status = objectives.lookup(question)
                self.assertEqual(status, 'ready')
                self.assertEqual(row['question_stem'], question['stem'])
                cid = row['case_ids'][0]
                self.assertIn(cid, pool)
                self.assertNotEqual(pool[cid].get('case_kind'), 'question_derived')
                session = {'learner_profile': {'major_id': 'clinical_medicine'},
                           'pretest_result': {'detail': [dict(question, correct=False)]}}
                active, _ = tools._case_learning_objectives(session, cid)
                self.assertEqual(active[0]['training_task'], row['training_task'])
                session['pretest_result']['detail'][0]['correct'] = True
                self.assertEqual(tools._case_learning_objectives(session, cid)[0], [])

    def test_real_submit_recommend_select_has_tasks_without_private_answers(self):
        sid, question, row = self.submitted_session()
        session, _ = tools._store().load(sid)
        payload = tools._session_payload(session)
        reason = next(r for c in payload['related_cases'] if c['case_id'] == row['case_ids'][0]
                      for r in c['recommendation_reasons'] if r['question_id'] == question['question_id'])
        self.assertEqual(reason['training_task'], row['training_task'])
        public = tools.select_training_case(sid, row['case_ids'][0])['public_case']
        active = next(r for r in public['learning_objectives'] if r['question_id'] == question['question_id'])
        self.assertEqual(active['exam_point'], row['exam_point'])
        self.assertFalse({'hidden_info', 'must_cover', 'persona', 'release_conditions'} & public.keys())
        self.assertFalse({'review_note', 'question_reference', 'correct_answer'} & active.keys())
        self.assertTrue(tools.get_sp_state(sid)['learning_objectives'])
        with self.assertRaises(tools.RuntimeErrorWithCode):
            tools.generate_training_report(sid, {question['question_id']: '不能提前获取复盘'})

    def test_shared_case_uses_each_wrong_questions_own_task(self):
        by_case = {}
        for q in self.questions.values():
            row, _ = objectives.lookup(q)
            by_case.setdefault(row['case_ids'][0], []).append(q)
        cid, questions = next((cid, qs[:2]) for cid, qs in by_case.items() if len(qs) > 1)
        tasks = []
        for question in questions:
            result, _ = tools._case_learning_objectives({'learner_profile': {'major_id': 'clinical_medicine'},
                'pretest_result': {'detail': [dict(question, correct=False)]}}, cid)
            tasks.append(result[0]['training_task'])
        self.assertNotEqual(tasks[0], tasks[1])

    def test_open_new_quiz_and_direct_practice_do_not_reuse_old_targets(self):
        sid, _, row = self.submitted_session()
        tools.get_pretest(sid)
        session, _ = tools._store().load(sid)
        self.assertEqual(tools._case_learning_objectives(session, row['case_ids'][0])[0], [])
        selected = tools.select_training_case(sid, row['case_ids'][0])['public_case']
        self.assertEqual(selected['learning_objectives'], [])
        fresh = tools.start_session('clinical_medicine')['session_id']
        self.assertEqual(tools.select_training_case(fresh, row['case_ids'][0])['public_case']['learning_objectives'], [])

    def test_missing_corrupt_and_changed_resources_preserve_basic_training(self):
        sid, question, row = self.submitted_session()
        corrupt = self.root / 'corrupt.json'
        corrupt.write_text('{invalid', encoding='utf-8')
        for path in (corrupt, self.root / 'missing.json'):
            with self.subTest(path=path), patch.object(objectives, 'RESOURCE', path):
                public = tools.select_training_case(sid, row['case_ids'][0])['public_case']
                self.assertTrue(public['clinical_data'])
                self.assertEqual(public['learning_objectives'], [])
                self.assertEqual(public['objective_resource_status'], 'unavailable')
        self.assertEqual(objectives.lookup(dict(question, stem='已修改题面'))[1], 'stale')
        self.assertEqual(objectives.lookup({'question_id': 'UNKNOWN', 'stem': '不存在'})[1], 'missing')

    def test_scored_report_persists_reasoning_without_changing_scores(self):
        sid, question, row = self.submitted_session()
        tools.select_training_case(sid, row['case_ids'][0])
        tools.advance_stage(sid, '进入对话')
        required = tools.get_sp_state(sid)['dialogue_director']['required_points']
        for i in range(8):
            tools.append_exchange(sid, f'第{i+1}轮合成病例讨论', '合成患者回复',
                covered_points=required if i == 0 else [], professional_conclusion=i == 2,
                action_plan=i == 3, teach_back=i == 6, safety_closure=i == 7)
        self.assertEqual(tools.advance_stage(sid, '结束对话，进入复盘')['stage'], 'evidence_extraction')
        tools.score_session(sid, [])
        _, directory = tools._store().load(sid)
        score_before = (directory / 'score_result.json').read_bytes()
        result = tools.generate_training_report(sid, {question['question_id']: '<script>synthetic</script>', 'UNRELATED': 'ignore'})
        self.assertEqual(score_before, (directory / 'score_result.json').read_bytes())
        report = json.loads(Path(result['report_json']).read_text(encoding='utf-8'))
        review = next(r for r in report['objective_review'] if r['question_id'] == question['question_id'])
        self.assertEqual(review['response_status'], 'submitted')
        self.assertIn('未自动判定', review['grading_status'])
        self.assertEqual(review['response'], '<script>synthetic</script>')
        html = Path(result['report_html']).read_text(encoding='utf-8')
        self.assertIn('&lt;script&gt;synthetic&lt;/script&gt;', html)
        self.assertNotIn('<script>synthetic</script>', html)
        self.assertNotIn('UNRELATED', json.dumps(report['objective_review']))

    def test_concrete_examples_are_not_generic_node_names(self):
        expected = {'Q-CM-101': '主诉书写', 'Q-WM-26-A-061': '创伤性气胸', 'Q-EN-020': 'NNT'}
        for qid, phrase in expected.items():
            row, _ = objectives.lookup(self.questions[qid])
            self.assertIn(phrase, row['exam_point'])

    def test_every_question_wrong_answer_reaches_its_real_case_and_task(self):
        # Force the draw of each REAL question; use the actual shuffler, grader,
        # persisted session, recommendation API and case selection thereafter.
        levels = {q['question_id']: level for level in tools.list_levels('clinical_medicine')
                  for q in tools.build_paper('clinical_medicine', level, sample=False)}
        sid = tools.start_session('clinical_medicine')['session_id']
        private = {'hidden_info', 'release_conditions', 'must_cover', 'persona', 'initial_state'}
        for qid, question in self.questions.items():
            with self.subTest(qid=qid):
                with patch.object(tools, 'build_paper', return_value=[question]):
                    paper = tools.get_pretest(sid, level=levels[qid])
                self.assertEqual(paper['questions'][0]['question_id'], qid)
                self.assertNotIn('learning_objectives', json.dumps(paper))
                session, _ = tools._store().load(sid)
                option_map = session['pretest_option_maps'][qid]
                wrong = next(letter for letter, stable in option_map.items() if stable != question['answer'])
                result = tools.submit_pretest(sid, {qid: wrong})['pretest_result']
                self.assertFalse(result['detail'][0]['correct'])
                row, _ = objectives.lookup(question)
                cid = row['case_ids'][0]
                payload = tools.start_session('clinical_medicine', session_id=sid)
                candidate = next(c for c in payload['related_cases'] if c['case_id'] == cid)
                reason = next(r for r in candidate['recommendation_reasons'] if r['question_id'] == qid)
                self.assertEqual(reason['exam_point'], row['exam_point'])
                self.assertEqual(reason['training_task'], row['training_task'])
                public = tools.select_training_case(sid, cid)['public_case']
                self.assertTrue(public['clinical_data'])
                self.assertFalse(private & public.keys())
                target = next(r for r in public['learning_objectives'] if r['question_id'] == qid)
                self.assertEqual(target['training_task'], row['training_task'])
                self.assertNotIn('question_reference', target)

    def test_experimental_inputs_available_before_interpretation_not_patient_facts(self):
        expected = {'CL20': '独立同步压力流量输入', 'CL145': '独立筛查人群计算输入',
                    'CL153': '独立感觉受体放电输入', 'CL207': '独立静态压力容积输入',
                    'CL213': '独立脑电记录输入', 'CL214': '独立等血糖实验输入',
                    'CL215': '独立周期时序输入', 'CL226': '独立底物与初速度表',
                    'CL307': '独立代谢实验输入'}
        sid = tools.start_session('clinical_medicine')['session_id']
        for cid, item in expected.items():
            with self.subTest(cid=cid):
                public = tools.select_training_case(sid, cid)['public_case']
                material = next(r for r in public['clinical_data'] if r['item'] == item)
                self.assertIn('非患者检查', material['note'])
                self.assertNotIn('hidden_info', public)
                full = tools.get_sp_state(sid)['case']
                if cid in ('CL20', 'CL226'):
                    self.assertTrue(full['release_conditions']['H2'][0].startswith('after_student'))
                    answer = next(h['value'] for h in full['hidden_info'] if h['id'] == 'H2')
                    self.assertNotIn(answer, json.dumps(public, ensure_ascii=False))
                if cid == 'CL307':
                    self.assertEqual(full['release_conditions']['H2'], ['ask_independent_metabolic_experiment_data'])
                    self.assertTrue(full['release_conditions']['H3'][0].startswith('after_student'))
                    self.assertIn('紧急处理', material['value'])
                if cid == 'CL153':
                    self.assertTrue(full['release_conditions']['H3'][0].startswith('after_student'))

    def test_kinetic_data_support_parameter_estimation_without_given_answers(self):
        import re
        case = tools.get_training_case('CL226', include_private=True)['case']
        text = next(r['value'] for r in case['clinical_data'] if r['item'] == '独立底物与初速度表')
        # Read the data shown to the learner, independently estimate each model
        # by a two-point reciprocal fit, and verify the intended discrimination.
        columns = re.findall(r'(?:为|依次为)([0-9.、]+)', text)
        values = [[float(n) for n in col.split('、')] for col in columns]
        self.assertEqual(len(values), 4)
        substrate, *series = values
        estimates = []
        for rates in series:
            slope = (1 / rates[2] - 1 / rates[1]) / (1 / substrate[2] - 1 / substrate[1])
            intercept = 1 / rates[2] - slope / substrate[2]
            estimates.append((slope / intercept, 1 / intercept))
        for (km, vmax), (expected_km, expected_vmax) in zip(estimates, [(2, 100), (2, 50), (1, 50)]):
            self.assertAlmostEqual(km, expected_km, delta=0.01)
            self.assertAlmostEqual(vmax, expected_vmax, delta=0.1)


if __name__ == '__main__':
    unittest.main()
