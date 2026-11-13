/* =========================================================
   BAROLLS — main.js
   Shared behaviour on every page: sticky navbar state, mobile menu,
   current-page highlight, opening hours (Africa/Kampala time) and
   the footer year.
   ========================================================= */
(function () {
  'use strict';

  /* ---- Sticky navbar shadow on scroll ---- */
  const navbar = document.querySelector('.navbar');
  if (navbar) {
    const onScroll = () => navbar.classList.toggle('is-scrolled', window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  /* ---- Mobile menu ---- */
  const toggle = document.querySelector('.nav-toggle');
  const links = document.querySelector('.nav-links');
  if (toggle && links) {
    const setOpen = (open) => {
      links.classList.toggle('is-open', open);
      toggle.classList.toggle('is-open', open);
      toggle.setAttribute('aria-expanded', String(open));
    };
    toggle.addEventListener('click', () => setOpen(!links.classList.contains('is-open')));
    links.querySelectorAll('a').forEach((a) => a.addEventListener('click', () => setOpen(false)));
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && links.classList.contains('is-open')) { setOpen(false); toggle.focus(); }
    });
  }

  /* ---- Current page highlight ---- */
  const currentPage = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a').forEach((link) => {
    if (link.getAttribute('href') === currentPage) {
      link.classList.add('active');
      link.setAttribute('aria-current', 'page');
    }
  });

  /* ---- Opening hours in Uganda time, plus a notice when closed ---- */
  const fmt = (h) => (h % 12 || 12) + ':00 ' + (h < 12 ? 'AM' : 'PM');
  let now;
  try { now = new Date(new Date().toLocaleString('en-US', { timeZone: 'Africa/Kampala' })); }
  catch (e) { now = new Date(); }
  const day = now.getDay();                                   // 0 = Sunday
  const hrs = day === 0 ? [9, 21] : day === 6 ? [8, 23] : [7, 22];
  const isOpen = now.getHours() >= hrs[0] && now.getHours() < hrs[1];
  const todayText = fmt(hrs[0]) + ' – ' + fmt(hrs[1]);

  const hoursEl = document.querySelector('[data-today-hours]');
  if (hoursEl) hoursEl.textContent = 'Today: ' + todayText;

  if (!isOpen && navbar && document.querySelector('.stage, .menu-tabs, .order-form, .contact-grid')) {
    const note = document.createElement('p');
    note.className = 'closed-note';
    note.setAttribute('role', 'status');
    note.textContent = "We're closed right now (today " + todayText + "). You can still send your order and we'll reply when we open.";
    navbar.insertAdjacentElement('afterend', note);
  }

  /* ---- Footer year ---- */
  const yearEl = document.querySelector('[data-year]');
  if (yearEl) yearEl.textContent = new Date().getFullYear();
})();
