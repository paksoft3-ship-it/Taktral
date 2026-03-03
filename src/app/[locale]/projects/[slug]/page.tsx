import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import SectionLabel from "@/components/ui/SectionLabel";
import CTASection from "@/components/sections/CTASection";
import {
  MapPin,
  ArrowLeft,
  CheckCircle2,
  TrendingUp,
  Server,
  Layers,
  ArrowRight,
} from "lucide-react";
import projectsData from "@/data/projects.json";

type Locale = "de" | "en" | "ar" | "tr";

interface ProjectDetailPageProps {
  params: Promise<{ locale: string; slug: string }>;
}

// Tech stacks per project
const techStacks: Record<string, string[]> = {
  "austrian-ecommerce-platform": [
    "Next.js", "Node.js", "PostgreSQL", "Stripe", "Shopify API", "Docker", "AWS",
  ],
  "german-automation-crm": [
    "n8n", "HubSpot API", "Make (Integromat)", "PostgreSQL", "TypeScript", "Vercel",
  ],
  "saas-platform-startup": [
    "Next.js", "Node.js", "PostgreSQL", "Stripe", "AWS", "Docker", "TypeScript", "Redis",
  ],
};

// Architecture steps per project
const architectures: Record<string, { de: string[]; en: string[]; ar: string[]; tr: string[] }> = {
  "austrian-ecommerce-platform": {
    de: [
      "Next.js Frontend + B2B Kundenportal",
      "Node.js Backend API",
      "PostgreSQL Datenbank + Inventar-Sync",
      "Stripe Zahlungsabwicklung",
      "Automatische Rechnungsgenerierung",
      "AWS Hosting + CDN",
    ],
    en: [
      "Next.js Frontend + B2B Customer Portal",
      "Node.js Backend API",
      "PostgreSQL Database + Inventory Sync",
      "Stripe Payment Processing",
      "Automatic Invoice Generation",
      "AWS Hosting + CDN",
    ],
    ar: [
      "Next.js Frontend + بوابة عملاء B2B",
      "Node.js Backend API",
      "PostgreSQL + مزامنة المخزون",
      "معالجة مدفوعات Stripe",
      "توليد فواتير تلقائي",
      "AWS Hosting + CDN",
    ],
    tr: [
      "Next.js Frontend + B2B Müşteri Portalı",
      "Node.js Backend API",
      "PostgreSQL + Envanter Senkronizasyonu",
      "Stripe Ödeme İşleme",
      "Otomatik Fatura Oluşturma",
      "AWS Hosting + CDN",
    ],
  },
  "german-automation-crm": {
    de: [
      "CRM System Integration (HubSpot)",
      "n8n Workflow-Automatisierung",
      "Automatische Lead-Qualifizierung",
      "E-Mail-Sequenz-Engine",
      "Echtzeit Reporting Dashboard",
      "Webhook-basierte Synchronisation",
    ],
    en: [
      "CRM System Integration (HubSpot)",
      "n8n Workflow Automation",
      "Automatic Lead Qualification",
      "Email Sequence Engine",
      "Real-time Reporting Dashboard",
      "Webhook-based Synchronization",
    ],
    ar: [
      "تكامل نظام CRM (HubSpot)",
      "أتمتة سير العمل n8n",
      "تأهيل تلقائي للعملاء المحتملين",
      "محرك تسلسل البريد الإلكتروني",
      "لوحة تقارير في الوقت الفعلي",
      "مزامنة قائمة على Webhook",
    ],
    tr: [
      "CRM Sistem Entegrasyonu (HubSpot)",
      "n8n İş Akışı Otomasyonu",
      "Otomatik Potansiyel Müşteri Nitelendirmesi",
      "E-posta Dizi Motoru",
      "Gerçek Zamanlı Raporlama Panosu",
      "Webhook Tabanlı Senkronizasyon",
    ],
  },
  "saas-platform-startup": {
    de: [
      "Next.js Multi-Tenant Frontend",
      "Node.js REST API",
      "PostgreSQL + Row-Level Security",
      "Stripe Subscription Billing",
      "AWS ECS + RDS Infrastruktur",
      "Redis Cache Layer",
    ],
    en: [
      "Next.js Multi-Tenant Frontend",
      "Node.js REST API",
      "PostgreSQL + Row-Level Security",
      "Stripe Subscription Billing",
      "AWS ECS + RDS Infrastructure",
      "Redis Cache Layer",
    ],
    ar: [
      "Next.js Frontend متعدد المستأجرين",
      "Node.js REST API",
      "PostgreSQL + أمان على مستوى الصف",
      "Stripe Subscription Billing",
      "AWS ECS + RDS البنية التحتية",
      "طبقة Redis Cache",
    ],
    tr: [
      "Next.js Çok Kiracılı Frontend",
      "Node.js REST API",
      "PostgreSQL + Satır Düzeyi Güvenlik",
      "Stripe Abonelik Faturalandırması",
      "AWS ECS + RDS Altyapısı",
      "Redis Önbellek Katmanı",
    ],
  },
};

