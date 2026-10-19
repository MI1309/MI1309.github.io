import "../css/style.css";
import "../css/portfolio.css";
const siteUrl = "https://mi1309.github.io";
export const metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Muhammad Imron | JLPT N5/N4, Bahasa Jepang, dan Web Developer",
    template: "%s | MI1309",
  },
  description:
    "Muhammad Imron adalah web developer, praktisi keamanan siber, dan pembelajar bahasa Jepang dengan sertifikat JLPT N5 dan N4. Cocok untuk pencarian latihan soal JLPT, pembelajaran bahasa Jepang tingkat awal, dan portofolio pengembangan web.",
  keywords: [
    "Muhammad Imron",
    "bahasa Jepang pemula",
    "pengajar bahasa Jepang",
    "JLPT N5",
    "JLPT N4",
    "latihan soal JLPT",
    "soal JLPT N5",
    "soal JLPT N4",
    "belajar bahasa Jepang",
    "JBook",
    "web developer",
    "keamanan siber",
    "portofolio programmer",
    "ready to hire web developer",
    "ready to hire translator pemula bahasa Jepang",
  ],
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
    title: "Muhammad Imron | JLPT N5/N4, Bahasa Jepang, dan Web Developer",
    description:
      "Portofolio Muhammad Imron: pembelajar bahasa Jepang, sertifikat JLPT N5/N4, latihan soal JLPT, dan pengembangan web.",
  },
  twitter: {
    card: "summary",
    title: "Muhammad Imron | JLPT N5/N4, Bahasa Jepang, dan Web Developer",
    description:
      "Belajar bahasa Jepang, JLPT N5/N4, latihan soal JLPT, dan proyek web development.",
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
