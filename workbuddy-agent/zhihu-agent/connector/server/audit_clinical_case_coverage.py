#!/usr/bin/env python3
"""Audit explicit full-case links for the actual clinical-medicine papers.

This is an inventory, not a clinical quality review. Only explicitly labelled
full-case links to bundled cases count; topic matches and question-derived
exercise templates do not. Run locally; it does not alter runtime data.
"""
import csv
import json
import sys
from collections import defaultdict
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(ROOT / "skills" / "zhihu" / "scripts"))
from check_pretest import build_paper, list_levels  # noqa: E402
from zhihu_mcp import objectives, tools  # noqa: E402

CASES = ROOT / "skills" / "zhihu" / "references" / "cases" / "professional_cases.json"
LINKS = Path(__file__).parent / "zhihu_mcp" / "case_recommendation_topics.json"
OUTPUT = Path(__file__).parent / "clinical_case_coverage.csv"


def main():
    cases = {c["case_id"]: c for c in json.loads(CASES.read_text(encoding="utf-8"))["cases"]}
    links = json.loads(LINKS.read_text(encoding="utf-8"))["question_case_links"]
    by_question = defaultdict(dict)
    for link in links:
        case = cases.get(link.get("case_id"))
        label = link.get("label", "")
        if case and ("完整病例" in label or label.startswith(("完整教学病例", "完整教学情境"))):
            by_question[link["question_id"]][case["case_id"]] = case
    questions = {}
    for level in list_levels("clinical_medicine"):
        for q in build_paper("clinical_medicine", level, sample=False):
            entry = questions.setdefault(q["question_id"], {"question": q, "levels": []})
            entry["levels"].append(level)
    # Resource readiness is stronger than a link inventory, but is still not a
    # medical review. A topic label alone cannot satisfy this check.
    runtime = tools._case_pool('clinical_medicine')
    ready_cases, problems = set(), []
    fields = ["question_id", "levels", "subject", "node_id", "stem", "case_ids", "case_titles", "linked_count", "missing_to_one", "missing_to_three", "review_status",
              "exam_point", "training_task", "bound_case_id", "bound_case_title", "objective_status", "input_items", "hidden_input_ids", "resource_check", "resource_issues"]
    with OUTPUT.open("w", encoding="utf-8-sig", newline="") as out:
        writer = csv.DictWriter(out, fieldnames=fields)
        writer.writeheader()
        for qid, entry in questions.items():
            q = entry["question"]
            matched = by_question[qid]
            row, status = objectives.lookup(q)
            cid = row['case_ids'][0] if row else ''
            case = cases.get(cid, {})
            issues = []
            if status != 'ready':
                issues.append('specific_objective_' + status)
            if not case or cid not in runtime or case.get('case_kind') == 'question_derived':
                issues.append('no_full_runtime_case')
            if cid not in matched:
                issues.append('no_explicit_full_case_link')
            for key in ('clinical_data', 'hidden_info', 'release_conditions', 'persona', 'task', 'must_cover'):
                if not case.get(key):
                    issues.append('missing_' + key)
            for hidden in case.get('hidden_info', []):
                if not case.get('release_conditions', {}).get(hidden.get('id')):
                    issues.append('missing_release_' + str(hidden.get('id')))
            if row and '待' not in row['review_status']:
                issues.append('missing_pending_review_status')
            if issues:
                problems.append((qid, issues))
            else:
                ready_cases.add(cid)
            writer.writerow({"question_id": qid, "levels": ",".join(entry["levels"]),
                "subject": q.get("subject", ""), "node_id": q.get("node_id", ""),
                "stem": q.get("stem", ""), "case_ids": ",".join(matched),
                "case_titles": " | ".join(c.get("title", "") for c in matched.values()),
                "linked_count": len(matched), "missing_to_one": max(0, 1 - len(matched)), "missing_to_three": max(0, 3 - len(matched)),
                "review_status": (row or {}).get('review_status', '待编制和关联'),
                'exam_point': (row or {}).get('exam_point', ''), 'training_task': (row or {}).get('training_task', ''),
                'bound_case_id': cid, 'bound_case_title': case.get('title', ''), 'objective_status': status,
                'input_items': ' | '.join(r.get('item', '') for r in case.get('clinical_data', [])),
                'hidden_input_ids': ','.join(h.get('id', '') for h in case.get('hidden_info', [])),
                'resource_check': 'ready_pending_teacher_review' if not issues else 'incomplete',
                'resource_issues': ','.join(issues)})
    counts = [len(by_question[qid]) for qid in questions]
    print(f"题目 {len(counts)}；至少1个明确完整病例关联 {sum(n >= 1 for n in counts)}；尚无此类关联 {sum(n == 0 for n in counts)}；其中至少3个 {sum(n >= 3 for n in counts)}。")
    print(f"清单：{OUTPUT}")
    print(f"具体考点、专项任务、实际完整病例及分阶段材料资源检查：{len(questions) - len(problems)}/{len(questions)}；缺项 {len(problems)}；专项绑定的不同病例 {len(ready_cases)}。")
    print("同病例可服务多道不同考点题。资源检查不等于医学质量审核；题库原题推演不计作完整病例。")
    if problems:
        for qid, issues in problems:
            print(qid, ','.join(issues))
        raise SystemExit(1)


if __name__ == "__main__":
    main()
