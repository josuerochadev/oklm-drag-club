import Link from "next/link";

export default function Nav() {
  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-4"
      style={{
        backdropFilter: "blur(14px)",
        WebkitBackdropFilter: "blur(14px)",
        background: "rgba(248,244,240,0.82)",
        borderBottom: "1.5px solid rgba(30,30,230,0.12)",
      }}
    >
      <Link
        href="/"
        className="font-display"
        style={{
          fontFamily: '"Bagel Fat One", sans-serif',
          fontSize: "18px",
          color: "#1E1EE6",
          letterSpacing: "0.01em",
        }}
      >
        OKLM
      </Link>

      <div className="flex items-center gap-6">
        <Link
          href="/episodes"
          style={{
            fontFamily: '"Inter", sans-serif',
            fontWeight: 700,
            fontSize: "13px",
            color: "#1E1EE6",
            letterSpacing: "0.04em",
          }}
          className="hover:opacity-60 transition-opacity"
        >
          Épisodes
        </Link>
        <Link
          href="/#newsletter"
          className="btn-pill btn-pill-blue"
          style={{ padding: "8px 20px", fontSize: "13px" }}
        >
          Newsletter
        </Link>
      </div>
    </nav>
  );
}
