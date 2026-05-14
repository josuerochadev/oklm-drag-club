/**
 * Fetches episode links from Apple Podcasts and Deezer at build time.
 * Matched against RSS episodes by normalized title (slugify).
 */

const APPLE_PODCAST_ID = "1735072269";
const DEEZER_SHOW_ID = "1000926732";

/** Lien vers la page show Amazon Music — pas d'API publique pour les épisodes */
export const AMAZON_SHOW_URL =
  "https://music.amazon.fr/podcasts/e265f2dd-51a6-4596-9f50-2a77094fa1a4/oklm-drag-club";

export interface PlatformLinks {
  applePodcastsUrl?: string;
  deezerUrl?: string;
}

// Duplicated from rss.ts to avoid circular dependency
function slugify(text: string): string {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

async function fetchAppleLinks(): Promise<Map<string, string>> {
  const map = new Map<string, string>();
  const url = `https://itunes.apple.com/lookup?id=${APPLE_PODCAST_ID}&media=podcast&entity=podcastEpisode&limit=200&country=fr`;

  const res = await fetch(url, { cache: "force-cache" });
  if (!res.ok) return map;

  const data = (await res.json()) as {
    results?: { kind?: string; trackName?: string; trackViewUrl?: string }[];
  };

  for (const item of data.results ?? []) {
    if (item.kind !== "podcast-episode") continue;
    const slug = slugify(item.trackName ?? "").slice(0, 72);
    if (slug && item.trackViewUrl) {
      // Strip Apple tracking param &uo=4
      map.set(slug, item.trackViewUrl.replace(/&uo=\d+/, ""));
    }
  }

  return map;
}

async function fetchDeezerLinks(): Promise<Map<string, string>> {
  const map = new Map<string, string>();
  let index = 0;

  while (true) {
    const url = `https://api.deezer.com/podcast/${DEEZER_SHOW_ID}/episodes?limit=100&index=${index}`;
    const res = await fetch(url, { cache: "force-cache" });
    if (!res.ok) break;

    const data = (await res.json()) as {
      data?: { id?: number; title?: string }[];
    };
    const items = data.data ?? [];
    if (items.length === 0) break;

    for (const item of items) {
      const slug = slugify(item.title ?? "").slice(0, 72);
      if (slug && item.id) {
        map.set(slug, `https://www.deezer.com/episode/${item.id}`);
      }
    }

    // Deezer paginates by 100 — stop when we get a partial page
    if (items.length < 100) break;
    index += 100;
  }

  return map;
}

/**
 * Returns a Map<slugifiedTitle, PlatformLinks> for all episodes found
 * on Apple Podcasts and Deezer. Errors are swallowed — a failing platform
 * simply returns no links rather than breaking the build.
 */
export async function fetchPlatformLinks(): Promise<Map<string, PlatformLinks>> {
  const [appleMap, deezerMap] = await Promise.all([
    fetchAppleLinks().catch(() => new Map<string, string>()),
    fetchDeezerLinks().catch(() => new Map<string, string>()),
  ]);

  const result = new Map<string, PlatformLinks>();
  const allSlugs = new Set([...appleMap.keys(), ...deezerMap.keys()]);

  for (const slug of allSlugs) {
    result.set(slug, {
      applePodcastsUrl: appleMap.get(slug),
      deezerUrl: deezerMap.get(slug),
    });
  }

  return result;
}
