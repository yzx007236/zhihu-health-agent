"""Freeze the actual 246-case v3.2 gap and inspect public data, never private answers."""
import hashlib
import json
from pathlib import Path
import shutil
import sys
from unittest.mock import patch

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / 'output/知护题库关联经验库_v3.3'
sys.path.insert(0, str(ROOT / 'workbuddy-agent/zhihu-agent/connector/server'))
from zhihu_mcp import experience as ex, tools


def main():
    OUT.mkdir(exist_ok=True)
    baseline = ROOT / 'output/经验库接入验证/经验库v3.2运行池候选盘点.json'
    target = OUT / 'v3.2缺口基线.json'
    if not target.exists():
        data = json.loads(baseline.read_text(encoding='utf8'))
        rows = [r for r in data['cases'] if not r['v32_public']['candidate_count']]
        assert len(rows) == 246
        frozen = dict(baseline_sha256=hashlib.sha256(baseline.read_bytes()).hexdigest(),
                      resource_sha256=data['resources']['v32'], count=len(rows), cases=rows)
        target.write_text(json.dumps(frozen, ensure_ascii=False, indent=2), encoding='utf8')
    rows = json.loads(target.read_text(encoding='utf8'))['cases']
    backup = ROOT / 'backups/before-experience-v33-246cases'
    for path in [ROOT / 'README.md', ROOT / 'web/experience.js',
                 ROOT / 'workbuddy-agent/zhihu-agent/connector/server/zhihu_mcp/experience.py',
                 ROOT / 'workbuddy-agent/zhihu-agent/connector/server/zhihu_mcp/experience_rules.json',
                 ROOT / 'output/部署-全量更新-20261114/build_release.py']:
        dest = backup / path.relative_to(ROOT)
        if not dest.exists():
            dest.parent.mkdir(parents=True, exist_ok=True)
            shutil.copy2(path, dest)
    public_rows = []
    for r in rows:
        cid = r['case_id']
        case = tools._case_for_session({'case_id': cid}, ROOT)
        public = tools._public_case_view(case)
        with patch.object(tools, '_case_for_session', return_value=case), patch.object(tools, 'read_dialogue', return_value=[]):
            visible = tools._experience_visible_context({'case_id': cid}, ROOT)
        public_rows.append(dict(case_id=cid, topic=r['topic'], visible_context=visible, public=public))
    (OUT / '246例公开资料工作表.json').write_text(json.dumps(public_rows, ensure_ascii=False, indent=2), encoding='utf8')
    summary = '\n'.join(f"{r['case_id']} | {r['topic']} | {r['visible_context'][:520]}" for r in public_rows)
    (OUT / '246例公开资料摘要.txt').write_text(summary, encoding='utf8')
    print(summary)


if __name__ == '__main__':
    main()
