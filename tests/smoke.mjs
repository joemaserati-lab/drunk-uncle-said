import fs from 'node:fs/promises';
import vm from 'node:vm';
import assert from 'node:assert/strict';
const root='./';
const db=JSON.parse(await fs.readFile(root+'questions.json','utf8'));
const core=await fs.readFile(root+'core.js','utf8'),code=await fs.readFile(root+'app.js','utf8');
const elements=new Map();const el=id=>{if(!elements.has(id))elements.set(id,{innerHTML:'',value:'',focus(){},scrollIntoView(){},showModal(){},close(){}});return elements.get(id)};
const storage=new Map();
const ctx=vm.createContext({console,Intl,Date,Math,Map,Set,Promise,navigator:{languages:['it-IT'],language:'it-IT'},localStorage:{getItem:k=>storage.get(k)||null,setItem:(k,v)=>storage.set(k,v)},document:{querySelector:el,querySelectorAll:()=>[]},window:{DUS_DATA:db,scrollTo(){}}});
vm.runInContext(core,ctx);vm.runInContext(code,ctx);
const distribution={};
for(let i=0;i<10000;i++){const qs=ctx.window.DUS_CORE.round(db.questions),u=qs.filter(q=>q.answer==='uncle').length;assert.equal(qs.length,10);assert.ok(u>=2&&u<=4);assert.equal(new Set(qs.map(q=>q.pair_id)).size,10);assert.equal(new Set(qs.map(q=>q.id)).size,10);assert.ok(qs.every(q=>q.editorial_status==='Da testare nel quiz'));distribution[u]=(distribution[u]||0)+1}
assert.equal(db.questions.length,330);assert.equal(new Set(db.questions.filter(q=>q.fictional).map(q=>q.reaction)).size,165);
for(const q of db.questions){assert.ok(q.original);if(!q.fictional)assert.match(q.reveal.source_url,/^https?:\/\//)}
for(let i=0;i<30;i++){vm.runInContext('start()',ctx);for(let j=0;j<10;j++){vm.runInContext("answer(current().answer)",ctx);vm.runInContext("answer('uncle')",ctx);assert.equal(vm.runInContext('state.answers.length',ctx),j+1);assert.ok(vm.runInContext('valid(state)',ctx));vm.runInContext('state.index++;render()',ctx)}assert.equal(vm.runInContext('score()',ctx),10);assert.match(el('#app').innerHTML,/10\/10/)}
vm.runInContext('start();answer(current().answer);home()',ctx);assert.match(el('#app').innerHTML,/Riprendi la manche/);
vm.runInContext("target='fr';render()",ctx);await new Promise(r=>setTimeout(r,0));assert.match(el('#translation').innerHTML,/non disponibile/);
ctx.window.Translator={availability:async()=> 'available',create:async()=>({translate:async()=> 'Traduction de test'})};
vm.runInContext("target='de';render()",ctx);await new Promise(r=>setTimeout(r,0));assert.match(el('#translation').innerHTML,/Traduction de test/);
ctx.window.Translator={availability:async()=> 'downloadable'};vm.runInContext("target='ja';render()",ctx);await new Promise(r=>setTimeout(r,0));assert.match(el('#translation').innerHTML,/Attiva la traduzione/);
console.log(JSON.stringify({pass:true,rounds:10000,distribution,complete_games:30,checks:['no reserve','no paired questions','double-click guard','score','resume','translation fallback','translation available','language pack action','165 unique uncle reactions']}));
