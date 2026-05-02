import { useEffect, useState } from "react";
import profileData from "../../data/profileData";
import useMagnetic from "../../hooks/useMagnetic";

// Terminal boot sequence — types lines one after another
function TerminalBoot({ onComplete }) {
  const lines = profileData.terminalLines;
  const [shownLines, setShownLines] = useState([]); // array of fully shown line indices
  const [currentLine, setCurrentLine] = useState(0);
  const [currentText, setCurrentText] = useState("");

  useEffect(() => {
    if (currentLine >= lines.length) {
      const t = setTimeout(() => onComplete?.(), 350);
      return () => clearTimeout(t);
    }

    const target = lines[currentLine].text;
    let i = 0;
    const interval = setInterval(() => {
      i++;
      if (i > target.length) {
        clearInterval(interval);
        setShownLines((prev) => [...prev, currentLine]);
        setCurrentText("");
        setTimeout(() => setCurrentLine((c) => c + 1), 180);
        return;
      }
      setCurrentText(target.slice(0, i));
    }, 18);

    return () => clearInterval(interval);
  }, [currentLine]);

  return (
    <div style={{
      fontFamily: "var(--mono)",
      fontSize: "12px",
      lineHeight: 1.9,
      color: "var(--text2)",
      maxWidth: "640px",
    }}>
      {lines.map((line, idx) => {
        if (shownLines.includes(idx)) {
          return (
            <div key={idx} style={{ color: line.type === "prompt" ? "var(--text)" : "var(--text2)" }}>
              {line.type === "system" && <span style={{ color: "var(--text3)" }}>›  </span>}
              {line.text}
            </div>
          );
        }
        if (idx === currentLine) {
          return (
            <div key={idx} style={{ color: line.type === "prompt" ? "var(--text)" : "var(--text2)" }}>
              {line.type === "system" && <span style={{ color: "var(--text3)" }}>›  </span>}
              {currentText}
              <span className="streaming-caret thin" />
            </div>
          );
        }
        return null;
      })}
    </div>
  );
}

// Streaming headline that types out word-by-word with style
function StreamingHeadline() {
  const fullText = `${profileData.heroLead} ${profileData.heroAccent}`;
  const splitIdx = profileData.heroLead.length + 1; // where accent starts
  const [shown, setShown] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (shown >= fullText.length) {
      setDone(true);
      return;
    }
    const t = setTimeout(() => setShown((s) => s + 1), 38);
    return () => clearTimeout(t);
  }, [shown, fullText.length]);

  const before = fullText.slice(0, Math.min(shown, splitIdx));
  const after = shown > splitIdx ? fullText.slice(splitIdx, shown) : "";
  const isInAccent = shown >= splitIdx;

  return (
    <h1 style={{
      fontSize: "clamp(56px, 10vw, 152px)",
      fontWeight: 800, lineHeight: 0.92,
      letterSpacing: "-0.045em",
      marginBottom: "40px",
      maxWidth: "1200px",
      minHeight: "0.95em",
    }}>
      {before}
      {after && (
        <span style={{
          fontFamily: "var(--serif)", fontStyle: "italic",
          color: "var(--accent)", fontWeight: 400,
        }}>
          {after}
        </span>
      )}
      {!done && (
        <span
          className="streaming-caret"
          style={{ background: isInAccent ? "var(--accent)" : "var(--text)" }}
        />
      )}
    </h1>
  );
}

// Streaming dek
function StreamingDek({ start }) {
  const [shown, setShown] = useState(0);
  useEffect(() => {
    if (!start) return;
    if (shown >= profileData.heroDek.length) return;
    const t = setTimeout(() => setShown((s) => s + 2), 14);
    return () => clearTimeout(t);
  }, [shown, start]);

  return (
    <p style={{
      fontFamily: "var(--mono)", fontSize: "13px",
      color: "var(--text2)", lineHeight: 1.85,
      maxWidth: "560px", marginBottom: "44px",
      minHeight: "5em",
    }}>
      {profileData.heroDek.slice(0, shown)}
      {start && shown < profileData.heroDek.length && (
        <span className="streaming-caret thin" style={{ marginLeft: "1px" }} />
      )}
    </p>
  );
}

