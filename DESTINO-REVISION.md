# DestinoCT — uji arah revisi, 15 detik

Revisi ini merespons penolakan visual, VO, dan musik versi 84 detik. Ini cuplikan untuk menilai arah baru, belum pengganti seluruh market outlook.

Composition: `DestinoRevision`, 1080 × 1920, 60 fps, 900 frame. Materi pasar tetap memakai riset yang tersimpan di `docs/destino-sources`, per 31 Oktober 2026, untuk pekan 2–6 November 2026.

## Arah visual

- Biru tua `#1569d1`, hitam `#030711`, putih `#f4f7fc`. Emas dipakai hanya pada objek komoditas.
- Sora 600 untuk display, DM Sans untuk label. Tidak memakai typography Bricolage versi lama.
- Satu alur objek: ingot emas 3D masuk, mengecil ke titik pada chart, mengikuti garis, keluar melalui kurva, mantul dua kali, lalu mengembang menjadi objek keputusan Fed.
- Angka 4.000 berpindah dari hook ke level chart. Kamera mendekat saat garis digambar, mundur untuk melihat akhir struktur, lalu mengikuti titik harga.
- Dua lapisan bentuk biru melengkung bergerak pelan di belakang subjek; butiran berukuran asli, bukan tekstur yang diperbesar.
- Fisheye dan rangkaian headline belum dimasukkan ke uji opening ini. Arah 15 detik dinilai sebelum menyusun kembali keseluruhan film.

| Detik | Peristiwa |
|---|---|
| 0–3 | “Emas di bawah 4.000”, typography dan ingot dengan pantulan studio |
| 3–7 | 4.000 menjadi level; gambar struktur menurun dengan titik harga mengikuti garis |
| 7–9.3 | Titik meninggalkan chart melalui kurva, mantul, lalu mengembang |
| 9.3–12 | Keputusan Fed: hold 3,75–4,00% |
| 12–15 | 10 suara tahan, 2 suara memilih naik |

Chart adalah skema struktur dari screenshot user, **bukan data candle/OHLC**. Label skema tetap terlihat saat chart dapat dibaca. Harga 3.875,645 adalah harga acuan screenshot, bukan kutipan live.

## VO dan musik

Naskah baru:

> Emas, di bawah empat ribu.
>
> Pantulan, atau lanjut turun?
>
> Pasca FOMC. Bunga ditahan.
>
> Tapi dua anggota memilih naik.

VO digenerate ulang per frasa tanpa mempercepat WAV. Mesin lokal Piper `id_ID-news_tts-medium` masih sama; **ini belum mengganti karakter narrator**. Keterbatasan asal lisensi model yang tercatat di `public/destino/VOICE-NOTES.md` masih berlaku. Model tidak disertakan.

Musik baru: komposisi 100 BPM, electric piano, bass, drum pelan, dan SFX yang mengikuti kontak bola. Tidak mengambil audio referensi. Piano dirender melalui FluidSynth memakai soundfont sistem TimGM6mb (Tim Brechbill/David Bolton, GPL-2); soundfont tidak dibundel. Detail skor, sintesis dan timing ada dalam `scripts/destino-revision-audio.py`.

Audio ini masih materi review. Pengujian teknis durasi/level tidak menggantikan penilaian manusia terhadap suara.

## Menjalankan

```sh
npm install
npm run dev
```

Pilih `DestinoRevision`. Untuk render:

```sh
npx remotion render src/index.ts DestinoRevision out/destino-revision-opening.mp4 --crf=18
```

Semua ukuran, teks, kurva, kamera, geometri, dan waktu dapat diedit di `src/destino/revision`. Audio tersedia sebagai dua stem terpisah dalam `public/destino/revision`.

`index.html` di ZIP bisa ditonton tanpa instalasi. Klik sekali untuk memulai dengan suara, Space untuk pause, R untuk ulang; `?debug=1` menampilkan kontrol.

Logo masih wordmark teks DestinoCT karena file logo terpisah belum tersedia di workspace. Komposisi PULSE, Cupang, Archer, dan video lama tidak ditimpa.

## Pemeriksaan export

- TypeScript proyek dan paket mandiri: lulus.
- MP4: H.264, yuv420p, 1080 × 1920, 60 fps, 900 frame; AAC stereo 48 kHz. Durasi wadah 15,014 detik mencakup padding AAC.
- Seluruh frame berhasil didecode. Lembar kontak tiap 0,5 detik dari MP4 diperiksa.
- Player mandiri: tanpa page error atau permintaan aset eksternal; kedua stem mulai bersamaan setelah klik, pause dan seek berfungsi.
- VO mean −20,7 dBFS, peak −3,2 dBFS; musik/SFX mean −31,0 dBFS, peak −11,7 dBFS sebelum mix. Tidak ada clipping pada stem.
- Audio MP4 dimaster dengan FFmpeg `loudnorm=I=-16:TP=-1.5:LRA=8`; dua stem sumber tetap terpisah agar mixing dapat direvisi.
