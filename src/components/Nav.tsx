import Link from "next/link";
import NavMobileMenu from "./NavMobileMenu";

const NAV_LINKS = [
  { href: "/episodes", label: "Épisodes" },
  { href: "/about", label: "À propos" },
];

export default function Nav() {
  return (
    <nav
      style={{
        background: "var(--white)",
        borderBottom: "var(--border-base)",
        position: "sticky",
        top: 0,
        zIndex: 100,
      }}
    >
      <div
        style={{
          height: "56px",
          padding: "0 32px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
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

        {/* Desktop */}
        <div className="nav-desktop">
          {NAV_LINKS.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              style={{
                fontFamily: "var(--font-body)",
                fontWeight: 500,
                fontSize: "0.9375rem",
                color: "var(--forest-mid)",
                textDecoration: "none",
              }}
            >
              {label}
            </Link>
          ))}
          <Link
            href="/#rss"
            className="btn btn-primary"
            style={{ padding: "8px 18px", fontSize: "0.75rem" }}
          >
            S&apos;abonner
          </Link>
        </div>

        <NavMobileMenu links={NAV_LINKS} />
      </div>
    </nav>
  );
}
