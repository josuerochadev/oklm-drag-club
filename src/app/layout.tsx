import type { Metadata } from "next";
import { Archivo_Black, Barlow } from "next/font/google";
import "./globals.css";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { SITE_URL, SITE_NAME, SITE_DESCRIPTION } from "@/lib/config";
import { SPOTIFY_URL, APPLE_PODCASTS_URL, DEEZER_URL } from "@/lib/platforms";
import { safeJsonLd } from "@/lib/utils";
import { fetchEpisodes } from "@/lib/rss";

const archivoBlack = Archivo_Black({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

const barlow = Barlow({
  weight: ["400", "500", "600", "700", "800"],
  style: ["normal", "italic"],
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME} — Podcast drag & téléréalité`,
    template: `%s — ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  openGraph: {
    type: "website",
    locale: "fr_FR",
    siteName: SITE_NAME,
    title: `${SITE_NAME} — Podcast drag & téléréalité`,
    description: SITE_DESCRIPTION,
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE_NAME} — Podcast drag & téléréalité`,
    description: SITE_DESCRIPTION,
  },
  alternates: {
    types: {
      "application/rss+xml": `${SITE_URL}/feed.xml`,
    },
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const episodes = await fetchEpisodes().catch(() => []);
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "PodcastSeries",
    name: SITE_NAME,
    description: SITE_DESCRIPTION,
    url: SITE_URL,
    inLanguage: "fr",
    author: { "@type": "Person", name: "Romain" },
    numberOfEpisodes: episodes.length,
    offers: [
      { "@type": "Offer", url: SPOTIFY_URL },
      { "@type": "Offer", url: APPLE_PODCASTS_URL },
      { "@type": "Offer", url: DEEZER_URL },
    ],
    webFeed: `${SITE_URL}/feed.xml`,
  };

  return (
    <html lang="fr" className="h-full">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: safeJsonLd(jsonLd) }}
        />
      </head>
      <body className={`${archivoBlack.variable} ${barlow.variable} min-h-full flex flex-col`}>
        <a href="#main-content" className="skip-link">
          Passer au contenu principal
        </a>
        <Nav />
        <main id="main-content" className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
