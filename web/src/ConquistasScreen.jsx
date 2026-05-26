import {
  Lock,
  Trophy,
  Medal,
  Crown,
  Sparkles,
  Award,
  Shield,
  Star,
  Flame,
  BadgeCheck,
} from 'lucide-react'
import { useProgress } from './contexts/ProgressContext'

const conquistasTrilhas = [
  {
    id: 'fundamental',
    nome: 'Fundamental',
    desc: 'Conclua "Fundamentos da Acessibilidade"',
    Icon: BadgeCheck,
    trilhaId: 'fundamentos',
  },
  {
    id: 'wcag',
    nome: 'WCAG o quê?',
    desc: 'Conclua "4 princípios da WCAG"',
    Icon: Trophy,
    unlocked: false,
  },
  {
    id: 'advogar',
    nome: 'Advogar',
    desc: 'Conclua "Legislação Brasileira de Inclusão"',
    Icon: Trophy,
    unlocked: false,
  },
  {
    id: 'ao-meu-ver',
    nome: 'A ao meu ver…',
    desc: 'Conclua "Contraste, Cores e Leitores de Tela"',
    Icon: Trophy,
    unlocked: false,
  },
  {
    id: 'moleza',
    nome: 'Moleza!',
    desc: 'Conclua a Trilha 0 - Início',
    Icon: Trophy,
    unlocked: false,
  },
  {
    id: 'html',
    nome: 'HTML?',
    desc: 'Conclua "Introdução ao HTML"',
    Icon: Trophy,
    unlocked: false,
  },
  {
    id: 'divou',
    nome: 'Divou',
    desc: 'Conclua "HTML Semântico"',
    Icon: Trophy,
    unlocked: false,
  },
  {
    id: 'arializando',
    nome: 'Arializando',
    desc: 'Conclua "WAI-ARIA"',
    Icon: Trophy,
    unlocked: false,
  },
]

const conquistasPontuacao = [
  { id: 'iniciante', nome: 'Iniciante', xp: 1000, Icon: Star, color: 'ambar' },
  { id: 'entusiasta', nome: 'Entusiasta', xp: 3000, Icon: Sparkles, color: 'ambar' },
  { id: 'praticante', nome: 'Praticante', xp: 5000, Icon: Award, color: 'teal' },
  { id: 'exemplar', nome: 'Exemplar', xp: 7500, Icon: Medal, color: 'teal' },
  { id: 'profissional', nome: 'Profissional', xp: 10000, Icon: Trophy, color: 'violeta' },
  { id: 'mestre', nome: 'Mestre', xp: 15000, Icon: Crown, color: 'violeta' },
  { id: 'guardiao', nome: 'Guardião', xp: 20000, Icon: Shield, color: 'dodger' },
  { id: 'mentor', nome: 'Mentor', xp: 30000, Icon: Flame, color: 'dodger' },
]

