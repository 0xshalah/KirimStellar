import { useState } from "react";
import { ShieldCheck, HandCoins, PartyPopper, Check, Landmark } from "lucide-react";
import { useApp } from "../state/store.jsx";
import { AppBar } from "../components/ui.jsx";
import { formatIdr, toIdr, shortKey } from "../lib/format.js";

// Receiver-side experience. Represents the escrow claim flow the family sees.
// Escrow/timelock is on the roadmap; this previews the product's other half for the demo.
export default function Claim() {
  const { result, address, goTab } = useApp();
  const [phase, setPhase] = useState("ready"); // ready | claiming | done

  const amount = result?.amount || "200.00";
  const idr = formatIdr(toIdr(amount));
  const idrt = amount;
  const senderLabel = shortKey(address || "Pengirim");

  function claim() {
    setPhase("claiming");
    setTimeout(() => setPhase("done"), 1400);
  }

  if (phase === "done") {
    return (
      <div className="app-body">
        <AppBar title="Klaim" showBack />
        <div className="success-wrap">
          <div className="success-badge"><PartyPopper size={42} /></div>
          <h2>Uang sudah masuk!</h2>
          <div className="big-amt">Rp {idr} di dompetmu</div>
          <div className="receipt">
            <div className="kv"><span className="k">Diterima</span><span className="v">{idrt} IDRT</span></div>
            <div className="kv"><span className="k">Dari</span><span className="v">{senderLabel}</span></div>
            <div className="kv"><span className="k">Status</span><span className="v"><span className="chip done"><Check size={11} /> Selesai</span></span></div>
          </div>
        </div>
        <div className="pad">
          <button className="btn btn-primary"><Landmark size={16} /> Cairkan ke rekening</button>
          <button className="btn btn-ghost" style={{ marginTop: "var(--space-md)" }} onClick={() => goTab("home")}>Kembali</button>
        </div>
      </div>
    );
  }

  return (
    <div className="app-body">
      <AppBar title="Klaim" showBack />
      <div className="claim-top">
        <div className="from-av">{senderLabel.slice(0, 2).toUpperCase()}</div>
        <div className="from-n">{senderLabel} mengirim untukmu</div>
        <div className="claim-amt">Rp {idr}</div>
        <div className="claim-cur">≈ {idrt} IDRT</div>
      </div>
      <div className="claim-body">
        <div className="claim-info">
          <ShieldCheck size={16} />
          <span>Dana ini aman di Stellar. Klaim untuk terima langsung ke dompetmu.</span>
        </div>
        <div className="card card-pad">
          <div className="kv"><span className="k">Dari</span><span className="v">{senderLabel}</span></div>
          <div className="kv"><span className="k">Kamu terima</span><span className="v">{idrt} IDRT</span></div>
          <div className="kv"><span className="k">Biaya klaim</span><span className="v free">Gratis</span></div>
          <div className="kv"><span className="k">Kedaluwarsa</span><span className="v">6 hari 23 jam</span></div>
        </div>
      </div>
      <div className="pad push-bottom">
        <button className="btn btn-primary" onClick={claim} disabled={phase === "claiming"}>
          {phase === "claiming" ? <><span className="spinner" /> Mengklaim…</> : <>Klaim sekarang <HandCoins size={17} /></>}
        </button>
      </div>
    </div>
  );
}
