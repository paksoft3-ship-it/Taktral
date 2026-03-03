interface SectionLabelProps {
  children: React.ReactNode;
  className?: string;
  light?: boolean;
}

export default function SectionLabel({
  children,
  className = "",
  light = false,
}: SectionLabelProps) {
  return (
    <div
      className={`inline-flex items-center gap-3 ${className}`}
      role="heading"
      aria-level={6}
    >
      {/* Gold accent line */}
      <span
        className="block h-px w-8 flex-shrink-0 bg-gold"
        aria-hidden="true"
      />
      {/* Label text */}
      <span
        className={[
          "font-mono text-xs font-500 uppercase tracking-[0.15em]",
          light ? "text-gold" : "text-gold",
        ]
          .filter(Boolean)
          .join(" ")}
      >
        {children}
      </span>
    </div>
  );
}
