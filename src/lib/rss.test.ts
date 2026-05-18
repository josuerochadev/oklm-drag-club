import { describe, it, expect } from "vitest";
import { detectShow } from "./rss";

describe("detectShow", () => {
  it.each([
    // Drag Race France
    ["Drag Race France S04E01", "drag-race-france"],
    ["DRF saison 3 épisode 2", "drag-race-france"],
    ["dragrace france finale", "drag-race-france"],
    ["All Stars FR épisode 2", "drag-race-france"],
    ["AllStar FR S02", "drag-race-france"],
    ["ASFR grand final", "drag-race-france"],
    // Dragula
    ["Dragula S06E01", "dragula"],
    ["dragula season 5", "dragula"],
    // Les Traîtres FR
    ["Les Traîtres FR S02E03", "les-traitres-fr"],
    ["Les Traitres FR finale", "les-traitres-fr"],
    ["traitre saison 2", "les-traitres-fr"],
    // Ultime Drag ASMR
    ["Ultime Drag ASMR épisode", "ultime-drag-asmr"],
    ["ASMR drag spécial", "ultime-drag-asmr"],
    ["DragSMR s01", "ultime-drag-asmr"],
    // Fan Fiction
    ["Fan Fiction S01E01", "fan-fiction"],
    ["fanfic épisode 3", "fan-fiction"],
    ["SSAW grand finale", "fan-fiction"],
    // RPDR Global All Stars
    ["RPDR Global All Stars S01", "rpdr-global"],
    ["Global AllStars épisode 1", "rpdr-global"],
    ["rpdr global all stars finale", "rpdr-global"],
    // Fallback
    ["Podcast spécial hors-série", "other"],
    ["Interview exclusive", "other"],
    ["", "other"],
  ] as const)('detectShow("%s") → "%s"', (title, expected) => {
    expect(detectShow(title)).toBe(expected);
  });

  it("is case-insensitive", () => {
    expect(detectShow("DRAG RACE FRANCE")).toBe("drag-race-france");
    expect(detectShow("drag race france")).toBe("drag-race-france");
    expect(detectShow("Drag Race France")).toBe("drag-race-france");
  });
});