export default function ConquistasScreen() {
  const { xp: xpAtual, getProgresoTrilha } = useProgress()
  const conquistasComStatus = conquistasTrilhas.map((c) => {
    if (c.trilhaId) {
      const { concluidos, total } = getProgresoTrilha(c.trilhaId)
      return { ...c, unlocked: total > 0 && concluidos === total }
    }
    return c
  })
  const totalUnlocked = conquistasComStatus.filter((c) => c.unlocked).length
  const proximaMedalha = conquistasPontuacao.find((m) => xpAtual < m.xp)

  return (
    <div className="max-w-[1200px] mx-auto px-10 py-8">
      <header className="mb-2">
        <h1 className="text-display text-ink-strong">Minhas conquistas</h1>
        <p className="mt-2 text-body-md text-ink-muted">
          {totalUnlocked} de {conquistasComStatus.length} conquistas de trilhas
          desbloqueadas
          {proximaMedalha && (
            <>
              {' '}
              <span className="text-ink-disabled">•</span> próxima medalha:{' '}
              <span className="text-ambar-700 font-semibold">
                {proximaMedalha.nome}
              </span>{' '}
              em {(proximaMedalha.xp, xpAtual).toLocaleString('pt-BR')} XP
            </>
          )}
        </p>
      </header>

      <section className="mt-8 mb-12">
        <h2 className="text-h2 text-ink-strong mb-5">Conquistas das trilhas</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {conquistasComStatus.map((c) => (
            <TrailBadge key={c.id} {...c} />
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-h2 text-ink-strong mb-2">Conquistas de pontuação</h2>
        <p className="text-body-sm text-ink-muted mb-5">
          Acumule XP completando desafios para subir de tier.
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {conquistasPontuacao.map((m) => (
            <ScoreMedal key={m.id} {...m} xpAtual={xpAtual} />
          ))}
        </div>
      </section>
    </div>
  )
}

/* ---------- Badge de trilha ------------------------------------ */
function TrailBadge({ nome, desc, Icon, unlocked }) {
  if (unlocked) {
    return (
      <article className="bg-violeta-50 border-2 border-violeta-200 rounded-lg p-5 flex flex-col items-center text-center transition-all hover:border-violeta-500 hover:shadow-md">
        <span
          aria-hidden="true"
          className="w-16 h-16 rounded-full bg-violeta-500 text-white flex items-center justify-center mb-3 shadow-md"
        >
          <Icon size={32} strokeWidth={2.5} />
        </span>
        <h3 className="text-h3 text-violeta-700 font-bold">{nome}</h3>
        <p className="mt-1 text-body-sm text-ink-muted">{desc}</p>
        <span className="mt-3 inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-violeta-100 text-violeta-700 text-label-sm font-semibold">
          Desbloqueada
        </span>
      </article>
    )
  }
  return (
    <article
      aria-label="Conquista bloqueada"
      className="bg-surface-sunken border-2 border-border rounded-lg p-5 flex flex-col items-center text-center"
    >
      <span
        aria-hidden="true"
        className="w-16 h-16 rounded-full bg-surface-raised border border-border text-ink-disabled flex items-center justify-center mb-3"
      >
        <Lock size={28} />
      </span>
      <h3 className="text-h3 text-ink-muted font-bold">{nome}</h3>
      <p className="mt-1 text-body-sm text-ink-disabled">{desc}</p>
    </article>
  )
}

/* ---------- Medalha de pontuação ------------------------------- */
function ScoreMedal({ nome, xp, Icon, color, xpAtual }) {
  const unlocked = xpAtual >= xp
  const tierBg = {
    ambar: 'bg-ambar-500',
    teal: 'bg-teal-500',
    violeta: 'bg-violeta-500',
    dodger: 'bg-dodger-500',
  }
  const tierBorder = {
    ambar: 'border-ambar-100',
    teal: 'border-teal-100',
    violeta: 'border-violeta-100',
    dodger: 'border-dodger-100',
  }

  return (
    <article
      aria-label={unlocked ? undefined : 'Medalha bloqueada'}
      className={`rounded-lg p-4 flex flex-col items-center text-center border-2 ${
        unlocked
          ? `bg-surface-raised ${tierBorder[color]}`
          : 'bg-surface-sunken border-border opacity-70'
      }`}
    >
      <span
        aria-hidden="true"
        className={`w-12 h-12 rounded-full flex items-center justify-center mb-2 ${
          unlocked
            ? `${tierBg[color]} text-white shadow-sm`
            : 'bg-surface-raised border border-border text-ink-disabled'
        }`}
      >
        {unlocked ? <Icon size={22} strokeWidth={2.5} /> : <Lock size={18} />}
      </span>
      <h3
        className={`text-caps ${
          unlocked ? 'text-ink-strong' : 'text-ink-muted'
        }`}
      >
        {nome}
      </h3>
      <p
        className={`mt-1 text-label-sm font-bold ${
          unlocked ? 'text-ink-strong' : 'text-ink-disabled'
        }`}
      >
        {xp.toLocaleString('pt-BR')} XP
      </p>
    </article>
  )
}
