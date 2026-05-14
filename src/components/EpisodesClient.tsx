"use client";

import { useState } from "react";
import type { Episode } from "@/lib/rss";
import type { ShowId } from "@/lib/shows";
import EpisodeCard from "@/components/EpisodeCard";
import ShowFilter from "@/components/ShowFilter";

export default function EpisodesClientPage({
  episodes,
}: {
  episodes: Episode[];
}) {
  const [active, setActive] = useState<ShowId | "all">("all");

  const visible =
    active === "all" ? episodes : episodes.filter((ep) => ep.show === active);

  return (
    <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "48px 32px 80px" }}>
      {/* En-tête */}
      <div style={{ marginBottom: "40px" }}>
        <h1
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(48px, 9vw, 96px)",
            color: "var(--forest)",
            lineHeight: 0.95,
            letterSpacing: "-0.04em",
            marginBottom: "8px",
          }}
        >
          Épisodes
        </h1>
        {episodes.length > 0 && (
          <p className="section-label" style={{ marginBottom: "32px" }}>
            {episodes.length} épisodes
          </p>
        )}

        <div
          style={{
            height: "2px",
            background: "var(--forest)",
            marginBottom: "24px",
          }}
        />

        <ShowFilter active={active} onChange={setActive} />
      </div>

      {/* Grille */}
      {visible.length > 0 ? (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
            gap: "24px",
          }}
        >
          {visible.map((ep) => (
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
          Aucun épisode dans cette catégorie pour l&apos;instant.
        </p>
      )}
    </div>
  );
}
