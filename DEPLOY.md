# Deploy KirimStellar Frontend ke EdgeOne Pages

## Root Cause 404

Vite tidak meng-copy file underscore-prefixed (`_redirects`) dari `public/` ke `dist/`.  
EdgeOne menerima `dist/` tanpa routing config → semua path selain `/` return 404.

**Fix diterapkan (2 lapis):**

### 1. `postbuild` script (package.json)
Setelah `vite build`, script otomatis copy `_redirects` + buat `404.html`:
```json
"postbuild": "cp public/_redirects dist/_redirects && cp dist/index.html dist/404.html"
```

### 2. `_redirects` SPA fallback
```
/*    /index.html    200
```

## EdgeOne Build Configuration

| Field | Isi |
|---|---|
| Preset framework | **Other** |
| Root directory | `./` |
| Build output directory | `frontend/dist` |
| Install command | `npm install` |
| Compile commands | `cd frontend && npm install && npm run build` |

## Verifikasi pasca-deploy

Setelah build sukses, cek:
```
✅ https://kirimstellar.edgeone.dev/           → index.html (landing)
✅ https://kirimstellar.edgeone.dev/send        → SPA routing ke index.html
✅ https://kirimstellar.edgeone.dev/claim       → SPA routing ke index.html
✅ https://kirimstellar.edgeone.dev/404.html    → fallback page
```

Kalau masih 404: cek **build log** di dashboard EdgeOne. Pastikan:
1. `npm install` sukses (ada `node_modules/`)
2. `vite build` sukses (ada `dist/index.html`)
3. `postbuild` jalan (ada `dist/_redirects` dan `dist/404.html`)
