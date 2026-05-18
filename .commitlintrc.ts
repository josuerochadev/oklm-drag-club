import type { UserConfig } from "@commitlint/types";

const config: UserConfig = {
  extends: ["@commitlint/config-conventional"],
  rules: {
    // Types autorisés (alignés avec CONTRIBUTING.md)
    "type-enum": [2, "always", [
      "feat", "fix", "refactor", "docs", "style",
      "chore", "test", "ci", "perf", "build", "revert",
    ]],
    // Pas de contrainte de casse sur le sujet (messages en français)
    "subject-case": [0],
    // Longueur max de l'en-tête
    "header-max-length": [2, "always", 100],
  },
};

export default config;
