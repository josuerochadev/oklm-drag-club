import Link from "next/link";
import Image from "next/image";
import { fetchEpisodes } from "@/lib/rss";
import { SHOWS_LIST } from "@/lib/shows";
import Hero from "@/components/Hero";
import EpisodeCard from "@/components/EpisodeCard";
import { SpotifyIcon, AppleIcon, DeezerIcon, AmazonIcon } from "@/components/svg/PlatformIcons";
import { SPOTIFY_URL, APPLE_PODCASTS_URL, DEEZER_URL, AMAZON_SHOW_URL } from "@/lib/platforms";
import { RSS_URL } from "@/lib/config";

const FOLLOW_PLATFORMS = [
  { Icon: SpotifyIcon, href: SPOTIFY_URL, label: "Spotify" },
  { Icon: AppleIcon, href: APPLE_PODCASTS_URL, label: "Apple Podcasts" },
  { Icon: DeezerIcon, href: DEEZER_URL, label: "Deezer" },
  { Icon: AmazonIcon, href: AMAZON_SHOW_URL, label: "Amazon Music" },
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
        <section aria-label="Dernier épisode" style={{ borderBottom: "var(--border-base)" }}>
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
                  backgroundImage: featured.imageUrl
                    ? undefined
                    : "repeating-linear-gradient(135deg, transparent 0, transparent 8px, rgba(0,0,0,0.07) 8px, rgba(0,0,0,0.07) 16px)",
                  position: "relative",
                  minHeight: "180px",
                  borderRight: "var(--border-base)",
                  overflow: "hidden",
                }}
              >
                {featured.imageUrl && (
                  <Image
                    src={featured.imageUrl}
                    alt={featured.title}
                    fill
                    sizes="200px"
                    style={{ objectFit: "cover" }}
                  />
                )}
                <span
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "6rem",
                    letterSpacing: "-0.04em",
                    color: featured.imageUrl ? "var(--white)" : "var(--forest)",
                    opacity: featured.imageUrl ? 0.35 : 0.12,
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
      <section aria-label="Émissions" style={{ borderBottom: "var(--border-base)" }}>
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
      <section aria-label="Épisodes récents" style={{ borderBottom: "var(--border-base)" }}>
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
            <div className="episode-grid">
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
        aria-label="S'abonner au podcast"
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
