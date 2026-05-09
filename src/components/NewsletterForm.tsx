"use client";

import { useState } from "react";

export default function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);

  if (sent) {
    return (
      <p
        style={{
          fontFamily: '"Inter", sans-serif',
          fontWeight: 700,
          fontSize: "16px",
          color: "#1E1EE6",
        }}
      >
        À très vite dans vos oreilles.
      </p>
    );
  }

  return (
    <form
      onSubmit={(e) => { e.preventDefault(); setSent(true); }}
      className="flex gap-3 flex-wrap"
    >
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="votre@email.com"
        required
        style={{
          borderRadius: "999px",
          border: "2px solid #1E1EE6",
          padding: "12px 22px",
          fontFamily: '"Inter", sans-serif',
          fontWeight: 600,
          fontSize: "14px",
          color: "#1E1EE6",
          background: "rgba(255,255,255,0.7)",
          outline: "none",
          minWidth: "220px",
        }}
      />
      <button
        type="submit"
        className="btn-pill btn-pill-solid"
        style={{ padding: "12px 28px", fontSize: "14px" }}
      >
        S&apos;abonner
      </button>
    </form>
  );
}
