import {
  Mail,
  User as UserIcon,
  Lock,
  BookOpen,
  CheckCircle2,
  Circle,
} from 'lucide-react'

const perfil = {
  nome: 'Chun-Li',
  email: 'chun.li@interpol.gov',
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
  return (
    <div className="max-w-[900px] mx-auto px-10 py-8">
      <header className="mb-8">
        <h1 className="text-display text-ink-strong">Perfil</h1>
      </header>

      <section className="mb-10">
        <h2 className="text-h2 text-ink-strong mb-4">Dados pessoais</h2>
        <div className="bg-surface-raised border border-border rounded-lg p-6 space-y-5">
          <FormField label="Nome" Icon={UserIcon} type="text" defaultValue={perfil.nome} />
          <FormField label="Email" Icon={Mail} type="email" defaultValue={perfil.email} />
          <FormField label="Senha" Icon={Lock} type="password" defaultValue="••••••••" />
          <div className="pt-2 flex justify-end">
            <button
              type="button"
              className="px-5 py-2.5 rounded-md bg-dodger-500 text-ink-on-dark text-label-md font-bold hover:bg-dodger-600 transition-colors"
            >
              Salvar alterações
            </button>
          </div>
        </div>
      </section>

      <section>
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

function FormField({ label, Icon, type, defaultValue }) {
  const id = `field-${label.toLowerCase()}`
  return (
    <div>
      <label
        htmlFor={id}
        className="block text-label-md text-ink-strong font-semibold mb-2"
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
          className="w-full h-11 pl-11 pr-4 rounded-md bg-surface border border-border text-body-md text-ink-strong focus:border-dodger-500 focus:bg-surface-raised transition-colors"
        />
      </div>
    </div>
  )
}

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
        <div className="mt-3 h-1.5 bg-surface-sunken rounded-full overflow-hidden max-w-md">
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
