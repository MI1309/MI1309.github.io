export const projects = [
  {
    slug: "jbook",
    name: "JBook",
    summary:
      "Aplikasi belajar bahasa Jepang yang menyatukan materi, latihan, dan perkembangan belajar dalam satu proyek dengan aplikasi web dan seluler.",
    problem:
      "Materi kanji, kosakata, tata bahasa, dan latihan merupakan bagian-bagian belajar yang perlu dijelajahi secara terarah. JBook dibuat sebagai tempat untuk mengakses kelompok materi tersebut.",
    goal:     "Membangun platform pembelajaran bahasa Jepang dengan katalog materi dan alur latihan, serta dukungan web dan seluler.",
    role: "Pengembang dan pemilik repositori publik MI1309/jbook. Riwayat dan dokumentasi publik tersedia, tetapi kontribusi untuk setiap fitur belum dirinci di halaman studi kasus ini.",
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
      "Aplikasi web: katalog Kanji, Kotoba, dan Bunpo dengan halaman perincian.",
      "Aplikasi web: Kana, latihan materi, latihan bacaan Doukai, dan permainan TTS.",
      "Aplikasi web: akun, dasbor perkembangan, blog (dinonaktifkan menurut inventaris), serta panel administrasi.",
      "Aplikasi web: tembolok data IndexedDB dan antrean latihan luring tercatat di inventaris kode sumber.",
      "Flutter seluler: layar materi, latihan, akun, dasbor, dan sebagian panel administrasi.",
    ],
    status: "In Progress",
    repository: "https://github.com/MI1309/jbook",
    architecture: [
      "API sisi server: Django dengan Django Ninja; README menjelaskan SQLite sebagai pilihan bawaan dan PostgreSQL sebagai opsi.",
      "Aplikasi web: Next.js App Router dan Tailwind CSS.",
      "Aplikasi Flutter seluler tersedia di direktori jbook_mobile; aplikasi Expo terpisah masih berupa kerangka awal menurut inventaris proyek.",
      "Penyimpanan luring web menggunakan IndexedDB; dokumentasi juga mencatat antrean sinkronisasi hasil latihan.",
    ],
    challenges:
      "Catatan teknis yang menghubungkan tantangan tertentu dengan kontribusi langsung belum tersedia. Dari struktur repositori, area yang perlu dijelaskan lebih lanjut adalah sinkronisasi API dan perkembangan latihan ketika koneksi terputus, serta konsistensi fitur antar-aplikasi.",
    decisions: [
      "Memisahkan API Django dari aplikasi web dan seluler agar beberapa antarmuka dapat menggunakan layanan materi yang sama.",
      "Mencatat tembolok lokal dan antrean luring sebagai lapisan web tersendiri; perilaku pada lingkungan produksi belum diverifikasi secara independen.",
    ],
    outcomes: [
      "Repositori publik memuat sisi server Django/Django Ninja, antarmuka Next.js, dan aplikasi Flutter.",
      "Inventaris fitur repositori mencatat katalog materi, latihan, dasbor, dan dukungan luring pada kode sumber.",
      "Demo langsung, jumlah pengguna, metrik kinerja, dan status setiap fitur di lingkungan produksi belum diverifikasi; tidak ada metrik yang diklaim.",
    ],
    nextSteps: [
      "Tambahkan tangkapan layar dan tautan demo yang sudah diuji.",
      "Catat kontribusi individu, tantangan yang benar-benar ditemui, serta pertimbangan desain dengan contoh perubahan kode sumber atau commit.",
      "Jalankan dan dokumentasikan alur web/API yang ingin ditampilkan, termasuk batas dukungan luring.",
    ],
    evidenceNote:
      "Ringkasan disusun dari README dan inventaris fitur publik di repositori. Inventaris menyatakan bahwa implementasi kode sumber tidak menjamin ketersediaan di lingkungan produksi; klaim demo langsung dan kontribusi per fitur menunggu verifikasi.",
  },
];
export function getProjectBySlug(slug) {
  return projects.find((project) => project.slug === slug);
}
