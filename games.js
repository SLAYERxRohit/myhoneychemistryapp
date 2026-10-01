/* Chemistry Games. Loaded before app.js; app.js calls GAMES_INIT(VC). Content comes from CH/BANK/REV (chapter data).
   Routes: #games[/chNN] dashboard (Chapter -> Game), #game/chNN.game. Saves to S.g (scores), S.ach (g_*), S.gst (stats). */
window.GAMES_INIT=C=>{
const {t,esc,L,log,CH,V,NAV,$}=C,S=()=>C.S(),T=(a,b)=>C.lang()==='en'?b:a;
const sh=a=>{a=a.slice();for(let i=a.length-1;i>0;i--){const j=Math.random()*(i+1)|0;[a[i],a[j]]=[a[j],a[i]]}return a},pick=(a,n)=>sh(a).slice(0,n),uq=a=>[...new Set(a)];
const SB='₀₁₂₃₄₅₆₇₈₉',sb=s=>String(s).replace(/([A-Za-z)])(\d+)/g,(m,a,d)=>a+[...d].map(x=>SB[x]).join('')),asc=s=>String(s).replace(/[₀-₉]/g,c=>SB.indexOf(c));
const GM=[['quiz','⚔️',['Битва викторины','Quiz Battle'],['Таймер, жизни, серии, сложность','Timer, lives, streaks, difficulty']],
['rx','⚗️',['Конструктор реакций','Reaction Builder'],['Продукты, реагенты, коэффициенты, цепочки','Products, reagents, balancing, chains']],
['fm','🧮',['Мастер формул','Formula Master'],['Формулы, расчёты, единицы, подсказки','Formulas, calculations, units, hints']],
['mt','🧩',['Химические пары','Chemistry Match'],['Понятия, реакции, формулы, элементы','Concepts, reactions, formulas, elements']],
['esc',' 🔐'.trim(),['Комната химика','Chemistry Escape Room'],['5 этапов: понятие, вещество, реакция, расчёт, замок','5 stages: concept, substance, reaction, maths, lock']]];
const gn=m=>T(...m[2]),gd=m=>T(...m[3]),chap=id=>CH.find(c=>c.id===id),RV=c=>c.rev||{};
const key=(c,g)=>c.id+':'+g,stat=(c,g)=>S().g[key(c,g)]||{best:0,plays:0,done:0},tot=s=>Object.values(s.g).reduce((a,x)=>a+(x.best||0),0);
const ACHS=[['1','🎮',['Первая игра','First game'],s=>Object.keys(s.g).length>=1],['2','🔥',['Серия ×5 в викторине','Quiz streak ×5'],s=>(s.gst||{}).streak>=5],
['3','💯',['Викторина без потерь','Flawless quiz'],s=>(s.gst||{}).flaw>=1],['4','⚗️',['Мастер реакций (≥80%)','Reaction master (≥80%)'],s=>(s.gst||{}).rx80>=1],
['5','⚡',['Пары за 90 секунд','Match in 90 s'],s=>(s.gst||{}).fast>=1],['6','🔐',['Побег из комнаты','Escaped the room'],s=>Object.keys(s.g).some(k=>/:esc$/.test(k)&&s.g[k].done)],
['7','🏅',['Все 5 игр одной главы','All 5 games in one chapter'],s=>CH.some(c=>GM.every(m=>(s.g[key(c,m[0])]||{}).done))],['8','💎',['10 000 очков','10,000 points'],s=>tot(s)>=10000]];
const fin=(c,g,sc,done,ex)=>{const s=S(),o=s.g[key(c,g)]||={best:0,plays:0,done:0},nb=sc>o.best;o.plays++;o.best=Math.max(o.best,sc);if(done)o.done++;o.ts=Date.now();
const st=s.gst||={streak:0,flaw:0,rx80:0,fast:0};for(const a in ex)st[a]=a==='streak'?Math.max(st[a],ex[a]):st[a]+ex[a];
ACHS.forEach(a=>{if(!s.ach['g_'+a[0]]&&a[3](s)){s.ach['g_'+a[0]]=Date.now();C.toast(a[1]+' '+T(...a[2]))}});log(T('Игра','Game')+': '+gn(GM.find(m=>m[0]===g))+' — '+sc);return nb};
/* ---------- chapter content helpers ---------- */
const TY=[[/соедин/i,['Соединение','Combination']],[/разлож/i,['Разложение','Decomposition']],[/замещ/i,['Замещение','Substitution']],[/обмен/i,['Обмен','Exchange']]];
const tyN=s=>{const m=TY.find(x=>x[0].test(s||''));return m?T(...m[1]):(s||'')};
const ION=[['Na → Na⁺ + e⁻','1s²2s²2p⁶3s¹ → 1s²2s²2p⁶: уходит 1 электрон, конфигурация как у Ne.',1],['Mg → Mg²⁺ + 2e⁻','Уходят 3s²: остаётся 1s²2s²2p⁶ (как у Ne).',1],
['Al → Al³⁺ + 3e⁻','Уходят 3s²3p¹: остаётся 1s²2s²2p⁶.',1],['K → K⁺ + e⁻','Уходит 4s¹: конфигурация как у Ar.',1],['Ca → Ca²⁺ + 2e⁻','Уходят 4s²: конфигурация Ar.',1],
['Cl + e⁻ → Cl⁻','3s²3p⁵ → 3s²3p⁶: внешний уровень заполнен, как у Ar.',0],['F + e⁻ → F⁻','2s²2p⁵ → 2s²2p⁶: как у Ne.',0],['O + 2e⁻ → O²⁻','2s²2p⁴ → 2s²2p⁶: как у Ne.',0],['S + 2e⁻ → S²⁻','3s²3p⁴ → 3s²3p⁶: как у Ar.',0]];
const rxList=c=>{const o=[],add=(eq,x)=>{const[l,r]=eq.split(/\s*(?:→|=)\s*/);if(l&&r)o.push({eq,l:l.trim(),r:r.trim(),type:'',cond:'',why:'',obs:'',...x})};
if(c.id==='ch01')ION.forEach(([eq,why,lo])=>add(eq,{why,cond:T('ионизация','ionisation'),type:lo?T('Отдача электронов','Electron loss'):T('Присоединение электронов','Electron gain')}));
(RV(c).rx||[]).forEach(r=>add(r.eq,{type:tyN(r.type),cond:r.cond,why:r.why,obs:r.obs}));(c.rx||[]).forEach(r=>add(sb(r.eq.replace(' = ',' → ')),{type:tyN(r.type),cond:r.cond}));return o};
const spec=s=>s.split(/\s\+\s/).map(x=>x.replace(/[↑↓]/g,'').replace(/^\d+/,'').trim());
const balc=x=>{const l=spec(x.l),r=spec(x.r),sp=[...l,...r],n=sp.length,nl=l.length;if(n>6||sp.some(f=>/[⁺⁻]|^e$/.test(f)))return null;let P;try{P=sp.map(f=>BANK.parse(asc(f)))}catch(e){return null}
const el=uq(P.flatMap(p=>Object.keys(p)));if(!el.length)return null;let best=null;const co=[];
const rec=i=>{if(i===n){if(el.every(e=>P.reduce((s,p,j)=>s+(j<nl?1:-1)*co[j]*(p[e]||0),0)===0)){const s=co.reduce((a,b)=>a+b);if(!best||s<best.s)best={s,c:co.slice()}}return}for(let v=1;v<=6;v++){co[i]=v;rec(i+1)}};rec(0);return best&&{sp,nl,c:best.c}};
const fmtEq=(b,co)=>b.sp.map((f,i)=>(co[i]>1?co[i]:'')+f).reduce((a,f,i)=>a+(i===b.nl?' → ':i?' + ':'')+f,'');
const nq=q=>q.type==='mcq'?{p:q.q,o:q.o,a:q.o[q.a],ex:q.ex,r:q}:q.type==='tf'?{p:q.q,o:[T('Верно','True'),T('Неверно','False')],a:q.a?T('Верно','True'):T('Неверно','False'),ex:q.ex,r:q}:{p:q.q,o:null,a:String(q.a),ex:q.ex,r:q};
/* ---------- engine ---------- */
let G=null,IV=0;const stop=()=>{clearInterval(IV);IV=0},tick=fn=>{stop();IV=setInterval(()=>{if(!G||location.hash.indexOf('#game/')!==0){stop();return}fn()},1000)};
const draw=()=>{$('#app').innerHTML=VW[G.game]();const i=$('#gi');if(i)i.focus({preventScroll:true})};
const head=c=>`<a class="crumb" href="#games/${c.id}">← ${T('Игры','Games')} · ${esc(L(c.t))}</a>`;
const opts=(q,a,rm)=>q.o.filter(o=>!rm||!rm.includes(o)).map(o=>`<button class="btn o gop ${a?(o===q.a?'gok':a.u===o?'gbad':''):''}" data-g="o" data-i="${q.o.indexOf(o)}" ${a?'disabled':''}>${esc(o)}</button>`).join('');
const inp=(m)=>`<input id="gi" class="ib gin" autocomplete="off" autocapitalize="off" spellcheck="false" ${m||''} placeholder="${T('Ваш ответ','Your answer')}"><div class="row mt"><button class="btn" data-g="chk">${T('Проверить','Check')}</button></div>`;
const fb=(ok,ans,ex,nx)=>`<p class="${ok?'okm':'bdm'}">${ok?T('Верно! ✅','Correct! ✅'):T('Неверно. Ответ:','Wrong. Answer:')+' <b>'+esc(ans)+'</b>'}</p><p class="mu">${ex||''}</p><button class="btn" data-g="next">${nx||T('Дальше','Next')}</button>`;
const bar=p=>`<div class="bar"><i style="width:${Math.max(0,Math.min(100,p))}%"></i></div>`;
const res=(g,lines)=>`<div class="card ctr"><h2>${g.sc}</h2>${g.nb?`<p class="okm">🏆 ${T('Новый рекорд!','New best!')}</p>`:''}<p class="mu">${T('Рекорд','Best')}: ${stat(g.c,g.game).best}</p>${lines}<div class="row ctr mt"><button class="btn" data-g="again">🔁 ${T('Играть снова','Play again')}</button><a class="btn o" href="#games/${g.c.id}">🎮 ${T('Все игры','All games')}</a></div></div>`;
const VW={},ACT={};
/* ===== GAME 1: QUIZ BATTLE ===== */
const QD=[['easy',['Лёгкий','Easy'],20],['medium',['Средний','Medium'],18],['hard',['Сложный','Hard'],14],['mixed',['Микс','Mixed'],16]];
const qn=()=>{const g=G;g.q=g.qs[g.i];g.a=null;g.tt=g.tl=g.base+(g.q.o?0:10);tick(()=>{g.tl--;const e=$('#gt');if(e){e.textContent=g.tl+'s';$('#gtb').style.width=Math.max(0,g.tl/g.tt*100)+'%'}if(g.tl<=0)qa(null)})};
const qa=u=>{const g=G;stop();const ok=u!==null&&(g.q.o?u===g.q.a:BANK.ok(g.q.r,u));g.a={ok,u};if(ok){g.sc+=100+g.tl*3+Math.min(g.st,10)*10;g.st++;g.bs=Math.max(g.bs,g.st);g.ok++}else{g.hp--;g.lost++;g.st=0}draw()};
VW.quiz=()=>{const g=G,c=g.c,h=head(c);
if(g.ph==='menu')return h+`<h1>⚔️ ${gn(GM[0])}</h1><p class="mu">${esc(L(c.t))} · ${T('Выбери сложность','Choose difficulty')}</p><div class="grid g2">${QD.map(d=>`<button class="card gdf" data-g="go" data-d="${d[0]}"><h3>${T(...d[1])}</h3><span class="mu">⏱ ${d[2]}s · ❤️×3 · 12 ${T('вопросов','questions')}</span></button>`).join('')}</div>`;
if(g.ph==='end')return h+res(g,`<p>✓ ${g.ok}/${g.i+1} · 🔥 ${g.bs} · ❤️ ${g.hp}</p>${g.hp>0?'<p>🎉 '+T('Ты прошла все вопросы!','You made it through!')+'</p>':'<p>💔 '+T('Жизни закончились','Out of lives')+'</p>'}`);
const q=g.q,a=g.a;return h+`<div class="row gh"><span>${'❤️'.repeat(g.hp)+'🖤'.repeat(3-g.hp)}</span><span class="sp"></span><span>🔥 ${g.st}</span><span>⭐ ${g.sc}</span></div><div class="bar mt"><i id="gtb" style="width:${g.tl/g.tt*100}%"></i></div><p class="mu">${g.i+1}/${g.qs.length} · ${g.q.r.d} · <span id="gt">${g.tl}s</span></p><div class="card"><h3>${esc(q.p)}</h3>${q.o?opts(q,a):(a?'':inp())}${a?fb(a.ok,q.a,esc(q.ex||'')):''}</div>`};
ACT.quiz=(k,d)=>{const g=G;
if(k==='go'){const D0=QD.find(x=>x[0]===d.d);let p=g.c.q.filter(q=>d.d==='mixed'||q.d===d.d);if(p.length<8)p=g.c.q;Object.assign(g,{ph:'play',base:D0[2],qs:pick(p,12).map(nq),i:0,hp:3,sc:0,st:0,bs:0,ok:0,lost:0});qn();draw()}
else if(k==='o'||k==='chk'){if(g.a)return;const u=k==='o'?g.q.o[d.i]:($('#gi')||{}).value;if(k==='chk'&&!(u||'').trim())return;qa(u)}
else if(k==='next'){if(g.hp<=0||g.i>=g.qs.length-1){g.ph='end';g.nb=fin(g.c,'quiz',g.sc,g.hp>0,{streak:g.bs,flaw:g.hp>0&&!g.lost?1:0})}else{g.i++;qn()}draw()}};
/* ===== GAME 2: REACTION BUILDER ===== */
const RXK=['prod','type','prod','reag','type','bal','chain','bal','reag','chain'],STD=[['Соединение','Combination'],['Разложение','Decomposition'],['Замещение','Substitution'],['Обмен','Exchange']];
const mkRx=(g,k)=>{const L_=g.L,x=pick(L_,1)[0],ALL=CH.flatMap(rxList),dis=f=>{const s=uq(L_.map(f)).filter(v=>v!==f(x)),o=uq(ALL.map(f)).filter(v=>v!==f(x)&&!s.includes(v));return[...pick(s,3),...pick(o,3)].slice(0,3)},cd=x.cond?` <small>(${esc(x.cond)})</small>`:'',
ex=`<b>${esc(x.eq)}</b>${x.why?'. '+esc(x.why):''}${x.obs?'<br>👀 '+esc(x.obs):''}`;
if(k==='prod')return{kind:k,x,ex,p:`${T('Реагенты','Reactants')}: <b>${esc(x.l)}</b>${cd}<br>${T('Что образуется?','What forms?')}`,o:sh([x.r,...dis(z=>z.r)]),a:x.r};
if(k==='reag')return{kind:k,x,ex,p:`${T('Продукты','Products')}: <b>${esc(x.r)}</b>${cd}<br>${T('Из чего это получают?','What gives this?')}`,o:sh([x.l,...dis(z=>z.l)]),a:x.l};
if(k==='type'){if(!x.type)return null;const ty=uq([...L_.map(z=>z.type),...STD.map(s=>T(...s))]).filter(v=>v&&v!==x.type);return{kind:k,x,ex,p:`<b>${esc(x.eq)}</b>${cd}<br>${T('Какой тип реакции?','Which reaction type?')}`,o:sh([x.type,...pick(ty,3)]),a:x.type}}
if(k==='bal'){const b=balc(x);return b?{kind:k,x,ex,b,p:`${T('Расставьте коэффициенты. Условия','Balance it. Conditions')}: ${esc(x.cond||'—')}`}:null}
if(k==='chain'){const skip=['O₂','H₂O','H₂','Cl₂','N₂'],nx=a=>L_.filter(b=>b!==a&&spec(a.r).some(s=>!skip.includes(s)&&spec(b.l).includes(s))),A=sh(L_).find(a=>nx(a).length);if(!A)return null;
const B=pick(nx(A),1)[0],s=spec(A.r).find(s=>!skip.includes(s)&&spec(B.l).includes(s)),bad=L_.filter(z=>z!==A&&!nx(A).includes(z));if(bad.length<3)return null;
return{kind:k,x:A,ex:`${esc(A.eq)} → ${esc(B.eq)}<br>${T('Продукт','Product')} <b>${esc(s)}</b> ${T('становится реагентом следующей реакции','becomes a reactant in the next reaction')}.`,p:`${T('Цепочка','Chain')}: <b>${esc(A.eq)}</b><br>${T('Продукт','Product')} <b>${esc(s)}</b> → ${T('какая реакция идёт дальше?','which reaction comes next?')}`,o:sh([B.eq,...pick(bad,3).map(z=>z.eq)]),a:B.eq}}
return null};
const nxRx=()=>{const g=G,k=RXK[g.i];g.q=mkRx(g,k)||mkRx(g,'prod');g.a=null;if(g.q.kind==='bal')g.co=g.q.b.sp.map(()=>1)};
const rxa=(ok)=>{const g=G;g.a={ok,u:g.q.kind==='bal'?null:g.ua};if(ok){g.sc+=100+Math.min(g.st,5)*20+(g.i>=5?50:0);g.st++;g.ok++}else g.st=0;draw()};
VW.rx=()=>{const g=G,c=g.c,h=head(c);if(g.ph==='end')return h+res(g,`<p>✓ ${g.ok}/${RXK.length} (${Math.round(g.ok/RXK.length*100)}%)</p>`);
const q=g.q,a=g.a,lv=g.i<3?1:g.i<6?2:3;let body;
if(q.kind==='bal'){const n=q.b.sp.length;body=`<div class="fbig">${q.b.sp.map((f,i)=>`<span class="stp"><button class="ib" data-g="st" data-i="${i}" data-d="-1">−</button><b>${g.co[i]}</b><button class="ib" data-g="st" data-i="${i}" data-d="1">+</button> ${esc(f)}</span>${i===q.b.nl-1?' → ':i<n-1?' + ':''}`).join('')}</div>${a?'':`<div class="row mt"><button class="btn" data-g="chk">${T('Проверить','Check')}</button></div>`}${a?`<p class="mt"><b>${esc(fmtEq(q.b,q.b.c))}</b></p>`:''}`}
else body=opts(q,a);
return h+`<h1>⚗️ ${gn(GM[1])}</h1><div class="row gh"><span>${T('Уровень','Level')} ${'★'.repeat(lv)}</span><span class="sp"></span><span>🔥 ${g.st}</span><span>⭐ ${g.sc}</span></div>${bar(g.i/RXK.length*100)}<p class="mu">${g.i+1}/${RXK.length}</p><div class="card"><h3>${q.p}</h3>${body}${a?fb(a.ok,q.kind==='bal'?fmtEq(q.b,q.b.c):q.a,q.ex,g.i>=RXK.length-1?T('Результат','Result'):null):''}</div>`};
ACT.rx=(k,d)=>{const g=G,q=g.q;
if(k==='o'){if(g.a)return;g.ua=q.o[d.i];rxa(g.ua===q.a)}
else if(k==='st'){if(g.a)return;g.co[d.i]=Math.max(1,Math.min(9,g.co[d.i]+ +d.d));draw()}
else if(k==='chk'){if(g.a)return;rxa(q.b.c.every((v,i)=>v===g.co[i]))}
else if(k==='next'){if(g.i>=RXK.length-1){g.ph='end';const p=g.ok/RXK.length;g.nb=fin(g.c,'rx',g.sc,p>=.6,{rx80:p>=.8?1:0})}else{g.i++;nxRx()}draw()}};
/* ===== GAME 3: FORMULA MASTER ===== */
const FMK=['id','cloze','unit','num','id','cloze','num','unit','num','num'],TOK=/([A-Za-zА-Яа-я₀-₉ᵢ]+)/;
const mkFm=(c,k)=>{const fm=RV(c).fm||[],x=pick(fm,1)[0];
if(k==='id'){if(fm.length<4)return null;return{kind:k,p:T('Какая формула нужна, когда: ','Which formula applies when: ')+`«${esc(x.w)}»`,o:sh([x.f,...pick(fm.filter(z=>z!==x),3).map(z=>z.f)]),a:x.f,ex:`<b>${esc(x.f)}</b> — ${esc(x.v)}<br>${esc(x.ex)}`}}
if(k==='unit'){const u=uq(fm.map(z=>z.u)).filter(v=>v!==x.u);if(u.length<3)return null;return{kind:k,p:`<b>${esc(x.f)}</b><br>${T('Какие единицы у величин?','What are the units?')}`,o:sh([x.u,...pick(u,3)]),a:x.u,ex:`${esc(x.v)}<br>${esc(x.ex)}`}}
if(k==='cloze'){const pa=x.f.split(TOK),ci=pa.map((s,i)=>/^[A-Za-z]{1,2}$/.test(s)?i:-1).filter(i=>i>=0);if(!ci.length)return null;const j=pick(ci,1)[0],m=pa[j];pa[j]='▢';
const pool=uq([...fm.flatMap(z=>z.f.split(TOK).filter(s=>/^[A-Za-z]{1,2}$/.test(s))),'m','M','n','V','N']).filter(v=>v!==m);return{kind:k,p:`${T('Впишите пропущенный символ','Fill in the missing symbol')}:<div class="fbig">${esc(pa.join(''))}</div>`,o:sh([m,...pick(pool,3)]),a:m,ex:`<b>${esc(x.f)}</b> — ${esc(x.v)}`}}
if(k==='num'){const nums=c.q.filter(q=>q.type==='num');if(!nums.length)return null;const r=pick(nums,1)[0];return{kind:k,r,p:esc(r.q),a:String(r.a),steps:(r.ex||'').split(/;\s*|\.\s+(?=[A-ZА-Я])/).filter(Boolean),ex:''}}return null};
const nxFm=()=>{const g=G;g.q=mkFm(g.c,FMK[g.i])||mkFm(g.c,'num')||mkFm(g.c,'id');g.a=null;g.h=0;g.rm=null};
const fma=u=>{const g=G,q=g.q,ok=q.kind==='num'?BANK.ok(q.r,u):u===q.a;g.a={ok,u};if(ok){g.sc+=Math.max(25,100-25*g.h)+Math.min(g.st,5)*10;g.st++;g.ok++}else g.st=0;draw()};
VW.fm=()=>{const g=G,c=g.c,h=head(c);if(g.ph==='end')return h+res(g,`<p>✓ ${g.ok}/${FMK.length}</p>`);const q=g.q,a=g.a,fm=RV(c).fm||[];
const hint=q.kind==='num'?(g.h>=1?`<div class="card mt">💡 ${T('Формулы главы','Chapter formulas')}: <span class="f">${fm.map(z=>esc(z.f)).join(' · ')}</span>${g.h>1?'<ol>'+q.steps.slice(0,g.h-1).map(s=>`<li>${esc(s)}</li>`).join('')+'</ol>':''}</div>`:''):(g.rm?`<p class="mu">💡 ${T('Два неверных ответа убраны','Two wrong answers removed')}</p>`:'');
const steps=a&&q.kind==='num'?`<p class="mu">${T('Решение по шагам','Step-by-step')}:</p><ol>${q.steps.map(s=>`<li>${esc(s)}</li>`).join('')}</ol>`:'';
return h+`<h1>🧮 ${gn(GM[2])}</h1><div class="row gh"><span>${T('Вопрос','Question')} ${g.i+1}/${FMK.length}</span><span class="sp"></span><span>🔥 ${g.st}</span><span>⭐ ${g.sc}</span></div>${bar(g.i/FMK.length*100)}<div class="card mt"><h3>${q.p}</h3>${q.kind==='num'?(a?'':inp('inputmode="decimal"')):opts(q,a,g.rm)}${hint}${a?fb(a.ok,q.a,q.ex+steps,g.i>=FMK.length-1?T('Результат','Result'):null):(q.kind==='num'&&g.h>q.steps.length||g.rm&&q.kind!=='num'?'':`<p class="mt"><button class="ib" data-g="hint">💡 ${T('Подсказка (−25)','Hint (−25)')}</button></p>`)}</div>`};
ACT.fm=(k,d)=>{const g=G,q=g.q;
if(k==='o'){if(!g.a)fma(q.o[d.i])}else if(k==='chk'){const u=($('#gi')||{}).value;if(!g.a&&(u||'').trim())fma(u)}
else if(k==='hint'){if(g.a)return;if(q.kind==='num')g.h++;else if(!g.rm){g.h++;g.rm=pick(q.o.filter(o=>o!==q.a),2)}draw()}
else if(k==='next'){if(g.i>=FMK.length-1){g.ph='end';g.nb=fin(g.c,'fm',g.sc,g.ok/FMK.length>=.6,{})}else{g.i++;nxFm()}draw()}};
/* ===== GAME 4: CHEMISTRY MATCH ===== */
const mkCats=c=>{const dd=(p,many)=>{const a=[],sl=new Set,sr=new Set;p.forEach(([l,r])=>{if(!l||!r||sl.has(l)||(!many&&sr.has(r)))return;sl.add(l);sr.add(r);a.push([l,r])});return a};
const o=[],fcs=RV(c).fc||[],add=(n,p,many)=>{p=dd(p,many);if(p.length>=5&&(!many||uq(p.map(x=>x[1])).length>=2))o.push({n,p,many})},q=c.q,mm=(re,ty,f)=>q.filter(z=>z.type===ty&&re.test(z.q)).map(z=>f(z.q.match(re),z)),el=f=>f.f.match(/: (.+) \((\w+), Z=/);
add(T('Понятие ↔ определение','Concept ↔ definition'),fcs.filter(f=>f.t==='def').map(f=>[f.f.replace(/^Что такое /,'').replace(/\?$/,''),f.b.split(/\n|\. /)[0].slice(0,90)]));
add(T('Реакция ↔ тип реакции','Reaction ↔ type'),rxList(c).map(x=>[x.eq,x.type]),1);
add(T('Элемент ↔ символ','Element ↔ symbol'),(c.fc||[]).map(f=>{const m=el(f);return m&&[m[1],m[2]]}).filter(Boolean));
add(T('Элемент ↔ электронная формула','Element ↔ configuration'),(c.fc||[]).map(f=>{const m=el(f);return m&&[m[1]+' ('+m[2]+')',f.b.split('\n')[0]]}).filter(Boolean));
add(T('Вещество ↔ вид связи','Substance ↔ bond type'),mm(/веществе (.+?)\?$/,'mcq',(m,z)=>[m[1],z.o[z.a]]),1);
add(T('Атом ↔ степень окисления','Atom ↔ oxidation state'),mm(/элемента (\S+) в соединении (.+?)[?.]?$/,'num',(m,z)=>[m[1]+T(' в ',' in ')+m[2],(z.a>0?'+':'')+z.a]),1);
add(T('Валентности ↔ формула','Valencies ↔ formula'),mm(/Составьте формулу соединения: (.+?)\.?$/,'fill',(m,z)=>[m[1],sb(z.a)]));
add(T('Формула ↔ Mr','Formula ↔ Mr'),mm(/Вычислите Mr\((.+)\)/,'num',(m,z)=>['Mr('+m[1]+')',String(z.a)]));return o};
const mtRound=()=>{const g=G,r=g.rs[g.r];let pr=pick(r.p,5);if(r.many&&uq(pr.map(x=>x[1])).length<2)pr=r.p.slice(0,6);Object.assign(g,{pairs:pr,cat:r,Ls:sh(pr.map(p=>p[0])),Rs:sh(uq(pr.map(p=>p[1]))),dn:[],sel:null})};
VW.mt=()=>{const g=G,c=g.c,h=head(c);if(g.ph==='end')return h+res(g,`<p>⏱ ${g.el}s · ✗ ${g.wr}</p>`);
return h+`<h1>🧩 ${gn(GM[3])}</h1><div class="row gh"><span>${T('Раунд','Round')} ${g.r+1}/3</span><span class="sp"></span><span>⏱ <span id="gt">${g.el}s</span></span><span>🔥 ${g.cb}</span><span>⭐ ${g.sc}</span></div><p class="mu mt">${esc(g.cat.n)} · ${g.dn.length}/${g.pairs.length}</p><div class="mtg"><div>${g.Ls.map((l,i)=>`<button class="mc ${g.dn.includes(l)?'mdn':''} ${g.sel===i?'msel':''}" data-g="l" data-i="${i}" ${g.dn.includes(l)?'disabled':''}>${esc(l)}</button>`).join('')}</div><div>${g.Rs.map((r,i)=>{const u=!g.cat.many&&g.dn.some(l=>g.pairs.find(p=>p[0]===l)[1]===r);return`<button class="mc ${u?'mdn':''}" data-g="r" data-i="${i}" ${u?'disabled':''}>${esc(r)}</button>`}).join('')}</div></div><p class="mu sm mt">${T('Выбери слева, затем справа','Tap left, then right')}${g.cat.many?' · '+T('справа можно выбирать повторно','right items can be reused'):''}</p>`};
ACT.mt=(k,d)=>{const g=G;
if(k==='l'){g.sel=g.sel===+d.i?null:+d.i;draw()}
else if(k==='r'){if(g.sel==null)return;const l=g.Ls[g.sel],ok=g.pairs.find(p=>p[0]===l)[1]===g.Rs[d.i];g.sel=null;
if(ok){g.dn.push(l);g.cb++;g.sc+=100+Math.min(g.cb,5)*10;if(g.dn.length===g.pairs.length){g.r++;if(g.r>=3){stop();g.sc+=Math.max(0,150-g.el)*4;g.ph='end';g.nb=fin(g.c,'mt',g.sc,true,{fast:g.el<=90?1:0})}else mtRound()}}else{g.wr++;g.cb=0;g.sc=Math.max(0,g.sc-20)}draw()}};
/* ===== GAME 5: ESCAPE ROOM ===== */
const SI=['🔍','🧪','⚗️','🧮','🔐'],SN=[['Загадка понятия','Concept riddle'],['Что это за вещество?','Identify it'],['Реакция','Reaction puzzle'],['Расчёт','Calculation'],['Финальный замок','Final lock']],
SS=[['Дверь лаборатории заперта. На табличке — определение.','The lab door is locked. A plate shows a definition.'],['Шкаф с реактивами требует ответа.','The reagent cabinet needs an answer.'],['Вытяжка запустится, если ты завершишь реакцию.','The fume hood starts once you finish the reaction.'],['Весы показывают задачу. Решение откроет сейф.','The scales show a problem. Solving it opens the safe.'],['Последний замок: докажи знания и введи код из четырёх ключей.','Last lock: prove your knowledge and enter the four-key code.']];
const escInit=g=>{const c=g.c,fc=(RV(c).fc||[]).filter(f=>f.t==='def'),cn=f=>f.f.replace(/^Что такое /,'').replace(/\?$/,''),d1=pick(fc,1)[0],ow=pick(RV(c).ow,1)[0],rq=mkRx({L:rxList(c)},pick(['prod','reag'],1)[0]),
nums=c.q.filter(q=>q.type==='num'),nn=nums.filter(q=>q.d!=='easy'),n4=pick(nn.length?nn:nums,1)[0],ms=c.q.filter(q=>q.type==='mcq'),mh=ms.filter(q=>q.d==='hard'),m5=nq(pick(mh.length?mh:ms,1)[0]),code=Array.from({length:4},()=>Math.random()*10|0);
Object.assign(g,{code,keys:[],s:0,sub:0,tr:0,hn:0,pts:[],solved:false,msg:'',ph:'play',sc:0,
st:[{mc:1,p:esc(d1.b.split('\n')[0]),o:sh([cn(d1),...pick(fc.filter(f=>f!==d1).map(cn),3)]),a:cn(d1),h:[T('Начинается на «','Starts with «')+cn(d1)[0]+'»',T('Букв в слове: ','Letters: ')+cn(d1).length],ex:esc(d1.b)},
{p:esc(ow.q),a:ow.a,alt:ow.alt||[],h:[T('Первая буква: ','First letter: ')+ow.a[0],T('Символов: ','Characters: ')+ow.a.length],ex:'<b>'+esc(ow.a)+'</b>'},
{mc:1,p:rq.p,o:rq.o,a:rq.a,h:[rq.x.type?T('Тип реакции: ','Type: ')+rq.x.type:'…',rq.x.cond?T('Условия: ','Conditions: ')+rq.x.cond:'…'],ex:rq.ex},
{p:esc(n4.q),raw:n4,a:String(n4.a),h:[(RV(c).fm||[]).map(f=>f.f).join(' · ')||'…',(n4.ex||'').split(/;\s*/)[0]],ex:esc(n4.ex||'')},
{mc:1,p:esc(m5.p),o:m5.o,a:m5.a,h:[T('Ключи 1–4 идут по порядку','Keys 1–4 go in order'),T('Первая цифра: ','First digit: ')+code[0]],ex:esc(m5.ex||'')}]})};
VW.esc=()=>{const g=G,c=g.c,h=head(c);if(g.ph==='end')return h+res(g,`<p>🔑 <b>${g.code.join(' ')}</b></p><p class="mu">${g.pts.map((p,i)=>SI[i]+' '+p).join(' · ')}</p><h3>🎉 ${T('Ты выбралась из комнаты химика!','You escaped the chemist’s room!')}</h3>`);
const s=g.st[g.s],last=g.s===4,code=last&&g.sub===1;
const hs=(code?[s.h[0],s.h[1]]:s.h).slice(0,g.hn),can=g.hn<2&&!g.solved;
return h+`<h1>🔐 ${gn(GM[4])}</h1><div class="stg">${SI.map((ic,i)=>`<span class="${i<g.s||(i===g.s&&g.solved)?'dn':i===g.s?'on':''}">${i<g.s||(i===g.s&&g.solved)?'✓':ic}</span>`).join('')}</div><div class="keys">${[0,1,2,3].map(i=>`<b>${g.keys.length>i?g.code[i]:'?'}</b>`).join('')}</div>
<div class="card"><h3>${SI[g.s]} ${T(...SN[g.s])}</h3><p class="mu">${T(...SS[g.s])}</p><div class="blk"><b>${T('Улика','Clue')}:</b><br>${code?T('Введите код из четырёх найденных ключей.','Enter the code from your four keys.'):s.p}</div>
${g.solved?`<p class="okm">✅ ${T('Замок открыт! Ключ найден: ','Unlocked! Key found: ')}<b>${g.code[g.s]}</b></p><p class="mu">${s.ex}</p><button class="btn" data-g="next">${T('Дальше →','Next →')}</button>`:code?inp('inputmode="numeric" maxlength="4"'):s.mc?opts({o:s.o,a:s.a},null):inp()}
${hs.map(x=>`<p class="mu">💡 ${esc(x)}</p>`).join('')}${g.msg?`<p class="bdm">${g.msg}</p>`:''}${can?`<p class="mt"><button class="ib" data-g="hint">💡 ${T('Подсказка (−50)','Hint (−50)')}</button></p>`:''}<p class="mu sm">⭐ ${T('Этап стоит до 200. Подсказка −50, ошибка −25','Stage worth up to 200. Hint −50, mistake −25')}</p></div>`};
ACT.esc=(k,d)=>{const g=G,s=g.st[g.s];
if(k==='hint'){if(g.hn<2){g.hn++;draw()}}
else if(k==='next'){g.s++;g.tr=0;g.hn=0;g.solved=false;g.msg='';g.sub=0;draw()}
else if(k==='o'||k==='chk'){if(g.solved)return;const u=k==='o'?s.o[d.i]:($('#gi')||{}).value||'';if(k==='chk'&&!u.trim())return;
const last=g.s===4,ok=last&&g.sub===1?u.replace(/\D/g,'')===g.code.join(''):s.mc?u===s.a:s.raw?BANK.ok(s.raw,u):[s.a,...(s.alt||[])].some(x=>BANK.ok({type:'fill',a:String(x)},u));
if(!ok){g.tr++;g.msg='🔒 '+T('Не подходит. Подумай ещё.','Not it. Think again.');return draw()}
g.msg='';if(last&&g.sub===0){g.sub=1;g.hn=0;g.msg='';return draw()}
g.pts.push(Math.max(50,200-g.hn*50-g.tr*25));
if(last){g.sc=g.pts.reduce((a,b)=>a+b,0);g.ph='end';g.nb=fin(g.c,'esc',g.sc,true,{})}else{g.keys.push(g.code[g.s]);g.solved=true}draw()}};
/* ===== DASHBOARD + ROUTES ===== */
const INIT={quiz:g=>{g.ph='menu'},rx:g=>{Object.assign(g,{L:rxList(g.c),i:0,sc:0,ok:0,st:0,ph:'play'});nxRx()},fm:g=>{Object.assign(g,{i:0,sc:0,ok:0,st:0,ph:'play'});nxFm()},
mt:g=>{const cs=mkCats(g.c);let rs=pick(cs,3);while(rs.length<3)rs.push(pick(cs,1)[0]);Object.assign(g,{rs,r:0,sc:0,wr:0,cb:0,el:0,ph:'play'});mtRound();tick(()=>{g.el++;const e=$('#gt');if(e)e.textContent=g.el+'s'})},esc:escInit};
V.games=a=>{stop();G=null;const c=chap(a)||CH[0],s=S(),dn=Object.values(s.g).filter(x=>x.done).length;
return`<h1>🎮 ${t('games')}</h1><div class="grid g2"><div class="card ctr"><small class="mu">${T('Всего очков (рекорды)','Total points (bests)')}</small><h2>${tot(s)}</h2></div><div class="card ctr"><small class="mu">${T('Пройдено игр','Games completed')}</small><h2>${dn}/${CH.length*GM.length}</h2></div></div>
<h2 class="mt">1 · ${T('Выбери главу','Choose a chapter')}</h2><div class="tabs scr">${CH.map(h=>`<a class="ib ${h.id===c.id?'on':''}" href="#games/${h.id}" style="text-decoration:none">${h.icon} ${esc(L(h.t))}</a>`).join('')}</div>
<h2 class="mt">2 · ${T('Выбери игру','Choose a game')} — ${c.icon} ${esc(L(c.t))}</h2><div class="grid">${GM.map(m=>{const x=stat(c,m[0]);return`<a class="card gt" href="#game/${c.id}.${m[0]}" style="text-decoration:none;color:inherit"><div style="font-size:2rem">${m[1]}</div><h3>${gn(m)}</h3><p class="mu sm">${gd(m)}</p><div class="row"><span>🏆 ${x.best}</span><span class="sp"></span><span>${x.done?'✅':'▫️'} ${x.plays}×</span></div></a>`}).join('')}</div>
<h2 class="mt">📊 ${T('Рекорды по главам','Best scores by chapter')}</h2><div class="card" style="overflow-x:auto"><table class="gtb"><tr><th></th>${GM.map(m=>`<th title="${esc(gn(m))}">${m[1]}</th>`).join('')}</tr>${CH.map(h=>`<tr><td>${h.icon} ${esc(L(h.t)).slice(0,22)}</td>${GM.map(m=>{const x=stat(h,m[0]);return`<td>${x.done?'✅ ':''}${x.best||'—'}</td>`}).join('')}</tr>`).join('')}</table></div>
<h2 class="mt">🏅 ${t('ach')}</h2><div class="grid">${ACHS.map(a=>`<div class="card" style="opacity:${s.ach['g_'+a[0]]?1:.4}"><span style="font-size:1.8rem">${a[1]}</span> ${T(...a[2])}</div>`).join('')}</div>`};
V.game=a=>{const[ci,gm]=(a||'').split('.'),c=chap(ci);if(!c||!GM.some(m=>m[0]===gm))return V.games();stop();G={c,game:gm};INIT[gm](G);return VW[gm]()};
const oc=V.chapter;V.chapter=id=>{const h=oc(id),c=chap(id);return c?h+`<div class="row mt"><a class="btn" href="#games/${c.id}">🎮 ${t('games')}</a></div>`:h};
NAV.splice(2,0,['games','🎮']);
document.addEventListener('click',e=>{const a=e.target.closest('[data-g]');if(!a||!G)return;const d=a.dataset;
if(d.g==='again'){G={c:G.c,game:G.game};INIT[G.game](G);draw()}else ACT[G.game](d.g,d)});
document.addEventListener('keydown',e=>{if(e.key!=='Enter'||!G)return;const b=e.target.id==='gi'?document.querySelector('[data-g="chk"]'):/^(INPUT|BUTTON|A)$/.test(e.target.tagName)?null:document.querySelector('[data-g="next"]');if(b){e.preventDefault();b.click()}});
};
