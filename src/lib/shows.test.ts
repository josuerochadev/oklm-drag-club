import { describe, it, expect } from "vitest";
import { isShowId, SHOW_CONFIG, SHOWS_LIST } from "./shows";

describe("isShowId", () => {
  it("returns true for every configured show id", () => {
    for (const id of Object.keys(SHOW_CONFIG)) {
      expect(isShowId(id)).toBe(true);
    }
  });

  it("returns false for unknown strings", () => {
    expect(isShowId("unknown-show")).toBe(false);
    expect(isShowId("")).toBe(false);
    expect(isShowId("drag_race_france")).toBe(false); // underscores, not dashes
  });
});

describe("SHOW_CONFIG integrity", () => {
  it("every show has all required fields populated", () => {
    for (const show of Object.values(SHOW_CONFIG)) {
      expect(show.id, `${show.id} — id`).toBeTruthy();
      expect(show.label, `${show.id} — label`).toBeTruthy();
      expect(show.abbr, `${show.id} — abbr`).toBeTruthy();
      expect(show.color, `${show.id} — color`).toBeTruthy();
      expect(show.colorSoft, `${show.id} — colorSoft`).toBeTruthy();
      expect(show.badgeClass, `${show.id} — badgeClass`).toBeTruthy();
    }
  });

  it("every colorHex is a valid 6-digit hex", () => {
    for (const show of Object.values(SHOW_CONFIG)) {
      expect(show.colorHex, `${show.id} — colorHex`).toMatch(/^#[0-9a-fA-F]{6}$/);
    }
  });

  it("id field matches the record key", () => {
    for (const [key, show] of Object.entries(SHOW_CONFIG)) {
      expect(show.id).toBe(key);
    }
  });
});

describe("SHOWS_LIST", () => {
  it('excludes "other"', () => {
    expect(SHOWS_LIST.every((s) => s.id !== "other")).toBe(true);
  });

  it("contains 6 shows (one per real podcast)", () => {
    expect(SHOWS_LIST).toHaveLength(6);
  });

  it("every entry in SHOWS_LIST is present in SHOW_CONFIG", () => {
    for (const show of SHOWS_LIST) {
      expect(SHOW_CONFIG[show.id]).toBeDefined();
    }
  });
});
