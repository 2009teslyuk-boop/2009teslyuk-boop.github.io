/* ДИМ · Smokehouse — спільний код */
const $=(s,r=document)=>r.querySelector(s),$$=(s,r=document)=>[...r.querySelectorAll(s)];
const U=id=>`img/${id}.jpg`;
const ph=(id,alt='')=>`<div class="ph"><img src="${U(id)}" alt="${alt}" loading="lazy" onload="this.classList.add('ld')"></div>`;
const store={get(k,d){try{return JSON.parse(localStorage.getItem(k))??d}catch(e){return d}},set(k,v){try{localStorage.setItem(k,JSON.stringify(v))}catch(e){}}};
const SHOP={phone:'+380 67 300 40 50',address:'Київ, вул. Жилянська, 59',hours:'Пн–Чт 12:00–23:00 · Пт–Нд 12:00–01:00'};

/* ===== Меню (ціни в гривнях) ===== */
const CATS=[['ribs','Ребра'],['smoke','З коптильні'],['burgers','Бургери'],['snacks','Закуски'],['drinks','Напої']];
const MENU=[
 {id:'pork-ribs',c:'ribs',n:'Свинячі ребра BBQ',d:'Коптимо 6 годин на вишні, глазуруємо фірмовим соусом BBQ.',w:'500 г',p:389,img:'1544025162-d76694265947',tag:'Хіт'},
 {id:'honey-ribs',c:'ribs',n:'Ребра мед і гірчиця',d:'Солодко-пікантна глазур з діжонською гірчицею.',w:'500 г',p:419,img:'1761712826171-609bcf1d02af'},
 {id:'beef-rib',c:'ribs',n:'Яловиче ребро',d:'Short rib на кістці, 10 годин диму. Ріжеться ложкою.',w:'600 г',p:649,img:'1766589152485-9aafd9812a19',tag:'Шеф'},
 {id:'sticky-ribs',c:'ribs',n:'Ребра Sticky Asian',d:'Соєво-імбирна глазур, кунжут, зелена цибуля.',w:'500 г',p:429,img:'1761315413349-d303df5723ca'},
 {id:'devil-ribs',c:'ribs',n:'Ребра «Диявол»',d:'Халапеньйо, чипотле та хабанеро. Для сміливих.',w:'500 г',p:409,img:'1593030668930-8130abedd2b0',tag:'🌶🌶🌶',hot:1},
 {id:'ribs-fries',c:'ribs',n:'Ребра з картоплею',d:'Половина порції ребер, фрі та капустяний салат.',w:'650 г',p:459,img:'1773516035242-fad7fc6b263b'},
 {id:'brisket',c:'smoke',n:'Брискет 12 годин',d:'Яловича грудинка, сіль і перець, дубові дрова.',w:'250 г',p:389,img:'1529692236671-f1f6cf9683ba',tag:'Хіт'},
 {id:'pulled',c:'smoke',n:'Пулд порк сендвіч',d:'Рване свиняче плече, коул-слоу, бріош.',w:'320 г',p:249,img:'1761712826051-b873907fb5d3'},
 {id:'chicken',c:'smoke',n:'Курча з коптильні',d:'Ціле курча в маринаді з паприкою та часником.',w:'900 г',p:349,img:'1632158930341-46604b637a0f'},
 {id:'ribeye',c:'smoke',n:'Стейк рібай',d:'Мармурова яловичина, гриль на вугіллі.',w:'350 г',p:790,img:'1546964124-0cce460f38ef'},
 {id:'smoke-burger',c:'burgers',n:'Smoke Burger',d:'Подвійна котлета, бекон, чедер, BBQ-соус.',w:'380 г',p:289,img:'1553979459-d2229ba7433b',tag:'Хіт'},
 {id:'brisket-burger',c:'burgers',n:'Брискет бургер',d:'Нарізаний брискет, мариновані огірки, гірчиця.',w:'360 г',p:319,img:'1550317138-10000687a72b'},
 {id:'classic-burger',c:'burgers',n:'Класичний',d:'Яловича котлета, томат, салат, цибуля.',w:'320 г',p:259,img:'1586190848861-99aa4a171e90'},
 {id:'wings-bbq',c:'snacks',n:'Крила BBQ',d:'Копчені крила в солодкому BBQ.',w:'8 шт',p:229,img:'1567620832903-9fc6debc209f'},
 {id:'wings-buffalo',c:'snacks',n:'Крила Баффало',d:'Гострий соус Баффало та блю-чиз.',w:'8 шт',p:239,img:'1608039755401-742074f0548d',hot:1},
 {id:'fries-truffle',c:'snacks',n:'Фрі з трюфелем',d:'Пармезан, трюфельна олія, петрушка.',w:'200 г',p:129,img:'1630384060421-cb20d0e0649d'},
 {id:'fries-bacon',c:'snacks',n:'Фрі бекон і сир',d:'Соус чедер, бекон, зелена цибуля.',w:'250 г',p:159,img:'1573080496219-bb080dd4f877'},
 {id:'corn',c:'snacks',n:'Кукурудза гриль',d:'Вершкове масло з паприкою, лайм.',w:'2 шт',p:99,img:'1634467524884-897d0af5e104'},
 {id:'lager',c:'drinks',n:'Крафтове світле',d:'Місцева броварня, свіже з крану.',w:'0,5 л',p:99,img:'1608270586620-248524c67de9'},
 {id:'ipa',c:'drinks',n:'IPA',d:'Цитрусова хмелева гірчинка.',w:'0,5 л',p:119,img:'1600788886242-5c96aabe3757'},
 {id:'lemonade',c:'drinks',n:'Лимонад копчений',d:'Лимон, розмарин і ледь відчутний дим.',w:'0,4 л',p:89,img:'1523677011781-c91d1bbe2f9e'},
];
const byId=id=>MENU.find(m=>m.id===id);
const ICO={cart:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 7h12l-1 13H7L6 7z"/><path d="M9 7a3 3 0 0 1 6 0"/></svg>',menu:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 8h16M4 16h16"/></svg>',x:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 6l12 12M18 6L6 18"/></svg>',flame:'<svg viewBox="0 0 32 32"><path d="M16 2c2 6 9 9 9 17a9 9 0 0 1-18 0c0-5 3-7 4-11 1 3 2 4 3 4 0-4 1-7 2-10z" fill="#ff5a1f"/><path d="M16 15c1 3 4 4 4 8a4 4 0 0 1-8 0c0-2 1-3 2-5 0 1 1 2 1 2 0-2 0-3 1-5z" fill="#f4b63f"/></svg>'};

