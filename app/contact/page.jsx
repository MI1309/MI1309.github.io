import { PageFrame } from "../components/site-chrome";
export const metadata = {
  title: "Kontak",
  description:
    "Hubungi Muhammad Imron untuk bimbingan bahasa Jepang dan persiapan JLPT, kolaborasi web, atau peluang kerja.",
  alternates: { canonical: "/contact/" },
};
export default function ContactPage() {
  return (
    <PageFrame section="contact">
      <section className="mi-contact-panel" aria-labelledby="contact-title">
        <header className="mi-contact-intro">
          <p className="mi-kicker"><a href="/">← Mari terhubung</a></p>
          <h1 id="contact-title" className="mi-page-title">
            Mari belajar dan berkolaborasi.
          </h1>
          <p>
            Saya terbuka untuk berbagi, berkolaborasi, dan berdiskusi tentang:
          </p>
        </header>
        <ul className="mi-contact-topics">
          <li>
            <span className="mi-contact-topic-number" aria-hidden="true">
              01
            </span>
            <div>
              <h2>Bimbingan bahasa Jepang</h2>
              <p>Belajar dasar bahasa Jepang dan persiapan JLPT N5 atau N4.</p>
            </div>
          </li>
          <li>
            <span className="mi-contact-topic-number" aria-hidden="true">
              02
            </span>
            <div>
              <h2>Kolaborasi proyek web</h2>
              <p>Diskusi ide dan pengembangan aplikasi web.</p>
            </div>
          </li>
          <li>
            <span className="mi-contact-topic-number" aria-hidden="true">
              03
            </span>
            <div>
              <h2>Peluang dan diskusi</h2>
              <p>
                Proyek lepas, magang, posisi pengembang web tingkat pemula, atau
                diskusi keamanan siber.
              </p>
            </div>
          </li>
        </ul>
        <footer className="mi-contact-action">
          <a
            className="mi-button mi-button-primary"
            href="mailto:imronm1309@gmail.com?subject=Kontak%20MI1309"
          >
            Kirim email <span aria-hidden="true">↗</span>
          </a>
        </footer>
      </section>
    </PageFrame>
  );
}
