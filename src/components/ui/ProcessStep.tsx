interface ProcessStepProps {
  step: string;
  title: string;
  description: string;
  details: string[];
  duration: string;
  durationLabel?: string;
  isLast?: boolean;
}

export default function ProcessStep({
  step,
  title,
  description,
  details,
  duration,
  durationLabel = "Dauer",
  isLast = false,
}: ProcessStepProps) {
  return (
    <div className="relative flex gap-6 md:gap-8">
      {/* ── Left column: step number + connecting line ─────────────────── */}
      <div className="flex flex-col items-center flex-shrink-0">
        {/* Step number circle */}
        <div className="relative w-12 h-12 flex-shrink-0 flex items-center justify-center bg-navy/10 border border-navy/20 z-10">
          <span className="font-mono text-xs font-600 text-gold">{step}</span>
        </div>

        {/* Connecting vertical line */}
        {!isLast && (
          <div
            className="flex-1 w-px bg-gradient-to-b from-gold/40 to-transparent mt-2"
            aria-hidden="true"
            style={{ minHeight: 48 }}
          />
        )}
      </div>

      {/* ── Right column: content ────────────────────────────────────────── */}
      <div className={`flex-1 pb-10 ${isLast ? "pb-0" : ""}`}>
        {/* Large ghost step number */}
        <div
          className="absolute top-0 right-0 font-display text-[80px] md:text-[100px] font-800 text-gold leading-none select-none pointer-events-none"
          style={{ opacity: 0.08, lineHeight: 1 }}
          aria-hidden="true"
        >
          {step}
        </div>

        {/* Duration badge */}
        <div className="inline-flex items-center gap-2 mb-3">
          <span className="font-mono text-[10px] text-gold/70 uppercase tracking-widest">
            {durationLabel}:
          </span>
          <span className="font-mono text-[10px] text-white/60 uppercase tracking-widest">
            {duration}
          </span>
        </div>

        {/* Title */}
        <h3 className="font-display text-xl font-700 text-white mb-2 leading-tight">
          {title}
        </h3>

        {/* Description */}
        <p className="font-body text-sm text-white/70 leading-relaxed mb-4 max-w-lg">
          {description}
        </p>

        {/* Detail bullets */}
        <ul className="space-y-2" role="list">
          {details.map((detail, i) => (
            <li
              key={i}
              className="flex items-start gap-3 font-body text-sm text-white/60"
            >
              <span
                className="block w-1 h-1 bg-gold flex-shrink-0 mt-2"
                aria-hidden="true"
              />
              {detail}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
