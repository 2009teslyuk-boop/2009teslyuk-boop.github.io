/* Just Apple — спільний код (дизайн як у Orchard) */

/* ===== Контакти магазину: перевірте й за потреби виправте ===== */
const SHOP={instagram:'apple.ternopil',phone:'068 988 38 48',address:'Тернопіль (адресу уточнюйте)',mapQuery:'Just Apple Тернопіль',hours:'Щодня, без вихідних'};

const $=(s,r=document)=>r.querySelector(s),$$=(s,r=document)=>[...r.querySelectorAll(s)];
const fmt=n=>n.toLocaleString('uk-UA').replace(/,/g,' ')+' ₴';
const U=id=>`img/${id}.jpg`;
const ph=(id,alt='')=>`<div class="ph"><img src="${U(id)}" alt="${alt}" loading="lazy" onload="this.classList.add('ld')"></div>`;
const IG=`https://www.instagram.com/${SHOP.instagram}/`,DM=`https://ig.me/m/${SHOP.instagram}`;
const store={get(k,d){try{return JSON.parse(localStorage.getItem(k))??d}catch(e){return d}},set(k,v){try{localStorage.setItem(k,JSON.stringify(v))}catch(e){}}};
const param=k=>new URLSearchParams(location.search).get(k);

/* ===== Товари (ціни орієнтовні) =====
   cond: new / used; для б/у: bat — батарея %, st — стан */
