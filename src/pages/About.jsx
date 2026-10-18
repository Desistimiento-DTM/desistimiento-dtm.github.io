import Seo from '../components/ui/Seo.jsx'
import PageHeader from '../components/PageHeader.jsx'
import About from '../components/About.jsx'
import Team from '../components/Team.jsx'
import Process from '../components/Process.jsx'
import CTA from '../components/CTA.jsx'
import { nosotros } from '../content/index.js'

export default function AboutPage() {
  return (
    <>
      <Seo title="Nosotros" path="/nosotros" />
      <PageHeader eyebrow={nosotros.etiqueta} title={nosotros.titulo} text={nosotros.paginaIntro} />
      <About showButton={false} />
      <Team />
      <Process />
      <CTA />
    </>
  )
}
