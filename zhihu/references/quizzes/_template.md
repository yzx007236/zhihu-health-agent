# 微型自测字段模板

> **不得把题目答案交给虚拟 SP在训练中提前泄露。**

## 必填字段

| 字段 | 含义 |
|---|---|
| `question_id` | 题目唯一编号 |
| `node_id` | 对应知识节点（须能被 `retrieve_knowledge` 检索到） |
| `major_focus` | 适用专业：`all`（通用）或专业编号（见 `learner_profiles.md`） |
| `answer` | 标准答案（客观题） |
| `score_rule` | 得分规则（确定规则，由程序执行） |
| `explanation_ref` | 解析对应的知识卡/教材依据 |

## 专业组卷

题库顶层用 `major_papers` 定义每个专业取哪几题，卷内题目编号固定，保证同一专业每次取到同一份卷：

```json
"major_papers": {
  "nursing": ["Q-BP-001","Q-BP-002","Q-BP-005","Q-NU-001","Q-NU-002"],
  "other": ["Q-BP-001","Q-BP-002","Q-BP-003","Q-BP-004","Q-BP-005"]
}
```

未知专业一律落入 `other`；`major_papers` 缺失时回退到全部题目。

## 设计约束

- 每个专业卷分基础（basic）、提高（intermediate）、困难（advanced）、专家（expert）四档，每档固定 5 题，同档须覆盖 5 个互不重复的评分节点。
- 专业题只换情境与考点角度，其 `node_id` 与 `explanation_ref` 必须落在已有知识卡内，不得引入未经核实的新医学口径。
- 自测答案与分值由确定规则计算。
- 不采集「犹豫时长、修改轨迹」来推断学生心理或掌握程度。
- 自测成绩与实践成绩分别展示。

## 示例

```json
{
  "question_id": "Q-NU-001",
  "node_id": "reading_interpretation",
  "major_focus": ["nursing"],
  "answer": "C",
  "score_rule": "完全匹配标准答案得 1 分，否则 0 分",
  "explanation_ref": "K-BP-003"
}
```
