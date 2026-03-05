import { useReveal } from '../hooks/useReveal'

export function AutoBetsPage({ onNavigate }) {
  useReveal([])
  return (
    <div id="page-autobets" className="page active">
      <div className="container page-wrap">
        <div className="breadcrumb"><a onClick={() => onNavigate('systems')}>systems</a><span>/</span><span>autobets</span></div>
        <div className="project-detail-header reveal">
          <div className="proj-tags">
            <span className="proj-tag blue">Game Engine</span>
            <span className="proj-tag teal">Transactions</span>
            <span className="proj-tag green">Concurrency</span>
          </div>
          <div className="proj-header-row" style={{display:'flex',alignItems:'center',gap:'16px',flexWrap:'wrap'}}>
            <div className="proj-name" style={{marginBottom:0}}>AutoBets</div>
            <a href="https://github.com/si-sh/autobets" target="_blank" rel="noopener noreferrer" className="proj-visit-btn">
              <span>GitHub</span>
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true"><path d="M2.5 9.5L9.5 2.5M9.5 2.5H4.5M9.5 2.5V7.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </a>
          </div>
          <div className="proj-tagline">A wager system that made me rebuild everything once I understood what concurrency actually does to shared state.</div>
        </div>
        <div className="case-study reveal rd1">
          <div className="cs-section">
            <div className="cs-num">01</div>
            <div className="cs-content">
              <div className="cs-label">Problem</div>
              <p className="proj-text">AutoBets started simple. User submits a wager, system rolls an outcome, balance updates. It worked fine when only one person was betting. When two users submitted wagers at the same moment, both pipelines read the same balance, both passed validation, both committed. The balance was decremented twice from the same starting value and nothing threw an error.</p>
              <p className="proj-text">The system did exactly what I told it to. The issue was I had not thought about what it means for two things to touch the same state at the same time.</p>
            </div>
          </div>
          <div className="cs-section">
            <div className="cs-num">02</div>
            <div className="cs-content">
              <div className="cs-label">System Design</div>
              <p className="proj-text">Every wager became a transaction where each step only runs if the previous one succeeded. The most important decision was where to put the balance read relative to the lock. It has to happen inside the lock. Reading before acquiring it means the value you are acting on can be stale by the time you hold it.</p>
              <div className="arch-block">{`wager.submit(userId, amount)
  → `}<span className="ah">validator.check(amount)</span><span style={{color:'var(--text-3)'}}>{`       // fast reject, no lock yet`}</span>{`
  → `}<span className="ag">lock.acquire(userId)</span><span style={{color:'var(--text-3)'}}>{`          // lock first`}</span>{`
  → `}<span className="ah">balance.read(userId)</span><span style={{color:'var(--text-3)'}}>{`           // read inside lock, always fresh`}</span>{`
  → `}<span className="ah">validator.checkBalance()</span><span style={{color:'var(--text-3)'}}>{`      // validate against real current state`}</span>{`
  → `}<span className="ag">rng.generate(params)</span>{`
  → `}<span className="at">ledger.write({"{...}"})</span><span style={{color:'var(--text-3)'}}>{`           // must succeed, precondition for mutation`}</span>{`
  → `}<span className="ag">balance.mutate(userId)</span>{`
  → `}<span className="ag">lock.release(userId)</span></div>
            </div>
          </div>
          <div className="cs-section">
            <div className="cs-num">03</div>
            <div className="cs-content">
              <div className="cs-label">Key Challenge</div>
              <p className="proj-text">The hardest thing to figure out was where the lock boundary had to be. My original code read the balance before acquiring the lock. That sounds fine until you think about what can happen in the gap between the read and the lock. Another pipeline runs, modifies the balance, releases. Now your read is stale and you are about to act on a number that no longer exists.</p>
              <p className="proj-text">Moving the read inside the lock closed that gap completely. The second problem was the order of the ledger write and the balance update. I originally updated the balance first. If the ledger write then failed, the balance had changed with no record anywhere. Flipping the order meant a failed ledger write leaves everything clean. A failed balance update after the ledger write leaves an orphaned record that is findable and fixable. I chose the failure I could live with.</p>
            </div>
          </div>
          <div className="cs-section">
            <div className="cs-num">04</div>
            <div className="cs-content">
              <div className="cs-label">What I Learned</div>
              <p className="proj-text">Concurrency bugs are quiet by nature. The system does not know it is wrong. That is what makes them genuinely worse than regular bugs. The thing that stuck with me is that a lock and a read are not two separate decisions. They are one unit. Separating them creates the exact window you were trying to close.</p>
              <p className="proj-text">The ordering lesson was broader. When you sequence operations you are choosing which failures are possible. There is no arrangement that makes all failures go away. The question is which failure leaves you in a state you can actually reason about. Silent corruption is always the worst outcome, not because it is the most dramatic but because you might not even know it happened.</p>
            </div>
          </div>
        </div>
        <button className="btn btn-ghost" style={{marginTop:'8px'}} onClick={() => onNavigate('dork')}>Next: Dork Generator Pro →</button>
      </div>
    </div>
  )
}

