// components/Hero.jsx
import { useEffect, useState, useMemo } from 'react';

export default function Hero({ hero, brand }) {
  // Lista de imágenes: si no hay hero.images, usa hero.image como único slide
  const images = useMemo(
    () => (hero?.images?.length ? hero.images : [hero?.image || brand?.logo || '/hero.jpg']),
    [hero, brand]
  );
  const intervalMs = hero?.intervalMs || 4000;
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    if (images.length < 2) return;
    const id = setInterval(() => setIdx(i => (i + 1) % images.length), intervalMs);
    return () => clearInterval(id);
  }, [images.length, intervalMs]);

  return (
    <section className="hero-full" aria-label={hero?.alt || brand?.name || 'Hero'}>
      {/* Slides en background con fade */}
      <div className="hero-slides">
        {images.map((src, i) => (
          <div
            key={i}
            className={`hero-slide ${i === idx ? 'is-active' : ''}`}
            style={{ backgroundImage: `url(${src})` }}
          />
        ))}
        <div className="hero-mask" />
      </div>

      {/* Contenido */}
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

      {/* Dots de navegación */}
      {images.length > 1 && (
        <div className="hero-dots" aria-label="carrusel">
          {images.map((_, i) => (
            <button
              key={i}
              className={`hero-dot ${i === idx ? 'is-active' : ''}`}
              onClick={() => setIdx(i)}
              aria-label={`Ir al slide ${i + 1}`}
            />
          ))}
        </div>
      )}
    </section>
  );
}
