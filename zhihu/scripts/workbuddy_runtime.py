#!/usr/bin/env python3
"""WorkBuddy-facing runtime for persistent ZhiHu training sessions.

The runtime keeps raw dialogue, extracted evidence, deterministic scores, and
reports in separate files. It never performs natural-language diagnosis or
evidence extraction; those remain constrained model tasks validated here.
"""

from __future__ import annotations

import argparse
import json
import re
import sys
import uuid
from contextvars import ContextVar
from datetime import datetime, timezone
from pathlib import Path

SCRIPT_DIR = Path(__file__).resolve().parent
ROOT = SCRIPT_DIR.parent
sys.path.insert(0, str(SCRIPT_DIR))

from check_pretest import build_paper, check_pretest, list_levels, list_majors  # noqa: E402
from generate_report import generate_report, render_html  # noqa: E402
from get_training_case import get_training_case  # noqa: E402
from retrieve_knowledge import retrieve_knowledge  # noqa: E402
from score_training import score_training  # noqa: E402

RUBRIC_PATH = ROOT / "references" / "rubric.json"
STARTUP_PATH = ROOT / "references" / "startup.json"
SESSION_ID_RE = re.compile(r"^[A-Za-z0-9_-]{8,80}$")
CLASSROOM_ACCESS = ContextVar('classroom_access', default=None)
SPEAKERS = {"student", "resident", "guide", "tool"}
STAGES = {
    "idle", "pretest", "explain", "case_read", "case_assessment",
    "dialogue", "evidence_extraction", "scoring", "report", "retrain",
    "paused", "ended", "error", "safety_redirect",
}
NEXT_STAGES = {
    "idle": {"pretest", "ended", "safety_redirect"},
    "pretest": {"explain", "case_read", "paused", "ended", "safety_redirect"},
    "explain": {"case_read", "paused", "ended", "safety_redirect"},
    "case_read": {"case_assessment", "paused", "ended", "safety_redirect"},
    "case_assessment": {"dialogue", "paused", "ended", "safety_redirect"},
    "dialogue": {"evidence_extraction", "paused", "ended", "safety_redirect"},
    "evidence_extraction": {"scoring", "error"},
    "scoring": {"report", "error"},
    "report": {"retrain", "ended"},
    "retrain": {"case_read", "ended"},
    "paused": {"pretest", "explain", "case_read", "case_assessment", "dialogue", "ended"},
    "error": {"pretest", "explain", "case_read", "case_assessment", "dialogue", "evidence_extraction", "scoring", "ended"},
    "safety_redirect": {"paused", "ended"},
    "ended": set(),
}


class RuntimeErrorWithCode(RuntimeError):
    def __init__(self, code: str, message: str):
        super().__init__(message)
        self.code = code


def now_iso() -> str:
    return datetime.now(timezone.utc).isoformat()


def emit(payload: dict) -> None:
    print(json.dumps(payload, ensure_ascii=False, indent=2))


def read_json(path: str | Path):
    return json.loads(Path(path).read_text(encoding="utf-8"))


def write_json(path: Path, payload) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    temp = path.with_suffix(path.suffix + ".tmp")
    temp.write_text(json.dumps(payload, ensure_ascii=False, indent=2), encoding="utf-8")
    temp.replace(path)


def validate_session_id(session_id: str) -> None:
    if not SESSION_ID_RE.fullmatch(session_id or ""):
        raise RuntimeErrorWithCode("invalid_session_id", "会话编号格式不合法")


MAJOR_ALIASES = {
    "临床": "clinical_medicine", "临床医学": "clinical_medicine", "临床医学专业": "clinical_medicine",
    "clinical": "clinical_medicine", "clinical_medicine": "clinical_medicine", "medicine": "clinical_medicine",
    "医学技术": "medical_technology", "医学技术专业": "medical_technology", "检验": "medical_technology",
    "医学检验": "medical_technology", "影像": "medical_technology", "medical_technology": "medical_technology",
    "护理": "nursing", "护理学": "nursing", "护理学专业": "nursing", "nurse": "nursing", "nursing": "nursing",
    "中医": "traditional_chinese_medicine", "中医学": "traditional_chinese_medicine",
    "中医学专业": "traditional_chinese_medicine", "tcm": "traditional_chinese_medicine",
    "traditional_chinese_medicine": "traditional_chinese_medicine",
    "康复": "rehabilitation", "康复治疗": "rehabilitation", "rehabilitation": "rehabilitation",
    "健康管理": "health_management", "健康服务": "health_management", "health_management": "health_management",
    "其他": "other", "other": "other",
}

