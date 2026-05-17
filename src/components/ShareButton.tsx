"use client";

import { useState } from "react";

export default function ShareButton({ url, title }: { url: string; title: string }) {
  const [copied, setCopied] = useState(false);

  async function handleShare() {
    if (typeof navigator !== "undefined" && navigator.share) {
      try {
        await navigator.share({ title, url });
        return;
      } catch {
        // Annulé par l'utilisateur — ne pas copier
        return;
      }
    }
    await navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <button onClick={handleShare} className="btn btn-ghost">
      {copied ? (
        "Lien copié ✓"
      ) : (
        <>
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
            <circle cx="11" cy="2.5" r="1.5" stroke="currentColor" strokeWidth="1.5" />
            <circle cx="11" cy="11.5" r="1.5" stroke="currentColor" strokeWidth="1.5" />
            <circle cx="3" cy="7" r="1.5" stroke="currentColor" strokeWidth="1.5" />
            <line x1="4.3" y1="6.2" x2="9.7" y2="3.3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            <line x1="4.3" y1="7.8" x2="9.7" y2="10.7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
          Partager
        </>
      )}
    </button>
  );
}
