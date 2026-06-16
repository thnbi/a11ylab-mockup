import { Fragment, useMemo, useState } from 'react'
import {
  Search,
  CheckCircle2,
  Sparkles,
  Hammer,
  RefreshCw,
  Flag,
  SearchX,
  Clock,
  Zap,
} from 'lucide-react'
import { sections, ICON_MAP } from './data/trilhas'
import { useProgress } from './contexts/ProgressContext'
import { useAuth } from './contexts/AuthContext'
import { getTrilha } from './data/helpers'
import { Tag } from './components/ui'
import { useSurvey } from './contexts/SurveyContext'
import NpsCard from './components/surveys/NpsCard'

/* ============================================================
   Home / Roadmap, A11yLAB

   Dois modos de render controlados por CSS:
   - ≥ lg (1024px): snake-path com linhas alternadas LTR/RTL.
   - < lg: lista vertical agrupada por seção.

   Navegação livre: nenhum tópico é "bloqueado". Tópicos sem
   trilha real entram em estado 'em-breve' e abrem placeholder.
   ============================================================ */

function buildWaypoints(sections) {
  const items = []
  sections.forEach((section) => {
    items.push({ kind: 'section', uid: `section-${section.id}`, ...section })
    section.topicos.forEach((t) => {
      items.push({ kind: 'topic', uid: `topic-${t.id}`, sectionId: section.id, ...t })
    })
    items.push({
      kind: 'review',
      uid: `review-${section.id}`,
      sectionId: section.id,
      sectionTitle: section.titulo,
    })
  })
  items.push({
    kind: 'goal',
    uid: 'goal',
    titulo: 'Meta final',
    subtitulo: 'Domínio em acessibilidade web',
  })
  return items
}

function chunkArray(arr, size) {
  const result = []
  for (let i = 0; i < arr.length; i += size) {
    result.push(arr.slice(i, i + size))
  }
  return result
}

const ITEMS_PER_ROW = 5

function normalizar(s) {
  return s
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
}

const SUBTITULOS_HOME = [
  'Pronto pra destravar mais um tópico?',
  'Bora aprender algo novo hoje?',
  'Sua próxima conquista te espera. ✨',
  'Que tal continuar de onde parou?',
]

function saudacaoPorHora(h) {
  if (h < 5) return 'Boa madrugada'
  if (h < 12) return 'Bom dia'
  if (h < 18) return 'Boa tarde'
  return 'Boa noite'
}

function primeiroNome(nome) {
  if (!nome) return null
  return nome.trim().split(/\s+/)[0]
}

export default function PathScreen({ onAbrirTrilha, onAbrirEmBreve }) {
  const [q, setQ] = useState('')
  const { shouldShowNpsSession } = useSurvey()
  const showNpsSession = !q && shouldShowNpsSession()

  const queryNorm = normalizar(q.trim())

  const matchedTopicIds = useMemo(() => {
    if (!queryNorm) return null
    return new Set(
      sections
        .flatMap((s) => s.topicos)
        .filter((t) =>
          normalizar(`${t.titulo} ${t.subtitulo ?? ''}`).includes(queryNorm)
        )
        .map((t) => t.id)
    )
  }, [queryNorm])

  const sectionsFiltradas = useMemo(() => {
    if (!matchedTopicIds) return sections
    return sections.filter((s) => s.topicos.some((t) => matchedTopicIds.has(t.id)))
  }, [matchedTopicIds])

  const semResultados = matchedTopicIds && sectionsFiltradas.length === 0

  const waypoints = useMemo(() => buildWaypoints(sectionsFiltradas), [sectionsFiltradas])
  const rows = chunkArray(waypoints, ITEMS_PER_ROW)

  return (
    <div className="max-w-[1200px] mx-auto px-6 lg:px-10 py-8" data-tour="roadmap">
      <PathHeader q={q} onChange={setQ} />

      {semResultados ? (
        <EmptySearchState query={q} onLimpar={() => setQ('')} />
      ) : (
        <>
          {/* Layout snake, visível só em desktops (≥ lg) */}
          <div className="mt-10 hidden lg:block">
            {rows.map((rowItems, rowIdx) => {
              const isReverse = rowIdx % 2 === 1
              const lastRow = rowIdx === rows.length - 1
              return (
                <Fragment key={rowIdx}>
                  <SnakeRow
                    items={rowItems}
                    reverse={isReverse}
                    matchedTopicIds={matchedTopicIds}
                    onAbrirTrilha={onAbrirTrilha}
                    onAbrirEmBreve={onAbrirEmBreve}
                  />
                  {!lastRow && (
                    <InterRowConnector side={isReverse ? 'left' : 'right'} />
                  )}
                </Fragment>
              )
            })}
          </div>

          {/* Layout vertical, visível em tablet/mobile (< lg) */}
          <ListLayout
            sectionsFiltradas={sectionsFiltradas}
            matchedTopicIds={matchedTopicIds}
            onAbrirTrilha={onAbrirTrilha}
            onAbrirEmBreve={onAbrirEmBreve}
          />
        </>
      )}

      {showNpsSession && (
        <div className="mt-10">
          <NpsCard />
        </div>
      )}
    </div>
  )
}

