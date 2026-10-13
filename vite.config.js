import { readFileSync } from 'node:fs'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { viteSingleFile } from 'vite-plugin-singlefile'

// Inserta los datos de src/content/ajustes.json (editables en /admin) en index.html:
// título, descripción, Open Graph y schema para buscadores.
function siteSettingsInHtml() {
  const esc = (v) => String(v ?? '').replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;')
  return {
    name: 'site-settings-in-html',
    transformIndexHtml(html) {
      const a = JSON.parse(readFileSync(new URL('./src/content/ajustes.json', import.meta.url), 'utf8'))
      const map = {
        SITE_NAME: a.nombre,
        SEO_TITLE: a.seoTitulo,
        SEO_DESCRIPTION: a.seoDescripcion,
        SITE_DESCRIPTION: a.descripcionCorta,
        SITE_DOMAIN: String(a.dominio || '').replace(/\/$/, ''),
        SITE_CITY: String(a.ciudad || '').split(',')[0],
      }
      return html.replace(/%([A-Z_]+)%/g, (m, k) => (k in map ? esc(map[k]) : m))
    },
  }
}

// `npm run build`         → versión normal para hosting (carpeta dist/)
// `npm run build:preview` → un único HTML autocontenido (carpeta dist-preview/), útil para vistas previas
export default defineConfig(({ mode }) => {
  const single = mode === 'preview-single'
  return {
    plugins: [react(), tailwindcss(), siteSettingsInHtml(), ...(single ? [viteSingleFile()] : [])],
    base: single ? './' : '/',
    build: single ? { outDir: 'dist-preview', assetsInlineLimit: 100_000_000 } : {},
  }
})
