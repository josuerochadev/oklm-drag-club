import { ImageResponse } from "next/og";
import { SHOW_CONFIG, isShowId } from "@/lib/shows";
import { loadOgFont } from "@/lib/utils";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const FOREST = "#111d10";

export default async function Image({
  params,
}: {
  params: Promise<{ show: string }>;
}) {
  const { show: showId } = await params;
  const showConfig = isShowId(showId) ? SHOW_CONFIG[showId] : SHOW_CONFIG.other;
  const accent = showConfig.colorHex;

  const fontData = await loadOgFont();
  const fonts = fontData
    ? [{ name: "Archivo Black", data: fontData, weight: 400 as const, style: "normal" as const }]
    : [];

  return new ImageResponse(
    (
      <div
        style={{
          background: FOREST,
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          padding: "64px 72px",
          justifyContent: "space-between",
          fontFamily: "Archivo Black, sans-serif",
        }}
      >
        {/* Badge émission */}
        <div style={{ display: "flex" }}>
          <div
            style={{
              background: accent,
              color: FOREST,
              fontSize: 13,
              fontWeight: 700,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              padding: "6px 14px",
              borderRadius: "2px",
            }}
          >
            {showConfig.abbr}
          </div>
        </div>

        {/* Nom de l'émission */}
        <div
          style={{
            color: accent,
            fontSize: showConfig.label.length > 20 ? 64 : 88,
            fontWeight: 900,
            letterSpacing: "-3px",
            lineHeight: 0.95,
            maxWidth: "960px",
          }}
        >
          {showConfig.label}
        </div>

        {/* Brand */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div
            style={{
              color: "rgba(255,255,255,0.9)",
              fontSize: 24,
              fontWeight: 900,
              letterSpacing: "-1px",
            }}
          >
            OKLM DRAG CLUB
          </div>
          <div
            style={{
              color: "rgba(255,255,255,0.3)",
              fontSize: 14,
              fontWeight: 500,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
            }}
          >
            Podcast drag & téléréalité
          </div>
        </div>
      </div>
    ),
    { ...size, fonts }
  );
}
