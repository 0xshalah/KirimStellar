# KirimStellar — Demo Video Shot List

> **Target:** 2-3 minutes | **Format:** Screen recording + voiceover
> **Required gear:** Two browser windows (sender + recipient) OR two devices
> **Recording tool:** OBS Studio (free) or Screen Studio (Mac)

---

## Shot 1 — Intro / Logo (0:00 - 0:10)

| Element | Detail |
|---|---|
| Visual | KirimStellar logo / title card |
| Narration | "KirimStellar. Instant cross-border remittance for Indonesian migrant workers, built on Stellar." |
| On-screen text | Track 1 — Payment & Consumer Applications · APAC Stellar Hackathon 2026 |

**How to shoot:** Title card in Canva or just open README.md and scroll to the logo section.

---

## Shot 2 — The Problem (0:10 - 0:25)

| Element | Detail |
|---|---|
| Visual | Map of SEA with arrows from HK/SG/MY → Indonesia, key stats overlay |
| Narration | "Every year, 4.7 million Indonesian migrant workers send $9.7 billion home. They pay 5 to 7 percent in fees and wait 2 to 3 days. That's half a billion dollars lost to middlemen." |
| On-screen text | $9.7B / 5-7% / 2-3 days / 4.7M workers |

**How to shoot:** Open stellar.expert or Google Maps SEA region, add text overlay with OBS.

---

## Shot 3 — The Solution (0:25 - 0:40)

| Element | Detail |
|---|---|
| Visual | `kirimstellar-landing.html` prototype open in browser |
| Narration | "KirimStellar replaces slow, expensive remittance rails with Stellar. Send money in seconds. Pay less than 0.1 percent. Every transaction is transparent and verifiable on-chain." |
| On-screen text | <0.1% fee · ~5 seconds · 100% on-chain |

**How to shoot:** Open `kirimstellar-landing.html` in Chrome, full-screen F11.

---

## Shot 4 — Sender: Connect Wallet (0:40 - 0:55)

| Element | Detail |
|---|---|
| Visual | Sender screen — open `npm run dev` frontend (localhost:5173), click "Connect Wallet" |
| Narration | "A TKI worker in Hong Kong opens KirimStellar on their phone. They connect their Freighter wallet with one tap." |
| On-screen | Show Freighter popup, wallet balance visible (USDC) |

**How to shoot:** Have Freighter extension installed and configured to Testnet. Show the connect flow.

---

## Shot 5 — Sender: Fill Send Form (0:55 - 1:10)

| Element | Detail |
|---|---|
| Visual | Send screen — fill in amount: 50 USDC, paste recipient address, tap "Kirim" |
| Narration | "They enter the amount — 50 USDC. Paste the recipient's wallet address. And hit send." |

**How to shoot:** Use actual testnet USDC if available, or show the send screen from the React app. Paste budi's address: `GDNOZQXCK5X7AXAUPCPIAVDH37HHXZPHPIBSPGBMUHAAHZZCIOOOXEJ5`

---

## Shot 6 — Confirmation + Explorer (1:10 - 1:35)

| Element | Detail |
|---|---|
| Visual | Split screen — left: app shows "Confirmed", right: stellar.expert showing TX |
| Narration | "The USDC locks into a Soroban escrow contract on Stellar. This transaction confirms in about 5 seconds. Here it is live on stellar.expert — fully verifiable." |
| On-screen | Point cursor to the TX hash and the create_intent event on explorer |

**How to shoot:** This is the most important shot. Open the actual testnet TX for the verified flow:
- Left half: `kirimstellar-app.html` showing success state
- Right half: `https://stellar.expert/explorer/testnet/tx/9a5dbf21995ccab489d1a379ac031d778e06a7c79d58c4f8c9cefb249ddf60f8`

---

## Shot 7 — Recipient: Claim (1:35 - 2:00)

| Element | Detail |
|---|---|
| Visual | Recipient screen — wallet notification, tap "Claim", success animation |
| Narration | "Back home in Indonesia, the recipient gets a notification. One tap to claim. The USDC auto-converts to IDRT — Indonesian Rupiah stablecoin — through Stellar's built-in DEX. No manual swap, no external bridge." |
| On-screen | Show the execute_intent TX on explorer after claim |

**How to shoot:**
- Left half: Show recipient claiming (use the React app Claim screen or show budi claiming from LOBSTR)
- Right half: `https://stellar.expert/explorer/testnet/tx/a7f9410201af7de60be512fb533e0b205f82b24e2fab262ddb50bd16ce2ca47d`

---

## Shot 8 — Code / Security (2:00 - 2:20)

| Element | Detail |
|---|---|
| Visual | VS Code — open `src/lib.rs`, scroll through create_intent + execute_intent functions |
| Narration | "Under the hood: a Soroban smart contract written in Rust. Non-custodial. Only the sender can refund. Only the recipient can claim. No admin key. 9 tests, all passing. 5,758 bytes of auditable, trustless logic deployed on Stellar testnet." |
| On-screen | Highlight: `sender.require_auth()` line, `recipient.require_auth()` line, test count |

**How to shoot:** Open contracts/kirimstellar/src/lib.rs in VS Code, dark theme, scroll slowly through the create_intent and execute_intent functions.

---

## Shot 9 — Contract on Explorer (2:20 - 2:35)

| Element | Detail |
|---|---|
| Visual | stellar.expert showing the deployed contract page |
| Narration | "Contract ID is public. Anyone can verify. Everything is on-chain." |
| On-screen | Point to contract ID: `CDP6BDSF3JXIDED6TACKTXTJV4H47B3HHN3FUM7SHINUALTLEUHC24TJ` |

**How to shoot:** Open `https://stellar.expert/explorer/testnet/contract/CDP6BDSF3JXIDED6TACKTXTJV4H47B3HHN3FUM7SHINUALTLEUHC24TJ`

---

## Shot 10 — Outro / Call to Action (2:35 - 2:50)

| Element | Detail |
|---|---|
| Visual | KirimStellar logo + GitHub URL + contract ID |
| Narration | "Half a billion dollars a year belong in the pockets of Indonesian families, not remittance companies. KirimStellar. Send money home. Instantly. On Stellar." |
| On-screen text | github.com/0xshalah/KirimStellar · Track 1 · APAC Stellar Hackathon 2026 |

---

## Recording Cheat Sheet

| What | URL / File |
|---|---|
| Sender app | `npm run dev` → http://localhost:5173 |
| Landing page | Open `kirimstellar-landing.html` |
| App prototype | Open `kirimstellar-app.html` |
| Create intent TX | https://stellar.expert/explorer/testnet/tx/9a5dbf... |
| Execute intent TX | https://stellar.expert/explorer/testnet/tx/a7f941... |
| Contract page | https://stellar.expert/explorer/testnet/contract/CDP6BDSF3...24TJ |
| VS Code (contract) | contracts/kirimstellar/src/lib.rs |

---

## Post-Recording

1. **Trim** to 2:30-2:50 (jangan lebih dari 3 menit)
2. **Add voiceover** — rekam narasi, sync ke visual
3. **Add background music** — subtle, instrumental, no lyrics
4. **Export** as MP4 (1080p)
5. **Upload** to YouTube (unlisted) or Google Drive (public link)
6. **Paste link** into README.md Demo section + submission form
