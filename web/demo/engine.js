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
  const PAPER_SIZE = 5; // 每个难度固定抽 5 题，与 Python 端 PAPER_SIZE 保持一致

  function listLevels(major) {
    const papers = D().pretest.major_papers || {};
    const entry = papers[major] || papers['other'] || {};
    if (!entry || Array.isArray(entry)) return ['basic'];
    return ['basic', 'intermediate', 'advanced', 'expert'].filter((lv) => (entry[lv] || []).length);
  }

  function buildPaper(major, level, questionIds) {
    const quiz = D().pretest;
    const papers = quiz.major_papers || {};
    const paper = papers[major] || papers['other'] || {};
    const lv = level || 'basic';
    // v4.2.0 起 major_papers 按难度分层（basic/intermediate/advanced/expert），旧快照是扁平数组，两种都兼容
    let ids = Array.isArray(paper) ? paper : (paper[lv] || paper.basic || paper.intermediate || []);
    const index = {};
    for (const q of (quiz.questions || [])) index[q.question_id] = q;
    if (Array.isArray(questionIds) && questionIds.length) {
      // 批改时按出题时的题号复现同一组题，保证出题与批改一致
      ids = questionIds.filter((id) => index[id]);
    } else if (ids.length > PAPER_SIZE) {
      const pool = ids.slice();
      for (let i = pool.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        const t = pool[i]; pool[i] = pool[j]; pool[j] = t;
      }
      ids = pool.slice(0, PAPER_SIZE);
    }
    return (ids || []).map((id) => index[id]).filter(Boolean)
      .map((q) => Object.assign({}, q, { level: lv }));
  }

  function checkPretest(answers, major, level, questionIds) {
    const quiz = D().pretest;
    const submitted = (answers || {}).answers || answers || {};
    const questions = buildPaper(major, level, questionIds);
    const detail = [], weak = [];
    let earned = 0, possible = 0;
    for (const q of questions) {
      const actual = String(submitted[q.question_id] || '').trim().toUpperCase();
      const correct = actual === String(q.answer).trim().toUpperCase();
      const points = Number(q.score || 1);
      possible += points; if (correct) earned += points;
      if (!correct && !weak.includes(q.node_id)) weak.push(q.node_id);
      detail.push({
        question_id: q.question_id, node_id: q.node_id, submitted: actual || null,
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
  function listCases(major, diseaseId) {
    let filtered = D().cases.slice();
    if (diseaseId) filtered = filtered.filter((c) => c.disease_id === diseaseId);
    if (major && major !== 'other') {
      const prefix = { clinical_medicine: 'CL', medical_technology: 'MT', nursing: 'NU', traditional_chinese_medicine: 'TCM' }[major] || '';
      filtered = filtered.slice().sort((a, b) => {
        const ka = [(major && !(a.recommended_majors || []).includes(major)) ? 1 : 0, (prefix && !a.case_id.startsWith(prefix)) ? 1 : 0, a.variant_of ? 1 : 0, a.case_id];
        const kb = [(major && !(b.recommended_majors || []).includes(major)) ? 1 : 0, (prefix && !b.case_id.startsWith(prefix)) ? 1 : 0, b.variant_of ? 1 : 0, b.case_id];
        return JSON.stringify(ka) < JSON.stringify(kb) ? -1 : 1;
      });
    }
    return filtered.map((c) => ({
      case_id: c.case_id, title: c.title, variant_of: c.variant_of,
      disease_id: c.disease_id, disease_label: c.disease_label,
      recommended: !!(major && (c.recommended_majors || []).includes(major)),
      recommended_majors: c.recommended_majors || [],
      professional_focus: (c.professional_focus || {})[major],
    }));
  }

  function getCase(caseId, includePrivate) {
    const c = D().cases.find((x) => x.case_id === caseId);
    if (!c) return { status: 'not_found', case_id: caseId };
    const copy = JSON.parse(JSON.stringify(c));
    if (!includePrivate) {
      for (const k of ['hidden_info', 'release_conditions', 'boundary_behaviors', 'persona', 'must_cover', 'initial_state']) delete copy[k];
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

  // 导出
  window.ZHIHU = {
    listMajors, normalizeMajor, matchStartTrigger, detectMajorInText,
    buildPaper, checkPretest, listLevels, retrieveKnowledge, listCases, getCase,
    scoreTraining, allowedScoringTags,
  };
})();
