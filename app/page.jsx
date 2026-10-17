import Link from "next/link";
import { PageFrame, ProjectCard } from "./components/site-chrome";
import { projects } from "./data/projects";
import resume from "../data/resume.json";
export default function HomePage() {
  return (
    <PageFrame section="home">
      <section
        id="about"
        className="content-section mi-home-about"
        aria-labelledby="about-title"
      >
        <div className="section-heading">
          <h2 id="about-title">Tentang</h2>
        </div>
        <p>
          Halo, saya Muhammad Imron. Saya berlatar Rekayasa Perangkat Lunak
          (RPL) dan tertarik pada pengembangan web serta keamanan siber. Saya
          senang membangun aplikasi web yang mudah digunakan, terstruktur, dan
          memperhatikan keamanan.
        </p>
        <p>
          Saya mengembangkan kemampuan melalui proyek web, perlombaan
          keamanan siber, praktik Linux dan penguatan keamanan, serta latihan CTF di
          lingkungan yang legal dan berizin. Saya berfokus pada proses belajar
          dan mendokumentasikan langkah, kendala, solusi, serta pembelajaran
          yang dapat ditinjau dan dipelajari kembali.
        </p>
        <p>
          Di luar itu, saya belajar bahasa Jepang dan memiliki sertifikat JLPT
          N5 dan N4. JBook adalah proyek pembelajaran bahasa Jepang yang saya
          tampilkan sebagai studi kasus berdasarkan dokumentasi repositori
          proyek.
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
          <h2 id="experience-title">Pengalaman</h2>
        </div>
        <div className="mi-experience-list">
          <article className="mi-experience-item">
            <div className="mi-experience-meta">YYYY — YYYY</div>
            <div className="mi-experience-body">
              <a href="#"><h3>Pengembangan web</h3></a>
              <ul>
                <li>
                  Mengembangkan aplikasi web melalui proyek yang dapat ditinjau pada repositori JBook.
                </li>
                <li>
                  JBook menjadi studi kasus utama, detail implementasi yang
                  terverifikasi tersedia di halaman proyek.
                </li>
              </ul>
            </div>
          </article>
          <article className="mi-experience-item">
            <div className="mi-experience-meta">2025</div>
            <div className="mi-experience-body">
              <h3>Keamanan siber</h3>
              <ul>
                <li>
                  Berlatih CTF dan meraih juara 2 LKS keamanan siber Sidoarjo.
                </li>
              </ul>
            </div>
          </article>
          <article className="mi-experience-item">
            <div className="mi-experience-meta">2025 — 2026</div>
            <div className="mi-experience-body">
              <h3>Pembelajaran bahasa Jepang</h3>
              <ul>
                <li>
                  Belajar bahasa Jepang dan memiliki sertifikat JLPT N5 dan N4.
                </li>
              </ul>
            </div>
          </article>
          <article className="mi-experience-item">
            <div className="mi-experience-meta">2023 — 2026</div>
            <div className="mi-experience-body">
              <h3>SMK Antartika 2</h3>
              <ul>
                <li>
                  Lulusan Rekayasa Perangkat Lunak (RPL) dengan fokus pada pengembangan web dan keamanan.
                </li>
              </ul>
            </div>
          </article>
        </div>
        {resume.available ? (
          <a className="mi-text-link" href="/resume.pdf" target="_blank" rel="noreferrer">
            Lihat resume <span aria-hidden="true">↗</span>
          </a>
        ) : null}
      </section>

      <section
        id="projects"
        className="content-section mi-home-projects"
        aria-labelledby="projects-title"
      >
        <div className="section-heading">
          <h2 id="projects-title">Proyek</h2>
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