export function DorkPage({ onNavigate }) {
  useReveal([])
  return (
    <div id="page-dork" className="page active">
      <div className="container page-wrap">
        <div className="breadcrumb"><a onClick={() => onNavigate('systems')}>systems</a><span>/</span><span>dork-generator-pro</span></div>
        <div className="project-detail-header reveal">
          <div className="proj-tags">
            <span className="proj-tag purple">Generation System</span>
            <span className="proj-tag blue">Python</span>
            <span className="proj-tag teal">PyQt6</span>
          </div>
          <div className="proj-header-row" style={{display:'flex',alignItems:'center',gap:'16px',flexWrap:'wrap'}}>
            <div className="proj-name" style={{marginBottom:0}}>Dork Generator Pro</div>
            <a href="https://github.com/si-sh/UHQ-dorker-generator" target="_blank" rel="noopener noreferrer" className="proj-visit-btn">
              <span>GitHub</span>
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true"><path d="M2.5 9.5L9.5 2.5M9.5 2.5H4.5M9.5 2.5V7.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </a>
          </div>
          <div className="proj-tagline">A search operator tool that turns a small input set into thousands of structured queries. The real problem was keeping that output useful rather than just large.</div>
        </div>
        <div className="case-study reveal rd1">
          <div className="cs-section">
            <div className="cs-num">01</div>
            <div className="cs-content">
              <div className="cs-label">Problem</div>
              <p className="proj-text">Search engines have advanced operators like <code style={{fontFamily:'var(--mono)',fontSize:'12px',color:'var(--accent)',background:'rgba(167,139,250,0.08)',padding:'1px 6px',borderRadius:'4px'}}>site:</code>, <code style={{fontFamily:'var(--mono)',fontSize:'12px',color:'var(--accent)',background:'rgba(167,139,250,0.08)',padding:'1px 6px',borderRadius:'4px'}}>filetype:</code>, <code style={{fontFamily:'var(--mono)',fontSize:'12px',color:'var(--accent)',background:'rgba(167,139,250,0.08)',padding:'1px 6px',borderRadius:'4px'}}>inurl:</code> that are useful for security research and SEO. One keyword combined with a reasonable set of operators and parameters can produce hundreds of distinct patterns. Writing them by hand gets tedious fast.</p>
              <p className="proj-text">I wanted to automate the construction and generate thousands of structured, deduplicated queries from a small input set. The interesting engineering problem was not the searching. It was the generation itself and how to keep the output meaningful as the numbers got large.</p>
            </div>
          </div>
          <div className="cs-section">
            <div className="cs-num">02</div>
            <div className="cs-content">
              <div className="cs-label">System Design</div>
              <p className="proj-text">Three isolated layers. The generation engine handles the combinatorial logic and knows nothing about the interface. Configuration controls the engine without touching its internals. The PyQt6 interface handles input and output without any knowledge of how queries actually get built.</p>
              <div className="arch-block">{`config.load(keyword, queryType, fileTypes, size)

engine.generate(config)
  → `}<span className="ah">template.select(queryType)</span><span style={{color:'var(--text-3)'}}>{`      // pick a pattern shape`}</span>{`
  → `}<span className="ah">pools.sample(params, fileTypes)</span><span style={{color:'var(--text-3)'}}>{`  // fill in the values`}</span>{`
  → `}<span className="ag">query.construct(template, values)</span><span style={{color:'var(--text-3)'}}>{`// build the query string`}</span>{`
  → `}<span className="at">dedup.check(query)</span><span style={{color:'var(--text-3)'}}>{`               // reject if already seen`}</span>{`
  → `}<span className="ag">output.append(query)</span><span style={{color:'var(--text-3)'}}>{`             // add to result set`}</span>{`
  → `}<span style={{color:'var(--text-3)'}}>repeat until output.size === config.size</span></div>
            </div>
          </div>
          <div className="cs-section">
            <div className="cs-num">03</div>
            <div className="cs-content">
              <div className="cs-label">Key Challenge</div>
              <p className="proj-text">The problem was combinatorial explosion. When a template has multiple placeholders and each one draws from a list of values, the number of possible outputs grows multiplicatively. Four placeholder types each with 20 options gives 160,000 combinations. The naive approach builds all of that in memory before writing anything, which at that scale just crashes.</p>
              <p className="proj-text">I fixed it by expanding one placeholder type per pass and writing the intermediate output to disk before moving to the next pass. The working set in memory at any point is one intermediate file, not the final product. That kept memory bounded regardless of how large the target output was, and the generator could scale without any changes to the engine itself.</p>
            </div>
          </div>
          <div className="cs-section">
            <div className="cs-num">04</div>
            <div className="cs-content">
              <div className="cs-label">What I Learned</div>
              <p className="proj-text">The quality of a generator's output is decided before generation starts, not during it. A generator sampling randomly from poorly designed pools produces a lot of technically unique results that are not actually useful. The interesting work is in what goes into the pools and how templates are shaped. Everything after that is just mechanics.</p>
              <p className="proj-text">Staged writes are not an optimisation. When the output space is too large to hold in memory, the right structure is to never let it exist all at once. That is the correct model, not a workaround.</p>
            </div>
          </div>
        </div>
        <button className="btn btn-ghost" style={{marginTop:'8px'}} onClick={() => onNavigate('dorky')}>Next: Dorky-Dorker →</button>
      </div>
    </div>
  )
}

