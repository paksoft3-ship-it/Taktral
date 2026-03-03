import { useTranslations } from "next-intl";
import SectionLabel from "@/components/ui/SectionLabel";
import ProcessStep from "@/components/ui/ProcessStep";
import processData from "@/data/process.json";

type Locale = "de" | "en" | "ar" | "tr";

interface ProcessProps {
  locale: Locale;
}

export default function Process({ locale }: ProcessProps) {
  const t = useTranslations("process");

  return (
    <section
      className="bg-navy py-20 lg:py-28 relative overflow-hidden"
      aria-labelledby="process-heading"
    >
      {/* Background blueprint pattern */}
      <div className="absolute inset-0 bg-blueprint opacity-30 pointer-events-none" aria-hidden="true" />

      {/* Large ghost text decoration */}
      <div
        className="absolute top-0 right-0 font-display text-[200px] font-800 text-white leading-none select-none pointer-events-none overflow-hidden"
        style={{ opacity: 0.02, transform: "translateX(20%)" }}
        aria-hidden="true"
      >
        01
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* ── Section header ──────────────────────────────────────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 mb-16 lg:mb-20">
          <div>
            <SectionLabel className="mb-5" light>
              {t("label")}
            </SectionLabel>

            <h2
              id="process-heading"
              className="font-display text-3xl sm:text-4xl lg:text-5xl font-800 text-white leading-tight tracking-tight"
            >
              {t("headline")}
            </h2>
          </div>

          <div className="flex items-end">
            <p className="font-body text-base text-white/60 leading-relaxed">
              {t("subheadline")}
            </p>
          </div>
        </div>

        {/* ── Process steps ────────────────────────────────────────────────── */}
        <div className="max-w-2xl space-y-0">
          {processData.map((item, index) => {
            const data = item[locale as keyof typeof item] as {
              title: string;
              description: string;
              details: string[];
            } | undefined;

            if (!data || typeof data !== "object" || !("title" in data)) {
              return null;
            }

            return (
              <ProcessStep
                key={item.step}
                step={item.step}
                title={data.title}
                description={data.description}
                details={data.details}
                duration={item.duration}
                durationLabel={t("durationLabel")}
                isLast={index === processData.length - 1}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
}
