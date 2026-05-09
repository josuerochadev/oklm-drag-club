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
    <div className="max-w-2xl mx-auto px-6 pt-32 pb-20">
      {/* En-tête */}
      <div className="text-center mb-14">
        <div className="mb-4">
          <span
            style={{
              fontFamily: '"Italiana", serif',
              fontStyle: "normal",
              fontSize: "8px",
              letterSpacing: "0.45em",
              textTransform: "uppercase",
              color: "#B88068",
            }}
          >
            ✦ Archives ✦
          </span>
        </div>
        <h1
          style={{
            fontFamily: '"Cormorant Garamond", serif',
            fontStyle: "italic",
            fontWeight: 300,
            fontSize: "clamp(36px, 6vw, 56px)",
            color: "#5A3E50",
            lineHeight: 1.15,
          }}
        >
          Tous les épisodes
        </h1>
        {episodes.length > 0 && (
          <p
            className="mt-3"
            style={{
              fontFamily: '"Italiana", serif',
              fontStyle: "normal",
              fontSize: "8px",
              letterSpacing: "0.3em",
              textTransform: "uppercase",
              color: "#8A7080",
            }}
          >
            {episodes.length} épisode{episodes.length > 1 ? "s" : ""}
          </p>
        )}
      </div>

      {/* Filtre shows */}
      <div className="mb-12">
        <ShowFilter active={active} onChange={setActive} />
      </div>

      {/* Liste */}
      {visible.length > 0 ? (
        <div>
          {visible.map((ep, i) => (
            <EpisodeCard key={ep.id} episode={ep} index={i} />
          ))}
        </div>
      ) : (
        <p
          className="text-center py-20"
          style={{
            fontFamily: '"Cormorant Garamond", serif',
            fontStyle: "italic",
            fontWeight: 300,
            fontSize: "16px",
            color: "#8A7080",
          }}
        >
          Aucun épisode dans cette catégorie pour l&apos;instant.
        </p>
      )}
    </div>
  );
}
