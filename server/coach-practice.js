// Original transfer questions, separate from the coach's worked examples.
export const coachPractice=[
 {id:'coach-mono-test',mode:'mono',title:'完全显性、配子等概率：Aa × aa 的子代中，aa 的比例是多少？',choices:['0','1/4','1/2','3/4'],answer:2,steps:['Aa 产生 A、a 两种配子，各 1/2；aa 只产生 a 配子。','子代为 Aa 或 aa，各 1/2。']},
 {id:'coach-mono-pure',mode:'mono',title:'AA 与 aa 杂交，子代 Aa 的理论比例是多少？',choices:['0','1/4','1/2','1'],answer:3,steps:['两方分别只产生 A 与 a 配子。','每次结合都形成 Aa，因此理论比例为 1。']},
 {id:'coach-incomplete-test',mode:'incomplete',title:'AA 红、Aa 粉、aa 白：粉花与白花杂交，粉花子代比例是多少？',choices:['0','1/4','1/2','3/4'],answer:2,steps:['亲本为 Aa × aa，子代 Aa 与 aa 各 1/2。','只有 Aa 表现粉色，因此为 1/2。']},
 {id:'coach-incomplete-pure',mode:'incomplete',title:'AA 红、Aa 粉、aa 白：红花与白花杂交，子代全部是什么颜色？',choices:['红色','粉色','白色','无法确定'],answer:1,steps:['亲本 AA × aa 的子代全部是 Aa。','在题设不完全显性模型中，Aa 为粉色。']},
 {id:'coach-di-test',mode:'di',title:'两个位点独立分配：AaBb × aabb，子代为 aabb 的概率？',choices:['1/16','1/8','1/4','1/2'],answer:2,steps:['Aa × aa 得到 aa 的概率为 1/2。','Bb × bb 得到 bb 的概率为 1/2。','在独立分配前提下，相乘得到 1/4。']},
 {id:'coach-di-split',mode:'di',title:'独立分配且完全显性：Aabb × aaBb，子代为 A_B_ 的概率？',choices:['1/4','1/2','3/4','9/16'],answer:0,steps:['A_ 来自 Aa × aa，概率 1/2。','B_ 来自 bb × Bb，概率 1/2。','相乘为 1/4，不能直接套用 9/16。']},
 {id:'coach-x-son',mode:'x',title:'X 连锁隐性教学模型：母亲 XᵃXᵃ、父亲 XᴬY。已知子代是男孩，患病概率？',choices:['0','1/4','1/2','1'],answer:3,steps:['男孩的 X 来自母亲。','母亲只提供 Xᵃ，因此所有儿子都是 XᵃY。','已知男孩，不再乘生男孩的概率。']},
 {id:'coach-x-daughter',mode:'x',title:'母亲 XᴬXᵃ、父亲 XᵃY。已知是女孩，患该 X 连锁隐性病的概率？',choices:['0','1/4','1/2','1'],answer:2,steps:['女孩都从父亲得到 Xᵃ。','母亲给出 Xᵃ 的概率为 1/2，形成 XᵃXᵃ。','以女孩为样本空间，概率为 1/2。']},
 {id:'coach-abo-zero',mode:'abo',title:'仅考虑 ABO 位点：IᴬIᴮ × ii，子代为 O 型的理论概率？',choices:['0','1/4','1/2','1'],answer:0,steps:['AB 型亲本提供 Iᴬ 或 Iᴮ，不能提供 i。','子代为 Iᴬi 或 Iᴮi，不会形成 ii。']},
 {id:'coach-abo-half',mode:'abo',title:'仅考虑 ABO 位点：Iᴬi × ii，子代为 A 型的理论概率？',choices:['0','1/4','1/2','1'],answer:2,steps:['一方提供 Iᴬ 或 i，各 1/2；另一方只提供 i。','Iᴬi 与 ii 各 1/2，A 型概率为 1/2。']}
];
export function publicPractice(p,seen=[]){return {id:p.id,title:p.title,choices:p.choices,level:'迁移练习',origin:'BioGrow 原创教学练习',repeated:seen.includes(p.id),note:''};}
