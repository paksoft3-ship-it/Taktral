import { getTranslations } from "next-intl/server";
import SectionLabel from "@/components/ui/SectionLabel";
import { Link } from "@/i18n/navigation";
import { ArrowRight, Clock } from "lucide-react";

interface InsightsPageProps {
  params: Promise<{ locale: string }>;
}

type Locale = "de" | "en" | "ar" | "tr";

// Static article placeholders
const articles = [
  {
    id: "automation-roi",
    category: "automation-ai",
    readTime: "5 min",
    date: "2024-11-15",
    de: {
      title: "Wie viel Zeit spart Automatisierung wirklich?",
      excerpt:
        "Wir haben 12 Automatisierungsprojekte analysiert und konkrete Zahlen zusammengefasst: Wie viele Stunden werden täglich eingespart? Ab wann amortisiert sich die Investition?",
      category: "Automatisierung & KI",
    },
    en: {
      title: "How much time does automation really save?",
      excerpt:
        "We analyzed 12 automation projects and compiled concrete numbers: how many hours are saved daily? When does the investment pay off?",
      category: "Automation & AI",
    },
    ar: {
      title: "كم من الوقت توفر الأتمتة حقاً؟",
      excerpt: "حللنا 12 مشروع أتمتة وجمعنا أرقاماً ملموسة: كم ساعة يتم توفيرها يومياً؟",
      category: "الأتمتة والذكاء الاصطناعي",
    },
    tr: {
      title: "Otomasyon gerçekten ne kadar zaman kazandırır?",
      excerpt:
        "12 otomasyon projesini analiz ettik ve somut rakamlar derledik: günlük kaç saat tasarruf ediliyor?",
      category: "Otomasyon & Yapay Zeka",
    },
  },
  {
    id: "ecommerce-b2b",
    category: "ecommerce-systems",
    readTime: "7 min",
    date: "2024-10-20",
    de: {
      title: "B2B E-Commerce: 5 Fehler, die österreichische Händler vermeiden sollten",
      excerpt:
        "Zu viele B2B-Händler setzen auf Standardlösungen, die nicht zu ihren Prozessen passen. Wir erklären die häufigsten Fehler und wie man sie vermeidet.",
      category: "E-Commerce Systeme",
    },
    en: {
      title: "B2B E-Commerce: 5 mistakes Austrian traders should avoid",
      excerpt:
        "Too many B2B traders rely on standard solutions that don't fit their processes. We explain the most common mistakes and how to avoid them.",
      category: "E-Commerce Systems",
    },
    ar: {
      title: "التجارة الإلكترونية B2B: 5 أخطاء يجب تجنبها",
      excerpt: "الكثير من تجار B2B يعتمدون على حلول قياسية لا تناسب عملياتهم.",
      category: "أنظمة التجارة الإلكترونية",
    },
    tr: {
      title: "B2B E-Ticaret: Avusturyalı Tüccarların Kaçınması Gereken 5 Hata",
      excerpt:
        "Çok fazla B2B tüccarı, süreçlerine uymayan standart çözümlere güveniyor. En yaygın hataları ve nasıl kaçınılacağını açıklıyoruz.",
      category: "E-Ticaret Sistemleri",
    },
  },
  {
    id: "nextjs-enterprise",
    category: "digital-infrastructure",
    readTime: "10 min",
    date: "2024-09-05",
    de: {
      title: "Warum Next.js die beste Wahl für Enterprise-Anwendungen ist",
      excerpt:
        "Next.js ist nicht nur für Marketing-Websites. Wir erklären, warum wir es auch für komplexe Enterprise-Applikationen mit hohen Anforderungen an Performance und Skalierbarkeit einsetzen.",
      category: "Digitale Infrastruktur",
    },
    en: {
      title: "Why Next.js is the best choice for enterprise applications",
      excerpt:
        "Next.js is not just for marketing websites. We explain why we also use it for complex enterprise applications with high demands on performance and scalability.",
      category: "Digital Infrastructure",
    },
    ar: {
      title: "لماذا Next.js هو الخيار الأفضل لتطبيقات المؤسسات؟",
      excerpt: "Next.js ليس فقط لمواقع التسويق. نشرح لماذا نستخدمه أيضاً للتطبيقات المعقدة.",
      category: "البنية التحتية الرقمية",
    },
    tr: {
      title: "Next.js'in kurumsal uygulamalar için neden en iyi seçim olduğu",
      excerpt:
        "Next.js sadece pazarlama siteleri için değil. Yüksek performans ve ölçeklenebilirlik gerektiren karmaşık kurumsal uygulamalar için de neden kullandığımızı açıklıyoruz.",
      category: "Dijital Altyapı",
    },
  },
  {
    id: "google-ads-roi",
    category: "performance-marketing",
    readTime: "6 min",
    date: "2024-08-12",
    de: {
      title: "Google Ads Tracking: So messen Sie den echten ROI",
      excerpt:
        "Die meisten Unternehmen wissen nicht, welche Ads-Ausgaben wirklich Kunden bringen. Wir erklären, wie ein vollständiges Tracking-System aufgebaut wird — von Klick bis Auftrag.",
      category: "Performance Marketing",
    },
    en: {
      title: "Google Ads tracking: How to measure real ROI",
      excerpt:
        "Most companies don't know which ad spending actually brings customers. We explain how to build a complete tracking system — from click to contract.",
      category: "Performance Marketing",
    },
    ar: {
      title: "تتبع Google Ads: كيف تقيس العائد الحقيقي",
      excerpt: "معظم الشركات لا تعرف أي إنفاق إعلاني يجلب عملاء فعلاً.",
      category: "تسويق الأداء",
    },
    tr: {
      title: "Google Ads takibi: Gerçek ROI nasıl ölçülür?",
      excerpt:
        "Çoğu şirket hangi reklam harcamalarının gerçekten müşteri getirdiğini bilmiyor. Tıklamadan sözleşmeye kadar nasıl eksiksiz bir takip sistemi oluşturulur, açıklıyoruz.",
      category: "Performans Pazarlama",
    },
  },
];

