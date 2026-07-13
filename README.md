# KirimStellar

> Remittance dApp for Indonesian Migrant Workers — instant, near-zero fee cross-border payments powered by Stellar.
>
> **Track:** 1 — Payment & Consumer Applications | **APAC Stellar Hackathon 2026**
> **Status:** ✅ Deployed on testnet, end-to-end flow verified

## Problem

Indonesian migrant workers (TKI) send ~$9.7 billion home annually. They pay 5-7% in transfer fees and wait 2-3 days. That's ~$500-600 million per year lost to intermediaries.

## Solution

KirimStellar enables TKI to send money home in seconds with near-zero fees. Sender sends USDC via Stellar into a Soroban escrow contract; receiver claims and auto-converts to IDRT (Indonesian Rupiah stablecoin) via Stellar's built-in DEX.

**One-liner:** Western Union speed of 2-3 days and 5-7% fees → seconds and <0.1% on Stellar.

---

## Tech Stack

| Layer | Technology | Version |
|---|---|---|
| Smart Contract | Soroban (Rust) | SDK v26 |
| Blockchain | Stellar | Testnet |
| Frontend | React + Vite | 18.3 / 8.1 |
| Stellar SDK | @stellar/stellar-sdk | 16.0 |
| Wallet API | @stellar/freighter-api | 6.0 |
| Icons | lucide-react | 1.24 |
| Stablecoin (send) | USDC on Stellar | — |
| IDR Token (receive) | IDRT (KB Trading) | — |
| Explorer | stellar.expert | — |

---

## Architecture

```
SENDER (TKI abroad)        STELLAR BLOCKCHAIN            RECEIVER (family in ID)
  Freighter (USDC)  ──▶   Soroban Escrow Contract  ──▶   LOBSTR/Freighter (IDRT)
                          - lock USDC
                          - set recipient + timelock (7d)
                          Horizon API (status tracking)
                          Stellar DEX (USDC → IDRT auto-swap)
```

### Smart Contract — KirimStellarContract

Non-custodial escrow with three core functions:

| Function | Called by | Description |
|---|---|---|
| `create_intent(sender, recipient, asset, amount, expiration)` | Sender | Lock tokens into escrow. Returns intent ID |
| `execute_intent(intent_id)` | Recipient | Claim tokens before expiry |
| `refund_intent(intent_id)` | Sender | Reclaim tokens after expiry |
| `get_intent(intent_id)` | Anyone | Query intent state (read-only) |

**Security:** Only the sender can refund. Only the recipient can claim. No admin key. No one else can touch locked funds.

### ⚠️ Important: SAC Token Requirement

The contract interacts with **Stellar Asset Contract (SAC)** tokens via `token::Client`. It **does not** support native XLM. This is by design — the production flow uses USDC and IDRT, both SAC tokens on Stellar.

| Asset | Type | Issuer Key |
|---|---|---|
| USDC | SAC token | `GA5ZSEJYB37JRC5AVCIA5MOP4RHTM335X2KGX3IHOJAPP5RE34K4KZVN` |
| IDRT | SAC token | `GDPKQ2TSNJOFSEE7XSUXPWRP27H6GFGLWD7JCHNEYYWQVGFA543EVBVT` |

