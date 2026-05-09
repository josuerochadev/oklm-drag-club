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
  aura: string;
  auraLight: string;
}

export const SHOW_CONFIG: Record<ShowId, ShowConfig> = {
  "drag-race-france": {
    id: "drag-race-france",
    label: "Drag Race France",
    aura: "#E8C088",
    auraLight: "rgba(232,192,136,0.35)",
  },
  dragula: {
    id: "dragula",
    label: "Dragula",
    aura: "#E0A088",
    auraLight: "rgba(224,160,136,0.35)",
  },
  "les-traitres-fr": {
    id: "les-traitres-fr",
    label: "Les Traîtres FR",
    aura: "#E89878",
    auraLight: "rgba(232,152,120,0.35)",
  },
  "ultime-drag-asmr": {
    id: "ultime-drag-asmr",
    label: "Ultime Drag ASMR",
    aura: "#B898C8",
    auraLight: "rgba(184,152,200,0.35)",
  },
  "fan-fiction": {
    id: "fan-fiction",
    label: "Fan Fiction",
    aura: "#E8A8B8",
    auraLight: "rgba(232,168,184,0.35)",
  },
  other: {
    id: "other",
    label: "Autre",
    aura: "#D4A088",
    auraLight: "rgba(212,160,136,0.35)",
  },
};

export const SHOWS_LIST = Object.values(SHOW_CONFIG).filter(
  (s) => s.id !== "other"
);
