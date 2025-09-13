
import { useEffect, useState } from 'react'

export default function Admin(){
  const [json, setJson] = useState('')
  const [msg, setMsg] = useState('')
  const [token, setToken] = useState('') // CMS write token (compared server-side)

  useEffect(()=>{ refresh() },[])
  function refresh(){
    fetch('/api/content').then(r=>r.json()).then(d=>setJson(JSON.stringify(d,null,2)))
      .catch(e=>setMsg('Error cargando contenido: '+e.message))
  }
  async function saveToGitHub(){
    setMsg('Guardando...')
    try{
      const r = await fetch('/api/content',{
        method:'POST',
        headers:{'Content-Type':'application/json','x-cms-token':token || ''},
        body: JSON.stringify({ content: json, message: 'chore(cms): update site.json' })
      })
      const data = await r.json()
      if(!r.ok) throw new Error(data.error || 'Error desconocido')
      setMsg('Guardado en GitHub ✓ ' + (data.url || ''))
    }catch(e){
      setMsg('Error al guardar: ' + e.message)
    }
  }
  function download(){
    const blob = new Blob([json], {type:'application/json'})
    const a = document.createElement('a'); a.href = URL.createObjectURL(blob); a.download='site.json'; a.click()
    URL.revokeObjectURL(a.href)
  }

  return (
    <main className="container section">
      <div className="card">
        <h2>Editor de contenido</h2>
        <p>Para guardar directo al repositorio configura variables en Vercel y usa tu token de escritura.</p>
        <div style={{display:'flex',gap:8,flexWrap:'wrap',margin:'10px 0'}}>
          <input placeholder="CMS write token" value={token} onChange={e=>setToken(e.target.value)} style={{padding:10,border:'1px solid var(--line)',borderRadius:10,minWidth:240}}/>
          <button className="btn" onClick={saveToGitHub}>Save to GitHub</button>
          <button className="btn secondary" onClick={download}>Download JSON</button>
          <button className="btn secondary" onClick={refresh}>Reload</button>
        </div>
        <p style={{color: msg.startsWith('Error')?'#b00020':'#5a6'}}> {msg} </p>
        <textarea rows={28} value={json} onChange={e=>setJson(e.target.value)} style={{width:'100%',fontFamily:'ui-monospace,Menlo,Consolas',fontSize:13}}/>
      </div>
    </main>
  )
}
