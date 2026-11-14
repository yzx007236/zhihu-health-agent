#!/usr/bin/env python3
"""确定性批改微型自测，并支持按学习者专业与难度组卷。"""
import argparse, json, random
from pathlib import Path
ROOT = Path(__file__).resolve().parent.parent
DEFAULT_QUIZ = ROOT / "references" / "quizzes" / "pretest.json"
DEFAULT_MAJOR = "other"
DEFAULT_LEVEL = "basic"
LEVELS = ("basic", "intermediate", "advanced", "expert", "english")
PAPER_SIZE = 5  # 每次自测固定抽 5 题


def _extend_papers(target, source):
    """合并分层题号，保持顺序并去重；题量不足的档位不复制题目补数。"""
    for major, layers in (source or {}).items():
        bucket = target.setdefault(major, {})
        if not isinstance(layers, dict):
            layers = {"basic": layers}
        for level, ids in layers.items():
            current = bucket.setdefault(level, [])
            for qid in ids or []:
                if qid not in current:
                    current.append(qid)


def _apply_expert_floor(quiz):
    """保留各档原始题，不再动态拼接选项后缀。

    历史实现给提高/困难/专家档的正确项统一追加正面后缀、给错误项统一
    追加负面后缀（"不再复评""先执行后补核验""不设升级阈值"等），学生只看
    选项后半段就能排除错项，等于结构性泄题。现改为：四档各自使用题库中
    独立命制、选项有实质内容差异的原始题，加难体现在题干情境与决策约束，
    而非选项措辞。
    """
    for major, entry in (quiz.get("major_papers") or {}).items():
        # basic 缺省时回退到该专业已有试卷，保证四档结构完整。
        if not entry.get("basic"):
            entry["basic"] = (
                entry.get("intermediate")
                or entry.get("advanced")
                or entry.get("expert")
                or []
            )
    quiz["version"] = "4.4.0"
    quiz["title"] = "严格分级医学题库（A/B型单选与X型多选；attempt级随机选项）"
    return quiz

def _load(quiz_path):
    path = Path(quiz_path)
    quiz = json.loads(path.read_text(encoding="utf-8"))
    # v4 keeps the validated v3 question bank intact and layers the two new
    # high-difficulty papers beside it. The former advanced paper becomes the
    # intermediate paper so all four levels increase monotonically.
    extension = path.with_name("pretest_hard.json")
    if extension.is_file():
        extra = json.loads(extension.read_text(encoding="utf-8"))
        for major, entry in (quiz.get("major_papers") or {}).items():
            if "intermediate" not in entry and "advanced" in entry:
                entry["intermediate"] = entry.pop("advanced")
            entry.update((extra.get("major_papers") or {}).get(major, {}))
        quiz["questions"].extend(extra.get("questions") or [])
        quiz["version"] = extra.get("version", quiz.get("version"))
        quiz["title"] = extra.get("title", quiz.get("title"))
    # ④ 医学英语卷：与四档并行的一档，挂在每个专业下，题干与选项为英文。
    for extra_name in ("pretest_en.json", "pretest_westmed.json"):
        extra_path = path.with_name(extra_name)
        if not extra_path.is_file():
            continue
        extra = json.loads(extra_path.read_text(encoding="utf-8"))
        _extend_papers(quiz.setdefault("major_papers", {}), extra.get("major_papers"))
        quiz["questions"].extend(extra.get("questions") or [])
        quiz["version"] = extra.get("version", quiz.get("version"))
    return _apply_expert_floor(quiz)

def list_majors(quiz_path=DEFAULT_QUIZ):
    return sorted((_load(quiz_path).get("major_papers") or {}).keys())

def _paper_entry(quiz, major):
    papers = quiz.get("major_papers") or {}
    if not papers:
        return None
    return papers.get(major) or papers.get(DEFAULT_MAJOR)

def list_levels(major=DEFAULT_MAJOR, quiz_path=DEFAULT_QUIZ):
    """仅返回至少可组成5题卷的档位；不足时如实暂停，不复制题目补数。"""
    quiz = _load(quiz_path)
    entry = _paper_entry(quiz, major)
    if isinstance(entry, dict):
        active = {q["question_id"] for q in quiz.get("questions", []) if q.get("active", True)}
        return [level for level in LEVELS if len([qid for qid in entry.get(level, []) if qid in active]) >= PAPER_SIZE]
    return [DEFAULT_LEVEL] if entry else []

