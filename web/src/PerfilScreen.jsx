import { useState } from 'react'
import {
  Mail,
  User as UserIcon,
  Lock,
  BookOpen,
  CheckCircle2,
  Circle,
  Flame,
  Zap,
  Compass,
  Trophy,
  BadgeCheck,
  ChevronRight,
  Settings,
  X,
} from 'lucide-react'
import { useProgress } from './contexts/ProgressContext'
import { useAuth } from './contexts/AuthContext'
import { tierFor, proximoTier } from './data/niveis'

const perfilBase = {
  nome: 'Chun-Li',
  username: '@chun.li',
  email: 'chun.li@interpol.gov',
  streakDias: 8,
  trilhasEmProgresso: 1,
  ingressou: 'Março de 2026',
  destaques: [
    { id: 'fundamental', nome: 'Fundamental', desc: 'Concluiu Fundamentos da Acessibilidade', Icon: BadgeCheck, color: 'violeta' },
    { id: 'iniciante', nome: 'Iniciante', desc: 'Atingiu 1.000 XP', Icon: Trophy, color: 'ambar' },
    { id: 'foco', nome: 'No foco', desc: 'Completou primeiro desafio', Icon: CheckCircle2, color: 'sucesso' },
  ],
  historicoTrilhas: [
    {
      id: 'fundamentos',
      titulo: 'Fundamentos da Acessibilidade',
      status: 'em-andamento',
      completos: 2,
      total: 5,
      ultimoAcesso: 'há 2 dias',
    },
  ],
}

export default function PerfilScreen() {
  const { xp, getProgresoTrilha } = useProgress()
  const { user } = useAuth()
  const fundamentos = getProgresoTrilha('fundamentos')
  const perfil = {
    ...perfilBase,
    nome: user?.nome ?? perfilBase.nome,
    email: user?.email ?? perfilBase.email,
    username: user?.nome ? `@${user.nome.toLowerCase().replace(/\s+/g, '.')}` : perfilBase.username,
    xp,
    desafiosConcluidos: fundamentos.concluidos,
    historicoTrilhas: [
      {
        id: 'fundamentos',
        titulo: 'Fundamentos da Acessibilidade',
        status: fundamentos.concluidos === fundamentos.total ? 'concluido' : 'em-andamento',
        completos: fundamentos.concluidos,
        total: fundamentos.total,
        ultimoAcesso: 'há 2 dias',
      },
    ],
  }

  return (
    <div className="max-w-[1200px] mx-auto px-10 py-8">
      <header className="mb-8">
        <h1 className="text-display text-ink-strong">Perfil</h1>
      </header>

      <ProfileHero perfil={perfil} />

      <section className="mt-8" aria-label="Estatísticas">
        <StatsRow perfil={perfil} />
      </section>

      <section className="mt-10">
        <SectionHeader
          title="Conquistas em destaque"
          actionLabel="Ver todas"
        />
        <HighlightedAchievements destaques={perfil.destaques} />
      </section>

      <section className="mt-10">
        <h2 className="text-h2 text-ink-strong mb-4">Histórico de trilhas</h2>
        <ul className="space-y-3">
          {perfil.historicoTrilhas.map((t) => (
            <li key={t.id}>
              <TrilhaHistoryCard {...t} />
            </li>
          ))}
        </ul>
      </section>

    </div>
  )
}

