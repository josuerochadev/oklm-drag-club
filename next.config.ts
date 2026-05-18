import type { NextConfig } from "next";
import { withSentryConfig } from "@sentry/nextjs";

const nextConfig: NextConfig = {
  images: {
    // Hostnames connus des CDNs Anchor.fm/Spotify, Apple Podcasts et Deezer.
    // Si une cover apparaît cassée après un changement d'hébergeur, ajouter le hostname ici.
    remotePatterns: [
      // Anchor.fm / Spotify Podcasters (AWS CloudFront)
      { protocol: "https", hostname: "*.cloudfront.net" },
      // Spotify image CDN
      { protocol: "https", hostname: "i.scdn.co" },
      { protocol: "https", hostname: "*.spotifycdn.com" },
      { protocol: "https", hostname: "podcasters.spotify.com" },
      { protocol: "https", hostname: "anchor.fm" },
      // Apple Podcasts / iTunes artwork
      { protocol: "https", hostname: "*.mzstatic.com" },
      { protocol: "https", hostname: "*.apple.com" },
      // Deezer
      { protocol: "https", hostname: "*.dzcdn.net" },
      { protocol: "https", hostname: "cdns-images.dzcdn.net" },
    ],
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
          {
            key: "Content-Security-Policy",
            // unsafe-inline requis : JSON-LD inline (<script>) + styles JSX inline (style={{}})
            // font-src 'self' : fonts auto-hébergées via next/font
            value: [
              "default-src 'self'",
              "script-src 'self' 'unsafe-inline'",
              "style-src 'self' 'unsafe-inline'",
              "img-src 'self' data: https:",
              "font-src 'self'",
              "connect-src 'self'",
              "frame-ancestors 'none'",
              "base-uri 'self'",
              "form-action 'self'",
            ].join("; "),
          },
        ],
      },
    ];
  },
};

export default withSentryConfig(nextConfig, {
  // Tunnel les événements Sentry via /monitoring (même origine → CSP connect-src 'self' OK)
  tunnelRoute: "/monitoring",

  // org/project/authToken lus depuis les variables d'environnement (SENTRY_ORG, etc.)
  // Source maps : supprimées du bundle après upload (ne pas exposer en prod)
  sourcemaps: {
    disable: !process.env.SENTRY_AUTH_TOKEN,
    filesToDeleteAfterUpload: [".next/**/*.map"],
  },

  // Silencieux si les variables Sentry ne sont pas configurées (dev local)
  silent: !process.env.SENTRY_AUTH_TOKEN,

  // Ne pas envoyer de télémétrie interne Sentry
  telemetry: false,
});
