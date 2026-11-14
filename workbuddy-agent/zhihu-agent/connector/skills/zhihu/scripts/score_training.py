#!/usr/bin/env python3
"""确定性实践评分器：证据抽取与最终算分严格分离。"""
import argparse, json
from collections import defaultdict
from pathlib import Path

ROOT=Path(__file__).resolve().parent.parent
DEFAULT_RUBRIC=ROOT/"references"/"rubric.json"

def _valid_evidence(raw, known_items):
    valid, uncertain = [], []
    for i, e in enumerate(raw or []):
        reason=None
        if e.get("item_id") not in known_items: reason="unknown_item_id"
        elif not isinstance(e.get("turn_id"),(str,int)): reason="missing_turn_id"
        elif not str(e.get("quote","")).strip(): reason="missing_quote"
        elif not isinstance(e.get("tags"),list) or not all(isinstance(t,str) for t in e["tags"]): reason="invalid_tags"
        elif e.get("confidence") is not None and not 0 <= float(e["confidence"]) <= 1: reason="invalid_confidence"
        if reason: uncertain.append({"index":i,"reason":reason,"candidate":e})
        else: valid.append({"item_id":e["item_id"],"turn_id":e["turn_id"],"quote":str(e["quote"]).strip(),"tags":sorted(set(e["tags"])),"confidence":e.get("confidence"),"source":e.get("source","evidence_extractor")})
    return valid, uncertain

def _matches(condition, tags):
    if not condition: return False
    if "all_tags" in condition and not set(condition["all_tags"]).issubset(tags): return False
    if "any_tags" in condition and not set(condition["any_tags"]).intersection(tags): return False
    if "min_distinct_tags" in condition:
        if len(tags.intersection(condition.get("allowed_tags",[]))) < condition["min_distinct_tags"]: return False
    return True

def score_training(session, rubric_path=DEFAULT_RUBRIC):
    rubric=json.loads(Path(rubric_path).read_text(encoding="utf-8"))
    requested=session.get("rubric_version",rubric["rubric_version"])
    if requested != rubric["rubric_version"]:
        return {"status":"error","error":"rubric_version_mismatch","requested":requested,"available":rubric["rubric_version"]}
    case_id=session.get("case_id")
    def _applies(item):
        """v1.1.0 起：scope 之外还支持 applies_to（按病例族/专业生效）。"""
        scope=item.get("scope") or []
        if "*" in scope or (case_id is not None and case_id in scope):
            return True
        ap=item.get("applies_to") or {}
        prefixes=ap.get("case_prefixes") or []
        if prefixes and case_id and any(str(case_id).startswith(p) for p in prefixes):
            return True
        majors=ap.get("majors") or []
        major=session.get("major")
        return bool(majors and major and major in majors)
    applicable=[x for x in rubric["items"] if _applies(x)]
    known={x["item_id"] for x in rubric["items"]}
    evidence, uncertain=_valid_evidence(session.get("evidence_candidates",[]),known)
    grouped=defaultdict(list)
    for e in evidence: grouped[e["item_id"]].append(e)
    item_results=[]
    for item in applicable:
        ev=sorted(grouped[item["item_id"]],key=lambda x:str(x["turn_id"]))
        tags=set(t for e in ev for t in e["tags"])
        level="full" if _matches(item.get("full"),tags) else "partial" if _matches(item.get("partial"),tags) else "zero"
        score=round(item["max_score"]*rubric["levels"][level],2)
        item_results.append({"item_id":item["item_id"],"dimension":item["dimension"],"level":level,"score":score,"max_score":item["max_score"],"behavior":item["behavior"],"evidence":ev,"knowledge_ref":item["knowledge_ref"]})
    all_tags=set(session.get("red_line_tags",[])) | {t for e in evidence for t in e["tags"]}
    triggered=[]
    for rule in rubric["red_lines"]:
        matched=sorted(all_tags.intersection(rule["tags"]))
        if matched: triggered.append({"red_line_id":rule["red_line_id"],"matched_tags":matched,"action":rule["action"],"cap_total":rule["cap_total"],"zero_items":rule.get("zero_items",[]),"knowledge_ref":rule["knowledge_ref"]})
    zero_items={i for r in triggered for i in r["zero_items"]}
    for result in item_results:
        if result["item_id"] in zero_items:
            result["score"], result["level"] = 0, "zero_red_line"
    dim=defaultdict(lambda:{"score":0,"max_score":0})
    for r in item_results:
        dim[r["dimension"]]["score"]+=r["score"]; dim[r["dimension"]]["max_score"]+=r["max_score"]
    dimension_scores={k:{**v,"percentage":round(v["score"]/v["max_score"]*100,2) if v["max_score"] else 0} for k,v in sorted(dim.items())}
    raw=sum(r["score"] for r in item_results); possible=sum(r["max_score"] for r in item_results)
    total=round(raw/possible*100,2) if possible else 0
    caps=[]
    for r in item_results:
        item=next(x for x in applicable if x["item_id"]==r["item_id"])
        cap=item.get("cap")
        if cap and r["level"].startswith("zero"):
            caps.append({"source":r["item_id"],"cap_total":cap["if_zero"],"reason":cap["reason"]})
    caps += [{"source":r["red_line_id"],"cap_total":r["cap_total"],"reason":r["action"]} for r in triggered]
    if caps: total=min(total,min(c["cap_total"] for c in caps))
    refs=sorted({r["knowledge_ref"] for r in item_results if r["knowledge_ref"]})
    return {"status":"ok","session_id":session.get("session_id"),"case_id":case_id,"rubric_version":rubric["rubric_version"],"rubric_status":rubric["status"],"item_results":item_results,"dimension_scores":dimension_scores,"raw_score":raw,"raw_max_score":possible,"total_score":total,"caps":caps,"red_lines":[{"red_line_id":r["red_line_id"],"matched_tags":r["matched_tags"],"action":r["action"],"cap_total":r["cap_total"],"knowledge_ref":r["knowledge_ref"]} for r in triggered],"evidence":evidence,"uncertain_items":uncertain,"knowledge_refs":refs,"pretest_result":session.get("pretest_result"),"calculation_note":"实践分按当前病例适用项归一化为 100；自测分不混入实践分。"}

def main():
    p=argparse.ArgumentParser(); p.add_argument("--session",required=True); p.add_argument("--rubric",default=str(DEFAULT_RUBRIC)); a=p.parse_args()
    data=json.loads(Path(a.session).read_text(encoding="utf-8")); print(json.dumps(score_training(data,a.rubric),ensure_ascii=False,indent=2))
if __name__ == "__main__": main()
