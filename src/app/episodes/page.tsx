import { fetchEpisodes } from "@/lib/rss";
import EpisodesClient from "@/components/EpisodesClient";

export const metadata = {
  title: "Épisodes — OKLM Drag Club",
  description: "Tous les épisodes du podcast OKLM Drag Club.",
};

export default async function EpisodesPage() {
  const episodes = await fetchEpisodes().catch(() => []);
  return <EpisodesClient episodes={episodes} />;
}
