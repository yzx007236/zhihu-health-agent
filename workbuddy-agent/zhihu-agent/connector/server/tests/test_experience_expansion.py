"""New source-backed situations and current-case collection boundaries."""
import json
import os
import shutil
import sys
import unittest
import uuid
from pathlib import Path
from unittest.mock import patch

SERVER = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(SERVER))
from zhihu_mcp import experience as ex, tools

CAP = '46岁，当前社区获得性肺炎，影像肺炎浸润，否认院内肺炎，否认免疫抑制。'
ACS = '46岁，急诊急性胸痛，疑似ACS，否认胸痛明确由其他病因引起。'
DEMOS = {
    'K56': CAP + '初始降钙素原低。',
    'K57': CAP + '流感检测阳性。',
    'K58': CAP + '治疗第5日仍发热。',
    'K59': CAP + '住院，误吸，否认肺脓肿，否认脓胸。',
    'K60': '46岁，疑似脓毒症，qSOFA低。',
    'K61': '46岁，疑似脓毒症，正在急性复苏，乳酸升高。',
    'K62': '46岁，疑似脓毒症，正在液体复苏。',
    'K63': '46岁，疑似脓毒症，感染证据不足。',
    'K64': '46岁，疑似严重过敏反应，暴露后急起，呼吸受累，否认皮疹。',
    'K65': '46岁，疑似严重过敏反应，已用抗组胺药。',
    'K66': '46岁，疑似严重过敏反应，已用吸入支气管扩张剂，症状持续。',
    'K67': '46岁，本次严重过敏反应处置后观察。',
    'K68': ACS + '首份心电图正常。',
    'K69': ACS + '心电图不确切。',
    'K70': ACS + '肌钙蛋白升高。',
    'K71': ACS + '单次高敏肌钙蛋白低。',
}


class ExpansionAcceptance(unittest.TestCase):
    def card(self, query, cid, **kwargs):
        # Explicit card ID only recalls; it supplies no clinical facts.
        return next(c for c in ex.search(cid + '，' + query, **kwargs)['cards'] if c['id'] == cid)

    def test_all_new_cards_have_a_complete_teaching_situation(self):
        for cid, query in DEMOS.items():
            with self.subTest(cid=cid):
                result = self.card(query, cid)
                self.assertEqual(result['applicability'], 'applicable', result['unconfirmed_conditions'])
                self.assertTrue(result['teaching_interpretation'])
                self.assertIn('尚未临床专家审定', result['review_status'])

    def test_missing_info_stays_unknown_for_every_new_card(self):
        for cid in DEMOS:
            with self.subTest(cid=cid):
                c = self.card('', cid)
                self.assertEqual(c['applicability'], 'needs_information')
                self.assertTrue(c['questions'])
                self.assertFalse(c['teaching_interpretation'])

    def test_children_excluded_from_adult_implementation(self):
        for cid, query in DEMOS.items():
            with self.subTest(cid=cid):
                self.assertEqual(self.card(query.replace('46岁', '8岁'), cid)['applicability'], 'not_applicable')

    def test_negated_uncertain_and_historical_background_not_confirmed(self):
        for text in ('否认社区获得性肺炎', '既往社区获得性肺炎', '母亲社区获得性肺炎', '疑似社区获得性肺炎'):
            c = self.card('46岁，' + text + '，初始降钙素原低。', 'K56')
            self.assertNotEqual(c['applicability'], 'applicable')
        for cid, text in [('K60', '否认脓毒症，qSOFA低'), ('K65', '否认严重过敏反应，抗组胺药'), ('K68', '已排除ACS，急诊急性胸痛，首份心电图正常')]:
            self.assertEqual(self.card('46岁，' + text, cid)['applicability'], 'not_applicable')

    def test_wrong_cause_and_scope_excluded(self):
        for extra in ('医院获得性肺炎', '免疫抑制'):
            c = self.card('46岁，当前社区获得性肺炎，影像肺炎，降钙素原低，' + extra, 'K56')
            self.assertEqual(c['applicability'], 'not_applicable')
        c = self.card(CAP + '住院，误吸，疑似肺脓肿', 'K59')
        self.assertNotEqual(c['applicability'], 'applicable')
        c = self.card('46岁，急诊急性胸痛，疑似ACS，首份心电图正常，胸痛明确由其他病因引起', 'K68')
        self.assertEqual(c['applicability'], 'not_applicable')

    def test_similar_symptoms_and_uncovered_topics_never_fabricate(self):
        for query in ('46岁，咳嗽气促', '46岁，发热', '46岁，普通荨麻疹', '交叉配血操作质量控制'):
            result = ex.search(query)
            self.assertNotEqual(result['outcome'], 'applicable')
            self.assertTrue(all(c['applicability'] != 'applicable' for c in result['cards']))
        result = ex.search('针灸消毒操作规范')
        self.assertEqual(result['cards'], [])
        self.assertIn('暂无适用依据', result['message'])

    def test_negated_ros_does_not_flood_automatic_companion(self):
        result = ex.search(allow_cards=False, guidance_only=True, coaching=True,
            visible_context='46岁，否认腹痛，否认慢阻肺，无气促，无呼吸困难，否认胸痛，无胸闷。')
        self.assertEqual(result['cards'], [])

    def test_conflicting_suspected_and_excluded_background_requires_clarification(self):
        c = self.card('46岁，急诊急性胸痛，疑似ACS，ACS已排除，首份心电图正常', 'K68')
        self.assertNotEqual(c['applicability'], 'applicable')

    def test_current_emergency_precedes_closed_or_missing_library(self):
        for text in ('疑似严重过敏反应', '疑似脓毒症', '持续胸痛伴冷汗'):
            result = ex.search(text, enabled=False, allow_cards=False)
            self.assertTrue(result['urgent'])
            self.assertIn('不要等待', result['urgent_message'])
        for text in ('否认脓毒症', '既往严重过敏反应', '母亲严重过敏反应', '如果出现严重过敏反应怎么办'):
            self.assertFalse(ex.emergency(text))

    def test_sources_quotes_versions_and_publication_type(self):
        data, _, _, _ = ex._load()
        self.assertEqual(len([c for c in data['cards'] if 56 <= int(c['id'][1:]) <= 71]), 16)
        for cid in DEMOS:
            c = self.card(DEMOS[cid], cid)
            e = c['evidence'][0]
            source = e['source']
            self.assertIn('未作截至2026年的最新版核查', source['version'])
            self.assertIn('逐条核对本版引用段落', source['verification_scope'])
            self.assertTrue(source['original_url'].startswith('https://doi.org/'))
            html = ex.render_reference_html({'notice': ex.NOTICE, 'message': '', 'cards': [c]})
            self.assertIn(e['quote_label'], html)
            if int(cid[1:]) >= 68:
                self.assertEqual(source['evidence_type'], 'expert_consensus')
                self.assertIn('专家共识原文', html)
                self.assertNotIn('指南原文推荐', html)


