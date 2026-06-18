import { Suspense } from "react";
import { fetchEpisodes } from "@/lib/rss";
import EpisodesClient from "@/components/EpisodesClient";

export const metadata = {
  title: "Épisodes — OKLM Drag Club",
  description: "Tous les épisodes du podcast OKLM Drag Club.",
  alternates: {
    canonical: "/episodes",
  },
};

export default async function EpisodesPage() {
  const episodes = await fetchEpisodes().catch(() => []);
  return (
    <Suspense>
      <EpisodesClient episodes={episodes} />
    </Suspense>
  );
}
