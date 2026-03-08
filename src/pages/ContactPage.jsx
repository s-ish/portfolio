import { useReveal } from '../hooks/useReveal'

export default function ContactPage() {
  useReveal([])
  return (
    <div id="page-contact" className="page active">
      <div className="container page-wrap">
        <div className="section-label reveal">Contact</div>
        <h1 className="page-title reveal">Get in touch.</h1>
        <p className="page-subtitle reveal">Open to conversations about backend engineering, interesting system problems, or anything worth building. I respond to every message.</p>
        <div className="contact-grid">
          <div className="reveal">
            <a href="https://github.com/s-ish" target="_blank" rel="noopener noreferrer" className="contact-item glass">
              <div className="ci-icon">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.009-.868-.013-1.703-2.782.604-3.369-1.342-3.369-1.342-.454-1.154-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0 1 12 6.836a9.59 9.59 0 0 1 2.504.337c1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.202 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.163 22 16.418 22 12c0-5.523-4.477-10-10-10z" fill="currentColor"/>
                </svg>
              </div>
              <div><div className="ci-type">GitHub</div><div className="ci-val">github.com/s-ish</div></div>
            </a>
            <div className="contact-item glass" tabIndex={0}>
              <div className="ci-icon">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path d="M20.317 4.492c-1.53-.69-3.17-1.2-4.885-1.49a.075.075 0 0 0-.079.036c-.21.369-.444.85-.608 1.23a18.566 18.566 0 0 0-5.487 0 12.36 12.36 0 0 0-.617-1.23A.077.077 0 0 0 8.562 3c-1.714.29-3.354.8-4.885 1.491a.07.07 0 0 0-.032.027C.533 9.093-.32 13.555.099 17.961a.08.08 0 0 0 .031.055 20.03 20.03 0 0 0 5.993 2.98.078.078 0 0 0 .084-.026 13.83 13.83 0 0 0 1.226-1.963.074.074 0 0 0-.041-.104 13.175 13.175 0 0 1-1.872-.878.075.075 0 0 1-.008-.125c.126-.093.252-.19.372-.287a.075.075 0 0 1 .078-.01c3.927 1.764 8.18 1.764 12.061 0a.075.075 0 0 1 .079.009c.12.098.245.195.372.288a.075.075 0 0 1-.006.125c-.598.344-1.22.635-1.873.877a.075.075 0 0 0-.041.105c.36.687.772 1.341 1.225 1.962a.077.077 0 0 0 .084.028 19.963 19.963 0 0 0 6.002-2.981.076.076 0 0 0 .032-.054c.5-5.094-.838-9.52-3.549-13.442a.06.06 0 0 0-.031-.028zM8.02 15.278c-1.182 0-2.157-1.069-2.157-2.38 0-1.312.956-2.38 2.157-2.38 1.21 0 2.176 1.077 2.157 2.38 0 1.312-.956 2.38-2.157 2.38zm7.975 0c-1.183 0-2.157-1.069-2.157-2.38 0-1.312.955-2.38 2.157-2.38 1.21 0 2.176 1.077 2.157 2.38 0 1.312-.946 2.38-2.157 2.38z" fill="currentColor"/>
                </svg>
              </div>
              <div><div className="ci-type">Discord</div><div className="ci-val">9ohf</div></div>
            </div>
            <a href="mailto:contact@si-sh.dev" className="contact-item glass">
              <div className="ci-icon">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <rect x="2" y="4" width="20" height="16" rx="3" stroke="currentColor" strokeWidth="1.5"/>
                  <path d="M2 7l8.586 6.293a2.5 2.5 0 0 0 2.828 0L22 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
              </div>
              <div><div className="ci-type">Email</div><div className="ci-val">sish@is.notaskid.ong</div></div>
            </a>
          </div>
          <div className="avail-card glass reveal rd1">
            <div className="avail-header"><div className="status-dot" aria-hidden="true"></div><div className="avail-title">Currently Available</div></div>
            <p className="avail-body">I am sixteen and still early in all of this. But I have a real foundation in backend architecture, a clear sense of how I approach problems, and a genuine interest in working on things that require careful thinking. If that sounds useful, reach out.</p>
            <div className="avail-tags">
              <span className="avail-tag">Backend Engineering</span>
              <span className="avail-tag">Bot Development</span>
              <span className="avail-tag">Systems Design</span>
              <span className="avail-tag">Open Source</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
