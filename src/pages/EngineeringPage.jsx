import { useState } from 'react'
import { useReveal } from '../hooks/useReveal'

const notes = [
  {
    num: '01',
    title: 'Why two operations on the same state can silently give the wrong result',
    problem: 'In AutoBets, two simultaneous wagers from different users could both pass balance validation and both commit because each one read a balance the other had not modified yet. The resulting state was wrong. Nothing had thrown an error.\n\nThis is a TOCTOU race. The state you checked at the time of check is not the state you act on at the time of use. The window between those two moments is where the bug lives.',
    reasoning: 'A wager is not a single calculation. It is a sequence of steps that need to behave as one indivisible unit. Once I saw it that way the fix became obvious. The lock has to come before the read, not after. The read and the mutation have to happen inside the same window with nothing in between.',
    solutionType: 'steps',
    solution: [
      'Acquire per-user mutex lock before reading anything',
      'Read and validate the balance inside that window',
      'Generate and validate the outcome',
      'Write the ledger record',
      'Mutate the balance',
      'Release the lock',
    ],
    solutionNote: 'The lock comes first. Every step that depends on the balance happens inside it. A second wager for the same user cannot start until the first has fully committed and released.',
  },
  {
    num: '02',
    title: 'Why retrying immediately after a 429 makes things worse',
    problem: 'Discord enforces rate limits per route bucket. When Mikami hit them, I caught the 429 and retried immediately. Which produced another 429. Which I retried again. The backlog grew and the problem compounded. I made it worse before I understood it.',
    reasoning: 'A 429 is the API telling you to wait a specific amount of time and try again at that exact moment. Once I thought of it that way, the right approach was clear. Treat outbound requests as a queue, give each route bucket its own cooldown state, and schedule retries at the right moment rather than immediately.',
    solutionType: 'bullets',
    solution: [
      'All outbound requests go through a central scheduler rather than being sent directly',
      'Each route bucket tracks its own remaining count and reset window independently',
      'A 429 causes the request to be requeued at the exact retry-after time, nothing gets dropped',
      'Bursts of activity queue cleanly instead of producing cascading errors',
    ],
  },
  {
    num: '03',
    title: 'Why writing intent before executing it changes what kind of failure is possible',
    problem: 'Early AutoBets updated the balance first, then wrote the transaction record. I did not think about the ordering until I asked what happens if the record write fails. The balance would have changed with no trace of why. No way to detect it. No way to reconstruct it.\n\nSilent inconsistency is the worst kind of failure. Not because it is dramatic but because it is invisible.',
    solutionType: 'text',
    solution: 'Reversing the order changed the failure mode entirely. The ledger write became a precondition. If it fails, nothing else runs. The balance is never touched without a record.\n\nA failed ledger write leaves the system clean. A failed balance mutation leaves an orphaned record, which is detectable and fixable. Either way there is no silent inconsistency.',
  },
  {
    num: '04',
    title: 'Why building the full output in memory before writing it is the wrong default',
    problem: 'The first Dork Generator substituted all placeholder types in one pass and built the entire dataset in memory before writing anything. With four placeholder types drawing from lists of 20 to 50 values, outputs reached hundreds of thousands of entries. The process was killed by memory pressure before finishing.',
    reasoning: 'The output does not need to fully exist before any of it is written. Each intermediate stage only needs to exist long enough to produce the next one.',
    solutionType: 'bullets',
    solution: [
      'One substitution pass per placeholder type, expand one variable, write to disk, move to next pass',
      'Memory at any point is proportional to a single intermediate file, not the final product',
      'Output can grow to any size without changing the engine',
      'Each pass is independently inspectable which makes debugging much easier',
    ],
  },
  {
    num: '05',
    title: 'Why subprocess isolation changes what failures look like in a multi-tool system',
    problem: 'My first instinct for Dorky-Dorker was to have the launcher share state with its modules through a common context object. That made inter-tool communication easy but it also meant a bug in one module could silently corrupt state that another module depended on. Failures became entangled and tracing them was genuinely painful.',
    reasoning: 'Shared state makes the failure surface of one module equal to the failure surface of the whole system. If a tool runs in isolation with its own process, its own inputs and its own outputs, its failure mode is local by construction.',
    solutionType: 'bullets',
    solution: [
      'Each module runs as an independent subprocess with no shared memory with the launcher',
      'Modules communicate through files only, read inputs, write outputs, exit',
      'A failing module crashes visibly in its own process without touching anything else',
      'Adding a new tool requires zero changes to existing code, just register a name and write a script',
    ],
  },
]

