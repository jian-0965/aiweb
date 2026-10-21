import {coachView} from './view.js';
import {models,examples} from './types.js';
import type {CoachUI,CoachResult,Context,LearningState,Mode,Practice,Grade} from './types.js';

const fresh=():CoachUI=>({question:'',attempt:'',cross:{...models.mono.default},useCross:true,confirmed:false,image:'',imageName:'',uncertain:[],busy:null,error:'',level:1,result:null,history:[],practice:null,choice:null,grade:null,assisted:false,reviewing:false});
let ui=fresh(),requestId=0,controller:AbortController|null=null;
const isObject=(v:unknown):v is Record<string,unknown>=>!!v&&typeof v==='object'&&!Array.isArray(v);
const str=(v:unknown,n=5000):v is string=>typeof v==='string'&&v.length<=n;
const strs=(v:unknown,n=20):v is string[]=>Array.isArray(v)&&v.length<=n&&v.every(s=>str(s));
export function validPractice(v:unknown):v is Practice{return isObject(v)&&str(v.id,40)&&/^coach-/.test(v.id)&&str(v.title,1000)&&strs(v.choices,4)&&v.choices.length>=2&&str(v.origin,100)&&str(v.note,300)&&str(v.level,30)&&typeof v.repeated==='boolean';}
export function validResponse(v:unknown):v is CoachResult{
 if(!isObject(v)||!['ai','rules'].includes(String(v.source))||!str(v.notice,600)||!Number.isFinite(v.durationMs)||!isObject(v.answer)||!validPractice(v.practice))return false;
 const a=v.answer;if(!str(a.summary,700)||!str(a.hint,1500)||!str(a.question,400)||typeof a.needsClarification!=='boolean'||!strs(a.citations,4)||!strs(a.limitations,4))return false;
 if(!Array.isArray(v.documents)||v.documents.length>12||!v.documents.every(d=>isObject(d)&&str(d.id,40)&&str(d.title,100)&&str(d.text,5000)&&str(d.source,120)&&d.href==='#genetics'))return false;
 if(!Array.isArray(v.trace)||v.trace.length>12||!v.trace.every(t=>isObject(t)&&str(t.tool,60)&&str(t.detail,600)&&['model','workflow'].includes(String(t.origin))&&str(t.status,30)))return false;
 if(v.calculation!==null){const c=v.calculation;if(!isObject(c)||!str(c.probability,20)||!str(c.assumption,500)||!str(c.scope,80)||!str(c.target,30)||!Number.isInteger(c.numerator)||!Number.isInteger(c.denominatorCount)||!Array.isArray(c.cells)||c.cells.length>16||!c.cells.every(x=>isObject(x)&&['maternal','paternal','genotype','phenotype'].every(k=>str(x[k],100))&&typeof x.match==='boolean'))return false;}
 return true;
}
const validGrade=(g:unknown):g is Grade=>isObject(g)&&str(g.id,40)&&Number.isInteger(g.choice)&&Number.isInteger(g.answer)&&Number(g.answer)>=0&&Number(g.answer)<4&&typeof g.correct==='boolean'&&strs(g.steps,8)&&[1,3].includes(Number(g.reviewDays));
export function renderCoach(state:LearningState){return coachView(ui,state);}
export function leaveCoach(){requestId++;controller?.abort();controller=null;ui.busy=null;}
function clearResult(){ui.result=null;ui.history=[];ui.practice=null;ui.grade=null;ui.choice=null;ui.level=1;ui.reviewing=false;}
function invalidate(){ui.confirmed=false;clearResult();}
async function post(path:string,body:unknown,signal:AbortSignal){
 const response=await fetch('/api/genetics-coach'+path,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(body),signal});
 const data:unknown=await response.json();if(!response.ok)throw Error(isObject(data)&&str(data.message,500)?data.message:'服务暂时不可用，请稍后重试。');return data;
}
async function job(kind:NonNullable<CoachUI['busy']>,ctx:Context,task:(signal:AbortSignal,id:number)=>Promise<void>){
 if(ui.busy)return;const id=++requestId;const currentController=new AbortController();controller=currentController;const timer=setTimeout(()=>currentController.abort(),60000);ui.busy=kind;ui.error='';ctx.render();
 try{await task(controller.signal,id);}catch(error){if(id===requestId)ui.error=error instanceof Error&&error.name!=='AbortError'?error.message:'请求已取消或超时，可以重试。';}finally{clearTimeout(timer);if(id===requestId){ui.busy=null;controller=null;ctx.render();}}
}
async function generate(state:LearningState,ctx:Context,level:1|2|3){
 if(!ui.confirmed||!ui.question.trim()){ui.error='请核对题目和计算条件，并勾选确认。';ctx.render();return;}
 const answers=state.genetics?.answers??[],snapshot={question:ui.question,attempt:ui.attempt,confirmed:true,cross:ui.useCross?{...ui.cross}:null,level,history:ui.history,evidence:{attempts:answers.length,correct:answers.filter(a=>a.correct).length,assisted:answers.filter(a=>a.assisted).length},seen:answers.map(a=>a.id).slice(-30)};
 await job('coach',ctx,async(signal,id)=>{const data=await post('',snapshot,signal);if(id!==requestId)return;if(!validResponse(data))throw Error('教练返回内容不完整，请重试。');ui.level=level;ui.result=data;ui.history=[...ui.history,{prompt:ui.attempt.slice(0,500),hint:data.answer.hint}].slice(-4);ui.practice=data.practice;ui.choice=null;ui.grade=null;ui.assisted=false;ui.reviewing=false;});
}
export function handleCoach(action:string,element:{dataset:DOMStringMap},state:LearningState,ctx:Context){
 if(!action.startsWith('coach-'))return false;
 const a=action.slice(6);
 if(a==='cancel'){leaveCoach();ui.error='本次请求已取消。';ctx.render();return true;}
 if(ui.busy)return true;
 if(a==='reset'){leaveCoach();ui=fresh();ctx.render();return true;}
 if(a==='example'){const e=examples[Number(element.dataset.index)];if(e){invalidate();ui.question=e.question;ui.attempt='';ui.cross={...models[e.mode].default};ui.useCross=true;ui.error='';ui.uncertain=[];ui.image='';ui.imageName='';ctx.render();}return true;}
 if(a==='remove-image'){ui.image='';ui.imageName='';ui.uncertain=[];ctx.render();return true;}
 if(a==='start'){clearResult();void generate(state,ctx,1);return true;}
 if(a==='continue'||a==='more'){void generate(state,ctx,(a==='more'?Math.min(3,ui.level+1):ui.level) as 1|2|3);return true;}
 if(a==='recognize'){
  if(!ui.image)return true;void job('image',ctx,async(signal,id)=>{const data=await post('/recognize',{image:ui.image},signal);if(id!==requestId)return;if(!isObject(data)||!str(data.text,3500)||!strs(data.uncertain,8))throw Error('图片转写格式不正确，请重试。');invalidate();ui.question=data.text;ui.uncertain=data.uncertain;ui.useCross=false;ui.attempt='';if(!data.text)ui.error='没有识别到可用题目，请直接输入文字。';else ctx.toast('已转写，请校正符号、图中关系和计算条件后再确认。');});return true;
 }
 if(a==='choice'){const n=Number(element.dataset.choice);if(ui.practice&&!ui.grade&&Number.isInteger(n)&&n>=0&&n<ui.practice.choices.length){ui.choice=n;ctx.render();}return true;}
 if(a==='grade'){
  const p=ui.practice,choice=ui.choice;if(!p||choice===null||ui.grade)return true;
  void job('grade',ctx,async(signal,id)=>{const data=await post('/grade',{id:p.id,choice},signal);if(id!==requestId)return;if(!validGrade(data)||data.id!==p.id||data.choice!==choice)throw Error('核对结果不完整，请重试。');ui.grade=data;state.genetics??={visited:[],crosses:[],answers:[]};state.genetics.answers.push({id:p.id,choice,correct:data.correct,assisted:ui.assisted,time:Date.now()});state.genetics.answers=state.genetics.answers.slice(-5000);state.coach??={version:1,reviews:[]};state.coach.reviews=[...state.coach.reviews.filter(r=>r.id!==p.id),{id:p.id,title:p.title,due:Date.now()+data.reviewDays*86400000}].slice(-100);ctx.save();ctx.toast('练习结果与复习日期已保存。');});return true;
 }
 if(a==='review'){
  const review=state.coach?.reviews.find(r=>r.id===element.dataset.id);if(!review)return true;
  void job('review',ctx,async(signal,id)=>{const data=await post('/practice',{id:review.id},signal);if(id!==requestId)return;if(!validPractice(data))throw Error('复习内容不完整。');clearResult();ui.practice=data;ui.reviewing=true;ui.assisted=false;ui.question=data.title;ui.attempt='';ui.useCross=false;ui.confirmed=false;});return true;
 }
 return true;
}
export function inputCoach(target:HTMLInputElement|HTMLTextAreaElement){
 const field=target.dataset?.coachField;if(field!=='question'&&field!=='attempt')return false;
 if(ui.busy)return true;ui[field]=target.value.slice(0,field==='question'?3500:1500);
 if(field==='question'){invalidate();const confirm=document.querySelector<HTMLInputElement>('#coach-confirm');if(confirm)confirm.checked=false;document.querySelector('.coach-response')?.setAttribute('hidden','');document.querySelector('.coach-practice')?.setAttribute('hidden','');}
 const start=document.querySelector<HTMLButtonElement>('#coach-start');if(start)start.disabled=!ui.confirmed||!ui.question.trim();return true;
}
async function readImage(file:File){
 if(!['image/jpeg','image/png','image/webp'].includes(file.type)||file.size>8*1024*1024)throw Error('请选择 8 MB 以内的 JPG、PNG 或 WebP 图片。');
 const url=URL.createObjectURL(file);
 try{const image=new Image();image.src=url;await image.decode();if(image.width*image.height>40000000)throw Error('图片尺寸过大，请先裁剪到题目区域。');const scale=Math.min(1,1400/Math.max(image.width,image.height));const canvas=document.createElement('canvas');canvas.width=Math.max(1,Math.round(image.width*scale));canvas.height=Math.max(1,Math.round(image.height*scale));const context=canvas.getContext('2d');if(!context)throw Error('当前浏览器无法读取图片。');context.fillStyle='#fff';context.fillRect(0,0,canvas.width,canvas.height);context.drawImage(image,0,0,canvas.width,canvas.height);const data=canvas.toDataURL('image/jpeg',.85);if(data.length>1600000)throw Error('压缩后的图片仍过大，请裁剪题目后再上传。');return data;}finally{URL.revokeObjectURL(url);}
}
export function changeCoach(target:HTMLInputElement|HTMLSelectElement,ctx:Context){
 if(target.id==='coach-image'){
  const file=(target as HTMLInputElement).files?.[0];if(!file)return true;
  void job('image',ctx,async(_signal,id)=>{const image=await readImage(file);if(id!==requestId)return;ui.image=image;ui.imageName=file.name;ui.uncertain=[];ui.confirmed=false;});return true;
 }
 const field=target.dataset?.coachField;if(!field||field==='question'||field==='attempt')return false;if(ui.busy)return true;
 if(field==='confirmed'){ui.confirmed=(target as HTMLInputElement).checked;ctx.render();return true;}
 if(field==='assisted'){ui.assisted=(target as HTMLInputElement).checked;return true;}
 invalidate();
 if(field==='useCross')ui.useCross=(target as HTMLInputElement).checked;
 else if(field==='mode'&&Object.hasOwn(models,target.value))ui.cross={...models[target.value as Mode].default};
 else if(['mother','father','target','denominator'].includes(field))Object.assign(ui.cross,{[field]:target.value});
 ctx.render();return true;
}
