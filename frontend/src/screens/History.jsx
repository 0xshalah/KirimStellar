import { useState } from "react";
import { SendHorizontal } from "lucide-react";
import { useApp } from "../state/store.jsx";
import { AppBar, BottomNav } from "../components/ui.jsx";
import { formatAmount, initials, timeLabel, shortKey } from "../lib/format.js";

const FILTERS = [
  { key: "all", label: "Semua" },
  { key: "out", label: "Keluar" },
  { key: "in", label: "Masuk" },
];

export default function History() {
  const { transactions, loadingData, push, setSelectedTx } = useApp();
  const [filter, setFilter] = useState("all");

  const rows = transactions.filter((t) =>
    filter === "all" ? true : filter === "out" ? t.outgoing : !t.outgoing
  );

  function openTx(tx) {
    setSelectedTx(tx);
    push("detail");
  }

  return (
    <>
      <div className="app-body">
        <AppBar title="Riwayat" />
        <div className="filter-row">
          {FILTERS.map((f) => (
            <button
              key={f.key}
              className={`fchip${filter === f.key ? " active" : ""}`}
              onClick={() => setFilter(f.key)}
            >
              {f.label}
            </button>
          ))}
        </div>
        <div className="pad">
          {loadingData && transactions.length === 0 ? (
            <>
              {[0, 1, 2].map((i) => (
                <div className="sk-row" key={i}>
                  <div className="sk sk-circle" />
                  <div style={{ flex: 1 }}>
                    <div className="sk" style={{ height: 12, width: "60%", marginBottom: 6 }} />
                    <div className="sk" style={{ height: 10, width: "35%" }} />
                  </div>
                </div>
              ))}
            </>
          ) : rows.length === 0 ? (
            <div className="state-wrap">
              <div className="state-ico neutral"><SendHorizontal size={30} /></div>
              <h3>Belum ada kiriman</h3>
              <p>Begitu kamu kirim yang pertama, semua riwayatnya muncul di sini.</p>
              <button className="btn btn-primary btn-auto" onClick={() => push("send")}>Kirim pertama</button>
            </div>
          ) : (
            rows.map((tx) => (
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
            ))
          )}
        </div>
      </div>
      <BottomNav />
    </>
  );
}
