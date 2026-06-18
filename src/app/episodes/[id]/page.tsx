import { fetchEpisodes } from "@/lib/rss";
import { SHOW_CONFIG } from "@/lib/shows";
import { SITE_URL, SITE_NAME } from "@/lib/config";
import { safeJsonLd, durationToIso } from "@/lib/utils";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SpotifyIcon, AppleIcon, DeezerIcon, AmazonIcon } from "@/components/svg/PlatformIcons";
import ShareButton from "@/components/ShareButton";

export async function generateStaticParams() {
  const episodes = await fetchEpisodes().catch(() => []);
  return episodes.map((ep) => ({ id: ep.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const episodes = await fetchEpisodes().catch(() => []);
  const episode = episodes.find((ep) => ep.id === id);
  if (!episode) return {};
  const description = episode.description.replace(/<[^>]*>/g, "").slice(0, 160);
  const url = `${SITE_URL}/episodes/${episode.id}`;
  return {
    title: episode.title,
    description,
    openGraph: {
      type: "website",
      locale: "fr_FR",
      siteName: SITE_NAME,
      title: episode.title,
      description,
      url,
    },
    twitter: {
      card: "summary_large_image",
      title: episode.title,
      description,
    },
  };
}

const PLATFORM_ICONS = [
  { key: "spotifyUrl" as const, Icon: SpotifyIcon, label: "Spotify" },
  { key: "applePodcastsUrl" as const, Icon: AppleIcon, label: "Apple Podcasts" },
  { key: "deezerUrl" as const, Icon: DeezerIcon, label: "Deezer" },
  { key: "amazonUrl" as const, Icon: AmazonIcon, label: "Amazon Music" },
];

export default async function EpisodePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const episodes = await fetchEpisodes().catch(() => []);
  const episode = episodes.find((ep) => ep.id === id);

  if (!episode) notFound();

  const show = SHOW_CONFIG[episode.show];
  const episodeIndex = episodes.findIndex((ep) => ep.id === id);
  const prevEpisode = episodeIndex < episodes.length - 1 ? episodes[episodeIndex + 1] : null;
  const nextEpisode = episodeIndex > 0 ? episodes[episodeIndex - 1] : null;

  const pubDate = episode.pubDate
    ? new Date(episode.pubDate).toLocaleDateString("fr-FR", {
        day: "numeric",
        month: "long",
        year: "numeric",
      })
    : null;

  const episodeLinks = PLATFORM_ICONS
    .filter((p): p is typeof PLATFORM_ICONS[number] & { key: keyof typeof episode } => Boolean(episode[p.key]))
    .map((p) => ({ ...p, href: episode[p.key] as string }));

  const isoDuration = durationToIso(episode.duration);
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "PodcastEpisode",
    name: episode.title,
    description: episode.description.replace(/<[^>]*>/g, "").slice(0, 300),
    url: `${SITE_URL}/episodes/${episode.id}`,
    datePublished: episode.pubDate ? new Date(episode.pubDate).toISOString().split("T")[0] : undefined,
    ...(isoDuration ? { timeRequired: isoDuration } : {}),
    episodeNumber: episode.episodeNumber,
    partOfSeries: {
      "@type": "PodcastSeries",
      name: SITE_NAME,
      url: SITE_URL,
    },
  };

  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Épisodes", item: `${SITE_URL}/episodes` },
      { "@type": "ListItem", position: 2, name: episode.title, item: `${SITE_URL}/episodes/${episode.id}` },
    ],
  };

  return (
    <>
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: safeJsonLd(jsonLd) }}
    />
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: safeJsonLd(breadcrumbLd) }}
    />
    <div style={{ maxWidth: "800px", margin: "0 auto", padding: "48px 32px 80px" }}>

      {/* Retour */}
      <Link href="/episodes" className="btn btn-ghost" style={{ marginBottom: "40px", display: "inline-flex" }}>
        ← Retour
      </Link>

      {/* Métadonnées show */}
      <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "20px" }}>
        <span className={`badge ${show.badgeClass}`}>{show.label}</span>
        <span
          style={{
            fontFamily: "var(--font-body)",
            fontSize: "0.75rem",
            color: "var(--forest-mid)",
          }}
        >
          {pubDate}{episode.duration ? ` · ${episode.duration}` : ""}
        </span>
      </div>

      {/* Numéro épisode */}
      <p
        style={{
          fontFamily: "var(--font-display)",
          fontSize: "1rem",
          letterSpacing: "0.04em",
          color: "var(--forest-light)",
          marginBottom: "8px",
        }}
      >
        Épisode {episode.episodeNumber}
      </p>

      {/* Titre */}
      <h1
        style={{
          fontFamily: "var(--font-display)",
          fontSize: "clamp(28px, 5vw, 52px)",
          color: "var(--forest)",
          lineHeight: 1.05,
          letterSpacing: "-0.04em",
          marginBottom: "32px",
        }}
      >
        {episode.title}
      </h1>

      {/* Platform links + partage */}
      <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", marginBottom: "40px" }}>
        {episodeLinks.map(({ Icon, href, label }) => (
          <a
            key={label}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            title={label}
            aria-label={label}
            className="btn btn-ghost"
            style={{ padding: "8px 16px", fontSize: "0.75rem" }}
          >
            <Icon size={16} />
            {label}
          </a>
        ))}
        <ShareButton
          url={`${SITE_URL}/episodes/${episode.id}`}
          title={episode.title}
        />
      </div>

      {/* Séparateur */}
      <div style={{ height: "2px", background: "var(--forest)", marginBottom: "32px", opacity: 0.12 }} />

      {/* Description */}
      {episode.description && (
        <div>
          <p
            className="section-label"
            style={{ marginBottom: "16px" }}
          >
            À propos
          </p>
          <div
            className="episode-description"
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "1rem",
              color: "var(--forest)",
              lineHeight: 1.75,
            }}
            dangerouslySetInnerHTML={{ __html: episode.description }}
          />
        </div>
      )}

      {/* Navigation prev/next */}
      {(prevEpisode || nextEpisode) && (
        <div
          style={{
            marginTop: "64px",
            paddingTop: "32px",
            borderTop: "var(--border-base)",
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "24px",
          }}
        >
          {prevEpisode ? (
            <Link
              href={`/episodes/${prevEpisode.id}`}
              style={{ textDecoration: "none", color: "var(--forest)" }}
            >
              <p className="section-label" style={{ marginBottom: "6px" }}>
                ← Épisode précédent
              </p>
              <p
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "0.9375rem",
                  letterSpacing: "-0.02em",
                  color: "var(--forest)",
                  lineHeight: 1.2,
                }}
                className="line-clamp-2"
              >
                {prevEpisode.title}
              </p>
            </Link>
          ) : <div />}

          {nextEpisode ? (
            <Link
              href={`/episodes/${nextEpisode.id}`}
              style={{ textDecoration: "none", color: "var(--forest)", textAlign: "right" }}
            >
              <p className="section-label" style={{ marginBottom: "6px", justifyContent: "flex-end" }}>
                Épisode suivant →
              </p>
              <p
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "0.9375rem",
                  letterSpacing: "-0.02em",
                  color: "var(--forest)",
                  lineHeight: 1.2,
                }}
                className="line-clamp-2"
              >
                {nextEpisode.title}
              </p>
            </Link>
          ) : <div />}
        </div>
      )}
    </div>
    </>
  );
}
