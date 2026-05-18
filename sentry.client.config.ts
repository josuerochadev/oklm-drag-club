import * as Sentry from "@sentry/nextjs";

Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,

  // Erreurs uniquement — pas de traces de performance ni de session replay
  // (site statique, overhead inutile)
  tracesSampleRate: 0,
  replaysSessionSampleRate: 0,
  replaysOnErrorSampleRate: 0,

  // Ne pas polluer la console en dev
  debug: false,
});
