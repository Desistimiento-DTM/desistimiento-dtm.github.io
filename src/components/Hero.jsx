import { inicio } from '../content/index.js'
import Icon from './ui/Icon.jsx'
import { EvaluateButton, WhatsAppLink } from './ui/Primitives.jsx'

export default function Hero() {
  return (
    <section id="inicio" aria-labelledby="hero-title" className="grid bg-wine lg:min-h-[min(88vh,820px)] lg:grid-cols-[45fr_55fr]">
      {/* Texto */}
      <div className="flex items-center justify-end px-5 pt-14 pb-12 md:px-8 lg:py-20 lg:pr-14">
        <div className="w-full max-w-[560px]">
          <p className="eyebrow mb-5 animate-fade-up text-terra-light">{inicio.etiqueta}</p>
          <h1 id="hero-title" className="animate-fade-up text-[42px] leading-[1.04] text-[#FBF4EC] sm:text-[54px] xl:text-[66px]">
            {inicio.titulo} {inicio.tituloDestacado && <em className="text-terra-light">{inicio.tituloDestacado}</em>}
          </h1>
          <p className="mt-6 max-w-[500px] animate-fade-up text-[17px] leading-relaxed text-paper/80 [animation-delay:150ms] md:text-lg">
            {inicio.subtitulo}
          </p>
          <div className="mt-9 flex animate-fade-up flex-col gap-3.5 [animation-delay:150ms] sm:flex-row sm:flex-wrap">
            <EvaluateButton>{inicio.botonPrincipal}</EvaluateButton>
            <WhatsAppLink className="btn btn-outline-light">{inicio.botonSecundario}</WhatsAppLink>
          </div>
          {inicio.beneficios?.length > 0 && (
            <ul className="mt-11 flex animate-fade-up flex-col gap-3.5 border-t border-paper/15 pt-6 text-sm text-paper/90 [animation-delay:300ms] md:flex-row md:items-center md:gap-5">
              {inicio.beneficios.map((b, i) => (
                <li key={b + i} className="flex items-center gap-2.5">
                  {i > 0 && <span aria-hidden="true" className="mr-2.5 hidden h-7 w-px bg-paper/20 md:block" />}
                  <Icon name="check" size={22} className="shrink-0 text-terra-light" />
                  {b}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      {/* Imagen */}
      <div className="relative min-h-[360px] overflow-hidden sm:min-h-[460px]">
        <img
          src={inicio.imagen}
          alt={inicio.imagenAlt}
          className="absolute inset-0 h-full w-full object-cover"
          fetchPriority="high"
        />
        <div aria-hidden="true" className="absolute inset-y-0 left-0 hidden w-44 bg-gradient-to-r from-wine via-wine/40 to-transparent lg:block" />
        {inicio.tarjetaTitulo && (
          <div className="absolute right-4 bottom-4 left-4 flex max-w-[340px] animate-fade-up items-center gap-3.5 rounded-2xl bg-paper/95 p-4 shadow-[0_20px_40px_-24px_rgba(58,15,24,0.6)] [animation-delay:450ms] sm:left-auto sm:right-8 sm:bottom-8 sm:p-5">
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blush text-wine-2">
              <Icon name="document" size={22} />
            </span>
            <span>
              <span className="block text-sm font-bold text-wine-deep">{inicio.tarjetaTitulo}</span>
              <span className="block text-[13px] text-muted">{inicio.tarjetaTexto}</span>
            </span>
          </div>
        )}
      </div>
    </section>
  )
}
