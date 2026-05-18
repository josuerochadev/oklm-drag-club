import { ImageResponse } from "next/og";
import { SITE_DESCRIPTION } from "@/lib/config";
import { loadOgFont } from "@/lib/utils";

export const alt = "OKLM Drag Club — Podcast drag & téléréalité";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Hex approximations des couleurs oklch du design system
const FOREST = "#111d10";
const LIME = "#9fd400";
const FUCHSIA = "#c94a9c";
const YELLOW = "#ede84a";

export default async function Image() {
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
        {/* Bande de couleurs décorative */}
        <div style={{ display: "flex", gap: "6px" }}>
          {[LIME, FUCHSIA, YELLOW, LIME].map((color, i) => (
            <div
              key={i}
              style={{
                width: "32px",
                height: "6px",
                background: color,
                borderRadius: "1px",
              }}
            />
          ))}
        </div>

        {/* Titre principal */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "20px",
          }}
        >
          <div style={{ display: "flex", flexDirection: "column", gap: "0px" }}>
            <div
              style={{
                color: LIME,
                fontSize: 96,
                fontWeight: 900,
                letterSpacing: "-4px",
                lineHeight: 0.9,
              }}
            >
              OKLM
            </div>
            <div
              style={{
                color: LIME,
                fontSize: 96,
                fontWeight: 900,
                letterSpacing: "-4px",
                lineHeight: 0.9,
              }}
            >
              DRAG CLUB
            </div>
          </div>
          <div
            style={{
              color: "rgba(255,255,255,0.45)",
              fontSize: 22,
              fontWeight: 400,
              lineHeight: 1.5,
              maxWidth: "600px",
            }}
          >
            {SITE_DESCRIPTION}
          </div>
        </div>

        {/* Label bas */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
          }}
        >
          <div
            style={{
              color: "rgba(255,255,255,0.25)",
              fontSize: 13,
              fontWeight: 700,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
            }}
          >
            Podcast · Drag & Téléréalité
          </div>
        </div>
      </div>
    ),
    { ...size, fonts }
  );
}
