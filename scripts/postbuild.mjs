/**
 * Se ejecuta después de `vite build` (ver package.json).
 *
 * 1. Crea un index.html propio para cada página (servicios, artículos, Nosotros…),
 *    con su título y descripción, para que Google reciba cada página con código 200
 *    y la información correcta (antes recibía un 404 en las páginas internas).
 * 2. Genera sitemap.xml con todas las páginas.
 * 3. Genera robots.txt apuntando al sitemap.
 *
 * Todo se calcula a partir del contenido editable en src/content (panel /admin).
 */
import { readFileSync, writeFileSync, mkdirSync, readdirSync, existsSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const dist = join(root, 'dist')
const content = join(root, 'src', 'content')
const readJson = (p) => JSON.parse(readFileSync(p, 'utf8'))

const ajustes = readJson(join(content, 'ajustes.json'))
const servicios = readJson(join(content, 'servicios.json'))
const nosotros = readJson(join(content, 'nosotros.json'))
const blog = readJson(join(content, 'blog.json'))
const contacto = readJson(join(content, 'contacto.json'))

const domain = String(ajustes.dominio || '').replace(/\/$/, '')
const siteName = ajustes.nombre
const defaultDesc = ajustes.seoDescripcion

const slugify = (s = '') =>
  String(s).normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')
const esc = (v) => String(v ?? '').replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
const clip = (s, n = 160) => {
  const t = String(s || '').replace(/\s+/g, ' ').trim()
  return t.length > n ? `${t.slice(0, n - 1).trimEnd()}…` : t
}

// ---------- Páginas ----------
const pages = [
  { path: '/', title: `${ajustes.seoTitulo} | ${siteName}`, desc: defaultDesc, priority: '1.0' },
  { path: '/servicios/', title: `Servicios | ${siteName}`, desc: servicios.texto || defaultDesc, priority: '0.9' },
  { path: '/nosotros/', title: `Nosotros | ${siteName}`, desc: nosotros.texto || defaultDesc, priority: '0.7' },
  { path: '/contacto/', title: `Contacto | ${siteName}`, desc: contacto.texto || defaultDesc, priority: '0.7' },
  { path: '/evalua-tu-caso/', title: `Evalúa tu caso | ${siteName}`, desc: contacto.formularioTexto || defaultDesc, priority: '0.8' },
  { path: '/blog/', title: `${blog.titulo || 'Blog'} | ${siteName}`, desc: defaultDesc, priority: '0.6' },
]

for (const s of servicios.servicios || []) {
  const id = slugify(s.id || s.titulo)
  if (id) pages.push({ path: `/servicios/${id}/`, title: `${s.titulo} | ${siteName}`, desc: s.texto, image: s.imagen, priority: '0.9' })
}

const artDir = join(content, 'articulos')
if (existsSync(artDir)) {
  for (const f of readdirSync(artDir).filter((f) => f.endsWith('.json'))) {
    const a = readJson(join(artDir, f))
    if (a.publicado === false) continue
    pages.push({
      path: `/blog/${f.replace(/\.json$/, '')}/`,
      title: `${a.titulo} | ${siteName}`,
      desc: a.resumen,
      image: a.imagen,
      lastmod: String(a.fecha || '').slice(0, 10),
      priority: '0.6',
    })
  }
}

const legal = [
  ['privacidad', '/politica-de-privacidad/'],
  ['tratamiento-de-datos', '/tratamiento-de-datos/'],
  ['terminos', '/terminos-y-condiciones/'],
]
for (const [file, path] of legal) {
  const p = join(content, 'legal', `${file}.json`)
  if (existsSync(p)) pages.push({ path, title: `${readJson(p).titulo} | ${siteName}`, desc: defaultDesc, priority: '0.3' })
}

// ---------- 1. index.html por página ----------
const base = readFileSync(join(dist, 'index.html'), 'utf8')

function htmlFor(page) {
  const url = `${domain}${page.path}`
  const desc = esc(clip(page.desc || defaultDesc))
  const title = esc(page.title)
  let html = base
    .replace(/<title>[\s\S]*?<\/title>/, `<title>${title}</title>`)
    .replace(/<meta name="description" content="[^"]*"\s*\/?>/, `<meta name="description" content="${desc}" />`)
    .replace(/<link rel="canonical" href="[^"]*"\s*\/?>/, `<link rel="canonical" href="${esc(url)}" />`)
    .replace(/<meta property="og:title" content="[^"]*"\s*\/?>/, `<meta property="og:title" content="${title}" />`)
    .replace(/<meta property="og:description" content="[^"]*"\s*\/?>/, `<meta property="og:description" content="${desc}" />`)
    .replace(/<meta property="og:url" content="[^"]*"\s*\/?>/, `<meta property="og:url" content="${esc(url)}" />`)
  if (page.image && !/\.svg$/i.test(page.image)) {
    const img = page.image.startsWith('http') ? page.image : `${domain}${page.image}`
    html = html.replace(/<meta property="og:image" content="[^"]*"\s*\/?>/, `<meta property="og:image" content="${esc(img)}" />`)
  }
  return html
}

for (const page of pages) {
  const out = page.path === '/' ? join(dist, 'index.html') : join(dist, page.path, 'index.html')
  mkdirSync(dirname(out), { recursive: true })
  writeFileSync(out, htmlFor(page))
}

// ---------- 2. sitemap.xml ----------
const today = new Date().toISOString().slice(0, 10)
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${pages
  .map((p) => `  <url><loc>${esc(domain + p.path)}</loc><lastmod>${p.lastmod || today}</lastmod><priority>${p.priority}</priority></url>`)
  .join('\n')}
</urlset>
`
writeFileSync(join(dist, 'sitemap.xml'), sitemap)

// ---------- 3. robots.txt ----------
writeFileSync(join(dist, 'robots.txt'), `User-agent: *\nAllow: /\nDisallow: /admin/\n\nSitemap: ${domain}/sitemap.xml\n`)

console.log(`✓ postbuild: ${pages.length} páginas, sitemap.xml y robots.txt generados para ${domain}`)
