/** Icônes plateformes monochromes — fill="currentColor" */
import type { CSSProperties } from "react";
type IconProps = { className?: string; style?: CSSProperties };

export function SpotifyIcon({ className = "", style }: IconProps) {
  return (
    <svg viewBox="0 0 40 40" className={className} style={style} fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="Spotify">
      <circle cx="20" cy="20" r="19" stroke="currentColor" strokeWidth="2" />
      <path d="M10 15 Q20 11 30 14" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" fill="none" />
      <path d="M11 21 Q20 17 29 20" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" fill="none" />
      <path d="M13 27 Q20 23 27 26" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" fill="none" />
    </svg>
  );
}

export function AppleIcon({ className = "", style }: IconProps) {
  return (
    <svg viewBox="0 0 40 40" className={className} style={style} fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="Apple Podcasts">
      <circle cx="20" cy="20" r="19" stroke="currentColor" strokeWidth="2" />
      {/* Microphone */}
      <rect x="15" y="10" width="10" height="14" rx="5" fill="currentColor" />
      {/* Stand */}
      <path d="M11 22 Q11 30 20 30 Q29 30 29 22" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" />
      <line x1="20" y1="30" x2="20" y2="35" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <line x1="15" y1="35" x2="25" y2="35" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

export function DeezerIcon({ className = "", style }: IconProps) {
  return (
    <svg viewBox="0 0 40 40" className={className} style={style} fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-label="Deezer">
      <circle cx="20" cy="20" r="19" fill="none" stroke="currentColor" strokeWidth="2" />
      {/* Sound wave bars */}
      <rect x="8"  y="22" width="4" height="8"  rx="2" />
      <rect x="14" y="18" width="4" height="12" rx="2" />
      <rect x="20" y="14" width="4" height="16" rx="2" />
      <rect x="26" y="18" width="4" height="12" rx="2" />
      {/* Small heart */}
      <path d="M18,11 Q20,8 22,11 Q24,8 26,11 Q26,14 20,18 Q14,14 14,11 Q16,8 18,11 Z" />
    </svg>
  );
}

export function AmazonIcon({ className = "", style }: IconProps) {
  return (
    <svg viewBox="0 0 40 40" className={className} style={style} fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="Amazon Music">
      <circle cx="20" cy="20" r="19" stroke="currentColor" strokeWidth="2" />
      {/* Note de musique */}
      <path d="M17 27 L17 14 L28 11 L28 22" stroke="currentColor" strokeWidth="2.2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="14" cy="27" r="4" fill="currentColor" />
      <circle cx="25" cy="22" r="4" fill="currentColor" />
    </svg>
  );
}
