/**
 * Punto único de acceso al contenido del sitio.
 * Los archivos .json de esta carpeta se editan desde el panel /admin
 * (o a mano). No hace falta tocar este archivo para cambiar contenido.
 */
import ajustes from './ajustes.json'
import inicio from './inicio.json'
import servicios from './servicios.json'
import desistimiento from './desistimiento.json'
import nosotros from './nosotros.json'
import metodo from './metodo.json'
import casos from './casos.json'
import testimonios from './testimonios.json'
import blog from './blog.json'
import contacto from './contacto.json'
import equipo from './equipo.json'

export { ajustes, inicio, servicios, desistimiento, nosotros, metodo, casos, testimonios, blog, contacto, equipo }

const slugFromPath = (p) => p.split('/').pop().replace(/\.json$/, '')

/** Artículos publicados, del más reciente al más antiguo. */
export const articulos = Object.entries(import.meta.glob('./articulos/*.json', { eager: true, import: 'default' }))
  .map(([path, a]) => ({ ...a, slug: slugFromPath(path) }))
  .filter((a) => a.publicado !== false)
  .sort((a, b) => String(b.fecha).localeCompare(String(a.fecha)))

/** Textos legales, indexados por nombre de archivo (privacidad, tratamiento-de-datos, terminos). */
export const legal = Object.fromEntries(
  Object.entries(import.meta.glob('./legal/*.json', { eager: true, import: 'default' })).map(([path, d]) => [slugFromPath(path), d]),
)
