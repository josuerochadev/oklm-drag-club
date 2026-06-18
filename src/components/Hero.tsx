import Link from "next/link";
import { SpotifyIcon, AppleIcon, DeezerIcon, AmazonIcon } from "./svg/PlatformIcons";
import { SHOWS_LIST } from "@/lib/shows";
import { SPOTIFY_URL, APPLE_PODCASTS_URL, DEEZER_URL, AMAZON_SHOW_URL } from "@/lib/platforms";

export const FOLLOW_PLATFORMS = [
  { Icon: SpotifyIcon, href: SPOTIFY_URL, label: "Spotify" },
  { Icon: AppleIcon, href: APPLE_PODCASTS_URL, label: "Apple Podcasts" },
  { Icon: DeezerIcon, href: DEEZER_URL, label: "Deezer" },
  { Icon: AmazonIcon, href: AMAZON_SHOW_URL, label: "Amazon Music" },
];

export default function Hero() {
  return (
    <section
      style={{
        height: "calc(100svh - 56px)",
        background: "var(--forest-fixed)",
        backgroundImage:
          "repeating-linear-gradient(135deg, transparent 0, transparent 24px, rgba(255,255,255,0.022) 24px, rgba(255,255,255,0.022) 48px)",
        borderBottom: "var(--border-base)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "32px",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          maxWidth: "680px",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
        }}
      >
        {/* Label */}
        <p
          className="section-label"
          style={{
            color: "rgba(255,255,255,0.65)",
            marginBottom: "20px",
            animation: "hero-up 0.6s cubic-bezier(0.16, 1, 0.3, 1) both",
          }}
        >
          Podcast drag & téléréalité
        </p>

        {/* Titre */}
        <h1
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(40px, 9vw, 88px)",
            color: "var(--lime-fixed)",
            letterSpacing: "-0.04em",
            lineHeight: 0.92,
            marginBottom: "24px",
            whiteSpace: "nowrap",
            animation: "hero-up 0.65s cubic-bezier(0.16, 1, 0.3, 1) 0.07s both",
          }}
        >
          OKLM DRAG CLUB
        </h1>

        {/* Tagline */}
        <p
          style={{
            fontFamily: "var(--font-body)",
            fontWeight: 400,
            fontSize: "clamp(14px, 1.4vw, 17px)",
            color: "rgba(255,255,255,0.80)",
            lineHeight: 1.65,
            maxWidth: "440px",
            marginBottom: "36px",
            animation: "hero-up 0.65s cubic-bezier(0.16, 1, 0.3, 1) 0.14s both",
          }}
        >
          Réactions calmes et bienveillantes sur la drag et la téléréalité,
          sans hurler dans vos oreilles.
        </p>

        {/* Plateformes */}
        <div
          style={{
            width: "100%",
            marginBottom: "32px",
            animation: "hero-up 0.65s cubic-bezier(0.16, 1, 0.3, 1) 0.21s both",
          }}
        >
          <p
            className="section-label"
            style={{ color: "rgba(255,255,255,0.65)", marginBottom: "12px" }}
          >
            Écouter sur
          </p>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(4, 1fr)",
              gap: "10px",
            }}
          >
            {FOLLOW_PLATFORMS.map(({ Icon, href, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="platform-card"
                style={{ flexDirection: "column", gap: "10px", padding: "18px 12px" }}
              >
                <Icon size={32} />
                <span
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "clamp(10px, 1vw, 13px)",
                    letterSpacing: "-0.02em",
                    lineHeight: 1.1,
                  }}
                >
                  {label}
                </span>
              </a>
            ))}
          </div>
        </div>

        {/* CTA épisodes */}
        <div
          style={{
            marginBottom: "36px",
            animation: "hero-up 0.65s cubic-bezier(0.16, 1, 0.3, 1) 0.28s both",
          }}
        >
          <Link href="/episodes" className="btn btn-lime">
            Voir les épisodes
          </Link>
        </div>

        {/* Émissions */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "16px",
            flexWrap: "wrap",
            justifyContent: "center",
            paddingTop: "16px",
            borderTop: "1px solid rgba(255,255,255,0.10)",
            width: "100%",
            animation: "hero-up 0.65s cubic-bezier(0.16, 1, 0.3, 1) 0.35s both",
          }}
        >
          <span
            className="section-label"
            style={{ color: "rgba(255,255,255,0.65)" }}
          >
            Émissions
          </span>
          {SHOWS_LIST.map((show) => (
            <Link
              key={show.id}
              href={`/emissions/${show.id}`}
              style={{ display: "flex", alignItems: "center", gap: "7px", textDecoration: "none" }}
            >
              <span
                style={{
                  width: "7px",
                  height: "7px",
                  borderRadius: "1px",
                  backgroundColor: show.color,
                  flexShrink: 0,
                }}
              />
              <span
                style={{
                  fontFamily: "var(--font-body)",
                  fontWeight: 500,
                  fontSize: "0.75rem",
                  color: "rgba(255,255,255,0.75)",
                  whiteSpace: "nowrap",
                }}
              >
                {show.label}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
