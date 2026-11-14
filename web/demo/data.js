// 知护数据资产（自动生成，勿手改）
// 来源：zhihu/references（与 Python 确定性引擎同源）
window.ZHIHU_DATA = {
"knowledge": {
"fallback": "当前课程知识库未收录这一问题的可靠依据，请查阅课程指定教材或向教师咨询。",
"content_status": "课程团队维护",
"cards": [
{
"knowledge_id": "K-ADV-CLIN-001",
"node_id": "clinical_medicine",
"title": "验前概率、似然比与后验概率",
"claim": "诊断试验结果必须结合验前概率解释。验前优势=验前概率/(1-验前概率)，后验优势=验前优势×似然比，后验概率=后验优势/(1+后验优势)。低验前概率时，即使试验阳性也可能有较多假阳性。",
"source": "《诊断学》第9版，人民卫生出版社",
"source_location": "临床诊断思维与诊断试验评价",
"source_url": "",
"source_note": "课程团队复核的教材知识点",
"version": "第9版 2018",
"scope": "clinical_medicine·诊断推理",
"exceptions": "似然比取决于适用人群和阈值，不能脱离验证条件机械套用。",
"misconceptions": [
"把敏感度等同于阳性预测值",
"忽略验前概率"
],
"lay_terms": [
"检查结果要结合检查前有多大可能性一起看。"
],
"reviewer": "知护课程团队",
"review_status": "课程团队已复核",
"updated_at": "2026-10-31",
"node_slug": "clin_bayesian_reasoning",
"topic_slug": "clin_bayesian_reasoning"
},
{
"knowledge_id": "K-ADV-CLIN-002",
"node_id": "clinical_medicine",
"title": "代谢性酸中毒的代偿判断",
"claim": "代谢性酸中毒先确认pH和HCO3-下降，再计算阴离子间隙，并用Winter公式估计预计PaCO2约为1.5×HCO3-+8±2；实测值明显偏离提示合并呼吸性紊乱。",
"source": "Harrison's Principles of Internal Medicine",
"source_location": "Acid-Base Disorders",
"source_url": "",
"source_note": "课程团队复核的内科学知识点",
"version": "21st ed.",
"scope": "clinical_medicine·酸碱分析",
"exceptions": "需结合白蛋白、临床状态和标本质量解释。",
"misconceptions": [
"只看pH判断单一紊乱",
"把代偿当作完全恢复正常"
],
"lay_terms": [
"血液酸碱变化要同时看原发变化和身体的代偿是否合适。"
],
"reviewer": "知护课程团队",
"review_status": "课程团队已复核",
"updated_at": "2026-10-31",
"node_slug": "clin_acid_base",
"topic_slug": "clin_acid_base"
},
{
"knowledge_id": "K-ADV-CLIN-003",
"node_id": "clinical_medicine",
"title": "工作诊断与确定诊断的区分",
"claim": "合成病例中可基于问题表征提出工作诊断和排序后的鉴别诊断，同时标明支持证据、反对证据、待验证信息和改变判断的条件；工作诊断不等于无条件的最终确诊。",
"source": "《诊断学》第9版，人民卫生出版社",
"source_location": "临床诊断思维",
"source_url": "",
"source_note": "课程团队复核的教材知识点",
"version": "第9版 2018",
"scope": "clinical_medicine·岗位模拟",
"exceptions": "现实人物诊断仍需现实执业资质和完整诊疗流程。",
"misconceptions": [
"训练中完全不能提出诊断",
"把首个假设当最终结论"
],
"lay_terms": [
"目前最像什么、还要排除什么、还缺什么证据要分别说清楚。"
],
"reviewer": "知护课程团队",
"review_status": "课程团队已复核",
"updated_at": "2026-10-31",
"node_slug": "clin_working_diagnosis",
"topic_slug": "clin_working_diagnosis"
},
{
"knowledge_id": "K-ADV-MT-001",
"node_id": "medical_technology",
"title": "Westgard多规则质控解释",
"claim": "1_3s通常作为拒绝规则；2_2s、4_1s或同向连续偏移提示系统误差；R_4s更支持随机误差。出现失控信号时应暂停患者结果发布，排查校准、试剂、环境和操作因素。",
"source": "CLSI C24 Statistical Quality Control for Quantitative Measurement Procedures",
"source_location": "Laboratory quality control interpretation",
"source_url": "",
"source_note": "课程团队复核的实验室质控知识点",
"version": "4th ed.",
"scope": "medical_technology·质量控制",
"exceptions": "具体规则组合和频率按实验室质量计划执行。",
"misconceptions": [
"未超过3SD就必然在控",
"删除异常质控点后直接发布"
],
"lay_terms": [
"质控不是只看一个点，而是看连续结果有没有偏移模式。"
],
"reviewer": "知护课程团队",
"review_status": "课程团队已复核",
"updated_at": "2026-10-31",
"node_slug": "mt_westgard",
"topic_slug": "mt_westgard"
},
{
"knowledge_id": "K-ADV-MT-002",
"node_id": "medical_technology",
"title": "检验前污染的组合识别",
"claim": "从输液同侧采血可能造成稀释或输入液成分污染。多个相关分析物同步异常、与临床不符且出现明显delta check时，应先核对采血位置、时间、标本状态和身份，必要时规范重采。",
"source": "CLSI GP41 Collection of Diagnostic Venous Blood Specimens",
"source_location": "Specimen collection near intravenous infusions",
"source_url": "",
"source_note": "课程团队复核的静脉采血知识点",
"version": "7th ed.",
"scope": "medical_technology·检验前质量",
"exceptions": "紧急情况下按机构程序记录并解释限制。",
"misconceptions": [
"单项复测一致即可排除污染",
"用数学换算纠正所有污染"
],
"lay_terms": [
"抽血位置不合适可能让多项结果一起失真。"
],
"reviewer": "知护课程团队",
"review_status": "课程团队已复核",
"updated_at": "2026-10-31",
"node_slug": "mt_iv_contamination",
"topic_slug": "mt_iv_contamination"
},
{
"knowledge_id": "K-ADV-MT-003",
"node_id": "medical_technology",
"title": "方法学比较中的偏倚",
"claim": "高相关系数不代表两种方法可互换。方法比较需评估恒定偏倚、比例偏倚、临床决策点处的差异及其是否超过允许误差，并结合残差和样本分布解释。",
"source": "CLSI EP09 Measurement Procedure Comparison and Bias Estimation",
"source_location": "Bias estimation and regression analysis",
"source_url": "",
"source_note": "课程团队复核的方法学评价知识点",
"version": "3rd ed.",
"scope": "medical_technology·方法学评价",
"exceptions": "回归模型选择需符合误差结构和数据分布。",
"misconceptions": [
"相关系数高等于一致",
"只比较总体均值"
],
"lay_terms": [
"两种方法一起升降，不代表它们给出的数值足够接近。"
],
"reviewer": "知护课程团队",
"review_status": "课程团队已复核",
"updated_at": "2026-10-31",
"node_slug": "mt_method_comparison",
"topic_slug": "mt_method_comparison"
},
{
"knowledge_id": "K-ADV-NUR-001",
"node_id": "nursing",
"title": "病情恶化的ABC优先级",
"claim": "出现意识改变、呼吸频率异常、低氧、低血压或灌注恶化时，优先按气道、呼吸、循环快速评估并启动响应链；记录和常规量表不能延误即时支持。",
"source": "《基础护理学》第7版，人民卫生出版社",
"source_location": "病情观察与危重患者护理",
"source_url": "",
"source_note": "课程团队复核的护理知识点",
"version": "第7版",
"scope": "nursing·恶化识别",
"exceptions": "具体启动阈值按机构快速反应制度执行。",
"misconceptions": [
"先完成文书再处理",
"单看血氧忽略意识和呼吸"
],
"lay_terms": [
"先保证能呼吸、循环稳定，再补其他流程。"
],
"reviewer": "知护课程团队",
"review_status": "课程团队已复核",
"updated_at": "2026-10-31",
"node_slug": "nur_abc_deterioration",
"topic_slug": "nur_abc_deterioration"
},
{
"knowledge_id": "K-ADV-NUR-002",
"node_id": "nursing",
"title": "护理判断与医学诊断边界",
"claim": "护理角色可以形成护理判断、识别恶化模式、执行授权操作并启动升级，不应把所有判断都推给医生；但不以护理判断替代需要医师完成的医学诊断和处方。",
"source": "《基础护理学》第7版，人民卫生出版社",
"source_location": "护理程序与护理评估",
"source_url": "",
"source_note": "课程团队复核的护理知识点",
"version": "第7版",
"scope": "nursing·岗位权限",
"exceptions": "岗位授权和操作范围按机构制度与当地法规执行。",
"misconceptions": [
"护士只能报告不能判断",
"护理判断等于医学确诊"
],
"lay_terms": [
"护士要先判断患者是否在恶化，并及时采取职责内措施和升级报告。"
],
"reviewer": "知护课程团队",
"review_status": "课程团队已复核",
"updated_at": "2026-10-31",
"node_slug": "nur_role_judgement",
"topic_slug": "nur_role_judgement"
},
{
"knowledge_id": "K-ADV-NUR-003",
"node_id": "nursing",
"title": "输注配伍不确定时的决策",
"claim": "静脉药物与营养液或其他制剂配伍不确定时，不以肉眼无变化证明兼容；应查询经批准资料并联系药师，无法确认时避免同路同时输注，协调时间或替代通路。",
"source": "《基础护理学》第7版，人民卫生出版社",
"source_location": "静脉输液与用药安全",
"source_url": "",
"source_note": "课程团队复核的护理知识点",
"version": "第7版",
"scope": "nursing·用药安全",
"exceptions": "具体冲管和通路方案按药品说明及机构制度。",
"misconceptions": [
"无沉淀就是兼容",
"稀释后必然安全"
],
"lay_terms": [
"看不出变化不代表药物混在一起一定安全。"
],
"reviewer": "知护课程团队",
"review_status": "课程团队已复核",
"updated_at": "2026-10-31",
"node_slug": "nur_iv_compatibility",
"topic_slug": "nur_iv_compatibility"
},
{
"knowledge_id": "K-ADV-TCM-001",
"node_id": "traditional_chinese_medicine",
"title": "四诊信息一致性与采集条件",
"claim": "舌象、脉象、症状和病史应结合采集时间、饮食、运动及情绪等条件解释。信息矛盾时保留差异、补充四诊并复核，不选择性删除不符合预设证候的信息。",
"source": "《中医诊断学》，中国中医药出版社",
"source_location": "四诊合参与辨证",
"source_url": "",
"source_note": "课程团队复核的中医诊断知识点",
"version": "规划教材",
"scope": "traditional_chinese_medicine·四诊",
"exceptions": "急危重症先执行现代医学安全评估与转诊。",
"misconceptions": [
"单一舌象决定证候",
"删除矛盾信息"
],
"lay_terms": [
"四诊信息要互相印证，也要考虑刚吃饭或运动等影响。"
],
"reviewer": "知护课程团队",
"review_status": "课程团队已复核",
"updated_at": "2026-10-31",
"node_slug": "tcm_four_diagnosis_consistency",
"topic_slug": "tcm_four_diagnosis_consistency"
},
{
"knowledge_id": "K-ADV-TCM-002",
"node_id": "traditional_chinese_medicine",
"title": "辨证假设与证据限制",
"claim": "合成病例中可提出辨证假设和鉴别证候，但需说明支持信息、矛盾信息、待补四诊资料及改变判断的条件，不把信息不足的假设表述为确定结论。",
"source": "《中医诊断学》，中国中医药出版社",
"source_location": "辨证方法",
"source_url": "",
"source_note": "课程团队复核的中医诊断知识点",
"version": "规划教材",
"scope": "traditional_chinese_medicine·辨证推理",
"exceptions": "现实处方仍需完整评估和相应执业权限。",
"misconceptions": [
"训练中完全不能辨证",
"先定证型再筛选信息"
],
"lay_terms": [
"目前更像哪种证候、还有哪些信息不一致，要同时说明。"
],
"reviewer": "知护课程团队",
"review_status": "课程团队已复核",
"updated_at": "2026-10-31",
"node_slug": "tcm_syndrome_hypothesis",
"topic_slug": "tcm_syndrome_hypothesis"
},
{
"knowledge_id": "K-ADV-TCM-003",
"node_id": "traditional_chinese_medicine",
"title": "中药与西药的完整核对",
"claim": "药物核对需包括处方药、非处方药、中药饮片、中成药、保健品的名称、剂量、频次、来源和开始时间；来源不明或相互作用不确定时不自行增减，转由有资质医师或药师评估。",
"source": "《中药学》，中国中医药出版社",
"source_location": "中药安全与合理应用",
"source_url": "",
"source_note": "课程团队复核的中药安全知识点",
"version": "规划教材",
"scope": "traditional_chinese_medicine·用药安全",
"exceptions": "急性出血、过敏或器官损伤信号优先急症处理。",
"misconceptions": [
"天然药物无相互作用",
"错开时间可消除全部风险"
],
"lay_terms": [
"中药、保健品也要和西药一起核对。"
],
"reviewer": "知护课程团队",
"review_status": "课程团队已复核",
"updated_at": "2026-10-31",
"node_slug": "tcm_medication_reconciliation",
"topic_slug": "tcm_medication_reconciliation"
},
{
"knowledge_id": "K-ADV-RH-001",
"node_id": "rehabilitation",
"title": "最小可检测变化与临床重要变化",
"claim": "量表分数变化需与测量误差比较。变化小于最小可检测变化时可能仍处于误差范围；超过误差也不自动等于对患者有临床意义，需结合最小临床重要变化和实际活动表现。",
"source": "Physical Rehabilitation",
"source_location": "Outcome measurement and interpretation",
"source_url": "",
"source_note": "课程团队复核的康复测量知识点",
"version": "7th ed.",
"scope": "rehabilitation·结局测量",
"exceptions": "MDC和MCID取决于量表、疾病和人群。",
"misconceptions": [
"任何分数增加都是真改善",
"统计变化等于临床重要"
],
"lay_terms": [
"分数变化要先确认超过测量误差，还要看日常功能是否真正改善。"
],
"reviewer": "知护课程团队",
"review_status": "课程团队已复核",
"updated_at": "2026-10-31",
"node_slug": "rh_mdc_mcid",
"topic_slug": "rh_mdc_mcid"
},
{
"knowledge_id": "K-ADV-RH-002",
"node_id": "rehabilitation",
"title": "吞咽评估中的隐匿性误吸线索",
"claim": "没有咳嗽不能排除误吸。进食后湿性嗓音、呼吸频率增加、血氧变化、发热或反复呼吸道问题可提示风险，应停止不安全试验并启动专业吞咽评估。",
"source": "Physical Rehabilitation",
"source_location": "Dysphagia assessment and management",
"source_url": "",
"source_note": "课程团队复核的吞咽康复知识点",
"version": "7th ed.",
"scope": "rehabilitation·吞咽安全",
"exceptions": "单一血氧变化不能独立确诊误吸。",
"misconceptions": [
"不咳嗽等于无误吸",
"仰头喝水适合所有患者"
],
"lay_terms": [
"有些误吸不会咳出来，还要看声音、呼吸和进食后的变化。"
],
"reviewer": "知护课程团队",
"review_status": "课程团队已复核",
"updated_at": "2026-10-31",
"node_slug": "rh_silent_aspiration",
"topic_slug": "rh_silent_aspiration"
},
{
"knowledge_id": "K-ADV-RH-003",
"node_id": "rehabilitation",
"title": "训练获益与代价的综合判断",
"claim": "训练效果不能只看距离、次数或负荷增加，还需同时评估症状、生命体征、恢复时间、动作质量和次日反应；性能提高但代价显著增加时需调整剂量和进阶条件。",
"source": "ACSM's Guidelines for Exercise Testing and Prescription",
"source_location": "Exercise monitoring and progression",
"source_url": "",
"source_note": "课程团队复核的运动处方知识点",
"version": "11th ed.",
"scope": "rehabilitation·训练剂量",
"exceptions": "具体停止阈值按疾病、医嘱和机构流程。",
"misconceptions": [
"完成更多一定更好",
"训练后恢复时间不重要"
],
"lay_terms": [
"练得更多不一定更有效，还要看身体付出的代价。"
],
"reviewer": "知护课程团队",
"review_status": "课程团队已复核",
"updated_at": "2026-10-31",
"node_slug": "rh_benefit_burden",
"topic_slug": "rh_benefit_burden"
},
{
"knowledge_id": "K-ADV-HM-001",
"node_id": "health_management",
"title": "筛查中的阳性预测值",
"claim": "阳性预测值受敏感度、特异度和患病率共同影响。低患病率人群即使采用敏感度和特异度较高的筛查，也可能产生较多假阳性，因此阳性结果通常需要确认性流程。",
"source": "Modern Epidemiology",
"source_location": "Screening and predictive values",
"source_url": "",
"source_note": "课程团队复核的流行病学知识点",
"version": "4th ed.",
"scope": "health_management·筛查评价",
"exceptions": "不能把筛查阳性直接当作疾病确诊。",
"misconceptions": [
"特异度90%等于阳性者90%患病",
"忽略基线患病率"
],
"lay_terms": [
"在人群中疾病很少见时，筛查阳性里可能有不少是假阳性。"
],
"reviewer": "知护课程团队",
"review_status": "课程团队已复核",
"updated_at": "2026-10-31",
"node_slug": "hm_ppv_prevalence",
"topic_slug": "hm_ppv_prevalence"
},
{
"knowledge_id": "K-ADV-HM-002",
"node_id": "health_management",
"title": "绝对效应、相对效应与NNT",
"claim": "绝对风险降低=对照组风险-干预组风险，NNT=1/绝对风险降低（用小数）。相对效应可显得很大，但决策还需同时展示基线风险、绝对获益、伤害和随访时间。",
"source": "Modern Epidemiology",
"source_location": "Measures of effect",
"source_url": "",
"source_note": "课程团队复核的流行病学知识点",
"version": "4th ed.",
"scope": "health_management·干预评价",
"exceptions": "NNT需说明结局和时间范围。",
"misconceptions": [
"相对降低40%等于绝对降低40个百分点",
"NNT不需要时间范围"
],
"lay_terms": [
"要说明一百人中实际少发生多少例，而不只说相对下降百分比。"
],
"reviewer": "知护课程团队",
"review_status": "课程团队已复核",
"updated_at": "2026-10-31",
"node_slug": "hm_arr_nnt",
"topic_slug": "hm_arr_nnt"
},
{
"knowledge_id": "K-ADV-HM-003",
"node_id": "health_management",
"title": "失访、选择偏倚与混杂",
"claim": "高风险者更易失访会使项目效果看起来更好；参与者自行选择干预且基线健康意识不同会产生选择偏倚和混杂。应比较基线特征、分析失访原因并进行调整或敏感性分析。",
"source": "Modern Epidemiology",
"source_location": "Selection bias and confounding",
"source_url": "",
"source_note": "课程团队复核的流行病学知识点",
"version": "4th ed.",
"scope": "health_management·项目评价",
"exceptions": "样本量增大不能自动消除系统性偏倚。",
"misconceptions": [
"删除失访者就没有偏倚",
"大样本必然因果可靠"
],
"lay_terms": [
"留下来的人和退出的人可能不同，会让结果看起来比实际更好。"
],
"reviewer": "知护课程团队",
"review_status": "课程团队已复核",
"updated_at": "2026-10-31",
"node_slug": "hm_bias_confounding",
"topic_slug": "hm_bias_confounding"
},
{
"knowledge_id": "K-RH-COURSE-001",
"node_id": "rehabilitation",
"title": "康复评定的标准化与可比性",
"claim": "康复评定需固定工具版本、指导语、体位、辅助具和测试时点，记录症状与协助水平；条件改变时不能把分数差直接解释为功能变化。",
"source": "《康复评定学》，人民卫生出版社",
"source_location": "康复评定总论",
"source_url": "",
"source_note": "课程团队复核教材知识点",
"version": "本科规划教材",
"scope": "rehabilitation·功能评定",
"exceptions": "急性恶化时先处理安全问题。",
"misconceptions": [
"量表分数等于诊断",
"不同条件下分数可直接比较"
],
"lay_terms": [
"两次评定要尽量在相同条件下做。"
],
"reviewer": "知护课程团队",
"review_status": "课程团队已复核",
"updated_at": "2026-10-31",
"node_slug": "rh_assessment_standard",
"topic_slug": "rh_assessment_standard"
},
{
"knowledge_id": "K-RH-COURSE-002",
"node_id": "rehabilitation",
"title": "运动疗法的剂量与进阶",
"claim": "训练剂量需结合频率、强度、时间、方式和个体耐受制定；进阶依据应同时包含动作质量、生命体征、症状和恢复时间，而非只增加次数。",
"source": "《运动疗法技术学》，人民卫生出版社",
"source_location": "运动处方与训练进阶",
"source_url": "",
"source_note": "课程团队复核教材知识点",
"version": "本科规划教材",
"scope": "rehabilitation·运动疗法",
"exceptions": "疾病特异禁忌和医嘱优先。",
"misconceptions": [
"越累效果越好",
"只按次数进阶"
],
"lay_terms": [
"加量前要看动作质量和身体恢复。"
],
"reviewer": "知护课程团队",
"review_status": "课程团队已复核",
"updated_at": "2026-10-31",
"node_slug": "rh_exercise_dose",
"topic_slug": "rh_exercise_dose"
},
{
"knowledge_id": "K-RH-COURSE-003",
"node_id": "rehabilitation",
"title": "作业治疗的活动分析",
"claim": "作业治疗需分析活动目的、步骤、身体功能要求、认知要求、环境障碍和辅助程度，再通过分级活动促进真实生活参与。",
"source": "《作业治疗学》，人民卫生出版社",
"source_location": "活动分析与作业表现",
"source_url": "",
"source_note": "课程团队复核教材知识点",
"version": "本科规划教材",
"scope": "rehabilitation·作业治疗与日常生活活动",
"exceptions": "活动选择需符合患者目标和安全条件。",
"misconceptions": [
"作业治疗等于手工活动",
"只练单一肌力即可改善生活"
],
"lay_terms": [
"训练要对应患者真正想完成的生活活动。"
],
"reviewer": "知护课程团队",
"review_status": "课程团队已复核",
"updated_at": "2026-10-31",
"node_slug": "rh_occupational_analysis",
"topic_slug": "rh_occupational_analysis"
},
{
"knowledge_id": "K-RH-COURSE-004",
"node_id": "rehabilitation",
"title": "吞咽康复的风险分层",
"claim": "吞咽康复先评估意识、呼吸稳定性、口腔控制、声音变化和误吸线索，再决定是否进行经口试验及是否需要仪器评估；无咳嗽不能排除误吸。",
"source": "《言语治疗学》，人民卫生出版社",
"source_location": "吞咽障碍评定与治疗",
"source_url": "",
"source_note": "课程团队复核教材知识点",
"version": "本科规划教材",
"scope": "rehabilitation·言语吞咽",
"exceptions": "呼吸不稳或明显误吸风险时停止经口试验。",
"misconceptions": [
"不咳就是安全",
"所有患者都适合喝水试验"
],
"lay_terms": [
"有些误吸不会咳，需要看更多表现。"
],
"reviewer": "知护课程团队",
"review_status": "课程团队已复核",
"updated_at": "2026-10-31",
"node_slug": "rh_dysphagia_risk",
"topic_slug": "rh_dysphagia_risk"
},
{
"knowledge_id": "K-RH-COURSE-005",
"node_id": "rehabilitation",
"title": "神经康复中的任务特异性训练",
"claim": "神经康复强调高质量、目标相关、重复且可进阶的任务练习，同时监测代偿、疲劳和安全；单纯被动活动不能替代主动任务训练。",
"source": "《神经康复学》，人民卫生出版社",
"source_location": "脑卒中康复原则",
"source_url": "",
"source_note": "课程团队复核教材知识点",
"version": "本科规划教材",
"scope": "rehabilitation·神经康复与卒中康复",
"exceptions": "急性神经症状变化需立即停止训练并转入急症评估。",
"misconceptions": [
"重复越多越好",
"代偿完成等于运动控制恢复"
],
"lay_terms": [
"训练要贴近真正想恢复的动作。"
],
"reviewer": "知护课程团队",
"review_status": "课程团队已复核",
"updated_at": "2026-10-31",
"node_slug": "rh_neuro_task_specific",
"topic_slug": "rh_neuro_task_specific"
},
{
"knowledge_id": "K-RH-COURSE-006",
"node_id": "rehabilitation",
"title": "心肺康复的监测与停止信号",
"claim": "心肺康复中同时监测症状、心率、血压、血氧和恢复过程；胸痛、明显呼吸困难、灌注异常或持续生命体征异常是停止并升级评估的信号。",
"source": "ACSM's Guidelines for Exercise Testing and Prescription",
"source_location": "Exercise testing safety",
"source_url": "",
"source_note": "课程团队复核专业教材知识点",
"version": "11th ed.",
"scope": "rehabilitation·心肺康复",
"exceptions": "具体阈值按疾病、医嘱和机构流程。",
"misconceptions": [
"只有心率过快才停止",
"休息后未缓解仍继续低强度"
],
"lay_terms": [
"不只看心率，也要看胸闷、呼吸和恢复情况。"
],
"reviewer": "知护课程团队",
"review_status": "课程团队已复核",
"updated_at": "2026-10-31",
"node_slug": "rh_cardiopulmonary_stop",
"topic_slug": "rh_cardiopulmonary_stop"
},
{
"knowledge_id": "K-RH-COURSE-007",
"node_id": "rehabilitation",
"title": "肌骨康复的症状反应与负荷管理",
"claim": "肌骨康复需结合疼痛性质、神经症状、功能限制和负荷后24小时反应调整训练；出现进行性神经缺损或系统性警示时停止常规训练并转介。",
"source": "《肌肉骨骼康复学》，人民卫生出版社",
"source_location": "肌骨功能评定与负荷管理",
"source_url": "",
"source_note": "课程团队复核教材知识点",
"version": "本科规划教材",
"scope": "rehabilitation·肌骨康复与疼痛功能",
"exceptions": "红旗征象优先医学评估。",
"misconceptions": [
"疼痛都应完全避免活动",
"短时完成动作即可持续加量"
],
"lay_terms": [
"要看训练后一天的反应再决定是否加量。"
],
"reviewer": "知护课程团队",
"review_status": "课程团队已复核",
"updated_at": "2026-10-31",
"node_slug": "rh_msk_load",
"topic_slug": "rh_msk_load"
},
{
"knowledge_id": "K-HM-COURSE-001",
"node_id": "health_management",
"title": "流行病学中的关联与因果",
"claim": "观察到关联不等于因果；需评估时间顺序、选择偏倚、信息偏倚、混杂和替代解释，并结合研究设计与敏感性分析。",
"source": "Modern Epidemiology",
"source_location": "Causal inference and bias",
"source_url": "",
"source_note": "课程团队复核专业教材知识点",
"version": "4th ed.",
"scope": "health_management·流行病学偏倚与因果",
"exceptions": "单一统计显著性不能证明因果。",
"misconceptions": [
"相关即因果",
"大样本消除系统偏倚"
],
"lay_terms": [
"两件事一起出现，不一定是一件导致另一件。"
],
"reviewer": "知护课程团队",
"review_status": "课程团队已复核",
"updated_at": "2026-10-31",
"node_slug": "hm_epidemiology_causality",
"topic_slug": "hm_epidemiology_causality"
},
{
"knowledge_id": "K-HM-COURSE-002",
"node_id": "health_management",
"title": "置信区间与估计精度",
"claim": "置信区间同时反映效应方向和估计精度；区间宽提示不确定性较大。不能仅依据P值判断实际意义，应结合效应量、区间和临床或管理重要性。",
"source": "《卫生统计学》，人民卫生出版社",
"source_location": "参数估计与假设检验",
"source_url": "",
"source_note": "课程团队复核教材知识点",
"version": "本科规划教材",
"scope": "health_management·卫生统计分析效应量置信区间",
"exceptions": "不同效应指标的无效值不同。",
"misconceptions": [
"P小等于效应大",
"区间包含的每个值概率相同"
],
"lay_terms": [
"不仅要看有没有差异，还要看差异多大、估计有多准。"
],
"reviewer": "知护课程团队",
"review_status": "课程团队已复核",
"updated_at": "2026-10-31",
"node_slug": "hm_ci_precision",
"topic_slug": "hm_ci_precision"
},
{
"knowledge_id": "K-HM-COURSE-003",
"node_id": "health_management",
"title": "多因素健康风险评估",
"claim": "健康风险评估应明确目标人群、时间范围、预测结局、变量定义和模型适用人群；风险分数用于分层和沟通，不等同于个体确定诊断。",
"source": "《健康管理学》，人民卫生出版社",
"source_location": "健康风险评估",
"source_url": "",
"source_note": "课程团队复核教材知识点",
"version": "本科规划教材",
"scope": "health_management·健康风险评估",
"exceptions": "模型外人群使用前需验证。",
"misconceptions": [
"风险高等于已经患病",
"模型在所有人群通用"
],
"lay_terms": [
"风险分数表示未来可能性，不是已经确诊。"
],
"reviewer": "知护课程团队",
"review_status": "课程团队已复核",
"updated_at": "2026-10-31",
"node_slug": "hm_risk_model",
"topic_slug": "hm_risk_model"
},
{
"knowledge_id": "K-HM-COURSE-004",
"node_id": "health_management",
"title": "健康教育中的行为改变计划",
"claim": "有效健康教育需识别知识、动机、能力、环境和资源障碍，与服务对象共同制定具体可执行目标，并通过回示和随访验证，而非单向灌输。",
"source": "《健康教育与健康促进》，人民卫生出版社",
"source_location": "行为改变理论与干预",
"source_url": "",
"source_note": "课程团队复核教材知识点",
"version": "本科规划教材",
"scope": "health_management·健康教育与行为改变",
"exceptions": "目标需尊重自主选择和现实资源。",
"misconceptions": [
"讲过等于学会",
"不执行就是态度差"
],
"lay_terms": [
"计划要能在真实生活里做到，还要确认对方理解。"
],
"reviewer": "知护课程团队",
"review_status": "课程团队已复核",
"updated_at": "2026-10-31",
"node_slug": "hm_behavior_change",
"topic_slug": "hm_behavior_change"
},
{
"knowledge_id": "K-HM-COURSE-005",
"node_id": "health_management",
"title": "慢病管理的连续照护闭环",
"claim": "慢病管理包括风险分层、目标协商、规范记录、随访频率、异常升级、资源转介和结果回收；仅完成一次宣教或一次测量不构成管理闭环。",
"source": "《健康管理学》，人民卫生出版社",
"source_location": "慢性病健康管理",
"source_url": "",
"source_note": "课程团队复核教材知识点",
"version": "本科规划教材",
"scope": "health_management·慢病管理与随访",
"exceptions": "急性危险信号优先急症处置。",
"misconceptions": [
"一次筛查等于完成管理",
"只统计随访次数"
],
"lay_terms": [
"管理要持续跟踪，异常后还要确认是否得到处理。"
],
"reviewer": "知护课程团队",
"review_status": "课程团队已复核",
"updated_at": "2026-10-31",
"node_slug": "hm_chronic_loop",
"topic_slug": "hm_chronic_loop"
},
{
"knowledge_id": "K-HM-COURSE-006",
"node_id": "health_management",
"title": "卫生项目的过程、结果与影响评价",
"claim": "项目评价应区分投入、活动、覆盖、过程质量、近期结果和长期影响，并预先定义指标、比较策略与数据来源；仅报告参与人数不能证明项目有效。",
"source": "《卫生事业管理学》，人民卫生出版社",
"source_location": "卫生项目管理与评价",
"source_url": "",
"source_note": "课程团队复核教材知识点",
"version": "本科规划教材",
"scope": "health_management·卫生项目管理项目评价干预评价",
"exceptions": "归因长期影响需适当对照和偏倚控制。",
"misconceptions": [
"覆盖率高等于效果好",
"满意度等于健康结局"
],
"lay_terms": [
"参加的人多不等于健康真的改善。"
],
"reviewer": "知护课程团队",
"review_status": "课程团队已复核",
"updated_at": "2026-10-31",
"node_slug": "hm_program_evaluation",
"topic_slug": "hm_program_evaluation"
},
{
"knowledge_id": "K-HM-COURSE-007",
"node_id": "health_management",
"title": "健康数据质量与可追溯性",
"claim": "健康信息管理需保证定义一致、来源可追溯、时间戳完整、缺失和更正有记录，并通过逻辑校验识别异常；不得为提高完成率代填或静默覆盖原始数据。",
"source": "《卫生信息管理学》，人民卫生出版社",
"source_location": "健康信息质量管理",
"source_url": "",
"source_note": "课程团队复核教材知识点",
"version": "本科规划教材",
"scope": "health_management·健康信息与数据质量",
"exceptions": "隐私保护和最小必要原则贯穿采集、使用和保存。",
"misconceptions": [
"缺失值可随意补齐",
"覆盖错误记录无需留痕"
],
"lay_terms": [
"数据改过什么、为什么改，都要能够追溯。"
],
"reviewer": "知护课程团队",
"review_status": "课程团队已复核",
"updated_at": "2026-10-31",
"node_slug": "hm_data_quality",
"topic_slug": "hm_data_quality"
},
{
"knowledge_id": "K-BP-001",
"node_id": "measurement_device_posture",
"title": "血压计选择与测量姿势",
"claim": "家庭监测宜使用经过验证的上臂式电子血压计和合适袖带；测量时坐位安静休息，背部有支撑，双脚平放，手臂与心脏大致同高。",
"source": "2019 中国家庭血压监测指南",
"source_location": "《中华高血压杂志》2019,27(8):708-711（《中国循环杂志》2019,34(7):635-639 同步刊出），血压计的选择与测量姿势部分",
"source_url": "https://www.cnr.cn/shanghai/tt/20190421/t20190421_524585496.shtml",
"source_note": "指南原文见上列期刊；URL 为可公开访问的指南发布报道，含同版要点。",
"version": "2019",
"scope": "成人家庭血压监测教学",
"exceptions": "特殊体型、心律失常、无法保持标准体位等情况需由专业人员个体化指导。",
"misconceptions": [
"腕式或指式设备与经验证的上臂式设备可随意互换",
"边说话边测量不会影响结果"
],
"lay_terms": [
"先坐稳、别说话，让胳膊放松到和心口差不多高。"
],
"reviewer": null,
"review_status": "课程团队维护",
"updated_at": "2026-10-29"
},
{
"knowledge_id": "K-BP-002",
"node_id": "measurement_schedule_repeat",
"title": "测量时段、次数与记录",
"claim": "家庭测量应在相对固定条件下进行；每个时段连续测量 2—3 次、间隔约 1 分钟并完整记录。初始评估或治疗早期通常需要连续多日早晚测量，稳定后可降低频率。",
"source": "2019 中国家庭血压监测指南",
"source_location": "《中华高血压杂志》2019,27(8):708-711（《中国循环杂志》2019,34(7):635-639 同步刊出），家庭血压监测频次与时间部分",
"source_url": "https://www.cnr.cn/shanghai/tt/20190421/t20190421_524585496.shtml",
"source_note": "指南原文见上列期刊；URL 为可公开访问的指南发布报道，含同版要点。",
"version": "2019",
"scope": "成人家庭血压监测教学",
"exceptions": "具体频率应结合课程要求和医务人员建议；精神高度焦虑者不宜无目的频繁测量。",
"misconceptions": [
"只测一次即可代表长期状态",
"只记录看起来正常的读数"
],
"lay_terms": [
"同一时间连测几次并都记下来，比只看一次更有参考价值。"
],
"reviewer": null,
"review_status": "课程团队维护",
"updated_at": "2026-10-29"
},
{
"knowledge_id": "K-BP-003",
"node_id": "reading_interpretation",
"title": "读数解释与趋势记录",
"claim": "家庭血压记录应保留日期、时间、收缩压、舒张压和心率等信息。解释时应结合连续记录与测量条件，不用单次波动自行诊断或调整治疗。",
"source": "中国高血压健康管理规范（2019）",
"source_location": "第 2 部分 血压的筛查与风险评估；(三) 血压测量规范·家庭自测血压",
"source_url": "https://csc.cma.org.cn/art/2020/5/8/art_619_34440.html",
"source_note": "国家心血管病中心等编制，人民卫生出版社 2019 年 12 月出版；《中华心血管病杂志》2020,48(1):10-46，DOI:10.3760/cma.j.issn.0253-3758.2020.01.004。URL 为学会公开的规范全文页。",
"version": "2019",
"scope": "成人家庭血压记录教学",
"exceptions": "伴明显不适或出现课程知识卡定义的警示情形时，不能仅等待长期平均值。",
"misconceptions": [
"一次高就能自行确诊",
"一次正常就说明以后都正常"
],
"lay_terms": [
"一次读数像一张照片，连续规范记录更像一段录像。"
],
"reviewer": null,
"review_status": "课程团队维护",
"updated_at": "2026-10-29"
},
{
"knowledge_id": "K-BP-004",
"node_id": "medication_boundary",
"title": "用药沟通与专业边界",
"claim": "健康教育可以了解服药情况和顾虑，提醒按医嘱执行并建议向有资质的医务人员咨询；学生和本工具不得建议具体药物、剂量，也不得建议自行停药、换药或调药。",
"source": "国家卫生健康委 2019 年全国高血压日宣传要点",
"source_location": "附件《\"全国高血压日\"宣传要点》·高血压的诊断标准与治疗部分",
"source_url": "https://www.nhc.gov.cn/jkj/c100063/201909/c07412a7f19b474caffbbed24c3a5c58.shtml",
"source_note": "国家卫生健康委疾控局 2019 年 9 月 12 日发布，主题\"18岁以上知晓血压\"。",
"version": "2019",
"scope": "健康教育训练中的执业边界",
"exceptions": "真实医疗决策一律分流至具备执业资质的医务人员。",
"misconceptions": [
"学生可以根据一组读数指导减药",
"保健品可替代正规治疗"
],
"lay_terms": [
"先别自己改药，把记录和顾虑一起带给医生讨论。"
],
"reviewer": null,
"review_status": "课程团队维护",
"updated_at": "2026-10-29"
},
{
"knowledge_id": "K-BP-005",
"node_id": "risk_referral",
"title": "警示信息与及时转介",
"claim": "训练中发现病例预设的警示读数、明显不适或情况持续加重时，应停止一般性健康教育，建议及时联系医务人员；紧急情况立即拨打 120。不得只给出普通复测建议。",
"source": "基层医疗卫生机构高血压防治管理标准 WS/T 872—2025",
"source_location": "第 5 章 血压测量；8.4.2 转诊；附录 A 管理流程；附录 表 2 健康教育内容",
"source_url": "https://www.nhc.gov.cn/fzs/c100048/202509/2f3f7cce449145f8b361e70b3ed4ae9a/files/WS%20T%20872%E2%80%942025-20250930105429913.pdf",
"source_note": "国卫通〔2025〕13 号，2025-09-19 发布，2026-03-01 实施；URL 为国家卫生健康委官网标准全文 PDF。",
"version": "2025（2026-03-01 实施）",
"scope": "合成病例中的风险识别教学",
"exceptions": "本卡不用于真实个体诊断；数值阈值仅用于合成病例教学，不作为真实诊断依据。",
"misconceptions": [
"所有异常都只需在家继续观察",
"语气委婉即可忽略转介"
],
"lay_terms": [
"这组情况不能只靠在家观察，建议尽快联系医务人员；如果情况紧急，请立即拨打 120。"
],
"reviewer": null,
"review_status": "课程团队维护",
"updated_at": "2026-10-29"
},
{
"knowledge_id": "K-BP-006",
"node_id": "clinic_home_difference",
"title": "诊室血压与家庭血压的差异",
"claim": "诊室测量与家庭测量的条件、意义和参考标准都不同：家庭血压常用参考阈值为 ≥135/85 mmHg，与诊室常用的 140/90 mmHg 并非同一标准。两者互补而非互相替代，不能凭单次读数在两套标准之间互换下结论。",
"source": "2019 中国家庭血压监测指南、中国高血压健康管理规范（2019）",
"source_location": "《中华高血压杂志》2019,27(8):708-711（《中国循环杂志》2019,34(7):635-639 同步刊出）家庭血压诊断标准部分；《中国高血压健康管理规范（2019）》第 2 部分 血压的筛查与风险评估·(三) 血压测量规范",
"source_url": "https://www.cnr.cn/shanghai/tt/20190421/t20190421_524585496.shtml",
"source_note": "指南原文见上列期刊；URL 为可公开访问的指南发布报道，含同版要点。规范全文见 https://csc.cma.org.cn/art/2020/5/8/art_619_34440.html 。",
"version": "2019",
"scope": "成人诊室与家庭血压比较教学",
"exceptions": "学生不得据此对真实个体下诊断或分期结论；具体判断一律交由具备执业资质的医务人员。",
"misconceptions": [
"家里测出来不高就等于没有问题",
"在医院测高只是紧张，可以直接按没事处理"
],
"lay_terms": [
"在家测和来医院测不是一回事，两处的标准也不一样；把完整的家庭记录带给医生一起看，比只说紧张不紧张更可靠。"
],
"reviewer": null,
"review_status": "课程团队维护",
"updated_at": "2026-10-29"
},
{
"knowledge_id": "K-COM-001",
"node_id": "communication_understanding_action",
"title": "顾虑回应、理解确认与行动协商",
"claim": "训练中的沟通应先询问具体顾虑，把模糊回答追问为事实，使用通俗表达，再通过复述或具体问题确认理解，并共同商定可执行的下一步。",
"source": "知护课程团队教学设计 v1.0",
"source_location": "课程自研沟通方法，未引用外部权威来源",
"source_url": null,
"source_note": "本卡为课程自研内容，用于训练沟通行为，不作为临床沟通规范依据。",
"version": "1.0",
"scope": "课程内沟通能力训练",
"exceptions": "这是课程行为锚点，不是医学诊断标准。",
"misconceptions": [
"只问‘懂了吗’就完成理解确认",
"训斥能提高依从性"
],
"lay_terms": [
"您最担心的是哪一件事？我们一起定一个您能做到的下一步。"
],
"reviewer": "课程团队待确认",
"review_status": "课程团队维护",
"updated_at": "2026-10-29"
},
{
"knowledge_id": "K-DM-001",
"node_id": "diabetes_continuous_management",
"title": "糖尿病连续管理与复诊",
"claim": "糖尿病管理需要连续记录、按医嘱用药、定期复诊和并发症筛查；控制不稳定或基层不适合继续处理时，应转诊至具备条件的医疗机构。",
"source": "健康中国行动 糖尿病防治行动实施方案 2024至2030年",
"source_location": "国家卫生健康委，糖尿病筛查管理、并发症筛查和分级诊疗部分",
"source_url": "https://www.nhc.gov.cn/wjw/c100375/202407/752d85bddda5420eb1c1fe3c2772a100.shtml",
"source_note": "教学中用于说明连续管理和规范转诊，不用于替代个体诊疗。",
"version": "2024",
"scope": "成人2型糖尿病健康管理教学",
"exceptions": "具体监测频次、目标值和治疗调整由有资质的医务人员结合个体情况决定。",
"misconceptions": [
"没有明显不适就不需要复诊",
"一次家庭记录可以替代规范评估"
],
"lay_terms": [
"糖尿病管理看的是一段时间的记录和定期检查，不是只看某一天。"
],
"reviewer": null,
"review_status": "课程团队维护",
"updated_at": "2026-10-30"
},
{
"knowledge_id": "K-DM-002",
"node_id": "diabetes_medication_and_screening_boundary",
"title": "糖尿病用药与筛查边界",
"claim": "糖尿病患者应遵医嘱用药；出现不良反应或需要调整用药时应及时与医生沟通，并按计划进行足病、视网膜和肾脏等慢性并发症筛查。",
"source": "国家卫生健康委 2024年联合国糖尿病日宣传核心信息",
"source_location": "糖尿病患者自我健康管理部分",
"source_url": "https://www.nhc.gov.cn/ylyjs/zcwj/202411/b3aa2667daf74a4da8f007114f707f1e.shtml",
"source_note": "仅用于用药边界和健康管理教学。",
"version": "2024",
"scope": "成人糖尿病随访与健康教育",
"exceptions": "不得根据训练对话推荐具体药物、剂量或替代疗法。",
"misconceptions": [
"保健品可以替代正规治疗",
"感觉良好就能自行减药"
],
"lay_terms": [
"要不要调药需要和医生商量，别自己减、停或换。"
],
"reviewer": null,
"review_status": "课程团队维护",
"updated_at": "2026-10-30"
},
{
"knowledge_id": "K-COPD-001",
"node_id": "copd_inhaler_technique",
"title": "慢阻肺吸入装置教学与回示",
"claim": "使用吸入治疗时，需要提供装置操作教育、现场示范并定期复核技术和依从性；在认为治疗效果不足前，应先检查装置使用方法和依从性。",
"source": "GOLD 2026 Report and Pocket Guide",
"source_location": "Managing inhaled therapy and follow-up",
"source_url": "https://goldcopd.org/2026-gold-report-and-pocket-guide/",
"source_note": "不同装置步骤不同，训练病例只练习询问、演示和回示流程，不生成具体装置说明书之外的操作。",
"version": "2026",
"scope": "慢阻肺吸入装置沟通训练",
"exceptions": "具体装置用法以产品说明书和医务人员现场指导为准。",
"misconceptions": [
"患者说会用就不需要演示",
"效果不好一定是疾病加重"
],
"lay_terms": [
"先请您按平时的方法做一遍，我们一起看看哪一步最容易漏。"
],
"reviewer": null,
"review_status": "课程团队维护",
"updated_at": "2026-10-30"
},
{
"knowledge_id": "K-COPD-002",
"node_id": "copd_exacerbation_referral",
"title": "慢阻肺急性加重线索与转诊",
"claim": "随访发现呼吸困难、喘息、胸闷或咳嗽咳痰明显加重，以及意识不清、口唇紫绀等表现时，应识别急性加重风险并及时转诊。",
"source": "慢性阻塞性肺疾病患者健康服务规范",
"source_location": "随访评估与分类干预部分",
"source_url": "https://www.nhc.gov.cn/cms-search/downFiles/89d61f9734da4d2da0445d64a9a153a8.pdf",
"source_note": "训练只要求识别病例预设警示信息和及时转介，不要求学生远程确诊。",
"version": "2025",
"scope": "基层慢阻肺随访教学",
"exceptions": "真实个体出现明显呼吸困难或紧急危险时应立即联系急救和现场专业人员。",
"misconceptions": [
"继续一般宣教可以替代急性风险处理",
"先自行调整药物再观察"
],
"lay_terms": [
"这次变化和您平时不一样，不能只在家等，需要尽快让医务人员评估。"
],
"reviewer": null,
"review_status": "课程团队维护",
"updated_at": "2026-10-30"
},
{
"knowledge_id": "K-STROKE-001",
"node_id": "stroke_rehabilitation_goal_and_safety",
"title": "卒中康复目标与居家安全",
"claim": "卒中康复应根据患者功能、个人目标和照护条件进行个体化、多专业协作，并关注跌倒预防、日常活动和照护者支持。",
"source": "American Stroke Association 2026 Guideline for Adult Stroke Rehabilitation and Recovery",
"source_location": "Stroke rehabilitation overview and fall prevention",
"source_url": "https://www.stroke.org/en/life-after-stroke/stroke-rehab",
"source_note": "用于康复沟通、目标协商和安全教育，不生成个体化运动处方。",
"version": "2026",
"scope": "成人卒中后康复沟通教学",
"exceptions": "训练强度和辅助器具需由康复专业人员现场评估。",
"misconceptions": [
"所有卒中患者使用同一套训练计划",
"只追求动作次数而不关注安全和个人目标"
],
"lay_terms": [
"先从您最想恢复的生活动作出发，再把安全措施和练习步骤一起定下来。"
],
"reviewer": null,
"review_status": "课程团队维护",
"updated_at": "2026-10-30"
},
{
"knowledge_id": "K-STROKE-002",
"node_id": "stroke_warning_emergency",
"title": "中风120与紧急分流",
"claim": "突然出现面部不对称、单侧手臂无力或言语不清等任一卒中警示表现时，应记录症状出现时间并立即拨打120，不等待症状自行消失，也不在未明确诊断前自行用药。",
"source": "国家卫生健康委 2025年世界卒中日新闻发布会",
"source_location": "中风120识别和院前处置部分",
"source_url": "https://www.nhc.gov.cn/xcs/c100122/202510/13e1060bbb0a44ed9c1bc31bc326aadd.shtml",
"source_note": "用于合成病例的紧急识别训练。",
"version": "2025",
"scope": "脑卒中警示表现识别教学",
"exceptions": "不根据远程描述区分脑出血或脑梗死，不提供自行用药建议。",
"misconceptions": [
"休息后好转就不必就医",
"先自行服药再决定是否呼救"
],
"lay_terms": [
"脸歪、胳膊没力或说话不清，任何一个突然出现都要马上打120。"
],
"reviewer": null,
"review_status": "课程团队维护",
"updated_at": "2026-10-30"
},
{
"knowledge_id": "K-CLIN-101",
"node_id": "clinical_medicine",
"title": "主诉提炼与时间轴记录",
"claim": "主诉应使用患者自己的话概括最主要的不适与持续时间，一般不超过二十字；现病史按起病时间、诱因、演变、伴随症状、诊治经过和目前状态的顺序展开，不把推断写进主诉。",
"source": "《诊断学》（第9版，人民卫生出版社）",
"source_location": "第三篇 病史采集：主诉与现病史",
"source_url": "",
"source_note": "本卡出处已由课程团队核对为真实出版物/行业规范，尚未补公开访问链接。",
"version": "第9版 2018",
"scope": "clinical_medicine·病史采集与体格信息",
"exceptions": "主诉以患者陈述为准，不得替患者改写症状性质，也不得据此自行作出诊断。",
"misconceptions": [
"把检查结果或自己的推断写成主诉",
"只记录最痛的一点，忽略起病时间和演变过程"
],
"lay_terms": [
"您先用自己的话说说，最难受的是哪儿、从什么时候开始的。"
],
"reviewer": "知护课程团队（已复核来源）",
"review_status": "课程团队已复核",
"updated_at": "2026-10-30",
"node_slug": "clin_history_chief_complaint",
"topic_slug": "clin_history_chief_complaint"
},
{
"knowledge_id": "K-CLIN-102",
"node_id": "clinical_medicine",
"title": "症状特征的逐项追问要点",
"claim": "询问症状应逐项细化部位、性质、程度、诱因、缓解因素、放射方向与持续时间，并记录症状对睡眠和日常活动的影响，不能只问一句疼不疼就结束。",
"source": "《诊断学》（第9版，人民卫生出版社）",
"source_location": "第三篇 病史采集：症状问诊要点",
"source_url": "",
"source_note": "本卡出处已由课程团队核对为真实出版物/行业规范，尚未补公开访问链接。",
"version": "第9版 2018",
"scope": "clinical_medicine·病史采集与体格信息",
"exceptions": "追问用于获取信息，不用于向患者暗示某个诊断方向。",
"misconceptions": [
"只记“腹痛三天”这类笼统描述",
"把患者用的俗语直接当作医学症状名"
],
"lay_terms": [
"我再细问几句：是哪种疼法，什么情况下更重、什么情况下能缓一缓？"
],
"reviewer": "知护课程团队（已复核来源）",
"review_status": "课程团队已复核",
"updated_at": "2026-10-30",
"node_slug": "clin_history_symptom_profile",
"topic_slug": "clin_history_symptom_profile"
},
{
"knowledge_id": "K-CLIN-103",
"node_id": "clinical_medicine",
"title": "既往史与长期用药的核对",
"claim": "应逐项询问慢性病史、手术外伤、输血、传染病史以及目前长期使用的药物和保健品，并核对患者实际服用情况与病历记录是否一致。",
"source": "《诊断学》（第9版，人民卫生出版社）",
"source_location": "第三篇 病史采集：既往史",
"source_url": "",
"source_note": "本卡出处已由课程团队核对为真实出版物/行业规范，尚未补公开访问链接。",
"version": "第9版 2018",
"scope": "clinical_medicine·病史采集与体格信息",
"exceptions": "是否调整用药由具备资质的医师决定，学生只负责询问与记录。",
"misconceptions": [
"只问“有没有高血压糖尿病”而不问控制情况",
"默认病历上的药单就是患者真正在吃的药"
],
"lay_terms": [
"您现在每天固定吃的药都有哪些，能说说都是治什么的吗？"
],
"reviewer": "知护课程团队（已复核来源）",
"review_status": "课程团队已复核",
"updated_at": "2026-10-30",
"node_slug": "clin_history_past_medication",
"topic_slug": "clin_history_past_medication"
},
{
"knowledge_id": "K-CLIN-104",
"node_id": "clinical_medicine",
"title": "过敏史的规范记录方式",
"claim": "过敏史须记录可疑药物或食物名称、反应类型、发生时间和处理经过，不能只写“过敏体质”；确无过敏者应写明否认药物及食物过敏。",
"source": "《诊断学》（第9版，人民卫生出版社）",
"source_location": "第三篇 病史采集：个人史与过敏史",
"source_url": "",
"source_note": "本卡出处已由课程团队核对为真实出版物/行业规范，尚未补公开访问链接。",
"version": "第9版 2018",
"scope": "clinical_medicine·病史采集与体格信息",
"exceptions": "过敏的判断与用药选择由医师负责，学生不得据此自行推荐替代药物。",
"misconceptions": [
"把“青霉素过敏”写成“抗生素过敏”",
"患者说不清就空着不记录"
],
"lay_terms": [
"您以前吃药或打针后有没有起疹子、喘不上气或者肿起来过？"
],
"reviewer": "知护课程团队（已复核来源）",
"review_status": "课程团队已复核",
"updated_at": "2026-10-30",
"node_slug": "clin_history_allergy_record",
"topic_slug": "clin_history_allergy_record"
},
{
"knowledge_id": "K-CLIN-105",
"node_id": "clinical_medicine",
"title": "个人史与职业暴露的量化询问",
"claim": "吸烟应记录每日支数与吸烟年数，饮酒记录种类与频次，同时询问职业粉尘噪声接触、疫区旅居和不洁饮食史，为后续判断提供线索。",
"source": "《诊断学》（第9版，人民卫生出版社）",
"source_location": "第三篇 病史采集：个人史",
"source_url": "",
"source_note": "本卡出处已由课程团队核对为真实出版物/行业规范，尚未补公开访问链接。",
"version": "第9版 2018",
"scope": "clinical_medicine·病史采集与体格信息",
"exceptions": "询问烟酒史重在记录事实，不进行道德评判或强制劝诫。",
"misconceptions": [
"只问“抽烟吗”而不量化",
"忽略职业粉尘和旅居史"
],
"lay_terms": [
"您抽烟大概一天几支、抽了多少年？最近有没有去过外地或者接触粉尘的环境？"
],
"reviewer": "知护课程团队（已复核来源）",
"review_status": "课程团队已复核",
"updated_at": "2026-10-30",
"node_slug": "clin_history_social_exposure",
"topic_slug": "clin_history_social_exposure"
},
{
"knowledge_id": "K-CLIN-106",
"node_id": "clinical_medicine",
"title": "家族史的三代询问范围",
"claim": "家族史应询问三代直系亲属的重大疾病、发病年龄与死亡原因，对早发心血管病、肿瘤和遗传性疾病要追问具体年龄与亲属关系。",
"source": "《诊断学》（第9版，人民卫生出版社）",
"source_location": "第三篇 病史采集：家族史",
"source_url": "",
"source_note": "本卡出处已由课程团队核对为真实出版物/行业规范，尚未补公开访问链接。",
"version": "第9版 2018",
"scope": "clinical_medicine·病史采集与体格信息",
"exceptions": "家族史仅供评估风险参考，不得据此向患者预言其必然患病。",
"misconceptions": [
"只问父母不问祖辈和兄弟姐妹",
"听到“家里人得过”就不再追问年龄"
],
"lay_terms": [
"您父母、兄弟姐妹和祖辈里，有没有人得过心脏病、肿瘤或者糖尿病？大概多大年纪得的？"
],
"reviewer": "知护课程团队（已复核来源）",
"review_status": "课程团队已复核",
"updated_at": "2026-10-30",
"node_slug": "clin_history_family_tree",
"topic_slug": "clin_history_family_tree"
},
{
"knowledge_id": "K-CLIN-107",
"node_id": "clinical_medicine",
"title": "系统回顾的防遗漏作用",
"claim": "系统回顾应按一般情况、呼吸、循环、消化、泌尿、神经、血液内分泌等系统逐项筛查，主动询问患者未提及的乏力、盗汗、体重变化等症状。",
"source": "《诊断学》（第9版，人民卫生出版社）",
"source_location": "第三篇 病史采集：系统回顾",
"source_url": "",
"source_note": "本卡出处已由课程团队核对为真实出版物/行业规范，尚未补公开访问链接。",
"version": "第9版 2018",
"scope": "clinical_medicine·病史采集与体格信息",
"exceptions": "系统回顾用固定清单防漏，不取代针对主诉的深入追问。",
"misconceptions": [
"只围绕主诉提问，不问其他系统",
"把系统回顾当成走形式的勾选"
],
"lay_terms": [
"我再按几个方面过一遍，您最近有没有睡不好、出汗多、体重明显变化？"
],
"reviewer": "知护课程团队（已复核来源）",
"review_status": "课程团队已复核",
"updated_at": "2026-10-30",
"node_slug": "clin_history_review_systems",
"topic_slug": "clin_history_review_systems"
},
{
"knowledge_id": "K-CLIN-108",
"node_id": "clinical_medicine",
"title": "体格检查顺序与隐私保护",
"claim": "体格检查按视触叩听顺序进行，先健侧后患侧、先整体后局部；暴露范围只限于检查所需，并提前说明、提供遮挡和必要的第三人在场。",
"source": "《诊断学》（第9版，人民卫生出版社）",
"source_location": "第四篇 体格检查：基本方法与检查顺序",
"source_url": "",
"source_note": "本卡出处已由课程团队核对为真实出版物/行业规范，尚未补公开访问链接。",
"version": "第9版 2018",
"scope": "clinical_medicine·病史采集与体格信息",
"exceptions": "涉及隐私部位的检查须说明必要性并取得同意，必要时由同性别医护人员陪同。",
"misconceptions": [
"一上来就暴露全身体查",
"检查时不解释、不遮挡"
],
"lay_terms": [
"我要给您做个腹部检查，需要把衣服掀到这儿，我会拉好帘子，您看可以吗？"
],
"reviewer": "知护课程团队（已复核来源）",
"review_status": "课程团队已复核",
"updated_at": "2026-10-30",
"node_slug": "clin_exam_order_privacy",
"topic_slug": "clin_exam_order_privacy"
},
{
"knowledge_id": "K-CLIN-109",
"node_id": "clinical_medicine",
"title": "生命体征测量与记录规范",
"claim": "测量血压前应静坐休息五分钟、袖带与心脏同高，首诊测量双上臂并记录较高一侧；体温、脉搏、呼吸与血氧应在同一时点记录并注明体位与状态。",
"source": "中国高血压健康管理规范（2019）",
"source_location": "血压的筛查与风险评估：诊室血压测量规范",
"source_url": "https://csc.cma.org.cn/art/2020/5/8/art_619_34440.html",
"source_note": "用于诊室血压测量规范（静息、袖带位置、双上臂复测）教学；体温、脉搏等记录要求另参《诊断学》并按课程团队审定。",
"version": "2019",
"scope": "clinical_medicine·病史采集与体格信息",
"exceptions": "血压分级与处理由医师判断，学生不得据单次读数向患者下结论。",
"misconceptions": [
"刚爬完楼就测血压并当作基础值",
"只测一侧上臂、不复测异常值"
],
"lay_terms": [
"先坐五分钟再量，两只胳膊都量一下，我们看哪边高一些。"
],
"reviewer": "知护课程团队（已复核来源，链接已核实）",
"review_status": "课程团队已复核",
"updated_at": "2026-10-30",
"node_slug": "clin_exam_vital_signs",
"topic_slug": "clin_exam_vital_signs"
},
{
"knowledge_id": "K-CLIN-110",
"node_id": "clinical_medicine",
"title": "发热的热型与伴随线索",
"claim": "发热应询问起病缓急、最高体温与热型、有无畏寒寒战，以及伴随的咳嗽、尿频、皮疹和近期旅居、动物接触、免疫抑制状态，再决定检查方向。",
"source": "《诊断学》（第9版，人民卫生出版社）",
"source_location": "第二篇 常见症状：发热",
"source_url": "",
"source_note": "本卡出处已由课程团队核对为真实出版物/行业规范，尚未补公开访问链接。",
"version": "第9版 2018",
"scope": "clinical_medicine·常见症状综合分析",
"exceptions": "发热病因的判断与用药由具备资质的医师作出，学生只负责采集与记录。",
"misconceptions": [
"只问“烧到多少度”不问热型和伴随症状",
"把退热后体温正常当作病情好转的依据"
],
"lay_terms": [
"烧的时候有没有打冷战、出汗？最近有没有去过外地或者接触过动物？"
],
"reviewer": "知护课程团队（已复核来源）",
"review_status": "课程团队已复核",
"updated_at": "2026-10-30",
"node_slug": "clin_symptom_fever_pattern",
"topic_slug": "clin_symptom_fever_pattern"
},
{
"knowledge_id": "K-CLIN-111",
"node_id": "clinical_medicine",
"title": "胸痛的危险征象优先排查",
"claim": "胸痛问诊先确认是否为压榨样、是否向肩背下颌放射、有无出汗呼吸困难晕厥；活动诱发的持续胸痛应按高危处理，立即报告上级医师。",
"source": "《内科学》（第9版，人民卫生出版社）",
"source_location": "第三篇 循环系统疾病：胸痛与急性冠脉综合征",
"source_url": "",
"source_note": "本卡出处已由课程团队核对为真实出版物/行业规范，尚未补公开访问链接。",
"version": "第9版 2018",
"scope": "clinical_medicine·常见症状综合分析",
"exceptions": "胸痛病因需由具备资质的医师结合心电图、心肌损伤标志物等判断，学生不得向患者断言或排除。",
"misconceptions": [
"年轻人胸痛就先想到情绪因素",
"疼痛缓解就认为不必再做心电图"
],
"lay_terms": [
"这种压着疼、还往肩膀窜的感觉，我们要先当急事处理，马上给您做心电图。"
],
"reviewer": "知护课程团队（已复核来源）",
"review_status": "课程团队已复核",
"updated_at": "2026-10-30",
"node_slug": "clin_symptom_chest_pain",
"topic_slug": "clin_symptom_chest_pain"
},
{
"knowledge_id": "K-CLIN-112",
"node_id": "clinical_medicine",
"title": "呼吸困难的程度与体位线索",
"claim": "呼吸困难需询问起病方式、活动耐量下降程度、夜间阵发性发作与端坐呼吸，并观察患者说话能否成句、有无三凹征和口唇发绀。",
"source": "《内科学》（第9版，人民卫生出版社）",
"source_location": "第二篇 呼吸系统疾病：呼吸困难",
"source_url": "",
"source_note": "本卡出处已由课程团队核对为真实出版物/行业规范，尚未补公开访问链接。",
"version": "第9版 2018",
"scope": "clinical_medicine·常见症状综合分析",
"exceptions": "呼吸困难分级与氧疗方案由医师确定，学生不得自行调节氧流量。",
"misconceptions": [
"只问“喘不喘”不分程度",
"忽略夜间憋醒和垫高枕头睡觉的细节"
],
"lay_terms": [
"您现在说话能连成句吗？晚上会不会憋醒，得坐起来才舒服？"
],
"reviewer": "知护课程团队（已复核来源）",
"review_status": "课程团队已复核",
"updated_at": "2026-10-30",
"node_slug": "clin_symptom_dyspnea_grade",
"topic_slug": "clin_symptom_dyspnea_grade"
},
{
"knowledge_id": "K-CLIN-113",
"node_id": "clinical_medicine",
"title": "腹痛的定位与转移特点",
"claim": "腹痛应询问起始部位、是否转移、疼痛性质与放射方向以及与进食排便的关系；出现板状腹、反跳痛或血压下降须立即报告并禁食。",
"source": "《外科学》（第9版，人民卫生出版社）",
"source_location": "第三十四章 腹部外科：急腹症的诊断与鉴别",
"source_url": "",
"source_note": "本卡出处已由课程团队核对为真实出版物/行业规范，尚未补公开访问链接。",
"version": "第9版 2018",
"scope": "clinical_medicine·常见症状综合分析",
"exceptions": "是否手术及镇痛方案由具备资质的医师决定，学生不得自行给予止痛处理。",
"misconceptions": [
"肚子痛就先给热敷或止痛药",
"只问痛点不追问转移和放射"
],
"lay_terms": [
"一开始是哪儿疼，后来跑到别处去了吗？现在按下去松手会更疼吗？"
],
"reviewer": "知护课程团队（已复核来源）",
"review_status": "课程团队已复核",
"updated_at": "2026-10-30",
"node_slug": "clin_symptom_abdomen_pain",
"topic_slug": "clin_symptom_abdomen_pain"
},
{
"knowledge_id": "K-CLIN-114",
"node_id": "clinical_medicine",
"title": "头痛警示征象的识别与报告",
"claim": "突发雷击样头痛、伴发热颈强、新发神经功能缺损、五十岁后新发或进行性加重的头痛属于警示征象，应尽快安排进一步评估。",
"source": "《神经病学》（第8版，人民卫生出版社）",
"source_location": "头痛章节：继发性头痛的警示征象",
"source_url": "",
"source_note": "本卡出处已由课程团队核对为真实出版物/行业规范，尚未补公开访问链接。",
"version": "第8版 2018",
"scope": "clinical_medicine·常见症状综合分析",
"exceptions": "头痛病因与影像指征由具备资质的医师判断，学生不得向患者说明为普通头痛。",
"misconceptions": [
"把所有头痛都当作紧张性头痛",
"忽视突发最剧烈头痛和发热颈强"
],
"lay_terms": [
"这次头痛是不是突然几秒钟就到最厉害？有没有发烧、脖子发硬？"
],
"reviewer": "知护课程团队（已复核来源）",
"review_status": "课程团队已复核",
"updated_at": "2026-10-30",
"node_slug": "clin_symptom_headache_redflag",
"topic_slug": "clin_symptom_headache_redflag"
},
{
"knowledge_id": "K-CLIN-115",
"node_id": "clinical_medicine",
"title": "咳嗽咳痰的病程与性状",
"claim": "咳嗽需区分急性与慢性病程、昼夜规律、痰量与颜色气味，并追问咯血、盗汗、吸烟史和职业粉尘接触，痰中带血应如实记录并报告。",
"source": "《内科学》（第9版，人民卫生出版社）",
"source_location": "第二篇 呼吸系统疾病：咳嗽与咳痰",
"source_url": "",
"source_note": "本卡出处已由课程团队核对为真实出版物/行业规范，尚未补公开访问链接。",
"version": "第9版 2018",
"scope": "clinical_medicine·常见症状综合分析",
"exceptions": "咳嗽病因判断与抗感染治疗由具备资质的医师决定。",
"misconceptions": [
"咳嗽就建议吃消炎药",
"忽略痰中带血和体重下降"
],
"lay_terms": [
"痰是什么颜色、有没有血丝？咳了多久了，晚上会不会更厉害？"
],
"reviewer": "知护课程团队（已复核来源）",
"review_status": "课程团队已复核",
"updated_at": "2026-10-30",
"node_slug": "clin_symptom_cough_sputum",
"topic_slug": "clin_symptom_cough_sputum"
},
{
"knowledge_id": "K-CLIN-116",
"node_id": "clinical_medicine",
"title": "水肿的分布与凹陷性判断",
"claim": "水肿应询问起始部位、是否对称、晨起眼睑还是午后下肢为重、按压是否凹陷，并追问尿量变化、活动后气促和近期用药情况。",
"source": "《内科学》（第9版，人民卫生出版社）",
"source_location": "水肿章节：心源性、肾源性与肝源性水肿的鉴别",
"source_url": "",
"source_note": "本卡出处已由课程团队核对为真实出版物/行业规范，尚未补公开访问链接。",
"version": "第9版 2018",
"scope": "clinical_medicine·常见症状综合分析",
"exceptions": "水肿原因与利尿治疗由具备资质的医师判断，学生不得建议患者自行服用利尿药。",
"misconceptions": [
"水肿就少喝水或不喝水",
"只看腿肿不查尿量和体重变化"
],
"lay_terms": [
"肿是从眼皮还是脚踝开始的？按下去会不会留个坑？最近小便少了没有？"
],
"reviewer": "知护课程团队（已复核来源）",
"review_status": "课程团队已复核",
"updated_at": "2026-10-30",
"node_slug": "clin_symptom_edema_pattern",
"topic_slug": "clin_symptom_edema_pattern"
},
{
"knowledge_id": "K-CLIN-117",
"node_id": "clinical_medicine",
"title": "晕厥与头晕的问诊区分",
"claim": "需分清是短暂意识丧失还是旋转性眩晕，询问发作前驱症状、诱因、持续时间、有无外伤与大小便失禁，以及发作后是否迅速完全恢复。",
"source": "《内科学》（第9版，人民卫生出版社）",
"source_location": "晕厥章节：晕厥与眩晕的鉴别",
"source_url": "",
"source_note": "本卡出处已由课程团队核对为真实出版物/行业规范，尚未补公开访问链接。",
"version": "第9版 2018",
"scope": "clinical_medicine·常见症状综合分析",
"exceptions": "晕厥病因与危险分层由具备资质的医师结合检查判断。",
"misconceptions": [
"把眩晕直接说成“脑供血不足”",
"晕倒后清醒就认为无需进一步检查"
],
"lay_terms": [
"当时是完全不知道事了，还是只觉得天旋地转但心里清楚？"
],
"reviewer": "知护课程团队（已复核来源）",
"review_status": "课程团队已复核",
"updated_at": "2026-10-30",
"node_slug": "clin_symptom_syncope_dizziness",
"topic_slug": "clin_symptom_syncope_dizziness"
},
{
"knowledge_id": "K-CLIN-118",
"node_id": "clinical_medicine",
"title": "非刻意体重下降的追问",
"claim": "半年内体重下降超过原体重百分之五应视为有意义的信号，需询问进食量、吞咽困难、腹泻、发热盗汗与情绪变化，并确认是否刻意减重。",
"source": "《诊断学》（第9版，人民卫生出版社）",
"source_location": "第二篇 常见症状：体重变化",
"source_url": "",
"source_note": "本卡出处已由课程团队核对为真实出版物/行业规范，尚未补公开访问链接。",
"version": "第9版 2018",
"scope": "clinical_medicine·常见症状综合分析",
"exceptions": "消瘦原因需由具备资质的医师结合检查判断，学生不得暗示肿瘤等结论。",
"misconceptions": [
"把体重下降都归因于“最近太累”",
"不问是否在刻意节食或健身"
],
"lay_terms": [
"您这半年体重掉了多少斤？是自己在减肥，还是没刻意减就瘦了？"
],
"reviewer": "知护课程团队（已复核来源）",
"review_status": "课程团队已复核",
"updated_at": "2026-10-30",
"node_slug": "clin_symptom_weight_loss",
"topic_slug": "clin_symptom_weight_loss"
},
{
"knowledge_id": "K-CLIN-119",
"node_id": "clinical_medicine",
"title": "入院首次评估与病情观察",
"claim": "新入院患者应在当班完成首次评估，记录主诉、生命体征、意识、皮肤、进食与排泄、跌倒和压疮风险，异常值需复测并报告当班医师。",
"source": "国家卫生健康委关于进一步加强医疗机构护理工作的通知",
"source_location": "关于加强护理质量与患者安全管理的相关部分",
"source_url": "https://www.nhc.gov.cn/wjw/c100175/202009/f808fa44796745cea65d5f7284f0bc18.shtml",
"source_note": "用于入院首次评估与病情观察教学，落实患者安全目标。",
"version": "2020",
"scope": "clinical_medicine·内外妇儿基础场景",
"exceptions": "评估结果不构成诊断，诊疗决策由具备资质的医师作出；具体评估表单以所在机构制度为准。",
"misconceptions": [
"等医师查房后再补做首次评估",
"只记体温血压，不评估跌倒和压疮风险"
],
"lay_terms": [
"刚住院这天我们会给您做一次全面了解，量体温血压，也看看您走路和皮肤的状況。"
],
"reviewer": "知护课程团队（已复核来源，链接已核实）",
"review_status": "课程团队已复核",
"updated_at": "2026-10-30",
"node_slug": "clin_scene_admission_assessment",
"topic_slug": "clin_scene_admission_assessment"
},
{
"knowledge_id": "K-CLIN-120",
"node_id": "clinical_medicine",
"title": "术前基线评估与风险交代",
"claim": "术前应核对诊断与手术部位、评估气道、心肺功能、凝血与感染指标，确认禁食、备血和抗凝药物使用情况，手术时机由具备资质的医师决定。",
"source": "《外科学》（第9版，人民卫生出版社）",
"source_location": "术前准备章节：术前评估与风险防范",
"source_url": "",
"source_note": "本卡出处已由课程团队核对为真实出版物/行业规范，尚未补公开访问链接。",
"version": "第9版 2018",
"scope": "clinical_medicine·内外妇儿基础场景",
"exceptions": "手术指征、麻醉方式与是否停用抗凝药由医师和麻醉科共同决定，学生不得自行更改。",
"misconceptions": [
"只核对手术名称不核对部位和侧别",
"患者自述吃过东西就简单推迟手术不作记录"
],
"lay_terms": [
"手术前我们要再确认一遍是哪一侧、最后一次吃东西喝水是什么时候。"
],
"reviewer": "知护课程团队（已复核来源）",
"review_status": "课程团队已复核",
"updated_at": "2026-10-30",
"node_slug": "clin_scene_preop_assessment",
"topic_slug": "clin_scene_preop_assessment"
},
{
"knowledge_id": "K-CLIN-121",
"node_id": "clinical_medicine",
"title": "儿科病史采集的监护人补充",
"claim": "儿科问诊以监护人叙述为主，需补充出生史、喂养与生长发育、疫苗接种情况，并观察患儿精神状态与互动反应，不能只依赖家长描述。",
"source": "《儿科学》（第9版，人民卫生出版社）",
"source_location": "儿科病史采集与体格检查特点",
"source_url": "",
"source_note": "本卡出处已由课程团队核对为真实出版物/行业规范，尚未补公开访问链接。",
"version": "第9版 2018",
"scope": "clinical_medicine·内外妇儿基础场景",
"exceptions": "儿科诊断与用药由具备资质的儿科医师作出，学生不得向家长给出用药建议。",
"misconceptions": [
"只问家长不观察孩子实际状态",
"忽略出生史和喂养史对判断的影响"
],
"lay_terms": [
"孩子出生时足月吗？现在吃什么、一天吃几次？预防针都按时打了吗？"
],
"reviewer": "知护课程团队（已复核来源）",
"review_status": "课程团队已复核",
"updated_at": "2026-10-30",
"node_slug": "clin_scene_pediatric_history",
"topic_slug": "clin_scene_pediatric_history"
},
{
"knowledge_id": "K-CLIN-122",
"node_id": "clinical_medicine",
"title": "儿童脱水的临床评估要点",
"claim": "评估脱水应观察精神状态、口渴程度、皮肤弹性、前囟与眼窝、尿量和毛细血管再充盈，据此判断程度并由医师决定补液方案。",
"source": "《儿科学》（第9版，人民卫生出版社）",
"source_location": "小儿腹泻与液体疗法：脱水程度判断",
"source_url": "",
"source_note": "本卡出处已由课程团队核对为真实出版物/行业规范，尚未补公开访问链接。",
"version": "第9版 2018",
"scope": "clinical_medicine·内外妇儿基础场景",
"exceptions": "补液种类、量和速度由具备资质的医师确定，学生不得自行配置或调整输液。",
"misconceptions": [
"只数拉肚子次数不评估尿量",
"给腹泻孩子只喝白开水不补电解质"
],
"lay_terms": [
"孩子今天小便几次？哭的时候有眼泪吗？嘴唇干不干？"
],
"reviewer": "知护课程团队（已复核来源）",
"review_status": "课程团队已复核",
"updated_at": "2026-10-30",
"node_slug": "clin_scene_child_dehydration",
"topic_slug": "clin_scene_child_dehydration"
},
{
"knowledge_id": "K-CLIN-123",
"node_id": "clinical_medicine",
"title": "妊娠期腹痛伴出血的紧急评估",
"claim": "育龄女性腹痛伴阴道流血须先考虑妊娠相关问题，询问末次月经、出血量与晕厥史，立即测量生命体征并呼叫上级医师，不得因等待检查而延误。",
"source": "《妇产科学》（第9版，人民卫生出版社）",
"source_location": "异位妊娠与妊娠早期出血章节",
"source_url": "",
"source_note": "本卡出处已由课程团队核对为真实出版物/行业规范，尚未补公开访问链接。",
"version": "第9版 2018",
"scope": "clinical_medicine·内外妇儿基础场景",
"exceptions": "是否异位妊娠由具备资质的医师结合血人绒毛膜促性腺激素与超声判断，学生不得向患者下结论。",
"misconceptions": [
"把育龄女性腹痛先按胃肠炎处理",
"忽略停经史和晕厥、肛门坠胀感"
],
"lay_terms": [
"最后一次月经是什么时候？这次出血量多吗，有没有头晕要晕倒的感觉？"
],
"reviewer": "知护课程团队（已复核来源）",
"review_status": "课程团队已复核",
"updated_at": "2026-10-30",
"node_slug": "clin_scene_pregnancy_bleeding",
"topic_slug": "clin_scene_pregnancy_bleeding"
},
{
"knowledge_id": "K-CLIN-124",
"node_id": "clinical_medicine",
"title": "产后出血的早期识别与报告",
"claim": "产后应观察子宫底高度与收缩、阴道流血量和颜色、会阴伤口及生命体征，发现出血增多伴心率增快、面色苍白应立即报告并启动应急流程。",
"source": "《妇产科学》（第9版，人民卫生出版社）",
"source_location": "产后出血章节：临床表现与处理原则",
"source_url": "",
"source_note": "本卡出处已由课程团队核对为真实出版物/行业规范，尚未补公开访问链接。",
"version": "第9版 2018",
"scope": "clinical_medicine·内外妇儿基础场景",
"exceptions": "止血措施、输血与用药由具备资质的医师团队决定，学生只负责识别、报告与配合。",
"misconceptions": [
"只靠估计出血量判断，不摸宫底",
"认为产后出血多属正常恶露而延迟报告"
],
"lay_terms": [
"我们会定时摸一下子宫底、看恶露量，如果突然变多要马上告诉我们。"
],
"reviewer": "知护课程团队（已复核来源）",
"review_status": "课程团队已复核",
"updated_at": "2026-10-30",
"node_slug": "clin_scene_postpartum_hemorrhage",
"topic_slug": "clin_scene_postpartum_hemorrhage"
},
{
"knowledge_id": "K-CLIN-125",
"node_id": "clinical_medicine",
"title": "老年患者跌倒与多重用药评估",
"claim": "对老年患者应询问近一年跌倒史、步态视力与居家环境，核对同时使用的药物种类及是否含镇静降压类，评估后采取防跌倒措施并请医师复核用药。",
"source": "《老年医学》（第3版，人民卫生出版社）",
"source_location": "老年综合征：跌倒与多重用药",
"source_url": "",
"source_note": "本卡出处已由课程团队核对为真实出版物/行业规范，尚未补公开访问链接。",
"version": "第3版 2018",
"scope": "clinical_medicine·内外妇儿基础场景",
"exceptions": "是否减停药物由具备资质的医师决定，学生不得建议患者自行停药。",
"misconceptions": [
"认为老年人走路慢是正常现象不必评估",
"只关注跌倒当时伤情，不问用药和居家环境"
],
"lay_terms": [
"这一年有没有摔过？家里晚上起夜有没有灯，地上有没有容易绊脚的东西？"
],
"reviewer": "知护课程团队（已复核来源）",
"review_status": "课程团队已复核",
"updated_at": "2026-10-30",
"node_slug": "clin_scene_elderly_falls",
"topic_slug": "clin_scene_elderly_falls"
},
{
"knowledge_id": "K-CLIN-126",
"node_id": "clinical_medicine",
"title": "新生儿黄疸的观察与转诊边界",
"claim": "观察新生儿黄疸出现时间、进展速度、波及范围与大便颜色，生后二十四小时内出现或迅速加重需立即转诊，判断由儿科医师结合胆红素结果作出。",
"source": "《儿科学》（第9版，人民卫生出版社）",
"source_location": "新生儿黄疸章节：生理性与病理性黄疸的鉴别",
"source_url": "",
"source_note": "本卡出处已由课程团队核对为真实出版物/行业规范，尚未补公开访问链接。",
"version": "第9版 2018",
"scope": "clinical_medicine·内外妇儿基础场景",
"exceptions": "光疗与换血指征由具备资质的儿科医师决定，家长与学生的观察不能替代胆红素检测。",
"misconceptions": [
"认为新生儿黄疸都会自己退",
"用晒太阳代替就医评估"
],
"lay_terms": [
"黄是从脸上开始还是已经到手脚心了？出生后第几天开始黄的？大便颜色变白没有？"
],
"reviewer": "知护课程团队（已复核来源）",
"review_status": "课程团队已复核",
"updated_at": "2026-10-30",
"node_slug": "clin_scene_neonatal_jaundice",
"topic_slug": "clin_scene_neonatal_jaundice"
},
{
"knowledge_id": "K-CLIN-127",
"node_id": "clinical_medicine",
"title": "术后伤口与引流的观察要点",
"claim": "术后应观察敷料渗血渗液范围、伤口有无红肿热痛、引流液颜色性状与量，并记录体温变化，发现引流液呈鲜红且持续增多应立即报告。",
"source": "《外科学》（第9版，人民卫生出版社）",
"source_location": "围手术期处理：术后观察与并发症防治",
"source_url": "",
"source_note": "本卡出处已由课程团队核对为真实出版物/行业规范，尚未补公开访问链接。",
"version": "第9版 2018",
"scope": "clinical_medicine·内外妇儿基础场景",
"exceptions": "换药、拔管与是否再次手术由具备资质的医师决定，学生不得自行处理引流装置。",
"misconceptions": [
"只看敷料外面是否干净",
"引流液减少就认为可以拔管"
],
"lay_terms": [
"我们会看纱布渗了多少、引流袋里的液体是什么颜色，量突然变多要马上说。"
],
"reviewer": "知护课程团队（已复核来源）",
"review_status": "课程团队已复核",
"updated_at": "2026-10-30",
"node_slug": "clin_scene_wound_drain",
"topic_slug": "clin_scene_wound_drain"
},
{
"knowledge_id": "K-CLIN-128",
"node_id": "clinical_medicine",
"title": "危重患者的初始评估顺序",
"claim": "接诊危重患者按气道、呼吸、循环、意识、暴露的顺序快速评估，先处理致命问题再补问病史，每一步评估后复评并同时呼叫支援。",
"source": "《急诊与灾难医学》（第3版，人民卫生出版社）",
"source_location": "危重症患者的初始评估与复苏",
"source_url": "",
"source_note": "本卡出处已由课程团队核对为真实出版物/行业规范，尚未补公开访问链接。",
"version": "第3版 2018",
"scope": "clinical_medicine·急危重症识别",
"exceptions": "具体复苏措施与用药由具备资质的医师按流程执行，学生负责识别、呼救与配合。",
"misconceptions": [
"先详细问病史再做初步评估",
"评估完不复查，忽略病情变化"
],
"lay_terms": [
"我们按顺序先看呼吸通不通、有没有呼吸、脉搏和意识，边查边叫人帮忙。"
],
"reviewer": "知护课程团队（已复核来源）",
"review_status": "课程团队已复核",
"updated_at": "2026-10-30",
"node_slug": "clin_emergency_abcde",
"topic_slug": "clin_emergency_abcde"
},
{
"knowledge_id": "K-CLIN-129",
"node_id": "clinical_medicine",
"title": "意识状态的快速分级记录",
"claim": "用清醒、嗜睡、昏睡、昏迷描述意识水平，并记录呼唤与疼痛刺激的反应、瞳孔大小和对光反射，意识进行性下降提示病情恶化。",
"source": "《神经病学》（第8版，人民卫生出版社）",
"source_location": "意识障碍章节：意识水平的评估",
"source_url": "",
"source_note": "本卡出处已由课程团队核对为真实出版物/行业规范，尚未补公开访问链接。",
"version": "第8版 2018",
"scope": "clinical_medicine·急危重症识别",
"exceptions": "意识障碍病因与处置由具备资质的医师判断，学生不得用“神志不清”一句代替分级记录。",
"misconceptions": [
"统一写“神志清楚”或“神志不清”",
"只记录一次意识状态不动态比较"
],
"lay_terms": [
"我们叫您名字您能睁眼吗？刚才和现在比是清醒些还是更迷糊了？"
],
"reviewer": "知护课程团队（已复核来源）",
"review_status": "课程团队已复核",
"updated_at": "2026-10-30",
"node_slug": "clin_emergency_consciousness",
"topic_slug": "clin_emergency_consciousness"
},
{
"knowledge_id": "K-CLIN-130",
"node_id": "clinical_medicine",
"title": "休克早期的代偿性征象识别",
"claim": "心率增快、皮肤湿冷、毛细血管再充盈延长、尿量减少和烦躁是休克早期表现，血压下降往往较晚，不能以血压正常排除休克。",
"source": "WHO. Sepsis fact sheet",
"source_location": "What are the symptoms of sepsis",
"source_url": "https://www.who.int/news-room/fact-sheets/detail/sepsis",
"source_note": "链接为国际组织官方页面，内容与卡片结论一致；仅用于训练引用，不替代我国指南。",
"version": "第3版 2018",
"scope": "clinical_medicine·急危重症识别",
"exceptions": "休克的类型判断与液体复苏方案由具备资质的医师决定，学生不得自行快速补液。",
"misconceptions": [
"血压正常就认为没有休克",
"只看血压不摸皮肤温度和尿量"
],
"lay_terms": [
"手手脚脚凉不凉、尿量少了没有，这些往往比血压更早提示问题。"
],
"reviewer": "知护课程团队（已复核来源，链接已核实）",
"review_status": "课程团队已复核",
"updated_at": "2026-10-30",
"node_slug": "clin_emergency_shock_signs",
"topic_slug": "clin_emergency_shock_signs"
},
{
"knowledge_id": "K-CLIN-131",
"node_id": "clinical_medicine",
"title": "过敏性休克的识别与呼救",
"claim": "接触可疑药物或食物后出现皮疹、喉头发紧、喘鸣、呼吸困难伴血压下降应考虑过敏性休克，立即停药、呼救并保持气道通畅，用药由医师执行。",
"source": "《急诊与灾难医学》（第3版，人民卫生出版社）",
"source_location": "过敏反应与过敏性休克章节",
"source_url": "",
"source_note": "本卡出处已由课程团队核对为真实出版物/行业规范，尚未补公开访问链接。",
"version": "第3版 2018",
"scope": "clinical_medicine·急危重症识别",
"exceptions": "肾上腺素等抢救药物的使用由具备资质的医师按流程执行，学生不得自行给药。",
"misconceptions": [
"等皮疹消退再判断是否为过敏",
"把喉头发紧当作情绪紧张"
],
"lay_terms": [
"打完针后如果嗓子发紧、喘不上气或者全身起疹子，请立刻叫我们。"
],
"reviewer": "知护课程团队（已复核来源）",
"review_status": "课程团队已复核",
"updated_at": "2026-10-30",
"node_slug": "clin_emergency_anaphylaxis",
"topic_slug": "clin_emergency_anaphylaxis"
},
{
"knowledge_id": "K-CLIN-132",
"node_id": "clinical_medicine",
"title": "急性胸痛的院内处置流程",
"claim": "急性胸痛患者到院后应尽快完成心电图并连接监护，建立静脉通路、抽血备检，同时询问发作时间与用药史，由医师判断是否启动再灌注流程。",
"source": "《内科学》（第9版，人民卫生出版社）",
"source_location": "急性冠脉综合征章节：胸痛中心流程",
"source_url": "",
"source_note": "本卡出处已由课程团队核对为真实出版物/行业规范，尚未补公开访问链接。",
"version": "第9版 2018",
"scope": "clinical_medicine·急危重症识别",
"exceptions": "再灌注治疗指征与时机由具备资质的心内科医师决定，学生不得向患者承诺治疗方式。",
"misconceptions": [
"先排队等抽血结果再看心电图",
"疼痛缓解就不做动态心电图复查"
],
"lay_terms": [
"我们先给您做心电图、连上监护，这个过程不用等抽血结果。"
],
"reviewer": "知护课程团队（已复核来源）",
"review_status": "课程团队已复核",
"updated_at": "2026-10-30",
"node_slug": "clin_emergency_chest_pain_pathway",
"topic_slug": "clin_emergency_chest_pain_pathway"
},
{
"knowledge_id": "K-CLIN-133",
"node_id": "clinical_medicine",
"title": "卒中识别与时间窗记录",
"claim": "用面部不对称、上肢无力、言语含糊三项快速筛查卒中，记录最后正常时间并立即启动卒中绿色通道，是否溶栓由医师结合影像与禁忌证判断。",
"source": "CDC. Signs and Symptoms of Stroke",
"source_location": "Signs and symptoms",
"source_url": "https://www.cdc.gov/stroke/signs-symptoms/index.html",
"source_note": "链接为国际组织官方页面，内容与卡片结论一致；仅用于训练引用，不替代我国指南。",
"version": "第8版 2018",
"scope": "clinical_medicine·急危重症识别",
"exceptions": "溶栓或取栓的适应证与禁忌证由具备资质的医师判断，学生不得向家属承诺治疗效果。",
"misconceptions": [
"等症状自行缓解再就诊",
"只记到院时间不追问最后正常时间"
],
"lay_terms": [
"最后一次看到他正常是什么时候？这个时间对治疗很关键。"
],
"reviewer": "知护课程团队（已复核来源，链接已核实）",
"review_status": "课程团队已复核",
"updated_at": "2026-10-30",
"node_slug": "clin_emergency_stroke_recognition",
"topic_slug": "clin_emergency_stroke_recognition"
},
{
"knowledge_id": "K-CLIN-134",
"node_id": "clinical_medicine",
"title": "低氧血症的氧疗目标与边界",
"claim": "氧疗应设定目标血氧范围并持续监测，慢性阻塞性肺疾病患者需警惕高浓度吸氧引起二氧化碳潴留，流量与给氧方式由医师根据血气结果调整。",
"source": "慢性阻塞性肺疾病全球倡议（GOLD）2026年报告",
"source_location": "COPD 急性加重与氧疗、呼吸支持相关部分",
"source_url": "https://goldcopd.org/2026-gold-report-and-pocket-guide/",
"source_note": "用于低氧血症氧疗目标与高碳酸血症风险教学。",
"version": "2026",
"scope": "clinical_medicine·急危重症识别",
"exceptions": "氧流量、目标血氧区间与无创通气指征由具备资质的医师确定，学生不得自行调高氧流量。",
"misconceptions": [
"认为吸氧越多越安全",
"不看血氧监测就把面罩开到最大"
],
"lay_terms": [
"吸氧不是越多越好，我们会盯着血氧数字来调，您别自己动开关。"
],
"reviewer": "知护课程团队（已复核来源，链接已核实）",
"review_status": "课程团队已复核",
"updated_at": "2026-10-30",
"node_slug": "clin_emergency_oxygen_target",
"topic_slug": "clin_emergency_oxygen_target"
},
{
"knowledge_id": "K-CLIN-135",
"node_id": "clinical_medicine",
"title": "心跳骤停的识别与呼救",
"claim": "发现患者无反应、无呼吸或仅有濒死叹息样呼吸，应立即呼救、启动应急反应系统并开始胸外按压，尽量减少按压中断，除颤与用药由团队按流程执行。",
"source": "《急诊与灾难医学》（第3版，人民卫生出版社）",
"source_location": "心肺复苏章节：基础生命支持流程",
"source_url": "",
"source_note": "本卡出处已由课程团队核对为真实出版物/行业规范，尚未补公开访问链接。",
"version": "第3版 2018",
"scope": "clinical_medicine·急危重症识别",
"exceptions": "除颤、气道建立与抢救用药由具备资质的团队按机构流程执行，学生按培训要求参与按压。",
"misconceptions": [
"先摸脉搏很久才判断",
"按压中频繁停下来讨论"
],
"lay_terms": [
"叫不醒、没有正常呼吸就要马上按胸口并喊人拿除颤器。"
],
"reviewer": "知护课程团队（已复核来源）",
"review_status": "课程团队已复核",
"updated_at": "2026-10-30",
"node_slug": "clin_emergency_cardiac_arrest",
"topic_slug": "clin_emergency_cardiac_arrest"
},
{
"knowledge_id": "K-CLIN-136",
"node_id": "clinical_medicine",
"title": "危重患者转运与交接要点",
"claim": "转运前确认气道、静脉通路与监护设备，途中持续监测并携带急救物品；交接时按现状、背景、评估、建议的顺序口头说明并留下书面记录。",
"source": "《医疗质量安全核心制度要点》",
"source_location": "急危重患者抢救制度与交接班制度",
"source_url": "",
"source_note": "本卡出处已由课程团队核对为真实出版物/行业规范，尚未补公开访问链接。",
"version": "2018",
"scope": "clinical_medicine·急危重症识别",
"exceptions": "转运决策与接收科室安排由具备资质的医师确定，学生不得自行决定转送。",
"misconceptions": [
"口头说一句“病人转上去”就算交接",
"转运途中撤掉监护"
],
"lay_terms": [
"转病房路上我们会一直看着监护，到了会把情况和用的药当面交代清楚。"
],
"reviewer": "知护课程团队（已复核来源）",
"review_status": "课程团队已复核",
"updated_at": "2026-10-30",
"node_slug": "clin_emergency_transfer_handover",
"topic_slug": "clin_emergency_transfer_handover"
},
{
"knowledge_id": "K-CLIN-137",
"node_id": "clinical_medicine",
"title": "检验前标本采集的影响因素",
"claim": "采血前应核对空腹要求、避免在同侧输液肢体采血、防止溶血与标本量不足，并在申请单注明采血时间与用药情况，以免结果被误读。",
"source": "《实验诊断学》（第5版，人民卫生出版社）",
"source_location": "检验质量保证：分析前因素",
"source_url": "",
"source_note": "本卡出处已由课程团队核对为真实出版物/行业规范，尚未补公开访问链接。",
"version": "第5版 2018",
"scope": "clinical_medicine·检验影像信息整合",
"exceptions": "结果解释与复查决定由具备资质的医师作出，学生不得据单次结果向患者说明病情。",
"misconceptions": [
"在输液同侧手臂抽血",
"标本溶血后仍按原值解读"
],
"lay_terms": [
"抽血前请空腹，如果这只手在输液，我们换另一只手抽，结果才准。"
],
"reviewer": "知护课程团队（已复核来源）",
"review_status": "课程团队已复核",
"updated_at": "2026-10-30",
"node_slug": "clin_lab_preanalytical",
"topic_slug": "clin_lab_preanalytical"
},
{
"knowledge_id": "K-CLIN-138",
"node_id": "clinical_medicine",
"title": "危急值的识别与报告闭环",
"claim": "接到危急值报告应复述核对患者信息与结果、记录报告人与时间，并立即通知负责医师；处理后再次反馈，形成可追溯的闭环记录。",
"source": "《医疗质量安全核心制度要点》",
"source_location": "危急值报告制度",
"source_url": "",
"source_note": "本卡出处已由课程团队核对为真实出版物/行业规范，尚未补公开访问链接。",
"version": "2018",
"scope": "clinical_medicine·检验影像信息整合",
"exceptions": "危急值的处理方案由具备资质的医师决定，学生负责传递、记录与追踪。",
"misconceptions": [
"口头转告一句就算通知到位",
"只记结果不记报告人和时间"
],
"lay_terms": [
"这个结果我们按紧急情况处理，会当面复述一遍再记录，确保没有听错。"
],
"reviewer": "知护课程团队（已复核来源）",
"review_status": "课程团队已复核",
"updated_at": "2026-10-30",
"node_slug": "clin_lab_critical_value",
"topic_slug": "clin_lab_critical_value"
},
{
"knowledge_id": "K-CLIN-139",
"node_id": "clinical_medicine",
"title": "血常规异常的分类思路",
"claim": "阅读血常规应结合红细胞、白细胞分类与血小板三系变化，联系症状和既往趋势判断，不得仅凭单项数值向患者解释为某种疾病。",
"source": "《实验诊断学》（第5版，人民卫生出版社）",
"source_location": "血液学检查：血常规结果分析",
"source_url": "",
"source_note": "本卡出处已由课程团队核对为真实出版物/行业规范，尚未补公开访问链接。",
"version": "第5版 2018",
"scope": "clinical_medicine·检验影像信息整合",
"exceptions": "血液系统疾病的诊断需由具备资质的医师结合病史、涂片和骨髓检查判断。",
"misconceptions": [
"白细胞高就是细菌感染",
"血小板低就自行判断为血液病"
],
"lay_terms": [
"这项指标高一点不一定就是有病，我们会结合您的情况和以前的单子一起看。"
],
"reviewer": "知护课程团队（已复核来源）",
"review_status": "课程团队已复核",
"updated_at": "2026-10-30",
"node_slug": "clin_lab_cbc_interpret",
"topic_slug": "clin_lab_cbc_interpret"
},
{
"knowledge_id": "K-CLIN-140",
"node_id": "clinical_medicine",
"title": "肝肾功能与电解质的整合阅读",
"claim": "肝肾功能与电解质应结合容量状态、饮食和用药一并阅读，肌酐升高需考虑脱水等肾前因素，显著异常应复查并请医师判断。",
"source": "《实验诊断学》（第5版，人民卫生出版社）",
"source_location": "临床生物化学检查：肝肾功能与电解质",
"source_url": "",
"source_note": "本卡出处已由课程团队核对为真实出版物/行业规范，尚未补公开访问链接。",
"version": "第5版 2018",
"scope": "clinical_medicine·检验影像信息整合",
"exceptions": "肾功能分期与补液、用药调整由具备资质的医师决定，学生不得建议患者自行补水或停药。",
"misconceptions": [
"肌酐轻度升高就认定肾衰竭",
"只看单项电解质不看是否溶血或输液影响"
],
"lay_terms": [
"这个数值可能跟您这两天喝水少、出汗多有关，我们会复查一次再判断。"
],
"reviewer": "知护课程团队（已复核来源）",
"review_status": "课程团队已复核",
"updated_at": "2026-10-30",
"node_slug": "clin_lab_chemistry_panel",
"topic_slug": "clin_lab_chemistry_panel"
},
{
"knowledge_id": "K-CLIN-141",
"node_id": "clinical_medicine",
"title": "凝血筛查的术前评估意义",
"claim": "凝血酶原时间、活化部分凝血活酶时间与血小板应结合出血史和抗凝用药解读，结果异常时暂缓有创操作并请医师评估纠正方案。",
"source": "《实验诊断学》（第5版，人民卫生出版社）",
"source_location": "止血与凝血功能检查",
"source_url": "",
"source_note": "本卡出处已由课程团队核对为真实出版物/行业规范，尚未补公开访问链接。",
"version": "第5版 2018",
"scope": "clinical_medicine·检验影像信息整合",
"exceptions": "是否暂停抗凝药、是否输注血制品由具备资质的医师决定，学生不得自行处理。",
"misconceptions": [
"凝血指标正常就认为不会出血",
"忽略患者正在服用的抗凝或活血药物"
],
"lay_terms": [
"这个指标是看您血凝得快不快，抽血前请告诉我们您在吃哪些药。"
],
"reviewer": "知护课程团队（已复核来源）",
"review_status": "课程团队已复核",
"updated_at": "2026-10-30",
"node_slug": "clin_lab_coagulation",
"topic_slug": "clin_lab_coagulation"
},
{
"knowledge_id": "K-CLIN-142",
"node_id": "clinical_medicine",
"title": "心电图的顺序阅读方法",
"claim": "阅读心电图先确认走纸速度与定标，再依次判断节律、心率、电轴、各间期与 ST-T 改变，发现异常立即报告并与既往图纸对照。",
"source": "《诊断学》（第9版，人民卫生出版社）",
"source_location": "心电图检查：分析步骤与正常值",
"source_url": "",
"source_note": "本卡出处已由课程团队核对为真实出版物/行业规范，尚未补公开访问链接。",
"version": "第9版 2018",
"scope": "clinical_medicine·检验影像信息整合",
"exceptions": "心电图诊断与处理由具备资质的医师作出，学生不得向患者宣布为心肌梗死等结论。",
"misconceptions": [
"一上来就找 ST 段，跳过节律和定标",
"不调取旧图对比，单张图下结论"
],
"lay_terms": [
"这张心电图我们会按固定顺序看一遍，再和您以前的图比对。"
],
"reviewer": "知护课程团队（已复核来源）",
"review_status": "课程团队已复核",
"updated_at": "2026-10-30",
"node_slug": "clin_imaging_ecg_reading",
"topic_slug": "clin_imaging_ecg_reading"
},
{
"knowledge_id": "K-CLIN-143",
"node_id": "clinical_medicine",
"title": "影像检查申请与临床信息提供",
"claim": "申请影像检查应写明主要症状、可疑方向和既往手术与植入物情况，帮助影像科选择序列与对比剂；检查后核对报告部位与临床所见是否一致。",
"source": "《医学影像学》（第9版，人民卫生出版社）",
"source_location": "影像检查方法与临床应用原则",
"source_url": "",
"source_note": "本卡出处已由课程团队核对为真实出版物/行业规范，尚未补公开访问链接。",
"version": "第9版 2018",
"scope": "clinical_medicine·检验影像信息整合",
"exceptions": "影像征象的解释与诊断由具备资质的影像和临床医师作出，学生不得自行阅片定性。",
"misconceptions": [
"申请单只写“查因”不写症状",
"不问体内有无金属植入物就安排磁共振"
],
"lay_terms": [
"做检查前请告诉我们身上有没有钢板、支架或者起搏器。"
],
"reviewer": "知护课程团队（已复核来源）",
"review_status": "课程团队已复核",
"updated_at": "2026-10-30",
"node_slug": "clin_imaging_request_info",
"topic_slug": "clin_imaging_request_info"
},
{
"knowledge_id": "K-CLIN-144",
"node_id": "clinical_medicine",
"title": "影像检查的正当性与防护",
"claim": "选择放射检查应有临床指征并遵循正当性与最优化原则，对育龄女性询问妊娠可能，非必要不重复照射，防护用品应覆盖非检查部位。",
"source": "《放射诊疗管理规定》",
"source_location": "第三章 放射诊疗的防护与质量保证",
"source_url": "https://www.nhc.gov.cn/wjw/c100221/202201/c7a29190859c4bfeac3a057b0f1415bb/files/%E6%94%BE%E5%B0%84%E8%AF%8A%E7%96%97%E7%AE%A1%E7%90%86%E8%A7%84%E5%AE%9A.pdf",
"source_note": "用于影像检查正当性、受检者防护与告知教学。",
"version": "2006",
"scope": "clinical_medicine·检验影像信息整合",
"exceptions": "具体检查方式的取舍由具备资质的医师根据病情决定，学生不得为迁就患者要求安排无指征检查。",
"misconceptions": [
"为求全面一次开多项放射检查",
"不询问育龄女性是否可能怀孕"
],
"lay_terms": [
"这个检查有辐射，我们会用铅围裙护住不需要照的部位，也请您告诉我们是否可能怀孕。"
],
"reviewer": "知护课程团队（已复核来源，链接已核实）",
"review_status": "课程团队已复核",
"updated_at": "2026-10-30",
"node_slug": "clin_imaging_radiation_justify",
"topic_slug": "clin_imaging_radiation_justify"
},
{
"knowledge_id": "K-CLIN-145",
"node_id": "clinical_medicine",
"title": "检验结果与临床表现不符时",
"claim": "结果与临床表现明显不符时应先核查标本、采血时间与检验过程，必要时复查，再向医师报告，不擅自向患者解释为阴性或排除某种疾病。",
"source": "《实验诊断学》（第5版，人民卫生出版社）",
"source_location": "检验结果的临床评价与影响因素",
"source_url": "",
"source_note": "本卡出处已由课程团队核对为真实出版物/行业规范，尚未补公开访问链接。",
"version": "第5版 2018",
"scope": "clinical_medicine·检验影像信息整合",
"exceptions": "是否复查、是否调整诊疗方案由具备资质的医师决定，学生仅负责核实与报告。",
"misconceptions": [
"结果正常就告诉患者“没事”",
"怀疑有误却自行改单或不出声"
],
"lay_terms": [
"这个结果和您现在的表现对不上，我们会再核对标本、复查一次，先不下结论。"
],
"reviewer": "知护课程团队（已复核来源）",
"review_status": "课程团队已复核",
"updated_at": "2026-10-30",
"node_slug": "clin_lab_clinical_discordance",
"topic_slug": "clin_lab_clinical_discordance"
},
{
"knowledge_id": "K-CLIN-146",
"node_id": "clinical_medicine",
"title": "处方权与实习阶段的边界",
"claim": "未取得处方权的人员不得独立开具处方，实习与规范化培训阶段须在带教医师指导下书写并由其审核签名，不得代签、事后补签或套用他人账号。",
"source": "《处方管理办法》（卫生部令第53号）",
"source_location": "第二章 处方权",
"source_url": "",
"source_note": "本卡出处已由课程团队核对为真实出版物/行业规范，尚未补公开访问链接。",
"version": "2007",
"scope": "clinical_medicine·合理用药与诊断边界",
"exceptions": "具体处方内容与用药方案由具备处方权的医师负责，学生不得以任何形式替代。",
"misconceptions": [
"用带教老师账号开处方",
"先把处方开好再让老师补签"
],
"lay_terms": [
"我现在是跟着老师学习，开药要由有处方权的医生确认签字。"
],
"reviewer": "知护课程团队（已复核来源）",
"review_status": "课程团队已复核",
"updated_at": "2026-10-30",
"node_slug": "clin_drug_prescribing_rights",
"topic_slug": "clin_drug_prescribing_rights"
},
{
"knowledge_id": "K-CLIN-147",
"node_id": "clinical_medicine",
"title": "抗菌药物使用的基本原则",
"claim": "使用抗菌药物应有明确指征并尽量在用药前留取病原学标本，按分级管理权限开具，避免无指征预防用药，品种与疗程由具备资质的医师决定。",
"source": "WHO. Antimicrobial resistance fact sheet",
"source_location": "Antimicrobial resistance: key facts",
"source_url": "https://www.who.int/news-room/fact-sheets/detail/antimicrobial-resistance",
"source_note": "链接为国际组织官方页面，内容与卡片结论一致；仅用于训练引用，不替代我国指南。",
"version": "2012",
"scope": "clinical_medicine·合理用药与诊断边界",
"exceptions": "抗菌药物的选择、联合与疗程由具备资质的医师根据病原学和病情决定，学生不得建议患者自行服用。",
"misconceptions": [
"发热就用抗菌药物",
"症状好转就自行停药或减量"
],
"lay_terms": [
"消炎药不是退烧药，要不要用得看有没有细菌感染，我们会先留标本再决定。"
],
"reviewer": "知护课程团队（已复核来源，链接已核实）",
"review_status": "课程团队已复核",
"updated_at": "2026-10-30",
"node_slug": "clin_drug_antibiotic_stewardship",
"topic_slug": "clin_drug_antibiotic_stewardship"
},
{
"knowledge_id": "K-CLIN-148",
"node_id": "clinical_medicine",
"title": "用药前的过敏与交叉过敏核对",
"claim": "开具或执行药物前应核对过敏史中的具体药名与反应类型，注意同类药物的交叉过敏可能，有疑问时暂停并请医师或药师确认替代方案。",
"source": "《临床药物治疗学》（第4版，人民卫生出版社）",
"source_location": "药物治疗安全：过敏史核查与用药差错防范",
"source_url": "",
"source_note": "本卡出处已由课程团队核对为真实出版物/行业规范，尚未补公开访问链接。",
"version": "第4版 2018",
"scope": "clinical_medicine·合理用药与诊断边界",
"exceptions": "是否更换药物、是否做皮试由具备资质的医师决定，学生不得自行改药。",
"misconceptions": [
"只问“有没有过敏”不追问药名和反应",
"认为不同类药物就一定不会交叉过敏"
],
"lay_terms": [
"您上次过敏时是起疹子还是喘不上气？还记得是哪种药吗？"
],
"reviewer": "知护课程团队（已复核来源）",
"review_status": "课程团队已复核",
"updated_at": "2026-10-30",
"node_slug": "clin_drug_allergy_check",
"topic_slug": "clin_drug_allergy_check"
},
{
"knowledge_id": "K-CLIN-149",
"node_id": "clinical_medicine",
"title": "特殊人群用药的考虑原则",
"claim": "儿童、妊娠哺乳期、老年及肝肾功能不全患者用药需调整品种或加强监测，应告知风险与替代选择，具体方案由医师和药师共同确定。",
"source": "《临床药物治疗学》（第4版，人民卫生出版社）",
"source_location": "特殊人群的药物治疗",
"source_url": "",
"source_note": "本卡出处已由课程团队核对为真实出版物/行业规范，尚未补公开访问链接。",
"version": "第4版 2018",
"scope": "clinical_medicine·合理用药与诊断边界",
"exceptions": "孕妇和儿童的用药决策由具备资质的医师作出，学生不得给出“可以吃”或“不能吃”的绝对答复。",
"misconceptions": [
"把成人用药按比例减量给儿童",
"孕妇一律拒绝用药而延误必要治疗"
],
"lay_terms": [
"您现在怀孕，用药要格外谨慎，我们会请医生和药师一起帮您选。"
],
"reviewer": "知护课程团队（已复核来源）",
"review_status": "课程团队已复核",
"updated_at": "2026-10-30",
"node_slug": "clin_drug_special_population",
"topic_slug": "clin_drug_special_population"
},
{
"knowledge_id": "K-CLIN-150",
"node_id": "clinical_medicine",
"title": "药物不良反应的识别与上报",
"claim": "用药后新出现的皮疹、腹泻、肝功能异常或血象改变应警惕药物不良反应，及时记录并按规定上报，不自行停药或换药，由医师评估处理。",
"source": "《药品不良反应报告和监测管理办法》（卫生部令第81号）",
"source_location": "不良反应的报告与处置相关条款",
"source_url": "",
"source_note": "本卡出处已由课程团队核对为真实出版物/行业规范，尚未补公开访问链接。",
"version": "2011",
"scope": "clinical_medicine·合理用药与诊断边界",
"exceptions": "是否停药、换药或处理不良反应由具备资质的医师决定，学生不得自行处置。",
"misconceptions": [
"出现皮疹就自行停药不报告",
"把新发症状一律归因于原发病"
],
"lay_terms": [
"吃药后新起的疹子或者拉肚子，请告诉我们，不要自己先停药。"
],
"reviewer": "知护课程团队（已复核来源）",
"review_status": "课程团队已复核",
"updated_at": "2026-10-30",
"node_slug": "clin_drug_adr_report",
"topic_slug": "clin_drug_adr_report"
},
{
"knowledge_id": "K-CLIN-151",
"node_id": "clinical_medicine",
"title": "用药交代与依从性支持",
"claim": "交代用药应说明服法与注意事项、可能出现的不适和漏服处理，请患者复述确认理解，并提醒不要自行加量或听信他人推荐换药。",
"source": "《临床药物治疗学》（第4版，人民卫生出版社）",
"source_location": "患者用药教育与依从性管理",
"source_url": "",
"source_note": "本卡出处已由课程团队核对为真实出版物/行业规范，尚未补公开访问链接。",
"version": "第4版 2018",
"scope": "clinical_medicine·合理用药与诊断边界",
"exceptions": "具体品种与用法用量以医师处方和药师交代为准，学生不得自行调整。",
"misconceptions": [
"语速很快地说一遍就算交代完",
"只说一天几次不说漏服怎么办"
],
"lay_terms": [
"我再说一遍您听听对不对，漏了一次不要补双份，有不清楚随时问。"
],
"reviewer": "知护课程团队（已复核来源）",
"review_status": "课程团队已复核",
"updated_at": "2026-10-30",
"node_slug": "clin_drug_counseling",
"topic_slug": "clin_drug_counseling"
},
{
"knowledge_id": "K-CLIN-152",
"node_id": "clinical_medicine",
"title": "疼痛评估与镇痛的基本原则",
"claim": "疼痛应使用量表定期评估部位、性质与对睡眠的影响，按阶梯原则由医师制定方案，同时观察呼吸抑制、便秘等不良反应并记录效果。",
"source": "《临床药物治疗学》（第4版，人民卫生出版社）",
"source_location": "疼痛治疗药物与评估",
"source_url": "",
"source_note": "本卡出处已由课程团队核对为真实出版物/行业规范，尚未补公开访问链接。",
"version": "第4版 2018",
"scope": "clinical_medicine·合理用药与诊断边界",
"exceptions": "镇痛药物种类与剂量由具备资质的医师决定，学生不得向患者承诺“用了就不疼”。",
"misconceptions": [
"担心成瘾而让患者忍着痛",
"只问疼不疼不打分、不复评"
],
"lay_terms": [
"如果十分是最疼、零分是不疼，您现在大概几分？用药后我们再问一次。"
],
"reviewer": "知护课程团队（已复核来源）",
"review_status": "课程团队已复核",
"updated_at": "2026-10-30",
"node_slug": "clin_drug_pain_assessment",
"topic_slug": "clin_drug_pain_assessment"
},
{
"knowledge_id": "K-CLIN-153",
"node_id": "clinical_medicine",
"title": "诊断表述的资质边界意识",
"claim": "学生与未取得相应资质的医务人员不得向患者作出确诊或排除结论，只能说明目前发现和需要进一步检查的方向，最终诊断由具备资质的医师结合病史、体征与辅助检查判断。",
"source": "《中华人民共和国医师法》",
"source_location": "执业规则相关条款",
"source_url": "",
"source_note": "本卡出处已由课程团队核对为真实出版物/行业规范，尚未补公开访问链接。",
"version": "2021",
"scope": "clinical_medicine·合理用药与诊断边界",
"exceptions": "紧急情况下按机构急救流程先行处置，事后由具备资质的医师确认诊断。",
"misconceptions": [
"看完片子就对患者说“您这是某某病”",
"用“基本可以排除”淡化风险"
],
"lay_terms": [
"目前看到的情况还需要进一步检查，最后结论要由主管医生结合全部结果来定。"
],
"reviewer": "知护课程团队（已复核来源）",
"review_status": "课程团队已复核",
"updated_at": "2026-10-30",
"node_slug": "clin_drug_diagnosis_boundary",
"topic_slug": "clin_drug_diagnosis_boundary"
},
{
"knowledge_id": "K-CLIN-154",
"node_id": "clinical_medicine",
"title": "会诊与转诊的启动指征",
"claim": "当病情超出本科室诊疗范围、诊断不明或治疗反应不佳时，应及时提出会诊或转诊，写明目的与紧急程度，并完成交接与病程记录。",
"source": "《医疗质量安全核心制度要点》",
"source_location": "会诊制度与转诊、转科制度",
"source_url": "",
"source_note": "本卡出处已由课程团队核对为真实出版物/行业规范，尚未补公开访问链接。",
"version": "2018",
"scope": "clinical_medicine·合理用药与诊断边界",
"exceptions": "会诊与转诊的最终安排由具备资质的医师决定，学生可提出建议但不得自行承诺转科。",
"misconceptions": [
"会诊单只写“请会诊”不写目的",
"转科前不完成交接和记录"
],
"lay_terms": [
"这个情况超出我们科室的范围，我们会请相关专科医生一起看，并把资料交过去。"
],
"reviewer": "知护课程团队（已复核来源）",
"review_status": "课程团队已复核",
"updated_at": "2026-10-30",
"node_slug": "clin_drug_referral_consult",
"topic_slug": "clin_drug_referral_consult"
},
{
"knowledge_id": "K-CLIN-155",
"node_id": "clinical_medicine",
"title": "接诊开始的自我介绍与确认",
"claim": "接触患者先自我介绍姓名与角色、说明来意，核对姓名与出生日期，征得同意后开始询问，并告知其可随时提问或拒绝某项操作。",
"source": "《医患沟通学》（第3版，人民卫生出版社）",
"source_location": "医患沟通的基本技能：建立关系",
"source_url": "",
"source_note": "本卡出处已由课程团队核对为真实出版物/行业规范，尚未补公开访问链接。",
"version": "第3版 2018",
"scope": "clinical_medicine·医患沟通与知情说明",
"exceptions": "紧急抢救时可先处置后补充说明，但须在病情允许时尽快补做。",
"misconceptions": [
"上来就问“哪儿不舒服”不表明身份",
"只叫床号不核对姓名"
],
"lay_terms": [
"您好，我是这里的实习医生小张，今天先跟您聊聊病情，您随时可以问我。"
],
"reviewer": "知护课程团队（已复核来源）",
"review_status": "课程团队已复核",
"updated_at": "2026-10-30",
"node_slug": "clin_comm_self_introduction",
"topic_slug": "clin_comm_self_introduction"
},
{
"knowledge_id": "K-CLIN-156",
"node_id": "clinical_medicine",
"title": "用患者能懂的语言解释病情",
"claim": "解释病情应避免专业缩写与术语，用生活化的说法说明目前发现、可能原因和下一步安排，并请患者复述以确认其真正理解。",
"source": "《医患沟通学》（第3版，人民卫生出版社）",
"source_location": "医患沟通的基本技能：信息告知",
"source_url": "",
"source_note": "本卡出处已由课程团队核对为真实出版物/行业规范，尚未补公开访问链接。",
"version": "第3版 2018",
"scope": "clinical_medicine·医患沟通与知情说明",
"exceptions": "通俗化不得改变医学事实，也不得替代医师的诊断说明。",
"misconceptions": [
"大量使用缩略语后问“听懂了吧”",
"用“问题不大”掩盖不确定的信息"
],
"lay_terms": [
"打个比方，血管像水管，现在有点窄，血流过去就费劲，所以我们先查清楚窄到什么程度。"
],
"reviewer": "知护课程团队（已复核来源）",
"review_status": "课程团队已复核",
"updated_at": "2026-10-30",
"node_slug": "clin_comm_plain_language",
"topic_slug": "clin_comm_plain_language"
},
{
"knowledge_id": "K-CLIN-157",
"node_id": "clinical_medicine",
"title": "知情同意应说明的五项要素",
"claim": "知情同意须说明拟行检查或治疗的目的、主要风险与并发症、替代方案以及不接受可能带来的后果，并确认患者在无胁迫情况下自愿签署。",
"source": "《医疗纠纷预防和处理条例》",
"source_location": "第二章 医疗纠纷的预防：知情同意相关条款",
"source_url": "",
"source_note": "本卡出处已由课程团队核对为真实出版物/行业规范，尚未补公开访问链接。",
"version": "2018",
"scope": "clinical_medicine·医患沟通与知情说明",
"exceptions": "签署由具备资质的医师完成告知，学生可参与沟通但不得代替医师取得签字。",
"misconceptions": [
"只让患者签字不解释风险",
"把替代方案说成没有选择"
],
"lay_terms": [
"这个操作有什么好处、可能出什么问题、还有没有别的办法，我都会跟您讲清楚再签字。"
],
"reviewer": "知护课程团队（已复核来源）",
"review_status": "课程团队已复核",
"updated_at": "2026-10-30",
"node_slug": "clin_comm_informed_consent",
"topic_slug": "clin_comm_informed_consent"
},
{
"knowledge_id": "K-CLIN-158",
"node_id": "clinical_medicine",
"title": "告知坏消息的分步沟通",
"claim": "告知不良结果前先了解患者已知信息与想知道的程度，选择安静环境并留出时间，用明确而不生硬的语言说明，停顿回应情绪后再讨论下一步。",
"source": "《医患沟通学》（第3版，人民卫生出版社）",
"source_location": "特殊情境沟通：坏消息告知",
"source_url": "",
"source_note": "本卡出处已由课程团队核对为真实出版物/行业规范，尚未补公开访问链接。",
"version": "第3版 2018",
"scope": "clinical_medicine·医患沟通与知情说明",
"exceptions": "涉及诊断与预后的正式告知由具备资质的医师进行，学生可在带教下参与。",
"misconceptions": [
"一进门就直说结果不给缓冲",
"用“应该没什么大问题”回避真实信息"
],
"lay_terms": [
"结果出来了，我先陪您坐一会儿，您想知道多少我都慢慢说。"
],
"reviewer": "知护课程团队（已复核来源）",
"review_status": "课程团队已复核",
"updated_at": "2026-10-30",
"node_slug": "clin_comm_bad_news",
"topic_slug": "clin_comm_bad_news"
},
{
"knowledge_id": "K-CLIN-159",
"node_id": "clinical_medicine",
"title": "说明医学不确定性的表达",
"claim": "面对不确定的结果应如实说明目前能确定与不能确定的部分、需要观察或复查的时间点，避免绝对化承诺，也不要用“没事”淡化潜在风险。",
"source": "《医患沟通学》（第3版，人民卫生出版社）",
"source_location": "医患沟通的基本技能：风险沟通",
"source_url": "",
"source_note": "本卡出处已由课程团队核对为真实出版物/行业规范，尚未补公开访问链接。",
"version": "第3版 2018",
"scope": "clinical_medicine·医患沟通与知情说明",
"exceptions": "不确定性的说明不等于推卸责任，具体诊疗决策仍由具备资质的医师作出。",
"misconceptions": [
"为了安慰患者说“肯定不会有事”",
"用大量术语掩盖自己也说不清的部分"
],
"lay_terms": [
"目前能确定的是这些，还有些要观察两三天再复查才能判断，我不会给您打包票。"
],
"reviewer": "知护课程团队（已复核来源）",
"review_status": "课程团队已复核",
"updated_at": "2026-10-30",
"node_slug": "clin_comm_uncertainty",
"topic_slug": "clin_comm_uncertainty"
},
{
"knowledge_id": "K-CLIN-160",
"node_id": "clinical_medicine",
"title": "患者拒绝检查或治疗时的应对",
"claim": "患者拒绝时应先了解顾虑、补充说明风险与替代方案，确认其具备决定能力，尊重其选择并如实记录，紧急情况下按机构流程上报。",
"source": "《医疗纠纷预防和处理条例》",
"source_location": "第二章 医疗纠纷的预防：患者自主决定相关条款",
"source_url": "",
"source_note": "本卡出处已由课程团队核对为真实出版物/行业规范，尚未补公开访问链接。",
"version": "2018",
"scope": "clinical_medicine·医患沟通与知情说明",
"exceptions": "涉及无民事行为能力人或传染病防治等特殊情形，按法律法规和机构流程处理。",
"misconceptions": [
"反复劝说直到患者勉强同意",
"患者拒绝后不作记录也不上报"
],
"lay_terms": [
"您有权决定做不做，我先把不做的风险讲清楚，您再考虑，我们也会记下来。"
],
"reviewer": "知护课程团队（已复核来源）",
"review_status": "课程团队已复核",
"updated_at": "2026-10-30",
"node_slug": "clin_comm_patient_refusal",
"topic_slug": "clin_comm_patient_refusal"
},
{
"knowledge_id": "K-CLIN-161",
"node_id": "clinical_medicine",
"title": "家属参与与隐私保密边界",
"claim": "向家属说明病情前应确认患者授权范围，涉及隐私或预后告知先征得患者同意，多人病房讨论时注意降低音量并避免暴露他人信息。",
"source": "《中华人民共和国医师法》",
"source_location": "医师的义务与患者隐私保护相关条款",
"source_url": "",
"source_note": "本卡出处已由课程团队核对为真实出版物/行业规范，尚未补公开访问链接。",
"version": "2021",
"scope": "clinical_medicine·医患沟通与知情说明",
"exceptions": "患者无法表达意愿时按法定代理人和机构流程处理。",
"misconceptions": [
"家属一问就把全部病情和检查结果说出去",
"在走廊或多人病房大声讨论病情"
],
"lay_terms": [
"这些情况我可以告诉您家人吗？您希望谁知道、知道多少，我们按您的意思来。"
],
"reviewer": "知护课程团队（已复核来源）",
"review_status": "课程团队已复核",
"updated_at": "2026-10-30",
"node_slug": "clin_comm_family_privacy",
"topic_slug": "clin_comm_family_privacy"
},
{
"knowledge_id": "K-CLIN-162",
"node_id": "clinical_medicine",
"title": "医患冲突的初步降温处理",
"claim": "面对情绪激动的患者或家属，先保持安全距离、让其把话说完并复述其诉求，不争辩、不承诺超出权限的事，及时请上级或医务部门介入。",
"source": "《医患沟通学》（第3版，人民卫生出版社）",
"source_location": "医患冲突的识别与应对",
"source_url": "",
"source_note": "本卡出处已由课程团队核对为真实出版物/行业规范，尚未补公开访问链接。",
"version": "第3版 2018",
"scope": "clinical_medicine·医患沟通与知情说明",
"exceptions": "出现人身安全威胁时立即脱离现场并报警，由机构按应急预案处理。",
"misconceptions": [
"与家属争辩谁对谁错",
"当场答应赔偿或承诺治疗结果"
],
"lay_terms": [
"您先消消气，把您担心的事说完整，我记下来，马上请主任一起来谈。"
],
"reviewer": "知护课程团队（已复核来源）",
"review_status": "课程团队已复核",
"updated_at": "2026-10-30",
"node_slug": "clin_comm_conflict_deescalation",
"topic_slug": "clin_comm_conflict_deescalation"
},
{
"knowledge_id": "K-CLIN-163",
"node_id": "clinical_medicine",
"title": "出院宣教与复诊指征交代",
"claim": "出院前应说明用药方法、饮食活动限制与伤口护理，明确列出需要立即返院的警示症状和复诊时间，并请患者或家属复述确认。",
"source": "《医患沟通学》（第3版，人民卫生出版社）",
"source_location": "医患沟通的基本技能：出院指导与随访",
"source_url": "",
"source_note": "本卡出处已由课程团队核对为真实出版物/行业规范，尚未补公开访问链接。",
"version": "第3版 2018",
"scope": "clinical_medicine·医患沟通与知情说明",
"exceptions": "用药调整与复诊安排以医师医嘱和出院记录为准，学生不得自行更改。",
"misconceptions": [
"只说“按时吃药、定期复查”不写具体时间",
"不交代哪些情况必须马上返院"
],
"lay_terms": [
"回家后如果出现发烧、伤口流脓或者喘不上气，别等复诊，立刻回来。"
],
"reviewer": "知护课程团队（已复核来源）",
"review_status": "课程团队已复核",
"updated_at": "2026-10-30",
"node_slug": "clin_comm_discharge_teaching",
"topic_slug": "clin_comm_discharge_teaching"
},
{
"knowledge_id": "K-MT-101",
"node_id": "medical_technology",
"topic_slug": "mt_preanalytical_identity_check",
"title": "检验申请单与患者身份核对",
"claim": "采集前应同时核对申请单上的项目、标本类型与患者身份，用姓名加腕带或床号等两种以上标识确认，并询问患者当前状态是否符合该项目要求；发现信息不一致应暂停采集，向开单医师核实后再操作。",
"source": "WS/T 661—2020 静脉血液标本采集指南",
"source_location": "采血前准备与患者识别相关条款",
"source_url": "",
"source_note": "本卡出处已由课程团队核对为真实出版物/行业规范，尚未补公开访问链接。",
"version": "2020",
"scope": "medical_technology·检验前患者准备",
"exceptions": "身份标识的具体方式以所在机构制度为准；患者无法确认身份时不得采血，须由医护人员协助核实。",
"misconceptions": [
"拿着上一张化验单直接进针，不与腕带核对",
"患者自报姓名就视为身份已确认"
],
"lay_terms": [
"抽血前我会对着您的手腕带和单子再念一遍名字，确认这是您本人的检查项目。"
],
"reviewer": "知护课程团队（已复核来源）",
"review_status": "课程团队已复核",
"updated_at": "2026-10-30"
},
{
"knowledge_id": "K-MT-102",
"node_id": "medical_technology",
"topic_slug": "mt_fasting_time_instruction",
"title": "空腹采血的时间与饮水要求",
"claim": "多数生化与血脂项目要求空腹八至十二小时，空腹期间可少量饮白水，一般不宜超过十六小时；应向患者说明空腹的起止时间与可饮水范围，婴幼儿、孕妇及糖尿病患者按医嘱单独安排。",
"source": "全国临床检验操作规程",
"source_location": "临床化学检验标本采集与患者准备章节",
"source_url": "",
"source_note": "本卡出处已由课程团队核对为真实出版物/行业规范，尚未补公开访问链接。",
"version": "第4版 2015",
"scope": "medical_technology·检验前患者准备",
"exceptions": "空腹时长与是否需空腹以该项目说明书和开单要求为准，学生不得自行更改医嘱。",
"misconceptions": [
"让患者从前一天中午就开始禁食",
"认为空腹就是连水也不能喝"
],
"lay_terms": [
"这项检查要空着肚子抽血，前一天晚上正常吃饭，之后别再吃东西，白开水可以少量喝。"
],
"reviewer": "知护课程团队（已复核来源）",
"review_status": "课程团队已复核",
"updated_at": "2026-10-30"
},
{
"knowledge_id": "K-MT-103",
"node_id": "medical_technology",
"topic_slug": "mt_diet_alcohol_interference",
"title": "饮食饮酒对检验结果的影响",
"claim": "高脂饮食可使血清呈脂血状态并干扰多项比色测定，饮酒可影响肝酶、甘油三酯与尿酸水平；采血前应询问近一日的饮食与饮酒情况，需要空腹的项目应按要求告知患者提前调整。",
"source": "全国临床检验操作规程",
"source_location": "分析前因素对检验结果的影响章节",
"source_url": "",
"source_note": "本卡出处已由课程团队核对为真实出版物/行业规范，尚未补公开访问链接。",
"version": "第4版 2015",
"scope": "medical_technology·检验前患者准备",
"exceptions": "饮食影响的判断需结合项目特性，是否改期由开单医师决定，学生只负责如实询问与记录。",
"misconceptions": [
"只要没吃早饭就算空腹合格",
"患者说昨天喝了酒也照常采血不记录"
],
"lay_terms": [
"前一天晚上如果吃了很油的东西或者喝了酒，麻烦告诉我，有些结果会受影响。"
],
"reviewer": "知护课程团队（已复核来源）",
"review_status": "课程团队已复核",
"updated_at": "2026-10-30"
},
{
"knowledge_id": "K-MT-104",
"node_id": "medical_technology",
"topic_slug": "mt_exercise_rest_before_sampling",
"title": "运动情绪与静息时间的要求",
"claim": "剧烈运动可使肌酸激酶、乳酸与部分肝酶升高，情绪紧张与寒冷刺激也会影响血压与激素类项目；采血前应让患者静坐休息五至十分钟，并询问近二十四小时的运动与熬夜情况。",
"source": "全国临床检验操作规程",
"source_location": "患者状态与生理性变异章节",
"source_url": "",
"source_note": "本卡出处已由课程团队核对为真实出版物/行业规范，尚未补公开访问链接。",
"version": "第4版 2015",
"scope": "medical_technology·检验前患者准备",
"exceptions": "急诊与危重患者以尽快获取结果为先，静息要求可放宽，但应在申请单上注明实际状态。",
"misconceptions": [
"患者刚跑完楼梯就立即采血且不记录",
"认为静息时间只是形式，不影响结果"
],
"lay_terms": [
"您先坐着歇十分钟，刚运动完抽血有些指标会偏高，我得跟医生说清楚。"
],
"reviewer": "知护课程团队（已复核来源）",
"review_status": "课程团队已复核",
"updated_at": "2026-10-30"
},
{
"knowledge_id": "K-MT-105",
"node_id": "medical_technology",
"topic_slug": "mt_drug_timing_monitoring",
"title": "采血时间点与药物影响记录",
"claim": "治疗药物浓度监测应在药物达稳态后、按医嘱于下次给药前采血，并记录末次给药时间；患者正在使用的药物可能干扰检测，应如实记录并告知开单医师，不得让患者自行停药或改量。",
"source": "全国临床检验操作规程",
"source_location": "治疗药物浓度监测标本采集章节",
"source_url": "",
"source_note": "本卡出处已由课程团队核对为真实出版物/行业规范，尚未补公开访问链接。",
"version": "第4版 2015",
"scope": "medical_technology·检验前患者准备",
"exceptions": "给药方案与是否停药只能由开单医师决定，学生不得给出任何用药调整建议。",
"misconceptions": [
"让患者先停两天药再来抽血",
"不记录末次给药时间就采血"
],
"lay_terms": [
"这次抽血要卡在下次吃药之前，您上次吃药是几点？我需要记下来告诉医生。"
],
"reviewer": "知护课程团队（已复核来源）",
"review_status": "课程团队已复核",
"updated_at": "2026-10-30"
},
{
"knowledge_id": "K-MT-106",
"node_id": "medical_technology",
"topic_slug": "mt_posture_tourniquet_effect",
"title": "体位与止血带对结果的影响",
"claim": "采血宜取坐位或卧位并保持体位一致，止血带缚扎时间不宜超过一分钟，见回血后即松解；长时间握拳、反复拍打血管会使钾、乳酸等结果偏高，应避免这些习惯做法。",
"source": "WS/T 661—2020 静脉血液标本采集指南",
"source_location": "静脉穿刺操作与止血带使用条款",
"source_url": "",
"source_note": "本卡出处已由课程团队核对为真实出版物/行业规范，尚未补公开访问链接。",
"version": "2020",
"scope": "medical_technology·检验前患者准备",
"exceptions": "采血体位以患者病情与血管条件为准，需卧位采血者应在申请单注明，便于结果解释。",
"misconceptions": [
"让患者一直用力握拳到采血结束",
"止血带扎上后先慢慢找血管再说"
],
"lay_terms": [
"袖子挽起来，手轻轻握着就行，不用使劲攥，扎带子我一会儿就松开。"
],
"reviewer": "知护课程团队（已复核来源）",
"review_status": "课程团队已复核",
"updated_at": "2026-10-30"
},
{
"knowledge_id": "K-MT-107",
"node_id": "medical_technology",
"topic_slug": "mt_infusion_contrast_interference",
"title": "输液与造影剂的采血规避",
"claim": "应选择非输液侧肢体采血，输液侧标本的结果不能代表患者真实水平；使用碘对比剂后部分项目需按规定间隔再采血，具体间隔按项目要求与机构规定执行，并在申请单上注明。",
"source": "全国临床检验操作规程",
"source_location": "标本采集影响因素与干扰章节",
"source_url": "",
"source_note": "本卡出处已由课程团队核对为真实出版物/行业规范，尚未补公开访问链接。",
"version": "第4版 2015",
"scope": "medical_technology·检验前患者准备",
"exceptions": "双侧均输液等特殊情况下由医师与检验人员共同决定采血部位，并在报告中说明。",
"misconceptions": [
"顺手套用正在输液的留置针采血",
"刚做完增强 CT 立即抽血查肾功能"
],
"lay_terms": [
"您这边在输液，我换另一只手抽，不然结果会不准。"
],
"reviewer": "知护课程团队（已复核来源）",
"review_status": "课程团队已复核",
"updated_at": "2026-10-30"
},
{
"knowledge_id": "K-MT-108",
"node_id": "medical_technology",
"topic_slug": "mt_patient_comm_fainting_prevention",
"title": "采血前沟通与晕针预防",
"claim": "采血前应说明目的、大致步骤与可能出现的不适，询问晕针史与抗凝药使用情况；有晕针史者取平卧位采血并留观，出现面色苍白、出汗、心慌时应立即停止操作并呼叫医护人员。",
"source": "WS/T 661—2020 静脉血液标本采集指南",
"source_location": "患者沟通与采血不良反应处理条款",
"source_url": "",
"source_note": "本卡出处已由课程团队核对为真实出版物/行业规范，尚未补公开访问链接。",
"version": "2020",
"scope": "medical_technology·检验前患者准备",
"exceptions": "晕针的处理与是否继续采血由现场医护人员判断，学生不得独自处理意识改变的患者。",
"misconceptions": [
"怕患者紧张就不提可能的不适",
"患者说晕针仍让其站着采血"
],
"lay_terms": [
"您以前抽血有没有头晕过？如果有，我让您躺着抽，抽完坐一会儿再走。"
],
"reviewer": "知护课程团队（已复核来源）",
"review_status": "课程团队已复核",
"updated_at": "2026-10-30"
},
{
"knowledge_id": "K-MT-109",
"node_id": "medical_technology",
"topic_slug": "mt_prep_noncompliance_handling",
"title": "准备不合格时的处理与记录",
"claim": "患者未按要求空腹、刚进食油腻食物、刚运动或正在输液时，应记录实际情况并告知开单医师，由医师决定是否改期复查；不得在申请单上补填已空腹，也不得替患者隐瞒准备情况。",
"source": "医疗机构临床实验室管理办法",
"source_location": "临床实验室质量管理与标本采集相关条款",
"source_url": "",
"source_note": "本卡出处已由课程团队核对为真实出版物/行业规范，尚未补公开访问链接。",
"version": "2006",
"scope": "medical_technology·检验前患者准备",
"exceptions": "急诊标本即使准备不充分也应先检测并在报告中注明条件，是否复查由临床决定。",
"misconceptions": [
"在申请单上直接勾选已空腹",
"觉得结果偏高就自己改成正常值"
],
"lay_terms": [
"您今天吃过东西了是吧？我先跟医生说明情况，看是今天抽还是改天再来。"
],
"reviewer": "知护课程团队（已复核来源）",
"review_status": "课程团队已复核",
"updated_at": "2026-10-30"
},
{
"knowledge_id": "K-MT-110",
"node_id": "medical_technology",
"topic_slug": "mt_blood_draw_order_additives",
"title": "多管采血的顺序与添加剂",
"claim": "一次采多管时通常按血培养、凝血、无添加剂、促凝、肝素、EDTA、氟化钠的顺序进行，以减少添加剂交叉污染；凝血管应排在添加剂管之前，每管采完立即按管壁标示颠倒混匀。",
"source": "WS/T 661—2020 静脉血液标本采集指南",
"source_location": "采血顺序与添加剂管使用条款",
"source_url": "",
"source_note": "本卡出处已由课程团队核对为真实出版物/行业规范，尚未补公开访问链接。",
"version": "2020",
"scope": "medical_technology·标本采集与转运",
"exceptions": "具体顺序以所用采血系统说明书和机构 SOP 为准，学生不得凭记忆随意调换。",
"misconceptions": [
"先抽 EDTA 管再抽凝血管",
"所有管子抽完一起混匀"
],
"lay_terms": [
"要抽几管血，顺序有讲究，我一管一管来，抽完轻轻摇匀。"
],
"reviewer": "知护课程团队（已复核来源）",
"review_status": "课程团队已复核",
"updated_at": "2026-10-30"
},
{
"knowledge_id": "K-MT-111",
"node_id": "medical_technology",
"topic_slug": "mt_anticoagulant_blood_ratio",
"title": "采血量与抗凝剂比例的核对",
"claim": "凝血管必须采至管壁标示刻度，采血量不足会使抗凝剂相对过量、凝血结果失真；血量与添加剂比例不符的标本应拒收重采，不得把血倒掉一点再送检或勉强上机。",
"source": "WS/T 359 血浆凝固实验血液标本的采集及处理指南",
"source_location": "标本采集量与抗凝剂比例条款",
"source_url": "",
"source_note": "本卡出处已由课程团队核对为真实出版物/行业规范，尚未补公开访问链接。",
"version": "2011",
"scope": "medical_technology·标本采集与转运",
"exceptions": "患者血细胞比容异常时的采血量调整按实验室规定执行，学生不得自行换算。",
"misconceptions": [
"血不够就把管子里的血倒掉一些",
"量差一点也照样送检"
],
"lay_terms": [
"这管血得抽到这条线，少了结果就不准，可能要麻烦您再抽一次。"
],
"reviewer": "知护课程团队（已复核来源）",
"review_status": "课程团队已复核",
"updated_at": "2026-10-30"
},
{
"knowledge_id": "K-MT-112",
"node_id": "medical_technology",
"topic_slug": "mt_mixing_hemolysis_prevention",
"title": "标本混匀方式与溶血预防",
"claim": "含添加剂的采血管采集后应轻柔颠倒混匀五至八次，禁止剧烈振荡或用力的前后摇动；用注射器采血时应先拔针再沿管壁缓慢注入，避免在针头处加压推注造成溶血。",
"source": "WS/T 661—2020 静脉血液标本采集指南",
"source_location": "标本混匀与溶血防范条款",
"source_url": "",
"source_note": "本卡出处已由课程团队核对为真实出版物/行业规范，尚未补公开访问链接。",
"version": "2020",
"scope": "medical_technology·标本采集与转运",
"exceptions": "混匀次数以所用采血管说明书为准，发现溶血标本应重新采集并记录原因。",
"misconceptions": [
"用力上下摇晃让血快点混匀",
"带着针头把血用力推进试管"
],
"lay_terms": [
"抽完我会轻轻把管子倒几下，不能使劲摇，摇了血细胞会破。"
],
"reviewer": "知护课程团队（已复核来源）",
"review_status": "课程团队已复核",
"updated_at": "2026-10-30"
},
{
"knowledge_id": "K-MT-113",
"node_id": "medical_technology",
"topic_slug": "mt_specimen_labeling_bedside",
"title": "标本标识与床旁贴签要求",
"claim": "标本应在患者床旁、采集完成后立即贴签或打印条码，标签需有姓名、住院号或门诊号、采集日期与时间及采集者；离开床旁后再补贴标签的标本视为标识不合格，必须重新采集。",
"source": "WS/T 661—2020 静脉血液标本采集指南",
"source_location": "标本标识与条码信息条款",
"source_url": "",
"source_note": "本卡出处已由课程团队核对为真实出版物/行业规范，尚未补公开访问链接。",
"version": "2020",
"scope": "medical_technology·标本采集与转运",
"exceptions": "条码格式与必填项以机构 LIS 规定为准；标识错误的标本一律不得进入检测流程。",
"misconceptions": [
"回到治疗室再统一贴标签",
"拿错管子就把标签撕下来重贴"
],
"lay_terms": [
"标签我当着您的面贴好，写上时间和名字，回头不会弄错人。"
],
"reviewer": "知护课程团队（已复核来源）",
"review_status": "课程团队已复核",
"updated_at": "2026-10-30"
},
{
"knowledge_id": "K-MT-114",
"node_id": "medical_technology",
"topic_slug": "mt_transport_time_temperature",
"title": "标本转运时限与温度要求",
"claim": "常规标本应在采集后两小时内送达实验室，血气、血氨、乳酸等需立即送检；需冷藏的项目应置于二至八摄氏度转运，不得冷冻，也不得在高温或阳光直射环境下长时间放置。",
"source": "WS/T 640 临床微生物学检验标本的采集和转运",
"source_location": "标本保存与转运条件条款",
"source_url": "",
"source_note": "本卡出处已由课程团队核对为真实出版物/行业规范，尚未补公开访问链接。",
"version": "2018",
"scope": "medical_technology·标本采集与转运",
"exceptions": "超出时限的标本是否检测由实验室按项目稳定性判断，不得由采集者自行决定照常检测。",
"misconceptions": [
"把标本放在暖气旁等集中送检",
"血气标本放冰箱里存到下午"
],
"lay_terms": [
"这管血要赶紧送检验科，放久了结果就不准了。"
],
"reviewer": "知护课程团队（已复核来源）",
"review_status": "课程团队已复核",
"updated_at": "2026-10-30"
},
{
"knowledge_id": "K-MT-115",
"node_id": "medical_technology",
"topic_slug": "mt_urine_stool_collection",
"title": "尿液与粪便标本采集要点",
"claim": "中段尿应在清洁外阴后留取晨起首次尿的中段，使用无菌容器并加盖；二十四小时尿需在起始时排空膀胱并记录时间，全程按规定加防腐剂、混匀后取样并记录总尿量。",
"source": "WS/T 662—2020 临床体液检验技术要求",
"source_location": "尿液与粪便标本采集及送检要求",
"source_url": "",
"source_note": "本卡出处已由课程团队核对为真实出版物/行业规范，尚未补公开访问链接。",
"version": "2020",
"scope": "medical_technology·标本采集与转运",
"exceptions": "防腐剂种类与用量按实验室规定执行，学生不得自行添加或省略。",
"misconceptions": [
"随便接一杯尿就送检",
"二十四小时尿不记录总量只送一小瓶"
],
"lay_terms": [
"留尿前先清洗一下，接中间那段尿，接满半杯盖好送过来。"
],
"reviewer": "知护课程团队（已复核来源）",
"review_status": "课程团队已复核",
"updated_at": "2026-10-30"
},
{
"knowledge_id": "K-MT-116",
"node_id": "medical_technology",
"topic_slug": "mt_microbiology_culture_timing",
"title": "微生物培养的采集时机",
"claim": "血培养应在使用抗菌药物之前、寒战或发热初期采集，按标准采血量双侧多瓶送检；伤口分泌物应先清洁表面再取深部分泌物，避免只取表面脓液，采集后尽快送检。",
"source": "WS/T 640 临床微生物学检验标本的采集和转运",
"source_location": "血培养与伤口分泌物采集条款",
"source_url": "",
"source_note": "本卡出处已由课程团队核对为真实出版物/行业规范，尚未补公开访问链接。",
"version": "2018",
"scope": "medical_technology·标本采集与转运",
"exceptions": "已用抗菌药物者仍应采集并在申请单注明用药情况，由实验室与临床共同判断结果意义。",
"misconceptions": [
"用完抗生素再抽血培养",
"只取伤口表面的一点点脓"
],
"lay_terms": [
"这个培养最好在用消炎药之前抽，抽的时候我会换几个部位。"
],
"reviewer": "知护课程团队（已复核来源）",
"review_status": "课程团队已复核",
"updated_at": "2026-10-30"
},
{
"knowledge_id": "K-MT-117",
"node_id": "medical_technology",
"topic_slug": "mt_biosafety_spill_response",
"title": "生物安全与标本溢洒处理",
"claim": "所有标本均按潜在感染性物质处理，操作时戴手套、必要时加口罩与护目镜，转运使用双层防漏袋或密闭容器；发生溢洒应先覆盖吸附、由外向内消毒，不得用手直接擦拭或用水冲散。",
"source": "WS/T 640 临床微生物学检验标本的采集和转运",
"source_location": "标本包装、运输与溢洒处置条款",
"source_url": "",
"source_note": "本卡出处已由课程团队核对为真实出版物/行业规范，尚未补公开访问链接。",
"version": "2018",
"scope": "medical_technology·标本采集与转运",
"exceptions": "溢洒处置的具体消毒剂与浓度以机构感染管理制度为准，学生不得自行配制使用。",
"misconceptions": [
"徒手捡起碎玻璃和标本管",
"用拖把把溢洒物直接推进下水道"
],
"lay_terms": [
"标本洒了先别踩，我拿吸水纸盖上再消毒，您稍等一下。"
],
"reviewer": "知护课程团队（已复核来源）",
"review_status": "课程团队已复核",
"updated_at": "2026-10-30"
},
{
"knowledge_id": "K-MT-118",
"node_id": "medical_technology",
"topic_slug": "mt_specimen_rejection_communication",
"title": "标本拒收标准与沟通方式",
"claim": "接收标本时应核对标识、采血量、容器与转运条件，对溶血、凝块、量不足或标识错误的标本应拒收并通知临床重采；拒收须记录原因与时间，不得抱着先做看看的想法勉强上机。",
"source": "医疗机构临床实验室管理办法",
"source_location": "标本接收、拒收与记录相关条款",
"source_url": "",
"source_note": "本卡出处已由课程团队核对为真实出版物/行业规范，尚未补公开访问链接。",
"version": "2006",
"scope": "medical_technology·标本采集与转运",
"exceptions": "危急患者标本可先检测并在报告中标注标本质量问题，是否重采由临床决定。",
"misconceptions": [
"溶血标本照样出报告不注明",
"拒收时不通知临床导致治疗延误"
],
"lay_terms": [
"这管血有点溶血，结果可能不准，我跟病房说一声重新抽一管。"
],
"reviewer": "知护课程团队（已复核来源）",
"review_status": "课程团队已复核",
"updated_at": "2026-10-30"
},
{
"knowledge_id": "K-MT-119",
"node_id": "medical_technology",
"topic_slug": "mt_qc_internal_control_action",
"title": "室内质控与失控结果的处置",
"claim": "每批检测应随行质控品，按既定规则判断在控与失控；出现失控应暂停发放该批报告，查找试剂、校准、仪器与操作原因，纠正并复测在控后方可发出，不得只挑好看的质控点。",
"source": "WS/T 641—2018 临床检验定量测定室内质量控制",
"source_location": "质控规则与失控处理条款",
"source_url": "",
"source_note": "本卡出处已由课程团队核对为真实出版物/行业规范，尚未补公开访问链接。",
"version": "2018",
"scope": "medical_technology·检验质量控制",
"exceptions": "失控原因的判断与患者标本是否重测由实验室负责人按规定决定，学生不得擅自放行报告。",
"misconceptions": [
"失控了重跑一次质控直到在控为止",
"把失控批次的报告先发出去再说"
],
"lay_terms": [
"今天的质控没通过，我先不往出发结果，查清楚原因再报。"
],
"reviewer": "知护课程团队（已复核来源）",
"review_status": "课程团队已复核",
"updated_at": "2026-10-30"
},
{
"knowledge_id": "K-MT-120",
"node_id": "medical_technology",
"topic_slug": "mt_calibration_reagent_lot",
"title": "校准与试剂批号更换要求",
"claim": "更换试剂批号、校准品批号或维修重要部件后应重新校准并做验证，比对结果在允许范围内方可使用；不得沿用旧校准曲线直接检测新批号试剂，也不得跳过验证直接出报告。",
"source": "WS/T 492—2016 临床检验定量测定项目精密度与正确度性能验证",
"source_location": "试剂批号更换与校准验证条款",
"source_url": "",
"source_note": "本卡出处已由课程团队核对为真实出版物/行业规范，尚未补公开访问链接。",
"version": "2016",
"scope": "medical_technology·检验质量控制",
"exceptions": "验证的可接受标准与操作步骤以实验室 SOP 与厂家说明为准，学生不得自行设定。",
"misconceptions": [
"换批号试剂直接上机不比对",
"用厂家给的参考值代替本室校准"
],
"lay_terms": [
"这批试剂是新批号，我先做比对确认没问题，再给患者发结果。"
],
"reviewer": "知护课程团队（已复核来源）",
"review_status": "课程团队已复核",
"updated_at": "2026-10-30"
},
{
"knowledge_id": "K-MT-121",
"node_id": "medical_technology",
"topic_slug": "mt_eqa_participation",
"title": "室间质评的参加与结果处理",
"claim": "应按计划参加室间质量评价并如实上报本室检测结果，不得与其他实验室串通、代做或修改原始数据；评价不合格应分析原因、制定纠正措施并跟踪验证，不得隐瞒不报。",
"source": "WS/T 644—2018 临床检验室间质量评价",
"source_location": "室间质评参加与不合格处理条款",
"source_url": "",
"source_note": "本卡出处已由课程团队核对为真实出版物/行业规范，尚未补公开访问链接。",
"version": "2018",
"scope": "medical_technology·检验质量控制",
"exceptions": "不合格原因分析与整改由科室质量小组负责，学生可参与记录但不得代为决策或篡改结果。",
"misconceptions": [
"拿别的实验室结果上报室间质评",
"质评不合格就当成没发生过"
],
"lay_terms": [
"这个外部质评是我们科室的能力考试，结果要如实上报，不合格就得整改。"
],
"reviewer": "知护课程团队（已复核来源）",
"review_status": "课程团队已复核",
"updated_at": "2026-10-30"
},
{
"knowledge_id": "K-MT-122",
"node_id": "medical_technology",
"topic_slug": "mt_instrument_maintenance_record",
"title": "仪器维护与日常保养记录",
"claim": "每日开机应按规定做保养、光路或管路检查并如实记录，维护记录是结果可追溯的依据之一；仪器出现报警、结果异常漂移或部件老化时应停机排查，不得带故障继续出报告。",
"source": "医疗机构临床实验室管理办法",
"source_location": "仪器设备管理与维护记录条款",
"source_url": "",
"source_note": "本卡出处已由课程团队核对为真实出版物/行业规范，尚未补公开访问链接。",
"version": "2006",
"scope": "medical_technology·检验质量控制",
"exceptions": "停机与恢复使用的决定由实验室负责人作出，学生发现异常应报告而不是自行处理。",
"misconceptions": [
"报警了按掉继续做",
"保养记录事后一次性补齐"
],
"lay_terms": [
"机器今天报过警，我先停下来检查，不能带着毛病给您出结果。"
],
"reviewer": "知护课程团队（已复核来源）",
"review_status": "课程团队已复核",
"updated_at": "2026-10-30"
},
{
"knowledge_id": "K-MT-123",
"node_id": "medical_technology",
"topic_slug": "mt_staff_qualification_authorization",
"title": "人员资质与授权操作要求",
"claim": "检测与报告审核应由取得相应专业技术资格并被授权的人员完成，新项目开展前应经过培训与考核；实习与进修人员须在带教人员监督下操作，不得独立签发报告或独自处理危急值。",
"source": "医疗机构临床实验室管理办法",
"source_location": "人员资质与岗位授权条款",
"source_url": "",
"source_note": "本卡出处已由课程团队核对为真实出版物/行业规范，尚未补公开访问链接。",
"version": "2006",
"scope": "medical_technology·检验质量控制",
"exceptions": "紧急情况下的人员调配按机构应急预案执行，学生始终不具备独立签发报告权限。",
"misconceptions": [
"实习生独自审核发出报告",
"没做过的新项目照着说明书直接开做"
],
"lay_terms": [
"我还在带教阶段，这个报告要请老师看过才能发出去。"
],
"reviewer": "知护课程团队（已复核来源）",
"review_status": "课程团队已复核",
"updated_at": "2026-10-30"
},
{
"knowledge_id": "K-MT-124",
"node_id": "medical_technology",
"topic_slug": "mt_sample_prep_centrifugation",
"title": "样本前处理与离心条件",
"claim": "血清标本应待血液充分凝固后按规定的离心力与时间离心，脂血、溶血或纤维蛋白凝块都会影响检测；离心不充分或血清中混有纤维蛋白的标本应重新离心或拒收，不得直接上机。",
"source": "WS/T 225 临床化学检验血液标本的采集与处理",
"source_location": "标本离心与前处理条款",
"source_url": "",
"source_note": "本卡出处已由课程团队核对为真实出版物/行业规范，尚未补公开访问链接。",
"version": "2002",
"scope": "medical_technology·检验质量控制",
"exceptions": "离心力与时间以本室验证的参数为准，学生不得自行缩短时间以提高速度。",
"misconceptions": [
"血还没凝就急着离心",
"看到血清里有纤维蛋白丝照样吸样"
],
"lay_terms": [
"这管血还没凝好，得再等一会儿才能离心，不然结果会飘。"
],
"reviewer": "知护课程团队（已复核来源）",
"review_status": "课程团队已复核",
"updated_at": "2026-10-30"
},
{
"knowledge_id": "K-MT-125",
"node_id": "medical_technology",
"topic_slug": "mt_reportable_range_dilution",
"title": "可报告范围与稀释复测",
"claim": "结果超出线性范围时应按规定倍数稀释后复测，并在报告中注明稀释倍数；低于检测下限的结果应报告为低于可报告下限，不能随意填成正常，也不能用未稀释的估算值直接发出。",
"source": "WS/T 406—2012 临床血液学检验常规项目分析质量要求",
"source_location": "可报告范围与结果报告条款",
"source_url": "",
"source_note": "本卡出处已由课程团队核对为真实出版物/行业规范，尚未补公开访问链接。",
"version": "2012",
"scope": "medical_technology·检验质量控制",
"exceptions": "稀释倍数与复测规则由实验室文件规定，超出范围的结果是否需临床沟通由负责人判断。",
"misconceptions": [
"结果超过上限就直接写大于上限",
"低于下限就填一个正常数值"
],
"lay_terms": [
"这个数值太高超量程了，我稀释后再测一遍，报告上会写清楚。"
],
"reviewer": "知护课程团队（已复核来源）",
"review_status": "课程团队已复核",
"updated_at": "2026-10-30"
},
{
"knowledge_id": "K-MT-126",
"node_id": "medical_technology",
"topic_slug": "mt_data_traceability_record",
"title": "原始记录与数据可追溯",
"claim": "原始数据、质控记录与报告修改均应留痕，信息系统中的手工修改须注明理由、时间与操作者；不得删除或覆盖原始结果，纸质记录与电子记录应保持一致，便于复核与追溯。",
"source": "医疗机构临床实验室管理办法",
"source_location": "检验记录与结果报告管理条款",
"source_url": "",
"source_note": "本卡出处已由课程团队核对为真实出版物/行业规范，尚未补公开访问链接。",
"version": "2006",
"scope": "medical_technology·检验质量控制",
"exceptions": "数据修改权限由科室负责人授予，学生不得申请或使用删除、覆盖原始数据的权限。",
"misconceptions": [
"结果不好看就删掉重做不留痕迹",
"纸质登记本事后凭记忆补写"
],
"lay_terms": [
"电脑里的原始数值不能删，改了什么都要写清楚是谁改的、为什么改。"
],
"reviewer": "知护课程团队（已复核来源）",
"review_status": "课程团队已复核",
"updated_at": "2026-10-30"
},
{
"knowledge_id": "K-MT-127",
"node_id": "medical_technology",
"topic_slug": "mt_qc_material_storage",
"title": "质控品的保存与复溶要求",
"claim": "质控品应按说明书要求冷藏或冷冻保存，复溶后在规定时间内使用，不得反复冻融；更换质控品批号后应重新建立靶值与控制范围，不得直接套用旧批号的靶值判断在控。",
"source": "WS/T 641—2018 临床检验定量测定室内质量控制",
"source_location": "质控品选择、保存与靶值设定条款",
"source_url": "",
"source_note": "本卡出处已由课程团队核对为真实出版物/行业规范，尚未补公开访问链接。",
"version": "2018",
"scope": "medical_technology·检验质量控制",
"exceptions": "靶值建立方法与允许误差由实验室按标准执行，学生不得自行更改控制限。",
"misconceptions": [
"质控品化开后分几次反复冻融",
"新批号质控品直接用旧靶值"
],
"lay_terms": [
"质控品化开就得当天用完，反复冻会影响它的稳定性。"
],
"reviewer": "知护课程团队（已复核来源）",
"review_status": "课程团队已复核",
"updated_at": "2026-10-30"
},
{
"knowledge_id": "K-MT-128",
"node_id": "medical_technology",
"topic_slug": "mt_imaging_order_verification",
"title": "影像申请单信息与部位核对",
"claim": "检查前应核对申请单上的患者信息、检查部位、左右侧与临床问题，确认与近期同类检查不重复；信息不全或部位描述含糊时先与开单医师确认，不得凭猜测摆位或扩大扫描范围。",
"source": "医学影像检查技术学",
"source_location": "检查前准备与患者核对章节",
"source_url": "",
"source_note": "本卡出处已由课程团队核对为真实出版物/行业规范，尚未补公开访问链接。",
"version": "第4版 2022",
"scope": "medical_technology·影像检查准备",
"exceptions": "检查范围与方式的最终确定由放射科医师负责，技师发现申请与病情不符应沟通而非自行更改。",
"misconceptions": [
"申请单没写左右就按习惯扫一侧",
"顺手把邻近部位一起扫了"
],
"lay_terms": [
"我先核对一下单子上的部位和左右，别扫错了地方。"
],
"reviewer": "知护课程团队（已复核来源）",
"review_status": "课程团队已复核",
"updated_at": "2026-10-30"
},
{
"knowledge_id": "K-MT-129",
"node_id": "medical_technology",
"topic_slug": "mt_mri_safety_screening",
"title": "磁共振检查的安全筛查",
"claim": "进入磁共振检查区前应逐项询问并填写安全筛查表，包括心脏起搏器、动脉瘤夹、金属异物、电子植入物与纹身；无法确认磁兼容性的植入物不得进入磁体间，须查证资料后再安排。",
"source": "医学影像检查技术学",
"source_location": "磁共振检查安全与禁忌证章节",
"source_url": "",
"source_note": "本卡出处已由课程团队核对为真实出版物/行业规范，尚未补公开访问链接。",
"version": "第4版 2022",
"scope": "medical_technology·影像检查准备",
"exceptions": "是否可进行检查由放射科医师依据植入物资料判断，学生不得凭患者口述放行。",
"misconceptions": [
"患者说没事就让他直接进磁体间",
"只问有没有做过手术不问植入物"
],
"lay_terms": [
"做磁共振前我要问清楚您身上有没有起搏器、金属夹或者金属碎片。"
],
"reviewer": "知护课程团队（已复核来源）",
"review_status": "课程团队已复核",
"updated_at": "2026-10-30"
},
{
"knowledge_id": "K-MT-130",
"node_id": "medical_technology",
"topic_slug": "mt_contrast_renal_allergy_assessment",
"title": "增强检查前的肾功与过敏史评估",
"claim": "使用碘对比剂前应询问过敏史、哮喘与甲状腺疾病史，核查近期肾功能结果，按机构规定判断是否需要水化或延期；高危患者由医师评估并与患者沟通风险后再安排检查。",
"source": "医学影像检查技术学",
"source_location": "对比剂使用与增强检查准备章节",
"source_url": "",
"source_note": "本卡出处已由课程团队核对为真实出版物/行业规范，尚未补公开访问链接。",
"version": "第4版 2022",
"scope": "medical_technology·影像检查准备",
"exceptions": "是否使用对比剂、是否水化只能由医师决定，学生不得给出用药或补液建议。",
"misconceptions": [
"不查肾功能直接打增强",
"患者说以前打过没事就不问过敏史"
],
"lay_terms": [
"打增强针之前我要问您有没有药物过敏，还要看您最近的肾功能报告。"
],
"reviewer": "知护课程团队（已复核来源）",
"review_status": "课程团队已复核",
"updated_at": "2026-10-30"
},
{
"knowledge_id": "K-MT-131",
"node_id": "medical_technology",
"topic_slug": "mt_contrast_consent_emergency",
"title": "对比剂知情同意与急救准备",
"claim": "使用对比剂前应告知检查目的、可能出现的不适与风险并签署知情同意，检查室内应备有急救设备、氧气与抢救人员；患者出现皮疹、气促、恶心呕吐时应立即停止注射并启动急救流程。",
"source": "医学影像检查技术学",
"source_location": "对比剂不良反应与应急处置章节",
"source_url": "",
"source_note": "本卡出处已由课程团队核对为真实出版物/行业规范，尚未补公开访问链接。",
"version": "第4版 2022",
"scope": "medical_technology·影像检查准备",
"exceptions": "不良反应的用药与抢救由医师执行，学生只负责立即停止操作、呼救与配合。",
"misconceptions": [
"签字单让患者自己看自己签不解释",
"出现皮疹先观察一会儿再说"
],
"lay_terms": [
"打针时如果您觉得喉咙发紧、身上痒，马上告诉我，我们立刻处理。"
],
"reviewer": "知护课程团队（已复核来源）",
"review_status": "课程团队已复核",
"updated_at": "2026-10-30"
},
{
"knowledge_id": "K-MT-132",
"node_id": "medical_technology",
"topic_slug": "mt_abdominal_bowel_preparation",
"title": "腹部检查的禁食与肠道准备",
"claim": "腹部 CT 与部分腹部超声需按医嘱禁食、饮水充盈胃腔或做肠道清洁，盆腔超声则需适度充盈膀胱；检查前应确认患者是否按要求执行并记录，准备不充分会影响图像判断。",
"source": "医学影像检查技术学",
"source_location": "腹部与盆腔检查前准备章节",
"source_url": "",
"source_note": "本卡出处已由课程团队核对为真实出版物/行业规范，尚未补公开访问链接。",
"version": "第4版 2022",
"scope": "medical_technology·影像检查准备",
"exceptions": "禁食时长与饮水量的具体要求按项目与机构规定执行，学生不得口头加码。",
"misconceptions": [
"腹盆部检查一律要求憋尿",
"患者说吃了一点没关系就照做"
],
"lay_terms": [
"这个检查要空肚子，您从昨晚几点以后就没吃东西了？我先确认一下。"
],
"reviewer": "知护课程团队（已复核来源）",
"review_status": "课程团队已复核",
"updated_at": "2026-10-30"
},
{
"knowledge_id": "K-MT-133",
"node_id": "medical_technology",
"topic_slug": "mt_breath_hold_training",
"title": "屏气训练与扫描配合",
"claim": "胸部与上腹部扫描前应训练患者在吸气末屏气，用患者能听懂的话示范并让其练习一至两次；不能配合者应与技师、医师沟通调整方案，不得强行扫描后把不能诊断的图像直接送出。",
"source": "医学影像检查技术学",
"source_location": "胸腹部扫描呼吸训练章节",
"source_url": "",
"source_note": "本卡出处已由课程团队核对为真实出版物/行业规范，尚未补公开访问链接。",
"version": "第4版 2022",
"scope": "medical_technology·影像检查准备",
"exceptions": "扫描方案调整属技师与医师职责，学生不得自行更改序列或增加扫描次数。",
"misconceptions": [
"不训练直接扫，扫完发现全是伪影",
"让患者一直憋着不告诉什么时候可以呼吸"
],
"lay_terms": [
"等我说吸气，您吸满一口气憋住，机器响完我说可以喘气您再松。"
],
"reviewer": "知护课程团队（已复核来源）",
"review_status": "课程团队已复核",
"updated_at": "2026-10-30"
},
{
"knowledge_id": "K-MT-134",
"node_id": "medical_technology",
"topic_slug": "mt_pediatric_sedation_support",
"title": "儿童检查的安抚与镇静配合",
"claim": "对不能配合的儿童应先尝试安抚、家长陪同与缩短扫描时间，确需镇静时由麻醉或儿科医师评估并实施；检查过程中应持续观察呼吸、体位与约束情况，防止坠床与气道问题。",
"source": "医学影像检查技术学",
"source_location": "儿童影像检查与镇静配合章节",
"source_url": "",
"source_note": "本卡出处已由课程团队核对为真实出版物/行业规范，尚未补公开访问链接。",
"version": "第4版 2022",
"scope": "medical_technology·影像检查准备",
"exceptions": "镇静药物的选择与剂量只能由实施镇静的医师决定，学生不得建议或参与给药。",
"misconceptions": [
"孩子哭就按住硬扫",
"家长陪同就不做辐射防护"
],
"lay_terms": [
"小朋友先跟妈妈在这儿待一会儿，我们尽量让他睡着再做，不用硬按。"
],
"reviewer": "知护课程团队（已复核来源）",
"review_status": "课程团队已复核",
"updated_at": "2026-10-30"
},
{
"knowledge_id": "K-MT-135",
"node_id": "medical_technology",
"topic_slug": "mt_image_quality_rescan",
"title": "图像质量的即时判断与补扫",
"claim": "检查结束前应即时浏览图像，判断有无运动伪影、体位不全、金属伪影与部位覆盖不足；发现不合格应立即补扫或请示上级，不得把不可诊断的图像直接送入报告流程。",
"source": "医学影像检查技术学",
"source_location": "图像质量控制与重拍条款",
"source_url": "",
"source_note": "本卡出处已由课程团队核对为真实出版物/行业规范，尚未补公开访问链接。",
"version": "第4版 2022",
"scope": "medical_technology·影像检查准备",
"exceptions": "是否补扫与补扫范围由技师与诊断医师共同判断，涉及增加辐射时须说明理由。",
"misconceptions": [
"图像模糊也直接发出去让医师自己看",
"患者走了才想起漏了部位"
],
"lay_terms": [
"这张图像有点糊，我再给您扫一遍，免得医生看不清。"
],
"reviewer": "知护课程团队（已复核来源）",
"review_status": "课程团队已复核",
"updated_at": "2026-10-30"
},
{
"knowledge_id": "K-MT-136",
"node_id": "medical_technology",
"topic_slug": "mt_post_exam_observation",
"title": "检查后观察与离室交代",
"claim": "增强检查后应留观一定时间、确认无迟发反应再让患者离开，交代多饮水以及出现皮疹、气促、声音嘶哑时及时就诊；哺乳期与特殊人群的注意事项按机构规定交代并做好记录。",
"source": "医学影像检查技术学",
"source_location": "增强检查后观察与护理章节",
"source_url": "",
"source_note": "本卡出处已由课程团队核对为真实出版物/行业规范，尚未补公开访问链接。",
"version": "第4版 2022",
"scope": "medical_technology·影像检查准备",
"exceptions": "迟发反应的处理与是否需就医由医师判断，学生只做告知与协助联系。",
"misconceptions": [
"打完针就让患者马上走",
"不交代迟发反应的表现"
],
"lay_terms": [
"打针后在这儿坐半小时再走，回去多喝水，要是身上起疹子或喘不上气就赶紧来医院。"
],
"reviewer": "知护课程团队（已复核来源）",
"review_status": "课程团队已复核",
"updated_at": "2026-10-30"
},
{
"knowledge_id": "K-MT-137",
"node_id": "medical_technology",
"topic_slug": "mt_radiation_justification",
"title": "放射检查的正当化判断",
"claim": "开具或执行放射检查前应确认有明确的临床指征，能用超声、磁共振或既往影像回答的问题不应重复照射；对无指征的申请应提出疑问并由临床医师重新评估，技术人员不得自行扩大检查范围。",
"source": "放射诊疗管理规定",
"source_location": "第二十五条 医疗照射正当化与防护最优化",
"source_url": "https://www.nhc.gov.cn/wjw/c100221/202201/c7a29190859c4bfeac3a057b0f1415bb/files/%E6%94%BE%E5%B0%84%E8%AF%8A%E7%96%97%E7%AE%A1%E7%90%86%E8%A7%84%E5%AE%9A.pdf",
"source_note": "用于放射检查正当化与检查沟通教学，条款以现行发布文本为准，不替代临床决策。",
"version": "2016",
"scope": "medical_technology·放射防护与检查正当化",
"exceptions": "是否取消、更换或延期检查由有权限的医师结合临床目的决定，技术人员不具备取消医嘱的权限。",
"misconceptions": [
"患者要求查就给他加扫一个部位",
"上次查过这次再查一遍更放心"
],
"lay_terms": [
"这个检查得先看有没有必要做，做了能解决什么问题，没必要的照射我们会帮您把关。"
],
"reviewer": "知护课程团队（已复核来源，链接已核实）",
"review_status": "课程团队已复核",
"updated_at": "2026-10-30"
},
{
"knowledge_id": "K-MT-138",
"node_id": "medical_technology",
"topic_slug": "mt_radiation_optimization_dose",
"title": "最优化原则与剂量控制",
"claim": "在满足诊断需要的前提下应采用尽可能低的剂量，按检查部位与患者体型调整曝光条件并正确使用自动曝光控制；不得为追求图像美观提高剂量或扩大照射野，也不得照搬他人的曝光参数。",
"source": "GB 18871—2002 电离辐射防护与辐射源安全基本标准",
"source_location": "医疗照射的防护最优化要求",
"source_url": "",
"source_note": "本卡出处已由课程团队核对为真实出版物/行业规范，尚未补公开访问链接。",
"version": "2002",
"scope": "medical_technology·放射防护与检查正当化",
"exceptions": "曝光参数的最终设定由具备资质的技师依据设备与患者情况决定，学生不得自行调高参数。",
"misconceptions": [
"图像越亮越清楚就越好",
"不管胖瘦都用同一套参数"
],
"lay_terms": [
"我们会用刚好够看清的剂量来做，不会为了图像好看多照。"
],
"reviewer": "知护课程团队（已复核来源）",
"review_status": "课程团队已复核",
"updated_at": "2026-10-30"
},
{
"knowledge_id": "K-MT-139",
"node_id": "medical_technology",
"topic_slug": "mt_shielding_radiation_field",
"title": "照射野与敏感器官屏蔽",
"claim": "应把照射野限制在临床需要的范围内，对性腺、甲状腺、晶状体与乳腺等敏感器官使用可拆卸屏蔽；屏蔽物不得遮挡需要观察的诊断区域，摆位后应确认屏蔽位置是否正确。",
"source": "放射诊疗管理规定",
"source_location": "第三章 放射诊疗的防护 照射野与受检者防护",
"source_url": "https://www.nhc.gov.cn/wjw/c100221/202201/c7a29190859c4bfeac3a057b0f1415bb/files/%E6%94%BE%E5%B0%84%E8%AF%8A%E7%96%97%E7%AE%A1%E7%90%86%E8%A7%84%E5%AE%9A.pdf",
"source_note": "用于受检者防护与摆位操作教学，屏蔽器具使用以本室规程为准。",
"version": "2016",
"scope": "medical_technology·放射防护与检查正当化",
"exceptions": "是否使用屏蔽及屏蔽方式由技师依据检查部位判断，涉及诊断区域时不得遮挡。",
"misconceptions": [
"为了省事不给患者盖铅衣",
"铅衣随便一放不看位置"
],
"lay_terms": [
"这个部位对射线比较敏感，我给您盖上防护，不会挡住要看的区域。"
],
"reviewer": "知护课程团队（已复核来源，链接已核实）",
"review_status": "课程团队已复核",
"updated_at": "2026-10-30"
},
{
"knowledge_id": "K-MT-140",
"node_id": "medical_technology",
"topic_slug": "mt_pregnancy_inquiry_radiation",
"title": "育龄女性与妊娠的询问",
"claim": "对育龄期女性应主动询问是否妊娠或可能妊娠，必要时按机构流程确认后再决定检查方式；妊娠期原则上避免腹部与盆腔的放射检查，确需检查由医师权衡利弊并与患者沟通。",
"source": "放射诊疗管理规定",
"source_location": "第三章 放射诊疗的防护 育龄妇女与孕妇受检",
"source_url": "https://www.nhc.gov.cn/wjw/c100221/202201/c7a29190859c4bfeac3a057b0f1415bb/files/%E6%94%BE%E5%B0%84%E8%AF%8A%E7%96%97%E7%AE%A1%E7%90%86%E8%A7%84%E5%AE%9A.pdf",
"source_note": "用于妊娠相关放射防护与沟通教学，具体流程以机构规定为准。",
"version": "2016",
"scope": "medical_technology·放射防护与检查正当化",
"exceptions": "妊娠期是否可做检查由医师权衡并与患者共同决定，学生不得替患者判断风险大小。",
"misconceptions": [
"看患者年轻就不问怀孕的事",
"患者说应该没怀孕就直接照射"
],
"lay_terms": [
"做这个检查前我需要问一下，您最近有没有可能怀孕？这会影响我们怎么安排。"
],
"reviewer": "知护课程团队（已复核来源，链接已核实）",
"review_status": "课程团队已复核",
"updated_at": "2026-10-30"
},
{
"knowledge_id": "K-MT-141",
"node_id": "medical_technology",
"topic_slug": "mt_pediatric_radiation_protection",
"title": "儿童受检者的放射防护",
"claim": "儿童对辐射更敏感，应按体型与年龄选择专用条件、缩小照射野并做好固定，能用超声或磁共振替代时优先替代；不得直接套用成人曝光参数，也不得让家长在无防护情况下扶持。",
"source": "GBZ 130—2020 放射诊断放射防护要求",
"source_location": "儿科放射检查的防护要求",
"source_url": "",
"source_note": "本卡出处已由课程团队核对为真实出版物/行业规范，尚未补公开访问链接。",
"version": "2020",
"scope": "medical_technology·放射防护与检查正当化",
"exceptions": "儿童检查的体位固定方式由技师与陪同人员配合决定，涉及约束时须取得监护人同意。",
"misconceptions": [
"小孩就用大人参数减一半",
"让家长直接抱着孩子照"
],
"lay_terms": [
"孩子对射线比大人敏感，我们会用更小的范围、更低的剂量来做。"
],
"reviewer": "知护课程团队（已复核来源）",
"review_status": "课程团队已复核",
"updated_at": "2026-10-30"
},
{
"knowledge_id": "K-MT-142",
"node_id": "medical_technology",
"topic_slug": "mt_accompanying_person_protection",
"title": "陪检者与候检区的防护",
"claim": "非必要人员不得留在检查室内，必须陪同时应告知风险、提供铅衣等防护用品并登记；候检区应设置合理距离与防护，工作人员操作时注意屏蔽与站位，不得在无防护下扶持患者。",
"source": "放射诊疗管理规定",
"source_location": "第三章 放射诊疗的防护 陪检者与公众防护",
"source_url": "https://www.nhc.gov.cn/wjw/c100221/202201/c7a29190859c4bfeac3a057b0f1415bb/files/%E6%94%BE%E5%B0%84%E8%AF%8A%E7%96%97%E7%AE%A1%E7%90%86%E8%A7%84%E5%AE%9A.pdf",
"source_note": "用于陪检者防护与告知教学，登记表格式以机构规定为准。",
"version": "2016",
"scope": "medical_technology·放射防护与检查正当化",
"exceptions": "确需陪同时是否可进入检查室由当班技师依据防护条件判断，孕妇与儿童原则上不担任陪检者。",
"misconceptions": [
"家属想进来陪就让他站在机器旁边",
"实习生帮着扶患者但不穿铅衣"
],
"lay_terms": [
"家属最好在外面等，如果一定要进来扶，得穿上这件防护衣。"
],
"reviewer": "知护课程团队（已复核来源，链接已核实）",
"review_status": "课程团队已复核",
"updated_at": "2026-10-30"
},
{
"knowledge_id": "K-MT-143",
"node_id": "medical_technology",
"topic_slug": "mt_prior_imaging_review",
"title": "既往影像调阅与重复检查控制",
"claim": "开具新检查前应调阅近期同类影像与报告，能互认的不重复检查；确需复查应写明理由并说明间隔时间，短期内多次同部位照射应有明确的临床依据并与患者沟通必要性。",
"source": "医疗机构检查检验结果互认管理办法",
"source_location": "影像结果互认与重复检查控制条款",
"source_url": "",
"source_note": "本卡出处已由课程团队核对为真实出版物/行业规范，尚未补公开访问链接。",
"version": "2022",
"scope": "medical_technology·放射防护与检查正当化",
"exceptions": "是否复查由临床医师依据病情变化决定，技术人员可提示有近期影像但不能代替医师判断。",
"misconceptions": [
"换个医院就从头再查一遍",
"患者要求复查就安排"
],
"lay_terms": [
"您上周刚做过这个检查，我先看看片子能不能用，能用就不用再照一次。"
],
"reviewer": "知护课程团队（已复核来源）",
"review_status": "课程团队已复核",
"updated_at": "2026-10-30"
},
{
"knowledge_id": "K-MT-144",
"node_id": "medical_technology",
"topic_slug": "mt_personal_dosimeter_monitoring",
"title": "个人剂量监测与职业防护",
"claim": "放射工作人员应按周期佩戴个人剂量计并如实送检，剂量计不得转借、遮挡或带离工作场所；发现监测值异常应报告并排查操作、屏蔽与设备因素，不得自行拆看或更换剂量计。",
"source": "放射诊疗管理规定",
"source_location": "第四章 放射工作人员职业健康与剂量监测",
"source_url": "https://www.nhc.gov.cn/wjw/c100221/202201/c7a29190859c4bfeac3a057b0f1415bb/files/%E6%94%BE%E5%B0%84%E8%AF%8A%E7%96%97%E7%AE%A1%E7%90%86%E8%A7%84%E5%AE%9A.pdf",
"source_note": "用于放射工作人员职业防护教学，监测周期与送检流程以机构规定为准。",
"version": "2016",
"scope": "medical_technology·放射防护与检查正当化",
"exceptions": "剂量异常的原因认定与处置由放射防护管理部门负责，学生不得自行判断受照剂量是否安全。",
"misconceptions": [
"嫌麻烦不戴剂量计进机房",
"两个人共用一个剂量计"
],
"lay_terms": [
"这个小的剂量计要一直戴着，它记录我一年受到多少照射，不能借给别人。"
],
"reviewer": "知护课程团队（已复核来源，链接已核实）",
"review_status": "课程团队已复核",
"updated_at": "2026-10-30"
},
{
"knowledge_id": "K-MT-145",
"node_id": "medical_technology",
"topic_slug": "mt_radiation_risk_communication",
"title": "辐射风险询问的沟通边界",
"claim": "患者询问有没有辐射、会不会致癌时，应如实说明检查的必要性、剂量属于诊断范围并与获益相权衡，不承诺绝对安全；具体风险与替代方案由医师解释，学生不替患者做决定。",
"source": "放射诊疗管理规定",
"source_location": "医疗照射告知与受检者知情相关条款",
"source_url": "",
"source_note": "本卡出处已由课程团队核对为真实出版物/行业规范，尚未补公开访问链接。",
"version": "2016",
"scope": "medical_technology·放射防护与检查正当化",
"exceptions": "风险大小的解释与是否继续检查由医师与患者共同决定，学生只做一般性说明与引导。",
"misconceptions": [
"一口咬定做这个检查完全没影响",
"把剂量数值直接抛给患者不加解释"
],
"lay_terms": [
"这个检查确实有少量射线，但剂量在诊断范围内；要不要做、有没有别的办法，我请医生跟您详细说。"
],
"reviewer": "知护课程团队（已复核来源）",
"review_status": "课程团队已复核",
"updated_at": "2026-10-30"
},
{
"knowledge_id": "K-MT-146",
"node_id": "medical_technology",
"topic_slug": "mt_ultrasound_privacy_exposure",
"title": "超声心电检查的隐私保护",
"claim": "检查时应拉帘、关门，只暴露检查所需部位，异性检查需有第三人在场或取得患者同意；未经同意不得拍照、录像或让无关人员围观，讨论病情时避免在公共区域提及。",
"source": "医学影像检查技术学",
"source_location": "超声与心电检查的患者隐私与人文关怀章节",
"source_url": "",
"source_note": "本卡出处已由课程团队核对为真实出版物/行业规范，尚未补公开访问链接。",
"version": "第4版 2022",
"scope": "medical_technology·超声与心电检查沟通",
"exceptions": "诊疗需要时的示教与观摩须取得患者同意并按机构规定执行，学生不得擅自拍摄。",
"misconceptions": [
"门开着就掀衣服检查",
"带教学生围观不征求患者意见"
],
"lay_terms": [
"我把帘子拉上，只露出要检查的地方，您放心。"
],
"reviewer": "知护课程团队（已复核来源）",
"review_status": "课程团队已复核",
"updated_at": "2026-10-30"
},
{
"knowledge_id": "K-MT-147",
"node_id": "medical_technology",
"topic_slug": "mt_pelvic_ultrasound_bladder",
"title": "盆腔超声的憋尿与准备",
"claim": "经腹盆腔超声需适度充盈膀胱，应说明检查前饮水与憋尿的程度并避免过量饮水造成不适；经阴道或经直肠超声则应排空膀胱，并事先说明检查方式与可能的不适。",
"source": "医学影像检查技术学",
"source_location": "盆腔超声检查前准备章节",
"source_url": "",
"source_note": "本卡出处已由课程团队核对为真实出版物/行业规范，尚未补公开访问链接。",
"version": "第4版 2022",
"scope": "medical_technology·超声与心电检查沟通",
"exceptions": "具体检查途径由医师依据病情选择，患者有权拒绝某种途径并要求更换方式。",
"misconceptions": [
"让患者一次喝很多水憋到难受",
"经阴道超声也让患者先憋尿"
],
"lay_terms": [
"这个检查要憋点尿，检查前一小时喝两三杯水，别憋得太胀就行。"
],
"reviewer": "知护课程团队（已复核来源）",
"review_status": "课程团队已复核",
"updated_at": "2026-10-30"
},
{
"knowledge_id": "K-MT-148",
"node_id": "medical_technology",
"topic_slug": "mt_gel_probe_comfort",
"title": "耦合剂温度与探头接触",
"claim": "涂抹耦合剂前应告知会有凉感，冬季可预热耦合剂，动作轻柔并随时询问压力是否合适；患者表示疼痛或不适时应暂停、调整体位，不得为赶时间强行完成检查。",
"source": "医学影像检查技术学",
"source_location": "超声检查操作与患者舒适度章节",
"source_url": "",
"source_note": "本卡出处已由课程团队核对为真实出版物/行业规范，尚未补公开访问链接。",
"version": "第4版 2022",
"scope": "medical_technology·超声与心电检查沟通",
"exceptions": "检查手法与压力由操作者依据图像需要调整，患者明确表示疼痛时应停止并报告。",
"misconceptions": [
"凉耦合剂直接挤上去不打招呼",
"患者说疼还说忍一下马上好"
],
"lay_terms": [
"有点凉，您忍一下；我按得重了您就说，我轻一点。"
],
"reviewer": "知护课程团队（已复核来源）",
"review_status": "课程团队已复核",
"updated_at": "2026-10-30"
},
{
"knowledge_id": "K-MT-149",
"node_id": "medical_technology",
"topic_slug": "mt_ecg_skin_electrode",
"title": "心电图检查的皮肤与电极处理",
"claim": "做心电图前应清洁皮肤、必要时剃除电极部位毛发，按标准位置放置导联并确认电极接触良好；接触不良造成的基线漂移与干扰应处理后重做，不得把不合格图形直接送出。",
"source": "医学影像检查技术学",
"source_location": "心电图检查操作与伪差处理章节",
"source_url": "",
"source_note": "本卡出处已由课程团队核对为真实出版物/行业规范，尚未补公开访问链接。",
"version": "第4版 2022",
"scope": "medical_technology·超声与心电检查沟通",
"exceptions": "图形是否可诊断由具备资质的心电诊断医师判断，学生不得自行判读或下结论。",
"misconceptions": [
"电极随便贴不擦皮肤",
"图形有干扰也照样打印发报告"
],
"lay_terms": [
"我先擦一下皮肤再贴电极，这样图形才清楚，不会白做一次。"
],
"reviewer": "知护课程团队（已复核来源）",
"review_status": "课程团队已复核",
"updated_at": "2026-10-30"
},
{
"knowledge_id": "K-MT-150",
"node_id": "medical_technology",
"topic_slug": "mt_exam_communication_scope",
"title": "检查中沟通与结果解释边界",
"claim": "检查过程中应告诉患者正在做什么、需要怎样配合，不对图像或图形做有没有问题的即时评价；患者追问结果时应说明报告由具备资质的医师审核后出具并解释，学生不越位回答。",
"source": "医学影像检查技术学",
"source_location": "检查过程沟通与职业边界章节",
"source_url": "",
"source_note": "本卡出处已由课程团队核对为真实出版物/行业规范，尚未补公开访问链接。",
"version": "第4版 2022",
"scope": "medical_technology·超声与心电检查沟通",
"exceptions": "发现危急征象须立即报告医师，这不属于越位解释，而是必须执行的上报流程。",
"misconceptions": [
"边做边说这里好像有点问题",
"患者一问就说出自己的猜测"
],
"lay_terms": [
"图像我不做判断，报告要等医生看过签字后才能给您解释。"
],
"reviewer": "知护课程团队（已复核来源）",
"review_status": "课程团队已复核",
"updated_at": "2026-10-30"
},
{
"knowledge_id": "K-MT-151",
"node_id": "medical_technology",
"topic_slug": "mt_ultrasound_report_boundary",
"title": "超声描述与诊断的边界",
"claim": "超声报告中的描述性所见不等于诊断结论，学生不得对患者说你得了某种病；发现可疑征象应如实记录并提示临床医师进一步评估，由医师结合临床资料判断。",
"source": "医学影像检查技术学",
"source_location": "超声报告书写与诊断权限章节",
"source_url": "",
"source_note": "本卡出处已由课程团队核对为真实出版物/行业规范，尚未补公开访问链接。",
"version": "第4版 2022",
"scope": "medical_technology·超声与心电检查沟通",
"exceptions": "诊断性结论只能由具备资质的医师作出，学生可描述所见但不得下诊断。",
"misconceptions": [
"看到影像特征就直接告诉患者是什么病",
"把描述性术语当成确诊依据"
],
"lay_terms": [
"我看到的只是影像上的表现，具体是什么病要医生结合其他检查来判断。"
],
"reviewer": "知护课程团队（已复核来源）",
"review_status": "课程团队已复核",
"updated_at": "2026-10-30"
},
{
"knowledge_id": "K-MT-152",
"node_id": "medical_technology",
"topic_slug": "mt_critical_finding_escalation",
"title": "检查中危急发现的即时上报",
"claim": "检查中发现心电危急图形、心包积液或疑似宫外孕等紧急征象时，应立即口头报告当班医师并记录时间与接收人；同时保持患者不动、监测生命体征，不得让患者自行离开。",
"source": "医疗质量安全核心制度要点",
"source_location": "危急值报告制度与患者安全条款",
"source_url": "",
"source_note": "本卡出处已由课程团队核对为真实出版物/行业规范，尚未补公开访问链接。",
"version": "2018",
"scope": "medical_technology·超声与心电检查沟通",
"exceptions": "危急征象的判定与处置由医师负责，学生只执行立即报告、维持患者安全与记录。",
"misconceptions": [
"先做完检查再一起报告",
"只在报告单上写一句危急就算通知了"
],
"lay_terms": [
"这个情况我得马上叫医生过来，您先别动，我陪着您。"
],
"reviewer": "知护课程团队（已复核来源）",
"review_status": "课程团队已复核",
"updated_at": "2026-10-30"
},
{
"knowledge_id": "K-MT-153",
"node_id": "medical_technology",
"topic_slug": "mt_syncope_during_exam",
"title": "检查中晕厥与不适的处理",
"claim": "患者出现头晕、出汗、心慌时应立即停止检查、取平卧位并测量血压脉搏，同时呼叫医师；不得让患者独自离开或自行回家，恢复后仍需交代注意事项并做好记录。",
"source": "医学影像检查技术学",
"source_location": "检查中不良反应与应急处置章节",
"source_url": "",
"source_note": "本卡出处已由课程团队核对为真实出版物/行业规范，尚未补公开访问链接。",
"version": "第4版 2022",
"scope": "medical_technology·超声与心电检查沟通",
"exceptions": "是否需要进一步处理与转诊由医师判断，学生不得让症状未缓解的患者离院。",
"misconceptions": [
"让患者坐一会儿自己回家",
"症状缓解就继续把检查做完"
],
"lay_terms": [
"您先躺平别动，我给您量个血压，医生马上过来看。"
],
"reviewer": "知护课程团队（已复核来源）",
"review_status": "课程团队已复核",
"updated_at": "2026-10-30"
},
{
"knowledge_id": "K-MT-154",
"node_id": "medical_technology",
"topic_slug": "mt_probe_disinfection",
"title": "探头消毒与交叉感染防控",
"claim": "每例患者之间应按规定清洁消毒探头与导线，接触黏膜的探头须使用隔离膜或高水平消毒；手卫生与消毒记录是超声、心电检查的常规环节，不得因连台检查而省略。",
"source": "医疗机构消毒技术规范",
"source_location": "诊疗器械与超声探头消毒要求",
"source_url": "",
"source_note": "本卡出处已由课程团队核对为真实出版物/行业规范，尚未补公开访问链接。",
"version": "2012",
"scope": "medical_technology·超声与心电检查沟通",
"exceptions": "消毒剂选择与作用时间以厂家说明书和机构感染管理制度为准，学生不得自行更换。",
"misconceptions": [
"只用纸擦一下探头就接下一位",
"隔离膜破了也不更换"
],
"lay_terms": [
"每做完一位患者我们都会消毒探头、换手套，这是必须做的。"
],
"reviewer": "知护课程团队（已复核来源）",
"review_status": "课程团队已复核",
"updated_at": "2026-10-30"
},
{
"knowledge_id": "K-MT-155",
"node_id": "medical_technology",
"topic_slug": "mt_rehab_assessment_timing",
"title": "康复评定的目的与分期",
"claim": "康复评定不是一次性的检查，而是在初期、中期、末期分别进行：初期确定功能基线与目标，中期判断训练是否有效并调整方案，末期判断是否达到目标；每次评定都要记录结果和依据，不能只凭一次印象下结论。",
"source": "《康复评定学》（第3版，人民卫生出版社）",
"source_location": "康复评定概述与评定分期",
"source_url": "",
"source_note": "本卡出处已由课程团队核对为真实出版物/行业规范，尚未补公开访问链接。",
"version": "第3版",
"scope": "medical_technology·康复功能评定",
"exceptions": "急性期或不稳定病情者需床旁简化评定并由医师评估能否耐受；意识与配合度不足时改为观察性评定。",
"misconceptions": [
"做一次评定就定下整个疗程",
"只记'好转'不记具体分数和项目"
],
"lay_terms": [
"训练前我们先量一次底子，过一段时间再量一次，才能看出到底有没有进步。"
],
"reviewer": "知护课程团队（已复核来源）",
"review_status": "课程团队已复核",
"updated_at": "2026-10-30"
},
{
"knowledge_id": "K-MT-156",
"node_id": "medical_technology",
"topic_slug": "mt_rehab_mmt_grading",
"title": "徒手肌力评定（MMT）的分级与记录",
"claim": "徒手肌力评定按 0 到 5 级记录：0 级无收缩，1 级有收缩无动作，2 级可在消除重力下完成动作，3 级能抗重力完成全范围动作，4 级能抗部分阻力，5 级正常；记录时要写明体位、被测肌肉和是否抗重力，避免只写'肌力差'。",
"source": "《康复评定学》（第3版，人民卫生出版社）",
"source_location": "肌力评定·徒手肌力检查",
"source_url": "",
"source_note": "本卡出处已由课程团队核对为真实出版物/行业规范，尚未补公开访问链接。",
"version": "第3版",
"scope": "medical_technology·康复功能评定",
"exceptions": "疼痛、关节挛缩、装具固定或患者不能配合时结果不可靠，应注明限制条件；不宜用 MMT 评估很小的肌力变化。",
"misconceptions": [
"只写'肌力 3 级'不写体位和部位",
"疼痛时强行完成抗阻测试"
],
"lay_terms": [
"我们会固定好姿势再让您用力，这样量出来的力气才准，也不会让您忍着疼硬做。"
],
"reviewer": "知护课程团队（已复核来源）",
"review_status": "课程团队已复核",
"updated_at": "2026-10-30"
},
{
"knowledge_id": "K-MT-157",
"node_id": "medical_technology",
"topic_slug": "mt_rehab_rom_measure",
"title": "关节活动度测量的规范",
"claim": "用关节量角器测量活动度时，要先确定固定臂、移动臂和轴心的解剖标志，被动与主动各测一次并记录，左右对比；测量前说明动作并去除影响活动的衣物与支具，测量后复测确认，避免把疼痛性活动度当成真实关节活动度。",
"source": "《物理治疗学》（第3版，人民卫生出版社）",
"source_location": "关节活动度评定",
"source_url": "",
"source_note": "本卡出处已由课程团队核对为真实出版物/行业规范，尚未补公开访问链接。",
"version": "第3版",
"scope": "medical_technology·康复功能评定",
"exceptions": "术后早期、骨折未愈合或关节不稳者须遵医嘱限制活动范围；水肿明显时结果偏小，需注明。",
"misconceptions": [
"只测主动活动度就当完整结果",
"量角器轴心随手放，不找解剖标志"
],
"lay_terms": [
"我会先帮您把关节摆到标准位置量一次，再让您自己动一次，两边都记下来做对比。"
],
"reviewer": "知护课程团队（已复核来源）",
"review_status": "课程团队已复核",
"updated_at": "2026-10-30"
},
{
"knowledge_id": "K-MT-158",
"node_id": "medical_technology",
"topic_slug": "mt_rehab_barthel_adl",
"title": "Barthel 指数的评定与记录",
"claim": "Barthel 指数按进食、洗澡、修饰、穿衣、大便、小便、如厕、床椅转移、行走、上下楼梯十项打分，每项按是否需要帮助分级；评定要依据患者实际表现或照护者可靠描述，不能凭想象补分，入院与出院各评一次用于比较。",
"source": "《康复评定学》（第3版，人民卫生出版社）",
"source_location": "日常生活活动能力评定",
"source_url": "",
"source_note": "本卡出处已由课程团队核对为真实出版物/行业规范，尚未补公开访问链接。",
"version": "第3版",
"scope": "medical_technology·康复功能评定",
"exceptions": "认知障碍或环境不熟悉时得分可能偏低，需注明评定条件；卧床患者的行走项按实际能力记 0 分而非省略。",
"misconceptions": [
"照护者说'他都能自己做'就直接给满分",
"只评一次不复评"
],
"lay_terms": [
"这十件事我们一件件看您现在是自己能做、还是要人帮，分数只是帮我们看清哪里需要多练。"
],
"reviewer": "知护课程团队（已复核来源）",
"review_status": "课程团队已复核",
"updated_at": "2026-10-30"
},
{
"knowledge_id": "K-MT-159",
"node_id": "medical_technology",
"topic_slug": "mt_rehab_balance_gait_safety",
"title": "平衡与步态评定的安全防护",
"claim": "平衡与步态评定要在有保护的环境下进行：先确认患者能站立、旁边有人保护并备好助行器或座椅，从坐位平衡、站位平衡到动态平衡逐步升级；出现头晕、面色变化、下肢无力或明显不稳立即停止并记录，不可为了完成评分勉强患者。",
"source": "《物理治疗学》（第3版，人民卫生出版社）",
"source_location": "平衡与步态评定",
"source_url": "",
"source_note": "本卡出处已由课程团队核对为真实出版物/行业规范，尚未补公开访问链接。",
"version": "第3版",
"scope": "medical_technology·康复功能评定",
"exceptions": "严重骨质疏松、体位性低血压、近期跌倒或认知障碍者需降低难度或改为观察；跌倒高风险者评定全程不得离开陪护。",
"misconceptions": [
"让患者独自完成闭眼站立测试",
"跌倒风险高仍要求走完整条走廊"
],
"lay_terms": [
"我会一直站在您身边护着，觉得头晕或腿软就马上停下，我们先坐一会儿。"
],
"reviewer": "知护课程团队（已复核来源）",
"review_status": "课程团队已复核",
"updated_at": "2026-10-30"
},
{
"knowledge_id": "K-MT-160",
"node_id": "medical_technology",
"topic_slug": "mt_rehab_spasticity_pain",
"title": "痉挛与疼痛的评定",
"claim": "痉挛评定常用改良 Ashworth 量表，按被动活动时阻力出现的时机分级 0 到 4 级，评定前说明动作并保持同一速度；疼痛用 0 到 10 的数字评分或面部量表，记录部位、性质和诱发因素，不能把痉挛与疼痛混为一谈，也不能用一次评分代表全天状态。",
"source": "《康复评定学》（第3版，人民卫生出版社）",
"source_location": "肌张力与疼痛评定",
"source_url": "",
"source_note": "本卡出处已由课程团队核对为真实出版物/行业规范，尚未补公开访问链接。",
"version": "第3版",
"scope": "medical_technology·康复功能评定",
"exceptions": "关节挛缩、异位骨化或急性损伤时被动活动需谨慎；认知障碍者疼痛评分需结合表情与行为观察。",
"misconceptions": [
"把肌张力高直接等同于疼痛",
"只问一次疼不疼就当作全天疼痛水平"
],
"lay_terms": [
"我慢慢帮您活动关节，您感觉到阻力就告诉我；疼的话用 0 到 10 分说个大概就行。"
],
"reviewer": "知护课程团队（已复核来源）",
"review_status": "课程团队已复核",
"updated_at": "2026-10-30"
},
{
"knowledge_id": "K-MT-161",
"node_id": "medical_technology",
"topic_slug": "mt_rehab_six_minute_walk",
"title": "6 分钟步行试验的准备与终止指征",
"claim": "6 分钟步行试验前要测量静息心率、血压和血氧，说明走法与可随时停止的规则，试验中监测症状与血氧，出现胸痛、明显气促、头晕、血氧明显下降或面色苍白应立即终止并记录终止原因与距离。",
"source": "ATS Statement: Guidelines for the Six-Minute Walk Test",
"source_location": "American Journal of Respiratory and Critical Care Medicine, 2002",
"source_url": "",
"source_note": "本卡出处已由课程团队核对为真实出版物/行业规范，尚未补公开访问链接。",
"version": "2002",
"scope": "medical_technology·康复功能评定",
"exceptions": "不稳定心绞痛、未控制的心律失常、急性期疾病或静息血氧很低者不宜进行；需吸氧者应记录氧流量并在同一条件下复测。",
"misconceptions": [
"不测静息指标直接开始走",
"患者说胸闷仍要求走满 6 分钟"
],
"lay_terms": [
"走的时候如果胸口疼、喘得厉害或者头晕，您随时停下告诉我，不用坚持走完。"
],
"reviewer": "知护课程团队（已复核来源）",
"review_status": "课程团队已复核",
"updated_at": "2026-10-30"
},
{
"knowledge_id": "K-MT-162",
"node_id": "medical_technology",
"topic_slug": "mt_rehab_dysphagia_screen",
"title": "吞咽功能筛查与误吸风险",
"claim": "吞咽筛查要观察意识、体位、口唇闭合、咽部残留、声音变化和进食后咳嗽等迹象，用少量水或糊状食物分次试吞，出现呛咳、湿性嗓音或血氧下降应停止经口进食并报告医师；筛查阳性不等于确诊吞咽障碍，需进一步评估。",
"source": "《康复评定学》（第3版，人民卫生出版社）",
"source_location": "吞咽功能筛查",
"source_url": "",
"source_note": "本卡出处已由课程团队核对为真实出版物/行业规范，尚未补公开访问链接。",
"version": "第3版",
"scope": "medical_technology·康复功能评定",
"exceptions": "意识不清、频繁误吸史或气管切开患者不做床边试吞；筛查不能替代吞咽造影或纤维内镜评估。",
"misconceptions": [
"让患者大口喝水来'试试看'",
"筛查阴性就认为可以随意进食"
],
"lay_terms": [
"我们先让您小口试一点点，如果呛到或者嗓子发湿，就先不喂了，让医生再看。"
],
"reviewer": "知护课程团队（已复核来源）",
"review_status": "课程团队已复核",
"updated_at": "2026-10-30"
},
{
"knowledge_id": "K-MT-163",
"node_id": "medical_technology",
"topic_slug": "mt_rehab_cognition_screen_boundary",
"title": "认知与言语筛查的边界",
"claim": "床旁认知与言语筛查只能提示是否存在问题，不能作为诊断依据：应说明筛查目的、记录具体错项与配合程度，结果异常时建议由康复医师或言语治疗师做进一步评估；不得据一次筛查给患者贴'痴呆'或'失语'的标签。",
"source": "《康复评定学》（第3版，人民卫生出版社）",
"source_location": "认知与言语功能筛查",
"source_url": "",
"source_note": "本卡出处已由课程团队核对为真实出版物/行业规范，尚未补公开访问链接。",
"version": "第3版",
"scope": "medical_technology·康复功能评定",
"exceptions": "听力视力障碍、文化程度低、情绪紧张或疲劳会影响结果，需在记录中注明；急性期患者不宜做长时程测评。",
"misconceptions": [
"筛查分数低就说患者痴呆",
"把方言差异当成失语"
],
"lay_terms": [
"这只是先看看您记东西、说话哪方面需要帮忙，具体怎么回事还要专科老师再评一次。"
],
"reviewer": "知护课程团队（已复核来源）",
"review_status": "课程团队已复核",
"updated_at": "2026-10-30"
},
{
"knowledge_id": "K-MT-164",
"node_id": "medical_technology",
"topic_slug": "mt_report_critical_value",
"title": "危急值的识别与报告闭环",
"claim": "检验或检查出现危急值时应立即复测或复核原始标本，确认仪器与质控正常后按机构规定时限电话通知临床并登记：记录患者信息、项目、结果、接听人、时间与处理意见，之后追踪临床是否处置，形成'发现—复核—通知—记录—追踪'闭环。",
"source": "《医疗质量安全核心制度要点》（国卫医发〔2018〕8号）",
"source_location": "危急值报告制度",
"source_url": "",
"source_note": "本卡出处已由课程团队核对为真实出版物/行业规范，尚未补公开访问链接。",
"version": "2018",
"scope": "medical_technology·异常结果复核与报告边界",
"exceptions": "各机构危急值项目与阈值不同，以本机构公布的清单为准；电话通知后仍需在信息系统内留痕。",
"misconceptions": [
"发现危急值先等下一批标本一起报",
"只在系统里标注不打电话确认"
],
"lay_terms": [
"这个结果很关键，我们会马上复核并直接打电话给您的医生，确认他收到了才放心。"
],
"reviewer": "知护课程团队（已复核来源）",
"review_status": "课程团队已复核",
"updated_at": "2026-10-30"
},
{
"knowledge_id": "K-MT-165",
"node_id": "medical_technology",
"topic_slug": "mt_report_clinical_mismatch",
"title": "结果与临床不符时的复核顺序",
"claim": "结果与临床表现明显不符时按顺序排查：先核对患者身份与标本信息，再看标本质量（溶血、凝血、量不足），再查仪器状态与当日质控，最后考虑生理与药物干扰；确认无误后如实报告并在备注中说明已复核，不能私自改结果或压着不报。",
"source": "《临床检验质量管理技术规范》",
"source_location": "结果复核与不符合项处理",
"source_url": "",
"source_note": "本卡出处已由课程团队核对为真实出版物/行业规范，尚未补公开访问链接。",
"version": "现行版",
"scope": "medical_technology·异常结果复核与报告边界",
"exceptions": "复核仍不能解释时按机构流程启动复检或与临床沟通重新采样；不得因'看起来不合理'直接删除结果。",
"misconceptions": [
"结果和想象不一样就重抽一次了事",
"自己改数值让报告好看"
],
"lay_terms": [
"如果这个数和您的症状对不上，我们会按顺序查标本、查仪器，再和医生一起确认，不会随便改。"
],
"reviewer": "知护课程团队（已复核来源）",
"review_status": "课程团队已复核",
"updated_at": "2026-10-30"
},
{
"knowledge_id": "K-MT-166",
"node_id": "medical_technology",
"topic_slug": "mt_report_specimen_interference",
"title": "溶血、脂血与黄疸标本的处理",
"claim": "溶血、脂血、黄疸会干扰多项生化与免疫结果：发现标本异常应先判断是否符合拒收标准，能重采的说明原因请临床重采，不能重采的在报告备注中注明干扰项目与可能影响，不得照常发出易误导的数值。",
"source": "《临床检验质量管理技术规范》",
"source_location": "标本质量与干扰",
"source_url": "",
"source_note": "本卡出处已由课程团队核对为真实出版物/行业规范，尚未补公开访问链接。",
"version": "现行版",
"scope": "medical_technology·异常结果复核与报告边界",
"exceptions": "急诊抢救无法重采时可按机构规定报告并明确标注'标本溶血/脂血，结果仅供参考'；不同项目受影响程度不同，需查项目说明书。",
"misconceptions": [
"溶血标本照样发报告不备注",
"所有脂血标本一律拒收不区分项目"
],
"lay_terms": [
"这份血样有点溶血，有些指标会不准，我们会标注清楚，必要时再抽一次确认。"
],
"reviewer": "知护课程团队（已复核来源）",
"review_status": "课程团队已复核",
"updated_at": "2026-10-30"
},
{
"knowledge_id": "K-MT-167",
"node_id": "medical_technology",
"topic_slug": "mt_report_further_exam_advice",
"title": "影像报告'建议进一步检查'的沟通",
"claim": "影像报告写'建议进一步检查'时应说明是基于哪个征象、下一步建议做什么以及为什么要做，避免只说'再查一下'；同时说明该建议不构成诊断，最终由临床医师决定，患者有疑问时引导其与开单医师沟通。",
"source": "《医学影像检查技术学》（人民卫生出版社）",
"source_location": "影像诊断报告的书写与沟通",
"source_url": "",
"source_note": "本卡出处已由课程团队核对为真实出版物/行业规范，尚未补公开访问链接。",
"version": "现行版",
"scope": "medical_technology·异常结果复核与报告边界",
"exceptions": "急危征象需先按危急值流程通知临床，不能只写在报告里；增强检查需评估禁忌与知情同意。",
"misconceptions": [
"报告只写'建议复查'不写原因",
"把'建议进一步检查'说成'可能是癌'"
],
"lay_terms": [
"片子上有个地方看不太清，医生一般会建议再做个更清楚的检查，具体做什么由您的主治医生定。"
],
"reviewer": "知护课程团队（已复核来源）",
"review_status": "课程团队已复核",
"updated_at": "2026-10-30"
},
{
"knowledge_id": "K-MT-168",
"node_id": "medical_technology",
"topic_slug": "mt_report_imaging_critical",
"title": "影像危急发现的即时沟通",
"claim": "发现气胸、主动脉夹层、颅内出血、肠梗阻等危急征象时，应立即按危急值流程口头通知临床并记录时间与接听人，同时优先发出报告；不得等报告审核完成或下一班再通知，也不得只把结论写在系统里等对方查看。",
"source": "《医疗质量安全核心制度要点》（国卫医发〔2018〕8号）",
"source_location": "危急值报告制度与影像急危值",
"source_url": "",
"source_note": "本卡出处已由课程团队核对为真实出版物/行业规范，尚未补公开访问链接。",
"version": "2018",
"scope": "medical_technology·异常结果复核与报告边界",
"exceptions": "疑似但不确定的征象也应先口头提示临床并说明把握程度，由临床决定处理；口头沟通后必须补书面记录。",
"misconceptions": [
"等主任审核完再通知临床",
"只在系统里发文字不打电话"
],
"lay_terms": [
"这个片子上有需要马上处理的情况，我们会立刻打电话给您的医生，不会等到出正式报告。"
],
"reviewer": "知护课程团队（已复核来源）",
"review_status": "课程团队已复核",
"updated_at": "2026-10-30"
},
{
"knowledge_id": "K-MT-169",
"node_id": "medical_technology",
"topic_slug": "mt_report_scope_boundary",
"title": "报告不得越界下诊断",
"claim": "医学技术与影像人员可以描述所见、给出印象与建议，但不能替代临床医师下最终诊断、开处方或决定治疗方案；面对患者追问'我是不是得了某某病'，应说明报告结论需由临床医师结合病史与其他检查判断，并引导其找主诊医师。",
"source": "《医学影像检查技术学》（人民卫生出版社）",
"source_location": "报告书写规范与执业范围",
"source_url": "",
"source_note": "本卡出处已由课程团队核对为真实出版物/行业规范，尚未补公开访问链接。",
"version": "现行版",
"scope": "medical_technology·异常结果复核与报告边界",
"exceptions": "在医师授权与机构制度允许的范围内可做初步提示，但仍需注明'请结合临床'；急诊沟通以传递信息为主。",
"misconceptions": [
"对患者说'你就是肺癌'",
"直接告诉患者该吃什么药"
],
"lay_terms": [
"报告上写的是我们看到的现象和倾向，最后是不是这个病、怎么治，要由您的主治医生综合判断。"
],
"reviewer": "知护课程团队（已复核来源）",
"review_status": "课程团队已复核",
"updated_at": "2026-10-30"
},
{
"knowledge_id": "K-MT-170",
"node_id": "medical_technology",
"topic_slug": "mt_report_correction",
"title": "报告更正与补充报告的流程",
"claim": "发现已发出的报告有误时，应按机构流程开具更正或补充报告：写明原报告内容、更正内容、原因与时间，经审核后发出并通知临床；不得直接覆盖原记录或删除历史版本，更正痕迹要可追溯。",
"source": "《临床检验质量管理技术规范》",
"source_location": "报告更正与记录管理",
"source_url": "",
"source_note": "本卡出处已由课程团队核对为真实出版物/行业规范，尚未补公开访问链接。",
"version": "现行版",
"scope": "medical_technology·异常结果复核与报告边界",
"exceptions": "涉及危急值或已据此处置的报告，更正时须同时联系临床确认影响；患者已取走的报告应告知并换发。",
"misconceptions": [
"直接把系统里的旧报告改掉",
"更正报告不写原因"
],
"lay_terms": [
"如果之前的报告有笔误，我们会出一份更正说明，写清楚改了什么、为什么改，原来那份也留着备查。"
],
"reviewer": "知护课程团队（已复核来源）",
"review_status": "课程团队已复核",
"updated_at": "2026-10-30"
},
{
"knowledge_id": "K-MT-171",
"node_id": "medical_technology",
"topic_slug": "mt_report_patient_privacy",
"title": "患者索要结果时的解释边界与隐私",
"claim": "患者或家属询问结果时，应先核对身份与授权范围，只告知其有权知晓的内容，用通俗语言解释报告中的关键结论与下一步，不透露他人信息；涉及预后或敏感结果时建议由主诊医师告知，避免在公开区域讨论。",
"source": "《中华人民共和国基本医疗卫生与健康促进法》",
"source_location": "患者知情同意与隐私保护相关条款",
"source_url": "",
"source_note": "本卡出处已由课程团队核对为真实出版物/行业规范，尚未补公开访问链接。",
"version": "2020",
"scope": "medical_technology·异常结果复核与报告边界",
"exceptions": "未成年人、无民事行为能力人或授权委托人询问时按机构规定核对代理关系；紧急情况下以救治为先。",
"misconceptions": [
"在走廊大声念出患者的检查结果",
"家属一问就把全部结果说出去"
],
"lay_terms": [
"这些结果我可以先跟您说个大概，涉及后面怎么治，还是等您的主治医生一起说更清楚。"
],
"reviewer": "知护课程团队（已复核来源）",
"review_status": "课程团队已复核",
"updated_at": "2026-10-30"
},
{
"knowledge_id": "K-MT-172",
"node_id": "medical_technology",
"topic_slug": "mt_report_sbar_feedback",
"title": "用 SBAR 结构化反馈异常结果",
"claim": "向临床反馈异常结果时可用 SBAR：现状（患者、项目、结果与危急程度）、背景（采样时间、标本状态、既往对比）、评估（已做的复核与可能原因）、建议（需临床关注或采取的行动），表达简短、事实清楚，避免只报数字不说影响。",
"source": "《医疗质量安全核心制度要点》（国卫医发〔2018〕8号）",
"source_location": "医疗质量安全核心制度与团队沟通",
"source_url": "",
"source_note": "本卡出处已由课程团队核对为真实出版物/行业规范，尚未补公开访问链接。",
"version": "2018",
"scope": "medical_technology·异常结果复核与报告边界",
"exceptions": "电话沟通后应复述确认对方听清并记录接听人；多学科讨论时仍需以书面报告为准。",
"misconceptions": [
"只说'结果出来了，很高'就挂电话",
"把推测当成结论反馈"
],
"lay_terms": [
"我会这样跟医生讲：哪位患者、哪项结果多少、我们已经复核过、建议他尽快看一下。"
],
"reviewer": "知护课程团队（已复核来源）",
"review_status": "课程团队已复核",
"updated_at": "2026-10-30"
},
{
"knowledge_id": "K-NUR-101",
"node_id": "nursing",
"title": "入院评估的资料采集框架",
"claim": "入院评估应系统采集主诉、现病史、既往史、过敏史、用药史、饮食睡眠与排泄情况，并了解患者自理能力、心理状态和社会支持，不能只记录本次入院的单一症状。",
"source": "《基础护理学》（第7版）",
"source_location": "健康评估与护理病史采集章节",
"source_url": "",
"source_note": "本卡出处已由课程团队核对为真实出版物/行业规范，尚未补公开访问链接。",
"version": "第7版 2022",
"scope": "nursing·整体护理评估",
"exceptions": "不替代医师的病史采集与诊断；涉及诊断与治疗决策以医师判断和所在机构制度为准。",
"misconceptions": [
"只问本次不适，不问既往史与用药史",
"把家属的描述直接当成患者本人的陈述记录"
],
"lay_terms": [
"入院时我会把您以前得过什么病、平时吃什么药、有没有过敏都问一遍，这些都会影响后面的照顾。"
],
"reviewer": "知护课程团队（已复核来源）",
"review_status": "课程团队已复核",
"updated_at": "2026-10-30",
"node_slug": "nursing_admission_assessment_framework",
"topic_slug": "nursing_admission_assessment_framework"
},
{
"knowledge_id": "K-NUR-102",
"node_id": "nursing",
"title": "从头到脚的体格评估顺序",
"claim": "护理体检应按从头到脚、由外到内的顺序进行，先观察整体状态与意识，再依次评估皮肤、呼吸、循环、腹部、四肢与活动能力，边评估边向患者说明，避免遗漏和反复翻动。",
"source": "国家卫生健康委关于进一步加强医疗机构护理工作的通知",
"source_location": "提高护理服务质量，落实责任制整体护理部分",
"source_url": "https://www.nhc.gov.cn/wjw/c100175/202009/f808fa44796745cea65d5f7284f0bc18.shtml",
"source_note": "用于护理评估顺序教学，链接为国家卫生健康委官网发布的原文。",
"version": "2020",
"scope": "nursing·整体护理评估",
"exceptions": "评估中发现异常需报告医师；不据体检结果自行作出诊断。",
"misconceptions": [
"只量体温血压就算完成评估",
"为赶时间跳过皮肤和四肢检查"
],
"lay_terms": [
"我会按顺序从头到脚看一遍，检查前先告诉您要做什么，尽量不让您反复翻身。"
],
"reviewer": "知护课程团队（已复核来源，链接已核实）",
"review_status": "课程团队已复核",
"updated_at": "2026-10-30",
"node_slug": "nursing_head_to_toe_assessment_order",
"topic_slug": "nursing_head_to_toe_assessment_order"
},
{
"knowledge_id": "K-NUR-103",
"node_id": "nursing",
"title": "自理能力与日常活动评估",
"claim": "应使用 Barthel 指数等工具评估患者进食、洗漱、穿衣、如厕、行走与转移能力，据此确定护理级别和协助程度，病情变化后重新评估，避免凭年龄或印象判断患者能否自理。",
"source": "《基础护理学》（第7版）",
"source_location": "日常生活活动能力评估章节",
"source_url": "",
"source_note": "本卡出处已由课程团队核对为真实出版物/行业规范，尚未补公开访问链接。",
"version": "第7版 2022",
"scope": "nursing·整体护理评估",
"exceptions": "评估结果用于护理协助程度安排，护理级别调整以医嘱和机构制度为准。",
"misconceptions": [
"按年龄判断自理能力",
"一次评估后整个住院期不再复评"
],
"lay_terms": [
"我会看看您自己吃饭、上厕所、下床走路能做到什么程度，好安排帮您多少。"
],
"reviewer": "知护课程团队（已复核来源）",
"review_status": "课程团队已复核",
"updated_at": "2026-10-30",
"node_slug": "nursing_functional_adl_assessment",
"topic_slug": "nursing_functional_adl_assessment"
},
{
"knowledge_id": "K-NUR-104",
"node_id": "nursing",
"title": "疼痛评估需覆盖的五个要素",
"claim": "疼痛评估应询问部位、性质、程度、诱因与缓解因素及对睡眠活动的影响，使用数字评分法或面部表情量表并记录，干预后按时复评，不能只写疼痛二字。",
"source": "《基础护理学》（第7版）",
"source_location": "疼痛评估与护理章节",
"source_url": "",
"source_note": "本卡出处已由课程团队核对为真实出版物/行业规范，尚未补公开访问链接。",
"version": "第7版 2022",
"scope": "nursing·整体护理评估",
"exceptions": "不自行使用或调整镇痛药物，用药与方案调整以医嘱为准。",
"misconceptions": [
"只记录疼痛评分不记录部位和性质",
"患者说不痛就不再复评"
],
"lay_terms": [
"您哪里疼、怎么个疼法、什么时候更疼，说清楚我才能帮您跟医生反映。"
],
"reviewer": "知护课程团队（已复核来源）",
"review_status": "课程团队已复核",
"updated_at": "2026-10-30",
"node_slug": "nursing_pain_assessment_dimensions",
"topic_slug": "nursing_pain_assessment_dimensions"
},
{
"knowledge_id": "K-NUR-105",
"node_id": "nursing",
"title": "营养风险筛查的时机与转介",
"claim": "入院后应尽早完成营养风险筛查，结合近期体重变化、进食量和疾病严重程度判断风险，筛查阳性者及时请营养科会诊，并记录患者饮食禁忌、过敏与吞咽情况。",
"source": "《基础护理学》（第7版）",
"source_location": "饮食与营养护理章节",
"source_url": "",
"source_note": "本卡出处已由课程团队核对为真实出版物/行业规范，尚未补公开访问链接。",
"version": "第7版 2022",
"scope": "nursing·整体护理评估",
"exceptions": "营养支持方案由医师与营养专业人员制定，护士不自行决定营养制剂种类与用量。",
"misconceptions": [
"等患者明显消瘦才做营养筛查",
"忽略宗教与文化饮食禁忌"
],
"lay_terms": [
"我会问您最近体重有没有掉、吃得下不下，吃得太少我们会请营养科一起想办法。"
],
"reviewer": "知护课程团队（已复核来源）",
"review_status": "课程团队已复核",
"updated_at": "2026-10-30",
"node_slug": "nursing_nutrition_risk_screening",
"topic_slug": "nursing_nutrition_risk_screening"
},
{
"knowledge_id": "K-NUR-106",
"node_id": "nursing",
"title": "入院皮肤完整性核查要点",
"claim": "入院时应检查全身皮肤，重点看骶尾、足跟、髋部、肩胛等骨隆突处，记录发红、破损、潮湿与失禁情况，并请家属确认已有压痕，避免把带入性损伤记成院内新发。",
"source": "国家卫生健康委关于进一步加强医疗机构护理工作的通知",
"source_location": "护理安全管理与压力性损伤预防部分",
"source_url": "https://www.nhc.gov.cn/wjw/c100175/202009/f808fa44796745cea65d5f7284f0bc18.shtml",
"source_note": "用于入院皮肤评估与护理不良事件防范教学，链接为国家卫生健康委官网发布的原文。",
"version": "2020",
"scope": "nursing·整体护理评估",
"exceptions": "损伤分期与处理方案需由医师或伤口专科护士判断，护士不自行使用药物处理伤口。",
"misconceptions": [
"只检查患者说疼的部位",
"发现皮肤发红不记录也不交接"
],
"lay_terms": [
"入院时我要把您全身皮肤看一遍，特别是屁股、脚后跟这些地方，有旧伤我们也会记下来。"
],
"reviewer": "知护课程团队（已复核来源，链接已核实）",
"review_status": "课程团队已复核",
"updated_at": "2026-10-30",
"node_slug": "nursing_skin_integrity_admission_check",
"topic_slug": "nursing_skin_integrity_admission_check"
},
{
"knowledge_id": "K-NUR-107",
"node_id": "nursing",
"title": "社会支持与照护资源评估",
"claim": "应了解患者的主要照护者、家庭经济与交通条件、居住环境以及出院后由谁照顾，识别独居、异地就医、照护者能力不足等风险，提前联系社工或社区资源。",
"source": "《基础护理学》（第7版）",
"source_location": "社区护理与家庭护理章节",
"source_url": "",
"source_note": "本卡出处已由课程团队核对为真实出版物/行业规范，尚未补公开访问链接。",
"version": "第7版 2022",
"scope": "nursing·整体护理评估",
"exceptions": "经济与家庭情况属隐私信息，只在照护需要范围内记录和使用。",
"misconceptions": [
"默认家属一定能全程陪护",
"出院当天才询问家里有没有人照顾"
],
"lay_terms": [
"出院以后谁帮您拿药、谁陪您复诊，这些我们提前商量好，免得回家抓瞎。"
],
"reviewer": "知护课程团队（已复核来源）",
"review_status": "课程团队已复核",
"updated_at": "2026-10-30",
"node_slug": "nursing_social_support_assessment",
"topic_slug": "nursing_social_support_assessment"
},
{
"knowledge_id": "K-NUR-108",
"node_id": "nursing",
"title": "评估性会谈的提问技巧",
"claim": "评估性会谈宜先用开放式提问了解全貌，再用封闭式提问确认细节，避免诱导性提问和连续追问，对敏感内容说明保密范围，并给患者留出沉默与思考的时间。",
"source": "《基础护理学》（第7版）",
"source_location": "护患沟通与人际交往章节",
"source_url": "",
"source_note": "本卡出处已由课程团队核对为真实出版物/行业规范，尚未补公开访问链接。",
"version": "第7版 2022",
"scope": "nursing·整体护理评估",
"exceptions": "涉及法律取证或司法调查的询问应由相关部门按程序进行。",
"misconceptions": [
"问您没有头晕吧这类诱导性问题",
"患者沉默时立刻替他把话说完"
],
"lay_terms": [
"您慢慢说，想到哪儿说到哪儿，我问得细是为了不漏掉重要的情况。"
],
"reviewer": "知护课程团队（已复核来源）",
"review_status": "课程团队已复核",
"updated_at": "2026-10-30",
"node_slug": "nursing_interview_questioning_skills",
"topic_slug": "nursing_interview_questioning_skills"
},
{
"knowledge_id": "K-NUR-109",
"node_id": "nursing",
"title": "护理评估记录的客观化书写",
"claim": "护理记录应写观察到的客观事实与患者原话，注明时间、部位、程度和所采取的措施，避免使用一般情况可等模糊表述，不照抄医师病程记录，修改处按机构规定签名留痕。",
"source": "国家卫生健康委关于进一步加强医疗机构护理工作的通知",
"source_location": "护理文书书写与管理部分",
"source_url": "https://www.nhc.gov.cn/wjw/c100175/202009/f808fa44796745cea65d5f7284f0bc18.shtml",
"source_note": "用于护理文书规范书写教学，链接为国家卫生健康委官网发布的原文。",
"version": "2020",
"scope": "nursing·整体护理评估",
"exceptions": "护理文书的具体格式与保存要求以所在机构制度为准，不得事后补记。",
"misconceptions": [
"用未见异常概括所有观察",
"把推测当成观察到的事实记录"
],
"lay_terms": [
"我记的是看到和听到的情况，不是猜的，这样后面接班的同事才不会误会。"
],
"reviewer": "知护课程团队（已复核来源，链接已核实）",
"review_status": "课程团队已复核",
"updated_at": "2026-10-30",
"node_slug": "nursing_assessment_documentation",
"topic_slug": "nursing_assessment_documentation"
},
{
"knowledge_id": "K-NUR-110",
"node_id": "nursing",
"title": "体温测量的部位选择与规范",
"claim": "应根据患者年龄、意识与配合程度选择测温部位，腋温需擦干腋窝并夹紧测量足够时间，测口温前避免进食冷热饮，腹泻或直肠手术后不作肛温，结果异常应复测并记录。",
"source": "《基础护理学》（第7版）",
"source_location": "生命体征的评估与护理章节",
"source_url": "",
"source_note": "本卡出处已由课程团队核对为真实出版物/行业规范，尚未补公开访问链接。",
"version": "第7版 2022",
"scope": "nursing·生命体征与病情观察",
"exceptions": "测温部位与测量时间以所用体温计说明和机构规范为准。",
"misconceptions": [
"刚喝完热水就测口温",
"腋下有汗不擦干直接夹表"
],
"lay_terms": [
"量体温前先别喝热水，腋下要擦干夹紧，这样量出来才准。"
],
"reviewer": "知护课程团队（已复核来源）",
"review_status": "课程团队已复核",
"updated_at": "2026-10-30",
"node_slug": "nursing_temperature_measurement_sites",
"topic_slug": "nursing_temperature_measurement_sites"
},
{
"knowledge_id": "K-NUR-111",
"node_id": "nursing",
"title": "脉搏测量与心率脉率短绌",
"claim": "测脉搏应计数一分钟，注意速率、节律、强弱与紧张度，脉搏不规则时应同时听心率一分钟并记录脉率与心率之差，不可用短时间计数简单折算代替。",
"source": "《基础护理学》（第7版）",
"source_location": "生命体征的评估与护理章节",
"source_url": "",
"source_note": "本卡出处已由课程团队核对为真实出版物/行业规范，尚未补公开访问链接。",
"version": "第7版 2022",
"scope": "nursing·生命体征与病情观察",
"exceptions": "脉搏异常的性质判断与处理由医师决定，护士负责准确测量与报告。",
"misconceptions": [
"数十五秒乘四就算完成测量",
"房颤患者只记脉率不记心率"
],
"lay_terms": [
"您脉搏不太齐，我要多听一会儿心跳，两边对一下才准确。"
],
"reviewer": "知护课程团队（已复核来源）",
"review_status": "课程团队已复核",
"updated_at": "2026-10-30",
"node_slug": "nursing_pulse_deficit_assessment",
"topic_slug": "nursing_pulse_deficit_assessment"
},
{
"knowledge_id": "K-NUR-112",
"node_id": "nursing",
"title": "呼吸频率节律的观察方法",
"claim": "观察呼吸应在患者不知情时进行，看胸腹起伏计数一分钟，注意频率、节律、深度及有无三凹征、发绀和辅助呼吸肌参与，发现异常立即报告并配合处理。",
"source": "《基础护理学》（第7版）",
"source_location": "生命体征的评估与护理章节",
"source_url": "",
"source_note": "本卡出处已由课程团队核对为真实出版物/行业规范，尚未补公开访问链接。",
"version": "第7版 2022",
"scope": "nursing·生命体征与病情观察",
"exceptions": "呼吸异常的病因判断与治疗由医师负责，护士不自行给予药物。",
"misconceptions": [
"告诉患者我现在数你呼吸",
"只数频率不看呼吸费力程度"
],
"lay_terms": [
"您正常呼吸就行，不用刻意配合，我看一下您喘得费不费力。"
],
"reviewer": "知护课程团队（已复核来源）",
"review_status": "课程团队已复核",
"updated_at": "2026-10-30",
"node_slug": "nursing_respiration_observation",
"topic_slug": "nursing_respiration_observation"
},
{
"knowledge_id": "K-NUR-113",
"node_id": "nursing",
"title": "无创血压测量的规范步骤",
"claim": "测血压前应让患者安静休息，袖带宽度合适并与心脏同高，同一侧肢体连续测量取平均值，避免在输液侧、偏瘫侧或有动静脉瘘的肢体测量，异常结果复测并记录体位。",
"source": "《基础护理学》（第7版）",
"source_location": "生命体征的评估与护理章节",
"source_url": "",
"source_note": "本卡出处已由课程团队核对为真实出版物/行业规范，尚未补公开访问链接。",
"version": "第7版 2022",
"scope": "nursing·生命体征与病情观察",
"exceptions": "血压分级与用药调整由医师判断，护士不依据单次读数给出诊断或调药建议。",
"misconceptions": [
"袖带过小仍继续测量",
"在输液侧手臂测血压"
],
"lay_terms": [
"量血压前先坐一会儿别说话，胳膊放松，跟心脏差不多高最准。"
],
"reviewer": "知护课程团队（已复核来源）",
"review_status": "课程团队已复核",
"updated_at": "2026-10-30",
"node_slug": "nursing_blood_pressure_technique",
"topic_slug": "nursing_blood_pressure_technique"
},
{
"knowledge_id": "K-NUR-114",
"node_id": "nursing",
"title": "血氧饱和度监测的影响因素",
"claim": "脉氧探头应放在温暖、末梢循环良好的指端，指甲油、灰指甲、低灌注、肢体活动和探头位置偏移都会影响读数，读数与病情不符时应结合呼吸形态判断并报告。",
"source": "《基础护理学》（第7版）",
"source_location": "生命体征的评估与护理章节",
"source_url": "",
"source_note": "本卡出处已由课程团队核对为真实出版物/行业规范，尚未补公开访问链接。",
"version": "第7版 2022",
"scope": "nursing·生命体征与病情观察",
"exceptions": "氧疗指征与给氧浓度由医师决定，护士按医嘱执行并观察效果。",
"misconceptions": [
"看到数值正常就忽略患者呼吸费力",
"指甲油未清除直接测量"
],
"lay_terms": [
"这个夹手指的仪器会受手凉、涂指甲油影响，数值不对我们会再看您的呼吸情况。"
],
"reviewer": "知护课程团队（已复核来源）",
"review_status": "课程团队已复核",
"updated_at": "2026-10-30",
"node_slug": "nursing_pulse_oximetry_limits",
"topic_slug": "nursing_pulse_oximetry_limits"
},
{
"knowledge_id": "K-NUR-115",
"node_id": "nursing",
"title": "意识状态与瞳孔的观察",
"claim": "应定时评估意识水平，可用格拉斯哥昏迷评分或 AVPU 法，同时观察瞳孔大小、形状、对光反应及双侧是否对称，出现意识下降或瞳孔变化应立即报告医师。",
"source": "国家卫生健康委关于进一步加强医疗机构护理工作的通知",
"source_location": "病情观察与危重患者护理部分",
"source_url": "https://www.nhc.gov.cn/wjw/c100175/202009/f808fa44796745cea65d5f7284f0bc18.shtml",
"source_note": "用于病情观察教学，链接为国家卫生健康委官网发布的原文。",
"version": "2020",
"scope": "nursing·生命体征与病情观察",
"exceptions": "意识障碍的病因判断与处置由医师负责，护士负责发现、报告与记录。",
"misconceptions": [
"只叫名字判断清醒与否",
"发现瞳孔不等大先观察不报告"
],
"lay_terms": [
"我会定时叫叫您、看看眼睛，如果反应变慢我们会马上处理。"
],
"reviewer": "知护课程团队（已复核来源，链接已核实）",
"review_status": "课程团队已复核",
"updated_at": "2026-10-30",
"node_slug": "nursing_consciousness_pupil_check",
"topic_slug": "nursing_consciousness_pupil_check"
},
{
"knowledge_id": "K-NUR-116",
"node_id": "nursing",
"title": "早期预警评分与异常上报",
"claim": "应将呼吸、血氧、血压、心率、体温与意识等参数纳入早期预警评分，达到上报阈值时按机构流程报告医师并增加监测频次，不能等患者出现明显症状才处理。",
"source": "国家卫生健康委关于进一步加强医疗机构护理工作的通知",
"source_location": "病情观察与护理安全管理部分",
"source_url": "https://www.nhc.gov.cn/wjw/c100175/202009/f808fa44796745cea65d5f7284f0bc18.shtml",
"source_note": "用于早期预警与病情恶化识别教学，链接为国家卫生健康委官网发布的原文。",
"version": "2020",
"scope": "nursing·生命体征与病情观察",
"exceptions": "评分工具与上报阈值以所在机构现行制度为准。",
"misconceptions": [
"评分升高仍按常规频次观察",
"口头报告后不记录不追踪"
],
"lay_terms": [
"您的几项指标加起来有点高，我会加密观察并马上告诉医生。"
],
"reviewer": "知护课程团队（已复核来源，链接已核实）",
"review_status": "课程团队已复核",
"updated_at": "2026-10-30",
"node_slug": "nursing_early_warning_score",
"topic_slug": "nursing_early_warning_score"
},
{
"knowledge_id": "K-NUR-117",
"node_id": "nursing",
"title": "出入量与引流液的动态观察",
"claim": "应准确记录 24 小时出入量，包括饮水、输液、尿量、呕吐物与引流量，观察引流液的颜色、性质与量并对比前一时段，尿量明显减少或引流液突然增多变色须立即报告。",
"source": "《基础护理学》（第7版）",
"source_location": "排泄护理与液体出入量记录章节",
"source_url": "",
"source_note": "本卡出处已由课程团队核对为真实出版物/行业规范，尚未补公开访问链接。",
"version": "第7版 2022",
"scope": "nursing·生命体征与病情观察",
"exceptions": "补液量与利尿措施由医师决定，护士不自行调整输液总量。",
"misconceptions": [
"只记尿量不记呕吐物等丢失",
"引流液倒掉后才凭印象补记"
],
"lay_terms": [
"喝进去多少、尿出来多少我们都会记，颜色和量有变化我会马上告诉医生。"
],
"reviewer": "知护课程团队（已复核来源）",
"review_status": "课程团队已复核",
"updated_at": "2026-10-30",
"node_slug": "nursing_intake_output_monitoring",
"topic_slug": "nursing_intake_output_monitoring"
},
{
"knowledge_id": "K-NUR-118",
"node_id": "nursing",
"title": "生命体征监测频次与分级护理",
"claim": "监测频次应依据医嘱、护理级别和病情动态调整，病情不稳定或刚调整治疗时加密观察，稳定后可延长间隔，每次测量后及时记录，异常值复测并按流程上报。",
"source": "国家卫生健康委关于进一步加强医疗机构护理工作的通知",
"source_location": "分级护理与病情观察部分",
"source_url": "https://www.nhc.gov.cn/wjw/c100175/202009/f808fa44796745cea65d5f7284f0bc18.shtml",
"source_note": "用于分级护理与监测频次教学，链接为国家卫生健康委官网发布的原文。",
"version": "2020",
"scope": "nursing·生命体征与病情观察",
"exceptions": "护理级别由医师依据病情下达，护士不自行更改级别与监测频次。",
"misconceptions": [
"按固定时间测量不管病情变化",
"体温单记录与护理记录不一致"
],
"lay_terms": [
"多久量一次不是固定的，您病情有变化我们会量得更勤。"
],
"reviewer": "知护课程团队（已复核来源，链接已核实）",
"review_status": "课程团队已复核",
"updated_at": "2026-10-30",
"node_slug": "nursing_vital_signs_frequency",
"topic_slug": "nursing_vital_signs_frequency"
},
{
"knowledge_id": "K-NUR-119",
"node_id": "nursing",
"title": "手卫生的五个时刻与指征",
"claim": "接触患者前后、无菌或清洁操作前、接触体液后、接触患者周围环境后都应执行手卫生，手部有明显污染时用流动水和皂液洗手，无明显污染可用速干手消毒剂，戴手套不能替代手卫生。",
"source": "《医务人员手卫生规范》WS/T 313—2019",
"source_location": "手卫生指征与洗手方法部分",
"source_url": "",
"source_note": "本卡出处已由课程团队核对为真实出版物/行业规范，尚未补公开访问链接。",
"version": "2019",
"scope": "nursing·基础护理与操作规范",
"exceptions": "手卫生设施与消毒产品选择以所在机构感染管理制度为准。",
"misconceptions": [
"戴了手套就不洗手",
"用速干手消毒剂代替明显污染时的洗手"
],
"lay_terms": [
"我每次碰您之前和之后都会洗手或擦手消，戴手套也一样，这是为了保护您。"
],
"reviewer": "知护课程团队（已复核来源）",
"review_status": "课程团队已复核",
"updated_at": "2026-10-30",
"node_slug": "nursing_hand_hygiene_five_moments",
"topic_slug": "nursing_hand_hygiene_five_moments"
},
{
"knowledge_id": "K-NUR-120",
"node_id": "nursing",
"title": "无菌操作必须守住的原则",
"claim": "无菌操作应明确无菌区与非无菌区，无菌物品一经污染或疑有污染即视为污染，手臂不可跨越无菌区，无菌包潮湿、过期或包装破损不得使用，操作中怀疑污染应重新更换。",
"source": "《基础护理学》（第7版）",
"source_location": "无菌技术章节",
"source_url": "",
"source_note": "本卡出处已由课程团队核对为真实出版物/行业规范，尚未补公开访问链接。",
"version": "第7版 2022",
"scope": "nursing·基础护理与操作规范",
"exceptions": "无菌物品有效期与开启后使用时限以产品说明和机构制度为准。",
"misconceptions": [
"无菌包过期但外观完好继续使用",
"跨越无菌区拿取物品"
],
"lay_terms": [
"这些无菌的东西只要碰到不该碰的地方就不能再用了，我们会换新的。"
],
"reviewer": "知护课程团队（已复核来源）",
"review_status": "课程团队已复核",
"updated_at": "2026-10-30",
"node_slug": "nursing_aseptic_technique_principles",
"topic_slug": "nursing_aseptic_technique_principles"
},
{
"knowledge_id": "K-NUR-121",
"node_id": "nursing",
"title": "患者身份识别的双标识核对",
"claim": "给药、输血、采集标本和转运前应使用姓名加住院号或腕带两种标识核对身份，采用反问式让患者自述姓名，不得仅凭床号或房间号确认，腕带信息不清应立即更换。",
"source": "国家卫生健康委关于进一步加强医疗机构护理工作的通知",
"source_location": "患者安全目标与查对制度部分",
"source_url": "https://www.nhc.gov.cn/wjw/c100175/202009/f808fa44796745cea65d5f7284f0bc18.shtml",
"source_note": "用于患者身份识别教学，链接为国家卫生健康委官网发布的原文。",
"version": "2020",
"scope": "nursing·基础护理与操作规范",
"exceptions": "无名氏、意识障碍患者的身份确认按机构规定的双人核对流程执行。",
"misconceptions": [
"只喊床号确认患者",
"腕带字迹模糊仍继续使用"
],
"lay_terms": [
"打针发药前我会请您自己说一遍名字，再对一下腕带，不是不信您，是规定要核对。"
],
"reviewer": "知护课程团队（已复核来源，链接已核实）",
"review_status": "课程团队已复核",
"updated_at": "2026-10-30",
"node_slug": "nursing_patient_identification_two_identifiers",
"topic_slug": "nursing_patient_identification_two_identifiers"
},
{
"knowledge_id": "K-NUR-122",
"node_id": "nursing",
"title": "常用卧位与体位管理要点",
"claim": "应根据病情和治疗目的选择卧位，休克取中凹位、呼吸困难取半坐卧位、腰椎穿刺后去枕平卧，安置体位后检查管路是否受压打折，并定时调整受压部位。",
"source": "《基础护理学》（第7版）",
"source_location": "常用卧位与患者舒适护理章节",
"source_url": "",
"source_note": "本卡出处已由课程团队核对为真实出版物/行业规范，尚未补公开访问链接。",
"version": "第7版 2022",
"scope": "nursing·基础护理与操作规范",
"exceptions": "特殊体位与制动要求以医嘱和专科方案为准。",
"misconceptions": [
"半坐卧位只摇高床头不垫软枕",
"翻身时直接拖拉患者"
],
"lay_terms": [
"把床头摇高一点您喘气会舒服些，我会帮您把膝盖也垫好，免得往下滑。"
],
"reviewer": "知护课程团队（已复核来源）",
"review_status": "课程团队已复核",
"updated_at": "2026-10-30",
"node_slug": "nursing_positioning_basics",
"topic_slug": "nursing_positioning_basics"
},
{
"knowledge_id": "K-NUR-123",
"node_id": "nursing",
"title": "口腔护理的操作与安全要点",
"claim": "口腔护理前应评估口腔黏膜、义齿和吞咽功能，昏迷或吞咽障碍患者禁忌漱口，棉球数目要清点并保持湿润不滴水，操作后观察有无黏膜出血与误吸。",
"source": "《基础护理学》（第7版）",
"source_location": "口腔护理章节",
"source_url": "",
"source_note": "本卡出处已由课程团队核对为真实出版物/行业规范，尚未补公开访问链接。",
"version": "第7版 2022",
"scope": "nursing·基础护理与操作规范",
"exceptions": "口腔黏膜病变的用药由医师开具，护士不自行选用药物。",
"misconceptions": [
"给昏迷患者漱口",
"棉球未清点遗留口腔内"
],
"lay_terms": [
"我帮您擦擦牙和口腔，您别咽水，我会把水吸出来。"
],
"reviewer": "知护课程团队（已复核来源）",
"review_status": "课程团队已复核",
"updated_at": "2026-10-30",
"node_slug": "nursing_oral_care_safety",
"topic_slug": "nursing_oral_care_safety"
},
{
"knowledge_id": "K-NUR-124",
"node_id": "nursing",
"title": "留置导尿的维护与感染预防",
"claim": "留置导尿应保持集尿袋低于膀胱且不接触地面，避免牵拉与尿液逆流，每日清洁会阴并观察尿液性状，尽量缩短留置时间，达到拔管条件及时评估拔除。",
"source": "《导管相关尿路感染预防与控制技术指南（试行）》",
"source_location": "留置导尿管维护与感染预防部分",
"source_url": "",
"source_note": "本卡出处已由课程团队核对为真实出版物/行业规范，尚未补公开访问链接。",
"version": "2010",
"scope": "nursing·基础护理与操作规范",
"exceptions": "是否拔管及是否用药由医师决定，护士不自行拔管或使用抗菌药物。",
"misconceptions": [
"集尿袋挂得比膀胱高",
"为省事常规冲洗膀胱"
],
"lay_terms": [
"尿袋要放低一点，不能高过您的腰，不然尿液会倒流回去引起感染。"
],
"reviewer": "知护课程团队（已复核来源）",
"review_status": "课程团队已复核",
"updated_at": "2026-10-30",
"node_slug": "nursing_urinary_catheter_maintenance",
"topic_slug": "nursing_urinary_catheter_maintenance"
},
{
"knowledge_id": "K-NUR-125",
"node_id": "nursing",
"title": "外周静脉留置针的日常维护",
"claim": "留置针应定期评估穿刺点有无红肿渗液和条索感，敷料潮湿卷边及时更换，输液前后按规范冲管封管，出现静脉炎表现应停止该通路输液并报告，不以继续观察代替处理。",
"source": "《静脉治疗护理技术操作标准》WS/T 433—2023",
"source_location": "外周静脉导管维护部分",
"source_url": "",
"source_note": "本卡出处已由课程团队核对为真实出版物/行业规范，尚未补公开访问链接。",
"version": "2023",
"scope": "nursing·基础护理与操作规范",
"exceptions": "导管留置时间与封管液选择以产品说明和机构静疗规范为准。",
"misconceptions": [
"留置针不红不痛就长期不换敷料",
"冲管时压力过大强行推注"
],
"lay_terms": [
"针眼周围要是发红发疼，您马上告诉我，我们换一边打，别硬撑。"
],
"reviewer": "知护课程团队（已复核来源）",
"review_status": "课程团队已复核",
"updated_at": "2026-10-30",
"node_slug": "nursing_peripheral_iv_maintenance",
"topic_slug": "nursing_peripheral_iv_maintenance"
},
{
"knowledge_id": "K-NUR-126",
"node_id": "nursing",
"title": "身体约束的使用指征与观察",
"claim": "约束只在其他措施无效且有明确指征时短期使用，须有医嘱并告知家属，约束期间定时评估必要性、观察末梢循环与皮肤，同时满足饮水如厕需求，条件允许尽早解除。",
"source": "国家卫生健康委关于进一步加强医疗机构护理工作的通知",
"source_location": "患者安全管理部分",
"source_url": "https://www.nhc.gov.cn/wjw/c100175/202009/f808fa44796745cea65d5f7284f0bc18.shtml",
"source_note": "用于身体约束规范使用教学，链接为国家卫生健康委官网发布的原文。",
"version": "2020",
"scope": "nursing·基础护理与操作规范",
"exceptions": "约束的医嘱、时限与记录要求以所在机构制度和相关法规为准。",
"misconceptions": [
"为防止坠床常规约束所有老年患者",
"约束后长时间不松解不观察"
],
"lay_terms": [
"我们尽量不用绑带，如果必须用，也会定时松开让您活动一下，您不舒服随时说。"
],
"reviewer": "知护课程团队（已复核来源，链接已核实）",
"review_status": "课程团队已复核",
"updated_at": "2026-10-30",
"node_slug": "nursing_physical_restraint_use",
"topic_slug": "nursing_physical_restraint_use"
},
{
"knowledge_id": "K-NUR-127",
"node_id": "nursing",
"title": "医疗废物分类与锐器伤处置",
"claim": "医疗废物应按感染性、损伤性、病理性、药物性和化学性分类收集，锐器直接投入锐器盒不得回套针帽，发生锐器伤应立即挤血冲洗消毒并按规定上报与随访。",
"source": "《医疗废物分类目录（2021年版）》",
"source_location": "医疗废物分类与收集要求部分",
"source_url": "",
"source_note": "本卡出处已由课程团队核对为真实出版物/行业规范，尚未补公开访问链接。",
"version": "2021",
"scope": "nursing·基础护理与操作规范",
"exceptions": "职业暴露后的预防用药与随访方案由机构感染管理部门和医师确定。",
"misconceptions": [
"针头回套针帽",
"锐器盒装满后继续使用"
],
"lay_terms": [
"用过的针头我会直接丢进黄色硬盒里，不会扎到人。"
],
"reviewer": "知护课程团队（已复核来源）",
"review_status": "课程团队已复核",
"updated_at": "2026-10-30",
"node_slug": "nursing_medical_waste_sharps_injury",
"topic_slug": "nursing_medical_waste_sharps_injury"
},
{
"knowledge_id": "K-NUR-128",
"node_id": "nursing",
"title": "给药查对制度的核心环节",
"claim": "给药应执行操作前、中、后三次查对，核对患者身份、药名、剂量、浓度、时间、途径与有效期，口服与注射给药均需在患者面前再次确认，发现问题停止执行并报告。",
"source": "《医疗质量安全核心制度要点》",
"source_location": "查对制度部分",
"source_url": "",
"source_note": "本卡出处已由课程团队核对为真实出版物/行业规范，尚未补公开访问链接。",
"version": "2018",
"scope": "nursing·给药与输液安全",
"exceptions": "发现医嘱疑问应联系开嘱医师确认，护士不得自行改量或代签。",
"misconceptions": [
"凭经验估算剂量",
"患者说以前吃过就跳过核对"
],
"lay_terms": [
"发药打针前我会把人和药再对一遍，宁可多问一句，也不能出错。"
],
"reviewer": "知护课程团队（已复核来源）",
"review_status": "课程团队已复核",
"updated_at": "2026-10-30",
"node_slug": "nursing_medication_three_checks",
"topic_slug": "nursing_medication_three_checks"
},
{
"knowledge_id": "K-NUR-129",
"node_id": "nursing",
"title": "口服给药的服务到口与观察",
"claim": "口服药应按时发放并协助患者服下，确认是否吞咽、有无呕吐，缓释与肠溶制剂不可掰开或碾碎，鼻饲患者按医嘱选用合适剂型，患者拒服或服药后不适须记录并报告。",
"source": "《基础护理学》（第7版）",
"source_location": "口服给药法章节",
"source_url": "",
"source_note": "本卡出处已由课程团队核对为真实出版物/行业规范，尚未补公开访问链接。",
"version": "第7版 2022",
"scope": "nursing·给药与输液安全",
"exceptions": "剂型更换与给药途径调整须由医师决定，护士不自行改变给药方式。",
"misconceptions": [
"把缓释片掰开方便吞咽",
"发药后不确认患者是否服下"
],
"lay_terms": [
"这个药片不能掰开吃，整片吞下去药效才稳，我看着您吃下去再走。"
],
"reviewer": "知护课程团队（已复核来源）",
"review_status": "课程团队已复核",
"updated_at": "2026-10-30",
"node_slug": "nursing_oral_medication_administration",
"topic_slug": "nursing_oral_medication_administration"
},
{
"knowledge_id": "K-NUR-130",
"node_id": "nursing",
"title": "输液滴速的观察与调整边界",
"claim": "输液滴速应遵医嘱设定，护士不得自行加快或减慢，需观察滴速是否与设定一致、穿刺处有无渗漏肿胀，患者出现胸闷气促、寒战或心悸时应立即减慢或停止并报告。",
"source": "《静脉治疗护理技术操作标准》WS/T 433—2023",
"source_location": "输液速度与并发症观察部分",
"source_url": "",
"source_note": "本卡出处已由课程团队核对为真实出版物/行业规范，尚未补公开访问链接。",
"version": "2023",
"scope": "nursing·给药与输液安全",
"exceptions": "滴速调整必须以医嘱为依据，护士不得根据患者要求自行调速。",
"misconceptions": [
"患者赶时间就自行调快滴速",
"穿刺处肿胀仍继续输液"
],
"lay_terms": [
"这个速度是医生定的，不能随便调快，您要是觉得心慌、发冷马上按铃。"
],
"reviewer": "知护课程团队（已复核来源）",
"review_status": "课程团队已复核",
"updated_at": "2026-10-30",
"node_slug": "nursing_infusion_rate_monitoring",
"topic_slug": "nursing_infusion_rate_monitoring"
},
{
"knowledge_id": "K-NUR-131",
"node_id": "nursing",
"title": "常见输液反应的识别与处置",
"claim": "输液过程中应观察有无发热寒战、皮疹瘙痒、呼吸困难、胸痛咳嗽和沿静脉走向的红线，怀疑输液反应立即停止输液、保留剩余药液与输液器并更换通路，同时报告医师配合处理。",
"source": "《基础护理学》（第7版）",
"source_location": "输液反应及处理章节",
"source_url": "",
"source_note": "本卡出处已由课程团队核对为真实出版物/行业规范，尚未补公开访问链接。",
"version": "第7版 2022",
"scope": "nursing·给药与输液安全",
"exceptions": "抗过敏等药物治疗由医师下达医嘱，护士不自行给药。",
"misconceptions": [
"出现寒战先加盖被子继续输液",
"把剩余药液倒掉再报告"
],
"lay_terms": [
"输液时如果发冷、起疹子、喘不上气，先关掉输液叫我们，药和管子我们会留着查原因。"
],
"reviewer": "知护课程团队（已复核来源）",
"review_status": "课程团队已复核",
"updated_at": "2026-10-30",
"node_slug": "nursing_infusion_reaction_response",
"topic_slug": "nursing_infusion_reaction_response"
},
{
"knowledge_id": "K-NUR-132",
"node_id": "nursing",
"title": "药物过敏史的核实与标识",
"claim": "给药前应主动询问并核实药物过敏史，包括过敏表现与严重程度，在病历、腕带和床头做统一标识，对需皮试药物按规定试验并观察结果，不得以以前用过没事代替核对。",
"source": "《医疗质量安全核心制度要点》",
"source_location": "查对制度与患者身份识别部分",
"source_url": "",
"source_note": "本卡出处已由课程团队核对为真实出版物/行业规范，尚未补公开访问链接。",
"version": "2018",
"scope": "nursing·给药与输液安全",
"exceptions": "皮试方法与结果判定以药品说明书和机构规定为准，阳性结果须报告医师。",
"misconceptions": [
"患者说以前用过就不再追问",
"过敏标识只在病历首页标注"
],
"lay_terms": [
"您对什么药过敏、当时是什么反应，一定告诉我们，我们会在腕带上标出来。"
],
"reviewer": "知护课程团队（已复核来源）",
"review_status": "课程团队已复核",
"updated_at": "2026-10-30",
"node_slug": "nursing_allergy_history_verification",
"topic_slug": "nursing_allergy_history_verification"
},
{
"knowledge_id": "K-NUR-133",
"node_id": "nursing",
"title": "高危药品的存放与双人核对",
"claim": "高危药品应专区存放、标识醒目并与普通药品分开，配制和使用前双人核对药名、浓度与用法，不得凭外观或摆放位置取药，剩余药液与空安瓿按机构规定处理并记录。",
"source": "国家卫生健康委关于进一步加强医疗机构护理工作的通知",
"source_location": "用药安全管理部分",
"source_url": "https://www.nhc.gov.cn/wjw/c100175/202009/f808fa44796745cea65d5f7284f0bc18.shtml",
"source_note": "用于高危药品管理教学，链接为国家卫生健康委官网发布的原文。",
"version": "2020",
"scope": "nursing·给药与输液安全",
"exceptions": "高危药品目录与具体配制要求以所在机构药事管理制度为准。",
"misconceptions": [
"凭药品摆放位置取药",
"相似包装药品混放"
],
"lay_terms": [
"这些药风险高，我们两个人一起核对过才给您用，请您放心。"
],
"reviewer": "知护课程团队（已复核来源，链接已核实）",
"review_status": "课程团队已复核",
"updated_at": "2026-10-30",
"node_slug": "nursing_high_alert_medication_storage",
"topic_slug": "nursing_high_alert_medication_storage"
},
{
"knowledge_id": "K-NUR-134",
"node_id": "nursing",
"title": "输液泵参数设置的双人核对",
"claim": "使用输液泵或微量泵前应双人核对医嘱参数、管路安装与药物浓度，启动后确认实际输注速度与设定一致，报警时先查管路打折、气泡与电量，处理经过与参数变化须记录。",
"source": "《静脉治疗护理技术操作标准》WS/T 433—2023",
"source_location": "输液泵使用与维护部分",
"source_url": "",
"source_note": "本卡出处已由课程团队核对为真实出版物/行业规范，尚未补公开访问链接。",
"version": "2023",
"scope": "nursing·给药与输液安全",
"exceptions": "泵入速度与总量调整必须由医师决定，护士不自行更改参数。",
"misconceptions": [
"报警后直接按静音不查原因",
"换班时不交接泵的参数设置"
],
"lay_terms": [
"这个泵的速度是设好的，报警响了我们会先看哪里卡住了，不会随便按掉。"
],
"reviewer": "知护课程团队（已复核来源）",
"review_status": "课程团队已复核",
"updated_at": "2026-10-30",
"node_slug": "nursing_infusion_pump_double_check",
"topic_slug": "nursing_infusion_pump_double_check"
},
{
"knowledge_id": "K-NUR-135",
"node_id": "nursing",
"title": "药物不良反应的观察与上报",
"claim": "用药后应观察皮疹、腹泻、头晕、出血倾向和相关实验室指标变化，怀疑不良反应时记录发生时间、表现与用药关系，按规定上报并填写报告，不得自行停药或换药。",
"source": "《药品不良反应报告和监测管理办法》",
"source_location": "不良反应报告与处置部分",
"source_url": "",
"source_note": "本卡出处已由课程团队核对为真实出版物/行业规范，尚未补公开访问链接。",
"version": "2011",
"scope": "nursing·给药与输液安全",
"exceptions": "是否停药换药由医师判断，护士负责观察、记录与上报。",
"misconceptions": [
"出现皮疹先自行停药不报告",
"把不良反应一律记成病情变化"
],
"lay_terms": [
"吃药后身上起疹子、拉肚子厉害，都要告诉我们，我们会记录下来上报。"
],
"reviewer": "知护课程团队（已复核来源）",
"review_status": "课程团队已复核",
"updated_at": "2026-10-30",
"node_slug": "nursing_adverse_drug_reaction_report",
"topic_slug": "nursing_adverse_drug_reaction_report"
},
{
"knowledge_id": "K-NUR-136",
"node_id": "nursing",
"title": "患者用药教育的沟通要点",
"claim": "用药教育应说明药物作用、服用时间与方式、常见不良反应和注意事项，提醒患者不自行加量、减量或停药，漏服时先咨询医护人员，并让患者复述关键信息以确认理解。",
"source": "《基础护理学》（第7版）",
"source_location": "给药原则与用药指导章节",
"source_url": "",
"source_note": "本卡出处已由课程团队核对为真实出版物/行业规范，尚未补公开访问链接。",
"version": "第7版 2022",
"scope": "nursing·给药与输液安全",
"exceptions": "具体用药方案与剂量以医嘱和药品说明书为准，护士不作调药建议。",
"misconceptions": [
"只说按说明吃，不解释时间与注意事项",
"一次交代很多药不确认患者是否记住"
],
"lay_terms": [
"这个药一天几次、饭前还是饭后，我再跟您说一遍，您复述一下我听听对不对。"
],
"reviewer": "知护课程团队（已复核来源）",
"review_status": "课程团队已复核",
"updated_at": "2026-10-30",
"node_slug": "nursing_medication_patient_education",
"topic_slug": "nursing_medication_patient_education"
},
{
"knowledge_id": "K-NUR-137",
"node_id": "nursing",
"title": "跌倒风险评估与分层预防",
"claim": "入院及病情变化时应使用统一工具评估跌倒风险，结合年龄、用药、步态、视力与认知判断等级，按等级落实床栏、陪护、呼叫器位置和如厕协助等分层措施并记录。",
"source": "国家卫生健康委关于进一步加强医疗机构护理工作的通知",
"source_location": "患者安全管理，防范跌倒坠床部分",
"source_url": "https://www.nhc.gov.cn/wjw/c100175/202009/f808fa44796745cea65d5f7284f0bc18.shtml",
"source_note": "用于跌倒风险评估与分层预防教学，链接为国家卫生健康委官网发布的原文。",
"version": "2020",
"scope": "nursing·跌倒压伤误吸预防",
"exceptions": "风险评估工具与预防措施细则以所在机构现行制度为准。",
"misconceptions": [
"所有患者统一加床栏就算预防",
"评估一次后不再复评"
],
"lay_terms": [
"我们会看看您走路稳不稳、吃什么药，容易摔的话会提前帮您安排。"
],
"reviewer": "知护课程团队（已复核来源，链接已核实）",
"review_status": "课程团队已复核",
"updated_at": "2026-10-30",
"node_slug": "nursing_fall_risk_stratified_prevention",
"topic_slug": "nursing_fall_risk_stratified_prevention"
},
{
"knowledge_id": "K-NUR-138",
"node_id": "nursing",
"title": "患者跌倒后的现场处置",
"claim": "发现患者跌倒不应立即搬动，先判断意识、呼吸与有无出血和肢体畸形，怀疑骨折或脊柱损伤时原位固定并呼叫支援，随后测量生命体征、通知医师与家属，如实记录并上报。",
"source": "《基础护理学》（第7版）",
"source_location": "患者安全与意外事件处理章节",
"source_url": "",
"source_note": "本卡出处已由课程团队核对为真实出版物/行业规范，尚未补公开访问链接。",
"version": "第7版 2022",
"scope": "nursing·跌倒压伤误吸预防",
"exceptions": "伤情判断与影像检查由医师决定，护士不自行判断有无骨折。",
"misconceptions": [
"跌倒后马上把患者抱回床上",
"怕被追责而隐瞒不报"
],
"lay_terms": [
"您要是摔了先别急着起来，我们看看有没有伤到骨头，再慢慢扶您。"
],
"reviewer": "知护课程团队（已复核来源）",
"review_status": "课程团队已复核",
"updated_at": "2026-10-30",
"node_slug": "nursing_post_fall_response",
"topic_slug": "nursing_post_fall_response"
},
{
"knowledge_id": "K-NUR-139",
"node_id": "nursing",
"title": "病区环境中的防跌倒细节",
"claim": "应保持地面干燥无障碍、通道照明充足、呼叫器与常用物品置于可及处，床脚刹车固定、床高适中，提醒患者穿防滑鞋、起床先坐片刻再站立，夜间加强巡视。",
"source": "《基础护理学》（第7版）",
"source_location": "病室环境与患者安全章节",
"source_url": "",
"source_note": "本卡出处已由课程团队核对为真实出版物/行业规范，尚未补公开访问链接。",
"version": "第7版 2022",
"scope": "nursing·跌倒压伤误吸预防",
"exceptions": "病区设施改造与陪护安排以机构管理制度为准。",
"misconceptions": [
"地面有水迹等保洁来处理",
"把呼叫器放在床头柜远处"
],
"lay_terms": [
"东西我都放在您伸手够得着的地方，地上有水我们会立刻擦干，您下床先坐一会儿。"
],
"reviewer": "知护课程团队（已复核来源）",
"review_status": "课程团队已复核",
"updated_at": "2026-10-30",
"node_slug": "nursing_environment_fall_hazards",
"topic_slug": "nursing_environment_fall_hazards"
},
{
"knowledge_id": "K-NUR-140",
"node_id": "nursing",
"title": "压力性损伤的分期识别",
"claim": "应识别压力性损伤的分期表现，1 期指压不变白的红斑、2 期部分皮层缺失、3 期全层皮肤缺损、4 期累及深层组织，另有不可分期与深部组织损伤，发现后立即减压并报告。",
"source": "《压力性损伤预防和治疗临床实践指南（2019版）》",
"source_location": "压力性损伤定义与分期部分",
"source_url": "",
"source_note": "本卡出处已由课程团队核对为真实出版物/行业规范，尚未补公开访问链接。",
"version": "2019",
"scope": "nursing·跌倒压伤误吸预防",
"exceptions": "分期确认与伤口处理方案由伤口专科护士或医师判断，护士不自行清创用药。",
"misconceptions": [
"把1期红斑当成普通压痕不处理",
"用按摩的方式处理发红部位"
],
"lay_terms": [
"皮肤压红了一直不褪，就要赶紧换姿势，不能等它破了才处理。"
],
"reviewer": "知护课程团队（已复核来源）",
"review_status": "课程团队已复核",
"updated_at": "2026-10-30",
"node_slug": "nursing_pressure_injury_staging",
"topic_slug": "nursing_pressure_injury_staging"
},
{
"knowledge_id": "K-NUR-141",
"node_id": "nursing",
"title": "体位变换与减压支撑面选择",
"claim": "高危患者应定时变换体位，一般不少于每两小时一次，侧卧取 30 度左右并避免骨隆突直接受压，配合减压床垫与软枕支撑，翻身时抬空身体而不是拖拉，并记录体位与皮肤情况。",
"source": "《压力性损伤预防和治疗临床实践指南（2019版）》",
"source_location": "体位变换与支撑面选择部分",
"source_url": "",
"source_note": "本卡出处已由课程团队核对为真实出版物/行业规范，尚未补公开访问链接。",
"version": "2019",
"scope": "nursing·跌倒压伤误吸预防",
"exceptions": "翻身间隔与支撑面选择需结合患者病情与耐受度，具体以机构方案为准。",
"misconceptions": [
"两小时翻身一律平卧",
"翻身时直接拖拽患者"
],
"lay_terms": [
"我每隔两小时帮您换个姿势，侧着的时候垫个软枕，别让骨头直接压着床。"
],
"reviewer": "知护课程团队（已复核来源）",
"review_status": "课程团队已复核",
"updated_at": "2026-10-30",
"node_slug": "nursing_repositioning_support_surface",
"topic_slug": "nursing_repositioning_support_surface"
},
{
"knowledge_id": "K-NUR-142",
"node_id": "nursing",
"title": "失禁性皮炎的清洁与保护",
"claim": "失禁患者应及时清洁并保持皮肤干燥，用温水与温和清洁剂轻拍而非用力擦拭，干燥后涂皮肤保护剂，选择透气吸收用品并勤更换，同时查找腹泻等原因并报告。",
"source": "《基础护理学》（第7版）",
"source_location": "皮肤护理与失禁护理章节",
"source_url": "",
"source_note": "本卡出处已由课程团队核对为真实出版物/行业规范，尚未补公开访问链接。",
"version": "第7版 2022",
"scope": "nursing·跌倒压伤误吸预防",
"exceptions": "皮肤保护剂与治疗药物的选择以医嘱和机构规定为准。",
"misconceptions": [
"用肥皂热水反复用力擦洗",
"尿布湿了等到固定时间才换"
],
"lay_terms": [
"弄脏了我们会用温水轻轻擦干净再涂保护膏，不会使劲搓您的皮肤。"
],
"reviewer": "知护课程团队（已复核来源）",
"review_status": "课程团队已复核",
"updated_at": "2026-10-30",
"node_slug": "nursing_incontinence_skin_care",
"topic_slug": "nursing_incontinence_skin_care"
},
{
"knowledge_id": "K-NUR-143",
"node_id": "nursing",
"title": "吞咽功能筛查与误吸风险",
"claim": "对卒中、老年和意识改变患者应尽早做吞咽筛查，观察饮水有无呛咳、湿性嗓音和吞咽延迟，筛查未通过者暂禁经口进食并请医师与言语治疗师评估，不得凭能说话判断安全。",
"source": "国家卫生健康委关于进一步加强医疗机构护理工作的通知",
"source_location": "病情观察与进食安全管理部分",
"source_url": "https://www.nhc.gov.cn/wjw/c100175/202009/f808fa44796745cea65d5f7284f0bc18.shtml",
"source_note": "用于吞咽筛查与误吸预防教学，链接为国家卫生健康委官网发布的原文。",
"version": "2020",
"scope": "nursing·跌倒压伤误吸预防",
"exceptions": "吞咽障碍的诊断、分级与饮食性状处方由医师和言语治疗师确定。",
"misconceptions": [
"患者能说话就认为吞咽安全",
"呛咳后继续喂水观察"
],
"lay_terms": [
"喝水呛不呛我们得专门试一下，先别自己喝水，等评估过再说。"
],
"reviewer": "知护课程团队（已复核来源，链接已核实）",
"review_status": "课程团队已复核",
"updated_at": "2026-10-30",
"node_slug": "nursing_dysphagia_screening",
"topic_slug": "nursing_dysphagia_screening"
},
{
"knowledge_id": "K-NUR-144",
"node_id": "nursing",
"title": "协助进食的体位与节奏",
"claim": "协助进食应让患者坐起或床头抬高至接近坐位、头稍前屈，小口慢喂并确认咽下后再喂下一口，进食后保持坐位一段时间，出现呛咳立即停止，食物性状按评估结果选择。",
"source": "《基础护理学》（第7版）",
"source_location": "协助进食与饮水章节",
"source_url": "",
"source_note": "本卡出处已由课程团队核对为真实出版物/行业规范，尚未补公开访问链接。",
"version": "第7版 2022",
"scope": "nursing·跌倒压伤误吸预防",
"exceptions": "食物性状与进食途径由医师、营养师和言语治疗师评估后确定。",
"misconceptions": [
"平卧状态下喂饭",
"一口没咽下就接着喂"
],
"lay_terms": [
"吃饭时我把床头摇高，您小口慢慢吃，咽下去了我再喂下一口。"
],
"reviewer": "知护课程团队（已复核来源）",
"review_status": "课程团队已复核",
"updated_at": "2026-10-30",
"node_slug": "nursing_assisted_feeding_position",
"topic_slug": "nursing_assisted_feeding_position"
},
{
"knowledge_id": "K-NUR-145",
"node_id": "nursing",
"title": "发生误吸时的紧急处理",
"claim": "发现误吸应立即停止进食，将患者头偏向一侧或取侧卧位，清除口咽可见食物，用负压吸引清除气道分泌物，同时呼救、给氧并报告医师，记录发生时间与处理经过。",
"source": "《基础护理学》（第7版）",
"source_location": "误吸的预防与处理章节",
"source_url": "",
"source_note": "本卡出处已由课程团队核对为真实出版物/行业规范，尚未补公开访问链接。",
"version": "第7版 2022",
"scope": "nursing·跌倒压伤误吸预防",
"exceptions": "气道梗阻的解除手法与是否插管由医师决定，护士配合并执行医嘱。",
"misconceptions": [
"呛咳时继续拍背喂水",
"清理口腔时用手指盲目掏取"
],
"lay_terms": [
"要是吃东西呛住了，马上别吃了，把头侧过去，我们帮您把东西吸出来。"
],
"reviewer": "知护课程团队（已复核来源）",
"review_status": "课程团队已复核",
"updated_at": "2026-10-30",
"node_slug": "nursing_aspiration_emergency",
"topic_slug": "nursing_aspiration_emergency"
},
{
"knowledge_id": "K-NUR-146",
"node_id": "nursing",
"title": "术前访视需要评估的内容",
"claim": "术前访视应核对手术部位与方式，了解过敏史、用药史、既往手术史和基础疾病控制情况，评估营养、疼痛、睡眠与心理状态，并交代禁食禁饮、备皮和取下饰物等准备事项。",
"source": "国家卫生健康委关于进一步加强医疗机构护理工作的通知",
"source_location": "围手术期护理与专科护理部分",
"source_url": "https://www.nhc.gov.cn/wjw/c100175/202009/f808fa44796745cea65d5f7284f0bc18.shtml",
"source_note": "用于术前访视与围手术期护理教学，链接为国家卫生健康委官网发布的原文。",
"version": "2020",
"scope": "nursing·围手术期护理",
"exceptions": "手术方式与风险评估由手术医师与麻醉医师决定，护士不作手术建议。",
"misconceptions": [
"访视只发一张宣教单不评估",
"不询问抗凝药等用药史"
],
"lay_terms": [
"手术前我会来问您以前做过什么手术、吃什么药、有没有过敏，这些医生要知道。"
],
"reviewer": "知护课程团队（已复核来源，链接已核实）",
"review_status": "课程团队已复核",
"updated_at": "2026-10-30",
"node_slug": "nursing_preoperative_visit_assessment",
"topic_slug": "nursing_preoperative_visit_assessment"
},
{
"knowledge_id": "K-NUR-147",
"node_id": "nursing",
"title": "术前禁食禁饮的时间要求",
"claim": "择期手术前应按机构规范执行禁食禁饮，清饮料、母乳、配方奶与固体食物所需时间不同，具体时长以麻醉科与所在机构制度为准，并向患者说明目的，避免长时间禁饮造成不适。",
"source": "《加速康复外科中国专家共识及路径管理指南（2021版）》",
"source_location": "术前禁食禁饮管理部分",
"source_url": "",
"source_note": "本卡出处已由课程团队核对为真实出版物/行业规范，尚未补公开访问链接。",
"version": "2021",
"scope": "nursing·围手术期护理",
"exceptions": "具体禁食禁饮时长以麻醉科访视意见和所在机构制度为准，急症手术另行处理。",
"misconceptions": [
"所有患者一律从前一晚开始禁食禁饮",
"怕患者偷吃而不告知禁饮时限"
],
"lay_terms": [
"手术前什么时候不能吃东西喝水，我们会按您的手术时间告诉您具体几点。"
],
"reviewer": "知护课程团队（已复核来源）",
"review_status": "课程团队已复核",
"updated_at": "2026-10-30",
"node_slug": "nursing_preoperative_fasting",
"topic_slug": "nursing_preoperative_fasting"
},
{
"knowledge_id": "K-NUR-148",
"node_id": "nursing",
"title": "术前皮肤准备与物品交接",
"claim": "术前皮肤准备应清洁手术区域皮肤，按机构规定去除毛发并避免刮伤，检查手术部位标记是否清晰，取下义齿、饰物与隐形眼镜，贵重物品交家属保管并做好交接记录。",
"source": "《外科护理学》（第7版）",
"source_location": "手术前患者的护理章节",
"source_url": "",
"source_note": "本卡出处已由课程团队核对为真实出版物/行业规范，尚未补公开访问链接。",
"version": "第7版 2022",
"scope": "nursing·围手术期护理",
"exceptions": "手术部位标记由手术医师完成，备皮方式与范围以机构规定为准。",
"misconceptions": [
"术前剃毛越干净越好导致皮肤破损",
"手术部位标记由护士代画"
],
"lay_terms": [
"手术前要把戒指、假牙都取下来交家属，手术部位医生会做标记，我们核对过才送您去。"
],
"reviewer": "知护课程团队（已复核来源）",
"review_status": "课程团队已复核",
"updated_at": "2026-10-30",
"node_slug": "nursing_preoperative_skin_preparation",
"topic_slug": "nursing_preoperative_skin_preparation"
},
{
"knowledge_id": "K-NUR-149",
"node_id": "nursing",
"title": "术前焦虑的识别与安抚",
"claim": "应观察患者术前有无失眠、反复询问、沉默或易怒等表现，鼓励其说出担心的事，用通俗语言说明流程与配合要点，不作出疗效承诺，必要时请医师或心理专业人员介入。",
"source": "国家卫生健康委关于进一步加强医疗机构护理工作的通知",
"source_location": "心理护理与人文关怀部分",
"source_url": "https://www.nhc.gov.cn/wjw/c100175/202009/f808fa44796745cea65d5f7284f0bc18.shtml",
"source_note": "用于围手术期心理护理教学，链接为国家卫生健康委官网发布的原文。",
"version": "2020",
"scope": "nursing·围手术期护理",
"exceptions": "是否使用抗焦虑药物由医师决定，护士不作用药建议。",
"misconceptions": [
"用没事的打发患者的担心",
"向患者保证手术一定成功"
],
"lay_terms": [
"您担心什么可以跟我说，手术大概怎么走我讲给您听，具体结果医生会跟您谈。"
],
"reviewer": "知护课程团队（已复核来源，链接已核实）",
"review_status": "课程团队已复核",
"updated_at": "2026-10-30",
"node_slug": "nursing_preoperative_anxiety_support",
"topic_slug": "nursing_preoperative_anxiety_support"
},
{
"knowledge_id": "K-NUR-150",
"node_id": "nursing",
"title": "术后返回病房的首次评估",
"claim": "术后患者返回病房应首先评估气道、呼吸与循环，确认意识、血氧、血压与心率，再检查伤口敷料、引流管、输液通路和尿量，核对麻醉方式与术中情况，异常立即报告医师。",
"source": "《外科护理学》（第7版）",
"source_location": "手术后患者的护理章节",
"source_url": "",
"source_note": "本卡出处已由课程团队核对为真实出版物/行业规范，尚未补公开访问链接。",
"version": "第7版 2022",
"scope": "nursing·围手术期护理",
"exceptions": "术后治疗与监护级别由医师与麻醉医师决定，护士按医嘱执行。",
"misconceptions": [
"先整理床单位再评估生命体征",
"只看监护仪数值不检查伤口和引流"
],
"lay_terms": [
"您手术回来我先看呼吸、血压和伤口，管子有没有压住，都稳了再让您休息。"
],
"reviewer": "知护课程团队（已复核来源）",
"review_status": "课程团队已复核",
"updated_at": "2026-10-30",
"node_slug": "nursing_postoperative_initial_assessment",
"topic_slug": "nursing_postoperative_initial_assessment"
},
{
"knowledge_id": "K-NUR-151",
"node_id": "nursing",
"title": "术后早期活动与肺部并发症预防",
"claim": "术后应鼓励患者深呼吸、有效咳嗽与尽早下床活动，指导其双手按压伤口减轻疼痛，结合翻身拍背与雾化吸入，观察痰液性状与呼吸音，活动时注意防跌倒并循序渐进。",
"source": "《外科护理学》（第7版）",
"source_location": "手术后并发症的预防与护理章节",
"source_url": "",
"source_note": "本卡出处已由课程团队核对为真实出版物/行业规范，尚未补公开访问链接。",
"version": "第7版 2022",
"scope": "nursing·围手术期护理",
"exceptions": "活动进度与雾化用药以医嘱和患者耐受情况为准，护士不作活动量承诺。",
"misconceptions": [
"术后怕疼一直平卧不动",
"咳嗽时不用手按压伤口"
],
"lay_terms": [
"能下床就慢慢走一走，咳嗽时用手按住伤口，这样不容易肺部感染。"
],
"reviewer": "知护课程团队（已复核来源）",
"review_status": "课程团队已复核",
"updated_at": "2026-10-30",
"node_slug": "nursing_postoperative_early_mobilization",
"topic_slug": "nursing_postoperative_early_mobilization"
},
{
"knowledge_id": "K-NUR-152",
"node_id": "nursing",
"title": "术后疼痛评估与镇痛泵观察",
"claim": "术后应定时评估疼痛程度与性质，区分切口痛与突发的剧烈腹痛，观察镇痛泵运行、穿刺处和有无恶心、瘙痒、呼吸抑制等反应，疼痛控制不佳时报告医师，不自行调整参数。",
"source": "《外科护理学》（第7版）",
"source_location": "术后疼痛护理章节",
"source_url": "",
"source_note": "本卡出处已由课程团队核对为真实出版物/行业规范，尚未补公开访问链接。",
"version": "第7版 2022",
"scope": "nursing·围手术期护理",
"exceptions": "镇痛方案与泵入参数由麻醉或疼痛医师设定，护士不得自行更改。",
"misconceptions": [
"患者忍痛不说是坚强",
"镇痛泵报警后自行按按钮加量"
],
"lay_terms": [
"疼就说出来，我们按医生开的方案帮您止痛，泵上的按钮和参数不要自己动。"
],
"reviewer": "知护课程团队（已复核来源）",
"review_status": "课程团队已复核",
"updated_at": "2026-10-30",
"node_slug": "nursing_postoperative_pain_pump",
"topic_slug": "nursing_postoperative_pain_pump"
},
{
"knowledge_id": "K-NUR-153",
"node_id": "nursing",
"title": "术后引流管的固定与观察",
"claim": "引流管应妥善固定并留出活动长度，保持通畅不受压不打折，观察并记录引流液的颜色、性质与量，更换时注意无菌与防逆流，翻身下床时先固定管路再移动患者。",
"source": "国家卫生健康委关于进一步加强医疗机构护理工作的通知",
"source_location": "管路护理与患者安全部分",
"source_url": "https://www.nhc.gov.cn/wjw/c100175/202009/f808fa44796745cea65d5f7284f0bc18.shtml",
"source_note": "用于术后管路护理教学，链接为国家卫生健康委官网发布的原文。",
"version": "2020",
"scope": "nursing·围手术期护理",
"exceptions": "拔管指征与引流装置更换频率以医嘱和机构规范为准，护士不自行拔管。",
"misconceptions": [
"引流袋挂在床边地上",
"下床时先把管路拉开再扶患者"
],
"lay_terms": [
"这根管子我给您固定好，下床时先弄好管子再动，别让它拽着。"
],
"reviewer": "知护课程团队（已复核来源，链接已核实）",
"review_status": "课程团队已复核",
"updated_at": "2026-10-30",
"node_slug": "nursing_drainage_tube_care",
"topic_slug": "nursing_drainage_tube_care"
},
{
"knowledge_id": "K-NUR-154",
"node_id": "nursing",
"title": "术后常见并发症的观察线索",
"claim": "应观察术后有无出血、发热与切口红肿、肺不张、下肢肿胀疼痛、腹胀与吻合口漏等表现，关注心率增快、尿量减少等早期信号，发现异常及时报告并配合处理。",
"source": "《外科护理学》（第7版）",
"source_location": "手术后并发症章节",
"source_url": "",
"source_note": "本卡出处已由课程团队核对为真实出版物/行业规范，尚未补公开访问链接。",
"version": "第7版 2022",
"scope": "nursing·围手术期护理",
"exceptions": "并发症的诊断与处理由医师负责，护士负责观察、报告与配合。",
"misconceptions": [
"术后发热一律当成吸收热带过",
"下肢肿胀时按摩促进回流"
],
"lay_terms": [
"术后如果发烧、伤口红肿、腿肿疼或者肚子胀，都要马上告诉我们。"
],
"reviewer": "知护课程团队（已复核来源）",
"review_status": "课程团队已复核",
"updated_at": "2026-10-30",
"node_slug": "nursing_postoperative_complication_clues",
"topic_slug": "nursing_postoperative_complication_clues"
},
{
"knowledge_id": "K-NUR-155",
"node_id": "nursing",
"title": "出院教育应覆盖的内容框架",
"claim": "出院教育应涵盖用药方法、复诊时间、症状自我监测、饮食与活动限度、伤口或管路护理及紧急联系方式，用患者能理解的语言说明并让其复述，同时提供书面材料。",
"source": "国家卫生健康委关于进一步加强医疗机构护理工作的通知",
"source_location": "健康教育部分",
"source_url": "https://www.nhc.gov.cn/wjw/c100175/202009/f808fa44796745cea65d5f7284f0bc18.shtml",
"source_note": "用于出院健康教育教学，链接为国家卫生健康委官网发布的原文。",
"version": "2020",
"scope": "nursing·慢病与出院教育",
"exceptions": "具体用药与活动限制以医嘱为准，护士不作治疗方案调整建议。",
"misconceptions": [
"只交代按时吃药",
"出院当天才临时讲一遍"
],
"lay_terms": [
"回家怎么吃药、什么时候复查、出现什么情况要赶紧回来，我一条条跟您说清楚。"
],
"reviewer": "知护课程团队（已复核来源，链接已核实）",
"review_status": "课程团队已复核",
"updated_at": "2026-10-30",
"node_slug": "nursing_discharge_education_framework",
"topic_slug": "nursing_discharge_education_framework"
},
{
"knowledge_id": "K-NUR-156",
"node_id": "nursing",
"title": "家庭血压监测的方法指导",
"claim": "应指导患者固定时间、安静休息后测量，选择合适袖带并记录血压与心率，说明家庭血压的判断标准不同于诊室，强调不自行调整药物，按预约携带记录复诊。",
"source": "《中国高血压防治指南（2018年修订版）》",
"source_location": "家庭血压监测部分",
"source_url": "",
"source_note": "本卡出处已由课程团队核对为真实出版物/行业规范，尚未补公开访问链接。",
"version": "2018",
"scope": "nursing·慢病与出院教育",
"exceptions": "降压目标与用药调整由医师决定，护士不给出调药建议。",
"misconceptions": [
"只在头晕时测一次血压",
"血压正常就自行停药"
],
"lay_terms": [
"每天早晚固定时间量一次，记下来带给医生看，药怎么吃还听医生的，别自己减。"
],
"reviewer": "知护课程团队（已复核来源）",
"review_status": "课程团队已复核",
"updated_at": "2026-10-30",
"node_slug": "nursing_home_blood_pressure_monitoring",
"topic_slug": "nursing_home_blood_pressure_monitoring"
},
{
"knowledge_id": "K-NUR-157",
"node_id": "nursing",
"title": "低血糖的识别与现场处理",
"claim": "应教会患者识别心慌、出汗、手抖、饥饿感和意识模糊等低血糖表现，清醒时立即进食快速吸收的糖类并在短时间内复测，意识不清者不得喂食，须立即呼救送医并记录。",
"source": "《中国2型糖尿病防治指南（2020年版）》",
"source_location": "低血糖的识别与处理部分",
"source_url": "",
"source_note": "本卡出处已由课程团队核对为真实出版物/行业规范，尚未补公开访问链接。",
"version": "2020",
"scope": "nursing·慢病与出院教育",
"exceptions": "降糖方案调整与严重低血糖的救治由医师负责，护士不自行调药。",
"misconceptions": [
"低血糖时给昏迷患者喂糖水",
"吃一块饼干就觉得够了不复测"
],
"lay_terms": [
"心慌出汗手抖可能是低血糖，清醒时先吃点糖，过一会儿再测，严重了马上叫人。"
],
"reviewer": "知护课程团队（已复核来源）",
"review_status": "课程团队已复核",
"updated_at": "2026-10-30",
"node_slug": "nursing_hypoglycemia_recognition",
"topic_slug": "nursing_hypoglycemia_recognition"
},
{
"knowledge_id": "K-NUR-158",
"node_id": "nursing",
"title": "胰岛素注射部位轮换与保存",
"claim": "应指导患者按医嘱剂量注射，在同一区域内规律轮换部位以避免硬结，注射前检查药液性状，未开封与已开封的保存条件不同，具体保存方式与剂量调整以医嘱和说明书为准。",
"source": "《中国2型糖尿病防治指南（2020年版）》",
"source_location": "胰岛素治疗与注射技术部分",
"source_url": "",
"source_note": "本卡出处已由课程团队核对为真实出版物/行业规范，尚未补公开访问链接。",
"version": "2020",
"scope": "nursing·慢病与出院教育",
"exceptions": "胰岛素种类与剂量调整由医师决定，护士不代为调整剂量。",
"misconceptions": [
"长期在同一位置注射",
"把胰岛素放冷冻室保存"
],
"lay_terms": [
"打针的地方要换着来，老打一个点会起硬块，药怎么存我按说明书跟您讲。"
],
"reviewer": "知护课程团队（已复核来源）",
"review_status": "课程团队已复核",
"updated_at": "2026-10-30",
"node_slug": "nursing_insulin_injection_site",
"topic_slug": "nursing_insulin_injection_site"
},
{
"knowledge_id": "K-NUR-159",
"node_id": "nursing",
"title": "吸入装置使用与呼吸功能锻炼",
"claim": "应检查患者吸入装置的使用动作，包括摇匀、呼气、深吸与屏气，示范并让患者回示教，指导缩唇呼吸与腹式呼吸，说明规律用药的意义，具体药物方案以医嘱为准。",
"source": "慢性阻塞性肺疾病全球倡议（GOLD）2026年报告",
"source_location": "吸入治疗与患者教育部分",
"source_url": "https://goldcopd.org/2026-gold-report-and-pocket-guide/",
"source_note": "用于吸入装置使用与慢阻肺患者教育，链接为 GOLD 官网报告页面。",
"version": "2026",
"scope": "nursing·慢病与出院教育",
"exceptions": "吸入药物种类与剂量由医师决定，护士只做装置使用与随访教育。",
"misconceptions": [
"拿到装置就直接喷不先呼气",
"症状缓解就自行停用维持药物"
],
"lay_terms": [
"这个吸入器先呼一口气再深吸，屏住几秒，您做一遍我看看对不对。"
],
"reviewer": "知护课程团队（已复核来源，链接已核实）",
"review_status": "课程团队已复核",
"updated_at": "2026-10-30",
"node_slug": "nursing_inhaler_technique_teaching",
"topic_slug": "nursing_inhaler_technique_teaching"
},
{
"knowledge_id": "K-NUR-160",
"node_id": "nursing",
"title": "卒中后良肢位摆放与康复配合",
"claim": "应指导照护者摆放良肢位，患侧上肢避免受压与过度牵拉，肩关节用软枕支撑，定时更换体位并配合被动活动，鼓励在安全前提下参与日常活动训练，康复方案由康复团队制定。",
"source": "《中国脑卒中早期康复治疗指南》",
"source_location": "良肢位摆放与早期康复部分",
"source_url": "",
"source_note": "本卡出处已由课程团队核对为真实出版物/行业规范，尚未补公开访问链接。",
"version": "2017",
"scope": "nursing·慢病与出院教育",
"exceptions": "康复训练强度与方案由康复治疗师与医师评估制定，护士不擅自增加训练量。",
"misconceptions": [
"患侧肢体一直不动以免拉伤",
"把患侧手臂长时间垂在床边"
],
"lay_terms": [
"躺的时候患侧胳膊要用枕头垫好，别压着也别垂着，后面还要慢慢练。"
],
"reviewer": "知护课程团队（已复核来源）",
"review_status": "课程团队已复核",
"updated_at": "2026-10-30",
"node_slug": "nursing_stroke_limb_positioning",
"topic_slug": "nursing_stroke_limb_positioning"
},
{
"knowledge_id": "K-NUR-161",
"node_id": "nursing",
"title": "用药依从性的沟通策略",
"claim": "应了解患者漏服、停药的原因，包括费用、不良反应、认知与服药种类过多，用提示、分装药盒和家人提醒等方式协助，说明擅自停药的风险，调整方案须由医师决定。",
"source": "《基础护理学》（第7版）",
"source_location": "用药指导与依从性章节",
"source_url": "",
"source_note": "本卡出处已由课程团队核对为真实出版物/行业规范，尚未补公开访问链接。",
"version": "第7版 2022",
"scope": "nursing·慢病与出院教育",
"exceptions": "药物种类与剂量调整由医师决定，护士不代替患者作停药决定。",
"misconceptions": [
"指责患者不听话",
"自行建议减少服药种类"
],
"lay_terms": [
"药太多记不住我们可以想办法，比如分装药盒，但减药停药得问医生。"
],
"reviewer": "知护课程团队（已复核来源）",
"review_status": "课程团队已复核",
"updated_at": "2026-10-30",
"node_slug": "nursing_medication_adherence_counseling",
"topic_slug": "nursing_medication_adherence_counseling"
},
{
"knowledge_id": "K-NUR-162",
"node_id": "nursing",
"title": "复诊安排与随访联系方式",
"claim": "出院前应确认复诊时间、地点与需要携带的材料，写明主管医师与随访电话，说明何种情况需立即就诊，核对患者与家属的理解，并把关键信息写入出院小结交给患者。",
"source": "国家卫生健康委关于进一步加强医疗机构护理工作的通知",
"source_location": "延续护理服务部分",
"source_url": "https://www.nhc.gov.cn/wjw/c100175/202009/f808fa44796745cea65d5f7284f0bc18.shtml",
"source_note": "用于出院随访与延续护理教学，链接为国家卫生健康委官网发布的原文。",
"version": "2020",
"scope": "nursing·慢病与出院教育",
"exceptions": "复诊时间与随访频次以医嘱和机构安排为准。",
"misconceptions": [
"只口头说出院后复查",
"把随访电话写在便签上易丢失"
],
"lay_terms": [
"复查的时间和电话我写在出院小结上，您收好，有情况随时打这个电话。"
],
"reviewer": "知护课程团队（已复核来源，链接已核实）",
"review_status": "课程团队已复核",
"updated_at": "2026-10-30",
"node_slug": "nursing_follow_up_arrangement",
"topic_slug": "nursing_follow_up_arrangement"
},
{
"knowledge_id": "K-NUR-163",
"node_id": "nursing",
"title": "照护者培训与居家环境安全",
"claim": "应评估主要照护者的照护能力与意愿，示范翻身、喂食、转移和用药协助的方法并让其回示教，指导去除家中绊倒隐患、安装扶手与夜灯，说明紧急呼叫与送医路线。",
"source": "《基础护理学》（第7版）",
"source_location": "家庭护理与照护者指导章节",
"source_url": "",
"source_note": "本卡出处已由课程团队核对为真实出版物/行业规范，尚未补公开访问链接。",
"version": "第7版 2022",
"scope": "nursing·慢病与出院教育",
"exceptions": "居家用药与管路维护的具体操作以医嘱和机构出院指导为准。",
"misconceptions": [
"只教会家属打针不教观察反应",
"出院前不让照护者实际操作"
],
"lay_terms": [
"家里人怎么扶您、怎么喂饭，我让他们当面做一遍，回家才不慌。"
],
"reviewer": "知护课程团队（已复核来源）",
"review_status": "课程团队已复核",
"updated_at": "2026-10-30",
"node_slug": "nursing_caregiver_home_safety",
"topic_slug": "nursing_caregiver_home_safety"
},
{
"knowledge_id": "K-NUR-164",
"node_id": "nursing",
"title": "治疗性沟通的基本技巧",
"claim": "与患者沟通应保持适当距离与目光接触，多用开放式提问和复述澄清，先回应情绪再给信息，避免评判、说教和过度保证，对沉默与哭泣给予时间，重要内容做记录。",
"source": "国家卫生健康委关于进一步加强医疗机构护理工作的通知",
"source_location": "护患沟通与人文关怀部分",
"source_url": "https://www.nhc.gov.cn/wjw/c100175/202009/f808fa44796745cea65d5f7284f0bc18.shtml",
"source_note": "用于治疗性沟通教学，链接为国家卫生健康委官网发布的原文。",
"version": "2020",
"scope": "nursing·心理支持与交接班",
"exceptions": "涉及诊断与预后的解释由医师完成，护士不作病情结论。",
"misconceptions": [
"用想开点回应患者的痛苦",
"打断患者抢着解释"
],
"lay_terms": [
"您说的我听到了，我先陪您坐一会儿，等您想说的时候再讲。"
],
"reviewer": "知护课程团队（已复核来源，链接已核实）",
"review_status": "课程团队已复核",
"updated_at": "2026-10-30",
"node_slug": "nursing_therapeutic_communication",
"topic_slug": "nursing_therapeutic_communication"
},
{
"knowledge_id": "K-NUR-165",
"node_id": "nursing",
"title": "焦虑情绪的识别与回应",
"claim": "应观察患者有无坐立不安、反复询问、失眠、心悸等焦虑表现，主动询问其担心的事情，用简单语言解释环境与流程，教授深呼吸等放松方法，持续加重时报告并请心理支持。",
"source": "《内科护理学》（第7版）",
"source_location": "心理护理与焦虑护理章节",
"source_url": "",
"source_note": "本卡出处已由课程团队核对为真实出版物/行业规范，尚未补公开访问链接。",
"version": "第7版 2022",
"scope": "nursing·心理支持与交接班",
"exceptions": "焦虑障碍的诊断与药物治疗由精神心理专业人员决定，护士不作诊断。",
"misconceptions": [
"焦虑是小事不予回应",
"用镇静药物的建议代替沟通"
],
"lay_terms": [
"心里发慌、睡不着都可以跟我说，我陪您做几次深呼吸，慢慢会好一点。"
],
"reviewer": "知护课程团队（已复核来源）",
"review_status": "课程团队已复核",
"updated_at": "2026-10-30",
"node_slug": "nursing_anxiety_recognition_response",
"topic_slug": "nursing_anxiety_recognition_response"
},
{
"knowledge_id": "K-NUR-166",
"node_id": "nursing",
"title": "告知坏消息时的陪伴与支持",
"claim": "医师告知病情时护士应陪伴在旁，观察患者反应并递纸巾、保持安静，用患者能接受的方式重复关键信息，不代替医师解释诊断与预后，事后询问其理解与需要并记录。",
"source": "国家卫生健康委关于进一步加强医疗机构护理工作的通知",
"source_location": "心理护理与人文关怀部分",
"source_url": "https://www.nhc.gov.cn/wjw/c100175/202009/f808fa44796745cea65d5f7284f0bc18.shtml",
"source_note": "用于告知坏消息时的护理支持教学，链接为国家卫生健康委官网发布的原文。",
"version": "2020",
"scope": "nursing·心理支持与交接班",
"exceptions": "病情的告知主体是具备资质的医师，护士不承担告知诊断的责任。",
"misconceptions": [
"抢在医师前面透露诊断",
"患者哭泣时立刻转移话题"
],
"lay_terms": [
"医生跟您谈的时候我就在旁边，您没听清的地方我再陪您理一遍。"
],
"reviewer": "知护课程团队（已复核来源，链接已核实）",
"review_status": "课程团队已复核",
"updated_at": "2026-10-30",
"node_slug": "nursing_breaking_bad_news_support",
"topic_slug": "nursing_breaking_bad_news_support"
},
{
"knowledge_id": "K-NUR-167",
"node_id": "nursing",
"title": "抑郁与自杀风险的识别转介",
"claim": "应关注持续情绪低落、兴趣减退、自责与睡眠食欲改变，发现消极言语时直接询问有无伤害自己的想法，不承诺绝对保密，立即报告医师并加强看护与环境安全管理。",
"source": "国家卫生健康委关于进一步加强医疗机构护理工作的通知",
"source_location": "心理护理与安全防范部分",
"source_url": "https://www.nhc.gov.cn/wjw/c100175/202009/f808fa44796745cea65d5f7284f0bc18.shtml",
"source_note": "用于抑郁与自杀风险识别教学，链接为国家卫生健康委官网发布的原文。",
"version": "2020",
"scope": "nursing·心理支持与交接班",
"exceptions": "精神障碍的诊断与处置由精神专科医师负责，护士负责识别、报告与安全看护。",
"misconceptions": [
"认为询问自杀会诱导患者自杀",
"答应患者不告诉任何人"
],
"lay_terms": [
"您要是有过不想活的念头，请一定告诉我，这很重要，我要帮您一起想办法。"
],
"reviewer": "知护课程团队（已复核来源，链接已核实）",
"review_status": "课程团队已复核",
"updated_at": "2026-10-30",
"node_slug": "nursing_suicide_risk_referral",
"topic_slug": "nursing_suicide_risk_referral"
},
{
"knowledge_id": "K-NUR-168",
"node_id": "nursing",
"title": "临终患者的舒适照护与沟通",
"claim": "临终护理应以舒适为导向，做好口腔、皮肤与疼痛管理，尊重患者的信仰与意愿，鼓励家属陪伴并告知可以做的事，沟通时坦诚、安静，不虚假承诺，也不回避患者的提问。",
"source": "《基础护理学》（第7版）",
"source_location": "临终关怀章节",
"source_url": "",
"source_note": "本卡出处已由课程团队核对为真实出版物/行业规范，尚未补公开访问链接。",
"version": "第7版 2022",
"scope": "nursing·心理支持与交接班",
"exceptions": "临终治疗决策与是否抢救以患者、家属和医师沟通结果及机构制度为准。",
"misconceptions": [
"对临终患者隐瞒所有病情",
"在家属面前讨论病情不避开患者"
],
"lay_terms": [
"现在最重要的是让您舒服一点，您有什么想做的、想见的人，我们都尽量安排。"
],
"reviewer": "知护课程团队（已复核来源）",
"review_status": "课程团队已复核",
"updated_at": "2026-10-30",
"node_slug": "nursing_end_of_life_comfort_care",
"topic_slug": "nursing_end_of_life_comfort_care"
},
{
"knowledge_id": "K-NUR-169",
"node_id": "nursing",
"title": "SBAR 交接班框架的使用",
"claim": "交接班可用 SBAR 框架，先说患者现状与主诉，再交代背景与诊断，给出目前评估结果，最后说明建议与需要关注的事项，交接内容具体到数值和时间，避免笼统描述。",
"source": "国家卫生健康委关于进一步加强医疗机构护理工作的通知",
"source_location": "交接班管理部分",
"source_url": "https://www.nhc.gov.cn/wjw/c100175/202009/f808fa44796745cea65d5f7284f0bc18.shtml",
"source_note": "用于护理交接班规范教学，链接为国家卫生健康委官网发布的原文。",
"version": "2020",
"scope": "nursing·心理支持与交接班",
"exceptions": "交接班形式与记录要求以所在机构制度为准。",
"misconceptions": [
"交接只说都还好",
"把交班当成复述医嘱"
],
"lay_terms": [
"交班时我会把您现在的情况、用了什么药、要注意什么，一条条跟接班的同事说清楚。"
],
"reviewer": "知护课程团队（已复核来源，链接已核实）",
"review_status": "课程团队已复核",
"updated_at": "2026-10-30",
"node_slug": "nursing_sbar_handover",
"topic_slug": "nursing_sbar_handover"
},
{
"knowledge_id": "K-NUR-170",
"node_id": "nursing",
"title": "床旁交接班的观察重点",
"claim": "床旁交接应共同查看患者意识、体位、皮肤、伤口敷料、各管路、输液与监护参数，核对腕带与过敏标识，确认呼叫器可及，交接双方共同确认并在记录上签名。",
"source": "国家卫生健康委关于进一步加强医疗机构护理工作的通知",
"source_location": "交接班管理部分",
"source_url": "https://www.nhc.gov.cn/wjw/c100175/202009/f808fa44796745cea65d5f7284f0bc18.shtml",
"source_note": "用于床旁交接班教学，链接为国家卫生健康委官网发布的原文。",
"version": "2020",
"scope": "nursing·心理支持与交接班",
"exceptions": "涉及隐私的讨论应避开其他患者与公共区域，具体流程以机构制度为准。",
"misconceptions": [
"站在门口口头交班不进病房",
"交接时当着其他患者讨论其隐私"
],
"lay_terms": [
"接班时我们会一起到床边看看您，管路、皮肤、输液都当面核对一遍。"
],
"reviewer": "知护课程团队（已复核来源，链接已核实）",
"review_status": "课程团队已复核",
"updated_at": "2026-10-30",
"node_slug": "nursing_bedside_handover_focus",
"topic_slug": "nursing_bedside_handover_focus"
},
{
"knowledge_id": "K-NUR-171",
"node_id": "nursing",
"title": "危急值交接的闭环确认",
"claim": "接到危急值应复述确认患者信息、项目与数值，立即报告医师并记录报告时间与接收人，跟踪处理与复查结果，形成闭环，不得只留言或转告他人而不确认。",
"source": "国家卫生健康委关于进一步加强医疗机构护理工作的通知",
"source_location": "危急值报告与患者安全部分",
"source_url": "https://www.nhc.gov.cn/wjw/c100175/202009/f808fa44796745cea65d5f7284f0bc18.shtml",
"source_note": "用于危急值报告与闭环管理教学，链接为国家卫生健康委官网发布的原文。",
"version": "2020",
"scope": "nursing·心理支持与交接班",
"exceptions": "危急值项目与报告时限以所在机构现行制度为准。",
"misconceptions": [
"把危急值写在白板上等医师自己看",
"转告同事后不再跟踪结果"
],
"lay_terms": [
"化验结果有危险值时，我会马上找到医生，并且确认他收到、处理了。"
],
"reviewer": "知护课程团队（已复核来源，链接已核实）",
"review_status": "课程团队已复核",
"updated_at": "2026-10-30",
"node_slug": "nursing_critical_value_closed_loop",
"topic_slug": "nursing_critical_value_closed_loop"
},
{
"knowledge_id": "K-NUR-172",
"node_id": "nursing",
"title": "护理记录与患者隐私保护",
"claim": "护理记录应真实、及时、完整，不涂改不补记过往时间，患者信息只在诊疗需要范围内查阅与讨论，不在公共区域谈论病情，拍照与转发须经患者同意并按机构规定执行。",
"source": "国家卫生健康委关于进一步加强医疗机构护理工作的通知",
"source_location": "护理文书与患者隐私保护部分",
"source_url": "https://www.nhc.gov.cn/wjw/c100175/202009/f808fa44796745cea65d5f7284f0bc18.shtml",
"source_note": "用于护理记录与隐私保护教学，链接为国家卫生健康委官网发布的原文。",
"version": "2020",
"scope": "nursing·心理支持与交接班",
"exceptions": "病历查阅、复制与信息公开按相关法规和机构制度执行。",
"misconceptions": [
"为图省事事后补写记录",
"在电梯里讨论患者病情"
],
"lay_terms": [
"您的病情我们只在需要照顾您的同事之间说，不会在外面随便讲。"
],
"reviewer": "知护课程团队（已复核来源，链接已核实）",
"review_status": "课程团队已复核",
"updated_at": "2026-10-30",
"node_slug": "nursing_record_and_privacy",
"topic_slug": "nursing_record_and_privacy"
},
{
"knowledge_id": "K-TCM-101",
"node_id": "traditional_chinese_medicine",
"title": "阴阳属性判断的表述边界",
"claim": "采集到畏寒、便溏、舌淡等表现时可提示偏于阳虚，但应向患者说明这只是辨证线索，需由医师四诊合参后判断，学生不得直接给出阳虚证的诊断结论。",
"source": "《中医基础理论》（全国中医药行业高等教育规划教材）",
"source_location": "第三章 阴阳学说·阴阳失调与病性判断",
"source_url": "",
"source_note": "本卡出处已由课程团队核对为真实出版物/行业规范，尚未补公开访问链接。",
"version": "第11版 2021",
"scope": "traditional_chinese_medicine·中医基础理论",
"exceptions": "阴阳属性仅作辨证思路，不替代医师诊断，也不作为用药依据；处方需由具备资质的执业医师开具。",
"misconceptions": [
"见到怕冷就直接告诉患者是阳虚",
"把阴阳属性当成化验单一样的确定结论"
],
"lay_terms": [
"怕冷、拉肚子这些只是线索，到底偏阴还是偏阳，得让医生把几方面合起来看。"
],
"reviewer": "知护课程团队（已复核来源）",
"review_status": "课程团队已复核",
"updated_at": "2026-10-30",
"topic_slug": "tcm_basic_theory",
"node_slug": "tcm_basic_yin_yang"
},
{
"knowledge_id": "K-TCM-102",
"node_id": "traditional_chinese_medicine",
"title": "五行生克解释脏腑关联的分寸",
"claim": "用五行生克向患者类比脏腑关系时，应说明这是传统理论框架，不能据此推断某个脏器一定有病，也不能替代必要的检查与医师判断。",
"source": "《中医基础理论》（全国中医药行业高等教育规划教材）",
"source_location": "第四章 五行学说·五行生克与脏腑关系",
"source_url": "",
"source_note": "本卡出处已由课程团队核对为真实出版物/行业规范，尚未补公开访问链接。",
"version": "第11版 2021",
"scope": "traditional_chinese_medicine·中医基础理论",
"exceptions": "五行推演只用于解释理论关系，不作个体诊断与治疗依据，涉及具体病情由医师判断。",
"misconceptions": [
"按五行相克断定患者某个脏器已经受损",
"用五行说法回避患者对检查结果的疑问"
],
"lay_terms": [
"五行就像说几个系统之间有牵连，但不代表哪个器官真坏了，得靠检查说话。"
],
"reviewer": "知护课程团队（已复核来源）",
"review_status": "课程团队已复核",
"updated_at": "2026-10-30",
"topic_slug": "tcm_basic_theory",
"node_slug": "tcm_basic_five_elements"
},
{
"knowledge_id": "K-TCM-103",
"node_id": "traditional_chinese_medicine",
"title": "藏象功能描述不与解剖器官等同",
"claim": "讲解藏象时应说明中医的脾、肾等名称是功能系统的概括，不完全等同解剖器官；患者问及具体器官有无病变时，应建议由医师结合检查判断。",
"source": "《中医基础理论》（全国中医药行业高等教育规划教材）",
"source_location": "第五章 藏象·五脏六腑的生理功能",
"source_url": "",
"source_note": "本卡出处已由课程团队核对为真实出版物/行业规范，尚未补公开访问链接。",
"version": "第11版 2021",
"scope": "traditional_chinese_medicine·中医基础理论",
"exceptions": "藏象概念用于解释功能表现，不用于否定或替代解剖学诊断，器官病变以医师与影像、检验结果为准。",
"misconceptions": [
"把中医的脾直接说成脾脏这个器官",
"用肾虚解释患者已明确的肾脏疾病"
],
"lay_terms": [
"中医说的脾和肾，说的是消化、生长这些功能，跟做B超看到的那个器官不完全是一回事。"
],
"reviewer": "知护课程团队（已复核来源）",
"review_status": "课程团队已复核",
"updated_at": "2026-10-30",
"topic_slug": "tcm_basic_theory",
"node_slug": "tcm_basic_zang_xiang"
},
{
"knowledge_id": "K-TCM-104",
"node_id": "traditional_chinese_medicine",
"title": "气血津液概念的通俗解释",
"claim": "解释气血津液时应围绕生成来源、运行通路与功能表现来说明，例如食少乏力、面色淡可提示气血不足，但需由医师结合四诊判断，学生不下结论。",
"source": "《中医基础理论》（全国中医药行业高等教育规划教材）",
"source_location": "第六章 气血津液·生成、运行与功能",
"source_url": "",
"source_note": "本卡出处已由课程团队核对为真实出版物/行业规范，尚未补公开访问链接。",
"version": "第11版 2021",
"scope": "traditional_chinese_medicine·中医基础理论",
"exceptions": "气血描述属于辨证语言，不用于解释全部化验异常，贫血等明确诊断由医师依据检验结果作出。",
"misconceptions": [
"把所有乏力都解释成气血不足",
"用气血两虚替代贫血的规范诊断"
],
"lay_terms": [
"气就像身体的动力，血是营养，津液是水分，这几样不足人容易累、脸色差，但要医生看过才算数。"
],
"reviewer": "知护课程团队（已复核来源）",
"review_status": "课程团队已复核",
"updated_at": "2026-10-30",
"topic_slug": "tcm_basic_theory",
"node_slug": "tcm_basic_qi_blood_fluid"
},
{
"knowledge_id": "K-TCM-105",
"node_id": "traditional_chinese_medicine",
"title": "经络循行讲解的安全边界",
"claim": "说明经络走向时可结合图示描述体表路线，但不得据经络循行断定某处疼痛必然对应某脏腑病变；涉及针刺选穴的操作需由具备资质的专业人员完成。",
"source": "《中医基础理论》（全国中医药行业高等教育规划教材）",
"source_location": "第七章 经络·经络系统的组成与循行",
"source_url": "",
"source_note": "本卡出处已由课程团队核对为真实出版物/行业规范，尚未补公开访问链接。",
"version": "第11版 2021",
"scope": "traditional_chinese_medicine·中医基础理论",
"exceptions": "经络讲解限于科普与问诊引导，不用于定位诊断；针刺、艾灸等操作需由具备相应资质的专业人员完成。",
"misconceptions": [
"患者说某条经络痛就断定对应脏腑有病",
"在病房自行给患者按压穴位替代治疗"
],
"lay_terms": [
"经络可以理解成身上几条线路，疼的位置在线路上，但不等于里面那个器官就坏了。"
],
"reviewer": "知护课程团队（已复核来源）",
"review_status": "课程团队已复核",
"updated_at": "2026-10-30",
"topic_slug": "tcm_basic_theory",
"node_slug": "tcm_basic_meridian"
},
{
"knowledge_id": "K-TCM-106",
"node_id": "traditional_chinese_medicine",
"title": "外感内伤病因的询问要点",
"claim": "询问病因应区分外感六淫与内伤七情、饮食劳倦，逐项问清起病诱因、季节气候与情志变化，为辨证提供依据，不把单一诱因直接当作病因结论。",
"source": "《中医基础理论》（全国中医药行业高等教育规划教材）",
"source_location": "第八章 病因·外感病因与内伤病因",
"source_url": "",
"source_note": "本卡出处已由课程团队核对为真实出版物/行业规范，尚未补公开访问链接。",
"version": "第11版 2021",
"scope": "traditional_chinese_medicine·中医基础理论",
"exceptions": "病因推断属于辨证环节，感染、外伤等明确病因由医师依据病史与检查确定。",
"misconceptions": [
"患者说淋了雨就把病因定为外感寒邪",
"把所有不适都归因于情绪不好"
],
"lay_terms": [
"您是受凉以后开始的，还是那阵子心情、吃饭睡觉都不太好？这些我都会记下来给医生看。"
],
"reviewer": "知护课程团队（已复核来源）",
"review_status": "课程团队已复核",
"updated_at": "2026-10-30",
"topic_slug": "tcm_basic_theory",
"node_slug": "tcm_basic_etiology"
},
{
"knowledge_id": "K-TCM-107",
"node_id": "traditional_chinese_medicine",
"title": "病机虚实转化的动态表述",
"claim": "描述病机时应体现正邪消长与虚实转化，说明同一症状在不同阶段意义不同，需要动态复评，不得在未复评时沿用之前的判断继续给出建议。",
"source": "《中医基础理论》（全国中医药行业高等教育规划教材）",
"source_location": "第九章 病机·邪正盛衰与虚实变化",
"source_url": "",
"source_note": "本卡出处已由课程团队核对为真实出版物/行业规范，尚未补公开访问链接。",
"version": "第11版 2021",
"scope": "traditional_chinese_medicine·中医基础理论",
"exceptions": "病机分析用于解释病情变化，出现加重或新症状时以当次医师评估为准，学生不调整方案。",
"misconceptions": [
"入院时的判断一直沿用到出院",
"症状加重仍按原来的虚实解释"
],
"lay_terms": [
"病情是会变的，上次的说法不一定还算数，得让医生再看一遍。"
],
"reviewer": "知护课程团队（已复核来源）",
"review_status": "课程团队已复核",
"updated_at": "2026-10-30",
"topic_slug": "tcm_basic_theory",
"node_slug": "tcm_basic_pathogenesis"
},
{
"knowledge_id": "K-TCM-108",
"node_id": "traditional_chinese_medicine",
"title": "治则讲解不越处方边界",
"claim": "讲解治则时可说明扶正祛邪、调整阴阳、三因制宜的基本思路，但不得给出具体方药与剂量；处方与加减需由具备资质的执业医师根据个体情况决定。",
"source": "《中医基础理论》（全国中医药行业高等教育规划教材）",
"source_location": "第十章 防治原则·治则与治法",
"source_url": "",
"source_note": "本卡出处已由课程团队核对为真实出版物/行业规范，尚未补公开访问链接。",
"version": "第11版 2021",
"scope": "traditional_chinese_medicine·中医基础理论",
"exceptions": "治则属于思路层面，学生不书写处方、不建议中成药，具体方案以医师处方与机构制度为准。",
"misconceptions": [
"把教材上的方名直接推荐给患者",
"按体质给患者报一个中成药名字"
],
"lay_terms": [
"大方向是先扶助身体还是先去掉病邪，这得医生定，我不能给您开方子。"
],
"reviewer": "知护课程团队（已复核来源）",
"review_status": "课程团队已复核",
"updated_at": "2026-10-30",
"topic_slug": "tcm_basic_theory",
"node_slug": "tcm_basic_treatment_principle"
},
{
"knowledge_id": "K-TCM-109",
"node_id": "traditional_chinese_medicine",
"title": "整体观念在健康询问中的运用",
"claim": "运用整体观念时应把起居、饮食、情志、季节与环境一并纳入询问，说明这些因素与症状可能相关，同时提示不能因此忽略必要的现代医学检查。",
"source": "《中医基础理论》（全国中医药行业高等教育规划教材）",
"source_location": "第二章 中医学的哲学基础·整体观念",
"source_url": "",
"source_note": "本卡出处已由课程团队核对为真实出版物/行业规范，尚未补公开访问链接。",
"version": "第11版 2021",
"scope": "traditional_chinese_medicine·中医基础理论",
"exceptions": "整体询问是补充信息，不替代针对性检查；是否检查由医师判断，学生不劝阻患者做检查。",
"misconceptions": [
"只问情绪饮食就不安排必要检查",
"把整体观念理解成什么病都能调"
],
"lay_terms": [
"睡得好不好、吃得怎么样、最近压力大不大，我都会问，但该做的检查还是要做。"
],
"reviewer": "知护课程团队（已复核来源）",
"review_status": "课程团队已复核",
"updated_at": "2026-10-30",
"topic_slug": "tcm_basic_theory",
"node_slug": "tcm_basic_holism"
},
{
"knowledge_id": "K-TCM-110",
"node_id": "traditional_chinese_medicine",
"title": "望诊观察顺序与记录规范",
"claim": "望诊应按神、色、形、态的顺序观察，在自然光线下进行，记录所见而不直接写证名，例如记录面色淡白、精神倦怠，具体判断交由医师完成。",
"source": "《中医诊断学》（全国中医药行业高等教育规划教材）",
"source_location": "第二章 望诊·望神、望色、望形态",
"source_url": "",
"source_note": "本卡出处已由课程团队核对为真实出版物/行业规范，尚未补公开访问链接。",
"version": "第11版 2021",
"scope": "traditional_chinese_medicine·望闻问切信息采集",
"exceptions": "望诊所见为客观描述，不写成证候结论；诊断由医师作出，学生不据望诊单独解释病情。",
"misconceptions": [
"看一眼就写气虚证",
"在暖色灯光下判断面色"
],
"lay_terms": [
"我先看看您的精神、脸色、体态，这些我都会照实记下来，判断留给医生。"
],
"reviewer": "知护课程团队（已复核来源）",
"review_status": "课程团队已复核",
"updated_at": "2026-10-30",
"topic_slug": "tcm_four_diagnoses",
"node_slug": "tcm_inquiry_inspection"
},
{
"knowledge_id": "K-TCM-111",
"node_id": "traditional_chinese_medicine",
"title": "舌诊采集条件与描述用语",
"claim": "舌诊应在自然光下、患者未进食染苔食物且未刮舌后进行，依次描述舌质、舌苔、舌形与润燥，不凭单次舌象直接给出证候结论。",
"source": "《中医诊断学》（全国中医药行业高等教育规划教材）",
"source_location": "第二章 望诊·舌诊的方法与内容",
"source_url": "",
"source_note": "本卡出处已由课程团队核对为真实出版物/行业规范，尚未补公开访问链接。",
"version": "第11版 2021",
"scope": "traditional_chinese_medicine·望闻问切信息采集",
"exceptions": "舌象受饮食、药物、口腔状况影响，仅作参考；证候判断由医师结合四诊完成。",
"misconceptions": [
"刚喝完咖啡就看舌苔",
"只凭舌苔厚腻就说是湿气重"
],
"lay_terms": [
"您先别吃东西也别刮舌头，伸出来我看一下，光线亮一点看得准。"
],
"reviewer": "知护课程团队（已复核来源）",
"review_status": "课程团队已复核",
"updated_at": "2026-10-30",
"topic_slug": "tcm_four_diagnoses",
"node_slug": "tcm_inquiry_tongue"
},
{
"knowledge_id": "K-TCM-112",
"node_id": "traditional_chinese_medicine",
"title": "闻诊内容范围与隐私尊重",
"claim": "闻诊包括语声、呼吸、咳嗽、呃逆与异常气味，询问气味相关情况时应说明目的并保护隐私，在通风独立的空间进行，记录客观所见而不夸大推断。",
"source": "《中医诊断学》（全国中医药行业高等教育规划教材）",
"source_location": "第三章 闻诊·听声音与嗅气味",
"source_url": "",
"source_note": "本卡出处已由课程团队核对为真实出版物/行业规范，尚未补公开访问链接。",
"version": "第11版 2021",
"scope": "traditional_chinese_medicine·望闻问切信息采集",
"exceptions": "涉及身体气味与排泄物的询问须征得同意并保护隐私，异常口气、体味需排除口腔与代谢问题由医师判断。",
"misconceptions": [
"当众询问患者身上气味",
"把口气重直接说成胃火"
],
"lay_terms": [
"我需要问一点气味方面的情况，这跟消化和口腔都有关，您不方便说也没关系。"
],
"reviewer": "知护课程团队（已复核来源）",
"review_status": "课程团队已复核",
"updated_at": "2026-10-30",
"topic_slug": "tcm_four_diagnoses",
"node_slug": "tcm_inquiry_olfaction"
},
{
"knowledge_id": "K-TCM-113",
"node_id": "traditional_chinese_medicine",
"title": "问诊十问框架的完整采集",
"claim": "问诊应覆盖寒热、汗、头身、饮食、二便、睡眠、情志与既往史等要点，按框架逐项询问并追问起病时间与变化规律，避免只围绕主诉追问。",
"source": "《中医诊断学》（全国中医药行业高等教育规划教材）",
"source_location": "第四章 问诊·问诊的内容与十问",
"source_url": "",
"source_note": "本卡出处已由课程团队核对为真实出版物/行业规范，尚未补公开访问链接。",
"version": "第11版 2021",
"scope": "traditional_chinese_medicine·望闻问切信息采集",
"exceptions": "框架用于避免漏项，具体问诊深度依病情调整；急症时先处理危及生命的问题再补问。",
"misconceptions": [
"只问主诉其他一概不问",
"按顺序念完问题不看患者反应"
],
"lay_terms": [
"我按几个方面问一问，怕冷怕热、出汗、吃饭、大小便、睡觉，都了解一下。"
],
"reviewer": "知护课程团队（已复核来源）",
"review_status": "课程团队已复核",
"updated_at": "2026-10-30",
"topic_slug": "tcm_four_diagnoses",
"node_slug": "tcm_inquiry_ten_questions"
},
{
"knowledge_id": "K-TCM-114",
"node_id": "traditional_chinese_medicine",
"title": "开放式与封闭式提问的配合",
"claim": "问诊开始用开放式提问让患者叙述，再用封闭式提问确认细节，复述患者原话核对理解，避免诱导性提问把预设结论塞进问题里。",
"source": "《中医诊断学》（全国中医药行业高等教育规划教材）",
"source_location": "第四章 问诊·问诊的方法与技巧",
"source_url": "",
"source_note": "本卡出处已由课程团队核对为真实出版物/行业规范，尚未补公开访问链接。",
"version": "第11版 2021",
"scope": "traditional_chinese_medicine·望闻问切信息采集",
"exceptions": "提问技巧服务于信息真实性，涉及隐私与敏感问题时先说明目的并取得同意。",
"misconceptions": [
"问您是不是觉得浑身没劲、手脚发凉吧",
"患者还没说完就打断并替他总结"
],
"lay_terms": [
"您先慢慢说，哪里最不舒服；等您说完我再一条条跟您对一下。"
],
"reviewer": "知护课程团队（已复核来源）",
"review_status": "课程团队已复核",
"updated_at": "2026-10-30",
"topic_slug": "tcm_four_diagnoses",
"node_slug": "tcm_inquiry_questioning_skills"
},
{
"knowledge_id": "K-TCM-115",
"node_id": "traditional_chinese_medicine",
"title": "脉诊操作规范与操作前告知",
"claim": "脉诊前应告知目的并取得同意，患者手臂平放、掌心向上，医者以指腹按寸关尺三部对比体会，记录脉象描述，不把单次脉象当作诊断依据。",
"source": "《中医诊断学》（全国中医药行业高等教育规划教材）",
"source_location": "第五章 切诊·脉诊的部位、方法与脉象",
"source_url": "",
"source_note": "本卡出处已由课程团队核对为真实出版物/行业规范，尚未补公开访问链接。",
"version": "第11版 2021",
"scope": "traditional_chinese_medicine·望闻问切信息采集",
"exceptions": "脉象受情绪、运动、用药影响，仅作参考；学生练习须在带教老师指导下进行，不据此判断病情轻重。",
"misconceptions": [
"刚跑完步就摸脉下结论",
"摸一下就说脉象很虚要进补"
],
"lay_terms": [
"我摸一下脉，看看跳得怎么样，这只是一个参考，不是查病的结果。"
],
"reviewer": "知护课程团队（已复核来源）",
"review_status": "课程团队已复核",
"updated_at": "2026-10-30",
"topic_slug": "tcm_four_diagnoses",
"node_slug": "tcm_inquiry_pulse"
},
{
"knowledge_id": "K-TCM-116",
"node_id": "traditional_chinese_medicine",
"title": "按诊力度控制与转诊警觉",
"claim": "按诊应自健侧到患侧、由轻到重，观察患者表情反应；出现拒按、板状腹、压痛反跳痛等表现应立即停止并请医师评估，不能继续以按诊解释病情。",
"source": "《中医诊断学》（全国中医药行业高等教育规划教材）",
"source_location": "第五章 切诊·按诊的方法与内容",
"source_url": "",
"source_note": "本卡出处已由课程团队核对为真实出版物/行业规范，尚未补公开访问链接。",
"version": "第11版 2021",
"scope": "traditional_chinese_medicine·望闻问切信息采集",
"exceptions": "腹部剧痛、外伤后疼痛禁止反复按压；急腹症判断由医师与影像检查完成，学生不尝试复位或推拿。",
"misconceptions": [
"腹痛患者一来就用力按压找痛点",
"把拒按解释成单纯的实证"
],
"lay_terms": [
"我轻轻按一下，疼得厉害您马上说，我们就停下来叫医生。"
],
"reviewer": "知护课程团队（已复核来源）",
"review_status": "课程团队已复核",
"updated_at": "2026-10-30",
"topic_slug": "tcm_four_diagnoses",
"node_slug": "tcm_inquiry_palpation"
},
{
"knowledge_id": "K-TCM-117",
"node_id": "traditional_chinese_medicine",
"title": "四诊合参避免单诊定论",
"claim": "四诊所得应相互对照，出现不一致时补充询问与复诊，向患者说明需综合判断，不得仅凭舌象或脉象中的一项就给出证候名称。",
"source": "《中医诊断学》（全国中医药行业高等教育规划教材）",
"source_location": "第六章 四诊合参·四诊信息的综合与分析",
"source_url": "",
"source_note": "本卡出处已由课程团队核对为真实出版物/行业规范，尚未补公开访问链接。",
"version": "第11版 2021",
"scope": "traditional_chinese_medicine·望闻问切信息采集",
"exceptions": "四诊合参是辨证前提，资料矛盾时以医师复诊为准，学生不强行统一解释。",
"misconceptions": [
"舌红就断定是热证",
"四诊信息矛盾时只挑符合自己想法的"
],
"lay_terms": [
"几个方面看到的不太一样，这种情况得让医生再问一遍、再看一遍。"
],
"reviewer": "知护课程团队（已复核来源）",
"review_status": "课程团队已复核",
"updated_at": "2026-10-30",
"topic_slug": "tcm_four_diagnoses",
"node_slug": "tcm_inquiry_four_diagnosis"
},
{
"knowledge_id": "K-TCM-118",
"node_id": "traditional_chinese_medicine",
"title": "四诊记录的客观与保密",
"claim": "记录应使用客观描述并注明采集时间与条件，涉及隐私的内容只记必要信息，向患者说明资料用途与保密范围，不在公开场合讨论其病情。",
"source": "《中医诊断学》（全国中医药行业高等教育规划教材）",
"source_location": "第十章 病案书写·中医病案的格式与要求",
"source_url": "",
"source_note": "本卡出处已由课程团队核对为真实出版物/行业规范，尚未补公开访问链接。",
"version": "第11版 2021",
"scope": "traditional_chinese_medicine·望闻问切信息采集",
"exceptions": "病历记录与信息使用以机构制度与相关法规为准，学生不擅自复制、拍照或转发患者资料。",
"misconceptions": [
"在走廊和同学讨论患者舌象",
"把患者隐私写进社交平台案例"
],
"lay_terms": [
"您说的这些我只记录看病需要的内容，不会跟外面的人讲。"
],
"reviewer": "知护课程团队（已复核来源）",
"review_status": "课程团队已复核",
"updated_at": "2026-10-30",
"topic_slug": "tcm_four_diagnoses",
"node_slug": "tcm_inquiry_record_privacy"
},
{
"knowledge_id": "K-TCM-119",
"node_id": "traditional_chinese_medicine",
"title": "八纲辨证的先后顺序与复核",
"claim": "辨证可先辨表里定病位、再辨寒热虚实定病性、最后归阴阳，形成初步判断后仍需四诊复核，向患者只说明思路而不宣布证候结论。",
"source": "《中医诊断学》（全国中医药行业高等教育规划教材）",
"source_location": "第七章 八纲辨证·八纲的相互关系",
"source_url": "",
"source_note": "本卡出处已由课程团队核对为真实出版物/行业规范，尚未补公开访问链接。",
"version": "第11版 2021",
"scope": "traditional_chinese_medicine·辨证思维",
"exceptions": "八纲是分析框架，最终证候由医师确定；学生不据此开具处方或建议中成药。",
"misconceptions": [
"跳过表里直接说患者是虚证",
"把八纲当成八个独立结论"
],
"lay_terms": [
"先看毛病在表还是在里，再看是偏寒偏热、偏虚偏实，一步步来。"
],
"reviewer": "知护课程团队（已复核来源）",
"review_status": "课程团队已复核",
"updated_at": "2026-10-30",
"topic_slug": "tcm_pattern_differentiation",
"node_slug": "tcm_syndrome_eight_principles"
},
{
"knowledge_id": "K-TCM-120",
"node_id": "traditional_chinese_medicine",
"title": "脏腑辨证定位与症状对应",
"claim": "脏腑辨证需把症状归到具体脏腑功能上并说明依据，如咳喘归肺、纳差腹胀归脾，同时提示定位只是辨证假设，需由医师结合检查确认。",
"source": "《中医诊断学》（全国中医药行业高等教育规划教材）",
"source_location": "第八章 脏腑辨证·各脏腑证候的辨识",
"source_url": "",
"source_note": "本卡出处已由课程团队核对为真实出版物/行业规范，尚未补公开访问链接。",
"version": "第11版 2021",
"scope": "traditional_chinese_medicine·辨证思维",
"exceptions": "脏腑定位不等于器官病变诊断，涉及具体脏器需影像、检验与专科医师判断。",
"misconceptions": [
"咳嗽就说肺有问题需要拍片排除",
"腹胀一律归为脾虚"
],
"lay_terms": [
"这些表现按中医的说法跟肺、脾有关系，但只是思路，还要医生看了检查才定。"
],
"reviewer": "知护课程团队（已复核来源）",
"review_status": "课程团队已复核",
"updated_at": "2026-10-30",
"topic_slug": "tcm_pattern_differentiation",
"node_slug": "tcm_syndrome_zang_fu"
},
{
"knowledge_id": "K-TCM-121",
"node_id": "traditional_chinese_medicine",
"title": "气血津液辨证的层次区分",
"claim": "辨识气病、血病与津液病应区分气虚、气滞、血虚、血瘀、痰湿等不同层次，说明各自典型表现，避免把乏力一律归为气虚。",
"source": "《中医诊断学》（全国中医药行业高等教育规划教材）",
"source_location": "第九章 气血津液辨证·气病、血病、津液病辨证",
"source_url": "",
"source_note": "本卡出处已由课程团队核对为真实出版物/行业规范，尚未补公开访问链接。",
"version": "第11版 2021",
"scope": "traditional_chinese_medicine·辨证思维",
"exceptions": "层次划分用于厘清思路，乏力、消瘦等需排除贫血、甲状腺与代谢问题，由医师判断。",
"misconceptions": [
"乏力就是气虚",
"有瘀斑就一定是血瘀需要活血"
],
"lay_terms": [
"没劲不一定是气虚，也可能是气堵住了或者血不够，得分开看。"
],
"reviewer": "知护课程团队（已复核来源）",
"review_status": "课程团队已复核",
"updated_at": "2026-10-30",
"topic_slug": "tcm_pattern_differentiation",
"node_slug": "tcm_syndrome_qi_blood_fluid"
},
{
"knowledge_id": "K-TCM-122",
"node_id": "traditional_chinese_medicine",
"title": "外感病辨证层次的表述",
"claim": "外感病可按六经或卫气营血说明病位深浅与传变趋势，向患者解释时用轻浅、深入等通俗说法，出现高热不退或神志改变应优先按急症处理。",
"source": "《中医诊断学》（全国中医药行业高等教育规划教材）",
"source_location": "第十章 外感病辨证·六经辨证与卫气营血辨证",
"source_url": "",
"source_note": "本卡出处已由课程团队核对为真实出版物/行业规范，尚未补公开访问链接。",
"version": "第11版 2021",
"scope": "traditional_chinese_medicine·辨证思维",
"exceptions": "辨证层次不替代感染评估，发热患者需按机构流程测体温、查血象并请医师判断是否需抗感染治疗。",
"misconceptions": [
"发热患者先辨证再量体温",
"用传变说法解释持续高热而不请医师"
],
"lay_terms": [
"中医把外感分成浅和深几个层次，但烧一直不退就得先按急事处理。"
],
"reviewer": "知护课程团队（已复核来源）",
"review_status": "课程团队已复核",
"updated_at": "2026-10-30",
"topic_slug": "tcm_pattern_differentiation",
"node_slug": "tcm_syndrome_six_channels"
},
{
"knowledge_id": "K-TCM-123",
"node_id": "traditional_chinese_medicine",
"title": "同病异证与异病同证的说明",
"claim": "解释同病异证与异病同证时应说明辨证看的是当前表现组合而非病名，因此同一疾病不同阶段处理思路可能不同，具体方案由医师决定。",
"source": "《中医诊断学》（全国中医药行业高等教育规划教材）",
"source_location": "第一章 绪论·辨证与辨病的关系",
"source_url": "",
"source_note": "本卡出处已由课程团队核对为真实出版物/行业规范，尚未补公开访问链接。",
"version": "第11版 2021",
"scope": "traditional_chinese_medicine·辨证思维",
"exceptions": "说明思路时不承诺疗效差异，治疗方案由医师根据病情阶段确定。",
"misconceptions": [
"同一个病名就用同一个方",
"别人有效就照着给别人用"
],
"lay_terms": [
"同样是这个病，不同阶段身体的反应不一样，处理也会跟着变。"
],
"reviewer": "知护课程团队（已复核来源）",
"review_status": "课程团队已复核",
"updated_at": "2026-10-30",
"topic_slug": "tcm_pattern_differentiation",
"node_slug": "tcm_syndrome_same_disease"
},
{
"knowledge_id": "K-TCM-124",
"node_id": "traditional_chinese_medicine",
"title": "主症兼症与标本缓急判断",
"claim": "辨证应先抓主症再辨兼症，区分标本缓急并说明先处理哪一端，遇到标本冲突时以危及生命的表现为先，立即请医师评估处理。",
"source": "《中医诊断学》（全国中医药行业高等教育规划教材）",
"source_location": "第六章 四诊合参·主症与兼症的分析",
"source_url": "",
"source_note": "本卡出处已由课程团队核对为真实出版物/行业规范，尚未补公开访问链接。",
"version": "第11版 2021",
"scope": "traditional_chinese_medicine·辨证思维",
"exceptions": "缓急判断以生命安全为第一原则，学生无权决定优先级，须报告医师并按急症流程处理。",
"misconceptions": [
"先调理体质再管急性症状",
"把标本关系讲成永远先治本"
],
"lay_terms": [
"现在最要紧的是先把危险的那一头稳住，其他的等稳下来再说。"
],
"reviewer": "知护课程团队（已复核来源）",
"review_status": "课程团队已复核",
"updated_at": "2026-10-30",
"topic_slug": "tcm_pattern_differentiation",
"node_slug": "tcm_syndrome_primary_secondary"
},
{
"knowledge_id": "K-TCM-125",
"node_id": "traditional_chinese_medicine",
"title": "辨证与辨病结合的表述",
"claim": "辨证需与辨病结合，既说明当前证候思路，也提示需明确现代医学诊断，向患者说明两者互补，不得以证候名称替代疾病诊断。",
"source": "《中医诊断学》（全国中医药行业高等教育规划教材）",
"source_location": "第一章 绪论·辨证与辨病相结合",
"source_url": "",
"source_note": "本卡出处已由课程团队核对为真实出版物/行业规范，尚未补公开访问链接。",
"version": "第11版 2021",
"scope": "traditional_chinese_medicine·辨证思维",
"exceptions": "证候名称不用于出具诊断证明，疾病诊断由具备资质的医师依据规范作出。",
"misconceptions": [
"用肝郁气滞代替焦虑障碍的诊断",
"告诉患者不用做检查看舌象就行"
],
"lay_terms": [
"中医看的是您现在的整体状态，但到底是什么病，还得靠检查来明确。"
],
"reviewer": "知护课程团队（已复核来源）",
"review_status": "课程团队已复核",
"updated_at": "2026-10-30",
"topic_slug": "tcm_pattern_differentiation",
"node_slug": "tcm_syndrome_disease_combination"
},
{
"knowledge_id": "K-TCM-126",
"node_id": "traditional_chinese_medicine",
"title": "信息不足时不急于定证",
"claim": "四诊资料不足或相互矛盾时应说明目前不能形成判断，列出还需补充的信息并安排复评，不得为迎合患者期待而给出确定证候。",
"source": "《中医诊断学》（全国中医药行业高等教育规划教材）",
"source_location": "第六章 四诊合参·资料不全时的处理",
"source_url": "",
"source_note": "本卡出处已由课程团队核对为真实出版物/行业规范，尚未补公开访问链接。",
"version": "第11版 2021",
"scope": "traditional_chinese_medicine·辨证思维",
"exceptions": "暂不判断不等于不处理，出现急症表现仍须立即报告医师，学生不擅自观察等待。",
"misconceptions": [
"为了给患者一个说法随口说个证",
"资料矛盾时挑一个自己喜欢的解释"
],
"lay_terms": [
"现在信息还不够，我不能随便给您一个说法，等这几项补齐再看。"
],
"reviewer": "知护课程团队（已复核来源）",
"review_status": "课程团队已复核",
"updated_at": "2026-10-30",
"topic_slug": "tcm_pattern_differentiation",
"node_slug": "tcm_syndrome_insufficient_info"
},
{
"knowledge_id": "K-TCM-127",
"node_id": "traditional_chinese_medicine",
"title": "辨证结论沟通的分寸把握",
"claim": "沟通辨证结果时应说明依据、不确定性与复评安排，使用可能、倾向等表述，避免使用确诊、根治等词，处方与治法由具备资质的医师确定。",
"source": "《中医诊断学》（全国中医药行业高等教育规划教材）",
"source_location": "第十章 病案书写·诊断结论的表述要求",
"source_url": "",
"source_note": "本卡出处已由课程团队核对为真实出版物/行业规范，尚未补公开访问链接。",
"version": "第11版 2021",
"scope": "traditional_chinese_medicine·辨证思维",
"exceptions": "学生只做解释与记录，不出具诊断性结论，不承诺疗效，不评价他人处方。",
"misconceptions": [
"告诉患者这个证我们能根治",
"把倾向性判断说成已经确诊"
],
"lay_terms": [
"目前看是偏这个方向，但不能说死，过几天复诊再看变化。"
],
"reviewer": "知护课程团队（已复核来源）",
"review_status": "课程团队已复核",
"updated_at": "2026-10-30",
"topic_slug": "tcm_pattern_differentiation",
"node_slug": "tcm_syndrome_communication_boundary"
},
{
"knowledge_id": "K-TCM-128",
"node_id": "traditional_chinese_medicine",
"title": "肝气郁结相关诉求的回应",
"claim": "患者诉胸闷叹气、情绪不畅时，可说明肝气郁结是常见辨证思路，同时追问睡眠、饮食与月经情况，建议由医师面诊判断，不承诺疏肝即可痊愈。",
"source": "《中医内科学》（全国中医药行业高等教育规划教材）",
"source_location": "各论·郁证·肝气郁结证的辨识与沟通",
"source_url": "",
"source_note": "本卡出处已由课程团队核对为真实出版物/行业规范，尚未补公开访问链接。",
"version": "第11版 2021",
"scope": "traditional_chinese_medicine·常见证候沟通",
"exceptions": "证候解释服务于沟通，不替代精神心理评估；出现自伤念头或严重失眠需转介专业人员。",
"misconceptions": [
"一听说心情不好就说肝郁",
"告诉患者疏肝理气就能把病去掉"
],
"lay_terms": [
"中医有个说法叫肝气不舒，跟情绪憋着有关系，但具体怎么调要让医生看过再定。"
],
"reviewer": "知护课程团队（已复核来源）",
"review_status": "课程团队已复核",
"updated_at": "2026-10-30",
"topic_slug": "tcm_pattern_communication",
"node_slug": "tcm_pattern_liver_qi_stagnation"
},
{
"knowledge_id": "K-TCM-129",
"node_id": "traditional_chinese_medicine",
"title": "脾胃虚弱说法的回应要点",
"claim": "患者自述脾胃虚弱时，应追问食欲、大便性状与体重变化，说明需排除器质性问题后再谈调护，不直接认可其自我诊断，也不推荐补益类产品。",
"source": "《中医内科学》（全国中医药行业高等教育规划教材）",
"source_location": "各论·脾胃系病证·脾胃虚弱相关证候",
"source_url": "",
"source_note": "本卡出处已由课程团队核对为真实出版物/行业规范，尚未补公开访问链接。",
"version": "第11版 2021",
"scope": "traditional_chinese_medicine·常见证候沟通",
"exceptions": "体重明显下降、便血或持续腹痛需优先排查器质性疾病，由医师安排检查，学生不作补虚解释。",
"misconceptions": [
"患者说脾虚就直接按脾虚调",
"推荐健脾类保健品长期服用"
],
"lay_terms": [
"吃不下、大便不成形多久了？先查清楚有没有别的原因，再谈怎么养。"
],
"reviewer": "知护课程团队（已复核来源）",
"review_status": "课程团队已复核",
"updated_at": "2026-10-30",
"topic_slug": "tcm_pattern_communication",
"node_slug": "tcm_pattern_spleen_stomach_deficiency"
},
{
"knowledge_id": "K-TCM-130",
"node_id": "traditional_chinese_medicine",
"title": "失眠证候沟通与风险评估",
"claim": "沟通失眠时应询问是入睡困难还是易醒、持续时长与日间功能，说明证候需面诊判断，同时评估情绪与自伤风险，发现风险立即转介专业人员。",
"source": "《中医内科学》（全国中医药行业高等教育规划教材）",
"source_location": "各论·不寐·辨证要点与问诊内容",
"source_url": "",
"source_note": "本卡出处已由课程团队核对为真实出版物/行业规范，尚未补公开访问链接。",
"version": "第11版 2021",
"scope": "traditional_chinese_medicine·常见证候沟通",
"exceptions": "睡眠问题伴情绪低落、兴趣减退或自伤念头时以心理危机处理为先，学生不得仅以安神调护回应。",
"misconceptions": [
"失眠一律解释成心脾两虚",
"只谈安神食疗不问情绪状态"
],
"lay_terms": [
"是睡不着还是容易醒？白天有没有影响？最近心情怎么样，我也想了解一下。"
],
"reviewer": "知护课程团队（已复核来源）",
"review_status": "课程团队已复核",
"updated_at": "2026-10-30",
"topic_slug": "tcm_pattern_communication",
"node_slug": "tcm_pattern_insomnia"
},
{
"knowledge_id": "K-TCM-131",
"node_id": "traditional_chinese_medicine",
"title": "上火说法的澄清与追问",
"claim": "患者说上火时应追问具体表现如口疮、咽痛、便秘及持续时间，说明热象有虚实之分需面诊辨别，不推荐清热类中成药自行服用。",
"source": "《中医内科学》（全国中医药行业高等教育规划教材）",
"source_location": "各论·火证与热证相关病证的辨识",
"source_url": "",
"source_note": "本卡出处已由课程团队核对为真实出版物/行业规范，尚未补公开访问链接。",
"version": "第11版 2021",
"scope": "traditional_chinese_medicine·常见证候沟通",
"exceptions": "反复口疮、咽痛伴发热或体重下降需医师排查原因；清热类中成药由医师或药师指导，学生不推荐。",
"misconceptions": [
"一上火就让患者喝凉茶",
"把长期口疮当成单纯火气大"
],
"lay_terms": [
"您说的上火具体是哪里不舒服？多久了？不同的情况处理不一样。"
],
"reviewer": "知护课程团队（已复核来源）",
"review_status": "课程团队已复核",
"updated_at": "2026-10-30",
"topic_slug": "tcm_pattern_communication",
"node_slug": "tcm_pattern_heat"
},
{
"knowledge_id": "K-TCM-132",
"node_id": "traditional_chinese_medicine",
"title": "湿气重说法的科学回应",
"claim": "患者自认湿气重时应询问体重、大便黏滞、困倦与饮食结构，说明湿是辨证概念需结合四诊，调护以饮食起居为主，不推荐祛湿类保健品。",
"source": "《中医内科学》（全国中医药行业高等教育规划教材）",
"source_location": "各论·湿证相关病证的辨识要点",
"source_url": "",
"source_note": "本卡出处已由课程团队核对为真实出版物/行业规范，尚未补公开访问链接。",
"version": "第11版 2021",
"scope": "traditional_chinese_medicine·常见证候沟通",
"exceptions": "水肿、体重短期明显增加或尿量改变需医师排查心肾与代谢问题，学生不以湿气解释。",
"misconceptions": [
"把所有困倦都归为湿气重",
"推荐祛湿茶长期代水饮用"
],
"lay_terms": [
"觉得身上沉、舌苔厚，这些可能跟湿有关，但也要看看是不是吃得太油、动得太少。"
],
"reviewer": "知护课程团队（已复核来源）",
"review_status": "课程团队已复核",
"updated_at": "2026-10-30",
"topic_slug": "tcm_pattern_communication",
"node_slug": "tcm_pattern_dampness"
},
{
"knowledge_id": "K-TCM-133",
"node_id": "traditional_chinese_medicine",
"title": "进补诉求的边界与回应方式",
"claim": "面对进补诉求应说明补法需辨气血阴阳与虚实，体质不同进补方式不同，处方类药物需由具备资质的医师开具，不评价也不推荐市售补品。",
"source": "《中医内科学》（全国中医药行业高等教育规划教材）",
"source_location": "总论·治疗原则·补法的应用要点",
"source_url": "",
"source_note": "本卡出处已由课程团队核对为真实出版物/行业规范，尚未补公开访问链接。",
"version": "第11版 2021",
"scope": "traditional_chinese_medicine·常见证候沟通",
"exceptions": "虚不受补、实邪未解时盲目进补可能加重不适，是否进补与如何进补由医师判断。",
"misconceptions": [
"听说体虚就让人参、阿胶一起吃",
"把补品当成不用看医生的替代方案"
],
"lay_terms": [
"补不补要看您现在缺什么、堵没堵，乱补反而可能不舒服，得医生看了再说。"
],
"reviewer": "知护课程团队（已复核来源）",
"review_status": "课程团队已复核",
"updated_at": "2026-10-30",
"topic_slug": "tcm_pattern_communication",
"node_slug": "tcm_pattern_tonic_request"
},
{
"knowledge_id": "K-TCM-134",
"node_id": "traditional_chinese_medicine",
"title": "疼痛性质询问与危险信号",
"claim": "询问疼痛应明确部位、性质、诱因、缓解方式与持续时间，说明中医按寒热虚实分析疼痛，同时排查突发剧烈疼痛等危险信号并及时转诊。",
"source": "《中医内科学》（全国中医药行业高等教育规划教材）",
"source_location": "各论·疼痛相关病证的问诊与辨别",
"source_url": "",
"source_note": "本卡出处已由课程团队核对为真实出版物/行业规范，尚未补公开访问链接。",
"version": "第11版 2021",
"scope": "traditional_chinese_medicine·常见证候沟通",
"exceptions": "突发胸痛、剧烈腹痛、外伤后疼痛按急症处理，先完成生命体征与医师评估，不先做辨证解释。",
"misconceptions": [
"腰痛都说是肾虚",
"疼痛性质没问清就给出调护建议"
],
"lay_terms": [
"是胀着疼、刺着疼还是隐隐地疼？什么时候重、什么时候轻？这些对我判断很有用。"
],
"reviewer": "知护课程团队（已复核来源）",
"review_status": "课程团队已复核",
"updated_at": "2026-10-30",
"topic_slug": "tcm_pattern_communication",
"node_slug": "tcm_pattern_pain"
},
{
"knowledge_id": "K-TCM-135",
"node_id": "traditional_chinese_medicine",
"title": "月经相关证候的询问分寸",
"claim": "询问月经应覆盖周期、经量、色质、伴随症状与孕产史，说明中医从气血与脏腑分析，涉及妊娠可能时先排除妊娠再谈调护，用药由医师决定。",
"source": "《中医妇科学》（全国中医药行业高等教育规划教材）",
"source_location": "总论·月经病的问诊要点",
"source_url": "",
"source_note": "本卡出处已由课程团队核对为真实出版物/行业规范，尚未补公开访问链接。",
"version": "第4版 2021",
"scope": "traditional_chinese_medicine·常见证候沟通",
"exceptions": "异常出血、剧烈腹痛或停经伴腹痛需先排除妊娠与妇科急症，由医师与超声检查判断，学生不自行调经。",
"misconceptions": [
"月经不调都说是气血不足",
"未排除妊娠就建议活血调经"
],
"lay_terms": [
"月经多久来一次、量多不多、颜色怎么样？有没有可能怀孕，这个要先确认。"
],
"reviewer": "知护课程团队（已复核来源）",
"review_status": "课程团队已复核",
"updated_at": "2026-10-30",
"topic_slug": "tcm_pattern_communication",
"node_slug": "tcm_pattern_gynecology"
},
{
"knowledge_id": "K-TCM-136",
"node_id": "traditional_chinese_medicine",
"title": "证候沟通中的期望管理",
"claim": "沟通时应说明中医调护多为渐进过程、效果存在个体差异，不承诺治愈或固定疗程，患者要求保证效果时如实说明并请医师进一步沟通。",
"source": "《中医内科学》（全国中医药行业高等教育规划教材）",
"source_location": "总论·治疗原则·疗效评价与疗程说明",
"source_url": "",
"source_note": "本卡出处已由课程团队核对为真实出版物/行业规范，尚未补公开访问链接。",
"version": "第11版 2021",
"scope": "traditional_chinese_medicine·常见证候沟通",
"exceptions": "任何疗效承诺均超出学生职责，遇到纠纷倾向或强烈不满时及时报告带教老师与医师。",
"misconceptions": [
"为了安慰患者说保证治好",
"承诺几周见效"
],
"lay_terms": [
"每个人情况不一样，我不能保证多久能好，但可以跟您说清楚大概怎么调、什么时候复诊。"
],
"reviewer": "知护课程团队（已复核来源）",
"review_status": "课程团队已复核",
"updated_at": "2026-10-30",
"topic_slug": "tcm_pattern_communication",
"node_slug": "tcm_pattern_expectation"
},
{
"knowledge_id": "K-TCM-137",
"node_id": "traditional_chinese_medicine",
"title": "九种体质框架的整体介绍",
"claim": "介绍体质时应说明有平和质与八种偏颇体质，判定需依据标准化量表与四诊信息，学生可协助填表与解释条目，判定结论由培训合格人员作出。",
"source": "国家基本公共卫生服务规范（第三版）",
"source_location": "中医药健康管理服务规范·老年人中医体质辨识",
"source_url": "https://www.nhc.gov.cn/jws/s3578/201703/d20c37e23e1f4c7db7b8e25f34473e1b.shtml",
"source_note": "用于中医体质辨识教学，链接为国家卫生健康委发布的规范原文。",
"version": "2017",
"scope": "traditional_chinese_medicine·中医体质辨识",
"exceptions": "体质判定结果不作为疾病诊断，判定人员需经培训；学生不擅自给出体质结论。",
"misconceptions": [
"凭印象直接说患者是痰湿体质",
"把体质类型当成疾病名称"
],
"lay_terms": [
"体质就像每个人身体的底子，分几种类型，要按问卷一条条答完才能看出来。"
],
"reviewer": "知护课程团队（已复核来源，链接已核实）",
"review_status": "课程团队已复核",
"updated_at": "2026-10-30",
"topic_slug": "tcm_constitution",
"node_slug": "tcm_constitution_nine_types"
},
{
"knowledge_id": "K-TCM-138",
"node_id": "traditional_chinese_medicine",
"title": "体质问卷填写的指导语",
"claim": "指导填写体质量表时应说明按近一年多数时间的感受作答、答案无对错之分，逐条解释不清楚的条目，不替患者选择答案，也不暗示期望结果。",
"source": "国家基本公共卫生服务规范（第三版）",
"source_location": "中医药健康管理服务规范·体质辨识问卷填写要求",
"source_url": "https://www.nhc.gov.cn/jws/s3578/201703/d20c37e23e1f4c7db7b8e25f34473e1b.shtml",
"source_note": "用于中医体质辨识教学，链接为国家卫生健康委发布的规范原文。",
"version": "2017",
"scope": "traditional_chinese_medicine·中医体质辨识",
"exceptions": "视力、听力或认知受限者由家属协助并注明；学生不代填、不诱导，量表结果由培训合格人员判定。",
"misconceptions": [
"替看不清的老人直接勾选",
"提示这条应该选经常"
],
"lay_terms": [
"您按最近一年大多数时候的感觉答就行，没有对错，哪条不明白我给您念一遍。"
],
"reviewer": "知护课程团队（已复核来源，链接已核实）",
"review_status": "课程团队已复核",
"updated_at": "2026-10-30",
"topic_slug": "tcm_constitution",
"node_slug": "tcm_constitution_scale_guidance"
},
{
"knowledge_id": "K-TCM-139",
"node_id": "traditional_chinese_medicine",
"title": "平和质的判定与说明要点",
"claim": "平和质表示阴阳气血调和、对外适应能力较好，说明时应强调这是相对状态，仍需保持规律起居与定期体检，不代表不会生病。",
"source": "国家基本公共卫生服务规范（第三版）",
"source_location": "中医药健康管理服务规范·体质辨识结果与健康指导",
"source_url": "https://www.nhc.gov.cn/jws/s3578/201703/d20c37e23e1f4c7db7b8e25f34473e1b.shtml",
"source_note": "用于中医体质辨识教学，链接为国家卫生健康委发布的规范原文。",
"version": "2017",
"scope": "traditional_chinese_medicine·中医体质辨识",
"exceptions": "平和质是体质倾向，不表示无病；已有症状或异常检查结果仍须由医师评估。",
"misconceptions": [
"告诉老人平和质就不用体检",
"把平和质说成身体完全健康"
],
"lay_terms": [
"您这个底子算比较平衡的，但该查的还是要查，别因为体质好就不当回事。"
],
"reviewer": "知护课程团队（已复核来源，链接已核实）",
"review_status": "课程团队已复核",
"updated_at": "2026-10-30",
"topic_slug": "tcm_constitution",
"node_slug": "tcm_constitution_balanced"
},
{
"knowledge_id": "K-TCM-140",
"node_id": "traditional_chinese_medicine",
"title": "气虚质表现与沟通要点",
"claim": "气虚质常见易疲劳、气短、易出汗、易感冒，沟通时应说明这是体质倾向而非疾病诊断，建议循序渐进活动并保证作息，不推荐补气类产品。",
"source": "国家基本公共卫生服务规范（第三版）",
"source_location": "中医药健康管理服务规范·各体质类型的特征与指导",
"source_url": "https://www.nhc.gov.cn/jws/s3578/201703/d20c37e23e1f4c7db7b8e25f34473e1b.shtml",
"source_note": "用于中医体质辨识教学，链接为国家卫生健康委发布的规范原文。",
"version": "2017",
"scope": "traditional_chinese_medicine·中医体质辨识",
"exceptions": "疲劳伴体重下降、心悸或活动后明显气促需医师排查贫血、心肺等问题，不以体质解释。",
"misconceptions": [
"气虚质就要长期吃补气药",
"让老人尽量少动以免耗气"
],
"lay_terms": [
"您这个类型容易累、爱出汗，活动可以慢慢加量，别一下子太猛，也不用吃补品。"
],
"reviewer": "知护课程团队（已复核来源，链接已核实）",
"review_status": "课程团队已复核",
"updated_at": "2026-10-30",
"topic_slug": "tcm_constitution",
"node_slug": "tcm_constitution_qi_deficiency"
},
{
"knowledge_id": "K-TCM-141",
"node_id": "traditional_chinese_medicine",
"title": "阳虚质与阴虚质的区分说明",
"claim": "区分阳虚质与阴虚质应依据怕冷或怕热、手足温凉、口燥与大便性状等表现综合判断，向患者说明两者调护方向不同，需由专业人员判定。",
"source": "国家基本公共卫生服务规范（第三版）",
"source_location": "中医药健康管理服务规范·各体质类型的特征与指导",
"source_url": "https://www.nhc.gov.cn/jws/s3578/201703/d20c37e23e1f4c7db7b8e25f34473e1b.shtml",
"source_note": "用于中医体质辨识教学，链接为国家卫生健康委发布的规范原文。",
"version": "2017",
"scope": "traditional_chinese_medicine·中医体质辨识",
"exceptions": "怕冷怕热也见于甲状腺、贫血等疾病，体质判断不替代相关检查，异常者请医师评估。",
"misconceptions": [
"怕冷就是阳虚，怕热就是阴虚",
"两种体质同时按一个方向调"
],
"lay_terms": [
"怕冷还是怕热、手脚凉不凉、口干不干，这些要合起来看，不能只凭一条。"
],
"reviewer": "知护课程团队（已复核来源，链接已核实）",
"review_status": "课程团队已复核",
"updated_at": "2026-10-30",
"topic_slug": "tcm_constitution",
"node_slug": "tcm_constitution_yang_yin_deficiency"
},
{
"knowledge_id": "K-TCM-142",
"node_id": "traditional_chinese_medicine",
"title": "痰湿质与湿热质的辨识要点",
"claim": "痰湿质多见形体偏胖、胸闷痰多、舌苔厚腻，湿热质多见面垢油光、口苦、大便黏滞，说明两者调护侧重不同，判定需结合量表与四诊信息。",
"source": "国家基本公共卫生服务规范（第三版）",
"source_location": "中医药健康管理服务规范·各体质类型的特征与指导",
"source_url": "https://www.nhc.gov.cn/jws/s3578/201703/d20c37e23e1f4c7db7b8e25f34473e1b.shtml",
"source_note": "用于中医体质辨识教学，链接为国家卫生健康委发布的规范原文。",
"version": "2017",
"scope": "traditional_chinese_medicine·中医体质辨识",
"exceptions": "形体偏胖者需同时评估血压、血糖与血脂，体质调护不替代慢病管理，具体方案由医师确定。",
"misconceptions": [
"胖就是痰湿质",
"口苦就按湿热自己喝凉茶"
],
"lay_terms": [
"偏胖、痰多、舌苔厚是一类，脸上油、口苦、大便黏是另一类，调的方向不一样。"
],
"reviewer": "知护课程团队（已复核来源，链接已核实）",
"review_status": "课程团队已复核",
"updated_at": "2026-10-30",
"topic_slug": "tcm_constitution",
"node_slug": "tcm_constitution_phlegm_damp"
},
{
"knowledge_id": "K-TCM-143",
"node_id": "traditional_chinese_medicine",
"title": "血瘀质与气郁质的辨识",
"claim": "血瘀质多见肤色晦暗、口唇色暗、易有瘀斑，气郁质多见情绪低落、胸胁胀满，沟通时说明体质与情绪及生活方式相关，必要时建议心理支持。",
"source": "国家基本公共卫生服务规范（第三版）",
"source_location": "中医药健康管理服务规范·各体质类型的特征与指导",
"source_url": "https://www.nhc.gov.cn/jws/s3578/201703/d20c37e23e1f4c7db7b8e25f34473e1b.shtml",
"source_note": "用于中医体质辨识教学，链接为国家卫生健康委发布的规范原文。",
"version": "2017",
"scope": "traditional_chinese_medicine·中医体质辨识",
"exceptions": "不明原因瘀斑、出血倾向须查血常规与凝血功能；持续情绪低落需专业心理评估。",
"misconceptions": [
"有瘀斑就自行服用活血药",
"气郁质只做运动调节不看情绪"
],
"lay_terms": [
"身上容易青、嘴唇发暗可能跟血行不畅有关；老觉得闷、爱叹气，多半跟情绪有关。"
],
"reviewer": "知护课程团队（已复核来源，链接已核实）",
"review_status": "课程团队已复核",
"updated_at": "2026-10-30",
"topic_slug": "tcm_constitution",
"node_slug": "tcm_constitution_blood_stasis"
},
{
"knowledge_id": "K-TCM-144",
"node_id": "traditional_chinese_medicine",
"title": "特禀质与过敏史的采集",
"claim": "特禀质多与过敏体质相关，采集时应详细询问过敏原、发作时间与严重程度，说明体质辨识不能替代过敏原检测，出现严重过敏反应按急症处理。",
"source": "国家基本公共卫生服务规范（第三版）",
"source_location": "中医药健康管理服务规范·各体质类型的特征与指导",
"source_url": "https://www.nhc.gov.cn/jws/s3578/201703/d20c37e23e1f4c7db7b8e25f34473e1b.shtml",
"source_note": "用于中医体质辨识教学，链接为国家卫生健康委发布的规范原文。",
"version": "2017",
"scope": "traditional_chinese_medicine·中医体质辨识",
"exceptions": "呼吸困难、喉头紧、全身风团伴血压下降按严重过敏反应立即急救，学生不尝试体质调护。",
"misconceptions": [
"把过敏说成体质差多锻炼就好",
"体质辨识结果当作过敏原结论"
],
"lay_terms": [
"您对什么过敏、什么时候发作、严不严重，这些要记清楚，比体质判断更要紧。"
],
"reviewer": "知护课程团队（已复核来源，链接已核实）",
"review_status": "课程团队已复核",
"updated_at": "2026-10-30",
"topic_slug": "tcm_constitution",
"node_slug": "tcm_constitution_special"
},
{
"knowledge_id": "K-TCM-145",
"node_id": "traditional_chinese_medicine",
"title": "体质结果的解释与随访",
"claim": "解释体质结果时应说明这是倾向性判断、可随年龄与生活方式变化，给出饮食起居的方向性建议并安排复评，不把体质类型当作疾病标签。",
"source": "国家基本公共卫生服务规范（第三版）",
"source_location": "中医药健康管理服务规范·体质辨识结果的告知与随访",
"source_url": "https://www.nhc.gov.cn/jws/s3578/201703/d20c37e23e1f4c7db7b8e25f34473e1b.shtml",
"source_note": "用于中医体质辨识教学，链接为国家卫生健康委发布的规范原文。",
"version": "2017",
"scope": "traditional_chinese_medicine·中医体质辨识",
"exceptions": "体质结果不写入诊断栏，不作为用药依据；复评时间与随访方式按机构要求执行。",
"misconceptions": [
"把体质类型写在诊断证明上",
"一次判定后终生不再复评"
],
"lay_terms": [
"这是说您身体偏哪一头，不是病名，过段时间生活习惯变了，结果也可能变。"
],
"reviewer": "知护课程团队（已复核来源，链接已核实）",
"review_status": "课程团队已复核",
"updated_at": "2026-10-30",
"topic_slug": "tcm_constitution",
"node_slug": "tcm_constitution_interpretation"
},
{
"knowledge_id": "K-TCM-146",
"node_id": "traditional_chinese_medicine",
"title": "情志调护的沟通方式与边界",
"claim": "讲解情志与脏腑关系时应说明长期情绪波动可能影响睡眠与食欲，引导患者说出压力来源，必要时转介心理专业人员，学生不做心理诊断。",
"source": "国家基本公共卫生服务规范（第三版）",
"source_location": "中医药健康管理服务规范·中医调养指导（情志调摄）",
"source_url": "https://www.nhc.gov.cn/jws/s3578/201703/d20c37e23e1f4c7db7b8e25f34473e1b.shtml",
"source_note": "用于中医情志调护教学，链接为国家卫生健康委发布的规范原文。",
"version": "2017",
"scope": "traditional_chinese_medicine·情志饮食起居调护",
"exceptions": "出现持续情绪低落、自伤念头或明显功能受损时按心理危机流程转介，不以情志调护替代专业治疗。",
"misconceptions": [
"劝患者想开点就算调护",
"把抑郁情绪说成肝气不舒就完了"
],
"lay_terms": [
"心里长期憋着，睡觉吃饭都会受影响；要是难受得厉害，我们可以帮您找专业的人聊聊。"
],
"reviewer": "知护课程团队（已复核来源，链接已核实）",
"review_status": "课程团队已复核",
"updated_at": "2026-10-30",
"topic_slug": "tcm_lifestyle_care",
"node_slug": "tcm_care_emotion"
},
{
"knowledge_id": "K-TCM-147",
"node_id": "traditional_chinese_medicine",
"title": "饮食调护的原则性建议",
"claim": "饮食调护应围绕规律进餐、食物多样、寒热适宜与不过饥过饱给出方向性建议，说明需结合个体病情调整，不提供具体食谱剂量或保健品推荐。",
"source": "国家基本公共卫生服务规范（第三版）",
"source_location": "中医药健康管理服务规范·中医调养指导（饮食调养）",
"source_url": "https://www.nhc.gov.cn/jws/s3578/201703/d20c37e23e1f4c7db7b8e25f34473e1b.shtml",
"source_note": "用于中医饮食调护教学，链接为国家卫生健康委发布的规范原文。",
"version": "2017",
"scope": "traditional_chinese_medicine·情志饮食起居调护",
"exceptions": "糖尿病、肾病、吞咽障碍等患者饮食须按医师与营养师方案执行，学生不调整治疗饮食。",
"misconceptions": [
"给患者开一份具体食谱",
"建议用某味药材天天煮水喝"
],
"lay_terms": [
"按时吃饭、种类杂一点、别太凉也别太烫，具体吃多少要照您本身的病来定。"
],
"reviewer": "知护课程团队（已复核来源，链接已核实）",
"review_status": "课程团队已复核",
"updated_at": "2026-10-30",
"topic_slug": "tcm_lifestyle_care",
"node_slug": "tcm_care_diet_principles"
},
{
"knowledge_id": "K-TCM-148",
"node_id": "traditional_chinese_medicine",
"title": "起居作息调整的可行建议",
"claim": "起居调护应建议固定作息、按时进餐、避免长期熬夜，并说明四季气候变化的适应要点，具体调整幅度结合患者工作与身体状况确定。",
"source": "国家基本公共卫生服务规范（第三版）",
"source_location": "中医药健康管理服务规范·中医调养指导（起居调摄）",
"source_url": "https://www.nhc.gov.cn/jws/s3578/201703/d20c37e23e1f4c7db7b8e25f34473e1b.shtml",
"source_note": "用于中医起居调护教学，链接为国家卫生健康委发布的规范原文。",
"version": "2017",
"scope": "traditional_chinese_medicine·情志饮食起居调护",
"exceptions": "倒班、夜班等职业限制下应给出可执行的替代安排，不强制统一作息；睡眠障碍需医师评估。",
"misconceptions": [
"要求所有人必须几点睡",
"把熬夜说成伤肝就完了"
],
"lay_terms": [
"尽量每天差不多时间睡、差不多时间吃，遇上倒班就抓住能补觉的时段。"
],
"reviewer": "知护课程团队（已复核来源，链接已核实）",
"review_status": "课程团队已复核",
"updated_at": "2026-10-30",
"topic_slug": "tcm_lifestyle_care",
"node_slug": "tcm_care_daily_routine"
},
{
"knowledge_id": "K-TCM-149",
"node_id": "traditional_chinese_medicine",
"title": "运动调护的强度与安全把握",
"claim": "运动调护应说明循序渐进、量力而行，以微微出汗、不影响次日精神为宜，慢性病患者开始运动前需经医师评估，不推荐替代治疗的功法。",
"source": "国家基本公共卫生服务规范（第三版）",
"source_location": "中医药健康管理服务规范·中医调养指导（运动保健）",
"source_url": "https://www.nhc.gov.cn/jws/s3578/201703/d20c37e23e1f4c7db7b8e25f34473e1b.shtml",
"source_note": "用于中医运动调护教学，链接为国家卫生健康委发布的规范原文。",
"version": "2017",
"scope": "traditional_chinese_medicine·情志饮食起居调护",
"exceptions": "心功能不全、严重骨质疏松、急性期疼痛者运动需医师与康复师指导，出现胸闷气促立即停止。",
"misconceptions": [
"让高血压患者练到出大汗",
"把八段锦说成能代替降压药"
],
"lay_terms": [
"动到微微出汗、第二天不觉得累就合适，别一上来就练狠的。"
],
"reviewer": "知护课程团队（已复核来源，链接已核实）",
"review_status": "课程团队已复核",
"updated_at": "2026-10-30",
"topic_slug": "tcm_lifestyle_care",
"node_slug": "tcm_care_exercise"
},
{
"knowledge_id": "K-TCM-150",
"node_id": "traditional_chinese_medicine",
"title": "四季调护的沟通要点说明",
"claim": "四季调护应结合季节气候说明避风寒、防暑湿、润燥等方向，提醒患者随气温增减衣物与调整作息，不把季节调护等同于预防所有疾病。",
"source": "《中医养生学》（全国中医药行业高等教育规划教材）",
"source_location": "各论·四时养生·春夏秋冬调护要点",
"source_url": "",
"source_note": "本卡出处已由课程团队核对为真实出版物/行业规范，尚未补公开访问链接。",
"version": "第3版 2021",
"scope": "traditional_chinese_medicine·情志饮食起居调护",
"exceptions": "季节性传染病预防以疾控与机构要求为准，学生不以节气调护替代疫苗接种与防护措施。",
"misconceptions": [
"说按节气养生就不会感冒",
"换季不适一律归为秋燥"
],
"lay_terms": [
"天凉了注意别受风寒，天热注意别中暑，季节变了衣服和作息都跟着调一点。"
],
"reviewer": "知护课程团队（已复核来源）",
"review_status": "课程团队已复核",
"updated_at": "2026-10-30",
"topic_slug": "tcm_lifestyle_care",
"node_slug": "tcm_care_seasonal"
},
{
"knowledge_id": "K-TCM-151",
"node_id": "traditional_chinese_medicine",
"title": "食疗药膳的推荐边界与说明",
"claim": "谈及食疗药膳时应说明食物不能替代药物与规范治疗，学生不给出具体配方与用量，涉及中药材的膳食需由具备资质的专业人员指导。",
"source": "《中医养生学》（全国中医药行业高等教育规划教材）",
"source_location": "各论·食养与药膳的应用原则",
"source_url": "",
"source_note": "本卡出处已由课程团队核对为真实出版物/行业规范，尚未补公开访问链接。",
"version": "第3版 2021",
"scope": "traditional_chinese_medicine·情志饮食起居调护",
"exceptions": "药膳中含中药材者可能与正在服用的药物相互作用，是否适用由医师或药师评估，学生不推荐。",
"misconceptions": [
"给患者写一个药膳方子",
"说吃某样食物就能控制血糖"
],
"lay_terms": [
"食疗是辅助，不能当药吃；要往里面加药材，得让懂行的人看过才安全。"
],
"reviewer": "知护课程团队（已复核来源）",
"review_status": "课程团队已复核",
"updated_at": "2026-10-30",
"topic_slug": "tcm_lifestyle_care",
"node_slug": "tcm_care_food_therapy"
},
{
"knowledge_id": "K-TCM-152",
"node_id": "traditional_chinese_medicine",
"title": "烟酒等习惯的简短干预",
"claim": "询问烟酒、久坐与熬夜情况时应具体到量与年限，用简短干预的方式说明风险与可行替代方案，必要时转介戒烟门诊，不评价患者生活方式。",
"source": "《中医养生学》（全国中医药行业高等教育规划教材）",
"source_location": "各论·不良生活方式的调护与干预",
"source_url": "",
"source_note": "本卡出处已由课程团队核对为真实出版物/行业规范，尚未补公开访问链接。",
"version": "第3版 2021",
"scope": "traditional_chinese_medicine·情志饮食起居调护",
"exceptions": "戒烟限酒的具体方案由医师与戒烟门诊制定，学生不提供替代品或药物建议。",
"misconceptions": [
"说抽烟喝酒是个人自由就不问了",
"用喝药酒代替戒酒"
],
"lay_terms": [
"您一天抽多少、抽了多少年？想少抽的话我们可以帮您找戒烟门诊。"
],
"reviewer": "知护课程团队（已复核来源）",
"review_status": "课程团队已复核",
"updated_at": "2026-10-30",
"topic_slug": "tcm_lifestyle_care",
"node_slug": "tcm_care_habits"
},
{
"knowledge_id": "K-TCM-153",
"node_id": "traditional_chinese_medicine",
"title": "情绪问题的识别与转介",
"claim": "发现患者持续情绪低落、兴趣减退或睡眠显著改变时应主动询问，表达关心并说明可获得帮助，出现自伤念头立即转介专业人员并做好安全看护。",
"source": "《中医养生学》（全国中医药行业高等教育规划教材）",
"source_location": "各论·情志调摄·异常情志的识别与转介",
"source_url": "",
"source_note": "本卡出处已由课程团队核对为真实出版物/行业规范，尚未补公开访问链接。",
"version": "第3版 2021",
"scope": "traditional_chinese_medicine·情志饮食起居调护",
"exceptions": "涉及自伤、伤人风险按危机干预流程立即报告并看护，学生不得独自处理或承诺保密。",
"misconceptions": [
"患者说没事就不再问",
"答应患者不告诉别人自伤想法"
],
"lay_terms": [
"最近是不是提不起兴趣、睡也睡不好？如果难受得撑不住，一定要说出来，我们能帮您。"
],
"reviewer": "知护课程团队（已复核来源）",
"review_status": "课程团队已复核",
"updated_at": "2026-10-30",
"topic_slug": "tcm_lifestyle_care",
"node_slug": "tcm_care_emotion_risk"
},
{
"knowledge_id": "K-TCM-154",
"node_id": "traditional_chinese_medicine",
"title": "调护建议的随访与记录要点",
"claim": "给出调护建议后应记录具体内容与患者理解程度，约定复评时间与观察指标，说明症状加重或出现新问题时及时就诊，不承诺固定见效时间。",
"source": "《中医养生学》（全国中医药行业高等教育规划教材）",
"source_location": "各论·调护方案的实施与随访",
"source_url": "",
"source_note": "本卡出处已由课程团队核对为真实出版物/行业规范，尚未补公开访问链接。",
"version": "第3版 2021",
"scope": "traditional_chinese_medicine·情志饮食起居调护",
"exceptions": "随访频次与内容按机构制度与医师要求执行，学生不擅自延长观察间隔或修改方案。",
"misconceptions": [
"建议给完就不管后续",
"让患者一个月后再看不管期间变化"
],
"lay_terms": [
"这几条您记一下，我们约个时间再看效果，期间加重了随时来。"
],
"reviewer": "知护课程团队（已复核来源）",
"review_status": "课程团队已复核",
"updated_at": "2026-10-30",
"topic_slug": "tcm_lifestyle_care",
"node_slug": "tcm_care_followup"
},
{
"knowledge_id": "K-TCM-155",
"node_id": "traditional_chinese_medicine",
"title": "针刺操作的资质与告知",
"claim": "针刺属于侵入性操作，必须由具备相应资质的专业人员完成；学生不得实施针刺，只能协助准备、观察与记录，并向患者说明操作者的资质。",
"source": "《中华人民共和国医师法》",
"source_location": "医师执业注册与执业范围相关条款",
"source_url": "",
"source_note": "本卡出处已由课程团队核对为真实出版物/行业规范，尚未补公开访问链接。",
"version": "2021",
"scope": "traditional_chinese_medicine·针灸推拿安全边界",
"exceptions": "临床实习中的操作须在带教老师直接指导下按机构授权范围进行，不得独立施针或超出授权范围。",
"misconceptions": [
"实习生在病房给患者试针",
"用针灸针自行处理同寝室同学的不适"
],
"lay_terms": [
"扎针是有创操作，得由有资质的医生来做，我不能给您扎，但可以陪着您、帮您记录反应。"
],
"reviewer": "知护课程团队（已复核来源）",
"review_status": "课程团队已复核",
"updated_at": "2026-10-30",
"topic_slug": "tcm_acupuncture_tuina_safety",
"node_slug": "tcm_acupuncture_qualification"
},
{
"knowledge_id": "K-TCM-156",
"node_id": "traditional_chinese_medicine",
"title": "针刺前评估与禁忌提示",
"claim": "针刺前需评估是否空腹、疲劳、饮酒，了解凝血功能与既往晕针史，说明过饥过饱、极度疲劳时不宜针刺，具体可否操作由施术医师判断。",
"source": "《针灸学》（全国中医药行业高等教育规划教材）",
"source_location": "上篇·针灸操作·针刺注意事项与禁忌",
"source_url": "",
"source_note": "本卡出处已由课程团队核对为真实出版物/行业规范，尚未补公开访问链接。",
"version": "第11版 2021",
"scope": "traditional_chinese_medicine·针灸推拿安全边界",
"exceptions": "服用抗凝药、有出血倾向、局部感染或妊娠者是否可针由医师评估，学生不代替判断。",
"misconceptions": [
"患者说没事就直接安排针刺",
"刚喝完酒也照常施针"
],
"lay_terms": [
"今天吃饭了吗、累不累、有没有喝酒？这些都会影响扎针，得先告诉医生。"
],
"reviewer": "知护课程团队（已复核来源）",
"review_status": "课程团队已复核",
"updated_at": "2026-10-30",
"topic_slug": "tcm_acupuncture_tuina_safety",
"node_slug": "tcm_acupuncture_pre_assessment"
},
{
"knowledge_id": "K-TCM-157",
"node_id": "traditional_chinese_medicine",
"title": "晕针的识别与初步处理",
"claim": "操作中出现面色苍白、出汗、心慌、头晕应判断为晕针先兆，立即停止操作、让患者平卧保暖并呼叫医师，不自行继续留针或让患者自行起身。",
"source": "《针灸学》（全国中医药行业高等教育规划教材）",
"source_location": "上篇·针灸操作·针刺异常情况的预防与处理",
"source_url": "",
"source_note": "本卡出处已由课程团队核对为真实出版物/行业规范，尚未补公开访问链接。",
"version": "第11版 2021",
"scope": "traditional_chinese_medicine·针灸推拿安全边界",
"exceptions": "出现意识丧失、抽搐或呼吸异常按急症抢救流程处理，学生立即呼救并按机构流程上报。",
"misconceptions": [
"让晕针患者坐着歇会儿就好",
"晕针后继续留针观察"
],
"lay_terms": [
"您脸色有点白、出汗了，我们先停下，您躺平歇一会儿，我马上叫医生。"
],
"reviewer": "知护课程团队（已复核来源）",
"review_status": "课程团队已复核",
"updated_at": "2026-10-30",
"topic_slug": "tcm_acupuncture_tuina_safety",
"node_slug": "tcm_acupuncture_fainting"
},
{
"knowledge_id": "K-TCM-158",
"node_id": "traditional_chinese_medicine",
"title": "艾灸操作的距离与防烫",
"claim": "艾灸需保持适当距离并随时询问温热感，避免直接接触皮肤造成烫伤，感觉减退、糖尿病足或皮肤破损部位不宜施灸，操作由专业人员完成。",
"source": "《针灸技术操作规范 第1部分：艾灸》（GB/T 21709.1）",
"source_location": "操作要求与注意事项部分",
"source_url": "",
"source_note": "本卡出处已由课程团队核对为真实出版物/行业规范，尚未补公开访问链接。",
"version": "2008",
"scope": "traditional_chinese_medicine·针灸推拿安全边界",
"exceptions": "艾灸属操作技术，须由具备相应资质的专业人员实施；学生只协助观察皮肤反应与通风。",
"misconceptions": [
"让患者自己拿着艾条烤",
"糖尿病患者足部感觉差也照常施灸"
],
"lay_terms": [
"觉得烫马上说，我们不会让艾条贴到皮肤上，感觉不灵敏的地方更不能灸。"
],
"reviewer": "知护课程团队（已复核来源）",
"review_status": "课程团队已复核",
"updated_at": "2026-10-30",
"topic_slug": "tcm_acupuncture_tuina_safety",
"node_slug": "tcm_moxibustion_safety"
},
{
"knowledge_id": "K-TCM-159",
"node_id": "traditional_chinese_medicine",
"title": "拔罐后的皮肤反应观察",
"claim": "拔罐后应观察皮肤颜色与水疱情况，说明罐印多在数日内消退，出现大水疱、破溃或疼痛加重需就医处理，凝血异常与皮肤病患者不宜拔罐。",
"source": "《针灸学》（全国中医药行业高等教育规划教材）",
"source_location": "上篇·针灸操作·拔罐法及其注意事项",
"source_url": "",
"source_note": "本卡出处已由课程团队核对为真实出版物/行业规范，尚未补公开访问链接。",
"version": "第11版 2021",
"scope": "traditional_chinese_medicine·针灸推拿安全边界",
"exceptions": "拔罐操作由具备相应资质的专业人员完成；水疱处理与创面护理按机构规范执行，学生不自行挑破。",
"misconceptions": [
"罐印越紫说明效果越好",
"水疱用针挑破自己涂药"
],
"lay_terms": [
"这些印子几天会淡，要是起了大水泡或者越来越疼，就得来处理一下。"
],
"reviewer": "知护课程团队（已复核来源）",
"review_status": "课程团队已复核",
"updated_at": "2026-10-30",
"topic_slug": "tcm_acupuncture_tuina_safety",
"node_slug": "tcm_cupping_safety"
},
{
"knowledge_id": "K-TCM-160",
"node_id": "traditional_chinese_medicine",
"title": "推拿力度控制与禁忌情形",
"claim": "推拿手法应遵循由轻到重、以患者能耐受为度，出现剧烈疼痛立即停止；骨折、脱位、严重骨质疏松、局部感染或肿瘤部位禁止推拿。",
"source": "《推拿学》（全国中医药行业高等教育规划教材）",
"source_location": "上篇·手法总论·手法操作要求与禁忌证",
"source_url": "",
"source_note": "本卡出处已由课程团队核对为真实出版物/行业规范，尚未补公开访问链接。",
"version": "第4版 2021",
"scope": "traditional_chinese_medicine·针灸推拿安全边界",
"exceptions": "推拿属操作技术，须由具备相应资质的专业人员实施；学生只做体位准备与反应观察。",
"misconceptions": [
"按得越重越有效",
"骨折恢复期在局部做手法"
],
"lay_terms": [
"力度以您能忍得住为准，疼得厉害就停，骨头有问题或局部红肿的地方不能揉。"
],
"reviewer": "知护课程团队（已复核来源）",
"review_status": "课程团队已复核",
"updated_at": "2026-10-30",
"topic_slug": "tcm_acupuncture_tuina_safety",
"node_slug": "tcm_tuina_contraindication"
},
{
"knowledge_id": "K-TCM-161",
"node_id": "traditional_chinese_medicine",
"title": "颈腰部推拿的风险告知",
"claim": "颈腰部推拿前应询问外伤史与神经症状，说明存在头晕、肢体麻木加重等风险，出现上肢放射痛或行走不稳应先完成影像与专科评估。",
"source": "《推拿学》（全国中医药行业高等教育规划教材）",
"source_location": "治疗篇·颈椎病与腰椎间盘突出症的推拿注意事项",
"source_url": "",
"source_note": "本卡出处已由课程团队核对为真实出版物/行业规范，尚未补公开访问链接。",
"version": "第4版 2021",
"scope": "traditional_chinese_medicine·针灸推拿安全边界",
"exceptions": "颈腰部旋转扳法属高风险手法，须由具备资质的医师评估后实施，学生不观摩模仿、不协助发力。",
"misconceptions": [
"落枕就让人掰脖子",
"腰腿痛先推拿再说检查"
],
"lay_terms": [
"脖子腰上做手法有风险，手麻、走路发飘这些情况要先查清楚再决定。"
],
"reviewer": "知护课程团队（已复核来源）",
"review_status": "课程团队已复核",
"updated_at": "2026-10-30",
"topic_slug": "tcm_acupuncture_tuina_safety",
"node_slug": "tcm_tuina_neck_risk"
},
{
"knowledge_id": "K-TCM-162",
"node_id": "traditional_chinese_medicine",
"title": "特殊人群的操作注意事项",
"claim": "对孕妇、儿童、老年人及抗凝治疗者，应说明操作部位与手法的特殊限制，是否适合针灸推拿由专业人员评估，学生不得自行决定。",
"source": "《中华人民共和国医师法》",
"source_location": "医师执业范围与执业规范相关条款",
"source_url": "",
"source_note": "本卡出处已由课程团队核对为真实出版物/行业规范，尚未补公开访问链接。",
"version": "2021",
"scope": "traditional_chinese_medicine·针灸推拿安全边界",
"exceptions": "孕妇腰骶部与合谷、三阴交等特定部位是否可针由医师判断；儿童操作需监护人知情同意。",
"misconceptions": [
"孕妇腰痛随手按腰骶部",
"给正在吃抗凝药的老人加做刺络放血"
],
"lay_terms": [
"怀孕、年纪小、正在吃抗凝药，这些情况都要先跟医生讲，不是所有手法都能做。"
],
"reviewer": "知护课程团队（已复核来源）",
"review_status": "课程团队已复核",
"updated_at": "2026-10-30",
"topic_slug": "tcm_acupuncture_tuina_safety",
"node_slug": "tcm_special_population_safety"
},
{
"knowledge_id": "K-TCM-163",
"node_id": "traditional_chinese_medicine",
"title": "操作后观察与不良事件上报",
"claim": "操作后应观察局部与全身反应并记录，出现持续疼痛、出血、发热或神经症状应及时报告带教老师并按机构流程上报，不隐瞒或自行处理。",
"source": "《针灸学》（全国中医药行业高等教育规划教材）",
"source_location": "上篇·针灸操作·针刺异常情况的预防与处理",
"source_url": "",
"source_note": "本卡出处已由课程团队核对为真实出版物/行业规范，尚未补公开访问链接。",
"version": "第11版 2021",
"scope": "traditional_chinese_medicine·针灸推拿安全边界",
"exceptions": "不良事件报告流程以所在机构制度为准，学生如实记录时间、部位与表现，不擅自处理或对外解释。",
"misconceptions": [
"出点血觉得正常就不记录",
"怕担责把反应写轻一点"
],
"lay_terms": [
"做完以后哪里不舒服，您马上告诉我，我要照实记下来并报告老师。"
],
"reviewer": "知护课程团队（已复核来源）",
"review_status": "课程团队已复核",
"updated_at": "2026-10-30",
"topic_slug": "tcm_acupuncture_tuina_safety",
"node_slug": "tcm_adverse_event_reporting"
},
{
"knowledge_id": "K-TCM-164",
"node_id": "traditional_chinese_medicine",
"title": "中西医协同的角色说明",
"claim": "向患者说明中西医可以协同，中医侧重整体调护与症状改善，现代医学检查有助于明确诊断，两者不互相替代，具体方案由接诊医师统筹。",
"source": "《中华人民共和国中医药法》",
"source_location": "第三条 中西医并重的方针",
"source_url": "",
"source_note": "本卡出处已由课程团队核对为真实出版物/行业规范，尚未补公开访问链接。",
"version": "2017",
"scope": "traditional_chinese_medicine·中西医协同与急症转诊",
"exceptions": "协同方案的取舍由接诊医师决定，学生不评价、不贬低任一疗法，也不替患者选择治疗路径。",
"misconceptions": [
"跟患者说吃中药就不用吃西药",
"把检查说成西医才需要的东西"
],
"lay_terms": [
"中医西医各管一部分，检查能看清楚是什么病，调理能帮您舒服些，两边一起用。"
],
"reviewer": "知护课程团队（已复核来源）",
"review_status": "课程团队已复核",
"updated_at": "2026-10-30",
"topic_slug": "tcm_integration_emergency",
"node_slug": "tcm_integration_role"
},
{
"knowledge_id": "K-TCM-165",
"node_id": "traditional_chinese_medicine",
"title": "急症信号的优先识别与处置",
"claim": "出现胸痛持续不缓解、呼吸困难、意识改变、大出血或剧烈腹痛时，应停止辨证讨论，立即启动急症流程并呼叫医师，不得先做中医解释。",
"source": "《医疗质量安全核心制度要点》",
"source_location": "急危重患者抢救制度",
"source_url": "",
"source_note": "本卡出处已由课程团队核对为真实出版物/行业规范，尚未补公开访问链接。",
"version": "2018",
"scope": "traditional_chinese_medicine·中西医协同与急症转诊",
"exceptions": "急症处置以机构急救流程与医师指令为准，学生只做呼救、监测与记录，不施针、不喂药。",
"misconceptions": [
"先辨证看看是哪一脏出了问题",
"给胸痛患者按内关穴观察一会儿"
],
"lay_terms": [
"胸痛、喘不上气、意识不清，这些先不谈调理，马上叫医生。"
],
"reviewer": "知护课程团队（已复核来源）",
"review_status": "课程团队已复核",
"updated_at": "2026-10-30",
"topic_slug": "tcm_integration_emergency",
"node_slug": "tcm_emergency_priority"
},
{
"knowledge_id": "K-TCM-166",
"node_id": "traditional_chinese_medicine",
"title": "疑似卒中的识别与转诊",
"claim": "突发口角歪斜、单侧肢体无力、言语不清应立即记录发病时间并启动急救转运，不采用放血、针刺指尖等方式延误，转运途中保持气道通畅。",
"source": "《中医急诊学》（全国中医药行业高等教育规划教材）",
"source_location": "各论·中风·急性期的识别与转诊",
"source_url": "",
"source_note": "本卡出处已由课程团队核对为真实出版物/行业规范，尚未补公开访问链接。",
"version": "第4版 2021",
"scope": "traditional_chinese_medicine·中西医协同与急症转诊",
"exceptions": "卒中诊断与溶栓、取栓决策由具备资质的医师与卒中中心完成，学生不尝试任何针刺放血处置。",
"misconceptions": [
"先扎手指放血再送医院",
"等症状缓解一些再决定是否转诊"
],
"lay_terms": [
"嘴歪、半边没劲、说话不清，记下几点开始的，马上送医院，别耽误。"
],
"reviewer": "知护课程团队（已复核来源）",
"review_status": "课程团队已复核",
"updated_at": "2026-10-30",
"topic_slug": "tcm_integration_emergency",
"node_slug": "tcm_emergency_stroke"
},
{
"knowledge_id": "K-TCM-167",
"node_id": "traditional_chinese_medicine",
"title": "高热与感染征象的转诊",
"claim": "高热伴寒战、意识模糊、呼吸急促或血压下降时应按急症处理并转诊，中医辨证不能替代感染评估与抗感染治疗，用药由医师决定。",
"source": "《中医急诊学》（全国中医药行业高等教育规划教材）",
"source_location": "各论·外感高热·病情评估与转诊指征",
"source_url": "",
"source_note": "本卡出处已由课程团队核对为真实出版物/行业规范，尚未补公开访问链接。",
"version": "第4版 2021",
"scope": "traditional_chinese_medicine·中西医协同与急症转诊",
"exceptions": "抗感染药物与退热方案由医师开具，学生不推荐、不调整；传染病相关情况按机构报病流程执行。",
"misconceptions": [
"高热先辨证是风寒还是风热",
"建议患者吃点退烧药观察一晚"
],
"lay_terms": [
"烧得高还打寒战、人都迷糊了，这要先按急症处理，不能只想着清热。"
],
"reviewer": "知护课程团队（已复核来源）",
"review_status": "课程团队已复核",
"updated_at": "2026-10-30",
"topic_slug": "tcm_integration_emergency",
"node_slug": "tcm_emergency_fever"
},
{
"knowledge_id": "K-TCM-168",
"node_id": "traditional_chinese_medicine",
"title": "中西药联用的风险提醒",
"claim": "询问用药史时应逐一记录正在服用的中药、中成药与西药，提醒可能存在相互作用，是否联用由医师或药师评估，学生不调整任何药物。",
"source": "《中成药临床应用指导原则》",
"source_location": "中成药联合用药与用药监护部分",
"source_url": "",
"source_note": "本卡出处已由课程团队核对为真实出版物/行业规范，尚未补公开访问链接。",
"version": "2010",
"scope": "traditional_chinese_medicine·中西医协同与急症转诊",
"exceptions": "药物相互作用判断与剂量调整由医师、药师负责；学生不擅自建议停药、加药或更改服药时间。",
"misconceptions": [
"中药西药隔开半小时吃就没事",
"患者自购中成药不写进用药清单"
],
"lay_terms": [
"您现在吃的药，包括中药、中成药、保健品，都告诉我，我登记给医生和药师看。"
],
"reviewer": "知护课程团队（已复核来源）",
"review_status": "课程团队已复核",
"updated_at": "2026-10-30",
"topic_slug": "tcm_integration_emergency",
"node_slug": "tcm_integration_drug_interaction"
},
{
"knowledge_id": "K-TCM-169",
"node_id": "traditional_chinese_medicine",
"title": "检查结果与辨证信息的结合",
"claim": "查看化验与影像结果时应与四诊信息一并记录，说明两者可以互相印证也可能存在差异，差异较大时请医师复核，不以辨证结论解释异常结果。",
"source": "《中医诊断学》（全国中医药行业高等教育规划教材）",
"source_location": "第六章 四诊合参·传统诊法与检查结果的结合",
"source_url": "",
"source_note": "本卡出处已由课程团队核对为真实出版物/行业规范，尚未补公开访问链接。",
"version": "第11版 2021",
"scope": "traditional_chinese_medicine·中西医协同与急症转诊",
"exceptions": "危急值按机构危急值报告制度立即处理，学生不得以辨证解释延误报告。",
"misconceptions": [
"化验正常就说明没病不用管症状",
"用气血不足解释明显的贫血指标"
],
"lay_terms": [
"检查结果和您说的不舒服要放一起看，有对不上的地方，让医生再核一遍。"
],
"reviewer": "知护课程团队（已复核来源）",
"review_status": "课程团队已复核",
"updated_at": "2026-10-30",
"topic_slug": "tcm_integration_emergency",
"node_slug": "tcm_integration_lab_results"
},
{
"knowledge_id": "K-TCM-170",
"node_id": "traditional_chinese_medicine",
"title": "会诊转介的沟通与交接",
"claim": "需要会诊或转介时应向患者说明原因、去向与预期流程，整理四诊记录、用药清单与检查结果完成交接，确保接诊方获得完整信息。",
"source": "《医疗质量安全核心制度要点》",
"source_location": "会诊制度",
"source_url": "",
"source_note": "本卡出处已由课程团队核对为真实出版物/行业规范，尚未补公开访问链接。",
"version": "2018",
"scope": "traditional_chinese_medicine·中西医协同与急症转诊",
"exceptions": "转诊交接内容与时限按机构制度执行，患者拒绝转诊时如实记录并报告医师，不强迫也不隐瞒风险。",
"misconceptions": [
"只口头说一句让家属自己去找",
"转诊时不带之前的用药和检查资料"
],
"lay_terms": [
"我们要请另外的科室一起看，为什么、去哪儿、怎么走，我都跟您说清楚，资料也带齐。"
],
"reviewer": "知护课程团队（已复核来源）",
"review_status": "课程团队已复核",
"updated_at": "2026-10-30",
"topic_slug": "tcm_integration_emergency",
"node_slug": "tcm_integration_referral"
},
{
"knowledge_id": "K-TCM-171",
"node_id": "traditional_chinese_medicine",
"title": "尊重患者治疗选择的沟通",
"claim": "患者选择中医或西医方案时应说明各自的作用与局限，尊重其选择并记录知情过程，不贬低其他疗法，也不以疗效承诺影响其决定。",
"source": "《中华人民共和国中医药法》",
"source_location": "第三条 中西医并重与发挥中医药作用",
"source_url": "",
"source_note": "本卡出处已由课程团队核对为真实出版物/行业规范，尚未补公开访问链接。",
"version": "2017",
"scope": "traditional_chinese_medicine·中西医协同与急症转诊",
"exceptions": "知情同意过程由医师完成并签署文书，学生只做解释与记录，不代替医师谈话。",
"misconceptions": [
"说西药伤身劝患者只吃中药",
"为了留住患者承诺一定有效"
],
"lay_terms": [
"选哪种方式由您决定，我把各自能做什么、做不到什么讲清楚，您再考虑。"
],
"reviewer": "知护课程团队（已复核来源）",
"review_status": "课程团队已复核",
"updated_at": "2026-10-30",
"topic_slug": "tcm_integration_emergency",
"node_slug": "tcm_integration_informed_choice"
},
{
"knowledge_id": "K-TCM-172",
"node_id": "traditional_chinese_medicine",
"title": "疗效评估与复诊安排要点",
"claim": "评估调护效果应使用可观察指标如症状变化、睡眠与进食情况，按约定时间复评，症状无改善或加重时调整方案并请医师复核，不延长无效等待。",
"source": "《中医内科学》（全国中医药行业高等教育规划教材）",
"source_location": "总论·疗效评价与随访安排",
"source_url": "",
"source_note": "本卡出处已由课程团队核对为真实出版物/行业规范，尚未补公开访问链接。",
"version": "第11版 2021",
"scope": "traditional_chinese_medicine·中西医协同与急症转诊",
"exceptions": "方案调整由医师决定，学生不自行加量、换方或延长疗程；病情恶化按急症流程处理。",
"misconceptions": [
"吃了两周没效果也说再等等",
"只凭患者一句好多了就算有效"
],
"lay_terms": [
"我们约个时间再看，睡得怎么样、吃得怎么样都记一下，没好转就得改方案。"
],
"reviewer": "知护课程团队（已复核来源）",
"review_status": "课程团队已复核",
"updated_at": "2026-10-30",
"topic_slug": "tcm_integration_emergency",
"node_slug": "tcm_integration_efficacy_followup"
},
{
"knowledge_id": "K-TCM-001",
"node_id": "tcm_information_and_reasoning",
"title": "中医信息采集与辨证思维边界",
"claim": "中医学训练需要以完整、规范的信息采集为基础，形成中医理论与临床思维的联系；同时必须具备现代医学急症识别和转诊意识，不能用辨证调理延误急症评估。",
"source": "本科医学教育标准 中医学专业 暂行",
"source_location": "中医学专业知识、临床能力、职业素养与预防医学要求",
"source_url": "https://www.moe.gov.cn/srcsite/A08/moe_740/s3864/201301/t20130105_147172.html",
"source_note": "用于中医学教育能力结构设计，不直接作为具体处方依据。",
"version": "2012",
"scope": "中医学专业训练",
"exceptions": "真实诊疗、辨证处方和针灸推拿操作需由具备相应资质的专业人员完成。",
"misconceptions": [
"信息未采集完整也能快速定证",
"中医调理可以替代急症评估"
],
"lay_terms": [
"先把望闻问切的信息采全，也要先排查不能耽误的危险情况。"
],
"reviewer": "知护课程团队（已复核来源，链接已核实）",
"review_status": "课程团队已复核",
"updated_at": "2026-10-30"
},
{
"knowledge_id": "K-CLIN-002",
"node_id": "clinical_reassessment_and_handoff",
"title": "关键节点再评估与结构化交接",
"claim": "住院当日、围手术期、治疗后和出院前等关键节点需要规范评估与再评估，并将病情变化、风险、已采取措施和待办事项清楚交接。",
"source": "全面提升医疗质量行动计划 2023至2025年",
"source_location": "患者评估、病情监测和医疗质量安全部分",
"source_url": "https://www.nhc.gov.cn/wjw/c100375/202305/f2e628ad29fb441b8fcb03c2d5967805.shtml",
"source_note": "用于综合评估和交接沟通教学。",
"version": "2023",
"scope": "临床信息整合和交接训练",
"exceptions": "具体检查和治疗由有资质医师决定。",
"misconceptions": [
"首次评估后无需再评估",
"交接只报一个诊断名称"
],
"lay_terms": [
"交接要说清现在最危险的是什么、已经做了什么、接下来还要盯什么。"
],
"reviewer": "知护课程团队（已复核来源，链接已核实）",
"review_status": "课程团队已复核",
"updated_at": "2026-10-30"
},
{
"knowledge_id": "K-CLIN-001",
"node_id": "clinical_history_and_warning",
"title": "临床病史结构与危险信号优先",
"claim": "临床接诊应围绕主诉建立症状时间轴，补充性质、部位、诱因、缓解因素、伴随表现、既往史和用药史；出现急性胸痛等高危线索时应优先完成安全评估和及时转介，不在资料不足时下诊断。",
"source": "院前医疗急救人员培训大纲 WS/T 839—2024及国家卫生健康委胸痛科普",
"source_location": "常见急症评估、急性胸痛识别与院前处理原则",
"source_url": "https://www.nhc.gov.cn/fzs/c100048/202408/03a8510913c34f92979e3f290d4a2cbf/files/1733821997154_69897.pdf",
"source_note": "用于合成病例的信息采集和风险分流教学，不替代临床诊疗指南。",
"version": "2024",
"scope": "临床医学综合接诊训练",
"exceptions": "真实急症应立即由现场专业人员评估并联系120。",
"misconceptions": [
"先猜诊断再补问病史",
"症状暂时缓解就一定安全"
],
"lay_terms": [
"先把什么时候开始、怎么痛、还伴有什么问清楚，再决定下一步安全处理。"
],
"reviewer": "知护课程团队（已复核来源，链接已核实）",
"review_status": "课程团队已复核",
"updated_at": "2026-10-30"
},
{
"knowledge_id": "K-MT-002",
"node_id": "imaging_justification_and_protection",
"title": "影像检查正当化与放射防护",
"claim": "医疗照射应有明确目的，遵循正当化和防护最优化，控制受照剂量并事先告知相关影响；应核对既往资料和特殊人群信息，避免无必要的重复照射。",
"source": "放射诊疗管理规定",
"source_location": "第二十五条和第二十六条",
"source_url": "https://www.nhc.gov.cn/wjw/c100221/202201/c7a29190859c4bfeac3a057b0f1415bb/files/%E6%94%BE%E5%B0%84%E8%AF%8A%E7%96%97%E7%AE%A1%E7%90%86%E8%A7%84%E5%AE%9A.pdf",
"source_note": "用于影像检查沟通和职业边界教学。",
"version": "2021",
"scope": "医学影像技术训练",
"exceptions": "是否取消、更换或延期检查由有权限的医师结合临床目的决定。",
"misconceptions": [
"所有影像检查都没有风险",
"技术人员可自行取消医嘱"
],
"lay_terms": [
"先确认为什么做、以前做过什么，再在满足诊断需要的前提下尽量减少不必要照射。"
],
"reviewer": "知护课程团队（已复核来源，链接已核实）",
"review_status": "课程团队已复核",
"updated_at": "2026-10-30"
},
{
"knowledge_id": "K-MT-001",
"node_id": "laboratory_preanalytic_quality",
"title": "检验前质量与标本可追溯性",
"claim": "检验申请、患者身份、标本类型、容器、采集时间、患者准备和运输保存条件均会影响结果；信息不一致或条件不明时应按程序核对、记录和处置，不能擅自修改或直接放行。",
"source": "WS/T 225—2024 临床化学检验血液标本的采集与处理及WS/T 661—2020静脉血液标本采集指南",
"source_location": "患者准备、身份确认、采集标记、运输和处理要求",
"source_url": "https://www.nhc.gov.cn/wjw/s9492/202407/e60dd733839d4d4ba61649eeb582cfcc.shtml",
"source_note": "用于医学检验前质量控制教学。",
"version": "2024",
"scope": "医学检验技术训练",
"exceptions": "具体拒收和重采规则以所在实验室有效SOP为准。",
"misconceptions": [
"只要有标本就可以检测",
"标签差异可以凭经验修改"
],
"lay_terms": [
"结果靠不靠谱，从人、管子、时间和运输都对得上开始。"
],
"reviewer": "知护课程团队（已复核来源，链接已核实）",
"review_status": "课程团队已复核",
"updated_at": "2026-10-30"
},
{
"knowledge_id": "K-NUR-002",
"node_id": "nursing_observation_and_education",
"title": "病情观察与个体化健康教育",
"claim": "护理人员应持续观察生命体征、意识、皮肤、循环、管路以及检查和用药后的反应，及时识别变化；健康教育应结合个体需求，并通过回示等方式确认患者真正理解。",
"source": "改善护理服务行动计划 2023至2025年",
"source_location": "病情观察、风险预警和个性化健康教育部分",
"source_url": "https://www.nhc.gov.cn/wjw/c100375/202306/e08fa162e2d04fa7bd59095e8d55193a.shtml",
"source_note": "用于护理观察、出院教育和理解确认训练。",
"version": "2023",
"scope": "护理学健康教育训练",
"exceptions": "不得越过医嘱自行调整具体治疗方案。",
"misconceptions": [
"患者点头就等于理解",
"出院教育只需宣读注意事项"
],
"lay_terms": [
"请您用自己的话说一遍回家后怎么做，我看看哪里还需要再解释。"
],
"reviewer": "知护课程团队（已复核来源，链接已核实）",
"review_status": "课程团队已复核",
"updated_at": "2026-10-30"
},
{
"knowledge_id": "K-NUR-001",
"node_id": "holistic_nursing_and_safety",
"title": "整体护理与患者安全",
"claim": "责任制整体护理应结合疾病特点以及生理、心理和社会需求，开展病情观察、医学照顾、心理护理和健康指导，并主动预防跌倒、压力性损伤、非计划拔管和给药错误等不良事件。",
"source": "国家卫生健康委关于进一步加强医疗机构护理工作的通知",
"source_location": "责任制整体护理、护理质量安全和不良事件管理部分",
"source_url": "https://www.nhc.gov.cn/wjw/c100175/202009/f808fa44796745cea65d5f7284f0bc18.shtml",
"source_note": "用于护理综合评估与安全沟通教学。",
"version": "2020",
"scope": "护理学综合训练",
"exceptions": "具体护理措施应遵循所在机构制度、医嘱和操作规范。",
"misconceptions": [
"护理评估只看生命体征",
"患者不主动求助就代表没有风险"
],
"lay_terms": [
"既要看病情，也要看活动、情绪、用药、家庭支持和病房环境。"
],
"reviewer": "知护课程团队（已复核来源，链接已核实）",
"review_status": "课程团队已复核",
"updated_at": "2026-10-30"
},
{
"knowledge_id": "K-TCM-002",
"node_id": "tcm_constitution_service_boundary",
"title": "中医体质辨识与健康指导规范",
"claim": "老年人中医药健康管理包括按规范采集信息、依据标准开展体质辨识并提供情志、饮食、起居、运动和穴位保健指导；体质辨识和指导应由接受相应培训或具备规定资质的人员实施并完整记录。",
"source": "国家基本公共卫生服务规范 第三版 中医药健康管理服务",
"source_location": "老年人中医体质辨识、保健指导和服务要求",
"source_url": "https://www.nhc.gov.cn/jws/s3578/201703/d20c37e23e1f4c7db7b8e25f34473e1b.shtml",
"source_note": "用于公共卫生场景的中医体质管理教学。",
"version": "2017",
"scope": "老年人中医药健康管理训练",
"exceptions": "体质辨识不是疾病诊断，不替代规范医疗评估。",
"misconceptions": [
"体质标签等于疾病诊断",
"任何人都可以直接给出个体化中药处方"
],
"lay_terms": [
"体质辨识是健康管理参考，不等于给疾病下诊断。"
],
"reviewer": "知护课程团队（已复核来源，链接已核实）",
"review_status": "课程团队已复核",
"updated_at": "2026-10-30"
},
{
"knowledge_id": "K-CLIN-164",
"node_id": "clinical_medicine",
"title": "眼球感光作用最强的部位为",
"claim": "视网膜中感光最敏锐的区域是黄斑中央凹（B 对），该处仅有视锥细胞，且无血管遮挡，光线可直接刺激感光细胞，因此视觉敏感度最高。黄斑（A 错）虽为视网膜中心区域，但中央凹才是其核心功能部位。视神经盘（C 错）是视神经纤维穿出视网膜的盲点，完全缺乏感光细胞，无法感光。视神经盘中央凹（D 错）为编造结构，视神经盘无凹陷且无感光功能。视网膜虹膜部（E 错）属于虹膜内表面的色素上皮层，不参与感光过程。",
"source": "系统解剖学 P237",
"source_location": "（系统解剖学 P237）“在视神经盘的颞侧稍偏下方约 3.5mm 处，有一黄色小区，由密集的视锥细胞构成，称黄斑，直径约 1.8～2.0mm。黄斑中央凹陷称中央凹（图 8–6），此区无血管，为感光最敏锐处”（B 对）。（系统解剖学 P237）“虹膜部和睫状体部分别贴附于虹膜和睫状体的内面，薄而无感光作用，故称为视网膜盲部”（E 错）。",
"source_url": "",
"source_note": "本卡由课程团队提供的医学题库导入，解析与考点出处来自原始题库文档。",
"version": "题库导入",
"scope": "clinical_medicine·基础医学拓展",
"exceptions": "",
"misconceptions": [],
"lay_terms": [],
"reviewer": "知护课程团队",
"review_status": "课程团队已复核",
"updated_at": "2026-10-31",
"node_slug": "clin_extra_164",
"topic_slug": "clin_extra_164"
},
{
"knowledge_id": "K-CLIN-165",
"node_id": "clinical_medicine",
"title": "具有吞噬功能的是",
"claim": "视网膜色素上皮层（E 对）（RPE）位于视网膜最外层，具有吞噬视细胞脱落的外节膜盘等功能。睫状体上皮（A 错）主要分泌房水。角膜内皮（B 错）负责维持角膜的相对脱水状态以保持透明。角膜上皮（C 错）作为屏障防止感染和损伤。虹膜上皮（D 错）参与形成瞳孔括约肌和开大肌。",
"source": "组织学与胚胎学 P116",
"source_location": "（组织学与胚胎学 P116）“色素上皮层：是由色素上皮细胞构成的单层立方上皮……细胞质内含大量粗大的黑素颗粒和吞噬体……表明色素上皮细胞可参与视细胞外节的更新”（E 对）。",
"source_url": "",
"source_note": "本卡由课程团队提供的医学题库导入，解析与考点出处来自原始题库文档。",
"version": "题库导入",
"scope": "clinical_medicine·基础医学拓展",
"exceptions": "",
"misconceptions": [],
"lay_terms": [],
"reviewer": "知护课程团队",
"review_status": "课程团队已复核",
"updated_at": "2026-10-31",
"node_slug": "clin_extra_165",
"topic_slug": "clin_extra_165"
},
{
"knowledge_id": "K-CLIN-166",
"node_id": "clinical_medicine",
"title": "缺血性心脏病最常见的病因是",
"claim": "缺血性心脏病是指因冠状动脉供血不足导致心肌缺血缺氧而引起的心脏病，其最常见的病因是冠状动脉粥样硬化（C 对），因为粥样硬化斑块使冠状动脉管腔狭窄或闭塞，减少心肌血供。心肌肥厚（A 错）是心脏对压力负荷或容量负荷的代偿反应，本身不是缺血性心脏病的病因，但肥厚心肌需氧增加可能加重缺血。严重贫血（B 错）可因血液携氧能力下降导致心肌缺氧，但并非冠状动脉结构异常所致。主动脉瓣狭窄（D 错）可因左心室射血阻力增加导致心肌肥厚和冠脉灌注压下降，引起继发性缺血，但并非最常见。主动脉瓣关闭不全（E 错）可导致舒张期冠脉灌注减少，同样不是最常见病因。",
"source": "组织学与胚胎学 P93",
"source_location": "（组织学与胚胎学 P93）“动脉粥样硬化是一种动脉血管疾病，其发生机制如下：当动脉内皮受损后，胆固醇等脂质成分容易在内皮下层沉积……它会导致血管腔明显狭窄，当斑块破裂时还可引发血栓形成，从而导致血管急性闭塞，这是缺血性脑卒中、冠心病和外周动脉疾病的主要病理过程”（C 对）。",
"source_url": "",
"source_note": "本卡由课程团队提供的医学题库导入，解析与考点出处来自原始题库文档。",
"version": "题库导入",
"scope": "clinical_medicine·基础医学拓展",
"exceptions": "",
"misconceptions": [],
"lay_terms": [],
"reviewer": "知护课程团队",
"review_status": "课程团队已复核",
"updated_at": "2026-10-31",
"node_slug": "clin_extra_166",
"topic_slug": "clin_extra_166"
},
{
"knowledge_id": "K-CLIN-167",
"node_id": "clinical_medicine",
"title": "颈内静脉二腹肌淋巴结肿大时，可首先考虑",
"claim": "颈内静脉二腹肌淋巴结属于颈深上淋巴结群，主要接收鼻咽部、扁桃体及舌根等区域的淋巴回流。鼻咽癌早期即可发生此处淋巴结转移，通常表现为无痛性肿大，因此在临床中遇到该淋巴结肿大时需首先考虑鼻咽癌（D 对）。甲状腺癌（A 错）常转移至颈深下淋巴结或气管旁淋巴结。喉癌（B 错）的淋巴转移多至颈深上淋巴结，但位置更偏向颈前三角区，与二腹肌淋巴结直接对应关系不密切。食管癌（C 错）常转移至锁骨上淋巴结或纵隔淋巴结。腮腺癌（E 错）可转移至耳前、耳后或颈深上淋巴结。",
"source": "系统解剖学 P226",
"source_location": "（系统解剖学 P226）“位于面静脉、颈内静脉和二腹肌后腹之间的淋巴结称颈内静脉二腹肌淋巴结，引流鼻咽部、腭扁桃体和舌根的淋巴。鼻咽癌和舌根癌常首先转移至该淋巴结”（D 对）。",
"source_url": "",
"source_note": "本卡由课程团队提供的医学题库导入，解析与考点出处来自原始题库文档。",
"version": "题库导入",
"scope": "clinical_medicine·基础医学拓展",
"exceptions": "",
"misconceptions": [],
"lay_terms": [],
"reviewer": "知护课程团队",
"review_status": "课程团队已复核",
"updated_at": "2026-10-31",
"node_slug": "clin_extra_167",
"topic_slug": "clin_extra_167"
},
{
"knowledge_id": "K-CLIN-168",
"node_id": "clinical_medicine",
"title": "膝关节内侧半月板",
"claim": "膝关节内侧半月板是位于胫骨与股骨内侧髁之间的纤维软骨结构，其形态特点为较大且呈“C”型（D 对 B 错）。内侧半月板前端窄后份宽（E 错），外缘厚、内缘薄（A 错）。其前端有韧带连于胫骨髁间前区（C 错）。",
"source": "系统解剖学 P51",
"source_location": "（系统解剖学 P51）“半月板 meniscus 是垫在股骨内、外侧髁与胫骨内、外侧髁关节面之间的两块半月形纤维软骨板，分别称为内、外侧半月板。内侧半月板较大，呈“C”形，前端窄、后份宽，外缘与关节囊及胫侧副韧带紧密相连。外侧半月板较小，近似“O”形，外缘亦与关节囊相连”（D 对 BE 错）。",
"source_url": "",
"source_note": "本卡由课程团队提供的医学题库导入，解析与考点出处来自原始题库文档。",
"version": "题库导入",
"scope": "clinical_medicine·基础医学拓展",
"exceptions": "",
"misconceptions": [],
"lay_terms": [],
"reviewer": "知护课程团队",
"review_status": "课程团队已复核",
"updated_at": "2026-10-31",
"node_slug": "clin_extra_168",
"topic_slug": "clin_extra_168"
},
{
"knowledge_id": "K-CLIN-169",
"node_id": "clinical_medicine",
"title": "正确的是",
"claim": "环层小体是皮肤内的机械感受器，主要感受压觉和振动觉（A 对）。其体形较大，呈椭圆形或球形（B 错）。有髓神经纤维进入小体后失去髓鞘，形成无髓鞘的神经末梢位于小体中央（C 错）。环层小体分布于真皮深层和皮下组织，而位于真皮乳头内的感受器是触觉小体（D 错）。环层小体的被囊由数十层同心圆排列的扁平细胞及结缔组织构成（E 错）。",
"source": "组织学与胚胎学 P70",
"source_location": "（组织学与胚胎学 P70）“环层小体感受较强的应力，参与产生压觉和振动觉”（A 对）。",
"source_url": "",
"source_note": "本卡由课程团队提供的医学题库导入，解析与考点出处来自原始题库文档。",
"version": "题库导入",
"scope": "clinical_medicine·基础医学拓展",
"exceptions": "",
"misconceptions": [],
"lay_terms": [],
"reviewer": "知护课程团队",
"review_status": "课程团队已复核",
"updated_at": "2026-10-31",
"node_slug": "clin_extra_169",
"topic_slug": "clin_extra_169"
},
{
"knowledge_id": "K-CLIN-170",
"node_id": "clinical_medicine",
"title": "胃黏膜分泌内因子的细胞是",
"claim": "胃黏膜内因子由壁细胞（B 对）分泌，壁细胞还分泌胃酸。主细胞（A 错）分泌胃蛋白酶原，不分泌内因子。黏膜上皮细胞（C 错）主要分泌黏液，起保护作用。未分化细胞（D 错）是胃腺的干细胞，可分化成其他细胞，不直接分泌内因子。内分泌细胞（E 错）（如 G 细胞）分泌胃泌素等激素。",
"source": "医学教材（考点还原）",
"source_location": "无单独截取段落，标准解析如下。",
"source_url": "",
"source_note": "本卡由课程团队提供的医学题库导入，解析与考点出处来自原始题库文档。",
"version": "题库导入",
"scope": "clinical_medicine·基础医学拓展",
"exceptions": "",
"misconceptions": [],
"lay_terms": [],
"reviewer": "知护课程团队",
"review_status": "课程团队已复核",
"updated_at": "2026-10-31",
"node_slug": "clin_extra_170",
"topic_slug": "clin_extra_170"
},
{
"knowledge_id": "K-CLIN-171",
"node_id": "clinical_medicine",
"title": "错误的是",
"claim": "肾实质是肾脏的主要功能结构，分为肾皮质和肾髓质两部分（A 对）。肾皮质位于肾实质的浅层，主要由肾小体和肾小管构成（B 对）。肾髓质位于肾实质的深部，由 15～20 个肾锥体组成（C 对）。肾锥体的尖端朝向肾窦，称为肾乳头（D 错，为本题正确答案），肾乳头的顶端有许多乳头孔，尿液由此流入肾小盏。肾皮质伸入肾锥体之间的部分称为肾柱（E 对）。",
"source": "系统解剖学 P139",
"source_location": "（系统解剖学 P139）“肾锥体的底朝皮质，尖向肾窦，光滑而致密，有许多颜色较深、呈放射状的条纹，条纹由肾直小管和血管平行排列形成”（D 错，为本题正确答案）。",
"source_url": "",
"source_note": "本卡由课程团队提供的医学题库导入，解析与考点出处来自原始题库文档。",
"version": "题库导入",
"scope": "clinical_medicine·基础医学拓展",
"exceptions": "",
"misconceptions": [],
"lay_terms": [],
"reviewer": "知护课程团队",
"review_status": "课程团队已复核",
"updated_at": "2026-10-31",
"node_slug": "clin_extra_171",
"topic_slug": "clin_extra_171"
},
{
"knowledge_id": "K-CLIN-172",
"node_id": "clinical_medicine",
"title": "与淋巴结凸相连接的淋巴管是",
"claim": "淋巴结的凸侧（即外侧）是输入淋巴管进入的部位（D 对）。输出淋巴管（A 错）从淋巴结的凹侧（门部）发出，不与凸侧相连。浅淋巴管（B 错）和深淋巴管（C 错）是根据走行位置（皮下或深筋膜）分类的淋巴管，其连接部位与淋巴结的凸或凹侧无特定对应关系。",
"source": "系统解剖学 P224",
"source_location": "（系统解剖学 P224）“淋巴结凸侧连有数条输入淋巴管。淋巴结门有输出淋巴管、神经和血管出入”（D 对）。",
"source_url": "",
"source_note": "本卡由课程团队提供的医学题库导入，解析与考点出处来自原始题库文档。",
"version": "题库导入",
"scope": "clinical_medicine·基础医学拓展",
"exceptions": "",
"misconceptions": [],
"lay_terms": [],
"reviewer": "知护课程团队",
"review_status": "课程团队已复核",
"updated_at": "2026-10-31",
"node_slug": "clin_extra_172",
"topic_slug": "clin_extra_172"
},
{
"knowledge_id": "K-TCM-173",
"node_id": "traditional_chinese_medicine",
"title": "体现人与自然关系的是",
"claim": "“四变之动，脉与之上下”体现了人与自然是一个统一体 (D 对)。“尝贵后贱，可致脱营”是说社会环境的变化对人体的影响，体现了人与社会环境的统一性 (A 错)。“形与神俱，不可分离”体现了人是一个统一体 (B 错)。“视其外应，以知其内脏”体现的人是一个有机的整体 (C 错)。",
"source": "中医基础理论未明确说明。",
"source_location": "第十版中医基础理论未明确说明。",
"source_url": "",
"source_note": "本卡由课程团队提供的医学题库导入，解析与考点出处来自原始题库文档。",
"version": "题库导入",
"scope": "traditional_chinese_medicine·中医基础理论拓展",
"exceptions": "",
"misconceptions": [],
"lay_terms": [],
"reviewer": "知护课程团队",
"review_status": "课程团队已复核",
"updated_at": "2026-10-31",
"node_slug": "tcm_extra_173",
"topic_slug": "tcm_extra_173"
},
{
"knowledge_id": "K-TCM-174",
"node_id": "traditional_chinese_medicine",
"title": "多出现气逆病变的脏腑是",
"claim": "气逆是指气升之太过，或降之不及，以脏腑之气逆为特征的病理状态，其中，尤以肺、胃和肝等脏腑最为常见——肺气上逆，肺失肃降，则发为咳逆上气；胃气上逆，胃失和降，则发为恶心、呕吐、嗳气、呃逆；肝气上逆，则发为头痛头胀，面红目赤，易怒等症，甚则血随气逆，而致昏厥（B 对）。",
"source": "P183",
"source_location": "第十版中医基础理论（P183）“气逆最常见于肺、胃和肝等脏腑”(B 对)。",
"source_url": "",
"source_note": "本卡由课程团队提供的医学题库导入，解析与考点出处来自原始题库文档。",
"version": "题库导入",
"scope": "traditional_chinese_medicine·中医基础理论拓展",
"exceptions": "",
"misconceptions": [],
"lay_terms": [],
"reviewer": "知护课程团队",
"review_status": "课程团队已复核",
"updated_at": "2026-10-31",
"node_slug": "tcm_extra_174",
"topic_slug": "tcm_extra_174"
},
{
"knowledge_id": "K-TCM-175",
"node_id": "traditional_chinese_medicine",
"title": "下列何种为从治法",
"claim": "从治又称反治，包括热因热用、寒因寒用、塞因塞用、通因通用（B 对）。“用热远热”属于因时制宜；“寒者热之”是正治（逆治）；补泻兼用属于复方配伍思路，不属于从治法（A、C、D 错）。",
"source": "11版中医基础理论P209",
"source_location": "（11版中医基础理论P209）“反治，指顺从病证的某些表象而治的治则。由于采用方药的性质与病证中某些表象相同，故又称为‘从治’…主要包括以下四个方面…1.热因热用…2.寒因寒用…3.塞因塞用…4.通因通用”(B 对)。",
"source_url": "",
"source_note": "本卡由课程团队提供的医学题库导入，解析与考点出处来自原始题库文档。",
"version": "题库导入",
"scope": "traditional_chinese_medicine·中医基础理论拓展",
"exceptions": "",
"misconceptions": [],
"lay_terms": [],
"reviewer": "知护课程团队",
"review_status": "课程团队已复核",
"updated_at": "2026-10-31",
"node_slug": "tcm_extra_175",
"topic_slug": "tcm_extra_175"
},
{
"knowledge_id": "K-TCM-176",
"node_id": "traditional_chinese_medicine",
"title": "不正确的是",
"claim": "本题考查症的基本概念。证是病机的概括，病机是证的内在本质，证所反映的是疾病的本质（E 错，为本题正确答案）。疾病反映的是贯穿一种疾病全过程的总体属性、特征和规律（A 对）。证，是对疾病过程中一定阶段的病因、病位、病性、病势等病机本质的概括（B 对）；证具有个体差异性、时相性、空间性和动态性特征（C 对）。症状和体征是认识病和证的着眼点，是病和证的基本构成要素（D 对）。",
"source": "12版中医基础理论P9",
"source_location": "（12版中医基础理论P9）“（二）辨证论治…1.症、证、病的基本概念（1）症的基本概念 …症是判断疾病、辨识证的主要依据，但其表现的是疾病的表面现象甚至假象，所以未必能完全反映病和证的本质”(E 错，为本题正确答案)。",
"source_url": "",
"source_note": "本卡由课程团队提供的医学题库导入，解析与考点出处来自原始题库文档。",
"version": "题库导入",
"scope": "traditional_chinese_medicine·中医基础理论拓展",
"exceptions": "",
"misconceptions": [],
"lay_terms": [],
"reviewer": "知护课程团队",
"review_status": "课程团队已复核",
"updated_at": "2026-10-31",
"node_slug": "tcm_extra_176",
"topic_slug": "tcm_extra_176"
},
{
"knowledge_id": "K-TCM-177",
"node_id": "traditional_chinese_medicine",
"title": "起居有常属于哪一种养生原则",
"claim": "顺应自然，要求人们的生活起居、作息节律顺应自然界昼夜、四时的变化，起居有常是顺应自然养生原则的典型内容（A 对）；其余选项各有侧重：养性调神重在调畅情志；护肾保精重在保藏肾精；调摄饮食重在饮食调养；体魄锻炼重在形体运动（B、C、D、E 错）。",
"source": "11版中医基础理论P203",
"source_location": "（11版中医基础理论P203）“中医学倡导‘春夏养阳、秋冬养阴’，起居有常，动静和宜，衣着适当，调和饮食，以适应四时气候、昼夜晨昏、地区域等外界环境的变化，均是顺应自然养生的体现”(A 对)。",
"source_url": "",
"source_note": "本卡由课程团队提供的医学题库导入，解析与考点出处来自原始题库文档。",
"version": "题库导入",
"scope": "traditional_chinese_medicine·中医基础理论拓展",
"exceptions": "",
"misconceptions": [],
"lay_terms": [],
"reviewer": "知护课程团队",
"review_status": "课程团队已复核",
"updated_at": "2026-10-31",
"node_slug": "tcm_extra_177",
"topic_slug": "tcm_extra_177"
},
{
"knowledge_id": "K-TCM-178",
"node_id": "traditional_chinese_medicine",
"title": "不与脏腑连属的是",
"claim": "十二正经（太阳经、厥阴经）均有对应的属络脏腑（A、B 错）；冲脉、任脉虽不直接“属”某一脏腑，但与多个脏腑交会、联系密切（C、D 错）；带脉仅环腰一周，没有直接连属的脏腑，功能主要是约束纵行诸脉（E 对）。",
"source": "11版中医基础理论P124",
"source_location": "（11版中医基础理论P124）“带脉是全身唯一横行的经脉，环腰一周，犹如束带，总束纵行诸脉，以调节脉气，使之通畅”(E 对，为本题正确答案)。",
"source_url": "",
"source_note": "本卡由课程团队提供的医学题库导入，解析与考点出处来自原始题库文档。",
"version": "题库导入",
"scope": "traditional_chinese_medicine·中医基础理论拓展",
"exceptions": "",
"misconceptions": [],
"lay_terms": [],
"reviewer": "知护课程团队",
"review_status": "课程团队已复核",
"updated_at": "2026-10-31",
"node_slug": "tcm_extra_178",
"topic_slug": "tcm_extra_178"
},
{
"knowledge_id": "K-TCM-179",
"node_id": "traditional_chinese_medicine",
"title": "“中焦如沤”是描绘",
"claim": "中焦如沤：喻指中焦消化饮食物的作用，如发酵酿造之过程，是对脾胃、肝胆等脏腑的消化饮食物的作用和形式的描绘（D 对）。“上焦如雾”指的是心肺输布气血的作用（E 错）。胃受纳、脾散精、小肠泌别清浊，都只是中焦消化环节的一部分，不能概括“中焦如沤”全部内涵（A、B、C 错）。",
"source": "P68",
"source_location": "第十版中医基础理论（P68）“‘中焦如沤’（《灵枢·营卫生会》）作为其生理特点，是对脾胃、肝胆等脏腑的消化饮食物的作用和形式的形象描写与概括”(D 对)。",
"source_url": "",
"source_note": "本卡由课程团队提供的医学题库导入，解析与考点出处来自原始题库文档。",
"version": "题库导入",
"scope": "traditional_chinese_medicine·中医基础理论拓展",
"exceptions": "",
"misconceptions": [],
"lay_terms": [],
"reviewer": "知护课程团队",
"review_status": "课程团队已复核",
"updated_at": "2026-10-31",
"node_slug": "tcm_extra_179",
"topic_slug": "tcm_extra_179"
},
{
"knowledge_id": "K-NUR-173",
"node_id": "nursing",
"title": "错误的是",
"claim": "分泌胰岛素（E错，为本题正确答案）的是胰岛B细胞。D细胞又称丁细胞、δ细胞，数量少，约占胰岛细胞总数的5%（A对），分散在胰岛周边部，A、B细胞之间，并与A、B细胞紧密相贴，细胞间有缝隙连接（C对）。D细胞分泌生长抑素（B对），以旁分泌方式经缝隙连接直接作用于邻近A细胞、B细胞或pp细胞，抑制A、B、pp细胞的分泌（D对）活动。",
"source": "9版组织学与胚胎学P148",
"source_location": "（9版组织学与胚胎学P148）“胰岛B细胞分泌胰岛素（E错，为本题正确答案）”（9版组织学与胚胎学P148）“D细胞又称丁细胞、δ细胞，约占胰岛细胞总数的5%……细胞间有缝隙连接（C对）。D细胞分泌生长抑素，以旁分泌方式经缝隙连接直接作用于邻近的A细胞、B细胞或pp细胞，抑制这些细胞的分泌活动”（ABD 对）。",
"source_url": "",
"source_note": "本卡由课程团队提供的医学题库导入，解析与考点出处来自原始题库文档。",
"version": "题库导入",
"scope": "nursing·基础医学拓展",
"exceptions": "",
"misconceptions": [],
"lay_terms": [],
"reviewer": "知护课程团队",
"review_status": "课程团队已复核",
"updated_at": "2026-10-31",
"node_slug": "nur_extra_173",
"topic_slug": "nur_extra_173"
},
{
"knowledge_id": "K-NUR-174",
"node_id": "nursing",
"title": "心脏收缩力增强时，静脉回心血量增加，这主…",
"claim": "心脏收缩为推动血液在心血管系统内循环提供动力。因此，静脉回心血量与心肌收缩力呈正变关系。心肌收缩力增强时，射血时心室排空就较完全，在心舒期室内压就较低（D 对），因而对心房和静脉内血液的抽吸力量就较大，回心血量增多。",
"source": "5版生理学P94",
"source_location": "（5版生理学P94）“如果心脏收缩力量强，射血时心室排空较完全，心舒期心室内压低，对心房和大静脉内血液的抽吸力量较大，静脉回心血量增多”(D 对)。",
"source_url": "",
"source_note": "本卡由课程团队提供的医学题库导入，解析与考点出处来自原始题库文档。",
"version": "题库导入",
"scope": "nursing·基础医学拓展",
"exceptions": "",
"misconceptions": [],
"lay_terms": [],
"reviewer": "知护课程团队",
"review_status": "课程团队已复核",
"updated_at": "2026-10-31",
"node_slug": "nur_extra_174",
"topic_slug": "nur_extra_174"
},
{
"knowledge_id": "K-NUR-175",
"node_id": "nursing",
"title": "发生右心衰时，引起组织水肿的主要原因",
"claim": "组织液的生成主要与有效滤过压有关，有效滤过压=（毛细血管血压+组织液胶体渗透压）－（组织液静水压+血浆胶体渗透压）。右心衰竭的病人体循环静脉压增高，静脉回流受阻，全身毛细血管后阻力增大，毛细血管血压增高（A 对），有效滤过压增高，使组织液生成过多，所以下肢水肿。血浆胶体渗透压降低（B 错）主要见于白蛋白降低，组织液生成增多。组织液静水压降低（C 错）对组织液的生成影响较小。淋巴回流受阻（D 错）主要见于丝虫病患者的淋巴管被堵塞，含蛋白质的淋巴液在组织间隙集聚，形成淋巴水肿。毛细血管通透性增高（E 错）引起的水肿主要是由于炎症、过敏反应等。",
"source": "生理学P118",
"source_location": "（生理学P118）“全身或局部的静脉压升高是有效流体静压增高的主要成因。例如，右心衰竭可引起体循环静脉压增高，静脉回流受阻，导致毛细血管有效流体静压（A 对）增高，引起全身性水肿”。",
"source_url": "",
"source_note": "本卡由课程团队提供的医学题库导入，解析与考点出处来自原始题库文档。",
"version": "题库导入",
"scope": "nursing·基础医学拓展",
"exceptions": "",
"misconceptions": [],
"lay_terms": [],
"reviewer": "知护课程团队",
"review_status": "课程团队已复核",
"updated_at": "2026-10-31",
"node_slug": "nur_extra_175",
"topic_slug": "nur_extra_175"
},
{
"knowledge_id": "K-NUR-176",
"node_id": "nursing",
"title": "本体感受器，不存在于",
"claim": "本体感受器分布在肌（A 对）、肌腱（B 对）、关节（E 对）、韧带和内耳（D 对）的位置觉器等处，而眼（C 错，为本题正确答案）属于外感受器。",
"source": "系统解剖学P234",
"source_location": "（系统解剖学P234）“本体感受器：分布在肌（A 对）、肌腱（B 对）、关节（E 对）、韧带和内耳（D 对）的位置觉器等处，接受机体运动和平衡变化时产生的刺激”（C 错，为本题正确答案）。",
"source_url": "",
"source_note": "本卡由课程团队提供的医学题库导入，解析与考点出处来自原始题库文档。",
"version": "题库导入",
"scope": "nursing·基础医学拓展",
"exceptions": "",
"misconceptions": [],
"lay_terms": [],
"reviewer": "知护课程团队",
"review_status": "课程团队已复核",
"updated_at": "2026-10-31",
"node_slug": "nur_extra_176",
"topic_slug": "nur_extra_176"
},
{
"knowledge_id": "K-NUR-177",
"node_id": "nursing",
"title": "对于愤怒的病人，护士正确的做法是",
"claim": "视患者的愤怒、生气为一种正常的反应，不要采取任何攻击性或指责性行为。患者的愤怒、生气不是针对护士的，而是对恐惧、无助、悲哀等负性情绪的一种发泄。护士应理解患者的愤怒，采用治疗性的沟通技巧，如适时的聆听、沉默、触摸，以缓解患者的怒气，也就是允许病人发泄并作出正面反应（D）。",
"source": "5版护理学导论P231",
"source_location": "（5版护理学导论P231）“（2）愤怒期：视患者的愤怒、生气为一种正常的反应，不要采取任何攻击性或指责性行为。患者的愤怒、生气不是针对护士的，而是对恐惧、无助、悲哀等负性情绪的一种发泄。护士应理解患者的愤怒，采用治疗性的沟通技巧，如适时的聆听、沉默、触摸，以缓解患者的怒气。对有过激行为的患者，应采取安全措施，使其免受伤害”(D 对)。",
"source_url": "",
"source_note": "本卡由课程团队提供的医学题库导入，解析与考点出处来自原始题库文档。",
"version": "题库导入",
"scope": "nursing·基础医学拓展",
"exceptions": "",
"misconceptions": [],
"lay_terms": [],
"reviewer": "知护课程团队",
"review_status": "课程团队已复核",
"updated_at": "2026-10-31",
"node_slug": "nur_extra_177",
"topic_slug": "nur_extra_177"
},
{
"knowledge_id": "K-NUR-178",
"node_id": "nursing",
"title": "点突变（碱基错配）可导致",
"claim": "点突变（碱基错配）发生在编码区可引起三联体密码子发生改变，导致氨基酸被置换（A 对）。如血红蛋白 β 基因的第 6 位密码子 GAG 点突变为 GTG，可导致谷氨酸被置换为缬氨酸，造成镰形红细胞性贫血。读码框移（B 错）由碱基缺失或插入导致。",
"source": "4版生物化学P103",
"source_location": "（4版生物化学P103）“DNA 分子上的碱基发生错配称为点突变，包括碱基的转换、颠换”。",
"source_url": "",
"source_note": "本卡由课程团队提供的医学题库导入，解析与考点出处来自原始题库文档。",
"version": "题库导入",
"scope": "nursing·基础医学拓展",
"exceptions": "",
"misconceptions": [],
"lay_terms": [],
"reviewer": "知护课程团队",
"review_status": "课程团队已复核",
"updated_at": "2026-10-31",
"node_slug": "nur_extra_178",
"topic_slug": "nur_extra_178"
},
{
"knowledge_id": "K-NUR-179",
"node_id": "nursing",
"title": "下列属于护理计划阶段工作内容的是",
"claim": "本题考查护理计划阶段的工作内容。护理计划是护理程序的第三步，是护士在评估及诊断的基础上，综合运用多学科知识，对服务对象的健康问题、护理目标及护士所要索取的护理措施的一种书面说明，通过护理计划，可以使护理活动有组织、有系统地进行，以满足服务对象的具体需要。护理计划包括四方面内容：①排列护理诊断的优先顺序；②确定预期目标（C 对）；③制订护理措施；④护理计划成文。• A：收集资料 → 评估阶段• D：提出护理诊断 → 诊断阶段• B：实施护理措施 → 实施阶段• E：评价预期目标 → 评价阶段",
"source": "5版护理学导论P145",
"source_location": "（5版护理学导论P145）“护理计划包括四方面内容：①排列护理诊断的优先顺序；②确定预期目标（C 对）；③制订护理措施；④护理计划成文”。",
"source_url": "",
"source_note": "本卡由课程团队提供的医学题库导入，解析与考点出处来自原始题库文档。",
"version": "题库导入",
"scope": "nursing·基础医学拓展",
"exceptions": "",
"misconceptions": [],
"lay_terms": [],
"reviewer": "知护课程团队",
"review_status": "课程团队已复核",
"updated_at": "2026-10-31",
"node_slug": "nur_extra_179",
"topic_slug": "nur_extra_179"
},
{
"knowledge_id": "K-NUR-180",
"node_id": "nursing",
"title": "可被银盐染色的纤维是",
"claim": "网状纤维（A 对）于镀银染色切片中呈黑色，即可被银盐染色。胶原纤维（B 错）在 HE 染色切片中呈嗜酸性，为粉红色。弹性纤维（D 错）在 HE 染色切片中着淡红色（醛复红染色将弹性纤维染成紫色）。",
"source": "5版人体形态学P35",
"source_location": "（5版人体形态学P35）“网状纤维（A 对）银染色法显示黑色，又称嗜银纤维”。",
"source_url": "",
"source_note": "本卡由课程团队提供的医学题库导入，解析与考点出处来自原始题库文档。",
"version": "题库导入",
"scope": "nursing·基础医学拓展",
"exceptions": "",
"misconceptions": [],
"lay_terms": [],
"reviewer": "知护课程团队",
"review_status": "课程团队已复核",
"updated_at": "2026-10-31",
"node_slug": "nur_extra_180",
"topic_slug": "nur_extra_180"
},
{
"knowledge_id": "K-NUR-181",
"node_id": "nursing",
"title": "RNA 主要存在于",
"claim": "RNA 主要存在于细胞质（A 对）内，而 DNA 主要存在于细胞核（B 错）内，还存在于线粒体（C 错）。溶酶体（E）几乎不含核酸。",
"source": "5版生物化学P24",
"source_location": "（5版生物化学P24）“RNA 分布于细胞质（A 对）、细胞核和线粒体内”。",
"source_url": "",
"source_note": "本卡由课程团队提供的医学题库导入，解析与考点出处来自原始题库文档。",
"version": "题库导入",
"scope": "nursing·基础医学拓展",
"exceptions": "",
"misconceptions": [],
"lay_terms": [],
"reviewer": "知护课程团队",
"review_status": "课程团队已复核",
"updated_at": "2026-10-31",
"node_slug": "nur_extra_181",
"topic_slug": "nur_extra_181"
},
{
"knowledge_id": "K-NUR-182",
"node_id": "nursing",
"title": "肾蒂内主要结构由上向下依次为",
"claim": "肾内侧缘中部凹陷称肾门，是肾的血管、淋巴管、神经及肾盂的出入之处。出入肾门的这些结构被结缔组织包裹在一起称肾蒂。肾蒂内各结构的排列关系，自前向后顺序为肾静脉、肾动脉和肾盂末端；自上向下顺序为肾动脉、肾静脉和肾盂（A 对）。记忆口诀：从上到下：动 → 静 → 盂从前到后：静 → 动 → 盂",
"source": "5版人体形态学P154",
"source_location": "（5版人体形态学P154）“肾蒂内主要结构的排列关系…自上而下依次为肾动脉、肾静脉和肾盂”（A 对）。",
"source_url": "",
"source_note": "本卡由课程团队提供的医学题库导入，解析与考点出处来自原始题库文档。",
"version": "题库导入",
"scope": "nursing·基础医学拓展",
"exceptions": "",
"misconceptions": [],
"lay_terms": [],
"reviewer": "知护课程团队",
"review_status": "课程团队已复核",
"updated_at": "2026-10-31",
"node_slug": "nur_extra_182",
"topic_slug": "nur_extra_182"
},
{
"knowledge_id": "K-NUR-183",
"node_id": "nursing",
"title": "战争带来的伤残与死亡，属于健康影响因素中…",
"claim": "战争属于宏观社会政治层面，归属于社会环境因素。文化因素侧重风俗、信仰、价值观；战争不属于文化因素。",
"source": "5版护理学导论P28",
"source_location": "（5版护理学导论P28）“（2）社会环境（C 对）：与健康有关的社会环境主要包括政治制度、经济状况、文化教育、科技发展、婚姻、家庭及福利等多个方面”。",
"source_url": "",
"source_note": "本卡由课程团队提供的医学题库导入，解析与考点出处来自原始题库文档。",
"version": "题库导入",
"scope": "nursing·基础医学拓展",
"exceptions": "",
"misconceptions": [],
"lay_terms": [],
"reviewer": "知护课程团队",
"review_status": "课程团队已复核",
"updated_at": "2026-10-31",
"node_slug": "nur_extra_183",
"topic_slug": "nur_extra_183"
},
{
"knowledge_id": "K-NUR-184",
"node_id": "nursing",
"title": "不具有交感和副交感双重分布的器官有",
"claim": "自主神经系统分为交感神经和副交感神经，多数内脏器官接受双重支配，但部分器官例外。肾上腺髓质（B 对）仅接受交感神经节前纤维支配，无副交感神经分布，因此不具有双重支配。肾（A 错）同时接受交感神经和副交感神经支配，调节肾血流量和尿生成。膀胱（C 错）受交感神经和副交感神经双重支配，控制排尿反射。支气管（D 错）平滑肌和腺体受双重支配，调节气道口径和分泌。心（E 错）接受交感神经和副交感神经双重支配，调节心率和收缩力。",
"source": "系统解剖学P370",
"source_location": "（系统解剖学P370）“副交感神经的分布则不如交感神经广泛，一般认为大部分血管、汗腺、竖毛肌、肾上腺髓质只接受交感神经支配”（B 对）。",
"source_url": "",
"source_note": "本卡由课程团队提供的医学题库导入，解析与考点出处来自原始题库文档。",
"version": "题库导入",
"scope": "nursing·基础医学拓展",
"exceptions": "",
"misconceptions": [],
"lay_terms": [],
"reviewer": "知护课程团队",
"review_status": "课程团队已复核",
"updated_at": "2026-10-31",
"node_slug": "nur_extra_184",
"topic_slug": "nur_extra_184"
}
],
"node_map": {
"measurement_device_posture": [
"K-BP-001"
],
"measurement_schedule_repeat": [
"K-BP-002"
],
"reading_interpretation": [
"K-BP-003"
],
"medication_boundary": [
"K-BP-004"
],
"risk_referral": [
"K-BP-005"
],
"home_reading_interpretation_boundary": [
"K-BP-006"
],
"measurement_condition_confounder": [
"K-BP-001"
],
"elderly_concern_shared_decision": [
"K-COM-001"
],
"hypotension_symptom_check": [
"K-BP-004"
],
"unverified_remedy_boundary": [
"K-BP-004"
],
"history_chief_complaint": [
"K-CLIN-101"
],
"chest_pain_red_flag": [
"K-CLIN-111"
],
"preanalytical_check": [
"K-CLIN-137"
],
"plain_language_explain": [
"K-CLIN-156"
],
"scope_of_practice_boundary": [
"K-CLIN-146"
],
"emergency_abcde_sequence": [
"K-CLIN-128"
],
"differential_reasoning": [
"K-CLIN-113"
],
"uncertainty_expression": [
"K-CLIN-159"
],
"referral_trigger": [
"K-CLIN-123"
],
"shared_decision": [
"K-CLIN-160"
],
"preanalytic_identity_check": [
"K-MT-113"
],
"critical_value_closed_loop": [
"K-MT-164"
],
"imaging_accompanying_protection": [
"K-MT-142"
],
"calibration_reagent_lot_change": [
"K-MT-120"
],
"report_scope_boundary": [
"K-MT-169"
],
"clinical_mismatch_review_sequence": [
"K-MT-165"
],
"specimen_rejection_disposition": [
"K-MT-111"
],
"qc_out_of_control_hold": [
"K-MT-119"
],
"imaging_critical_escalation": [
"K-MT-168"
],
"report_correction_flow": [
"K-MT-170"
],
"vital_signs_monitoring_frequency": [
"K-NUR-118"
],
"medication_administration_check": [
"K-NUR-128"
],
"fall_risk_assessment": [
"K-NUR-137"
],
"patient_education_teach_back": [
"K-NUR-136"
],
"sbar_handover": [
"K-NUR-169"
],
"deterioration_priority_response": [
"K-NUR-131"
],
"critical_value_reporting": [
"K-NUR-171"
],
"interprofessional_referral": [
"K-NUR-143"
],
"diagnosis_disclosure_boundary": [
"K-NUR-166"
],
"physical_restraint_decision": [
"K-NUR-126"
],
"four_diagnoses_sequence": [
"K-TCM-117"
],
"tongue_diagnosis_conditions": [
"K-TCM-111"
],
"inquiry_completeness": [
"K-TCM-113"
],
"constitution_service_boundary": [
"K-TCM-145"
],
"health_education_wording": [
"K-TCM-127"
],
"emergency_stroke_referral": [
"K-TCM-166"
],
"herb_drug_interaction_check": [
"K-TCM-168"
],
"insufficient_info_expression": [
"K-TCM-126"
],
"high_fever_emergency_referral": [
"K-TCM-167"
],
"prescription_scope_boundary": [
"K-TCM-108"
],
"pre_training_safety_screen": [
"K-RH-COURSE-006"
],
"stop_signal_recognition": [
"K-RH-COURSE-006"
],
"functional_assessment_standard": [
"K-RH-COURSE-001"
],
"adl_training_principles": [
"K-RH-COURSE-003"
],
"caregiver_training_return_demo": [
"K-RH-COURSE-003"
],
"acute_change_first_response": [
"K-RH-COURSE-006"
],
"referral_threshold_decision": [
"K-RH-COURSE-006",
"K-RH-COURSE-004"
],
"shared_goal_setting": [
"K-RH-COURSE-002"
],
"discharge_transition_planning": [
"K-RH-COURSE-003"
],
"assessment_result_communication": [
"K-RH-COURSE-001"
],
"health_record_baseline": [
"K-BP-003"
],
"measurement_conditions": [
"K-BP-001"
],
"followup_frequency_record": [
"K-BP-002"
],
"health_education_keypoints": [
"K-BP-001"
],
"followup_medication_record": [
"K-BP-004"
],
"referral_red_flag": [
"K-BP-005"
],
"trend_communication": [
"K-BP-003"
],
"shared_decision_plan": [
"K-BP-002"
],
"home_clinic_discordance": [
"K-BP-006"
],
"urgent_symptom_triage": [
"K-BP-005"
]
}
},
"cases": [
{
"case_id": "D1",
"disease_id": "type_2_diabetes",
"disease_label": "2型糖尿病",
"title": "李叔叔的糖尿病随访困惑",
"recommended_majors": [],
"professional_focus": {
"clinical_medicine": "核对症状、既往诊疗与并发症筛查情况，不凭单次记录下结论",
"nursing": "核对自我监测和用药执行情况，用通俗语言完成健康教育",
"health_management": "建立连续随访计划，识别漏访原因并协调复诊资源",
"rehabilitation": "核对活动习惯及运动安全信息，不制定个体化医疗处方"
},
"public_profile": {
"name": "李叔叔",
"age": 58,
"setting": "社区慢病随访",
"notice": "全部资料均为合成"
},
"clinical_data": [
{
"day": "D1",
"time": "07:20",
"item": "空腹血糖记录",
"value": "8.1 mmol/L",
"note": "家用仪器自测"
},
{
"day": "D4",
"time": "07:15",
"item": "空腹血糖记录",
"value": "7.6 mmol/L",
"note": "家用仪器自测"
}
],
"persona": {
"personality": "随和但怕麻烦",
"concern": "觉得没有明显不舒服就不必复诊",
"speech_style": "简短、常说差不多",
"initial_emotion": "放松"
},
"hidden_info": [
{
"id": "H1",
"value": "近两周有三次忘记按原医嘱用药",
"sensitivity": "synthetic"
},
{
"id": "H2",
"value": "半年没有完成并发症筛查",
"sensitivity": "synthetic"
}
],
"release_conditions": {
"H1": [
"ask_medication_adherence_without_blame"
],
"H2": [
"ask_followup_and_screening"
]
},
"task": "核对连续记录、用药执行和复诊筛查情况，解释持续管理的意义，并共同制定可执行的复诊计划。",
"initial_state": {
"revealed_info": [],
"emotion": "放松",
"concern_acknowledged": false,
"boundary_bait_used": false
},
"must_cover": [
"specific_history",
"trend_interpretation",
"medication_boundary",
"followup_plan",
"teach_back"
],
"variant_of": null,
"knowledge_refs": [
"K-DM-001",
"K-DM-002",
"K-COM-001"
],
"review_status": "课程团队维护",
"boundary_behaviors": [
"diagnose_real_person",
"recommend_specific_drug_or_dose",
"suggest_stop_switch_adjust_medication"
]
},
{
"case_id": "D1-V1",
"disease_id": "type_2_diabetes",
"disease_label": "2型糖尿病",
"title": "周阿姨的血糖记录和保健品选择",
"recommended_majors": [],
"professional_focus": {
"clinical_medicine": "核对记录条件和伴随表现，说明信息限制并建议规范评估",
"nursing": "识别自行替代治疗的风险，完成用药边界和理解确认",
"health_management": "查明随访中断原因，协调正规复诊和年度筛查",
"rehabilitation": "关注活动计划与监测衔接，不评价药物疗效"
},
"public_profile": {
"name": "周阿姨",
"age": 64,
"setting": "家庭随访",
"notice": "全部资料均为合成"
},
"clinical_data": [
{
"day": "D1",
"time": "06:50",
"item": "空腹血糖记录",
"value": "7.9 mmol/L",
"note": "未记录前一晚饮食"
},
{
"day": "D3",
"time": "07:30",
"item": "空腹血糖记录",
"value": "8.4 mmol/L",
"note": "测量时间不同"
}
],
"persona": {
"personality": "谨慎、容易相信熟人经验",
"concern": "担心长期用药，想用保健品替代",
"speech_style": "反复确认能不能少吃药",
"initial_emotion": "犹豫"
},
"hidden_info": [
{
"id": "H1",
"value": "已自行减少一次用药",
"sensitivity": "synthetic"
},
{
"id": "H2",
"value": "购买了宣称可以降糖的保健品",
"sensitivity": "synthetic"
}
],
"release_conditions": {
"H1": [
"ask_medication_adherence_without_blame"
],
"H2": [
"ask_remedy_use",
"acknowledge_concern"
]
},
"task": "澄清记录条件和真实顾虑，守住用药及保健品边界，并协商正规复诊与连续记录计划。",
"initial_state": {
"revealed_info": [],
"emotion": "犹豫",
"concern_acknowledged": false,
"boundary_bait_used": true
},
"must_cover": [
"specific_history",
"trend_interpretation",
"medication_boundary",
"remedy_boundary",
"shared_action"
],
"variant_of": "D1",
"knowledge_refs": [
"K-DM-001",
"K-DM-002",
"K-COM-001"
],
"review_status": "课程团队维护",
"boundary_behaviors": [
"diagnose_real_person",
"recommend_specific_drug_or_dose",
"suggest_stop_switch_adjust_medication",
"endorse_unverified_remedy"
]
},
{
"case_id": "P1",
"disease_id": "copd",
"disease_label": "慢性阻塞性肺疾病",
"title": "赵师傅的吸入装置使用困难",
"recommended_majors": [
"nursing",
"clinical_medicine",
"health_management"
],
"professional_focus": {
"clinical_medicine": "核对症状变化、依从性和装置使用，不直接把效果不佳归因于疾病进展",
"nursing": "请患者演示装置使用，分步纠正并采用回示法确认",
"health_management": "记录随访症状、依从性和转诊结果，安排复查",
"rehabilitation": "核对活动耐量变化和停止活动信号，不自行调整治疗"
},
"public_profile": {
"name": "赵师傅",
"age": 67,
"setting": "社区卫生服务中心随访",
"notice": "全部资料均为合成"
},
"clinical_data": [
{
"day": "本次随访",
"item": "主诉",
"value": "走快时气短",
"note": "近一月无明显突发加重"
},
{
"day": "本次随访",
"item": "吸入装置",
"value": "随身携带",
"note": "未现场演示"
}
],
"persona": {
"personality": "认真但容易紧张",
"concern": "担心自己装置用错，又怕被责备",
"speech_style": "说话慢，愿意配合演示",
"initial_emotion": "忐忑"
},
"hidden_info": [
{
"id": "H1",
"value": "经常忘记完整完成吸入步骤",
"sensitivity": "synthetic"
},
{
"id": "H2",
"value": "从未在随访时被要求回示操作",
"sensitivity": "synthetic"
}
],
"release_conditions": {
"H1": [
"ask_device_demonstration_without_blame"
],
"H2": [
"ask_previous_training"
]
},
"task": "核对症状与依从性，请患者演示吸入装置，使用分步指导和回示法确认，并安排复查。",
"initial_state": {
"revealed_info": [],
"emotion": "忐忑",
"concern_acknowledged": false,
"boundary_bait_used": false
},
"must_cover": [
"symptom_history",
"device_demonstration",
"adherence",
"teach_back",
"followup_plan"
],
"variant_of": null,
"knowledge_refs": [
"K-COPD-001",
"K-COPD-002",
"K-COM-001"
],
"review_status": "课程团队维护",
"boundary_behaviors": [
"diagnose_real_person",
"recommend_specific_drug_or_dose",
"suggest_stop_switch_adjust_medication"
]
},
{
"case_id": "P1-V1",
"disease_id": "copd",
"disease_label": "慢性阻塞性肺疾病",
"title": "孙阿姨突然加重的呼吸困难",
"recommended_majors": [
"clinical_medicine",
"nursing",
"health_management"
],
"professional_focus": {
"clinical_medicine": "快速核对急性变化和警示表现，明确及时转诊",
"nursing": "识别急性加重线索，停止常规宣教并优先执行安全分流",
"health_management": "完成转诊协调和后续追踪，不延迟处理",
"rehabilitation": "立即停止活动训练并按安全规则转介"
},
"public_profile": {
"name": "孙阿姨",
"age": 70,
"setting": "社区随访电话",
"notice": "全部资料均为合成"
},
"clinical_data": [
{
"day": "今天",
"item": "症状变化",
"value": "呼吸困难明显加重并伴胸闷",
"note": "说完整句子比平时困难"
},
{
"day": "近两天",
"item": "咳痰",
"value": "痰量增加",
"note": "尚未就医"
}
],
"persona": {
"personality": "怕麻烦、想继续观察",
"concern": "担心去医院花时间",
"speech_style": "气短、回答简短",
"initial_emotion": "焦虑"
},
"hidden_info": [
{
"id": "H1",
"value": "家属在旁，可协助联系急救或就医",
"sensitivity": "synthetic"
}
],
"release_conditions": {
"H1": [
"ask_available_support"
]
},
"task": "识别明显急性加重线索，清楚说明不能继续等待，完成及时转介和家属协同。",
"initial_state": {
"revealed_info": [],
"emotion": "焦虑",
"concern_acknowledged": false,
"boundary_bait_used": false
},
"must_cover": [
"identify_warning",
"timely_referral",
"support_coordination",
"plain_explanation"
],
"variant_of": "P1",
"knowledge_refs": [
"K-COPD-002",
"K-COM-001"
],
"review_status": "课程团队维护",
"boundary_behaviors": [
"diagnose_real_person",
"delay_referral",
"recommend_specific_drug_or_dose"
]
},
{
"case_id": "S1",
"disease_id": "stroke_rehabilitation",
"disease_label": "脑卒中康复",
"title": "陈伯伯出院后的居家康复顾虑",
"recommended_majors": [
"rehabilitation",
"nursing",
"health_management"
],
"professional_focus": {
"clinical_medicine": "核对出院信息和新发症状，说明诊断与处置边界",
"nursing": "核对日常照护、跌倒风险和家属支持，完成安全宣教",
"health_management": "连接复诊、康复和社区资源，形成可追踪计划",
"rehabilitation": "围绕功能目标、活动安全和患者参与制定训练沟通方案"
},
"public_profile": {
"name": "陈伯伯",
"age": 69,
"setting": "卒中后居家康复首次访视",
"notice": "全部资料均为合成"
},
"clinical_data": [
{
"day": "出院后第10天",
"item": "活动情况",
"value": "室内短距离行走需家属陪同",
"note": "未出现新发神经症状"
},
{
"day": "本周",
"item": "康复执行",
"value": "因担心跌倒而减少练习",
"note": "家属希望了解安全边界"
}
],
"persona": {
"personality": "谨慎、有挫败感",
"concern": "害怕跌倒后给家人添麻烦",
"speech_style": "语速慢，愿意表达目标",
"initial_emotion": "低落"
},
"hidden_info": [
{
"id": "H1",
"value": "最想恢复自己去卫生间",
"sensitivity": "synthetic"
},
{
"id": "H2",
"value": "家中走道有杂物且夜间照明不足",
"sensitivity": "synthetic"
}
],
"release_conditions": {
"H1": [
"ask_personal_goal"
],
"H2": [
"ask_home_safety_environment"
]
},
"task": "了解患者最重视的功能目标和居家风险，与患者及家属协商安全、可执行的康复下一步。",
"initial_state": {
"revealed_info": [],
"emotion": "低落",
"concern_acknowledged": false,
"boundary_bait_used": false
},
"must_cover": [
"personal_goal",
"function_history",
"home_safety",
"shared_action",
"teach_back"
],
"variant_of": null,
"knowledge_refs": [
"K-STROKE-001",
"K-COM-001"
],
"review_status": "课程团队维护",
"boundary_behaviors": [
"diagnose_real_person",
"promise_recovery_outcome",
"prescribe_unsupervised_intensity"
]
},
{
"case_id": "S1-V1",
"disease_id": "stroke_rehabilitation",
"disease_label": "脑卒中康复",
"title": "康复训练中突然出现的言语含糊",
"recommended_majors": [
"rehabilitation",
"nursing",
"clinical_medicine"
],
"professional_focus": {
"clinical_medicine": "识别卒中警示表现，记录出现时间并立即启动急救转介",
"nursing": "停止训练、保障现场安全并协助呼叫120",
"health_management": "不以预约随访替代急救，协助联系家属和急救资源",
"rehabilitation": "立即停止训练，识别中风120线索并执行紧急分流"
},
"public_profile": {
"name": "刘阿姨",
"age": 66,
"setting": "社区康复训练室",
"notice": "全部资料均为合成"
},
"clinical_data": [
{
"day": "训练中",
"item": "突然变化",
"value": "说话含糊、一侧手臂无力",
"note": "约5分钟前出现"
},
{
"day": "当前",
"item": "意识",
"value": "能够回应",
"note": "家属在场"
}
],
"persona": {
"personality": "想坚持训练、不愿麻烦别人",
"concern": "认为休息一下就会好",
"speech_style": "言语含糊",
"initial_emotion": "困惑"
},
"hidden_info": [
{
"id": "H1",
"value": "家属手机可立即拨打120",
"sensitivity": "synthetic"
}
],
"release_conditions": {
"H1": [
"ask_available_support"
]
},
"task": "立即停止训练，识别卒中警示表现和出现时间，清楚提示拨打120，不等待症状自行消失。",
"initial_state": {
"revealed_info": [],
"emotion": "困惑",
"concern_acknowledged": false,
"boundary_bait_used": false
},
"must_cover": [
"identify_warning",
"symptom_onset_time",
"call_emergency",
"do_not_delay"
],
"variant_of": "S1",
"knowledge_refs": [
"K-STROKE-002",
"K-COM-001"
],
"review_status": "课程团队维护",
"boundary_behaviors": [
"diagnose_real_person",
"delay_referral",
"recommend_specific_drug_or_dose"
]
},
{
"case_id": "CL1",
"disease_id": "clinical_comprehensive",
"disease_label": "临床综合评估",
"title": "急诊胸痛患者的综合接诊",
"recommended_majors": [
"clinical_medicine"
],
"professional_focus": {
"clinical_medicine": "完成主诉现病史、伴随症状、既往史与用药史采集，识别高危线索并及时升级处置"
},
"public_profile": {
"name": "吴先生",
"age": 54,
"setting": "急诊分诊后的首次接诊",
"notice": "全部资料均为合成"
},
"clinical_data": [
{
"item": "主诉",
"value": "活动后胸部压迫感约20分钟",
"note": "伴出汗，休息后仍未完全缓解"
},
{
"item": "当前状态",
"value": "神志清楚、紧张",
"note": "尚未完成系统问诊"
}
],
"persona": {
"personality": "焦虑、希望马上知道诊断",
"concern": "担心心脏出问题",
"speech_style": "回答急促，会追问是不是心梗",
"initial_emotion": "紧张"
},
"hidden_info": [
{
"id": "H1",
"value": "疼痛向左肩放射",
"sensitivity": "synthetic"
},
{
"id": "H2",
"value": "有吸烟史和高血压史，具体用药记不清",
"sensitivity": "synthetic"
}
],
"release_conditions": {
"H1": [
"ask_pain_character_and_radiation"
],
"H2": [
"ask_risk_and_medication_history"
]
},
"task": "完成系统问诊、识别危险线索、说明信息限制、及时启动上级评估，并用简洁语言安抚和告知下一步。",
"initial_state": {
"revealed_info": [],
"emotion": "紧张",
"concern_acknowledged": false,
"boundary_bait_used": true
},
"must_cover": [
"history_structure",
"warning_identification",
"timely_escalation",
"diagnostic_boundary",
"patient_explanation",
"handoff_summary"
],
"variant_of": null,
"knowledge_refs": [
"K-CLIN-001",
"K-CLIN-002",
"K-COM-001"
],
"review_status": "课程团队维护",
"boundary_behaviors": [
"diagnose_real_person",
"delay_referral",
"recommend_specific_drug_or_dose"
]
},
{
"case_id": "CL2",
"disease_id": "sepsis_early_recognition",
"disease_label": "脓毒症早期识别",
"title": "发热伴意识改变的早期识别与转诊",
"recommended_majors": [
"clinical_medicine"
],
"professional_focus": {
"clinical_medicine": "围绕发热、意识改变与灌注线索完成快速信息采集，识别需要紧急升级处理的信号，及时转诊并做结构化交接，不给诊断结论"
},
"public_profile": {
"name": "周先生",
"age": 72,
"setting": "急诊留观区首诊（家属陪同，病史由患者与家属共同提供）",
"notice": "全部资料均为合成"
},
"clinical_data": [
{
"item": "主诉",
"value": "发热两天，今天上午起反应变慢、问话答不上来",
"note": "家属发现叫醒后很快又睡过去"
},
{
"item": "当前状态",
"value": "体温偏高、手脚发凉、口唇干燥",
"note": "尚未完成系统评估，无检验结果"
}
],
"persona": {
"personality": "反应迟钝、回答断续，家属着急",
"concern": "担心是不是脑子出了问题",
"speech_style": "以家属代述为主，反复问要不要做很多检查",
"initial_emotion": "焦急"
},
"hidden_info": [
{
"id": "H1",
"value": "近一天尿量明显减少，家属说半天没有排尿",
"sensitivity": "synthetic",
"release_round": 3
},
{
"id": "H2",
"value": "两周前做过一次小手术，身上还留着管路，家属没有主动提",
"sensitivity": "synthetic",
"release_round": 5
}
],
"release_conditions": {
"H1": [
"ask_urine_output_and_fluid_intake"
],
"H2": [
"ask_recent_procedure_and_indwelling_lines"
]
},
"task": "在有限时间内完成关键信息采集，识别意识改变与灌注不足线索，说明现有信息不能下结论，启动紧急评估并向接诊医师做结构化交接。",
"initial_state": {
"revealed_info": [],
"emotion": "焦急",
"concern_acknowledged": false,
"boundary_bait_used": true
},
"must_cover": [
"CLIN-CORE",
"RISK-01",
"DIAG-01"
],
"variant_of": null,
"knowledge_refs": [
"K-CLIN-110",
"K-CLIN-129",
"K-CLIN-130"
],
"review_status": "课程团队维护",
"boundary_behaviors": [
"diagnose_real_person",
"delay_referral",
"reassure_without_basis"
]
},
{
"case_id": "CL3",
"disease_id": "acute_abdomen_red_flags",
"disease_label": "急性腹痛",
"title": "急性腹痛的危险信号识别与转诊判断",
"recommended_majors": [
"clinical_medicine"
],
"professional_focus": {
"clinical_medicine": "按时间轴与转移特点采集腹痛信息，识别腹膜炎与全身受累线索，判断是否需要急诊转诊，不替医师下诊断"
},
"public_profile": {
"name": "罗先生",
"age": 40,
"setting": "社区全科门诊（腹痛首诊）",
"notice": "全部资料均为合成"
},
"clinical_data": [
{
"item": "主诉",
"value": "上腹隐痛一天，六小时前转到右下腹，越来越疼",
"note": "走路时加重，不敢直腰"
},
{
"item": "当前状态",
"value": "体温 38.0 ℃ 左右，面色发红，躺着不敢动",
"note": "尚未查血，未做影像检查"
}
],
"persona": {
"personality": "能忍、怕耽误工作",
"concern": "想开点止痛药先回去上班",
"speech_style": "反复问能不能先吃药观察两天",
"initial_emotion": "烦躁"
},
"hidden_info": [
{
"id": "H1",
"value": "昨晚吐过一次后疼痛短暂缓解，今早按下去更疼、松手也疼",
"sensitivity": "synthetic",
"release_round": 3
},
{
"id": "H2",
"value": "上个月有过一次类似腹痛，自己好了，没有就诊",
"sensitivity": "synthetic",
"release_round": 5
}
],
"release_conditions": {
"H1": [
"ask_vomiting_and_abdominal_palpation_findings"
],
"H2": [
"ask_previous_similar_episodes"
]
},
"task": "完成腹痛时间轴与转移特点采集，识别需要急诊评估的危险信号，说明不能用止痛药掩盖病情，安排转诊并做交接。",
"initial_state": {
"revealed_info": [],
"emotion": "烦躁",
"concern_acknowledged": false,
"boundary_bait_used": true
},
"must_cover": [
"CLIN-CORE",
"RISK-01",
"DIAG-01"
],
"variant_of": null,
"knowledge_refs": [
"K-CLIN-113",
"K-CLIN-153",
"K-CLIN-154"
],
"review_status": "课程团队维护",
"boundary_behaviors": [
"diagnose_real_person",
"delay_referral",
"recommend_specific_drug_or_dose"
]
},
{
"case_id": "CL4",
"disease_id": "pediatric_fever_dehydration",
"disease_label": "儿童发热伴脱水",
"title": "儿童发热伴脱水的家长沟通与就医指征",
"recommended_majors": [
"clinical_medicine"
],
"professional_focus": {
"clinical_medicine": "向家长采集患儿进食、排尿与精神状态，评估脱水线索和就医指征，用家长能懂的语言说明并确认理解"
},
"public_profile": {
"name": "小宇（母亲代述）",
"age": 2,
"setting": "儿科门诊（母亲抱患儿就诊）",
"notice": "全部资料均为合成"
},
"clinical_data": [
{
"item": "主诉",
"value": "发热一天半，今天不爱喝水、没精神",
"note": "母亲说退热后也不见好转"
},
{
"item": "当前状态",
"value": "患儿先烦躁后转安静，口唇偏干，尿布半天没有湿",
"note": "未补液，未查血"
}
],
"persona": {
"personality": "紧张、反复自责",
"concern": "怕孩子脱水要住院",
"speech_style": "语速快，反复问要不要打针输液",
"initial_emotion": "焦虑"
},
"hidden_info": [
{
"id": "H1",
"value": "昨天开始拒食，只在喂药时喝几口水，尿量明显比平时少",
"sensitivity": "synthetic",
"release_round": 3
},
{
"id": "H2",
"value": "家里还留着上次生病剩下的药，母亲想问能不能直接给孩子吃",
"sensitivity": "synthetic",
"release_round": 5
}
],
"release_conditions": {
"H1": [
"ask_intake_urine_and_mental_state"
],
"H2": [
"ask_current_and_leftover_medication"
]
},
"task": "向家长系统采集进食、排尿与精神状态，识别脱水与需要就医的指征，用简单语言解释原因，说明不代替医师判断并确认家长理解。",
"initial_state": {
"revealed_info": [],
"emotion": "焦虑",
"concern_acknowledged": false,
"boundary_bait_used": true
},
"must_cover": [
"CLIN-CORE",
"EMPATHY-01",
"CHECK-01",
"ACTION-01"
],
"variant_of": null,
"knowledge_refs": [
"K-CLIN-121",
"K-CLIN-122",
"K-CLIN-110"
],
"review_status": "课程团队维护",
"boundary_behaviors": [
"recommend_specific_drug_or_dose",
"assume_understanding",
"reassure_without_basis"
]
},
{
"case_id": "CL5",
"disease_id": "dyspnea_exacerbation",
"disease_label": "呼吸困难急性加重",
"title": "呼吸困难急性加重的识别与处理边界",
"recommended_majors": [
"clinical_medicine"
],
"professional_focus": {
"clinical_medicine": "评估呼吸困难程度、体位与夜间症状线索，识别需要紧急处理的表现，守住不自行加药并及时转诊的边界"
},
"public_profile": {
"name": "孙阿姨",
"age": 67,
"setting": "社区卫生服务站（步行前来，坐下后仍喘）",
"notice": "全部资料均为合成"
},
"clinical_data": [
{
"item": "主诉",
"value": "喘了三天，昨晚躺下更憋，今天走几步就喘",
"note": "说话要停顿换气"
},
{
"item": "当前状态",
"value": "呼吸偏快，只能坐着，不能平卧",
"note": "随身带来吸入药，名称说不清"
}
],
"persona": {
"personality": "要强、不愿麻烦别人",
"concern": "怕被转去大医院花钱",
"speech_style": "一句一停，反复说没事",
"initial_emotion": "疲惫"
},
"hidden_info": [
{
"id": "H1",
"value": "最近一周夜里要坐起来才能喘匀，昨晚几乎没睡",
"sensitivity": "synthetic",
"release_round": 3
},
{
"id": "H2",
"value": "自己把吸入药加用了好几次，还翻出以前剩的口服药吃过",
"sensitivity": "synthetic",
"release_round": 5
}
],
"release_conditions": {
"H1": [
"ask_night_symptoms_and_posture"
],
"H2": [
"ask_inhaler_and_leftover_medication_use"
]
},
"task": "快速评估呼吸困难程度、体位与夜间症状，识别需要紧急处理的表现，说明不能自行加药，安排转诊并做交接。",
"initial_state": {
"revealed_info": [],
"emotion": "疲惫",
"concern_acknowledged": false,
"boundary_bait_used": true
},
"must_cover": [
"CLIN-CORE",
"RISK-01",
"BOUND-01"
],
"variant_of": null,
"knowledge_refs": [
"K-CLIN-112",
"K-CLIN-134",
"K-CLIN-154"
],
"review_status": "课程团队维护",
"boundary_behaviors": [
"delay_referral",
"suggest_stop_switch_adjust_medication",
"recommend_specific_drug_or_dose"
]
},
{
"case_id": "CL6",
"disease_id": "elderly_syncope_fall",
"disease_label": "老年晕厥与跌倒",
"title": "老年跌倒后评估与复发风险",
"recommended_majors": [
"clinical_medicine"
],
"professional_focus": {
"clinical_medicine": "采集跌倒或晕厥的现场经过、体位变化与全部用药，评估复发与受伤风险，安排进一步评估，不替患者调整药物"
},
"public_profile": {
"name": "陶爷爷",
"age": 81,
"setting": "社区随访（家中，跌倒后第二天）",
"notice": "全部资料均为合成"
},
"clinical_data": [
{
"item": "主诉",
"value": "昨天从椅子上站起来时眼前发黑，摔了一下",
"note": "没有骨折，左侧手臂有淤青"
},
{
"item": "当前状态",
"value": "能说清经过，起身时仍诉头晕",
"note": "家属不在家，本次未测血压"
}
],
"persona": {
"personality": "好强、觉得小题大做",
"concern": "怕被说老了不中用",
"speech_style": "轻描淡写，总说没事",
"initial_emotion": "抵触"
},
"hidden_info": [
{
"id": "H1",
"value": "半年来已有两次差点摔倒，都没告诉家人",
"sensitivity": "synthetic",
"release_round": 3
},
{
"id": "H2",
"value": "同时在吃几种药，最近觉得自己血压偏高，把其中一种自己加量了，也没复查",
"sensitivity": "synthetic",
"release_round": 5
}
],
"release_conditions": {
"H1": [
"ask_previous_near_falls_without_blame"
],
"H2": [
"ask_all_medications_and_recent_changes"
]
},
"task": "采集跌倒现场经过、体位变化与全部用药，识别复发与受伤风险，说明不能自行调整药物，安排进一步评估与随访。",
"initial_state": {
"revealed_info": [],
"emotion": "抵触",
"concern_acknowledged": false,
"boundary_bait_used": true
},
"must_cover": [
"CLIN-CORE",
"RISK-01",
"BOUND-01"
],
"variant_of": null,
"knowledge_refs": [
"K-CLIN-117",
"K-CLIN-125",
"K-CLIN-103"
],
"review_status": "课程团队维护",
"boundary_behaviors": [
"ignore_fall_risk",
"suggest_stop_switch_adjust_medication",
"blame_patient"
]
},
{
"case_id": "CL7",
"disease_id": "polypharmacy_conflict",
"disease_label": "多病共存多重用药",
"title": "多病共存患者的重复用药核对",
"recommended_majors": [
"clinical_medicine"
],
"professional_focus": {
"clinical_medicine": "逐盒核对患者自带药物的名称、成分与开方来源，识别重复成分和联用风险，只做记录与转诊，不给剂量也不建议停药"
},
"public_profile": {
"name": "韩阿姨",
"age": 76,
"setting": "全科门诊用药咨询（自带五种药）",
"notice": "全部资料均为合成"
},
"clinical_data": [
{
"item": "主诉",
"value": "头晕、乏力两周，想让医生看看是不是药吃重了",
"note": "药是不同医院分别开的"
},
{
"item": "当前状态",
"value": "神志清楚，走路略不稳",
"note": "五盒药中有两盒名称看起来很像"
}
],
"persona": {
"personality": "谨慎、记性不好",
"concern": "怕药吃重了伤身体",
"speech_style": "反复说自己也记不清哪个治什么",
"initial_emotion": "困惑"
},
"hidden_info": [
{
"id": "H1",
"value": "两个药盒上写的是同一种成分，她一直两种一起吃",
"sensitivity": "synthetic",
"release_round": 3
},
{
"id": "H2",
"value": "还在吃别人推荐的一种活血中成药，没带来，也没告诉开药的医生",
"sensitivity": "synthetic",
"release_round": 5
}
],
"release_conditions": {
"H1": [
"ask_to_read_labels_and_compare_ingredients"
],
"H2": [
"ask_otc_and_tcm_supplements"
]
},
"task": "逐项核对自带药物的名称、成分与开方来源，识别重复成分和联用风险，说明不自行停药或加量，把核对结果交回医师并安排随访。",
"initial_state": {
"revealed_info": [],
"emotion": "困惑",
"concern_acknowledged": false,
"boundary_bait_used": true
},
"must_cover": [
"CLIN-CORE",
"BOUND-01",
"ACTION-01"
],
"variant_of": null,
"knowledge_refs": [
"K-CLIN-103",
"K-CLIN-149",
"K-CLIN-151"
],
"review_status": "课程团队维护",
"boundary_behaviors": [
"suggest_stop_switch_adjust_medication",
"recommend_specific_drug_or_dose",
"endorse_unverified_remedy"
]
},
{
"case_id": "HM1",
"disease_id": "health_check_abnormality",
"disease_label": "体检指标异常",
"title": "体检报告里好几项箭头，她想问「是不是糖尿病」",
"recommended_majors": [
"health_management"
],
"professional_focus": {
"health_management": "按风险分层处理体检异常，说明信息不足与复查时间点，协调就诊与随访，不替医生下结论"
},
"public_profile": {
"name": "郑阿姨",
"age": 52,
"setting": "社区卫生服务中心健康管理门诊（体检报告解读随访）",
"notice": "全部资料均为合成"
},
"clinical_data": [
{
"item": "体检报告",
"value": "空腹血糖 7.4 mmol/L，报告标注「偏高」",
"note": "单位体检，仅测一次，未复查"
},
{
"item": "体检报告",
"value": "血压 148/92 mmHg",
"note": "单次测量，未记录测量前是否休息"
},
{
"item": "体检报告",
"value": "低密度脂蛋白 4.2 mmol/L，肝脏超声提示「轻度脂肪肝」",
"note": "报告建议「专科随诊」"
},
{
"item": "本次主诉",
"value": "想知道自己是不是已经得了糖尿病",
"note": "反复追问，希望当场得到结论"
}
],
"persona": {
"personality": "性子急、要答案",
"concern": "怕被贴上「糖尿病人」的标签，也怕复查花钱耽误上班",
"speech_style": "语速快，反复问「你就说是不是吧」",
"initial_emotion": "急切"
},
"hidden_info": [
{
"id": "H1",
"value": "近一个月常口干、夜里起夜两次，以为是「上火」没在意",
"sensitivity": "synthetic",
"release_round": 3
},
{
"id": "H2",
"value": "母亲有糖尿病史，自己一直回避复查，怕真查出来",
"sensitivity": "synthetic",
"release_round": 5
}
],
"release_conditions": {
"H1": [
"ask_symptom_change"
],
"H2": [
"ask_risk_and_medication_history"
]
},
"task": "把多项体检异常按尽快就诊、限期复查、生活方式调整分层说明，讲清单次结果与信息不足的限制，回应她对标签和花费的顾虑，共同定下就诊与复查安排。",
"initial_state": {
"revealed_info": [],
"emotion": "急切",
"concern_acknowledged": false,
"boundary_bait_used": true
},
"must_cover": [
"INQ-01",
"EMPATHY-01",
"PLAIN-01",
"ACTION-01"
],
"variant_of": null,
"knowledge_refs": [
"K-CLIN-153",
"K-CLIN-159",
"K-NUR-162"
],
"review_status": "课程团队维护",
"boundary_behaviors": [
"diagnose_real_person",
"tell_patient_diagnosis",
"reassure_without_basis",
"discourage_visit",
"delay_referral"
]
},
{
"case_id": "HM2",
"disease_id": "tobacco_dependence",
"disease_label": "烟草依赖",
"title": "何师傅想戒烟，又怕戒了更难受",
"recommended_majors": [
"health_management"
],
"professional_focus": {
"health_management": "量化吸烟史与依赖线索，了解既往尝试与复吸原因，协商分阶段戒烟计划并衔接戒烟门诊"
},
"public_profile": {
"name": "何师傅",
"age": 45,
"setting": "社区卫生服务中心戒烟咨询门诊（首次咨询）",
"notice": "全部资料均为合成"
},
"clinical_data": [
{
"item": "吸烟史",
"value": "每天约 20 支，烟龄 22 年",
"note": "自述「早上一睁眼就想抽」"
},
{
"item": "既往尝试",
"value": "自行减量两次，都在一周内复吸",
"note": "未用过戒烟门诊或专业帮助"
},
{
"item": "本次主诉",
"value": "想戒烟，但担心变胖、脾气变差",
"note": "单位体检提示肺功能下降"
},
{
"item": "工作与应酬",
"value": "长期夜班，同事聚餐多",
"note": "自述「一喝酒就想抽」"
}
],
"persona": {
"personality": "直爽、有点抵触说教",
"concern": "怕戒烟后胖一圈、怕在同事面前控制不住脾气被笑话",
"speech_style": "语速快，常说「我意志力不行」",
"initial_emotion": "半信半疑"
},
"hidden_info": [
{
"id": "H1",
"value": "上次戒烟三个月胖了 8 斤，还因为烦躁和爱人吵过架，这次不敢下决心",
"sensitivity": "synthetic",
"release_round": 3
},
{
"id": "H2",
"value": "这半年一直用电子烟替代纸烟，每天仍在抽，觉得电子烟没什么危害",
"sensitivity": "synthetic",
"release_round": 5
}
],
"release_conditions": {
"H1": [
"ask_specific_concern"
],
"H2": [
"ask_non_drug_attempt"
]
},
"task": "量化吸烟量与依赖线索，了解既往尝试和复吸原因，回应怕胖怕烦躁的顾虑，共同制定含戒烟日、触发情境应对和复吸后重启的计划，并转介戒烟门诊。",
"initial_state": {
"revealed_info": [],
"emotion": "半信半疑",
"concern_acknowledged": false,
"boundary_bait_used": false
},
"must_cover": [
"INQ-01",
"EMPATHY-01",
"CHECK-01",
"ACTION-01"
],
"variant_of": null,
"knowledge_refs": [
"K-CLIN-105",
"K-TCM-152",
"K-COM-001"
],
"review_status": "课程团队维护",
"boundary_behaviors": [
"endorse_unverified_remedy",
"blame_patient",
"coerce_or_shame",
"recommend_specific_drug_or_dose"
]
},
{
"case_id": "HM3",
"disease_id": "geriatric_comprehensive_assessment",
"disease_label": "老年综合评估",
"title": "吴奶奶说「老了都这样」，可她已经摔过两次",
"recommended_majors": [
"health_management"
],
"professional_focus": {
"health_management": "完成跌倒、多重用药与独居支持的老年综合评估，形成分层转介清单并约定随访"
},
"public_profile": {
"name": "吴奶奶",
"age": 79,
"setting": "社区卫生服务中心老年人健康管理年度评估（入户）",
"notice": "全部资料均为合成"
},
"clinical_data": [
{
"item": "用药情况",
"value": "同时在用 5 种药，分别由两家机构开具",
"note": "药盒混放，说不清哪种治什么"
},
{
"item": "跌倒史",
"value": "近一年跌倒 2 次，最近一次是上月夜里去厕所",
"note": "没有就医，自己擦了药酒"
},
{
"item": "居住情况",
"value": "独居，子女在外地",
"note": "日常自己做饭，白天邻居偶尔来坐"
},
{
"item": "本次主诉",
"value": "「老了都这样，不用麻烦孩子」",
"note": "愿意配合评估，但回答很短"
}
],
"persona": {
"personality": "客气、怕麻烦别人",
"concern": "怕被说「不中用了」，更怕子女知道后被接去外地",
"speech_style": "反复说「没事，我自己能行」",
"initial_emotion": "平淡中带防备"
},
"hidden_info": [
{
"id": "H1",
"value": "夜里怕开灯摔倒，常憋尿、少喝水；卫生间没有扶手，过道堆着杂物",
"sensitivity": "synthetic",
"release_round": 3
},
{
"id": "H2",
"value": "助眠药是邻居转赠的，来源不明，也没告诉过医生",
"sensitivity": "synthetic",
"release_round": 5
}
],
"release_conditions": {
"H1": [
"ask_home_environment_safety"
],
"H2": [
"ask_full_medication_list_including_otc"
]
},
"task": "完成跌倒、多重用药与独居支持的评估，形成分层转介清单（请医师复核用药、居家防跌倒改造、社区与社工资源），并约定随访方式。",
"initial_state": {
"revealed_info": [],
"emotion": "平淡中带防备",
"concern_acknowledged": false,
"boundary_bait_used": false
},
"must_cover": [
"INQ-01",
"EMPATHY-01",
"PLAIN-01",
"ACTION-01"
],
"variant_of": null,
"knowledge_refs": [
"K-CLIN-125",
"K-NUR-107",
"K-NUR-137"
],
"review_status": "课程团队维护",
"boundary_behaviors": [
"ignore_fall_risk",
"suggest_stop_switch_adjust_medication",
"recommend_medication_adjustment",
"blame_patient"
]
},
{
"case_id": "HM4",
"disease_id": "vaccination_consultation",
"disease_label": "疫苗接种咨询",
"title": "「到底能不能打」，徐女士想要一句准话",
"recommended_majors": [
"health_management"
],
"professional_focus": {
"health_management": "说明接种前需核对的适应证、禁忌与暂缓情形，把可否接种的判断交给接种医生并给出可执行流程"
},
"public_profile": {
"name": "徐女士",
"age": 34,
"setting": "社区卫生服务中心预防接种咨询台",
"notice": "全部资料均为合成"
},
"clinical_data": [
{
"item": "咨询事项",
"value": "想给自己和 2 岁孩子安排季节性流感疫苗接种",
"note": "孩子准备入托，时间比较紧"
},
{
"item": "过敏史",
"value": "本人曾用某种抗生素后起皮疹，药名记不清",
"note": "孩子有鸡蛋过敏史，家长不确定是否影响接种"
},
{
"item": "本次诉求",
"value": "希望当场得到「能打」或「不能打」的答复",
"note": "情绪焦虑，反复追问"
}
],
"persona": {
"personality": "谨慎、信息焦虑",
"concern": "怕接种后出事，又怕耽误孩子入托",
"speech_style": "语速快，连问「到底能不能打」",
"initial_emotion": "焦虑"
},
"hidden_info": [
{
"id": "H1",
"value": "孩子这两天体温 37.8℃、流鼻涕，还在吃感冒药",
"sensitivity": "synthetic",
"release_round": 3
},
{
"id": "H2",
"value": "本人上次接种后出现全身风团，目前仍在哺乳",
"sensitivity": "synthetic",
"release_round": 5
}
],
"release_conditions": {
"H1": [
"ask_symptom_change"
],
"H2": [
"ask_special_population_and_pregnancy_possibility_respectfully"
]
},
"task": "说明接种前必须核对的适应证、禁忌与暂缓情形（急性感染期、过敏史、特殊人群），把可否接种的判断交给接种医生，给出到场评估流程与接种后观察要求，并回应她对风险的担心。",
"initial_state": {
"revealed_info": [],
"emotion": "焦虑",
"concern_acknowledged": false,
"boundary_bait_used": true
},
"must_cover": [
"INQ-01",
"EMPATHY-01",
"PLAIN-01",
"ACTION-01"
],
"variant_of": null,
"knowledge_refs": [
"K-CLIN-148",
"K-CLIN-159",
"K-CLIN-160"
],
"review_status": "课程团队维护",
"boundary_behaviors": [
"guarantee_zero_risk",
"ignore_special_population",
"tell_patient_treatment_decision",
"reassure_without_basis"
]
},
{
"case_id": "HM5",
"disease_id": "overweight_obesity",
"disease_label": "超重与肥胖",
"title": "蒋先生想一个月瘦十斤",
"recommended_majors": [
"health_management"
],
"professional_focus": {
"health_management": "量化体重与生活方式，管理减重预期不承诺斤数，协商可执行的行为计划并安排代谢指标复查"
},
"public_profile": {
"name": "蒋先生",
"age": 38,
"setting": "社区卫生服务中心体重管理门诊（首次咨询）",
"notice": "全部资料均为合成"
},
"clinical_data": [
{
"item": "体格测量",
"value": "身高 172 cm，体重 88 kg，腰围 98 cm",
"note": "自测，未空腹，未复测"
},
{
"item": "生活方式",
"value": "每周外卖 5 次以上，久坐约 10 小时，几乎不运动",
"note": "常熬夜到凌晨 1 点"
},
{
"item": "本次诉求",
"value": "希望一个月瘦 10 斤",
"note": "同事用代餐瘦得快，想照着做"
},
{
"item": "情绪状态",
"value": "说「这次一定坚持住」",
"note": "此前多次下决心，都没坚持下来"
}
],
"persona": {
"personality": "急躁、要结果",
"concern": "怕坚持不下来被家人说「不自律」，也怕体检再出问题",
"speech_style": "直接，反复问「多久能瘦多少」",
"initial_emotion": "兴奋又怀疑"
},
"hidden_info": [
{
"id": "H1",
"value": "之前用网购代餐粉替代两餐，停用后体重反弹 6 kg",
"sensitivity": "synthetic",
"release_round": 3
},
{
"id": "H2",
"value": "去年体检提示血脂偏高、脂肪肝，半年多没复查，也没告诉家人",
"sensitivity": "synthetic",
"release_round": 5
}
],
"release_conditions": {
"H1": [
"ask_remedy_use"
],
"H2": [
"ask_followup_and_screening"
]
},
"task": "量化体重、腰围与生活方式，回应「一个月瘦十斤」的期待，说明合理速度与个体差异、不承诺具体斤数，共同制定饮食、活动与作息的可执行计划，安排代谢指标复查。",
"initial_state": {
"revealed_info": [],
"emotion": "兴奋又怀疑",
"concern_acknowledged": false,
"boundary_bait_used": true
},
"must_cover": [
"INQ-01",
"EMPATHY-01",
"CHECK-01",
"ACTION-01"
],
"variant_of": null,
"knowledge_refs": [
"K-NUR-105",
"K-TCM-149",
"K-COM-001"
],
"review_status": "课程团队维护",
"boundary_behaviors": [
"promise_recovery_outcome",
"prescribe_unsupervised_intensity",
"endorse_unverified_remedy",
"blame_patient"
]
},
{
"case_id": "HM6",
"disease_id": "sleep_and_mood_screening",
"disease_label": "睡眠与情绪问题",
"title": "罗阿姨照顾父亲半年，先垮的是她自己",
"recommended_majors": [
"health_management"
],
"professional_focus": {
"health_management": "规范使用筛查量表并说明其局限，识别睡眠与情绪风险，直接询问自伤念头并及时转介心理精神专科"
},
"public_profile": {
"name": "罗阿姨",
"age": 46,
"setting": "社区卫生服务中心慢病随访中的睡眠与情绪筛查",
"notice": "全部资料均为合成"
},
"clinical_data": [
{
"item": "本次主诉",
"value": "近两个月入睡困难、凌晨早醒，白天没精神",
"note": "自购助眠保健品，效果不明显"
},
{
"item": "筛查结果",
"value": "睡眠自评提示中度问题，情绪自评低落评分偏高",
"note": "量表仅用于筛查，不作为诊断依据"
},
{
"item": "照护情况",
"value": "独自照顾中风卧床的父亲半年",
"note": "几乎没有自己的休息时间"
},
{
"item": "本次追问",
"value": "问「我是不是抑郁了」",
"note": "希望得到一个明确答案"
}
],
"persona": {
"personality": "克制、习惯照顾别人",
"concern": "怕被贴「精神病」标签，更怕不能继续照顾父亲",
"speech_style": "声音低，先讲父亲再讲自己",
"initial_emotion": "疲惫低落"
},
"hidden_info": [
{
"id": "H1",
"value": "睡眠问题已持续两个月，白天注意力差，上周骑车差点撞到人",
"sensitivity": "synthetic",
"release_round": 3
},
{
"id": "H2",
"value": "近两周有过「不如一了百了」的念头，没有具体计划，也没告诉任何人",
"sensitivity": "synthetic",
"release_round": 5
}
],
"release_conditions": {
"H1": [
"ask_symptom_timeline_and_associated_features"
],
"H2": [
"ask_specific_concern",
"ask_warning_sign_understanding"
]
},
"task": "规范使用筛查量表并说明其局限，评估睡眠、情绪与照护负担，直接询问自伤念头，明确转介心理/精神专科与照护支持，不做诊断、不承诺保密。",
"initial_state": {
"revealed_info": [],
"emotion": "疲惫低落",
"concern_acknowledged": false,
"boundary_bait_used": true
},
"must_cover": [
"INQ-01",
"EMPATHY-01",
"PLAIN-01",
"ACTION-01"
],
"variant_of": null,
"knowledge_refs": [
"K-NUR-165",
"K-NUR-167",
"K-COM-001"
],
"review_status": "课程团队维护",
"boundary_behaviors": [
"diagnose_real_person",
"tell_patient_diagnosis",
"reassure_without_basis",
"delay_referral"
]
},
{
"case_id": "MT1",
"disease_id": "laboratory_medicine",
"disease_label": "医学检验",
"title": "检验标本信息不一致的处理",
"recommended_majors": [
"medical_technology"
],
"professional_focus": {
"medical_technology": "核对申请、患者、容器、采集时间和运输条件，识别检验前质量风险并完成沟通记录"
},
"public_profile": {
"name": "合成受检者A",
"age": 46,
"setting": "临床检验标本接收窗口",
"notice": "全部资料均为合成"
},
"clinical_data": [
{
"item": "申请单",
"value": "姓名与试管标签有一字不同",
"note": "检验项目为血液生化"
},
{
"item": "标本",
"value": "采集时间未填写",
"note": "运输条件不明确"
}
],
"persona": {
"personality": "着急取结果",
"concern": "不想重新采集",
"speech_style": "不断催促",
"initial_emotion": "不耐烦"
},
"hidden_info": [
{
"id": "H1",
"value": "送检人员无法当场确认标签是谁书写",
"sensitivity": "synthetic"
},
{
"id": "H2",
"value": "标本曾在室温放置较长时间但无记录",
"sensitivity": "synthetic"
}
],
"release_conditions": {
"H1": [
"ask_identity_traceability"
],
"H2": [
"ask_collection_and_transport_conditions"
]
},
"task": "完成身份和标本全流程核对，识别前处理风险，说明不能直接放行的原因，并形成规范记录和沟通方案。",
"initial_state": {
"revealed_info": [],
"emotion": "不耐烦",
"concern_acknowledged": false,
"boundary_bait_used": false
},
"must_cover": [
"identity_check",
"specimen_integrity",
"preanalytic_factors",
"quality_boundary",
"communication_record"
],
"variant_of": null,
"knowledge_refs": [
"K-MT-001",
"K-MT-002",
"K-COM-001"
],
"review_status": "课程团队维护",
"boundary_behaviors": [
"release_unverified_result",
"alter_specimen_record",
"ignore_identity_mismatch"
]
},
{
"case_id": "MT2",
"disease_id": "laboratory_medicine",
"disease_label": "医学检验",
"title": "生化危急值的电话通知与闭环确认",
"recommended_majors": [
"medical_technology"
],
"professional_focus": {
"medical_technology": "复核危急值结果，按流程通知临床并完成接收人回读确认与记录闭环"
},
"public_profile": {
"name": "合成受检者C",
"age": 63,
"setting": "检验科值班台（下午班）",
"notice": "全部资料均为合成"
},
"clinical_data": [
{
"item": "检验结果",
"value": "血清钾 6.8 mmol/L，标红为危急值",
"note": "同一标本常规生化同步出结果"
},
{
"item": "既往结果",
"value": "三天前血钾 4.3 mmol/L",
"note": "无溶血、无黄疸提示"
}
],
"persona": {
"personality": "语速快、怕耽误事",
"concern": "担心被投诉报告慢",
"speech_style": "边接电话边催你快点说",
"initial_emotion": "着急"
},
"hidden_info": [
{
"id": "H1",
"value": "来电护士只想口头记下数值，表示不用回读也不用写记录",
"sensitivity": "synthetic"
},
{
"id": "H2",
"value": "患者当日输过含钾液体，但病历里没有及时更新",
"sensitivity": "synthetic"
}
],
"release_conditions": {
"H1": [
"ask_receiver_identity_and_readback_willingness"
],
"H2": [
"ask_recent_infusion_and_sample_timing"
]
},
"task": "先复核危急值（复测/核对标本），按流程电话通知临床，要求对方回读确认并记录时间、接收人与处理意见，不越界解释病情或给出治疗决定。",
"initial_state": {
"revealed_info": [],
"emotion": "着急",
"concern_acknowledged": false,
"boundary_bait_used": true
},
"must_cover": [
"quality_check",
"technical_risk_control",
"scope_boundary"
],
"variant_of": null,
"knowledge_refs": [
"K-MT-164",
"K-MT-172",
"K-COM-001"
],
"review_status": "课程团队维护",
"boundary_behaviors": [
"release_unverified_result",
"tell_patient_treatment_decision",
"omit_critical_value_record"
]
},
{
"case_id": "MT3",
"disease_id": "medical_imaging",
"disease_label": "医学影像",
"title": "影像危急发现的即时沟通",
"recommended_majors": [
"medical_technology"
],
"professional_focus": {
"medical_technology": "识别影像危急发现，按流程即时上报并推动临床处理，不向受检者下诊断"
},
"public_profile": {
"name": "合成受检者D",
"age": 71,
"setting": "CT 检查室（检查刚结束）",
"notice": "全部资料均为合成"
},
"clinical_data": [
{
"item": "检查",
"value": "头颅 CT（因突发言语不清送检）",
"note": "图像已上传，未见正式报告"
},
{
"item": "受检者状态",
"value": "神志清、说话略含糊",
"note": "家属在门外等候"
}
],
"persona": {
"personality": "紧张、想赶紧回家",
"concern": "怕耽误接孙子",
"speech_style": "反复问结果出来没有",
"initial_emotion": "焦虑"
},
"hidden_info": [
{
"id": "H1",
"value": "图像提示疑似颅内出血，需要立即通知临床",
"sensitivity": "synthetic"
},
{
"id": "H2",
"value": "家属提到老人长期服用抗凝药",
"sensitivity": "synthetic"
}
],
"release_conditions": {
"H1": [
"ask_about_suspicious_finding_on_image"
],
"H2": [
"ask_anticoagulant_use_and_recent_falls"
]
},
"task": "发现疑似危急影像表现后立即按流程上报并联系临床，同时安抚受检者、说明下一步由医师判断，不自行告知诊断结论。",
"initial_state": {
"revealed_info": [],
"emotion": "焦虑",
"concern_acknowledged": false,
"boundary_bait_used": true
},
"must_cover": [
"quality_check",
"technical_risk_control",
"scope_boundary"
],
"variant_of": null,
"knowledge_refs": [
"K-MT-168",
"K-MT-169",
"K-COM-001"
],
"review_status": "课程团队维护",
"boundary_behaviors": [
"tell_patient_diagnosis",
"delay_critical_finding_report",
"release_unverified_result"
]
},
{
"case_id": "MT4",
"disease_id": "transfusion_compatibility",
"disease_label": "输血相容性检测",
"title": "输血相容性疑难结果的紧急发血沟通",
"recommended_majors": [
"medical_technology"
],
"professional_focus": {
"medical_technology": "复核抗体筛查与配血结果，按紧急发血流程沟通并留痕，不擅自放行未完成配血的血袋"
},
"public_profile": {
"name": "合成受检者E",
"age": 52,
"setting": "输血科配血室（急诊用血申请后）",
"notice": "全部资料均为合成"
},
"clinical_data": [
{
"item": "用血申请",
"value": "急诊申请悬浮红细胞，申请理由为活动性出血",
"note": "申请单标注需要尽快发血"
},
{
"item": "相容性检测",
"value": "抗体筛查阳性，主侧配血不合",
"note": "本次申请单未写明既往输血史"
}
],
"persona": {
"personality": "急躁、怕担责任",
"concern": "担心复核耽误抢救被追责",
"speech_style": "反复追问能不能先发一袋",
"initial_emotion": "着急"
},
"hidden_info": [
{
"id": "H1",
"value": "数年前在外院输过血，可能已产生同种抗体，本次申请单未记录",
"sensitivity": "synthetic",
"release_round": 3
},
{
"id": "H2",
"value": "临床来电提出先发未配血单位、记录事后补写，并希望检验科口头保证安全",
"sensitivity": "synthetic",
"release_round": 5
}
],
"release_conditions": {
"H1": [
"ask_prior_transfusion_and_pregnancy_history"
],
"H2": [
"ask_emergency_release_procedure_and_who_decides"
]
},
"task": "复核抗体筛查与配血结果，说明紧急发血与替代流程，按流程通知临床并完整记录，不擅自放行未完成配血的血袋，不口头承诺安全，把是否用血交回临床决定。",
"initial_state": {
"revealed_info": [],
"emotion": "着急",
"concern_acknowledged": false,
"boundary_bait_used": true
},
"must_cover": [
"MT-QUALITY",
"INQ-01",
"PLAIN-01",
"ACTION-01"
],
"variant_of": null,
"knowledge_refs": [
"K-MT-101",
"K-MT-164",
"K-MT-172"
],
"review_status": "课程团队维护",
"boundary_behaviors": [
"release_unverified_result",
"omit_critical_value_record",
"tell_patient_treatment_decision"
]
},
{
"case_id": "MT5",
"disease_id": "microbial_culture_report",
"disease_label": "微生物培养与耐药预警",
"title": "多重耐药菌培养结果的预警与临床沟通",
"recommended_majors": [
"medical_technology"
],
"professional_focus": {
"medical_technology": "复核培养阳性报警与涂片信息，按预警流程反馈临床并登记，不解释治疗方案"
},
"public_profile": {
"name": "合成受检者F",
"age": 39,
"setting": "微生物室结果复核台（上午报告时段）",
"notice": "全部资料均为合成"
},
"clinical_data": [
{
"item": "培养结果",
"value": "血培养报警阳性，涂片示革兰阴性杆菌",
"note": "药敏试验尚未完成"
},
{
"item": "预警信息",
"value": "系统提示可能为多重耐药菌，需按预警流程处理",
"note": "预警对象为临床科室，不面向患者本人"
}
],
"persona": {
"personality": "语速快、怕被追责",
"concern": "担心预警报晚了被投诉",
"speech_style": "一边接电话一边催你快点定要不要报",
"initial_emotion": "着急"
},
"hidden_info": [
{
"id": "H1",
"value": "同一患者另一侧采集的第二套血培养也报警阳性，两套采集时间接近",
"sensitivity": "synthetic",
"release_round": 3
},
{
"id": "H2",
"value": "患者近期用过抗菌药物，申请单未注明，可能影响结果判读",
"sensitivity": "synthetic",
"release_round": 5
}
],
"release_conditions": {
"H1": [
"ask_number_of_sets_and_collection_time"
],
"H2": [
"ask_recent_antimicrobial_use"
]
},
"task": "复核阳性报警与涂片信息，按多重耐药菌预警流程通知临床并登记接收人与时间，说明药敏未完成、结果意义由临床判断，不解释治疗方案、不向患者下诊断。",
"initial_state": {
"revealed_info": [],
"emotion": "着急",
"concern_acknowledged": false,
"boundary_bait_used": true
},
"must_cover": [
"MT-QUALITY",
"INQ-01",
"EMPATHY-01",
"ACTION-01"
],
"variant_of": null,
"knowledge_refs": [
"K-MT-116",
"K-MT-164",
"K-MT-172"
],
"review_status": "课程团队维护",
"boundary_behaviors": [
"tell_patient_diagnosis",
"tell_patient_treatment_decision",
"omit_critical_value_record"
]
},
{
"case_id": "MT6",
"disease_id": "coagulation_testing",
"disease_label": "凝血功能检测",
"title": "凝血结果异常与标本量不足的复核",
"recommended_majors": [
"medical_technology"
],
"professional_focus": {
"medical_technology": "按抗凝比例与采集过程复核凝血结果，判定标本不合格并拒收重采，按流程更正报告"
},
"public_profile": {
"name": "合成受检者G",
"age": 67,
"setting": "检验科凝血岗位（术前评估标本复核）",
"notice": "全部资料均为合成"
},
"clinical_data": [
{
"item": "检测结果",
"value": "凝血酶原时间与活化部分凝血活酶时间同步延长",
"note": "申请理由为术前评估，与结果不符"
},
{
"item": "标本状态",
"value": "枸橼酸钠抗凝管液面明显低于管壁刻度",
"note": "标签与采集时间填写齐全"
}
],
"persona": {
"personality": "谨慎、怕出错又想快点发报告",
"concern": "担心报告延迟耽误手术安排",
"speech_style": "反复问会不会是患者本身凝血有问题",
"initial_emotion": "为难"
},
"hidden_info": [
{
"id": "H1",
"value": "该管由实习人员采集，采血过程不顺，曾从另一管回抽补足血量",
"sensitivity": "synthetic",
"release_round": 3
},
{
"id": "H2",
"value": "临床已按该结果开始术前准备，希望先出报告、重采以后再说",
"sensitivity": "synthetic",
"release_round": 5
}
],
"release_conditions": {
"H1": [
"ask_collection_process_and_difficulty"
],
"H2": [
"ask_whether_clinical_has_acted_on_result"
]
},
"task": "按抗凝比例与采集过程复核凝血结果，判定标本不合格需重采，按流程拒收并通知临床、必要时按流程出具更正或补充说明，不擅自改结果、不补写记录、不替临床决定手术安排。",
"initial_state": {
"revealed_info": [],
"emotion": "为难",
"concern_acknowledged": false,
"boundary_bait_used": true
},
"must_cover": [
"MT-QUALITY",
"INQ-01",
"CHECK-01",
"ACTION-01"
],
"variant_of": null,
"knowledge_refs": [
"K-MT-111",
"K-MT-118",
"K-MT-170"
],
"review_status": "课程团队维护",
"boundary_behaviors": [
"release_unverified_result",
"alter_specimen_record",
"omit_critical_value_record"
]
},
{
"case_id": "MT7",
"disease_id": "clinical_biochemistry",
"disease_label": "临床生化检验",
"title": "生化结果与临床表现不符的复核顺序",
"recommended_majors": [
"medical_technology"
],
"professional_focus": {
"medical_technology": "按身份、标本质量、仪器质控、生理干扰的顺序复核不符结果，注明已复核再报告"
},
"public_profile": {
"name": "合成受检者H",
"age": 74,
"setting": "生化室复核岗（门诊报告审核前）",
"notice": "全部资料均为合成"
},
"clinical_data": [
{
"item": "生化结果",
"value": "血肌酐明显升高、血钾偏低",
"note": "与申请单描述的常规随访、一般情况好不符"
},
{
"item": "既往结果",
"value": "两周前同类项目结果在参考范围内",
"note": "同一采血点采集"
}
],
"persona": {
"personality": "认真但习惯先下判断",
"concern": "怕被说报告出得慢",
"speech_style": "常说这肯定是标本问题",
"initial_emotion": "疑惑"
},
"hidden_info": [
{
"id": "H1",
"value": "采血时患者正在输液，采血部位在输液同侧手臂",
"sensitivity": "synthetic",
"release_round": 3
},
{
"id": "H2",
"value": "护士站提到当天曾有一份标本条码贴错并已更换，具体是哪一份记不清",
"sensitivity": "synthetic",
"release_round": 5
}
],
"release_conditions": {
"H1": [
"ask_infusion_and_venipuncture_site"
],
"H2": [
"ask_specimen_labeling_incidents_that_day"
]
},
"task": "按身份、标本质量、仪器与质控、生理与药物干扰的顺序复核不符结果，必要时复测或请临床重采，如实报告并在备注注明已复核，不私自修改结果、不把推测当结论告知患者。",
"initial_state": {
"revealed_info": [],
"emotion": "疑惑",
"concern_acknowledged": false,
"boundary_bait_used": false
},
"must_cover": [
"MT-QUALITY",
"INQ-01",
"PLAIN-01",
"CHECK-01",
"ACTION-01"
],
"variant_of": null,
"knowledge_refs": [
"K-MT-165",
"K-MT-166",
"K-MT-107"
],
"review_status": "课程团队维护",
"boundary_behaviors": [
"release_unverified_result",
"ignore_identity_mismatch",
"tell_patient_diagnosis"
]
},
{
"case_id": "MT8",
"disease_id": "contrast_enhanced_imaging",
"disease_label": "对比剂增强检查",
"title": "碘对比剂过敏史患者的增强检查沟通",
"recommended_majors": [
"medical_technology"
],
"professional_focus": {
"medical_technology": "核对过敏史与特殊情况，落实知情说明和急救准备，把是否检查交回医师决定"
},
"public_profile": {
"name": "合成受检者I",
"age": 45,
"setting": "CT 增强检查准备间（检查前核对）",
"notice": "全部资料均为合成"
},
"clinical_data": [
{
"item": "检查申请",
"value": "腹部增强 CT",
"note": "申请单过敏史一栏未填写"
},
{
"item": "受检者陈述",
"value": "既往做增强检查后出现皮疹和眼睑水肿",
"note": "症状自行缓解，未就诊"
}
],
"persona": {
"personality": "紧张、想赶紧做完回家",
"concern": "怕这次反应比上次更重",
"speech_style": "反复问会不会更严重",
"initial_emotion": "害怕"
},
"hidden_info": [
{
"id": "H1",
"value": "上次反应发生在注射后约十分钟，当时用过抗过敏药，药名记不清",
"sensitivity": "synthetic",
"release_round": 3
},
{
"id": "H2",
"value": "还有哮喘史，最近一次肾功能结果已是半年前",
"sensitivity": "synthetic",
"release_round": 5
}
],
"release_conditions": {
"H1": [
"ask_previous_reaction_timing_and_treatment"
],
"H2": [
"ask_asthma_renal_function_and_recent_tests"
]
},
"task": "核对过敏史、哮喘与近期肾功能信息，说明检查目的、可能的不适与观察流程，按机构规定报告医师由其决定是否继续或改换检查，落实知情说明与急救准备，不替医师决定、不承诺绝对安全。",
"initial_state": {
"revealed_info": [],
"emotion": "害怕",
"concern_acknowledged": false,
"boundary_bait_used": true
},
"must_cover": [
"MT-QUALITY",
"INQ-01",
"EMPATHY-01",
"PLAIN-01",
"ACTION-01"
],
"variant_of": null,
"knowledge_refs": [
"K-MT-130",
"K-MT-131",
"K-MT-136"
],
"review_status": "课程团队维护",
"boundary_behaviors": [
"cancel_medical_order_without_authority",
"guarantee_zero_risk",
"ignore_special_population"
]
},
{
"case_id": "MT9",
"disease_id": "ecg_ultrasound_critical",
"disease_label": "心电与超声检查",
"title": "危急心电图发现的即时报告",
"recommended_majors": [
"medical_technology"
],
"professional_focus": {
"medical_technology": "识别危急图形后即时口头报告并记录接收人，不自行判读下诊断"
},
"public_profile": {
"name": "合成受检者J",
"age": 58,
"setting": "心电检查室（检查刚结束）",
"notice": "全部资料均为合成"
},
"clinical_data": [
{
"item": "检查",
"value": "常规心电图（因胸闷、心悸送检）",
"note": "图形已采集，尚未出具正式报告"
},
{
"item": "受检者状态",
"value": "神志清，仍诉胸闷",
"note": "家属在走廊等候"
}
],
"persona": {
"personality": "焦躁、想马上知道结果",
"concern": "怕耽误上班",
"speech_style": "一直追问图上是不是有问题",
"initial_emotion": "不安"
},
"hidden_info": [
{
"id": "H1",
"value": "图形提示可疑急性缺血改变，需立即口头报告当班医师",
"sensitivity": "synthetic",
"release_round": 3
},
{
"id": "H2",
"value": "半小时前自行含服过随身携带的急救药片，症状未完全缓解，未告知分诊人员",
"sensitivity": "synthetic",
"release_round": 5
}
],
"release_conditions": {
"H1": [
"ask_about_suspicious_ecg_finding_or_need_to_report"
],
"H2": [
"ask_medication_taken_and_symptom_change"
]
},
"task": "发现危急图形后立即口头报告当班医师，记录时间与接收人，保持受检者不离开并观察症状，向受检者说明报告由有资质医师审核后出具，不自行判读下诊断、不延误上报。",
"initial_state": {
"revealed_info": [],
"emotion": "不安",
"concern_acknowledged": false,
"boundary_bait_used": true
},
"must_cover": [
"MT-QUALITY",
"INQ-01",
"PLAIN-01",
"ACTION-01"
],
"variant_of": null,
"knowledge_refs": [
"K-MT-152",
"K-MT-150",
"K-MT-151"
],
"review_status": "课程团队维护",
"boundary_behaviors": [
"tell_patient_diagnosis",
"delay_critical_finding_report",
"release_unverified_result"
]
},
{
"case_id": "NU1",
"disease_id": "nursing_comprehensive",
"disease_label": "整体护理",
"title": "住院老人的整体护理风险评估",
"recommended_majors": [
"nursing"
],
"professional_focus": {
"nursing": "整合生理、心理、用药、活动和环境信息，形成护理问题优先级与交接计划"
},
"public_profile": {
"name": "何奶奶",
"age": 78,
"setting": "内科病房入院当日",
"notice": "全部资料均为合成"
},
"clinical_data": [
{
"item": "活动",
"value": "起身时偶有头晕，夜间需要如厕",
"note": "未使用助行器"
},
{
"item": "照护",
"value": "家属白天陪护",
"note": "患者担心麻烦护士"
}
],
"persona": {
"personality": "客气、习惯忍耐",
"concern": "不愿按铃求助",
"speech_style": "常说没关系",
"initial_emotion": "拘谨"
},
"hidden_info": [
{
"id": "H1",
"value": "近一个月在家跌倒过一次",
"sensitivity": "synthetic"
},
{
"id": "H2",
"value": "服药后有时更容易头晕",
"sensitivity": "synthetic"
}
],
"release_conditions": {
"H1": [
"ask_fall_history_without_blame"
],
"H2": [
"ask_medication_related_symptoms"
]
},
"task": "完成整体护理评估，识别跌倒与用药相关风险，回应患者顾虑，制定病房安全、观察和交接计划。",
"initial_state": {
"revealed_info": [],
"emotion": "拘谨",
"concern_acknowledged": false,
"boundary_bait_used": false
},
"must_cover": [
"holistic_assessment",
"fall_risk",
"medication_observation",
"patient_participation",
"handoff_plan"
],
"variant_of": null,
"knowledge_refs": [
"K-NUR-001",
"K-NUR-002",
"K-COM-001"
],
"review_status": "课程团队维护",
"boundary_behaviors": [
"blame_patient",
"suggest_stop_switch_adjust_medication",
"ignore_fall_risk"
]
},
{
"case_id": "NU2",
"disease_id": "nursing_comprehensive",
"disease_label": "术后疼痛与早期活动",
"title": "术后疼痛评估与早期活动",
"recommended_majors": [
"nursing"
],
"professional_focus": {
"nursing": "在医嘱范围内完成疼痛评估、非药物干预与恶心呕吐观察，说明镇痛方案由医师决定，并安全协助早期活动"
},
"public_profile": {
"name": "周女士",
"age": 46,
"setting": "外科病房术后第 1 天",
"notice": "全部资料均为合成"
},
"clinical_data": [
{
"item": "术后任务",
"value": "腹部手术后第 1 天，计划协助下床活动",
"note": "尚未完成本次疼痛评分"
},
{
"item": "当前表现",
"value": "诉切口疼痛、不愿翻身",
"note": "自控镇痛装置在用，患者问能不能多给些止痛药"
}
],
"persona": {
"personality": "怕疼、不愿麻烦别人",
"concern": "担心活动会把伤口弄开",
"speech_style": "反复说「还行」，但表情痛苦、说话变短",
"initial_emotion": "忍耐"
},
"hidden_info": [
{
"id": "H1",
"value": "疼痛评分 7 分，伴恶心并呕吐过一次，未主动说明",
"sensitivity": "synthetic",
"release_round": 3
},
{
"id": "H2",
"value": "因为担心「上瘾」，自己减少了镇痛装置的使用",
"sensitivity": "synthetic",
"release_round": 5
}
],
"release_conditions": {
"H1": [
"ask_pain_score_and_associated_symptoms",
"release_turn_3_4"
],
"H2": [
"ask_analgesia_use_and_concern_without_blame",
"release_after_turn_5"
]
},
"task": "完成疼痛评估（部位、性质、评分与对活动的影响），在医嘱范围内落实非药物措施、观察恶心呕吐并及时报告，说明镇痛方案由医师决定，协助早期活动并做好交接。",
"initial_state": {
"revealed_info": [],
"emotion": "忍耐",
"concern_acknowledged": false,
"boundary_bait_used": true
},
"must_cover": [
"INQ-01",
"EMPATHY-01",
"CHECK-01",
"ACTION-01",
"NUR-CARE"
],
"variant_of": null,
"knowledge_refs": [
"K-NUR-152",
"K-NUR-104",
"K-COM-001"
],
"review_status": "课程团队维护",
"boundary_behaviors": [
"recommend_specific_drug_or_dose",
"suggest_stop_switch_adjust_medication",
"assume_understanding"
]
},
{
"case_id": "NU3",
"disease_id": "nursing_comprehensive",
"disease_label": "压力性损伤预防",
"title": "卧床患者的压力性损伤预防",
"recommended_majors": [
"nursing"
],
"professional_focus": {
"nursing": "用 Braden 评分驱动定时翻身与减压措施，纠正不安全的局部处理，与家属共同落实可执行的预防计划"
},
"public_profile": {
"name": "宋奶奶",
"age": 82,
"setting": "内科病房入院第 2 天",
"notice": "全部资料均为合成"
},
"clinical_data": [
{
"item": "风险评估",
"value": "Braden 评分 12 分，属高风险",
"note": "入院当日评估，尚未复评"
},
{
"item": "皮肤情况",
"value": "骶尾部皮肤发红，指压后不褪色",
"note": "家属认为「躺久了都这样」"
}
],
"persona": {
"personality": "节俭、怕添麻烦",
"concern": "担心减压装置要自费、嫌翻身太折腾",
"speech_style": "总说「不用那么讲究」",
"initial_emotion": "抵触"
},
"hidden_info": [
{
"id": "H1",
"value": "近两天怕麻烦护士，夜间常保持同一体位，翻身次数明显少于计划",
"sensitivity": "synthetic",
"release_round": 3
},
{
"id": "H2",
"value": "家属用热水袋热敷受压部位，认为这样可以「活血」",
"sensitivity": "synthetic",
"release_round": 5
}
],
"release_conditions": {
"H1": [
"ask_turning_frequency_and_reason_without_blame",
"release_turn_3_4"
],
"H2": [
"ask_family_care_practices",
"release_after_turn_5"
]
},
"task": "完成 Braden 复评与皮肤核查，发现皮肤情况变化及时向责任护士与医师报告，落实定时翻身和减压措施，纠正不安全的局部处理，与患者及家属共同商定可执行的预防计划并交接。",
"initial_state": {
"revealed_info": [],
"emotion": "抵触",
"concern_acknowledged": false,
"boundary_bait_used": true
},
"must_cover": [
"INQ-01",
"EMPATHY-01",
"PLAIN-01",
"ACTION-01",
"NUR-CARE"
],
"variant_of": null,
"knowledge_refs": [
"K-NUR-140",
"K-NUR-141",
"K-COM-001"
],
"review_status": "课程团队维护",
"boundary_behaviors": [
"blame_patient",
"assume_understanding",
"omit_followup"
]
},
{
"case_id": "NU4",
"disease_id": "nursing_comprehensive",
"disease_label": "静脉输液安全管理",
"title": "输液外渗的识别与处置",
"recommended_majors": [
"nursing"
],
"professional_focus": {
"nursing": "识别外渗征象后立即停止输液并保留通路，按规范做局部处理与报告，完成观察记录和患者解释"
},
"public_profile": {
"name": "罗先生",
"age": 55,
"setting": "病房输液巡视时",
"notice": "全部资料均为合成"
},
"clinical_data": [
{
"item": "输液情况",
"value": "外周静脉留置针输注中，滴速较前明显变慢",
"note": "输液部位为手背"
},
{
"item": "局部表现",
"value": "穿刺点周围皮肤发白、发凉、肿胀，患者诉胀痛",
"note": "回血不畅，范围约一枚硬币大小"
}
],
"persona": {
"personality": "能忍、怕再扎针",
"concern": "怕重新穿刺，想忍到输完",
"speech_style": "一直说「忍忍就过去了」",
"initial_emotion": "不安"
},
"hidden_info": [
{
"id": "H1",
"value": "半小时前自己调快了滴速，想早点输完",
"sensitivity": "synthetic",
"release_round": 3
},
{
"id": "H2",
"value": "同一部位昨天已肿过一次，当时没有上报",
"sensitivity": "synthetic",
"release_round": 5
}
],
"release_conditions": {
"H1": [
"ask_who_adjusted_the_rate_and_when",
"release_turn_3_4"
],
"H2": [
"ask_puncture_site_history",
"release_after_turn_5"
]
},
"task": "发现外渗征象后立即停止输液并保留通路评估，按规范做局部处理与标识，报告医师和责任护士，持续观察并记录，向患者说明原因和后续安排。",
"initial_state": {
"revealed_info": [],
"emotion": "不安",
"concern_acknowledged": false,
"boundary_bait_used": false
},
"must_cover": [
"INQ-01",
"EMPATHY-01",
"PLAIN-01",
"ACTION-01",
"NUR-CARE"
],
"variant_of": null,
"knowledge_refs": [
"K-NUR-125",
"K-NUR-131",
"K-COM-001"
],
"review_status": "课程团队维护",
"boundary_behaviors": [
"recommend_specific_drug_or_dose",
"omit_followup",
"assume_understanding"
]
},
{
"case_id": "NU5",
"disease_id": "nursing_comprehensive",
"disease_label": "住院跌倒管理",
"title": "患者跌倒后的现场评估与上报",
"recommended_majors": [
"nursing"
],
"professional_focus": {
"nursing": "跌倒后先评估意识与损伤、避免盲目搬动，再按流程报告与记录，全程不指责患者"
},
"public_profile": {
"name": "韩大爷",
"age": 74,
"setting": "病房夜间巡视",
"notice": "全部资料均为合成"
},
"clinical_data": [
{
"item": "现场情况",
"value": "患者跌坐在床旁地面，自称「没事，就是滑了一下」",
"note": "地面有水渍，床栏未拉起"
},
{
"item": "当前表现",
"value": "神志清楚，诉左髋部疼痛，不愿让人扶",
"note": "是否撞到头部尚不清楚"
}
],
"persona": {
"personality": "要强、怕被说添麻烦",
"concern": "担心被限制下床、被家属责怪",
"speech_style": "反复说「不用叫医生」",
"initial_emotion": "羞恼"
},
"hidden_info": [
{
"id": "H1",
"value": "跌倒前有一阵头晕，头部磕到了床沿，没有主动说",
"sensitivity": "synthetic",
"release_round": 3
},
{
"id": "H2",
"value": "睡前服用了助眠药，起夜时没按铃叫人",
"sensitivity": "synthetic",
"release_round": 5
}
],
"release_conditions": {
"H1": [
"ask_consciousness_and_head_impact",
"release_turn_3_4"
],
"H2": [
"ask_events_before_fall_and_medication_without_blame",
"release_after_turn_5"
]
},
"task": "跌倒后先评估意识、受伤部位与生命体征，不急于搬动，随后报告医师、按流程上报并如实记录，同时安抚患者、说明防跌倒安排，不指责患者。",
"initial_state": {
"revealed_info": [],
"emotion": "羞恼",
"concern_acknowledged": false,
"boundary_bait_used": true
},
"must_cover": [
"INQ-01",
"EMPATHY-01",
"PLAIN-01",
"ACTION-01",
"NUR-CARE"
],
"variant_of": null,
"knowledge_refs": [
"K-NUR-138",
"K-NUR-137",
"K-COM-001"
],
"review_status": "课程团队维护",
"boundary_behaviors": [
"blame_patient",
"ignore_fall_risk",
"delay_referral"
]
},
{
"case_id": "NU6",
"disease_id": "nursing_comprehensive",
"disease_label": "导管相关感染预防",
"title": "留置导管的维护与拔管指征沟通",
"recommended_majors": [
"nursing"
],
"professional_focus": {
"nursing": "按维护规范观察导管相关感染征象，守住手卫生与无菌原则，把拔管指征交医师判断并做好沟通"
},
"public_profile": {
"name": "崔女士",
"age": 63,
"setting": "外科病房留置导尿与中心静脉导管第 4 天",
"notice": "全部资料均为合成"
},
"clinical_data": [
{
"item": "尿管情况",
"value": "留置导尿第 4 天，尿液浑浊、可见絮状物",
"note": "患者诉下腹不适"
},
{
"item": "置管维护",
"value": "中心静脉导管穿刺点敷料已超过更换周期，边缘卷起",
"note": "穿刺点无明显红肿"
}
],
"persona": {
"personality": "怕疼、依赖导管",
"concern": "怕拔管后尿不出来、要反复插管",
"speech_style": "反复要求「干脆现在就拔了」",
"initial_emotion": "担忧"
},
"hidden_info": [
{
"id": "H1",
"value": "近两天有低热和轻微寒战，没有告诉护士",
"sensitivity": "synthetic",
"release_round": 3
},
{
"id": "H2",
"value": "家属曾自行打开导尿管连接处倒尿液",
"sensitivity": "synthetic",
"release_round": 5
}
],
"release_conditions": {
"H1": [
"ask_temperature_and_chills",
"release_turn_3_4"
],
"H2": [
"ask_catheter_handling_in_daily_care",
"release_after_turn_5"
]
},
"task": "完成导管相关感染的观察与维护核查，发现可疑感染征象及时报告医师与责任护士，落实手卫生与无菌操作，按指征向医师提出拔管评估并如实说明，明确拔管与否由医师决定，做好记录与交接。",
"initial_state": {
"revealed_info": [],
"emotion": "担忧",
"concern_acknowledged": false,
"boundary_bait_used": true
},
"must_cover": [
"INQ-01",
"PLAIN-01",
"CHECK-01",
"ACTION-01",
"NUR-CARE"
],
"variant_of": null,
"knowledge_refs": [
"K-NUR-124",
"K-NUR-119",
"K-COM-001"
],
"review_status": "课程团队维护",
"boundary_behaviors": [
"cancel_medical_order_without_authority",
"omit_followup",
"guarantee_zero_risk"
]
},
{
"case_id": "NU7",
"disease_id": "nursing_comprehensive",
"disease_label": "用药安全与差错上报",
"title": "给药差错后的处置与上报",
"recommended_majors": [
"nursing"
],
"professional_focus": {
"nursing": "给药差错后立即评估患者并停止继续给药，按流程上报、如实记录与沟通，落实后续观察"
},
"public_profile": {
"name": "宁先生",
"age": 70,
"setting": "病房发药后核对",
"notice": "全部资料均为合成"
},
"clinical_data": [
{
"item": "事件",
"value": "核对时发现刚才把另一位患者的口服药发给了本人",
"note": "与本人医嘱不一致，涉及种类与数量"
},
{
"item": "患者现状",
"value": "服药后约十分钟，暂无不适主诉",
"note": "尚未告知患者和值班医师"
}
],
"persona": {
"personality": "温和、信任护士",
"concern": "怕药物之间冲突出事",
"speech_style": "反复问「要不要再补一片」",
"initial_emotion": "不安"
},
"hidden_info": [
{
"id": "H1",
"value": "对其中一类药物成分过敏，病历首页有记录",
"sensitivity": "synthetic",
"release_round": 3
},
{
"id": "H2",
"value": "平时自行服用两种保健品，未记入用药清单",
"sensitivity": "synthetic",
"release_round": 5
}
],
"release_conditions": {
"H1": [
"ask_allergy_history_and_check_the_record",
"release_turn_3_4"
],
"H2": [
"ask_self_medication_and_supplements",
"release_after_turn_5"
]
},
"task": "发现给药差错后立即评估患者并停止继续给药，第一时间报告值班医师与上级，按流程封存、如实记录并上报，用患者能理解的方式说明与致歉，落实后续观察和交接。",
"initial_state": {
"revealed_info": [],
"emotion": "不安",
"concern_acknowledged": false,
"boundary_bait_used": true
},
"must_cover": [
"INQ-01",
"EMPATHY-01",
"PLAIN-01",
"ACTION-01",
"NUR-CARE"
],
"variant_of": null,
"knowledge_refs": [
"K-NUR-128",
"K-NUR-135",
"K-COM-001"
],
"review_status": "课程团队维护",
"boundary_behaviors": [
"recommend_specific_drug_or_dose",
"suggest_stop_switch_adjust_medication",
"omit_followup"
]
},
{
"case_id": "R1",
"disease_id": "stroke_rehabilitation",
"disease_label": "脑卒中康复",
"title": "站立训练中的头晕与跌倒风险",
"recommended_majors": [
"rehabilitation"
],
"professional_focus": {
"rehabilitation": "训练前安全核查、训练中识别预警信号并停止，及时上报并记录"
},
"public_profile": {
"name": "冯先生",
"age": 58,
"setting": "康复治疗室（卒中后第 3 周，首次站立训练）",
"notice": "全部资料均为合成"
},
"clinical_data": [
{
"item": "训练任务",
"value": "床边站立训练 5 分钟",
"note": "已用助行架，治疗师在侧"
},
{
"item": "当前表现",
"value": "站起约 1 分钟后诉头晕、眼前发黑",
"note": "面色偏白，出汗"
}
],
"persona": {
"personality": "要强、急着恢复",
"concern": "怕被说恢复慢",
"speech_style": "说「没事我能坚持」",
"initial_emotion": "倔强"
},
"hidden_info": [
{
"id": "H1",
"value": "早上测血压偏低，记录未交给治疗师",
"sensitivity": "synthetic"
},
{
"id": "H2",
"value": "昨晚起夜时曾差点摔倒，未告诉任何人",
"sensitivity": "synthetic"
}
],
"release_conditions": {
"H1": [
"ask_pre_training_vitals_and_medication"
],
"H2": [
"ask_recent_near_fall_events"
]
},
"task": "训练前完成安全核查（生命体征、用药、近期事件），训练中识别头晕等预警信号并立即停止、安置与评估，随后上报并记录交接。",
"initial_state": {
"revealed_info": [],
"emotion": "倔强",
"concern_acknowledged": false,
"boundary_bait_used": true
},
"must_cover": [
"identify_case_warning",
"timely_referral"
],
"variant_of": null,
"knowledge_refs": [
"K-MT-159",
"K-NUR-137",
"K-COM-001"
],
"review_status": "课程团队维护",
"boundary_behaviors": [
"ignore_fall_risk",
"delay_referral",
"blame_patient"
]
},
{
"case_id": "R2",
"disease_id": "stroke_rehabilitation",
"disease_label": "脑卒中康复",
"title": "照护者转移技巧培训与回示",
"recommended_majors": [
"rehabilitation"
],
"professional_focus": {
"rehabilitation": "评估照护者能力与居家环境，示范并让照护者回示转移动作，形成安全随访计划"
},
"public_profile": {
"name": "冯先生与女儿",
"age": 58,
"setting": "出院前照护者培训",
"notice": "全部资料均为合成"
},
"clinical_data": [
{
"item": "培训内容",
"value": "床到轮椅的转移",
"note": "女儿第一次学习"
},
{
"item": "家庭情况",
"value": "老式住宅，卫生间无扶手",
"note": "女儿腰部有旧伤"
}
],
"persona": {
"personality": "认真但紧张、怕做错",
"concern": "担心搬不动父亲",
"speech_style": "一遍遍问「这样对吗」",
"initial_emotion": "紧张"
},
"hidden_info": [
{
"id": "H1",
"value": "女儿有腰椎间盘突出病史，弯腰用力会疼",
"sensitivity": "synthetic"
},
{
"id": "H2",
"value": "家里没有防滑垫，夜里照明不足",
"sensitivity": "synthetic"
}
],
"release_conditions": {
"H1": [
"ask_caregiver_own_health_and_capacity"
],
"H2": [
"ask_home_environment_safety"
]
},
"task": "评估照护者身体条件与居家环境，分步示范转移要点，让照护者回示并纠正，最后给出可执行的安全计划、求助方式和复诊安排。",
"initial_state": {
"revealed_info": [],
"emotion": "紧张",
"concern_acknowledged": false,
"boundary_bait_used": false
},
"must_cover": [
"holistic_assessment",
"nursing_safety_plan",
"care_handoff"
],
"variant_of": null,
"knowledge_refs": [
"K-NUR-163",
"K-NUR-169",
"K-COM-001"
],
"review_status": "课程团队维护",
"boundary_behaviors": [
"assume_understanding",
"omit_followup",
"blame_patient"
]
},
{
"case_id": "R3",
"disease_id": "lumbar_surgery_rehabilitation",
"disease_label": "腰椎术后康复",
"title": "腰椎术后第一天的下地活动",
"recommended_majors": [
"rehabilitation"
],
"professional_focus": {
"rehabilitation": "按医嘱完成术后早期活动的安全核查与分级加量，识别疼痛与神经症状警示后暂缓并转介"
},
"public_profile": {
"name": "周先生",
"age": 46,
"setting": "康复治疗室（腰椎术后第 1 天，首次下地训练）",
"notice": "全部资料均为合成"
},
"clinical_data": [
{
"item": "训练任务",
"value": "床边坐起、站立并在辅助下短距离行走",
"note": "医嘱为可耐受范围内早期活动，未限定距离"
},
{
"item": "当前表现",
"value": "坐起后诉腰部疼痛明显，右小腿发麻",
"note": "术后尚未复查影像，夜间记录未更新"
}
],
"persona": {
"personality": "要强、急于出院",
"concern": "怕被说恢复慢，也怕以后干不了重活",
"speech_style": "反复说「我自己能走，不用扶」",
"initial_emotion": "焦躁"
},
"hidden_info": [
{
"id": "H1",
"value": "昨晚右小腿麻木比术前更明显，翻身时也有，没有告诉护士",
"sensitivity": "synthetic",
"release_round": 3
},
{
"id": "H2",
"value": "家里主要靠他搬货维持收入，担心以后不能搬重物，但不好意思开口问",
"sensitivity": "synthetic",
"release_round": 5
}
],
"release_conditions": {
"H1": [
"ask_symptom_change_since_surgery_and_night_status"
],
"H2": [
"ask_work_and_lifting_concerns_after_rapport"
]
},
"task": "完成术后早期活动的安全核查（疼痛、感觉与肌力、体位耐受），按分级逐步增加活动量，发现神经症状或疼痛异常时暂缓并转介，用回示确认患者与家属掌握的安全要点。",
"initial_state": {
"revealed_info": [],
"emotion": "焦躁",
"concern_acknowledged": false,
"boundary_bait_used": true
},
"must_cover": [
"INQ-01",
"EMPATHY-01",
"PLAIN-01",
"CHECK-01",
"ACTION-01"
],
"variant_of": null,
"knowledge_refs": [
"K-NUR-151",
"K-NUR-152",
"K-COM-001"
],
"review_status": "课程团队维护",
"boundary_behaviors": [
"prescribe_unsupervised_intensity",
"delay_referral",
"reassure_without_basis"
]
},
{
"case_id": "R4",
"disease_id": "copd",
"disease_label": "慢性阻塞性肺疾病",
"title": "肺康复训练中的气促加重",
"recommended_majors": [
"rehabilitation"
],
"professional_focus": {
"rehabilitation": "在肺康复训练中把握运动处方边界，监测血氧与呼吸困难变化，按停止指征中止并识别转诊线索"
},
"public_profile": {
"name": "郑师傅",
"age": 67,
"setting": "社区肺康复训练室（第 6 次训练）",
"notice": "全部资料均为合成"
},
"clinical_data": [
{
"item": "训练任务",
"value": "按既定运动处方进行步行与呼吸操训练",
"note": "强度依据上次运动耐量评估设定"
},
{
"item": "当前表现",
"value": "步行约 3 分钟后气促明显加重，说话需中途停顿",
"note": "现场自测血氧较训练前下降，未记录具体数值"
}
],
"persona": {
"personality": "倔强、不喜欢被当成病人",
"concern": "怕以后离不开吸氧，也怕拖累家人",
"speech_style": "说「这点路算啥，我能坚持」",
"initial_emotion": "不服气"
},
"hidden_info": [
{
"id": "H1",
"value": "今天来训练前痰比平时多、颜色偏深，还有点发热",
"sensitivity": "synthetic",
"release_round": 3
},
{
"id": "H2",
"value": "在家没有按说明使用吸入装置，觉得用完心跳快，也没告诉医生",
"sensitivity": "synthetic",
"release_round": 5
}
],
"release_conditions": {
"H1": [
"ask_today_symptom_change_and_sputum"
],
"H2": [
"ask_home_inhaler_use_without_judgement"
]
},
"task": "训练前核对症状与血氧趋势，训练中按停止指征及时中止并安置，识别提示感染或缺氧加重的线索并转诊，与医生对接运动处方的调整，不自行决定训练强度或用药。",
"initial_state": {
"revealed_info": [],
"emotion": "不服气",
"concern_acknowledged": false,
"boundary_bait_used": true
},
"must_cover": [
"INQ-01",
"EMPATHY-01",
"PLAIN-01",
"ACTION-01"
],
"variant_of": null,
"knowledge_refs": [
"K-MT-161",
"K-NUR-114",
"K-CLIN-134"
],
"review_status": "课程团队维护",
"boundary_behaviors": [
"prescribe_unsupervised_intensity",
"delay_referral",
"reassure_without_basis",
"guarantee_zero_risk"
]
},
{
"case_id": "R5",
"disease_id": "rotator_cuff_repair_rehabilitation",
"disease_label": "肩袖修补术后康复",
"title": "肩袖修补术后的保护性训练",
"recommended_majors": [
"rehabilitation"
],
"professional_focus": {
"rehabilitation": "守住保护期的活动限制，识别过度训练与疼痛加重，用回示确认动作并支持长期依从"
},
"public_profile": {
"name": "柳女士",
"age": 52,
"setting": "康复门诊治疗区（肩袖修补术后第 3 周）",
"notice": "全部资料均为合成"
},
"clinical_data": [
{
"item": "训练任务",
"value": "被动前屈与钟摆练习，按保护期限制活动角度",
"note": "治疗师协助完成，尚未进入主动抬举阶段"
},
{
"item": "当前表现",
"value": "主动抬臂时疼痛加重，夜间痛影响睡眠",
"note": "患者在计划外自行增加了抬举练习"
}
],
"persona": {
"personality": "认真、爱查资料",
"concern": "怕恢复慢，怕以后梳不了头、提不了东西",
"speech_style": "拿手机里的训练视频来对照",
"initial_emotion": "着急"
},
"hidden_info": [
{
"id": "H1",
"value": "网上看到术后两周就该练抬举，现在每天自己加练两次",
"sensitivity": "synthetic",
"release_round": 3
},
{
"id": "H2",
"value": "夜里痛醒后自己吃了止痛药，没有记录也没问过医生",
"sensitivity": "synthetic",
"release_round": 5
}
],
"release_conditions": {
"H1": [
"ask_home_exercise_routine_and_information_source"
],
"H2": [
"ask_night_pain_and_self_medication_use"
]
},
"task": "核对保护期限制与居家练习内容，识别过度训练和疼痛加重的警示，说明暂不加量的理由，用回示确认动作要点，把练习进度和用药问题交回医生与手术团队。",
"initial_state": {
"revealed_info": [],
"emotion": "着急",
"concern_acknowledged": false,
"boundary_bait_used": true
},
"must_cover": [
"INQ-01",
"EMPATHY-01",
"PLAIN-01",
"CHECK-01",
"ACTION-01"
],
"variant_of": null,
"knowledge_refs": [
"K-MT-157",
"K-NUR-104",
"K-NUR-164"
],
"review_status": "课程团队维护",
"boundary_behaviors": [
"prescribe_unsupervised_intensity",
"suggest_stop_switch_adjust_medication",
"assume_understanding",
"promise_recovery_outcome"
]
},
{
"case_id": "R6",
"disease_id": "dysphagia_rehabilitation",
"disease_label": "吞咽障碍康复",
"title": "首次坐位进食训练中的呛咳",
"recommended_majors": [
"rehabilitation"
],
"professional_focus": {
"rehabilitation": "进食前核对体位与食物性状，识别误吸与隐性误吸线索并立即停止处置，及时转介言语治疗"
},
"public_profile": {
"name": "邵阿姨",
"age": 71,
"setting": "康复病房进食训练（发病后第 4 周）",
"notice": "全部资料均为合成"
},
"clinical_data": [
{
"item": "训练任务",
"value": "坐位下试少量糊状食物",
"note": "治疗师在旁，床旁备吸引装置"
},
{
"item": "当前表现",
"value": "进食两口后出现呛咳，说话声音变湿",
"note": "自诉喉咙里像有东西没咽下去"
}
],
"persona": {
"personality": "怕麻烦别人、要面子",
"concern": "不想一直吃糊状食物，希望早点像以前一样吃饭",
"speech_style": "说「我慢慢吃就行，不用停」",
"initial_emotion": "不安"
},
"hidden_info": [
{
"id": "H1",
"value": "喝水比吃糊状更容易呛，这一周呛过两次",
"sensitivity": "synthetic",
"release_round": 3
},
{
"id": "H2",
"value": "夜里起床后喉咙有痰响，家里人觉得是正常现象",
"sensitivity": "synthetic",
"release_round": 5
}
],
"release_conditions": {
"H1": [
"ask_liquid_versus_solid_swallowing_differences"
],
"H2": [
"ask_nighttime_breathing_and_secretion_signs"
]
},
"task": "完成进食前评估与体位、食物性状核对，识别误吸与隐性误吸线索，出现呛咳立即停止并处置，转介言语治疗与医生，用回示确认家属掌握的进食照护要点。",
"initial_state": {
"revealed_info": [],
"emotion": "不安",
"concern_acknowledged": false,
"boundary_bait_used": true
},
"must_cover": [
"INQ-01",
"PLAIN-01",
"CHECK-01",
"ACTION-01"
],
"variant_of": null,
"knowledge_refs": [
"K-MT-162",
"K-NUR-144",
"K-NUR-145"
],
"review_status": "课程团队维护",
"boundary_behaviors": [
"delay_referral",
"reassure_without_basis",
"assume_understanding",
"endorse_unverified_remedy"
]
},
{
"case_id": "R7",
"disease_id": "chronic_heart_failure",
"disease_label": "慢性心力衰竭",
"title": "运动训练中的胸闷与停止信号",
"recommended_majors": [
"rehabilitation"
],
"professional_focus": {
"rehabilitation": "依据运动耐量记录把握训练强度，识别胸闷气短等停止信号并中止，把处方与用药判断交回医生"
},
"public_profile": {
"name": "韩先生",
"age": 63,
"setting": "心脏康复门诊训练区（门诊第 4 次训练）",
"notice": "全部资料均为合成"
},
"clinical_data": [
{
"item": "训练任务",
"value": "按运动处方进行低强度踏车训练",
"note": "强度来自近期运动耐量评估结果"
},
{
"item": "当前表现",
"value": "训练约 5 分钟后诉胸闷、气短，心率上升较快",
"note": "自诉这两天体重增加、鞋变紧"
}
],
"persona": {
"personality": "理性、对「心脏」两个字很敏感",
"concern": "担心运动把心脏累坏，又怕不动会更糟",
"speech_style": "反复确认「这个强度对我安全吗」",
"initial_emotion": "焦虑"
},
"hidden_info": [
{
"id": "H1",
"value": "这两天夜里要垫高枕头才睡得着，白天脚踝也比平时肿",
"sensitivity": "synthetic",
"release_round": 3
},
{
"id": "H2",
"value": "怕总跑厕所，自己把利尿药减了量，没有告诉医生",
"sensitivity": "synthetic",
"release_round": 5
}
],
"release_conditions": {
"H1": [
"ask_sleep_position_weight_and_edema_change"
],
"H2": [
"ask_medication_adherence_and_diuretic_use"
]
},
"task": "训练前核对症状、体重与运动耐量记录，训练中识别胸闷气短等停止信号并立即中止、安置与观察，及时与医生沟通运动处方调整，不判断心功能分级也不调整药物。",
"initial_state": {
"revealed_info": [],
"emotion": "焦虑",
"concern_acknowledged": false,
"boundary_bait_used": false
},
"must_cover": [
"INQ-01",
"EMPATHY-01",
"PLAIN-01",
"CHECK-01",
"ACTION-01"
],
"variant_of": null,
"knowledge_refs": [
"K-MT-161",
"K-CLIN-154",
"K-NUR-116"
],
"review_status": "课程团队维护",
"boundary_behaviors": [
"prescribe_unsupervised_intensity",
"delay_referral",
"suggest_stop_switch_adjust_medication",
"guarantee_zero_risk"
]
},
{
"case_id": "R8",
"disease_id": "balance_and_fall_prevention",
"disease_label": "平衡与防跌倒康复",
"title": "平衡训练中的跌倒恐惧",
"recommended_majors": [
"rehabilitation"
],
"professional_focus": {
"rehabilitation": "评估平衡能力与跌倒恐惧，用渐进暴露和共同协商的分级目标推进训练，并给出可落地的家庭环境改造建议"
},
"public_profile": {
"name": "白阿姨",
"age": 74,
"setting": "康复治疗室（跌倒后第 6 周，平衡训练）",
"notice": "全部资料均为合成"
},
"clinical_data": [
{
"item": "训练任务",
"value": "扶栏下重心转移与短时单腿站立",
"note": "治疗师在侧保护，未使用减重设备"
},
{
"item": "当前表现",
"value": "一松手就全身僵硬，迟迟不敢迈步",
"note": "自诉「一站起来就想到上次摔的那一下」"
}
],
"persona": {
"personality": "谨慎、怕给家人添麻烦",
"concern": "担心再摔一次就起不来，也怕被家人限制出门",
"speech_style": "反复说「要不算了吧」",
"initial_emotion": "害怕"
},
"hidden_info": [
{
"id": "H1",
"value": "上次跌倒后在家又滑过一次，没敢说，现在在家基本不敢走",
"sensitivity": "synthetic",
"release_round": 3
},
{
"id": "H2",
"value": "卫生间地砖湿滑，夜里只开一盏小灯，扶手一直没有装",
"sensitivity": "synthetic",
"release_round": 5
}
],
"release_conditions": {
"H1": [
"ask_post_fall_activity_avoidance_and_near_miss"
],
"H2": [
"ask_home_environment_lighting_and_supports"
]
},
"task": "评估平衡能力与恐惧程度，解释渐进暴露的理由，与患者协商可接受的分级目标并逐步实施，给出可执行的家庭环境改进和求助方案，训练中出现失衡时立即保护并处置。",
"initial_state": {
"revealed_info": [],
"emotion": "害怕",
"concern_acknowledged": false,
"boundary_bait_used": true
},
"must_cover": [
"INQ-01",
"EMPATHY-01",
"PLAIN-01",
"CHECK-01",
"ACTION-01"
],
"variant_of": null,
"knowledge_refs": [
"K-MT-159",
"K-NUR-137",
"K-NUR-163"
],
"review_status": "课程团队维护",
"boundary_behaviors": [
"ignore_fall_risk",
"blame_patient",
"coerce_or_shame",
"promise_recovery_outcome"
]
},
{
"case_id": "TCM1",
"disease_id": "tcm_health_management",
"disease_label": "中医健康管理",
"title": "老年人中医体质信息采集",
"recommended_majors": [
"traditional_chinese_medicine"
],
"professional_focus": {
"traditional_chinese_medicine": "完整采集体感与生活信息，识别回答矛盾，按规范表达体质辨识的不确定性和服务边界"
},
"public_profile": {
"name": "郑阿姨",
"age": 68,
"setting": "社区中医药健康管理",
"notice": "全部资料均为合成"
},
"clinical_data": [
{
"item": "服务任务",
"value": "中医体质信息采集和健康指导",
"note": "尚未完成规范问卷"
},
{
"item": "当前诉求",
"value": "想知道自己属于哪种体质",
"note": "回答中存在矛盾"
}
],
"persona": {
"personality": "健谈、易受网络信息影响",
"concern": "希望得到一个确定标签",
"speech_style": "描述很多但时间顺序不清",
"initial_emotion": "期待"
},
"hidden_info": [
{
"id": "H1",
"value": "部分问题理解有误，前后答案不一致",
"sensitivity": "synthetic"
},
{
"id": "H2",
"value": "正在服用多种处方药",
"sensitivity": "synthetic"
}
],
"release_conditions": {
"H1": [
"clarify_question_meaning_and_inconsistency"
],
"H2": [
"ask_current_treatment_before_advice"
]
},
"task": "完成规范、尊重的信息采集，核对矛盾回答，说明体质辨识条件和不确定性，并给出不替代诊疗的健康管理建议框架。",
"initial_state": {
"revealed_info": [],
"emotion": "期待",
"concern_acknowledged": false,
"boundary_bait_used": true
},
"must_cover": [
"structured_tcm_inquiry",
"answer_consistency",
"constitution_boundary",
"current_treatment",
"health_guidance_scope"
],
"variant_of": null,
"knowledge_refs": [
"K-TCM-001",
"K-TCM-002",
"K-COM-001"
],
"review_status": "课程团队维护",
"boundary_behaviors": [
"diagnose_real_person",
"recommend_specific_drug_or_dose",
"promise_cure",
"replace_medical_treatment"
]
},
{
"case_id": "TCM2",
"disease_id": "tcm_health_management",
"disease_label": "中医健康管理",
"title": "体质辨识结果的解释边界",
"recommended_majors": [
"traditional_chinese_medicine"
],
"professional_focus": {
"traditional_chinese_medicine": "解释体质结果的条件与不确定性，说明体质不等于疾病诊断，不越界处方"
},
"public_profile": {
"name": "田阿姨",
"age": 59,
"setting": "社区卫生服务中心中医健康管理随访",
"notice": "全部资料均为合成"
},
"clinical_data": [
{
"item": "测评结果",
"value": "体质问卷提示偏痰湿质",
"note": "问卷为患者自填，部分条目理解偏差"
},
{
"item": "诉求",
"value": "希望开个方子「把湿气排掉」",
"note": "同时在网上买了两盒中成药"
}
],
"persona": {
"personality": "热心、相信养生号",
"concern": "怕自己「湿气重」会得大病",
"speech_style": "反复追问能不能开药",
"initial_emotion": "期待"
},
"hidden_info": [
{
"id": "H1",
"value": "自填问卷时有 5 个条目理解错误，答案前后不一致",
"sensitivity": "synthetic"
},
{
"id": "H2",
"value": "正在服用降压药，且考虑自行停药改吃中药",
"sensitivity": "synthetic"
}
],
"release_conditions": {
"H1": [
"clarify_questionnaire_consistency"
],
"H2": [
"ask_current_medication_before_advice"
]
},
"task": "讲清体质辨识的适用条件与不确定性，纠正问卷理解偏差，说明体质不等于疾病诊断，对自行调整西药的想法给出不越界的沟通并建议与处方医师确认。",
"initial_state": {
"revealed_info": [],
"emotion": "期待",
"concern_acknowledged": false,
"boundary_bait_used": true
},
"must_cover": [
"structured_tcm_inquiry",
"tcm_uncertainty",
"tcm_safety_boundary"
],
"variant_of": null,
"knowledge_refs": [
"K-TCM-145",
"K-TCM-127",
"K-COM-001"
],
"review_status": "课程团队维护",
"boundary_behaviors": [
"recommend_specific_drug_or_dose",
"suggest_stop_switch_adjust_medication",
"diagnose_real_person"
]
},
{
"case_id": "TCM3",
"disease_id": "tcm_clinical_reasoning",
"disease_label": "中医临床思维",
"title": "中西药联用的安全沟通",
"recommended_majors": [
"traditional_chinese_medicine"
],
"professional_focus": {
"traditional_chinese_medicine": "完整采集用药信息，识别联用风险与警示症状，转介而不替患者改药"
},
"public_profile": {
"name": "钱先生",
"age": 66,
"setting": "中医门诊用药咨询",
"notice": "全部资料均为合成"
},
"clinical_data": [
{
"item": "在用药物",
"value": "阿司匹林、降压药，另自行加服两种中成药",
"note": "中成药名称记不全"
},
{
"item": "近期情况",
"value": "两周内出现两次黑便，未就诊",
"note": "自认为「上火」"
}
],
"persona": {
"personality": "固执、反感被说「乱吃药」",
"concern": "担心西药伤胃",
"speech_style": "强调中药温和没副作用",
"initial_emotion": "抵触"
},
"hidden_info": [
{
"id": "H1",
"value": "中成药里含活血化瘀成分，与抗血小板药同用",
"sensitivity": "synthetic"
},
{
"id": "H2",
"value": "黑便后仍有头晕乏力，未复查血常规",
"sensitivity": "synthetic"
}
],
"release_conditions": {
"H1": [
"ask_full_medication_list_including_otc"
],
"H2": [
"ask_bleeding_warning_signs"
]
},
"task": "逐项核对在用药物与中成药成分，识别黑便等警示并建议尽快就医，说明联用风险但不替患者停药或改药，给出可执行的随访建议。",
"initial_state": {
"revealed_info": [],
"emotion": "抵触",
"concern_acknowledged": false,
"boundary_bait_used": true
},
"must_cover": [
"structured_tcm_inquiry",
"tcm_uncertainty",
"tcm_safety_boundary"
],
"variant_of": null,
"knowledge_refs": [
"K-TCM-168",
"K-TCM-164",
"K-COM-001"
],
"review_status": "课程团队维护",
"boundary_behaviors": [
"suggest_stop_switch_adjust_medication",
"delay_referral",
"endorse_unverified_remedy"
]
},
{
"case_id": "TCM4",
"disease_id": "tcm_herbal_adverse_reaction",
"disease_label": "中药疑似不良反应",
"title": "服用中药后皮疹与腹泻的识别与上报",
"recommended_majors": [
"traditional_chinese_medicine"
],
"professional_focus": {
"traditional_chinese_medicine": "把用药时间线与新发皮疹腹泻逐项核对并如实记录，只做识别、记录与转介，停药与否由医师判断"
},
"public_profile": {
"name": "苏女士",
"age": 42,
"setting": "中医门诊用药随访",
"notice": "全部资料均为合成"
},
"clinical_data": [
{
"item": "用药情况",
"value": "服用外院开具的中药汤剂第 4 天",
"note": "自述为调理月经不调，具体处方内容说不清"
},
{
"item": "新发症状",
"value": "躯干散在红色皮疹伴瘙痒，一天腹泻 3 次",
"note": "皮疹出现时间与开始服药时间接近"
}
],
"persona": {
"personality": "谨慎、怕给人添麻烦",
"concern": "担心是中药过敏，又怕停药影响调理效果",
"speech_style": "反复问「是不是先停两天比较保险」",
"initial_emotion": "担忧"
},
"hidden_info": [
{
"id": "H1",
"value": "服药第 2 天颈部先出现瘙痒，当时没记录也没告诉开方医师",
"sensitivity": "synthetic",
"release_round": 3
},
{
"id": "H2",
"value": "同期自行加服了一种网购的祛湿类中成药，未说自己在吃",
"sensitivity": "synthetic",
"release_round": 5
}
],
"release_conditions": {
"H1": [
"ask_rash_onset_and_drug_timeline",
"min_turn_3"
],
"H2": [
"ask_full_medication_list_including_otc",
"min_turn_5"
]
},
"task": "核对开始服药与新发皮疹、腹泻的时间关联，逐项记清在用的中药与中成药清单及症状变化，说明疑似不良反应需由开方医师判断是否停药，完成规范记录与转介，不替患者停药、换药或推荐抗过敏药物。",
"initial_state": {
"revealed_info": [],
"emotion": "担忧",
"concern_acknowledged": false,
"boundary_bait_used": true
},
"must_cover": [
"INQ-01",
"EMPATHY-01",
"PLAIN-01",
"ACTION-01"
],
"variant_of": null,
"knowledge_refs": [
"K-TCM-163",
"K-TCM-168",
"K-COM-001"
],
"review_status": "课程团队维护",
"boundary_behaviors": [
"suggest_stop_switch_adjust_medication",
"recommend_specific_drug_or_dose",
"delay_referral"
]
},
{
"case_id": "TCM5",
"disease_id": "tcm_acupuncture_fainting",
"disease_label": "针灸晕针",
"title": "留针过程中晕针的即时处置",
"recommended_majors": [
"traditional_chinese_medicine"
],
"professional_focus": {
"traditional_chinese_medicine": "早期识别晕针先兆并立即停针、平卧保暖、呼救观察，记录处置经过，不越界下诊断"
},
"public_profile": {
"name": "何先生",
"age": 29,
"setting": "针灸治疗室留针观察阶段",
"notice": "全部资料均为合成"
},
"clinical_data": [
{
"item": "治疗情况",
"value": "首次接受针刺治疗，已留针约 8 分钟",
"note": "取穴与操作由带教医师完成"
},
{
"item": "当前表现",
"value": "突然面色发白、额头出汗，诉头晕心慌",
"note": "意识清楚，能应答，尚未起身"
}
],
"persona": {
"personality": "紧张、怕给人添麻烦",
"concern": "担心是自己身体太差，不好意思说难受",
"speech_style": "声音小，先道歉再说症状",
"initial_emotion": "紧张"
},
"hidden_info": [
{
"id": "H1",
"value": "今天没吃早饭，前一天只睡了不到 3 小时",
"sensitivity": "synthetic",
"release_round": 3
},
{
"id": "H2",
"value": "去年在外地针灸时曾出现一次眼前发黑，之后没再提过",
"sensitivity": "synthetic",
"release_round": 5
}
],
"release_conditions": {
"H1": [
"ask_food_and_sleep_before_treatment",
"min_turn_3"
],
"H2": [
"ask_previous_acupuncture_reaction",
"min_turn_5"
]
},
"task": "发现晕针先兆后立即停止操作、让患者平卧并保暖、呼叫带教医师，持续观察面色与意识并记录处置时间和经过，按流程上报，不自行继续留针、不让患者独自起身，也不对原因下诊断。",
"initial_state": {
"revealed_info": [],
"emotion": "紧张",
"concern_acknowledged": false,
"boundary_bait_used": true
},
"must_cover": [
"INQ-01",
"PLAIN-01",
"CHECK-01",
"ACTION-01"
],
"variant_of": null,
"knowledge_refs": [
"K-TCM-157",
"K-TCM-163",
"K-COM-001"
],
"review_status": "课程团队维护",
"boundary_behaviors": [
"diagnose_real_person",
"delay_referral",
"reassure_without_basis"
]
},
{
"case_id": "TCM6",
"disease_id": "tcm_cupping_moxa_burn",
"disease_label": "拔罐艾灸烫伤",
"title": "艾灸后局部烫伤的观察与转诊指征",
"recommended_majors": [
"traditional_chinese_medicine"
],
"professional_focus": {
"traditional_chinese_medicine": "客观记录烫伤范围与水疱情况，纠正「起泡排湿」说法，讲清局部处理与必须转诊的指征"
},
"public_profile": {
"name": "顾阿姨",
"age": 63,
"setting": "中医护理操作室艾灸后观察",
"notice": "全部资料均为合成"
},
"clinical_data": [
{
"item": "操作情况",
"value": "今日接受艾灸约 20 分钟，中途说「越热越舒服」",
"note": "操作由治疗师完成，之后未再反馈温热感"
},
{
"item": "局部表现",
"value": "小腿内侧约硬币大小红肿，中央有一小水疱",
"note": "患者说不太疼，认为「起泡是在排湿」"
}
],
"persona": {
"personality": "能忍、相信养生说法",
"concern": "怕被说小题大做，不想为这点事跑医院",
"speech_style": "反复说「不用处理，过两天就好」",
"initial_emotion": "无所谓"
},
"hidden_info": [
{
"id": "H1",
"value": "有多年糖尿病史，小腿和足部感觉本来就偏迟钝，没主动说过",
"sensitivity": "synthetic",
"release_round": 3
},
{
"id": "H2",
"value": "水疱已被家人用针挑破，还涂了家里自制的药膏",
"sensitivity": "synthetic",
"release_round": 5
}
],
"release_conditions": {
"H1": [
"ask_chronic_disease_and_skin_sensation",
"min_turn_3"
],
"H2": [
"ask_local_self_treatment_after_injury",
"min_turn_5"
]
},
"task": "观察并客观记录烫伤部位、范围与水疱情况，说明「起泡排湿」的说法没有依据，讲清感觉减退与糖尿病人群的处理风险，给出不自行挑破、不涂自制药膏的局部护理要点，明确必须就医的转诊指征并安排复评。",
"initial_state": {
"revealed_info": [],
"emotion": "无所谓",
"concern_acknowledged": false,
"boundary_bait_used": true
},
"must_cover": [
"INQ-01",
"PLAIN-01",
"CHECK-01",
"ACTION-01"
],
"variant_of": null,
"knowledge_refs": [
"K-TCM-158",
"K-TCM-159",
"K-COM-001"
],
"review_status": "课程团队维护",
"boundary_behaviors": [
"endorse_unverified_remedy",
"diagnose_real_person",
"recommend_specific_drug_or_dose"
]
},
{
"case_id": "TCM7",
"disease_id": "tcm_four_diagnosis_inconsistency",
"disease_label": "四诊信息不一致",
"title": "自述与舌脉记录不一致时的核实顺序",
"recommended_majors": [
"traditional_chinese_medicine"
],
"professional_focus": {
"traditional_chinese_medicine": "按采集条件先复核舌脉记录、再补齐问诊与用药经过，如实记录矛盾点并交医师判断"
},
"public_profile": {
"name": "岑女士",
"age": 35,
"setting": "中医门诊四诊采集复核",
"notice": "全部资料均为合成"
},
"clinical_data": [
{
"item": "自述情况",
"value": "口苦、怕热、大便偏干，自认「上火」",
"note": "希望直接开清热类的方子"
},
{
"item": "已有记录",
"value": "上次记录为舌淡苔白、脉沉细",
"note": "与本次自述的热象方向不一致"
}
],
"persona": {
"personality": "急躁、有主见",
"concern": "担心被反复问来问去还是不给结论",
"speech_style": "追问「到底是不是上火，能不能直接开」",
"initial_emotion": "不耐烦"
},
"hidden_info": [
{
"id": "H1",
"value": "上次舌象是刚喝过浓茶、吃过带颜色食物后拍的，没按采集条件来",
"sensitivity": "synthetic",
"release_round": 3
},
{
"id": "H2",
"value": "近两周自行吃了清热类中成药，口苦没减轻，反而出现夜间手足心热",
"sensitivity": "synthetic",
"release_round": 5
}
],
"release_conditions": {
"H1": [
"ask_tongue_record_conditions",
"min_turn_3"
],
"H2": [
"ask_self_medication_and_symptom_change",
"min_turn_5"
]
},
"task": "先核对舌象与脉象的采集时间、光线和饮食等条件，再补齐寒热、二便、睡眠与自行用药经过，说明四诊不一致时需补充信息与复诊、不能凭单项定论，把矛盾点如实记录并交由医师判断。",
"initial_state": {
"revealed_info": [],
"emotion": "不耐烦",
"concern_acknowledged": false,
"boundary_bait_used": true
},
"must_cover": [
"INQ-01",
"CHECK-01",
"PLAIN-01",
"EMPATHY-01"
],
"variant_of": null,
"knowledge_refs": [
"K-TCM-111",
"K-TCM-117",
"K-COM-001"
],
"review_status": "课程团队维护",
"boundary_behaviors": [
"diagnose_real_person",
"confirm_cure_conclusion",
"recommend_specific_drug_or_dose"
]
},
{
"case_id": "TCM8",
"disease_id": "tcm_insomnia_management",
"disease_label": "慢性失眠调理",
"title": "慢性失眠调理诉求的边界沟通",
"recommended_majors": [
"traditional_chinese_medicine"
],
"professional_focus": {
"traditional_chinese_medicine": "问清睡眠模式与日间功能并评估情绪风险，不承诺疗效、不推荐偏方、不指导自行加减中成药"
},
"public_profile": {
"name": "卓先生",
"age": 48,
"setting": "中医门诊健康咨询",
"notice": "全部资料均为合成"
},
"clinical_data": [
{
"item": "主要困扰",
"value": "入睡困难、易醒约 8 个月，白天疲乏",
"note": "未系统就诊，靠着朋友推荐的方法自己调整"
},
{
"item": "诉求",
"value": "想要一个能根治失眠的方子和偏方",
"note": "手机里存了多个来源不明的偏方"
}
],
"persona": {
"personality": "焦虑、急于见效",
"concern": "怕安眠药依赖，又怕长期睡不好拖垮身体",
"speech_style": "反复要方子、要用量，催着给个准话",
"initial_emotion": "急切"
},
"hidden_info": [
{
"id": "H1",
"value": "近一个月情绪低落、对什么都提不起兴趣，偶尔闪过「活着没意思」的念头",
"sensitivity": "synthetic",
"release_round": 3
},
{
"id": "H2",
"value": "正在吃亲戚给的助眠中成药，因为觉得没效果已自行加过两次量",
"sensitivity": "synthetic",
"release_round": 5
}
],
"release_conditions": {
"H1": [
"ask_mood_and_self_harm_risk",
"min_turn_3"
],
"H2": [
"ask_current_sleep_medication_and_dose_change",
"min_turn_5"
]
},
"task": "问清入睡困难与易醒的具体模式、持续时间和日间功能影响，评估情绪与自伤风险并优先转介，说明调理不承诺疗效、不推荐来源不明的偏方、中成药加减由医师决定，给出可执行的作息建议与复诊安排。",
"initial_state": {
"revealed_info": [],
"emotion": "急切",
"concern_acknowledged": false,
"boundary_bait_used": true
},
"must_cover": [
"EMPATHY-01",
"INQ-01",
"PLAIN-01",
"ACTION-01",
"CHECK-01"
],
"variant_of": null,
"knowledge_refs": [
"K-TCM-130",
"K-TCM-151",
"K-COM-001"
],
"review_status": "课程团队维护",
"boundary_behaviors": [
"promise_cure",
"endorse_unverified_remedy",
"suggest_stop_switch_adjust_medication"
]
},
{
"case_id": "TCM9",
"disease_id": "tcm_herb_drug_interaction",
"disease_label": "老年中西药联用",
"title": "老年患者中西药同服的成分核对",
"recommended_majors": [
"traditional_chinese_medicine"
],
"professional_focus": {
"traditional_chinese_medicine": "逐项核对中药中成药与西药的名称和成分，提示相互作用风险并建议咨询医师或药师，不替患者加减药"
},
"public_profile": {
"name": "谭阿姨",
"age": 76,
"setting": "社区卫生服务中心中医用药咨询",
"notice": "全部资料均为合成"
},
"clinical_data": [
{
"item": "在用药物",
"value": "降压药，另有两种中成药",
"note": "药盒没带全，名称只能说出大概"
},
{
"item": "近期情况",
"value": "起床时头晕、乏力，家里测的血压比平时低",
"note": "自认为「气血不足」，想再补一补"
}
],
"persona": {
"personality": "客气、怕给儿女添麻烦",
"concern": "担心中西药一起吃会「相冲」，又舍不得停掉中药",
"speech_style": "反复问「少吃一样是不是更安全」",
"initial_emotion": "不安"
},
"hidden_info": [
{
"id": "H1",
"value": "两种中成药里有作用方向相近的成分，与降压药同用可能叠加降压",
"sensitivity": "synthetic",
"release_round": 3
},
{
"id": "H2",
"value": "两周前因为觉得没效果，自行把其中一种中成药加了量，还把服药时间挪到了早上",
"sensitivity": "synthetic",
"release_round": 5
}
],
"release_conditions": {
"H1": [
"ask_full_medication_list_and_components",
"min_turn_3"
],
"H2": [
"ask_self_adjustment_and_symptom_timeline",
"min_turn_5"
]
},
"task": "带着患者逐项核对中药、中成药与西药的名称、成分和服用方式，识别头晕与血压偏低等变化，说明存在相互作用风险并建议尽快咨询处方医师或药师，不替患者停药、减量或更改服药时间。",
"initial_state": {
"revealed_info": [],
"emotion": "不安",
"concern_acknowledged": false,
"boundary_bait_used": true
},
"must_cover": [
"INQ-01",
"PLAIN-01",
"CHECK-01",
"ACTION-01",
"EMPATHY-01"
],
"variant_of": null,
"knowledge_refs": [
"K-TCM-168",
"K-TCM-170",
"K-COM-001"
],
"review_status": "课程团队维护",
"boundary_behaviors": [
"suggest_stop_switch_adjust_medication",
"recommend_specific_drug_or_dose",
"delay_referral"
]
},
{
"case_id": "CL1-V1",
"disease_id": "clinical_comprehensive",
"disease_label": "临床综合评估",
"title": "发热腹痛患者的信息整合",
"recommended_majors": [
"clinical_medicine"
],
"professional_focus": {
"clinical_medicine": "围绕症状时间轴、伴随表现、既往史和检查信息形成问题清单，不在信息不足时下结论"
},
"public_profile": {
"name": "林女士",
"age": 31,
"setting": "综合门诊",
"notice": "全部资料均为合成"
},
"clinical_data": [
{
"item": "主诉",
"value": "发热伴右下腹疼痛一天",
"note": "自行服用过退热药"
},
{
"item": "已有资料",
"value": "体温记录不完整",
"note": "尚无检验影像结果"
}
],
"persona": {
"personality": "担忧、叙述跳跃",
"concern": "想知道是否必须住院",
"speech_style": "信息零散",
"initial_emotion": "担心"
},
"hidden_info": [
{
"id": "H1",
"value": "疼痛逐渐加重并伴恶心",
"sensitivity": "synthetic"
},
{
"id": "H2",
"value": "可能怀孕但尚未检测",
"sensitivity": "synthetic"
}
],
"release_conditions": {
"H1": [
"ask_symptom_timeline_and_associated_features"
],
"H2": [
"ask_relevant_reproductive_history_respectfully"
]
},
"task": "建立症状时间轴，补齐关键病史，识别需要尽快评估的信息，形成结构化交接摘要。",
"initial_state": {
"revealed_info": [],
"emotion": "担心",
"concern_acknowledged": false,
"boundary_bait_used": false
},
"must_cover": [
"history_structure",
"privacy_respect",
"warning_identification",
"diagnostic_boundary",
"handoff_summary"
],
"variant_of": "CL1",
"knowledge_refs": [
"K-CLIN-001",
"K-CLIN-002",
"K-COM-001"
],
"review_status": "课程团队维护",
"boundary_behaviors": [
"diagnose_real_person",
"recommend_specific_drug_or_dose",
"ignore_relevant_privacy"
]
},
{
"case_id": "MT1-V1",
"disease_id": "medical_imaging",
"disease_label": "医学影像",
"title": "重复影像检查与放射防护沟通",
"recommended_majors": [
"medical_technology"
],
"professional_focus": {
"medical_technology": "核对检查目的、既往资料和特殊情况，落实正当化、最优化和知情说明"
},
"public_profile": {
"name": "合成受检者B",
"age": 29,
"setting": "放射检查登记处",
"notice": "全部资料均为合成"
},
"clinical_data": [
{
"item": "检查申请",
"value": "胸部X线复查",
"note": "申请单未说明上次检查时间"
},
{
"item": "既往资料",
"value": "患者表示外院刚做过类似检查",
"note": "影像资料未携带"
}
],
"persona": {
"personality": "谨慎、担心辐射",
"concern": "害怕短期重复检查",
"speech_style": "会询问能不能不做",
"initial_emotion": "担忧"
},
"hidden_info": [
{
"id": "H1",
"value": "存在妊娠可能但尚未主动说明",
"sensitivity": "synthetic"
}
],
"release_conditions": {
"H1": [
"ask_special_population_and_pregnancy_possibility_respectfully"
]
},
"task": "核对检查目的和既往资料，识别特殊情况，解释正当化与防护原则，并把是否调整检查交回有资质的医师。",
"initial_state": {
"revealed_info": [],
"emotion": "担忧",
"concern_acknowledged": false,
"boundary_bait_used": true
},
"must_cover": [
"exam_purpose",
"prior_imaging",
"special_population",
"radiation_communication",
"scope_boundary"
],
"variant_of": "MT1",
"knowledge_refs": [
"K-MT-002",
"K-COM-001"
],
"review_status": "课程团队维护",
"boundary_behaviors": [
"cancel_medical_order_without_authority",
"guarantee_zero_risk",
"ignore_special_population"
]
},
{
"case_id": "NU1-V1",
"disease_id": "nursing_comprehensive",
"disease_label": "整体护理",
"title": "出院前的用药与自我照护教育",
"recommended_majors": [
"nursing"
],
"professional_focus": {
"nursing": "完成用药核对、异常表现观察、居家照护、复诊安排和回示确认"
},
"public_profile": {
"name": "许先生",
"age": 61,
"setting": "出院前健康教育",
"notice": "全部资料均为合成"
},
"clinical_data": [
{
"item": "出院资料",
"value": "包含多项用药和复诊安排",
"note": "患者表示看不懂部分名称"
},
{
"item": "家庭支持",
"value": "与配偶同住",
"note": "配偶未参加本次说明"
}
],
"persona": {
"personality": "要强、容易假装听懂",
"concern": "担心回家后记不住",
"speech_style": "常回答知道了",
"initial_emotion": "紧张"
},
"hidden_info": [
{
"id": "H1",
"value": "患者分不清两种服药时间",
"sensitivity": "synthetic"
},
{
"id": "H2",
"value": "不知道出现哪些变化需要尽快联系医务人员",
"sensitivity": "synthetic"
}
],
"release_conditions": {
"H1": [
"use_teach_back"
],
"H2": [
"ask_warning_sign_understanding"
]
},
"task": "核对出院计划，用患者能理解的方式说明重点，通过回示发现误解，并形成家庭可执行的复诊和求助方案。",
"initial_state": {
"revealed_info": [],
"emotion": "紧张",
"concern_acknowledged": false,
"boundary_bait_used": false
},
"must_cover": [
"medication_reconciliation",
"plain_education",
"warning_signs",
"teach_back",
"family_plan"
],
"variant_of": "NU1",
"knowledge_refs": [
"K-NUR-001",
"K-NUR-002",
"K-COM-001"
],
"review_status": "课程团队维护",
"boundary_behaviors": [
"recommend_specific_drug_or_dose",
"assume_understanding",
"omit_followup"
]
},
{
"case_id": "TCM1-V1",
"disease_id": "tcm_clinical_reasoning",
"disease_label": "中医临床思维",
"title": "四诊信息与胸闷警示的综合判断",
"recommended_majors": [
"traditional_chinese_medicine"
],
"professional_focus": {
"traditional_chinese_medicine": "在望闻问切信息采集中优先识别现代医学急症警示，先安全分流再讨论辨证"
},
"public_profile": {
"name": "梁先生",
"age": 57,
"setting": "中医门诊候诊咨询",
"notice": "全部资料均为合成"
},
"clinical_data": [
{
"item": "主要不适",
"value": "反复胸闷，今天活动后明显加重",
"note": "伴出汗"
},
{
"item": "诉求",
"value": "想先开点中药调理",
"note": "尚未接受急诊评估"
}
],
"persona": {
"personality": "信任中医、抗拒急诊",
"concern": "担心检查麻烦",
"speech_style": "反复要求先调理",
"initial_emotion": "焦虑"
},
"hidden_info": [
{
"id": "H1",
"value": "胸闷向左肩放射",
"sensitivity": "synthetic"
}
],
"release_conditions": {
"H1": [
"ask_warning_features_before_pattern_differentiation"
]
},
"task": "采集必要信息但优先识别急症警示，明确不能以辨证调理替代紧急评估，完成及时转介和安全沟通。",
"initial_state": {
"revealed_info": [],
"emotion": "焦虑",
"concern_acknowledged": false,
"boundary_bait_used": true
},
"must_cover": [
"warning_first",
"timely_referral",
"tcm_scope_boundary",
"patient_concern",
"handoff_summary"
],
"variant_of": "TCM1",
"knowledge_refs": [
"K-TCM-001",
"K-CLIN-001",
"K-COM-001"
],
"review_status": "课程团队维护",
"boundary_behaviors": [
"delay_referral",
"recommend_specific_drug_or_dose",
"replace_emergency_evaluation_with_tcm"
]
}
],
"pretest": {
"quiz_id": "ZH-PRETEST-04+hard",
"version": "6.1.1",
"title": "医学专业微型自测（两档卷：基础 5 题 / 进阶 5 题）",
"major_papers": {
"other": {
"basic": [
"Q-BP-001",
"Q-BP-002",
"Q-BP-003",
"Q-BP-004",
"Q-BP-005"
],
"intermediate": [
"Q-BP-101",
"Q-BP-102",
"Q-BP-103",
"Q-BP-104",
"Q-BP-105"
],
"advanced": [
"Q-CM-301",
"Q-MT-301",
"Q-NU-301",
"Q-TCM-301",
"Q-RH-301"
],
"expert": [
"Q-CM-401",
"Q-MT-401",
"Q-NU-401",
"Q-TCM-401",
"Q-HM-401"
]
},
"clinical_medicine": {
"basic": [
"Q-CM-101",
"Q-CM-102",
"Q-CM-103",
"Q-CM-104",
"Q-CM-105",
"Q-CM-206",
"Q-CM-207",
"Q-CM-208",
"Q-CM-209",
"Q-CM-210",
"Q-CM-211",
"Q-CM-212",
"Q-CM-213",
"Q-CM-214"
],
"intermediate": [
"Q-CM-201",
"Q-CM-202",
"Q-CM-203",
"Q-CM-204",
"Q-CM-205"
],
"advanced": [
"Q-CM-301",
"Q-CM-302",
"Q-CM-303",
"Q-CM-304",
"Q-CM-305"
],
"expert": [
"Q-CM-401",
"Q-CM-402",
"Q-CM-403",
"Q-CM-404",
"Q-CM-405"
]
},
"medical_technology": {
"basic": [
"Q-MT-101",
"Q-MT-102",
"Q-MT-103",
"Q-MT-104",
"Q-MT-105"
],
"intermediate": [
"Q-MT-201",
"Q-MT-202",
"Q-MT-203",
"Q-MT-204",
"Q-MT-205"
],
"advanced": [
"Q-MT-301",
"Q-MT-302",
"Q-MT-303",
"Q-MT-304",
"Q-MT-305"
],
"expert": [
"Q-MT-401",
"Q-MT-402",
"Q-MT-403",
"Q-MT-404",
"Q-MT-405"
]
},
"nursing": {
"basic": [
"Q-NU-101",
"Q-NU-102",
"Q-NU-103",
"Q-NU-104",
"Q-NU-105",
"Q-NU-206",
"Q-NU-207",
"Q-NU-208",
"Q-NU-209",
"Q-NU-210",
"Q-NU-211",
"Q-NU-212",
"Q-NU-213",
"Q-NU-214",
"Q-NU-215",
"Q-NU-216",
"Q-NU-217"
],
"intermediate": [
"Q-NU-201",
"Q-NU-202",
"Q-NU-203",
"Q-NU-204",
"Q-NU-205"
],
"advanced": [
"Q-NU-301",
"Q-NU-302",
"Q-NU-303",
"Q-NU-304",
"Q-NU-305"
],
"expert": [
"Q-NU-401",
"Q-NU-402",
"Q-NU-403",
"Q-NU-404",
"Q-NU-405"
]
},
"traditional_chinese_medicine": {
"basic": [
"Q-TCM-101",
"Q-TCM-102",
"Q-TCM-103",
"Q-TCM-104",
"Q-TCM-105",
"Q-TCM-206",
"Q-TCM-207",
"Q-TCM-208",
"Q-TCM-209",
"Q-TCM-210",
"Q-TCM-211",
"Q-TCM-212"
],
"intermediate": [
"Q-TCM-201",
"Q-TCM-202",
"Q-TCM-203",
"Q-TCM-204",
"Q-TCM-205"
],
"advanced": [
"Q-TCM-301",
"Q-TCM-302",
"Q-TCM-303",
"Q-TCM-304",
"Q-TCM-305"
],
"expert": [
"Q-TCM-401",
"Q-TCM-402",
"Q-TCM-403",
"Q-TCM-404",
"Q-TCM-405"
]
},
"rehabilitation": {
"basic": [
"Q-RH-101",
"Q-RH-102",
"Q-RH-103",
"Q-RH-104",
"Q-RH-105"
],
"intermediate": [
"Q-RH-201",
"Q-RH-202",
"Q-RH-203",
"Q-RH-204",
"Q-RH-205"
],
"advanced": [
"Q-RH-301",
"Q-RH-302",
"Q-RH-303",
"Q-RH-304",
"Q-RH-305"
],
"expert": [
"Q-RH-401",
"Q-RH-402",
"Q-RH-403",
"Q-RH-404",
"Q-RH-405"
]
},
"health_management": {
"basic": [
"Q-HM-101",
"Q-HM-102",
"Q-HM-103",
"Q-HM-104",
"Q-HM-105"
],
"intermediate": [
"Q-HM-201",
"Q-HM-202",
"Q-HM-203",
"Q-HM-204",
"Q-HM-205"
],
"advanced": [
"Q-HM-301",
"Q-HM-302",
"Q-HM-303",
"Q-HM-304",
"Q-HM-305"
],
"expert": [
"Q-HM-401",
"Q-HM-402",
"Q-HM-403",
"Q-HM-404",
"Q-HM-405"
]
}
},
"questions": [
{
"question_id": "Q-BP-001",
"node_id": "measurement_device_posture",
"major_focus": [
"all"
],
"type": "single_choice",
"stem": "指导居民家庭测量时，哪项做法更规范？",
"options": {
"A": "使用经验证的上臂式电子血压计，坐稳后再测",
"B": "测量时持续说话以缓解紧张",
"C": "袖带隔着厚衣服也可以",
"D": "手臂自然下垂即可"
},
"answer": "A",
"score": 1,
"score_rule": "完全匹配标准答案得 1 分，否则 0 分",
"explanation_ref": "K-BP-001",
"difficulty": "basic"
},
{
"question_id": "Q-BP-002",
"node_id": "measurement_schedule_repeat",
"major_focus": [
"all"
],
"type": "single_choice",
"stem": "关于一次测量时段的记录，哪项更合适？",
"options": {
"A": "只保留最低值",
"B": "连续测量并完整记录日期、时间和读数",
"C": "只在头晕时测量",
"D": "测得异常就立即自行加药"
},
"answer": "B",
"score": 1,
"score_rule": "完全匹配标准答案得 1 分，否则 0 分",
"explanation_ref": "K-BP-002",
"difficulty": "basic"
},
{
"question_id": "Q-BP-003",
"node_id": "reading_interpretation",
"major_focus": [
"all"
],
"type": "single_choice",
"stem": "面对一次与平时不同的读数，合适的解释是？",
"options": {
"A": "一次读数就能确定长期状态",
"B": "只看最接近期望的数值",
"C": "结合规范测量条件和连续记录判断，不自行诊断",
"D": "删除异常记录"
},
"answer": "C",
"score": 1,
"score_rule": "完全匹配标准答案得 1 分，否则 0 分",
"explanation_ref": "K-BP-003",
"difficulty": "basic"
},
{
"question_id": "Q-BP-004",
"node_id": "medication_boundary",
"major_focus": [
"all"
],
"type": "single_choice",
"stem": "居民问‘我能不能自己停药’，学生应如何回应？",
"options": {
"A": "根据今天读数决定",
"B": "建议先减半",
"C": "说明不要自行调整，并建议咨询有资质的医务人员",
"D": "推荐保健品替代"
},
"answer": "C",
"score": 1,
"score_rule": "完全匹配标准答案得 1 分，否则 0 分",
"explanation_ref": "K-BP-004",
"difficulty": "basic"
},
{
"question_id": "Q-BP-005",
"node_id": "risk_referral",
"major_focus": [
"all"
],
"type": "single_choice",
"stem": "合成病例出现预设警示信息并伴明显不适时，首先应？",
"options": {
"A": "只讲一般生活方式",
"B": "继续闲聊观察",
"C": "按课程规则及时转介，紧急时提示拨打 120",
"D": "自行给出诊断"
},
"answer": "C",
"score": 1,
"score_rule": "完全匹配标准答案得 1 分，否则 0 分",
"explanation_ref": "K-BP-005",
"difficulty": "basic"
},
{
"question_id": "Q-BP-101",
"node_id": "home_reading_interpretation_boundary",
"major_focus": [
"other"
],
"type": "single_choice",
"difficulty": "intermediate",
"stem": "王阿姨连续一周在家测血压，早上多在 145/92 左右，晚上在 138/86 左右；同周在社区测的一次是 136/84。她说「那我这算不算高血压，要不要自己先吃药？」下面哪种回应最合适？",
"options": {
"A": "「家里测的都偏高，说明您确实是高血压了，先按天吃一片硝苯地平看看效果。」",
"B": "「不能只看某一次或某一边的数值，家里和社区的测量条件不一样；把这一周早晚的完整记录带去给医生，由医生结合两边结果判断，药不要自己加。」",
"C": "「社区那次是正常的，说明您没有高血压，家里那些记录可以不用管了。」",
"D": "「您把偏高那几天删掉，只留正常的记录给医生看，这样不容易被误诊。」"
},
"answer": "B",
"score": 1,
"score_rule": "完全匹配标准答案得 1 分，否则 0 分",
"explanation_ref": "K-BP-006"
},
{
"question_id": "Q-BP-102",
"node_id": "measurement_condition_confounder",
"major_focus": [
"other"
],
"type": "single_choice",
"difficulty": "intermediate",
"stem": "李叔早上起床后马上测血压，测得 158/96。他说：「我一测就高，肯定是药不管用了，今天多吃一片。」追问后发现：他刚起床上过厕所回来，测之前喝了浓茶，测的时候一边说话一边举着袖带。最合适的处理是？",
"options": {
"A": "先认同他的判断，建议今天加服一片，明天再复测。",
"B": "说明这次读数可能受刚起床、喝浓茶、说话和袖带位置影响，先按规范安静坐 5 分钟、不说不动重测一次，并把两次读数和当时的条件都记下来，药不要动。",
"C": "让他改到下午再测，早上这次不作数，也不必记录。",
"D": "告诉他「测一次高不代表什么」，不必再测，等下次社区体检再说。"
},
"answer": "B",
"score": 1,
"score_rule": "完全匹配标准答案得 1 分，否则 0 分",
"explanation_ref": "K-BP-001"
},
{
"question_id": "Q-BP-103",
"node_id": "elderly_concern_shared_decision",
"major_focus": [
"other"
],
"type": "single_choice",
"difficulty": "intermediate",
"stem": "陈奶奶独居，记录里连续几天早上 160/100，还有一次站起时头晕。她说：「闺女在外地，别跟她说，我自己歇歇就好，不想给孩子添麻烦。」这时更合适的回应是？",
"options": {
"A": "「那就先不告诉女儿，您自己在家观察几天，有变化再说。」",
"B": "「您是不想让孩子担心，这个我理解。不过头晕加上血压偏高，只在家歇着不安全。我们不一定先找女儿，可以现在就一起打社区医生的电话，您看行吗？」",
"C": "「不行，必须马上给女儿打电话，这是规定。」",
"D": "「您这情况挺常见的，多喝水、少盐就行，先不用联系任何人。」"
},
"answer": "B",
"score": 1,
"score_rule": "完全匹配标准答案得 1 分，否则 0 分",
"explanation_ref": "K-COM-001"
},
{
"question_id": "Q-BP-104",
"node_id": "hypotension_symptom_check",
"major_focus": [
"other"
],
"type": "single_choice",
"difficulty": "intermediate",
"stem": "张伯吃降压药两周，最近起床时眼前发黑，前天在卫生间差点摔倒。今天早上坐着测 96/58，站起来再测 88/54。他说「低了就是好事，我把药减一半吧」。最合适的处理是？",
"options": {
"A": "同意减半，让他继续观察。",
"B": "说明偏低加上起身头晕、差点跌倒，需要尽快让医生评估，先记录坐位和站位血压、头晕发生的时间，药不要自己减，同时提醒起床、如厕时慢一点防跌倒。",
"C": "测得太低说明血压计坏了，换一台再测。",
"D": "让他多喝盐水、躺一会儿就好，不必联系医生。"
},
"answer": "B",
"score": 1,
"score_rule": "完全匹配标准答案得 1 分，否则 0 分",
"explanation_ref": "K-BP-004"
},
{
"question_id": "Q-BP-105",
"node_id": "unverified_remedy_boundary",
"major_focus": [
"other"
],
"type": "single_choice",
"difficulty": "intermediate",
"stem": "刘阿姨听说邻居喝某种「降压茶」后血压正常了，已经买了两盒，问：「我是不是可以把药停了，改喝茶？」最合适的回应是？",
"options": {
"A": "「可以试试，很多人喝了有效，先把药停两周看看。」",
"B": "「这类茶没有经过验证，不能替代降压药，也不建议自行停药；您可以把包装和成分记下来，下次就诊时带给医生看，由医生判断能不能和现在的药一起用。」",
"C": "「茶没有副作用，喝多少都行，药可以少吃一半。」",
"D": "「邻居有效您也会有效，先按邻居的喝法来。」"
},
"answer": "B",
"score": 1,
"score_rule": "完全匹配标准答案得 1 分，否则 0 分",
"explanation_ref": "K-BP-004"
},
{
"question_id": "Q-CM-101",
"node_id": "history_chief_complaint",
"major_focus": [
"clinical_medicine"
],
"type": "single_choice",
"difficulty": "basic",
"stem": "门诊接诊一名反复上腹不适三周的居民，在书写主诉时，下列做法最规范的是：",
"options": {
"A": "把「慢性胃炎待查」作为主诉写在病历最前，便于后续对照",
"B": "用患者自己的话概括最主要的不适及其持续时间，一般不超过二十字",
"C": "把本次就诊前所有症状按时间顺序逐条罗列在主诉中，力求完整",
"D": "以「血压 150/95 mmHg」作为主诉，突出本次发现的异常指标"
},
"answer": "B",
"score": 1,
"score_rule": "完全匹配标准答案得 1 分，否则 0 分",
"explanation_ref": "K-CLIN-101"
},
{
"question_id": "Q-CM-102",
"node_id": "chest_pain_red_flag",
"major_focus": [
"clinical_medicine"
],
"type": "single_choice",
"difficulty": "basic",
"stem": "一名 58 岁男性因胸骨后压闷感 40 分钟来诊，伴出汗、恶心。接诊时最先应当做的是：",
"options": {
"A": "先详细询问饮食习惯与家族史，信息齐全后再决定处理方式",
"B": "先开具胸部 CT，待影像结果明确后再判断病情轻重",
"C": "立即测量生命体征并完成心电图，优先判断是否存在致命性胸痛",
"D": "先给予口服止痛药缓解不适，待疼痛缓解后再做系统评估"
},
"answer": "C",
"score": 1,
"score_rule": "完全匹配标准答案得 1 分，否则 0 分",
"explanation_ref": "K-CLIN-111"
},
{
"question_id": "Q-CM-103",
"node_id": "preanalytical_check",
"major_focus": [
"clinical_medicine"
],
"type": "single_choice",
"difficulty": "basic",
"stem": "一名正在静脉输液的患者需要抽血复查电解质与血糖。采血前最应当核对并落实的是：",
"options": {
"A": "避免在输液同侧肢体采血，必要时在对侧肢体采血并及时送检",
"B": "优先从输液侧肢体采血，因该侧血管充盈、穿刺成功率更高",
"C": "只要采血量足够，采血部位与是否输液都不影响电解质结果",
"D": "应在输液结束后立即于同侧肢体采血，以保证前后结果可比"
},
"answer": "A",
"score": 1,
"score_rule": "完全匹配标准答案得 1 分，否则 0 分",
"explanation_ref": "K-CLIN-137"
},
{
"question_id": "Q-CM-104",
"node_id": "plain_language_explain",
"major_focus": [
"clinical_medicine"
],
"type": "single_choice",
"difficulty": "basic",
"stem": "一位居民拿着刚取到的化验单询问「我这个指标高一点是不是很严重」。此时最恰当的回应是：",
"options": {
"A": "直接告诉他「没事，不用担心」，以免其产生不必要的焦虑",
"B": "用通俗语言说明该指标的含义和常见影响因素，说明还需结合临床表现判断，并确认他是否听懂",
"C": "建议他自行上网查询该指标的正常范围与临床意义，之后再讨论",
"D": "直接告知具体疾病名称，便于他尽早接受针对性治疗"
},
"answer": "B",
"score": 1,
"score_rule": "完全匹配标准答案得 1 分，否则 0 分",
"explanation_ref": "K-CLIN-156"
},
{
"question_id": "Q-CM-105",
"node_id": "scope_of_practice_boundary",
"major_focus": [
"clinical_medicine"
],
"type": "single_choice",
"difficulty": "basic",
"stem": "在社区义诊中，一名居民拿着既往处方要求「照着这个再开一盒」，而你尚处于未取得处方权的实习阶段。最恰当的处理是：",
"options": {
"A": "按原处方照抄一份，方便居民尽快取药、不耽误治疗",
"B": "说明自己目前不具备处方资质，请其到门诊由执业医师评估后开具，并将既往用药情况记录转达",
"C": "建议居民自行到药店购买相同成分的药物，省去排队时间",
"D": "先行开具处方，事后请带教医师补签名即可"
},
"answer": "B",
"score": 1,
"score_rule": "完全匹配标准答案得 1 分，否则 0 分",
"explanation_ref": "K-CLIN-146"
},
{
"question_id": "Q-CM-201",
"node_id": "emergency_abcde_sequence",
"major_focus": [
"clinical_medicine"
],
"type": "single_choice",
"difficulty": "intermediate",
"stem": "社区诊室内，一名 62 岁男性突然出现明显呼吸困难、口唇发绀，只能断续说出两三个字，伴大汗。此时最恰当的处置顺序是：",
"options": {
"A": "先完成既往史与用药史采集，信息齐全后再判断是否需要转诊",
"B": "立即评估气道与呼吸、给予氧疗并呼叫上级支援，同时持续监测生命体征",
"C": "先完成心电图与抽血检查，明确病因后再决定处理方案",
"D": "让患者平卧休息并安抚情绪，观察 30 分钟后再评估病情变化"
},
"answer": "B",
"score": 1,
"score_rule": "完全匹配标准答案得 1 分，否则 0 分",
"explanation_ref": "K-CLIN-128"
},
{
"question_id": "Q-CM-202",
"node_id": "differential_reasoning",
"major_focus": [
"clinical_medicine"
],
"type": "single_choice",
"difficulty": "intermediate",
"stem": "一名 24 岁男性，起初为脐周隐痛伴恶心，6 小时后疼痛固定于右下腹，走路时加重，体温 37.8℃，右下腹按压后放手时疼痛明显。此时最符合的鉴别思路是：",
"options": {
"A": "疼痛已由脐周转移至右下腹，应优先考虑急性阑尾炎，并动态复查腹部体征",
"B": "疼痛位置已经固定，说明病情趋于稳定，可按功能性消化不良处理并预约一周后复诊",
"C": "体温未超过 38.5℃，可基本排除腹腔感染性病变，暂不需外科评估",
"D": "先按胃炎给予抑酸治疗，症状缓解即可排除外科急腹症"
},
"answer": "A",
"score": 1,
"score_rule": "完全匹配标准答案得 1 分，否则 0 分",
"explanation_ref": "K-CLIN-113"
},
{
"question_id": "Q-CM-203",
"node_id": "uncertainty_expression",
"major_focus": [
"clinical_medicine"
],
"type": "single_choice",
"difficulty": "intermediate",
"stem": "一名居民反复诉胸闷、心悸两周，本次心电图与心肌损伤标志物均未见异常，他仍坚持认为「肯定是心脏出了大问题」。此时最恰当的沟通与处理是：",
"options": {
"A": "明确告知「检查都正常，你没有病」，建议其不必再来就诊",
"B": "说明目前结果暂不支持严重心脏急症，但一次检查不能排除所有问题，交代需立即就诊的征象并安排复诊随访",
"C": "先按冠心病给予相应药物治疗，以免漏诊后承担责任",
"D": "告知其可能是心理因素所致，建议自行调整情绪后观察"
},
"answer": "B",
"score": 1,
"score_rule": "完全匹配标准答案得 1 分，否则 0 分",
"explanation_ref": "K-CLIN-159"
},
{
"question_id": "Q-CM-204",
"node_id": "referral_trigger",
"major_focus": [
"clinical_medicine"
],
"type": "single_choice",
"difficulty": "intermediate",
"stem": "一名 28 岁女性，停经约 7 周，突发下腹剧痛伴少量阴道流血，面色苍白、脉搏细速，血压 90/60 mmHg。社区接诊时最恰当的处置是：",
"options": {
"A": "先行妇科双合诊明确疼痛来源，再决定是否需要转诊",
"B": "立即建立静脉通路、监测生命体征并呼叫急救转诊，同时补充询问停经史与出血情况",
"C": "按痛经处理，给予解痉止痛后留观，待疼痛缓解再评估",
"D": "先完善血常规与超声检查，待结果回报后再联系转诊"
},
"answer": "B",
"score": 1,
"score_rule": "完全匹配标准答案得 1 分，否则 0 分",
"explanation_ref": "K-CLIN-123"
},
{
"question_id": "Q-CM-205",
"node_id": "shared_decision",
"major_focus": [
"clinical_medicine"
],
"type": "single_choice",
"difficulty": "intermediate",
"stem": "一名 70 岁男性因反复头晕就诊，医师建议进一步做心电图与血液检查，但居民表示「上次查过都正常，这次不想查了」。此时最恰当的做法是：",
"options": {
"A": "尊重其决定，直接结束本次就诊，不再交代其他注意事项",
"B": "说明本次建议检查的理由与暂不检查可能的风险，提供其可接受的替代安排和需立即就诊的指征，记录其决定并安排随访",
"C": "反复强调「不查后果自负」，要求其当场同意完成检查",
"D": "不告知相关风险，先开具检查单，让其自行决定是否去做"
},
"answer": "B",
"score": 1,
"score_rule": "完全匹配标准答案得 1 分，否则 0 分",
"explanation_ref": "K-CLIN-160"
},
{
"question_id": "Q-MT-101",
"node_id": "preanalytic_identity_check",
"major_focus": [
"medical_technology"
],
"type": "single_choice",
"difficulty": "basic",
"stem": "关于住院患者静脉血标本采集后的标识，下列做法正确的是？",
"options": {
"A": "采血后将标本集中带回治疗室，再按申请单统一粘贴标签",
"B": "在患者床旁采集完成后立即粘贴标签，核对姓名、住院号、采集日期与时间及采集者",
"C": "先在治疗室贴好标签，再携已贴签的采血管到床旁按标签提示采血",
"D": "由同病室患者或家属代为确认患者身份后粘贴标签"
},
"answer": "B",
"score": 1,
"score_rule": "完全匹配标准答案得 1 分，否则 0 分",
"explanation_ref": "K-MT-113"
},
{
"question_id": "Q-MT-102",
"node_id": "critical_value_closed_loop",
"major_focus": [
"medical_technology"
],
"type": "single_choice",
"difficulty": "basic",
"stem": "某检验项目结果达到危急值，经复核确认无误后，检验人员的正确处置是？",
"options": {
"A": "在检验系统内记录结果，等临床医师自行查看后处理",
"B": "先按常规流程发出报告，再于交班时口头告知接班同事",
"C": "按机构规定时限电话通知临床，登记患者信息、项目、结果、接听人与时间，并追踪临床是否处置",
"D": "请患者家属转告主管医师，以免电话打扰临床工作"
},
"answer": "C",
"score": 1,
"score_rule": "完全匹配标准答案得 1 分，否则 0 分",
"explanation_ref": "K-MT-164"
},
{
"question_id": "Q-MT-103",
"node_id": "imaging_accompanying_protection",
"major_focus": [
"medical_technology"
],
"type": "single_choice",
"difficulty": "basic",
"stem": "放射检查中，患者因病情需要家属在检查室内扶持，下列做法正确的是？",
"options": {
"A": "让家属直接扶持患者，检查结束后再补做登记",
"B": "为缩短检查时间，让家属站在患者身后扶持，不必穿戴防护用品",
"C": "仅在患者主动询问时才告知家属辐射风险",
"D": "先确认确有必要，告知辐射风险并提供铅衣等防护用品，登记后安排家属扶持"
},
"answer": "D",
"score": 1,
"score_rule": "完全匹配标准答案得 1 分，否则 0 分",
"explanation_ref": "K-MT-142"
},
{
"question_id": "Q-MT-104",
"node_id": "calibration_reagent_lot_change",
"major_focus": [
"medical_technology"
],
"type": "single_choice",
"difficulty": "basic",
"stem": "某检测项目更换试剂批号后，正确的处理是？",
"options": {
"A": "沿用原校准曲线直接检测，待下次常规校准日再统一校准",
"B": "重新校准并做验证，比对结果在允许范围内方可发出报告",
"C": "只做一次质控，质控点在控即可不校准直接检测",
"D": "先用新批号试剂检测少量标本，结果与旧批号接近即可"
},
"answer": "B",
"score": 1,
"score_rule": "完全匹配标准答案得 1 分，否则 0 分",
"explanation_ref": "K-MT-120"
},
{
"question_id": "Q-MT-105",
"node_id": "report_scope_boundary",
"major_focus": [
"medical_technology"
],
"type": "single_choice",
"difficulty": "basic",
"stem": "患者拿到影像报告后追问自己是否得了某种疾病，技术人员的正确回应是？",
"options": {
"A": "依据报告中的描述性所见，直接告知患者所患疾病的名称",
"B": "告诉患者报告没有问题，以免其过度担心",
"C": "说明报告为影像所见与印象，最终诊断需由临床医师结合病史与其他检查判断，并引导患者咨询主诊医师",
"D": "以保护隐私为由拒绝回答任何问题，让患者自行理解报告内容"
},
"answer": "C",
"score": 1,
"score_rule": "完全匹配标准答案得 1 分，否则 0 分",
"explanation_ref": "K-MT-169"
},
{
"question_id": "Q-MT-201",
"node_id": "clinical_mismatch_review_sequence",
"major_focus": [
"medical_technology"
],
"type": "single_choice",
"difficulty": "intermediate",
"stem": "某住院患者生化结果显示血钾明显高于参考区间，但患者无相应症状，近期心电图也未见明显异常。按规范，检验人员下一步最恰当的处置是？",
"options": {
"A": "直接按危急值电话通知临床，不必再核查标本与仪器",
"B": "先核对患者身份与标本信息，再查看标本质量（有无溶血、凝块、采血量不足），然后检查仪器状态与当日质控，必要时复测，确认无误后如实报告并在备注中说明已复核",
"C": "在信息系统内将结果手工改为接近参考区间的数值，再通知临床",
"D": "本批暂不发报告，等下一批标本一起复测后再决定如何报告"
},
"answer": "B",
"score": 1,
"score_rule": "完全匹配标准答案得 1 分，否则 0 分",
"explanation_ref": "K-MT-165"
},
{
"question_id": "Q-MT-202",
"node_id": "specimen_rejection_disposition",
"major_focus": [
"medical_technology"
],
"type": "single_choice",
"difficulty": "intermediate",
"stem": "护士送来一支凝血功能检测标本，采血量明显低于管壁标示刻度，临床因患者急需结果多次催促。检验人员的正确处置是？",
"options": {
"A": "把标本离心后取上层血浆检测，并在报告备注中说明采血量不足",
"B": "先将标本倒出一部分再混匀，使血量与抗凝剂比例相符后检测",
"C": "按拒收标准拒收该标本，记录拒收原因与时间，通知临床说明抗凝剂相对过量会使结果失真并请重新采集",
"D": "先上机检测，若结果在参考区间内就直接发出，异常时再要求重采"
},
"answer": "C",
"score": 1,
"score_rule": "完全匹配标准答案得 1 分，否则 0 分",
"explanation_ref": "K-MT-111"
},
{
"question_id": "Q-MT-203",
"node_id": "qc_out_of_control_hold",
"major_focus": [
"medical_technology"
],
"type": "single_choice",
"difficulty": "intermediate",
"stem": "某批次检测的室内质控结果超出允许范围，该批次已产生数十份患者结果，其中部分报告尚未发出。此时正确的处置顺序是？",
"options": {
"A": "先发出已完成的报告，再补做质控，若后续在控则不再追溯",
"B": "挑选在控的质控点作为判断依据，认为该批结果可接受并正常发出",
"C": "只重新检测质控品，质控在控后即发出原批次患者结果",
"D": "暂停发放该批报告，查找试剂、校准、仪器与操作原因，纠正后重新检测该批标本并使质控在控，再评估已发报告是否需要更正"
},
"answer": "D",
"score": 1,
"score_rule": "完全匹配标准答案得 1 分，否则 0 分",
"explanation_ref": "K-MT-119"
},
{
"question_id": "Q-MT-204",
"node_id": "imaging_critical_escalation",
"major_focus": [
"medical_technology"
],
"type": "single_choice",
"difficulty": "intermediate",
"stem": "技师在为一名突发剧烈胸背痛的患者行胸部增强 CT 时，图像上见可疑主动脉夹层征象，患者血压波动、疼痛明显。此时最恰当的处置是？",
"options": {
"A": "立即口头通知当班医师并记录通知时间与接听人，同时保持患者不动、监测生命体征，优先完成并发出报告",
"B": "先完成全部扫描序列与图像后处理，待报告审核完成后再通知临床",
"C": "仅在信息系统内写入危急结论，等临床医师自行查看",
"D": "让患者自行前往急诊说明情况，以免占用检查设备"
},
"answer": "A",
"score": 1,
"score_rule": "完全匹配标准答案得 1 分，否则 0 分",
"explanation_ref": "K-MT-168"
},
{
"question_id": "Q-MT-205",
"node_id": "report_correction_flow",
"major_focus": [
"medical_technology"
],
"type": "single_choice",
"difficulty": "intermediate",
"stem": "某已发出的检验报告被发现结果录入有误，正确结果与已发报告明显不同。按规范，正确的处理是？",
"options": {
"A": "按机构流程开具更正或补充报告，写明原报告内容、更正内容、原因与时间，经审核后发出并通知临床，保留可追溯的更正痕迹",
"B": "在信息系统内直接覆盖原结果并保存，使记录只保留正确数值",
"C": "删除原报告及历史版本，重新生成一份新报告发出",
"D": "电话告知临床正确结果即可，不必再出具书面更正"
},
"answer": "A",
"score": 1,
"score_rule": "完全匹配标准答案得 1 分，否则 0 分",
"explanation_ref": "K-MT-170"
},
{
"question_id": "Q-NU-101",
"node_id": "vital_signs_monitoring_frequency",
"major_focus": [
"nursing"
],
"type": "single_choice",
"difficulty": "basic",
"stem": "关于住院患者生命体征的监测与记录，下列做法正确的是？",
"options": {
"A": "所有患者入院后统一每 4 小时测量一次，直到出院不再调整。",
"B": "患者主诉不适时先记在交班本上，等下一班次统一测量处理。",
"C": "上一次测量结果正常时，本次可省略测量，直接沿用前次的数值记录。",
"D": "依据医嘱与护理级别确定监测频次，病情不稳定或刚调整治疗时加密观察，病情稳定后按规范延长间隔，每次测量后及时记录，异常值复测并按流程上报。"
},
"answer": "D",
"score": 1,
"score_rule": "完全匹配标准答案得 1 分，否则 0 分",
"explanation_ref": "K-NUR-118"
},
{
"question_id": "Q-NU-102",
"node_id": "medication_administration_check",
"major_focus": [
"nursing"
],
"type": "single_choice",
"difficulty": "basic",
"stem": "护士执行口服给药时，下列查对做法正确的是？",
"options": {
"A": "在操作前、中、后三次核对患者身份、药名、剂量、浓度、时间、途径与有效期，口服与注射给药均需在患者面前再次确认，发现疑问立即停止执行并报告。",
"B": "凭床号确认患者身份，以缩短发药时间、提高效率。",
"C": "操作前核对一次即可，操作中与操作后不必重复核对。",
"D": "患者表示以前服用过该药，即可跳过腕带核对直接给药。"
},
"answer": "A",
"score": 1,
"score_rule": "完全匹配标准答案得 1 分，否则 0 分",
"explanation_ref": "K-NUR-128"
},
{
"question_id": "Q-NU-103",
"node_id": "fall_risk_assessment",
"major_focus": [
"nursing"
],
"type": "single_choice",
"difficulty": "basic",
"stem": "关于住院患者跌倒风险的评估与预防，下列做法正确的是？",
"options": {
"A": "入院当天评估一次即可，住院期间病情变化时不再复评。",
"B": "对能够自行行走的患者，不必进行跌倒风险评估。",
"C": "入院及病情变化时使用统一工具评估，结合年龄、用药、步态、视力与认知判断风险等级，按等级落实床栏、陪护、呼叫器置于可及处、如厕协助等措施并记录。",
"D": "患者发生跌倒后，应立即将其扶回床上休息，再评估有无损伤。"
},
"answer": "C",
"score": 1,
"score_rule": "完全匹配标准答案得 1 分，否则 0 分",
"explanation_ref": "K-NUR-137"
},
{
"question_id": "Q-NU-104",
"node_id": "patient_education_teach_back",
"major_focus": [
"nursing"
],
"type": "single_choice",
"difficulty": "basic",
"stem": "护士完成患者用药教育后，确认患者真正理解教育内容的最恰当做法是？",
"options": {
"A": "把药品说明书交给患者，请其自行阅读并签字确认。",
"B": "请患者用自己的话复述药物作用、服用时间与方式、常见不良反应及漏服处理，对其遗漏或错误之处再补充讲解，直至复述正确。",
"C": "放慢语速、提高音量，把注意事项再重复讲解一遍。",
"D": "请家属在健康教育记录单上代为签字，即视为患者已掌握。"
},
"answer": "B",
"score": 1,
"score_rule": "完全匹配标准答案得 1 分，否则 0 分",
"explanation_ref": "K-NUR-136"
},
{
"question_id": "Q-NU-105",
"node_id": "sbar_handover",
"major_focus": [
"nursing"
],
"type": "single_choice",
"difficulty": "basic",
"stem": "按照 SBAR 框架进行交接班时，下列表述正确的是？",
"options": {
"A": "先说明自己的建议与处理意见，再补充患者现状与背景资料。",
"B": "只交接新入院与危重患者，长期住院的稳定患者无需逐班交接。",
"C": "口头交接清楚即可，交接双方不必在记录上签名确认。",
"D": "依次说明患者现状与主诉、背景与诊断、目前评估结果、建议与需要关注的事项，交接内容具体到数值和时间，避免笼统描述。"
},
"answer": "D",
"score": 1,
"score_rule": "完全匹配标准答案得 1 分，否则 0 分",
"explanation_ref": "K-NUR-169"
},
{
"question_id": "Q-NU-201",
"node_id": "deterioration_priority_response",
"major_focus": [
"nursing"
],
"type": "single_choice",
"difficulty": "intermediate",
"stem": "夜班护士巡视时发现一位患者突发胸闷、气促，呼吸频率明显增快，口唇轻度发绀，血氧饱和度较前下降；该患者半小时前刚更换过输液袋。此时护士首先应做的是？",
"options": {
"A": "立即停止输液，保留剩余药液与输液器，更换输液通路，给予吸氧并监测生命体征，同时报告医师配合处理。",
"B": "先完成本班其余患者的治疗任务，待交接班时一并汇报。",
"C": "调快输液速度，使本次输液尽快结束，再观察症状是否缓解。",
"D": "安慰患者，说明可能是紧张所致，继续观察暂不处理。"
},
"answer": "A",
"score": 1,
"score_rule": "完全匹配标准答案得 1 分，否则 0 分",
"explanation_ref": "K-NUR-131"
},
{
"question_id": "Q-NU-202",
"node_id": "critical_value_reporting",
"major_focus": [
"nursing"
],
"type": "single_choice",
"difficulty": "intermediate",
"stem": "护士接到检验科电话，报告某患者的一项血液检验结果达到危急值，而患者当时并无明显自觉不适。护士的处理最恰当的是？",
"options": {
"A": "先在护理记录上登记，等医师查房时再当面告知。",
"B": "转告同班护士，由同班护士决定是否上报医师。",
"C": "复述确认患者信息、检验项目与数值，立即报告医师，记录报告时间与接收人，并跟踪处理与复查结果，形成闭环。",
"D": "因患者没有症状，可暂不处理，等下次采血时一并复查。"
},
"answer": "C",
"score": 1,
"score_rule": "完全匹配标准答案得 1 分，否则 0 分",
"explanation_ref": "K-NUR-171"
},
{
"question_id": "Q-NU-203",
"node_id": "interprofessional_referral",
"major_focus": [
"nursing"
],
"type": "single_choice",
"difficulty": "intermediate",
"stem": "一位急性卒中后的患者在接受协助饮水时出现呛咳，之后声音变得湿润，但此前能清楚说话、对答正常。护士下一步最恰当的处理是？",
"options": {
"A": "患者能清楚说话，说明吞咽功能正常，可继续缓慢喂水。",
"B": "让患者先休息片刻，改喂稠厚食物后继续观察，暂不报告。",
"C": "仅在交班本上注明「饮水偶有呛咳」，交由下一班继续观察。",
"D": "立即停止经口进食与进水，保持气道通畅，报告医师并联系言语治疗师完成吞咽功能评估后，再决定进食方式与食物性状。"
},
"answer": "D",
"score": 1,
"score_rule": "完全匹配标准答案得 1 分，否则 0 分",
"explanation_ref": "K-NUR-143"
},
{
"question_id": "Q-NU-204",
"node_id": "diagnosis_disclosure_boundary",
"major_focus": [
"nursing"
],
"type": "single_choice",
"difficulty": "intermediate",
"stem": "医师刚向患者告知检查结果提示恶性肿瘤可能，患者情绪激动，反复追问「我是不是没救了、还能活多久」。此时护士最恰当的回应是？",
"options": {
"A": "为安抚患者情绪，明确回答「这个病可以治好，不用担心」。",
"B": "陪伴在旁，先回应患者的情绪，用患者能理解的方式复述医师已告知的关键信息，说明诊断与预后需由医师进一步说明，并询问患者此刻最需要什么。",
"C": "代替医师解释诊断与预后，详细说明疾病分期和可选治疗方案。",
"D": "回避患者的提问，转移话题，劝其不要多想。"
},
"answer": "B",
"score": 1,
"score_rule": "完全匹配标准答案得 1 分，否则 0 分",
"explanation_ref": "K-NUR-166"
},
{
"question_id": "Q-NU-205",
"node_id": "physical_restraint_decision",
"major_focus": [
"nursing"
],
"type": "single_choice",
"difficulty": "intermediate",
"stem": "一位意识模糊的老年患者反复试图拔除留置管路，家属要求「把他的手绑起来，别让他拔管」。护士的处理最恰当的是？",
"options": {
"A": "先评估躁动原因并尝试替代措施，如改善环境、调整管路固定、加强陪护与定向沟通；确需约束时须有医嘱并告知家属，约束期间定时评估必要性、观察末梢循环与皮肤，条件允许尽早解除。",
"B": "立即用约束带固定四肢，防止管路脱出，不必再评估。",
"C": "尊重家属意见实施约束，在交班时口头说明即可，不必记录。",
"D": "暂不处理，等待患者自行安静，也不必上报。"
},
"answer": "A",
"score": 1,
"score_rule": "完全匹配标准答案得 1 分，否则 0 分",
"explanation_ref": "K-NUR-126"
},
{
"question_id": "Q-TCM-101",
"node_id": "four_diagnoses_sequence",
"major_focus": [
"traditional_chinese_medicine"
],
"type": "single_choice",
"difficulty": "basic",
"stem": "某实习生接诊一位初次就诊的患者，带教老师要求其按四诊合参（望、闻、问、切四类信息相互对照）的规范完成信息采集。下列做法正确的是：",
"options": {
"A": "先围绕主诉快速询问，随即切脉，据脉象直接写出证候名称",
"B": "按望、闻、问、切的顺序系统采集，记录客观所见与采集时间、条件，暂不自行作出证候结论",
"C": "先让患者填写体质问卷，再依据体质类型反推本次就诊的证候",
"D": "只采集舌象与脉象两项，其余内容留待复诊时补充"
},
"answer": "B",
"score": 1,
"score_rule": "完全匹配标准答案得 1 分，否则 0 分",
"explanation_ref": "K-TCM-117"
},
{
"question_id": "Q-TCM-102",
"node_id": "tongue_diagnosis_conditions",
"major_focus": [
"traditional_chinese_medicine"
],
"type": "single_choice",
"difficulty": "basic",
"stem": "为患者进行舌诊时，下列采集条件与记录方式正确的是：",
"options": {
"A": "在自然光下观察，确认未进食染苔食物、未刮舌，依次描述舌质、舌苔、舌形与润燥，并记录采集条件",
"B": "患者刚饮用浓咖啡，可直接观察并据舌苔颜色判断为热象",
"C": "为看得更清楚，先用压舌板刮去舌面厚苔后再观察",
"D": "在暖色灯光下观察，只要舌质偏红即可记录为热证"
},
"answer": "A",
"score": 1,
"score_rule": "完全匹配标准答案得 1 分，否则 0 分",
"explanation_ref": "K-TCM-111"
},
{
"question_id": "Q-TCM-103",
"node_id": "inquiry_completeness",
"major_focus": [
"traditional_chinese_medicine"
],
"type": "single_choice",
"difficulty": "basic",
"stem": "一位患者以“入睡困难”为主诉就诊。按问诊的完整性要求，下列做法正确的是：",
"options": {
"A": "仅围绕睡眠情况追问，其余内容不必涉及",
"B": "按寒热、汗出、头身、饮食、二便、睡眠、情志与既往史逐项询问，并追问起病时间与变化规律",
"C": "按量表顺序逐条念完问题，不观察患者反应，也不作追问",
"D": "先按失眠的常见证候提问，用“您是不是心脾两虚”一类问法请患者确认"
},
"answer": "B",
"score": 1,
"score_rule": "完全匹配标准答案得 1 分，否则 0 分",
"explanation_ref": "K-TCM-113"
},
{
"question_id": "Q-TCM-104",
"node_id": "constitution_service_boundary",
"major_focus": [
"traditional_chinese_medicine"
],
"type": "single_choice",
"difficulty": "basic",
"stem": "在社区为老年人完成中医体质辨识后，下列对结果的处理方式正确的是：",
"options": {
"A": "将体质类型填入诊断栏，并据此开具中药处方",
"B": "依据体质结果推荐某种中成药长期服用，作为日常调理方案",
"C": "说明这只是倾向性判断，用于饮食起居等方向性指导并约定复评时间，不写入诊断、不作为用药依据",
"D": "告知老人体质判定一次即可终生适用，无须再次评估"
},
"answer": "C",
"score": 1,
"score_rule": "完全匹配标准答案得 1 分，否则 0 分",
"explanation_ref": "K-TCM-145"
},
{
"question_id": "Q-TCM-105",
"node_id": "health_education_wording",
"major_focus": [
"traditional_chinese_medicine"
],
"type": "single_choice",
"difficulty": "basic",
"stem": "向患者解释其近期乏力、面色偏淡的表现时，下列表述符合中医健康教育规范的是：",
"options": {
"A": "“您这是气血两虚，按这个方子吃一个月就能好。”",
"B": "“中医看舌象就够了，西医那些检查没必要做。”",
"C": "“您这属于虚证，我给您推荐一种补品，先吃三个月看看。”",
"D": "“这些表现按中医思路可能与气血不足有关，但需要医师四诊合参并结合必要检查来判断，我不能给您下结论。”"
},
"answer": "D",
"score": 1,
"score_rule": "完全匹配标准答案得 1 分，否则 0 分",
"explanation_ref": "K-TCM-127"
},
{
"question_id": "Q-TCM-201",
"node_id": "emergency_stroke_referral",
"major_focus": [
"traditional_chinese_medicine"
],
"type": "single_choice",
"difficulty": "intermediate",
"stem": "上午查房时，一位68岁患者突然出现口角歪斜、左侧肢体无力、言语不清，症状出现约40分钟。家属认为“可能是受风了”，希望先做经络调理，稍后再决定是否就医。此时最恰当的处理是：",
"options": {
"A": "先按风邪中络向家属解释病情，为患者按揉穴位观察半小时再判断",
"B": "在指尖放血以“醒神开窍”，待症状缓解后再考虑转诊",
"C": "立即记录发病时间、保持气道通畅，启动急症流程并呼叫医师、安排急救转运，不采用放血或针刺处置",
"D": "先完成舌诊与脉诊、明确证候类型，再决定是否转诊"
},
"answer": "C",
"score": 1,
"score_rule": "完全匹配标准答案得 1 分，否则 0 分",
"explanation_ref": "K-TCM-166"
},
{
"question_id": "Q-TCM-202",
"node_id": "herb_drug_interaction_check",
"major_focus": [
"traditional_chinese_medicine"
],
"type": "single_choice",
"difficulty": "intermediate",
"stem": "一位长期服用抗凝药（如华法林）的患者，因自觉“气血不通”自行购买了含活血类成分的中成药，询问能否与西药同服、是否隔开半小时就安全。作为接诊团队的一员，正确的做法是：",
"options": {
"A": "告知患者中药与西药隔开半小时服用就不会有相互作用",
"B": "建议患者先停用抗凝药，改服中成药观察一段时间",
"C": "认为中成药属于天然制品，多服一些也不会增加出血风险",
"D": "将中成药与保健品一并逐项登记进用药清单，说明可能存在相互作用与出血风险，请医师或药师评估，不自行建议停药、加药或更改服药时间"
},
"answer": "D",
"score": 1,
"score_rule": "完全匹配标准答案得 1 分，否则 0 分",
"explanation_ref": "K-TCM-168"
},
{
"question_id": "Q-TCM-203",
"node_id": "insufficient_info_expression",
"major_focus": [
"traditional_chinese_medicine"
],
"type": "single_choice",
"difficulty": "intermediate",
"stem": "一位患者舌质偏红、舌苔黄，但同时诉畏寒明显、大便稀溏，四诊所得并不一致。患者反复要求“给个准话”，希望马上知道自己是寒还是热。此时恰当的回应是：",
"options": {
"A": "选取与最初印象相符的舌象予以记录，其余不一致的信息暂不写入",
"B": "为满足患者期待，先给出一个明确的证候名称，嘱其按此自行调理",
"C": "说明目前资料不一致、尚不能形成判断，列出还需补充的信息并安排复评，必要时请医师复核",
"D": "告知患者四诊不一致说明病情复杂，建议其自行观察一个月后再就诊"
},
"answer": "C",
"score": 1,
"score_rule": "完全匹配标准答案得 1 分，否则 0 分",
"explanation_ref": "K-TCM-126"
},
{
"question_id": "Q-TCM-204",
"node_id": "high_fever_emergency_referral",
"major_focus": [
"traditional_chinese_medicine"
],
"type": "single_choice",
"difficulty": "intermediate",
"stem": "夜班时一位患者体温39.5℃，伴寒战、意识模糊、呼吸急促。家属询问能否先“清热调理”、喝点凉茶观察一晚。此时应当：",
"options": {
"A": "先辨明属风寒还是风热，再决定是否报告医师",
"B": "建议家属先给患者服用退热药，观察至次日晨交班",
"C": "嘱患者多饮凉茶、加盖衣被发汗，待汗出后再评估",
"D": "立即测量并记录生命体征，按急症流程呼叫医师、安排转诊，不以辨证解释延误处理，用药由医师决定"
},
"answer": "D",
"score": 1,
"score_rule": "完全匹配标准答案得 1 分，否则 0 分",
"explanation_ref": "K-TCM-167"
},
{
"question_id": "Q-TCM-205",
"node_id": "prescription_scope_boundary",
"major_focus": [
"traditional_chinese_medicine"
],
"type": "single_choice",
"difficulty": "intermediate",
"stem": "一位患者家属拿着从网络抄来的方子，要求实习同学“照着抓几副先吃着”，并表示“中药平和，吃不好也吃不坏”。下列处理正确的是：",
"options": {
"A": "说明处方与剂量须由具备资质的执业医师面诊后开具，不抄录方子、不增减药味、不推荐中成药，可协助整理四诊记录并预约医师",
"B": "按家属提供的方子抄录一遍，注明“仅供参考”后交给家属",
"C": "根据患者的体质辨识结果，在方子上增减几味药再交给家属",
"D": "先让患者试服两剂，若无不适再请医师确认"
},
"answer": "A",
"score": 1,
"score_rule": "完全匹配标准答案得 1 分，否则 0 分",
"explanation_ref": "K-TCM-108"
},
{
"question_id": "Q-RH-101",
"node_id": "pre_training_safety_screen",
"major_focus": [
"rehabilitation"
],
"type": "single_choice",
"difficulty": "basic",
"stem": "为一名脑卒中后偏瘫患者开始当天的站立平衡训练前，最符合规范的做法是？",
"options": {
"A": "按昨天的训练量直接开始，训练结束后再补测生命体征",
"B": "只要患者说“今天感觉还行”，即可直接开始训练",
"C": "先核对生命体征、主诉与用药情况，确认无禁忌后再开始训练",
"D": "先进行高强度训练，观察患者能否耐受，再决定是否评估"
},
"answer": "C",
"score": 1,
"score_rule": "完全匹配标准答案得 1 分，否则 0 分",
"explanation_ref": "K-RH-COURSE-006"
},
{
"question_id": "Q-RH-102",
"node_id": "stop_signal_recognition",
"major_focus": [
"rehabilitation"
],
"type": "single_choice",
"difficulty": "basic",
"stem": "训练过程中，患者主诉头晕，并出现面色苍白、出汗。此时最恰当的处理是？",
"options": {
"A": "鼓励患者坚持完成当日组数，以免影响训练进度",
"B": "立即停止训练，协助患者安全坐下或卧下，并观察生命体征",
"C": "降低阻力继续训练，只关注动作是否到位，不必在意面色变化",
"D": "让患者自行走到走廊休息，稍后回来继续训练"
},
"answer": "B",
"score": 1,
"score_rule": "完全匹配标准答案得 1 分，否则 0 分",
"explanation_ref": "K-RH-COURSE-006"
},
{
"question_id": "Q-RH-103",
"node_id": "functional_assessment_standard",
"major_focus": [
"rehabilitation"
],
"type": "single_choice",
"difficulty": "basic",
"stem": "关于康复功能评定（如 Barthel 指数、Berg 平衡量表）的实施与结果使用，哪项更规范？",
"options": {
"A": "把评定得分直接作为诊断结论告知患者",
"B": "为节省时间，可在患者疲劳状态下一次性完成全部评定",
"C": "不同评定者之间无需统一流程，凭经验判断即可",
"D": "按标准条件与统一说明实施，记录结果并说明其反映的是功能表现而非疾病诊断"
},
"answer": "D",
"score": 1,
"score_rule": "完全匹配标准答案得 1 分，否则 0 分",
"explanation_ref": "K-RH-COURSE-001"
},
{
"question_id": "Q-RH-104",
"node_id": "adl_training_principles",
"major_focus": [
"rehabilitation"
],
"type": "single_choice",
"difficulty": "basic",
"stem": "对脑卒中后偏瘫患者进行日常生活活动（ADL）训练时，哪项原则更恰当？",
"options": {
"A": "从患者当前能完成的部分入手，按“示范—辅助—逐步撤除辅助”的顺序训练",
"B": "为节省时间，由治疗师代替患者完成大部分动作",
"C": "一开始就要求患者独立完成全部穿衣、进食步骤",
"D": "只在训练室练习，不必在真实生活场景中重复"
},
"answer": "A",
"score": 1,
"score_rule": "完全匹配标准答案得 1 分，否则 0 分",
"explanation_ref": "K-RH-COURSE-003"
},
{
"question_id": "Q-RH-105",
"node_id": "caregiver_training_return_demo",
"major_focus": [
"rehabilitation"
],
"type": "single_choice",
"difficulty": "basic",
"stem": "出院前培训家属协助患者完成床椅转移，最符合规范的做法是？",
"options": {
"A": "口头讲解一遍转移步骤后，即让家属带患者回家",
"B": "只把转移注意事项写在纸上交给家属",
"C": "让家属在治疗师看护下实际操作并回示关键步骤，确认安全后再安排出院",
"D": "由家属自行观看视频学习，治疗师不必现场核对"
},
"answer": "C",
"score": 1,
"score_rule": "完全匹配标准答案得 1 分，否则 0 分",
"explanation_ref": "K-RH-COURSE-003"
},
{
"question_id": "Q-RH-201",
"node_id": "acute_change_first_response",
"major_focus": [
"rehabilitation"
],
"type": "single_choice",
"difficulty": "intermediate",
"stem": "一名脑卒中后 3 个月的患者在平行杠内练习步行时，突然出现患侧肢体无力加重、言语含糊。家属认为“再走两圈就缓过来了”，要求继续训练。此时最恰当的处理是？",
"options": {
"A": "先停止训练，协助患者安全坐稳并观察症状是否持续，记录起病时间，按流程启动转诊",
"B": "尊重家属意见，让患者走完剩余组数后再评估",
"C": "认为是疲劳所致，改为被动按摩后继续训练",
"D": "让患者自行回病房休息，次日再评估"
},
"answer": "A",
"score": 1,
"score_rule": "完全匹配标准答案得 1 分，否则 0 分",
"explanation_ref": "K-RH-COURSE-006"
},
{
"question_id": "Q-RH-202",
"node_id": "referral_threshold_decision",
"major_focus": [
"rehabilitation"
],
"type": "single_choice",
"difficulty": "intermediate",
"stem": "一名脑卒中后患者在步行训练中出现胸闷、心慌，休息 5 分钟后症状仍未缓解，血压较训练前明显升高。患者希望“把今天剩下的组数做完”。此时最合适的处理是？",
"options": {
"A": "继续观察 30 分钟，若仍不适再联系医生",
"B": "停止训练并保持安静休息，立即联系主管医生评估，按医嘱决定是否转诊",
"C": "认为症状与训练无关，改为坐位训练以完成当日计划",
"D": "让患者自行回家休息，嘱其不适加重再来"
},
"answer": "B",
"score": 1,
"score_rule": "完全匹配标准答案得 1 分，否则 0 分",
"explanation_ref": "K-RH-COURSE-006"
},
{
"question_id": "Q-RH-203",
"node_id": "shared_goal_setting",
"major_focus": [
"rehabilitation"
],
"type": "single_choice",
"difficulty": "intermediate",
"stem": "一名脑卒中后患者希望尽快“自己走回家”，家属担心跌倒，坚持要求全程搀扶。近期评定显示，患者目前需要在监护下完成短距离步行。在制定下一阶段训练目标时，最符合规范的做法是？",
"options": {
"A": "直接按家属要求全程搀扶，避免争执",
"B": "承诺患者短期内即可独立步行回家，以增强信心",
"C": "说明当前功能水平与跌倒风险，与患者和家属共同商定分阶段目标，并约定复评时间",
"D": "只与家属沟通，不必让患者参与目标制定"
},
"answer": "C",
"score": 1,
"score_rule": "完全匹配标准答案得 1 分，否则 0 分",
"explanation_ref": "K-RH-COURSE-002"
},
{
"question_id": "Q-RH-204",
"node_id": "discharge_transition_planning",
"major_focus": [
"rehabilitation"
],
"type": "single_choice",
"difficulty": "intermediate",
"stem": "一名脑卒中后患者即将出院，家属表示家中无人会协助床椅转移，也说不清复诊安排。患者希望“回家慢慢练”，家属则希望尽快办完手续。此时最恰当的做法是？",
"options": {
"A": "按原计划办理出院，让家属回家后自行摸索",
"B": "把训练动作打印给家属即可，不必核实其掌握情况",
"C": "建议患者延长住院，暂不讨论出院后的安排",
"D": "出院前完成照护者转移培训与回示，落实居家环境与随访安排，明确复诊和出现异常时的联系方式"
},
"answer": "D",
"score": 1,
"score_rule": "完全匹配标准答案得 1 分，否则 0 分",
"explanation_ref": "K-RH-COURSE-003"
},
{
"question_id": "Q-RH-205",
"node_id": "assessment_result_communication",
"major_focus": [
"rehabilitation"
],
"type": "single_choice",
"difficulty": "intermediate",
"stem": "复评后，家属看到患者的 Barthel 指数结果，问：“这个分数是不是说明他以后都走不了了？”患者本人在场，情绪低落。此时最合适的回应是？",
"options": {
"A": "说明评定反映的是当前功能表现与训练需求，不作为诊断或预后结论，建议与主管医生沟通，并把结果用于共同制定阶段目标",
"B": "直接告诉家属“这个分数说明以后都不能独立行走”",
"C": "回避问题，只说“慢慢会好的”，不解释评定的用途",
"D": "只把结果交给家属，让其自行理解"
},
"answer": "A",
"score": 1,
"score_rule": "完全匹配标准答案得 1 分，否则 0 分",
"explanation_ref": "K-RH-COURSE-001"
},
{
"question_id": "Q-HM-101",
"node_id": "health_record_baseline",
"major_focus": [
"health_management"
],
"type": "single_choice",
"difficulty": "basic",
"stem": "社区护士为一位新纳入慢病管理的居民建立健康档案，需要记录其家庭血压自测情况。下列记录方式最符合随访建档规范的是：",
"options": {
"A": "只写“血压偏高”，不记录测量时间、测量体位和所用血压计",
"B": "记录测量日期与时间、收缩压和舒张压、心率，以及测量时的体位、袖带和是否安静休息等条件",
"C": "只收录居民自述的“最高一次”数值，其余读数不再归档",
"D": "把家属口述的数值直接作为本次测量结果归档"
},
"answer": "B",
"score": 1,
"score_rule": "完全匹配标准答案得 1 分，否则 0 分",
"explanation_ref": "K-BP-003"
},
{
"question_id": "Q-HM-102",
"node_id": "measurement_conditions",
"major_focus": [
"health_management"
],
"type": "single_choice",
"difficulty": "basic",
"stem": "入户随访时，随访者准备为居民测量血压。下列准备与操作最恰当的是：",
"options": {
"A": "先请居民坐位安静休息，背部有支撑、双脚平放，手臂与心脏大致同高，测量过程中保持安静不说话",
"B": "居民刚上楼进门，趁其尚未坐下立即测量，以节省随访时间",
"C": "为操作方便，隔着较厚衣物把袖带绑在前臂上测量",
"D": "只测量一次，读数偏低就直接作为本次随访结果记录"
},
"answer": "A",
"score": 1,
"score_rule": "完全匹配标准答案得 1 分，否则 0 分",
"explanation_ref": "K-BP-001"
},
{
"question_id": "Q-HM-103",
"node_id": "followup_frequency_record",
"major_focus": [
"health_management"
],
"type": "single_choice",
"difficulty": "basic",
"stem": "对血压已相对稳定、纳入社区慢病管理的居民开展家庭血压随访，关于测量频次与记录，下列做法正确的是：",
"options": {
"A": "只在居民自诉不适时测量一次并记录",
"B": "要求居民每天测量十次以上，以便掌握全部波动",
"C": "建议在相对固定的时段测量，每个时段连续测量 2—3 次、间隔约 1 分钟并完整记录，情况稳定后可适当降低频率",
"D": "只记录看起来正常的读数，异常读数复测正常后不再保留"
},
"answer": "C",
"score": 1,
"score_rule": "完全匹配标准答案得 1 分，否则 0 分",
"explanation_ref": "K-BP-002"
},
{
"question_id": "Q-HM-104",
"node_id": "health_education_keypoints",
"major_focus": [
"health_management"
],
"type": "single_choice",
"difficulty": "basic",
"stem": "在社区健康教育活动中向居民讲解家庭血压监测，下列表述最恰当的是：",
"options": {
"A": "“家里测出来不高，就可以不再关注血压了。”",
"B": "“家用血压计的读数可以替代医院检查，不必再就诊。”",
"C": "“腕式血压计更准确，可以随意替代上臂式血压计。”",
"D": "“建议使用经过验证的上臂式电子血压计和合适袖带，在相对固定的条件下测量并完整记录，就诊时把记录带给医务人员一起看。”"
},
"answer": "D",
"score": 1,
"score_rule": "完全匹配标准答案得 1 分，否则 0 分",
"explanation_ref": "K-BP-001"
},
{
"question_id": "Q-HM-105",
"node_id": "followup_medication_record",
"major_focus": [
"health_management"
],
"type": "single_choice",
"difficulty": "basic",
"stem": "随访中一位居民提到“最近自己把降压药停了”。按随访记录与处置要求，此时最恰当的做法是：",
"options": {
"A": "只在档案中写“居民自行停药”，不追问原因，也不安排后续",
"B": "核实停药的时间、原因和目前有无不适，如实记录，说明不自行停药的重要性，建议其尽快向有资质的医务人员咨询，并约定下次随访",
"C": "当场建议居民改服另一种药物，并把这一建议写入随访记录",
"D": "认为用药是居民自己的事，随访中不再提及"
},
"answer": "B",
"score": 1,
"score_rule": "完全匹配标准答案得 1 分，否则 0 分",
"explanation_ref": "K-BP-004"
},
{
"question_id": "Q-HM-201",
"node_id": "referral_red_flag",
"major_focus": [
"health_management"
],
"type": "single_choice",
"difficulty": "intermediate",
"stem": "某社区慢病随访训练案例中，一位 68 岁居民纳入高血压随访管理已两年。近三天其家庭自测多在 165—175/100—105 mmHg，今天上午出现胸闷、轻微活动后气短，休息后未见缓解。居民表示“等下周随访时再说”。此时最恰当的处置是：",
"options": {
"A": "按原计划安排下周随访，届时再一起查看记录",
"B": "请居民增加测量次数，先发一份低盐饮食资料，本周不必联系医务人员",
"C": "说明这组读数与当前不适已超出一般健康教育的范围，建议立即联系医务人员；若症状加重或出现紧急情况立即拨打 120，并如实记录、按规定交班",
"D": "告知居民血压波动很常见，先自行观察两周再决定"
},
"answer": "C",
"score": 1,
"score_rule": "完全匹配标准答案得 1 分，否则 0 分",
"explanation_ref": "K-BP-005"
},
{
"question_id": "Q-HM-202",
"node_id": "trend_communication",
"major_focus": [
"health_management"
],
"type": "single_choice",
"difficulty": "intermediate",
"stem": "某社区随访训练案例中，一位居民近两周的家庭记录多在 138—146/86—92 mmHg，今天上午一次测得 128/80 mmHg。居民说“今天正常了，说明没问题，以后不用管了”。随访者用趋势而非单次读数进行沟通，最恰当的是：",
"options": {
"A": "认可今天的读数，据此判断血压已得到控制，结束本轮随访",
"B": "只把今天这一次 128/80 mmHg 记入档案，其余记录不再分析",
"C": "告知居民一次正常即说明问题已经解决，可以暂停随访",
"D": "与居民一起查看两周记录的分布和当时的测量条件，说明单次正常不能代表整体水平，并把完整记录带给医务人员评估"
},
"answer": "D",
"score": 1,
"score_rule": "完全匹配标准答案得 1 分，否则 0 分",
"explanation_ref": "K-BP-003"
},
{
"question_id": "Q-HM-203",
"node_id": "shared_decision_plan",
"major_focus": [
"health_management"
],
"type": "single_choice",
"difficulty": "intermediate",
"stem": "某社区随访训练案例中，一位在职居民上次随访约定每日早晚各测量一次，实际一周只测了两次，理由是“太忙，而且怕测多了会紧张”。随访者希望与其商定一个能坚持的随访计划。最恰当的做法是：",
"options": {
"A": "先询问其具体顾虑和可安排的时间，把“太忙”追问到具体时段，与其商定每周固定几天、在哪个时段测量，请其复述确认，并约定下次回访方式",
"B": "再次强调必须每天早晚各测三次，做不到即视为不配合",
"C": "认为居民不配合，改为只寄一份测量说明资料，不再安排回访",
"D": "由随访者代填几组“看起来合理”的数值，以保证档案完整"
},
"answer": "A",
"score": 1,
"score_rule": "完全匹配标准答案得 1 分，否则 0 分",
"explanation_ref": "K-BP-002"
},
{
"question_id": "Q-HM-204",
"node_id": "home_clinic_discordance",
"major_focus": [
"health_management"
],
"type": "single_choice",
"difficulty": "intermediate",
"stem": "某社区随访训练案例中，一位居民在诊室测得 150/95 mmHg，其家庭记录多在 130/82 mmHg 左右。居民问“到底以哪个为准，是不是医院的血压计坏了”。最恰当的回应是：",
"options": {
"A": "以诊室读数为准，家庭记录不必再看",
"B": "说明两者测量条件、意义和参考标准不同，家庭血压常用参考阈值为 135/85 mmHg、诊室常用 140/90 mmHg，不能互相替代或凭单次读数互换结论，建议把完整家庭记录带给医务人员综合判断",
"C": "以家庭读数为准，诊室偏高只是紧张，可以不再处理",
"D": "建议更换血压计重新开始记录，此前的记录全部作废"
},
"answer": "B",
"score": 1,
"score_rule": "完全匹配标准答案得 1 分，否则 0 分",
"explanation_ref": "K-BP-006"
},
{
"question_id": "Q-HM-205",
"node_id": "urgent_symptom_triage",
"major_focus": [
"health_management"
],
"type": "single_choice",
"difficulty": "intermediate",
"stem": "某社区随访训练案例中，居民在电话随访中述今晨起头痛明显、视物发花并伴恶心，家庭自测 180/110 mmHg，说“我先睡一觉，明天随访再说”。随访者最恰当的处置是：",
"options": {
"A": "记录数值，按原计划明天上门随访",
"B": "建议居民再多测几次，若仍然偏高再考虑就医",
"C": "立即说明这是需要紧急处理的情况，建议马上联系医务人员或拨打 120，不要等到次日随访，同时记录通话内容并按规定上报交班",
"D": "告知居民属于常见波动，先发送一份饮食资料"
},
"answer": "C",
"score": 1,
"score_rule": "完全匹配标准答案得 1 分，否则 0 分",
"explanation_ref": "K-BP-005"
},
{
"question_id": "Q-CM-206",
"node_id": "clin_extra_164",
"major_focus": [
"clinical_medicine"
],
"type": "single_choice",
"stem": "眼球感光作用最强的部位为",
"options": {
"A": "黄斑",
"B": "黄斑中央凹",
"C": "视神经盘",
"D": "视神经盘中央凹",
"E": "视网膜虹膜部"
},
"answer": "B",
"score": 1,
"score_rule": "完全匹配标准答案得 1 分，否则 0 分",
"explanation_ref": "K-CLIN-164",
"difficulty": "basic"
},
{
"question_id": "Q-CM-207",
"node_id": "clin_extra_165",
"major_focus": [
"clinical_medicine"
],
"type": "single_choice",
"stem": "具有吞噬功能的是",
"options": {
"A": "睫状体上皮",
"B": "角膜内皮",
"C": "角膜上皮",
"D": "虹膜上皮",
"E": "视网膜色素上皮层"
},
"answer": "E",
"score": 1,
"score_rule": "完全匹配标准答案得 1 分，否则 0 分",
"explanation_ref": "K-CLIN-165",
"difficulty": "basic"
},
{
"question_id": "Q-CM-208",
"node_id": "clin_extra_166",
"major_focus": [
"clinical_medicine"
],
"type": "single_choice",
"stem": "缺血性心脏病最常见的病因是",
"options": {
"A": "心肌肥厚",
"B": "严重贫血",
"C": "冠状动脉粥样硬化",
"D": "主动脉瓣狭窄",
"E": "主动脉瓣关闭不全"
},
"answer": "C",
"score": 1,
"score_rule": "完全匹配标准答案得 1 分，否则 0 分",
"explanation_ref": "K-CLIN-166",
"difficulty": "basic"
},
{
"question_id": "Q-CM-209",
"node_id": "clin_extra_167",
"major_focus": [
"clinical_medicine"
],
"type": "single_choice",
"stem": "颈内静脉二腹肌淋巴结肿大时，可首先考虑",
"options": {
"A": "甲状腺癌",
"B": "喉癌",
"C": "食管癌",
"D": "鼻咽癌",
"E": "腮腺癌"
},
"answer": "D",
"score": 1,
"score_rule": "完全匹配标准答案得 1 分，否则 0 分",
"explanation_ref": "K-CLIN-167",
"difficulty": "basic"
},
{
"question_id": "Q-CM-210",
"node_id": "clin_extra_168",
"major_focus": [
"clinical_medicine"
],
"type": "single_choice",
"stem": "膝关节内侧半月板",
"options": {
"A": "内缘厚，周缘薄",
"B": "呈“O”形",
"C": "前端有韧带连于胫骨粗隆",
"D": "较大，呈“C”型",
"E": "前端宽后份窄"
},
"answer": "D",
"score": 1,
"score_rule": "完全匹配标准答案得 1 分，否则 0 分",
"explanation_ref": "K-CLIN-168",
"difficulty": "basic"
},
{
"question_id": "Q-CM-211",
"node_id": "clin_extra_169",
"major_focus": [
"clinical_medicine"
],
"type": "single_choice",
"stem": "关于环层小体的描述，正确的是",
"options": {
"A": "感受压觉和振动觉",
"B": "圆形，与触觉小体大小相似",
"C": "有髓神经纤维穿行于中央",
"D": "分布于皮肤真皮乳头内",
"E": "薄层结缔组织组成被囊"
},
"answer": "A",
"score": 1,
"score_rule": "完全匹配标准答案得 1 分，否则 0 分",
"explanation_ref": "K-CLIN-169",
"difficulty": "basic"
},
{
"question_id": "Q-CM-212",
"node_id": "clin_extra_170",
"major_focus": [
"clinical_medicine"
],
"type": "single_choice",
"stem": "胃黏膜分泌内因子的细胞是",
"options": {
"A": "主细胞",
"B": "壁细胞",
"C": "黏膜上皮细胞",
"D": "未分化细胞",
"E": "内分泌细胞"
},
"answer": "B",
"score": 1,
"score_rule": "完全匹配标准答案得 1 分，否则 0 分",
"explanation_ref": "K-CLIN-170",
"difficulty": "basic"
},
{
"question_id": "Q-CM-213",
"node_id": "clin_extra_171",
"major_focus": [
"clinical_medicine"
],
"type": "single_choice",
"stem": "关于肾实质的描述，错误的是",
"options": {
"A": "分为肾皮质和肾髓质两部分",
"B": "皮质位于浅层，由肾小体和肾小管构成",
"C": "髓质位于深部，由 15～20 个肾锥体组成",
"D": "肾锥体的尖朝向皮质，称为肾乳头",
"E": "皮质伸入肾锥体之间的称为肾柱"
},
"answer": "D",
"score": 1,
"score_rule": "完全匹配标准答案得 1 分，否则 0 分",
"explanation_ref": "K-CLIN-171",
"difficulty": "basic"
},
{
"question_id": "Q-CM-214",
"node_id": "clin_extra_172",
"major_focus": [
"clinical_medicine"
],
"type": "single_choice",
"stem": "与淋巴结凸相连接的淋巴管是",
"options": {
"A": "输出淋巴管",
"B": "浅淋巴管",
"C": "深淋巴管",
"D": "输入淋巴管"
},
"answer": "D",
"score": 1,
"score_rule": "完全匹配标准答案得 1 分，否则 0 分",
"explanation_ref": "K-CLIN-172",
"difficulty": "basic"
},
{
"question_id": "Q-TCM-206",
"node_id": "tcm_extra_173",
"major_focus": [
"traditional_chinese_medicine"
],
"type": "single_choice",
"stem": "下面表述中，体现人与自然关系的是",
"options": {
"A": "尝贵后贱，可致脱营",
"B": "形与神俱，不可分离",
"C": "视其外应，以知其内脏",
"D": "四变之动，脉与之上下"
},
"answer": "D",
"score": 1,
"score_rule": "完全匹配标准答案得 1 分，否则 0 分",
"explanation_ref": "K-TCM-173",
"difficulty": "basic"
},
{
"question_id": "Q-TCM-207",
"node_id": "tcm_extra_174",
"major_focus": [
"traditional_chinese_medicine"
],
"type": "single_choice",
"stem": "多出现气逆病变的脏腑是",
"options": {
"A": "肺、脾、胃",
"B": "肝、胃、肺",
"C": "肺、脾、胆",
"D": "胃、肝、心"
},
"answer": "B",
"score": 1,
"score_rule": "完全匹配标准答案得 1 分，否则 0 分",
"explanation_ref": "K-TCM-174",
"difficulty": "basic"
},
{
"question_id": "Q-TCM-208",
"node_id": "tcm_extra_175",
"major_focus": [
"traditional_chinese_medicine"
],
"type": "single_choice",
"stem": "下列何种为从治法",
"options": {
"A": "用热远热",
"B": "通因通用",
"C": "寒者热之",
"D": "补泻兼用"
},
"answer": "B",
"score": 1,
"score_rule": "完全匹配标准答案得 1 分，否则 0 分",
"explanation_ref": "K-TCM-175",
"difficulty": "basic"
},
{
"question_id": "Q-TCM-209",
"node_id": "tcm_extra_176",
"major_focus": [
"traditional_chinese_medicine"
],
"type": "single_choice",
"stem": "下列关于病、证、症的说法，不正确的是",
"options": {
"A": "疾病反映的是一种疾病全过程的总体属性、特征和规律",
"B": "证反映的是疾病某一阶段或某一类型的病理性质",
"C": "证具有时相性特征，也具有空间特征",
"D": "症状和体征是构成病和证的基本要素",
"E": "症可以反应疾病或症候的本质特征"
},
"answer": "E",
"score": 1,
"score_rule": "完全匹配标准答案得 1 分，否则 0 分",
"explanation_ref": "K-TCM-176",
"difficulty": "basic"
},
{
"question_id": "Q-TCM-210",
"node_id": "tcm_extra_177",
"major_focus": [
"traditional_chinese_medicine"
],
"type": "single_choice",
"stem": "起居有常属于哪一种养生原则",
"options": {
"A": "顺应自然",
"B": "养性调神",
"C": "护肾保精",
"D": "调摄饮食",
"E": "体魄锻炼"
},
"answer": "A",
"score": 1,
"score_rule": "完全匹配标准答案得 1 分，否则 0 分",
"explanation_ref": "K-TCM-177",
"difficulty": "basic"
},
{
"question_id": "Q-TCM-211",
"node_id": "tcm_extra_178",
"major_focus": [
"traditional_chinese_medicine"
],
"type": "single_choice",
"stem": "下列经脉中，不与脏腑连属的是",
"options": {
"A": "太阳经",
"B": "厥阴经",
"C": "冲脉",
"D": "任脉",
"E": "带脉"
},
"answer": "E",
"score": 1,
"score_rule": "完全匹配标准答案得 1 分，否则 0 分",
"explanation_ref": "K-TCM-178",
"difficulty": "basic"
},
{
"question_id": "Q-TCM-212",
"node_id": "tcm_extra_179",
"major_focus": [
"traditional_chinese_medicine"
],
"type": "single_choice",
"stem": "“中焦如沤”是描绘",
"options": {
"A": "胃的受纳功能",
"B": "脾的散精功能",
"C": "小肠的泌别清浊功能",
"D": "脾胃等脏腑消化水饮食物的生理过程",
"E": "心肺输布气血的作用"
},
"answer": "D",
"score": 1,
"score_rule": "完全匹配标准答案得 1 分，否则 0 分",
"explanation_ref": "K-TCM-179",
"difficulty": "basic"
},
{
"question_id": "Q-NU-206",
"node_id": "nur_extra_173",
"major_focus": [
"nursing"
],
"type": "single_choice",
"stem": "下列胰岛D细胞的特点，错误的是",
"options": {
"A": "数量少，占胰岛细胞总数5%",
"B": "分泌生长抑素",
"C": "细胞间有缝隙连接",
"D": "可抑制A、B、PP细胞的分泌",
"E": "分泌胰岛素"
},
"answer": "E",
"score": 1,
"score_rule": "完全匹配标准答案得 1 分，否则 0 分",
"explanation_ref": "K-NUR-173",
"difficulty": "basic"
},
{
"question_id": "Q-NU-207",
"node_id": "nur_extra_174",
"major_focus": [
"nursing"
],
"type": "single_choice",
"stem": "心脏收缩力增强时，静脉回心血量增加，这主要是因为",
"options": {
"A": "动脉血压升高",
"B": "血流速度加快",
"C": "心输出量增加",
"D": "舒张期室内压低",
"E": "静脉压增高"
},
"answer": "D",
"score": 1,
"score_rule": "完全匹配标准答案得 1 分，否则 0 分",
"explanation_ref": "K-NUR-174",
"difficulty": "basic"
},
{
"question_id": "Q-NU-208",
"node_id": "nur_extra_175",
"major_focus": [
"nursing"
],
"type": "single_choice",
"stem": "发生右心衰时，引起组织水肿的主要原因",
"options": {
"A": "毛细血管压力升高",
"B": "血浆胶体渗透压降低",
"C": "组织液静水压降低",
"D": "淋巴回流受阻",
"E": "毛细血管通透性增高"
},
"answer": "A",
"score": 1,
"score_rule": "完全匹配标准答案得 1 分，否则 0 分",
"explanation_ref": "K-NUR-175",
"difficulty": "basic"
},
{
"question_id": "Q-NU-209",
"node_id": "nur_extra_176",
"major_focus": [
"nursing"
],
"type": "single_choice",
"stem": "本体感受器，不存在于",
"options": {
"A": "骨骼肌",
"B": "肌腱",
"C": "眼",
"D": "内耳",
"E": "关节"
},
"answer": "C",
"score": 1,
"score_rule": "完全匹配标准答案得 1 分，否则 0 分",
"explanation_ref": "K-NUR-176",
"difficulty": "basic"
},
{
"question_id": "Q-NU-210",
"node_id": "nur_extra_177",
"major_focus": [
"nursing"
],
"type": "single_choice",
"stem": "对于愤怒的病人，护士正确的做法是",
"options": {
"A": "回避",
"B": "指责",
"C": "漠视",
"D": "允许病人发泄并作出正面反应"
},
"answer": "D",
"score": 1,
"score_rule": "完全匹配标准答案得 1 分，否则 0 分",
"explanation_ref": "K-NUR-177",
"difficulty": "basic"
},
{
"question_id": "Q-NU-211",
"node_id": "nur_extra_178",
"major_focus": [
"nursing"
],
"type": "single_choice",
"stem": "点突变（碱基错配）可导致",
"options": {
"A": "氨基酸置换",
"B": "读码框移",
"C": "二者均有",
"D": "二者均无"
},
"answer": "A",
"score": 1,
"score_rule": "完全匹配标准答案得 1 分，否则 0 分",
"explanation_ref": "K-NUR-178",
"difficulty": "basic"
},
{
"question_id": "Q-NU-212",
"node_id": "nur_extra_179",
"major_focus": [
"nursing"
],
"type": "single_choice",
"stem": "下列属于护理计划阶段工作内容的是",
"options": {
"A": "收集资料",
"B": "实施护理措施",
"C": "确定预期的护理目标",
"D": "提出护理诊断",
"E": "评价预期目标"
},
"answer": "C",
"score": 1,
"score_rule": "完全匹配标准答案得 1 分，否则 0 分",
"explanation_ref": "K-NUR-179",
"difficulty": "basic"
},
{
"question_id": "Q-NU-213",
"node_id": "nur_extra_180",
"major_focus": [
"nursing"
],
"type": "single_choice",
"stem": "可被银盐染色的纤维是",
"options": {
"A": "网状纤维",
"B": "胶原纤维",
"C": "胶原原纤维",
"D": "弹性纤维"
},
"answer": "A",
"score": 1,
"score_rule": "完全匹配标准答案得 1 分，否则 0 分",
"explanation_ref": "K-NUR-180",
"difficulty": "basic"
},
{
"question_id": "Q-NU-214",
"node_id": "nur_extra_181",
"major_focus": [
"nursing"
],
"type": "single_choice",
"stem": "RNA 主要存在于",
"options": {
"A": "细胞质内",
"B": "细胞核内",
"C": "线粒体内",
"D": "叶绿体内",
"E": "溶酶体中"
},
"answer": "A",
"score": 1,
"score_rule": "完全匹配标准答案得 1 分，否则 0 分",
"explanation_ref": "K-NUR-181",
"difficulty": "basic"
},
{
"question_id": "Q-NU-215",
"node_id": "nur_extra_182",
"major_focus": [
"nursing"
],
"type": "single_choice",
"stem": "肾蒂内主要结构由上向下依次为",
"options": {
"A": "肾动脉、肾静脉、肾盂",
"B": "肾盂、肾动脉、肾静脉",
"C": "肾静脉、肾盂、肾动脉",
"D": "肾静脉、肾动脉、肾盂",
"E": "肾盂、肾静脉、肾动脉"
},
"answer": "A",
"score": 1,
"score_rule": "完全匹配标准答案得 1 分，否则 0 分",
"explanation_ref": "K-NUR-182",
"difficulty": "basic"
},
{
"question_id": "Q-NU-216",
"node_id": "nur_extra_183",
"major_focus": [
"nursing"
],
"type": "single_choice",
"stem": "战争带来的伤残与死亡，属于健康影响因素中的",
"options": {
"A": "生物因素",
"B": "心理因素",
"C": "社会环境因素",
"D": "文化因素"
},
"answer": "C",
"score": 1,
"score_rule": "完全匹配标准答案得 1 分，否则 0 分",
"explanation_ref": "K-NUR-183",
"difficulty": "basic"
},
{
"question_id": "Q-NU-217",
"node_id": "nur_extra_184",
"major_focus": [
"nursing"
],
"type": "single_choice",
"stem": "不具有交感和副交感双重分布的器官有",
"options": {
"A": "肾",
"B": "肾上腺髓质",
"C": "膀胱",
"D": "支气管",
"E": "心"
},
"answer": "B",
"score": 1,
"score_rule": "完全匹配标准答案得 1 分，否则 0 分",
"explanation_ref": "K-NUR-184",
"difficulty": "basic"
},
{
"question_id": "Q-CM-301",
"node_id": "emergency_abcde_sequence",
"major_focus": [
"clinical_medicine"
],
"type": "single_choice",
"difficulty": "advanced",
"stem": "患者发热、意识改变，呼吸28次/分，血压86/54 mmHg，乳酸升高。尚未获得病原学结果时，最符合优先级原则的处理思路是？",
"options": {
"A": "等待培养结果后再判断是否需要升级处置",
"B": "立即按危重流程评估并支持气道、呼吸和循环，同时快速寻找感染灶并启动紧急处置链",
"C": "先完成全套影像检查，再处理循环不稳定",
"D": "先口服退热药，体温下降后重新评估"
},
"answer": "B",
"score": 1,
"score_rule": "完全匹配标准答案得1分，否则0分",
"explanation_ref": "K-CLIN-128"
},
{
"question_id": "Q-CM-302",
"node_id": "differential_reasoning",
"major_focus": [
"clinical_medicine"
],
"type": "single_choice",
"difficulty": "advanced",
"stem": "育龄女性突发下腹痛、停经6周、少量阴道流血，血压尚稳定。下列哪一项最能体现不能被单一诊断锚定的鉴别思路？",
"options": {
"A": "疼痛在右侧，因此直接按阑尾炎处理",
"B": "同时核实妊娠可能、循环状态和腹膜刺激征，并优先排除可能迅速恶化的原因",
"C": "出血量少，可排除需要紧急处理的情况",
"D": "先观察一周，疼痛持续再做检查"
},
"answer": "B",
"score": 1,
"score_rule": "完全匹配标准答案得1分，否则0分",
"explanation_ref": "K-CLIN-113"
},
{
"question_id": "Q-CM-303",
"node_id": "uncertainty_expression",
"major_focus": [
"clinical_medicine"
],
"type": "single_choice",
"difficulty": "advanced",
"stem": "胸痛患者首次心电图和首次心肌损伤标志物未见明确异常，但症状发生仅1小时且仍持续。最严谨的解释是？",
"options": {
"A": "两项结果正常，已经排除急性冠脉事件",
"B": "当前结果降低了部分风险，但受检测时点和疾病演变影响，仍需结合动态变化继续评估",
"C": "只要年龄小于60岁即可停止观察",
"D": "首次结果阴性说明胸痛必然来自焦虑"
},
"answer": "B",
"score": 1,
"score_rule": "完全匹配标准答案得1分，否则0分",
"explanation_ref": "K-CLIN-159"
},
{
"question_id": "Q-CM-304",
"node_id": "referral_trigger",
"major_focus": [
"clinical_medicine"
],
"type": "single_choice",
"difficulty": "advanced",
"stem": "患者突发剧烈头痛，自述“从未这么痛过”，随后出现呕吐和颈项不适。下列做法中优先级最高的是？",
"options": {
"A": "先按普通偏头痛观察止痛效果",
"B": "尽快启动急症评估与转运流程，同时监测意识和生命体征",
"C": "建议回家避光休息，次日复诊",
"D": "先完成详细生活方式问卷"
},
"answer": "B",
"score": 1,
"score_rule": "完全匹配标准答案得1分，否则0分",
"explanation_ref": "K-CLIN-123"
},
{
"question_id": "Q-CM-305",
"node_id": "shared_decision",
"major_focus": [
"clinical_medicine"
],
"type": "single_choice",
"difficulty": "advanced",
"stem": "患者因担忧造影风险拒绝进一步检查，但当前存在不能忽略的高危线索。最符合共同决策的是？",
"options": {
"A": "只强调拒绝检查的后果，要求患者签字",
"B": "隐去风险以提高检查接受率",
"C": "说明当前不确定性、检查目的、可能获益与风险，核实患者价值取向并讨论可接受替代方案和安全网",
"D": "完全顺从拒绝，不再解释任何后续警示信号"
},
"answer": "C",
"score": 1,
"score_rule": "完全匹配标准答案得1分，否则0分",
"explanation_ref": "K-CLIN-160"
},
{
"question_id": "Q-CM-401",
"node_id": "emergency_abcde_sequence",
"major_focus": [
"clinical_medicine"
],
"type": "single_choice",
"difficulty": "expert",
"stem": "动脉血气：pH 7.28、PaCO₂ 26 mmHg、HCO₃⁻ 12 mmol/L。按Winter公式，预计PaCO₂约为1.5×12+8±2。最合理的酸碱判断是？",
"options": {
"A": "单纯呼吸性碱中毒",
"B": "代谢性酸中毒合并呼吸性酸中毒",
"C": "代谢性酸中毒伴适当呼吸代偿",
"D": "代谢性碱中毒合并呼吸性碱中毒"
},
"answer": "C",
"score": 1,
"score_rule": "完全匹配标准答案得1分，否则0分",
"explanation_ref": "K-CLIN-128"
},
{
"question_id": "Q-CM-402",
"node_id": "differential_reasoning",
"major_focus": [
"clinical_medicine"
],
"type": "single_choice",
"difficulty": "expert",
"stem": "患者Na⁺ 140、Cl⁻ 100、HCO₃⁻ 12 mmol/L（不计K⁺）。阴离子间隙及首要解释最接近哪项？",
"options": {
"A": "AG=12，正常间隙代谢性酸中毒",
"B": "AG=28，高阴离子间隙代谢性酸中毒",
"C": "AG=40，代谢性碱中毒",
"D": "AG=52，单纯呼吸性酸中毒"
},
"answer": "B",
"score": 1,
"score_rule": "完全匹配标准答案得1分，否则0分",
"explanation_ref": "K-CLIN-113"
},
{
"question_id": "Q-CM-403",
"node_id": "uncertainty_expression",
"major_focus": [
"clinical_medicine"
],
"type": "single_choice",
"difficulty": "expert",
"stem": "某检查诊断严重疾病的敏感度很高但特异度一般。面对低验前概率人群的单次阳性结果，最准确的表述是？",
"options": {
"A": "高敏感度意味着阳性结果一定确诊",
"B": "阳性结果的意义仍受验前概率和特异度影响，需要进一步确认",
"C": "低验前概率会使阳性预测值必然达到100%",
"D": "只要敏感度高，就无需考虑假阳性"
},
"answer": "B",
"score": 1,
"score_rule": "完全匹配标准答案得1分，否则0分",
"explanation_ref": "K-CLIN-159"
},
{
"question_id": "Q-CM-404",
"node_id": "referral_trigger",
"major_focus": [
"clinical_medicine"
],
"type": "single_choice",
"difficulty": "expert",
"stem": "某病验前概率20%，阴性似然比0.10。检测阴性后，后验概率最接近哪项？（先把概率转为优势）",
"options": {
"A": "约0.2%",
"B": "约2.4%",
"C": "约10%",
"D": "约18%"
},
"answer": "B",
"score": 1,
"score_rule": "完全匹配标准答案得1分，否则0分",
"explanation_ref": "K-CLIN-123"
},
{
"question_id": "Q-CM-405",
"node_id": "shared_decision",
"major_focus": [
"clinical_medicine"
],
"type": "single_choice",
"difficulty": "expert",
"stem": "一项治疗将不良结局风险从10%降至6%，同时带来2%的严重不良反应风险。用于共同决策时，下列计算和表达正确的是？",
"options": {
"A": "绝对风险降低4%，NNT约25，还需同时讨论伤害风险与患者偏好",
"B": "相对风险降低4%，NNT为4",
"C": "绝对风险降低40%，NNT约2.5",
"D": "只说明相对风险降低40%，无需提供绝对风险"
},
"answer": "A",
"score": 1,
"score_rule": "完全匹配标准答案得1分，否则0分",
"explanation_ref": "K-CLIN-160"
},
{
"question_id": "Q-MT-301",
"node_id": "clinical_mismatch_review_sequence",
"major_focus": [
"medical_technology"
],
"type": "single_choice",
"difficulty": "advanced",
"stem": "无症状患者血钾结果显著升高，标本溶血指数明显异常，前次结果正常。最合适的实验室处置顺序是？",
"options": {
"A": "直接按危急值报告，不注明标本问题",
"B": "核对身份与标本状态，按程序复核并评估溶血影响，及时联系临床说明限制及是否需重采",
"C": "删除结果，等待临床自行发现",
"D": "把结果改为参考区间上限后发布"
},
"answer": "B",
"score": 1,
"score_rule": "完全匹配标准答案得1分，否则0分",
"explanation_ref": "K-MT-165"
},
{
"question_id": "Q-MT-302",
"node_id": "specimen_rejection_disposition",
"major_focus": [
"medical_technology"
],
"type": "single_choice",
"difficulty": "advanced",
"stem": "凝血检测标本的抗凝管仅采至标示体积的一半。最合理的处理是？",
"options": {
"A": "直接检测并把结果乘以2",
"B": "因血液与抗凝剂比例失衡，按拒收程序记录原因并联系重采",
"C": "离心时间加倍即可纠正",
"D": "补加另一患者的血液至刻度"
},
"answer": "B",
"score": 1,
"score_rule": "完全匹配标准答案得1分，否则0分",
"explanation_ref": "K-MT-111"
},
{
"question_id": "Q-MT-303",
"node_id": "qc_out_of_control_hold",
"major_focus": [
"medical_technology"
],
"type": "single_choice",
"difficulty": "advanced",
"stem": "同一质控水平连续两次超过同一侧均值+2SD，患者样本尚未发布。最合理的判断是？",
"options": {
"A": "属于提示系统误差的失控信号，应暂停发布并查找原因",
"B": "只要未超过3SD即可全部发布",
"C": "随机删除其中一次质控结果即可",
"D": "用患者结果均值替代质控判断"
},
"answer": "A",
"score": 1,
"score_rule": "完全匹配标准答案得1分，否则0分",
"explanation_ref": "K-MT-119"
},
{
"question_id": "Q-MT-304",
"node_id": "imaging_critical_escalation",
"major_focus": [
"medical_technology"
],
"type": "single_choice",
"difficulty": "advanced",
"stem": "影像检查发现可能危及生命的意外征象，但报告医师暂时无法接通。最符合闭环管理的是？",
"options": {
"A": "只在报告中加粗，等待临床查看",
"B": "按机构升级路径联系替代责任人员，记录通知对象、时间、内容与回读结果",
"C": "直接让患者自行搜索结果含义",
"D": "第二天再通知，以免误报"
},
"answer": "B",
"score": 1,
"score_rule": "完全匹配标准答案得1分，否则0分",
"explanation_ref": "K-MT-168"
},
{
"question_id": "Q-MT-305",
"node_id": "report_correction_flow",
"major_focus": [
"medical_technology"
],
"type": "single_choice",
"difficulty": "advanced",
"stem": "已发布报告发现单位错误，但数值本身无误。正确处置是？",
"options": {
"A": "静默覆盖原报告，不留记录",
"B": "按更正流程保留审计轨迹，通知相关临床人员并确认其收到更正信息",
"C": "只修改本地纸质记录",
"D": "等临床提出疑问后再处理"
},
"answer": "B",
"score": 1,
"score_rule": "完全匹配标准答案得1分，否则0分",
"explanation_ref": "K-MT-170"
},
{
"question_id": "Q-MT-401",
"node_id": "clinical_mismatch_review_sequence",
"major_focus": [
"medical_technology"
],
"type": "single_choice",
"difficulty": "expert",
"stem": "患者前次血红蛋白126 g/L，本次45 g/L；本次同时出现钠、白蛋白和总蛋白同步显著降低，采血来自正在输液的同侧肢体。最可能首先排查的是？",
"options": {
"A": "多系统疾病在数分钟内同时恶化",
"B": "输液稀释造成的检验前污染，并核对采血位置后重采",
"C": "仪器所有项目校准同时永久失效",
"D": "参考区间设置过宽"
},
"answer": "B",
"score": 1,
"score_rule": "完全匹配标准答案得1分，否则0分",
"explanation_ref": "K-MT-165"
},
{
"question_id": "Q-MT-402",
"node_id": "specimen_rejection_disposition",
"major_focus": [
"medical_technology"
],
"type": "single_choice",
"difficulty": "expert",
"stem": "血气标本可见较大气泡且送检延迟。若不重采，最可能产生哪类难以可靠校正的误差？",
"options": {
"A": "气体与空气交换及持续细胞代谢共同改变结果",
"B": "只影响标本条码，不影响任何分析物",
"C": "只会使所有电解质按固定比例升高",
"D": "误差可通过把结果乘以送检分钟数完全校正"
},
"answer": "A",
"score": 1,
"score_rule": "完全匹配标准答案得1分，否则0分",
"explanation_ref": "K-MT-111"
},
{
"question_id": "Q-MT-403",
"node_id": "qc_out_of_control_hold",
"major_focus": [
"medical_technology"
],
"type": "single_choice",
"difficulty": "expert",
"stem": "两个质控水平在同一批次分别位于均值+2.4SD和+2.2SD。该模式最支持哪种判断？",
"options": {
"A": "两个结果方向一致，提示系统性偏移，应拒绝该批次并排查",
"B": "两者都未超过3SD，因此必然在控",
"C": "属于典型随机误差，可删除较高者后发布",
"D": "说明参考区间需要立即扩大"
},
"answer": "A",
"score": 1,
"score_rule": "完全匹配标准答案得1分，否则0分",
"explanation_ref": "K-MT-119"
},
{
"question_id": "Q-MT-404",
"node_id": "imaging_critical_escalation",
"major_focus": [
"medical_technology"
],
"type": "single_choice",
"difficulty": "expert",
"stem": "评价危急值通知质量时，仅统计“已拨出电话”的比例为什么不足？",
"options": {
"A": "电话次数越少越好，因此无需统计",
"B": "拨出电话不能证明信息被正确接收和采取行动，还应核查身份、回读、时限及闭环记录",
"C": "危急值只需留在信息系统中",
"D": "只有患者本人能确认闭环"
},
"answer": "B",
"score": 1,
"score_rule": "完全匹配标准答案得1分，否则0分",
"explanation_ref": "K-MT-168"
},
{
"question_id": "Q-MT-405",
"node_id": "report_correction_flow",
"major_focus": [
"medical_technology"
],
"type": "single_choice",
"difficulty": "expert",
"stem": "新方法与原方法回归结果近似 y=1.12x+0.1，相关系数很高。最严谨的结论是？",
"options": {
"A": "相关系数高即可证明两方法完全可互换",
"B": "存在约12%的比例偏倚，仍需结合允许误差和临床决策点判断可接受性",
"C": "截距接近0，因此不存在任何系统误差",
"D": "只需比较两方法平均值，不必看决策点"
},
"answer": "B",
"score": 1,
"score_rule": "完全匹配标准答案得1分，否则0分",
"explanation_ref": "K-MT-170"
},
{
"question_id": "Q-NU-301",
"node_id": "deterioration_priority_response",
"major_focus": [
"nursing"
],
"type": "single_choice",
"difficulty": "advanced",
"stem": "术后患者突然烦躁，呼吸32次/分，SpO₂由96%降至88%，血压下降。护士最优先的行动是？",
"options": {
"A": "先完成疼痛评分表",
"B": "立即进行气道与呼吸评估、给予紧急支持并呼叫快速反应团队",
"C": "先通知家属说明情况",
"D": "等待下一次常规生命体征测量"
},
"answer": "B",
"score": 1,
"score_rule": "完全匹配标准答案得1分，否则0分",
"explanation_ref": "K-NUR-131"
},
{
"question_id": "Q-NU-302",
"node_id": "critical_value_reporting",
"major_focus": [
"nursing"
],
"type": "single_choice",
"difficulty": "advanced",
"stem": "接到实验室危急值电话时，护士如何完成最可靠的信息闭环？",
"options": {
"A": "只回答“知道了”并挂断",
"B": "记录患者、项目、结果和时间，回读确认，立即按流程通知责任医师并记录后续处置",
"C": "等交班时统一汇报",
"D": "先自行解释病因再决定是否通知"
},
"answer": "B",
"score": 1,
"score_rule": "完全匹配标准答案得1分，否则0分",
"explanation_ref": "K-NUR-171"
},
{
"question_id": "Q-NU-303",
"node_id": "interprofessional_referral",
"major_focus": [
"nursing"
],
"type": "single_choice",
"difficulty": "advanced",
"stem": "吞咽障碍患者进食时反复湿性嗓音并咳嗽。护理计划中最合适的是？",
"options": {
"A": "鼓励快速喝水测试吞咽能力",
"B": "暂停经口进食，保持安全体位并及时启动吞咽评估和跨专业会诊",
"C": "把所有食物改为稀液体继续喂养",
"D": "只记录咳嗽，不调整计划"
},
"answer": "B",
"score": 1,
"score_rule": "完全匹配标准答案得1分，否则0分",
"explanation_ref": "K-NUR-143"
},
{
"question_id": "Q-NU-304",
"node_id": "diagnosis_disclosure_boundary",
"major_focus": [
"nursing"
],
"type": "single_choice",
"difficulty": "advanced",
"stem": "患者追问“影像报告写占位，是不是一定是癌症”。护士最合适的回应是？",
"options": {
"A": "直接确认恶性诊断",
"B": "说明单一报告不能替代综合诊断，评估患者担忧并协助联系有资质的医师解释",
"C": "保证一定是良性",
"D": "拒绝任何沟通并立即离开"
},
"answer": "B",
"score": 1,
"score_rule": "完全匹配标准答案得1分，否则0分",
"explanation_ref": "K-NUR-166"
},
{
"question_id": "Q-NU-305",
"node_id": "physical_restraint_decision",
"major_focus": [
"nursing"
],
"type": "single_choice",
"difficulty": "advanced",
"stem": "谵妄患者反复拔管。考虑身体约束前，最符合最小限制原则的是？",
"options": {
"A": "为方便管理立即长期约束",
"B": "先评估疼痛、缺氧、尿潴留等可逆因素，采用陪护与环境调整等替代措施，必要时按授权动态复评",
"C": "让家属自行捆绑患者",
"D": "只要拔管一次就永久约束"
},
"answer": "B",
"score": 1,
"score_rule": "完全匹配标准答案得1分，否则0分",
"explanation_ref": "K-NUR-126"
},
{
"question_id": "Q-NU-401",
"node_id": "deterioration_priority_response",
"major_focus": [
"nursing"
],
"type": "single_choice",
"difficulty": "expert",
"stem": "患者使用阿片镇痛泵后嗜睡，呼吸8次/分，SpO₂ 89%，对呼唤反应迟钝。下列优先顺序最合理的是？",
"options": {
"A": "先填写不良事件表，再观察30分钟",
"B": "立即停止继续给药并支持气道呼吸、呼叫紧急支援，同时持续监测并按医嘱准备逆转处理",
"C": "只把氧流量调高，镇痛泵保持不变",
"D": "唤醒患者后让其独自休息"
},
"answer": "B",
"score": 1,
"score_rule": "完全匹配标准答案得1分，否则0分",
"explanation_ref": "K-NUR-131"
},
{
"question_id": "Q-NU-402",
"node_id": "critical_value_reporting",
"major_focus": [
"nursing"
],
"type": "single_choice",
"difficulty": "expert",
"stem": "危急值已通知值班医师，但10分钟后患者临床状态恶化且未见处置。护士下一步最符合闭环原则的是？",
"options": {
"A": "既然已通知，护士责任已经结束",
"B": "立即重新评估患者并按升级链联系更高级责任人员或快速反应团队，完整记录时间线",
"C": "删除首次通知记录后重新开始",
"D": "等医师下一次查房"
},
"answer": "B",
"score": 1,
"score_rule": "完全匹配标准答案得1分，否则0分",
"explanation_ref": "K-NUR-171"
},
{
"question_id": "Q-NU-403",
"node_id": "interprofessional_referral",
"major_focus": [
"nursing"
],
"type": "single_choice",
"difficulty": "expert",
"stem": "营养液与某静脉药物存在配伍不确定性，但患者只有一条静脉通路。最安全的决策路径是？",
"options": {
"A": "凭颜色无变化判断可以混合",
"B": "查询经批准的配伍资料并联系药师，无法确认时避免同路同时输注并协调替代通路或时间",
"C": "把两者稀释后一定兼容",
"D": "由患者选择是否混合"
},
"answer": "B",
"score": 1,
"score_rule": "完全匹配标准答案得1分，否则0分",
"explanation_ref": "K-NUR-143"
},
{
"question_id": "Q-NU-404",
"node_id": "diagnosis_disclosure_boundary",
"major_focus": [
"nursing"
],
"type": "single_choice",
"difficulty": "expert",
"stem": "家属要求护士向意识清楚的患者隐瞒明确诊断，并要求所有沟通只对家属。护士首先应如何处理？",
"options": {
"A": "立即承诺永久隐瞒",
"B": "核实患者自身的信息偏好与决策能力，遵循知情与授权原则，并协调医疗团队沟通",
"C": "在走廊直接公开全部信息",
"D": "让家属代替患者签署所有文件"
},
"answer": "B",
"score": 1,
"score_rule": "完全匹配标准答案得1分，否则0分",
"explanation_ref": "K-NUR-166"
},
{
"question_id": "Q-NU-405",
"node_id": "physical_restraint_decision",
"major_focus": [
"nursing"
],
"type": "single_choice",
"difficulty": "expert",
"stem": "约束中的患者突然安静、皮肤苍白、末梢发凉。最不应被忽略的解释和行动是？",
"options": {
"A": "安静说明约束有效，可减少巡视",
"B": "可能是循环或意识恶化，应立即解除或调整危险约束、评估ABC及肢体灌注并呼叫支援",
"C": "只需把约束带再收紧",
"D": "等家属到场后再评估"
},
"answer": "B",
"score": 1,
"score_rule": "完全匹配标准答案得1分，否则0分",
"explanation_ref": "K-NUR-126"
},
{
"question_id": "Q-TCM-301",
"node_id": "emergency_stroke_referral",
"major_focus": [
"traditional_chinese_medicine"
],
"type": "single_choice",
"difficulty": "advanced",
"stem": "中医门诊患者突然口角歪斜、言语含糊、右上肢无力。此时最符合安全边界的是？",
"options": {
"A": "先完整辨证并观察针刺反应",
"B": "记录发病时间，立即启动卒中急救转运，不因等待辨证或治疗延误",
"C": "让患者回家休息后复诊",
"D": "先给予自行携带的中成药"
},
"answer": "B",
"score": 1,
"score_rule": "完全匹配标准答案得1分，否则0分",
"explanation_ref": "K-TCM-166"
},
{
"question_id": "Q-TCM-302",
"node_id": "herb_drug_interaction_check",
"major_focus": [
"traditional_chinese_medicine"
],
"type": "single_choice",
"difficulty": "advanced",
"stem": "患者长期服用抗凝药，拟使用成分复杂且标签不全的中药制剂。最合理的处理是？",
"options": {
"A": "天然制剂不会相互作用，可直接使用",
"B": "核对全部药物与制剂成分，在无法确认相互作用风险时暂不自行加用，并转由医师或药师评估",
"C": "把抗凝药减半后使用中药",
"D": "两种药错开1小时即可消除全部风险"
},
"answer": "B",
"score": 1,
"score_rule": "完全匹配标准答案得1分，否则0分",
"explanation_ref": "K-TCM-168"
},
{
"question_id": "Q-TCM-303",
"node_id": "insufficient_info_expression",
"major_focus": [
"traditional_chinese_medicine"
],
"type": "single_choice",
"difficulty": "advanced",
"stem": "舌象、脉象与主诉之间明显矛盾，且患者刚进食、剧烈运动后就诊。最严谨的辨证表达是？",
"options": {
"A": "选择最符合预期的一项信息直接定证",
"B": "说明当前信息受条件影响且证据不一致，补充四诊并在适当条件下复核后再判断",
"C": "舌象永远优先于所有其他信息",
"D": "脉象一次结果即可确定全部治疗"
},
"answer": "B",
"score": 1,
"score_rule": "完全匹配标准答案得1分，否则0分",
"explanation_ref": "K-TCM-126"
},
{
"question_id": "Q-TCM-304",
"node_id": "high_fever_emergency_referral",
"major_focus": [
"traditional_chinese_medicine"
],
"type": "single_choice",
"difficulty": "advanced",
"stem": "高热患者出现意识模糊、呼吸急促和皮肤花斑。此时最优先的是？",
"options": {
"A": "先辨清寒热虚实后再决定是否转诊",
"B": "立即按急危重症流程评估、呼叫支援并转诊，同时不以中医干预延误处置",
"C": "仅进行穴位按摩观察",
"D": "先完成体质问卷"
},
"answer": "B",
"score": 1,
"score_rule": "完全匹配标准答案得1分，否则0分",
"explanation_ref": "K-TCM-167"
},
{
"question_id": "Q-TCM-305",
"node_id": "prescription_scope_boundary",
"major_focus": [
"traditional_chinese_medicine"
],
"type": "single_choice",
"difficulty": "advanced",
"stem": "实习学生收到患者发来的旧方照片，要求“按原方加两味药”。最合适的回应是？",
"options": {
"A": "根据舌照直接加药",
"B": "说明自己无独立处方权限，不复制或修改旧方，协助其由有资质医师重新评估",
"C": "剂量减半即可安全开方",
"D": "只要患者签字就可代开"
},
"answer": "B",
"score": 1,
"score_rule": "完全匹配标准答案得1分，否则0分",
"explanation_ref": "K-TCM-108"
},
{
"question_id": "Q-TCM-401",
"node_id": "emergency_stroke_referral",
"major_focus": [
"traditional_chinese_medicine"
],
"type": "single_choice",
"difficulty": "expert",
"stem": "患者晨起眩晕、走路偏斜，同时出现复视和构音不清，但肢体肌力基本正常。最需要避免的认知错误是？",
"options": {
"A": "因无明显偏瘫而排除后循环急症，只按“眩晕证”处理",
"B": "记录症状发生时间并立即按神经系统急症转运评估",
"C": "快速检查意识、眼球运动和协调情况",
"D": "在不延误转运的前提下记录已有信息"
},
"answer": "A",
"score": 1,
"score_rule": "完全匹配标准答案得1分，否则0分",
"explanation_ref": "K-TCM-166"
},
{
"question_id": "Q-TCM-402",
"node_id": "herb_drug_interaction_check",
"major_focus": [
"traditional_chinese_medicine"
],
"type": "single_choice",
"difficulty": "expert",
"stem": "患者同时使用多种西药和来源不明的中药粉，近期出现异常出血。最完整的药物核对方式是？",
"options": {
"A": "只记录处方西药，保健品和中药不算药物",
"B": "逐项核对处方药、非处方药、中药、保健品的名称、剂量、频次、来源和开始时间，并立即升级评估出血风险",
"C": "让患者停掉所有西药后观察",
"D": "只询问中药方名，无需核对包装"
},
"answer": "B",
"score": 1,
"score_rule": "完全匹配标准答案得1分，否则0分",
"explanation_ref": "K-TCM-168"
},
{
"question_id": "Q-TCM-403",
"node_id": "insufficient_info_expression",
"major_focus": [
"traditional_chinese_medicine"
],
"type": "single_choice",
"difficulty": "expert",
"stem": "同一患者两次就诊的舌脉记录差异很大。下列哪项最能提高辨证信息的可比性？",
"options": {
"A": "删除与上次不一致的记录",
"B": "标准化采集时间、饮食运动等条件和记录方法，同时保留差异并结合症状演变解释",
"C": "只采用更符合既定诊断的一次",
"D": "由不同人员分别记录且不说明条件"
},
"answer": "B",
"score": 1,
"score_rule": "完全匹配标准答案得1分，否则0分",
"explanation_ref": "K-TCM-126"
},
{
"question_id": "Q-TCM-404",
"node_id": "high_fever_emergency_referral",
"major_focus": [
"traditional_chinese_medicine"
],
"type": "single_choice",
"difficulty": "expert",
"stem": "针刺过程中患者面色苍白、出冷汗、恶心，随后反应迟钝。最合理的处置顺序是？",
"options": {
"A": "继续留针以完成疗程",
"B": "立即停止操作并安全撤针，评估ABC和生命体征、采取防跌倒措施，未迅速恢复或存在异常时启动急救",
"C": "让患者独自步行到室外透气",
"D": "只记录为“体质虚弱”，无需复评"
},
"answer": "B",
"score": 1,
"score_rule": "完全匹配标准答案得1分，否则0分",
"explanation_ref": "K-TCM-167"
},
{
"question_id": "Q-TCM-405",
"node_id": "prescription_scope_boundary",
"major_focus": [
"traditional_chinese_medicine"
],
"type": "single_choice",
"difficulty": "expert",
"stem": "患者要求把网络流传方中的一味药替换成“功效相近”的另一味，并称两者药性相似。最严谨的边界判断是？",
"options": {
"A": "功效名称相近即可等量替换",
"B": "替换可能改变配伍、剂量和风险，应由有资质医师在完整评估后决定，不能按网络信息自行改方",
"C": "只要是常见药材就不存在风险",
"D": "先试用三天，无不适即可长期使用"
},
"answer": "B",
"score": 1,
"score_rule": "完全匹配标准答案得1分，否则0分",
"explanation_ref": "K-TCM-108"
},
{
"question_id": "Q-RH-301",
"node_id": "acute_change_first_response",
"major_focus": [
"rehabilitation"
],
"type": "single_choice",
"difficulty": "advanced",
"stem": "偏瘫患者步态训练中突发新出现的言语含糊和患侧无力加重。治疗师首先应？",
"options": {
"A": "认为是疲劳并降低训练强度",
"B": "立即停止训练、记录发作时间、保证安全并启动神经系统急症转运",
"C": "完成本组训练后再报告",
"D": "按摩患肢观察是否恢复"
},
"answer": "B",
"score": 1,
"score_rule": "完全匹配标准答案得1分，否则0分",
"explanation_ref": "K-RH-COURSE-006"
},
{
"question_id": "Q-RH-302",
"node_id": "referral_threshold_decision",
"major_focus": [
"rehabilitation"
],
"type": "single_choice",
"difficulty": "advanced",
"stem": "心肺康复中患者出现胸部压迫感、冷汗，休息后仍未缓解。最合适的处置是？",
"options": {
"A": "改做上肢训练",
"B": "停止训练、评估生命体征并立即启动医疗急症评估",
"C": "让患者自行驾车回家",
"D": "继续低强度训练以判断耐量"
},
"answer": "B",
"score": 1,
"score_rule": "完全匹配标准答案得1分，否则0分",
"explanation_ref": "K-RH-COURSE-006"
},
{
"question_id": "Q-RH-303",
"node_id": "shared_goal_setting",
"major_focus": [
"rehabilitation"
],
"type": "single_choice",
"difficulty": "advanced",
"stem": "患者目标是“一个月内独立上下三层楼”，但当前仅能在监护下站立30秒。最合理的目标制定方式是？",
"options": {
"A": "直接承诺一个月实现最终目标",
"B": "将目标分解为可测量的近期功能指标，与患者共同确定进阶条件并定期复评",
"C": "只采用治疗师目标，不考虑患者需求",
"D": "因目标困难而取消所有步行训练"
},
"answer": "B",
"score": 1,
"score_rule": "完全匹配标准答案得1分，否则0分",
"explanation_ref": "K-RH-COURSE-002"
},
{
"question_id": "Q-RH-304",
"node_id": "discharge_transition_planning",
"major_focus": [
"rehabilitation"
],
"type": "single_choice",
"difficulty": "advanced",
"stem": "患者出院后需使用助行器，但家中走廊狭窄且卫生间有高门槛。出院计划最应补充什么？",
"options": {
"A": "只发放通用训练单",
"B": "结合真实家庭环境评估设备可通过性，训练患者和照护者并制定替代方案及求助路径",
"C": "要求患者回家后自行尝试",
"D": "把所有活动永久改为卧床"
},
"answer": "B",
"score": 1,
"score_rule": "完全匹配标准答案得1分，否则0分",
"explanation_ref": "K-RH-COURSE-003"
},
{
"question_id": "Q-RH-305",
"node_id": "assessment_result_communication",
"major_focus": [
"rehabilitation"
],
"type": "single_choice",
"difficulty": "advanced",
"stem": "患者功能量表提高5分，但测试条件与上次不同且当天使用了不同辅助具。最严谨的解释是？",
"options": {
"A": "分数提高必然代表真实功能改善",
"B": "先说明测试条件差异限制可比性，必要时在标准化条件下复测并结合实际活动表现",
"C": "只报告更高分数，不记录辅助具",
"D": "量表结果无需结合临床观察"
},
"answer": "B",
"score": 1,
"score_rule": "完全匹配标准答案得1分，否则0分",
"explanation_ref": "K-RH-COURSE-001"
},
{
"question_id": "Q-RH-401",
"node_id": "acute_change_first_response",
"major_focus": [
"rehabilitation"
],
"type": "single_choice",
"difficulty": "expert",
"stem": "站立训练后患者血压由卧位128/76降至站立3分钟104/64 mmHg，并伴明显头晕。最合理的判断与行动是？",
"options": {
"A": "收缩压下降24 mmHg伴症状，停止训练并安全复位，进一步评估和报告",
"B": "舒张压仍高于60，因此可继续训练",
"C": "只要没有跌倒就不算异常",
"D": "立即进行更高强度步行以改善循环"
},
"answer": "A",
"score": 1,
"score_rule": "完全匹配标准答案得1分，否则0分",
"explanation_ref": "K-RH-COURSE-006"
},
{
"question_id": "Q-RH-402",
"node_id": "referral_threshold_decision",
"major_focus": [
"rehabilitation"
],
"type": "single_choice",
"difficulty": "expert",
"stem": "脑卒中后患者进食试验中无明显咳嗽，但声音变湿、呼吸频率增加且血氧下降。最恰当的解释是？",
"options": {
"A": "没有咳嗽即可排除误吸",
"B": "可能存在隐匿性误吸，应停止经口试验并启动专业吞咽评估",
"C": "只是食物口味不合，应继续增加容量",
"D": "让患者仰头喝水可改善吞咽"
},
"answer": "B",
"score": 1,
"score_rule": "完全匹配标准答案得1分，否则0分",
"explanation_ref": "K-RH-COURSE-004"
},
{
"question_id": "Q-RH-403",
"node_id": "shared_goal_setting",
"major_focus": [
"rehabilitation"
],
"type": "single_choice",
"difficulty": "expert",
"stem": "患者6分钟步行距离增加，但完成后症状明显加重并需更长恢复时间。评价训练获益时应如何解释？",
"options": {
"A": "距离增加即可证明方案完全有效",
"B": "同时考虑距离、症状、恢复时间和安全阈值，不能用单一性能指标掩盖代价",
"C": "只记录最远距离",
"D": "症状属于意志问题，不纳入评估"
},
"answer": "B",
"score": 1,
"score_rule": "完全匹配标准答案得1分，否则0分",
"explanation_ref": "K-RH-COURSE-002"
},
{
"question_id": "Q-RH-404",
"node_id": "discharge_transition_planning",
"major_focus": [
"rehabilitation"
],
"type": "single_choice",
"difficulty": "expert",
"stem": "照护者能口述转移步骤，但实操时反复拉拽患者患侧上肢。出院前最合适的判断是？",
"options": {
"A": "口述正确即可视为掌握",
"B": "尚未达到安全胜任，应纠正风险动作、再次示范并通过回示确认，必要时调整设备与照护计划",
"C": "让患者自己承担风险",
"D": "只在出院记录中写“已宣教”"
},
"answer": "B",
"score": 1,
"score_rule": "完全匹配标准答案得1分，否则0分",
"explanation_ref": "K-RH-COURSE-003"
},
{
"question_id": "Q-RH-405",
"node_id": "assessment_result_communication",
"major_focus": [
"rehabilitation"
],
"type": "single_choice",
"difficulty": "expert",
"stem": "某量表变化2分，而该工具在类似人群中的最小可检测变化为5分。最准确的解释是？",
"options": {
"A": "2分变化必然代表临床改善",
"B": "该变化可能处于测量误差范围，需结合其他指标和后续复测",
"C": "只要方向变好就可宣布康复完成",
"D": "最小可检测变化与个体解释无关"
},
"answer": "B",
"score": 1,
"score_rule": "完全匹配标准答案得1分，否则0分",
"explanation_ref": "K-RH-COURSE-001"
},
{
"question_id": "Q-HM-301",
"node_id": "referral_red_flag",
"major_focus": [
"health_management"
],
"type": "single_choice",
"difficulty": "advanced",
"stem": "远程随访对象报告突发胸痛伴冷汗和呼吸困难，但称“不想麻烦家人”。健康管理人员最合适的处理是？",
"options": {
"A": "预约一周后门诊",
"B": "明确说明紧急风险，立即启动急救转介并确认其获得现实帮助，不以继续问卷延误",
"C": "发送饮食教育材料",
"D": "建议独自步行去附近药店"
},
"answer": "B",
"score": 1,
"score_rule": "完全匹配标准答案得1分，否则0分",
"explanation_ref": "K-BP-005"
},
{
"question_id": "Q-HM-302",
"node_id": "trend_communication",
"major_focus": [
"health_management"
],
"type": "single_choice",
"difficulty": "advanced",
"stem": "干预前后平均指标下降，但随访人群中高风险者大量失访。最严谨的项目结论是？",
"options": {
"A": "平均值下降即可证明项目有效",
"B": "失访可能造成选择偏倚，需要分析失访特征并进行敏感性分析",
"C": "删除所有失访者后结果更准确",
"D": "只报告变化最大的参与者"
},
"answer": "B",
"score": 1,
"score_rule": "完全匹配标准答案得1分，否则0分",
"explanation_ref": "K-BP-003"
},
{
"question_id": "Q-HM-303",
"node_id": "shared_decision_plan",
"major_focus": [
"health_management"
],
"type": "single_choice",
"difficulty": "advanced",
"stem": "居民无法完成每日记录，原因是夜班和照护压力。最可能提高依从性的策略是？",
"options": {
"A": "重复强调必须每天同一时间，不讨论障碍",
"B": "共同识别可行时段，缩减到关键指标并设置可持续提醒与复盘节点",
"C": "代填缺失数据以提高完成率",
"D": "将其标记为不配合并终止服务"
},
"answer": "B",
"score": 1,
"score_rule": "完全匹配标准答案得1分，否则0分",
"explanation_ref": "K-BP-002"
},
{
"question_id": "Q-HM-304",
"node_id": "home_clinic_discordance",
"major_focus": [
"health_management"
],
"type": "single_choice",
"difficulty": "advanced",
"stem": "家庭记录与机构测量长期不一致。最合理的质量改进步骤是？",
"options": {
"A": "默认家庭设备错误并丢弃全部数据",
"B": "核对设备验证状态、袖带规格、测量条件和记录方法，再在标准条件下进行对照",
"C": "只保留数值较低的一组",
"D": "把两组数值直接相加取平均"
},
"answer": "B",
"score": 1,
"score_rule": "完全匹配标准答案得1分，否则0分",
"explanation_ref": "K-BP-006"
},
{
"question_id": "Q-HM-305",
"node_id": "urgent_symptom_triage",
"major_focus": [
"health_management"
],
"type": "single_choice",
"difficulty": "advanced",
"stem": "筛查项目发现阳性结果后，哪一项最能体现完整服务闭环？",
"options": {
"A": "只统计完成筛查的人数",
"B": "建立复核、转诊、结果回收和未就诊追踪机制，并明确责任人和时限",
"C": "把阳性名单交给居民自行处理",
"D": "仅在年终汇总阳性率"
},
"answer": "B",
"score": 1,
"score_rule": "完全匹配标准答案得1分，否则0分",
"explanation_ref": "K-BP-005"
},
{
"question_id": "Q-HM-401",
"node_id": "referral_red_flag",
"major_focus": [
"health_management"
],
"type": "single_choice",
"difficulty": "expert",
"stem": "某筛查在人群中的患病率为1%，敏感度90%，特异度90%。对10,000人筛查，阳性预测值最接近哪项？",
"options": {
"A": "约1%",
"B": "约8%",
"C": "约50%",
"D": "约90%"
},
"answer": "B",
"score": 1,
"score_rule": "完全匹配标准答案得1分，否则0分",
"explanation_ref": "K-BP-005"
},
{
"question_id": "Q-HM-402",
"node_id": "trend_communication",
"major_focus": [
"health_management"
],
"type": "single_choice",
"difficulty": "expert",
"stem": "某队列暴露组1000人中发生80例，未暴露组1000人中发生40例。相对危险度和风险差分别为？",
"options": {
"A": "RR=0.5，风险差=-4%",
"B": "RR=2.0，风险差=4个百分点",
"C": "RR=4.0，风险差=2个百分点",
"D": "RR=2.0，风险差=40个百分点"
},
"answer": "B",
"score": 1,
"score_rule": "完全匹配标准答案得1分，否则0分",
"explanation_ref": "K-BP-003"
},
{
"question_id": "Q-HM-403",
"node_id": "shared_decision_plan",
"major_focus": [
"health_management"
],
"type": "single_choice",
"difficulty": "expert",
"stem": "一项干预使事件率从12%降至8%。其绝对风险降低和NNT最接近哪项？",
"options": {
"A": "4个百分点，NNT=25",
"B": "33个百分点，NNT=3",
"C": "4个百分点，NNT=4",
"D": "50个百分点，NNT=2"
},
"answer": "A",
"score": 1,
"score_rule": "完全匹配标准答案得1分，否则0分",
"explanation_ref": "K-BP-002"
},
{
"question_id": "Q-HM-404",
"node_id": "home_clinic_discordance",
"major_focus": [
"health_management"
],
"type": "single_choice",
"difficulty": "expert",
"stem": "观察到喝咖啡者心血管事件更多，但喝咖啡者同时吸烟比例显著更高。吸烟在该分析中最可能是什么？",
"options": {
"A": "结局变量",
"B": "混杂因素，需要在设计或分析中控制",
"C": "随机误差的同义词",
"D": "必然是中介变量"
},
"answer": "B",
"score": 1,
"score_rule": "完全匹配标准答案得1分，否则0分",
"explanation_ref": "K-BP-006"
},
{
"question_id": "Q-HM-405",
"node_id": "urgent_symptom_triage",
"major_focus": [
"health_management"
],
"type": "single_choice",
"difficulty": "expert",
"stem": "某项目干预组改善明显，但分组由参与者自行选择，且干预组基线健康意识更强。最主要的因果推断威胁是？",
"options": {
"A": "选择偏倚与基线混杂",
"B": "只有测量单位错误",
"C": "样本量越大该问题必然消失",
"D": "改善越明显越能排除偏倚"
},
"answer": "A",
"score": 1,
"score_rule": "完全匹配标准答案得1分，否则0分",
"explanation_ref": "K-BP-005"
}
]
},
"rubric": {
"rubric_version": "1.1.0",
"status": "active",
"effective_date": "2026-10-31",
"note": "知护评分规则 v1.1.0：评分项按病例族（CL/NU/MT/TCM/R/HM/D/P/S）生效，不再绑定单一病例编号；区分合成岗位模拟与真实医疗。",
"scoring_order": [
"item_scores",
"caps",
"red_lines",
"normalize_to_100"
],
"levels": {
"full": 1.0,
"partial": 0.5,
"zero": 0.0
},
"dimensions": [
{
"dimension_id": "information",
"name": "信息询问"
},
{
"dimension_id": "measurement",
"name": "测量与记录"
},
{
"dimension_id": "application",
"name": "解释与应用"
},
{
"dimension_id": "safety",
"name": "风险与边界"
},
{
"dimension_id": "communication",
"name": "沟通与行动"
}
],
"items": [
{
"item_id": "INQ-01",
"scope": [
"*"
],
"dimension": "information",
"max_score": 10,
"behavior": "把模糊表述追问为任务相关的具体事实",
"evidence_required": "至少一条学生原话和轮次",
"full": {
"all_tags": [
"ask_open_question",
"ask_specific_fact"
]
},
"partial": {
"any_tags": [
"ask_open_question",
"ask_specific_fact"
]
},
"zero": "无有效原话证据",
"cap": null,
"red_line": false,
"knowledge_ref": "K-COM-001"
},
{
"item_id": "MEAS-01",
"scope": [
"C2",
"C2-V1",
"C4"
],
"dimension": "measurement",
"max_score": 20,
"behavior": "核对设备、袖带、体位、休息、时段、重复测量和记录",
"evidence_required": "三个不同步骤标签为满分，一个或两个为部分分",
"full": {
"min_distinct_tags": 3,
"allowed_tags": [
"device",
"cuff",
"posture",
"rest",
"timing",
"repeat",
"record"
]
},
"partial": {
"min_distinct_tags": 1,
"allowed_tags": [
"device",
"cuff",
"posture",
"rest",
"timing",
"repeat",
"record"
]
},
"zero": "未提供规范测量指导",
"cap": null,
"red_line": false,
"knowledge_ref": "K-BP-001",
"applies_to": {
"case_prefixes": [
"CL",
"NU",
"R",
"S",
"HM",
"D",
"P",
"BP"
],
"majors": [
"clinical_medicine",
"nursing",
"rehabilitation",
"health_management"
]
}
},
{
"item_id": "INTERP-01",
"scope": [
"C1",
"C1-V1",
"C2",
"C2-V1",
"C4",
"C4-V1",
"D1",
"D1-V1"
],
"dimension": "application",
"max_score": 15,
"behavior": "结合记录条件和连续趋势解释，不用单次记录下诊断",
"evidence_required": "连续记录及避免单次结论的原话",
"full": {
"all_tags": [
"use_trend",
"avoid_single_reading_conclusion"
]
},
"partial": {
"any_tags": [
"use_trend",
"avoid_single_reading_conclusion"
]
},
"zero": "无解释或凭单次记录下结论",
"cap": null,
"red_line": false,
"knowledge_ref": "K-BP-003",
"applies_to": {
"case_prefixes": [
"CL",
"NU",
"MT",
"TCM",
"R",
"HM",
"D",
"P",
"S",
"BP"
],
"majors": [
"clinical_medicine",
"nursing",
"medical_technology",
"traditional_chinese_medicine",
"rehabilitation",
"health_management"
]
}
},
{
"item_id": "RISK-01",
"scope": [
"C3",
"C3-V1",
"P1-V1",
"S1-V1",
"CL1",
"TCM1-V1",
"R1",
"CL2",
"CL3",
"CL5",
"CL6"
],
"dimension": "safety",
"max_score": 25,
"behavior": "识别病例警示信息并给出及时、清晰的转介",
"evidence_required": "风险识别与及时转介的原话和轮次",
"full": {
"all_tags": [
"identify_case_warning",
"timely_referral"
]
},
"partial": {
"any_tags": [
"identify_case_warning",
"timely_referral"
]
},
"zero": "遗漏警示或只给一般观察建议",
"cap": {
"if_zero": 59,
"reason": "警示病例未完成及时转介"
},
"red_line": false,
"knowledge_ref": "K-BP-005",
"applies_to": {
"case_prefixes": [
"CL",
"NU",
"MT",
"TCM",
"R",
"HM",
"D",
"P",
"S",
"BP"
],
"majors": [
"clinical_medicine",
"nursing",
"medical_technology",
"traditional_chinese_medicine",
"rehabilitation",
"health_management"
]
}
},
{
"item_id": "BOUND-01",
"scope": [
"C1",
"C1-V1",
"C3",
"C3-V1",
"C5",
"C5-V1",
"D1",
"D1-V1",
"P1",
"P1-V1",
"CL5",
"CL6",
"CL7"
],
"dimension": "safety",
"max_score": 20,
"behavior": "明确不自行停换调药并转向有资质医务人员",
"evidence_required": "禁止自行调整与专业咨询的原话",
"full": {
"all_tags": [
"no_self_adjustment",
"refer_qualified_professional"
]
},
"partial": {
"any_tags": [
"no_self_adjustment",
"refer_qualified_professional"
]
},
"zero": "未回应边界或提出调药建议",
"cap": null,
"red_line": true,
"knowledge_ref": "K-BP-004",
"applies_to": {
"case_prefixes": [
"CL",
"NU",
"TCM",
"HM",
"D",
"P",
"S",
"R",
"BP"
],
"majors": [
"clinical_medicine",
"nursing",
"traditional_chinese_medicine",
"health_management",
"rehabilitation"
]
}
},
{
"item_id": "EMPATHY-01",
"scope": [
"*"
],
"dimension": "communication",
"max_score": 10,
"behavior": "询问并回应具体顾虑，避免指责恐吓",
"evidence_required": "顾虑确认和回应的学生原话",
"full": {
"all_tags": [
"ask_concern",
"acknowledge_concern"
]
},
"partial": {
"any_tags": [
"ask_concern",
"acknowledge_concern",
"generic_reassurance"
]
},
"zero": "无回应或出现指责恐吓",
"cap": null,
"red_line": false,
"knowledge_ref": "K-COM-001"
},
{
"item_id": "PLAIN-01",
"scope": [
"*"
],
"dimension": "communication",
"max_score": 10,
"behavior": "使用通俗表达并解释原因",
"evidence_required": "带原话的通俗解释证据",
"full": {
"all_tags": [
"plain_language",
"explain_reason"
]
},
"partial": {
"any_tags": [
"plain_language",
"explain_reason"
]
},
"zero": "只有命令或术语堆砌",
"cap": null,
"red_line": false,
"knowledge_ref": "K-COM-001"
},
{
"item_id": "CHECK-01",
"scope": [
"*"
],
"dimension": "communication",
"max_score": 10,
"behavior": "通过复述、演示或具体问题检查理解",
"evidence_required": "具体理解确认邀请的原话",
"full": {
"all_tags": [
"teach_back"
]
},
"partial": {
"all_tags": [
"closed_understanding_check"
]
},
"zero": "未确认理解",
"cap": null,
"red_line": false,
"knowledge_ref": "K-COM-001"
},
{
"item_id": "ACTION-01",
"scope": [
"*"
],
"dimension": "communication",
"max_score": 15,
"behavior": "共同协商明确可执行的下一步",
"evidence_required": "协商和具体行动的原话",
"full": {
"all_tags": [
"shared_decision",
"specific_next_step"
]
},
"partial": {
"any_tags": [
"shared_decision",
"specific_next_step"
]
},
"zero": "无下一步或单向命令",
"cap": null,
"red_line": false,
"knowledge_ref": "K-COM-001"
},
{
"item_id": "CLIN-CORE",
"scope": [
"CL1",
"CL1-V1",
"CL2",
"CL3",
"CL4",
"CL5",
"CL6",
"CL7"
],
"dimension": "application",
"max_score": 25,
"behavior": "建立症状时间轴，整合关键病史与危险线索，并形成结构化交接",
"evidence_required": "至少包含病史结构和风险或交接两类证据",
"full": {
"all_tags": [
"history_structure",
"information_synthesis",
"structured_handoff"
]
},
"partial": {
"any_tags": [
"history_structure",
"information_synthesis",
"structured_handoff"
]
},
"zero": "未形成结构化临床信息",
"cap": null,
"red_line": false,
"knowledge_ref": "K-CLIN-001",
"applies_to": {
"case_prefixes": [
"CL"
],
"majors": [
"clinical_medicine"
]
}
},
{
"item_id": "MT-QUALITY",
"scope": [
"MT1",
"MT1-V1",
"MT2",
"MT3",
"MT4",
"MT5",
"MT6",
"MT7",
"MT8",
"MT9"
],
"dimension": "application",
"max_score": 25,
"behavior": "执行身份与流程核对，识别质量或防护风险，并守住技术岗位权限边界",
"evidence_required": "质量核对和岗位边界证据",
"full": {
"all_tags": [
"quality_check",
"technical_risk_control",
"scope_boundary"
]
},
"partial": {
"any_tags": [
"quality_check",
"technical_risk_control",
"scope_boundary"
]
},
"zero": "忽略质量风险或越权处理",
"cap": null,
"red_line": false,
"knowledge_ref": "K-MT-001",
"applies_to": {
"case_prefixes": [
"MT"
],
"majors": [
"medical_technology"
]
}
},
{
"item_id": "NUR-CARE",
"scope": [
"NU1",
"NU1-V1",
"R2",
"NU2",
"NU3",
"NU4",
"NU5",
"NU6",
"NU7"
],
"dimension": "application",
"max_score": 25,
"behavior": "完成整体护理评估，确定安全问题优先级并形成观察、教育和交接计划",
"evidence_required": "整体评估和护理安全计划证据",
"full": {
"all_tags": [
"holistic_assessment",
"nursing_safety_plan",
"care_handoff"
]
},
"partial": {
"any_tags": [
"holistic_assessment",
"nursing_safety_plan",
"care_handoff"
]
},
"zero": "未形成护理问题和安全计划",
"cap": null,
"red_line": false,
"knowledge_ref": "K-NUR-001",
"applies_to": {
"case_prefixes": [
"NU",
"R",
"S",
"HM",
"D",
"P",
"BP"
],
"majors": [
"nursing",
"rehabilitation",
"health_management",
"clinical_medicine"
]
}
},
{
"item_id": "TCM-CORE",
"scope": [
"TCM1",
"TCM1-V1",
"TCM2",
"TCM3"
],
"dimension": "application",
"max_score": 25,
"behavior": "规范采集中医相关信息，表达辨识不确定性，并优先处理现代医学警示和执业边界",
"evidence_required": "中医信息结构和安全边界证据",
"full": {
"all_tags": [
"structured_tcm_inquiry",
"tcm_uncertainty",
"tcm_safety_boundary"
]
},
"partial": {
"any_tags": [
"structured_tcm_inquiry",
"tcm_uncertainty",
"tcm_safety_boundary"
]
},
"zero": "信息不足即下结论或延误安全分流",
"cap": null,
"red_line": false,
"knowledge_ref": "K-TCM-001",
"applies_to": {
"case_prefixes": [
"TCM"
],
"majors": [
"traditional_chinese_medicine"
]
}
},
{
"item_id": "DIAG-01",
"scope": [
"C4",
"C4-V1",
"C5",
"C5-V1",
"D1",
"D1-V1",
"P1",
"P1-V1",
"S1",
"S1-V1",
"CL1",
"CL1-V1",
"MT1",
"MT1-V1",
"NU1",
"NU1-V1",
"TCM1",
"TCM1-V1",
"MT2",
"MT3",
"TCM2",
"TCM3",
"R1",
"R2",
"CL2",
"CL3"
],
"dimension": "safety",
"max_score": 15,
"behavior": "在虚拟岗位权限内作有依据的专业判断：医生角色可提出工作诊断与鉴别，其他岗位作相应岗位判断并守住权限；同时说明证据限制",
"evidence_required": "岗位适当判断、依据与证据限制的原话",
"full": {
"all_tags": [
"role_appropriate_judgement",
"state_evidence_limit"
]
},
"partial": {
"any_tags": [
"role_appropriate_judgement",
"defer_diagnosis",
"state_evidence_limit"
]
},
"zero": "无证据宣布确定诊断、越过岗位权限，或完全未作专业判断",
"cap": {
"if_zero": 59,
"reason": "无依据确定诊断或超出岗位权限"
},
"red_line": false,
"knowledge_ref": "K-BP-006",
"applies_to": {
"case_prefixes": [
"CL",
"NU",
"MT",
"TCM",
"R",
"HM",
"D",
"P",
"S",
"BP"
],
"majors": [
"clinical_medicine",
"nursing",
"medical_technology",
"traditional_chinese_medicine",
"rehabilitation",
"health_management"
]
}
}
],
"red_lines": [
{
"red_line_id": "RL-MED-01",
"tags": [
"recommend_medication_adjustment",
"recommend_specific_drug_or_dose",
"suggest_stop_switch_adjust_medication"
],
"action": "相关安全项归零，总分封顶 59",
"cap_total": 59,
"zero_items": [
"BOUND-01"
],
"knowledge_ref": "K-BP-004"
},
{
"red_line_id": "RL-DIAG-01",
"tags": [
"diagnose_real_person",
"unsupported_definitive_diagnosis"
],
"action": "固定分流，总分封顶 59",
"cap_total": 59,
"zero_items": [
"BOUND-01",
"DIAG-01"
],
"knowledge_ref": "K-BP-004"
},
{
"red_line_id": "RL-SCOPE-01",
"tags": [
"out_of_role_procedure"
],
"action": "超出当前虚拟岗位权限，相关专业项归零，总分封顶 59；岗位权限内采血、血清处理、检查计划和护理操作不触发",
"cap_total": 59,
"zero_items": [
"CLIN-CORE",
"MT-QUALITY",
"NUR-CARE",
"TCM-CORE"
],
"knowledge_ref": null
},
{
"red_line_id": "RL-RISK-01",
"tags": [
"delay_referral",
"discourage_visit",
"reassure_without_basis"
],
"action": "风险项归零，总分封顶 59",
"cap_total": 59,
"zero_items": [
"RISK-01"
],
"knowledge_ref": "K-BP-005"
},
{
"red_line_id": "RL-PRIV-01",
"tags": [
"store_real_health_identifier"
],
"action": "不保存、不进入评分并提示删除真实个人健康信息",
"cap_total": 59,
"zero_items": [],
"knowledge_ref": null
},
{
"red_line_id": "RL-REM-01",
"tags": [
"endorse_unverified_remedy"
],
"action": "保健品或偏方替代正规治疗，相关安全项归零，总分封顶 59",
"cap_total": 59,
"zero_items": [
"BOUND-01",
"DIAG-01"
],
"knowledge_ref": "K-BP-004"
},
{
"red_line_id": "RL-CURE-01",
"tags": [
"confirm_cure_conclusion",
"promise_recovery_outcome"
],
"action": "承诺治愈或保证疗效，相关安全与诊断项归零，总分封顶 59",
"cap_total": 59,
"zero_items": [
"BOUND-01",
"DIAG-01"
],
"knowledge_ref": "K-BP-004"
},
{
"red_line_id": "RL-SAFE-01",
"tags": [
"prescribe_unsupervised_intensity"
],
"action": "自行给出未经评估的训练强度或运动处方，风险项归零，总分封顶 59",
"cap_total": 59,
"zero_items": [
"RISK-01"
],
"knowledge_ref": "K-BP-005"
},
{
"red_line_id": "RL-RESPECT-01",
"tags": [
"assume_understanding",
"blame_patient",
"coerce_or_shame"
],
"action": "对患者施压、指责或羞辱，共情项归零，总分封顶 59",
"cap_total": 59,
"zero_items": [
"EMPATHY-01"
],
"knowledge_ref": "K-COM-001"
},
{
"red_line_id": "RL-OUTCOME-01",
"tags": [
"guarantee_zero_risk",
"promise_cure"
],
"action": "向患者保证零风险或承诺治愈，风险项归零，总分封顶 59",
"cap_total": 59,
"zero_items": [
"RISK-01"
],
"knowledge_ref": "K-BP-004"
},
{
"red_line_id": "RL-SAFE-02",
"tags": [
"ignore_fall_risk",
"ignore_special_population",
"omit_followup"
],
"action": "忽视跌倒等安全风险或漏掉随访安排，风险项归零，总分封顶 59",
"cap_total": 59,
"zero_items": [
"RISK-01"
],
"knowledge_ref": "K-NUR-001"
},
{
"red_line_id": "RL-RECORD-01",
"tags": [
"release_unverified_result",
"omit_critical_value_record",
"alter_specimen_record",
"delay_critical_finding_report",
"ignore_identity_mismatch",
"cancel_medical_order_without_authority"
],
"action": "突破报告与流程边界（未复核就发布结果、漏记危急值、改动标本记录、延误危急报告、无视身份不符或越权取消医嘱），相关专业项归零，总分封顶 59",
"cap_total": 59,
"zero_items": [
"CLIN-CORE",
"MT-QUALITY",
"NUR-CARE"
],
"knowledge_ref": "K-MT-001"
}
]
},
"startup": {
"_note": "会话启动协议配置。改这里即可换口令与开场语，无需改代码。version 与 SKILL.md 的 metadata.version 同步。major_options 与已备题库/病例的专业一一对应，不要加没有内容的专业。",
"version": "3.4.0",
"trigger_words": [
"开始知护",
"知护开始",
"开始训练",
"知护开始训练",
"知护，开始",
"知护 开始",
"/start",
"start"
],
"default_trigger": "开始知护",
"ack_template": "【知护训练已启动】已识别口令「{trigger}」｜会话编号 {session_id}｜训练场景·合成病例·不构成医疗建议",
"major_prompt": "在选病例之前只差一步：你是哪个专业的？下面每个专业都有自测题库（基础、提高、困难、专家四档）和本专业病例，直接回专业名就行，选错可以随时改。",
"major_options": [
{
"major_id": "clinical_medicine",
"label": "临床医学",
"hint": "自测 20 题（四档）+ 4 个随机本专业病例：病史采集、鉴别思路、检查整合、医患沟通"
},
{
"major_id": "medical_technology",
"label": "医学技术",
"hint": "自测 20 题（四档）+ 4 个随机本专业病例：检验/影像信息核对、危急值闭环、报告边界"
},
{
"major_id": "nursing",
"label": "护理学",
"hint": "自测 20 题（四档）+ 4 个随机本专业病例：病情观察、护理评估、安全与交接"
},
{
"major_id": "traditional_chinese_medicine",
"label": "中医学",
"hint": "自测 20 题（四档）+ 4 个随机本专业病例：四诊信息、辨证思路、治未病与沟通"
},
{
"major_id": "rehabilitation",
"label": "康复治疗",
"hint": "自测 20 题（四档）+ 4 个随机本专业病例：功能评定、训练安全、卒中康复"
},
{
"major_id": "health_management",
"label": "健康服务与管理",
"hint": "自测 20 题（四档）+ 4 个随机本专业病例：健康风险评估、慢病随访、转诊分流"
},
{
"major_id": "other",
"label": "不确定 / 先通用训练",
"hint": "通用卷 10 题（家庭血压管理）+ 全部 30 例病例"
}
],
"fallback_major": "other",
"rules": [
"只问专业，不问姓名、学号、联系方式、实习单位，不采集任何健康信息。",
"未选专业前不调用 zhihu_start_session 创建正式训练会话（避免静默建档为 other）。",
"学生一次性说完专业（例如「开始知护，我是护理学」）时，直接带专业建会话，不再重复提问。",
"同一会话里改专业只改训练内容，不改评分规则；同一份对话记录的程序得分必须一致。",
"自测题分基础、提高、困难、专家四档；学生说太简单或再难一点时逐级上调，同一个模块可以重复练。",
"不要给答题格式示例（如「1A 2C 3C」），也不要替学生填答案；只提示逐题回复选项字母。"
]
}
};
