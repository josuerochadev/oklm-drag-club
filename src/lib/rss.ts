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
  season?: string;
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

/**
 * Extrait un identifiant de saison à partir du titre (ex. "S03", "Titans S2").
 * Retourne undefined si aucune saison n'est détectée.
 */
export function detectSeason(title: string): string | undefined {
  const lower = title.toLowerCase();

  // "Titans S2E3" → "Titans S2"
  const titansMatch = lower.match(/titans\s*s(\d+)/);
  if (titansMatch) return `Titans S${titansMatch[1]}`;

  // "All Stars FR S1E2" → "All Stars S1"
  const allStarsMatch = lower.match(/all\s*stars?\s*fr?\s*s(\d+)/i);
  if (allStarsMatch) return `All Stars S${allStarsMatch[1]}`;

  // Standard "S03E01", "S3 E03", "S03", "S3"
  const seasonMatch = lower.match(/s0*(\d+)/);
  if (seasonMatch) return `S${seasonMatch[1]}`;

  return undefined;
}

const ALLOWED_TAGS = new Set(["p", "br", "b", "strong", "em", "i", "ul", "ol", "li", "span"]);

/** Décode les entités HTML numériques (&#106; → j, &#x6A; → j) pour neutraliser les bypasses comme &#106;avascript:. */
function decodeNumericEntities(str: string): string {
  return str
    .replace(/&#(\d+);/g, (_, code) => String.fromCharCode(Number(code)))
    .replace(/&#x([0-9a-fA-F]+);/g, (_, hex) => String.fromCharCode(parseInt(hex, 16)));
}

function sanitizeHtml(html: string): string {
  return html.replace(/<(\/?)(\w+)([^>]*)>/g, (_, slash, tag, attrs) => {
    const t = tag.toLowerCase();
    if (t === "a") {
      if (slash) return "</a>";
      const rawHref = /href="([^"]*)"/.exec(attrs)?.[1] ?? "";
      const href = decodeNumericEntities(rawHref).trim();
      if (!href || /^javascript:/i.test(href)) return "";
      return `<a href="${rawHref}" target="_blank" rel="noopener noreferrer">`;
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

  const MIN_EXPECTED_EPISODES = 10;
  if (items.length < MIN_EXPECTED_EPISODES) {
    throw new Error(
      `RSS returned only ${items.length} episodes (expected at least ${MIN_EXPECTED_EPISODES}). The RSS feed may be broken.`
    );
  }

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
    const season = detectSeason(title);

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
      season,
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
