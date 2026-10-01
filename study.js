/* Question Bank (#qbank) + Study Resources (#resources). Data: qb-data.js (your exact Q&A), resources.js (links), chapter data (starter questions). */
window.STUDY_INIT=C=>{
const {t,esc,L,CH,V,NAV,$,TR}=C,S=()=>C.S(),T=(a,b)=>C.lang()==='en'?b:a;
Object.assign(TR.ru,{qbank:'Вопросы',resources:'Материалы'});Object.assign(TR.en,{qbank:'Questions',resources:'Resources'});
const hk=s=>{let h=5381;for(const c of String(s))h=(h*33^c.codePointAt(0))>>>0;return h.toString(36)};
const nz=s=>String(s).toLowerCase().replace(/ё/g,'е');
/* ---------- build the bank ---------- */
const tn=(c,tp)=>{if(tp==null||tp===0||tp==='')return{tk:'g',tl:['Общее','General']};const n=typeof tp==='number'?tp:(/^ch\d+-t(\d+)$/.exec(tp)||[])[1];
 if(n&&c.tp[n-1])return{tk:'t'+ +n,tl:c.tp[n-1],tn:+n};return{tk:'c:'+tp,tl:[String(tp),String(tp)]}};
const RXT=[[/соедин/i,4],[/разлож/i,5],[/замещ/i,6],[/обмен/i,7]];
const build=()=>{const out=[];
(window.QB_EXACT||[]).forEach((e,i)=>{const c=CH.find(x=>x.id===e.ch),m=+e.marks;if(!c||![2,3,5].includes(m)||e.q==null||e.a==null){console.warn('QB_EXACT #'+(i+1)+' skipped: needs ch (ch01–ch05), marks (2/3/5), q and a');return}
 out.push({id:e.id||'x-'+hk(e.ch+'|'+e.q),ch:c.id,marks:m,d:e.d||e.difficulty||'',q:String(e.q),a:String(e.a),src:'exact',...tn(c,e.topic??e.tp)})});
CH.forEach(c=>{const R=c.rev||{},ek=Object.keys(EX).filter(k=>k.indexOf(c.id+'-')===0),P=(id,m,d,tp,q,a)=>out.push({id,ch:c.id,marks:m,d,q,a,src:'course',...tn(c,tp)}),
 rt=x=>c.id==='ch04'?(RXT.find(r=>r[0].test(x.type))||[0,0])[1]:0,lb=(a,b)=>T(a,b)+' ';
 /* 2 marks */
 (c.q||[]).filter(q=>q.type==='fill'||q.type==='num').forEach(q=>P(q.id,2,q.d,q.tp,q.q,String(q.a)+(q.ex?'\n'+q.ex:'')));
 (R.fc||[]).filter(f=>['def','concept','fact','exception'].includes(f.t)).forEach((f,i)=>P(c.id+'-fc'+i,2,'easy',0,f.f,f.b));
 (R.ow||[]).forEach((o,i)=>P(c.id+'-ow'+i,2,'easy',0,o.q,o.a));
 ek.forEach(k=>(EX[k].test||[]).forEach((x,i)=>P(k+'-test'+i,2,'medium',k,x.q,x.a)));
 /* 3 marks */
 (R.fm||[]).forEach((x,i)=>P(c.id+'-f3-'+i,3,'medium',0,T('Запишите формулу «'+x.f+'». Что означают обозначения и в каких единицах измеряются величины?','Write the formula “'+x.f+'”. What do the symbols mean and what are the units?'),lb('Обозначения:','Symbols:')+x.v+'\n'+lb('Единицы:','Units:')+x.u));
 (R.mist||[]).forEach((m,i)=>P(c.id+'-m3-'+i,3,'medium',0,lb('Найдите ошибку и исправьте:','Find the mistake and correct it:')+m.x,lb('Верно:','Correct:')+m.ok+'\n'+lb('Почему:','Why:')+m.why));
 ek.forEach(k=>(EX[k].why||[]).forEach((x,i)=>P(k+'-why'+i,3,'medium',k,x.q,x.a)));
 (R.rx||[]).forEach((x,i)=>P(c.id+'-r3-'+i,3,'medium',rt(x),lb('Назовите тип реакции и условия её протекания:','Give the reaction type and its conditions:')+x.eq,lb('Тип:','Type:')+x.type+'\n'+lb('Условия:','Conditions:')+x.cond));
 if((R.quick||[]).length)P(c.id+'-quick',3,'easy',0,T('Кратко изложите главу «'+L(c.t)+'».','Summarise the chapter “'+L(c.t)+'” briefly.'),R.quick.map(x=>'• '+x).join('\n'));
 /* 5 marks */
 (R.rx||[]).forEach((x,i)=>P(c.id+'-r5-'+i,5,'hard',rt(x),lb('Опишите реакцию','Describe the reaction')+x.eq+T(': реагенты, продукты, условия, тип, объяснение, наблюдения.',': reactants, products, conditions, type, explanation, observations.'),
  [lb('Реагенты:','Reactants:')+x.re,lb('Продукты:','Products:')+x.pr,lb('Условия:','Conditions:')+x.cond,lb('Тип:','Type:')+x.type,lb('Объяснение:','Explanation:')+x.why,x.obs?lb('Наблюдения:','Observations:')+x.obs:''].filter(Boolean).join('\n')));
 (R.fm||[]).forEach((x,i)=>P(c.id+'-f5-'+i,5,'hard',0,T('Объясните формулу «'+x.f+'»: обозначения, единицы, когда применять, пример, частая ошибка.','Explain the formula “'+x.f+'”: symbols, units, when to use it, an example, a common mistake.'),
  [lb('Обозначения:','Symbols:')+x.v,lb('Единицы:','Units:')+x.u,lb('Когда применять:','When to use:')+x.w,lb('Пример:','Example:')+x.ex,lb('Частая ошибка:','Common mistake:')+x.mis].join('\n')));
 if((R.top||[]).length)P(c.id+'-top',5,'medium',0,T('Назовите 10 самых важных фактов главы «'+L(c.t)+'».','State the 10 most important facts of the chapter “'+L(c.t)+'”.'),R.top.map((x,i)=>(i+1)+'. '+x).join('\n'));
 ek.forEach(k=>{const x=EX[k];if(!x.sci)return;const n=+k.split('-t')[1],ti=c.tp[n-1]?T(...c.tp[n-1]):k;
  P(k+'-topic5',5,'hard',k,T('Объясните тему «'+ti+'» и приведите примеры.','Explain the topic “'+ti+'” and give examples.'),
   [L(x.s),x.sci,(x.st||[]).length?(x.st||[]).map((s,i)=>(i+1)+'. '+L(s)).join('\n'):'',(x.ex||[]).map(e=>lb('Пример:','Example:')+e.t+' — '+e.b).join('\n')].filter(Boolean).join('\n\n'))})});
return out};
const ITC={};const items=()=>ITC[C.lang()]||(ITC[C.lang()]=build());
/* ---------- state ---------- */
const QF={ch:'all',tp:'all',m:'all',d:'all',st:'all',q:'',cur:null,pg:0,open:false},PS=10,qb=()=>{const s=S();return s.qb||={imp:{},done:{}}};
const filt=()=>{const q=nz(QF.q.trim()),b=qb();return items().filter(x=>(QF.ch==='all'||x.ch===QF.ch)&&(QF.tp==='all'||x.tk===QF.tp)&&(QF.m==='all'||x.marks===+QF.m)&&(QF.d==='all'||x.d===QF.d)&&
 (QF.st==='all'||(QF.st==='imp'?b.imp[x.id]:QF.st==='done'?b.done[x.id]:!b.done[x.id]))&&(!q||nz(x.q+' '+x.a).includes(q)))};
const DN={easy:['Лёгкий','Easy'],medium:['Средний','Medium'],hard:['Сложный','Hard']},MK=m=>m+' '+T(m===5?'баллов':'балла','marks');
const disp=x=>x.src==='exact'?x.a.replace(/^\n+|\n+$/g,''):x.a,dq=x=>x.src==='exact'?x.q.replace(/^\n+|\n+$/g,''):x.q;
const topics=()=>{if(QF.ch==='all')return[];const m=new Map();items().filter(x=>x.ch===QF.ch).forEach(x=>{if(!m.has(x.tk))m.set(x.tk,{k:x.tk,l:T(...x.tl),n:x.tn||(x.tk==='g'?999:998)})});return[...m.values()].sort((a,b)=>a.n-b.n)};
/* ---------- question bank view ---------- */
const chips=(k,arr)=>arr.map(([v,l])=>`<button class="ib ${String(QF[k])===String(v)?'on':''}" data-qb="${k==='m'?'mk':'flt'}" data-k="${k}" data-v="${v}">${l}</button>`).join('');
const sel=(k,arr,dis)=>`<select class="ib qsel" data-qbf="${k}" ${dis?'disabled':''}>${arr.map(([v,l])=>`<option value="${esc(v)}" ${String(QF[k])===String(v)?'selected':''}>${esc(l)}</option>`).join('')}</select>`;
const cur=()=>{const list=filt();let i=list.findIndex(x=>x.id===QF.cur);if(i<0&&list.length){i=0;QF.cur=list[0].id;QF.open=false}return{list,i}};
const goto=(list,i)=>{QF.cur=list[i].id;QF.open=false;QF.pg=Math.floor(i/PS)};
const viewHTML=()=>{const{list,i}=cur(),b=qb(),n=list.length,dn=list.filter(x=>b.done[x.id]).length,im=list.filter(x=>b.imp[x.id]).length;
if(!n)return`<div class="card ctr"><p>${T('Ничего не найдено.','Nothing found.')}</p><button class="btn o" data-qb="clear">${T('Сбросить фильтры','Clear filters')}</button></div>`;
const x=list[i],c=CH.find(z=>z.id===x.ch),pg=Math.min(QF.pg,Math.ceil(n/PS)-1),sl=list.slice(pg*PS,pg*PS+PS);
return`<p class="mu sm">${T('Найдено','Found')}: <b>${n}</b> · ✅ ${dn} · ⭐ ${im}</p><div class="seg"><i class="k" style="width:${dn/n*100}%"></i></div>
<div class="card qbc mt"><div class="row" style="gap:6px;flex-wrap:wrap"><span class="tg t-reaction">${MK(x.marks)}</span><span class="tg t-concept">${c.icon} ${esc(L(c.t))}</span><span class="tg t-fact">${esc(T(...x.tl))}</span>${x.d?`<span class="tg t-exam">${T(...DN[x.d]||[x.d,x.d])}</span>`:''}${x.src==='exact'?`<span class="tg t-formula">✍️ ${T('Ваш текст (без изменений)','Your text (verbatim)')}</span>`:`<span class="tg t-def">📘 ${T('Из материалов курса','From course material')}</span>`}</div>
<h3 class="qbx mt">${esc(dq(x))}</h3><p><button class="btn ${QF.open?'o':''}" data-qb="open">${QF.open?T('Скрыть ответ','Hide answer'):T('Показать ответ','Show answer')}</button></p>${QF.open?`<div class="qba qbx">${esc(disp(x))}</div>`:''}
<div class="row mt"><button class="ib ${b.imp[x.id]?'on':''}" data-qb="imp">⭐ ${T('Важное','Important')}</button><button class="ib ${b.done[x.id]?'on':''}" data-qb="done">✅ ${T('Выполнено','Completed')}</button></div>
<div class="row mt qnav"><button class="btn o" data-qb="prev">← ${T('Назад','Previous')}</button><span class="sp mu ctr">${i+1} / ${n}</span><button class="btn o" data-qb="rnd">🎲</button><button class="btn" data-qb="next">${T('Далее','Next')} →</button></div></div>
<div class="mt">${sl.map(z=>`<button class="qbr ${z.id===x.id?'on':''}" data-qb="focus" data-id="${esc(z.id)}"><b class="qbm">${z.marks}</b><span class="qbt">${esc(dq(z))}</span><span>${b.imp[z.id]?'⭐':''}${b.done[z.id]?'✅':''}</span></button>`).join('')}</div>
${n>PS?`<div class="row ctr mt"><button class="ib" data-qb="pg" data-v="-1" ${pg<1?'disabled':''}>←</button><span class="mu">${pg+1} / ${Math.ceil(n/PS)}</span><button class="ib" data-qb="pg" data-v="1" ${(pg+1)*PS>=n?'disabled':''}>→</button></div>`:''}`};
const qbHTML=()=>{const all=items(),tp=topics();
return`<h1>📝 ${T('Банк вопросов','Question Bank')}</h1><p class="mu">${T('Выбери главу и раздел (2 / 3 / 5 баллов) — или используй фильтры.','Pick a chapter and a section (2 / 3 / 5 marks) — or use the filters.')}</p>
<div class="card" style="overflow-x:auto"><table class="gtb"><tr><th></th>${[2,3,5].map(m=>`<th>${MK(m)}</th>`).join('')}</tr>${CH.map(c=>`<tr><td>${c.icon} ${esc(L(c.t)).slice(0,24)}</td>${[2,3,5].map(m=>`<td><button class="ib" data-qb="set" data-ch="${c.id}" data-m="${m}">${all.filter(x=>x.ch===c.id&&x.marks===m).length}</button></td>`).join('')}</tr>`).join('')}</table></div>
<div class="card mt"><input id="qbs" class="ib gin" type="search" placeholder="🔍 ${T('Поиск по вопросам и ответам…','Search questions and answers…')}" value="${esc(QF.q)}" autocomplete="off">
<div class="tabs mt">${chips('m',[['all',T('Все','All')],[2,MK(2)],[3,MK(3)],[5,MK(5)]])}</div>
<div class="row" style="gap:8px;flex-wrap:wrap">${sel('ch',[['all',T('Все главы','All chapters')],...CH.map(c=>[c.id,c.icon+' '+L(c.t)])])}${sel('tp',[['all',QF.ch==='all'?T('Тема (выбери главу)','Topic (pick a chapter)'):T('Все темы','All topics')],...tp.map(x=>[x.k,x.l])],QF.ch==='all')}${sel('d',[['all',T('Любая сложность','Any difficulty')],['easy',T(...DN.easy)],['medium',T(...DN.medium)],['hard',T(...DN.hard)]])}${sel('st',[['all',T('Все','All')],['imp','⭐ '+T('Важные','Important')],['done','✅ '+T('Выполненные','Completed')],['todo',T('Не выполненные','Not completed')]])}</div></div>
<div id="qbv" class="mt">${viewHTML()}</div>`};
V.qbank=a=>{const m=/^(ch\d+)(?:\.(\d))?$/.exec(a||'');if(m&&CH.some(c=>c.id===m[1]))Object.assign(QF,{ch:m[1],tp:'all',m:m[2]||'all',pg:0,cur:null,open:false});return qbHTML()};
const inQb=()=>location.hash.indexOf('#qbank')===0,full=()=>{$('#app').innerHTML=qbHTML()},part=()=>{const e=$('#qbv');if(e)e.innerHTML=viewHTML()};
document.addEventListener('click',e=>{const a=e.target.closest('[data-qb]');if(!a||!inQb())return;const d=a.dataset,k=d.qb,{list,i}=cur(),x=list[i],b=qb();
if(k==='set'){Object.assign(QF,{ch:d.ch,m:d.m,tp:'all',pg:0,cur:null,open:false});full();scrollTo({top:$('#qbv').offsetTop-80,behavior:'smooth'});return}
if(k==='mk'||k==='flt'){QF[d.k]=d.v;QF.pg=0;QF.cur=null;QF.open=false;full();return}
if(k==='clear'){Object.assign(QF,{ch:'all',tp:'all',m:'all',d:'all',st:'all',q:'',cur:null,pg:0,open:false});full();return}
if(k==='focus'){QF.cur=d.id;QF.open=false;part();return}
if(k==='pg'){const n=Math.ceil(list.length/PS);QF.pg=Math.max(0,Math.min(n-1,QF.pg+ +d.v));part();return}
if(!x)return;
if(k==='open')QF.open=!QF.open;
else if(k==='imp'){b.imp[x.id]?delete b.imp[x.id]:b.imp[x.id]=1;C.save()}
else if(k==='done'){b.done[x.id]?delete b.done[x.id]:b.done[x.id]=1;C.save()}
else if(k==='next')goto(list,(i+1)%list.length);
else if(k==='prev')goto(list,(i-1+list.length)%list.length);
else if(k==='rnd'){let j=Math.random()*list.length|0;if(list.length>1&&j===i)j=(j+1)%list.length;goto(list,j)}
part()});
document.addEventListener('change',e=>{const k=e.target.dataset&&e.target.dataset.qbf;if(!k||!inQb())return;QF[k]=e.target.value;if(k==='ch')QF.tp='all';QF.pg=0;QF.cur=null;QF.open=false;full()});
document.addEventListener('input',e=>{if(e.target.id!=='qbs'||!inQb())return;QF.q=e.target.value;QF.pg=0;QF.cur=null;QF.open=false;part()});
/* ---------- study resources view ---------- */
const RS=[['questionPapers','📄',['Экзаменационные работы','Question Papers']],['twoMarkPDFs','2️⃣',['PDF: вопросы на 2 балла','2-Mark PDFs']],['threeMarkPDFs','3️⃣',['PDF: вопросы на 3 балла','3-Mark PDFs']],
['fiveMarkPDFs','5️⃣',['PDF: вопросы на 5 баллов','5-Mark PDFs']],['chapterSummaries','📌',['Конспекты глав (PDF)','Chapter Summary PDFs']],['other',' 📚'.trim(),['Другие материалы','Other Study Material']]];
const RF={q:'',ch:'all'},rl=k=>(window.RESOURCES&&Array.isArray(window.RESOURCES[k]))?window.RESOURCES[k]:[];
const rch=r=>{const c=CH.find(x=>x.id===r.chapter);return c?{k:c.id,l:c.icon+' '+L(c.t)}:{k:String(L(r.chapter)||''),l:String(L(r.chapter)||'')}};
const okUrl=u=>/^https?:\/\//i.test(String(u||'').trim());
const rfilt=k=>rl(k).filter(r=>(RF.ch==='all'||rch(r).k===RF.ch)&&(!RF.q.trim()||nz([L(r.title),L(r.description),rch(r).l].join(' ')).includes(nz(RF.q.trim()))));
const rcard=r=>{const c=rch(r);return`<div class="card rsc"><div class="row"><span style="font-size:1.7rem">📄</span><div><h3 style="margin:0">${esc(L(r.title))}</h3>${c.l?`<span class="tg t-concept">${esc(c.l)}</span>`:''}</div></div>${r.description?`<p class="mu">${esc(L(r.description))}</p>`:''}${okUrl(r.url)?`<a class="btn" href="${esc(String(r.url).trim())}" target="_blank" rel="noopener noreferrer">📖 ${T('Открыть PDF','Open PDF')}</a>`:`<button class="btn o" disabled>${T('Нет ссылки','No link')}</button>`}</div>`};
const rsView=()=>RS.map(([k,ic,nm])=>{const a=rfilt(k),tot=rl(k).length;return`<h2 class="mt" id="rs-${k}">${ic} ${T(...nm)} <small class="mu">(${a.length}${a.length!==tot?'/'+tot:''})</small></h2>${a.length?`<div class="grid g2">${a.map(rcard).join('')}</div>`:`<div class="card rse mu">${tot?T('Ничего не найдено.','Nothing matches.'):T('Пока нет ссылок. Добавь строку в js/resources.js → ','No links yet. Add a line in js/resources.js → ')+'<code>'+k+'</code>'}</div>`}`}).join('');
V.resources=()=>{const cs=new Map();RS.forEach(([k])=>rl(k).forEach(r=>{const c=rch(r);if(c.k)cs.set(c.k,c.l)}));
return`<h1>📚 ${T('Материалы для учёбы','Study Resources')}</h1><p class="mu">${T('Ссылки открываются в новой вкладке (Google Drive / PDF).','Links open in a new tab (Google Drive / PDF).')}</p>
<div class="card"><input id="rss" class="ib gin" type="search" placeholder="🔍 ${T('Поиск по материалам…','Search resources…')}" value="${esc(RF.q)}" autocomplete="off">${cs.size?`<div class="tabs mt"><button class="ib ${RF.ch==='all'?'on':''}" data-rs="ch" data-v="all">${T('Все главы','All chapters')}</button>${[...cs].map(([k,l])=>`<button class="ib ${RF.ch===k?'on':''}" data-rs="ch" data-v="${esc(k)}">${esc(l)}</button>`).join('')}</div>`:''}
<div class="tabs mt">${RS.map(([k,ic,nm])=>`<button class="ib" data-rs="go" data-v="${k}">${ic} ${T(...nm)} · ${rl(k).length}</button>`).join('')}</div></div><div id="rsv">${rsView()}</div>`};
const inRs=()=>location.hash.indexOf('#resources')===0;
document.addEventListener('click',e=>{const a=e.target.closest('[data-rs]');if(!a||!inRs())return;if(a.dataset.rs==='ch'){RF.ch=a.dataset.v;$('#app').innerHTML=V.resources()}else{const el=document.getElementById('rs-'+a.dataset.v);if(el)el.scrollIntoView({behavior:'smooth',block:'start'})}});
document.addEventListener('input',e=>{if(e.target.id!=='rss'||!inRs())return;RF.q=e.target.value;$('#rsv').innerHTML=rsView()});
/* ---------- nav + chapter page links ---------- */
NAV.splice(NAV.findIndex(n=>n[0]==='bookmarks'),0,['qbank','📝'],['resources','📚']);
const oc=V.chapter;V.chapter=id=>{const h=oc(id),c=CH.find(x=>x.id===id);return c?h+`<div class="row mt"><a class="btn o" href="#qbank/${c.id}">📝 ${T('Банк вопросов','Question Bank')}</a><a class="btn o" href="#resources">📚 ${T('Материалы','Resources')}</a></div>`:h};
};
