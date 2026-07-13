import { useState } from "react";
import { Droplet, ArrowRight, Info } from "lucide-react";
import { useApp } from "../state/store.jsx";
import { AppBar } from "../components/ui.jsx";
import { fundWithFriendbot, sendAssetCode } from "../lib/stellar.js";
import { CONFIG } from "../config.js";

export default function Topup() {
  const { address, network, refresh, goTab } = useApp();
  const [funding, setFunding] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState(null);

  const isTestnet = (network?.network || "TESTNET").toUpperCase() === "TESTNET";
  const code = sendAssetCode();

  async function fund() {
    setFunding(true);
    setError(null);
    try {
      await fundWithFriendbot(address);
      await refresh();
      setDone(true);
    } catch (e) {
      setError(e.message || "Failed to fund account.");
    } finally {
      setFunding(false);
    }
  }

  return (
    <div className="app-body">
      <AppBar title="Top up" showBack />
      <div className="pad">
        {isTestnet ? (
          <>
            <div className="note-box" style={{ background: "var(--good-bg)", color: "var(--good)" }}>
              <Info size={16} />
              <span>Ini mode Testnet. Top up memakai Friendbot yang memberi 10.000 XLM gratis untuk pengujian.</span>
            </div>

            {done ? (
              <div className="state-wrap">
                <div className="state-ico lime"><Droplet size={30} /></div>
                <h3>Balance topped up!</h3>
                <p>Accountmu didanai Friendbot. Balance {code} has been updated.</p>
                <button className="btn btn-primary btn-auto" onClick={() => goTab("home")}>Back to home</button>
              </div>
            ) : (
              <div style={{ marginTop: "var(--space-2xl)" }}>
                <button className="btn btn-primary" onClick={fund} disabled={funding}>
                  {funding ? <><span className="spinner" /> Funding…</> : <><Droplet size={17} /> Fund 10,000 XLM (Friendbot)</>}
                </button>
                {error && <div className="field-error">{error}</div>}
              </div>
            )}
          </>
        ) : (
          <div className="state-wrap">
            <div className="state-ico neutral"><Info size={30} /></div>
            <h3>Production on-ramp</h3>
            <p>Top up lewat anchor IDR (Virtual Account / QRIS / e-wallet) tersedia di jaringan utama. Menyusul.</p>
            <button className="btn btn-ghost btn-auto" onClick={() => goTab("home")}>
              Back <ArrowRight size={15} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
