import { useState } from 'react'
import Sidebar from './Sidebar'
import PathScreen from './PathScreen'
import TrilhaScreen from './TrilhaScreen'
import DesafioScreen from './DesafioScreen'
import ConquistasScreen from './ConquistasScreen'
import PerfilScreen from './PerfilScreen'
import SkipLink from './components/SkipLink'
import PreferenciasDialog from './components/PreferenciasDialog'

export default function App() {
  const [secao, setSecao] = useState('trilhas')
  const [trilhaTela, setTrilhaTela] = useState({ nome: 'path' })
  const [prefsOpen, setPrefsOpen] = useState(false)

  const handleSecaoChange = (s) => {
    setSecao(s)
    if (s === 'trilhas') setTrilhaTela({ nome: 'path' })
  }

  return (
    <>
      <SkipLink />
      <div className="h-dvh flex bg-surface overflow-hidden">
        <Sidebar
          secao={secao}
          onChange={handleSecaoChange}
          xp={1240}
          onAbrirPreferencias={() => setPrefsOpen(true)}
        />
        <main
          id="conteudo-principal"
          tabIndex={-1}
          className="flex-1 min-w-0 h-full overflow-y-auto overflow-x-hidden focus:outline-none"
        >
          {secao === 'trilhas' && trilhaTela.nome === 'path' && (
            <PathScreen
              onAbrirTrilha={(trilhaId) => setTrilhaTela({ nome: 'trilha', trilhaId })}
            />
          )}
          {secao === 'trilhas' && trilhaTela.nome === 'trilha' && (
            <TrilhaScreen
              onIniciar={(desafio) =>
                setTrilhaTela((s) => ({ nome: 'desafio', trilhaId: s.trilhaId, desafio }))
              }
              onVoltarRoadmap={() => setTrilhaTela({ nome: 'path' })}
            />
          )}
          {secao === 'trilhas' && trilhaTela.nome === 'desafio' && (
            <DesafioScreen
              desafio={trilhaTela.desafio}
              onVoltar={() =>
                setTrilhaTela((s) => ({ nome: 'trilha', trilhaId: s.trilhaId }))
              }
            />
          )}
          {secao === 'conquistas' && <ConquistasScreen />}
          {secao === 'perfil' && <PerfilScreen />}
        </main>
      </div>

      <PreferenciasDialog open={prefsOpen} onClose={() => setPrefsOpen(false)} />
    </>
  )
}
