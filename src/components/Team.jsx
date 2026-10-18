import { equipo } from '../content/index.js'
import Icon from './ui/Icon.jsx'
import { Reveal, SectionHeading } from './ui/Primitives.jsx'

const FALLBACK_PHOTO = '/images/equipo-placeholder.svg'

function Links({ person }) {
  if (!person.correo && !person.linkedin) return null
  return (
    <div className="mt-6 flex flex-wrap gap-3">
      {person.correo && (
        <a href={`mailto:${person.correo}`} className="inline-flex min-h-11 items-center gap-2 rounded-full border border-sand px-4 text-sm font-semibold text-wine-2 transition hover:bg-blush">
          <Icon name="mail" size={18} /> {person.correo}
        </a>
      )}
      {person.linkedin && (
        <a href={person.linkedin} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center gap-2 rounded-full border border-sand px-4 text-sm font-semibold text-wine-2 transition hover:bg-blush">
          LinkedIn <Icon name="arrow" size={16} />
        </a>
      )}
    </div>
  )
}

/** Tarjeta destacada: se usa cuando el equipo es de una sola persona. */
function FeaturedMember({ person }) {
  return (
    <article className="grid overflow-hidden rounded-[22px] border border-line bg-paper md:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)]">
      <div className="relative min-h-[360px] md:min-h-[460px]">
        <img src={person.foto || FALLBACK_PHOTO} alt={`Fotografía de ${person.nombre}`} loading="lazy" className="absolute inset-0 h-full w-full object-cover" />
      </div>
      <div className="flex flex-col justify-center px-7 py-10 md:px-12 md:py-14">
        {person.cargo && <p className="eyebrow mb-3 text-terra">{person.cargo}</p>}
        <h3 className="text-[32px] leading-tight text-wine-deep md:text-[40px]">{person.nombre}</h3>
        <span aria-hidden="true" className="mt-5 block h-px w-16 bg-terra-light" />
        <p className="mt-5 text-[17px] leading-[1.75] whitespace-pre-line text-muted">{person.descripcion}</p>
        <Links person={person} />
      </div>
    </article>
  )
}

/** Tarjeta compacta: se usa cuando hay dos o más personas. */
function MemberCard({ person }) {
  return (
    <article className="card flex h-full flex-col">
      <div className="aspect-[4/5] overflow-hidden">
        <img src={person.foto || FALLBACK_PHOTO} alt={`Fotografía de ${person.nombre}`} loading="lazy" className="h-full w-full object-cover" />
      </div>
      <div className="flex flex-1 flex-col px-6 pt-6 pb-6">
        {person.cargo && <p className="eyebrow mb-2 text-[11px] text-terra">{person.cargo}</p>}
        <h3 className="text-[24px] leading-tight text-wine-deep">{person.nombre}</h3>
        <p className="mt-3 flex-1 text-[15px] leading-relaxed whitespace-pre-line text-muted">{person.descripcion}</p>
        <Links person={person} />
      </div>
    </article>
  )
}

/** Sección «Nuestro equipo». Contenido editable en el panel → Página de inicio → Nuestro equipo. */
export default function Team() {
  const people = (equipo.miembros || []).filter((p) => p.nombre)
  if (equipo.mostrar === false || !people.length) return null
  const cols = people.length === 2 ? 'md:grid-cols-2' : 'sm:grid-cols-2 lg:grid-cols-3'

  return (
    <section id="equipo" aria-labelledby="equipo-title" className="py-20 md:py-28">
      <div className="container-site">
        <Reveal>
          <SectionHeading id="equipo-title" eyebrow={equipo.etiqueta} title={equipo.titulo} text={equipo.texto} className="mb-12" />
        </Reveal>
        {people.length === 1 ? (
          <Reveal>
            <FeaturedMember person={people[0]} />
          </Reveal>
        ) : (
          <div className={`grid gap-7 ${cols}`}>
            {people.map((p, i) => (
              <Reveal key={p.nombre + i} delay={(i % 3) * 100}>
                <MemberCard person={p} />
              </Reveal>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
