/* ===== CHAPTER PAGE: table of contents, interactive tools, completion block.
   Tools: ch01 (electronic configuration) -> electron-config tool; ch04 (equations) -> balancing trainer.
   Texts for both languages are in T below. Add equations to BAL to extend the trainer. ===== */
window.CHAPTER_INIT=VC=>{
const {t,L,esc,V,TP,CH,bar}=VC,S=VC.S,$=VC.$;
const T={ru:{toc:'Содержание главы',secT:'Темы',secTool:'Интерактив',secQ:'Тест',cfgT:'Электронная конфигурация: пошагово',cfgHint:'Введи атомный номер (1–36):',
s1:'Шаг 1. Атомный номер',s2:'Шаг 2. Электроны нейтрального атома',s3:'Шаг 3. Слои (оболочки)',s4:'Шаг 4. Подуровни',s5:'Шаг 5. Орбитальная диаграмма',s6:'Почему так',
vale:'Электроны внешнего слоя',exc:'Исключение: у этого атома один электрон «перескакивает» с 4s на 3d, потому что наполовину или полностью заполненный 3d-подуровень устойчивее.',
why:'Электроны заполняют подуровни по возрастанию энергии (принцип наименьшей энергии). В одной орбитали — не более двух электронов с противоположными спинами (принцип Паули). В орбиталях одного подуровня электроны сначала занимают по одной орбитали (правило Хунда).',
legend:'Ёмкость: s — 1 орбиталь (2 e⁻), p — 3 (6 e⁻), d — 5 (10 e⁻). Стрелка ↑ или ↓ — один электрон, ↑↓ — пара.',
balT:'Тренажёр: расставь коэффициенты',lvl:['Уровень 1 — лёгкий','Уровень 2 — средний','Уровень 3 — сложный'],chk:'Проверить',hint:'Подсказка',sol:'Решение',nxt:'Следующее',
okm:'Верно! Все атомы сходятся.',bad:'Пока не сходится. Посчитай атомы каждого элемента слева и справа.',notmin:'Уравнение уравнено, но коэффициенты можно сократить — нужен наименьший набор целых.',stat:'Верно / попыток',acc:'Точность',
hintP:'Начни с элемента, который входит в наименьшее число формул. Меняй только коэффициенты, индексы менять нельзя.',solP:'Правильные коэффициенты:',
done:'Что ты изучила',left:'Что осталось',cont:'Продолжить обучение',all:'Все темы главы пройдены — отличная работа!',
yours:'Твоя практика',fcs:'Карточек «знаю»',ow:'Лучший результат в однословных',qz:'Пройдено тестов'},
en:{toc:'Chapter contents',secT:'Topics',secTool:'Interactive',secQ:'Quiz',cfgT:'Electron configuration, step by step',cfgHint:'Enter an atomic number (1–36):',
s1:'Step 1. Atomic number',s2:'Step 2. Electrons of the neutral atom',s3:'Step 3. Shells',s4:'Step 4. Subshells',s5:'Step 5. Orbital diagram',s6:'Why',
vale:'Outer-shell electrons',exc:'Exception: one electron moves from 4s to 3d because a half-filled or full 3d subshell is more stable.',
why:'Electrons fill subshells in order of increasing energy (Aufbau). An orbital holds at most two electrons with opposite spins (Pauli). Within a subshell, electrons occupy separate orbitals first (Hund).',
legend:'Capacity: s = 1 orbital (2 e⁻), p = 3 (6 e⁻), d = 5 (10 e⁻). One arrow = one electron, ↑↓ = a pair.',
balT:'Trainer: balance the equation',lvl:['Level 1 — easy','Level 2 — medium','Level 3 — hard'],chk:'Check',hint:'Hint',sol:'Solution',nxt:'Next',
okm:'Correct! Every atom balances.',bad:'Not balanced yet. Count the atoms of each element on both sides.',notmin:'Balanced, but the coefficients can be reduced — use the smallest whole numbers.',stat:'Correct / attempts',acc:'Accuracy',
hintP:'Start with the element that appears in the fewest formulas. Change only coefficients, never subscripts.',solP:'Correct coefficients:',
done:'What you have studied',left:'What is left',cont:'Continue learning',all:'All topics of this chapter done — great work!',
yours:'Your practice',fcs:'Cards known',ow:'Best one-word score',qz:'Quizzes taken'}};
const q=k=>(T[VC.lang()]||T.ru)[k];
/* ---- formulas ---- */
const SUB='₀₁₂₃₄₅₆₇₈₉',SUP='⁰¹²³⁴⁵⁶⁷⁸⁹',sup=n=>String(n).replace(/\d/g,d=>SUP[d]);
const fx=f=>esc(f).replace(/(\d+)/g,'<sub>$1</sub>');
const parse=f=>{const st=[{}];let i=0;const num=()=>{let s='';while(/\d/.test(f[i]||''))s+=f[i++];return s?+s:1};
while(i<f.length){const c=f[i];if(c==='('){st.push({});i++}else if(c===')'){i++;const n=num(),o=st.pop();for(const k in o)st[st.length-1][k]=(st[st.length-1][k]||0)+o[k]*n}
else{let e=c;i++;if(/[a-z]/.test(f[i]||''))e+=f[i++];const n=num();st[st.length-1][e]=(st[st.length-1][e]||0)+n}}return st[0]};
const count=(fs,co)=>{const r={};fs.forEach((f,i)=>{const p=parse(f);for(const k in p)r[k]=(r[k]||0)+p[k]*co[i]});return r};
const gcd=(a,b)=>b?gcd(b,a%b):a;
/* ---- electron configuration engine (Z = 1..36, Madelung order) ---- */
const ORD=[[1,'s'],[2,'s'],[2,'p'],[3,'s'],[3,'p'],[4,'s'],[3,'d'],[4,'p']],CAP={s:2,p:6,d:10},NO={s:1,p:3,d:5};
const config=z=>{let left=z;const o=ORD.map(([n,l])=>{const e=Math.min(left,CAP[l]);left-=e;return{n,l,e}});
if(z===24){o[5].e=1;o[6].e=5}if(z===29){o[5].e=1;o[6].e=10}return o.filter(x=>x.e>0).sort((a,b)=>a.n-b.n||'spd'.indexOf(a.l)-'spd'.indexOf(b.l))};
const boxes=e=>{const k=Math.ceil(e/2),n=e>NO_MAX?0:0;return''};
const orb=x=>{const m=NO[x.l],c=Array(m).fill(0);for(let i=0;i<x.e;i++)c[i%m]++;return c.map(v=>`<span class="ob" aria-label="${v} e">${v===2?'↑↓':v===1?'↑':'&nbsp;'}</span>`).join('')};
const NO_MAX=10;
const shells=cfg=>{const s={};cfg.forEach(x=>s[x.n]=(s[x.n]||0)+x.e);return Object.keys(s).sort((a,b)=>a-b).map(k=>s[k])};
const EL='H He Li Be B C N O F Ne Na Mg Al Si P S Cl Ar K Ca Sc Ti V Cr Mn Fe Co Ni Cu Zn Ga Ge As Se Br Kr'.split(' ');
const cfgHTML=z=>{const cfg=config(z),sh=shells(cfg),sy=EL[z-1];
return`<div class="card mt"><b>${q('s1')}:</b> Z = ${z} (${sy})</div><div class="card mt"><b>${q('s2')}:</b> ${z} e⁻</div>
<div class="card mt"><b>${q('s3')}:</b> <span class="fbig">+${z} ${sy} ${sh.join(')')})</span></div>
<div class="card mt"><b>${q('s4')}:</b> <span class="fbig">${cfg.map(x=>x.n+x.l+sup(x.e)).join(' ')}</span></div>
<div class="card mt"><b>${q('s5')}:</b><div class="od">${cfg.map(x=>`<div class="orow"><span class="ol">${x.n}${x.l}</span>${orb(x)}</div>`).join('')}</div><p class="mu sm">${q('legend')}</p></div>
<div class="card mt"><b>${q('vale')}:</b> ${sh[sh.length-1]}${z===24||z===29?'<p class="mu sm">'+q('exc')+'</p>':''}</div><details class="card mt"><summary>💡 ${q('s6')}</summary><p>${q('why')}</p></details>`};
const cfgTool=()=>`<section class="card mt" id="tool"><h2>⚛️ ${q('cfgT')}</h2><label for="ecz">${q('cfgHint')}</label> <input id="ecz" type="number" min="1" max="36" value="16" class="ib" style="width:90px"><div id="ecout" aria-live="polite">${cfgHTML(16)}</div></section>`;
/* ---- balancing trainer ---- */
const BAL=[[0,['H2','O2'],['H2O'],[2,1,2]],[0,['N2','H2'],['NH3'],[1,3,2]],[0,['Mg','O2'],['MgO'],[2,1,2]],[0,['Na','Cl2'],['NaCl'],[2,1,2]],
[1,['Al','O2'],['Al2O3'],[4,3,2]],[1,['Fe','Cl2'],['FeCl3'],[2,3,2]],[1,['CH4','O2'],['CO2','H2O'],[1,2,1,2]],[1,['KClO3'],['KCl','O2'],[2,2,3]],
[2,['Ca(OH)2','H3PO4'],['Ca3(PO4)2','H2O'],[3,2,1,6]],[2,['C2H6','O2'],['CO2','H2O'],[2,7,4,6]],[2,['Al','H2SO4'],['Al2(SO4)3','H2'],[2,3,1,3]],[2,['Fe2O3','CO'],['Fe','CO2'],[1,3,2,3]]];
let B={lv:0,i:0,done:0};const bs=()=>S().bal||(S().bal={c:0,n:0});
const bItem=()=>BAL.filter(e=>e[0]===B.lv)[B.i%BAL.filter(e=>e[0]===B.lv).length];
const balHTML=()=>{const e=bItem(),fs=[...e[1],...e[2]],inp=(f,i)=>`<label class="sr" for="bc${i}">${esc(f)}</label><input id="bc${i}" class="ib bci" type="number" min="1" max="20" inputmode="numeric">`;
const row=(a,o)=>a.map((f,i)=>inp(f,o+i)+'<span class="fbig">'+fx(f)+'</span>').join(' + ');
const b=bs();return`<div class="tabs">${T[VC.lang()].lvl.map((l,i)=>`<button class="ib ${B.lv===i?'on':''}" data-bl="${i}" aria-pressed="${B.lv===i}">${l}</button>`).join('')}</div>
<div class="card mt beq">${row(e[1],0)} <span class="fbig">→</span> ${row(e[2],e[1].length)}</div>
<div class="row mt"><button class="btn" data-bb="chk">${q('chk')}</button><button class="btn o" data-bb="hint">💡 ${q('hint')}</button><button class="btn o" data-bb="sol">${q('sol')}</button><button class="btn o" data-bb="nxt">${q('nxt')}</button></div>
<div id="bfb" class="mt" role="status" aria-live="polite"></div><p class="mu sm">${q('stat')}: ${b.c}/${b.n} · ${q('acc')}: ${b.n?Math.round(b.c/b.n*100):0}%</p>`};
const balTool=()=>`<section class="card mt" id="tool"><h2>⚖️ ${q('balT')}</h2><div id="balbox">${balHTML()}</div></section>`;
const balAct=a=>{const e=bItem(),n=e[3].length,fb=$('#bfb'),box=$('#balbox');
if(a==='nxt'){B.i++;box.innerHTML=balHTML()}
else if(a==='hint')fb.textContent=q('hintP');
else if(a==='sol')fb.innerHTML=q('solP')+' <b>'+e[3].join(', ')+'</b>';
else{const co=[...Array(n)].map((_,i)=>+($('#bc'+i).value)||0);if(co.some(v=>v<1)){$('#bc'+co.findIndex(v=>v<1)).focus();return}
const L1=count(e[1],co.slice(0,e[1].length)),R1=count(e[2],co.slice(e[1].length)),bal=Object.keys({...L1,...R1}).every(k=>L1[k]===R1[k]),min=co.reduce(gcd)===1,b=bs();b.n++;
if(bal&&min){b.c++;S().g&&0;VC.save();fb.className='mt okm';fb.textContent='✅ '+q('okm')}else{VC.save();fb.className='mt bdm';fb.textContent='❌ '+(bal?q('notmin'):q('bad'))}
const s=$('#balbox p.mu');if(s)s.innerHTML=q('stat')+': '+b.c+'/'+b.n+' · '+q('acc')+': '+Math.round(b.c/b.n*100)+'%'}};
/* ---- chapter page ---- */
const old=V.chapter;
V.chapter=id=>{const c=CH.find(x=>x.id===id),base=old(id);if(!c||!Array.isArray(c.tp))return base;
const tps=TP.filter(x=>x.c===c),S0=S(),done=tps.filter(x=>S0.topics[x.id]),left=tps.filter(x=>!S0.topics[x.id]),f=VC.fcCount(c),o=S0.ow[c.id],nq=(S0.q[c.id]||[]).length;
const rev=c.rev?[['cards','cards'],['oneword','ow'],['formulas','fm'],['reactions','rxn'],['summary','summ'],['mistakes','mist']]:[];
const toc=`<nav class="card mt" aria-label="${q('toc')}"><h2>📑 ${q('toc')}</h2><ol class="toc"><li><a href="#" data-sc="tl">${q('secT')}</a></li>${id==='ch01'||id==='ch04'?`<li><a href="#" data-sc="tool">${q('secTool')}</a></li>`:''}${c.q?`<li><a href="#quiz/${id}">${q('secQ')}</a></li>`:''}${rev.map(r=>`<li><a href="#${r[0]}/${id}">${t(r[1])}</a></li>`).join('')}</ol></nav>`;
const tool=id==='ch01'?cfgTool():id==='ch04'?balTool():'';
const nx=left[0],end=`<section class="card mt"><h2>🎓 ${q('yours')}</h2><div class="grid"><div><h3>✅ ${q('done')} (${done.length})</h3><ul class="tpl">${done.map(x=>`<li>${esc(L(x.t))}</li>`).join('')}</ul></div><div><h3>⏳ ${q('left')} (${left.length})</h3><ul class="tpl">${left.map(x=>`<li><a href="#topic/${x.id}">${esc(L(x.t))}</a></li>`).join('')}</ul></div></div>
<p class="mu sm">🃏 ${q('fcs')}: ${f.k}/${f.t} · ⚡ ${q('ow')}: ${o?o.best+'/'+o.n:'—'} · 📝 ${q('qz')}: ${nq}</p>${nx?`<a class="btn" href="#topic/${nx.id}">${q('cont')} →</a>`:`<p class="proud">${q('all')}</p>`}</section>`;
return base.replace('<div class="tl mt">','<div class="tl mt" id="tl">')+toc+tool+end};
document.addEventListener('click',e=>{const a=e.target.closest('[data-sc],[data-bl],[data-bb]');if(!a)return;const d=a.dataset;
if(d.sc){e.preventDefault();const el=d.sc==='tl'?$('#tl'):$('#tool');el&&el.scrollIntoView({behavior:matchMedia('(prefers-reduced-motion:reduce)').matches?'auto':'smooth'})}
else if('bl' in d){B.lv=+d.bl;B.i=0;$('#balbox').innerHTML=balHTML()}else if('bb' in d)balAct(d.bb)});
document.addEventListener('input',e=>{if(e.target.id!=='ecz')return;const z=Math.round(+e.target.value);$('#ecout').innerHTML=z>=1&&z<=36?cfgHTML(z):''});
VC.config=config;VC.count=count;VC.BAL=BAL;
};
