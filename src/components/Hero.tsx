import Link from "next/link";
import type { Episode } from "@/lib/rss";
import PlatformLinks from "./PlatformLinks";
import { SHOW_CONFIG } from "@/lib/shows";

interface HeroProps {
  latestEpisode?: Episode;
}

export default function Hero({ latestEpisode }: HeroProps) {
  const show = latestEpisode ? SHOW_CONFIG[latestEpisode.show] : null;

  return (
    <section className="relative flex flex-col items-center justify-center text-center px-6 pt-40 pb-24">
      {/* Ornement haut */}
      <div
        className="fade-up mb-8"
        style={{ animationDelay: "0.1s" }}
      >
        <span
          className="font-italiana"
          style={{
            fontFamily: '"Italiana", serif',
            fontStyle: "normal",
            fontSize: "9px",
            letterSpacing: "0.45em",
            textTransform: "uppercase",
            color: "#B88068",
          }}
        >
          ✦ Podcast Drag &amp; Téléréalité ✦
        </span>
      </div>

      {/* Titre principal */}
      <h1
        className="fade-up mb-6"
        style={{
          animationDelay: "0.2s",
          fontFamily: '"Cormorant Garamond", serif',
          fontWeight: 300,
          lineHeight: 1.1,
          letterSpacing: "-0.01em",
        }}
      >
        <span
          style={{
            fontStyle: "italic",
            fontWeight: 400,
            fontSize: "clamp(48px, 9vw, 82px)",
            color: "#5A3E50",
            display: "block",
          }}
        >
          OKLM
        </span>
        <span
          className="gradient-text"
          style={{
            fontStyle: "italic",
            fontSize: "clamp(48px, 9vw, 82px)",
            display: "block",
          }}
        >
          Drag Club
        </span>
      </h1>

      {/* Tagline */}
      <p
        className="fade-up max-w-sm mb-12"
        style={{
          animationDelay: "0.35s",
          fontFamily: '"Cormorant Garamond", serif',
          fontStyle: "italic",
          fontWeight: 300,
          fontSize: "17px",
          color: "#8A7080",
          lineHeight: 1.75,
          letterSpacing: "0.02em",
        }}
      >
        Réactions calmes et bienveillantes sur la drag et la téléréalité —
        sans hurler dans vos oreilles.
      </p>

      {/* CTA */}
      <div
        className="fade-up flex flex-col sm:flex-row gap-4 items-center mb-20"
        style={{ animationDelay: "0.5s" }}
      >
        <Link
          href="/episodes"
          className="transition-all duration-300 hover:shadow-[0_0_32px_rgba(184,128,104,0.35)] hover:scale-105 active:scale-100"
          style={{
            padding: "12px 32px",
            borderRadius: "999px",
            background: "linear-gradient(135deg, #D4A088, #B88068)",
            fontFamily: '"Italiana", serif',
            fontStyle: "normal",
            letterSpacing: "0.3em",
            textTransform: "uppercase",
            fontSize: "9px",
            color: "#fff",
          }}
        >
          Tous les épisodes
        </Link>
        <a
          href="#platforms"
          className="glass-pill transition-all duration-300 hover:shadow-[0_0_20px_rgba(184,128,104,0.2)] hover:scale-105"
          style={{
            padding: "12px 32px",
            fontFamily: '"Italiana", serif',
            fontStyle: "normal",
            letterSpacing: "0.3em",
            textTransform: "uppercase",
            fontSize: "9px",
            color: "#B88068",
          }}
        >
          Écouter
        </a>
      </div>

      {/* Dernier épisode */}
      {latestEpisode && show && (
        <div
          className="fade-up w-full max-w-xl"
          style={{ animationDelay: "0.65s" }}
        >
          <div
            className="relative rounded-3xl p-8 text-left overflow-hidden"
            style={{
              background: "rgba(255,255,255,0.5)",
              backdropFilter: "blur(16px)",
              WebkitBackdropFilter: "blur(16px)",
              border: "0.5px solid rgba(180,150,150,0.2)",
            }}
          >
            {/* Mini halo dans la card */}
            <div
              className="halo"
              style={{
                width: 200,
                height: 200,
                top: "-40px",
                right: "-40px",
                background: show.aura,
                opacity: 0.2,
                filter: "blur(50px)",
              }}
            />

            <div className="relative">
              <div className="mb-3 flex items-center gap-3">
                {/* Numéro romain */}
                <div
                  style={{
                    width: 44,
                    height: 44,
                    borderRadius: "50%",
                    background: `radial-gradient(circle, ${show.aura}60 0%, ${show.aura}20 65%, transparent 100%)`,
                    border: `1px solid ${show.aura}95`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    boxShadow: `0 0 16px ${show.aura}95, 0 0 6px ${show.aura}70`,
                    flexShrink: 0,
                  }}
                >
                  <span
                    style={{
                      fontFamily: '"Italiana", serif',
                      fontStyle: "normal",
                      fontSize: latestEpisode.romanNumeral.length > 4 ? "9px" : "12px",
                      color: show.aura,
                      letterSpacing: "0.05em",
                    }}
                  >
                    {latestEpisode.romanNumeral}
                  </span>
                </div>

                <div>
                  <span
                    style={{
                      fontFamily: '"Italiana", serif',
                      fontStyle: "normal",
                      fontSize: "7px",
                      letterSpacing: "0.35em",
                      textTransform: "uppercase",
                      color: "#B88068",
                    }}
                  >
                    Dernier épisode
                  </span>
                  <div
                    style={{
                      fontFamily: '"Italiana", serif',
                      fontStyle: "normal",
                      fontSize: "7px",
                      letterSpacing: "0.25em",
                      textTransform: "uppercase",
                      color: show.aura,
                      marginTop: "2px",
                    }}
                  >
                    {show.label}
                  </div>
                </div>
              </div>

              <Link href={`/episodes/${latestEpisode.id}`}>
                <h2
                  className="mb-4 hover:gradient-text transition-all duration-300"
                  style={{
                    fontFamily: '"Cormorant Garamond", serif',
                    fontStyle: "italic",
                    fontWeight: 300,
                    fontSize: "24px",
                    color: "#5A3E50",
                    lineHeight: 1.3,
                  }}
                >
                  {latestEpisode.title}
                </h2>
              </Link>

              <PlatformLinks
                spotifyUrl={latestEpisode.spotifyUrl}
                applePodcastsUrl={latestEpisode.applePodcastsUrl}
                deezerUrl={latestEpisode.deezerUrl}
                amazonUrl={latestEpisode.amazonUrl}
                size="sm"
              />
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
