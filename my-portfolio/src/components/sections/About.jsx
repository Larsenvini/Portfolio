import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import profileData from "../../data/profileData";
import Stream from "../ui/Stream";

export default function About() {
  const sectionRef = useRef(null);
  const imgRef = useRef(null);
  const [hoveredRow, setHoveredRow] = useState(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(imgRef.current, {
        y: -80,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
        },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const details = [
    { key: "Location", val: profileData.location },
    { key: "Discipline", val: "AI · MLOps · QA" },
    { key: "Experience", val: "3 years" },
    { key: "Languages", val: "Python · TS · Java" },
    { key: "Status", val: "Open to opportunities", highlight: true },
    { key: "LinkedIn", val: "vinilarsen", link: profileData.contacts.linkedin },
    { key: "GitHub", val: "Larsenvini", link: profileData.contacts.github },
  ];

  return (
    <section
      id="about"
      ref={sectionRef}
      style={{
        padding: "140px clamp(24px, 8vw, 120px)",
        borderTop: "1px solid var(--border)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        <div className="reveal" style={{ marginBottom: "32px" }}>
          <span className="section-meta">
            <span className="dot" />
            <span><span className="k">section:</span> <span className="v">about</span></span>
            <span className="sep">·</span>
            <span><span className="k">role:</span> <span className="v">human</span></span>
          </span>
        </div>

        <h2
          className="reveal reveal-d-1"
          style={{
            fontSize: "clamp(40px, 6vw, 80px)",
            fontWeight: 800,
            letterSpacing: "-0.04em",
            lineHeight: 0.98,
            marginBottom: "80px",
            maxWidth: "1100px",
          }}
        >
          One engineer.{" "}
          <span style={{ fontFamily: "var(--serif)", fontStyle: "italic", color: "var(--accent)", fontWeight: 400 }}>
            Three disciplines.
          </span>{" "}
          Zero silos.
        </h2>

        <div
          className="about-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "clamp(40px, 6vw, 100px)",
            alignItems: "start",
          }}
        >
          <div className="reveal">
            <div style={{
              width: "100%", aspectRatio: "4/5",
              borderRadius: "14px", overflow: "hidden",
              background: "var(--bg3)", border: "1px solid var(--border)",
              position: "relative",
            }}>
              <div
                ref={imgRef}
                style={{
                  position: "absolute",
                  top: "-40px", left: 0, right: 0, bottom: "-40px",
                  willChange: "transform",
                }}
              >
                <img
                  src={profileData.aboutImage}
                  alt="About Vinicius"
                  style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                  onError={(e) => {
                    e.target.style.display = "none";
                    e.target.nextSibling.style.display = "flex";
                  }}
                />
                <div style={{
                  display: "none", position: "absolute", inset: 0,
                  alignItems: "center", justifyContent: "center",
                  flexDirection: "column", gap: "10px",
                  background: "var(--bg3)",
                }}>
                  <div style={{
                    width: "84px", height: "84px", borderRadius: "50%",
                    background: "var(--accent-dim)",
                    border: "1px solid rgba(45,212,191,0.2)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                  }}>
                    <span style={{ fontSize: "30px", fontWeight: 800, color: "var(--accent)" }}>VL</span>
                  </div>
                  <span style={{ fontFamily: "var(--mono)", fontSize: "10px", color: "var(--text3)", letterSpacing: "0.14em" }}>
                    about.jpg
                  </span>
                </div>
              </div>

              <div style={{
                position: "absolute", bottom: 0, left: 0, right: 0,
                height: "40%",
                background: "linear-gradient(to top, rgba(10,10,12,0.7), transparent)",
                pointerEvents: "none",
              }} />

              <div style={{
                position: "absolute", bottom: "16px", left: "16px",
                fontFamily: "var(--mono)", fontSize: "10px", letterSpacing: "0.14em",
                color: "var(--text)", background: "rgba(10,10,12,0.7)",
                backdropFilter: "blur(8px)",
                border: "1px solid var(--border2)",
                padding: "5px 12px", borderRadius: "100px",
                display: "flex", alignItems: "center", gap: "6px",
              }}>
                <span style={{
                  width: "5px", height: "5px", borderRadius: "50%",
                  background: "var(--accent)",
                  animation: "pulseDot 2.5s infinite",
                }} />
                {profileData.location}
              </div>
            </div>
          </div>

          <div>
            {profileData.bioParagraphs.map((p, i) => (
              <Stream
                key={i}
                as="p"
                text={p}
                tokenSize={2}
                tickMs={12}
                delay={i * 600}
                threshold={0.25}
                showCaret
                thin
                style={{
                  fontFamily: i === 0 ? "var(--serif)" : "var(--mono)",
                  fontSize: i === 0 ? "clamp(20px, 1.6vw, 24px)" : "14px",
                  fontStyle: i === 0 ? "italic" : "normal",
                  fontWeight: i === 0 ? 400 : 300,
                  color: i === 0 ? "var(--text)" : "var(--text2)",
                  lineHeight: i === 0 ? 1.5 : 1.95,
                  marginBottom: "24px",
                  display: "block",
                  minHeight: i === 0 ? "4.5em" : "5.5em",
                }}
              />
            ))}

            <div className="reveal reveal-d-4" style={{ marginTop: "48px" }}>
              {details.map((d, i) => (
                <div
                  key={i}
                  onMouseEnter={() => setHoveredRow(i)}
                  onMouseLeave={() => setHoveredRow(null)}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    padding: "16px 12px",
                    borderBottom: "1px solid var(--border)",
                    borderRadius: "6px",
                    background: hoveredRow === i ? "var(--bg2)" : "transparent",
                    transition: "background 0.2s",
                  }}
                >
                  <span style={{
                    fontFamily: "var(--mono)", fontSize: "10px",
                    letterSpacing: "0.18em", color: "var(--text3)",
                    textTransform: "uppercase",
                  }}>{d.key}</span>

                  {d.link ? (
                    <a href={d.link} target="_blank" rel="noreferrer" style={{
                      fontFamily: "var(--mono)", fontSize: "12px",
                      color: "var(--accent)", textDecoration: "none",
                      transition: "opacity 0.2s",
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.7")}
                    onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
                    >{d.val} ↗</a>
                  ) : (
                    <span style={{
                      fontFamily: "var(--mono)", fontSize: "12px",
                      color: d.highlight ? "var(--accent)" : "var(--text)",
                      display: "flex", alignItems: "center", gap: "8px",
                    }}>
                      {d.highlight && (
                        <span style={{
                          width: "6px", height: "6px", borderRadius: "50%",
                          background: "var(--accent)",
                          animation: "pulseDot 2.5s infinite",
                        }} />
                      )}
                      {d.val}
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .about-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
