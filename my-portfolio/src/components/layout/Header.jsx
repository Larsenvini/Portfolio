import { useEffect, useRef, useState } from "react";
import profileData from "../../data/profileData";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
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

  const links = [
    { href: "#work", label: "Work" },
    { href: "#about", label: "About" },
    { href: "#timeline", label: "Timeline" },
    { href: "#stack", label: "Stack" },
    { href: "#contact", label: "Contact" },
  ];

  return (
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
      </nav>

      <div style={{ position: "absolute", left: 0, right: 0, bottom: 0, height: "1px" }}>
        <div ref={progressRef} style={{ height: "100%", width: "0%", background: "var(--accent)", transition: "width 0.05s linear" }} />
      </div>

      <style>{`
        @media (max-width: 720px) { nav .nav-link { display: none; } }
      `}</style>
    </header>
  );
}
