import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import profileData from "../../data/profileData";

gsap.registerPlugin(ScrollTrigger);

const filters = ["All", "QA", "AI", "Full Stack", "MLOps"];

const categoryColors = {
  QA: { bg: "rgba(251,191,36,0.08)", border: "rgba(251,191,36,0.25)", text: "#fbbf24" },
  AI: { bg: "rgba(45,212,191,0.08)", border: "rgba(45,212,191,0.25)", text: "#2dd4bf" },
  MLOps: { bg: "rgba(45,212,191,0.08)", border: "rgba(45,212,191,0.25)", text: "#2dd4bf" },
  "Full Stack": { bg: "rgba(167,139,250,0.08)", border: "rgba(167,139,250,0.25)", text: "#a78bfa" },
  Automation: { bg: "rgba(244,114,182,0.08)", border: "rgba(244,114,182,0.25)", text: "#f472b6" },
};

const statusStyle = {
  "In Operation": { dot: "var(--accent)", text: "var(--accent)" },
  "Live":         { dot: "var(--accent)", text: "var(--accent)" },
  "Archived":     { dot: "var(--text3)", text: "var(--text3)" },
  "In Formation": { dot: "#fbbf24",       text: "#fbbf24" },
};

export default function Work() {
  const sectionRef = useRef(null);
  const trackRef = useRef(null);
  const headRef = useRef(null);
  const [active, setActive] = useState("All");
  // Distance from the top of the section down to where cards may begin —
  // measured from the absolutely-positioned header so cards never slide under it.
  const [trackTop, setTrackTop] = useState(210);

  const allProjects = [...profileData.projects, ...profileData.comingNext];
  const filtered =
    active === "All"
      ? allProjects
      : allProjects.filter((p) => p.category === active);

  // Keep the card track below the header at any viewport width / wrap state
  useEffect(() => {
    const el = headRef.current;
    if (!el) return;
    const update = () => {
      // header sits at top:60px; add its height + a 32px gap
      setTrackTop(Math.round(60 + el.getBoundingClientRect().height + 32));
    };
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    window.addEventListener("resize", update);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", update);
    };
  }, []);

  useEffect(() => {
    if (window.matchMedia("(max-width: 900px)").matches) return;

    const ctx = gsap.context(() => {
      const section = sectionRef.current;
      const track = trackRef.current;
      if (!section || !track) return;

      const distance = () => track.scrollWidth - window.innerWidth + 80;

      gsap.to(track, {
        x: () => -distance(),
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: () => `+=${distance()}`,
          pin: true,
          scrub: 1,
          invalidateOnRefresh: true,
          anticipatePin: 1,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [active]);

  return (
    <section
      id="work"
      ref={sectionRef}
      style={{
        position: "relative",
        height: "100vh",
        overflow: "hidden",
        background: "var(--bg)",
        borderTop: "1px solid var(--border)",
      }}
    >
      <div className="work-head" ref={headRef} style={{
        position: "absolute", top: "60px",
        left: "clamp(24px, 6vw, 80px)", right: "clamp(24px, 6vw, 80px)",
        zIndex: 2,
        display: "flex", justifyContent: "space-between", alignItems: "flex-end",
        flexWrap: "wrap", gap: "20px",
      }}>
        <div>
          <span className="section-meta" style={{ marginBottom: "20px" }}>
            <span className="dot" />
            <span><span className="k">section:</span> <span className="v">work</span></span>
            <span className="sep">·</span>
            <span><span className="k">items:</span> <span className="v">{allProjects.length}</span></span>
          </span>
          <h2 style={{
            fontSize: "clamp(36px, 5vw, 64px)", fontWeight: 800,
            letterSpacing: "-0.035em", lineHeight: 1.0,
          }}>
            Projects in{" "}
            <span style={{ fontFamily: "var(--serif)", fontStyle: "italic", color: "var(--accent)", fontWeight: 400 }}>
              circulation
            </span>.
          </h2>
        </div>

        <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => setActive(f)}
              style={{
                fontFamily: "var(--mono)", fontSize: "10px", letterSpacing: "0.16em",
                padding: "8px 14px", borderRadius: "100px",
                border: `1px solid ${active === f ? "var(--accent)" : "var(--border)"}`,
                background: active === f ? "var(--accent-dim)" : "transparent",
                color: active === f ? "var(--accent)" : "var(--text2)",
                textTransform: "uppercase",
                transition: "all 0.2s",
              }}
            >
              {f}
              <span style={{ marginLeft: "6px", opacity: 0.55 }}>
                {f === "All"
                  ? allProjects.length
                  : allProjects.filter((p) => p.category === f).length}
              </span>
            </button>
          ))}
        </div>
      </div>

      <div
        ref={trackRef}
        className="work-track"
        style={{
          position: "absolute", top: trackTop, left: 0,
          height: `calc(100% - ${trackTop}px)`,
          display: "flex", alignItems: "center", gap: "32px",
          paddingLeft: "clamp(24px, 6vw, 80px)",
          paddingRight: "80px",
          willChange: "transform",
        }}
      >
        {filtered.map((project, i) => {
          const cat = categoryColors[project.category] || categoryColors["Full Stack"];
          const stat = statusStyle[project.status] || statusStyle["Live"];
          const isFormation = project.status === "In Formation";

          return (
            <div
              key={`${active}-${project.idx || i}`}
              style={{
                flexShrink: 0,
                width: "clamp(320px, 32vw, 460px)",
                height: "clamp(440px, 64vh, 600px)",
                background: "var(--bg2)",
                border: `1px solid ${project.featured ? "rgba(45,212,191,0.4)" : "var(--border)"}`,
                borderRadius: "14px",
                overflow: "hidden",
                display: "flex", flexDirection: "column",
                transition: "transform 0.4s cubic-bezier(.22,1,.36,1), border-color 0.3s, box-shadow 0.3s",
                opacity: isFormation ? 0.78 : 1,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-6px)";
                e.currentTarget.style.borderColor = project.featured ? "var(--accent)" : "var(--border2)";
                e.currentTarget.style.boxShadow = "0 24px 60px rgba(0,0,0,0.5)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.borderColor = project.featured ? "rgba(45,212,191,0.4)" : "var(--border)";
                e.currentTarget.style.boxShadow = "none";
              }}
            >
              {project.previewImage && (
                <div style={{
                  width: "100%", aspectRatio: "16/10",
                  background: "var(--bg3)",
                  position: "relative", overflow: "hidden",
                  flexShrink: 1, minHeight: "140px",
                  filter: isFormation ? "grayscale(0.5)" : "none",
                }}>
                  <img
                    src={project.previewImage}
                    alt={project.title}
                    style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                    onError={(e) => {
                      e.target.style.display = "none";
                      e.target.nextSibling.style.display = "flex";
                    }}
                  />
                  <div style={{
                    display: "none", position: "absolute", inset: 0,
                    alignItems: "center", justifyContent: "center",
                    background: "var(--bg3)",
                  }}>
                    <span style={{ fontFamily: "var(--mono)", fontSize: "10px", color: "var(--text3)", letterSpacing: "0.1em" }}>
                      {project.previewImage.split("/").pop()}
                    </span>
                  </div>

                  {project.metrics && (
                    <div style={{
                      position: "absolute", left: "10px", right: "10px", bottom: "10px",
                      display: "flex", gap: "6px",
                    }}>
                      {project.metrics.map((m) => (
                        <div key={m.label} style={{
                          flex: 1,
                          background: "rgba(10,10,12,0.72)",
                          backdropFilter: "blur(10px)",
                          WebkitBackdropFilter: "blur(10px)",
                          border: "1px solid rgba(45,212,191,0.22)",
                          borderRadius: "7px",
                          padding: "7px 9px",
                          fontFamily: "var(--mono)",
                          lineHeight: 1.4,
                          minWidth: 0,
                        }}>
                          <div style={{
                            fontSize: "8px", letterSpacing: "0.08em",
                            color: "var(--text2)", textTransform: "uppercase",
                            whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis",
                          }}>{m.label}</div>
                          <div style={{ fontSize: "12px", color: "#fff", fontWeight: 500, whiteSpace: "nowrap" }}>
                            {m.value}
                            <span style={{ fontSize: "9px", color: "var(--accent)", marginLeft: "5px" }}>
                              {m.delta}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {!project.previewImage && (
                <div style={{
                  width: "100%", aspectRatio: "16/10",
                  background: "var(--bg3)",
                  position: "relative",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  flexShrink: 1, minHeight: "140px",
                  borderBottom: "1px dashed var(--border2)",
                }}>
                  <div style={{
                    fontFamily: "var(--serif)", fontStyle: "italic",
                    fontSize: "32px", color: "var(--text3)",
                  }}>
                    in formation
                  </div>
                </div>
              )}

              <div style={{ padding: "24px 28px", display: "flex", flexDirection: "column", flex: "1 0 auto" }}>
                <div style={{
                  display: "flex", justifyContent: "space-between", alignItems: "center",
                  marginBottom: "14px",
                }}>
                  <span style={{
                    fontFamily: "var(--serif)", fontStyle: "italic",
                    fontSize: "20px", color: "var(--accent)", fontWeight: 400,
                    letterSpacing: "0.04em",
                  }}>
                    {project.idx || `0${i + 1}`}
                  </span>
                  <div style={{
                    display: "flex", alignItems: "center", gap: "8px",
                    fontFamily: "var(--mono)", fontSize: "9px", letterSpacing: "0.18em",
                    color: stat.text, textTransform: "uppercase",
                  }}>
                    <span style={{
                      width: "5px", height: "5px", borderRadius: "50%",
                      background: stat.dot,
                      animation: project.status === "In Operation" || project.status === "Live"
                        ? "pulseDot 2.5s infinite"
                        : "none",
                    }} />
                    {project.status}
                  </div>
                </div>

                <h3 style={{
                  fontSize: "20px", fontWeight: 700, letterSpacing: "-0.02em",
                  lineHeight: 1.2, marginBottom: "12px",
                }}>{project.title}</h3>

                <p style={{
                  fontFamily: "var(--mono)", fontSize: "12px",
                  color: "var(--text2)", lineHeight: 1.75,
                  marginBottom: "16px", flex: 1,
                }}>{project.description}</p>

                <div style={{ display: "flex", flexWrap: "wrap", gap: "5px", marginBottom: "14px" }}>
                  {project.technologies.slice(0, 4).map((t, j) => (
                    <span key={j} style={{
                      fontFamily: "var(--mono)", fontSize: "10px",
                      color: "var(--text2)",
                      background: "var(--bg3)", border: "1px solid var(--border)",
                      padding: "3px 8px", borderRadius: "3px",
                    }}>{t}</span>
                  ))}
                  {project.technologies.length > 4 && (
                    <span style={{
                      fontFamily: "var(--mono)", fontSize: "10px", color: "var(--text3)",
                      padding: "3px 8px",
                    }}>+{project.technologies.length - 4}</span>
                  )}
                </div>

                <div style={{
                  display: "flex", justifyContent: "space-between", alignItems: "center",
                  paddingTop: "12px",
                  borderTop: "1px solid var(--border)",
                }}>
                  <span style={{
                    fontFamily: "var(--mono)", fontSize: "9px", letterSpacing: "0.16em",
                    color: cat.text, background: cat.bg,
                    border: `1px solid ${cat.border}`,
                    padding: "3px 8px", borderRadius: "3px",
                    textTransform: "uppercase",
                  }}>
                    {project.category}
                  </span>

                  <div style={{ display: "flex", gap: "14px" }}>
                    {project.githubLink && (
                      <a href={project.githubLink} target="_blank" rel="noreferrer" style={{
                        fontFamily: "var(--mono)", fontSize: "11px", letterSpacing: "0.06em",
                        color: "var(--accent)", textDecoration: "none",
                      }}>GitHub ↗</a>
                    )}
                    {project.liveLink && (
                      <a href={project.liveLink} target="_blank" rel="noreferrer" style={{
                        fontFamily: "var(--mono)", fontSize: "11px", letterSpacing: "0.06em",
                        color: "var(--text2)", textDecoration: "none",
                      }}>Live →</a>
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })}

        <div style={{
          flexShrink: 0,
          width: "clamp(280px, 26vw, 360px)",
          height: "clamp(440px, 64vh, 600px)",
          display: "flex", flexDirection: "column",
          alignItems: "center", justifyContent: "center", gap: "20px",
          border: "1px dashed var(--border2)",
          borderRadius: "14px",
          padding: "40px",
          textAlign: "center",
        }}>
          <p style={{
            fontFamily: "var(--mono)", fontSize: "10px", letterSpacing: "0.22em",
            color: "var(--text3)", textTransform: "uppercase",
          }}>End of Stream</p>
          <p style={{
            fontFamily: "var(--serif)", fontStyle: "italic",
            fontSize: "22px", color: "var(--text2)", lineHeight: 1.4,
          }}>
            More forming.
          </p>
          <a href={profileData.contacts.github} target="_blank" rel="noreferrer" style={{
            fontFamily: "var(--mono)", fontSize: "11px", letterSpacing: "0.16em",
            color: "var(--accent)", textDecoration: "none",
            border: "1px solid var(--accent)",
            padding: "10px 22px", borderRadius: "100px",
            textTransform: "uppercase",
          }}>
            Full Index ↗
          </a>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          #work {
            height: auto !important;
            padding: 80px 24px;
          }
          .work-head {
            position: static !important;
            margin-bottom: 48px;
          }
          .work-track {
            position: static !important;
            display: grid !important;
            grid-template-columns: 1fr !important;
            gap: 24px !important;
            height: auto !important;
            padding: 0 !important;
            transform: none !important;
          }
          .work-track > div {
            width: 100% !important;
            height: auto !important;
          }
        }
      `}</style>
    </section>
  );
}
