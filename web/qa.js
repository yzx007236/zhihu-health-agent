// 知护知识点答疑（⑥ 解析看不懂可实时问）
// 做法：先在本地知识卡里做检索，答案严格由检索到的卡片拼装（每句都有出处）；
// 若部署了 zhihu-agent 云函数且配置了模型，可再把"卡片内容"作为唯一上下文交给模型改写成人话。
// 这样既不会让模型自由发挥（医疗场景红线），又保留了追问体验。
(function () {
  'use strict';
  const D = () => window.ZHIHU_DATA;

  function asText(v) { return Array.isArray(v) ? v.join('；') : String(v == null ? '' : v); }
  const squashed = (s) => String(s || '').replace(/[\s，,。.、！!？?「」【】《》()（）\-_/\\·~…]+/g, '').toLowerCase();

  const STOP = new Set([
    '什么', '怎么', '为什', '如何', '是否', '可以', '需要', '应该', '这个', '那个', '一下',
    '我们', '患者', '病人', '的是', '了吗', '是不', '不是', '有没', '没有', '一个', '这种',
  ]);

  function tokens(text) {
    const s = String(text || '').toLowerCase();
    const out = new Set();
    for (const w of s.match(/[a-z][a-z0-9_-]{2,}/g) || []) out.add(w);
    const zh = (s.match(/[\u4e00-\u9fa5]+/g) || []).join('');
    for (let i = 0; i < zh.length - 1; i += 1) {
      const g = zh.slice(i, i + 2);
      if (!STOP.has(g)) out.add(g);
    }
    for (const w of s.match(/[\u4e00-\u9fa5]{3,6}/g) || []) out.add(w);
    return out;
  }

  const FIELDS = [
    ['title', 3.2], ['claim', 1.6], ['lay_terms', 1.4], ['misconceptions', 1.5],
    ['exceptions', 1.0], ['scope', 0.8], ['source', 0.5], ['source_location', 0.5],
  ];

  function scoreCard(card, toks) {
    let score = 0;
    for (const [key, weight] of FIELDS) {
      const text = (key === 'title' ? card.title : asText(card[key])).toLowerCase();
      if (!text) continue;
      let hit = 0;
      for (const tok of toks) if (text.indexOf(tok) >= 0) hit += 1;
      if (hit) score += weight * hit;
    }
    return score;
  }

  function toCard(card, score, top) {
    return {
      id: card.knowledge_id,
      title: card.title,
      claim: asText(card.claim),
      lay: asText(card.lay_terms),
      misconceptions: asText(card.misconceptions),
      exceptions: asText(card.exceptions),
      source: asText(card.source),
      location: asText(card.source_location),
      url: asText(card.source_url),
      secondaryUrl: asText(card.secondary_source_url),
      score: top ? Math.min(99, Math.round((score / top) * 92) + 7) : 0,
    };
  }

  // 题库里与问题相关的题（给"练一练"用）
  function relatedQuestions(toks, limit) {
    const quiz = (D() || {}).pretest || {};
    const rows = [];
    for (const q of quiz.questions || []) {
      if (!q.stem) continue;
      const t = (q.stem + ' ' + (q.node_id || '')).toLowerCase();
      let hit = 0;
      for (const tok of toks) if (t.indexOf(tok) >= 0) hit += 1;
      if (hit >= 2) rows.push({ q, hit });
    }
    rows.sort((a, b) => b.hit - a.hit);
    return rows.slice(0, limit || 2).map(({ q }) => ({
      question_id: q.question_id,
      stem: q.stem,
      answer: q.answer,
      options: q.options || {},
      explanation: q.explanation || '',
    }));
  }

  /**
   * 本地检索问答。
   * @returns {{mode:'library', found:boolean, cards:Array, questions:Array, note:string}}
   */
  function ask(question, preferredCardId) {
    const text = String(question || '').trim();
    const toks = tokens(text);
    const cards = ((D() || {}).knowledge || {}).cards || [];
    const note = '回答由本平台知识卡检索生成，每段都附出处；仅用于学习，不替代临床判断。';
    if (!text || toks.size === 0) {
      return { mode: 'library', found: false, cards: [], questions: [], note: '请先输入一个具体问题，例如“为什么低血糖时不能只补糖不查原因”。', question: text };
    }
    const preferred = preferredCardId
      ? cards.find((c) => c.knowledge_id === preferredCardId && c.card_kind !== 'bank_import')
      : null;
    const scored = cards
      .filter((c) => c.card_kind !== 'bank_import')
      .filter((c) => !preferred || c.knowledge_id !== preferred.knowledge_id)
      .map((c) => ({ card: c, score: scoreCard(c, toks) }))
      .filter((x) => x.score > 0)
      .sort((a, b) => b.score - a.score);
    const top = scored.length ? scored[0].score : 0;
    const picked = [];
    if (preferred) picked.push({ ...toCard(preferred, 1, 1), score: 100 });
    picked.push(...scored.slice(0, preferred ? 2 : 3).map((x) => toCard(x.card, x.score, top)));
    const found = Boolean(preferred) || top >= 2.2;
    return {
      mode: 'library',
      found,
      cards: found ? picked : [],
      questions: relatedQuestions(toks, found ? 2 : 1),
      note: found ? note : '教材知识卡暂无可靠匹配，请补充具体问题或由教师评估。',
      question: text,
    };
  }

  // 可选：让模型把卡片内容改写成人话（上下文只有这几张卡）
  async function askLLM(question, result) {
    const api = window.ZHIHU_AGENT_API;
    if (!api || !result || !result.cards || !result.cards.length) return null;
    const controller = typeof AbortController !== 'undefined' ? new AbortController() : null;
    const timer = controller ? setTimeout(() => controller.abort(), 20 * 1000) : null;
    try {
      const resp = await fetch(api, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'qa',
          question: String(question || '').slice(0, 300),
          cards: result.cards.map((c) => ({
            title: c.title, claim: c.claim, lay_terms: c.lay, misconceptions: c.misconceptions,
            exceptions: c.exceptions, source: c.source, source_location: c.location,
          })),
        }),
        signal: controller ? controller.signal : undefined,
      });
      if (!resp.ok) return null;
      const data = await resp.json();
      const answer = String((data && data.answer) || '').trim();
      if (!answer) return null;
      return { mode: 'llm', answer, model: data.model || '', provider: data.provider || '' };
    } catch (e) {
      return null;
    } finally {
      if (timer) clearTimeout(timer);
    }
  }

  window.ZH_QA = { ask, askLLM, tokens, squashed };
})();
