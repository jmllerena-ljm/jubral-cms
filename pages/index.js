
import fs from 'fs'
import path from 'path'
import Nav from '../components/Nav'
import Section from '../components/Section'
import Services from '../components/Services'
import Hero from '../components/Hero'
import CTA from '../components/CTA'

export async function getStaticProps(){
  const p = path.join(process.cwd(), 'content', 'site.json')
  const raw = fs.readFileSync(p, 'utf-8')
  const content = JSON.parse(raw)
  return { props: { content } }
}

export default function Home({content}){
  const { brand, hero, about, mission, vision, services, contact } = content
  return (
    <main>
      <Nav brand={brand} />
      <header className="hero">
        <div className="container hero-inner">
          <div>
            <span className="kicker">{hero.kicker}</span>
            <h1>{hero.title}</h1>
            <p>{hero.subtitle}</p>
            <div style={{display:'flex',gap:12,marginTop:8}}>
              <a className="btn" href={hero.cta.href || '#contacto'}>{hero.cta.label}</a>
              <a className="btn secondary" href="#servicios">Ver servicios</a>
            </div>
          </div>
          <div className="card" style={{ borderRadius: 16, overflow: 'hidden', padding: 0 }}>
            <img
              src={hero.image || brand.logo || '/logo.jpg'}
              alt={hero.alt || (brand.name + ' hero')}
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          </div>
        </div>
      </header>

      <Hero hero={hero} brand={brand} />

      <Section id="presentacion" title={about.title} kicker="Quiénes somos">
        {about.body.split('\n\n').map((p,i)=>(<p key={i}>{p}</p>))}
      </Section>

      <Section id="mision" title="Misión"><p>{mission.body}</p></Section>
      <Section id="vision" title="Visión"><p>{vision.body}</p></Section>

      <Services items={services} />

      {/* CTA */}
      <CTA />

      <Section id="contacto" title="Contáctenos">
        <div className="table">
          <div>Correo</div><div><a href={"mailto:" + contact.email}>{contact.email}</a></div>
          <div>Teléfonos</div><div>{contact.phones.join(' · ')}</div>
          <div>Contacto</div><div>{contact.person}</div>
        </div>
        {contact.note && (<p style={{marginTop:12}}>{contact.note}</p>)}
      </Section>

      <footer>© {new Date().getFullYear()} {brand.name}. Todos los derechos reservados.</footer>
    </main>
  )
}
