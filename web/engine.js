// 知护确定性引擎（前端复刻版）
// 与 zhihu/scripts/*.py 逻辑 1:1 等价：自测批改、知识检索、病例读取、确定性评分、红线封顶。
// 只依赖 window.ZHIHU_DATA。

(function () {
  'use strict';
  const D = () => window.ZHIHU_DATA;

  // ---------- 通用 ----------
  const squash = (s) => String(s || '').replace(/[\s，,。.、！!？?「」【】《》()（）\-_/\\·~]+/g, '').toLowerCase();

  // ---------- 专业归一化（等价 normalize_major） ----------
  const MAJOR_ALIASES = {
    '临床': 'clinical_medicine', '临床医学': 'clinical_medicine', '临床医学专业': 'clinical_medicine',
    'clinical': 'clinical_medicine', 'clinical_medicine': 'clinical_medicine', 'medicine': 'clinical_medicine',
    '医学技术': 'medical_technology', '医学技术专业': 'medical_technology', '检验': 'medical_technology',
    '医学检验': 'medical_technology', '影像': 'medical_technology', 'medical_technology': 'medical_technology',
    '护理': 'nursing', '护理学': 'nursing', '护理学专业': 'nursing', 'nurse': 'nursing', 'nursing': 'nursing',
    '中医': 'traditional_chinese_medicine', '中医学': 'traditional_chinese_medicine',
    '中医学专业': 'traditional_chinese_medicine', 'tcm': 'traditional_chinese_medicine',
    'traditional_chinese_medicine': 'traditional_chinese_medicine',
    '康复': 'rehabilitation', '康复治疗': 'rehabilitation', 'rehabilitation': 'rehabilitation',
    '健康管理': 'health_management', '健康服务': 'health_management', 'health_management': 'health_management',
    '其他': 'other', 'other': 'other',
  };

  function listMajors() {
    const papers = D().pretest.major_papers || {};
    return Object.keys(papers).sort();
  }

  function normalizeMajor(major) {
    const key = String(major || '').trim();
    const candidate = MAJOR_ALIASES[key] || MAJOR_ALIASES[key.toLowerCase()] || key;
    return listMajors().includes(candidate) ? candidate : 'other';
  }

  // ---------- 启动口令 ----------
  function matchStartTrigger(text) {
    const s = squash(text);
    if (!s) return null;
    const words = D().startup.trigger_words;
    for (const w of words) if (s === squash(w)) return w;
    for (const w of words) { const k = squash(w); if (k && s.startsWith(k)) return w; }
    return null;
  }

  function detectMajorInText(text) {
    const s = squash(text);
    if (!s) return null;
    for (const alias of Object.keys(MAJOR_ALIASES).sort((a, b) => b.length - a.length)) {
      const k = squash(alias);
      if (k && s.includes(k)) return MAJOR_ALIASES[alias];
    }
    return null;
  }

  // ---------- 自测（等价 check_pretest） ----------
  const PAPER_SIZE = 5; // 完整流程默认5题；只答题可传入20题

  function listLevels(major) {
    const papers = D().pretest.major_papers || {};
    const entry = papers[major] || papers['other'] || {};
    if (!entry || Array.isArray(entry)) return ['basic'];
    const active = {};
    for (const q of (D().pretest.questions || [])) if (q.active !== false) active[q.question_id] = true;
    // 题量不足5道的档位暂停，不复制低质量题补数。
    return ['basic', 'intermediate', 'advanced', 'expert', 'english']
      .filter((lv) => (entry[lv] || []).filter((qid) => active[qid]).length >= PAPER_SIZE);
  }

  function buildPaper(major, level, questionIds, questionCount) {
    const size = questionCount === 20 ? 20 : PAPER_SIZE;
    const quiz = D().pretest;
    const papers = quiz.major_papers || {};
    const paper = papers[major] || papers['other'] || {};
    const lv = level || 'basic';
    const index = {};
    for (const q of (quiz.questions || [])) if (q.active !== false) index[q.question_id] = q;
    // 严格筛选后题量不足5道的档位暂停，自动回落到该专业第一个可成卷档位。
    let ids = Array.isArray(paper) ? paper.filter((id) => index[id]) : (paper[lv] || []).filter((id) => index[id]);
    if (!Array.isArray(paper) && ids.length < PAPER_SIZE) {
      const fallback = ['basic', 'intermediate', 'advanced', 'expert', 'english']
        .map((name) => (paper[name] || []).filter((id) => index[id]))
        .find((list) => list.length >= PAPER_SIZE);
      if (fallback) ids = fallback;
    }
    ids = Array.from(new Set(ids));
    if (Array.isArray(questionIds) && questionIds.length) {
      // 批改时按出题时的题号复现同一组题，保证出题与批改一致
      ids = questionIds.filter((id) => index[id]);
    } else if (ids.length > size) {
      const pool = ids.slice();
      for (let i = pool.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        const t = pool[i]; pool[i] = pool[j]; pool[j] = t;
      }
      ids = pool.slice(0, size);
    }
    return (ids || []).map((id) => index[id]).filter(Boolean)
      .map((q) => Object.assign({}, q, { level: lv }));
  }

  function normalizeSelection(value) {
    return Array.from(new Set(String(value || '').trim().toUpperCase().split(''))).sort().join('');
  }

  function checkPretest(answers, major, level, questionIds, optionMaps) {
    const quiz = D().pretest;
    const submitted = (answers || {}).answers || answers || {};
    const questions = buildPaper(major, level, questionIds);
    const detail = [], weak = [];
    let earned = 0, possible = 0;
    for (const q of questions) {
      const displayed = normalizeSelection(submitted[q.question_id]);
      const map = optionMaps && optionMaps[q.question_id];
      const actual = map ? normalizeSelection(displayed.split('').map((letter) => map[letter] || '').join('')) : displayed;
      const expected = normalizeSelection(q.answer);
      const correct = actual === expected;
      const points = Number(q.score || 1);
      possible += points; if (correct) earned += points;
      if (!correct && !weak.includes(q.node_id)) weak.push(q.node_id);
      detail.push({
        question_id: q.question_id, node_id: q.node_id, submitted: displayed || null,
        correct, score: correct ? points : 0, max_score: points, explanation_ref: q.explanation_ref,
      });
    }
    return {
      status: 'ok', quiz_id: quiz.quiz_id, quiz_version: quiz.version, major,
      paper: questions.map((q) => q.question_id), score: earned, max_score: possible,
      percentage: possible ? Math.round((earned / possible) * 10000) / 100 : 0,
      weak_nodes: weak, detail,
    };
  }

  function randomizePaper(paper, attemptId) {
    const seedText = String(attemptId || (Date.now() + ':' + Math.random()));
    const optionMaps = {};
    const questions = (paper || []).map((q) => {
      const stable = Object.keys(q.options || {});
      let hash = 2166136261;
      const source = seedText + ':' + q.question_id;
      for (let i = 0; i < source.length; i++) { hash ^= source.charCodeAt(i); hash = Math.imul(hash, 16777619); }
      function next() { hash += 0x6D2B79F5; let t = hash; t = Math.imul(t ^ (t >>> 15), t | 1); t ^= t + Math.imul(t ^ (t >>> 7), t | 61); return ((t ^ (t >>> 14)) >>> 0) / 4294967296; }
      for (let i = stable.length - 1; i > 0; i--) { const j = Math.floor(next() * (i + 1)); [stable[i], stable[j]] = [stable[j], stable[i]]; }
      const displayed = {};
      optionMaps[q.question_id] = {};
      stable.forEach((stableId, idx) => {
        const letter = 'ABCDE'[idx];
        displayed[letter] = q.options[stableId];
        optionMaps[q.question_id][letter] = stableId;
      });
      return Object.assign({}, q, { options: displayed });
    });
    return { attemptId: seedText, questions, optionMaps };
  }

  // ---------- 批改详情（供"批改结果"与"考点讲解"两页渲染） ----------
  // 题库题面只有 answer 与 explanation_ref，四段解析（结论/说人话/误区/边界）在知识卡上，
  // 这里把两者按 question_id / knowledge_id 拼在一起，渲染层不再自己查。
  function cardIndex() {
    const idx = {};
    for (const c of (D().knowledge.cards || [])) idx[c.knowledge_id] = c;
    return idx;
  }

  function gradePaper(paper, answers, optionMaps) {
    const quiz = D().pretest;
    const index = {};
    for (const q of (quiz.questions || [])) index[q.question_id] = q;
    const cards = cardIndex();
    const submitted = (answers && answers.answers) || answers || {};
    return (paper || []).map(function (item, i) {
      const qid = typeof item === 'string' ? item : (item && item.question_id);
      const full = index[qid] || {};
      const options = (item && item.options) || full.options || {};
      const map = optionMaps && optionMaps[qid];
      const stableToDisplay = {};
      if (map) Object.entries(map).forEach(([display, stable]) => { stableToDisplay[stable] = display; });
      const stableAnswer = normalizeSelection(full.answer || (item && item.answer));
      const answer = map ? normalizeSelection(stableAnswer.split('').map((letter) => stableToDisplay[letter] || '').join('')) : stableAnswer;
      const chosen = normalizeSelection(submitted[qid]);
      const raw = cards[full.explanation_ref] || null;
      // 题库导入卡的标题是题干碎片（「…错误的是」），不能当知识点出处；
      // 但它的 claim 就是本题解析正文，保留内容、改由题面承担标题（①）。
      const imported = !!(raw && raw.card_kind === 'bank_import');
      return {
        no: i + 1,
        question_id: qid,
        stem: full.stem || (item && item.stem) || '',
        options: options,
        answer: answer,
        chosen: chosen,
        graded: Boolean(answer),
        correct: Boolean(answer) && chosen === answer,
        question_type: full.type || (item && item.type) || 'single_choice',
        node_id: full.node_id || '',
        explanation_ref: full.explanation_ref || '',
        explanation: full.explanation || '',
        // 题面保留简短来源；完整出处优先读取已绑定的知识卡。
        source: full.source || '',
        source_note: full.source_note || '',
        card: imported ? null : raw,
        card_kind: raw ? raw.card_kind : (full.explanation ? 'inline' : 'missing'),
        card_imported: imported ? raw : null,
      };
    });
  }

  // 错题按考点（node_id）聚合；取不到考点时按题目单独成组，保证不丢题。
  function groupWeakPoints(detail) {
    const groups = [];
    const map = {};
    for (const row of (detail || [])) {
      if (!row || row.correct || !row.graded) continue;
      const key = row.node_id || ('q:' + row.question_id);
      if (!map[key]) {
        const card = row.card || null;
        // 碎片卡不展示标题：用题面截断代替，保证"薄弱考点"读得通
        const title = card ? card.title
          : (row.card_imported ? String(row.stem || '').slice(0, 20)
          : (row.node_id || '相关考点'));
        map[key] = {
          node_id: row.node_id || '',
          title: title,
          claim: (card && card.claim) || (row.card_imported && row.card_imported.claim) || '',
          card: card,
          items: [],
        };
        groups.push(map[key]);
      }
      map[key].items.push(row);
    }
    return groups;
  }

  // ---------- 知识检索（等价 retrieve_knowledge） ----------
  function retrieveKnowledge(nodeId, knowledgeId) {
    const k = D().knowledge;
    let cards = k.cards.slice();
    if (nodeId) cards = cards.filter((c) => c.node_id === nodeId);
    if (knowledgeId) cards = cards.filter((c) => c.knowledge_id === knowledgeId);
    // 题目考点是细粒度 node_id，知识卡的 node_id 多为专业级主题节点：
    // 精确匹配落空时，经 node_map（题目 → explanation_ref）取对应知识卡。
    if (!cards.length && nodeId && !knowledgeId) {
      const ids = (k.node_map || {})[nodeId] || [];
      if (ids.length) {
        const wanted = new Set(ids);
        cards = k.cards.filter((c) => wanted.has(c.knowledge_id));
      }
    }
    return {
      status: cards.length ? 'ok' : 'not_found',
      node_id: nodeId, knowledge_id: knowledgeId,
      knowledge_cards: cards, fallback: cards.length ? null : k.fallback,
      content_status: k.content_status,
    };
  }

  // ---------- 病例（等价 get_training_case） ----------
  // ⑧ 分专业默认场景：临床医学默认医院门诊/急诊，护理/康复/中医/医技保留各自场景。
  function sceneDefaults(major) {
    return ((D().scene_defaults || {})[major] || []).slice();
  }

  function listCases(major, diseaseId, opts) {
    let filtered = D().cases.slice();
    const defaults = sceneDefaults(major);
    if (diseaseId) filtered = filtered.filter((c) => c.disease_id === diseaseId);
    if (opts && opts.sceneOnly && defaults.length) {
      filtered = filtered.filter((c) => defaults.includes(c.scene_group));
    }
    if (major && major !== 'other') {
      const prefix = { clinical_medicine: 'CL', medical_technology: 'MT', nursing: 'NU', traditional_chinese_medicine: 'TCM' }[major] || '';
      const key = (c) => [
        (c.recommended_majors || []).includes(major) ? 0 : 1,
        defaults.includes(c.scene_group) ? 0 : 1,
        prefix && !String(c.case_id).startsWith(prefix) ? 1 : 0,
        c.variant_of ? 1 : 0,
        c.case_id,
      ];
      filtered = filtered.slice().sort((a, b) => (JSON.stringify(key(a)) < JSON.stringify(key(b)) ? -1 : 1));
    }
    return filtered.map((c) => {
      const pp = c.public_profile || {};
      return {
        case_id: c.case_id, title: c.title, variant_of: c.variant_of,
        disease_id: c.disease_id, disease_label: c.disease_label,
        recommended: !!(major && (c.recommended_majors || []).includes(major)),
        recommended_majors: c.recommended_majors || [],
        professional_focus: (c.professional_focus || {})[major],
        scene_group: c.scene_group || '',
        setting: pp.setting || '',
        sex: pp.sex || '', age: pp.age,
        case_type: c.case_type || '',
        disease_pattern: c.disease_pattern || c.disease_label || '',
        has_structured: !!((c.structured || {}).authored),
        default_scene: defaults.includes(c.scene_group),
      };
    });
  }

  function getCase(caseId, includePrivate) {
    const c = D().cases.find((x) => x.case_id === caseId);
    if (!c) return { status: 'not_found', case_id: caseId };
    const copy = JSON.parse(JSON.stringify(c));
    if (!includePrivate) {
      for (const k of ['hidden_info', 'release_conditions', 'boundary_behaviors', 'persona', 'must_cover', 'initial_state']) delete copy[k];
      const topic = copy.disease_label || copy.title || copy.case_id;
      copy.task = `围绕「${topic}」完成合成病例训练，采集信息、分析证据并提出下一步，由你自主判断。`;
      copy.professional_focus = `围绕「${topic}」的本专业岗位实践`;
    }
    return { status: 'ok', synthetic_data: true, case: copy };
  }

  // ---------- 评分（等价 score_training） ----------
  function _matches(condition, tags) {
    if (!condition) return false;
    if (condition.all_tags && !condition.all_tags.every((t) => tags.has(t))) return false;
    if (condition.any_tags && !condition.any_tags.some((t) => tags.has(t))) return false;
    if (condition.min_distinct_tags) {
      const allowed = condition.allowed_tags || [];
      let cnt = 0; for (const t of allowed) if (tags.has(t)) cnt++;
      if (cnt < condition.min_distinct_tags) return false;
    }
    return true;
  }

  function scoreTraining(session) {
    const rubric = D().rubric;
    const caseId = session.case_id;
    // v1.1.0 起，评分项除了 scope（病例编号白名单）还可以按病例族生效：
    // applies_to.case_prefixes / applies_to.majors，避免一项只服务某一个旧病例。
    const itemApplies = (item) => {
      const scope = item.scope || [];
      if (scope.includes('*') || scope.includes(caseId)) return true;
      const ap = item.applies_to || {};
      const prefixes = ap.case_prefixes || [];
      if (prefixes.length && caseId && prefixes.some((p) => String(caseId).startsWith(p))) return true;
      const majors = ap.majors || [];
      return !!(majors.length && session.major && majors.includes(session.major));
    };
    const applicable = rubric.items.filter(itemApplies);
    const known = new Set(rubric.items.map((x) => x.item_id));
    const evidence = (session.evidence_candidates || []).map((e) => ({
      item_id: e.item_id, turn_id: e.turn_id, quote: String(e.quote || '').trim(),
      tags: Array.from(new Set(e.tags || [])).sort(), confidence: e.confidence, source: e.source || 'evidence_extractor',
    }));
    const grouped = {};
    for (const e of evidence) (grouped[e.item_id] = grouped[e.item_id] || []).push(e);

    const item_results = [];
    for (const item of applicable) {
      const ev = (grouped[item.item_id] || []).slice().sort((a, b) => String(a.turn_id).localeCompare(String(b.turn_id)));
      const tags = new Set(); for (const e of ev) for (const t of e.tags) tags.add(t);
      const level = _matches(item.full, tags) ? 'full' : _matches(item.partial, tags) ? 'partial' : 'zero';
      const score = Math.round(item.max_score * rubric.levels[level] * 100) / 100;
      item_results.push({ item_id: item.item_id, dimension: item.dimension, level, score, max_score: item.max_score, behavior: item.behavior, evidence: ev, knowledge_ref: item.knowledge_ref });
    }

    const allTags = new Set([...(session.red_line_tags || [])]);
    for (const e of evidence) for (const t of e.tags) allTags.add(t);
    const triggered = [];
    for (const rule of rubric.red_lines) {
      const matched = rule.tags.filter((t) => allTags.has(t)).sort();
      if (matched.length) triggered.push({ red_line_id: rule.red_line_id, matched_tags: matched, action: rule.action, cap_total: rule.cap_total, zero_items: rule.zero_items || [], knowledge_ref: rule.knowledge_ref });
    }
    const zeroItems = new Set(); for (const r of triggered) for (const i of r.zero_items) zeroItems.add(i);
    for (const r of item_results) if (zeroItems.has(r.item_id)) { r.score = 0; r.level = 'zero_red_line'; }

    const dim = {};
    for (const r of item_results) {
      if (!dim[r.dimension]) dim[r.dimension] = { score: 0, max_score: 0 };
      dim[r.dimension].score += r.score; dim[r.dimension].max_score += r.max_score;
    }
    const dimension_scores = {};
    for (const k of Object.keys(dim).sort()) {
      dimension_scores[k] = { ...dim[k], percentage: dim[k].max_score ? Math.round((dim[k].score / dim[k].max_score) * 10000) / 100 : 0 };
    }
    const raw = item_results.reduce((s, r) => s + r.score, 0);
    const possible = item_results.reduce((s, r) => s + r.max_score, 0);
    let total = possible ? Math.round((raw / possible) * 10000) / 100 : 0;

    const caps = [];
    for (const r of item_results) {
      const item = applicable.find((x) => x.item_id === r.item_id);
      if (item.cap && r.level.startsWith('zero')) caps.push({ source: r.item_id, cap_total: item.cap.if_zero, reason: item.cap.reason });
    }
    for (const r of triggered) caps.push({ source: r.red_line_id, cap_total: r.cap_total, reason: r.action });
    if (caps.length) total = Math.min(total, Math.min(...caps.map((c) => c.cap_total)));

    const refs = Array.from(new Set(item_results.map((r) => r.knowledge_ref).filter(Boolean))).sort();
    return {
      status: 'ok', session_id: session.session_id, case_id: caseId,
      rubric_version: rubric.rubric_version, rubric_status: rubric.status,
      item_results, dimension_scores, raw_score: raw, raw_max_score: possible,
      total_score: total, caps,
      red_lines: triggered.map((r) => ({ red_line_id: r.red_line_id, matched_tags: r.matched_tags, action: r.action, cap_total: r.cap_total, knowledge_ref: r.knowledge_ref })),
      evidence, uncertain_items: [], knowledge_refs: refs,
      pretest_result: session.pretest_result,
      calculation_note: '实践分按当前病例适用项归一化为 100；自测分不混入实践分。',
    };
  }

  // ---------- 评分项语义标签白名单（供证据抽取校验） ----------
  function allowedScoringTags() {
    const rubric = D().rubric;
    const tags = new Set();
    for (const item of rubric.items) {
      for (const level of ['full', 'partial']) {
        const cond = item[level] || {};
        for (const k of ['all_tags', 'any_tags', 'allowed_tags']) (cond[k] || []).forEach((t) => tags.add(t));
      }
    }
    for (const rule of rubric.red_lines) (rule.tags || []).forEach((t) => tags.add(t));
    return tags;
  }

  // ---------- ⑭ 三率评估：完成度 / 完整度 / 准确性 ----------
  const HIST_SECTIONS = [
    ['chief_complaint', '主诉'], ['present_illness', '现病史'], ['past_history', '既往史'],
    ['review_of_systems', '系统回顾'], ['personal_history', '个人史'],
    ['marital_history', '婚育史'], ['family_history', '家族史'],
  ];
  const pct = (n, d) => (d ? Math.round((n / d) * 1000) / 10 : 0);

  function assessCase(kase, session) {
    const st = (kase && kase.structured) || {};
    const hist = st.history || {};
    const ses = session || {};
    const asked = ses.asked || {};
    const rosKeys = Object.keys(hist.review_of_systems || {});
    const rosAsked = rosKeys.filter((k) => asked['ros:' + k]).length;
    const examTotal = (st.exam || []).length;
    const labTotal = (st.labs || []).length;
    const examAsked = (ses.exams || []).length;
    const labAsked = (ses.labs || []).length;
    const askedCount = HIST_SECTIONS.filter((s) => asked[s[0]]).length;
    const turns = (ses.messages || []).length;
    const summary = String(ses.summary || '').trim();
    const diagnosis = String(ses.diagnosis || '').trim();

    const steps = [
      { key: 'history', label: '病史采集', done: askedCount >= 3, detail: askedCount + '/7 段' },
      { key: 'ros', label: '系统回顾', done: rosAsked >= 4, detail: rosAsked + '/' + (rosKeys.length || 8) + ' 系统' },
      { key: 'exam', label: '体格检查', done: examAsked >= 3, detail: examAsked + '/' + examTotal + ' 项' },
      { key: 'labs', label: '辅助检查', done: labAsked >= 1, detail: labAsked + '/' + labTotal + ' 项' },
      { key: 'summary', label: '病例摘要', done: summary.length >= 40, detail: summary ? summary.length + ' 字' : '未填写' },
      { key: 'diagnosis', label: '初步诊断', done: !!diagnosis, detail: diagnosis ? diagnosis.slice(0, 16) : '未填写' },
      { key: 'pattern', label: '病例分型', done: !!ses.pattern, detail: ses.pattern || '未选择' },
      { key: 'dialogue', label: '医患沟通', done: turns >= 4, detail: turns + ' 轮' },
    ];
    const completion = pct(steps.filter((s) => s.done).length, steps.length);

    // 完整度：应该拿到的信息拿到了多少（病史 7 段 + 8 系统 + 查体 + 检查）
    const wantHist = 7, wantRos = Math.min(rosKeys.length || 8, 8);
    const wantExam = Math.min(examTotal, 8), wantLab = Math.min(labTotal, 3);
    const completeness = pct(askedCount + Math.min(rosAsked, wantRos) + Math.min(examAsked, wantExam) + Math.min(labAsked, wantLab),
      wantHist + wantRos + wantExam + wantLab);

    // 准确性：分型 + 诊断关键词 + 实践分，红线扣分
    const patternOk = !!(ses.pattern && kase && ses.pattern === kase.pattern_answer);
    const diag = squash(diagnosis);
    const keys = String((kase && kase.disease_label) || '')
      .split(/[（(·/、，,：:]/).map(squash).filter((s) => s.length >= 2);
    const diagHit = diag && keys.length ? keys.filter((k) => diag.includes(k)).length / keys.length : 0;
    const practice = ses.scoreResult && typeof ses.scoreResult.total_score === 'number' ? ses.scoreResult.total_score / 100 : 0;
    const redPenalty = ses.scoreResult && (ses.scoreResult.red_lines || []).length ? 0.2 : 0;
    const accuracy = Math.max(0, Math.round((0.35 * (patternOk ? 1 : 0) + 0.3 * diagHit + 0.35 * practice - redPenalty) * 1000) / 10);

    const results = (ses.scoreResult && ses.scoreResult.item_results) || [];
    const mustCover = ((kase && kase.must_cover) || []).map((m) => {
      const r = results.find((x) => x.item_id === m);
      return { item: m, covered: !!(r && r.score > 0), level: r ? r.level : 'none' };
    });

    return {
      completion, completeness, accuracy, steps,
      must_cover: mustCover,
      pattern_ok: patternOk, diag_hit: Math.round(diagHit * 100), practice: Math.round(practice * 100),
    };
  }

  // 导出
  window.ZHIHU = {
    listMajors, normalizeMajor, matchStartTrigger, detectMajorInText,
    buildPaper, checkPretest, randomizePaper, listLevels, retrieveKnowledge, listCases, getCase,
    gradePaper, groupWeakPoints, sceneDefaults, assessCase,
    scoreTraining, allowedScoringTags,
  };
})();
