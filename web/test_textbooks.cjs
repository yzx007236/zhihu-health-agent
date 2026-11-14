// DOM contract checks, not a claim of browser rendering verification.
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
class Element {
  constructor() {
    this.nodes = new Map(); this.events = {}; this.attributes = {}; this.style = {}; this.dataset = {};
    this.hidden = false; this.value = ''; this.innerHTML = ''; this.scrollTop = 0; this.scrollLeft = 0;
    const classes = new Set();
    this.classList = {add:name => classes.add(name), remove:name => classes.delete(name), contains:name => classes.has(name)};
  }
  querySelector(selector) { if (!this.nodes.has(selector)) this.nodes.set(selector, new Element()); return this.nodes.get(selector); }
  appendChild(child) { this.child = child; }
  addEventListener(name, fn) { this.events[name] = fn; }
  setAttribute(key, value) { this.attributes[key] = value; }
  showModal() { this.open = true; }
  close() { this.open = false; this.events.close?.(); }
  focus() { this.focused = true; }
  click() { return this.onclick?.(); }
  remove() { this.removed = true; }
  insertAdjacentHTML(_, html) { this.innerHTML += html; }
}
const nav = new Element(), body = new Element(), learning = new Element(), trigger = new Element();
learning.innerHTML = '<textarea>尚未提交的病例回答</textarea>';
const requests = [];
const book = {book_id:'B05',title:'《内科学》（第10版）',pdf_pages:982,bytes:10000000,ocr:false};
let fail = false;
const sandbox = {
  window:{}, location:{hash:''}, URLSearchParams,
  document:{activeElement:trigger, createElement:() => new Element(), body,
    getElementById:id => id === 'module-nav' ? nav : learning},
  fetch:async url => {
    requests.push(url);
    if (fail) throw new Error('暂时无法读取');
    let data;
    if (url === '/api/textbooks') data = {status:'ok',book_count:30,page_count:11835,books:[book]};
    else if (url.startsWith('/api/textbooks/search')) {
      const params = new URLSearchParams(url.split('?')[1]);
      const offset = Number(params.get('offset'));
      data = {status:'ok',total:37,results:[{...book,pdf_page:511 + offset,snippet:'原文 <script>alert(1)</script>'}]};
    } else data = {status:'ok',...book,pdf_page:511,text:'肾病综合征\n<script>bad</script>',citation:'内科学，PDF第511页'};
    return {ok:true,json:async () => data};
  }
};
vm.runInNewContext(fs.readFileSync(__dirname + '/textbooks.js','utf8'),sandbox);
(async () => {
  const original = learning.innerHTML;
  assert.equal(nav.child.textContent,'医学教材库');
  await nav.child.onclick();
  const dialog = body.child, $ = id => dialog.querySelector('#tb-' + id);
  assert(dialog.open);
  assert($('count').textContent.includes('30 本完整教材'));
  assert($('shelf').innerHTML.includes('开始阅读'));
  assert(!$('shelf').innerHTML.includes('target="_blank"'));
  $('query').value = '肾病综合征';
  $('filter').value = 'B05';
  await $('form').onsubmit({preventDefault(){}});
  assert($('message').textContent.includes('37'));
  assert($('results').innerHTML.includes('&lt;script&gt;'));
  assert(!$('results').innerHTML.includes('<script>'));
  assert($('results').innerHTML.includes('data-page="511" data-mode="original"'));
  assert(!$('results').innerHTML.includes('target="_blank"'));
  // Editing the box must not alter the active query during result pagination.
  $('query').value = '新的关键词';
  await $('search-next').onclick();
  await $('search-prev').onclick();
  assert(requests.at(-1).includes('offset=0'));
  assert.equal(new URLSearchParams(requests.at(-1).split('?')[1]).get('q'),'肾病综合征');
  dialog.scrollTop = 320;
  await dialog.events.click({target:{closest:() => ({dataset:{read:'B05',page:'511'}})}});
  // The event dispatcher intentionally does not await the read promise.
  await new Promise(resolve => setImmediate(resolve));
  assert($('reader').innerHTML.includes('PDF 第 511 / 982 页'));
  assert($('reader').innerHTML.includes('&lt;script&gt;bad&lt;/script&gt;'));
  assert($('controls').hidden);
  assert(dialog.classList.contains('tb-reading'));
  assert.equal(dialog.scrollTop, 0);
  assert.equal($('title').textContent, book.title);
  assert.equal($('image-viewport').dataset.sizing, 'page');
  assert.equal($('zoom-page').attributes['aria-pressed'], 'true');
  assert.equal($('page-image').style.width, '', 'Complete page fits the available viewport');
  assert.equal($('page-image').src, '/api/textbooks/B05/pages/511/image');
  assert(!$('original-view').hidden);
  assert($('text-view').hidden);
  $('page-image').onload();
  assert(!$('page-image').hidden);
  $('image-viewport').clientWidth = 1000;
  $('page-image').clientWidth = 400;
  $('zoom-in').onclick();
  assert.equal($('image-viewport').dataset.sizing, 'zoom');
  assert.equal($('zoom-value').textContent, '60%');
  $('zoom-fit').onclick();
  assert.equal($('image-viewport').dataset.sizing, 'width');
  assert.equal($('page-image').style.width, '100%');
  $('zoom-in').onclick();
  assert.equal($('page-image').style.width, '120%');
  $('zoom-out').onclick();
  assert.equal($('zoom-value').textContent, '100%');
  for (let i = 0; i < 20; i++) $('zoom-in').onclick();
  assert($('zoom-in').disabled);
  assert.equal($('page-image').style.width, '300%');
  $('zoom-fit').onclick();
  assert.equal($('page-image').style.width, '100%');
  $('mode-text').onclick();
  assert($('original-view').hidden);
  assert(!$('text-view').hidden);
  assert($('zoom-controls').hidden);
  assert.equal($('mode-text').attributes['aria-pressed'], 'true');
  // Navigation keeps reading mode and the original book's page sequence.
  await $('next').onclick();
  assert(requests.at(-1).endsWith('/pages/512'));
  assert(!$('text-view').hidden);
  $('mode-original').onclick();
  assert.equal($('page-image').src, '/api/textbooks/B05/pages/512/image');
  $('page-image').onerror();
  assert(!$('image-retry').hidden);
  assert($('image-status').textContent.includes('暂时无法显示'));
  $('image-retry').onclick();
  assert($('page-image').src.includes('/pages/512/image?retry='));
  $('page-image').onload();
  assert($('image-retry').hidden);
  assert.equal($('image-status').textContent, '');
  await $('prev').onclick();
  assert.equal($('page-image').src, '/api/textbooks/B05/pages/511/image');
  $('page').value = '982';
  await $('jump-form').onsubmit({preventDefault(){}});
  await new Promise(resolve => setImmediate(resolve));
  assert($('reader').innerHTML.includes('id="tb-next" disabled'));
  $('read-back').onclick();
  assert(!$('results').hidden);
  $('close').onclick();
  assert(!dialog.open);
  assert(trigger.focused);
  assert.equal(learning.innerHTML, original, 'Opening, searching and reading must preserve the active exercise DOM');
  await sandbox.window.ZH_TEXTBOOKS.open();
  assert.equal(body.child, dialog, 'Reopen preserves the library state');
  fail = true;
  await $('form').onsubmit({preventDefault(){}});
  assert($('message').textContent.includes('暂时无法读取'));
  assert.equal(learning.innerHTML, original);
  // The cloud release must report missing resources without calling local-only routes.
  const cloudBody = new Element(), cloudNav = new Element();
  let cloudFetches = 0;
  const cloud = {...sandbox, window:{__TEXTBOOKS_UNAVAILABLE__:true},
    document:{...sandbox.document, body:cloudBody, getElementById:() => cloudNav},
    fetch:async () => { cloudFetches++; throw new Error('unexpected fetch'); }};
  vm.runInNewContext(fs.readFileSync(__dirname + '/textbooks.js','utf8'), cloud);
  await cloud.window.ZH_TEXTBOOKS.open();
  assert.equal(cloudFetches, 0);
  assert(cloudBody.child.querySelector('#tb-message').textContent.includes('线上教材资源尚未发布'));
  assert(cloudBody.child.querySelector('#tb-search').disabled);
  assert.equal(learning.innerHTML, original);
  console.log('[OK] Inline original pages, zoom, text mode, navigation, image retry, shelf/search, escaping, return, focus, outage and learning state preservation');
})().catch(e => {console.error(e); process.exitCode = 1;});
