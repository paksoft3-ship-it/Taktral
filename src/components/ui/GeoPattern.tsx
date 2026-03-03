interface GeoPatternProps {
  className?: string;
}

export default function GeoPattern({ className = "" }: GeoPatternProps) {
  return (
    <div
      className={`relative w-full h-full min-h-[520px] ${className}`}
      aria-hidden="true"
    >
      {/* Outer container with blueprint lines */}
      <div className="absolute inset-0 bg-blueprint opacity-40" />

      {/* ── Large navy background rectangle ─────────────────────────────── */}
      <div
        className="absolute bg-navy"
        style={{
          top: "8%",
          right: "5%",
          width: "72%",
          height: "80%",
        }}
      />

      {/* ── Steel offset rectangle (slightly behind) ─────────────────────── */}
      <div
        className="absolute bg-steel"
        style={{
          top: "18%",
          right: "18%",
          width: "55%",
          height: "65%",
          opacity: 0.7,
        }}
      />

      {/* ── White inner panel with grid lines ───────────────────────────── */}
      <div
        className="absolute bg-offwhite"
        style={{
          top: "22%",
          right: "22%",
          width: "46%",
          height: "52%",
          overflow: "hidden",
        }}
      >
        {/* Inner grid lines */}
        <svg
          width="100%"
          height="100%"
          xmlns="http://www.w3.org/2000/svg"
          style={{ position: "absolute", inset: 0 }}
        >
          <defs>
            <pattern
              id="innerGrid"
              width="20"
              height="20"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M 20 0 L 0 0 0 20"
                fill="none"
                stroke="rgba(13,43,85,0.08)"
                strokeWidth="1"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#innerGrid)" />
        </svg>

        {/* Inner content: stacked lines to suggest code/data */}
        <div className="absolute inset-0 flex flex-col justify-center px-5 gap-2.5">
          {[85, 60, 75, 45, 90, 55].map((width, i) => (
            <div
              key={i}
              className="flex items-center gap-2"
              style={{ opacity: 0.6 - i * 0.06 }}
            >
              <span
                className="block bg-gold flex-shrink-0"
                style={{ width: 2, height: 12 }}
              />
              <span
                className="block bg-navy"
                style={{ width: `${width}%`, height: 2, opacity: 0.15 }}
              />
            </div>
          ))}
        </div>
      </div>

      {/* ── Gold SVG accent lines ────────────────────────────────────────── */}
      <svg
        className="absolute inset-0 w-full h-full"
        xmlns="http://www.w3.org/2000/svg"
        style={{ pointerEvents: "none" }}
      >
        {/* Top horizontal gold line */}
        <line
          x1="5%"
          y1="8%"
          x2="40%"
          y2="8%"
          stroke="#B8954A"
          strokeWidth="1.5"
          opacity="0.7"
        />
        {/* Left vertical gold line */}
        <line
          x1="5%"
          y1="8%"
          x2="5%"
          y2="55%"
          stroke="#B8954A"
          strokeWidth="1.5"
          opacity="0.7"
        />
        {/* Bottom right corner accent */}
        <line
          x1="77%"
          y1="88%"
          x2="95%"
          y2="88%"
          stroke="#B8954A"
          strokeWidth="1"
          opacity="0.5"
        />
        {/* Small tick marks */}
        <line
          x1="5%"
          y1="8%"
          x2="5%"
          y2="14%"
          stroke="#B8954A"
          strokeWidth="2"
          opacity="0.9"
        />
        <line
          x1="5%"
          y1="30%"
          x2="5%"
          y2="36%"
          stroke="#B8954A"
          strokeWidth="2"
          opacity="0.5"
        />
        <line
          x1="5%"
          y1="52%"
          x2="5%"
          y2="55%"
          stroke="#B8954A"
          strokeWidth="2"
          opacity="0.3"
        />
        {/* Corner bracket top-right of white box */}
        <polyline
          points="72%,21% 77%,21% 77%,26%"
          fill="none"
          stroke="#B8954A"
          strokeWidth="1.5"
          opacity="0.6"
        />
        {/* Corner bracket bottom-left of white box */}
        <polyline
          points="22%,75% 22%,74% 27%,74%"
          fill="none"
          stroke="#B8954A"
          strokeWidth="1.5"
          opacity="0.6"
        />
      </svg>

      {/* ── Floating badge (top-left) ─────────────────────────────────────── */}
      <div
        className="absolute bg-white border border-border-light shadow-technical"
        style={{
          top: "6%",
          left: "2%",
          padding: "10px 14px",
          minWidth: 120,
        }}
      >
        <p className="font-mono text-[10px] text-gold uppercase tracking-widest mb-1">
          System
        </p>
        <p className="font-display text-xs font-700 text-navy">Architecture</p>
      </div>

      {/* ── Floating stat badge (bottom-left) ──────────────────────────────── */}
      <div
        className="absolute bg-navy border-l-2 border-gold"
        style={{
          bottom: "12%",
          left: "2%",
          padding: "10px 16px",
          minWidth: 110,
        }}
      >
        <p className="font-display text-xl font-800 text-white leading-none">
          47+
        </p>
        <p className="font-mono text-[10px] text-gold uppercase tracking-widest mt-1">
          Projekte
        </p>
      </div>

      {/* ── Small decorative dot cluster ────────────────────────────────────── */}
      <div
        className="absolute"
        style={{
          bottom: "28%",
          left: "10%",
        }}
      >
        {[0, 1, 2].map((row) =>
          [0, 1, 2].map((col) => (
            <span
              key={`${row}-${col}`}
              className="absolute block bg-gold"
              style={{
                width: 3,
                height: 3,
                top: row * 10,
                left: col * 10,
                opacity: 0.3 + (row + col) * 0.05,
              }}
            />
          ))
        )}
      </div>

      {/* ── Small accent rectangle (top-right corner) ────────────────────── */}
      <div
        className="absolute bg-gold"
        style={{
          top: "4%",
          right: "3%",
          width: 40,
          height: 4,
          opacity: 0.7,
        }}
      />
    </div>
  );
}