function dishCard(m,i=0){return `<article class="dish" style="animation-delay:${i*45}ms">${m.tag?`<span class="tg ${m.hot?'hot':''}">${m.tag}</span>`:''}${ph(m.img,m.n)}<div class="bd"><h3>${m.n}</h3><span class="w">${m.w}${m.hot&&!m.tag?' · <span class="chil">🌶🌶</span>':''}</span><p>${m.d}</p><div class="ft"><span class="price">${m.p}<small>₴</small></span><button class="add" data-add="${m.id}" aria-label="Додати ${m.n}">+</button></div></div></article>`}

/* ===== Шапка, футер, кошик ===== */
const PAGES=[['index.html','Головна'],['menu.html','Меню'],['smoke.html','Як ми коптимо'],['booking.html','Бронювання']];
function layout(){
  const cur=document.body.dataset.page;
  const nav=PAGES.map(([h,t])=>`<a href="${h}" class="${h===cur?'on':''}">${t}</a>`).join('');
  document.body.insertAdjacentHTML('afterbegin',`<header class="hdr" id="hdr"><div class="wrap">
    <a href="index.html" class="logo" aria-label="ДИМ — головна">${ICO.flame}ДИМ<small>smokehouse</small></a>
    <nav class="nav">${nav}</nav><div class="sp"></div>
    <button class="cartbtn" id="openCart">${ICO.cart}<span class="lbl">Кошик</span><span class="n" id="cnt">0</span></button>
    <button class="burger" id="burger" aria-label="Меню">${ICO.menu}</button>
  </div></header><div class="mnav" id="mnav">${nav}</div>`);
  document.body.insertAdjacentHTML('beforeend',`<footer class="ftr"><div class="wrap">
    <div class="fcols">
      <div><a href="index.html" class="logo">${ICO.flame}ДИМ</a><span style="margin-top:12px;max-width:300px">Американський барбекю по-київськи. Коптимо щодня з 6 ранку на вишні, дубі та буку.</span></div>
      <div><h4>Меню</h4><a href="menu.html#ribs">Ребра</a><a href="menu.html#smoke">З коптильні</a><a href="menu.html#burgers">Бургери</a><a href="menu.html#drinks">Напої</a></div>
      <div><h4>Гостям</h4><a href="booking.html">Бронювання</a><a href="booking.html#party">Банкети</a><a href="smoke.html">Як ми коптимо</a></div>
      <div><h4>Контакти</h4><span>${SHOP.address}</span><span>${SHOP.phone}</span><span>${SHOP.hours}</span></div>
    </div>
    <div class="fbig">ДИМ</div>
    <div class="fbot"><span>© 2026 ДИМ Smokehouse · Демонстраційний проєкт для портфоліо</span><span>Фото: <a href="https://unsplash.com" target="_blank" rel="noopener">Unsplash</a></span></div>
  </div></footer>
  <div class="ov" id="ov"></div>
  <aside class="drawer" id="drawer" aria-label="Кошик">
    <div class="dh"><h3>Ваше замовлення</h3><button class="x" id="cx" aria-label="Закрити">✕</button></div>
    <div class="dl" id="dl"></div>
    <form class="df" id="df">
      <div class="seg" id="mode"><button type="button" class="on" data-m="del">Доставка · 45 хв</button><button type="button" data-m="pick">Самовивіз · 25 хв</button></div>
      <input class="inp" id="oName" required placeholder="Ваше ім'я" aria-label="Ім'я">
      <input class="inp" id="oPhone" required type="tel" placeholder="+380 __ ___ __ __" aria-label="Телефон">
      <input class="inp" id="oAddr" placeholder="Вулиця, будинок, квартира" aria-label="Адреса доставки">
      <div class="tot"><span class="note" id="dnote">Доставка 79 ₴ · безкоштовно від 900 ₴</span><b id="total">0 ₴</b></div>
      <button class="btn fire" id="pay">Замовити</button>
    </form>
  </aside>
  <div class="done" id="done"><div class="box"><div class="big">🔥</div><h3 class="disp" style="font-size:40px;margin:12px 0 8px">Замовлення <span id="ordNo"></span></h3><p class="lead" style="margin:0 auto 22px" id="ordTxt"></p><button class="btn fire" id="doneOk">Супер</button></div></div>
  <div class="toast" id="toast" role="status"></div>`);
  const mn=$('#mnav'),bg=$('#burger');bg.onclick=()=>{const o=mn.classList.toggle('open');bg.innerHTML=o?ICO.x:ICO.menu;document.body.style.overflow=o?'hidden':''};
  $('#openCart').onclick=()=>openCart(true);$('#cx').onclick=$('#ov').onclick=()=>openCart(false);
  addEventListener('keydown',e=>e.key==='Escape'&&openCart(false));
  $('#mode').onclick=e=>{const b=e.target.closest('button');if(!b)return;mode=b.dataset.m;$$('#mode button').forEach(x=>x.classList.toggle('on',x===b));$('#oAddr').style.display=mode==='del'?'':'none';$('#oAddr').required=mode==='del';drawCart()};
  $('#oAddr').required=true;
  $('#dl').onclick=e=>{const u=e.target.dataset.u,d=e.target.dataset.d;if(u!=null)cart[u].q++;if(d!=null){cart[d].q--;if(!cart[d].q)cart.splice(d,1)}save();drawCart()};
  $('#df').onsubmit=e=>{e.preventDefault();if(!cart.length)return toast('Спершу додайте щось смачне');const n=Math.floor(1000+Math.random()*9000);$('#ordNo').textContent='№'+n;$('#ordTxt').textContent=mode==='del'?'Вже кладемо на гриль. Кур\'єр буде у вас приблизно за 45 хвилин.':'Вже кладемо на гриль. Забирайте за 25 хвилин.';cart=[];save();drawCart();e.target.reset();openCart(false);$('#done').classList.add('show')};
  $('#doneOk').onclick=()=>$('#done').classList.remove('show');
  addEventListener('scroll',()=>$('#hdr').classList.toggle('solid',scrollY>40),{passive:true});
  drawCart();
}
let mode='del',cart=store.get('dym-cart',[]);
const save=()=>store.set('dym-cart',cart);
function add(id,btn){const m=byId(id);if(!m)return;const ex=cart.find(x=>x.id===id);ex?ex.q++:cart.push({id,q:1});save();drawCart();toast(`🔥 ${m.n} — у кошику`);
  if(btn){btn.classList.add('ok');btn.textContent='✓';setTimeout(()=>{btn.classList.remove('ok');btn.textContent='+'},1100)}
  $('#cnt').animate([{transform:'scale(1)'},{transform:'scale(1.5)'},{transform:'scale(1)'}],{duration:450})}