ROLE_PROFILES = {
    "clinical_medicine": {"role": "virtual_physician", "label": "虚拟接诊医生", "permissions": ["structured_history", "physical_exam_plan", "differential_diagnosis", "working_diagnosis", "test_plan", "risk_management", "consult_or_referral"]},
    "traditional_chinese_medicine": {"role": "virtual_tcm_physician", "label": "虚拟中医师", "permissions": ["four_diagnoses", "syndrome_hypothesis", "differential_diagnosis", "test_plan", "integrative_risk_management", "consult_or_referral"]},
    "nursing": {"role": "virtual_registered_nurse", "label": "虚拟责任护士", "permissions": ["nursing_assessment", "nursing_judgement", "authorized_procedure", "monitoring", "handoff", "escalation"]},
    "medical_technology": {"role": "virtual_medical_technologist", "label": "虚拟医学技术人员", "permissions": ["specimen_collection", "serum_processing", "quality_control", "result_verification", "critical_value_loop", "imaging_safety"]},
    "rehabilitation": {"role": "virtual_rehabilitation_therapist", "label": "虚拟康复治疗师", "permissions": ["functional_assessment", "rehabilitation_plan", "training_safety", "stop_signal", "caregiver_training", "referral"]},
    "health_management": {"role": "virtual_health_manager", "label": "虚拟健康管理师", "permissions": ["risk_assessment", "screening", "followup_plan", "health_education", "resource_coordination", "referral"]},
    "other": {"role": "virtual_healthcare_trainee", "label": "虚拟健康专业人员", "permissions": ["information_collection", "risk_recognition", "professional_communication", "referral"]},
}


def role_profile(major: str | None) -> dict:
    return dict(ROLE_PROFILES.get(major or "other", ROLE_PROFILES["other"]))


def normalize_major(major: str) -> str:
    key = str(major or "").strip()
    candidate = MAJOR_ALIASES.get(key, MAJOR_ALIASES.get(key.lower(), key))
    return candidate if candidate in list_majors() else "other"


def _squash(text: str) -> str:
    """去掉空白、标点与大小写差异，用于口令比对。"""
    return re.sub(r"[\s，,。.、！!？?「」【】《》()（）\-_/\\·~]+", "", str(text or "")).lower()


def load_startup() -> dict:
    return read_json(STARTUP_PATH)


def match_start_trigger(text: str) -> str | None:
    """返回命中的启动口令原文；未命中返回 None。整句命中或口令开头命中都算。"""
    squashed = _squash(text)
    if not squashed:
        return None
    for word in load_startup()["trigger_words"]:
        if squashed == _squash(word):
            return word
    for word in load_startup()["trigger_words"]:
        key = _squash(word)
        if key and squashed.startswith(key):
            return word
    return None


def detect_major_in_text(text: str) -> str | None:
    """从一句话里认出专业名（长别名优先），认不出返回 None。"""
    squashed = _squash(text)
    if not squashed:
        return None
    for alias in sorted(MAJOR_ALIASES, key=len, reverse=True):
        key = _squash(alias)
        if key and key in squashed:
            return MAJOR_ALIASES[alias]
    return None