const P=[
 {id:'ip18pm',cat:'iphone',cond:'new',n:'iPhone 18 Pro Max',d:'Найбільший дисплей, A20 Pro і камера з змінною діафрагмою.',tag:'Новинка',base:64999,mem:[256,512,1024,2048],step:8000,colors:[['Чорний','#1f1f22'],['Срібний','#d6d6d8'],['Глибокий синій','#2f3b55']],img:['1759588071814-f960ed8f7ee8','1759588071838-d560be56b2a2'],f:[['A20 Pro','чип'],['6,9″','ProMotion'],['48 Мп ×3','камери'],['до 39 год','відео']],pop:12},
 {id:'ip18p',cat:'iphone',cond:'new',n:'iPhone 18 Pro',d:'Компактний Pro з A20 Pro і новою системою камер.',tag:'Новинка',base:57999,mem:[256,512,1024],step:8000,colors:[['Космічний оранжевий','#d9773a'],['Срібний','#d6d6d8'],['Чорний','#1f1f22']],img:['1758327059164-396c3602b8f5','1678685888221-cda773a3dcdb'],f:[['A20 Pro','чип'],['6,3″','ProMotion'],['48 Мп ×3','камери'],['до 33 год','відео']],pop:11},
 {id:'ip18',cat:'iphone',cond:'new',n:'iPhone 18',d:'Чип A20, ProMotion 120 Гц і камера 48 Мп.',tag:'Новинка',base:42999,mem:[256,512],step:6000,colors:[['Білий','#ececec'],['Чорний','#2b2b2b'],['Блакитний','#b9d4ea']],img:['1695822822491-d92cee704368'],f:[['A20','чип'],['6,3″','120 Гц'],['48 Мп','Fusion'],['до 30 год','відео']],pop:10},
 {id:'ip17p',cat:'iphone',cond:'new',n:'iPhone 17 Pro',d:'Алюмінієвий unibody, A19 Pro, три камери 48 Мп.',tag:'',base:52999,mem:[256,512,1024],step:7000,colors:[['Космічний оранжевий','#d9773a'],['Глибокий синій','#2f3b55'],['Срібний','#d6d6d8']],img:['1757710436034-f1d7372ec1be','1764746250417-2cc103a45a56','1757709608566-4b9fd41a7af5'],f:[['A19 Pro','чип'],['6,3″','ProMotion'],['48 Мп ×3','камери'],['до 31 год','відео']],pop:9},
 {id:'ipair',cat:'iphone',cond:'new',n:'iPhone Air',d:'Найтонший iPhone в історії — 5,6 мм.',tag:'',base:45999,mem:[256,512],step:7000,colors:[['Срібний','#e3e3e5'],['Небесний','#b9d4ea'],['Чорний','#202020']],img:['1727013884184-b313982327f3','1759588073186-1d4ac7e33623'],f:[['5,6 мм','товщина'],['6,5″','ProMotion'],['A19 Pro','чип'],['165 г','вага']],pop:8},
 {id:'ip17',cat:'iphone',cond:'new',n:'iPhone 17',d:'ProMotion 120 Гц і чип A19.',tag:'',base:36999,mem:[256,512],step:6000,colors:[['Білий','#ececec'],['Лавандовий','#c7b8e6'],['Чорний','#2b2b2b']],img:['1591337676887-a217a6970a8a'],f:[['A19','чип'],['6,3″','120 Гц'],['48 Мп','Fusion'],['до 30 год','відео']],pop:7},
 {id:'u16p',cat:'iphone',cond:'used',n:'iPhone 16 Pro',d:'Без подряпин, носили в чохлі та зі склом. Повний комплект.',st:'Як новий',bat:91,base:36500,mem:[256],step:0,colors:[['Натуральний титан','#bdb6aa']],img:['1726587912121-ea21fcc57ff8'],f:[['91%','батарея'],['Як новий','стан'],['Повний','комплект'],['3 міс.','гарантія']],pop:9},
 {id:'u15pm',cat:'iphone',cond:'used',n:'iPhone 15 Pro Max',d:'Ледь помітні сліди на рамці, екран і камери ідеальні.',st:'Відмінний',bat:88,base:31900,mem:[256],step:0,colors:[['Сірий титан','#6b6b70']],img:['1592750475338-74b7b21085ab'],f:[['88%','батарея'],['Відмінний','стан'],['Телефон','+ кабель'],['3 міс.','гарантія']],pop:8},
 {id:'u15',cat:'iphone',cond:'used',n:'iPhone 15',d:'Dynamic Island, USB‑C і камера 48 Мп за розумну ціну.',st:'Відмінний',bat:90,base:19900,mem:[128],step:0,colors:[['Чорний','#262626']],img:['1709528922440-4fc4f05ef110'],f:[['90%','батарея'],['Відмінний','стан'],['Телефон','+ кабель'],['3 міс.','гарантія']],pop:7},
 {id:'u13',cat:'iphone',cond:'used',n:'iPhone 13',d:'Надійний варіант на кожен день, є легкі сліди використання.',st:'Хороший',bat:86,base:12900,mem:[128],step:0,colors:[['Північ','#2f3441']],img:['1702184117235-56002cb13663'],f:[['86%','батарея'],['Хороший','стан'],['Телефон','+ кабель'],['3 міс.','гарантія']],pop:6},
 {id:'mbp',cat:'mac',cond:'new',n:'MacBook Pro 14″ M5',d:'Liquid Retina XDR. До 24 год автономності.',tag:'Новинка',base:79999,mem:[512,1024,2048],step:12000,colors:[['Космічний чорний','#2e2e30'],['Сріблястий','#cfd0d2']],img:['1517336714731-489689fd1ca8','1629131726692-1accd0c53ce0'],f:[['M5','чип'],['14,2″','XDR'],['24 год','батарея'],['16 ГБ','пам\'ять']],pop:9},
 {id:'mba',cat:'mac',cond:'new',n:'MacBook Air 13″ M4',d:'Тонкий, легкий і безшумний.',tag:'',base:46999,mem:[256,512,1024],step:9000,colors:[['Сріблястий','#d4d5d7'],['Небесний','#a9c2d6'],['Північ','#2f3441']],img:['1611186871348-b1ce696e52c9'],f:[['M4','чип'],['13,6″','Retina'],['18 год','батарея'],['1,24 кг','вага']],pop:8},
 {id:'umba',cat:'mac',cond:'used',n:'MacBook Air 13″ M1',d:'Легенда M1 досі тягне навчання, роботу й фото.',st:'Відмінний',bat:87,base:21500,mem:[256],step:0,colors:[['Сірий космос','#6b6b70']],img:['1541807084-5c52b6b3adef'],f:[['87%','батарея'],['212','циклів'],['Відмінний','стан'],['3 міс.','гарантія']],pop:6},
 {id:'ipadpro',cat:'ipad',cond:'new',n:'iPad Pro M5',d:'Ультратонкий з дисплеєм Tandem OLED.',tag:'',base:49999,mem:[256,512,1024],step:9000,colors:[['Космічний чорний','#2b2b2d'],['Сріблястий','#d2d3d5']],img:['1630331528526-7d04c6eb463f','1561154464-82e9adf32764'],f:[['M5','чип'],['11″','OLED'],['5,3 мм','товщина'],['Pencil Pro','підтримка']],pop:7},
 {id:'ipadair',cat:'ipad',cond:'new',n:'iPad Air M3',d:'Потужність M3 у легкому корпусі.',tag:'',base:29999,mem:[128,256,512],step:5000,colors:[['Сірий','#8a8a8f'],['Фіолетовий','#b7a6cf'],['Синій','#90a9c5']],img:['1630453016513-bba65d503b06','1544244015-0df4b3ffc6b0'],f:[['M3','чип'],['11″','Liquid Retina'],['10 год','батарея'],['Touch ID','захист']],pop:7},
 {id:'awu',cat:'watch',cond:'new',n:'Apple Watch Ultra 3',d:'Титан, 3000 ніт, до 42 год автономності.',tag:'',base:36999,mem:['49 мм'],step:0,colors:[['Натуральний титан','#bdb6aa'],['Чорний титан','#2a2a2a']],img:['1713056878930-c5604da9acfd','1617043983671-adaadcaa2460'],f:[['49 мм','титан'],['42 год','батарея'],['3000 ніт','яскравість'],['100 м','водозахист']],pop:7},
 {id:'aw11',cat:'watch',cond:'new',n:'Apple Watch Series 11',d:'Моніторинг тиску та сну. 24 год роботи.',tag:'',base:18999,mem:['42 мм','46 мм'],step:1500,colors:[['Чорний','#1f1f21'],['Сріблястий','#d6d7d9']],img:['1616353329366-b5546ca70b1a'],f:[['S11','чип'],['24 год','батарея'],['ЕКГ','здоров\'я'],['50 м','водозахист']],pop:8},
 {id:'uaw9',cat:'watch',cond:'used',n:'Apple Watch Series 9',d:'Скло без подряпин, батарея тримає весь день.',st:'Відмінний',bat:93,base:9900,mem:['45 мм'],step:0,colors:[['Темна ніч','#1f1f21']],img:['1546868871-7041f2a55e12'],f:[['93%','батарея'],['Відмінний','стан'],['Ремінець','+ зарядка'],['3 міс.','гарантія']],pop:5},
 {id:'app3',cat:'airpods',cond:'new',n:'AirPods Pro 3',d:'Шумозаглушення ×2 та пульсометр.',tag:'',base:10999,mem:['USB‑C'],step:0,colors:[['Білий','#f5f5f5']],img:['1572569511254-d8f925fe2cbb','1606841837239-c5a1a4a07af7'],f:[['H2','чип'],['×2','шумодав'],['8 год','музика'],['IP57','захист']],pop:9},
 {id:'apmax',cat:'airpods',cond:'new',n:'AirPods Max',d:'Повнорозмірні з просторовим аудіо.',tag:'',base:21999,mem:['USB‑C'],step:0,colors:[['Рожевий','#f2c4c4'],['Сріблястий','#d6d7d9']],img:['1613040809024-b4ef7ba99bc3','1612116454817-2b0841e30eaf'],f:[['ANC','шумодав'],['20 год','музика'],['Spatial','аудіо'],['USB‑C','зарядка']],pop:6},
 {id:'ap4',cat:'airpods',cond:'new',n:'AirPods 4',d:'Новий дизайн і персоналізоване просторове аудіо.',tag:'',base:6999,mem:['Стандарт','З ANC'],step:1500,colors:[['Білий','#f5f5f5']],img:['1606741965326-cb990ae01bb2'],f:[['H2','чип'],['5 год','музика'],['USB‑C','кейс'],['IP54','захист']],pop:7},
];
const CATS=[['all','Усе'],['iphone','iPhone'],['mac','Mac'],['ipad','iPad'],['watch','Watch'],['airpods','AirPods']];
const CATIMG={iphone:'1759588071814-f960ed8f7ee8',mac:'1611186871348-b1ce696e52c9',ipad:'1630331528526-7d04c6eb463f',watch:'1546868871-7041f2a55e12',airpods:'1606841837239-c5a1a4a07af7'};
const memLabel=m=>typeof m==='number'?(m>=1024?m/1024+' ТБ':m+' ГБ'):m;
const tagHtml=p=>p.cond==='used'?`<span class="tag used">Б/у · ${p.st}</span><span class="tag bat">🔋 ${p.bat}%</span>`:(p.tag?`<span class="tag">${p.tag}</span>`:'');
function card(p,i=0){return `<article class="card" data-id="${p.id}" tabindex="0" style="animation-delay:${i*50}ms">${tagHtml(p)}${ph(p.img[0],p.n)}<div class="bd"><div class="dots">${p.colors.map(c=>`<span class="dot" style="background:${c[1]}"></span>`).join('')}</div><h4>${p.n}</h4><p class="desc">${p.d}</p><div class="bottom"><div class="price">${p.cond==='used'?'':'від '}${fmt(p.base)}<small>або ${fmt(Math.round(p.base/12))}/міс. · 12 платежів</small></div><button class="add" data-quick="${p.id}" aria-label="Додати в кошик">+</button></div></div></article>`}

