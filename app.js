(()=>{
const $=s=>document.querySelector(s),$$=s=>[...document.querySelectorAll(s)];
let S={};try{S=JSON.parse(localStorage.getItem('vc')||'{}')}catch(e){}
const isO=x=>x&&typeof x==='object'&&!Array.isArray(x);
const fixS=()=>{if(!isO(S))S={};for(const k of ['topics','q','fc','g','ach','fcs','ow','qa'])if(!isO(S[k]))S[k]={};for(const k of ['bm','fav','recent','mist'])if(!Array.isArray(S[k]))S[k]=[];
if(!isO(S.streak))S.streak={};S.streak.cur=+S.streak.cur||0;S.streak.best=Math.max(+S.streak.best||0,S.streak.cur);S.streak.last=typeof S.streak.last==='string'?S.streak.last:'';
S.bm=S.bm.filter(x=>typeof x==='string').map(x=>x.includes('|')?x:'topic|'+x);S.fav=S.fav.filter(x=>typeof x==='string');
S.mist.forEach(id=>{if(!S.qa[id])S.qa[id]={n:1,c:0,l:0,s:0}});S.lang=S.lang==='en'?'en':'ru';S.theme=S.theme==='dark'?'dark':'light'};
fixS();
const save=()=>{try{localStorage.setItem('vc',JSON.stringify(S))}catch(e){}};
let lang=S.lang==='en'?'en':'ru';
document.documentElement.dataset.theme=S.theme||'light';
const TR={ru:{home:'Главная',chapters:'Главы',saved:'Закладки',progress:'Прогресс',search:'Поиск…',overall:'Общий прогресс',cont:'Продолжить',today:'Химия дня',streak:'Серия',days:'дн.',quick:'Быстрые действия',recent:'Недавняя активность',none:'Пока пусто — начни первый урок!',open:'Открыть',topics:'тем',mark:'Отметить пройденным',marked:'✓ Пройдено',simple:'Просто',eli10:'Как для 10 лет',sci:'Научно',an:'Аналогия',ex:'Примеры',st:'Пошагово',f:'Формулы',r:'Реакции',m:'Частые ошибки',tip:'Советы к экзамену',sum:'Итог',prev:'← Назад',next:'Далее →',enter:'Войти в мир химии ✨',ach:'Достижения',quiz:'Тесты',cards:'Карточки',games:'Игры',mastered:'выучено',plays:'запусков',reset:'Сбросить прогресс',sure:'Точно сбросить весь прогресс?',nores:'Ничего не найдено',res:'Результаты',soon:'Скоро',allch:'Все главы',bmadd:'☆ В закладки',bmdel:'★ В закладках',bmempty:'Закладок пока нет. Нажми ☆ в уроке.',nb:'Откройте урок',newa:'Новое достижение',visited:'Урок',done:'Пройдено',a1:'Первый урок',a2:'Серия 3 дня',a3:'Глава завершена',a4:'Первая закладка',a5:'Половина курса',why:'Почему?',rw:'В жизни',test:'Проверь себя',orb:'Орбитальная схема',soonNote:'Тесты, карточки и игры появятся на следующем этапе.'},
en:{home:'Home',chapters:'Chapters',saved:'Saved',progress:'Progress',search:'Search…',overall:'Overall progress',cont:'Continue',today:"Today's chemistry",streak:'Streak',days:'days',quick:'Quick actions',recent:'Recent activity',none:'Nothing yet — start your first lesson!',open:'Open',topics:'topics',mark:'Mark as done',marked:'✓ Done',simple:'Simple',eli10:'Like I\'m 10',sci:'Scientific',an:'Analogy',ex:'Examples',st:'Step by step',f:'Formulas',r:'Reactions',m:'Common mistakes',tip:'Exam tips',sum:'Summary',prev:'← Back',next:'Next →',enter:'Enter the chemistry world ✨',ach:'Achievements',quiz:'Quizzes',cards:'Flashcards',games:'Games',mastered:'mastered',plays:'plays',reset:'Reset progress',sure:'Really reset all progress?',nores:'Nothing found',res:'Results',soon:'Soon',allch:'All chapters',bmadd:'☆ Bookmark',bmdel:'★ Bookmarked',bmempty:'No bookmarks yet. Tap ☆ in a lesson.',visited:'Lesson',done:'Done',a1:'First lesson',a2:'3-day streak',a3:'Chapter complete',a4:'First bookmark',a5:'Halfway there',soonNote:'Quizzes, flashcards and games arrive in the next stage.'}};
Object.assign(TR.ru,{qz:'Тест: 10 вопросов',chk:'Проверить',nx:'Дальше',okm:'Верно! ✅',bad:'Неверно. Верный ответ:',res:'Результат',ktrue:'Верно',kfalse:'Неверно',know:'Знаю',again:'Ещё раз',flip:'Нажми, чтобы перевернуть',inp:'Ваш ответ'});
Object.assign(TR.en,{qz:'Quiz: 10 questions',chk:'Check',nx:'Next',okm:'Correct! ✅',bad:'Wrong. Correct answer:',res:'Result',ktrue:'True',kfalse:'False',know:'I know it',again:'Again',flip:'Tap to flip',inp:'Your answer'});
Object.assign(TR.ru,{bookmarks:'Закладки',revh:'Повторение',ow:'Ответ одним словом',fm:'Важные формулы',rxn:'Важные реакции',summ:'Итоги главы',mist:'Частые ошибки',qs:'вопросов',norx:'нет реакций',norxn:'В этой главе нет реакций — они начинаются со следующих глав.',best:'лучший',owbest:'Лучший результат',owmiss:'Нужно повторить',owretry:'Повторить ошибки',dk:'Не знаю',yours:'Ваш ответ',fall:'Все',fp2:'Нужна практика',fnew:'Новые',fk2:'Знаю',of:'из',fempty:'В этой подборке пока нет карточек.',fdone:'Колода пройдена!',fpr:'Повторить «Нужна практика»',fagain:'Сначала',card:'Карточка',prevc:'Назад',nextc:'Далее',shuffle:'Перемешать',needp:'Нужна практика',fkeys:'Клавиши: ← → листать, пробел — перевернуть, 1 — знаю, 2 — практика',freset:'Сбросить отметки',fresetq:'Сбросить отметки «Знаю» / «Нужна практика» в этой главе?',fv:'Обозначения',fu:'Единицы',fw:'Когда применять',fe:'Пример',fmm:'Частая ошибка',rre:'Реагенты',rpr:'Продукты',rco:'Условия',rty:'Тип реакции',rwh:'Объяснение',rob:'Наблюдения',qsum:'Краткое резюме',top10:'Если помнить только 10 вещей',mx:'Ошибка:',mo:'Правильно:',rwhy:'Почему?',ty_def:'Определение',ty_formula:'Формула',ty_reaction:'Реакция',ty_fact:'Важный факт',ty_concept:'Понятие',ty_exception:'Исключение',ty_mistake:'Частая ошибка',ty_exam:'Экзамен'});
Object.assign(TR.en,{bookmarks:'Saved',revh:'Revision',ow:'One-word answers',fm:'Key formulas',rxn:'Key reactions',summ:'Chapter summary',mist:'Common mistakes',qs:'questions',norx:'no reactions',norxn:'This chapter has no reactions; they start in the following chapters.',best:'best',owbest:'Best score',owmiss:'To review',owretry:'Retry missed',dk:'I don\'t know',yours:'Your answer',fall:'All',fp2:'Need practice',fnew:'New',fk2:'Known',of:'of',fempty:'No cards in this set yet.',fdone:'Deck complete!',fpr:'Practise the tough ones',fagain:'Start over',card:'Card',prevc:'Previous',nextc:'Next',shuffle:'Shuffle',needp:'Need practice',fkeys:'Keys: ← → browse, space flips, 1 = know, 2 = practice',freset:'Reset marks',fresetq:'Reset Know / Need-practice marks in this chapter?',fv:'Variables',fu:'Units',fw:'When to use',fe:'Example',fmm:'Common mistake',rre:'Reactants',rpr:'Products',rco:'Conditions',rty:'Reaction type',rwh:'Explanation',rob:'Observations',qsum:'Quick Summary',top10:'If You Remember Only 10 Things',mx:'Mistake:',mo:'Correct:',rwhy:'Why?',ty_def:'Definition',ty_formula:'Formula',ty_reaction:'Reaction',ty_fact:'Key fact',ty_concept:'Concept',ty_exception:'Exception',ty_mistake:'Common mistake',ty_exam:'Exam'});
if(window.PERSONAL){Object.assign(TR.ru,PERSONAL.ru);Object.assign(TR.en,PERSONAL.en)}
const t=k=>TR[lang][k]??TR.ru[k]??k;
const L=o=>o==null?'':typeof o==='string'?o:(o[lang]||o.ru||'');
const esc=s=>String(s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
CH.forEach(c=>Object.assign(c,BANK[c.id]||{}));CH.forEach(c=>{c.rev=(window.REV||{})[c.id]||null});
const TP=CH.flatMap(c=>c.tp.map((x,i)=>({id:c.id+'-t'+(i+1),c,n:i+1,t:B(x[0],x[1]),...(EX[c.id+'-t'+(i+1)]||{})})));
TP.forEach(x=>x.hay=JSON.stringify({t:x.t,s:x.s,e10:x.e10,sci:x.sci,an:x.an,ex:x.ex,st:x.st,f:x.f,r:x.r,m:x.m,tip:x.tip,sum:x.sum,rw:x.rw,why:x.why,mist:x.mist,test:x.test,ex:x.ex}).toLowerCase());
const chDone=c=>TP.filter(x=>x.c===c&&S.topics[x.id]).length;
const chPct=c=>Math.round(chDone(c)/c.tp.length*100);
const overall=()=>Math.round(Object.keys(S.topics).filter(k=>TP.some(x=>x.id===k)).length/TP.length*100);
const ACH=[['a1','🌱',()=>Object.keys(S.topics).length>=1],['a2','🔥',()=>S.streak.cur>=3],['a3','🏆',()=>CH.some(c=>chPct(c)===100)],['a4','⭐',()=>S.bm.length>=1],['a5','💎',()=>overall()>=50],
['a6','🌟',()=>S.streak.best>=7],['a7','💯',()=>qStats().n>=100],['a8','⚗️',()=>rxMaster()],['a9','🃏',()=>fcReviewed()>=100],['a10','🎯',()=>{const q=qStats();return q.n>=30&&q.c/q.n>=.9}],['a11','🏆',()=>CH.every(c=>chPct(c)===100)]];
const qStats=()=>{let n=0,c=0;for(const k in S.qa){n+=S.qa[k].n||0;c+=S.qa[k].c||0}return{n,c}};
const fcReviewed=()=>Object.values(S.fcs).reduce((a,o)=>a+(isO(o)?Object.keys(o).length:0),0);
const rxMaster=()=>{const cs=CH.filter(c=>c.rev&&c.rev.rx&&c.rev.rx.length);return cs.length>0&&cs.every(c=>((S.g[c.id+':rx']||{}).done||0)>0)};
const checkAch=()=>{ACH.forEach(([id,ic,f])=>{let ok=false;try{ok=f()}catch(e){}if(!S.ach[id]&&ok){S.ach[id]=Date.now();toast(ic+' '+t('newa')+': '+t(id))}})};
/* save buttons: bookmark (bm) and favourite (fav) for lessons, questions, formulas, reactions, flashcards */
const sv=(kind,id,big)=>{const k=kind+'|'+id;return`<span class="svb${big?' big':''}">`+[['bm','⭐','☆','bmadd2','bmdel2'],['fav','❤️','🤍','favadd','favdel']].map(([l,on,off,a,d])=>{const y=S[l].includes(k);return`<button class="ib sv" data-sv="${l}" data-k="${esc(k)}" aria-pressed="${y}" title="${t(y?d:a)}" aria-label="${t(y?d:a)}">${y?on:off}${big?' '+t(y?d:a):''}</button>`}).join('')+'</span>'};
const svToggle=b=>{const l=b.dataset.sv,k=b.dataset.k,a=S[l],i=a.indexOf(k),y=i<0;if(y)a.push(k);else a.splice(i,1);const big=!!b.closest('.big'),ic=l==='bm'?['⭐','☆']:['❤️','🤍'],nm=t(l==='bm'?(y?'bmdel2':'bmadd2'):(y?'favdel':'favadd'));b.setAttribute('aria-pressed',y);b.title=nm;b.setAttribute('aria-label',nm);b.textContent=ic[y?0:1]+(big?' '+nm:'');touch();checkAch();save()};
function toast(m){const e=$('#toast');e.textContent=m;e.className='on';setTimeout(()=>e.className='',2600)}
function touch(){const d=new Date(),iso=x=>x.toISOString().slice(0,10),td=iso(d);if(S.streak.last!==td){const y=new Date(d-864e5);S.streak.cur=S.streak.last===iso(y)?S.streak.cur+1:1;S.streak.last=td}S.streak.best=Math.max(S.streak.best||0,S.streak.cur)}
function log(l){S.recent.unshift({ts:Date.now(),l});S.recent=S.recent.slice(0,8);touch();checkAch();save()}
const ring=p=>`<div class="ring" style="--p:${p}"><b>${p}%</b></div>`;
const bar=p=>`<div class="bar"><i style="width:${p}%"></i></div>`;
const chCard=c=>{const p=chPct(c);return`<div class="card ch" style="--c:${c.c}" data-go="#chapter/${c.id}"><div class="ic">${c.icon}</div><h3>${esc(L(c.t))}</h3><p class="mu">${esc(L(c.d))}</p>${bar(p)}<div class="row mt"><span class="mu">${chDone(c)}/${c.tp.length} ${t('topics')}</span><span class="sp"></span><span class="btn">${t('cont')}</span></div></div>`};
const nextTopic=()=>TP.find(x=>!S.topics[x.id])||TP[0];
const extra=x=>(x.orb?`<div class="blk"><h3>🧲 ${t('orb')}</h3><div class="orb">${x.orb.map(o=>`<div><small>${o[0]}</small><div class="cells">${o[1].split('|').map(c=>`<span>${c}</span>`).join('')}</div></div>`).join('')}</div></div>`:'')+(x.rw?`<div class="blk"><h3>🌍 ${t('rw')}</h3>${esc(x.rw)}</div>`:'')+(x.why||[]).map(w=>`<details class="blk card"><summary>❓ ${t('why')} ${esc(w.q)}</summary><p>${esc(w.a)}</p></details>`).join('')+(x.mist?`<div class="blk"><h3>${t('m')}</h3>${x.mist.map(m=>`<div class="card mt"><div>❌ ${esc(m.x)}</div><div>✅ ${esc(m.ok)}</div></div>`).join('')}</div>`:'')+(x.test?`<div class="blk"><h3>🧠 ${t('test')}</h3>${x.test.map(q=>`<details class="card mt"><summary>${esc(q.q)}</summary><b>${esc(q.a)}</b></details>`).join('')}</div>`:'');
let QZ=null,CD=null;const shuf=a=>a.slice().sort(()=>Math.random()-.5);
const show=q=>q.type==='mcq'?q.o.map((o,i)=>`<button class="btn o" style="display:block;width:100%;margin:6px 0;text-align:left" data-opt="${i}">${esc(o)}</button>`).join(''):q.type==='tf'?`<button class="btn o" data-opt="1">${t('ktrue')}</button> <button class="btn o" data-opt="0">${t('kfalse')}</button>`:`<input id="ans" class="ib" style="width:100%;border-radius:12px" placeholder="${t('inp')}" autocomplete="off"><p><button class="btn" data-chk="1">${t('chk')}</button></p>`;
const corr=q=>q.type==='mcq'?q.o[q.a]:q.type==='tf'?(q.a?t('ktrue'):t('kfalse')):String(q.a);
function qhtml(){const Q=QZ,q=Q.qs[Q.i];if(!q){if(!Q.saved){Q.saved=1;if(!Q.mix)(S.q[Q.c.id]||=[]).push({ts:Date.now(),sc:Q.sc,n:Q.qs.length});log(t('quiz')+': '+L(Q.c.t)+' — '+Q.sc+'/'+Q.qs.length)}return`<h1>${t('res')}</h1><div class="card"><h2>${Q.sc} / ${Q.qs.length}</h2>${Q.qs.length&&Q.sc/Q.qs.length>=.8?`<p class="proud">${t('proud')}</p>`:''}</div><p class="mt"><a class="btn o" href="${Q.back||'#chapter/'+Q.c.id}">${esc(L(Q.c.t))}</a></p>`}
return`<a class="crumb" href="${Q.back||'#chapter/'+Q.c.id}">← ${esc(L(Q.c.t))}</a><div class="bar mt"><i style="width:${Q.i/Q.qs.length*100}%"></i></div><p class="mu">${Q.i+1}/${Q.qs.length} · ${q.d}</p><div class="card"><h3>${esc(q.q)}</h3>${Q.a?'':show(q)}${Q.a?`<p>${Q.a.ok?t('okm'):t('bad')+' <b>'+esc(corr(q))+'</b>'}</p><p class="mu">${esc(q.ex||'')}</p><p>${sv('q',q.id)}</p><button class="btn" data-nx="1">${t('nx')}</button>`:''}</div>`}
const V={
home(){const last=(S.last&&TP.find(x=>x.id===S.last&&!S.topics[x.id]))||nextTopic(),fact=FACTS[new Date().getDate()%FACTS.length];
return`<h1>${t('hi')}</h1><p class="mu">${t('hi2')}</p><div class="grid g2"><div class="card row">${ring(overall())}<div><h3>${t('overall')}</h3><span class="mu">${Object.keys(S.topics).length}/${TP.length} ${t('topics')}</span></div></div><div class="card"><h3>🔥 ${t('streak')}</h3><div style="font-size:2rem">${S.streak.cur} <small class="mu">${t('days')}</small></div></div></div>
<div class="grid g2 mt"><div class="card"><h3>${t('cont')}</h3><p><b>${esc(L(last.c.t))}</b><br>${last.n}. ${esc(L(last.t))}</p><a class="btn" href="#topic/${last.id}">${t('open')}</a></div><div class="card"><h3>💡 ${t('today')}</h3><p>${esc(L(fact))}</p></div></div>
<h2 class="mt">${t('quick')}</h2><div class="row"><a class="btn" href="#chapters">📚 ${t('chapters')}</a><a class="btn o" href="#bookmarks">⭐ ${t('saved')}</a><a class="btn o" href="#review">🔁 ${t('revw')}</a><a class="btn o" href="#progress">📈 ${t('progress')}</a></div>
${window.VC&&VC.dailyHTML?VC.dailyHTML():''}<h2 class="mt">${t('recent')}</h2><div class="card">${S.recent.length?S.recent.map(r=>`<div>${new Date(r.ts).toLocaleDateString(lang)} — ${esc(r.l)}</div>`).join(''):`<span class="mu">${t('none')}</span>`}</div>`},
chapters(){return`<h1>${t('chapters')}</h1><div class="grid">${CH.map(chCard).join('')}</div>`},
chapter(id){const c=CH.find(x=>x.id===id);if(!c)return V.chapters();
return`<a class="crumb" href="#chapters">← ${t('allch')}</a><div class="row mt">${ring(chPct(c))}<div><h1>${c.icon} ${esc(L(c.t))}</h1><p class="mu">${esc(L(c.d))}</p></div></div><div class="tl mt">${TP.filter(x=>x.c===c).map(x=>`<a href="#topic/${x.id}"><span class="dot ${S.topics[x.id]?'d':''}">${S.topics[x.id]?'✓':x.n}</span><span>${esc(L(x.t))}</span></a>`).join('')}</div>${c.q?`<div class="row mt"><a class="btn" href="#quiz/${c.id}">📝 ${t('qz')} (${c.q.length})</a></div>`:''}${revTiles(c)}`},
topic(id){const i=TP.findIndex(x=>x.id===id);if(i<0)return V.chapters();const x=TP[i];S.last=id;save();
const P=[['s','simple',x.s],['e10','eli10',x.e10],['sci','sci',x.sci]].filter(p=>p[2]);
const list=(k,a)=>a&&a.length?`<div class="blk ${k==='m'?'warn':k==='tip'?'tip':''}"><h3>${t(k)}</h3>${a.map(v=>k==='f'||k==='r'?`<div class="f">${esc(L(v))}</div>`:`<div>• ${esc(L(v))}</div>`).join('')}</div>`:'';
const body=P.length?`<div class="tabs">${P.map((p,j)=>`<button class="ib ${j?'':'on'}" data-tab="${p[1]}">${t(p[1])}</button>`).join('')}</div>${P.map((p,j)=>`<div class="pn ${j?'':'on'}" id="pn-${p[1]}">${esc(L(p[2]))}</div>`).join('')}`:`<p class="mu">${t('soon')}…</p>`;
const bm=S.bm.includes(id);
return`<a class="crumb" href="#chapter/${x.c.id}">← ${esc(L(x.c.t))}</a><h1>${x.n}. ${esc(L(x.t))}</h1><div class="card">${body}</div>
${x.an?`<div class="blk"><h3>💭 ${t('an')}</h3>${esc(L(x.an))}</div>`:''}${x.ex?`<div class="blk"><h3>${t('ex')}</h3>${x.ex.map(e=>`<div class="card mt"><b>${esc(e.t)}</b><div class="f">${esc(e.b)}</div></div>`).join('')}</div>`:''}
${x.st?`<div class="blk"><h3>${t('st')}</h3><ol>${x.st.map(s=>`<li>${esc(s)}</li>`).join('')}</ol></div>`:''}${list('f',x.f)}${list('r',x.r)}${x.mist?'':list('m',x.m)}${list('tip',x.tip)}${extra(x)}${x.sum?`<div class="blk card"><h3>📝 ${t('sum')}</h3>${esc(L(x.sum))}</div>`:''}
<div class="row mt"><button class="btn ${S.topics[id]?'o':''}" data-done="${id}">${S.topics[id]?t('marked'):t('mark')}</button>${sv('topic',id,1)}</div>
<div class="row mt">${i>0?`<a class="btn o" href="#topic/${TP[i-1].id}">${t('prev')}</a>`:''}<span class="sp"></span>${i<TP.length-1?`<a class="btn o" href="#topic/${TP[i+1].id}">${t('next')}</a>`:''}</div>`},
bookmarks(){const a=S.bm.map(id=>TP.find(x=>x.id===id)).filter(Boolean);return`<h1>⭐ ${t('saved')}</h1>${a.length?`<div class="tl">${a.map(x=>`<a href="#topic/${x.id}"><span class="dot">★</span><span>${esc(L(x.c.t))} — ${esc(L(x.t))}</span></a>`).join('')}</div>`:`<p class="mu">${t('bmempty')}</p>`}`},
quiz(id){const c=CH.find(x=>x.id===id);if(!c||!c.q)return V.chapters();QZ={c,qs:shuf(c.q).slice(0,10),i:0,sc:0,a:null};return qhtml()},
progress(){const gp=Object.keys(S.g).length,fc=CH.reduce((a,c)=>a+fcCount(c).k,0),revP=`<h2 class="mt">🔁 ${t('revh')}</h2>${CH.map(c=>{const s=fcCount(c),o=S.ow[c.id];return`<div class="card mt"><div class="row"><b>${c.icon} ${esc(L(c.t))}</b><span class="sp"></span><span class="mu">🃏 ✓${s.k}/${s.t} · ⚡ ${o?o.best+'/'+o.n:'—'}</span></div>${bar(s.t?Math.round(s.k/s.t*100):0)}</div>`}).join('')}`;
return`<h1>${t('progress')}</h1><div class="grid"><div class="card">📚 ${t('topics')}<h2>${Object.keys(S.topics).length}/${TP.length}</h2></div><div class="card">📝 ${t('quiz')}<h2>${Object.keys(S.q).length}</h2></div><div class="card">🃏 ${t('cards')}<h2>${fc}</h2></div><div class="card">🎮 ${t('games')}<h2>${gp}</h2></div></div>
<h2 class="mt">${t('chapters')}</h2>${CH.map(c=>`<div class="card mt"><div class="row"><b>${c.icon} ${esc(L(c.t))}</b><span class="sp"></span>${chPct(c)}%</div>${bar(chPct(c))}</div>`).join('')}
${revP}<h2 class="mt">${t('ach')}</h2><div class="grid">${ACH.map(([id,ic])=>`<div class="card" style="opacity:${S.ach[id]?1:.4}"><span style="font-size:1.8rem">${ic}</span> ${t(id)}</div>`).join('')}</div><p class="mt"><button class="btn o" data-reset="1">${t('reset')}</button></p>`},
search(q){q=(q||'').toLowerCase().trim();const r=q?TP.filter(x=>x.hay.includes(q)):[];return`<h1>🔍 ${t('res')}</h1>${r.length?`<div class="tl">${r.map(x=>`<a href="#topic/${x.id}"><span class="dot">${x.n}</span><span>${esc(L(x.c.t))} — ${esc(L(x.t))}</span></a>`).join('')}</div>`:`<p class="mu">${t('nores')}</p>`}`}
};
/* ===== REVISION SYSTEM: flashcards, one-word answers, formulas, reactions, summary, mistakes ===== */
const fy=a=>{a=a.slice();for(let i=a.length-1;i>0;i--){const j=Math.random()*(i+1)|0;[a[i],a[j]]=[a[j],a[i]]}return a};
const hk=s=>{let h=5381;for(const ch of String(s))h=(h*33^ch.codePointAt(0))>>>0;return h.toString(36)};
const RTS=['chapter','quiz','cards','oneword','formulas','reactions','summary','mistakes'];
const rv=c=>c.rev||{fc:[],ow:[],fm:[],rx:[],quick:[],top:[],mist:[]};
const revC=id=>{const c=CH.find(x=>x.id===id);return c&&c.rev?c:null};
const fcKey=f=>hk(f.f);
const fcSt=(c,f)=>((S.fcs[c.id]||{})[fcKey(f)])||'';
const fcCount=c=>{const d=rv(c).fc;let k=0,p=0;d.forEach(f=>{const v=fcSt(c,f);if(v==='k')k++;else if(v==='p')p++});return{k,p,n:d.length-k-p,t:d.length}};
const REVSEC=[['cards','🃏','cards'],['oneword','⚡','ow'],['formulas','🧮','fm'],['reactions','⚗️','rxn'],['summary','📌','summ'],['mistakes','⚠️','mist']];
const revNav=(c,cur)=>`<div class="tabs scr mt">${REVSEC.map(([h,ic,k])=>`<a class="ib ${h===cur?'on':''}" href="#${h}/${c.id}" style="text-decoration:none">${ic} ${t(k)}</a>`).join('')}</div>`;
const revHead=(c,cur,title,icon)=>`<a class="crumb" href="#chapter/${c.id}">← ${esc(L(c.t))}</a><h1>${icon} ${title}</h1><p class="mu">${esc(L(c.t))}</p>${revNav(c,cur)}`;
const revTiles=c=>{const r=rv(c),s=fcCount(c),o=S.ow[c.id];if(!c.rev)return'';
const tile=(h,ic,ti,sub)=>`<a class="rt" href="#${h}/${c.id}"><i>${ic}</i><b>${ti}</b><span class="mu">${sub}</span></a>`;
return`<h2 class="mt">🔁 ${t('revh')}</h2><div class="rgrid">${tile('cards','🃏',t('cards'),`${r.fc.length} · ✓ ${s.k} · × ${s.p}`)}${tile('oneword','⚡',t('ow'),o?`${t('best')} ${o.best}/${o.n}`:`${r.ow.length} ${t('qs')}`)}${tile('formulas','🧮',t('fm'),String(r.fm.length))}${tile('reactions','⚗️',t('rxn'),r.rx.length?String(r.rx.length):t('norx'))}${tile('summary','📌',t('summ'),'10 ✦')}${tile('mistakes','⚠️',t('mist'),String(r.mist.length))}</div>`};

/* ---- Flashcard mode ---- */
const fcDeck=(c,f)=>{const d=rv(c).fc.map((x,i)=>({...x,i}));return f==='p'?d.filter(x=>fcSt(c,x)==='p'):f==='n'?d.filter(x=>!fcSt(c,x)):f==='k'?d.filter(x=>fcSt(c,x)==='k'):d};
function chtml(){const C=CD,c=C.c,s=fcCount(c),f=C.deck[C.i],pc=v=>s.t?v/s.t*100:0;
const chips=[['all',t('fall'),s.t],['p',t('fp2'),s.p],['n',t('fnew'),s.n],['k',t('fk2'),s.k]].map(([k,l,n])=>`<button class="ib ${C.filter===k?'on':''}" data-fl="${k}">${l} (${n})</button>`).join('');
const head=`<a class="crumb" href="#chapter/${c.id}">← ${esc(L(c.t))}</a>${revNav(c,'cards')}<div class="seg mt"><i class="k" style="width:${pc(s.k)}%"></i><i class="p" style="width:${pc(s.p)}%"></i></div><p class="mu sm">✓ ${s.k} · × ${s.p} · ${t('fnew').toLowerCase()} ${s.n} · ${t('of')} ${s.t}</p>`,foot=`<div class="tabs ctr mt">${chips}</div>`;
if(!C.deck.length)return head+`<div class="card">${t('fempty')}</div>${foot}`;
if(C.i>=C.deck.length){if(!C.logged){C.logged=1;log(t('cards')+': '+L(c.t)+' — ✓'+s.k+'/'+s.t)}
return head+`<div class="card ctr"><h2>🎉 ${t('fdone')}</h2><p>✓ ${s.k} · × ${s.p} · ${t('fnew').toLowerCase()} ${s.n}</p><div class="row ctr">${s.p?`<button class="btn" data-fl="p">${t('fpr')}</button>`:''}<button class="btn o" data-rf="restart">${t('fagain')}</button><a class="btn o" href="#chapter/${c.id}">${esc(L(c.t))}</a></div></div>${foot}`}
const st=fcSt(c,f),tg=`<span class="tg t-${f.t}">${t('ty_'+f.t)}</span>`;
return head+`<p class="mu mt ctr sm">${t('card')} ${C.i+1} / ${C.deck.length}${st?` · ${st==='k'?'✓ '+t('know'):'× '+t('needp')}`:''}</p><div class="bar"><i style="width:${(C.i+1)/C.deck.length*100}%"></i></div>
<div class="fcard ${C.flip?'flipped':''}" data-rf="flip" tabindex="0" role="button" aria-label="${t('flip')}"><div class="fin"><div class="fface ff">${tg}<div class="ft">${esc(f.f)}</div><small class="mu">${t('flip')}</small></div><div class="fface fb">${tg}<div class="ft sm">${esc(f.b)}</div></div></div></div>
<div class="row ctr mt"><button class="btn o" data-rf="prev" aria-label="${t('prevc')}">←</button><button class="ib" data-rf="shuf">🔀 ${t('shuffle')}</button><button class="btn o" data-rf="next" aria-label="${t('nextc')}">→</button></div>
<div class="row ctr mt">${sv('fc',c.id+':'+fcKey(f))}</div><div class="row ctr mt"><button class="btn kn" data-rf="k">✓ ${t('know')}</button><button class="btn pn2" data-rf="p">× ${t('needp')}</button></div>
${foot}<p class="mu ctr mt"><small>${t('fkeys')}</small><br><button class="ib" data-rf="reset">${t('freset')}</button></p>`}
function cardAct(a){const C=CD,c=C.c,f=C.deck[C.i],draw=()=>{$('#app').innerHTML=chtml()},fresh=()=>{C.deck=fcDeck(c,C.filter);C.i=0;C.flip=false;C.logged=0;draw()};
if(a==='flip'){if(!f)return;C.flip=!C.flip;const e=$('.fcard');if(e)e.classList.toggle('flipped',C.flip)}
else if(a==='next'){if(C.i<C.deck.length){C.i++;C.flip=false;draw()}}
else if(a==='prev'){if(C.i>0){C.i--;C.flip=false;draw()}}
else if(a==='shuf'){C.deck=fy(C.deck);C.i=0;C.flip=false;C.logged=0;draw()}
else if(a==='restart')fresh();
else if(a==='reset'){if(confirm(t('fresetq'))){delete S.fcs[c.id];save();fresh()}}
else if((a==='k'||a==='p')&&f){(S.fcs[c.id]||={})[fcKey(f)]=a;save();C.i++;C.flip=false;draw()}}

/* ---- One-word answers ---- */
const owNorm=s=>String(s).toLowerCase().replace(/ё/g,'е').replace(/[₀₁₂₃₄₅₆₇₈₉]/g,c=>'₀₁₂₃₄₅₆₇₈₉'.indexOf(c)).replace(/[⁰¹²³⁴⁵⁶⁷⁸⁹]/g,c=>'⁰¹²³⁴⁵⁶⁷⁸⁹'.indexOf(c)).replace(/[−–—]/g,'-').replace(/,/g,'.').replace(/\s+/g,'').replace(/\./g,(m,i,x)=>/\d/.test(x[i-1]||'')&&/\d/.test(x[i+1]||'')?'.':'').replace(/^\+/,'');
const owOk=(q,u)=>{const n=owNorm(u);return !!n&&[q.a,...(q.alt||[])].some(x=>owNorm(x)===n)};
let OW=null;
function owhtml(){const O=OW,c=O.c,n=O.deck.length,q=O.deck[O.i],ok=O.res.filter(r=>r.ok).length,best=S.ow[c.id],head=revHead(c,'oneword',t('ow'),'⚡');
if(!q){if(!O.saved){O.saved=1;if(!O.retry){const b=S.ow[c.id]||{};S.ow[c.id]={best:Math.max(b.best||0,ok),last:ok,n,ts:Date.now()};save();log(t('ow')+': '+L(c.t)+' — '+ok+'/'+n)}}
const miss=O.res.filter(r=>!r.ok),bb=S.ow[c.id];
return head+`<div class="card ctr mt"><h2>${ok} / ${n}</h2>${!O.retry&&bb?`<p class="mu">${t('owbest')}: ${bb.best}/${bb.n}</p>`:''}${bar(Math.round(ok/n*100))}</div>${miss.length?`<h3 class="mt">${t('owmiss')}</h3>${miss.map(r=>`<div class="card mt"><div>${esc(r.q.q)}</div><b>${esc(r.q.a)}</b></div>`).join('')}`:''}<div class="row mt">${miss.length?`<button class="btn" data-ow="retry">${t('owretry')}</button>`:''}<button class="btn o" data-ow="restart">${t('fagain')}</button></div>`}
return head+`<div class="bar mt"><i style="width:${O.i/n*100}%"></i></div><p class="mu">${O.i+1} / ${n} · ✓ ${ok}${best&&!O.retry?` · ${t('owbest')}: ${best.best}/${best.n}`:''}</p><div class="card"><h3>${esc(q.q)}</h3>${O.a?`<p class="${O.a.ok?'okm':'bdm'}">${O.a.ok?t('okm'):t('bad')+' <b>'+esc(q.a)+'</b>'}</p>${!O.a.ok&&O.a.u?`<p class="mu">${t('yours')}: ${esc(O.a.u)}</p>`:''}<button class="btn" data-ow="next">${O.i+1<n?t('nx'):t('res')}</button>`:`<input id="owi" class="ib owin" placeholder="${t('inp')}" autocomplete="off" autocapitalize="off" spellcheck="false" enterkeyhint="done"><div class="row mt"><button class="btn" data-ow="chk">${t('chk')}</button><button class="btn o" data-ow="skip">${t('dk')}</button></div>`}</div>`}
function owAct(a){const O=OW,q=O.deck[O.i],draw=()=>{$('#app').innerHTML=owhtml();const i=$('#owi');if(i)i.focus({preventScroll:true})};
if(a==='chk'){if(O.a||!q)return;const inp=$('#owi'),u=inp?inp.value:'';if(!u.trim()){if(inp)inp.focus();return}const ok=owOk(q,u);O.a={ok,u};O.res.push({q,ok,u});draw()}
else if(a==='skip'){if(O.a||!q)return;O.a={ok:false,u:''};O.res.push({q,ok:false,u:''});draw()}
else if(a==='next'){if(!O.a)return;O.i++;O.a=null;draw()}
else if(a==='restart'){OW={c:O.c,deck:fy(O.c.rev.ow),i:0,res:[],a:null,retry:false};draw()}
else if(a==='retry'){OW={c:O.c,deck:fy(O.res.filter(r=>!r.ok).map(r=>r.q)),i:0,res:[],a:null,retry:true};draw()}}

/* ---- Views: formulas, reactions, summary, mistakes ---- */
Object.assign(V,{
cards(id){const c=revC(id);if(!c)return V.chapters();CD={c,filter:'all',deck:fcDeck(c,'all'),i:0,flip:false,logged:0};return chtml()},
oneword(id){const c=revC(id);if(!c)return V.chapters();OW={c,deck:fy(c.rev.ow),i:0,res:[],a:null,retry:false};return owhtml()},
formulas(id){const c=revC(id);if(!c)return V.chapters();
return revHead(c,'formulas',t('fm'),'🧮')+rv(c).fm.map(x=>`<div class="card fmc mt"><div class="fbig">${esc(x.f)}</div>${sv('fm',c.id+':'+hk(x.f))}<dl class="dl"><dt>${t('fv')}</dt><dd>${esc(x.v)}</dd><dt>${t('fu')}</dt><dd>${esc(x.u)}</dd><dt>${t('fw')}</dt><dd>${esc(x.w)}</dd><dt>${t('fe')}</dt><dd class="f">${esc(x.ex)}</dd><dt class="bad">${t('fmm')}</dt><dd class="bad">❌ ${esc(x.mis)}</dd></dl></div>`).join('')},
reactions(id){const c=revC(id);if(!c)return V.chapters();const r=rv(c).rx;
return revHead(c,'reactions',t('rxn'),'⚗️')+(r.length?r.map(x=>`<div class="card rxc mt"><div class="fbig">${esc(x.eq)}</div>${sv('rx',c.id+':'+hk(x.eq))}<dl class="dl"><dt>${t('rre')}</dt><dd>${esc(x.re)}</dd><dt>${t('rpr')}</dt><dd>${esc(x.pr)}</dd><dt>${t('rco')}</dt><dd>${esc(x.cond)}</dd><dt>${t('rty')}</dt><dd><span class="tg t-reaction">${esc(x.type)}</span></dd><dt>${t('rwh')}</dt><dd>${esc(x.why)}</dd>${x.obs?`<dt>${t('rob')}</dt><dd class="obs">👀 ${esc(x.obs)}</dd>`:''}</dl></div>`).join(''):`<div class="card mt">${t('norxn')}</div>`)},
summary(id){const c=revC(id);if(!c)return V.chapters();const r=rv(c);
return revHead(c,'summary',t('summ'),'📌')+`<div class="sumq"><h2>📌 ${t('qsum')}</h2><ul>${r.quick.map(x=>`<li>${esc(x)}</li>`).join('')}</ul></div><div class="top10"><h2>🏆 ${t('top10')}</h2><ol>${r.top.map((x,i)=>`<li><span class="num">${i+1}</span><span>${esc(x)}</span></li>`).join('')}</ol></div>`},
mistakes(id){const c=revC(id);if(!c)return V.chapters();
return revHead(c,'mistakes',t('mist'),'⚠️')+rv(c).mist.map(m=>`<div class="card mtk mt"><div class="mx">❌ <b>${t('mx')}</b> ${esc(m.x)}</div><div class="mo">✅ <b>${t('mo')}</b> ${esc(m.ok)}</div><div class="mw">💡 <b>${t('rwhy')}</b> ${esc(m.why)}</div></div>`).join('')}
});
document.addEventListener('click',e=>{const a=e.target.closest('[data-rf],[data-fl],[data-ow]');if(!a)return;const d=a.dataset;
if('rf' in d&&CD)cardAct(d.rf);
else if('fl' in d&&CD){CD.filter=d.fl;CD.deck=fcDeck(CD.c,d.fl);CD.i=0;CD.flip=false;CD.logged=0;$('#app').innerHTML=chtml()}
else if('ow' in d&&OW)owAct(d.ow)});
document.addEventListener('keydown',e=>{const r=location.hash.slice(1).split('/')[0],tg=e.target,typing=tg.tagName==='INPUT'||tg.tagName==='TEXTAREA';
if(r==='cards'&&CD&&!typing&&!e.metaKey&&!e.ctrlKey&&!e.altKey){const m={ArrowRight:'next',ArrowLeft:'prev',' ':'flip','1':'k','2':'p'}[e.key];if(m){if(tg.tagName==='BUTTON'&&e.key===' ')return;e.preventDefault();cardAct(m)}}
else if(r==='oneword'&&OW&&e.key==='Enter'&&tg.tagName!=='BUTTON'){e.preventDefault();if(OW.a)owAct('next');else if(tg.id==='owi')owAct('chk')}});
function route(){const [p,a]=(location.hash.slice(1)||'home').split('/');const f=V[p]||V.home;$('#app').innerHTML=f(a?decodeURIComponent(a):a);scrollTo(0,0);{const i=$('#owi');if(i)i.focus({preventScroll:true})}$$('#dn a,#bn a').forEach(e=>e.classList.toggle('on',e.dataset.r===p||(p==='topic'&&e.dataset.r==='chapters')||(p==='game'&&e.dataset.r==='games')||(p==='resources'&&e.dataset.r==='qbank')||(RTS.includes(p)&&e.dataset.r==='chapters')))}
const NAV=[['home','🏠'],['chapters','📚'],['bookmarks','⭐'],['progress','📈']];
function shell(){const q=$('#q')?.value||'',foc=document.activeElement?.id==='q';
$('#hd').innerHTML=`<span class="brand" data-go="#home">🧪 <b>Chem</b> · Vesta</span><nav id="dn">${NAV.map(n=>`<a href="#${n[0]}" data-r="${n[0]}">${t(n[0])}</a>`).join('')}</nav><span class="sp"></span><input id="q" type="search" placeholder="${t('search')}" value="${esc(q)}" aria-label="search"><button class="ib ${lang==='ru'?'on':''}" data-lang="ru">Русский</button><button class="ib ${lang==='en'?'on':''}" data-lang="en">English</button><button class="ib" data-th="1" aria-label="theme">${S.theme==='dark'?'☀️':'🌙'}</button>`;
$('#bn').innerHTML=NAV.map(n=>`<a href="#${n[0]}" data-r="${n[0]}"><i>${n[1]}</i>${t(n[0])}</a>`).join('');
$('#ft').textContent=t('foot');document.documentElement.lang=lang;
const i=$('#q');i.oninput=()=>{location.hash=i.value.trim()?'#search/'+encodeURIComponent(i.value.trim()):'#home'};if(foc)i.focus()}
document.addEventListener('click',e=>{const a=e.target.closest('[data-go],[data-sv],[data-done],[data-tab],[data-lang],[data-th],[data-reset],[data-opt],[data-chk],[data-nx]');if(!a)return;const d=a.dataset;
if('opt' in d||'chk' in d){const q=QZ.qs[QZ.i];const u='opt' in d?d.opt:$('#ans').value;const ok=BANK.ok(q,u);QZ.a={ok};if(ok)QZ.sc++;const r=S.qa[q.id]||={n:0,c:0,l:0,s:0};r.n++;r.ts=Date.now();if(ok){r.c++;r.l=1;r.s++}else{r.l=0;r.s=0}touch();checkAch();save();$('#app').innerHTML=qhtml();return}
if('nx' in d){QZ.i++;QZ.a=null;$('#app').innerHTML=qhtml();return}
if(d.go)location.hash=d.go;
else if(d.lang){lang=d.lang;S.lang=lang;save();shell();route()}
else if(d.th){S.theme=S.theme==='dark'?'light':'dark';document.documentElement.dataset.theme=S.theme;save();shell();route()}
else if(d.tab){$$('.pn').forEach(p=>p.classList.toggle('on',p.id==='pn-'+d.tab));$$('.tabs .ib').forEach(b=>b.classList.toggle('on',b===a))}
else if(d.done){const x=TP.find(z=>z.id===d.done);if(S.topics[d.done])delete S.topics[d.done];else{S.topics[d.done]=Date.now();log(t('visited')+': '+L(x.t))}save();route()}
else if(d.sv)svToggle(a)
else if(d.reset&&confirm(t('sure'))){const l=S.lang,th=S.theme;S={lang:l,theme:th,seen:1};fixS();save();shell();route();toast(t('resetok'))}});
function splash(){const s=$('#splash');s.className='on';const fl=['⚛️','🧪','❤️','✨','H₂O','NaCl','🫧','⭐','🔬','CO₂'];
s.innerHTML=`<div class="in"><div style="font-size:2.6rem">🧪✨</div><h1>${t('g1')}</h1><p>${t('g2')}</p><div class="sg">${t('sign')}</div><button class="btn" id="go">${t('enter')}</button><div style="margin-top:18px"><button class="ib" data-lang="ru">Русский</button> <button class="ib" data-lang="en">English</button></div></div>`+Array.from({length:22},()=>`<span class="fl" style="left:${Math.random()*96}%;font-size:${16+Math.random()*26}px;animation-duration:${9+Math.random()*10}s;animation-delay:-${Math.random()*14}s">${fl[Math.random()*fl.length|0]}</span>`).join('');
s.onclick=e=>{if(e.target.classList.contains('fl'))e.target.classList.add('pop');if(e.target.dataset.lang)setTimeout(splash,0)};
$('#go').onclick=()=>{S.seen=1;save();s.classList.add('out');setTimeout(()=>{s.className='';s.innerHTML=''},800);location.hash='#home'};}
window.VC={sv,ring,bar,chPct,chDone,fcCount,fcKey,hk,fy,TP,ACH,checkAch,qStats,fcReviewed,fixS,isO,setS:o=>{S=o;fixS();save();lang=S.lang;document.documentElement.dataset.theme=S.theme;shell();route()},startQuiz:(c,qs,back)=>{QZ={c,qs,i:0,sc:0,a:null,mix:1,back};$('#app').innerHTML=qhtml()},TR,S:()=>S,save,t,L,esc,log,CH,V,NAV,$,toast,route,lang:()=>lang,TR};window.GAMES_INIT&&GAMES_INIT(window.VC);window.STUDY_INIT&&STUDY_INIT(window.VC);window.PROGRESS_INIT&&PROGRESS_INIT(window.VC);window.CHAPTER_INIT&&CHAPTER_INIT(window.VC);window.QB_INIT&&QB_INIT(window.VC);
addEventListener('hashchange',route);
shell();route();if(!S.seen)splash();
})();
