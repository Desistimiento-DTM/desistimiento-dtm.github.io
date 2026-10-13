import { metodo } from '../content/index.js'
import { EvaluateButton, Reveal, SectionHeading } from './ui/Primitives.jsx'

export default function Process() {
  const steps = metodo.pasos || []
  const cols = steps.length >= 4 ? 'lg:grid-cols-4' : steps.length === 3 ? 'lg:grid-cols-3' : 'lg:grid-cols-2'
  return (
    <section id="como-funciona" aria-labelledby="metodo-title" className="bg-wine py-20 md:py-28">
      <div className="container-site">
        <Reveal>
          <SectionHeading id="metodo-title" eyebrow={metodo.etiqueta} title={metodo.titulo} light center className="mb-14 md:mb-16" />
        </Reveal>

        <ol className={`relative grid gap-0 md:grid-cols-2 md:gap-10 lg:gap-6 ${cols}`}>
          {/* Línea conectora: vertical en móvil, horizontal en escritorio */}
          <li aria-hidden="true" className="absolute top-5 bottom-5 left-9 w-px bg-terra-light/45 md:hidden lg:block lg:top-9 lg:right-[12%] lg:bottom-auto lg:left-[12%] lg:h-px lg:w-auto" />
          {steps.map((step, i) => (
            <Reveal
              as="li"
              key={step.titulo + i}
              delay={i * 110}
              className="relative grid grid-cols-[72px_1fr] gap-5 pb-8 md:pb-0 lg:flex lg:flex-col lg:items-center lg:text-center"
            >
              <span className="flex h-[72px] w-[72px] items-center justify-center rounded-full bg-terra font-serif text-[26px] text-paper shadow-[0_0_0_8px_var(--color-wine)]">
                {String(i + 1).padStart(2, '0')}
              </span>
              <span className="pt-2 lg:pt-0">
                <span className="block font-serif text-[22px] text-[#FBF4EC]">{step.titulo}</span>
                <span className="mt-2.5 block text-[15px] leading-relaxed text-paper/70">{step.texto}</span>
              </span>
            </Reveal>
          ))}
        </ol>

        {metodo.boton && (
          <div className="mt-12 text-center md:mt-14">
            <EvaluateButton>{metodo.boton}</EvaluateButton>
          </div>
        )}
      </div>
    </section>
  )
}
