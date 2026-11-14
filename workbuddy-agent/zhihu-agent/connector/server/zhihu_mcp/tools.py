"""Tool implementations exposed by the ZhiHu MCP server."""

from __future__ import annotations

import json
import hashlib
import os
import random
import re
import sys
from functools import lru_cache
from copy import deepcopy
from pathlib import Path
from typing import Any

from . import experience, objectives

CONNECTOR_ROOT = Path(__file__).resolve().parents[2]
SKILL_ROOT = CONNECTOR_ROOT / "skills" / "zhihu"
SCRIPTS = SKILL_ROOT / "scripts"
sys.path.insert(0, str(SCRIPTS))

from workbuddy_runtime import (  # noqa: E402
    CLASSROOM_ACCESS,
    RUBRIC_PATH,
    RuntimeErrorWithCode,
    SessionStore,
    allowed_scoring_tags,
    append_dialogue,
    assign_major,
    build_paper,
    check_pretest,
    detect_major_in_text,
    generate_report,
    get_training_case,
    list_levels,
    list_majors,
    load_startup,
    match_start_trigger,
    now_iso,
    read_dialogue,
    read_json,
    render_html,
    retrieve_knowledge,
    score_training,
    set_stage,
    validate_evidence,
    write_json,
)


def _store() -> SessionStore:
    configured = os.environ.get("ZHIHU_SESSION_STORE", "").strip()
    root = Path(configured).expanduser() if configured else Path.cwd() / ".zhihu-sessions"
    return SessionStore(root)


DEFAULT_LEARNER_ID = "local-default"
LEARNER_ID_RE = re.compile(r"^[A-Za-z0-9._-]{1,64}$")
OUTPATIENT_STRUCTURED_IDS = {"CL-O1", "IM-O2", "GI-O3", "EN-O4", "RM-O5"}


def _normalize_learner_id(learner_id: str | None) -> str:
    value = str(learner_id or DEFAULT_LEARNER_ID).strip()
    if value.startswith("course-"):
        identity = CLASSROOM_ACCESS.get()
        if not identity or value != "course-" + identity[1]:
            raise RuntimeErrorWithCode("classroom_auth_required", "课程学习档案必须通过登录后的课程入口访问")
    if not LEARNER_ID_RE.fullmatch(value):
        raise RuntimeErrorWithCode("invalid_learner_id", "学习者编号只能包含字母、数字、点、下划线或连字符，长度 1—64")
    return value


def _profile_path(learner_id: str) -> Path:
    return _store().root / "_learning_profiles" / f"{_normalize_learner_id(learner_id)}.json"


def _load_profile(learner_id: str | None) -> dict[str, Any]:
    normalized = _normalize_learner_id(learner_id)
    path = _profile_path(normalized)
    if path.is_file():
        return read_json(path)
    timestamp = now_iso()
    return {
        "version": "1.0", "learner_id": normalized,
        "created_at": timestamp, "updated_at": timestamp,
        "pretest_attempts": [], "knowledge_nodes": {},
        "wrong_questions": {}, "case_attempts": [],
    }


def _save_profile(profile: dict[str, Any]) -> None:
    profile["updated_at"] = now_iso()
    write_json(_profile_path(profile["learner_id"]), profile)


def _archive_pretest(session: dict[str, Any], result: dict[str, Any]) -> None:
    profile = _load_profile(session.get("learner_id"))
    timestamp = now_iso()
    detail = result.get("detail", [])
    profile["pretest_attempts"].append({
        "session_id": session["session_id"], "timestamp": timestamp,
        "major": session["learner_profile"]["major_id"], "level": result.get("level"),
        "score": result.get("score"), "max_score": result.get("max_score"),
        "correct_count": sum(1 for item in detail if item.get("correct")),
        "question_count": len(detail),
    })
    profile["pretest_attempts"] = profile["pretest_attempts"][-100:]
    for item in detail:
        node_id = str(item.get("node_id") or "unknown")
        node = profile["knowledge_nodes"].setdefault(node_id, {
            "node_id": node_id, "right": 0, "wrong": 0, "last_seen_at": timestamp,
        })
        node["right" if item.get("correct") else "wrong"] += 1
        node["last_seen_at"] = timestamp
        question_id = str(item.get("question_id") or "")
        if not question_id:
            continue
        if item.get("correct"):
            profile["wrong_questions"].pop(question_id, None)
        else:
            previous = profile["wrong_questions"].get(question_id, {})
            profile["wrong_questions"][question_id] = {
                "question_id": question_id, "node_id": node_id,
                "stem": item.get("stem"), "level": result.get("level"),
                "times": int(previous.get("times", 0)) + 1,
                "last_wrong_at": timestamp,
            }
    _save_profile(profile)


def _archive_score(session: dict[str, Any], result: dict[str, Any]) -> None:
    profile = _load_profile(session.get("learner_id"))
    profile["case_attempts"].append({
        "session_id": session["session_id"], "case_id": session.get("case_id"),
        "timestamp": now_iso(), "total_score": result.get("total_score"),
        "dimension_scores": {
            key: value.get("percentage") for key, value in result.get("dimension_scores", {}).items()
        },
        "red_lines": result.get("red_lines", []),
    })
    profile["case_attempts"] = profile["case_attempts"][-50:]
    _save_profile(profile)


def _profile_summary(learner_id: str | None) -> dict[str, Any]:
    profile = _load_profile(learner_id)
    nodes = []
    total_right = total_wrong = 0
    for node in profile.get("knowledge_nodes", {}).values():
        right, wrong = int(node.get("right", 0)), int(node.get("wrong", 0))
        total_right += right
        total_wrong += wrong
        attempts = right + wrong
        nodes.append({**node, "accuracy": round(right / attempts * 100, 2) if attempts else None})
    nodes.sort(key=lambda item: (item["accuracy"] if item["accuracy"] is not None else 101, -item["wrong"], item["node_id"]))
    latest_case = profile.get("case_attempts", [])[-1] if profile.get("case_attempts") else {}
    latest_dimensions = latest_case.get("dimension_scores", {})
    radar = {
        "information": latest_dimensions.get("information"),
        "measurement": latest_dimensions.get("measurement"),
        "application": latest_dimensions.get("application"),
        "safety": latest_dimensions.get("safety"),
        "communication": latest_dimensions.get("communication"),
        "knowledge": round(total_right / (total_right + total_wrong) * 100, 2) if total_right + total_wrong else None,
    }
    wrong_questions = sorted(profile.get("wrong_questions", {}).values(), key=lambda item: item["last_wrong_at"], reverse=True)
    return {
        "learner_id": profile["learner_id"], "updated_at": profile["updated_at"],
        "pretest_attempt_count": len(profile.get("pretest_attempts", [])),
        "case_attempt_count": len(profile.get("case_attempts", [])),
        "knowledge_accuracy": radar["knowledge"], "weak_nodes": nodes[:10],
        "wrong_questions": wrong_questions, "review_queue": wrong_questions[:20],
        "six_axis_radar": radar,
    }


def health_check() -> dict[str, Any]:
    """Check whether the bundled Skill data and deterministic tools are available."""
    required = [
        SKILL_ROOT / "SKILL.md",
        RUBRIC_PATH,
        SKILL_ROOT / "references" / "cases" / "cases.json",
        SKILL_ROOT / "references" / "cases" / "multi_disease_cases.json",
        SKILL_ROOT / "references" / "cases" / "professional_cases.json",
        SKILL_ROOT / "references" / "knowledge" / "knowledge_cards.json",
        SKILL_ROOT / "references" / "knowledge" / "multi_disease_cards.json",
        SKILL_ROOT / "references" / "knowledge" / "professional_cards.json",
        SKILL_ROOT / "references" / "knowledge" / "english_cards.json",
        SKILL_ROOT / "references" / "professional_knowledge_map.json",
        SKILL_ROOT / "references" / "quizzes" / "pretest.json",
        SKILL_ROOT / "references" / "quizzes" / "pretest_hard.json",
        SKILL_ROOT / "assets" / "report.html",
    ]
    missing = [str(path) for path in required if not path.is_file()]
    cases = [case for case in get_training_case().get("cases", []) if _active_case(case)] + _expanded_cases()
    return {
        "status": "ok" if not missing else "error",
        "missing": missing,
        "majors": list_majors(),
        "case_count": len(cases),
        "disease_count": len({case["disease_id"] for case in cases}),
        "diseases": sorted({case["disease_label"] for case in cases}),
        "case_topic_count": len({case["disease_id"] for case in cases}),
        "knowledge_card_count": sum(
            len(read_json(path).get("cards", []))
            for path in sorted((SKILL_ROOT / "references" / "knowledge").glob("*_cards.json"))
        ),
        "rubric_version": read_json(RUBRIC_PATH)["rubric_version"],
        "experience_library": experience.status(),
        "session_store": str(_store().root),
    }


SAFETY_NOTICE = "所有病例均为合成案例，不构成医疗建议；请勿输入真实健康信息。"
RETIRED_DISEASES = {"hypertension", "type_2_diabetes", "type2_diabetes", "diabetes"}
CASE_CONTEXTS = ["门诊初次接触", "社区连续随访", "出院前联合指导", "夜间值班交接"]
CASE_TOPICS = {
    "clinical_medicine": ("CLX", ["急性腹痛", "呼吸困难", "发热待查", "急性头痛", "胸部不适", "过敏反应", "消化道出血风险", "急性意识改变"]),
    "medical_technology": ("MTX", ["标本质量管理", "危急值管理", "影像检查安全", "辐射防护", "输血相容性", "微生物报告", "心电检查质量", "超声检查准备"]),
    "nursing": ("NUX", ["跌倒预防", "压力性损伤预防", "静脉治疗安全", "用药核对", "术后观察", "导管护理", "营养支持护理", "出院指导"]),
    "traditional_chinese_medicine": ("TCMX", ["中医四诊", "中药用药安全", "针灸安全", "艾灸安全", "体质辨识", "中医康复", "中药煎服指导", "中西医协同"]),
    "rehabilitation": ("RHX", ["步态训练", "转移训练", "吞咽康复", "心肺康复", "上肢功能训练", "腰痛康复", "平衡训练", "居家康复"]),
    "health_management": ("HMX", ["睡眠健康管理", "体重健康管理", "戒烟管理", "职业健康", "预防接种随访", "肿瘤筛查管理", "慢性呼吸健康管理", "老年综合健康管理"]),
}

