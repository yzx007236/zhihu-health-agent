#!/usr/bin/env python3
"""编译知护数据资产 → 前端可内嵌的 data.js

把连接器 skills/zhihu/references 下的知识卡、病例、题库、评分规则、启动口令
合并为单一 data.js（window.ZHIHU_DATA），供单文件前端直接使用。
与 Python 确定性引擎同源，保证评分/批改结果一致。
"""
import json
import re
from pathlib import Path

CONNECTOR = Path(__file__).resolve().parent.parent / "workbuddy-agent" / "zhihu-agent" / "connector"
ROOT = CONNECTOR / "skills" / "zhihu" / "references"
OUT = Path(__file__).resolve().parent / "data.js"

def load(p):
    return json.loads(Path(p).read_text(encoding="utf-8"))

def merge_cards():
    cards = []
    for f in sorted((ROOT / "knowledge").glob("*_cards.json")):
        store = load(f)
        cards.extend(store.get("cards", []))
    return cards

def merge_cases():
    cases = []
    for f in sorted((ROOT / "cases").glob("*_cases.json")):
        store = load(f)
        cases.extend(store.get("cases", []))
    # 给病例补齐默认字段（等价 get_training_case._load_cases）
    legacy_recommendations = {
        "C1": ["other"], "C1-V1": ["other"],
        "C2": ["nursing", "rehabilitation"], "C2-V1": ["nursing", "rehabilitation"],
        "C3": ["clinical_medicine", "rehabilitation", "health_management"],
        "C3-V1": ["clinical_medicine", "rehabilitation", "health_management"],
        "C4": ["clinical_medicine"], "C4-V1": ["clinical_medicine"],
        "C5": ["nursing", "health_management"], "C5-V1": ["nursing", "health_management"],
    }
    for c in cases:
        c.setdefault("disease_id", "hypertension")
        c.setdefault("disease_label", "高血压")
        c.setdefault("recommended_majors", legacy_recommendations.get(c["case_id"], ["other"]))
    return cases

def is_imported_card(card):
    """题库批量导入的卡片：标题是题干碎片（如「错误的是」），claim 是答案解析。

    这类卡片保留在原始资产里供审计，但不进入讲解页——宁可提示"未收录"，
    也不给学生看一张标题读不通的"知识卡"。
    """
    blob = str(card.get("source", "")) + str(card.get("version", ""))
    return "题库导入" in blob or str(card.get("title", "")).endswith("…")


def build_node_map(cards, questions):
    """把"题目考点 node_id"映射到"知识卡 knowledge_id"。

    题库每道题带 explanation_ref（指向知识卡），但知识卡的 node_id 多为专业级
    主题节点，与题目的细粒度考点不是同一套命名；直接用 node_id 过滤会查空。
    因此以题目为桥，建立 node_id -> [knowledge_id] 的索引。
    """
    known = {c.get("knowledge_id"): c for c in cards}
    mapping = {}
    for q in questions:
        ref = q.get("explanation_ref")
        node = q.get("node_id")
        if not node or not ref or ref not in known:
            continue
        if is_imported_card(known[ref]):
            continue
        bucket = mapping.setdefault(node, [])
        if ref not in bucket:
            bucket.append(ref)
    return mapping


# ---------- 病例增强：⑩ 基本信息 / ⑪⑫ 结构化问诊与检查 / ⑬ 双标签 ----------

MAJOR_DEFAULT_SCENES = {
    # 临床医学默认「医院门诊/急诊」，其余专业保留社区与病房场景（⑧ 分专业设默认场景）
    "clinical_medicine": ["门诊", "急诊"],
    "nursing": ["社区", "家庭", "病房"],
    "rehabilitation": ["康复", "门诊", "社区"],
    "traditional_chinese_medicine": ["中医", "门诊", "社区"],
    "medical_technology": ["检验", "影像", "输血", "门诊"],
    "health_management": ["社区", "门诊"],
    "other": [],
}

SCENE_RULES = [
    ("急诊", ["急诊", "抢救"]),
    ("门诊", ["门诊", "诊室", "分诊", "首诊"]),
    ("病房", ["病房", "住院", "留观"]),
    ("康复", ["康复", "训练室"]),
    ("检验", ["检验", "配血", "微生物", "生化", "标本"]),
    ("影像", ["CT", "放射", "影像", "超声", "心电"]),
    ("中医", ["中医", "针灸", "拔罐", "艾灸", "四诊"]),
    ("家庭", ["家庭", "家中", "入户", "居家", "上门"]),
    ("社区", ["社区", "社区卫生服务中心", "社区卫生服务站", "健康管理", "随访", "接种"]),
]

