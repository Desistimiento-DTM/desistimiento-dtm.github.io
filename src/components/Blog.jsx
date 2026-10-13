import { Link } from 'react-router-dom'
import { articulos, blog } from '../content/index.js'
import { Reveal, SectionHeading } from './ui/Primitives.jsx'

export function ArticleCard({ article }) {
  return (
    <article className="card flex h-full flex-col">
      {article.imagen && (
        <div className="h-52 overflow-hidden md:h-56">
          <img src={article.imagen} alt={article.imagenAlt || ''} loading="lazy" className="h-full w-full object-cover" />
        </div>
      )}
      <div className="flex flex-1 flex-col gap-3 px-6 pt-6 pb-5">
        <span className="eyebrow text-[11px] text-terra">{article.categoria}</span>
        <h3 className="text-[23px] leading-tight text-wine-deep">{article.titulo}</h3>
        <p className="flex-1 text-[15px] leading-relaxed text-muted">{article.resumen}</p>
        <Link to={`/blog/${article.slug}`} className="link-more" aria-label={`Leer artículo: ${article.titulo}`}>
          Leer artículo <span aria-hidden="true">→</span>
        </Link>
      </div>
    </article>
  )
}

/** Sección de blog. En el inicio muestra los más recientes; en /blog, todos. */
export default function Blog({ showHeadingLink = true, all = false }) {
  const list = all ? articulos : articulos.slice(0, Number(blog.articulosEnInicio) || 3)
  if (!list.length) return null
  return (
    <section id="blog" aria-labelledby="blog-title" className="py-20 md:py-28">
      <div className="container-site">
        <Reveal className="mb-12 flex flex-wrap items-end justify-between gap-6">
          <SectionHeading id="blog-title" eyebrow={blog.etiqueta} title={blog.titulo} />
          {showHeadingLink && (
            <Link to="/blog" className="link-more">
              Ver todos los artículos <span aria-hidden="true">→</span>
            </Link>
          )}
        </Reveal>
        <div className="grid gap-6 md:grid-cols-3 md:gap-7">
          {list.map((a, i) => (
            <Reveal key={a.slug} delay={(i % 3) * 100}>
              <ArticleCard article={a} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
