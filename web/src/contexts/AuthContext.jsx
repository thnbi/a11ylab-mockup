import { createContext, useContext, useEffect, useState, useCallback, useMemo } from 'react'

/* ============================================================
   Autenticação simulada, sem validação real, apenas persiste
   o usuário corrente em localStorage. Senha é guardada como
   está (texto claro) porque isto é um mockup educacional, não
   um sistema de produção.

   Shape:
     {
       users: [{ nome, email, senha }],
       currentUserEmail: 'foo@bar.com' | null
     }
   ============================================================ */

const STORAGE_KEY = 'a11ylab.auth'
const SCHEMA_VERSION = 1

const INITIAL_STATE = {
  version: SCHEMA_VERSION,
  users: [],
  currentUserEmail: null,
}

const AuthContext = createContext(null)

function loadInitial() {
  if (typeof window === 'undefined') return INITIAL_STATE
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    if (!raw) return INITIAL_STATE
    const parsed = JSON.parse(raw)
    if (parsed.version !== SCHEMA_VERSION) return INITIAL_STATE
    return parsed
  } catch {
    return INITIAL_STATE
  }
}

export function AuthProvider({ children }) {
  const [state, setState] = useState(loadInitial)

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
    } catch {
      // ignora, segue em memória
    }
  }, [state])

  const user = useMemo(
    () =>
      state.currentUserEmail
        ? state.users.find((u) => u.email === state.currentUserEmail) ?? null
        : null,
    [state]
  )

  const signup = useCallback(({ nome, email, senha }) => {
    const emailNorm = email.trim().toLowerCase()
    const result = { ok: false, error: null }
    setState((prev) => {
      if (prev.users.some((u) => u.email === emailNorm)) {
        result.error = 'Já existe uma conta com este e-mail.'
        return prev
      }
      result.ok = true
      return {
        ...prev,
        users: [...prev.users, { nome: nome.trim(), email: emailNorm, senha }],
        currentUserEmail: emailNorm,
      }
    })
    return result
  }, [])

  const login = useCallback((email /* , senha */) => {
    const emailNorm = email.trim().toLowerCase()
    const result = { ok: false, error: null }
    setState((prev) => {
      const found = prev.users.find((u) => u.email === emailNorm)
      if (!found) {
        result.error = 'Não encontramos uma conta com este e-mail. Crie uma!'
        return prev
      }
      // Senha intencionalmente ignorada, mockup educacional.
      result.ok = true
      return { ...prev, currentUserEmail: emailNorm }
    })
    return result
  }, [])

  const logout = useCallback(() => {
    setState((prev) => ({ ...prev, currentUserEmail: null }))
  }, [])

  const value = { user, signup, login, logout }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth deve ser usado dentro de AuthProvider')
  return ctx
}
