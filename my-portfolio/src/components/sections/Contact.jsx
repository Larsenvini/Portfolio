import profileData from "../../data/profileData";
import useMagnetic from "../../hooks/useMagnetic";

export default function Contact() {
  const emailRef = useMagnetic(0.18);

  const links = [
    { label: "Email", href: `mailto:${profileData.contacts.email}`, val: profileData.contacts.email },
    { label: "LinkedIn", href: profileData.contacts.linkedin, val: "linkedin.com/in/vinilarsen" },
    { label: "GitHub", href: profileData.contacts.github, val: "github.com/Larsenvini" },
  ];

  return (
    <section
      id="contact"
      style={{
        padding: "180px clamp(24px, 8vw, 120px) 80px",
        borderTop: "1px solid var(--border)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div style={{
        position: "absolute", bottom: "-100px", left: "-50px",
        width: "500px", height: "500px",
        background: "radial-gradient(circle, rgba(45,212,191,0.13) 0%, transparent 65%)",
        pointerEvents: "none", zIndex: 0,
      }} />

      <div style={{ maxWidth: "1200px", margin: "0 auto", position: "relative", zIndex: 1 }}>
        <div className="reveal" style={{ marginBottom: "32px" }}>
          <span className="section-meta">
            <span className="dot" />
            <span><span className="k">section:</span> <span className="v">contact</span></span>
            <span className="sep">·</span>
            <span><span className="k">latency:</span> <span className="v">&lt;24h</span></span>
          </span>
        </div>

        <h2
          className="reveal reveal-d-1"
          style={{
            fontSize: "clamp(56px, 11vw, 168px)",
            fontWeight: 800,
            letterSpacing: "-0.045em",
            lineHeight: 0.92,
            marginBottom: "60px",
          }}
        >
          Let's build{" "}
          <span style={{
            fontFamily: "var(--serif)", fontStyle: "italic",
            color: "var(--accent)", fontWeight: 400,
          }}>
            something
          </span>
          <br />
          worth shipping.
        </h2>

        <p
          className="reveal reveal-d-2"
          style={{
            fontFamily: "var(--mono)", fontSize: "14px",
            color: "var(--text2)", lineHeight: 1.85,
            maxWidth: "560px", marginBottom: "60px",
          }}
        >
          Open to AI Engineer, MLOps, and QA Automation roles. Full-time or contract. Remote-first. I respond within 24 hours.
        </p>

        <div className="reveal reveal-d-3" style={{ marginBottom: "80px" }}>
          <a
            ref={emailRef}
            href={`mailto:${profileData.contacts.email}`}
            className="magnetic"
            style={{
              display: "inline-flex", alignItems: "center", gap: "14px",
              fontFamily: "var(--sans)",
              fontSize: "clamp(20px, 2.6vw, 32px)",
              fontWeight: 600,
              color: "var(--bg)",
              background: "var(--accent)",
              padding: "18px 36px",
              borderRadius: "100px",
              textDecoration: "none",
              letterSpacing: "-0.01em",
              transition: "background 0.3s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.background = "#5eead4")}
            onMouseLeave={(e) => (e.currentTarget.style.background = "var(--accent)")}
          >
            {profileData.contacts.email}
            <span style={{
              display: "inline-flex", alignItems: "center", justifyContent: "center",
              width: "40px", height: "40px",
              borderRadius: "50%",
              background: "var(--bg)",
              color: "var(--accent)",
              fontSize: "16px",
            }}>↗</span>
          </a>
        </div>

        <div className="reveal reveal-d-4" style={{
          display: "flex", flexDirection: "column",
          maxWidth: "640px",
        }}>
          {links.map((l, i) => (
            <a
              key={i}
              href={l.href}
              target={l.href.startsWith("mailto") ? undefined : "_blank"}
              rel="noreferrer"
              style={{
                display: "flex", justifyContent: "space-between", alignItems: "center",
                padding: "22px 0",
                borderBottom: "1px solid var(--border)",
                textDecoration: "none",
                transition: "padding-left 0.3s",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.paddingLeft = "16px";
                e.currentTarget.querySelector(".lbl").style.color = "var(--accent)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.paddingLeft = "0";
                e.currentTarget.querySelector(".lbl").style.color = "var(--text3)";
              }}
            >
              <span className="lbl" style={{
                fontFamily: "var(--mono)", fontSize: "10px",
                letterSpacing: "0.18em", color: "var(--text3)",
                textTransform: "uppercase",
                transition: "color 0.3s",
              }}>{l.label}</span>
              <span style={{
                fontFamily: "var(--mono)", fontSize: "13px",
                color: "var(--text)",
                display: "flex", alignItems: "center", gap: "8px",
              }}>
                {l.val}
                <span style={{ color: "var(--accent)" }}>↗</span>
              </span>
            </a>
          ))}
        </div>

        {/* End of stream marker */}
        <div className="reveal reveal-d-5" style={{
          marginTop: "80px",
          paddingTop: "40px",
          borderTop: "1px dashed var(--border2)",
          display: "flex", alignItems: "center", gap: "12px",
          fontFamily: "var(--mono)", fontSize: "11px", letterSpacing: "0.18em",
          color: "var(--text3)", textTransform: "uppercase",
        }}>
          <span style={{
            display: "inline-block", width: "8px", height: "8px",
            borderRadius: "50%", background: "var(--accent)",
            animation: "pulseDot 2.5s infinite",
          }} />
          <span style={{ color: "var(--text3)" }}>finish_reason:</span>
          <span style={{ color: "var(--accent)" }}>stop</span>
          <span style={{ color: "var(--text3)" }}>·</span>
          <span style={{ color: "var(--text3)" }}>tokens_generated:</span>
          <span style={{ color: "var(--accent)" }}>4096 / 4096</span>
        </div>
      </div>
    </section>
  );
}
