import { ImageResponse } from "next/og";
import { SHOW_CONFIG, SHOWS_LIST, isShowId } from "@/lib/shows";
import { loadOgFont } from "@/lib/utils";
import { OgLayout, OgBadge, OgBrand, OG_SIZE, OG_CONTENT_TYPE, ogFonts } from "@/lib/og-shared";

export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export function generateStaticParams() {
  return SHOWS_LIST.map((show) => ({ show: show.id }));
}

export default async function Image({
  params,
}: {
  params: Promise<{ show: string }>;
}) {
  const { show: showId } = await params;
  const showConfig = isShowId(showId) ? SHOW_CONFIG[showId] : SHOW_CONFIG.other;
  const accent = showConfig.colorHex;

  const fontData = await loadOgFont();

  return new ImageResponse(
    (
      <OgLayout>
        <OgBadge label={showConfig.abbr} color={accent} />

        <div
          style={{
            color: accent,
            fontSize: 80,
            fontWeight: 900,
            letterSpacing: "-3px",
            lineHeight: 1.0,
            maxWidth: "960px",
          }}
        >
          {showConfig.label}
        </div>

        <OgBrand subtitle="Podcast drag & téléréalité" />
      </OgLayout>
    ),
    { ...size, fonts: ogFonts(fontData) }
  );
}
