"""Inventory synthetic clinical cases; candidates are NOT clinical coverage.

No network, no session writes, no raw patient facts in the report. Compare the
old visible context with new public context, and optionally all viewed results.
"""
import hashlib
import json
from collections import Counter
from pathlib import Path
import sys
from unittest.mock import patch

ROOT = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(ROOT / 'workbuddy-agent/zhihu-agent/connector/server'))
from zhihu_mcp import experience as ex, tools


def inventory():
    old_path = ROOT / 'output/知护题库关联经验库_v3.0/知护题库关联经验库_v3.0.json'
    raw = old_path.read_bytes()
    old_data = json.loads(raw)
    old_rules = json.loads((ROOT / 'backups/before-experience-expansion-20261114-191621/workbuddy-agent/zhihu-agent/connector/server/zhihu_mcp/experience_rules.json').read_text(encoding='utf8'))
    old = (old_data, old_rules, hashlib.sha256(raw).hexdigest(), 'historical-rules')
    new = ex._load()
    pool = {cid: row for cid, row in tools._case_pool('clinical_medicine').items() if row.get('case_kind') != 'question_derived'}
    rows = []
    for cid, row in pool.items():
        case = tools._case_for_session({'case_id': cid}, ROOT)
        public = tools._public_case_view(case)
        profile = public.get('public_profile') or {}
        old_parts = [f"{profile['age']}岁"] if isinstance(profile.get('age'), (int, float)) else []
        old_parts += [value for value in [profile.get('history_statement')] + [public.get(k) for k in ('chief_complaint', 'present_illness', 'known_history')] if isinstance(value, str)]
        structured = public.get('structured') or {}
        snapshot = {'case_id': cid, 'history': list((structured.get('history') or {}).keys()),
                    'ros': list(((structured.get('history') or {}).get('review_of_systems') or {}).keys()),
                    'exams': [e['item'] for e in structured.get('exam', [])],
                    'labs': [e['item'] for e in structured.get('labs', [])]}
        with patch.object(tools, '_case_for_session', return_value=case), patch.object(tools, 'read_dialogue', return_value=[]):
            visible = tools._experience_visible_context({'case_id': cid}, ROOT)
            collected = tools._experience_visible_context({'case_id': cid}, ROOT, snapshot)
        record = {'case_id': cid, 'topic': row.get('disease_label')}
        for name, context, resource in [('before', '；'.join(old_parts), old), ('new_cards_same_context', '；'.join(old_parts), new),
                                         ('old_cards_public_now', visible, old), ('public_now', visible, new), ('all_results_viewed', collected, new)]:
            with patch.object(ex, '_load', return_value=resource):
                result = ex.search(allow_cards=False, guidance_only=True, visible_context=context)
            record[name] = {'candidate_count': result.get('candidate_count', 0),
                'shown_nonexcluded_ids': [c['id'] for c in result['cards'] if c['applicability'] != 'not_applicable'],
                'shown_applicable_ids': [c['id'] for c in result['cards'] if c['applicability'] == 'applicable'],
                'outcome': result['outcome']}
        rows.append(record)
    summary = {}
    for name in ('before', 'new_cards_same_context', 'old_cards_public_now', 'public_now', 'all_results_viewed'):
        summary[name] = dict(with_candidates=sum(r[name]['candidate_count'] > 0 for r in rows),
            with_nonexcluded_shown_candidates=sum(bool(r[name]['shown_nonexcluded_ids']) for r in rows),
            with_applicable_shown=sum(bool(r[name]['shown_applicable_ids']) for r in rows),
            zero_candidates=sum(r[name]['candidate_count'] == 0 for r in rows))
    result = {'scope': '当前临床医学370个独立完整教学病例条目；不含原题推演；静态公开信息，不模拟患者对话',
        'meaning': '候选不等于适用或覆盖；all_results_viewed为假设学生已查看所有可用采集项，不代表真实完成记录',
        'comparison_method': '固定本轮检索引擎，以旧/新资源、规则及不同可见资料作离线重放；before并非旧版本完整运行回放，初始0候选不表示旧版在患者对话后也无候选',
        'case_count': len(rows), 'resource_sha256': new[2], 'summary': summary,
        'no_candidate_topics_public_now': dict(Counter(r['topic'] for r in rows if not r['public_now']['candidate_count'])), 'cases': rows}
    folder = ROOT / 'output/经验库接入验证'
    (folder / '经验库v3.1运行池候选盘点.json').write_text(json.dumps(result, ensure_ascii=False, indent=2), encoding='utf8')
    print(json.dumps({'case_count': len(rows), 'summary': summary}, ensure_ascii=False))


if __name__ == '__main__':
    inventory()
