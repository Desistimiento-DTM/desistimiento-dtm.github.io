import { Link, useParams } from 'react-router-dom'
import Seo from '../components/ui/Seo.jsx'
import Markdown from '../components/ui/Markdown.jsx'
import Icon, { WhatsAppGlyph } from '../components/ui/Icon.jsx'
import { EvaluateButton, Reveal, WhatsAppLink } from '../components/ui/Primitives.jsx'
import { ServiceCard } from '../components/Services.jsx'
import Process from '../components/Process.jsx'
import CTA from '../components/CTA.jsx'
import { servicios } from '../content/index.js'
import { serviceId } from '../utils/slug.js'
import NotFound from './NotFound.jsx'

/** Página de detalle de un servicio: /servicios/:id. Contenido editable en el panel → Página de inicio → Servicios. */
export default function ServiceDetailPage() {
  const { id } = useParams()
  const items = servicios.servicios || []
  const service = items.find((s) => serviceId(s) === id)
  if (!service) return <NotFound />
  const others = items.filter((s) => s !== service)

  return (
    <>
      <Seo title={service.titulo} description={service.texto} path={`/servicios/${id}`} image={service.imagen} />

      {/* Encabezado */}
      <section className="bg-wine">
        <div className="container-site grid items-center gap-10 py-14 md:py-20 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <nav aria-label="Ruta" className="mb-6 flex flex-wrap items-center gap-2 text-sm text-paper/70">
              <Link to="/" className="hover:text-terra-light">Inicio</Link>
              <span aria-hidden="true">/</span>
              <Link to="/servicios" className="hover:text-terra-light">Servicios</Link>
              <span aria-hidden="true">/</span>
              <span className="text-paper/90">{service.titulo}</span>
            </nav>
            <span className="mb-5 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-paper/10 text-terra-light">
              <Icon name={service.icono || 'document'} size={28} />
            </span>
            <h1 className="animate-fade-up text-[38px] leading-[1.06] text-[#FBF4EC] md:text-[56px]">{service.titulo}</h1>
            <p className="mt-5 max-w-xl animate-fade-up text-[17px] leading-relaxed text-paper/80 [animation-delay:150ms] md:text-lg">
              {service.texto}
            </p>
            <div className="mt-9 flex flex-col gap-3.5 sm:flex-row">
              <EvaluateButton>Evaluar mi caso</EvaluateButton>
              <WhatsAppLink className="btn btn-outline-light">Hablar con un asesor</WhatsAppLink>
            </div>
          </div>
          {service.imagen && (
            <div className="overflow-hidden rounded-[22px] shadow-[0_30px_60px_-30px_rgba(0,0,0,0.6)]">
              <img src={service.imagen} alt={service.imagenAlt || ''} className="aspect-[4/3] w-full object-cover" />
            </div>
          )}
        </div>
      </section>

      {/* Contenido */}
      <section className="py-16 md:py-24">
        <div className="container-site grid gap-12 lg:grid-cols-[minmax(0,1fr)_340px] lg:gap-16">
          <Reveal className="min-w-0">
            <Markdown text={service.detalle || service.texto} />
          </Reveal>

          <aside className="lg:sticky lg:top-28 lg:self-start">
            <div className="rounded-[20px] border border-line bg-paper p-7">
              <p className="eyebrow mb-2 text-[11px] text-terra">¿Es tu caso?</p>
              <p className="font-serif text-2xl leading-tight text-wine-deep">Cuéntanos tu situación y la revisamos.</p>
              <p className="mt-3 text-[15px] leading-relaxed text-muted">
                Envíanos la información de tu compra y tus documentos. Te explicaremos las alternativas disponibles.
              </p>
              <div className="mt-6 flex flex-col gap-3">
                <EvaluateButton className="w-full">Evaluar mi caso</EvaluateButton>
                <WhatsAppLink className="btn btn-outline w-full">
                  <WhatsAppGlyph size={18} /> Escribir por WhatsApp
                </WhatsAppLink>
              </div>
            </div>
          </aside>
        </div>
      </section>

      <Process />

      {/* Otros servicios */}
      {others.length > 0 && (
        <section className="py-16 md:py-24">
          <div className="container-site">
            <p className="eyebrow mb-3.5 text-terra">Otros servicios</p>
            <h2 className="mb-10 text-[32px] leading-tight text-wine-deep md:text-[40px]">También podemos ayudarte con</h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {others.map((s) => (
                <ServiceCard key={serviceId(s)} service={s} />
              ))}
            </div>
          </div>
        </section>
      )}

      <CTA />
    </>
  )
}
