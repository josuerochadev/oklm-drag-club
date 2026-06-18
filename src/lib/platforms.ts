/**
 * Fetches episode links from Apple Podcasts and Deezer at build time.
 * Matched against RSS episodes by normalized title (slugify).
 */

import * as Sentry from "@sentry/nextjs";
import { slugify, SLUG_MAX_LENGTH } from "./utils";
import { PLATFORM_SHOW_URLS } from "./config";

const APPLE_PODCAST_ID = "1735072269";
const DEEZER_SHOW_ID = "1000926732";

export const SPOTIFY_URL = PLATFORM_SHOW_URLS.spotify;
export const APPLE_PODCASTS_URL = PLATFORM_SHOW_URLS.apple;
export const DEEZER_URL = PLATFORM_SHOW_URLS.deezer;
/** Lien vers la page show Amazon Music — pas d'API publique pour les épisodes */
export const AMAZON_SHOW_URL = PLATFORM_SHOW_URLS.amazon;

export interface PlatformLinks {
  applePodcastsUrl?: string;
  deezerUrl?: string;
}

async function fetchAppleLinks(): Promise<Map<string, string>> {
  const map = new Map<string, string>();
  const url = `https://itunes.apple.com/lookup?id=${APPLE_PODCAST_ID}&media=podcast&entity=podcastEpisode&limit=200&country=fr`;

  const res = await fetch(url, { next: { revalidate: 3600 } });
  if (!res.ok) return map;

  const data = (await res.json()) as {
    results?: { kind?: string; trackName?: string; trackViewUrl?: string }[];
  };

  for (const item of data.results ?? []) {
    if (item.kind !== "podcast-episode") continue;
    const slug = slugify(item.trackName ?? "").slice(0, SLUG_MAX_LENGTH);
    if (slug && item.trackViewUrl) {
      // Strip Apple tracking param &uo=4
      map.set(slug, item.trackViewUrl.replace(/&uo=\d+/, ""));
    }
  }

  return map;
}

const DEEZER_PAGE_SIZE = 100;
const DEEZER_MAX_PAGES = 20;

async function fetchDeezerLinks(): Promise<Map<string, string>> {
  const map = new Map<string, string>();
  let index = 0;
  let page = 0;

  while (page < DEEZER_MAX_PAGES) {
    const url = `https://api.deezer.com/podcast/${DEEZER_SHOW_ID}/episodes?limit=${DEEZER_PAGE_SIZE}&index=${index}`;
    const res = await fetch(url, { next: { revalidate: 3600 } });
    if (!res.ok) break;

    const data = (await res.json()) as {
      data?: { id?: number; title?: string }[];
    };
    const items = data.data ?? [];
    if (items.length === 0) break;

    for (const item of items) {
      const slug = slugify(item.title ?? "").slice(0, SLUG_MAX_LENGTH);
      if (slug && item.id) {
        map.set(slug, `https://www.deezer.com/episode/${item.id}`);
      }
    }

    // Deezer paginates by 100 — stop when we get a partial page
    if (items.length < DEEZER_PAGE_SIZE) break;
    index += DEEZER_PAGE_SIZE;
    page += 1;
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
    fetchAppleLinks().catch((err) => {
      Sentry.captureException(err, { tags: { platform: "apple" } });
      return new Map<string, string>();
    }),
    fetchDeezerLinks().catch((err) => {
      Sentry.captureException(err, { tags: { platform: "deezer" } });
      return new Map<string, string>();
    }),
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
