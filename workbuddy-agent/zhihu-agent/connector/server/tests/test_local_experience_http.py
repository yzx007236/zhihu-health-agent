"""Real loopback HTTP acceptance; no SDK, browser or outbound network required."""
import json
import os
from pathlib import Path
import shutil
import sys
import threading
import unittest
import uuid
from urllib.request import Request, urlopen
from urllib.error import HTTPError
from unittest.mock import patch

ROOT = Path(__file__).resolve().parents[5]
sys.path.insert(0, str(ROOT))
import run_local

DEMO = "68岁，已确诊慢阻肺，规范开药，已用吸入药，仍气促，病情稳定，共病已评估。"


class LocalHTTPAcceptance(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        cls.directory = ROOT / "tmp" / ("http-acceptance-" + uuid.uuid4().hex)
        cls.directory.mkdir(parents=True)
        cls.env = patch.dict(os.environ, {"ZHIHU_SESSION_STORE": str(cls.directory / "sessions"), "ZHIHU_EXPERIENCE_ENABLED": "1"})
        cls.env.start()
        cls.server = run_local.ThreadingHTTPServer(("127.0.0.1", 0), run_local.Handler)
        cls.base = f"http://127.0.0.1:{cls.server.server_port}"
        cls.thread = threading.Thread(target=cls.server.serve_forever, daemon=True)
        cls.thread.start()

    @classmethod
    def tearDownClass(cls):
        cls.server.shutdown(); cls.server.server_close(); cls.thread.join(3)
        cls.env.stop()
        shutil.rmtree(cls.directory)

    def request(self, path, payload=None, origin=None):
        body = json.dumps(payload).encode("utf-8") if payload is not None else None
        headers = {"Content-Type": "application/json"}
        if origin:
            headers["Origin"] = origin
        response = urlopen(Request(self.base + path, data=body, headers=headers), timeout=10)
        with response:
            return response.read().decode("utf-8"), response.headers

    def post(self, path, payload):
        return json.loads(self.request(path, payload)[0])

    def call(self, tool, **args):
        result = self.post("/api/agent", {"action": "mcp_call", "tool": tool, "args": args})
        self.assertEqual(result["status"], "ok", result)
        return result["result"]

    def test_adaptive_case_flow_over_http(self):
        direct = self.call('start_session', major='nursing', mode='complete')['session_id']
        self.assertEqual(self.call('select_training_case', session_id=direct, case_id='NU1')['stage'], 'case_read')
        sid = self.call('start_session', major='medical_technology', mode='complete')['session_id']
        self.call('get_pretest', session_id=sid)
        state, _ = run_local.tools._store().load(sid)
        answers = {}
        for qid, mapping in state['pretest_option_maps'].items():
            question = run_local.tools.build_paper('medical_technology', state['pretest_level'], question_ids=[qid])[0]
            answers[qid] = next(display for display, stable in mapping.items() if stable not in question['answer'])
        result = self.call('submit_pretest', session_id=sid, answers=answers)['pretest_result']
        wrong = {item['question_id'] for item in result['detail'] if item['correct'] is False}
        recommended = self.call('start_session', major='medical_technology', mode='complete', session_id=sid, new_batch=True)
        matched = [case for case in recommended['recommended_cases'] if case['recommendation_reasons']]
        self.assertTrue(matched)
        self.assertTrue(all(reason['question_id'] in wrong for case in matched for reason in case['recommendation_reasons']))
        self.call('select_training_case', session_id=sid, case_id=matched[0]['case_id'])
        next_round = self.call('start_session', major='medical_technology', mode='complete', source_session_id=sid)
        status = self.call('get_session_status', session_id=next_round['session_id'])
        self.assertEqual(status['dialogue_turns'], 0)
        self.assertFalse(status['session'].get('case_id'))
        self.assertTrue(any(case['recommendation_reasons'] for case in next_round['recommended_cases']))

    def test_twenty_question_paper_over_http(self):
        sid = self.call('start_session', major='clinical_medicine', mode='complete')['session_id']
        paper = self.call('get_pretest', session_id=sid, level='expert', question_count=20)
        self.assertEqual(len(paper['questions']), 20)
        protected = self.post('/api/experience', {'query': DEMO, 'session_id': sid})
        self.assertEqual(protected['outcome'], 'stage_restricted')
        graded = self.call('submit_pretest', session_id=sid, answers={})['pretest_result']
        self.assertEqual(len(graded['detail']), 20)
        self.assertEqual(graded['score'], 0)
        self.assertEqual(len(self.call('get_pretest', session_id=sid)['questions']), 5)

    def test_01_local_index_blocks_external_connections(self):
        content, headers = self.request("/")
        self.assertIn('window.__LOCAL_ONLY__=true', content)
        self.assertIn('window.__AGENT_API__="/api/agent"', content)
        self.assertIn('experience.js', content)
        self.assertNotIn('<script src="https://', content)
        self.assertIn("connect-src 'self'", headers["Content-Security-Policy"])
        self.assertIn("experience-open", self.request("/experience.js")[0])
        self.assertIn('experience.css', content)
        stylesheet, css_headers = self.request('/experience.css')
        self.assertIn('.experience-companion', stylesheet)
        self.assertIn('text/css', css_headers['Content-Type'])

    def test_02_actual_retrieval_and_safely_disabled(self):
        result = self.post("/api/experience", {"query": DEMO})
        card = next(c for c in result["cards"] if c["id"] == "K41")
        self.assertEqual(card["applicability"], "applicable")
        self.assertIn("未阅读全文", card["evidence"][0]["source"]["verification_scope"])
        self.assertEqual(self.post("/api/experience", {"query": DEMO, "enabled": False})["cards"], [])
        self.assertEqual(json.loads(self.request("/api/experience/status")[0])["status"], "available")

    def test_03_stage_guard_real_session_and_fallback_session(self):
        sid = self.call("start_session", major="nursing")["session_id"]
        result = self.post("/api/experience", {"query": DEMO, "session_id": sid})
        self.assertEqual(result["outcome"], "stage_restricted")
        self.call("select_training_case", session_id=sid, case_id="S1")
        for args in ({"session_id": sid}, {"training_active": True}):
            result = self.post("/api/experience", {"query": DEMO, **args})
            self.assertEqual(result["mode"], "training_guidance")
            self.assertTrue(result["cards"])
            self.assertFalse(result["review_allowed"])
            self.assertTrue(all("quote" not in e for c in result["cards"] for e in c["evidence"]))
        protected = self.call("get_experience_references", query=DEMO, training_active=True, assessment_active=True)
        self.assertEqual(protected["outcome"], "stage_restricted")
        self.assertFalse(protected["cards"])
        guided = self.call("get_experience_references", query=DEMO, training_active=True)
        self.assertEqual(guided["mode"], "training_guidance")
        result = self.post("/api/experience", {"query": "疑似休克", "session_id": sid})
        self.assertTrue(result["urgent"])

    def test_04_full_http_case_report_and_broken_resource_score(self):
        sid = self.call("start_session", major="clinical_medicine")["session_id"]
        selected = self.call("select_training_case", session_id=sid, case_id="CLX001")
        self.call("advance_stage", session_id=sid, stage="进入对话")
        director = self.call("get_sp_state", session_id=sid)["dialogue_director"]
        context = DEMO.replace("68岁", str(selected["public_case"]["public_profile"]["age"]) + "岁")
        for i in range(8):
            self.call("append_exchange", session_id=sid, student_text="我确认症状时间线并解释计划与风险。", resident_text=context if i == 0 else "好。",
                      covered_points=director["required_points"] if i == 0 else [], professional_conclusion=True,
                      action_plan=True, teach_back=i == 7, safety_closure=i == 7)
        guided = self.post("/api/experience", {"session_id": sid, "query": "K41"})
        self.assertEqual(guided["mode"], "training_guidance")
        card = next(c for c in guided["cards"] if c["id"] == "K41")
        self.assertEqual(card["applicability"], "applicable")
        self.assertFalse(guided["review_allowed"])
        self.assertNotIn("teaching_interpretation", card)
        coached = self.post("/api/experience", {"session_id": sid, "query": "K41", "learning_mode": "coach"})
        self.assertEqual(coached["mode"], "coaching")
        self.assertIn("吸入", coached["cards"][0]["teaching_interpretation"])
        self.assertEqual(coached["assistance"]["consultations"], 1)
        independent = self.post("/api/experience", {"session_id": sid, "learning_mode": "assessment"})
        self.assertEqual(independent["cards"], [])
        self.assertEqual(independent["assistance"]["consultations"], 1)
        self.call("advance_stage", session_id=sid, stage="结束对话，进入复盘")
        first = self.call("score_session", session_id=sid, evidence_candidates=[])["score_result"]
        with patch.dict(os.environ, {"ZHIHU_EXPERIENCE_PATH": str(self.directory / "missing.json")}):
            self.assertEqual(self.call("score_session", session_id=sid, evidence_candidates=[])["score_result"], first)
            self.assertEqual(self.post("/api/experience", {"session_id": sid})["status"], "unavailable")
        report = self.call("generate_training_report", session_id=sid)
        html = Path(report["report_html"]).read_text(encoding="utf-8")
        self.assertIn("K41", html)
        self.assertIn("指南原文推荐", html)
        self.assertIn("未阅读全文", html)
        self.assertIn("本轮使用指南带教 1 次", html)
        self.assertEqual(report["summary"]["experience_assistance"]["consultations"], 1)
        self.assertEqual(self.call("get_session_status", session_id=sid)["session"]["stage"], "report")

    def test_05_rejects_external_origin_and_private_files(self):
        with self.assertRaises(HTTPError) as rejected:
            self.request("/api/experience", {"query": DEMO}, origin="https://example.invalid")
        self.assertEqual(rejected.exception.code, 403)
        for path in ("/%2egit/config", "/.git/config", "/../README.md", "/build_data.py"):
            with self.subTest(path=path), self.assertRaises(HTTPError) as denied:
                self.request(path)
            self.assertEqual(denied.exception.code, 404)

    def test_collected_chest_image_reaches_http_and_mcp_without_becoming_diagnosis(self):
        sid = self.call('start_session', major='clinical_medicine')['session_id']
        selected = self.call('select_training_case', session_id=sid, case_id='IM-O2')
        lab = next(e for e in selected['public_case']['structured']['labs'] if e['item'] == '胸部 X 线')
        self.assertTrue(lab['finding'])
        payload = {'session_id': sid, 'query': 'K56', 'learning_mode': 'coach'}

        def image_check(result):
            card = next(c for c in result['cards'] if c['id'] == 'K56')
            self.assertEqual(card['applicability'], 'needs_information')
            return next(c['result'] for c in card['condition_checks'] if c['condition'] == 'requires:0')

        self.assertEqual(image_check(self.post('/api/experience', payload)), 'unknown')
        snapshot = {'case_id': 'IM-O2', 'labs': [lab['item']]}
        self.assertEqual(image_check(self.post('/api/experience', {**payload, 'collected': snapshot})), 'present')
        self.assertEqual(image_check(self.call('get_experience_references', **payload, collected=snapshot)), 'present')
        for snapshot in ({'case_id': 'IM-O2', 'labs': []}, {'case_id': 'OLD', 'labs': [lab['item']]}):
            self.assertEqual(image_check(self.post('/api/experience', {**payload, 'collected': snapshot})), 'unknown')

    def test_v32_pancreatitis_visible_source_and_missing_infection_over_http(self):
        sid = self.call('start_session', major='clinical_medicine')['session_id']
        self.call('select_training_case', session_id=sid, case_id='CL122')
        payload = {'session_id': sid, 'learning_mode': 'coach'}
        result = self.post('/api/experience', {**payload, 'query': 'K72'})
        self.assertEqual(result['resource']['version'], '3.2')
        card = result['cards'][0]
        self.assertEqual((card['id'], card['applicability']), ('K72', 'applicable'))
        self.assertIn('48小时', card['teaching_interpretation'])
        self.assertEqual(card['evidence'][0]['source']['doi'], '10.1186/s13017-019-0247-0')
        result = self.post('/api/experience', {**payload, 'query': 'K73'})
        card = result['cards'][0]
        self.assertEqual((card['id'], card['applicability']), ('K73', 'needs_information'))
        self.assertTrue(card['questions'])
        self.assertFalse(card['teaching_interpretation'])

    def test_06_no_cloud_or_model_dispatch(self):
        with self.assertRaises(HTTPError) as malformed:
            self.post("/api/experience", [])
        self.assertEqual(malformed.exception.code, 400)
        with self.assertRaises(HTTPError) as rejected:
            self.post("/api/agent", {"action": "create_workbuddy_session"})
        self.assertEqual(rejected.exception.code, 503)
        self.assertTrue(json.loads(self.request("/api/agent")[0])["local_only"])


if __name__ == "__main__":
    unittest.main(verbosity=2)
