"use client";

import { SHOWS_LIST, type ShowId } from "@/lib/shows";

interface ShowFilterProps {
  active: ShowId | "all";
  onChange: (show: ShowId | "all") => void;
}

export default function ShowFilter({ active, onChange }: ShowFilterProps) {
  const all = [{ id: "all" as const, label: "Tous" }, ...SHOWS_LIST];

  return (
    <div className="flex flex-wrap gap-2 justify-center">
      {all.map((show) => {
        const isActive = active === show.id;
        const aura = "aura" in show ? show.aura : "#D4A088";
        return (
          <button
            key={show.id}
            onClick={() => onChange(show.id as ShowId | "all")}
            className="glass-pill transition-all duration-300 cursor-pointer hover:scale-105"
            style={{
              padding: "6px 18px",
              fontFamily: '"Italiana", serif',
              fontStyle: "normal",
              letterSpacing: "0.25em",
              textTransform: "uppercase",
              fontSize: "9px",
              color: isActive ? "#fff" : "#8A7080",
              background: isActive
                ? `linear-gradient(135deg, ${aura}, #B88068)`
                : undefined,
              boxShadow: isActive
                ? `0 0 20px ${aura}60`
                : undefined,
              border: isActive ? "none" : undefined,
            }}
          >
            {show.label}
          </button>
        );
      })}
    </div>
  );
}