EXPANDED_EMOTIONS = {
    "门诊初次接触": ["有些忐忑", "着急", "犹豫", "困惑", "紧张", "担忧", "不安", "急切"],
    "社区连续随访": ["半信半疑", "有点为难", "担心", "疲惫", "谨慎", "犹豫", "挂心", "略显焦虑"],
    "出院前联合指导": ["心里没底", "不太踏实", "顾虑重重", "有些慌乱", "期待又担心", "紧张", "迟疑", "担忧"],
    "夜间值班交接": ["明显焦急", "强作镇定", "害怕", "坐立不安", "急躁", "警惕", "慌张", "十分担心"],
}

EXPANDED_SPEECH_STYLES = [
    "先说最困扰的一件事，追问后再补充时间线",
    "表达简短，确认对方在认真听后才补充细节",
    "叙述有些零散，需要用具体问题帮助梳理",
    "会反复确认风险，但不主动给出完整信息",
    "先讲现实顾虑，再逐步说明相关表现",
    "对专业术语敏感，需要通俗解释后继续交流",
    "担心被责备，得到接纳后才说明执行困难",
    "急于要结论，需要被引导回事实与变化",
]


def _expanded_persona(major: str, topic: str, setting: str, topic_index: int) -> dict[str, str]:
    """为批量扩展病例生成与主题、场景一致的确定性人设和专属首句。"""
    emotion = EXPANDED_EMOTIONS[setting][topic_index % len(EXPANDED_EMOTIONS[setting])]
    style = EXPANDED_SPEECH_STYLES[(topic_index + CASE_CONTEXTS.index(setting)) % len(EXPANDED_SPEECH_STYLES)]
    if setting == "门诊初次接触":
        concern = f"担心{topic}没有被问清楚，回去后仍不知道该观察什么"
        opening = f"（{emotion}）我这次主要是因为{topic}来咨询，最近的情况让我有点拿不准，想请您先听我说说。"
    elif setting == "社区连续随访":
        concern = f"担心{topic}最近的变化被当成小问题，错过应有的复评"
        opening = f"（{emotion}）上次谈到{topic}后我一直在留意，最近又有些变化，不知道这次随访该从哪里说起。"
    elif setting == "出院前联合指导":
        concern = f"担心回家后不会观察{topic}相关变化，出现异常也不知道联系谁"
        opening = f"（{emotion}）快出院了，可{topic}回家后怎么观察、什么情况要及时处理，我心里还没有底。"
    else:
        concern = f"担心{topic}在夜里继续变化，却因为怕麻烦别人而耽误处理"
        opening = f"（{emotion}）这么晚来麻烦您，是因为{topic}这会儿和之前不太一样，我怕拖到明天不合适。"
    return {
        "personality": f"关注{topic}，{style}",
        "concern": concern,
        "speech_style": style,
        "initial_emotion": emotion,
        "opening_line": opening,
        "persona_scope": f"{major}:{topic}:{setting}",
    }


def _active_case(case: dict[str, Any]) -> bool:
    return str(case.get("disease_id") or "").lower() not in RETIRED_DISEASES


def _question_exam_point(question: dict[str, Any]) -> str:
    row, _ = objectives.lookup(question)
    return row['exam_point'] if row else '本题具体考点资源暂不可用，请复习原题或请教师核对'


def _case_learning_objectives(session: dict, case_id: str) -> tuple[list, str]:
    if session.get('pretest_open') or session.get('learner_profile', {}).get('major_id') != 'clinical_medicine':
        return [], 'not_applicable'
    result, status = [], 'ready'
    for question in (session.get('pretest_result') or {}).get('detail', []):
        if question.get('correct') is not False:
            continue
        row, row_status = objectives.lookup(question)
        if row_status != 'ready':
            status = row_status
        if row and case_id in row['case_ids']:
            result.append(objectives.public_objective(row))
    return result, status


def _objective_review(session: dict, exam_reasoning: dict | None = None) -> list:
    # Called only after a real scoring result exists. No automatic correctness judgement.
    rows, _ = _case_learning_objectives(session, session.get('case_id', ''))
    submitted = exam_reasoning if isinstance(exam_reasoning, dict) else {}
    review = []
    for row in rows:
        question = next(q for q in session['pretest_result']['detail'] if q.get('question_id') == row['question_id'])
        resource, _ = objectives.lookup(question)
        text = submitted.get(row['question_id'], '')
        text = text[:6000].strip() if isinstance(text, str) else ''
        review.append({**row, 'response': text, 'response_status': 'submitted' if text else 'unanswered',
            'grading_status': '未自动判定，待教师复核；不计入原评分',
            'question_reference': question.get('explanation'),
            'review_note': resource.get('review_note', ''),
            'self_check': '逐项核对任务是否有证据、未知信息和适用边界；本例未提供的数值或检查应记为缺失，不补造事实。'})
    return review


def _public_case_view(case: dict[str, Any], major: str | None = None) -> dict[str, Any]:
    """Return only the student-visible case view.

    私有字段（隐藏信息、释放条件、人设、必踩点、边界行为等）一律剥离。
    同时把 task / professional_focus 这类"该问什么、该识别什么、该协商什么"
    的行为答案清单替换为只含训练主题的中性描述，避免在交互开始前就把标准
    询问思路泄露给学生。评分要点由学生在对话中自行展现，再被评分器捕捉。
    """
    public = deepcopy(case)
    # variant_of 只表示该训练变式源自哪个合成病例，不含患者隐私或答案，
    # 应保留给学生端展示重练关系；真正的隐藏字段仍必须全部剥离。
    for key in ("hidden_info", "release_conditions", "boundary_behaviors", "persona",
                "must_cover", "initial_state"):
        public.pop(key, None)

    topic = case.get("disease_label") or case.get("title") or case.get("case_id") or "本主题"
    setting = (case.get("public_profile") or {}).get("setting") or "临床情境"
    public["task"] = f"围绕「{topic}」完成一次{setting}的合成岗位训练。需要采集哪些信息、识别哪些风险、如何沟通与收口，由你自主判断。"
    major_labels = {
        "clinical_medicine": "临床医学", "medical_technology": "医学技术", "nursing": "护理学",
        "traditional_chinese_medicine": "中医学", "rehabilitation": "康复治疗",
        "health_management": "健康服务与管理", "other": "通用",
    }
    focus = case.get("professional_focus")
    if isinstance(focus, dict):
        public["professional_focus"] = {
            key: f"围绕「{topic}」的{major_labels.get(key, key)}岗位实践" for key in focus
        }
    else:
        public["professional_focus"] = f"围绕「{topic}」的本专业岗位实践"
    return public


def _expanded_cases() -> list[dict[str, Any]]:
    cases: list[dict[str, Any]] = []
    for major, (prefix, topics) in CASE_TOPICS.items():
        serial = 0
        for topic_index, topic in enumerate(topics):
            for setting in CASE_CONTEXTS:
                serial += 1
                cid = f"{prefix}{serial:03d}"
                cases.append({
                    "case_id": cid, "disease_id": f"{prefix.lower()}_{topic_index + 1}", "disease_label": topic,
                    "title": f"{topic}的结构化沟通与风险识别（{setting}）", "variant_of": None,
                    "recommended": True, "recommended_majors": [major],
                    "professional_focus": f"围绕{topic}完成信息采集、风险识别、理解确认与安全转介",
                    "public_profile": {"name": f"合成训练对象{cid}", "age": 25 + serial % 56, "setting": setting, "notice": "全部资料均为合成"},
                    "clinical_data": [{"item": "当前诉求", "value": topic, "note": "须先澄清事实"}, {"item": "已知情况", "value": setting, "note": "仍有关键风险信息未获得"}],
                    "task": f"围绕{topic}核实变化与危险信号，说明证据限制，确认理解并协商安全下一步。",
                    "persona": _expanded_persona(major, topic, setting, topic_index),
                    "hidden_info": [{"id": "H1", "value": f"近期与{topic}相关的表现明显变化", "sensitivity": "synthetic"}, {"id": "H2", "value": "出现需要及时升级处理的警示表现", "sensitivity": "synthetic"}],
                    "release_conditions": {"H1": ["ask_recent_change_and_context"], "H2": ["ask_warning_signs_and_safety_risk"]},
                    "initial_state": {"revealed_info": [], "emotion": "担心", "concern_acknowledged": False},
                    "must_cover": ["INQ-01", "EMPATHY-01", "CHECK-01", "ACTION-01"], "knowledge_refs": [],
                    "review_status": "课程团队维护", "boundary_behaviors": ["diagnose_real_person", "recommend_specific_drug_or_dose", "delay_referral"],
                })
    return cases


def _expanded_case(case_id: str) -> dict[str, Any] | None:
    return next((case for case in _expanded_cases() if case["case_id"] == case_id), None)


def _clinical_question_case_catalog() -> dict[str, dict[str, Any]]:
    return _build_question_case_catalog(objectives.signature())


