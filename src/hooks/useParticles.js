import { useEffect, useRef } from 'react'

export function useParticles(reducedMotion) {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas || reducedMotion) return
    const ctx = canvas.getContext('2d')
    let W, H, rafId, resizeTimer

    function resize() {
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      W = canvas.offsetWidth
      H = canvas.offsetHeight
      canvas.width = W * dpr
      canvas.height = H * dpr
      ctx.scale(dpr, dpr)
    }

    const ro = window.ResizeObserver
      ? new ResizeObserver(() => { clearTimeout(resizeTimer); resizeTimer = setTimeout(resize, 100) })
      : null
    if (ro) ro.observe(document.body)
    else window.addEventListener('resize', () => { clearTimeout(resizeTimer); resizeTimer = setTimeout(resize, 150) }, { passive: true })
    resize()

    const isMobile = window.innerWidth < 768
    const count = isMobile ? 50 : 110
    const stars = Array.from({ length: count }, () => ({
      x: Math.random() * (isMobile ? window.innerWidth : 2000) - (isMobile ? 0 : 1000),
      y: Math.random() * (isMobile ? window.innerHeight : 1200) - 100,
      r: Math.random() * 1.2 + 0.2,
      o: Math.random() * 0.5 + 0.1,
      do: (Math.random() - 0.5) * 0.02,
    }))

    function draw() {
      ctx.clearRect(0, 0, W, H)
      for (const s of stars) {
        s.o += s.do
        if (s.o > 0.7 || s.o < 0.05) s.do = -s.do
        s.o = Math.max(0.05, Math.min(0.7, s.o))
        ctx.globalAlpha = s.o
        ctx.beginPath()
        ctx.arc(((s.x % W) + W) % W, ((s.y % H) + H) % H, s.r, 0, 6.2832)
        ctx.fillStyle = 'rgba(200,190,255,1)'
        ctx.fill()
      }
      ctx.globalAlpha = 1
      rafId = requestAnimationFrame(draw)
    }

    const onVisibility = () => {
      if (document.hidden) { cancelAnimationFrame(rafId); rafId = null }
      else if (!rafId) draw()
    }
    document.addEventListener('visibilitychange', onVisibility)
    draw()

    return () => {
      cancelAnimationFrame(rafId)
      document.removeEventListener('visibilitychange', onVisibility)
      if (ro) ro.disconnect()
    }
  }, [reducedMotion])

  return canvasRef
}
