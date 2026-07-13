# KirimStellar — Panduan Rekam Demo Video (Step-by-Step)

> **Target:** 2:30 - 2:50 | **Tools:** OBS Studio (free) | **Output:** MP4 1080p
> **Waktu pengerjaan:** ~2 jam total (30 menit setup + 60 menit rekam + 30 menit edit)

---

## ⚡ PRE-FLIGHT CHECKLIST (Kerjakan sebelum rekam)

### 1. Tutup semua aplikasi yang tidak perlu
```
- Close Slack, Discord, WhatsApp desktop, email client
- Close tab browser yang tidak dipakai
- Matikan notifikasi (Windows: Focus Assist → Alarms only)
```

### 2. Buka jendela yang dibutuhkan

#### Jendela 1 — VS Code (untuk Shot 8)
```
Buka: contracts\kirimstellar\src\lib.rs
Theme: Dark+ (default)
Zoom: perbesar font biar terbaca di video (Ctrl + =)
Pastikan kursor di baris pertama file
```

#### Jendela 2 — Chrome Window #1 (untuk Shot 4-5: sender)
```
Buka tab 1: http://localhost:5173  (frontend KirimStellar)
  → jalankan dulu: cd frontend && npm run dev
  → pastikan halaman Send terload dengan benar

Buka tab 2: https://stellar.expert/explorer/testnet/contract/CDP6BDSF3JXIDED6TACKTXTJV4H47B3HHN3FUM7SHINUALTLEUHC24TJ
  → ini untuk Shot 9 (contract page)
```

#### Jendela 3 — Chrome Window #2 (untuk Shot 6-7: explorer TX)
```
Buka tab 1: https://stellar.expert/explorer/testnet/tx/9a5dbf21995ccab489d1a379ac031d778e06a7c79d58c4f8c9cefb249ddf60f8
  → create_intent TX

Buka tab 2: https://stellar.expert/explorer/testnet/tx/a7f9410201af7de60be512fb533e0b205f82b24e2fab262ddb50bd16ce2ca47d
  → execute_intent TX
```

#### Jendela 4 — File Explorer (Shot 3: landing page)
```
Buka folder: prototypes\kirimstellar-landing.html
  → jangan dibuka dulu, cukup siapkan foldernya
```

### 3. Install & Setup OBS Studio
```
1. Download dari https://obsproject.com (kalau belum)
2. Buka OBS
3. Settings → Output:
   - Output Mode: Simple
   - Recording Quality: High Quality, Medium File Size
   - Recording Format: mp4
   - Recording Path: Desktop (biar gampang dicari)
4. Settings → Video:
   - Base (Canvas) Resolution: 1920x1080
   - Output (Scaled) Resolution: 1920x1080
   - Common FPS Values: 30
5. Settings → Hotkeys:
   - Start Recording: F9
   - Stop Recording: F10
```

### 4. Siapkan script narasi
```
Buka file ini (DEMO-VIDEO-GUIDE.md) di monitor kedua atau di HP-mu.
Scroll ke bawah ke bagian "SCRIPT NARASI" pas rekam.
```

### 5. Tes audio
```
Di OBS: klik tombol "Start Recording" (atau F9), bicara 3 detik, "Stop Recording" (F10).
Putar hasilnya, cek suara jelas, tidak ada noise.
```

---

## 🎬 MULAI REKAM

### Strategi Rekaman

**JANGAN coba rekam dalam satu take.** Rekam per scene, nanti digabung. Lebih gampang dan hasilnya lebih bersih.

```
Take 1: Shot 1-2 (intro + problem)  → 30 detik
Take 2: Shot 3 (solution/landing)    → 20 detik
Take 3: Shot 4-5 (sender flow)       → 45 detik
Take 4: Shot 6-7 (explorer + claim)  → 50 detik
Take 5: Shot 8-9 (code + contract)   → 35 detik
Take 6: Shot 10 (outro)              → 15 detik
```

---

## 🎥 TAKE 1 — Intro + Problem (Shot 1-2)

### Yang harus sudah terbuka:
- Tidak ada. Layar bersih.

### Action:
```
1. Tekan F9 (start recording)
2. Tunggu 1 detik
3. Buka PowerPoint / Canva / editor teks kosong
4. Ketik besar-besar: "KirimStellar"
5. Di bawahnya: "Instant Cross-Border Remittance on Stellar"
6. Di bawahnya: "Track 1 — Payment & Consumer Applications"
7. Baca narasi Shot 1 (lihat SCRIPT NARASI di bawah)
8. Tunggu 2 detik
9. Buka browser, pergi ke Google Maps
10. Search "Southeast Asia"
11. Zoom ke region Indonesia-Malaysia-Singapura-Hong Kong
12. Baca narasi Shot 2
13. Tekan F10 (stop recording)
```

