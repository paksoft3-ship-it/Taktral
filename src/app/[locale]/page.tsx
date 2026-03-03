import Hero from "@/components/sections/Hero";
import Services from "@/components/sections/Services";
import Process from "@/components/sections/Process";
import TrustNumbers from "@/components/sections/TrustNumbers";
import CTASection from "@/components/sections/CTASection";
import FAQSection from "@/components/sections/FAQSection";

type Locale = "de" | "en" | "ar" | "tr";

interface HomePageProps {
  params: Promise<{ locale: string }>;
}

export default async function HomePage({ params }: HomePageProps) {
  const { locale } = await params;
  const validLocale = (["de", "en", "ar", "tr"].includes(locale) ? locale : "de") as Locale;

  return (
    <>
      <Hero locale={validLocale} />

      {/* Positioning strip */}
      <section className="bg-frost py-12 border-y border-border-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:divide-x divide-border-light">
            {[
              { num: "47+", label: { de: "Projekte", en: "Projects", ar: "مشروع", tr: "Proje" } },
              { num: "DACH", label: { de: "Region", en: "Region", ar: "المنطقة", tr: "Bölge" } },
              { num: "98%", label: { de: "Zufriedenheit", en: "Satisfaction", ar: "رضا العملاء", tr: "Memnuniyet" } },
            ].map((stat) => (
              <div key={stat.num} className="text-center md:px-8">
                <div className="font-display text-4xl font-800 text-navy tracking-tight-eng mb-1">
                  {stat.num}
                </div>
                <div className="font-mono text-[11px] text-smoke uppercase tracking-widest">
                  {stat.label[validLocale]}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Services locale={validLocale} />
      <Process locale={validLocale} />
      <TrustNumbers />
      <FAQSection locale={validLocale} />
      <CTASection />
    </>
  );
}
