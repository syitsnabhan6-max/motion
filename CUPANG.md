# Cupang Archer — adaptasi langsung PULSE

Composition **Cupang**, **1800 × 600**, **60 fps**, **24 detik / 1.440 frame**. Source awal disalin dari `src/pulse/`, bukan dari animasi Archer. PULSE asli tetap tersedia sebagai composition `Pulse` pada 1080 × 1920 untuk perbandingan.

## Buka dan edit

```sh
npm ci
npm run dev
```

Pilih **Cupang** di Remotion Studio. Pilih **Pulse** untuk melihat source aslinya pada detik yang sama.

```sh
npm run check:cupang
npm run frames:cupang
npm run render:cupang
```

`render:cupang` menulis `out/cupang-pulse.mp4`. `preview:cupang` membuat versi 1350 × 450. Node.js 22+ direkomendasikan. Chromium harus mendukung WebGL; `/usr/bin/chromium` digunakan bila tersedia, atau pilih executable melalui `CHROME_PATH`.

## Asal source dan perubahan

| PULSE asli | Salinan Cupang | Yang dipertahankan |
|---|---|---|
| `src/pulse/PulseFilm.tsx` | `src/cupang/CupangFilm.tsx` | Seluruh jendela waktu judul, gerak reveal per baris, pembuka “Sebelum entry. / Lihat polanya.”, gate komponen, glint dan urutan penutup |
| `src/pulse/UI.tsx` | `src/cupang/UI.tsx` | Empat panel yang bergeser horizontal, form dan klik, daftar stagger, delapan bar grafik, slider risiko, checklist, seluruh key time kamera dan kursor |
| `src/pulse/Objects3D.tsx` | `src/cupang/Objects3D.tsx` | Lima candle, geometri bevel, material specular, rotasi objek, seluruh keyframe kamera, transisi masuk/keluar mark, torus penutup |
| `src/pulse/motion.ts` | `src/cupang/motion.ts` | `clamp`, `q`, `m`, `out`, `vis`, `path` dan timing aksi 5.8 / 11.15 / 16.1 |
| `public/pulse/soundtrack.m4a` | `public/cupang/soundtrack.m4a` | Soundtrack PULSE yang sama, byte-identik, tanpa retiming |

Perubahan yang diterapkan:

- Palet PULSE menjadi merah `#F03240`, merah muda pantulan `#FFB7BC`, hitam `#070507`, dan putih hangat `#FFF5F6`.
- Teks dan data UI disesuaikan untuk konfirmasi Archer, entry, SL, TP, dan notifikasi. Struktur form → daftar → grafik → kontrol risiko tetap.
- Framing portrait dipetakan ke 3:1: typography di sisi kiri dan objek/UI di sisi kanan. Panel dirapikan menjadi layout lebar; bukan video portrait yang diregangkan.
- Kartu daftar masuk sebagai bola yang jatuh, memantul, dan melebar pada slot serta jendela reveal PULSE masing-masing. Panel utama juga membuka/menutup melalui bentuk bola dalam jendela masuk/keluar aslinya.
- Kamera memakai key time dan nilai PULSE yang sama, dengan interpolasi kubik yang menjaga bentuk lintasan. Gerak vertikal dipetakan menjadi busur, dan zoom tambahan mengikuti penarikan level serta slider.
- Grafik tetap memakai delapan bar asli, dengan anotasi entry/SL/TP yang digambar sesudah aksi filter pada 11.15 detik.
- Notifikasi muncul di panel rencana setelah checklist aktif; tidak ada babak ponsel tambahan.
- Glyph PULSE pada rig 3D penutup diganti logo Cupang. Torus, transform dan timing rig tetap.

Archer v4 menyumbang logo `public/archer/cupang.png` dan informasi fitur. Tidak ada komponen animasi dari `src/archer/` atau `src/archer/v5/` yang diimpor oleh Cupang.

## Peta waktu yang dipertahankan

| Detik | PULSE | Cupang |
|---|---|---|
| 0–3.7 | Candle 3D dan pembuka | Geometri, koreografi dan teks pembuka sama; merah-hitam |
| 2.7–6.9 | Form, field mengisi, klik pada 5.8 | Form konfirmasi, bola membuka panel, klik pada 5.8 |
| 6.7–10.1 | Daftar, reveal dari 7.15 dengan stagger 0.11 | Daftar setup, kartu membuka dari bola dengan waktu yang sama |
| 10–13.8 | Grafik, filter pada 11.15 | Delapan bar asli dan garis entry/SL/TP; fokus kamera mengikuti gambar garis |
| 13.8–18.3 | Rencana, slider 15.5–16.15, checklist dari 16 | Kontrol risiko yang sama, checklist dan notifikasi Archer |
| 17.5–19.1 | UI menjauh | UI menjauh dan menyusut menjadi bola pada waktu yang sama |
| 18.1–24 | Mark 3D, wordmark 19.2, kalimat 20.6, footer 22 | Rig yang sama dengan logo dan wordmark Cupang Archer |

## File edit utama

- `src/cupang/CupangFilm.tsx`: copy judul, framing, latar, audio; waktu judul tetap mengikuti PULSE.
- `src/cupang/UI.tsx`: field, kartu, bar grafik, garis, slider, checklist dan pesan notifikasi.
- `src/cupang/Objects3D.tsx`: candle dan mark 3D yang berasal dari PULSE.
- `src/cupang/adaptation.ts`: ukuran UI lebar, harga contoh, interpolasi kamera, pantulan kartu, dan busur gerak.
- `src/cupang/motion.ts`: token warna dan helper PULSE.

## Pemeriksaan sebelum ekspor

`scripts/cupang-source-check.mjs` membandingkan AST source PULSE dan Cupang: enam jendela judul, copy pembuka, tujuh helper/timing, lima transisi UI, keyframe kamera, koreografi 3D dan geometri lima candle. Script juga memeriksa identitas soundtrack dan aset logo.

`scripts/cupang-compare.mjs` merender kedua composition pada frame identik. Frame pembuka, form, daftar, grafik, penarikan garis, slider, notifikasi, dan penutup diperiksa sebelum render MP4. Hasil perbandingan disimpan sebagai PDF dan lembar JPG.

Video akhir diperiksa dengan ffprobe dan decode FFmpeg lengkap. ZIP diuji dengan instalasi, typecheck, pemeriksaan source dan render dari hasil ekstraksinya sendiri.

## File hasil

- `downloads/cupang-pulse.mp4`
- `downloads/cupang-pulse-remotion.zip`
- `downloads/cupang-pulse-comparison.pdf`
- `downloads/cupang-pulse-compare-1.jpg` sampai `cupang-pulse-compare-4.jpg`
- `downloads/cupang-pulse-poster.png`

ZIP memuat source Cupang, source PULSE untuk perbandingan, aset, soundtrack, lockfile, konfigurasi dan script pemeriksaan. Komposisi tetap editable; video tidak dipakai sebagai lapisan pengganti animasi.

Harga dan UI adalah contoh demonstrasi fitur, bukan data pasar aktual atau screenshot produk yang diverifikasi. Tidak ada klaim hasil trading. Logo Cupang masih berupa PNG transparan dari versi sebelumnya.
