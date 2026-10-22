export const money = (amount, options={}) => {
  if (amount == null || Number.isNaN(Number(amount))) return '—'
  const n=Number(amount)
  if (n>=10000000) return `₹${Number((n/10000000).toFixed(2))} Cr`
  if (n>=100000) return `₹${(n/100000).toFixed(options.precise?2:1).replace(/\.0$/,'')} L`
  return `₹${new Intl.NumberFormat('en-IN').format(n)}`
}
export const num = n => new Intl.NumberFormat('en-IN').format(n||0)
export const pct = (a,b) => b ? `${(a/b*100).toFixed(1)}%`:'0%'
export const day = input => input ? new Intl.DateTimeFormat('en-IN',{day:'2-digit',month:'short',year:'numeric'}).format(new Date(input)):'—'
export const dateTime = input => input ? new Intl.DateTimeFormat('en-IN',{day:'2-digit',month:'short',hour:'2-digit',minute:'2-digit'}).format(new Date(input)):'—'
export const relative = input => {
  if (!input) return 'Not contacted'
  const d = Math.round((new Date(input).getTime()-Date.now())/86400000)
  if (d===0) return 'Today'
  if (d===1) return 'Tomorrow'
  if (d===-1) return 'Yesterday'
  return day(input)
}
export const nameFor=(items,id)=>items.find(x=>x.id===id)?.name||'Unassigned'
export const downloadCsv=(filename,records)=>{
  if (!records?.length) return false
  const keys=Object.keys(records[0])
  const escape=value => `"${String(value ?? '').replaceAll('"','""')}"`
  const content=[keys.map(escape).join(','),...records.map(r=>keys.map(k=>escape(r[k])).join(','))].join('\r\n')
  const blob=new Blob(['\ufeff'+content],{type:'text/csv;charset=utf-8;'})
  const url=URL.createObjectURL(blob),a=document.createElement('a');a.href=url;a.download=filename;a.click();URL.revokeObjectURL(url)
  return true
}
export const projectFor=(projects,id)=>projects.find(p=>p.id===id)
