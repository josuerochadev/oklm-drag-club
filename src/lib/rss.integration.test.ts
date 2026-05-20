import { describe, it, expect, vi, beforeEach } from "vitest";
import { detectSeason } from "./rss";

// We need to test fetchEpisodes with a mocked RSS feed.
// Since fetchEpisodes uses cache() and fetch(), we mock fetch globally.

const MINIMAL_RSS = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:itunes="http://www.itunes.com/dtds/podcast-1.0.dtd">
  <channel>
    <title>Test Podcast</title>
    <itunes:image href="https://example.com/cover.jpg"/>
    ${Array.from({ length: 15 }, (_, i) => `
    <item>
      <title>Drag Race France S03E${String(i + 1).padStart(2, "0")}</title>
      <description>&lt;p&gt;Description épisode ${i + 1}&lt;/p&gt;</description>
      <pubDate>Mon, ${String(i + 1).padStart(2, "0")} Jan 2025 10:00:00 GMT</pubDate>
      <link>https://open.spotify.com/episode/test${i}</link>
      <itunes:duration>01:${String(30 + i).padStart(2, "0")}:00</itunes:duration>
    </item>`).join("")}
  </channel>
</rss>`;

const EMPTY_RSS = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0"><channel><title>Empty</title></channel></rss>`;

const FEW_ITEMS_RSS = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:itunes="http://www.itunes.com/dtds/podcast-1.0.dtd">
  <channel>
    <title>Test</title>
    <item><title>Only One</title><pubDate>Mon, 01 Jan 2025 10:00:00 GMT</pubDate></item>
  </channel>
</rss>`;

const XSS_RSS = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:itunes="http://www.itunes.com/dtds/podcast-1.0.dtd">
  <channel>
    <title>XSS Test</title>
    ${Array.from({ length: 12 }, (_, i) => `
    <item>
      <title>Episode ${i + 1}</title>
      <description>&lt;script&gt;alert('xss')&lt;/script&gt;&lt;p&gt;Safe &lt;a href=&quot;&#106;avascript:alert(1)&quot;&gt;link&lt;/a&gt;&lt;/p&gt;</description>
      <pubDate>Mon, ${String(i + 1).padStart(2, "0")} Jan 2025 10:00:00 GMT</pubDate>
    </item>`).join("")}
  </channel>
</rss>`;

// Dynamic import so we can mock fetch before module loads
async function loadFetchEpisodes() {
  // Clear module cache to get fresh import with current fetch mock
  vi.resetModules();
  const mod = await import("./rss");
  return mod.fetchEpisodes;
}

function mockFetch(rssBody: string, status = 200) {
  vi.stubGlobal("fetch", vi.fn().mockImplementation((url: string) => {
    if (typeof url === "string" && url.includes("anchor.fm")) {
      return Promise.resolve({
        ok: status >= 200 && status < 300,
        status,
        text: () => Promise.resolve(rssBody),
      });
    }
    // Platform API calls (Apple, Deezer) — return empty
    return Promise.resolve({
      ok: true,
      status: 200,
      json: () => Promise.resolve({ results: [], data: [], total: 0 }),
      text: () => Promise.resolve("{}"),
    });
  }));
}

beforeEach(() => {
  vi.restoreAllMocks();
});

describe("fetchEpisodes integration", () => {
  it("parses a valid RSS feed and returns episodes", async () => {
    mockFetch(MINIMAL_RSS);
    const fetchEpisodes = await loadFetchEpisodes();
    const episodes = await fetchEpisodes();

    expect(episodes.length).toBe(15);
    expect(episodes[0].show).toBe("drag-race-france");
    expect(episodes[0].spotifyUrl).toContain("spotify.com");
    expect(episodes[0].duration).toMatch(/\d+h?\s?\d*min/);
  });

  it("throws on RSS fetch failure", async () => {
    mockFetch("", 500);
    const fetchEpisodes = await loadFetchEpisodes();
    await expect(fetchEpisodes()).rejects.toThrow("RSS fetch failed");
  });

  it("throws when RSS returns too few episodes", async () => {
    mockFetch(FEW_ITEMS_RSS);
    const fetchEpisodes = await loadFetchEpisodes();
    await expect(fetchEpisodes()).rejects.toThrow("expected at least");
  });

  it("strips dangerous HTML from descriptions", async () => {
    mockFetch(XSS_RSS);
    const fetchEpisodes = await loadFetchEpisodes();
    const episodes = await fetchEpisodes();

    for (const ep of episodes) {
      expect(ep.description).not.toContain("<script>");
      expect(ep.description).not.toContain("javascript:");
    }
    // Safe <p> tags should be preserved
    expect(episodes[0].description).toContain("<p>");
  });

  it("handles empty RSS channel gracefully", async () => {
    mockFetch(EMPTY_RSS);
    const fetchEpisodes = await loadFetchEpisodes();
    // 0 items < MIN_EXPECTED_EPISODES → should throw
    await expect(fetchEpisodes()).rejects.toThrow("expected at least");
  });

  it("assigns unique slugs to episodes with identical titles", async () => {
    const duplicateRss = `<?xml version="1.0" encoding="UTF-8"?>
    <rss version="2.0" xmlns:itunes="http://www.itunes.com/dtds/podcast-1.0.dtd">
      <channel><title>Test</title>
        ${Array.from({ length: 12 }, () => `
        <item>
          <title>Same Title</title>
          <pubDate>Mon, 01 Jan 2025 10:00:00 GMT</pubDate>
        </item>`).join("")}
      </channel>
    </rss>`;
    mockFetch(duplicateRss);
    const fetchEpisodes = await loadFetchEpisodes();
    const episodes = await fetchEpisodes();

    const ids = episodes.map((ep) => ep.id);
    const uniqueIds = new Set(ids);
    expect(uniqueIds.size).toBe(ids.length);
  });
});

describe("detectSeason", () => {
  it.each([
    ["Drag Race France S03E01", "S3"],
    ["DragRace France S03 Portraits des queens", "S3"],
    ["DRAGULA TITANS S2E8", "Titans S2"],
    ["DRAGULA Titans S2E1", "Titans S2"],
    ["All Stars FR S1E7", "All Stars S1"],
    ["AllStar Fr S1E1", "All Stars S1"],
    ["SSAW S01E04", "S1"],
    ["SSAW S01 Finale", "S1"],
    ["Les Traitres FR Ep03 PART 1", undefined],
    ["Ultime Drag ASMR v.2", undefined],
    ["POT-POURRI NEWS", undefined],
    ["MEET THE MONSTERS", undefined],
  ] as const)('detectSeason("%s") → %s', (title, expected) => {
    expect(detectSeason(title)).toBe(expected);
  });
});
