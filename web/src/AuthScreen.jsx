import { useState, useId } from 'react'
import { Mail, Lock, User as UserIcon, Eye, EyeOff, ArrowRight } from 'lucide-react'
import { useAuth } from './contexts/AuthContext'
import { Button } from './components/ui'

/* ============================================================
   AuthScreen, tela única com toggle entre "Entrar" e "Criar
   conta". Sem validação real: dados ficam no localStorage e a
   senha é apenas UX. Mantém alto padrão de acessibilidade -
   labels visíveis, role="alert" para erros, type="password" +
   toggle de mostrar senha com aria-pressed.
   ============================================================ */

export default function AuthScreen() {
  const [modo, setModo] = useState('login') // 'login' | 'cadastro'

  return (
    <div className="min-h-dvh flex items-center justify-center px-4 py-10 bg-surface">
      <div className="w-full max-w-md">
        <header className="flex flex-col items-center gap-3 mb-8">
          <img
            src="/logo-completa.png"
            alt="A11yLAB"
            className="w-40 h-auto block dark:hidden"
          />
          <img
            src="/logo-completa-branca.png"
            alt="A11yLAB"
            className="w-40 h-auto hidden dark:block"
          />
          <p className="text-body-md text-ink-muted text-center max-w-sm">
            Aprenda acessibilidade web na prática com trilhas, desafios e
            componentes do mundo real.
          </p>
        </header>

        <div className="bg-surface-raised border border-border rounded-lg shadow-sm overflow-hidden">
          <div
            role="tablist"
            aria-label="Modo de entrada"
            className="grid grid-cols-2 border-b border-border"
          >
            <ModoTab
              ativo={modo === 'login'}
              onClick={() => setModo('login')}
              controls="auth-form"
            >
              Entrar
            </ModoTab>
            <ModoTab
              ativo={modo === 'cadastro'}
              onClick={() => setModo('cadastro')}
              controls="auth-form"
            >
              Criar conta
            </ModoTab>
          </div>

          <div id="auth-form" className="p-6">
            {modo === 'login' ? (
              <LoginForm onTrocarPraCadastro={() => setModo('cadastro')} />
            ) : (
              <CadastroForm onTrocarPraLogin={() => setModo('login')} />
            )}
          </div>
        </div>

        <p className="mt-6 text-center text-body-sm text-ink-muted">
          Este é um mockup educacional. Suas credenciais ficam só no seu
          navegador, e nenhuma senha é verificada.
        </p>
      </div>
    </div>
  )
}

function ModoTab({ ativo, onClick, controls, children }) {
  return (
    <button
      type="button"
      role="tab"
      aria-selected={ativo}
      aria-controls={controls}
      onClick={onClick}
      className={`min-h-11 py-3 text-label-md font-bold transition-colors ${
        ativo
          ? 'bg-surface-raised text-dodger-700 border-b-2 border-dodger-500 -mb-px'
          : 'bg-surface-sunken text-ink-muted hover:bg-surface-raised hover:text-ink-strong'
      }`}
    >
      {children}
    </button>
  )
}

function LoginForm({ onTrocarPraCadastro }) {
  const { login } = useAuth()
  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')
  const [erro, setErro] = useState(null)

  const handleSubmit = (e) => {
    e.preventDefault()
    setErro(null)
    const result = login(email, senha)
    if (!result.ok) setErro(result.error)
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-4">
      <h1 className="text-h2 text-ink-strong">Bem-vinda(o) de volta!</h1>

      {erro && <ErroMsg>{erro}</ErroMsg>}

      <FormField
        label="E-mail"
        type="email"
        icon={Mail}
        value={email}
        onChange={setEmail}
        autoComplete="email"
        required
      />
      <FormField
        label="Senha"
        type="password"
        icon={Lock}
        value={senha}
        onChange={setSenha}
        autoComplete="current-password"
        required
        togglable
      />

      <Button variant="primary" type="submit" iconRight={ArrowRight} fullWidth className="mt-2">
        Entrar
      </Button>

      <p className="text-center text-body-sm text-ink-muted">
        Não tem conta?{' '}
        <button
          type="button"
          onClick={onTrocarPraCadastro}
          className="text-dodger-700 font-bold hover:text-dodger-600 underline-offset-2 hover:underline"
        >
          Criar uma agora
        </button>
      </p>
    </form>
  )
}

