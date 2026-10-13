import { Link } from 'react-router-dom'
import { nosotros } from '../content/index.js'
import Icon from './ui/Icon.jsx'
import { Reveal } from './ui/Primitives.jsx'

export default function About({ showButton = true }) {
  return (
    <section id="nosotros" aria-labelledby="nosotros-title" className="grid bg-cream-2 lg:grid-cols-2">
      <div className="relative min-h-[320px] overflow-hidden sm:min-h-[420px] lg:min-h-[600px]">
        <img src={nosotros.imagen} alt={nosotros.imagenAlt || ''} loading="lazy" className="absolute inset-0 h-full w-full object-cover" />
      </div>
      <div className="flex items-center px-5 py-16 md:px-14 md:py-24">
        <Reveal className="max-w-[540px]">
          <p className="eyebrow mb-3.5 text-terra">{nosotros.etiqueta}</p>
          <h2 id="nosotros-title" className="text-[34px] leading-[1.1] text-wine-deep md:text-[46px]">{nosotros.titulo}</h2>
          <p className="mt-5 text-[17px] leading-[1.7] whitespace-pre-line text-muted">{nosotros.texto}</p>
          <ul className="mt-9 flex flex-col gap-5">
            {(nosotros.valores || []).map((v, i) => (
              <li key={v.titulo + i} className="flex items-start gap-4">
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-[14px] bg-blush text-wine-2">
                  <Icon name={v.icono || 'shield'} size={22} />
                </span>
                <span>
                  <span className="eyebrow block text-wine-deep">{v.titulo}</span>
                  <span className="mt-1.5 block text-[15px] text-muted">{v.texto}</span>
                </span>
              </li>
            ))}
          </ul>
          {showButton && (
            <Link to="/nosotros" className="btn btn-wine mt-10">
              {nosotros.boton} <span aria-hidden="true">→</span>
            </Link>
          )}
        </Reveal>
      </div>
    </section>
  )
}
