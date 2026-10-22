// Every record in this module is fictional and used only for the EstateFlow demo.
export const demoToday = () => new Date()
export const shiftDay = (offset, hour = 10) => {
  const d = new Date(); d.setHours(hour, 0, 0, 0); d.setDate(d.getDate() + offset); return d.toISOString()
}
export const team = [
  {id:'u1',name:'Aarav Mehta',role:'Super Admin',team:'Leadership',initials:'AM',color:'#6754d7'},
  {id:'u2',name:'Priya Nair',role:'Sales Manager',team:'Residential Sales',initials:'PN',color:'#237e94'},
  {id:'u3',name:'Rohan Desai',role:'Sales Executive',team:'Residential Sales',initials:'RD',color:'#af6a38'},
  {id:'u4',name:'Neha Kulkarni',role:'Sales Executive',team:'Investor Desk',initials:'NK',color:'#af4f7e'},
  {id:'u5',name:'Vikram Sethi',role:'Sales Executive',team:'Commercial',initials:'VS',color:'#3b7b66'},
  {id:'u6',name:'Isha Kapoor',role:'Marketing Executive',team:'Marketing',initials:'IK',color:'#687bb5'},
  {id:'u7',name:'Dev Malhotra',role:'Inventory Manager',team:'Operations',initials:'DM',color:'#64748b'},
]
export const projects = [
  {id:'p1',name:'GreenVista Residences',city:'Indore',location:'Nipania, Indore',developer:'Evergreen Habitat Pvt Ltd',type:'Residential Apartments',status:'Under Construction',startPrice:8400000,totalUnits:96,accent:'#75856a',short:'GR',description:'A contemporary residential community designed around landscaped courtyards and everyday convenience.',amenities:['Landscaped court','Fitness studio','Children’s play area','Security']},
  {id:'p2',name:'Skyline Business Park',city:'Indore',location:'Super Corridor, Indore',developer:'Axis Urban Developments',type:'Commercial',status:'Ready to Move',startPrice:12500000,totalUnits:64,accent:'#5c7789',short:'SB',description:'Grade-A business units with flexible floorplates and access to the city’s growth corridor.',amenities:['Lobby','Visitor parking','Security','High-speed lifts']},
  {id:'p3',name:'Riverfront Enclave',city:'Bhopal',location:'Kolar Road, Bhopal',developer:'Riverview Homes',type:'Residential Villas',status:'Under Construction',startPrice:17200000,totalUnits:48,accent:'#b18b70',short:'RE',description:'A low-density villa neighbourhood with private open spaces and neighbourhood amenities.',amenities:['Walking trail','Private gardens','Community hall','Security']},
  {id:'p4',name:'Orchid Heights',city:'Pune',location:'Wakad, Pune',developer:'Orchid Living Group',type:'Residential Apartments',status:'New Launch',startPrice:10300000,totalUnits:120,accent:'#9a819b',short:'OH',description:'Urban residences with modern floor plans and quick access to employment hubs.',amenities:['Pool','Indoor games','Fitness centre','Terrace garden']},
]
export const sources = ['Meta Ads','Google Ads','Website','MagicBricks','99acres','Referral','Walk-in']
export const leadStatuses = ['New','Contacted','Qualified','Site Visit Scheduled','Negotiation','Converted','Lost']
export const pipelineStages = ['New','Contacted','Qualified','Site Visit','Negotiation','Booking','Won','Lost']
export const priorities = ['Hot','Warm','Cold']
export const statusFromStage = {New:'New',Contacted:'Contacted',Qualified:'Qualified','Site Visit':'Site Visit Scheduled',Negotiation:'Negotiation',Booking:'Negotiation',Won:'Converted',Lost:'Lost'}
export const stageFromStatus = {'New':'New',Contacted:'Contacted',Qualified:'Qualified','Site Visit Scheduled':'Site Visit',Negotiation:'Negotiation',Converted:'Won',Lost:'Lost'}
const firstNames=['Ananya','Rahul','Meera','Aditya','Kavya','Siddharth','Nisha','Varun','Pooja','Arjun','Simran','Karan','Tanvi','Nikhil','Aditi','Samar','Ritika','Aman','Shreya','Kabir','Riya','Pranav','Divya','Harsh','Sneha','Yash','Kirti','Ishan','Maya','Dhruv']
const lastNames=['Sharma','Rao','Jain','Patel','Agarwal','Bansal','Iyer','Singh','Joshi','Gupta','Kapoor','Malhotra','Mehta','Kulkarni','Desai','Bhatia','Chopra','Saxena','Nair','Sethi']
const stages=['New','Contacted','Qualified','Site Visit','Negotiation','Booking','Won','Lost']
export const initialLeads = Array.from({length:56},(_,i)=>{
  const id=`l${String(i+1).padStart(3,'0')}`
  const first=firstNames[i%firstNames.length],last=lastNames[(i*3+2)%lastNames.length]
  const project=projects[(i*7+Math.floor(i/4))%projects.length]
  const stage=stages[[0,1,2,3,2,4,1,6,0,5,7,3,2,1,4,0][i%16]]
  const createdOffset= -(i*2 + (i%4))
  return {id,fullName:`${first} ${last}`,phone:`90000${String(10000+i*31).slice(-5)}`,
    email:`${first.toLowerCase()}.${last.toLowerCase()}${i+1}@example.com`,source:sources[(i*5+Math.floor(i/3))%sources.length],
    projectId:project.id,location:project.city,propertyType:project.type.includes('Commercial')?'Office':project.type.includes('Villas')?'Villa':'Apartment',
    budgetMin:Math.round(project.startPrice*.85),budgetMax:Math.round(project.startPrice*1.5),value:Math.round(project.startPrice*(1.05+(i%5)*.12)),
    ownerId:['u2','u3','u4','u5'][i%4],status:statusFromStage[stage],stage,
    priority:priorities[i%7===0?0:i%3===0?2:1],createdAt:shiftDay(createdOffset,9+i%8),
    lastContactedAt:i%6===0?null:shiftDay(Math.min(-1,createdOffset+1),10),
    nextFollowupAt:shiftDay((i%9)-3,10+i%6),
    notes:i%5===0?[{id:`n${i}`,body:'Asked for a detailed cost sheet and site visit availability.',at:shiftDay(createdOffset+1)}]:[],
    activities:[{id:`a${i}`,label:'Lead created',detail:`Lead received from ${sources[(i*5+Math.floor(i/3))%sources.length]}`,at:shiftDay(createdOffset,9+i%8)}],
    lostReason:stage==='Lost'?['Budget mismatch','Location preference','Not ready to purchase'][i%3]:null}
})
export const units = Array.from({length:36},(_,i)=>{
  const p=projects[Math.floor(i/9)]
  return {id:`unit${i+1}`,code:`${p.short}-${String(Math.floor(i%9/3)+1).padStart(2,'0')}${String((i%3)+1).padStart(2,'0')}`,
    projectId:p.id,tower:p.type==='Commercial'?'Block A':`Tower ${String.fromCharCode(65+Math.floor(i%9/3))}`,floor:Math.floor(i%9/3)+1,
    configuration:p.type==='Commercial'?'Office Suite':p.type.includes('Villas')?'3 BHK Villa':i%3===0?'3 BHK':'2 BHK',
    area:p.type==='Commercial'?1450+(i%3)*225:p.type.includes('Villas')?2300+(i%3)*150:1160+(i%3)*180,
    price:Math.round(p.startPrice*(1+(i%3)*.13)),status:i%7===0?'Sold':i%9===0?'Booked':i%8===0?'On Hold':'Available',
    amenities:p.amenities,reservedBy:null}
})
export const initialVisits = Array.from({length:13},(_,i)=>({id:`v${i+1}`,leadId:initialLeads[(i*4+2)%initialLeads.length].id,
  projectId:initialLeads[(i*4+2)%initialLeads.length].projectId,ownerId:['u2','u3','u4','u5'][i%4],at:shiftDay(i-3,10+(i%6)),
  status:i<3?'Completed':'Scheduled',notes:i%3===0?'Discuss floor plans and pricing options.':'Initial guided property tour.',outcome:i<3?'Customer reviewing options':''}))
