import type { Metadata } from "next";
import "./globals.css";
import Nav from "@/components/Nav";

export const metadata: Metadata = {
  title: "OKLM Drag Club — Podcast drag & téléréalité",
  description:
    "Réactions calmes et bienveillantes sur la drag et la téléréalité — sans hurler dans vos oreilles. Drag Race France, Dragula, Les Traîtres FR, et plus.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className="h-full">
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

            {/* Émissions */}
            <div>
              <p
                className="section-label"
                style={{ color: "rgba(255,255,255,0.45)", marginBottom: "14px" }}
              >
                Émissions
              </p>
              {["Drag Race France", "Dragula", "Les Traîtres FR", "Ultime Drag ASMR", "Fan Fiction"].map((l) => (
                <p
                  key={l}
                  style={{
                    fontFamily: "var(--font-body)",
                    fontSize: "13px",
                    color: "rgba(255,255,255,0.70)",
                    marginBottom: "9px",
                  }}
                >
                  {l}
                </p>
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
                { label: "Spotify", href: "https://open.spotify.com/show/3oH7fhOQ0r4TxzSmB8w6Ll" },
                { label: "Apple Podcasts", href: "https://podcasts.apple.com/fr/podcast/oklm-drag-club/id1735072269" },
                { label: "Deezer", href: "https://link.deezer.com/s/33gD3EOafsQg6hYKIJ1O3" },
                { label: "Amazon Music", href: "https://music.amazon.fr/podcasts/e265f2dd-51a6-4596-9f50-2a77094fa1a4/oklm-drag-club?ref=dm_sh_B8czxUzRAahr96DhRnDz0uJ26&referrer=dm_sh_messages" },
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
            <span>© 2026 OKLM Drag Club</span>
            <span>Fait avec douceur</span>
          </div>
        </footer>
      </body>
    </html>
  );
}
