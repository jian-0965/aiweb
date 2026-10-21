import test from 'node:test';
import assert from 'node:assert/strict';
import {retrieveKnowledge} from '../server/coach-knowledge.js';
import {calculateCross,executeTool,cleanEvidence,practiceFor,gradePractice} from '../server/coach-tools.js';
import {validateCoachInput,validateCoachOutput,runCoach,handleCoachAPI} from '../server/coach-api.js';
import {validResponse} from '../public/coach/index.js';
import {validCoach} from '../public/engine.js';
const x={mode:'x',mother:'XAXa',father:'XAY',target:'XaY',denominator:'all'};
const input=(changes={})=>validateCoachInput({question:'X 连锁隐性，已知是男孩如何计算概率？',attempt:'',level:3,confirmed:true,cross:x,...changes});
const env={MODEL_API_KEY:'test-only',MODEL_BASE_URL:'https://model.example/v1',MODEL_NAME:'test'};
const response=message=>Response.json({choices:[{message}]});
const answer={summary:'核对样本空间',hint:'男孩的 X 来自母亲。',question:'分母包括哪些子代？',needsClarification:false,citations:['conditional'],limitations:['简化教学模型']};
test('six retrieval fixtures rank the relevant teaching note first',()=>{
 for(const [q,id] of [['Aa × Aa 分离定律','separation'],['已知是男孩 条件概率','conditional'],['ABO 血型 共显性','abo'],['连锁 基因 重组','linkage'],['不完全显性 粉花','incomplete'],['家系 父子 X','sex-origin']])assert.equal(retrieveKnowledge(q)[0].id,id);
});
test('exact calculator distinguishes conditional probability and covers five modes',()=>{
 assert.equal(calculateCross(x).probability,'1/4');assert.equal(calculateCross({...x,denominator:'male'}).probability,'1/2');
 for(const [mode,mother,father,target,want] of [['mono','Aa','Aa','aa','1/4'],['incomplete','Aa','Aa','Aa','1/2'],['di','AaBb','AaBb','A_bb','3/16'],['abo','IAi','IBi','O 型','1/4'],['mono','AA','aa','Aa','1']])assert.equal(calculateCross({mode,mother,father,target,denominator:'all'}).probability,want);
 assert.throws(()=>calculateCross({...x,mode:'linked'}));assert.throws(()=>calculateCross({...x,mother:'unknown'}));
});
test('tool boundary forbids invented parents, unknown tools and missing confirmation',()=>{
 assert.throws(()=>executeTool('calculate_cross',{mother:'AA'},input()));
 assert.throws(()=>executeTool('run_shell',{},input()));assert.throws(()=>executeTool('calculate_cross',{},input({cross:null})));
 assert.throws(()=>validateCoachInput({confirmed:false}));assert.equal(cleanEvidence(null).attempts,0);
 assert.throws(()=>validateCoachOutput({...answer,citations:['fabricated']},retrieveKnowledge('条件概率')));
});
test('model completes an actual function-call round and validates citations',async()=>{
 let calls=0;const result=await runCoach(input(),env,async(_url,options)=>{
  const body=JSON.parse(options.body);calls++;
  if(calls===1)return response({content:null,tool_calls:[{id:'calc1',type:'function',function:{name:'calculate_cross',arguments:'{}'}}]});
  assert.equal(JSON.parse(body.messages.find(m=>m.role==='tool').content).probability,'1/4');return response({content:JSON.stringify(answer)});
 });assert.equal(calls,2);assert.equal(result.source,'ai');assert.ok(result.trace.some(t=>t.origin==='model'));assert.ok(validResponse(result));
});
test('missing config, invalid citations and endless tools fall back honestly',async()=>{
 const offline=await runCoach(input({level:1}),{});assert.equal(offline.source,'rules');assert.equal(offline.calculation,null);assert.ok(validResponse(offline));
 let calls=0;const loop=await runCoach(input(),env,async()=>{calls++;return response({tool_calls:[{id:'t'+calls,type:'function',function:{name:'calculate_cross',arguments:'{}'}}]});});assert.equal(calls,4);assert.equal(loop.source,'rules');
 const bad=await runCoach(input({cross:null}),env,async()=>response({content:JSON.stringify({...answer,citations:['invented']})}));assert.equal(bad.source,'rules');
});
test('practice hides answer until graded and review data survives schema validation',()=>{
 const p=practiceFor('x');assert.equal(p.answer,undefined);assert.equal(p.steps,undefined);assert.notEqual(practiceFor('x',[p.id]).id,p.id);
 const g=gradePractice(p.id,3);assert.equal(g.correct,true);assert.equal(g.reviewDays,3);assert.equal(gradePractice(p.id,0).reviewDays,1);
 assert.ok(validCoach({version:1,reviews:[{id:p.id,title:p.title,due:Date.now()}]}));assert.equal(validCoach({version:1,reviews:[{id:'unknown',title:'x',due:0}]}),false);
});
let uid=0;const request=(path,body,headers={})=>new Request('https://site.example/api/genetics-coach'+path,{method:'POST',headers:{'Content-Type':'application/json','oai-authenticated-user-id':'test-'+(++uid),...headers},body:JSON.stringify(body)});
test('HTTP boundary rejects anonymous, cross-origin, oversized and malformed data',async()=>{
 assert.equal((await handleCoachAPI(request('',{}, {'oai-authenticated-user-id':''}))).status,401);
 assert.equal((await handleCoachAPI(request('',{}, {origin:'https://evil.example'}))).status,403);
 for(const path of ['', '/grade','/practice','/recognize'])assert.equal((await handleCoachAPI(request(path,null))).status,400);
 assert.equal((await handleCoachAPI(request('',{question:'a'.repeat(23000)}))).status,400);
 assert.equal((await handleCoachAPI(request('/recognize',{image:'data:image/png;base64,YWJjZA=='}))).status,400);
 const r=await handleCoachAPI(request('/grade',{id:'coach-mono-test',choice:2}));assert.equal((await r.json()).correct,true);
});
test('vision transcription remains unconfirmed and images only go to configured model',async()=>{
 const image='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAAB';let sent=false;
 const r=await handleCoachAPI(request('/recognize',{image}),env,async(url,options)=>{assert.equal(url,'https://model.example/v1/chat/completions');const body=JSON.parse(options.body);assert.equal(body.messages[1].content[1].image_url.url,image);sent=true;return response({content:JSON.stringify({text:'Aa × Aa',uncertain:['确认字母大小写']})});});
 assert.equal(r.status,200);assert.equal((await r.json()).requiresConfirmation,true);assert.ok(sent);
});
