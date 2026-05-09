export default function BackgroundGlows() {
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 overflow-hidden"
      style={{ zIndex: 0 }}
    >
      {/* Pêche haut-gauche */}
      <div
        className="halo pulse-halo"
        style={{
          width: 480,
          height: 480,
          top: "-80px",
          left: "-100px",
          background: "#FFE4D0",
          opacity: 0.38,
        }}
      />
      {/* Lavande haut-droite */}
      <div
        className="halo pulse-halo-slow"
        style={{
          width: 420,
          height: 420,
          top: "60px",
          right: "-120px",
          background: "#E8D8F0",
          opacity: 0.32,
          animationDelay: "2.5s",
        }}
      />
      {/* Or centre */}
      <div
        className="halo pulse-halo"
        style={{
          width: 360,
          height: 360,
          top: "35%",
          left: "40%",
          transform: "translate(-50%, -50%)",
          background: "#FFE0B0",
          opacity: 0.22,
          animationDelay: "4s",
        }}
      />
      {/* Pêche bas-droite */}
      <div
        className="halo pulse-halo-slow"
        style={{
          width: 500,
          height: 500,
          bottom: "-140px",
          right: "-80px",
          background: "#FFE4D0",
          opacity: 0.3,
          animationDelay: "1.2s",
        }}
      />
      {/* Lavande bas-gauche */}
      <div
        className="halo pulse-halo"
        style={{
          width: 320,
          height: 320,
          bottom: "10%",
          left: "-60px",
          background: "#E8D8F0",
          opacity: 0.28,
          animationDelay: "3.8s",
        }}
      />
    </div>
  );
}
