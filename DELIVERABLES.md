# KirimStellar — Submission Deliverables

> **Track 1 — Payment & Consumer Applications**
> **APAC Stellar Hackathon 2026**

---

## 1. Project Description

**Project Name:** KirimStellar

**Tagline:** Instant cross-border remittance for Indonesian migrant workers — from days to seconds, from 7% to <0.1%.

**The Problem:**
Indonesian migrant workers (TKI) send approximately $9.7 billion home every year. They pay 5-7% in transfer fees and wait 2-3 days for money to arrive. That translates to ~$500-600 million per year lost to intermediaries — money that should reach families, not middlemen.

Millions of TKI in Malaysia, Hong Kong, Singapore, and Taiwan face the same pain: high fees eat into already modest wages, slow settlement leaves families waiting, and existing remittance corridors require physical agents or bank branches. Most senders don't even know the real IDR amount their family will receive due to opaque FX rates.

**The Solution:**
KirimStellar is a mobile-first remittance dApp that lets TKI send money home in seconds at near-zero cost. A sender connects their Freighter wallet, sends USDC, and it locks into a non-custodial Soroban escrow contract. The recipient claims the transfer via their own wallet and receives IDRT — an Indonesian Rupiah stablecoin pegged 1:1 to IDR — auto-converted through Stellar's built-in DEX.

The entire flow is trustless: only the sender can refund, only the recipient can claim, and no third party can touch the locked funds. Every transaction is visible on-chain via stellar.expert.

**Why Stellar:**
- Stellar's core strength is fast, cheap cross-border payments — exactly what remittance needs
- Soroban smart contracts (Rust) enable non-custodial escrow with timelock — no middleman risk
- USDC on Stellar provides stable value transport without crypto volatility
- IDRT (KB Trading) — an existing Indonesian Rupiah stablecoin — handles the last-mile off-ramp
- Stellar's built-in DEX enables automatic USDC→IDRT conversion without external bridges
- Horizon API provides real-time transaction tracking for both sender and receiver
- Stellar's 5-second ledger close means money arrives before a coffee gets cold

**User Experience:**
The interface is designed for non-crypto-native users. A TKI worker opens KirimStellar on their phone, connects Freighter, enters an amount and a recipient wallet address, and taps "Kirim." The app shows real-time status: pending → confirmed → claimed. The recipient receives a notification and sees the IDR value immediately.

**Technical Depth:**
- Soroban smart contract written in Rust (203 lines, 9 passing tests covering all edge cases)
- Non-custodial design: create_intent → execute_intent → refund_intent flow
- TTL management for persistent storage (30-day intent lifetime)
- Event emission for frontend synchronization
- Deployed and verified on Stellar testnet (contract ID: CDP6BDSF3...24TJ)
- React 18 + Vite 8 frontend with 14 screens, Stellar SDK v16, Freighter API v6

**Target Users:**
Primary: TKI workers in Malaysia, Hong Kong, Singapore, Taiwan.
Secondary: Receiving families in Indonesia.

**Market Viability:**
- $9.7B annual remittance flow from Indonesia's 4.7 million migrant workers
- IDRT is already live on Stellar, backed 1:1, trading against USDC
- Clear path to Stellar Community Fund Build Award ($150,000) for post-hackathon development
- Mobile-first approach matches real user behavior in SEA
- Regulatory tailwind: Indonesia's OJK now oversees crypto assets (Jan 2025)

**Competition:**
Incumbent remittance providers (Western Union, MoneyGram) charge 5-7% and take 2-3 days. KirimStellar offers the same service at <0.1% cost in under 5 seconds, with full transparency — every transaction is verifiable on-chain.

---

## 2. Demo Video Script (2-3 minutes)

### Scene 1 — Problem (0:00 - 0:25)
**Visual:** Map of SEA with arrows from Malaysia/HK/Singapore/Taiwan → Indonesia
**Narration:** "Every year, 4.7 million Indonesian migrant workers send $9.7 billion home. They pay 5 to 7 percent in fees and wait 2 to 3 days. That's half a billion dollars lost to middlemen. Introducing KirimStellar."

### Scene 2 — Solution Overview (0:25 - 0:45)
**Visual:** KirimStellar landing page / app on mobile screen
**Narration:** "KirimStellar replaces expensive, slow remittance rails with Stellar. Send money in seconds. Pay less than 0.1 percent. Every transaction is transparent and verifiable on-chain."

### Scene 3 — Demo: Send Flow (0:45 - 1:30)
**Visual:** Split screen — left = sender phone, right = stellar.expert
**Narration:**
- "A sender in Hong Kong opens KirimStellar on their phone."
- *[Show: Freighter wallet connect]*
- "They connect their wallet, enter the amount in USDC, and add the recipient's wallet address."
- *[Show: Send form filled, tap "Kirim"]*
- "The USDC locks into a Soroban escrow contract on Stellar."
- *[Show: stellar.expert with transaction confirmed — intent created]*
- "This all happens in about 5 seconds. The sender sees 'Processing' then 'Confirmed.'"