def build_paper(major=DEFAULT_MAJOR, level=DEFAULT_LEVEL, quiz_path=DEFAULT_QUIZ, question_ids=None, sample=True, paper_size=PAPER_SIZE):
    """按专业与难度取出试卷。

    - `question_ids` 指定时返回这组题（批改复现出题用，保证一致性）。
    - 否则按 paper_size 抽取不重复题；可用题不足时返回全部，不跨难度补数。
    - 档位缺失时回退该专业的基础卷，专业未知落 other。
    """
    quiz = _load(quiz_path)
    entry = _paper_entry(quiz, major)
    if entry is None:
        return [q for q in quiz["questions"] if q.get("active", True)]
    index = {q["question_id"]: q for q in quiz["questions"] if q.get("active", True)}
    if isinstance(entry, dict):
        ids = [qid for qid in (entry.get(level) or []) if qid in index]
        if len(ids) < PAPER_SIZE:
            ids = next(
                ([qid for qid in entry.get(candidate, []) if qid in index]
                 for candidate in LEVELS
                 if len([qid for qid in entry.get(candidate, []) if qid in index]) >= PAPER_SIZE),
                ids,
            )
    else:
        ids = [qid for qid in entry if qid in index]
    ids = list(dict.fromkeys(ids))
    if not ids:
        return []
    if question_ids is not None:
        ids = [i for i in question_ids if i in index]
    elif sample and len(ids) > paper_size:
        rng = random.Random()
        ids = rng.sample(list(dict.fromkeys(ids)), paper_size)
    return [index[i] | {"difficulty": level} for i in ids if i in index]

def check_pretest(answers, quiz_path=DEFAULT_QUIZ, major=DEFAULT_MAJOR, level=DEFAULT_LEVEL, question_ids=None):
    submitted = (answers or {}).get("answers", answers or {})
    quiz = _load(quiz_path)
    questions = build_paper(major, level, quiz_path, question_ids=question_ids)
    detail, weak, earned, possible = [], [], 0, 0
    for q in questions:
        actual = "".join(sorted(set(str(submitted.get(q["question_id"], "")).strip().upper())))
        expected = "".join(sorted(set(str(q.get("answer", "")).strip().upper())))
        correct = actual == expected
        points = int(q.get("score", 1)); possible += points; earned += points if correct else 0
        if not correct and q["node_id"] not in weak: weak.append(q["node_id"])
        answer_letter = expected
        options = q.get("options") or {}
        item = {
            "question_id": q["question_id"], "node_id": q["node_id"],
            "submitted": actual or None, "correct": correct,
            "score": points if correct else 0, "max_score": points,
            "explanation_ref": q.get("explanation_ref"),
            # 未绑定知识卡的题（如医学英语术语题）自带中文解析与来源说明
            "explanation": q.get("explanation"),
            "source": q.get("source"),
            "source_note": q.get("source_note"),
            # 讲解所需的自包含题干与答案信息，保证逐题讲解不依赖二次检索题面。
            "stem": q.get("stem"),
            "options": options,
            "correct_answer": answer_letter,
            "question_type": q.get("type", "single_choice"),
            "correct_option_text": "；".join(options.get(letter, "") for letter in answer_letter),
            "submitted_option_text": "；".join(options.get(letter, "") for letter in actual) if actual else None,
        }
        if q.get("subquestions"):
            selected = (q.get("answer_sequences") or {}).get(actual, [])
            item["component_detail"] = [
                {"number":sub["number"],"question_id":sub["question_id"],"node_id":sub["node_id"],"submitted":selected[index] if index < len(selected) else None,"correct_answer":sub["correct_answer"],"correct":index < len(selected) and selected[index] == sub["correct_answer"],"explanation_ref":sub["explanation_ref"]}
                for index, sub in enumerate(q["subquestions"])
            ]
        detail.append(item)
    return {"status":"ok","quiz_id":quiz["quiz_id"],"quiz_version":quiz["version"],"major":major,"level":level,"available_levels":list_levels(major, quiz_path),"paper":[q["question_id"] for q in questions],"score":earned,"max_score":possible,"percentage":round(earned/possible*100,2) if possible else 0,"weak_nodes":weak,"detail":detail}

def main():
    p=argparse.ArgumentParser()
    p.add_argument("--answers",help="答卷 JSON；--paper-only 时不需要")
    p.add_argument("--quiz",default=str(DEFAULT_QUIZ))
    p.add_argument("--major",default=DEFAULT_MAJOR,help=f"可选：{', '.join(list_majors())}")
    p.add_argument("--level",default=DEFAULT_LEVEL,choices=list(LEVELS),help="basic=基础，intermediate=提高，advanced=困难，expert=专家")
    p.add_argument("--paper-only",action="store_true",help="只输出该专业卷的题目编号")
    a=p.parse_args()
    if a.paper_only:
        print(json.dumps({"major":a.major,"level":a.level,"available_levels":list_levels(a.major,a.quiz),"paper":[q["question_id"] for q in build_paper(a.major,a.level,a.quiz)]},ensure_ascii=False,indent=2)); return
    if not a.answers: p.error("--answers 为必填项")
    print(json.dumps(check_pretest(json.loads(Path(a.answers).read_text(encoding="utf-8")),a.quiz,a.major,a.level),ensure_ascii=False,indent=2))
if __name__ == "__main__": main()
