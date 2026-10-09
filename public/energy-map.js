// A code-native, downloadable teaching diagram. Labels and annotations are
// original; the arrows describe flows under the stated simplified conditions.
export const energyMapSteps=[
 {id:'sun',lane:'plant',title:'阳光',short:'提供光能',detail:'叶绿体中的色素吸收光能，驱动类囊体膜上的光反应。阳光是能量来源，却不会直接变成葡萄糖分子。',question:'光照先作用于哪里？'},
 {id:'light',lane:'plant',title:'类囊体膜 · 光反应',short:'水参与，释放 O₂',detail:'水在光反应中提供电子和氢离子，产生的氧气来源于水。光能转化过程形成 ATP 与 NADPH，供叶绿体内后续碳固定使用。',question:'释放的 O₂ 中的氧来自水还是 CO₂？'},
 {id:'carrier',lane:'plant',title:'ATP + NADPH',short:'叶绿体内接力',detail:'ATP 提供能量，NADPH 提供还原力。它们连接光反应与卡尔文循环；不要把光反应产生的 ATP 当作植物所有部位直接使用的 ATP。',question:'卡尔文循环需要光反应提供哪两类物质？'},
 {id:'carbon',lane:'plant',title:'基质 · 碳固定',short:'吸收 CO₂，形成糖前体',detail:'卡尔文循环在叶绿体基质中利用 CO₂、ATP 和 NADPH，将碳逐步转入三碳糖等有机物，再用于合成蔗糖、淀粉等。它不等于“只能在黑暗中进行”。',question:'糖的碳主要来自哪一种气体？'},
 {id:'sugar',lane:'plant',title:'有机物',short:'储存可利用的化学能',detail:'植物把固定的碳用于合成有机物。蔗糖可运输，淀粉可储存；植物也可分解有机物，经细胞呼吸合成供自身生命活动使用的 ATP。',question:'植物做出糖之后，为什么仍然需要细胞呼吸？'},
 {id:'food',lane:'human',title:'吃下食物',short:'以淀粉类食物为例',detail:'植物合成的有机物可直接或通过食物链成为人的食物。这里追踪淀粉到葡萄糖的例子；脂肪和蛋白质也可提供能量，但消化与代谢路径不同。',question:'食物里的能量最初可以追溯到什么来源？'},
 {id:'digest',lane:'human',title:'消化',short:'淀粉逐步分解',detail:'淀粉经消化酶逐步分解，最终形成可被吸收的葡萄糖等小分子。消化只是把大分子处理为可吸收形式，并不等于细胞已经获得全部 ATP。',question:'“消化完成”和“细胞合成 ATP”是同一步吗？'},
 {id:'absorb',lane:'human',title:'吸收与运输',short:'小肠 → 血液 → 组织',detail:'葡萄糖经小肠吸收进入血液，随循环到达各组织，再通过相应转运机制进入细胞。吸收和细胞摄取受具体条件调节。',question:'葡萄糖从肠腔到肌肉细胞，中间经过哪些环节？'},
 {id:'glycolysis',lane:'human',title:'糖酵解',short:'在细胞质基质',detail:'葡萄糖在细胞质基质中经过糖酵解，形成丙酮酸，并产生少量 ATP。糖酵解本身不直接使用氧气；图中下一步展示有氧条件下的主要去向。',question:'糖酵解发生在哪里？它会直接消耗 O₂ 吗？'},
 {id:'mito',lane:'human',title:'有氧呼吸',short:'线粒体参与后续过程',detail:'在有氧条件下，丙酮酸的进一步氧化及氧化磷酸化与线粒体有关。氧气作为电子传递链最终电子受体，整体过程释放 CO₂、形成水，并把部分能量转移到 ATP，其余以热散失。',question:'吸入的 O₂ 在有氧呼吸中承担什么作用？'},
 {id:'atp',lane:'human',title:'ATP 供能',short:'运输 · 合成 · 运动',detail:'ATP 水解与主动运输、物质合成、肌肉收缩等需能活动耦联。ATP 与 ADP 不断周转；它是常用的能量载体，并非食物中的能量全部都进入 ATP。',question:'细胞合成 ATP 后，能用于哪些具体活动？'}
];
const byId=new Map(energyMapSteps.map(s=>[s.id,s]));
let selected='sun';
const rect=(x,y,w,h,fill,rx=22)=>`<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${rx}" fill="${fill}"/>`;
const line=(x1,y1,x2,y2,cls='plant-arrow')=>`<path class="${cls}" d="M${x1} ${y1} L${x2} ${y2}"/>`;
function card(id,x,y,w,heading,sub,num,color){const active=selected===id;return `<g class="diagram-node map-node ${active?'map-active':''}" data-action="map-step" data-step="${id}" role="button" tabindex="0" aria-label="查看${heading}的讲解"><title>点击查看：${heading}</title>${rect(x,y,w,104,'#fff',19)}<rect x="${x}" y="${y}" width="7" height="104" rx="3" fill="${color}"/><circle cx="${x+31}" cy="${y+30}" r="17" fill="${color}"/><text class="map-num" x="${x+31}" y="${y+36}" text-anchor="middle">${num}</text><text class="map-card-title" x="${x+20}" y="${y+61}">${heading}</text><text class="map-card-sub" x="${x+20}" y="${y+86}">${sub}</text></g>`;}
function tag(x,y,w,label,fill='#fff'){return `<g>${rect(x,y,w,41,fill,13)}<text class="map-tag" x="${x+w/2}" y="${y+26}" text-anchor="middle">${label}</text></g>`;}
export function energyMapSVG(){return `<svg id="energy-map-svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1600 1090" role="img" aria-labelledby="energy-map-title energy-map-desc">
<title id="energy-map-title">从阳光、植物到食物与人体细胞 ATP 的能量路径</title><desc id="energy-map-desc">上半部分从阳光到植物叶绿体的光反应、碳固定和有机物；下半部分从食物的消化吸收到糖酵解、有氧呼吸和 ATP 利用。点击节点可阅读解释。</desc>
<defs><marker id="map-green-arrow" markerWidth="10" markerHeight="10" refX="8" refY="5" orient="auto"><path d="M0 0 L10 5 L0 10 Z" fill="#659674"/></marker><marker id="map-orange-arrow" markerWidth="10" markerHeight="10" refX="8" refY="5" orient="auto"><path d="M0 0 L10 5 L0 10 Z" fill="#c48162"/></marker><marker id="map-bridge-arrow" markerWidth="10" markerHeight="10" refX="8" refY="5" orient="auto"><path d="M0 0 L10 5 L0 10 Z" fill="#ad945b"/></marker></defs>
<style><![CDATA[
text{font-family:system-ui,-apple-system,"Noto Sans CJK SC","Microsoft YaHei",sans-serif}.map-title{font-size:38px;font-weight:750;fill:#1c443b}.map-subtitle{font-size:17px;fill:#526e62}.map-lane{font-size:25px;font-weight:750;fill:#315945}.map-human-lane{fill:#835744}.map-intro{font-size:15px;fill:#687c6f}.map-card-title{font-size:17px;font-weight:700;fill:#253f35}.map-card-sub{font-size:12px;fill:#65796d}.map-num{font-size:14px;font-weight:750;fill:#fff}.map-tag{font-size:14px;font-weight:650;fill:#476256}.map-note{font-size:14px;fill:#607467}.map-note-bold{font-size:16px;font-weight:700;fill:#365a48}.plant-arrow{fill:none;stroke:#659674;stroke-width:5;stroke-linecap:round;stroke-linejoin:round;marker-end:url(#map-green-arrow)}.human-arrow{fill:none;stroke:#c48162;stroke-width:5;stroke-linecap:round;stroke-linejoin:round;marker-end:url(#map-orange-arrow)}.bridge-arrow{fill:none;stroke:#ad945b;stroke-width:5;stroke-dasharray:11 9;stroke-linecap:round;marker-end:url(#map-bridge-arrow)}.input-arrow{fill:none;stroke:#8baf9b;stroke-width:3;marker-end:url(#map-green-arrow)}.output-arrow{fill:none;stroke:#a2b8ab;stroke-width:3;marker-end:url(#map-green-arrow)}.map-node{cursor:pointer;outline:none}.map-node>rect:first-of-type{stroke:#d7e5d8;stroke-width:2;filter:drop-shadow(0 7px 8px #33583a12)}.map-node:hover>rect:first-of-type,.map-node:focus-visible>rect:first-of-type,.map-active>rect:first-of-type{stroke:#4e8b66;stroke-width:4}.map-node:focus-visible{filter:drop-shadow(0 0 7px #82b992)}
]]></style>
${rect(0,0,1600,1090,'#f6f8f1',0)}${rect(36,125,1528,422,'#e6f1e8',30)}${rect(36,615,1528,363,'#f8ece2',30)}
<text class="map-title" x="68" y="68">从一束阳光到细胞里的 ATP</text><text class="map-subtitle" x="70" y="101">两条路径，一个关键区别：先把能量存进有机物，再按细胞需要转给 ATP。</text>
<text class="map-lane" x="70" y="167">01 / 植物如何利用阳光</text><text class="map-intro" x="470" y="164">光能 → 叶绿体中的短程载体 → 有机物中的化学能</text>
${line(278,285,352,285)}${line(596,285,669,285)}${line(897,285,968,285)}${line(1213,285,1285,285)}
${card('sun',72,225,206,'阳光','光能进入叶片','1','#d5a45c')}
${card('light',352,225,244,'类囊体膜 · 光反应','水参与；释放 O₂','2','#589278')}
${card('carrier',669,225,228,'ATP + NADPH','在叶绿体内接力','3','#78a16c')}
${card('carbon',968,225,245,'基质 · 碳固定','利用 CO₂ 形成糖前体','4','#589278')}
${card('sugar',1285,225,235,'有机物','储存化学能','5','#6c9b61')}
${tag(350,402,150,'H₂O 水','#f7fcfb')}${tag(605,402,186,'O₂ 释放到环境','#f7fcfb')}${tag(971,402,175,'CO₂ 来自空气','#f7fcfb')}${tag(1260,398,260,'植物也呼吸 → 合成 ATP','#f7fcfb')}
<path class="input-arrow" d="M425 399 L425 337"/><path class="output-arrow" d="M554 335 L650 397"/><path class="input-arrow" d="M1057 399 L1057 337"/><path class="input-arrow" d="M1398 337 L1398 392"/>
<text class="map-note" x="70" y="512">要点：光反应释放的 O₂ 来自水；糖中的碳来自 CO₂。光反应的 ATP 主要在叶绿体内使用。</text>
<path class="bridge-arrow" d="M1518 337 C1575 401 1568 610 1470 714"/>${tag(1100,560,386,'有机物沿食物链直接或间接进入人的食物','#fff8e7')}
<text class="map-human-lane map-lane" x="70" y="659">02 / 人吃下食物后发生什么</text><text class="map-intro" x="577" y="658">以淀粉 → 葡萄糖 → 有氧呼吸为例，方向从右往左读</text>
${line(1358,785,1334,785,'human-arrow')}${line(1126,785,1099,785,'human-arrow')}${line(870,785,847,785,'human-arrow')}${line(615,785,588,785,'human-arrow')}${line(339,785,311,785,'human-arrow')}
${card('food',1358,730,170,'吃下食物','以淀粉为例','1','#c98762')}
${card('digest',1126,730,208,'消化','大分子逐步分解','2','#c98762')}
${card('absorb',870,730,229,'吸收与运输','小肠 → 血液 → 细胞','3','#c98762')}
${card('glycolysis',615,730,232,'糖酵解','在细胞质基质','4','#c98762')}
${card('mito',339,730,249,'有氧呼吸','线粒体参与后续过程','5','#b5795f')}
${card('atp',74,730,237,'ATP 供能','运输 · 合成 · 运动','6','#bd8652')}
${tag(329,874,160,'吸入 O₂','#fffaf5')}${tag(520,874,235,'释放 CO₂、形成水与热','#fffaf5')}
<path class="human-arrow" d="M407 872 L407 842"/><path class="output-arrow" d="M522 842 L617 869"/>
<text class="map-note" x="72" y="943">淀粉只是一条示例路径：脂肪、蛋白质也能供能，但消化及进入代谢的步骤不同；缺氧时还可能通过糖酵解获得少量 ATP。</text>
${rect(36,1000,1528,65,'#e8eee5',17)}<text class="map-note-bold" x="67" y="1028">把两段连起来：</text><text class="map-note" x="225" y="1028">植物把光能转为有机物中的化学能；人的细胞分解食物中的有机物，把部分能量转移到 ATP。</text><text class="map-note" x="67" y="1051">图为教学简化流程：真实代谢有更多步骤和调控；能量不会百分之百进入 ATP。</text>
</svg>`;}
export function renderEnergyMap(){const s=byId.get(selected);return `<section class="energy-map-section" aria-labelledby="energy-map-heading"><div class="energy-map-heading"><div><span class="eyebrow">THE BIG PICTURE / ENERGY JOURNEY</span><h2 id="energy-map-heading">阳光、食物与细胞：一张图连起来</h2><p>从植物光合到人的细胞利用。点击图上的节点，逐步读懂每一次物质与能量的转移。</p></div><button class="btn small light" data-action="map-download">下载高清 SVG ↗</button></div><div class="energy-map-legend"><span><i class="plant"></i>植物：光能变成有机物</span><span><i class="bridge"></i>沿食物链进入食物</span><span><i class="human"></i>人体：有机物供细胞合成 ATP</span></div><div class="energy-map-scroll" tabindex="0" aria-label="能量流程大图，可横向滚动">${energyMapSVG()}</div><p class="tiny energy-map-tip">手机上可左右滑动查看大图；下方的步骤按钮也能打开相同讲解。箭头表示教学简化路径。</p><div class="energy-map-steps" aria-label="选择流程步骤">${energyMapSteps.map((x,i)=>`<button class="${selected===x.id?'active':''}" data-action="map-step" data-step="${x.id}" aria-pressed="${selected===x.id}">${i+1}. ${x.title}</button>`).join('')}</div><div class="energy-map-detail" aria-live="polite"><span class="eyebrow">${s.lane==='plant'?'植物路径':'人体路径'} / STEP ${String(energyMapSteps.indexOf(s)+1).padStart(2,'0')}</span><h3>${s.title}</h3><p>${s.detail}</p><div class="energy-map-think"><strong>停一下，想一想：</strong>${s.question}</div></div></section>`;}
export function handleEnergyMap(action,el,{render,toast}){
 if(action==='map-step'){if(byId.has(el.dataset.step)){selected=el.dataset.step;render();}return true;}
 if(action==='map-download'){const svg=energyMapSVG();const url=URL.createObjectURL(new Blob([svg],{type:'image/svg+xml;charset=utf-8'}));const a=document.createElement('a');a.href=url;a.download='BioGrow-细胞能量全景图.svg';a.click();setTimeout(()=>URL.revokeObjectURL(url),2000);toast('能量全景图已下载');return true;}
 return false;
}
