import type { MetadataRoute } from "next";
import { fetchEpisodes } from "@/lib/rss";
import { SITE_URL } from "@/lib/config";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const episodes = await fetchEpisodes().catch(() => []);

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: SITE_URL,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${SITE_URL}/episodes`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/about`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
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
