# Sitio web — desistimiento inmobiliario

Sitio corporativo con panel de administración.
React 19 + Vite + Tailwind CSS 4 + Decap CMS.

**¿Quieres activar el panel para editar el contenido sin código?** Sigue **[GUIA-PANEL.md](GUIA-PANEL.md)**.

## Ejecutar en el computador

Requisitos: Node.js 20 o superior.

```bash
npm install
npm run dev            # desarrollo en http://localhost:5173
npm run build          # versión de producción en /dist
npm run preview        # revisar la versión de producción
npm run build:preview  # un único HTML autocontenido en /dist-preview (solo vista previa)
```

## Dónde está cada cosa

```
public/
├── admin/             Panel de administración (index.html + config.yml)
├── images/            Ilustraciones provisionales
└── uploads/           Imágenes subidas desde el panel
src/
├── content/           ← TODO el contenido (lo edita el panel)
│   ├── ajustes.json         nombre, logo, WhatsApp, correo, ciudad, SEO
│   ├── inicio.json          portada
│   ├── servicios.json, desistimiento.json, nosotros.json, metodo.json,
│   ├── casos.json, testimonios.json, blog.json, contacto.json
│   ├── articulos/*.json     artículos del blog (uno por archivo)
│   └── legal/*.json         textos legales
├── components/        Header, Hero, Services, DesistimientoSection, About, Process,
│                      Cases, Testimonials, Blog, CTA, Footer, WhatsAppButton,
│                      CaseForm, CaseFormModal, PageHeader, ui/
├── pages/             Home, Services, About, Contact, Blog, Article, Evaluate, LegalPage, NotFound
├── config/site.js     datos derivados de ajustes.json + enlace de WhatsApp
└── services/caseSubmission.js   envío del formulario
```

## Rutas

`/` · `/servicios` · `/nosotros` · `/contacto` · `/blog` · `/blog/:articulo` · `/evalua-tu-caso` ·
`/politica-de-privacidad` · `/tratamiento-de-datos` · `/terminos-y-condiciones` · `/admin/`

## Formulario "Evalúa tu caso"

En el panel: **Ajustes generales → URL de recepción del formulario**. El formulario envía
`multipart/form-data` (campos + archivos adjuntos) a esa URL: Formspree, Make/Zapier → CRM,
un backend propio o la API de su aplicación de gestión. Sin URL, funciona en modo demostración.

## Publicación

Netlify, conectado al repositorio de GitHub (`netlify.toml` ya incluido). Cada cambio guardado
en el panel vuelve a publicar el sitio automáticamente.
