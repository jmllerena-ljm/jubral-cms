
import { useEffect, useState } from 'react'
export default function Admin(){
  const [json,setJson]=useState(''); const [err,setErr]=useState('')
  useEffect(()=>{fetch('/api/content').then(r=>r.json()).then(d=>setJson(JSON.stringify(d,null,2))).catch(e=>setErr(e.message))},[])
  const download=()=>{const b=new Blob([json],{type:'application/json'});const a=document.createElement('a');a.href=URL.createObjectURL(b);a.download='site.json';a.click();URL.revokeObjectURL(a.href)}
  return (<main className="container section"><div className="card">
    <h2>Editor de contenido</h2>
    <p>Edita el JSON y pulsa <b>Download JSON</b>. Reemplaza <code>content/site.json</code> y despliega.</p>
    <button className="btn" onClick={download}>Download JSON</button> {err && <span style={{color:'#ff9d9d'}}>Error: {err}</span>}
    <textarea rows={28} value={json} onChange={e=>setJson(e.target.value)} style={{width:'100%',marginTop:12,fontFamily:'ui-monospace,Menlo,Consolas'}}/>
  </div></main>)
}
