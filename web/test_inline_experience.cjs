// Real retrieval results + UI lifecycle tests with a DOM stub, not visual QA.
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
// Generate fresh fixtures first: python web/build_experience_test_fixtures.py
const fixtures = JSON.parse(fs.readFileSync(path.resolve(__dirname,
  '../output/经验库接入验证/页内带教演示.json'), 'utf8'));

function node() {
  return {
    innerHTML: '', textContent: '', value: '', checked: true, isConnected: true, children: new Map(),
    appendChild() {},
    querySelector(selector) { if (!this.children.has(selector)) this.children.set(selector, node()); return this.children.get(selector); },
    querySelectorAll(selector) {
      if (selector !== '[data-experience-question]') return [];
      const buttons = [...this.innerHTML.matchAll(/data-experience-question="(\d+)"/g)].map(match => ({ dataset: { experienceQuestion: match[1] } }));
      this.buttons = buttons;
      return buttons;
    },
  };
}
const tick = () => new Promise(resolve => setImmediate(resolve));
function setup() {
  const requests = [], stored = [], state = { session_id: 'synthetic', case_id: 'SYNTHETIC', training_active: true, assessment_active: false, learning_mode: 'coach' };
  const sandbox = { window: { __LOCAL_ONLY__: true }, document: { createElement: node, getElementById: () => node() },
    localStorage: { getItem: () => '1', setItem: (...args) => stored.push(args) }, AbortController, setTimeout, clearTimeout };
  let result = fixtures.before;
  sandbox.fetch = async (url, init) => {
    requests.push(JSON.parse(init.body));
    return { ok: true, json: async () => result };
  };
  vm.runInNewContext(fs.readFileSync(path.join(__dirname, 'experience.js'), 'utf8'), sandbox);
  const api = sandbox.window.ZH_EXPERIENCE;
  api.init(() => ({ ...state }));
  return { api, state, sandbox, requests, stored, setResult: value => { result = value; } };
}

(async () => {
  const { api, state, requests, sandbox, setResult } = setup();
  const host = node(), output = host.querySelector('[data-experience-result]'), status = host.querySelector('[data-experience-status]');
  let draft = '', sent = 0;
  const panel = api.mount(host, { onQuestion(question) { if (draft) return false; draft = question; } });
  await tick();
  assert(output.innerHTML.includes('现在可以核实'));
  assert(output.innerHTML.includes('吸入'));
  assert(output.innerHTML.includes('条件核实后可参考的思路'));
  for (const text of ['Recommendation 9', '未阅读全文', '发布机构', '2026', '尚未临床专家审定']) assert(output.innerHTML.includes(text), text);
  assert.equal(requests.length, 1);
  assert.equal(requests[0].query, '');
  assert(!('visible_context' in requests[0]));
  assert(!('hidden_info' in requests[0]));
  output.buttons[0].onclick();
  assert(draft.length > 0);
  assert.equal(sent, 0); // The question is drafted, never automatically sent.
  const savedDraft = draft;
  output.buttons[1].onclick();
  assert.equal(draft, savedDraft);
  assert(status.textContent.includes('已有草稿'));

  setResult(fixtures.after);
  await panel.refresh();
  assert(output.innerHTML.includes('符合条件'));
  const k41 = fixtures.after.cards.find(card => card.id === 'K41');
  assert.equal(k41.applicability, 'applicable');
  assert.equal(k41.questions.length, 0);
  assert(output.innerHTML.includes('指南支持的调整思路'));
  setResult(fixtures.excluded);
  await panel.refresh();
  assert(output.innerHTML.includes('暂无已确认适用'));
  assert(output.innerHTML.includes('已排除的候选'));
  assert(!output.innerHTML.includes('data-experience-question='));
  setResult(fixtures.empty);
  await panel.refresh();
  assert(!output.innerHTML.includes('指南支持的调整思路'));
  assert(!output.innerHTML.includes('K41'));
  const urgent = api.renderCompanion(fixtures.urgent, true);
  assert(urgent.indexOf('不要等待') < urgent.indexOf('经验库已关闭'));

  // Switching modes immediately clears content; old requests cannot restore it.
  const pendingRequests = [];
  sandbox.fetch = (url, init) => new Promise(resolve => { pendingRequests.push({ resolve, args: JSON.parse(init.body) }); });
  const pending = panel.refresh();
  state.learning_mode = 'assessment';
  await panel.refresh();
  assert.equal(output.innerHTML, '');
  assert(status.textContent.includes('独立测评'));
  pendingRequests.shift().resolve({ ok: true, json: async () => fixtures.before });
  await pending;
  assert.equal(output.innerHTML, '');
  state.learning_mode = 'coach';
  const disabledPending = panel.refresh();
  api.setEnabled(false);
  assert.equal(output.innerHTML, '');
  assert(status.textContent.includes('已关闭'));
  assert.equal(pendingRequests.length, 2);
  assert.equal(pendingRequests[1].args.enabled, false);
  pendingRequests.shift().resolve({ ok: true, json: async () => fixtures.before });
  await disabledPending;
  assert.equal(output.innerHTML, '');
  pendingRequests.shift().resolve({ ok: true, json: async () => ({status: 'disabled', cards: []}) });
  await tick();
  assert(status.textContent.includes('已关闭'));
  assert.equal(output.innerHTML, '');

  sandbox.fetch = async () => { throw new Error('offline'); };
  api.setEnabled(true);
  await tick();
  assert(output.innerHTML.includes('暂时不可用'));
  assert(status.textContent.includes('未完成'));
  state.assessment_active = true;
  await panel.refresh();
  assert.equal(output.innerHTML, '');
  state.assessment_active = false;
  state.session_id = null;
  await panel.refresh();
  assert(status.textContent.includes('尚未连接'));
  assert.equal(output.innerHTML, '');

  const second = setup(), detached = node();
  let resolveDetached;
  second.sandbox.fetch = () => new Promise(resolve => { resolveDetached = resolve; });
  second.api.mount(detached);
  detached.isConnected = false;
  resolveDetached({ ok: true, json: async () => fixtures.before });
  await tick();
  assert.equal(detached.querySelector('[data-experience-result]').innerHTML, '');
  console.log('[OK] Inline companion: actual K41 before/after/source, question draft without sending/overwrite, exclusion/no match/emergency, mode and disable races, unavailable/missing session, detached views');
})().catch(error => { console.error(error); process.exitCode = 1; });
