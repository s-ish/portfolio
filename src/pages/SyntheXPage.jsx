import { useReveal } from '../hooks/useReveal'

const modules = [
  {
    system: 'Security & Protection',
    items: ['Token checker and webhook scanner','Anti-nuke and anti-raid protection','Scam link and phishing domain detection','Warn / strike system with auto moderation'],
  },
  {
    system: 'Admin & Moderation',
    items: ['Role management, mute, ban, kick','Autorole, welcome & goodbye messages','Reaction roles and auto moderation rules','Vanity URL checker and anti-raid tools'],
  },
  {
    system: 'Automation & Utilities',
    items: ['Auto messaging, responder, and AFK system','Message forwarding and timezone converter','Rich presence and custom status control','Google search, notes, and quick utilities'],
  },
  {
    system: 'Crypto & Trading',
    items: ['Self-hosted Litecoin wallet with fast LTC sending','Transaction tracking and market price fetching','Currency converter and price alerts'],
  },
  {
    system: 'Media & Music',
    items: ['Spotify controls, YouTube search, lyrics finder','Soundboard and media metadata tools','Track info previews — no external dashboard needed'],
  },
  {
    system: 'Customisation & Snipers',
    items: ['Font changer, profile and emoji customisation','Deleted and edited message sniper','Nitro, giveaway, and privnote sniper tools','Text emojifier and message formatting utilities'],
  },
  {
    system: 'Developer Tools',
    items: ['Custom API integrations and webhook builders','Base64 encoder/decoder and IP lookup','Web scraping tools and code execution utilities','JSON config tools and command aliases'],
  },
  {
    system: 'Embed & Webhook Mode',
    items: ['Webhook embed responses and forwarded output','Clean logging embeds with custom branding','Webhook cleanup and structured stealthy output'],
  },
]

export default function SyntheXPage({ onNavigate }) {
  useReveal([])
  return (
    <div id="page-synthex" className="page active">
      <div className="container page-wrap">
        <div className="breadcrumb"><a onClick={() => onNavigate('systems')}>systems</a><span>/</span><span>synthex-prime</span></div>
        <div className="project-detail-header reveal">
          <div className="proj-tags">
            <span className="proj-tag purple">Automation System</span>
            <span className="proj-tag blue">Node.js</span>
            <span className="proj-tag teal">Discord API</span>
          </div>
          <div className="proj-header-row" style={{display:'flex',alignItems:'center',gap:'16px',flexWrap:'wrap'}}>
            <div className="proj-name" style={{marginBottom:0}}>SyntheX Prime V5</div>
            <a href="https://github.com/Siddhu-og/synthex/releases/latest" target="_blank" rel="noopener noreferrer" className="proj-visit-btn">
              <span>Releases</span>
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true"><path d="M2.5 9.5L9.5 2.5M9.5 2.5H4.5M9.5 2.5V7.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </a>
          </div>
          <div className="proj-tagline">A 500+ command modular Discord selfbot built for automation, security, and deep account control — designed to stay manageable at scale.</div>
        </div>

        <div className="case-study reveal rd1">
          <div className="cs-section">
            <div className="cs-num">01</div>
            <div className="cs-content">
              <div className="cs-label">Problem</div>
              <p className="proj-text">Most selfbots start as a handful of scripts and become impossible to maintain once the command count grows. Adding a feature means touching code that has nothing to do with it. Bugs in one area break things in another. The whole thing becomes a pile of conditionals with no clear shape.</p>
              <p className="proj-text">The challenge with SyntheX Prime was figuring out how to build something with 500+ commands that was still readable, extensible, and stable — where adding a new module never put anything existing at risk.</p>
            </div>
          </div>

          <div className="cs-section">
            <div className="cs-num">02</div>
            <div className="cs-content">
              <div className="cs-label">System Design</div>
              <p className="proj-text">The entire system is split into isolated modules — security, media, moderation, crypto, utilities, customisation, sniper tools and more. Each module owns its own commands, logic and state. The core dispatcher routes incoming commands to the right module without knowing what any of them do. All settings live in a JSON config — prefixes, module toggles, logging levels, API keys. No hard-coded values anywhere.</p>
              <div className="arch-block">{`command.dispatch(input)
  → `}<span className="ah">parser.resolve(prefix, command)</span><span style={{color:'var(--text-3)'}}>{`   // identify the target module`}</span>{`
  → `}<span className="ah">auth.check(context)</span><span style={{color:'var(--text-3)'}}>{`              // permissions gate`}</span>{`
  → `}<span className="ag">module.execute(args, context)</span><span style={{color:'var(--text-3)'}}>{`    // isolated execution`}</span>{`
  → `}<span className="at">logger.record(result)</span><span style={{color:'var(--text-3)'}}>{`            // structured async log`}</span>{`
  → `}<span className="ag">output.send(response)</span><span style={{color:'var(--text-3)'}}>{`            // webhook or inline`}</span></div>
            </div>
          </div>

          <div className="cs-section">
            <div className="cs-num">03</div>
            <div className="cs-content">
              <div className="cs-label">Key Challenges</div>
              <p className="proj-text">Keeping 500+ commands performant without blocking each other. Everything runs asynchronously — commands that hit external APIs, do crypto transactions, or run media lookups execute concurrently without holding up the rest of the system.</p>
              <p className="proj-text">The security module was the trickiest. Features like the scam link detector, anti-phishing protection and anti-nuke tools need to run on every relevant event without adding latency. All passive security checks fire as lightweight async listeners that never sit on the critical path of normal command execution.</p>
              <div className="arch-block">{`// passive security listeners — never block commands
event.on('messageCreate',  async e => security.scanLinks(e))
event.on('guildMemberAdd', async e => security.checkRaid(e))
event.on('webhookUpdate',  async e => security.scanWebhook(e))

// command execution runs fully separately
command.on('input', async ctx => dispatcher.route(ctx))`}</div>
            </div>
          </div>

          <div className="cs-section">
            <div className="cs-num">04</div>
            <div className="cs-content">
              <div className="cs-label">What I Learned</div>
              <p className="proj-text">Scale exposes every shortcut. At 50 commands you can get away with a flat structure. At 500, every unclear boundary becomes a maintenance problem. The modular architecture was not a design choice I made upfront — it was the thing I was forced into after the first version became unworkable. I rebuilt it properly once I understood why the original shape could not hold.</p>
              <p className="proj-text">Configuration as data rather than code is something I will not build without again. Being able to toggle an entire module, change a prefix, or reroute output without touching the codebase makes the difference between something that is easy to maintain and something that is not.</p>
            </div>
          </div>
        </div>

        <div className="section-label reveal" style={{marginTop:'48px'}}>Module Overview</div>
        <p className="reveal rd1" style={{fontSize:'13px',color:'var(--text-2)',marginBottom:'24px',maxWidth:'460px',lineHeight:'1.7'}}>8 isolated modules. Each owns its commands, logic and config. None know about the others.</p>
        <div className="constraints-grid reveal rd2">
          {modules.map(({ system, items }) => (
            <div className="constraint-card glass" key={system}>
              <div className="constraint-system">{system}</div>
              <ul className="constraint-list">
                {items.map((item, i) => <li key={i}>{item}</li>)}
              </ul>
            </div>
          ))}
        </div>

        <button className="btn btn-ghost" style={{marginTop:'32px'}} onClick={() => onNavigate('systems')}>← Back to Systems</button>
      </div>
    </div>
  )
}
