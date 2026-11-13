/* =========================================================
   BAROLLS — menu.js
   Category tabs on menu.html. Supports links such as
   menu.html#fries (deep links from other pages).
   ========================================================= */
(function () {
  'use strict';

  const tabs = document.querySelectorAll('.menu-tab');
  const categories = document.querySelectorAll('.menu-category');
  if (!tabs.length || !categories.length) return;

  function show(id, scroll) {
    const target = document.getElementById(id);
    if (!target || !target.classList.contains('menu-category')) return false;
    tabs.forEach((t) => {
      const on = t.getAttribute('data-target') === id;
      t.classList.toggle('active', on);
      t.setAttribute('aria-pressed', String(on));
    });
    categories.forEach((c) => c.classList.toggle('active', c.id === id));
    if (scroll) {
      const y = target.getBoundingClientRect().top + window.scrollY - 170;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
    return true;
  }

  tabs.forEach((tab) => tab.addEventListener('click', () => show(tab.getAttribute('data-target'), true)));

  const fromHash = () => { if (location.hash.length > 1) show(decodeURIComponent(location.hash.slice(1)), false); };
  fromHash();
  window.addEventListener('hashchange', fromHash);
})();
