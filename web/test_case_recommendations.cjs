// Real UI event handlers against a deterministic tool transport; no visual-browser claim.
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const nodes = new Map();
function element() {
  const node = { textContent: '', value: '', dataset: {}, style: {}, hidden: false, disabled: false, _html: '', _queryCache: {},
    classList: { toggle() {}, add() {}, remove() {} }, events: {},
    addEventListener(k, fn) { this.events[k] = fn; },
    querySelectorAll(selector) {
      if (selector === '.q-case-launch') {
        if (!this._queryCache[selector]) this._queryCache[selector] = [...this.innerHTML.matchAll(/<button class="btn ghost sm q-case-launch" data-qid="([^"]+)" data-qcase="([^"]+)"/g)]
          .map(([, qid, variant]) => { const button = element(); button.dataset = { qid, qcase: variant }; return button; });
        return this._queryCache[selector];
      }
      return [];
    }, querySelector() { return null; },
    insertBefore() {}, setAttribute() {} };
  Object.defineProperty(node, 'innerHTML', { get() { return this._html; }, set(value) { this._html = value; this._queryCache = {}; } });
  return node;
}
const document = {
  getElementById(id) { if (!nodes.has(id)) nodes.set(id, element()); return nodes.get(id); },
  querySelectorAll() { return []; }, querySelector() { return null; },
  createElement: element, addEventListener() {}
};
const questions = [
  { question_id: 'Q-WM-26-A-061', stem: '无积液的气胸引流管位置' },
  { question_id: 'Q-WM-25-A-032', stem: '凋亡的形态学特征' },
  { question_id: 'Q-WM-25-A-059', stem: '抗菌药物应用原则' }
].map(q => ({ ...q, options: { A: '选项一', B: '选项二' }, correct: false, correct_answer: 'B', submitted: 'A' }));
const reason = { question_id: questions[2].question_id, kind: 'curated_partial', label: '部分延伸：用药复诊沟通', limitation: '没有覆盖全部停药标准' };
const related = { case_id: 'IM-O2', title: '肺炎用药复诊练习', recommendation_reasons: [reason] };
const general = { case_id: 'CLX004', title: '普通练习病例', recommendation_reasons: [] };
let submitted = false, unavailable = false, noMatch = false, refreshes = 0, submittedReasoning = null;
const sandbox = {
  window: { __SELFTEST__: true, __LOCAL_ONLY__: true }, document, console, setTimeout, clearTimeout,
  async fetch(url, init) {
    if (unavailable) throw new Error('offline');
    const { tool, args } = init ? JSON.parse(init.body) : {};
    let result = {};
    if (tool === 'start_session') {
      if (!args.session_id) submitted = false;
      if (args.new_batch) refreshes++;
      const matches = submitted && !noMatch ? [related] : [];
      result = { session_id: 'ui-test', case_pool_size: 1353, standard_case_pool_size: 48, question_case_pool_size: 1305,
        recommended_cases: matches.concat(general), related_cases: matches, random_cases: [general],
        recommendation_resource_status: 'ready',
        recommendation_audit: submitted ? questions.map((q, i) => ({ question_id: q.question_id, stem: q.stem,
          status: i === 2 && !noMatch ? 'related' : 'unmatched', note: '关联结果',
          candidates: i === 2 && !noMatch ? [{ case_id: 'IM-O2', ...reason }] : [] })) : [] };
    } else if (tool === 'score_session') result = {score_result: {total_score: 0, item_results: [], dimension_scores: {}, caps: [], red_lines: []}};
    else if (tool === 'generate_training_report') { submittedReasoning = args.exam_reasoning; result = {summary: {objective_review: []}}; }
    else if (tool === 'get_pretest') result = { questions, level: 'basic', attempt_id: 'ui-attempt' };
    else if (tool === 'submit_pretest') {
      submitted = true;
      result = { pretest_result: { score: 0, max_score: 3, detail: questions } };
    }
    return { ok: true, json: async () => ({ status: 'ok', result }) };
  }
};
for (const name of ['data.js', 'engine.js', 'app.js']) {
  vm.runInNewContext(fs.readFileSync(__dirname + '/' + name, 'utf8'), sandbox, { filename: name });
}
const ui = sandbox.window.__ZH_DEBUG;
(async () => {
  ui.state.major = 'clinical_medicine';
  await ui.startLearningPath('complete');
  await document.getElementById('btn-submit').events.click();
  await ui.goCases();
  assert(refreshes > 0, 'Submitting must invalidate startup random recommendations');
  const audit = document.getElementById('case-match-audit').innerHTML;
  assert(audit.includes('本次 3 道错题：1 道有关联完整病例，2 道暂无对应完整病例'));
  assert(document.getElementById('cases-lead').innerHTML.includes('病例资源共 <b>1353</b> 例：48 个常规病例、1305 个原题推理练习（非独立病例）'));
  assert(document.getElementById('cases-lead').innerHTML.includes('本轮列出 2 个常规候选和 <b>9</b> 个原题推理选项'));
  for (const q of questions) assert(audit.includes(q.question_id));
  assert.equal((audit.match(/class="btn ghost sm q-case-launch"/g) || []).length, 9,
    'Every wrong question must expose three advanced case reasoning options');
  for (const label of ['综合病例推理', '鉴别诊断与反证', '病情演变与再评估']) assert(audit.includes(label), `Visible option: ${label}`);
  assert(!audit.includes('<details><summary>Q-WM-'), 'Per-question case options must not be hidden in collapsed details');
  const quiz = sandbox.window.ZHIHU_DATA.pretest;
  const questionIndex = new Map(quiz.questions.map(q => [q.question_id, q]));
  const clinicalIds = [...new Set(Object.values(quiz.major_papers.clinical_medicine).flat())];
  assert.equal(clinicalIds.length, 435, 'All active clinical medicine bank questions are included');
  for (const qid of clinicalIds) {
    const question = questionIndex.get(qid);
    assert(question, `Missing source question ${qid}`);
    const choices = ui.questionCaseChoices(question);
    assert.equal(choices.length, 3, `${qid} needs three case reasoning choices`);
    assert.equal(new Set(choices.map(v => v.id)).size, 3, `${qid} case choices must be distinct`);
    assert.equal(new Set(choices.map(v => v.case_id)).size, 3, `${qid} needs three separately identified cases`);
    assert(choices.every(v => v.source_question_id === qid && v.review_status), `${qid} case records need source and review status`);
    assert(choices.every(v => v.stages.length === 3), `${qid} choices need three reasoning stages`);
    const objective = ui.questionObjective(question);
    assert(objective, `${qid} must have an objective matching the actual question text`);
    assert(choices.every(v => v.exam_point === objective.exam_point && v.stages[0] === objective.training_task), `${qid} uses its own task, not a generic subject task`);
  }
  let grid = document.getElementById('case-grid').innerHTML;
  assert(grid.indexOf('data-case="IM-O2"') < grid.indexOf('general-case-practice'));
  assert(grid.indexOf('data-case="CLX004"') > grid.indexOf('general-case-practice'));
  assert(grid.includes('<details id="general-case-practice">'), 'Random cases start collapsed');
  assert(grid.includes('没有覆盖全部停药标准'));
  ui.state.caseScene = '门诊';
  await ui.goCases();
  assert(document.getElementById('case-grid').innerHTML.includes('data-case="IM-O2"'), 'Scene filters preserve the adaptive candidate');
  ui.state.caseScene = 'default';
  noMatch = true;
  await ui.goCases(true);
  grid = document.getElementById('case-grid').innerHTML;
  assert(grid.includes('本次错题暂无对应病例'));
  assert(!grid.includes('data-case="IM-O2"'));
  unavailable = true;
  await ui.goCases(true);
  assert(document.getElementById('cases-lead').innerHTML.includes('常规病例推荐服务不可用'));
  assert(document.getElementById('case-grid').innerHTML.includes('错题推荐暂不可用'));
  assert.equal((document.getElementById('case-match-audit').innerHTML.match(/class="btn ghost sm q-case-launch"/g) || []).length, 9,
    'Question-driven case drills remain available when full-case recommendation service is offline');
  const offlineButton = document.getElementById('case-match-audit').querySelectorAll('.q-case-launch')[0];
  assert(offlineButton.events.click, 'Visible case option must be actionable when matching service is offline');
  offlineButton.events.click();
  assert(document.getElementById('app').innerHTML.includes('综合病例推理'));
  assert(document.getElementById('app').innerHTML.includes('Q-WM-26-A-061'));
  assert(document.getElementById('app').innerHTML.includes('CMQ-Q-WM-26-A-061-01'));
  unavailable = false;
  const pathologyRow = { question_id: 'Q-WM-25-A-032', subject: 'pathology', node_id: 'wm_pathology_2025_032',
    stem: '凋亡的形态学特征', answer: 'A', options: { A: '细胞固缩、细胞膜完整', B: '细胞肿胀、细胞膜破裂' },
    explanation: '凋亡时细胞固缩、细胞膜保持完整。', source: '题库维护记录' };
  const variants = ui.questionCaseChoices(pathologyRow);
  assert.equal(variants.length, 3);
  assert(variants[2].label.includes('机制'));
  ui.renderQuestionCaseTraining(pathologyRow, variants[1]);
  let page = document.getElementById('app').innerHTML;
  assert(page.includes('鉴别与反证'));
  assert(page.includes(variants[1].stages[0]));
  assert(!page.includes('标准答案：A'), 'Reference answer stays behind the exercise submission');
  for (let i = 1; i <= 3; i++) document.getElementById(`qcase-stage-${i}`).value = '依据题干列出证据、解释推理并说明未知条件。';
  let prevented = false;
  await document.getElementById('qcase-form').events.submit({ preventDefault() { prevented = true; } });
  assert(prevented);
  const feedback = document.getElementById('qcase-feedback').innerHTML;
  assert(feedback.includes('标准答案：A'));
  assert(feedback.includes('凋亡时细胞固缩'));
  assert(feedback.includes('题库维护记录'));
  await ui.startLearningPath('case');
  assert.equal(ui.state.pretest, null);
  assert(!document.getElementById('case-grid').innerHTML.includes('本次错题关联病例'));
  // Explicit quiz -> case switches keep the submitted MCP session and its adaptive candidates.
  noMatch = false;
  await ui.startLearningPath('quiz');
  await document.getElementById('btn-submit').events.click();
  const quizResult = ui.state.pretest, quizDetail = ui.state.pretestDetail, quizSession = ui.state.sessionId;
  await document.getElementById('btn-graded-case').events.click();
  assert.equal(ui.state.learningPath, 'case');
  assert.equal(ui.state.pretest, quizResult);
  assert.equal(ui.state.pretestDetail, quizDetail);
  assert.equal(ui.state.sessionId, quizSession);
  assert(submitted, 'Switching must not open a fresh MCP session and lose submitted wrong answers');
  assert(document.getElementById('case-grid').innerHTML.includes('data-case="IM-O2"'));
  // The explanation-page switch uses the same preserved recommendation path.
  ui.state.learningPath = 'quiz';
  ui.renderGraded();
  document.getElementById('btn-to-explain').events.click();
  await document.getElementById('btn-go-case').events.click();
  assert.equal(ui.state.learningPath, 'case');
  assert(submitted);
  assert(document.getElementById('case-grid').innerHTML.includes('data-case="IM-O2"'));
  await ui.startLearningPath('case');
  assert.equal(ui.state.pretest, null);
  assert(!submitted, 'Fresh direct case practice resets the old quiz session');
  assert(!document.getElementById('case-grid').innerHTML.includes('data-case="IM-O2"'));
  const objectives = sandbox.window.ZHIHU_DATA.clinical_objectives.objectives;
  const objective = objectives['Q-CM-101'];
  const realQuestion = questionIndex.get(objective.question_id);
  ui.state.pretest = {percentage: 0, source: 'mcp'};
  ui.state.pretestDetail = [{...realQuestion, correct: false}];
  ui.loadCase(objective.case_ids[0]);
  page = document.getElementById('app').innerHTML;
  assert(page.includes(objective.exam_point));
  assert(page.includes(objective.training_task));
  assert(!page.includes('原题参考（不作为本病例标准答案）'));
  ui.goAnalysis();
  assert(document.getElementById('app').innerHTML.includes('data-objective="Q-CM-101"'));
  const input = document.getElementById('objective-Q-CM-101');
  input.value = '根据公开症状与持续时间书写主诉，检查值不替代主诉。';
  input.events.input();
  assert.equal(ui.state.analysis.examReasoning['Q-CM-101'], input.value);
  await ui.goScoring();
  assert.equal(submittedReasoning['Q-CM-101'], input.value, 'Actual scoring flow must persist the learner reasoning in its report call');
  assert(document.getElementById('app').innerHTML.includes(input.value));
  assert(document.getElementById('app').innerHTML.includes('错题专项推理复盘（不计分）'));
  assert.equal(ui.state.scoreResult.total_score, 0, 'Filling an objective must not grant points');
  ui.loadCase('CL2');
  assert.equal(Object.keys(ui.state.analysis.examReasoning).length, 0, 'Switching case clears written reasoning');
  assert.equal(ui.state.currentCase.learning_objectives.length, 0, 'Unrelated case must not carry the old objective');
  ui.state.experienceAssessmentActive = true;
  ui.renderQuestionCaseTraining(pathologyRow, variants[0]);
  assert(!document.getElementById('app').innerHTML.includes('qcase-form'), 'New unsubmitted quiz blocks question reasoning view');
  const stale = {...realQuestion, stem: 'changed question'};
  assert.equal(ui.questionObjective(stale), null, 'Changed source questions cannot reuse an old objective');
  ui.state.pretest = null; ui.state.experienceAssessmentActive = false;
  ui.loadCase(objective.case_ids[0]);
  assert.equal(ui.state.currentCase.learning_objectives.length, 0, 'Direct practice stays free of old wrong-question targets');
  const kinetics = objectives['Q-WM-26-A-018'];
  ui.state.pretest = {percentage: 0, source: 'mcp'};
  ui.state.pretestDetail = [{...questionIndex.get(kinetics.question_id), correct: false}];
  ui.loadCase(kinetics.case_ids[0]);
  page = document.getElementById('app').innerHTML;
  assert(page.includes(kinetics.training_task), 'The case must exercise the actual wrong question');
  assert(page.includes('独立底物与初速度表'), 'Experimental inputs must be visible before analysis');
  assert(page.includes('98.04') && page.includes('49.02'), 'Render the real high-substrate measurements');
  assert(page.includes('非患者检查'), 'Keep experimental input distinct from clinical observations');
  assert(!page.includes('表观Km为2'), 'Parameter interpretation remains behind the analysis gate');
  ui.state.revealed = [];
  const ruleReply = ui.ruleSP('请说明这些参数怎么测量，再给我教学解释。', {});
  assert(!ruleReply.text.includes('表观Km为2'), 'Generic measurement requests cannot unlock feedback');
  assert(!ruleReply.revealed.some(value => value.includes('表观Km为2')), 'Feedback must not be marked as released either');
  ui.state.casePrivate = {
    hidden_info: [{id: 'H1', value: '问诊后可获得的模拟事实'}, {id: 'H2', value: '必须等分析后的教学答案'}],
    release_conditions: {H1: ['ask_specific_fact'], H2: ['ask_comparison_after_analysis']},
  };
  ui.state.revealed = [];
  const allowedReply = ui.ruleSP('具体有多少次？', {});
  assert(allowedReply.text.includes('问诊后可获得的模拟事实'), 'Ordinary history release still works');
  assert(!ui.ruleSP('请给出规范测量和分析的答案。', {}).revealed.includes('必须等分析后的教学答案'));
  ui.goAnalysis();
  assert(document.getElementById('app').innerHTML.includes('data-objective="Q-WM-26-A-018"'));
  console.log('[OK] Adaptive choices, 435 specific objectives, complete-case task input, report persistence, score isolation, phase protection and direct practice');
})().catch(error => { console.error(error); process.exitCode = 1; });


