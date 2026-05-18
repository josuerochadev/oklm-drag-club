import type { Metadata } from "next";
import "./globals.css";
import Nav from "@/components/Nav";
import { SITE_URL, SITE_NAME, SITE_DESCRIPTION } from "@/lib/config";
import { SPOTIFY_URL, APPLE_PODCASTS_URL, DEEZER_URL, AMAZON_SHOW_URL } from "@/lib/platforms";

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
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "PodcastSeries",
    name: SITE_NAME,
    description: SITE_DESCRIPTION,
    url: SITE_URL,
    inLanguage: "fr",
    author: { "@type": "Person", name: "Romain" },
    offers: [
      { "@type": "Offer", url: SPOTIFY_URL },
      { "@type": "Offer", url: APPLE_PODCASTS_URL },
      { "@type": "Offer", url: DEEZER_URL },
    ],
  };

  return (
    <html lang="fr" className="h-full">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-full flex flex-col">
        <Nav />
        <main className="flex-1">{children}</main>

        <footer
          style={{
            background: "var(--forest)",
            borderTop: "var(--border-base)",
            padding: "48px 32px 28px",
          }}
        >
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "2fr 1fr 1fr",
              gap: "32px",
              maxWidth: "1200px",
              margin: "0 auto 32px",
            }}
          >
            {/* Logo + tagline */}
            <div>
              <div
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "2rem",
                  color: "var(--lime)",
                  letterSpacing: "-0.04em",
                  lineHeight: 1,
                  marginBottom: "12px",
                }}
              >
                OKLM
              </div>
              <p
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "13px",
                  color: "rgba(255,255,255,0.55)",
                  lineHeight: 1.65,
                  maxWidth: "260px",
                }}
              >
                Sans hurler dans vos oreilles. Un podcast drag par Romain — réactions calmes, analyses bienveillantes.
              </p>
            </div>

            {/* Navigation */}
            <div>
              <p
                className="section-label"
                style={{ color: "rgba(255,255,255,0.45)", marginBottom: "14px" }}
              >
                Navigation
              </p>
              {[
                { label: "Épisodes", href: "/episodes" },
                { label: "À propos", href: "/about" },
              ].map(({ label, href }) => (
                <a
                  key={label}
                  href={href}
                  style={{
                    display: "block",
                    fontFamily: "var(--font-body)",
                    fontSize: "13px",
                    color: "rgba(255,255,255,0.70)",
                    marginBottom: "9px",
                    textDecoration: "none",
                  }}
                >
                  {label}
                </a>
              ))}
            </div>

            {/* Écouter */}
            <div>
              <p
                className="section-label"
                style={{ color: "rgba(255,255,255,0.45)", marginBottom: "14px" }}
              >
                Écouter
              </p>
              {[
                { label: "Spotify", href: SPOTIFY_URL },
                { label: "Apple Podcasts", href: APPLE_PODCASTS_URL },
                { label: "Deezer", href: DEEZER_URL },
                { label: "Amazon Music", href: AMAZON_SHOW_URL },
              ].map(({ label, href }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: "block",
                    fontFamily: "var(--font-body)",
                    fontSize: "13px",
                    color: "rgba(255,255,255,0.70)",
                    marginBottom: "9px",
                    textDecoration: "none",
                  }}
                >
                  {label}
                </a>
              ))}
            </div>
          </div>

          <div
            style={{
              height: "1px",
              background: "rgba(255,255,255,0.12)",
              maxWidth: "1200px",
              margin: "0 auto 20px",
            }}
          />

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              maxWidth: "1200px",
              margin: "0 auto",
              fontFamily: "var(--font-body)",
              fontSize: "11px",
              color: "rgba(255,255,255,0.35)",
            }}
          >
            <span>© {new Date().getFullYear()} OKLM Drag Club</span>
            <span>Fait avec douceur</span>
          </div>
        </footer>
      </body>
    </html>
  );
}
