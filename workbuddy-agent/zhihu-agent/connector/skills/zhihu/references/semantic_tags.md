# 语义标签权威定义

> 本文件是知护所有语义标签的**唯一权威来源**。证据抽取角色只能使用这里的标签，不得自创。
> 标签分三类：**评分项标签**（供评分）、**红线标签**（触发扣分/封顶）、**释放条件标签**（控制隐藏信息释放）。部分标签跨类复用。
> 本文件由 `rubric.json` 与 `cases.json` 派生，修改评分规则或病例时须同步更新。

## 1. 评分项标签

| 标签 | 含义 | 正例 |
|---|---|---|
| `ask_open_question` | 提出开放式问题，邀请SP自由陈述 | 「您最近测血压和服药是什么情况？」 |
| `ask_specific_fact` | 追问一个具体的、可核实的事实 | 「您昨天和今天分别测了几次？」 |
| `device` | 核对血压计类型与设备是否合适 | 「您用的是上臂式还是腕式血压计？」 |
| `cuff` | 核对袖带是否合适、是否隔着衣服 | 「袖带是直接绑在胳膊上吗？」 |
| `posture` | 核对体位、背部、双脚、手臂位置 | 「测量时您是坐稳、双脚平放吗？」 |
| `rest` | 核对测量前是否休息、是否刚运动/饭后 | 「您是安静坐了一会儿再测的吗？」 |
| `timing` | 核对测量时段是否固定、是否饭前/饭后 | 「您一般在什么时间测？」 |
| `repeat` | 核对是否重复测量、间隔多久 | 「您一次会连测几次、间隔多久？」 |
| `record` | 核对是否完整记录日期、时间、读数 | 「您会把每次的日期和读数都记下来吗？」 |
| `use_trend` | 结合连续记录看趋势，不只看单次 | 「我们看看这几天连起来的趋势。」 |
| `avoid_single_reading_conclusion` | 明确不以单次读数下结论 | 「一次读数不能说明长期情况。」 |
| `identify_case_warning` | 识别病例中预设的警示读数或症状 | 「这条记录被标记为警示，而且您头晕。」 |
| `timely_referral` | 给出及时、清晰的转介或就医建议 | 「建议现在联系医务人员，紧急时打 120。」 |
| `no_self_adjustment` | 明确不建议自行停药/换药/调药 | 「不要自己停药或换药。」 |
| `refer_qualified_professional` | 建议咨询有资质的医务人员 | 「把记录带给医生讨论。」 |
| `ask_concern` | 主动询问SP的具体顾虑 | 「您最担心的是哪一件事？」 |
| `acknowledge_concern` | 明确回应、接纳SP的顾虑 | 「我理解您是怕给孩子添麻烦。」 |
| `generic_reassurance` | 空泛的安慰（如「别担心」），非针对具体顾虑 | 「没事的，放心好了。」 |
| `plain_language` | 用通俗表达，不用术语堆砌 | 「一次读数像一张照片，连续记录像一段录像。」 |
| `explain_reason` | 解释为什么这样做、这样判断 | 「所以要连续记录，因为单次波动大。」 |
| `teach_back` | 请SP复述或演示，确认真正理解 | 「您用自己的话说一下接下来怎么做？」 |
| `closed_understanding_check` | 封闭式确认（如「懂了吗」），弱于 teach_back | 「明白了吗？」 |
| `shared_decision` | 与SP共同协商，而非单向命令 | 「我们商量一个您能做到的办法。」 |
| `specific_next_step` | 给出明确、可执行的下一步行动 | 「明天早上固定时间测两次并记录。」 |
| `role_appropriate_judgement` | 在当前虚拟岗位权限内作有依据的专业判断；医生角色可提出工作诊断与鉴别，其他岗位作护理、技术、康复或健康管理判断 | 「目前首先考虑A，同时需与B鉴别；现有证据还需要检查确认。」 |
| `defer_diagnosis` | 非医生虚拟岗位明确不越权作医学诊断；不适用于虚拟医生的合理工作诊断 | 「我先完成护理评估并立即升级报告，由医疗团队综合判断。」 |
| `state_evidence_limit` | 明确说明现有信息不足以支撑结论 | 「现在只有诊室和家里各一两次记录，还不够下判断。」 |

## 2. 红线标签

触发即对应红线规则，相关评分项归零并封顶（见 `rubric.json`）。

