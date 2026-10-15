import type { MetadataRoute } from "next";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
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
  ];
}