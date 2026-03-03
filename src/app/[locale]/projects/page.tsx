"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { useParams } from "next/navigation";
import SectionLabel from "@/components/ui/SectionLabel";
import { MapPin, ArrowUpRight, CheckCircle2 } from "lucide-react";
import projectsData from "@/data/projects.json";
import servicesData from "@/data/services.json";

type Locale = "de" | "en" | "ar" | "tr";

export default function ProjectsPage() {
  const params = useParams();
  const locale = (params?.locale as string) ?? "de";
  const validLocale = (["de", "en", "ar", "tr"].includes(locale) ? locale : "de") as Locale;
  const t = useTranslations("projects");

  const [activeFilter, setActiveFilter] = useState<string>("all");

  const categories = [
    { id: "all", label: t("filterAll") },
    ...servicesData.map((s) => ({
      id: s.id,
      label: s[validLocale]?.title ?? s.de.title,
    })),
  ];

  const filtered =
    activeFilter === "all"
      ? projectsData
      : projectsData.filter((p) => p.category === activeFilter);

  return (
    <>
      {/* Page hero */}
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

      {/* Filter tabs */}
      <section className="bg-white border-b border-border-light sticky top-16 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex gap-0 overflow-x-auto">
            {categories.map((cat) => (
              <button
                key={cat.id}
                type="button"
                onClick={() => setActiveFilter(cat.id)}
                className={[
                  "flex-shrink-0 px-5 py-4 font-mono text-xs uppercase tracking-wider border-b-2 transition-all duration-200",
                  activeFilter === cat.id
                    ? "border-gold text-navy font-600"
                    : "border-transparent text-smoke hover:text-navy hover:border-border-light",
                ].join(" ")}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Projects grid */}
      <section className="py-16 lg:py-24 bg-offwhite">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {filtered.map((project) => {
              const data = project[validLocale] ?? project.de;
              return (
                <article
                  key={project.id}
                  className="bg-white border border-border-light hover:border-navy hover:shadow-technical transition-all duration-300 group relative overflow-hidden"
                >
                  {/* Top accent */}
                  <div className="h-px w-0 bg-gold transition-all duration-500 group-hover:w-full" />

                  <div className="p-8">
                    {/* Meta row */}
                    <div className="flex items-center justify-between mb-6">
                      <div className="flex items-center gap-2">
                        <MapPin size={12} className="text-gold" />
                        <span className="font-mono text-[10px] text-smoke uppercase tracking-widest">
                          {data.region}
                        </span>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="font-mono text-[10px] text-smoke/60">
                          {project.year}
                        </span>
                        <span className="font-mono text-[10px] text-navy bg-frost px-2 py-0.5">
                          {project.budget}
                        </span>
                      </div>
                    </div>

                    {/* Title */}
                    <h2 className="font-display text-xl font-700 text-navy mb-3 tracking-tight">
                      {data.title}
                    </h2>

                    {/* Client */}
                    <p className="font-mono text-xs text-gold uppercase tracking-wider mb-4">
                      {data.client}
                    </p>

                    {/* Description */}
                    <p className="font-body text-sm text-smoke leading-relaxed mb-6">
                      {data.description}
                    </p>

                    {/* Challenge / Solution */}
                    <div className="space-y-4 mb-6">
                      <div>
                        <p className="font-mono text-[10px] text-smoke uppercase tracking-widest mb-1">
                          {t("challengeLabel")}
                        </p>
                        <p className="font-body text-sm text-charcoal/80">
                          {data.challenge}
                        </p>
                      </div>
                      <div>
                        <p className="font-mono text-[10px] text-smoke uppercase tracking-widest mb-1">
                          {t("solutionLabel")}
                        </p>
                        <p className="font-body text-sm text-charcoal/80">
                          {data.solution}
                        </p>
                      </div>
                    </div>

                    {/* Results */}
                    <div className="bg-frost p-4">
                      <p className="font-mono text-[10px] text-gold uppercase tracking-widest mb-3">
                        {t("resultsLabel")}
                      </p>
                      <ul className="space-y-2" role="list">
                        {data.results.map((result, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <CheckCircle2
                              size={13}
                              className="text-gold flex-shrink-0 mt-0.5"
                            />
                            <span className="font-body text-sm text-charcoal font-500">
                              {result}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>

          {filtered.length === 0 && (
            <div className="text-center py-20 text-smoke font-body">
              Keine Projekte in dieser Kategorie.
            </div>
          )}
        </div>
      </section>
    </>
  );
}
