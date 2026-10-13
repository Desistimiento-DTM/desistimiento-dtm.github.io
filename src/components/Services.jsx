import { Link } from 'react-router-dom'
import { servicios } from '../content/index.js'
import Icon from './ui/Icon.jsx'
import { Reveal, SectionHeading } from './ui/Primitives.jsx'

const slugify = (s = '') =>
  s.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')

export function ServiceCard({ service }) {
  const id = service.id || slugify(service.titulo)
  const href = id === 'desistimiento' ? '/#desistimiento' : `/servicios#${id}`
  return (
    <article id={id} className="card flex h-full flex-col">
      {service.imagen && (
        <div className="h-44 overflow-hidden">
          <img src={service.imagen} alt={service.imagenAlt || ''} loading="lazy" className="h-full w-full object-cover" />
        </div>
      )}
      <div className="flex flex-1 flex-col gap-3 px-6 pt-6 pb-5">
        <Icon name={service.icono || 'document'} size={30} strokeWidth={1.5} className="text-terra" />
        <h3 className="text-[23px] leading-tight text-wine-deep">{service.titulo}</h3>
        <p className="flex-1 text-[15px] leading-relaxed text-muted">{service.texto}</p>
        <Link to={href} className="link-more" aria-label={`Conocer más sobre ${service.titulo}`}>
          Conocer más <span aria-hidden="true">→</span>
        </Link>
      </div>
    </article>
  )
}

export default function Services({ showHeadingLink = true }) {
  const items = servicios.servicios || []
  const cols = items.length >= 4 ? 'lg:grid-cols-4' : items.length === 3 ? 'lg:grid-cols-3' : 'lg:grid-cols-2'
  return (
    <section id="servicios" aria-labelledby="servicios-title" className="py-20 md:py-28">
      <div className="container-site">
        <Reveal className="mb-12 flex flex-wrap items-end justify-between gap-6">
          <SectionHeading id="servicios-title" eyebrow={servicios.etiqueta} title={servicios.titulo} text={servicios.texto} />
          {showHeadingLink && (
            <Link to="/servicios" className="link-more">
              Conoce todos los servicios <span aria-hidden="true">→</span>
            </Link>
          )}
        </Reveal>
        <div className={`grid gap-6 sm:grid-cols-2 ${cols}`}>
          {items.map((s, i) => (
            <Reveal key={(s.id || s.titulo) + i} delay={i * 90}>
              <ServiceCard service={s} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
