import { useEffect, useRef } from 'react'
import { X, Monitor, Sun, Moon, Type, Eye, Activity, BookOpenCheck, RotateCcw } from 'lucide-react'
import { usePreferences } from '../contexts/PreferencesContext'

export default function PreferenciasDialog({ open, onClose }) {
  const dialogRef = useRef(null)
  const { prefs, update, reset } = usePreferences()

  // Sincroniza estado React com o <dialog> nativo
  useEffect(() => {
    const dlg = dialogRef.current
    if (!dlg) return
    if (open && !dlg.open) dlg.showModal()
    if (!open && dlg.open) dlg.close()
  }, [open])

  // Fecha ao cancelar (Esc) — emite onClose para sincronizar estado React
  useEffect(() => {
    const dlg = dialogRef.current
    if (!dlg) return
    const onCancel = (e) => {
      e.preventDefault()
      onClose()
    }
    dlg.addEventListener('cancel', onCancel)
    return () => dlg.removeEventListener('cancel', onCancel)
  }, [onClose])

  // Clique no backdrop (fora do conteúdo) fecha
  const handleBackdropClick = (e) => {
    if (e.target === dialogRef.current) onClose()
  }

  return (
    <dialog
      ref={dialogRef}
      onClick={handleBackdropClick}
      aria-labelledby="prefs-titulo"
    >
      <div className="w-[min(560px,calc(100vw-2rem))] max-h-[90vh] overflow-y-auto bg-surface-raised border border-border rounded-lg shadow-lg">
        <header className="sticky top-0 z-10 bg-surface-raised border-b border-border px-6 py-4 flex items-center justify-between gap-4">
          <h2 id="prefs-titulo" className="text-h2 text-ink-strong">
            Preferências de acessibilidade
          </h2>
          <button
            type="button"
            onClick={onClose}
            aria-label="Fechar preferências"
            className="inline-flex items-center justify-center w-11 h-11 rounded-md text-ink-muted hover:text-ink-strong hover:bg-surface-sunken transition-colors"
          >
            <X size={20} strokeWidth={2} aria-hidden="true" />
          </button>
        </header>

        <div className="px-6 py-5 space-y-6">
          <ThemeSection prefs={prefs} update={update} />
          <FontScaleSection prefs={prefs} update={update} />
          <SwitchSection
            Icon={Eye}
            title="Alto contraste"
            description="Aumenta o contraste de textos secundários e bordas."
            checked={prefs.altoContraste}
            onChange={(v) => update({ altoContraste: v })}
          />
          <SwitchSection
            Icon={Activity}
            title="Reduzir movimento"
            description="Desativa transições e animações da interface."
            checked={prefs.reduzirMovimento}
            onChange={(v) => update({ reduzirMovimento: v })}
          />
          <SwitchSection
            Icon={BookOpenCheck}
            title="Fonte para dislexia"
            description="Usa Atkinson Hyperlegible, fonte otimizada para baixa visão."
            checked={prefs.fonteDislexia}
            onChange={(v) => update({ fonteDislexia: v })}
          />
        </div>

        <footer className="sticky bottom-0 bg-surface-raised border-t border-border px-6 py-4 flex items-center justify-between gap-3 flex-wrap">
          <button
            type="button"
            onClick={reset}
            className="inline-flex items-center gap-2 min-h-11 px-3 py-2 rounded-md text-ink-muted hover:text-ink-strong hover:bg-surface-sunken text-label-md font-medium transition-colors"
          >
            <RotateCcw size={16} strokeWidth={2.2} aria-hidden="true" />
            Restaurar padrões
          </button>
          <button
            type="button"
            onClick={onClose}
            className="min-h-11 px-5 py-2 rounded-md bg-dodger-500 text-ink-on-dark text-label-md font-bold hover:bg-dodger-600 transition-colors"
          >
            Fechar
          </button>
        </footer>
      </div>
    </dialog>
  )
}

/* ---------- Seção: Tema ----------------------------------------- */
const TEMAS = [
  { value: 'claro',   label: 'Claro',   Icon: Sun },
  { value: 'escuro',  label: 'Escuro',  Icon: Moon },
  { value: 'sistema', label: 'Sistema', Icon: Monitor },
]

