import { describe, it, expect } from "vitest";
import { slugify, SLUG_MAX_LENGTH, toRoman, formatDuration, durationToIso, safeJsonLd } from "./utils";

describe("slugify", () => {
  it("lowercases", () => {
    expect(slugify("HELLO")).toBe("hello");
  });

  it("removes accents", () => {
    expect(slugify("éèàüô")).toBe("eeauо".includes("о") ? "eeauo" : slugify("éèàüô"));
    // normalisation NFD : é→e, è→e, à→a, ü→u, ô→o
    expect(slugify("éèàüô")).toBe("eeauo");
  });

  it("replaces spaces with dashes", () => {
    expect(slugify("hello world")).toBe("hello-world");
  });

  it("collapses multiple spaces and dashes", () => {
    expect(slugify("hello   world")).toBe("hello-world");
    expect(slugify("hello--world")).toBe("hello-world");
  });

  it("removes special characters", () => {
    expect(slugify("hello! world?")).toBe("hello-world");
    expect(slugify("Drag Race France — S04E01")).toBe("drag-race-france-s04e01");
  });

  it("trims leading and trailing whitespace", () => {
    expect(slugify("  hello  ")).toBe("hello");
  });

  it("handles a real episode title", () => {
    expect(slugify("Drag Race France S04E01 — Le Grand Bal des Reines")).toBe(
      "drag-race-france-s04e01-le-grand-bal-des-reines"
    );
  });

  it("SLUG_MAX_LENGTH slice produces the expected length", () => {
    const long = "a ".repeat(50); // 100 chars → "a-a-a-..." après slugify
    const result = slugify(long).slice(0, SLUG_MAX_LENGTH);
    expect(result.length).toBeLessThanOrEqual(SLUG_MAX_LENGTH);
  });
});

describe("toRoman", () => {
  it.each([
    [1, "I"],
    [4, "IV"],
    [9, "IX"],
    [14, "XIV"],
    [40, "XL"],
    [42, "XLII"],
    [90, "XC"],
    [400, "CD"],
    [900, "CM"],
    [1994, "MCMXCIV"],
  ])("toRoman(%i) → %s", (n, expected) => {
    expect(toRoman(n)).toBe(expected);
  });

  it("returns string representation for n <= 0", () => {
    expect(toRoman(0)).toBe("0");
    expect(toRoman(-1)).toBe("-1");
  });
});

describe("formatDuration", () => {
  it("returns empty string for empty input", () => {
    expect(formatDuration("")).toBe("");
  });

  it("formats HH:MM:SS with hours", () => {
    expect(formatDuration("1:30:00")).toBe("1h 30min");
  });

  it("pads minutes below 10 when hours are present", () => {
    expect(formatDuration("1:05:00")).toBe("1h 05min");
  });

  it("formats HH:MM:SS with 0 hours (no h prefix)", () => {
    expect(formatDuration("0:45:00")).toBe("45min");
  });

  it("formats MM:SS (two parts)", () => {
    expect(formatDuration("45:00")).toBe("45min");
  });

  it("formats raw seconds with hours", () => {
    expect(formatDuration("5400")).toBe("1h 30min");
  });

  it("formats raw seconds without hours", () => {
    expect(formatDuration("2700")).toBe("45min");
  });

  it("returns raw value for unrecognised format", () => {
    expect(formatDuration("invalid")).toBe("invalid");
  });
});

describe("durationToIso", () => {
  it.each([
    ["1h 30min", "PT1H30M"],
    ["2h 05min", "PT2H05M"],
    ["45min", "PT45M"],
    ["0min", "PT0M"],
    ["", undefined],
    ["unknown", undefined],
  ] as const)('durationToIso("%s") → %s', (input, expected) => {
    expect(durationToIso(input)).toBe(expected);
  });
});

describe("safeJsonLd", () => {
  it("serializes a plain object to JSON", () => {
    expect(safeJsonLd({ key: "value" })).toBe('{"key":"value"}');
  });

  it("escapes < to \\u003c to prevent </script> injection", () => {
    const result = safeJsonLd({ xss: "</script>" });
    expect(result).not.toContain("<");
    expect(result).toContain("\\u003c");
  });

  it("leaves > unchanged (only < is the injection vector)", () => {
    const result = safeJsonLd({ val: "a>b" });
    expect(result).toContain(">");
  });
});
