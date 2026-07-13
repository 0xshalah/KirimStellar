import { useState } from "react";
import { SendHorizontal, Mail, Lock, Eye, EyeOff, ArrowRight } from "lucide-react";
import { useApp } from "../../state/store.jsx";

export default function Login() {
  const { setAuthView, connect, connecting, walletError } = useApp();
  const [showPw, setShowPw] = useState(false);
  const [err, setErr] = useState(null);

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
            <h2>Money for family, <span className="hl">arrives in seconds.</span></h2>
            <div className="panel-quote">
              <p>"Every time I sent money home, nearly 200K was lost in fees and it took two days. Now it lands before I can even call."</p>
              <div className="who">
                <span className="a">SW</span>
                <div><div className="n">Siti W.</div><div className="r">Domestic worker, Hong Kong</div></div>
              </div>
            </div>
          </div>
        </aside>

        <main className="form-side">
          <div className="form-card">
            <p className="top-link">Don't have an account? <a onClick={() => setAuthView("register")}>Sign up free</a></p>
            <h1>Welcome back</h1>
            <p className="sub">Log in to send money home.</p>

            <form className="auth-form" onSubmit={(e) => { e.preventDefault(); handleFreighter(); }}>
              <div className="afield">
                <label htmlFor="email">Email</label>
                <div className="input-wrap">
                  <Mail size={17} />
                  <input type="email" id="email" placeholder="you@email.com" autoComplete="email" />
                </div>
              </div>
              <div className="afield">
                <label htmlFor="password">Password</label>
                <div className="input-wrap">
                  <Lock size={17} />
                  <input type={showPw ? "text" : "password"} id="password" placeholder="Enter your password" autoComplete="current-password" />
                  <button type="button" className="toggle" onClick={() => setShowPw((s) => !s)} aria-label="Show password">
                    {showPw ? <EyeOff size={17} /> : <Eye size={17} />}
                  </button>
                </div>
              </div>
              <div className="row-between">
                <label className="acheck"><input type="checkbox" /> Remember me</label>
                <a className="forgot">Forgot password?</a>
              </div>
              <button type="submit" className="abtn-primary" disabled={connecting}>
                {connecting ? "Connecting…" : <>Log in <ArrowRight size={17} /></>}
              </button>
            </form>

            <div className="adivider">or</div>

            <button type="button" className="wallet-btn" onClick={handleFreighter} disabled={connecting}>
              <span className="wico">F</span>
              {connecting ? "Opening Freighter…" : "Continue with Freighter Wallet"}
            </button>

            {(err || walletError) && <p className="auth-err" style={{ marginTop: "var(--space-md)" }}>{err || walletError}</p>}

            <p className="foot-note">Authenticate using Freighter wallet (non-custodial). <a onClick={() => setAuthView("landing")}>Back to home</a></p>
          </div>
        </main>
      </div>
    </div>
  );
}
