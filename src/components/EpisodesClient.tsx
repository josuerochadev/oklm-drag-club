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
    <div className="max-w-2xl mx-auto px-6 pt-28 pb-20">
      {/* En-tête */}
      <div className="mb-10">
        <h1
          className="font-display mb-2"
          style={{
            fontFamily: '"Bagel Fat One", sans-serif',
            fontSize: "clamp(42px, 8vw, 72px)",
            color: "#1E1EE6",
            lineHeight: 1,
          }}
        >
          Épisodes
        </h1>
        {episodes.length > 0 && (
          <p
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
            {episodes.length} épisodes
          </p>
        )}
      </div>

      {/* Filtre shows */}
      <div className="mb-10">
        <ShowFilter active={active} onChange={setActive} />
      </div>

      {/* Liste */}
      {visible.length > 0 ? (
        visible.map((ep, i) => (
          <EpisodeCard key={ep.id} episode={ep} index={i} />
        ))
      ) : (
        <p
          className="py-20 text-center"
          style={{
            fontFamily: '"Inter", sans-serif',
            fontWeight: 600,
            fontSize: "15px",
            color: "#1E1EE6",
            opacity: 0.45,
          }}
        >
          Aucun épisode dans cette catégorie pour l&apos;instant.
        </p>
      )}
    </div>
  );
}
