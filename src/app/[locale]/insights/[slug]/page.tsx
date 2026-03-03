import { notFound } from "next/navigation";
import { Link } from "@/i18n/navigation";
import SectionLabel from "@/components/ui/SectionLabel";
import CTASection from "@/components/sections/CTASection";
import { ArrowLeft, Clock, Calendar, ArrowRight, User } from "lucide-react";

type Locale = "de" | "en" | "ar" | "tr";

interface ArticleDetailPageProps {
  params: Promise<{ locale: string; slug: string }>;
}

// Full article content
const articles = [
  {
    id: "automation-roi",
    category: "automation-ai",
    readTime: "5 min",
    date: "2024-11-15",
    author: { name: "Thomas Müller", role: { de: "Technischer Partner", en: "Technical Partner", ar: "الشريك التقني", tr: "Teknik Ortak" } },
    de: {
      category: "Automatisierung & KI",
      title: "Wie viel Zeit spart Automatisierung wirklich?",
      excerpt: "Wir haben 12 Automatisierungsprojekte analysiert und konkrete Zahlen zusammengefasst.",
      intro: "Die Frage, die wir von Unternehmern am häufigsten hören, lautet: 'Lohnt sich Automatisierung für mein Unternehmen?' Unsere Antwort ist immer dieselbe: Es kommt darauf an — aber in den meisten Fällen ja, und zwar deutlicher als erwartet.",
      sections: [
        {
          heading: "Die Zahlen aus 12 realen Projekten",
          body: "Über das letzte Jahr haben wir 12 Automatisierungsprojekte für Unternehmen weltweit umgesetzt — von einfachen E-Mail-Automatisierungen bis zu komplexen ERP-Integrationen. Die Ergebnisse haben uns selbst überrascht.",
        },
        {
          heading: "Was lässt sich automatisieren?",
          body: "In jedem Unternehmen gibt es drei Kategorien von wiederkehrenden Aufgaben: Datenübertragung zwischen Systemen (z.B. CRM → ERP), Kommunikation mit definierten Trigger-Events (z.B. Follow-up E-Mails nach 3 Tagen ohne Antwort), und Reportings und Zusammenfassungen die regelmäßig erstellt werden müssen. Diese drei Kategorien machen in den meisten Unternehmen 30–50% der täglichen manuellen Arbeit aus.",
        },
        {
          heading: "Warum die Investition sich lohnt",
          body: "Bei einem typischen Projekt mit Kosten von EUR 6.000–8.000 amortisiert sich die Investition in der Regel innerhalb von 3–6 Monaten — allein durch eingesparte Arbeitszeit. Hinzu kommen qualitative Verbesserungen: weniger Fehler, schnellere Reaktionszeiten, und Mitarbeiter, die sich auf Aufgaben konzentrieren können, bei denen menschliches Urteilsvermögen tatsächlich gebraucht wird.",
        },
        {
          heading: "Fazit",
          body: "Automatisierung ist kein Luxus für große Konzerne. Es ist ein pragmatisches Werkzeug für Unternehmen, die ihre Ressourcen sinnvoll einsetzen wollen. Der erste Schritt ist eine ehrliche Analyse: Welche Prozesse kosten uns am meisten Zeit? Genau dabei helfen wir — ohne Verpflichtung.",
        },
      ],
      quote: { text: "Nach der CRM-Automatisierung haben wir sofort 3 Stunden pro Tag zurückgewonnen. Ich wünschte, wir hätten früher angefangen.", attribution: "– Vertriebsleiter, Beratungsunternehmen München" },
      codeBlock: {
        label: "Beispiel: n8n Workflow-Trigger",
        code: `// Automatischer Follow-up nach 48h ohne Antwort
{
  "trigger": "schedule",
  "condition": "no_reply_48h",
  "action": {
    "type": "send_email",
    "template": "followup_v2",
    "personalisation": true
  }
}`,
      },
    },
    en: {
      category: "Automation & AI",
      title: "How much time does automation really save?",
      excerpt: "We analyzed 12 automation projects and compiled concrete numbers.",
      intro: "The question we hear most from entrepreneurs is: 'Is automation worth it for my business?' Our answer is always the same: It depends — but in most cases yes, and more clearly than expected.",
      sections: [
        {
          heading: "Numbers from 12 real projects",
          body: "Over the past year, we implemented 12 automation projects for companies worldwide — from simple email automations to complex ERP integrations. The results surprised even us.",
        },
        {
          heading: "What can be automated?",
          body: "In every company there are three categories of recurring tasks: Data transfer between systems (e.g. CRM → ERP), communication with defined trigger events (e.g. follow-up emails after 3 days without reply), and reports and summaries that must be created regularly. These three categories account for 30–50% of daily manual work in most businesses.",
        },
        {
          heading: "Why the investment pays off",
          body: "For a typical project costing EUR 6,000–8,000, the investment usually pays for itself within 3–6 months — through saved working time alone. Add qualitative improvements: fewer errors, faster response times, and employees who can focus on tasks where human judgment is actually needed.",
        },
        {
          heading: "Conclusion",
          body: "Automation is not a luxury for large corporations. It is a pragmatic tool for businesses that want to use their resources wisely. The first step is an honest analysis: which processes cost us the most time? That is exactly what we help with — without obligation.",
        },
      ],
      quote: { text: "After CRM automation we immediately recovered 3 hours per day. I wish we had started sooner.", attribution: "– Sales Manager, Munich Consulting Firm" },
      codeBlock: {
        label: "Example: n8n Workflow Trigger",
        code: `// Automatic follow-up after 48h without reply
{
  "trigger": "schedule",
  "condition": "no_reply_48h",
  "action": {
    "type": "send_email",
    "template": "followup_v2",
    "personalisation": true
  }
}`,
      },
    },
    ar: {
      category: "الأتمتة والذكاء الاصطناعي",
      title: "كم من الوقت توفر الأتمتة حقاً؟",
      excerpt: "حللنا 12 مشروع أتمتة وجمعنا أرقاماً ملموسة.",
      intro: "السؤال الذي نسمعه أكثر من رواد الأعمال هو: 'هل الأتمتة مجدية لعملي؟' إجابتنا دائماً: يعتمد — لكن في معظم الحالات نعم، وبشكل أوضح مما هو متوقع.",
      sections: [
        { heading: "أرقام من 12 مشروعاً حقيقياً", body: "خلال العام الماضي، نفذنا 12 مشروع أتمتة لشركات حول العالم — من أتمتة البريد الإلكتروني البسيطة إلى تكاملات ERP المعقدة." },
        { heading: "ما الذي يمكن أتمتته؟", body: "في كل شركة توجد ثلاث فئات من المهام المتكررة: نقل البيانات بين الأنظمة، والتواصل مع أحداث محددة، والتقارير الدورية. هذه الفئات تمثل 30-50% من العمل اليدوي اليومي." },
        { heading: "لماذا يستحق الاستثمار؟", body: "لمشروع نموذجي بتكلفة 6,000-8,000 يورو، يؤتي الاستثمار ثماره في غضون 3-6 أشهر من خلال توفير وقت العمل." },
        { heading: "الخلاصة", body: "الأتمتة ليست رفاهية للشركات الكبيرة. إنها أداة عملية لأي شركة تريد استخدام مواردها بحكمة." },
      ],
      quote: { text: "بعد أتمتة CRM، استرجعنا 3 ساعات يومياً فوراً. أتمنى لو بدأنا في وقت سابق.", attribution: "– مدير مبيعات، شركة استشارات في ميونخ" },
      codeBlock: { label: "مثال: n8n Workflow Trigger", code: `// متابعة تلقائية بعد 48 ساعة\n{ "trigger": "no_reply_48h" }` },
    },
    tr: {
      category: "Otomasyon & Yapay Zeka",
      title: "Otomasyon gerçekten ne kadar zaman kazandırır?",
      excerpt: "12 otomasyon projesini analiz ettik ve somut rakamlar derledik.",
      intro: "Girişimcilerden en çok duyduğumuz soru şudur: 'Otomasyon işletmem için mantıklı mı?' Cevabımız her zaman aynı: Duruma göre değişir — ama çoğu durumda evet, beklenenden çok daha belirgin şekilde.",
      sections: [
        { heading: "12 gerçek projeden rakamlar", body: "Geçen yıl dünya genelindeki şirketler için 12 otomasyon projesi uyguladık — basit e-posta otomasyonlarından karmaşık ERP entegrasyonlarına kadar." },
        { heading: "Ne otomatikleştirilebilir?", body: "Her şirkette tekrarlayan görevlerin üç kategorisi vardır: Sistemler arası veri transferi, tanımlanmış tetikleyici olaylarla iletişim ve düzenli olarak oluşturulması gereken raporlar. Bu kategoriler çoğu işletmede günlük manuel çalışmanın %30-50'sini oluşturur." },
        { heading: "Yatırım neden karşılığını verir?", body: "6.000-8.000 Euro maliyetli tipik bir proje için yatırım genellikle 3-6 ay içinde kendini geri öder — yalnızca tasarruf edilen çalışma süresi sayesinde." },
        { heading: "Sonuç", body: "Otomasyon büyük şirketler için bir lüks değil. Kaynakları akıllıca kullanmak isteyen işletmeler için pragmatik bir araçtır." },
      ],
      quote: { text: "CRM otomasyonundan sonra hemen günde 3 saat geri kazandık. Keşke daha önce başlasaydık.", attribution: "– Satış Müdürü, Münih Danışmanlık Firması" },
      codeBlock: { label: "Örnek: n8n Workflow Tetikleyici", code: `// 48 saat sonra otomatik takip\n{ "trigger": "no_reply_48h" }` },
    },
  },
  {
    id: "ecommerce-b2b",
    category: "ecommerce-systems",
    readTime: "7 min",
    date: "2024-10-20",
    author: { name: "Thomas Müller", role: { de: "Technischer Partner", en: "Technical Partner", ar: "الشريك التقني", tr: "Teknik Ortak" } },
    de: {
      category: "E-Commerce Systeme",
      title: "B2B E-Commerce: 5 Fehler, die österreichische Händler vermeiden sollten",
      excerpt: "Zu viele B2B-Händler setzen auf Standardlösungen, die nicht zu ihren Prozessen passen.",
      intro: "B2B E-Commerce unterscheidet sich grundlegend von B2C. Während ein B2C-Shop Impulskäufe und einfache Transaktionen bedient, muss ein B2B-System komplexe Preisstaffeln, Kundenportale, Genehmigungsworkflows und ERP-Integrationen abbilden. Genau hier scheitern viele Standard-Lösungen.",
      sections: [
        { heading: "Fehler 1: Standard-B2C-Plattform für B2B-Bedürfnisse", body: "Shopify und WooCommerce sind exzellente Tools für B2C — aber für B2B oft ungeeignet. Individuelle Preise pro Kunde, Mindestbestellmengen, Zahlungsziel 30/60/90 Tage: Das lässt sich mit Standard-Plugins kaum sauber abbilden." },
        { heading: "Fehler 2: Keine ERP-Integration", body: "Ein Online-Shop, der nicht mit dem Lagerverwaltungssystem kommuniziert, ist eine Zeitbombe. Überverkäufe, falsche Lagerbestände, manuelle Nacharbeit — das kostet mehr, als es einspart." },
        { heading: "Fehler 3: Zu komplex für den Kunden", body: "B2B-Käufer sind Profis — aber sie haben keine Zeit für komplizierte Bestellprozesse. Jeder Klick zu viel ist ein Klick weniger auf 'Bestellen'. Einfachheit ist eine technische Leistung." },
        { heading: "Fehler 4: Keine Automatisierung der Nachbestellungen", body: "Stammkunden mit vorhersehbaren Bestellzyklen sind das Gold im B2B. Ein gutes System erkennt Muster und erinnert aktiv — oder bietet Abo-Bestellungen an." },
        { heading: "Fehler 5: Security als Nachgedanke", body: "B2B-Portale enthalten Preislisten, Konditionen und Kundenhistorien — sensible Daten. Rollenbasierte Zugriffskontrolle, verschlüsselte Verbindungen und regelmäßige Audits sind Pflicht." },
      ],
      quote: { text: "Wir dachten, wir brauchen nur einen Shop. Was wir wirklich brauchten, war ein System — das hat Taktral uns klar gemacht.", attribution: "– Geschäftsführer, Großhändler Wien" },
      codeBlock: { label: "B2B-spezifische Preislogik (Beispiel)", code: `// Kundenspezifische Preise
const getPrice = (productId: string, customerId: string) => {
  const agreement = getPriceAgreement(customerId, productId);
  return agreement?.price ?? getStandardPrice(productId);
};` },
    },
    en: {
      category: "E-Commerce Systems",
      title: "B2B E-Commerce: 5 mistakes Austrian traders should avoid",
      excerpt: "Too many B2B traders rely on standard solutions that don't fit their processes.",
      intro: "B2B e-commerce differs fundamentally from B2C. While a B2C shop serves impulse purchases and simple transactions, a B2B system must map complex pricing tiers, customer portals, approval workflows, and ERP integrations. This is exactly where many standard solutions fail.",
      sections: [
        { heading: "Mistake 1: Standard B2C platform for B2B needs", body: "Shopify and WooCommerce are excellent tools for B2C — but often unsuitable for B2B. Individual prices per customer, minimum order quantities, payment terms 30/60/90 days: these are hard to map cleanly with standard plugins." },
        { heading: "Mistake 2: No ERP integration", body: "An online shop that doesn't communicate with the inventory management system is a time bomb. Overselling, wrong stock levels, manual rework — this costs more than it saves." },
        { heading: "Mistake 3: Too complex for the customer", body: "B2B buyers are professionals — but they have no time for complicated ordering processes. Every extra click is one click less on 'Order'. Simplicity is a technical achievement." },
        { heading: "Mistake 4: No automation of repeat orders", body: "Regular customers with predictable order cycles are gold in B2B. A good system recognizes patterns and actively reminds — or offers subscription orders." },
        { heading: "Mistake 5: Security as an afterthought", body: "B2B portals contain price lists, terms, and customer histories — sensitive data. Role-based access control, encrypted connections, and regular audits are mandatory." },
      ],
      quote: { text: "We thought we just needed a shop. What we really needed was a system — Taktral made that clear to us.", attribution: "– Managing Director, Vienna Wholesaler" },
      codeBlock: { label: "B2B-specific pricing logic (example)", code: `// Customer-specific pricing
const getPrice = (productId: string, customerId: string) => {
  const agreement = getPriceAgreement(customerId, productId);
  return agreement?.price ?? getStandardPrice(productId);
};` },
    },
    ar: {
      category: "أنظمة التجارة الإلكترونية",
      title: "التجارة الإلكترونية B2B: 5 أخطاء يجب تجنبها",
      excerpt: "الكثير من تجار B2B يعتمدون على حلول قياسية لا تناسب عملياتهم.",
      intro: "تختلف تجارة B2B الإلكترونية جوهرياً عن B2C. حيث يجب أن يعكس نظام B2B هياكل أسعار معقدة وبوابات عملاء وتكاملات ERP.",
      sections: [
        { heading: "الخطأ 1: منصة B2C قياسية لاحتياجات B2B", body: "Shopify و WooCommerce ممتازان لـ B2C لكنهما غير مناسبين في كثير من الأحيان لـ B2B." },
        { heading: "الخطأ 2: عدم التكامل مع ERP", body: "متجر إلكتروني لا يتواصل مع نظام إدارة المخزون يمثل خطراً." },
        { heading: "الخطأ 3: تعقيد مفرط للمستخدم", body: "مشترو B2B محترفون لكنهم لا يملكون وقتاً لعمليات طلب معقدة." },
        { heading: "الخطأ 4: عدم أتمتة إعادة الطلبات", body: "العملاء المنتظمون بدورات طلب يمكن التنبؤ بها ذهب في B2B." },
        { heading: "الخطأ 5: الأمان كفكرة لاحقة", body: "بوابات B2B تحتوي بيانات حساسة تتطلب ضوابط صارمة." },
      ],
      quote: { text: "اعتقدنا أننا نحتاج فقط إلى متجر. ما احتجناه فعلاً كان نظاماً.", attribution: "– المدير التنفيذي، تاجر جملة فيينا" },
      codeBlock: { label: "منطق التسعير الخاص بـ B2B", code: `// أسعار خاصة بالعميل\nconst getPrice = (productId, customerId) => {\n  return getPriceAgreement(customerId, productId);\n};` },
    },
    tr: {
      category: "E-Ticaret Sistemleri",
      title: "B2B E-Ticaret: Avusturyalı Tüccarların Kaçınması Gereken 5 Hata",
      excerpt: "Çok fazla B2B tüccarı, süreçlerine uymayan standart çözümlere güveniyor.",
      intro: "B2B e-ticaret, B2C'den temelden farklıdır. B2B sistemi karmaşık fiyatlandırma katmanlarını, müşteri portallarını ve ERP entegrasyonlarını yansıtmalıdır.",
      sections: [
        { heading: "Hata 1: B2B ihtiyaçları için standart B2C platformu", body: "Shopify ve WooCommerce B2C için mükemmel — ama B2B için çoğu zaman uygun değil." },
        { heading: "Hata 2: ERP entegrasyonu yok", body: "Stok yönetim sistemiyle iletişim kurmayan bir online mağaza zaman bombası." },
        { heading: "Hata 3: Müşteri için çok karmaşık", body: "B2B alıcılar profesyoneldir — ama karmaşık sipariş süreçleri için zamanları yoktur." },
        { heading: "Hata 4: Yeniden sipariş otomasyonu yok", body: "Tahmin edilebilir sipariş döngüleriyle düzenli müşteriler B2B'de altın değerindedir." },
        { heading: "Hata 5: Sonradan düşünülen güvenlik", body: "B2B portalları hassas veriler içerir ve sıkı kontrollar gerektirir." },
      ],
      quote: { text: "Sadece bir mağazaya ihtiyacımız olduğunu sanıyorduk. Gerçekte bir sisteme ihtiyacımız vardı.", attribution: "– Genel Müdür, Viyana Toptancısı" },
      codeBlock: { label: "B2B'ye özel fiyatlandırma mantığı", code: `// Müşteriye özel fiyatlandırma\nconst getPrice = (productId, customerId) => {\n  return getPriceAgreement(customerId, productId);\n};` },
    },
  },
  {
    id: "nextjs-enterprise",
    category: "digital-infrastructure",
    readTime: "10 min",
    date: "2024-09-05",
    author: { name: "Thomas Müller", role: { de: "Technischer Partner", en: "Technical Partner", ar: "الشريك التقني", tr: "Teknik Ortak" } },
    de: {
      category: "Digitale Infrastruktur",
      title: "Warum Next.js die beste Wahl für Enterprise-Anwendungen ist",
      excerpt: "Next.js ist nicht nur für Marketing-Websites.",
      intro: "Der Name 'Next.js' klingt für viele Entscheider nach einem Werkzeug für Start-ups und Marketing-Websites. Falsch. Next.js ist heute eine der robustesten Plattformen für komplexe Unternehmensanwendungen — und wir setzen es für genau das ein.",
      sections: [
        { heading: "Was Enterprise-Anwendungen brauchen", body: "Enterprise-Apps haben andere Anforderungen als Marketing-Sites: Tausende simultane Nutzer, rollenbasierte Zugriffskontrolle, komplexe Datenstrukturen, Compliance-Anforderungen, Integration mit Legacy-Systemen. Next.js erfüllt diese Anforderungen." },
        { heading: "Server-Side Rendering als Sicherheitsvorteil", body: "Sensible Daten werden auf dem Server verarbeitet und nur das Nötigste an den Client übertragen. Kein API-Key im Frontend, keine sensitive Business-Logik im Browser." },
        { heading: "Die App Router Architektur", body: "Mit dem App Router (seit Next.js 13) lassen sich komplexe Layout-Hierarchien, Server-Komponenten und Streaming elegant abbilden — Patterns, die für Enterprise-UIs entscheidend sind." },
        { heading: "Unser Stack für Enterprise-Projekte", body: "Next.js Frontend, Node.js/Express Backend, PostgreSQL mit Row-Level Security, Redis für Session-Management, Docker für Deployment, AWS für Hosting. Diese Kombination ist battle-tested und skalierbar." },
      ],
      quote: { text: "Wir haben das System von 50 auf 5.000 Nutzer skaliert — ohne die Architektur anzufassen. Das ist Next.js.", attribution: "– CTO, SaaS Startup Wien" },
      codeBlock: { label: "Server Component mit Datenbankzugriff", code: `// Direkt auf DB zugreifen — kein API-Overhead
export default async function Dashboard() {
  const projects = await db.query(
    'SELECT * FROM projects WHERE tenant_id = $1',
    [session.tenantId]
  );
  return <ProjectList projects={projects} />;
}` },
    },
    en: {
      category: "Digital Infrastructure",
      title: "Why Next.js is the best choice for enterprise applications",
      excerpt: "Next.js is not just for marketing websites.",
      intro: "The name 'Next.js' sounds to many decision-makers like a tool for startups and marketing websites. Wrong. Next.js is today one of the most robust platforms for complex enterprise applications — and we use it for exactly that.",
      sections: [
        { heading: "What enterprise applications need", body: "Enterprise apps have different requirements than marketing sites: thousands of simultaneous users, role-based access control, complex data structures, compliance requirements, integration with legacy systems. Next.js meets these requirements." },
        { heading: "Server-side rendering as a security advantage", body: "Sensitive data is processed on the server and only the minimum is transferred to the client. No API key in the frontend, no sensitive business logic in the browser." },
        { heading: "The App Router architecture", body: "With the App Router (since Next.js 13), complex layout hierarchies, server components, and streaming can be elegantly mapped — patterns that are crucial for enterprise UIs." },
        { heading: "Our stack for enterprise projects", body: "Next.js frontend, Node.js/Express backend, PostgreSQL with row-level security, Redis for session management, Docker for deployment, AWS for hosting. This combination is battle-tested and scalable." },
      ],
      quote: { text: "We scaled the system from 50 to 5,000 users — without touching the architecture. That's Next.js.", attribution: "– CTO, SaaS Startup Vienna" },
      codeBlock: { label: "Server Component with database access", code: `// Direct DB access — no API overhead
export default async function Dashboard() {
  const projects = await db.query(
    'SELECT * FROM projects WHERE tenant_id = $1',
    [session.tenantId]
  );
  return <ProjectList projects={projects} />;
}` },
    },
    ar: {
      category: "البنية التحتية الرقمية",
      title: "لماذا Next.js هو الخيار الأفضل لتطبيقات المؤسسات؟",
      excerpt: "Next.js ليس فقط لمواقع التسويق.",
      intro: "اسم 'Next.js' يبدو لكثير من صانعي القرار كأداة للشركات الناشئة ومواقع التسويق. هذا خطأ. Next.js هو اليوم أحد أقوى المنصات للتطبيقات المؤسسية المعقدة.",
      sections: [
        { heading: "ما تحتاجه تطبيقات المؤسسات", body: "تطبيقات المؤسسات لها متطلبات مختلفة: آلاف المستخدمين المتزامنين، والتحكم في الوصول القائم على الأدوار، وهياكل البيانات المعقدة. Next.js يلبي هذه المتطلبات." },
        { heading: "التقديم من جانب الخادم كميزة أمنية", body: "البيانات الحساسة تعالج على الخادم وينقل الحد الأدنى فقط إلى العميل." },
        { heading: "بنية App Router", body: "مع App Router، يمكن تعيين تسلسلات تخطيط معقدة ومكونات الخادم والبث بأناقة." },
        { heading: "مكدسنا لمشاريع المؤسسات", body: "Next.js, Node.js, PostgreSQL, Redis, Docker, AWS - هذا المزيج مُختبر ومقياسي." },
      ],
      quote: { text: "قمنا بتوسيع النظام من 50 إلى 5000 مستخدم - دون المساس بالبنية.", attribution: "– CTO، شركة SaaS ناشئة في فيينا" },
      codeBlock: { label: "مكون خادم مع الوصول إلى قاعدة البيانات", code: `export default async function Dashboard() {\n  const projects = await db.query('SELECT * FROM projects WHERE tenant_id = $1', [session.tenantId]);\n  return <ProjectList projects={projects} />;\n}` },
    },
    tr: {
      category: "Dijital Altyapı",
      title: "Next.js'in kurumsal uygulamalar için neden en iyi seçim olduğu",
      excerpt: "Next.js sadece pazarlama siteleri için değil.",
      intro: "'Next.js' adı pek çok karar vericiye girişimler ve pazarlama siteleri için bir araç gibi geliyor. Yanlış. Next.js bugün karmaşık kurumsal uygulamalar için en sağlam platformlardan biri — ve biz bunu tam olarak bunun için kullanıyoruz.",
      sections: [
        { heading: "Kurumsal uygulamaların ihtiyaç duyduğu şeyler", body: "Kurumsal uygulamalar pazarlama sitelerinden farklı gereksinimlere sahiptir: binlerce eş zamanlı kullanıcı, rol tabanlı erişim kontrolü, karmaşık veri yapıları. Next.js bu gereksinimleri karşılar." },
        { heading: "Güvenlik avantajı olarak sunucu taraflı render", body: "Hassas veriler sunucuda işlenir ve yalnızca minimum düzeyde istemciye aktarılır." },
        { heading: "App Router mimarisi", body: "App Router ile karmaşık düzen hiyerarşileri, sunucu bileşenleri ve akış zarif bir şekilde eşleştirilebilir." },
        { heading: "Kurumsal projeler için yığınımız", body: "Next.js, Node.js, PostgreSQL, Redis, Docker, AWS - bu kombinasyon test edilmiş ve ölçeklenebilir." },
      ],
      quote: { text: "Sistemi 50'den 5.000 kullanıcıya ölçeklendirdik — mimariyle uğraşmadan. İşte Next.js bu.", attribution: "– CTO, Viyana SaaS Girişimi" },
      codeBlock: { label: "Veritabanı erişimli Sunucu Bileşeni", code: `export default async function Dashboard() {\n  const projects = await db.query('SELECT * FROM projects WHERE tenant_id = $1', [session.tenantId]);\n  return <ProjectList projects={projects} />;\n}` },
    },
  },
  {
    id: "google-ads-roi",
    category: "performance-marketing",
    readTime: "6 min",
    date: "2024-08-12",
    author: { name: "Thomas Müller", role: { de: "Technischer Partner", en: "Technical Partner", ar: "الشريك التقني", tr: "Teknik Ortak" } },
    de: {
      category: "Performance Marketing",
      title: "Google Ads Tracking: So messen Sie den echten ROI",
      excerpt: "Die meisten Unternehmen wissen nicht, welche Ads-Ausgaben wirklich Kunden bringen.",
      intro: "Google Ads ohne vollständiges Tracking ist wie Autofahren mit verbundenen Augen. Sie bewegen sich — aber wohin, wissen Sie nicht. In diesem Artikel erklären wir, wie ein vollständiges Tracking-System aussieht, das den Weg eines Klicks bis zum abgeschlossenen Auftrag lückenlos dokumentiert.",
      sections: [
        { heading: "Das Problem: Halbgares Tracking", body: "Die meisten Unternehmen messen Klicks und vielleicht noch Formular-Absendungen. Was sie nicht messen: ob diese Anfragen tatsächlich zu Aufträgen geführt haben. Das ist der entscheidende Unterschied zwischen Marketing-Kosten und Marketing-Investition." },
        { heading: "Der vollständige Tracking-Funnel", body: "Schritt 1: Google Ads Klick wird getrackt (automatisch). Schritt 2: Landingpage-Besuch wird mit UTM-Parametern erfasst. Schritt 3: Formular-Absendung wird als Conversion in GA4 gezählt. Schritt 4: Der Vertriebler markiert im CRM, ob die Anfrage zum Auftrag wurde. Schritt 5: Auftragswert wird zurück zu Google Ads gespielt (Conversion Value)." },
        { heading: "GTM als zentrales Tracking-Hub", body: "Google Tag Manager ermöglicht es, alle Tracking-Events zentral zu verwalten, ohne Code-Deployments. Einmal korrekt eingerichtet, liefert GTM präzise Daten für GA4, Google Ads und weitere Plattformen." },
        { heading: "Erwartbare Ergebnisse", body: "Unternehmen, die auf vollständiges Tracking umstellen, reduzieren typischerweise ihr Ads-Budget um 20–40%, weil sie erkennen, welche Kampagnen tatsächlich konvertieren. Das eingesparte Budget wird in die performanten Kampagnen reinvestiert." },
      ],
      quote: { text: "Erst als wir wussten, welche Keywords Aufträge bringen, konnten wir wirklich optimieren. Das hat unser Marketing transformiert.", attribution: "– Marketing-Verantwortlicher, Maschinenbau GmbH" },
      codeBlock: { label: "GA4 Conversion Event (GTM)", code: `// GTM Custom Event für Auftrag-Abschluss
dataLayer.push({
  event: 'purchase_completed',
  transaction_id: orderId,
  value: orderValue,
  currency: 'EUR',
  items: [{ item_name: serviceType }]
});` },
    },
    en: {
      category: "Performance Marketing",
      title: "Google Ads tracking: How to measure real ROI",
      excerpt: "Most companies don't know which ad spending actually brings customers.",
      intro: "Google Ads without complete tracking is like driving blindfolded. You're moving — but where to, you don't know. In this article, we explain what a complete tracking system looks like that documents the path of a click to a completed order without gaps.",
      sections: [
        { heading: "The problem: Half-baked tracking", body: "Most companies measure clicks and maybe form submissions. What they don't measure: whether these inquiries actually led to orders. That's the crucial difference between marketing costs and marketing investment." },
        { heading: "The complete tracking funnel", body: "Step 1: Google Ads click is tracked. Step 2: Landing page visit captured with UTM parameters. Step 3: Form submission counted as conversion in GA4. Step 4: Sales rep marks in CRM whether inquiry became an order. Step 5: Order value fed back to Google Ads." },
        { heading: "GTM as the central tracking hub", body: "Google Tag Manager allows all tracking events to be managed centrally without code deployments. Once correctly set up, GTM delivers precise data for GA4, Google Ads, and other platforms." },
        { heading: "Expected results", body: "Companies that switch to complete tracking typically reduce their ads budget by 20-40%, because they can see which campaigns actually convert. The saved budget is reinvested in the performing campaigns." },
      ],
      quote: { text: "Only when we knew which keywords bring orders could we truly optimize. That transformed our marketing.", attribution: "– Marketing Director, Mechanical Engineering GmbH" },
      codeBlock: { label: "GA4 Conversion Event (GTM)", code: `// GTM Custom Event for order completion
dataLayer.push({
  event: 'purchase_completed',
  transaction_id: orderId,
  value: orderValue,
  currency: 'EUR',
  items: [{ item_name: serviceType }]
});` },
    },
    ar: {
      category: "تسويق الأداء",
      title: "تتبع Google Ads: كيف تقيس العائد الحقيقي",
      excerpt: "معظم الشركات لا تعرف أي إنفاق إعلاني يجلب عملاء فعلاً.",
      intro: "Google Ads بدون تتبع كامل مثل القيادة بعيون مغمضة. أنت تتحرك - لكن لا تعرف إلى أين.",
      sections: [
        { heading: "المشكلة: تتبع ناقص", body: "معظم الشركات تقيس النقرات وربما إرسال النماذج. ما لا تقيسه: ما إذا كانت هذه الاستفسارات قد أدت فعلاً إلى طلبات." },
        { heading: "قمع التتبع الكامل", body: "الخطوة 1: تتبع نقرة Google Ads. الخطوة 2: التقاط زيارة الصفحة المقصودة. الخطوة 3: إرسال النموذج كتحويل. الخطوة 4: تحديد CRM. الخطوة 5: إرسال قيمة الطلب." },
        { heading: "GTM كمركز تتبع مركزي", body: "يسمح Google Tag Manager بإدارة جميع أحداث التتبع مركزياً." },
        { heading: "النتائج المتوقعة", body: "الشركات التي تتحول إلى التتبع الكامل تخفض ميزانية الإعلانات عادة بنسبة 20-40%." },
      ],
      quote: { text: "فقط عندما علمنا أي الكلمات المفتاحية تجلب طلبات، تمكنا من التحسين الحقيقي.", attribution: "– مدير التسويق، شركة هندسة ميكانيكية" },
      codeBlock: { label: "حدث تحويل GA4 (GTM)", code: `dataLayer.push({\n  event: 'purchase_completed',\n  value: orderValue,\n  currency: 'EUR'\n});` },
    },
    tr: {
      category: "Performans Pazarlama",
      title: "Google Ads takibi: Gerçek ROI nasıl ölçülür?",
      excerpt: "Çoğu şirket hangi reklam harcamalarının gerçekten müşteri getirdiğini bilmiyor.",
      intro: "Tam takip olmadan Google Ads, gözleri bağlı araba kullanmak gibidir. Hareket ediyorsunuz - ama nereye gittiğinizi bilmiyorsunuz.",
      sections: [
        { heading: "Sorun: Yarım yamalak takip", body: "Çoğu şirket tıklamaları ve belki form gönderimlerini ölçer. Ölçmedikleri: bu sorguların gerçekten siparişlere dönüşüp dönüşmediği." },
        { heading: "Tam takip hunisi", body: "Adım 1: Google Ads tıklaması takip edilir. Adım 2: UTM parametreleriyle açılış sayfası ziyareti. Adım 3: Form gönderimi GA4'te dönüşüm. Adım 4: CRM güncelleme. Adım 5: Sipariş değeri Google Ads'e gönderilir." },
        { heading: "Merkezi takip merkezi olarak GTM", body: "Google Tag Manager, tüm takip olaylarının kod dağıtımı olmadan merkezi olarak yönetilmesine olanak tanır." },
        { heading: "Beklenen sonuçlar", body: "Tam takibe geçen şirketler genellikle reklam bütçelerini %20-40 azaltır." },
      ],
      quote: { text: "Hangi anahtar kelimelerin sipariş getirdiğini bildiğimizde ancak gerçekten optimize edebildik.", attribution: "– Pazarlama Direktörü, Makine İmalatı GmbH" },
      codeBlock: { label: "GA4 Dönüşüm Olayı (GTM)", code: `dataLayer.push({\n  event: 'purchase_completed',\n  value: orderValue,\n  currency: 'EUR'\n});` },
    },
  },
];