export const initialTasks = Array.from({length:24},(_,i)=>({id:`t${i+1}`,title:['Call back on pricing','Share property brochure','Confirm site visit','Discuss payment plan','Send comparison sheet','Follow up after tour'][i%6],
  leadId:initialLeads[(i*3+1)%initialLeads.length].id,ownerId:['u2','u3','u4','u5'][i%4],dueAt:shiftDay((i%11)-5,11+i%6),priority:priorities[i%3],done:i%7===0,
  createdAt:shiftDay(-i-2)}))
export const initialWorkflows = [
  {id:'w1',name:'Auto-assign new website enquiries',trigger:'Lead created · Website',condition:'Source equals Website',action:'Assign round-robin to sales team',enabled:true,runs:128,failures:2,lastRun:shiftDay(-1)},
  {id:'w2',name:'Qualified lead follow-up',trigger:'Lead marked Qualified',condition:'No open follow-up exists',action:'Create task due tomorrow',enabled:true,runs:83,failures:0,lastRun:shiftDay(-1)},
  {id:'w3',name:'Overdue follow-up escalation',trigger:'Task becomes overdue',condition:'Task remains incomplete',action:'Notify assigned sales manager',enabled:false,runs:31,failures:1,lastRun:shiftDay(-3)},
  {id:'w4',name:'Site visit team notification',trigger:'Site visit scheduled',condition:'Sales owner is assigned',action:'Create internal notification',enabled:true,runs:57,failures:0,lastRun:shiftDay(-2)},
  {id:'w5',name:'Uncontacted lead SLA alert',trigger:'Lead older than 2 hours',condition:'No contact logged',action:'Escalate lead to manager',enabled:false,runs:12,failures:0,lastRun:shiftDay(-5)},
]
export const sampleDocuments = [
  {id:'d1',name:'GreenVista — Project brochure',type:'Brochure',projectId:'p1',updatedAt:shiftDay(-4),size:'2.8 MB',access:'Internal'},
  {id:'d2',name:'Skyline — Floor plan catalogue',type:'Floor plan',projectId:'p2',updatedAt:shiftDay(-12),size:'1.6 MB',access:'Internal'},
  {id:'d3',name:'Riverfront — Payment schedule',type:'Pricing',projectId:'p3',updatedAt:shiftDay(-7),size:'680 KB',access:'Restricted'},
  {id:'d4',name:'Orchid — Specification sheet',type:'Specification',projectId:'p4',updatedAt:shiftDay(-2),size:'1.2 MB',access:'Internal'},
]
