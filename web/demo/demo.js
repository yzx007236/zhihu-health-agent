// 知护 · 全面测试版 —— 界面与流程（离线，不发起任何网络请求）
(function () {
  'use strict';
  const D = () => window.ZHIHU_DATA;
  const ZH = window.ZHIHU;
  const CORE = window.ZHIHU_DEMO;

  // 演示病例挂进数据，让 listCases/getCase 也能用
  if (!D().cases.some((c) => c.case_id === CORE.DEMO_CASE.case_id)) D().cases.unshift(CORE.DEMO_CASE);

  const MAJOR_LABEL = {
    clinical_medicine: '临床医学', nursing: '护理学', rehabilitation: '康复治疗',
    health_management: '健康管理', medical_technology: '医学检验 / 医技',
    traditional_chinese_medicine: '中医学', other: '其他 / 不确定',
  };
  const MAJOR_HINT = {
    clinical_medicine: '门诊接诊、病史采集、判断是否转诊',
    nursing: '健康宣教、查对、测量规范、随访',
    rehabilitation: '功能评估、活动安全、居家环境',
    health_management: '慢病随访、计划制定、家庭支持',
    medical_technology: '标本采集、核对、结果解释边界',
    traditional_chinese_medicine: '四诊信息、中西药同服、辨证边界',
    other: '通用训练，不限定专业方向',
  };
  const LEVELS = [
    { id: 'basic', label: '基础' },
    { id: 'intermediate', label: '提高' },
    { id: 'advanced', label: '困难' },
    { id: 'expert', label: '专家' },
  ];

  const S = {
    mode: null, major: 'other', level: 'basic', questions: [], answers: {},
    pretest: null, caseObj: null, turns: [], turnId: 0, revealed: [], emotion: '平静',
    scriptIndex: 0, score: null, casePool: [],
  };

  const el = (id) => document.getElementById(id);
  const esc = (s) => String(s == null ? '' : s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));

  const PANELS = ['start', 'major', 'pretest', 'explain', 'cases', 'dialogue', 'report'];
  const ORDER = ['start', 'major', 'pretest', 'explain', 'cases', 'dialogue', 'report'];

  function show(name) {
    for (const p of PANELS) el('p-' + p).classList.toggle('hidden', p !== name);
    const at = ORDER.indexOf(name);
    document.querySelectorAll('#steps .step').forEach((n) => {
      const i = ORDER.indexOf(n.dataset.s);
      n.classList.toggle('on', i === at);
      n.classList.toggle('done', i < at);
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function side() {
    el('s-mode').textContent = S.mode === 'demo' ? '演示脚本' : S.mode === 'free' ? '自由练习' : '—';
    el('s-major').textContent = S.major ? (MAJOR_LABEL[S.major] || S.major) : '—';
    el('s-case').textContent = S.caseObj ? S.caseObj.case_id : '—';
    el('s-turns').textContent = S.turnId ? String(S.turnId) : '—';
    el('s-rubric').textContent = (D().rubric && D().rubric.rubric_version) || '—';
    const box = el('unlock-box');
    if (!S.caseObj) { box.innerHTML = ''; return; }
    box.innerHTML = (S.caseObj.hidden_info || []).map((h) => {
      const got = S.revealed.includes(h.id);
      return `<div class="it${got ? '' : ' locked'}">${got ? '已问出：' + esc(h.value) : h.id + ' · 尚未问出'}</div>`;
    }).join('');
  }

  // ---------------- 02 专业 ----------------
  function renderMajors() {
    el('major-list').innerHTML = ZH.listMajors().map((m) => (
      `<button class="major" data-m="${m}">${esc(MAJOR_LABEL[m] || m)}<small>${esc(MAJOR_HINT[m] || '')}</small></button>`
    )).join('');
    el('major-list').querySelectorAll('.major').forEach((b) => {
      b.onclick = () => { S.major = b.dataset.m; goPretest(); };
    });
  }

  // ---------------- 03 自测 ----------------
  function paperFor(major, level) {
    const papers = D().pretest.major_papers || {};
    const p = papers[major] || papers['other'] || [];
    const ids = Array.isArray(p) ? p : (p[level] || p.basic || p.intermediate || []);
    const index = {};
    (D().pretest.questions || []).forEach((q) => { index[q.question_id] = q; });
    return (ids || []).map((id) => index[id]).filter(Boolean).slice(0, 5);
  }

  function availableLevels(major) {
    const papers = D().pretest.major_papers || {};
    const p = papers[major] || papers['other'] || [];
    if (Array.isArray(p)) return ['basic'];
    // 题库已合并 pretest.json（basic/intermediate）与 pretest_hard.json（advanced/expert），
    // 四档都有题；这里仍按实际有题的档位渲染，缺档就不摆按钮。
    return ['basic', 'intermediate', 'advanced', 'expert'].filter((k) => Array.isArray(p[k]) && p[k].length);
  }

  function renderLevels() {
    const avail = availableLevels(S.major);
    if (!avail.includes(S.level)) S.level = avail[0] || 'basic';
    el('level-row').innerHTML = avail.map((id) => {
      const label = (LEVELS.find((l) => l.id === id) || {}).label || id;
      return `<button class="btn sm ${id === S.level ? '' : 'ghost'}" data-l="${id}">${label}</button>`;
    }).join('') + `<span style="align-self:center;color:#7b8a84;font-size:12px">本地题库当前可用档位：${avail.map((id) => (LEVELS.find((l) => l.id === id) || {}).label || id).join(' / ')}</span>`;
    el('level-row').querySelectorAll('button').forEach((b) => {
      b.onclick = () => { S.level = b.dataset.l; goPretest(); };
    });
  }

  function goPretest() {
    const avail = availableLevels(S.major);
    if (!avail.includes(S.level)) S.level = avail[0] || 'basic';
    S.questions = paperFor(S.major, S.level);
    S.answers = {};
    S.pretest = null;
    renderLevels();
    el('pretest-lead').innerHTML = `5 道题，检验你在这个方向上的基础。当前难度：<b>${esc((LEVELS.find((l) => l.id === S.level) || {}).label || S.level)}</b>。答完提交后，知护会指出薄弱节点。`;
    el('quiz').innerHTML = S.questions.map((q, i) => `
      <div class="q" data-q="${esc(q.question_id)}">
        <div class="stem">第 ${i + 1} 题 · ${esc(q.stem)}</div>
        ${Object.entries(q.options || {}).map(([k, v]) => (
          `<label class="opt" data-k="${esc(k)}"><input type="radio" name="${esc(q.question_id)}" value="${esc(k)}">${esc(k)}　${esc(v)}</label>`
        )).join('')}
      </div>`).join('');
    el('quiz').querySelectorAll('.opt').forEach((opt) => {
      opt.onclick = () => {
        const qid = opt.closest('.q').dataset.q;
        S.answers[qid] = opt.dataset.k;
        opt.closest('.q').querySelectorAll('.opt').forEach((o) => o.classList.remove('sel'));
        opt.classList.add('sel');
        opt.querySelector('input').checked = true;
      };
    });
    show('pretest');
    side();
  }

  function gradePretest() {
    let earned = 0, possible = 0;
    const weak = [], detail = [];
    for (const q of S.questions) {
      const actual = String(S.answers[q.question_id] || '').toUpperCase();
      const correct = actual === String(q.answer || '').toUpperCase();
      const pts = Number(q.score || 1);
      possible += pts; if (correct) earned += pts;
      if (!correct && !weak.includes(q.node_id)) weak.push(q.node_id);
      detail.push({ question_id: q.question_id, node_id: q.node_id, submitted: actual || null, correct, correct_answer: q.answer, explanation_ref: q.explanation_ref });
    }
    S.pretest = {
      status: 'ok', major: S.major, level: S.level,
      score: earned, max_score: possible,
      percentage: possible ? Math.round((earned / possible) * 10000) / 100 : 0,
      weak_nodes: weak, detail,
    };
    return S.pretest;
  }

  // ---------------- 04 讲解 ----------------
  function goExplain() {
    const lead = el('explain-lead');
    const box = el('knowledge');
    const p = S.pretest || gradePretest();
    lead.innerHTML = `自测得分 <b>${p.score}/${p.max_score}</b>。下面针对薄弱节点讲解，来源与版本一并标注。`;

    const seen = new Set(), cards = [];
    for (const node of p.weak_nodes) {
      const r = ZH.retrieveKnowledge(node, null);
      for (const c of (r.knowledge_cards || [])) {
        if (seen.has(c.knowledge_id)) continue;
        seen.add(c.knowledge_id); cards.push(c);
      }
    }
    let note = '';
    if (!cards.length) {
      const r = ZH.retrieveKnowledge(S.major, null);
      (r.knowledge_cards || []).slice(0, 3).forEach((c) => { if (!seen.has(c.knowledge_id)) { seen.add(c.knowledge_id); cards.push(c); } });
      note = `<div class="note">这次错题集中在题库补充考点，暂无对应的专项知识卡；先看本专业的基础知识卡。</div>`;
    }
    el('explain-lead').insertAdjacentHTML('afterend', '');
    box.innerHTML = note + (cards.length ? cards.slice(0, 6).map((c) => `
      <div class="kcard">
        <h4>${esc(c.title)}</h4>
        <div>${esc(c.claim || '')}</div>
        <div class="meta">来源：${esc(c.source || '知识库')}　版本：${esc(c.version || '—')}　编号：${esc(c.knowledge_id)}</div>
      </div>`).join('') : '<div class="note">知识库暂未收录这部分内容，请查阅课程指定教材或向教师咨询。</div>');
    show('explain');
    side();
  }

  // ---------------- 05 病例 ----------------
  function goCases(refresh) {
    let pool = ZH.listCases(S.major);
    if (S.mode === 'demo') {
      pool = [{
        case_id: CORE.DEMO_CASE.case_id, title: CORE.DEMO_CASE.title, disease_label: CORE.DEMO_CASE.disease_label,
        recommended: true, case_id_demo: true,
      }];
    } else {
      const preferred = pool.filter((c) => c.recommended);
      pool = preferred.length ? preferred : pool;
      if (refresh || !S.casePool.length) {
        const shuffled = pool.slice().sort(() => Math.random() - 0.5);
        S.casePool = shuffled.slice(0, 6);
      } else {
        S.casePool = S.casePool.filter((c) => pool.some((p) => p.case_id === c.case_id));
        if (!S.casePool.length) S.casePool = pool.slice(0, 6);
      }
      pool = S.casePool;
    }
    el('case-lead').innerHTML = S.mode === 'demo'
      ? '演示脚本模式固定使用「王阿姨的家庭血压管理」，点击即可开始。'
      : `本专业可选病例 <b>${pool.length}</b> 个（共 ${D().cases.length} 个合成病例）。点一个进入对话。`;
    el('case-list').innerHTML = pool.map((c) => `
      <div class="case-item" data-c="${esc(c.case_id)}">
        <b>${esc(c.title)}</b>
        <small>${esc(c.case_id)} · ${esc(c.disease_label || '')}</small>
      </div>`).join('');
    el('case-list').querySelectorAll('.case-item').forEach((n) => {
      n.onclick = () => openCase(n.dataset.c);
    });
    show('cases');
    side();
  }

  // ---------------- 06 对话 ----------------
  function openCase(caseId) {
    const r = ZH.getCase(caseId, true);
    if (r.status !== 'ok') return;
    S.caseObj = r.case;
    S.turns = []; S.turnId = 0; S.revealed = []; S.emotion = (S.caseObj.persona || {}).initial_emotion || '平静';
    S.scriptIndex = 0; S.score = null;

    const c = S.caseObj;
    el('dialogue-lead').innerHTML = `你现在是与「${esc(c.public_profile ? c.public_profile.name : c.title)}」对话的社区健康服务人员。用你的沟通能力逐步了解情况。` +
      (S.mode === 'demo' ? '<span class="pill">演示脚本</span>' : '<span class="pill warn">规则驱动</span>');
    el('case-brief').innerHTML = `
      <div class="kcard" style="border-left-color:#c8b273">
        <h4>${esc(c.title)}　<small style="color:#7b8a84;font-weight:400">${esc(c.case_id)} · ${esc(c.disease_label || '')}</small></h4>
        <div>${esc(c.task || '')}</div>
        <div class="meta">公开资料：${esc((c.public_profile || {}).name || '')}，${esc(String((c.public_profile || {}).age || ''))}岁，${esc((c.public_profile || {}).setting || '')}｜${esc((c.public_profile || {}).notice || '合成资料')}</div>
        ${(c.clinical_data || []).length ? `<div class="meta">可见记录：${c.clinical_data.map((d) => `${esc(d.day || '')} ${esc(d.item)} ${esc(d.value)}`).join('；')}</div>` : ''}
      </div>`;

    el('chat').innerHTML = '';
    pushTurn('resident', (c.persona && c.persona.initial_emotion ? '（' + c.persona.initial_emotion + '）' : '') + '你说吧，我这会儿有空。', null, true);

    el('inputbar').style.display = S.mode === 'demo' ? 'none' : 'flex';
    el('btn-next-script').style.display = S.mode === 'demo' ? 'inline-block' : 'none';
    show('dialogue');
    side();
  }

  function bubble(speaker, text) {
    const c = S.caseObj;
    const name = speaker === 'student' ? '我' : ((c.public_profile || {}).name || '居民');
    const av = speaker === 'student' ? '我' : '护';
    const wrap = document.createElement('div');
    wrap.className = 'msg' + (speaker === 'student' ? ' me' : '');
    wrap.innerHTML = `<div class="av">${av}</div><div><div class="nm">${esc(name)}</div><div class="bubble">${esc(text)}</div></div>`;
    return wrap;
  }

  function pushTurn(speaker, text, tags, silent) {
    const chat = el('chat');
    chat.appendChild(bubble(speaker, text));
    chat.scrollTop = chat.scrollHeight;
    if (speaker === 'student') {
      S.turnId += 1;
      S.turns.push({ speaker: 'student', turn_id: S.turnId, raw_text: text, text, tags: tags || [] });
    } else {
      S.turns.push({ speaker: 'resident', text });
    }
    if (!silent) side();
  }

  function studentSay(text) {
    if (!text || !String(text).trim()) return;
    const t = String(text).trim();
    pushTurn('student', t);
    const r = CORE.residentReply(S.caseObj, t, { turn: S.turnId, revealed: S.revealed, emotion: S.emotion });
    S.revealed = r.revealed; S.emotion = r.emotion;
    setTimeout(() => { pushTurn('resident', r.reply); side(); }, 260);
  }

  function nextScript() {
    const line = CORE.DEMO_SCRIPT[S.scriptIndex];
    if (!line) { el('btn-next-script').disabled = true; return; }
    S.scriptIndex += 1;
    pushTurn('student', line.student, line.tags || []);
    if (line.reveal && !S.revealed.includes(line.reveal)) S.revealed.push(line.reveal);
    setTimeout(() => { pushTurn('resident', line.resident); side(); }, 200);
    if (S.scriptIndex >= CORE.DEMO_SCRIPT.length) el('btn-next-script').disabled = true;
  }

  // ---------------- 07 复盘 ----------------
  function finish() {
    const ev = CORE.extractEvidence(S.caseObj, S.turns, D().rubric);
    const res = ZH.scoreTraining({
      session_id: 'DEMO-' + Date.now(),
      case_id: S.caseObj.case_id,
      evidence_candidates: ev,
      pretest_result: S.pretest,
    });
    S.score = res;
    renderReport();
    show('report');
    side();
  }

  function renderReport() {
    const r = S.score;
    const applicable = (r.item_results || []).length;
    const allItems = (D().rubric.items || []).length;
    el('report-lead').innerHTML = `病例 <b>${esc((S.caseObj || {}).title || '')}</b>（${esc((S.caseObj || {}).case_id || '')}）｜对话 ${S.turnId} 轮｜评分规则 ${esc(r.rubric_version)}（${esc(r.rubric_status)}）`
      + `<div class="note" style="background:#eef6f1;border-color:#cfe2da;color:#1c6b4a">本次适用评分项 <b>${applicable}</b> / 全库 ${allItems} 项。规则 1.0.0 中 5 项为通用项，其余 9 项绑定到具体病例编号；本病例不在这些专属项覆盖范围内，因此只评通用项。</div>`;
    el('score-total').textContent = (Math.round(r.total_score * 10) / 10);
    const dims = r.dimension_scores || {};
    el('score-dims').innerHTML = Object.keys(dims).length
      ? `<table class="score"><tr><th>维度</th><th>得分</th><th>占比</th></tr>${Object.entries(dims).map(([k, v]) => (
        `<tr><td>${esc(k)}</td><td>${v.score} / ${v.max_score}</td><td>${v.percentage}%</td></tr>`)).join('')}</table>` : '';
    el('score-redlines').innerHTML = (r.red_lines || []).length
      ? `<div class="note"><b>触发合规红线</b>：${r.red_lines.map((x) => `${esc(x.red_line_id)}（${esc(x.action)}，总分封顶 ${x.cap_total}）`).join('；')}</div>`
      : '<div class="note" style="background:#eef6f1;border-color:#cfe2da;color:#1c6b4a">未触发合规红线。</div>';
    el('score-items').innerHTML = `<table class="score"><tr><th>评分项</th><th>档次</th><th>得分</th><th>证据（你的原话）</th></tr>${
      (r.item_results || []).map((it) => {
        const q = (it.evidence || [])[0];
        return `<tr><td><b>${esc(it.item_id)}</b><br><small style="color:#7b8a84">${esc(it.behavior)}</small></td>
          <td><span class="lvl ${esc(it.level)}">${esc(it.level)}</span></td>
          <td>${it.score} / ${it.max_score}</td>
          <td><small>${q ? '第 ' + esc(q.turn_id) + ' 轮：「' + esc(q.quote) + '」' : '—'}</small></td></tr>`;
      }).join('')}</table>`;
  }

  function exportRecord() {
    const data = {
      generated_at: new Date().toISOString(),
      mode: S.mode, major: S.major, level: S.level,
      case: { case_id: S.caseObj.case_id, title: S.caseObj.title },
      pretest: S.pretest, turns: S.turns, score: S.score,
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = `知护-训练记录-${S.caseObj.case_id}-${Date.now()}.json`;
    a.click();
    setTimeout(() => URL.revokeObjectURL(a.href), 2000);
  }

  // ---------------- 启动 ----------------
  el('btn-free').onclick = () => { S.mode = 'free'; renderMajors(); show('major'); side(); };
  el('btn-demo').onclick = () => {
    S.mode = 'demo'; S.major = 'nursing'; S.level = 'basic';
    goPretest(); side();
  };
  el('btn-back-start').onclick = () => { show('start'); };
  el('btn-submit-pretest').onclick = () => {
    if (Object.keys(S.answers).length < S.questions.length) {
      if (!confirm('还有题目没答完，确定提交吗？')) return;
    }
    gradePretest();
    goExplain();
  };
  el('btn-to-cases').onclick = () => goCases(false);
  el('btn-shuffle').onclick = () => goCases(true);
  el('btn-send').onclick = () => { const v = el('say').value; el('say').value = ''; studentSay(v); };
  el('say').addEventListener('keydown', (e) => { if (e.key === 'Enter') { const v = el('say').value; el('say').value = ''; studentSay(v); } });
  el('btn-next-script').onclick = nextScript;
  el('btn-finish').onclick = () => {
    if (S.turnId < 1) { alert('还没有开始对话。'); return; }
    finish();
  };
  el('btn-retrain').onclick = () => { S.casePool = []; goCases(true); };
  el('btn-export').onclick = exportRecord;
  el('btn-print').onclick = () => window.print();

  side();
  show('start');
})();
