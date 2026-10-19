import Image from "next/image";
import Link from "next/link";
import { RoleCycler } from "./role-cycler";
import ScrollEffects from "../scroll-effects";

const navigationItems = [
  { id: "about", label: "Tentang", href: "/about/", homeHref: "#about" },
  {
    id: "experience",
    label: "Pengalaman",
    href: "/#experience",
    homeHref: "#experience",
  },
  {
    id: "projects",
    label: "Proyek",
    href: "/projects/",
    homeHref: "#projects",
  },
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
          <p className="hero-quote">Membangun & menguji perangkat lunak.</p>
        </div>
        <nav className="side-nav mi-nav" aria-label="Navigasi utama">
          {navigationItems.map((item) => {
            const activeSection = section === "project-detail" ? "projects" : section;
            const isActive =
              activeSection === item.id ||
              (section === "home" && item.id === "about");
            const href = section === "home" && item.homeHref ? item.homeHref : item.href;
            const ariaCurrent = section === "home" ? "location" : "page";

            return (
              <Link
                className={`nav-item${isActive ? " active" : ""}`}
                data-section-target={item.homeHref ? item.id : undefined}
                aria-current={isActive ? ariaCurrent : undefined}
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
          <a
            href="https://medium.com"
            target="_blank"
            rel="noreferrer"
            aria-label="Medium"
            title="Medium"
          >
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M7.75 6.5a1.25 1.25 0 0 1 1.24-1.25h7.02c.68 0 1.23.57 1.23 1.25v11a1.25 1.25 0 0 1-1.23 1.25H8.99A1.25 1.25 0 0 1 7.75 17.5v-11Zm-4.5 1.5a1 1 0 0 1 1-1h1.25a1 1 0 0 1 1 1v8.5a1 1 0 0 1-1 1H4.25a1 1 0 0 1-1-1v-8.5Zm15.5 0a1 1 0 0 1 1-1h1.25a1 1 0 0 1 1 1V18a1 1 0 0 1-1 1h-1.25a1 1 0 0 1-1-1v-10Zm-7 7.25h2.5v-1.5h-2.5v1.5Z" />
            </svg>
          </a>
          <span className="social-mark" role="img" aria-label="Instagram" title="Instagram">
            <a
            href="https://www.instagram.com/imron_mi1309"
            target="_blank"
            rel="noreferrer"
            aria-label="Instagram"
          >
             <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M7.5 2.75h9A4.75 4.75 0 0 1 21.25 7.5v9a4.75 4.75 0 0 1-4.75 4.75h-9A4.75 4.75 0 0 1 2.75 16.5v-9A4.75 4.75 0 0 1 7.5 2.75Z" fill="none" stroke="currentColor" strokeWidth="2" />
              <circle cx="12" cy="12" r="4" fill="none" stroke="currentColor" strokeWidth="2" />
              <circle cx="17.6" cy="6.6" r="1.2" />
            </svg>
          </a>
          </span>
          <span className="social-mark" role="img" aria-label="WhatsApp" title="WhatsApp">
            <a
            href="https://wa.me/6289514366445"
            target="_blank"
            rel="noreferrer"
            aria-label="WhatsApp"
          >
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M20.5 3.5A11.8 11.8 0 0 0 12.1 0C5.6 0 .3 5.3.3 11.8c0 2.1.6 4.1 1.6 5.9L.2 24l6.4-1.7a11.8 11.8 0 0 0 5.5 1.4h.1c6.5 0 11.8-5.3 11.8-11.8 0-3.2-1.2-6.1-3.5-8.4ZM12.2 21.7a9.9 9.9 0 0 1-5-1.4l-.4-.2-3.8 1 1-3.7-.2-.4a9.8 9.8 0 0 1-1.5-5.2c0-5.4 4.4-9.8 9.9-9.8 2.6 0 5.1 1 6.9 2.9a9.7 9.7 0 0 1 2.9 6.9c0 5.5-4.4 9.9-9.8 9.9Zm5.4-7.4c-.3-.2-1.7-.9-2-1-.3-.1-.5-.2-.7.2-.2.3-.8 1-1 1.2-.2.2-.4.2-.7.1-.3-.2-1.2-.4-2.3-1.4-.9-.8-1.5-1.7-1.7-2-.2-.3 0-.5.1-.6l.5-.6.3-.5c.1-.2 0-.4 0-.6-.1-.2-.7-1.6-.9-2.1-.2-.6-.5-.5-.7-.5h-.6c-.2 0-.6.1-.9.4-.3.3-1.2 1.1-1.2 2.6s1.2 3 1.4 3.2c.2.2 2.3 3.5 5.5 4.8.8.3 1.4.5 1.8.6.8.2 1.5.2 2.1.1.6-.1 1.7-.7 2-1.4.2-.7.2-1.3.2-1.4-.1-.3-.3-.4-.6-.5Z" />
            </svg>
            </a>
          </span>
        </div>
      </div>
    </aside>
  );
}
export function SiteFooter() {
  return (
    <footer className="mi-footer">
      <span>© {new Date().getFullYear()} Muhammad Imron</span>
    </footer>
  );
}
export function ProjectCard({ project }) {
  return (
    <article className="mi-project-card mi-home-project-item">
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
        <div className="mi-project-row-copy">
          <div className="mi-project-row-title">
            <h3>
              <Link href={`/projects/${project.slug}/`}>{project.name}</Link>
            </h3>
            {project.repository ? (
              <a
                className="mi-project-external"
                href={project.repository}
                target="_blank"
                rel="noreferrer"
                aria-label={`Buka repositori ${project.name}`}
              >
                ↗
              </a>
            ) : null}
          </div>
          <p className="mi-project-summary">{project.summary}</p>
        </div>
        <ul className="mi-tech-list" aria-label={`Teknologi ${project.name}`}>
          {project.technologies.slice(0, 5).map((technology) => (
            <li key={technology}>{technology}</li>
          ))}
        </ul>
      </div>
    </article>
  );
}
export function PageFrame({ children, section }) {
  const isWideProjectsPage = section === "projects";

  return (
    <div className={`mi-site layout${isWideProjectsPage ? " mi-site-wide" : ""}`}>
      {!isWideProjectsPage ? <ScrollEffects /> : null}
      {!isWideProjectsPage ? <SiteSidebar section={section} /> : null}
      <div className="mi-content-column">
        <main className="mi-main content" data-section={section}>
          {children}
        </main>
        <SiteFooter />
      </div>
    </div>
  );
}
