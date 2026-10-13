import { useId, useState } from 'react'
import { Link } from 'react-router-dom'
import { site } from '../config/site.js'
import { contacto } from '../content/index.js'
import { submitCase } from '../services/caseSubmission.js'
import Icon from './ui/Icon.jsx'

const housingTypes = ['VIS', 'No VIS', 'Otro']
const goals = ['Desistir de la compra', 'Reclamar por incumplimiento', 'Revisar mi contrato', 'Otro']

function Field({ label, required, children, htmlFor, hint }) {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={htmlFor} className="text-[13px] font-semibold text-[#3A2A2C]">
        {label} {required && <span className="text-terra" aria-hidden="true">*</span>}
      </label>
      {children}
      {hint && <span className="text-xs text-subtle">{hint}</span>}
    </div>
  )
}

function Chips({ name, options, required, legend }) {
  return (
    <fieldset>
      <legend className="mb-2.5 text-[13px] font-semibold text-[#3A2A2C]">
        {legend} {required && <span className="text-terra" aria-hidden="true">*</span>}
      </legend>
      <div className="flex flex-wrap gap-2.5">
        {options.map((opt, i) => (
          <label key={opt} className="relative inline-flex cursor-pointer">
            <input type="radio" name={name} value={opt} required={required && i === 0} className="peer absolute inset-0 cursor-pointer opacity-0" />
            <span className="inline-flex min-h-[46px] items-center rounded-full border border-[#dccab8] bg-[#fffdf9] px-4.5 text-sm transition peer-checked:border-wine-2 peer-checked:bg-wine-2 peer-checked:text-paper peer-focus-visible:ring-4 peer-focus-visible:ring-terra/25">
              {opt}
            </span>
          </label>
        ))}
      </div>
    </fieldset>
  )
}

function Block({ n, title, children }) {
  return (
    <div className="rounded-[20px] border border-line bg-paper p-5 sm:p-8">
      <p className="mb-5 flex items-center gap-3 text-[13px] font-bold tracking-[0.16em] text-wine-2 uppercase">
        <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-blush text-xs tracking-normal">{n}</span>
        {title}
      </p>
      <div className="flex flex-col gap-4.5">{children}</div>
    </div>
  )
}

/**
 * Formulario "Evalúa tu caso". Los `name` de cada campo son las claves que
 * recibirá el backend/CRM (ver src/services/caseSubmission.js).
 */
