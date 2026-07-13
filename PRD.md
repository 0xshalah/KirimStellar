# KirimStellar — Product Requirements Document (PRD)

> **Project:** KirimStellar — Remittance dApp for Indonesian Migrant Workers
> **Track:** 1 — Payment & Consumer Applications ($20,000)
> **Team:** Solo
> **Competition:** APAC Stellar Hackathon 2026
> **Submission Deadline:** 15 July 2026
> **Repo:** https://github.com/0xshalah/KirimStellar
> **Status:** MVP build phase (triage mode — 2 days to deadline)

---

## 1. Overview

KirimStellar is a mobile-first remittance dApp that lets Indonesian migrant workers (TKI) send money home in seconds at near-zero cost, using Stellar for settlement and a local IDR anchor (IDRT) for the last-mile off-ramp. A sender locks USDC in a Soroban escrow contract; the recipient claims it and auto-converts to IDRT via Stellar's built-in DEX.

**One-liner:** Western Union speed of 2-3 days and 5-7% fees, replaced by seconds and <0.1% on Stellar.

---

## 2. Problem Statement

Indonesian migrant workers send ~$9.7B home every year. They pay **5-7% in transfer fees** and wait **2-3 days** for money to arrive. That's ~$500-600M/year lost to intermediaries — money that should reach families.

**Pain points:**
- High fees eat into low-margin remittances
- Slow settlement (2-3 days) hurts families needing cash now
- Existing rails require physical agents / bank branches
- FX opacity: senders don't know the real IDR their family receives

---

## 3. Goals & Non-Goals

### Goals (MVP)
- Send value from a sender wallet → recipient wallet on Stellar testnet
- Escrow with timelock: lock → claim → refund-on-expiry
- Recipient receives value convertible to IDRT (IDR-pegged)
- Simple, non-crypto-native UI: send form + real-time status
- Working end-to-end happy path demonstrable on video

### Non-Goals (post-hackathon)
- Mainnet production launch (testnet is acceptable for judging)
- Full SEP-24 fiat deposit/withdraw integration (mock/demo the ramp)
- Multi-currency corridors beyond IDR
- KYC/AML compliance flows
- Native mobile apps (responsive web is enough)

---

## 4. Target Users

**Primary:** TKI (Tenaga Kerja Indonesia) working in Malaysia, Hong Kong, Singapore, Taiwan who regularly send money home.

**Secondary:** Receiving families in Indonesia who cash out to IDR.

**Persona — "Siti":** Domestic worker in Hong Kong, sends ~HKD 3,000/month to her mother in East Java. Currently pays ~6% and waits 2 days. Owns a smartphone, not crypto-native.

---

## 5. User Stories

1. As a **sender**, I connect my Freighter wallet so I can pay from my USDC balance.
2. As a **sender**, I enter an amount and recipient wallet so I can initiate a transfer.
3. As a **sender**, the app locks my USDC in escrow so funds are safe until claimed.
4. As a **recipient**, I claim the transfer to my wallet so I receive the value.
5. As a **recipient**, my USDC auto-converts to IDRT via the DEX so I hold IDR value.
6. As a **sender**, I get a refund if the transfer isn't claimed before the timelock expires.
7. As **either party**, I see real-time transaction status via Horizon so I trust it went through.

---

## 6. Functional Requirements

| # | Requirement | Priority |
|---|---|---|
| FR-1 | Connect Freighter wallet (sender) | P0 |
| FR-2 | Send form: amount + recipient address, input validation | P0 |
| FR-3 | Soroban escrow: `create_intent` locks USDC with recipient + timelock | P0 |
| FR-4 | Recipient `execute_intent` (claim) releases funds | P0 |
| FR-5 | `refund_intent` returns funds to sender after expiry | P1 |
| FR-6 | Real-time status tracking via Horizon API | P1 |
| FR-7 | Auto-swap USDC → IDRT via Stellar DEX on claim | P1 |
| FR-8 | Status/confirmation screen with tx link to stellar.expert | P2 |

