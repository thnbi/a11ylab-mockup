import { useEffect, useRef, useState } from 'react'
import { Compass, Trophy, User, Zap, Settings2, LogOut } from 'lucide-react'
import { useProgress } from './contexts/ProgressContext'
import { useAuth } from './contexts/AuthContext'
import { tierFor } from './data/niveis'

const navItems = [
  { id: 'trilhas', label: 'Trilhas', Icon: Compass },
  { id: 'conquistas', label: 'Conquistas', Icon: Trophy },
  { id: 'perfil', label: 'Perfil', Icon: User },
]

export default function Sidebar({ secao, onChange, onAbrirPreferencias }) {
  const { xp } = useProgress()
  const { user, logout } = useAuth()

  // Pulse no contador quando XP aumenta. Trocamos a chave do nó para
  // que a animação CSS toque do início.
  const prevXpRef = useRef(xp)
  const [pulseKey, setPulseKey] = useState(0)
  useEffect(() => {
    if (xp > prevXpRef.current) {
      setPulseKey((k) => k + 1)
    }
    prevXpRef.current = xp
  }, [xp])

  const nivel = tierFor(xp)
  const primeiroNome = user?.nome?.split(' ')[0] ?? 'Você'

  return (
    <aside className="w-60 h-full shrink-0 flex flex-col bg-surface-raised border-r border-border">
      <div className="px-6 pt-6 pb-2 flex justify-center">
        {/* Duas versões do logo: a CSS troca pela classe .dark no <html>. */}
        <a href="/" className="block" aria-label="A11yLAB - Home">
          <img
            src="/logo-completa.png"
            alt="A11yLAB"
            className="w-32 h-auto block dark:hidden"
          />
          <img
            src="/logo-completa-branca.png"
            alt=""
            aria-hidden="true"
            className="w-32 h-auto hidden dark:block"
          />
        </a>
      </div>

      <nav
        className="flex-1 px-3 py-3 overflow-y-auto"
        aria-label="Navegação principal"
        data-tour="sidebar-nav"
      >
        <ul className="space-y-1">
          {navItems.map(({ id, label, Icon }) => {
            const ativo = secao === id
            return (
              <li key={id}>
                <button
                  type="button"
                  onClick={() => onChange(id)}
                  aria-current={ativo ? 'page' : undefined}
                  className={`w-full min-h-11 flex items-center gap-3 px-3 py-2 rounded-md text-label-md transition-colors ${
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

      <div className="px-3 pb-1 space-y-1">
        <button
          type="button"
          onClick={onAbrirPreferencias}
          data-tour="acessibilidade"
          className="w-full min-h-11 flex items-center gap-3 px-3 py-2 rounded-md text-label-md text-ink-muted hover:bg-surface-sunken hover:text-ink-strong transition-colors"
        >
          <Settings2 size={20} strokeWidth={2} aria-hidden="true" />
          Acessibilidade
        </button>
        <button
          type="button"
          onClick={logout}
          className="w-full min-h-11 flex items-center gap-3 px-3 py-2 rounded-md text-label-md text-ink-muted hover:bg-erro-50 hover:text-erro-700 transition-colors"
        >
          <LogOut size={20} strokeWidth={2} aria-hidden="true" />
          Sair
        </button>
      </div>

      <div
        className="m-3 px-4 py-3 rounded-lg bg-ambar-50 border border-ambar-100 flex items-center gap-3"
        aria-label={`Olá, ${primeiroNome}. ${xp.toLocaleString('pt-BR')} pontos de experiência, nível ${nivel.nome}.`}
      >
        <span className="w-10 h-10 rounded-md bg-ambar-500 flex items-center justify-center shrink-0">
          <Zap size={20} className="text-ink-on-dark" fill="currentColor" aria-hidden="true" />
        </span>
        <div className="leading-tight min-w-0 flex-1">
          <span className="block text-label-sm font-semibold text-ink-strong truncate">
            Olá, {primeiroNome}!
          </span>
          <span
            key={pulseKey}
            className={`block text-label-md font-bold text-ink-strong tabular-nums origin-left ${
              pulseKey > 0 ? 'animate-xp-pulse' : ''
            }`}
          >
            {xp.toLocaleString('pt-BR')} XP
          </span>
          <span className="block text-caps text-ambar-700 truncate">{nivel.nome}</span>
        </div>
      </div>
    </aside>
  )
}
