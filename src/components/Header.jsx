import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { navItems, site } from '../config/site.js'
import Icon, { Logo, WhatsAppGlyph } from './ui/Icon.jsx'
import { WhatsAppLink } from './ui/Primitives.jsx'
import { useEvaluation } from '../context/EvaluationContext.jsx'

export default function Header() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { pathname, hash } = useLocation()
  const { openForm } = useEvaluation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Cierra el menú móvil al navegar y bloquea el scroll mientras está abierto.
  useEffect(() => setOpen(false), [pathname, hash])
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    const onKey = (e) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  const current = pathname === '/' ? `/${hash}` || '/' : pathname
  const isActive = (to) => (to === '/' ? current === '/' : current === to)

  return (
    <header
      className={`sticky top-[env(safe-area-inset-top,0px)] z-40 border-b transition-colors duration-300 ${
        scrolled ? 'border-line bg-cream/92 backdrop-blur-md' : 'border-transparent bg-cream'
      }`}
    >
      <div className="container-site flex h-[76px] items-center justify-between gap-6 lg:h-[84px]">
        <Link to="/" className="flex items-center gap-3.5 text-wine-deep no-underline" aria-label={`${site.name} — inicio`}>
          <Logo size={42} />
          <span className="flex flex-col leading-tight">
            <span className="font-serif text-[17px] font-medium sm:text-[19px]">{site.name}</span>
            <span className="eyebrow mt-1 text-[9.5px] tracking-[0.24em] text-subtle">{site.tagline}</span>
          </span>
        </Link>

        <nav aria-label="Principal" className="hidden items-center gap-7 xl:flex">
          {navItems.map((item) => (
            <Link
              key={item.label}
              to={item.to}
              className={`border-b-[1.5px] py-2 text-sm font-medium transition-colors hover:border-terra hover:text-terra ${
                isActive(item.to) ? 'border-terra text-terra' : 'border-transparent text-[#3A2A2C]'
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <WhatsAppLink
            aria-label="Escríbenos por WhatsApp"
            className="hidden h-[46px] w-[46px] items-center justify-center rounded-full border border-sand text-whatsapp transition hover:bg-paper sm:inline-flex"
          >
            <WhatsAppGlyph size={20} />
          </WhatsAppLink>
          <button type="button" onClick={openForm} className="btn btn-wine hidden min-h-12 px-5 text-sm sm:inline-flex">
            Evalúa tu caso <span aria-hidden="true">→</span>
          </button>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="menu-movil"
            aria-label={open ? 'Cerrar menú' : 'Abrir menú'}
            className="inline-flex h-12 w-12 items-center justify-center rounded-xl border border-sand bg-paper text-wine-2 xl:hidden"
          >
            <Icon name={open ? 'close' : 'menu'} size={22} strokeWidth={1.8} />
          </button>
        </div>
      </div>

      {/* Menú móvil */}
      <div
        id="menu-movil"
        className={`fixed inset-x-0 top-[76px] bottom-0 z-40 overflow-y-auto bg-paper transition duration-300 lg:top-[84px] xl:hidden ${
          open ? 'visible opacity-100' : 'invisible -translate-y-2 opacity-0'
        }`}
      >
        <nav aria-label="Menú móvil" className="container-site flex flex-col pt-3 pb-10">
          {navItems.map((item) => (
            <Link
              key={item.label}
              to={item.to}
              className="flex min-h-14 items-center justify-between border-b border-[#EFE3D6] font-serif text-[22px] text-wine-deep"
            >
              {item.label}
              <Icon name="right" size={18} className="text-terra" />
            </Link>
          ))}
          <div className="mt-8 flex flex-col gap-3">
            <button type="button" onClick={() => { setOpen(false); openForm() }} className="btn btn-primary w-full">
              Evalúa tu caso <span aria-hidden="true">→</span>
            </button>
            <WhatsAppLink className="btn btn-outline w-full">
              <WhatsAppGlyph size={18} /> Habla con un asesor
            </WhatsAppLink>
          </div>
        </nav>
      </div>
    </header>
  )
}
