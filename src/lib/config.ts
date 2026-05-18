/**
 * URL de base du site — à définir dans les variables d'environnement Vercel.
 * NEXT_PUBLIC_SITE_URL=https://oklm-drag-club.fr
 */
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : "http://localhost:3000");

export const SITE_NAME = "OKLM Drag Club";
export const RSS_URL = "https://anchor.fm/s/f3147f50/podcast/rss";

/** URLs des pages show sur chaque plateforme — source de vérité unique. */
export const PLATFORM_SHOW_URLS = {
  spotify: "https://open.spotify.com/show/3oH7fhOQ0r4TxzSmB8w6Ll",
  apple: "https://podcasts.apple.com/fr/podcast/oklm-drag-club/id1735072269",
  deezer: "https://link.deezer.com/s/33gD3EOafsQg6hYKIJ1O3",
  amazon: "https://music.amazon.fr/podcasts/e265f2dd-51a6-4596-9f50-2a77094fa1a4/oklm-drag-club",
};
export const SITE_DESCRIPTION =
  "Réactions calmes et bienveillantes sur la drag et la téléréalité — sans hurler dans vos oreilles. Drag Race France, Dragula, Les Traîtres FR, et plus.";
