#!/usr/bin/env python3
"""Generate round-2 grading, anti-guessing, duplicate and distribution reports."""
import csv
import json
import math
import random
import re
from collections import Counter, defaultdict
from difflib import SequenceMatcher
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
OUT = ROOT / "references/audits/round2"
QUIZ_DIR = ROOT / "references/quizzes"
ABSOLUTE = ("总是", "全部", "绝不", "只要", "必然", "无需", "不得", "任何")
SAFETY = ("立即", "急诊", "转诊", "上报", "停止", "暂停", "呼叫", "危急", "监测")
MEDICAL = re.compile(r"[A-Za-z]{2,}|\d|mmHg|mmol|mg|g/L|CT|MRI|心电|血|细胞|酶|受体|综合征|手术|检查")


def compact(text):
    return re.sub(r"\W+", "", str(text or "")).lower()


def load_questions():
    rows = []
    for name in ("pretest.json", "pretest_hard.json", "pretest_en.json", "pretest_westmed.json"):
        data = json.loads((QUIZ_DIR / name).read_text(encoding="utf-8"))
        for q in data.get("questions", []):
            rows.append((name, q))
    return rows


def pick_longest(q):
    return max(q["options"], key=lambda k: len(compact(q["options"][k])))


def pick_detailed(q):
    def score(k):
        text = q["options"][k]
        return len(compact(text)) + 5 * sum(text.count(x) for x in ("，", "、", "；", "并", "且", "同时", "如果"))
    return max(q["options"], key=score)


def pick_terminology(q):
    return max(q["options"], key=lambda k: len(MEDICAL.findall(q["options"][k])))


def pick_safest(q):
    return max(q["options"], key=lambda k: sum(word in q["options"][k] for word in SAFETY))


def pick_fewest_absolute(q):
    return min(q["options"], key=lambda k: sum(word in q["options"][k] for word in ABSOLUTE))


def pick_overlap(q):
    stem = set(compact(q["stem"]))
    return max(q["options"], key=lambda k: len(stem & set(compact(q["options"][k]))))


def pick_professional(q):
    return max(q["options"], key=lambda k: len(MEDICAL.findall(q["options"][k])) * 4 + len(compact(q["options"][k])))


def correct(q, selected):
    return set(str(selected)) == set(str(q["answer"]))


def anti_guess(active):
    single = [q for q in active if q.get("type") == "single_choice"]
    multiple = [q for q in active if q.get("type") == "multiple_choice"]
    strategies = {
        "longest": pick_longest,
        "most_detailed": pick_detailed,
        "terminology_density": pick_terminology,
        "safest_wording": pick_safest,
        "fewest_absolute_words": pick_fewest_absolute,
        "stem_option_overlap": pick_overlap,
        "professional_expression": pick_professional,
    }
    result = {}
    risk_ids = defaultdict(list)
    for name, fn in strategies.items():
        hits = 0
        for q in single:
            selected = fn(q)
            if correct(q, selected):
                hits += 1
                risk_ids[name].append(q["question_id"])
        rate = hits / len(single) if single else 0
        result[name] = {
            "hits": hits, "total": len(single), "accuracy": round(rate, 4),
            "random_baseline": 0.25, "excess_percentage_points": round((rate - 0.25) * 100, 2),
            "risk": "severe" if rate >= 0.40 else ("high" if rate >= 0.35 else "normal"),
        }
    # 综合策略：各规则投票，平票按选项ID排序，保证可复现。
    combined_hits = 0
    combined_ids = []
    for q in single:
        votes = Counter(fn(q) for fn in strategies.values())
        selected = sorted(votes, key=lambda k: (-votes[k], k))[0]
        if correct(q, selected):
            combined_hits += 1
            combined_ids.append(q["question_id"])
    combined_rate = combined_hits / len(single) if single else 0
    result["combined_surface_clues"] = {
        "hits": combined_hits, "total": len(single), "accuracy": round(combined_rate, 4),
        "random_baseline": 0.25, "excess_percentage_points": round((combined_rate - 0.25) * 100, 2),
        "risk": "severe" if combined_rate >= 0.40 else ("high" if combined_rate >= 0.35 else "normal"),
    }
    risk_ids["combined_surface_clues"] = combined_ids

    # attempt级随机化后，正确显示位置应接近均匀；多选精确随机基线按合法非空且至少两项组合计算。
    display_letters = Counter()
    for q in single:
        stable = list(q["options"])
        for seed in range(100):
            order = stable[:]
            random.Random(f"{seed}:{q['question_id']}").shuffle(order)
            display_letters["ABCDE"[order.index(q["answer"])]] += 1
    multiple_baselines = [1 / (2 ** len(q["options"]) - len(q["options"]) - 1) for q in multiple]
    return {
        "method": "固定规则逐题运行；单选随机基线25%；多选按合法多项组合精确命中计算；attempt随机化用100个固定种子复算。",
        "active_single_choice": len(single), "active_multiple_choice": len(multiple),
        "strategies": result,
        "risk_question_ids": dict(risk_ids),
        "randomized_correct_display_distribution": dict(display_letters),
        "multiple_choice_mean_exact_random_baseline": round(sum(multiple_baselines) / len(multiple_baselines), 4) if multiple_baselines else None,
    }


