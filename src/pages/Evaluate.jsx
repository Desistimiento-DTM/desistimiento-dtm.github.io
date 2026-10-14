import { Link, useSearchParams } from 'react-router-dom'
import Seo from '../components/ui/Seo.jsx'
import PageHeader from '../components/PageHeader.jsx'
import CaseForm from '../components/CaseForm.jsx'
import Icon from '../components/ui/Icon.jsx'
import { contacto } from '../content/index.js'

/** Versión en página (URL /evalua-tu-caso) del formulario. Con ?enviado=1 muestra la confirmación. */
export default function EvaluatePage() {
  const [params] = useSearchParams()
  const sent = params.get('enviado') === '1'

  return (
    <>
      <Seo title="Evalúa tu caso" path="/evalua-tu-caso" description={contacto.formularioTexto} />
      <PageHeader
        eyebrow="Evaluación de tu caso"
        title={sent ? 'Recibimos tu caso' : `${contacto.formularioTitulo} ${contacto.formularioTituloDestacado}`}
        text={sent ? undefined : contacto.formularioTexto}
      />
      <section className="py-12 md:py-20">
        <div className="container-site max-w-[860px]">
          {sent ? (
            <div className="rounded-[22px] border border-line bg-paper px-6 py-14 text-center sm:px-11" role="status">
              <span className="inline-flex h-[72px] w-[72px] items-center justify-center rounded-full bg-blush text-terra">
                <Icon name="tick" size={34} strokeWidth={1.8} />
              </span>
              <h2 className="mt-6 text-[32px] text-wine-deep sm:text-4xl">¡Gracias!</h2>
              <p className="mx-auto mt-4 max-w-[460px] leading-relaxed text-muted">{contacto.mensajeConfirmacion}</p>
              <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
                <Link to="/" className="btn btn-primary">Volver al inicio</Link>
                <Link to="/evalua-tu-caso" className="btn btn-outline">Enviar otro caso</Link>
              </div>
            </div>
          ) : (
            <CaseForm />
          )}
        </div>
      </section>
    </>
  )
}