class SessionStore:
    def __init__(self, root: Path):
        self.root = root.resolve()
        self.root.mkdir(parents=True, exist_ok=True)

    def directory(self, session_id: str) -> Path:
        validate_session_id(session_id)
        target = (self.root / session_id).resolve()
        if target.parent != self.root:
            raise RuntimeErrorWithCode("unsafe_session_path", "会话路径超出存储目录")
        return target

    def load(self, session_id: str) -> tuple[dict, Path]:
        directory = self.directory(session_id)
        path = directory / "session.json"
        if not path.is_file():
            raise RuntimeErrorWithCode("session_not_found", f"未找到会话：{session_id}")
        session = read_json(path)
        binding = session.get('classroom_binding')
        if binding and CLASSROOM_ACCESS.get() != (binding.get('course_id'), binding.get('user_id')):
            raise RuntimeErrorWithCode('classroom_auth_required', '课程训练必须通过登录后的课程入口访问')
        return session, directory

    def save(self, session: dict, directory: Path) -> None:
        session["updated_at"] = now_iso()
        write_json(directory / "session.json", session)

    def create(self, major: str | None, mode: str = "quick") -> tuple[dict, Path]:
        normalized = normalize_major(major) if str(major or "").strip() else None
        if mode not in {"quick", "complete"}:
            mode = "quick"
        session_id = "ZH-" + datetime.now().strftime("%Y%m%d%H%M%S") + "-" + uuid.uuid4().hex[:8]
        directory = self.directory(session_id)
        directory.mkdir(parents=False, exist_ok=False)
        if normalized is None:
            stage = "idle"
        else:
            stage = "case_read" if mode == "quick" else "idle"
        session = {
            "session_id": session_id,
            "stage": stage,
            "learner_profile": {"major_id": normalized},
            "awaiting_major": normalized is None,
            "training_mode": mode,
            "case_id": None,
            "pretest_result": None,
            "weak_nodes": [],
            "revealed_info": [],
            "resident_state": {},
            "interaction_mode": "guide",
            "learner_role": role_profile(normalized)["role"],
            "learner_role_label": role_profile(normalized)["label"],
            "role_permissions": role_profile(normalized)["permissions"],
            "audience": "learner",
            "synthetic_case_confirmed": True,
            "real_world_safety_triggered": False,
            "rubric_version": read_json(RUBRIC_PATH)["rubric_version"],
            "created_at": now_iso(),
            "updated_at": now_iso(),
        }
        self.save(session, directory)
        (directory / "dialogue.jsonl").touch()
        return session, directory


def assign_major(session: dict, major: str) -> str:
    """把学生回答的专业写进已开工但没有专业的会话。不改评分规则。"""
    normalized = normalize_major(major)
    session.setdefault("learner_profile", {})["major_id"] = normalized
    profile = role_profile(normalized)
    session["learner_role"] = profile["role"]
    session["learner_role_label"] = profile["label"]
    session["role_permissions"] = profile["permissions"]
    session["awaiting_major"] = False
    if session.get("stage") == "idle" and session.get("training_mode") == "quick":
        session["stage"] = "case_read"
    return normalized


def set_stage(session: dict, stage: str, force: bool = False) -> None:
    if stage not in STAGES:
        raise RuntimeErrorWithCode("invalid_stage", f"未知阶段：{stage}")
    current = session["stage"]
    if not force and stage != current and stage not in NEXT_STAGES.get(current, set()):
        raise RuntimeErrorWithCode("invalid_transition", f"不允许从 {current} 迁移到 {stage}")
    session["stage"] = stage
    if stage == "dialogue":
        session["interaction_mode"] = "sp_simulation"
        session["audience"] = "patient"
    elif stage == "case_assessment":
        session["interaction_mode"] = "professional_reasoning"
        session["audience"] = "clinical_team"
    elif stage in {"evidence_extraction", "scoring", "report"}:
        session["interaction_mode"] = "assessment"
        session["audience"] = "learner"
    else:
        session["interaction_mode"] = "guide"
        session["audience"] = "learner"


def read_dialogue(directory: Path) -> list[dict]:
    path = directory / "dialogue.jsonl"
    if not path.exists():
        return []
    rows = []
    for line in path.read_text(encoding="utf-8").splitlines():
        if line.strip():
            rows.append(json.loads(line))
    return rows


def append_dialogue(directory: Path, record: dict) -> None:
    with (directory / "dialogue.jsonl").open("a", encoding="utf-8", newline="\n") as handle:
        handle.write(json.dumps(record, ensure_ascii=False) + "\n")