/* ---------- Hero ------------------------------------------------- */
function ProfileHero({ perfil }) {
  const tier = tierFor(perfil.xp)
  const proximo = proximoTier(perfil.xp)
  const inicial = perfil.nome.charAt(0).toUpperCase()
  const restante = proximo ? proximo.min - perfil.xp : 0
  const progressoNoTier = proximo
    ? ((perfil.xp - tier.min) / (proximo.min - tier.min)) * 100
    : 100

  const [openConfig, setOpenConfig] = useState(false)

  return (
    <article
      className="
        relative overflow-hidden
        rounded-xl p-6 sm:p-8
        bg-gradient-to-br from-dodger-600 via-dodger-500 to-violeta-600
        text-white shadow-md
      "
    >
      <div
        aria-hidden="true"
        className="absolute -top-16 -right-16 w-64 h-64 rounded-full bg-white/10 blur-2xl"
      />

      {/* Toggle de Configurações, canto superior direito */}
      <button
        type="button"
        onClick={() => setOpenConfig((v) => !v)}
        aria-expanded={openConfig}
        aria-controls="perfil-config-panel"
        className="absolute top-4 right-4 z-10 inline-flex items-center gap-2 px-3 h-10 rounded-md bg-white/15 hover:bg-white/25 text-white text-label-sm font-semibold transition-colors backdrop-blur-sm"
      >
        {openConfig ? (
          <>
            <X size={16} strokeWidth={2.5} aria-hidden="true" />
            Fechar
          </>
        ) : (
          <>
            <Settings size={16} strokeWidth={2.5} aria-hidden="true" />
            Configurações
          </>
        )}
      </button>

      <div className="relative flex items-start gap-5 sm:gap-7 flex-wrap pr-32">
        <span
          aria-hidden="true"
          className="
            shrink-0 inline-flex items-center justify-center
            w-20 h-20 sm:w-24 sm:h-24
            rounded-full bg-white text-dodger-600
            font-display font-bold text-h1
            ring-4 ring-white/40
          "
        >
          {inicial}
        </span>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 text-label-sm text-white/80 font-semibold flex-wrap">
            <span>{perfil.username}</span>
            <span aria-hidden="true">•</span>
            <span>Ingressou em {perfil.ingressou}</span>
          </div>
          <h2 className="mt-1 text-h1 font-bold text-white leading-tight">
            {perfil.nome}
          </h2>
          <p className="mt-2 inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/15 text-white text-label-sm font-bold">
            <Trophy size={14} strokeWidth={2.5} aria-hidden="true" />
            {tier.nome}
          </p>
          {proximo && (
            <div className="mt-5 max-w-md">
              <div className="flex items-center justify-between text-label-sm font-semibold text-white/90 mb-1.5">
                <span>{tier.nome}</span>
                <span>{restante.toLocaleString('pt-BR')} XP para {proximo.nome}</span>
              </div>
              <div
                role="progressbar"
                aria-valuenow={Math.round(progressoNoTier)}
                aria-valuemin={0}
                aria-valuemax={100}
                aria-label={`Progresso no tier ${tier.nome}`}
                className="h-2 rounded-full bg-white/20 overflow-hidden"
              >
                <div
                  className="h-full bg-white rounded-full transition-all"
                  style={{ width: `${progressoNoTier}%` }}
                />
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Painel de configurações expansível, dentro do card */}
      {openConfig && (
        <div
          id="perfil-config-panel"
          className="relative mt-6 pt-6 border-t border-white/20"
        >
          <h3 className="text-h3 font-bold text-white mb-4">Dados pessoais</h3>
          <div className="space-y-4 max-w-2xl">
            <ConfigField label="Nome" Icon={UserIcon} type="text" defaultValue={perfil.nome} />
            <ConfigField label="Email" Icon={Mail} type="email" defaultValue={perfil.email} />
            <ConfigField label="Senha" Icon={Lock} type="password" defaultValue="••••••••" />
            <div className="pt-3 flex justify-end gap-2 flex-wrap">
              <button
                type="button"
                onClick={() => setOpenConfig(false)}
                className="min-h-11 px-4 py-2 rounded-md text-white/85 hover:text-white hover:bg-white/15 text-label-md font-medium transition-colors"
              >
                Cancelar
              </button>
              <button
                type="button"
                className="min-h-11 px-5 py-2 rounded-md bg-white text-dodger-700 text-label-md font-bold hover:bg-white/90 transition-colors"
              >
                Salvar alterações
              </button>
            </div>
          </div>
        </div>
      )}
    </article>
  )
}

/* ---------- Campo dentro do card azul (labels brancos) ----------- */
function ConfigField({ label, Icon, type, defaultValue }) {
  const id = `perfil-config-${label.toLowerCase()}`
  return (
    <div>
      <label
        htmlFor={id}
        className="block text-label-md text-white font-semibold mb-2"
      >
        {label}
      </label>
      <div className="relative">
        <Icon
          size={18}
          className="absolute left-4 top-1/2 -translate-y-1/2 text-ink-muted pointer-events-none"
          aria-hidden="true"
        />
        <input
          id={id}
          type={type}
          defaultValue={defaultValue}
          className="w-full h-11 pl-11 pr-4 rounded-md bg-white text-ink-strong border-2 border-transparent focus:border-dodger-200 transition-colors"
        />
      </div>
    </div>
  )
}

/* ---------- Stats row -------------------------------------------- */
function StatsRow({ perfil }) {
  const stats = [
    {
      id: 'streak',
      label: 'Dias seguidos',
      value: perfil.streakDias,
      Icon: Flame,
      bg: 'bg-ambar-100',
      icon: 'text-ambar-700',
    },
    {
      id: 'xp',
      label: 'XP total',
      value: perfil.xp.toLocaleString('pt-BR'),
      Icon: Zap,
      bg: 'bg-violeta-100',
      icon: 'text-violeta-700',
    },
    {
      id: 'desafios',
      label: 'Desafios concluídos',
      value: perfil.desafiosConcluidos,
      Icon: CheckCircle2,
      bg: 'bg-sucesso-100',
      icon: 'text-sucesso-700',
    },
    {
      id: 'trilhas',
      label: 'Trilhas em andamento',
      value: perfil.trilhasEmProgresso,
      Icon: Compass,
      bg: 'bg-dodger-100',
      icon: 'text-dodger-700',
    },
  ]

  return (
    <ul className="grid grid-cols-2 lg:grid-cols-4 gap-3">
      {stats.map((s) => (
        <li
          key={s.id}
          className="bg-surface-raised border border-border rounded-lg p-4 flex items-center gap-3"
        >
          <span
            aria-hidden="true"
            className={`shrink-0 w-11 h-11 rounded-md flex items-center justify-center ${s.bg} ${s.icon}`}
          >
            <s.Icon size={22} strokeWidth={2.2} />
          </span>
          <div className="min-w-0">
            <p className="text-h3 font-bold text-ink-strong leading-tight">
              {s.value}
            </p>
            <p className="text-label-sm text-ink-muted leading-tight">
              {s.label}
            </p>
          </div>
        </li>
      ))}
    </ul>
  )
}

/* ---------- Section header com link de ação --------------------- */
function SectionHeader({ title, actionLabel, onAction }) {
  return (
    <div className="flex items-baseline justify-between gap-3 mb-4">
      <h2 className="text-h2 text-ink-strong">{title}</h2>
      {actionLabel && (
        <button
          type="button"
          onClick={onAction}
          className="inline-flex items-center gap-1 text-label-md font-semibold text-dodger-700 hover:text-dodger-600 transition-colors"
        >
          {actionLabel}
          <ChevronRight size={16} strokeWidth={2.5} aria-hidden="true" />
        </button>
      )}
    </div>
  )
}

/* ---------- Conquistas em destaque ------------------------------ */
function HighlightedAchievements({ destaques }) {
  const colorMap = {
    violeta: { bg: 'bg-violeta-50', border: 'border-violeta-200', iconBg: 'bg-violeta-500', text: 'text-violeta-700' },
    ambar:   { bg: 'bg-ambar-50',   border: 'border-ambar-100',   iconBg: 'bg-ambar-500',   text: 'text-ambar-700' },
    sucesso: { bg: 'bg-sucesso-50', border: 'border-sucesso-100', iconBg: 'bg-sucesso-500', text: 'text-sucesso-700' },
    dodger:  { bg: 'bg-dodger-50',  border: 'border-dodger-200',  iconBg: 'bg-dodger-500',  text: 'text-dodger-700' },
  }
  return (
    <ul className="grid grid-cols-2 md:grid-cols-3 gap-3">
      {destaques.map((d) => {
        const c = colorMap[d.color] || colorMap.violeta
        return (
          <li key={d.id}>
            <article
              className={`${c.bg} ${c.border} border-2 rounded-lg p-4 flex items-center gap-3 h-full`}
            >
              <span
                aria-hidden="true"
                className={`shrink-0 w-12 h-12 rounded-full ${c.iconBg} text-white flex items-center justify-center shadow-sm`}
              >
                <d.Icon size={24} strokeWidth={2.5} />
              </span>
              <div className="min-w-0">
                <h3 className={`text-label-md font-bold leading-tight ${c.text}`}>
                  {d.nome}
                </h3>
                <p className="text-label-sm text-ink-muted leading-tight mt-0.5">
                  {d.desc}
                </p>
              </div>
            </article>
          </li>
        )
      })}
    </ul>
  )
}

/* ---------- Histórico de trilhas (mantido) ---------------------- */
function TrilhaHistoryCard({ titulo, status, completos, total, ultimoAcesso }) {
  const concluido = status === 'concluido'
  const percent = Math.round((completos / total) * 100)

  return (
    <article
      className={`border rounded-lg p-5 flex items-center gap-5 ${
        concluido
          ? 'bg-sucesso-50/40 border-sucesso-100'
          : 'bg-surface-raised border-border'
      }`}
    >
      <span
        aria-hidden="true"
        className={`w-12 h-12 shrink-0 rounded-md flex items-center justify-center ${
          concluido
            ? 'bg-sucesso-100 text-sucesso-700'
            : 'bg-violeta-100 text-violeta-700'
        }`}
      >
        <BookOpen size={24} />
      </span>
      <div className="flex-1 min-w-0">
        <h3 className="text-h3 text-ink-strong">{titulo}</h3>
        <p className="mt-1 text-body-sm text-ink-muted">
          {completos} de {total} desafios{' '}
          <span className="text-ink-disabled">•</span> último acesso {ultimoAcesso}
        </p>
        <div
          role="progressbar"
          aria-valuenow={percent}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label={`Progresso em ${titulo}`}
          className="mt-3 h-1.5 bg-surface-sunken rounded-full overflow-hidden max-w-md"
        >
          <div
            className={`h-full rounded-full ${
              concluido ? 'bg-sucesso-500' : 'bg-violeta-500'
            }`}
            style={{ width: `${percent}%` }}
          />
        </div>
      </div>
      {concluido ? (
        <span className="flex items-center gap-2 text-sucesso-700 font-bold text-label-md shrink-0">
          <CheckCircle2 size={20} aria-hidden="true" /> Concluído
        </span>
      ) : (
        <span className="flex items-center gap-2 text-violeta-700 font-bold text-label-md shrink-0">
          <Circle size={18} aria-hidden="true" /> Em andamento
        </span>
      )}
    </article>
  )
}

