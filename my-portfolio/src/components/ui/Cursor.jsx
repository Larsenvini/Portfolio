import { useEffect, useRef } from "react";

export default function Cursor() {
  const dot = useRef(null);
  const ring = useRef(null);

  useEffect(() => {
    if (window.matchMedia("(max-width: 900px)").matches) return;

    const dotEl = dot.current;
    const ringEl = ring.current;
    if (!dotEl || !ringEl) return;

    // Follow the pointer 1:1 — no trailing/lerp, so it reads as a crisp custom cursor
    const onMove = (e) => {
      const t = `translate(${e.clientX}px, ${e.clientY}px) translate(-50%, -50%)`;
      dotEl.style.transform = t;
      ringEl.style.transform = t;
    };

    const setHover = (on) => () => ringEl.classList.toggle("hover", on);

    document.addEventListener("mousemove", onMove);

    const interactive = "a, button, [role='button'], .magnetic, .interactive";
    const bind = (el) => {
      if (el.dataset.cursorBound) return;
      el.dataset.cursorBound = "1";
      el.addEventListener("mouseenter", setHover(true));
      el.addEventListener("mouseleave", setHover(false));
    };
    document.querySelectorAll(interactive).forEach(bind);

    const obs = new MutationObserver(() => {
      document.querySelectorAll(interactive).forEach(bind);
    });
    obs.observe(document.body, { childList: true, subtree: true });

    return () => {
      document.removeEventListener("mousemove", onMove);
      obs.disconnect();
    };
  }, []);

  return (
    <>
      <div ref={dot} className="cursor" />
      <div ref={ring} className="cursor-ring" />
    </>
  );
}