def allowed_scoring_tags(rubric: dict) -> set[str]:
    tags: set[str] = set()
    for item in rubric.get("items", []):
        for level in ("full", "partial"):
            condition = item.get(level) or {}
            for key in ("all_tags", "any_tags", "allowed_tags"):
                tags.update(condition.get(key, []))
    for rule in rubric.get("red_lines", []):
        tags.update(rule.get("tags", []))
    return tags


def validate_evidence(raw: list[dict], dialogue: list[dict], rubric: dict) -> list[dict]:
    student_turns = {str(row["turn_id"]): row["raw_text"] for row in dialogue if row.get("speaker") == "student"}
    known_items = {item["item_id"] for item in rubric.get("items", [])}
    allowed_tags = allowed_scoring_tags(rubric)
    validated = []
    for index, item in enumerate(raw):
        item_id = item.get("item_id")
        turn_id = str(item.get("turn_id", ""))
        quote = str(item.get("quote", "")).strip()
        tags = item.get("tags")
        if item_id not in known_items:
            raise RuntimeErrorWithCode("invalid_evidence", f"证据 {index} 使用未知评分项 {item_id}")
        if turn_id not in student_turns:
            raise RuntimeErrorWithCode("invalid_evidence", f"证据 {index} 的轮次不是学生真实轮次")
        if not quote or quote not in student_turns[turn_id]:
            raise RuntimeErrorWithCode("invalid_evidence", f"证据 {index} 的引文不在对应学生原话中")
        if not isinstance(tags, list) or any(tag not in allowed_tags for tag in tags):
            raise RuntimeErrorWithCode("invalid_evidence", f"证据 {index} 含未知语义标签")
        checked = dict(item)
        checked["turn_id"] = int(turn_id) if turn_id.isdigit() else turn_id
        checked["quote"] = quote
        checked["tags"] = sorted(set(tags))
        checked.setdefault("source", "evidence_extractor")
        validated.append(checked)
    return validated


def command_doctor(_args, _store: SessionStore) -> dict:
    required = [
        ROOT / "SKILL.md", RUBRIC_PATH,
        ROOT / "references" / "cases" / "cases.json",
        ROOT / "references" / "knowledge" / "knowledge_cards.json",
        ROOT / "references" / "quizzes" / "pretest.json",
        ROOT / "assets" / "report.html",
    ]
    missing = [str(path) for path in required if not path.is_file()]
    cases = get_training_case().get("cases", [])
    return {
        "status": "ok" if not missing else "error",
        "python": sys.version.split()[0],
        "missing": missing,
        "majors": list_majors(),
        "case_count": len(cases),
        "rubric_version": read_json(RUBRIC_PATH)["rubric_version"],
    }


def command_start(args, store: SessionStore) -> dict:
    session, directory = store.create(args.major)
    return {"status": "ok", "session": session, "session_directory": str(directory)}


def command_status(args, store: SessionStore) -> dict:
    session, directory = store.load(args.session_id)
    return {
        "status": "ok",
        "session": session,
        "dialogue_turns": len(read_dialogue(directory)),
        "artifacts": sorted(path.name for path in directory.iterdir() if path.is_file()),
    }


def command_paper(args, store: SessionStore) -> dict:
    session, directory = store.load(args.session_id)
    set_stage(session, "pretest")
    major = session["learner_profile"]["major_id"]
    questions = []
    for question in build_paper(major):
        questions.append({key: question[key] for key in ("question_id", "node_id", "type", "stem", "options")})
    store.save(session, directory)
    return {"status": "ok", "session_id": args.session_id, "stage": "pretest", "major": major, "questions": questions}


def command_submit_pretest(args, store: SessionStore) -> dict:
    session, directory = store.load(args.session_id)
    if session["stage"] != "pretest":
        raise RuntimeErrorWithCode("wrong_stage", "只有 pretest 阶段可以提交自测")
    result = check_pretest(read_json(args.answers), major=session["learner_profile"]["major_id"])
    session["pretest_result"] = result
    session["weak_nodes"] = result["weak_nodes"]
    set_stage(session, "explain" if result["weak_nodes"] else "case_read")
    store.save(session, directory)
    return {"status": "ok", "session_id": args.session_id, "stage": session["stage"], "pretest_result": result}


