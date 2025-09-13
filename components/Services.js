
export default function Services({items=[]}){
  return (
    <section id="servicios" className="container section">
      <div className="card">
        <h2>Servicios</h2>
        <div className="grid">
          {items.map((srv, i)=>(
            <article key={i} className="card" style={{borderRadius:14, overflow:'hidden', padding:0}}>
              {srv.image && (
                <div style={{aspectRatio:'3/2', overflow:'hidden', borderBottom:'1px solid #2a3448'}}>
                  <img src={srv.image} alt={srv.title} style={{width:'100%', height:'100%', objectFit:'cover'}}/>
                </div>
              )}
              <div style={{padding:18}}>
                <span style={{background:'#2a1620',border:'1px solid #5a2a30',borderRadius:999,padding:'4px 10px',fontSize:12}}>{srv.category||'Servicio'}</span>
                <h3 style={{margin:'8px 0 6px', fontSize:20}}>{srv.title}</h3>
                <ul style={{margin:0,paddingLeft:18}}>
                  {(srv.items||[]).map((t,j)=>(<li key={j}>{t}</li>))}
                </ul>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
