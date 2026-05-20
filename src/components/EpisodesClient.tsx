"use client";

import { useMemo, useState, useCallback } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import type { Episode } from "@/lib/rss";
import type { ShowId } from "@/lib/shows";
import { isShowId } from "@/lib/shows";
import EpisodeCard from "@/components/EpisodeCard";
import ShowFilter from "@/components/ShowFilter";

const PAGE_SIZE = 24;
const LOAD_MORE = 12;

export default function EpisodesClientPage({
  episodes,
}: {
  episodes: Episode[];
}) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const showParam = searchParams.get("show");
  const queryParam = searchParams.get("q") ?? "";

  const active: ShowId | "all" =
    showParam && isShowId(showParam) ? showParam : "all";

  // Local state only for the text input (avoids re-render lag on every keystroke via URL)
  const [localQuery, setLocalQuery] = useState(queryParam);
  const [count, setCount] = useState(PAGE_SIZE);

  // Sync URL when filters change
  const updateUrl = useCallback(
    (show: ShowId | "all", q: string) => {
      const params = new URLSearchParams();
      if (show !== "all") params.set("show", show);
      if (q.trim()) params.set("q", q.trim());
      const qs = params.toString();
      router.replace(`/episodes${qs ? `?${qs}` : ""}`, { scroll: false });
    },
    [router]
  );

  function handleFilterChange(show: ShowId | "all") {
    setCount(PAGE_SIZE);
    updateUrl(show, localQuery);
  }

  function handleSearch(q: string) {
    setLocalQuery(q);
    setCount(PAGE_SIZE);
    updateUrl(active, q);
  }

  // Use URL query for filtering (source of truth), local state only for input value
  const query = localQuery;

  const searched = useMemo(() => {
    const filtered =
      active === "all" ? episodes : episodes.filter((ep) => ep.show === active);
    const normalizedQuery = query.trim().toLowerCase();
    if (!normalizedQuery) return filtered;
    return filtered.filter((ep) =>
      ep.title.toLowerCase().includes(normalizedQuery)
    );
  }, [episodes, active, query]);

  const displayed = searched.slice(0, count);
  const remaining = searched.length - displayed.length;

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

        <div style={{ height: "2px", background: "var(--forest)", marginBottom: "24px" }} />

        {/* Filtre émissions */}
        <ShowFilter active={active} onChange={handleFilterChange} />

        {/* Recherche */}
        <div style={{ marginTop: "16px" }}>
          <label htmlFor="episode-search" className="sr-only">
            Rechercher un épisode
          </label>
          <input
            id="episode-search"
            type="search"
            value={localQuery}
            onChange={(e) => handleSearch(e.target.value)}
            placeholder="Rechercher un épisode…"
            className="field-input"
            style={{ maxWidth: "400px" }}
          />
        </div>
      </div>

      {/* Résultats */}
      <p
        aria-live="polite"
        aria-atomic="true"
        className="section-label"
        style={{ marginBottom: "20px", minHeight: "1.2em" }}
      >
        {query
          ? `${searched.length} résultat${searched.length !== 1 ? "s" : ""} pour « ${query} »`
          : ""}
      </p>

      {/* Grille */}
      {displayed.length > 0 ? (
        <>
          <div className="episode-grid">
            {displayed.map((ep) => (
              <EpisodeCard key={ep.id} episode={ep} />
            ))}
          </div>

          {/* Voir plus */}
          {remaining > 0 && (
            <div style={{ textAlign: "center", marginTop: "48px" }}>
              <button
                onClick={() => setCount((c) => c + LOAD_MORE)}
                className="btn btn-ghost"
              >
                Voir {Math.min(LOAD_MORE, remaining)} épisode{remaining !== 1 ? "s" : ""} de plus
                <span style={{ opacity: 0.5 }}>({remaining} restant{remaining !== 1 ? "s" : ""})</span>
              </button>
            </div>
          )}
        </>
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
          {query
            ? `Aucun épisode ne correspond à « ${query} ».`
            : "Aucun épisode dans cette catégorie pour l'instant."}
        </p>
      )}
    </div>
  );
}
