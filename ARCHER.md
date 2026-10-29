# Cupang Archer — revision 5

PULSE diteruskan menjadi film Cupang Archer merah-hitam, dibuat langsung pada **1800 × 600 (3:1), 60 fps, 34 detik**. Komposisi: `Archer`. Film tetap tanpa audio, mengikuti Archer sebelumnya.

## Buka dan render

Node.js 22+ direkomendasikan.

```sh
npm ci
npm run dev
npm run typecheck
npm run render:archer
```

Pilih **Archer** di Remotion Studio. Hasil render: `out/archer-v5.mp4`.
`npm run preview:archer` membuat pratinjau 1350 × 450.
Chromium lokal digunakan bila tersedia; `CHROME_PATH` dapat memilih executable lain.
Pada sistem tanpa Chromium lokal, gunakan installer browser Remotion.

## Arah revisi

Tiga kandidat konsep yang dipertimbangkan: metafora benda, estafet benda, dan tur produk berselang klaim.
**Metafora benda** dipilih karena bola dapat membawa sinyal yang sama melewati konfirmasi, rencana, dan pengiriman notifikasi.

Sidik jari: satu bola · lima babak · pantulan / konfirmasi / level setup / ponsel / identitas · pembuka bola sedang jatuh · penutup bola yang sama membawa tanda Cupang.

- Karakter PULSE: tipografi Inter 500–600, reveal berurutan dengan blur berarah, benda mengilap, fokus kamera pada respons UI, dan latar gelap berlapis.
- Merah `#F03240` diwarisi dari Archer; hitam `#070609` serta putih hangat `#FFF6F4` menjaga kontras. `#FFB5B7` adalah turunan merah untuk pantulan dan aksen teks.
- Tanda tangan gerak: bola memantul, mengalami squash/stretch, membesar menjadi antarmuka, lalu kembali menjadi bola. Objek utama mengikuti lintasan Bézier kubik.
- Latar: cahaya merah bergerak perlahan dan lengkung berlapis. Objek memakai satu keluarga material lacquer/kaca, dibangun dari CSS/SVG yang tetap editable.
- Kamera: close-up konfirmasi hingga 1.4×, push ke level setup hingga 1.22×, lalu ponsel masuk dari dekat dan menjauh. Easing quintic digunakan pada perjalanan kamera; pantulan memakai lintasan balistik dan deformasi kontak.
- Momen utama: bola berubah menjadi ikon notifikasi, melintas dekat kamera, masuk ke ponsel, kemudian mekar menjadi pesan yang terbaca.
- Chart hanya menjadi konteks kecil di editor setup. Konfirmasi, level risiko, dan notifikasi membawa cerita.
- Penekanan teks memakai warna, tanpa sorotan pill pada kata. Tidak ada tanda baca otomatis pada judul pendek.

## Timeline

| Detik | Aksi |
|---|---|
| 0–3.2 | Bola Cupang jatuh, memantul tiga kali sambil mengembang; “Sebelum entry / Temukan arah” |
| 3.2–5.15 | Bola mengikuti kurva dan mekar menjadi panel konfirmasi |
| 5.15–10.8 | Kamera mendekat; indikator selesai membaca, centang muncul dan status menjadi BUY terkonfirmasi |
| 10.8–12.7 | Panel menyusut menjadi bola, berpindah lewat kurva, lalu membuka editor setup |
| 13.1 / 15.1 / 17.1 | Entry, SL, dan TP muncul berurutan; TP di atas entry, SL di bawah entry |
| 19 | Kursor mengaktifkan notifikasi |
| 20–23.1 | Editor kembali menjadi bola; ikon bel membesar dekat kamera dan tiba di ponsel |
| 23.1–28.2 | Pesan keluar dari ponsel dan mengembang; “Langsung lewat notifikasi” |
| 28.2–34 | Pesan menyusut menjadi bola Cupang; penutup “Cupang Archer / Coba sekarang” |

## Sumber yang bisa diedit

| File | Isi |
|---|---|
| `src/archer/ArcherFilm.tsx` | Komposisi utama, urutan teks, latar, dan satu permukaan yang berubah bentuk |
| `src/archer/v5/motion.ts` | Palet, contoh harga, waktu aksi, pantulan, kurva, zoom, dan gerak ponsel |
| `src/archer/v5/Primitives.tsx` | Material bola, ikon, animasi judul, dan kursor |
| `src/archer/v5/Signal.tsx` | Lingkaran konfirmasi, proses membaca, dan status BUY |
| `src/archer/v5/Setup.tsx` | Editor entry/SL/TP, chart konteks, sakelar, dan isi notifikasi |
| `src/archer/v5/Phone.tsx` | Geometri ponsel dan lockscreen |
| `src/archer/Brand.tsx` | Pembungkus aset logo Cupang |
| `public/archer/cupang.png` | Aset logo yang digunakan versi Archer sebelumnya |

Semua animasi diturunkan dari frame Remotion, tanpa `Date.now()`, `Math.random()`, atau jam animasi CSS. Nilai entry/SL/TP berasal dari satu objek `demo` sehingga panel dan notifikasi konsisten. Semua bidang, ikon dan teks dapat diedit; logo Cupang tetap aset raster transparan, bukan vektor asli.

## Deliverable

- `downloads/archer-v5.mp4`: master H.264 1800 × 600.
- `downloads/archer-v5-remotion.zip`: proyek Remotion mandiri dengan source, lockfile, konfigurasi, aset dan README; tanpa node_modules.
- `downloads/archer-v5-poster.png`: frame penutup.
- `scripts/archer-check.mjs`: render keyframe pilihan; argumen opsional berupa daftar detik.
- `scripts/package-archer.py`: membuat ulang ZIP mandiri.

Versi 1–4 tetap tersedia di `downloads/`. Source PULSE tetap di `src/pulse/`; komposisi `Pulse` dapat dipilih untuk perbandingan.

## Data dan aset

Harga dan antarmuka adalah contoh untuk demonstrasi fitur, bukan rekaman harga pasar atau screenshot produk yang diverifikasi. Tidak ada pergerakan harga setelah entry atau hasil keuntungan yang ditampilkan. Sinyal dikonfirmasi sebelum entry/SL/TP muncul. CTA pada video bersifat visual.

Logo Cupang berasal dari aset PNG yang dipakai Archer sebelumnya. Aset Bitcoin beserta lisensi CC0 versi lama tetap disertakan di folder aset, tetapi tidak digunakan film v5.

## Verifikasi

TypeScript, keyframe pembuka/transisi/UI/penutup, kontinuitas enam sambungan lintasan, geometri pada 2040 frame, konsistensi urutan SL < entry < TP, metadata MP4 dan decode penuh, serta instalasi/typecheck/render proyek dari ZIP mandiri.