export function DorkyPage({ onNavigate }) {
  useReveal([])
  return (
    <div id="page-dorky" className="page active">
      <div className="container page-wrap">
        <div className="breadcrumb"><a onClick={() => onNavigate('systems')}>systems</a><span>/</span><span>dorky-dorker</span></div>
        <div className="project-detail-header reveal">
          <div className="proj-tags">
            <span className="proj-tag blue">CLI Toolkit</span>
            <span className="proj-tag purple">Python</span>
            <span className="proj-tag teal">Data Processing</span>
          </div>
          <div className="proj-header-row" style={{display:'flex',alignItems:'center',gap:'16px',flexWrap:'wrap'}}>
            <div className="proj-name" style={{marginBottom:0}}>Dorky-Dorker</div>
            <a href="https://github.com/si-sh/dorky-dorker" target="_blank" rel="noopener noreferrer" className="proj-visit-btn">
              <span>GitHub</span>
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true"><path d="M2.5 9.5L9.5 2.5M9.5 2.5H4.5M9.5 2.5V7.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </a>
          </div>
          <div className="proj-tagline">A CLI toolkit for generating and processing search queries. What started as one script grew into eight when the data and the feature needs kept expanding.</div>
        </div>
        <div className="case-study reveal rd1">
          <div className="cs-section">
            <div className="cs-num">01</div>
            <div className="cs-content">
              <div className="cs-label">Problem</div>
              <p className="proj-text">The Dork Generator produced large query datasets and once I had them I needed to work with them — shuffle, split, extract, check. Each operation became its own script. After a few of them I had a pile of disconnected tools with no consistent way to run them or chain them together.</p>
              <p className="proj-text">The friction was not any individual tool. It was the lack of structure around them. I wanted to understand how you keep a growing set of small programs usable as the collection gets bigger without each one turning into its own maintenance problem.</p>
            </div>
          </div>
          <div className="cs-section">
            <div className="cs-num">02</div>
            <div className="cs-content">
              <div className="cs-label">System Design</div>
              <p className="proj-text">Each tool is a self-contained script with one job. A CLI launcher acts as a dispatcher. It shows a menu, reads the selection, and invokes the chosen module as a subprocess. The launcher has no idea what the tools do. It only knows their names and entry points. Adding a new tool means writing one script and registering its name. The launcher never changes.</p>
              <div className="arch-block">{`launcher.run()
  → `}<span className="ah">menu.display(modules)</span><span style={{color:'var(--text-3)'}}>{`        // list registered tools`}</span>{`
  → `}<span className="ah">menu.select()</span><span style={{color:'var(--text-3)'}}>{`               // user picks one`}</span>{`
  → `}<span className="ag">subprocess.run(module.path)</span><span style={{color:'var(--text-3)'}}>{`  // invoke as isolated process`}</span>{`
  → `}<span className="at">module executes independently</span><span style={{color:'var(--text-3)'}}>{` // no shared state with launcher`}</span>{`
  → `}<span className="ag">return to menu on exit</span>{`

`}<span style={{color:'var(--text-3)'}}>// registered modules</span>{`
`}<span className="ah">generate</span>{` · `}<span className="ah">shuffle</span>{` · `}<span className="ah">reverse</span>{` · `}<span className="ah">extract</span>{`
`}<span className="ah">split</span>{`    · `}<span className="ah">suggest</span>{` · `}<span className="ah">check</span>{`   · `}<span className="ah">numgen</span></div>
            </div>
          </div>
          <div className="cs-section">
            <div className="cs-num">03</div>
            <div className="cs-content">
              <div className="cs-label">Key Challenge</div>
              <p className="proj-text">The main design decision was whether modules should share state with the launcher or run as fully isolated subprocesses. Shared state is easier to wire up. Modules can read a common context, pass data around, build on each other's output. But it means every module is coupled to every other one through that shared context, and a bug in one can silently corrupt something another module depends on.</p>
              <p className="proj-text">Subprocess isolation makes isolation the default. Each module runs in its own process, reads its own inputs, writes its own outputs and exits. There is no shared state to corrupt. The tradeoff is you cannot directly pass data between modules at runtime. But a broken module fails visibly in its own process without touching anything else. That is a trade I will take every time.</p>
            </div>
          </div>
          <div className="cs-section">
            <div className="cs-num">04</div>
            <div className="cs-content">
              <div className="cs-label">What I Learned</div>
              <p className="proj-text">The subprocess dispatch model made the toolkit easy to extend almost by accident. Because the launcher has no knowledge of the modules, adding a tool requires zero changes to existing code. Once I understood why that worked, I could think about it deliberately rather than stumbling into it. A system is easy to extend when adding a feature means writing something new rather than modifying something existing.</p>
              <p className="proj-text">Isolation also changes what failures look like. Shared state systems fail in tangled ways that are hard to trace. Isolated systems fail locally and visibly. When debugging eight independent tools, knowing exactly which one failed and exactly what state it was in makes an enormous difference.</p>
            </div>
          </div>
        </div>
        <button className="btn btn-ghost" style={{marginTop:'8px'}} onClick={() => onNavigate('engineering')}>See Engineering Notes →</button>
      </div>
    </div>
  )
}
