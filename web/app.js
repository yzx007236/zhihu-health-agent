/* 知护 前端应用逻辑：状态机 + 模块渲染 + SP 对话 + 评分 + 报告 + 云服务接入 */
(function () {
  'use strict';
  const ZH = window.ZHIHU;
  const D = window.ZHIHU_DATA;
  const COURSE = window.ZH_COURSE?.active ? window.ZH_COURSE : null;
  const AGENT_API = window.__AGENT_API__ || 'https://pretty-camel-d2g0oe3e03341c0a4-1521569590.ap-shanghai.app.tcloudbase.com/api/agent';
  // qa.js（⑥ 知识点答疑）复用同一个云函数地址；未部署时自动只走本地知识卡
  window.ZHIHU_AGENT_API = AGENT_API;

  // ---------- 云服务（若可用则启用，否则降级本地演示） ----------
  let cloud = null;
  try {
    if (window.WorkBuddyCloud && window.__CLOUD_CONFIG__) {
      cloud = window.WorkBuddyCloud.createWorkBuddyCloud(window.__CLOUD_CONFIG__);
    }
  } catch (e) { cloud = null; }

  // ---------- 知护 MCP 真智能体通道（网页 → 云函数 → MCP 16 个工具） ----------
  const MCP = {
    sessionId: null,     // MCP 侧真实会话号
    poolSize: 0,         // 本专业病例总数
    standardPoolSize: 0,
    questionCasePoolSize: 0,
    cases: [],           // 本次随机推荐的病例（公开视图）
    recommendationNote: '',
    relatedCases: [],
    randomCases: [],
    recommendationAudit: [],
    recommendationResourceStatus: 'ready',
    questionCaseTraining: null,
    lastError: null,
    async call(tool, args) {
      if (COURSE) return COURSE.call(tool, args);
      const response = await fetch(AGENT_API, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'mcp_call', tool, args: args || {} }),
      });
      const data = await response.json().catch(() => ({}));
      if (!response.ok || data.status !== 'ok') {
        MCP.lastError = data.detail || data.error || `http_${response.status}`;
        throw new Error(MCP.lastError);
      }
      MCP.lastError = null;
      return data.result || {};
    },
    // 建（或复用）一个真实会话；失败时返回 null，前端继续用本地演示数据
    async ensureSession(major, newBatch, sourceSessionId) {
      if (MCP.sessionId && !newBatch) return MCP.sessionId;
      const result = await MCP.call('start_session', {
        major: major || S.major || 'other',
        mode: 'complete',
        ...(MCP.sessionId ? { session_id: MCP.sessionId } : {}),
        ...(sourceSessionId ? { source_session_id: sourceSessionId } : {}),
        new_batch: Boolean(newBatch),
      });
      const sid = result.session_id || (result.session && result.session.session_id) || null;
      if (!sid) throw new Error('mcp_session_missing');
      MCP.sessionId = sid;
      S.sessionId = sid;
      MCP.poolSize = result.case_pool_size || 0;
      MCP.standardPoolSize = result.standard_case_pool_size || MCP.poolSize;
      MCP.questionCasePoolSize = result.question_case_pool_size || 0;
      MCP.cases = Array.isArray(result.recommended_cases) ? result.recommended_cases : [];
      MCP.recommendationNote = result.recommendation_note || '';
      MCP.relatedCases = result.related_cases || MCP.cases.filter(c => (c.recommendation_reasons || []).length);
      MCP.randomCases = result.random_cases || MCP.cases.filter(c => !(c.recommendation_reasons || []).length);
      MCP.recommendationAudit = result.recommendation_audit || [];
      MCP.recommendationResourceStatus = result.recommendation_resource_status || 'unknown';
      return sid;
    },
  };

  // 把 MCP 返回的自测结果整理成界面用的结构
  function normalizePretest(raw) {
    const x = (raw && raw.pretest_result) || raw || {};
    const score = Number(x.score ?? x.total_score ?? 0);
    const maxScore = Number(x.max_score ?? x.total ?? 0) || score || 1;
    return {
      score,
      max_score: maxScore,
      percentage: Number(x.percentage ?? Math.round((score / (maxScore || 1)) * 100)),
      weak_nodes: Array.isArray(x.weak_nodes) ? x.weak_nodes : [],
      item_results: x.item_results || x.details || x.detail || [],
      source: 'mcp',
    };
  }

  function mcpDetailRows(items) {
    return (items || []).map((item, i) => {
      const pack = (item && typeof item.explanation === 'object') ? item.explanation : {};
      const card = pack.knowledge || null;
      return {
        no: i + 1,
        question_id: item.question_id,
        stem: item.stem || pack.stem || '',
        options: item.options || pack.options || {},
        answer: String(item.correct_answer || '').toUpperCase(),
        chosen: String(item.submitted || '').toUpperCase(),
        graded: true,
        correct: Boolean(item.correct),
        question_type: item.question_type || 'single_choice',
        subject: item.subject || pack.subject || '',
        node_id: item.node_id || '',
        explanation_ref: item.explanation_ref || '',
        explanation: card ? '' : (typeof item.explanation === 'string' ? item.explanation : ''),
        source: item.source || '',
        source_note: item.source_note || '',
        card,
        card_kind: card ? (card.card_kind || 'curated') : 'inline',
        card_imported: null,
      };
    });
  }

  // ---------- 全局状态 ----------
  const S = {
    stage: 'welcome',          // 当前阶段
    major: null,               // 专业 id
    sessionId: null,           // 会话编号
    pretest: null,             // 自测结果
    learningPath: 'complete',  // quiz=只答题，case=只练病例，complete=完整流程
    experienceAssessmentActive: false, // 未提交自测的经验库保护；独立于页面导航
    learningMode: 'coach',
    experienceAssistance: null,
    pretestAnswers: {},        // 自测答案
    pretestIds: null,          // 本次出题题号（出题/批改同卷）
    pretestQuestions: null,    // 本次展示题面（含attempt级选项顺序）
    pretestOptionMaps: null,   // 本地模式显示字母 -> 稳定选项ID
    pretestAttemptId: null,    // 本次答题attempt_id
    pretestDetail: null,       // 逐题批改详情
    collect: { asked: {}, exams: [], labs: [] },   // ⑪⑫ 问诊/查体/检查采集记录
    analysis: { summary: '', diagnosis: '', caseType: '', pattern: '', examReasoning: {} }, // ⑬ 摘要/诊断/分型
    assessment: null,          // ⑭ 三率
    caseScene: 'default',      // ⑧ 病例场景筛选
    currentCase: null,         // 当前病例（公开）
    casePrivate: null,         // 当前病例（含隐藏，仅内部）
    dialogue: [],              // 对话日志
    revealed: [],              // 已释放信息
    spState: {},               // SP 状态
    evidence: [],              // 证据候选
    scoreResult: null,         // 评分结果
    report: null,              // 报告
  };

  const $app = document.getElementById('app');
  const $bubble = document.getElementById('mascot-bubble');

  function experienceCollection() {
    return {
      case_id: S.currentCase?.case_id || null,
      history: Object.keys(S.collect.asked).filter(key => S.collect.asked[key] && !key.startsWith('ros:')),
      ros: Object.keys(S.collect.asked).filter(key => S.collect.asked[key] && key.startsWith('ros:')).map(key => key.slice(4)),
      exams: [...S.collect.exams], labs: [...S.collect.labs],
    };
  }
  if (window.ZH_EXPERIENCE) window.ZH_EXPERIENCE.init(() => ({
    session_id: MCP.sessionId || null,
    training_active: Boolean(S.major),
    assessment_active: S.experienceAssessmentActive,
    learning_mode: S.learningMode,
    case_id: S.currentCase ? S.currentCase.case_id : null,
    collected: experienceCollection(),
  }), (result) => { if (result.assistance) S.experienceAssistance = result.assistance; });

  function setBubble(t) {
    $bubble.textContent = t;
    if ($bubble.parentElement) $bubble.parentElement.style.display = 'block';
  }

  // ---------- 渲染辅助 ----------
  function esc(s) {
    return String(s ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  }
  function el(html) { const d = document.createElement('div'); d.innerHTML = html; return d.firstElementChild; }

  function setSteps(current) {
    const fullOrder = ['welcome', 'major', 'pretest', 'explain', 'case', 'dialogue', 'review'];
    const choosing = current === 'welcome' || current === 'major';
    const order = choosing || S.learningPath === 'complete' ? fullOrder
      : (S.learningPath === 'quiz' ? fullOrder.slice(0, 4) : ['welcome', 'major', 'case', 'dialogue', 'review']);
    document.querySelectorAll('.step').forEach((s) => {
      const k = s.dataset.s;
      const ci = order.indexOf(current), si = order.indexOf(k);
      s.style.display = si < 0 ? 'none' : '';
      const number = s.querySelector('.k');
      if (number && si >= 0) number.textContent = String(si + 1).padStart(2, '0');
      s.classList.toggle('on', k === current);
      s.classList.toggle('done', si >= 0 && si < ci);
    });
  }
  const PAGE_META = {
    workbench: ['学习工作台', 'YOUR LEARNING SPACE', '欢迎回到知护', '让每一次学习，都成为专业能力的积累。'],
    quiz: ['答题自测', 'KNOWLEDGE CHECK', '从一道题，看见自己的下一步。', '按专业与难度练习，完成作答后查看成绩、解析与薄弱考点。'],
    weak: ['薄弱讲解', 'UNDERSTAND & CONNECT', '把薄弱的一点，慢慢学扎实。', '回到知识的依据，理解常见误区，让每次练习都有所收获。'],
    cases: ['病例研读', 'READ THE PERSON', '先读懂情境，再走近一个人。', '从公开资料与问诊检查出发，整理信息，建立你的临床思路。'],
    analysis: ['初步分析', 'THINK BEFORE YOU SPEAK', '让每一个判断，都有依据。', '整理病例摘要与初步判断，为接下来的沟通做好准备。'],
    dialogue: ['居民对话', 'LISTEN & RESPOND', '从认真倾听，到恰当回应。', '与虚拟居民开展情境对话，把你的知识变成清楚、温和的表达。'],
    review: ['评分复盘', 'REFLECT & GROW', '每一次复盘，都通向更好的下一次。', '循着对话证据回看表现，找到下一轮练习的方向。'],
    summary: ['学习档案', 'YOUR LEARNING JOURNEY', '成长，藏在每一次认真练习里。', '回看本专业的自测、错题与病例记录，了解自己的学习轨迹。'],
    resources: ['学习资源', 'A QUIET PLACE TO LEARN', '有据可查，才能学得更踏实。', '查阅医学教材、指南经验与知识卡，让每一个疑问都有出处。'],
  };
  function setNav(current) {
    const meta = PAGE_META[current] || PAGE_META.workbench;
    if (document.body) document.body.dataset.page = current;
    document.querySelectorAll('#module-nav a').forEach((a) => {
      a.classList.toggle('on', a.dataset.m === current);
      if (a.dataset.m === current) a.setAttribute('aria-current', 'page');
      else a.removeAttribute?.('aria-current');
    });
    document.querySelectorAll('[data-mobile-page]').forEach((b) => {
      b.classList.toggle('on', b.dataset.mobilePage === current);
      b.setAttribute('aria-pressed', String(b.dataset.mobilePage === current));
    });
    ['page-breadcrumb', 'page-eyebrow', 'page-title', 'page-subtitle'].forEach((id, i) => {
      const target = document.getElementById(id);
      if (target) target.textContent = meta[i];
    });
    document.title = meta[0] + ' · 知护';
    const profile = document.querySelector('.header-profile > span');
    if (profile) profile.textContent = COURSE ? '课程训练' : '自由学习';
  }

  // ---------- 学习工作台：沿用真实专业、学习路线和本机学习档案 ----------
  function renderWelcome() { renderWorkbench(); }
  function renderWorkbench(selectedMajor = S.major) {
    setSteps('welcome'); setNav('workbench');
    const majors = D.startup.major_options || [];
    $app.innerHTML = `
      <section class="card profession-panel" aria-labelledby="profession-title">
        <div class="profession-heading"><div><div class="care-eyebrow">01 / YOUR PROFESSION</div><h2 id="profession-title">选择你的专业方向</h2><p class="lead">从你熟悉的专业出发，让每一次练习更贴近未来的工作。</p></div><img src="care-leaf.svg" alt=""></div>
        <div class="profession-grid" role="group" aria-labelledby="profession-title">
          ${majors.map((m, i) => {
            const hint = m.major_id === 'other' ? '从通用健康知识与社区健康服务开始，逐步找到适合自己的方向。'
              : String(m.hint || '').split('：').slice(1).join('：');
            return `<button type="button" class="profession-card${m.major_id === selectedMajor ? ' on' : ''}" id="home-major-${esc(m.major_id)}" aria-pressed="${m.major_id === selectedMajor}"><span class="profession-number">${String(i + 1).padStart(2, '0')}</span><span class="profession-copy"><strong>${esc(m.label)}</strong><span>${esc(hint || '按本专业匹配知识点与病例训练。')}</span></span><span class="profession-check" aria-hidden="true">✓</span></button>`;
          }).join('')}
        </div>
        <p class="profession-selection">点击专业卡片，进入下一步选择学习方式。</p>
      </section>
    `;
    majors.forEach(m => {
      document.getElementById('home-major-' + m.major_id).onclick = () => renderLearningChoice(m.major_id);
    });
  }

  function renderLearningChoice(selectedMajor = S.major) {
    const selected = (D.startup.major_options || []).find(m => m.major_id === selectedMajor);
    if (!selected) return renderWorkbench();
    setSteps('major'); setNav('workbench');
    const history = selectedMajor === S.major && window.ZH_STORE ? window.ZH_STORE.summary(selectedMajor) : null;
    const lastCase = history?.cases?.length ? history.cases[history.cases.length - 1] : null;
    const accuracy = history?.attempts ? history.accuracy : null;
    const practice = typeof lastCase?.total === 'number' ? Math.max(0, Math.min(100, lastCase.total)) : null;
    $app.innerHTML = `
      <div class="learning-choice-heading"><div><h2 class="section-label" id="learning-choice-title" tabindex="-1"><small>02</small>选择学习方式</h2><p class="learning-choice-major">当前专业 · ${esc(selected.label)}</p></div><button type="button" class="btn ghost sm" id="change-profession">← 返回更换专业</button></div>
      <section class="studio-overview" aria-label="本专业本机学习概览"><h3>学习概览<small>本机记录</small></h3><div><span>已完成自测</span><strong>${history?.attempts || 0}<small>次</small></strong></div><div><span>待巩固错题</span><strong>${history?.wrong?.length || 0}<small>道</small></strong></div><div><span>自测正确率</span><strong>${accuracy === null ? '—' : accuracy + '%'}</strong></div></section>
      <div class="studio-grid"><section class="studio-tasks" aria-labelledby="studio-tasks-title"><div class="studio-section-head"><h3 id="studio-tasks-title">今天，从这里开始</h3><span>选择一项开始学习</span></div>
        <div class="learning-paths">
          <button class="path-card" id="choose-quiz"><span class="task-number">01</span><span class="task-copy"><strong>只答题</strong><span>按专业与难度自测，巩固知识与错题。</span></span><span class="task-tag">知识自测</span><span class="path-action">进入自测 <span aria-hidden="true">→</span></span></button>
          <button class="path-card" id="choose-case"><span class="task-number">02</span><span class="task-copy"><strong>直接病例训练</strong><span>研读病例、采集信息，练习分析与对话。</span></span><span class="task-tag">情境实践</span><span class="path-action">选择病例 <span aria-hidden="true">→</span></span></button>
          <button class="path-card featured" id="choose-complete"><span class="task-number">03</span><span class="task-copy"><strong>完整流程</strong><span>5 题自测 → 薄弱讲解 → 病例训练 → 复盘。</span></span><span class="task-tag">系统训练</span><span class="path-action">开始训练 <span aria-hidden="true">→</span></span></button>
        </div>
      </section><aside class="studio-progress" aria-labelledby="studio-progress-title"><h3 id="studio-progress-title">学习表现</h3><div class="studio-progress-item"><label>知识自测 <b>${accuracy === null ? '暂无记录' : accuracy + '%'}</b></label><div class="studio-meter"${accuracy === null ? '' : ` role="meter" aria-label="自测正确率" aria-valuemin="0" aria-valuemax="100" aria-valuenow="${accuracy}"`}><i style="width:${accuracy ?? 0}%"></i></div></div><div class="studio-progress-item"><label>最近病例评分 <b>${practice === null ? '暂无记录' : practice + '/100'}</b></label><div class="studio-meter"${practice === null ? '' : ` role="meter" aria-label="最近病例评分" aria-valuemin="0" aria-valuemax="100" aria-valuenow="${practice}"`}><i style="width:${practice ?? 0}%"></i></div></div><p>完成练习后，这里会更新你的学习表现。</p></aside></div>
      <p class="hint" id="home-status" role="status" aria-live="polite">选择你今天的学习方式，即可开始 ${esc(selected.label)} 训练。</p>
      ${history && !history.empty ? `<section class="home-record"><div><b>你的学习足迹</b><p>自测 ${history.attempts} 次 · 正确率 ${history.attempts ? history.accuracy + '%' : '暂无'} · 待巩固错题 ${history.wrong.length} 道 · 最近病例记录 ${history.cases.length} 次</p></div><button class="btn ghost sm" id="home-archive">查看学习档案 →</button></section>` : ''}
      <div class="quick-resources"><span>随时查阅</span><button id="home-textbooks">医学教材库 ↗</button><button id="home-experience">指南经验库 ↗</button><button id="home-qa">知识点答疑 ↗</button><a href="classroom.html">课程空间 · 师生登录 →</a></div>
    `;
    document.getElementById('change-profession').onclick = () => {
      renderWorkbench(selectedMajor);
      window.scrollTo?.({ top: 0, behavior: 'instant' });
      document.getElementById('home-major-' + selectedMajor)?.focus({ preventScroll: true });
    };
    const begin = async path => {
      S.major = selectedMajor;
      document.getElementById('home-status').textContent = '正在准备本次训练…';
      return startLearningPath(path);
    };
    document.getElementById('choose-quiz').onclick = () => begin('quiz');
    document.getElementById('choose-case').onclick = () => begin('case');
    document.getElementById('choose-complete').onclick = () => begin('complete');
    document.getElementById('home-textbooks').onclick = () => learningResourcesAllowed() && window.ZH_TEXTBOOKS?.open();
    document.getElementById('home-experience').onclick = () => learningResourcesAllowed() && window.ZH_EXPERIENCE?.open('');
    document.getElementById('home-qa').onclick = () => learningResourcesAllowed() && openQA('');
    if (history && !history.empty) document.getElementById('home-archive').onclick = goSummary;
    window.scrollTo?.({ top: 0, behavior: 'instant' });
    document.getElementById('learning-choice-title').focus({ preventScroll: true });
  }

  function learningResourcesAllowed() {
    if (S.experienceAssessmentActive || (S.currentCase && S.learningMode === 'assessment' && !S.scoreResult)) {
      setBubble('请先完成自测或独立测评，再查阅学习资源。'); return false;
    }
    return true;
  }
  function goResources() {
    if (!learningResourcesAllowed()) return;
    setNav('resources');
    $app.innerHTML = `<div class="resource-grid">
      <section class="card resource-card"><div class="care-eyebrow">01 / TEXTBOOK LIBRARY</div><h2>医学教材库</h2><p>按书名与正文关键词查找完整教材。支持逐页阅读、原书查看与页码跳转，回到原文核对出处。</p><button class="btn" id="resource-textbooks">查阅教材 →</button></section>
      <section class="card resource-card"><div class="care-eyebrow">02 / GUIDELINES & EXPERIENCE</div><h2>指南经验库</h2><p>检索指南依据与带教参考，结合当前病例梳理信息采集、证据与沟通思路。</p><button class="btn ghost" id="resource-experience">检索指南 →</button></section>
      <section class="card resource-card"><div class="care-eyebrow">03 / ASK ZHIHU</div><h2>知识点答疑</h2><p>围绕知识卡提问，理解结论、常见误区与适用边界，并查看对应的来源。</p><button class="btn ghost" id="resource-qa">提出问题 →</button></section>
    </div><div class="resource-footnote"><b>带着问题读，也带着依据练。</b><br>教材与指南用于专业学习。自测作答与独立测评期间，请先独立完成，再回到这里查阅与复习。</div>`;
    document.getElementById('resource-textbooks').onclick = () => window.ZH_TEXTBOOKS?.open();
    document.getElementById('resource-experience').onclick = () => window.ZH_EXPERIENCE?.open('');
    document.getElementById('resource-qa').onclick = () => openQA('');
  }

  function goLearningChoice() { renderLearningChoice(); }

  async function startLearningPath(path) {
    if (COURSE) path = COURSE.kind;
    // 主动选择新路线即开新一轮；只练病例不能偷偷沿用上一轮错题推荐。
    document.querySelectorAll('#app button').forEach((b) => { b.disabled = true; });
    S.learningPath = path;
    S.pretest = null; S.pretestDetail = null;
    S.currentCase = null; S.casePrivate = null;
    S.sessionId = genSessionId();
    S.caseScene = 'default';
    S.experienceAssessmentActive = false;
    resetCaseState();
    MCP.sessionId = null; MCP.cases = []; MCP.recommendationNote = '';
    try { await MCP.ensureSession(S.major); } catch (e) {
      if (COURSE) return COURSE.fail(e.message);
      MCP.sessionId = null;
    }
    if (path === 'case') return goCases();
    return goPretest();
  }

  function genSessionId() {
    const d = new Date();
    const p = (n) => String(n).padStart(2, '0');
    const ts = `${d.getFullYear()}${p(d.getMonth() + 1)}${p(d.getDate())}${p(d.getHours())}${p(d.getMinutes())}${p(d.getSeconds())}`;
    return `ZH-${ts}-${Math.random().toString(16).slice(2, 10)}`;
  }

  // ---------- 自测 ----------
  // ③ 四档进阶（基础/提高/困难/专家）+ ④ 英语专业素养档；实际可用档位由题库决定，
  // 不写死，缺哪档就不显示哪档，避免点进去静默回落成基础题。
  const LEVEL_META = {
    basic: { label: '基础', hint: '入门必会，先保证不丢分' },
    intermediate: { label: '提高', hint: '临床常见情境的判断题' },
    advanced: { label: '困难', hint: '容易讲错的易混点' },
    expert: { label: '专家', hint: '综合判断与边界条件' },
    english: { label: '英语', hint: '医学英语术语与表达（专业素养）' },
  };
  function pretestLevels() {
    const list = (S.major && ZH.listLevels(S.major)) || ['basic'];
    return list.map((id) => ({
      id,
      label: (LEVEL_META[id] || {}).label || id,
      hint: (LEVEL_META[id] || {}).hint || '',
    }));
  }
  let pretestLevel = 'basic';

  async function goPretest(retryIds) {
    if (COURSE && (COURSE.kind !== 'quiz' || S.pretest)) return;
    if (S.currentCase) {
      MCP.sessionId = null; MCP.cases = [];
      S.currentCase = null; S.casePrivate = null; S.pretest = null;
      try { await MCP.ensureSession(S.major); } catch (e) { MCP.sessionId = null; }
    }
    S.experienceAssessmentActive = true;
    setSteps('pretest'); setNav('quiz');
    S.pretestAnswers = {};
    const byIds = Array.isArray(retryIds) && retryIds.length ? retryIds : null;
    // 换专业后原档位可能不存在，回落到可用档
    const available = pretestLevels().map((l) => l.id);
    if (available.indexOf(pretestLevel) < 0) pretestLevel = available[0] || 'basic';
    $app.innerHTML = `
      <div class="quiz-layout"><div class="card">
        <h2>${byIds ? '错题重练' : (S.learningPath === 'quiz' ? '专项答题' : '能力自测')}</h2>
        <p class="lead" id="pretest-lead">正在从知护题库取题…</p>
        <div id="quiz"></div>
        <div class="divider"></div>
        <button class="btn block" id="btn-submit" disabled>提交自测</button>
      </div><aside class="card quiz-aside" aria-label="答题进度"><div class="care-eyebrow">YOUR PROGRESS</div><h3>本次自测</h3><p id="quiz-progress-text" role="status" aria-live="polite">正在准备题目…</p><div class="quiz-progress"><i id="quiz-progress-fill"></i></div><div class="question-map" id="question-map"></div><p class="hint">实心题号表示已作答。点击题号可跳转，全部完成后提交。</p><p>先独立思考，再回看依据。</p></aside></div>
    `;
    let questions = null;
    let fromMcp = false;
    const questionCount = S.learningPath === 'quiz' ? 20 : 5;
    let quantityNote = '';
    if (MCP.sessionId && !byIds) {
      try {
        const r = await MCP.call('get_pretest', { session_id: MCP.sessionId, level: pretestLevel, question_count: questionCount });
        questions = (Array.isArray(r.questions) ? r.questions : [])
          .map((q) => ({ question_id: q.question_id, stem: q.stem, options: q.options, type: q.type || 'single_choice' }))
          .filter((q) => q.question_id && q.options);
        pretestLevel = r.level || pretestLevel;
        S.pretestAttemptId = r.attempt_id || null;
        S.pretestOptionMaps = null;
        fromMcp = questions.length > 0;
        quantityNote = r.quantity_note || '';
      } catch (e) {
        if (COURSE) return COURSE.fail(e.message);
        questions = null;
      }
    }
    if (!questions || !questions.length) {
      if (COURSE) return COURSE.fail('课程题库暂不可用，请返回课程空间重试');
      const rawPaper = ZH.buildPaper(S.major, pretestLevel, byIds, questionCount);
      if (!byIds && rawPaper.length < questionCount) quantityNote = `本档可用题不足 ${questionCount} 道，当前展示全部 ${rawPaper.length} 道，不重复补数。`;
      const attempt = ZH.randomizePaper(rawPaper, `${Date.now()}-${Math.random()}`);
      questions = attempt.questions;
      S.pretestAttemptId = attempt.attemptId;
      S.pretestOptionMaps = attempt.optionMaps;
    }
    const paper = questions;
    S.pretestQuestions = paper;
    // 出题与批改必须用同一组题号，否则本地批改会按另一批题算分
    S.pretestIds = paper.map((q) => q.question_id);

    const lead = document.getElementById('pretest-lead');
    if (lead) {
      lead.innerHTML = byIds
        ? `从你的错题集里抽了 ${paper.length} 道重新作答。答对即从错题集销账。`
        : `${S.learningPath === 'quiz' ? '专项答题' : '完整流程自测'} · ${paper.length} 道题。答完提交后，知护会指出薄弱节点。${esc(quantityNote)}`
          + `<span class="pill ${fromMcp ? 'ok' : 'warn'}" style="margin-left:8px">${fromMcp ? '题库直连 MCP' : '本地题库'}</span>`;
    }
    // ③ 进阶档位：每档显示历史最好成绩，让"进阶"看得见
    const store = window.ZH_STORE;
    const sum = store ? store.summary(S.major) : null;
    const levelBar = document.createElement('div');
    levelBar.className = 'level-bar';
    levelBar.innerHTML = byIds ? '' : pretestLevels().map((lv) => {
      const rec = sum && sum.levels[lv.id] ? sum.levels[lv.id] : null;
      const badge = rec ? `<span class="lv-best">最好正确率 ${rec.best_pct ?? Math.min(100, Math.round(rec.best / 5 * 100))}%</span>` : '';
      return `<button class="btn ${lv.id === pretestLevel ? '' : 'ghost'} sm" data-level="${lv.id}" ${lv.id === pretestLevel ? 'disabled' : ''}>${lv.label}${badge}</button>`;
    }).join('') + (byIds ? '' : `<span class="lv-hint">${esc(((pretestLevels().find((l) => l.id === pretestLevel) || {}).hint) || '')}</span>`);
    const card = document.querySelector('#app .card');
    if (card) {
      card.insertBefore(levelBar, card.querySelector('#quiz'));
      levelBar.querySelectorAll('button[data-level]').forEach((b) => {
        b.addEventListener('click', () => { pretestLevel = b.dataset.level; goPretest(); });
      });
    }

    const quiz = document.getElementById('quiz');
    quiz.innerHTML = paper.map((q, i) => `
      <div class="kcard" id="question-${i + 1}" style="margin-top:18px;border-left-color:var(--hu-amber)">
        <div class="k-title">第 ${i + 1} 题 · ${esc(q.stem)}${q.type === 'multiple_choice' ? '<span class="tag warn" style="margin-left:8px">多选</span>' : ''}</div>
        <div class="q-options">
          ${Object.entries(q.options).map(([k, v]) => `
            <button class="q-opt" aria-pressed="false" data-q="${esc(q.question_id)}" data-opt="${esc(k)}">
              <span class="tag">${esc(k)}</span><span>${esc(v)}</span>
            </button>`).join('')}
        </div>
      </div>`).join('');

    const questionMap = document.getElementById('question-map');
    questionMap.innerHTML = paper.map((q, i) => `<button type="button" data-quiz-jump="${i + 1}" aria-label="第 ${i + 1} 题，未作答">${i + 1}</button>`).join('');
    questionMap.querySelectorAll('[data-quiz-jump]').forEach(b => b.addEventListener('click', () => {
      const target = document.getElementById('question-' + b.dataset.quizJump);
      if (target) { target.setAttribute('tabindex', '-1'); target.focus({preventScroll:true}); target.scrollIntoView({block:'start'}); }
    }));
    const updateProgress = () => {
      const answered = Object.keys(S.pretestAnswers).length;
      document.getElementById('quiz-progress-text').textContent = `已作答 ${answered} / ${paper.length} 题`;
      document.getElementById('quiz-progress-fill').style.width = (paper.length ? answered / paper.length * 100 : 0) + '%';
      questionMap.querySelectorAll('[data-quiz-jump]').forEach(b => {
        const done = Boolean(S.pretestAnswers[paper[Number(b.dataset.quizJump) - 1].question_id]);
        b.classList.toggle('answered', done);
        b.setAttribute('aria-label', `第 ${b.dataset.quizJump} 题，${done ? '已作答' : '未作答'}`);
      });
      quiz.querySelectorAll('.q-opt').forEach(b => b.setAttribute('aria-pressed', String(Boolean(S.pretestAnswers[b.dataset.q]?.includes(b.dataset.opt)))));
    };
    updateProgress();
    quiz.querySelectorAll('.q-opt').forEach((o) => {
      o.addEventListener('click', () => {
        const qid = o.dataset.q;
        const q = paper.find((item) => item.question_id === qid) || {};
        if (q.type === 'multiple_choice') {
          o.classList.toggle('sel');
          S.pretestAnswers[qid] = Array.from(quiz.querySelectorAll(`.q-opt.sel[data-q="${qid}"]`))
            .map((x) => x.dataset.opt).sort().join('');
          if (!S.pretestAnswers[qid]) delete S.pretestAnswers[qid];
        } else {
          quiz.querySelectorAll(`.q-opt[data-q="${qid}"]`).forEach((x) => x.classList.remove('sel'));
          o.classList.add('sel');
          S.pretestAnswers[qid] = o.dataset.opt;
        }
        document.getElementById('btn-submit').disabled = Object.keys(S.pretestAnswers).length < paper.length;
        updateProgress();
      });
    });
    document.getElementById('btn-submit').addEventListener('click', async () => {
      const submitBtn = document.getElementById('btn-submit');
      submitBtn.disabled = true;
      submitBtn.textContent = '正在批改…';
      let result = null;
      if (MCP.sessionId && fromMcp) {
        try {
          const r = await MCP.call('submit_pretest', { session_id: MCP.sessionId, answers: S.pretestAnswers });
          result = normalizePretest(r);
        } catch (e) {
          if (COURSE) return COURSE.fail(e.message);
          result = null;
        }
      }
      if (!result && COURSE) return COURSE.fail('课程成绩尚未提交成功，请返回课程空间检查');
      if (!result) result = ZH.checkPretest({ answers: S.pretestAnswers }, S.major, pretestLevel, S.pretestIds, S.pretestOptionMaps);
      S.pretest = result;
      if (result.source === 'mcp') {
        MCP.cases = []; MCP.relatedCases = []; MCP.randomCases = []; MCP.recommendationAudit = [];
      }
      S.experienceAssessmentActive = false;
      // 逐题回显要题面、正确答案与解析卡：统一在引擎里拼好，渲染层只负责画
      S.pretestDetail = result.source === 'mcp' && result.item_results.length
        ? mcpDetailRows(result.item_results)
        : ZH.gradePaper(S.pretestQuestions || S.pretestIds, S.pretestAnswers, S.pretestOptionMaps);
      // ② 学习档案：每次自测都落库，才能在总结页看"错了几次""哪几个点一直错"
      if (window.ZH_STORE) window.ZH_STORE.recordPretest(S.major, pretestLevel, S.pretestDetail);
      const wrongN = (S.pretestDetail || []).filter((r) => !r.correct).length;
      setBubble(`自测得分 ${result.score}/${result.max_score}，${wrongN ? `有 ${wrongN} 道题需要巩固，已记入学习档案` : '基础很扎实！'}`);
      renderGraded();
    });
  }

  // ---------- 批改结果（逐题回显 + 四段解析） ----------
  function optText(row, key) {
    const t = row.options && row.options[key];
    return t ? `「${esc(t)}」` : '';
  }

  function optionRows(row) {
    return Object.entries(row.options || {}).map(([k, v]) => {
      const isAnswer = String(row.answer || '').includes(String(k));
      const isChosen = String(row.chosen || '').includes(String(k));
      const cls = isAnswer ? 'correct' : (isChosen ? 'wrong' : '');
      const mark = isAnswer ? '✓ 正确答案' : (isChosen ? '✕ 你选的' : '');
      return `<div class="q-opt ${cls}">
        <span class="tag">${esc(k)}</span><span>${esc(v)}</span>
        ${mark ? `<span class="opt-mark ${cls}">${mark}</span>` : ''}
      </div>`;
    }).join('');
  }

  // 解析卡上的四段（结论 / 说人话 / 常见误区 / 边界与例外）+ 依据与原文
  // ① 题库导入的碎片卡（标题是题干碎片）不再当"知识卡"展示标题，
  //   但仍用它承载的 claim 作为本题解析正文，并明确标出"题库解析"。
  function textbookReference(card) {
    if (!card || !card.textbook_reference) return '';
    return `<div><b>教材依据：</b>${esc(card.textbook_reference)}<span class="hint-inline">${esc(card.textbook_review || '待教师复核')}</span></div>`;
  }
  function explainBox(row, answer) {
    const card = (row && (row.card || row.card_imported)) || null;
    const ans = (answer !== undefined && answer !== null && answer !== '') ? answer : (row && row.answer);
    const imported = !!(row && row.card_kind === 'bank_import');
    if (!card) {
      const inline = row && row.explanation ? `<div class="exp-body">${esc(row.explanation)}</div>` : '';
      const src = row && row.source
        ? `<div><b>来源：</b>${esc(row.source)}${row.source_note ? `<span class="hint-inline">${esc(row.source_note)}</span>` : ''}</div>`
        : '<div style="color:var(--hu-amber)">该题尚未关联课程知识卡，解析内容来自题库维护记录。</div>';
      return `<div class="exp-box"><div class="exp-head">解析<span class="tag">答案 ${esc(ans || '—')}</span></div>
        ${inline || '<div class="exp-body" style="color:var(--hu-muted)">这道题暂无配套解析卡，可在知识卡库按考点检索。</div>'}
        <div class="exp-ref">${src}
          <div><button class="btn ghost sm" data-ask="${esc((row && row.question_id) || '')}">还是不懂，问知护 →</button></div>
        </div>
      </div>`;
    }
    const rows = [];
    if (card.lay_terms && card.lay_terms.length) {
      rows.push(`<div class="exp-row"><span class="exp-label">说人话</span>${esc(card.lay_terms.join('；'))}</div>`);
    }
    if (card.misconceptions && card.misconceptions.length) {
      rows.push(`<div class="exp-row"><span class="exp-label">常见误区</span>${esc(card.misconceptions.join('；'))}</div>`);
    }
    if (card.exceptions) {
      rows.push(`<div class="exp-row"><span class="exp-label">边界与例外</span>${esc(card.exceptions)}</div>`);
    }
    const refLine = card.source
      ? `${esc(card.source)}${card.version ? ' · ' + esc(card.version) : ''}`
      : '知识卡未标注来源';
    return `<div class="exp-box">
      <div class="exp-head">解析<span class="tag">答案 ${esc(ans || '—')}</span>${imported && !card.textbook_reference ? '<span class="tag warn">题库解析</span>' : ''}</div>
      <div class="exp-body">${esc(card.claim || '')}</div>
      ${rows.join('')}
      <div class="exp-ref">
        ${textbookReference(card)}
        <div><b>${imported ? '解析来源：' : '依据：'}</b>${refLine}</div>
        ${card.source_location ? `<div><b>原文：</b>${esc(card.source_location)}</div>` : ''}
        ${card.source_url ? `<div><a href="${esc(card.source_url)}" target="_blank" rel="noopener">查看公开来源</a></div>` : ''}
        ${imported && !card.textbook_reference ? '<div style="color:var(--hu-amber)">本题解析为题库批量导入，暂未关联课程知识卡；内容保留原解析，出处待课程团队补充。</div>' : ''}
        <div><button class="btn ghost sm" data-ask="${esc((row && row.question_id) || '')}">还是不懂，问知护 →</button></div>
      </div>
    </div>`;
  }

  function renderGraded() {
    setSteps('pretest'); setNav('quiz');
    const detail = S.pretestDetail || [];
    const total = detail.length;
    const right = detail.filter((r) => r.correct).length;
    const wrong = total - right;
    const pct = total ? Math.round((right / total) * 100) : 0;
    const wrongList = detail.filter((r) => !r.correct);
    $app.innerHTML = `
      <div class="card">
        <h2>${S.learningPath === 'quiz' ? '专项答题 · 本轮已完成' : '批改结果'}</h2>
        <div class="graded-sum">
          <div style="font-size:16px;font-weight:700">批改完成 · ${right}/${total} 题正确（${pct}%）</div>
          ${wrong
            ? `<div style="margin-top:6px">有 ${wrong} 题答错：<span style="color:#b4453a">红色</span>是你选错的选项，<span style="color:#2f7d63">绿色</span>是正确答案。</div>`
            : '<div style="margin-top:6px">全部答对！可以继续练题，也可以选择其他学习方式。</div>'}
          <div class="legend">
            <span><i class="dot ok"></i>绿色 = 正确答案</span>
            <span><i class="dot bad"></i>红色 = 你选的选项</span>
          </div>
          <div style="margin-top:8px;font-size:12.5px;color:var(--hu-muted)">每次自测都已记入学习档案：总结页可以看知识点错误次数、能力六边形和考前清单。</div>
        </div>
        <section class="graded-actions" aria-label="本轮学习操作">
          <div class="graded-next"><div><h3>接下来，巩固这次的收获</h3><p>${S.learningPath === 'quiz' ? '本轮答题已完成，复习解析后即可结束，无需进入病例训练。' : '先理解薄弱考点，再把知识放进病例情境。'}</p></div><div class="graded-primary"><button class="btn" id="btn-to-explain">${S.learningPath === 'quiz' ? '复习本次考点解析' : '查看薄弱点讲解'} <span aria-hidden="true">→</span></button><button class="btn ghost" id="btn-learning-choice">${S.learningPath === 'quiz' ? '结束本轮，返回选择学习方式' : '返回选择学习方式'}</button></div></div>
          <details class="graded-more"${COURSE ? ' hidden' : ''}><summary>更多操作 <span aria-hidden="true">＋</span></summary><div class="graded-tools"><button class="btn ghost sm" id="btn-summary">学习总结与错题集</button><button class="btn ghost sm" id="btn-retry">${S.learningPath === 'quiz' ? '再练一组题' : '重新自测'}</button>${wrongList.length ? `<button class="btn ghost sm" id="btn-retry-wrong">只练这 ${wrongList.length} 道错题</button>` : ''}</div></details>
          <div class="graded-transfer"${COURSE ? ' hidden' : ''}><div><strong>把知识用在病例里</strong><p>${S.learningPath === 'quiz' ? (wrong ? '主动切换训练方式，保留本轮错题并推荐关联病例。' : '本轮没有错题，将随机推荐病例。') : '结合本次错题，选择关联病例继续训练。'}</p></div><button class="btn ghost sm" id="btn-graded-case">${S.learningPath === 'quiz' ? (wrong ? '切换到错题病例训练' : '切换到病例训练') : '按本次错题推荐病例'} <span aria-hidden="true">→</span></button></div>
        </section>
        <div class="graded-review-heading"><h3>逐题回看</h3><span>点击题目展开解析</span></div>
        ${detail.map((row, index) => `
          <details class="kcard graded-question" name="graded-questions"${index === 0 ? ' open' : ''} style="border-left-color:${row.correct ? '#2f7d63' : '#b4453a'}">
            <summary><span class="graded-question-no">${String(row.no).padStart(2, '0')}</span><span class="k-title">第 ${row.no} 题 · ${esc(row.stem)}</span><span class="pill ${row.correct ? 'ok' : 'bad'}">${row.correct ? '正确' : '待巩固'}</span></summary>
            <div class="graded-question-body">
            <div class="q-options">${optionRows(row)}</div>
            <div class="graded-line ${row.correct ? 'ok' : 'bad'}">
              ${row.correct
                ? '✓ 答对了'
                : `✕ 答错了　你选了 ${esc(row.chosen || '（未作答）')}，正确答案是 ${esc(row.answer || '—')}`}
            </div>
            ${explainBox(row, row.answer)}
            </div>
          </details>`).join('')}
      </div>
    `;
    document.getElementById('btn-to-explain').addEventListener('click', () => goExplain());
    document.getElementById('btn-learning-choice').addEventListener('click', () => goLearningChoice());
    document.getElementById('btn-graded-case').addEventListener('click', () => enterCaseTraining());
    document.getElementById('btn-summary').addEventListener('click', () => goSummary());
    document.getElementById('btn-retry').addEventListener('click', () => goPretest());
    const rw = document.getElementById('btn-retry-wrong');
    if (rw) rw.addEventListener('click', () => goPretest(wrongList.map((w) => w.question_id)));
    if (COURSE) {
      ['btn-graded-case','btn-learning-choice','btn-summary','btn-retry','btn-retry-wrong'].forEach(id => {
        const button = document.getElementById(id); if (button) button.hidden = true;
      });
      $app.querySelector('.graded-sum').insertAdjacentHTML('beforeend', '<p>本轮成绩已提交，等待教师复核发布。<a href="classroom.html">返回课程查看进度与成绩</a></p>');
    }
    wireAskButtons();
  }

  // ---------- 知识讲解（按考点聚合） ----------
  function goExplain() {
    setSteps('explain'); setNav('weak');
    const detail = S.pretestDetail || [];
    const total = detail.length;
    const right = detail.filter((r) => r.correct).length;
    const wrong = Math.max(0, total - right);
    // 错得多的考点排前面
    const groups = ZH.groupWeakPoints(detail).sort((a, b) => b.items.length - a.items.length);

    // 错题全落在没有配套知识卡的考点上时，回退到本专业的基础知识卡，而不是只说"未收录"
    let fallbackCards = [];
    let fallbackNote = '';
    if (wrong > 0 && groups.every((g) => !g.card)) {
      const seen = new Set();
      (ZH.retrieveKnowledge(S.major, null).knowledge_cards || []).slice(0, 3).forEach((c) => {
        if (!seen.has(c.knowledge_id)) { seen.add(c.knowledge_id); fallbackCards.push(c); }
      });
      if (fallbackCards.length) fallbackNote = '这次错题集中在题库补充考点，暂无对应的专项知识卡；先看本专业的基础知识卡。';
    }

    const summary = total
      ? `本次自测 ${total} 题（${right}/${total} 分），${wrong ? `答错 ${wrong} 题，归成 ${groups.length} 个考点。下面按考点讲结论，每题的具体对错在考点里带一行。` : '全部答对，没有薄弱考点。'}`
      : '还没有自测记录，先做一次自测再来。';

    $app.innerHTML = `
      <div class="card">
        <h2>${S.learningPath === 'quiz' ? '专项答题 · 考点复习' : '薄弱知识点讲解'}</h2>
        <p class="lead">${esc(summary)}</p>
        ${fallbackNote ? `<p class="lead" style="color:var(--hu-amber)">${esc(fallbackNote)}</p>` : ''}
        ${weakSummaryBlock()}
        ${groups.map((g, i) => `
          <div class="kcard">
            <div class="point-head">
              <span class="point-no">考点 ${i + 1}</span>
              <span class="k-title" style="margin:0">${esc(g.title)}</span>
              <span class="point-badge">错 ${g.items.length} 题</span>
            </div>
            ${g.card && g.card.claim ? `<div class="exp-row"><span class="exp-label">一句话</span>${esc(g.card.claim)}</div>` : ''}
            ${g.items.map((it) => `
              <div class="exp-row" style="color:var(--hu-muted)">
                第 ${it.no} 题　你选的是 <b style="color:#b4453a">${esc(it.chosen || '（未作答）')}</b>${optText(it, it.chosen)}，正确的是 <b style="color:#2f7d63">${esc(it.answer || '—')}</b>${optText(it, it.answer)}
              </div>`).join('')}
            ${g.card ? `<div class="exp-ref">
              ${textbookReference(g.card)}
              <div><b>依据：</b>${esc(g.card.source || '未标注来源')}${g.card.version ? ' · ' + esc(g.card.version) : ''}</div>
              ${g.card.source_location ? `<div><b>原文：</b>${esc(g.card.source_location)}</div>` : ''}
            </div>` : ''}
            <button class="btn ghost sm" data-ask-group="${esc(g.title)}" style="margin-top:8px">这段没看懂，问知护 →</button>
          </div>`).join('')}
        ${fallbackCards.length ? fallbackCards.map((c) => `
          <div class="kcard">
            <div class="k-title">${esc(c.title)}</div>
            <div class="k-claim">${esc(c.claim || '')}</div>
            <div class="k-src">来源：${esc(c.source || '')} · ${esc(c.version || '')}</div>
          </div>`).join('') : ''}
        <div class="divider"></div>
        ${qaEntryHtml('这一页还是没看懂？直接问知护')}
        <div class="divider"></div>
        ${S.learningPath === 'quiz' ? `
          <p class="hint">本轮答题与解析复习已完成，无需进入病例训练。</p>
          <button class="btn block" id="btn-explain-finish">${COURSE ? '完成复习，返回课程' : '完成复习，返回选择学习方式'}</button>
          <button class="btn ghost block" id="btn-explain-retry" style="margin-top:10px">再练一组题</button>
        ` : '<button class="btn block" id="btn-go-case">下一步：进入病例训练 →</button>'}
        <button class="btn ghost block" id="btn-back-graded" style="margin-top:10px">返回批改结果</button>
        ${S.learningPath === 'quiz' && !COURSE ? `
          <div class="divider"></div>
          <p class="hint">${wrong ? '主动切换后，保留本轮错题并推荐关联病例候选。' : '本轮没有错题；主动切换后将随机推荐病例。'}</p>
          <button class="btn ghost block" id="btn-go-case">${wrong ? '切换到错题病例训练' : '切换到病例训练'}</button>
        ` : ''}
      </div>
    `;
    const caseButton = document.getElementById('btn-go-case');
    if (caseButton) caseButton.addEventListener('click', () => enterCaseTraining());
    const finishButton = document.getElementById('btn-explain-finish');
    if (finishButton) finishButton.addEventListener('click', () => COURSE ? (location.href = 'classroom.html') : goLearningChoice());
    const retryButton = document.getElementById('btn-explain-retry');
    if (retryButton) {
      retryButton.hidden = Boolean(COURSE);
      retryButton.addEventListener('click', () => goPretest());
    }
    document.getElementById('btn-back-graded').addEventListener('click', () => renderGraded());
    const gs = document.getElementById('btn-go-summary');
    if (gs) gs.addEventListener('click', () => goSummary());
    wireAskButtons();
  }

  // ---------- 病例研读 ----------
  function enterCaseTraining() {
    // 切换已有答题结果时保留会话与错题；新选「直接病例训练」仍由 startLearningPath 清空结果。
    if (COURSE && COURSE.kind !== 'case') return;
    if (S.learningPath === 'quiz') {
      if (S.experienceAssessmentActive || !S.pretest) return startLearningPath('case');
      S.learningPath = 'case';
      S.caseScene = 'default';
      setBubble('已切换到病例训练，本轮答题结果已保留，用于推荐病例候选。');
    }
    return goCases();
  }

  async function goCases(refresh) {
    if (COURSE && COURSE.kind !== 'case') return;
    if (S.currentCase) {
      const previousSession = S.pretest && S.pretest.source === 'mcp' ? MCP.sessionId : null;
      MCP.sessionId = null; MCP.cases = [];
      S.currentCase = null; S.casePrivate = null;
      try { await MCP.ensureSession(S.major, false, previousSession); } catch (e) { MCP.sessionId = null; }
    }
    setSteps('case'); setNav('cases');
    const scene = S.caseScene || 'default';
    $app.innerHTML = `
      <div class="card">
        <h2>选择病例</h2>
        <p class="lead" id="cases-lead">正在从知护病例库取推荐…</p>
        <div id="case-match-audit"></div>
        <div class="chips" id="scene-chips"></div>
        <div class="major-grid" id="case-grid"></div>
        <div class="divider"></div>
        <button class="btn block" id="btn-case-next" disabled>阅读病例详情</button>
      </div>
    `;
    let cases = [];
    let live = false;
    let poolSize = 0;
    // ⑧ 分专业默认场景：临床医学默认「医院门诊/急诊」，护理/康复/中医/医技保留本专业场景；
    // 场景仅过滤显示；不能用本地随机池替换已提交错题的推荐结果。
    const allPool = ZH.listCases(S.major);
    const defaultPool = ZH.listCases(S.major, null, { sceneOnly: true });
    const pool = (scene === 'default' ? defaultPool : allPool.filter((c) => c.scene_group === scene)) || [];
    const usable = pool.length ? pool : allPool;
    const targetedCaseCount = S.pretest
      ? (S.pretestDetail || []).filter(row => row.correct === false).length * 3
      : 0;
    if (MCP.sessionId && (!S.pretest || S.pretest.source === 'mcp')) {
      try {
        if (refresh || !MCP.cases.length) await MCP.ensureSession(S.major, true);
        const recommended = S.pretest ? MCP.relatedCases.concat(MCP.randomCases) : MCP.cases;
        cases = recommended.filter(c => scene === 'default' || allPool.some(local => local.case_id === c.case_id && local.scene_group === scene));
        poolSize = MCP.poolSize;
        live = true;
      } catch (e) {
        if (COURSE) return COURSE.fail(e.message);
        cases = []; live = false;
      }
    }
    if (!live) {
      if (COURSE) return COURSE.fail('课程病例服务暂不可用，请返回课程空间重试');
      const preferred = usable.filter((c) => c.recommended);
      // 「不确定 / 先通用训练」这类专业没有推荐池时，退化为全部病例，避免走进死胡同
      cases = preferred.length ? preferred : usable;
      if (scene === 'default') cases = cases.slice().sort(() => Math.random() - 0.5).slice(0, 4);
      poolSize = usable.length;
    }
    const lead = document.getElementById('cases-lead');
    if (lead) {
      const sceneNote = scene === 'default' && ZH.sceneDefaults(S.major).length
        ? `已按本专业默认场景（${ZH.sceneDefaults(S.major).join('、')}）筛选。`
        : (scene === 'default' ? '' : `当前只看「${scene}」场景。`);
      lead.innerHTML = (live
        ? (S.pretest
          ? `病例资源共 <b>${poolSize}</b> 例：${MCP.standardPoolSize} 个常规病例、${MCP.questionCasePoolSize} 个原题推理练习（非独立病例）；本轮列出 ${cases.length} 个常规候选和 <b>${targetedCaseCount}</b> 个原题推理选项。${esc(MCP.recommendationNote)}`
          : `病例资源共 <b>${poolSize}</b> 例：${MCP.standardPoolSize} 个常规病例、${MCP.questionCasePoolSize} 个原题推理练习（非独立病例）。本次随机列出 ${cases.length} 个常规病例。${esc(MCP.recommendationNote)}`)
          + `<span class="pill ok" style="margin-left:8px">病例库直连 MCP</span>`
          + `<button class="btn ghost sm" id="btn-shuffle" style="margin-left:8px">${S.pretest ? '更换普通练习' : '换一摞'}</button>`
        : `${sceneNote}${S.pretest
          ? `常规病例推荐服务不可用；本轮仍有 ${targetedCaseCount} 个原题推理练习，可直接选择。`
          : '以下是本地病例，选一个开始训练。'}`);
    }
    const auditHost = document.getElementById('case-match-audit');
    if (S.pretest) {
      const wrongRows = (S.pretestDetail || []).filter(row => row.correct === false);
      const backendAudit = new Map((live ? MCP.recommendationAudit : []).map(row => [row.question_id, row]));
      const audit = wrongRows.map(row => backendAudit.get(row.question_id) || ({
        question_id: row.question_id, stem: row.stem,
        status: live ? 'unmatched' : 'unavailable', candidates: [],
        note: live ? '暂无已有完整病例与本题的明确关联；下方提供题库驱动的深度推演。'
          : '完整病例关联暂不可核验；下方题库驱动推演可继续使用。'
      }));
      const linked = audit.filter(row => row.status === 'related').length;
      const unmatched = audit.filter(row => row.status === 'unmatched').length;
      auditHost.innerHTML = `<p><b>本次 ${audit.length} 道错题：${linked} 道有关联完整病例，${unmatched} 道暂无对应完整病例。</b></p>
        <p class="hint-inline">每道错题另提供 3 种基于题库情境的深度推演。完整病例关联用于迁移练习；题目推演不自动评分，也不改变原评分标准。</p>
        ${live && MCP.recommendationResourceStatus !== 'ready' ? '<p>病例关联资源未完全可用；题库驱动的深度推演仍可使用。</p>' : ''}
        ${audit.map(row => `<section class="qcase-question">
          <h4>${esc(row.question_id)} · ${esc(row.stem)}</h4>
          <p>${row.status === 'related' ? '另有完整病例关联候选。' : row.status === 'unavailable' ? '完整病例关联暂不可核验。' : '暂无对应完整病例。'} ${esc(row.note)}</p>
          ${row.candidates.map(c => `<p><b>${esc(c.case_id)} · ${esc(c.label)}</b>${c.exam_point ? `<br><span class="hint-inline">具体考点：${esc(c.exam_point)}</span>` : ''}${c.training_task ? `<br><b>本例专项任务：</b>${esc(c.training_task)}` : '<br>此候选尚无本题专项任务绑定，仅供主题迁移。'}<br>${esc(c.basis || '')}${c.basis ? '<br>' : ''}${esc(c.limitation)}${c.review_status ? '<br>' + esc(c.review_status) : ''}</p>`).join('')}
          <p><b>本题另有 3 种原题推理练习（非新增完整病例）</b></p>
          <div class="q-case-options">${questionCaseChoices(row).map(v => `<button class="btn ghost sm q-case-launch" data-qid="${esc(row.question_id)}" data-qcase="${v.id}"><span class="q-case-id">${esc(v.case_id)}</span><br>${esc(v.label)}</button>`).join('')}</div>
          <p class="hint-inline">每项练习采用三阶段临床推理任务，围绕本题的具体考点训练；不补造原题没有的检查数据，不参与原病例评分。</p>
        </section>`).join('')}
        <button class="btn ghost sm" id="btn-review-wrong">返回本卷逐题解析</button><div class="divider"></div>`;
      document.getElementById('btn-review-wrong').onclick = renderGraded;
      auditHost.querySelectorAll('.q-case-launch').forEach(button => {
        button.addEventListener('click', () => {
          const row = (S.pretestDetail || []).find(item => item.question_id === button.dataset.qid);
          const auditRow = audit.find(item => item.question_id === button.dataset.qid);
          const variant = questionCaseChoices(auditRow)
            .find(item => item.id === button.dataset.qcase);
          if (row && variant) renderQuestionCaseTraining(row, variant);
        });
      });
    }
    // 场景筛选标签
    const chipHost = document.getElementById('scene-chips');
    const counts = {};
    allPool.forEach((c) => { counts[c.scene_group || '其他'] = (counts[c.scene_group || '其他'] || 0) + 1; });
    const keys = ['default'].concat(Object.keys(counts).sort((a, b) => counts[b] - counts[a]));
    chipHost.innerHTML = keys.map((k) => {
      const label = k === 'default' ? '默认场景' : k;
      const n = k === 'default' ? (defaultPool.length || allPool.length) : counts[k];
      return `<button class="chip ${k === scene ? 'on' : ''}" data-scene="${esc(k)}">${esc(label)}<span>${n}</span></button>`;
    }).join('');
    chipHost.querySelectorAll('button[data-scene]').forEach((b) => {
      b.addEventListener('click', () => { S.caseScene = b.dataset.scene; goCases(); });
    });
    const grid = document.getElementById('case-grid');
    const cardHtml = c => `
      <button class="major-card" data-case="${esc(c.case_id)}">
        <span class="m-name">${esc(c.title)}</span>
        <span class="m-hint">${esc(c.disease_label || '')}${c.variant_of ? ' · 变式' : ''}${c.case_type ? ' · ' + esc(c.case_type) : ''}</span>
        ${c.recommendation_reasons && c.recommendation_reasons.length ? `<span class="m-hint">错题关联：${c.recommendation_reasons.map((r) => `${esc(r.question_id)} · ${esc(r.label)}${r.exam_point ? `<br>具体考点：${esc(r.exam_point)}` : ''}<br>${esc(r.limitation || '')}`).join('<br>')}</span>` : (S.pretest ? '<span class="m-hint">普通练习 · 未建立本次错题关联</span>' : '')}
        <span class="check">✓</span>
      </button>`;
    if (S.pretest) {
      const related = live ? cases.filter(c => (c.recommendation_reasons || []).length) : [];
      const general = cases.filter(c => !live || !(c.recommendation_reasons || []).length);
      grid.innerHTML = `<div style="grid-column:1/-1"><h3>本次错题关联病例</h3>
        ${related.length ? `<div class="major-grid">${related.map(cardHtml).join('')}</div>`
          : `<p>${!live ? '错题推荐暂不可用。' : MCP.relatedCases.length ? '当前场景没有关联病例，可切回默认场景查看。' : '本次错题暂无对应病例，请先复习逐题解析。'}</p>`}
        <details id="general-case-practice"><summary>自选普通病例练习（${general.length} 个，与本次错题无已确认关联）</summary>
          <div class="major-grid">${general.map(cardHtml).join('') || '<p>该场景暂无普通病例。</p>'}</div></details></div>`;
    } else {
      grid.innerHTML = cases.map(cardHtml).join('') || '<p style="color:var(--hu-muted)">该场景下暂无病例，换一个场景试试</p>';
    }
    const shuffle = document.getElementById('btn-shuffle');
    if (shuffle) shuffle.addEventListener('click', () => goCases(true));
    let sel = null;
    grid.querySelectorAll('.major-card').forEach((c) => {
      c.addEventListener('click', () => {
        grid.querySelectorAll('.major-card').forEach((x) => x.classList.remove('on'));
        c.classList.add('on'); sel = c.dataset.case;
        document.getElementById('btn-case-next').disabled = false;
      });
    });
    document.getElementById('btn-case-next').addEventListener('click', async () => {
      if (!sel) return;
      const btn = document.getElementById('btn-case-next');
      btn.disabled = true;
      btn.textContent = '正在载入病例…';
      if (MCP.sessionId) {
        try {
          const r = await MCP.call('select_training_case', { session_id: MCP.sessionId, case_id: sel });
          const pub = r.public_case || r.case;
          if (pub && pub.public_profile) {
            // MCP 公开视图不含结构化问诊数据，用同源本地数据补齐（id 相同，内容一致）
            const local = ZH.getCase(sel, false).case;
            if (local) {
              if (!pub.structured) pub.structured = local.structured;
              ['case_type', 'disease_pattern', 'pattern_options', 'scene_group'].forEach((k) => {
                if (pub[k] === undefined && local[k] !== undefined) pub[k] = local[k];
              });
              ['sex', 'reliability', 'history_statement'].forEach((k) => {
                if (pub.public_profile[k] === undefined && local.public_profile && local.public_profile[k] !== undefined) {
                  pub.public_profile[k] = local.public_profile[k];
                }
              });
            }
            attachCaseObjectives(pub);
            S.currentCase = pub;
            S.experienceAssessmentActive = false;
            S.casePrivate = null;   // 私有设定在进入对话时由 get_sp_state 取回
            resetCaseState();
            S.spState = { emotion: '平静' };
            renderCase();
            return;
          }
        } catch (e) {
          if (COURSE) return COURSE.fail(e.message);
          MCP.sessionId = null; setBubble('病例服务暂不可用，已切换本地演示训练。');
        }
      }
      if (COURSE) return COURSE.fail('课程病例未成功载入，请返回课程空间重试');
      S.experienceAssessmentActive = false;
      loadCase(sel);
    });
  }

  function questionObjective(row) {
    const objective = D.clinical_objectives?.objectives?.[row?.question_id];
    return objective && objective.question_stem === row.stem ? objective : null;
  }

  function attachCaseObjectives(c) {
    if (!c) return;
    if (!S.pretest || S.experienceAssessmentActive) { c.learning_objectives = []; return; }
    if (Array.isArray(c.learning_objectives)) return;
    c.learning_objectives = (S.pretestDetail || []).filter(row => row.correct === false).flatMap(row => {
      const objective = questionObjective(row);
      if (!objective || !objective.case_ids.includes(c.case_id)) return [];
      const {question_id, exam_point, training_task, review_status} = objective;
      return [{question_id, exam_point, training_task, review_status}];
    });
  }

  function objectiveTasksHtml(inputs) {
    const rows = S.currentCase?.learning_objectives || [];
    if (!rows.length) return S.currentCase?.objective_resource_status && !['ready', 'not_applicable'].includes(S.currentCase.objective_resource_status)
      ? '<p>具体考点资源不可用或题目已变更，基本病例训练仍可使用。</p>' : '';
    return `<section class="exam-point"><h3>本次错题专项任务</h3>
      <p>结合本病例已采集的资料完成；缺少的数据请指出，不补造结果。专项推理待教师复核，不计入原评分。</p>
      ${rows.map(row => `<div class="field"><b>${esc(row.question_id)} · ${esc(row.exam_point)}</b><p>${esc(row.training_task)}</p>
      <p class="hint-inline">${esc(row.review_status)}</p>${inputs ? `<textarea class="input" data-objective="${esc(row.question_id)}" id="objective-${esc(row.question_id)}" rows="4" placeholder="记录证据、推理过程和仍缺的信息；仅填写合成材料">${esc(S.analysis.examReasoning?.[row.question_id] || '')}</textarea>` : ''}</div>`).join('')}</section>`;
  }

  function objectiveReviewHtml() {
    const rows = S.currentCase?.learning_objectives || [];
    if (!rows.length) return '';
    return `<section><h3>错题专项推理复盘（不计分）</h3>
      <p>以下是自查与教师复核材料，完成任务不代表已掌握本题。</p>
      ${rows.map(row => {
        const question = (S.pretestDetail || []).find(q => q.question_id === row.question_id) || {};
        const resource = questionObjective(question);
        const knowledge = question.card || question.card_imported || {};
        const reference = (knowledge.textbook_reference && knowledge.claim) || question.explanation || knowledge.claim || '题库未提供解析，请教师核对。';
        return `<article><h4>${esc(row.question_id)} · ${esc(row.exam_point)}</h4><p>${esc(row.training_task)}</p>
          <blockquote>${esc(S.analysis.examReasoning?.[row.question_id] || '本项未作答')}</blockquote>
          <p>自查：是否逐项给出证据、区分未知信息、说明适用条件与边界？病例未提供的检查不能当作正常结果。</p>
          ${resource?.review_note ? `<p>教学复核提示：${esc(resource.review_note)}</p>` : ''}
          <details><summary>核对原题参考（不作为本病例标准答案）</summary><p>${esc(reference)}</p>${textbookReference(knowledge)}<p>${esc(question.source || knowledge.source || '未标注出处')}；存疑处请教师复核。</p></details>
          <p>${esc(row.review_status)}；不自动判定正确，不改变病例评分。</p></article>`;
      }).join('')}${S.objectiveReportError ? '<p>专项推理服务端存档未成功，本页可继续自查。</p>' : ''}</section>`;
  }

  function questionCaseChoices(row) {
    if (!row) return [];
    if (Array.isArray(row.question_cases) && row.question_cases.length) {
      return row.question_cases.map((item, index) => ({
        ...item,
        id: `case-${String(index + 1).padStart(2, '0')}`,
        case_number: index + 1,
        label: item.title.split('：').pop(),
        stages: item.training_stages,
      }));
    }
    const subject = String(row.subject || row.node_id || '');
    const basicScience = /physiology|biochemistry|pathology|基础|病理|生理|生化/i.test(subject);
    const english = /english|医学英语/i.test(subject);
    const third = english
      ? { id: 'handoff', label: '术语辨析与规范表述', stages: [
        '将题干信息整理成规范、无推断的临床表述，并区分患者原话与客观信息。',
        '指出表达中容易混淆的术语或相近概念，并说明如何避免歧义。',
        '说明还需要哪些上下文才能把该表述用于完整交接；不要超出题目材料推断。'
      ] }
      : basicScience
        ? { id: 'mechanism', label: '机制链与边界检验', stages: [
          '从题干事实出发写出完整的机制或计算链，标注每一步依据。',
          '选一个容易混淆的相邻机制或解释，说明关键区分证据，以及当前材料是否足够。',
          '假设题干中的一个关键条件改变：说明哪些推理环节需要重做，哪些结论不能直接外推。'
        ] }
        : { id: 'reassessment', label: '病情演变与再评估', stages: [
          '建立当前病例的问题表征，按紧迫性排列最需要先处理或确认的问题，并说明依据。',
          '提出两个有竞争性的诊断或处置解释，逐项说明现有支持证据和仍缺的信息。',
          '假设关键事实发生变化：写出触发重新评估的信号、需要补充的数据和升级处理边界。'
        ] };
    const first = { id: 'integrated', label: '综合病例推理', stages: [
      '用一句话概括病例的核心问题，并把题干证据分成支持线索、反对线索和未知信息。',
      '写出从证据到结论的推理链，说明最关键的一步，避免只报结论。',
      '列出最可能改变结论的补充信息，并说明目前材料能支持到什么范围。'
    ] };
    const second = { id: 'differential', label: basicScience ? '机制鉴别与反证' : '鉴别诊断与反证', stages: [
      '提出至少两个可竞争的解释或机制，不先借用题库答案。',
      '分别列出每个解释预期出现的证据，再用题干逐项比较；区分已知事实与推断。',
      '指出最容易误选的判断路径，说明它在哪个证据环节不成立；若材料不足，明确写出不足。'
    ] };
    return [first, second, third].map((variant, index) => ({
      ...variant,
      stages: questionObjective(row) ? [questionObjective(row).training_task, ...variant.stages.slice(1)] : variant.stages,
      id: `case-${String(index + 1).padStart(2, '0')}`,
      case_id: `CMQ-${String(row.question_id).replace(/[^A-Za-z0-9-]/g, '')}-${String(index + 1).padStart(2, '0')}`,
      case_number: index + 1,
      source_question_id: row.question_id,
      exam_point: (questionObjective(row) || {}).exam_point || row.exam_point || '本题具体考点资源暂不可用，请复习原题或请教师核对',
      review_status: '原题推理练习，待临床教师审核',
    }));
  }

  function renderQuestionCaseTraining(row, variant) {
    if (!S.pretest || S.experienceAssessmentActive) { setBubble('请先提交本次答题，再进入错题推理练习。'); return; }
    S.questionCaseTraining = { case_id: variant.case_id, question_id: row.question_id, variant: variant.id };
    setSteps('case'); setNav('cases');
    const subject = row.subject || row.node_id || '临床医学';
    $app.innerHTML = `<div class="card q-case-training">
      <button class="btn ghost sm" id="btn-qcase-back">返回病例选择</button>
      <h2>原题推理练习 ${variant.case_number} · ${esc(variant.label)}</h2>
      <p class="lead">${esc(variant.case_id)} · 来源考题 ${esc(row.question_id)} · ${esc(subject)}</p>
      <p class="exam-point"><b>本次训练考点：</b>${esc(variant.exam_point || row.exam_point || `题目节点「${row.node_id || '未标注'}」的证据辨析与适用边界`)}</p>
      <p class="hint-inline">${esc(variant.review_status)}。直接使用原题材料的推理练习，不计作新增完整病例；不自动评分、不改变原病例评分标准。</p>
      <section><h3>病例资料</h3><p>${esc(row.stem || '题库未提供病例情境。请结合本题考点完成推理。')}</p></section>
      <form id="qcase-form">${variant.stages.map((prompt, i) => `<label class="qcase-stage"><b>阶段 ${i + 1}</b><span>${esc(prompt)}</span><textarea id="qcase-stage-${i + 1}" rows="4" required placeholder="写出你的证据、推理过程与判断边界"></textarea></label>`).join('')}
        <button class="btn" type="submit">完成推演并核对依据</button>
      </form><div id="qcase-feedback"></div>
    </div>`;
    document.getElementById('btn-qcase-back').addEventListener('click', () => goCases());
    document.getElementById('qcase-form').addEventListener('submit', event => {
      event.preventDefault();
      const responses = [1, 2, 3].map(i => document.getElementById(`qcase-stage-${i}`).value.trim());
      if (responses.some(value => value.length < 8)) {
        setBubble('请分别写出三个阶段的推理，至少说明依据或未知信息。');
        return;
      }
      const options = Object.entries(row.options || {}).map(([key, value]) => `<li>${esc(key)}. ${esc(value)}</li>`).join('');
      const knowledge = row.card || row.card_imported || {};
      const explanationText = (knowledge.textbook_reference && knowledge.claim) || row.explanation || knowledge.claim || '';
      const explanation = explanationText ? `<p>${esc(explanationText)}</p>` : '<p>本题暂无题库解析文本，请向教师核对知识卡。</p>';
      const sourceName = row.source || knowledge.source || '';
      const sourceNote = row.source_note || knowledge.source_note || '';
      const source = sourceName ? `<p>来源：${esc(sourceName)}${sourceNote ? ' · ' + esc(sourceNote) : ''}${knowledge.source_location ? ' · ' + esc(knowledge.source_location) : ''}${knowledge.version ? ' · ' + esc(knowledge.version) : ''}</p>` : '';
      document.getElementById('qcase-feedback').innerHTML = `<section class="qcase-reference"><h3>题库依据（供自我核对，不是病例自动评分）</h3>
        <p>标准答案：${esc(row.answer || '题库未提供')}</p><ul>${options}</ul>${explanation}${textbookReference(knowledge)}${source}</section>`;
    });
  }

  // 每次换病例都要清空采集/分析状态，避免上一例的勾选带进来
  function resetCaseState() {
    S.learningMode = 'coach';
    S.experienceAssistance = null;
    S.revealed = [];
    S.dialogue = [];
    S.evidence = [];
    S.collect = { asked: {}, exams: [], labs: [] };
    S.analysis = { summary: '', diagnosis: '', caseType: '', pattern: '', examReasoning: {} };
    S.assessment = null;
    S.scoreResult = null;
    S.report = null;
    S.objectiveReportError = false;
  }

  function loadCase(caseId) {
    const pub = ZH.getCase(caseId, false);
    const priv = ZH.getCase(caseId, true);
    S.currentCase = pub.case;
    attachCaseObjectives(S.currentCase);
    S.casePrivate = priv.case;
    resetCaseState();
    S.spState = (priv.case.initial_state || { emotion: (priv.case.persona || {}).initial_emotion || '平静' });
    renderCase();
  }

  function renderCase() {
    setSteps('case'); setNav('cases');
    const c = S.currentCase;
    const pp = c.public_profile || {};
    const data = c.clinical_data || [];
    const authored = !!((c.structured || {}).authored);
    $app.innerHTML = `
      <div class="card">
        <div class="case-tags">
          ${c.case_type ? `<span class="pill">${esc(c.case_type)}</span>` : ''}
          ${c.disease_pattern ? `<span class="pill ok">${esc(c.disease_pattern)}</span>` : ''}
          ${pp.reliability ? `<span class="pill ${/部分/.test(pp.reliability) ? 'warn' : 'ok'}">陈述可信度 · ${esc(pp.reliability)}</span>` : ''}
        </div>
        <h2>${esc(c.title)}</h2>
        <table class="info-table">
          <tr><th>姓名</th><td>${esc(pp.name || '—')}</td><th>性别</th><td>${esc(pp.sex || '未标注')}</td></tr>
          <tr><th>年龄</th><td>${esc(pp.age || '—')} 岁</td><th>就诊场景</th><td>${esc(pp.setting || '—')}</td></tr>
        </table>
        <div class="quote-box">
          <b>病史陈述</b>
          <p>“${esc(pp.history_statement || '（本病例未单列病史陈述，可在问诊中获取）')}”</p>
          <div class="quote-note">${pp.history_source === 'authored' ? '病例编写时提供' : '由病例公开信息整理'} · 陈述可信度：${esc(pp.reliability || '—')}</div>
        </div>
        <div style="font-size:14px;margin-top:14px"><b>训练任务：</b>${esc(c.task || '')}</div>
        ${objectiveTasksHtml(false)}
        ${c.exam_point ? `<div class="exam-point" style="margin-top:10px"><b>本题具体考点：</b>${esc(c.exam_point)}<br><span class="hint-inline">训练围绕考点进行证据整合与边界辨析；不会因命中考点自动判定作答正确。</span></div>` : ''}
        ${data.length ? (() => {
          const timed = data.some((r) => r.day || r.time);
          return `<div class="divider"></div>
          <table class="clinical-table">
            <thead><tr>${timed ? '<th>日期</th><th>时间</th>' : ''}<th>项目</th><th>数值</th><th>备注</th></tr></thead>
            <tbody>${data.map((r) => `<tr>${timed ? `<td>${esc(r.day || '')}</td><td>${esc(r.time || '')}</td>` : ''}<td>${esc(r.item)}</td><td><b>${esc(r.value)}</b></td><td>${esc(r.note || '')}</td></tr>`).join('')}</tbody>
          </table>`;
        })() : ''}
        <div class="step-note">${authored
          ? `本例按《诊断学》问诊顺序编写：病史 7 段、系统回顾 8 项、体格检查 ${(c.structured.exam || []).length} 项、辅助检查 ${(c.structured.labs || []).length} 项（部分标注「暂无」）。点开即视为完成该次询问，系统只记录"问过什么"，不替你判断。`
          : '本例为早期版本病例，未单列结构化问诊数据；问诊内容可在对话中追问获得，摘要与分型仍可填写。'}</div>
        <div class="divider"></div>
        <p><label for="learning-mode"><b>训练方式：</b></label> <select id="learning-mode" class="input"><option value="coach" ${S.learningMode === 'coach' ? 'selected' : ''}>带教练习（训练中可查看指南思路）</option><option value="assessment" ${S.learningMode === 'assessment' ? 'selected' : ''}>独立测评（评分前不显示经验卡）</option></select></p>
        <p class="hint">带教使用情况会记入复盘，切换模式不会清除既有记录；原评分标准不变。</p>
        <button class="btn block" id="btn-analysis">${authored ? '开始问诊与检查采集 →' : '进入初步分析 →'}</button>
        <button class="btn ghost block" id="btn-direct-dialogue" style="margin-top:10px">跳过采集，直接对话</button>
      </div>
      <section class="card experience-companion" id="case-experience" aria-label="指南带教"></section>
      <div class="notice">${esc(pp.notice || '全部资料均为合成')}。请基于公开资料进行分析，不要输入真实信息。</div>
    `;
    const companion = window.ZH_EXPERIENCE?.mount(document.getElementById('case-experience'));
    document.getElementById('learning-mode').onchange = (e) => { S.learningMode = e.target.value; companion?.refresh(); };
    document.getElementById('btn-analysis').addEventListener('click', () => (authored ? goInterview() : goAnalysis()));
    document.getElementById('btn-direct-dialogue').addEventListener('click', () => goAnalysis());
  }

  // ---------- ⑪⑫ 问诊与检查采集 ----------
  const HIST_ORDER = [
    ['chief_complaint', '主诉'], ['present_illness', '现病史'], ['past_history', '既往史'],
    ['personal_history', '个人史'], ['marital_history', '婚育史'], ['family_history', '家族史'],
  ];

  function goInterview() {
    setSteps('case'); setNav('cases');
    const c = S.currentCase;
    const st = c.structured || {};
    const hist = st.history || {};
    const ros = hist.review_of_systems || {};
    const asked = S.collect.asked;
    const rosKeys = Object.keys(ros);
    const exam = st.exam || [];
    const labs = st.labs || [];
    const preview = ZH.assessCase(c, {
      asked, exams: S.collect.exams, labs: S.collect.labs,
      summary: S.analysis.summary, diagnosis: S.analysis.diagnosis, pattern: S.analysis.pattern,
      messages: [],
    });
    const nextStep = (preview.steps || []).find((s) => !s.done);

    const histRows = HIST_ORDER.map(([key, label]) => {
      const on = !!asked[key];
      const value = key === 'review_of_systems' ? '' : String(hist[key] || '暂无');
      return `<div class="collect-row ${on ? 'on' : ''}">
        <button class="collect-head" data-h="${esc(key)}">
          <span class="cx">${on ? '✓' : '○'}</span><span class="ch">${esc(label)}</span>
          <span class="cv">${on ? esc(value) : '点击询问'}</span>
        </button>
      </div>`;
    }).join('');

    const rosChips = rosKeys.length ? rosKeys.map((k) => {
      const on = !!asked['ros:' + k];
      return `<button class="chip ${on ? 'on' : ''}" data-ros="${esc(k)}" title="${esc(ros[k])}">${esc(k)}${on ? '<span>✓</span>' : ''}</button>`;
    }).join('') : '<p style="color:var(--hu-muted)">本病例未单列系统回顾。</p>';

    const examRows = exam.length ? exam.map((e) => {
      const on = S.collect.exams.indexOf(e.item) >= 0;
      return `<div class="collect-row ${on ? 'on' : ''}">
        <button class="collect-head" data-exam="${esc(e.item)}">
          <span class="cx">${on ? '✓' : '○'}</span><span class="ch">${esc(e.item)}</span>
          <span class="cv">${on ? esc(e.finding) : '点击检查'}</span>
        </button>
      </div>`;
    }).join('') : '<p style="color:var(--hu-muted)">本病例未单列体格检查。</p>';

    const labRows = labs.length ? labs.map((l) => {
      const on = S.collect.labs.indexOf(l.item) >= 0;
      const none = l.available === false;
      return `<div class="collect-row ${on ? 'on' : ''} ${none ? 'na' : ''}">
        <button class="collect-head" data-lab="${esc(l.item)}" ${none && !on ? 'title="本例该项暂无结果"' : ''}>
          <span class="cx">${on ? '✓' : '○'}</span><span class="ch">${esc(l.item)}</span>
          <span class="cv">${on ? esc(l.finding) : (none ? '暂无（可申请，结果未出）' : '点击申请/查看')}</span>
        </button>
      </div>`;
    }).join('') : '<p style="color:var(--hu-muted)">本病例未单列辅助检查。</p>';

    $app.innerHTML = `
      <div class="card">
        <h2>问诊与检查采集</h2>
        <p class="lead">按《诊断学》的顺序采集：${esc(c.public_profile.name || '患者')} 的病史 → 系统回顾 → 体格检查 → 辅助检查。采集记录会进入复盘报告，用于完整度评分；系统不会告诉你哪一项"该问"。</p>
        <div class="cov-bar">
          <div class="cov-line"><b>覆盖度</b> ${preview.completeness}% <span class="cov-sub">完成 ${preview.steps.filter((s) => s.done).length}/8 步${nextStep ? ' · 下一步：' + esc(nextStep.label) : ''}</span></div>
          <div class="dim-bar"><i style="width:${preview.completeness}%"></i></div>
        </div>
        <h3 class="sec-h">一、病史采集</h3>
        ${histRows}
        <h3 class="sec-h">二、系统回顾（8 系统）</h3>
        <div class="chips">${rosChips}</div>
        ${rosKeys.filter((k) => asked['ros:' + k]).map((k) => `<div class="ros-note"><b>${esc(k)}</b>：${esc(ros[k])}</div>`).join('')}
        <h3 class="sec-h">三、体格检查</h3>
        ${examRows}
        <h3 class="sec-h">四、辅助检查</h3>
        ${labRows}
        <div class="divider"></div>
        <button class="btn block" id="btn-to-analysis">完成采集，进入初步分析 →</button>
        <button class="btn ghost block" id="btn-reset-collect" style="margin-top:10px">重置采集记录</button>
      </div>
      <section class="card experience-companion" id="interview-experience" aria-label="指南带教"></section>
      <div class="notice">采集为训练用虚拟数据，不构成医疗建议。真实病例请以实际检查结果为准。</div>
    `;
    window.ZH_EXPERIENCE?.mount(document.getElementById('interview-experience'));
    $app.querySelectorAll('[data-h]').forEach((b) => b.addEventListener('click', () => {
      const k = b.dataset.h;
      S.collect.asked[k] = !S.collect.asked[k];
      if (!S.collect.asked[k]) delete S.collect.asked[k];
      goInterview();
    }));
    $app.querySelectorAll('[data-ros]').forEach((b) => b.addEventListener('click', () => {
      const k = 'ros:' + b.dataset.ros;
      if (S.collect.asked[k]) delete S.collect.asked[k]; else S.collect.asked[k] = true;
      goInterview();
    }));
    $app.querySelectorAll('[data-exam]').forEach((b) => b.addEventListener('click', () => {
      const k = b.dataset.exam;
      const i = S.collect.exams.indexOf(k);
      if (i >= 0) S.collect.exams.splice(i, 1); else S.collect.exams.push(k);
      goInterview();
    }));
    $app.querySelectorAll('[data-lab]').forEach((b) => b.addEventListener('click', () => {
      const k = b.dataset.lab;
      const i = S.collect.labs.indexOf(k);
      if (i >= 0) S.collect.labs.splice(i, 1); else S.collect.labs.push(k);
      goInterview();
    }));
    document.getElementById('btn-reset-collect').addEventListener('click', () => {
      S.collect = { asked: {}, exams: [], labs: [] };
      goInterview();
    });
    document.getElementById('btn-to-analysis').addEventListener('click', () => goAnalysis());
  }

  // ---------- 初步分析（⑬ 摘要 / 诊断 / 分型） ----------
  const CASE_TYPES = ['初诊', '复诊', '急症', '转诊'];

  function readAnalysisInputs() {
    const get = (id) => { const n = document.getElementById(id); return n ? n.value.trim() : ''; };
    S.analysis.summary = get('ta-summary');
    S.analysis.diagnosis = get('in-diagnosis');
    S.analysis.caseType = get('sel-case-type');
    const pat = document.getElementById('sel-pattern') || document.getElementById('in-pattern');
    S.analysis.pattern = pat ? pat.value.trim() : '';
    S.analysis.plan = get('ta-plan');
    const reasoning = S.analysis.examReasoning || {};
    (S.currentCase?.learning_objectives || []).forEach(row => {
      const node = document.getElementById('objective-' + row.question_id);
      if (node) reasoning[row.question_id] = node.value.trim();
    });
    S.analysis.examReasoning = reasoning;
  }

  function previewSteps() {
    return ZH.assessCase(S.currentCase, {
      asked: S.collect.asked, exams: S.collect.exams, labs: S.collect.labs,
      summary: S.analysis.summary, diagnosis: S.analysis.diagnosis, pattern: S.analysis.pattern,
      messages: [],
    }).steps;
  }

  function stepChipsHtml() {
    return previewSteps().map((s) => `<span class="chip ${s.done ? 'on' : ''}">${esc(s.label)}<span>${esc(s.detail)}</span></span>`).join('');
  }

  function goAnalysis() {
    setSteps('case'); setNav('analysis');
    const c = S.currentCase;
    const pp = c.public_profile || {};
    const a = S.analysis || { summary: '', diagnosis: '', caseType: '', pattern: '' };
    const patternOpts = c.pattern_options || [];
    const curType = a.caseType || c.case_type || '初诊';
    $app.innerHTML = `
      <div class="card">
        <h2>病例摘要与初步诊断</h2>
        <p class="lead">写清楚再沟通。摘要、诊断、分型都会进入复盘评分；这一步不提示答案。</p>
        <div class="chips" id="step-chips">${stepChipsHtml()}</div>
        <div class="field">
          <label>病例摘要 <span class="hint-inline">至少 40 字，按「主诉 → 现病史时间线 → 关键阳性/阴性 → 已做检查」写</span></label>
          <textarea class="input" id="ta-summary" rows="5" placeholder="例如：患者 56 岁男性，今晨买菜时突发胸骨后压榨性疼痛……">${esc(a.summary || '')}</textarea>
        </div>
        <div class="grid-2">
          <div class="field">
            <label>病例类型</label>
            <select class="input" id="sel-case-type">
              ${CASE_TYPES.map((t) => `<option ${t === curType ? 'selected' : ''}>${t}</option>`).join('')}
            </select>
          </div>
          <div class="field">
            <label>初步诊断</label>
            <input class="input" id="in-diagnosis" value="${esc(a.diagnosis || '')}" placeholder="例如：急性冠脉综合征待排">
          </div>
        </div>
        <div class="field">
          <label>疾病分型</label>
          ${patternOpts.length ? `<select class="input" id="sel-pattern">
            <option value="">请选择分型（共 ${patternOpts.length} 项）</option>
            ${patternOpts.map((p) => `<option ${p === a.pattern ? 'selected' : ''}>${esc(p)}</option>`).join('')}
          </select>` : `<input class="input" id="in-pattern" value="${esc(a.pattern || '')}" placeholder="例如：腹痛·外科急腹症待排">`}
          <div class="hint">病例类型 = 这次就诊的性质（初诊 / 复诊 / 急症 / 转诊）；疾病分型 = 这个病的具体类型（如「胸痛·心源性」「腹痛·外科急腹症」）。两者分开记录，复盘时分别核对。</div>
        </div>
        <div class="field">
          <label>沟通计划 <span class="hint-inline">选填</span></label>
          <textarea class="input" id="ta-plan" rows="2" placeholder="例如：先回应他对「是不是心梗」的担心，再解释需要做的检查">${esc(a.plan || '')}</textarea>
        </div>
        <div class="divider"></div>
        ${objectiveTasksHtml(true)}
        <button class="btn block" id="btn-dialogue">开始与${esc(pp.name || '患者')}对话 →</button>
      </div>
      <section class="card experience-companion" id="analysis-experience" aria-label="指南带教"></section>
    `;
    window.ZH_EXPERIENCE?.mount(document.getElementById('analysis-experience'));
    const rerender = () => {
      readAnalysisInputs();
      const host = document.getElementById('step-chips');
      if (host) host.innerHTML = stepChipsHtml();
    };
    ['ta-summary', 'in-diagnosis', 'sel-pattern', 'in-pattern', 'ta-plan', ...(c.learning_objectives || []).map(row => 'objective-' + row.question_id)].forEach((id) => {
      const n = document.getElementById(id);
      if (n) n.addEventListener('input', rerender);
    });
    document.getElementById('sel-case-type').addEventListener('change', rerender);
    document.getElementById('btn-dialogue').addEventListener('click', () => {
      readAnalysisInputs();
      goDialogue();
    });
  }

  // ---------- ⑥ 知识点答疑 ----------
  function qaEntryHtml(label, prefill) {
    return `<div class="qa-entry">
      <div><b>${esc(label || '这一页还是没看懂？')}</b><div class="hint">回答只依据知识卡原文，逐条附出处；不做个体化诊断，也不给具体剂量。</div></div>
      <button class="btn ghost sm" data-ask="${esc(prefill || '')}">问知护 →</button>
    </div>`;
  }

  function wireAskButtons() {
    $app.querySelectorAll('[data-ask],[data-ask-group]').forEach((b) => {
      if (b.dataset.bound) return;
      b.dataset.bound = '1';
      b.addEventListener('click', () => {
        const group = b.getAttribute('data-ask-group');
        if (group) return openQA(`请解释「${group}」这个考点，以及我为什么容易错。`);
        const qid = b.getAttribute('data-ask');
        if (qid) {
          const row = (S.pretestDetail || []).find((r) => r.question_id === qid);
          if (row) return openQA(`请用通俗的话解释这道题：${row.stem}`, row.explanation_ref || '', row.question_id);
        }
        openQA('');
      });
    });
  }

  function openQA(question, preferredCardId, questionId) {
    const old = document.getElementById('qa-modal');
    if (old) old.remove();
    const host = document.createElement('div');
    host.id = 'qa-modal';
    host.className = 'qa-modal';
    host.innerHTML = `
      <div class="qa-panel">
        <div class="qa-head"><b>问知护</b><button class="btn ghost sm" id="qa-close">关闭</button></div>
        <div class="qa-body">
          <div class="qa-ask">
            <input class="input" id="qa-input" placeholder="例如：为什么低血糖时不能只补糖不查原因" value="${esc(question || '')}">
            <button class="btn" id="qa-send">提问</button>
          </div>
          <div id="qa-result" class="qa-result"><p class="hint">先给结论，再给人话解释、常见误区和边界；每条都标出处。</p></div>
        </div>
      </div>`;
    document.body.appendChild(host);
    const close = () => host.remove();
    host.addEventListener('click', (e) => { if (e.target === host) close(); });
    document.getElementById('qa-close').addEventListener('click', close);
    const input = document.getElementById('qa-input');
    const box = document.getElementById('qa-result');
    const sendBtn = document.getElementById('qa-send');
    const initialQuestion = String(question || '').trim();

    const render = (res, llm) => {
      if (!res) return;
      const cards = res.cards || [];
      box.innerHTML = `
        ${llm ? `<div class="qa-llm"><div class="hint">AI 依据下面这几张知识卡改写（${esc(llm.provider || 'model')}）</div><p>${esc(llm.answer)}</p></div>` : ''}
        ${cards.length ? cards.map((c, i) => `
          <div class="kcard">
            <div class="kcard-h"><b>${i + 1}. ${esc(c.title)}</b><span class="pill ok">相关度 ${c.score}%</span></div>
            <p>${esc(c.claim)}</p>
            ${c.lay ? `<p class="hint">说人话：${esc(c.lay)}</p>` : ''}
            ${c.misconceptions ? `<p class="hint">常见误区：${esc(c.misconceptions)}</p>` : ''}
            ${c.exceptions ? `<p class="hint">边界与例外：${esc(c.exceptions)}</p>` : ''}
            <div class="kcard-src">出处：${esc(c.source || '课程团队维护')}${c.location ? ' · ' + esc(c.location) : ''}${c.url ? ` · <a href="${esc(c.url)}" target="_blank" rel="noopener">教材信息</a>` : ''}${c.secondaryUrl ? ` · <a href="${esc(c.secondaryUrl)}" target="_blank" rel="noopener">权威依据</a>` : ''}</div>
          </div>`).join('') : ''}
        ${(res.questions || []).length ? `<div class="qa-rel"><b>相关题目</b>
          ${res.questions.map((q) => `<div class="qa-rel-row"><span>${esc(q.stem)}</span><button class="btn ghost sm" data-ask="${esc('请解释这道题：' + q.stem)}">再问</button></div>`).join('')}
        </div>` : ''}
        <div class="hint">${esc(res.note || '')}</div>
      `;
      box.querySelectorAll('[data-ask]').forEach((b) => b.addEventListener('click', () => {
        input.value = b.getAttribute('data-ask');
        send();
      }));
    };

    let sending = false;
    const send = async () => {
      const q = input.value.trim();
      if (!q || sending) { input.focus(); return; }
      sending = true;
      sendBtn.disabled = true;
      sendBtn.textContent = '检索中…';
      box.innerHTML = '<p class="hint">正在检索对应教材章节与权威依据…</p>';
      try {
        const usePreferred = q === initialQuestion ? preferredCardId : '';
        const references = window.ZH_EXPERIENCE ? await window.ZH_EXPERIENCE.search(q, { question_id: questionId || null }) : null;
        if (references && (references.outcome === 'stage_restricted' || references.mode === 'training_guidance' || references.mode === 'coaching')) {
          box.innerHTML = window.ZH_EXPERIENCE.render(references);
          return;
        }
        if (S.major && (!references || references.review_allowed !== true)) {
          // A failed optional service cannot authorize pre-answer teaching.
          box.innerHTML = (references ? window.ZH_EXPERIENCE.render(references) : '') + '<p class="hint">完整教材答疑在提交后开放。训练中的经验库可提供条件核对引导；若经验库暂不可用，请继续原训练或稍后重试。</p>';
          return;
        }
        const res = ZH_QA.ask(q, usePreferred);
        render(res);
        if (references) {
          const referenceBox = document.createElement('div');
          referenceBox.innerHTML = window.ZH_EXPERIENCE.render(references);
          box.prepend(referenceBox);
        }
        // Keep this flow local: experience material is never sent for LLM rewriting.
      } catch (e) {
        box.innerHTML = '<p class="hint">本次提问没有完成，请检查网络后重试；教材知识卡不会被清空。</p>';
      } finally {
        sending = false;
        sendBtn.disabled = false;
        sendBtn.textContent = '重新提问';
      }
    };
    sendBtn.addEventListener('click', send);
    input.addEventListener('keydown', (e) => { if (e.key === 'Enter') send(); });
    input.focus();
  }

  // ---------- ⑦ 个人能力雷达 ----------
  function radarSVG(axes) {
    const W = 300, H = 250, cx = 150, cy = 122, R = 82;
    const n = axes.length || 1;
    const pt = (i, r) => {
      const a = -Math.PI / 2 + (2 * Math.PI * i) / n;
      return [cx + Math.cos(a) * r, cy + Math.sin(a) * r];
    };
    const ring = (k) => axes.map((_, i) => pt(i, R * k).join(',')).join(' ');
    const grid = [0.25, 0.5, 0.75, 1].map((k) => `<polygon points="${ring(k)}" fill="${k === 1 ? 'var(--hu-mi-deep)' : 'none'}" stroke="var(--hu-line)" stroke-width="1"/>`).join('');
    const spokes = axes.map((_, i) => `<line x1="${cx}" y1="${cy}" x2="${pt(i, R)[0].toFixed(1)}" y2="${pt(i, R)[1].toFixed(1)}" stroke="var(--hu-line)"/>`).join('');
    const vals = axes.map((a, i) => {
      const v = typeof a.value === 'number' ? Math.max(0, Math.min(100, a.value)) : 0;
      return pt(i, (R * v) / 100).join(',');
    }).join(' ');
    const dots = axes.map((a, i) => {
      const v = typeof a.value === 'number' ? Math.max(0, Math.min(100, a.value)) : 0;
      const [x, y] = pt(i, (R * v) / 100);
      return `<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="3" fill="var(--hu-qing)"/>`;
    }).join('');
    const labels = axes.map((a, i) => {
      const [x, y] = pt(i, R + 24);
      const v = typeof a.value === 'number' ? a.value + '%' : '—';
      return `<text x="${x.toFixed(1)}" y="${(y - 2).toFixed(1)}" text-anchor="middle" font-size="11" fill="var(--hu-muted)">${esc(a.label)}</text>
        <text x="${x.toFixed(1)}" y="${(y + 11).toFixed(1)}" text-anchor="middle" font-size="11" font-weight="600" fill="var(--hu-qing)">${v}</text>`;
    }).join('');
    return `<svg viewBox="0 0 ${W} ${H}" class="radar" role="img" aria-label="个人能力雷达图">${grid}${spokes}
      <polygon points="${vals}" fill="#d2dfc5" stroke="var(--hu-qing)" stroke-width="2"/>${dots}${labels}</svg>`;
  }

  // ---------- ② 薄弱点汇总块（嵌在薄弱解析页顶部） ----------
  function weakSummaryBlock() {
    if (!window.ZH_STORE) return '';
    const sum = ZH_STORE.summary(S.major);
    if (sum.empty || (!sum.attempts && !(sum.cases || []).length)) {
      return `<div class="digest">
        <b>学习档案</b>：这个专业还没有自测记录。完成一次自测后，这里会汇总薄弱考点、错题集和考前清单。
        <div style="margin-top:8px"><button class="btn ghost sm" id="btn-go-summary">打开学习档案 →</button></div>
      </div>`;
    }
    const top = sum.weak.slice(0, 4);
    return `<div class="digest">
      <div class="digest-h"><b>学习档案</b><span class="hint">自测 ${sum.attempts} 次 · 平均正确率 ${sum.accuracy}% · 错题 ${sum.wrong.length} 道</span></div>
      ${top.length
        ? `<div class="weak-list">${top.map((n) => `<span class="weak-item"><b>${esc(n.title)}</b><span>错 ${n.wrong} 次 / 共 ${n.tries} 次</span></span>`).join('')}</div>`
        : '<p class="hint">目前没有错题，继续保持。</p>'}
      <div style="margin-top:8px"><button class="btn ghost sm" id="btn-go-summary">查看六边形、错题集与考前清单 →</button></div>
    </div>`;
  }

  // ---------- ⑦ 学习档案（总结页） ----------
  function goSummary() {
    setSteps('explain'); setNav('summary');
    const sum = ZH_STORE.summary(S.major);
    const rad = ZH_STORE.radar(S.major);
    const majorLabel = ((D.startup.major_options || []).find((m) => m.major_id === S.major) || {}).label || S.major || '未选择';
    if (sum.empty || (!sum.attempts && !(sum.cases || []).length)) {
      $app.innerHTML = `
        <div class="card">
          <h2>学习档案</h2>
          <p class="lead">${esc(majorLabel)} · 还没有自测记录。先做一次能力自测，系统会自动累积薄弱考点、错题和考前清单。</p>
          <button class="btn" id="btn-to-pretest">去做能力自测 →</button>
        </div>`;
      document.getElementById('btn-to-pretest').addEventListener('click', () => { S.pretest = null; goPretest(); });
      return;
    }
    const cases = sum.cases || [];
    $app.innerHTML = `
      <div class="card">
        <h2>学习档案 · ${esc(majorLabel)}</h2>
        <p class="lead">数据只存在本机浏览器（换电脑或清缓存会重置），不上传、不做账号体系。</p>
        <div class="stat-row">
          <div class="stat"><b>${sum.attempts}</b><span>自测次数</span></div>
          <div class="stat"><b>${sum.attempts ? sum.accuracy + '%' : '—'}</b><span>平均正确率</span></div>
          <div class="stat"><b>${sum.wrong.length}</b><span>未销账错题</span></div>
          <div class="stat"><b>${cases.length}</b><span>病例演练</span></div>
        </div>
      </div>
      <div class="card">
        <h3 class="sec-h" style="margin-top:0">个人能力六边形</h3>
        <div class="radar-wrap">${radarSVG(rad.axes)}</div>
        <p class="hint">五个维度取自最近一次病例演练（信息询问 / 测量记录 / 解释应用 / 风险边界 / 沟通行动），第六轴「知识掌握」取自自测正确率。${rad.hasCase ? '' : '还没有病例演练记录，五维为空，先完成一次病例对话。'}</p>
      </div>
      <div class="card">
        <h3 class="sec-h" style="margin-top:0">薄弱知识点（按错误次数排序）</h3>
        ${sum.nodes.filter((n) => n.wrong > 0).length ? `<table class="weak-table">
          <thead><tr><th>知识点</th><th>错/共</th><th>错误率</th><th></th></tr></thead>
          <tbody>${sum.nodes.filter((n) => n.wrong > 0).slice(0, 12).map((n) => `<tr>
            <td>${esc(n.title)}</td><td>${n.wrong} / ${n.tries}</td><td>${n.rate}%</td>
            <td>${n.wrong ? `<button class="btn ghost sm" data-explain="${esc(n.title)}">问这一点</button>` : ''}</td>
          </tr>`).join('')}</tbody>
        </table>` : '<p class="hint">暂无错题知识点，继续保持。</p>'}
      </div>
      <div class="card">
        <h3 class="sec-h" style="margin-top:0">考前重点复习清单</h3>
        ${sum.weak.length ? `<ol class="review-list">${sum.weak.slice(0, 6).map((n) => `<li><b>${esc(n.title)}</b><span class="hint">错 ${n.wrong} 次 · 建议先看该考点的「说人话 / 常见误区 / 边界与例外」三栏，再做 1 道同类题</span></li>`).join('')}</ol>`
          : '<p class="hint">没有反复出错的知识点，可以把四档自测往上打一档。</p>'}
      </div>
      <div class="card">
        <h3 class="sec-h" style="margin-top:0">错题集</h3>
        ${sum.wrong.length ? sum.wrong.slice(0, 12).map((w) => `<div class="wrong-row">
          <div><b>${esc(w.title)}</b> <span class="pill">${esc(ZH_STORE.levelLabel(w.level))}</span> <span class="hint">错 ${w.times} 次</span></div>
          <div class="hint">${esc(w.stem)}</div>
          <button class="btn ghost sm" data-ask="${esc('请解释这道题：' + w.stem)}">这题不懂，问知护</button>
        </div>`).join('') : '<p class="hint">错题已全部销账。</p>'}
        <div class="divider"></div>
        <div class="stack-btns">
          <button class="btn" id="btn-wrong-paper" ${sum.wrong.length ? '' : 'disabled'}>生成个性化错题卷（${Math.min(5, sum.wrong.length)} 题）</button>
          <button class="btn ghost" id="btn-to-pretest2">再自测一次</button>
          <button class="btn ghost" id="btn-reset-archive">重置学习档案</button>
        </div>
      </div>
      ${cases.length ? `<div class="card">
        <h3 class="sec-h" style="margin-top:0">最近病例演练</h3>
        <table class="weak-table"><thead><tr><th>时间</th><th>病例</th><th>实践分</th><th>完成度</th><th>完整度</th><th>准确性</th></tr></thead>
        <tbody>${cases.slice().reverse().map((c) => `<tr>
          <td>${new Date(c.ts).toLocaleDateString('zh-CN')}</td><td>${esc(c.caseId)}</td>
          <td>${c.total == null ? '—' : c.total}</td>
          <td>${c.rates ? c.rates.completion + '%' : '—'}</td>
          <td>${c.rates ? c.rates.completeness + '%' : '—'}</td>
          <td>${c.rates ? c.rates.accuracy + '%' : '—'}</td>
        </tr>`).join('')}</tbody></table>
      </div>` : ''}
    `;
    wireAskButtons();
    $app.querySelectorAll('[data-explain]').forEach((b) => b.addEventListener('click', () => openQA(`请解释「${b.getAttribute('data-explain')}」这个知识点，并说明常见误区。`)));
    const wp = document.getElementById('btn-wrong-paper');
    if (wp) wp.addEventListener('click', () => {
      const ids = ZH_STORE.wrongIds(S.major, 5);
      if (ids.length) goPretest(ids);
    });
    document.getElementById('btn-to-pretest2').addEventListener('click', () => { S.pretest = null; goPretest(); });
    document.getElementById('btn-reset-archive').addEventListener('click', () => {
      if (window.confirm('确定清空本专业的学习档案？此操作不可撤销。')) { ZH_STORE.reset(S.major); goSummary(); }
    });
  }

  // ---------- 居民对话（SP） ----------
  async function goDialogue() {
    setSteps('dialogue'); setNav('dialogue');
    // 与 MCP 会话对齐：把阶段推进到 dialogue，并取回 SP 私有设定（人设/隐藏信息/释放条件）
    if (MCP.sessionId && S.currentCase) {
      try {
        const sp = await MCP.call('get_sp_state', { session_id: MCP.sessionId });
        if (sp && sp.case) S.casePrivate = sp.case;
      } catch (e) { if (COURSE) return COURSE.fail(e.message); }
      try {
        await MCP.call('advance_stage', { session_id: MCP.sessionId, stage: 'dialogue' });
      } catch (e) { if (COURSE) return COURSE.fail(e.message); }
    }
    const name = S.currentCase.public_profile.name || '居民';
    const persona = (S.casePrivate && S.casePrivate.persona) || {};
    $app.innerHTML = `
      <div class="card">
        <h2>居民对话</h2>
        <p class="lead">你现在是与「${esc(name)}」对话的社区健康服务人员。请用你的沟通能力逐步了解情况。 <span class="pill" id="agent-status">正在连接模型</span></p>
        <div class="chat" id="chat"></div>
        <div class="chatbar">
          <input class="input" id="chat-input" placeholder="输入你要说的话……" autocomplete="off">
          <button class="btn" id="chat-send">发送</button>
        </div>
        <div style="margin-top:14px;display:flex;gap:10px;flex-wrap:wrap">
          <label>训练方式 <select id="dialogue-learning-mode" class="input"><option value="coach" ${S.learningMode === 'coach' ? 'selected' : ''}>带教练习</option><option value="assessment" ${S.learningMode === 'assessment' ? 'selected' : ''}>独立测评</option></select></label>
          <button class="btn ghost sm" id="btn-finish">结束对话并评分</button>
          <button class="btn ghost sm" id="btn-training-experience">指南经验库 · ${S.learningMode === 'coach' ? '带教参考' : '独立测评保护中'}</button>
          <span class="pill" id="finish-status" role="status" aria-live="polite">随时可以结束并生成报告</span>
        </div>
      </div>
      <section class="card experience-companion" id="dialogue-experience" aria-label="指南带教"></section>
      <div class="notice">训练场景 · 合成病例 · 不构成医疗建议。SP 为虚拟角色，非真实居民。</div>
    `;
    const chat = document.getElementById('chat');
    document.getElementById('dialogue-learning-mode').onchange = (e) => {
      S.learningMode = e.target.value;
      document.getElementById('btn-training-experience').textContent = `指南经验库 · ${S.learningMode === 'coach' ? '带教参考' : '独立测评保护中'}`;
      companion?.refresh();
    };
    document.getElementById('btn-training-experience').onclick = () => window.ZH_EXPERIENCE?.open('');
    // 开场：SP 说一句
    const opening = spOpening(persona);
    if (S.dialogue.length) S.dialogue.forEach(turn => pushMsg(chat, turn.speaker, turn.speaker === 'student' ? '我' : name, turn.raw_text));
    else {
      pushMsg(chat, 'resident', name, opening);
      S.dialogue.push({ turn_id: 1, speaker: 'resident', raw_text: opening });
    }

    const input = document.getElementById('chat-input');
    const send = document.getElementById('chat-send');
    const agentStatus = document.getElementById('agent-status');
    const companion = window.ZH_EXPERIENCE?.mount(document.getElementById('dialogue-experience'), {
      onQuestion(question) {
        if (input.disabled || input.value.trim()) return false;
        input.value = question;
        input.focus();
        return true;
      },
    });
    let sending = false;
    async function doSend() {
      const text = input.value.trim();
      if (!text || sending) return;
      sending = true;
      input.value = '';
      input.disabled = true;
      send.disabled = true;
      send.textContent = '思考中…';
      agentStatus.textContent = '模型思考中';
      agentStatus.className = 'pill warn';
      pushMsg(chat, 'student', '我', text);
      S.dialogue.push({ turn_id: S.dialogue.length + 1, speaker: 'student', raw_text: text });
      try {
        const resp = await replySP(chat, name, text, persona);
        pushMsg(chat, 'resident', name, resp.text);
        S.dialogue.push({ turn_id: S.dialogue.length + 1, speaker: 'resident', raw_text: resp.text, revealed_info: resp.revealed, state_snapshot: S.spState });
        if (resp.revealed && resp.revealed.length) {
          S.revealed = Array.from(new Set([...S.revealed, ...resp.revealed]));
        }
        const mode = resp.mode || 'rules';
        const isLLM = mode !== 'rules';
        agentStatus.textContent = isLLM
          ? (resp.model ? `混元 ${resp.model} 在线` : '模型在线')
          : '规则降级';
        agentStatus.className = `pill ${isLLM ? 'ok' : 'warn'}`;
        // 把这一轮真实落库到 MCP 会话，拿回服务端分配的 turn_id（失败不打断对话）
        if (MCP.sessionId) {
          const saveExchange = MCP.call('append_exchange', {
            session_id: MCP.sessionId,
            student_text: text,
            resident_text: resp.text,
            revealed_info: resp.revealed || [],
          }).then((r) => {
            const rec = (r && r.student_record) || null;
            companion?.refresh(); // Recheck only after the patient's reply was saved.
            if (!rec || !rec.turn_id) return;
            const row = S.dialogue.find((d) => d.speaker === 'student' && d.raw_text === text && !d.mcp_turn_id);
            if (row) row.mcp_turn_id = rec.turn_id;
          });
          if (COURSE) await saveExchange;
          else saveExchange.catch(() => { /* 自由学习允许演示降级 */ });
        }
      } catch (error) {
        if (COURSE) return COURSE.fail('本轮对话保存未完成：' + error.message);
        throw error;
      } finally {
        sending = false;
        input.disabled = false;
        send.disabled = false;
        send.textContent = '发送';
        input.focus();
      }
    }
    send.addEventListener('click', doSend);
    input.addEventListener('keydown', (e) => { if (e.key === 'Enter') doSend(); });

    document.getElementById('btn-finish').addEventListener('click', async () => {
      const button = document.getElementById('btn-finish');
      const status = document.getElementById('finish-status');
      if (!button || button.disabled || sending) return;
      button.disabled = true;
      button.textContent = '正在评分…';
      status.textContent = '正在整理对话证据并生成报告';
      status.className = 'pill warn';
      setBubble('正在结束对话并生成评分报告…');
      // 先让浏览器绘制加载状态，避免网络请求期间看起来“没有反应”。
      await new Promise((resolve) => requestAnimationFrame(resolve));
      try {
        await goScoring();
      } catch (error) {
        console.error('finish-and-score failed', error);
        button.disabled = false;
        button.textContent = '重新评分';
        status.textContent = '评分失败，请点击重试';
        status.className = 'pill bad';
        setBubble(`评分失败：${error && error.message ? error.message : '未知错误'}，请重试。`);
      }
    });
  }

  function pushMsg(chat, who, name, text) {
    const av = who === 'student' ? '我' : '护';
    chat.insertAdjacentHTML('beforeend', `
      <div class="msg ${who === 'student' ? 'me' : ''}">
        <div class="av">${esc(av)}</div>
        <div class="body"><div class="who">${esc(name)}</div><p>${esc(text)}</p></div>
      </div>`);
    chat.scrollTop = chat.scrollHeight;
  }

  function spOpening(persona) {
    const authored = String(persona.opening_line || '').trim();
    if (authored) return authored;
    const emotion = persona.initial_emotion || '';
    const concern = persona.concern || '';
    if (concern) return `（${emotion || '平静'}地）${concern}。`;
    return '你好，我就是来问问我这情况该怎么弄。';
  }

  async function replySP(chat, name, studentText, persona) {
    if (window.__LOCAL_ONLY__) return { ...ruleSP(studentText, persona), mode: 'rules' };
    // 线上优先调用 CloudBase 服务端 DeepSeek 智能体。
    try {
      return await deepseekSP(studentText, persona);
    } catch (e) { /* 继续使用云 SDK 或本地规则降级 */ }
    // 优先云服务 LLM 扮演；否则用规则降级回复
    if (cloud) {
      try {
        const reply = await llmSP(studentText, persona);
        return { ...reply, mode: 'cloud-llm' };
      } catch (e) { /* 降级 */ }
    }
    // 规则降级：按释放条件做简单回应
    return { ...ruleSP(studentText, persona), mode: 'rules' };
  }

  async function deepseekSP(studentText, persona) {
    const messages = S.dialogue.slice(-16).map((turn) => ({
      role: turn.speaker === 'resident' ? 'assistant' : 'user',
      content: turn.raw_text,
    }));
    const response = await fetch(AGENT_API, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        case_id: S.currentCase.case_id,
        persona,
        hidden_info: (S.casePrivate && S.casePrivate.hidden_info) || [],
        release_conditions: (S.casePrivate && S.casePrivate.release_conditions) || {},
        boundary_behaviors: (S.casePrivate && S.casePrivate.boundary_behaviors) || [],
        revealed: S.revealed,
        messages,
      }),
    });
    if (!response.ok) throw new Error(`agent-http-${response.status}`);
    const data = await response.json();
    if (!data.text) throw new Error('agent-empty-reply');
    return {
      text: data.text,
      revealed: Array.isArray(data.revealed) ? data.revealed : [],
      mode: data.mode || data.provider || 'llm',
      model: data.model || null,
      provider: data.provider || null,
    };
  }

  async function llmSP(studentText, persona) {
    const priv = S.casePrivate;
    const hidden = (priv.hidden_info || []).map((h) => h.value).join('；');
    const release = JSON.stringify(priv.release_conditions || {});
    const boundary = (priv.boundary_behaviors || []).join('、');
    const revealed = S.revealed.length ? S.revealed.join('；') : '（尚未透露任何隐藏信息）';
    const system = [
      '你正在扮演一个虚拟标准化病人（SP），用于医学/护理学生沟通训练。',
      `你的身份与性格：${JSON.stringify(persona)}`,
      `你掌握但尚未透露的隐藏信息：${hidden}`,
      `信息释放条件（学生做出对应行为才可透露）：${release}`,
      `当前已透露：${revealed}`,
      `你绝不能主动说出的边界行为（若学生触及，应回应但绝不给出医疗建议或诊断）：${boundary}`,
      '规则：',
      '1. 每轮只回 1-3 句口语，口语化，像个真实居民/患者。',
      '2. 不主动泄露隐藏信息，除非学生用共情或具体追问触发了释放条件。',
      '2a. 标注分析后、提交后或复盘才可释放的机制解释和教学答案，不能仅因追问、共情或测量请求而提供。独立实验资料也不是患者的检测结果。',
      '3. 你绝不诊断、绝不推荐具体药物或剂量、绝不建议自行停药换药调药。',
      '4. 不替学生总结，不变成医生或百科。',
      '5. 学生若询问真实医疗决策，固定回复：这个问题涉及真实医疗决策，超出本学习工具的范围，请咨询具备执业资质的医务人员。如遇紧急情况，请立即拨打 120。',
      '6. 只输出你的回复文本，不要输出任何解释、括号说明或 JSON。',
    ].join('\n');
    const models = await cloud.llm.models.list();
    const model = models.find((m) => m.disabled !== true);
    if (!model) throw new Error('no-model');
    let answer = '';
    for await (const chunk of cloud.llm.chat.completions.create({
      model: model.id,
      messages: [
        { role: 'system', content: system },
        { role: 'user', content: studentText },
      ],
      stream: true,
    })) {
      const delta = chunk.choices[0]?.delta?.content;
      if (delta) answer += delta;
    }
    // 判断是否释放了新信息（简单启发：返回里若含隐藏信息片段）
    const newlyRevealed = [];
    for (const h of (S.casePrivate.hidden_info || [])) {
      if (!S.revealed.includes(h.value) && answer.includes(h.value.slice(0, 4))) newlyRevealed.push(h.value);
    }
    return { text: answer.trim() || '嗯，你说的这个……我有点没听懂。', revealed: newlyRevealed };
  }

  function ruleSP(studentText, persona) {
    // 无云服务时的规则降级：识别关键词，逐步释放
    const text = studentText;
    const conds = S.casePrivate.release_conditions || {};
    const hidden = S.casePrivate.hidden_info || [];
    const revealed = [];
    for (const h of hidden) {
      if (S.revealed.includes(h.value)) continue;
      const keys = conds[h.id] || [];
      let hit = false;
      for (const k of keys) {
        // Dialogue fallback cannot verify a completed analysis/review gate.
        // Keep these explanations for the scored debrief, even if a generic
        // measurement request would otherwise match the legacy fallback.
        if (/after|post_|feedback|debrief|submit/i.test(k)) continue;
        if (k === 'ask_medication_adherence_without_blame' && /药|服|漏/.test(text)) hit = true;
        else if (k === 'acknowledge_concern' && /理解|明白|担心|顾虑/.test(text)) hit = true;
        else if (k === 'ask_specific_concern' && /担心|顾虑|什么|为什么/.test(text)) hit = true;
        else if (k === 'ask_followup_and_screening' && /复诊|筛查|随访|检查/.test(text)) hit = true;
        else if (k === 'ask_open_question' && /怎么|如何|怎么样/.test(text)) hit = true;
        else if (k === 'ask_specific_fact' && /怎么|如何|多少|几次/.test(text)) hit = true;
        else if (k === 'identify_case_warning' && /危险|警示|紧急|严重/.test(text)) hit = true;
        else if (k === 'timely_referral' && /转介|就医|医生|医院|120/.test(text)) hit = true;
        else if (k === 'no_self_adjustment' && /不要|不建议|不能/.test(text)) hit = true;
        else if (k === 'refer_qualified_professional' && /医生|医务人员|专科/.test(text)) hit = true;
        else if (/测量|怎么测|规范/.test(text)) hit = true;
        if (hit) { revealed.push(h.value); S.revealed.push(h.value); break; }
      }
    }
    let reply;
    if (revealed.length) reply = `（犹豫了一下）其实……${revealed[0]}。`;
    else if (/你好|您好/.test(text)) reply = '你好。';
    else if (/药|吃药/.test(text)) reply = '我这情况要不要吃药啊？';
    else if (/担心|顾虑/.test(text)) reply = '我就是有点不放心。';
    else if (/怎么|如何/.test(text)) reply = '我也不知道，所以才来问你。';
    else reply = '嗯，你接着说。';
    return { text: reply, revealed };
  }

  // ---------- 评分 ----------
  async function goScoring() {
    setSteps('dialogue'); setNav('review');
    // 从对话日志抽取证据候选（受限证据抽取角色）
    const evidence = extractEvidence();
    S.evidence = evidence;

    // 先尝试让 MCP 真实评分（服务端校验证据、归一化、封顶与红线）
    let scored = null;
    if (MCP.sessionId) {
      try {
        await MCP.call('advance_stage', { session_id: MCP.sessionId, stage: 'evidence_extraction' });
        const mapped = evidence.map((e) => {
          const row = S.dialogue.find((d) => d.speaker === 'student' && d.raw_text === e.quote);
          const turnId = row && row.mcp_turn_id ? row.mcp_turn_id : e.turn_id;
          return { ...e, turn_id: turnId };
        }).filter((e) => e.turn_id !== undefined && e.turn_id !== null && e.turn_id !== '');
        const result = await MCP.call('score_session', {
          session_id: MCP.sessionId,
          evidence_candidates: mapped,
        });
        const scorePayload = (result && result.score_result) || result;
        if (scorePayload && typeof scorePayload.total_score === 'number' && Array.isArray(scorePayload.item_results)) {
          scored = {
            ...scorePayload,
            source: 'mcp',
            caps: (scorePayload.caps || []).map((c) => ({ reason: c.reason || c.cap_total || '封顶' })),
            item_results: scorePayload.item_results.map((x) => ({
              ...x,
              behavior: x.behavior || '',
              evidence: Array.isArray(x.evidence) ? x.evidence : [],
            })),
          };
        }
      } catch (e) {
        if (COURSE) throw e;
        scored = null;
      }
    }
    if (COURSE && !scored) throw new Error('服务端评分未完成，请检查训练要求后重试');

    if (scored) {
      S.scoreResult = scored;
      setBubble('评分由知护评分引擎（MCP）真实计算完成～');
    } else {
      const session = {
        session_id: S.sessionId,
        case_id: S.currentCase.case_id,
        pretest_result: S.pretest,
        evidence_candidates: evidence,
        red_line_tags: [],
      };
      S.scoreResult = ZH.scoreTraining(session);
      setBubble('MCP 评分门禁要求 ≥8 轮并覆盖本病例全部要点，本轮未达门禁，已用本地评分引擎出报告～');
    }

    // ⑭ 三率：完整度（问了/查了多少）、完成度（八步走到哪）、准确性（诊断与分型对不对）
    // 注意：踩分点 must_cover 属于评分私有字段，公开视图里被剥掉了，这里必须用私有病例
    S.assessment = ZH.assessCase(S.casePrivate || S.currentCase, {
      asked: S.collect.asked, exams: S.collect.exams, labs: S.collect.labs,
      summary: S.analysis.summary, diagnosis: S.analysis.diagnosis, pattern: S.analysis.pattern,
      messages: S.dialogue, scoreResult: S.scoreResult,
    });
    if (window.ZH_STORE) {
      const dims = {};
      Object.entries(S.scoreResult.dimension_scores || {}).forEach(([k, v]) => { dims[k] = v.percentage; });
      ZH_STORE.recordTraining(S.major, S.currentCase.case_id, {
        dims,
        total: S.scoreResult.total_score,
        redLines: (S.scoreResult.red_lines || []).length,
        rates: { completion: S.assessment.completion, completeness: S.assessment.completeness, accuracy: S.assessment.accuracy },
        pattern: S.analysis.pattern || '',
      });
    }
    if (scored && (S.currentCase.learning_objectives || []).length) {
      try {
        const report = await MCP.call('generate_training_report', { session_id: MCP.sessionId, exam_reasoning: S.analysis.examReasoning || {}, collected: experienceCollection() });
        S.report = report.summary;
        S.objectiveReportError = false;
      } catch (e) { S.objectiveReportError = true; }
    }
    renderReport();
  }

  function extractEvidence() {
    // 受限证据抽取：从学生原话中找评分项标签，逐字引用，不确定不贴
    const rubric = D.rubric;
    const items = rubric.items.filter((x) => x.scope.includes('*') || x.scope.includes(S.currentCase.case_id));
    const ev = [];
    const studentTurns = S.dialogue.filter((d) => d.speaker === 'student');
    // 简单启发式关键词 → 标签映射（演示用；真实版由 LLM 抽取，但这里保证不伪造）
    const KW = {
      'ask_open_question': /怎么|如何|什么情况|怎么样/,
      'ask_specific_fact': /多少|几次|什么时候|具体|几号/,
      'use_trend': /连续|趋势|几次|记录|变化/,
      'avoid_single_reading_conclusion': /不能单|一次|不代表|不结论|多次/,
      'identify_case_warning': /危险|警示|紧急|严重|马上|立即/,
      'timely_referral': /转介|就医|医生|医院|120|挂号/,
      'no_self_adjustment': /不要|不能|不建议|不自行|停药|换药|调药/,
      'refer_qualified_professional': /医生|医务人员|专科|就诊/,
      'ask_concern': /担心|顾虑|顾虑|怕/,
      'acknowledge_concern': /理解|明白|放心|别担心/,
      'plain_language': /通俗|简单说|大白话/,
      'explain_reason': /因为|所以|原因/,
      'teach_back': /你能复述|能再说|你听懂|复述/,
      'shared_decision': /一起|我们商量|你觉得|可以吗/,
      'specific_next_step': /下次|接下来|建议你|计划/,
      'defer_diagnosis': /我不|不能诊断|不确定|需医生|由医生/,
      'state_evidence_limit': /证据|信息不足|还需|进一步/,
    };
    for (const t of studentTurns) {
      const tags = [];
      for (const [tag, re] of Object.entries(KW)) {
        if (re.test(t.raw_text) && !tags.includes(tag)) tags.push(tag);
      }
      // 红线标签
      if (/你是糖尿病|你就是|诊断/.test(t.raw_text)) tags.push('diagnose_real_person');
      if (/吃.*药|推荐.*药|剂量/.test(t.raw_text)) tags.push('recommend_specific_drug_or_dose');
      if (/停药|换药|调整药/.test(t.raw_text)) tags.push('suggest_stop_switch_adjust_medication');
      if (/偏方|保健品/.test(t.raw_text)) tags.push('endorse_unverified_remedy');
      if (!tags.length) continue;
      // 找适用这些标签的评分项
      for (const item of items) {
        const itemTags = new Set();
        for (const lv of ['full', 'partial']) {
          const cond = item[lv] || {};
          for (const k of ['all_tags', 'any_tags', 'allowed_tags']) (cond[k] || []).forEach((x) => itemTags.add(x));
        }
        const matched = tags.filter((tg) => itemTags.has(tg));
        if (matched.length) {
          ev.push({ item_id: item.item_id, turn_id: t.turn_id, quote: t.raw_text, tags: matched, confidence: 0.7, source: 'evidence_extractor' });
        }
      }
      // 红线标签单独记录
    }
    return ev;
  }

  // ---------- 报告 ----------
  function renderReport() {
    setSteps('review'); setNav('review');
    const r = S.scoreResult;
    const pre = S.pretest;
    const dims = r.dimension_scores || {};
    const caps = r.caps || [];
    const reds = r.red_lines || [];
    const as = S.assessment || null;
    const store = window.ZH_STORE || null;
    const focusItems = (r.item_results || []).filter(x => x.level !== 'full');
    $app.innerHTML = `
      <div class="report-actions"><span class="pill ${r.source === 'mcp' ? 'ok' : ''}">${r.source === 'mcp' ? '训练评分' : '本地评分'}</span><button class="btn" id="btn-retrain">进入变式重练 →</button>${!COURSE ? '<button class="btn ghost" id="report-archive">查看学习档案</button>' : ''}<button class="btn ghost" id="btn-restart">重新开始</button></div>
      <section class="card report-overview">
        <div class="report-score"><div class="care-eyebrow">SELF-TEST</div><div class="report-number">${pre ? pre.percentage : '—'}</div><p>自测得分 / 100${pre ? '' : ' · 本轮未自测'}</p></div>
        <div class="report-score"><div class="care-eyebrow">PRACTICE</div><div class="report-number">${esc(r.total_score)}</div><p>实践得分 / 100</p></div>
        <div class="report-next"><h2>把复盘，变成下一步行动。</h2><p>${focusItems.length ? '下一轮重点：' + esc(focusItems[0].behavior || focusItems[0].item_id) : '本轮评分项已达成。可以进入变式训练，检验不同情境下的应用。'}</p><span class="hint">依据本轮评分项与对话证据整理</span></div>
      </section>
      <p class="hint report-session">会话 ${esc(S.sessionId)} · ${esc(S.currentCase.case_id)} · ${esc(S.currentCase.title)}</p>
      ${caps.length ? `<div class="notice report-alert"><b>总分封顶</b>：${caps.map(c => esc(c.reason)).join('；')}</div>` : ''}
      ${reds.length ? `<div class="notice report-alert"><b>边界违规</b>：${reds.map(x => esc(x.red_line_id) + '（' + esc(x.action) + '）').join('；')}</div>` : ''}
      <div class="report-grid">
        <section class="card report-skills"><h2>能力画像</h2>
          ${store ? `<div class="radar-wrap">${radarSVG(store.radar(S.major).axes)}</div><p class="hint">学习档案：五个实践维度与知识掌握；未完成的维度显示为「—」。</p>` : '<p class="hint">本环境暂无学习档案。</p>'}
          <div class="divider"></div><h3 class="sec-h">本轮维度表现</h3>
          ${Object.entries(dims).map(([k,v]) => `<div class="report-dimension"><div><b>${esc(dimName(k))}</b><span>${esc(v.percentage)}%</span></div><div class="dim-bar"><i style="width:${Math.max(0, Math.min(100, Number(v.percentage) || 0))}%"></i></div></div>`).join('') || '<p class="hint">暂无维度评分数据。</p>'}
        </section>
        <section class="card report-evidence"><h2>评分项与原话证据</h2><p class="lead">回到具体表达，理解每一项得分的依据。</p>
          ${(r.item_results || []).map(x => `<article class="evidence-row"><div class="evidence-heading"><b>${esc(x.item_id)}</b><span class="pill ${x.level === 'full' ? 'ok' : x.level === 'partial' ? 'warn' : 'bad'}">${esc(levelName(x.level))}</span><span class="hint">${esc(x.score)}/${esc(x.max_score)}</span></div><p>${esc(x.behavior)}</p>${(x.evidence || []).map(e => `<blockquote>第 ${esc(e.turn_id)} 轮：${esc(e.quote)}</blockquote>`).join('') || '<p class="hint">无有效原话证据，不计分。</p>'}</article>`).join('') || '<p class="hint">暂无评分项记录。</p>'}
        </section>
      </div>
      ${as ? `<section class="card report-process"><h2>诊疗流程检查</h2><div class="rate-grid">
        <div class="rate-card"><div class="rate-h"><b>完成度</b><span>${as.completion}%</span></div><div class="dim-bar"><i style="width:${as.completion}%"></i></div><p class="hint">八步完成 ${as.steps.filter(x => x.done).length}/8</p></div>
        <div class="rate-card"><div class="rate-h"><b>完整度</b><span>${as.completeness}%</span></div><div class="dim-bar"><i style="width:${as.completeness}%"></i></div><p class="hint">病史、系统回顾、查体与检查覆盖比例</p></div>
        <div class="rate-card"><div class="rate-h"><b>准确性</b><span>${as.accuracy}%</span></div><div class="dim-bar"><i style="width:${as.accuracy}%"></i></div><p class="hint">诊断关键词命中 ${as.diag_hit}% · 分型 ${as.pattern_ok ? '正确' : '未命中'}</p></div>
      </div><h3 class="sec-h">关键环节</h3><div class="must-grid">${as.must_cover.map(m => `<span class="chip ${m.covered ? 'on' : ''}">${m.covered ? '✓' : '○'} ${esc(m.item)}</span>`).join('') || '<p class="hint">本病例未设置踩分点。</p>'}</div><div class="divider"></div><div class="step-list">${as.steps.map(x => `<span class="step-item ${x.done ? 'on' : ''}"><b>${x.done ? '✓' : '○'}</b>${esc(x.label)}<span class="hint">${esc(x.detail)}</span></span>`).join('')}</div></section>` : ''}
      <section class="card"><h2>本轮学习回顾</h2>${objectiveReviewHtml()}<p class="hint">${!MCP.sessionId ? '未连接训练会话，无法核验带教使用记录。' : S.experienceAssistance && S.experienceAssistance.consultations ? `本轮已使用指南带教 ${esc(S.experienceAssistance.consultations)} 次；评分标准不变。` : '本轮尚无指南带教使用记录。'}</p><div id="report-experience" aria-live="polite"></div></section>
    `;
    if (!COURSE) document.getElementById('report-archive').onclick = goSummary;
    if (window.ZH_EXPERIENCE) {
      const target = document.getElementById('report-experience');
      window.ZH_EXPERIENCE.search('').then((result) => { if (target.isConnected) target.innerHTML = window.ZH_EXPERIENCE.render(result); });
    }
    document.getElementById('btn-retrain').addEventListener('click', () => {
      const v = S.currentCase.variant_of ? S.currentCase.case_id : (S.currentCase.case_id + '-V1');
      const variant = ZH.getCase(v, false);
      if (variant.status === 'ok') { loadCase(v); }
      else { setBubble('该病例暂无变式，你可以重新选择病例练习。'); goCases(); }
    });
    document.getElementById('btn-restart').addEventListener('click', () => { location.reload(); });
    if (COURSE) {
      document.getElementById('btn-retrain').hidden = true;
      const back = document.getElementById('btn-restart');
      back.textContent = '返回课程查看教师复核成绩';
      back.onclick = () => { location.href = 'classroom.html'; };
      back.replaceWith(Object.assign(document.createElement('a'), {className:'btn', href:'classroom.html', textContent:back.textContent}));
    }
  }

  function dimName(k) {
    return { information: '信息询问', measurement: '测量与记录', application: '解释与应用', safety: '风险与边界', communication: '沟通与行动' }[k] || k;
  }
  function levelName(l) {
    return { full: '满分', partial: '部分', zero: '未达成', zero_red_line: '红线归零' }[l] || l;
  }

  // ---------- 模块导航切换（已进入流程后仅作锚点提示） ----------
  document.getElementById('module-nav').addEventListener('click', (e) => {
    const a = e.target.closest('a');
    if (!a) return;
    if (!a.dataset.m) return;
    e.preventDefault();
    if (COURSE) return;
    const m = a.dataset.m;
    if (m === 'resources') {
      goResources(); return;
    }
    // 若当前阶段已越过该模块，可跳回查看；否则提示
    const map = { workbench: renderWelcome, weak: goExplain, cases: goCases, analysis: goAnalysis, dialogue: goDialogue, review: renderReport };
    if (m === 'workbench') { if (S.major) goLearningChoice(); else renderWelcome(); return; }
    if (m === 'summary') { if (!S.major) { setBubble('请先选择专业方向～'); return; } goSummary(); return; }
    if (!S.major) { setBubble('请先选择专业方向开始训练～'); return; }
    if (m === 'quiz') { S.learningPath = 'quiz'; goPretest(); return; }
    if (m === 'weak' && S.pretest) { goExplain(); return; }
    if (m === 'cases' && S.major) { enterCaseTraining(); return; }
    if (m === 'analysis' && S.currentCase) { goAnalysis(); return; }
    if (m === 'dialogue' && S.currentCase) { goDialogue(); return; }
    if (m === 'review' && S.scoreResult) { renderReport(); return; }
    setBubble('这一步还没进行到，请按流程先完成前面的环节～');
  });

  // ---------- WorkBuddy 通道自检（网页 → 云函数 → WorkBuddy Agent） ----------
  const WB = { health: null, session: null, busy: false };
  const wb$ = (id) => document.getElementById(id);

  function wbSetChip(cls, text) {
    const chip = wb$('wb-chip');
    if (!chip) return;
    chip.classList.remove('ok', 'warn', 'err');
    if (cls) chip.classList.add(cls);
    const t = wb$('wb-chip-text');
    if (t) t.textContent = text;
  }

  function wbRender() {
    const h = WB.health, s = WB.session;
    if (wb$('wb-svc')) wb$('wb-svc').textContent = h ? `${h.service || 'zhihu-agent'} · 已连通` : '未连通';
    if (wb$('wb-agent')) wb$('wb-agent').textContent = (h && h.workbuddy_agent_id) || '—';
    if (wb$('wb-model')) wb$('wb-model').textContent = (h && h.model) || '—';
    if (wb$('wb-session')) wb$('wb-session').textContent = (s && s.session_id) || (s && s.detail) || '未创建';
    if (wb$('wb-request')) wb$('wb-request').textContent = (s && s.request_id) || '—';
  }

  async function wbPing() {
    try {
      const r = await fetch(AGENT_API, { method: 'GET', headers: { Accept: 'application/json' } });
      if (!r.ok) throw new Error(`http-${r.status}`);
      WB.health = await r.json();
      wbRender();
      wbSetChip(WB.health.local_only || WB.health.workbuddy_configured ? 'ok' : 'warn',
        WB.health.local_only ? '知护 · 本地运行' : WB.health.workbuddy_configured ? 'WorkBuddy · 已连通' : 'WorkBuddy · 未配置');
    } catch (e) {
      wbRender();
      wbSetChip('err', 'WorkBuddy · 离线');
    }
  }

  async function wbCreateSession() {
    if (WB.busy) return;
    WB.busy = true;
    const btn = wb$('wb-create');
    if (btn) { btn.disabled = true; btn.textContent = '创建中…'; }
    try {
      const r = await fetch(AGENT_API, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'create_workbuddy_session' }),
      });
      const data = await r.json().catch(() => ({}));
      WB.session = data;
      wbSetChip(r.ok && data.session_id ? 'ok' : 'warn',
        r.ok && data.session_id ? 'WorkBuddy · 会话已创建' : 'WorkBuddy · 待检查');
      wbRender();
    } catch (e) {
      WB.session = { detail: `请求失败：${e.message || e}` };
      wbSetChip('err', 'WorkBuddy · 请求失败');
      wbRender();
    } finally {
      WB.busy = false;
      if (btn) { btn.disabled = false; btn.textContent = '创建 WorkBuddy 会话'; }
    }
  }

  function wbInit() {
    const chip = wb$('wb-chip');
    const panel = wb$('wb-panel');
    if (!chip || !panel) return;
    chip.addEventListener('click', () => {
      const open = panel.hidden;
      panel.hidden = !open;
      chip.setAttribute('aria-expanded', String(open));
    });
    document.addEventListener('click', (e) => {
      if (panel.hidden) return;
      if (panel.contains(e.target) || chip.contains(e.target)) return;
      panel.hidden = true;
      chip.setAttribute('aria-expanded', 'false');
    });
    const btn = wb$('wb-create');
    if (btn && window.__LOCAL_ONLY__) {
      btn.hidden = true;
      const note = panel.querySelector('.wb-note');
      if (note) note.textContent = '当前通过本机 Python 工具运行训练与经验库检索，不调用云端模型。SP使用原有本地规则回应。';
    } else if (btn) btn.addEventListener('click', wbCreateSession);
    wbPing();
  }

  // ---------- 启动 ----------
  wbInit();
  if (COURSE) {
    $app.innerHTML = '<div class="card">正在核对课程任务与学生账号…</div>';
    COURSE.ready().then(task => {
      S.major = task.major;
      return startLearningPath(task.kind);
    }).catch(error => COURSE.fail(error.message));
  } else renderWelcome();

  // 仅自测/截图脚本使用；正常打开页面不会挂载
  if (window.__SELFTEST__) {
    window.__ZH_DEBUG = {
      renderWorkbench, goResources, goSummary, goCases, loadCase, goPretest, goInterview, goAnalysis, goDialogue, goLearningChoice, startLearningPath, renderGraded,
      questionCaseChoices, renderQuestionCaseTraining, questionObjective, attachCaseObjectives, objectiveTasksHtml, readAnalysisInputs, resetCaseState,
      goScoring, renderReport, openQA, ruleSP, state: S,
    };
  }
})();
