import Link from "next/link";
import Image from "next/image";
import { SHOW_CONFIG } from "@/lib/shows";
import type { Episode } from "@/lib/rss";

interface EpisodeCardProps {
  episode: Episode;
}

export default function EpisodeCard({ episode }: EpisodeCardProps) {
  const show = SHOW_CONFIG[episode.show];

  const pubDate = episode.pubDate
    ? new Date(episode.pubDate).toLocaleDateString("fr-FR", {
        day: "numeric",
        month: "long",
        year: "numeric",
      })
    : null;

  return (
    <article>
      <Link
        href={`/episodes/${episode.id}`}
        style={{
          display: "block",
          border: "var(--border-base)",
          borderRadius: "var(--radius-xs)",
          overflow: "hidden",
          textDecoration: "none",
          color: "var(--forest)",
          transition: "box-shadow var(--transition-fast), transform var(--transition-fast)",
        }}
        className="episode-card-link"
      >
        {/* Thumb */}
        <div
          style={{
            aspectRatio: "1",
            position: "relative",
            borderBottom: "var(--border-base)",
            backgroundColor: show.color,
            backgroundImage: episode.imageUrl
              ? undefined
              : "repeating-linear-gradient(135deg, transparent 0, transparent 8px, rgba(0,0,0,0.07) 8px, rgba(0,0,0,0.07) 16px)",
            overflow: "hidden",
          }}
        >
          {episode.imageUrl && (
            <Image
              src={episode.imageUrl}
              alt={episode.title}
              fill
              sizes="(max-width: 640px) 100vw, 320px"
              style={{ objectFit: "cover" }}
            />
          )}

          {/* Ghost episode number */}
          <span
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "5rem",
              letterSpacing: "-0.04em",
              color: episode.imageUrl ? "var(--white)" : "var(--forest)",
              opacity: episode.imageUrl ? 0.35 : 0.12,
              position: "absolute",
              bottom: "-8px",
              right: "10px",
              lineHeight: 1,
              userSelect: "none",
              zIndex: 1,
            }}
          >
            {episode.episodeNumber}
          </span>

          {/* Show badge */}
          <span
            className={`badge ${show.badgeClass}`}
            style={{ position: "absolute", top: "12px", left: "12px", zIndex: 1 }}
          >
            {show.abbr}
          </span>
        </div>

        {/* Body */}
        <div style={{ padding: "16px" }}>
          <div
            style={{
              fontFamily: "var(--font-body)",
              fontWeight: 500,
              fontSize: "0.75rem",
              color: "var(--forest-mid)",
              marginBottom: "6px",
            }}
          >
            {show.label}
          </div>

          <h2
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "1.25rem",
              lineHeight: 1.15,
              letterSpacing: "-0.03em",
              color: "var(--forest)",
              marginBottom: "10px",
            }}
          >
            {episode.title}
          </h2>

          <div
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "0.75rem",
              color: "var(--forest-mid)",
              display: "flex",
              alignItems: "center",
              gap: "6px",
              flexWrap: "wrap",
            }}
          >
            {episode.duration && <span>{episode.duration}</span>}
            {episode.duration && pubDate && (
              <span style={{ opacity: 0.5 }}>·</span>
            )}
            {pubDate && <span>{pubDate}</span>}
          </div>
        </div>
      </Link>

    </article>
  );
}