@lru_cache(maxsize=2)
def _build_question_case_catalog(resource_signature) -> dict[str, dict[str, Any]]:
    """Build three separately selectable case-training records from every active clinical question."""
    catalog: dict[str, dict[str, Any]] = {}
    subject_names = {
        "internal_medicine": "内科学", "surgery": "外科学", "physiology": "生理学",
        "biochemistry": "生物化学", "pathology": "病理学", "medical_humanities": "医学综合",
        "english": "医学英语", "unknown": "临床综合",
    }
    for level in list_levels("clinical_medicine"):
        for question in build_paper("clinical_medicine", level, sample=False):
            question_id = question["question_id"]
            node = str(question.get("node_id") or "")
            subject = question.get("subject") or next((key for key in subject_names if key in node.lower()), "unknown")
            label = subject_names.get(subject, subject)
            basic_science = subject in {"physiology", "biochemistry", "pathology"}
            english = level == "english" or subject == "english"
            variants = [
                ("综合病例推理", [
                    "归纳病例的核心问题，并把题干证据分成支持线索、反对线索和未知信息。",
                    "写出从证据到判断的完整推理链，指出最关键的一步。",
                    "列出最可能改变判断的补充信息，并限定当前材料能支持的结论范围。",
                ]),
                (("机制鉴别与反证" if basic_science else "鉴别诊断与反证"), [
                    "提出至少两个可竞争的解释或机制，暂不引用题库标准答案。",
                    "分别说明各解释需要哪些证据，再用病例材料逐项比较。",
                    "指出最容易误判的推理环节，并说明现有材料能否排除它。",
                ]),
                (("术语辨析与规范表述" if english else "机制链与边界检验" if basic_science else "病情演变与再评估"), [
                    "将题干信息整理为准确的问题表征，并标记仍未提供的关键资料。",
                    "说明一个关键条件改变时，哪些推理环节需要重新评估。",
                    "给出有依据的条件性结论和适用边界；不得外推题干未提供的处置细节。",
                ]),
            ]
            for index, (label_variant, stages) in enumerate(variants, 1):
                case_id = f"CMQ-{question_id}-{index:02d}"
                catalog[case_id] = {
                    "case_id": case_id,
                    "case_kind": "question_derived",
                    "disease_id": f"question_{question_id}",
                    "disease_label": label,
                    "title": f"{question_id} · 原题推理练习{index}：{label_variant}",
                    "case_type": "原题推理练习（非独立病例）",
                    "recommended": True,
                    "recommended_majors": ["clinical_medicine"],
                    "professional_focus": f"基于{label}题库情境开展证据整合与临床推理",
                    "source_question_id": question_id,
                    "source_question_level": level,
                    "source_question_ref": question.get("explanation_ref"),
                    "exam_point": _question_exam_point(question),
                    "public_profile": {"name": f"原题推理练习{case_id}", "setting": "临床推理教学", "notice": "直接使用原题材料的推理练习，并非新增独立病例"},
                    "clinical_data": [{"item": "病例材料", "value": question.get("stem", ""), "note": "直接取自对应题库情境；未增补患者生命体征、病史或检查数据"}],
                    "training_stages": ([objectives.lookup(question)[0]['training_task']] + stages[1:]) if objectives.lookup(question)[0] else stages,
                    "task": f"完成{label_variant}，逐步说明证据、推理和适用边界。",
                    "knowledge_refs": [question["explanation_ref"]] if question.get("explanation_ref") else [],
                    "variant_of": None,
                    "review_status": "题库衍生教学病例，待临床教师审核；非独立审定患者病例",
                }
    return catalog


def _clinical_question_case(case_id: str) -> dict[str, Any] | None:
    return _clinical_question_case_catalog().get(case_id)


def _case_for_session(session: dict[str, Any], directory: Path) -> dict[str, Any]:
    """Resolve bundled, expanded, or session-local variant case data."""
    variant_path = directory / "case_variant.json"
    if variant_path.is_file():
        variant = read_json(variant_path)
        if variant.get("case_id") == session.get("case_id"):
            return variant
    generated = _expanded_case(session.get("case_id", ""))
    if generated:
        return generated
    question_case = _clinical_question_case(session.get("case_id", ""))
    if question_case:
        return question_case
    result = get_training_case(session.get("case_id"), include_private=True)
    if result.get("status") != "ok":
        raise RuntimeErrorWithCode("case_not_found", f"未找到病例：{session.get('case_id')}")
    return result["case"]


def _case_pool(major: str, case_mode: str = "default") -> dict[str, dict[str, Any]]:
    pool: dict[str, dict[str, Any]] = {}
    for case in get_training_case(major=major)["cases"]:
        if case["recommended"] and _active_case(case):
            pool.setdefault(case["case_id"], case)
    for case in _expanded_cases():
        if major in case["recommended_majors"]:
            pool.setdefault(case["case_id"], case)
    if major == "clinical_medicine":
        pool.update(_clinical_question_case_catalog())
    if case_mode == "outpatient_structured":
        if major != "clinical_medicine":
            raise RuntimeErrorWithCode("unsupported_case_mode", "医院门诊结构化训练入口仅支持临床医学专业")
        pool = {case_id: case for case_id, case in pool.items() if case_id in OUTPATIENT_STRUCTURED_IDS}
    return pool


def _recommendations(session: dict, count: int = 4, refresh: bool = False) -> list[dict[str, Any]]:
    """按最近提交错题的关联强度排序；普通随机练习单独标识。"""
    major = session["learner_profile"]["major_id"]
    case_mode = session.get("case_mode", "default")
    pool = _case_pool(major, case_mode)
    if not pool:
        return []
    ids = sorted(pool)
    random_ids = [cid for cid in ids if pool[cid].get("case_kind") != "question_derived"]
    matches, audit, resource_status = _weak_case_analysis(session, pool)
    signature = hashlib.sha256(json.dumps({"algorithm": 2, "matches": matches, "audit": audit,
        "resource_status": resource_status, "pool": ids}, sort_keys=True, ensure_ascii=False).encode()).hexdigest()
    session["recommendation_audit"] = audit
    session["recommendation_resource_status"] = resource_status
    session["recommendation_all_matches"] = matches
    current = [cid for cid in session.get("recommended_ids", []) if cid in pool]
    if current and not refresh and session.get("recommendation_signature") == signature:
        return [pool[cid] for cid in current]
    shown = [cid for cid in session.get("shown_cases", []) if cid in pool]
    unseen = [cid for cid in random_ids if cid not in shown]
    rng = random.Random()
    picks: list[str] = []
    if matches:
        ranked = list(matches)
        rng.shuffle(ranked)
        strength = {"knowledge_ref": 3, "curated_partial": 2, "topic": 1}
        ranked.sort(key=lambda cid: (-int(any(r.get('training_task') for r in matches[cid])), -max(strength[r["kind"]] for r in matches[cid]), -len(matches[cid]), cid in shown))
        picks = ranked[:count]
    priority = [cid for cid in unseen if major == "clinical_medicine" and cid in OUTPATIENT_STRUCTURED_IDS
                and not session.get("pretest_result")]
    if picks:
        remaining = [cid for cid in unseen if cid not in matches]
        rng.shuffle(remaining)
        picks.extend(remaining[:max(0, count - len(picks))])
        remaining = [cid for cid in random_ids if cid not in picks and cid not in matches]
        rng.shuffle(remaining)
        picks.extend(remaining[:max(0, count - len(picks))])
    elif priority:
        # 直接训练保留原有完整门诊病例优先；提交错题后不再用它冒充针对性筛选。
        rng.shuffle(priority)
        picks = priority[:count]
        remaining = [cid for cid in unseen if cid not in picks]
        rng.shuffle(remaining)
        picks.extend(remaining[:max(0, count - len(picks))])
    elif len(unseen) >= count:
        picks = rng.sample(unseen, count)
    else:
        picks = list(unseen)
        rest = [cid for cid in random_ids if cid not in picks]
        rng.shuffle(rest)
        picks.extend(rest[: max(0, count - len(picks))])
    if not matches:
        picks = sorted(set(picks), key=lambda cid: (pool[cid]["variant_of"] is not None, cid))
    session["recommended_ids"] = picks
    session["recommendation_signature"] = signature
    session["recommendation_matches"] = {cid: matches[cid] for cid in picks if cid in matches}
    session["shown_cases"] = (shown + picks)[-60:]
    return [pool[cid] for cid in picks]


def _weak_case_matches(session: dict, pool: dict) -> dict:
    return _weak_case_analysis(session, pool)[0]


def _weak_case_analysis(session: dict, pool: dict) -> tuple[dict, list, str]:
    """逐题核对课程关联，不把主题迁移当成考点覆盖；不读取病例隐藏内容。"""
    # 开卷中上一轮成绩不能用于推断本轮答案或推荐。
    if session.get("pretest_open"):
        return {}, [], "awaiting_submission"
    wrong = [row for row in (session.get("pretest_result") or {}).get("detail", []) if row.get("correct") is False]
    if not wrong:
        return {}, [], "ready"
    resource_status = "ready"
    try:
        config = read_json(Path(__file__).with_name("case_recommendation_topics.json"))
        topics = config["topics"]
        links = config.get("question_case_links", [])
        excluded = config.get("exclude_topic_pattern", "(?!)")
        re.compile(excluded)
        for topic in topics:
            re.compile(topic["pattern"])
            if not isinstance(topic["label"], str):
                raise ValueError("invalid topic label")
        for link in links:
            if not all(isinstance(link[key], str) for key in ("question_id", "case_id", "label", "basis", "limitation", "review_status")):
                raise ValueError("invalid question-case link")
    except (OSError, ValueError, KeyError, TypeError, AttributeError, re.error):
        topics, links, excluded = [], [], "(?!)"
        resource_status = "unavailable"
    case_refs = {}
    for file in (SKILL_ROOT / "references" / "cases").glob("*.json"):
        try:
            for case in read_json(file).get("cases", []):
                case_refs[case["case_id"]] = set(case.get("knowledge_refs") or [])
        except (OSError, ValueError, KeyError, TypeError):
            resource_status = "partial"
    matches = {}
    for cid, case in pool.items():
        if case.get("case_kind") == "question_derived":
            continue
        public_topic = str(case.get("disease_label") or "") + " " + str(case.get("title") or "")
        reasons = []
        for row in wrong:
            link = next((link for link in links if link["question_id"] == row.get("question_id") and link["case_id"] == cid), None)
            if link:
                reasons.append({"question_id": row.get("question_id"), "node_id": row.get("node_id"), "exam_point": _question_exam_point(row), "kind": "curated_partial",
                    "label": link["label"], "limitation": link["limitation"], "basis": link["basis"], "review_status": link["review_status"]})
                continue
            ref = row.get("explanation_ref")
            if ref and ref in case_refs.get(cid, set()):
                reasons.append({"question_id": row.get("question_id"), "node_id": row.get("node_id"), "exam_point": _question_exam_point(row), "kind": "knowledge_ref", "label": "共用知识卡 " + ref,
                    "limitation": "仅说明课程知识卡有关联，不代表病例覆盖整题或已验证掌握。"})
                continue
            stem = str(row.get("stem") or "")
            if re.search(excluded, stem, re.I):
                continue
            for topic in topics:
                if re.search(topic["pattern"], stem, re.I) and re.search(topic["pattern"], public_topic, re.I):
                    reasons.append({"question_id": row.get("question_id"), "node_id": row.get("node_id"), "exam_point": _question_exam_point(row), "kind": "topic", "label": topic["label"] + "主题迁移练习",
                        "limitation": "仅按题干与病例公开主题关联；具体考点仍需复习原题解析，不据此判断临床适用性。"})
                    break
        if reasons:
            matches[cid] = reasons
    for cid, reasons in matches.items():
        for reason in reasons:
            question = next(row for row in wrong if row.get('question_id') == reason['question_id'])
            objective, objective_status = objectives.lookup(question)
            reason['objective_status'] = objective_status
            if objective and cid in objective['case_ids']:
                reason['training_task'] = objective['training_task']
                reason['objective_review_status'] = objective['review_status']
    audit = []
    for row in wrong:
        candidates = [{"case_id": cid, **reason} for cid, reasons in matches.items() for reason in reasons if reason["question_id"] == row.get("question_id")]
        audit.append({"question_id": row.get("question_id"), "stem": row.get("stem", ""), "node_id": row.get("node_id"), "exam_point": _question_exam_point(row),
            "status": "related" if candidates else "unmatched", "candidates": candidates,
            "note": "以下为关联候选及局限，不等同于考点覆盖。" if candidates else "现有病例库未找到有依据的训练关联；请先复习本题解析或请教师补充对应病例。"})
    return matches, audit, resource_status


