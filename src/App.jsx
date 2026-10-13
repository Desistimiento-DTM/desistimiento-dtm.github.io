import { Routes, Route } from 'react-router-dom'
import { EvaluationProvider } from './context/EvaluationContext.jsx'
import Header from './components/Header.jsx'
import Footer from './components/Footer.jsx'
import WhatsAppButton from './components/WhatsAppButton.jsx'
import CaseFormModal from './components/CaseFormModal.jsx'
import ScrollManager from './components/ui/ScrollManager.jsx'
import Home from './pages/Home.jsx'
import Services from './pages/Services.jsx'
import About from './pages/About.jsx'
import Contact from './pages/Contact.jsx'
import Blog from './pages/Blog.jsx'
import Article from './pages/Article.jsx'
import Evaluate from './pages/Evaluate.jsx'
import LegalPage from './pages/LegalPage.jsx'
import NotFound from './pages/NotFound.jsx'

export default function App() {
  return (
    <EvaluationProvider>
      <ScrollManager />
      <a href="#contenido" className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[60] focus:rounded-lg focus:bg-paper focus:px-4 focus:py-2">
        Saltar al contenido
      </a>
      <Header />
      <main id="contenido">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/servicios" element={<Services />} />
          <Route path="/nosotros" element={<About />} />
          <Route path="/contacto" element={<Contact />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:slug" element={<Article />} />
          <Route path="/evalua-tu-caso" element={<Evaluate />} />
          <Route path="/politica-de-privacidad" element={<LegalPage doc="privacidad" path="/politica-de-privacidad" />} />
          <Route path="/tratamiento-de-datos" element={<LegalPage doc="tratamiento-de-datos" path="/tratamiento-de-datos" />} />
          <Route path="/terminos-y-condiciones" element={<LegalPage doc="terminos" path="/terminos-y-condiciones" />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
      <WhatsAppButton />
      <CaseFormModal />
    </EvaluationProvider>
  )
}
