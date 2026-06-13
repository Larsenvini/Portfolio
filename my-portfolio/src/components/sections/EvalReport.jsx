import { useEffect, useRef, useState } from "react";
import profileData from "../../data/profileData";
import Stream from "../ui/Stream";

const f = profileData.flagship;

// Elevated panel surface — subtle top-lit highlight + depth shadow so cards
// lift off the near-black background instead of relying on a hairline border.
const panel = {
  background:
    "linear-gradient(180deg, rgba(255,255,255,0.025), rgba(255,255,255,0) 140px), var(--bg)",
  border: "1px solid var(--border2)",
  borderRadius: "14px",
  boxShadow:
    "inset 0 1px 0 rgba(255,255,255,0.05), 0 24px 60px -28px rgba(0,0,0,0.75)",
};

// Animated counter that runs baseline → current once visible.
// Warm→cool story: gold = the established baseline, teal = the gain on top.
function MetricBar({ metric, index, start }) {
  const [value, setValue] = useState(metric.baseline);
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (!start) return;
    const delay = 400 + index * 350;
    const duration = 1100;
    let raf;
    const t = setTimeout(() => {
      const t0 = performance.now();
      const tick = (now) => {
        const p = Math.min(1, (now - t0) / duration);
        const eased = 1 - Math.pow(1 - p, 3);
        setValue(metric.baseline + (metric.current - metric.baseline) * eased);
        if (p < 1) raf = requestAnimationFrame(tick);
        else setDone(true);
      };
      raf = requestAnimationFrame(tick);
    }, delay);
    return () => {
      clearTimeout(t);
      cancelAnimationFrame(raf);
    };
  }, [start, index, metric]);

  const gain = Math.max(0, value - metric.baseline);

  return (
    <div style={{ marginBottom: "26px" }}>
      <div style={{
        display: "flex", justifyContent: "space-between", alignItems: "baseline",
        marginBottom: "9px",
        fontFamily: "var(--mono)", fontSize: "11px", letterSpacing: "0.08em",
      }}>
        <span style={{ color: "var(--text2)" }}>{metric.label}</span>
        <span>
          <span style={{ color: "var(--gold)", fontSize: "10px" }}>
            {metric.baseline.toFixed(3)}
          </span>
          <span style={{ color: "var(--text3)", fontSize: "10px" }}> → </span>
          <span style={{ color: "var(--text)", fontWeight: 600 }}>
            {value.toFixed(3)}
          </span>
          <span style={{
            color: "var(--accent)", marginLeft: "10px", fontSize: "10px",
            opacity: done ? 1 : 0, transition: "opacity 0.4s",
          }}>
            {metric.delta} ✓
          </span>
        </span>
      </div>

      <div style={{
        height: "6px", borderRadius: "3px",
        background: "var(--bg4)", overflow: "hidden", position: "relative",
      }}>
        {/* established baseline — warm gold */}
        <div style={{
          position: "absolute", left: 0, top: 0, bottom: 0,
          width: `${metric.baseline * 100}%`,
          background: "linear-gradient(90deg, rgba(240,168,48,0.22), rgba(240,168,48,0.5))",
        }} />
        {/* the gain — cool teal, grows baseline → current */}
        <div style={{
          position: "absolute", left: `${metric.baseline * 100}%`, top: 0, bottom: 0,
          width: `${gain * 100}%`,
          background: "linear-gradient(90deg, rgba(45,212,191,0.55), var(--accent))",
          boxShadow: done ? "0 0 12px var(--accent-glow)" : "none",
          transition: "box-shadow 0.4s",
        }} />
        {/* baseline divider */}
        <div style={{
          position: "absolute", left: `${metric.baseline * 100}%`, top: "-1px", bottom: "-1px",
          width: "1px", background: "var(--gold)", zIndex: 2,
        }} />
      </div>
    </div>
  );
}