def _session_payload(session: dict, refresh: bool = False) -> dict[str, Any]:
    major = session["learner_profile"]["major_id"]
    # 推荐病例同样只暴露公开视图，避免把隐藏信息、释放条件、人设、必踩点
    # 及"该问什么"的行为答案清单随推荐列表泄露给学生端。
    selected = _recommendations(session, refresh=refresh)
    matches = session.get("recommendation_matches") or {}
    recommendations = [_public_case_view(case, major) | {"recommendation_reasons": matches.get(case["case_id"], [])} for case in selected]
    all_matches = session.get("recommendation_all_matches") or {}
    question_catalog = _clinical_question_case_catalog() if major == "clinical_medicine" else {}
    audit = deepcopy(session.get("recommendation_audit") or [])
    for row in audit:
        qid = row.get("question_id")
        row["question_cases"] = [
            {key: question_catalog[f"CMQ-{qid}-{index:02d}"][key] for key in (
                "case_id", "title", "source_question_id", "source_question_level",
                "training_stages", "review_status", "exam_point",
            )}
            for index in (1, 2, 3) if f"CMQ-{qid}-{index:02d}" in question_catalog
        ]
    session["recommendation_audit"] = audit
    pool = _case_pool(major, session.get("case_mode", "default"))
    related_cases = [_public_case_view(pool[cid], major) | {"recommendation_reasons": reasons}
        for cid, reasons in sorted(all_matches.items(), key=lambda item: (
            -int(any(r.get('training_task') for r in item[1])), -max({"knowledge_ref": 3, "curated_partial": 2, "topic": 1}[r["kind"]] for r in item[1]), -len(item[1]), item[0]))]
    map_path = SKILL_ROOT / "references" / "professional_knowledge_map.json"
    profile = next(
        (item for item in read_json(map_path)["majors"] if item["major_id"] == major),
        None,
    )
    mode = session["training_mode"]
    case_pool = _case_pool(major, session.get("case_mode", "default"))
    total = len(case_pool)
    question_case_count = sum(case.get("case_kind") == "question_derived" for case in case_pool.values())
    standard_case_count = total - question_case_count
    note = ""
    if session.get("pretest_open"):
        note = "本次自测尚未提交，当前仅提供随机练习；提交后再核对错题关联。"
    elif all_matches:
        note = "已按最近一次提交的错题筛选关联候选；每题可查看关联依据和局限。普通随机练习另列，不计入错题关联。"
    elif session.get("pretest_result"):
        note = "本次错题暂无对应病例关联。随机练习仅供自选，不作为错题训练。" if session.get("recommendation_audit") else "本次自测全部答对，可自选随机病例练习。"
    elif recommendations and total > len(recommendations):
        note = (f"资源包括 {standard_case_count} 个常规病例和 {question_case_count} 个原题推理练习；"
                f"原题练习不计为新增独立病例。本次从常规病例中随机抽了 {len(recommendations)} 个。")
    return {
        "status": "ok",
        "session": session,
        "recommended_cases": recommendations,
        "related_cases": related_cases,
        "random_cases": [case for case in recommendations if not case["recommendation_reasons"]],
        "recommendation_audit": audit,
        "recommendation_resource_status": session.get("recommendation_resource_status", "ready"),
        "recommendation_note": note,
        "case_pool_size": total,
        "standard_case_pool_size": standard_case_count,
        "question_case_pool_size": question_case_count,
        "professional_profile": profile,
        "learning_archive": _profile_summary(session.get("learner_id")),
        "next_action": "请学生从推荐病例中选择一个" if mode == "quick" else "调用 zhihu_get_pretest 开始完整训练",
        "safety_notice": SAFETY_NOTICE,
    }


def _major_question(startup: dict, ack: str) -> dict[str, Any]:
    return {
        "status": "ok",
        "ack": ack,
        "awaiting_major": True,
        "major_question": startup["major_prompt"],
        "major_options": startup["major_options"],
        "next_action": "把 ack、major_question、major_options 原样发给学生；学生回答专业后调用 zhihu_start_session(major=..., session_id=...)，不要重复开场。",
    }


def begin_training(trigger: str, session_id: str | None = None, learner_id: str | None = None) -> dict[str, Any]:
    """识别学生的启动口令，开一个尚未定专业的训练会话，并返回开场回执与专业问句。

    未命中口令时不建会话，只返回可选口令，由 Skill 提示学生重新发一次。
    """
    startup = load_startup()
    store = _store()
    if session_id:
        session, directory = store.load(session_id)
        if learner_id:
            session["learner_id"] = _normalize_learner_id(learner_id)
            store.save(session, directory)
        if not session.get("awaiting_major"):
            payload = _session_payload(session)
            payload["ack"] = startup["ack_template"].format(trigger=trigger or startup["default_trigger"], session_id=session_id)
            return payload
        ack = startup["ack_template"].format(trigger=trigger or startup["default_trigger"], session_id=session_id)
        return _major_question(startup, ack)

    matched = match_start_trigger(trigger)
    if not matched:
        return {
            "status": "unmatched",
            "accepted_triggers": startup["trigger_words"],
            "next_action": f"告诉学生要先发启动口令，例如「{startup['default_trigger']}」；口令不对不建会话、不讲流程。",
        }
    major = detect_major_in_text(trigger)
    session, _directory = store.create(major if major else None, "quick")
    session["learner_id"] = _normalize_learner_id(learner_id)
    store.save(session, _directory)
    ack = startup["ack_template"].format(trigger=matched, session_id=session["session_id"])
    if session.get("awaiting_major"):
        result = _major_question(startup, ack)
        result["session_id"] = session["session_id"]
        result["session"] = session
        return result
    payload = _session_payload(session)
    payload["ack"] = ack
    payload["session_id"] = session["session_id"]
    return payload


def start_session(major: str = "other", mode: str = "quick", session_id: str | None = None, new_batch: bool = False, learner_id: str | None = None, case_mode: str = "default", source_session_id: str | None = None) -> dict[str, Any]:
    """Create a session with a chosen major, or set the major of a session opened by the start trigger.

    `new_batch=true` 用同一个会话重新随机抽 4 个病例（学生说「换一批」时调用）。
    """
    store = _store()
    if case_mode not in {"default", "outpatient_structured"}:
        raise RuntimeErrorWithCode("unsupported_case_mode", "case_mode 仅支持 default 或 outpatient_structured")
    if session_id:
        session, directory = store.load(session_id)
        if session.get("awaiting_major"):
            assign_major(session, major)
        if learner_id:
            session["learner_id"] = _normalize_learner_id(learner_id)
        else:
            session.setdefault("learner_id", DEFAULT_LEARNER_ID)
        session["case_mode"] = case_mode
        if mode in {"quick", "complete"}:
            session["training_mode"] = mode
            if session.get("stage") == "idle" and mode == "quick":
                session["stage"] = "case_read"
        store.save(session, directory)
        payload = _session_payload(session, refresh=bool(new_batch))
        store.save(session, directory)
        payload["session_id"] = session["session_id"]
        return payload
    source = None
    if source_session_id:
        source, _ = store.load(source_session_id)
        if source["learner_profile"]["major_id"] != major:
            raise RuntimeErrorWithCode("major_mismatch", "只能沿用同一专业的已提交自测结果")
        if source.get("pretest_open"):
            source = None  # 未提交的新试卷不能沿用旧成绩
    session, directory = store.create(major, mode)
    session["learner_id"] = _normalize_learner_id(learner_id)
    session["case_mode"] = case_mode
    if source and source.get("pretest_result"):
        session["pretest_result"] = source["pretest_result"]
        session["weak_nodes"] = source.get("weak_nodes", [])
    payload = _session_payload(session)
    store.save(session, directory)
    payload["session_id"] = session["session_id"]
    return payload


def get_session_status(session_id: str) -> dict[str, Any]:
    """Resume a session by reading its real persisted stage and artifacts."""
    session, directory = _store().load(session_id)
    return {
        "status": "ok",
        "session": session,
        "dialogue_turns": len(read_dialogue(directory)),
        "artifacts": sorted(path.name for path in directory.iterdir() if path.is_file()),
        "learning_archive": _profile_summary(session.get("learner_id")),
    }


