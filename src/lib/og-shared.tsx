import type { ReactNode } from "react";

export const OG_SIZE = { width: 1200, height: 630 };
export const OG_CONTENT_TYPE = "image/png";

export const FOREST_HEX = "#111d10";
export const LIME_HEX = "#9fd400";
export const FUCHSIA_HEX = "#c94a9c";
export const YELLOW_HEX = "#ede84a";

export function OgLayout({ children }: { children: ReactNode }) {
  return (
    <div
      style={{
        background: FOREST_HEX,
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        padding: "64px 72px",
        justifyContent: "space-between",
        fontFamily: "Archivo Black, sans-serif",
      }}
    >
      {children}
    </div>
  );
}

export function OgBrand({ subtitle }: { subtitle?: string }) {
  return (
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
      {subtitle && (
        <div
          style={{
            color: "rgba(255,255,255,0.3)",
            fontSize: 14,
            fontWeight: 500,
            letterSpacing: "0.1em",
            textTransform: "uppercase",
          }}
        >
          {subtitle}
        </div>
      )}
    </div>
  );
}

export function OgBadge({ label, color }: { label: string; color: string }) {
  return (
    <div style={{ display: "flex" }}>
      <div
        style={{
          background: color,
          color: FOREST_HEX,
          fontSize: 13,
          fontWeight: 700,
          letterSpacing: "0.18em",
          textTransform: "uppercase",
          padding: "6px 14px",
          borderRadius: "2px",
        }}
      >
        {label}
      </div>
    </div>
  );
}

export function ogFonts(fontData: ArrayBuffer | null) {
  return fontData
    ? [{ name: "Archivo Black", data: fontData, weight: 400 as const, style: "normal" as const }]
    : [];
}
