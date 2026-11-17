import {useState,FormEvent} from 'react';import {NavLink,Outlet,useNavigate} from 'react-router-dom';
import {LayoutDashboard,Users,Layers,BookOpen,MessageCircle,ListChecks,FileCheck,BarChart3,Bell,Settings,Menu,Search,GraduationCap} from 'lucide-react';
import {useLS} from '../../hooks/useLS';import {Notif,seedNotifs} from '../../data/seed';
const nav=[['/','Dashboard',LayoutDashboard],['/learners','Learners',Users],['/batches','Batches',Layers],['/lessons','AI Lesson Assistant',BookOpen],['/assistant','AI Learning Assistant',MessageCircle],['/quizzes','Quiz Generator',ListChecks],['/assignments','Assignments',FileCheck],['/analytics','Analytics',BarChart3],['/notifications','Notifications',Bell],['/settings','Settings',Settings]] as const;
export default function Shell(){
 const [open,setOpen]=useState(false);const [q,setQ]=useState('');const nv=useNavigate();
 const [n]=useLS<Notif[]>('mag.notifs',seedNotifs);const [prof]=useLS('mag.profile',{name:'Anita Rao'});const unread=n.filter(x=>!x.read).length;
 const go=(e:FormEvent)=>{e.preventDefault();nv(`/learners?q=${encodeURIComponent(q)}`)};
 return <div className="min-h-screen lg:flex">
  <aside className={`fixed inset-y-0 left-0 z-40 w-64 bg-indigo-950 p-4 text-indigo-100 transition-transform lg:static lg:translate-x-0 ${open?'translate-x-0':'-translate-x-full'}`}>
   <div className="mb-6 flex items-center gap-2 px-2 text-white"><GraduationCap/><span className="text-lg font-semibold">MYAIGURU</span></div>
   <nav aria-label="Main" className="space-y-1">{nav.map(([to,l,I])=><NavLink key={to} to={to} end={to==='/'} onClick={()=>setOpen(false)} className={({isActive})=>`flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition ${isActive?'bg-white/15 text-white':'hover:bg-white/10'}`}><I size={17}/>{l}</NavLink>)}</nav>
   <p className="mt-6 px-3 text-xs text-indigo-300">AI assisted. Human governed.</p>
  </aside>
  {open&&<div className="fixed inset-0 z-30 bg-black/30 lg:hidden" onClick={()=>setOpen(false)}/>}
  <div className="min-w-0 flex-1"><div className="bg-indigo-950 px-4 py-1 text-center text-xs text-indigo-100">Frontend prototype · simulated AI · role-based access is a design concept, not real authentication</div>
   <header className="sticky top-0 z-20 flex items-center gap-3 border-b border-slate-200 bg-white px-4 py-3">
    <button className="lg:hidden" aria-label="Open menu" onClick={()=>setOpen(true)}><Menu/></button>
    <form onSubmit={go} className="relative max-w-md flex-1"><Search size={16} className="absolute left-3 top-2.5 text-slate-400"/><input aria-label="Search learners" value={q} onChange={e=>setQ(e.target.value)} placeholder="Search learners by name or ID" className="w-full rounded-lg border border-slate-200 bg-slate-50 py-2 pl-9 pr-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"/></form>
    <div className="ml-auto flex items-center gap-3"><button aria-label="Notifications" onClick={()=>nv('/notifications')} className="relative rounded-lg p-2 hover:bg-slate-100"><Bell size={18}/>{unread>0&&<span className="absolute -right-0.5 -top-0.5 rounded-full bg-rose-600 px-1.5 text-[10px] text-white">{unread}</span>}</button>
    <button onClick={()=>nv('/settings')} className="flex items-center gap-2 rounded-lg p-1 hover:bg-slate-100"><span className="flex h-8 w-8 items-center justify-center rounded-full bg-indigo-800 text-sm text-white">{prof.name[0]}</span><span className="hidden text-sm sm:block">{prof.name}</span></button></div>
   </header>
   <main className="p-4 md:p-6"><Outlet/></main>
  </div></div>}
