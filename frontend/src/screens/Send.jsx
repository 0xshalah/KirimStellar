import { useMemo, useState } from "react";
import { ArrowRight, ChevronRight, Repeat, Zap, UserPlus } from "lucide-react";
import { useApp } from "../state/store.jsx";
import { AppBar } from "../components/ui.jsx";
import { sendAssetCode } from "../lib/stellar.js";
import { CONFIG } from "../config.js";
import { formatIdr, toIdr, initials, shortKey } from "../lib/format.js";

const NATIVE_RESERVE = 1.5; // keep some XLM for base reserve + fees when sending native

export default function Send() {
  const { draft, setDraft, push, recipients, balances } = useApp();
  const code = sendAssetCode();

  const [amount, setAmount] = useState(draft?.amount || "");
  const recipient = draft?.recipient || recipients[0] || null;

  const idrEstimate = useMemo(() => formatIdr(toIdr(amount)), [amount]);

  const available = Number(balances.sendAsset) || 0;
  const maxSendable = CONFIG.sendAsset.isNative ? Math.max(0, available - NATIVE_RESERVE) : available;

  const numAmount = parseFloat(String(amount).replace(/,/g, ""));
  let error = null;
  if (amount !== "" && (!Number.isFinite(numAmount) || numAmount <= 0)) error = "Incomingkan jumlah yang valid";
  else if (Number.isFinite(numAmount) && numAmount > maxSendable) {
    error = `Insufficient balance. Max ${maxSendable.toFixed(2)} ${code}`;
  }

  const canNext = recipient && Number.isFinite(numAmount) && numAmount > 0 && !error;

  function next() {
    if (!canNext) return;
    setDraft({ amount: numAmount.toFixed(2), recipient });
    push("review");
  }

  function pickRecipient() {
    setDraft({ amount, recipient });
    push("recipients");
  }

  return (
    <div className="app-body">
      <AppBar title="Send money" showBack />
      <div className="pad">
        <div className="card converter">
          <div className="leg">
            <div>
              <div className="leg-label">You send</div>
              <input
                className="amount"
                value={amount}
                inputMode="decimal"
                placeholder="0.00"
                onChange={(e) => setAmount(e.target.value)}
                onBlur={() => {
                  const n = parseFloat(String(amount).replace(/,/g, ""));
                  if (Number.isFinite(n)) setAmount(n.toFixed(2));
                }}
                aria-label={`Amount ${code}`}
              />
            </div>
            <span className="pill"><span className="flag usdc">{code[0]}</span> {code}</span>
          </div>
          <div className="rail">
            <div className="rail-row">
              <span className="ico"><Zap size={12} /></span> Network fee
              <span className="val free">~0.00001 XLM</span>
            </div>
            <div className="rail-row">
              <span className="ico"><Repeat size={12} /></span> Estimated rate
              <span className="val">{CONFIG.idrRate.toLocaleString("id-ID")}</span>
            </div>
          </div>
          <div className="leg">
            <div>
              <div className="leg-label">Estimated they receive</div>
              <div className="amount"><span>{idrEstimate}</span> <span className="cur">IDR</span></div>
            </div>
            <span className="pill"><span className="flag idr" /> IDR</span>
          </div>
        </div>

        {error && <div className="field-error">{error}</div>}

        {recipient ? (
          <div className="recipient-row" onClick={pickRecipient}>
            <div className="r-av">{initials(recipient.name)}</div>
            <div>
              <div className="r-n">{recipient.name}</div>
              <div className="r-s">{recipient.walletLabel || "Wallet"} · {shortKey(recipient.wallet)}</div>
            </div>
            <span className="r-chev"><ChevronRight size={18} /></span>
          </div>
        ) : (
          <button className="add-rec" style={{ marginTop: "var(--space-lg)" }} onClick={() => push("recipients")}>
            <UserPlus size={17} /> Choose recipient
          </button>
        )}
      </div>

      <div className="pad push-bottom">
        <button className="btn btn-primary" onClick={next} disabled={!canNext}>
          Continue <ArrowRight size={17} />
        </button>
      </div>
    </div>
  );
}
