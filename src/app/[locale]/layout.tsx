import type { Metadata } from "next";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { getMessages, getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import Navigation from "@/components/layout/Navigation";
import Footer from "@/components/layout/Footer";
import FloatingActions from "@/components/ui/FloatingActions";

interface LocaleLayoutProps {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;

  const metaMap: Record<string, { title: string; description: string }> = {
    de: {
      title: "Taktral – Digitale Systemarchitektur für Ihr Unternehmen",
      description:
        "Taktral baut präzise digitale Systeme für Unternehmen weltweit. Web-Infrastruktur, E-Commerce, Automatisierung, Performance Marketing. Festpreise, keine Überraschungen.",
    },
    en: {
      title: "Taktral – Digital Systems Architecture for Your Business",
      description:
        "Taktral builds precision digital systems for companies worldwide. Web infrastructure, e-commerce, automation, performance marketing. Fixed prices, no surprises.",
    },
    ar: {
      title: "Taktral – هندسة الأنظمة الرقمية لعملك",
      description:
        "تبني Taktral أنظمة رقمية دقيقة للشركات حول العالم. بنية تحتية للويب، تجارة إلكترونية، أتمتة، تسويق قائم على الأداء.",
    },
    tr: {
      title: "Taktral – İşletmeniz için Dijital Sistem Mimarisi",
      description:
        "Taktral, dünya genelindeki şirketler için hassas dijital sistemler inşa eder. Web altyapısı, e-ticaret, otomasyon, performans pazarlaması. Sabit fiyatlar, sürpriz yok.",
    },
  };

  return metaMap[locale] ?? metaMap.de;
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: LocaleLayoutProps) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  const messages = await getMessages();
  const isRTL = locale === "ar";

  return (
    <html lang={locale} dir={isRTL ? "rtl" : "ltr"}>
      <head>
        <link rel="icon" href="/favicon.png" type="image/png" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700;800&family=Inter:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-offwhite text-charcoal font-body antialiased">
        <NextIntlClientProvider messages={messages}>
          <Navigation locale={locale} />
          <main id="main-content">{children}</main>
          <Footer />
          <FloatingActions />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
