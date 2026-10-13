import { Link, useParams } from 'react-router-dom'
import Seo from '../components/ui/Seo.jsx'
import Markdown from '../components/ui/Markdown.jsx'
import CTA from '../components/CTA.jsx'
import { articulos } from '../content/index.js'
import NotFound from './NotFound.jsx'

const formatDate = (d) => {
  const date = new Date(`${String(d).slice(0, 10)}T12:00:00`)
  return Number.isNaN(date.getTime()) ? '' : date.toLocaleDateString('es-CO', { day: 'numeric', month: 'long', year: 'numeric' })
}

export default function ArticlePage() {
  const { slug } = useParams()
  const a = articulos.find((x) => x.slug === slug)
  if (!a) return <NotFound />
  return (
    <>
      <Seo title={a.titulo} description={a.resumen} path={`/blog/${a.slug}`} image={a.imagen} />
      <article>
        <header className="bg-wine">
          <div className="container-site max-w-[860px] py-14 md:py-20">
            <Link to="/blog" className="link-more text-terra-light hover:text-paper">← Volver al blog</Link>
            <p className="eyebrow mt-6 mb-4 text-terra-light">
              {a.categoria}{a.fecha && <span className="text-paper/60"> · {formatDate(a.fecha)}</span>}
            </p>
            <h1 className="text-[38px] leading-[1.08] text-[#FBF4EC] md:text-[54px]">{a.titulo}</h1>
            {a.resumen && <p className="mt-5 text-lg leading-relaxed text-paper/80">{a.resumen}</p>}
          </div>
        </header>
        {a.imagen && (
          <div className="container-site max-w-[1000px] -mt-px pt-10">
            <img src={a.imagen} alt={a.imagenAlt || ''} className="aspect-[16/8] w-full rounded-[20px] object-cover" />
          </div>
        )}
        <div className="container-site max-w-[760px] py-12 md:py-16">
          <Markdown text={a.contenido} />
        </div>
      </article>
      <CTA />
    </>
  )
}
