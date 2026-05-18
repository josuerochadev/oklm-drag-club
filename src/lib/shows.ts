export type ShowId =
  | "drag-race-france"
  | "dragula"
  | "les-traitres-fr"
  | "ultime-drag-asmr"
  | "fan-fiction"
  | "rpdr-global"
  | "other";

export interface ShowConfig {
  id: ShowId;
  label: string;
  abbr: string;
  color: string;      // CSS variable, e.g. 'var(--lime)'
  colorSoft: string;  // CSS variable pour fond doux
  badgeClass: string; // classe CSS badge
  /** Hex approximation of the oklch color — used where CSS variables are unavailable (OG image) */
  colorHex: string;
}

export const SHOW_CONFIG: Record<ShowId, ShowConfig> = {
  "drag-race-france": {
    id: "drag-race-france",
    label: "Drag Race France",
    abbr: "DRF",
    color: "var(--lime)",
    colorSoft: "var(--lime-soft)",
    badgeClass: "badge-lime",
    colorHex: "#9fd400",
  },
  dragula: {
    id: "dragula",
    label: "Dragula",
    abbr: "DRG",
    color: "var(--fuchsia)",
    colorSoft: "var(--fuchsia-soft)",
    badgeClass: "badge-fuchsia",
    colorHex: "#c94a9c",
  },
  "les-traitres-fr": {
    id: "les-traitres-fr",
    label: "Les Traîtres FR",
    abbr: "TRT",
    color: "var(--yellow)",
    colorSoft: "var(--yellow-soft)",
    badgeClass: "badge-yellow",
    colorHex: "#ede84a",
  },
  "ultime-drag-asmr": {
    id: "ultime-drag-asmr",
    label: "Ultime Drag ASMR",
    abbr: "ASMR",
    color: "var(--lime-soft)",
    colorSoft: "var(--lime-soft)",
    badgeClass: "badge-outline",
    colorHex: "#d4edb0",
  },
  "fan-fiction": {
    id: "fan-fiction",
    label: "Fan Fiction",
    abbr: "FAN",
    color: "var(--fuchsia-soft)",
    colorSoft: "var(--fuchsia-soft)",
    badgeClass: "badge-outline",
    colorHex: "#ead4ea",
  },
  "rpdr-global": {
    id: "rpdr-global",
    label: "RPDR Global All Stars",
    abbr: "GAS",
    color: "var(--yellow)",
    colorSoft: "var(--yellow-soft)",
    badgeClass: "badge-yellow",
    colorHex: "#ede84a",
  },
  other: {
    id: "other",
    label: "Autre",
    abbr: "—",
    color: "var(--white)",
    colorSoft: "var(--white)",
    badgeClass: "badge-outline",
    colorHex: "#9fd400",
  },
};

export const SHOWS_LIST = Object.values(SHOW_CONFIG).filter(
  (s) => s.id !== "other"
);

export function isShowId(value: string): value is ShowId {
  return Object.prototype.hasOwnProperty.call(SHOW_CONFIG, value);
}