/* ---------- Header ----------------------------------------------- */
function PathHeader({ q, onChange }) {
  const { user } = useAuth()
  const nome = primeiroNome(user?.nome)
  // Saudação calculada na montagem; evita re-render trocar o texto a cada keystroke
  // da busca. Em uma sessão curta, a saudação não muda de período de qualquer jeito.
  const { saudacao, subtitulo } = useMemo(() => {
    const agora = new Date()
    const h = agora.getHours()
    // Index estável dentro do dia, evita trocar de frase em re-renders.
    const diaDoAno = Math.floor(
      (agora - new Date(agora.getFullYear(), 0, 0)) / 86400000
    )
    return {
      saudacao: saudacaoPorHora(h),
      subtitulo: SUBTITULOS_HOME[diaDoAno % SUBTITULOS_HOME.length],
    }
  }, [])
  return (
    <header className="flex items-end justify-between gap-6 flex-wrap">
      <div className="flex-1 min-w-0">
        <h1 className="text-display text-ink-strong">
          {saudacao}{nome ? `, ${nome}` : ''}!{' '}
          <span aria-hidden="true" className="inline-block motion-safe:animate-wave origin-[70%_70%]">👋</span>
        </h1>
        <p className="mt-2 text-body-lg text-ink-muted max-w-2xl">
          {subtitulo} Comece por{' '}
          <strong className="text-ink-strong">qualquer</strong> tópico do
          roadmap, sem ordem obrigatória.
        </p>
      </div>
      <div className="relative w-full md:w-80">
        <Search
          size={18}
          className="absolute left-4 top-1/2 -translate-y-1/2 text-ink-muted pointer-events-none"
          aria-hidden="true"
        />
        <input
          type="search"
          placeholder="Buscar tópico..."
          aria-label="Buscar tópico no roadmap"
          value={q}
          onChange={(e) => onChange(e.target.value)}
          className="w-full h-11 pl-11 pr-4 rounded-md bg-surface-raised border border-border text-body-md text-ink-strong focus:border-dodger-500 transition-colors"
        />
      </div>
    </header>
  )
}

function EmptySearchState({ query, onLimpar }) {
  return (
    <div className="mt-16 flex flex-col items-center text-center gap-4">
      <div className="relative">
        <span
          aria-hidden="true"
          className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-violeta-50 ring-8 ring-violeta-100 motion-safe:animate-float"
        >
          <img src="/logo-olhos.png" alt="" className="w-14 h-auto" />
        </span>
        <span
          aria-hidden="true"
          className="absolute -top-2 -right-3 inline-flex items-center justify-center w-8 h-8 rounded-full bg-surface-raised border-2 border-violeta-200 shadow-sm"
        >
          <SearchX size={16} className="text-violeta-700" strokeWidth={2.4} />
        </span>
      </div>
      <h2 className="text-h2 text-ink-strong">Hmm, não achei nada por aqui…</h2>
      <p className="text-body-md text-ink-muted max-w-md">
        Nada bate com <strong className="text-ink-strong">"{query}"</strong>.
        Que tal tentar <em>"cor"</em>, <em>"foco"</em> ou <em>"teclado"</em>?
      </p>
      <button
        type="button"
        onClick={onLimpar}
        className="mt-1 text-label-md font-semibold text-dodger-700 hover:text-dodger-600 underline-offset-4 hover:underline"
      >
        Limpar busca e ver tudo
      </button>
    </div>
  )
}

/* ============================================================
   Layout vertical (mobile/tablet): seções como blocos, tópicos
   como grid responsivo. Sem snake, sem conectores tracejados.
   ============================================================ */
