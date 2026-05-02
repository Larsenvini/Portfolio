import { useState } from "react";
import profileData from "../../data/profileData";

export default function Stack() {
  const [hovered, setHovered] = useState(null);
  const groups = Object.entries(profileData.skills);

  return (
    <section
      id="stack"
      style={{
        padding: "140px clamp(24px, 8vw, 120px)",
        borderTop: "1px solid var(--border)",
      }}
    >
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        <div className="reveal" style={{ marginBottom: "32px" }}>
          <span className="section-meta">
            <span className="dot" />
            <span><span className="k">section:</span> <span className="v">stack</span></span>
            <span className="sep">·</span>
            <span><span className="k">groups:</span> <span className="v">{groups.length}</span></span>
          </span>
        </div>

        <h2
          className="reveal reveal-d-1"
          style={{
            fontSize: "clamp(36px, 5vw, 64px)", fontWeight: 800,
            letterSpacing: "-0.035em", lineHeight: 1.0,
            marginBottom: "80px",
          }}
        >
          What I{" "}
          <span style={{ fontFamily: "var(--serif)", fontStyle: "italic", color: "var(--accent)", fontWeight: 400 }}>
            work with
          </span>.
        </h2>

        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
          gap: "16px",
        }}>
          {groups.map(([groupName, items], gi) => (
            <div
              key={gi}
              className={`reveal reveal-d-${(gi % 4) + 1}`}
              onMouseEnter={() => setHovered(gi)}
              onMouseLeave={() => setHovered(null)}
              style={{
                background: hovered === gi ? "var(--bg3)" : "var(--bg2)",
                border: `1px solid ${hovered === gi ? "rgba(45,212,191,0.3)" : "var(--border)"}`,
                borderRadius: "12px",
                padding: "26px",
                transition: "all 0.25s",
                opacity: hovered !== null && hovered !== gi ? 0.4 : 1,
              }}
            >
              <div style={{
                display: "flex", justifyContent: "space-between", alignItems: "flex-start",
                marginBottom: "20px", paddingBottom: "16px",
                borderBottom: "1px solid var(--border)",
              }}>
                <p style={{
                  fontFamily: "var(--mono)", fontSize: "10px", letterSpacing: "0.18em",
                  color: "var(--accent)", textTransform: "uppercase",
                }}>{groupName}</p>
                <span style={{
                  fontFamily: "var(--mono)", fontSize: "10px", color: "var(--text3)",
                }}>{String(items.length).padStart(2, "0")}</span>
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                {items.map((skill, si) => (
                  <div key={si} style={{
                    display: "flex", alignItems: "center", gap: "10px",
                    fontFamily: "var(--mono)", fontSize: "12px",
                    color: hovered === gi ? "var(--text)" : "var(--text2)",
                    transition: "color 0.2s",
                  }}>
                    <span style={{
                      width: "4px", height: "4px", borderRadius: "50%",
                      background: hovered === gi ? "var(--accent)" : "var(--border2)",
                      flexShrink: 0, transition: "background 0.2s",
                    }} />
                    {skill}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
