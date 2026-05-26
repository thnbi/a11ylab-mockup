/* ============================================================
   CodeBlock, bloco de código em fonte monoespaçada.
   Mockup sem syntax highlighting: usa apenas as classes Tailwind
   do design system. Aceita um `tone` opcional para destacar
   exemplo "ruim" (erro) vs "bom" (sucesso) no contexto antes/depois.
   ============================================================ */

const TONES = {
  neutral: {
    header: 'bg-surface-sunken text-ink-muted border-border',
    body: 'bg-surface-raised',
  },
  erro: {
    header: 'bg-erro-50 text-erro-700 border-erro-100',
    body: 'bg-surface-raised',
  },
  sucesso: {
    header: 'bg-sucesso-50 text-sucesso-700 border-sucesso-100',
    body: 'bg-surface-raised',
  },
}

export default function CodeBlock({
  language = 'html',
  label,
  tone = 'neutral',
  children,
  className = '',
}) {
  const t = TONES[tone] ?? TONES.neutral
  return (
    <figure
      className={[
        'rounded-lg border border-border overflow-hidden flex flex-col',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
    >
      {(label || language) && (
        <figcaption
          className={[
            'flex items-center justify-between px-4 py-2 border-b text-label-sm font-semibold',
            t.header,
          ].join(' ')}
        >
          <span>{label ?? language}</span>
          {label && (
            <span className="font-mono text-label-sm text-ink-muted">
              {language}
            </span>
          )}
        </figcaption>
      )}
      <pre
        className={[
          'px-4 py-3 overflow-x-auto text-body-sm leading-relaxed text-ink-strong',
          t.body,
        ].join(' ')}
      >
        <code className="font-mono whitespace-pre">{children}</code>
      </pre>
    </figure>
  )
}
