import Link from "next/link";

export default function Nav() {
  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-5"
      style={{
        backdropFilter: "blur(16px)",
        WebkitBackdropFilter: "blur(16px)",
        background: "rgba(250,244,238,0.7)",
        borderBottom: "0.5px solid rgba(180,150,150,0.18)",
      }}
    >
      <Link href="/" className="font-italiana text-[10px] tracking-[0.32em] text-plum hover:text-gold transition-colors duration-300" style={{ fontFamily: '"Italiana", serif', fontStyle: "normal", letterSpacing: "0.32em", textTransform: "uppercase", color: "#5A3E50" }}>
        OKLM Drag Club
      </Link>

      <div className="flex items-center gap-8">
        <Link
          href="/episodes"
          className="font-italiana text-[9px] transition-colors duration-300"
          style={{ fontFamily: '"Italiana", serif', fontStyle: "normal", letterSpacing: "0.28em", textTransform: "uppercase", color: "#8A7080" }}
        >
          Épisodes
        </Link>
        <Link
          href="/#platforms"
          className="glass-pill px-5 py-2 font-italiana text-[9px] transition-all duration-300 hover:shadow-[0_0_20px_rgba(184,128,104,0.25)]"
          style={{ fontFamily: '"Italiana", serif', fontStyle: "normal", letterSpacing: "0.28em", textTransform: "uppercase", color: "#B88068" }}
        >
          Écouter
        </Link>
      </div>
    </nav>
  );
}
