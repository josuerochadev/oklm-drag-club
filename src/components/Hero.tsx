import Link from "next/link";
import Crown from "./svg/Crown";
import Bird from "./svg/Bird";
import Cherub from "./svg/Cherub";
import { SpotifyIcon, AppleIcon, DeezerIcon, AmazonIcon } from "./svg/PlatformIcons";

const PLATFORMS = [
  { Icon: SpotifyIcon,  href: "https://open.spotify.com/show/oklm-drag-club",       label: "Spotify" },
  { Icon: AppleIcon,    href: "https://podcasts.apple.com/fr/podcast/oklm-drag-club", label: "Apple Podcasts" },
  { Icon: DeezerIcon,   href: "https://www.deezer.com/show/oklm-drag-club",           label: "Deezer" },
  { Icon: AmazonIcon,   href: "https://music.amazon.fr/podcasts/oklm-drag-club",       label: "Amazon Music" },
];

export default function Hero() {
  return (
    <section className="hero-bg relative min-h-svh flex flex-col items-center justify-center overflow-hidden px-6 py-20">

      {/* ── Couronne ── */}
      <div
        className="fade-up mb-4 relative z-10"
        style={{ animationDelay: "0.05s" }}
      >
        <Crown
          className="float-slow"
          style={{
            width: 72,
            height: "auto",
            color: "#1E1EE6",
            filter: "drop-shadow(0 4px 16px rgba(30,30,230,0.25))",
          } as React.CSSProperties}
        />
      </div>

      {/* ── Logo display ── */}
      <h1
        className="font-display fade-up relative z-10 text-center leading-none select-none"
        style={{
          animationDelay: "0.12s",
          fontSize: "clamp(80px, 18vw, 200px)",
          color: "#1E1EE6",
          textShadow: "0 6px 32px rgba(30,30,230,0.18)",
          lineHeight: 0.9,
          letterSpacing: "-0.01em",
        }}
      >
        OKLM<br />DRAG<br />CLUB
      </h1>

      {/* ── Cherub gauche ── */}
      <div
        className="absolute z-0 pointer-events-none float-med"
        style={{
          left: "clamp(-60px, -2vw, 20px)",
          bottom: "8%",
          width: "clamp(160px, 20vw, 280px)",
          color: "#1E1EE6",
          opacity: 0.88,
          filter: "drop-shadow(0 8px 24px rgba(30,30,230,0.15))",
        }}
      >
        <Cherub style={{ width: "100%", height: "auto" } as React.CSSProperties} />
      </div>

      {/* ── Oiseau droit ── */}
      <div
        className="absolute z-0 pointer-events-none float-slow"
        style={{
          right: "clamp(10px, 6vw, 80px)",
          top: "18%",
          width: "clamp(90px, 11vw, 160px)",
          color: "#1E1EE6",
          opacity: 0.82,
          filter: "drop-shadow(0 4px 16px rgba(30,30,230,0.15))",
          animationDelay: "1.5s",
        }}
      >
        <Bird style={{ width: "100%", height: "auto" } as React.CSSProperties} />
      </div>

      {/* ── Tagline ── */}
      <p
        className="fade-up relative z-10 text-center mt-8 max-w-xl"
        style={{
          animationDelay: "0.28s",
          fontFamily: '"Inter", sans-serif',
          fontWeight: 600,
          fontSize: "clamp(15px, 2vw, 18px)",
          color: "#1E1EE6",
          lineHeight: 1.6,
        }}
      >
        Réactions calmes et bienveillantes sur la drag et la téléréalité
        {" "}—{" "}sans hurler dans vos oreilles.
      </p>

      {/* ── CTA buttons ── */}
      <div
        className="fade-up flex flex-wrap gap-4 justify-center mt-10 relative z-10"
        style={{ animationDelay: "0.38s" }}
      >
        <Link
          href="/episodes"
          className="btn-pill btn-pill-blue"
          style={{ padding: "14px 32px", fontSize: "15px" }}
        >
          Tous les épisodes
        </Link>
        <Link
          href="/#newsletter"
          className="btn-pill btn-pill-peach"
          style={{ padding: "14px 32px", fontSize: "15px" }}
        >
          Rester informé·e
        </Link>
      </div>

      {/* ── Platform icons ── */}
      <div
        className="fade-up flex items-center gap-6 mt-10 relative z-10"
        style={{ animationDelay: "0.5s" }}
      >
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
            <Icon style={{ width: 40, height: 40 } as React.CSSProperties} />
          </a>
        ))}
      </div>

    </section>
  );
}
