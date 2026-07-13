import { useState } from "react";
import { SendHorizontal, User, Mail, Lock, Eye, EyeOff, ArrowRight, Zap, BadgePercent, ShieldCheck, Gift } from "lucide-react";
import { useApp } from "../../state/store.jsx";

const LABELS = ["", "Lemah", "Lumayan", "Bagus", "Kuat"];

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
            <h2>Buka akun, kirim <span className="hl">yang pertama malam ini.</span></h2>
            <ul className="benefits">
              <li><span className="cico"><Zap size={14} /></span><span>Uang tiba <b>dalam ~5 detik</b>, bukan dua hari.</span></li>
              <li><span className="cico"><BadgePercent size={14} /></span><span>Biaya <b>di bawah 0,1%</b>, keluarga terima hampir semuanya.</span></li>
              <li><span className="cico"><ShieldCheck size={14} /></span><span>Non-custodial — <b>kamu pegang kuncinya</b>, bukan kami.</span></li>
              <li><span className="cico"><Gift size={14} /></span><span>Gratis dibuka, <b>tanpa biaya bulanan</b>.</span></li>
            </ul>
          </div>
        </aside>

        <main className="form-side">
          <div className="form-card">
            <p className="top-link">Sudah punya akun? <a onClick={() => setAuthView("login")}>Masuk</a></p>
            <h1>Daftar gratis</h1>
            <p className="sub">Kurang dari satu menit untuk mulai kirim.</p>

            <form className="auth-form" onSubmit={(e) => { e.preventDefault(); handleFreighter(); }}>
              <div className="afield">
                <label htmlFor="name">Nama lengkap</label>
                <div className="input-wrap"><User size={17} /><input type="text" id="name" placeholder="Shalahuddin" autoComplete="name" /></div>
              </div>
              <div className="afield">
                <label htmlFor="email">Email</label>
                <div className="input-wrap"><Mail size={17} /><input type="email" id="email" placeholder="kamu@email.com" autoComplete="email" /></div>
              </div>
              <div className="afield">
                <label htmlFor="password">Kata sandi</label>
                <div className="input-wrap">
                  <Lock size={17} />
                  <input type={showPw ? "text" : "password"} id="password" placeholder="Minimal 8 karakter" autoComplete="new-password" value={pw} onChange={(e) => setPw(e.target.value)} />
                  <button type="button" className="toggle" onClick={() => setShowPw((s) => !s)} aria-label="Tampilkan kata sandi">
                    {showPw ? <EyeOff size={17} /> : <Eye size={17} />}
                  </button>
                </div>
                <div className="strength">
                  <div className={`bars${score ? " s" + score : ""}`}><span /><span /><span /><span /></div>
                  <span className="txt">{pw.length === 0 ? "Gunakan 8+ karakter dengan angka & simbol" : `Kekuatan sandi: ${LABELS[score]}`}</span>
                </div>
              </div>
              <label className="acheck">
                <input type="checkbox" />
                <span>Saya setuju dengan <a>Ketentuan Layanan</a> dan <a>Kebijakan Privasi</a> KirimStellar.</span>
              </label>
              <button type="submit" className="abtn-primary" disabled={connecting}>
                {connecting ? "Menyambungkan…" : <>Buat akun <ArrowRight size={17} /></>}
              </button>
            </form>

            <div className="adivider">atau</div>

            <button type="button" className="wallet-btn" onClick={handleFreighter} disabled={connecting}>
              <span className="wico">F</span>
              {connecting ? "Membuka Freighter…" : "Daftar dengan Freighter Wallet"}
            </button>

            {(err || walletError) && <p className="auth-err" style={{ marginTop: "var(--space-md)" }}>{err || walletError}</p>}

            <p className="foot-note">Akun terhubung ke dompet Freighter (non-custodial). <a onClick={() => setAuthView("landing")}>Kembali ke beranda</a></p>
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