/* ===== Шапка, футер, вікно товару, кошик ===== */
const PAGES=[['index.html','Головна'],['catalog.html','Каталог'],['catalog.html?cond=used','Б/у'],['trade-in.html','Обмін'],['repair.html','Ремонт'],['contacts.html','Контакти']];
function layout(){
  const cur=document.body.dataset.page,isUsed=param('cond')==='used';
  const links=PAGES.map(([h,t])=>{const on=h==='catalog.html?cond=used'?(cur==='catalog.html'&&isUsed):(h===cur&&!(h==='catalog.html'&&isUsed));return `<a href="${h}" class="${on?'on':''}">${t}</a>`}).join('');
  document.body.insertAdjacentHTML('afterbegin',`
  <div class="promo">Обмінюй старий iPhone на iPhone 18 зі знижкою до 36 000 ₴. <a href="trade-in.html">Оцінити зараз ›</a></div>
  <nav class="nav" id="nav"><div class="wrap">
    <a href="index.html" class="logo"><i>Just</i>Apple</a>
    <div class="links" id="links">${links}</div>
    <div class="sp"></div>
    <a class="dmnav" href="${DM}" target="_blank" rel="noopener"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/></svg><span>Direct</span></a>
    <a class="ibtn" href="catalog.html" aria-label="Пошук"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/></svg></a>
    <button class="ibtn" id="openCart" aria-label="Кошик"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"><path d="M6 7h12l-1 13H7L6 7z"/><path d="M9 7a3 3 0 0 1 6 0"/></svg><span class="badge" id="badge">0</span></button>
    <button class="ibtn burger" id="burger" aria-label="Меню"><svg width="20" height="20" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.8"><path d="M4 8h16M4 16h16"/></svg></button>
  </div></nav>`);
  document.body.insertAdjacentHTML('beforeend',`
  <footer><div class="wrap">
    <div class="fcols">
      <div><b>Магазин</b><a href="catalog.html?cat=iphone">iPhone</a><a href="catalog.html?cat=mac">Mac</a><a href="catalog.html?cat=ipad">iPad</a><a href="catalog.html?cat=watch">Watch</a><a href="catalog.html?cat=airpods">AirPods</a></div>
      <div><b>Послуги</b><a href="trade-in.html">Обмін (Trade‑in)</a><a href="repair.html">Ремонт</a><a href="catalog.html?cond=used">Б/у з гарантією</a></div>
      <div><b>Just Apple</b><a href="contacts.html">Контакти</a><a href="${IG}" target="_blank" rel="noopener">Instagram</a><a href="${DM}" target="_blank" rel="noopener">Написати в Direct</a></div>
      <div><b>Тернопіль</b><span>${SHOP.hours}<br>${SHOP.phone}<br>@${SHOP.instagram}</span></div>
    </div>
    <div class="fb"><span>© 2026 Just Apple · Тернопіль · Концепт сайту. Не пов'язаний з Apple Inc.</span><span>Фото: <a href="https://unsplash.com" target="_blank" rel="noopener">Unsplash</a></span></div>
  </div></footer>
  <div class="overlay" id="ov"></div>
  <div class="modal" id="modal" role="dialog" aria-modal="true" aria-labelledby="mTitle">
    <button class="x" id="mx" aria-label="Закрити">✕</button>
    <div class="m-gal"><div class="ph" id="mPic"></div><div class="m-thumbs" id="mThumbs"></div></div>
    <div class="m-body">
      <div style="font-size:13px;color:var(--orange);font-weight:600" id="mTag"></div>
      <h3 id="mTitle"></h3><p class="desc" id="mDesc"></p>
      <div class="feat" id="mFeat"></div>
      <div class="lbl">Колір — <span id="mColorName" style="text-transform:none;color:var(--ink);letter-spacing:0"></span></div>
      <div class="opts" id="mColors"></div>
      <div class="lbl" id="mMemL">Пам'ять</div><div class="opts" id="mMem"></div>
      <div class="m-total"><div><small style="color:var(--muted)">Ціна</small><br><b id="mPrice"></b></div><div style="display:flex;gap:8px;flex-wrap:wrap;justify-content:flex-end"><button class="btn" id="mBookBtn" style="box-shadow:inset 0 0 0 1px var(--line)">Забронювати</button><button class="btn p" id="mAdd">У кошик</button></div></div>
      <p style="font-size:13px;color:var(--muted);margin-top:12px" id="mMonthly"></p>
      <form class="m-book" id="mBook"><input id="mbName" required placeholder="Ваше ім'я" aria-label="Ім'я"><input id="mbPhone" required type="tel" placeholder="+380 __ ___ __ __" aria-label="Телефон"><button class="btn p">Відкласти для мене</button></form>
      <div class="m-ok" id="mOk"><b style="font-size:20px">✓ Заброньовано</b><p style="color:var(--muted);margin-top:6px">Менеджер зв'яжеться з вами найближчим часом.</p></div>
    </div>
  </div>
  <aside class="drawer" id="drawer">
    <div class="dr-h"><h3>Кошик</h3><button class="x" style="position:static" id="dx" aria-label="Закрити">✕</button></div>
    <div class="dr-list" id="drList"></div>
    <div class="dr-f">
      <div class="row"><span>Сума</span><span id="sSub">0 ₴</span></div>
      <div class="row"><span>Доставка Новою Поштою</span><span style="color:var(--ok)">Безкоштовно</span></div>
      <div class="row t"><span>Разом</span><span id="sTot">0 ₴</span></div>
      <form class="dr-form" id="drForm"><input id="dfName" required placeholder="Ваше ім'я" aria-label="Ім'я"><input id="dfPhone" required type="tel" placeholder="+380 __ ___ __ __" aria-label="Телефон"></form>
      <button class="btn p" id="checkout">Оформити замовлення</button>
    </div>
  </aside>
  <div class="toast" id="toast" role="status"></div>`);

  $('#burger').onclick=()=>$('#links').classList.toggle('open');
  $('#openCart').onclick=()=>{drawCart();$('#ov').classList.add('show');$('#drawer').classList.add('show')};
  $('#ov').onclick=closeAll;$('#mx').onclick=closeAll;$('#dx').onclick=closeAll;
  addEventListener('keydown',e=>e.key==='Escape'&&closeAll());
  $('#mThumbs').onclick=e=>{const b=e.target.closest('button');if(b)setPic(+b.dataset.i)};
  $('#mColors').onclick=e=>{const b=e.target.closest('.sw');if(!b)return;mc=+b.dataset.i;$$('#mColors .sw').forEach(x=>x.classList.toggle('on',x===b));updModal()};
  $('#mMem').onclick=e=>{const b=e.target.closest('.opt');if(!b)return;mm=+b.dataset.i;$$('#mMem .opt').forEach(x=>x.classList.toggle('on',x===b));updModal()};
  $('#mAdd').onclick=e=>{addToCart(mp,mc,mm,e.currentTarget);closeAll()};
  $('#mBookBtn').onclick=()=>{$('#mBook').classList.add('show');$('#mbName').focus()};
  $('#mBook').onsubmit=e=>{e.preventDefault();e.target.reset();e.target.classList.remove('show');$('#mOk').classList.add('show')};
  $('#drList').onclick=e=>{const u=e.target.dataset.u,d=e.target.dataset.d;if(u!=null)cart[u].q++;if(d!=null){cart[d].q--;if(!cart[d].q)cart.splice(d,1)}saveCart();drawCart()};
  $('#checkout').onclick=()=>{if(!cart.length)return toast('Кошик порожній');const f=$('#drForm');if(!f.classList.contains('show')){f.classList.add('show');$('#checkout').textContent='Підтвердити замовлення';$('#dfName').focus();return}if(!f.reportValidity())return;f.reset();f.classList.remove('show');$('#checkout').textContent='Оформити замовлення';cart=[];saveCart();drawCart();closeAll();toast('🎉 Замовлення прийнято! Менеджер зателефонує вам.')};
  drawCart();
}

