import test from 'node:test';
import assert from 'node:assert/strict';
import {renderCoach,handleCoach,changeCoach,leaveCoach} from '../public/coach/index.js';
import {handleCoachAPI} from '../server/coach-api.js';
import {validCoach,validGenetics} from '../public/engine.js';
// Controller/HTML contract test; does not test browser layout or real provider output.
test('confirm → hints → grade → saved review, and cancelled requests cannot overwrite UI',async()=>{
 const state={};let html='',saved=0,notify;
 const ctx={render(){html=renderCoach(state);if(!html.includes('正在处理')&&notify){const n=notify;notify=null;n();}},save(){saved++;},toast(){},navigate(){}};
 const oldFetch=globalThis.fetch;let seq=0;
 globalThis.fetch=(url,options)=>handleCoachAPI(new Request('https://site.example'+url,{...options,headers:{...options.headers,'oai-authenticated-user-id':'flow-'+(++seq)}}),{});
 const act=(a,data={})=>handleCoach('coach-'+a,{dataset:data},state,ctx);
 const finish=()=>new Promise(resolve=>{notify=resolve;});
 try{
  act('reset');act('example',{index:'1'});assert.match(html,/下一胎是患病男孩/);
  act('start');assert.match(html,/请核对题目和计算条件/);
  changeCoach({dataset:{coachField:'confirmed'},checked:true},ctx);
  let done=finish();act('start');await done;assert.match(html,/基础引导 · 非 AI/);assert.doesNotMatch(html,/查看计算核对/);
  done=finish();act('more');await done;done=finish();act('more');await done;assert.match(html,/查看计算核对/);assert.match(html,/1\/4/);
  act('choice',{choice:'3'});done=finish();act('grade');await done;
  assert.equal(saved,1);assert.equal(state.genetics.answers[0].correct,true);assert.equal(state.genetics.answers[0].assisted,false);assert.ok(validGenetics(state.genetics));assert.ok(validCoach(state.coach));
  done=finish();act('review',{id:'coach-x-son'});await done;assert.match(html,/回来再试一次/);
  let resolve;globalThis.fetch=()=>new Promise(r=>{resolve=r;});
  act('example',{index:'0'});changeCoach({dataset:{coachField:'confirmed'},checked:true},ctx);act('start');act('cancel');act('reset');
  resolve(Response.json({invalid:'late response'}));await new Promise(r=>setImmediate(r));assert.doesNotMatch(renderCoach(state),/教练返回内容不完整/);
 }finally{leaveCoach();globalThis.fetch=oldFetch;}
});
