import {validGrowth} from './growth-core.js';
// Bayesian Knowledge Tracing: an interpretable two-state hidden Markov model.
// Prototype parameters are explicit assumptions, not fitted to student data.
export const MODEL = Object.freeze({prior:.25,learn:.12,guess:.25,slip:.10,version:'BKT-1.0'});
export function trace(prior, correct, model=MODEL) {
  const p=Math.min(.999,Math.max(.001,prior));
  const likelihoodKnown=correct?1-model.slip:model.slip;
  const likelihoodUnknown=correct?model.guess:1-model.guess;
  const posterior=p*likelihoodKnown/(p*likelihoodKnown+(1-p)*likelihoodUnknown);
  return {prior:p,posterior,next:posterior+(1-posterior)*model.learn};
}
export function mastery(state,id){return state.skills[id]?.p??MODEL.prior;}
export function recommend(state,topics,now=Date.now()) {
  return topics.map(t=>{
    const record=state.skills[t.id], p=mastery(state,t.id);
    const ready=t.requires.every(id=>mastery(state,id)>=.55);
    const due=Boolean(record?.due&&record.due<=now);
    const uncertainty=4*p*(1-p);
    const score=(1-p)*.55+uncertainty*.2+(due?.25:0)+(ready?.2:-.6);
    return {...t,p,ready,due,score,reason:due?'间隔复习已到期':!record?'还没有学习证据，先做诊断':!ready?'先巩固前置概念，再进入本节':p<.55?'答题证据显示该概念需要巩固':p<.85?'接近掌握，进行迁移练习':'进行间隔检索，保持记忆'};
  }).sort((a,b)=>b.score-a.score);
}
export function observe(state,question,answer,now=Date.now(),assisted=false) {
  const correct=answer===question.answer;
  if(assisted){
    const p=mastery(state,question.topic);
    const event={id:question.id,topic:question.topic,difficulty:question.difficulty??1,source:question.source?'gaokao':'original',answer,correct,assisted:true,time:now,prior:p,posterior:p,next:p};
    state.history.push(event);return event;
  }
  const update=trace(mastery(state,question.topic),correct);
  const old=state.skills[question.topic]??{count:0};
  const days=correct?(update.next>.85?7:update.next>.6?3:1):0;
  state.skills[question.topic]={p:update.next,count:old.count+1,last:now,due:now+(days?days*86400000:600000)};
  const event={id:question.id,topic:question.topic,difficulty:question.difficulty??1,source:question.source?'gaokao':'original',answer,correct,time:now,...update};
  state.history.push(event);return event;
}
export function chooseQuestions(state,questions,topics,topic=null,limit=5,difficulty=null) {
  const priorities=new Map(recommend(state,topics).map((x,i)=>[x.id,i]));
  const seen=new Map();for(const e of state.history)seen.set(e.id,e.time);
  return questions.filter(q=>(!topic||q.topic===topic)&&(!difficulty||q.difficulty===difficulty)).slice().sort((a,b)=>{
    const sa=seen.has(a.id),sb=seen.has(b.id);
    if(sa!==sb)return sa?1:-1;
    if(sa&&seen.get(a.id)!==seen.get(b.id))return seen.get(a.id)-seen.get(b.id);
    return (priorities.get(a.topic)-priorities.get(b.topic))||a.difficulty-b.difficulty;
  }).slice(0,limit);
}
// Instructional relative models, not numerical predictions for living organisms.
export function simulate(type,values){
  if(type==='osmosis'){const delta=values.outside-values.inside;return {value:Math.round(100+45*Math.tanh(-delta/35)),direction:delta>0?'水分净流出':delta<0?'水分净流入':'达到动态平衡',delta};}
  if(type==='enzyme'){const t=values.temp;return {value:Math.round(100*Math.exp(-Math.pow((t-37)/(t>37?14:25),2))),direction:t>50?'高温下结构受损，活性降低':t<20?'低温使反应速率降低':'接近此模型的最适温度'};}
  const light=values.light/(values.light+25), co2=values.co2/(values.co2+25);
  return {value:Math.round(100*Math.min(light,co2)),direction:light<co2?'当前主要限制因素：光照':co2<light?'当前主要限制因素：CO₂':'两个因素的相对限制程度相近'};
}
export function freshState(){return {version:1,skills:{},history:[],notes:[],experiments:[],goal:20};}
export function validLearning(s){return s===undefined||(s&&typeof s==='object'&&!Array.isArray(s)&&Object.entries(s).every(([id,p])=>['cell','membrane','osmosis','enzyme','photo','respiration','genetics','ecology'].includes(id)&&p&&['stages','views','steps'].every(k=>Array.isArray(p[k])&&p[k].every(n=>Number.isInteger(n)&&n>=0&&n<(k==='steps'?3:4)))));}
export function validEnergy(s){return s===undefined||!!s&&typeof s==='object'&&!Array.isArray(s)&&Array.isArray(s.writings)&&s.writings.length<=5000&&s.writings.every(x=>x&&['atp','enzyme','photo','respiration','integrate'].includes(x.chapter)&&typeof x.text==='string'&&x.text.length<=2000&&['pending','clear','review'].includes(x.reflection)&&Number.isFinite(x.time))&&Array.isArray(s.designs)&&s.designs.length<=5000&&s.designs.every(x=>x&&['enzyme','photo'].includes(x.task)&&Number.isFinite(x.time)&&(!('conclusion' in x)||typeof x.conclusion==='string'&&x.conclusion.length<=1200));}
export function validGenetics(s){return s===undefined||!!s&&typeof s==='object'&&!Array.isArray(s)&&Array.isArray(s.visited)&&s.visited.every(x=>['map','cross','pedigree','probability'].includes(x))&&Array.isArray(s.crosses)&&s.crosses.length<=5000&&s.crosses.every(x=>x&&['mono','incomplete','di','x','abo'].includes(x.mode)&&typeof x.mother==='string'&&x.mother.length<=8&&typeof x.father==='string'&&x.father.length<=8&&['0','1/16','1/8','1/4','1/2','3/4','1'].includes(x.predicted)&&typeof x.correct==='boolean'&&Number.isFinite(x.time))&&Array.isArray(s.answers)&&s.answers.length<=5000&&s.answers.every(x=>x&&typeof x.id==='string'&&x.id.length<=40&&Number.isInteger(x.choice)&&x.choice>=0&&x.choice<=3&&typeof x.correct==='boolean'&&typeof x.assisted==='boolean'&&Number.isFinite(x.time));}
export function validState(s){return !!s&&validGrowth(s.growth)&&validLearning(s.learning)&&validEnergy(s.energy)&&validGenetics(s.genetics)&&s.version===1&&[10,20,30,45].includes(s.goal)&&typeof s.skills==='object'&&s.skills!==null&&Array.isArray(s.notes)&&s.notes.every(n=>n&&typeof n==='object'&&typeof n.text==='string'&&typeof n.time==='number')&&Array.isArray(s.experiments)&&s.experiments.every(e=>e&&typeof e.type==='string'&&typeof e.value==='number'&&typeof e.direction==='string'&&typeof e.time==='number'&&e.values&&typeof e.values==='object')&&Array.isArray(s.history)&&s.history.every(e=>e&&typeof e.correct==='boolean'&&typeof e.topic==='string'&&typeof e.time==='number'&&typeof e.id==='string'&&Number.isFinite(e.next)&&Number.isFinite(e.prior)&&(!('cause' in e)||['concept','condition','process','reading','careless'].includes(e.cause)))&&Object.values(s.skills).every(x=>x&&Number.isFinite(x.p)&&x.p>=0&&x.p<=1&&Number.isFinite(x.count)&&Number.isFinite(x.due));}
