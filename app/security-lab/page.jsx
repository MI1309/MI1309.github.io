import { PageFrame } from "../components/site-chrome";
export const metadata = {
  title: "Security Lab",
  description:
    "Catatan keamanan defensif dan write-up latihan yang akan dipublikasikan setelah dapat diverifikasi.",
  alternates: { canonical: "/security-lab/" },
};
const labSections = [
  {
    title: "Linux hardening",
    description:
      "Catatan konfigurasi, baseline, perubahan, dan hasil verifikasi pada lingkungan yang diizinkan.",
  },
  {
    title: "Analisis log",
    description:
      "Contoh log yang aman dipublikasikan, hipotesis deteksi, indikator, dan langkah triase yang dapat diulang.",
  },
  {
    title: "CTF write-ups",
    description:
      "Write-up latihan yang boleh dibagikan, dengan ruang lingkup, proses, dan batasan yang dinyatakan jelas.",
  },
];
export default function SecurityLabPage() {
  return (
    <PageFrame section="security-lab">
      <header className="mi-page-intro">
        <p className="mi-kicker">Practice, document, verify</p>
        <h1 className="mi-page-title">Security Lab</h1>
        <p>
          Ruang untuk dokumentasi Linux hardening, analisis log, dan latihan CTF
          yang boleh dipublikasikan. Belum ada temuan atau write-up yang
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
