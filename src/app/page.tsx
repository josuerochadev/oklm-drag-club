import Link from "next/link";
import { fetchEpisodes } from "@/lib/rss";
import { SHOWS_LIST } from "@/lib/shows";
import Hero from "@/components/Hero";
import EpisodeCard from "@/components/EpisodeCard";
import { SpotifyIcon, AppleIcon, DeezerIcon, AmazonIcon } from "@/components/svg/PlatformIcons";

const RSS_URL = "https://anchor.fm/s/f3147f50/podcast/rss";

const FOLLOW_PLATFORMS = [
  { Icon: SpotifyIcon, href: "https://open.spotify.com/show/3oH7fhOQ0r4TxzSmB8w6Ll", label: "Spotify" },
  { Icon: AppleIcon, href: "https://podcasts.apple.com/fr/podcast/oklm-drag-club/id1735072269", label: "Apple Podcasts" },
  { Icon: DeezerIcon, href: "https://link.deezer.com/s/33gD3EOafsQg6hYKIJ1O3", label: "Deezer" },
  { Icon: AmazonIcon, href: "https://music.amazon.fr/podcasts/e265f2dd-51a6-4596-9f50-2a77094fa1a4/oklm-drag-club?ref=dm_sh_B8czxUzRAahr96DhRnDz0uJ26&referrer=dm_sh_messages", label: "Amazon Music" },
];

