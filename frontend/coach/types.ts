export type Mode = 'mono'|'incomplete'|'di'|'x'|'abo';
export interface CrossInput {mode:Mode;mother:string;father:string;target:string;denominator:'all'|'male'|'female'}
export interface Practice {id:string;title:string;choices:string[];level:string;origin:string;repeated:boolean;note:string}
export interface Grade {id:string;choice:number;correct:boolean;answer:number;steps:string[];reviewDays:number}
export interface Calculation extends CrossInput {title:string;assumption:string;numerator:number;denominatorCount:number;probability:string;scope:string;maternal:string[];paternal:string[];cells:{maternal:string;paternal:string;genotype:string;phenotype:string;match:boolean}[]}
export interface CoachResult {
 source:'ai'|'rules';notice:string;durationMs:number;
 answer:{summary:string;hint:string;question:string;needsClarification:boolean;limitations:string[];citations:string[]};
 documents:{id:string;title:string;text:string;source:string;href:string}[];
 trace:{tool:string;origin:'model'|'workflow';status:string;detail:string}[];
 calculation:Calculation|null;practice:Practice;
}
export interface Review {id:string;title:string;due:number}
export interface LearningState {
 genetics?:{visited:string[];crosses:unknown[];answers:{id:string;choice:number;correct:boolean;assisted:boolean;time:number}[]};
 coach?:{version:1;reviews:Review[]};
}
export interface Context {render:()=>void;save:()=>void;toast:(message:string)=>void;navigate:(page:string)=>void}
export interface CoachUI {
 question:string;attempt:string;cross:CrossInput;useCross:boolean;confirmed:boolean;
 image:string;imageName:string;uncertain:string[];busy:'coach'|'image'|'grade'|'review'|null;error:string;
 level:1|2|3;result:CoachResult|null;history:{prompt:string;hint:string}[];
 practice:Practice|null;choice:number|null;grade:Grade|null;assisted:boolean;reviewing:boolean;
}
export const models:Record<Mode,{name:string;mother:string[];father:string[];targets:string[];default:CrossInput;assumption:string}>={
 mono:{name:'单基因完全显性',mother:['AA','Aa','aa'],father:['AA','Aa','aa'],targets:['AA','Aa','aa','A_'],default:{mode:'mono',mother:'Aa',father:'Aa',target:'aa',denominator:'all'},assumption:'一个常染色体位点，A 对 a 完全显性，配子等概率。'},
 incomplete:{name:'不完全显性',mother:['AA','Aa','aa'],father:['AA','Aa','aa'],targets:['AA','Aa','aa'],default:{mode:'incomplete',mother:'Aa',father:'Aa',target:'Aa',denominator:'all'},assumption:'AA 红、Aa 粉、aa 白；配子等概率。'},
 di:{name:'双基因自由组合',mother:['AABB','AaBb','Aabb','aaBb','aabb'],father:['AABB','AaBb','Aabb','aaBb','aabb'],targets:['A_B_','A_bb','aaB_','aabb'],default:{mode:'di',mother:'AaBb',father:'AaBb',target:'A_bb',denominator:'all'},assumption:'两个位点独立分配、完全显性；不适用于连锁。'},
 x:{name:'X 连锁隐性',mother:['XAXA','XAXa','XaXa'],father:['XAY','XaY'],targets:['XaY','XaXa','XAXa','affected'],default:{mode:'x',mother:'XAXa',father:'XAY',target:'XaY',denominator:'all'},assumption:'X 非同源区隐性模型，男女各半，配子等概率。'},
 abo:{name:'ABO 多等位',mother:['IAIA','IAi','IBIB','IBi','IAIB','ii'],father:['IAIA','IAi','IBIB','IBi','IAIB','ii'],targets:['A 型','B 型','AB 型','O 型'],default:{mode:'abo',mother:'IAi',father:'IBi',target:'O 型',denominator:'all'},assumption:'仅考虑 ABO 位点，不用于现实风险或输血判断。'}
};
export const examples:{label:string;question:string;mode:Mode}[]=[
 {label:'分离定律',question:'Aa × Aa，在完全显性、配子等概率的模型中，为什么子代 aa 的概率是 1/4？我想从配子开始推。',mode:'mono'},
 {label:'条件概率',question:'X 连锁隐性模型：母亲 XᴬXᵃ，父亲 XᴬY。下一胎是患病男孩的概率是多少？和“已知是男孩”有什么不同？',mode:'x'},
 {label:'自由组合',question:'两个位点独立分配且完全显性：AaBb × AaBb，A_bb 的概率怎样计算？',mode:'di'},
 {label:'ABO 血型',question:'仅考虑 ABO 位点：Iᴬi × Iᴮi 的子代可能为 O 型吗？先教我列配子。',mode:'abo'}
];
export const pretty=(value:string)=>value.replace(/XA/g,'Xᴬ').replace(/Xa/g,'Xᵃ').replace(/IA/g,'Iᴬ').replace(/IB/g,'Iᴮ').replace(/^affected$/,'患病子代');