def command_knowledge(args, _store: SessionStore) -> dict:
    return retrieve_knowledge(node_id=args.node_id, knowledge_id=args.knowledge_id)


def command_list_cases(_args, _store: SessionStore) -> dict:
    return get_training_case()


def command_select_case(args, store: SessionStore) -> dict:
    session, directory = store.load(args.session_id)
    if session["stage"] not in {"explain", "case_read", "retrain"}:
        raise RuntimeErrorWithCode("wrong_stage", "当前阶段不能选择病例")
    result = get_training_case(args.case_id, include_private=False)
    if result.get("status") != "ok":
        raise RuntimeErrorWithCode("case_not_found", f"未找到病例：{args.case_id}")
    session["case_id"] = args.case_id
    session["revealed_info"] = []
    session["resident_state"] = {}
    set_stage(session, "case_read", force=session["stage"] == "case_read")
    store.save(session, directory)
    return {"status": "ok", "session_id": args.session_id, "stage": "case_read", "public_case": result["case"]}


def command_private_case(args, store: SessionStore) -> dict:
    session, _directory = store.load(args.session_id)
    if not session.get("case_id"):
        raise RuntimeErrorWithCode("case_not_selected", "尚未选择病例")
    result = get_training_case(session["case_id"], include_private=True)
    return {"status": "ok", "internal_only": True, "case": result["case"]}


def command_transition(args, store: SessionStore) -> dict:
    session, directory = store.load(args.session_id)
    previous = session["stage"]
    set_stage(session, args.stage)
    store.save(session, directory)
    return {"status": "ok", "session_id": args.session_id, "from": previous, "stage": args.stage}


def command_log(args, store: SessionStore) -> dict:
    session, directory = store.load(args.session_id)
    if args.speaker not in SPEAKERS:
        raise RuntimeErrorWithCode("invalid_speaker", f"未知说话人：{args.speaker}")
    dialogue = read_dialogue(directory)
    revealed = read_json(args.revealed_json) if args.revealed_json else []
    state = read_json(args.state_json) if args.state_json else {}
    record = {
        "session_id": args.session_id,
        "case_id": session.get("case_id"),
        "stage": session["stage"],
        "turn_id": len(dialogue) + 1,
        "speaker": args.speaker,
        "raw_text": args.text,
        "timestamp": now_iso(),
        "revealed_info": revealed,
        "state_snapshot": state,
        "rubric_version": session["rubric_version"],
    }
    append_dialogue(directory, record)
    if revealed:
        session["revealed_info"] = sorted(set(session.get("revealed_info", []) + list(revealed)))
    if state:
        session["resident_state"] = state
    store.save(session, directory)
    return {"status": "ok", "record": record}


def command_score(args, store: SessionStore) -> dict:
    session, directory = store.load(args.session_id)
    if session["stage"] not in {"evidence_extraction", "scoring"}:
        raise RuntimeErrorWithCode("wrong_stage", "评分前必须结束对话并进入 evidence_extraction")
    rubric = read_json(RUBRIC_PATH)
    evidence_input = read_json(args.evidence)
    if isinstance(evidence_input, list):
        candidates, red_line_tags = evidence_input, []
    else:
        candidates = evidence_input.get("evidence_candidates", [])
        red_line_tags = evidence_input.get("red_line_tags", [])
    candidates = validate_evidence(candidates, read_dialogue(directory), rubric)
    allowed_tags = allowed_scoring_tags(rubric)
    if any(tag not in allowed_tags for tag in red_line_tags):
        raise RuntimeErrorWithCode("invalid_red_line_tag", "红线标签不在评分表白名单中")
    write_json(directory / "evidence_candidates.json", {"evidence_candidates": candidates, "red_line_tags": red_line_tags})
    payload = {
        "session_id": args.session_id,
        "case_id": session.get("case_id"),
        "rubric_version": session["rubric_version"],
        "pretest_result": session.get("pretest_result"),
        "evidence_candidates": candidates,
        "red_line_tags": red_line_tags,
    }
    result = score_training(payload)
    if result.get("status") != "ok":
        raise RuntimeErrorWithCode("scoring_failed", json.dumps(result, ensure_ascii=False))
    write_json(directory / "score_result.json", result)
    set_stage(session, "scoring", force=session["stage"] == "scoring")
    session["score_summary"] = {"total_score": result["total_score"], "red_lines": result["red_lines"]}
    store.save(session, directory)
    return {"status": "ok", "session_id": args.session_id, "stage": "scoring", "score_result": result}


