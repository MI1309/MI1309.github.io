import Link from "next/link";
import { PageFrame, ProjectCard } from "./components/site-chrome";
import { projects } from "./data/projects";
export default function HomePage() {
  return (
    <PageFrame section="home">
      <section
        id="about"
        className="content-section mi-home-about"
        aria-label="About"
      >
        <p>
          Halo, saya Muhammad Imron. Saya berlatar Rekayasa Perangkat Lunak (RPL) dan
          tertarik pada pengembangan web serta cybersecurity. Saya senang
          membangun aplikasi web yang mudah digunakan, terstruktur, dan
          memperhatikan keamanan.
        </p>
        <p>
          Saya mengembangkan kemampuan melalui proyek web, praktik Linux dan
          hardening, serta latihan CTF di lingkungan yang diizinkan. Saya
          berfokus pada proses belajar dan mendokumentasikan hal-hal yang sudah
          dapat diverifikasi.
        </p>
        <p>
          Di luar itu, saya belajar bahasa Jepang dan memiliki sertifikat JLPT
          N4. JBook adalah proyek pembelajaran bahasa Jepang yang saya tampilkan
          sebagai studi kasus berdasarkan dokumentasi repositorinya.
        </p>
        <p className="mi-home-links">
          <Link href="/about/">Profil lengkap</Link>
          <Link href="/contact/">Hubungi saya</Link>
        </p>
      </section>

      <section
        id="experience"
        className="content-section mi-home-experience"
        aria-labelledby="experience-title"
      >
        <div className="section-heading">
          <h2 id="experience-title">Experience</h2>
        </div>
        <div className="mi-experience-list">
          <article className="mi-experience-item">
            <div className="mi-experience-meta">PROJECT WORK</div>
            <div className="mi-experience-body">
              <h3>Web development</h3>
              <ul>
                <li>
                  Mengembangkan aplikasi web melalui proyek dan pembelajaran
                  Rekayasa Perangkat Lunak.
                </li>
                <li>
                  JBook menjadi studi kasus utama; detail implementasi yang
                  terverifikasi tersedia di halaman proyek.
                </li>
              </ul>
            </div>
          </article>
          <article className="mi-experience-item">
            <div className="mi-experience-meta">PRACTICE</div>
            <div className="mi-experience-body">
              <h3>Cybersecurity</h3>
              <ul>
                <li>
                  Berlatih CTF di lingkungan yang diizinkan serta mempelajari
                  Linux dan hardening.
                </li>
              </ul>
            </div>
          </article>
          <article className="mi-experience-item">
            <div className="mi-experience-meta">JLPT N4</div>
            <div className="mi-experience-body">
              <h3>Japanese learning</h3>
              <ul>
                <li>
                  Belajar bahasa Jepang dan memiliki sertifikat JLPT N4.
                </li>
              </ul>
            </div>
          </article>
        </div>
      </section>

      <section
        id="projects"
        className="content-section mi-home-projects"
        aria-labelledby="projects-title"
      >
        <div className="section-heading">
          <h2 id="projects-title">Projects</h2>
        </div>
        <div className="mi-home-project-list">
          {projects.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
        <Link className="mi-text-link" href="/projects/">
          Semua proyek <span aria-hidden="true">↗</span>
        </Link>
      </section>
    </PageFrame>
  );
}
