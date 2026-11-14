/* Complete local textbook library. Independent dialog keeps live learning DOM/state intact. */
(function () {
  'use strict';
  const esc = (v) => String(v == null ? '' : v).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  let host, books = [], request = 0, lastFocus, offset = 0, total = 0, activeQuery = '', activeBook = '';
  let readingMode = 'original', zoom = 100, sizing = 'page', shelfScroll = 0;
  const staticMode = Boolean(window.__TEXTBOOKS_STATIC__);
  const staticBase = String(window.__TEXTBOOKS_BASE__ || '/textbooks').replace(/\/$/, '');
  const staticPages = new Map();
  const $ = id => host.querySelector('#tb-' + id);
  function staticNormalize(value) { return String(value || '').normalize('NFKC').toLowerCase().replace(/\s+/g, ''); }
  async function staticBook(bookId) {
    if (!staticPages.has(bookId)) {
      const response = await fetch(`${staticBase}/pages/${encodeURIComponent(bookId)}.json`, {headers: {Accept:'application/json'}});
      if (!response.ok) throw new Error('教材正文暂时无法读取，请稍后重试。');
      staticPages.set(bookId, await response.json());
    }
    return staticPages.get(bookId);
  }
  async function staticGet(path) {
    if (path === '/api/textbooks') return fetch(`${staticBase}/catalog.json`).then(r => r.json());
    const searchMatch = path.match(/^\/api\/textbooks\/search\?(.+)$/);
    if (searchMatch) {
      const params = new URLSearchParams(searchMatch[1]);
      const query = params.get('q') || '', selected = params.get('book_id') || '';
      const terms = query.split(/\s+/).map(staticNormalize).filter(Boolean);
      const ids = selected ? [selected] : books.map(book => book.book_id);
      const rows = (await Promise.all(ids.map(id => staticBook(id)))).flat();
      const matches = rows.filter(row => terms.every(term => row.norm.includes(term)))
        .sort((a, b) => a.book_id.localeCompare(b.book_id) || a.pdf_page - b.pdf_page);
      const offset = Number(params.get('offset') || 0), limit = Number(params.get('limit') || 20);
      const bookMap = new Map(books.map(book => [book.book_id, book]));
      return {status:'ok', total:matches.length, offset, limit,
        results:matches.slice(offset, offset + limit).map(row => ({...row, title:bookMap.get(row.book_id).title,
          ocr:bookMap.get(row.book_id).ocr, pdf_url:`${staticBase}/pdf/${row.book_id}.pdf#page=${row.pdf_page}`})),
        notice:'关键词命中为原文线索，不代表已核实题目解析。页码为PDF页序。'};
    }
    const pageMatch = path.match(/^\/api\/textbooks\/([^/]+)\/pages\/(\d+)$/);
    if (pageMatch) {
      const id = decodeURIComponent(pageMatch[1]), page = Number(pageMatch[2]);
      const book = books.find(item => item.book_id === id), row = (await staticBook(id)).find(item => item.pdf_page === page);
      if (!book || !row) throw new Error('教材页面暂时无法读取，请稍后重试。');
      return {...row, ...book, status:'ok', static:true, pdf_url:`${staticBase}/pdf/${id}.pdf#page=${page}`,
        citation:`${book.title}，PDF第${page}页`, notice:'文字稿可能含识别或排版误差，引用前请核对公开原书。'};
    }
    throw new Error('教材资源路径无效。');
  }
  async function get(path) {
    if (window.__TEXTBOOKS_UNAVAILABLE__) {
      throw new Error('线上教材资源尚未发布，当前不能在线阅读或搜索教材全文。答题、病例训练和指南经验库可继续使用。');
    }
    if (staticMode) return staticGet(path);
    const response = await fetch(path, { headers: {Accept:'application/json'} });
    if (!response.ok) throw new Error('教材暂时无法读取，请稍后重试。');
    return response.json();
  }
  function original(id, page, label = '查看原书') {
    return `<button class="btn ghost sm" data-read="${esc(id)}" data-page="${page}" data-mode="original">${label}</button>`;
  }
  function shelf() {
    const q = $('query').value.trim().toLowerCase();
    const bid = $('filter').value;
    const visible = books.filter(b => (!bid || b.book_id === bid) && (!q || b.title.toLowerCase().includes(q)));
    $('shelf').innerHTML = visible.map(b => `<article class="tb-book"><span class="tb-tag">${esc(b.book_id)} · 完整教材</span>
      <h3>${esc(b.title)}</h3><div class="tb-meta">${b.pdf_pages} 页 · ${(b.bytes / 1048576).toFixed(1)} MB<br>${b.ocr ? '扫描版 · 识别文字供检索，需核对原书' : '原书文字可检索'}</div>
      <div class="tb-actions"><button class="btn sm" data-read="${esc(b.book_id)}" data-page="1">开始阅读</button></div></article>`).join('') ||
      '<p class="tb-message">未找到同名教材，可点击「搜索正文」在全书中查找。</p>';
  }
  function home() {
    request++;
    host.classList.remove('tb-reading');
    $('title').textContent = '医学教材库';
    $('title').title = '';
    $('reader').hidden = true; $('controls').hidden = false;
    $('results').hidden = !activeQuery; $('shelf').hidden = !!activeQuery;
    $('shelf-back').hidden = !activeQuery;
    if (!activeQuery) shelf();
    host.scrollTop = shelfScroll;
  }
  function bookShelf() {
    activeQuery = ''; $('query').value = ''; $('message').textContent = '选择教材开始阅读，也可以输入关键词搜索正文。';
    home();
  }
  async function search(nextOffset = null) {
    const query = nextOffset !== null ? activeQuery : $('query').value.trim();
    const book = nextOffset !== null ? activeBook : $('filter').value;
    nextOffset = nextOffset === null ? 0 : nextOffset;
    if (!query || query.split(/\s+/).some(t => t.length < 2)) {
      $('message').textContent = '请输入至少两个字的关键词，多个关键词用空格分开。'; return;
    }
    activeQuery = query; activeBook = book; offset = nextOffset;
    const version = ++request;
    $('shelf').hidden = true; $('results').hidden = false; $('shelf-back').hidden = false;
    $('message').textContent = '正在搜索教材正文…'; $('results').innerHTML = '';
    try {
      const data = await get('/api/textbooks/search?' + new URLSearchParams({q:query, book_id:book, limit:20, offset:nextOffset}));
      if (version !== request) return;
      if (data.status !== 'ok') throw new Error('当前运行环境尚未安装教材正文。');
      total = data.total;
      $('message').textContent = `找到 ${total} 个原文页面。关键词命中是出处线索，引用前请核对原书。页码均为 PDF 页序。`;
      $('results').innerHTML = data.results.map(r => `<article class="tb-result"><h3>${esc(r.title)}</h3>
        <div class="tb-meta">PDF 第 ${r.pdf_page} 页${r.ocr ? ' · 扫描版识别文字' : ''}</div><p>${esc(r.snippet)}</p>
        <div class="tb-actions">${original(r.book_id, r.pdf_page, '阅读原书这一页')}<button class="btn ghost sm" data-read="${esc(r.book_id)}" data-page="${r.pdf_page}" data-mode="text">查看文字</button></div></article>`).join('') +
        (total ? `<div class="tb-pagination"><button class="btn ghost sm" id="tb-search-prev" ${offset === 0 ? 'disabled' : ''}>上一批</button><span>${offset + 1}—${Math.min(offset + 20, total)} / ${total}</span><button class="btn ghost sm" id="tb-search-next" ${offset + 20 >= total ? 'disabled' : ''}>下一批</button></div>` : '<p class="tb-message">未找到匹配页面。请尝试较短的医学术语，或选择其他教材。</p>');
      if ($('search-prev')) $('search-prev').onclick = () => search(Math.max(0, offset - 20));
      if ($('search-next')) $('search-next').onclick = () => search(offset + 20);
    } catch (e) { if (version === request) $('message').textContent = e.message; }
  }
  async function read(id, page, mode = readingMode) {
    readingMode = mode === 'text' ? 'text' : 'original';
    const version = ++request;
    if (!host.classList.contains('tb-reading')) shelfScroll = host.scrollTop;
    host.classList.add('tb-reading'); host.scrollTop = 0;
    $('controls').hidden = true; $('results').hidden = true; $('shelf').hidden = true; $('reader').hidden = false;
    $('reader').innerHTML = '<div class="tb-reader-toolbar"><button class="btn ghost sm" id="tb-read-back">← 返回教材库</button></div><p class="tb-message" role="status">正在读取教材…</p>';
    $('read-back').onclick = home;
    try {
      const data = await get(`/api/textbooks/${encodeURIComponent(id)}/pages/${page}`);
      if (version !== request) return;
      $('title').textContent = data.title;
      $('title').title = data.title;
      $('reader').innerHTML = `<div class="tb-reader-toolbar"><div class="tb-page-controls"><button class="btn ghost sm" id="tb-read-back">← 返回${activeQuery ? '搜索结果' : '书架'}</button><button class="btn ghost sm" id="tb-prev" ${page <= 1 ? 'disabled' : ''}>上一页</button>
        <form id="tb-jump-form" class="tb-actions"><label for="tb-page">PDF 页 <input id="tb-page" type="number" min="1" max="${data.pdf_pages}" value="${page}" required></label><span>/ ${data.pdf_pages}</span><button class="btn ghost sm">跳转</button></form>
        <button class="btn ghost sm" id="tb-next" ${page >= data.pdf_pages ? 'disabled' : ''}>下一页</button></div>
        <div class="tb-view-controls" role="group" aria-label="阅读方式"><button class="btn ghost sm" id="tb-mode-original" aria-pressed="false">原书版式</button><button class="btn ghost sm" id="tb-mode-text" aria-pressed="false">文字阅读</button>
        <span id="tb-zoom-controls" class="tb-actions"><button class="btn ghost sm" id="tb-zoom-page" aria-pressed="false">完整一页</button><button class="btn ghost sm" id="tb-zoom-fit" aria-pressed="false">适合宽度</button><button class="btn ghost sm" id="tb-zoom-out" aria-label="缩小原书">−</button><output id="tb-zoom-value" aria-live="polite"></output><button class="btn ghost sm" id="tb-zoom-in" aria-label="放大原书">＋</button></span></div></div>
        <section id="tb-original-view" aria-label="原书页面"><p id="tb-image-status" class="tb-message" role="status" aria-live="polite"></p><button class="btn ghost sm" id="tb-image-retry" hidden>重新载入原书</button>
        <div class="tb-image-viewport" id="tb-image-viewport" tabindex="0" aria-label="原书页面，可滚动查看放大后的内容">${data.static ? `<p class="tb-message">公开教材原书以 PDF 方式提供：</p><a class="btn" href="${esc(data.pdf_url)}" target="_blank" rel="noopener">打开原书 PDF 第 ${page} 页</a>` : `<img id="tb-page-image" class="tb-page-image" alt="${esc(data.title)}，PDF 第 ${page} 页" decoding="async">`}</div></section>
        <section id="tb-text-view" hidden><p class="tb-message">${data.ocr ? '扫描版识别文字可能有错字或漏字。' : '文字稿可能包含提取或排版误差。'}图表和准确措辞请切换「原书版式」查看。</p>
        <div class="tb-page-text">${esc(data.text || '本页无可检索文字，请切换「原书版式」查看图表或扫描页面。')}</div></section>
        <footer class="tb-reader-footer"><span aria-live="polite">PDF 第 ${page} / ${data.pdf_pages} 页</span><span title="${esc(data.citation)}；PDF 页序含封面与目录，与印刷页码可能不同。">${esc(data.citation)} · 页序含封面与目录</span><span class="tb-key-hint">← → 翻页</span></footer>`;
      let imageRequested = false;
      const image = $('page-image');
      function loadImage(retry = false) {
        if (!image) return;
        imageRequested = true;
        image.hidden = true; $('image-retry').hidden = true;
        $('image-status').textContent = '正在载入原书页面…';
        image.onload = () => {
          if (version !== request) return;
          image.hidden = false; $('image-status').textContent = '';
        };
        image.onerror = () => {
          if (version !== request) return;
          image.hidden = true; $('image-retry').hidden = false;
          $('image-status').textContent = '原书页面暂时无法显示，请重试或切换文字阅读。';
        };
        image.src = `/api/textbooks/${encodeURIComponent(id)}/pages/${page}/image` + (retry ? `?retry=${Date.now()}` : '');
      }
      function applySizing() {
        if (!image) { $('zoom-controls').hidden = true; return; }
        $('image-viewport').dataset.sizing = sizing;
        image.style.width = sizing === 'page' ? '' : (sizing === 'width' ? 100 : zoom) + '%';
        $('zoom-value').textContent = sizing === 'page' ? '整页' : (sizing === 'width' ? 100 : zoom) + '%';
        $('zoom-page').setAttribute('aria-pressed', String(sizing === 'page'));
        $('zoom-fit').setAttribute('aria-pressed', String(sizing === 'width'));
        $('zoom-out').disabled = sizing === 'zoom' && zoom <= 20;
        $('zoom-in').disabled = sizing === 'zoom' && zoom >= 300;
      }
      function changeZoom(delta) {
        const viewport = $('image-viewport');
        const current = sizing === 'page' && viewport.clientWidth && image.clientWidth ?
          image.clientWidth / Math.max(1, viewport.clientWidth - 24) * 100 : sizing === 'width' ? 100 : zoom;
        zoom = Math.max(20, Math.min(300, Math.round(current / 10) * 10 + delta));
        sizing = 'zoom'; applySizing();
      }
      function fit(value) {
        sizing = value; applySizing();
        $('image-viewport').scrollTop = 0; $('image-viewport').scrollLeft = 0;
      }
      function setMode(value) {
        readingMode = value;
        const isOriginal = value === 'original';
        $('original-view').hidden = !isOriginal; $('text-view').hidden = isOriginal;
        $('zoom-controls').hidden = !isOriginal;
        $('mode-original').setAttribute('aria-pressed', String(isOriginal));
        $('mode-text').setAttribute('aria-pressed', String(!isOriginal));
        if (isOriginal && !imageRequested) loadImage();
      }
      $('mode-original').onclick = () => setMode('original');
      $('mode-text').onclick = () => setMode('text');
      $('zoom-out').onclick = () => changeZoom(-20);
      $('zoom-in').onclick = () => changeZoom(20);
      $('zoom-page').onclick = () => fit('page');
      $('zoom-fit').onclick = () => fit('width');
      $('image-retry').onclick = () => loadImage(true);
      if (image) fit(sizing); else $('zoom-controls').hidden = true;
      setMode(readingMode);
      $('read-back').onclick = home;
      $('prev').onclick = () => read(id, page - 1);
      $('next').onclick = () => read(id, page + 1);
      $('jump-form').onsubmit = e => { e.preventDefault(); const n = Number($('page').value); if (Number.isInteger(n) && n >= 1 && n <= data.pdf_pages) read(id, n); };
    } catch (e) { if (version === request) $('reader').insertAdjacentHTML('beforeend', `<p role="alert">${esc(e.message)}</p>`); }
  }
  async function open() {
    lastFocus = document.activeElement;
    if (host) { host.showModal(); return; }
    host = document.createElement('dialog'); host.id = 'textbooks-dialog'; host.className = 'tb-dialog';
    host.setAttribute('aria-labelledby', 'tb-title');
    host.innerHTML = `<header class="tb-head"><div><h2 id="tb-title">医学教材库</h2><small id="tb-count">正在载入书架…</small></div><button class="btn ghost sm" id="tb-close">关闭 · 返回学习</button></header>
      <div class="tb-body"><section id="tb-controls"><p class="tb-intro">查阅完整教材，按关键词寻找原文。找到的内容可供核对题目出处。</p>
      <form class="tb-toolbar" id="tb-form"><label for="tb-query">书名或正文关键词<input id="tb-query" type="search" maxlength="120" placeholder="例如：肾病综合征、气逆"></label>
      <label for="tb-filter">查阅范围<select id="tb-filter"><option value="">全部教材</option></select></label><button class="btn" id="tb-search">搜索正文</button><button class="btn ghost" type="button" id="tb-shelf-back" hidden>返回书架</button></form>
      <p class="tb-message" id="tb-message" role="status" aria-live="polite">正在载入…</p></section><section id="tb-shelf" class="tb-grid" aria-label="教材书架"></section><section id="tb-results" hidden aria-label="原文搜索结果"></section><section id="tb-reader" hidden aria-label="逐页阅读"></section></div>`;
    document.body.appendChild(host); host.showModal();
    host.addEventListener('close', () => { if (lastFocus) lastFocus.focus(); });
    $('close').onclick = () => host.close();
    $('form').onsubmit = e => { e.preventDefault(); return search(); };
    $('shelf-back').onclick = bookShelf;
    $('query').oninput = () => { if (!activeQuery) shelf(); };
    $('filter').onchange = () => { if (activeQuery) search(); else shelf(); };
    host.addEventListener('click', e => { const b = e.target.closest('[data-read]'); if (b) return read(b.dataset.read, Number(b.dataset.page), b.dataset.mode || 'original'); });
    host.addEventListener('keydown', e => {
      if ($('reader').hidden || e.altKey || e.ctrlKey || e.metaKey || e.shiftKey || e.target.closest('input,textarea,select,[contenteditable="true"]')) return;
      const direction = ({ArrowLeft:'prev', PageUp:'prev', ArrowRight:'next', PageDown:'next'})[e.key];
      if (direction) { e.preventDefault(); const control = $(direction); if (control && !control.disabled) control.click(); }
    });
    try {
      const data = await get('/api/textbooks');
      if (data.status !== 'ok') throw new Error(data.message || '此运行环境尚未安装完整教材库。');
      books = data.books;
      $('count').textContent = `${data.book_count} 本完整教材 · ${data.page_count.toLocaleString()} 页 · 原书与文字稿`;
      $('filter').innerHTML += books.map(b => `<option value="${esc(b.book_id)}">${esc(b.title)}</option>`).join('');
      $('message').textContent = '选择教材开始阅读，也可以输入关键词搜索正文。'; shelf();
    } catch (e) {
      $('count').textContent = '教材库暂不可用'; $('message').textContent = e.message;
      $('search').disabled = true;
      // Permit a fresh attempt on the next open after the service recovers.
      host.addEventListener('close', () => { host.remove(); host = null; }, {once:true});
    }
  }
  const button = document.createElement('button'); button.className = 'btn ghost sm'; button.id = 'textbooks-open';
  button.type = 'button'; button.textContent = '医学教材库'; button.onclick = open;
  document.getElementById('module-nav').appendChild(button);
  window.ZH_TEXTBOOKS = {open};
  if (location.hash === '#textbooks') open();
})();
