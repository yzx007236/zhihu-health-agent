/* Navigation presentation only; training and scoring remain in app.js. */
(() => {
  'use strict';
  const sidebar = document.getElementById('care-sidebar');
  const menu = document.getElementById('menu-toggle');
  const backdrop = document.getElementById('mobile-backdrop');
  function closeMenu(restoreFocus = false) {
    sidebar.classList.remove('open'); backdrop.classList.remove('open');
    document.body.classList.remove('menu-open'); menu.setAttribute('aria-expanded', 'false');
    if (window.matchMedia('(max-width:760px)').matches) sidebar.inert = true;
    if (restoreFocus && window.matchMedia('(max-width:760px)').matches) menu.focus();
  }
  menu.addEventListener('click', () => {
    if (sidebar.classList.contains('open')) return closeMenu(true);
    sidebar.inert = false; sidebar.classList.add('open'); backdrop.classList.add('open');
    document.body.classList.add('menu-open'); menu.setAttribute('aria-expanded', 'true');
    sidebar.querySelector('a').focus();
  });
  backdrop.addEventListener('click', () => closeMenu(true));
  document.addEventListener('keydown', e => {
    if (!sidebar.classList.contains('open')) return;
    if (e.key === 'Escape') closeMenu(true);
    if (e.key === 'Tab') {
      const links = [...sidebar.querySelectorAll('a,button')].filter(x => !x.hidden && x.offsetParent !== null);
      const first = links[0], last = links[links.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    }
  });
  document.getElementById('module-nav').addEventListener('click', e => {
    if (e.target.closest('a')) closeMenu(true);
  });
  document.querySelectorAll('[data-mobile-page]').forEach(button => {
    button.addEventListener('click', () => document.querySelector(`#module-nav a[data-m="${button.dataset.mobilePage}"]`)?.click());
  });
  document.getElementById('header-resources').addEventListener('click', () => document.querySelector('#module-nav a[data-m="resources"]').click());
  const screen = window.matchMedia('(max-width:760px)');
  const sync = () => { closeMenu(); sidebar.inert = screen.matches; };
  screen.addEventListener('change', sync); sync();
})();
