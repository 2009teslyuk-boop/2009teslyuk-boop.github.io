/* Orchard — спільний код */
const $=(s,r=document)=>r.querySelector(s),$$=(s,r=document)=>[...r.querySelectorAll(s)];
const fmt=n=>n.toLocaleString('uk-UA').replace(/,/g,' ')+' ₴';
const U=id=>`img/${id}.jpg`;
const ph=(id,alt='')=>`<div class="ph"><img src="${U(id)}" alt="${alt}" loading="lazy" onload="this.classList.add('ld')"></div>`;
const store={get(k,d){try{return JSON.parse(localStorage.getItem(k))??d}catch(e){return d}},set(k,v){try{localStorage.setItem(k,JSON.stringify(v))}catch(e){}}};
const param=k=>new URLSearchParams(location.search).get(k);

/* ===== Товари. sp — характеристики для порівняння ===== */
const P=[
 {id:'ip17p',cat:'iphone',n:'iPhone 17 Pro',d:'Алюмінієвий unibody, A19 Pro, три камери 48 Мп.',tag:'Новинка',base:54999,mem:[256,512,1024],step:7000,colors:[['Космічний оранжевий','#d9773a'],['Глибокий синій','#2f3b55'],['Срібний','#d6d6d8']],img:['1757710436034-f1d7372ec1be','1764746250417-2cc103a45a56','1757709608566-4b9fd41a7af5'],sp:{chip:'A19 Pro',screen:'6,3″ ProMotion 120 Гц',cam:'48 + 48 + 48 Мп, 8× зум',video:'до 31 год',weight:'204 г',body:'Алюміній'},pop:10},
 {id:'ipair',cat:'iphone',n:'iPhone Air',d:'Найтонший iPhone в історії — 5,6 мм.',tag:'Новинка',base:47999,mem:[256,512,1024],step:7000,colors:[['Срібний','#e3e3e5'],['Небесний','#b9d4ea'],['Чорний','#202020']],img:['1727013884184-b313982327f3','1759588073186-1d4ac7e33623'],sp:{chip:'A19 Pro',screen:'6,5″ ProMotion 120 Гц',cam:'48 Мп Fusion',video:'до 27 год',weight:'165 г',body:'Титан'},pop:9},
 {id:'ip17',cat:'iphone',n:'iPhone 17',d:'ProMotion 120 Гц і чип A19.',tag:'Новинка',base:38999,mem:[256,512],step:6000,colors:[['Білий','#ececec'],['Лавандовий','#c7b8e6'],['Шавлія','#a8b8a0'],['Чорний','#2b2b2b']],img:['1591337676887-a217a6970a8a','1726732970014-f2df88c87dd3'],sp:{chip:'A19',screen:'6,3″ ProMotion 120 Гц',cam:'48 + 48 Мп',video:'до 30 год',weight:'177 г',body:'Алюміній'},pop:9},
 {id:'ip16e',cat:'iphone',n:'iPhone 16e',d:'Все необхідне за доступною ціною.',tag:'',base:24999,mem:[128,256],step:4000,colors:[['Чорний','#262626'],['Білий','#f0f0f0']],img:['1702184117235-56002cb13663','1709528922440-4fc4f05ef110'],sp:{chip:'A18',screen:'6,1″ OLED 60 Гц',cam:'48 Мп',video:'до 26 год',weight:'167 г',body:'Алюміній'},pop:6},
 {id:'mbp',cat:'mac',n:'MacBook Pro 14″ M5',d:'Liquid Retina XDR. До 24 год автономності.',tag:'Новинка',base:79999,mem:[512,1024,2048],step:12000,colors:[['Космічний чорний','#2e2e30'],['Сріблястий','#cfd0d2']],img:['1517336714731-489689fd1ca8','1629131726692-1accd0c53ce0'],sp:{chip:'M5',screen:'14,2″ XDR 120 Гц',cam:'12 Мп Center Stage',video:'до 24 год',weight:'1,55 кг',body:'Алюміній'},pop:9},
 {id:'mba',cat:'mac',n:'MacBook Air 13″ M4',d:'Тонкий, легкий і безшумний.',tag:'',base:46999,mem:[256,512,1024],step:9000,colors:[['Сріблястий','#d4d5d7'],['Небесний','#a9c2d6'],['Північ','#2f3441']],img:['1611186871348-b1ce696e52c9','1541807084-5c52b6b3adef'],sp:{chip:'M4',screen:'13,6″ Liquid Retina',cam:'12 Мп Center Stage',video:'до 18 год',weight:'1,24 кг',body:'Алюміній'},pop:8},
 {id:'imac',cat:'mac',n:'iMac 24″ M4',d:'Все‑в‑одному з дисплеєм 4,5K.',tag:'',base:59999,mem:[256,512],step:9000,colors:[['Сріблястий','#d4d5d7'],['Синій','#7d9bc1'],['Рожевий','#e8b4b8']],img:['1527443224154-c4a3942d3acf','1527443195645-1133f7f28990'],sp:{chip:'M4',screen:'24″ 4,5K Retina',cam:'12 Мп Center Stage',video:'—',weight:'4,4 кг',body:'Алюміній'},pop:6},
 {id:'ipadpro',cat:'ipad',n:'iPad Pro M5',d:'Ультратонкий з дисплеєм Tandem OLED.',tag:'',base:49999,mem:[256,512,1024],step:9000,colors:[['Космічний чорний','#2b2b2d'],['Сріблястий','#d2d3d5']],img:['1630331528526-7d04c6eb463f','1561154464-82e9adf32764'],sp:{chip:'M5',screen:'11″ Tandem OLED',cam:'12 Мп',video:'до 10 год',weight:'444 г',body:'Алюміній'},pop:7},
 {id:'ipadair',cat:'ipad',n:'iPad Air M3',d:'Потужність M3 у легкому корпусі.',tag:'',base:29999,mem:[128,256,512],step:5000,colors:[['Сірий','#8a8a8f'],['Фіолетовий','#b7a6cf'],['Синій','#90a9c5']],img:['1630453016513-bba65d503b06','1544244015-0df4b3ffc6b0'],sp:{chip:'M3',screen:'11″ Liquid Retina',cam:'12 Мп',video:'до 10 год',weight:'460 г',body:'Алюміній'},pop:7},
 {id:'aw11',cat:'watch',n:'Apple Watch Series 11',d:'Моніторинг тиску та сну. 24 год роботи.',tag:'Новинка',base:18999,mem:['42 мм','46 мм'],step:1500,colors:[['Чорний','#1f1f21'],['Сріблястий','#d6d7d9'],['Рожеве золото','#e8c1b0']],img:['1616353329366-b5546ca70b1a','1546868871-7041f2a55e12'],sp:{chip:'S11',screen:'Always-On Retina',cam:'—',video:'до 24 год',weight:'38 г',body:'Алюміній'},pop:8},
 {id:'awu',cat:'watch',n:'Apple Watch Ultra 3',d:'Титан, 3000 ніт, до 42 год автономності.',tag:'',base:36999,mem:['49 мм'],step:0,colors:[['Натуральний титан','#bdb6aa'],['Чорний титан','#2a2a2a']],img:['1713056878930-c5604da9acfd','1617043983671-adaadcaa2460'],sp:{chip:'S11',screen:'3000 ніт, широкий кут',cam:'—',video:'до 42 год',weight:'61 г',body:'Титан'},pop:7},
 {id:'app3',cat:'airpods',n:'AirPods Pro 3',d:'Шумозаглушення ×2 та пульсометр.',tag:'Новинка',base:10999,mem:['USB‑C'],step:0,colors:[['Білий','#f5f5f5']],img:['1572569511254-d8f925fe2cbb','1606841837239-c5a1a4a07af7'],sp:{chip:'H2',screen:'—',cam:'—',video:'до 8 год музики',weight:'5,6 г',body:'IP57'},pop:9},
 {id:'ap4',cat:'airpods',n:'AirPods 4',d:'Новий дизайн та просторове аудіо.',tag:'',base:6999,mem:['Стандарт','З ANC'],step:1500,colors:[['Білий','#f5f5f5']],img:['1606741965326-cb990ae01bb2','1587523459887-e669248cf666'],sp:{chip:'H2',screen:'—',cam:'—',video:'до 5 год музики',weight:'4,3 г',body:'IP54'},pop:7},
 {id:'avp',cat:'vision',n:'Apple Vision Pro',d:'Просторовий комп\'ютер.',tag:'',base:159999,mem:[256,512],step:9000,colors:[['Срібний','#c9c9cc']],img:['1696429175928-793a1cdef1d3','1707228773518-7ca0492d0c4d','1706990769341-d450bb0c52b7'],sp:{chip:'M5 + R1',screen:'2 × micro‑OLED, 23 млн пікселів',cam:'Стерео 3D',video:'до 2 год',weight:'600 г',body:'Алюміній, скло'},pop:5},
];
const CATS=[['all','Усе'],['iphone','iPhone'],['mac','Mac'],['ipad','iPad'],['watch','Watch'],['airpods','AirPods'],['vision','Vision']];
const SPEC_NAMES=[['chip','Чип'],['screen','Дисплей'],['cam','Камера'],['video','Автономність'],['weight','Вага'],['body','Корпус']];
const memLabel=m=>typeof m==='number'?(m>=1024?m/1024+' ТБ':m+' ГБ'):m;
const byId=id=>P.find(p=>p.id===id);
function card(p,i=0){return `<a class="card" href="product.html?id=${p.id}" style="animation-delay:${i*45}ms">${p.tag?`<span class="new"><b>${p.tag}</b></span>`:''}${ph(p.img[0],p.n)}<div class="bd"><div class="dots">${p.colors.map(c=>`<span class="dot" style="background:${c[1]}"></span>`).join('')}</div><h3>${p.n}</h3><p>${p.d}</p><div class="ft"><span class="price">від ${fmt(p.base)}<small>або ${fmt(Math.round(p.base/24))}/міс.</small></span><span class="link">Купити ›</span></div></div></a>`}

