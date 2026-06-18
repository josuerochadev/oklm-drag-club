import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Mentions légales",
  description:
    "Mentions légales du site oklmdragclub.com — éditeur, hébergeur et informations juridiques.",
  alternates: {
    canonical: "/mentions-legales",
  },
};

export default function MentionsLegalesPage() {
  return (
    <>
      {/* ── En-tête ── */}
      <section
        aria-label="Mentions légales"
        style={{ borderBottom: "var(--border-base)", background: "var(--forest-fixed)" }}
      >
        <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "64px 32px" }}>
          <p
            className="section-label"
            style={{ color: "rgba(255,255,255,0.35)", marginBottom: "20px" }}
          >
            Juridique
          </p>
          <h1
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(36px, 7vw, 72px)",
              color: "var(--lime-fixed)",
              lineHeight: 0.95,
              letterSpacing: "-0.04em",
            }}
          >
            Mentions légales
          </h1>
        </div>
      </section>

      {/* ── Contenu ── */}
      <section aria-label="Contenu des mentions légales" style={{ borderBottom: "var(--border-base)" }}>
        <div
          style={{
            maxWidth: "760px",
            margin: "0 auto",
            padding: "64px 32px",
            fontFamily: "var(--font-body)",
            fontSize: "1rem",
            color: "var(--forest)",
            lineHeight: 1.75,
            display: "flex",
            flexDirection: "column",
            gap: "48px",
          }}
        >
          {/* Éditeur */}
          <div>
            <h2
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "1.25rem",
                letterSpacing: "-0.03em",
                color: "var(--forest)",
                marginBottom: "16px",
                lineHeight: 1.1,
              }}
            >
              Éditeur du site
            </h2>
            <p>
              Le site <strong>oklmdragclub.com</strong> est édité par Romain, personne physique,
              en qualité de créateur du podcast OKLM Drag Club.
            </p>
            <p style={{ marginTop: "8px" }}>
              Contact :{" "}
              <a
                href="mailto:oklmdragclub@gmail.com"
                style={{ textDecoration: "underline", textUnderlineOffset: "3px" }}
              >
                oklmdragclub@gmail.com
              </a>
            </p>
            <p style={{ marginTop: "8px" }}>Directeur de la publication : Romain.</p>
          </div>

          {/* Hébergeur */}
          <div>
            <h2
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "1.25rem",
                letterSpacing: "-0.03em",
                color: "var(--forest)",
                marginBottom: "16px",
                lineHeight: 1.1,
              }}
            >
              Hébergeur
            </h2>
            <p>
              Ce site est hébergé par <strong>Vercel Inc.</strong>
            </p>
            <ul style={{ marginTop: "8px", paddingLeft: "20px" }}>
              <li>Adresse : 440 N Barranca Ave #4133, Covina, CA 91723, États-Unis</li>
              <li>
                Site web :{" "}
                <a
                  href="https://vercel.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ textDecoration: "underline", textUnderlineOffset: "3px" }}
                >
                  vercel.com
                </a>
              </li>
            </ul>
          </div>

          {/* Propriété intellectuelle */}
          <div>
            <h2
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "1.25rem",
                letterSpacing: "-0.03em",
                color: "var(--forest)",
                marginBottom: "16px",
                lineHeight: 1.1,
              }}
            >
              Propriété intellectuelle
            </h2>
            <p>
              L&apos;ensemble du contenu de ce site (textes, graphismes, logo, structure) est la
              propriété de l&apos;éditeur ou fait l&apos;objet d&apos;une autorisation
              d&apos;utilisation. Toute reproduction, même partielle, est soumise à autorisation
              préalable.
            </p>
            <p style={{ marginTop: "8px" }}>
              Les marques Drag Race, Dragula, Les Traîtres et les noms de plateformes (Spotify,
              Apple Podcasts, Deezer, Amazon Music) sont la propriété de leurs détenteurs
              respectifs.
            </p>
          </div>

          {/* Données personnelles */}
          <div>
            <h2
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "1.25rem",
                letterSpacing: "-0.03em",
                color: "var(--forest)",
                marginBottom: "16px",
                lineHeight: 1.1,
              }}
            >
              Données personnelles
            </h2>
            <p>
              Pour toute information relative au traitement de vos données, consultez notre{" "}
              <Link
                href="/confidentialite"
                style={{ textDecoration: "underline", textUnderlineOffset: "3px" }}
              >
                politique de confidentialité
              </Link>
              .
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
