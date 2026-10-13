/**
 * Configuración derivada de src/content/ajustes.json (editable desde /admin).
 */
import { ajustes } from '../content/index.js'

export const site = {
  name: ajustes.nombre,
  tagline: ajustes.lema,
  description: ajustes.descripcionCorta,
  domain: String(ajustes.dominio || '').replace(/\/$/, ''),
  logo: ajustes.logo,
  seoTitle: ajustes.seoTitulo,
  seoDescription: ajustes.seoDescripcion,
  contact: {
    whatsappNumber: ajustes.whatsapp,
    whatsappMessage: ajustes.mensajeWhatsapp,
    email: ajustes.correo,
    city: ajustes.ciudad,
  },
  formEndpoint: ajustes.urlFormulario || import.meta.env.VITE_FORM_ENDPOINT || '',
  legal: {
    privacyUrl: '/politica-de-privacidad',
    dataTreatmentUrl: '/tratamiento-de-datos',
    termsUrl: '/terminos-y-condiciones',
  },
}

/** Enlace de WhatsApp. Si el número aún es un placeholder, abre WhatsApp sin destinatario. */
export function whatsappUrl(message = site.contact.whatsappMessage) {
  const digits = String(site.contact.whatsappNumber).replace(/\D/g, '')
  const text = encodeURIComponent(message || '')
  return digits.length >= 8 ? `https://wa.me/${digits}?text=${text}` : `https://wa.me/?text=${text}`
}

export const navItems = [
  { label: 'Inicio', to: '/' },
  { label: 'Servicios', to: '/#servicios' },
  { label: 'Cómo funciona', to: '/#como-funciona' },
  { label: 'Nosotros', to: '/#nosotros' },
  { label: 'Casos', to: '/#casos' },
  { label: 'Blog', to: '/#blog' },
  { label: 'Contacto', to: '/#contacto' },
]
