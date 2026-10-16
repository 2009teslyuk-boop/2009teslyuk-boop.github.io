/* Бритва · barbershop — спільний код */
const $=(s,r=document)=>r.querySelector(s),$$=(s,r=document)=>[...r.querySelectorAll(s)];
const U=id=>`img/${id}.jpg`;
const ph=(id,alt='',cls='')=>`<div class="ph ${cls}"><img src="${U(id)}" alt="${alt}" loading="lazy" onload="this.classList.add('ld')"></div>`;
const store={get(k,d){try{return JSON.parse(localStorage.getItem(k))??d}catch(e){return d}},set(k,v){try{localStorage.setItem(k,JSON.stringify(v))}catch(e){}}};
const SHOP={phone:'+380 93 777 11 22',address:'Львів, вул. Шевська, 8',hours:'Щодня 09:00–21:00',insta:'britva.barbershop'};

/* послуги: [id, назва, опис, хвилин, ціна (рівень «Барбер»), фото] */
const SERVICES=[
 ['cut','Чоловіча стрижка','Консультація, миття голови, стрижка ножицями й машинкою, укладка.',60,600,'1647140655214-e4a2d914971f'],
 ['fade','Fade / skin fade','Плавний перехід від нуля. Найпопулярніше у нас.',60,650,'1593702275687-f8b402bf1fb5'],
 ['combo','Стрижка + борода','Повний образ за одне відвідування. Гарячий рушник у подарунок.',90,950,'1630827020718-3433092696e7'],
 ['beard','Моделювання бороди','Форма, контур небезпечною бритвою, догляд олією.',40,450,'1599011176306-4a96f1516d4d'],
 ['shave','Королівське гоління','Гарячі рушники, піна з помазка, небезпечна бритва.',45,550,'1517832606299-7ae9b720a186'],
 ['kids','Дитяча стрижка','Для хлопців до 12 років. Мультики й льодяник гарантовані.',40,450,'1567894340315-735d7c361db0'],
 ['design','Дизайн / візерунок','Лінії та малюнки машинкою. Додається до стрижки.',20,250,'1568339434343-2a640a1a9946'],
 ['dad','Батько + син','Дві стрижки поруч в одному кріслі за часом.',100,950,'1635273051839-003bf06a8751'],
];
/* майстри: [id, ім'я, рівень, коефіцієнт ціни, досвід, фото, спеціалізація] */
const MASTERS=[
 ['artem','Артем','Арт-директор',1.5,'11 років','1599351431202-1e0f0137899a','Класичні стрижки, гоління'],
 ['denys','Денис','Топ-барбер',1.25,'7 років','1605497788044-5a32c7078486','Fade, текстурні стрижки'],
 ['ihor','Ігор','Топ-барбер',1.25,'6 років','1761839256791-6a93f89fb8b0','Бороди, кучеряве волосся'],
 ['max','Макс','Барбер',1,'3 роки','1657105052497-f996284ffff8','Сучасні стрижки, дизайн'],
];
const WORKS=['1630827020718-3433092696e7','1629189784191-9afdcbcb0398','1618049049816-43a00d5b0c3d','1562004760-aceed7bb0fe3','1593702275687-f8b402bf1fb5','1568339434343-2a640a1a9946','1567894340315-735d7c361db0','1647140655214-e4a2d914971f'];
const svc=id=>SERVICES.find(s=>s[0]===id),mst=id=>MASTERS.find(m=>m[0]===id);
const priceFor=(s,m)=>Math.round(s[4]*(m?m[3]:1)/10)*10;

const ICO={menu:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M4 8h16M4 16h16"/></svg>',x:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M6 6l12 12M18 6L6 18"/></svg>',razor:'<svg viewBox="0 0 16 40" fill="none" stroke="#c9a26b" stroke-width="1.4"><rect x="4" y="1" width="8" height="18" rx="1"/><path d="M8 19v20M5 26h6M5 31h6"/></svg>'};
const PAGES=[['index.html','Головна'],['services.html','Послуги'],['masters.html','Майстри'],['booking.html','Запис']];
function layout(){
  const cur=document.body.dataset.page,nav=PAGES.map(([h,t])=>`<a href="${h}" class="${h===cur?'on':''}">${t}</a>`).join('');
  document.body.insertAdjacentHTML('afterbegin',`<header class="hdr" id="hdr"><div class="wrap">
    <a href="index.html" class="logo" aria-label="Бритва — головна">${ICO.razor}<span>Бритва<small>barbershop · est. 2018</small></span></a>
    <nav class="nav">${nav}</nav><div class="sp"></div>
    <a href="booking.html" class="btn b sm">Записатися</a>
    <button class="burger" id="burger" aria-label="Меню">${ICO.menu}</button>
  </div></header><div class="mnav" id="mnav">${nav}</div>`);
  document.body.insertAdjacentHTML('beforeend',`<footer class="ftr"><div class="wrap">
    <div class="fcols">
      <div><h4>Бритва</h4><span style="max-width:300px">Барбершоп у центрі Львова. Кава, віскі й розмови без поспіху.</span></div>
      <div><h4>Послуги</h4><a href="services.html">Стрижки</a><a href="services.html#beard">Бороди й гоління</a><a href="services.html#gift">Подарункові сертифікати</a></div>
      <div><h4>Барбершоп</h4><a href="masters.html">Майстри</a><a href="booking.html">Онлайн-запис</a></div>
      <div><h4>Контакти</h4><span>${SHOP.address}</span><span>${SHOP.phone}</span><span>${SHOP.hours}</span></div>
    </div>
    <div class="fword">Бритва</div>
    <div class="fbot"><span>© 2026 Бритва · Демонстраційний проєкт для портфоліо</span><span>Фото: <a href="https://unsplash.com" target="_blank" rel="noopener">Unsplash</a></span></div>
  </div></footer><div class="toast" id="toast" role="status"></div>`);
  const mn=$('#mnav'),bg=$('#burger');bg.onclick=()=>{const o=mn.classList.toggle('open');bg.innerHTML=o?ICO.x:ICO.menu;document.body.style.overflow=o?'hidden':''};
  addEventListener('scroll',()=>$('#hdr').classList.toggle('solid',scrollY>40),{passive:true});
}
let _tt;function toast(m){const t=$('#toast');t.textContent=m;t.classList.add('show');clearTimeout(_tt);_tt=setTimeout(()=>t.classList.remove('show'),2600)}
function hydrate(r=document){$$('.ph[data-img]',r).forEach(d=>{if(d.querySelector('img'))return;const i=new Image();i.alt='';i.loading='lazy';i.onload=()=>i.classList.add('ld');i.src=U(d.dataset.img);d.prepend(i)})}
const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}}),{threshold:.1});
function boot(){layout();hydrate();$$('.rv').forEach(el=>io.observe(el));
  if(window.Lenis&&!matchMedia('(prefers-reduced-motion: reduce)').matches){document.documentElement.style.scrollBehavior='auto';const l=new Lenis({duration:1.15});(function r(t){l.raf(t);requestAnimationFrame(r)})(performance.now());window.lenis=l}}
const scrollToEl=(el,off=-100)=>{if(!el)return;window.lenis?window.lenis.scrollTo(el,{offset:off}):el.scrollIntoView({behavior:'smooth'})};