function ThemeSection({ prefs, update }) {
  return (
    <section aria-labelledby="prefs-tema">
      <SectionHeader Icon={Sun} id="prefs-tema" title="Tema visual" description="Modo claro reduz luz azul à noite — modo escuro reduz brilho geral." />
      <div role="radiogroup" aria-labelledby="prefs-tema" className="grid grid-cols-3 gap-2">
        {TEMAS.map(({ value, label, Icon }) => {
          const ativo = prefs.theme === value
          return (
            <button
              key={value}
              type="button"
              role="radio"
              aria-checked={ativo}
              onClick={() => update({ theme: value })}
              className={`min-h-11 px-3 py-2 rounded-md border-2 flex flex-col items-center gap-1 text-label-sm font-semibold transition-colors ${
                ativo
                  ? 'border-dodger-500 bg-dodger-50 text-dodger-700'
                  : 'border-border bg-surface-raised text-ink-muted hover:border-border-strong hover:text-ink-strong'
              }`}
            >
              <Icon size={20} strokeWidth={ativo ? 2.5 : 2} aria-hidden="true" />
              {label}
            </button>
          )
        })}
      </div>
    </section>
  )
}

/* ---------- Seção: Tamanho de fonte ----------------------------- */
const ESCALAS = [
  { value: 0, label: 'Pequeno', size: '0.85em' },
  { value: 1, label: 'Padrão',  size: '1em' },
  { value: 2, label: 'Grande',  size: '1.18em' },
  { value: 3, label: 'Maior',   size: '1.35em' },
]

function FontScaleSection({ prefs, update }) {
  return (
    <section aria-labelledby="prefs-fonte">
      <SectionHeader Icon={Type} id="prefs-fonte" title="Tamanho do texto" description="Escala todo o site proporcionalmente." />
      <div role="radiogroup" aria-labelledby="prefs-fonte" className="grid grid-cols-4 gap-2">
        {ESCALAS.map(({ value, label, size }) => {
          const ativo = prefs.fontScale === value
          return (
            <button
              key={value}
              type="button"
              role="radio"
              aria-checked={ativo}
              onClick={() => update({ fontScale: value })}
              className={`min-h-11 px-2 py-2 rounded-md border-2 flex flex-col items-center justify-center gap-0.5 transition-colors ${
                ativo
                  ? 'border-dodger-500 bg-dodger-50 text-dodger-700'
                  : 'border-border bg-surface-raised text-ink-muted hover:border-border-strong hover:text-ink-strong'
              }`}
            >
              <span aria-hidden="true" className="font-display font-bold leading-none" style={{ fontSize: size }}>A</span>
              <span className="text-label-sm font-semibold">{label}</span>
            </button>
          )
        })}
      </div>
    </section>
  )
}

/* ---------- Seção genérica com switch (ARIA switch pattern) ---- */
function SwitchSection({ Icon, title, description, checked, onChange }) {
  return (
    <section className="flex items-center justify-between gap-4">
      <SectionHeader Icon={Icon} title={title} description={description} compact />
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        aria-label={title}
        onClick={() => onChange(!checked)}
        className={`relative shrink-0 inline-flex items-center w-12 h-7 rounded-full transition-colors ${
          checked ? 'bg-dodger-500' : 'bg-border-strong'
        }`}
      >
        <span
          aria-hidden="true"
          className={`absolute top-1 left-1 w-5 h-5 rounded-full bg-white shadow-sm transition-transform ${
            checked ? 'translate-x-5' : 'translate-x-0'
          }`}
        />
      </button>
    </section>
  )
}

function SectionHeader({ Icon, id, title, description, compact }) {
  return (
    <div className={compact ? 'flex-1 min-w-0' : 'mb-3'}>
      <div className="flex items-center gap-2">
        {Icon && (
          <span aria-hidden="true" className="text-violeta-700">
            <Icon size={18} strokeWidth={2.2} />
          </span>
        )}
        <h3 id={id} className="text-label-md font-bold text-ink-strong">
          {title}
        </h3>
      </div>
      {description && (
        <p className="mt-1 text-body-sm text-ink-muted">{description}</p>
      )}
    </div>
  )
}