export default function CaseForm({ onDone }) {
  const uid = useId()
  const id = (s) => `${uid}-${s}`
  const [status, setStatus] = useState('idle') // idle | sending | sent | error
  const [files, setFiles] = useState([])

  async function handleSubmit(e) {
    e.preventDefault()
    setStatus('sending')
    try {
      await submitCase(new FormData(e.currentTarget))
      setStatus('sent')
    } catch {
      setStatus('error')
    }
  }

  if (status === 'sent') {
    return (
      <div className="rounded-[22px] border border-line bg-paper px-6 py-14 text-center sm:px-11" role="status">
        <span className="inline-flex h-[72px] w-[72px] items-center justify-center rounded-full bg-blush text-terra">
          <Icon name="tick" size={34} strokeWidth={1.8} />
        </span>
        <h2 className="mt-6 text-[32px] text-wine-deep sm:text-4xl">Recibimos tu caso</h2>
        <p className="mx-auto mt-4 max-w-[460px] leading-relaxed text-muted">
          {contacto.mensajeConfirmacion}
        </p>
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          {onDone ? (
            <button type="button" className="btn btn-primary" onClick={onDone}>Volver al sitio</button>
          ) : (
            <Link to="/" className="btn btn-primary">Volver al inicio</Link>
          )}
          <button type="button" className="btn btn-outline" onClick={() => { setFiles([]); setStatus('idle') }}>
            Enviar otro caso
          </button>
        </div>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5" noValidate={false}>
      <Block n="1" title="Datos personales">
        <Field label="Nombre completo" required htmlFor={id('nombre')}>
          <input id={id('nombre')} name="nombre" type="text" autoComplete="name" required className="field-input" placeholder="Tu nombre y apellidos" />
        </Field>
        <div className="grid gap-4.5 sm:grid-cols-2">
          <Field label="WhatsApp" required htmlFor={id('wa')}>
            <input id={id('wa')} name="whatsapp" type="tel" autoComplete="tel" required className="field-input" placeholder="+57 300 000 0000" />
          </Field>
          <Field label="Correo electrónico" required htmlFor={id('email')}>
            <input id={id('email')} name="email" type="email" autoComplete="email" required className="field-input" placeholder="tucorreo@ejemplo.com" />
          </Field>
        </div>
      </Block>

      <Block n="2" title="Información del proyecto">
        <div className="grid gap-4.5 sm:grid-cols-2">
          <Field label="Nombre del proyecto" htmlFor={id('proyecto')}>
            <input id={id('proyecto')} name="proyecto" type="text" className="field-input" />
          </Field>
          <Field label="Constructora / inmobiliaria" htmlFor={id('constructora')}>
            <input id={id('constructora')} name="constructora" type="text" className="field-input" />
          </Field>
        </div>
        <Field label="Ciudad" htmlFor={id('ciudad')}>
          <input id={id('ciudad')} name="ciudad" type="text" autoComplete="address-level2" className="field-input" placeholder="Ej. Bogotá" />
        </Field>
        <Chips name="tipoVivienda" legend="Tipo de vivienda" options={housingTypes} />
      </Block>

      <Block n="3" title="Información del caso">
        <Chips name="objetivo" legend="¿Qué deseas hacer?" options={goals} required />
        <div className="grid gap-4.5 sm:grid-cols-2">
          <Field label="Valor aproximado pagado (COP)" htmlFor={id('valor')}>
            <input id={id('valor')} name="valorPagado" type="text" inputMode="numeric" className="field-input" placeholder="$ 0" />
          </Field>
          <Field label="Fecha de firma del contrato" htmlFor={id('fecha')}>
            <input id={id('fecha')} name="fechaFirma" type="date" className="field-input" />
          </Field>
        </div>
        <Field label="Descripción del caso" required htmlFor={id('desc')}>
          <textarea id={id('desc')} name="descripcion" required rows={5} className="field-input min-h-32 resize-y" placeholder="Cuéntanos brevemente qué ha ocurrido con tu compra." />
        </Field>
        <Field label="Adjuntar documentos" htmlFor={id('docs')}>
          <div className="relative flex items-center gap-4 rounded-[14px] border-[1.5px] border-dashed border-[#D2B9A2] bg-[#FBF4EC] p-5 transition focus-within:border-terra hover:border-terra">
            <Icon name="upload" size={28} className="shrink-0 text-terra" />
            <span className="flex flex-col gap-0.5">
              <span className="text-sm font-semibold text-wine-deep">
                {files.length ? `${files.length} archivo(s) seleccionado(s)` : 'Arrastra o selecciona tus archivos'}
              </span>
              <span className="text-[13px] text-subtle">
                {files.length ? files.map((f) => f.name).join(', ') : 'Promesa de compraventa, recibos de pago, comunicaciones. PDF, JPG o PNG.'}
              </span>
            </span>
            <input
              id={id('docs')}
              name="documentos"
              type="file"
              multiple
              accept=".pdf,.jpg,.jpeg,.png"
              onChange={(e) => setFiles(Array.from(e.target.files || []))}
              className="absolute inset-0 cursor-pointer opacity-0"
            />
          </div>
        </Field>
      </Block>

      <label className="flex cursor-pointer items-start gap-3 px-1 text-sm leading-relaxed text-muted">
        <input type="checkbox" name="aceptaTratamientoDatos" value="si" required className="mt-0.5 h-5 w-5 shrink-0 accent-terra" />
        <span>
          Acepto el tratamiento de mis datos personales de acuerdo con la{' '}
          <Link to={site.legal.privacyUrl} className="font-semibold text-terra underline-offset-2 hover:underline" target="_blank">
            política de privacidad
          </Link>
          .
        </span>
      </label>

      {status === 'error' && (
        <p role="alert" className="rounded-xl bg-[#F8E1D6] px-4 py-3 text-sm text-terra-dark">
          No pudimos enviar tu caso. Inténtalo de nuevo o escríbenos por WhatsApp.
        </p>
      )}

      <div className="flex flex-col-reverse gap-4 sm:flex-row sm:items-center sm:justify-between">
        <span className="text-[13px] text-subtle">* Campos obligatorios</span>
        <button type="submit" className="btn btn-primary w-full sm:w-auto" disabled={status === 'sending'}>
          {status === 'sending' ? 'Enviando…' : <>Enviar mi caso <span aria-hidden="true">→</span></>}
        </button>
      </div>
    </form>
  )
}