const constraints = [
  {
    system: 'SyntheX Prime',
    items: [
      'Modules register at startup and the dispatcher never imports them directly',
      'Each module is independently togglable without touching any other module',
      'Long-running command pipelines are async and must never block the dispatch loop',
      'Configuration is the only interface between the user and module behaviour',
      'Command validation happens before any module receives context',
    ],
  },
  {
    system: 'Mikami',
    items: [
      'Gateway delivers events in order within a session',
      'Each user has at most one active command pipeline at a time',
      'Module handlers are stateless and all state lives in the data layer',
      'All API requests must respect Discord route bucket limits',
      'Analytics events are non-critical and loss is acceptable but delay is not',
    ],
  },
  {
    system: 'AutoBets',
    items: [
      'Each user has a single active wager pipeline at any moment',
      'Ledger writes must succeed before balance mutation with no exceptions',
      'Balance reads must occur inside the lock window, never before acquiring it',
      'RNG failure must exit before any state mutation occurs',
      'Transaction records are immutable once written',
    ],
  },
  {
    system: 'Dork Generator Pro',
    items: [
      'Pool sizes must be large enough that collision probability stays low at target output size',
      'Templates define shape only and pools define values and neither layer touches the other',
      'Configuration is read-only to the engine and it never modifies its own config',
      'Deduplication set is the source of truth for uniqueness and no query bypasses it',
    ],
  },
  {
    system: 'Dorky-Dorker',
    items: [
      'Each module is an isolated subprocess with no shared state with the launcher',
      'Intermediate files between staged passes are the only cross-pass communication',
      'Preset lists are the engine\'s only external dependency and are swappable without code changes',
      'Launcher never imports module code and only invokes by path',
    ],
  },
  {
    num: '06',
    title: 'Why a dispatcher that knows nothing about its commands scales better than one that does',
    problem: 'Early SyntheX was a single file where each command was a branch in a growing if-else chain. The dispatcher knew about every command by name. Adding a feature meant editing the dispatcher. Editing the dispatcher meant every command could break. At 500+ commands, a change to anything touched everything.',
    reasoning: 'The problem was not the number of commands. It was that the dispatcher and the commands were the same thing. Once I separated them — modules declare what they handle, dispatcher resolves by registry lookup — adding a command became a fully isolated act. The dispatcher never changed. It had no knowledge to update.',
    solutionType: 'bullets',
    solution: [
      'Modules register their command names and handlers into a central registry at startup',
      'Dispatcher receives input, resolves the name to a registered handler, calls it with context',
      'Dispatcher has no imports from any module and no knowledge of what commands exist',
      'Adding a module requires zero changes to existing code, just write it and register it',
      'Long-running commands get their own async pipeline so they never stall the dispatch loop',
    ],
  },
]

function EngNote({ note, index }) {
  const [open, setOpen] = useState(false)
  const rdClass = index === 0 ? '' : index === 1 ? ' rd1' : index === 2 ? ' rd2' : ' rd3'
  return (
    <div className={`eng-note glass reveal${rdClass}${open ? ' open' : ''}`}>
      <div
        className="eng-note-header"
        role="button" tabIndex={0}
        aria-expanded={open}
        onClick={() => setOpen(o => !o)}
        onKeyDown={e => (e.key === 'Enter' || e.key === ' ') && setOpen(o => !o)}
      >
        <span className="eng-num">{note.num}</span>
        <span className="eng-title">{note.title}</span>
        <span className="eng-toggle" aria-hidden="true">+</span>
      </div>
      <div className="eng-note-body">
        <div className="eng-note-inner">
          <div>
            <div className="eng-block-label problem">Problem</div>
            {note.problem.split('\n\n').map((p, i) => <p className="eng-text" key={i}>{p}</p>)}
            {note.reasoning && <>
              <div className="eng-block-label reasoning" style={{marginTop:'14px'}}>Reasoning</div>
              <p className="eng-text">{note.reasoning}</p>
            </>}
          </div>
          <div>
            <div className="eng-block-label solution">Solution</div>
            {note.solutionType === 'steps' && (
              <>
                <ol className="eng-steps">
                  {note.solution.map((s, i) => (
                    <li key={i}><span className="sn">{i+1}.</span><span>{s}</span></li>
                  ))}
                </ol>
                {note.solutionNote && <p className="eng-text" style={{marginTop:'12px'}}>{note.solutionNote}</p>}
              </>
            )}
            {note.solutionType === 'bullets' && (
              <ul className="eng-bullets">
                {note.solution.map((s, i) => <li key={i}>{s}</li>)}
              </ul>
            )}
            {note.solutionType === 'text' && (
              note.solution.split('\n\n').map((p, i) => <p className="eng-text" key={i}>{p}</p>)
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default function EngineeringPage() {
  useReveal([])
  return (
    <div id="page-engineering" className="page active">
      <div className="container page-wrap">
        <div className="section-label reveal">Engineering</div>
        <h1 className="page-title reveal">How I think<br/>through problems.</h1>
        <p className="page-subtitle reveal">Problems I ran into while building, did not immediately understand, and had to actually work through. Writing them down is how I figure out what I learned.</p>

        <div className="eng-notes">
          {notes.map((note, i) => <EngNote key={note.num} note={note} index={i} />)}
        </div>

        <div className="section-label reveal" style={{marginTop:'8px'}}>System Constraints</div>
        <h2 className="reveal rd1" style={{fontSize:'18px',fontWeight:'600',letterSpacing:'-0.02em',color:'var(--text)',marginBottom:'8px'}}>What each system assumes to be true.</h2>
        <p className="reveal rd1" style={{fontSize:'13px',color:'var(--text-2)',marginBottom:'24px',maxWidth:'460px',lineHeight:'1.7'}}>Every system rests on assumptions its design does not verify. Writing them down is how you start to know where it will break.</p>
        <div className="constraints-grid reveal rd2">
          {constraints.map(({ system, items }) => (
            <div className="constraint-card glass" key={system}>
              <div className="constraint-system">{system}</div>
              <ul className="constraint-list">
                {items.map((item, i) => <li key={i}>{item}</li>)}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
