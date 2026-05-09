import Link from "next/link";
import { SHOW_CONFIG } from "@/lib/shows";
import type { Episode } from "@/lib/rss";
import PlatformLinks from "./PlatformLinks";

interface EpisodeCardProps {
  episode: Episode;
  index?: number;
}

export default function EpisodeCard({ episode, index = 0 }: EpisodeCardProps) {
  const show = SHOW_CONFIG[episode.show];
  const aura = show.aura;

  const pubDate = episode.pubDate
    ? new Date(episode.pubDate).toLocaleDateString("fr-FR", {
        day: "numeric",
        month: "long",
        year: "numeric",
      })
    : null;

  const animDelay = `${index * 0.06}s`;

  return (
    <article
      className="fade-up group relative"
      style={{ animationDelay: animDelay }}
    >
      {/* Aura hover — très subtile */}
      <div
        className="absolute -inset-4 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"
        style={{
          background: `radial-gradient(ellipse at center, ${aura}30 0%, transparent 70%)`,
          filter: "blur(20px)",
          pointerEvents: "none",
        }}
      />

      <Link
        href={`/episodes/${episode.id}`}
        className="relative flex gap-6 items-start py-6 border-b group-hover:border-transparent transition-colors duration-300"
        style={{ borderColor: "rgba(180,150,150,0.18)" }}
      >
        {/* Numéro romain avec aura */}
        <div className="flex-shrink-0 flex items-center justify-center" style={{ width: 64, height: 64 }}>
          <div
            className="relative flex items-center justify-center"
            style={{
              width: 56,
              height: 56,
              borderRadius: "50%",
              background: `radial-gradient(circle, ${aura}55 0%, ${aura}18 60%, transparent 100%)`,
              boxShadow: `0 0 18px ${aura}90, 0 0 6px ${aura}60`,
              border: `1px solid ${aura}90`,
              transition: "box-shadow 0.4s ease",
            }}
          >
            <span
              style={{
                fontFamily: '"Italiana", serif',
                fontStyle: "normal",
                letterSpacing: "0.08em",
                fontSize: episode.romanNumeral.length > 4 ? "10px" : "13px",
                color: aura,
                textShadow: `0 0 12px ${aura}`,
              }}
            >
              {episode.romanNumeral}
            </span>
          </div>
        </div>

        {/* Contenu */}
        <div className="flex-1 min-w-0">
          {/* Badge show */}
          <div className="mb-2">
            <span
              className="font-italiana"
              style={{
                fontSize: "8px",
                color: aura,
                letterSpacing: "0.3em",
                textTransform: "uppercase",
                fontFamily: '"Italiana", serif',
                fontStyle: "normal",
              }}
            >
              {show.label}
              {" ✦ "}
              {pubDate}
            </span>
          </div>

          {/* Titre */}
          <h3
            className="leading-snug mb-3 group-hover:gradient-text transition-all duration-300 line-clamp-2"
            style={{
              fontFamily: '"Cormorant Garamond", serif',
              fontStyle: "italic",
              fontWeight: 300,
              fontSize: "22px",
              color: "#5A3E50",
            }}
          >
            {episode.title}
          </h3>

          {/* Description courte */}
          {episode.description && (
            <p
              className="mb-4 line-clamp-2"
              style={{
                fontFamily: '"Cormorant Garamond", serif',
                fontStyle: "italic",
                fontWeight: 300,
                fontSize: "14px",
                color: "#8A7080",
                lineHeight: 1.7,
              }}
              dangerouslySetInnerHTML={{
                __html: episode.description.replace(/<[^>]*>/g, "").slice(0, 180) + "…",
              }}
            />
          )}

          {/* Durée + liens */}
          <div className="flex items-center gap-4 flex-wrap">
            {episode.duration && (
              <span
                style={{
                  fontFamily: '"Italiana", serif',
                  fontStyle: "normal",
                  letterSpacing: "0.2em",
                  fontSize: "8px",
                  color: "#8A7080",
                  textTransform: "uppercase",
                }}
              >
                {episode.duration}
              </span>
            )}
            <PlatformLinks
              spotifyUrl={episode.spotifyUrl}
              applePodcastsUrl={episode.applePodcastsUrl}
              deezerUrl={episode.deezerUrl}
              amazonUrl={episode.amazonUrl}
              size="sm"
            />
          </div>
        </div>

        {/* Flèche subtile */}
        <div
          className="flex-shrink-0 self-center opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-0 group-hover:translate-x-1"
          style={{ color: aura, fontSize: "18px" }}
        >
          →
        </div>
      </Link>
    </article>
  );
}
