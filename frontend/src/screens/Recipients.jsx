import { useState } from "react";
import { UserPlus, Pencil, ArrowRight } from "lucide-react";
import { useApp } from "../state/store.jsx";
import { AppBar, BottomNav } from "../components/ui.jsx";
import { isValidPublicKey } from "../lib/stellar.js";
import { initials, shortKey } from "../lib/format.js";

export default function Recipients() {
  const { recipients, saveRecipient, setDraft, draft, push } = useApp();
  const [editing, setEditing] = useState(null); // null | recipient | 'new'

  function pick(rec) {
    setDraft({ ...(draft || {}), recipient: rec });
    push("send");
  }

  if (editing) {
    return <RecipientForm initial={editing === "new" ? null : editing} onCancel={() => setEditing(null)} onSave={(r) => { saveRecipient(r); setEditing(null); }} />;
  }

  return (
    <>
      <div className="app-body">
        <AppBar title="Recipients" />
        <div className="pad">
          <button className="add-rec" onClick={() => setEditing("new")}>
            <UserPlus size={17} /> Add new recipient
          </button>
          <div style={{ marginTop: "var(--space-lg)" }}>
            {recipients.map((r) => (
              <div className="rec-item" key={r.id} onClick={() => pick(r)}>
                <div className="rav">{initials(r.name)}</div>
                <div>
                  <div className="r-n">{r.name}</div>
                  <div className="r-s">{r.walletLabel || "Wallet"} · {shortKey(r.wallet)}</div>
                </div>
                <span className="redit" onClick={(e) => { e.stopPropagation(); setEditing(r); }}>
                  <Pencil size={16} />
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
      <BottomNav />
    </>
  );
}

function RecipientForm({ initial, onCancel, onSave }) {
  const [name, setName] = useState(initial?.name || "");
  const [wallet, setWallet] = useState(initial?.wallet || "");
  const [label, setLabel] = useState(initial?.walletLabel || "Freighter");
  const [touched, setTouched] = useState(false);

  const walletValid = isValidPublicKey(wallet.trim());
  const canSave = name.trim().length > 0 && walletValid;

  function submit() {
    setTouched(true);
    if (!canSave) return;
    onSave({
      id: initial?.id,
      name: name.trim(),
      wallet: wallet.trim(),
      walletLabel: label.trim() || "Wallet",
    });
  }

  return (
    <div className="app-body">
      <AppBar title={initial ? "Edit recipient" : "New recipient"} showBack />
      <div className="pad">
        <div className="field">
          <label>Name</label>
          <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Ibu Sri Wahyuni" />
        </div>
        <div className="field">
          <label>Stellar wallet address</label>
          <textarea
            value={wallet}
            onChange={(e) => setWallet(e.target.value)}
            onBlur={() => setTouched(true)}
            placeholder="G…"
          />
          {touched && wallet && !walletValid && (
            <div className="field-error">Invalid Stellar address (must start with G, 56 characters).</div>
          )}
        </div>
        <div className="field">
          <label>Wallet label (optional)</label>
          <input value={label} onChange={(e) => setLabel(e.target.value)} placeholder="Freighter / LOBSTR" />
        </div>
      </div>
      <div className="pad push-bottom">
        <div style={{ display: "flex", gap: "var(--space-md)" }}>
          <button className="btn btn-ghost" onClick={onCancel}>Cancel</button>
          <button className="btn btn-primary" onClick={submit} disabled={!canSave}>
            Save <ArrowRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}
