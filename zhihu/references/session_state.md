# 会话记忆与完整日志结构定义

> 当前状态：结构契约对齐 `rubric 1.0.0`；原始对话、候选证据、程序评分结果必须分开保存。

## 1. 会话内记忆（session 内）

| 字段 | 含义 |
|---|---|
| `session_id` | 会话唯一编号 |
| `case_id` | 当前病例编号 |
| `stage` | 当前环节（见下方枚举） |
| `learner_profile` | 学习者专业画像（`major_id`，见 `learner_profiles.md`） |
| `pretest_result` | 自测结果与薄弱节点 |
| `weak_nodes` | 薄弱知识节点 |
| `revealed_info` | 已透露给学生的隐藏信息 |
| `resident_state` | 居民当前情绪/沟通状态 |
| `dialogue_log` | 完整对话记录 |
| `score_result` | 评分结果（评分后产生） |

### stage 枚举（与 SKILL.md §4 一致）

`idle` / `pretest` / `explain` / `case_read` / `case_assessment` / `dialogue` / `evidence_extraction` / `scoring` / `report` / `retrain`，另有中断态 `paused` / `ended` / `error` / `safety_redirect`。

动态病例变式会创建新的会话，并额外记录：`variant_of`（来源病例）、`source_session_id`（上一轮会话）、`retrain_focus`（变式侧重）、`previous_weak_nodes`（上一轮低分评分项）。完整变式私有数据只写入新会话目录的 `case_variant.json`，不得放进学生可见输出。

## 2. 跨会话记忆（跨 session）

默认只保留结构化学习结果，不长期保存完整原始对话：

- 历史得分
- 薄弱节点
- 完成病例
- 推荐重练

## 3. 会话记录字段

每条对话消息至少包含：

| 字段 | 含义 |
|---|---|
| `session_id` | 会话编号 |
| `case_id` | 病例编号 |
| `stage` | 所属环节 |
| `turn_id` | 轮次编号 |
| `speaker` | 说话人（student / resident / guide / tool） |
| `raw_text` | 原始文本 |
| `timestamp` | 时间戳 |
| `revealed_info` | 本轮透露的信息 |
| `state_snapshot` | 本轮状态快照 |
| `rubric_version` | 评分规则版本（当前 `1.0.0`） |

专业信息只存在于会话层 `learner_profile`，不写入单条对话记录、证据候选或评分结果。

## 4. 病例公开血压记录字段

学生可见的血压记录字段为 `bp_log`，结构（见 `cases.json`）：

| 字段 | 含义 |
|---|---|
| `day` | 记录日期标签（如 `D1`） |
| `time` | 测量时间 |
| `systolic` | 收缩压 |
| `diastolic` | 舒张压 |
| `pulse` | 心率 |
| `note` | 测量条件或标记 |

## 5. 模型上下文与评分记录分离

> 不能只靠模型上下文记住病史和沟通过程。

- 模型每轮读取：固定病例摘要 + 当前状态 + 最近对话 + 早期摘要 + 本轮知识卡。
- 系统另行保存完整结构化对话，供最终评分。
- 评分读取「完整日志」，不是截断后的模型上下文。

## 6. 评分结果字段

| 字段 | 含义 |
|---|---|
| `session_id` | 会话编号 |
| `rubric_version` | 规则版本 |
| `item_results` | 各评分项结果 |
| `dimension_scores` | 维度分 |
| `total_score` | 总分（程序计算） |
| `caps` | 封顶 |
| `red_lines` | 红线规则（`RL-` 开头） |
| `evidence` | 证据（原话 + 轮次） |
| `uncertain_items` | 待复核项 |
| `knowledge_refs` | 知识回连 |

## 7. 待定事项

- 具体字段最终命名与类型。
- 跨会话记忆的存储范围与保留策略。
- 实际上下文窗口大小（取决于模型配置，不虚构固定数字）。
