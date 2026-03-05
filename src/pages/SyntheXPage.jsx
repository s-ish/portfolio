import { useReveal } from '../hooks/useReveal'

export default function SyntheXPage({ onNavigate }) {
  useReveal([])
  return (
    <div id="page-synthex" className="page active">
      <div className="container page-wrap">
        <div className="breadcrumb"><a onClick={() => onNavigate('systems')}>systems</a><span>/</span><span>synthex-prime</span></div>
        <div className="project-detail-header reveal">
          <div className="proj-tags">
            <span className="proj-tag green">Automation Platform</span>
            <span className="proj-tag blue">Discord API</span>
            <span className="proj-tag teal">Node.js</span>
          </div>
          <div className="proj-header-row" style={{display:'flex',alignItems:'center',gap:'16px',flexWrap:'wrap'}}>
            <div className="proj-name" style={{marginBottom:0}}>SyntheX Prime</div>
            <a href="https://github.com/Siddhu-og/synthex" target="_blank" rel="noopener noreferrer" className="proj-visit-btn">
              <span>Visit</span>
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true"><path d="M2.5 9.5L9.5 2.5M9.5 2.5H4.5M9.5 2.5V7.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </a>
          </div>
          <div className="proj-tagline">A 500+ command Discord automation platform and what building it taught me about modular architecture, command dispatch at scale, and keeping a large codebase from eating itself.</div>
        </div>

        <div className="case-study reveal rd1">
          <div className="cs-section">
            <div className="cs-num">01</div>
            <div className="cs-content">
              <div className="cs-label">Problem</div>
              <p className="proj-text">Early versions of SyntheX were a single growing file. Each new command was bolted onto the end of whatever existed. After a few dozen commands, changing one thing broke two others. The crypto utilities knew about the moderation tools. The sniper logic was tangled up with the profile customisation code. There was no isolation anywhere.</p>
              <p className="proj-text">The real problem was not the size. It was the coupling. I did not have 500 commands. I had one monolith that happened to handle 500 inputs. Anything that touched one feature implicitly touched all of them, and that made the whole thing impossible to extend safely.</p>
            </div>
          </div>
          <div className="cs-section">
            <div className="cs-num">02</div>
            <div className="cs-content">
              <div className="cs-label">System Design</div>
              <p className="proj-text">The solution was a fully modular command registry. Each category — moderation, crypto, sniper tools, media, customisation — became its own isolated module. Modules register their commands into a central dispatcher at startup. The dispatcher has no knowledge of what commands exist until they are registered. It resolves an incoming command string to a handler and calls it. That is the entire contract.</p>
              <div className="arch-block">{`// modules declare their own commands at startup
`}<span className="ag">registry.load([</span>{`
`}<span className="ah">  ModerationModule,   </span><span style={{color:'var(--text-3)'}}>// ban, kick, mute, role management</span>{`
`}<span className="ah">  SniperModule,       </span><span style={{color:'var(--text-3)'}}>// nitro, giveaway, privnote, token</span>{`
`}<span className="ah">  CryptoModule,       </span><span style={{color:'var(--text-3)'}}>// LTC wallet, send, price, alerts</span>{`
`}<span className="ah">  UtilityModule,      </span><span style={{color:'var(--text-3)'}}>// AFK, auto-responder, forwarding</span>{`
`}<span className="ah">  CustomisationModule,</span><span style={{color:'var(--text-3)'}}>// fonts, profile, rich presence</span>{`
`}<span className="ah">  SecurityModule,     </span><span style={{color:'var(--text-3)'}}>// token checker, phishing guard</span>{`
`}<span className="ag">])</span>{`

message.receive(input)
  → `}<span className="ah">prefix.parse(input)</span><span style={{color:'var(--text-3)'}}>{`          // strip prefix, extract command`}</span>{`
  → `}<span className="ah">registry.resolve(cmd)</span><span style={{color:'var(--text-3)'}}>{`        // find registered handler`}</span>{`
  → `}<span className="ah">validator.check(args)</span><span style={{color:'var(--text-3)'}}>{`        // validate before module sees it`}</span>{`
  → `}<span className="ag">module.execute(ctx)</span><span style={{color:'var(--text-3)'}}>{`          // dispatch to isolated handler`}</span>{`
  → `}<span className="at">logger.record(result)</span><span style={{color:'var(--text-3)'}}>{`        // async, never blocks output`}</span></div>
            </div>
          </div>
          <div className="cs-section">
            <div className="cs-num">03</div>
            <div className="cs-content">
              <div className="cs-label">Key Challenge</div>
              <p className="proj-text">The hardest part was not writing the modules. It was deciding what the boundaries should be. Commands that feel similar are not always logically related. The sniper tools and the user monitoring tools both deal with watching Discord activity, but they have completely different state requirements, timing constraints and failure modes. Treating them as one module would have recreated the coupling I was trying to eliminate.</p>
              <p className="proj-text">The other challenge was the async execution model. Some commands — nitro sniping, rate-limited API calls, crypto transaction polling — are long-running and cannot block the command loop. Each gets its own async pipeline so the dispatcher never waits on an in-progress operation. A slow crypto price fetch cannot freeze the moderation path.</p>
            </div>
          </div>
          <div className="cs-section">
            <div className="cs-num">04</div>
            <div className="cs-content">
              <div className="cs-label">What I Learned</div>
              <p className="proj-text">Scale forces clarity. When you have five commands, poor structure is annoying. When you have five hundred, it becomes a complete blocker. The modular registry pattern was not new to me in theory. SyntheX was the first time I had to apply it at a scale where getting it wrong had an immediately visible cost.</p>
              <p className="proj-text">The thing that surprised me was how much the JSON configuration system changed the maintenance story. Every module is togglable, every prefix is changeable, every log target is configurable without touching code. Separating configuration from logic meant I could change how the system behaved in production without deploying a new build. That is obvious in retrospect but it took building something at this size to actually feel why it matters.</p>
            </div>
          </div>
        </div>
        <button className="btn btn-ghost" style={{marginTop:'8px'}} onClick={() => onNavigate('autobets')}>Next: AutoBets →</button>
      </div>
    </div>
  )
}
