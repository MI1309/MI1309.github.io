import Image from "next/image";

const projects = [
  {
    name: "Cysec Monitor Dashboard",
    category: "Featured",
    categoryStyle: "tag-accent",
    image: "/images/project-dashboard.svg",
    description:
      "Real-time security monitoring dashboard with threat visualization, SIEM integration, and automated vulnerability tracking for enterprise environments.",
    technologies: ["React", "Node.js", "PostgreSQL", "WebSocket"],
  },
  {
    name: "CommercePro Admin",
    category: "Full Stack",
    categoryStyle: "tag-primary",
    image: "/images/project-web.svg",
    description:
      "Production-grade admin dashboard for multi-vendor e-commerce platform featuring sales analytics, inventory management, and order processing workflows.",
    technologies: ["Next.js", "Prisma", "TailwindCSS", "Stripe API"],
  },
  {
    name: "VulnScan Pro",
    category: "Cyber Security",
    categoryStyle: "tag-secondary",
    image: "/images/project-security.svg",
    description:
      "Automated web application vulnerability scanner with OWASP Top 10 checks, detailed PDF reporting, and CI/CD integration for development pipelines.",
    technologies: ["Python", "FastAPI", "Chromium", "Docker"],
  },
  {
    name: "Landing Page Suite",
    category: "Web Dev",
    categoryStyle: "tag-primary",
    image: "/images/gallery-1.svg",
    description:
      "Collection of production landing pages focused on conversion, page speed, and accessibility.",
    technologies: ["Astro", "GSAP", "SCSS", "Figma"],
  },
  {
    name: "IntelMap OSINT Tool",
    category: "Research",
    categoryStyle: "tag-secondary",
    image: "/images/gallery-2.svg",
    description:
      "Open-source intelligence aggregation platform that correlates public-source data and visualizes threat actor networks.",
    technologies: ["TypeScript", "Elasticsearch", "Mapbox", "Redis"],
  },
];

const experiences = [
  {
    year: "2024 — Present",
    role: "Senior Full Stack Developer",
    company: "Cysec Studio",
    achievements: [
      "Lead development and architecture of secure full-stack web applications.",
      "Conduct code audits and security testing to identify and remediate vulnerabilities.",
      "Build reusable component libraries and design systems for engineering teams.",
      "Mentor junior engineers on secure coding practices and modern JavaScript.",
    ],
  },
  {
    year: "2022 — 2024",
    role: "Security Engineer & Web Developer",
    company: "JbookDev",
    achievements: [
      "Developed and maintained production web apps using Node.js, Express, React, and PostgreSQL.",
      "Implemented authentication, authorization, and encryption for client projects.",
      "Performed vulnerability assessments and security reviews for client web properties.",
      "Established CI/CD pipelines with automated security scanning.",
    ],
  },
  {
    year: "2020 — 2022",
    role: "Freelance Web Developer & Security Researcher",
    company: "Self-employed",
    achievements: [
      "Built websites and landing pages for local businesses and startups across Indonesia.",
      "Participated in bug bounty programs and reported valid security issues.",
      "Created OSINT tooling and reconnaissance scripts for the security community.",
      "Taught workshops on web security and modern JavaScript.",
    ],
  },
];

