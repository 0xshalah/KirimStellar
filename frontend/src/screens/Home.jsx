import { ArrowUpRight, Plus, RefreshCw } from "lucide-react";
import { useApp } from "../state/store.jsx";
import { AppBar, BottomNav } from "../components/ui.jsx";
import { sendAssetCode } from "../lib/stellar.js";
import { formatAmount, formatIdr, toIdr, initials, timeLabel, shortKey } from "../lib/format.js";

export default function Home() {
  const { balances, transactions, loadingData, refresh, push, goTab, setSelectedTx } = useApp();
  const code = sendAssetCode();
  const recent = transactions.slice(0, 4);

  function openTx(tx) {
    setSelectedTx(tx);
    push("detail");
  }

  return (
    <>
      <div className="app-body">
        <AppBar greet="Selamat datang," title="Kamu" showAvatar name="Kamu" />
        <div className="pad">
          <div className="balance-hero">
            <div className="lbl">
              <span>Saldo kamu</span>
              <button className="refresh" onClick={() => refresh()} aria-label="Muat ulang">
                <RefreshCw size={14} className={loadingData ? "spin-anim" : ""} />
              </button>
            </div>
            <div className="amt">
              {formatAmount(balances.sendAsset)}
              <span className="cur">{code}</span>
            </div>
            <div className="sub">≈ Rp {formatIdr(toIdr(balances.sendAsset))}</div>
          </div>

          <div className="quick">
            <button onClick={() => push("send")}>
              <span className="qi"><ArrowUpRight size={18} /></span>
              <span className="qt">Kirim</span>
            </button>
            <button onClick={() => push("topup")}>
              <span className="qi alt"><Plus size={18} /></span>
              <span className="qt">Isi saldo</span>
            </button>
          </div>

          <div className="sec-head">
            <h3>Kiriman terakhir</h3>
            <a onClick={() => goTab("history")}>Lihat semua</a>
          </div>

          {recent.length === 0 ? (
            <p className="muted-note" style={{ textAlign: "left" }}>
              Belum ada transaksi. Kirim yang pertama lewat tombol Kirim.
            </p>
          ) : (
            <div>
              {recent.map((tx) => (
                <div className="tx-item" key={tx.id} onClick={() => openTx(tx)}>
                  <div className={`tavatar${tx.outgoing ? "" : " in"}`}>{initials(shortKey(tx.counterparty, 2, 2))}</div>
                  <div className="tinfo">
                    <div className="tn">{tx.outgoing ? "Ke " : "Dari "}{shortKey(tx.counterparty)}</div>
                    <div className="td">{timeLabel(tx.createdAt)}</div>
                  </div>
                  <div className="tright">
                    <div className={`ta${tx.outgoing ? "" : " in"}`}>
                      {tx.outgoing ? "-" : "+"}{formatAmount(tx.amount)} {tx.assetCode}
                    </div>
                    <div className="ts done">Selesai</div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      <BottomNav />
    </>
  );
}
