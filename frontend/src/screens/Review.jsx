import { PenLine, ShieldCheck } from "lucide-react";
import { useApp } from "../state/store.jsx";
import { AppBar } from "../components/ui.jsx";
import { sendAssetCode } from "../lib/stellar.js";
import { formatIdr, toIdr, shortKey } from "../lib/format.js";

export default function Review() {
  const { draft, push } = useApp();
  const code = sendAssetCode();

  if (!draft?.recipient) {
    return (
      <div className="app-body">
        <AppBar title="Cek sebelum kirim" showBack />
        <div className="state-wrap">
          <p>Data kiriman belum lengkap.</p>
        </div>
      </div>
    );
  }

  const { amount, recipient } = draft;

  return (
    <div className="app-body">
      <AppBar title="Cek sebelum kirim" showBack />
      <div className="pad">
        <div className="review-amt">
          <div className="big">{amount} <span style={{ color: "var(--muted)", fontSize: "1.25rem" }}>{code}</span></div>
          <div className="small">{recipient.name} menerima ≈ Rp {formatIdr(toIdr(amount))}</div>
        </div>

        <div className="card card-pad">
          <div className="kv"><span className="k">Penerima</span><span className="v">{recipient.name}</span></div>
          <div className="kv"><span className="k">Dompet</span><span className="v">{shortKey(recipient.wallet)}</span></div>
          <div className="kv"><span className="k">Aset</span><span className="v">{code}</span></div>
          <div className="kv"><span className="k">Biaya jaringan</span><span className="v free">~0.00001 XLM</span></div>
          <div className="kv"><span className="k">Estimasi kurs</span><span className="v">1 {code} ≈ {toIdr(1).toLocaleString("id-ID")} IDR</span></div>
          <div className="kv"><span className="k">Jaringan</span><span className="v">Stellar Testnet</span></div>
        </div>

        <div className="note-box">
          <ShieldCheck size={16} />
          <span>Kamu menandatangani sendiri lewat Freighter. KirimStellar tidak pernah menyentuh kunci pribadimu.</span>
        </div>
      </div>

      <div className="pad push-bottom">
        <button className="btn btn-primary" onClick={() => push("sending")}>
          Konfirmasi &amp; tanda tangan <PenLine size={16} />
        </button>
      </div>
    </div>
  );
}
