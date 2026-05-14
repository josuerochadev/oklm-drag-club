"use client";

import { SHOWS_LIST, type ShowId } from "@/lib/shows";

interface ShowFilterProps {
  active: ShowId | "all";
  onChange: (show: ShowId | "all") => void;
}

const ITEMS = [
  { id: "all" as const, label: "Tous", activeClass: "badge-forest" },
  ...SHOWS_LIST.map((s) => ({ id: s.id, label: s.label, activeClass: s.badgeClass })),
];

export default function ShowFilter({ active, onChange }: ShowFilterProps) {
  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
      {ITEMS.map((item) => {
        const isActive = active === item.id;
        return (
          <button
            key={item.id}
            onClick={() => onChange(item.id as ShowId | "all")}
            className={`badge ${isActive ? item.activeClass : "badge-outline"}`}
            style={{
              cursor: "pointer",
              transition: "box-shadow var(--transition-fast), transform var(--transition-fast)",
              ...(isActive
                ? { boxShadow: "var(--shadow-offset-sm)", transform: "translate(-1px, -1px)" }
                : {}),
            }}
          >
            {item.label}
          </button>
        );
      })}
    </div>
  );
}
