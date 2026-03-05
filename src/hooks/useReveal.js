import { useEffect } from 'react'

export function useReveal(deps = []) {
  useEffect(() => {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const els = document.querySelectorAll('.reveal:not(.visible)')

    if (reducedMotion) {
      els.forEach(el => {
        el.classList.add('visible')
        el.querySelectorAll('.stat-bar[data-val]').forEach(b => { b.style.width = b.dataset.val + '%' })
      })
      return
    }

    const observer = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (!e.isIntersecting) return
        e.target.classList.add('visible')
        observer.unobserve(e.target)
        const bars = e.target.querySelectorAll('.stat-bar[data-val]')
        if (bars.length) requestAnimationFrame(() => bars.forEach(b => { b.style.width = b.dataset.val + '%' }))
      })
    }, { threshold: 0.07, rootMargin: '0px 0px -24px 0px' })

    els.forEach(el => observer.observe(el))

    // also animate already-visible stat bars
    document.querySelectorAll('.reveal.visible .stat-bar[data-val]').forEach(b => {
      if (!b.style.width || b.style.width === '0%')
        requestAnimationFrame(() => { b.style.width = b.dataset.val + '%' })
    })

    return () => observer.disconnect()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps)
}
