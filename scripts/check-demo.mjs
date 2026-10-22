import assert from 'node:assert/strict'
import {initialLeads,initialTasks,initialVisits,initialWorkflows,projects,units,team,leadStatuses,pipelineStages,statusFromStage,stageFromStatus} from '../src/data/mock/seed.js'
import {money,pct} from '../src/utils/format.js'
assert(initialLeads.length>=40,'Expected representative lead dataset')
const unique=(items,field)=>new Set(items.map(x=>x[field])).size===items.length
for(const [items,key] of [[initialLeads,'id'],[initialLeads,'email'],[initialLeads,'phone'],[units,'id'],[projects,'id'],[initialTasks,'id'],[initialVisits,'id']])assert(unique(items,key),`Duplicate ${key}`)
for(const l of initialLeads){assert(projects.some(p=>p.id===l.projectId),`Lead ${l.id} project missing`);assert(team.some(t=>t.id===l.ownerId),`Lead ${l.id} owner missing`);assert(leadStatuses.includes(l.status),`Lead ${l.id} status missing`);assert(pipelineStages.includes(l.stage),`Lead ${l.id} pipeline stage missing`);assert.equal(statusFromStage[l.stage],l.status,`Lead ${l.id} status vs stage inconsistent`)}
for(const t of initialTasks)assert(initialLeads.some(l=>l.id===t.leadId),'Orphaned task')
for(const v of initialVisits)assert(initialLeads.some(l=>l.id===v.leadId),'Orphaned visit')
for(const u of units)assert(projects.some(p=>p.id===u.projectId),'Orphaned unit')
assert(money(12500000).startsWith('₹1.25 Cr'));assert.equal(pct(2,4),'50.0%')
console.log(`PASS: ${initialLeads.length} leads, ${units.length} units, ${projects.length} projects, ${initialVisits.length} visits, ${initialTasks.length} tasks, ${initialWorkflows.length} workflows; IDs/references/statuses and INR helpers valid.`)