Recipients **must have a trustline** to the receiving asset before claiming. See [Adding a Trustline](#adding-a-trustline) below.

---

## Deployed Contracts (Testnet)

| Contract | ID | Explorer |
|---|---|---|
| **KirimStellar** (escrow) | `CDP6BDSF3JXIDED6TACKTXTJV4H47B3HHN3FUM7SHINUALTLEUHC24TJ` | [View](https://stellar.expert/explorer/testnet/contract/CDP6BDSF3JXIDED6TACKTXTJV4H47B3HHN3FUM7SHINUALTLEUHC24TJ) |
| **TEST token** (dev) | `CDZD34RFFNGXG3CYMWTR5KFOC2OPQYR5Y6JJKHSPKJX3NOB5L54ODAPQ` | [View](https://stellar.expert/explorer/testnet/contract/CDZD34RFFNGXG3CYMWTR5KFOC2OPQYR5Y6JJKHSPKJX3NOB5L54ODAPQ) |

**Wasm Hash:** `985eef50c36acfb2c6c9ae5b97af875749bba0d54d20fae104cc083d703f2443`
**Exported Functions:** `create_intent`, `execute_intent`, `get_intent`, `refund_intent`
**Optimized Size:** 5,758 bytes

---

## End-to-End Verification (Testnet)

### Identities

| Alias | Address |
|---|---|
| alice (sender) | `GCMMUF2BORBERTSQFN4XE5UMILIGXEYSHT5C3BTHUZQCNCLCN5JC37PH` |
| budi (recipient) | `GDNOZQXCK5X7AXAUPCPIAVDH37HHXZPHPIBSPGBMUHAAHZZCIOOOXEJ5` |

### Test Flow

| Step | Command | TX Hash | Result |
|---|---|---|---|
| 1. Create intent | `create_intent(alice, budi, TEST, 50, +24h)` | [9a5dbf...](https://stellar.expert/explorer/testnet/tx/9a5dbf21995ccab489d1a379ac031d778e06a7c79d58c4f8c9cefb249ddf60f8) | ✅ intent_id=1 |
| 2. Execute intent | `execute_intent(1)` by budi | [a7f941...](https://stellar.expert/explorer/testnet/tx/a7f9410201af7de60be512fb533e0b205f82b24e2fab262ddb50bd16ce2ca47d) | ✅ tokens transferred |
| 3. Verify status | `get_intent(1)` | — | ✅ status=1 (Executed) |
| 4. Verify balance | budi TEST balance | — | ✅ 5000000000 |

### Tests (Rust)

```bash
cd contracts/kirimstellar
cargo test
```

9 unit tests covering: create, claim, refund, double-claim rejected, expired claim rejected, premature refund rejected, zero-amount rejected, past-expiration rejected, missing-intent error. **All passing.**

---

## Setup

### Prerequisites

```bash
rustup target add wasm32-unknown-unknown
cargo install --locked stellar-cli
```

### Clone & Build

```bash
git clone https://github.com/0xshalah/KirimStellar
cd KirimStellar

# Build contract
cd contracts/kirimstellar
stellar contract build

# Run tests
cargo test
```

### Deploy to Testnet

```bash
# 1. Create identity & fund
stellar keys generate alice --network testnet --fund

# 2. Deploy escrow contract
stellar contract deploy \
  --wasm target/wasm32v1-none/release/kirimstellar_contract.wasm \
  --source alice \
  --network testnet \
  --alias kirimstellar

# 3. Deploy a test SAC token (for development)
stellar contract asset deploy \
  --source alice \
  --network testnet \
  --asset "TEST:alice"

# 4. Create test identities
stellar keys generate budi --network testnet --fund
```

### Full Test Flow (CLI)

```bash
ESCROW="CDP6BDSF3JXIDED6TACKTXTJV4H47B3HHN3FUM7SHINUALTLEUHC24TJ"
TOKEN="<your-test-token-id>"
SENDER=$(stellar keys address alice)
RECIPIENT=$(stellar keys address budi)
EXPIRY=$(( $(date +%s) + 86400 ))

# 1. Add trustline for recipient (required!)
stellar tx new change-trust \
  --source-account budi \
  --network testnet \
  --line "TEST:${SENDER}" \
  --build-only > trustline.xdr

cat trustline.xdr | stellar tx sign --sign-with-key budi --network testnet --auto-sign | \
  stellar tx send --network testnet

# 2. Lock tokens in escrow
stellar contract invoke \
  --id $ESCROW \
  --source alice \
  --network testnet \
  --send=yes \
  -- create_intent \
    --sender $SENDER \
    --recipient $RECIPIENT \
    --asset $TOKEN \
    --amount 5000000000 \
    --expiration $EXPIRY

# 3. Claim (intent_id = 1 from output above)
stellar contract invoke \
  --id $ESCROW \
  --source budi \
  --network testnet \
  --send=yes \
  -- execute_intent --intent_id 1

# 4. Verify
stellar contract invoke --id $ESCROW --source alice --network testnet -- get_intent --intent_id 1
stellar contract invoke --id $TOKEN --source budi --network testnet -- balance --id $RECIPIENT
```

### Adding a Trustline

Recipients must have a trustline before they can receive SAC tokens. The contract will fail with `Error(Contract, #13)` — "trustline entry is missing for account" — if this step is skipped.

```bash
stellar tx new change-trust \
  --source-account RECIPIENT_ALIAS \
  --network testnet \
  --line "ASSET_CODE:ISSUER_ADDRESS" \
  --build-only > trustline.xdr

cat trustline.xdr | stellar tx sign --sign-with-key RECIPIENT_ALIAS --network testnet --auto-sign | \
  stellar tx send --network testnet
```

### Frontend

```bash
cd frontend
npm install
npm run dev    # http://localhost:5173
npm run build  # production build → dist/
```

Configure via `.env` (see `.env.example`):
```
VITE_STELLAR_NETWORK=TESTNET
VITE_HORIZON_URL=https://horizon-testnet.stellar.org
VITE_SEND_ASSET_CODE=USDC
VITE_SEND_ASSET_ISSUER=GA5ZSEJYB37JRC5AVCIA5MOP4RHTM335X2KGX3IHOJAPP5RE34K4KZVN
VITE_ESCROW_CONTRACT_ID=CDP6BDSF3JXIDED6TACKTXTJV4H47B3HHN3FUM7SHINUALTLEUHC24TJ
VITE_IDR_RATE=16000
```

---

## Project Structure

```
kirimstellar/
├── README.md                         # This file
├── PRD.md                            # Product Requirements Document
├── contracts/kirimstellar/
│   ├── Cargo.toml                    # soroban-sdk v26
│   ├── src/lib.rs                    # KirimStellarContract (203 lines)
│   ├── src/test.rs                   # 9 unit tests (137 lines)
│   ├── test_snapshots/               # Snapshot test data
│   └── target/                       # Compiled wasm (5,758 bytes)
├── frontend/
│   ├── package.json                  # React 18 + Vite 8
│   ├── src/
│   │   ├── config.js                 # Network switching, env vars
│   │   ├── lib/stellar.js            # Horizon, TransactionBuilder
│   │   ├── lib/wallet.js             # Freighter connect/sign
│   │   ├── lib/format.js             # Formatting utils
│   │   ├── components/ui.jsx         # Reusable UI
│   │   ├── screens/                  # 14 screens
│   │   └── state/store.jsx           # State management
│   └── dist/                         # Production build
├── kirimstellar-landing.html         # Prototype: landing
├── kirimstellar-login.html           # Prototype: login
├── kirimstellar-register.html        # Prototype: register
├── kirimstellar-app.html             # Prototype: app shell
└── kirimstellar-app-part2.html       # Prototype: app shell p2
```

---

## Deliverables

| # | Deliverable | Status |
|---|---|---|
| 1 | Project Description | ✅ [DELIVERABLES.md](./DELIVERABLES.md) |
| 2 | Public GitHub Repository | ✅ [github.com/0xshalah/KirimStellar](https://github.com/0xshalah/KirimStellar) |
| 3 | Project README | ✅ This file |
| 4 | Demo Video | ⬜ Script ready in DELIVERABLES.md |
| 5 | Pitch Deck | ⬜ Outline ready in DELIVERABLES.md |

---

## Judging Rubric Alignment

| Criteria | Weight | How KirimStellar hits it |
|---|---|---|
| Technical Implementation & Stellar Usage | 25% | Soroban escrow contract, Horizon API, DEX, live on testnet, 9 passing tests |
| Real-World Fit & Use Case | 25% | $9.7B TKI remittance market, clear target user (Siti persona) |
| Innovation & Differentiation | 20% | Non-custodial escrow + timelock + IDR anchor, not a wallet clone |
| Viability & Go-to-Market | 10% | IDRT live, USDC on-chain, clear corridor, path to SCF $150K grant |
| UX & Accessibility | 5% | Mobile-first, non-crypto-native onboarding, Freighter wallet |
| Team & Ability to Continue | 5% | Solo but focused; SCF Build Award pathway documented |

---

## References

- **Escrow pattern:** [EpochSend](https://github.com/StacksTrench/EpochSend-smartcontract) (MIT)
- **Timelock reference:** [soroban-examples/timelock](https://github.com/stellar/soroban-examples/tree/main/timelock) (Apache 2.0)
- **IDRT:** [kbtrading.org/idrt](https://www2.kbtrading.org/idrt) | Issuer: `GDPKQ2TSNJOFSEE7XSUXPWRP27H6GFGLWD7JCHNEYYWQVGFA543EVBVT`
- **USDC on Stellar:** Issuer: `GA5ZSEJYB37JRC5AVCIA5MOP4RHTM335X2KGX3IHOJAPP5RE34K4KZVN`
- **SCF Build Award ($150K):** [communityfund.stellar.org](https://communityfund.stellar.org)

## Team

Solo developer — [Shalahuddin Al-Ayyubi](https://github.com/0xshalah)

## License

MIT