### Scene 4 — Demo: Claim Flow (1:30 - 2:00)
**Visual:** Right phone screen (recipient view)
**Narration:**
- "Back home in Indonesia, the recipient opens their wallet."
- *[Show: Recipient wallet with incoming transfer notification]*
- "They claim the transfer with one tap."
- *[Show: Claim button → success screen with IDR value]*
- "The USDC auto-converts to IDRT — Indonesian Rupiah stablecoin — directly on Stellar's built-in DEX."
- *[Show: stellar.expert showing the execute_intent transaction + transfer]*
- "Total time: under 10 seconds. Total cost: less than 0.1 percent."

### Scene 5 — Trust & Security (2:00 - 2:25)
**Visual:** Split screen — code view of the Soroban contract + architecture diagram
**Narration:**
- "KirimStellar is non-custodial. Funds are held in a Soroban smart contract — only the sender can get a refund, only the recipient can claim. No middleman, no admin key."
- "The contract has 9 automated tests covering every edge case — expired transfers, double claims, unauthorized access. All verified on Stellar testnet."

### Scene 6 — Impact + Call to Action (2:25 - 2:45)
**Visual:** KirimStellar logo + key stats overlaid
**Narration:**
- "Half a billion dollars a year belong in the pockets of Indonesian families, not remittance companies."
- "KirimStellar. Send money home. Instantly. On Stellar."
- *[Show: GitHub repo link, deployed contract address]*

---

## 3. Pitch Deck Outline

### Slide 1: Title
- KirimStellar logo
- "Instant Cross-Border Remittance on Stellar"
- Track 1 — Payment & Consumer Applications

### Slide 2: The Problem
- $9.7B/year in TKI remittances
- 5-7% fees → $500-600M lost annually
- 2-3 day settlement
- 4.7M migrant workers affected

### Slide 3: The Solution
- Send USDC → Lock in Soroban escrow → Claim as IDRT
- Seconds, not days
- <0.1% cost vs 5-7% incumbent
- Fully transparent on-chain

### Slide 4: How It Works
- Architecture diagram
- Flow: Sender → Escrow Contract → Stellar DEX → Recipient
- Tech stack: Soroban (Rust), Horizon API, USDC, IDRT

### Slide 5: Why Stellar
- Fast & cheap transactions (core Stellar strength)
- Soroban smart contracts for trustless escrow
- Built-in DEX for auto-conversion
- Existing stablecoin ecosystem (USDC + IDRT)

### Slide 6: Demo Screenshots
- Send screen
- Confirmation screen
- Claim screen
- Transaction explorer

### Slide 7: Technical Depth
- Contract: 203 lines Rust, 9 tests, deployed on testnet
- End-to-end verified: create_intent → execute_intent
- Non-custodial design (no admin key)
- Contract ID: CDP6BDSF3...

### Slide 8: Market
- $9.7B addressable market
- IDRT already live on Stellar
- Regulatory tailwind: OJK oversight (Jan 2025)
- SEA is fastest-growing crypto region (Chainalysis 2025)

### Slide 9: Go-to-Market
- Phase 1: Testnet MVP (hackathon)
- Phase 2: Mainnet pilot with anchor integration (SCF Build Award)
- Phase 3: Mobile app + on/off-ramp partnerships
- Revenue: 0.1% fee on volume

### Slide 10: Team
- Solo developer
- Rust + Stellar/Soroban experience
- Indonesia-based, direct understanding of TKI remittance problem

### Slide 11: Ask & Next Steps
- Competing for $20,000 Track 1 prize
- Seeking mentorship from Stellar ecosystem
- Path to SCF Build Award ($150,000) for mainnet launch

---

## 4. Submission Checklist

| # | Deliverable | File/Location | Status |
|---|---|---|---|
| 1 | Project Description | `DELIVERABLES.md` (Section 1) | ✅ Done |
| 2 | Public GitHub Repository | [github.com/0xshalah/KirimStellar](https://github.com/0xshalah/KirimStellar) | ✅ Done |
| 3 | Project README | [github.com/0xshalah/KirimStellar/README.md](https://github.com/0xshalah/KirimStellar) | ✅ Done |
| 4 | Demo Video | Record using shot list in `DEMO-SHOTS.md` | ⬜ Need to record |
| 5 | Pitch Deck | ✅ HTML version: `kirimstellar-pitch-deck.html` (save to prototypes/) | 🟡 HTML done, may need export |

### Pre-Submit Checks

- [ ] Push all code to GitHub (contracts + frontend + README + PRD)
- [ ] Record demo video (script in Section 2)
- [ ] Build pitch deck (outline in Section 3, Canva template: [canva.link/m9isikrjvmeirxf](https://canva.link/m9isikrjvmeirxf))
- [ ] Verify all links in submission form work
- [ ] Submit before 15 July — **do not wait for the last day**
