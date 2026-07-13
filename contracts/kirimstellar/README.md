# KirimStellar — Escrow Contract (Soroban)

Remittance escrow: **lock → claim → refund**. A sender locks a token for a
recipient with a timelock; the recipient claims before expiry, or the sender
refunds after expiry. Non-custodial — no admin can move locked funds.

## Functions

| Fn | Auth | Effect |
|---|---|---|
| `create_intent(sender, recipient, asset, amount, expiration)` | `sender` | Transfers `amount` of `asset` into escrow, returns `intent_id` (u64) |
| `execute_intent(intent_id)` | `recipient` | Before expiry: releases funds to recipient |
| `refund_intent(intent_id)` | `sender` | After expiry: returns funds to sender |
| `get_intent(intent_id)` | — | Reads the intent record |

`expiration` is a unix timestamp (seconds). Errors are typed (`Error` enum):
`IntentNotFound`, `IntentNotPending`, `IntentExpired`, `IntentNotExpired`,
`InvalidAmount`, `InvalidExpiration`.

## Prerequisites

```bash
rustup target add wasm32v1-none      # required by Soroban (Rust 1.84+)
cargo install --locked stellar-cli   # v27.x
```

## Build & test

```bash
cargo test --locked        # 9 tests: lock, claim, refund, expiry, guards
stellar contract build     # -> target/wasm32v1-none/release/kirimstellar_contract.wasm
```

## Deploy to testnet

```bash
# one-time: create + fund an identity
stellar keys generate alice --network testnet --fund

stellar contract deploy \
  --wasm target/wasm32v1-none/release/kirimstellar_contract.wasm \
  --source alice \
  --network testnet
# -> prints the contract id (C...). Put it in frontend/.env as VITE_ESCROW_CONTRACT_ID
```

## Example invoke

```bash
stellar contract invoke --id <CONTRACT_ID> --source alice --network testnet -- \
  create_intent \
  --sender <G_SENDER> --recipient <G_RECIPIENT> \
  --asset <TOKEN_CONTRACT_ID> --amount 2000000000 --expiration 1893456000
```

## Notes

- `soroban-sdk = "26"` (matches the official `stellar contract init` template for
  stellar-cli 27). `Cargo.lock` pins `ed25519-dalek = 2.2.0`; version 3.0.0 breaks
  soroban-env-host's test PRNG, so keep the lock and build with `--locked`.
- Adapted from the EpochSend escrow pattern (MIT), simplified for remittance:
  the recipient claims directly (no oracle), timelock via ledger timestamp.
