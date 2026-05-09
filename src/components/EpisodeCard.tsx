import Link from "next/link";
import { SHOW_CONFIG } from "@/lib/shows";
import type { Episode } from "@/lib/rss";

interface EpisodeCardProps {
  episode: Episode;
  index?: number;
}

export default function EpisodeCard({ episode, index = 0 }: EpisodeCardProps) {
  const show = SHOW_CONFIG[episode.show];

  const pubDate = episode.pubDate
    ? new Date(episode.pubDate).toLocaleDateString("fr-FR", {
        day: "numeric",
        month: "long",
        year: "numeric",
      })
    : null;

  return (
    <article
      className="fade-up"
      style={{ animationDelay: `${index * 0.05}s` }}
    >
      <Link
        href={`/episodes/${episode.id}`}
        className="group flex gap-5 items-start py-6 transition-colors duration-200"
        style={{ borderBottom: "1.5px solid rgba(30,30,230,0.12)" }}
      >
        {/* Roman numeral badge */}
        <div
          className="flex-shrink-0 flex items-center justify-center rounded-full transition-all duration-300 group-hover:scale-110"
          style={{
            width: 56,
            height: 56,
            background: show.auraLight,
            border: `2px solid ${show.aura}`,
            flexShrink: 0,
          }}
        >
          <span
            style={{
              fontFamily: '"Inter", sans-serif',
              fontWeight: 700,
              fontSize: episode.romanNumeral.length > 5 ? "9px" : episode.romanNumeral.length > 3 ? "11px" : "13px",
              color: "#1E1EE6",
              letterSpacing: "0.04em",
            }}
          >
            {episode.romanNumeral}
          </span>
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          {/* Show + date */}
          <div
            className="flex items-center gap-2 mb-2 flex-wrap"
            style={{
              fontFamily: '"Inter", sans-serif',
              fontWeight: 700,
              fontSize: "11px",
              letterSpacing: "0.08em",
              color: "#1E1EE6",
              opacity: 0.55,
              textTransform: "uppercase",
            }}
          >
            <span>{show.label}</span>
            {pubDate && <><span>·</span><span>{pubDate}</span></>}
            {episode.duration && <><span>·</span><span>{episode.duration}</span></>}
          </div>

          {/* Title */}
          <h3
            className="mb-2 leading-tight transition-opacity duration-200 group-hover:opacity-70"
            style={{
              fontFamily: '"Inter", sans-serif',
              fontWeight: 700,
              fontSize: "clamp(16px, 2.5vw, 20px)",
              color: "#1E1EE6",
            }}
          >
            {episode.title}
          </h3>

          {/* Description */}
          {episode.description && (
            <p
              className="line-clamp-2"
              style={{
                fontFamily: '"Inter", sans-serif',
                fontWeight: 400,
                fontSize: "14px",
                color: "#1E1EE6",
                opacity: 0.55,
                lineHeight: 1.6,
              }}
              dangerouslySetInnerHTML={{
                __html: episode.description.replace(/<[^>]*>/g, "").slice(0, 160) + "…",
              }}
            />
          )}
        </div>

        {/* Arrow */}
        <div
          className="flex-shrink-0 self-center opacity-0 group-hover:opacity-100 transition-all duration-200 translate-x-0 group-hover:translate-x-1"
          style={{ color: "#1E1EE6", fontSize: "20px", fontWeight: 700 }}
        >
          →
        </div>
      </Link>
    </article>
  );
}
