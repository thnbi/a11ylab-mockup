import {
  CheckCircle2,
  Clock,
  Play,
  Zap,
  Star,
  Trophy,
  Sparkles,
  BookOpen,
} from 'lucide-react'
import { getTrilha, totalDesafios, getAulasTrilha } from './data/helpers'
import { xpTotalTrilha } from './data/trilhas'
import { useProgress } from './contexts/ProgressContext'
import { BackLink, ProgressBar, Tag } from './components/ui'

/* ============================================================
   TrilhaScreen, lista de desafios em mini-path (zigzag vertical).
   Recebe `trilhaId` e busca a trilha em data/trilhas. Status de
   cada desafio vem do ProgressContext.
   ============================================================ */

export default function TrilhaScreen({
  trilhaId,
  onIniciar,
  onAbrirAula,
  onVoltarRoadmap,
}) {
  const trilha = getTrilha(trilhaId)
  const { getStatusDesafio, getProgresoTrilha, getStatusAula } = useProgress()

  if (!trilha) {
    return (
      <div className="max-w-[1200px] mx-auto px-10 py-8">
        <BackLink onClick={onVoltarRoadmap}>Voltar ao roadmap</BackLink>
        <p className="mt-8 text-body-md text-ink-muted">
          Trilha "{trilhaId}" não encontrada.
        </p>
      </div>
    )
  }

  const { concluidos, percentual } = getProgresoTrilha(trilhaId)
  const total = totalDesafios(trilhaId)
  const xpTotal = xpTotalTrilha(trilha)
  const trilhaCompleta = concluidos === total

  const aulas = getAulasTrilha(trilhaId)
  const aulaPorDesafio = Object.fromEntries(
    aulas.map((a) => [a.desafioId, a])
  )

  // Intercala: Aula(d1) → Desafio(d1) → Aula(d2) → Desafio(d2) → ...
  // Cada item carrega `tipo` para o MiniPath decidir o node.
  const itens = []
  trilha.desafios.forEach((d) => {
    const aula = aulaPorDesafio[d.id]
    if (aula) {
      itens.push({
        tipo: 'aula',
        ...aula,
        status: getStatusAula(trilhaId, aula.id),
      })
    }
    itens.push({
      tipo: 'desafio',
      ...d,
      status: getStatusDesafio(trilhaId, d.id),
    })
  })

  return (
    <div className="max-w-[1200px] mx-auto px-10 py-8">
      {onVoltarRoadmap && (
        <BackLink onClick={onVoltarRoadmap} className="mb-4 hover:bg-violet-200 rounded-2xl p-1 pr-2">
          Voltar ao roadmap
        </BackLink>
      )}

      <header className="mb-6">
        <Tag tone={trilhaCompleta ? 'success' : 'violeta'} className="mb-3">
          {trilhaCompleta ? 'Trilha concluída' : 'Trilha em andamento'}
        </Tag>
        <h1 className="text-display text-ink-strong">{trilha.titulo}</h1>
        <p className="mt-2 max-w-2xl text-body-md text-ink-muted">
          {trilha.descricao}
        </p>
        <p className="mt-3 inline-flex items-center gap-2 text-body-md text-ink-muted flex-wrap">
          <span>{total} desafios</span>
          <span className="text-ink-disabled" aria-hidden="true">•</span>
          <span className="inline-flex items-center gap-1">
            <Clock size={16} aria-hidden="true" /> ~{trilha.duracaoMin} min
          </span>
          <span className="text-ink-disabled" aria-hidden="true">•</span>
          <span className="inline-flex items-center gap-1 text-ambar-700 font-semibold">
            <Zap size={16} strokeWidth={2.5} aria-hidden="true" />
            {xpTotal} XP + {trilha.bonusFinal} bônus
          </span>
        </p>
      </header>

      <ProgressTrilha completos={concluidos} total={total} percentual={percentual} />

      <h2 className="sr-only">Caminho de aulas e desafios</h2>
      <MiniPath
        itens={itens}
        onIniciar={onIniciar}
        onAbrirAula={onAbrirAula}
        recompensaNome={trilha.recompensaNome}
        bonusFinal={trilha.bonusFinal}
        trilhaCompleta={trilhaCompleta}
      />
    </div>
  )
}

function ProgressTrilha({ completos, total, percentual }) {
  return (
    <div className="mt-2 mb-2">
      <div className="flex items-center justify-between mb-2">
        <p className="text-caps text-ink-muted">Progresso</p>
        <p className="text-label-sm font-bold text-violeta-700">
          {completos} de {total} completos
        </p>
      </div>
      <ProgressBar
        value={completos}
        max={total}
        tone={percentual === 100 ? 'sucesso' : 'violeta'}
        size="lg"
        label={`${completos} de ${total} desafios completos`}
      />
    </div>
  )
}

/* ============================================================
   Mini-path vertical: linha tracejada central, nodes alternando
   esquerda/direita. Aulas e desafios são intercalados, cada item
   tem `tipo` ('aula' | 'desafio') que decide o node renderizado.
   ============================================================ */
