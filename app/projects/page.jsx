import Link from "next/link";
import { PageFrame } from "../components/site-chrome";
import archive from "../../data/archive.json";
import { getProjectBySlug } from "../data/projects";

export const metadata = {
  title: "Projects",
  description:
    "Proyek pengembangan web dan pembelajaran keamanan aplikasi oleh MI1309.",
  alternates: { canonical: "/projects/" },
};

function getArchiveYear(item) {
  if (item.year) return item.year;
  if (!item.date) return "—";

  const date = new Date(item.date);
  return Number.isNaN(date.getTime()) ? "—" : date.getUTCFullYear();
}

function getLinkLabel(url) {
  if (!url) return "—";
  try {
    return new URL(url).hostname.replace(/^www\./, "");
  } catch {
    return url;
  }
}

const allProjects = archive.map((item, index) => {
  const caseStudy = item.slug ? getProjectBySlug(item.slug) : null;

  return {
    key: item.id || `${item.title}-${index}`,
    year: getArchiveYear(item),
    title: item.title,
    description: item.description,
    madeAt: item.madeAt || item.company || "—",
    technologies:
      item.technologies?.length
        ? item.technologies
        : [item.title.startsWith("Blog") ? "Article" : "Project"],
    detailUrl: caseStudy ? `/projects/${caseStudy.slug}/` : null,
    url: item.url,
  };
});

export default function ProjectsPage() {
  return (
    <PageFrame section="projects">
      <div className="mi-archive-page mi-all-projects">
        <header className="mi-page-intro">
          <Link className="mi-projects-back" href="/">
            <span aria-hidden="true">←</span> MI1309
          </Link>
          <h1 className="mi-page-title">All Projects</h1>
        </header>
        <div className="mi-archive-table-wrap">
          {allProjects.length ? (
            <table className="mi-archive-table">
              <thead>
                <tr>
                  <th scope="col">Year</th>
                  <th scope="col">Project</th>
                  <th scope="col">Made at</th>
                  <th scope="col">Built with</th>
                  <th scope="col">Link</th>
                </tr>
              </thead>
              <tbody>
                {allProjects.map((project) => (
                  <tr key={project.key}>
                    <td>{project.year}</td>
                    <td>
                      {project.detailUrl ? (
                        <a
                          className="mi-archive-title-link"
                          href={project.detailUrl}
                        >
                          {project.title}
                        </a>
                      ) : (
                        <h2 className="mi-archive-title">{project.title}</h2>
                      )}
                      {project.description ? (
                        <p className="mi-archive-description">
                          {project.description}
                        </p>
                      ) : null}
                    </td>
                    <td>{project.madeAt}</td>
                    <td>
                      <div className="tags">
                        {project.technologies?.map((technology) => (
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
          ) : (
            <p className="mi-empty">Belum ada proyek yang dipublikasikan.</p>
          )}
        </div>
      </div>
    </PageFrame>
  );
}
