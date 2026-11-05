// НП+ Active: прототип экрана с каруселью покупок (1:1 по макетам Figma).
// Разметка — index.html, стили — src/style.css, картинки — public/img.
import "./style.css";
import "@fontsource/montserrat/400.css";
import "@fontsource/montserrat/500.css";
import "@fontsource/montserrat/600.css";
import "@fontsource/montserrat/700.css";
import "@fontsource/golos-text/400.css";
import "@fontsource/golos-text/500.css";
import "@fontsource/golos-text/600.css";
import "@fontsource/golos-text/700.css";

const IMG = import.meta.env.BASE_URL + "img/";
const A = {
  notch:IMG + "notch.webp", check24:IMG + "check24.webp", check16:IMG + "check16c.webp", check16b:IMG + "check16c2.webp", flash16:IMG + "flash16.webp", chat20:IMG + "chat20w.webp", chat16:IMG + "chat16o.webp",
  picA:IMG + "pic_a.webp", picB:IMG + "pic_b.webp", picC:IMG + "pic_c.webp", inf:IMG + "infinity.webp", stetho:IMG + "stetho.webp", hand:IMG + "handshake.webp",
  crown20:IMG + "crown20.webp", crownPill:IMG + "crown_pill.webp", info:IMG + "circle_info.webp", infoG:IMG + "circle_info_g.webp", infoR:IMG + "circle_info_r.webp", arrowW:IMG + "arrow16w.webp", arrowV:IMG + "arrow16v.webp", file16:IMG + "file16.webp",
  crown16p:IMG + "crown16p.svg", crownArt:IMG + "crown_prem.webp", pfFlash:IMG + "pf_flash.svg", pfDoctor:IMG + "pf_doctor.svg", pfHistory:IMG + "pf_history.svg",
  upFlash:IMG + "up_flash.svg", upClock:IMG + "up_clock.svg", upHeart:IMG + "up_heart.svg", upHistory:IMG + "up_history.svg", upChat:IMG + "up_chat.svg", upStetho:IMG + "up_stetho.svg", prClock:IMG + "pr_clock.svg", prHeart:IMG + "pr_heart.svg", turn20:IMG + "turn20.svg",
  tlFast:IMG + "tl_fast.webp", tlFav:IMG + "tl_fav.webp", tlChat:IMG + "tl_chat.webp", tlChoose:IMG + "tl_choose.webp",
  docphoto:IMG + "docphoto.webp", dot4:IMG + "dot4.webp", star:IMG + "star16.webp", doc24:IMG + "doc24.webp", chat24:IMG + "chat24.webp", chev24c:IMG + "chev24c.webp", chev24b:IMG + "chev24b.webp",
  dProfile:IMG + "draft_profile.svg", dDoctor:IMG + "draft_doctor.svg", dClock:IMG + "draft_clock.svg", chatY:IMG + "chat24y.webp", chevY:IMG + "chev24t.webp",
  tdown:IMG + "thumbs_down.webp", tup:IMG + "thumbs_up.webp", plus:IMG + "faq_plus1.webp", minus:IMG + "faq_minus.webp",
  sp:{ter:IMG + "sp_ter.webp",gyn:IMG + "sp_gyn.webp",endo:IMG + "sp_endo.webp",gynendo:IMG + "sp_gynendo.webp",cardio:IMG + "sp_cardio.webp",derm:IMG + "sp_derm.webp",tricho:IMG + "sp_tricho.webp",cosm:IMG + "sp_cosm.webp",neuro:IMG + "sp_neuro.webp",rehab:IMG + "sp_rehab.webp",uro:IMG + "sp_uro.webp",vener:IMG + "sp_vener.webp"},
  sy:{lor:IMG + "sy_lor.webp",head:IMG + "sy_head.webp",back:IMG + "sy_back.webp",pressure:IMG + "sy_pressure.webp",acne:IMG + "sy_acne.webp",stomach:IMG + "sy_stomach.webp",female:IMG + "sy_female.webp",anxiety:IMG + "sy_anxiety.webp",weight:IMG + "sy_weight.webp",eyes:IMG + "sy_eyes.webp",sleep:IMG + "sy_sleep.webp",hair:IMG + "sy_hair.webp"}
};
const $ = s => document.querySelector(s);
const esc = s => String(s).replace(/[&<>"]/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));

/* ---------- состояние ---------- */
const S = {rkv:true, n:2, auto:false, cons:false, sub:true, prem:false, tab:"sub", full:false, slow:false, act:false, drf:false, nopills:false, tuck:true};
const NO_STATES = {slow:false, act:false, drf:false, nopills:false};
let activeFrame = null;

/* ---------- данные ---------- */
const DOCS = [
  {name:"Саймовская Инна Владимировна", pics:["picA","picB"], tags:[["Дерматолог",1],["Взрослый",0]], pred:"g", predText:"Ответит через 15-30 мин"},
  {name:"Климова Регина Наилевна", pics:["picA","picB","picC"], tags:[["Дерматовенеролог",1],["Дерматовенеролог",1],["Взрослый",0]], pred:"w", predText:"Врач будет на смене завтра <br>с 08:00 до 12:00"},
  {name:"Саймовская Инна Владимировна", pics:["picA","picB"], tags:[["Дерматолог",1],["Взрослый",0]], pred:"g", predText:"Ответит через 15-30 мин"}
];

// РКВ с врачом из блока «Активная консультация» уже использована: её карточку не показываем (ТЗ)
const ACTIVE_DOC = "Саймовская Инна Владимировна";
const rkvLeft = () => S.rkv ? DOCS.slice(0,S.n).filter(d => !(S.act && d.name === ACTIVE_DOC)) : [];
function rkvCard(d, w, red){
  const pics = d.pics.map(k => `<img src="${A[k]}" alt="">`).join("");
  const tags = d.tags.map(([t,f]) => `<span class="dtag${f?" f":""}">${esc(t)}</span>`).join("");
  return `<div class="card" style="width:${w}px">
    <div class="c-body">
      <div class="paid"><img src="${A.check16}" alt="">Консультация оплачена</div>
      <div class="c-body">
        <div class="h18">Консультация с выбранным врачом</div>
        <div class="rkv-in">
          <div class="doc"><div class="pic">${pics}</div><div class="doc-i"><p class="doc-n">${esc(d.name)}</p><div class="dtags${d.tags.length<3?" fit":""}">${tags}</div></div></div>
          <div class="pred ${d.pred}"><img src="${d.pred==="g"?A.flash16:A.chat16}" alt=""><p>${d.predText}</p></div>
          <div class="note-r"><img src="${A.infoR}" alt=""><p>Начните консультацию сейчас, чтобы врач смог подключиться в указанное время.</p></div>
        </div>
      </div>
    </div>
    <button class="btn tap" data-toast="Откроется чат с врачом: ${esc(d.name.split(" ").slice(0,2).join(" "))}"><img src="${A.chat20}" alt="">Начать консультацию</button>
  </div>`;
}
function consCard(c){
  return `<div class="card">
    <div class="c-body">
      <div class="paid"><img src="${A.check16}" alt="">Оплачен 1 консилиум</div>
      <div class="h18" style="width:225px">Разберем ваш случай<br>с командой врачей</div>
      <div class="steps">
        <div class="stp"><span class="num">1</span><div class="stp-t"><b>Расскажите о ситуации</b><span>В чате опишите, что вас беспокоит, и добавьте медицинские документы.</span></div></div>
        <div class="stp"><span class="num">2</span><div class="stp-t"><b>Мы подберём команду врачей</b><span>Либо вы самостоятельно сможете выбрать врачей.</span></div></div>
        <div class="stp"><span class="num"><img src="${A.file16}" alt=""></span><div class="stp-t"><b>Вы получите общее заключение</b><span>В нём будет совместное мнение врачей по вашему случаю.</span></div></div>
      </div>
    </div>
    <button class="btn tap" data-toast="Откроется чат консилиума"><img src="${A.chat20}" alt="">Начать консилиум</button>
  </div>`;
}
function autoCard(){
  return `<div class="card">
    <div class="c-body">
      <div class="paid"><img src="${A.check16}" alt="">Оплачена 1 консультация</div>
      <div class="c-body" style="gap:4px">
        <div class="h18" style="width:225px">Консультация<br>с автоподбором врача</div>
        <p class="t13">Расскажите, что вас беспокоит.<br>Мы подберём подходящего врача<br>и специальность по симптомам.</p>
      </div>
    </div>
    <button class="btn tap" data-toast="Откроется чат, врача подберём автоматически"><img src="${A.chat20}" alt="">Начать консультацию</button>
  </div>`;
}
function upsellAuto(){
  return `<div class="upsell"><div class="t16s">Хотите выбрать врача сами?</div><p>Доплатите к уже оплаченной консультации.<br>Сумму покажем у каждого врача.</p>
    <button class="link-v tap" data-toast="Откроется витрина врачей с доплатой">Выбрать врача с доплатой<img src="${A.arrowV}" alt=""></button></div>`;
}
// тексты подписки из ТЗ: одинаковые для одной покупки и для карусели
const TX_SUB = "Обращайтесь по поводу себя, детей,<br>родителей и любимых без ограничений.";
function subCard(prem){
  if(prem) return `<div class="card">
    <div class="c-body">
      <div class="paid prem"><img src="${A.crown16p}" alt="">${S.aroff ? "Премиум активен до 03.11.2026" : "Премиум подписка активна"}</div>
      <div class="c-body" style="gap:4px">
        <div class="h18">Безлимитные консультации<br>на 1 месяц с Премиум</div>
        <p class="t13">${TX_SUB}</p>
      </div>
    </div>
    <div class="pf"><p class="t13m">Ваши Премиум-функции:</p>
      <div><img src="${A.upStetho}" alt="">Выбор врача перед консультацией</div>
      <div><img src="${A.prClock}" alt="">Выбор времени подключения врача,<br>если он не на смене</div>
      <div><img src="${A.prHeart}" alt="">Возобновление чата с тем же врачом</div>
      <div><img src="${A.upChat}" alt="">Дополнительные 5 быстрых чатов</div>
    </div>
    <button class="btn tap" data-toast="Откроется чат по подписке с Премиумом"><img src="${A.chat20}" alt="">Начать консультацию</button>
  </div>`;
  return `<div class="card">
    <div class="c-body">
      <div class="paid"><img src="${A.check16}" alt="">${S.aroff ? "Подписка активна до 03.11.2026" : "Подписка активна"}</div>
      <div class="c-body" style="gap:4px">
        <div class="h18 sub-t">Безлимитные консультации<br>на 1 месяц</div>
        <p class="t13">${TX_SUB}</p>
      </div>
    </div>
    <button class="btn tap" data-toast="Откроется чат по подписке"><img src="${A.chat20}" alt="">Начать консультацию</button>
  </div>`;
}
function premUpsell(){
  const items = [[A.upFlash,"Врачи будут отвечать в 2 раза быстрее"],[A.upClock,"Выбирайте время консультаций сами"],[A.upHeart,"Можно возобновлять чаты с теми<br>же докторами"],[A.upHistory,"Дополнительные 5 чатов без замедления"]];
  return `<div class="upsell">
    <div class="prm-h"><div class="t16s">Выбирайте, кто будет вашим</div><div class="t16s" style="display:flex;gap:4px">врачом, с<span class="crown"><img src="${A.crown20}" alt="">Премиум</span></div>
      <p class="t13m">А еще с Премиум:</p></div>
    <div class="ben ol">${items.map(([i,t])=>`<div><img src="${i}" alt="">${t}</div>`).join("")}</div>
    <button class="link-v tap" id="buyPrem" data-toast="Откроется подключение Премиума">Подключить Премиум за 990 ₽/мес<img src="${A.arrowV}" alt=""></button>
  </div>`;
}
// полоса «Автопродление выключено» выглядывает из-под карточки подписки сверху
function arStrip(){
  return `<div class="ar-strip" role="switch" aria-checked="false" tabindex="0" data-aron><span class="lbl"><img src="${A.turn20}" alt="">Автопродление выключено</span><span class="sw2" aria-hidden="true"></span></div>`;
}

/* ---------- тексты витрин специальностей и заболеваний: по продукту с наивысшим приоритетом (ТЗ) ---------- */
// подписка (с Премиумом или без) → РКВ → РК с автоподбором → консилиум; от открытого слайда карусели не зависят
function showcaseKind(){ return S.sub ? "sub" : rkvLeft().length ? "rkv" : S.auto ? "auto" : S.cons ? "cons" : "sub"; }
const SPEC_LEAD = {
  auto:"Вы подключили тариф с автоподбором врача. Если хотите выбрать доктора сами, можно доплатить.",
  sub:"Вы подключили тариф с автоподбором врача. Выбор конкретного доктора доступен только с Премиум.",
  prem:"Начните консультацию, чтобы выбрать конкретного врача. Эта функция доступна только с Премиум.",
  rkv:"Выберите специальность и врача. Её нужно оплатить отдельно — цена указана за каждого врача.",
  cons:"Вы можете выбрать врача самостоятельно либо довериться нашему выбору"
};
function setKind(k){
  const kk = k==="sub" && S.prem ? "prem" : k;
  $("#specLead").textContent = SPEC_LEAD[kk] || SPEC_LEAD.sub;
  // в Figma у РКВ другие заголовки блоков специальностей и симптомов, а у симптомов нет подзаголовка
  const rkv = kk === "rkv";
  $("#specTitle").innerHTML = rkv ? "Нужна еще одна консультация?" : "Вам доступны<br>25 специальностей";
  $("#sympTitle").innerHTML = rkv ? "С чем помогают наши<br>врачи онлайн" : "С чем часто помогают наши<br>врачи онлайн";
  $("#sympLead").hidden = rkv;
  $("#buy").classList.toggle("auto", kk==="auto");
  // в варианте «плашкой под карточкой» у блока покупок нет градиента ни на одном слайде
  $("#buy").classList.toggle("plain", S.tuck);
}

/* ---------- рендер верхнего блока ---------- */
let rkvIdx = 0, carIdx = 0;
function render(keepScroll){
  if(!S.sub) S.prem = false;
  // подписка «съедает» разовую с автоподбором: вместе их не бывает
  if(S.sub) S.auto = false;
  $("#pills").hidden = true;
  $("#slow").hidden = !S.slow;
  $("#active").hidden = !S.act;
  $("#drafts").hidden = !S.drf;
  $("#tabs").hidden = true;
  $("#tabs").innerHTML = "";

  // все покупки в одной карусели: консилиум → РКВ → автоподбор или подписка
  const sl = [];
  if(S.cons) sl.push(["cons", consCard(true)]);
  rkvLeft().forEach(d => sl.push(["rkv", rkvCard(d, 343)]));
  if(S.auto) sl.push(["auto", autoCard()]);
  if(S.sub) sl.push(["sub", subCard(S.prem)]);
  if(!sl.length){
    $("#topContent").innerHTML = S.rkv && S.act ? `<div class="empty">Единственная РКВ уже используется в активной консультации, других покупок нет. Добавьте РКВ или другую покупку в панели слева.</div>` : `<div class="empty">Нет активных покупок. Такого состояния в макетах нет: отметьте покупку в панели слева.</div>`;
    setKind(showcaseKind()); syncPanel(); updStick(); return;
  }
  carIdx = Math.min(carIdx, sl.length-1);
  const multi = sl.length > 1;
  // текст под карточкой (апселл) — часть слайда, листается вместе с карточкой
  const under = k => k==="auto" ? upsellAuto() : k==="sub" && !S.prem ? premUpsell() : "";
  const over = k => k==="sub" && S.aroff ? arStrip() : "";
  let h = multi ? `<div class="car cc" id="ccCar">${sl.map(x=>`<div class="slide">${over(x[0])}${x[1]}${under(x[0])}</div>`).join("")}</div>` : over(sl[0][0]) + sl[0][1] + under(sl[0][0]);
  if(multi) h += `<div class="dots" id="ccDots">${sl.map((_,i)=>`<button aria-label="Карточка ${i+1}" aria-current="${i===carIdx}"></button>`).join("")}</div>`;
  $("#topContent").innerHTML = h;
  $("#topContent").classList.toggle("tuck", S.tuck);
  lockBtns();
  const kinds = sl.map(x=>x[0]);
  setKind(showcaseKind());
  const car = $("#ccCar");
  if(car){
    const fit = i => { car.style.height = car.children[i].offsetHeight + "px"; };
    bindCarousel(car, $("#ccDots"), carIdx, i => { carIdx = i; fit(i); updStick(); });
    fit(carIdx);
    // во время свайпа высота только растёт до большего из двух соседних слайдов,
    // чтобы текст под карточкой не обрезался; точная высота — когда свайп закончился
    const step = car.children.length > 1 ? car.children[1].offsetLeft - car.children[0].offsetLeft : 1;
    car.addEventListener("scroll", () => {
      const f = car.scrollLeft / step, a = Math.floor(f), b = Math.min(Math.ceil(f), car.children.length-1);
      const need = Math.max(car.children[a].offsetHeight, car.children[b].offsetHeight);
      if(need > car.offsetHeight) car.style.height = need + "px";
    }, {passive:true});
  }
  syncPanel(); updStick();
}

function lockBtns(){
  if(!S.act) return;
  document.querySelectorAll("#topContent .btn").forEach(b => { b.classList.add("lock"); b.disabled = true; b.removeAttribute("data-toast"); b.textContent = "Идёт другая консультация"; });
}

/* ---------- липкая кнопка ---------- */
function updStick(){
  const sc = $("#scroller"), st = $("#stick");
  const btns = [...document.querySelectorAll("#topContent .btn")];
  const top = sc.getBoundingClientRect().top;
  const on = !S.full && !S.act && btns.length > 0 && btns.every(b => b.getBoundingClientRect().bottom < top);
  st.classList.toggle("on", on);
  // подписка + РК считается одним вариантом: РК списывается первой
  const ways = (S.cons?1:0) + rkvLeft().length + (S.auto && !S.sub ? 1 : 0) + (S.sub?1:0);
  st.dataset.toast = ways > 1 ? "Откроется выбор: какую покупку использовать для консультации" : "Откроется новый чат с врачом";
  st.tabIndex = on ? 0 : -1; st.setAttribute("aria-hidden", !on);
}
$("#scroller").addEventListener("scroll", updStick, {passive:true});

/* ---------- карусели ---------- */
function bindCarousel(car, dots, startIdx, onChange){
  if(!car) return;
  const items = [...car.children];
  const btns = dots ? [...dots.children] : [];
  const pos = i => Math.min(items[i].offsetLeft - parseFloat(getComputedStyle(car).paddingLeft), car.scrollWidth - car.clientWidth);
  const setDot = i => btns.forEach((b,j)=>b.setAttribute("aria-current", j===i));
  const cur = () => { const x = car.scrollLeft; let best=0,bd=1e9; items.forEach((_,i)=>{const d=Math.abs(pos(i)-x); if(d<bd){bd=d;best=i}}); return best; };
  // точки обновляем сразу, а высоту и блок под каруселью — только когда свайп закончился,
  // иначе на телефоне раскладка меняется посреди жеста и карточка дёргается
  let touching = false, settleT;
  const settle = () => { clearTimeout(settleT); if(onChange) settleT = setTimeout(() => { if(!touching) onChange(cur()); }, 120); };
  car.addEventListener("scroll", () => { const i = cur(); setDot(i); if(car.id==="rkvCar") rkvIdx = i; settle(); }, {passive:true});
  car.addEventListener("touchstart", () => { touching = true; clearTimeout(settleT); }, {passive:true});
  car.addEventListener("touchend", () => { touching = false; settle(); }, {passive:true});
  car.addEventListener("touchcancel", () => { touching = false; settle(); }, {passive:true});
  btns.forEach((b,i) => b.addEventListener("click", () => car.scrollTo({left:pos(i), behavior:"smooth"})));
  // перетаскивание мышью
  let down=false, sx=0, sl=0, moved=false;
  car.addEventListener("pointerdown", e => { if(e.pointerType!=="mouse") return; down=true; moved=false; sx=e.clientX; sl=car.scrollLeft; car.style.scrollSnapType="none"; });
  window.addEventListener("pointermove", e => { if(!down) return; const dx=e.clientX-sx; if(Math.abs(dx)>4) moved=true; car.scrollLeft = sl - dx; });
  window.addEventListener("pointerup", () => { if(!down) return; down=false; const i=cur(); car.style.scrollSnapType=""; car.scrollTo({left:pos(i), behavior:"smooth"}); });
  car.addEventListener("click", e => { if(moved){ e.stopPropagation(); e.preventDefault(); moved=false; } }, true);
  car.addEventListener("wheel", e => { if(Math.abs(e.deltaY) > Math.abs(e.deltaX) && !e.shiftKey) return; }, {passive:true});
  if(startIdx){ car.style.scrollBehavior="auto"; car.scrollLeft = pos(Math.min(startIdx, items.length-1)); setDot(Math.min(startIdx, items.length-1)); }
}

/* ---------- нижние блоки ---------- */
const SPEC = [
  ["Терапевт","ter",-0.43,null,78.885,90.496,{rot:-19.69,iw:56.641,ih:75.846,top:-14.83}],
  ["Гинеколог","gyn",0.1,0.11,49.452,66.22],
  ["Эндокрино-лог","endo",0.78,-0.62,60.307,80.755],
  ["Гинеколог-эндокринолог","gynendo",0.01,-0.29,68.27,91.418,{lw:92}],
  ["Кардиолог","cardio",0.36,1.12,52.461,70.248],
  ["Дерматолог","derm",0.33,-0.11,49.917,47.777,{crop:true}],
  ["Трихолог","tricho",0.12,1.8,48.989,65.6],
  ["Врач-косметолог","cosm",-0.31,-0.43,51.628,69.133],
  ["Невролог","neuro",0.17,-0.43,62.092,83.145],
  ["Реабили-толог","rehab",0.38,0.14,48.008,64.285],
  ["Уролог","uro",-0.11,-0.47,60.531,81.055],
  ["Венеролог","vener",-0.37,-0.14,65.516,87.73]
];
function specTile([label,k,dx,dy,w,h,o]){
  o = o || {};
  let inner;
  if(o.rot){
    inner = `<div class="ib" style="left:calc(50% + ${dx}px);top:${o.top}px;width:${w}px;height:${h}px;transform:translateX(-50%)"><img src="${A.sp[k]}" alt="" style="width:${o.iw}px;height:${o.ih}px;flex:none;transform:rotate(${o.rot}deg)"></div>`;
  } else if(o.crop){
    inner = `<div class="ib" style="left:calc(50% + ${dx}px);top:calc(50% + ${dy}px);width:${w}px;height:${h}px;transform:translate(-50%,-50%);overflow:hidden"><img src="${A.sp[k]}" alt="" style="position:absolute;left:0;top:-20.32%;width:100%;height:139.9%"></div>`;
  } else {
    inner = `<div class="ib" style="left:calc(50% + ${dx}px);top:calc(50% + ${dy}px);width:${w}px;height:${h}px;transform:translate(-50%,-50%)"><img src="${A.sp[k]}" alt=""></div>`;
  }
  return `<button class="g-it tap" data-toast="Откроются врачи: ${esc(label.replace("-",""))}"><div class="tile">${inner}</div><p class="g-l" ${o.lw?`style="width:${o.lw}px"`:""}>${esc(label)}</p></button>`;
}
const SYMP = [
  ["Ухо, горло, нос, кашель","lor","left:50%;top:50%;width:52.936px;height:52.936px;transform:translate(-50%,-50%)"],
  ["Головная боль","head","left:calc(50% + .5px);top:-12.4px;width:58.842px;height:78.793px;transform:translateX(-50%)"],
  ["Боли в спине и шее","back","left:50%;top:50%;width:58.591px;height:58.591px;transform:translate(-50%,-50%)"],
  ["Давление<br>и пульс","pressure","left:calc(50% + .43px);top:50%;width:58.591px;height:58.591px;transform:translate(-50%,-50%)",92],
  ["Прыщи, сыпь, зуд кожи","acne","left:-1.64px;top:-1.49px;width:57.521px;height:57.521px"],
  ["Боли в животе, вздутие","stomach","left:50%;top:calc(50% + .14px);width:60.865px;height:60.865px;transform:translate(-50%,-50%)"],
  ["Женский цикл и выделения","female","left:0;top:0;width:54px;height:54px"],
  ["Тревожность, нервозность, стресс","anxiety","left:calc(50% - .57px);top:-3.38px;width:61.969px;height:61.969px;transform:translateX(-50%)"],
  ["Вес и обмен веществ","weight","left:50%;top:calc(50% - 2.24px);width:65.86px;height:65.86px;transform:translate(-50%,-50%)"],
  ["Воспаление глаз","eyes","left:3.51px;top:50%;width:45.895px;height:45.895px;transform:translateY(-50%)"],
  ["Нарушение сна","sleep","left:50%;top:50%;width:62.65px;height:62.65px;transform:translate(-50%,-50%)"],
  ["Выпадение волос","hair","left:calc(50% + .5px);top:50%;width:48.989px;height:65.6px;transform:translate(-50%,-50%)"]
];
function sympTile([label,k,st,lw]){
  return `<button class="g-it tap" data-toast="Откроются врачи по симптому"><div class="tile"><div class="sym"><div style="${st}"><img src="${A.sy[k]}" alt=""></div></div></div><p class="g-l" ${lw?`style="width:${lw}px"`:""}>${label}</p></button>`;
}
function rows(arr, fn){ let h=""; for(let i=0;i<arr.length;i+=4) h += `<div class="g-row">${arr.slice(i,i+4).map(fn).join("")}</div>`; return h; }
$("#specGrid").innerHTML = rows(SPEC, specTile);
$("#sympGrid").innerHTML = rows(SYMP, sympTile);

const HIST = [
  ["23 сентября 2026, 16:20","Жалобы по здоровью, симптомы","Сыпь, покраснение кожи",false],
  ["18 сентября 2026, 11:05","Жалобы по здоровью, симптомы","Зуд и шелушение кожи головы",false],
  ["2 сентября 2026, 19:40","Расшифровка анализов","Общий анализ крови",false],
  ["27 августа 2026, 09:15","Жалобы по здоровью, симптомы","Покраснение и отёк века",false],
  ["14 августа 2026, 21:30","Второе мнение","Схема лечения дерматита",false],
  ["1 августа 2026, 13:50","Жалобы по здоровью, симптомы","Сыпь у ребёнка после прогулки",false],
  ["20 июля 2026, 08:45","Подбор лечения","Акне, уход за кожей",false],
  ["9 июля 2026, 17:10","Жалобы по здоровью, симптомы","Пигментное пятно на плече",false],
  ["25 июня 2026, 12:00","Расшифровка анализов","Анализ на аллергены",false],
  ["11 июня 2026, 15:25","Жалобы по здоровью, симптомы","Крапивница после лекарства",false]
];
$("#hist").innerHTML = HIST.map(([d,t,x,prep],i) => `<div class="bonus">
  <div class="hc">
    <div class="hc-top">
      <div class="hc-h"><p class="d">${d} </p><div class="tt"><b>${t}</b><span>${x}</span></div></div>
      <div class="hdoc"><div class="hdoc-l"><img src="${A.docphoto}" alt=""><div class="hdoc-n"><b>Тартина Анна Анатольевна</b><div class="hdoc-s">Дерматовенеролог<img src="${A.dot4}" alt=""><img src="${A.star}" alt="">4.9 (51)</div></div></div><img class="chev" src="${A.chev24b}" alt=""></div>
    </div>
    <div>
      <div class="li h57"><div class="li-r"><span class="ic"><img src="${A.doc24}" alt="" style="inset:0;width:100%;height:100%"></span><span class="li-t">Медзаключение</span>${prep?`<span class="st-tag">Готовится</span>`:`<span class="st-tag ok">Готово</span>`}</div><div class="li-d"></div></div>
      <div class="li h57"><div class="li-r"><span class="ic"><img src="${A.chat24}" alt="" style="inset:0;width:100%;height:100%"></span><span class="li-t">История чата</span><img class="chev" src="${A.chev24c}" alt=""></div></div>
    </div>
    <button class="btn btn-re tap" data-toast="Откроется новое обращение к этому врачу">Обратиться повторно</button>
  </div>
</div>`).join("");
$("#histDots").innerHTML = HIST.map((_,i)=>`<button aria-label="Обращение ${i+1}" aria-current="${i===0}"></button>`).join("");
bindCarousel($("#hist"), $("#histDots"), 0);
bindCarousel($("#medcards"), null, 0);

/* ---------- черновики ---------- */
const DRAFTS = [0, 1];
$("#drfCar").innerHTML = DRAFTS.map(() => `<div class="drf">
  <div class="drf-top">
    <p class="drf-d">21 апр 2022, 04:20 <img src="${A.dot4}" alt=""><span>Хранится ещё 7 дней</span></p>
    <div class="drf-tt"><b>Жалобы по здоровью, симптомы</b><span>Сыпь на коже, зуд кожи, высыпания на теле</span></div>
  </div>
  <div>
    <div class="drf-li"><div class="drf-r"><img src="${A.dProfile}" alt=""><span class="t"><b>Пациент</b></span><span class="drf-tag">Анастасия, 40 лет</span></div><div class="drf-dv"></div></div>
    <div class="drf-li"><div class="drf-r"><img src="${A.dDoctor}" alt=""><span class="t"><b>Специальность</b></span><span class="drf-tag">Дерматолог</span></div><div class="drf-dv"></div></div>
    <div class="drf-li last"><div class="drf-r"><img src="${A.dClock}" alt=""><span class="t"><b>Ожидание врача</b><span>Сейчас нет очереди</span></span><span class="drf-tag g">15-30 мин</span></div></div>
  </div>
  <button class="drf-b tap" data-toast="Откроется чат по черновику"><img src="${A.chatY}" alt="">Начать чат<img class="chv" src="${A.chevY}" alt=""></button>
</div>`).join("");
$("#drfDots").innerHTML = DRAFTS.map((_,i)=>`<button aria-label="Черновик ${i+1}" aria-current="${i===0}"></button>`).join("");
bindCarousel($("#drfCar"), $("#drfDots"), 0);


const FAQ_ANS = "В большинстве случаев — да. Приема по видеосвязи точно хватит, если нужно рассказать терапевту о симптомах, получить от него направление на анализы, посоветоваться с педиатром, аллергологом, неврологом, гастроэнтерологом или другим узким специалистом. Еще телемедицина выручает, обратиться к врачу, которого нет в вашем городе. А сейчас, во время эпидемии, сервис используют еще и для того, чтобы оперативно отвечать на любые вопросы о вирусах.";
const FAQ = ["Все члены семьи могут пользоваться моей подпиской без ограничений?","Сколько консультаций входит в подписку?","С какими заболеваниями могут обращаться взрослые?","С какими заболеваниями НП+ может помочь детям?","По какому графику работают врачи?"];
$("#faq").innerHTML = FAQ.map((q,i)=>`<div class="li"><button class="li-r" aria-expanded="false" aria-controls="faq${i}"><span class="li-t">${q}</span><img src="${A.plus}" alt=""></button><div class="ans" id="faq${i}" hidden>${FAQ_ANS}</div><div class="li-d"></div></div>`).join("");
$("#faq").addEventListener("click", e => {
  const b = e.target.closest(".li-r"); if(!b) return;
  const open = b.getAttribute("aria-expanded") !== "true";
  b.setAttribute("aria-expanded", open); b.querySelector("img").src = open ? A.minus : A.plus;
  document.getElementById(b.getAttribute("aria-controls")).hidden = !open;
});

/* ---------- тосты и клики внутри экрана ---------- */
let tt;
function toast(msg){ const t=$("#toast"); t.textContent=msg; t.classList.add("on"); clearTimeout(tt); tt=setTimeout(()=>t.classList.remove("on"),1800); }
$(".screen").addEventListener("click", e => {
  const tab = e.target.closest("[data-tab]");
  if(tab){ S.tab = tab.dataset.tab; activeFrame=null; render(); return; }
  if(e.target.closest("#buyPrem")){ S.prem = true; S.sub = true; activeFrame=null; render(); toast("Премиум подключён"); return; }
  const chip = e.target.closest("[data-chips] .chip");
  if(chip){ chip.parentElement.querySelectorAll(".chip").forEach(c=>c.setAttribute("aria-pressed", c===chip)); return; }
  if(e.target.closest("[data-aron]")){ S.aroff = false; render(true); toast("Автопродление включено"); return; }
  const fb = e.target.closest("[data-fb]");
  if(fb){ const on = fb.getAttribute("aria-pressed")!=="true"; fb.parentElement.querySelectorAll(".fb-b").forEach(c=>c.setAttribute("aria-pressed", false)); fb.setAttribute("aria-pressed", on); if(on) toast("Спасибо за оценку"); return; }
  if(e.target.closest("[data-top]")){ $("#scroller").scrollTo({top:0,behavior:"smooth"}); if(S.full) $("#phone").scrollIntoView({behavior:"smooth"}); return; }
  const t = e.target.closest("[data-toast]");
  if(t) toast(t.dataset.toast);
});

/* ---------- панель ---------- */
const ids = {rkv:"#o-rkv", auto:"#o-auto", cons:"#o-cons", sub:"#o-sub", prem:"#o-prem"};
const sids = {slow:"#o-slow", act:"#o-act", drf:"#o-drf"};
function syncPanel(){
  for(const k in ids) $(ids[k]).checked = !!S[k];
  for(const k in sids) $(sids[k]).checked = !!S[k];
  $("#rkv-n").textContent = S.n;
  $("#o-auto").disabled = S.sub;
  $("#auto-sm").textContent = S.sub ? "Входит в подписку, отдельно не показываем" : "Врача подбираем мы";
  $("#rkv-dec").disabled = !S.rkv || S.n<=1;
  $("#rkv-inc").disabled = !S.rkv || S.n>=3;
  document.querySelectorAll("[data-frame]").forEach(b => b.setAttribute("aria-pressed", b.dataset.frame===activeFrame));
  const parts = [];
  if(S.rkv) parts.push(S.n>1 ? `${S.n} РКВ` : "РКВ");
  if(S.auto) parts.push("автоматическая");
  if(S.cons) parts.push("консилиум");
  if(S.sub) parts.push(S.prem ? "подписка с Премиумом" : "подписка");
  $("#cap").textContent = activeFrame ? `Фрейм Figma ${activeFrame.replace("-",":")}` : (parts.length ? "Сборка: " + parts.join(" + ") : "Нет покупок");
  const hasOnce = S.rkv||S.auto||S.cons;
  const nCards = rkvLeft().length + [S.auto,S.cons,S.sub].filter(Boolean).length;
  $("#rule-note").textContent = (nCards > 1
    ? "Все покупки в одной карусели. Текст под карточкой листается вместе с ней, а тексты витрин берутся по приоритету: подписка → РКВ → РК с автоподбором → консилиум, от открытого слайда не зависят."
    : (hasOnce || S.sub ? "Одна покупка: карточка без карусели." : ""))
    + (S.sub ? " Подписка включает консультации с автоподбором, поэтому отдельная разовая с автоподбором вместе с ней не показывается." : "");
}
for(const k in ids){
  $(ids[k]).addEventListener("change", e => {
    S[k] = e.target.checked;
    if(k==="prem" && S.prem) S.sub = true;
    if((k==="sub" || k==="prem") && S.sub) S.auto = false;
    if(k==="sub" && !S.sub) S.prem = false;
    if(k==="sub" || k==="prem"){ if(S.sub && (S.rkv||S.auto||S.cons) && e.target.checked) S.tab = "sub"; }
    if(["rkv","auto","cons"].includes(k) && e.target.checked) S.tab = "once";
    activeFrame = null; rkvIdx = 0; carIdx = 0; S.nopills = false; render();
  });
}
for(const k in sids){
  $(sids[k]).addEventListener("change", e => { S[k] = e.target.checked; activeFrame = null; render(); });
}
$("#rkv-dec").addEventListener("click", e => { e.preventDefault(); e.stopPropagation(); if(S.n>1){S.n--; rkvIdx=0; activeFrame=null; S.nopills=false; render();} });
$("#rkv-inc").addEventListener("click", e => { e.preventDefault(); e.stopPropagation(); if(S.n<3){S.n++; activeFrame=null; S.nopills=false; render();} });


function setView(full){
  S.full = full; $("#phone").classList.toggle("full", full); updStick();
  $("#v-phone").setAttribute("aria-pressed", !full); $("#v-full").setAttribute("aria-pressed", full);
}
$("#v-phone").addEventListener("click", ()=>setView(false));
$("#v-full").addEventListener("click", ()=>setView(true));

/* масштаб телефона: в узкой рамке (до 500 px) экран тянется на всю ширину без рамки телефона */
const NARROW = window.matchMedia("(max-width:500px)");
function fit(){
  const narrow = NARROW.matches;
  document.documentElement.classList.toggle("narrow", narrow);
  if(narrow && S.full) setView(false);
  const z = narrow ? window.innerWidth / 375 : Math.min(1, (Math.min(document.querySelector(".stage").parentElement.clientWidth, window.innerWidth) - 32) / 399);
  document.documentElement.style.setProperty("--z", z.toFixed(4));
}
const sheet = open => { document.documentElement.classList.toggle("sheet-open", open); $("#panelBtn").setAttribute("aria-expanded", open); };
$("#panelBtn").addEventListener("click", () => sheet(true));
$("#panelClose").addEventListener("click", () => sheet(false));
$("#backdrop").addEventListener("click", () => sheet(false));
document.addEventListener("keydown", e => { if(e.key === "Escape") sheet(false); });
window.addEventListener("resize", fit); fit();

render();
