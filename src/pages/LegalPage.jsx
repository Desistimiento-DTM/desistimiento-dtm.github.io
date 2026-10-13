import Seo from '../components/ui/Seo.jsx'
import PageHeader from '../components/PageHeader.jsx'
import Markdown from '../components/ui/Markdown.jsx'
import { legal } from '../content/index.js'

/** Textos legales, editables en el panel /admin → Textos legales. */
export default function LegalPage({ doc, path }) {
  const d = legal[doc] || { titulo: 'Información legal', contenido: '[POR DEFINIR]' }
  return (
    <>
      <Seo title={d.titulo} path={path} />
      <PageHeader eyebrow="Información legal" title={d.titulo} />
      <section className="py-14 md:py-16">
        <div className="container-site max-w-3xl">
          <Markdown text={d.contenido} />
        </div>
      </section>
    </>
  )
}
