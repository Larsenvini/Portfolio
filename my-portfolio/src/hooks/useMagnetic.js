import { useEffect, useRef } from "react";

export default function useMagnetic(strength = 0.3) {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(max-width: 900px)").matches) return;

    let raf = null;
    const move = (e) => {
      const rect = el.getBoundingClientRect();
      const x = e.clientX - (rect.left + rect.width / 2);
      const y = e.clientY - (rect.top + rect.height / 2);
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        el.style.transform = `translate(${x * strength}px, ${y * strength}px)`;
      });
    };
    const reset = () => {
      cancelAnimationFrame(raf);
      el.style.transform = "translate(0, 0)";
      el.style.transition = "transform 0.6s cubic-bezier(.22,1,.36,1)";
      setTimeout(() => { el.style.transition = ""; }, 600);
    };

    el.addEventListener("mousemove", move);
    el.addEventListener("mouseleave", reset);
    return () => {
      el.removeEventListener("mousemove", move);
      el.removeEventListener("mouseleave", reset);
      cancelAnimationFrame(raf);
    };
  }, [strength]);
  return ref;
}
