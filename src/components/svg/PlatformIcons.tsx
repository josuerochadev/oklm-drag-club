import type { CSSProperties } from "react";

type IconProps = { className?: string; style?: CSSProperties; size?: number };

export function SpotifyIcon({ className = "", style, size = 36 }: IconProps) {
  // eslint-disable-next-line @next/next/no-img-element
  return <img src="/icons/spotify.svg" alt="Spotify" width={size} height={size} className={className} style={style} />;
}

export function AppleIcon({ className = "", style, size = 36 }: IconProps) {
  // eslint-disable-next-line @next/next/no-img-element
  return <img src="/icons/apple-podcasts.svg" alt="Apple Podcasts" width={size} height={size} className={className} style={style} />;
}

export function DeezerIcon({ className = "", style, size = 36 }: IconProps) {
  // eslint-disable-next-line @next/next/no-img-element
  return <img src="/icons/deezer.svg" alt="Deezer" width={size} height={size} className={className} style={style} />;
}

export function AmazonIcon({ className = "", style, size = 36 }: IconProps) {
  // eslint-disable-next-line @next/next/no-img-element
  return <img src="/icons/amazon-music.svg" alt="Amazon Music" width={size} height={size} className={className} style={style} />;
}
