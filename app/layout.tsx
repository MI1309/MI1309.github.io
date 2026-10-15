import type { Metadata } from "next";
import "../css/style.css";
import ScrollEffects from "./scroll-effects";

const siteUrl = "https://mi1309.github.io";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Muhammad Imron | Cybersecurity & Full-Stack Developer",
    template: "%s | Muhammad Imron",
  },
  description:
    "Portfolio Muhammad Imron, developer yang berfokus pada keamanan siber, pengembangan full-stack, dan aplikasi web yang aman.",
  applicationName: "Portfolio Muhammad Imron",
  authors: [{ name: "Muhammad Imron", url: siteUrl }],
  creator: "Muhammad Imron",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "id_ID",
    url: siteUrl,
    siteName: "Portfolio Muhammad Imron",
    title: "Muhammad Imron | Cybersecurity & Full-Stack Developer",
    description:
      "Portfolio Muhammad Imron, developer yang berfokus pada keamanan siber, pengembangan full-stack, dan aplikasi web yang aman.",
  },
  twitter: {
    card: "summary",
    title: "Muhammad Imron | Cybersecurity & Full-Stack Developer",
    description:
      "Portfolio Muhammad Imron, developer yang berfokus pada keamanan siber dan pengembangan full-stack.",
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
    icon: "/images/profile-portrait.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=Orbitron:wght@500;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        {children}
        <ScrollEffects />
      </body>
    </html>
  );
}