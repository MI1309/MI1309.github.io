import Image from "next/image";
import Link from "next/link";
import { RoleCycler } from "./role-cycler";
import ScrollEffects from "../scroll-effects";

const navigationItems = [
  { id: "about", label: "About", href: "/about/", homeHref: "#about" },
  {
    id: "experience",
    label: "Experience",
    href: "/#experience",
    homeHref: "#experience",
  },
  {
    id: "projects",
    label: "Projects",
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
          <p className="hero-quote">Build & testing software.</p>
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
          <span className="social-mark" role="img" aria-label="LinkedIn" title="LinkedIn">
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M20.45 20.45h-3.55v-5.56c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.66H9.36V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12ZM7.12 20.45H3.56V9h3.56v11.45ZM22.23 0H1.77C.79 0 0 .77 0 1.72v20.56C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.72V1.72C24 .77 23.2 0 22.23 0Z" />
            </svg>
          </span>
          <span className="social-mark" role="img" aria-label="Instagram" title="Instagram">
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M7.5 2.75h9A4.75 4.75 0 0 1 21.25 7.5v9a4.75 4.75 0 0 1-4.75 4.75h-9A4.75 4.75 0 0 1 2.75 16.5v-9A4.75 4.75 0 0 1 7.5 2.75Z" fill="none" stroke="currentColor" strokeWidth="2" />
              <circle cx="12" cy="12" r="4" fill="none" stroke="currentColor" strokeWidth="2" />
              <circle cx="17.6" cy="6.6" r="1.2" />
            </svg>
          </span>
          <span className="social-mark" role="img" aria-label="WhatsApp" title="WhatsApp">
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M20.5 3.5A11.8 11.8 0 0 0 12.1 0C5.6 0 .3 5.3.3 11.8c0 2.1.6 4.1 1.6 5.9L.2 24l6.4-1.7a11.8 11.8 0 0 0 5.5 1.4h.1c6.5 0 11.8-5.3 11.8-11.8 0-3.2-1.2-6.1-3.5-8.4ZM12.2 21.7a9.9 9.9 0 0 1-5-1.4l-.4-.2-3.8 1 1-3.7-.2-.4a9.8 9.8 0 0 1-1.5-5.2c0-5.4 4.4-9.8 9.9-9.8 2.6 0 5.1 1 6.9 2.9a9.7 9.7 0 0 1 2.9 6.9c0 5.5-4.4 9.9-9.8 9.9Zm5.4-7.4c-.3-.2-1.7-.9-2-1-.3-.1-.5-.2-.7.2-.2.3-.8 1-1 1.2-.2.2-.4.2-.7.1-.3-.2-1.2-.4-2.3-1.4-.9-.8-1.5-1.7-1.7-2-.2-.3 0-.5.1-.6l.5-.6.3-.5c.1-.2 0-.4 0-.6-.1-.2-.7-1.6-.9-2.1-.2-.6-.5-.5-.7-.5h-.6c-.2 0-.6.1-.9.4-.3.3-1.2 1.1-1.2 2.6s1.2 3 1.4 3.2c.2.2 2.3 3.5 5.5 4.8.8.3 1.4.5 1.8.6.8.2 1.5.2 2.1.1.6-.1 1.7-.7 2-1.4.2-.7.2-1.3.2-1.4-.1-.3-.3-.4-.6-.5Z" />
            </svg>
          </span>
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