// Key metrics per project
const metrics: Record<string, { value: string; label: Record<string, string> }[]> = {
  "austrian-ecommerce-platform": [
    { value: "−80%", label: { de: "Manuelle Arbeit", en: "Manual Work", ar: "العمل اليدوي", tr: "Manuel İş" } },
    { value: "<0.5%", label: { de: "Fehlerquote", en: "Error Rate", ar: "معدل الخطأ", tr: "Hata Oranı" } },
    { value: "24/7", label: { de: "Verfügbarkeit", en: "Availability", ar: "التوفر", tr: "Kullanılabilirlik" } },
  ],
  "german-automation-crm": [
    { value: "3h", label: { de: "Tägl. Zeitersparnis", en: "Daily Time Saved", ar: "وفورات الوقت اليومية", tr: "Günlük Tasarruf" } },
    { value: "−96%", label: { de: "Antwortzeit", en: "Response Time", ar: "وقت الاستجابة", tr: "Yanıt Süresi" } },
    { value: "+23%", label: { de: "Conversion Rate", en: "Conversion Rate", ar: "معدل التحويل", tr: "Dönüşüm Oranı" } },
  ],
  "saas-platform-startup": [
    { value: "8W", label: { de: "Zeit bis Launch", en: "Time to Launch", ar: "الوقت حتى الإطلاق", tr: "Lansmana Süre" } },
    { value: "50+", label: { de: "Kunden (Monat 1)", en: "Clients (Month 1)", ar: "العملاء (الشهر 1)", tr: "Müşteriler (Ay 1)" } },
    { value: "99.9%", label: { de: "Uptime", en: "Uptime", ar: "وقت التشغيل", tr: "Çalışma Süresi" } },
  ],
};

const categoryLabels: Record<string, Record<string, string>> = {
  "ecommerce-systems": { de: "E-Commerce Systeme", en: "E-Commerce Systems", ar: "أنظمة التجارة الإلكترونية", tr: "E-Ticaret Sistemleri" },
  "automation-ai": { de: "Automatisierung & KI", en: "Automation & AI", ar: "الأتمتة والذكاء الاصطناعي", tr: "Otomasyon & Yapay Zeka" },
  "digital-infrastructure": { de: "Digitale Infrastruktur", en: "Digital Infrastructure", ar: "البنية التحتية الرقمية", tr: "Dijital Altyapı" },
};

const sectionLabels = {
  challenge: { de: "Herausforderung", en: "Challenge", ar: "التحدي", tr: "Zorluk" },
  solution: { de: "Lösung", en: "Solution", ar: "الحل", tr: "Çözüm" },
  architecture: { de: "Technische Architektur", en: "Technical Architecture", ar: "البنية التقنية", tr: "Teknik Mimari" },
  results: { de: "Projektergebnisse", en: "Project Results", ar: "نتائج المشروع", tr: "Proje Sonuçları" },
  techStack: { de: "Technologie-Stack", en: "Technology Stack", ar: "مكدس التكنولوجيا", tr: "Teknoloji Yığını" },
  backLabel: { de: "Zurück zu Projekten", en: "Back to Projects", ar: "العودة إلى المشاريع", tr: "Projelere Geri Dön" },
  nextStep: { de: "Bereit für den nächsten Schritt?", en: "Ready for the next step?", ar: "مستعد للخطوة التالية؟", tr: "Bir sonraki adıma hazır mısınız?" },
};

export function generateStaticParams() {
  return projectsData.map((p) => ({ slug: p.id }));
}

