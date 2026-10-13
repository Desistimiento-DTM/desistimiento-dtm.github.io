import { useReveal } from '../../hooks/useReveal.js'
import { useEvaluation } from '../../context/EvaluationContext.jsx'
import { whatsappUrl } from '../../config/site.js'

/** Envoltorio que aparece con un fade sutil al hacer scroll. */
export function Reveal({ as: Tag = 'div', className = '', delay = 0, children, ...rest }) {
  const ref = useReveal()
  return (
    <Tag ref={ref} className={`reveal ${className}`} style={delay ? { transitionDelay: `${delay}ms` } : undefined} {...rest}>
      {children}
    </Tag>
  )
}

/** Encabezado de sección: texto pequeño + título + texto opcional. */
export function SectionHeading({ eyebrow, title, text, id, light = false, center = false, className = '' }) {
  return (
    <div className={`${center ? 'mx-auto text-center' : ''} max-w-2xl ${className}`}>
      <p className={`eyebrow mb-3.5 ${light ? 'text-terra-light' : 'text-terra'}`}>{eyebrow}</p>
      <h2 id={id} className={`text-[34px] leading-[1.1] md:text-[46px] ${light ? 'text-[#FBF4EC]' : 'text-wine-deep'}`}>
        {title}
      </h2>
      {text && <p className={`mt-4 text-[17px] leading-relaxed ${light ? 'text-paper/80' : 'text-muted'}`}>{text}</p>}
    </div>
  )
}

/** Botón que abre el formulario "Evalúa tu caso". */
export function EvaluateButton({ children = 'Evaluar mi caso', variant = 'primary', className = '' }) {
  const { openForm } = useEvaluation()
  return (
    <button type="button" onClick={openForm} className={`btn btn-${variant} ${className}`}>
      {children} <span aria-hidden="true">→</span>
    </button>
  )
}

/** Enlace a WhatsApp con el mensaje predefinido. */
export function WhatsAppLink({ children, className = '', ...rest }) {
  return (
    <a href={whatsappUrl()} target="_blank" rel="noopener noreferrer" className={className} {...rest}>
      {children}
    </a>
  )
}
