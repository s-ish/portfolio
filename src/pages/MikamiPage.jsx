import { useReveal } from '../hooks/useReveal'

export default function MikamiPage({ onNavigate }) {
  useReveal([])
  return (
    <div id="page-mikami" className="page active">
      <div className="container page-wrap">
        <div className="breadcrumb"><a onClick={() => onNavigate('systems')}>systems</a><span>/</span><span>mikami</span></div>
        <div className="project-detail-header reveal">
          <div className="proj-tags">
            <span className="proj-tag green">Automation</span>
            <span className="proj-tag blue">Discord API</span>
            <span className="proj-tag teal">Node.js</span>
          </div>
          <div className="proj-header-row" style={{display:'flex',alignItems:'center',gap:'16px',flexWrap:'wrap'}}>
            <div className="proj-name" style={{marginBottom:0}}>Mikami</div>
            <a href="https://mikamiii.67mensea.workers.dev/" target="_blank" rel="noopener noreferrer" className="proj-visit-btn">
              <span>Visit</span>
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true"><path d="M2.5 9.5L9.5 2.5M9.5 2.5H4.5M9.5 2.5V7.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </a>
          </div>
          <div className="proj-tagline">A Discord automation platform and what it taught me about writing software that can actually change.</div>
        </div>

        <div className="case-study reveal rd1">
          <div className="cs-section">
            <div className="cs-num">01</div>
            <div className="cs-content">
              <div className="cs-label">Problem</div>
              <p className="proj-text">The first version of Mikami worked fine until I tried to add something new. Every feature was tangled up with every other one. Fixing a bug in the moderation logic would quietly break the economy system. There was no safe place to make a change because everything knew too much about everything else.</p>
              <p className="proj-text">I did not have a bot with separate features. I had a single file that happened to respond to Discord events. The frustration was specific enough that I wanted to actually understand what people meant when they talked about software architecture, not just read about it.</p>
            </div>
          </div>
          <div className="cs-section">
            <div className="cs-num">02</div>
            <div className="cs-content">
              <div className="cs-label">System Design</div>
              <p className="proj-text">The redesign flipped the dependency direction. Instead of the router importing modules, modules register themselves into the router at startup. The router just dispatches events to whatever handlers have been registered. It never needs to know what features exist. Adding a module means writing one file and calling register. Nothing else changes.</p>
              <div className="arch-diagram" role="img" aria-label="Mikami module dispatch architecture diagram">
                <svg viewBox="0 0 680 300" xmlns="http://www.w3.org/2000/svg" style={{background:'rgba(5,6,15,0.8)',border:'1px solid rgba(255,255,255,0.08)',borderRadius:'10px'}}>
                  <defs>
                    <marker id="arr-m" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0 L0,6 L8,3 z" fill="rgba(167,139,250,0.6)"/></marker>
                    <marker id="arr-m-teal" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0 L0,6 L8,3 z" fill="rgba(52,211,153,0.7)"/></marker>
                    <marker id="arr-m-dim" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0 L0,6 L8,3 z" fill="rgba(255,255,255,0.15)"/></marker>
                  </defs>
                  <text x="24" y="28" fontSize="10" fill="rgba(167,139,250,0.5)" letterSpacing="2" fontFamily="JetBrains Mono, monospace">MIKAMI · MODULE DISPATCH ARCHITECTURE</text>
                  <rect x="24" y="48" width="140" height="40" rx="6" fill="rgba(96,165,250,0.08)" stroke="rgba(96,165,250,0.3)" strokeWidth="1"/>
                  <text x="94" y="64" fontSize="10" fill="#60a5fa" textAnchor="middle" fontFamily="JetBrains Mono, monospace">Discord</text>
                  <text x="94" y="78" fontSize="10" fill="rgba(96,165,250,0.6)" textAnchor="middle" fontFamily="JetBrains Mono, monospace">Gateway</text>
                  <line x1="164" y1="68" x2="216" y2="68" stroke="rgba(167,139,250,0.4)" strokeWidth="1.5" markerEnd="url(#arr-m)"/>
                  <text x="190" y="62" fontSize="9" fill="rgba(255,255,255,0.2)" textAnchor="middle" fontFamily="JetBrains Mono, monospace">event</text>
                  <rect x="220" y="48" width="120" height="40" rx="6" fill="rgba(167,139,250,0.1)" stroke="rgba(167,139,250,0.4)" strokeWidth="1.5"/>
                  <text x="280" y="64" fontSize="10" fill="#a78bfa" textAnchor="middle" fontFamily="JetBrains Mono, monospace">Router</text>
                  <text x="280" y="78" fontSize="9" fill="rgba(167,139,250,0.5)" textAnchor="middle" fontFamily="JetBrains Mono, monospace">resolve · validate</text>
                  <line x1="340" y1="68" x2="390" y2="68" stroke="rgba(167,139,250,0.4)" strokeWidth="1.5" markerEnd="url(#arr-m)"/>
                  <rect x="394" y="38" width="128" height="32" rx="6" fill="rgba(52,211,153,0.07)" stroke="rgba(52,211,153,0.25)" strokeWidth="1"/>
                  <text x="458" y="55" fontSize="10" fill="#34d399" textAnchor="middle" fontFamily="JetBrains Mono, monospace">ModerationModule</text>
                  <rect x="394" y="82" width="128" height="32" rx="6" fill="rgba(52,211,153,0.07)" stroke="rgba(52,211,153,0.25)" strokeWidth="1"/>
                  <text x="458" y="99" fontSize="10" fill="#34d399" textAnchor="middle" fontFamily="JetBrains Mono, monospace">EconomyModule</text>
                  <rect x="394" y="126" width="128" height="32" rx="6" fill="rgba(74,71,96,0.3)" stroke="rgba(255,255,255,0.08)" strokeWidth="1"/>
                  <text x="458" y="143" fontSize="10" fill="rgba(148,145,168,0.8)" textAnchor="middle" fontFamily="JetBrains Mono, monospace">AnalyticsModule</text>
                  <line x1="390" y1="68" x2="394" y2="54" stroke="rgba(167,139,250,0.3)" strokeWidth="1" markerEnd="url(#arr-m)"/>
                  <line x1="390" y1="68" x2="394" y2="98" stroke="rgba(167,139,250,0.3)" strokeWidth="1" markerEnd="url(#arr-m)"/>
                  <line x1="390" y1="68" x2="394" y2="142" stroke="rgba(74,71,96,0.5)" strokeWidth="1" strokeDasharray="3,3" markerEnd="url(#arr-m-dim)"/>
                  <text x="394" y="172" fontSize="9" fill="rgba(255,255,255,0.18)" fontFamily="JetBrains Mono, monospace">async · non-blocking</text>
                  <text x="24" y="216" fontSize="9" fill="rgba(255,255,255,0.2)" letterSpacing="1" fontFamily="JetBrains Mono, monospace">REGISTRATION FLOW</text>
                  <line x1="24" y1="222" x2="632" y2="222" stroke="rgba(255,255,255,0.06)" strokeWidth="1"/>
                  <rect x="24" y="234" width="100" height="28" rx="5" fill="rgba(52,211,153,0.07)" stroke="rgba(52,211,153,0.2)" strokeWidth="1"/>
                  <text x="74" y="251" fontSize="9" fill="#34d399" textAnchor="middle" fontFamily="JetBrains Mono, monospace">Module</text>
                  <line x1="124" y1="248" x2="190" y2="248" stroke="rgba(52,211,153,0.35)" strokeWidth="1.5" markerEnd="url(#arr-m-teal)"/>
                  <text x="157" y="242" fontSize="9" fill="rgba(52,211,153,0.5)" textAnchor="middle" fontFamily="JetBrains Mono, monospace">register()</text>
                  <rect x="194" y="234" width="100" height="28" rx="5" fill="rgba(167,139,250,0.1)" stroke="rgba(167,139,250,0.35)" strokeWidth="1.5"/>
                  <text x="244" y="251" fontSize="9" fill="#a78bfa" textAnchor="middle" fontFamily="JetBrains Mono, monospace">Router</text>
                  <text x="340" y="242" fontSize="9" fill="rgba(255,255,255,0.18)" fontFamily="JetBrains Mono, monospace">Modules declare handlers</text>
                  <text x="340" y="256" fontSize="9" fill="rgba(255,255,255,0.18)" fontFamily="JetBrains Mono, monospace">Router never imports features</text>
                  <rect x="24" y="275" width="6" height="6" rx="1" fill="rgba(167,139,250,0.4)"/>
                  <text x="36" y="282" fontSize="9" fill="rgba(255,255,255,0.2)" fontFamily="JetBrains Mono, monospace">Dependency inversion — core has no knowledge of features at compile time</text>
                </svg>
              </div>
              <div className="arch-block">{`// modules announce themselves at startup
`}<span className="ag">loader.register([</span>{`
`}<span className="ah">  ModerationModule,   </span><span style={{color:'var(--text-3)'}}>// owns its handlers, validators, data</span>{`
`}<span className="ah">  EconomyModule,      </span><span style={{color:'var(--text-3)'}}>// isolated, knows nothing about Moderation</span>{`
`}<span className="ah">  AnalyticsModule,    </span><span style={{color:'var(--text-3)'}}>// observes events, never blocks them</span>{`
`}<span className="ag">])</span>{`

event
  → `}<span className="ah">router.resolve(cmd)</span><span style={{color:'var(--text-3)'}}>{`      // find the registered handler`}</span>{`
  → `}<span className="ah">validator.check(args)</span><span style={{color:'var(--text-3)'}}>{`    // validate before any module sees it`}</span>{`
  → `}<span className="ah">middleware.permissions()</span><span style={{color:'var(--text-3)'}}>{` // check access`}</span>{`
  → `}<span className="ag">module.execute(ctx)</span><span style={{color:'var(--text-3)'}}>{`      // dispatch to the right module`}</span>{`
  → `}<span className="at">analytics.track(result)</span><span style={{color:'var(--text-3)'}}>{`  // async, never on the critical path`}</span></div>
            </div>
          </div>
          <div className="cs-section">
            <div className="cs-num">03</div>
            <div className="cs-content">
              <div className="cs-label">Key Challenge</div>
              <p className="proj-text">The rate limiting problem was the most annoying to figure out. The first time Mikami hit a 429, I caught the error and retried right away, which produced another 429, which I retried again. I made it worse before I understood what was actually happening.</p>
              <p className="proj-text">A 429 is not a failure. It is the API telling you exactly when to send that request. Once I saw it that way, the fix was obvious: give each route its own queue, read the retry-after header, and hold the request until the bucket opens back up. Nothing gets dropped. The rate limiter went from causing cascading errors to being invisible.</p>
            </div>
          </div>
          <div className="cs-section">
            <div className="cs-num">04</div>
            <div className="cs-content">
              <div className="cs-label">What I Learned</div>
              <p className="proj-text">I had read about dependency inversion before building Mikami. I did not really get it until I had to live with the alternative. When the core does not depend on its features, you can add, remove or replace a feature without touching anything else. The direction of the dependency matters as much as the dependency itself.</p>
              <p className="proj-text">Gateway disconnects are not edge cases. Discord has a resume protocol because disconnects are expected. Treating reconnection as the default path rather than the fallback changed how reliable the whole thing felt in practice.</p>
            </div>
          </div>
        </div>
        <button className="btn btn-ghost" style={{marginTop:'8px'}} onClick={() => onNavigate('autobets')}>Next: AutoBets →</button>
      </div>
    </div>
  )
}
