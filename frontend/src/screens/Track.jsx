import { Check, ExternalLink, PenLine, Layers, Banknote, HandCoins } from "lucide-react";
import { useApp } from "../state/store.jsx";
import { AppBar } from "../components/ui.jsx";
import { explorerTx } from "../config.js";
import { formatIdr, toIdr, shortKey, clockLabel } from "../lib/format.js";

export default function Track() {
  const { result, goTab, push } = useApp();

  if (!result) {
    return (
      <div className="app-body">
        <AppBar title="Transfer status" showBack />
        <div className="state-wrap">
          <p>No transfers to track yet.</p>
          <button className="btn btn-primary btn-auto" onClick={() => goTab("home")}>Back to home</button>
        </div>
      </div>
    );
  }

  const { amount, assetCode, recipient, hash, ledger } = result;
  const t = clockLabel(new Date(result.createdAt));
  const link = explorerTx(hash);

  return (
    <div className="app-body">
      <AppBar title="Transfer status" showBack />
      <div className="pad">
        <div className="track-hero">
          <span className="chip done"><Check size={11} /> Confirmed</span>
          <div className="amt" style={{ marginTop: "var(--space-md)" }}>{amount} {assetCode}</div>
          <div className="to">ke {recipient.name} · ≈ Rp {formatIdr(toIdr(amount))}</div>
        </div>

        <div className="timeline">
          <div className="tl-step done">
            <div className="node"><PenLine size={15} /></div>
            <div className="st-t">Signed in Freighter</div>
            <div className="st-d">{t} · approved by wallet owner</div>
          </div>
          <div className="tl-step done">
            <div className="node"><Layers size={15} /></div>
            <div className="st-t">Confirmed on ledger</div>
            <div className="st-d">{t} · ledger #{ledger}</div>
            <a className="st-hash" href={link} target="_blank" rel="noreferrer">
              {shortKey(hash, 6, 6)} <ExternalLink size={11} />
            </a>
          </div>
          <div className="tl-step done">
            <div className="node"><Check size={16} /></div>
            <div className="st-t">Received by recipient</div>
            <div className="st-d">Funds are now in wallet {shortKey(recipient.wallet)}</div>
          </div>
          <div className="tl-step pending-step">
            <div className="node"><Banknote size={15} /></div>
            <div className="st-t">Konversi ke IDRT &amp; cairkan</div>
            <div className="st-d">Via Stellar DEX + anchor lokal (roadmap)</div>
          </div>
        </div>

        <a className="explorer-link" href={link} target="_blank" rel="noreferrer">
          <ExternalLink size={15} /> View on stellar.expert
        </a>
        <button className="btn btn-ghost" style={{ marginTop: "var(--space-md)" }} onClick={() => push("claim")}>
          <HandCoins size={15} /> Preview recipient view
        </button>
      </div>
    </div>
  );
}
