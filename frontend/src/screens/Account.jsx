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
      setMsg("Berhasil didanai Friendbot. Saldo diperbarui.");
    } catch (e) {
      setMsg(e.message || "Gagal mendanai akun.");
    } finally {
      setFunding(false);
    }
  }

  return (
    <>
      <div className="app-body">
        <AppBar title="Akun" />
        <div className="pad">
          <div className="state-wrap" style={{ flex: "none", padding: "var(--space-lg) 0 var(--space-xl)" }}>
            <div className="avatar" style={{ width: 84, height: 84, fontSize: "2rem", borderRadius: "50%" }}>
              {initials("Kamu")}
            </div>
            <h3 style={{ marginTop: "var(--space-md)" }}>Dompet kamu</h3>
            <button className="pill" style={{ marginTop: "var(--space-md)" }} onClick={copy}>
              {copied ? <Check size={14} /> : <Copy size={14} />} {shortKey(address, 6, 6)}
            </button>
          </div>

          <div className="section-title">Dompet</div>
          <div className="settings-group">
            <div className="set-row"><span className="sico"><Globe size={17} /></span><div><div className="st">Jaringan</div></div><span className="chev">{network?.network || "TESTNET"}</span></div>
            <a className="set-row" href={explorerAccount(address)} target="_blank" rel="noreferrer">
              <span className="sico"><ExternalLink size={17} /></span><div><div className="st">Lihat di explorer</div><div className="sd">stellar.expert</div></div><span className="chev"><ChevronRight size={16} /></span>
            </a>
            {isTestnet && (
              <div className="set-row" onClick={funding ? undefined : fund}>
                <span className="sico"><Droplet size={17} /></span>
                <div><div className="st">Danai akun (Friendbot)</div><div className="sd">10.000 XLM testnet gratis</div></div>
                <span className="chev">{funding ? <span className="spinner" /> : <ChevronRight size={16} />}</span>
              </div>
            )}
          </div>
          {msg && <div className="muted-note" style={{ marginTop: 0, marginBottom: "var(--space-lg)" }}>{msg}</div>}

          <div className="section-title">Preferensi</div>
          <div className="settings-group">
            <div className="set-row"><span className="sico"><Globe size={17} /></span><div><div className="st">Bahasa</div></div><span className="chev">Indonesia <ChevronRight size={16} /></span></div>
            <div className="set-row" onClick={() => setNotif((v) => !v)}><span className="sico"><Bell size={17} /></span><div><div className="st">Notifikasi</div><div className="sd">Kabari saat penerima klaim</div></div><button className={`toggle-sw${notif ? "" : " off"}`} aria-label="Notifikasi" /></div>
            <div className="set-row" onClick={() => setBio((v) => !v)}><span className="sico"><Fingerprint size={17} /></span><div><div className="st">Kunci biometrik</div><div className="sd">Sidik jari tiap kirim</div></div><button className={`toggle-sw${bio ? "" : " off"}`} aria-label="Biometrik" /></div>
          </div>

          <div className="section-title">Keamanan &amp; dukungan</div>
          <div className="settings-group">
            <div className="set-row" onClick={() => push("claim")}><span className="sico"><HandCoins size={17} /></span><div><div className="st">Pratinjau sisi penerima</div><div className="sd">Lihat layar klaim keluarga</div></div><span className="chev"><ChevronRight size={16} /></span></div>
            <div className="set-row"><span className="sico"><Shield size={17} /></span><div><div className="st">Keamanan dompet</div></div><span className="chev"><ChevronRight size={16} /></span></div>
            <div className="set-row"><span className="sico"><LifeBuoy size={17} /></span><div><div className="st">Bantuan</div></div><span className="chev"><ChevronRight size={16} /></span></div>
          </div>

          <div className="settings-group">
            <div className="set-row" onClick={disconnect}><span className="sico danger"><LogOut size={17} /></span><div><div className="st danger">Putuskan dompet</div></div></div>
          </div>
        </div>
      </div>
      <BottomNav />
    </>
  );
}
