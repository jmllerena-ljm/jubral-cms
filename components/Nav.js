
export default function Nav({brand}){
  return (<nav className="nav">
    <div className="brand"><img src={brand.logo || '/logo.jpg'} alt="logo"/><span>{brand.name}</span></div>
    <div style={{display:'flex',gap:12}}>
      <a className="btn" href="#servicios">Servicios</a>
      <a className="btn" href="#contacto">Contáctanos</a>
    </div>
  </nav>)
}