### Narasi (baca pelan, jeda di setiap kalimat):

**Shot 1:**
> "KirimStellar. Instant cross-border remittance for Indonesian migrant workers, built on Stellar."

**Shot 2:**
> "Every year, 4.7 million Indonesian migrant workers send 9.7 billion dollars home. They pay 5 to 7 percent in fees. They wait 2 to 3 days. That's half a billion dollars every year — lost to middlemen. Money that should reach families."

---

## 🎥 TAKE 2 — Solution / Landing Page (Shot 3)

### Yang harus sudah terbuka:
- File Explorer di folder `prototypes/`

### Action:
```
1. Tekan F9
2. Double-click kirimstellar-landing.html — buka di Chrome
3. Tunggu halaman load
4. Scroll perlahan dari atas ke bawah
5. Baca narasi Shot 3
6. Tekan F10
```

### Narasi:
> "KirimStellar replaces slow, expensive remittance rails with Stellar. Send money in seconds. Pay less than 0.1 percent. Every transaction is transparent and verifiable on-chain. This is the landing page a user sees when they open the app."

---

## 🎥 TAKE 3 — Sender Flow (Shot 4-5)

### Yang harus sudah terbuka:
- Chrome Window #1, tab 1: `http://localhost:5173`
- Freighter extension installed dan unlocked
- Freighter sudah di network Testnet

### Sebelum rekam, cek:
```
1. Buka http://localhost:5173 di browser
2. Pastikan halaman Send terlihat
3. Pastikan Freighter extension icon ada di toolbar (ujung kanan atas)
4. Kalau ada popup wallet, close dulu
```

### Action:
```
1. Tekan F9
2. Klik tombol "Connect Wallet" di halaman
3. Freighter popup muncul → klik "Connect"
4. Tunggu 1 detik, tunjukkin balance di UI
5. Baca narasi Shot 4
6. Klik ke field "Amount" → ketik "50"
7. Klik ke field "Recipient" → paste alamat budi:
   GDNOZQXCK5X7AXAUPCPIAVDH37HHXZPHPIBSPGBMUHAAHZZCIOOOXEJ5
8. Baca narasi Shot 5
9. Klik tombol "Kirim" / "Send"
10. Tunggu 3 detik — tunjukkin layar konfirmasi / loading
11. Tekan F10
```

### Narasi:
> "Here's how it works. A TKI worker in Hong Kong opens KirimStellar. They connect their Freighter wallet. One tap. Their USDC balance is right there. They enter the amount — let's say 50 USDC. Paste the recipient's wallet address back home in Indonesia. Hit send. The app shows a confirmation — the funds are on their way."

---

## 🎥 TAKE 4 — Explorer TX + Claim (Shot 6-7)

### Yang harus sudah terbuka:
- Chrome Window #2, tab 1: create_intent TX explorer
- Chrome Window #2, tab 2: execute_intent TX explorer
- Chrome Window #1, tab 2: contract page

### Cara split-screen di Windows:
```
Tekan Windows + Panah Kiri  → jendela kiri
Tekan Windows + Panah Kanan → jendela kanan
```

### Action:
```
1. Atur split screen:
   - Kiri: prototypes/kirimstellar-app.html (success state)
   - Kanan: stellar.expert TX page (create_intent)
2. Tekan F9
3. Di kanan: scroll ke bagian "Events" di explorer
4. Tunjukkin event "create" dengan cursor
5. Baca narasi Shot 6
6. Pindah ke tab 2 (execute_intent) di jendela kanan
7. Di kiri: buka halaman Claim / tunjukkin notifikasi
8. Baca narasi Shot 7
9. Di kanan: scroll ke event "execute" di explorer
10. Tunjukkin dengan cursor
11. Tekan F10
```

### Narasi:

**Shot 6:**
> "The USDC locks into a Soroban escrow contract on Stellar. Here it is — live on stellar.expert. This is the create_intent transaction. The contract locked the funds. The sender's address, the recipient's address, the amount — all on-chain, all verifiable. This confirmed in about 5 seconds."

