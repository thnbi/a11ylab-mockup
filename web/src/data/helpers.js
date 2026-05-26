/* ============================================================
   Funções utilitárias para acessar dados de trilhas/desafios.
   ============================================================ */

import { sections, trilhas } from './trilhas'
import { aulasPorTrilha } from './aulas'

export function getTrilha(trilhaId) {
  return trilhas[trilhaId]
}

export function getAulasTrilha(trilhaId) {
  return aulasPorTrilha[trilhaId] ?? []
}

export function getAula(trilhaId, aulaId) {
  return getAulasTrilha(trilhaId).find((a) => a.id === aulaId)
}

export function getAulaDoDesafio(trilhaId, desafioId) {
  return getAulasTrilha(trilhaId).find((a) => a.desafioId === desafioId)
}

export function getDesafio(trilhaId, desafioId) {
  const trilha = getTrilha(trilhaId)
  return trilha?.desafios.find((d) => d.id === desafioId)
}

export function getProximoDesafio(trilhaId, desafioId) {
  const trilha = getTrilha(trilhaId)
  if (!trilha) return null
  const idx = trilha.desafios.findIndex((d) => d.id === desafioId)
  if (idx < 0 || idx === trilha.desafios.length - 1) return null
  return trilha.desafios[idx + 1]
}

export function findTrilhaIdByTopicoId(topicoId) {
  for (const section of sections) {
    const topico = section.topicos.find((t) => t.id === topicoId)
    if (topico?.trilhaId) return topico.trilhaId
  }
  return null
}

export function totalDesafios(trilhaId) {
  return getTrilha(trilhaId)?.desafios.length ?? 0
}
