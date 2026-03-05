import { useReveal } from '../hooks/useReveal'

const failures = [
  { tag: 'network', scenario: 'Discord drops the gateway connection', response: "Resume session using the last known sequence number. Discord's resume protocol replays missed events. If resume fails, full reconnect.", guarantee: 'No events dropped on clean disconnect' },
  { tag: 'integrity', scenario: 'Ledger write fails mid-wager', response: 'Ledger write is a hard precondition for balance mutation. If the write fails, execution stops. Balance never changes. Clean state.', guarantee: 'No balance mutation without a ledger record' },
  { tag: 'integrity', scenario: 'RNG generation fails', response: 'Outcome generation is validated before any state is touched. Failure exits the pipeline. No lock held. No balance mutated.', guarantee: 'Wager rejected before any state mutation' },
  { tag: 'concurrency', scenario: 'Two wagers from same user simultaneously', response: 'Per-user mutex ensures only one pipeline runs per user. Second request blocks until first commits. Reads the already-updated balance and is TOCTOU safe.', guarantee: 'Strict serial ordering per user' },
  { tag: 'network', scenario: 'API request hits rate limit (429)', response: 'Scheduler reads retry-after header and requeues the request. Not dropped. Not retried immediately. Route bucket cooldown is respected.', guarantee: 'Every queued request eventually completes' },
  { tag: 'concurrency', scenario: 'User wagers more than their balance', response: 'Two-stage validation. Pre-lock check rejects obvious overdrafts fast. Second check runs inside the lock against the live balance. The in-lock check is what actually prevents overdraft under concurrency.', guarantee: 'No overdraft under any concurrency level' },
  { tag: 'integrity', scenario: 'Generator output approaches combinatorial space size', response: 'Deduplication set rejects collisions. Pool sizes are designed so collision probability stays low well past the target output size. Generator keeps sampling until target is reached.', guarantee: 'Output contains no duplicate queries' },
  { tag: 'integrity', scenario: 'Staged expansion pass runs out of memory mid-generation', response: 'Each pass writes its output file before the next pass begins. A failed pass leaves the previous intermediate file intact. The run can be resumed from the last completed pass.', guarantee: 'No data loss on partial expansion failure' },
  { tag: 'network', scenario: 'A Dorky-Dorker module crashes or exits with an error', response: 'Module runs as an isolated subprocess. Crash is contained to that process. Launcher stays running, returns to the menu, and can invoke any other module normally.', guarantee: 'Module failure never affects the launcher or other tools' },
  { tag: 'integrity', scenario: 'Preset list file is missing or malformed at generation time', response: 'Engine validates preset files at startup before starting any substitution passes. A missing or unreadable file causes an immediate exit with a clear error. No partial output is written.', guarantee: 'No silent generation with incomplete inputs' },
]

export default function FailuresPage() {
  useReveal([])
  return (
    <div id="page-failures" className="page active">
      <div className="container page-wrap">
        <div className="section-label reveal">Failure Modes</div>
        <h1 className="page-title reveal">Failure modes<br/>and responses.</h1>
        <p className="page-subtitle reveal">I find it useful to think through what can go wrong before it does. This is a record of the failure scenarios I have considered for these systems, what breaks, how the system responds, and what that response actually guarantees.</p>
        <div className="failure-table-wrap reveal rd1">
          <table className="failure-table">
            <thead><tr>
              <th style={{width:'27%'}}>Failure Scenario</th>
              <th style={{width:'47%'}}>System Response</th>
              <th style={{width:'26%'}}>Guarantee</th>
            </tr></thead>
            <tbody>
              {failures.map(({ tag, scenario, response, guarantee }, i) => (
                <tr key={i}>
                  <td><div className={`ftag ${tag}`}>{tag.charAt(0).toUpperCase()+tag.slice(1)}</div><span className="f-scenario">{scenario}</span></td>
                  <td className="f-response">{response}</td>
                  <td className="f-guarantee">{guarantee}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
