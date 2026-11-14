#!/usr/bin/env python3
"""End-to-end test of the MCP tool implementation without an MCP host."""

import contextlib
import json
import os
import shutil
import sys
from pathlib import Path

SERVER_ROOT = Path(__file__).resolve().parent.parent
sys.path.insert(0, str(SERVER_ROOT))

from zhihu_mcp import tools


@contextlib.contextmanager
def _temp_dir():
    """self-managed temp dir; tempfile.mkdtemp marks dirs read-only on some Windows setups."""
    path = Path(__file__).parent / f"zhihu-mcp-test-{os.getpid()}"
    shutil.rmtree(path, ignore_errors=True)
    path.mkdir(parents=True, exist_ok=True)
    try:
        yield path
    finally:
        shutil.rmtree(path, ignore_errors=True)


def main() -> None:
    with _temp_dir() as temporary:
        os.environ["ZHIHU_SESSION_STORE"] = str(Path(temporary) / "sessions")
        health = tools.health_check()
        assert health["status"] == "ok"
        # v4.3 起病例/主题只增不减：新增 5 例医院门诊结构化病例（246→251，85→90）
        assert health["case_count"] >= 251, health
        assert health["case_topic_count"] >= 90, health
        assert health["knowledge_card_count"] >= 370, health
        assert health["rubric_version"] == "1.1.0", health
        public_cases = tools.list_training_cases()["cases"]
        expanded = tools._expanded_cases()
        expanded_openings = [case["persona"].get("opening_line") for case in expanded]
        assert len(expanded) == 192
        assert all(expanded_openings) and len(set(expanded_openings)) == 192
        assert not any(opening == "（担心地）害怕问题被忽视。" for opening in expanded_openings)
        retired_labels = {"高血压", "2 型糖尿病", "2型糖尿病", "糖尿病"}
        assert not ({case.get("disease_label") for case in public_cases} & retired_labels)
        unmatched = tools.begin_training("今天天气不错")
        assert unmatched["status"] == "unmatched" and unmatched["accepted_triggers"]
        opened = tools.begin_training("开始知护")
        assert opened["awaiting_major"] is True and opened["session"]["stage"] == "idle"
        assert "训练已启动" in opened["ack"] and len(opened["major_options"]) == 7
        opened_id = opened["session_id"]
        assert tools.get_session_status(opened_id)["session"]["awaiting_major"] is True
        chosen = tools.start_session("护理学", session_id=opened_id)
        assert chosen["session"]["learner_profile"]["major_id"] == "nursing"
        assert chosen["session"]["learner_role"] == "virtual_registered_nurse"
        assert "nursing_judgement" in chosen["session"]["role_permissions"]
        assert chosen["session"]["awaiting_major"] is False and chosen["session"]["stage"] == "case_read"
        assert chosen["recommended_cases"]
        one_shot = tools.begin_training("开始知护，我是临床医学")
        assert one_shot["session"]["learner_profile"]["major_id"] == "clinical_medicine"
        assert one_shot["session"]["learner_role"] == "virtual_physician"
        assert "working_diagnosis" in one_shot["session"]["role_permissions"]
        assert one_shot["session"]["stage"] == "case_read"
        medtech = tools.start_session("medical_technology")
        assert medtech["session"]["learner_role"] == "virtual_medical_technologist"
        assert {"specimen_collection", "serum_processing"}.issubset(medtech["session"]["role_permissions"])
        quick = tools.start_session("rehabilitation")
        assert quick["session"]["stage"] == "case_read"
        assert len(quick["recommended_cases"]) == 4

        # 临床医学默认优先完整门诊结构化病例，也可显式进入仅含这 5 例的训练入口。
        structured_ids = {"CL-O1", "IM-O2", "GI-O3", "EN-O4", "RM-O5"}
        clinical_default = tools.start_session("clinical_medicine")
        assert {case["case_id"] for case in clinical_default["recommended_cases"]} <= structured_ids
        outpatient = tools.start_session("clinical_medicine", case_mode="outpatient_structured")
        assert outpatient["case_pool_size"] == 5
        assert {case["case_id"] for case in outpatient["recommended_cases"]} <= structured_ids

        # 推荐病例必须全部属于所选专业，不能拿别的专业病例补位
        for major in ("clinical_medicine", "medical_technology", "nursing", "traditional_chinese_medicine", "rehabilitation", "health_management"):
            payload = tools.start_session(major)
            recs = payload["recommended_cases"]
            pool = {c["case_id"] for c in tools.list_training_cases(major=major)["cases"] if c["recommended"]}
            assert recs, major
            assert len(recs) == 4, (major, [c["case_id"] for c in recs])
            assert {c["case_id"] for c in recs} <= pool, (major, [c["case_id"] for c in recs])
            assert all(case["recommended"] for case in recs), (major, [c["case_id"] for c in recs])
            assert all(case["professional_focus"] for case in recs), (major, [c["case_id"] for c in recs])

        # 每次随机抽：同一专业开多次会话，抽到的病例应能覆盖到 4 个以上不同病例
        seen: set[str] = set()
        for _ in range(20):
            seen |= {c["case_id"] for c in tools.start_session("clinical_medicine")["recommended_cases"]}
        assert len(seen) > 4, seen

        # 换一批：同一会话重新抽 4 个，且不再是同一批
        sid = tools.start_session("clinical_medicine")["session"]["session_id"]
        first = [c["case_id"] for c in tools.start_session("clinical_medicine", session_id=sid)["recommended_cases"]]
        second = [c["case_id"] for c in tools.start_session("clinical_medicine", session_id=sid, new_batch=True)["recommended_cases"]]
        assert len(second) == 4 and set(first).isdisjoint(second), (first, second)

        # 退役病例既不能列出，也不能绕过列表按旧编号直接选择
        retired_session = tools.start_session("clinical_medicine")["session"]["session_id"]
        for retired_case_id in ("C3", "D1"):
            try:
                tools.select_training_case(retired_session, retired_case_id)
            except tools.RuntimeErrorWithCode as exc:
                assert exc.code == "case_retired", (retired_case_id, exc.code)
            else:
                raise AssertionError(f"retired case remained selectable: {retired_case_id}")

        for case_id in ("MT2", "MT3", "TCM2", "TCM3", "R1", "R2"):
            picked = tools.select_training_case(tools.start_session("other")["session"]["session_id"], case_id)
            assert picked["status"] == "ok" and picked["public_case"]["case_id"] == case_id, case_id
        assert "recommendation_note" in tools.start_session("medical_technology")
        rehab_course = tools.get_knowledge(major_id="rehabilitation", course_id="rh_dysphagia")
        assert rehab_course["status"] == "ok" and rehab_course["course"]["course_label"] == "言语与吞咽康复"
        assert rehab_course["knowledge_cards"], rehab_course
        health_course = tools.get_knowledge(major_id="health_management", course_id="hm_statistics")
        assert health_course["status"] == "ok" and health_course["knowledge_cards"], health_course

        session_id = tools.start_session("clinical_medicine", "complete")["session"]["session_id"]
        paper = tools.get_pretest(session_id)
        assert len(paper["questions"]) == 5
        assert paper["level"] == "basic" and paper["available_levels"] == ["basic", "intermediate", "advanced", "expert", "english"], paper
        assert all("answer" not in question for question in paper["questions"])
        assert paper["questions"][0]["difficulty"] == "basic"
        assert "例如" not in paper["next_action"]

        def answers_for(public_paper, level):
            question_ids = [question["question_id"] for question in public_paper["questions"]]
            private_paper = tools.build_paper(
                "clinical_medicine", level, question_ids=question_ids
            )
            private_by_id = {question["question_id"]: question for question in private_paper}
            answers = {}
            for public in public_paper["questions"]:
                private = private_by_id[public["question_id"]]
                correct_texts = [private["options"][stable] for stable in str(private["answer"])]
                displayed = [letter for letter, text in public["options"].items() if text in correct_texts]
                answers[public["question_id"]] = "".join(sorted(displayed))
            return answers

        answers = answers_for(paper, "basic")
        assert tools.submit_pretest(session_id, answers)["stage"] == "case_read"
        intermediate = tools.get_pretest(session_id, level="再难一点")
        assert intermediate["level"] == "intermediate" and intermediate["retake"] is True and len(intermediate["questions"]) == 5, intermediate
        assert intermediate["questions"][0]["difficulty"] == "intermediate"
        advanced = tools.get_pretest(session_id, level="再难一点")
        assert advanced["level"] == "advanced" and advanced["retake"] is True and len(advanced["questions"]) == 5, advanced
        assert advanced["questions"][0]["difficulty"] == "advanced"
        advanced_answers = answers_for(advanced, "advanced")
        assert tools.submit_pretest(session_id, advanced_answers)["pretest_result"]["level"] == "advanced"
        expert_alias = tools.get_pretest(session_id, level="太简单了")
        assert expert_alias["level"] == "expert" and expert_alias["retake"] is True
        assert expert_alias["questions"][0]["difficulty"] == "expert"
        assert expert_alias["render_contract"]["mode"] == "verbatim"
        expert_question = expert_alias["questions"][0]
        assert expert_question["type"] in {"single_choice", "multiple_choice"} and len(expert_question["options"]) == 4
        assert "subquestions" not in expert_question and "render_validation" not in expert_question
        assert all(f"{key}. {value}" in expert_question["display_text"] for key, value in expert_question["options"].items())
        tools.submit_pretest(session_id, answers_for(expert_alias, "expert"))
        again = tools.get_pretest(session_id)
        assert again["level"] == "basic" and again["retake"] is True and len(again["questions"]) == 5, again

        # 医学英语题必须逐题挂接知识卡；错题与薄弱节点须跨会话进入同一学习档案。
        archive_learner = "acceptance-learner"
        archive_session = tools.start_session("nursing", "complete", learner_id=archive_learner)["session_id"]
        english = tools.get_pretest(archive_session, "医学英语")
        assert english["level"] == "english" and len(english["questions"]) == 5
        wrong_answers = {question["question_id"]: "" for question in english["questions"]}
        english_result = tools.submit_pretest(archive_session, wrong_answers)["pretest_result"]
        assert all(item["explanation_ref"].startswith(("K-EN-", "K-TEXTBOOK-EN-")) for item in english_result["detail"])
        assert all(item["explanation"]["knowledge"]["knowledge_id"] == item["explanation_ref"] for item in english_result["detail"])
        assert all(item["explanation"]["knowledge"]["source"] for item in english_result["detail"])
        resumed_archive = tools.start_session("nursing", learner_id=archive_learner)["learning_archive"]
        assert resumed_archive["pretest_attempt_count"] == 1
        assert len(resumed_archive["wrong_questions"]) == 5
        assert resumed_archive["six_axis_radar"]["knowledge"] == 0.0
        public_case = tools.select_training_case(session_id, "CLX001")["public_case"]
        assert "hidden_info" not in public_case
        entered = tools.advance_stage(session_id, "进入对话")
        assert entered["stage"] == "dialogue" and entered["traversed"] == ["case_assessment", "dialogue"], entered
        assert entered["simulation_contract"]["assistant_role"] == "虚拟患者/SP"
        assert entered["simulation_contract"]["learner_role"] == "虚拟接诊医生"
        status_in_dialogue = tools.get_session_status(session_id)["session"]
        assert status_in_dialogue["interaction_mode"] == "sp_simulation" and status_in_dialogue["audience"] == "patient"
        internal_sp = tools.get_sp_state(session_id)
        assert internal_sp["simulation_contract"]["assistant_role"] == "virtual_patient_sp_only"
        assert "serum_processing" not in internal_sp["simulation_contract"]["role_permissions"]
        student_text = "这条警示记录还伴有头晕，建议现在联系医务人员，紧急时拨打120。"
        required = internal_sp["dialogue_director"]["required_points"]
        first = tools.append_exchange(
            session_id, student_text, "我有点担心，要现在去吗？",
            covered_points=required[:1],
        )
        turn_id = first["student_record"]["turn_id"]
        tools.append_exchange(
            session_id, "我再核对一下症状时间线和危险信号。", "好，您问吧。",
            covered_points=required[1:3], professional_conclusion=True,
        )
        third_exchange = tools.append_exchange(
            session_id, "结合目前信息，我已形成专业判断并说明具体处置与复评计划。", "我明白了，会按计划做。",
            covered_points=required[3:], professional_conclusion=True, action_plan=True,
        )
        assert third_exchange["dialogue_director"]["ready_to_close"] is False
        for index in range(4, 8):
            tools.append_exchange(session_id, f"我继续完成第{index}轮岗位沟通。", "好，我在听。")
        final_exchange = tools.append_exchange(
            session_id, "请您复述刚才的计划；如出现说明的异常情况，按安全网要求立即处理。",
            "我可以复述，也知道什么情况要及时处理。",
            teach_back=True, safety_closure=True,
        )
        assert final_exchange["dialogue_director"]["ready_to_close"] is True
        incomplete_or_done = tools.advance_stage(session_id, "结束对话，进入复盘")
        assert incomplete_or_done["stage"] == "evidence_extraction"
        assert incomplete_or_done["completion_marker"] == "【SP对话完成｜进入复盘】"
        evidence = [{
            "item_id": "RISK-01",
            "turn_id": turn_id,
            "quote": student_text,
            "tags": ["identify_case_warning", "timely_referral"],
            "confidence": 0.99,
            "source": "evidence_extractor",
        }]
        assert tools.score_session(session_id, evidence)["score_result"]["status"] == "ok"
        scored_archive = tools.get_session_status(session_id)["learning_archive"]
        assert scored_archive["case_attempt_count"] >= 1
        assert any(value is not None for key, value in scored_archive["six_axis_radar"].items() if key != "knowledge")
        report = tools.generate_training_report(session_id)
        assert Path(report["report_json"]).is_file()
        assert Path(report["report_html"]).is_file()
        assert tools.get_session_status(session_id)["session"]["stage"] == "report"
        variant = tools.generate_case_variant(session_id, "auto")
        assert variant["stage"] == "case_read" and variant["variant_of"] == "CLX001", variant
        assert variant["session_id"] != session_id and variant["public_case"]["variant_of"] == "CLX001"
        assert "hidden_info" not in variant["public_case"] and "release_conditions" not in variant["public_case"]
        variant_status = tools.get_session_status(variant["session_id"])["session"]
        assert variant_status["source_session_id"] == session_id and variant_status["stage"] == "case_read"
        variant_sp = tools.get_sp_state(variant["session_id"])
        assert variant_sp["case"]["hidden_info"][-1]["id"] == "H-VAR"
        assert tools.get_session_status(session_id)["session"]["stage"] == "retrain"

        quick_id = quick["session"]["session_id"]
        tools.select_training_case(quick_id, "S1")
        tools.advance_stage(quick_id, "case_assessment")
        tools.advance_stage(quick_id, "dialogue")
        exchange = tools.append_exchange(quick_id, "您最想先恢复什么活动？", "我想自己去卫生间。", ["H1"], {"emotion": "愿意交流"})
        assert exchange["student_record"]["turn_id"] + 1 == exchange["resident_record"]["turn_id"]
    print("[OK] ZhiHu MCP tools end-to-end test passed")


if __name__ == "__main__":
    main()
