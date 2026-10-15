import { PageFrame } from "../components/site-chrome";
export const metadata = {
  title: "Contact",
  description:
    "Kontak untuk peluang freelance, internship, dan pekerjaan junior bersama MI1309.",
  alternates: { canonical: "/contact/" },
};
export default function ContactPage() {
  return (
    <PageFrame section="contact">
      <section className="mi-contact-panel" aria-labelledby="contact-title">
        <p className="mi-kicker">Open to opportunities</p>
        <h1 id="contact-title" className="mi-page-title">
          Mari membangun sesuatu yang berguna.
        </h1>
        <p>
          Saya terbuka untuk percakapan tentang freelance, internship, posisi
          junior web development, dan kesempatan belajar di area cybersecurity.
        </p>
        <a
          className="mi-button mi-button-primary"
          href="https://github.com/mi1309"
          target="_blank"
          rel="noreferrer"
        >
          Hubungi lewat GitHub <span aria-hidden="true">↗</span>
        </a>
        <p className="mi-contact-note">
          GitHub adalah kanal publik yang tersedia saat ini. Email profesional
          dan profil LinkedIn belum dicantumkan.
        </p>
      </section>
    </PageFrame>
  );
}
