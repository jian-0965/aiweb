import test from 'node:test';
import assert from 'node:assert/strict';
import {MODEL,trace,recommend,observe,chooseQuestions,simulate,freshState,validState} from '../public/engine.js';
import {questions,topics} from '../public/content.js';

test('Bayesian posterior agrees with a hand-computed example',()=>{
 const x=trace(.25,true);assert.ok(Math.abs(x.posterior-.54545454545)<1e-9);
 assert.ok(Math.abs(x.next-.6)<1e-9);
 const y=trace(.25,false);assert.ok(Math.abs(y.posterior-.04255319149)<1e-9);
 assert.ok(y.next<.25);
});
test('Repeated correct evidence increases mastery; contradictory evidence reduces it',()=>{
 let p=MODEL.prior;for(let i=0;i<10;i++){let n=trace(p,true).next;assert.ok(n>=p&&n<=1);p=n;}
 assert.ok(p>.99);assert.ok(trace(.8,false).next<.8);
 for(const p of [0,.01,.2,.5,.9,1])for(const correct of [true,false]){const x=trace(p,correct);assert.ok(x.next>=0&&x.next<=1);}
});
test('New learners start with foundational topics and diagnosis is not fabricated',()=>{
 const s=freshState();assert.equal(s.history.length,0);assert.equal(recommend(s,topics)[0].id,'cell');
 assert.equal(recommend(s,topics).find(x=>x.id==='ecology').ready,false);
});
test('Observations persist evidence and schedule appropriate review intervals',()=>{
 const s=freshState(),q=questions[0],now=1000000;
 const e=observe(s,q,q.answer,now);assert.equal(e.correct,true);assert.equal(s.history.length,1);assert.equal(s.skills.cell.count,1);
 assert.ok(s.skills.cell.due>now);const after=s.skills.cell.p;
 observe(s,q,(q.answer+1)%4,now+1);assert.ok(s.skills.cell.p<after);assert.equal(s.skills.cell.due,now+1+600000);
 assert.equal(recommend(s,topics,now+700000).find(x=>x.id==='cell').due,true);assert.ok(validState(s));
});
test('Mastering prerequisites unlocks downstream learning priorities',()=>{
 const s=freshState();s.skills.cell={p:.8,count:5,last:0,due:9999999999999};
 assert.equal(recommend(s,topics).find(x=>x.id==='membrane').ready,true);
 assert.equal(recommend(s,topics).find(x=>x.id==='genetics').ready,true);
});
test('Question selection covers requested topics and prefers unseen items',()=>{
 const s=freshState(),q=questions[0];observe(s,q,q.answer);
 const list=chooseQuestions(s,questions,topics,'cell',4);assert.equal(list.length,4);assert.equal(list.at(-1).id,q.id);
 assert.ok(list.every(x=>x.topic==='cell'));assert.equal(new Set(list.map(x=>x.id)).size,4);
});
test('The entire curriculum has valid questions, answers and acyclic prerequisites',()=>{
 assert.equal(questions.length,32);assert.equal(new Set(questions.map(q=>q.id)).size,questions.length);
 const visited=new Set();for(const t of topics){assert.ok(t.requires.every(x=>visited.has(x)));visited.add(t.id);assert.equal(questions.filter(q=>q.topic===t.id).length,4);}
 for(const q of questions){assert.ok(q.answer>=0&&q.answer<q.options.length);assert.ok(q.explain.length>10);}
});
test('Osmosis direction, equilibrium and volume agree with the stated assumptions',()=>{
 assert.ok(simulate('osmosis',{inside:40,outside:60}).value<100);
 assert.ok(simulate('osmosis',{inside:60,outside:40}).value>100);
 assert.equal(simulate('osmosis',{inside:50,outside:50}).value,100);
});
test('Enzyme peak and limiting-factor saturation behave as documented',()=>{
 assert.equal(simulate('enzyme',{temp:37}).value,100);
 assert.ok(simulate('enzyme',{temp:80}).value<5);
 assert.equal(simulate('photo',{light:0,co2:100}).value,0);
 assert.equal(simulate('photo',{light:100,co2:20}).value,simulate('photo',{light:80,co2:20}).value);
});
test('Import schema rejects malformed archives',()=>{
 assert.equal(validState(null),false);assert.equal(validState({}),false);assert.equal(validState({...freshState(),goal:999}),false);
 assert.equal(validState({...freshState(),skills:{cell:{p:7,count:1,due:1}}}),false);
 assert.equal(validState({...freshState(),notes:[{text:7,time:0}]}),false);
 assert.equal(validState({...freshState(),history:[null]}),false);
 assert.equal(validState(freshState()),true);
});
