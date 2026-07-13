import { useState } from "react";
import { Clapperboard, X, ChevronUp } from "lucide-react";
import { useApp } from "../state/store.jsx";
import { sendAssetCode } from "../lib/stellar.js";

// Show ALL steps to everyone — no wallet requirement for demo browsing.
const STEPS = [
  ["landing", "Landing"],
  ["login", "Login"],
  ["register", "Register"],
  ["home", "Home"],
  ["send", "Send"],
  ["review", "Review"],
  ["success", "Success"],
  ["track", "Track"],
  ["claim", "Claim"],
  ["history", "History"],
  ["detail", "Detail"],
  ["recipients", "Recipients"],
  ["account", "Account"],
  ["topup", "Top up"],
];

export default function DemoBar() {
  const app = useApp();
  const {
    address, authView, setAuthView, route, goTab,
    draft, setDraft, result, setResult, selectedTx, setSelectedTx,
    recipients,
  } = app;

  const [open, setOpen] = useState(true);
  const current = !!address ? route : authView;

  function demoRecipient() {
    return recipients[0] || { name: "Ibu Sri Wahyuni", wallet: "GCMMUF2BORBERTSQFN4XE5UMILIGXEYSHT5C3BTHUZQCNCLCN5JC37PH", walletLabel: "Freighter" };
  }

  // Seed transient data so data-dependent screens render nicely when jumped to directly.
  function seed(target) {
    const rec = demoRecipient();
    const code = sendAssetCode();
    const now = new Date().toISOString();

    if (["review", "success", "track"].includes(target) && !draft) {
      setDraft({ amount: "200.00", recipient: rec });
    }
    if (["success", "track", "claim"].includes(target) && !result) {
      setResult({
        hash: "DEMO0000000000000000000000000000000000000000000000000000000000",
        ledger: 58204117,
        amount: "200.00",
        recipient: rec,
        assetCode: code,
        createdAt: now,
      });
    }
    if (target === "detail" && !selectedTx) {
      setSelectedTx({
        id: "demo",
        hash: "DEMO0000000000000000000000000000000000000000000000000000000000",
        outgoing: true,
        counterparty: rec.wallet,
        amount: "200.00",
        assetCode: code,
        createdAt: now,
      });
    }
  }

  function jump(target) {
    if (["review", "success", "track", "claim", "detail"].includes(target)) {
      seed(target);
    }
    if (!!address) {
      goTab(target);
    } else {
      setAuthView(target);
    }
  }

  if (!open) {
    return (
      <button className="demobar-tab" onClick={() => setOpen(true)} aria-label="Open demo bar">
        <Clapperboard size={14} /> Demo
      </button>
    );
  }

  return (
    <div className="demobar">
      <span className="db-label"><Clapperboard size={14} /> Demo</span>
      <div className="db-steps">
        {STEPS.map(([key, label]) => (
          <button
            key={key}
            className={`db-step${current === key ? " cur" : ""}`}
            onClick={() => jump(key)}
          >
            {label}
          </button>
        ))}
      </div>
      <button className="db-close" onClick={() => setOpen(false)} aria-label="Close demo bar">
        <X size={14} />
      </button>
    </div>
  );
}