def get_pretest(session_id: str, level: str = "basic", question_count: int = 5) -> dict[str, Any]:
    """Return 5 or 20 questions, limited by the active pool, without answer hints.

    Re-callable at any training stage so learners can retake or switch difficulty
    instead of being locked into a single one-off quiz.
    """
    store = _store()
    if type(question_count) is not int or question_count not in {5, 20}:
        raise RuntimeErrorWithCode("invalid_question_count", "题量仅支持 5 或 20")
    session, directory = store.load(session_id)
    if session["stage"] == "ended":
        raise RuntimeErrorWithCode("wrong_stage", "该会话已结束，请新开一个会话再自测")
    major = session["learner_profile"]["major_id"]
    levels = list_levels(major)
    raw_level = str(level or "basic").strip().lower()
    difficulty_aliases = {
        "basic": "basic", "easy": "basic", "foundation": "basic",
        "基础": "basic", "简单": "basic", "换简单一点": "basic",
        "intermediate": "intermediate", "medium": "intermediate", "normal": "intermediate",
        "提高": "intermediate", "中等": "intermediate", "进阶": "intermediate",
        "advanced": "advanced", "hard": "advanced", "difficult": "advanced",
        "困难": "advanced", "高难度": "advanced", "专业课": "advanced",
        "expert": "expert", "very hard": "expert", "extreme": "expert",
        "专家": "expert", "专家级": "expert", "特别难": "expert", "最难": "expert",
        "english": "english", "英文": "english", "医学英语": "english",
    }
    if raw_level in {"太简单了", "太简单", "换难一点", "再难一点", "继续加难"}:
        current = session.get("pretest_level") or levels[0]
        current_index = levels.index(current) if current in levels else 0
        requested = levels[min(current_index + 1, len(levels) - 1)]
    else:
        requested = difficulty_aliases.get(raw_level, raw_level)
    if requested not in levels:
        requested = levels[0] if levels else "basic"
    retake = int(session.get("pretest_round", 0)) > 0
    if session["stage"] == "idle":
        set_stage(session, "pretest")
    reuse_attempt = bool(
        session.get("pretest_open")
        and session.get("pretest_level") == requested
        and session.get("pretest_question_count", 5) == question_count
        and session.get("pretest_attempt_id")
        and session.get("pretest_option_maps")
        and session.get("pretest_question_ids")
    )
    session["pretest_level"] = requested
    session["pretest_question_count"] = question_count
    session["pretest_open"] = True
    if not reuse_attempt:
        session["pretest_round"] = int(session.get("pretest_round", 0)) + 1
        session["pretest_attempt_id"] = os.urandom(12).hex()

    if reuse_attempt:
        raw_questions = build_paper(major, requested, question_ids=session["pretest_question_ids"])
        option_maps = session["pretest_option_maps"]
    else:
        raw_questions = build_paper(major, requested, paper_size=question_count)
        option_maps = {}
        for question in raw_questions:
            stable_ids = list(question["options"])
            rng = random.Random(f"{session['pretest_attempt_id']}:{question['question_id']}")
            rng.shuffle(stable_ids)
            display_letters = list("ABCDE")[:len(stable_ids)]
            option_maps[question["question_id"]] = dict(zip(display_letters, stable_ids))
        session["pretest_option_maps"] = option_maps

    def public_question(question: dict[str, Any], number: int) -> dict[str, Any]:
        display_to_stable = option_maps[question["question_id"]]
        display_options = {letter: question["options"][stable] for letter, stable in display_to_stable.items()}
        options_text = "\n".join(f"{key}. {value}" for key, value in display_options.items())
        result = {
            key: question[key] for key in ("question_id", "node_id", "type", "stem")
        } | {
            "difficulty": requested,
            "options": display_options,
            "display_text": f"第 {number} 题\n{question['stem']}\n{options_text}",
        }
        if question.get("subquestions"):
            result["subquestions"] = [
                {key: sub[key] for key in ("number", "question_id", "stem", "options")}
                for sub in question["subquestions"]
            ]
            result["render_validation"] = {
                "subquestion_count": len(question["subquestions"]),
                "each_subquestion_has_options": True,
                "outer_option_count": len(question["options"]),
            }
        return result

    questions = [public_question(question, number) for number, question in enumerate(raw_questions, 1)]
    # 记录本次抽中的题号，供 submit_pretest 批改时复现同一组题，保证出题与批改一致。
    session["pretest_question_ids"] = [q["question_id"] for q in questions]
    session["pretest_display_options"] = {q["question_id"]: q["options"] for q in questions}
    store.save(session, directory)
    return {
        "status": "ok",
        "session_id": session_id,
        "stage": session["stage"],
        "major": major,
        "level": requested,
        "available_levels": levels,
        "retake": retake,
        "attempt_id": session["pretest_attempt_id"],
        "questions": questions,
        "requested_count": question_count,
        "actual_count": len(questions),
        "quantity_note": (f"本档可用题不足 {question_count} 道，当前展示全部 {len(questions)} 道，不重复补数。" if len(questions) < question_count else ""),
        "render_contract": {
            "source_of_truth": "questions[].display_text",
            "mode": "verbatim",
            "rules": [
                "必须逐字展示每题 display_text",
                "按题目 type 作答：single_choice 单选，multiple_choice 多选；完整展示全部选项，不增、不删、不换序",
                "只展示题干与选项，不得附加任何字母串、编号或提示",
                "严禁任何答案暗示：不得写出任何示例字母序列来演示作答格式，不得加粗、打勾、标色或标注正确项",
                "收尾只允许写一句固定提示：请按题目顺序回覆所选题的字母",
            ],
        },
        "next_action": "逐字展示 questions[].display_text 的题干与全部选项；收尾只写一句「请按题目顺序回覆所选题的字母」，不得给示例字母串或任何答案暗示。批改后先问难度是否合适。",
    }


def _attach_explanations(result: dict[str, Any]) -> None:
    """为每道自测题挂上自包含的讲解包，联查 explanation_ref 指向的知识卡。

    无论对错都生成讲解：correct_answer 指出正确答案，knowledge 提供知识点、
    推理与来源；答错时另用 wrong_reason 说明学生原答案为什么错。讲解内容全部
    来自题库与已审校知识卡，不由模型臆造医学结论。
    """
    for item in result.get("detail", []):
        ref = item.get("explanation_ref")
        knowledge = None
        if ref:
            found = retrieve_knowledge(knowledge_id=ref)
            cards = found.get("knowledge_cards") or []
            if cards:
                card = cards[0]
                knowledge = {
                    "knowledge_id": card.get("knowledge_id"),
                    "title": card.get("title"),
                    "claim": card.get("claim"),
                    "lay_terms": card.get("lay_terms"),
                    "misconceptions": card.get("misconceptions"),
                    "source": card.get("source"),
                    "source_location": card.get("source_location"),
                    "source_url": card.get("source_url"),
                    "secondary_source_url": card.get("secondary_source_url"),
                    "source_note": card.get("source_note"),
                    "version": card.get("version"),
                    "review_status": card.get("review_status"),
                }
        explanation = {
            "stem": item.get("stem"),
            "options": item.get("options"),
            "correct_answer": item.get("correct_answer"),
            "correct_option_text": item.get("correct_option_text"),
            "is_correct": item.get("correct"),
            "knowledge": knowledge,
        }
        if not item.get("correct"):
            submitted = item.get("submitted")
            submitted_text = item.get("submitted_option_text")
            misconceptions = (knowledge or {}).get("misconceptions") or []
            reason_parts = []
            if submitted:
                reason_parts.append(f"你选择了 {submitted}" + (f"（{submitted_text}）" if submitted_text else "") + "，")
            else:
                reason_parts.append("本题未作答，")
            reason_parts.append(f"正确答案是 {item.get('correct_answer')}。")
            if submitted_text:
                reason_parts.append("该选项不符合本题的专业要求。")
            if misconceptions:
                reason_parts.append("常见误区包括：" + "；".join(str(m) for m in misconceptions) + "。")
            explanation["wrong_reason"] = "".join(reason_parts)
        item["explanation"] = explanation


def submit_pretest(session_id: str, answers: dict[str, str]) -> dict[str, Any]:
    """Deterministically grade the pretest and persist weak knowledge nodes."""
    store = _store()
    session, directory = store.load(session_id)
    if session["stage"] != "pretest" and not session.get("pretest_open"):
        raise RuntimeErrorWithCode("wrong_stage", "请先取一卷自测题再提交")
    level = session.get("pretest_level") or "basic"
    question_ids = session.get("pretest_question_ids")
    option_maps = session.get("pretest_option_maps") or {}
    mapped_answers = {}
    for qid, displayed in (answers or {}).items():
        display_to_stable = option_maps.get(qid, {})
        selected = "".join(sorted(set(str(displayed or "").strip().upper())))
        mapped_answers[qid] = "".join(sorted(display_to_stable.get(letter, "") for letter in selected))
    result = check_pretest({"answers": mapped_answers}, major=session["learner_profile"]["major_id"], level=level, question_ids=question_ids)
    display_options = session.get("pretest_display_options") or {}
    for item in result.get("detail", []):
        qid = item["question_id"]
        display_to_stable = option_maps.get(qid, {})
        stable_to_display = {stable: display for display, stable in display_to_stable.items()}
        correct_stable = str(item.get("correct_answer") or "")
        correct_display = "".join(sorted(stable_to_display.get(letter, "") for letter in correct_stable))
        submitted_display = "".join(sorted(set(str((answers or {}).get(qid, "")).strip().upper())))
        item["stable_correct_option_ids"] = list(correct_stable)
        item["correct_answer"] = correct_display
        item["submitted"] = submitted_display or None
        item["options"] = display_options.get(qid, {})
        item["correct_option_text"] = "；".join(item["options"].get(letter, "") for letter in correct_display)
        item["submitted_option_text"] = "；".join(item["options"].get(letter, "") for letter in submitted_display) if submitted_display else None
    _attach_explanations(result)
    session["pretest_result"] = result
    session["weak_nodes"] = result["weak_nodes"]
    session.pop("recommended_ids", None)
    session.pop("recommendation_matches", None)
    session["pretest_open"] = False
    _archive_pretest(session, result)
    if session["stage"] == "pretest":
        set_stage(session, "explain" if result["weak_nodes"] else "case_read")
    store.save(session, directory)
    return {
        "status": "ok",
        "session_id": session_id,
        "stage": session["stage"],
        "pretest_result": result,
        "next_action": (
            "逐题讲解每一道题（无论对错都必须讲）：用每题 explanation 里的 correct_answer 指出正确答案，"
            "结合 stem/options 解释对应知识点、推理过程或计算步骤，紧扣本题；回答错误的题还要用 "
            "explanation.wrong_reason 简要说明学生原答案错在哪。不得只说“回答正确/错误”或省略讲解。"
            "讲完后再问「这组题难度怎么样」并按需换档。"
        ),
    }


def get_knowledge(node_id: str | None = None, knowledge_id: str | None = None, major_id: str | None = None, course_id: str | None = None) -> dict[str, Any]:
    """Retrieve versioned knowledge cards by node or card ID; never invent missing content."""
    if not node_id and not knowledge_id and not major_id and not course_id:
        raise ValueError("node_id、knowledge_id、major_id、course_id 至少提供一个")
    return retrieve_knowledge(node_id=node_id, knowledge_id=knowledge_id, major_id=major_id, course_id=course_id)


