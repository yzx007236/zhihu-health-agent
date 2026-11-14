# 知护（zhihu）——大健康学习与实践智能体

知护面向临床医学、医学技术、护理学、中医学、康复治疗、健康服务与管理及通用方向学习者。知识库含875张知识卡，支持按专业与具体课程检索；学生可用病例库含 **251个合成病例、90个主题**。其中5个是完整著录的医院门诊结构化病例，246个用于岗位沟通、风险识别与行动闭环训练。v4.4.0题库共存储642题，其中548题启用（487道单选、61道多选）；各专业均提供基础、提高、困难、专家、医学英语五档。

> 教学与合规声明：所有病例均为合成案例，不构成医疗建议，不用于真实诊疗。

## 环境与快速验证

- Python 3.9+，仅使用标准库，无需安装第三方依赖。
- 在 `zhihu/` 目录运行：`python tests/smoke_test.py`
- 预期输出：`[OK] ...全部通过`。

## 运行工具

WorkBuddy 通过 16 个 `zhihu_*` MCP 工具管理启动口令、专业分流、病例、跨会话学习档案、SP 状态、对话日志、评分和报告。底层确定性模块完成自测批改、知识检索、病例读取、程序评分和报告生成。

```powershell
python scripts/check_pretest.py --answers examples/answers.json --major other
python scripts/check_pretest.py --major nursing --paper-only
python scripts/retrieve_knowledge.py --node-id measurement_device_posture
python scripts/get_training_case.py --case-id C1
python scripts/get_training_case.py --case-id C1 --include-private
python scripts/score_training.py --session tests/golden_dialogues/c3_complete.json
python scripts/score_training.py --session tests/golden_dialogues/c4_complete.json
python scripts/score_training.py --session tests/red_line_cases/clinic_diagnosis.json
python scripts/generate_report.py --score score.json --format html --output report.html
```

`score_training` 不从语言感觉直接给分。上游证据抽取角色只能提交 `item_id + turn_id + quote + tags` 候选；程序校验后按 `references/rubric.json` 算分、红线和封顶。原始对话、候选证据、程序评分结果应分开保存。

## 数据契约

- 知识卡：`references/knowledge/knowledge_cards.json`（基础疾病知识）+ `references/knowledge/professional_cards.json`（四大专业知识点，索引见 `professional_index.md`）
- 合成病例与变式：公开训练接口过滤已退役的高血压/糖尿病病例；54 个启用基础病例、192 个运行时训练场景和 5 个医院门诊完整结构化病例，合计 251 例。
- 自测题：`references/quizzes/pretest.json`、`pretest_hard.json`、`pretest_en.json`、`pretest_westmed.json`
- 第二轮质控报告：`references/audits/round2/`（题质评级、反蒙题、重复题、分级和变更记录）
- 启动口令与专业选项：`references/startup.json`
- 评分规则：`references/rubric.json`（`1.1.0`）
- 学习档案：按 `learner_id` 在 MCP 本地会话目录累计自测、错题、薄弱节点、病例成绩和六维雷达；`zhihu_get_session_status` 可直接读取。
- 语义标签：`references/semantic_tags.md`
- 学习者专业：`references/learner_profiles.md`
- 会话与角色：`references/session_state.md`、`references/resident_persona.md`
- 合规：`references/compliance.md`

## 演示流程

0. 学生先说一句启动口令（默认「开始知护」，见 `references/startup.json`）：`begin_training` 回一句带会话编号的启动回执，再问专业；未命中口令不建会话。
1. 学生答专业后 `start_session(major, mode="quick", session_id=...)` 写入 `learner_profile` 并给出**该专业**的推荐病例（只列 `recommended_majors` 含本专业的病例，不足 4 个就少列，不用其他专业凑数；专业枚举见 `learner_profiles.md`）。
2. 按专业从 `pretest.json` 组 5 道题，提交 `check_pretest(answers, major=...)` 批改。
3. 对薄弱节点调用 `retrieve_knowledge`，展示来源和版本。
4. 调用 `get_training_case` 获取公开病例；训练引擎仅在内部读取隐藏信息。
5. 保存完整对话，另行产生受限标签的证据候选。
6. 调用 `score_training` 得到可复算实践分，再调用 `generate_report` 生成报告。
7. 报告后调用 `zhihu_generate_case_variant`，按上一轮薄弱项动态改变场景、沟通障碍、隐藏线索和风险信息，在新的会话中完成可比较的变式重练。

## 病例与场景

病例按六个岗位专业分别扩展，编号前缀为 `CLX`、`MTX`、`NUX`、`TCMX`、`RHX`、`HMX`。每个专业包含 8 个主题，每个主题覆盖门诊初次接触、社区连续随访、出院前联合指导、夜间值班交接 4 类场景。临床医学默认优先推荐 `CL-O1`、`IM-O2`、`GI-O3`、`EN-O4`、`RM-O5` 五个完整门诊病例；也可通过 `case_mode="outpatient_structured"` 只使用该入口。

历史高血压和糖尿病素材仅为旧数据兼容保留，`list_training_cases`、随机推荐和 `select_training_case` 均会过滤或拒绝它们。各启用病例的实践分统一归一化为 100 分后呈现。

## 平台表述

当前为本地教学训练工具，采用“课程任务或链接 → 知护训练页面 → 生成报告 → 学生回课程提交”的联动方式。

## 尚需完成的验证

- 至少 3 名真实目标用户完成使用并在 `references/user_feedback.md` 留下原始反馈与授权状态。
- 保存真实 WorkBuddy 运行画面。
