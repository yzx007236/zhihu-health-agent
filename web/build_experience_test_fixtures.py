"""Generate synthetic examples from the real engine; no network or patient data."""
import json
from pathlib import Path
import sys

ROOT = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(ROOT / 'workbuddy-agent/zhihu-agent/connector/server'))
from zhihu_mcp import experience as e


def find(text):
    return e.search('K41', allow_cards=False, guidance_only=True,
                    coaching=True, visible_context=text)


fixtures = {
    'before': find('68岁，已确诊慢阻肺，仍气促'),
    'after': find('68岁，已确诊慢阻肺，已用吸入药，仍气促，病情稳定，共病已评估'),
    'excluded': find('68岁，否认慢阻肺，仍气促'),
    'empty': e.search('针灸局部消毒操作规范'),
    'urgent': e.search('患者现在呼之不应', enabled=False),
}
target = ROOT / 'output/经验库接入验证/页内带教演示.json'
target.parent.mkdir(parents=True, exist_ok=True)
target.write_text(json.dumps(fixtures, ensure_ascii=False, indent=2), encoding='utf-8')
print('Synthetic retrieval examples generated (before/after/excluded/empty/urgent).')
