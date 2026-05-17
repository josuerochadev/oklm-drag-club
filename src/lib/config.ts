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
export const SITE_DESCRIPTION =
  "Réactions calmes et bienveillantes sur la drag et la téléréalité — sans hurler dans vos oreilles. Drag Race France, Dragula, Les Traîtres FR, et plus.";
