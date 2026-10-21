import {cross,crossModes,fraction} from '../public/genetics-core.js';
import {retrieveKnowledge} from './coach-knowledge.js';
import {coachPractice,publicPractice} from './coach-practice.js';

export const targets={mono:['AA','Aa','aa','A_'],incomplete:['AA','Aa','aa'],di:['A_B_','A_bb','aaB_','aabb'],x:['XaY','XaXa','XAXa','affected'],abo:['A 型','B 型','AB 型','O 型']};
export function validateCross(value){
  if(!value||!Object.hasOwn(crossModes,value.mode))throw Error('请选择支持的遗传模型。');
  const {mode,mother,father,target,denominator}=value,c=crossModes[mode];
  if(!(c.mothers??c.parents).includes(mother)||!(c.fathers??c.parents).includes(father)||!targets[mode].includes(target)||!['all','male','female'].includes(denominator)||(mode!=='x'&&denominator!=='all'))throw Error('亲本、目标或样本空间不符合所选模型。');
  return {mode,mother,father,target,denominator};
}
export function calculateCross(value){
  const v=validateCross(value),r=cross(v.mode,v.mother,v.father);
  const cells=r.cells.flat().filter(c=>v.denominator==='all'||(v.denominator==='male'?c.genotype.endsWith('Y'):!c.genotype.endsWith('Y')));
  const matches=c=>v.mode==='abo'?c.phenotype===v.target:v.mode==='di'?c.phenotype.replace(/ /g,'')===v.target:v.target==='A_'?c.genotype.includes('A'):v.target==='affected'?['XaY','XaXa'].includes(c.genotype):c.genotype===v.target;
  const n=cells.filter(matches).length;
  return {...v,title:crossModes[v.mode].title,assumption:crossModes[v.mode].assumption,numerator:n,denominatorCount:cells.length,probability:fraction(n,cells.length),maternal:r.maternal,paternal:r.paternal,cells:cells.map(c=>({...c,match:matches(c)})),scope:v.denominator==='male'?'已知为男孩':v.denominator==='female'?'已知为女孩':'全部子代'};
}
export function cleanEvidence(input={}){
  if(!input||typeof input!=='object'||Array.isArray(input))input={};
  const number=n=>Number.isInteger(n)&&n>=0&&n<=100000?n:0;
  const attempts=number(input.attempts),correct=Math.min(number(input.correct),attempts),assisted=Math.min(number(input.assisted),attempts);
  return {attempts,correct,assisted,meaning:'用户当前浏览器的遗传专题汇总；提示作答与独立作答需区分，记录不等于能力认证。'};
}
export function practiceFor(mode='mono',seen=[]){
  const candidates=coachPractice.filter(p=>p.mode===mode),p=candidates.find(p=>!seen.includes(p.id))??candidates[0]??coachPractice[0];
  return publicPractice(p,seen);
}
export function gradePractice(id,choice){const p=coachPractice.find(p=>p.id===id);if(!p||!Number.isInteger(choice)||choice<0||choice>=p.choices.length)throw Error('练习答案无效。');return {id,choice,correct:choice===p.answer,answer:p.answer,steps:p.steps,reviewDays:choice===p.answer?3:1};}
const schema=(name,description,properties,required=[])=>({type:'function',function:{name,description,parameters:{type:'object',properties,required,additionalProperties:false}}});
export const coachTools=[
  schema('search_knowledge','检索本站遗传知识笔记，返回可引用的原文。用于核对解释，不检索网络。',{query:{type:'string',description:'需要核对的概念或题目条件',maxLength:1000}},['query']),
  schema('calculate_cross','按用户已核对的亲本、模型、目标和样本空间计算精确配子组合。没有已确认参数时不可调用。不支持连锁、多胎或现实诊断。',{}),
  schema('get_learning_evidence','读取当前请求提供的学习统计；只能描述观察，不可把参与或提示作答等同掌握。',{}),
  schema('choose_practice','从已有原创题中选择适合当前模型的下一题；不创造高考来源，不修改学习记录。',{})
];
export function executeTool(name,args,context){
  if(!args||typeof args!=='object'||Array.isArray(args))throw Error('工具参数格式不正确。');
  if(name==='search_knowledge'){if(Object.keys(args).some(k=>k!=='query')||typeof args.query!=='string'||args.query.length>1000)throw Error('检索词无效。');return retrieveKnowledge(args.query);}
  if(Object.keys(args).length)throw Error('该工具不接受模型补写的参数。');
  if(name==='calculate_cross'){if(!context.cross)throw Error('请先让学生核对并启用计算条件。');return calculateCross(context.cross);}
  if(name==='get_learning_evidence')return cleanEvidence(context.evidence);
  if(name==='choose_practice')return practiceFor(context.cross?.mode,context.seen);
  throw Error('工具未授权。');
}
