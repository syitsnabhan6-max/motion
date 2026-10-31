export const FORMAT = {width: 1080, height: 1920, fps: 60, seconds: 84};

export type OutlookProps = {
  week: string;
  spot: string;
  logoSrc: string | null;
  voiceoverSrc: string | null;
  music: boolean;
};

export const defaultOutlook: OutlookProps = {
  week: '2–6 November 2026',
  spot: '3.875,645',
  // Use the original uploaded logo, never an approximation of its symbol.
  // Paths are relative to public/. A text credit is used until the file arrives.
  logoSrc: null,
  voiceoverSrc: 'destino/voiceover.wav',
  music: true,
};

export const C = {
  ink: '#03060C', navy: '#071A35', blue: '#0753A6', royal: '#1267DB',
  ice: '#72B8FF', white: '#F4F8FF', mute: '#A4B8D1', steel: '#456485',
};

export const chapters = [
  {at: 0, end: 7, name: '4.000 jebol'},
  {at: 7, end: 17, name: 'Struktur D1 / H4'},
  {at: 17, end: 29, name: 'Sesudah FOMC'},
  {at: 29, end: 36, name: 'Narasi publik'},
  {at: 36, end: 48, name: 'Skenario tekanan'},
  {at: 48, end: 60, name: 'Skenario pemulihan'},
  {at: 60, end: 76, name: 'Kalender katalis'},
  {at: 76, end: 84, name: 'Tunggu konfirmasi'},
];

export const calendar = [
  {day: '03', weekday: 'Selasa', title: 'JOLTS', detail: 'Lowongan kerja · September', time: '22:00 WIB'},
  {day: '05', weekday: 'Kamis', title: 'Produktivitas', detail: '& biaya tenaga kerja · Q3', time: '20:30 WIB'},
  {day: '06', weekday: 'Jumat', title: 'Payrolls AS', detail: 'Upah · pengangguran · revisi', time: '20:30 WIB'},
];

// These are explicitly schematic control points, not OHLC observations.
// The user supplied zoomed-out D1/H4 screenshots, not a time series.
// The end-point alone is the exact displayed quote; the shape illustrates lower highs.
export const structureSketch = [
  4500, 4420, 4460, 4350, 4385, 4200, 4250, 4080, 4150, 4010,
  4060, 3980, 4100, 4020, 4080, 4015, 4155, 4380, 4330, 4510,
  4660, 4540, 4460, 4300, 4415, 4290, 4350, 4250, 4360, 4290,
  4190, 4110, 4180, 4090, 4170, 4110, 4160, 4080, 4110, 4000,
  4025, 3970, 4040, 4000, 3875.645,
];

export const headlines = [
  {publisher: 'The Wall Street Journal', title: 'Gold and Silver Futures\nFall to 1-Year Lows'},
  {publisher: "Barron’s", title: 'Gold Just Hit\na New Low'},
];

export const voiceover = [
  'Emas kehilangan empat ribu. Pantulan berikutnya: pemulihan, atau awal tekanan baru?',
  'Untuk dua sampai enam November, struktur harian dan empat jam masih menunjukkan puncak yang makin rendah. Harga acuan pada chart sekitar tiga ribu delapan ratus tujuh puluh lima.',
  'Setelah FOMC, suku bunga ditahan. Tapi dua anggota justru memilih kenaikan. Dengan inflasi yang masih tinggi, keputusan hold belum berarti pelonggaran.',
  'Headline publik menyoroti harga emas yang melemah. Itu konteks sentimen, bukan konfirmasi untuk langsung menjual.',
  'Fokus terdekat: area tiga ribu delapan ratus tujuh puluh. Jika ditembus dan retest gagal, perhatian beralih ke angka psikologis tiga ribu delapan ratus. Ini skenario, bukan kepastian.',
  'Sebaliknya, pantulan perlu merebut kembali empat ribu dan bertahan saat diuji ulang. Baru area empat ribu seratus sampai empat ribu dua ratus menjadi pengujian berikutnya. Satu wick belum cukup.',
  'Katalisnya: JOLTS hari Selasa, jam sepuluh malam. Produktivitas dan biaya tenaga kerja hari Kamis, lalu payrolls, upah, dan pengangguran hari Jumat. Keduanya jam setengah sembilan malam, waktu Indonesia Barat. Perhatikan hasil dibanding ekspektasi, revisi, serta respons dolar dan yield.',
  'Petakan level. Tunggu konfirmasi. Jangan mengejar candle pertama. Destino CT: focus, plan, execute, succeed.',
];
