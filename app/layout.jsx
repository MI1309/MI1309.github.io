import "../css/style.css";
import "../css/portfolio.css";
const siteUrl = "https://mi1309.github.io";
export const metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: "Portofolio MI1309 | Muhammad Imron", template: "%s | MI1309" },
  description:
    "Portofolio Muhammad Imron: pengembangan aplikasi web, pembelajaran keamanan siber, dan proyek JBook.",
  applicationName: "Portofolio MI1309",
  authors: [{ name: "Muhammad Imron", url: siteUrl }],
  creator: "Muhammad Imron",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "id_ID",
    url: siteUrl,
    siteName: "MI1309",
    title: "Portofolio MI1309 | Muhammad Imron",
    description:
      "Pengembangan web, pembelajaran keamanan siber, dan proyek JBook.",
  },
  twitter: {
    card: "summary",
    title: "Portofolio MI1309 | Muhammad Imron",
    description: "Pengembangan web dan pembelajaran keamanan siber.",
    images: ["/opengraph-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  icons: {
    icon: "/favicon.svg",
  },
};
export default function RootLayout({ children }) {
  return (
    <html lang="id" data-scroll-behavior="smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;500;600&family=Inter:wght@400;500;600;700;800&family=Orbitron:wght@500;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="portfolio-body">{children}</body>
    </html>
  );
}
