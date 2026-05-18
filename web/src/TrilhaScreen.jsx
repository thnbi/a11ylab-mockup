import {
  CheckCircle2,
  Lock,
  ChevronRight,
  ChevronLeft,
  Clock,
} from 'lucide-react'

const trilha = {
  titulo: 'Fundamentos da Acessibilidade',
  desafios: 5,
  duracaoMin: 45,
  completos: 2,
  desafiosLista: [
    { id: '01', titulo: 'Foco visível em botões', duracaoMin: 8, status: 'concluido' },
    { id: '02', titulo: 'Labels em campos de formulário', duracaoMin: 10, status: 'concluido' },
    { id: '03', titulo: 'Contraste de texto', duracaoMin: 4, status: 'disponivel' },
    { id: '04', titulo: 'Navegação por teclado', duracaoMin: 12, status: 'disponivel' },
    { id: '05', titulo: 'Imagens com texto alternativo', duracaoMin: 11, status: 'bloqueado' },
  ],
}

export default function TrilhaScreen({ onIniciar, onVoltarRoadmap }) {
  const percentual = (trilha.completos / trilha.desafios) * 100

  return (
    <div className="max-w-[1080px] mx-auto px-10 py-8">
      {onVoltarRoadmap && (
        <button
          type="button"
          onClick={onVoltarRoadmap}
          className="inline-flex items-center gap-1 text-label-md text-ink-muted hover:text-ink-strong transition-colors mb-4"
        >
          <ChevronLeft size={18} strokeWidth={2.5} aria-hidden="true" />
          Voltar ao roadmap
        </button>
      )}
      <header className="mb-6">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-violeta-100 text-violeta-700 text-label-sm font-semibold mb-3">
          Trilha em andamento
        </span>
        <h1 className="text-display text-ink-strong">{trilha.titulo}</h1>
        <p className="mt-2 inline-flex items-center gap-2 text-body-md text-ink-muted">
          <span>{trilha.desafios} desafios</span>
          <span className="text-ink-disabled">•</span>
          <span className="inline-flex items-center gap-1">
            <Clock size={16} aria-hidden="true" /> ~{trilha.duracaoMin} min
          </span>
        </p>
      </header>

      <ProgressTrilha
        completos={trilha.completos}
        total={trilha.desafios}
        percentual={percentual}
      />

      <ul className="mt-8 space-y-3">
        {trilha.desafiosLista.map((d) => (
          <li key={d.id}>
            <ChallengeCard {...d} onIniciar={() => onIniciar(d)} />
          </li>
        ))}
      </ul>
    </div>
  )
}

function ProgressTrilha({ completos, total, percentual }) {
  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <p className="text-label-sm text-ink-muted uppercase tracking-wider">
          Progresso
        </p>
        <p className="text-label-sm font-bold text-violeta-700">
          {completos} de {total} completos
        </p>
      </div>
      <div
        className="h-2.5 bg-surface-sunken rounded-full overflow-hidden"
        role="progressbar"
        aria-valuenow={completos}
        aria-valuemin={0}
        aria-valuemax={total}
        aria-label={`${completos} de ${total} desafios completos`}
      >
        <div
          className="h-full bg-violeta-500 rounded-full transition-all"
          style={{ width: `${percentual}%` }}
        />
      </div>
    </div>
  )
}

function ChallengeCard({ id, titulo, duracaoMin, status, onIniciar }) {
  if (status === 'disponivel') {
    return (
      <button
        type="button"
        onClick={onIniciar}
        className="w-full text-left group bg-surface-raised border border-border rounded-lg p-5 flex items-center gap-5 transition-all hover:border-dodger-300 hover:bg-dodger-50/40 hover:shadow-md"
      >
        <CardNumber id={id} variant="active" />
        <div className="flex-1 min-w-0">
          <h2 className="text-h2 text-ink-strong">{titulo}</h2>
          <p className="mt-1 inline-flex items-center gap-1.5 text-body-sm text-ink-muted">
            <Clock size={14} aria-hidden="true" /> ~{duracaoMin} min
          </p>
        </div>
        <span className="flex items-center gap-2 text-dodger-700 font-bold text-label-md shrink-0 group-hover:gap-3 transition-all">
          Iniciar
          <ChevronRight size={20} strokeWidth={2.5} aria-hidden="true" />
        </span>
      </button>
    )
  }

  if (status === 'concluido') {
    return (
      <article className="bg-sucesso-50/50 border border-sucesso-100 rounded-lg p-5 flex items-center gap-5">
        <CardNumber id={id} variant="success" />
        <div className="flex-1 min-w-0">
          <h2 className="text-h2 text-ink-strong">{titulo}</h2>
          <p className="mt-1 inline-flex items-center gap-1.5 text-body-sm text-ink-muted">
            <Clock size={14} aria-hidden="true" /> ~{duracaoMin} min
          </p>
        </div>
        <span className="flex items-center gap-2 text-sucesso-700 font-bold text-label-md shrink-0">
          <CheckCircle2 size={22} aria-hidden="true" />
          Concluído
        </span>
      </article>
    )
  }

  return (
    <article className="bg-surface-sunken border border-border rounded-lg p-5 flex items-center gap-5 opacity-70">
      <CardNumber id={id} variant="locked" />
      <div className="flex-1 min-w-0">
        <h2 className="text-h2 text-ink-muted">{titulo}</h2>
        <p className="mt-1 inline-flex items-center gap-1.5 text-body-sm text-ink-disabled">
          <Clock size={14} aria-hidden="true" /> ~{duracaoMin} min
        </p>
      </div>
      <span className="flex items-center gap-2 text-ink-disabled font-bold text-label-md shrink-0">
        <Lock size={18} aria-hidden="true" />
        Bloqueado
      </span>
    </article>
  )
}

function CardNumber({ id, variant }) {
  const styles = {
    active: 'bg-dodger-50 text-dodger-700',
    success: 'bg-sucesso-100 text-sucesso-700',
    locked: 'bg-surface-raised text-ink-disabled border border-border',
  }
  return (
    <span
      aria-hidden="true"
      className={`w-12 h-12 shrink-0 rounded-md flex items-center justify-center font-display text-h3 font-bold ${styles[variant]}`}
    >
      {id}
    </span>
  )
}
