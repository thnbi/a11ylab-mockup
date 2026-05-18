import { Compass, Trophy, User, Zap } from 'lucide-react'

const navItems = [
  { id: 'trilhas', label: 'Trilhas', Icon: Compass },
  { id: 'conquistas', label: 'Conquistas', Icon: Trophy },
  { id: 'perfil', label: 'Perfil', Icon: User },
]

export default function Sidebar({ secao, onChange, xp = 1240 }) {
  return (
    <aside className="w-60 h-full shrink-0 flex flex-col bg-surface-raised border-r border-border">
      <div className="px-6 pt-6 pb-2 flex justify-center">
        <img
          src="/logo-completa.png"
          alt="A11yLAB"
          className="w-32 h-auto"
        />
      </div>
      <nav className="flex-1 px-3 py-4 overflow-y-auto" aria-label="Navegação principal">
        <ul className="space-y-1">
          {navItems.map(({ id, label, Icon }) => {
            const ativo = secao === id
            return (
              <li key={id}>
                <button
                  type="button"
                  onClick={() => onChange(id)}
                  aria-current={ativo ? 'page' : undefined}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-md text-label-md transition-colors ${
                    ativo
                      ? 'bg-dodger-50 text-dodger-700 font-semibold'
                      : 'text-ink-muted hover:bg-surface-sunken hover:text-ink-strong'
                  }`}
                >
                  <Icon size={20} strokeWidth={ativo ? 2.5 : 2} aria-hidden="true" />
                  {label}
                </button>
              </li>
            )
          })}
        </ul>
      </nav>
      <div className="m-3 px-4 py-3 rounded-lg bg-ambar-50 border border-ambar-100 flex items-center gap-3">
        <span className="w-10 h-10 rounded-md bg-ambar-500 flex items-center justify-center shrink-0">
          <Zap size={20} className="text-white" fill="currentColor" aria-hidden="true" />
        </span>
        <div className="leading-tight">
          <span className="block text-caps text-ambar-700">XP</span>
          <span className="block text-h3 font-bold text-ink-strong">
            {xp.toLocaleString('pt-BR')}{' '}
            <span className="text-body-sm font-normal text-ink-muted">pts</span>
          </span>
        </div>
      </div>
    </aside>
  )
}
