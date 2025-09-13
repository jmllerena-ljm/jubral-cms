
export default function Services({items=[]}){
  return (
    <section id="servicios" className="container section">
      <div className="card">
        <h2>Servicios</h2>
        <div className="grid-3">
          {items.map((srv, i)=>(
            <article key={i} className="card service-card">
              {srv.image && <div className="service-image"><img src={srv.image} alt={srv.title}/></div>}
              <div className="service-body">
                <span className="badge">{srv.category || 'Servicio'}</span>
                <h3 style={{margin:'8px 0 6px', fontSize:20}}>{srv.title}</h3>
                <ul style={{margin:0,paddingLeft:18}}>{(srv.items||[]).map((t,j)=>(<li key={j}>{t}</li>))}</ul>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
