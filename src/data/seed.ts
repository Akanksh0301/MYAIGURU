export interface Learner{id:string;name:string;batch:string;attendance:number;completion:number;progress:number;quiz:number;weak:string;level:string;ontime:number;wk:number[];sub:number[]}
export interface Assignment{id:number;learner:string;title:string;batch:string;date:string;status:'Pending'|'Reviewed'|'Late';marks:number|null;text:string;feedback:string;fbDays?:number}
export interface Notif{id:number;text:string;read:boolean;type:string}
export const BASELINE={learners:120,batches:4,trainers:3,attendance:78,ontime:62,feedbackDays:4};
export const batches=[
 {id:'B1',name:'Batch B1 – Morning',trainer:'Anita Rao',module:'Python for AI',next:'Mon 10:00 – Data handling'},
 {id:'B2',name:'Batch B2 – Forenoon',trainer:'Vikram Shah',module:'Intro to Machine Learning',next:'Tue 11:30 – Supervised learning'},
 {id:'B3',name:'Batch B3 – Afternoon',trainer:'Anita Rao',module:'Neural Networks Basics',next:'Wed 14:00 – Perceptrons'},
 {id:'B4',name:'Batch B4 – Evening',trainer:'Meera Iyer',module:'AI Ethics & Applications',next:'Thu 17:30 – Responsible AI'}];
export const topics=['Python basics','Data cleaning','Supervised learning','Model evaluation','Neural networks','AI ethics'];
let s=11;const r=()=>(s=(s*16807)%2147483647)/2147483647;
const F=['Aarav','Diya','Rohan','Isha','Kabir','Ananya','Vihaan','Sneha','Arjun','Priya','Nikhil','Riya','Karan','Tanvi','Aditya','Meera','Yash','Pooja','Rahul','Neha'];
const L=['Sharma','Patel','Desai','Kulkarni','Nair','Gupta','Joshi','Mehta','Reddy','Singh','Pawar','Shetty'];
export const TARGET={attendance:85,ontime:80,feedbackDays:1};
const A=[82,70,80,80],C=[72,45,68,58],O=[72,48,66,62];
const mean=(x:number[])=>x.reduce((a,v)=>a+v,0)/x.length;
const raw=Array.from({length:120},(_,i)=>{const b=i%4;return{b,wk:[0,1,2,3].map(()=>A[b]+(r()-.5)*40),sub:[0,1,2,3].map(()=>O[b]+(r()-.5)*50),completion:Math.round(Math.min(100,Math.max(10,C[b]+(r()-.5)*50))),quiz:Math.round(45+r()*50),weak:topics[Math.floor(r()*6)],level:['Beginner','Intermediate','Advanced'][Math.floor(r()*3)]}});
// Sample data is calibrated so its overall means match the business baseline (78% attendance, 62% on-time).
const dA=BASELINE.attendance-mean(raw.flatMap(x=>x.wk)),dO=BASELINE.ontime-mean(raw.flatMap(x=>x.sub));
const cl=(v:number)=>Math.round(Math.min(100,Math.max(20,v)));
export const seedLearners:Learner[]=raw.map((x,i)=>{const wk=x.wk.map(v=>cl(v+dA)),sub=x.sub.map(v=>cl(v+dO));const attendance=Math.round(mean(wk));
 return{id:`S3K-${1001+i}`,name:`${F[i%20]} ${L[Math.floor(i/10)%12]}`,batch:`B${x.b+1}`,attendance,ontime:Math.round(mean(sub)),wk,sub,completion:x.completion,progress:Math.round((attendance+x.completion)/2*.95),quiz:x.quiz,weak:x.weak,level:x.level}});
const T=['Python loops exercise','Data cleaning notebook','Linear regression mini-project','Classification quiz reflection','Model evaluation report','Neural network diagram','AI ethics case note'];
export const seedAssignments:Assignment[]=Array.from({length:14},(_,i)=>{const l=seedLearners[i*3];const st=(['Pending','Reviewed','Late','Pending'] as const)[i%4];
 return{id:i+1,learner:l.name,title:T[i%7],batch:l.batch,date:`2026-11-${String(2+i).padStart(2,'0')}`,status:st,marks:st==='Reviewed'?60+Math.floor(r()*35):null,
 text:`Submission for "${T[i%7]}": I completed the tasks, explained my approach and tested the result on the sample dataset. I was unsure about edge cases.`,feedback:st==='Reviewed'?'Good work. Reviewed and sent.':'',fbDays:st==='Reviewed'?3+(i%3):undefined}});
export const seedNotifs:Notif[]=[
 {id:1,type:'assignment',text:'New assignment submission from '+seedLearners[0].name,read:false},
 {id:2,type:'review',text:'6 assignments are pending review for more than 3 days',read:false},
 {id:3,type:'session',text:'Upcoming session: B2 Supervised learning, tomorrow 11:30',read:false},
 {id:4,type:'attendance',text:'Low attendance alert: Batch B2 fell below 75% this week',read:false},
 {id:5,type:'learner',text:'4 learners may need additional support (suggested by AI)',read:true},
 {id:6,type:'quiz',text:'New quiz "Supervised Learning Basics" awaiting your approval',read:false}];
export const seedQuizzes=[...Array(10)].map((_,i)=>({id:i+1,topic:['Intro to AI','Machine Learning','Supervised learning','Neural networks','Python basics','Data cleaning','Model evaluation','AI ethics','Unsupervised learning','Overfitting'][i],count:8+i%3*2,status:i<6?'Published':i<8?'Approved':'Saved',avg:55+i*3}));
