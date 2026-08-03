const ITEMS = ["SYNTHWAVE", "SYNTHPOP", "WAVE", "DUNE MOON", "1980s VIBES", "RIOBAMBA", "ECUADOR"];

export default function Marquee() {
  const row = [...ITEMS, ...ITEMS];

  return (
    <div className="marquee" aria-hidden="true">
      <div className="marquee__track">
        {row.map((item, i) => (
          <span key={i} className="marquee__item">
            {item}
            <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="5" />
            </svg>
          </span>
        ))}
      </div>
    </div>
  );
}
