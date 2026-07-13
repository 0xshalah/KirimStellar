import { useState } from "react";
import { SendHorizontal, User, Mail, Lock, Eye, EyeOff, ArrowRight, Zap, BadgePercent, ShieldCheck, Gift } from "lucide-react";
import { useApp } from "../../state/store.jsx";

const LABELS = ["", "Weak", "Fair", "Good", "Strong"];

export default function Register() {
  const { setAuthView, connect, connecting, walletError } = useApp();
  const [showPw, setShowPw] = useState(false);
  const [pw, setPw] = useState("");
  const [err, setErr] = useState(null);

  const score = strength(pw);

  async function handleFreighter() {
    setErr(null);
    try {
      await connect();
    } catch (e) {
      setErr(e.message || String(e));
    }
  }

  return (
    <div className="auth">
      <div className="auth-layout">
        <aside className="auth-panel">
          <div className="pbrand"><span className="mark"><SendHorizontal size={17} /></span> KirimStellar</div>
          <div className="panel-body">
            <h2>Open an account, <span className="hl">send your first transfer tonight.</span></h2>
            <ul className="benefits">
              <li><span className="cico"><Zap size={14} /></span><span>Money arrives <b>in ~5 seconds</b>, not two days.</span></li>
              <li><span className="cico"><BadgePercent size={14} /></span><span>Fee <b>below 0.1%</b>, your family receives almost everything.</span></li>
              <li><span className="cico"><ShieldCheck size={14} /></span><span>Non-custodial — <b>you hold the keys</b>, not us.</span></li>
              <li><span className="cico"><Gift size={14} /></span><span>Free to open, <b>no monthly fees</b>.</span></li>
            </ul>
          </div>
        </aside>

        <main className="form-side">
          <div className="form-card">
            <p className="top-link">Already have an account? <a onClick={() => setAuthView("login")}>Log in</a></p>
            <h1>Sign up free</h1>
            <p className="sub">Less than a minute to start sending.</p>

            <form className="auth-form" onSubmit={(e) => { e.preventDefault(); handleFreighter(); }}>
              <div className="afield">
                <label htmlFor="name">Full name</label>
                <div className="input-wrap"><User size={17} /><input type="text" id="name" placeholder="Shalahuddin" autoComplete="name" /></div>
              </div>
              <div className="afield">
                <label htmlFor="email">Email</label>
                <div className="input-wrap"><Mail size={17} /><input type="email" id="email" placeholder="you@email.com" autoComplete="email" /></div>
              </div>
              <div className="afield">
                <label htmlFor="password">Password</label>
                <div className="input-wrap">
                  <Lock size={17} />
                  <input type={showPw ? "text" : "password"} id="password" placeholder="At least 8 characters" autoComplete="new-password" value={pw} onChange={(e) => setPw(e.target.value)} />
                  <button type="button" className="toggle" onClick={() => setShowPw((s) => !s)} aria-label="Show password">
                    {showPw ? <EyeOff size={17} /> : <Eye size={17} />}
                  </button>
                </div>
                <div className="strength">
                  <div className={`bars${score ? " s" + score : ""}`}><span /><span /><span /><span /></div>
                  <span className="txt">{pw.length === 0 ? "Use 8+ characters with numbers & symbols" : `Password strength: ${LABELS[score]}`}</span>
                </div>
              </div>
              <label className="acheck">
                <input type="checkbox" />
                <span>I agree to KirimStellar <a>Terms of Service</a> and <a>Privacy Policy</a>.</span>
              </label>
              <button type="submit" className="abtn-primary" disabled={connecting}>
                {connecting ? "Connecting…" : <>Create account <ArrowRight size={17} /></>}
              </button>
            </form>

            <div className="adivider">or</div>

            <button type="button" className="wallet-btn" onClick={handleFreighter} disabled={connecting}>
              <span className="wico">F</span>
              {connecting ? "Opening Freighter…" : "Sign up with Freighter Wallet"}
            </button>

            {(err || walletError) && <p className="auth-err" style={{ marginTop: "var(--space-md)" }}>{err || walletError}</p>}

            <p className="foot-note">Account linked to Freighter wallet (non-custodial). <a onClick={() => setAuthView("landing")}>Back to home</a></p>
          </div>
        </main>
      </div>
    </div>
  );
}

function strength(v) {
  let s = 0;
  if (v.length >= 8) s++;
  if (/[A-Z]/.test(v) && /[a-z]/.test(v)) s++;
  if (/\d/.test(v)) s++;
  if (/[^A-Za-z0-9]/.test(v)) s++;
  return v.length === 0 ? 0 : s;
}
