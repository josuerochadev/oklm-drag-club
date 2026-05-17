import Link from "next/link";
import { fetchEpisodes } from "@/lib/rss";
import { SHOWS_LIST } from "@/lib/shows";
import Hero from "@/components/Hero";
import EpisodeCard from "@/components/EpisodeCard";
import CopyRssButton from "@/components/CopyRssButton";

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
              <div
                key={show.id}
                style={{
                  backgroundColor: show.color,
                  backgroundImage:
                    "repeating-linear-gradient(135deg, transparent 0, transparent 8px, rgba(0,0,0,0.07) 8px, rgba(0,0,0,0.07) 16px)",
                  border: "var(--border-base)",
                  borderRadius: "var(--radius-xs)",
                  padding: "24px 20px",
                  minHeight: "120px",
                  display: "flex",
                  alignItems: "flex-end",
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
              </div>
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

      {/* ── RSS ── */}
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
            Chaque épisode, dans votre app.
          </h2>
          <p
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "0.9375rem",
              color: "var(--forest)",
              opacity: 0.65,
              lineHeight: 1.65,
              marginBottom: "28px",
              maxWidth: "440px",
            }}
          >
            Copiez ce lien RSS et collez-le dans votre application podcast favorite
            pour être alerté·e dès qu&apos;un nouvel épisode est disponible.
          </p>
          <CopyRssButton />
        </div>
      </section>
    </>
  );
}