def list_training_cases(major: str | None = None, disease_id: str | None = None) -> dict[str, Any]:
    """List synthetic cases, optionally ordered by profession and filtered by disease."""
    result = get_training_case(major=major, disease_id=disease_id)
    result["cases"] = [case for case in result.get("cases", []) if _active_case(case)]
    for case in _expanded_cases():
        if disease_id and case["disease_id"] != disease_id:
            continue
        if major and major != "other" and major not in case["recommended_majors"]:
            continue
        # 列表仅暴露挑选病例所需元信息；professional_focus 走公开净化，
        # 避免把"该做什么"的行为答案清单随列表带出。
        view = _public_case_view(case, major)
        result["cases"].append({key: view[key] for key in ("case_id", "title", "disease_id", "disease_label", "recommended_majors", "professional_focus") if key in view} | {"variant_of": case.get("variant_of"), "recommended": bool(major and major in case["recommended_majors"])})
    for case in _clinical_question_case_catalog().values():
        if disease_id and case["disease_id"] != disease_id:
            continue
        if major and major != "other" and major not in case["recommended_majors"]:
            continue
        result["cases"].append({key: case[key] for key in (
            "case_id", "title", "disease_id", "disease_label", "recommended_majors",
            "professional_focus", "case_type", "source_question_id", "source_question_level",
            "review_status",
        )} | {"variant_of": None, "recommended": bool(major and major in case["recommended_majors"])})
    return result


def select_training_case(session_id: str, case_id: str) -> dict[str, Any]:
    """Select a case and return only student-visible public case data."""
    store = _store()
    session, directory = store.load(session_id)
    if session["stage"] not in {"idle", "pretest", "explain", "case_read", "retrain"}:
        raise RuntimeErrorWithCode("wrong_stage", "当前阶段不能选择病例")
    generated = _expanded_case(case_id) or _clinical_question_case(case_id)
    result = {"status": "ok", "case": generated} if generated else get_training_case(case_id, include_private=False)
    if result.get("status") != "ok":
        raise RuntimeErrorWithCode("case_not_found", f"未找到病例：{case_id}")
    if not _active_case(result["case"]):
        raise RuntimeErrorWithCode("case_retired", f"病例已退役：{case_id}")
    session["case_id"] = case_id
    session["revealed_info"] = []
    session["resident_state"] = {}
    if session.get("pretest_open"):
        session["pretest_result"] = None
        session["weak_nodes"] = []
        session.pop("recommended_ids", None)
        session.pop("recommendation_matches", None)
    session["pretest_open"] = False
    set_stage(session, "case_read", force=session["stage"] in {"idle", "pretest", "case_read"})
    store.save(session, directory)
    public_case = _public_case_view(result["case"], session["learner_profile"].get("major_id"))
    learning_objectives, objective_status = _case_learning_objectives(session, case_id)
    public_case['learning_objectives'] = learning_objectives
    public_case['objective_resource_status'] = objective_status
    return {"status": "ok", "session_id": session_id, "stage": "case_read", "public_case": public_case}


def get_sp_state(session_id: str) -> dict[str, Any]:
    """Return internal SP persona and release conditions. Never display this tool result to the learner."""
    session, directory = _store().load(session_id)
    if not session.get("case_id"):
        raise RuntimeErrorWithCode("case_not_selected", "尚未选择病例")
    case = _case_for_session(session, directory)
    return {
        "status": "ok", "internal_only": True, "case": case,
        "learning_objectives": _case_learning_objectives(session, session['case_id'])[0],
        "dialogue_director": _dialogue_director(session, directory, case),
        "simulation_contract": {
            "mode": "synthetic_role_simulation",
            "learner_role": session.get("learner_role"),
            "learner_role_label": session.get("learner_role_label"),
            "role_permissions": session.get("role_permissions", []),
            "assistant_role": "virtual_patient_sp_only",
            "rules": [
                "只以患者或居民第一人称回应",
                "不得把用户称为学生，不得教学、评分或提示答案",
                "专项任务是学生的练习目标，不是患者事实；不得根据任务补造病史、检查或透露未释放信息",
                "不得因岗位权限内的采血、血清处理、检查计划或鉴别诊断触发真实医疗分流",
                "不得主动要求虚拟医生联系值班医生；只有病例明确需要团队升级时才表现患者反应",
                "允许专业术语；患者听不懂时以患者身份追问含义",
            ],
        },
    }


def _dialogue_director(session: dict[str, Any], directory: Path, case: dict[str, Any] | None = None) -> dict[str, Any]:
    """Return the deterministic SP pacing and completion gate."""
    case = case or _case_for_session(session, directory)
    required = list(dict.fromkeys(case.get("must_cover", [])))
    covered = list(dict.fromkeys(session.get("dialogue_covered_points", [])))
    pending = [point for point in required if point not in covered]
    learner_turns = sum(1 for row in read_dialogue(directory) if row.get("speaker") == "student")
    judgement_prefixes = ("DIAG", "JUDGE", "ASSESS", "SYN", "TCM", "INTERP")
    action_prefixes = ("ACTION", "PLAN", "SAFE", "FOLLOW", "ESC")
    has_judgement = bool(session.get("dialogue_has_professional_conclusion")) or any(str(p).startswith(judgement_prefixes) for p in covered)
    has_action = bool(session.get("dialogue_has_action_plan")) or any(str(p).startswith(action_prefixes) for p in covered)
    has_teach_back = bool(session.get("dialogue_has_teach_back"))
    has_safety_closure = bool(session.get("dialogue_has_safety_closure"))
    ready = learner_turns >= 8 and not pending and has_judgement and has_action and has_teach_back and has_safety_closure
    beat_plan = [
        (1, "开场锚定", "只给主诉、诉求和初始情绪"),
        (2, "顾虑试探", "抛出一个现实顾虑，给共情行为窗口"),
        (3, "时间轴", "回答起始、演变、诱因和缓解因素，不主动补齐"),
        (4, "关键细节", "仅按释放条件提供一层隐藏信息"),
        (5, "危险信号", "呈现病例预设警示线索后停顿，等待识别"),
        (6, "测量或质量环节", "按专业提供测量、标本、护理、评定或数据质量窗口"),
        (7, "通俗解释", "以患者身份表示术语没听懂，等待解释"),
        (8, "专业结论", "追问目前的岗位适配判断；医师岗可追问工作/鉴别诊断"),
        (9, "边界与阻力", "提出一个本病例的处置边界或现实执行阻力"),
        (10, "共同计划", "等待具体、岗位合规、可执行的下一步"),
        (11, "回示确认", "表示准备离开，给 teach-back 窗口，不主动复述"),
        (12, "安全收口", "等待复评、危急报告、转介或异常情况处理标准"),
    ]
    beat_index = min(learner_turns + 1, 12)
    beat_no, beat_name, beat_objective = beat_plan[beat_index - 1]
    if ready:
        phase = "closure_ready"
        objective = "以患者身份确认计划；等待使用者发出‘结束对话，进入复盘’"
    elif learner_turns == 0:
        phase = "opening"
        objective = "只给首诉和当下感受，等待使用者建立关系并开始采集"
    elif learner_turns >= 12 and pending:
        phase = "coverage_repair"
        objective = "已进入补点窗口：一轮只为一个未覆盖项创造自然机会，最迟第14轮必须收口"
    elif not has_judgement:
        phase = "information_and_reasoning"
        objective = "按释放条件提供最少信息，等待岗位适配的专业结论"
    elif not has_action:
        phase = "planning"
        objective = "表达一个现实顾虑，等待具体行动方案与理解确认"
    else:
        phase = "coverage_repair"
        objective = "自然回应，不提示答案；为尚未覆盖的病例评分点保留机会"
    return {
        "phase": phase, "objective": objective, "learner_turns": learner_turns,
        "act": "建场" if beat_no <= 2 else "采集与识别" if beat_no <= 6 else "解释与协商" if beat_no <= 10 else "收口",
        "beat": beat_no, "beat_name": beat_name, "beat_objective": beat_objective,
        "turn_budget": {"minimum": 8, "target": 12, "maximum": 14},
        "window_check_due": learner_turns > 0 and learner_turns % 2 == 0,
        "required_points": required, "covered_points": covered, "pending_points": pending,
        "has_professional_conclusion": has_judgement, "has_action_plan": has_action,
        "has_teach_back": has_teach_back, "has_safety_closure": has_safety_closure,
        "ready_to_close": ready,
        "close_command": "结束对话，进入复盘",
        "completion_marker": "【SP对话完成｜进入复盘】" if ready else None,
        "rules": ["每轮只推进一个目标", "不向使用者展示评分点编号", "未满足关闭门槛不得自行结束或进入讲评"],
    }


