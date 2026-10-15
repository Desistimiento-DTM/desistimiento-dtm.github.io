import { Link } from 'react-router-dom'
import { site } from '../config/site.js'
import { servicios } from '../content/index.js'
import { serviceUrl } from '../utils/slug.js'
import { Logo } from './ui/Icon.jsx'
import { WhatsAppLink } from './ui/Primitives.jsx'

const columns = [
  { title: 'Empresa', links: [['Nosotros', '/nosotros'], ['Servicios', '/servicios'], ['Contacto', '/contacto']] },
  {
    title: 'Servicios',
    links: (servicios.servicios || []).map((s) => [s.titulo, serviceUrl(s)]),
  },
  { title: 'Recursos', links: [['Blog y artículos', '/blog'], ['Evalúa tu caso', '/evalua-tu-caso']] },
]

const linkCls = 'text-paper/75 transition-colors hover:text-terra-light'

export default function Footer() {
  return (
    <footer className="bg-wine-night pt-16 pb-24 text-paper/70 md:pt-20 md:pb-8">
      <div className="container-site">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-[1.4fr_repeat(4,minmax(0,1fr))]">
          <div>
            <Link to="/" className="flex items-center gap-3">
              <Logo size={40} dark />
              <span className="font-serif text-[19px] text-[#FBF4EC]">{site.name}</span>
            </Link>
            <p className="mt-4 max-w-[280px] text-sm leading-relaxed">{site.description}</p>
          </div>
          {columns.map((col) => (
            <nav key={col.title} aria-label={col.title}>
              <p className="eyebrow mb-4.5 text-[11px] text-terra-light">{col.title}</p>
              <ul className="flex flex-col gap-3 text-sm">
                {col.links.map(([label, to]) => (
                  <li key={label + to}><Link to={to} className={linkCls}>{label}</Link></li>
                ))}
              </ul>
            </nav>
          ))}
          <div>
            <p className="eyebrow mb-4.5 text-[11px] text-terra-light">Contacto</p>
            <ul className="flex flex-col gap-3 text-sm">
              <li><WhatsAppLink className={linkCls}>WhatsApp</WhatsAppLink></li>
              <li>{site.contact.email}</li>
              <li>{site.contact.city}</li>
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-4 border-t border-paper/12 pt-6 text-[13px] md:mt-16 md:flex-row md:justify-between">
          <span>© {new Date().getFullYear()} {site.name}. Todos los derechos reservados.</span>
          <span className="flex flex-wrap gap-x-6 gap-y-2">
            <Link to={site.legal.privacyUrl} className={linkCls}>Política de privacidad</Link>
            <Link to={site.legal.dataTreatmentUrl} className={linkCls}>Tratamiento de datos personales</Link>
            <Link to={site.legal.termsUrl} className={linkCls}>Términos y condiciones</Link>
          </span>
        </div>
      </div>
    </footer>
  )
}
