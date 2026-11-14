// Exercises real UI handlers with an offline DOM stub; no browser/visual claim.
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const nodes = new Map();
const collectionButtons = new Map();
let experienceContext;
function element() {
  return {
    innerHTML: '', textContent: '', value: '', dataset: {}, style: {}, hidden: false, disabled: false,
    classList: { toggle() {}, add() {}, remove() {} },
    events: {}, addEventListener(k, fn) { this.events[k] = fn; },
    querySelectorAll(selector) { return collectionButtons.get(selector) || []; }, querySelector() { return null; },
    insertBefore() {}, setAttribute() {}, focus() {},
    insertAdjacentHTML(_, html) { this.innerHTML += html; },
  };
}
const steps = ['welcome', 'major', 'pretest', 'explain', 'case', 'dialogue', 'review'].map(id => {
  const node = element(), number = element();
  node.dataset.s = id;
  node.querySelector = selector => selector === '.k' ? number : null;
  return node;
});
const visibleSteps = () => steps.filter(node => node.style.display !== 'none').map(node => node.dataset.s);
const document = {
  getElementById(id) { if (!nodes.has(id)) nodes.set(id, element()); return nodes.get(id); },
  querySelectorAll(selector) { return selector === '.step' ? steps : []; }, querySelector() { return null; },
  createElement: element, addEventListener() {},
};
let saved = null;
const localStorage = { getItem: () => saved, setItem: (_, v) => { saved = v; } };
const sandbox = {
  window: { __SELFTEST__: true, __LOCAL_ONLY__: true, localStorage,
    ZH_EXPERIENCE: { init(ctx) { experienceContext = ctx; }, mount() { return { refresh() {} }; } } }, document,
  fetch: async () => { throw new Error('offline'); },
  console, setTimeout, clearTimeout,
};
for (const name of ['data.js', 'engine.js', 'store.js', 'app.js']) {
  vm.runInNewContext(fs.readFileSync(__dirname + '/' + name, 'utf8'), sandbox, { filename: name });
}
const ui = sandbox.window.__ZH_DEBUG;
const engine = sandbox.window.ZHIHU;
const store = sandbox.window.ZH_STORE;
sandbox.ZH_STORE = store; // Browser window properties are also global bindings.
(async () => {
  ui.state.major = 'clinical_medicine';
  ui.goLearningChoice();
  const choices = document.getElementById('app').innerHTML;
  for (const id of ['choose-quiz', 'choose-case', 'choose-complete']) assert(choices.includes(id));
  await document.getElementById('choose-quiz').onclick();
  assert.equal(ui.state.learningPath, 'quiz');
  assert.equal(ui.state.pretestIds.length, 20);
  assert.equal(new Set(ui.state.pretestIds).size, 20);
  assert.equal(ui.state.experienceAssessmentActive, true);
  assert(document.getElementById('pretest-lead').innerHTML.includes('20 道题'));
  assert.deepEqual(visibleSteps(), ['welcome', 'major', 'pretest', 'explain']);
  for (const level of ['basic', 'intermediate', 'advanced', 'expert']) {
    const paper = engine.buildPaper('clinical_medicine', level, null, 20);
    assert.equal(paper.length, 20);
    const attempt = engine.randomizePaper(paper, 'learning-mode-test');
    const answers = {};
    for (const q of paper) answers[q.question_id] = Object.entries(attempt.optionMaps[q.question_id])
      .filter(([, stable]) => q.answer.includes(stable)).map(([display]) => display).sort().join('');
    const result = engine.checkPretest({ answers }, 'clinical_medicine', level, paper.map(q => q.question_id), attempt.optionMaps);
    assert.equal(result.detail.length, 20);
    assert.equal(result.percentage, 100);
  }
  await ui.startLearningPath('complete');
  assert.equal(ui.state.learningPath, 'complete');
  assert.equal(ui.state.pretestIds.length, 5);
  assert.equal(visibleSteps().length, 7);
  // Changing route clears prior quiz results; direct practice stays random.
  ui.state.pretest = { source: 'mcp', score: 1 };
  await ui.startLearningPath('case');
  assert.equal(ui.state.pretest, null);
  assert.equal(ui.state.experienceAssessmentActive, false);
  assert(document.getElementById('app').innerHTML.includes('选择病例'));
  assert.deepEqual(visibleSteps(), ['welcome', 'major', 'case', 'dialogue', 'review']);
  ui.state.major = 'nursing';
  await ui.startLearningPath('quiz');
  assert.equal(ui.state.pretestIds.length, 7);
  assert(document.getElementById('pretest-lead').innerHTML.includes('不足 20'));
  assert.equal(engine.buildPaper('clinical_medicine', 'english', null, 20).length, 8);
  // Stored 5-question results remain comparable with a new 20-question paper.
  const rows = (n, right) => Array.from({ length: n }, (_, i) => ({ question_id: 'T' + i, node_id: 'test', correct: i < right }));
  store.recordPretest('clinical_medicine', 'basic', rows(5, 4));
  store.recordPretest('clinical_medicine', 'basic', rows(20, 12));
  assert.equal(store.summary('clinical_medicine').levels.basic.best_pct, 80);
  store.recordPretest('clinical_medicine', 'basic', rows(20, 18));
  assert.equal(store.summary('clinical_medicine').levels.basic.best_pct, 90);
  ui.state.pretestDetail = [];
  ui.renderGraded();
  assert(document.getElementById('app').innerHTML.includes('无需进入病例训练'));
  assert(document.getElementById('app').innerHTML.includes('返回选择学习方式'));
  // Real submit/review/switch handlers: finishing a quiz must not start case practice.
  ui.state.major = 'clinical_medicine';
  await ui.startLearningPath('quiz');
  const quizSession = ui.state.sessionId;
  await document.getElementById('btn-submit').events.click();
  const quizResult = ui.state.pretest, quizDetail = ui.state.pretestDetail;
  assert.equal(quizDetail.length, 20);
  assert.equal(ui.state.learningPath, 'quiz');
  assert.equal(ui.state.currentCase, null);
  assert(document.getElementById('app').innerHTML.includes('专项答题 · 本轮已完成'));
  assert(document.getElementById('app').innerHTML.includes('切换到错题病例训练'));
  document.getElementById('btn-to-explain').events.click();
  let html = document.getElementById('app').innerHTML;
  assert(html.includes('专项答题 · 考点复习'));
  assert(html.includes('class="btn block" id="btn-explain-finish"'));
  assert(html.includes('class="btn ghost block" id="btn-go-case"'));
  assert(!html.includes('下一步：进入病例训练'));
  document.getElementById('btn-explain-finish').events.click();
  assert(document.getElementById('app').innerHTML.includes('选择学习方式'));
  assert.equal(ui.state.learningPath, 'quiz');
  // End does not erase results; switching from either review screen preserves wrong questions.
  ui.renderGraded();
  await document.getElementById('btn-graded-case').events.click();
  assert.equal(ui.state.learningPath, 'case');
  assert.equal(ui.state.sessionId, quizSession);
  assert.equal(ui.state.pretest, quizResult);
  assert.equal(ui.state.pretestDetail, quizDetail);
  assert.deepEqual(visibleSteps(), ['welcome', 'major', 'case', 'dialogue', 'review']);
  assert(document.getElementById('app').innerHTML.includes('选择病例'));
  ui.state.learningPath = 'quiz';
  ui.renderGraded();
  document.getElementById('btn-to-explain').events.click();
  await document.getElementById('btn-go-case').events.click();
  assert.equal(ui.state.learningPath, 'case');
  assert.equal(ui.state.pretest, quizResult);
  // Choosing direct practice starts fresh, in contrast to the explicit wrong-question switch.
  await ui.startLearningPath('case');
  assert.equal(ui.state.pretest, null);
  assert.equal(ui.state.pretestDetail, null);
  // The full route retains the five-question diagnostic paper and guided case continuation.
  await ui.startLearningPath('complete');
  await document.getElementById('btn-submit').events.click();
  assert.equal(ui.state.pretestDetail.length, 5);
  document.getElementById('btn-to-explain').events.click();
  html = document.getElementById('app').innerHTML;
  assert(html.includes('class="btn block" id="btn-go-case">下一步：进入病例训练'));
  assert(!html.includes('id="btn-explain-finish"'));
  await document.getElementById('btn-go-case').events.click();
  assert.equal(ui.state.learningPath, 'complete');
  assert.equal(visibleSteps().length, 7);
  // All-correct quiz switches honestly offer random practice, not wrong-question targeting.
  ui.state.learningPath = 'quiz';
  ui.state.pretestDetail = quizDetail.map(row => ({ ...row, correct: true }));
  ui.renderGraded();
  assert(document.getElementById('app').innerHTML.includes('本轮没有错题，将随机推荐病例'));
  assert(!document.getElementById('app').innerHTML.includes('切换到错题病例训练'));
  // Sidebar switches during an unfinished quiz start a fresh case session.
  await ui.startLearningPath('quiz');
  // A previous completed result must not be reused while a new paper is still open.
  ui.state.pretest = quizResult;
  ui.state.pretestDetail = quizDetail;
  await document.getElementById('module-nav').events.click({ target: { closest: () => ({ dataset: {m: 'cases'} }) }, preventDefault() {} });
  // The navigation handler starts an async transition; wait for its pending tool fallback.
  await new Promise(resolve => setTimeout(resolve, 0));
  assert.equal(ui.state.learningPath, 'case');
  assert.equal(ui.state.pretest, null);
  assert.equal(ui.state.pretestDetail, null);
  assert.equal(ui.state.experienceAssessmentActive, false);
  // Actual page and dialogue handlers connect the optional companion to saved replies.
  const panels = [], calls = [];
  sandbox.window.ZH_EXPERIENCE = { mount(host, options) {
    const panel = { host, options, refreshes: 0, refresh() { this.refreshes += 1; } };
    panels.push(panel); return panel;
  } };
  let finishSave;
  sandbox.fetch = async (_, init) => {
    const request = JSON.parse(init.body); calls.push(request);
    if (request.tool === 'append_exchange') return new Promise(resolve => {
      finishSave = () => resolve({ ok: true, json: async () => ({status: 'ok', result: {student_record: {turn_id: 2}}}) });
    });
    return { ok: true, json: async () => ({status: 'ok', result: request.tool === 'start_session' ? {session_id: 'synthetic-inline', recommended_cases: []} : {}}) };
  };
  await ui.startLearningPath('case');
  ui.loadCase('S1');
  assert.equal(panels.at(-1).host, document.getElementById('case-experience'));
  document.getElementById('learning-mode').onchange({target: {value: 'assessment'}});
  assert.equal(ui.state.learningMode, 'assessment');
  assert.equal(panels.at(-1).refreshes, 1);
  document.getElementById('learning-mode').onchange({target: {value: 'coach'}});
  // Click actual collection handlers: context sends current IDs, not findings,
  // hidden data, or a learner's diagnostic proposal. Revocation is immediate.
  const historyButton = element(), rosButton = element(), examButton = element(), labButton = element();
  historyButton.dataset.h = 'past_history'; rosButton.dataset.ros = '呼吸';
  examButton.dataset.exam = '体温'; labButton.dataset.lab = 'PCT';
  for (const [selector, button] of [['[data-h]', historyButton], ['[data-ros]', rosButton], ['[data-exam]', examButton], ['[data-lab]', labButton]]) collectionButtons.set(selector, [button]);
  ui.goInterview();
  assert.equal(panels.at(-1).host, document.getElementById('interview-experience'));
  for (const button of [historyButton, rosButton, examButton, labButton]) button.events.click();
  const collected = JSON.parse(JSON.stringify(experienceContext().collected));
  assert.deepEqual(collected, {case_id: 'S1', history: ['past_history'], ros: ['呼吸'], exams: ['体温'], labs: ['PCT']});
  labButton.events.click();
  assert.equal(experienceContext().collected.labs.length, 0);
  document.getElementById('btn-reset-collect').events.click();
  assert.equal(experienceContext().collected.history.length, 0);
  assert.equal(experienceContext().collected.exams.length, 0);
  collectionButtons.clear();
  ui.goAnalysis();
  assert.equal(panels.at(-1).host, document.getElementById('analysis-experience'));
  await ui.goDialogue();
  const dialoguePanel = panels.at(-1), input = document.getElementById('chat-input');
  assert.equal(dialoguePanel.host, document.getElementById('dialogue-experience'));
  const turnCount = ui.state.dialogue.length;
  assert.equal(dialoguePanel.options.onQuestion('合成条件追问'), true);
  assert.equal(input.value, '合成条件追问');
  assert.equal(ui.state.dialogue.length, turnCount);
  assert.equal(dialoguePanel.options.onQuestion('另一追问'), false);
  assert.equal(input.value, '合成条件追问');
  await document.getElementById('chat-send').events.click();
  assert(finishSave, 'a real append_exchange request was made');
  assert.equal(dialoguePanel.refreshes, 0, 'unsaved replies must not trigger a recheck');
  finishSave();
  await new Promise(resolve => setImmediate(resolve));
  assert.equal(dialoguePanel.refreshes, 1);
  assert(ui.state.dialogue.some(row => row.mcp_turn_id === 2));
  assert(calls.some(row => row.tool === 'append_exchange' && row.args.student_text === '合成条件追问'));
  document.getElementById('dialogue-learning-mode').onchange({target: {value: 'assessment'}});
  assert.equal(dialoguePanel.refreshes, 2);
  assert.equal(ui.state.learningMode, 'assessment');
  assert(document.getElementById('btn-training-experience').textContent.includes('测评保护'));
  console.log('[OK] Companion integration: case/analysis/dialogue mounts, mode changes, question drafting, saved-reply refresh');
  console.log('[OK] Three distinct routes: 20/5 questions, quiz finish/review, explicit switches preserve wrong answers, fresh random practice, route steps, full guided continuation, all-correct and unfinished-quiz switches, grading/shortage/history');
})().catch(error => { console.error(error); process.exitCode = 1; });
