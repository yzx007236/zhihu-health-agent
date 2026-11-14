#!/usr/bin/env python3
"""五工具冒烟、确定性回归、红线与报告链路测试。"""
import importlib, json, sys
from pathlib import Path
ROOT=Path(__file__).resolve().parent.parent; sys.path.insert(0,str(ROOT/"scripts"))
from check_pretest import build_paper, check_pretest, list_levels
from retrieve_knowledge import retrieve_knowledge
from get_training_case import get_training_case
from score_training import score_training
from generate_report import generate_report, render_html
from workbuddy_runtime import detect_major_in_text, match_start_trigger, normalize_major

VERSION=json.loads((ROOT/"references"/"rubric.json").read_text(encoding="utf-8"))["rubric_version"]

def _load(path): return json.loads((ROOT/path).read_text(encoding="utf-8"))

def main():
    basic=build_paper("nursing", "basic")
    basic_ids=[q["question_id"] for q in basic]
    result=check_pretest({"answers":{q["question_id"]:q["answer"] for q in basic}}, major="nursing", level="basic", question_ids=basic_ids); assert result["score"]==5 and not result["weak_nodes"]
    assert retrieve_knowledge("measurement_device_posture")["status"]=="ok"
    assert retrieve_knowledge(knowledge_id="K-BP-006")["status"]=="ok"
    ids=[c["case_id"] for c in get_training_case()["cases"]]
    # v4.3 起病例库可继续扩容（新增 5 例医院门诊结构化病例），这里只锁定基线集合，避免每加一例就改测试
    base_ids=["C1", "C1-V1", "C2", "C2-V1", "C3", "C3-V1", "C4", "C4-V1", "C5", "C5-V1", "D1", "D1-V1", "P1", "P1-V1", "S1", "S1-V1", "CL1", "CL2", "CL3", "CL4", "CL5", "CL6", "CL7", "HM1", "HM2", "HM3", "HM4", "HM5", "HM6", "MT1", "MT2", "MT3", "MT4", "MT5", "MT6", "MT7", "MT8", "MT9", "NU1", "NU2", "NU3", "NU4", "NU5", "NU6", "NU7", "R1", "R2", "R3", "R4", "R5", "R6", "R7", "R8", "TCM1", "TCM2", "TCM3", "TCM4", "TCM5", "TCM6", "TCM7", "TCM8", "TCM9", "CL1-V1", "MT1-V1", "NU1-V1", "TCM1-V1"]
    assert set(base_ids).issubset(set(ids)), [i for i in base_ids if i not in ids]
    assert len(ids)==len(set(ids)), "病例 case_id 有重复"
    assert len(ids)>=len(base_ids)+5, ("v4.3 应含 5 例门诊结构化病例", len(ids))
    diseases={c["disease_id"] for c in get_training_case()["cases"]}
    assert {"clinical_comprehensive", "laboratory_medicine", "nursing_comprehensive", "tcm_clinical_reasoning", "dysphagia_rehabilitation"}.issubset(diseases), diseases
    for major, focus in (("clinical_medicine","clinical_comprehensive"),("medical_technology","laboratory_medicine"),("nursing","nursing_comprehensive"),("traditional_chinese_medicine","tcm_health_management"),("rehabilitation","stroke_rehabilitation")):
        picked=[c for c in get_training_case(major=major)["cases"] if c["recommended"]]
        assert picked, major
        assert any(c["disease_id"]==focus for c in picked), (major, focus)
        assert len({c["case_id"] for c in picked})>=8, (major, len(picked))
    nursing=get_training_case(major="nursing")["cases"]
    assert nursing[0]["recommended"] and any(c["disease_id"]=="copd" and c["recommended"] for c in nursing)
    for kid in ("K-DM-001","K-COPD-001","K-STROKE-002","K-CLIN-101","K-CLIN-163","K-MT-101","K-MT-172","K-NUR-101","K-NUR-172","K-TCM-101","K-TCM-172"):
        assert retrieve_knowledge(knowledge_id=kid)["status"]=="ok", kid
    for major, minimum in (("clinical_medicine",63),("medical_technology",72),("nursing",72),("traditional_chinese_medicine",72)):
        pack=retrieve_knowledge(node_id=major)
        assert pack["status"]=="ok" and len(pack["knowledge_cards"])>=minimum, (major, len(pack["knowledge_cards"]))
    quiz=_load("references/quizzes/pretest.json")
    papers=quiz["major_papers"]
    assert len(papers)==7, list(papers)
    for major in papers:
        levels=list_levels(major)
        assert levels, (major,levels)
        for level in levels:
            qs=build_paper(major,level)
            assert len(qs)==5 and len({q["question_id"] for q in qs})==5, (major, level)
            answers={q["question_id"]:q["answer"] for q in qs}
            graded=check_pretest({"answers":answers}, major=major, level=level, question_ids=[q["question_id"] for q in qs])
            assert graded["score"]==5 and graded["level"]==level and not graded["weak_nodes"], (major, level, graded["score"])
        # ④ 医学英语档：每个专业都应有一卷 5 题，题干为英文、解析为中文
        assert "english" in levels, (major, levels)
        en=build_paper(major,"english")
        assert len(en)==5, (major, len(en))
        assert all(not any("\u4e00"<=ch<="\u9fff" for ch in q["stem"]) for q in en), major
        en_graded=check_pretest({"answers":{q["question_id"]:q["answer"] for q in en}}, major=major, level="english", question_ids=[q["question_id"] for q in en])
        assert en_graded["score"]==5, (major, en_graded["score"])
    stored=[]
    for name in ("pretest.json","pretest_hard.json","pretest_en.json","pretest_westmed.json"):
        stored.extend(_load("references/quizzes/"+name)["questions"])
    assert len(stored)==642
    assert sum(q.get("active", True) for q in stored)==548
    assert check_pretest({"answers":{}}, major="clinical_medicine", level="advanced")["max_score"]==5
    assert check_pretest({"answers":{}}, major="康复治疗")["major"]=="康复治疗" and len(check_pretest({"answers":{}}, major="康复治疗")["paper"])==5
    for case_id in ids:
        public=get_training_case(case_id)
        assert public["status"]=="ok" and "hidden_info" not in public["case"], case_id
        for key in ("release_conditions","boundary_behaviors","persona","must_cover","initial_state"):
            assert key not in public["case"], f"{case_id} 泄露 {key}"
        blank=score_training({"session_id":f"SMOKE-{case_id}","case_id":case_id,"rubric_version":VERSION,"evidence_candidates":[]})
        assert blank["status"]=="ok" and blank["raw_max_score"]>0, f"{case_id} 无适用评分项"
    golden=_load("tests/golden_dialogues/c3_complete.json")
    first=score_training(golden); second=score_training(golden); assert first==second and first["total_score"]==100
    c4=score_training(_load("tests/golden_dialogues/c4_complete.json"))
    assert c4==score_training(_load("tests/golden_dialogues/c4_complete.json")) and c4["total_score"]==100
    assert c4["raw_max_score"]==105 and not c4["red_lines"]
    red=score_training(_load("tests/red_line_cases/medication_adjustment.json"))
    assert red["red_lines"] and red["total_score"]<=59
    clinic=score_training(_load("tests/red_line_cases/clinic_diagnosis.json"))
    clinic_ids={r["red_line_id"] for r in clinic["red_lines"]}
    assert {"RL-DIAG-01","RL-REM-01"}.issubset(clinic_ids), clinic_ids
    assert clinic["total_score"]<=59
    assert match_start_trigger("开始知护") and match_start_trigger("知护，开始训练") and match_start_trigger("/start")
    assert match_start_trigger("今天天气不错") is None
    assert detect_major_in_text("开始知护，我是护理学")=="nursing"
    assert detect_major_in_text("开始知护，我是临床医学")=="clinical_medicine"
    assert detect_major_in_text("开始知护") is None
    assert normalize_major("医学技术")=="medical_technology"
    report=generate_report(first); assert report["overview"]["case_id"]=="C3" and "不构成" in report["safety_notice"]
    c4_report=generate_report(c4); assert c4_report["retrain"]["case_id"]=="C4-V1"
    page=render_html(report); assert "window.__REPORT__" in page and "训练复盘报告" in page
    print(f"[OK] 启动口令与专业识别、自测批改（7 套卷）、专业知识检索、{len(ids)} 例病例读取、专业推荐、确定性评分、红线、报告链路全部通过")
if __name__=="__main__": main()
