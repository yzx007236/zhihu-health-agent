/* 知护 v4.3 端到端自测 runner（独立源文件，mk_selftest.py 原样复制到 web/_test_runner.js）
 * 结果：console + 页面标题 + XHR POST 到 http://127.0.0.1:8766/result
 */
(function () {
  var R = [];
  var t0 = Date.now();

  function rec(name, ok, detail) {
    R.push({ name: name, ok: !!ok, detail: detail == null ? '' : String(detail) });
    try { console.log((ok ? 'PASS ' : 'FAIL ') + name + (detail ? ' — ' + detail : '')); } catch (e) {}
  }
  function $(s, root) { return (root || document).querySelector(s); }
  function $$(s, root) { return Array.prototype.slice.call((root || document).querySelectorAll(s)); }
  function txt(el) { return ((el && el.textContent) || '').replace(/\s+/g, ' ').trim(); }
  function sleep(ms) { return new Promise(function (r) { setTimeout(r, ms); }); }
  function click(el) {
    if (!el) throw new Error('click: element missing');
    el.dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true, view: window }));
  }
  function setVal(el, v) {
    if (!el) throw new Error('setVal: element missing');
    el.value = v;
    el.dispatchEvent(new Event('input', { bubbles: true }));
    el.dispatchEvent(new Event('change', { bubbles: true }));
  }
  async function waitFor(fn, label, timeout) {
    var end = Date.now() + (timeout || 8000);
    while (Date.now() < end) {
      var v = null;
      try { v = fn(); } catch (e) { v = null; }
      if (v) return v;
      await sleep(60);
    }
    throw new Error('超时等待：' + label);
  }
  function nav(m) { var a = $('.module-nav [data-m="' + m + '"]'); if (!a) throw new Error('导航缺失 ' + m); click(a); }

  async function run() {
    // ---------- 1 欢迎页 ----------
    await waitFor(function () { return $('#btn-start'); }, '欢迎页 #btn-start');
    rec('欢迎页渲染', /知护/.test(txt($('#app'))), 'app 文本含「知护」');
    rec('开始按钮存在', !!$('#btn-start'), txt($('#btn-start')));

    // ④ 英语题必须同时保留中文解析、题面来源，并绑定权威来源知识卡
    if (window.ZHIHU && window.ZHIHU.gradePaper) {
      var enRow = window.ZHIHU.gradePaper(['Q-EN-001'], {})[0] || {};
      rec('英语题解析绑定来源知识卡', !!(enRow.explanation && enRow.source && enRow.card && enRow.card.source_url),
        (enRow.explanation || '').slice(0, 26) + ' / ' + (enRow.source || '无来源'));
    }

    click($('#btn-start'));
    await waitFor(function () { return $$('.major-card[data-major]').length; }, '专业列表');
    var majors = $$('.major-card[data-major]');
    rec('专业列表 ≥7 项', majors.length >= 7, majors.length + ' 项');
    rec('专业卡含临床医学', majors.some(function (b) { return /临床/.test(txt(b)); }), majors.length + ' 项');

    click(majors.filter(function (b) { return b.dataset.major === 'clinical_medicine'; })[0]
      || majors.filter(function (b) { return /临床/.test(txt(b)); })[0]);
    await waitFor(function () { return $('#btn-major-next') && !$('#btn-major-next').disabled; }, '专业下一步按钮');
    rec('选中专业后可进入下一步', !$('#btn-major-next').disabled, '');
    click($('#btn-major-next'));

    // ---------- 2 自测页 ----------
    await waitFor(function () { return $$('#quiz .q-opt').length >= 5; }, '自测题');
    var qids = {};
    $$('#quiz .q-opt[data-q]').forEach(function (o) { qids[o.dataset.q] = 1; });
    rec('自测出题 5 道', Object.keys(qids).length === 5, Object.keys(qids).length + ' 题');

    var lvBtns = $$('.level-bar button[data-level]');
    rec('档位按钮 5 个（含英语）', lvBtns.length === 5, lvBtns.map(function (b) { return txt(b); }).join('/'));
    rec('档位含「英语」', lvBtns.some(function (b) { return /英语/.test(txt(b)); }), '');

    var enBtn = lvBtns.filter(function (b) { return b.dataset.level === 'english'; })[0];
    if (enBtn) {
      click(enBtn);
      await waitFor(function () { return /[A-Za-z]{4,}/.test(txt($('#quiz'))); }, '英语题干');
      var stem = txt($('#quiz .k-title')).replace(/^第\s*\d+\s*题\s*·\s*/, '');
      var han = (stem.match(/[\u4e00-\u9fa5]/g) || []).length;
      rec('英语卷题干为英文', han === 0 && /[A-Za-z]{4,}/.test(stem), stem.slice(0, 46));
      var basicBtn = $$('.level-bar button[data-level]').filter(function (b) { return b.dataset.level === 'basic'; })[0];
      if (basicBtn) { click(basicBtn); await sleep(300); }
    }

    // ---------- 3 答题并提交 ----------
    await waitFor(function () { return $$('#quiz .q-opt[data-q]').length >= 5; }, '回到基础卷');
    var answered = {};
    $$('#quiz .q-opt[data-q]').forEach(function (o) {
      if (answered[o.dataset.q]) return;
      answered[o.dataset.q] = 1;
      click(o);
    });
    rec('作答 5 题', Object.keys(answered).length === 5, '');
    var submit = $('#btn-submit');
    rec('提交按钮可点', submit && !submit.disabled, submit ? 'disabled=' + submit.disabled : 'missing');
    click(submit);

    // ---------- 4 批改页 ----------
    await waitFor(function () { return $$('.exp-box').length >= 5; }, '解析盒', 12000);
    rec('批改回显 5 个解析盒', $$('.exp-box').length === 5, $$('.exp-box').length + ' 个');
    var gradTxt = txt($('#app'));
    rec('解析含依据/出处', /依据|出处|原文/.test(gradTxt), '');
    var summaryBtn = $('#btn-summary') || $$('#app button').filter(function (b) { return /学习档案/.test(txt(b)); })[0];
    rec('批改页有「学习档案」入口', !!summaryBtn, summaryBtn ? txt(summaryBtn) : 'missing');
    rec('批改页有重新自测', !!$('#btn-retry'), '');
    var retryWrong = $('#btn-retry-wrong');
    rec('错题重练按钮（有错题时）', !!retryWrong || !/错/.test(gradTxt), retryWrong ? txt(retryWrong) : '无错题');

    // ---------- 5 学习档案 ----------
    if (summaryBtn) {
      click(summaryBtn);
      await waitFor(function () { return $('.radar svg') || $('.radar-wrap svg'); }, '雷达图', 8000);
      rec('学习档案渲染', /学习档案/.test(txt($('#app'))), '');
      rec('统计卡 4 个', $$('.stat-row .stat').length === 4, $$('.stat-row .stat').length + ' 个');
      rec('六边形雷达存在', $$('.radar-wrap svg').length >= 1, '');
      rec('薄弱知识点表', $$('.weak-table').length >= 1, '');
      var ls = null;
      try { ls = localStorage.getItem('zhihu.progress.v1'); } catch (e) {}
      rec('localStorage 已落库', !!ls && ls.length > 20, ls ? ls.length + ' 字节' : 'empty');
      var wrongPaper = $('#btn-wrong-paper');
      if (wrongPaper) {
        click(wrongPaper);
        await waitFor(function () { return $$('#quiz .q-opt').length >= 1; }, '错题卷');
        rec('个性化错题卷可生成', $$('#quiz .kcard').length <= 5, $$('#quiz .kcard').length + ' 题');
        nav('weak');
        await sleep(200);
      }
    }

    // ---------- 6 薄弱讲解 + 答疑 ----------
    nav('weak');
    await waitFor(function () { return $('.digest'); }, '薄弱讲解 digest');
    rec('薄弱讲解有档案摘要', /学习档案/.test(txt($('.digest'))), txt($('.digest')).slice(0, 40));
    rec('薄弱页有问知护入口', $$('[data-ask],[data-ask-group]').length >= 1, $$('[data-ask]').length + ' 个');
    var askBtn = $('[data-ask-group]') || $('[data-ask]');
    click(askBtn);
    await waitFor(function () { return $('#qa-modal'); }, '答疑弹层');
    rec('答疑弹层打开', !!$('#qa-modal'), '');
    setVal($('#qa-input'), '低血糖时为什么要先补糖再查原因');
    click($('#qa-send'));
    var qaCards = await waitFor(function () { return $$('#qa-result .kcard').length; }, '答疑结果卡', 10000);
    rec('答疑命中知识卡', qaCards >= 1, qaCards + ' 张');
    rec('答疑卡片带出处', $$('#qa-result .kcard-src').length >= 1, $$('#qa-result .kcard-src').length + ' 条');
    click($('#qa-close'));
    await sleep(150);
    rec('答疑弹层可关闭', !$('#qa-modal'), '');

    // ---------- 7 病例列表 ----------
    nav('cases');
    await waitFor(function () { return $$('#scene-chips .chip').length >= 2; }, '场景筛选');
    rec('场景筛选 chips ≥2', $$('#scene-chips .chip').length >= 2, $$('#scene-chips .chip').length + ' 个');
    var caseCards = $$('#case-grid .major-card[data-case]');
    rec('默认场景病例 ≥5 例', caseCards.length >= 5, caseCards.length + ' 例');
    click(caseCards[0]);
    await waitFor(function () { return $('#btn-case-next') && !$('#btn-case-next').disabled; }, '病例下一步按钮');
    click($('#btn-case-next'));

    // ---------- 8 病例详情 ----------
    await waitFor(function () { return $('.info-table'); }, '病例详情');
    var caseTxt = txt($('#app'));
    rec('病例信息含性别/年龄', /性别/.test(caseTxt) && /年龄/.test(caseTxt), '');
    rec('病例含病史陈述与可信度', /病史陈述/.test(caseTxt) && /可信度/.test(caseTxt), '');
    rec('病例标签（类型/分型）', $$('.case-tags .pill,.case-tags .tag').length >= 2, $$('.case-tags .pill,.case-tags .tag').length + ' 个');

    // ---------- 9 采集页 ----------
    var toCollect = $('#btn-analysis');
    click(toCollect);
    await waitFor(function () { return $('.collect-row'); }, '采集页', 8000);
    rec('采集页病史行 ≥6', $$('[data-h]').length >= 6, $$('[data-h]').length + ' 行');
    rec('系统回顾 8 系统', $$('[data-ros]').length === 8, $$('[data-ros]').length + ' 个');
    rec('体格检查项 ≥12', $$('[data-exam]').length >= 12, $$('[data-exam]').length + ' 项');
    rec('辅助检查项 ≥5', $$('[data-lab]').length >= 5, $$('[data-lab]').length + ' 项');
    rec('覆盖度条存在', !!$('.cov-bar'), txt($('.cov-bar')).slice(0, 30));

    // 点几个采集项（每次重渲染，重新查询）
    for (var i = 0; i < 3; i++) {
      var h = $$('[data-h]')[i];
      if (h) { click(h); await sleep(80); }
    }
    var ros = $$('[data-ros]')[0];
    if (ros) { click(ros); await sleep(80); }
    var ex = $$('[data-exam]')[0];
    if (ex) { click(ex); await sleep(80); }
    var lab = $$('[data-lab]')[0];
    if (lab) { click(lab); await sleep(120); }
    var covTxt = txt($('.cov-bar'));
    var covPct = (covTxt.match(/(\d+)%/) || [])[1];
    rec('采集后覆盖度 > 0', covPct && Number(covPct) > 0, covTxt.slice(0, 40));

    click($('#btn-to-analysis'));
    await waitFor(function () { return $('#ta-summary'); }, '初步分析页', 8000);

    // ---------- 10 初步分析 ----------
    setVal($('#ta-summary'), '患者 56 岁男性，今晨买菜时突发胸骨后压榨样疼痛，向左肩放射，持续约 15 分钟，伴大汗、恶心，休息后部分缓解，2 小时前再发且加重。既往高血压 8 年、吸烟 30 年。');
    setVal($('#in-diagnosis'), '急性冠脉综合征（ACS）待排');
    var ct = $('#sel-case-type');
    if (ct) { ct.value = '初诊'; ct.dispatchEvent(new Event('change', { bubbles: true })); }
    var pat = $('#sel-pattern');
    if (pat) { pat.selectedIndex = Math.min(1, pat.options.length - 1); pat.dispatchEvent(new Event('input', { bubbles: true })); }
    var plan = $('#ta-plan');
    if (plan) setVal(plan, '先回应患者对心梗的担心，再解释需要立即做心电图与肌钙蛋白。');
    rec('分型选择控件存在', !!($('#sel-pattern') || $('#in-pattern')), '');
    rec('流程步骤 chips 渲染', $$('#step-chips .chip').length >= 6, $$('#step-chips .chip').length + ' 个');
    await sleep(200);

    // ---------- 11 对话 ----------
    click($('#btn-dialogue'));
    await waitFor(function () { return $('#chat-input'); }, '对话页', 8000);
    var msgs = ['您好，我是接诊医生，先了解一下：这次胸口不舒服是怎么开始的？',
      '疼的时候有没有出汗、恶心，或者往左肩、下巴那边串？',
      '以前有没有高血压、糖尿病，平时抽烟吗？',
      '我给您安排心电图和抽血查肌钙蛋白，先别紧张，我们会尽快处理。'];
    for (var k = 0; k < msgs.length; k++) {
      var before = $$('#chat .msg').length;
      setVal($('#chat-input'), msgs[k]);
      click($('#chat-send'));
      await sleep(400);
      try { await waitFor(function () { return $$('#chat .msg').length > before; }, '对话回复', 6000); } catch (e) {}
    }
    rec('对话完成 4 轮', $$('#chat .msg').length >= 8, $$('#chat .msg').length + ' 条消息');
    var lastReply = txt($$('#chat .msg').pop());
    rec('患者有实质回复', lastReply.length > 4, lastReply.slice(0, 40));

    // ---------- 12 评分复盘 ----------
    click($('#btn-finish'));
    await waitFor(function () { return $$('.rate-card').length >= 3; }, '复盘页', 15000);
    rec('复盘三率卡 3 张', $$('.rate-card').length === 3, $$('.rate-card').length + ' 张');
    rec('踩分点区域', !!$('.must-grid'), $$('.must-grid .chip').length + ' 个踩分点');
    rec('流程步骤清单 8 项', $$('.step-item').length === 8, $$('.step-item').length + ' 项');
    rec('复盘雷达图', $$('.radar-wrap svg').length >= 1, '');
    rec('维度表现区', /维度表现/.test(txt($('#app'))), '');
  }

  function report(finalErr) {
    if (window.__reported) return;
    window.__reported = true;
    var pass = R.filter(function (r) { return r.ok; }).length;
    var fail = R.length - pass;
    var errs = (window.__errors || []).slice(0, 6);
    var head = (fail === 0 && !finalErr ? 'RESULT: PASS' : 'RESULT: FAIL') + ' ' + pass + '/' + R.length;
    var lines = [head];
    if (finalErr) lines.push('FATAL: ' + finalErr);
    R.forEach(function (r) { lines.push((r.ok ? 'PASS  ' : 'FAIL  ') + r.name + (r.detail ? ' — ' + r.detail : '')); });
    if (errs.length) lines.push('JS-ERRORS: ' + errs.join(' | '));
    lines.push('elapsed: ' + ((Date.now() - t0) / 1000).toFixed(1) + 's');
    var body = lines.join('\n');
    try { document.title = head; } catch (e) {}
    var out = document.createElement('pre');
    out.id = 'selftest-out';
    out.style.cssText = 'white-space:pre-wrap;font:12px/1.6 monospace;background:#fff;padding:12px;margin:12px 0;border:1px solid #ccc';
    out.textContent = body;
    (document.body || document.documentElement).appendChild(out);
    try {
      var xhr = new XMLHttpRequest();
      xhr.open('POST', 'http://127.0.0.1:8766/result', true);
      xhr.setRequestHeader('Content-Type', 'text/plain;charset=utf-8');
      xhr.send(body);
    } catch (e) {}
  }

  function boot() {
    var guard = setTimeout(function () { report('runner timeout 120s'); }, 120000);
    run().then(function () { clearTimeout(guard); report(null); })
      .catch(function (e) { clearTimeout(guard); report((e && (e.message || e)) + ' @ ' + (e && e.stack ? String(e.stack).split('\n')[1] : '')); });
  }

  if (document.readyState === 'complete' || document.readyState === 'interactive') {
    setTimeout(boot, 300);
  } else {
    window.addEventListener('load', function () { setTimeout(boot, 300); });
  }
})();
