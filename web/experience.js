/* Guideline teaching references, using the existing site API or local preview.
 * No source cards, hidden cases, student answers or patient text sent to LLMs.
 */
(function () {
  'use strict';
  const esc = (s) => String(s == null ? '' : s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  let context = () => ({});
  let onResult = () => {};
  let enabled = true;
  const companions = new Set();
  try { enabled = localStorage.getItem('zhihu.experience.enabled') !== '0'; } catch (_) { /* memory-only fallback */ }
  const link = (url) => /^https?:\/\//i.test(url || '') ? `<a href="${esc(url)}" target="_blank" rel="noopener noreferrer">原始链接</a>` : '原始链接不可用';
  const list = (items) => (items || []).map(esc).join('；') || '无';
  function render(r) {
    if (!r) return '<p>经验库不可用；基本训练仍可使用。</p>';
    return `<section class="experience-result"><p><b>医学指南情境经验 · 教学参考</b></p>
      ${r.urgent ? `<div role="alert" class="notice"><b>${esc(r.urgent_message)}</b></div>` : ''}
      ${r.mode === 'training_guidance' ? '<p class="notice"><b>训练中引导</b> · 可继续当前训练，核对信息后再次检索。适用性只核对公开资料和已记录的患者回答。</p>' : ''}
      ${r.mode === 'coaching' ? '<p class="notice"><b>带教练习</b> · 先核实缺少的条件，再参考教学思路；使用情况会记录在复盘中。</p>' : ''}
      ${r.assistance && r.assistance.consultations ? `<p>本轮已使用指南带教 ${esc(r.assistance.consultations)} 次，评分标准不变。</p>` : ''}
      <p>${esc(r.message)}</p><p class="hint">${esc(r.notice)} 候选检出不代表覆盖病例。</p>
      ${(r.cards || []).map((c, index) => `<details class="kcard" ${c.applicability === 'applicable' || ((c.guidance_only || c.coaching) && index === 0) ? 'open' : ''}>
        <summary><b>${esc(c.id)} ${esc(c.title)}</b> · ${esc(c.label)}</summary>
        <p>为什么检出：${list(c.retrieval_reasons)}</p>
        <p>已确认条件：${list(c.confirmed_conditions)}</p>
        <p><b>尚未确认：${list(c.unconfirmed_conditions)}</b></p>
        <p><b>${c.guidance_only ? '适用性自查 / 可继续核实' : '关键追问'}：${list(c.questions)}</b></p>
        ${c.guidance_only ? `<p>${esc(c.learning_guidance)}</p>` : `<p>仍需核对的信息：${list(c.additional_information)}</p>`}
        ${(c.exclusion_reasons || []).length ? `<p>不适用原因：${list(c.exclusion_reasons)}</p>` : ''}
        ${c.teaching_interpretation || c.conditional_interpretation ? `<p><b>整理者教学转述${c.conditional_interpretation ? '（尚未确认适用，核实后参考）' : ''}</b>：${esc(c.teaching_interpretation || c.conditional_interpretation)}</p>` : ''}
        ${c.boundary ? `<p>边界与升级处理：${esc(c.boundary)}</p>` : ''}
        ${(c.evidence || []).map((e) => `${c.guidance_only ? '<p class="hint">完整推荐原文及处理思路在评分后复盘展示。</p>' : `<blockquote><b>${esc(e.quote_label || (e.source?.evidence_type === 'expert_consensus' ? '专家共识原文' : '指南原文推荐'))}</b>：${esc(e.quote)}</blockquote><p class="hint">原记录等级：${esc(e.grade)}</p>`}
          <p class="hint">原文定位：${esc(e.locator)}</p>
          <p class="kcard-src">${esc(e.source.id)} · ${esc(e.source.title)}<br>发布机构：${esc(e.source.issuer)}<br>
          版本：${esc(e.source.version)} · ${link(e.source.original_url)}<br>
          核验范围：${esc(e.source.verification_scope)} · 核验日期：${esc(e.source.checked_on)}</p>`).join('')}
        <p class="hint">${c.guidance_only ? '指南适用条件的教学自查；不是推荐原文' : esc(c.interpretation_label)} · ${esc(c.review_status)}</p>
      </details>`).join('')}
      ${r.candidate_count > (r.cards || []).length ? '<p class="hint">仅列出部分候选，请补充具体情境以缩小检索范围。</p>' : ''}
      <p class="hint">教师复核：检索仅记录卡号、索引/情境召回方式、条件编号及核对结果、适用性结果和资源哈希；不保存原始问题或患者身份信息。</p></section>`;
  }
  async function search(query, filters) {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 25000);
    try {
      const args = { ...context(), ...(filters || {}), query: String(query || ''), enabled };
      if (window.ZH_COURSE?.active) {
        const result = await window.ZH_COURSE.call('get_experience_references', args);
        onResult(result); return result;
      }
      const cloudApi = !window.__LOCAL_ONLY__ && window.ZHIHU_AGENT_API;
      const response = await fetch(cloudApi || '/api/experience', { method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(cloudApi ? { action: 'mcp_call', tool: 'get_experience_references', args } : args), signal: controller.signal });
      if (!response.ok) throw new Error('unavailable');
      const data = await response.json();
      if (cloudApi) {
        if (data.status !== 'ok' || !data.result) throw new Error('unavailable');
        onResult(data.result); return data.result;
      }
      onResult(data); return data;
    } catch (_) {
      return { status: 'unavailable', cards: [], message: '经验库暂时不可用，请稍后重试。基本训练仍可使用。', notice: '教学参考，尚未临床专家审定。' };
    } finally { clearTimeout(timer); }
  }
  function setEnabled(value) {
    enabled = Boolean(value);
    try { localStorage.setItem('zhihu.experience.enabled', enabled ? '1' : '0'); } catch (_) { /* memory-only */ }
    for (const companion of companions) {
      if (!companion.host.isConnected) companions.delete(companion);
      else companion.refresh();
    }
  }
  // Render only what the server released for this stage. Never inspect a case,
  // student proposal or hidden fields here to manufacture an applicable card.
  function renderCompanion(result, canAsk = false) {
    if (!result) return '<p>经验库暂时不可用，仍可继续训练。</p>';
    const urgent = result.urgent ? `<div class="notice" role="alert"><b>${esc(result.urgent_message)}</b></div>` : '';
    if (result.status !== 'ok' || result.outcome === 'stage_restricted') {
      return urgent + `<p>${esc(result.message)}</p>`;
    }
    const candidates = result.cards || [];
    const useful = candidates.filter(card => card.applicability !== 'not_applicable');
    if (!useful.length) {
      return urgent + '<p><b>经验库暂无已确认适用的依据。</b>继续采集病史、核实病因和风险；需要时请教师评估。</p>' +
        (candidates.length ? `<details><summary>查看已排除的候选及原因</summary>${render({ ...result, urgent: false })}</details>` : '') +
        '<p class="hint">本库仅覆盖部分主题，不会用最相近的卡片代替依据。</p>';
    }
    const questions = [...new Set(useful.flatMap(card => card.questions || []))].slice(0, 4);
    return urgent + `<p>${useful.some(card => card.applicability === 'applicable')
      ? '有候选符合已提供的检索条件，请继续核对边界。'
      : '<b>先补信息，再判断是否适用。</b>以下是指南条件自查，不能当成本例诊断或评分点。'}</p>
      ${questions.length ? `<div class="experience-questions"><b>现在可以核实</b><ul>${questions.map((question, index) => `<li>${esc(question)}${canAsk ? ` <button type="button" class="btn ghost sm" data-experience-question="${index}">带入对话</button>` : ''}</li>`).join('')}</ul></div>` : ''}
      ${useful.slice(0, 3).map(card => `<article class="experience-brief">
        <p><b>${esc(card.id)} · ${esc(card.title)}</b> <span class="pill">${esc(card.label)}</span></p>
        ${card.teaching_interpretation || card.conditional_interpretation ? `<p><b>${card.conditional_interpretation ? '条件核实后可参考的思路' : '指南支持的调整思路'}（整理者教学转述）</b><br>${esc(card.teaching_interpretation || card.conditional_interpretation)}</p>` : `<p>${esc(card.learning_guidance || '请先核实尚未确认的适用条件。')}</p>`}
        ${card.boundary ? `<p><b>边界与升级：</b>${esc(card.boundary)}</p>` : ''}
        <details><summary>为什么检出 · 适用条件 · 原文与出处</summary>${render({ ...result, cards: [card], candidate_count: 1, urgent: false, assistance: null })}</details>
      </article>`).join('')}
      ${useful.length > 3 ? '<p class="hint">此处展示部分候选，可打开完整检索继续筛选。</p>' : ''}
      <p class="hint">教学参考，尚未临床专家审定；候选检出不代表适用或答案正确，原评分标准不变。</p>`;
  }
  function mount(host, options = {}) {
    if (!host) return null;
    for (const old of companions) {
      if (old.host === host || !old.host.isConnected) { old.invalidate(); companions.delete(old); }
    }
    host.innerHTML = `<div class="experience-companion-head"><div><b>指南带教 · 跟随本例核对</b><p class="hint">依据公开病史和已保存的患者回答更新；未问到的信息仍是未知。</p></div>
      <label><input type="checkbox" data-experience-enabled ${enabled ? 'checked' : ''}> 启用</label></div>
      <div class="experience-companion-controls"><label>当前疑问（可选）<input class="input" data-experience-query placeholder="例如：吸入治疗后仍气促"></label>
      <button type="button" class="btn ghost sm" data-experience-refresh>核对当前进展</button><button type="button" class="btn ghost sm" data-experience-more>完整检索</button></div>
      <p class="hint" data-experience-status role="status"></p><div data-experience-result aria-live="polite"></div>`;
    const output = host.querySelector('[data-experience-result]');
    const status = host.querySelector('[data-experience-status]');
    const query = host.querySelector('[data-experience-query]');
    const toggle = host.querySelector('[data-experience-enabled]');
    let sequence = 0;
    const identity = () => JSON.stringify(context());
    const companion = {
      host,
      invalidate() { sequence += 1; output.innerHTML = ''; },
      async refresh() {
        const request = ++sequence;
        const current = identity();
        toggle.checked = enabled;
        output.innerHTML = ''; // Immediately remove stale hints on a mode change.
        if (!enabled) {
          status.textContent = '经验库已关闭；可继续原训练，重新启用后核对当前进展。';
          // Persist the preference for the report too; failure never blocks practice.
          if (context().session_id) {
            const result = await search('');
            if (!host.isConnected || request !== sequence || current !== identity() || enabled) return;
            if (result.status === 'unavailable') status.textContent += ' 服务端开关尚未同步，可稍后重试。';
            if (result.urgent) output.innerHTML = `<div class="notice" role="alert"><b>${esc(result.urgent_message)}</b></div>`;
          }
          return;
        }
        if (context().assessment_active || context().learning_mode === 'assessment') {
          status.textContent = '独立测评或未提交自测：不展示可能提示答案的经验。评分后可查看完整依据。'; return;
        }
        if (!context().session_id) { status.textContent = '经验库暂时不可用：尚未连接训练会话。可继续训练或重新连接后再核对。'; return; }
        status.textContent = '正在核对已公开信息，可继续训练…';
        const result = await search(query.value);
        if (!host.isConnected || request !== sequence || current !== identity() || !enabled) return;
        status.textContent = result.status === 'ok'
          ? '已核对当前已保存的训练进展。新回答保存后自动更新。'
          : '本次未完成指南核对，基本训练仍可继续；可稍后重试。';
        output.innerHTML = renderCompanion(result, Boolean(options.onQuestion));
        const questions = [...new Set((result.cards || []).filter(card => card.applicability !== 'not_applicable').flatMap(card => card.questions || []))].slice(0, 4);
        output.querySelectorAll('[data-experience-question]').forEach(button => {
          button.onclick = () => {
            if (current !== identity() || request !== sequence || !enabled) return;
            const question = questions[Number(button.dataset.experienceQuestion)];
            if (question && options.onQuestion) status.textContent = options.onQuestion(question) === false
              ? '输入框中已有草稿或正在发送，请处理后再带入追问。'
              : '已放入对话输入框，可自行改写后发送；尚未发送给患者。';
          };
        });
      },
    };
    companions.add(companion);
    toggle.onchange = () => setEnabled(toggle.checked);
    host.querySelector('[data-experience-refresh]').onclick = () => companion.refresh();
    host.querySelector('[data-experience-more]').onclick = () => open(query.value);
    query.onkeydown = event => { if (event.key === 'Enter') { event.preventDefault(); companion.refresh(); } };
    companion.refresh();
    return companion;
  }
  function open(query) {
    document.getElementById('experience-modal')?.remove();
    const host = document.createElement('div'); host.id = 'experience-modal'; host.className = 'qa-modal';
    const active = context().training_active;
    host.innerHTML = `<div class="qa-panel"><div class="qa-head"><b>指南情境经验库</b><button class="btn ghost sm" id="experience-close">关闭</button></div>
      <div class="qa-body"><p class="hint">${active ? '根据公开资料、已查看的采集结果和已保存的患者回答检索；可输入疑问缩小范围。带教内容供条件核实后参考，自测未提交时保护答案。' : '仅输入合成教学情境。题号/病例号只召回候选，不表示适用。'}</p>
      <label><input id="experience-enabled" type="checkbox" ${enabled ? 'checked' : ''}> 启用经验库教学参考</label>
      <p><label for="experience-query">当前情境</label><textarea class="input" id="experience-query" rows="4" style="width:100%" placeholder="填写年龄、已确认疾病、当前变化和已知排除信息">${esc(query || '')}</textarea></p>
      <details><summary>按题号、病例号、主题或知识节点筛选（可选）</summary><p><label>题号 <input class="input" id="experience-question" placeholder="Q-NU-203"></label>
      <label>病例号 <input class="input" id="experience-case" placeholder="P1"></label></p>
      ${active ? '<p class="hint">训练引导按公开信息或自主检索主题召回，不使用题号/病例关联推断隐藏诊断；输入的诊断假设也不会当成确诊。</p>' : ''}
      <p><label>疾病主题 <input class="input" id="experience-topic" placeholder="慢阻肺"></label>
      <label>知识节点 <input class="input" id="experience-node" placeholder="interprofessional_referral"></label></p></details>
      <button class="btn" id="experience-search">检索并核对条件</button><div id="experience-output" aria-live="polite"></div></div></div>`;
    document.body.appendChild(host);
    const output = host.querySelector('#experience-output');
    const run = async () => {
      const button = host.querySelector('#experience-search'); button.disabled = true;
      output.textContent = '正在核对资源及适用条件…';
      const result = await search(host.querySelector('#experience-query').value, {
        question_id: host.querySelector('#experience-question').value || null,
        case_id: host.querySelector('#experience-case').value || null,
        topic: host.querySelector('#experience-topic').value || null,
        node_id: host.querySelector('#experience-node').value || null,
      });
      output.innerHTML = render(result); button.disabled = false;
    };
    host.querySelector('#experience-close').onclick = () => host.remove();
    host.addEventListener('click', (e) => { if (e.target === host) host.remove(); });
    host.querySelector('#experience-enabled').onchange = async (e) => {
      setEnabled(e.target.checked);
      await run();
    };
    host.querySelector('#experience-search').onclick = run;
    if (query || (active && context().case_id)) run();
  }
  function init(getContext, resultCallback) {
    context = getContext;
    onResult = resultCallback || (() => {});
    const button = document.createElement('button'); button.className = 'btn ghost sm'; button.id = 'experience-open';
    button.textContent = '指南经验库'; button.onclick = () => open('');
    document.getElementById('module-nav').appendChild(button);
  }
  window.ZH_EXPERIENCE = { init, open, search, render, mount, renderCompanion, setEnabled, isEnabled: () => enabled };
})();
