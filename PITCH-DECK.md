# KirimStellar — Pitch Deck (Ready for Canva)

> Copy-paste each slide into Canva. Visual suggestions in `[brackets]`.
> Canva template: https://canva.link/m9isikrjvmeirxf
> 
> **Verify before finalizing:** All numbers must match repo exactly.
> 203 lines Rust · 9 tests passing · Contract ID: CDP6BDSF3JXIDED6TACKTXTJV4H47B3HHN3FUM7SHINUALTLEUHC24TJ · Wasm: 5,758 bytes

---

## SLIDE 1 — Title

```
[Visual: KirimStellar logo + gradient dark bg]

KIRIMSTELLAR
Instant Cross-Border Remittance on Stellar

Track 1 — Payment & Consumer Applications
APAC Stellar Hackathon 2026

Shalahuddin Al-Ayyubi
github.com/0xshalah/KirimStellar
```

---

## SLIDE 2 — The Problem

```
[Visual: Map of SEA with arrows from HK/SG/MY/TW → Indonesia]

$9.7 BILLION
sent home by Indonesian migrant workers every year

5-7%               2-3 days
in transfer fees   to arrive

= $500-600 million lost annually to middlemen

4.7 million TKI workers affected.
Money that should reach families, not intermediaries.
```

---

## SLIDE 3 — The Solution

```
[Visual: Simple flow diagram — phone → blockchain → phone]

KIRIMSTELLAR

Send money home in seconds. Pay less than 0.1%.

USDC                      [Soroban Escrow]               IDRT
(Sender) ──────────────────▶ (Locked) ──────────────────▶ (Receiver)

  < 5 seconds               Non-custodial              1:1 IDR pegged
  < 0.1% fee                No middleman               Via Stellar DEX

Speed of crypto. Stability of fiat. Trustless in between.
```

---

## SLIDE 4 — How It Works

```
[Visual: Architecture diagram — 4 boxes connected]

┌──────────┐      ┌──────────────┐      ┌───────────┐      ┌──────────┐
│  SENDER  │      │   STELLAR    │      │  STELLAR  │      │ RECEIVER │
│ Freighter│─────▶│  BLOCKCHAIN  │─────▶│    DEX    │─────▶│ LOBSTR   │
│  (USDC)  │      │              │      │ (auto-con-│      │ (IDRT)   │
│          │      │ Soroban      │      │  vert)    │      │          │
│   HK/SG  │      │ Escrow       │      │ USDC→IDRT │      │   IDN    │
│   /MY    │      │ Contract     │      │           │      │          │
└──────────┘      └──────────────┘      └───────────┘      └──────────┘

1. Sender locks USDC in escrow
2. Recipient claims with one tap
3. USDC → IDRT via Stellar DEX
4. Funds settled in 5 seconds

Horizon API provides real-time status for both parties
```

---

## SLIDE 5 — Why Stellar

```
[Visual: Stellar logo + 4 icon cards]

FAST                          TRUSTLESS
5-second ledger close         Non-custodial Soroban escrow
Money arrives instantly       No admin key. No middleman.

BUILT-IN DEX                  REAL ASSETS
Auto-convert USDC → IDRT      USDC on Stellar (live)
No external bridge needed     IDRT — Rupiah stablecoin (live)

We didn't build a blockchain. We built on the one
purpose-made for cross-border payments.
```

---

## SLIDE 6 — Demo Screenshots

```
[Visual: 2 phone screenshots side by side]

LEFT: Send screen                    RIGHT: Claim success screen
- Wallet connected: 1,000 USDC       - "Received: Rp 800,000"
- Recipient address filled           - Transaction confirmed
- Amount: 50 USDC                    - View on stellar.expert
- [Tap: "Kirim"]                     - Status: ✓ Claimed

[Bottom label:]
Live on Stellar Testnet · Contract verified · 9 passing tests
```

---

## SLIDE 7 — Technical Depth

```
[Visual: Code snippet of create_intent + test counts]

SMART CONTRACT (Soroban · Rust)

┌─────────────────────────────────────────┐
│ Contracts verified on testnet           │
│                                          │
│ Contract ID:                             │
│ CDP6BDSF3JXIDED6TACKTXTJV4H47B3HHN3FUM7SHINUALTLEUHC24TJ │
│                                          │
│ 203 lines    ·    9 tests    ·    5,758 bytes wasm   │
│                                          │
│ Functions:                               │
│  create_intent()  — lock tokens          │
│  execute_intent() — claim tokens         │
│  refund_intent()  — refund after expiry  │
│  get_intent()     — query state          │
└─────────────────────────────────────────┘

End-to-end verified on Stellar testnet.
All 9 tests pass: happy path, double-claim, expired, zero-amount,
past-expiration, missing-intent.
```

