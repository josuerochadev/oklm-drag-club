import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Politique de confidentialité",
  description:
    "Politique de confidentialité du site oklmdragclub.com — données collectées, droits des utilisateurs et contact.",
  alternates: {
    canonical: "/confidentialite",
  },
};

export default function ConfidentialitePage() {
  return (
    <>
      {/* ── En-tête ── */}
      <section
        aria-label="Politique de confidentialité"
        style={{ borderBottom: "var(--border-base)", background: "var(--forest)" }}
      >
        <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "64px 32px" }}>
          <p
            className="section-label"
            style={{ color: "rgba(255,255,255,0.35)", marginBottom: "20px" }}
          >
            Vie privée
          </p>
          <h1
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(36px, 7vw, 72px)",
              color: "var(--lime)",
              lineHeight: 0.95,
              letterSpacing: "-0.04em",
            }}
          >
            Confidentialité
          </h1>
        </div>
      </section>

      {/* ── Contenu ── */}
      <section
        aria-label="Contenu de la politique de confidentialité"
        style={{ borderBottom: "var(--border-base)" }}
      >
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
          {/* Introduction */}
          <div>
            <p>
              Le site <strong>oklmdragclub.com</strong> est conçu pour respecter votre vie privée.
              Cette page décrit les données traitées et vos droits conformément au Règlement
              Général sur la Protection des Données (RGPD) et à la loi Informatique et Libertés.
            </p>
          </div>

          {/* Responsable */}
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
              Responsable du traitement
            </h2>
            <p>
              Le responsable du traitement est Romain, éditeur du site, joignable à l&apos;adresse{" "}
              <a
                href="mailto:oklmdragclub@gmail.com"
                style={{ textDecoration: "underline", textUnderlineOffset: "3px" }}
              >
                oklmdragclub@gmail.com
              </a>
              .
            </p>
          </div>

          {/* Données collectées */}
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
              Données collectées
            </h2>
            <p style={{ marginBottom: "16px" }}>
              Ce site <strong>ne dépose aucun cookie</strong>, ne collecte aucune adresse e-mail et
              ne propose aucun formulaire de contact ou d&apos;inscription. Aucun outil
              d&apos;analyse d&apos;audience (type Google Analytics) n&apos;est utilisé.
            </p>
            <p>Deux traitements techniques ont lieu :</p>
            <ul style={{ marginTop: "12px", paddingLeft: "20px", display: "flex", flexDirection: "column", gap: "12px" }}>
              <li>
                <strong>Journaux serveur (Vercel)</strong> — l&apos;hébergeur enregistre
                automatiquement des données techniques (adresse IP, user-agent, pages consultées)
                pour assurer le bon fonctionnement et la sécurité du site. Ces données sont
                conservées conformément à la{" "}
                <a
                  href="https://vercel.com/legal/privacy-policy"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ textDecoration: "underline", textUnderlineOffset: "3px" }}
                >
                  politique de confidentialité de Vercel
                </a>
                .
              </li>
              <li>
                <strong>Suivi d&apos;erreurs (Sentry)</strong> — en cas d&apos;erreur technique sur
                le site, des informations sont transmises au service Sentry (Functional Software
                Inc.) : message d&apos;erreur, URL de la page, user-agent et adresse IP. Aucune
                donnée de session, de replay ou de performance n&apos;est collectée. Voir la{" "}
                <a
                  href="https://sentry.io/privacy/"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ textDecoration: "underline", textUnderlineOffset: "3px" }}
                >
                  politique de confidentialité de Sentry
                </a>
                .
              </li>
            </ul>
          </div>

          {/* Base légale */}
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
              Base légale
            </h2>
            <p>
              Les traitements mentionnés reposent sur l&apos;<strong>intérêt légitime</strong> de
              l&apos;éditeur (article 6.1.f du RGPD) : assurer la sécurité, la disponibilité et le
              bon fonctionnement du site.
            </p>
          </div>

          {/* Cookies */}
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
              Cookies
            </h2>
            <p>
              Ce site <strong>ne dépose aucun cookie</strong>, qu&apos;il soit de mesure
              d&apos;audience, publicitaire ou de pistage. Les polices de caractères sont
              auto-hébergées et ne génèrent aucune requête vers des serveurs tiers lors de la
              navigation.
            </p>
          </div>

          {/* Liens externes */}
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
              Liens externes
            </h2>
            <p>
              Le site contient des liens vers des plateformes tierces (Spotify, Apple Podcasts,
              Deezer, Amazon Music). En cliquant sur ces liens, vous quittez oklmdragclub.com et
              êtes soumis·e aux politiques de confidentialité de ces services.
            </p>
          </div>

          {/* Durée de conservation */}
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
              Durée de conservation
            </h2>
            <p>
              Les journaux serveur sont conservés par Vercel selon leurs propres durées de
              rétention. Les données d&apos;erreur Sentry sont conservées 90 jours par défaut.
            </p>
          </div>

          {/* Vos droits */}
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
              Vos droits
            </h2>
            <p>
              Conformément au RGPD, vous disposez d&apos;un droit d&apos;accès, de rectification,
              d&apos;effacement, de limitation, de portabilité et d&apos;opposition concernant vos
              données personnelles.
            </p>
            <p style={{ marginTop: "8px" }}>
              Pour exercer ces droits, contactez :{" "}
              <a
                href="mailto:oklmdragclub@gmail.com"
                style={{ textDecoration: "underline", textUnderlineOffset: "3px" }}
              >
                oklmdragclub@gmail.com
              </a>
            </p>
            <p style={{ marginTop: "8px" }}>
              En cas de litige, vous pouvez introduire une réclamation auprès de la{" "}
              <a
                href="https://www.cnil.fr"
                target="_blank"
                rel="noopener noreferrer"
                style={{ textDecoration: "underline", textUnderlineOffset: "3px" }}
              >
                CNIL
              </a>
              .
            </p>
          </div>

          {/* Mise à jour */}
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
              Mise à jour
            </h2>
            <p>
              Cette politique peut être modifiée à tout moment. La date de dernière mise à jour est
              indiquée ci-dessous.
            </p>
            <p style={{ marginTop: "12px", fontWeight: 600 }}>
              Dernière mise à jour : mai 2026
            </p>
          </div>

          {/* Lien mentions légales */}
          <div style={{ paddingTop: "16px", borderTop: "var(--border-thin)" }}>
            <p>
              Voir aussi les{" "}
              <Link
                href="/mentions-legales"
                style={{ textDecoration: "underline", textUnderlineOffset: "3px" }}
              >
                mentions légales
              </Link>
              .
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
