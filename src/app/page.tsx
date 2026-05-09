import Link from "next/link";
import { fetchEpisodes } from "@/lib/rss";
import Hero from "@/components/Hero";
import EpisodeCard from "@/components/EpisodeCard";
import NewsletterForm from "@/components/NewsletterForm";
import { SpotifyIcon, AppleIcon, DeezerIcon, AmazonIcon } from "@/components/svg/PlatformIcons";

const PLATFORMS = [
  { Icon: SpotifyIcon,  href: "https://open.spotify.com/show/oklm-drag-club",       label: "Spotify" },
  { Icon: AppleIcon,    href: "https://podcasts.apple.com/fr/podcast/oklm-drag-club", label: "Apple Podcasts" },
  { Icon: DeezerIcon,   href: "https://www.deezer.com/show/oklm-drag-club",           label: "Deezer" },
  { Icon: AmazonIcon,   href: "https://music.amazon.fr/podcasts/oklm-drag-club",       label: "Amazon Music" },
];

export default async function HomePage() {
  const episodes = await fetchEpisodes().catch(() => []);
  const recentEpisodes = episodes.slice(0, 5);

  return (
    <>
      <Hero />

      {/* ── Épisodes récents ── */}
      <section className="max-w-2xl mx-auto px-6 py-16">
        <div className="flex items-center justify-between mb-8">
          <h2
            style={{
              fontFamily: '"Inter", sans-serif',
              fontWeight: 700,
              fontSize: "11px",
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              color: "#1E1EE6",
              opacity: 0.5,
            }}
          >
            Épisodes récents
          </h2>
          <Link
            href="/episodes"
            style={{
              fontFamily: '"Inter", sans-serif',
              fontWeight: 700,
              fontSize: "13px",
              color: "#1E1EE6",
            }}
            className="hover:opacity-60 transition-opacity"
          >
            Voir tout →
          </Link>
        </div>

        {recentEpisodes.length > 0 ? (
          recentEpisodes.map((ep, i) => (
            <EpisodeCard key={ep.id} episode={ep} index={i} />
          ))
        ) : (
          <p
            style={{
              fontFamily: '"Inter", sans-serif',
              fontWeight: 600,
              fontSize: "15px",
              color: "#1E1EE6",
              opacity: 0.5,
              padding: "40px 0",
              textAlign: "center",
            }}
          >
            Les épisodes arrivent bientôt…
          </p>
        )}
      </section>

      {/* ── Newsletter + plateformes ── */}
      <section
        id="newsletter"
        className="max-w-2xl mx-auto px-6 pb-20"
      >
        <div
          className="rounded-3xl p-10"
          style={{
            background: "#D8E8F8",
            border: "1.5px solid rgba(30,30,230,0.2)",
          }}
        >
          {/* Plateformes */}
          <div className="mb-10">
            <p
              className="mb-5"
              style={{
                fontFamily: '"Inter", sans-serif',
                fontWeight: 700,
                fontSize: "11px",
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color: "#1E1EE6",
                opacity: 0.5,
              }}
            >
              Écouter sur
            </p>
            <div className="flex items-center gap-5 flex-wrap">
              {PLATFORMS.map(({ Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  title={label}
                  className="transition-transform hover:scale-110 duration-200"
                  style={{ color: "#1E1EE6" }}
                >
                  <Icon style={{ width: 36, height: 36 } as React.CSSProperties} />
                </a>
              ))}
            </div>
          </div>

          {/* Séparateur */}
          <div style={{ height: "1.5px", background: "rgba(30,30,230,0.15)", marginBottom: "32px" }} />

          {/* Newsletter */}
          <p
            className="mb-2"
            style={{
              fontFamily: '"Inter", sans-serif',
              fontWeight: 700,
              fontSize: "11px",
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              color: "#1E1EE6",
              opacity: 0.5,
            }}
          >
            Rester informé·e
          </p>
          <h2
            className="mb-6"
            style={{
              fontFamily: '"Bagel Fat One", sans-serif',
              fontSize: "clamp(28px, 5vw, 40px)",
              color: "#1E1EE6",
              lineHeight: 1.1,
            }}
          >
            Une note douce à chaque épisode.
          </h2>
          <NewsletterForm />
        </div>
      </section>
    </>
  );
}
