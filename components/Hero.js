// components/Hero.jsx
export default function Hero({ hero, brand }) {
  const bg = hero?.image || brand?.logo || '/hero.jpg';

  return (
    <section
      className="hero-full"
      style={{ backgroundImage: `url(${bg})` }}
      aria-label={hero?.alt || brand?.name || 'Hero'}
    >
      <div className="hero-mask" />
      <div className="container hero-full__content">
        {hero?.kicker && <span className="kicker">{hero.kicker}</span>}
        <h1>{hero?.title || brand?.name}</h1>
        {hero?.subtitle && <p className="lead">{hero.subtitle}</p>}

        <div className="cta-row">
          <a className="btn" href={hero?.cta?.href || '#contacto'}>
            {hero?.cta?.label || 'Contáctanos'}
          </a>
          <a className="btn secondary" href="#servicios">Ver servicios</a>
        </div>
      </div>
    </section>
  );
}
