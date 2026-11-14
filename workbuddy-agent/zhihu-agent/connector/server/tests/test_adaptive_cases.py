"""Recommendation and optional quiz flow using real session and question resources."""
import os
import shutil
import sys
import unittest
import uuid
from pathlib import Path
from unittest.mock import patch

SERVER = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(SERVER))
from zhihu_mcp import tools


class AdaptiveCases(unittest.TestCase):
    def test_every_clinical_question_recommends_an_explicit_full_case(self):
        import json
        links = json.loads((SERVER / 'zhihu_mcp' / 'case_recommendation_topics.json').read_text(encoding='utf-8'))['question_case_links']
        pool = tools._case_pool('clinical_medicine')
        case_ids = set(pool)
        explicit = {}
        for link in links:
            label = link.get('label', '')
            if link.get('case_id') in case_ids and ('完整病例' in label or label.startswith(('完整教学病例', '完整教学情境'))):
                explicit.setdefault(link['question_id'], set()).add(link['case_id'])
        questions = {}
        for level in ('basic', 'intermediate', 'advanced', 'expert', 'english'):
            questions.update({q['question_id']: q for q in tools.build_paper('clinical_medicine', level, sample=False)})
        self.assertEqual(len(questions), 435)
        for qid, question in questions.items():
            with self.subTest(question=qid):
                self.assertTrue(explicit.get(qid), 'missing explicit full-case link')
                matches, _, _ = tools._weak_case_analysis(
                    {'pretest_result': {'detail': [dict(question, correct=False)]}}, pool)
                self.assertTrue(set(matches) & explicit.get(qid, set()), 'linked case not recommended')

    def test_latest_cases_can_be_selected_without_exposing_internal_fields(self):
        for number in range(291, 330):
            case_id = f'CL{number}'
            with self.subTest(case_id=case_id):
                selected = tools.select_training_case(tools.start_session('clinical_medicine')['session_id'], case_id)
                case = selected['public_case']
                self.assertEqual(case['case_id'], case_id)
                self.assertTrue(case['clinical_data'])
                self.assertFalse({'hidden_info', 'release_conditions', 'persona', 'must_cover'} & case.keys())
                self.assertIn('由你自主判断', case['task'])

    def test_new_cases_reach_review_only_after_dialogue_requirements(self):
        for case_id in ('CL291', 'CL297', 'CL307', 'CL316'):
            with self.subTest(case_id=case_id):
                sid = tools.start_session('clinical_medicine')['session_id']
                tools.select_training_case(sid, case_id)
                tools.advance_stage(sid, '进入对话')
                director = tools.get_sp_state(sid)['dialogue_director']
                required = director['required_points']
                self.assertTrue(required)
                first = tools.append_exchange(sid, '我先核实病史和当前风险。', '好的。',
                                              covered_points=required[:1])
                self.assertFalse(first['dialogue_director']['ready_to_close'])
                blocked = tools.advance_stage(sid, '结束对话，进入复盘')
                self.assertEqual(blocked['status'], 'dialogue_incomplete')
                for index in range(1, 8):
                    exchange = tools.append_exchange(
                        sid, f'第{index + 1}轮：我继续分析并讨论下一步。', '好的。',
                        covered_points=required[1:] if index == 1 else [],
                        professional_conclusion=index == 2, action_plan=index == 3,
                        teach_back=index == 6, safety_closure=index == 7)
                self.assertTrue(exchange['dialogue_director']['ready_to_close'])
                self.assertEqual(tools.advance_stage(sid, '结束对话，进入复盘')['stage'], 'evidence_extraction')
                self.assertEqual(tools.score_session(sid, [])['score_result']['status'], 'ok')

    def test_new_handover_and_treatment_cases_are_linked(self):
        expected = {'Q-EN-001': 'CL283', 'Q-EN-004': 'CL283', 'Q-EN-007': 'CL283',
                    'Q-EN-014': 'CL283', 'Q-EN-002': 'CL284', 'Q-EN-003': 'CL285',
                    'Q-EN-016': 'CL286', 'Q-EN-020': 'CL287',
                    'Q-WM-25-X-159': 'CL288', 'Q-WM-26-X-159': 'CL288',
                    'Q-WM-25-X-164': 'CL289', 'Q-WM-26-X-155': 'CL290'}
        questions = {}
        for level in ('basic', 'intermediate', 'advanced', 'expert', 'english'):
            questions.update({q['question_id']: q for q in tools.build_paper('clinical_medicine', level, sample=False)})
        pool = tools._case_pool('clinical_medicine')
        for qid, case_id in expected.items():
            with self.subTest(question=qid):
                matches, _, _ = tools._weak_case_analysis(
                    {'pretest_result': {'detail': [dict(questions[qid], correct=False)]}}, pool)
                self.assertIn(case_id, matches)
                self.assertTrue(any(reason['question_id'] == qid for reason in matches[case_id]))

    def test_new_pathology_and_urgent_cases_are_linked(self):
        expected = {'Q-WM-26-A-034': 'CL275', 'Q-WM-25-B-124': 'CL276',
                    'Q-WM-25-B-125': 'CL276', 'Q-WM-26-X-141': 'CL277',
                    'Q-WM-26-X-151': 'CL278', 'Q-WM-25-X-153': 'CL279',
                    'Q-WM-25-X-151': 'CL280', 'Q-WM-26-X-163': 'CL281',
                    'Q-WM-M27-X-161': 'CL282'}
        questions = {}
        for level in ('basic', 'intermediate', 'advanced', 'expert'):
            questions.update({q['question_id']: q for q in tools.build_paper('clinical_medicine', level, sample=False)})
        pool = tools._case_pool('clinical_medicine')
        for qid, case_id in expected.items():
            with self.subTest(question=qid):
                matches, _, _ = tools._weak_case_analysis(
                    {'pretest_result': {'detail': [dict(questions[qid], correct=False)]}}, pool)
                self.assertIn(case_id, matches)
                self.assertTrue(any(reason['question_id'] == qid for reason in matches[case_id]))

    def test_recent_clinical_cases_follow_each_wrong_question(self):
        expected = {
            'Q-WM-26-A-066': 'CL265', 'Q-WM-25-X-165': 'CL265',
            'Q-WM-26-A-067': 'CL266', 'Q-WM-M27-X-164': 'CL267',
            'Q-WM-26-X-165': 'CL267', 'Q-WM-M27-X-165': 'CL268',
            'Q-WM-26-X-158': 'CL269', 'Q-WM-M27-X-155': 'CL270',
            'Q-WM-26-X-154': 'CL271', 'Q-WM-26-A-109': 'CL272',
            'Q-WM-25-A-113': 'CL272', 'Q-WM-M27-A-109': 'CL272',
            'Q-WM-M27-A-114': 'CL273', 'Q-WM-25-A-114': 'CL273',
            'Q-WM-M27-A-112': 'CL274', 'Q-WM-26-A-112': 'CL274',
        }
        questions = {}
        for level in ('basic', 'intermediate', 'advanced', 'expert'):
            questions.update({q['question_id']: q for q in tools.build_paper('clinical_medicine', level, sample=False)})
        pool = tools._case_pool('clinical_medicine')
        for qid, case_id in expected.items():
            with self.subTest(question=qid):
                matches, _, _ = tools._weak_case_analysis(
                    {'pretest_result': {'detail': [dict(questions[qid], correct=False)]}}, pool)
                self.assertIn(case_id, matches)
                self.assertTrue(any(reason['question_id'] == qid for reason in matches[case_id]))

    def test_comparative_cases_follow_each_linked_wrong_question(self):
        expected = {
            'Q-WM-M27-B-128': 'CL255', 'Q-WM-M27-B-129': 'CL255',
            'Q-WM-M27-B-130': 'CL256', 'Q-WM-M27-B-131': 'CL256',
            'Q-WM-M27-B-134': 'CL257', 'Q-WM-M27-B-135': 'CL257',
            'Q-WM-M27-B-116': 'CL258', 'Q-WM-M27-B-117': 'CL258',
            'Q-WM-M27-B-118': 'CL259', 'Q-WM-M27-B-119': 'CL259',
            'Q-WM-M27-B-120': 'CL260', 'Q-WM-M27-B-121': 'CL260',
            'Q-WM-M27-B-122': 'CL261', 'Q-WM-M27-B-123': 'CL261',
            'Q-WM-M27-B-124': 'CL262', 'Q-WM-M27-B-125': 'CL262',
            'Q-WM-26-B-129': 'CL263', 'Q-WM-M27-A-062': 'CL264',
        }
        questions = {}
        for level in ('basic', 'intermediate', 'advanced', 'expert'):
            questions.update({q['question_id']: q for q in tools.build_paper('clinical_medicine', level, sample=False)})
        pool = tools._case_pool('clinical_medicine')
        for qid, case_id in expected.items():
            with self.subTest(question=qid):
                matches, _, _ = tools._weak_case_analysis(
                    {'pretest_result': {'detail': [dict(questions[qid], correct=False)]}}, pool)
                self.assertIn(case_id, matches)
                self.assertTrue(any(reason['question_id'] == qid for reason in matches[case_id]))

    def test_recent_physiology_and_pathology_cases_follow_wrong_answers(self):
        expected = {
            'Q-WM-M27-A-001': 'CL247', 'Q-WM-26-A-002': 'CL248',
            'Q-WM-M27-A-007': 'CL249', 'Q-WM-M27-A-012': 'CL250',
            'Q-WM-26-A-043': 'CL251', 'Q-WM-M27-A-025': 'CL252',
            'Q-WM-M27-A-026': 'CL253', 'Q-WM-M27-A-030': 'CL254',
        }
        questions = {}
        for level in ('basic', 'intermediate', 'advanced', 'expert'):
            questions.update({q['question_id']: q for q in tools.build_paper('clinical_medicine', level, sample=False)})
        pool = tools._case_pool('clinical_medicine')
        for qid, case_id in expected.items():
            with self.subTest(question=qid):
                matches, _, _ = tools._weak_case_analysis(
                    {'pretest_result': {'detail': [dict(questions[qid], correct=False)]}}, pool)
                self.assertIn(case_id, matches)
                self.assertTrue(any(reason['question_id'] == qid for reason in matches[case_id]))

    def test_new_basic_question_cases_are_recommended(self):
        questions = tools.build_paper('clinical_medicine', 'basic', sample=False)
        by_id = {q['question_id']: q for q in questions}
        for qid, case_id in [('Q-CM-209', 'CL151'), ('Q-CM-214', 'CL151'),
                             ('Q-WM-25-A-014', 'CL153'), ('Q-WM-25-A-012', 'CL156'),
                             ('Q-WM-25-A-022', 'CL197'), ('Q-WM-26-A-022', 'CL197'),
                             ('Q-WM-25-A-059', 'CL203'), ('Q-WM-26-A-009', 'CL207'),
                             ('Q-WM-26-A-007', 'CL209'), ('Q-WM-26-A-023', 'CL219'),
                             ('Q-WM-26-A-026', 'CL220'), ('Q-WM-26-A-058', 'CL225'),
                             ('Q-WM-26-A-057', 'CL229'), ('Q-WM-M27-A-015', 'CL231'),
                             ('Q-WM-M27-A-024', 'CL235'), ('Q-WM-M27-A-016', 'CL215'),
                             ('Q-WM-25-A-018', 'CL157'), ('Q-WM-25-A-025', 'CL159')]:
            with self.subTest(question=qid):
                row = dict(by_id[qid], correct=False)
                matches, _, _ = tools._weak_case_analysis(
                    {'pretest_result': {'detail': [row]}}, tools._case_pool('clinical_medicine'))
                self.assertIn(case_id, matches)
                self.assertTrue(any(reason['question_id'] == qid for reason in matches[case_id]))

    def test_complex_new_cases_follow_the_wrong_question(self):
        pool = tools._case_pool('clinical_medicine')
        for level, qid, case_id in [
            ('basic', 'Q-WM-26-A-017', 'CL159'),
            ('intermediate', 'Q-WM-25-A-044', 'CL166'),
            ('advanced', 'Q-WM-M27-A-094', 'CL161'),
            ('advanced', 'Q-WM-M27-A-097', 'CL162'),
            ('advanced', 'Q-WM-M27-A-101', 'CL163'),
            ('advanced', 'Q-WM-25-A-093', 'CL170'),
            ('intermediate', 'Q-WM-M27-B-133', 'CL170'),
            ('advanced', 'Q-WM-M27-A-088', 'CL172'),
            ('advanced', 'Q-WM-26-A-102', 'CL180'),
            ('expert', 'Q-WM-M27-X-156', 'CL177'),
            ('expert', 'Q-WM-M27-X-163', 'CL179'),
            ('intermediate', 'Q-WM-M27-B-127', 'CL183'),
            ('advanced', 'Q-WM-25-A-045', 'CL188'),
            ('intermediate', 'Q-WM-M27-A-064', 'CL189'),
            ('advanced', 'Q-WM-25-A-077', 'CL192'),
            ('expert', 'Q-WM-26-X-162', 'CL167')]:
            with self.subTest(question=qid):
                question = next(q for q in tools.build_paper('clinical_medicine', level, sample=False)
                                if q['question_id'] == qid)
                matches, _, _ = tools._weak_case_analysis(
                    {'pretest_result': {'detail': [dict(question, correct=False)]}}, pool)
                self.assertIn(case_id, matches)
                self.assertTrue(any(r['question_id'] == qid for r in matches[case_id]))

    @classmethod
    def setUpClass(cls):
        cls.root = SERVER / 'tests' / ('adaptive-' + uuid.uuid4().hex)
        cls.root.mkdir()
        cls.env = patch.dict(os.environ, {'ZHIHU_SESSION_STORE': str(cls.root)})
        cls.env.start()

    @classmethod
    def tearDownClass(cls):
        cls.env.stop()
        shutil.rmtree(cls.root)

    def test_case_only_and_abandoned_quiz(self):
        sid = tools.start_session('nursing', 'complete')['session_id']
        tools.get_pretest(sid)
        case = tools.select_training_case(sid, 'NU1')
        self.assertEqual(case['stage'], 'case_read')
        session = tools.get_session_status(sid)['session']
        self.assertFalse(session['pretest_open'])
        self.assertIsNone(session['pretest_result'])
        with self.assertRaises(Exception):
            tools.submit_pretest(sid, {})
        direct = tools.start_session('nursing', 'complete')['session_id']
        self.assertEqual(tools.select_training_case(direct, 'NU1')['stage'], 'case_read')

    def test_exact_topic_and_correct_answers(self):
        pool = tools._case_pool('medical_technology')
        row = {'question_id': 'Q-MT-102', 'node_id': 'critical_value_closed_loop',
               'correct': False, 'explanation_ref': 'K-MT-164', 'stem': '检验危急值报告'}
        result = tools._weak_case_matches({'pretest_result': {'detail': [row]}}, pool)
        self.assertTrue(result)
        self.assertTrue(any(r['kind'] == 'knowledge_ref' for reasons in result.values() for r in reasons))
        row['correct'] = True
        self.assertEqual(tools._weak_case_matches({'pretest_result': {'detail': [row]}}, pool), {})
        topic = {'question_id': 'DEMO', 'node_id': 'stroke', 'correct': False, 'stem': '脑卒中患者随访'}
        matched = tools._weak_case_matches({'pretest_result': {'detail': [topic]}}, tools._case_pool('nursing'))
        self.assertTrue(matched)
        self.assertTrue(all(r['kind'] == 'topic' for reasons in matched.values() for r in reasons))

    def test_submitted_quiz_invalidates_cached_recommendations(self):
        created = tools.start_session('medical_technology', 'complete')
        sid = created['session_id']
        paper = tools.get_pretest(sid)
        session, directory = tools._store().load(sid)
        answers = {}
        for qid, mapping in session['pretest_option_maps'].items():
            question = next(q for q in tools.build_paper('medical_technology', session['pretest_level'], question_ids=[qid]))
            answers[qid] = next(display for display, stable in mapping.items() if stable not in question['answer'])
        graded = tools.submit_pretest(sid, answers)['pretest_result']
        self.assertTrue(all(not row['correct'] for row in graded['detail']))
        after = tools.start_session('medical_technology', 'complete', session_id=sid)
        self.assertTrue(any(c['recommendation_reasons'] for c in after['recommended_cases']))
        wrong_ids = {row['question_id'] for row in graded['detail'] if not row['correct']}
        for c in after['recommended_cases']:
            self.assertTrue(all(r['question_id'] in wrong_ids for r in c['recommendation_reasons']))
        again = tools.start_session('medical_technology', 'complete', session_id=sid, new_batch=True)
        self.assertTrue(any(c['recommendation_reasons'] for c in again['recommended_cases']))

    def test_no_match_and_all_correct_remain_random(self):
        for detail in ([{'question_id': 'X', 'correct': False, 'stem': '完全无关联的基础理论'}],
                       [{'question_id': 'X', 'correct': True, 'stem': '糖尿病'}]):
            sid = tools.start_session('nursing', 'complete')['session_id']
            session, directory = tools._store().load(sid)
            session['pretest_result'] = {'detail': detail}
            session.pop('recommended_ids', None)
            tools._store().save(session, directory)
            result = tools.start_session('nursing', 'complete', session_id=sid)
            self.assertIn('随机', result['recommendation_note'])
            self.assertTrue(all(not c['recommendation_reasons'] for c in result['recommended_cases']))

    def test_new_round_copies_only_submitted_quiz(self):
        sid = tools.start_session('medical_technology', 'complete')['session_id']
        tools.get_pretest(sid)
        graded = tools.submit_pretest(sid, {})['pretest_result']
        tools.select_training_case(sid, 'MT1')
        next_round = tools.start_session('medical_technology', 'complete', source_session_id=sid)
        new_sid = next_round['session_id']
        state = tools.get_session_status(new_sid)
        self.assertNotEqual(sid, new_sid)
        self.assertEqual(state['session']['pretest_result'], graded)
        self.assertFalse(state['session'].get('case_id'))
        self.assertEqual(state['dialogue_turns'], 0)
        self.assertTrue(any(c['recommendation_reasons'] for c in next_round['recommended_cases']))
        tools.get_pretest(new_sid)
        abandoned = tools.start_session('medical_technology', 'complete', source_session_id=new_sid)
        self.assertFalse(tools.get_session_status(abandoned['session_id'])['session'].get('pretest_result'))
        tools.select_training_case(new_sid, 'MT1')
        after_abandon = tools.start_session('medical_technology', 'complete', source_session_id=new_sid)
        self.assertFalse(tools.get_session_status(after_abandon['session_id'])['session'].get('pretest_result'))
        with self.assertRaises(Exception):
            tools.start_session('nursing', 'complete', source_session_id=sid)

    def test_twenty_questions_each_clinical_level_and_grading(self):
        sid = tools.start_session('clinical_medicine', 'complete')['session_id']
        for level in ('basic', 'intermediate', 'advanced', 'expert'):
            paper = tools.get_pretest(sid, level, question_count=20)
            self.assertEqual(len(paper['questions']), 20)
            self.assertEqual(len({q['question_id'] for q in paper['questions']}), 20)
            self.assertTrue(all('answer' not in q and 'correct_answer' not in q for q in paper['questions']))
            self.assertFalse(paper['quantity_note'])
            session, _ = tools._store().load(sid)
            answers = {}
            raw = {q['question_id']: q for q in tools.build_paper('clinical_medicine', level, question_ids=session['pretest_question_ids'])}
            for qid, mapping in session['pretest_option_maps'].items():
                answers[qid] = ''.join(sorted(display for display, stable in mapping.items() if stable in raw[qid]['answer']))
            graded = tools.submit_pretest(sid, answers)['pretest_result']
            self.assertEqual(len(graded['detail']), 20)
            self.assertEqual(graded['percentage'], 100)

    def test_paper_size_switch_cache_and_shortage(self):
        sid = tools.start_session('clinical_medicine', 'complete')['session_id']
        small = tools.get_pretest(sid)
        self.assertEqual(len(small['questions']), 5)
        large = tools.get_pretest(sid, question_count=20)
        self.assertNotEqual(small['attempt_id'], large['attempt_id'])
        self.assertEqual(large['questions'], tools.get_pretest(sid, question_count=20)['questions'])
        self.assertEqual(len(tools.get_pretest(sid)['questions']), 5)
        english = tools.get_pretest(sid, 'english', question_count=20)
        self.assertEqual(len(english['questions']), 8)
        self.assertIn('不足', english['quantity_note'])
        for major in tools.list_majors():
            other = tools.start_session(major, 'complete')['session_id']
            for level in tools.list_levels(major):
                paper = tools.get_pretest(other, level, question_count=20)
                ids = [q['question_id'] for q in paper['questions']]
                self.assertEqual(len(ids), min(20, len(tools.build_paper(major, level, sample=False))))
                self.assertEqual(len(ids), len(set(ids)))
        for invalid in (0, 21, '20', True):
            with self.assertRaises(Exception):
                tools.get_pretest(sid, question_count=invalid)

    def test_urinary_and_marrow_questions_have_selectable_case(self):
        mapping = {'CL48': {'Q-WM-26-A-082', 'Q-WM-26-A-083', 'Q-WM-26-A-084'},
                   'CL49': {'Q-WM-26-A-085', 'Q-WM-26-A-086', 'Q-WM-26-A-087', 'Q-WM-25-A-054'}}
        questions = {q['question_id']: q for level in tools.list_levels('clinical_medicine')
                     for q in tools.build_paper('clinical_medicine', level, sample=False)}
        for cid, ids in mapping.items():
            for qid in ids:
                session = {'learner_profile': {'major_id': 'clinical_medicine'}, 'training_mode': 'complete',
                           'pretest_result': {'detail': [dict(questions[qid], correct=False)]}}
                linked = [c for c in tools._session_payload(session)['related_cases'] if c['case_id'] == cid]
                self.assertEqual(len(linked), 1)
                self.assertFalse({'hidden_info', 'must_cover', 'release_conditions'} & linked[0].keys())
            sid = tools.start_session('clinical_medicine', 'complete')['session_id']
            self.assertEqual(tools.select_training_case(sid, cid)['stage'], 'case_read')

    def test_inflammatory_arthritis_questions_have_selectable_case(self):
        ids = {'Q-WM-25-A-091', 'Q-WM-25-A-092', 'Q-WM-26-A-055'}
        questions = {q['question_id']: q for level in tools.list_levels('clinical_medicine')
                     for q in tools.build_paper('clinical_medicine', level, sample=False)}
        for qid in ids:
            session = {'learner_profile': {'major_id': 'clinical_medicine'}, 'training_mode': 'complete',
                       'pretest_result': {'detail': [dict(questions[qid], correct=False)]}}
            linked = [c for c in tools._session_payload(session)['related_cases'] if c['case_id'] == 'CL47']
            self.assertEqual(len(linked), 1)
            self.assertFalse({'hidden_info', 'must_cover', 'release_conditions'} & linked[0].keys())
        sid = tools.start_session('clinical_medicine', 'complete')['session_id']
        self.assertEqual(tools.select_training_case(sid, 'CL47')['stage'], 'case_read')

    def test_endocrine_and_pulmonary_renal_questions_have_selectable_case(self):
        mapping = {'CL45': {'Q-WM-26-A-088', 'Q-WM-26-A-089', 'Q-WM-26-A-090'},
                   'CL46': {'Q-WM-26-A-091', 'Q-WM-26-A-092'}}
        questions = {q['question_id']: q for level in tools.list_levels('clinical_medicine')
                     for q in tools.build_paper('clinical_medicine', level, sample=False)}
        for cid, ids in mapping.items():
            for qid in ids:
                session = {'learner_profile': {'major_id': 'clinical_medicine'}, 'training_mode': 'complete',
                           'pretest_result': {'detail': [dict(questions[qid], correct=False)]}}
                linked = [c for c in tools._session_payload(session)['related_cases'] if c['case_id'] == cid]
                self.assertEqual(len(linked), 1)
                self.assertFalse({'hidden_info', 'must_cover', 'release_conditions'} & linked[0].keys())
            sid = tools.start_session('clinical_medicine', 'complete')['session_id']
            self.assertEqual(tools.select_training_case(sid, cid)['stage'], 'case_read')

    def test_gastric_outlet_questions_have_selectable_case(self):
        ids = {'Q-WM-26-A-070', 'Q-WM-26-A-071', 'Q-WM-26-A-072', 'Q-WM-M27-A-058'}
        questions = {q['question_id']: q for level in tools.list_levels('clinical_medicine')
                     for q in tools.build_paper('clinical_medicine', level, sample=False)}
        for qid in ids:
            session = {'learner_profile': {'major_id': 'clinical_medicine'}, 'training_mode': 'complete',
                       'pretest_result': {'detail': [dict(questions[qid], correct=False)]}}
            linked = [c for c in tools._session_payload(session)['related_cases'] if c['case_id'] == 'CL44']
            self.assertEqual(len(linked), 1)
            self.assertFalse({'hidden_info', 'must_cover', 'release_conditions'} & linked[0].keys())
        sid = tools.start_session('clinical_medicine', 'complete')['session_id']
        self.assertEqual(tools.select_training_case(sid, 'CL44')['stage'], 'case_read')

    def test_fibrosis_questions_have_three_selectable_cases(self):
        ids = {'Q-WM-25-A-073', 'Q-WM-25-A-074', 'Q-WM-25-A-075'}
        expected = {'CL41', 'CL42', 'CL43'}
        questions = {q['question_id']: q for level in tools.list_levels('clinical_medicine')
                     for q in tools.build_paper('clinical_medicine', level, sample=False)}
        for qid in ids:
            session = {'learner_profile': {'major_id': 'clinical_medicine'}, 'training_mode': 'complete',
                       'pretest_result': {'detail': [dict(questions[qid], correct=False)]}}
            linked = [c for c in tools._session_payload(session)['related_cases'] if c['case_id'] in expected]
            self.assertEqual({c['case_id'] for c in linked}, expected)
            self.assertTrue(all(not ({'hidden_info', 'must_cover', 'release_conditions'} & c.keys()) for c in linked))
            for cid in expected:
                sid = tools.start_session('clinical_medicine', 'complete')['session_id']
                self.assertEqual(tools.select_training_case(sid, cid)['stage'], 'case_read')

    def test_chest_pain_question_has_three_selectable_cases(self):
        qid = 'Q-CM-102'
        expected = {'CL38', 'CL39', 'CL40'}
        questions = {q['question_id']: q for level in tools.list_levels('clinical_medicine')
                     for q in tools.build_paper('clinical_medicine', level, sample=False)}
        session = {'learner_profile': {'major_id': 'clinical_medicine'}, 'training_mode': 'complete',
                   'pretest_result': {'detail': [dict(questions[qid], correct=False)]}}
        linked = [c for c in tools._session_payload(session)['related_cases'] if c['case_id'] in expected]
        self.assertEqual({c['case_id'] for c in linked}, expected)
        self.assertTrue(all(not ({'hidden_info', 'must_cover', 'release_conditions'} & c.keys()) for c in linked))
        for cid in expected:
            sid = tools.start_session('clinical_medicine', 'complete')['session_id']
            self.assertEqual(tools.select_training_case(sid, cid)['stage'], 'case_read')

    def test_thyroid_questions_have_three_selectable_cases(self):
        ids = {'Q-WM-25-A-089', 'Q-WM-25-A-090'}
        expected = {'CL35', 'CL36', 'CL37'}
        questions = {q['question_id']: q for level in tools.list_levels('clinical_medicine')
                     for q in tools.build_paper('clinical_medicine', level, sample=False)}
        for qid in ids:
            session = {'learner_profile': {'major_id': 'clinical_medicine'}, 'training_mode': 'complete',
                       'pretest_result': {'detail': [dict(questions[qid], correct=False)]}}
            linked = [c for c in tools._session_payload(session)['related_cases'] if c['case_id'] in expected]
            self.assertEqual({c['case_id'] for c in linked}, expected)
            self.assertTrue(all(not ({'hidden_info', 'must_cover', 'release_conditions'} & c.keys()) for c in linked))
            for cid in expected:
                sid = tools.start_session('clinical_medicine', 'complete')['session_id']
                self.assertEqual(tools.select_training_case(sid, cid)['stage'], 'case_read')

    def test_upper_gi_bleeding_questions_have_three_selectable_cases(self):
        ids = {'Q-WM-25-A-079', 'Q-WM-25-A-080', 'Q-WM-25-A-081'}
        expected = {'CL32', 'CL33', 'CL34'}
        questions = {q['question_id']: q for level in tools.list_levels('clinical_medicine')
                     for q in tools.build_paper('clinical_medicine', level, sample=False)}
        for qid in ids:
            session = {'learner_profile': {'major_id': 'clinical_medicine'}, 'training_mode': 'complete',
                       'pretest_result': {'detail': [dict(questions[qid], correct=False)]}}
            linked = [c for c in tools._session_payload(session)['related_cases'] if c['case_id'] in expected]
            self.assertEqual({c['case_id'] for c in linked}, expected)
            self.assertTrue(all(not ({'hidden_info', 'must_cover', 'release_conditions'} & c.keys()) for c in linked))
            for cid in expected:
                sid = tools.start_session('clinical_medicine', 'complete')['session_id']
                self.assertEqual(tools.select_training_case(sid, cid)['stage'], 'case_read')

    def test_inflammatory_anemia_questions_have_three_selectable_cases(self):
        ids = {'Q-WM-M27-A-070', 'Q-WM-M27-A-071', 'Q-WM-M27-A-072'}
        expected = {'CL29', 'CL30', 'CL31'}
        questions = {q['question_id']: q for level in tools.list_levels('clinical_medicine')
                     for q in tools.build_paper('clinical_medicine', level, sample=False)}
        for qid in ids:
            session = {'learner_profile': {'major_id': 'clinical_medicine'}, 'training_mode': 'complete',
                       'pretest_result': {'detail': [dict(questions[qid], correct=False)]}}
            linked = [c for c in tools._session_payload(session)['related_cases'] if c['case_id'] in expected]
            self.assertEqual({c['case_id'] for c in linked}, expected)
            self.assertTrue(all(not ({'hidden_info', 'must_cover', 'release_conditions'} & c.keys()) for c in linked))
            for cid in expected:
                sid = tools.start_session('clinical_medicine', 'complete')['session_id']
                self.assertEqual(tools.select_training_case(sid, cid)['stage'], 'case_read')

    def test_aki_timeline_questions_have_three_selectable_cases(self):
        ids = {'Q-WM-M27-A-082', 'Q-WM-M27-A-083', 'Q-WM-M27-A-084'}
        expected = {'CL26', 'CL27', 'CL28'}
        questions = {q['question_id']: q for level in tools.list_levels('clinical_medicine')
                     for q in tools.build_paper('clinical_medicine', level, sample=False)}
        for qid in ids:
            session = {'learner_profile': {'major_id': 'clinical_medicine'}, 'training_mode': 'complete',
                       'pretest_result': {'detail': [dict(questions[qid], correct=False)]}}
            linked = [c for c in tools._session_payload(session)['related_cases'] if c['case_id'] in expected]
            self.assertEqual({c['case_id'] for c in linked}, expected)
            self.assertTrue(all(not ({'hidden_info', 'must_cover', 'release_conditions'} & c.keys()) for c in linked))
            for cid in expected:
                sid = tools.start_session('clinical_medicine', 'complete')['session_id']
                self.assertEqual(tools.select_training_case(sid, cid)['stage'], 'case_read')

    def test_water_balance_questions_have_three_selectable_cases(self):
        ids = {'Q-WM-25-A-013', 'Q-WM-26-A-012', 'Q-WM-26-X-140', 'Q-WM-M27-X-140'}
        expected = {'CL23', 'CL24', 'CL25'}
        questions = {q['question_id']: q for level in tools.list_levels('clinical_medicine')
                     for q in tools.build_paper('clinical_medicine', level, sample=False)}
        for qid in ids:
            session = {'learner_profile': {'major_id': 'clinical_medicine'}, 'training_mode': 'complete',
                       'pretest_result': {'detail': [dict(questions[qid], correct=False)]}}
            linked = [c for c in tools._session_payload(session)['related_cases'] if c['case_id'] in expected]
            self.assertEqual({c['case_id'] for c in linked}, expected)
            self.assertTrue(all(not ({'hidden_info', 'must_cover', 'release_conditions'} & c.keys()) for c in linked))
            for cid in expected:
                sid = tools.start_session('clinical_medicine', 'complete')['session_id']
                self.assertEqual(tools.select_training_case(sid, cid)['stage'], 'case_read')

    def test_cardiac_cycle_questions_have_three_selectable_scenarios(self):
        ids = {'Q-WM-25-A-006', 'Q-WM-M27-A-005', 'Q-WM-M27-A-006'}
        expected = {'CL20', 'CL21', 'CL22'}
        questions = {q['question_id']: q for level in tools.list_levels('clinical_medicine')
                     for q in tools.build_paper('clinical_medicine', level, sample=False)}
        for qid in ids:
            session = {'learner_profile': {'major_id': 'clinical_medicine'}, 'training_mode': 'complete',
                       'pretest_result': {'detail': [dict(questions[qid], correct=False)]}}
            linked = [c for c in tools._session_payload(session)['related_cases'] if c['case_id'] in expected]
            self.assertEqual({c['case_id'] for c in linked}, expected)
            self.assertTrue(all(not ({'hidden_info', 'must_cover', 'release_conditions'} & c.keys()) for c in linked))
            for cid in expected:
                sid = tools.start_session('clinical_medicine', 'complete')['session_id']
                self.assertEqual(tools.select_training_case(sid, cid)['stage'], 'case_read')

    def test_physiology_questions_have_three_selectable_scenarios(self):
        groups = {'Q-WM-26-A-003': {'CL14', 'CL15', 'CL16'},
                  'Q-WM-M27-A-003': {'CL17', 'CL18', 'CL19'}}
        questions = {q['question_id']: q for level in tools.list_levels('clinical_medicine')
                     for q in tools.build_paper('clinical_medicine', level, sample=False)}
        for qid, expected in groups.items():
            session = {'learner_profile': {'major_id': 'clinical_medicine'}, 'training_mode': 'complete',
                       'pretest_result': {'detail': [dict(questions[qid], correct=False)]}}
            result = tools._session_payload(session)
            linked = [c for c in result['related_cases'] if c['case_id'] in expected]
            self.assertEqual({c['case_id'] for c in linked}, expected)
            self.assertTrue(all(not ({'hidden_info', 'must_cover', 'release_conditions'} & c.keys()) for c in linked))
            for cid in expected:
                sid = tools.start_session('clinical_medicine', 'complete')['session_id']
                self.assertEqual(tools.select_training_case(sid, cid)['stage'], 'case_read')

    def test_bone_tumor_question_group_has_three_selectable_cases(self):
        ids = {'Q-WM-26-A-103', 'Q-WM-26-A-104', 'Q-WM-26-A-105'}
        questions = {q['question_id']: q for level in tools.list_levels('clinical_medicine')
                     for q in tools.build_paper('clinical_medicine', level, sample=False)}
        for qid in ids:
            row = dict(questions[qid], correct=False)
            session = {'learner_profile': {'major_id': 'clinical_medicine'}, 'training_mode': 'complete',
                       'pretest_result': {'detail': [row]}}
            result = tools._session_payload(session)
            linked = [c for c in result['related_cases'] if c['case_id'] in {'CL11', 'CL12', 'CL13'}]
            self.assertEqual({c['case_id'] for c in linked}, {'CL11', 'CL12', 'CL13'})
            for case in linked:
                self.assertFalse({'hidden_info', 'must_cover', 'release_conditions'} & case.keys())
            sid = tools.start_session('clinical_medicine', 'complete')['session_id']
            for cid in ('CL11', 'CL12', 'CL13'):
                chosen = tools.select_training_case(sid, cid)
                self.assertEqual(chosen['stage'], 'case_read')

    def test_reported_clinical_wrong_set_and_partial_scope(self):
        ids = {'Q-WM-26-A-061', 'Q-WM-25-A-032', 'Q-WM-25-A-059'}
        detail = [dict(q, correct=False) for q in tools.build_paper('clinical_medicine', 'basic', sample=False) if q['question_id'] in ids]
        self.assertEqual(len(detail), 3)
        session = {'learner_profile': {'major_id': 'clinical_medicine'}, 'training_mode': 'complete', 'pretest_result': {'detail': detail},
                   'recommended_ids': ['CLX004', 'CLX022', 'GI-O3', 'P1-V1']}
        result = tools._session_payload(session)
        self.assertEqual({c['case_id'] for c in result['related_cases']}, {'CL167', 'IM-O2', 'CL200', 'CL203'})
        audit = {row['question_id']: row for row in result['recommendation_audit']}
        self.assertTrue(any(c['case_id'] == 'CL167' for c in audit['Q-WM-26-A-061']['candidates']))
        self.assertTrue(any(c['case_id'] == 'CL200' for c in audit['Q-WM-25-A-032']['candidates']))
        self.assertTrue(any(c['case_id'] == 'CL203' for c in audit['Q-WM-25-A-059']['candidates']))
        partial = next(c for c in audit['Q-WM-25-A-059']['candidates'] if c['case_id'] == 'IM-O2')
        self.assertEqual(partial['kind'], 'curated_partial')
        self.assertEqual(partial['kind'], 'curated_partial')
        self.assertIn('没有覆盖', partial['limitation'])
        self.assertIn('非临床审定', partial['review_status'])
        self.assertTrue(all(not c['recommendation_reasons'] for c in result['random_cases']))
        self.assertIn('IM-O2', [c['case_id'] for c in result['recommended_cases']])
        for c in result['related_cases']:
            self.assertFalse({'hidden_info', 'must_cover', 'release_conditions', 'pattern_answer'} & c.keys())

    def test_different_wrong_topics_change_candidates_and_cache(self):
        session = {'learner_profile': {'major_id': 'clinical_medicine'}, 'training_mode': 'complete'}
        session['pretest_result'] = {'detail': [{'question_id': 'D', 'stem': '2型糖尿病患者随访', 'correct': False}]}
        first = tools._session_payload(session)
        self.assertIn('EN-O4', [c['case_id'] for c in first['related_cases']])
        session['pretest_result'] = {'detail': [{'question_id': 'C', 'stem': '慢阻肺患者吸入装置管理', 'correct': False}]}
        second = tools._session_payload(session)
        self.assertNotIn('EN-O4', [c['case_id'] for c in second['related_cases']])
        self.assertIn('P1', [c['case_id'] for c in second['related_cases']])
        self.assertTrue(all(r['question_id'] == 'C' for c in second['related_cases'] for r in c['recommendation_reasons']))
        session['pretest_open'] = True
        pending = tools._session_payload(session)
        self.assertEqual(pending['related_cases'], [])
        self.assertEqual(pending['recommendation_audit'], [])

    def test_basic_pathology_is_not_mapped_to_disease_case(self):
        ids = {'Q-WM-26-A-035', 'Q-WM-26-A-043'}
        detail = [dict(q, correct=False) for q in tools.build_paper('clinical_medicine', 'basic', sample=False) if q['question_id'] in ids]
        self.assertEqual(len(detail), 2)
        matches, audit, status = tools._weak_case_analysis({'pretest_result': {'detail': detail}}, tools._case_pool('clinical_medicine'))
        self.assertEqual(set(matches), {'CL228', 'CL251'})
        self.assertTrue(all(reason['question_id'] == 'Q-WM-26-A-035' for reason in matches['CL228']))
        self.assertTrue(all(reason['question_id'] == 'Q-WM-26-A-043' for reason in matches['CL251']))

    def test_rheumatoid_nodule_pathology_selects_specific_case(self):
        detail = [dict(q, correct=False) for q in tools.build_paper('clinical_medicine', 'basic', sample=False)
                  if q['question_id'] == 'Q-WM-25-A-031']
        self.assertEqual(len(detail), 1)
        matches, _, _ = tools._weak_case_analysis({'pretest_result': {'detail': detail}}, tools._case_pool('clinical_medicine'))
        self.assertIn('CL101', matches)
        self.assertTrue(any(reason['question_id'] == 'Q-WM-25-A-031' for reason in matches['CL101']))

    def test_islet_pathology_question_selects_authored_case(self):
        detail = [dict(q, correct=False) for q in tools.build_paper('clinical_medicine', 'basic', sample=False)
                  if q['question_id'] == 'Q-WM-26-A-039']
        self.assertEqual(len(detail), 1)
        matches, _, _ = tools._weak_case_analysis({'pretest_result': {'detail': detail}}, tools._case_pool('clinical_medicine'))
        self.assertIn('CL74', matches)
        self.assertTrue(any(reason['question_id'] == 'Q-WM-26-A-039' for reason in matches['CL74']))

    def test_clinical_question_case_catalog_adds_three_selectable_cases_per_question(self):
        catalog = tools._clinical_question_case_catalog()
        questions = [q for level in tools.list_levels('clinical_medicine')
                     for q in tools.build_paper('clinical_medicine', level, sample=False)]
        self.assertEqual(len(questions), 435)
        self.assertEqual(len(catalog), 435 * 3)
        for question in questions:
            ids = [f"CMQ-{question['question_id']}-{index:02d}" for index in (1, 2, 3)]
            self.assertTrue(all(case_id in catalog for case_id in ids), question['question_id'])
            self.assertEqual(len({catalog[case_id]['title'] for case_id in ids}), 3)
            self.assertTrue(all(catalog[case_id]['source_question_id'] == question['question_id'] for case_id in ids))
            self.assertTrue(all(catalog[case_id]['training_stages'] for case_id in ids))
        pool = tools._case_pool('clinical_medicine')
        self.assertEqual(sum(case.get('case_kind') == 'question_derived' for case in pool.values()), 1305)
        self.assertGreaterEqual(sum(not case.get('case_kind') for case in pool.values()), 81)
        case_id = 'CMQ-Q-WM-26-A-061-01'
        selected = tools.select_training_case(tools.start_session('clinical_medicine')['session_id'], case_id)
        self.assertEqual(selected['public_case']['case_id'], case_id)
        self.assertEqual(selected['public_case']['source_question_id'], 'Q-WM-26-A-061')
        self.assertIn('原题推理练习', selected['public_case']['title'])
        self.assertIn('非独立病例', selected['public_case']['case_type'])
        self.assertIn('并非新增独立病例', selected['public_case']['public_profile']['notice'])
        self.assertEqual(selected['public_case']['review_status'], '题库衍生教学病例，待临床教师审核；非独立审定患者病例')
        self.assertNotIn('answer', selected['public_case'])
        self.assertNotIn('options', selected['public_case'])
        listed = tools.list_training_cases(major='clinical_medicine')['cases']
        self.assertTrue(any(case['case_id'] == case_id for case in listed))
        session = tools.start_session('clinical_medicine', 'complete')['session_id']
        state, directory = tools._store().load(session)
        state['pretest_result'] = {'detail': [{
            'question_id': 'Q-WM-26-A-061', 'stem': '无胸腔积液的创伤性气胸', 'correct': False,
            'explanation_ref': 'K-WM-26-A-061', 'node_id': 'wm_internal_medicine_2026_061',
        }]}
        state.pop('recommended_ids', None)
        tools._store().save(state, directory)
        payload = tools.start_session('clinical_medicine', 'complete', session_id=session)
        audit = payload['recommendation_audit'][0]
        self.assertEqual(len(audit['question_cases']), 3)
        self.assertEqual([item['case_id'] for item in audit['question_cases']], [
            'CMQ-Q-WM-26-A-061-01', 'CMQ-Q-WM-26-A-061-02', 'CMQ-Q-WM-26-A-061-03',
        ])

    def test_broken_association_resource_preserves_random_practice(self):
        original = tools.read_json
        def read(path):
            if Path(path).name == 'case_recommendation_topics.json':
                raise ValueError('corrupt')
            return original(path)
        session = {'learner_profile': {'major_id': 'clinical_medicine'}, 'training_mode': 'complete',
                   'pretest_result': {'detail': [{'question_id': 'X', 'correct': False, 'stem': '慢阻肺患者'}]}}
        with patch.object(tools, 'read_json', side_effect=read):
            result = tools._session_payload(session)
        self.assertEqual(result['recommendation_resource_status'], 'unavailable')
        self.assertEqual(result['related_cases'], [])
        self.assertEqual(len(result['random_cases']), 4)
        self.assertEqual(result['recommendation_audit'][0]['status'], 'unmatched')

    def test_recent_authored_question_groups_are_selectable_and_private(self):
        groups = {
            'CL50': ('076', '077', '078'),
            'CL51': ('079', '080', '081'),
            'CL52': ('073', '074', '075'),
            'CL53': ('093', '094', '095'),
            'CL54': ('106', '107'),
            'CL55': ('096', '097'),
            'CL56': ('045',),
            'CL57': ('041', '048'),
            'CL58': ('050',),
            'CL59': ('047',),
            'CL60': ('052',),
            'CL61': ('053',),
            'CL62': ('062',),
            'CL63': ('046',),
            'CL64': ('051',),
            'CL65': ('056',),
            'CL66': ('059',),
            'CL67': ('054',),
            'CL68': ('060',),
            'CL69': ('063',),
        }
        expected = {f'Q-WM-26-A-{number}': cid for cid, numbers in groups.items() for number in numbers}
        expected.update({'Q-WM-M27-A-085': 'CL51', 'Q-WM-M27-A-086': 'CL51'})
        questions = {q['question_id']: q for level in tools.list_levels('clinical_medicine')
                     for q in tools.build_paper('clinical_medicine', level, sample=False)}
        self.assertTrue(set(expected) <= questions.keys())
        for qid, cid in expected.items():
            with self.subTest(question=qid):
                session = {'learner_profile': {'major_id': 'clinical_medicine'}, 'training_mode': 'complete',
                           'pretest_result': {'detail': [dict(questions[qid], correct=False)]}}
                payload = tools._session_payload(session)
                self.assertIn(cid, [case['case_id'] for case in payload['related_cases']])
                selected = tools.select_training_case(tools.start_session('clinical_medicine')['session_id'], cid)
                case = selected['public_case']
                self.assertEqual(case['case_id'], cid)
                self.assertTrue(case['clinical_data'])
                self.assertFalse({'hidden_info', 'release_conditions', 'persona', 'must_cover'} & case.keys())
                self.assertIn('由你自主判断', case['task'])

    def test_latest_clinical_wrong_questions_link_to_selectable_full_cases(self):
        ids = {'Q-WM-25-A-028': 'CL8', 'Q-WM-26-A-110': 'CL10', 'Q-WM-26-A-033': 'CL9'}
        detail = [dict(q, correct=False) for level in tools.list_levels('clinical_medicine')
                  for q in tools.build_paper('clinical_medicine', level, sample=False)
                  if q['question_id'] in ids]
        self.assertEqual({row['question_id'] for row in detail}, set(ids))
        session = {'learner_profile': {'major_id': 'clinical_medicine'}, 'training_mode': 'complete',
                   'pretest_result': {'detail': detail}}
        payload = tools._session_payload(session)
        audit = {row['question_id']: row for row in payload['recommendation_audit']}
        self.assertEqual({qid for qid, row in audit.items() if row['status'] == 'related'}, set(ids))
        self.assertEqual({candidate['case_id'] for row in audit.values() for candidate in row['candidates']}, set(ids.values()))
        self.assertEqual({case['case_id'] for case in payload['related_cases']}, set(ids.values()))
        for qid, case_id in ids.items():
            reason = next(c for c in audit[qid]['candidates'] if c['case_id'] == case_id)
            self.assertIn('待临床教师审核', reason['review_status'])
            selected = tools.select_training_case(tools.start_session('clinical_medicine')['session_id'], case_id)
            self.assertEqual(selected['public_case']['case_id'], case_id)
            self.assertTrue(selected['public_case']['clinical_data'])
            self.assertFalse({'hidden_info', 'release_conditions', 'persona', 'must_cover'} & selected['public_case'].keys())


if __name__ == '__main__':
    unittest.main(verbosity=2)