SEX_RULES = [
    ("女", ["女士", "阿姨", "奶奶", "妈妈", "女儿", "姐", "妹"]),
    ("男", ["先生", "叔叔", "师傅", "爷爷", "伯伯", "大爷", "父亲", "儿子", "哥", "弟"]),
]


def scene_group(text):
    text = str(text or "")
    for name, keys in SCENE_RULES:
        if any(k in text for k in keys):
            return name
    return "其他"


def infer_sex(case):
    pp = case.get("public_profile") or {}
    if pp.get("sex"):
        return pp["sex"]
    name = str(pp.get("name") or "")
    for sex, keys in SEX_RULES:
        if any(k in name for k in keys):
            return sex
    if "母亲代诉" in name or "患儿" in name:
        return "男"
    return "未标注"


def infer_reliability(case):
    pp = case.get("public_profile") or {}
    if pp.get("reliability"):
        return pp["reliability"]
    setting = str(pp.get("setting") or "") + str(pp.get("name") or "")
    if "代诉" in setting or "家属陪同" in setting or "母亲抱" in setting:
        return "部分可靠（家属代诉/补充）"
    try:
        age = int(pp.get("age"))
    except (TypeError, ValueError):
        age = 0
    if age >= 80:
        return "部分可靠（高龄，记忆欠清需家属补充）"
    if age and age <= 12:
        return "部分可靠（患儿，由家属代述）"
    return "可靠（本人陈述）"


def synth_history(case):
    """没有手写病史陈述时，从既有公开数据合成一段，不新增无出处的临床事实。"""
    parts = []
    for row in (case.get("clinical_data") or [])[:2]:
        item = str(row.get("item") or "").strip()
        value = str(row.get("value") or "").strip()
        if value:
            parts.append(f"{item}：{value}" if item else value)
    concern = str((case.get("persona") or {}).get("concern") or "").strip()
    if concern:
        parts.append(f"最关心的是{concern.rstrip('。')}")
    return "；".join(parts) + ("。" if parts else "")


EMPTY_HISTORY = {
    "chief_complaint": "暂无（本病例未单列，可在对话中追问）",
    "present_illness": "暂无（本病例未单列，可在对话中追问）",
    "past_history": "暂无（本病例未单列，可在对话中追问）",
    "review_of_systems": {
        "呼吸系统": "暂无", "循环系统": "暂无", "消化系统": "暂无", "泌尿系统": "暂无",
        "造血系统": "暂无", "内分泌代谢": "暂无", "神经精神": "暂无", "肌肉骨骼": "暂无",
    },
    "personal_history": "暂无（本病例未单列，可在对话中追问）",
    "marital_history": "暂无（本病例未单列，可在对话中追问）",
    "family_history": "暂无（本病例未单列，可在对话中追问）",
}


def synth_structured(case):
    """旧病例没有结构化问诊数据时，给出最小可用结构：主诉/现病史取自公开表，其余标暂无。"""
    hist = json.loads(json.dumps(EMPTY_HISTORY, ensure_ascii=False))
    rows = case.get("clinical_data") or []
    if rows:
        hist["chief_complaint"] = str(rows[0].get("value") or "暂无")
        hist["present_illness"] = "；".join(
            f"{r.get('item')}：{r.get('value')}" for r in rows if r.get("value")
        ) or "暂无"
    exam = []
    for r in rows[1:]:
        exam.append({"item": str(r.get("item") or "一般情况"), "finding": str(r.get("value") or "暂无"), "normal": False})
    return {
        "history": hist,
        "exam": exam,
        "special_exam": [{"item": "专科检查", "finding": "暂无（本病例未单列）"}],
        "labs": [{"item": "辅助检查", "finding": "暂无（本病例未单列，可在对话中追问）", "available": False}],
        "authored": False,
    }


def infer_case_type(case):
    if case.get("case_type"):
        return case["case_type"]
    setting = str((case.get("public_profile") or {}).get("setting") or "")
    if "急诊" in setting or "抢救" in setting or "留观" in setting:
        return "急症"
    if "转诊" in setting or "转介" in setting:
        return "转诊"
    if "随访" in setting or "复诊" in setting or "第 " in setting or "首次" in setting and "咨询" in setting:
        return "复诊"
    return "初诊"