export default async function HomePage() {
  const episodes = await fetchEpisodes().catch(() => []);
  const featured = episodes[0] ?? null;
  const recentEpisodes = episodes.slice(1, 7);

  return (
    <>
      <Hero />

      {/* ── Dernier épisode ── */}
      {featured && (
        <section style={{ borderBottom: "var(--border-base)" }}>
          <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "64px 32px" }}>
            <p className="section-label" style={{ marginBottom: "20px" }}>
              Dernier épisode
            </p>
            <Link
              href={`/episodes/${featured.id}`}
              className="episode-card-link"
              style={{
                display: "grid",
                gridTemplateColumns: "200px 1fr",
                border: "var(--border-base)",
                borderRadius: "var(--radius-xs)",
                overflow: "hidden",
                textDecoration: "none",
                color: "var(--forest)",
              }}
            >
              {/* Thumb */}
              <div
                style={{
                  backgroundColor: "var(--lime)",
                  backgroundImage:
                    "repeating-linear-gradient(135deg, transparent 0, transparent 8px, rgba(0,0,0,0.07) 8px, rgba(0,0,0,0.07) 16px)",
                  position: "relative",
                  minHeight: "180px",
                  borderRight: "var(--border-base)",
                }}
              >
                <span
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "6rem",
                    letterSpacing: "-0.04em",
                    color: "var(--forest)",
                    opacity: 0.12,
                    position: "absolute",
                    bottom: "-4px",
                    right: "8px",
                    lineHeight: 1,
                    userSelect: "none",
                  }}
                >
                  {featured.episodeNumber}
                </span>
              </div>

              {/* Contenu */}
              <div style={{ padding: "28px 32px", background: "var(--lime-soft)" }}>
                <p
                  style={{
                    fontFamily: "var(--font-body)",
                    fontWeight: 500,
                    fontSize: "0.75rem",
                    color: "var(--forest-mid)",
                    marginBottom: "8px",
                  }}
                >
                  {SHOWS_LIST.find((s) => s.id === featured.show)?.label ?? ""}
                  {featured.duration ? ` · ${featured.duration}` : ""}
                </p>
                <h2
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "clamp(22px, 3vw, 36px)",
                    lineHeight: 1.1,
                    letterSpacing: "-0.04em",
                    color: "var(--forest)",
                    marginBottom: "20px",
                  }}
                >
                  {featured.title}
                </h2>
                <span className="btn btn-primary" style={{ pointerEvents: "none" }}>
                  Écouter
                </span>
              </div>
            </Link>
          </div>
        </section>
      )}

      {/* ── Émissions ── */}
      <section style={{ borderBottom: "var(--border-base)" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "64px 32px" }}>
          <p className="section-label" style={{ marginBottom: "20px" }}>
            Émissions
          </p>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))",
              gap: "16px",
            }}
          >
            {SHOWS_LIST.map((show) => (
              <Link
                key={show.id}
                href={`/emissions/${show.id}`}
                className="episode-card-link"
                style={{
                  display: "flex",
                  alignItems: "flex-end",
                  backgroundColor: show.color,
                  backgroundImage:
                    "repeating-linear-gradient(135deg, transparent 0, transparent 8px, rgba(0,0,0,0.07) 8px, rgba(0,0,0,0.07) 16px)",
                  border: "var(--border-base)",
                  borderRadius: "var(--radius-xs)",
                  padding: "24px 20px",
                  minHeight: "120px",
                  textDecoration: "none",
                }}
              >
                <h3
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "1rem",
                    letterSpacing: "-0.03em",
                    color: "var(--forest)",
                    lineHeight: 1.1,
                  }}
                >
                  {show.label}
                </h3>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── Épisodes récents ── */}
      <section style={{ borderBottom: "var(--border-base)" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "64px 32px" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: "24px",
            }}
          >
            <p className="section-label">Épisodes récents</p>
            <Link
              href="/episodes"
              style={{
                fontFamily: "var(--font-body)",
                fontWeight: 700,
                fontSize: "0.75rem",
                letterSpacing: "0.07em",
                textTransform: "uppercase",
                color: "var(--forest-mid)",
              }}
            >
              Voir tout →
            </Link>
          </div>

          {recentEpisodes.length > 0 ? (
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
                gap: "24px",
              }}
            >
              {recentEpisodes.map((ep) => (
                <EpisodeCard key={ep.id} episode={ep} />
              ))}
            </div>
          ) : (
            <p
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "15px",
                color: "var(--forest-mid)",
                padding: "40px 0",
                textAlign: "center",
              }}
            >
              Les épisodes arrivent bientôt…
            </p>
          )}
        </div>
      </section>

      {/* ── Suivre ── */}
      <section
        id="rss"
        style={{
          background: "var(--lime)",
          borderBottom: "var(--border-base)",
        }}
      >
        <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "64px 32px" }}>
          <p className="section-label" style={{ marginBottom: "12px" }}>
            Ne rien rater
          </p>
          <h2
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(28px, 4vw, 48px)",
              color: "var(--forest)",
              letterSpacing: "-0.04em",
              lineHeight: 1,
              marginBottom: "16px",
              maxWidth: "520px",
            }}
          >
            Suivez le podcast sur votre plateforme.
          </h2>
          <p
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "0.9375rem",
              color: "var(--forest)",
              opacity: 0.7,
              lineHeight: 1.65,
              marginBottom: "32px",
              maxWidth: "440px",
            }}
          >
            Chaque nouvel épisode apparaîtra automatiquement — sans rien faire de plus.
          </p>

          {/* Plateformes */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))",
              gap: "12px",
              marginBottom: "28px",
            }}
          >
            {FOLLOW_PLATFORMS.map(({ Icon, href, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "12px",
                  padding: "14px 18px",
                  background: "var(--white)",
                  border: "var(--border-base)",
                  borderRadius: "var(--radius-xs)",
                  textDecoration: "none",
                  color: "var(--forest)",
                  fontFamily: "var(--font-body)",
                  fontWeight: 600,
                  fontSize: "0.875rem",
                  transition: "box-shadow var(--transition-fast), transform var(--transition-fast)",
                }}
                className="episode-card-link"
              >
                <Icon size={22} />
                {label}
              </a>
            ))}
          </div>

          {/* RSS discret */}
          <p
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "0.8125rem",
              color: "var(--forest)",
              opacity: 0.5,
            }}
          >
            Vous utilisez une app podcast dédiée ?{" "}
            <a
              href={RSS_URL}
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: "var(--forest)", textDecoration: "underline", textUnderlineOffset: "3px" }}
            >
              Lien RSS
            </a>
          </p>
        </div>
      </section>
    </>
  );
}
