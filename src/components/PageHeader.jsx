/** Cabecera de páginas internas (Servicios, Nosotros, Blog, Contacto…). */
export default function PageHeader({ eyebrow, title, text }) {
  return (
    <section className="bg-wine">
      <div className="container-site py-16 md:py-24">
        <p className="eyebrow mb-4 animate-fade-up text-terra-light">{eyebrow}</p>
        <h1 className="max-w-3xl animate-fade-up text-[40px] leading-[1.06] text-[#FBF4EC] md:text-[58px]">{title}</h1>
        {text && <p className="mt-5 max-w-2xl animate-fade-up text-[17px] leading-relaxed text-paper/80 [animation-delay:150ms]">{text}</p>}
      </div>
    </section>
  )
}
