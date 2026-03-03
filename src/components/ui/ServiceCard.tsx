import { LayoutGrid, ShoppingCart, Cpu, TrendingUp, Smartphone } from "lucide-react";
import { Link } from "@/i18n/navigation";

type Locale = "de" | "en" | "ar" | "tr";

interface ServiceLocaleData {
  title: string;
  tagline: string;
  description: string;
  simpleExplanation: string;
  deliverables: string[];
  clientQuestion: string;
}

interface Service {
  id: string;
  icon: string;
  color?: string;
  de: ServiceLocaleData;
  en: ServiceLocaleData;
  ar: ServiceLocaleData;
  tr: ServiceLocaleData;
}

interface ServiceCardProps {
  service: Service;
  locale: Locale;
}

const iconMap: Record<string, React.ElementType> = {
  grid: LayoutGrid,
  "shopping-cart": ShoppingCart,
  cpu: Cpu,
  "trending-up": TrendingUp,
  smartphone: Smartphone,
};

export default function ServiceCard({ service, locale }: ServiceCardProps) {
  const data = service[locale] ?? service.de;
  const Icon = iconMap[service.icon] ?? LayoutGrid;

  const previewText =
    data.simpleExplanation.length > 120
      ? data.simpleExplanation.slice(0, 120).trimEnd() + "…"
      : data.simpleExplanation;

  const firstTwoDeliverables = data.deliverables.slice(0, 2);

  return (
    <article className="group relative bg-white border border-border-light hover:border-navy transition-all duration-300 hover:shadow-technical flex flex-col h-full overflow-hidden">
      {/* Navy left border accent — visible on hover */}
      <span
        className="absolute top-0 left-0 w-0.5 h-0 bg-navy transition-all duration-300 group-hover:h-full"
        aria-hidden="true"
      />

      {/* Card header */}
      <div className="p-6 pb-4 border-b border-border-light/60">
        <div className="flex items-start justify-between gap-4 mb-4">
          {/* Icon */}
          <div className="w-10 h-10 bg-frost flex items-center justify-center flex-shrink-0 transition-colors duration-300 group-hover:bg-navy/5">
            <Icon size={18} className="text-navy" aria-hidden="true" />
          </div>

          {/* Service ID tag */}
          <span className="font-mono text-[10px] text-smoke uppercase tracking-widest mt-1 flex-shrink-0">
            {service.id.split("-").slice(0, 2).join("-")}
          </span>
        </div>

        {/* Title */}
        <h3 className="font-display text-base font-700 text-navy mb-1 leading-tight">
          {data.title}
        </h3>

        {/* Tagline */}
        <p className="font-body text-xs text-smoke leading-snug">
          {data.tagline}
        </p>
      </div>

      {/* Card body */}
      <div className="p-6 flex-1 flex flex-col gap-4">
        {/* Simple explanation preview */}
        <p className="font-body text-sm text-charcoal/80 leading-relaxed">
          {previewText}
        </p>

        {/* Deliverables */}
        <div>
          <p className="font-mono text-[10px] text-gold uppercase tracking-widest mb-2">
            — Leistungsumfang
          </p>
          <ul className="space-y-1.5" role="list">
            {firstTwoDeliverables.map((item, i) => (
              <li
                key={i}
                className="flex items-start gap-2 font-body text-xs text-smoke"
              >
                <span
                  className="block w-1 h-1 bg-gold flex-shrink-0 mt-1.5"
                  aria-hidden="true"
                />
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* Footer link */}
        <div className="mt-auto pt-4 border-t border-border-light/60">
          <Link
            href={`/services#${service.id}`}
            className="inline-flex items-center gap-2 font-mono text-xs text-navy hover:text-steel transition-colors duration-200 group/link"
            aria-label={`Learn more about ${data.title}`}
          >
            <span>Mehr erfahren</span>
            <svg
              width="12"
              height="12"
              viewBox="0 0 12 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="transition-transform duration-200 group-hover/link:translate-x-0.5 rtl:rotate-180"
              aria-hidden="true"
            >
              <path
                d="M2 6h8M7 3l3 3-3 3"
                stroke="currentColor"
                strokeWidth="1.2"
                strokeLinecap="square"
              />
            </svg>
          </Link>
        </div>
      </div>
    </article>
  );
}
