/* =========================================================
   BAROLLS — order.js
   Order builder on order.html. Nothing is stored or sent anywhere
   except into the WhatsApp message the customer chooses to send.
   Uses BAROLLS.* helpers from whatsapp.js.
   User-typed text is only ever written with textContent / .value.
   ========================================================= */
(function () {
  'use strict';

  const B = window.BAROLLS;
  const form = document.getElementById('orderForm');
  if (!B || !form) return;

  const $ = (id) => document.getElementById(id);
  const rows = Array.prototype.slice.call(document.querySelectorAll('.order-item'));
  const nameInput = $('custName'), pickupInput = $('pickup'), notesInput = $('notes');
  const sumList = $('sumList'), sumEmpty = $('sumEmpty'), sumTotal = $('sumTotal');
  const formError = $('formError'), nameErr = $('nameErr');
  const sendBtn = $('sendBtn'), sentNotice = $('sentNotice');
  const copyBtn = $('copyBtn'), copyMsg = $('copyMsg'), reopenLink = $('reopenLink');
  const preview = $('msgPreview');
  const bar = $('orderBar'), barCount = $('barCount'), barTotal = $('barTotal');
  const EMPTY_PREVIEW = 'Choose at least one item to see your message.';

  let sending = false;
  let lastMessage = '';

  const clamp = (v) => {
    const n = parseInt(v, 10);
    return isNaN(n) || n < 0 ? 0 : Math.min(B.MAX_QTY, n);
  };

  function getItems() {
    return rows.map((r) => ({
      name: r.getAttribute('data-name'),
      price: parseInt(r.getAttribute('data-price'), 10),
      qty: clamp(r.querySelector('.qty-input').value)
    })).filter((i) => i.qty > 0 && i.price > 0);
  }

  const totalOf = (items) => items.reduce((t, i) => t + i.qty * i.price, 0);

  function currentMessage(items) {
    return B.buildOrderMessage({ name: nameInput.value, items: items, pickup: pickupInput.value, notes: notesInput.value });
  }

  function render() {
    const items = getItems();
    const total = totalOf(items);
    const count = items.reduce((t, i) => t + i.qty, 0);

    sumList.textContent = '';
    items.forEach((i) => {
      const li = document.createElement('li');
      const label = document.createElement('span');
      label.textContent = i.qty + ' × ' + i.name;
      const amount = document.createElement('span');
      amount.textContent = B.formatUGX(i.qty * i.price);
      li.appendChild(label);
      li.appendChild(amount);
      sumList.appendChild(li);
    });
    sumEmpty.hidden = items.length > 0;
    sumTotal.textContent = B.formatUGX(total);

    barCount.textContent = count + (count === 1 ? ' item' : ' items');
    barTotal.textContent = B.formatUGX(total);
    bar.hidden = items.length === 0;

    preview.textContent = items.length ? currentMessage(items) : EMPTY_PREVIEW;
    $('notesCount').textContent = notesInput.value.length;
  }

  /* ---- quantity controls ---- */
  form.addEventListener('click', (e) => {
    const btn = e.target.closest('.qty button');
    if (!btn) return;
    const input = btn.parentElement.querySelector('.qty-input');
    input.value = clamp(clamp(input.value) + parseInt(btn.getAttribute('data-q'), 10));
    clearErrors();
    render();
  });
  form.addEventListener('input', (e) => {
    if (e.target.classList.contains('qty-input')) {
      // allow the field to be empty while typing; normalise on change
      if (e.target.value !== '' && clamp(e.target.value) !== parseInt(e.target.value, 10)) e.target.value = clamp(e.target.value);
    }
    clearErrors();
    render();
  });
  form.addEventListener('change', (e) => {
    if (e.target.classList.contains('qty-input')) { e.target.value = clamp(e.target.value); render(); }
  });

  /* ---- validation ---- */
  function hasLetter(s) {
    try { return /\p{L}/u.test(s); } catch (err) { return /[A-Za-z]/.test(s); }
  }

  function clearErrors() {
    formError.hidden = true;
    formError.textContent = '';
    nameErr.hidden = true;
    nameErr.textContent = '';
    nameInput.removeAttribute('aria-invalid');
  }

  function validate() {
    clearErrors();
    const items = getItems();
    const name = B.sanitize(nameInput.value, 60);
    const nameOk = name.length >= 2 && hasLetter(name);

    if (!nameOk) {
      nameErr.textContent = 'Please enter your name (at least 2 letters).';
      nameErr.hidden = false;
      nameInput.setAttribute('aria-invalid', 'true');
    }
    if (!items.length) {
      formError.textContent = 'Please choose at least one item before sending your order.';
      formError.hidden = false;
    }
    if (!nameOk) { nameInput.focus(); return null; }
    if (!items.length) { formError.scrollIntoView({ block: 'nearest' }); return null; }
    nameInput.value = name;
    return items;
  }

  /* ---- send ---- */
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    if (sending) return;
    const items = validate();
    if (!items) return;

    lastMessage = currentMessage(items);
    const url = B.buildUrl(lastMessage);
    reopenLink.setAttribute('href', url);

    sending = true;
    sendBtn.disabled = true;
    setTimeout(() => { sending = false; sendBtn.disabled = false; }, 3000);

    sentNotice.hidden = false;
    copyMsg.textContent = '';
    sentNotice.focus();

    const w = window.open(url, '_blank');
    if (w) { try { w.opener = null; } catch (err) { /* ignore */ } }
    else { window.location.href = url; }
  });

  /* ---- copy fallback ---- */
  function copyText(text) {
    if (navigator.clipboard && window.isSecureContext) return navigator.clipboard.writeText(text);
    return new Promise((resolve, reject) => {
      const ta = document.createElement('textarea');
      ta.value = text;
      ta.setAttribute('readonly', '');
      ta.style.position = 'fixed';
      ta.style.opacity = '0';
      document.body.appendChild(ta);
      ta.select();
      let ok = false;
      try { ok = document.execCommand('copy'); } catch (err) { ok = false; }
      document.body.removeChild(ta);
      ok ? resolve() : reject(new Error('copy failed'));
    });
  }

  copyBtn.addEventListener('click', () => {
    const items = getItems();
    const text = lastMessage || (items.length ? currentMessage(items) : '');
    if (!text) { copyMsg.textContent = 'Choose at least one item first.'; return; }
    copyText(text).then(
      () => { copyMsg.textContent = 'Order message copied. Paste it into WhatsApp.'; },
      () => { copyMsg.textContent = 'Could not copy automatically. Open “Preview your message” and copy the text.'; }
    );
  });

  render();
})();
