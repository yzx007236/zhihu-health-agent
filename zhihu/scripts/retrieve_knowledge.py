#!/usr/bin/env python3
"""按节点或编号检索知识卡。"""
import argparse, json
from pathlib import Path
ROOT=Path(__file__).resolve().parent.parent
DEFAULT_STORE=ROOT/"references"/"knowledge"/"knowledge_cards.json"
KNOWLEDGE_DIR=ROOT/"references"/"knowledge"
PROFESSIONAL_MAP=ROOT/"references"/"professional_knowledge_map.json"

def retrieve_knowledge(node_id=None, knowledge_id=None, major_id=None, course_id=None, store_path=DEFAULT_STORE):
    store=json.loads(Path(store_path).read_text(encoding="utf-8")); cards=list(store["cards"])
    if Path(store_path).resolve()==DEFAULT_STORE.resolve():
        for extra in sorted(KNOWLEDGE_DIR.glob("*_cards.json")):
            if extra.resolve()!=DEFAULT_STORE.resolve():
                cards.extend(json.loads(extra.read_text(encoding="utf-8"))["cards"])
    if node_id: cards=[c for c in cards if c["node_id"]==node_id]
    if knowledge_id: cards=[c for c in cards if c["knowledge_id"]==knowledge_id]
    if major_id: cards=[c for c in cards if c.get("node_id")==major_id or str(c.get("scope","")).startswith(major_id+"·")]
    course=None
    if course_id:
        mapping=json.loads(PROFESSIONAL_MAP.read_text(encoding="utf-8"))
        course=next((course for major in mapping["majors"] for course in major.get("courses",[]) if course["course_id"]==course_id and (not major_id or major["major_id"]==major_id)),None)
        if course:
            terms=course.get("scope_terms",[])
            cards=[c for c in cards if any(term in " ".join(str(c.get(key,"")) for key in ("scope","title","claim","node_slug","topic_slug")) for term in terms)]
        else: cards=[]
    return {"status":"ok" if cards else "not_found","node_id":node_id,"knowledge_id":knowledge_id,"major_id":major_id,"course_id":course_id,"course":course,"knowledge_cards":cards,"fallback":None if cards else store["fallback"],"content_status":store["content_status"]}

def main():
    p=argparse.ArgumentParser(); p.add_argument("--node-id"); p.add_argument("--knowledge-id"); p.add_argument("--major-id"); p.add_argument("--course-id"); a=p.parse_args()
    print(json.dumps(retrieve_knowledge(a.node_id,a.knowledge_id,a.major_id,a.course_id),ensure_ascii=False,indent=2))
if __name__ == "__main__": main()
