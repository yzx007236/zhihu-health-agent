// Pure JavaScript contract checks; this is not browser/visual verification.
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const code = fs.readFileSync(__dirname + '/experience.js', 'utf8');
function setup(storage = '1', cloud = false) {
  const captured = [];
  const sandbox = {
    window: cloud ? { ZHIHU_AGENT_API: 'https://site.example/api/agent' } : { __LOCAL_ONLY__: true }, localStorage: { getItem: () => storage },
    document: { createElement: () => ({}), getElementById: () => ({ appendChild: (b) => captured.push(b) }) },
    AbortController, setTimeout, clearTimeout,
    fetch: async (url, init) => { captured.push({ url, payload: JSON.parse(init.body) }); return { ok: true, json: async () => cloud ? { status: 'ok', result: { status: 'ok', cards: [], outcome: 'needs_information' } } : { status: 'ok', cards: [] } }; },
  };
  vm.runInNewContext(code, sandbox);
  return { sandbox, captured, api: sandbox.window.ZH_EXPERIENCE };
}
(async () => {
  const { api, captured, sandbox } = setup();
  api.init(() => ({ session_id: 'ZH-TEST', training_active: true, assessment_active: false }));
  await api.search('合成教学问题', { question_id: 'Q-TEST' });
  const request = captured[1];
  assert.equal(request.url, '/api/experience');
  assert.deepEqual(Object.keys(request.payload).sort(), ['assessment_active', 'enabled', 'query', 'question_id', 'session_id', 'training_active']);
  assert.equal(request.payload.session_id, 'ZH-TEST');
  assert(!JSON.stringify(request).includes('hidden_info'));

  const source = { id: 'G13', title: '<script>unsafe</script>', issuer: '发布机构', version: '2026修订版', original_url: 'javascript:alert(1)', verification_scope: '推荐摘要核验；未阅读全文', checked_on: '2026-11-13' };
  const rendered = api.render({ message: '先补信息', notice: '尚未临床专家审定', urgent: true, urgent_message: '立即升级', cards: [{ id: 'K41', title: '参考卡', applicability: 'needs_information', label: '还需补充信息', retrieval_reasons: ['情境候选'], confirmed_conditions: [], unconfirmed_conditions: ['年龄'], questions: ['请确认年龄'], additional_information: [], exclusion_reasons: [], conditional_interpretation: '条件性教学转述', boundary: '边界', evidence: [{ quote: '原文推荐', locator: 'Recommendation 9', grade: '未补造等级', source }], interpretation_label: '教学转述', review_status: '临床待审定' }] });
  for (const text of ['未阅读全文', '2026修订版', 'Recommendation 9', '发布机构', '请确认年龄', '尚未临床专家审定']) assert(rendered.includes(text), text);
  assert(rendered.includes('&lt;script&gt;'));
  assert(!rendered.includes('href="javascript:'));
  assert(rendered.indexOf('立即升级') < rendered.indexOf('参考卡'));
  assert(rendered.indexOf('请确认年龄') < rendered.indexOf('条件性教学转述'));
  const guided = api.render({ mode: 'training_guidance', message: '条件核对', notice: '教学参考', cards: [{ id: 'K41', title: '慢阻肺 · 适用条件核对',
    guidance_only: true, applicability: 'needs_information', label: '还需补充信息', retrieval_reasons: ['自主主题检索'], confirmed_conditions: [],
    unconfirmed_conditions: ['是否已使用吸入治疗'], questions: ['是否已使用吸入治疗'], additional_information: [], exclusion_reasons: [],
    learning_guidance: '核实后再检索', review_status: '临床待审定', evidence: [{ locator: 'Recommendation 9 推荐摘要', source }] }] });
  for (const value of ['训练中引导', '适用性自查', '是否已使用吸入治疗', '核实后再检索', 'Recommendation 9', '未阅读全文']) assert(guided.includes(value), value);
  assert(!guided.includes('undefined'));
  assert(!guided.includes('<blockquote>'));
  assert(!guided.includes('整理者教学转述'));
  assert(guided.includes('class="kcard" open'));
  const consensus = api.render({message: '', notice: '', cards: [{id: 'K68', title: '胸痛参考',
    questions: [], additional_information: [], evidence: [{quote: 'Consensus excerpt', grade: '未单列等级',
      locator: 'Initial ECG Interpretation', source: {...source, evidence_type: 'expert_consensus', version: '2022；未核查后续更新'}}]}]});
  assert(consensus.includes('专家共识原文'));
  assert(!consensus.includes('指南原文推荐'));
  api.init(() => ({session_id: 'SYNTHETIC', collected: {case_id: 'S1', history: ['past_history'], exams: ['体温'], labs: ['PCT']}}));
  await api.search('');
  assert.deepEqual(captured.at(-1).payload.collected, {case_id: 'S1', history: ['past_history'], exams: ['体温'], labs: ['PCT']});

  sandbox.fetch = async () => { throw new Error('offline'); };
  assert.equal((await api.search('合成问题')).status, 'unavailable');
  const disabled = setup('0');
  disabled.api.init(() => ({}));
  await disabled.api.search('合成问题');
  assert.equal(disabled.captured[1].payload.enabled, false);
  const online = setup('1', true);
  online.api.init(() => ({ training_active: true }));
  const answer = await online.api.search('合成问题');
  const proxy = online.captured[1];
  assert.equal(proxy.url, 'https://site.example/api/agent');
  assert.equal(proxy.payload.action, 'mcp_call');
  assert.equal(proxy.payload.tool, 'get_experience_references');
  assert.equal(proxy.payload.args.training_active, true);
  assert.equal(answer.outcome, 'needs_information');
  online.sandbox.fetch = async () => ({ ok: true, json: async () => ({ status: 'error' }) });
  assert.equal((await online.api.search('合成问题')).status, 'unavailable');
  console.log('[OK] 6 JavaScript contracts: local payload with assessment guard, safe provenance rendering, training guidance rendering, failure fallback, persisted disable, cloud proxy and response validation');
})().catch((error) => { console.error(error); process.exitCode = 1; });
