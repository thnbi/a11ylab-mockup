import { useState } from 'react'
import Sidebar from './Sidebar'
import PathScreen from './PathScreen'
import TrilhaScreen from './TrilhaScreen'
import DesafioScreen from './DesafioScreen'
import ConquistasScreen from './ConquistasScreen'
import PerfilScreen from './PerfilScreen'

export default function App() {
  const [secao, setSecao] = useState('trilhas')
  const [trilhaTela, setTrilhaTela] = useState({ nome: 'path' })

  const handleSecaoChange = (s) => {
    setSecao(s)
    if (s === 'trilhas') setTrilhaTela({ nome: 'path' })
  }

  return (
    <div className="h-dvh flex bg-surface overflow-hidden">
      <Sidebar secao={secao} onChange={handleSecaoChange} xp={1240} />
      <main className="flex-1 h-full overflow-y-auto">
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
  )
}