function ListLayout({ sectionsFiltradas, matchedTopicIds, onAbrirTrilha, onAbrirEmBreve }) {
  return (
    <div className="mt-10 lg:hidden flex flex-col gap-10">
      {sectionsFiltradas.map((section) => {
        const Icon = ICON_MAP[section.iconName]
        return (
          <section key={section.id} aria-labelledby={`sec-${section.id}`}>
            <header className="flex items-center gap-3 mb-4">
              <span aria-hidden="true" className="text-violeta-700 shrink-0">
                {Icon && <Icon size={24} strokeWidth={2.5} />}
              </span>
              <div>
                <span className="block text-caps text-violeta-700">
                  Etapa {section.numero}
                </span>
                <h2
                  id={`sec-${section.id}`}
                  className="text-h2 text-ink-strong font-bold leading-tight"
                >
                  {section.titulo}
                </h2>
              </div>
            </header>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {section.topicos.map((topico) => {
                const dimmed = matchedTopicIds ? !matchedTopicIds.has(topico.id) : false
                return (
                  <li key={topico.id}>
                    <TopicCard
                      item={topico}
                      dimmed={dimmed}
                      onAbrirTrilha={onAbrirTrilha}
                      onAbrirEmBreve={onAbrirEmBreve}
                    />
                  </li>
                )
              })}
              <li className="sm:col-span-2">
                <ReviewCard sectionTitle={section.titulo} />
              </li>
            </ul>
          </section>
        )
      })}
      <div className="flex justify-center pt-4">
        <GoalWaypoint titulo="Meta final" subtitulo="Domínio em acessibilidade web" />
      </div>
    </div>
  )
}

/* Card de tópico para o list layout (sem largura fixa) */
function TopicCard({ item, dimmed, onAbrirTrilha, onAbrirEmBreve }) {
  const { getStatusTopico, getProgressoTopico } = useProgress()
  const status = getStatusTopico(item.id)
  const trilha = item.trilhaId ? getTrilha(item.trilhaId) : null
  const progresso = item.trilhaId ? getProgressoTopico(item.id) : null

  const handleClick = () => {
    if (item.trilhaId) onAbrirTrilha?.(item.trilhaId)
    else onAbrirEmBreve?.(item)
  }

  const v = variantPorStatus(status)

  return (
    <button
      type="button"
      onClick={handleClick}
      className={`w-full text-left flex flex-col gap-2 p-4 rounded-lg border-2 transition-all hover:shadow-md hover:-translate-y-0.5 ${v.bg} ${v.border} ${v.ring} ${dimmed ? 'opacity-40' : ''}`}
    >
      <NodeStatusRow status={status} progresso={progresso} />
      <h3 className={`text-h3 font-bold leading-tight ${v.title}`}>{item.titulo}</h3>
      {item.subtitulo && <p className={`text-body-sm ${v.sub}`}>{item.subtitulo}</p>}
      {trilha && (
        <p className="mt-1 inline-flex items-center gap-2 text-label-sm text-ink-muted">
          <Clock size={12} aria-hidden="true" />~{trilha.duracaoMin} min
          <span aria-hidden="true">•</span>
          <Zap size={12} strokeWidth={2.5} fill="currentColor" className="text-ambar-500" aria-hidden="true" />
          {trilha.desafios.reduce((s, d) => s + d.xp, 0)} XP
        </p>
      )}
    </button>
  )
}

function ReviewCard({ sectionTitle }) {
  return (
    <article className="px-4 py-3 rounded-[2.5rem] border-2 bg-violeta-50 border-violeta-200 flex items-center gap-3">
      <RefreshCw size={20} strokeWidth={2.2} className="text-violeta-500 shrink-0" aria-hidden="true" />
      <div className="flex-1 min-w-0">
        <h3 className="text-label-md font-bold text-violeta-700 leading-tight">
          Revisão
        </h3>
        <p className="text-label-sm text-ink-muted leading-tight truncate">
          {sectionTitle}
        </p>
      </div>
      <Tag tone="violeta" size="sm">Em breve</Tag>
    </article>
  )
}

/* ============================================================
   Helpers compartilhados entre snake + list layouts
   ============================================================ */
