import Link from "next/link";
import { notFound } from "next/navigation";
import { PageFrame } from "../../components/site-chrome";
import { getProjectBySlug, projects } from "../../data/projects";
export const dynamicParams = false;
export function generateStaticParams() {
  return projects.map(({ slug }) => ({ slug }));
}
export async function generateMetadata({ params }) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) return { title: "Proyek tidak ditemukan" };
  return {
    title: project.name,
    description: project.summary,
    alternates: { canonical: `/projects/${project.slug}/` },
    openGraph: {
      title: `${project.name} | MI1309`,
      description: project.summary,
      url: `/projects/${project.slug}/`,
    },
  };
}
export default async function ProjectDetailPage({ params }) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) notFound();
  return (
    <PageFrame section="project-detail">
      <Link className="mi-back-link" href="/projects/">
        ← Semua proyek
      </Link>
      <header className="mi-page-intro mi-project-intro">
        <div className="mi-project-card-top">
          <p className="mi-kicker">Studi kasus · Pembelajaran bahasa Jepang</p>
          <span
            className={`mi-status mi-status-${project.status.toLowerCase().replaceAll(" ", "-")}`}
          >
            {project.status === "In Progress"
              ? "Sedang dikerjakan"
              : project.status}
          </span>
        </div>
        <h1 className="mi-page-title">{project.name}</h1>
        <p>{project.summary}</p>
        <div className="mi-link-row">
          <a
            className="mi-button mi-button-primary"
            href={project.repository}
            target="_blank"
            rel="noreferrer"
          >
            Buka repositori <span aria-hidden="true">↗</span>
          </a>
          {project.demo ? (
            <a
              className="mi-button mi-button-quiet"
              href={project.demo}
              target="_blank"
              rel="noreferrer"
            >
              Pratinjau <span aria-hidden="true">↗</span>
            </a>
          ) : null}
        </div>
      </header>

      <div className="mi-detail-grid">
        <section className="mi-detail-section" aria-labelledby="problem-title">
          <p className="mi-kicker">01 · Konteks</p>
          <h2 id="problem-title">Masalah &amp; tujuan</h2>
          <p>{project.problem}</p>
          <p>{project.goal}</p>
        </section>
        <section className="mi-detail-section" aria-labelledby="role-title">
          <p className="mi-kicker">02 · Kontribusi</p>
          <h2 id="role-title">Peran</h2>
          <p>{project.role}</p>
        </section>
        <section
          className="mi-detail-section"
          aria-labelledby="architecture-title"
        >
          <p className="mi-kicker">03 · Sistem</p>
          <h2 id="architecture-title">Arsitektur &amp; teknologi</h2>
          <ul className="mi-detail-list">
            {project.architecture.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <ul className="mi-tech-list mi-detail-tech" aria-label="Teknologi">
            {project.technologies.map((technology) => (
              <li key={technology}>{technology}</li>
            ))}
          </ul>
        </section>
        <section className="mi-detail-section" aria-labelledby="features-title">
          <p className="mi-kicker">04 · Inventaris kode sumber</p>
          <h2 id="features-title">Fitur yang tercatat</h2>
          <ul className="mi-detail-list">
            {project.features.map((feature) => (
              <li key={feature}>{feature}</li>
            ))}
          </ul>
        </section>
        <section
          className="mi-detail-section"
          aria-labelledby="challenges-title"
        >
          <p className="mi-kicker">05 · Rekayasa</p>
          <h2 id="challenges-title">Tantangan teknis</h2>
          <p>{project.challenges}</p>
        </section>
        <section
          className="mi-detail-section"
          aria-labelledby="decisions-title"
        >
          <p className="mi-kicker">06 · Pertimbangan desain</p>
          <h2 id="decisions-title">Keputusan desain</h2>
          <ul className="mi-detail-list">
            {project.decisions.map((decision) => (
              <li key={decision}>{decision}</li>
            ))}
          </ul>
        </section>
        <section className="mi-detail-section" aria-labelledby="outcomes-title">
          <p className="mi-kicker">07 · Bukti</p>
          <h2 id="outcomes-title">Hasil yang dapat diverifikasi</h2>
          <ul className="mi-detail-list">
            {project.outcomes.map((outcome) => (
              <li key={outcome}>{outcome}</li>
            ))}
          </ul>
          <p className="mi-evidence-note">{project.evidenceNote}</p>
          <div className="mi-source-links" aria-label="Sumber proyek">
            <a
              href={`${project.repository}/blob/master/README.md`}
              target="_blank"
              rel="noreferrer"
            >
              README JBook ↗
            </a>
            <a
              href={`${project.repository}/blob/master/docs/fitur-aplikasi.md`}
              target="_blank"
              rel="noreferrer"
            >
              Inventaris fitur ↗
            </a>
          </div>
        </section>
        <section className="mi-detail-section" aria-labelledby="next-title">
          <p className="mi-kicker">08 · Selanjutnya</p>
          <h2 id="next-title">Rencana berikutnya</h2>
          <ul className="mi-detail-list">
            {project.nextSteps.map((step) => (
              <li key={step}>{step}</li>
            ))}
          </ul>
        </section>
      </div>
    </PageFrame>
  );
}