/* вікно товару */
let mp,mc=0,mm=0;
function setPic(i){$('#mPic').innerHTML=`<img src="${U(mp.img[i])}" alt="${mp.n}" onload="this.classList.add('ld')">`;$$('#mThumbs button').forEach((b,k)=>b.classList.toggle('on',k===i))}
function openModal(id){mp=P.find(p=>p.id===id);if(!mp)return;mc=0;mm=0;
  $('#mTag').textContent=mp.cond==='used'?`Б/у · ${mp.st} · батарея ${mp.bat}% · гарантія 3 міс.`:mp.tag;
  $('#mTitle').textContent=mp.n;$('#mDesc').textContent=mp.d;
  $('#mThumbs').innerHTML=mp.img.length>1?mp.img.map((s,i)=>`<button data-i="${i}" aria-label="Фото ${i+1}"><img src="${U(s)}" alt=""></button>`).join(''):'';
  $('#mFeat').innerHTML=mp.f.map(f=>`<div><b>${f[0]}</b>${f[1]}</div>`).join('');
  $('#mColors').innerHTML=mp.colors.map((c,i)=>`<button class="sw ${i?'':'on'}" data-i="${i}" style="background:${c[1]}" title="${c[0]}" aria-label="${c[0]}"></button>`).join('');
  $('#mMemL').textContent=typeof mp.mem[0]==='number'?"Пам'ять":'Варіант';
  $('#mMem').innerHTML=mp.mem.map((m,i)=>`<button class="opt ${i?'':'on'}" data-i="${i}">${memLabel(m)}${i&&mp.step?`<br><small style="color:var(--muted)">+${fmt(mp.step*i)}</small>`:''}</button>`).join('');
  $('#mBook').classList.remove('show');$('#mOk').classList.remove('show');
  setPic(0);updModal();$('#ov').classList.add('show');$('#modal').classList.add('show');document.body.style.overflow='hidden';
}
function updModal(){const pr=mp.base+mp.step*mm;$('#mColorName').textContent=mp.colors[mc][0];$('#mPrice').textContent=fmt(pr);$('#mMonthly').textContent=`або ${fmt(Math.round(pr/12))}/міс. у розстрочку на 12 платежів`}
function closeAll(){['#ov','#modal','#drawer'].forEach(s=>$(s)&&$(s).classList.remove('show'));document.body.style.overflow=''}

