export default function SkipLink() {
  return (
    <a
      href="#conteudo-principal"
      className="
        sr-only focus:not-sr-only
        focus:fixed focus:top-3 focus:left-3 focus:z-50
        focus:inline-flex focus:items-center
        focus:min-h-11 focus:px-4 focus:py-2
        focus:rounded-md focus:bg-dodger-500 focus:text-ink-on-dark
        focus:text-label-md focus:font-bold
        focus:shadow-lg
      "
    >
      Pular para o conteúdo
    </a>
  )
}