function variantPorStatus(status) {
  if (status === 'concluido') return {
    bg: 'bg-sucesso-50', border: 'border-sucesso-200', ring: '',
    title: 'text-ink-strong', sub: 'text-ink-muted',
  }
  if (status === 'em-andamento') return {
    bg: 'bg-ambar-50', border: 'border-ambar-500',
    ring: 'ring-4 ring-ambar-500/20 lg:motion-safe:animate-pulse',
    title: 'text-ink-strong', sub: 'text-ink-muted',
  }
  if (status === 'em-breve') return {
    bg: 'bg-surface-sunken', border: 'border-border', ring: '',
    title: 'text-ink-strong', sub: 'text-ink-muted',
  }
  // disponivel
  return {
    bg: 'bg-surface-raised', border: 'border-border', ring: '',
    title: 'text-ink-strong', sub: 'text-ink-muted',
  }
}

function NodeStatusRow({ status, progresso }) {
  if (status === 'em-andamento') {
    return (
      <div className="flex items-center gap-2">
        <Tag tone="ambar" size="sm" icon={Sparkles}>
          Você está aqui
        </Tag>
      </div>
    )
  }
  if (status === 'concluido') {
    return (
      <div className="flex items-center justify-between gap-2">
        <CheckCircle2 size={20} className="text-sucesso-500" aria-hidden="true" />
        <span className="text-label-sm font-bold text-sucesso-700">Concluído</span>
      </div>
    )
  }
  if (status === 'em-breve') {
    return (
      <div className="flex items-center justify-between gap-2">
        <Tag tone="violeta" size="sm" icon={Hammer}>
          Em breve
        </Tag>
      </div>
    )
  }
  if (status === 'disponivel') {
    return (
      <div className="flex items-center justify-end gap-2">
        <span className="text-label-sm font-semibold text-dodger-700">Disponível</span>
      </div>
    )
  }
  return null
}

/* ============================================================
   Snake layout (desktop ≥ lg)
   ============================================================ */
function SnakeRow({ items, reverse, matchedTopicIds, onAbrirTrilha, onAbrirEmBreve }) {
  return (
    <ol
      className={`flex items-stretch w-full ${reverse ? 'flex-row-reverse' : 'flex-row'}`}
    >
      {items.map((item, i) => (
        <Fragment key={item.uid}>
          <WaypointItem
            item={item}
            matchedTopicIds={matchedTopicIds}
            onAbrirTrilha={onAbrirTrilha}
            onAbrirEmBreve={onAbrirEmBreve}
          />
          {i < items.length - 1 && <DashedConnector />}
        </Fragment>
      ))}
    </ol>
  )
}

function WaypointItem({ item, matchedTopicIds, onAbrirTrilha, onAbrirEmBreve }) {
  if (item.kind === 'section') return <SectionWaypoint {...item} />
  if (item.kind === 'review') return <ReviewWaypoint {...item} />
  if (item.kind === 'goal') return <GoalWaypoint {...item} />
  if (item.kind === 'topic') {
    const dimmed = matchedTopicIds ? !matchedTopicIds.has(item.id) : false
    return (
      <TopicWaypoint
        item={item}
        dimmed={dimmed}
        onAbrirTrilha={onAbrirTrilha}
        onAbrirEmBreve={onAbrirEmBreve}
      />
    )
  }
  return null
}

function DashedConnector() {
  return (
    <li
      aria-hidden="true"
      className="list-none flex-grow min-w-[28px] flex items-center self-center"
    >
      <div className="w-full border-t-2 border-dashed border-border-strong" />
    </li>
  )
}

function InterRowConnector({ side }) {
  const pos = side === 'right' ? { right: 90 } : { left: 90 }
  return (
    <div className="h-12 w-full relative" aria-hidden="true">
      <div
        className="absolute top-0 h-full w-0 border-l-2 border-dashed border-border-strong"
        style={pos}
      />
    </div>
  )
}

function SectionWaypoint({ numero, titulo, iconName }) {
  const Icon = ICON_MAP[iconName]
  return (
    <li className="list-none shrink-0 flex items-center gap-3 px-3 max-w-[200px]">
      <span aria-hidden="true" className="text-violeta-700 shrink-0">
        {Icon && <Icon size={22} strokeWidth={2.5} />}
      </span>
      <div className="min-w-0">
        <span className="block text-caps text-violeta-700">Etapa {numero}</span>
        <h2 className="text-h3 text-ink-strong font-bold leading-tight">
          {titulo}
        </h2>
      </div>
    </li>
  )
}

