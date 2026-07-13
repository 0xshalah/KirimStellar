# KirimStellar — Frontend (Vite + React)

Mobile-first remittance dApp yang **benar-benar terhubung ke Stellar Testnet**: connect Freighter, baca saldo & riwayat dari Horizon, lalu kirim pembayaran on-chain sungguhan (build → sign via Freighter → submit), dengan tautan verifikasi ke stellar.expert.

## Menjalankan

```bash
cd frontend
npm install
cp .env.example .env   # opsional; default sudah untuk testnet
npm run dev            # http://localhost:5173
```

Butuh ekstensi **Freighter** terpasang di browser, dan network Freighter disetel ke **Testnet**.

## Alur

1. **Sambungkan Freighter** — non-custodial, kunci tetap di wallet.
2. **Isi saldo** — di Testnet memakai Friendbot (10.000 XLM gratis).
3. **Kirim** — pilih penerima + jumlah → review → tanda tangan di Freighter → submit.
4. **Lacak** — status ledger real-time + hash yang bisa dibuka di stellar.expert.

## Konfigurasi (.env)

| Var | Default | Fungsi |
|---|---|---|
| `VITE_HORIZON_URL` | `https://horizon-testnet.stellar.org` | Endpoint Horizon |
| `VITE_STELLAR_NETWORK` | `TESTNET` | `TESTNET` atau `PUBLIC` |
| `VITE_SEND_ASSET_CODE` | `XLM` | Kode aset yang dikirim |
| `VITE_SEND_ASSET_ISSUER` | _(kosong)_ | Issuer aset; kosong = native XLM |
| `VITE_IDR_RATE` | `2500` | Estimasi kurs 1 aset → IDR (display) |
| `VITE_ESCROW_CONTRACT_ID` | _(kosong)_ | Contract Soroban (untuk wiring escrow nanti) |

## Yang sudah nyata vs roadmap

**Nyata (on-chain testnet):** connect wallet, saldo & riwayat via Horizon, build/sign/submit pembayaran, Friendbot funding, tautan explorer.

**Roadmap:** escrow + timelock Soroban (`create_intent`/`execute_intent`/`refund_intent`), auto-swap USDC→IDRT via Stellar DEX, off-ramp anchor IDR. Kirim saat ini adalah pembayaran langsung; arsitektur `lib/stellar.js` disiapkan agar mudah diganti ke panggilan kontrak.

## Struktur

```
src/
  config.js          # network, aset, endpoint, explorer
  lib/
    stellar.js       # Horizon, build/submit tx, saldo, riwayat
    wallet.js        # wrapper @stellar/freighter-api v6
    format.js        # IDR, alamat pendek, waktu
  state/store.jsx    # AppProvider: wallet, data, navigasi, penerima
  components/ui.jsx  # AppBar, BottomNav, Brand
  screens/           # ConnectWallet, Home, Send, Review, Sending,
                     # Success, Track, History, Recipients, Account, Topup
  App.jsx            # router sederhana berbasis state
```

## Stack

React 18 · Vite · `@stellar/stellar-sdk` · `@stellar/freighter-api` · `lucide-react`.
