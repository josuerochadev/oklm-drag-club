import { cache } from "react";
import { XMLParser } from "fast-xml-parser";
import type { ShowId } from "./shows";
import { fetchPlatformLinks, AMAZON_SHOW_URL } from "./platforms";
import { slugify, SLUG_MAX_LENGTH, toRoman, formatDuration } from "./utils";
import { RSS_URL } from "./config";

export interface Episode {
  id: string;
  title: string;
  description: string;
  pubDate: string;
  duration: string;
  episodeNumber: number;
  romanNumeral: string;
  show: ShowId;
  spotifyUrl?: string;
  applePodcastsUrl?: string;
  deezerUrl?: string;
  amazonUrl?: string;
  imageUrl?: string;
}

interface Overrides {
  [episodeId: string]: {
    show?: ShowId;
    deezerUrl?: string;
    amazonUrl?: string;
    applePodcastsUrl?: string;
  };
}

interface RssItem {
  title?: string;
  description?: string;
  "itunes:summary"?: string;
  pubDate?: string;
  link?: string;
  "itunes:duration"?: string | number;
  "itunes:image"?: { "@_href"?: string };
  "media:content"?: { "@_url"?: string };
}

interface RssFeed {
  rss?: {
    channel?: {
      item?: RssItem | RssItem[];
      "itunes:image"?: { "@_href"?: string };
      image?: { url?: string };
    };
  };
}

export function detectShow(title: string): ShowId {
  const lower = title.toLowerCase();
  if (
    lower.includes("drag race france") ||
    lower.includes("drf") ||
    lower.includes("dragrace") ||
    lower.includes("all stars fr") ||
    lower.includes("allstar fr") ||
    lower.includes("asfr")
  ) return "drag-race-france";
  if (lower.includes("dragula")) return "dragula";
  if (lower.includes("traitre") || lower.includes("traître")) return "les-traitres-fr";
  if (lower.includes("asmr") || lower.includes("dragsmr") || lower.includes("ultime")) return "ultime-drag-asmr";
  if (lower.includes("fan fiction") || lower.includes("fanfic") || lower.includes("ssaw")) return "fan-fiction";
  if (lower.includes("rpdr") || lower.includes("global allstars") || lower.includes("global all stars")) return "rpdr-global";
  return "other";
}

const ALLOWED_TAGS = new Set(["p", "br", "b", "strong", "em", "i", "ul", "ol", "li", "span"]);

function sanitizeHtml(html: string): string {
  return html.replace(/<(\/?)(\w+)([^>]*)>/g, (_, slash, tag, attrs) => {
    const t = tag.toLowerCase();
    if (t === "a") {
      if (slash) return "</a>";
      const href = /href="([^"]*)"/.exec(attrs)?.[1] ?? "";
      if (!href || /^javascript:/i.test(href)) return "";
      return `<a href="${href}" target="_blank" rel="noopener noreferrer">`;
    }
    return ALLOWED_TAGS.has(t) ? `<${slash}${t}>` : "";
  });
}

function extractSpotifyUrl(item: RssItem): string | undefined {
  const link = typeof item.link === "string" ? item.link : "";
  if (link.includes("spotify.com") || link.includes("podcasters.spotify.com")) return link;
  return undefined;
}

export const fetchEpisodes = cache(async (): Promise<Episode[]> => {
  let overrides: Overrides = {};
  try {
    const mod = await import("@/data/overrides.json");
    overrides = mod.default as Overrides;
  } catch {
    // overrides not found — fine
  }

  const [response, platformLinks] = await Promise.all([
    fetch(RSS_URL, { next: { revalidate: 3600 } }),
    fetchPlatformLinks().catch(() => new Map()),
  ]);
  if (!response.ok) throw new Error(`RSS fetch failed: ${response.status}`);

  const xml = await response.text();
  const parser = new XMLParser({
    ignoreAttributes: false,
    attributeNamePrefix: "@_",
    parseAttributeValue: true,
  });

  const parsed: RssFeed = parser.parse(xml);
  const rawItems = parsed?.rss?.channel?.item ?? [];
  const items: RssItem[] = Array.isArray(rawItems) ? rawItems : [rawItems];
  const channelImage: string =
    parsed?.rss?.channel?.["itunes:image"]?.["@_href"] ??
    parsed?.rss?.channel?.image?.url ??
    "";

  // Build slug → ensure uniqueness by appending index on collision
  const seenSlugs = new Map<string, number>();

  const episodes: Episode[] = items.map((item, index) => {
    const title: string = item.title ?? `Épisode ${index + 1}`;
    const baseSlug = slugify(title).slice(0, SLUG_MAX_LENGTH) || `episode-${index}`;

    // Deduplicate slug
    const count = seenSlugs.get(baseSlug) ?? 0;
    seenSlugs.set(baseSlug, count + 1);
    const id = count === 0 ? baseSlug : `${baseSlug}-${count + 1}`;

    const episodeNumber = items.length - index;
    const ov = overrides[id] ?? {};
    const show: ShowId = ov.show ?? detectShow(title);

    const imageUrl: string =
      item["itunes:image"]?.["@_href"] ??
      item["media:content"]?.["@_url"] ??
      channelImage;

    const platform = platformLinks.get(baseSlug) ?? {};

    return {
      id,
      title,
      description: sanitizeHtml(item.description ?? item["itunes:summary"] ?? ""),
      pubDate: item.pubDate ?? "",
      duration: formatDuration(String(item["itunes:duration"] ?? "")),
      episodeNumber,
      romanNumeral: toRoman(episodeNumber),
      show,
      spotifyUrl: extractSpotifyUrl(item),
      // overrides.json prend le dessus sur les APIs (correction manuelle possible)
      applePodcastsUrl: ov.applePodcastsUrl ?? platform.applePodcastsUrl,
      deezerUrl: ov.deezerUrl ?? platform.deezerUrl,
      amazonUrl: ov.amazonUrl ?? AMAZON_SHOW_URL,
      imageUrl,
    };
  });

  return episodes;
});