def enrich_cases(cases):
    for c in cases:
        pp = c.setdefault("public_profile", {})
        pp.setdefault("sex", infer_sex(c))
        pp.setdefault("reliability", infer_reliability(c))
        if not pp.get("history_statement"):
            pp["history_statement"] = synth_history(c)
            pp.setdefault("history_source", "derived")
        else:
            pp.setdefault("history_source", "authored")
        c.setdefault("case_type", infer_case_type(c))
        c.setdefault("disease_pattern", c.get("disease_label") or "未分型")
        c.setdefault("scene_group", scene_group(pp.get("setting")))
        if not c.get("structured"):
            c["structured"] = synth_structured(c)
    return cases


def merge_quizzes():
    """合并基础题库、进阶题库与英语题库。

    历史原因：pretest.json 只有 basic / intermediate 两档，pretest_hard.json
    有 advanced / expert 两档（各专业各 5 题），但构建脚本只读了前一个文件，
    所以网页上"困难 / 专家"两个按钮一直是假的（静默回落成基础题）。
    """
    files = [
        ROOT / "quizzes" / "pretest.json",
        ROOT / "quizzes" / "pretest_hard.json",
        ROOT / "quizzes" / "pretest_en.json",
        ROOT / "quizzes" / "pretest_westmed.json",
    ]
    sources = [load(p) for p in files if p.exists()]
    basic = sources[0]

    questions = []
    seen = set()
    for src in sources:
        for q in src.get("questions", []):
            qid = q.get("question_id")
            if qid in seen:
                continue
            seen.add(qid)
            questions.append(q)

    order = ["basic", "intermediate", "advanced", "expert", "english"]
    papers = {}
    for src in sources:
        for major, layers in (src.get("major_papers") or {}).items():
            bucket = papers.setdefault(major, {})
            if isinstance(layers, dict):
                for k, v in layers.items():
                    current = bucket.setdefault(k, [])
                    for qid in v:
                        if qid not in current:
                            current.append(qid)
            else:
                bucket.setdefault("basic", list(layers))
    papers = {m: {k: papers[m][k] for k in order if k in papers[m]} for m in papers}

    merged = dict(basic)
    merged["quiz_id"] = str(basic.get("quiz_id", "zhihu-pretest")) + "+hard+en+westmed"
    merged["questions"] = questions
    merged["major_papers"] = papers
    return merged


def main():
    knowledge = load(ROOT / "knowledge" / "knowledge_cards.json")
    pretest = merge_quizzes()
    rubric = load(ROOT / "rubric.json")
    startup = load(ROOT / "startup.json")

    cards = merge_cards()
    for card in cards:
        card["card_kind"] = "bank_import" if is_imported_card(card) else "curated"
    node_map = build_node_map(cards, pretest.get("questions", []))
    cases = enrich_cases(merge_cases())

    data = {
        "knowledge": {
            "fallback": knowledge.get("fallback"),
            "content_status": knowledge.get("content_status"),
            "cards": cards,
            "node_map": node_map,
        },
        "cases": cases,
        "pretest": pretest,
        "rubric": rubric,
        "startup": startup,
        "scene_defaults": MAJOR_DEFAULT_SCENES,
        "clinical_objectives": load(CONNECTOR / "server" / "zhihu_mcp" / "clinical_question_objectives.json"),
    }

    js = (
        "// 知护数据资产（自动生成，勿手改）\n"
        "// 来源：zhihu/references（与 Python 确定性引擎同源）\n"
        "window.ZHIHU_DATA = " + json.dumps(data, ensure_ascii=False, indent=0) + ";\n"
    )
    OUT.write_text(js, encoding="utf-8")
    authored = sum(1 for c in cases if (c.get("structured") or {}).get("authored"))
    imported = sum(1 for c in cards if c.get("card_kind") == "bank_import")
    print(f"[OK] 生成 {OUT}")
    print(f"    知识卡 {len(cards)} 张（其中题库导入 {imported} 张）")
    print(f"    病例 {len(cases)} 例（结构化问诊 {authored} 例）")
    print(f"    自测题 {len(pretest.get('questions', []))} 题 / {len(pretest.get('major_papers', {}))} 套卷")
    print(f"    评分项 {len(rubric.get('items', []))} 项 / 红线 {len(rubric.get('red_lines', []))} 条")
    print(f"    启动口令 {len(startup.get('trigger_words', []))} 个")

if __name__ == "__main__":
    main()