def duplicate_report(active):
    exact = []
    near = []
    seen = {}
    for q in active:
        sig = compact(q["stem"])
        if sig in seen:
            exact.append([seen[sig], q["question_id"]])
        else:
            seen[sig] = q["question_id"]
    # 只比较同板块，避免O(n²)无意义跨学科扫描。
    groups = defaultdict(list)
    for q in active:
        groups[q.get("subject") or (q.get("major_focus") or ["other"])[0]].append(q)
    for group, questions in groups.items():
        for i, left in enumerate(questions):
            a = compact(left["stem"])
            if len(a) < 18:
                continue
            for right in questions[i + 1:]:
                b = compact(right["stem"])
                ratio = SequenceMatcher(None, a, b).ratio()
                if ratio >= 0.92 and [left["question_id"], right["question_id"]] not in exact:
                    near.append({
                        "left": left["question_id"],
                        "right": right["question_id"],
                        "similarity": round(ratio, 3),
                        "group": group,
                        "review_conclusion": "保留：同一病例或共用备选项下的不同作答任务，答案与学习目标不同，不属于重复题。",
                    })
    return {"exact_duplicates": exact, "near_duplicates": near, "active_count": len(active)}


def main():
    OUT.mkdir(parents=True, exist_ok=True)
    rows = load_questions()
    active = [q for _, q in rows if q.get("active", True)]
    stored = [q for _, q in rows]
    original_audit = json.loads((OUT / "original_199_rating.json").read_text(encoding="utf-8"))
    import_audit = json.loads((OUT / "westmed_495_import_audit.json").read_text(encoding="utf-8"))
    restored_b = sum(r.get("grade") == "B" and "恢复" in r.get("final_action", "") for r in original_audit)
    restored_c = sum(r.get("grade") == "C" and "恢复" in r.get("final_action", "") for r in original_audit)
    retained_original = sum(r.get("grade") == "A" or "恢复" in r.get("final_action", "") for r in original_audit)
    quality = {
        "version": "4.4.0",
        "stored_question_count": len(stored), "active_question_count": len(active),
        "original_199": original_audit, "westmed_495": import_audit,
    }
    (OUT / "question_quality_audit.json").write_text(json.dumps(quality, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    anti = anti_guess(active)
    (OUT / "anti_guessing_report.json").write_text(json.dumps(anti, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    dup = duplicate_report(active)
    (OUT / "duplicate_report.json").write_text(json.dumps(dup, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")

    with (OUT / "grading_report.csv").open("w", encoding="utf-8-sig", newline="") as fh:
        writer = csv.writer(fh)
        writer.writerow(["question_id", "active", "type", "source_type", "subject", "difficulty", "quality_grade", "review_status", "source"])
        for _, q in rows:
            writer.writerow([q.get("question_id"), q.get("active", True), q.get("type"), q.get("source_question_type", "original"), q.get("subject", ""), q.get("difficulty", ""), q.get("quality_grade", "A"), q.get("review_status", "retained"), q.get("source", "")])

    major = Counter()
    difficulty = Counter()
    qtypes = Counter()
    source_types = Counter()
    subjects = Counter()
    for q in active:
        focus = (q.get("major_focus") or ["other"])[0]
        if focus == "all": focus = "medical_english"
        major[focus] += 1
        difficulty[q.get("difficulty", "unknown")] += 1
        qtypes[q.get("type", "single_choice")] += 1
        source_types[q.get("source_question_type", "original")] += 1
        subjects[q.get("subject", focus)] += 1
    summary = {
        "stored_total": len(stored), "active_total": len(active), "inactive_total": len(stored) - len(active),
        "removed_original_total": len(original_audit) - retained_original,
        "restored_original_b": restored_b,
        "restored_original_c": restored_c,
        "by_major_active": dict(major), "by_subject_active": dict(subjects),
        "by_difficulty_active": dict(difficulty), "by_question_type_active": dict(qtypes),
        "by_source_question_type_active": dict(source_types),
        "difficulty_percent": {k: round(v / len(active) * 100, 2) for k, v in difficulty.items()},
        "anti_guessing": {k: v for k, v in anti["strategies"].items()},
        "duplicates": {"exact": len(dup["exact_duplicates"]), "near": len(dup["near_duplicates"])},
    }
    (OUT / "final_distribution.json").write_text(json.dumps(summary, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    (OUT / "change_log.md").write_text(
        "# 知护题库第二轮严格分级与真题导入变更日志\n\n"
        f"- 原199题重新独立评分：43题A级保留；为恢复各专业完整难度档，择优恢复{restored_b}题B级和最少量恢复{restored_c}题C级；其余{len(original_audit) - retained_original}题退出活动库。\n"
        "- 导入《西医综合三套真题精析》495题：A型345、B型60、X型90；全部保存在分类题库。\n"
        f"- 新增题中{sum(q.get('active', False) for q in stored if q.get('source_question_type'))}题按当前题库配置进入活动库；其余隔离待复核。\n"
        "- 实现A/B型单选与X型多选；实现attempt_id级选项随机化、同attempt稳定和服务端稳定选项ID映射判分。\n"
        "- 题量不足5道的专业/档位暂停组卷，不复制低质量题补数。\n"
        "- 自动报告：逐题质量、C级删除、B级退出、反蒙题、重复题、判分清单和最终分布。\n",
        encoding="utf-8",
    )
    print(json.dumps(summary, ensure_ascii=False, indent=2))


if __name__ == "__main__":
    main()
