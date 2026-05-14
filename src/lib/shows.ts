export type ShowId =
  | "drag-race-france"
  | "dragula"
  | "les-traitres-fr"
  | "ultime-drag-asmr"
  | "fan-fiction"
  | "other";

export interface ShowConfig {
  id: ShowId;
  label: string;
  abbr: string;
  color: string;      // CSS variable, e.g. 'var(--lime)'
  colorSoft: string;  // CSS variable pour fond doux
  badgeClass: string; // classe CSS badge
}

export const SHOW_CONFIG: Record<ShowId, ShowConfig> = {
  "drag-race-france": {
    id: "drag-race-france",
    label: "Drag Race France",
    abbr: "DRF",
    color: "var(--lime)",
    colorSoft: "var(--lime-soft)",
    badgeClass: "badge-lime",
  },
  dragula: {
    id: "dragula",
    label: "Dragula",
    abbr: "DRG",
    color: "var(--fuchsia)",
    colorSoft: "var(--fuchsia-soft)",
    badgeClass: "badge-fuchsia",
  },
  "les-traitres-fr": {
    id: "les-traitres-fr",
    label: "Les Traîtres FR",
    abbr: "TRT",
    color: "var(--yellow)",
    colorSoft: "var(--yellow-soft)",
    badgeClass: "badge-yellow",
  },
  "ultime-drag-asmr": {
    id: "ultime-drag-asmr",
    label: "Ultime Drag ASMR",
    abbr: "ASMR",
    color: "var(--lime-soft)",
    colorSoft: "var(--lime-soft)",
    badgeClass: "badge-outline",
  },
  "fan-fiction": {
    id: "fan-fiction",
    label: "Fan Fiction",
    abbr: "FAN",
    color: "var(--fuchsia-soft)",
    colorSoft: "var(--fuchsia-soft)",
    badgeClass: "badge-outline",
  },
  other: {
    id: "other",
    label: "Autre",
    abbr: "—",
    color: "var(--white)",
    colorSoft: "var(--white)",
    badgeClass: "badge-outline",
  },
};

export const SHOWS_LIST = Object.values(SHOW_CONFIG).filter(
  (s) => s.id !== "other"
);