export default async function ProjectDetailPage({ params }: ProjectDetailPageProps) {
  const { locale, slug } = await params;
  const validLocale = (["de", "en", "ar", "tr"].includes(locale) ? locale : "de") as Locale;

  const project = projectsData.find((p) => p.id === slug);
  if (!project) notFound();

  const data = project[validLocale] ?? project.de;
  const stack = techStacks[project.id] ?? [];
  const arch = architectures[project.id]?.[validLocale] ?? architectures[project.id]?.de ?? [];
  const projectMetrics = metrics[project.id] ?? [];
  const catLabel = categoryLabels[project.category]?.[validLocale] ?? project.category;
  const sl = (key: keyof typeof sectionLabels) => sectionLabels[key][validLocale] ?? sectionLabels[key].de;

  // Related projects
  const related = projectsData.filter((p) => p.id !== project.id).slice(0, 2);

  return (
    <>
      {/* Hero */}
      <section className="bg-navy py-16 lg:py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-blueprint opacity-20 pointer-events-none" />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gold/30" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Back link */}
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 font-mono text-xs text-white/50 hover:text-gold transition-colors mb-8 rtl:flex-row-reverse"
          >
            <ArrowLeft size={12} className="rtl:rotate-180" />
            {sl("backLabel")}
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
            {/* Left: title + meta */}
            <div className="lg:col-span-2">
              <SectionLabel light className="mb-5">
                {catLabel}
              </SectionLabel>
              <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-800 text-white leading-tight tracking-tight-eng mb-6">
                {data.title}
              </h1>
              <p className="font-body text-base text-white/60 leading-relaxed max-w-2xl">
                {data.description}
              </p>
            </div>

            {/* Right: meta card */}
            <div className="bg-white/5 border border-white/10 p-6 space-y-5">
              <div>
                <p className="font-mono text-[10px] text-gold uppercase tracking-widest mb-1">
                  {validLocale === "de" ? "Kunde" : validLocale === "tr" ? "Müşteri" : validLocale === "ar" ? "العميل" : "Client"}
                </p>
                <p className="font-body text-sm text-white">{data.client}</p>
              </div>
              <div className="flex items-center gap-2">
                <MapPin size={12} className="text-gold" />
                <p className="font-body text-sm text-white/70">{data.region}</p>
              </div>
              <div>
                <p className="font-mono text-[10px] text-gold uppercase tracking-widest mb-1">
                  {validLocale === "de" ? "Investition" : validLocale === "tr" ? "Yatırım" : validLocale === "ar" ? "الاستثمار" : "Investment"}
                </p>
                <p className="font-mono text-sm text-white">{project.budget}</p>
              </div>
              <div>
                <p className="font-mono text-[10px] text-gold uppercase tracking-widest mb-1">
                  {validLocale === "de" ? "Jahr" : validLocale === "tr" ? "Yıl" : validLocale === "ar" ? "السنة" : "Year"}
                </p>
                <p className="font-mono text-sm text-white">{project.year}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Challenge + Solution */}
      <section className="py-16 lg:py-24 bg-offwhite">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
            {/* Challenge */}
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-8 bg-navy/10 border border-navy/20 flex items-center justify-center flex-shrink-0">
                  <Layers size={14} className="text-navy" />
                </div>
                <h2 className="font-mono text-xs text-smoke uppercase tracking-widest">
                  {sl("challenge")}
                </h2>
              </div>
              <div className="border-l-4 border-gold/40 pl-6">
                <p className="font-body text-base text-charcoal leading-relaxed">
                  {data.challenge}
                </p>
              </div>
            </div>

            {/* Solution */}
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-8 bg-navy/10 border border-navy/20 flex items-center justify-center flex-shrink-0">
                  <Server size={14} className="text-navy" />
                </div>
                <h2 className="font-mono text-xs text-smoke uppercase tracking-widest">
                  {sl("solution")}
                </h2>
              </div>
              <div className="border-l-4 border-gold pl-6">
                <p className="font-body text-base text-charcoal leading-relaxed">
                  {data.solution}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Architecture */}
      <section className="py-16 lg:py-20 bg-frost border-y border-border-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-xl mb-10">
            <SectionLabel className="mb-4">{sl("architecture")}</SectionLabel>
            <h2 className="font-display text-2xl sm:text-3xl font-800 text-navy tracking-tight">
              {sl("architecture")}
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-0 border border-border-light">
            {arch.map((layer, i) => (
              <div
                key={i}
                className={[
                  "bg-white p-6 border-border-light",
                  i % 3 !== 2 ? "border-r" : "",
                  i < arch.length - 3 ? "border-b" : "",
                  i >= arch.length - (arch.length % 3 || 3) ? "lg:border-b-0" : "",
                ].join(" ")}
              >
                <div className="flex items-start gap-3">
                  <span className="font-mono text-[10px] text-gold mt-0.5 flex-shrink-0">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <p className="font-body text-sm text-charcoal leading-snug">{layer}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Tech stack badges */}
          <div className="mt-10">
            <p className="font-mono text-[11px] text-gold uppercase tracking-widest mb-4">
              {sl("techStack")}
            </p>
            <div className="flex flex-wrap gap-2">
              {stack.map((tech) => (
                <span
                  key={tech}
                  className="font-mono text-xs text-navy bg-white border border-border-light px-3 py-1.5"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Results */}
      <section className="py-16 lg:py-20 bg-navy relative overflow-hidden">
        <div className="absolute inset-0 bg-blueprint opacity-20 pointer-events-none" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-xl mb-12">
            <SectionLabel light className="mb-4">
              {sl("results")}
            </SectionLabel>
            <h2 className="font-display text-2xl sm:text-3xl font-800 text-white tracking-tight">
              {sl("results")}
            </h2>
          </div>

          {/* Big metrics */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-0 border border-white/10 mb-10">
            {projectMetrics.map((m, i) => (
              <div
                key={i}
                className={[
                  "p-8 border-white/10",
                  i < projectMetrics.length - 1 ? "border-b sm:border-b-0 sm:border-r" : "",
                ].join(" ")}
              >
                <div className="font-display text-4xl sm:text-5xl font-800 text-gold leading-none tracking-tight mb-3">
                  {m.value}
                </div>
                <p className="font-mono text-xs text-white/50 uppercase tracking-widest">
                  {m.label[validLocale] ?? m.label.de}
                </p>
              </div>
            ))}
          </div>

          {/* Result bullets */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {data.results.map((result, i) => (
              <div key={i} className="flex items-start gap-3">
                <CheckCircle2 size={16} className="text-gold flex-shrink-0 mt-0.5" />
                <p className="font-body text-sm text-white/80 leading-snug">{result}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Related projects */}
      {related.length > 0 && (
        <section className="py-16 lg:py-20 bg-offwhite">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center gap-4 mb-10">
              <p className="font-mono text-[11px] text-gold uppercase tracking-widest">
                {validLocale === "de" ? "Weitere Projekte" : validLocale === "tr" ? "Diğer Projeler" : validLocale === "ar" ? "مشاريع أخرى" : "More Projects"}
              </p>
              <div className="h-px flex-1 bg-border-light" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {related.map((rel) => {
                const relData = rel[validLocale] ?? rel.de;
                return (
                  <Link
                    key={rel.id}
                    href={`/projects/${rel.id}`}
                    className="group bg-white border border-border-light hover:border-navy hover:shadow-technical transition-all duration-300 p-8 flex flex-col gap-4"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-[10px] text-gold uppercase tracking-widest">
                        {categoryLabels[rel.category]?.[validLocale] ?? rel.category}
                      </span>
                      <TrendingUp size={14} className="text-smoke group-hover:text-gold transition-colors" />
                    </div>
                    <h3 className="font-display text-base font-700 text-navy tracking-tight">
                      {relData.title}
                    </h3>
                    <p className="font-body text-sm text-smoke leading-relaxed line-clamp-2">
                      {relData.description}
                    </p>
                    <div className="flex items-center gap-2 font-mono text-xs text-navy group-hover:text-steel transition-colors mt-auto">
                      <span>{validLocale === "de" ? "Ansehen" : validLocale === "tr" ? "İncele" : validLocale === "ar" ? "عرض" : "View"}</span>
                      <ArrowRight size={12} className="transition-transform group-hover:translate-x-0.5 rtl:rotate-180" />
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>
      )}

      <CTASection />
    </>
  );
}
