
export default function Section({id,title,kicker,children}){
  return (<section id={id} className="container section"><div className="card">
    {kicker && <span className="kicker">{kicker}</span>}{title && <h2>{title}</h2>}{children}
  </div></section>)
}
