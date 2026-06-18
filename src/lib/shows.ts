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
  /** Courte description éditoriale — utilisée sur la page À propos. */
  description: string;
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
    description: "Le concours de drag le plus suivi en France, saison après saison. Technique, personnalités, drama — analysés épisode par épisode.",
    color: "var(--lime)",
    colorSoft: "var(--lime-soft)",
    badgeClass: "badge-lime",
    colorHex: "#9fd400",
  },
  dragula: {
    id: "dragula",
    label: "Dragula",
    abbr: "DRG",
    description: "L'anti-Drag Race. Plus sombre, plus extrême, plus artistique. Un univers à part entière qui mérite qu'on s'y attarde.",
    color: "var(--fuchsia)",
    colorSoft: "var(--fuchsia-soft)",
    badgeClass: "badge-fuchsia",
    colorHex: "#c94a9c",
  },
  "les-traitres-fr": {
    id: "les-traitres-fr",
    label: "Les Traîtres FR",
    abbr: "TRT",
    description: "La téléréalité sociale dans ce qu'elle a de plus fascinant : la manipulation, la confiance, la trahison. On décortique chaque conseil.",
    color: "var(--yellow)",
    colorSoft: "var(--yellow-soft)",
    badgeClass: "badge-yellow",
    colorHex: "#ede84a",
  },
  "ultime-drag-asmr": {
    id: "ultime-drag-asmr",
    label: "Ultime Drag ASMR",
    abbr: "ASMR",
    description: "Un format doux pour un univers drag qu'on n'entend pas assez. À écouter les yeux fermés.",
    color: "var(--lime-soft-fixed)",
    colorSoft: "var(--lime-soft)",
    badgeClass: "badge-outline",
    colorHex: "#d4edb0",
  },
  "fan-fiction": {
    id: "fan-fiction",
    label: "Fan Fiction",
    abbr: "FAN",
    description: "Et si on réécrivait les règles ? Une saison imaginaire, des queens inventées, un jeu de rôle éditorial pour le plaisir.",
    color: "var(--fuchsia-soft-fixed)",
    colorSoft: "var(--fuchsia-soft)",
    badgeClass: "badge-outline",
    colorHex: "#ead4ea",
  },
  "rpdr-global": {
    id: "rpdr-global",
    label: "RPDR Global All Stars",
    abbr: "GAS",
    description: "Les meilleures queens du monde entier réunies pour une saison All Stars internationale. On analyse les dynamiques, les alliances et les performances.",
    color: "var(--yellow)",
    colorSoft: "var(--yellow-soft)",
    badgeClass: "badge-yellow",
    colorHex: "#ede84a",
  },
  other: {
    id: "other",
    label: "Autre",
    abbr: "—",
    description: "",
    color: "var(--white-fixed)",
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
