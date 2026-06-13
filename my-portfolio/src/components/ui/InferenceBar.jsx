import { useEffect, useRef, useState } from "react";

export default function InferenceBar() {
  const [visible, setVisible] = useState(false);
  const [tokens, setTokens] = useState(0);
  const [tps, setTps] = useState(0);
  const tokensRef = useRef(0);
  const lastTimeRef = useRef(performance.now());
  const lastTokensRef = useRef(0);

  // Show when scrolled
  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 80);
    window.addEventListener("scroll", onScroll);
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Fake but plausible token counter — increments slightly with scroll position
  useEffect(() => {
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const pct = max > 0 ? window.scrollY / max : 0;
      const target = Math.floor(pct * 4096);
      tokensRef.current = target;
      setTokens(target);
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // tokens/sec readout
  useEffect(() => {
    const id = setInterval(() => {
      const now = performance.now();
      const dt = (now - lastTimeRef.current) / 1000;
      const dToken = tokensRef.current - lastTokensRef.current;
      const rate = dt > 0 ? Math.max(0, dToken / dt) : 0;
      setTps(Math.round(rate));
      lastTimeRef.current = now;
      lastTokensRef.current = tokensRef.current;
    }, 500);
    return () => clearInterval(id);
  }, []);

  return (
    <div className={`inference-bar${visible ? " visible" : ""}`}>
      <div className="inf-left">
        <span className="inf-cell">
          <span className="dot" style={{
            display: "inline-block", width: "6px", height: "6px",
            borderRadius: "50%", background: "var(--accent)",
            animation: "pulseDot 2s infinite",
            marginRight: "2px",
          }} />
          <span className="v">streaming</span>
        </span>
        <span className="inf-cell">
          <span className="k">model:</span>
          <span className="v">portfolio.v5</span>
        </span>
        <span className="inf-cell">
          <span className="k">temp:</span>
          <span className="v">0.7</span>
        </span>
      </div>
      <div className="inf-right">
        <span className="inf-cell">
          <span className="k">tps:</span>
          <span className="v">{tps}</span>
        </span>
        <span className="inf-cell">
          <span className="k">tokens:</span>
          <span className="v">{tokens.toLocaleString()}/4096</span>
        </span>
      </div>
    </div>
  );
}
