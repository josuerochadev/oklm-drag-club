import type { CSSProperties } from "react";
export default function Cherub({ className = "", style }: { className?: string; style?: CSSProperties }) {
  return (
    <svg style={style}
      viewBox="0 0 280 360"
      className={className}
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      {/* ── Left wing (large, spread upward-left) ── */}
      <path d="
        M110,190
        Q80,160 40,120
        Q10,88 20,55
        Q30,28 55,42
        Q72,52 85,78
        Q95,100 100,130
        Q108,160 110,190 Z
      " />
      {/* Wing feather lines */}
      <path d="M85,78 Q65,95 60,130" stroke="white" strokeWidth="1.5" fill="none" opacity="0.25" />
      <path d="M72,95 Q55,112 52,148" stroke="white" strokeWidth="1.5" fill="none" opacity="0.2" />
      <path d="M60,115 Q46,132 45,162" stroke="white" strokeWidth="1.5" fill="none" opacity="0.15" />

      {/* ── Right wing (smaller, spread right) ── */}
      <path d="
        M160,195
        Q185,168 218,142
        Q248,118 255,88
        Q260,65 242,56
        Q224,48 208,66
        Q192,84 178,112
        Q168,138 162,168
        Q160,182 160,195 Z
      " />
      {/* Right wing feather lines */}
      <path d="M208,66 Q220,90 222,122" stroke="white" strokeWidth="1.5" fill="none" opacity="0.25" />
      <path d="M224,80 Q234,104 234,136" stroke="white" strokeWidth="1.5" fill="none" opacity="0.2" />

      {/* ── Body (chubby oval) ── */}
      <ellipse cx="136" cy="240" rx="52" ry="60" />

      {/* ── Head ── */}
      <circle cx="158" cy="138" r="52" />

      {/* ── Curly hair — several overlapping circles ── */}
      <circle cx="118" cy="102" r="18" />
      <circle cx="135" cy="90" r="20" />
      <circle cx="156" cy="86" r="20" />
      <circle cx="176" cy="92" r="18" />
      <circle cx="192" cy="108" r="15" />
      <circle cx="197" cy="128" r="13" />
      {/* Hair highlight gaps */}
      <circle cx="136" cy="108" r="10" fill="white" opacity="0.1" />
      <circle cx="162" cy="100" r="9" fill="white" opacity="0.08" />

      {/* ── Face features ── */}
      {/* Eyes */}
      <circle cx="146" cy="135" r="7" fill="white" />
      <circle cx="148" cy="134" r="4" />
      <circle cx="168" cy="133" r="7" fill="white" />
      <circle cx="170" cy="132" r="4" />
      {/* Nose */}
      <circle cx="158" cy="148" r="3" fill="white" opacity="0.4" />
      {/* Mouth — small curved line */}
      <path d="M150,158 Q158,164 166,158" stroke="white" strokeWidth="2.5" fill="none" strokeLinecap="round" opacity="0.5" />

      {/* ── Left arm — extended outward and upward ── */}
      <path d="M102,205 Q72,188 48,168 Q32,154 22,140" stroke="currentColor" strokeWidth="16" fill="none" strokeLinecap="round" />
      {/* Hand */}
      <circle cx="18" cy="136" r="12" />
      {/* Fingers */}
      <path d="M8,128 Q2,118 6,112 Q12,106 18,114 M18,124 Q14,112 18,106 Q24,100 28,110 M26,128 Q26,116 32,112 Q38,108 38,118" stroke="currentColor" strokeWidth="4" fill="none" strokeLinecap="round" opacity="0.85" />

      {/* ── Chubby legs ── */}
      <path d="M108,292 Q96,318 90,345" stroke="currentColor" strokeWidth="22" fill="none" strokeLinecap="round" />
      <path d="M158,296 Q162,322 168,348" stroke="currentColor" strokeWidth="22" fill="none" strokeLinecap="round" />

      {/* ── Feet ── */}
      <ellipse cx="88" cy="350" rx="18" ry="10" />
      <ellipse cx="170" cy="352" rx="18" ry="10" />

      {/* ── Belly button (classic putto detail) ── */}
      <circle cx="136" cy="252" r="5" fill="white" opacity="0.2" />

      {/* ── Engraving hatching on body ── */}
      <path d="M90,230 Q100,220 118,228" stroke="white" strokeWidth="1" fill="none" opacity="0.15" />
      <path d="M88,244 Q100,232 120,240" stroke="white" strokeWidth="1" fill="none" opacity="0.12" />
      <path d="M90,258 Q104,245 124,254" stroke="white" strokeWidth="1" fill="none" opacity="0.1" />
    </svg>
  );
}
