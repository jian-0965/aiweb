import test from 'node:test';
import assert from 'node:assert/strict';
import {freshState,validState,mastery} from '../public/engine.js';
import {energyChapters,designTasks,renderEnergy,handleEnergy,updateEnergyDraft,updateEnergyConclusion,updateEnergyField} from '../public/energy.js';

test('A learner can explain five linked concepts without self-assessment inflating mastery',()=>{
 const state=freshState();let renders=0;const ctx={render:()=>renders++,save(){},toast(){}};
 assert.equal(energyChapters.length,5);
 assert.match(renderEnergy(state),/ATP：能量怎样被接力/);
 updateEnergyDraft('<img src=x onerror=alert(1)> ATP 由 ADP 补充');
 handleEnergy('energy-compare',{dataset:{}},state,ctx);
 assert.equal(state.energy.writings.length,1);
 assert.match(renderEnergy(state),/&lt;img/);
 assert.match(renderEnergy(state),/参考思路（不是自动批改）/);
 handleEnergy('energy-reflect',{dataset:{value:'review'}},state,ctx);
 assert.equal(state.energy.writings[0].reflection,'review');
 assert.equal(mastery(state,'enzyme'),.25);
 for(const chapter of energyChapters){handleEnergy('energy-chapter',{dataset:{id:chapter.id}},state,ctx);assert.match(renderEnergy(state),new RegExp(chapter.prompt.slice(0,5)));}
 assert.ok(renders>=7);assert.ok(validState(state));
});

test('Only a controlled experiment exposes model data; a conclusion remains a learner record',()=>{
 const state=freshState();let saves=0;const ctx={render(){},save(){saves++;},toast(){}};
 updateEnergyField('independent','反应时间');
 handleEnergy('energy-check-design',{dataset:{}},state,ctx);
 assert.match(renderEnergy(state),/先调整设计/);
 assert.doesNotMatch(renderEnergy(state),/<h3>教学模型生成的示意数据<\/h3>/);
 assert.equal(saves,0);
 for(const [key,value] of Object.entries(designTasks.enzyme))if(['independent','dependent','control','hypothesis'].includes(key))updateEnergyField(key,value);
 handleEnergy('energy-check-design',{dataset:{}},state,ctx);
 assert.match(renderEnergy(state),/教学模型生成的示意数据/);
 assert.equal(state.energy.designs.length,1);
 updateEnergyConclusion('37°C 附近模型值最高，不能因此推断所有酶均在此达到最适温度。');
 handleEnergy('energy-save-conclusion',{dataset:{}},state,ctx);
 assert.match(state.energy.designs[0].conclusion,/不能因此推断/);
 assert.ok(validState(state));
 state.energy.designs[0].conclusion={bad:true};assert.equal(validState(state),false);
});
