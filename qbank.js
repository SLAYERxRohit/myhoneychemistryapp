/* Question Bank + Study Resources. Routes: #qbank[/chNN], #resources. Saves: S.qb {imp,done}, S.res (links added on the site).
   Exact material lives in js/qb-exact.js (shown verbatim). Starter questions are assembled from the project's own chapter data. */
window.QB_INIT=C=>{
const {t,esc,CH,V,NAV,$}=C,S=()=>C.S(),T=(a,b)=>C.lang()==='en'?b:a;
Object.assign(C.TR.ru,{qbank:'Вопросы',resources:'Материалы'});Object.assign(C.TR.en,{qbank:'Questions',resources:'Resources'});
const hs=s=>{let h=5381;for(const ch of String(s))h=(h*33^ch.codePointAt(0))>>>0;return h.toString(36)},st=()=>S().qb||={imp:{},done:{}};
const chap=id=>CH.find(c=>c.id===id),cn=c=>T(c.t.ru,c.t.en);
const DL={easy:['Лёгкий','Easy'],medium:['Средний','Medium'],hard:['Сложный','Hard']},dl=d=>DL[d]?T(...DL[d]):'';
const CAT={fm:['Формулы','Formulas'],mist:['Частые ошибки','Common mistakes'],rx:['Реакции','Reactions'],gen:['Общие','General']};
/* ---------- build ---------- */
let ALL=null;
const tk=x=>x==null||x===''?'gen':typeof x==='number'?'t'+x:/^\d+$/.test(String(x))?'t'+x:'x:'+x;
const mk=(c,m,k,d,q,a,ex)=>({id:'q'+hs(c.id+m+q),c,m,k,d:d||'',q:String(q),a:String(a),ex:!!ex});
const build=()=>{ALL=[];const seen=new Set,add=o=>{if(!seen.has(o.id)){seen.add(o.id);ALL.push(o)}};
CH.forEach(c=>{const r=c.rev||{};
(window.QB_EXACT||[]).filter(x=>x.ch===c.id&&[2,3,5].includes(x.marks)).forEach(x=>add(mk(c,x.marks,tk(x.topic),x.difficulty,x.q,x.a,1)));
/* 2-mark: short-answer items from the chapter bank, round-robin over topics */
const g={};(c.q||[]).filter(q=>q.type==='fill'||q.type==='num').forEach(q=>(g[q.tp]||=[]).push(q));const ks=Object.keys(g);let n=0;
for(let i=0;n<12&&ks.some(k=>g[k][i]);i++)ks.forEach(k=>{const q=g[k][i];if(q&&n<12){n++;add(mk(c,2,'t'+k.split('-t')[1],q.d,q.q,String(q.a)+(q.ex?'\n'+q.ex:'')))}});
/* 3-mark: formulas, mistakes, reactions (text taken unchanged from the chapter's revision data) */
(r.fm||[]).forEach(x=>add(mk(c,3,'fm','',T('Формула «','Formula «')+x.f+T('»: что означают величины, в каких единицах и когда применяется?','»: what do the variables mean, what are the units and when is it used?'),
`${x.v}\n${T('Единицы','Units')}: ${x.u}\n${T('Когда применять','When to use')}: ${x.w}\n${T('Пример','Example')}: ${x.ex}`)));
(r.mist||[]).forEach(x=>add(mk(c,3,'mist','',T('Найдите ошибку и исправьте: ','Find and fix the mistake: ')+x.x,`✅ ${x.ok}\n💡 ${x.why}`)));
(r.rx||[]).forEach(x=>add(mk(c,3,'rx','',T('Охарактеризуйте реакцию: ','Describe the reaction: ')+x.eq,`${T('Реагенты','Reactants')}: ${x.re}\n${T('Продукты','Products')}: ${x.pr}\n${T('Условия','Conditions')}: ${x.cond}\n${T('Тип','Type')}: ${x.type}\n${x.why}`)));
/* 5-mark: extended answers */
((c.qb||{}).five||[]).forEach(x=>add(mk(c,5,'gen','',x.q,x.a)));
(r.fc||[]).filter(f=>['def','concept','exam','fact','exception'].includes(f.t)&&f.b.length>=100).slice(0,8).forEach(f=>add(mk(c,5,'gen','',f.f,f.b)));})};
/* ---------- state + filtering ---------- */
const QF={m:2,ch:'all',k:'all',d:'all',s:'',imp:0,hide:0,i:0,open:0};
const tlabel=(c,k)=>k[0]==='t'?(c.tp[+k.slice(1)-1]?T(...c.tp[+k.slice(1)-1]):T('Тема ','Topic ')+k.slice(1)):k[0]==='x'?k.slice(2):T(...(CAT[k]||CAT.gen));
const topicOpts=()=>{const cs=QF.ch==='all'?CH:[chap(QF.ch)],pool=ALL.filter(q=>q.m===QF.m&&cs.includes(q.c)),ks=[...new Set(pool.map(q=>QF.ch==='all'?q.k:q.k))];
if(QF.ch==='all')return[...new Set(pool.map(q=>q.k[0]==='t'?'t':q.k))].map(k=>k==='t'?['t',T('Темы глав','Chapter topics')]:[k,tlabel(CH[0],k)]);
const c=cs[0];return ks.sort((a,b)=>a.localeCompare(b,'en',{numeric:true})).map(k=>[k,tlabel(c,k)])};
const list=()=>{const s=QF.s.trim().toLowerCase(),b=st();return ALL.filter(q=>q.m===QF.m&&(QF.ch==='all'||q.c.id===QF.ch)&&(QF.k==='all'||(QF.k==='t'?q.k[0]==='t':q.k===QF.k))&&(QF.d==='all'||q.d===QF.d)&&(!QF.imp||b.imp[q.id])&&(!QF.hide||!b.done[q.id])&&(!s||(q.q+' '+q.a).toLowerCase().includes(s)))
.sort((a,b2)=>(b2.ex-a.ex))};
const cnt=m=>ALL.filter(q=>q.m===m&&(QF.ch==='all'||q.c.id===QF.ch)).length;
const MT=[[2,['2 балла','2-Mark']],[3,['3 балла','3-Mark']],[5,['5 баллов','5-Mark']]];
const nav2=cur=>`<div class="tabs scr mt"><a class="ib ${cur==='q'?'on':''}" href="#qbank" style="text-decoration:none">📝 ${T('Банк вопросов','Question Bank')}</a><a class="ib ${cur==='r'?'on':''}" href="#resources" style="text-decoration:none">📂 ${T('Материалы','Study Resources')}</a></div>`;
const res=()=>{const L_=list(),b=st(),n=L_.length;if(QF.i>=n)QF.i=Math.max(0,n-1);const q=L_[QF.i],dn=L_.filter(x=>b.done[x.id]).length;
if(!q)return`<div class="card mt ctr">${ALL.some(x=>x.m===QF.m)?T('Ничего не найдено. Измените фильтры.','Nothing found. Change the filters.'):T('Здесь пока нет вопросов.','No questions here yet.')}<p class="mu sm">${T('Свои точные вопросы и ответы добавляются в js/qb-exact.js','Add your exact questions and answers in js/qb-exact.js')}</p></div>`;
return`<p class="mu mt sm">${T('Вопросов','Questions')}: ${n} · ✓ ${dn}/${n} · ★ ${L_.filter(x=>b.imp[x.id]).length}</p>
<div class="card qbc mt ${b.done[q.id]?'qdone':''}"><div class="row sm mu"><span>${q.c.icon} ${esc(cn(q.c))}</span><span>· ${esc(tlabel(q.c,q.k))}</span>${q.d?`<span class="tg t-fact">${dl(q.d)}</span>`:''}${q.ex?`<span class="tg t-exam">📌 ${T('Точный текст','Exact text')}</span>`:''}<span class="sp"></span><b>${QF.i+1} / ${n}</b></div>
<h3 class="qtx mt">${esc(q.q)}</h3>${QF.open?`<div class="blk qtx qans">${esc(q.a)}</div>`:''}
<div class="row mt"><button class="btn ${QF.open?'o':''}" data-qb="ans">${QF.open?T('Скрыть ответ','Hide answer'):T('Показать ответ','Show answer')}</button><button class="ib qst ${b.imp[q.id]?'on':''}" data-qb="imp" data-id="${q.id}">${b.imp[q.id]?'★':'☆'} ${T('Важно','Important')}</button><button class="ib ${b.done[q.id]?'on':''}" data-qb="done" data-id="${q.id}">${b.done[q.id]?'✓ '+T('Выполнено','Completed'):T('Отметить выполненным','Mark completed')}</button></div>
<div class="row mt"><button class="btn o" data-qb="prev">← ${T('Назад','Previous')}</button><button class="ib" data-qb="rnd">🎲 ${T('Случайный','Random')}</button><span class="sp"></span><button class="btn o" data-qb="next">${T('Далее','Next')} →</button></div></div>
<details class="mt"><summary class="mu">${T('Все вопросы списком','All questions')} (${n})</summary><div class="qli">${L_.slice(0,300).map((x,i)=>`<button class="qit ${i===QF.i?'cur':''}" data-qb="go" data-i="${i}">${b.done[x.id]?'✓':b.imp[x.id]?'★':(i+1)} <span class="qtx">${esc(x.q.slice(0,110))}${x.q.length>110?'…':''}</span></button>`).join('')}</div></details>`};
const opt=(v,l,cur)=>`<option value="${esc(v)}" ${v===cur?'selected':''}>${esc(l)}</option>`;
const page=()=>{const tos=topicOpts();if(QF.k!=='all'&&!tos.some(o=>o[0]===QF.k))QF.k='all';
return`<h1>📝 ${T('Банк вопросов','Question Bank')}</h1>${nav2('q')}<div class="tabs mt">${MT.map(([m,l])=>`<button class="ib ${QF.m===m?'on':''}" data-qb="m" data-v="${m}">${T(...l)} (${cnt(m)})</button>`).join('')}</div>
<div class="card mt qfl"><input id="qs" type="search" class="ib gin" placeholder="🔍 ${T('Поиск по вопросам и ответам…','Search questions and answers…')}" value="${esc(QF.s)}" autocomplete="off">
<div class="qsel"><select data-qs="ch" class="ib">${opt('all',T('Все главы','All chapters'),QF.ch)}${CH.map(c=>opt(c.id,c.icon+' '+cn(c),QF.ch)).join('')}</select>
<select data-qs="k" class="ib">${opt('all',T('Все темы','All topics'),QF.k)}${tos.map(o=>opt(o[0],o[1],QF.k)).join('')}</select>
<select data-qs="d" class="ib">${opt('all',T('Любая сложность','Any difficulty'),QF.d)}${Object.keys(DL).map(d=>opt(d,dl(d),QF.d)).join('')}</select></div>
<div class="row"><label class="ib"><input type="checkbox" data-qs="imp" ${QF.imp?'checked':''}> ★ ${T('Только важные','Important only')}</label><label class="ib"><input type="checkbox" data-qs="hide" ${QF.hide?'checked':''}> ${T('Скрыть выполненные','Hide completed')}</label><button class="ib" data-qb="clr">✕ ${T('Сбросить','Reset')}</button></div>
<p class="mu sm" style="margin:6px 0 0">${T('Сложность есть только у вопросов на 2 балла.','Difficulty applies to 2-mark questions only.')}</p></div><div id="qres">${res()}</div>`};
V.qbank=a=>{if(!ALL)build();if(a&&chap(a)&&QF.ch!==a){QF.ch=a;QF.k='all';QF.i=0}return page()};
/* ---------- study resources ---------- */
const SEC=[['questionPapers','📄',['Экзаменационные работы','Question Papers']],['twoMarkPDFs','2️⃣',['PDF: вопросы на 2 балла','2-Mark PDFs']],['threeMarkPDFs','3️⃣',['PDF: вопросы на 3 балла','3-Mark PDFs']],['fiveMarkPDFs','5️⃣',['PDF: вопросы на 5 баллов','5-Mark PDFs']],['chapterSummaries','📌',['PDF: конспекты глав','Chapter Summary PDFs']],['other',' 📎'.trim(),['Другие материалы','Other Study Material']]];
const RF={ch:'all',s:''},okUrl=u=>/^https?:\/\//i.test(String(u||'').trim());
const rlist=k=>[...((window.RESOURCES||{})[k]||[]).map((r,i)=>({...r,src:'f',i})),...(((S().res||{})[k])||[]).map((r,i)=>({...r,src:'l',i}))].filter(r=>okUrl(r.url));
const rch=r=>{const c=chap(r.chapter);return c?c.icon+' '+cn(c):(!r.chapter||r.chapter==='general')?T('Общее','General'):r.chapter};
const rmatch=r=>(RF.ch==='all'||r.chapter===RF.ch)&&(!RF.s.trim()||(r.title+' '+(r.description||'')+' '+rch(r)).toLowerCase().includes(RF.s.trim().toLowerCase()));
const rres=()=>SEC.map(([k,ic,ti])=>{const a=rlist(k).filter(rmatch);return`<h2 class="mt">${ic} ${T(...ti)} <small class="mu">(${a.length})</small></h2>${a.length?`<div class="grid">${a.map(r=>`<div class="card rsc"><h3>${esc(r.title)}</h3><p class="mu sm" style="margin:0">${esc(rch(r))}</p>${r.description?`<p class="sm">${esc(r.description)}</p>`:''}<div class="row mt"><a class="btn" href="${esc(r.url.trim())}" target="_blank" rel="noopener noreferrer">📄 ${T('Открыть PDF','Open PDF')}</a>${r.src==='l'?`<button class="ib" data-rs="del" data-k="${k}" data-i="${r.i}" aria-label="delete">🗑</button>`:''}</div></div>`).join('')}</div>`:`<div class="card mu sm">${T('Ссылок пока нет.','No links yet.')}</div>`}`}).join('');
V.resources=()=>`<h1>📂 ${T('Материалы','Study Resources')}</h1>${nav2('r')}<div class="card mt qfl"><input id="rsq" type="search" class="ib gin" placeholder="🔍 ${T('Поиск материалов…','Search resources…')}" value="${esc(RF.s)}" autocomplete="off"><div class="qsel"><select data-rsel="ch" class="ib">${opt('all',T('Все главы и категории','All chapters and categories'),RF.ch)}${CH.map(c=>opt(c.id,c.icon+' '+cn(c),RF.ch)).join('')}</select></div></div>
<details class="card mt"><summary><b>➕ ${T('Добавить ссылку','Add a link')}</b></summary><div class="qfl mt"><select id="rf-k" class="ib">${SEC.map(([k,ic,ti])=>`<option value="${k}">${ic} ${esc(T(...ti))}</option>`).join('')}</select><select id="rf-c" class="ib"><option value="general">${T('Общее / без главы','General / no chapter')}</option>${CH.map(c=>`<option value="${c.id}">${c.icon} ${esc(cn(c))}</option>`).join('')}</select><input id="rf-t" class="ib gin" placeholder="${T('Название','Title')}"><input id="rf-d" class="ib gin" placeholder="${T('Описание (необязательно)','Description (optional)')}"><input id="rf-u" class="ib gin" type="url" placeholder="https://drive.google.com/…"><div class="row"><button class="btn" data-rs="add">${T('Добавить','Add')}</button></div><p class="mu sm">${T('Ссылка сохраняется в этом браузере. Чтобы она была на всех устройствах, добавьте её в js/resources.js.','Saved in this browser. To keep it on every device, add it to js/resources.js.')}</p></div></details><div id="rres">${rres()}</div>`;
/* ---------- events ---------- */
const inQ=()=>/^#qbank/.test(location.hash),inR=()=>/^#resources/.test(location.hash),redraw=()=>{$('#app').innerHTML=page()},rr=()=>{$('#qres').innerHTML=res()};
document.addEventListener('click',e=>{const a=e.target.closest('[data-qb],[data-rs]');if(!a)return;const d=a.dataset;
if(d.qb&&inQ()){const L_=list(),n=L_.length,q=L_[QF.i],b=st();
if(d.qb==='m'){QF.m=+d.v;QF.k='all';QF.i=0;QF.open=0;redraw();return}
if(d.qb==='clr'){Object.assign(QF,{ch:'all',k:'all',d:'all',s:'',imp:0,hide:0,i:0,open:0});redraw();return}
if(d.qb==='ans')QF.open=+!QF.open;
else if(d.qb==='next'&&n){QF.i=(QF.i+1)%n;QF.open=0}else if(d.qb==='prev'&&n){QF.i=(QF.i-1+n)%n;QF.open=0}
else if(d.qb==='rnd'&&n){let j=QF.i;if(n>1)while(j===QF.i)j=Math.random()*n|0;QF.i=j;QF.open=0}
else if(d.qb==='go'){QF.i=+d.i;QF.open=0;scrollTo(0,0)}
else if(d.qb==='imp'||d.qb==='done'){const m=b[d.qb];if(m[d.id])delete m[d.id];else m[d.id]=Date.now();C.save()}
rr();return}
if(d.rs&&inR()){const s=S();
if(d.rs==='add'){const v=i=>($('#'+i).value||'').trim(),u=v('rf-u'),ti=v('rf-t');if(!ti||!okUrl(u)){C.toast(T('Нужны название и ссылка, начинающаяся с http(s)://','Title and an http(s):// link are required'));return}
((s.res||={})[v('rf-k')]||=[]).push({title:ti,chapter:v('rf-c'),description:v('rf-d'),url:u});C.save();C.route();C.toast('✅ '+T('Ссылка добавлена','Link added'))}
else if(d.rs==='del'&&confirm(T('Удалить эту ссылку?','Delete this link?'))){(s.res[d.k]||[]).splice(+d.i,1);C.save();$('#rres').innerHTML=rres()}}});
document.addEventListener('change',e=>{const a=e.target;if(a.dataset.qs&&inQ()){const k=a.dataset.qs;if(k==='imp'||k==='hide')QF[k]=+a.checked;else{QF[k]=a.value;if(k==='ch')QF.k='all'}QF.i=0;QF.open=0;redraw()}
else if(a.dataset.rsel&&inR()){RF.ch=a.value;$('#rres').innerHTML=rres()}});
document.addEventListener('input',e=>{if(e.target.id==='qs'&&inQ()){QF.s=e.target.value;QF.i=0;QF.open=0;rr()}else if(e.target.id==='rsq'&&inR()){RF.s=e.target.value;$('#rres').innerHTML=rres()}});
NAV.splice(3,0,['qbank','📝']);
const oc=V.chapter;V.chapter=id=>{const h=oc(id),c=chap(id);return c?h+`<div class="row mt"><a class="btn o" href="#qbank/${c.id}">📝 ${T('Банк вопросов','Question Bank')}</a><a class="btn o" href="#resources">📂 ${T('Материалы','Study Resources')}</a></div>`:h};
};
