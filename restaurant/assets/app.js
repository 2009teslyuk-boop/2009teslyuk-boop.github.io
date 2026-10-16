/* Luce — trattoria & cocktail bar · спільний код */
const $=(s,r=document)=>r.querySelector(s),$$=(s,r=document)=>[...r.querySelectorAll(s)];
const U=id=>`img/${id}.jpg`;
const ph=(id,alt='')=>`<div class="ph"><img src="${U(id)}" alt="${alt}" loading="lazy" onload="this.classList.add('ld')"></div>`;
const store={get(k,d){try{return JSON.parse(localStorage.getItem(k))??d}catch(e){return d}},set(k,v){try{localStorage.setItem(k,JSON.stringify(v))}catch(e){}}};
const fmt=n=>n.toLocaleString('uk-UA').replace(/,/g,' ')+' ₴';
const SHOP={phone:'+380 44 220 18 18',address:'Київ, вул. Ярославів Вал, 21',hours:'Щодня 11:00–00:00 · кухня до 23:00'};

/* ===== Категорії та опції ===== */
const CATS=[['pizza','Піца','з дров\'яної печі'],['pasta','Паста','свіжа, ручної роботи'],['mains','Різото й салати',''],['desserts','Десерти','готуємо щоранку'],['cocktails','Коктейлі','від нашого бару'],['soft','Безалкогольні',''],['wine','Вино',''],['coffee','Кава','']];
const OPTS={
 pizza:[{k:'size',t:'Розмір',one:1,v:[['30 см',0],['40 см',90]]},{k:'ex',t:'Добавки',v:[['Моцарела',35],['Пармезан',40],['Прошуто',60],['Гриби',35],['Халапеньйо',25]]}],
 pasta:[{k:'ex',t:'Добавки',v:[['Пармезан',40],['Трюфельна олія',55],['Курка',60]]}],
 mains:[{k:'ex',t:'Добавки',v:[['Пармезан',40],['Креветки',95]]}],
 desserts:[{k:'ex',t:'До десерту',v:[['Кулька морозива',45],['Ягоди',40]]}],
 cocktails:[{k:'str',t:'Міцність',one:1,v:[['Класика',0],['Подвійний',90],['Без алкоголю',-40]]}],
 soft:[{k:'size',t:'Обʼєм',one:1,v:[['0,4 л',0],['Глечик 1 л',140]]}],
 wine:[{k:'size',t:'Подача',one:1,v:[['Келих 150 мл',0],['Пляшка 0,75',560]]}],
 coffee:[{k:'milk',t:'Молоко',one:1,v:[['Звичайне',0],['Вівсяне',20],['Мигдальне',25]]}],
};
const MENU=[
 {id:'margherita',c:'pizza',n:'Маргарита',d:'Томати Сан-Марцано, моцарела фіор ді лате, базилік.',p:249,img:'1574071318508-1cdbab80d002',b:'Класика'},
 {id:'pepperoni',c:'pizza',n:'Пепероні',d:'Гостра салямі, моцарела, томатний соус.',p:289,img:'1613564834361-9436948817d1',b:'Хіт'},
 {id:'quattro',c:'pizza',n:'Чотири сири',d:'Моцарела, горгонзола, пармезан, таледжо.',p:319,img:'1593504049359-74330189a345'},
 {id:'diavola',c:'pizza',n:'Діавола',d:'Пікантна салямі, перець чилі, мед.',p:299,img:'1565299624946-b28f40a0ae38'},
 {id:'prosciutto',c:'pizza',n:'Прошуто й рукола',d:'Пармська шинка, рукола, пармезан.',p:339,img:'1513104890138-7c749659a591'},
 {id:'capricciosa',c:'pizza',n:'Капрічоза',d:'Шинка, печериці, артишоки, оливки.',p:309,img:'1600028068383-ea11a7a101f3'},
 {id:'truffle',c:'pizza',n:'Трюфельна',d:'Білий соус, гриби, трюфельний крем.',p:379,img:'1604382354936-07c5d9983bd3',b:'Шеф'},
 {id:'arrabbiata',c:'pasta',n:'Пенне арабʼята',d:'Томати, часник, чилі, петрушка.',p:219,img:'1621996346565-e3dbc646d9a9'},
 {id:'funghi',c:'pasta',n:'Тальятеле з грибами',d:'Білі гриби, вершки, пармезан.',p:259,img:'1611270629569-8b357cb88da9'},
 {id:'carbonara',c:'pasta',n:'Спагеті карбонара',d:'Гуанчале, жовток, пекоріно — без вершків.',p:249,img:'1556761223-4c4282c73f77',b:'Хіт'},
 {id:'bolognese',c:'pasta',n:'Болоньєзе',d:'Рагу з яловичини, що томиться 4 години.',p:239,img:'1608897013039-887f21d8c804'},
 {id:'risotto-funghi',c:'mains',n:'Різото з білими грибами',d:'Карнаролі, білі гриби, вершкове масло.',p:299,img:'1476124369491-e7addf5db371'},
 {id:'risotto-mare',c:'mains',n:'Різото з морепродуктами',d:'Креветки, мідії, кальмар, шафран.',p:389,img:'1609770424775-39ec362f2d94'},
 {id:'bowl',c:'mains',n:'Боул з кіноа',d:'Кіноа, авокадо, нут, печений гарбуз.',p:229,img:'1512621776951-a57141f2eefd'},
 {id:'chicken-salad',c:'mains',n:'Салат з куркою',d:'Курка гриль, мікс салатів, черрі, пармезан.',p:219,img:'1546069901-ba9599a7e63c'},
 {id:'tiramisu',c:'desserts',n:'Тірамісу',d:'Савоярді, маскарпоне, наш еспресо.',p:159,img:'1571877227200-a0d98ea607e9',b:'Хіт'},
 {id:'cheesecake',c:'desserts',n:'Баскський чізкейк',d:'Карамельна скоринка, ніжний центр.',p:149,img:'1524351199678-941a58a3df50'},
 {id:'berry-cheesecake',c:'desserts',n:'Чізкейк з ягодами',d:'Полуничний конфітюр, пісочна основа.',p:159,img:'1676300185983-d5f242babe34'},
 {id:'tart',c:'desserts',n:'Ягідний тарт',d:'Хрумке тісто, крем патісьєр, свіжі ягоди.',p:149,img:'1476887334197-56adbf254e1a'},
 {id:'aperol',c:'cocktails',n:'Aperol Spritz',d:'Апероль, просеко, содова, апельсин.',p:219,img:'1500217052183-bc01eee1a74e',b:'Хіт',taste:'bitter',mood:'light'},
 {id:'negroni',c:'cocktails',n:'Negroni',d:'Джин, кампарі, червоний вермут.',p:249,img:'1626688445658-c948f32d68ba',taste:'bitter',mood:'strong'},
 {id:'mojito',c:'cocktails',n:'Mojito',d:'Ром, лайм, мʼята, тростинний цукор.',p:199,img:'1653542772393-71ffa417b1c4',taste:'sour',mood:'light'},
 {id:'espresso-martini',c:'cocktails',n:'Espresso Martini',d:'Горілка, кавовий лікер, свіжий еспресо.',p:239,img:'1607687633950-c745bdb4da70',taste:'sweet',mood:'strong'},
 {id:'old-fashioned',c:'cocktails',n:'Old Fashioned',d:'Бурбон, біттер, апельсинова цедра.',p:259,img:'1514362545857-3bc16c4c7d1b',taste:'bitter',mood:'strong'},
 {id:'gin-tonic',c:'cocktails',n:'Gin & Tonic',d:'Джин, тонік, розмарин, грейпфрут.',p:209,img:'1609951651556-5334e2706168',taste:'sour',mood:'light'},
 {id:'blue-lagoon',c:'cocktails',n:'Blue Lagoon',d:'Горілка, блю кюрасао, лимонад.',p:199,img:'1551782450-3939704166fc',taste:'sweet',mood:'light'},
 {id:'lemonade',c:'soft',n:'Лимонад класичний',d:'Лимон, тростинний цукор, содова.',p:109,img:'1523677011781-c91d1bbe2f9e'},
 {id:'mint-lemonade',c:'soft',n:'Мʼятний лимонад',d:'Лайм, мʼята, мед.',p:109,img:'1623084921164-4a8c5c37a912'},
 {id:'citrus',c:'soft',n:'Цитрусовий фреш',d:'Апельсин, грейпфрут, лимон.',p:119,img:'1621263764928-df1444c5e859'},
 {id:'virgin-mojito',c:'soft',n:'Вірджин мохіто',d:'Лайм, мʼята, содова, без алкоголю.',p:129,img:'1546171753-97d7676e4602'},
 {id:'red',c:'wine',n:'Кʼянті Класіко',d:'Тоскана, санджовезе. Вишня, фіалка.',p:159,img:'1510812431401-41d2bd2722f3'},
 {id:'rose',c:'wine',n:'Розе Провансу',d:'Свіже, полуниця й персик.',p:149,img:'1547595628-c61a29f496f0'},
 {id:'cappuccino',c:'coffee',n:'Капучино',d:'Подвійний ристрето, мікропінка.',p:79,img:'1485808191679-5f86510681a2'},
 {id:'espresso',c:'coffee',n:'Еспресо',d:'Італійське обсмаження, 30 мл.',p:55,img:'1510591509098-f4fdc6d0ff04'},
];
const byId=id=>MENU.find(m=>m.id===id);
const ICO={cart:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M6 7h12l-1 13H7L6 7z"/><path d="M9 7a3 3 0 0 1 6 0"/></svg>',menu:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 8h16M4 16h16"/></svg>',x:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 6l12 12M18 6L6 18"/></svg>'};
function itemCard(m,i=0){return `<article class="item" data-open="${m.id}" tabindex="0" style="animation-delay:${i*40}ms">${m.b?`<span class="badge">${m.b}</span>`:''}${ph(m.img,m.n)}<div class="bd"><h3>${m.n}</h3><p>${m.d}</p><div class="ft"><span class="price">${m.p}<small>₴</small></span><button class="plus" data-quick="${m.id}" aria-label="Додати ${m.n}">+</button></div></div></article>`}

