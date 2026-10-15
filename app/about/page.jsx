import { PageFrame } from "../components/site-chrome";
export const metadata = {
  title: "About",
  description:
    "Latar belakang, fokus belajar, dan pengalaman proyek Muhammad Imron.",
  alternates: { canonical: "/about/" },
};
export default function AboutPage() {
  return (
    <PageFrame section="about">
      <header className="mi-page-intro">
        <p className="mi-kicker">A little about me</p>
        <h1 className="mi-page-title">Tentang Imron</h1>
        <p>
          Saya berlatar Rekayasa Perangkat Lunak (RPL), tertarik pada
          pengembangan web dan keamanan aplikasi, serta belajar bahasa Jepang.
        </p>
      </header>

      <div className="mi-detail-grid mi-about-grid">
        <section className="mi-detail-section">
          <p className="mi-kicker">Background</p>
          <h2>Belajar dengan membangun</h2>
          <p>
            Pengalaman yang saya bawa mencakup pengembangan aplikasi web,
            pengerjaan JBook, latihan CTF, Linux, dan praktik hardening. Saya
            masih mengembangkan kemampuan melalui proyek dan praktik yang bisa
            ditinjau.
          </p>
        </section>
        <section className="mi-detail-section">
          <p className="mi-kicker">Working knowledge</p>
          <h2>Area yang saya tekuni</h2>
          <ul className="mi-detail-list">
            <li>
              Pengembangan web dengan pengalaman proyek yang dapat ditinjau pada
              repositori JBook.
            </li>
            <li>
              Dasar Linux dan praktik hardening sebagai area belajar langsung.
            </li>
            <li>
              Latihan CTF untuk mengenal konsep keamanan dalam lingkungan
              latihan.
            </li>
            <li>
              Bahasa Jepang; sertifikat JLPT N4 (informasi profil yang
              diberikan).
            </li>
          </ul>
        </section>
        <section className="mi-detail-section">
          <p className="mi-kicker">Current focus</p>
          <h2>Langkah belajar berikutnya</h2>
          <p>
            Mendokumentasikan keputusan teknis dengan lebih baik, membangun
            aplikasi yang mudah dipakai, dan menambah bukti kerja yang bisa
            direproduksi pada ranah keamanan defensif.
          </p>
        </section>
      </div>
    </PageFrame>
  );
}
