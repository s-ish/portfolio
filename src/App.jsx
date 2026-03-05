import { useState, useEffect, useRef } from 'react'
import Loader from './components/Loader'
import Nav from './components/Nav'
import HomePage from './pages/HomePage'
import SystemsPage from './pages/SystemsPage'
import MikamiPage from './pages/MikamiPage'
import { AutoBetsPage, DorkPage, DorkyPage } from './pages/ProjectPages'
import SyntheXPage from './pages/SyntheXPage'
import EngineeringPage from './pages/EngineeringPage'
import FailuresPage from './pages/FailuresPage'
import NotesPage from './pages/NotesPage'
import ContactPage from './pages/ContactPage'
import { useParticles } from './hooks/useParticles'

const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

const PAGES = {
  home: HomePage,
  systems: SystemsPage,
  mikami: MikamiPage,
  synthex: SyntheXPage,
  autobets: AutoBetsPage,
  dork: DorkPage,
  dorky: DorkyPage,
  engineering: EngineeringPage,
  failures: FailuresPage,
  notes: NotesPage,
  contact: ContactPage,
}

export default function App() {
  const [currentPage, setCurrentPage] = useState('home')
  const [animating, setAnimating] = useState(false)
  const [loaded, setLoaded] = useState(false)
  const canvasRef = useParticles(reducedMotion)

  const navigate = (key) => {
    if (!PAGES[key] || key === currentPage) return
    setAnimating(true)
    setCurrentPage(key)
    try { window.scrollTo({ top: 0, behavior: 'instant' }) } catch { window.scrollTo(0, 0) }
    setTimeout(() => setAnimating(false), 400)
  }

  const PageComponent = PAGES[currentPage]

  return (
    <>
      <a href="#main-content" className="skip-link">Skip to content</a>
      <div id="space-bg" aria-hidden="true"></div>
      <canvas id="particles" ref={canvasRef} aria-hidden="true"></canvas>

      {!loaded && <Loader onDone={() => setLoaded(true)} />}

      <Nav currentPage={currentPage} onNavigate={navigate} />

      <main id="main-content">
        <div className={animating ? 'animating' : ''} key={currentPage}>
          <PageComponent onNavigate={navigate} />
        </div>
      </main>
    </>
  )
}