/* ===== Кошик ===== */
let bag=store.get('orchard-bag3',[]);const saveBag=()=>store.set('orchard-bag3',bag);
function lineTotal(x){const p=byId(x.id);return (p.base+p.step*x.m+(x.care?3999:0)-(x.trade||0))}
function addToBag(item,from){const key=[item.id,item.c,item.m,item.care,item.trade].join('-'),ex=bag.find(x=>x.key===key);ex?ex.q++:bag.push({...item,key,q:1});saveBag();drawBag();const p=byId(item.id);
  if(from){const r=from.getBoundingClientRect(),t=$('#bagBtn').getBoundingClientRect(),f=document.createElement('div');f.className='fly';f.innerHTML=`<img src="${U(p.img[0])}" alt="">`;f.style.left=r.left+r.width/2-28+'px';f.style.top=r.top+'px';document.body.appendChild(f);requestAnimationFrame(()=>requestAnimationFrame(()=>{f.style.left=t.left+'px';f.style.top=t.top+'px';f.style.transform='scale(.3)';f.style.opacity='.4'}));setTimeout(()=>f.remove(),850)}
  toast(`✓ ${p.n} у кошику`)}
function drawBag(){const n=bag.reduce((s,x)=>s+x.q,0);$('#bagC').textContent=n;$('#bagC').classList.toggle('show',n>0);let sum=0;
  $('#dl').innerHTML=bag.length?bag.map((x,i)=>{const p=byId(x.id),t=lineTotal(x);sum+=t*x.q;return `<div class="ci">${ph(p.img[0],p.n)}<div class="t"><b>${p.n}</b><span>${p.colors[x.c][0]} · ${memLabel(p.mem[x.m])}${x.care?' · AppleCare+':''}${x.trade?' · trade‑in':''}</span><div class="qty"><button data-d="${i}" aria-label="Менше">−</button>${x.q}<button data-u="${i}" aria-label="Більше">+</button></div></div><b>${fmt(t*x.q)}</b></div>`}).join(''):`<div class="empty">Кошик порожній.<br><br><a class="btn w sm" href="store.html">До магазину</a></div>`;
  $('#bagSum').textContent=fmt(sum);$('#bagTot').textContent=fmt(sum)}
