import { PageFrame, ProjectCard } from "../components/site-chrome";
import { projects } from "../data/projects";
export const metadata = {
  title: "Projects",
  description:
    "Proyek pengembangan web dan pembelajaran keamanan aplikasi oleh MI1309.",
  alternates: { canonical: "/projects/" },
};
export default function ProjectsPage() {
  return (
    <PageFrame section="projects">
      <header className="mi-page-intro">
        <p className="mi-kicker">Selected work</p>
        <h1 className="mi-page-title">Projects</h1>
        <p>
          Proyek yang ditampilkan di sini mengacu pada repositori dan
          dokumentasi yang tersedia. Status demo dan fitur production tidak
          diasumsikan.
        </p>
      </header>
      {projects.length ? (
        <div className="mi-project-grid">
          {projects.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
      ) : (
        <p className="mi-empty">Belum ada proyek yang dipublikasikan.</p>
      )}
    </PageFrame>
  );
}
