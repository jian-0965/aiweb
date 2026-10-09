import test from 'node:test';
import assert from 'node:assert/strict';
import {topics,questions} from '../public/content.js';
import {gaokaoQuestions} from '../public/gaokao.js';
import {lessons} from '../public/lessons.js';
import {chooseQuestions,freshState,validState,observe,validLearning} from '../public/engine.js';
import {learningUI,openLearning,handleLearning,renderLearning} from '../public/learning.js';
const all=[...questions,...gaokaoQuestions];
test('Every topic has questions at every explicit difficulty; no difficulty fallback',()=>{
 for(const topic of topics)for(const difficulty of [1,2,3]){
  const list=chooseQuestions(freshState(),all,topics,topic.id,5,difficulty);
  assert.ok(list.length>0);assert.ok(list.every(q=>q.difficulty===difficulty&&q.topic===topic.id));
 }
 assert.equal(chooseQuestions(freshState(),questions,topics,null,5,3).length,0);
});
test('Each authentic exam transcription is traceable and carries an original explanation',()=>{
 assert.equal(gaokaoQuestions.length,16);assert.equal(new Set(all.map(x=>x.id)).size,48);
 for(const q of gaokaoQuestions){assert.equal(q.options.length,4);assert.ok(q.answer>=0&&q.answer<4);assert.ok(q.source.year>=2010&&q.source.year<=2022);assert.ok(q.source.number>0);assert.ok(q.source.url.startsWith('https://github.com/OpenLMLab/'));assert.equal(q.steps.length,3);assert.equal(q.source.license,'Apache-2.0');assert.ok(!q.options.some(s=>/[A-D][．.]/.test(s)));}
 const table=gaokaoQuestions.find(q=>q.id==='gaokao-142').table;
 assert.equal(table.rows.length,6);assert.ok(table.rows.every(row=>row.length===table.headers.length));
});
test('Guided learning covers all eight topics, four stages and multiple activity types',()=>{
 assert.equal(Object.keys(lessons).length,topics.length);
 const types=new Set();for(const t of topics){const l=lessons[t.id];assert.equal(l.nodes.length,4);assert.equal(l.steps.length,3);assert.equal(l.rubric.length,l.keywords.length);types.add(l.activity.type);openLearning(t.id);assert.ok(renderLearning(freshState(),topics).includes(l.title));}
 assert.deepEqual([...types].sort(),['match','order','predict']);
});
test('Lesson completion needs actions; stages do not fabricate mastery or quiz evidence',()=>{
 const s=freshState(),ctx={render(){},save(){},toast(){}};openLearning('cell');
 handleLearning('learn-stage',{dataset:{stage:'3'}},s,ctx);assert.equal(s.learning,undefined);
 for(let i=0;i<4;i++)handleLearning('learn-node',{dataset:{node:String(i)}},s,ctx);
 assert.ok(s.learning.cell.stages.includes(0));assert.equal(s.history.length,0);assert.deepEqual(s.skills,{});
 learningUI.matches={0:1,1:0,2:2,3:3};handleLearning('learn-check',{dataset:{}},s,ctx);assert.ok(!s.learning.cell.stages.includes(2));
 learningUI.matches={0:0,1:1,2:2,3:3};handleLearning('learn-check',{dataset:{}},s,ctx);assert.ok(s.learning.cell.stages.includes(2));assert.ok(validState(s));
});
test('Ordering, prediction and explanation activities persist separately from assessment',()=>{
 const s=freshState(),ctx={render(){},save(){},toast(){}};openLearning('enzyme');
 learningUI.order=[0,1,3,2];handleLearning('learn-check',{dataset:{}},s,ctx);assert.equal(learningUI.feedback.ok,false);
 learningUI.order=[0,1,2,3];handleLearning('learn-check',{dataset:{}},s,ctx);assert.ok(s.learning.enzyme.stages.includes(2));
 openLearning('osmosis');learningUI.predictions={0:1,1:0};handleLearning('learn-check',{dataset:{}},s,ctx);assert.ok(s.learning.osmosis.stages.includes(2));
 learningUI.draft='选择透过性膜允许水通过，净流向高浓度一侧，平衡后仍双向运动。';handleLearning('learn-selfcheck',{dataset:{}},s,ctx);assert.equal(learningUI.checked,true);handleLearning('learn-finish',{dataset:{}},s,ctx);assert.ok(s.learning.osmosis.stages.includes(3));assert.equal(s.history.length,0);
});
test('Using assistance records practice but does not raise assessed mastery or schedule review',()=>{
 const s=freshState(),q=gaokaoQuestions[0];const e=observe(s,q,q.answer,1000,true);
 assert.equal(e.assisted,true);assert.equal(e.prior,e.next);assert.equal(s.history.length,1);assert.equal(s.skills[q.topic],undefined);
 const independent=observe(s,q,q.answer,2000,false);assert.ok(independent.next>independent.prior);
});
test('V1 archives remain valid and corrupt guided-learning payloads are rejected',()=>{
 assert.ok(validState(freshState()));assert.ok(validLearning(undefined));assert.equal(validLearning({cell:{stages:[100],views:[],steps:[]}}),false);assert.equal(validLearning({cell:{}}),false);assert.equal(validLearning({unknown:{stages:[],views:[],steps:[]}}),false);
 assert.equal(validState({...freshState(),notes:[null]}),false);
});
