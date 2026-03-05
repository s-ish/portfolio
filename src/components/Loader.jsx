import { useEffect, useRef, useState } from 'react'

export default function Loader({ onDone }) {
  const hashRef = useRef(null)
  const subRef = useRef(null)
  const barRef = useRef(null)
  const [visible, setVisible] = useState(true)
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

  useEffect(() => {
    if (reducedMotion) { setVisible(false); onDone(); return }

    const TARGET = 'SISH · BACKEND SYSTEMS'
    const CHARS = '0123456789ABCDEF#@$%&!?'
    const LOCK_START = 700, LOCK_END = 3000, TOTAL_MS = 3800

    const locked = new Array(TARGET.length).fill(false)
    const lockTimes = TARGET.split('').map((_, i) =>
      LOCK_START + (i / (TARGET.length - 1)) * (LOCK_END - LOCK_START)
    )

    const hashEl = hashRef.current
    const subEl = subRef.current
    const barEl = barRef.current

    hashEl.textContent = ''
    const spans = TARGET.split('').map(() => {
      const s = document.createElement('span')
      hashEl.appendChild(s)
      return s
    })

    const subMessages = ['Resolving identity...', 'Acquiring signal...', 'Locking in...', 'Identity confirmed']
    const CHARS_LEN = CHARS.length
    const randChar = () => CHARS[Math.random() * CHARS_LEN | 0]

    function render(elapsed) {
      let lockedCount = 0
      for (let i = 0; i < TARGET.length; i++) {
        if (!locked[i] && elapsed >= lockTimes[i]) locked[i] = true
        if (locked[i]) {
          lockedCount++
          spans[i].className = 'locked'
          spans[i].textContent = TARGET[i] === ' ' ? '\u00a0' : TARGET[i]
        } else {
          const c = (TARGET[i] === ' ' || TARGET[i] === '·') ? TARGET[i] : randChar()
          spans[i].className = 'scrambling'
          spans[i].textContent = c === ' ' ? '\u00a0' : c
        }
      }
      const p = lockedCount / TARGET.length
      const msgIdx = p < 0.3 ? 0 : p < 0.7 ? 1 : p < 1 ? 2 : 3
      subEl.textContent = subMessages[msgIdx]
      subEl.classList.add('visible')
      barEl.style.width = Math.min((elapsed / TOTAL_MS) * 100, 100) + '%'
    }

    const startTime = performance.now()
    let animId
    function frame(now) {
      const elapsed = now - startTime
      render(elapsed)
      if (elapsed < TOTAL_MS) animId = requestAnimationFrame(frame)
      else { locked.fill(true); render(TOTAL_MS + 1) }
    }
    animId = requestAnimationFrame(frame)

    const exitTimer = setTimeout(() => {
      cancelAnimationFrame(animId)
      const loaderEl = document.getElementById('loader')
      if (loaderEl) {
        loaderEl.classList.add('fade-out')
        setTimeout(() => { setVisible(false); onDone() }, 580)
      }
    }, LOCK_END + 500)

    return () => { cancelAnimationFrame(animId); clearTimeout(exitTimer) }
  }, [])

  if (!visible) return null

  return (
    <div id="loader" role="status" aria-label="Loading">
      <div className="loader-hash" ref={hashRef}></div>
      <div className="loader-sub" ref={subRef}>Resolving identity</div>
      <div className="loader-bar-wrap">
        <div className="loader-bar" ref={barRef}></div>
      </div>
    </div>
  )
}
