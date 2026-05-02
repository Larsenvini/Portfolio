import { useEffect, useRef, useState } from "react";

/**
 * Streams a string token-by-token (or char-by-char) when the element enters the viewport.
 *
 * Returns:
 *   ref       — attach to the element
 *   streamed  — what to render (substring, growing)
 *   isStreaming — true while still typing
 *   isDone    — true once finished
 */
export default function useStream(
  text,
  {
    tokenSize = 1,    // chars per "tick"
    tickMs = 22,      // ms between ticks (faster = quicker stream)
    delay = 0,        // initial delay before stream starts
    once = true,
    threshold = 0.4,
  } = {}
) {
  const ref = useRef(null);
  const [streamed, setStreamed] = useState("");
  const [isStreaming, setIsStreaming] = useState(false);
  const [isDone, setIsDone] = useState(false);
  const [triggered, setTriggered] = useState(false);

  // Viewport trigger
  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !triggered) {
          setTriggered(true);
          if (once) observer.disconnect();
        }
      },
      { threshold }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [triggered, once, threshold]);

  // Stream effect
  useEffect(() => {
    if (!triggered) return;

    setStreamed("");
    setIsDone(false);
    setIsStreaming(false);

    let i = 0;
    let timeout;

    const startTimeout = setTimeout(() => {
      setIsStreaming(true);
      const interval = setInterval(() => {
        i += tokenSize;
        if (i >= text.length) {
          i = text.length;
          setStreamed(text);
          setIsStreaming(false);
          setIsDone(true);
          clearInterval(interval);
          return;
        }
        setStreamed(text.slice(0, i));
      }, tickMs);
      timeout = interval;
    }, delay);

    return () => {
      clearTimeout(startTimeout);
      clearInterval(timeout);
    };
  }, [triggered, text, tokenSize, tickMs, delay]);

  return { ref, streamed, isStreaming, isDone, triggered };
}