function addSet(items,label){items.forEach(([id,q])=>{const ex=cart.find(x=>x.id===id);ex?ex.q+=q:cart.push({id,q})});save();drawCart();toast(`🔥 ${label} — у кошику`);openCart(true)}
function drawCart(){
  const n=cart.reduce((s,x)=>s+x.q,0),sum=cart.reduce((s,x)=>s+byId(x.id).p*x.q,0);
  $('#cnt').textContent=n;
  $('#dl').innerHTML=cart.length?cart.map((x,i)=>{const m=byId(x.id);return `<div class="ci">${ph(m.img)}<div class="t"><b>${m.n}</b><span>${m.w} · ${m.p} ₴</span></div><div class="qty"><button type="button" data-d="${i}" aria-label="Менше">−</button>${x.q}<button type="button" data-u="${i}" aria-label="Більше">+</button></div></div>`}).join(''):`<div class="empty"><div style="font-size:46px">🍖</div><p style="margin:10px 0 18px">Кошик порожній. Ребра самі себе не з'їдять.</p><a href="menu.html" class="btn fire sm">До меню</a></div>`;
  const del=mode==='del'&&sum>0&&sum<900?79:0;
  $('#dnote').textContent=mode==='del'?(sum>=900?'Доставка безкоштовна 🎉':`Доставка 79 ₴ · ще ${900-sum} ₴ до безкоштовної`):'Самовивіз з вул. Жилянська, 59';
  $('#total').textContent=(sum+del)+' ₴';
}
function openCart(v){$('#drawer').classList.toggle('show',v);$('#ov').classList.toggle('show',v);document.body.style.overflow=v?'hidden':''}
document.addEventListener('click',e=>{const b=e.target.closest('[data-add]');if(b){e.preventDefault();add(b.dataset.add,b.classList.contains('add')?b:null)}});

