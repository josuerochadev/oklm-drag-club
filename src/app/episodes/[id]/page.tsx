import { fetchEpisodes } from "@/lib/rss";
import { SHOW_CONFIG } from "@/lib/shows";
import PlatformLinks from "@/components/PlatformLinks";
import Link from "next/link";
import { notFound } from "next/navigation";

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
  const aura = show.aura;

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

  return (
    <div className="relative max-w-2xl mx-auto px-6 pt-32 pb-24">
      {/* Halo de show en arrière-plan */}
      <div
        className="halo"
        style={{
          width: 500,
          height: 500,
          top: "0px",
          left: "50%",
          transform: "translateX(-50%)",
          background: aura,
          opacity: 0.18,
          filter: "blur(90px)",
        }}
      />

      <div className="relative">
        {/* Retour */}
        <div className="mb-12 fade-up">
          <Link
            href="/episodes"
            style={{
              fontFamily: '"Italiana", serif',
              fontStyle: "normal",
              fontSize: "8px",
              letterSpacing: "0.3em",
              textTransform: "uppercase",
              color: "#8A7080",
            }}
            className="hover:text-gold transition-colors"
          >
            ← Tous les épisodes
          </Link>
        </div>

        {/* Badge show + date */}
        <div className="flex items-center gap-4 mb-6 fade-up" style={{ animationDelay: "0.1s" }}>
          {/* Numéro romain */}
          <div
            style={{
              width: 64,
              height: 64,
              borderRadius: "50%",
              background: `radial-gradient(circle, ${aura}60 0%, ${aura}20 65%, transparent 100%)`,
              border: `1px solid ${aura}95`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: `0 0 24px ${aura}95, 0 0 8px ${aura}70`,
              flexShrink: 0,
            }}
          >
            <span
              style={{
                fontFamily: '"Italiana", serif',
                fontStyle: "normal",
                fontSize: episode.romanNumeral.length > 4 ? "11px" : "15px",
                color: aura,
                textShadow: `0 0 16px ${aura}`,
                letterSpacing: "0.06em",
              }}
            >
              {episode.romanNumeral}
            </span>
          </div>

          <div>
            <div
              style={{
                fontFamily: '"Italiana", serif',
                fontStyle: "normal",
                fontSize: "8px",
                letterSpacing: "0.32em",
                textTransform: "uppercase",
                color: aura,
                marginBottom: "4px",
              }}
            >
              {show.label}
            </div>
            {pubDate && (
              <div
                style={{
                  fontFamily: '"Italiana", serif',
                  fontStyle: "normal",
                  fontSize: "7px",
                  letterSpacing: "0.25em",
                  textTransform: "uppercase",
                  color: "#8A7080",
                }}
              >
                {pubDate}
              </div>
            )}
          </div>
        </div>

        {/* Titre */}
        <h1
          className="mb-8 fade-up"
          style={{
            animationDelay: "0.2s",
            fontFamily: '"Cormorant Garamond", serif',
            fontStyle: "italic",
            fontWeight: 300,
            fontSize: "clamp(30px, 5vw, 46px)",
            color: "#5A3E50",
            lineHeight: 1.2,
          }}
        >
          {episode.title}
        </h1>

        {/* Durée + plateformes */}
        <div
          className="flex flex-col gap-4 mb-10 fade-up"
          style={{ animationDelay: "0.3s" }}
        >
          {episode.duration && (
            <span
              style={{
                fontFamily: '"Italiana", serif',
                fontStyle: "normal",
                fontSize: "8px",
                letterSpacing: "0.28em",
                textTransform: "uppercase",
                color: "#8A7080",
              }}
            >
              Durée : {episode.duration}
            </span>
          )}
          <PlatformLinks
            spotifyUrl={episode.spotifyUrl}
            applePodcastsUrl={episode.applePodcastsUrl}
            deezerUrl={episode.deezerUrl}
            amazonUrl={episode.amazonUrl}
          />
        </div>

        {/* Séparateur */}
        <div
          className="fade-up"
          style={{
            animationDelay: "0.35s",
            height: "0.5px",
            background: "rgba(180,150,150,0.2)",
            marginBottom: "32px",
          }}
        />

        {/* Description */}
        {episode.description && (
          <div
            className="fade-up"
            style={{ animationDelay: "0.4s" }}
          >
            <div
              className="mb-3"
              style={{
                fontFamily: '"Italiana", serif',
                fontStyle: "normal",
                fontSize: "8px",
                letterSpacing: "0.35em",
                textTransform: "uppercase",
                color: "#8A7080",
              }}
            >
              À propos de cet épisode
            </div>
            <div
              className="episode-description"
              style={{
                fontFamily: '"Cormorant Garamond", serif',
                fontStyle: "italic",
                fontWeight: 300,
                fontSize: "16px",
                color: "#5A3E50",
                lineHeight: 1.85,
              }}
              dangerouslySetInnerHTML={{
                __html: episode.description,
              }}
            />
          </div>
        )}

        {/* Navigation entre épisodes */}
        {(prevEpisode || nextEpisode) && (
          <div
            className="mt-16 pt-8 grid grid-cols-2 gap-6 fade-up"
            style={{
              animationDelay: "0.5s",
              borderTop: "0.5px solid rgba(180,150,150,0.18)",
            }}
          >
            {prevEpisode ? (
              <Link
                href={`/episodes/${prevEpisode.id}`}
                className="group"
                style={{ textDecoration: "none" }}
              >
                <div
                  style={{
                    fontFamily: '"Italiana", serif',
                    fontStyle: "normal",
                    fontSize: "7px",
                    letterSpacing: "0.3em",
                    textTransform: "uppercase",
                    color: "#8A7080",
                    marginBottom: "6px",
                  }}
                >
                  ← Précédent
                </div>
                <div
                  className="group-hover:gradient-text transition-all duration-300 line-clamp-2"
                  style={{
                    fontFamily: '"Cormorant Garamond", serif',
                    fontStyle: "italic",
                    fontWeight: 300,
                    fontSize: "15px",
                    color: "#5A3E50",
                  }}
                >
                  {prevEpisode.title}
                </div>
              </Link>
            ) : (
              <div />
            )}

            {nextEpisode ? (
              <Link
                href={`/episodes/${nextEpisode.id}`}
                className="group text-right"
                style={{ textDecoration: "none" }}
              >
                <div
                  style={{
                    fontFamily: '"Italiana", serif',
                    fontStyle: "normal",
                    fontSize: "7px",
                    letterSpacing: "0.3em",
                    textTransform: "uppercase",
                    color: "#8A7080",
                    marginBottom: "6px",
                  }}
                >
                  Suivant →
                </div>
                <div
                  className="group-hover:gradient-text transition-all duration-300 line-clamp-2"
                  style={{
                    fontFamily: '"Cormorant Garamond", serif',
                    fontStyle: "italic",
                    fontWeight: 300,
                    fontSize: "15px",
                    color: "#5A3E50",
                  }}
                >
                  {nextEpisode.title}
                </div>
              </Link>
            ) : (
              <div />
            )}
          </div>
        )}
      </div>
    </div>
  );
}
