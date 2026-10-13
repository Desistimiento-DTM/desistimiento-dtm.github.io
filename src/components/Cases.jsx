import { casos } from '../content/index.js'
import { Reveal, SectionHeading } from './ui/Primitives.jsx'

export function CaseCard({ item, index }) {
  return (
    <article className="card flex h-full flex-col gap-4 px-7 py-8">
      <div className="flex items-center justify-between gap-3">
        <span className="font-serif text-[40px] leading-none text-[#E2CBB6]">{String(index + 1).padStart(2, '0')}</span>
        {item.esEjemplo && (
          <span className="rounded-full bg-[#F6E6D8] px-3 py-1.5 text-[11px] font-bold tracking-[0.14em] text-terra-dark uppercase">
            Ejemplo ilustrativo
          </span>
        )}
      </div>
      <h3 className="mt-2 text-2xl leading-tight text-wine-deep">{item.titulo}</h3>
      <p className="text-[15px] leading-relaxed whitespace-pre-line text-muted">{item.texto}</p>
    </article>
  )
}

export default function Cases() {
  const items = casos.casos || []
  const anyExample = items.some((c) => c.esEjemplo)
  return (
    <section id="casos" aria-labelledby="casos-title" className="py-20 md:py-28">
      <div className="container-site">
        <Reveal>
          <SectionHeading id="casos-title" eyebrow={casos.etiqueta} title={casos.titulo} className="mb-12" />
        </Reveal>
        <div className="grid gap-6 md:grid-cols-3 md:gap-7">
          {items.map((c, i) => (
            <Reveal key={c.titulo + i} delay={(i % 3) * 100}>
              <CaseCard item={c} index={i} />
            </Reveal>
          ))}
        </div>
        {anyExample && casos.notaEjemplos && <p className="mt-6 text-[13px] text-subtle">{casos.notaEjemplos}</p>}
      </div>
    </section>
  )
}