def command_report(args, store: SessionStore) -> dict:
    session, directory = store.load(args.session_id)
    if session["stage"] != "scoring":
        raise RuntimeErrorWithCode("wrong_stage", "只有完成程序评分后才能生成报告")
    score_path = directory / "score_result.json"
    if not score_path.is_file():
        raise RuntimeErrorWithCode("missing_score", "缺少 score_result.json")
    report = generate_report(read_json(score_path))
    json_path = directory / "report.json"
    html_path = directory / "report.html"
    write_json(json_path, report)
    html_path.write_text(render_html(report), encoding="utf-8")
    set_stage(session, "report")
    session["report_paths"] = {"json": str(json_path), "html": str(html_path)}
    store.save(session, directory)
    return {
        "status": "ok",
        "session_id": args.session_id,
        "stage": "report",
        "report_json": str(json_path),
        "report_html": str(html_path),
        "summary": {"practice": report["practice"], "priority_gaps": report["priority_gaps"], "retrain": report["retrain"]},
    }


def build_parser() -> argparse.ArgumentParser:
    parser = argparse.ArgumentParser(description="ZhiHu WorkBuddy runtime")
    parser.add_argument("--store", default=str(Path.cwd() / ".zhihu-sessions"), help="会话存储目录")
    sub = parser.add_subparsers(dest="command", required=True)

    sub.add_parser("doctor")
    start = sub.add_parser("start"); start.add_argument("--major", default="other")
    status = sub.add_parser("status"); status.add_argument("--session-id", required=True)
    paper = sub.add_parser("paper"); paper.add_argument("--session-id", required=True)
    submit = sub.add_parser("submit-pretest"); submit.add_argument("--session-id", required=True); submit.add_argument("--answers", required=True)
    knowledge = sub.add_parser("knowledge"); knowledge.add_argument("--node-id"); knowledge.add_argument("--knowledge-id")
    sub.add_parser("list-cases")
    select = sub.add_parser("select-case"); select.add_argument("--session-id", required=True); select.add_argument("--case-id", required=True)
    private = sub.add_parser("private-case"); private.add_argument("--session-id", required=True)
    transition = sub.add_parser("transition"); transition.add_argument("--session-id", required=True); transition.add_argument("--stage", required=True)
    log = sub.add_parser("log"); log.add_argument("--session-id", required=True); log.add_argument("--speaker", required=True); log.add_argument("--text", required=True); log.add_argument("--revealed-json"); log.add_argument("--state-json")
    score = sub.add_parser("score"); score.add_argument("--session-id", required=True); score.add_argument("--evidence", required=True)
    report = sub.add_parser("report"); report.add_argument("--session-id", required=True)
    return parser


COMMANDS = {
    "doctor": command_doctor,
    "start": command_start,
    "status": command_status,
    "paper": command_paper,
    "submit-pretest": command_submit_pretest,
    "knowledge": command_knowledge,
    "list-cases": command_list_cases,
    "select-case": command_select_case,
    "private-case": command_private_case,
    "transition": command_transition,
    "log": command_log,
    "score": command_score,
    "report": command_report,
}


def main() -> int:
    args = build_parser().parse_args()
    try:
        store = SessionStore(Path(args.store))
        emit(COMMANDS[args.command](args, store))
        return 0
    except RuntimeErrorWithCode as exc:
        emit({"status": "error", "error": exc.code, "message": str(exc)})
        return 2
    except (OSError, ValueError, json.JSONDecodeError) as exc:
        emit({"status": "error", "error": "runtime_failure", "message": str(exc)})
        return 3


if __name__ == "__main__":
    raise SystemExit(main())
