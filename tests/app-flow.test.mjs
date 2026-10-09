// Lightweight DOM contract harness. This checks rendered controls and application
// event wiring, not browser layout, real focus behavior or visual rendering.
import test from 'node:test';
import assert from 'node:assert/strict';
import {validState} from '../public/engine.js';
test('Rendered controls connect lessons, difficulty choice, exams and persistent progress',async()=>{
 const nodes=new Map(),handlers=new Map(),store=new Map();
 const node=id=>{if(!nodes.has(id))nodes.set(id,{innerHTML:'',textContent:'',value:'',open:false,classList:{add(){},remove(){}},showModal(){this.open=true;},close(){this.open=false;},focus(){}});return nodes.get(id);};
 globalThis.document={querySelector:node,addEventListener(type,fn){const list=handlers.get(type)??[];list.push(fn);handlers.set(type,list);},title:''};
 globalThis.location={hash:'#home'};
 globalThis.window={scrollTo(){},addEventListener(){}};
 globalThis.localStorage={getItem:k=>store.get(k)??null,setItem:(k,v)=>store.set(k,v)};
 const oldTimeout=globalThis.setTimeout;globalThis.setTimeout=()=>0;
 const main=()=>node('#app').innerHTML;
 const current=()=>node('#modal').open?node('#modal-content').innerHTML:main();
 function fire(type,target){for(const fn of handlers.get(type)??[])fn({target,preventDefault(){}});}
 function click(attributes){
  const tag=[...current().matchAll(/<(?:button|g)\b[^>]*>/g)].map(x=>x[0]).find(tag=>Object.entries(attributes).every(([k,v])=>tag.includes(`data-${k}="${v}"`)));
  assert.ok(tag,`Missing rendered control ${JSON.stringify(attributes)}`);assert.ok(!/\sdisabled(?:\s|>|=)/.test(tag),'Cannot click disabled control');
  const dataset=Object.fromEntries([...tag.matchAll(/data-([a-z-]+)="([^"]*)"/g)].map(x=>[x[1].replace(/-([a-z])/g,(_,c)=>c.toUpperCase()),x[2]]));
  const el={dataset};fire('click',{closest(selector){if(selector==='[data-nav]')return dataset.nav?el:null;if(selector==='[data-action]')return dataset.action?el:null;return null;}});
 }
 function changeMatch(i,value){fire('change',{id:'',value:String(value),dataset:{learnMatch:String(i)},matches:s=>s==='[data-learn-match]'});}
 try{
  await import('../public/app.js');assert.ok(main().includes('让好奇心'));
  click({nav:'genetics'});assert.ok(main().includes('遗传规律，自己推一遍。'));
  click({action:'gen-open-mode',id:'abo'});assert.ok(main().includes('ABO 多等位与共显性'));
  click({action:'gen-pick-gamete',side:'mother',index:'0'});
  click({action:'gen-pick-gamete',side:'father',index:'0'});
  assert.ok(main().includes('这一格：'));
  click({action:'gen-predict',value:'1/4'});click({action:'gen-reveal'});
  assert.ok(main().includes('逐格核对基因型与表型'));
  click({nav:'energy'});assert.ok(main().includes('细胞的能量，怎样流动？'));
  assert.ok(main().includes('从一束阳光到细胞里的 ATP'));
  click({action:'map-step',step:'absorb'});assert.ok(main().includes('葡萄糖经小肠吸收进入血液'));
  click({action:'energy-chapter',id:'respiration'});assert.ok(main().includes('无氧呼吸等于没有能量供应吗？'));
  click({nav:'path'});click({action:'read',topic:'cell'});assert.ok(main().includes('把细胞拆开'));
  for(let i=0;i<4;i++)click({action:'learn-node',node:String(i)});
  click({action:'learn-stage',stage:'2'});for(let i=0;i<4;i++)changeMatch(i,i);click({action:'learn-check'});assert.ok(main().includes('完成了'));
  click({action:'learn-stage',stage:'3'});
  fire('input',{id:'teach-draft',value:'细胞核保存遗传信息，核糖体合成蛋白质。两者分工协作，不能相互替代。',matches(){return false;}});
  click({action:'learn-selfcheck'});click({action:'learn-save-explanation'});click({action:'learn-finish'});
  click({action:'start-topic',topic:'cell'});assert.ok(current().includes('选择难度'));
  click({action:'begin-quiz',difficulty:'3',topic:'cell'});assert.ok(main().includes('2016 年'));assert.ok(main().includes('第 1 题'));
  click({action:'show-hint'});click({action:'select-answer',answer:'1'});click({action:'submit-answer'});assert.ok(main().includes('本题使用过提示'));
  click({action:'next-question'});assert.ok(main().includes('2018 年'));click({action:'select-answer',answer:'0'});click({action:'submit-answer'});
  assert.ok(main().includes('回看这道题，你觉得卡在哪里？'));
  click({action:'mark-cause',cause:'condition'});click({action:'next-question'});
  assert.ok(main().includes('本轮学习已记录'));
  let saved=JSON.parse(store.get('biogrow.v1'));assert.ok(validState(saved));assert.equal(saved.notes.length,1);assert.equal(saved.history.length,2);assert.equal(saved.history[0].assisted,true);assert.equal(saved.skills.cell.count,1);assert.equal(saved.history[1].source,'gaokao');assert.equal(saved.history[1].cause,'condition');assert.ok(saved.learning.cell.stages.includes(3));assert.equal(saved.genetics.crosses[0].correct,true);
  click({action:'clear-quiz'});click({action:'set-difficulty',difficulty:'2'});click({action:'start-adaptive'});assert.ok(main().includes('进阶练习'));assert.ok(main().includes('本站原创练习'));assert.ok(!main().includes('exam-source'));
 }finally{globalThis.setTimeout=oldTimeout;}
});
