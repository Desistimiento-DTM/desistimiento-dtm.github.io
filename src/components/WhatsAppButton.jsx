import { WhatsAppGlyph } from './ui/Icon.jsx'
import { WhatsAppLink } from './ui/Primitives.jsx'

/** Botón flotante de WhatsApp, visible en toda la navegación. */
export default function WhatsAppButton() {
  return (
    <WhatsAppLink
      aria-label="Escríbenos por WhatsApp"
      className="group fixed right-4 bottom-4 z-30 flex h-[60px] w-[60px] items-center justify-center rounded-full bg-whatsapp text-white shadow-[0_14px_30px_-12px_rgba(0,0,0,0.45)] transition hover:scale-105 md:right-6 md:bottom-6"
    >
      <WhatsAppGlyph size={30} />
      <span className="pointer-events-none absolute right-[72px] hidden rounded-full bg-paper px-4 py-2 text-sm font-semibold whitespace-nowrap text-wine-deep opacity-0 shadow-lg transition group-hover:opacity-100 md:block">
        ¿Hablamos?
      </span>
    </WhatsAppLink>
  )
}
