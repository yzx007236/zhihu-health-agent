"""Source-backed v3.2 branches and false-applicability boundaries."""
import hashlib
import json
from pathlib import Path
import sys
import unittest
from unittest.mock import patch

SERVER = Path(__file__).resolve().parents[1]
ROOT = SERVER.parents[3]
sys.path.insert(0, str(SERVER))
from zhihu_mcp import experience as ex, tools

AP = '56岁，本次确诊急性胰腺炎。'
PPU = '56岁，疑似消化性溃疡穿孔。'
PD = '80岁，本次确诊术后谵妄。'
AA = '40岁，疑似急性阑尾炎。'
TLOC = '81岁，急诊，本次短暂意识丧失，否认创伤性意识丧失，否认休克。'
DEMOS = {
    'K72': AP + '呼吸低氧，影像局部坏死。',
    'K73': AP + '局部坏死，否认胰腺感染，否认感染性坏死，否认其他感染灶。',
    'K74': AP + '液体复苏评估。',
    'K75': AP + '重症急性胰腺炎，营养支持途径评估。',
    'K76': PPU + '影像未见游离气体。',
    'K77': PPU + '非手术观察适用性评估。',
    'K78': PPU + '明确腹膜炎。',
    'K79': '56岁，胃镜证实溃疡出血。',
    'K80': PD + '诱因未明，注意力下降。',
    'K81': PD + '综合干预评估。',
    'K82': PD + '严重激越，有伤害风险，拟用苯二氮䓬类，否认酒精戒断，否认苯二氮䓬戒断，否认其他特定适应证。',
    'K83': PD + '低活动型，否认激越，否认伤害威胁。',
    'K84': AA + '右下腹痛。',
    'K85': AA + 'Alvarado评分较高。',
    'K86': AA + '初始检查正常，右下腹痛未缓解。',
    'K87': AA + '当前妊娠，MRI阴性，临床仍高度怀疑。',
    'K88': TLOC,
    'K89': TLOC + '初始诊断评估。',
    'K90': TLOC + '基础评估已完成，体位试验适合性评估，否认循环不稳定，否认站立不安全。',
    'K91': TLOC + '本次确诊晕厥，已评估高危。',
}


