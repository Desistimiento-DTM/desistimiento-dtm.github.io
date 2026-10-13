import Seo from '../components/ui/Seo.jsx'
import PageHeader from '../components/PageHeader.jsx'
import CaseForm from '../components/CaseForm.jsx'
import Icon, { WhatsAppGlyph } from '../components/ui/Icon.jsx'
import { WhatsAppLink } from '../components/ui/Primitives.jsx'
import { site } from '../config/site.js'
import { contacto } from '../content/index.js'

export default function ContactPage() {
  return (
    <>
      <Seo title="Contacto" path="/contacto" />
      <PageHeader eyebrow="Contacto" title={`${contacto.titulo} ${contacto.tituloDestacado}`} text={contacto.texto} />
      <section className="py-16 md:py-24">
        <div className="container-site grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-14">
          <aside className="flex flex-col gap-4">
            <WhatsAppLink className="card flex items-center gap-4 p-6">
              <span className="flex h-12 w-12 items-center justify-center rounded-full bg-whatsapp text-white"><WhatsAppGlyph size={24} /></span>
              <span><span className="block font-semibold text-wine-deep">WhatsApp</span><span className="text-sm text-muted">{site.contact.whatsappNumber}</span></span>
            </WhatsAppLink>
            <div className="card flex items-center gap-4 p-6">
              <span className="flex h-12 w-12 items-center justify-center rounded-full bg-blush text-wine-2"><Icon name="mail" size={22} /></span>
              <span><span className="block font-semibold text-wine-deep">Correo electrónico</span><span className="text-sm text-muted">{site.contact.email}</span></span>
            </div>
            <div className="card flex items-center gap-4 p-6">
              <span className="flex h-12 w-12 items-center justify-center rounded-full bg-blush text-wine-2"><Icon name="pin" size={22} /></span>
              <span><span className="block font-semibold text-wine-deep">Ubicación</span><span className="text-sm text-muted">{site.contact.city}</span></span>
            </div>
          </aside>
          <CaseForm />
        </div>
      </section>
    </>
  )
}
