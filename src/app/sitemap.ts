import type { MetadataRoute } from "next";
import { fetchEpisodes } from "@/lib/rss";
import { SITE_URL } from "@/lib/config";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const episodes = await fetchEpisodes().catch(() => []);

  // Date du dernier épisode : reflète fidèlement la fraîcheur des pages dynamiques.
  // /about est une page éditoriale statique — lastModified omis pour éviter les faux positifs.
  const latestEpisodeDate = episodes[0]?.pubDate ? new Date(episodes[0].pubDate) : undefined;

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: SITE_URL,
      lastModified: latestEpisodeDate,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${SITE_URL}/episodes`,
      lastModified: latestEpisodeDate,
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/about`,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${SITE_URL}/mentions-legales`,
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${SITE_URL}/confidentialite`,
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${SITE_URL}/feed.xml`,
      changeFrequency: "daily",
      priority: 0.4,
    },
  ];

  const episodeRoutes: MetadataRoute.Sitemap = episodes.map((ep) => ({
    url: `${SITE_URL}/episodes/${ep.id}`,
    lastModified: ep.pubDate ? new Date(ep.pubDate) : new Date(),
    changeFrequency: "never" as const,
    priority: 0.6,
  }));

  return [...staticRoutes, ...episodeRoutes];
}