export default async function InsightsPage({ params }: InsightsPageProps) {
  const { locale } = await params;
  const validLocale = (["de", "en", "ar", "tr"].includes(locale) ? locale : "de") as Locale;
  const t = await getTranslations({ locale, namespace: "insights" });

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
            <p className="font-body text-lg text-white/60 leading-relaxed">
              {t("subheadline")}
            </p>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gold/30" />
      </section>

      {/* Articles grid */}
      <section className="py-16 lg:py-24 bg-offwhite">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
            {articles.map((article) => {
              const data = article[validLocale] ?? article.de;
              return (
                <article
                  key={article.id}
                  className="bg-white border border-border-light hover:border-navy hover:shadow-technical transition-all duration-300 group flex flex-col"
                >
                  {/* Category bar */}
                  <div className="h-1 w-full bg-frost relative overflow-hidden">
                    <div className="absolute top-0 left-0 h-full w-0 bg-gold transition-all duration-500 group-hover:w-full" />
                  </div>

                  <div className="p-8 flex flex-col flex-1">
                    {/* Meta */}
                    <div className="flex items-center gap-4 mb-4">
                      <span className="font-mono text-[10px] text-gold uppercase tracking-widest">
                        {data.category}
                      </span>
                      <div className="flex items-center gap-1 text-smoke/60">
                        <Clock size={11} />
                        <span className="font-mono text-[10px]">
                          {article.readTime}
                        </span>
                      </div>
                    </div>

                    {/* Title */}
                    <h2 className="font-display text-lg font-700 text-navy mb-3 leading-snug tracking-tight">
                      {data.title}
                    </h2>

                    {/* Excerpt */}
                    <p className="font-body text-sm text-smoke leading-relaxed flex-1 mb-6">
                      {data.excerpt}
                    </p>

                    {/* Read more */}
                    <div className="flex items-center justify-between border-t border-border-light pt-4">
                      <span className="font-mono text-[10px] text-smoke/50">
                        {new Date(article.date).toLocaleDateString(
                          validLocale === "de"
                            ? "de-AT"
                            : validLocale === "ar"
                            ? "ar-SA"
                            : validLocale === "tr"
                            ? "tr-TR"
                            : "en-GB"
                        )}
                      </span>
                      <Link
                        href={`/insights/${article.id}`}
                        className="inline-flex items-center gap-1.5 font-mono text-xs text-navy hover:text-steel transition-colors duration-200 group/link"
                      >
                        {t("readMore")}
                        <ArrowRight
                          size={12}
                          className="transition-transform duration-200 group-hover/link:translate-x-0.5 rtl:rotate-180"
                        />
                      </Link>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>

          {/* Newsletter CTA */}
          <div className="mt-16 bg-frost border border-border-light p-10 text-center">
            <p className="font-mono text-[11px] text-gold uppercase tracking-widest mb-4">
              — Newsletter —
            </p>
            <h3 className="font-display text-2xl font-700 text-navy mb-3">
              {validLocale === "de"
                ? "Technische Einblicke direkt ins Postfach"
                : validLocale === "tr"
                ? "Teknik içgörüler doğrudan gelen kutunuza"
                : validLocale === "ar"
                ? "رؤى تقنية مباشرة إلى صندوق بريدك"
                : "Technical insights directly to your inbox"}
            </h3>
            <p className="font-body text-sm text-smoke mb-6 max-w-md mx-auto">
              {validLocale === "de"
                ? "Monatlich. Kein Spam. Nur relevante Inhalte für Unternehmer weltweit."
                : validLocale === "tr"
                ? "Aylık. Spam yok. Dünya genelindeki girişimciler için yalnızca ilgili içerikler."
                : validLocale === "ar"
                ? "شهرياً. لا بريد مزعج. محتوى ذو صلة فقط لرواد الأعمال حول العالم."
                : "Monthly. No spam. Only relevant content for entrepreneurs worldwide."}
            </p>
            <div className="flex flex-col sm:flex-row gap-3 max-w-sm mx-auto">
              <input
                type="email"
                placeholder="Email"
                className="flex-1 px-4 py-3 bg-white border border-border-light focus:border-navy focus:outline-none font-body text-sm"
              />
              <button
                type="button"
                className="px-6 py-3 bg-navy text-white font-display text-sm font-600 hover:bg-steel transition-colors duration-200 whitespace-nowrap"
              >
                {validLocale === "de"
                  ? "Anmelden"
                  : validLocale === "tr"
                  ? "Abone ol"
                  : validLocale === "ar"
                  ? "اشترك"
                  : "Subscribe"}
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
