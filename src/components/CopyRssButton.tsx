"use client";

import { useState } from "react";

const RSS_URL = "https://anchor.fm/s/f3147f50/podcast/rss";

export default function CopyRssButton() {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    await navigator.clipboard.writeText(RSS_URL);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", alignItems: "stretch" }}>
      <div
        style={{
          fontFamily: "var(--font-body)",
          fontSize: "0.875rem",
          color: "var(--forest)",
          background: "var(--white)",
          border: "var(--border-base)",
          borderRadius: "var(--radius-xs)",
          padding: "10px 14px",
          flex: 1,
          minWidth: "220px",
          opacity: 0.7,
          display: "flex",
          alignItems: "center",
          userSelect: "all",
        }}
      >
        {RSS_URL}
      </div>
      <button onClick={handleCopy} className="btn btn-primary">
        {copied ? "Copié ✓" : "Copier le lien"}
      </button>
    </div>
  );
}
