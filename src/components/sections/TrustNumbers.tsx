"use client";

import { useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import SectionLabel from "@/components/ui/SectionLabel";

interface StatItem {
  value: number;
  suffix: string;
  prefix: string;
  labelKey: string;
  displayValue?: string;
}

const STATS: StatItem[] = [
  {
    value: 47,
    suffix: "+",
    prefix: "",
    labelKey: "projects",
  },
  {
    value: 0,
    suffix: "",
    prefix: "",
    labelKey: "region",
    displayValue: "INT",
  },
  {
    value: 0,
    suffix: "",
    prefix: "",
    labelKey: "budgetRange",
    displayValue: "5K–20K",
  },
  {
    value: 98,
    suffix: "%",
    prefix: "",
    labelKey: "satisfaction",
  },
];

function useCountUp(target: number, duration: number, active: boolean) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!active || target === 0) {
      setCount(target);
      return;
    }

    const start = performance.now();

    const tick = (now: number) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(eased * target));

      if (progress < 1) {
        requestAnimationFrame(tick);
      }
    };

    requestAnimationFrame(tick);
  }, [active, target, duration]);

  return count;
}

interface StatCardProps {
  stat: StatItem;
  active: boolean;
  index: number;
}

function StatCard({ stat, active, index }: StatCardProps) {
  const t = useTranslations("trust");
  const count = useCountUp(stat.value, 1200 + index * 200, active);

  const displayText = stat.displayValue
    ? stat.displayValue
    : `${stat.prefix}${count}${stat.suffix}`;

  return (
    <div
      className="relative flex flex-col items-start p-8 bg-white border border-border-light group hover:border-navy hover:shadow-technical transition-all duration-300"
      style={{
        animationDelay: `${index * 100}ms`,
      }}
    >
      {/* Gold accent top bar */}
      <div
        className="absolute top-0 left-0 h-0.5 w-0 bg-gold group-hover:w-full transition-all duration-500"
        aria-hidden="true"
      />

      {/* Value */}
      <span className="font-display text-4xl sm:text-5xl font-800 text-navy leading-none tracking-tight mb-3">
        {displayText}
      </span>

      {/* Label */}
      <span className="font-mono text-xs text-smoke uppercase tracking-widest">
        {t(stat.labelKey as Parameters<typeof t>[0])}
      </span>
    </div>
  );
}

export default function TrustNumbers() {
  const t = useTranslations("trust");
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative bg-offwhite bg-dot-grid py-20 lg:py-28 overflow-hidden"
      aria-labelledby="trust-heading"
    >
      {/* Background grid pattern overlay */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <svg
          width="100%"
          height="100%"
          xmlns="http://www.w3.org/2000/svg"
          className="absolute inset-0"
          style={{ opacity: 0.03 }}
        >
          <defs>
            <pattern
              id="trustGrid"
              width="60"
              height="60"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M 60 0 L 0 0 0 60"
                fill="none"
                stroke="#0D2B55"
                strokeWidth="1"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#trustGrid)" />
        </svg>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="max-w-2xl mb-12 lg:mb-16">
          <SectionLabel className="mb-5">{t("label")}</SectionLabel>

          <h2
            id="trust-heading"
            className="font-display text-3xl sm:text-4xl lg:text-5xl font-800 text-navy leading-tight tracking-tight"
          >
            {t("headline")}
          </h2>
        </div>

        {/* Stats grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-0 border border-border-light">
          {STATS.map((stat, i) => (
            <div
              key={stat.labelKey}
              className={[
                i % 2 === 1 && i < 3 ? "border-l border-border-light" : "",
                i >= 2 ? "border-t border-border-light" : "",
                i === 2 ? "lg:border-t-0 lg:border-l border-border-light" : "",
                i === 3 ? "lg:border-t-0 lg:border-l border-border-light" : "",
                "lg:border-r-0",
              ]
                .filter(Boolean)
                .join(" ")}
            >
              <StatCard stat={stat} active={isVisible} index={i} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
