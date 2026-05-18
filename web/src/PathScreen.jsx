import { Fragment, useState } from 'react'
import {
  Search,
  CheckCircle2,
  Sparkles,
  Lock,
  BookOpen,
  Code2,
  Palette,
  Zap,
  RefreshCw,
  Flag,
} from 'lucide-react'

/* ============================================================
   Home / Roadmap — A11yLAB
   Trilha única em padrão snake: linhas alternam direção
   (LTR ↔ RTL), e curvas SVG nas pontas conectam o fim de uma
   linha ao começo da próxima — uma cobra contínua.
   ============================================================ */

const sections = [
  {
    id: 'inicio',
    numero: 0,
    titulo: 'Início',
    Icon: BookOpen,
    topicos: [
      {
        id: 'fundamentos',
        trilhaId: 'fundamentos',
        titulo: 'Fundamentos da Acessibilidade',
        subtitulo: 'A11y, WCAG, semântica',
        status: 'em-andamento',
        progresso: '2/5 desafios',
      },
      {
        id: 'wcag',
        titulo: '4 princípios da WCAG',
        subtitulo: 'Perceptível, Operável, Compreensível, Robusto',
        status: 'bloqueado',
      },
      {
        id: 'contraste',
        titulo: 'Contraste, Cores e Leitores',
        subtitulo: 'Daltonismo e screen readers',
        status: 'bloqueado',
      },
      {
        id: 'legislacao',
        titulo: 'Legislação',
        subtitulo: 'LBI — Lei nº 13.146/2015',
        status: 'bloqueado',
      },
    ],
  },
  {
    id: 'html',
    numero: 1,
    titulo: 'Conhecendo o HTML',
    Icon: Code2,
    topicos: [
      { id: 'html-intro', titulo: 'Introdução ao HTML', subtitulo: 'Tags, elementos, atributos', status: 'bloqueado' },
      { id: 'html-semantico', titulo: 'HTML Semântico', subtitulo: 'main, nav, article, aside', status: 'bloqueado' },
      { id: 'aria', titulo: 'WAI-ARIA', subtitulo: 'Quando NÃO usar', status: 'bloqueado' },
    ],
  },
  {
    id: 'css',
    numero: 2,
    titulo: 'Estilizando com CSS',
    Icon: Palette,
    topicos: [
      { id: 'focus', titulo: 'Estados de foco', subtitulo: 'WCAG 2.4.7', status: 'bloqueado' },
      { id: 'motion', titulo: 'prefers-reduced-motion', subtitulo: 'Respeitar quem precisa de calma', status: 'bloqueado' },
      { id: 'contrast', titulo: 'Sistema de contraste', subtitulo: 'Construir uma paleta AA', status: 'bloqueado' },
    ],
  },
  {
    id: 'js',
    numero: 3,
    titulo: 'JavaScript acessível',
    Icon: Zap,
    topicos: [
      { id: 'keyboard', titulo: 'Navegação por teclado', subtitulo: 'Tab order, focus trap', status: 'bloqueado' },
      { id: 'focus-mgmt', titulo: 'Gestão de foco', subtitulo: 'Modais, drawers, menus', status: 'bloqueado' },
      { id: 'live-regions', titulo: 'Live regions', subtitulo: 'aria-live, status updates', status: 'bloqueado' },
    ],
  },
]

