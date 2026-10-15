import type { Metadata } from "next";
import archive from "../../data/archive.json";

type ArchiveProject = {
  title: string;
  description?: string;
  date?: string;
  year?: number | string;
  technologies?: string[];
  url?: string;
};

const projects = archive as ArchiveProject[];

export const metadata: Metadata = {
  title: "Project Archive",
  description:
    "Arsip proyek, eksperimen, dan tulisan Muhammad Imron tentang pengembangan web dan keamanan siber.",
  alternates: {
    canonical: "/archive/",
  },
  openGraph: {
    title: "Project Archive | Muhammad Imron",
    description:
      "Arsip proyek, eksperimen, dan tulisan Muhammad Imron tentang pengembangan web dan keamanan siber.",
    url: "/archive/",
  },
};

function getYear(project: ArchiveProject) {
  if (project.year) return project.year;
  if (project.date) return new Date(project.date).getUTCFullYear();
  return "—";
}

function getTechnologies(project: ArchiveProject) {
  if (project.technologies?.length) return project.technologies;
  return [project.title.startsWith("Blog") ? "Article" : "Project"];
}

function getLinkLabel(url: string) {
  try {
    return new URL(url).hostname.replace(/^www\./, "");
  } catch {
    return url;
  }
}

export default function ArchivePage() {
  return (
    <main className="archive-page">
      <a className="back-link" href="/" aria-label="Kembali ke halaman utama">
        ← Muhammad Imron
      </a>
      <h1>All Projects</h1>
      <div className="table-wrap">
        <table>
          <thead>
            <tr>
              <th scope="col">Year</th>
              <th scope="col">Project</th>
              <th scope="col">Built with</th>
              <th scope="col">Link</th>
            </tr>
          </thead>
          <tbody>
            {projects.map((project) => (
              <tr key={project.title}>
                <td>
                  {project.date ? (
                    <time dateTime={project.date}>{getYear(project)}</time>
                  ) : (
                    getYear(project)
                  )}
                </td>
                <td>
                  <h2 className="project-title">{project.title}</h2>
                  <p className="project-description">{project.description}</p>
                </td>
                <td>
                  <div className="tags">
                    {getTechnologies(project).map((technology) => (
                      <span className="tag" key={technology}>{technology}</span>
                    ))}
                  </div>
                </td>
                <td>
                  {project.url ? (
                    <a className="project-link" href={project.url} target="_blank" rel="noreferrer">
                      {getLinkLabel(project.url)} ↗
                    </a>
                  ) : (
                    "—"
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
}