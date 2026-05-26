import { createContext, useContext, useEffect, useState, useCallback } from 'react'
import { getTrilha, findTrilhaIdByTopicoId } from '../data/helpers'

/* ============================================================
   Estado de progresso do usuário (XP, desafios concluídos,
   perguntas acertadas). Persistido em localStorage.

   O usuário começa do zero, nenhum desafio concluído, 0 XP.
   Avança somente jogando.
   ============================================================ */

const STORAGE_KEY = 'a11ylab.progress'
const SCHEMA_VERSION = 2 // bumped, descarta progresso antigo (que tinha desafios pré-concluídos)

const INITIAL_STATE = {
  version: SCHEMA_VERSION,
  xpGanho: 0,
  trilhas: {},
}

const ProgressContext = createContext(null)

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

export function ProgressProvider({ children }) {
  const [state, setState] = useState(loadInitial)

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
    } catch {
      // ignora, segue em memória
    }
  }, [state])

  const xp = state.xpGanho

  /* ---------- queries ---------- */

  const getDesafiosConcluidos = useCallback(
    (trilhaId) => state.trilhas[trilhaId]?.desafiosConcluidos ?? [],
    [state.trilhas]
  )

  const getPerguntasAcertadas = useCallback(
    (trilhaId, desafioId) =>
      state.trilhas[trilhaId]?.perguntasAcertadas?.[desafioId] ?? [],
    [state.trilhas]
  )

  const getAulasVistas = useCallback(
    (trilhaId) => state.trilhas[trilhaId]?.aulasVistas ?? [],
    [state.trilhas]
  )

  const getStatusAula = useCallback(
    (trilhaId, aulaId) =>
      getAulasVistas(trilhaId).includes(aulaId) ? 'vista' : 'nao-vista',
    [getAulasVistas]
  )

  // Navegação livre (estilo roadmap.sh): qualquer desafio sempre
  // disponível, exceto se já estiver concluído.
  const getStatusDesafio = useCallback(
    (trilhaId, desafioId) => {
      const trilha = getTrilha(trilhaId)
      if (!trilha) return 'disponivel'
      const concluidos = getDesafiosConcluidos(trilhaId)
      return concluidos.includes(desafioId) ? 'concluido' : 'disponivel'
    },
    [getDesafiosConcluidos]
  )

  const getProgresoTrilha = useCallback(
    (trilhaId) => {
      const trilha = getTrilha(trilhaId)
      if (!trilha) return { concluidos: 0, total: 0, percentual: 0 }
      const concluidos = getDesafiosConcluidos(trilhaId).length
      const total = trilha.desafios.length
      return {
        concluidos,
        total,
        percentual: total === 0 ? 0 : (concluidos / total) * 100,
      }
    },
    [getDesafiosConcluidos]
  )

  // Tópicos sem trilha real viram 'em-breve' (placeholder educado),
  // nunca 'bloqueado'.
  const getStatusTopico = useCallback(
    (topicoId) => {
      const trilhaId = findTrilhaIdByTopicoId(topicoId)
      if (!trilhaId) return 'em-breve'
      const { concluidos, total } = getProgresoTrilha(trilhaId)
      if (concluidos === 0) return 'disponivel'
      if (concluidos === total) return 'concluido'
      return 'em-andamento'
    },
    [getProgresoTrilha]
  )

  const getProgressoTopico = useCallback(
    (topicoId) => {
      const trilhaId = findTrilhaIdByTopicoId(topicoId)
      if (!trilhaId) return null
      return getProgresoTrilha(trilhaId)
    },
    [getProgresoTrilha]
  )

  /* ---------- mutations ---------- */

  const marcarPerguntaAcertada = useCallback(
    (trilhaId, desafioId, perguntaId, xpReward) => {
      setState((prev) => {
        const trilhaState = prev.trilhas[trilhaId] ?? {
          desafiosConcluidos: [],
          perguntasAcertadas: {},
        }
        const desafioState = trilhaState.perguntasAcertadas[desafioId] ?? []
        if (desafioState.includes(perguntaId)) return prev // idempotente
        return {
          ...prev,
          xpGanho: prev.xpGanho + xpReward,
          trilhas: {
            ...prev.trilhas,
            [trilhaId]: {
              ...trilhaState,
              perguntasAcertadas: {
                ...trilhaState.perguntasAcertadas,
                [desafioId]: [...desafioState, perguntaId],
              },
            },
          },
        }
      })
    },
    []
  )

  const marcarDesafioConcluido = useCallback(
    (trilhaId, desafioId, xpBonus = 0) => {
      setState((prev) => {
        const trilhaState = prev.trilhas[trilhaId] ?? {
          desafiosConcluidos: [],
          perguntasAcertadas: {},
        }
        if (trilhaState.desafiosConcluidos.includes(desafioId)) return prev
        return {
          ...prev,
          xpGanho: prev.xpGanho + xpBonus,
          trilhas: {
            ...prev.trilhas,
            [trilhaId]: {
              ...trilhaState,
              desafiosConcluidos: [
                ...trilhaState.desafiosConcluidos,
                desafioId,
              ],
            },
          },
        }
      })
    },
    []
  )

  const marcarAulaVista = useCallback(
    (trilhaId, aulaId) => {
      setState((prev) => {
        const trilhaState = prev.trilhas[trilhaId] ?? {
          desafiosConcluidos: [],
          perguntasAcertadas: {},
          aulasVistas: [],
        }
        const vistas = trilhaState.aulasVistas ?? []
        if (vistas.includes(aulaId)) return prev // idempotente
        return {
          ...prev,
          trilhas: {
            ...prev.trilhas,
            [trilhaId]: {
              ...trilhaState,
              aulasVistas: [...vistas, aulaId],
            },
          },
        }
      })
    },
    []
  )

  const resetProgress = useCallback(() => {
    setState(INITIAL_STATE)
  }, [])

  const value = {
    xp,
    xpGanho: state.xpGanho,
    getStatusTopico,
    getProgressoTopico,
    getStatusDesafio,
    getProgresoTrilha,
    getPerguntasAcertadas,
    getAulasVistas,
    getStatusAula,
    marcarPerguntaAcertada,
    marcarDesafioConcluido,
    marcarAulaVista,
    resetProgress,
  }

  return (
    <ProgressContext.Provider value={value}>
      {children}
    </ProgressContext.Provider>
  )
}

export function useProgress() {
  const ctx = useContext(ProgressContext)
  if (!ctx) throw new Error('useProgress deve ser usado dentro de ProgressProvider')
  return ctx
}