| 标签 | 红线 | 含义 |
|---|---|---|
| `recommend_specific_drug_or_dose` | RL-MED-01 | 推荐具体药物或剂量 |
| `suggest_stop_switch_adjust_medication` | RL-MED-01 | 建议自行停药/换药/调药 |
| `diagnose_real_person` | RL-DIAG-01 | 对真实人物作诊断或治疗决定；不适用于已确认合成病例中的岗位模拟 |
| `unsupported_definitive_diagnosis` | RL-DIAG-01 | 在合成病例中无证据、无鉴别过程地宣布确定诊断 |
| `out_of_role_procedure` | RL-SCOPE-01 | 执行超出当前虚拟岗位权限的操作；岗位权限内采血、血清处理等不属于此标签 |
| `delay_referral` | RL-RISK-01 | 应转介却只让继续观察 |
| `reassure_without_basis` | RL-RISK-01 | 无依据安慰（「没事、不严重」） |
| `store_real_health_identifier` | RL-PRIV-01 | 记录/保存真实个人健康标识 |
| `endorse_unverified_remedy` | RL-REM-01 | 认可保健品、偏方或替代疗法可取代正规治疗 |

## 3. 释放条件标签

控制病例隐藏信息是否释放。判断依据学生是否**真正询问对应事实并回应顾虑**，不靠关键词机械触发。

| 标签 | 含义 | 对应释放 |
|---|---|---|
| `ask_medication_adherence_without_blame` | 不带指责地询问服药/漏服情况 | 服药依从相关隐藏信息 |
| `acknowledge_concern` | 回应具体顾虑 | 顾虑类隐藏信息（常与下条并用） |
| `ask_specific_concern` | 追问具体顾虑是什么 | 真实顾虑 |
| `ask_measurement_timing` | 询问测量时段 | 测量时机类隐藏信息 |
| `ask_rest_before_measurement` | 询问测量前是否休息/是否饭后 | 测量条件类隐藏信息 |
| `ask_cuff_placement` | 询问袖带佩戴方式 | 袖带类隐藏信息 |
| `ask_measurement_schedule` | 询问平时测量/记录习惯 | 记录习惯类隐藏信息 |
| `ask_symptom_change` | 询问症状是否变化/加重 | 症状变化类隐藏信息 |
| `ask_support_person` | 询问可联系的支持人员 | 家属/社区支持类隐藏信息 |
| `respect_preference` | 尊重SP意愿、不勉强 | 变式中「尊重意愿」类隐藏信息 |
| `offer_support_options` | 提供多个可接受的支持选项 | 变式中「替代支持方式」类隐藏信息 |
| `ask_non_drug_attempt` | 询问是否在尝试保健品、偏方或其他替代疗法 | 「替代疗法尝试」类隐藏信息 |

## 4. 病例边界行为（非评分标签）

### 专业病例的专属释放条件

`professional_cases.json` 中各条 `hidden_info` 的 `release_conditions` 可以使用病例作者写入的 `ask_*` 专属条件。它们只用于该病例的信息释放，不是评分标签；按照标签名称与对应隐藏事实共同判断，学生必须实际询问或申请该事实，笼统地问「还有什么」不满足具体条件。`ask_relevant_history_and_previous_results` 只响应与该条事实有关的病史或既往结果问题，不能一次释放所有资料。标签中的阶段或时间条件也必须满足；不明确时保守不释放。此规则只覆盖病例中已经登记的条件，不授权模型自创新标签或编造事实。

病例注明的独立教学实验或对照属于教学资料，不是患者检查结果：在学生先完成相关判断或明确提交分析后，才可按需由系统以教学资料身份提供，不能由患者声称自身发生了对照情境。

`cases.json` 各病例的 `boundary_behaviors` 字段列出**学生需规避的边界行为**。其中部分直接对应上面的红线标签，部分是病例专属提示，不参与评分：

| 病例专属边界行为 | 含义 |
|---|---|
| `diagnose_from_single_reading` | 仅凭单次读数下诊断 |
| `diagnose_from_symptom_only` | 仅凭症状下诊断 |
| `recommend_medication_adjustment` | 建议调整用药 |
| `coerce_or_shame` | 强迫或羞辱SP |
| `explain_away_clinic_reading` | 把诊室高值直接解释成「白大衣效应」并说不用管 |
| `discourage_visit` | 劝阻或弱化已预约的就诊 |
| `confirm_cure_conclusion` | 给出「已经好了、可以停药」这类治愈结论 |

## 命名说明

- **评分侧红线规则**：`rubric.json` 的 `red_lines`，以 `RL-` 开头，触发封顶。
- **病例侧边界行为**：`cases.json` 的 `boundary_behaviors`，是「学生需规避的行为提示」，非评分规则。
- 二者语义不同、字段名不同，避免混用。
