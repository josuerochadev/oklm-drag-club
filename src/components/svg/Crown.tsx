import type { CSSProperties } from "react";
export default function Crown({ className = "", style }: { className?: string; style?: CSSProperties }) {
  return (
    <svg style={style}
      viewBox="0 0 200 185"
      className={className}
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      {/* ── 5 peaks ── */}
      {/* Outer left */}
      <path d="M15,118 L32,52 L49,118 Z" />
      {/* Inner left */}
      <path d="M62,118 L74,78 L86,118 Z" />
      {/* Center — tallest */}
      <path d="M91,118 L100,14 L109,118 Z" />
      {/* Inner right */}
      <path d="M114,118 L126,78 L138,118 Z" />
      {/* Outer right */}
      <path d="M151,118 L168,52 L185,118 Z" />

      {/* ── Orbs at tips ── */}
      <circle cx="32" cy="41" r="13" />
      <circle cx="74" cy="67" r="10" />
      <circle cx="100" cy="4" r="14" />
      <circle cx="126" cy="67" r="10" />
      <circle cx="168" cy="41" r="13" />

      {/* ── Base band ── */}
      <path d="M8,118 L192,118 L192,168 Q192,177 183,177 L17,177 Q8,177 8,168 Z" />

      {/* ── Band decoration — pearls ── */}
      <circle cx="32" cy="146" r="7" fill="white" opacity="0.25" />
      <circle cx="60" cy="142" r="5" fill="white" opacity="0.2" />
      <circle cx="84" cy="146" r="7" fill="white" opacity="0.25" />
      <circle cx="100" cy="142" r="9" fill="white" opacity="0.3" />
      <circle cx="116" cy="146" r="7" fill="white" opacity="0.25" />
      <circle cx="140" cy="142" r="5" fill="white" opacity="0.2" />
      <circle cx="168" cy="146" r="7" fill="white" opacity="0.25" />

      {/* ── Fine engraving lines on band ── */}
      {[28, 46, 64, 82, 100, 118, 136, 154, 172].map((x) => (
        <rect key={x} x={x} y={122} width={1.5} height={50} fill="white" opacity="0.15" />
      ))}

      {/* ── Small star/cross at center orb ── */}
      <path
        d="M97,4 L100,-4 L103,4 L111,1 L103,4 L106,12 L100,6 L94,12 L97,4 L89,1 Z"
        fill="white"
        opacity="0.5"
      />
    </svg>
  );
}
