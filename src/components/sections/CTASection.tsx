import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { ArrowRight } from "lucide-react";

export default function CTASection() {
  const t = useTranslations("cta");

  return (
    <section
      className="relative bg-navy overflow-hidden py-20 lg:py-28"
      aria-labelledby="cta-heading"
    >
      {/* White grid line pattern overlay */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <svg
          width="100%"
          height="100%"
          xmlns="http://www.w3.org/2000/svg"
          className="absolute inset-0"
        >
          <defs>
            <pattern
              id="ctaGrid"
              width="60"
              height="60"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M 60 0 L 0 0 0 60"
                fill="none"
                stroke="rgba(255,255,255,0.04)"
                strokeWidth="1"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#ctaGrid)" />
        </svg>
      </div>

      {/* Gold accent lines */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/40 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/20 to-transparent" />
        {/* Vertical left accent */}
        <div className="absolute top-0 left-16 bottom-0 w-px bg-gradient-to-b from-gold/20 via-transparent to-transparent" />
      </div>

      {/* Large ghost text */}
      <div
        className="absolute top-1/2 right-0 -translate-y-1/2 font-display text-[180px] lg:text-[250px] font-800 text-white leading-none select-none pointer-events-none overflow-hidden"
        style={{ opacity: 0.02 }}
        aria-hidden="true"
      >
        →
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          {/* Overline */}
          <div className="inline-flex items-center gap-3 mb-7">
            <span className="block h-px w-8 bg-gold" aria-hidden="true" />
            <span className="font-mono text-xs text-gold uppercase tracking-widest">
              Taktral
            </span>
          </div>

          {/* Headline */}
          <h2
            id="cta-heading"
            className="font-display text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-800 text-white leading-tight tracking-tight mb-6"
          >
            {t("headline")}
          </h2>

          {/* Subheadline */}
          <p className="font-body text-base sm:text-lg text-white/60 leading-relaxed mb-10 max-w-xl">
            {t("subheadline")}
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 rtl:flex-row-reverse">
            {/* Primary */}
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-8 py-4 bg-white text-navy font-display text-sm font-700 hover:bg-frost transition-colors duration-200 group"
            >
              {t("primary")}
              <ArrowRight
                size={16}
                className="transition-transform duration-200 group-hover:translate-x-0.5 rtl:rotate-180"
                aria-hidden="true"
              />
            </Link>

            {/* Secondary (ghost on dark) */}
            <Link
              href="/services"
              className="inline-flex items-center gap-2 px-8 py-4 bg-transparent text-white border border-white/30 font-display text-sm font-600 hover:border-white/60 hover:bg-white/5 transition-all duration-200"
            >
              {t("secondary")}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