function CadastroForm({ onTrocarPraLogin }) {
  const { signup } = useAuth()
  const [nome, setNome] = useState('')
  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')
  const [erro, setErro] = useState(null)

  const handleSubmit = (e) => {
    e.preventDefault()
    setErro(null)
    if (!nome.trim()) {
      setErro('Como podemos te chamar? Preencha o nome.')
      return
    }
    const result = signup({ nome, email, senha })
    if (!result.ok) setErro(result.error)
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-4">
      <h1 className="text-h2 text-ink-strong">Vamos começar</h1>

      {erro && <ErroMsg>{erro}</ErroMsg>}

      <FormField
        label="Como podemos te chamar?"
        type="text"
        icon={UserIcon}
        value={nome}
        onChange={setNome}
        autoComplete="given-name"
        required
      />
      <FormField
        label="E-mail"
        type="email"
        icon={Mail}
        value={email}
        onChange={setEmail}
        autoComplete="email"
        required
      />
      <FormField
        label="Senha"
        type="password"
        icon={Lock}
        value={senha}
        onChange={setSenha}
        autoComplete="new-password"
        required
        togglable
        hint="Não validamos, então qualquer combinação serve. Mas use uma de verdade quando for prod, hein?"
      />

      <Button variant="primary" type="submit" iconRight={ArrowRight} fullWidth className="mt-2">
        Criar conta
      </Button>

      <p className="text-center text-body-sm text-ink-muted">
        Já tem conta?{' '}
        <button
          type="button"
          onClick={onTrocarPraLogin}
          className="text-dodger-700 font-bold hover:text-dodger-600 underline-offset-2 hover:underline"
        >
          Entrar com a sua
        </button>
      </p>
    </form>
  )
}

function FormField({
  label,
  type,
  icon: Icon,
  value,
  onChange,
  autoComplete,
  required,
  togglable = false,
  hint,
}) {
  const id = useId()
  const hintId = `${id}-hint`
  const [mostrar, setMostrar] = useState(false)
  const inputType = togglable && mostrar ? 'text' : type

  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="text-label-md font-semibold text-ink-strong">
        {label}
        {required && <span className="sr-only"> (obrigatório)</span>}
      </label>
      <div className="relative">
        {Icon && (
          <Icon
            size={18}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-ink-muted pointer-events-none"
            aria-hidden="true"
          />
        )}
        <input
          id={id}
          type={inputType}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          autoComplete={autoComplete}
          required={required}
          aria-describedby={hint ? hintId : undefined}
          className={`w-full h-11 ${Icon ? 'pl-11' : 'pl-3'} ${togglable ? 'pr-11' : 'pr-3'} rounded-md bg-surface border border-border text-body-md text-ink-strong focus:border-dodger-500 focus:bg-surface-raised transition-colors`}
        />
        {togglable && (
          <button
            type="button"
            onClick={() => setMostrar((v) => !v)}
            aria-pressed={mostrar}
            aria-label={mostrar ? 'Ocultar senha' : 'Mostrar senha'}
            className="absolute right-2 top-1/2 -translate-y-1/2 inline-flex items-center justify-center w-9 h-9 rounded-md text-ink-muted hover:text-ink-strong hover:bg-surface-sunken transition-colors"
          >
            {mostrar ? <EyeOff size={18} aria-hidden="true" /> : <Eye size={18} aria-hidden="true" />}
          </button>
        )}
      </div>
      {hint && (
        <p id={hintId} className="text-body-sm text-ink-muted">
          {hint}
        </p>
      )}
    </div>
  )
}

function ErroMsg({ children }) {
  return (
    <div
      role="alert"
      className="px-4 py-3 rounded-md bg-erro-50 border border-erro-100 text-erro-700 text-body-sm font-medium"
    >
      {children}
    </div>
  )
}
