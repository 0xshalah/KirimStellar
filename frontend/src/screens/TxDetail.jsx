import { ExternalLink } from "lucide-react";
import { useApp } from "../state/store.jsx";
import { AppBar } from "../components/ui.jsx";
import { explorerTx, explorerAccount } from "../config.js";
import { formatAmount, formatIdr, toIdr, initials, shortKey, timeLabel } from "../lib/format.js";

export default function TxDetail() {
  const { selectedTx, goTab } = useApp();

  if (!selectedTx) {
    return (
      <div className="app-body">
        <AppBar title="Detail transaksi" showBack />
        <div className="state-wrap">
          <p>Transaksi tidak ditemukan.</p>
          <button className="btn btn-primary btn-auto" onClick={() => goTab("history")}>Ke riwayat</button>
        </div>
      </div>
    );
  }

  const tx = selectedTx;
  const link = explorerTx(tx.hash);

  return (
    <div className="app-body">
      <AppBar title="Detail transaksi" showBack />
      <div className="pad">
        <div className="detail-hero">
          <div className={`av${tx.outgoing ? "" : " in"}`}>{initials(shortKey(tx.counterparty, 2, 2))}</div>
          <div className="amt">{tx.outgoing ? "-" : "+"}{formatAmount(tx.amount)} {tx.assetCode}</div>
          <div className="sub">{tx.outgoing ? "ke " : "dari "}{shortKey(tx.counterparty)} · ≈ Rp {formatIdr(toIdr(tx.amount))}</div>
        </div>

        <div className="section-title">Rincian</div>
        <div className="card card-pad">
          <div className="kv"><span className="k">Arah</span><span className="v">{tx.outgoing ? "Keluar" : "Masuk"}</span></div>
          <div className="kv"><span className="k">Jumlah</span><span className="v">{formatAmount(tx.amount)} {tx.assetCode}</span></div>
          <div className="kv"><span className="k">Estimasi IDR</span><span className="v">Rp {formatIdr(toIdr(tx.amount))}</span></div>
          <div className="kv"><span className="k">Waktu</span><span className="v">{timeLabel(tx.createdAt)}</span></div>
          <div className="kv"><span className="k">Status</span><span className="v"><span className="chip done">Selesai</span></span></div>
        </div>

        <div className="section-title">On-chain</div>
        <div className="card card-pad">
          <a className="kv" href={link} target="_blank" rel="noreferrer" style={{ cursor: "pointer" }}>
            <span className="k">Hash transaksi</span>
            <span className="v hash">{shortKey(tx.hash, 6, 6)} <ExternalLink size={12} /></span>
          </a>
          <a className="kv" href={explorerAccount(tx.counterparty)} target="_blank" rel="noreferrer" style={{ cursor: "pointer" }}>
            <span className="k">{tx.outgoing ? "Penerima" : "Pengirim"}</span>
            <span className="v hash">{shortKey(tx.counterparty)} <ExternalLink size={12} /></span>
          </a>
        </div>

        <div style={{ marginTop: "var(--space-lg)" }}>
          <a className="btn btn-ghost" href={link} target="_blank" rel="noreferrer">
            <ExternalLink size={15} /> Buka di stellar.expert
          </a>
        </div>
      </div>
    </div>
  );
}