def generate_case_variant(session_id: str, focus: str = "auto") -> dict[str, Any]:
    """Create a harder synthetic variant in a fresh retraining session.

    The medical topic and scoring coverage remain comparable. Only the setting,
    communication barrier, hidden clues, and release difficulty change.
    """
    store = _store()
    source_session, source_directory = store.load(session_id)
    if source_session["stage"] not in {"report", "retrain"}:
        raise RuntimeErrorWithCode("wrong_stage", "完成评分报告后才能生成病例变式")
    if not source_session.get("case_id"):
        raise RuntimeErrorWithCode("case_not_selected", "当前会话没有可生成变式的病例")
    base = deepcopy(_case_for_session(source_session, source_directory))
    aliases = {
        "auto": "auto", "自动": "auto", "communication": "communication", "沟通": "communication",
        "risk": "risk", "风险": "risk", "information": "information", "信息采集": "information",
        "adherence": "adherence", "依从性": "adherence", "协商": "adherence",
    }
    requested = aliases.get(str(focus or "auto").strip().lower(), aliases.get(str(focus or "auto").strip(), "auto"))
    score_path = source_directory / "score_result.json"
    weak_items: list[str] = []
    if score_path.is_file():
        score = read_json(score_path)
        weak_items = [item["item_id"] for item in score.get("item_results", []) if item.get("score", 0) < item.get("max_score", 0)]
    if requested == "auto":
        if any(item.startswith("RISK") for item in weak_items): requested = "risk"
        elif any(item.startswith(("EMPATHY", "PLAIN", "CHECK")) for item in weak_items): requested = "communication"
        elif any(item.startswith("INQ") for item in weak_items): requested = "information"
        else: requested = "adherence"
    profiles = {
        "communication": ("门诊复诊沟通", "焦虑、防御，回答简短，只有被共情后才补充", "先建立关系、使用通俗表达并完成回示确认"),
        "risk": ("夜间症状加重后的远程接触", "淡化危险信号，担心麻烦家人而拒绝转介", "识别升级的危险信号并协商及时安全转介"),
        "information": ("跨科交接后的首次接触", "叙述前后不一致，时间线零散，需要结构化追问", "澄清时间线、关键事实、影响因素与信息来源"),
        "adherence": ("出院后一周连续随访", "对建议有顾虑，表面同意但实际执行困难", "找出障碍、尊重偏好并形成具体可执行计划"),
    }
    setting, personality, task_focus = profiles[requested]
    new_session, new_directory = store.create(source_session["learner_profile"]["major_id"], mode="quick")
    variant_id = f"{base['case_id']}-V{new_session['session_id'][-4:]}"
    variant = deepcopy(base)
    variant.update({
        "case_id": variant_id,
        "variant_of": base["case_id"],
        "title": f"{base.get('title', base['case_id'])}｜{setting}变式",
        "task": f"{base.get('task', '')} 本轮重点：{task_focus}。",
        "review_status": "运行时合成变式",
    })
    variant.setdefault("public_profile", {})["setting"] = setting
    variant["public_profile"]["notice"] = "本病例为基于上一轮薄弱项生成的合成训练变式"
    variant.setdefault("persona", {})["personality"] = personality
    variant["persona"]["initial_emotion"] = "警惕"
    variant.setdefault("hidden_info", []).append({"id": "H-VAR", "value": task_focus, "sensitivity": "synthetic"})
    variant.setdefault("release_conditions", {})["H-VAR"] = ["ask_specific_fact", "acknowledge_concern", "confirm_understanding"]
    variant.setdefault("initial_state", {})["emotion"] = "警惕"
    variant["initial_state"]["revealed_info"] = []
    write_json(new_directory / "case_variant.json", variant)
    new_session.update({
        "case_id": variant_id, "variant_of": base["case_id"], "source_session_id": session_id,
        "learner_id": source_session.get("learner_id", DEFAULT_LEARNER_ID),
        "retrain_focus": requested, "previous_weak_nodes": weak_items, "revealed_info": [], "resident_state": {},
    })
    store.save(new_session, new_directory)
    if source_session["stage"] == "report":
        set_stage(source_session, "retrain")
        store.save(source_session, source_directory)
    public_case = _public_case_view(variant, new_session["learner_profile"].get("major_id"))
    return {
        "status": "ok", "source_session_id": session_id, "session_id": new_session["session_id"],
        "stage": "case_read", "variant_of": base["case_id"], "focus": requested,
        "previous_weak_items": weak_items, "public_case": public_case,
        "next_action": "先让学生分析变式公开资料，再进入SP对话；不要泄露隐藏信息或释放条件。",
    }


def advance_stage(session_id: str, stage: str) -> dict[str, Any]:
    """Advance state, accepting common dialogue aliases and one safe bridge.

    Learners naturally say "enter dialogue" while the persisted state is still
    ``case_read``.  The former strict one-hop transition rejected that request
    repeatedly.  For this single safe route we record the implicit
    ``case_assessment`` bridge and then enter ``dialogue``.
    """
    store = _store()
    session, directory = store.load(session_id)
    previous = session["stage"]
    raw_stage = str(stage or "").strip()
    aliases = {
        "resident_dialogue": "dialogue", "sp_dialogue": "dialogue",
        "conversation": "dialogue", "enter_dialogue": "dialogue",
        "居民对话": "dialogue", "患者对话": "dialogue", "进入对话": "dialogue", "对话": "dialogue",
        "结束对话，进入复盘": "evidence_extraction", "结束对话进入复盘": "evidence_extraction",
    }
    requested = aliases.get(raw_stage.lower(), aliases.get(raw_stage, raw_stage))
    traversed: list[str] = []
    if requested == "evidence_extraction" and previous == "dialogue":
        director = _dialogue_director(session, directory)
        if not director["ready_to_close"]:
            return {
                "status": "dialogue_incomplete", "session_id": session_id, "stage": "dialogue",
                "message": "SP对话尚未达到复盘门槛，不得提前结束。", "dialogue_director": director,
            }
        set_stage(session, "evidence_extraction")
        traversed.append("evidence_extraction")
    elif requested == "dialogue" and previous == "case_read":
        if not session.get("case_id"):
            raise RuntimeErrorWithCode("case_not_selected", "进入对话前请先选择一个病例")
        set_stage(session, "case_assessment")
        traversed.append("case_assessment")
        set_stage(session, "dialogue")
        traversed.append("dialogue")
    else:
        set_stage(session, requested)
        if requested != previous:
            traversed.append(requested)
    store.save(session, directory)
    payload = {
        "status": "ok", "session_id": session_id, "from": previous,
        "stage": session["stage"], "requested_stage": raw_stage,
        "traversed": traversed,
    }
    if session["stage"] == "dialogue":
        payload["simulation_contract"] = {
            "learner_role": session.get("learner_role_label"),
            "assistant_role": "虚拟患者/SP",
            "synthetic_case": True,
            "professional_actions_allowed": session.get("role_permissions", []),
            "instruction": "从现在起只扮演病例SP；不把用户称为学生，不教学，不主动要求联系值班医生。",
        }
        payload["dialogue_director"] = _dialogue_director(session, directory)
    elif previous == "dialogue" and session["stage"] == "evidence_extraction":
        payload["completion_marker"] = "【SP对话完成｜进入复盘】"
        payload["next_action"] = "立即停止扮演SP，进入证据抽取与确定性评分。"
    return payload


def append_turn(
    session_id: str,
    speaker: str,
    text: str,
    revealed_info: list[str] | None = None,
    resident_state: dict[str, Any] | None = None,
) -> dict[str, Any]:
    """Append one exact learner/SP/guide turn to the immutable dialogue log."""
    if speaker not in {"student", "resident", "guide", "tool"}:
        raise ValueError("speaker 必须是 student、resident、guide 或 tool")
    if not text.strip():
        raise ValueError("text 不能为空")
    store = _store()
    session, directory = store.load(session_id)
    dialogue = read_dialogue(directory)
    revealed = revealed_info or []
    state = resident_state or {}
    record = {
        "session_id": session_id,
        "case_id": session.get("case_id"),
        "stage": session["stage"],
        "turn_id": len(dialogue) + 1,
        "speaker": speaker,
        "raw_text": text,
        "timestamp": now_iso(),
        "revealed_info": revealed,
        "state_snapshot": state,
        "rubric_version": session["rubric_version"],
    }
    append_dialogue(directory, record)
    if revealed:
        session["revealed_info"] = sorted(set(session.get("revealed_info", []) + revealed))
    if state:
        session["resident_state"] = state
    store.save(session, directory)
    return {"status": "ok", "record": record}


def append_exchange(
    session_id: str,
    student_text: str,
    resident_text: str,
    revealed_info: list[str] | None = None,
    resident_state: dict[str, Any] | None = None,
    covered_points: list[str] | None = None,
    professional_conclusion: bool = False,
    action_plan: bool = False,
    teach_back: bool = False,
    safety_closure: bool = False,
) -> dict[str, Any]:
    """Persist one learner/SP exchange atomically to reduce MCP round trips."""
    if not student_text.strip() or not resident_text.strip():
        raise ValueError("student_text 和 resident_text 不能为空")
    store = _store()
    session, directory = store.load(session_id)
    dialogue = read_dialogue(directory)
    base = len(dialogue)
    revealed = revealed_info or []
    state = resident_state or {}
    student_record = {
        "session_id": session_id, "case_id": session.get("case_id"), "stage": session["stage"],
        "turn_id": base + 1, "speaker": "student", "raw_text": student_text,
        "timestamp": now_iso(), "revealed_info": [], "state_snapshot": {},
        "rubric_version": session["rubric_version"],
    }
    resident_record = {
        "session_id": session_id, "case_id": session.get("case_id"), "stage": session["stage"],
        "turn_id": base + 2, "speaker": "resident", "raw_text": resident_text,
        "timestamp": now_iso(), "revealed_info": revealed, "state_snapshot": state,
        "rubric_version": session["rubric_version"],
    }
    append_dialogue(directory, student_record)
    append_dialogue(directory, resident_record)
    if revealed:
        session["revealed_info"] = sorted(set(session.get("revealed_info", []) + revealed))
    if state:
        session["resident_state"] = state
    case = _case_for_session(session, directory)
    allowed = set(case.get("must_cover", []))
    accepted = [point for point in (covered_points or []) if point in allowed]
    session["dialogue_covered_points"] = list(dict.fromkeys(session.get("dialogue_covered_points", []) + accepted))
    session["dialogue_has_professional_conclusion"] = bool(session.get("dialogue_has_professional_conclusion") or professional_conclusion)
    session["dialogue_has_action_plan"] = bool(session.get("dialogue_has_action_plan") or action_plan)
    session["dialogue_has_teach_back"] = bool(session.get("dialogue_has_teach_back") or teach_back)
    session["dialogue_has_safety_closure"] = bool(session.get("dialogue_has_safety_closure") or safety_closure)
    store.save(session, directory)
    return {
        "status": "ok", "student_record": student_record, "resident_record": resident_record,
        "accepted_covered_points": accepted,
        "dialogue_director": _dialogue_director(session, directory, case),
    }


def score_session(
    session_id: str,
    evidence_candidates: list[dict[str, Any]],
    red_line_tags: list[str] | None = None,
) -> dict[str, Any]:
    """Validate quoted evidence against the real learner log, then run deterministic scoring."""
    store = _store()
    session, directory = store.load(session_id)
    if session["stage"] not in {"evidence_extraction", "scoring"}:
        raise RuntimeErrorWithCode("wrong_stage", "评分前必须结束对话并进入 evidence_extraction")
    rubric = read_json(RUBRIC_PATH)
    candidates = validate_evidence(evidence_candidates, read_dialogue(directory), rubric)
    red_lines = red_line_tags or []
    allowed = allowed_scoring_tags(rubric)
    if any(tag not in allowed for tag in red_lines):
        raise RuntimeErrorWithCode("invalid_red_line_tag", "红线标签不在评分表白名单中")
    write_json(directory / "evidence_candidates.json", {"evidence_candidates": candidates, "red_line_tags": red_lines})
    payload = {
        "session_id": session_id,
        "case_id": session.get("case_id"),
        "rubric_version": session["rubric_version"],
        "pretest_result": session.get("pretest_result"),
        "evidence_candidates": candidates,
        "red_line_tags": red_lines,
    }
    result = score_training(payload)
    if result.get("status") != "ok":
        raise RuntimeErrorWithCode("scoring_failed", json.dumps(result, ensure_ascii=False))
    write_json(directory / "score_result.json", result)
    set_stage(session, "scoring", force=session["stage"] == "scoring")
    session["score_summary"] = {"total_score": result["total_score"], "red_lines": result["red_lines"]}
    _archive_score(session, result)
    store.save(session, directory)
    return {"status": "ok", "session_id": session_id, "stage": "scoring", "score_result": result}


