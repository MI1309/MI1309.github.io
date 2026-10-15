import { projects } from "./data/projects";
export const dynamic = "force-static";
export default function sitemap() {
  const pages = [
    {
      url: "https://mi1309.github.io/",
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: "https://mi1309.github.io/archive/",
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: "https://mi1309.github.io/projects/",
      changeFrequency: "monthly",
      priority: 0.8,
    },
    ...["about", "contact", "security-lab"].map((page) => ({
      url: `https://mi1309.github.io/${page}/`,
      changeFrequency: "yearly",
      priority: 0.5,
    })),
    ...projects.map((project) => ({
      url: `https://mi1309.github.io/projects/${project.slug}/`,
      changeFrequency: "monthly",
      priority: 0.7,
    })),
  ];
  return pages;
}
