import { useEffect, useRef } from 'react'
import { useEvaluation } from '../context/EvaluationContext.jsx'
import CaseForm from './CaseForm.jsx'
import { contacto } from '../content/index.js'
import Icon from './ui/Icon.jsx'

/** Modal accesible con el formulario "Evalúa tu caso" (usa <dialog> nativo). */
export default function CaseFormModal() {
  const { open, closeForm } = useEvaluation()
  const ref = useRef(null)

  useEffect(() => {
    const dlg = ref.current
    if (!dlg) return
    if (open && !dlg.open) {
      dlg.showModal()
      document.body.style.overflow = 'hidden'
    }
    if (!open && dlg.open) {
      dlg.close()
      document.body.style.overflow = ''
    }
  }, [open])

  return (
    <dialog
      ref={ref}
      onClose={closeForm}
      onClick={(e) => e.target === ref.current && closeForm()}
      aria-labelledby="modal-title"
      className="m-0 h-full max-h-none w-full max-w-none bg-transparent p-0 backdrop:bg-wine-deep/70 backdrop:backdrop-blur-sm sm:m-auto sm:h-auto sm:max-h-[92vh] sm:max-w-[820px] sm:rounded-[24px]"
    >
      {open && (
        <div className="min-h-full bg-cream sm:rounded-[24px]">
          <div className="sticky top-0 z-10 flex items-start justify-between gap-4 border-b border-line bg-cream/95 px-5 py-5 backdrop-blur sm:px-8 sm:py-6">
            <div>
              <p className="eyebrow mb-1.5 text-[11px] text-terra">Evaluación de tu caso</p>
              <h2 id="modal-title" className="text-[26px] leading-tight text-wine-deep sm:text-[32px]">
                {contacto.formularioTitulo} <em className="text-terra">{contacto.formularioTituloDestacado}</em>
              </h2>
            </div>
            <button
              type="button"
              onClick={closeForm}
              aria-label="Cerrar formulario"
              className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-sand bg-paper text-wine-2 transition hover:bg-blush"
            >
              <Icon name="close" size={20} strokeWidth={1.8} />
            </button>
          </div>
          <div className="px-4 pt-5 pb-8 sm:px-8 sm:pb-10">
            <p className="mb-5 flex items-start gap-2.5 text-sm leading-relaxed text-muted">
              <Icon name="lock" size={18} className="mt-0.5 shrink-0 text-terra" />
              Tu información se tratará de forma confidencial y conforme a nuestra política de tratamiento de datos personales.
            </p>
            <CaseForm onDone={closeForm} />
          </div>
        </div>
      )}
    </dialog>
  )
}