const categoryColors: Record<string, string> = {
  "automation-ai": "bg-steel/10 text-steel border-steel/20",
  "ecommerce-systems": "bg-gold/10 text-gold border-gold/20",
  "digital-infrastructure": "bg-navy/10 text-navy border-navy/20",
  "performance-marketing": "bg-charcoal/10 text-charcoal border-charcoal/20",
};

export function generateStaticParams() {
  return articles.map((a) => ({ slug: a.id }));
}

export default async function ArticleDetailPage({ params }: ArticleDetailPageProps) {
  const { locale, slug } = await params;
  const validLocale = (["de", "en", "ar", "tr"].includes(locale) ? locale : "de") as Locale;

  const article = articles.find((a) => a.id === slug);
  if (!article) notFound();

  const data = article[validLocale] ?? article.de;
  const authorRole = article.author.role[validLocale] ?? article.author.role.de;
  const catColor = categoryColors[article.category] ?? "bg-frost text-smoke border-border-light";

  const related = articles.filter((a) => a.id !== article.id).slice(0, 2);

  const backLabel = validLocale === "de" ? "Zurück zu Einblicken" : validLocale === "tr" ? "İçgörülere Geri Dön" : validLocale === "ar" ? "العودة إلى المقالات" : "Back to Insights";
  const readMoreLabel = validLocale === "de" ? "Weiterlesen" : validLocale === "tr" ? "Devamını oku" : validLocale === "ar" ? "اقرأ المزيد" : "Read more";
  const relatedLabel = validLocale === "de" ? "Weitere Einblicke" : validLocale === "tr" ? "Daha Fazla İçgörü" : validLocale === "ar" ? "مقالات أخرى" : "More Insights";

  const formattedDate = new Date(article.date).toLocaleDateString(
    validLocale === "de" ? "de-AT" : validLocale === "ar" ? "ar-SA" : validLocale === "tr" ? "tr-TR" : "en-GB",
    { year: "numeric", month: "long", day: "numeric" }
  );

  return (
    <>
      {/* Hero */}
      <section className="bg-navy py-16 lg:py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-blueprint opacity-20 pointer-events-none" />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gold/30" />

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Back */}
          <Link
            href="/insights"
            className="inline-flex items-center gap-2 font-mono text-xs text-white/50 hover:text-gold transition-colors mb-8 rtl:flex-row-reverse"
          >
            <ArrowLeft size={12} className="rtl:rotate-180" />
            {backLabel}
          </Link>

          {/* Category + meta */}
          <div className="flex flex-wrap items-center gap-3 mb-6">
            <span className={`font-mono text-[10px] uppercase tracking-widest px-3 py-1 border ${catColor}`}>
              {data.category}
            </span>
            <div className="flex items-center gap-1 text-white/40">
              <Clock size={11} />
              <span className="font-mono text-[10px]">{article.readTime}</span>
            </div>
            <div className="flex items-center gap-1 text-white/40">
              <Calendar size={11} />
              <span className="font-mono text-[10px]">{formattedDate}</span>
            </div>
          </div>

          <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-800 text-white leading-tight tracking-tight-eng mb-6">
            {data.title}
          </h1>

          <p className="font-body text-lg text-white/60 leading-relaxed mb-8">
            {data.excerpt}
          </p>

          {/* Author */}
          <div className="flex items-center gap-3 pt-6 border-t border-white/10">
            <div className="w-9 h-9 bg-gold/20 border border-gold/30 flex items-center justify-center flex-shrink-0">
              <User size={16} className="text-gold" />
            </div>
            <div>
              <p className="font-display text-sm font-600 text-white">{article.author.name}</p>
              <p className="font-mono text-[10px] text-gold">{authorRole}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Article content */}
      <article className="py-16 lg:py-24 bg-offwhite">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
            {/* Main content */}
            <div className="lg:col-span-3 space-y-10">
              {/* Intro */}
              <p className="font-body text-lg text-charcoal leading-relaxed border-l-4 border-gold pl-6">
                {data.intro}
              </p>

              {/* Sections */}
              {data.sections.map((section, i) => (
                <div key={i} className="space-y-4">
                  <h2 className="font-display text-xl font-700 text-navy tracking-tight">
                    {section.heading}
                  </h2>
                  <p className="font-body text-base text-smoke leading-relaxed">
                    {section.body}
                  </p>
                </div>
              ))}

              {/* Blockquote */}
              <blockquote className="bg-frost border-l-4 border-gold p-6 space-y-3">
                <p className="font-display text-base font-600 text-navy italic leading-snug">
                  &ldquo;{data.quote.text}&rdquo;
                </p>
                <footer className="font-mono text-xs text-smoke">
                  {data.quote.attribution}
                </footer>
              </blockquote>

              {/* Code block */}
              <div className="space-y-2">
                <p className="font-mono text-[11px] text-gold uppercase tracking-widest">
                  {data.codeBlock.label}
                </p>
                <pre className="bg-charcoal text-white/80 font-mono text-sm p-6 overflow-x-auto leading-relaxed">
                  <code>{data.codeBlock.code}</code>
                </pre>
              </div>
            </div>

            {/* Sidebar */}
            <aside className="lg:col-span-1 space-y-6">
              {/* Article meta */}
              <div className="bg-white border border-border-light p-5 space-y-4 sticky top-24">
                <p className="font-mono text-[10px] text-gold uppercase tracking-widest">
                  {validLocale === "de" ? "Artikel-Info" : validLocale === "tr" ? "Makale Bilgisi" : validLocale === "ar" ? "معلومات المقالة" : "Article Info"}
                </p>
                <div className="space-y-3">
                  <div>
                    <p className="font-mono text-[9px] text-smoke/60 uppercase tracking-widest mb-0.5">
                      {validLocale === "de" ? "Autor" : validLocale === "tr" ? "Yazar" : validLocale === "ar" ? "المؤلف" : "Author"}
                    </p>
                    <p className="font-body text-sm text-navy">{article.author.name}</p>
                  </div>
                  <div>
                    <p className="font-mono text-[9px] text-smoke/60 uppercase tracking-widest mb-0.5">
                      {validLocale === "de" ? "Lesezeit" : validLocale === "tr" ? "Okuma Süresi" : validLocale === "ar" ? "وقت القراءة" : "Reading Time"}
                    </p>
                    <p className="font-body text-sm text-navy">{article.readTime}</p>
                  </div>
                  <div>
                    <p className="font-mono text-[9px] text-smoke/60 uppercase tracking-widest mb-0.5">
                      {validLocale === "de" ? "Kategorie" : validLocale === "tr" ? "Kategori" : validLocale === "ar" ? "الفئة" : "Category"}
                    </p>
                    <p className="font-body text-sm text-navy">{data.category}</p>
                  </div>
                </div>
                <div className="pt-3 border-t border-border-light">
                  <Link
                    href="/contact"
                    className="flex items-center justify-between gap-2 font-mono text-xs text-navy hover:text-gold transition-colors group"
                  >
                    <span>{validLocale === "de" ? "Projekt besprechen" : validLocale === "tr" ? "Projeyi tartış" : validLocale === "ar" ? "ناقش المشروع" : "Discuss project"}</span>
                    <ArrowRight size={12} className="transition-transform group-hover:translate-x-0.5 rtl:rotate-180" />
                  </Link>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </article>

      {/* Related articles */}
      {related.length > 0 && (
        <section className="py-16 bg-frost border-t border-border-light">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center gap-4 mb-10">
              <p className="font-mono text-[11px] text-gold uppercase tracking-widest">{relatedLabel}</p>
              <div className="h-px flex-1 bg-border-light" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {related.map((rel) => {
                const relData = rel[validLocale] ?? rel.de;
                return (
                  <Link
                    key={rel.id}
                    href={`/insights/${rel.id}`}
                    className="group bg-white border border-border-light hover:border-navy hover:shadow-technical transition-all duration-300 p-6 flex flex-col gap-3"
                  >
                    <span className={`font-mono text-[10px] uppercase tracking-widest w-fit px-2 py-0.5 border ${categoryColors[rel.category] ?? ""}`}>
                      {relData.category}
                    </span>
                    <h3 className="font-display text-base font-700 text-navy leading-snug tracking-tight">
                      {relData.title}
                    </h3>
                    <div className="flex items-center gap-1 text-smoke/60 text-xs mt-auto">
                      <Clock size={11} />
                      <span className="font-mono">{rel.readTime}</span>
                    </div>
                    <div className="flex items-center gap-2 font-mono text-xs text-navy group-hover:text-steel transition-colors">
                      <span>{readMoreLabel}</span>
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
