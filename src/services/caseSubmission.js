/**
 * Envío del formulario "Evalúa tu caso".
 *
 * La URL de recepción se define en el panel /admin → Ajustes generales →
 * "URL de recepción del formulario".
 *
 * - FormSubmit (https://formsubmit.co/tu-correo): gratis, acepta archivos adjuntos
 *   (máx. 10 MB en total). Se envía como un formulario normal y FormSubmit devuelve
 *   a la persona a /evalua-tu-caso?enviado=1, donde ve la confirmación.
 * - Cualquier otra URL (Formspree, Make/Zapier, backend propio, CRM): se envía en
 *   segundo plano como multipart/form-data.
 * - Sin URL configurada: modo demostración (no se envía nada).
 */
import { site } from '../config/site.js'

const isFormSubmit = (url) => /formsubmit\.co\//i.test(url) && !/\/ajax\//i.test(url)

/** Crea un formulario oculto con los datos (incluidos los archivos) y lo envía de forma tradicional. */
function nativePost(url, formData) {
  const form = document.createElement('form')
  form.method = 'POST'
  form.action = url
  form.enctype = 'multipart/form-data'
  form.style.display = 'none'

  const files = {}
  for (const [name, value] of formData.entries()) {
    if (value instanceof File) {
      if (value.size > 0) (files[name] ||= []).push(value)
      continue
    }
    const input = document.createElement('input')
    input.type = 'hidden'
    input.name = name
    input.value = value
    form.appendChild(input)
  }

  for (const [name, list] of Object.entries(files)) {
    const dt = new DataTransfer()
    list.forEach((f) => dt.items.add(f))
    const input = document.createElement('input')
    input.type = 'file'
    input.name = name
    input.multiple = true
    input.files = dt.files
    form.appendChild(input)
  }

  document.body.appendChild(form)
  form.submit()
}

export async function submitCase(formData) {
  formData.append('origen', 'web-evalua-tu-caso')
  formData.append('enviadoEn', new Date().toLocaleString('es-CO'))
  const url = String(site.formEndpoint || '').trim()

  if (!url) {
    await new Promise((r) => setTimeout(r, 900))
    if (import.meta.env.DEV) console.info('[Formulario] Modo demo. Datos:', Object.fromEntries(formData))
    return { ok: true, demo: true }
  }

  if (isFormSubmit(url)) {
    const nombre = formData.get('nombre') || ''
    formData.append('_subject', `Nuevo caso desde la web${nombre ? ` — ${nombre}` : ''}`)
    formData.append('_template', 'table')
    formData.append('_captcha', 'false')
    formData.append('_next', `${window.location.origin}/evalua-tu-caso?enviado=1`)
    nativePost(url, formData)
    // La página navega a FormSubmit y luego vuelve a la confirmación.
    return new Promise(() => {})
  }

  const res = await fetch(url, { method: 'POST', body: formData, headers: { Accept: 'application/json' } })
  if (!res.ok) throw new Error(`Error ${res.status} al enviar el formulario`)
  return { ok: true }
}
