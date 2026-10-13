import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

/** Gestiona el scroll al cambiar de ruta y los enlaces a secciones (/#servicios). */
export default function ScrollManager() {
  const { pathname, hash } = useLocation()
  useEffect(() => {
    if (hash) {
      const id = decodeURIComponent(hash.slice(1))
      // Espera a que la página pinte antes de desplazarse.
      const t = setTimeout(() => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 60)
      return () => clearTimeout(t)
    }
    window.scrollTo({ top: 0, behavior: 'instant' })
  }, [pathname, hash])
  return null
}
