"use client";

import { useState } from "react";

export default function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);

  if (sent) {
    return (
      <p
        style={{
          fontFamily: "var(--font-display)",
          fontSize: "1.25rem",
          color: "var(--forest)",
          letterSpacing: "-0.03em",
        }}
      >
        À très vite dans vos oreilles.
      </p>
    );
  }

  return (
    <form
      onSubmit={(e) => { e.preventDefault(); setSent(true); }}
      style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}
    >
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="votre@email.com"
        required
        className="field-input"
        style={{ minWidth: "220px", flex: 1 }}
      />
      <button type="submit" className="btn btn-primary">
        S&apos;abonner
      </button>
    </form>
  );
}
