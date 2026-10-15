import Image from "next/image";
import Link from "next/link";
import { RoleCycler } from "./role-cycler";

const navigationItems = [
  { id: "about", label: "About" },
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Projects" },
];

export function SiteSidebar({ section }) {
  return (
    <aside className="sidebar" aria-label="Profil MI1309">
      <div className="sidebar-inner">
        <div className="sidebar-header">
          {section === "home" ? (
            <h1 className="hero-name">
              <Link href="/" aria-label="MI1309, Beranda">MI1309</Link>
            </h1>
          ) : (
            <Link
              className="hero-name"
              href="/"
              aria-label="MI1309, Beranda"
            >
              MI1309
            </Link>
          )}
          <RoleCycler />
          <p className="hero-quote">Build & testing software.</p>
        </div>
        <nav className="side-nav mi-nav" aria-label="Navigasi utama">
          {navigationItems.map((item) => {
            const href = section === "home" ? `#${item.id}` : `/#${item.id}`;
            const activeSection = section === "project-detail" ? "projects" : section;
            const isActive = activeSection === item.id;

            return (
              <Link
                className={`nav-item${isActive ? " active" : ""}`}
                href={href}
                key={item.id}
              >
                <span className="nav-line" aria-hidden="true" />
                <span className="nav-text">{item.label}</span>
              </Link>
            );
          })}
        </nav>
        <div className="sidebar-social">
          <a
            href="https://github.com/mi1309"
            target="_blank"
            rel="noreferrer"
            aria-label="GitHub"
          >
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M12 .8a11.2 11.2 0 0 0-3.54 21.83c.56.1.76-.24.76-.54v-1.9c-3.1.67-3.76-1.31-3.76-1.31-.5-1.28-1.24-1.62-1.24-1.62-1.01-.69.08-.68.08-.68 1.12.08 1.72 1.15 1.72 1.15 1 .1.67 2.08 3.26.84.1-.72.4-1.22.72-1.5-2.48-.28-5.08-1.24-5.08-5.52 0-1.22.44-2.22 1.16-3-.12-.29-.5-1.44.11-3 0 0 .94-.3 3.08 1.14a10.7 10.7 0 0 1 5.6 0c2.14-1.44 3.08-1.14 3.08-1.14.61 1.56.23 2.71.11 3 .72.78 1.16 1.78 1.16 3 0 4.29-2.6 5.23-5.09 5.51.4.35.76 1.03.76 2.08v3.08c0 .3.2.65.77.54A11.2 11.2 0 0 0 12 .8Z" />
            </svg>
          </a>
        </div>
      </div>
    </aside>
  );
}
export function SiteFooter() {
  return (
    <footer className="mi-footer">
      <span>MI1309 · Build. Learn. Secure.</span>
      <span>© {new Date().getFullYear()} Muhammad Imron</span>
    </footer>
  );
}
export function ProjectCard({ project }) {
  return (
    <article className="mi-project-card">
      <Link
        className="mi-project-visual"
        href={`/projects/${project.slug}/`}
        aria-label={`Buka studi kasus ${project.name}`}
      >
        <Image
          src="/images/jbook-logo.jpg"
          alt="Logo aplikasi JBook"
          width={1024}
          height={1024}
        />
      </Link>
      <div className="mi-project-content">
        <div className="mi-project-card-top">
          <span className="mi-index">
            {project.slug === "jbook" ? "01" : "02"}
          </span>
          <span
            className={`mi-status mi-status-${project.status.toLowerCase().replaceAll(" ", "-")}`}
          >
            {project.status}
          </span>
        </div>
        <div>
          <p className="mi-kicker">Featured project</p>
          <h3>
            <Link href={`/projects/${project.slug}/`}>{project.name}</Link>
          </h3>
          <p className="mi-project-summary">{project.summary}</p>
        </div>
        <ul className="mi-tech-list" aria-label={`Teknologi ${project.name}`}>
          {project.technologies.slice(0, 5).map((technology) => (
            <li key={technology}>{technology}</li>
          ))}
        </ul>
        <Link className="mi-text-link" href={`/projects/${project.slug}/`}>
          Baca studi kasus <span aria-hidden="true">↗</span>
        </Link>
      </div>
    </article>
  );
}
export function PageFrame({ children, section }) {
  return (
    <div className="mi-site layout">
      <SiteSidebar section={section} />
      <div className="mi-content-column">
        <main className="mi-main content" data-section={section}>
          {children}
        </main>
        <SiteFooter />
      </div>
    </div>
  );
}
