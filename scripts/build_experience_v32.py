"""Build locally reviewed excerpts; no network, scores or clinical approval."""
import json
import shutil
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
OLD = ROOT / 'output/知护题库关联经验库_v3.1'
OUT = ROOT / 'output/知护题库关联经验库_v3.2'
RULES = ROOT / 'workbuddy-agent/zhihu-agent/connector/server/zhihu_mcp/experience_rules.json'
BASE_RULES = ROOT / 'backups/before-experience-v32-20261114-200420/workbuddy-agent/zhihu-agent/connector/server/zhihu_mcp/experience_rules.json'


def build():
    data = json.loads((OLD / '知护题库关联经验库_v3.1.json').read_text(encoding='utf8'))
    rules = json.loads(BASE_RULES.read_text(encoding='utf8'))
    for source in data['sources']:
        path = Path(source['evidence_snapshot'])
        (OUT / path).parent.mkdir(parents=True, exist_ok=True)
        shutil.copyfile(OLD / path, OUT / path)
    for sid, issuer, version, publication, kind in [
        ('G19', 'World Society of Emergency Surgery (WSES)', '2019', '2019-06-13', 'guideline'),
        ('G20', 'World Society of Emergency Surgery (WSES)', '2020', '2020-01-07', 'guideline'),
        ('G24', 'American Geriatrics Society (AGS)', '2014建议；2015期刊版', '2015-01（电子发表2014-12-12）', 'guideline'),
        ('G25', 'World Society of Emergency Surgery (WSES)', '2020', '2020-04-15', 'guideline'),
        ('G26', 'European Society for Emergency Medicine (EUSEM)', '2024', '2024-06-13', 'expert_consensus'),
    ]:
        meta = json.loads((OUT / f'证据核验/{sid}_下载记录.json').read_text(encoding='utf8'))
        data['sources'].append(dict(id=sid, title=meta['title'], issuer=issuer,
            doi=meta['doi'][0], original_url='https://doi.org/' + meta['doi'][0],
            evidence_url=meta['download_url'], version=version + '；未系统核查后续更新版本，不标为最新',
            publication=publication, checked_on='2026-11-14', evidence_type=kind,
            verification_scope='取得全文并逐条核对本版引用段落；不等于全文所有推荐均已审核，不代表临床专家审定；未系统核查后续更新版本',
            evidence_snapshot=f'证据核验/{sid}_核验文本.txt', snapshot_sha256=meta['text_sha256']))
    rules['backgrounds'].update({
        'acute_pancreatitis': dict(pattern=r'急性胰腺炎', question='是否已确认本次急性胰腺炎，而非仅有腹痛或既往病史？', confirmed_required=True),
        'perforated_ulcer': dict(pattern=r'消化性溃疡穿孔|溃疡穿孔', question='是否为当前疑似或确认的消化性溃疡穿孔，而非其他腹痛？', suspected_allowed=True),
        'bleeding_ulcer': dict(pattern=r'出血性消化性溃疡|消化性溃疡出血|溃疡出血', question='本次出血是否已证实来自消化性溃疡，而非仅有黑便？', confirmed_required=True),
        'postoperative_delirium': dict(pattern=r'术后谵妄', question='是否为已确认的本次术后谵妄？一般住院意识改变不能直接等同。', confirmed_required=True),
        'appendicitis_evaluation': dict(pattern=r'急性阑尾炎|阑尾炎', question='是否正在评估本次疑似或确认的急性阑尾炎？右下腹痛仍须鉴别病因。', suspected_allowed=True),
        'tloc_evaluation': dict(pattern=r'短暂意识丧失|(?<![A-Za-z])TLOC(?![A-Za-z])|晕厥', question='是否为本次短暂意识丧失或疑晕厥评估？单纯头晕、跌倒不能代替事件核实。', suspected_allowed=True),
        'confirmed_syncope': dict(pattern=r'晕厥', question='是否已完成鉴别并确认本次事件为晕厥？短暂意识丧失仍可能有其他病因。', confirmed_required=True),
    })
    # title/topic/bg/trigger/collect/action/boundary/source/locator/quote/grade/gates/recall
    rows = [
      ('胰腺坏死与短暂低氧不能独自决定严重分级', '急性胰腺炎', 'acute_pancreatitis',
       '已诊断急性胰腺炎，有低氧、局部坏死或器官功能变化，需要动态分级。',
       '呼吸、循环、肾功能的客观指标与持续时间，尤其是否超过48小时；感染和趋势。',
       '指南将重症与持续器官衰竭相关联，讨论明确持续超过48小时；不能仅凭局部坏死或短暂低氧直接判定重症，应动态复评。',
       '正在发生器官功能衰竭时应立即升级监护评估，不能等待满48小时后才处理。',
       'G19', 'Diagnosis > Statements (severity grading)；Discussion（持续时间）',
       'Severe acute pancreatitis is associated with persistent organ failure (cardiovascular, respiratory, and/or renal), and high mortality.',
       '原文声明组标注1C；超过48小时见紧随讨论，非本句独立阈值',
       [(r'低氧|局部坏死|器官功能障碍|器官衰竭', '是否已有本次器官功能变化或坏死的客观依据，并核对持续时间？')], [r'胰腺炎|上腹剧痛.*背部']),
      ('胰腺坏死不等于必须预防性使用抗菌药', '急性胰腺炎', 'acute_pancreatitis',
       '急性胰腺炎伴坏死，正在考虑无感染时预防性抗菌治疗。',
       '感染证据、体温与器官功能趋势、影像、培养、其他感染灶和既往治疗。',
       '该版指南不推荐对所有急性胰腺炎常规预防性使用抗菌药；坏死本身不等于感染，须重评实际感染依据。',
       '疑似或证实感染不能套用无感染分支；不得由本卡自动停药，恶化或疑脓毒症立即升级。',
       'G19', 'Antibiotic treatment > Statement (prophylactic antibiotics)',
       'Thus, routine prophylactic antibiotics are no longer recommended for all patients with acute pancreatitis (1A).',
       '原文1A', [(r'局部坏死|胰腺坏死|预防性抗菌|预防性抗生素', '是否存在坏死或正在考虑预防性抗菌治疗？')], [r'胰腺炎|胰腺坏死']),
      ('胰腺炎复苏需要反复评估而非持续追加液体', '急性胰腺炎', 'acute_pancreatitis',
       '急性胰腺炎正在进行液体复苏或评估继续补液。',
       '已给液体、血流动力学、尿量、呼吸氧合、心肾共病及容量负荷趋势。',
       '指南要求频繁重评血流动力学以指导液体治疗，并指出液体过负荷有害；由专业团队平衡灌注与负荷风险。',
       '不生成补液量、速率或自动追加指令；低氧加重、灌注恶化须及时升级。',
       'G19', 'Intensive care unit > Statement (fluid resuscitation)',
       'Fluid administration should be guided by frequent reassessment of the hemodynamic status, since fluid overload is known to have detrimental effects.',
       '原文声明组1B', [(r'液体复苏|继续补液|补液评估', '是否正在评估本次液体复苏及继续补液？')], [r'胰腺炎|补液']),
      ('重症胰腺炎营养支持应核对肠内途径耐受性', '急性胰腺炎', 'acute_pancreatitis',
       '成人重症急性胰腺炎需营养支持，正在选择支持途径。',
       '严重程度依据、胃肠道功能、肠内途径可行性与耐受、营养目标及禁忌。',
       '该版指南支持肠内营养以减少肠功能及感染并发症；肠内途径未完全耐受时再由团队评估补充肠外营养，不能一概长期全肠外。',
       '不自动安排置管、开始时间或营养处方；肠内禁忌及不耐受必须专业核实。',
       'G19', 'Intensive care unit > Statement (enteral nutrition)',
       'Enteral nutrition is recommended to prevent gut failure and infectious complications.',
       '原文声明组1A', [(r'重症急性胰腺炎|持续器官衰竭', '是否有重症急性胰腺炎的分级依据？'), (r'营养支持|营养途径', '是否正在评估营养支持途径与耐受？')], [r'胰腺炎|营养支持']),
      ('疑溃疡穿孔但未见游离气体仍须重评', '消化性溃疡穿孔', 'perforated_ulcer',
       '持续疑消化性溃疡穿孔，但初始影像未见游离气体。',
       '起病与腹膜刺激征、循环状态、影像类型和时点、穿孔可能及替代病因。',
       '该版指南建议仍疑穿孔且未见游离气体时进一步影像评估，必要时由专科选择水溶性造影；阴性初片不能独自结束评估。',
       '不是自行口服造影或留观指令；疑腹膜炎或循环不稳立即转外科急评。',
       'G20', 'Perforated peptic ulcer > Diagnosis',
       'when free air is not seen on imaging and there is ongoing suspicion of perforated peptic ulcer, we suggest performing imaging with the addition of water-soluble contrast either oral or via nasogastric tube',
       '原文weak recommendation，very low-quality evidences，2D',
       [(r'影像未见游离气体|未见游离气体|阴性初片', '本次初始影像是否未见游离气体，且临床仍疑穿孔？')], [r'溃疡穿孔|突发上腹痛']),
      ('溃疡穿孔非手术观察仅限严格选择的分支', '消化性溃疡穿孔', 'perforated_ulcer',
       '溃疡穿孔评估中正在考虑非手术观察。',
       '是否造影证实封闭、生命体征、持续漏出、腹膜炎、脓毒症、可监测及随时手术能力。',
       '指南反对常规非手术处理；仅极少严格选择、造影证实穿孔已封闭的患者才考虑该路径，并反复复评。',
       '本卡不批准保守治疗；腹膜炎、漏出、脓毒症或恶化时须及时外科升级。',
       'G20', 'Perforated peptic ulcer > Non-operative management—endoscopic treatment',
       'non-operative management (NOM) could be considered in extremely selected cases where perforation has sealed as confirmed on water-soluble contrast study',
       '原文weak recommendation，low-quality evidences，2C',
       [(r'非手术观察|保守治疗评估', '是否正在讨论非手术观察的适用性，而非已具备全部前提？')], [r'溃疡穿孔|保守治疗']),
      ('溃疡穿孔出现腹膜炎或漏出优先外科升级', '消化性溃疡穿孔', 'perforated_ulcer',
       '疑或确诊溃疡穿孔，并有腹膜炎、明显气腹或腔外造影剂漏出。',
       '当前循环、腹膜体征、气腹程度、造影漏出、发病与延误时间。',
       '指南推荐这些穿孔高风险表现下手术治疗评估；应及时联系外科团队，不等待多轮指南问答。',
       '手术方式与时机由现场团队决定，程序不自动下达手术或操作指令。',
       'G20', 'Perforated peptic ulcer > Surgery',
       'In patients with perforated peptic ulcer with significant pneumoperitoneum or extraluminal contrast extravasation or signs of peritonitis, we recommend operative treatment',
       '原文Strong recommendation，low-quality evidences，1C',
       [(r'腹膜炎|明显气腹|腔外造影剂漏出', '是否存在腹膜炎、明显气腹或腔外漏出等高风险证据？')], [r'溃疡穿孔|板状腹']),
      ('证实溃疡出血后仍须核对幽门螺杆菌', '消化性溃疡出血', 'bleeding_ulcer',
       '本次出血来源已证实为消化性溃疡，正在核对病因与复发因素。',
       '内镜及出血来源、幽门螺杆菌检查及影响因素、NSAID或抗栓用药、再出血风险。',
       '指南推荐对溃疡出血患者检测幽门螺杆菌；不能只止血而遗漏相关病因评估。结果与后续处理由专科核实。',
       '黑便不自动等于溃疡出血；不把未查当阴性，不生成根除处方；急性出血风险先处理。',
       'G20', 'Bleeding peptic ulcer > Antimicrobial therapy',
       'We recommend performing Helicobacter pylori testing in all patients with bleeding peptic ulcer',
       '原文strong recommendation，low-quality evidences，1C',
       [(r'内镜证实溃疡出血|胃镜证实溃疡出血|溃疡出血已确诊', '是否有本次胃镜等证实溃疡出血的依据？')], [r'黑便|呕血|溃疡出血']),
      ('老年术后谵妄应追查可逆诱因', '老年术后谵妄', 'postoperative_delirium',
       '老年患者本次已确诊术后谵妄，病因仍需梳理。',
       '手术时间、注意力与意识波动、感染低氧、代谢及药物环境因素、疼痛和潴留。',
       'AGS建议开展医学评估、药物及环境调整，并按需要检查和会诊以识别和处理诱因；不能只用镇静掩盖变化。',
       '限定老年术后情境；一般住院急性意识改变先核实背景，急性风险及时升级。',
       'G24', 'IV. Identify and Manage Causes of Delirium > Recommendation',
       'The healthcare professional should perform a medical evaluation, make medication and/or environmental adjustments, and order appropriate diagnostic tests and clinical consultations after an older adult has been diagnosed with postoperative delirium to identify and manage underlying contributors to delirium',
       '原文strong，quality of evidence: low',
       [(r'诱因未明|病因评估|注意力.{0,8}(?:下降|不集中)|意识波动', '是否需要梳理本次谵妄诱因或注意力、意识波动？')], [r'谵妄|注意力不集中|意识波动']),
      ('老年术后谵妄需要多因素团队干预', '老年术后谵妄', 'postoperative_delirium',
       '已诊断老年术后谵妄，正在制定综合干预计划。',
       '定向、睡眠、活动、感觉辅助、疼痛、饮水营养及团队可执行条件。',
       'AGS建议考虑跨专业团队实施多组分干预以改善临床结局；应同时处理诱因并评估实施效果。',
       '该建议证据质量低，不承诺疗效；不是所有意识障碍的通用处理规则。',
       'G24', 'III. Multicomponent Nonpharmacologic Interventions Performed by an Interdisciplinary Team for Management of Delirium > Recommendation',
       'Healthcare professionals should consider multicomponent interventions implemented by an interdisciplinary team in older adults diagnosed with postoperative delirium to improve clinical outcomes',
       '原文weak，quality of evidence: low',
       [(r'综合干预|非药物干预|团队干预', '是否正在规划本次谵妄的综合或非药物团队干预？')], [r'术后谵妄|非药物干预']),
      ('术后谵妄不能把苯二氮䓬类作为常规一线', '老年术后谵妄', 'postoperative_delirium',
       '老年术后谵妄有严重激越及伤害风险，考虑苯二氮䓬类镇静。',
       '激越及伤害风险、行为干预效果、药物史和酒精或苯二氮䓬戒断等特定适应证。',
       'AGS不建议以苯二氮䓬类作为该情境常规一线；但酒精或该类药物戒断等明确适应证为例外，需专业判断。',
       '不能解读为永不使用；不提供药物剂量或替代处方，安全威胁需现场团队立即评估。',
       'G24', 'XIII. Benzodiazepines > Recommendation',
       'The prescribing practitioner should not use benzodiazepines as a first-line treatment of the agitated postoperative delirious patient who is threatening substantial harm to self and/or others to treat postoperative delirium except when benzodiazepines are specifically indicated (including, but not limited to, treatment of alcohol or benzodiazepine withdrawal).',
       '原文strong，quality of evidence: low',
       [(r'严重激越', '是否存在严重激越？'), (r'伤害风险', '是否存在对自己或他人的显著伤害风险？'), (r'苯二氮[䓬卓]类(?!戒断)|benzodiazepine(?! withdrawal)', '是否正在考虑苯二氮䓬类作为一线治疗？')], [r'术后谵妄|苯二氮[䓬卓]']),
      ('无激越伤害威胁的术后谵妄不常规用镇静药', '老年术后谵妄', 'postoperative_delirium',
       '老年术后谵妄，未发现激越并威胁显著伤害的情形。',
       '是否低活动型、当前行为及伤害风险、疼痛、药物史和可逆诱因。',
       'AGS反对为此类无激越伤害威胁的术后谵妄常规给予抗精神病药或苯二氮䓬类；仍应积极评估诱因和支持照护。',
       '安静不等于正常；其他独立适应证仍需医生判断，不能因患者少动而漏评急性恶化。',
       'G24', 'XIV. Pharmacologic Treatment of Hypoactive Delirium > Recommendation',
       'The prescribing practitioner should not prescribe antipsychotic or benzodiazepine medications for the treatment of older adults with postoperative delirium who are not agitated and threatening substantial harm to self or others',
       '原文strong，quality of evidence: low',
       [(r'低活动型|安静少动', '是否有低活动型或安静少动表现并经过行为风险评估？')], [r'术后谵妄|低活动型']),
      ('疑阑尾炎要个体化分层而非只凭典型腹痛', '急性阑尾炎', 'appendicitis_evaluation',
       '成人疑阑尾炎，需要确定逐步诊断路径。',
       '年龄、性别及妊娠可能、疼痛迁移与趋势、体征、实验室和影像以及替代病因。',
       'WSES建议结合年龄、性别和临床症状体征进行个体化风险分层，规划逐步诊断路径；单个症状不能直接确诊。',
       '不生成自动诊断或手术结论；腹膜炎、循环异常或进行性恶化先升级。',
       'G25', 'Q.1.1 > Recommendation 1.1',
       'We recommend to adopt a tailored individualized diagnostic approach for stratifying the risk and disease probability and planning an appropriate stepwise diagnostic pathway in patients with suspected acute appendicitis, depending on age, sex, and clinical signs and symptoms of the patient',
       '原文Moderate；Strong；1B',
       [(r'右下腹.{0,6}(?:痛|疼)|转到右下腹|阑尾炎风险分层', '是否有本次右下腹症状或正在开展阑尾炎风险分层？')], [r'右下腹|阑尾炎|急性腹痛']),
      ('成人Alvarado分值不能独自确诊阑尾炎', '急性阑尾炎', 'appendicitis_evaluation',
       '成人疑阑尾炎，正在解释Alvarado评分。',
       '评分项目与原始资料、症状趋势、年龄、并发症和影像，以及其他腹痛病因。',
       '该版指南不建议用Alvarado评分直接确证成人急性阑尾炎；评分用于路径时仍须结合完整临床评估。',
       '本卡不支持自动决定手术或排除诊断，儿童、妊娠与老年等情境需另核路径。',
       'G25', 'Q.1.1 > Recommendation 1.3',
       'We suggest against the use of Alvarado score to positively confirm the clinical suspicion of acute appendicitis in adults',
       '原文Moderate；Weak；2B',
       [(r'Alvarado', '是否正在使用本次Alvarado评分，并核实各项目？')], [r'Alvarado|阑尾炎']),
      ('检查正常但右下腹痛不缓解需要继续评估', '急性阑尾炎', 'appendicitis_evaluation',
       '成人疑阑尾炎，初始检查正常但右下腹痛持续未缓解。',
       '正常检查的种类和时间、疼痛趋势、体征、既往影像、妊娠可能及替代诊断。',
       'WSES支持未缓解右下腹痛在手术前进一步断层影像评估；即便影像阴性，进行性或持续疼痛仍需外科重评，不能单次正常即结束。',
       '检查和探查由专科决定，不自行安排CT或腹腔镜；高风险恶化先升级。',
       'G25', 'Q.1.5 > Recommendation 1.12',
       'We recommend cross-sectional imaging before surgery for patients with normal investigations but non-resolving right iliac fossa pain.',
       '原文High；Strong；1A（整条推荐）',
       [(r'初始检查正常|初检正常', '是否核实哪些本次初始检查正常？'), (r'右下腹痛持续|右下腹痛未缓解', '是否仍有持续未缓解的右下腹痛？')], [r'右下腹|阑尾炎']),
      ('妊娠期疑阑尾炎不能仅凭阴性MRI排除', '妊娠期疑阑尾炎', 'appendicitis_evaluation',
       '妊娠期疑阑尾炎，MRI阴性或结论不明确，临床仍高度怀疑。',
       '妊娠及孕周、症状体征趋势、超声和MRI质量、其他产科与非产科病因。',
       'WSES声明阴性或不确切MRI不能排除妊娠期阑尾炎；若临床仍高度怀疑，需外科与产科继续评估。',
       '引用为声明，不补造独立推荐等级；不把此条变成自动手术或其他人群影像规则。',
       'G25', 'Q.1.5 > Statement 1.14（非Recommendation 1.13）',
       'However, a negative or inconclusive MRI does not exclude appendicitis and surgery should be still considered if high clinical suspicion.',
       '原文Statement 1.14；本声明未单列推荐等级',
       [(r'妊娠|怀孕', '是否已确认当前妊娠及孕周？'), (r'MRI阴性|MRI结论不明确', '是否核实本次MRI阴性或结论不明确？'), (r'临床仍高度怀疑', '是否经临床复评仍高度怀疑本次阑尾炎？')], [r'妊娠.*阑尾炎|MRI.*阑尾炎']),
      ('疑晕厥先核对事件及创伤休克', '短暂意识丧失与晕厥', 'tloc_evaluation',
       '成人急诊疑短暂意识丧失或晕厥，病因尚未明确。',
       '目击经过、意识丧失及恢复、跌倒前后顺序、头部创伤、循环与感染风险。',
       'EUSEM共识强调早期识别创伤和休克，存在者进入相应紧急路径；不能把所有跌倒或短暂意识变化先定为良性晕厥。',
       '本条为急诊流程共识，非自动诊断规则；当前创伤或休克风险须立即升级。',
       'G26', 'Extended event process chain > part 1: arrival and triage',
       'the process pathway continues with a risk-oriented approach by focusing on early identification/exclusion of obvious severe diseases.',
       '专家共识流程说明；无独立推荐等级',
       [(r'急诊', '是否为急诊事件评估情境？')], [r'晕厥|短暂意识丧失|眼前发黑|跌倒|摔了']),
      ('疑晕厥不能省略心电图与基础评估', '短暂意识丧失与晕厥', 'tloc_evaluation',
       '成人急诊非创伤性短暂意识丧失，已排除休克，需初始诊断评估。',
       '创伤及休克排查、生命体征、心电图及专业判读、针对性的实验室及病史体征。',
       '该共识将生命体征、心电图和按情境选择的实验室检查纳入初始评估；心电图对识别高风险心源性原因重要。',
       '不能凭症状恢复而省略评估；具体检查按专业团队和本机构路径安排。',
       'G26', 'Extended event process chain > part 2: diagnostic procedures',
       'These include the ‘check of vital parameters’ (field 22) as explained in detail in Table 1. Secondly, an ‘ECG’ is performed (field 30) and ‘laboratory tests’ are done if appropriate in the specific setting (field 11).',
       '专家共识流程说明；无独立推荐等级',
       [(r'急诊', '是否为急诊评估情境？'), (r'心电图评估|初始诊断评估', '是否正在进行本次初始诊断及心电图评估？')], [r'晕厥|短暂意识丧失']),
      ('疑晕厥体位试验须先判断是否适合', '短暂意识丧失与晕厥', 'tloc_evaluation',
       '成人急诊非创伤性短暂意识丧失基础评估后，考虑体位性原因。',
       '基础评估、循环稳定性、创伤、站立安全、用药及体位与事件的关系。',
       '共识在病史查体后仅于适合时开展或安排Schellong体位试验；应先判断能否安全实施，不能把起立头晕直接当已确诊体位性低血压。',
       '不稳定、休克、创伤或站立不安全时不适用本分支；程序不要求用户自行站立测试。',
       'G26', 'Extended event process chain > part 2: diagnostic procedures',
       'At this stage, the emergency physician will start or complete his/her history taking, physical examination and, according to the ESC guidelines [1], perform or initiate a Schellong test if suitable.',
       'EUSEM专家共识引用ESC；本卡核验对象为EUSEM原文，未另行核验ESC该条',
       [(r'急诊', '是否为急诊评估情境？'), (r'基础评估已完成', '是否已完成基础诊断评估？'), (r'体位性原因|体位试验', '是否正在评估体位相关原因及试验适合性？')], [r'起立.*头晕|眼前发黑|晕厥']),
      ('晕厥中高风险不能因恢复清醒就直接离院', '短暂意识丧失与晕厥', 'confirmed_syncope',
       '成人急诊晕厥评估后属中危或高危，需决定后续观察去向。',
       '事件经过、既往病史、查体、心电图、风险分层及其他鉴别诊断。',
       'EUSEM共识指出中高风险患者需进一步院内照护及监测；清醒或暂时无症状并不能代替风险分层，也不自动满足离院条件。',
       '不补造ESC的具体分层阈值或出院规则；具体监测地点和安排由现场团队决定。',
       'G26', 'Extended event process chain > part 3: risk stratification',
       'Intermediate or high-risk patients require further hospital-based care and are treated according to local practice on a monitoring ward in or outside of the ED',
       '专家共识流程说明；无独立推荐等级',
       [(r'急诊', '是否为急诊评估情境？'), (r'中危|高危|中等风险|高风险', '是否已依据病史、查体和心电图完成中高风险分层？')], [r'晕厥|短暂意识丧失']),
    ]
    for number, row in enumerate(rows, 72):
        title, topic, bg, trigger, collect, action, boundary, sid, locator, quote, grade, gates, recall = row
        source = next(s for s in data['sources'] if s['id'] == sid)
        snapshot = (OUT / source['evidence_snapshot']).read_text(encoding='utf8')
        assert ' '.join(quote.split()) in ' '.join(snapshot.split()), (number, quote)
        cid = f'K{number}'
        data['cards'].append(dict(id=cid, title=title, topic=topic, roles=['临床', '护理'], trigger=trigger,
            collect=collect, action=action, boundary=boundary,
            evidence=[dict(source_id=sid, locator=locator, quote=quote, grade=grade,
                quote_label='专家共识原文' if sid == 'G26' else '指南原文声明' if sid == 'G19' or number == 87 else '指南原文推荐')],
            status='原文引文已核对；教学转述尚未临床专家审定', interpretation='整理者教学转述，非指南或专家共识原句',
            question_ids=[], case_ids=[], node_ids=[],
            association_status='仅疾病与情境候选；须核对背景、人群、触发与排除条件，不代表适用或覆盖'))
        excludes = []
        if number == 73:
            excludes = [dict(pattern=r'胰腺感染|感染性坏死|其他感染灶', question='是否存在疑似或证实胰腺感染、感染性坏死或其他感染灶？')]
        if number == 82:
            excludes = [dict(pattern=r'酒精戒断|苯二氮[䓬卓].{0,4}戒断|其他特定适应证', question='是否存在酒精或苯二氮䓬戒断等特定适应证？')]
        if number == 83:
            excludes = [dict(pattern=r'激越|伤害威胁', question='是否存在激越或对自己他人的显著伤害威胁？')]
        if bg in ('tloc_evaluation', 'confirmed_syncope') and number != 88:
            excludes = [dict(pattern=r'创伤性意识丧失|休克', question='是否存在创伤性意识丧失或休克，需要先转入相应紧急路径？')]
            if number == 90:
                excludes += [dict(pattern=r'循环不稳定|站立不安全', question='是否循环不稳或不具备安全站立条件？')]
        rules['cards'][cid] = dict(backgrounds=[bg], min_age=65 if bg == 'postoperative_delirium' else 18,
            requires=[dict(pattern=p, question=q) for p, q in gates], excludes=excludes, retrieval=recall)
    # Indexes recall candidates; public clinical facts alone establish gates.
    curated = {'CL122': ['K72', 'K73', 'K74', 'K75'], 'CL3': ['K84', 'K85', 'K86'],
               'CL32': ['K79'], 'CL33': ['K79'], 'CL34': ['K79'], 'CL6': ['K88', 'K89', 'K90', 'K91']}
    # These current cases postdate the original association table. Explicit
    # candidate rows must be added, not just appended to rows that do not exist.
    for cid, disease_id, label, title in [
        ('CL122', 'acute_pancreatitis_severity', '急性胰腺炎严重程度动态评估', '急性胰腺炎合并短暂器官功能障碍'),
        ('CL32', 'upper_gi_bleeding_reasoning', '上消化道出血与溃疡评估', '反复上腹痛后黑便的病因与风险评估'),
        ('CL33', 'upper_gi_bleeding_reasoning', '上消化道出血与溃疡评估', '关节疼痛患者服药后出现黑便'),
        ('CL34', 'upper_gi_bleeding_reasoning', '上消化道出血与溃疡评估', '反酸与上腹痛患者的新发黑便'),
    ]:
        if not any(a['case_id'] == cid for a in data['case_associations']):
            data['case_associations'].append(dict(case_id=cid, disease_id=disease_id, disease_label=label,
                title=title, origin='现有合成教学病例；候选关联待教师审定', links=[], status='仅候选'))
    for association in data['case_associations']:
        if association['case_id'] in curated:
            ids = curated[association['case_id']]
            association['links'].append(dict(group='v32_curated_candidate', matched_term=association['disease_label'], card_ids=ids,
                condition='仅情境候选；未知疾病、人群、排除和触发条件须逐项核实，不能视为已适用或已覆盖'))
            association['status'] = '候选参考；未逐病例审定适用或覆盖'
            for card in data['cards']:
                if card['id'] in ids:
                    card['case_ids'].append(association['case_id'])
    data.update(name='知护题库关联经验库 v3.2', version='3.2', card_count=len(data['cards']), source_count=len(data['sources']),
        expansion_note='保留v3.1的71卡，新增20卡及5份来源；胰腺炎、消化性溃疡穿孔/出血、老年术后谵妄、阑尾炎、晕厥。未临床专家审定；候选不等于覆盖。',
        inventory={'status': '见v3.2运行池候选盘点；不继承旧版候选数量，不代表覆盖率'},
        integration='源码默认加载v3.2；本轮未发布或部署；不改变评分')
    data['scope_note'] += ['v3.2新增5份全文及20条已逐句核对引用；只核验引用段落，非全文所有推荐审核。',
        'AGS来源为2014电子发表/2015期刊版老年术后谵妄建议；不可推广至所有住院谵妄。',
        '晕厥依据为2024 EUSEM专家共识，不能冒充ESC指南核验。所有版本均未系统核查后续更新。']
    data['deferred_sources_v32'] = [{'pmcid': p, 'status': '公开全文接口未取得可核验正文，未编卡，不计来源数'}
        for p in ['PMC5850553', 'PMC6258916', 'PMC6140607']]
    data['input_manifest'] = [dict(path=s['evidence_snapshot'], source_id=s['id'], sha256=s['snapshot_sha256']) for s in data['sources']]
    (OUT / '知护题库关联经验库_v3.2.json').write_text(json.dumps(data, ensure_ascii=False, indent=2), encoding='utf8')
    RULES.write_text(json.dumps(rules, ensure_ascii=False, indent=2) + '\n', encoding='utf8')
    print(json.dumps(dict(cards=data['card_count'], sources=data['source_count'], added=len(rows)), ensure_ascii=False))


if __name__ == '__main__':
    build()
