import {useState,useRef,useEffect,FormEvent} from 'react';import {Send,Bot} from 'lucide-react';import {useLS} from '../hooks/useLS';import {chatReply} from '../services/ai';import {Card,Page,AIBadge,inp,Btn} from '../components/common/ui';
interface M{role:'u'|'a';text:string;follow?:string[];sure?:boolean}
const hi:M={role:'a',text:'Hi! I can help with introductory AI concepts. Ask me something, or pick a suggestion.',follow:['What is Artificial Intelligence?','Explain Machine Learning with an example','What is supervised learning?','Explain neural networks in simple language','What is the difference between AI and ML?']};
export default function Assistant(){
 const [msgs,setMsgs]=useLS<M[]>('mag.chat',[hi]);const [t,setT]=useState('');const [busy,setBusy]=useState(false);const end=useRef<HTMLDivElement>(null);
 useEffect(()=>{end.current?.scrollIntoView({behavior:'smooth'})},[msgs,busy]);
 const send=async(text:string)=>{if(!text.trim()||busy)return;setT('');setMsgs(p=>[...p,{role:'u',text}]);setBusy(true);try{const r=await chatReply(text);setMsgs(p=>[...p,{role:'a',...r}])}catch{setMsgs(p=>[...p,{role:'a',text:'Something went wrong. Please try again.',sure:false}])}finally{setBusy(false)}};
 const sub=(e:FormEvent)=>{e.preventDefault();send(t)};
 return <Page title="AI learning assistant" sub="Learner-facing helper for introductory AI concepts" actions={<><AIBadge text="Local demo responses · not a live model"/><Btn v="o" onClick={()=>setMsgs([hi])}>Clear chat</Btn></>}>
  <Card className="flex h-[70vh] flex-col p-0"><div className="flex-1 space-y-4 overflow-y-auto p-4" aria-live="polite">{msgs.map((m,i)=><div key={i} className={`flex gap-2 ${m.role==='u'?'justify-end':''}`}>{m.role==='a'&&<Bot className="mt-1 shrink-0 text-indigo-800" size={20}/>}<div className={`max-w-[85%] rounded-xl px-4 py-2 text-sm ${m.role==='u'?'bg-indigo-800 text-white':m.sure===false?'bg-amber-50 text-amber-900':'bg-slate-100'}`}>{m.text}
   {m.role==='a'&&m.sure!==false&&i>0&&<p className="mt-2 text-xs text-slate-500">Simplified explanation. Verify with your course material.</p>}
   {m.follow&&i===msgs.length-1&&<div className="mt-2 flex flex-wrap gap-2">{m.follow.map(f=><button key={f} onClick={()=>send(f)} className="rounded-full border border-indigo-200 bg-white px-3 py-1 text-xs text-indigo-800 hover:bg-indigo-50">{f}</button>)}</div>}</div></div>)}
   {busy&&<p className="animate-pulse text-sm text-slate-500">Assistant is typing…</p>}<div ref={end}/></div>
   <form onSubmit={sub} className="flex gap-2 border-t p-3"><input aria-label="Your question" className={inp} placeholder="Ask a question about AI…" value={t} onChange={e=>setT(e.target.value)}/><Btn type="submit" disabled={busy||!t.trim()}><Send size={15}/>Send</Btn></form></Card></Page>}