/* кошик (спільний для всіх сторінок) */
let cart=store.get('ja-cart',[]);const saveCart=()=>store.set('ja-cart',cart);
function addToCart(p,c,m,from){const key=p.id+'-'+c+'-'+m,ex=cart.find(x=>x.key===key);ex?ex.q++:cart.push({key,id:p.id,c,m,q:1});saveCart();drawCart();
  if(from){const r=from.getBoundingClientRect(),t=$('#openCart').getBoundingClientRect(),f=document.createElement('div');f.className='fly';f.innerHTML=`<img src="${U(p.img[0])}" alt="">`;f.style.left=r.left+'px';f.style.top=r.top+'px';document.body.appendChild(f);requestAnimationFrame(()=>requestAnimationFrame(()=>{f.style.left=t.left+'px';f.style.top=t.top+'px';f.style.transform='scale(.3)';f.style.opacity='.5'}));setTimeout(()=>f.remove(),850)}
  toast(`✓ ${p.n} додано в кошик`)}
function drawCart(){const n=cart.reduce((s,x)=>s+x.q,0);$('#badge').textContent=n;$('#badge').classList.toggle('show',n>0);let sum=0;
  $('#drList').innerHTML=cart.length?cart.map((x,i)=>{const p=P.find(y=>y.id===x.id);if(!p)return'';const pr=p.base+p.step*x.m;sum+=pr*x.q;return`<div class="ci">${ph(p.img[0],p.n)}<div class="info"><b>${p.n}</b><span>${p.colors[x.c][0]} · ${memLabel(p.mem[x.m])}</span><div class="qty"><button data-d="${i}" aria-label="Менше">−</button>${x.q}<button data-u="${i}" aria-label="Більше">+</button></div></div><b>${fmt(pr*x.q)}</b></div>`}).join(''):`<div class="empty">Кошик порожній.<br><br><a class="btn p" href="catalog.html">До каталогу</a></div>`;
  $('#sSub').textContent=fmt(sum);$('#sTot').textContent=fmt(sum)}

