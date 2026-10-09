// Exact finite Punnett models. Each gamete array retains duplicates to represent
// probabilities from homozygous loci. These teaching models are conditional on
// the mode's assumptions, not a general model of human inheritance.
export const crossModes={
 mono:{title:'单基因完全显性',parents:['AA','Aa','aa'],default:['Aa','Aa'],target:'隐性性状 aa',assumption:'一个常染色体基因、两种等位基因，A 对 a 完全显性；配子等概率。'},
 incomplete:{title:'不完全显性',parents:['AA','Aa','aa'],default:['Aa','Aa'],target:'中间表型 Aa',assumption:'教学例子中 AA 红色、Aa 粉色、aa 白色；杂合体有中间表型，配子仍按分离定律形成。实际性状须经证据确认。'},
 di:{title:'双基因自由组合',parents:['AABB','AaBb','Aabb','aaBb','aabb'],default:['AaBb','AaBb'],target:'双隐性 aabb',assumption:'A/a 与 B/b 在不同染色体上或足够远，独立分配、完全显性；不适用于连锁基因。'},
 x:{title:'X 连锁隐性',mothers:['XAXA','XAXa','XaXa'],fathers:['XAY','XaY'],default:['XAXa','XAY'],target:'患病男孩 XaY（全部子代中）',assumption:'示例基因位于 X 的非同源区，A 正常、a 致病；女儿从父亲得到 X，儿子从父亲得到 Y，男女出生比例按 1∶1。'},
 abo:{title:'ABO 多等位与共显性',parents:['IAIA','IAi','IBIB','IBi','IAIB','ii'],default:['IAi','IBi'],target:'O 型子代 ii',assumption:'仅演示 ABO 位点：Iᴬ 与 Iᴮ 共显性，二者均对 i 显性；不考虑罕见血型、其他血型位点或输血判定。'}
};
const sortPair=(a,b)=>a.toUpperCase()===a?a+b:b+a;
export function gametes(mode,parent){
 if(mode==='mono'||mode==='incomplete')return parent.split('');
 if(mode==='di')return [...parent.slice(0,2)].flatMap(a=>[...parent.slice(2,4)].map(b=>a+b));
 if(mode==='x')return parent.match(/XA|Xa|Y/g)??[];
 if(mode==='abo')return parent.match(/IA|IB|i/g)??[];
 throw new Error('Unknown inheritance mode');
}
export function fraction(n,d){if(!Number.isInteger(n)||!Number.isInteger(d)||d<=0)throw new Error('Invalid fraction');if(n===0)return '0';let a=n,b=d;while(b)[a,b]=[b,a%b];return `${n/a}${d/a===1?'':'/'+d/a}`;}
export function offspring(mode,maternal,paternal){
 if(mode==='mono'){const genotype=sortPair(maternal,paternal);return {genotype,phenotype:genotype.includes('A')?'显性表现':'隐性表现'};}
 if(mode==='incomplete'){const genotype=sortPair(maternal,paternal);return {genotype,phenotype:genotype==='AA'?'红色':genotype==='Aa'?'粉色':'白色'};}
 if(mode==='di'){const genotype=sortPair(maternal[0],paternal[0])+sortPair(maternal[1],paternal[1]);return {genotype,phenotype:`${genotype.slice(0,2).includes('A')?'A_':'aa'} ${genotype.slice(2).includes('B')?'B_':'bb'}`};}
 if(mode==='x'){const genotype=paternal==='Y'?maternal+'Y':(maternal==='XA'?'XA'+paternal:paternal+maternal);const male=paternal==='Y';return {genotype,phenotype:male?(maternal==='Xa'?'患病男孩':'正常男孩'):(genotype==='XaXa'?'患病女孩':genotype.includes('Xa')?'携带者女孩':'正常女孩')};}
 if(mode==='abo'){const alleles=[maternal,paternal].sort((a,b)=>['IA','IB','i'].indexOf(a)-['IA','IB','i'].indexOf(b));const genotype=alleles.join('');const phenotype=alleles.includes('IA')&&alleles.includes('IB')?'AB 型':alleles.includes('IA')?'A 型':alleles.includes('IB')?'B 型':'O 型';return {genotype,phenotype};}
 throw new Error('Unknown inheritance mode');
}
export function cross(mode,mother,father){
 const config=crossModes[mode];if(!config)throw new Error('Unknown inheritance mode');
 const ms=config.mothers??config.parents,fs=config.fathers??config.parents;
 if(!ms.includes(mother)||!fs.includes(father))throw new Error('Invalid parental genotype');
 const maternal=gametes(mode,mother),paternal=gametes(mode,father);
 const cells=maternal.map(m=>paternal.map(f=>({maternal:m,paternal:f,...offspring(mode,m,f)})));
 const flat=cells.flat(),counts={};for(const c of flat)counts[c.phenotype]=(counts[c.phenotype]??0)+1;
 const target=flat.filter(c=>mode==='mono'?c.genotype==='aa':mode==='incomplete'?c.genotype==='Aa':mode==='di'?c.genotype==='aabb':mode==='x'?c.genotype==='XaY':c.phenotype==='O 型').length;
 return {maternal,paternal,cells,counts,total:flat.length,target,probability:fraction(target,flat.length)};
}

