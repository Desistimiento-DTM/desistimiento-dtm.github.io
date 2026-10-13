import Seo from '../components/ui/Seo.jsx'
import PageHeader from '../components/PageHeader.jsx'
import CaseForm from '../components/CaseForm.jsx'
import { contacto } from '../content/index.js'

/** Versión en página (URL /evalua-tu-caso) del formulario, útil para campañas y anuncios. */
export default function EvaluatePage() {
  return (
    <>
      <Seo title="Evalúa tu caso" path="/evalua-tu-caso" description={contacto.formularioTexto} />
      <PageHeader
        eyebrow="Evaluación de tu caso"
        title={`${contacto.formularioTitulo} ${contacto.formularioTituloDestacado}`}
        text={contacto.formularioTexto}
      />
      <section className="py-12 md:py-20">
        <div className="container-site max-w-[860px]">
          <CaseForm />
        </div>
      </section>
    </>
  )
}
