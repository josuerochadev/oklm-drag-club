import Link from "next/link";
import { SPOTIFY_URL, APPLE_PODCASTS_URL, DEEZER_URL, AMAZON_SHOW_URL } from "@/lib/platforms";

const FOOTER_NAV = [
  { label: "Épisodes", href: "/episodes" },
  { label: "À propos", href: "/about" },
];

const FOOTER_PLATFORMS = [
  { label: "Spotify", href: SPOTIFY_URL },
  { label: "Apple Podcasts", href: APPLE_PODCASTS_URL },
  { label: "Deezer", href: DEEZER_URL },
  { label: "Amazon Music", href: AMAZON_SHOW_URL },
];

export default function Footer() {
  return (
    <footer
      style={{
        background: "var(--forest)",
        borderTop: "var(--border-base)",
        padding: "48px 32px 28px",
      }}
    >
      <div
        className="footer-grid"
        style={{
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
          {FOOTER_NAV.map(({ label, href }) => (
            <Link
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
            </Link>
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
          {FOOTER_PLATFORMS.map(({ label, href }) => (
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
          color: "rgba(255,255,255,0.55)",
        }}
      >
        <span>© {new Date().getFullYear()} OKLM Drag Club</span>
        <span>Fait avec douceur</span>
      </div>
    </footer>
  );
}