/* іскри від жару */
function embers(canvas,count=70){const c=canvas.getContext('2d');let W,H,P=[];const rs=()=>{W=canvas.width=canvas.offsetWidth;H=canvas.height=canvas.offsetHeight;P=[...Array(count)].map(()=>mk(true))};
  const mk=init=>({x:Math.random()*W,y:init?Math.random()*H:H+10,r:Math.random()*2.2+.6,v:Math.random()*1.2+.4,w:Math.random()*6,a:Math.random()*.6+.4});
  rs();addEventListener('resize',rs);
  (function f(){c.clearRect(0,0,W,H);for(const p of P){p.y-=p.v;p.w+=.02;p.x+=Math.sin(p.w)*.6;p.a-=.0016;if(p.y<-10||p.a<=0)Object.assign(p,mk(false));c.beginPath();c.fillStyle=`rgba(255,${120+Math.random()*60|0},40,${p.a})`;c.shadowBlur=12;c.shadowColor='#ff5a1f';c.arc(p.x,p.y,p.r,0,7);c.fill()}requestAnimationFrame(f)})()}

let _tt;function toast(m){const t=$('#toast');t.textContent=m;t.classList.add('show');clearTimeout(_tt);_tt=setTimeout(()=>t.classList.remove('show'),2400)}
function hydrate(r=document){$$('.ph[data-img]',r).forEach(d=>{if(d.querySelector('img'))return;const i=new Image();i.alt='';i.loading='lazy';i.onload=()=>i.classList.add('ld');i.src=U(d.dataset.img);d.prepend(i)})}
const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}}),{threshold:.1});
function boot(){layout();hydrate();$$('.rv').forEach(el=>io.observe(el));
  if(window.Lenis&&!matchMedia('(prefers-reduced-motion: reduce)').matches){document.documentElement.style.scrollBehavior='auto';const l=new Lenis({duration:1.1});(function r(t){l.raf(t);requestAnimationFrame(r)})(performance.now());window.lenis=l}}
