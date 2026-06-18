import { ImageResponse } from "next/og";
import { SITE_DESCRIPTION } from "@/lib/config";
import { loadOgFont } from "@/lib/utils";
import { OgLayout, LIME_HEX, FUCHSIA_HEX, YELLOW_HEX, OG_SIZE, OG_CONTENT_TYPE, ogFonts } from "@/lib/og-shared";

export const alt = "OKLM Drag Club — Podcast drag & téléréalité";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default async function Image() {
  const fontData = await loadOgFont();

  return new ImageResponse(
    (
      <OgLayout>
        {/* Bande de couleurs décorative */}
        <div style={{ display: "flex", gap: "6px" }}>
          {[LIME_HEX, FUCHSIA_HEX, YELLOW_HEX, LIME_HEX].map((color, i) => (
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
        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: "0px" }}>
            <div style={{ color: LIME_HEX, fontSize: 96, fontWeight: 900, letterSpacing: "-4px", lineHeight: 0.9 }}>
              OKLM
            </div>
            <div style={{ color: LIME_HEX, fontSize: 96, fontWeight: 900, letterSpacing: "-4px", lineHeight: 0.9 }}>
              DRAG CLUB
            </div>
          </div>
          <div style={{ color: "rgba(255,255,255,0.45)", fontSize: 22, fontWeight: 400, lineHeight: 1.5, maxWidth: "600px" }}>
            {SITE_DESCRIPTION}
          </div>
        </div>

        {/* Label bas */}
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <div style={{ color: "rgba(255,255,255,0.25)", fontSize: 13, fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase" }}>
            Podcast · Drag & Téléréalité
          </div>
        </div>
      </OgLayout>
    ),
    { ...size, fonts: ogFonts(fontData) }
  );
}
