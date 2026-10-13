import Seo from '../components/ui/Seo.jsx'
import PageHeader from '../components/PageHeader.jsx'
import Services from '../components/Services.jsx'
import DesistimientoSection from '../components/DesistimientoSection.jsx'
import Process from '../components/Process.jsx'
import CTA from '../components/CTA.jsx'

export default function ServicesPage() {
  return (
    <>
      <Seo title="Servicios" path="/servicios" description="Desistimiento inmobiliario, revisión de contratos, reclamaciones frente a constructoras y protección al consumidor inmobiliario." />
      <PageHeader
        eyebrow="Servicios"
        title="Acompañamiento en cada etapa de tu compra inmobiliaria."
        text="Te acompañamos en las principales situaciones relacionadas con la compra de vivienda y los conflictos inmobiliarios."
      />
      <Services showHeadingLink={false} />
      <DesistimientoSection />
      <Process />
      <CTA />
    </>
  )
}
