import Seo from '../components/ui/Seo.jsx'
import PageHeader from '../components/PageHeader.jsx'
import Blog from '../components/Blog.jsx'
import CTA from '../components/CTA.jsx'
import { articulos, blog } from '../content/index.js'

export default function BlogPage() {
  return (
    <>
      <Seo title="Blog y recursos" path="/blog" description="Artículos y guías para entender el desistimiento inmobiliario y tus derechos como comprador de vivienda." />
      <PageHeader eyebrow={blog.etiqueta} title={blog.titulo} />
      {articulos.length ? (
        <Blog showHeadingLink={false} all />
      ) : (
        <p className="container-site py-20 text-muted">Pronto publicaremos artículos.</p>
      )}
      <CTA />
    </>
  )
}
