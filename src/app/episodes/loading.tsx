export default function EpisodesLoading() {
  return (
    <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "48px 32px 80px" }}>
      {/* Title skeleton */}
      <div style={{ marginBottom: "40px" }}>
        <div
          className="skeleton"
          style={{ width: "320px", height: "72px", marginBottom: "16px" }}
        />
        <div
          className="skeleton"
          style={{ width: "120px", height: "14px", marginBottom: "32px" }}
        />
        <div style={{ height: "2px", background: "var(--forest)", marginBottom: "24px", opacity: 0.2 }} />

        {/* Filter badges skeleton */}
        <div style={{ display: "flex", gap: "8px", marginBottom: "16px" }}>
          {Array.from({ length: 5 }, (_, i) => (
            <div
              key={i}
              className="skeleton"
              style={{ width: `${60 + i * 15}px`, height: "28px", borderRadius: "var(--radius-xs)" }}
            />
          ))}
        </div>

        {/* Search skeleton */}
        <div
          className="skeleton"
          style={{ width: "100%", maxWidth: "400px", height: "42px", borderRadius: "var(--radius-xs)" }}
        />
      </div>

      {/* Grid skeleton */}
      <div className="episode-grid">
        {Array.from({ length: 12 }, (_, i) => (
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
  );
}
