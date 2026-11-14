#!/usr/bin/env python3
"""读取合成病例，默认隐藏训练答案。"""
import argparse, json
from copy import deepcopy
from pathlib import Path
ROOT=Path(__file__).resolve().parent.parent
DEFAULT_STORE=ROOT/"references"/"cases"/"cases.json"
CASE_DIR=ROOT/"references"/"cases"

def _load_cases(store_path=DEFAULT_STORE):
    cases=list(json.loads(Path(store_path).read_text(encoding="utf-8"))["cases"])
    if Path(store_path).resolve()==DEFAULT_STORE.resolve():
        for extra in sorted(CASE_DIR.glob("*_cases.json")):
            if extra.resolve()!=DEFAULT_STORE.resolve():
                cases.extend(json.loads(extra.read_text(encoding="utf-8"))["cases"])
    legacy_recommendations={
        "C1": ["other"], "C1-V1": ["other"],
        "C2": ["nursing", "rehabilitation"], "C2-V1": ["nursing", "rehabilitation"],
        "C3": ["clinical_medicine", "rehabilitation", "health_management"], "C3-V1": ["clinical_medicine", "rehabilitation", "health_management"],
        "C4": ["clinical_medicine"], "C4-V1": ["clinical_medicine"],
        "C5": ["nursing", "health_management"], "C5-V1": ["nursing", "health_management"],
    }
    legacy_focus={
        "clinical_medicine": "侧重病史采集、危险信号、证据限制和转介决策",
        "nursing": "侧重规范操作、健康教育、依从性和理解确认",
        "rehabilitation": "侧重活动前后安全、停止信号和功能沟通",
        "health_management": "侧重连续记录、随访计划和资源协调",
        "other": "侧重通用安全沟通和可执行下一步",
    }
    for case in cases:
        case.setdefault("disease_id", "hypertension")
        case.setdefault("disease_label", "高血压")
        case.setdefault("recommended_majors", legacy_recommendations.get(case["case_id"], ["other"]))
        case.setdefault("professional_focus", legacy_focus)
    return cases

def get_training_case(case_id=None, include_private=False, store_path=DEFAULT_STORE, major=None, disease_id=None):
    cases=_load_cases(store_path)
    if not case_id:
        filtered=[c for c in cases if not disease_id or c["disease_id"]==disease_id]
        if major and major != "other":
            prefix={"clinical_medicine":"CL","medical_technology":"MT","nursing":"NU","traditional_chinese_medicine":"TCM"}.get(major,"")
            filtered=sorted(filtered,key=lambda c:(major not in c.get("recommended_majors",[]),not bool(prefix and c["case_id"].startswith(prefix)),c.get("variant_of") is not None,c["case_id"]))
        return {"status":"ok","cases":[{"case_id":c["case_id"],"title":c["title"],"variant_of":c["variant_of"],"disease_id":c["disease_id"],"disease_label":c["disease_label"],"recommended":bool(major and major in c.get("recommended_majors",[])),"recommended_majors":c.get("recommended_majors",[]),"professional_focus":c.get("professional_focus",{}).get(major)} for c in filtered],"synthetic_data":True,"major":major,"disease_id":disease_id}
    match=next((c for c in cases if c["case_id"]==case_id),None)
    if not match: return {"status":"not_found","case_id":case_id}
    case=deepcopy(match)
    if not include_private:
        # 学生可见仅公开资料：去掉隐藏信息、释放条件、边界行为，
        # 以及内部人设、必覆盖点、初始状态等评分映射。
        for key in ("hidden_info","release_conditions","boundary_behaviors","persona","must_cover","initial_state","variant_of"): case.pop(key,None)
    return {"status":"ok","synthetic_data":True,"case":case}

def main():
    p=argparse.ArgumentParser(); p.add_argument("--case-id"); p.add_argument("--include-private",action="store_true"); a=p.parse_args()
    print(json.dumps(get_training_case(a.case_id,a.include_private),ensure_ascii=False,indent=2))
if __name__ == "__main__": main()
