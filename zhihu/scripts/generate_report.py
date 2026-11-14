#!/usr/bin/env python3
"""把评分结果组织为证据化报告；可输出 JSON 或独立 HTML。"""
import argparse, html, json
from functools import lru_cache
from pathlib import Path

ROOT=Path(__file__).resolve().parent.parent
CARDS=ROOT/"references"/"knowledge"/"knowledge_cards.json"
CASES=ROOT/"references"/"cases"/"cases.json"
CARD_DIR=ROOT/"references"/"knowledge"
CASE_DIR=ROOT/"references"/"cases"
TEMPLATE=ROOT/"assets"/"report.html"

@lru_cache(maxsize=1)
def _catalogs():
    """Load immutable report lookup data once per MCP process."""
    card_rows=list(json.loads(CARDS.read_text(encoding="utf-8"))["cards"])
    case_rows=list(json.loads(CASES.read_text(encoding="utf-8"))["cases"])
    for extra in sorted(CARD_DIR.glob("*_cards.json")):
        if extra.resolve()!=CARDS.resolve(): card_rows.extend(json.loads(extra.read_text(encoding="utf-8"))["cards"])
    for extra in sorted(CASE_DIR.glob("*_cases.json")):
        if extra.resolve()!=CASES.resolve(): case_rows.extend(json.loads(extra.read_text(encoding="utf-8"))["cases"])
    return ({c["knowledge_id"]:c for c in card_rows}, {c["case_id"]:c for c in case_rows})

@lru_cache(maxsize=4)
def _template_text(template_path):
    return Path(template_path).read_text(encoding="utf-8")

def generate_report(score_result):
    cards,cases=_catalogs()
    case=cases.get(score_result.get("case_id"),{})
    items=score_result.get("item_results",[])
    weaknesses=sorted([x for x in items if x["score"] < x["max_score"]],key=lambda x:(x["score"]/x["max_score"] if x["max_score"] else 0,x["item_id"]))[:3]
    key_quotes=[]
    for item in items:
        for e in item.get("evidence",[]):
            if len(key_quotes)<5: key_quotes.append({"turn_id":e["turn_id"],"quote":e["quote"],"item_id":item["item_id"]})
    refs=[cards[r] for r in score_result.get("knowledge_refs",[]) if r in cards]
    variant=next((c for c in cases.values() if c.get("variant_of")==score_result.get("case_id")),None)
    return {"status":"ok","report_version":"1.0","overview":{"session_id":score_result.get("session_id"),"case_id":score_result.get("case_id"),"case_title":case.get("title"),"rubric_version":score_result.get("rubric_version"),"rubric_status":score_result.get("rubric_status"),"purpose":"课程学习与能力训练"},"pretest":score_result.get("pretest_result"),"practice":{"total_score":score_result.get("total_score"),"dimension_scores":score_result.get("dimension_scores",{}),"item_results":items,"calculation_note":score_result.get("calculation_note")},"key_quotes":key_quotes,"priority_gaps":[{"item_id":x["item_id"],"behavior":x["behavior"],"level":x["level"],"knowledge_ref":x["knowledge_ref"],"next_step":f"复习 {x['knowledge_ref']} 并在变式病例中再次完成该行为"} for x in weaknesses],"knowledge_links":refs,"red_lines":score_result.get("red_lines",[]),"caps":score_result.get("caps",[]),"uncertain_items":score_result.get("uncertain_items",[]),"retrain":None if not variant else {"case_id":variant["case_id"],"title":variant["title"],"task":variant["task"]},"safety_notice":"本反馈仅用于课程学习与能力训练，不构成对任何真实个体或病例的医疗建议；评分不代表临床能力认定。"}

def render_html(report, template_path=TEMPLATE):
    template=_template_text(str(Path(template_path).resolve()))
    safe_json=json.dumps(report,ensure_ascii=False).replace("</","<\\/")
    return template.replace("/*__REPORT_DATA__*/",f"window.__REPORT__ = {safe_json};")

def main():
    p=argparse.ArgumentParser(); p.add_argument("--score",required=True); p.add_argument("--output"); p.add_argument("--format",choices=["json","html"],default="json"); a=p.parse_args()
    report=generate_report(json.loads(Path(a.score).read_text(encoding="utf-8-sig")))
    content=json.dumps(report,ensure_ascii=False,indent=2) if a.format=="json" else render_html(report)
    if a.output: Path(a.output).write_text(content,encoding="utf-8")
    else: print(content)
if __name__ == "__main__": main()
