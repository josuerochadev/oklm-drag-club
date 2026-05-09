import type { CSSProperties } from "react";
export default function Bird({ className = "", style }: { className?: string; style?: CSSProperties }) {
  return (
    <svg style={style}
      viewBox="0 0 190 230"
      className={className}
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      {/* ── Tail feathers ── */}
      <path d="M28,142 Q4,128 2,152 Q4,170 30,162 Q22,178 6,184 Q24,190 36,172 Q40,185 28,196 Q46,194 50,178 Q54,190 48,202 Q62,196 60,180 L52,150 Z" />

      {/* ── Body ── */}
      <ellipse cx="90" cy="130" rx="55" ry="42" />

      {/* ── Wing highlight (lighter area to suggest feathers) ── */}
      <path
        d="M50,118 Q42,100 52,88 Q64,78 80,88 Q70,105 50,118 Z"
        fill="white"
        opacity="0.18"
      />

      {/* ── Wing feather lines ── */}
      <path d="M52,125 Q44,108 56,96" stroke="white" strokeWidth="1.5" fill="none" opacity="0.3" />
      <path d="M62,132 Q52,112 65,100" stroke="white" strokeWidth="1.5" fill="none" opacity="0.3" />
      <path d="M72,136 Q64,116 78,106" stroke="white" strokeWidth="1.5" fill="none" opacity="0.25" />

      {/* ── Head ── */}
      <circle cx="138" cy="74" r="38" />

      {/* ── Beak ── */}
      <path d="M172,68 L196,62 L172,78 Z" />

      {/* ── Eye ── */}
      <circle cx="152" cy="64" r="10" fill="white" />
      <circle cx="154" cy="63" r="6" />
      <circle cx="156" cy="61" r="2" fill="white" />

      {/* ── Neck join (subtle) ── */}
      <path d="M108,100 Q118,82 130,90 Q118,108 108,118 Z" fill="white" opacity="0.1" />

      {/* ── Legs ── */}
      <path
        d="M82,170 L70,205 M82,170 L86,205 M96,172 L100,207"
        stroke="currentColor"
        strokeWidth="3.5"
        fill="none"
        strokeLinecap="round"
      />

      {/* ── Claws ── */}
      <path
        d="M55,206 L73,202 M73,202 L82,207 M82,207 L90,202 M90,202 L98,208"
        stroke="currentColor"
        strokeWidth="3"
        fill="none"
        strokeLinecap="round"
      />
      <path
        d="M72,202 L66,216 M82,207 L80,220 M90,202 L88,218"
        stroke="currentColor"
        strokeWidth="2.5"
        fill="none"
        strokeLinecap="round"
      />

      {/* ── Branch ── */}
      <path
        d="M30,210 Q80,206 140,208 Q160,209 185,215"
        stroke="currentColor"
        strokeWidth="5"
        fill="none"
        strokeLinecap="round"
      />
      <path
        d="M80,210 Q75,220 68,230 M110,208 Q108,218 104,228"
        stroke="currentColor"
        strokeWidth="3"
        fill="none"
        strokeLinecap="round"
      />
    </svg>
  );
}
