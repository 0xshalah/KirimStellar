# Deploy KirimStellar Frontend ke EdgeOne Pages

## Penyebab 404

EdgeOne Pages gak tahu kalau KirimStellar adalah **Single Page Application (SPA)**.  
Semua path (`/send`, `/claim`, `/history`) dirender oleh React di client side, bukan file HTML terpisah.  
EdgeOne perlu diarahkan: **semua route → `index.html`**.

## Fix (sudah diterapkan)

File `frontend/public/_redirects` sudah dibuat dengan isi:

```
/*    /index.html    200
```

Vite akan otomatis menyalin file ini ke `dist/` saat `npm run build`.

## Deploy ke EdgeOne

### Konfigurasi di dashboard EdgeOne Pages:

| Setting | Value |
|---|---|
| **Framework** | Vite |
| **Build Command** | `cd frontend && npm install && npm run build` |
| **Output Directory** | `frontend/dist` |
| **Root Directory** | `./` (repo root) |

### Atau deploy dari folder frontend langsung:

| Setting | Value |
|---|---|
| **Root Directory** | `frontend` |
| **Build Command** | `npm install && npm run build` |
| **Output Directory** | `dist` |

## Verifikasi

Setelah deploy, cek semua route:
```
✅ https://[project].edgeone.app/           → landing
✅ https://[project].edgeone.app/send        → send page
✅ https://[project].edgeone.app/claim       → claim page
✅ https://[project].edgeone.app/history     → history page
```

Kalau masih 404 setelah fix ini: cek di dashboard EdgeOne apakah build succeed. Cek log build untuk error.
