import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { fetchEpisodes } from "@/lib/rss";
import { SHOW_CONFIG, SHOWS_LIST, isShowId } from "@/lib/shows";
import EpisodeCard from "@/components/EpisodeCard";

export function generateStaticParams() {
  return SHOWS_LIST.map((show) => ({ show: show.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ show: string }>;
}): Promise<Metadata> {
  const { show: showId } = await params;
  if (!isShowId(showId)) return {};
  const show = SHOW_CONFIG[showId];
  return {
    title: `${show.label}`,
    description: `Tous les épisodes ${show.label} du podcast OKLM Drag Club — réactions calmes et bienveillantes.`,
  };
}

export default async function EmissionPage({
  params,
}: {
  params: Promise<{ show: string }>;
}) {
  const { show: showId } = await params;
  if (!isShowId(showId)) notFound();
  const show = SHOW_CONFIG[showId];

  if (show.id === "other") notFound();

  const allEpisodes = await fetchEpisodes().catch(() => []);
  const episodes = allEpisodes.filter((ep) => ep.show === show.id);

  return (
    <>
      {/* ── En-tête émission ── */}
      <section
        style={{
          borderBottom: "var(--border-base)",
          backgroundColor: show.color,
          backgroundImage:
            "repeating-linear-gradient(135deg, transparent 0, transparent 8px, rgba(0,0,0,0.07) 8px, rgba(0,0,0,0.07) 16px)",
        }}
      >
        <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "64px 32px" }}>
          <Link
            href="/episodes"
            className="btn btn-ghost"
            style={{ marginBottom: "32px", display: "inline-flex", background: "rgba(255,255,255,0.5)" }}
          >
            ← Toutes les émissions
          </Link>

          <div style={{ display: "flex", alignItems: "flex-end", gap: "16px", flexWrap: "wrap" }}>
            <h1
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(48px, 8vw, 88px)",
                color: "var(--forest)",
                lineHeight: 0.92,
                letterSpacing: "-0.04em",
              }}
            >
              {show.label}
            </h1>
            {episodes.length > 0 && (
              <p className="section-label" style={{ paddingBottom: "8px" }}>
                {episodes.length} épisode{episodes.length > 1 ? "s" : ""}
              </p>
            )}
          </div>
        </div>
      </section>

      {/* ── Grille épisodes ── */}
      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "48px 32px 80px" }}>
        {episodes.length > 0 ? (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
              gap: "24px",
            }}
          >
            {episodes.map((ep) => (
              <EpisodeCard key={ep.id} episode={ep} />
            ))}
          </div>
        ) : (
          <p
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "15px",
              color: "var(--forest-mid)",
              padding: "64px 0",
              textAlign: "center",
            }}
          >
            Aucun épisode pour cette émission pour l&apos;instant.
          </p>
        )}
      </div>
    </>
  );
}
