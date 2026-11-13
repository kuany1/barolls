/* =========================================================
   BAROLLS — whatsapp.js
   Single source of truth for WhatsApp links and order messages.
   - Every order button carries the class `js-whatsapp` and an
     optional `data-item` (product name). Its price and quantity
     are read from the product card it sits in.
   - order.js (Order page) reuses buildOrderMessage() below.
   ========================================================= */
(function () {
  'use strict';

  var WHATSAPP_NUMBER = '256765068833'; // +256 765 068833 — international format, no "+", no spaces
  var MAX_QTY = 20;

  /* Remove control / invisible characters, collapse whitespace, cap length. */
  function sanitize(value, max) {
    var s = String(value == null ? '' : value)
      .replace(/[\u0000-\u001F\u007F\u200B-\u200F\u202A-\u202E\u2066-\u2069\uFEFF]/g, ' ')
      .replace(/\s+/g, ' ')
      .trim();
    return max ? s.slice(0, max) : s;
  }

  function formatUGX(n) {
    return 'UGX ' + Number(n).toLocaleString('en-US');
  }

  /* items: [{ name, qty, price }] — message layout is the same everywhere. */
  function buildOrderMessage(order) {
    var lines = ['BAROLLS ORDER', '', 'Customer Name: ' + sanitize(order.name, 60), '', 'ORDER DETAILS', ''];
    var total = 0;
    order.items.forEach(function (it, i) {
      var sub = it.qty * it.price;
      total += sub;
      lines.push((i + 1) + '. ' + it.name);
      lines.push('   Quantity: ' + it.qty);
      lines.push('   Unit Price: ' + formatUGX(it.price));
      lines.push('   Subtotal: ' + formatUGX(sub));
      lines.push('');
    });
    lines.push('TOTAL: ' + formatUGX(total), '');
    if (order.pickup !== undefined) lines.push('Preferred Pickup Time: ' + (sanitize(order.pickup, 40) || 'Not specified'));
    lines.push('Special Instructions: ' + (order.notes === undefined ? '' : (sanitize(order.notes, 300) || 'None')), '');
    lines.push('Please confirm availability and the final order arrangements.');
    return lines.join('\n');
  }

  function buildUrl(text) {
    return 'https://wa.me/' + WHATSAPP_NUMBER + '?text=' + encodeURIComponent(text);
  }

  /* ---- Buttons on menu cards / hero ---- */
  function priceFor(el) {
    var src = el.closest('.food-card');
    src = src ? src.querySelector('.price') : (el.id === 'stageOrder' ? document.getElementById('stagePrice') : null);
    var n = src ? parseInt(src.textContent.replace(/\D/g, ''), 10) : NaN;
    return isNaN(n) ? 0 : n;
  }

  function qtyFor(el) {
    var card = el.closest('.food-card');
    var v = card && card.querySelector('.qty-val');
    var n = v ? parseInt(v.textContent, 10) : 1;
    return isNaN(n) || n < 1 ? 1 : Math.min(MAX_QTY, n);
  }

  function messageFor(el) {
    var item = sanitize(el.getAttribute('data-item'), 80);
    if (!item) {
      return el.getAttribute('data-intent') === 'feedback'
        ? "Hello BAROLLS, I'd like to share some feedback."
        : "Hello BAROLLS, I'd like to place an order.";
    }
    var price = priceFor(el);
    if (!price) return 'Hello BAROLLS, I would like to order: ' + item + '.';
    return buildOrderMessage({ name: '', items: [{ name: item, qty: qtyFor(el), price: price }], notes: undefined });
  }

  function refresh(el) {
    el.setAttribute('href', buildUrl(messageFor(el)));
  }

  function init() {
    var buttons = document.querySelectorAll('.js-whatsapp');
    buttons.forEach(function (el) {
      refresh(el);
      el.setAttribute('target', '_blank');
      el.setAttribute('rel', 'noopener noreferrer');
      var lastTap = 0;
      el.addEventListener('click', function (e) {
        var t = Date.now();
        if (t - lastTap < 1500) { e.preventDefault(); return; } // ignore double-tap
        lastTap = t;
        refresh(el); // pick up the latest item / quantity
      });
    });

    document.querySelectorAll('.food-card .qty button').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var val = btn.parentElement.querySelector('.qty-val');
        var next = parseInt(val.textContent, 10) + parseInt(btn.getAttribute('data-q'), 10);
        val.textContent = Math.min(MAX_QTY, Math.max(1, isNaN(next) ? 1 : next));
        var link = btn.closest('.food-card').querySelector('.js-whatsapp');
        if (link) refresh(link);
      });
    });
  }

  window.BAROLLS = {
    WHATSAPP_NUMBER: WHATSAPP_NUMBER, MAX_QTY: MAX_QTY,
    sanitize: sanitize, formatUGX: formatUGX, buildOrderMessage: buildOrderMessage,
    buildUrl: buildUrl, refresh: refresh
  };

  init();
})();