function TopicWaypoint({ item, dimmed, onAbrirTrilha, onAbrirEmBreve }) {
  const { getStatusTopico, getProgressoTopico } = useProgress()
  const status = getStatusTopico(item.id)
  const trilha = item.trilhaId ? getTrilha(item.trilhaId) : null
  const progresso = item.trilhaId ? getProgressoTopico(item.id) : null
  const v = variantPorStatus(status)

  const handleClick = () => {
    if (item.trilhaId) onAbrirTrilha?.(item.trilhaId)
    else onAbrirEmBreve?.(item)
  }

  return (
    <li className={`list-none shrink-0 w-[180px] relative group ${dimmed ? 'opacity-40' : ''}`}>
      <button
        type="button"
        onClick={handleClick}
        className={`w-full h-full text-left flex flex-col gap-2 p-4 rounded-lg border-2 ${v.bg} ${v.border} ${v.ring} cursor-pointer hover:shadow-md hover:-translate-y-0.5 transition-all`}
      >
        <NodeStatusRow status={status} progresso={progresso} />
        <h3 className={`text-h3 font-bold leading-tight ${v.title}`}>{item.titulo}</h3>
        {item.subtitulo && <p className={`text-body-sm ${v.sub}`}>{item.subtitulo}</p>}
      </button>
      {trilha && <HoverTooltip trilha={trilha} />}
    </li>
  )
}

function HoverTooltip({ trilha }) {
  const totalDesafios = trilha.desafios.length
  const xpTotal = trilha.desafios.reduce((s, d) => s + d.xp, 0)
  return (
    <div
      aria-hidden="true"
      className="absolute left-1/2 -translate-x-1/2 top-full mt-2 z-10 opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 pointer-events-none transition-opacity"
    >
      <div className="rounded-md bg-ink-strong dark:bg-surface-sunken dark:border dark:border-border-strong text-ink-on-dark dark:text-ink-strong px-3 py-2 shadow-lg text-label-sm whitespace-nowrap flex items-center gap-3">
        <span>{totalDesafios} desafios</span>
        <span className="opacity-40">•</span>
        <span className="inline-flex items-center gap-1">
          <Clock size={12} aria-hidden="true" />~{trilha.duracaoMin} min
        </span>
        <span className="opacity-40">•</span>
        <span className="inline-flex items-center gap-1 text-ambar-300 dark:text-ambar-700">
          <Zap size={12} strokeWidth={2.5} fill="currentColor" aria-hidden="true" />
          {xpTotal} XP
        </span>
      </div>
    </div>
  )
}

function ReviewWaypoint({ sectionTitle }) {
  return (
    <li className="list-none shrink-0 w-[180px]">
      <article className="w-full h-full flex items-center relative">
        <div
          aria-hidden="true"
          className="absolute top-0 left-1/2 -translate-x-1/2 w-0 border-l-2 border-dashed border-border-strong"
          style={{ height: 'calc(50% - 30px)' }}
        />
        <div className="relative w-full flex items-center gap-3 px-4 py-3 rounded-[2.5rem] border-2 bg-violeta-50 border-violeta-200">
          <RefreshCw size={20} strokeWidth={2.2} className="text-violeta-500 shrink-0" aria-hidden="true" />
          <div className="flex-1 min-w-0">
            <h3 className="text-label-md font-bold text-violeta-700 leading-tight">
              Revisão
            </h3>
            <p className="text-label-sm text-ink-muted leading-tight truncate">
              {sectionTitle}
            </p>
          </div>
          <Hammer size={14} className="text-violeta-700 shrink-0" aria-hidden="true" />
        </div>
      </article>
    </li>
  )
}

function GoalWaypoint({ titulo, subtitulo }) {
  return (
    <li className="list-none shrink-0 flex flex-col items-center w-[140px]">
      <span
        aria-hidden="true"
        className="w-24 h-24 rounded-full bg-dodger-500 text-white flex items-center justify-center shadow-lg ring-4 ring-dodger-500/20"
      >
        <Flag size={36} strokeWidth={2.5} fill="currentColor" />
      </span>
      <span className="mt-2 text-label-md font-bold text-ink-strong text-center leading-tight">
        {titulo}
      </span>
      {subtitulo && (
        <span className="text-label-sm text-ink-muted text-center leading-tight">
          {subtitulo}
        </span>
      )}
    </li>
  )
}
