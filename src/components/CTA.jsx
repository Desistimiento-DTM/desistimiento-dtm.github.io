import { contacto } from '../content/index.js'
import { site } from '../config/site.js'
import Icon from './ui/Icon.jsx'
import { EvaluateButton, Reveal, WhatsAppLink } from './ui/Primitives.jsx'

export default function CTA() {
  const items = [
    { icon: 'chat', label: `WhatsApp: ${site.contact.whatsappNumber}` },
    { icon: 'mail', label: site.contact.email },
    { icon: 'pin', label: site.contact.city },
  ].filter((i) => i.label)
  return (
    <section id="contacto" aria-labelledby="cta-title" className="relative overflow-hidden bg-wine-2">
      <div aria-hidden="true" className="absolute -top-32 -right-32 h-[420px] w-[420px] rounded-full border border-terra-light/25" />
      <div aria-hidden="true" className="absolute -top-10 -right-10 h-[260px] w-[260px] rounded-full border border-terra-light/20" />
      <Reveal className="container-site relative py-20 text-center md:py-28">
        <h2 id="cta-title" className="mx-auto max-w-3xl text-[40px] leading-[1.08] text-[#FBF4EC] md:text-[58px]">
          {contacto.titulo} {contacto.tituloDestacado && <em className="text-terra-light">{contacto.tituloDestacado}</em>}
        </h2>
        <p className="mx-auto mt-5 max-w-[600px] text-[17px] leading-relaxed text-paper/80 md:text-lg">{contacto.texto}</p>
        <div className="mt-10 flex flex-col justify-center gap-3.5 sm:flex-row">
          <EvaluateButton>{contacto.botonPrincipal}</EvaluateButton>
          <WhatsAppLink className="btn btn-outline-light">{contacto.botonWhatsapp}</WhatsAppLink>
        </div>
        <ul className="mx-auto mt-14 flex max-w-[860px] flex-col items-center gap-4 border-t border-paper/15 pt-7 text-[15px] text-paper/90 md:flex-row md:flex-wrap md:justify-center md:gap-x-11">
          {items.map((it) => (
            <li key={it.icon} className="flex items-center gap-2.5">
              <Icon name={it.icon} size={20} className="text-terra-light" />
              {it.label}
            </li>
          ))}
        </ul>
      </Reveal>
    </section>
  )
}
