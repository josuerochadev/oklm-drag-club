"use client";

import Link from "next/link";

export default function Error({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div
      style={{
        maxWidth: "600px",
        margin: "0 auto",
        padding: "80px 32px",
        textAlign: "center",
      }}
    >
      <p className="section-label" style={{ marginBottom: "16px" }}>
        Erreur
      </p>
      <h1
        style={{
          fontFamily: "var(--font-display)",
          fontSize: "clamp(28px, 5vw, 48px)",
          color: "var(--forest)",
          letterSpacing: "-0.04em",
          lineHeight: 1.05,
          marginBottom: "24px",
        }}
      >
        Quelque chose s&apos;est mal passé.
      </h1>
      <p
        style={{
          fontFamily: "var(--font-body)",
          fontSize: "0.9375rem",
          color: "var(--forest-mid)",
          lineHeight: 1.65,
          marginBottom: "32px",
        }}
      >
        Une erreur inattendue s&apos;est produite. Vous pouvez réessayer ou revenir à l&apos;accueil.
      </p>
      <div
        style={{
          display: "flex",
          gap: "12px",
          justifyContent: "center",
          flexWrap: "wrap",
        }}
      >
        <button onClick={reset} className="btn btn-primary">
          Réessayer
        </button>
        <Link href="/" className="btn btn-ghost">
          Accueil
        </Link>
      </div>
    </div>
  );
}
