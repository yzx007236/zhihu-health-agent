"""Run source-backed teaching examples using the actual retrieval engine."""
import json
from pathlib import Path
import sys
from unittest.mock import patch

ROOT = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(ROOT / 'workbuddy-agent/zhihu-agent/connector/server'))
from zhihu_mcp import experience as ex, tools


def main():
    cases = []
    for cid, card_ids in [('CL122', ['K72', 'K73']), ('CL3', ['K84']), ('CL32', ['K79']), ('CL6', ['K88'])]:
        case = tools._case_for_session({'case_id': cid}, ROOT)
        with patch.object(tools, '_case_for_session', return_value=case), patch.object(tools, 'read_dialogue', return_value=[]):
            visible = tools._experience_visible_context({'case_id': cid}, ROOT)
        for card_id in card_ids:
            result = ex.search(card_id, allow_cards=False, guidance_only=True, coaching=True, visible_context=visible)
            cases.append(dict(case_id=cid, card_id=card_id, result=result))
    for label, query in [('黑便尚未证实溃疡出血', 'K79，45岁，黑便，尚未行胃镜'),
        ('补齐内镜证实后', 'K79，45岁，本次胃镜证实溃疡出血。'),
        ('紧急风险不等待经验库', 'K78，疑似溃疡穿孔，明确腹膜炎。')]:
        cases.append(dict(label=label, synthetic_input=query, result=ex.search(query)))
    folder = ROOT / 'output/经验库接入验证'
    (folder / '经验库v3.2真实检索演示.json').write_text(json.dumps(dict(
        note='实际引擎执行；全部为合成教学病例及输入，非浏览器点击记录，不代表临床审定或网站已更新。', scenarios=cases), ensure_ascii=False, indent=2), encoding='utf8')
    html = '<!doctype html><meta charset="utf-8"><title>经验库v3.2实际检索示例</title><h1>胰腺炎情境参考</h1><p>项目合成病例CL122：诊断急性胰腺炎，低氧36小时改善，影像局部坏死，未见明确感染证据。候选不是全病例覆盖；本轮未部署。</p>'
    html += ex.render_reference_html(cases[0]['result']) + ex.render_reference_html(cases[1]['result'])
    (folder / '经验库v3.2胰腺炎检索演示.html').write_text(html, encoding='utf8')
    for c in cases:
        result = c['result']
        print(json.dumps(dict(case_id=c.get('case_id'), label=c.get('label'),
            cards=[dict(id=x['id'], result=x['applicability']) for x in result['cards']], urgent=result['urgent']), ensure_ascii=False))


if __name__ == '__main__':
    main()