---

## SLIDE 8 — Market

```
[Visual: Stats cards with icons]

ADDRESSABLE MARKET

$9.7B                         4.7M
Annual remittance flow        Indonesian migrant workers

FASTEST GROWING REGION
APAC on-chain activity up 69% YoY (Chainalysis 2025)
India, Pakistan, Vietnam lead grassroots crypto adoption

REGULATORY TAILWIND
Indonesia: OJK now oversees crypto assets (Jan 2025)
Vietnam: Formal crypto framework launched (Sep 2025)
Stablecoin regulation maturing across SEA

💡 The region is ready. The infrastructure is live.
   The users are already here.
```

---

## SLIDE 9 — Competition

```
[Visual: Comparison table — KirimStellar vs incumbents]

                    Western Union     Wise        KirimStellar
                    ─────────────     ────        ────────────
Transfer fee         5-7%             0.5-1%      < 0.1%
Settlement time      2-3 days         1-2 days    < 5 seconds
Transparency         ✗ Opaque FX      ✗ Opaque    ✓ On-chain
Custody              Centralized      Centralized Non-custodial
Need bank account?   Sometimes        Yes         No — just wallet

KirimStellar doesn't compete on features.
It competes on infrastructure cost — zero marginal cost per transfer.
```

---

## SLIDE 10 — Go-to-Market

```
[Visual: 3-phase timeline]

PHASE 1 — Hackathon (NOW)            PHASE 2 — SCF Build Award
│                                      │
├─ Soroban escrow contract ✅          ├─ Mainnet deployment
├─ End-to-end testnet flow ✅          ├─ IDRT anchor integration
├─ Frontend prototype (14 screens) ✅  ├─ Full SEP-24 on/off-ramp
└─ 9 passing tests ✅                  └─ $150,000 Stellar Community Fund

                           PHASE 3 — Production
                           │
                           ├─ Mobile app (iOS/Android)
                           ├─ TKI community onboarding
                           ├─ Local anchor partnerships
                           └─ Revenue: 0.1% flat fee on volume

Target: 0.1% of $9.7B market = $9.7M annual revenue at scale
```

---

## SLIDE 11 — Team & Ask

```
[Visual: Personal photo (optional) + call to action]

SHALAHUDDIN AL-AYYUBI
Solo Developer · Indonesia

Background:
• Rust & systems programming
• Cybersecurity engineering (RKS)
• Stellar / Soroban smart contract development
• Based in Batam — direct understanding of TKI remittance flows
• Intern at Infinite Learning (Nongsa Digital Park)

ASK

We're competing for the $20,000 Track 1 prize
and seeking mentorship from the Stellar ecosystem.

Post-hackathon: SCF Build Award ($150,000)
for mainnet launch and anchor integration.

github.com/0xshalah/KirimStellar
```

---

## Design Notes for Canva

| Element | Recommendation |
|---|---|
| **Color palette** | Dark navy (#0B0F19) bg, Stellar green (#08B5E5) accents, white text |
| **Font** | Inter for headings, Inter/System for body |
| **Slide 6 (screenshots)** | Use actual screenshots from your frontend `npm run dev` — capture send screen + success screen |
| **Slide 7 (code)** | Screenshot actual code from `src/lib.rs` in VS Code with Stellar theme |
| **Slide 4 (architecture)** | Use the architecture diagram from README.md |
| **Charts** | Canva's built-in chart widget for comparison table in Slide 9 |

---

## ⚠️ Pre-Submit Verification

Before exporting PDF and submitting, verify:

- [ ] Contract ID matches repo: `CDP6BDSF3JXIDED6TACKTXTJV4H47B3HHN3FUM7SHINUALTLEUHC24TJ`
- [ ] Line count: 203 (lib.rs) + 137 (test.rs) — matches "203 lines contract, 9 tests"
- [ ] Wasm size: 5,758 bytes
- [ ] "Auto-swap" framed as "on-claim, converts via Stellar DEX" — not "already live"
- [ ] "9 passing tests" matches `cargo test` output
- [ ] GitHub link works: github.com/0xshalah/KirimStellar
- [ ] No over-claims about mainnet deployment
- [ ] Demo screenshots are from your actual frontend, not mockups
