"""Build an independently updateable teaching resource from verified excerpts.

No network requests, patient data, scoring changes or inferred clinical approval.
Run from any working directory; source quotes must exist in local evidence.
"""
import hashlib
import json
import shutil
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
OLD = ROOT / 'output/知护题库关联经验库_v3.0'
OUT = ROOT / 'output/知护题库关联经验库_v3.1'
RULES = ROOT / 'workbuddy-agent/zhihu-agent/connector/server/zhihu_mcp/experience_rules.json'


def build():
    data = json.loads((OLD / '知护题库关联经验库_v3.0.json').read_text(encoding='utf-8-sig'))
    rules = json.loads(RULES.read_text(encoding='utf8'))
    # Copy all old verified snapshots, without changing the old resource.
    for source in data['sources']:
        path = Path(source['evidence_snapshot'])
        (OUT / path).parent.mkdir(parents=True, exist_ok=True)
        shutil.copyfile(OLD / path, OUT / path)
    sources = [
        ('G15', 'American Thoracic Society / Infectious Diseases Society of America (ATS/IDSA)', '2019', '2019-10-01', 'guideline'),
        ('G16', 'Surviving Sepsis Campaign / SCCM / ESICM', '2021', '2021-10-02', 'guideline'),
        ('G17', 'World Allergy Organization (WAO)', '2020', '2020-10-30', 'guidance'),
        ('G18', 'American College of Cardiology (ACC)', '2022', '2022-10-11', 'expert_consensus'),
    ]
    for sid, issuer, version, publication, kind in sources:
        meta = json.loads((OUT / f'证据核验/{sid}_下载记录.json').read_text(encoding='utf8'))
        data['sources'].append(dict(id=sid, title=meta['title'], issuer=issuer,
            doi=meta['doi'][0], original_url='https://doi.org/' + meta['doi'][0],
            evidence_url=meta['download_url'], version=version + '版；未作截至2026年的最新版核查',
            publication=publication, checked_on='2026-11-14', evidence_type=kind,
            verification_scope='取得全文并逐条核对本版引用段落；不等于全文所有推荐均已审核，不代表临床专家审定；未系统核查后续更新版本',
            evidence_snapshot=f'证据核验/{sid}_核验文本.txt', snapshot_sha256=meta['text_sha256']))
    rules['backgrounds'].update({
        'cap': {'pattern': r'社区获得性肺炎|社区肺炎|(?<![A-Za-z])CAP(?![A-Za-z])', 'question': '是否为当前成人社区获得性肺炎背景，且有临床及影像依据？'},
        'sepsis': {'pattern': r'脓毒症|脓毒性休克|sepsis|septic shock', 'question': '是否有当前疑似或已确认的脓毒症评估依据，而非仅有发热？', 'suspected_allowed': True},
        'anaphylaxis': {'pattern': r'严重过敏反应|全身性过敏反应|过敏性休克|anaphylaxis', 'question': '是否为当前疑似或已确认的严重全身过敏反应，或该次反应的观察阶段？', 'suspected_allowed': True},
        'acs_evaluation': {'pattern': r'急性冠脉综合征|急性冠状动脉综合征|(?<![A-Za-z])ACS(?![A-Za-z])', 'question': '是否为当前急诊急性胸痛疑似ACS的评估，而非稳定胸痛或其他原因？', 'suspected_allowed': True},
    })
    # Each row: title/topic/background, trigger, collect, teaching action,
    # boundary, source/locator/quote/grade, required factual gates, retrieval.
    rows = [
      ('低降钙素原不能单独否定肺炎初始抗菌治疗评估', '社区获得性肺炎', 'cap',
       '成人临床及影像支持社区获得性肺炎，初始降钙素原较低。',
       '临床症状、影像、降钙素原采样时点、严重程度、免疫状态及用药风险。',
       '指南支持临床及影像确证CAP的成人初始经验性抗菌治疗，不因初始降钙素原低而单独放弃；由临床团队综合评估。',
       '不能用于仅咳嗽或无影像依据者；不生成处方、药物剂量或停药指令。',
       'G15', 'Question 5 > Recommendation',
       'We recommend that empiric antibiotic therapy should be initiated in adults with clinically suspected and radiographically confirmed CAP regardless of initial serum procalcitonin level',
       '原文：strong recommendation, moderate quality of evidence',
       [(r'影像.*(?:浸润|肺炎)|胸片.*(?:浸润|肺炎)|CT.*(?:浸润|肺炎)', '影像是否支持当前肺炎？'), (r'降钙素原低|PCT低|低PCT', '是否已取得初始低降钙素原结果并核实采样时间？')], [r'肺炎|降钙素原|PCT']),
      ('肺炎流感阳性仍要评估细菌共感染', '社区获得性肺炎', 'cap',
       '成人有临床及影像CAP证据，同时流感检测阳性。',
       '影像、流感检测、病程、严重程度、细菌学线索和既往用药。',
       '该版指南支持有CAP证据且流感阳性者初始标准抗菌治疗评估；流感阳性不能独自排除细菌共感染。后续调整须重评证据。',
       '不适用于只有流感、无肺炎证据者；不把阳性病原当成所有症状的唯一解释。',
       'G15', 'Question 14 > Recommendation',
       'We recommend that standard antibacterial treatment be initially prescribed for adults with clinical and radiographic evidence of CAP who test positive for influenza in the inpatient and outpatient settings',
       '原文：strong recommendation, low quality of evidence',
       [(r'影像.*(?:浸润|肺炎)|胸片.*(?:浸润|肺炎)|CT.*(?:浸润|肺炎)', '影像是否支持当前肺炎？'), (r'流感.{0,8}阳性', '是否确认本次流感检测阳性？')], [r'肺炎|流感']),
      ('肺炎治疗迟迟未稳定时重查并发症和替代病因', '社区获得性肺炎', 'cap',
       '成人CAP治疗到第5日仍未达到临床稳定，或治疗过程中病情恶化。',
       '治疗天数、体温、呼吸循环、氧合、进食、意识、依从性、病原及影像变化。',
       '证据讨论提示治疗5日仍未稳定应重评耐药病原、脓胸或肺脓肿及其他感染或炎症来源；恶化者应更早升级，不能等到第5天。',
       '引用的是证据讨论段落；不是自动延长或扩大抗菌药范围的规则。',
       'G15', 'Question 15 > Summary of the evidence',
       'Such failure should prompt assessment for a pathogen resistant to the current therapy and/or complications of pneumonia (e.g., empyema or lung abscess) or for an alternative source of infection and/or inflammatory response',
       '证据讨论段落；本段未单列推荐等级',
       [(r'第5[天日].*(?:仍|持续)|治疗5[天日].*(?:仍|持续)|病情恶化', '是否治疗至第5日仍未稳定，或更早出现病情恶化？')], [r'肺炎|治疗无效|仍发热']),
      ('疑误吸肺炎不自动叠加厌氧覆盖', '社区获得性肺炎', 'cap',
       '成人住院CAP背景下疑误吸肺炎，考虑额外厌氧覆盖。',
       '误吸过程、影像、住院状态、有无肺脓肿或脓胸、当前治疗及严重程度。',
       '该版指南不支持疑误吸肺炎常规额外叠加厌氧覆盖；需先核实是否疑肺脓肿或脓胸等例外。',
       '限定成人住院CAP情境，不适用于所有误吸或化学性肺损伤；有疑似脓肿或脓胸时本卡常规分支不适用。',
       'G15', 'Question 10 > Recommendation',
       'We suggest not routinely adding anaerobic coverage for suspected aspiration pneumonia unless lung abscess or empyema is suspected',
       '原文：conditional recommendation, very low quality of evidence',
       [(r'住院', '是否为住院治疗情境？'), (r'误吸|吸入性肺炎', '是否存在疑误吸相关肺炎的评估？')], [r'肺炎|误吸|厌氧']),
      ('脓毒症筛查不能仅凭qSOFA', '脓毒症', 'sepsis',
       '成人疑脓毒症，试图仅凭qSOFA分值排除风险。',
       '感染依据、生命体征、意识、器官功能、趋势及所用筛查工具。',
       '指南反对把qSOFA作为唯一脓毒症筛查工具；结合完整评估和机构筛查流程，低分不能独自排除。',
       '筛查不等于诊断；疑脓毒症并有急性恶化时立即升级，不能等问答完成。',
       'G16', 'Screening for patients with sepsis and septic shock > Recommendation 2',
       'We recommend against using qSOFA compared to SIRS, NEWS, or MEWS as a single screening tool for sepsis or septic shock',
       '原文：strong recommendation, moderate-quality evidence',
       [(r'qSOFA', '是否正在使用qSOFA进行本次风险筛查？')], [r'qSOFA|脓毒症']),
      ('脓毒症乳酸升高仍需核对其他原因', '脓毒症', 'sepsis',
       '成人疑脓毒症急性复苏中发现乳酸升高。',
       '乳酸趋势、灌注、采样条件、肝功能、药物及其他可致乳酸升高的原因。',
       '复苏中乳酸应结合临床背景及其他升高原因解释；不能仅凭乳酸高就持续追加液体或认定休克病因。',
       '本条为指南备注，不产生固定阈值、补液量或自动处理。',
       'G16', 'Initial resuscitation > Recommendation 7 > Remarks',
       'During acute resuscitation, serum lactate level should be interpreted considering the clinical context and other causes of elevated lactate',
       '原文备注；未单列推荐等级',
       [(r'急性复苏|正在复苏|液体复苏', '是否处于本次急性复苏评估？'), (r'乳酸升高|乳酸高', '是否已核实本次乳酸升高及其变化？')], [r'乳酸|脓毒症']),
      ('脓毒症补液要动态评价反应与负荷', '脓毒症', 'sepsis',
       '成人脓毒症液体复苏评估，考虑继续补液。',
       '已给液体、动态反应评估、循环灌注、呼吸氧合及心肾共病。',
       '指南倾向使用动态指标指导液体复苏，而非仅凭查体或静态参数；继续处理应结合反应与容量负荷风险。',
       '动态测试由专业团队判断实施；不自动下达补液量、速度或操作指令。',
       'G16', 'Initial resuscitation > Recommendation 6',
       'For adults with sepsis or septic shock, we suggest using dynamic measures to guide fluid resuscitation, over physical examination or static parameters alone',
       '原文：weak recommendation, very low-quality evidence',
       [(r'液体复苏|补液评估|继续补液', '是否正在评估本次液体复苏及继续补液的必要性？')], [r'脓毒症|液体复苏']),
      ('疑脓毒症感染尚未证实时持续重评替代病因', '脓毒症', 'sepsis',
       '成人疑脓毒症但感染尚未证实。',
       '感染病灶与病原学、器官功能、当前治疗及非感染性替代病因。',
       '持续重评并寻找替代诊断；若证实或高度怀疑其他病因，指南支持由临床团队重新评估并停止不适当的经验性抗菌治疗。',
       '不能因为单次培养阴性就自行停药；紧急复苏与重评同时进行。',
       'G16', 'Infection > Diagnosis of infection > Recommendation 11',
       'For adults with suspected sepsis or septic shock but unconfirmed infection, we recommend continuously re-evaluating and searching for alternative diagnoses and discontinuing empiric antimicrobials if an alternative cause of illness is demonstrated or strongly suspected',
       '原文：Best Practice Statement',
       [(r'感染尚未证实|感染证据不足|感染待确认', '是否感染仍待确认，而非已经证实？')], [r'脓毒症|感染证据不足']),
      ('严重过敏可以没有皮肤表现', '严重过敏反应', 'anaphylaxis',
       '成人疑严重全身过敏反应，皮肤表现不明显，但有呼吸或循环受累线索。',
       '暴露与发病时间、皮肤黏膜、呼吸道、循环及其他可能病因。',
       'WAO说明严重过敏可无皮肤表现；需结合急性发作及气道、呼吸、循环等表现评估，不能因无皮疹排除。',
       '本程序不能据症状自动确诊；当前疑有严重过敏应及时启动现场急救评估。',
       'G17', 'Definition and clinical diagnostic criteria for anaphylaxis',
       'Anaphylaxis may occur in the absence of skin involvement or cardiovascular shock',
       '定义及识别说明；本句未单列推荐等级',
       [(r'急性发作|暴露后急起', '是否为暴露相关或当前急性发作？'), (r'呼吸受累|循环受累|严重呼吸困难|低血压', '是否已有呼吸或循环受累线索？')], [r'严重过敏|过敏性休克|无皮疹']),
      ('抗组胺不能替代严重过敏紧急一线处理', '严重过敏反应', 'anaphylaxis',
       '成人疑严重全身过敏反应，正在考虑依赖抗组胺药。',
       '暴露时间、气道呼吸循环、已用药及反应、现场救治能力。',
       'WAO指出H1抗组胺药在严重过敏中作用有限；不得因此延误肾上腺素等由专业团队实施的一线紧急处理。',
       '不提供自行注射剂量或操作参数；联系现场救治团队或急诊。',
       'G17', 'Acute treatment of anaphylaxis > antihistamines paragraph',
       'The use of H1-antihistamines has a limited role in treatment of anaphylaxis',
       '急性处理指导段落；本句未单列推荐等级',
       [(r'抗组胺|抗过敏药', '是否正在使用或拟依赖抗组胺类药物处理本次反应？')], [r'严重过敏|抗组胺']),
      ('严重过敏持续喘息不能只用吸入支气管扩张剂', '严重过敏反应', 'anaphylaxis',
       '成人严重全身过敏反应，吸入或雾化支气管扩张剂后症状持续。',
       '当前呼吸循环、已给予的一线处理、吸入治疗及反应。',
       '吸入或雾化支气管扩张剂不能替代持续严重过敏症状所需的肾上腺素紧急处理；应立即交专业团队重评。',
       '不能把所有喘息当作严重过敏；此卡不提供剂量、重复间隔或操作参数。',
       'G17', 'Acute treatment of anaphylaxis > inhaled bronchodilators paragraph',
       'Note, however, that bronchodilators given by inhalation or nebulization are not an alternative to the repeated administration of intramuscular epinephrine (adrenaline) in the presence of ongoing symptoms.',
       '急性处理指导段落；本句未单列推荐等级',
       [(r'吸入支气管扩张剂|雾化支气管扩张剂', '是否已给予吸入或雾化支气管扩张剂？'), (r'症状持续|仍喘息', '是否当前症状仍持续？')], [r'严重过敏|雾化']),
      ('严重过敏缓解后仍需评估观察而非直接离院', '严重过敏反应', 'anaphylaxis',
       '成人严重过敏急性处置后进入观察阶段，尤其反应严重或曾需多次肾上腺素。',
       '本次反应严重程度、已用药次数、缓解情况、复发风险及随访条件。',
       'WAO要求严重过敏后观察，尤其严重反应或多次肾上腺素者；由临床团队决定观察安排。',
       '原文未给统一观察时长，不编造固定出院倒计时；症状复发立即升级。',
       'G17', 'Acute treatment of anaphylaxis > observation paragraph',
       'Patients with anaphylaxis need to be observed: this is important especially in severe reactions and those requiring multiple doses of epinephrine.',
       '观察指导段落；本句未单列推荐等级',
       [(r'处置后观察|缓解后观察|观察阶段', '是否为本次急性反应处置后的观察阶段？')], [r'严重过敏|过敏.*观察']),
      ('首份心电图无缺血改变不能排除ACS', '急性胸痛', 'acs_evaluation',
       '成人急诊急性胸痛疑ACS，首份心电图未显示缺血改变。',
       '发病时间、症状趋势、首份及既往心电图、肌钙蛋白时点、风险和替代病因。',
       'ACC专家共识说明无缺血性改变并不足以排除ACS；需按完整胸痛路径继续评估。',
       '不是正常心电图即可离院的规则；持续胸痛伴冷汗、晕厥等立即升级。',
       'G18', 'Initial Evaluation: Focus on ECG > Initial ECG Interpretation',
       'The absence of ischemic ECG changes identifies patients at relatively lower (although not necessarily low) risk for MI and ischemic complications but is not sufficient for excluding ACS',
       '专家共识说明；本句未单列推荐等级',
       [(r'急诊', '是否为当前急诊评估？'), (r'急性胸痛', '是否为本次急性胸痛？'), (r'首份心电图正常|首份心电图无缺血|非缺血性心电图', '是否已核对本次首份心电图未见缺血改变？')], [r'胸痛|心电图']),
      ('高度疑ACS而心电图不确切时考虑动态复查', '急性胸痛', 'acs_evaluation',
       '成人急诊急性胸痛高度疑ACS，初次心电图仍不能明确。',
       '当前症状、首份及既往心电图、动态变化、肌钙蛋白与专家判读意见。',
       'ACC专家共识提示高度怀疑ACS时序贯心电图可发现动态缺血变化；需由急诊团队结合病情和专家判读安排。',
       '不编造固定复查间隔；不能等待多轮追问后才升级高风险胸痛。',
       'G18', 'Initial Evaluation: Focus on ECG > Initial ECG Interpretation',
       'Serial ECGs performed over short time intervals in those with a high suspicion for ACS may detect dynamic ischemic changes.',
       '专家共识说明；本句未单列推荐等级',
       [(r'急诊', '是否为当前急诊评估？'), (r'急性胸痛', '是否为本次急性胸痛？'), (r'心电图不确切|心电图待判读', '是否初次心电图尚不能明确，需要专业判读？')], [r'胸痛|动态心电图']),
      ('肌钙蛋白升高不自动等于1型心肌梗死', '急性胸痛', 'acs_evaluation',
       '成人急诊疑ACS评估中肌钙蛋白升高，需要鉴别心肌损伤与心肌梗死。',
       '肌钙蛋白动态变化、缺血症状和心电图、影像，以及供需失衡与其他损伤原因。',
       '先判断急性或慢性心肌损伤，再结合心肌缺血证据判断是否为心梗及其类型；不能凭单次升高自动定为1型心梗。',
       '由专业人员判定诊断与处置；肾功能异常等共病不能被忽略，也不能据此否定紧急风险。',
       'G18', 'Classification, Evaluation, and Management of Myocardial Injury',
       'According to the Universal Definition of MI, diagnosis requires both acute myocardial injury and the presence of myocardial ischemia',
       '专家共识说明；本句未单列推荐等级',
       [(r'急诊', '是否为当前急诊评估？'), (r'肌钙蛋白升高|肌钙蛋白阳性', '是否已取得本次肌钙蛋白升高结果及动态资料？')], [r'胸痛|肌钙蛋白']),
      ('早期胸痛单次低肌钙蛋白不能脱离完整路径解释', '急性胸痛', 'acs_evaluation',
       '成人急诊急性胸痛疑ACS，单次高敏肌钙蛋白较低，症状时间等条件仍需核实。',
       '症状起始及采血时间、是否高敏试剂、具体检测方法、心电图和完整分层路径。',
       '共识的单次采血排除路径有症状持续时间、检测方法、极低结果和非缺血性心电图等前提；低结果本身不能自动放行，应核对完整路径。',
       '不输出自动排除阈值或放行结论；早期就诊及条件不全者须专业重评。',
       'G18', 'CDPs Using Hs-cTn Assays > Ruling Out MI With a Single Blood Draw at the Time of Presentation (0-Hour Rule Out)',
       'Increased sensitivity allows exclusion of even minor cTn elevations, permitting rule out of MI with a single blood draw when the hs-cTn value is very low and symptoms have been present for 3 hours or more.',
       '专家共识路径说明；引文本身不是完整的排除条件，未单列推荐等级',
       [(r'急诊', '是否为当前急诊评估？'), (r'急性胸痛', '是否为本次急性胸痛？'), (r'单次高敏肌钙蛋白低|单次hs-cTn低', '是否仅取得单次高敏肌钙蛋白较低的结果？')], [r'胸痛|肌钙蛋白']),
    ]
    for number, row in enumerate(rows, 56):
        title, topic, bg, trigger, collect, action, boundary, sid, locator, quote, grade, gates, retrieval = row
        source = next(s for s in data['sources'] if s['id'] == sid)
        snapshot = (OUT / source['evidence_snapshot']).read_text(encoding='utf8')
        assert ' '.join(quote.split()) in ' '.join(snapshot.split()), (number, quote)
        cid = f'K{number}'
        label = '专家共识原文' if sid == 'G18' else '指导文件原文' if sid == 'G17' else '指南原文推荐'
        if number in (58, 61):
            label = '指南原文证据讨论' if number == 58 else '指南原文备注'
        data['cards'].append(dict(id=cid, title=title, topic=topic, roles=['临床', '护理'],
            trigger=trigger, collect=collect, action=action, boundary=boundary,
            evidence=[dict(source_id=sid, locator=locator, quote=quote, grade=grade, quote_label=label)],
            status='原文引文已核对；教学转述尚未临床专家审定',
            interpretation='整理者教学转述，非指南或专家共识原句', question_ids=[], case_ids=[], node_ids=[],
            association_status='疾病与情境检索候选，尚未逐题逐病例审定；不能据此认定适用或覆盖'))
        excludes = []
        if bg == 'cap':
            # Symptoms recall a candidate only; diagnosis and imaging gates
            # still stay unknown until actual case facts establish them.
            retrieval = retrieval + [r'咳嗽.*发热|发热.*咳嗽|黄.{0,2}痰|肺.{0,10}(?:实变|浸润)']
            excludes = [dict(pattern=p, question=q) for p, q in [
                (r'院内肺炎|医院获得性肺炎|呼吸机相关肺炎', '是否存在院内或呼吸机相关肺炎？'),
                (r'免疫抑制|免疫功能低下', '是否存在超出本指南范围的免疫抑制状态？')]]
            if number == 59:
                excludes.append(dict(pattern=r'肺脓肿|脓胸', question='是否存在疑似或已证实肺脓肿、脓胸？'))
        if bg == 'acs_evaluation':
            retrieval = retrieval + [r'胸闷|胸骨后.{0,12}(?:压榨|疼痛|闷痛)']
            excludes = [dict(pattern=r'胸痛明确由其他病因引起|胸痛确认为非心源性', question='是否已经确认其他病因为本次胸痛的原因？')]
        if bg == 'cap':
            gates = [(p.replace('CT.*', r'胸部\s*X\s*线.*(?:浸润|肺炎)|CT.*'), q) for p, q in gates]
        rules['cards'][cid] = dict(backgrounds=[bg], min_age=18,
            requires=[dict(pattern=p, question=q) for p, q in gates], excludes=excludes, retrieval=retrieval)
    # Manually checked candidate indexes: never link pathology questions merely
    # because their stem contains 'pneumonia', nor allergy history to acute rescue.
    curated_cases = {'CL-O1': ['K68', 'K69', 'K70', 'K71'],
                     'CL1': ['K68', 'K69', 'K70', 'K71'],
                     'IM-O2': ['K56', 'K57', 'K58', 'K59'],
                     'CL2': ['K60', 'K61', 'K62', 'K63']}
    for row in data['case_associations']:
        if row['case_id'] in curated_cases:
            ids = curated_cases[row['case_id']]
            row['links'].append(dict(group='v31_curated_candidate', matched_term=row['disease_label'], card_ids=ids,
                condition='仅主题及具体情境候选；必须逐项核对成人、疾病背景、触发及排除条件；不代表病例覆盖'))
            row['status'] = '部分分支候选参考，不代表病例覆盖或审定适用'
            for card in data['cards']:
                if card['id'] in ids:
                    card['case_ids'].append(row['case_id'])
    question = next(row for row in data['question_associations'] if row['question_id'] == 'Q-CM-303')
    question['links'].append(dict(group='v31_ecg_early_biomarker', matched_term='首次心电图及早期心肌损伤标志物',
        card_ids=['K68', 'K71'], condition='仅对应早期胸痛排除条件的候选；肌钙蛋白是否高敏、症状及采血时间等仍需核实'))
    question['status'] = '具体分支候选参考，不等同于题目答案或已审定适用'
    for card in data['cards']:
        if card['id'] in {'K68', 'K71'}:
            card['question_ids'].append('Q-CM-303')
            if question.get('node_id'):
                card['node_ids'].append(question['node_id'])
    data.update(name='知护题库关联经验库 v3.1', version='3.1', checked_on='2026-11-14',
        card_count=len(data['cards']), source_count=len(data['sources']),
        expansion_note='在v3.0基础上新增16张肺炎、脓毒症、严重过敏、急性胸痛情境卡；对应4份全文来源。保留原候选关联，补充4例病例与1道题的候选索引，其他新增卡依疾病与可见情境检索，尚未逐题逐病例审定。',
        inventory={'status': '旧版盘点已归档，不代表当前运行池覆盖率；见v3.1本轮运行池候选盘点'},
        prior_inventory=data.get('inventory'))
    # Explicitly retain gaps instead of silently inheriting outdated coverage claims.
    data['topic_gaps_v31'] = ['儿童发热与脱水', '标本质量与危急值', '交叉配血操作', '压力性损伤', '中医药与针灸安全', '非卒中康复', '其余无已核实卡片的病例主题']
    for key in ('topic_gaps', 'resource_comparison', 'input_manifest'):
        data['prior_v30_' + key] = data.pop(key)
    data['topic_gaps'] = [{'label': label, 'status': '尚需核验相应原文；不能强套相近卡片'} for label in data['topic_gaps_v31']]
    data['integration'] = '作为可更新独立资源接入当前源码；未发布或部署本轮改动；不参与评分'
    data['scope_note'] = [
        'v3.0原55卡及来源核验范围原样保留，原有题号/病例号索引只是候选。',
        '新增4份全文的16条相关引文，经逐条定位核对；不等于全文所有推荐均已审核。',
        '新增来源版本分别为2019、2021、2020和2022，未系统核查后续版本，不标记为最新。',
        '急性胸痛依据为ACC专家共识，按专家共识原文展示；教学转述与原文分别呈现。',
        '尚未临床专家审定，不用于自动诊断、自动处方、执行或改变评分；没有可靠匹配时明确反馈。',
        '当前运行池候选盘点另见经验库接入验证报告；候选召回及条件符合都不等于病例覆盖。',
    ]
    for item in data['exclusions']:
        if item['item'] == '旧版脓毒症建议':
            item['reason'] = '本版已取得2021版全文并按原版本收录4卡；未核实后续版本推荐，不把2021版标为最新指南。'
    data['input_manifest'] = [{'path': s['evidence_snapshot'], 'source_id': s['id'],
                               'sha256': s['snapshot_sha256']} for s in data['sources']]
    (OUT / '知护题库关联经验库_v3.1.json').write_text(json.dumps(data, ensure_ascii=False, indent=2), encoding='utf8')
    RULES.write_text(json.dumps(rules, ensure_ascii=False, indent=2) + '\n', encoding='utf8')
    print(json.dumps({'cards': data['card_count'], 'sources': data['source_count'], 'new_cards': len(rows)}, ensure_ascii=False))


if __name__ == '__main__':
    build()
