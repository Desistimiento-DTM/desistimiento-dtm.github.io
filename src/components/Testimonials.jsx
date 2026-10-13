import { useCallback, useEffect, useRef, useState } from 'react'
import { testimonios } from '../content/index.js'
import Icon from './ui/Icon.jsx'
import { Reveal, SectionHeading } from './ui/Primitives.jsx'

function Stars({ rating }) {
  const r = Number(rating) || 0
  return (
    <div className="flex gap-1" role="img" aria-label={r ? `Calificación: ${r} de 5` : 'Calificación pendiente'}>
      {Array.from({ length: 5 }, (_, i) => (
        <svg key={i} width="16" height="16" viewBox="0 0 24 24" aria-hidden="true"
          fill={i < r ? '#B4521F' : 'none'} stroke={i < r ? '#B4521F' : '#D9C3AE'} strokeWidth="1.6">
          <path d="m12 3 2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1-4.4-4.3 6.1-.9z" />
        </svg>
      ))}
    </div>
  )
}

const initialsOf = (name = '') =>
  name.replace(/\[.*?\]/g, '').trim().split(/\s+/).filter(Boolean).slice(0, 2).map((w) => w[0].toUpperCase()).join('') || '—'

export function TestimonialCard({ t }) {
  return (
    <figure className={`flex h-full flex-col gap-4.5 rounded-[18px] border bg-paper px-7 py-8 ${t.esEjemplo ? 'border-dashed border-sand' : 'border-line'}`}>
      <svg width="34" height="26" viewBox="0 0 34 26" aria-hidden="true">
        <path d="M0 26V15C0 6.5 4.5 1.5 13 0l1.6 3.4C9.6 5 7.6 8 7.4 12H14v14zm19 0V15c0-8.5 4.5-13.5 13-15l1.6 3.4C28.6 5 26.6 8 26.4 12H33v14z" fill="#E2A27E" />
      </svg>
      <blockquote className={`flex-1 text-base leading-relaxed italic ${t.esEjemplo ? 'text-subtle' : 'text-ink'}`}>“{t.texto}”</blockquote>
      <Stars rating={t.calificacion} />
      <figcaption className="flex items-center gap-3 border-t border-[#EFE3D6] pt-4">
        <span className="flex h-[42px] w-[42px] shrink-0 items-center justify-center rounded-full bg-blush text-[13px] font-bold text-wine-2">
          {t.iniciales || initialsOf(t.nombre)}
        </span>
        <span>
          <span className="block text-sm font-bold text-wine-deep">{t.nombre}</span>
          <span className="block text-[13px] text-subtle">{t.tipoCaso}</span>
        </span>
      </figcaption>
    </figure>
  )
}

/** Carrusel responsive con scroll-snap: 1 tarjeta en móvil, 2 en tablet, 3 en escritorio. */
export default function Testimonials() {
  const items = testimonios.testimonios || []
  const track = useRef(null)
  const [page, setPage] = useState(0)
  const [pages, setPages] = useState(1)

  const measure = useCallback(() => {
    const el = track.current
    if (!el) return
    const total = Math.max(1, Math.round(el.scrollWidth / el.clientWidth))
    setPages(total)
    setPage(Math.min(total - 1, Math.round(el.scrollLeft / el.clientWidth)))
  }, [])

  useEffect(() => {
    measure()
    const el = track.current
    el?.addEventListener('scroll', measure, { passive: true })
    window.addEventListener('resize', measure)
    return () => {
      el?.removeEventListener('scroll', measure)
      window.removeEventListener('resize', measure)
    }
  }, [measure])

  const go = (p) => {
    const el = track.current
    if (!el) return
    el.scrollTo({ left: ((p + pages) % pages) * el.clientWidth, behavior: 'smooth' })
  }

  if (!items.length) return null

  return (
    <section aria-labelledby="testi-title" aria-roledescription="carrusel" className="border-y border-[#EFE3D6] bg-cream-2 py-20 md:py-26">
      <div className="container-site">
        <Reveal className="mb-11 flex flex-wrap items-end justify-between gap-6">
          <SectionHeading id="testi-title" eyebrow={testimonios.etiqueta} title={testimonios.titulo} />
          {pages > 1 && (
            <div className="hidden gap-2.5 md:flex">
              {[['left', 'anteriores', -1], ['right', 'siguientes', 1]].map(([icon, label, dir]) => (
                <button key={icon} type="button" onClick={() => go(page + dir)} aria-label={`Testimonios ${label}`}
                  className="inline-flex h-[46px] w-[46px] items-center justify-center rounded-full border border-sand bg-paper text-wine-2 transition hover:bg-[#F0E3D5]">
                  <Icon name={icon} size={18} strokeWidth={1.8} />
                </button>
              ))}
            </div>
          )}
        </Reveal>

        <div
          ref={track}
          className="-mx-5 flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-px-5 px-5 pb-2 [scrollbar-width:none] md:mx-0 md:gap-7 md:scroll-px-0 md:px-0 [&::-webkit-scrollbar]:hidden"
        >
          {items.map((t, i) => (
            <div key={i} className="shrink-0 basis-[86%] snap-start md:basis-[calc((100%-28px)/2)] lg:basis-[calc((100%-56px)/3)]">
              <TestimonialCard t={t} />
            </div>
          ))}
        </div>

        {pages > 1 && (
          <div className="mt-8 flex justify-center gap-2.5">
            {Array.from({ length: pages }, (_, i) => (
              <button key={i} type="button" onClick={() => go(i)} aria-label={`Ir al grupo ${i + 1} de testimonios`} aria-current={i === page}
                className={`h-2 rounded-full transition-all duration-300 ${i === page ? 'w-7 bg-terra' : 'w-2 bg-sand'}`} />
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
