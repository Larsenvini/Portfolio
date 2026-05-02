import Stream from "../ui/Stream";
import profileData from "../../data/profileData";

export default function Pillars() {
  return (
    <section
      style={{
        padding: "140px clamp(24px, 8vw, 120px)",
        borderTop: "1px solid var(--border)",
      }}
    >
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        <div className="reveal" style={{ marginBottom: "32px" }}>
          <span className="section-meta">
            <span className="dot" />
            <span><span className="k">section:</span> <span className="v">capabilities</span></span>
            <span className="sep">·</span>
            <span><span className="k">layers:</span> <span className="v">3</span></span>
          </span>
        </div>

        <h2
          className="reveal reveal-d-1"
          style={{
            fontSize: "clamp(40px, 6vw, 72px)",
            fontWeight: 800,
            letterSpacing: "-0.035em",
            lineHeight: 1.0,
            marginBottom: "80px",
            maxWidth: "1000px",
          }}
        >
          Three disciplines.{" "}
          <span style={{ fontFamily: "var(--serif)", fontStyle: "italic", color: "var(--accent)", fontWeight: 400 }}>
            One workflow.
          </span>
        </h2>

        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
          gap: "0",
          borderTop: "1px solid var(--border)",
        }}>
          {profileData.pillars.map((p, i) => (
            <div
              key={i}
              style={{
                padding: "48px 36px",
                borderRight: i < profileData.pillars.length - 1 ? "1px solid var(--border)" : "none",
                borderBottom: "1px solid var(--border)",
                position: "relative",
              }}
            >
              <span style={{
                fontFamily: "var(--mono)", fontSize: "10px", letterSpacing: "0.22em",
                color: "var(--accent)", textTransform: "uppercase",
                marginBottom: "32px",
                display: "flex", alignItems: "center", gap: "10px",
              }}>
                <span style={{ width: "16px", height: "1px", background: "var(--accent)" }} />
                {p.label}
              </span>

              <Stream
                as="h3"
                text={p.heading}
                tokenSize={1}
                tickMs={28}
                delay={150 + i * 200}
                threshold={0.3}
                style={{
                  fontFamily: "var(--sans)",
                  fontSize: "clamp(22px, 2vw, 30px)",
                  fontWeight: 700,
                  letterSpacing: "-0.025em",
                  lineHeight: 1.15,
                  marginBottom: "20px",
                  color: "var(--text)",
                  minHeight: "1.3em",
                }}
              />

              <Stream
                as="p"
                text={p.body}
                tokenSize={2}
                tickMs={14}
                delay={1100 + i * 200}
                threshold={0.3}
                showCaret
                thin
                style={{
                  fontFamily: "var(--mono)", fontSize: "13px",
                  color: "var(--text2)", lineHeight: 1.85,
                  minHeight: "5em",
                }}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
