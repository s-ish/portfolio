import { useEffect, useRef } from 'react'
import { useReveal } from '../hooks/useReveal'

export default function HomePage({ onNavigate }) {
  const typedRef = useRef(null)
  const timerRef = useRef(null)
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

  useReveal([])

  useEffect(() => {
    const el = typedRef.current
    if (!el) return
    if (reducedMotion) { el.textContent = 'backend systems engineer'; return }

    const phrases = ['whoami', 'backend systems engineer', 'building at the infrastructure layer', 'event-driven · transactional · fault-tolerant', 'ambitious']
    let pi = 0, ci = 0, del = false

    function type() {
      const cur = phrases[pi]
      el.textContent = del ? cur.substring(0, ci - 1) : cur.substring(0, ci + 1)
      del ? ci-- : ci++
      let spd = del ? 36 : 62
      if (!del && ci === cur.length) { spd = 2600; del = true }
      else if (del && ci === 0) { del = false; pi = (pi + 1) % phrases.length; spd = 480 }
      timerRef.current = setTimeout(type, spd)
    }
    timerRef.current = setTimeout(type, 900)
    return () => clearTimeout(timerRef.current)
  }, [])

  return (
    <div id="page-home" className="page active">
      <div className="hero hero-split">
        <div className="hero-left">
          <div className="hero-eyebrow">Backend &amp; Systems Engineer</div>
          <div className="hero-name" aria-label="Sish">Sish</div>
          <div className="hero-role">I like knowing why things break more than just making them work.</div>
          <div className="hero-terminal" aria-label="Terminal">
            <div className="terminal-dots" aria-hidden="true">
              <div className="dot r"></div><div className="dot y"></div><div className="dot g"></div>
            </div>
            <div className="t-line">
              <span className="t-prompt" aria-hidden="true">~$</span>
              <span ref={typedRef} className="t-typed" aria-live="polite"></span>
              <span className="cursor" aria-hidden="true"></span>
            </div>
            <div className="t-line" style={{marginTop:'5px'}}>
              <span className="t-prompt" style={{color:'var(--text-3)'}} aria-hidden="true"> ·</span>
              <span style={{color:'var(--text-3)'}}>focus:&nbsp;</span>
              <span className="t-val">concurrency · correctness · event-driven design</span>
            </div>
            <div className="t-line">
              <span className="t-prompt" style={{color:'var(--text-3)'}} aria-hidden="true"> ·</span>
              <span style={{color:'var(--text-3)'}}>status:&nbsp;</span>
              <span className="t-ok">learning in public</span>
            </div>
          </div>
          <div className="hero-ctas">
            <button className="btn btn-primary" onClick={() => onNavigate('systems')}>View Systems →</button>
            <button className="btn btn-secondary" onClick={() => onNavigate('engineering')}>Engineering Notes</button>
          </div>
        </div>
        <div className="hero-right">
          <div className="profile-photo-wrap" aria-label="Profile photo">
            <img src="https://files.catbox.moe/ct6xs8.jpg" alt="Sish" referrerPolicy="no-referrer" style={{width:'100%',height:'100%',objectFit:'cover',objectPosition:'center top',display:'block'}} />
          </div>
        </div>
        <div className="scroll-hint" aria-hidden="true"><div className="scroll-line"></div>scroll</div>
      </div>

      <div className="home-strip">
        <div className="container">
          <div className="home-about-inner">
            <div className="about-text reveal">
              <p>I was eleven when I started writing scripts. Not to build anything useful, I just wanted to see how the stuff I used every day actually worked under the hood. That curiosity pulled me in further than I expected.</p>
              <p>I taught myself through trial and error, mostly by breaking things and figuring out why. I ended up gravitating toward backend work because that is where all the real responsibility lives. Right now I am mostly thinking about <strong>event-driven architecture</strong> and the problems that come with concurrent state — things like race conditions, ordering guarantees and what happens when a system partially fails.</p>
              <p>Almost everything I know came from building something and watching it fall apart in an interesting way. The question that stuck with me is not <em>what should this do</em> but <em>what happens when something goes wrong.</em></p>
            </div>
            <div className="stats-card glass reveal rd1">
              <div className="stats-header">
                <div className="stats-title">Sish</div>
                <div className="stats-sub">Stats · 2026</div>
              </div>
              <div className="stats-section-label">Activity</div>
              <div className="anchor-grid">
                <div className="anchor-item"><div className="anchor-val">5</div><div className="anchor-label">Production systems</div></div>
                <div className="anchor-item"><div className="anchor-val">~4.5 years</div><div className="anchor-label">Writing software</div></div>
                <div className="anchor-item"><div className="anchor-val">Node.js</div><div className="anchor-label">Primary runtime</div></div>
                <div className="anchor-item"><div className="anchor-val">Full Stack</div><div className="anchor-label">Focus area</div></div>
              </div>
              <div className="stats-section-label" style={{marginTop:'20px'}}>Languages</div>
              {[
                ['JavaScript','4–5 yrs',96,'#f472b6'],
                ['TypeScript','2–3 yrs',75,'#f472b6'],
                ['HTML','4 yrs',89,'#60a5fa'],
                ['CSS','4 yrs',82,'#60a5fa'],
                ['Python','2 yrs',62,'#60a5fa'],
                ['Bash / Shell','2 yrs',55,'#60a5fa'],
              ].map(([name, yrs, val, color]) => (
                <div className="stat-row" key={name}>
                  <span className="stat-name">{name}</span>
                  <span className="stat-val stat-val-sm">{yrs}</span>
                  <div className="stat-bar-wrap">
                    <div className="stat-bar" data-val={val} style={{'--c': color}}></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="home-strip" style={{paddingTop:0, borderTop:'none'}}>
        <div className="container">
          <div className="section-label reveal">Featured Systems</div>
          <div className="system-cards">
            <div className="system-card glass reveal rd1" role="button" tabIndex={0} aria-label="Open Mikami case study" onClick={() => onNavigate('mikami')} onKeyDown={e => e.key==='Enter'&&onNavigate('mikami')}>
              <span className="sc-tag green">Automation Platform</span>
              <div className="sc-name">Mikami</div>
              <div className="sc-tagline">A Discord bot I kept adding features to until the whole thing became impossible to touch. So I rebuilt it.</div>
              <div className="sc-props">
                <div className="sc-prop">Modules register themselves at startup so the router never needs to know what features exist</div>
                <div className="sc-prop">Per-user locks stop two commands from stepping on each other's state</div>
                <div className="sc-prop">Rate limit responses get queued and retried at the right time instead of immediately</div>
              </div>
              <div className="sc-arrow">Open system docs →</div>
            </div>
            <div className="system-card glass reveal rd2" role="button" tabIndex={0} aria-label="Open AutoBets case study" onClick={() => onNavigate('autobets')} onKeyDown={e => e.key==='Enter'&&onNavigate('autobets')}>
              <span className="sc-tag blue">Probabilistic Engine</span>
              <div className="sc-name">AutoBets</div>
              <div className="sc-tagline">A betting engine that broke in a way I did not expect, then taught me what concurrent state actually means.</div>
              <div className="sc-props">
                <div className="sc-prop">Balance read happens inside the lock so it cannot go stale between check and use</div>
                <div className="sc-prop">Ledger write has to succeed before any balance is touched, no exceptions</div>
                <div className="sc-prop">Every transaction is replayable from the ledger</div>
              </div>
              <div className="sc-arrow">Open system docs →</div>
            </div>
          </div>
        </div>
      </div>

      <footer><div className="container"><div className="footer-inner">
        <div className="footer-left">© 2026 <span>Sish</span>. All rights reserved.</div>
        <div className="footer-right"><a href="https://github.com/si-sh" target="_blank" rel="noopener noreferrer">github.com/si-sh</a></div>
      </div></div></footer>
    </div>
  )
}
