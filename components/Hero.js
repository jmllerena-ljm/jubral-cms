export default function Hero({ hero, brand }) {
  return (
    <header className="hero hero-gradient">
      <div className="container hero-inner">
        <div className="hero-copy">
          {hero.kicker && <span className="kicker">{hero.kicker}</span>}
          <h1>{hero.title}</h1>
          {hero.subtitle && <p className="hero-sub">{hero.subtitle}</p>}
          <div className="cta-row">
            <a className="btn" href={hero?.cta?.href || '#contacto'}>
              {hero?.cta?.label || 'Contáctanos'}
            </a>
            <a className="btn secondary" href="#servicios">Ver servicios</a>
          </div>
        </div>
        <div className="hero-media card">
          <img src={hero.image || brand.logo} alt={hero.alt || brand.name} />
        </div>
      </div>
    </header>
  );
}
