import { site } from '../../config/site.js'

/** Metadatos por página (React 19 los ubica automáticamente en <head>). */
export default function Seo({ title, description = site.seoDescription, path = '/', image }) {
  const fullTitle = `${title || site.seoTitle} | ${site.name}`
  // Las páginas internas se publican como carpetas (/servicios/), así que la dirección oficial termina en «/».
  const cleanPath = path === '/' ? '/' : `${path.replace(/\/$/, '')}/`
  const url = `${site.domain}${cleanPath}`
  return (
    <>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      {image && <meta property="og:image" content={image.startsWith('http') ? image : `${site.domain}${image}`} />}
    </>
  )
}
