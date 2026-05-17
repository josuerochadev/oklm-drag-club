import { ImageResponse } from "next/og";
import { fetchEpisodes } from "@/lib/rss";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Hex approximations des couleurs oklch par émission
const SHOW_ACCENT: Record<string, string> = {
  "drag-race-france": "#9fd400",
  dragula: "#c94a9c",
  "les-traitres-fr": "#ede84a",
  "ultime-drag-asmr": "#d4edb0",
  "fan-fiction": "#ead4ea",
  other: "#9fd400",
};

const SHOW_LABEL: Record<string, string> = {
  "drag-race-france": "DRF",
  dragula: "DRG",
  "les-traitres-fr": "TRT",
  "ultime-drag-asmr": "ASMR",
  "fan-fiction": "FAN",
  other: "—",
};

const FOREST = "#111d10";

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
  const accent = SHOW_ACCENT[showId] ?? "#9fd400";
  const abbr = SHOW_LABEL[showId] ?? "OKLM";

  // Adapter la taille du titre selon sa longueur
  const fontSize = title.length > 60 ? 44 : title.length > 40 ? 56 : 68;

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
          fontFamily: "sans-serif",
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
            {abbr}
          </div>
        </div>

        {/* Titre épisode */}
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
    { ...size }
  );
}
