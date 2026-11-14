/* Product companion: original local animation, no network or account data. */
(() => {
  'use strict';
  if (document.getElementById('zhihu-companion')) return;
  const root = document.createElement('aside');
  root.id = 'zhihu-companion';
  root.className = 'zhihu-companion';
  root.setAttribute('aria-label', '知护动态形象');
  root.innerHTML = '<div class="mascot-expanded" id="mascot-expanded"><div class="mascot-media"><video autoplay muted loop playsinline preload="auto" aria-label="知护产品形象动画"></video><span class="mascot-fallback" hidden>知护<br><small>陪你一起学</small></span></div><div class="mascot-controls"><button type="button" data-mascot="minimize" aria-label="收起形象">收起</button></div></div><button class="mascot-restore" type="button" data-mascot="restore" aria-controls="mascot-expanded" aria-expanded="true" hidden>知护陪伴 <span aria-hidden="true">↗</span></button>';
  document.body.appendChild(root);
  const video = root.querySelector('video');
  const expanded = root.querySelector('.mascot-expanded');
  const restore = root.querySelector('[data-mascot="restore"]');
  const minimize = root.querySelector('[data-mascot="minimize"]');
  const fallback = root.querySelector('.mascot-fallback');
  let minimized = false, failed = false, pendingPlay = null;
  try { minimized = sessionStorage.getItem('zhihu.mascot.minimized') === '1'; } catch (_) {}
  video.muted = true;
  video.defaultMuted = true;
  video.autoplay = !minimized && !document.hidden;
  video.loop = true;
  video.playsInline = true;
  video.controls = false;
  // Relative to the script, including when this file is fingerprinted on release.
  video.src = new URL('zhihu-mascot.mp4', document.currentScript?.src || window.location.href).href;
  async function sync() {
    expanded.hidden = minimized;
    restore.hidden = !minimized;
    restore.setAttribute('aria-expanded', String(!minimized));
    if (minimized || document.hidden || failed) {
      video.pause(); return;
    }
    if (!video.paused || pendingPlay) return;
    try {
      pendingPlay = video.play(); await pendingPlay;
      if (minimized || document.hidden || failed) video.pause();
    }
    catch (_) { /* Retry automatically on media readiness or normal page interaction. */ }
    finally { pendingPlay = null; }
  }
  function collapse(value) {
    minimized = value;
    try { sessionStorage.setItem('zhihu.mascot.minimized', value ? '1' : '0'); } catch (_) {}
    sync(); (value ? restore : minimize).focus({preventScroll:true});
  }
  minimize.addEventListener('click', () => collapse(true));
  restore.addEventListener('click', () => collapse(false));
  video.addEventListener('error', () => {
    failed = true; video.hidden = true; fallback.hidden = false; sync();
  });
  video.addEventListener('loadeddata', sync);
  video.addEventListener('canplay', sync);
  document.addEventListener('visibilitychange', sync);
  window.addEventListener('pageshow', sync);
  function resume() { if (video.paused) sync(); }
  document.addEventListener('pointerdown', resume, {passive:true});
  document.addEventListener('keydown', resume);
  sync();
})();
