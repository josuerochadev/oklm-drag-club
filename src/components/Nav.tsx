"use client";

import { useState } from "react";
import Link from "next/link";

const NAV_LINKS = [
  { href: "/episodes", label: "Épisodes" },
  { href: "/about", label: "À propos" },
];

export default function Nav() {
  const [open, setOpen] = useState(false);

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
      {/* Barre principale */}
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
            href="/#newsletter"
            className="btn btn-primary"
            style={{ padding: "8px 18px", fontSize: "0.75rem" }}
          >
            S&apos;abonner
          </Link>
        </div>

        {/* Hamburger mobile */}
        <button
          className="nav-hamburger"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
          aria-expanded={open}
          style={{
            background: "none",
            border: "var(--border-base)",
            borderRadius: "var(--radius-xs)",
            cursor: "pointer",
            padding: "6px 10px",
            display: "none",
            alignItems: "center",
            justifyContent: "center",
            color: "var(--forest)",
          }}
        >
          {open ? (
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <line x1="2" y1="2" x2="16" y2="16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              <line x1="16" y1="2" x2="2" y2="16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          ) : (
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <line x1="2" y1="5" x2="16" y2="5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              <line x1="2" y1="9" x2="16" y2="9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              <line x1="2" y1="13" x2="16" y2="13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          )}
        </button>
      </div>

      {/* Menu mobile déroulant */}
      {open && (
        <div
          className="nav-mobile-menu"
          style={{
            borderTop: "var(--border-base)",
            padding: "16px 32px 24px",
            display: "none",
            flexDirection: "column",
            gap: "4px",
          }}
        >
          {NAV_LINKS.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              onClick={() => setOpen(false)}
              style={{
                fontFamily: "var(--font-body)",
                fontWeight: 500,
                fontSize: "1rem",
                color: "var(--forest)",
                textDecoration: "none",
                padding: "10px 0",
                borderBottom: "1px solid rgba(0,0,0,0.08)",
              }}
            >
              {label}
            </Link>
          ))}
          <div style={{ marginTop: "12px" }}>
            <Link
              href="/#newsletter"
              onClick={() => setOpen(false)}
              className="btn btn-primary"
              style={{ width: "100%", justifyContent: "center" }}
            >
              S&apos;abonner
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
