"use client";

import { useState } from "react";

export default function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Placeholder — à connecter à un service email
    setSent(true);
  };

  if (sent) {
    return (
      <p
        className="fade-up"
        style={{
          fontFamily: '"Cormorant Garamond", serif',
          fontStyle: "italic",
          fontWeight: 300,
          fontSize: "15px",
          color: "#B88068",
          letterSpacing: "0.04em",
        }}
      >
        ✦ À très vite dans vos oreilles.
      </p>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex gap-3 flex-wrap justify-center">
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="votre@email.com"
        required
        className="glass-pill outline-none"
        style={{
          padding: "10px 20px",
          fontFamily: '"Cormorant Garamond", serif',
          fontStyle: "italic",
          fontWeight: 300,
          fontSize: "15px",
          color: "#5A3E50",
          minWidth: "220px",
          background: "rgba(255,255,255,0.5)",
        }}
      />
      <button
        type="submit"
        className="transition-all duration-300 hover:shadow-[0_0_28px_rgba(184,128,104,0.4)] hover:scale-105 active:scale-100"
        style={{
          padding: "10px 28px",
          borderRadius: "999px",
          background: "linear-gradient(135deg, #D4A088, #B88068)",
          fontFamily: '"Italiana", serif',
          fontStyle: "normal",
          letterSpacing: "0.28em",
          textTransform: "uppercase",
          fontSize: "9px",
          color: "#fff",
          border: "none",
          cursor: "pointer",
        }}
      >
        S&apos;abonner
      </button>
    </form>
  );
}
