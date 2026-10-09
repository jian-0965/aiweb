import test from 'node:test';
import assert from 'node:assert/strict';
import {cross,gametes,fraction,pedigreeCases,probabilityProblems} from '../public/genetics-core.js';
import {renderGenetics,handleGenetics,changeGeneticsParent} from '../public/genetics.js';
import {freshState,mastery,validState} from '../public/engine.js';

test('Punnett models preserve gamete multiplicity and use distinct inheritance assumptions',()=>{
 assert.deepEqual(gametes('mono','AA'),['A','A']);
 assert.equal(cross('mono','Aa','Aa').probability,'1/4');
 assert.deepEqual(cross('mono','Aa','Aa').counts,{'显性表现':3,'隐性表现':1});
 assert.equal(cross('incomplete','Aa','Aa').probability,'1/2');
 assert.deepEqual(cross('incomplete','Aa','Aa').counts,{'红色':1,'粉色':2,'白色':1});
 assert.equal(cross('di','AaBb','AaBb').probability,'1/16');
 assert.equal(cross('di','AaBb','AaBb').total,16);
 assert.equal(cross('di','AaBb','aabb').probability,'1/4');
 assert.equal(cross('x','XAXa','XAY').probability,'1/4');
 assert.equal(cross('x','XaXa','XAY').probability,'1/2');
 assert.equal(cross('abo','IAi','IBi').probability,'1/4');
 assert.equal(cross('abo','IAIB','ii').probability,'0');
 assert.deepEqual(cross('abo','IAIB','ii').counts,{'A 型':2,'B 型':2});
 assert.equal(fraction(2,4),'1/2');
 assert.throws(()=>cross('x','XaY','XAXa'),/Invalid parental genotype/);
});

test('Pedigree and probability practice records reasoning without fabricating BKT mastery',()=>{
 const state=freshState(),ctx={render(){},save(){},toast(){}};
 assert.equal(pedigreeCases.length,4);assert.equal(probabilityProblems.length,5);
 assert.match(renderGenetics(state),/连锁与重组/);
 handleGenetics('gen-open-mode',{dataset:{id:'x'}},state,ctx);
 assert.match(renderGenetics(state),/X 连锁隐性/);
 handleGenetics('gen-predict',{dataset:{value:'1/4'}},state,ctx);
 handleGenetics('gen-reveal',{dataset:{}},state,ctx);
 assert.match(renderGenetics(state),/逐格核对基因型与表型/);
 assert.equal(state.genetics.crosses[0].correct,true);
 assert.equal(changeGeneticsParent('mother','XaXa'),true);
 assert.equal(changeGeneticsParent('father','XAXa'),false);
 handleGenetics('gen-section',{dataset:{id:'pedigree'}},state,ctx);
 handleGenetics('gen-case-choice',{dataset:{index:'0'}},state,ctx);
 handleGenetics('gen-case-submit',{dataset:{}},state,ctx);
 assert.equal(state.genetics.answers[0].correct,true);
 handleGenetics('gen-section',{dataset:{id:'probability'}},state,ctx);
 handleGenetics('gen-problem-choice',{dataset:{index:'0'}},state,ctx);
 handleGenetics('gen-problem-submit',{dataset:{}},state,ctx);
 assert.equal(state.genetics.answers[1].correct,true);
 assert.equal(mastery(state,'genetics'),.25);
 assert.equal(validState(state),true);
 state.genetics.crosses[0].mode='impossible';assert.equal(validState(state),false);
});
