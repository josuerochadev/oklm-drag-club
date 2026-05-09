interface PlatformLinksProps {
  spotifyUrl?: string;
  applePodcastsUrl?: string;
  deezerUrl?: string;
  amazonUrl?: string;
  size?: "sm" | "md";
}

const platforms = [
  { key: "spotifyUrl" as const, label: "Spotify" },
  { key: "applePodcastsUrl" as const, label: "Apple Podcasts" },
  { key: "deezerUrl" as const, label: "Deezer" },
  { key: "amazonUrl" as const, label: "Amazon Music" },
];

export default function PlatformLinks({
  spotifyUrl,
  applePodcastsUrl,
  deezerUrl,
  amazonUrl,
  size = "md",
}: PlatformLinksProps) {
  const urls = { spotifyUrl, applePodcastsUrl, deezerUrl, amazonUrl };
  const available = platforms.filter((p) => urls[p.key]);
  if (available.length === 0) return null;

  return (
    <div className="flex flex-wrap gap-2">
      {available.map((p) => (
        <a
          key={p.key}
          href={urls[p.key]}
          target="_blank"
          rel="noopener noreferrer"
          className="glass-pill transition-all duration-300 hover:shadow-[0_0_16px_rgba(184,128,104,0.2)] hover:scale-105"
          style={{
            padding: size === "sm" ? "4px 14px" : "6px 18px",
            fontFamily: '"Italiana", serif',
            fontStyle: "normal",
            letterSpacing: "0.25em",
            textTransform: "uppercase",
            fontSize: size === "sm" ? "8px" : "9px",
            color: "#B88068",
            display: "inline-flex",
            alignItems: "center",
          }}
        >
          {p.label}
        </a>
      ))}
    </div>
  );
}