/* кліки по картках на будь-якій сторінці */
document.addEventListener('click',e=>{const q=e.target.closest('[data-quick]');if(q){e.preventDefault();e.stopPropagation();addToCart(P.find(x=>x.id===q.dataset.quick),0,0,q);return}const c=e.target.closest('.card');if(c)openModal(c.dataset.id)});
document.addEventListener('keydown',e=>{if(e.key==='Enter'&&e.target.classList?.contains('card'))openModal(e.target.dataset.id)});

/* дрібниці */
let _tt;function toast(m){const t=$('#toast');t.textContent=m;t.classList.add('show');clearTimeout(_tt);_tt=setTimeout(()=>t.classList.remove('show'),2600)}
function hydrate(root=document){$$('.ph[data-img]',root).forEach(d=>{if(d.querySelector('img'))return;const i=new Image();i.alt='';i.loading='lazy';i.onload=()=>i.classList.add('ld');i.src=U(d.dataset.img);d.prepend(i)})}
const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}}),{threshold:.1});
const reveal=(r=document)=>$$('.reveal:not(.in)',r).forEach(el=>io.observe(el));
function boot(){layout();hydrate();reveal();$$('.q button').forEach(b=>b.onclick=()=>b.parentElement.classList.toggle('open'));
  if(document.body.dataset.page==='index.html'){const h=$('.hero'),nt=()=>$('#nav').classList.toggle('dark',scrollY<h.offsetTop+h.offsetHeight-60);addEventListener('scroll',nt,{passive:true});nt()}
  if(window.Lenis&&!matchMedia('(prefers-reduced-motion: reduce)').matches){document.documentElement.style.scrollBehavior='auto';const l=new Lenis({duration:1.1});(function r(t){l.raf(t);requestAnimationFrame(r)})(performance.now());window.lenis=l}
  const o=param('open');if(o)openModal(o)}
