/* ===== PROGRESS + PERSONALIZATION: dashboard, achievements text, Daily Chemistry, mistake review,
   bookmarks/favourites page, export / import / reset. Uses the shared VC object from app.js.
   Personal messages are NOT here: edit js/personal.js. ===== */
window.PROGRESS_INIT=VC=>{
const {t,L,esc,CH,V,TP,ring,bar,chPct,chDone,fcCount,hk,sv,ACH,isO}=VC,S=VC.S,$=VC.$;
/* ---- translations for this module (ru / en) ---- */
const X=(k,ru,en)=>{VC.TR.ru[k]=ru;VC.TR.en[k]=en};
X('a3','Первая глава пройдена','First chapter complete');X('a6','7 дней подряд','7-day streak');X('a7','100 вопросов','100 questions answered');
X('a8','Мастер реакций','Reaction Master');X('a9','100 карточек','100 flashcards reviewed');X('a10','90% точности','90% accuracy');X('a11','Все главы пройдены','All chapters completed');
X('h_a1','Отметь первый урок пройденным','Mark your first lesson as done');X('h_a2','Занимайся 3 дня подряд','Study 3 days in a row');X('h_a3','Пройди все темы одной главы','Finish every topic of one chapter');
X('h_a4','Добавь что-нибудь в закладки','Bookmark something');X('h_a5','Пройди половину уроков','Finish half of all lessons');X('h_a6','Занимайся 7 дней подряд','Study 7 days in a row');
X('h_a7','Ответь на 100 вопросов','Answer 100 quiz questions');X('h_a8','Пройди «Конструктор реакций» в каждой главе с реакциями','Complete Reaction Builder in every chapter that has reactions');
X('h_a9','Отметь 100 карточек «знаю» или «повторить»','Mark 100 flashcards');X('h_a10','Точность ≥ 90% после 30+ ответов','Accuracy ≥ 90% after 30+ answers');X('h_a11','Пройди все темы во всех главах','Finish every topic in every chapter');
X('bmadd2','В закладки','Bookmark');X('bmdel2','В закладках','Bookmarked');X('favadd','В избранное','Favourite');X('favdel','В избранном','Favourited');X('remove','Убрать','Remove');
X('revw','Повторение','Review');X('daily','Химия дня','Daily Chemistry');X('dConcept','Понятие дня','Concept of the day');X('dFormula','Формула дня','Formula of the day');
X('dReaction','Реакция дня','Reaction of the day');X('dQuestion','Вопрос дня','Question of the day');X('dCard','Карточка дня','Flashcard of the day');X('showAns','Показать ответ','Show answer');
X('review','Работа над ошибками','Mistake review');X('prMist','Мои ошибки','My mistakes');X('prNew','Ещё не пробовала','Not tried yet');X('prMast','Освоенные','Mastered');
X('prMistD','Вопросы, на которые последний ответ был неверным.','Questions whose latest answer was wrong.');X('prNewD','Вопросы, на которые ты ещё не отвечала.','Questions you have never answered.');
X('prMastD','Два верных ответа подряд — вопрос освоен.','Two correct answers in a row = mastered.');X('practice','Тренироваться','Practise');X('allChs','Все главы','All chapters');
X('noQ','Здесь пока пусто — это хорошо!','Nothing here yet — good!');X('listMist','Показать ошибки с ответами','Show mistakes with answers');X('reviewMix','Повторение','Review');
X('bkTitle','Закладки и избранное','Bookmarks & favourites');X('bmSec','Закладки','Bookmarks');X('favSec','Избранное','Favourites');X('unavail','Материал больше недоступен','This item is no longer available');X('open2','Открыть','Open');
X('kTopic','Урок','Lesson');X('kQ','Вопрос','Question');X('kFm','Формула','Formula');X('kRx','Реакция','Reaction');X('kFc','Карточка','Flashcard');X('bkEmpty','Пока ничего нет. Нажимай ☆ или 🤍 на уроках, вопросах, формулах, реакциях и карточках.','Nothing here yet. Tap ☆ or 🤍 on lessons, questions, formulas, reactions and flashcards.');
X('pOverall','Общий прогресс (уроки)','Overall progress (lessons)');X('pAnswered','Ответов на вопросы','Questions answered');X('pAcc','Точность','Accuracy');X('pMist','Ошибки','Mistakes');X('pMast','Освоено','Mastered');X('pNew','Не тронуто','Untried');
X('pKnown','Карточки «знаю»','Cards known');X('pRev','Карточек отмечено','Cards reviewed');X('pBm','Закладки','Bookmarks');X('pFav','Избранное','Favourites');X('pPts','Очки в играх','Game points');
X('pCur','Серия','Current streak');X('pBest','Лучшая серия','Best streak');X('pChap','Главы','Chapters');X('pLessons','Уроки','Lessons');X('pQuiz','Тест','Quiz');X('pCards','Карточки','Cards');
X('pTopics','Темы главы','Chapter topics');X('pGames','Результаты игр','Game scores');X('pAch','Достижения','Achievements');X('unl','открыто','unlocked');
X('g_quiz','Битва','Battle');X('g_rx','Реакции','Reactions');X('g_fm','Формулы','Formulas');X('g_mt','Пары','Match');X('g_esc','Побег','Escape');X('chWord','Глава','Chapter');
X('dm','Данные и резервная копия','Data & backup');X('dmHint','Прогресс хранится только в этом браузере. Сохрани копию файлом — так его можно перенести на другое устройство.','Progress lives only in this browser. Save a backup file to move it to another device.');
X('exp','Скачать прогресс','Export progress');X('imp','Загрузить прогресс','Import progress');X('rst','Сбросить прогресс','Reset progress');
X('expOk','Файл сохранён','Backup saved');X('impOk','Прогресс загружен','Progress imported');X('impBad','Не получилось прочитать файл: это не резервная копия прогресса.','Could not read that file: it is not a progress backup.');
X('impAsk','Заменить текущий прогресс данными из файла?','Replace your current progress with the file contents?');X('resetok','Прогресс сброшен','Progress reset');
X('sure','Точно сбросить весь прогресс? Это нельзя отменить.','Really reset all progress? This cannot be undone.');

/* ---- question index ---- */
const QMAP={},QALL=[];CH.forEach(c=>(Array.isArray(c.q)?c.q:[]).forEach(q=>{if(q&&q.id&&!QMAP[q.id]){QMAP[q.id]={q,c};QALL.push(q.id)}}));
const ansOf=q=>q.type==='mcq'?String((q.o||[])[q.a]):q.type==='tf'?t(q.a?'ktrue':'kfalse'):String(q.a);
const sets=()=>{const qa=S().qa;return{mist:QALL.filter(i=>qa[i]&&qa[i].l===0),neu:QALL.filter(i=>!qa[i]),mast:QALL.filter(i=>qa[i]&&qa[i].s>=2)}};

/* ---- Daily Chemistry: same date -> same content, no backend ---- */
const dayNum=d=>{d=d||new Date();return Math.floor(Date.UTC(d.getFullYear(),d.getMonth(),d.getDate())/864e5)};
const pools=()=>{const P={con:[],fm:[],rx:[],q:[],fc:[]};CH.forEach(c=>{const r=c.rev;if(r){(r.quick||[]).forEach(x=>P.con.push({c,x}));(r.fm||[]).forEach(x=>P.fm.push({c,x}));(r.rx||[]).forEach(x=>P.rx.push({c,x}));(r.fc||[]).forEach(x=>P.fc.push({c,x}))}
(c.q||[]).forEach(q=>{if(q&&q.type==='mcq'&&Array.isArray(q.o))P.q.push({c,x:q})})});return P};
const pick=(a,n,d)=>a.length?a[(d*7919+n*104729)%a.length]:null;
const daily=d=>{const P=pools(),n=d==null?dayNum():d;return{con:pick(P.con,1,n),fm:pick(P.fm,2,n),rx:pick(P.rx,3,n),q:pick(P.q,4,n),fc:pick(P.fc,5,n)}};
const dailyHTML=()=>{const D=daily(),dt=new Date().toLocaleDateString(VC.lang()==='en'?'en-GB':'ru-RU',{day:'numeric',month:'long'});
const blk=(ic,k,b)=>`<div class="card dq"><h3>${ic} ${t(k)}</h3>${b}</div>`;let h=`<h2 class="mt">✨ ${t('daily')} <small class="mu">${dt}</small></h2><div class="grid dgrid">`;
if(D.con)h+=blk('💡','dConcept',`<p>${esc(D.con.x)}</p><small class="mu">${esc(L(D.con.c.t))}</small>`);
if(D.fm)h+=blk('🧮','dFormula',`<div class="fbig">${esc(D.fm.x.f)}</div><p class="mu sm">${esc(D.fm.x.w)}</p>${sv('fm',D.fm.c.id+':'+hk(D.fm.x.f))}`);
if(D.rx)h+=blk('⚗️','dReaction',`<div class="fbig">${esc(D.rx.x.eq)}</div><p class="mu sm">${esc(D.rx.x.type)} · ${esc(D.rx.x.cond)}</p>${sv('rx',D.rx.c.id+':'+hk(D.rx.x.eq))}`);
if(D.q){const q=D.q.x;h+=blk('❓','dQuestion',`<p><b>${esc(q.q)}</b></p><ol type="A" class="dopt">${q.o.map(o=>`<li>${esc(o)}</li>`).join('')}</ol><details><summary>${t('showAns')}</summary><p><b>${esc(ansOf(q))}</b></p><p class="mu">${esc(q.ex||'')}</p></details>${sv('q',q.id)}`)}
if(D.fc)h+=blk('🃏','dCard',`<details><summary><b>${esc(D.fc.x.f)}</b></summary><p>${esc(D.fc.x.b)}</p></details>${sv('fc',D.fc.c.id+':'+VC.fcKey(D.fc.x))}`);
return h+'</div>'};

/* ---- Mistake review ---- */
let PRC='all';const MIX={id:'mix',t:{ru:'Повторение',en:'Review'}};
const flt=a=>PRC==='all'?a:a.filter(i=>QMAP[i].c.id===PRC);
V.review=()=>{const s=sets(),f={mist:flt(s.mist),neu:flt(s.neu),mast:flt(s.mast)};
const chips=`<div class="tabs scr">${[['all',t('allChs')],...CH.map(c=>[c.id,c.icon+' '+L(c.t)])].map(([k,l])=>`<button class="ib ${PRC===k?'on':''}" data-prc="${k}" aria-pressed="${PRC===k}">${esc(l)}</button>`).join('')}</div>`;
const card=(k,ic,ti,de)=>`<div class="card"><h3>${ic} ${t(ti)}</h3><p class="mu sm">${t(de)}</p><div class="row"><b class="big">${f[k].length}</b><span class="sp"></span><button class="btn" data-pr="${k}" ${f[k].length?'':'disabled'}>${t('practice')}</button></div></div>`;
return`<h1>🔁 ${t('review')}</h1>${chips}<div class="grid mt">${card('mist','⚠️','prMist','prMistD')}${card('neu','🌱','prNew','prNewD')}${card('mast','🏅','prMast','prMastD')}</div>
${f.mist.length?`<details class="card mt"><summary>${t('listMist')} (${f.mist.length})</summary>${f.mist.slice(0,40).map(i=>`<div class="mtk mt"><b>${esc(QMAP[i].q.q)}</b><div class="mo">✅ ${esc(ansOf(QMAP[i].q))}</div>${QMAP[i].q.ex?`<div class="mu sm">${esc(QMAP[i].q.ex)}</div>`:''}</div>`).join('')}</details>`:`<p class="mu mt">${t('noQ')}</p>`}`};

/* ---- Bookmarks & favourites ---- */
const KIND={topic:['📖','kTopic'],q:['❓','kQ'],fm:['🧮','kFm'],rx:['⚗️','kRx'],fc:['🃏','kFc']};
const resolve=key=>{const [k,id='']=String(key).split('|'),[cid,h]=id.split(':');
if(k==='topic'){const x=TP.find(z=>z.id===id);return x&&{title:L(x.c.t)+' — '+L(x.t),href:'#topic/'+id}}
if(k==='q'){const r=QMAP[id];return r&&{title:r.q.q,body:ansOf(r.q)+(r.q.ex?'\n'+r.q.ex:''),href:'#quiz/'+r.c.id}}
const c=CH.find(z=>z.id===cid),rv=c&&c.rev;if(!rv)return null;
if(k==='fm'){const x=(rv.fm||[]).find(z=>hk(z.f)===h);return x&&{title:x.f,body:x.w+'\n'+x.ex,href:'#formulas/'+cid}}
if(k==='rx'){const x=(rv.rx||[]).find(z=>hk(z.eq)===h);return x&&{title:x.eq,body:x.type+' · '+x.cond+'\n'+x.why,href:'#reactions/'+cid}}
if(k==='fc'){const x=(rv.fc||[]).find(z=>hk(z.f)===h);return x&&{title:x.f,body:x.b,href:'#cards/'+cid}}return null};
const blist=l=>{const a=S()[l].slice().sort((x,y)=>Object.keys(KIND).indexOf(x.split('|')[0])-Object.keys(KIND).indexOf(y.split('|')[0]));
return a.length?a.map(key=>{const r=resolve(key),kd=KIND[key.split('|')[0]]||['•','kTopic'];
return`<div class="card mt bki"><div class="row"><span aria-hidden="true">${kd[0]}</span><span class="tg">${t(kd[1])}</span><b class="grow">${esc(r?r.title:t('unavail'))}</b><button class="ib sv" data-sv="${l}" data-k="${esc(key)}" aria-pressed="true" aria-label="${t('remove')}" title="${t('remove')}">✕</button></div>${r&&r.body?`<details><summary>${t('showAns')}</summary><p style="white-space:pre-line">${esc(r.body)}</p></details>`:''}${r&&r.href?`<a class="btn o" href="${r.href}">${t('open2')}</a>`:''}</div>`}).join(''):`<p class="mu">${t('bkEmpty')}</p>`};
V.bookmarks=()=>`<div id="bkpage"><h1>⭐ ${t('bkTitle')}</h1><h2>⭐ ${t('bmSec')} (${S().bm.length})</h2>${blist('bm')}<h2 class="mt">❤️ ${t('favSec')} (${S().fav.length})</h2>${blist('fav')}</div>`;

/* ---- Progress dashboard ---- */
const GAMES=['quiz','rx','fm','mt','esc'];
V.progress=()=>{const s=S(),qa=s.qa,per={};let n=0,c=0;Object.keys(qa).forEach(id=>{const r=qa[id],m=QMAP[id];if(!m||!isO(r))return;const p=per[m.c.id]||={n:0,c:0};p.n+=r.n||0;p.c+=r.c||0;n+=r.n||0;c+=r.c||0});
const sh=sets(),acc=n?Math.round(c/n*100):0,done=Object.keys(s.topics).filter(k=>TP.some(x=>x.id===k)).length,ov=TP.length?Math.round(done/TP.length*100):0;
let known=0,total=0;CH.forEach(x=>{const f=fcCount(x);known+=f.k;total+=f.t});
const pts=Object.values(s.g).reduce((a,x)=>a+((x&&x.best)||0),0),active=n||done||known;
const stat=(ic,l,v)=>`<div class="card stat"><span aria-hidden="true">${ic}</span><h2>${v}</h2><small class="mu">${t(l)}</small></div>`;
const chap=x=>{const p=per[x.id]||{n:0,c:0},f=fcCount(x),o=s.ow[x.id],tps=TP.filter(z=>z.c===x);
return`<div class="card mt"><div class="row"><b>${x.icon} ${esc(L(x.t))}</b><span class="sp"></span><b>${chPct(x)}%</b></div>${bar(chPct(x))}
<p class="mu sm">${t('pLessons')}: ${chDone(x)}/${x.tp.length} · ${t('pQuiz')}: ${p.n?Math.round(p.c/p.n*100)+'% ('+p.n+')':'—'} · ${t('pCards')}: ${f.k}/${f.t}${o?' · ⚡ '+o.best+'/'+o.n:''}</p>
<details><summary>${t('pTopics')}</summary><ul class="tpl">${tps.map(z=>`<li>${s.topics[z.id]?'✅':'⬜'} <a href="#topic/${z.id}">${esc(L(z.t))}</a></li>`).join('')}</ul></details></div>`};
const gtab=`<div class="tw"><table class="gt"><thead><tr><th>${t('chWord')}</th>${GAMES.map(g=>`<th>${t('g_'+g)}</th>`).join('')}</tr></thead><tbody>${CH.map(x=>`<tr><th scope="row">${x.icon} ${esc(L(x.t))}</th>${GAMES.map(g=>`<td>${((s.g[x.id+':'+g]||{}).best)||0}</td>`).join('')}</tr>`).join('')}</tbody></table></div>`;
const unl=ACH.filter(a=>s.ach[a[0]]).length;
return`<h1>📈 ${t('progress')}</h1><div class="card row hero">${ring(ov)}<div class="grow"><h3>${t('pOverall')}</h3><span class="mu">${done}/${TP.length}</span><p class="proud">${t(active?'proud':'nudge')}</p></div></div>
<div class="grid mt">${stat('🔥','pCur',s.streak.cur+' '+t('days'))}${stat('🌟','pBest',s.streak.best+' '+t('days'))}${stat('📝','pAnswered',n)}${stat('🎯','pAcc',n?acc+'%':'—')}${stat('⚠️','pMist',sh.mist.length)}${stat('🏅','pMast',sh.mast.length)}${stat('🌱','pNew',sh.neu.length)}${stat('🃏','pKnown',known+'/'+total)}${stat('🔁','pRev',VC.fcReviewed())}${stat('⭐','pBm',s.bm.length)}${stat('❤️','pFav',s.fav.length)}${stat('🎮','pPts',pts)}</div>
<p class="mt"><a class="btn" href="#review">🔁 ${t('review')}</a> <a class="btn o" href="#bookmarks">⭐ ${t('bkTitle')}</a></p>
<h2 class="mt">${t('pChap')}</h2>${CH.map(chap).join('')}<h2 class="mt">🎮 ${t('pGames')}</h2>${gtab}
<h2 class="mt">🏆 ${t('pAch')} (${unl}/${ACH.length})</h2><div class="grid">${ACH.map(([id,ic])=>{const d=s.ach[id];return`<div class="card ach ${d?'on':''}"><span class="aic" aria-hidden="true">${ic}</span><div><b>${t(id)}</b><br><small class="mu">${d?t('unl')+' · '+new Date(+d||Date.now()).toLocaleDateString(VC.lang()==='en'?'en-GB':'ru-RU'):t('h_'+id)}</small></div></div>`}).join('')}</div>
<h2 class="mt">💾 ${t('dm')}</h2><div class="card"><p class="mu sm">${t('dmHint')}</p><div class="row"><button class="btn" data-dm="export">⬇️ ${t('exp')}</button><button class="btn o" data-dm="import">⬆️ ${t('imp')}</button><input type="file" id="impf" accept=".json,application/json" hidden><button class="btn o danger" data-reset="1">🗑 ${t('rst')}</button></div></div>`};

/* ---- export / import ---- */
const KEYS=['topics','bm','fav','recent','q','fc','g','ach','fcs','ow','qa','gst','bal','streak','mist','lang','theme','seen','last'];
const doExport=()=>{const b=new Blob([JSON.stringify({app:'vesta-chemistry',version:1,exported:new Date().toISOString(),data:S()},null,2)],{type:'application/json'}),a=document.createElement('a');
a.href=URL.createObjectURL(b);a.download='vesta-chemistry-progress-'+new Date().toISOString().slice(0,10)+'.json';document.body.appendChild(a);a.click();setTimeout(()=>{URL.revokeObjectURL(a.href);a.remove()},500);VC.toast(t('expOk'))};
const clean=o=>{const c={};KEYS.forEach(k=>{if(k in o)c[k]=o[k]});
if(isO(c.gst)){['streak','flaw','rx80','fast'].forEach(k=>c.gst[k]=+c.gst[k]||0)}else delete c.gst;
if(Array.isArray(c.recent))c.recent=c.recent.filter(r=>isO(r)&&+r.ts&&typeof r.l==='string');
if(isO(c.qa))Object.keys(c.qa).forEach(k=>{if(!isO(c.qa[k]))delete c.qa[k]});return c};
const doImport=txt=>{let o;try{o=JSON.parse(txt)}catch(e){return VC.toast(t('impBad'))}
if(isO(o)&&o.app==='vesta-chemistry')o=o.data;if(!isO(o)||!KEYS.some(k=>k in o))return VC.toast(t('impBad'));
if(!confirm(t('impAsk')))return;VC.setS(clean(o));VC.toast(t('impOk'))};
document.addEventListener('click',e=>{const a=e.target.closest('[data-dm],[data-pr],[data-prc],[data-sv]');if(!a)return;const d=a.dataset;
if(d.dm==='export')doExport();else if(d.dm==='import'){const f=$('#impf');f&&f.click()}
else if(d.prc){PRC=d.prc;VC.route()}
else if(d.pr){const s=sets()[d.pr]||[],qs=VC.fy(flt(s)).slice(0,15).map(i=>QMAP[i].q);if(qs.length)VC.startQuiz(MIX,qs,'#review')}
else if('sv' in d&&$('#bkpage'))VC.route()});
document.addEventListener('change',e=>{if(e.target.id!=='impf')return;const f=e.target.files&&e.target.files[0];if(!f)return;const r=new FileReader();r.onload=()=>doImport(String(r.result));r.onerror=()=>VC.toast(t('impBad'));r.readAsText(f);e.target.value=''});
VC.dailyHTML=dailyHTML;VC.daily=daily;VC.dayNum=dayNum;VC.doImport=doImport;
};
