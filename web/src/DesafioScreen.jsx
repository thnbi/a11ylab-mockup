import { useState } from 'react'
import {
  ChevronLeft,
  ChevronRight,
  CheckCircle2,
  XCircle,
  Sparkles,
  Clock,
} from 'lucide-react'

/* ============================================================
   Desafio: "Contraste de texto" (id 03)
   Reproduz tela-desafio.png em formato interativo.
   ============================================================ */

const desafio = {
  id: '03',
  trilha: 'Fundamentos da Acessibilidade',
  titulo: 'Contraste de texto',
  duracaoMin: 4,
  instrucao:
    'Observe o componente ao lado e identifique o problema de acessibilidade.',
  pergunta: 'Por que o botão representa uma barreira de acessibilidade?',
  opcoes: [
    { id: 'A', texto: 'O botão está pequeno demais' },
    { id: 'B', texto: 'O botão não tem contraste suficiente' },
    { id: 'C', texto: 'O rótulo não descreve claramente' },
    { id: 'D', texto: 'Não há navegação por teclado' },
  ],
  respostaCorreta: 'B',
  explicacao:
    'O contraste entre o texto (#CBD5E1) e o fundo (#FFFFFF) é de apenas 1.6:1 — muito abaixo do mínimo de 4.5:1 exigido pela WCAG AA para texto normal. Pessoas com baixa visão, daltonismo, ou usando o app em ambientes com luz forte não conseguirão ler o rótulo.',
  xpReward: 80,
}

export default function DesafioScreen({ onVoltar }) {
  const [selected, setSelected] = useState(null)
  const [confirmed, setConfirmed] = useState(false)
  const acertou = selected === desafio.respostaCorreta

  return (
    <div className="max-w-[1200px] mx-auto px-10 py-8">
      <button
        type="button"
        onClick={onVoltar}
        className="inline-flex items-center gap-1 text-label-md text-ink-muted hover:text-ink-strong transition-colors mb-4"
      >
        <ChevronLeft size={18} strokeWidth={2.5} aria-hidden="true" />
        Voltar para a trilha
      </button>

      <nav aria-label="Localização" className="mb-4">
        <ol className="flex items-center gap-2 text-body-sm text-ink-muted">
          <li>{desafio.trilha}</li>
          <li aria-hidden="true" className="text-ink-disabled">/</li>
          <li className="text-ink-strong font-medium">{desafio.titulo}</li>
        </ol>
      </nav>

      <header className="mb-8">
        <h1 className="text-display text-ink-strong">{desafio.titulo}</h1>
        <p className="mt-2 text-body-lg text-ink-muted max-w-2xl">
          {desafio.instrucao}
        </p>
        <p className="mt-3 inline-flex items-center gap-1.5 text-body-sm text-ink-muted">
          <Clock size={14} aria-hidden="true" /> ~{desafio.duracaoMin} min
        </p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Pergunta
          pergunta={desafio.pergunta}
          opcoes={desafio.opcoes}
          selected={selected}
          confirmed={confirmed}
          respostaCorreta={desafio.respostaCorreta}
          onSelect={setSelected}
          onConfirm={() => setConfirmed(true)}
        />
        <Evidencia />
      </div>

      {confirmed && (
        <Feedback
          acertou={acertou}
          explicacao={desafio.explicacao}
          xpReward={desafio.xpReward}
          respostaCorreta={desafio.respostaCorreta}
          onVoltar={onVoltar}
        />
      )}
    </div>
  )
}

/* ---------- Pergunta + opções ------------------------------------- */
function Pergunta({
  pergunta,
  opcoes,
  selected,
  confirmed,
  respostaCorreta,
  onSelect,
  onConfirm,
}) {
  return (
    <section className="bg-surface-raised border border-border rounded-lg p-6">
      <h2 className="text-h2 text-ink-strong mb-5">{pergunta}</h2>
      <ul className="space-y-3" role="radiogroup" aria-label="Opções de resposta">
        {opcoes.map((op) => (
          <li key={op.id}>
            <OptionCard
              opcao={op}
              estado={getEstado(op.id, selected, confirmed, respostaCorreta)}
              onClick={() => !confirmed && onSelect(op.id)}
            />
          </li>
        ))}
      </ul>
      {!confirmed && (
        <button
          type="button"
          onClick={onConfirm}
          disabled={!selected}
          className="mt-6 w-full px-5 py-3 rounded-md bg-dodger-500 text-ink-on-dark text-label-md font-bold hover:bg-dodger-600 disabled:bg-ink-disabled disabled:cursor-not-allowed transition-colors"
        >
          Confirmar resposta
        </button>
      )}
    </section>
  )
}

function getEstado(id, selected, confirmed, respostaCorreta) {
  if (!confirmed) {
    return selected === id ? 'selected' : 'default'
  }
  if (id === respostaCorreta) return 'correct'
  if (id === selected) return 'wrong'
  return 'dimmed'
}

