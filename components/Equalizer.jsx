export default function Equalizer({ bars = 5, colors = ["var(--cyan)", "var(--violet)", "var(--magenta)"] }) {
  return (
    <span className="eq" aria-hidden="true">
      {Array.from({ length: bars }).map((_, i) => (
        <span key={i} className="eq__bar" style={{ "--bar-color": colors[i % colors.length] }} />
      ))}
    </span>
  );
}