**Shot 7:**
> "Now in Indonesia, the recipient opens their wallet. One tap to claim. The USDC auto-converts to IDRT — an Indonesian Rupiah stablecoin — directly on Stellar's built-in DEX. No manual swap. No external bridge. The execute_intent transaction is right here on the explorer. Funds transferred. Done. Total time: under 10 seconds. Total cost: a fraction of a cent."

---

## 🎥 TAKE 5 — Code + Contract Explorer (Shot 8-9)

### Yang harus sudah terbuka:
- VS Code dengan `src/lib.rs` terbuka
- Chrome tab: contract explorer page

### Action:
```
1. Tekan F9
2. VS Code: scroll perlahan dari atas fungsi create_intent
3. Tahan di baris `sender.require_auth()` — tunjukkin dengan cursor
4. Scroll ke fungsi execute_intent
5. Tahan di baris `recipient.require_auth()` — tunjukkin dengan cursor
6. Baca narasi Shot 8 (bagian pertama)
7. Scroll ke bagian bawah — tunjukkin `mod test;` 
8. Baca narasi Shot 8 (bagian test)
9. Alt-Tab ke Chrome — contract explorer page
10. Tunjukkin contract ID dengan cursor
11. Baca narasi Shot 9
12. Tekan F10
```

### Narasi:

**Shot 8:**
> "Under the hood: a Soroban smart contract written in Rust. Two hundred and three lines. Four exported functions. Here's create_intent — the sender authenticates. Here's execute_intent — only the recipient can claim. No admin key. No middleman. Non-custodial by design. And 9 unit tests — all passing. Every edge case covered: double claims rejected, expired transfers refunded. Five thousand seven hundred fifty-eight bytes of auditable logic deployed on Stellar testnet."

**Shot 9:**
> "Contract ID is public. Anyone can verify. Everything lives on-chain — permanently, transparently."

---

## 🎥 TAKE 6 — Outro (Shot 10)

### Action:
```
1. Buka halaman kosong / kembali ke title slide
2. Tulis besar-besar: "KirimStellar"
3. Di bawahnya: github.com/0xshalah/KirimStellar
4. Di bawahnya: APAC Stellar Hackathon 2026 · Track 1
5. Tekan F9
6. Baca narasi Shot 10
7. Tahan 2 detik setelah selesai bicara
8. Tekan F10
```

### Narasi:
> "Half a billion dollars a year. That's what Indonesian families lose to remittance middlemen. Money that should be buying school supplies, paying medical bills, putting food on the table. KirimStellar changes that. Send money home. Instantly. On Stellar."

---

## ✂️ POST-PRODUCTION (Pakai CapCut atau DaVinci Resolve — gratis)

### Step 1: Gabung semua take
```
1. Buka CapCut / DaVinci Resolve
2. Import 6 file take rekaman
3. Drag ke timeline sesuai urutan: Take 1 → 2 → 3 → 4 → 5 → 6
4. Potong bagian awal/akhir yang ada jeda kosong
```

### Step 2: Bersihkan audio
```
Di CapCut:
1. Klik clip audio → "Enhance voice" → ON
2. "Reduce noise" → ON, level 50%
3. Volume: pastikan di -6dB sampai -3dB (jangan clipping merah)
```

### Step 3: Tambah background music
```
1. Cari di YouTube Audio Library (free, no copyright):
   - Search: "ambient corporate" atau "technology background"
   - Contoh: "Distance" by Anno Domini Beats, "Lucid Dreamer" by Spazz Cardigan
2. Download
3. Import ke timeline
4. Volume music: -25dB (jangan sampai nutupin suara narasi)
5. Fade in di awal, fade out di akhir
```

### Step 4: Transisi antar scene
```
Di antara setiap take, tambahin cross-dissolve 0.3 detik.
Jangan pakai transisi fancy — simpel aja.
```

### Step 5: Review & Export
```
1. Tonton full dari awal ke akhir
2. Cek: suara jelas? timing pas? gak ada yang kepotong?
3. Kalau ada scene yang jelek, rekam ulang satu scene itu aja (jangan semua)
4. Export:
   - Format: MP4 (H.264)
   - Resolution: 1920x1080
   - Frame rate: 30 fps
   - Bitrate: 8-12 Mbps
```

---

## ☁️ UPLOAD & SUBMIT