function MiniPath({
  itens,
  onIniciar,
  onAbrirAula,
  recompensaNome,
  bonusFinal,
  trilhaCompleta,
}) {
  return (
    <ol className="relative mt-8 flex flex-col gap-10 py-4">
      <div
        aria-hidden="true"
        className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-0 border-l-2 border-dashed border-border-strong"
      />

      {itens.map((item, i) => (
        <PathRow
          key={`${item.tipo}-${item.id}`}
          item={item}
          side={i % 2 === 0 ? 'left' : 'right'}
          onIniciar={() => onIniciar(item.id)}
          onAbrirAula={() => onAbrirAula(item.id)}
        />
      ))}

      <BossNode
        recompensaNome={recompensaNome}
        bonusFinal={bonusFinal}
        unlocked={trilhaCompleta}
      />
    </ol>
  )
}

function PathRow({ item, side, onIniciar, onAbrirAula }) {
  const tagsNaEsquerda = side === 'left'
  const ehAula = item.tipo === 'aula'
  const Info = ehAula ? AulaInfo : DesafioInfo
  const Node = ehAula ? AulaNode : DesafioNode
  const onClick = ehAula ? onAbrirAula : onIniciar

  return (
    <li className="relative grid grid-cols-[1fr_auto_1fr] items-center gap-14">
      <div className="min-w-0 flex justify-end">
        {tagsNaEsquerda && <Info item={item} alinhamento="direita" />}
      </div>
      <Node item={item} onClick={onClick} side={side} />
      <div className="min-w-0">
        {!tagsNaEsquerda && <Info item={item} alinhamento="esquerda" />}
      </div>
    </li>
  )
}

function DesafioNode({ item, onClick, side }) {
  const { id, status } = item
  const concluido = status === 'concluido'

  const deslocamento = side === 'left' ? '-translate-x-8' : 'translate-x-8'

  const styles = concluido
    ? { bg: 'bg-sucesso-500', text: 'text-white', ring: 'ring-4 ring-sucesso-100' }
    : { bg: 'bg-dodger-500', text: 'text-white', ring: 'ring-4 ring-dodger-200' }

  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={`${concluido ? 'Revisar' : 'Iniciar'} desafio ${id}: ${item.titulo}`}
      className={`
        relative shrink-0 w-20 h-20 rounded-full
        ${styles.bg} ${styles.text} ${styles.ring}
        ${deslocamento}
        flex items-center justify-center
        font-display font-bold text-h2
        shadow-md
        transition-all hover:-translate-y-0.5 hover:shadow-lg
        ${side === 'left' ? 'hover:-translate-x-9' : 'hover:translate-x-9'}
      `}
    >
      {concluido ? <CheckCircle2 size={32} strokeWidth={2.5} /> : id}
    </button>
  )
}

function DesafioInfo({ item, alinhamento }) {
  const { titulo, duracaoMin, status, xp, dificuldade } = item
  const concluido = status === 'concluido'
  const disponivel = status === 'disponivel'
  const alinhar = alinhamento === 'direita' ? 'text-right items-end' : 'text-left items-start'

  return (
    <div className={`flex flex-col gap-1.5 ${alinhar}`}>
      <h3 className="text-h3 font-bold leading-tight text-ink-strong">
        {titulo}
      </h3>
      <div className="flex items-center gap-2 flex-wrap">
        <DificuldadeTag nivel={dificuldade} />
        <XPTag xp={xp} muted={concluido} />
        <span className="inline-flex items-center gap-1 text-label-sm text-ink-muted">
          <Clock size={12} aria-hidden="true" /> ~{duracaoMin} min
        </span>
      </div>
      {disponivel && (
        <span className="inline-flex items-center gap-1 text-label-sm font-bold text-dodger-700 mt-0.5">
          <Play size={12} strokeWidth={2.8} fill="currentColor" aria-hidden="true" />
          Pronto para começar
        </span>
      )}
      {concluido && (
        <span className="inline-flex items-center gap-1 text-label-sm font-semibold text-sucesso-700 mt-0.5">
          <CheckCircle2 size={14} aria-hidden="true" />
          Concluído
        </span>
      )}
    </div>
  )
}

/* ============================================================
   AulaNode / AulaInfo, versão "aula teórica" do node.
   Visual menor que o desafio (60px vs 80px), com ícone de livro,
   cor violeta para diferenciar. Status: 'vista' | 'nao-vista'.
   Aulas nunca bloqueiam, sempre clicáveis.
   ============================================================ */