export default function Hero() {
  const [stage, setStage] = useState("boot"); // boot → headline → done
  const [headlineStart, setHeadlineStart] = useState(false);
  const [dekStart, setDekStart] = useState(false);
  const [ctaShow, setCtaShow] = useState(false);
  const cta1 = useMagnetic(0.25);
  const cta2 = useMagnetic(0.25);

  const handleBootDone = () => {
    setStage("headline");
    setTimeout(() => setHeadlineStart(true), 200);
    // Start dek a little after headline begins
    setTimeout(() => setDekStart(true), 200 + 80 * 38); // rough ms for headline
    setTimeout(() => setCtaShow(true), 200 + 80 * 38 + 1200);
  };

  return (
    <section
      id="hero"
      style={{
        minHeight: "100vh",
        display: "flex", flexDirection: "column",
        justifyContent: "space-between",
        padding: "100px clamp(24px, 8vw, 120px) 48px",
        position: "relative", overflow: "hidden",
      }}
    >
      {/* Glow */}
      <div style={{
        position: "absolute", top: "-100px", right: "-50px",
        width: "500px", height: "500px",
        background: "radial-gradient(circle, rgba(45,212,191,0.10) 0%, transparent 65%)",
        pointerEvents: "none", zIndex: 0,
      }} />

      {/* Top status row */}
      <div style={{
        position: "relative", zIndex: 2,
        display: "flex", justifyContent: "space-between", alignItems: "flex-start",
        flexWrap: "wrap", gap: "24px",
      }}>
        <div style={{
          display: "inline-flex", alignItems: "center", gap: "10px",
          fontFamily: "var(--mono)", fontSize: "10px", letterSpacing: "0.18em",
          color: "var(--accent)", textTransform: "uppercase",
          background: "var(--accent-dim)",
          border: "1px solid rgba(45,212,191,0.2)",
          padding: "7px 14px", borderRadius: "100px",
        }}>
          <span style={{
            width: "6px", height: "6px", borderRadius: "50%",
            background: "var(--accent)",
            animation: "pulseDot 2s infinite",
          }} />
          Available · Open to Work
        </div>

        <div style={{
          fontFamily: "var(--mono)", fontSize: "10px", letterSpacing: "0.18em",
          color: "var(--text3)", textTransform: "uppercase",
          textAlign: "right", lineHeight: 1.8,
        }}>
          <span style={{ color: "var(--text3)" }}>region:</span>{" "}
          <span style={{ color: "var(--text2)" }}>br-rj-1</span>
        </div>
      </div>

      {/* Center stack */}
      <div style={{ position: "relative", zIndex: 2, margin: "auto 0", width: "100%" }}>
        {/* Stage 1: terminal boot */}
        {stage === "boot" && (
          <div style={{
            background: "var(--bg2)",
            border: "1px solid var(--border)",
            borderRadius: "10px",
            padding: "20px 24px",
            marginBottom: "32px",
            maxWidth: "640px",
          }}>
            <div style={{
              display: "flex", alignItems: "center", gap: "8px",
              marginBottom: "14px",
              paddingBottom: "12px",
              borderBottom: "1px solid var(--border)",
            }}>
              <span style={{ width: "10px", height: "10px", borderRadius: "50%", background: "#ef4444" }} />
              <span style={{ width: "10px", height: "10px", borderRadius: "50%", background: "#fbbf24" }} />
              <span style={{ width: "10px", height: "10px", borderRadius: "50%", background: "var(--accent)" }} />
              <span style={{
                marginLeft: "10px", fontFamily: "var(--mono)", fontSize: "10px",
                color: "var(--text3)", letterSpacing: "0.12em", textTransform: "uppercase",
              }}>
                /portfolio/inference
              </span>
            </div>
            <TerminalBoot onComplete={handleBootDone} />
          </div>
        )}

        {/* Stage 2+: headline */}
        {stage !== "boot" && (
          <>
            <p style={{
              fontFamily: "var(--mono)", fontSize: "11px", letterSpacing: "0.22em",
              color: "var(--text3)", textTransform: "uppercase",
              marginBottom: "28px",
              animation: "fadeIn 0.5s",
            }}>
              ◆  Output Stream
            </p>

            {headlineStart && <StreamingHeadline />}
            {dekStart && <StreamingDek start={dekStart} />}

            {/* CTAs fade in once dek is mostly done */}
            <div style={{
              display: "flex", gap: "14px", flexWrap: "wrap",
              opacity: ctaShow ? 1 : 0,
              transform: ctaShow ? "translateY(0)" : "translateY(10px)",
              transition: "opacity 0.6s, transform 0.6s",
            }}>
              <a
                ref={cta1}
                href="#work"
                className="magnetic"
                style={{
                  fontFamily: "var(--mono)", fontSize: "12px", letterSpacing: "0.12em",
                  color: "var(--bg)", background: "var(--accent)",
                  padding: "16px 28px", borderRadius: "100px", textDecoration: "none",
                  fontWeight: 500, textTransform: "uppercase",
                  display: "inline-flex", alignItems: "center", gap: "10px",
                }}
              >
                See the Work
                <span style={{ width: "20px", height: "1px", background: "var(--bg)" }} />
              </a>
              <a
                ref={cta2}
                href={`mailto:${profileData.email}`}
                className="magnetic"
                style={{
                  fontFamily: "var(--mono)", fontSize: "12px", letterSpacing: "0.12em",
                  color: "var(--text)", background: "transparent",
                  padding: "16px 28px", borderRadius: "100px", textDecoration: "none",
                  border: "1px solid var(--border2)", textTransform: "uppercase",
                  display: "inline-flex", alignItems: "center", gap: "10px",
                }}
              >
                Get in Touch ↗
              </a>
            </div>
          </>
        )}
      </div>

      {/* Bottom meta strip */}
      <div style={{
        position: "relative", zIndex: 2,
        display: "flex", justifyContent: "space-between", alignItems: "flex-end",
        flexWrap: "wrap", gap: "32px",
        paddingTop: "48px",
        borderTop: "1px solid var(--border)",
        marginTop: "48px",
      }}>
        {[
          { label: "Discipline", val: "AI · MLOps · QA" },
          { label: "Method", val: "Build → Test → Ship" },
          { label: "Edition", val: "v4 · 2026" },
        ].map((s, i) => (
          <div key={i}>
            <p style={{
              fontFamily: "var(--mono)", fontSize: "9px", letterSpacing: "0.22em",
              color: "var(--text3)", textTransform: "uppercase",
              marginBottom: "6px",
            }}>
              {s.label}
            </p>
            <p style={{
              fontFamily: "var(--mono)", fontSize: "12px",
              color: "var(--text2)",
            }}>
              {s.val}
            </p>
          </div>
        ))}

        <div style={{
          display: "flex", alignItems: "center", gap: "10px",
          fontFamily: "var(--mono)", fontSize: "9px", letterSpacing: "0.22em",
          color: "var(--text3)", textTransform: "uppercase",
        }}>
          Scroll
          <span style={{
            display: "inline-block", width: "1px", height: "32px",
            background: "var(--text3)", position: "relative", overflow: "hidden",
          }}>
            <span style={{
              position: "absolute", top: 0, left: 0, width: "100%", height: "50%",
              background: "var(--accent)",
              animation: "scrollLine 1.8s ease-in-out infinite",
            }} />
          </span>
        </div>
      </div>

      <style>{`
        @keyframes scrollLine {
          0%   { transform: translateY(-100%); }
          100% { transform: translateY(200%); }
        }
      `}</style>
    </section>
  );
}