function PipelineNode({ node, index, isLast, start }) {
  const visible = start;
  const isGate = isLast;
  return (
    <>
      <div style={{
        flex: "1 1 0", minWidth: "120px",
        background: isGate ? "var(--accent-dim)" : "var(--bg3)",
        border: `1px solid ${isGate ? "rgba(45,212,191,0.35)" : "var(--border2)"}`,
        borderRadius: "10px",
        padding: "16px 14px",
        textAlign: "center",
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(12px)",
        transition: `opacity 0.5s ${index * 0.18}s, transform 0.5s ${index * 0.18}s`,
      }}>
        <p style={{
          fontFamily: "var(--mono)", fontSize: "11px", fontWeight: 500,
          letterSpacing: "0.1em", textTransform: "uppercase",
          color: isGate ? "var(--accent)" : "var(--text)",
          marginBottom: "6px",
        }}>
          {isGate && <span style={{ marginRight: "6px" }}>✓</span>}
          {node.label}
        </p>
        <p style={{
          fontFamily: "var(--mono)", fontSize: "9px", letterSpacing: "0.06em",
          color: "var(--text3)",
        }}>{node.sub}</p>
      </div>

      {!isLast && (
        <div className="pipe-link" style={{
          flexShrink: 0, width: "28px", height: "1px",
          background: "var(--border2)",
          position: "relative", overflow: "hidden",
          opacity: visible ? 1 : 0,
          transition: `opacity 0.5s ${index * 0.18 + 0.1}s`,
        }}>
          <span style={{
            position: "absolute", top: 0, left: 0, height: "100%", width: "40%",
            background: "var(--accent)",
            animation: "pipeFlow 1.6s ease-in-out infinite",
            animationDelay: `${index * 0.25}s`,
          }} />
        </div>
      )}
    </>
  );
}

