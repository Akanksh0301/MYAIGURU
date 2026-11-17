import {Routes,Route,Navigate} from 'react-router-dom';import Shell from './components/layout/Shell';
import Dashboard from './pages/Dashboard';import Learners from './pages/Learners';import Batches from './pages/Batches';import Lessons from './pages/Lessons';import Assistant from './pages/Assistant';
import Quizzes from './pages/Quizzes';import Assignments from './pages/Assignments';import Analytics from './pages/Analytics';import Notifications from './pages/Notifications';import SettingsPage from './pages/Settings';
export default function App(){return <Routes><Route element={<Shell/>}>
 <Route index element={<Dashboard/>}/><Route path="learners" element={<Learners/>}/><Route path="batches" element={<Batches/>}/><Route path="lessons" element={<Lessons/>}/><Route path="assistant" element={<Assistant/>}/>
 <Route path="quizzes" element={<Quizzes/>}/><Route path="assignments" element={<Assignments/>}/><Route path="analytics" element={<Analytics/>}/><Route path="notifications" element={<Notifications/>}/><Route path="settings" element={<SettingsPage/>}/>
 <Route path="*" element={<Navigate to="/"/>}/></Route></Routes>}
