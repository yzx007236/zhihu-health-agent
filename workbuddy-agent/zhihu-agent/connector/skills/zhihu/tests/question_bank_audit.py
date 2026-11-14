#!/usr/bin/env python3
"""Audit stored questions and every active five-question paper."""
import json
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
sys.path.insert(0, str(ROOT / "scripts"))
from check_pretest import build_paper, check_pretest, list_levels, list_majors  # noqa: E402


def main():
    failures = []
    cards = {}
    for path in (ROOT / "references" / "knowledge").glob("*.json"):
        cards.update({card["knowledge_id"]: card for card in json.loads(path.read_text(encoding="utf-8")).get("cards", [])})
    audited = 0
    active_count = 0
    signatures = {}

    # 全量结构校验：遍历题库所有题（不抽样），逐题检查单选、选项唯一、答案合法、无泄题后缀。
    leak_suffixes = (
        "；并将单次信息直接视为最终结论，不再复评",
        "；先执行完成，待结果出现后再补核验与记录",
        "；不设升级、停止或重新评估条件",
        "；同时补齐关键信息并设定复评点",
        "；核验矛盾证据，按风险排序并完成记录闭环",
        "；同时说明当前证据边界，明确升级/停止阈值、责任人、记录和复评时点",
    )
    raw_questions = []
    for path in (ROOT / "references" / "quizzes").glob("*.json"):
        raw_questions.extend(json.loads(path.read_text(encoding="utf-8")).get("questions", []))
    for question in raw_questions:
        audited += 1
        qid = question.get("question_id", "missing")
        options = question.get("options") or {}
        active = question.get("active", True)
        if active:
            active_count += 1
        if question.get("type") not in {"single_choice", "multiple_choice"}:
            failures.append(f"{qid}: type={question.get('type')}")
        if question.get("subquestions") or question.get("component_question_ids"):
            failures.append(f"{qid}: nested question structure is forbidden")
        if not str(question.get("stem", "")).strip():
            failures.append(f"{qid}: empty stem")
        if list(options) != list("ABCD") and list(options) != list("ABCDE"):
            failures.append(f"{qid}: must have four unique A-D options (or five A-E)")
        if len(set(options.values())) != len(options):
            failures.append(f"{qid}: option texts must be unique")
        answer = str(question.get("answer", "")).strip().upper()
        if not answer or any(letter not in options for letter in answer):
            failures.append(f"{qid}: invalid answer={question.get('answer')}")
        if question.get("type") == "single_choice" and len(set(answer)) != 1:
            failures.append(f"{qid}: single choice must have exactly one answer")
        if question.get("type") == "multiple_choice" and len(set(answer)) < 2:
            failures.append(f"{qid}: multiple choice must have at least two answers")
        if question.get("explanation_ref") not in cards:
            failures.append(f"{qid}: missing explanation card {question.get('explanation_ref')}")
        for letter, text in options.items():
            if any(suffix in str(text) for suffix in leak_suffixes):
                failures.append(f"{qid}: option {letter} contains answer-leaking suffix")

    for major in list_majors():
        levels = list_levels(major)
        # 严格整改后，题量不足5道的档位必须暂停，不复制低质量题补数。
        if not levels:
            continue
        for level in levels:
            # 组卷用 sample=False 拿该档全量题，验证每个档位都能成卷且批改确定性。
            paper = build_paper(major, level, sample=False)
            if len(paper) < 5:
                failures.append(f"{major}/{level}: questions={len(paper)} < 5")
            sampled = build_paper(major, level)
            if len(sampled) != 5:
                failures.append(f"{major}/{level}: sampled questions={len(sampled)}")
            answers = {q["question_id"]: q["answer"] for q in sampled}
            graded = check_pretest({"answers": answers}, major=major, level=level, question_ids=[q["question_id"] for q in sampled])
            if graded["score"] != graded["max_score"]:
                failures.append(f"{major}/{level}: grading mismatch")
            signatures[(major, level)] = {question["stem"] for question in paper}
        for left, right in zip(levels, levels[1:]):
            if signatures[(major, left)] & signatures[(major, right)]:
                failures.append(f"{major}: duplicate stems across {left}/{right}")

    bad_refs = [(q.get("question_id"), q.get("explanation_ref")) for q in raw_questions if q.get("explanation_ref") not in cards]
    if bad_refs:
        failures.append(f"stored question explanation refs invalid: {bad_refs[:10]}")
    if failures:
        raise AssertionError("\n".join(failures[:100]))
    print(f"[OK] question bank audit: {audited} stored / {active_count} active; single+multiple choice structures and explanations valid")


if __name__ == "__main__":
    main()