function AulaNode({ item, onClick, side }) {
  const vista = item.status === 'vista'
  const deslocamento = side === 'left' ? '-translate-x-8' : 'translate-x-8'

  const styles = vista
    ? { bg: 'bg-violeta-500', text: 'text-white', ring: 'ring-4 ring-violeta-100' }
    : {
        bg: 'bg-surface-raised',
        text: 'text-violeta-700',
        ring: 'ring-2 ring-violeta-200',
      }

  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={`${vista ? 'Revisar' : 'Abrir'} aula: ${item.titulo}`}
      className={`
        relative shrink-0 w-16 h-16 rounded-full
        ${styles.bg} ${styles.text} ${styles.ring}
        ${deslocamento}
        flex items-center justify-center
        shadow-md
        transition-all hover:-translate-y-0.5 hover:shadow-lg
        ${side === 'left' ? 'hover:-translate-x-9' : 'hover:translate-x-9'}
      `}
    >
      <BookOpen size={26} strokeWidth={2.4} aria-hidden="true" />
    </button>
  )
}

function AulaInfo({ item, alinhamento }) {
  const { titulo, descricao, duracaoMin, status } = item
  const vista = status === 'vista'
  const alinhar = alinhamento === 'direita' ? 'text-right items-end' : 'text-left items-start'

  return (
    <div className={`flex flex-col gap-1.5 ${alinhar}`}>
      <div className="flex items-center gap-2 flex-wrap">
        <Tag tone="violeta" size="sm" icon={BookOpen}>
          Aula
        </Tag>
        {vista && (
          <Tag tone="success" size="sm" icon={CheckCircle2}>
            Vista
          </Tag>
        )}
      </div>
      <h3 className="text-h3 font-bold leading-tight text-ink-strong">
        {titulo}
      </h3>
      {descricao && (
        <p className="text-body-sm text-ink-muted max-w-xs leading-snug">
          {descricao}
        </p>
      )}
      <span className="inline-flex items-center gap-1 text-label-sm text-ink-muted mt-0.5">
        <Clock size={12} aria-hidden="true" /> ~{duracaoMin} min de leitura
      </span>
    </div>
  )
}

function DificuldadeTag({ nivel }) {
  const labels = { 1: 'Fácil', 2: 'Médio', 3: 'Difícil' }
  const colors = {
    1: 'bg-sucesso-50 text-sucesso-700',
    2: 'bg-ambar-50 text-ambar-700',
    3: 'bg-erro-50 text-erro-700',
  }
  return (
    <span
      className={`inline-flex items-center gap-0.5 px-2 py-0.5 rounded-full text-label-sm font-semibold ${colors[nivel]}`}
    >
      <span className="inline-flex" aria-hidden="true">
        {[1, 2, 3].map((i) => (
          <Star
            key={i}
            size={11}
            strokeWidth={2.5}
            fill={i <= nivel ? 'currentColor' : 'none'}
            className={i <= nivel ? '' : 'opacity-40'}
          />
        ))}
      </span>
      {labels[nivel]}
    </span>
  )
}

function XPTag({ xp, muted }) {
  return (
    <Tag tone={muted ? 'neutral' : 'xp'} size="sm" icon={Zap} iconFill>
      +{xp} XP
    </Tag>
  )
}

function BossNode({ recompensaNome, bonusFinal, unlocked }) {
  return (
    <li className="relative grid grid-cols-[1fr_auto_1fr] items-center gap-4 mt-2">
      <div className="min-w-0" />
      <div
        className={`
          relative shrink-0 w-32 h-32 rounded-full
          flex flex-col items-center justify-center
          ${unlocked
            ? 'bg-gradient-to-br from-ambar-500 to-violeta-600 text-white ring-8 ring-ambar-100'
            : 'bg-surface-sunken border-2 border-dashed border-border-strong text-ink-muted'
          }
          shadow-lg
        `}
        aria-label={unlocked ? `Recompensa: ${recompensaNome}` : 'Recompensa final'}
      >
        {unlocked ? (
          <>
            <Trophy size={42} strokeWidth={2.5} aria-hidden="true" />
            <Sparkles
              size={16}
              strokeWidth={2.5}
              className="absolute top-2 right-3 text-white opacity-80"
              aria-hidden="true"
            />
            <Sparkles
              size={12}
              strokeWidth={2.5}
              className="absolute bottom-3 left-3 text-white opacity-70"
              aria-hidden="true"
            />
          </>
        ) : (
          <Trophy size={36} strokeWidth={2.2} aria-hidden="true" />
        )}
      </div>
      <div className="min-w-0 flex flex-col gap-1.5 items-start">
        <Tag tone="xp" size="md" icon={Sparkles}>
          Recompensa final
        </Tag>
        <h3 className="text-h3 font-bold text-ink-strong leading-tight">
          Conquista &ldquo;{recompensaNome}&rdquo;
        </h3>
        <p className="text-body-sm text-ink-muted">
          {unlocked
            ? 'Trilha concluída, recompensa desbloqueada!'
            : 'Termine todos os desafios para desbloquear.'}
        </p>
        <Tag tone="xp" size="sm" icon={Zap} iconFill>
          +{bonusFinal} XP bônus
        </Tag>
      </div>
    </li>
  )
}
