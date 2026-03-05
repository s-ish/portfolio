import { useEffect } from 'react'

export function useSmoothScroll() {
  useEffect(() => {
    let current = window.scrollY
    let target = window.scrollY
    let rafId = null
    const ease = 0.15 // lower = springier, higher = snappier

    function update() {
      current += (target - current) * ease
      if (Math.abs(target - current) < 0.5) current = target
      window.scrollTo(0, current)
      rafId = requestAnimationFrame(update)
    }

    function onWheel(e) {
      e.preventDefault()
      target += e.deltaY
      target = Math.max(0, Math.min(target, document.body.scrollHeight - window.innerHeight))
      if (!rafId) rafId = requestAnimationFrame(update)
    }

    window.addEventListener('wheel', onWheel, { passive: false })

    return () => {
      window.removeEventListener('wheel', onWheel)
      cancelAnimationFrame(rafId)
    }
  }, [])
}