### Upload ke YouTube (Unlisted)
```
1. Buka youtube.com → klik Create (ikon kamera) → Upload Video
2. Pilih file MP4
3. Title: "KirimStellar — APAC Stellar Hackathon 2026 Demo"
4. Description:
   KirimStellar — Instant cross-border remittance for Indonesian migrant workers.
   Track 1: Payment & Consumer Applications
   GitHub: https://github.com/0xshalah/KirimStellar
   Contract: CDP6BDSF3JXIDED6TACKTXTJV4H47B3HHN3FUM7SHINUALTLEUHC24TJ
5. Visibility: UNLISTED (jangan Public, jangan Private)
6. Thumbnail: pilih frame yang ada logo + stats
7. Klik Save
8. Copy URL-nya
```

### Update README.md
```
Buka kirimstellar/README.md
Cari bagian "🎬 Demo"
Ganti dua placeholder:
  🎥 Demo Video → paste YouTube URL
  📊 Pitch Deck → paste link ke file HTML-nya (atau upload ke drive)
```

### Submit di Rise In
```
1. Buka https://www.risein.com/programs/apac-stellar-hackathon
2. Cari submission form
3. Paste link GitHub repo + link YouTube video
4. Paste Project Description (copy dari DELIVERABLES.md Section 1)
5. Submit! 🚀
```

---

## 📋 SCRIPT NARASI LENGKAP (Baca ini pas rekam)

> *Cetak halaman ini atau buka di HP pas rekam.*

---

**[TAKE 1 — Shot 1: Intro]**

KirimStellar. Instant cross-border remittance for Indonesian migrant workers, built on Stellar.

**[TAKE 1 — Shot 2: Problem]**

Every year, 4.7 million Indonesian migrant workers send 9.7 billion dollars home. They pay 5 to 7 percent in fees. They wait 2 to 3 days. That's half a billion dollars every year — lost to middlemen. Money that should reach families.

**[TAKE 2 — Shot 3: Solution]**

KirimStellar replaces slow, expensive remittance rails with Stellar. Send money in seconds. Pay less than 0.1 percent. Every transaction is transparent and verifiable on-chain.

**[TAKE 3 — Shot 4: Connect Wallet]**

Here's how it works. A TKI worker in Hong Kong opens KirimStellar. They connect their Freighter wallet. One tap. Their USDC balance is right there.

**[TAKE 3 — Shot 5: Send]**

They enter the amount — let's say 50 USDC. Paste the recipient's wallet address back home in Indonesia. Hit send. The app shows a confirmation — the funds are on their way.

**[TAKE 4 — Shot 6: Explorer]**

The USDC locks into a Soroban escrow contract on Stellar. Here it is — live on stellar.expert. This is the create_intent transaction. The contract locked the funds. The sender's address, the recipient's address, the amount — all on-chain, all verifiable. This confirmed in about 5 seconds.

**[TAKE 4 — Shot 7: Claim]**

Now in Indonesia, the recipient opens their wallet. One tap to claim. The USDC auto-converts to IDRT — an Indonesian Rupiah stablecoin — directly on Stellar's built-in DEX. No manual swap. No external bridge. The execute_intent transaction is right here on the explorer. Funds transferred. Done.

Total time: under 10 seconds. Total cost: a fraction of a cent.

**[TAKE 5 — Shot 8: Code]**

Under the hood: a Soroban smart contract written in Rust. Two hundred and three lines. Four exported functions. Here's create_intent — the sender authenticates. Here's execute_intent — only the recipient can claim. No admin key. No middleman. Non-custodial by design. And 9 unit tests — all passing. Every edge case covered: double claims rejected, expired transfers refunded. Five thousand seven hundred fifty-eight bytes of auditable logic deployed on Stellar testnet.

**[TAKE 5 — Shot 9: Contract]**

Contract ID is public. Anyone can verify. Everything lives on-chain — permanently, transparently.

**[TAKE 6 — Shot 10: Outro]**

Half a billion dollars a year. That's what Indonesian families lose to remittance middlemen. Money that should be buying school supplies, paying medical bills, putting food on the table. KirimStellar changes that. Send money home. Instantly. On Stellar.

---

## ✅ FINAL CHECKLIST

- [ ] Semua 6 take sudah direkam
- [ ] Audio narasi jelas, tidak ada noise
- [ ] Music background ditambahkan (volume rendah)
- [ ] Transisi cross-dissolve antar take
- [ ] Durasi total 2:30 - 2:50
- [ ] Export MP4 1080p
- [ ] Upload YouTube Unlisted
- [ ] Update README.md dengan link video
- [ ] Commit & push update README
- [ ] Submit di Rise In

**Estimasi total waktu: 2 jam. Mulai sekarang, submit hari ini juga.**
