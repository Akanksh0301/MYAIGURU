import {Bell} from 'lucide-react';import {useLS} from '../hooks/useLS';import {Notif,seedNotifs} from '../data/seed';import {Card,Page,Btn} from '../components/common/ui';
export default function Notifications(){
 const [n,setN]=useLS<Notif[]>('mag.notifs',seedNotifs);
 return <Page title="Notifications" sub={`${n.filter(x=>!x.read).length} unread`} actions={<Btn v="o" onClick={()=>setN(p=>p.map(x=>({...x,read:true})))}>Mark all as read</Btn>}>
  <Card className="p-0">{n.map(x=><div key={x.id} className={`flex items-center gap-3 border-b px-4 py-3 text-sm last:border-0 ${x.read?'':'bg-indigo-50/50'}`}><Bell size={16} className={x.read?'text-slate-400':'text-indigo-800'}/><span className={`flex-1 ${x.read?'text-slate-500':'font-medium'}`}>{x.text}</span>{!x.read&&<Btn v="o" onClick={()=>setN(p=>p.map(y=>y.id===x.id?{...y,read:true}:y))}>Mark as read</Btn>}</div>)}</Card></Page>}
