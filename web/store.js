// 知护学习档案（② 薄弱点汇总 / ⑦ 错题集与考前清单）
// 本机学习辅助档案；课程模式按课程与学生隔离，正式成绩由课程服务保存。
// 记录粒度：每次自测（含逐题对错）+ 每次病例演练（五维得分与三率）。
(function () {
  'use strict';
  const KEY = 'zhihu.progress.v1';
  const storageKey = () => window.ZH_COURSE?.active ? window.ZH_COURSE.storageKey() : KEY;
  const MAX_ATTEMPTS = 40;

  const LEVEL_LABEL = {
    basic: '基础', intermediate: '提高', advanced: '困难', expert: '专家', english: '英语',
  };
  const AXES = [
    ['information', '信息询问'], ['measurement', '测量记录'], ['application', '解释应用'],
    ['safety', '风险边界'], ['communication', '沟通行动'],
  ];

  function blank() { return { version: 1, updated: 0, majors: {} }; }

  function read() {
    try {
      const key = storageKey();
      const raw = key ? window.localStorage.getItem(key) : null;
      if (!raw) return blank();
      const s = JSON.parse(raw);
      return s && typeof s === 'object' && s.majors ? s : blank();
    } catch (e) { return blank(); }
  }

  function write(s) {
    s.updated = Date.now();
    try { const key = storageKey(); if (key) window.localStorage.setItem(key, JSON.stringify(s)); } catch (e) { /* 隐私模式/配额满：静默降级 */ }
    return s;
  }

  function bucket(s, major) {
    const k = major || 'other';
    if (!s.majors[k]) s.majors[k] = { attempts: [], nodes: {}, wrong: {}, cases: [], levels: {} };
    const b = s.majors[k];
    b.attempts = b.attempts || [];
    b.nodes = b.nodes || {};
    b.wrong = b.wrong || {};
    b.cases = b.cases || [];
    b.levels = b.levels || {};
    return b;
  }

  const nodeKey = (row) => row.node_id || ('q:' + row.question_id);
  function nodeTitle(row) {
    if (row.card && row.card.title) return row.card.title;
    if (row.card_imported) return String(row.stem || '题目解析').slice(0, 20);
    return row.node_id || String(row.stem || '相关考点').slice(0, 20);
  }

  // 一次自测：rows = ZH.gradePaper 的结果
  function recordPretest(major, level, rows) {
    const list = (rows || []).filter((r) => r && r.question_id);
    if (!list.length) return read();
    const s = read();
    const b = bucket(s, major);
    const score = list.filter((r) => r.correct).length;
    b.attempts.push({
      ts: Date.now(), kind: 'pretest', level: level || 'basic',
      score, max: list.length, ids: list.map((r) => r.question_id),
    });
    if (b.attempts.length > MAX_ATTEMPTS) b.attempts = b.attempts.slice(-MAX_ATTEMPTS);

    for (const row of list) {
      const key = nodeKey(row);
      const n = b.nodes[key] = b.nodes[key] || { wrong: 0, right: 0, title: nodeTitle(row) };
      if (row.correct) n.right += 1; else n.wrong += 1;
      if (!n.title) n.title = nodeTitle(row);
      const prev = b.wrong[row.question_id];
      if (!row.correct) {
        b.wrong[row.question_id] = {
          qid: row.question_id, stem: row.stem || '', node_id: row.node_id || '',
          title: nodeTitle(row), ts: Date.now(), level: level || 'basic',
          times: (prev ? prev.times : 0) + 1,
        };
      } else if (prev) {
        // 答对一次就销账，错题集只留"还没弄懂"的题
        delete b.wrong[row.question_id];
      }
    }

    const lv = b.levels[level || 'basic'] = b.levels[level || 'basic'] || { best: 0, tries: 0 };
    lv.tries += 1;
    // 旧记录每卷5题；改为百分比比较，避免20题和5题的原始分数混比。
    lv.best_pct = Math.max(lv.best_pct ?? Math.min(100, Math.round(lv.best / 5 * 100)), Math.round(score / list.length * 100));
    lv.best = Math.max(lv.best, score);
    return write(s);
  }

  // 一次病例演练：dims = {information: 80, ...}（百分比），total = 实践分
  function recordTraining(major, caseId, info) {
    const s = read();
    const b = bucket(s, major);
    const rec = {
      ts: Date.now(), caseId: caseId || '', dims: (info && info.dims) || {},
      total: info && typeof info.total === 'number' ? info.total : null,
      redLines: (info && info.redLines) || 0,
      rates: (info && info.rates) || null,
      pattern: (info && info.pattern) || '',
    };
    b.cases.push(rec);
    if (b.cases.length > 20) b.cases = b.cases.slice(-20);
    b.attempts.push({ ts: rec.ts, kind: 'case', caseId: rec.caseId, score: rec.total || 0, max: 100 });
    return write(s);
  }

  function summary(major) {
    const s = read();
    const b = s.majors[major || 'other'];
    if (!b) {
      return { empty: true, attempts: 0, accuracy: 0, best: 0, nodes: [], weak: [], wrong: [], levels: {}, trend: [], cases: [], updated: s.updated };
    }
    const pres = (b.attempts || []).filter((a) => a.kind === 'pretest');
    const totalQ = pres.reduce((t, a) => t + (a.max || 0), 0);
    const rightQ = pres.reduce((t, a) => t + (a.score || 0), 0);
    const nodes = Object.keys(b.nodes || {}).map((k) => {
      const n = b.nodes[k];
      const tries = (n.wrong || 0) + (n.right || 0);
      return {
        key: k, title: n.title || k, wrong: n.wrong || 0, right: n.right || 0,
        tries, rate: tries ? Math.round(((n.wrong || 0) / tries) * 100) : 0,
      };
    }).sort((a, b2) => b2.wrong - a.wrong || b2.rate - a.rate || a.title.localeCompare(b2.title));
    const wrong = Object.keys(b.wrong || {}).map((k) => b.wrong[k]).sort((a, b2) => b2.ts - a.ts);
    return {
      empty: false,
      attempts: pres.length,
      accuracy: totalQ ? Math.round((rightQ / totalQ) * 100) : 0,
      best: b.levels ? Object.keys(b.levels).reduce((m, k) => Math.max(m, b.levels[k].best || 0), 0) : 0,
      levels: b.levels || {},
      nodes,
      weak: nodes.filter((n) => n.wrong > 0).slice(0, 8),
      wrong,
      trend: pres.slice(-8).map((a) => ({ ts: a.ts, pct: a.max ? Math.round((a.score / a.max) * 100) : 0 })),
      cases: (b.cases || []).slice(-5),
      updated: s.updated,
    };
  }

  // ⑦ 个人能力六边形：五维来自最近一次病例演练，第六轴用自测正确率
  function radar(major) {
    const sum = summary(major);
    const last = sum.cases.length ? sum.cases[sum.cases.length - 1] : null;
    const dims = (last && last.dims) || {};
    const axes = AXES.map(([key, label]) => ({
      key, label,
      value: typeof dims[key] === 'number' ? Math.round(dims[key]) : null,
    }));
    axes.push({ key: 'knowledge', label: '知识掌握', value: sum.attempts ? sum.accuracy : null });
    const filled = axes.filter((a) => a.value !== null).length;
    return { axes, hasCase: !!last, practice: last ? last.total : null, filled };
  }

  // ② 个性化错题卷：错得最多、最近的题优先
  function wrongIds(major, limit) {
    const sum = summary(major);
    return sum.wrong.slice(0, limit || 5).map((w) => w.qid);
  }

  function levelLabel(level) { return LEVEL_LABEL[level] || level; }

  function reset(major) {
    if (!major) return write(blank());
    const s = read();
    delete s.majors[major];
    return write(s);
  }

  window.ZH_STORE = {
    recordPretest, recordTraining, summary, radar, wrongIds, levelLabel, reset,
    AXES, LEVEL_LABEL, KEY,
    raw: read,
  };
})();
