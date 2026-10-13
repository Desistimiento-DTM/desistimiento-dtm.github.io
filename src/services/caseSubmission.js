/**
 * Envío del formulario "Evalúa tu caso".
 *
 * La URL de recepción se define en el panel /admin → Ajustes generales →
 * "URL de recepción del formulario" (o en la variable VITE_FORM_ENDPOINT).
 * Se envía como multipart/form-data (incluye los archivos adjuntos), compatible
 * con Formspree, Make/Zapier, un backend propio o un CRM.
 * Sin URL configurada, funciona en modo demostración.
 */
import { site } from '../config/site.js'

export async function submitCase(formData) {
  formData.append('origen', 'web-evalua-tu-caso')
  formData.append('enviadoEn', new Date().toISOString())

  if (!site.formEndpoint) {
    await new Promise((r) => setTimeout(r, 900))
    if (import.meta.env.DEV) console.info('[Formulario] Modo demo. Datos:', Object.fromEntries(formData))
    return { ok: true, demo: true }
  }

  const res = await fetch(site.formEndpoint, {
    method: 'POST',
    body: formData,
    headers: { Accept: 'application/json' },
  })
  if (!res.ok) throw new Error(`Error ${res.status} al enviar el formulario`)
  return { ok: true }
}
