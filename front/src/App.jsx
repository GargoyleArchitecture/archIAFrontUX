import { useState } from 'react'
import AtomShowcase     from './AtomShowcase'
import MoleculeShowcase from './MoleculeShowcase'

function App() {
  const [view, setView] = useState('atoms')

  if (view === 'molecules') {
    return <MoleculeShowcase onNavigate={setView} />
  }

  return <AtomShowcase onNavigate={setView} />
}

export default App
