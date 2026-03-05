import { useState } from 'react'
import { useReveal } from '../hooks/useReveal'

const notes = [
  {
    id: 'note-toctou',
    path: 'race-conditions',
    title: 'TOCTOU: why where the read sits matters as much as the lock itself',
    content: (
      <>
        <p className="note-p">TOCTOU stands for Time-Of-Check to Time-Of-Use. It describes the gap between when you observe a piece of state and when you act on that observation. In that gap another operation can change what you saw.</p>
        <p className="note-p">In AutoBets, two users submitted wagers at the same time. Both pipelines read the same balance, both found it sufficient, and both committed. The balance got decremented twice from the same starting value because neither operation was aware of the other.</p>
        <p className="note-p">Adding a mutex is not enough on its own. The question is <strong>where the read happens relative to acquiring the lock</strong>. If you read before the lock, the value you're acting on can go stale by the time you hold it. The read has to happen inside the protected window to mean anything.</p>
        <div className="note-code">{`// wrong, read before lock
balance = read(userId)          `}<span style={{color:'var(--red)'}}>// TOCTOU window opens here</span>{`
lock.acquire(userId)
validate(balance, amount)       `}<span style={{color:'var(--red)'}}>// stale</span>{`

// correct, read inside lock
lock.acquire(userId)
balance = read(userId)          `}<span style={{color:'var(--teal)'}}>// always fresh</span>{`
validate(balance, amount)       `}<span style={{color:'var(--teal)'}}>// safe</span></div>
        <p className="note-p">The ordering is the guarantee. The lock and the read are not two separate things. They are one unit. Once I understood that, the rest of the wager pipeline was straightforward to reason about.</p>
      </>
    ),
  },
  {
    id: 'note-ratelimits',
    path: 'discord-rate-limits',
    title: 'Rate limits as scheduling signals, not failures',
    content: (
      <>
        <p className="note-p">Discord enforces rate limits per route bucket. Each endpoint has its own limit, its own window, and a retry-after header it sends back when you have exceeded it. The first time I hit a 429 in Mikami, I caught the error and retried. Which caused another 429. Which I retried again.</p>
        <p className="note-p">The shift that fixed it was realising a 429 is not an error in the usual sense. It is a <strong>scheduling instruction</strong>. The API is working exactly as intended and telling you to send that request at a specific point in the future. Treating it as a failure to retry immediately completely misses the point.</p>
        <div className="note-code">{`scheduler.enqueue(request)
  → check bucket.remaining
  → if depleted: wait(bucket.resetAfter)
  → send request
  → on 429: requeue after retry-after
  → on success: decrement bucket.remaining`}</div>
        <p className="note-p">Structuring the outbound layer as a per-bucket queue solved both problems at once. Requests get sent at the right time, and a burst on one endpoint does not affect timing on another. Nothing gets dropped and everything gets scheduled.</p>
      </>
    ),
  },
  {
    id: 'note-ledgers',
    path: 'transaction-ledgers',
    title: 'Ordering two operations to choose which failure mode you can live with',
    content: (
      <>
        <p className="note-p">If you update the balance first and the ledger write then fails, you have a state change with no record of it. No error to surface, no audit trail, no way to know what the correct state should be. The inconsistency is silent by construction.</p>
        <p className="note-p">Reversing the order changes the failure mode. If the ledger write fails, nothing else runs and the balance is untouched. If the ledger write succeeds and the balance update then fails, there is an orphaned record. That is <strong>recoverable</strong>. You can detect it by comparing records to balances and replay or reverse it. You know exactly what happened.</p>
        <div className="note-code">{`// correct ordering
ledger.write({ userId, amount, outcome,
  balanceBefore, balanceAfter })  `}<span style={{color:'var(--teal)'}}>// record intent</span>{`

balance.mutate(userId, delta)     `}<span style={{color:'var(--teal)'}}>// only if write succeeded</span>{`

`}<span style={{color:'var(--text-3)'}}>{`// ledger fail → clean state
// balance fail → orphan, detectable, replayable`}</span></div>
        <p className="note-p">The principle that came out of this: sequence operations so the worst reachable failure leaves you with something you can reason about. Silent inconsistency is harder to deal with than a detectable error, even if the detectable error is messier at first.</p>
      </>
    ),
  },
  {
    id: 'note-combinatorial',
    path: 'combinatorial-generation',
    title: 'Why the output space of a generator has to be designed, not discovered',
    content: (
      <>
        <p className="note-p">When you combine inputs from multiple pools, the output space grows multiplicatively. A template with four placeholder types each drawing from 30 values can produce 810,000 combinations. That sounds like abundance but the structure of that space determines whether the outputs are useful, and random sampling cannot fix a poorly designed space.</p>
        <p className="note-p">The problem I ran into was that a naive generator samples randomly and rejects duplicates. That works when the output size is small relative to the combinatorial space. As the target size approaches the space size, the generator spends more and more time producing duplicates and discarding them. If you ask for more outputs than the space contains, it loops forever.</p>
        <p className="note-p">The fix was recognising that <strong>deduplication is not where this problem should be solved</strong>. Deduplication catches collisions after the fact. The real solution is pool and template design that keeps the space large enough that collision probability stays negligible at any realistic target size. The generator's job is mechanical. The design work happens before it starts.</p>
        <div className="note-code">{`// collision probability rises as output approaches space size
space_size  = |pool_A| × |pool_B| × |pool_C| × |templates|
target_size = what you asked for

`}<span style={{color:'var(--teal)'}}>// safe: target much smaller than space_size</span>{`
collision_prob ≈ target² / (2 × space_size)

`}<span style={{color:'var(--red)'}}>// danger zone: target approaches space_size</span>{`
`}<span style={{color:'var(--text-3)'}}>// generator slows, eventually loops indefinitely</span></div>
        <p className="note-p">Staged expansion handles a different but related problem which is memory pressure. Expanding one placeholder type per pass and writing intermediate results to disk keeps memory proportional to one file. These are two separate concerns. Output space design prevents logical failure. Staged processing prevents resource failure.</p>
      </>
    ),
  },
  {
    id: 'note-isolation',
    path: 'process-isolation',
    title: 'Shared state makes failures entangled. Isolated processes make them local.',
    content: (
      <>
        <p className="note-p">When I first designed Dorky-Dorker, the plan was to have the launcher maintain a shared context that modules could read from and write to. A tool finishes, leaves its results in the context, the next tool picks them up. Intuitive and easy to think about.</p>
        <p className="note-p">The problem showed up when something went wrong. A module that crashed or produced unexpected output did not just fail. It left the shared context in a partially modified state. The next module read that state, behaved unexpectedly, and produced output that was wrong in a way that looked plausible. Debugging meant tracing through several tools to find where the corruption started.</p>
        <p className="note-p"><strong>Shared state couples the failure modes of every component that touches it.</strong> One module's bug becomes every subsequent module's problem. The failure surface of the system is the union of all its parts.</p>
        <div className="note-code">{`// shared state model, failure propagates
launcher.context = {}
module_A.run(context)  `}<span style={{color:'var(--red)'}}>// corrupts context on error</span>{`
module_B.run(context)  `}<span style={{color:'var(--red)'}}>// reads corrupted state, wrong output</span>{`

// subprocess model, failure is contained
subprocess.run('module_a.py')  `}<span style={{color:'var(--teal)'}}>// crashes in its own process</span>{`
subprocess.run('module_b.py')  `}<span style={{color:'var(--teal)'}}>// unaffected, reads its own inputs</span></div>
        <p className="note-p">Subprocess isolation makes each module's failure local by construction. A crash stays in that process. The launcher catches the exit code, reports it, and continues. No shared state is corrupted. Every other module is unaffected. The cost is that modules cannot share data in memory and communication goes through files. That is a real constraint but predictable local failures are worth it.</p>
      </>
    ),
  },
]

export default function NotesPage() {
  const [activeNote, setActiveNote] = useState('note-toctou')
  useReveal([activeNote])

  return (
    <div id="page-notes" className="page active">
      <div className="container page-wrap">
        <div className="section-label reveal">Notes</div>
        <h1 className="page-title reveal">Notes on things<br/>I had to think through.</h1>
        <p className="page-subtitle reveal">Writing is how I test whether I have actually understood something. These are problems I ran into while building, written the way that made them click for me.</p>

        <select
          className="notes-mobile-select"
          aria-label="Select note"
          value={activeNote}
          onChange={e => setActiveNote(e.target.value)}
        >
          {notes.map(n => <option key={n.id} value={n.id}>{n.path}</option>)}
        </select>

        <div className="notes-layout reveal rd1">
          <div className="notes-sidebar" role="navigation" aria-label="Notes navigation">
            <div className="notes-sidebar-header">/notes</div>
            {notes.map(n => (
              <a
                key={n.id}
                className={`note-link${activeNote === n.id ? ' active' : ''}`}
                role="button" tabIndex={0}
                aria-label={n.path}
                onClick={() => setActiveNote(n.id)}
                onKeyDown={e => e.key === 'Enter' && setActiveNote(n.id)}
              >
                <div className="nl-path">/notes/</div>
                <div>{n.path}</div>
              </a>
            ))}
          </div>
          <div className="notes-content">
            {notes.map(n => (
              <div key={n.id} className={`note-entry${activeNote === n.id ? ' active' : ''}`}>
                <div className="note-path">/notes/<span>{n.path}</span></div>
                <div className="note-h1">{n.title}</div>
                {n.content}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
