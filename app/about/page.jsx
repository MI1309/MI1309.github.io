import Link from "next/link";
import { PageFrame } from "../components/site-chrome";
export const metadata = {
  title: "Tentang",
  description:
    "Latar belakang, fokus belajar, dan pengalaman proyek Muhammad Imron.",
  alternates: { canonical: "/about/" },
};
export default function AboutPage() {
  return (
    <PageFrame section="about">
      <header className="mi-page-intro">
        <Link className="mi-back-link mi-about-back" href="/">
          <span aria-hidden="true">←</span> Kembali
        </Link>
        <p className="mi-kicker">Sekilas tentang saya</p>
        <h1 className="mi-page-title mi-greeting-ja" lang="ja">
          みなさん、こんにちは！👋
        </h1>
        <p>
          Saya berlatar Rekayasa Perangkat Lunak (RPL) dan tertarik membangun
          aplikasi web yang mudah digunakan, terstruktur, serta memperhatikan
          keamanan. Saya juga belajar bahasa Jepang dan memiliki sertifikat
          JLPT N5 dan N4.
        </p>
      </header>

      <div className="mi-detail-grid mi-about-grid">
        <section className="mi-detail-section">
          <p className="mi-kicker">Latar belakang</p>
          <h2>Belajar dengan membangun</h2>
          <p>
            Saya mengembangkan kemampuan melalui proyek web, termasuk JBook,
            perlombaan keamanan siber, praktik Linux dan penguatan keamanan, serta
            latihan CTF di lingkungan yang legal dan berizin. Saya terus belajar
            melalui praktik dan proyek yang dapat ditinjau.
          </p>
        </section>
        <section className="mi-detail-section">
          <p className="mi-kicker">Pengetahuan dan pengalaman</p>
          <h2>Area yang saya tekuni</h2>
          <ul className="mi-detail-list">
            <li>
              Pengembangan web dengan pengalaman proyek yang dapat ditinjau pada
              repositori JBook.
            </li>
            <li>
              Dasar Linux dan penguatan keamanan sebagai area belajar langsung.
            </li>
            <li>
              Perlombaan keamanan siber dan latihan CTF di lingkungan legal dan
              berizin untuk mengenal konsep keamanan secara bertanggung jawab.
            </li>
            <li>
              Bahasa Jepang, memiliki sertifikat JLPT N5 dan N4.
            </li>
          </ul>
        </section>
        <section className="mi-detail-section">
          <p className="mi-kicker">Fokus saat ini</p>
          <h2>Langkah belajar berikutnya</h2>
          <p>
            Saya mendokumentasikan langkah, kendala, solusi, keputusan teknis,
            dan pembelajaran agar prosesnya dapat ditinjau serta dipelajari
            kembali. Saya juga ingin terus membangun aplikasi yang mudah dipakai
            dan menambah bukti kerja yang dapat direproduksi pada ranah keamanan
            defensif.
          </p>
        </section>
      </div>
    </PageFrame>
  );
}
