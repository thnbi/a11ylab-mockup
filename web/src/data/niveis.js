/* ============================================================
   Tiers de XP, nomes dos níveis exibidos na sidebar e no perfil.
   ============================================================ */

export const TIERS = [
  { min: 0,     max: 999,    nome: 'Curioso' },
  { min: 1000,  max: 2999,   nome: 'Aprendiz' },
  { min: 3000,  max: 7499,   nome: 'Praticante' },
  { min: 7500,  max: 14999,  nome: 'Exemplar' },
  { min: 15000, max: 29999,  nome: 'Mestre' },
  { min: 30000, max: Infinity, nome: 'Mentor' },
]

export function tierFor(xp) {
  return TIERS.find((t) => xp >= t.min && xp <= t.max) ?? TIERS[0]
}

export function proximoTier(xp) {
  const idx = TIERS.findIndex((t) => xp >= t.min && xp <= t.max)
  return TIERS[idx + 1] ?? null
}
