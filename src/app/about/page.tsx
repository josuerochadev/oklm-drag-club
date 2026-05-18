import type { Metadata } from "next";
import Link from "next/link";
import { SHOWS_LIST } from "@/lib/shows";

export const metadata: Metadata = {
  title: "À propos",
  description:
    "OKLM Drag Club, c'est un podcast de réactions calmes et bienveillantes sur la drag et la téléréalité. Sans hurler dans vos oreilles.",
};


export default function AboutPage() {
  return (
    <>
      {/* ── En-tête ── */}
      <section aria-label="À propos" style={{ borderBottom: "var(--border-base)", background: "var(--forest)" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "64px 32px" }}>
          <p
            className="section-label"
            style={{ color: "rgba(255,255,255,0.35)", marginBottom: "20px" }}
          >
            À propos
          </p>
          <h1
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(48px, 9vw, 96px)",
              color: "var(--lime)",
              lineHeight: 0.92,
              letterSpacing: "-0.04em",
              maxWidth: "700px",
            }}
          >
            Au calme,<br />vraiment.
          </h1>
        </div>
      </section>

      {/* ── L'origine ── */}
      <section aria-label="L'origine du podcast" style={{ borderBottom: "var(--border-base)" }}>
        <div
          className="grid-2col"
          style={{
            maxWidth: "1200px",
            margin: "0 auto",
            padding: "64px 32px",
            gap: "64px",
            alignItems: "start",
          }}
        >
          <div>
            <p className="section-label" style={{ marginBottom: "20px" }}>
              L&apos;origine
            </p>
            <h2
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(24px, 3vw, 36px)",
                letterSpacing: "-0.04em",
                color: "var(--forest)",
                lineHeight: 1.05,
                marginBottom: "24px",
              }}
            >
              Une promenade de chien et une frustration simple.
            </h2>
          </div>

          <div
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "1rem",
              color: "var(--forest)",
              lineHeight: 1.75,
              display: "flex",
              flexDirection: "column",
              gap: "20px",
            }}
          >
            <p>
              La plupart des podcasts réaction, c&apos;est fort. C&apos;est vivant, c&apos;est
              énergique — et c&apos;est très bien. Mais quand on veut écouter quelque chose en
              promenant le chien, avant de dormir, ou juste dans un moment calme, ça tape vite trop
              fort.
            </p>
            <p>
              OKLM Drag Club est né de là : l&apos;envie d&apos;un espace où on parle de drag et de
              téléréalité avec le même soin qu&apos;on met à regarder ces émissions. Posément.
              Honnêtement. Sans monter dans les tours pour simuler de l&apos;enthousiasme.
            </p>
            <p>
              OKLM, c&apos;est &ldquo;au calme&rdquo; — et c&apos;est précisément la promesse. Des
              réactions sincères, des analyses bienveillantes, un regard attentif sur des émissions
              qui méritent mieux que d&apos;être juste commentées à voix haute.
            </p>
          </div>
        </div>
      </section>

      {/* ── La démarche ── */}
      <section
        aria-label="La démarche"
        style={{
          borderBottom: "var(--border-base)",
          background: "var(--lime)",
        }}
      >
        <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "64px 32px" }}>
          <p className="section-label" style={{ marginBottom: "20px" }}>
            La démarche
          </p>
          <div
            className="grid-3col"
            style={{
              gap: "2px",
              border: "var(--border-base)",
              borderRadius: "var(--radius-xs)",
              overflow: "hidden",
            }}
          >
            {[
              {
                label: "Pas de performance",
                text: "Les réactions sont réelles, pas construites pour faire du bruit. Si un épisode est bien, on dit pourquoi. Si c'est décevant, on le dit aussi.",
              },
              {
                label: "Bienveillance d'abord",
                text: "Critiquer une émission ne veut pas dire malmener ses participant·es. On garde un regard humain sur des gens qui prennent des risques devant une caméra.",
              },
              {
                label: "Au rythme de l'auditeur·rice",
                text: "Pas de cliffhangers artificiels, pas de montée en tension forcée. On peut écouter en faisant autre chose. C'est fait pour ça.",
              },
            ].map(({ label, text }) => (
              <div
                key={label}
                style={{
                  padding: "32px 28px",
                  background: "var(--lime)",
                  borderRight: "var(--border-base)",
                }}
              >
                <p
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "1.125rem",
                    letterSpacing: "-0.03em",
                    color: "var(--forest)",
                    marginBottom: "12px",
                    lineHeight: 1.1,
                  }}
                >
                  {label}
                </p>
                <p
                  style={{
                    fontFamily: "var(--font-body)",
                    fontSize: "0.9375rem",
                    color: "var(--forest)",
                    lineHeight: 1.65,
                    opacity: 0.8,
                  }}
                >
                  {text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Les émissions ── */}
      <section aria-label="Les émissions" style={{ borderBottom: "var(--border-base)" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "64px 32px" }}>
          <p className="section-label" style={{ marginBottom: "32px" }}>
            Les émissions
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
            {SHOWS_LIST.map((show) => (
              <div
                key={show.id}
                className="show-row"
                style={{
                  border: "var(--border-base)",
                  borderRadius: "var(--radius-xs)",
                  overflow: "hidden",
                }}
              >
                {/* Couleur show */}
                <div
                  className="show-row-header"
                  style={{
                    backgroundColor: show.color,
                    backgroundImage:
                      "repeating-linear-gradient(135deg, transparent 0, transparent 8px, rgba(0,0,0,0.07) 8px, rgba(0,0,0,0.07) 16px)",
                    padding: "28px 24px",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                  }}
                >
                  <span className={`badge ${show.badgeClass}`} style={{ alignSelf: "flex-start" }}>
                    {show.abbr}
                  </span>
                  <h3
                    style={{
                      fontFamily: "var(--font-display)",
                      fontSize: "1.125rem",
                      letterSpacing: "-0.03em",
                      color: "var(--forest)",
                      lineHeight: 1.1,
                      marginTop: "16px",
                    }}
                  >
                    {show.label}
                  </h3>
                </div>

                {/* Description */}
                <div
                  style={{
                    padding: "28px 32px",
                    background: "var(--white)",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <p
                    style={{
                      fontFamily: "var(--font-body)",
                      fontSize: "0.9375rem",
                      color: "var(--forest)",
                      lineHeight: 1.65,
                      opacity: 0.85,
                    }}
                  >
                    {show.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section aria-label="Commencer à écouter" style={{ borderBottom: "var(--border-base)" }}>
        <div
          style={{
            maxWidth: "1200px",
            margin: "0 auto",
            padding: "64px 32px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "32px",
            flexWrap: "wrap",
          }}
        >
          <h2
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(28px, 4vw, 52px)",
              letterSpacing: "-0.04em",
              color: "var(--forest)",
              lineHeight: 1,
              maxWidth: "480px",
            }}
          >
            Prêt·e à écouter autrement ?
          </h2>
          <Link href="/episodes" className="btn btn-primary">
            Voir les épisodes
          </Link>
        </div>
      </section>
    </>
  );
}
