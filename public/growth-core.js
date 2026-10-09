// Shared browser/server contract. No external model or credentials in this module.
export const topicNames={cell:'细胞结构',membrane:'物质运输',osmosis:'渗透与水分平衡',enzyme:'酶',photo:'光合作用',respiration:'细胞呼吸',genetics:'遗传',ecology:'生态系统'};
const Q=(id,title,type,options=[],extra={})=>({id,title,type,options,...extra});
export const surveyQuestions=[
 Q('stage','你目前处于哪个学习阶段？','single',['高一','高二','高三','复习备考','其他']),
 Q('chapter','学校目前学到哪个章节？','single',['细胞基础','物质运输','细胞能量','细胞分裂','遗传','进化','其他／不确定']),
 Q('goal','你这次最想达成什么目标？','single',['跟上课堂','补基础','解决薄弱章节','提高考试成绩','拓展兴趣']),
 Q('horizon','你希望什么时候看到阶段性进步？','single',['一周内','两周内','一个月内','长期学习']),
 Q('days','你每周能安排几天学习生物？','single',['1—2天','3—4天','5—6天','每天']),
 Q('minutes','每个学习日，通常能投入多长时间？','single',['10分钟','20分钟','30分钟','45分钟']),
 Q('priorities','目前最想优先解决哪些板块？','multi',['细胞结构','物质运输','光合与呼吸','细胞分裂','遗传','实验设计','其他／不确定'],{max:3}),
 Q('understanding','学习新知识时，你通常是什么状态？','single',['概念难理解','能看懂但容易忘','理解了却不会做题','基础题会，综合题困难','不确定']),
 Q('stuck','做题时，最常卡在哪一步？','multi',['读不懂题意','找不到知识点','不会推理','不会计算','不会表达','时间不够','不确定']),
 Q('genetics','面对遗传题，你最不确定的是哪部分？','multi',['判断遗传方式','推断基因型','写出配子','计算概率','分析系谱图','暂未学习','暂无明显困难']),
 Q('check','学完后，你通常怎样检查是否掌握？','multi',['重看内容','做题','合上资料回忆','讲给别人听','暂时不检查']),
 Q('mistake','做错题后，你通常怎么处理？','single',['看完答案就结束','抄解析','重新独立做','寻找错因并做类似题','不固定']),
 Q('activities','哪些学习活动你更愿意尝试？','multi',['看图与动画','操作模拟实验','分步例题','文字讲解','自己画图','口头或文字解释','挑战题'],{hint:'用于选择愿意尝试的活动，不给你贴固定学习类型标签。'}),
 Q('help','遇到难题时，希望获得怎样的帮助？','single',['先自己尝试','给一点提示','分步骤带着做','先看完整示例再练']),
 Q('obstacles','最近影响你执行计划的主要因素是什么？','multi',['时间零散','任务太多','不知道先学什么','容易分心','题目太难','缺少反馈','暂无明显障碍']),
 Q('confusion','描述一个看了解析仍然不懂的问题。','text',[],{placeholder:'例如：为什么排除患病子代后，正常子代的概率要重新计算？'}),
 Q('target','你希望本次规划帮助你完成什么具体变化？','text',[],{placeholder:'例如：能独立判断常见遗传方式，并说明依据。'}),
 Q('experience','有没有一次学习让你觉得特别有效？当时做了什么？','text',[],{placeholder:'例如：自己画出光合与呼吸的流程后，终于分清了物质去向。'}),
 Q('constraints','未来几周有哪些考试、作业或时间限制？','text',[],{placeholder:'例如：下周五考试；周二、周四晚上没有时间。请在规划中同步选择实际学习日期。'}),
 Q('wishes','关于学习安排，还有什么希望我们知道？','text',[],{placeholder:'例如：不喜欢连续刷题，希望每次任务短一点。'})
];
export const surveyGroups=['学习目标','薄弱环节','学习习惯','补充你的情况'];
const isObj=x=>!!x&&typeof x==='object'&&!Array.isArray(x);
export function validAnswers(a){return isObj(a)&&Object.entries(a).every(([id,v])=>{const q=surveyQuestions.find(q=>q.id===id);return q&&(q.type==='text'?typeof v==='string'&&v.length<=1000:q.type==='single'?q.options.includes(v):Array.isArray(v)&&v.length<=Math.min(q.max??q.options.length,q.options.length)&&new Set(v).size===v.length&&v.every(x=>q.options.includes(x)));});}
export function answered(q,a){const v=a[q.id];return q.type==='multi'?Array.isArray(v)&&v.length>0:typeof v==='string'&&v.trim().length>0;}
export const requiredMissing=a=>surveyQuestions.slice(0,15).filter(q=>!answered(q,a));
export function validGrowth(g){return g===undefined||(isObj(g)&&validAnswers(g.answers)&&Number.isInteger(g.step)&&g.step>=0&&g.step<=3&&(!g.submittedAt||Number.isFinite(g.submittedAt))&&(!g.plan||validPlan(g.plan))&&(!g.previous||validPlan(g.previous))&&(!g.settings||validSettings(g.settings)));}
export function validSettings(s){return isObj(s)&&[10,20,30,45].includes(s.minutes)&&Array.isArray(s.weekdays)&&s.weekdays.length>0&&s.weekdays.length<=7&&new Set(s.weekdays).size===s.weekdays.length&&s.weekdays.every(n=>Number.isInteger(n)&&n>=0&&n<=6)&&Array.isArray(s.priorities)&&s.priorities.length<=3&&s.priorities.every(id=>Object.hasOwn(topicNames,id));}
export function initGrowth(state){return state.growth??=( {answers:{},step:0} );}
const percent=rows=>rows.length?Math.round(rows.filter(x=>x.correct).length/rows.length*100):null;
export function evidence(state){
 const rows=state.history??[],independent=rows.filter(x=>!x.assisted),assisted=rows.filter(x=>x.assisted);
 const genetics=state.genetics??{};
 return {attempts:rows.length,independent:independent.length,assisted:assisted.length,accuracy:percent(independent),assistedAccuracy:percent(assisted),uniqueQuestions:new Set(independent.map(x=>x.id)).size,
 topics:Object.entries(topicNames).map(([id,name])=>{const r=independent.filter(x=>x.topic===id).slice(-20);return {id,name,count:r.length,unique:new Set(r.map(x=>x.id)).size,accuracy:percent(r),causes:Object.fromEntries(['concept','condition','process','reading','careless'].map(c=>[c,r.filter(x=>x.cause===c).length]))};}),
 learning:Object.entries(state.learning??{}).map(([topic,p])=>({topic,stages:p.stages.length,views:p.views.length})),experiments:(state.experiments??[]).length,notes:(state.notes??[]).length,
 genetics:{crosses:(genetics.crosses??[]).length,answers:(genetics.answers??[]).length,independent:(genetics.answers??[]).filter(x=>!x.assisted).length,accuracy:percent((genetics.answers??[]).filter(x=>!x.assisted))},
 energy:{writings:(state.energy?.writings??[]).length,needsReview:(state.energy?.writings??[]).filter(x=>x.reflection==='review').length,designs:(state.energy?.designs??[]).length}};
}
const topicMapping={'细胞结构':['cell'],'物质运输':['membrane','osmosis'],'光合与呼吸':['photo','respiration'],'遗传':['genetics'],'实验设计':['enzyme','photo']};
export function defaultSettings(a,state){const days={'1—2天':[2,6],'3—4天':[1,3,5,6],'5—6天':[1,2,3,4,5,6],'每天':[0,1,2,3,4,5,6]};return {minutes:parseInt(a.minutes)||state.goal||20,weekdays:days[a.days]??[1,3,5,6],priorities:[...new Set((a.priorities??[]).flatMap(x=>topicMapping[x]??[]))].slice(0,3)};}
export function localDate(n){const d=new Date(n);return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;}
export function rankTopics(ev,settings){const measured=ev.topics.filter(t=>t.unique>=3).sort((a,b)=>a.accuracy-b.accuracy);return [...new Set([...settings.priorities,...measured.filter(t=>t.accuracy<75).map(t=>t.id),...ev.topics.filter(t=>t.count>0&&t.unique<3).map(t=>t.id),'cell','genetics'])].slice(0,3);}
export const methods=['图解建模','分步例题','实验探究','主动回忆','独立检验','间隔复习'];
function routeFor(topic,method){if(topic==='genetics')return {kind:'nav',target:'genetics'};if(method==='实验探究')return {kind:'lab',target:['enzyme','photo','osmosis'].includes(topic)?topic:'osmosis'};if(method==='独立检验')return {kind:'practice',target:topic};if(topic==='genetics')return {kind:'nav',target:'genetics'};if(['photo','respiration'].includes(topic)&&method==='图解建模')return {kind:'nav',target:'energy'};return {kind:'learn',target:topic};}
export function taskSet(topic,method,minutes,dayId,success,help){const split=[Math.max(2,Math.round(minutes*.3)),Math.max(4,Math.round(minutes*.5))];split.push(minutes-split[0]-split[1]);const name=topicNames[topic];return [
 {id:dayId+'-0',title:`${method} · ${name}`,minutes:split[0],description:method==='间隔复习'?'先合上资料回忆，再打开课程核对遗漏。':method==='实验探究'?'先提出预测，再改变一个变量，记录观察。':`围绕一个具体疑问学习。${help||'先尝试，再按需要展开提示。'}`,action:routeFor(topic,method),done:false},
 {id:dayId+'-1',title:`独立练习 · ${name}`,minutes:split[1],description:'先独立完成 1—2 题；未做完可下次继续。使用提示的作答单独记录。',action:topic==='genetics'?{kind:'nav',target:'genetics'}:{kind:'practice',target:topic},done:false},
 {id:dayId+'-2',title:'解释与回顾',minutes:split[2],description:success||'用自己的话解释关键步骤，记录一个仍不确定的问题。',action:{kind:'nav',target:'notes'},done:false}
 ];}
