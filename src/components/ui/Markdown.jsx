import { marked } from 'marked'

marked.setOptions({ gfm: true, breaks: true })

/** Muestra texto con formato (negritas, listas, subtítulos) escrito en el panel. */
export default function Markdown({ text = '', className = '' }) {
  return <div className={`prose-site ${className}`} dangerouslySetInnerHTML={{ __html: marked.parse(String(text)) }} />
}
