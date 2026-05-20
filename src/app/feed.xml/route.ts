import { fetchEpisodes } from "@/lib/rss";
import { SITE_URL, SITE_NAME, SITE_DESCRIPTION } from "@/lib/config";

function escapeXml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

export async function GET() {
  const episodes = await fetchEpisodes().catch(() => []);

  const items = episodes
    .map((ep) => {
      const plainDescription = ep.description.replace(/<[^>]*>/g, "").slice(0, 300);
      const link = `${SITE_URL}/episodes/${ep.id}`;
      return `    <item>
      <title>${escapeXml(ep.title)}</title>
      <link>${link}</link>
      <guid isPermaLink="true">${link}</guid>
      <description>${escapeXml(plainDescription)}</description>
      <pubDate>${ep.pubDate ? new Date(ep.pubDate).toUTCString() : ""}</pubDate>
    </item>`;
    })
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escapeXml(SITE_NAME)}</title>
    <link>${SITE_URL}</link>
    <description>${escapeXml(SITE_DESCRIPTION)}</description>
    <language>fr</language>
    <atom:link href="${SITE_URL}/feed.xml" rel="self" type="application/rss+xml"/>
    <lastBuildDate>${episodes[0]?.pubDate ? new Date(episodes[0].pubDate).toUTCString() : new Date().toUTCString()}</lastBuildDate>
${items}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "s-maxage=3600, stale-while-revalidate",
    },
  });
}
