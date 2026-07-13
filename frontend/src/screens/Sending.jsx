import { useEffect, useRef, useState } from "react";
import { X, RotateCw } from "lucide-react";
import { useApp } from "../state/store.jsx";
import { AppBar } from "../components/ui.jsx";
import { buildTransferXdr, submitSignedXdr, sendAssetCode } from "../lib/stellar.js";
import { signXdr } from "../lib/wallet.js";

const STEP_LABEL = {
  building: "Preparing transaction…",
  signing: "Waiting for signature in Freighter…",
  submitting: "Sending to Stellar network…",
};

export default function Sending() {
  const { address, draft, setResult, refresh, push, back, goTab } = useApp();
  const [step, setStep] = useState("building");
  const [error, setError] = useState(null);
  const ran = useRef(false);

  useEffect(() => {
    if (ran.current) return;
    ran.current = true;

    (async () => {
      try {
        const { amount, recipient } = draft;
        setStep("building");
        const xdr = await buildTransferXdr({
          source: address,
          destination: recipient.wallet,
          amount,
          memo: "SendStellar",
        });

        setStep("signing");
        const signed = await signXdr(xdr, address);

        setStep("submitting");
        const res = await submitSignedXdr(signed);

        setResult({
          hash: res.hash,
          ledger: res.ledger,
          amount,
          recipient,
          assetCode: sendAssetCode(),
          createdAt: new Date().toISOString(),
        });
        refresh();
        push("success");
      } catch (e) {
        setError(humanize(e));
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (error) {
    return (
      <div className="app-body">
        <AppBar title="Send money" showBack />
        <div className="state-wrap">
          <div className="state-ico danger"><X size={34} /></div>
          <h3>Transaction failed</h3>
          <p>{error}</p>
          <div style={{ display: "flex", gap: "var(--space-md)", marginTop: "var(--space-xl)" }}>
            <button className="btn btn-ghost btn-auto" onClick={() => goTab("home")}>Cancel</button>
            <button className="btn btn-primary btn-auto" onClick={back}>
              <RotateCw size={15} /> Try again
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="app-body">
      <div className="center-col">
        <div className="spinner big" />
        <div>
          <h3 style={{ fontSize: "1.25rem", fontWeight: 800 }}>{STEP_LABEL[step]}</h3>
          <p style={{ color: "var(--muted)", fontWeight: 500, marginTop: "var(--space-sm)" }}>
            {step === "signing"
              ? "Open the Freighter popup and approve the transaction."
              : "Hang tight, don't close this page."}
          </p>
        </div>
      </div>
    </div>
  );
}

function humanize(e) {
  const msg = e?.message || String(e);
  if (/user (declined|rejected)|denied|reject/i.test(msg)) return "Signing was cancelled in Freighter.";
  if (/network|passphrase/i.test(msg)) return "Freighter network mismatch. Switch to Testnet and try again.";
  if (/underfunded|insufficient|tx_insufficient|op_underfunded/i.test(msg)) return "Insufficient balance for this transaction.";
  if (/op_no_destination|no_destination/i.test(msg)) return "Recipient address is not active on the network.";
  return msg;
}
