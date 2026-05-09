import Link from "next/link";
import { fetchEpisodes } from "@/lib/rss";
import Hero from "@/components/Hero";
import EpisodeCard from "@/components/EpisodeCard";
import NewsletterForm from "@/components/NewsletterForm";
import PlatformLinks from "@/components/PlatformLinks";

// Liens globaux du podcast (remplacer par les vraies URLs)
const PODCAST_LINKS = {
  spotifyUrl: "https://open.spotify.com/show/oklm-drag-club",
  applePodcastsUrl: "https://podcasts.apple.com/fr/podcast/oklm-drag-club",
};

export default async function HomePage() {
  const episodes = await fetchEpisodes().catch(() => []);
  const latestEpisode = episodes[0];
  const recentEpisodes = episodes.slice(0, 5);

  return (
    <>
      {/* Hero */}
      <Hero latestEpisode={latestEpisode} />

      {/* Épisodes récents */}
      <section className="relative max-w-2xl mx-auto px-6 pb-20">
        {/* Titre section */}
        <div className="flex items-center justify-between mb-10">
          <h2
            style={{
              fontFamily: '"Italiana", serif',
              fontStyle: "normal",
              fontSize: "9px",
              letterSpacing: "0.4em",
              textTransform: "uppercase",
              color: "#8A7080",
            }}
          >
            Épisodes récents
          </h2>
          <Link
            href="/episodes"
            style={{
              fontFamily: '"Italiana", serif',
              fontStyle: "normal",
              fontSize: "8px",
              letterSpacing: "0.3em",
              textTransform: "uppercase",
              color: "#B88068",
            }}
            className="hover:opacity-70 transition-opacity"
          >
            Voir tout →
          </Link>
        </div>

        {recentEpisodes.length > 0 ? (
          <div>
            {recentEpisodes.map((ep, i) => (
              <EpisodeCard key={ep.id} episode={ep} index={i} />
            ))}
          </div>
        ) : (
          <p
            style={{
              fontFamily: '"Cormorant Garamond", serif',
              fontStyle: "italic",
              fontWeight: 300,
              fontSize: "16px",
              color: "#8A7080",
              textAlign: "center",
              padding: "40px 0",
            }}
          >
            Les épisodes arrivent bientôt…
          </p>
        )}
      </section>

      {/* Plateformes */}
      <section
        id="platforms"
        className="relative max-w-2xl mx-auto px-6 py-16 text-center"
      >
        <div
          className="rounded-3xl p-10 overflow-hidden relative"
          style={{
            background: "rgba(255,255,255,0.45)",
            backdropFilter: "blur(16px)",
            WebkitBackdropFilter: "blur(16px)",
            border: "0.5px solid rgba(180,150,150,0.2)",
          }}
        >
          {/* Halo interne */}
          <div
            className="halo"
            style={{
              width: 260,
              height: 260,
              bottom: "-60px",
              left: "50%",
              transform: "translateX(-50%)",
              background: "#FFE0B0",
              opacity: 0.3,
            }}
          />

          <div className="relative">
            <div className="mb-2">
              <span
                style={{
                  fontFamily: '"Italiana", serif',
                  fontStyle: "normal",
                  fontSize: "8px",
                  letterSpacing: "0.4em",
                  textTransform: "uppercase",
                  color: "#B88068",
                }}
              >
                ✦ Écouter sur
              </span>
            </div>

            <h2
              className="mb-8"
              style={{
                fontFamily: '"Cormorant Garamond", serif',
                fontStyle: "italic",
                fontWeight: 300,
                fontSize: "32px",
                color: "#5A3E50",
              }}
            >
              Vos plateformes préférées
            </h2>

            <div className="flex justify-center mb-10">
              <PlatformLinks
                spotifyUrl={PODCAST_LINKS.spotifyUrl}
                applePodcastsUrl={PODCAST_LINKS.applePodcastsUrl}
              />
            </div>

            {/* Séparateur */}
            <div
              className="mb-8"
              style={{
                height: "0.5px",
                background: "rgba(180,150,150,0.2)",
                margin: "0 auto 32px",
                maxWidth: "200px",
              }}
            />

            {/* Newsletter */}
            <div className="mb-4">
              <span
                style={{
                  fontFamily: '"Italiana", serif',
                  fontStyle: "normal",
                  fontSize: "8px",
                  letterSpacing: "0.4em",
                  textTransform: "uppercase",
                  color: "#8A7080",
                }}
              >
                Rester informé·e
              </span>
            </div>
            <p
              className="mb-6"
              style={{
                fontFamily: '"Cormorant Garamond", serif',
                fontStyle: "italic",
                fontWeight: 300,
                fontSize: "15px",
                color: "#8A7080",
              }}
            >
              Recevez une note douce à chaque nouvel épisode.
            </p>
            <NewsletterForm />
          </div>
        </div>
      </section>
    </>
  );
}