export const pedigreeCases=[
 {id:'unaffected-daughter',label:'案例 1 · 表型正常的父母',father:'正常',mother:'正常',daughter:'患病',son:'正常',story:'一对表型正常的父母生下一名患病女儿。假设单基因、完全外显、无新突变，且父母亲缘关系不影响判断。哪种解释与证据相容？',choices:['常染色体隐性：双亲可能是携带者','X 连锁隐性：患病女儿可从正常父亲获得致病 X','常染色体显性：患病女儿必定从正常父母遗传显性致病等位基因'],answer:0,hint:'患病女儿需要从父亲得到哪条性染色体？正常双亲怎样提供两个隐性等位基因？',explain:'在这些简化假设下，常染色体隐性可由两个携带者生出 aa 女儿；X 连锁隐性患病女儿需要父亲提供致病 X，但父亲表型正常。显性模型也不符。'},
 {id:'father-son',label:'案例 2 · 父亲与儿子均患病',father:'患病',mother:'正常',daughter:'正常',son:'患病',story:'父亲和儿子均患病，母亲表型正常。仅凭这一家系，能否断言父亲把 X 连锁致病等位基因直接传给了儿子？',choices:['能；儿子总会继承父亲的 X','不能；儿子从父亲获得 Y，患病原因还需看母亲及其他证据','能；父子都患病必然说明是 Y 连锁'],answer:1,hint:'儿子的 X 和 Y 分别来自谁？表型正常的母亲是否可能携带隐性等位基因？',explain:'父亲把 Y 给儿子，X 来自母亲。父子同患病不能证明父亲向儿子直接传递 X；母亲可能携带 X 连锁隐性等位基因，也可能是常染色体遗传。仅凭这一组关系无法定型。'},
 {id:'carrier-mother',label:'案例 3 · 已知的携带者母亲',father:'正常',mother:'携带者',daughter:'正常',son:'患病',story:'已知母亲 XᴬXᵃ，父亲 XᴬY。在“已经知道孩子是男孩”的条件下，儿子患该 X 连锁隐性病的概率是多少？',choices:['1/4；还要乘上生男孩的概率','1/2；男孩从母亲得到 Xᴬ 或 Xᵃ 的机会相同','1；母亲携带致病等位基因'],answer:1,hint:'题目已知是男孩，样本空间只剩两种母源 X。',explain:'已知是男孩时，不再乘 1/2 的性别概率；男孩得到 Xᵃ 的概率为 1/2。若问“下一胎是患病男孩”，在简化男女各半的假设下才是 1/4。'},
 {id:'maternal-pattern',label:'案例 4 · 母系跨代线索',father:'正常',mother:'患病',daughter:'患病',son:'患病',story:'多个分支呈现患病母亲的子女可能患病，患病父亲未见传给子女的母系遗传线索。哪个模型最值得优先检验？',choices:['线粒体遗传；但仍要核对完整家系与其他原因','X 连锁显性；父亲会把 Y 给所有女儿','单基因常染色体显性已被严格证明'],answer:0,hint:'线粒体主要来自哪一方？“最符合线索”与“已证明”有什么区别？',explain:'母系传递模式提示线粒体遗传值得优先检验；小样本家系仍不足以单独证明，需核查其他分支、外显率及分子证据。'}
];
export const probabilityProblems=[
 {id:'mono-aa',level:'基础',title:'Aa × Aa，子代为 aa 的概率？',choices:['1/4','1/2','3/4','1'],answer:0,hint:'两方都要给出 a。',steps:['母方给出 a 的概率 1/2。','父方给出 a 的概率 1/2。','独立配子结合：1/2 × 1/2 = 1/4。']},
 {id:'di-A-bb',level:'进阶',title:'AaBb × AaBb，子代为 A_bb 的概率？',choices:['1/16','3/16','1/4','9/16'],answer:1,hint:'分开求 A_ 与 bb，再用独立组合前提相乘。',steps:['Aa × Aa 得到 A_ 的概率 3/4。','Bb × Bb 得到 bb 的概率 1/4。','两基因自由组合：3/4 × 1/4 = 3/16；连锁时不能直接这样乘。']},
 {id:'x-affected-son',level:'进阶',title:'XᴬXᵃ × XᴬY，下一胎“患病男孩”的概率？',choices:['0','1/4','1/2','3/4'],answer:1,hint:'先考虑男孩，再考虑来自母亲的 Xᵃ。',steps:['按简化假设，生男孩概率 1/2。','男孩获得母源 Xᵃ 概率 1/2。','1/2 × 1/2 = 1/4；已知是男孩时答案变为 1/2。']},
 {id:'abo',level:'进阶',title:'Iᴬi × Iᴮi，子代为 AB 型的概率？',choices:['0','1/4','1/2','3/4'],answer:1,hint:'一方提供 Iᴬ，另一方提供 Iᴮ。',steps:['Iᴬi 亲本给出 Iᴬ 的概率 1/2。','Iᴮi 亲本给出 Iᴮ 的概率 1/2。','两者结合为 IᴬIᴮ：1/4，表现 AB 型。']},
 {id:'linked',level:'辨析',title:'两个基因在同一条染色体上且距离很近，还能直接套用 9∶3∶3∶1 吗？',choices:['能，只要是两个基因就可以','不能；需考虑连锁与重组频率','能，因为所有配子都四种等频','不能，因为所有基因都不发生重组'],answer:1,hint:'自由组合是一个有前提的模型。',steps:['9∶3∶3∶1 依赖独立分配、完全显性等前提。','连锁基因的亲本型与重组型配子一般不等频。','要根据基因距离与实际数据分析，不能直接套用固定比例。']}
];
