"use client";

import { useTranslations } from "next-intl";
import Button from "@/components/ui/Button";
import SectionLabel from "@/components/ui/SectionLabel";
import GeoPattern from "@/components/ui/GeoPattern";

interface HeroProps {
  locale: string;
}

export default function Hero({ locale: _locale }: HeroProps) {
  const t = useTranslations("hero");

  const stats = [
    {
      value: "47+",
      label: t("statsProjects"),
    },
    {
      value: t("statsRegionValue"),
      label: t("statsRegion"),
    },
    {
      value: t("statsBudgetValue"),
      label: t("statsBudget"),
    },
  ];

  return (
    <section
      className="relative min-h-[calc(100vh-4rem)] bg-offwhite bg-dot-grid overflow-hidden"
      aria-label="Hero"
    >
      {/* Blueprint accent lines in background */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        {/* Top horizontal rule */}
        <div className="absolute top-1/4 left-0 right-0 h-px bg-navy/5" />
        {/* Vertical left rule */}
        <div className="absolute top-0 bottom-0 left-1/3 w-px bg-navy/3" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center min-h-[calc(100vh-4rem)] py-16 lg:py-24">
          {/* ── Left: Copy ─────────────────────────────────────────────── */}
          <div className="flex flex-col gap-7 rtl:text-right">
            {/* Overline label */}
            <SectionLabel>{t("overline")}</SectionLabel>

            {/* H1 */}
            <h1 className="font-display text-4xl sm:text-5xl lg:text-[3.5rem] xl:text-[4rem] font-800 text-navy leading-[1.08] tracking-tight-eng">
              {t("headline")}
            </h1>

            {/* Subheadline */}
            <p className="font-body text-base sm:text-lg text-smoke leading-relaxed max-w-xl">
              {t("subheadline")}
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 rtl:flex-row-reverse">
              <Button
                variant="primary"
                size="lg"
                href="/contact"
                showArrow
              >
                {t("ctaPrimary")}
              </Button>
              <Button
                variant="secondary"
                size="lg"
                href="/projects"
                showArrow={false}
              >
                {t("ctaSecondary")}
              </Button>
            </div>

            {/* Stats row */}
            <div className="flex flex-wrap items-stretch gap-0 pt-4 border-t border-border-light">
              {stats.map((stat, i) => (
                <div key={i} className="flex items-stretch">
                  <div className="px-5 first:pl-0 py-3 flex flex-col gap-0.5">
                    <span className="font-display text-2xl font-800 text-navy leading-none tracking-tight">
                      {stat.value}
                    </span>
                    <span className="font-mono text-[10px] text-smoke uppercase tracking-widest">
                      {stat.label}
                    </span>
                  </div>
                  {/* Divider (not after last) */}
                  {i < stats.length - 1 && (
                    <div
                      className="w-px bg-border-light self-stretch mx-0"
                      aria-hidden="true"
                    />
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* ── Right: Geo pattern ──────────────────────────────────────── */}
          <div
            className="relative hidden lg:flex items-center justify-center h-full min-h-[520px]"
            aria-hidden="true"
          >
            <GeoPattern className="w-full" />
          </div>
        </div>
      </div>

      {/* Bottom fade */}
      <div
        className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-offwhite to-transparent pointer-events-none"
        aria-hidden="true"
      />
    </section>
  );
}
