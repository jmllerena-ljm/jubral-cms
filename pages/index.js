
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
        <div className="contact-grid">
          {/* Columna 1: Dirección */}
          <div>
            <h3 style={{ marginTop: 0 }}>Dirección</h3>
            <p style={{ margin: 0 }}>{contact.address?.line1}</p>
            {contact.address?.line2 && <p style={{ margin: 0 }}>{contact.address.line2}</p>}
            {contact.address?.city && <p style={{ margin: 0 }}>{contact.address.city}</p>}
          </div>

          {/* Columna 2: Contáctanos */}
          <div>
            <h3 style={{ marginTop: 0 }}>Contáctanos</h3>
            <p style={{ margin: '6px 0' }}>
              <strong>Correo:</strong>{' '}
              <a href={'mailto:' + contact.email}>{contact.email}</a>
            </p>
            <p style={{ margin: '6px 0' }}>
              <strong>Teléfonos:</strong>{' '}
              {(contact.phones || []).map((t, i) => (
                <a key={i} href={'tel:' + t.replace(/\s+/g, '')} style={{ marginRight: 10 }}>{t}</a>
              ))}
            </p>
            {contact.person && <p style={{ margin: '6px 0' }}><strong>Contacto:</strong> {contact.person}</p>}
            {contact.note && <p style={{ marginTop: 8 }}>{contact.note}</p>}
          </div>

          {/* Columna 3: Redes sociales */}
          <div>
            <h3 style={{ marginTop: 0 }}>Redes sociales</h3>
            <div className="socials">
              {contact.socials?.whatsapp && (
                <a href={contact.socials.whatsapp} target="_blank" rel="noreferrer" aria-label="WhatsApp">
                  {/* WhatsApp */}
                  <svg viewBox="0 0 24 24"><path d="M12.04 2a9.9 9.9 0 0 0-8.5 14.93L2 22l5.2-1.52A9.9 9.9 0 1 0 12.04 2Zm5.7 14.2c-.24.68-1.4 1.28-1.92 1.31-.51.03-1.15.04-1.86-.12-.43-.1-.98-.33-1.7-.64-2.98-1.29-4.92-4.28-5.07-4.48-.14-.2-1.21-1.61-1.21-3.07 0-1.46.77-2.18 1.04-2.48.27-.3.6-.38.8-.38.2 0 .4 0 .57.01.18.01.43-.07.67.51.24.58.83 2 .91 2.14.08.15.12.32.02.52-.1.2-.16.32-.32.49-.16.18-.33.4-.47.54-.16.17-.32.36-.14.67.18.3.79 1.3 1.7 2.1 1.17 1.05 2.16 1.37 2.48 1.52.32.15.5.13.68-.07.18-.2.78-.9.99-1.2.21-.31.42-.25.7-.15.27.1 1.72.81 2.01.96.3.15.5.22.57.34.07.12.07.71-.17 1.39Z"/></svg>
                  WhatsApp
                </a>
              )}
              {contact.socials?.facebook && (
                <a href={contact.socials.facebook} target="_blank" rel="noreferrer" aria-label="Facebook">
                  {/* Facebook */}
                  <svg viewBox="0 0 24 24"><path d="M13 3h3a1 1 0 0 1 1 1v3h-3a1 1 0 0 0-1 1v3h4l-1 4h-3v8h-4v-8H7v-4h2V8a5 5 0 0 1 5-5Z"/></svg>
                  Facebook
                </a>
              )}
              {contact.socials?.instagram && (
                <a href={contact.socials.instagram} target="_blank" rel="noreferrer" aria-label="Instagram">
                  {/* Instagram */}
                  <svg viewBox="0 0 24 24"><path d="M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5Zm5 5.5A5.5 5.5 0 1 0 17.5 13 5.51 5.51 0 0 0 12 7.5Zm0 2A3.5 3.5 0 1 1 8.5 13 3.5 3.5 0 0 1 12 9.5Zm5-2.25a1.25 1.25 0 1 0 1.25 1.25A1.25 1.25 0 0 0 17 7.25Z"/></svg>
                  Instagram
                </a>
              )}
              {contact.socials?.linkedin && (
                <a href={contact.socials.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn">
                  {/* LinkedIn */}
                  <svg viewBox="0 0 24 24"><path d="M6 3a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm1 7H3v11h4V10Zm6.5 0A4.5 4.5 0 0 1 18 14.5V21h-4v-6a2 2 0 1 0-4 0v6H6v-11h4v1.65A4.48 4.48 0 0 1 13.5 10Z"/></svg>
                  LinkedIn
                </a>
              )}
            </div>
          </div>
        </div>
      </Section>


      <footer>© {new Date().getFullYear()} {brand.name}. Todos los derechos reservados.</footer>
    </main>
  )
}