/* ===== Кошик ===== */
let cart=store.get('luce-cart',[]);const save=()=>store.set('luce-cart',cart);
function lineOf(m,sel){let price=m.p,parts=[];(OPTS[m.c]||[]).forEach(g=>{const s=sel[g.k];if(g.one){const v=g.v[s||0];price+=v[1];if(s)parts.push(v[0])}else (s||[]).forEach(i=>{price+=g.v[i][1];parts.push('+ '+g.v[i][0].toLowerCase())})});return {price,label:parts.join(', ')}}
function addLine(id,sel={},q=1){const m=byId(id),{price,label}=lineOf(m,sel),key=id+'|'+JSON.stringify(sel),ex=cart.find(x=>x.key===key);ex?ex.q+=q:cart.push({key,id,sel,q,price,label});save();drawCart();toast(`✓ ${m.n} — у замовленні`);const c=$('#cnt');c&&c.animate([{transform:'scale(1)'},{transform:'scale(1.5)'},{transform:'scale(1)'}],{duration:450})}
const cartSum=()=>cart.reduce((s,x)=>s+x.price*x.q,0);
function drawCart(){const n=cart.reduce((s,x)=>s+x.q,0);$('#cnt').textContent=n;
  $('#dl').innerHTML=cart.length?cart.map((x,i)=>{const m=byId(x.id);return `<div class="ci">${ph(m.img)}<div class="t"><b>${m.n}</b><span>${x.label||m.d.split(',')[0]} · ${fmt(x.price)}</span></div><div class="qty"><button data-d="${i}" aria-label="Менше">−</button><b>${x.q}</b><button data-u="${i}" aria-label="Більше">+</button></div></div>`}).join(''):`<div class="empty"><div style="font-family:var(--serif);font-style:italic;font-size:30px;color:var(--ink)">Поки порожньо</div><p style="margin:8px 0 18px">Почніть з піци або коктейлю.</p><a href="menu.html" class="btn g sm">До меню</a></div>`;
  $('#dsum').textContent=fmt(cartSum());$('#dgo').style.display=cart.length?'':'none'}
