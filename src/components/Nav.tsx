import Link from "next/link";

export default function Nav() {
  return (
    <nav
      style={{
        height: "56px",
        padding: "0 32px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        background: "var(--white)",
        borderBottom: "var(--border-base)",
        position: "sticky",
        top: 0,
        zIndex: 100,
      }}
    >
      <Link
        href="/"
        style={{
          fontFamily: "var(--font-display)",
          fontSize: "1.5rem",
          letterSpacing: "-0.04em",
          color: "var(--forest)",
          textDecoration: "none",
        }}
      >
        OKLM
      </Link>

      <div style={{ display: "flex", alignItems: "center", gap: "32px" }}>
        <Link
          href="/episodes"
          style={{
            fontFamily: "var(--font-body)",
            fontWeight: 500,
            fontSize: "0.9375rem",
            color: "var(--forest-mid)",
            textDecoration: "none",
          }}
        >
          Épisodes
        </Link>
        <Link
          href="/about"
          style={{
            fontFamily: "var(--font-body)",
            fontWeight: 500,
            fontSize: "0.9375rem",
            color: "var(--forest-mid)",
            textDecoration: "none",
          }}
        >
          À propos
        </Link>
        <Link
          href="/#newsletter"
          className="btn btn-primary"
          style={{ padding: "8px 18px", fontSize: "0.75rem" }}
        >
          S&apos;abonner
        </Link>
      </div>
    </nav>
  );
}
