import type { MetadataRoute } from "next";
import { SITE_NAME, SITE_DESCRIPTION } from "@/lib/config";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: SITE_NAME,
    short_name: "OKLM Drag Club",
    description: SITE_DESCRIPTION,
    start_url: "/",
    display: "standalone",
    background_color: "#111d10",
    theme_color: "#111d10",
    icons: [
      { src: "/icon", sizes: "32x32", type: "image/png" },
    ],
  };
}
