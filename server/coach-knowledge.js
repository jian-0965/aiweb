// Original teaching notes adapted from BioGrow genetics-core.js and genetics.js.
// Lexical RAG: BM25 over Chinese characters/bigrams, terms and normalized aliases.
export const knowledge = [
  {id:'separation',title:'先列配子，再看子代',tags:'单基因 分离定律 杂合子 Aa 配子 概率',text:'在一个常染色体位点中，Aa 亲本的 A 与 a 随同源染色体分离进入不同配子，教学模型中各占一半。AA 只产生含 A 的配子，aa 只产生含 a 的配子。先分别列出双亲的配子及概率，再按独立受精组合，不能直接把亲本基因型当成子代比例。'},
  {id:'dominance',title:'基因型比例与表型比例不同',tags:'单基因 完全显性 Aa aa AA 隐性 显性 3比1 1比2比1',text:'Aa × Aa 的基因型比例为 AA:Aa:aa = 1:2:1。在 A 对 a 完全显性的前提下，AA 和 Aa 归为同一显性表型，表型比才是 3:1。显隐性描述杂合体的表现，不代表性状优劣、数量多少或进化方向。'},
  {id:'incomplete',title:'不完全显性与共显性',tags:'不完全显性 红 粉 白 中间表型 共显性',text:'不完全显性的教学例子中 AA 红色、Aa 粉色、aa 白色，因此 Aa × Aa 的表型比与基因型比都为 1:2:1。共显性是两种等位基因的效应都能表现，例如 ABO 位点 IᴬIᴮ 表现 AB 型。两者不可混同。'},
  {id:'independence',title:'自由组合需要前提',tags:'双基因 AaBb 自由组合 独立 A_bb A_B_ aabb 9比3比3比1',text:'在两个位点独立分配、各位点完全显性等假设下，可把 AaBb × AaBb 分成 Aa × Aa 与 Bb × Bb。A_ 概率为 3/4，bb 为 1/4，故 A_bb 为 3/16。9:3:3:1 还要求双亲均为双杂合子、配子和子代存活率等条件适用，不能看到两对基因就直接套用。'},
  {id:'linkage',title:'连锁时不能使用等频四配子',tags:'连锁 重组 交换 同一染色体 基因距离 非独立',text:'同一染色体上距离较近的两个位点通常不独立分配，亲本型与重组型配子可能不等频。必须根据相位、重组率或题目数据建立模型。本站自由组合工具不支持连锁与重组计算，应停止套用自由组合并要求补充数据。'},
  {id:'sex-origin',title:'儿子的 X 来自母亲',tags:'X连锁 伴性 XAXa XAY XaY 父子 母亲 女儿 儿子',text:'在 X 非同源区的隐性教学模型中，儿子从父亲获得 Y、从母亲获得 X；女儿从双亲各获得一个 X。父子同时患病不能证明父亲把 X 连锁等位基因直接传给儿子。需结合母亲基因型及完整家系，不能仅凭父子表型定型。'},
  {id:'conditional',title:'“患病男孩”与“男孩中患病”',tags:'条件概率 X连锁 样本空间 已知 男孩 患病男孩 下一胎 四分之一 二分之一',text:'母亲 XᴬXᵃ、父亲 XᴬY，按男女各半与配子等概率的简化假设，下一胎是患病男孩的概率为 1/4；已知孩子是男孩时，患病概率为 1/2。前者以全部子代为分母，后者只以男孩为分母。先明确问题的条件，再计算。'},
  {id:'abo',title:'ABO 位点的三种等位基因',tags:'ABO 血型 IAi IBi IAIB ii A型 B型 AB型 O型 共显性',text:'ABO 教学模型中 Iᴬ、Iᴮ 对 i 显性，Iᴬ 与 Iᴮ 共显性。Iᴬi × Iᴮi 的四类子代为 IᴬIᴮ、Iᴬi、Iᴮi、ii，各 1/4。A 型亲本可能是 IᴬIᴬ 或 Iᴬi，不能仅凭表型擅自认定杂合。该模型不用于输血决策、亲子鉴定或现实遗传风险判定。'},
  {id:'pedigree',title:'家系证据与推理边界',tags:'家系图 家谱 正常父母 患病女儿 常染色体隐性 外显率 新突变',text:'在单基因、完全外显、无新突变的题设下，正常父母生出患病女儿与常染色体隐性模型相容；X 连锁隐性患病女儿通常需要父亲提供致病 X，与正常父亲不符。结论依赖题设；小样本不能排除所有其他遗传机制。'},
  {id:'testcross',title:'测交怎样提供基因型证据',tags:'测交 Aa aa 隐性 纯合 杂合 后代',text:'在单基因完全显性模型中，显性个体 A_ 与 aa 测交。若亲本为 Aa，理论上子代 Aa 与 aa 各一半；若亲本为 AA，则理论上全为 Aa。有限样本里没有隐性子代不等于证明亲本一定是 AA，还要考虑样本数量。'},
  {id:'independent-events',title:'每次出生与至少一次',tags:'独立事件 每胎 连续 至少 概率 加法 乘法',text:'在各胎相互独立且单胎概率 p 不变的模型中，连续两次发生为 p²，至少一次为 1−(1−p)²。一个家庭已经出现某表型，不会自动改变下一胎概率。本站杂交表只计算单次受精分布，多胎问题需要另行明确事件与独立性。'},
  {id:'model-limits',title:'先选模型，再作解释',tags:'多基因 环境 身高 母系 线粒体 细胞质遗传 真实风险',text:'许多性状受多个基因与环境共同影响；母系传递可能提示线粒体遗传，但模式不是分子证据。本站五种简化模型不能计算多基因、线粒体异质性或现实个人疾病风险。题目证据不足时保留多种解释，不输出确定诊断。'}
].map(doc=>({...doc,source:'BioGrow 原创遗传教学笔记 · v1',href:'#genetics'}));

function normalize(text){return text.normalize('NFKC').replace(/ᴬ/g,'A').replace(/ᵃ/g,'a').replace(/ᴮ/g,'B').replace(/伴性/g,'X连锁').replace(/家谱/g,'家系').replace(/四分之一/g,'1/4').replace(/二分之一/g,'1/2').toLowerCase();}
function tokens(text){const s=normalize(text),result=s.match(/[a-z0-9_]+|[\u4e00-\u9fff]/g)??[];for(const run of s.match(/[\u4e00-\u9fff]+/g)??[])for(let i=0;i<run.length-1;i++)result.push(run.slice(i,i+2));return result;}
const index=knowledge.map(doc=>{const terms=tokens(doc.title+' '+doc.tags+' '+doc.text),freq=new Map();for(const t of terms)freq.set(t,(freq.get(t)??0)+1);return {doc,freq,length:terms.length};});
const average=index.reduce((sum,d)=>sum+d.length,0)/index.length;
export function retrieveKnowledge(query,limit=3){
  const terms=[...new Set(tokens(String(query).slice(0,5000)))];
  return index.map(({doc,freq,length})=>{let score=0;for(const term of terms){const tf=freq.get(term)??0;if(!tf)continue;const df=index.filter(d=>d.freq.has(term)).length,idf=Math.log(1+(index.length-df+.5)/(df+.5));score+=idf*(tf*2.2)/(tf+1.2*(.25+.75*length/average));}return {...doc,score:Number(score.toFixed(3))};}).filter(d=>d.score>1.5).sort((a,b)=>b.score-a.score||a.id.localeCompare(b.id)).slice(0,Math.min(4,Math.max(1,limit)));
}