class V32Acceptance(unittest.TestCase):
    def card(self, cid, text='', **kwargs):
        return next(c for c in ex.search(cid + '，' + text, **kwargs)['cards'] if c['id'] == cid)

    def test_every_new_branch_has_a_complete_and_an_incomplete_situation(self):
        for cid, text in DEMOS.items():
            with self.subTest(cid=cid):
                c = self.card(cid, text)
                self.assertEqual(c['applicability'], 'applicable', c['questions'])
                self.assertTrue(c['teaching_interpretation'])
                missing = self.card(cid)
                self.assertEqual(missing['applicability'], 'needs_information')
                self.assertTrue(missing['questions'])
                self.assertFalse(missing['teaching_interpretation'])

    def test_wrong_age_is_excluded_for_every_new_branch(self):
        for cid, text in DEMOS.items():
            with self.subTest(cid=cid):
                text = text.replace('56岁', '8岁').replace('80岁', '8岁').replace('40岁', '8岁').replace('81岁', '8岁')
                self.assertEqual(self.card(cid, text)['applicability'], 'not_applicable')
        self.assertEqual(self.card('K80', DEMOS['K80'].replace('80岁', '40岁'))['applicability'], 'not_applicable')

    def test_acute_background_does_not_come_from_negated_past_or_family(self):
        for qualifier in ['否认', '既往确诊', '母亲确诊', '疑似', '是否为']:
            with self.subTest(qualifier=qualifier):
                c = self.card('K72', '56岁，' + qualifier + '急性胰腺炎，局部坏死。')
                self.assertNotEqual(c['applicability'], 'applicable')
        self.assertEqual(self.card('K84', '40岁，已排除急性阑尾炎，右下腹痛')['applicability'], 'not_applicable')

    def test_black_stool_is_not_confirmed_ulcer_bleeding(self):
        c = self.card('K79', '45岁，黑便，上腹痛，尚未行胃镜。')
        self.assertEqual(c['applicability'], 'needs_information')
        self.assertTrue(any('证实' in q for q in c['questions']))
        self.assertFalse(c['teaching_interpretation'])

    def test_no_prophylaxis_branch_requires_infection_exclusion(self):
        c = self.card('K73', AP + '局部坏死，未见明确感染证据。')
        self.assertEqual(c['applicability'], 'needs_information')
        self.assertEqual(self.card('K73', AP + '局部坏死，感染性坏死')['applicability'], 'not_applicable')
        self.assertNotEqual(self.card('K73', AP + '局部坏死，疑似感染性坏死')['applicability'], 'applicable')

    def test_hospital_delirium_does_not_imply_postoperative_context(self):
        c = self.card('K80', '80岁，住院患者注意力不集中，诱因未明，症状波动。')
        self.assertEqual(c['applicability'], 'needs_information')
        self.assertFalse(c['teaching_interpretation'])

    def test_withdrawal_exception_and_dangerous_agitation_are_respected(self):
        self.assertEqual(self.card('K82', PD + '严重激越，有伤害风险，拟用苯二氮䓬类，酒精戒断')['applicability'], 'not_applicable')
        self.assertNotEqual(self.card('K82', PD + '严重激越，有伤害风险，拟用苯二氮䓬类')['applicability'], 'applicable')
        self.assertEqual(self.card('K83', PD + '低活动型，当前激越')['applicability'], 'not_applicable')

    def test_pregnancy_and_mri_are_not_inferred(self):
        c = self.card('K87', AA + 'MRI阴性，临床仍高度怀疑。')
        self.assertEqual(c['applicability'], 'needs_information')
        self.assertTrue(any('妊娠' in q for q in c['questions']))
        self.assertEqual(self.card('K87', AA + '否认妊娠，MRI阴性，临床仍高度怀疑')['applicability'], 'not_applicable')

    def test_dizziness_is_not_tloc_and_unsafe_standing_is_excluded(self):
        self.assertEqual(self.card('K88', '81岁，起立头晕，跌倒，急诊')['applicability'], 'needs_information')
        self.assertEqual(self.card('K90', TLOC + '基础评估已完成，体位试验，循环不稳定')['applicability'], 'not_applicable')
        self.assertEqual(self.card('K89', '81岁，急诊，短暂意识丧失，休克，初始诊断评估')['applicability'], 'not_applicable')
        self.assertEqual(self.card('K91', TLOC + '已评估高危')['applicability'], 'needs_information')
        self.assertEqual(self.card('K91', TLOC + '晕厥已排除，已评估高危')['applicability'], 'not_applicable')

    def test_emergency_precedes_library_and_questions(self):
        for text in ['明确腹膜炎', '疑似溃疡穿孔，休克']:
            r = ex.search(text, enabled=False, allow_cards=False)
            self.assertTrue(r['urgent'])
            self.assertIn('不要等待', r['urgent_message'])

    def test_sources_quotes_hashes_types_and_historical_version_remain_accurate(self):
        data, _, _, _ = ex._load()
        self.assertEqual((data['card_count'], data['source_count']), (91, 23))
        previous = json.loads((ROOT / 'output/知护题库关联经验库_v3.1/知护题库关联经验库_v3.1.json').read_text(encoding='utf8'))
        # Only candidate case indexes change; old content and provenance stay intact.
        for a, b in zip(data['cards'][:71], previous['cards']):
            self.assertEqual(a, b)
        self.assertEqual(data['sources'][:18], previous['sources'])
        for cid, text in DEMOS.items():
            with self.subTest(cid=cid):
                c = self.card(cid, text)
                ev = c['evidence'][0]
                src = ev['source']
                snapshot = (ex.resource_path().parent / src['evidence_snapshot']).read_text(encoding='utf8')
                self.assertIn(' '.join(ev['quote'].split()), ' '.join(snapshot.split()))
                self.assertEqual(hashlib.sha256(snapshot.encode()).hexdigest(), src['snapshot_sha256'])
                self.assertIn('逐条核对', src['verification_scope'])
                self.assertIn('不标为最新', src['version'])
                html = ex.render_reference_html(dict(cards=[c], notice=ex.NOTICE, message=''))
                for field in ['title', 'issuer', 'version', 'original_url', 'verification_scope']:
                    self.assertIn(src[field].replace('&', '&amp;'), html)
        self.assertEqual(self.card('K87', DEMOS['K87'])['evidence'][0]['quote_label'], '指南原文声明')
        self.assertEqual(self.card('K88', DEMOS['K88'])['evidence'][0]['quote_label'], '专家共识原文')

    def test_candidate_indexes_do_not_establish_patient_facts(self):
        data, _, _, _ = ex._load()
        indexed = {a['case_id'] for a in data['case_associations'] if any(l['group'] == 'v32_curated_candidate' for l in a['links'])}
        self.assertEqual(indexed, {'CL122', 'CL3', 'CL32', 'CL33', 'CL34', 'CL6'})
        for case_id, cid in [('CL122', 'K72'), ('CL32', 'K79'), ('CL33', 'K79'), ('CL34', 'K79')]:
            candidate = next(c for c in ex.search(case_id=case_id)['cards'] if c['id'] == cid)
            self.assertEqual(candidate['applicability'], 'needs_information')
        r = ex.search(case_id='CL3', allow_cards=False, guidance_only=True, coaching=True, visible_context='40岁，右下腹越来越疼。')
        c = next(c for c in r['cards'] if c['id'] == 'K84')
        self.assertEqual(c['applicability'], 'needs_information')
        self.assertNotIn('teaching_interpretation', c)
        self.assertNotIn('quote', c['evidence'][0])

    def test_student_proposals_cannot_unlock_any_new_training_recommendation(self):
        for cid, proposed in DEMOS.items():
            with self.subTest(cid=cid):
                c = self.card(cid, proposed, allow_cards=False, guidance_only=True, coaching=True, visible_context='')
                self.assertEqual(c['applicability'], 'needs_information')
                for key in ['teaching_interpretation', 'conditional_interpretation', 'trigger', 'boundary']:
                    self.assertNotIn(key, c)
                self.assertNotIn('quote', c['evidence'][0])

    def test_actual_pancreatitis_case_uses_visible_data_and_keeps_unknown_infection(self):
        case = tools._case_for_session({'case_id': 'CL122'}, ROOT)
        with patch.object(tools, '_case_for_session', return_value=case), patch.object(tools, 'read_dialogue', return_value=[]):
            visible = tools._experience_visible_context({'case_id': 'CL122'}, ROOT)
        c = ex.search('K72', allow_cards=False, guidance_only=True, coaching=True, visible_context=visible)['cards'][0]
        self.assertEqual(c['id'], 'K72')
        self.assertEqual(c['applicability'], 'applicable')
        self.assertIn('48小时', c['teaching_interpretation'])
        c = ex.search('K73', allow_cards=False, guidance_only=True, coaching=True, visible_context=visible)['cards'][0]
        self.assertEqual(c['applicability'], 'needs_information')
        self.assertTrue(c['questions'])


if __name__ == '__main__':
    unittest.main()
