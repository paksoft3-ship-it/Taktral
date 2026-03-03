import { useTranslations } from "next-intl";
import { getTranslations } from "next-intl/server";
import SectionLabel from "@/components/ui/SectionLabel";
import CTASection from "@/components/sections/CTASection";
import { LayoutGrid, ShoppingCart, Cpu, TrendingUp, Smartphone, CheckCircle2, MessageSquareQuote } from "lucide-react";
import servicesData from "@/data/services.json";

type Locale = "de" | "en" | "ar" | "tr";

interface ServicesPageProps {
  params: Promise<{ locale: string }>;
}

const iconMap: Record<string, React.ElementType> = {
  grid: LayoutGrid,
  "shopping-cart": ShoppingCart,
  cpu: Cpu,
  "trending-up": TrendingUp,
  smartphone: Smartphone,
};

export default async function ServicesPage({ params }: ServicesPageProps) {
  const { locale } = await params;
  const validLocale = (["de", "en", "ar", "tr"].includes(locale) ? locale : "de") as Locale;
  const t = await getTranslations({ locale, namespace: "services" });

  return (
    <>
      {/* Page Hero */}
      <section className="bg-navy py-20 lg:py-28 relative overflow-hidden">
        <div className="absolute inset-0 bg-blueprint opacity-20 pointer-events-none" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <SectionLabel light className="mb-6">{t("label")}</SectionLabel>
            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-800 text-white leading-tight tracking-tight-eng mb-6">
              {t("headline")}
            </h1>
            <p className="font-body text-lg text-white/60 leading-relaxed">
              {t("subheadline")}
            </p>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gold/30" />
      </section>

      {/* Services Detail */}
      <section className="py-16 lg:py-24 bg-offwhite">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-20">
            {servicesData.map((service, idx) => {
              const data = service[validLocale] ?? service.de;
              const Icon = iconMap[service.icon] ?? LayoutGrid;
              const isEven = idx % 2 === 0;

              return (
                <article
                  key={service.id}
                  id={service.id}
                  className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-start scroll-mt-20"
                >
                  {/* Number + icon (narrow col) */}
                  <div className={`lg:col-span-1 ${isEven ? "" : "lg:order-last"}`}>
                    <div className="sticky top-24">
                      <div className="font-mono text-[80px] font-700 text-navy/5 leading-none select-none">
                        {String(idx + 1).padStart(2, "0")}
                      </div>
                      <div className="w-14 h-14 bg-navy flex items-center justify-center mt-4">
                        <Icon size={24} className="text-white" />
                      </div>
                    </div>
                  </div>

                  {/* Main content */}
                  <div className="lg:col-span-4 space-y-8">
                    {/* Title & tagline */}
                    <div className="border-l-2 border-gold pl-6">
                      <h2 className="font-display text-2xl sm:text-3xl font-800 text-navy mb-2 tracking-tight">
                        {data.title}
                      </h2>
                      <p className="font-mono text-sm text-gold uppercase tracking-wider">
                        {data.tagline}
                      </p>
                    </div>

                    {/* Description */}
                    <p className="font-body text-base text-smoke leading-relaxed">
                      {data.description}
                    </p>

                    {/* Simple explanation callout */}
                    <div className="bg-frost border-l-4 border-gold p-6">
                      <p className="font-mono text-[11px] text-gold uppercase tracking-widest mb-3">
                        {t("simpleExplanationLabel")}
                      </p>
                      <p className="font-body text-base text-charcoal leading-relaxed">
                        {data.simpleExplanation}
                      </p>
                    </div>

                    {/* Two-col: deliverables + client question */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* Deliverables */}
                      <div className="bg-white border border-border-light p-6">
                        <p className="font-mono text-[11px] text-smoke uppercase tracking-widest mb-4">
                          {t("deliverablesLabel")}
                        </p>
                        <ul className="space-y-2.5" role="list">
                          {data.deliverables.map((item, i) => (
                            <li key={i} className="flex items-start gap-3">
                              <CheckCircle2
                                size={14}
                                className="text-gold flex-shrink-0 mt-0.5"
                              />
                              <span className="font-body text-sm text-charcoal">
                                {item}
                              </span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Client question */}
                      <div className="bg-navy text-white p-6 flex flex-col">
                        <MessageSquareQuote
                          size={20}
                          className="text-gold mb-4 flex-shrink-0"
                        />
                        <p className="font-mono text-[11px] text-gold uppercase tracking-widest mb-3">
                          {t("clientQuestionLabel")}
                        </p>
                        <blockquote className="font-display text-base font-600 text-white/90 leading-snug italic flex-1">
                          &ldquo;{data.clientQuestion}&rdquo;
                        </blockquote>
                      </div>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <CTASection />
    </>
  );
}
