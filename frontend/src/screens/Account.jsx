import { useState } from "react";
import {
  Copy, Check, ExternalLink, Globe, Bell, Fingerprint, Shield, LifeBuoy,
  LogOut, Droplet, ChevronRight, HandCoins,
} from "lucide-react";
import { useApp } from "../state/store.jsx";
import { AppBar, BottomNav } from "../components/ui.jsx";
import { explorerAccount } from "../config.js";
import { fundWithFriendbot } from "../lib/stellar.js";
import { shortKey, initials } from "../lib/format.js";

export default function Account() {
  const { address, network, disconnect, refresh, push } = useApp();
  const [copied, setCopied] = useState(false);
  const [funding, setFunding] = useState(false);
  const [msg, setMsg] = useState(null);
  const [notif, setNotif] = useState(true);
  const [bio, setBio] = useState(false);

  const isTestnet = (network?.network || "TESTNET").toUpperCase() === "TESTNET";

  async function copy() {
    try {
      await navigator.clipboard.writeText(address);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch { /* ignore */ }
  }

  async function fund() {
    setFunding(true);
    setMsg(null);
    try {
      await fundWithFriendbot(address);
      await refresh();
      setMsg("Berhasil didanai Friendbot. Balance diperbarui.");
    } catch (e) {
      setMsg(e.message || "Failed to fund account.");
    } finally {
      setFunding(false);
    }
  }

  return (
    <>
      <div className="app-body">
        <AppBar title="Account" />
        <div className="pad">
          <div className="state-wrap" style={{ flex: "none", padding: "var(--space-lg) 0 var(--space-xl)" }}>
            <div className="avatar" style={{ width: 84, height: 84, fontSize: "2rem", borderRadius: "50%" }}>
              {initials("You")}
            </div>
            <h3 style={{ marginTop: "var(--space-md)" }}>Your wallet</h3>
            <button className="pill" style={{ marginTop: "var(--space-md)" }} onClick={copy}>
              {copied ? <Check size={14} /> : <Copy size={14} />} {shortKey(address, 6, 6)}
            </button>
          </div>

          <div className="section-title">Wallet</div>
          <div className="settings-group">
            <div className="set-row"><span className="sico"><Globe size={17} /></span><div><div className="st">Network</div></div><span className="chev">{network?.network || "TESTNET"}</span></div>
            <a className="set-row" href={explorerAccount(address)} target="_blank" rel="noreferrer">
              <span className="sico"><ExternalLink size={17} /></span><div><div className="st">View on explorer</div><div className="sd">stellar.expert</div></div><span className="chev"><ChevronRight size={16} /></span>
            </a>
            {isTestnet && (
              <div className="set-row" onClick={funding ? undefined : fund}>
                <span className="sico"><Droplet size={17} /></span>
                <div><div className="st">Fund account (Friendbot)</div><div className="sd">Free 10,000 testnet XLM</div></div>
                <span className="chev">{funding ? <span className="spinner" /> : <ChevronRight size={16} />}</span>
              </div>
            )}
          </div>
          {msg && <div className="muted-note" style={{ marginTop: 0, marginBottom: "var(--space-lg)" }}>{msg}</div>}

          <div className="section-title">Preferences</div>
          <div className="settings-group">
            <div className="set-row"><span className="sico"><Globe size={17} /></span><div><div className="st">Language</div></div><span className="chev">Indonesia <ChevronRight size={16} /></span></div>
            <div className="set-row" onClick={() => setNotif((v) => !v)}><span className="sico"><Bell size={17} /></span><div><div className="st">Notifications</div><div className="sd">Notify when recipient claims</div></div><button className={`toggle-sw${notif ? "" : " off"}`} aria-label="Notifications" /></div>
            <div className="set-row" onClick={() => setBio((v) => !v)}><span className="sico"><Fingerprint size={17} /></span><div><div className="st">Biometric lock</div><div className="sd">Fingerprint for each send</div></div><button className={`toggle-sw${bio ? "" : " off"}`} aria-label="Biometric" /></div>
          </div>

          <div className="section-title">Security &amp; support</div>
          <div className="settings-group">
            <div className="set-row" onClick={() => push("claim")}><span className="sico"><HandCoins size={17} /></span><div><div className="st">Preview recipient view</div><div className="sd">See family claim screen</div></div><span className="chev"><ChevronRight size={16} /></span></div>
            <div className="set-row"><span className="sico"><Shield size={17} /></span><div><div className="st">Wallet security</div></div><span className="chev"><ChevronRight size={16} /></span></div>
            <div className="set-row"><span className="sico"><LifeBuoy size={17} /></span><div><div className="st">Help</div></div><span className="chev"><ChevronRight size={16} /></span></div>
          </div>

          <div className="settings-group">
            <div className="set-row" onClick={disconnect}><span className="sico danger"><LogOut size={17} /></span><div><div className="st danger">Disconnect wallet</div></div></div>
          </div>
        </div>
      </div>
      <BottomNav />
    </>
  );
}
