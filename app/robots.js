export const dynamic = "force-static";
export default function robots() {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: "https://mi1309.github.io/sitemap.xml",
    host: "https://mi1309.github.io",
  };
}
