import { useState, useEffect, useRef } from 'react'
import { NAV_LINKS, SYSTEMS_PAGES } from '../data/nav'

export default function Nav({ currentPage, onNavigate }) {
  const [menuOpen, setMenuOpen] = useState(false)
  const menuRef = useRef(null)
  const hamRef = useRef(null)

  const isActive = (key) =>
    key === currentPage || (key === 'systems' && SYSTEMS_PAGES.has(currentPage))

  const handleNav = (key) => {
    onNavigate(key)
    setMenuOpen(false)
  }

  useEffect(() => {
    const handler = (e) => {
      if (menuOpen && menuRef.current && !menuRef.current.contains(e.target) && e.target !== hamRef.current)
        setMenuOpen(false)
    }
    document.addEventListener('click', handler)
    return () => document.removeEventListener('click', handler)
  }, [menuOpen])

  return (
    <>
      <nav aria-label="Main navigation">
        <button className="nav-logo" aria-label="Go to home" onClick={() => handleNav('home')}>
          si<span>-</span>sh<span>.dev</span>
        </button>

        <ul className="nav-links" role="list">
          {NAV_LINKS.map(({ key, label }) => (
            <li key={key}>
              <button
                data-page={key}
                className={isActive(key) ? 'active' : ''}
                aria-current={isActive(key) ? 'page' : 'false'}
                aria-label={label}
                onClick={() => handleNav(key)}
              >
                {label}
              </button>
            </li>
          ))}
        </ul>

        <div className="nav-status" aria-label="Availability status">
          <div className="status-dot" aria-hidden="true"></div>
          <span>Available</span>
        </div>

        <button
          ref={hamRef}
          className={`nav-hamburger${menuOpen ? ' open' : ''}`}
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          onClick={(e) => { e.stopPropagation(); setMenuOpen(o => !o) }}
        >
          <span /><span /><span />
        </button>
      </nav>

      <div
        id="mobile-menu"
        ref={menuRef}
        className={`mobile-menu${menuOpen ? ' open' : ''}`}
        aria-hidden={!menuOpen}
      >
        <ul role="list">
          {NAV_LINKS.map(({ key, label }) => (
            <li key={key}>
              <button
                className={isActive(key) ? 'active' : ''}
                onClick={() => handleNav(key)}
              >
                {label}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </>
  )
}
