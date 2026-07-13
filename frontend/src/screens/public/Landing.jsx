import { useMemo, useState } from "react";
import {
  SendHorizontal, ArrowRight, Zap, BadgePercent, ShieldCheck, Repeat,
  Lock, Banknote, Smartphone, Eye, Globe,
} from "lucide-react";
import { useApp } from "../../state/store.jsx";
import { CONFIG } from "../../config.js";
import { formatIdr } from "../../lib/format.js";

export default function Landing() {
  const { setAuthView } = useApp();
  const [amount, setAmount] = useState("200.00");
  const recv = useMemo(() => {
    const n = parseFloat(String(amount).replace(/,/g, "")) || 0;
    return formatIdr(n * CONFIG.idrRate);
  }, [amount]);

  const code = CONFIG.sendAsset.code;

  return (
    <div className="landing">
      <nav>
        <div className="nav-inner">
          <div className="pbrand"><span className="mark"><SendHorizontal size={17} /></span> KirimStellar</div>
          <ul className="nav-links">
            <li><a onClick={() => scrollTo("cara")}>Cara kerja</a></li>
            <li><a onClick={() => scrollTo("hemat")}>Biaya</a></li>
            <li><a onClick={() => scrollTo("fitur")}>Fitur</a></li>
          </ul>
          <div className="nav-cta">
            <button className="pbtn pbtn-ghost" onClick={() => setAuthView("login")}>Masuk</button>
            <button className="pbtn pbtn-lime" onClick={() => setAuthView("register")}>Kirim uang</button>
          </div>
        </div>
      </nav>

      <header className="wrap">
        <div className="hero">
          <div className="hero-copy">
            <h1>Kirim uang ke rumah dalam <span className="accent">hitungan detik</span></h1>
            <p className="lead">Untuk pekerja Indonesia di luar negeri. Biaya nyaris nol, kurs jujur, uang sampai sebelum kamu sempat tutup aplikasi.</p>
            <div className="hero-actions">
              <button className="pbtn pbtn-lime pbtn-lg" onClick={() => setAuthView("register")}>Mulai kirim <ArrowRight size={18} /></button>
              <button className="pbtn pbtn-ghost pbtn-lg" onClick={() => scrollTo("cara")}>Lihat caranya</button>
            </div>
            <div className="hero-trust">
              <span className="item"><Zap size={15} /> Tiba ~5 detik</span>
              <span className="item"><BadgePercent size={15} /> Biaya &lt; 0,1%</span>
              <span className="item"><ShieldCheck size={15} /> On-chain Stellar</span>
            </div>
          </div>

          <div className="hero-visual">
            <div className="hero-card">
              <div className="float-badge"><Zap size={12} /> Tiba ~5 detik</div>
              <div className="leg2">
                <div>
                  <div className="leg-label">Kamu kirim</div>
                  <input className="amount" value={amount} inputMode="decimal" onChange={(e) => setAmount(e.target.value)} aria-label={`Jumlah kirim ${code}`} />
                </div>
                <span className="pill"><span className="flag usdc">{code[0]}</span> {code}</span>
              </div>
              <div className="rail">
                <div className="rail-row"><span className="ico"><Zap size={13} /></span> Biaya jaringan <span className="val free">~0.00001 XLM</span></div>
                <div className="rail-row"><span className="ico"><Repeat size={13} /></span> Estimasi kurs <span className="val">{CONFIG.idrRate.toLocaleString("id-ID")}</span></div>
              </div>
              <div className="leg2">
                <div>
                  <div className="leg-label">Mereka terima</div>
                  <div className="amount"><span>{recv}</span> <span className="cur">IDR</span></div>
                </div>
                <span className="pill"><span className="flag idr" /> IDR</span>
              </div>
              <button className="card-cta" onClick={() => setAuthView("register")}>Kirim sekarang <ArrowRight size={17} /></button>
            </div>
          </div>
        </div>
      </header>

      <div className="strip">
        <div className="strip-inner">
          <div className="strip-item"><span className="n">$9,7 M</span><span className="l">dikirim TKI tiap tahun</span></div>
          <div className="strip-item"><span className="n">&lt; 0,1%</span><span className="l">biaya, bukan 5-7%</span></div>
          <div className="strip-item"><span className="n">~5 dtk</span><span className="l">tiba, bukan 2-3 hari</span></div>
          <div className="strip-item"><span className="n">1:1</span><span className="l">IDRT dijamin Rupiah</span></div>
        </div>
      </div>

      <section className="block wrap" id="cara">
        <div className="section-head">
          <span className="eyebrow">Cara kerja</span>
          <h2>Tiga langkah. Tidak perlu paham kripto.</h2>
          <p>Kamu kirim aset stabil, keluarga terima nilainya. Sisanya diurus di balik layar oleh Stellar.</p>
        </div>
        <div className="steps">
          <div className="step"><div className="num">1</div><h3>Sambungkan dompet</h3><p>Buka Freighter, masukkan jumlah dan alamat penerima. Selesai dalam satu ketukan.</p></div>
          <div className="step"><div className="num">2</div><h3>Tanda tangan &amp; kirim</h3><p>Kamu menandatangani sendiri lewat Freighter. Transaksi masuk ledger Stellar dalam hitungan detik.</p></div>
          <div className="step"><div className="num">3</div><h3>Keluarga terima</h3><p>Dana sampai langsung ke dompet penerima, transparan dan bisa dicek di explorer.</p></div>
        </div>
      </section>

      <section className="block wrap" id="hemat">
        <div className="compare">
          <div>
            <span className="eyebrow" style={{ color: "var(--lime)" }}>Bandingkan</span>
            <h2>$600 juta setahun hilang ke perantara.</h2>
            <p className="lead">Kirim Rp 3,2 juta lewat cara lama, keluargamu kehilangan hampir Rp 200 ribu. Lewat KirimStellar, hampir semuanya sampai.</p>
          </div>
          <div className="compare-rows">
            <div className="crow"><span className="label">Biaya transfer</span><span className="old">Rp 195.000</span><span className="new">Rp 300</span></div>
            <div className="crow"><span className="label">Waktu sampai</span><span className="old">2-3 hari</span><span className="new">~5 detik</span></div>
            <div className="crow"><span className="label">Kurs</span><span className="old">+3% markup</span><span className="new">mid-market</span></div>
            <div className="crow"><span className="label">Perlu agen</span><span className="old">Ya</span><span className="new">Tidak</span></div>
          </div>
        </div>
      </section>

      <section className="block wrap" id="fitur">
        <div className="section-head">
          <span className="eyebrow">Kenapa Stellar</span>
          <h2>Dibangun untuk uang yang benar-benar bergerak.</h2>
        </div>
        <div className="features">
          <div className="feat wide"><div className="fico"><Lock size={20} /></div><h3>Non-custodial sejak awal</h3><p>Kamu tanda tangan sendiri lewat Freighter. KirimStellar tidak pernah memegang kunci atau danamu. Escrow on-chain dengan timelock sedang dalam pengembangan.</p></div>
          <div className="feat"><div className="fico"><Banknote size={20} /></div><h3>Rupiah asli</h3><p>IDRT dijamin 1:1 dengan Rupiah, siap dicairkan lewat anchor lokal.</p></div>
          <div className="feat"><div className="fico"><Smartphone size={20} /></div><h3>Mobile-first</h3><p>Dirancang untuk ponsel, karena di situlah keluargamu berada.</p></div>
          <div className="feat"><div className="fico"><Eye size={20} /></div><h3>Transparan penuh</h3><p>Lacak tiap transaksi real-time lewat Horizon, cek sendiri di explorer.</p></div>
          <div className="feat"><div className="fico"><Globe size={20} /></div><h3>Lintas negara</h3><p>Dari Malaysia, Hong Kong, Singapura, Taiwan, langsung ke rumah.</p></div>
        </div>
      </section>

      <section className="cta-band wrap">
        <div>
          <h2>Kirim yang pertama malam ini.</h2>
          <p>Gratis dibuka. Uang pertamamu bisa sampai sebelum kopi kamu dingin.</p>
          <div className="hero-actions">
            <button className="pbtn pbtn-lime pbtn-lg" onClick={() => setAuthView("register")}>Mulai kirim <ArrowRight size={18} /></button>
          </div>
        </div>
      </section>

      <footer>
        <div className="wrap foot-inner">
          <div className="pbrand"><span className="mark"><SendHorizontal size={17} /></span> KirimStellar</div>
          <ul className="foot-links">
            <li><a onClick={() => scrollTo("cara")}>Cara kerja</a></li>
            <li><a onClick={() => scrollTo("hemat")}>Biaya</a></li>
            <li><a onClick={() => scrollTo("fitur")}>Fitur</a></li>
            <li><a href="https://github.com/0xshalah/KirimStellar" target="_blank" rel="noreferrer">GitHub</a></li>
          </ul>
          <p className="fnote">Dibangun di Stellar · APAC Stellar Hackathon 2026</p>
        </div>
      </footer>
    </div>
  );
}

function scrollTo(id) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
}