function openBag(v){$('#drawer').classList.toggle('show',v);$('#ov').classList.toggle('show',v);document.body.style.overflow=v?'hidden':''}

/* ===== Шапка, футер ===== */
const PAGES=[['index.html','Головна'],['store.html','Магазин'],['store.html?cat=iphone','iPhone'],['store.html?cat=mac','Mac'],['compare.html','Порівняти'],['services.html','Trade‑in і ремонт']];
const ICO={bag:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M6 7h12l-1 13H7L6 7z"/><path d="M9 7a3 3 0 0 1 6 0"/></svg>',search:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"><circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/></svg>',menu:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"><path d="M4 8h16M4 16h16"/></svg>',x:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"><path d="M6 6l12 12M18 6L6 18"/></svg>'};
function layout(){
  const page=document.body.dataset.page,full=page+location.search;
  const nav=PAGES.map(([h,t])=>{const on=h.includes('?')?full===h:(h===page&&!(page==='store.html'&&location.search.includes('cat=')&&['iphone','mac'].includes(param('cat'))));return `<a href="${h}" class="${on?'on':''}">${t}</a>`}).join('');
  document.body.insertAdjacentHTML('afterbegin',`<header class="hdr"><div class="wrap">
    <a href="index.html" class="logo"><i></i>Orchard</a><nav class="nav">${nav}</nav><div class="sp"></div>
    <a class="ib" href="store.html#q" aria-label="Пошук">${ICO.search}</a>
    <button class="ib" id="bagBtn" aria-label="Кошик">${ICO.bag}<span class="c" id="bagC">0</span></button>
    <button class="ib burger" id="burger" aria-label="Меню">${ICO.menu}</button></div></header>
  <div class="mnav" id="mnav">${nav}</div>`);
  document.body.insertAdjacentHTML('beforeend',`<footer class="ftr"><div class="wrap">
    <div class="fcols"><div><b>Магазин</b><a href="store.html?cat=iphone">iPhone</a><a href="store.html?cat=mac">Mac</a><a href="store.html?cat=ipad">iPad</a><a href="store.html?cat=watch">Watch</a></div>
    <div><b>Допомога вибрати</b><a href="compare.html">Порівняти моделі</a><a href="services.html#trade">Trade‑in</a><a href="services.html#repair">Ремонт</a></div>
    <div><b>Orchard</b><a href="index.html">Про нас</a><a href="services.html#repair">Сервіс‑центр</a></div>
    <div><b>Київ</b><span>вул. Хрещатик, 22<br>щодня 10:00–21:00<br>0 800 123 456</span></div></div>
    <div class="fbot"><span>© 2026 Orchard · Демонстраційний проєкт для портфоліо. Не пов'язаний з Apple Inc.</span><span>Фото: <a href="https://unsplash.com" target="_blank" rel="noopener">Unsplash</a></span></div></div></footer>
  <div class="ov" id="ov"></div>
  <aside class="drawer" id="drawer" aria-label="Кошик"><div class="dh"><h3>Кошик</h3><button class="x" id="dx" aria-label="Закрити">✕</button></div><div class="dl" id="dl"></div>
    <div class="df"><div class="r"><span>Сума</span><span id="bagSum">0 ₴</span></div><div class="r"><span>Доставка</span><span style="color:var(--ok)">Безкоштовно</span></div><div class="r t"><span>Разом</span><span id="bagTot">0 ₴</span></div>
      <form id="bagForm" style="display:none;gap:8px;margin-top:6px"><input class="inp" id="bfName" required placeholder="Ваше ім'я" aria-label="Ім'я"><input class="inp" id="bfPhone" required type="tel" placeholder="+380 __ ___ __ __" aria-label="Телефон"></form>
      <button class="btn b" id="checkout">Оформити замовлення</button></div></aside>
  <div class="toast" id="toast" role="status"></div>`);
  const mn=$('#mnav'),bg=$('#burger');bg.onclick=()=>{const o=mn.classList.toggle('open');bg.innerHTML=o?ICO.x:ICO.menu;document.body.style.overflow=o?'hidden':''};
  $('#bagBtn').onclick=()=>openBag(true);$('#dx').onclick=$('#ov').onclick=()=>openBag(false);addEventListener('keydown',e=>e.key==='Escape'&&openBag(false));
  $('#dl').onclick=e=>{const u=e.target.dataset.u,d=e.target.dataset.d;if(u!=null)bag[u].q++;if(d!=null){bag[d].q--;if(!bag[d].q)bag.splice(d,1)}saveBag();drawBag()};
  $('#checkout').onclick=()=>{if(!bag.length)return toast('Кошик порожній');const f=$('#bagForm');if(f.style.display==='none'){f.style.display='grid';$('#checkout').textContent='Підтвердити';$('#bfName').focus();return}if(!f.reportValidity())return;f.reset();f.style.display='none';$('#checkout').textContent='Оформити замовлення';bag=[];saveBag();drawBag();openBag(false);toast('🎉 Замовлення прийнято! Менеджер зателефонує.')};
  drawBag();
}
let _tt;function toast(m){const t=$('#toast');t.textContent=m;t.classList.add('show');clearTimeout(_tt);_tt=setTimeout(()=>t.classList.remove('show'),2600)}
function hydrate(r=document){$$('.ph[data-img]',r).forEach(d=>{if(d.querySelector('img'))return;const i=new Image();i.alt='';i.loading='lazy';i.onload=()=>i.classList.add('ld');i.src=U(d.dataset.img);d.prepend(i)})}
const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}}),{threshold:.1});
function boot(){layout();hydrate();$$('.rv').forEach(el=>io.observe(el));
  if(window.Lenis&&!matchMedia('(prefers-reduced-motion: reduce)').matches){document.documentElement.style.scrollBehavior='auto';const l=new Lenis({duration:1.1});(function r(t){l.raf(t);requestAnimationFrame(r)})(performance.now());window.lenis=l}}
