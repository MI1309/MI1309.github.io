export const projects = [
  {
    slug: "jbook",
    name: "JBook",
    summary:
      "Aplikasi belajar bahasa Jepang yang menyatukan materi, latihan, dan progres belajar dalam satu proyek dengan client web dan mobile.",
    problem:
      "Materi kanji, kosakata, tata bahasa, dan latihan merupakan bagian-bagian belajar yang perlu dijelajahi secara terarah. JBook dibuat sebagai tempat untuk mengakses kelompok materi tersebut.",
    goal: "Membangun platform pembelajaran bahasa Jepang dengan katalog materi dan alur latihan, serta dukungan web dan mobile.",
    role: "Pengembang dan pemilik repositori publik MI1309/jbook. Riwayat dan dokumentasi publik tersedia, tetapi atribusi kontribusi per fitur belum dipetakan di halaman studi kasus ini.",
    technologies: [
      "Django",
      "Django Ninja",
      "Next.js",
      "React",
      "Tailwind CSS",
      "IndexedDB",
      "Flutter",
    ],
    features: [
      "Web: katalog Kanji, Kotoba, dan Bunpo dengan halaman detail.",
      "Web: Kana, latihan materi, latihan bacaan Doukai, dan permainan TTS.",
      "Web: akun, dashboard progres, blog (dinonaktifkan menurut inventaris), serta panel administrasi.",
      "Web: cache data IndexedDB dan antrean latihan offline tercatat di inventaris source.",
      "Mobile Flutter: layar materi, latihan, akun, dashboard, dan sebagian panel admin.",
    ],
    status: "In Progress",
    repository: "https://github.com/MI1309/jbook",
    architecture: [
      "Backend API: Django dengan Django Ninja; README mendeskripsikan SQLite sebagai default dan PostgreSQL sebagai opsi.",
      "Web client: Next.js App Router dan Tailwind CSS.",
      "Client mobile Flutter tersedia pada direktori jbook_mobile; client Expo terpisah masih berupa starter menurut inventaris proyek.",
      "Penyimpanan offline web menggunakan IndexedDB; dokumentasi juga mencatat antrean sinkronisasi hasil latihan.",
    ],
    challenges:
      "Catatan teknis yang menghubungkan tantangan tertentu dengan kontribusi langsung belum tersedia. Dari struktur repo, area yang perlu dijelaskan lebih lanjut adalah sinkronisasi API dan progres latihan ketika koneksi terputus, serta konsistensi fitur antar-client.",
    decisions: [
      "Memisahkan API Django dari client web dan mobile agar beberapa antarmuka dapat menggunakan layanan materi yang sama.",
      "Mencatat cache lokal dan antrean offline sebagai lapisan web tersendiri; perilaku produksi belum diverifikasi secara independen.",
    ],
    outcomes: [
      "Repo publik memuat backend Django/Django Ninja, frontend Next.js, dan client Flutter.",
      "Inventaris fitur repo memetakan katalog materi, latihan, dashboard, dan dukungan offline pada source.",
      "Demo live, jumlah pengguna, metrik performa, dan status tiap fitur di production belum diverifikasi; tidak ada metrik yang diklaim.",
    ],
    nextSteps: [
      "Tambahkan screenshot dan tautan demo yang sudah diuji.",
      "Catat kontribusi individual, tantangan yang benar-benar ditemui, serta trade-off dengan contoh perubahan source atau commit.",
      "Jalankan dan dokumentasikan alur web/API yang ingin ditampilkan, termasuk batas dukungan offline.",
    ],
    evidenceNote:
      "Ringkasan disusun dari README dan inventaris fitur publik di repo. Inventaris menyatakan bahwa implementasi source tidak menjamin ketersediaan production; klaim live dan kontribusi per fitur menunggu verifikasi.",
  },
];
export function getProjectBySlug(slug) {
  return projects.find((project) => project.slug === slug);
}