function OptionCard({ opcao, estado, onClick }) {
  const cardStyles = {
    default:
      'bg-surface-sunken border-transparent text-ink hover:border-dodger-200 hover:bg-dodger-50/50',
    selected: 'bg-dodger-50 border-dodger-500 text-dodger-700 font-semibold',
    correct: 'bg-sucesso-50 border-sucesso-500 text-sucesso-700 font-semibold',
    wrong: 'bg-erro-50 border-erro-500 text-erro-700 font-semibold',
    dimmed: 'bg-surface-sunken border-transparent text-ink-muted opacity-60',
  }
  const letterStyles = {
    default: 'bg-surface-raised border border-border text-ink-muted',
    selected: 'bg-dodger-500 text-white',
    correct: 'bg-sucesso-500 text-white',
    wrong: 'bg-erro-500 text-white',
    dimmed: 'bg-surface-raised border border-border text-ink-disabled',
  }
  const interactive = estado === 'default' || estado === 'selected'

  return (
    <button
      type="button"
      role="radio"
      aria-checked={estado === 'selected' || estado === 'correct' || estado === 'wrong'}
      onClick={onClick}
      disabled={!interactive}
      className={`w-full text-left flex items-center gap-4 p-4 rounded-md border-2 transition-all ${cardStyles[estado]} ${
        interactive ? 'cursor-pointer' : 'cursor-default'
      }`}
    >
      <span
        aria-hidden="true"
        className={`w-9 h-9 shrink-0 rounded-full flex items-center justify-center font-bold text-label-md ${letterStyles[estado]}`}
      >
        {estado === 'correct' ? (
          <CheckCircle2 size={20} strokeWidth={2.5} />
        ) : estado === 'wrong' ? (
          <XCircle size={20} strokeWidth={2.5} />
        ) : (
          opcao.id
        )}
      </span>
      <span className="text-body-md flex-1">{opcao.texto}</span>
    </button>
  )
}

/* ---------- Evidência (componente em análise) --------------------- */
function Evidencia() {
  return (
    <section className="bg-surface-raised border border-border rounded-lg overflow-hidden flex flex-col">
      <header className="bg-surface-sunken border-b border-border px-4 py-2.5 flex items-center justify-between">
        <span className="font-mono text-label-sm text-ink-muted">
          Componente em análise
        </span>
        <span className="flex items-center gap-1">
          <span className="w-2 h-2 rounded-full bg-erro-500" />
          <span className="w-2 h-2 rounded-full bg-ambar-500" />
          <span className="w-2 h-2 rounded-full bg-sucesso-500" />
        </span>
      </header>
      <div className="flex-1 bg-white px-10 py-12 flex flex-col items-center justify-center">
        <p className="font-mono text-body-sm text-ink-muted mb-6">
          Finalize seu pedido para receber em casa:
        </p>
        {/* O "vilão" do desafio: botão real com baixo contraste */}
        <button
          type="button"
          className="px-8 py-3 rounded-md bg-white border text-label-md font-semibold"
          style={{ color: '#CBD5E1', borderColor: '#E2E8F0' }}
        >
          Confirmar pedido
        </button>
        <p className="mt-8 font-mono text-label-sm text-ink-disabled">
          contrast ratio: 1.6:1
        </p>
      </div>
    </section>
  )
}

/* ---------- Painel de feedback ------------------------------------ */
function Feedback({ acertou, explicacao, xpReward, respostaCorreta, onVoltar }) {
  return (
    <section
      role="status"
      aria-live="polite"
      className={`mt-6 rounded-lg p-6 border-2 ${
        acertou
          ? 'bg-sucesso-50 border-sucesso-100'
          : 'bg-erro-50 border-erro-100'
      }`}
    >
      <header className="flex items-center gap-3 mb-3 flex-wrap">
        {acertou ? (
          <CheckCircle2 size={28} className="text-sucesso-700" aria-hidden="true" />
        ) : (
          <XCircle size={28} className="text-erro-700" aria-hidden="true" />
        )}
        <h3
          className={`text-h3 font-bold ${
            acertou ? 'text-sucesso-700' : 'text-erro-700'
          }`}
        >
          {acertou
            ? 'Resposta correta!'
            : `Não foi dessa vez. A opção correta era ${respostaCorreta}.`}
        </h3>
        {acertou && (
          <span className="ml-auto inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-ambar-100 text-ambar-700 text-label-sm font-bold">
            <Sparkles size={14} aria-hidden="true" /> +{xpReward} XP
          </span>
        )}
      </header>
      <p className="text-body-md text-ink">{explicacao}</p>
      <div className="mt-5 flex gap-3">
        <button
          type="button"
          onClick={onVoltar}
          className="px-5 py-3 rounded-md bg-dodger-500 text-ink-on-dark text-label-md font-bold hover:bg-dodger-600 transition-colors inline-flex items-center gap-2"
        >
          Voltar para a trilha
          <ChevronRight size={18} strokeWidth={2.5} aria-hidden="true" />
        </button>
      </div>
    </section>
  )
}