export function makePlan(state,now=Date.now()){
 const g=initGrowth(state),a=g.answers,s=g.settings??defaultSettings(a,state),ev=evidence(state),priorities=rankTopics(ev,s);
 const d=new Date(now);d.setHours(12,0,0,0);let active=0;
 const days=Array.from({length:7},(_,i)=>{const date=new Date(d);date.setDate(d.getDate()+i);const id=localDate(date),rest=!s.weekdays.includes(date.getDay());if(rest)return {id,date:id,rest:true,tasks:[]};const index=active++,topic=priorities[index%priorities.length];let method=index>=priorities.length?'间隔复习':a.understanding==='能看懂但容易忘'?'主动回忆':a.understanding==='理解了却不会做题'?'分步例题':'图解建模';if(a.activities?.includes('操作模拟实验')&&['enzyme','photo','osmosis'].includes(topic)&&index<priorities.length)method='实验探究';if(a.understanding==='基础题会，综合题困难')method='独立检验';return {id,date:id,rest:false,topic,method,reason:s.priorities.includes(topic)?'根据你选择的优先板块安排；结合练习结果继续调整。':'根据近期答题证据或待确认主题安排。',success:'能独立完成练习，并解释依据；有疑问时在笔记中标明。',tasks:taskSet(topic,method,s.minutes,id,null,a.help)};});
 return {version:1,createdAt:now,source:'rules',minutes:s.minutes,weekdays:[...s.weekdays],priorities,evidence:ev,answerSnapshot:JSON.parse(JSON.stringify(a)),settingsSnapshot:JSON.parse(JSON.stringify(s)),goals:priorities.map(id=>`围绕${topicNames[id]}，完成一次独立作答和一次思路解释。`),overview:ev.independent?'本计划结合答题摘要与你选择的目标安排。样本较少的主题先确认理解，再调整难度。':'目前没有独立作答证据。先从自评目标出发，用短练习确认起点。',insights:[],days};
}
export function validPlan(p){return isObj(p)&&p.version===1&&isObj(p.evidence)&&Number.isSafeInteger(p.evidence.independent)&&p.evidence.independent>=0&&['rules','ai'].includes(p.source)&&Number.isFinite(p.createdAt)&&[10,20,30,45].includes(p.minutes)&&typeof p.overview==='string'&&p.overview.length<=2000&&Array.isArray(p.goals)&&p.goals.length<=3&&p.goals.every(x=>typeof x==='string'&&x.length<=500)&&Array.isArray(p.insights)&&p.insights.length<=8&&p.insights.every(x=>typeof x==='string'&&x.length<=1000)&&validAnswers(p.answerSnapshot)&&validSettings(p.settingsSnapshot)&&Array.isArray(p.days)&&p.days.length===7&&p.days.every(d=>isObj(d)&&/^\d{4}-\d{2}-\d{2}$/.test(d.id)&&d.date===d.id&&typeof d.rest==='boolean'&&Array.isArray(d.tasks)&&((d.rest&&d.tasks.length===0)||(!d.rest&&Object.hasOwn(topicNames,d.topic)&&methods.includes(d.method)&&typeof d.reason==='string'&&d.reason.length<=1000&&typeof d.success==='string'&&d.success.length<=500&&d.tasks.length===3&&d.tasks.every(t=>isObj(t)&&typeof t.id==='string'&&typeof t.title==='string'&&t.title.length<=200&&typeof t.description==='string'&&t.description.length<=1000&&Number.isInteger(t.minutes)&&t.minutes>0&&t.minutes<=45&&typeof t.done==='boolean'&&isObj(t.action)&&(['learn','practice'].includes(t.action.kind)?Object.hasOwn(topicNames,t.action.target):t.action.kind==='lab'?['enzyme','photo','osmosis'].includes(t.action.target):t.action.kind==='nav'&&['notes','energy','genetics'].includes(t.action.target)))&&d.tasks.reduce((s,t)=>s+t.minutes,0)<=p.minutes)));}
export function modelPayload(state,plan){return {version:1,survey:surveyQuestions.map(q=>({question:q.title,answer:state.growth.answers[q.id]??null})),evidence:evidence(state),baseline:plan,catalog:Object.entries(topicNames).map(([id,name])=>({id,name})),notes:'细胞分裂、进化尚无专门课程；不得虚构已有模块。阅读、提示练习与自评不能证明独立掌握。'};}
export function applyModelResult(plan,result){
 if(!isObj(result)||typeof result.overview!=='string'||result.overview.length>2000||!Array.isArray(result.insights)||result.insights.length>8||result.insights.some(x=>typeof x!=='string'||x.length>1000)||!Array.isArray(result.goals)||result.goals.length<1||result.goals.length>3||result.goals.some(x=>typeof x!=='string'||x.length>500)||!Array.isArray(result.sessions)||result.sessions.length!==plan.days.filter(d=>!d.rest).length)throw new Error('模型返回格式不完整');
 const next=JSON.parse(JSON.stringify(plan)),seen=new Set();for(const s of result.sessions){const d=next.days.find(d=>d.id===s.dayId&&!d.rest);if(!d||seen.has(s.dayId)||!Object.hasOwn(topicNames,s.topic)||!methods.includes(s.method)||typeof s.reason!=='string'||s.reason.length>1000||typeof s.success!=='string'||s.success.length>500)throw new Error('模型任务不符合课程或时间约束');seen.add(s.dayId);Object.assign(d,{topic:s.topic,method:s.method,reason:s.reason,success:s.success,tasks:taskSet(s.topic,s.method,next.minutes,d.id,s.success,next.answerSnapshot.help)});}
 Object.assign(next,{source:'ai',overview:result.overview,insights:result.insights,goals:result.goals});if(!validPlan(next))throw new Error('规划校验未通过');return next;
}
