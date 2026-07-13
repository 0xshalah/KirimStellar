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
            <h2>Uang untuk keluarga, <span className="hl">tiba dalam detik.</span></h2>
            <div className="panel-quote">
              <p>"Dulu tiap kirim ke ibu, kena potong hampir 200 ribu dan nunggu dua hari. Sekarang sampai sebelum aku sempat telepon."</p>
              <div className="who">
                <span className="a">SW</span>
                <div><div className="n">Siti W.</div><div className="r">Pekerja rumah tangga, Hong Kong</div></div>
              </div>
            </div>
          </div>
        </aside>

        <main className="form-side">
          <div className="form-card">
            <p className="top-link">Belum punya akun? <a onClick={() => setAuthView("register")}>Daftar gratis</a></p>
            <h1>Selamat datang kembali</h1>
            <p className="sub">Masuk untuk kirim uang ke rumah.</p>

            <form className="auth-form" onSubmit={(e) => { e.preventDefault(); handleFreighter(); }}>
              <div className="afield">
                <label htmlFor="email">Email</label>
                <div className="input-wrap">
                  <Mail size={17} />
                  <input type="email" id="email" placeholder="kamu@email.com" autoComplete="email" />
                </div>
              </div>
              <div className="afield">
                <label htmlFor="password">Kata sandi</label>
                <div className="input-wrap">
                  <Lock size={17} />
                  <input type={showPw ? "text" : "password"} id="password" placeholder="Masukkan kata sandi" autoComplete="current-password" />
                  <button type="button" className="toggle" onClick={() => setShowPw((s) => !s)} aria-label="Tampilkan kata sandi">
                    {showPw ? <EyeOff size={17} /> : <Eye size={17} />}
                  </button>
                </div>
              </div>
              <div className="row-between">
                <label className="acheck"><input type="checkbox" /> Ingat saya</label>
                <a className="forgot">Lupa sandi?</a>
              </div>
              <button type="submit" className="abtn-primary" disabled={connecting}>
                {connecting ? "Menyambungkan…" : <>Masuk <ArrowRight size={17} /></>}
              </button>
            </form>

            <div className="adivider">atau</div>

            <button type="button" className="wallet-btn" onClick={handleFreighter} disabled={connecting}>
              <span className="wico">F</span>
              {connecting ? "Membuka Freighter…" : "Lanjut dengan Freighter Wallet"}
            </button>

            {(err || walletError) && <p className="auth-err" style={{ marginTop: "var(--space-md)" }}>{err || walletError}</p>}

            <p className="foot-note">Autentikasi memakai dompet Freighter (non-custodial). <a onClick={() => setAuthView("landing")}>Kembali ke beranda</a></p>
          </div>
        </main>
      </div>
    </div>
  );
}