export default function EvalReport() {
  const sectionRef = useRef(null);
  const [start, setStart] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStart(true);
          observer.disconnect();
        }
      },
      { threshold: 0.25 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="flagship"
      ref={sectionRef}
      style={{
        padding: "140px clamp(24px, 8vw, 120px)",
        borderTop: "1px solid var(--border)",
        background: "var(--bg2)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* cool glow */}
      <div style={{
        position: "absolute", top: "-140px", right: "8%",
        width: "560px", height: "560px",
        background: "radial-gradient(circle, rgba(45,212,191,0.10) 0%, transparent 65%)",
        pointerEvents: "none", zIndex: 0,
      }} />
      {/* warm counter-glow — frames the baseline→current temperature story */}
      <div style={{
        position: "absolute", bottom: "-180px", left: "-60px",
        width: "520px", height: "520px",
        background: "radial-gradient(circle, rgba(240,168,48,0.07) 0%, transparent 65%)",
        pointerEvents: "none", zIndex: 0,
      }} />

      <div style={{ maxWidth: "1200px", margin: "0 auto", position: "relative", zIndex: 1 }}>
        <div className="reveal" style={{ marginBottom: "32px" }}>
          <span className="section-meta">
            <span className="dot" />
            <span><span className="k">section:</span> <span className="v">flagship</span></span>
            <span className="sep">·</span>
            <span><span className="k">status:</span> <span className="v">live · gates passing</span></span>
          </span>
        </div>

        <h2
          className="reveal reveal-d-1"
          style={{
            fontSize: "clamp(40px, 6vw, 80px)",
            fontWeight: 800,
            letterSpacing: "-0.04em",
            lineHeight: 0.98,
            marginBottom: "28px",
            maxWidth: "1100px",
          }}
        >
          {f.name}
          <span style={{ color: "var(--accent)" }}>.</span>
        </h2>

        <p className="reveal reveal-d-2" style={{
          fontFamily: "var(--serif)", fontStyle: "italic",
          fontSize: "clamp(22px, 2.4vw, 32px)", fontWeight: 400,
          color: "var(--text)", lineHeight: 1.35,
          maxWidth: "760px", marginBottom: "24px",
        }}>
          {f.tagline}
        </p>

        <p className="reveal reveal-d-3" style={{
          fontFamily: "var(--mono)", fontSize: "13px",
          color: "var(--text2)", lineHeight: 1.9,
          maxWidth: "680px", marginBottom: "64px",
        }}>
          {f.summary}
        </p>

        {/* Pipeline diagram */}
        <div className="reveal reveal-d-3" style={{
          ...panel,
          padding: "28px",
          marginBottom: "40px",
        }}>
          <div style={{
            display: "flex", justifyContent: "space-between", alignItems: "center",
            flexWrap: "wrap", gap: "6px 16px",
            marginBottom: "22px", paddingBottom: "16px",
            borderBottom: "1px solid var(--border)",
          }}>
            <span style={{
              fontFamily: "var(--mono)", fontSize: "10px", letterSpacing: "0.18em",
              color: "var(--text3)", textTransform: "uppercase",
            }}>
              /pipeline/architecture
            </span>
            <span style={{
              fontFamily: "var(--mono)", fontSize: "10px", letterSpacing: "0.14em",
              color: "var(--text3)", textTransform: "uppercase",
              display: "flex", alignItems: "center", gap: "8px",
            }}>
              <span style={{
                width: "5px", height: "5px", borderRadius: "50%",
                background: "var(--accent)", animation: "pulseDot 2.5s infinite",
              }} />
              every commit
            </span>
          </div>

          <div className="pipeline-row" style={{
            display: "flex", alignItems: "center", gap: "0 12px",
            flexWrap: "wrap", rowGap: "16px",
          }}>
            {f.pipeline.map((node, i) => (
              <PipelineNode
                key={node.label}
                node={node}
                index={i}
                isLast={i === f.pipeline.length - 1}
                start={start}
              />
            ))}
          </div>
        </div>

        {/* Eval scores + facts */}
        <div className="eval-grid" style={{
          display: "grid",
          gridTemplateColumns: "1.2fr 1fr",
          gap: "clamp(32px, 4vw, 64px)",
          alignItems: "start",
        }}>
          <div className="reveal reveal-d-4" style={{
            ...panel,
            padding: "28px",
          }}>
            <div style={{
              display: "flex", justifyContent: "space-between", alignItems: "center",
              flexWrap: "wrap", gap: "6px 16px",
              marginBottom: "26px", paddingBottom: "16px",
              borderBottom: "1px solid var(--border)",
            }}>
              <span style={{
                fontFamily: "var(--mono)", fontSize: "10px", letterSpacing: "0.18em",
                color: "var(--text3)", textTransform: "uppercase",
              }}>
                /eval/report · n=3 median
              </span>
              {/* legend — warm baseline → cool current */}
              <span style={{
                fontFamily: "var(--mono)", fontSize: "10px", letterSpacing: "0.14em",
              }}>
                <span style={{ color: "var(--gold)" }}>baseline</span>
                <span style={{ color: "var(--text3)" }}> → </span>
                <span style={{ color: "var(--accent)" }}>current</span>
              </span>
            </div>

            {f.metrics.map((m, i) => (
              <MetricBar key={m.label} metric={m} index={i} start={start} />
            ))}

            <div style={{
              display: "flex", justifyContent: "space-between", alignItems: "center",
              marginTop: "30px", paddingTop: "18px",
              borderTop: "1px dashed var(--border2)",
              fontFamily: "var(--mono)", fontSize: "11px",
            }}>
              <span style={{ color: "var(--text2)" }}>{f.highlight.label}</span>
              <span>
                <span style={{ color: "var(--gold)" }}>{f.highlight.baseline}</span>
                <span style={{ color: "var(--text3)" }}> → </span>
                <span style={{ color: "var(--text)", fontWeight: 600 }}>{f.highlight.current}</span>
                <span style={{ color: "var(--accent)", marginLeft: "10px", fontSize: "10px" }}>
                  {f.highlight.delta} ✓
                </span>
              </span>
            </div>
          </div>

          <div>
            <Stream
              as="p"
              text="The build fails if quality drops. That's the whole point."
              tokenSize={1}
              tickMs={24}
              delay={300}
              threshold={0.3}
              showCaret
              thin
              style={{
                fontFamily: "var(--serif)", fontStyle: "italic",
                fontSize: "clamp(20px, 1.8vw, 26px)",
                color: "var(--text)", lineHeight: 1.4,
                marginBottom: "32px", display: "block",
                minHeight: "2.8em",
              }}
            />

            <div style={{ marginBottom: "36px" }}>
              {f.facts.map((fact, i) => (
                <div key={i} className={`reveal reveal-d-${i + 2}`} style={{
                  display: "flex", alignItems: "flex-start", gap: "12px",
                  padding: "12px 0",
                  borderBottom: "1px solid var(--border)",
                  fontFamily: "var(--mono)", fontSize: "12px",
                  color: "var(--text2)", lineHeight: 1.6,
                }}>
                  {/* established practice — warm gold tick (teal is reserved for gains/actions) */}
                  <span style={{ color: "var(--gold)", flexShrink: 0 }}>✓</span>
                  {fact}
                </div>
              ))}
            </div>

            <div className="reveal reveal-d-5" style={{ display: "flex", flexWrap: "wrap", gap: "6px", marginBottom: "32px" }}>
              {f.technologies.map((t) => (
                <span key={t} style={{
                  fontFamily: "var(--mono)", fontSize: "10px",
                  color: "var(--text2)",
                  background: "var(--bg3)", border: "1px solid var(--border)",
                  padding: "4px 10px", borderRadius: "3px",
                }}>{t}</span>
              ))}
            </div>

            <div className="reveal reveal-d-6" style={{ display: "flex", flexWrap: "wrap", gap: "12px" }}>
              {f.liveLink && (
                <a
                  href={f.liveLink}
                  target="_blank"
                  rel="noreferrer"
                  style={{
                    display: "inline-flex", alignItems: "center", gap: "10px",
                    fontFamily: "var(--mono)", fontSize: "12px", letterSpacing: "0.12em",
                    color: "var(--bg)", background: "var(--accent)",
                    padding: "14px 26px", borderRadius: "100px",
                    textDecoration: "none", textTransform: "uppercase", fontWeight: 500,
                    boxShadow: "0 8px 28px -8px var(--accent-glow)",
                  }}
                >
                  View Live Demo ↗
                </a>
              )}
              <a
                href={f.githubLink}
                target="_blank"
                rel="noreferrer"
                style={{
                  display: "inline-flex", alignItems: "center", gap: "10px",
                  fontFamily: "var(--mono)", fontSize: "12px", letterSpacing: "0.12em",
                  color: "var(--text)", background: "transparent",
                  padding: "14px 26px", borderRadius: "100px",
                  border: "1px solid var(--border2)",
                  textDecoration: "none", textTransform: "uppercase", fontWeight: 500,
                }}
              >
                Read the Experiments ↗
              </a>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes pipeFlow {
          0%   { transform: translateX(-100%); }
          100% { transform: translateX(250%); }
        }
        @media (max-width: 900px) {
          .eval-grid { grid-template-columns: 1fr !important; }
          .pipeline-row { flex-direction: column; align-items: stretch !important; }
          .pipeline-row .pipe-link {
            width: 1px !important; height: 20px !important;
            margin: 0 auto;
          }
          .pipeline-row .pipe-link span {
            width: 100% !important; height: 40% !important;
            animation-name: pipeFlowV !important;
          }
        }
        @keyframes pipeFlowV {
          0%   { transform: translateY(-100%); }
          100% { transform: translateY(250%); }
        }
      `}</style>
    </section>
  );
}
