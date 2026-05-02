import useStream from "../../hooks/useStream";

/**
 * Streams text on viewport entry. Renders a streaming caret while typing.
 *
 * Props:
 *   text       — string to stream
 *   as         — element type (default 'span')
 *   tokenSize  — chars per tick (1 = char, 2-3 = "tokens")
 *   tickMs     — ms between ticks
 *   delay      — initial delay
 *   showCaret  — show caret while streaming (default true)
 *   keepCaret  — keep caret blinking after done (false)
 *   thin       — caret style (thin = vertical bar, default = block)
 *   threshold  — viewport threshold to trigger
 */
export default function Stream({
  text = "",
  as: Tag = "span",
  tokenSize = 1,
  tickMs = 22,
  delay = 0,
  showCaret = true,
  keepCaret = false,
  thin = false,
  threshold = 0.4,
  className,
  style,
  children,
}) {
  const { ref, streamed, isStreaming, isDone } = useStream(text, {
    tokenSize, tickMs, delay, threshold,
  });

  return (
    <Tag ref={ref} className={className} style={style}>
      {streamed}
      {showCaret && (isStreaming || (keepCaret && isDone)) && (
        <span className={`streaming-caret${thin ? " thin" : ""}`} />
      )}
      {children}
    </Tag>
  );
}
