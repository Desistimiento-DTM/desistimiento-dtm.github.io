import { desistimiento as d } from '../content/index.js'
import Icon from './ui/Icon.jsx'
import { EvaluateButton, Reveal } from './ui/Primitives.jsx'

export default function DesistimientoSection() {
  return (
    <section id="desistimiento" aria-labelledby="desist-title" className="relative overflow-hidden bg-wine-deep py-20 md:py-28">
      {d.imagenFondo && <img src={d.imagenFondo} alt="" aria-hidden="true" loading="lazy" className="absolute inset-0 h-full w-full object-cover" />}
      <div aria-hidden="true" className="absolute inset-0 bg-[linear-gradient(90deg,rgba(58,15,24,0.96)_0%,rgba(58,15,24,0.9)_45%,rgba(58,15,24,0.55)_100%)]" />

      <div className="container-site relative grid items-center gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:gap-14">
        <Reveal>
          <p className="eyebrow mb-4 text-terra-light">{d.etiqueta}</p>
          <h2 id="desist-title" className="max-w-[620px] text-[36px] leading-[1.08] text-[#FBF4EC] md:text-[54px]">
            {d.titulo} {d.tituloDestacado && <em className="text-terra-light">{d.tituloDestacado}</em>}
          </h2>
          <p className="mt-6 max-w-[560px] text-[17px] leading-[1.7] text-paper/80">{d.texto}</p>
          <div className="mt-9">
            <EvaluateButton>{d.boton}</EvaluateButton>
          </div>
        </Reveal>

        <Reveal delay={150} className="rounded-[20px] bg-paper/[0.97] p-7 shadow-[0_30px_60px_-30px_rgba(0,0,0,0.6)] md:p-8">
          <p className="eyebrow mb-1.5 text-[11px] text-terra">{d.tarjetaEtiqueta}</p>
          <p className="mb-4 font-serif text-2xl text-wine-deep">{d.tarjetaTitulo}</p>
          <ul>
            {(d.lista || []).map((item, i) => (
              <li key={item + i} className="flex items-center gap-3.5 border-t border-[#EFE3D6] py-3 text-[15px]">
                <Icon name="check" size={22} strokeWidth={1.7} className="shrink-0 text-terra" />
                {item}
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  )
}
