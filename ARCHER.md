# Trade With Cupang — Archer

Film web tanpa voice-over dan tanpa audio, 34 detik, 1920 × 1080, 60 fps.
Komposisi Remotion: `Archer`.

## Buka dan edit

```sh
npm ci
npm run dev
```

Pilih komposisi **Archer**. Semua timing, gerakan kamera, teks, candlestick, level, dan notifikasi adalah komponen yang bisa diedit. Tidak menggunakan screenshot chart sebagai video latar.

```sh
npm run typecheck
npm run render:archer
```

Hasil: `out/archer.mp4`. Chromium lokal digunakan bila tersedia; jika tidak, Remotion memakai browser yang dikelolanya. `CHROME_PATH` dapat menunjuk executable browser lain.

## File utama

- `src/archer/ArcherFilm.tsx`: timeline, kamera chart, notifikasi, penutup.
- `src/archer/Intro.tsx`: kepingan putih, logo merah, perpindahan XAUUSD/BTC.
- `src/archer/Atmosphere.tsx`: gradient merah-hitam dan bidang cahaya bergerak.
- `src/archer/Chart.tsx`: candlestick ilustratif, BUY, entry, SL, TP.
- `src/archer/Titles.tsx`: animasi per kata.
- `src/archer/motion.ts`: easing deterministik dan kurva gerak.
- `src/archer/Brand.tsx`: logo dan simbol instrumen.
- `public/archer/`: logo raster transparan, ikon BTC, lisensi.

## Script / urutan

| Detik | Copy / aksi                                                                                   |
| ----- | --------------------------------------------------------------------------------------------- |
| 0–3   | Trading; kepingan logo putih dengan logo Cupang merah pada beberapa kedalaman                 |
| 3–6   | Dengan arah yang jelas; objek berkumpul mengikuti lintasan lengkung                           |
| 6–9   | Pair pilihanmu; XAUUSD / Gold, BTC / Bitcoin                                                  |
| 9–12  | Cupang Archer; kamera masuk ke bidang chart                                                   |
| 12–16 | Menunggu konfirmasi; chart tanpa sinyal atau level Archer                                     |
| 16–19 | Konfirmasi hadir / Sinyal muncul; BUY setelah konfirmasi                                      |
| 19–24 | Area entry / SL dan TP lengkap; kamera mundur untuk membaca setup                             |
| 24–29 | Lihat di TradingView / Atau lewat notifikasi                                                  |
| 29–34 | Trade With Cupang / Archer; Permudah Jalan Trading Anda Bersama Cupang.; Coba Archer Sekarang |

## Aset dan batas ilustrasi

- Brand dan bentuk logo berasal dari gambar yang diberikan pengguna. Aset logo merah transparan disiapkan menggunakan image editing dari gambar tersebut; bukan master vektor asli. File `cupang.png` bisa diganti dengan ekspor resmi logo bertransparansi tanpa mengubah animasi.
- Ikon Bitcoin: https://github.com/spothq/cryptocurrency-icons/blob/master/svg/color/btc.svg (CC0; lisensi disertakan).
- XAUUSD menggunakan ilustrasi bullion emas dengan simbol unsur Au; XAUUSD bukan brand dengan satu logo resmi. Bullion SVG dibuat di `Brand.tsx`.
- Chart, OHLC, label harga, dan notifikasi merupakan **ilustrasi**, bukan data pasar langsung atau tangkapan layar produk. Informasi yang didemokan mengikuti brief: sinyal hanya muncul setelah konfirmasi, disertai entry, SL dan TP. Screenshot produk asli belum diberikan.
- XAUUSD dan BTC ditampilkan sesuai pilihan pengguna. Demo chart memakai XAUUSD. Tidak menggambarkan hasil TP tercapai atau jaminan keuntungan.
- Referensi gerak: opening depth Beliv, instrumen bulat dan pergeseran perspektif chart Wizart, aliran tipografi Finqube. Tidak memakai footage referensi dalam video final.
- Arahan Bang Motion diterapkan pada koreografi; implementasi memakai Remotion sesuai permintaan pengguna.

## Website

Gunakan MP4 dengan `autoplay muted playsinline loop` dan poster. Video tidak memiliki audio, sehingga pesannya tetap lengkap saat muted. CTA yang bisa diklik perlu ditempatkan sebagai elemen HTML di luar video dengan URL produk yang benar. Tombol di dalam MP4 hanya visual. Sediakan gambar poster statis bagi pengunjung yang memilih reduced motion.

## Verifikasi

TypeScript, keyframe intro/pair/zoom/BUY/level/notifikasi/CTA, pemeriksaan rangkaian transisi, metadata dan decode MP4. Seluruh animasi merupakan fungsi frame sehingga scrub dan render tetap konsisten.
