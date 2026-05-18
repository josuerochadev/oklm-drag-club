// 72 caractères : les titres OKLM sont suffisamment discriminants à cette longueur,
// ce qui évite les collisions tout en gardant des URLs raisonnables.
export const SLUG_MAX_LENGTH = 72;

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

const ROMAN_VALUES: [number, string][] = [
  [1000, "M"], [900, "CM"], [500, "D"], [400, "CD"],
  [100, "C"],  [90, "XC"],  [50, "L"],  [40, "XL"],
  [10, "X"],   [9, "IX"],   [5, "V"],   [4, "IV"],  [1, "I"],
];

export function toRoman(n: number): string {
  if (n <= 0) return String(n);
  let result = "";
  let remaining = n;
  for (const [value, numeral] of ROMAN_VALUES) {
    while (remaining >= value) {
      result += numeral;
      remaining -= value;
    }
  }
  return result;
}

/** Format HH:MM:SS or raw seconds to "Xh YYmin" or "YYmin".
 *  MM:SS format: seconds are intentionally dropped (display granularity is minutes). */
export function formatDuration(raw: string): string {
  if (!raw) return "";
  if (raw.includes(":")) {
    const parts = raw.split(":").map(Number);
    if (parts.length === 3) {
      const [h, m] = parts;
      if (h > 0) return `${h}h ${String(m).padStart(2, "0")}min`;
      return `${m}min`;
    }
    if (parts.length === 2) {
      const [m] = parts;
      return `${m}min`;
    }
  }
  const secs = parseInt(raw, 10);
  if (!isNaN(secs)) {
    const h = Math.floor(secs / 3600);
    const m = Math.floor((secs % 3600) / 60);
    if (h > 0) return `${h}h ${String(m).padStart(2, "0")}min`;
    return `${m}min`;
  }
  return raw;
}
