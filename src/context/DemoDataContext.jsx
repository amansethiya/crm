import {createContext,useCallback,useContext,useEffect,useMemo,useState} from 'react'
import {initialLeads,initialTasks,initialVisits,initialWorkflows,projects,units,team} from '../data/mock/seed'
import {stageFromStatus,statusFromStage} from '../data/mock/seed'
const DemoContext=createContext(null)
const KEY='estateflow_demo_v2'
const init=()=>({leads:initialLeads,tasks:initialTasks,visits:initialVisits,workflows:initialWorkflows,units,settings:{company:'EstateFlow Realty',role:'Super Admin',notifications:true},savedAt:new Date().toISOString()})
function readState(){try{const v=JSON.parse(localStorage.getItem(KEY));return v&&Array.isArray(v.leads)&&Array.isArray(v.tasks)&&Array.isArray(v.visits)?v:init()}catch{return init()}}
const uid = prefix=>`${prefix}${Date.now().toString(36)}${Math.random().toString(36).slice(2,7)}`
export function DemoProvider({children}){
  const [state,setState]=useState(readState)
  const [toasts,setToasts]=useState([])
  const update=useCallback(fn=>setState(prev=>fn(prev)),[])
  useEffect(()=>{try{localStorage.setItem(KEY,JSON.stringify(state))}catch{}},[state])
  const toast=useCallback((message,type='success')=>{setToasts(p=>[...p.slice(-2),{id:uid('toast'),message,type}])},[])
  const dismissToast=id=>setToasts(p=>p.filter(t=>t.id!==id))
  const addLead=lead=>{
    const existing=state.leads.find(l=>l.phone.replace(/\D/g,'')===lead.phone.replace(/\D/g,'')||l.email.toLowerCase()===lead.email.toLowerCase())
    if(existing) return {ok:false,duplicate:existing}
    const next={...lead,id:uid('l'),status:lead.status||'New',stage:stageFromStatus[lead.status||'New'],createdAt:new Date().toISOString(),lastContactedAt:null,notes:[],activities:[{id:uid('a'),label:'Lead created',detail:'Manually added in CRM',at:new Date().toISOString()}]}
    update(s=>({...s,leads:[next,...s.leads]}));toast('Lead added to the CRM');return {ok:true,lead:next}
  }
  const editLead=(id,patch)=>{
    update(s=>({...s,leads:s.leads.map(l=>l.id!==id?l:{...l,...patch,stage:patch.status?stageFromStatus[patch.status]||l.stage:(patch.stage||l.stage),status:patch.stage?statusFromStage[patch.stage]||l.status:(patch.status||l.status)})}));toast('Lead updated')
  }
  const deleteLead=(id)=>{update(s=>({...s,leads:s.leads.filter(l=>l.id!==id),tasks:s.tasks.filter(t=>t.leadId!==id),visits:s.visits.filter(v=>v.leadId!==id),units:s.units.map(u=>u.reservedBy===id?{...u,reservedBy:null,status:'Available'}:u)}));toast('Lead and related demo records deleted')}
  const changeLeadStage=(id,stage)=>{
    update(s=>({...s,leads:s.leads.map(l=>l.id!==id?l:{...l,stage,status:statusFromStage[stage],activities:[{id:uid('a'),label:'Stage changed',detail:`Moved to ${stage}`,at:new Date().toISOString()},...l.activities]})}));toast(`Moved to ${stage}`)
  }
  const addNote=(id,body)=>{if(!body.trim())return;update(s=>({...s,leads:s.leads.map(l=>l.id!==id?l:{...l,notes:[{id:uid('n'),body:body.trim(),at:new Date().toISOString()},...l.notes],activities:[{id:uid('a'),label:'Note added',detail:body.trim(),at:new Date().toISOString()},...l.activities]})}));toast('Note saved')}
  const addTask=task=>{update(s=>({...s,tasks:[{...task,id:uid('t'),done:false,createdAt:new Date().toISOString()},...s.tasks]}));toast('Task created')}
  const updateTask=(id,patch)=>{update(s=>({...s,tasks:s.tasks.map(t=>t.id===id?{...t,...patch}:t)}));toast('Task updated')}
  const addVisit=visit=>{update(s=>({...s,visits:[{...visit,id:uid('v'),status:'Scheduled',outcome:''},...s.visits]}));toast('Site visit scheduled (demo only)')}
  const updateVisit=(id,patch)=>{update(s=>({...s,visits:s.visits.map(v=>v.id===id?{...v,...patch}:v)}));toast('Site visit updated')}
  const updateWorkflow=(id,patch)=>{update(s=>({...s,workflows:s.workflows.map(w=>w.id===id?{...w,...patch}:w)}));toast('Demo workflow updated')}
  const addWorkflow=workflow=>{update(s=>({...s,workflows:[{...workflow,id:uid('w'),enabled:false,runs:0,failures:0,lastRun:null},...s.workflows]}));toast('Demo workflow created')}
  const reserveUnit=(id,leadId)=>{
    const unit=state.units.find(u=>u.id===id)
    if(!unit||unit.status!=='Available')return false
    update(s=>({...s,units:s.units.map(u=>u.id===id&&u.status==='Available'?{...u,status:'On Hold',reservedBy:leadId}:u)}));toast('Unit placed on demo hold');return true
  }
  const releaseUnit=id=>{update(s=>({...s,units:s.units.map(u=>u.id===id&&u.reservedBy?{...u,status:'Available',reservedBy:null}:u)}));toast('Demo hold released')}
  const updateSettings=patch=>{update(s=>({...s,settings:{...s.settings,...patch}}));toast('Preferences saved locally')}
  const reset=()=>{setState(init());toast('Sample data restored')}
  const value=useMemo(()=>({leads:state.leads,tasks:state.tasks,visits:state.visits,workflows:state.workflows,units:state.units,settings:state.settings,projects,team,addLead,editLead,deleteLead,changeLeadStage,addNote,addTask,updateTask,addVisit,updateVisit,updateWorkflow,addWorkflow,reserveUnit,releaseUnit,updateSettings,reset,toast}),[state])
  return <DemoContext.Provider value={value}>{children}<div className="toast-stack" role="status">{toasts.map(t=><div className="toast-item" key={t.id}><span className={`toast-dot ${t.type==='error'?'error':''}`}/><span>{t.message}</span><button aria-label="Dismiss notification" onClick={()=>dismissToast(t.id)}>×</button></div>)}</div></DemoContext.Provider>
}
export const useDemo=()=>{const context=useContext(DemoContext);if(!context)throw new Error('useDemo must be inside DemoProvider');return context}
