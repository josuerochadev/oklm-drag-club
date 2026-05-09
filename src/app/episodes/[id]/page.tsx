import { fetchEpisodes } from "@/lib/rss";
import { SHOW_CONFIG } from "@/lib/shows";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SpotifyIcon, AppleIcon, DeezerIcon, AmazonIcon } from "@/components/svg/PlatformIcons";

export async function generateStaticParams() {
  const episodes = await fetchEpisodes().catch(() => []);
  return episodes.map((ep) => ({ id: ep.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const episodes = await fetchEpisodes().catch(() => []);
  const episode = episodes.find((ep) => ep.id === id);
  if (!episode) return {};
  return {
    title: `${episode.title} — OKLM Drag Club`,
    description: episode.description.replace(/<[^>]*>/g, "").slice(0, 160),
  };
}

const PLATFORM_ICONS = [
  { key: "spotifyUrl" as const, Icon: SpotifyIcon, label: "Spotify" },
  { key: "applePodcastsUrl" as const, Icon: AppleIcon, label: "Apple Podcasts" },
  { key: "deezerUrl" as const, Icon: DeezerIcon, label: "Deezer" },
  { key: "amazonUrl" as const, Icon: AmazonIcon, label: "Amazon Music" },
];

export default async function EpisodePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const episodes = await fetchEpisodes().catch(() => []);
  const episode = episodes.find((ep) => ep.id === id);

  if (!episode) notFound();

  const show = SHOW_CONFIG[episode.show];
  const episodeIndex = episodes.findIndex((ep) => ep.id === id);
  const prevEpisode = episodeIndex < episodes.length - 1 ? episodes[episodeIndex + 1] : null;
  const nextEpisode = episodeIndex > 0 ? episodes[episodeIndex - 1] : null;

  const pubDate = episode.pubDate
    ? new Date(episode.pubDate).toLocaleDateString("fr-FR", {
        day: "numeric",
        month: "long",
        year: "numeric",
      })
    : null;

  const episodeLinks = PLATFORM_ICONS
    .filter((p) => episode[p.key])
    .map((p) => ({ ...p, href: episode[p.key]! }));

  return (
    <div className="max-w-2xl mx-auto px-6 pt-28 pb-24 fade-up">

      {/* Retour */}
      <Link
        href="/episodes"
        className="inline-flex items-center gap-2 mb-10 hover:opacity-60 transition-opacity"
        style={{
          fontFamily: '"Inter", sans-serif',
          fontWeight: 700,
          fontSize: "13px",
          color: "#1E1EE6",
        }}
      >
        ← Tous les épisodes
      </Link>

      {/* Show badge + numéro */}
      <div className="flex items-center gap-3 mb-6">
        <div
          className="flex items-center justify-center rounded-full"
          style={{
            width: 52,
            height: 52,
            background: show.auraLight,
            border: `2px solid ${show.aura}`,
            flexShrink: 0,
          }}
        >
          <span
            style={{
              fontFamily: '"Inter", sans-serif',
              fontWeight: 700,
              fontSize: episode.romanNumeral.length > 5 ? "9px" : "12px",
              color: "#1E1EE6",
            }}
          >
            {episode.romanNumeral}
          </span>
        </div>
        <div>
          <div
            style={{
              fontFamily: '"Inter", sans-serif',
              fontWeight: 700,
              fontSize: "11px",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              color: "#1E1EE6",
              opacity: 0.5,
            }}
          >
            {show.label}{pubDate ? ` · ${pubDate}` : ""}{episode.duration ? ` · ${episode.duration}` : ""}
          </div>
        </div>
      </div>

      {/* Titre */}
      <h1
        className="mb-8"
        style={{
          fontFamily: '"Inter", sans-serif',
          fontWeight: 700,
          fontSize: "clamp(26px, 5vw, 42px)",
          color: "#1E1EE6",
          lineHeight: 1.15,
        }}
      >
        {episode.title}
      </h1>

      {/* Platform links */}
      {episodeLinks.length > 0 && (
        <div className="flex items-center gap-4 mb-10 flex-wrap">
          {episodeLinks.map(({ Icon, href, label }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              title={label}
              aria-label={label}
              className="btn-pill btn-pill-blue flex items-center gap-2 transition-all hover:scale-105"
              style={{ padding: "9px 18px", fontSize: "13px" }}
            >
              <Icon style={{ width: 18, height: 18 } as React.CSSProperties} />
              {label}
            </a>
          ))}
        </div>
      )}

      {/* Séparateur */}
      <div style={{ height: "1.5px", background: "rgba(30,30,230,0.12)", marginBottom: "32px" }} />

      {/* Description */}
      {episode.description && (
        <div>
          <p
            className="mb-4"
            style={{
              fontFamily: '"Inter", sans-serif',
              fontWeight: 700,
              fontSize: "11px",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              color: "#1E1EE6",
              opacity: 0.4,
            }}
          >
            À propos
          </p>
          <div
            className="episode-description"
            style={{
              fontFamily: '"Inter", sans-serif',
              fontWeight: 400,
              fontSize: "16px",
              color: "#1E1EE6",
              lineHeight: 1.75,
              opacity: 0.85,
            }}
            dangerouslySetInnerHTML={{ __html: episode.description }}
          />
        </div>
      )}

      {/* Navigation prev/next */}
      {(prevEpisode || nextEpisode) && (
        <div
          className="mt-16 pt-8 grid grid-cols-2 gap-6"
          style={{ borderTop: "1.5px solid rgba(30,30,230,0.12)" }}
        >
          {prevEpisode ? (
            <Link href={`/episodes/${prevEpisode.id}`} className="group">
              <div
                style={{
                  fontFamily: '"Inter", sans-serif',
                  fontWeight: 700,
                  fontSize: "10px",
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  color: "#1E1EE6",
                  opacity: 0.4,
                  marginBottom: "6px",
                }}
              >
                ← Précédent
              </div>
              <div
                className="group-hover:opacity-60 transition-opacity line-clamp-2"
                style={{
                  fontFamily: '"Inter", sans-serif',
                  fontWeight: 700,
                  fontSize: "14px",
                  color: "#1E1EE6",
                }}
              >
                {prevEpisode.title}
              </div>
            </Link>
          ) : <div />}

          {nextEpisode ? (
            <Link href={`/episodes/${nextEpisode.id}`} className="group text-right">
              <div
                style={{
                  fontFamily: '"Inter", sans-serif',
                  fontWeight: 700,
                  fontSize: "10px",
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  color: "#1E1EE6",
                  opacity: 0.4,
                  marginBottom: "6px",
                }}
              >
                Suivant →
              </div>
              <div
                className="group-hover:opacity-60 transition-opacity line-clamp-2"
                style={{
                  fontFamily: '"Inter", sans-serif',
                  fontWeight: 700,
                  fontSize: "14px",
                  color: "#1E1EE6",
                }}
              >
                {nextEpisode.title}
              </div>
            </Link>
          ) : <div />}
        </div>
      )}
    </div>
  );
}
