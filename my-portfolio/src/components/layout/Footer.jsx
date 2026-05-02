import profileData from "../../data/profileData";

export default function Footer() {
  return (
    <footer style={{
      borderTop: "1px solid var(--border)",
      padding: "100px clamp(24px, 6vw, 80px) 32px",
      position: "relative",
      overflow: "hidden",
    }}>
      <div style={{ maxWidth: "1400px", margin: "0 auto" }}>
        <div
          aria-hidden="true"
          style={{
            fontFamily: "var(--sans)",
            fontSize: "clamp(80px, 16vw, 240px)",
            fontWeight: 800,
            letterSpacing: "-0.05em",
            lineHeight: 0.85,
            color: "transparent",
            WebkitTextStroke: "1px rgba(255,255,255,0.07)",
            userSelect: "none",
            marginBottom: "60px",
            textAlign: "center",
          }}
        >
          LARSEN
        </div>

        <div style={{
          display: "flex", justifyContent: "space-between", alignItems: "flex-end",
          flexWrap: "wrap", gap: "32px",
          paddingTop: "32px",
          borderTop: "1px solid var(--border)",
        }}>
          <div>
            <p style={{
              fontFamily: "var(--mono)", fontSize: "10px", letterSpacing: "0.22em",
              color: "var(--text3)", textTransform: "uppercase",
              marginBottom: "8px",
            }}>
              ©  {new Date().getFullYear()} — {profileData.name}
            </p>
            <p style={{
              fontFamily: "var(--mono)", fontSize: "11px",
              color: "var(--text2)",
            }}>
              <span style={{ color: "var(--text3)" }}>generation_complete:</span>{" "}
              <span style={{ color: "var(--accent)" }}>true</span>
            </p>
          </div>

          <div style={{ display: "flex", gap: "24px" }}>
            {[
              { label: "GitHub", href: profileData.contacts.github },
              { label: "LinkedIn", href: profileData.contacts.linkedin },
              { label: "Email", href: `mailto:${profileData.contacts.email}` },
            ].map((l) => (
              <a
                key={l.label}
                href={l.href}
                target={l.href.startsWith("mailto") ? undefined : "_blank"}
                rel="noreferrer"
                style={{
                  fontFamily: "var(--mono)", fontSize: "11px", letterSpacing: "0.14em",
                  color: "var(--text3)", textDecoration: "none",
                  textTransform: "uppercase",
                  transition: "color 0.2s",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "var(--accent)")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text3)")}
              >
                {l.label} ↗
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
