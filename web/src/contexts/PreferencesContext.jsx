import { createContext, useContext, useEffect, useState, useCallback } from 'react'

const STORAGE_KEY = 'a11ylab.preferences'

const DEFAULTS = {
  theme: 'sistema',          // 'claro' | 'escuro' | 'sistema'
  fontScale: 1,              // 0 | 1 | 2 | 3
  altoContraste: false,
  reduzirMovimento: false,
  fonteDislexia: false,
}

const PreferencesContext = createContext(null)

function loadInitial() {
  if (typeof window === 'undefined') return DEFAULTS
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    if (!raw) return DEFAULTS
    const parsed = JSON.parse(raw)
    return { ...DEFAULTS, ...parsed }
  } catch {
    return DEFAULTS
  }
}

function applyToHtml(prefs) {
  const root = document.documentElement
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
  const isDark =
    prefs.theme === 'escuro' || (prefs.theme === 'sistema' && prefersDark)

  root.classList.toggle('dark', isDark)
  root.setAttribute('data-font-scale', String(prefs.fontScale))

  if (prefs.altoContraste) root.setAttribute('data-contrast', 'alto')
  else root.removeAttribute('data-contrast')

  if (prefs.reduzirMovimento) root.setAttribute('data-reduce-motion', 'forcar')
  else root.removeAttribute('data-reduce-motion')

  if (prefs.fonteDislexia) root.setAttribute('data-font', 'dislexia')
  else root.removeAttribute('data-font')
}

export function PreferencesProvider({ children }) {
  const [prefs, setPrefs] = useState(loadInitial)

  // Sincroniza com <html> e localStorage a cada mudança
  useEffect(() => {
    applyToHtml(prefs)
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(prefs))
    } catch {
      // localStorage cheio ou bloqueado, segue em memória
    }
  }, [prefs])

  // Escuta mudanças do OS quando theme === 'sistema'
  useEffect(() => {
    if (prefs.theme !== 'sistema') return
    const mq = window.matchMedia('(prefers-color-scheme: dark)')
    const handler = () => applyToHtml(prefs)
    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  }, [prefs])

  const update = useCallback((patch) => {
    setPrefs((prev) => ({ ...prev, ...patch }))
  }, [])

  const reset = useCallback(() => setPrefs(DEFAULTS), [])

  return (
    <PreferencesContext.Provider value={{ prefs, update, reset }}>
      {children}
    </PreferencesContext.Provider>
  )
}

export function usePreferences() {
  const ctx = useContext(PreferencesContext)
  if (!ctx) throw new Error('usePreferences deve ser usado dentro de PreferencesProvider')
  return ctx
}
