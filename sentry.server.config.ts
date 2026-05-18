import * as Sentry from "@sentry/nextjs";

Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,

  // Erreurs uniquement — pas de traces de performance
  tracesSampleRate: 0,

  debug: false,
});