class CollectionAcceptance(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        cls.root = SERVER / 'tests' / ('collection-run-' + uuid.uuid4().hex)
        cls.root.mkdir()
        cls.environment = patch.dict(os.environ, {'ZHIHU_SESSION_STORE': str(cls.root / 'sessions'), 'ZHIHU_EXPERIENCE_ENABLED': '1'})
        cls.environment.start()

    @classmethod
    def tearDownClass(cls):
        cls.environment.stop()
        shutil.rmtree(cls.root)

    def setUp(self):
        self.case = {'case_id': 'S1', 'public_profile': {'age': 46},
            'title': 'TITLE_SENTINEL', 'disease_id': 'HIDDEN_DIAG_SENTINEL',
            'hidden_info': [{'value': 'HIDDEN_SENTINEL'}], 'must_cover': ['ANSWER_SENTINEL'],
            'clinical_data': [{'item': '影像', 'value': '影像肺炎浸润', 'note': 'NOTE_SENTINEL'},
                {'item': '家族史', 'value': '母亲80岁社区获得性肺炎'},
                {'item': '独立实验数据', 'value': 'EXPERIMENT_SENTINEL'},
                {'item': '训练任务', 'value': 'TASK_SENTINEL'}],
            'structured': {'history': {'chief_complaint': '当前社区获得性肺炎',
                'past_history': '否认院内肺炎，否认免疫抑制',
                'family_history': 'FAMILY_SENTINEL',
                'review_of_systems': {'呼吸': '呼吸ROS已核对'}},
                'exam': [{'item': '体温', 'finding': '体温38度'}],
                'labs': [{'item': 'PCT', 'finding': '初始降钙素原低'},
                    {'item': '待查', 'available': False, 'finding': 'UNAVAILABLE_SENTINEL'}]}}
        self.snapshot = {'case_id': 'S1', 'history': ['chief_complaint', 'past_history', 'family_history'],
            'ros': ['呼吸'], 'exams': ['体温'], 'labs': ['PCT', '待查'], 'value': 'FORGED_SENTINEL'}

    def visible(self, collected=None):
        with patch.object(tools, '_case_for_session', return_value=self.case), patch.object(tools, 'read_dialogue', return_value=[
                {'speaker': 'student', 'raw_text': 'STUDENT_SENTINEL'}, {'speaker': 'resident', 'raw_text': '患者已保存回答'}]):
            return tools._experience_visible_context({'case_id': 'S1'}, self.root, collected)

    def test_public_rows_and_saved_replies_but_no_hidden_or_notes(self):
        text = self.visible()
        self.assertIn('影像肺炎浸润', text)
        self.assertIn('患者已保存回答', text)
        self.assertNotIn('SENTINEL', text)
        self.assertNotIn('80岁', text)
        self.assertNotIn('初始降钙素原低', text)

    def test_selected_server_values_only_and_unavailable_is_unknown(self):
        text = self.visible(self.snapshot)
        for value in ('当前社区获得性肺炎', '初始降钙素原低', '体温38度', '呼吸ROS已核对'):
            self.assertIn(value, text)
        self.assertNotIn('SENTINEL', text)
        c = ex.search('K56', allow_cards=False, guidance_only=True, coaching=True, visible_context=text)['cards'][0]
        self.assertEqual(c['id'], 'K56')
        self.assertEqual(c['applicability'], 'applicable')

    def test_unselected_revoked_or_previous_case_results_not_used(self):
        self.visible(self.snapshot)
        for snapshot in (None, {'case_id': 'S1'}, {**self.snapshot, 'case_id': 'OLD'}):
            text = self.visible(snapshot)
            self.assertNotIn('初始降钙素原低', text)
            self.assertNotIn('体温38度', text)
            c = ex.search('K56', allow_cards=False, guidance_only=True, visible_context=text)['cards'][0]
            self.assertEqual(c['applicability'], 'needs_information')

    def test_topic_request_does_not_establish_diagnosis_or_emergency(self):
        self.case = {'case_id': 'S1', 'disease_label': '脓毒症', 'public_profile': {'age': 46},
            'clinical_data': [{'item': '当前诉求', 'value': '脓毒症'}]}
        text = self.visible()
        self.assertNotIn('脓毒症', text)
        self.assertFalse(ex.emergency(text))

    def test_server_practice_and_assessment_gates_accept_snapshot(self):
        sid = tools.start_session('clinical_medicine')['session_id']
        tools.select_training_case(sid, 'S1')
        with patch.object(tools, '_case_for_session', return_value=self.case):
            result = tools.get_experience_references(session_id=sid, collected=self.snapshot, learning_mode='coach')
            self.assertTrue(any(c['id'] == 'K56' and c['applicability'] == 'applicable' for c in result['cards']))
            result = tools.get_experience_references(session_id=sid, collected=self.snapshot, learning_mode='assessment')
            self.assertEqual(result['cards'], [])
            tools.get_pretest(sid)
            result = tools.get_experience_references(session_id=sid, collected=self.snapshot, learning_mode='coach')
            self.assertEqual(result['cards'], [])
            self.assertEqual(result['outcome'], 'stage_restricted')

    def test_collected_results_reach_report_without_changing_score(self):
        sid = tools.start_session('clinical_medicine')['session_id']
        tools.select_training_case(sid, 'S1')
        session, directory = tools._store().load(sid)
        session['stage'] = 'scoring'
        tools._store().save(session, directory)
        score = tools.score_session(sid, [])['score_result']
        before = (directory / 'score_result.json').read_bytes()
        with patch.object(tools, '_case_for_session', return_value=self.case):
            report = tools.generate_training_report(sid, collected=self.snapshot)
        self.assertEqual(report['status'], 'ok')
        self.assertEqual((directory / 'score_result.json').read_bytes(), before)
        self.assertEqual(json.loads(before)['total_score'], score['total_score'])
        self.assertIn('K56', json.dumps(report))

    def test_real_pneumonia_case_stays_on_relevant_candidates_after_collection(self):
        case = tools._case_for_session({'case_id': 'IM-O2'}, self.root)
        st = case['structured']
        snapshot = {'case_id': 'IM-O2', 'history': list(st['history']),
            'ros': list(st['history']['review_of_systems']),
            'exams': [e['item'] for e in st['exam']], 'labs': [e['item'] for e in st['labs']]}
        with patch.object(tools, '_case_for_session', return_value=case), patch.object(tools, 'read_dialogue', return_value=[]):
            text = tools._experience_visible_context({'case_id': 'IM-O2'}, self.root, snapshot)
        result = ex.search(allow_cards=False, guidance_only=True, coaching=True, visible_context=text)
        self.assertIn('K56', [c['id'] for c in result['cards']])
        self.assertFalse(any(c['id'] in {'K16', 'K40', 'K43'} for c in result['cards']))
        self.assertTrue(all(c['applicability'] != 'applicable' for c in result['cards']))


if __name__ == '__main__':
    unittest.main()
