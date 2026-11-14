# 知识卡字段模板

> 对应《队员必读与开发分工》第 9.1 节。字段由郑鸿源牵头统一，修改须先通知。

## 必填字段

| 字段 | 含义 | 示例 |
|---|---|---|
| `knowledge_id` | 知识卡编号 | `K-BP-001` |
| `node_id` | 知识节点 | `血压测量规范` |
| `claim` | 经核对的原文或准确摘要 | `家庭自测血压建议取 7 天平均值…` |
| `source` | 来源全称 | 《中国家庭血压监测指南（2019）》 |
| `source_location` | 章节或条款定位 | `第 X 章 / 第 Y 条`（未核实则留空标待审） |
| `version` | 来源版本 | `2019` / `2024 年修订版` |
| `scope` | 适用范围 | `18 岁以上居家自测人群` |
| `exceptions` | 适用范围与例外 | `心律失常者需结合诊室测量…` |
| `topic_slug` | 模块级英文标识（索引与检索用） | `nursing_falls_prevention` |
| `node_slug` | 单卡唯一英文标识（保留细分知识点） | `nursing_falls_risk_screen` |
| `source_url` | 可打开的原文链接；无则留空串 | `https://www.nhc.gov.cn/...` |
| `source_note` | 来源说明与核验状态 | `本卡出处已由课程团队核对为真实出版物/行业规范，尚未补公开访问链接。` |
| `review_status` | 维护状态 | `课程团队已复核` |

## 建议补充字段

- `misconceptions`：常见误区
- `lay_terms`：可用于与 SP 沟通的通俗表达
- `reviewer`：维护人（可空）
- `updated_at`：版本更新记录

## 示例占位

```json
{
  "knowledge_id": "K-BP-001",
  "node_id": "血压测量规范",
  "claim": "家庭自测血压的规范测量步骤……",
  "source": "《中国家庭血压监测指南（2019）》",
  "source_location": "【待核实】",
  "version": "2019",
  "scope": "【待确认】",
  "exceptions": "【待确认】",
  "review_status": "课程团队维护"
}
```

> 注意：来源未核实的内容一律留空并标注，不得编造。