def generate_training_report(session_id: str, exam_reasoning: dict[str, str] | None = None,
                             collected: dict | None = None) -> dict[str, Any]:
    """Generate persisted JSON and standalone HTML reports from a real score result."""
    store = _store()
    session, directory = store.load(session_id)
    if session["stage"] != "scoring":
        raise RuntimeErrorWithCode("wrong_stage", "只有完成程序评分后才能生成报告")
    score_path = directory / "score_result.json"
    if not score_path.is_file():
        raise RuntimeErrorWithCode("missing_score", "缺少 score_result.json")
    report = generate_report(read_json(score_path))
    current_case = _case_for_session(session, directory)
    report["overview"]["case_title"] = current_case.get("title")
    if not report.get("retrain"):
        report["retrain"] = {
            "mode": "dynamic", "variant_of": session.get("case_id"),
            "title": "基于本轮薄弱项生成病例变式",
            "task": "调用 zhihu_generate_case_variant 创建新重练会话，改变场景、沟通障碍和风险线索。",
        }
    json_path = directory / "report.json"
    html_path = directory / "report.html"
    report["experience_references"] = get_experience_references(session_id=session_id, collected=collected)
    report["experience_assistance"] = (session.get("experience_assistance") or {}).get(session.get("case_id"), {"consultations": 0, "card_ids": []})
    report['objective_review'] = _objective_review(session, exam_reasoning)
    write_json(json_path, report)
    rendered = render_html(report)
    assistance = report["experience_assistance"]
    assistance_html = (f"<p>本轮使用指南带教 {assistance['consultations']} 次；评分标准未改变。</p>"
                       if assistance.get("consultations") else "<p>本轮未记录指南带教使用。</p>")
    from html import escape
    objective_html = '<section><h2>错题专项推理复盘（不计分，待教师复核）</h2>' + ''.join(
        '<h3>' + escape(row['question_id'] + ' · ' + row['exam_point']) + '</h3><p>' + escape(row['training_task']) +
        '</p><p>学生作答：' + escape(row['response'] or '未填写') + '</p><p>' + escape(row['self_check']) +
        '</p><p>' + escape(row['review_note']) + '</p><p>原题参考（非本病例标准答案）：' +
        escape(json.dumps(row['question_reference'], ensure_ascii=False)) + '</p><p>' + escape(row['review_status']) + '</p>'
        for row in report['objective_review']) + '</section>' if report['objective_review'] else ''
    reference_html = objective_html + assistance_html + experience.render_reference_html(report["experience_references"])
    html_path.write_text(rendered.replace("</body>", reference_html + "</body>") if "</body>" in rendered else rendered + reference_html, encoding="utf-8")
    set_stage(session, "report")
    session["report_paths"] = {"json": str(json_path), "html": str(html_path)}
    store.save(session, directory)
    return {
        "status": "ok",
        "session_id": session_id,
        "stage": "report",
        "report_json": str(json_path),
        "report_html": str(html_path),
        "summary": {
            "practice": report["practice"],
            "priority_gaps": report["priority_gaps"],
            "retrain": report["retrain"],
            "experience_references": report["experience_references"],
            "experience_assistance": report["experience_assistance"],
            "objective_review": report['objective_review'],
        },
    }


def _experience_visible_context(session, directory, collected=None):
    """Use only public clinical information and already-spoken SP replies.

    Do not use disease_id as a diagnosis, hidden_info, must_cover, release
    conditions, private persona or a learner's proposed diagnosis as fact.
    """
    parts = []
    if session.get("case_id"):
        public = _public_case_view(_case_for_session(session, directory))
        profile = public.get("public_profile") or {}
        if isinstance(profile.get("age"), (int, float)):
            parts.append(f"{profile['age']}岁")
        if isinstance(profile.get("history_statement"), str):
            parts.append(profile["history_statement"])
        for key in ("chief_complaint", "present_illness", "known_history"):
            if isinstance(public.get(key), str):
                parts.append(public[key])
        # Already displayed case-reading rows only. Family history, notes and
        # independent teaching inputs must not become patient findings.
        for row in public.get("clinical_data") or []:
            if not isinstance(row, dict):
                continue
            label = str(row.get("item", ""))
            value = row.get("value")
            # Generated communication cases expose a topic as a request. It is
            # an index label, not a patient's established diagnosis.
            if label == "当前诉求" and value == public.get("disease_label"):
                continue
            if (isinstance(value, str) and not re.search(r"家族|父亲|母亲|家属|婚育|实验|教学|计算|模型|考点|答案|推演|任务", label)
                    and not re.search(r"家族|父亲|母亲|家属|独立实验|教学输入|非患者", value)):
                parts.append(label + "：" + value)
        # Only selected IDs are accepted. Values come from the server-owned
        # current case. No stale snapshot or unavailable test establishes facts.
        if isinstance(collected, dict) and collected.get("case_id") == session["case_id"]:
            structured = public.get("structured") or {}
            history = structured.get("history") or {}
            selected = lambda key: {v for v in collected.get(key, []) if isinstance(v, str)} if isinstance(collected.get(key), list) else set()
            for key in selected("history") & {"chief_complaint", "present_illness", "past_history", "personal_history"}:
                if isinstance(history.get(key), str):
                    parts.append(history[key])
            ros = history.get("review_of_systems") or {}
            for key in selected("ros"):
                if isinstance(ros.get(key), str):
                    parts.append(key + "：" + ros[key])
            for category, key in (("exam", "exams"), ("labs", "labs")):
                for row in structured.get(category) or []:
                    if (row.get("item") in selected(key) and row.get("available") is not False
                            and isinstance(row.get("finding"), str)):
                        parts.append(str(row["item"]) + "：" + row["finding"])
    parts.extend(turn.get("raw_text", "") for turn in read_dialogue(directory) if turn.get("speaker") == "resident")
    return "；".join(parts)


def list_textbooks() -> dict:
    """List installed complete textbooks. No question explanations are modified."""
    from . import textbooks
    return textbooks.catalog()


def search_textbooks(query: str, book_id: str | None = None, limit: int = 20, offset: int = 0) -> dict:
    """Locate literal textbook passages. Results are candidates, not validated citations."""
    from . import textbooks
    return textbooks.search(query, book_id, limit, offset)


def read_textbook_page(book_id: str, pdf_page: int = 1) -> dict:
    """Read one page by PDF sequence; check the original PDF before citing."""
    from . import textbooks
    if textbooks.catalog()['status'] != 'ok':
        return {'status': 'unavailable', 'message': '此运行环境尚未安装完整教材库。'}
    return textbooks.read_page(book_id, pdf_page)


def get_experience_references(query: str = "", session_id: str | None = None,
                              question_id: str | None = None, case_id: str | None = None,
                              topic: str | None = None, node_id: str | None = None,
                              enabled: bool | None = None, training_active: bool = False,
                              assessment_active: bool = False, learning_mode: str | None = None,
                              collected: dict | None = None) -> dict[str, Any]:
    """Teaching references, never a score/diagnosis. Session stage is server-owned.

    No teacher flag bypass: the project has no authenticated teacher role.
    Practice permits condition-check guidance using only public/SP facts.
    Full recommendations wait until scoring; open pretests stay protected.
    Caller flags can restrict access, never override a server-owned assessment.
    """
    allow_cards = not (training_active or assessment_active)
    guidance_only = bool(training_active and not assessment_active)
    if learning_mode == "assessment" and not allow_cards:
        guidance_only = False
    visible_context = ""
    directory = _store().root / "_experience"
    coaching = False
    if session_id:
        session, session_dir = _store().load(session_id)
        if enabled is not None:
            session["experience_enabled"] = bool(enabled)
            _store().save(session, session_dir)
        enabled = session.get("experience_enabled", True)
        graded_ids = {row.get("question_id") for row in (session.get("pretest_result") or {}).get("detail", [])}
        question_review = bool(question_id and question_id in graded_ids and not session.get("pretest_open") and not session.get("case_id"))
        allow_cards = not session.get("pretest_open") and (question_review or (session["stage"] in {"scoring", "report", "retrain"} and (session_dir / "score_result.json").is_file()))
        case_id = session.get("case_id")
        guidance_only = bool((case_id or training_active) and not allow_cards and not session.get("pretest_open"))
        if learning_mode == "assessment" and guidance_only:
            guidance_only = False
        coaching = bool(learning_mode == "coach" and guidance_only and case_id)
        if guidance_only:
            visible_context = _experience_visible_context(session, session_dir, collected)
        if allow_cards and not question_review:
            query = _experience_visible_context(session, session_dir, collected) + "；" + str(query or "")
        elif question_review:
            # The submitted public stem supplies context, never options/answer.
            row = next(row for row in session["pretest_result"]["detail"] if row.get("question_id") == question_id)
            explanation = row.get("explanation")
            query = str(row.get("stem") or (explanation.get("stem") if isinstance(explanation, dict) else "") or "") + "；" + str(query or "")
        if assessment_active:
            allow_cards = guidance_only = False
    result = experience.search(query=query, question_id=question_id, case_id=case_id,
                             topic=topic, node_id=node_id, enabled=True if enabled is None else enabled,
                             allow_cards=allow_cards, guidance_only=guidance_only,
                             visible_context=visible_context, coaching=coaching, audit_path=directory / "retrieval.jsonl")
    if session_id and case_id:
        ledger = session.setdefault("experience_assistance", {})
        if coaching and result.get("status") == "ok" and result.get("cards"):
            entry = ledger.setdefault(case_id, {"consultations": 0, "card_ids": []})
            entry["consultations"] += 1
            entry["card_ids"] = sorted(set(entry["card_ids"]) | {c["id"] for c in result["cards"]})
            _store().save(session, session_dir)
        result["assistance"] = ledger.get(case_id, {"consultations": 0, "card_ids": []})
    return result
