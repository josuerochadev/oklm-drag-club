export default function EmissionLoading() {
  return (
    <>
      {/* Header skeleton */}
      <section
        style={{
          borderBottom: "var(--border-base)",
          backgroundColor: "var(--lime-soft)",
          opacity: 0.5,
        }}
      >
        <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "64px 32px" }}>
          <div className="skeleton" style={{ width: "200px", height: "40px", marginBottom: "32px", borderRadius: "var(--radius-xs)" }} />
          <div className="skeleton" style={{ width: "400px", maxWidth: "100%", height: "64px" }} />
        </div>
      </section>

      {/* Grid skeleton */}
      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "48px 32px 80px" }}>
        <div className="episode-grid">
          {Array.from({ length: 8 }, (_, i) => (
            <div
              key={i}
              style={{
                border: "var(--border-base)",
                borderRadius: "var(--radius-xs)",
                overflow: "hidden",
                opacity: 0.6,
              }}
            >
              <div className="skeleton" style={{ aspectRatio: "1", width: "100%" }} />
              <div style={{ padding: "16px" }}>
                <div className="skeleton" style={{ width: "60px", height: "10px", marginBottom: "10px" }} />
                <div className="skeleton" style={{ width: "90%", height: "18px", marginBottom: "6px" }} />
                <div className="skeleton" style={{ width: "60%", height: "18px", marginBottom: "12px" }} />
                <div className="skeleton" style={{ width: "120px", height: "10px" }} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
