import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import profileData from "../../data/profileData";

export default function Timeline() {
  const sectionRef = useRef(null);
  const lineRef = useRef(null);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(lineRef.current, {
        scaleY: 1,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
          end: "bottom 70%",
          scrub: 0.5,
        },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      id="timeline"
      ref={sectionRef}
      style={{
        padding: "140px clamp(24px, 8vw, 120px)",
        borderTop: "1px solid var(--border)",
      }}
    >
      <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
        <div className="reveal" style={{ marginBottom: "32px" }}>
          <span className="section-meta">
            <span className="dot" />
            <span><span className="k">section:</span> <span className="v">timeline</span></span>
            <span className="sep">·</span>
            <span><span className="k">years:</span> <span className="v">2020–2026</span></span>
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
          The path so{" "}
          <span style={{ fontFamily: "var(--serif)", fontStyle: "italic", color: "var(--accent)", fontWeight: 400 }}>
            far
          </span>.
        </h2>

        <div className="timeline-grid" style={{ display: "grid", gridTemplateColumns: "200px 1fr", gap: "40px" }}>
          <div style={{ position: "sticky", top: "100px", alignSelf: "start" }}>
            {profileData.experience.map((item, i) => (
              <button
                key={i}
                onClick={() => setActive(i)}
                style={{
                  display: "block", width: "100%",
                  textAlign: "left",
                  padding: "16px 0",
                  background: "transparent",
                  border: "none",
                  borderBottom: "1px solid var(--border)",
                }}
              >
                <div style={{
                  fontFamily: "var(--mono)", fontSize: "9px", letterSpacing: "0.18em",
                  color: active === i ? "var(--accent)" : "var(--text3)",
                  marginBottom: "5px", transition: "color 0.2s",
                }}>{item.period}</div>
                <div style={{
                  fontSize: "13px", fontWeight: 600,
                  color: active === i ? "var(--text)" : "var(--text2)",
                  lineHeight: 1.3, transition: "color 0.2s",
                }}>{item.role}</div>
              </button>
            ))}
          </div>

          <div style={{ position: "relative", paddingLeft: "32px" }}>
            <div style={{
              position: "absolute", left: 0, top: "12px", bottom: 0,
              width: "1px", background: "var(--border)",
            }} />
            <div
              ref={lineRef}
              style={{
                position: "absolute", left: 0, top: "12px", bottom: 0,
                width: "1px",
                background: "var(--accent)",
                transformOrigin: "top",
                transform: "scaleY(0)",
                boxShadow: "0 0 8px var(--accent-glow)",
              }}
            />

            {profileData.experience.map((item, i) => (
              <div
                key={i}
                className={`reveal reveal-d-${i + 1}`}
                onMouseEnter={() => setActive(i)}
                style={{
                  position: "relative",
                  paddingBottom: i < profileData.experience.length - 1 ? "60px" : "0",
                }}
              >
                <div style={{
                  position: "absolute", left: "-37px", top: "10px",
                  width: "11px", height: "11px", borderRadius: "50%",
                  background: active === i ? "var(--accent)" : "var(--bg)",
                  border: `1px solid ${active === i ? "var(--accent)" : "var(--border2)"}`,
                  boxShadow: active === i ? "0 0 12px var(--accent-glow)" : "none",
                  transition: "all 0.25s",
                }} />

                <div style={{
                  background: active === i ? "var(--bg2)" : "transparent",
                  border: `1px solid ${active === i ? "var(--border2)" : "var(--border)"}`,
                  borderRadius: "10px",
                  padding: "26px 28px",
                  transition: "all 0.25s",
                }}>
                  <div style={{
                    display: "flex", justifyContent: "space-between",
                    alignItems: "flex-start", flexWrap: "wrap", gap: "8px",
                    marginBottom: "14px",
                  }}>
                    <div>
                      <h3 style={{
                        fontSize: "18px", fontWeight: 700, letterSpacing: "-0.02em",
                        marginBottom: "5px",
                      }}>{item.role}</h3>
                      <span style={{
                        fontFamily: "var(--mono)", fontSize: "11px", color: "var(--accent)",
                        letterSpacing: "0.04em",
                      }}>{item.company}</span>
                    </div>
                    <span style={{
                      fontFamily: "var(--mono)", fontSize: "10px", color: "var(--text3)",
                      letterSpacing: "0.12em",
                      background: "var(--bg3)", border: "1px solid var(--border)",
                      padding: "4px 12px", borderRadius: "3px",
                    }}>{item.period}</span>
                  </div>

                  <p style={{
                    fontFamily: "var(--mono)", fontSize: "13px",
                    color: "var(--text2)", lineHeight: 1.85, marginBottom: "20px",
                  }}>{item.description}</p>

                  <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                    {item.tags.map((tag, j) => (
                      <span key={j} style={{
                        fontFamily: "var(--mono)", fontSize: "10px",
                        color: "var(--text2)",
                        background: "var(--bg3)", border: "1px solid var(--border)",
                        padding: "4px 10px", borderRadius: "3px",
                      }}>{tag}</span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .timeline-grid { grid-template-columns: 1fr !important; }
          .timeline-grid > div:first-child { display: none; }
        }
      `}</style>
    </section>
  );
}
