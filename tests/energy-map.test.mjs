import test from 'node:test';
import assert from 'node:assert/strict';
import {energyMapSteps,energyMapSVG,renderEnergyMap,handleEnergyMap} from '../public/energy-map.js';

test('Full energy path connects light, organic matter, food and cellular ATP with separate inputs',()=>{
 const svg=energyMapSVG();
 assert.equal(energyMapSteps.length,11);
 assert.equal((svg.match(/class="diagram-node map-node/g)??[]).length,11);
 assert.match(svg,/viewBox="0 0 1600 1090"/);
 for(const label of ['H₂O 水','O₂ 释放到环境','CO₂ 来自空气','植物也呼吸','吃下食物','消化','吸收与运输','糖酵解','有氧呼吸','ATP 供能'])assert.ok(svg.includes(label),label);
 assert.match(svg,/有机物沿食物链直接或间接进入人的食物/);
 assert.match(svg,/光反应的 ATP 主要在叶绿体内使用/);
 assert.match(svg,/脂肪、蛋白质也能供能/);
 assert.ok(!svg.includes('<foreignObject'));
});

test('Selecting a diagram node reveals its explanation and does not record a quiz attempt',()=>{
 let renders=0;const ctx={render:()=>renders++,toast(){}};
 assert.match(renderEnergyMap(),/阳光、食物与细胞/);
 assert.equal(handleEnergyMap('map-step',{dataset:{step:'mito'}},ctx),true);
 assert.equal(renders,1);
 assert.match(renderEnergyMap(),/氧气作为电子传递链最终电子受体/);
 assert.equal(handleEnergyMap('map-step',{dataset:{step:'invalid'}},ctx),true);
 assert.equal(renders,1);
});

test('SVG download is a self-contained image with the full diagram',async()=>{
 const oldDocument=globalThis.document,oldCreate=URL.createObjectURL,oldRevoke=URL.revokeObjectURL,oldTimeout=globalThis.setTimeout;
 let blob,filename,clicked=false;
 try{
  globalThis.document={createElement:()=>({click(){clicked=true;filename=this.download;}})};
  URL.createObjectURL=value=>{blob=value;return 'blob:energy-map';};URL.revokeObjectURL=()=>{};
  globalThis.setTimeout=()=>0;
  handleEnergyMap('map-download',{dataset:{}},{render(){},toast(){}});
  assert.equal(clicked,true);assert.equal(filename,'BioGrow-细胞能量全景图.svg');
  assert.equal(blob.type,'image/svg+xml;charset=utf-8');
  assert.match(await blob.text(),/<svg[^>]+xmlns="http:\/\/www.w3.org\/2000\/svg"/);
  assert.match(await blob.text(),/植物也呼吸/);
 }finally{globalThis.document=oldDocument;URL.createObjectURL=oldCreate;URL.revokeObjectURL=oldRevoke;globalThis.setTimeout=oldTimeout;}
});
