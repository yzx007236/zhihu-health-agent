// Real app handlers in an offline DOM harness. This does not verify browser layout.
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const nodes = new Map();
let document;
function element(dataset = {}) {
  const classes = new Set(), attrs = {};
  const node = {
    dataset, style: {}, events: {}, hidden: false, disabled: false, value: '', textContent: '',
    children: [], offsetParent: {},
    classList: {
      add(...names) { names.forEach(x => classes.add(x)); },
      remove(...names) { names.forEach(x => classes.delete(x)); },
      contains(name) { return classes.has(name); },
      toggle(name, force) { const on = force === undefined ? !classes.has(name) : force;
        if (on) classes.add(name); else classes.delete(name); return on; },
    },
    addEventListener(type, fn) {
      const previous = this.events[type];
      this.events[type] = previous ? event => { previous(event); return fn(event); } : fn;
    },
    setAttribute(name, value) { attrs[name] = String(value); },
    getAttribute(name) { return attrs[name]; }, removeAttribute(name) { delete attrs[name]; },
    focus() { document.activeElement = this; }, scrollIntoView() { this.scrolled = true; },
    click() { return this.events.click?.({ target: this, preventDefault() {} }); },
    closest(selector) { return selector === 'a' ? this : null; },
    querySelectorAll(selector) {
      if (selector === '[data-quiz-jump]') return this.children.filter(x => x.dataset.quizJump);
      if (selector.startsWith('.q-opt')) return this.children.filter(x =>
        x.classList.contains('q-opt') && (!selector.includes('.sel') || x.classList.contains('sel')) &&
        (!selector.includes('data-q=') || x.dataset.q === selector.match(/data-q="([^"]+)"/)[1]));
      return [];
    },
    querySelector() { return null; }, insertBefore() {}, insertAdjacentHTML(_, html) { this.html += html; },
  };
  Object.defineProperty(node, 'innerHTML', { get() { return this.html || ''; }, set(html) {
    this.html = html; this.children = [];
    for (const match of html.matchAll(/<button\b([^>]*)>/g)) {
      const child = element();
      for (const attr of match[1].matchAll(/([\w-]+)="([^"]*)"/g)) {
        if (attr[1] === 'class') child.classList.add(...attr[2].split(' '));
        else if (attr[1].startsWith('data-')) child.dataset[attr[1].slice(5).replace(/-([a-z])/g, (_, s) => s.toUpperCase())] = attr[2];
        else child.setAttribute(attr[1], attr[2]);
      }
      this.children.push(child);
    }
  }});
  return node;
}
const pages = ['workbench', 'quiz', 'weak', 'cases', 'analysis', 'dialogue', 'review', 'summary', 'resources'];
const links = pages.map(m => element({ m }));
const mobile = ['workbench', 'quiz', 'cases', 'summary'].map(mobilePage => element({ mobilePage }));
const steps = ['welcome', 'major', 'pretest', 'explain', 'case', 'dialogue', 'review'].map(s => element({ s }));
document = {
  body: element(), events: {}, activeElement: null,
  getElementById(id) { if (!nodes.has(id)) nodes.set(id, element()); return nodes.get(id); },
  querySelectorAll(s) { return s === '#module-nav a' ? links : s === '[data-mobile-page]' ? mobile : s === '.step' ? steps : []; },
  querySelector(s) { const match = s.match(/#module-nav a\[data-m="([^"]+)"\]/); return match ? links.find(x => x.dataset.m === match[1]) : null; },
  createElement: element, addEventListener(type, fn) { this.events[type] = fn; },
};
const get = id => document.getElementById(id);
const sidebar = get('care-sidebar');
sidebar.querySelector = () => links[0]; sidebar.querySelectorAll = () => links;
let small = true;
const screen = { get matches() { return small; }, addEventListener(_, fn) { this.changed = fn; } };
let saved = null, textbookOpens = 0;
const sandbox = { document, console, setTimeout, clearTimeout,
  fetch: async () => { throw Error('offline'); },
  window: { __SELFTEST__: true, __LOCAL_ONLY__: true, matchMedia: () => screen,
    localStorage: { getItem: () => saved, setItem: (_, value) => { saved = value; } },
    ZH_TEXTBOOKS: { open() { textbookOpens++; } },
  },
};
for (const name of ['data.js', 'engine.js', 'store.js', 'app.js'])
  vm.runInNewContext(fs.readFileSync(__dirname + '/' + name, 'utf8'), sandbox, { filename: name });
sandbox.ZH_STORE = sandbox.window.ZH_STORE;
const ui = sandbox.window.__ZH_DEBUG, store = sandbox.window.ZH_STORE;
const nav = m => get('module-nav').events.click({ target: links.find(x => x.dataset.m === m), preventDefault() {} });
const tick = () => new Promise(resolve => setImmediate(resolve));
(async () => {
  assert.equal(document.body.dataset.page, 'workbench');
  assert.equal(document.title, '学习工作台 · 知护');
  // Profession and learning routes occupy separate pages, without resetting training.
  assert(!get('app').innerHTML.includes('<select id="home-major"'));
  assert(!get('app').innerHTML.includes('查看专业说明'));
  assert(!get('app').innerHTML.includes('choose-complete'), 'first page only selects a profession');
  ui.goLearningChoice();
  assert(!get('app').innerHTML.includes('choose-complete'), 'no route page without a profession');
  get('home-major-clinical_medicine').onclick();
  assert(!get('app').innerHTML.includes('profession-grid'), 'second page does not repeat profession choices');
  assert(get('app').innerHTML.includes('choose-complete'));
  assert(get('app').innerHTML.includes('studio-tasks') && get('app').innerHTML.includes('studio-progress'));
  assert(get('app').innerHTML.includes('暂无记录'),'No invented progress for a new profession');
  assert.match(get('app').innerHTML, /当前专业 · 临床医学/);
  assert.equal(document.activeElement, get('learning-choice-title'));
  assert.equal(ui.state.major, null, 'selecting a card must not reset an active training session');
  get('change-profession').onclick();
  assert(!get('app').innerHTML.includes('choose-complete'));
  assert.equal(document.activeElement, get('home-major-clinical_medicine'));
  // The DOM harness does not parse attributes on getElementById nodes.
  assert.match(get('app').innerHTML, /id="home-major-clinical_medicine" aria-pressed="true"/);
  get('home-major-nursing').onclick();
  assert.match(get('app').innerHTML, /当前专业 · 护理学/);
  assert.equal(ui.state.major, null);
  for (const [route, major] of [['quiz', 'clinical_medicine'], ['case', 'nursing'], ['complete', 'clinical_medicine']]) {
    ui.renderWorkbench(); get('home-major-' + major).onclick();
    await get('choose-' + route).onclick();
    assert.equal(ui.state.major, major); assert.equal(ui.state.learningPath, route);
    assert.equal(document.body.dataset.page, route === 'case' ? 'cases' : 'quiz');
  }
  const activeSession = ui.state.sessionId, activeQuestions = ui.state.pretestIds;
  ui.renderWorkbench(); get('home-major-nursing').onclick(); get('change-profession').onclick();
  assert.equal(ui.state.major, 'clinical_medicine');
  assert.equal(ui.state.sessionId, activeSession);
  assert.equal(ui.state.pretestIds, activeQuestions);
  ui.goLearningChoice();
  assert.match(get('app').innerHTML, /当前专业 · 临床医学/);
  await get('choose-complete').onclick();
  assert.equal(get('quiz-progress-text').textContent, '已作答 0 / 5 题');
  assert.equal(get('quiz-progress-fill').style.width, '0%');
  const options = get('quiz').querySelectorAll('.q-opt');
  const first = options[0]; first.click();
  assert.equal(get('quiz-progress-text').textContent, '已作答 1 / 5 题');
  assert.equal(first.getAttribute('aria-pressed'), 'true');
  assert.equal(get('quiz-progress-fill').style.width, '20%');
  const map = get('question-map').querySelectorAll('[data-quiz-jump]');
  assert(map[0].classList.contains('answered'));
  map[2].click(); assert(get('question-3').scrolled);
  assert.equal(document.activeElement, get('question-3'));
  // An unfinished quiz cannot enter the new resources route.
  nav('resources'); assert.equal(document.body.dataset.page, 'quiz');
  assert.match(get('mascot-bubble').textContent, /先完成/);
  await get('btn-submit').events.click();
  assert(get('app').innerHTML.indexOf('graded-actions') < get('app').innerHTML.indexOf('graded-question'), 'Next actions precede long explanations');
  assert(get('app').innerHTML.includes('<details class="graded-more"'));
  assert(get('app').innerHTML.includes('name="graded-questions" open'));
  const multi = sandbox.window.ZHIHU_DATA.pretest.questions.find(q => q.active !== false && q.type === 'multiple_choice');
  assert(multi, 'the actual question bank includes multiple choice questions');
  await ui.goPretest([multi.question_id]);
  const multiOptions = get('quiz').querySelectorAll('.q-opt');
  multiOptions[0].click(); multiOptions[1].click();
  assert.equal(ui.state.pretestAnswers[multi.question_id].length, 2);
  assert.equal(get('quiz-progress-text').textContent, '已作答 1 / 1 题');
  multiOptions[0].click(); multiOptions[1].click();
  assert.equal(get('quiz-progress-text').textContent, '已作答 0 / 1 题');
  assert.equal(get('btn-submit').disabled, true);
  assert.equal(multiOptions[0].getAttribute('aria-pressed'), 'false');
  assert.equal(get('question-map').children[0].classList.contains('answered'), false);
  ui.goLearningChoice();
  get('home-textbooks').onclick(); assert.equal(textbookOpens, 0, 'workbench shortcuts also protect unfinished quizzes');
  ui.goResources(); assert.equal(document.body.dataset.page, 'workbench');
  ui.state.experienceAssessmentActive = false;
  nav('resources'); assert.equal(document.body.dataset.page, 'resources');
  assert.equal(links.find(x => x.dataset.m === 'resources').getAttribute('aria-current'), 'page');
  assert.equal(links.find(x => x.dataset.m === 'quiz').getAttribute('aria-current'), undefined);
  get('resource-textbooks').onclick(); assert.equal(textbookOpens, 1);
  await ui.startLearningPath('case'); ui.loadCase('S1');
  ui.state.learningMode = 'assessment';
  nav('resources'); assert.equal(document.body.dataset.page, 'cases');
  ui.state.learningMode = 'coach'; await ui.goDialogue();
  const turns = ui.state.dialogue.length; assert(turns > 0);
  await ui.goDialogue(); assert.equal(ui.state.dialogue.length, turns, 'navigation must not duplicate the opening');
  // Case-only learners see their actual case records, without a fictional quiz percentage.
  store.reset('nursing'); store.recordTraining('nursing', 'SYNTHETIC-TEST', { total: 61 });
  ui.state.major = 'nursing'; ui.goSummary();
  assert.match(get('app').innerHTML, /SYNTHETIC-TEST/);
  assert.match(get('app').innerHTML, /<b>—<\/b><span>平均正确率/);
  ui.goLearningChoice();
  assert(get('app').innerHTML.includes('61/100'),'Dashboard shows the latest actual case score');
  assert(!get('app').innerHTML.includes('aria-label="自测正确率"'),'No fake quiz meter for case-only learners');
  // Mobile drawer focus, Escape, backdrop, focus trap, resize, and nav proxies.
  links.forEach(link => link.events.click = () => nav(link.dataset.m));
  vm.runInNewContext(fs.readFileSync(__dirname + '/care-ui.js', 'utf8'), sandbox, { filename: 'care-ui.js' });
  assert.equal(sidebar.inert, true);
  get('menu-toggle').click(); assert.equal(sidebar.inert, false);
  assert.equal(document.activeElement, links[0]);
  document.activeElement = links.at(-1); let prevented = false;
  document.events.keydown({ key: 'Tab', preventDefault() { prevented = true; } });
  assert(prevented); assert.equal(document.activeElement, links[0]);
  document.events.keydown({ key: 'Escape' });
  assert.equal(sidebar.inert, true); assert.equal(document.activeElement, get('menu-toggle'));
  get('menu-toggle').click(); get('mobile-backdrop').click();
  assert.equal(get('menu-toggle').getAttribute('aria-expanded'), 'false');
  ui.state.experienceAssessmentActive = false; ui.state.learningMode = 'coach';
  get('header-resources').click(); assert.equal(document.body.dataset.page, 'resources');
  mobile[0].click(); assert.equal(document.body.dataset.page, 'workbench');
  assert.equal(mobile[0].getAttribute('aria-pressed'), 'true');
  small = false; screen.changed(); assert.equal(sidebar.inert, false);
  document.activeElement = links[0];
  get('module-nav').events.click({ target: links[0], preventDefault() {} });
  assert.equal(document.activeElement, get('learning-choice-title'), 'desktop navigation focuses the new page heading');
  assert.notEqual(document.activeElement, get('menu-toggle'), 'desktop navigation must not focus a hidden mobile menu');
  await tick();
  console.log('[OK] Care UI: profession/routes, quiz progress/map, resource protection, history, dialogue restore, responsive navigation/focus');
})().catch(error => { console.error(error); process.exitCode = 1; });
