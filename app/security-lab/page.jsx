import { PageFrame } from "../components/site-chrome";
export const metadata = {
  title: "Laboratorium Keamanan",
  description:
    "Catatan keamanan defensif dan dokumentasi latihan yang akan dipublikasikan setelah dapat diverifikasi.",
  alternates: { canonical: "/security-lab/" },
};
const labSections = [
  {
    title: "Penguatan keamanan Linux",
    description:
      "Catatan konfigurasi dasar, perubahan, dan hasil verifikasi pada lingkungan yang diizinkan.",
  },
  {
    title: "Analisis log",
    description:
      "Contoh log yang aman dipublikasikan, hipotesis deteksi, indikator, dan langkah triase yang dapat diulang.",
  },
  {
    title: "Catatan latihan CTF",
    description:
      "Catatan latihan yang boleh dibagikan, dengan ruang lingkup, proses, dan batasan yang dinyatakan jelas.",
  },
];
export default function SecurityLabPage() {
  return (
    <PageFrame section="security-lab">
      <header className="mi-page-intro">
        <p className="mi-kicker">Berlatih, mendokumentasikan, memverifikasi</p>
        <h1 className="mi-page-title">Laboratorium Keamanan</h1>
        <p>
          Ruang untuk dokumentasi penguatan keamanan Linux, analisis log, dan
          latihan CTF
          yang boleh dipublikasikan. Belum ada temuan atau catatan latihan yang
          dipublikasikan di halaman ini.
        </p>
      </header>
      <div className="mi-lab-list">
        {labSections.map((section, index) => (
          <article className="mi-lab-item" key={section.title}>
            <span className="mi-index">0{index + 1}</span>
            <div>
              <h2>{section.title}</h2>
              <p>{section.description}</p>
            </div>
            <span className="mi-unpublished">Belum dipublikasikan</span>
          </article>
        ))}
      </div>
      <aside className="mi-callout">
        <h2>Standar publikasi</h2>
        <p>
          Setiap catatan akan menyertakan ruang lingkup dan izin pengujian,
          metodologi, bukti yang dapat direproduksi, rekomendasi, serta batasan.
          Tidak ada sistem eksternal yang diuji untuk mengisi halaman ini.
        </p>
      </aside>
    </PageFrame>
  );
}