**P0 = must ship for a working demo. P1 = strong bonus. P2 = if time allows.**

---

## 7. Non-Functional Requirements

- **Security:** No hardcoded keys/secrets; wallet-based signing only; basic auth on contract calls
- **UX:** Usable by non-crypto-native users; clear onboarding; mobile-first responsive layout
- **Performance:** Confirmation within seconds (Stellar ledger close ~5s)
- **Cost:** Transaction fees paid in XLM, kept near-zero
- **Transparency:** Every transaction viewable on-chain via explorer link

---

## 8. Technical Architecture

\`\`\`
SENDER (TKI abroad)        STELLAR BLOCKCHAIN            RECEIVER (family in ID)
  Freighter (USDC)  ──▶   Soroban Escrow Contract  ──▶   LOBSTR/Freighter (IDRT)
                          - lock USDC
                          - set recipient + timelock (7d)
                          Horizon API (status tracking)
                          Stellar DEX (USDC → IDRT auto-swap)
\`\`\`

| Layer | Technology | Function |
|---|---|---|
| Smart Contract | Soroban (Rust) | Escrow, routing, timelock |
| Backend/API | Horizon API | Tx status, balances, history |
| Frontend | React / Next.js | Send form + status UI |
| Wallet | Freighter (sender), LOBSTR (receiver) | Signing, receiving |
| Stablecoin | USDC on Stellar | Stable value transport |
| Off-ramp | IDRT (KB Trading) | IDR-pegged last mile |

**Key references:**
- Escrow pattern: EpochSend (MIT) — `create_intent` / `execute_intent` / `refund_intent`
- Timelock: soroban-examples/timelock (Apache 2.0)
- IDRT issuer: `GDPKQ2TSNJOFSEE7XSUXPWRP27H6GFGLWD7JCHNEYYWQVGFA543EVBVT`
- USDC issuer: `GA5ZSEJYB37JRC5AVCIA5MOP4RHTM335X2KGX3IHOJAPP5RE34K4KZVN`

---

## 9. Success Metrics (Demo)

- End-to-end happy path works on testnet: send → lock → claim
- Transaction settles in seconds, visible on stellar.expert
- Effective cost of a transfer < 0.1% vs 5-7% incumbent
- A non-technical tester completes a send without help

---

## 10. Deliverables Mapping (Hackathon)

| # | Deliverable | Where |
|---|---|---|
| 1 | Project Description | Submission form + repo README |
| 2 | Public GitHub Repo | github.com/0xshalah/KirimStellar |
| 3 | Project README | Setup, architecture, run guide |
| 4 | Demo Video | Dual-device: sender + receiver flow |
| 5 | Pitch Deck | Problem, solution, market, team |

---

## 11. Scope for the Final 2 Days (Triage)

**Day 1 (13 Jul):** Finish + test escrow contract on testnet. Wire minimal frontend (Freighter connect, send form, claim). Get happy path green.
**Day 2 (14 Jul):** Polish UI enough for a non-crypto-native. Record demo video. Finalize README + pitch deck. **Submit — do not wait for the 15th.**

**Cut if needed:** mainnet deploy, full SEP-24 ramp, refund UI, auto-swap (mock it in the video narrative if the code isn't ready).

---

## 12. Judging Rubric Alignment

| Criteria | Weight | How KirimStellar hits it |
|---|---|---|
| Technical Implementation & Stellar Usage | 25% | Real Soroban escrow contract, Horizon, DEX, live on testnet |
| Real-World Fit & Use Case | 25% | $9.7B TKI remittance market, clear target user |
| Innovation & Differentiation | 20% | Escrow + timelock + IDR anchor, not a wallet clone |
| Viability & Go-to-Market | 10% | IDRT live, clear corridor, path to SCF grant |
| UX & Accessibility | 5% | Mobile-first, non-crypto-native onboarding |
| Team & Ability to Continue | 5% | Solo but focused; SCF Build Award path |
