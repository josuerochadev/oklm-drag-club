"use client";

import { SHOWS_LIST, type ShowId } from "@/lib/shows";

interface ShowFilterProps {
  active: ShowId | "all";
  onChange: (show: ShowId | "all") => void;
}

export default function ShowFilter({ active, onChange }: ShowFilterProps) {
  const all = [{ id: "all" as const, label: "Tous" }, ...SHOWS_LIST];

  return (
    <div className="flex flex-wrap gap-2">
      {all.map((show) => {
        const isActive = active === show.id;
        return (
          <button
            key={show.id}
            onClick={() => onChange(show.id as ShowId | "all")}
            className="btn-pill transition-all duration-200 cursor-pointer"
            style={{
              padding: "8px 18px",
              fontSize: "13px",
              fontFamily: '"Inter", sans-serif',
              fontWeight: 700,
              background: isActive ? "#1E1EE6" : "#D8E8F8",
              color: isActive ? "#fff" : "#1E1EE6",
              borderColor: "#1E1EE6",
            }}
          >
            {show.label}
          </button>
        );
      })}
    </div>
  );
}