function openCart(v){$('#drawer').classList.toggle('show',v);$('#ov').classList.toggle('show',v||$('#modal').classList.contains('show'));document.body.style.overflow=v?'hidden':''}

/* ===== Вікно страви з опціями ===== */
let cur,sel,q;
function openItem(id){cur=byId(id);sel={};q=1;(OPTS[cur.c]||[]).forEach(g=>sel[g.k]=g.one?0:[]);
  $('#mph').innerHTML=`<img src="${U(cur.img)}" alt="${cur.n}" onload="this.classList.add('ld')">`;
  $('#mt').textContent=cur.n;$('#md').textContent=cur.d;
  $('#mopts').innerHTML=(OPTS[cur.c]||[]).map(g=>`<div class="og"><b>${g.t}${g.one?'':' · можна кілька'}</b><div class="opts">${g.v.map((v,i)=>`<button class="opt ${g.one&&i===0?'on':''}" data-g="${g.k}" data-i="${i}">${v[0]}${v[1]?`<small>${v[1]>0?'+':''}${v[1]} ₴</small>`:''}</button>`).join('')}</div></div>`).join('');
  updItem();$('#ov').classList.add('show');$('#modal').classList.add('show');document.body.style.overflow='hidden'}
function updItem(){const {price}=lineOf(cur,sel);$('#mq').textContent=q;$('#mp').textContent=fmt(price*q)}
function closeAll(){$('#modal').classList.remove('show');openCart(false);$('#ov').classList.remove('show');document.body.style.overflow=''}

