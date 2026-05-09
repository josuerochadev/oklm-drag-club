import { XMLParser } from "fast-xml-parser";
import type { ShowId } from "./shows";

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
    deezerUrl?: string;
    amazonUrl?: string;
    applePodcastsUrl?: string;
  };
}

const ROMAN_VALUES: [number, string][] = [
  [1000, "M"], [900, "CM"], [500, "D"], [400, "CD"],
  [100, "C"],  [90, "XC"],  [50, "L"],  [40, "XL"],
  [10, "X"],   [9, "IX"],   [5, "V"],   [4, "IV"],  [1, "I"],
];

export function toRoman(n: number): string {
  if (n <= 0) return String(n);
  let result = "";
  let remaining = n;
  for (const [value, numeral] of ROMAN_VALUES) {
    while (remaining >= value) {
      result += numeral;
      remaining -= value;
    }
  }
  return result;
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

/** Format HH:MM:SS or raw seconds to "Xh YYmin" or "YYmin" */
export function formatDuration(raw: string): string {
  if (!raw) return "";
  // Already in HH:MM:SS or MM:SS
  if (raw.includes(":")) {
    const parts = raw.split(":").map(Number);
    if (parts.length === 3) {
      const [h, m] = parts;
      if (h > 0) return `${h}h ${String(m).padStart(2, "0")}min`;
      return `${m}min`;
    }
    if (parts.length === 2) {
      const [m] = parts;
      return `${m}min`;
    }
  }
  // Raw seconds
  const secs = parseInt(raw, 10);
  if (!isNaN(secs)) {
    const h = Math.floor(secs / 3600);
    const m = Math.floor((secs % 3600) / 60);
    if (h > 0) return `${h}h ${String(m).padStart(2, "0")}min`;
    return `${m}min`;
  }
  return raw;
}

export function detectShow(title: string): ShowId {
  const lower = title.toLowerCase();
  if (lower.includes("drag race france") || lower.includes("drf")) return "drag-race-france";
  if (lower.includes("dragula")) return "dragula";
  if (lower.includes("traitre") || lower.includes("traître")) return "les-traitres-fr";
  if (lower.includes("asmr") || lower.includes("dragsmr") || lower.includes("ultime")) return "ultime-drag-asmr";
  if (lower.includes("fan fiction") || lower.includes("fanfic")) return "fan-fiction";
  return "other";
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function extractSpotifyUrl(item: any): string | undefined {
  const link: string = typeof item.link === "string" ? item.link : "";
  if (link.includes("spotify.com") || link.includes("podcasters.spotify.com")) return link;
  return undefined;
}

export async function fetchEpisodes(): Promise<Episode[]> {
  const RSS_URL = "https://anchor.fm/s/f3147f50/podcast/rss";

  let overrides: Overrides = {};
  try {
    const mod = await import("@/data/overrides.json");
    overrides = mod.default as Overrides;
  } catch {
    // overrides not found — fine
  }

  const response = await fetch(RSS_URL, { cache: "force-cache" });
  if (!response.ok) throw new Error(`RSS fetch failed: ${response.status}`);

  const xml = await response.text();
  const parser = new XMLParser({
    ignoreAttributes: false,
    attributeNamePrefix: "@_",
    parseAttributeValue: true,
  });

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const parsed: any = parser.parse(xml);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const items: any[] = parsed?.rss?.channel?.item ?? [];
  const channelImage: string =
    parsed?.rss?.channel?.["itunes:image"]?.["@_href"] ??
    parsed?.rss?.channel?.image?.url ??
    "";

  // Build slug → ensure uniqueness by appending index on collision
  const seenSlugs = new Map<string, number>();

  const episodes: Episode[] = items.map((item, index) => {
    const title: string = item.title ?? `Épisode ${index + 1}`;
    const baseSlug = slugify(title).slice(0, 72) || `episode-${index}`;

    // Deduplicate slug
    const count = seenSlugs.get(baseSlug) ?? 0;
    seenSlugs.set(baseSlug, count + 1);
    const id = count === 0 ? baseSlug : `${baseSlug}-${count + 1}`;

    const episodeNumber = items.length - index;
    const show = detectShow(title);

    const imageUrl: string =
      item["itunes:image"]?.["@_href"] ??
      item["media:content"]?.["@_url"] ??
      channelImage;

    const ov = overrides[id] ?? {};

    return {
      id,
      title,
      description: item.description ?? item["itunes:summary"] ?? "",
      pubDate: item.pubDate ?? "",
      duration: formatDuration(item["itunes:duration"] ?? ""),
      episodeNumber,
      romanNumeral: toRoman(episodeNumber),
      show,
      spotifyUrl: extractSpotifyUrl(item),
      applePodcastsUrl: ov.applePodcastsUrl,
      deezerUrl: ov.deezerUrl,
      amazonUrl: ov.amazonUrl,
      imageUrl,
    };
  });

  return episodes;
}
