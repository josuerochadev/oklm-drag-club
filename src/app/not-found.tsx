import Link from "next/link";

export default function NotFound() {
  return (
    <div
      style={{
        maxWidth: "640px",
        margin: "0 auto",
        padding: "96px 32px 128px",
        textAlign: "center",
      }}
    >
      <p
        className="section-label"
        style={{ marginBottom: "24px" }}
      >
        404
      </p>
      <h1
        style={{
          fontFamily: "var(--font-display)",
          fontSize: "clamp(48px, 8vw, 80px)",
          color: "var(--forest)",
          letterSpacing: "-0.04em",
          lineHeight: 0.95,
          marginBottom: "24px",
        }}
      >
        Cette page n&apos;existe pas.
      </h1>
      <p
        style={{
          fontFamily: "var(--font-body)",
          fontSize: "1rem",
          color: "var(--forest-mid)",
          lineHeight: 1.65,
          marginBottom: "40px",
        }}
      >
        Mais nos épisodes, eux, existent bel et bien —<br />
        et ils sont calmes.
      </p>
      <div style={{ display: "flex", gap: "12px", justifyContent: "center", flexWrap: "wrap" }}>
        <Link href="/episodes" className="btn btn-primary">
          Voir les épisodes
        </Link>
        <Link href="/" className="btn btn-ghost">
          Retour à l&apos;accueil
        </Link>
      </div>
    </div>
  );
}
