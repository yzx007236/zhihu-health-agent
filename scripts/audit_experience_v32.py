"""Controlled v3.1/v3.2 candidate comparison; neither is case coverage."""
import hashlib
import json
from collections import Counter
from pathlib import Path
import sys
from unittest.mock import patch

ROOT = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(ROOT / 'workbuddy-agent/zhihu-agent/connector/server'))
from zhihu_mcp import experience as ex, tools


def main():
    old_raw = (ROOT / 'output/知护题库关联经验库_v3.1/知护题库关联经验库_v3.1.json').read_bytes()
    old_rules = (ROOT / 'backups/before-experience-v32-20261114-200420/workbuddy-agent/zhihu-agent/connector/server/zhihu_mcp/experience_rules.json').read_bytes()
    old = (json.loads(old_raw), json.loads(old_rules), hashlib.sha256(old_raw).hexdigest(), hashlib.sha256(old_rules).hexdigest())
    new = ex._load()
    pool = {cid: row for cid, row in tools._case_pool('clinical_medicine').items() if row.get('case_kind') != 'question_derived'}
    rows = []
    for cid, row in pool.items():
        case = tools._case_for_session({'case_id': cid}, ROOT)
        public = tools._public_case_view(case)
        structured = public.get('structured') or {}
        snapshot = dict(case_id=cid, history=list((structured.get('history') or {}).keys()),
            ros=list(((structured.get('history') or {}).get('review_of_systems') or {}).keys()),
            exams=[e['item'] for e in structured.get('exam', [])], labs=[e['item'] for e in structured.get('labs', [])])
        with patch.object(tools, '_case_for_session', return_value=case), patch.object(tools, 'read_dialogue', return_value=[]):
            visible = tools._experience_visible_context({'case_id': cid}, ROOT)
            collected = tools._experience_visible_context({'case_id': cid}, ROOT, snapshot)
        record = dict(case_id=cid, topic=row.get('disease_label'))
        for version, resource in [('v31', old), ('v32', new)]:
            for context_name, context in [('public', visible), ('all_results_viewed', collected)]:
                with patch.object(ex, '_load', return_value=resource):
                    result = ex.search(allow_cards=False, guidance_only=True, visible_context=context)
                record[version + '_' + context_name] = dict(candidate_count=result.get('candidate_count', 0),
                    shown_nonexcluded_ids=[c['id'] for c in result['cards'] if c['applicability'] != 'not_applicable'],
                    shown_applicable_ids=[c['id'] for c in result['cards'] if c['applicability'] == 'applicable'])
        rows.append(record)
    summary = {}
    for name in ['v31_public', 'v32_public', 'v31_all_results_viewed', 'v32_all_results_viewed']:
        summary[name] = dict(with_candidates=sum(r[name]['candidate_count'] > 0 for r in rows),
            with_nonexcluded_shown_candidates=sum(bool(r[name]['shown_nonexcluded_ids']) for r in rows),
            with_applicable_shown=sum(bool(r[name]['shown_applicable_ids']) for r in rows),
            zero_candidates=sum(r[name]['candidate_count'] == 0 for r in rows))
    report = dict(scope='当前370个独立完整临床教学病例条目，不含1305项原题推演；无患者对话模拟',
        meaning='同一当前引擎固定公开上下文比较v3.1/v3.2资源与规则；检出候选不代表适用或覆盖。all_results_viewed是假设全部可用采集项已查看，不是学生实际记录。未用隐藏主题召回。',
        resources=dict(v31=old[2], v32=new[2]), case_count=len(rows), summary=summary,
        no_candidate_topics=dict(Counter(r['topic'] for r in rows if not r['v32_public']['candidate_count'])), cases=rows)
    (ROOT / 'output/经验库接入验证/经验库v3.2运行池候选盘点.json').write_text(json.dumps(report, ensure_ascii=False, indent=2), encoding='utf8')
    print(json.dumps(dict(case_count=len(rows), summary=summary), ensure_ascii=False))


if __name__ == '__main__':
    main()
