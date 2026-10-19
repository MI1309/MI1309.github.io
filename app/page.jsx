import Link from "next/link";
import { PageFrame, ProjectCard } from "./components/site-chrome";
import ResumeLink from "./components/resume-link";
import { projects } from "./data/projects";
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
          Di luar itu, saya aktif mempelajari bahasa Jepang untuk pemula dan
          memiliki sertifikat JLPT N5 dan N4. Saya juga menyiapkan materi dan
          latihan soal JLPT untuk membantu proses belajar yang lebih terarah,
          terutama untuk level awal hingga menengah. JBook adalah proyek
          pembelajaran bahasa Jepang yang saya tampilkan sebagai studi kasus
          berdasarkan dokumentasi repositori proyek.
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
            <div className="mi-experience-meta">2025 — 2026</div>
            <div className="mi-experience-body">
              <h3>Pembelajaran bahasa Jepang &amp; JLPT</h3>
              <ul>
                <li>
                  Belajar bahasa Jepang dan memperoleh sertifikat JLPT N5 dan N4, serta menyiapkan latihan soal dan materi pembelajaran untuk pemula.
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
            <div className="mi-experience-meta">2025</div>
            <div className="mi-experience-body">
              <a href="https://github.com/MI1309/lsp_distrozone" target="_blank" rel="noreferrer"><h3>Ujian LSP P1</h3></a>
              <ul>
                <li>
                  Saya mengikuti ujian LSP dan dinyatakan kompeten di bidang Web Development.
                </li>
                <li>
                  Mengembangkan aplikasi web melalui proyek yang dapat ditinjau pada repositori lsp_distrozone.
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
        <ResumeLink />
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
