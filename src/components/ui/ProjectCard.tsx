type Locale = "de" | "en" | "ar" | "tr";

interface ProjectLocaleData {
  title: string;
  client: string;
  region: string;
  description: string;
  challenge: string;
  solution: string;
  results: string[];
}

interface Project {
  id: string;
  category: string;
  year: string;
  budget: string;
  de: ProjectLocaleData;
  en: ProjectLocaleData;
  ar: ProjectLocaleData;
  tr: ProjectLocaleData;
}

interface ProjectCardProps {
  project: Project;
  locale: Locale;
}

const categoryColors: Record<string, string> = {
  "ecommerce-systems": "text-steel",
  "automation-ai": "text-navy",
  "digital-infrastructure": "text-charcoal",
  "performance-marketing": "text-smoke",
  "mobile-apps": "text-steel",
};

export default function ProjectCard({ project, locale }: ProjectCardProps) {
  const data = project[locale] ?? project.de;
  const categoryColor = categoryColors[project.category] ?? "text-smoke";

  return (
    <article className="group bg-white border border-border-light hover:border-navy hover:shadow-technical transition-all duration-300 flex flex-col h-full overflow-hidden">
      {/* Category & region bar */}
      <div className="px-6 py-3 bg-frost/50 border-b border-border-light flex items-center justify-between gap-4">
        <span
          className={`font-mono text-[10px] uppercase tracking-widest ${categoryColor}`}
        >
          {project.category.replace(/-/g, " ")}
        </span>
        <span className="font-mono text-[10px] text-smoke uppercase tracking-widest text-right rtl:text-left">
          {data.region}
        </span>
      </div>

      {/* Main content */}
      <div className="p-6 flex flex-col flex-1 gap-5">
        {/* Title & year */}
        <div>
          <div className="flex items-start justify-between gap-3 mb-2">
            <h3 className="font-display text-lg font-700 text-navy leading-tight">
              {data.title}
            </h3>
            <span className="font-mono text-xs text-smoke flex-shrink-0 mt-0.5">
              {project.year}
            </span>
          </div>
          <p className="font-mono text-xs text-gold uppercase tracking-widest">
            {data.client}
          </p>
        </div>

        {/* Description */}
        <p className="font-body text-sm text-charcoal/80 leading-relaxed">
          {data.description}
        </p>

        {/* Budget */}
        <div className="flex items-center gap-3 py-3 border-t border-b border-border-light/60">
          <span className="font-mono text-[10px] text-smoke uppercase tracking-widest">
            Budget
          </span>
          <span className="h-px flex-1 bg-border-light" aria-hidden="true" />
          <span className="font-mono text-xs font-600 text-navy">
            {project.budget}
          </span>
        </div>

        {/* Results */}
        <div className="flex-1">
          <p className="font-mono text-[10px] text-gold uppercase tracking-widest mb-3">
            — Ergebnisse
          </p>
          <ul className="space-y-2" role="list">
            {data.results.map((result, i) => (
              <li
                key={i}
                className="flex items-start gap-2.5 font-body text-sm text-charcoal/80"
              >
                <span
                  className="block w-1.5 h-1.5 bg-gold flex-shrink-0 mt-1.5"
                  aria-hidden="true"
                />
                {result}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Bottom border accent — gold on hover */}
      <div className="h-0.5 w-0 bg-gold group-hover:w-full transition-all duration-500" aria-hidden="true" />
    </article>
  );
}
