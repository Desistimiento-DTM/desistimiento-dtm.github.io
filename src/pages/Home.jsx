import Seo from '../components/ui/Seo.jsx'
import Hero from '../components/Hero.jsx'
import Services from '../components/Services.jsx'
import DesistimientoSection from '../components/DesistimientoSection.jsx'
import About from '../components/About.jsx'
import Process from '../components/Process.jsx'
import Cases from '../components/Cases.jsx'
import Testimonials from '../components/Testimonials.jsx'
import Blog from '../components/Blog.jsx'
import CTA from '../components/CTA.jsx'

export default function Home() {
  return (
    <>
      <Seo />
      <Hero />
      <Services />
      <DesistimientoSection />
      <About />
      <Process />
      <Cases />
      <Testimonials />
      <Blog />
      <CTA />
    </>
  )
}
