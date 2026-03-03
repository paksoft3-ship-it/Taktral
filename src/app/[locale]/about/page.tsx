import { getTranslations } from "next-intl/server";
import SectionLabel from "@/components/ui/SectionLabel";
import CTASection from "@/components/sections/CTASection";
import {
  MapPin,
  DollarSign,
  FileText,
  MessageSquare,
  Users,
} from "lucide-react";

interface AboutPageProps {
  params: Promise<{ locale: string }>;
}

export default async function AboutPage({ params }: AboutPageProps) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "about" });

  const principles = [
    {
      icon: MapPin,
      title: t("remoteTitle"),
      desc: t("remoteDesc"),
    },
    {
      icon: DollarSign,
      title: t("fixedPriceTitle"),
      desc: t("fixedPriceDesc"),
    },
    {
      icon: FileText,
      title: t("documentationTitle"),
      desc: t("documentationDesc"),
    },
    {
      icon: MessageSquare,
      title: t("communicationTitle"),
      desc: t("communicationDesc"),
    },
    {
      icon: Users,
      title: t("inPersonTitle"),
      desc: t("inPersonDesc"),
    },
  ];

  return (
    <>
      {/* Hero */}
      <section className="bg-navy py-20 lg:py-28 relative overflow-hidden">
        <div className="absolute inset-0 bg-blueprint opacity-20 pointer-events-none" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <SectionLabel light className="mb-6">{t("label")}</SectionLabel>
            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-800 text-white leading-tight tracking-tight-eng mb-6">
              {t("headline")}
            </h1>
            <p className="font-body text-xl text-white/60 leading-relaxed">
              {t("subheadline")}
            </p>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gold/30" />
      </section>

      {/* Positioning section */}
      <section className="py-16 lg:py-24 bg-offwhite">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Left: geometric visual */}
            <div className="relative h-80 lg:h-96 bg-frost flex items-center justify-center overflow-hidden">
              {/* Blueprint grid */}
              <div className="absolute inset-0 bg-blueprint opacity-40" />
              {/* Geometric shapes */}
              <div className="relative z-10 flex items-center justify-center w-full h-full">
                <div className="absolute top-8 left-8 w-32 h-32 bg-navy/10 border border-navy/20" />
                <div className="absolute bottom-8 right-8 w-24 h-24 bg-steel/15 border border-steel/20" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 border-2 border-gold/30" />
                {/* Gold accent lines */}
                <div className="absolute top-0 left-16 bottom-0 w-px bg-gold/20" />
                <div className="absolute left-0 top-16 right-0 h-px bg-gold/20" />
                {/* Center content */}
                <div className="bg-white border border-border-light p-6 shadow-technical z-20 text-center">
                  <div className="font-display text-4xl font-800 text-navy">47+</div>
                  <div className="font-mono text-xs text-gold uppercase tracking-widest mt-1">
                    Projekte
                  </div>
                </div>
              </div>
            </div>

            {/* Right: text */}
            <div className="space-y-6">
              <div className="h-px w-16 bg-gold" />
              <div className="space-y-4 font-body text-base text-smoke leading-relaxed">
                <p>
                  Taktral wurde gegründet, weil wir gesehen haben, wie viele mittelständische Unternehmen digitale Probleme haben — aber keine zuverlässigen, strukturierten Partner finden, die Lösungen zu fairen Festpreisen liefern.
                </p>
                <p>
                  Wir positionieren uns bewusst als technischer Ingenieur, nicht als Kreativstudio. Unsere Kunden wissen: Sie bekommen ein Festpreisangebot, einen strukturierten Prozess, vollständige Dokumentation und einen lokalen Ansprechpartner — ohne Überraschungen.
                </p>
                <p>
                  Das Entwicklungsteam arbeitet international und remote. Die Projektverantwortung liegt beim Partner in Österreich.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How we work */}
      <section className="py-16 lg:py-24 bg-frost">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-xl mb-12">
            <SectionLabel className="mb-4">{t("howWeWork")}</SectionLabel>
            <h2 className="font-display text-3xl sm:text-4xl font-800 text-navy tracking-tight">
              {t("howWeWork")}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-0 border border-border-light">
            {principles.map((p, i) => {
              const Icon = p.icon;
              return (
                <div
                  key={i}
                  className={[
                    "bg-white p-8 border-border-light hover:shadow-technical transition-shadow duration-300 group",
                    i < 3 ? "border-b" : "",
                    i % 3 !== 2 ? "border-r" : "",
                  ].join(" ")}
                >
                  <div className="w-10 h-10 bg-navy/5 flex items-center justify-center mb-5 group-hover:bg-navy transition-colors duration-300">
                    <Icon
                      size={18}
                      className="text-navy group-hover:text-white transition-colors duration-300"
                    />
                  </div>
                  <h3 className="font-display text-base font-700 text-navy mb-2">
                    {p.title}
                  </h3>
                  <p className="font-body text-sm text-smoke leading-relaxed">
                    {p.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Technologies strip */}
      <section className="py-12 bg-navy border-y border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="font-mono text-[11px] text-gold uppercase tracking-widest text-center mb-8">
            — Technologie-Stack —
          </p>
          <div className="flex flex-wrap items-center justify-center gap-8 text-white/40">
            {[
              "Next.js",
              "React",
              "Node.js",
              "PostgreSQL",
              "TypeScript",
              "AWS",
              "Docker",
              "Stripe",
              "n8n",
              "Vercel",
              "Shopify",
              "React Native",
            ].map((tech) => (
              <span key={tech} className="font-mono text-sm">
                {tech}
              </span>
            ))}
          </div>
        </div>
      </section>

      <CTASection />
    </>
  );
}
