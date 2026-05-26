/* ============================================================
   ComparacaoCodigo, par "antes (❌) vs depois (✅)" em grid
   responsivo. Reusa CodeBlock com tones erro/sucesso.

   Props:
     - antes / depois: strings de código
     - language: linguagem para os dois blocos (default 'html')
     - labelAntes / labelDepois: rótulos opcionais
   ============================================================ */

import CodeBlock from './CodeBlock'

export default function ComparacaoCodigo({
  antes,
  depois,
  language = 'html',
  labelAntes = '❌ Antes, barreira de acessibilidade',
  labelDepois = '✅ Depois, corrigido',
  className = '',
}) {
  return (
    <div
      className={[
        'grid grid-cols-1 lg:grid-cols-2 gap-4',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
    >
      <CodeBlock language={language} label={labelAntes} tone="erro">
        {antes}
      </CodeBlock>
      <CodeBlock language={language} label={labelDepois} tone="sucesso">
        {depois}
      </CodeBlock>
    </div>
  )
}
