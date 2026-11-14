"""Reproduce synthetic retrieval and actual-case collection, without network/session writes."""
import json
from pathlib import Path
import sys
from unittest.mock import patch

ROOT = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(ROOT / 'workbuddy-agent/zhihu-agent/connector/server'))
from zhihu_mcp import experience as ex, tools


def main():
    cap = '46岁，当前社区获得性肺炎，影像肺炎浸润，否认院内肺炎，否认免疫抑制。'
    demos = []
    for label, text, enabled in (
        ('肺炎缺少初始PCT资料', cap, True),
        ('肺炎补齐低PCT情境', cap + '初始降钙素原低。', True),
        ('否认肺炎不能套用', '46岁，否认社区获得性肺炎，初始降钙素原低。', True),
        ('经验库关闭仍优先识别急症', '持续胸痛伴冷汗', False),
    ):
        result = ex.search('K56，' + text, enabled=enabled)
        demos.append({'scenario': label, 'synthetic_input': text, 'result': result})
    case = tools._case_for_session({'case_id': 'IM-O2'}, ROOT)
    snapshot = {'case_id': 'IM-O2', 'labs': ['胸部 X 线']}
    for label, selected in (('IM-O2尚未查看胸片', None), ('IM-O2已查看胸片', snapshot)):
        with patch.object(tools, '_case_for_session', return_value=case), patch.object(tools, 'read_dialogue', return_value=[]):
            visible = tools._experience_visible_context({'case_id': 'IM-O2'}, ROOT, selected)
        result = ex.search('K56', allow_cards=False, guidance_only=True, coaching=True, visible_context=visible)
        demos.append({'scenario': label, 'case_id': 'IM-O2', 'collected': selected, 'result': result})
    folder = ROOT / 'output/经验库接入验证'
    (folder / '经验库v3.1真实检索演示.json').write_text(json.dumps({
        'note': '合成教学输入及项目合成病例，真实确定性检索器输出；非浏览器点击记录，不代表临床审核或病例覆盖。',
        'scenarios': demos,
    }, ensure_ascii=False, indent=2), encoding='utf8')
    html = '<!doctype html><meta charset="utf-8"><title>经验库v3.1合成检索示例</title><h1>合成情境参考复盘</h1><p>本页为真实引擎生成的独立审阅示例，非训练作答前界面，不代表网站已更新。</p>'
    html += ex.render_reference_html(demos[1]['result'])
    (folder / '经验库v3.1肺炎检索演示.html').write_text(html, encoding='utf8')
    for demo in demos:
        print(json.dumps({'scenario': demo['scenario'], 'outcome': demo['result']['outcome'],
            'K56': [{k: c[k] for k in ('applicability', 'condition_checks', 'questions')} for c in demo['result']['cards'] if c['id'] == 'K56']}, ensure_ascii=False))


if __name__ == '__main__':
    main()
