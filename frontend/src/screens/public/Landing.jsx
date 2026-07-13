import { useMemo, useState } from "react";
import {
  SendHorizontal, ArrowRight, Zap, BadgePercent, ShieldCheck, Repeat,
  Lock, Banknote, Smartphone, Eye, Globe,
} from "lucide-react";
import { useApp } from "../../state/store.jsx";
import { CONFIG } from "../../config.js";
import { formatIdr } from "../../lib/format.js";

export default function Landing() {
  const { setAuthView } = useApp();
  const [amount, setAmount] = useState("200.00");
  const recv = useMemo(() => {
    const n = parseFloat(String(amount).replace(/,/g, "")) || 0;
    return new Intl.NumberFormat("en-US", { maximumFractionDigits: 0 }).format(n * CONFIG.idrRate);
  }, [amount]);

  const code = CONFIG.sendAsset.code;

  return (
    <div className="landing">
      <nav>
        <div className="nav-inner">
          <div className="pbrand"><span className="mark"><SendHorizontal size={17} /></span> KirimStellar</div>
          <ul className="nav-links">
            <li><a onClick={() => scrollTo("how")}>How it works</a></li>
            <li><a onClick={() => scrollTo("cost")}>Cost</a></li>
            <li><a onClick={() => scrollTo("features")}>Features</a></li>
          </ul>
          <div className="nav-cta">
            <button className="pbtn pbtn-ghost" onClick={() => setAuthView("login")}>Log in</button>
            <button className="pbtn pbtn-lime" onClick={() => setAuthView("register")}>Send money</button>
          </div>
        </div>
      </nav>

      <header className="wrap">
        <div className="hero">
          <div className="hero-copy">
            <h1>Send money home in <span className="accent">seconds</span></h1>
            <p className="lead">Built for Indonesian workers abroad. Near-zero fees, honest rates, money that lands before you close the app.</p>
            <div className="hero-actions">
              <button className="pbtn pbtn-lime pbtn-lg" onClick={() => setAuthView("register")}>Start sending <ArrowRight size={18} /></button>
              <button className="pbtn pbtn-ghost pbtn-lg" onClick={() => scrollTo("how")}>See how it works</button>
            </div>
            <div className="hero-trust">
              <span className="item"><Zap size={15} /> Arrives in ~5s</span>
              <span className="item"><BadgePercent size={15} /> Fee &lt; 0.1%</span>
              <span className="item"><ShieldCheck size={15} /> On-chain escrow</span>
            </div>
          </div>

          <div className="hero-visual">
            <div className="hero-card">
              <div className="float-badge"><Zap size={12} /> Arrives in ~5s</div>
              <div className="leg2">
                <div>
                  <div className="leg-label">You send</div>
                  <input className="amount" value={amount} inputMode="decimal" onChange={(e) => setAmount(e.target.value)} aria-label="Amount to send in USDC" />
                </div>
                <span className="pill"><span className="flag usdc">$</span> {code}</span>
              </div>
              <div className="rail">
                <div className="rail-row"><span className="ico"><Zap size={13} /></span> Network fee <span className="val free">$0.02</span></div>
                <div className="rail-row"><span className="ico"><Repeat size={13} /></span> Mid-market rate <span className="val">{CONFIG.idrRate.toLocaleString("en-US")}</span></div>
              </div>
              <div className="leg2">
                <div>
                  <div className="leg-label">They receive</div>
                  <div className="amount"><span>{recv}</span> <span className="cur">IDR</span></div>
                </div>
                <span className="pill"><span className="flag idr" /> IDR</span>
              </div>
              <button className="card-cta" onClick={() => setAuthView("register")}>Send now <ArrowRight size={17} /></button>
            </div>
          </div>
        </div>
      </header>

      <div className="strip">
        <div className="strip-inner">
          <div className="strip-item"><span className="n">$9.7B</span><span className="l">sent home by TKI each year</span></div>
          <div className="strip-item"><span className="n">&lt; 0.1%</span><span className="l">fee, not 5-7%</span></div>
          <div className="strip-item"><span className="n">~5s</span><span className="l">to arrive, not 2-3 days</span></div>
          <div className="strip-item"><span className="n">1:1</span><span className="l">IDRT backed by Rupiah</span></div>
        </div>
      </div>

      <section className="block wrap" id="how">
        <div className="section-head">
          <span className="eyebrow">How it works</span>
          <h2>Three steps. No crypto knowledge required.</h2>
          <p>You send stable dollars, your family receives Rupiah. Everything in between is handled on Stellar.</p>
        </div>
        <div className="steps">
          <div className="step"><div className="num">1</div><h3>Connect your wallet</h3><p>Open Freighter, enter an amount and the recipient's address. Done in one tap.</p></div>
          <div className="step"><div className="num">2</div><h3>Funds lock safely</h3><p>A Soroban escrow contract locks your USDC until your family claims it. Not claimed? It refunds automatically.</p></div>
          <div className="step"><div className="num">3</div><h3>Family receives Rupiah</h3><p>Auto-converted to IDRT via Stellar's built-in DEX, ready to cash out to a local account.</p></div>
        </div>
      </section>

      <section className="block wrap" id="cost">
        <div className="compare">
          <div>
            <span className="eyebrow" style={{ color: "var(--lime)" }}>Compare</span>
            <h2>$600 million a year lost to middlemen.</h2>
            <p className="lead">Send Rp 3.2M the old way and your family loses nearly Rp 200K. With KirimStellar, almost all of it arrives.</p>
          </div>
          <div className="compare-rows">
            <div className="crow"><span className="label">Transfer fee</span><span className="old">Rp 195,000</span><span className="new">Rp 300</span></div>
            <div className="crow"><span className="label">Time to arrive</span><span className="old">2-3 days</span><span className="new">~5 seconds</span></div>
            <div className="crow"><span className="label">Exchange rate</span><span className="old">+3% markup</span><span className="new">mid-market</span></div>
            <div className="crow"><span className="label">Needs an agent</span><span className="old">Yes</span><span className="new">No</span></div>
          </div>
        </div>
      </section>

      <section className="block wrap" id="features">
        <div className="section-head">
          <span className="eyebrow">Why Stellar</span>
          <h2>Built for money that actually moves.</h2>
        </div>
        <div className="features">
          <div className="feat wide"><div className="fico"><Lock size={20} /></div><h3>Escrow that guards your money</h3><p>Every transfer locks in a Soroban smart contract with a timelock. Claimed within 7 days, or it returns to you. No one can touch it in between.</p></div>
          <div className="feat"><div className="fico"><Banknote size={20} /></div><h3>Real Rupiah</h3><p>IDRT is backed 1:1 to the Rupiah, ready to cash out through a local anchor.</p></div>
          <div className="feat"><div className="fico"><Smartphone size={20} /></div><h3>Mobile-first</h3><p>Designed for phones, because that's where your family is.</p></div>
          <div className="feat"><div className="fico"><Eye size={20} /></div><h3>Fully transparent</h3><p>Track every transaction in real time via Horizon, verify it yourself on the explorer.</p></div>
          <div className="feat"><div className="fico"><Globe size={20} /></div><h3>Cross-border</h3><p>From Malaysia, Hong Kong, Singapore, Taiwan, straight home.</p></div>
        </div>
      </section>

      <section className="cta-band wrap" id="start">
        <div>
          <h2>Send your first transfer tonight.</h2>
          <p>Free to start. Your first transfer can land before your coffee gets cold.</p>
          <div className="hero-actions">
            <button className="pbtn pbtn-lime pbtn-lg" onClick={() => setAuthView("register")}>Start sending <ArrowRight size={18} /></button>
          </div>
        </div>
      </section>

      <footer>
        <div className="wrap foot-inner">
          <div className="pbrand"><span className="mark"><SendHorizontal size={17} /></span> KirimStellar</div>
          <ul className="foot-links">
            <li><a onClick={() => scrollTo("how")}>How it works</a></li>
            <li><a onClick={() => scrollTo("cost")}>Cost</a></li>
            <li><a onClick={() => scrollTo("features")}>Features</a></li>
            <li><a href="https://github.com/0xshalah/KirimStellar" target="_blank" rel="noreferrer">GitHub</a></li>
          </ul>
          <p className="fnote">Built on Stellar · APAC Stellar Hackathon 2026</p>
        </div>
      </footer>
    </div>
  );
}

function scrollTo(id) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
}