/* ===== Шапка, футер ===== */
const PAGES=[['index.html','Головна'],['menu.html','Меню'],['bar.html','Бар'],['index.html#book','Столик']];
function layout(){
  const cur0=document.body.dataset.page;
  const nav=PAGES.map(([h,t])=>`<a href="${h}" class="${h===cur0?'on':''}">${t}</a>`).join('');
  document.body.insertAdjacentHTML('afterbegin',`<header class="hdr" id="hdr"><div class="wrap">
    <nav class="nav">${nav}</nav>
    <a href="index.html" class="logo">Luce<small>trattoria · bar</small></a>
    <div class="tools"><button class="cartbtn" id="openCart">${ICO.cart}<span class="lbl">Замовлення</span><span class="n" id="cnt">0</span></button><button class="burger" id="burger" aria-label="Меню">${ICO.menu}</button></div>
  </div></header><div class="mnav" id="mnav">${nav}</div>`);
  document.body.insertAdjacentHTML('beforeend',`<footer class="ftr"><div class="wrap">
    <div class="fcols">
      <div><h4>Luce</h4><span style="max-width:300px">Тратторія з дров'яною піччю та коктейль-бар у центрі Києва.</span></div>
      <div><h4>Меню</h4><a href="menu.html#pizza">Піца</a><a href="menu.html#pasta">Паста</a><a href="menu.html#desserts">Десерти</a><a href="bar.html">Коктейлі</a></div>
      <div><h4>Гостям</h4><a href="index.html#book">Забронювати стіл</a><a href="checkout.html">Оформити замовлення</a><a href="order.html">Статус замовлення</a></div>
      <div><h4>Контакти</h4><span>${SHOP.address}</span><span>${SHOP.phone}</span><span>${SHOP.hours}</span></div>
    </div>
    <div class="fword">Luce</div>
    <div class="fbot"><span>© 2026 Luce · Демонстраційний проєкт для портфоліо</span><span>Фото: <a href="https://unsplash.com" target="_blank" rel="noopener">Unsplash</a></span></div>
  </div></footer>
  <div class="ov" id="ov"></div>
  <div class="modal" id="modal" role="dialog" aria-modal="true" aria-labelledby="mt"><button class="x" id="mx" aria-label="Закрити">✕</button><div class="ph" id="mph"></div>
    <div class="mb"><h3 id="mt"></h3><p class="d" id="md"></p><div id="mopts" style="display:grid;gap:18px"></div>
      <div class="mft"><div class="qty"><button id="qm" aria-label="Менше">−</button><b id="mq">1</b><button id="qp" aria-label="Більше">+</button></div><button class="btn g" id="madd">Додати · <span id="mp"></span></button></div></div></div>
  <aside class="drawer" id="drawer" aria-label="Замовлення"><div class="dh"><h3>Ваше замовлення</h3><button class="x" id="cx" aria-label="Закрити">✕</button></div><div class="dl" id="dl"></div>
    <div class="df"><div class="tot"><span style="color:var(--muted)">Разом</span><b id="dsum">0 ₴</b></div><a href="checkout.html" class="btn t" id="dgo">Оформити замовлення</a></div></aside>
  <div class="toast" id="toast" role="status"></div>`);
  const mn=$('#mnav'),bg=$('#burger');bg.onclick=()=>{const o=mn.classList.toggle('open');bg.innerHTML=o?ICO.x:ICO.menu;document.body.style.overflow=o?'hidden':''};
  $$('#mnav a').forEach(a=>a.addEventListener('click',()=>{mn.classList.remove('open');document.body.style.overflow=''}));
  $('#openCart').onclick=()=>openCart(true);$('#cx').onclick=()=>openCart(false);$('#ov').onclick=closeAll;$('#mx').onclick=closeAll;
  addEventListener('keydown',e=>e.key==='Escape'&&closeAll());
  $('#dl').onclick=e=>{const u=e.target.dataset.u,d=e.target.dataset.d;if(u!=null)cart[u].q++;if(d!=null){cart[d].q--;if(!cart[d].q)cart.splice(d,1)}save();drawCart()};
  $('#mopts').onclick=e=>{const b=e.target.closest('.opt');if(!b)return;const g=(OPTS[cur.c]||[]).find(x=>x.k===b.dataset.g),i=+b.dataset.i;
    if(g.one){sel[g.k]=i;$$(`.opt[data-g="${g.k}"]`).forEach(x=>x.classList.toggle('on',x===b))}else{const a=sel[g.k];a.includes(i)?a.splice(a.indexOf(i),1):a.push(i);b.classList.toggle('on')}updItem()};
  $('#qm').onclick=()=>{q=Math.max(1,q-1);updItem()};$('#qp').onclick=()=>{q++;updItem()};
  $('#madd').onclick=()=>{addLine(cur.id,JSON.parse(JSON.stringify(sel)),q);closeAll()};
  addEventListener('scroll',()=>$('#hdr').classList.toggle('solid',scrollY>30),{passive:true});
  drawCart();
}
document.addEventListener('click',e=>{const b=e.target.closest('[data-quick]');if(b){e.preventDefault();e.stopPropagation();const m=byId(b.dataset.quick);const s={};(OPTS[m.c]||[]).forEach(g=>s[g.k]=g.one?0:[]);addLine(m.id,s,1);b.classList.add('ok');b.textContent='✓';setTimeout(()=>{b.classList.remove('ok');b.textContent='+'},1100);return}
  const o=e.target.closest('[data-open]');if(o)openItem(o.dataset.open)});
document.addEventListener('keydown',e=>{if(e.key==='Enter'&&e.target.dataset?.open)openItem(e.target.dataset.open)});

let _tt;function toast(m){const t=$('#toast');t.textContent=m;t.classList.add('show');clearTimeout(_tt);_tt=setTimeout(()=>t.classList.remove('show'),2400)}
function hydrate(r=document){$$('.ph[data-img]',r).forEach(d=>{if(d.querySelector('img'))return;const i=new Image();i.alt='';i.loading='lazy';i.onload=()=>i.classList.add('ld');i.src=U(d.dataset.img);d.prepend(i)})}
const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}}),{threshold:.1});
function boot(){layout();hydrate();$$('.rv').forEach(el=>io.observe(el));
  if(window.Lenis&&!matchMedia('(prefers-reduced-motion: reduce)').matches){document.documentElement.style.scrollBehavior='auto';const l=new Lenis({duration:1.1});(function r(t){l.raf(t);requestAnimationFrame(r)})(performance.now());window.lenis=l}}
const scrollToEl=(el,off=-100)=>{if(!el)return;window.lenis?window.lenis.scrollTo(el,{offset:off}):el.scrollIntoView({behavior:'smooth'})};
