/* BAROLLS — hero.js: featured-item slider on the home page (manual controls only, no autoplay) */
(function () {
  'use strict';
  const items = [
    { name: "Signature Baroll", price: "UGX 15,000", img: "images/menu/signature-baroll.webp", w: 900, h: 720, desc: "The full BAROLLS experience — our most loaded roll, made to impress." },
    { name: "Beef Baroll", price: "UGX 10,000", img: "images/menu/beef-baroll.webp", w: 900, h: 720, desc: "Seasoned minced beef, fresh vegetables and house sauce, rolled hot." },
    { name: "Chicken Baroll", price: "UGX 10,000", img: "images/menu/chicken-baroll.webp", w: 900, h: 720, desc: "Grilled shredded chicken, crisp veggies and tangy house sauce." },
    { name: "Fries & Chicken", price: "UGX 20,000", img: "images/menu/fries-and-chicken-plate.webp", w: 873, h: 718, desc: "A full plate — crispy fries piled with juicy fried chicken." }
  ];
  const $ = (id) => document.getElementById(id);
  const stage = document.querySelector('.stage');
  if (!stage || !$('stageTitle')) return;
  let i = 0;

  function show(n) {
    i = (n + items.length) % items.length;
    const it = items[i];
    stage.classList.add('is-swapping');
    setTimeout(() => {
      $('stageTitle').textContent = it.name;
      $('stageDesc').textContent = it.desc;
      $('stagePrice').textContent = it.price;
      const img = $('stageImg');
      img.src = it.img;
      img.width = it.w;
      img.height = it.h;
      img.alt = it.name + (it.name.indexOf('Baroll') > -1 ? ' — chapati-wrapped Baroll from BAROLLS, Arua' : ' from BAROLLS, Arua');
      const order = $('stageOrder');
      order.setAttribute('data-item', it.name);
      if (window.BAROLLS) window.BAROLLS.refresh(order);
      $('stageNum').textContent = '0' + (i + 1);
      stage.classList.remove('is-swapping');
    }, 220);
  }

  $('stagePrev').addEventListener('click', () => show(i - 1));
  $('stageNext').addEventListener('click', () => show(i + 1));
})();
