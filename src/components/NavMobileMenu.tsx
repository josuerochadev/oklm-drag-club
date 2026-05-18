"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";

export default function NavMobileMenu({
  links,
}: {
  links: { href: string; label: string }[];
}) {
  const [open, setOpen] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  // Déplace le focus sur le premier lien à l'ouverture
  useEffect(() => {
    if (open && menuRef.current) {
      const first = menuRef.current.querySelector<HTMLElement>("a, button");
      first?.focus();
    }
  }, [open]);

  // Ferme et retourne le focus au bouton (Échap)
  useEffect(() => {
    if (!open) return;
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        setOpen(false);
        buttonRef.current?.focus();
      }
    }
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open]);

  return (
    <>
      <button
        ref={buttonRef}
        className="nav-hamburger"
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
        aria-expanded={open}
        aria-controls="nav-mobile-menu"
        style={{
          background: "none",
          border: "var(--border-base)",
          borderRadius: "var(--radius-xs)",
          cursor: "pointer",
          padding: "6px 10px",
          alignItems: "center",
          justifyContent: "center",
          color: "var(--forest)",
        }}
      >
        {open ? (
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
            <line x1="2" y1="2" x2="16" y2="16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            <line x1="16" y1="2" x2="2" y2="16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
        ) : (
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
            <line x1="2" y1="5" x2="16" y2="5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            <line x1="2" y1="9" x2="16" y2="9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            <line x1="2" y1="13" x2="16" y2="13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
        )}
      </button>

      {open && (
        <div
          ref={menuRef}
          id="nav-mobile-menu"
          className="nav-mobile-menu"
          style={{
            position: "absolute",
            top: "56px",
            left: 0,
            right: 0,
            background: "var(--white)",
            borderTop: "var(--border-base)",
            padding: "16px 32px 24px",
            flexDirection: "column",
            gap: "4px",
          }}
        >
          {links.map(({ href, label }) => (
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
              href="/#rss"
              onClick={() => setOpen(false)}
              className="btn btn-primary"
              style={{ width: "100%", justifyContent: "center" }}
            >
              S&apos;abonner
            </Link>
          </div>
        </div>
      )}
    </>
  );
}
