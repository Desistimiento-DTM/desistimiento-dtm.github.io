import { createContext, useCallback, useContext, useMemo, useState } from 'react'

const EvaluationContext = createContext(null)

/** Controla la apertura del modal "Evalúa tu caso" desde cualquier botón del sitio. */
export function EvaluationProvider({ children }) {
  const [open, setOpen] = useState(false)
  const openForm = useCallback(() => setOpen(true), [])
  const closeForm = useCallback(() => setOpen(false), [])
  const value = useMemo(() => ({ open, openForm, closeForm }), [open, openForm, closeForm])
  return <EvaluationContext.Provider value={value}>{children}</EvaluationContext.Provider>
}

export function useEvaluation() {
  const ctx = useContext(EvaluationContext)
  if (!ctx) throw new Error('useEvaluation debe usarse dentro de EvaluationProvider')
  return ctx
}
