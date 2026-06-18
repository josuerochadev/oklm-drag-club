import { ImageResponse } from "next/og";
import { fetchEpisodes } from "@/lib/rss";
import { SHOW_CONFIG } from "@/lib/shows";
import { loadOgFont } from "@/lib/utils";
import { OgLayout, OgBadge, OgBrand, OG_SIZE, OG_CONTENT_TYPE, ogFonts } from "@/lib/og-shared";

export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default async function Image({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const episodes = await fetchEpisodes().catch(() => []);
  const episode = episodes.find((ep) => ep.id === id);

  const title = episode?.title ?? "OKLM Drag Club";
  const showId = episode?.show ?? "other";
  const showConfig = SHOW_CONFIG[showId];
  const accent = showConfig.colorHex;

  const fontSize = title.length > 60 ? 44 : title.length > 40 ? 56 : 68;

  const fontData = await loadOgFont();

  return new ImageResponse(
    (
      <OgLayout>
        <OgBadge label={showConfig.abbr} color={accent} />

        <div
          style={{
            color: accent,
            fontSize,
            fontWeight: 900,
            letterSpacing: "-2px",
            lineHeight: 1.05,
            maxWidth: "960px",
          }}
        >
          {title}
        </div>

        <OgBrand subtitle="Podcast drag & téléréalité" />
      </OgLayout>
    ),
    { ...size, fonts: ogFonts(fontData) }
  );
}
