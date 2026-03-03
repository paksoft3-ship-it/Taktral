import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import SectionLabel from "@/components/ui/SectionLabel";
import ServiceCard from "@/components/ui/ServiceCard";
import servicesData from "@/data/services.json";
import { ArrowRight } from "lucide-react";

type Locale = "de" | "en" | "ar" | "tr";

interface ServicesProps {
  locale: Locale;
}

export default function Services({ locale }: ServicesProps) {
  const t = useTranslations("services");

  // Show first 4 services on homepage; all on services page
  const displayServices = servicesData.slice(0, 4);

  return (
    <section
      className="bg-offwhite py-20 lg:py-28"
      aria-labelledby="services-heading"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* ── Section header ──────────────────────────────────────────────── */}
        <div className="max-w-2xl mb-12 lg:mb-16 rtl:mr-auto rtl:ml-0">
          <SectionLabel className="mb-5">{t("label")}</SectionLabel>

          <h2
            id="services-heading"
            className="font-display text-3xl sm:text-4xl lg:text-5xl font-800 text-navy mb-4 leading-tight tracking-tight"
          >
            {t("headline")}
          </h2>

          <p className="font-body text-base text-smoke leading-relaxed">
            {t("subheadline")}
          </p>
        </div>

        {/* ── Services grid ────────────────────────────────────────────────── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-2 gap-4 lg:gap-6">
          {displayServices.map((service) => (
            <ServiceCard
              key={service.id}
              service={service as Parameters<typeof ServiceCard>[0]["service"]}
              locale={locale}
            />
          ))}
        </div>

        {/* ── View all link ────────────────────────────────────────────────── */}
        <div className="mt-10 flex items-center gap-4">
          <div className="h-px flex-1 bg-border-light" aria-hidden="true" />
          <Link
            href="/services"
            className="inline-flex items-center gap-2 font-display text-sm font-600 text-navy hover:text-steel transition-colors duration-200 group flex-shrink-0"
          >
            {t("viewAll")}
            <ArrowRight
              size={14}
              className="transition-transform duration-200 group-hover:translate-x-0.5 rtl:rotate-180"
              aria-hidden="true"
            />
          </Link>
          <div className="h-px flex-1 bg-border-light" aria-hidden="true" />
        </div>
      </div>
    </section>
  );
}
