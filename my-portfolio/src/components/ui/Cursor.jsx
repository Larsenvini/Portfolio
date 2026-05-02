import { useEffect, useRef } from "react";

export default function Cursor() {
  const dot = useRef(null);
  const ring = useRef(null);

  useEffect(() => {
    if (window.matchMedia("(max-width: 900px)").matches) return;

    const dotEl = dot.current;
    const ringEl = ring.current;
    if (!dotEl || !ringEl) return;

    let mouseX = 0, mouseY = 0;
    let ringX = 0, ringY = 0;

    const onMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      dotEl.style.transform = `translate(${mouseX}px, ${mouseY}px) translate(-50%, -50%)`;
    };

    const animate = () => {
      ringX += (mouseX - ringX) * 0.16;
      ringY += (mouseY - ringY) * 0.16;
      ringEl.style.transform = `translate(${ringX}px, ${ringY}px) translate(-50%, -50%)`;
      requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);

    const onDown = () => ringEl.classList.add("click");
    const onUp = () => ringEl.classList.remove("click");
    const setHover = (on) => () => on ? ringEl.classList.add("hover") : ringEl.classList.remove("hover");

    document.addEventListener("mousemove", onMove);
    document.addEventListener("mousedown", onDown);
    document.addEventListener("mouseup", onUp);

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
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("mouseup", onUp);
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
