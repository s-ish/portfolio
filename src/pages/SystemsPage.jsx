import { useReveal } from '../hooks/useReveal'

const systems = [
  {
    key: 'mikami', tag: 'green', tagLabel: 'Automation Platform', name: 'Mikami',
    tagline: 'Started as a Discord bot, ended up as a lesson in what software architecture actually means when a codebase starts fighting back.',
    props: ['Module isolation so adding one feature cannot break another','Rate limit scheduling that treats 429s as timing signals, not errors','Per-user concurrency locks on shared state'],
  },
  {
    key: 'autobets', tag: 'blue', tagLabel: 'Probabilistic Engine', name: 'AutoBets',
    tagline: 'A wager system that exposed every wrong assumption I had about concurrent state and made me rebuild the whole pipeline.',
    props: ['TOCTOU prevention by reading inside the lock, not before it','Ledger write as a hard precondition before any state changes','Failure paths that exit cleanly before touching anything'],
  },
  {
    key: 'dork', tag: 'purple', tagLabel: 'Generation System', name: 'Dork Generator Pro',
    tagline: 'A tool that takes a small set of inputs and expands them into thousands of structured search queries. The interesting part was keeping the output useful at scale.',
    props: ['Combinatorial query construction from pools of operators and templates','Deduplication that holds across large output sets','Generation logic, config, and interface kept completely separate'],
  },
  {
    key: 'dorky', tag: null, tagLabel: 'CLI Toolkit', name: 'Dorky-Dorker',
    tagline: 'A CLI toolkit for generating and processing search queries. What started as one script grew into eight when the data and the feature needs kept expanding.',
    props: ['Template placeholders that multiply the output space without extra input','Staged pipeline processing to avoid memory pressure at scale','Each tool runs as its own subprocess so failures stay contained'],
  },
  {
    key: 'synthex', tag: 'purple', tagLabel: 'Automation System', name: 'SyntheX Prime V5',
    tagline: 'A 500+ command modular Discord selfbot. The real engineering problem was keeping that scale maintainable — where adding one module never risks breaking another.',
    props: ['8 isolated modules — security, crypto, media, moderation and more','Passive async security listeners that never block command execution','Full JSON config system — toggle modules, change prefixes, zero code changes'],
  },
]

export default function SystemsPage({ onNavigate }) {
  useReveal([])

  return (
    <div id="page-systems" className="page active">
      <div className="container page-wrap">
        <div className="section-label reveal">Systems</div>
        <h1 className="page-title reveal">Case studies.</h1>
        <p className="page-subtitle reveal" style={{maxWidth:'600px'}}>These are things I built to figure out how software actually behaves once it is running. None of them stayed simple. Each one broke in a way I did not predict, and that is where the learning happened.</p>
        <div className="system-cards reveal rd1">
          {systems.map(({ key, tag, tagLabel, name, tagline, props }) => (
            <div
              key={key}
              className="system-card glass"
              role="button" tabIndex={0}
              aria-label={`Open ${name} case study`}
              onClick={() => onNavigate(key)}
              onKeyDown={e => e.key === 'Enter' && onNavigate(key)}
            >
              <span className={`sc-tag${tag ? ' '+tag : ''}`} style={!tag ? {background:'rgba(96,165,250,0.1)',color:'var(--blue)',border:'1px solid rgba(96,165,250,0.2)'} : undefined}>{tagLabel}</span>
              <div className="sc-name">{name}</div>
              <div className="sc-tagline">{tagline}</div>
              <div className="sc-props">
                {props.map((p, i) => <div className="sc-prop" key={i}>{p}</div>)}
              </div>
              <div className="sc-arrow">Read the case study →</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