function buildWaypoints(sections) {
  const items = []
  sections.forEach((section) => {
    items.push({ kind: 'section', uid: `section-${section.id}`, ...section })
    section.topicos.forEach((t) => {
      items.push({ kind: 'topic', uid: `topic-${t.id}`, ...t })
    })
    items.push({
      kind: 'review',
      uid: `review-${section.id}`,
      sectionTitle: section.titulo,
      status: 'bloqueado',
    })
  })
  items.push({ kind: 'goal', uid: 'goal', titulo: 'Meta final', subtitulo: 'Domínio em acessibilidade web' })
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

export default function PathScreen({ onAbrirTrilha }) {
  const waypoints = buildWaypoints(sections)
  const rows = chunkArray(waypoints, ITEMS_PER_ROW)

  return (
    <div className="max-w-[1280px] mx-auto px-8 py-8">
      <PathHeader />
      <div className="mt-10">
        {rows.map((rowItems, rowIdx) => {
          const isReverse = rowIdx % 2 === 1
          const lastRow = rowIdx === rows.length - 1
          return (
            <Fragment key={rowIdx}>
              <SnakeRow
                items={rowItems}
                reverse={isReverse}
                onAbrirTrilha={onAbrirTrilha}
              />
              {!lastRow && (
                <InterRowConnector side={isReverse ? 'left' : 'right'} />
              )}
            </Fragment>
          )
        })}
      </div>
    </div>
  )
}

/* ---------- Header ----------------------------------------------- */
function PathHeader() {
  const [q, setQ] = useState('')
  return (
    <header className="flex items-end justify-between gap-6 flex-wrap">
      <div className="flex-1 min-w-0">
        <h1 className="text-display text-ink-strong">
          Não sabe por onde começar?
        </h1>
        <p className="mt-2 text-body-lg text-ink-muted max-w-2xl">
          Siga a trilha sugerida abaixo — do zero até dominar acessibilidade web.
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
          onChange={(e) => setQ(e.target.value)}
          className="w-full h-11 pl-11 pr-4 rounded-md bg-surface-raised border border-border text-body-md text-ink-strong focus:border-dodger-500 transition-colors"
        />
      </div>
    </header>
  )
}

/* ---------- Linha do snake (LTR ou RTL) -------------------------- */
function SnakeRow({ items, reverse, onAbrirTrilha }) {
  return (
    <ol
      className={`flex items-stretch w-full ${reverse ? 'flex-row-reverse' : 'flex-row'}`}
    >
      {items.map((item, i) => (
        <Fragment key={item.uid}>
          <WaypointItem item={item} onAbrirTrilha={onAbrirTrilha} />
          {i < items.length - 1 && <DashedConnector />}
        </Fragment>
      ))}
    </ol>
  )
}

/* ---------- Dispatcher de waypoint ------------------------------- */
function WaypointItem({ item, onAbrirTrilha }) {
  if (item.kind === 'section') return <SectionWaypoint {...item} />
  if (item.kind === 'review') return <ReviewWaypoint {...item} />
  if (item.kind === 'goal') return <GoalWaypoint {...item} />
  if (item.kind === 'topic') {
    const clickable = item.trilhaId && item.status !== 'bloqueado'
    return (
      <TopicWaypoint
        {...item}
        onClick={clickable ? () => onAbrirTrilha?.(item.trilhaId) : undefined}
      />
    )
  }
  return null
}

/* ---------- Conector horizontal tracejado ------------------------ */
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

/* ---------- Linha vertical reta entre linhas do snake ------------ */
/* Posicionada a 95px (= metade da largura do review/topic) da borda
   correspondente — alinha exatamente com o centro do primeiro item da
   próxima row, independente da largura do viewport. */
function InterRowConnector({ side }) {
  const pos = side === 'right' ? { right: 95 } : { left: 95 }
  return (
    <div className="h-12 w-full relative" aria-hidden="true">
      <div
        className="absolute top-0 h-full w-0 border-l-2 border-dashed border-border-strong"
        style={pos}
      />
    </div>
  )
}

/* ---------- Waypoint: etapa (texto direto, sem borda) ------------ */
function SectionWaypoint({ numero, titulo, Icon }) {
  return (
    <li className="list-none shrink-0 flex items-center gap-3 px-3 max-w-[200px]">
      <span aria-hidden="true" className="text-violeta-700 shrink-0">
        <Icon size={22} strokeWidth={2.5} />
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

/* ---------- Waypoint: tópico ------------------------------------- */
function TopicWaypoint({ titulo, subtitulo, status, progresso, onClick }) {
  const clickable = !!onClick

  const variant = {
    concluido: { bg: 'bg-sucesso-50', border: 'border-sucesso-200', ring: '', title: 'text-ink-strong', sub: 'text-ink-muted' },
    'em-andamento': { bg: 'bg-ambar-50', border: 'border-ambar-500', ring: 'ring-4 ring-ambar-500/20', title: 'text-ink-strong', sub: 'text-ink-muted' },
    disponivel: { bg: 'bg-surface-raised', border: 'border-border', ring: '', title: 'text-ink-strong', sub: 'text-ink-muted' },
    bloqueado: { bg: 'bg-surface-sunken', border: 'border-border', ring: '', title: 'text-ink-muted', sub: 'text-ink-disabled' },
  }
  const v = variant[status] || variant.disponivel

  const Wrapper = clickable ? 'button' : 'article'
  const props = clickable ? { type: 'button', onClick } : {}
  const interactive = clickable
    ? 'cursor-pointer hover:shadow-md hover:-translate-y-0.5 transition-all'
    : 'transition-colors'

  return (
    <li className="list-none shrink-0 w-[200px]">
      <Wrapper
        {...props}
        className={`w-full h-full text-left flex flex-col gap-2 p-4 rounded-lg border-2 ${v.bg} ${v.border} ${v.ring} ${interactive}`}
      >
        <NodeStatusRow status={status} progresso={progresso} />
        <h3 className={`text-h3 font-bold leading-tight ${v.title}`}>{titulo}</h3>
        {subtitulo && <p className={`text-body-sm ${v.sub}`}>{subtitulo}</p>}
      </Wrapper>
    </li>
  )
}

function NodeStatusRow({ status, progresso }) {
  if (status === 'em-andamento') {
    return (
      <div className="flex items-center justify-between gap-2">
        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-ambar-500 text-white text-label-sm font-bold">
          <Sparkles size={12} strokeWidth={2.5} aria-hidden="true" />
          Você está aqui
        </span>
        {progresso && (
          <span className="text-label-sm font-bold text-ambar-700">
            {progresso}
          </span>
        )}
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
  if (status === 'bloqueado') {
    return (
      <div className="flex items-center justify-end gap-2">
        <Lock size={16} className="text-ink-disabled" aria-hidden="true" />
      </div>
    )
  }
  return null
}

/* ---------- Waypoint: revisão (pill compacta + linha decorativa) - */
/* O pill é menor que os outros cards e fica centralizado vertical
   na row (items-stretch + items-center no article). Uma linha
   decorativa tracejada no centro da LI conecta o topo da row até o
   topo do pill — assim a linha vertical do InterRowConnector parece
   "continuar" dentro do card. */
function ReviewWaypoint({ sectionTitle, status }) {
  const unlocked = status === 'concluido'
  return (
    <li className="list-none shrink-0 w-[190px]">
      <article className="w-full h-full flex items-center relative">
        <div
          aria-hidden="true"
          className="absolute top-0 left-1/2 -translate-x-1/2 w-0 border-l-2 border-dashed border-border-strong"
          style={{ height: 'calc(50% - 30px)' }}
        />
        <div
          className={`relative w-full flex items-center gap-3 px-4 py-3 rounded-[2.5rem] border-2 bg-violeta-50 ${
            unlocked ? 'border-violeta-500' : 'border-violeta-200'
          }`}
        >
          <RefreshCw
            size={20}
            strokeWidth={2.2}
            className="text-violeta-500 shrink-0"
            aria-hidden="true"
          />
          <div className="flex-1 min-w-0">
            <h3 className="text-label-md font-bold text-violeta-700 leading-tight">
              Revisão
            </h3>
            <p className="text-label-sm text-ink-muted leading-tight truncate">
              {sectionTitle}
            </p>
          </div>
          {unlocked ? (
            <CheckCircle2
              size={18}
              className="text-violeta-700 shrink-0"
              aria-hidden="true"
            />
          ) : (
            <Lock size={14} className="text-ink-disabled shrink-0" aria-hidden="true" />
          )}
        </div>
      </article>
    </li>
  )
}

/* ---------- Waypoint: meta final --------------------------------- */
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
