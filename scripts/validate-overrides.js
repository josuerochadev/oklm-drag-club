#!/usr/bin/env node
// Validé au pre-commit via lint-staged.
// Usage : node scripts/validate-overrides.js <fichier.json>

const fs = require("fs");

const VALID_SHOW_IDS = new Set([
  "drag-race-france",
  "dragula",
  "les-traitres-fr",
  "ultime-drag-asmr",
  "fan-fiction",
  "rpdr-global",
  "other",
]);

const URL_FIELDS = ["deezerUrl", "amazonUrl", "applePodcastsUrl", "spotifyUrl"];

const file = process.argv[2];
if (!file) {
  console.error("Usage: validate-overrides.js <path>");
  process.exit(1);
}

let data;
try {
  data = JSON.parse(fs.readFileSync(file, "utf8"));
} catch (e) {
  console.error(`overrides.json — syntaxe JSON invalide : ${e.message}`);
  process.exit(1);
}

let hasError = false;

for (const [slug, override] of Object.entries(data)) {
  if (typeof override !== "object" || override === null || Array.isArray(override)) {
    console.error(`overrides.json ["${slug}"] — doit être un objet`);
    hasError = true;
    continue;
  }

  if (override.show !== undefined && !VALID_SHOW_IDS.has(override.show)) {
    console.error(
      `overrides.json ["${slug}"].show — valeur inconnue : "${override.show}"\n` +
        `  Valeurs valides : ${[...VALID_SHOW_IDS].join(", ")}`
    );
    hasError = true;
  }

  for (const key of URL_FIELDS) {
    if (override[key] !== undefined && !String(override[key]).startsWith("https://")) {
      console.error(
        `overrides.json ["${slug}"].${key} — doit commencer par https:// (valeur : "${override[key]}")`
      );
      hasError = true;
    }
  }
}

if (hasError) process.exit(1);
console.log(`overrides.json — OK (${Object.keys(data).length} entrées)`);
