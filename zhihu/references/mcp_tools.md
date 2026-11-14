# 知护 MCP 工具路由

在 WorkBuddy Agent 中运行时，所有状态和结果必须来自 `zhihu_*` MCP 工具。

| 环节 | MCP 工具 |
|---|---|
| 启动检查 | `zhihu_health_check`（仅异常、更新后验证或用户要求时） |
| 开场口令 | `zhihu_begin_training`（必须先收到「开始知护」等口令；返回 `ack` 回执、`major_question`、`major_options`） |
| 新建／恢复 | `zhihu_start_session`（专业 + quick/complete，可带 `session_id` 给口令会话补专业）/ `zhihu_get_session_status` |
| 自测 | `zhihu_get_pretest`（`basic` 基础 / `intermediate` 提高 / `advanced` 困难 / `expert` 专家，任意阶段可重取）/ `zhihu_submit_pretest` |
| 知识讲解 | `zhihu_get_knowledge`（优先传 `major_id + course_id` 定位具体专业课；`knowledge_id` 精确定位） |
| 病例 | `zhihu_list_training_cases` / `zhihu_select_training_case` / `zhihu_generate_case_variant`（报告后按薄弱项生成新重练会话） |
| SP 扮演 | `zhihu_get_sp_state`（结果不可展示） |
| 状态与日志 | `zhihu_advance_stage` / `zhihu_append_exchange`（优先）/ `zhihu_append_turn` |
| 评分 | `zhihu_score_session` |
| 报告 | `zhihu_generate_training_report` |
| 完整教材 | `zhihu_list_textbooks` 列书；`zhihu_search_textbooks(query, book_id?, limit=20, offset=0)` 查正文；`zhihu_read_textbook_page(book_id, pdf_page=1)` 读指定 PDF 页序 |

教材检索只返回原文线索，不证明题目解析已被教材支持。引用前核对完整原书；页码注明 PDF 页序，OCR 文字需核实。当前阶段不自动把出处候选写进题库解析。教材 PDF 相对地址只适用于装有教材的本机网页；运行环境返回 unavailable 时不得声称已查阅原书。
| 指南情境经验（当前连接器源码） | `zhihu_get_experience_references`（`query, session_id, question_id, case_id, topic, node_id, enabled`；教学参考） |

答疑和病例复盘携带真实 `session_id`，阶段以工具返回为准；已提交试题传 `question_id`，病例卡片等实际评分完成。候选关联不代表适用或覆盖，信息不足先追问，否定/疑似/既往不当当前确诊，不同人群/病因应排除。无可靠匹配就明确说明；紧急提示先升级。完整展示卡号、机构、版本、原文定位、链接、核验范围和审核状态，区分原文推荐与教学转述；不推定最新版、全文核验或临床审定，不补造参数，不参与评分。`enabled=false/true` 关闭/恢复会话经验库，缺失/损坏继续原训练。旧独立CLI没有此工具，不模拟其结果。

关键约束：

- 不把工具调用转嫁给学生；
- 不口头模拟工具结果；
- 开场必须先收到启动口令（`开始知护` 等，见 `startup.json`），未命中口令不建会话；命中后先发回执（含会话编号），再问专业；
- 取得专业后调用 `zhihu_start_session(major=..., session_id=...)` 把专业写进同一个会话，不用默认 `other` 另开新会话；
- 快速模式跳过自测并直接给出本专业推荐；
- 自测有基础、提高、困难、专家四档；“再难一点”按当前档逐级上调。同一模块可重复进入，不要用「下一步」把学生推进下一阶段；
- 展示自测题时不给答题格式示例，只提示逐题回复选项字母；
- 使用者与 SP 原话逐轮保存，优先一次调用 `zhihu_append_exchange`；同步传本轮确已命中的 `covered_points`、`professional_conclusion`、`action_plan`、`teach_back` 和 `safety_closure`，并依返的 `dialogue_director` 四幕十二拍控制下一轮。
- 只有 `dialogue_director.ready_to_close=true` 才接受「结束对话，进入复盘」；成功后显示「【SP对话完成｜进入复盘】」并停止 SP 扮演。
- `zhihu_get_sp_state` 的私有字段只用于内部扮演；
- 证据引用必须逐字来自学生对应轮次；
- 程序评分成功前不展示分数；
- 恢复会话必须先查真实状态。
