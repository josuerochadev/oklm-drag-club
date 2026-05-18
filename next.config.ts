import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Wildcard intentionnel : les covers viennent du RSS Anchor.fm et des APIs
    // Apple/Deezer — les hostnames changent selon l'hébergement des médias.
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
};

export default nextConfig;
