import archive from "../../data/archive.json";
import { PageFrame } from "../components/site-chrome";
const projects = archive;
export const metadata = {
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
function getYear(project) {
  if (project.year) return project.year;
  if (project.date) return new Date(project.date).getUTCFullYear();
  return "—";
}
function getTechnologies(project) {
  return [project.title.startsWith("Blog") ? "Article" : "Project"];
}
function getLinkLabel(url) {
  try {
    return new URL(url).hostname.replace(/^www\./, "");
  } catch {
    return url;
  }
}
export default function ArchivePage() {
  return (
    <PageFrame section="archive">
      <div className="mi-archive-page">
        <header className="mi-page-intro">
          <p className="mi-kicker">Projects &amp; experiments</p>
          <h1 className="mi-page-title">Project Archive</h1>
          <p>Catatan proyek yang dikelola melalui panel admin.</p>
        </header>
        <div className="mi-archive-table-wrap">
          {projects.length === 0 ? (
            <p className="mi-empty">
              Belum ada item arsip yang dipublikasikan.
            </p>
          ) : (
            <table className="mi-archive-table">
              <thead>
                <tr>
                  <th scope="col">Year</th>
                  <th scope="col">Project</th>
                  <th scope="col">Built with</th>
                  <th scope="col">Link</th>
                </tr>
              </thead>
              <tbody>
                {projects.map((project, index) => (
                  <tr key={`${project.title}-${index}`}>
                    <td>
                      {project.date ? (
                        <time dateTime={project.date}>{getYear(project)}</time>
                      ) : (
                        getYear(project)
                      )}
                    </td>
                    <td>
                      <h2 className="mi-archive-title">{project.title}</h2>
                      <p className="mi-archive-description">
                        {project.description}
                      </p>
                    </td>
                    <td>
                      <div className="tags">
                        {getTechnologies(project).map((technology) => (
                          <span className="tag" key={technology}>
                            {technology}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td>
                      {project.url ? (
                        <a
                          className="mi-archive-link"
                          href={project.url}
                          target="_blank"
                          rel="noreferrer"
                        >
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
          )}
        </div>
      </div>
    </PageFrame>
  );
}