const profileStructuredData = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Muhammad Imron",
  url: "https://mi1309.github.io/",
  jobTitle: "Cybersecurity & Full-Stack Developer",
  knowsAbout: [
    "Cybersecurity",
    "Full-stack development",
    "Web application security",
    "React",
    "Next.js",
  ],
  sameAs: ["https://github.com/mi1309"],
};

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(profileStructuredData).replace(/</g, "\\u003c"),
        }}
      />
      <div className="page-noise" aria-hidden="true" />
      <div className="bg-orb orb-one" aria-hidden="true" />
      <div className="bg-orb orb-two" aria-hidden="true" />

      <div className="layout">
        <aside className="sidebar" aria-label="Sidebar">
          <div className="sidebar-inner">
            <div className="sidebar-header">
              <h1 className="hero-name">Muhammad Imron</h1>
              <h2 className="hero-role">
                <span id="role-cycler" aria-live="polite">Cyber Security</span>
                <span className="cursor" aria-hidden="true">|</span>
              </h2>
              <p className="hero-quote">Build &amp; Testing Software</p>
            </div>

            <nav className="side-nav" aria-label="Navigasi utama">
              <a href="#about" className="nav-item active"><span className="nav-line" /><span className="nav-text">ABOUT</span></a>
              <a href="#experience" className="nav-item"><span className="nav-line" /><span className="nav-text">EXPERIENCE</span></a>
              <a href="#projects" className="nav-item"><span className="nav-line" /><span className="nav-text">PROJECTS</span></a>
            </nav>

            <div className="sidebar-social" aria-label="Sosial media">
              <a href="https://github.com/mi1309" target="_blank" rel="noreferrer" aria-label="GitHub">
                <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 .5A12 12 0 0 0 8.21 23.4c.6.11.82-.26.82-.58v-2.03c-3.34.73-4.04-1.61-4.04-1.61-.55-1.38-1.33-1.75-1.33-1.75-1.09-.75.08-.73.08-.73 1.2.09 1.83 1.23 1.83 1.23 1.07 1.83 2.8 1.3 3.48.99.11-.77.42-1.3.76-1.6-2.66-.3-5.46-1.33-5.46-5.92 0-1.31.47-2.38 1.23-3.22-.12-.3-.53-1.53.12-3.18 0 0 1-.32 3.3 1.23a11.41 11.41 0 0 1 6 0c2.29-1.55 3.29-1.23 3.29-1.23.65 1.65.24 2.88.12 3.18.77.84 1.23 1.91 1.23 3.22 0 4.6-2.8 5.61-5.47 5.91.43.37.81 1.1.81 2.22v3.29c0 .32.22.7.83.58A12 12 0 0 0 12 .5Z" /></svg>
              </a>
              <a href="https://www.linkedin.com/in/dummy" target="_blank" rel="noreferrer" aria-label="LinkedIn">
                <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6.94 8.5A1.56 1.56 0 1 1 6.94 5.4a1.56 1.56 0 0 1 0 3.1ZM5.5 9.84h2.9v9.66H5.5V9.84Zm4.66 0h2.77v1.32h.04c.39-.73 1.33-1.5 2.75-1.5 2.94 0 3.48 1.93 3.48 4.44v6.4h-2.9v-5.98c0-1.42-.03-3.25-1.98-3.25-1.98 0-2.28 1.55-2.28 3.14v6.09h-2.9V9.84Z" /></svg>
              </a>
              <a href="https://www.instagram.com/imron_dev" target="_blank" rel="noreferrer" aria-label="Instagram">
                <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2.2c3.2 0 3.6 0 4.85.07 1.17.05 1.8.25 2.22.41.56.22.96.48 1.38.9.42.42.68.82.9 1.38.16.42.36 1.05.41 2.22.06 1.26.07 1.65.07 4.85s0 3.6-.07 4.85c-.05 1.17-.25 1.8-.41 2.22a3.7 3.7 0 0 1-.9 1.38 3.7 3.7 0 0 1-1.38.9c-.42.16-1.05.36-2.22.41-1.26.06-1.65.07-4.85.07s-3.6 0-4.85-.07c-1.17-.05-1.8-.25-2.22-.41a3.7 3.7 0 0 1-1.38-.9 3.7 3.7 0 0 1-.9-1.38c-.16-.42-.36-1.05-.41-2.22C2.2 15.6 2.2 15.2 2.2 12s0-3.6.07-4.85c.04-.99.21-1.53.35-1.89.19-.48.41-.81.77-1.17.36-.36.69-.58 1.17-.77.36-.14.9-.31 1.89-.35C8.4 2.2 8.8 2.2 12 2.2Zm0 1.8c-3.15 0-3.51.01-4.75.07-.99.04-1.53.21-1.89.35-.48.19-.81.41-1.17.77-.36.36-.58.69-.77 1.17-.14.36-.31.9-.35 1.89C3.01 8.49 3 8.85 3 12s.01 3.51.07 4.75c.04.99.21 1.53.35 1.89.19.48.41.81.77 1.17.36.36.69.58 1.17.77.36.14.9.31 1.89.35 1.24.06 1.6.07 4.75.07s3.51-.01 4.75-.07c.99-.04 1.53-.21 1.89-.35.48-.19.81-.41 1.17-.77.36-.36.58-.69.77-1.17.14-.36.31-.9.35-1.89.06-1.24.07-1.6.07-4.75s-.01-3.51-.07-4.75c-.04-.99-.21-1.53-.35-1.89a3.08 3.08 0 0 0-.77-1.17 3.08 3.08 0 0 0-1.17-.77c-.36-.14-.9-.31-1.89-.35C15.51 4.01 15.15 4 12 4Zm0 3.07a4.93 4.93 0 1 1 0 9.86 4.93 4.93 0 0 1 0-9.86Zm0 1.8a3.13 3.13 0 1 0 0 6.26 3.13 3.13 0 0 0 0-6.26Zm5.11-2.02a1.15 1.15 0 1 1 0 2.3 1.15 1.15 0 0 1 0-2.3Z" /></svg>
              </a>
              <a href="https://wa.me/6289514366445" target="_blank" rel="noreferrer" aria-label="WhatsApp">
                <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M18.9 5.1A10.9 10.9 0 0 0 12.09 2a10.8 10.8 0 0 0-9.46 16.35L2 22l3.72-1.01A10.8 10.8 0 0 0 12.1 22c5.94 0 10.8-4.8 10.8-10.73 0-2.88-1.12-5.58-3.01-7.56ZM12.1 19.8c-1.55 0-3.08-.42-4.4-1.2l-.32-.18-2.21.6.6-2.15-.2-.34A8.93 8.93 0 0 1 12.09 3.2a8.93 8.93 0 1 1 0 17.86Zm4.94-6.65c-.27-.14-1.6-.79-1.85-.88-.25-.09-.42-.14-.61.14-.18.27-.7.88-.86 1.06-.16.18-.32.2-.59.07-.27-.14-1.15-.42-2.18-1.35-.81-.72-1.35-1.6-1.51-1.87-.16-.27-.02-.42.12-.56.12-.12.27-.32.41-.48.14-.16.18-.27.27-.45.09-.18.04-.34-.02-.48-.06-.14-.61-1.47-.84-2.02-.22-.53-.45-.46-.61-.47h-.52c-.18 0-.48.07-.73.34-.25.27-.95.93-.95 2.27 0 1.34.97 2.62 1.11 2.8.14.18 1.91 2.9 4.62 4.07.65.28 1.15.45 1.54.57.65.21 1.25.18 1.72.11.53-.08 1.6-.65 1.83-1.27.23-.62.23-1.15.16-1.26-.07-.12-.25-.19-.53-.33Z" /></svg>
              </a>
            </div>
          </div>
        </aside>

        <main className="content">
          <section id="about" className="content-section" aria-labelledby="about-heading">
            <h2 id="about-heading" className="sr-only">About</h2>
            <p className="reveal">
              Hi there! I&apos;m Imron, and I like building things. I&apos;m a Cyber Security &amp; Full Stack developer with expertise in crafting accessible, pixel-perfect user interfaces and building secure, scalable applications. I take pride in creating thoughtful, inclusive products and have a sharp eye for the little details that separate a good product from an exceptional one. I enjoy working most at the intersection of security and engineering, where great user experience meets clean, secure code.
            </p>
            <p className="reveal">
              Currently, I&apos;m focused on building robust web applications and conducting security assessments to ensure systems are resilient against modern threats. I lead development efforts across full-stack applications, partnering closely with designers and engineers to ensure security is built into the foundation of everything we ship.
            </p>
            <p className="reveal">
              Previously, I&apos;ve worked across a wide range of environments — from product studios to startups and large tech companies. Outside of my day-to-day work, I also research emerging security threats and contribute to open-source security tools.
            </p>
            <a href="https://github.com/mi1309" target="_blank" rel="noreferrer" className="resume-link">View Full Resume</a>
          </section>

          <section id="experience" className="content-section" aria-labelledby="experience-heading">
            <div className="section-heading reveal"><h2 id="experience-heading">Experience</h2></div>
            <div className="experience-list">
              {experiences.map((experience) => (
                <article className="experience-item reveal" key={experience.year}>
                  <div className="experience-meta"><span className="experience-year">{experience.year}</span></div>
                  <div className="experience-body">
                    <h3 className="experience-role">{experience.role}<span className="experience-company"> @ {experience.company}</span></h3>
                    <ul className="experience-bullets">{experience.achievements.map((achievement) => <li key={achievement}>{achievement}</li>)}</ul>
                  </div>
                </article>
              ))}
            </div>
          </section>

          <section id="projects" className="content-section" aria-labelledby="projects-heading">
            <div className="section-heading reveal"><h2 id="projects-heading">Projects</h2></div>
            <div className="project-grid">
              {projects.map((project) => (
                <article className="project-card reveal" key={project.name}>
                  <Image src={project.image} alt={`${project.name} project preview`} width={640} height={420} />
                  <div className="project-body">
                    <span className={`tag ${project.categoryStyle}`}>{project.category}</span>
                    <h3>{project.name}</h3>
                    <p>{project.description}</p>
                    <ul className="project-tech">{project.technologies.map((technology) => <li key={technology}>{technology}</li>)}</ul>
                  </div>
                </article>
              ))}
            </div>
            <a href="/archive/">View Archive</a>
          </section>

          <footer className="footer reveal">
            <p>© {new Date().getFullYear()} Muhammad Imron.</p>
          </footer>
        </main>
      </div>
    </>
  );
}