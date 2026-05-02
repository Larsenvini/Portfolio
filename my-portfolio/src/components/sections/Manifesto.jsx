import Stream from "../ui/Stream";
import profileData from "../../data/profileData";

export default function Manifesto() {
  return (
    <section
      style={{
        padding: "100px clamp(24px, 8vw, 120px)",
        borderTop: "1px solid var(--border)",
        background: "var(--bg2)",
      }}
    >
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        <div className="reveal" style={{ marginBottom: "60px" }}>
          <span className="section-meta">
            <span className="dot" />
            <span><span className="k">section:</span> <span className="v">manifesto</span></span>
            <span className="sep">·</span>
            <span><span className="k">tokens:</span> <span className="v">128</span></span>
          </span>
        </div>

        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
          gap: "0",
          borderTop: "1px solid var(--border)",
        }}>
          {profileData.manifesto.map((m, i) => (
            <div
              key={i}
              style={{
                padding: "40px 32px",
                borderRight: "1px solid var(--border)",
                borderBottom: "1px solid var(--border)",
                position: "relative",
                cursor: "default",
                transition: "background 0.3s",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.background = "var(--bg3)")}
              onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
            >
              <span style={{
                fontFamily: "var(--mono)", fontSize: "10px", letterSpacing: "0.22em",
                color: "var(--accent)", textTransform: "uppercase",
                marginBottom: "20px", display: "block",
              }}>
                {m.num}
              </span>

              <Stream
                as="p"
                text={m.text}
                tokenSize={1}
                tickMs={26}
                delay={i * 120}
                threshold={0.3}
                showCaret
                thin
                style={{
                  fontFamily: "var(--serif)",
                  fontSize: "clamp(20px, 1.8vw, 26px)",
                  lineHeight: 1.35,
                  color: "var(--text)",
                  fontStyle: "italic",
                  fontWeight: 400,
                  minHeight: "2.7em",
                }}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
