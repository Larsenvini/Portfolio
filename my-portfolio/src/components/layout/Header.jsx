import { useEffect, useRef, useState } from "react";
import profileData from "../../data/profileData";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const progressRef = useRef(null);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 60);
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const pct = max > 0 ? (window.scrollY / max) * 100 : 0;
      if (progressRef.current) progressRef.current.style.width = `${pct}%`;
    };
    window.addEventListener("scroll", onScroll);
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll while the mobile menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const links = [
    { href: "#flagship", label: "Flagship" },
    { href: "#work", label: "Work" },
    { href: "#about", label: "About" },
    { href: "#timeline", label: "Timeline" },
    { href: "#stack", label: "Stack" },
    { href: "#contact", label: "Contact" },
  ];

  return (
    <>
      <header
        style={{
          position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
          padding: "0 32px",
          height: "64px",
          display: "flex", alignItems: "center", justifyContent: "space-between",
          background: scrolled ? "rgba(10,10,12,0.78)" : "transparent",
          borderBottom: scrolled ? "1px solid var(--border)" : "1px solid transparent",
          backdropFilter: scrolled ? "blur(18px)" : "none",
          WebkitBackdropFilter: scrolled ? "blur(18px)" : "none",
          transition: "background 0.4s, border-color 0.4s",
        }}
      >
        <a href="#hero" style={{
          fontFamily: "var(--mono)", fontSize: "11px", letterSpacing: "0.16em",
          color: "var(--text)", textDecoration: "none", textTransform: "uppercase",
          display: "flex", alignItems: "center", gap: "10px",
        }}>
          <span style={{ width: "6px", height: "6px", background: "var(--accent)", borderRadius: "50%", animation: "pulseDot 2s infinite" }} />
          VL.engineer
        </a>

        <nav style={{ display: "flex", gap: "24px", alignItems: "center" }}>
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="nav-link"
              style={{
                fontFamily: "var(--mono)", fontSize: "11px", letterSpacing: "0.14em",
                color: "var(--text2)", textDecoration: "none", textTransform: "uppercase",
                transition: "color 0.2s",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "var(--text)")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text2)")}
            >
              {l.label}
            </a>
          ))}
          <a
            href={`mailto:${profileData.email}`}
            className="nav-hire"
            style={{
              fontFamily: "var(--mono)", fontSize: "11px", letterSpacing: "0.14em",
              color: "var(--bg)", background: "var(--accent)",
              padding: "9px 18px", borderRadius: "100px", textDecoration: "none",
              textTransform: "uppercase", fontWeight: 500,
              transition: "opacity 0.2s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.85")}
            onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
          >
            Hire
          </a>

          <button
            className="nav-burger"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((o) => !o)}
            style={{
              display: "none",
              flexDirection: "column", justifyContent: "center", gap: "5px",
              width: "38px", height: "38px",
              background: "var(--bg2)", border: "1px solid var(--border2)",
              borderRadius: "8px", padding: "0 9px",
            }}
          >
            <span style={{
              display: "block", height: "1px", background: "var(--text)",
              transform: menuOpen ? "translateY(3px) rotate(45deg)" : "none",
              transition: "transform 0.25s",
            }} />
            <span style={{
              display: "block", height: "1px", background: "var(--text)",
              transform: menuOpen ? "translateY(-3px) rotate(-45deg)" : "none",
              transition: "transform 0.25s",
            }} />
          </button>
        </nav>

        <div style={{ position: "absolute", left: 0, right: 0, bottom: 0, height: "1px" }}>
          <div ref={progressRef} style={{ height: "100%", width: "0%", background: "var(--accent)", transition: "width 0.05s linear" }} />
        </div>
      </header>

      {/* Mobile menu overlay */}
      <div
        style={{
          position: "fixed", inset: 0, zIndex: 99,
          background: "rgba(10,10,12,0.96)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          display: "flex", flexDirection: "column", justifyContent: "center",
          padding: "0 32px",
          opacity: menuOpen ? 1 : 0,
          visibility: menuOpen ? "visible" : "hidden",
          transition: "opacity 0.35s, visibility 0.35s",
        }}
      >
        <p style={{
          fontFamily: "var(--mono)", fontSize: "10px", letterSpacing: "0.22em",
          color: "var(--text3)", textTransform: "uppercase",
          marginBottom: "28px",
        }}>
          ◆ index
        </p>
        {links.map((l, i) => (
          <a
            key={l.href}
            href={l.href}
            onClick={() => setMenuOpen(false)}
            style={{
              fontFamily: "var(--sans)",
              fontSize: "clamp(32px, 9vw, 48px)",
              fontWeight: 800, letterSpacing: "-0.03em",
              color: "var(--text)", textDecoration: "none",
              padding: "10px 0",
              borderBottom: "1px solid var(--border)",
              display: "flex", justifyContent: "space-between", alignItems: "center",
              opacity: menuOpen ? 1 : 0,
              transform: menuOpen ? "translateY(0)" : "translateY(16px)",
              transition: `opacity 0.4s ${0.05 + i * 0.05}s, transform 0.4s ${0.05 + i * 0.05}s`,
            }}
          >
            {l.label}
            <span style={{
              fontFamily: "var(--mono)", fontSize: "11px",
              color: "var(--accent)", fontWeight: 400,
            }}>0{i + 1}</span>
          </a>
        ))}
        <a
          href={`mailto:${profileData.email}`}
          onClick={() => setMenuOpen(false)}
          style={{
            marginTop: "36px",
            alignSelf: "flex-start",
            fontFamily: "var(--mono)", fontSize: "12px", letterSpacing: "0.14em",
            color: "var(--bg)", background: "var(--accent)",
            padding: "14px 28px", borderRadius: "100px", textDecoration: "none",
            textTransform: "uppercase", fontWeight: 500,
            opacity: menuOpen ? 1 : 0,
            transition: `opacity 0.4s ${0.05 + links.length * 0.05}s`,
          }}
        >
          Hire me ↗
        </a>
      </div>

      <style>{`
        @media (max-width: 800px) {
          .nav-link, .nav-hire { display: none !important; }
          .nav-burger { display: flex !important; }
        }
      `}</style>
    </>
  );
}
