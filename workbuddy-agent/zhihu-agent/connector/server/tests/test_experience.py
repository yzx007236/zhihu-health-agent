"""Offline acceptance tests: applicability, provenance, stage/privacy and failure isolation."""
import hashlib
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

DEMO = "68岁，已确诊慢阻肺，规范开药，已用吸入药，仍气促，病情稳定，共病已评估。"


class ExperienceAcceptance(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        cls.data = json.loads(ex.resource_path().read_text(encoding="utf-8"))
        cls.root = SERVER / "tests" / ("experience-run-" + uuid.uuid4().hex)
        cls.root.mkdir()
        cls.environment = patch.dict(os.environ, {"ZHIHU_SESSION_STORE": str(cls.root / "sessions"), "ZHIHU_EXPERIENCE_ENABLED": "1"})
        cls.environment.start()

    @classmethod
    def tearDownClass(cls):
        cls.environment.stop()
        shutil.rmtree(cls.root)

    def card(self, query, cid):
        result = ex.search(query)
        return next(c for c in result["cards"] if c["id"] == cid)

    def test_01_resource_and_profiles(self):
        data, rules, _, _ = ex._load()
        self.assertEqual((data["card_count"], data["source_count"]), (91, 23))
        self.assertEqual(set(rules["cards"]), {c["id"] for c in data["cards"]})
        self.assertIn("尚未临床专家审定", ex.status()["clinical_review"])

    def test_02_confirmed_special_situation(self):
        card = self.card(DEMO, "K41")
        self.assertEqual(card["applicability"], "applicable")
        self.assertTrue(card["teaching_interpretation"])
        self.assertFalse(card["unconfirmed_conditions"])

    def test_03_insufficient_information_is_question_first(self):
        card = self.card("68岁，已确诊慢阻肺，仍气促", "K41")
        self.assertEqual(card["applicability"], "needs_information")
        self.assertTrue(any("吸入" in q for q in card["questions"]))
        self.assertTrue(any("共病" in q for q in card["questions"]))
        self.assertFalse(card["teaching_interpretation"])

    def test_04_negative_history_is_excluded(self):
        self.assertEqual(self.card("68岁，否认慢阻肺，仍气促，已用吸入药，病情稳定，共病已评估", "K41")["applicability"], "not_applicable")

    def test_05_similar_symptom_not_a_diagnosis(self):
        result = ex.search("68岁，气促，病情稳定")
        self.assertNotEqual(result["outcome"], "applicable")
        self.assertTrue(all(c["applicability"] != "applicable" for c in result["cards"]))

    def test_06_uncertain_past_and_family_not_current_diagnosis(self):
        for clause in ("疑似慢阻肺", "尚未确诊慢阻肺", "慢阻肺未确诊", "未排除慢阻肺", "不能确定慢阻肺", "既往慢阻肺", "母亲确诊慢阻肺", "是否为慢阻肺", "已排除慢阻肺", "没有慢阻肺"):
            with self.subTest(clause=clause):
                card = self.card("68岁，" + clause + "，已用吸入药，仍气促，病情稳定，共病已评估", "K41")
                self.assertNotEqual(card["applicability"], "applicable")

    def test_07_age_group_excluded(self):
        card = self.card("K23，12岁，确诊慢性失眠，主要靠药物，否认急性失眠", "K23")
        self.assertEqual(card["applicability"], "not_applicable")

    def test_08_alternative_cause_with_comorbidity_excluded(self):
        card = self.card(DEMO + "气促明确由心衰引起。", "K41")
        self.assertEqual(card["applicability"], "not_applicable")
        self.assertTrue(any("其他病因" in s for s in card["exclusion_reasons"]))

    def test_09_non_stroke_swallowing_not_covered(self):
        card = self.card("K48，70岁，否认卒中，术后吞咽障碍，准备首次进食，未做吞咽筛查", "K48")
        self.assertEqual(card["applicability"], "not_applicable")

    def test_10_crossmatch_not_transfusion_threshold(self):
        card = self.card("35岁，交叉配血，住院，循环稳定，否认ACS，否认持续大出血", "K27")
        self.assertEqual(card["applicability"], "not_applicable")
        self.assertFalse(card["teaching_interpretation"])

    def test_11_no_match_has_no_invented_source(self):
        result = ex.search("针灸局部消毒操作规范")
        self.assertEqual(result["outcome"], "no_reliable_match")
        self.assertEqual(result["cards"], [])
        self.assertIn("暂无适用依据", result["message"])

    def test_25_partial_negative_does_not_clear_all_exclusions(self):
        card = self.card("K27，35岁，输血决策，非交叉配血，住院，循环稳定，否认ACS", "K27")
        self.assertEqual(card["applicability"], "needs_information")
        self.assertTrue(any("出血" in q for q in card["questions"]))
        card = self.card("K20，50岁，上消化道出血，持久止血已实现，固定长期禁食", "K20")
        self.assertEqual(card["applicability"], "needs_information")
        self.assertTrue(any("口服" in q for q in card["questions"]))

    def test_12_emergency_precedes_retrieval_and_disabling(self):
        for text in ("患者现在呼之不应", "疑似休克", "不排除休克", "突发言语不清", "气道梗阻"):
            for enabled in (True, False):
                with self.subTest(text=text, enabled=enabled):
                    result = ex.search(text, enabled=enabled, allow_cards=False)
                    self.assertTrue(result["urgent"])
                    self.assertIn("不要等待", result["urgent_message"])
                    self.assertEqual(result["cards"], [])

    def test_13_negative_historical_hypothetical_emergency(self):
        for text in ("否认休克", "休克已排除", "既往休克", "母亲曾经休克", "如果出现休克怎么办", "是否休克", "如何排除休克"):
            self.assertFalse(ex.emergency(text), text)

    def test_14_source_exact_and_scope_honest(self):
        card = self.card(DEMO, "K41")
        original = next(c for c in self.data["cards"] if c["id"] == "K41")
        for reference, expected in zip(card["evidence"], original["evidence"]):
            self.assertEqual({k: reference[k] for k in expected}, expected)
            self.assertEqual(reference["source"], next(s for s in self.data["sources"] if s["id"] == expected["source_id"]))
        source = card["evidence"][0]["source"]
        self.assertIn("未阅读全文", source["verification_scope"])
        self.assertIn("2026", source["version"])
        html = ex.render_reference_html(ex.search(DEMO))
        for value in ("指南原文推荐", "整理者教学转述", "原始链接", "核验范围", "未阅读全文"):
            self.assertIn(value, html)

    def test_15_stroke_version_preserved(self):
        card = self.card("K48，70岁，已确诊卒中，准备首次进食，未做吞咽筛查", "K48")
        self.assertEqual(card["applicability"], "applicable")
        source = card["evidence"][0]["source"]
        self.assertIn("2023", source["version"])
        self.assertIn("不能据此宣称最新版", source["verification_scope"])

    def test_16_local_evidence_snapshots(self):
        folder = ex.resource_path().parent
        for source in self.data["sources"]:
            snapshot = (folder / source["evidence_snapshot"]).read_text(encoding="utf-8")
            self.assertEqual(hashlib.sha256(snapshot.encode("utf-8")).hexdigest(), source["snapshot_sha256"], source["id"])
            for card in self.data["cards"]:
                for evidence in card["evidence"]:
                    if evidence["source_id"] == source["id"]:
                        # Compare with whitespace normalized, same as the supplied verification.
                        self.assertIn(" ".join(evidence["quote"].split()), " ".join(snapshot.split()), card["id"])

    def test_17_question_case_theme_node_are_only_candidates(self):
        linked = next(r for r in self.data["question_associations"] if r["links"])
        linked_case = next(r for r in self.data["case_associations"] if r["links"])
        for filters in ({"question_id": linked["question_id"]}, {"case_id": linked_case["case_id"]}, {"topic": "慢阻肺"}):
            result = ex.search(**filters)
            self.assertTrue(result["cards"])
            self.assertNotEqual(result["outcome"], "applicable")
        node_card = next(c for c in self.data["cards"] if c["node_ids"])
        self.assertTrue(ex.search(node_id=node_card["node_ids"][0])["cards"])
        hint = next((r for r in self.data["question_associations"] if r["topic_hints_only"] and not r["links"]), None)
        self.assertIsNotNone(hint)
        self.assertEqual(ex.search(question_id=hint["question_id"])["cards"], [])

    def test_18_stage_guard_and_caller_cannot_override(self):
        sid = tools.start_session("nursing")["session_id"]
        tools.select_training_case(sid, "S1")
        result = tools.get_experience_references(DEMO, session_id=sid, case_id="OTHER", question_id="Q-NU-203")
        self.assertEqual(result["mode"], "training_guidance")
        self.assertTrue(result["guidance_allowed"])
        self.assertFalse(result["review_allowed"])
        self.assertTrue(result["cards"])
        session, directory = tools._store().load(sid)
        session["stage"] = "scoring"  # a stage label alone is insufficient
        tools._store().save(session, directory)
        self.assertFalse(tools.get_experience_references(DEMO, session_id=sid)["review_allowed"])
        self.assertTrue(tools.get_experience_references("疑似休克", session_id=sid)["urgent"])

    def test_19_completed_question_review_and_retake_guard(self):
        sid = tools.start_session("nursing", "complete")["session_id"]
        paper = tools.get_pretest(sid)
        qid = paper["questions"][0]["question_id"]
        self.assertEqual(tools.get_experience_references(DEMO, session_id=sid, question_id=qid)["cards"], [])
        tools.submit_pretest(sid, {q["question_id"]: "" for q in paper["questions"]})
        self.assertTrue(tools.get_experience_references(DEMO, session_id=sid, question_id=qid)["review_allowed"])
        self.assertFalse(tools.get_experience_references(DEMO, session_id=sid, question_id="NOT_SUBMITTED")["review_allowed"])
        tools.get_pretest(sid)
        self.assertFalse(tools.get_experience_references(DEMO, session_id=sid, question_id=qid)["review_allowed"])

    def test_20_hidden_fields_and_student_claim_not_retrieval_facts(self):
        case = {"case_id": "S1", "public_profile": {"age": 68}, "hidden_info": [{"text": "HIDDEN_SENTINEL已确诊慢阻肺"}], "must_cover": ["ANSWER_SENTINEL"], "disease_id": "COPD_DIAG_SENTINEL"}
        turns = [{"speaker": "student", "raw_text": "STUDENT_DIAG_SENTINEL已确诊慢阻肺"}, {"speaker": "resident", "raw_text": "我仍气促"}]
        with patch.object(tools, "_case_for_session", return_value=case), patch.object(tools, "read_dialogue", return_value=turns):
            text = tools._experience_visible_context({"case_id": "S1"}, self.root)
        self.assertIn("仍气促", text)
        self.assertNotIn("SENTINEL", text)

    def test_21_audit_has_no_patient_identity_or_raw_query(self):
        path = self.root / "audit.jsonl"
        private = "姓名隐私哨兵张某，身份证123456789012345678，电话13800138000"
        for options in ({}, {"enabled": False}, {"allow_cards": False}):
            ex.search(private + DEMO, audit_path=path, **options)
        raw = path.read_text(encoding="utf-8")
        for token in ("张某", "123456789012345678", "13800138000", "68岁", "慢阻肺"):
            self.assertNotIn(token, raw)
        rows = [json.loads(line) for line in raw.splitlines()]
        self.assertEqual(len(rows), 3)
        self.assertIn("K41", raw)
        self.assertEqual(rows[-1]["outcome"], "stage_restricted")

    def test_22_disabled_missing_corrupt_resource_keeps_pretest_working(self):
        broken = self.root / "broken.json"
        broken.write_text("{broken", encoding="utf-8")
        for setting in (str(broken), str(self.root / "missing.json")):
            with patch.dict(os.environ, {"ZHIHU_EXPERIENCE_PATH": setting}):
                self.assertEqual(ex.search(DEMO)["status"], "unavailable")
                self.assertTrue(ex.search("疑似休克")["urgent"])
                self.assertEqual(tools.health_check()["status"], "ok")
                sid = tools.start_session("nursing", "complete")["session_id"]
                paper = tools.get_pretest(sid)
                self.assertEqual(tools.submit_pretest(sid, {q["question_id"]: "" for q in paper["questions"]})["status"], "ok")
        with patch.dict(os.environ, {"ZHIHU_EXPERIENCE_ENABLED": "0"}):
            self.assertEqual(ex.search(DEMO)["status"], "disabled")
            self.assertEqual(tools.health_check()["status"], "ok")

    def test_23_resource_reload_and_invalid_field_fails_closed(self):
        copy = json.loads(json.dumps(self.data))
        resource = self.root / "replaceable.json"
        resource.write_text(json.dumps(copy), encoding="utf-8")
        with patch.dict(os.environ, {"ZHIHU_EXPERIENCE_PATH": str(resource)}):
            first = ex.status()["sha256"]
            copy["version"] = "local-review-test"
            resource.write_text(json.dumps(copy), encoding="utf-8")
            self.assertNotEqual(ex.status()["sha256"], first)
            self.assertEqual(ex.status()["version"], "local-review-test")
            del copy["sources"][0]["verification_scope"]
            resource.write_text(json.dumps(copy), encoding="utf-8")
            self.assertEqual(ex.status()["status"], "unavailable")

    def test_24_full_training_report_and_original_score_unchanged(self):
        sid = tools.start_session("clinical_medicine")["session_id"]
        public = tools.select_training_case(sid, "CLX001")["public_case"]
        visible_demo = DEMO.replace("68岁", str(public["public_profile"]["age"]) + "岁")
        tools.advance_stage(sid, "进入对话")
        required = tools.get_sp_state(sid)["dialogue_director"]["required_points"]
        for i in range(8):
            tools.append_exchange(sid, "我核对症状并说明计划及安全边界。", visible_demo if i == 0 else "好的。",
                                  covered_points=required if i == 0 else [], professional_conclusion=True,
                                  action_plan=True, teach_back=i == 7, safety_closure=i == 7)
        tools.advance_stage(sid, "结束对话，进入复盘")
        score = tools.score_session(sid, [])["score_result"]
        _, directory = tools._store().load(sid)
        score_bytes = (directory / "score_result.json").read_bytes()
        self.assertEqual(tools.get_experience_references(session_id=sid)["outcome"], "applicable")
        tools.get_experience_references(session_id=sid, enabled=False)
        score_disabled = tools.score_session(sid, [])["score_result"]
        self.assertEqual(score, score_disabled)
        self.assertEqual(score_bytes, (directory / "score_result.json").read_bytes())
        report = tools.generate_training_report(sid)
        saved = json.loads(Path(report["report_json"]).read_text(encoding="utf-8"))
        self.assertEqual(saved["experience_references"]["status"], "disabled")
        self.assertIn("经验库已关闭", Path(report["report_html"]).read_text(encoding="utf-8"))
        self.assertEqual(score_bytes, (directory / "score_result.json").read_bytes())

    def training_result(self, public_text="已确诊慢阻肺", replies="仍气促", query="K41", **filters):
        sid = tools.start_session("nursing")["session_id"]
        tools.select_training_case(sid, "S1")
        case = {"case_id": "S1", "public_profile": {"age": 68, "history_statement": public_text},
                "hidden_info": [{"text": "HIDDEN_SENTINEL已确诊慢阻肺"}],
                "must_cover": ["ANSWER_SENTINEL"], "disease_id": "COPD_DIAG_SENTINEL"}
        turns = [{"speaker": "student", "raw_text": "STUDENT_DIAG_SENTINEL" + DEMO},
                 {"speaker": "resident", "raw_text": replies}]
        with patch.object(tools, "_case_for_session", return_value=case), patch.object(tools, "read_dialogue", return_value=turns):
            return tools.get_experience_references(query, session_id=sid, **filters)

    def test_26_training_guidance_is_useful_with_precise_source(self):
        result = self.training_result()
        card = next(c for c in result["cards"] if c["id"] == "K41")
        self.assertEqual(result["mode"], "training_guidance")
        self.assertEqual(card["applicability"], "needs_information")
        self.assertTrue(any("吸入" in q for q in card["questions"]))
        self.assertTrue(any("共病" in q for q in card["questions"]))
        source = card["evidence"][0]
        original = next(c for c in self.data["cards"] if c["id"] == "K41")["evidence"][0]
        self.assertEqual(source["locator"], original["locator"])
        self.assertIn("未阅读全文", source["source"]["verification_scope"])
        self.assertEqual(source["source"], {key: self.data["sources"][12][key] for key in source["source"]})
        html = ex.render_reference_html(result)
        self.assertIn("训练中适用性自查", html)
        self.assertIn("未阅读全文", html)
        self.assertNotIn("<blockquote>", html)

    def test_27_training_response_excludes_answer_bearing_fields(self):
        result = self.training_result(replies=DEMO)
        card = next(c for c in result["cards"] if c["id"] == "K41")
        self.assertEqual(card["applicability"], "applicable")
        self.assertFalse(result["review_allowed"])
        raw = json.dumps(result, ensure_ascii=False)
        self.assertNotIn("SENTINEL", raw)
        for card in result["cards"]:
            for key in ("trigger", "boundary", "teaching_interpretation", "conditional_interpretation", "interpretation_label"):
                self.assertNotIn(key, card)
            original = next(c for c in self.data["cards"] if c["id"] == card["id"])
            self.assertNotEqual(card["title"], original["title"])
            self.assertNotIn(original["action"], raw)
            self.assertEqual(card["additional_information"], [])
            for source in card["evidence"]:
                self.assertNotIn("quote", source)
                self.assertNotIn("grade", source)

    def test_28_hidden_case_question_associations_do_not_recall_during_practice(self):
        linked = next(r for r in self.data["case_associations"] if r["links"])
        result = self.training_result(public_text="我来咨询", replies="你好", query="",
                                      case_id=linked["case_id"], question_id="Q-NU-203")
        self.assertEqual(result["cards"], [])
        self.assertEqual(result["outcome"], "no_reliable_match")
        self.assertIn("暂无适用依据", result["message"])

    def test_29_student_query_is_not_a_confirmed_diagnosis(self):
        result = self.training_result(public_text="气促", replies="未提供其他资料", query=DEMO)
        card = next(c for c in result["cards"] if c["id"] == "K41")
        self.assertEqual(card["applicability"], "needs_information")
        background = next(c for c in card["condition_checks"] if c["condition"] == "background:copd")
        self.assertEqual(background["result"], "unknown")
        self.assertTrue(any("确诊慢阻肺" in q for q in card["questions"]))
        excluded = self.training_result(public_text="否认慢阻肺", query=DEMO)
        self.assertEqual(next(c for c in excluded["cards"] if c["id"] == "K41")["applicability"], "not_applicable")

    def test_30_training_danger_precedes_guidance_and_failure(self):
        for options in ({}, {"enabled": False}):
            result = self.training_result(replies="当前疑似休克", **options)
            self.assertTrue(result["urgent"])
            self.assertIn("不要等待", result["urgent_message"])
        with patch.dict(os.environ, {"ZHIHU_EXPERIENCE_PATH": str(self.root / "missing.json")}):
            result = self.training_result(replies="当前疑似休克")
            self.assertEqual(result["status"], "unavailable")
            self.assertTrue(result["urgent"])

    def test_31_fallback_guidance_and_open_assessment_are_distinct(self):
        result = tools.get_experience_references(DEMO, training_active=True)
        self.assertEqual(result["mode"], "training_guidance")
        self.assertTrue(result["cards"])
        self.assertTrue(all(c["applicability"] == "needs_information" for c in result["cards"]))
        result = tools.get_experience_references(DEMO, training_active=True, assessment_active=True)
        self.assertEqual(result["outcome"], "stage_restricted")
        self.assertEqual(result["cards"], [])
        sid = tools.start_session("nursing", "complete")["session_id"]
        tools.get_pretest(sid)
        result = tools.get_experience_references(DEMO, session_id=sid, training_active=False, assessment_active=False)
        self.assertEqual(result["outcome"], "stage_restricted")
        self.assertEqual(result["cards"], [])


    def test_32_coaching_conditional_and_source(self):
        result = self.training_result(learning_mode="coach")
        card = result["cards"][0]
        self.assertEqual((result["mode"], card["id"], card["applicability"]), ("coaching", "K41", "needs_information"))
        self.assertIn("吸入", card["conditional_interpretation"])
        self.assertTrue(card["questions"])
        self.assertEqual(card["evidence"][0]["locator"], "Recommendation 9 推荐摘要")
        self.assertIn("未阅读全文", card["evidence"][0]["source"]["verification_scope"])
        self.assertEqual(result["assistance"]["consultations"], 1)
        self.assertNotIn("HIDDEN_SENTINEL", json.dumps(result, ensure_ascii=False))

    def test_33_coaching_requires_confirmed_background_and_age(self):
        for history in ("否认慢阻肺", "疑似慢阻肺", "既往慢阻肺", "仅气促"):
            result = self.training_result(public_text=history, learning_mode="coach")
            card = next(c for c in result["cards"] if c["id"] == "K41")
            self.assertTrue(card["guidance_only"])
            self.assertNotIn("conditional_interpretation", card)
            self.assertNotIn("quote", card["evidence"][0])
        result = ex.search("K41", allow_cards=False, guidance_only=True, coaching=True, visible_context="12岁，已确诊慢阻肺，仍气促")
        self.assertEqual(result["cards"][0]["applicability"], "not_applicable")
        self.assertTrue(result["cards"][0]["guidance_only"])

    def test_34_mode_switch_keeps_assistance_and_pretest_guard(self):
        sid = tools.start_session("nursing")["session_id"]
        tools.select_training_case(sid, "S1")
        case = {"case_id": "S1", "public_profile": {"age": 68, "history_statement": "已确诊慢阻肺，仍气促"}}
        with patch.object(tools, "_case_for_session", return_value=case), patch.object(tools, "read_dialogue", return_value=[]):
            coached = tools.get_experience_references("K41", session_id=sid, learning_mode="coach")
            protected = tools.get_experience_references("K41", session_id=sid, learning_mode="assessment")
        self.assertEqual(coached["assistance"]["consultations"], 1)
        self.assertEqual(protected["cards"], [])
        self.assertEqual(protected["assistance"]["consultations"], 1)
        sid2 = tools.start_session("nursing")["session_id"]
        tools.get_pretest(sid2)
        self.assertEqual(tools.get_experience_references("K41", session_id=sid2, learning_mode="coach")["outcome"], "stage_restricted")


if __name__ == "__main__":
    unittest.main(verbosity=2)
