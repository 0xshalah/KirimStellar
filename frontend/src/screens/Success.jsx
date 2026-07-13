import { Check, ArrowRight, Home as HomeIcon } from "lucide-react";
import { useApp } from "../state/store.jsx";
import { formatIdr, toIdr } from "../lib/format.js";

export default function Success() {
  const { result, push, goTab } = useApp();

  if (!result) {
    return (
      <div className="app-body">
        <div className="state-wrap"><p>No transaction data.</p>
          <button className="btn btn-primary btn-auto" onClick={() => goTab("home")}>Back to home</button>
        </div>
      </div>
    );
  }

  const { amount, assetCode, recipient } = result;

  return (
    <div className="app-body">
      <div className="success-wrap">
        <div className="success-badge"><Check size={44} /></div>
        <h2>Sent!</h2>
        <div className="big-amt">{amount} {assetCode} → ≈ Rp {formatIdr(toIdr(amount))}</div>
        <div className="receipt">
          <div className="kv"><span className="k">Ke</span><span className="v">{recipient.name}</span></div>
          <div className="kv"><span className="k">Status</span><span className="v"><span className="chip done"><Check size={11} /> Confirmed</span></span></div>
          <div className="kv"><span className="k">Ledger</span><span className="v">#{result.ledger}</span></div>
          <div className="kv"><span className="k">Time</span><span className="v">~5 detik</span></div>
        </div>
      </div>
      <div className="pad">
        <button className="btn btn-primary" style={{ marginBottom: "var(--space-md)" }} onClick={() => push("track")}>
          Track status <ArrowRight size={16} />
        </button>
        <button className="btn btn-ghost" onClick={() => goTab("home")}>
          <HomeIcon size={15} /> Back to home
        </button>
      </div>
    </div>
  );
}
