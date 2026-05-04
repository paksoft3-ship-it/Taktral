import Image from "next/image";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Mail, Clock, Globe, Phone } from "lucide-react";



const serviceLinks = [
  { href: "/services#digital-infrastructure", labelKey: "digitalInfra" },
  { href: "/services#ecommerce-systems", labelKey: "ecommerce" },
  { href: "/services#automation-ai", labelKey: "automation" },
  { href: "/services#performance-marketing", labelKey: "marketing" },
  { href: "/services#mobile-apps", labelKey: "mobile" },
];

const serviceLabelFallbacks: Record<string, string> = {
  digitalInfra: "Digitale Infrastruktur",
  ecommerce: "E-Commerce Systeme",
  automation: "Automatisierung & KI",
  marketing: "Performance Marketing",
  mobile: "Mobile Applikationen",
};

export default function Footer() {
  const t = useTranslations("footer");
  const tServices = useTranslations("services");

  return (
    <footer
      className="bg-navy text-white relative overflow-hidden"
      role="contentinfo"
    >
      {/* Blueprint pattern overlay */}
      <div className="absolute inset-0 bg-blueprint opacity-20 pointer-events-none" aria-hidden="true" />

      {/* Gold top accent line */}
      <div className="h-px w-full bg-gradient-to-r from-transparent via-gold to-transparent opacity-40" aria-hidden="true" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* ── Main grid ──────────────────────────────────────────────────── */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8 py-16">
          {/* ── Brand column (spans 2 on lg) ─────────────────────────────── */}
          <div className="lg:col-span-2 space-y-5">
            {/* Logo */}
            <Link
              href="/"
              className="inline-flex items-center gap-2.5 group"
              aria-label="Taktral – Home"
            >
              <Image
                src="/logo.png"
                alt="Taktral"
                width={120}
                height={32}
                className="h-8 w-auto object-contain"
              />
            </Link>

            {/* Tagline */}
            <p className="font-body text-sm text-white/60 leading-relaxed max-w-xs">
              {t("tagline")}
            </p>

            {/* Gold accent line */}
            <div className="h-px w-16 bg-gold" aria-hidden="true" />
          </div>

          {/* ── Leistungen column ────────────────────────────────────────── */}
          <div className="space-y-4">
            <h3 className="font-mono text-[11px] text-gold uppercase tracking-widest">
              {t("services")}
            </h3>
            <ul className="space-y-2.5" role="list">
              {serviceLinks.map(({ href, labelKey }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="font-body text-sm text-white/60 hover:text-white transition-colors duration-200"
                  >
                    {serviceLabelFallbacks[labelKey]}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* ── Unternehmen column ───────────────────────────────────────── */}
          <div className="space-y-4">
            <h3 className="font-mono text-[11px] text-gold uppercase tracking-widest">
              {t("company")}
            </h3>
            <ul className="space-y-2.5" role="list">
              <li>
                <Link
                  href="/about"
                  className="font-body text-sm text-white/60 hover:text-white transition-colors duration-200"
                >
                  {t("about")}
                </Link>
              </li>
              <li>
                <Link
                  href="/projects"
                  className="font-body text-sm text-white/60 hover:text-white transition-colors duration-200"
                >
                  {t("projects")}
                </Link>
              </li>
              <li>
                <Link
                  href="/insights"
                  className="font-body text-sm text-white/60 hover:text-white transition-colors duration-200"
                >
                  {t("insights")}
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="font-body text-sm text-white/60 hover:text-white transition-colors duration-200"
                >
                  {t("contact")}
                </Link>
              </li>
            </ul>

            {/* Rechtliches sub-section */}
            <h3 className="font-mono text-[11px] text-gold uppercase tracking-widest pt-4">
              {t("legal")}
            </h3>
            <ul className="space-y-2.5" role="list">
              <li>
                <Link
                  href="/impressum"
                  className="font-body text-sm text-white/60 hover:text-white transition-colors duration-200"
                >
                  {t("impressum")}
                </Link>
              </li>
              <li>
                <Link
                  href="/datenschutz"
                  className="font-body text-sm text-white/60 hover:text-white transition-colors duration-200"
                >
                  {t("datenschutz")}
                </Link>
              </li>
              <li>
                <Link
                  href="/agb"
                  className="font-body text-sm text-white/60 hover:text-white transition-colors duration-200"
                >
                  {t("agb")}
                </Link>
              </li>
            </ul>
          </div>

          {/* ── Kontakt column ───────────────────────────────────────────── */}
          <div className="space-y-4">
            <h3 className="font-mono text-[11px] text-gold uppercase tracking-widest">
              {t("contactCol")}
            </h3>

            <ul className="space-y-4" role="list">
              <li className="flex items-start gap-3">
                <Phone
                  size={14}
                  className="text-gold flex-shrink-0 mt-0.5"
                  aria-hidden="true"
                />
                <div>
                  <a
                    href="tel:+905525677164"
                    className="font-body text-sm text-white/80 hover:text-white transition-colors duration-200"
                  >
                    +90 552 567 71 64
                  </a>
                </div>
              </li>

              <li className="flex items-start gap-3">
                <Mail
                  size={14}
                  className="text-gold flex-shrink-0 mt-0.5"
                  aria-hidden="true"
                />
                <div>
                  <a
                    href="mailto:hallo@taktral.com"
                    className="font-body text-sm text-white/80 hover:text-white transition-colors duration-200 break-all"
                  >
                    hallo@taktral.com
                  </a>
                </div>
              </li>

              <li className="flex items-start gap-3">
                <Clock
                  size={14}
                  className="text-gold flex-shrink-0 mt-0.5"
                  aria-hidden="true"
                />
                <p className="font-body text-sm text-white/60">
                  {t("responseTime")}
                </p>
              </li>

              <li className="flex items-start gap-3">
                <Globe
                  size={14}
                  className="text-gold flex-shrink-0 mt-0.5"
                  aria-hidden="true"
                />
                <div>
                  <p className="font-body text-sm text-white/60">
                    {t("languages")}
                  </p>
                  <p className="font-mono text-[10px] text-white/40 mt-0.5">
                    {t("region")}
                  </p>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* ── Bottom bar ───────────────────────────────────────────────────── */}
        <div className="border-t border-white/10 py-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="font-mono text-xs text-white/40">
            {t("copyright")}
          </p>
          <div className="flex items-center gap-1" aria-label="Supported languages">
            {["DE", "EN", "TR", "AR"].map((lang, i) => (
              <span key={lang} className="flex items-center gap-1">
                <span className="font-mono text-[10px] text-white/30">
                  {lang}
                </span>
                {i < 3 && (
                  <span className="text-white/20 text-xs">/</span>
                )}
              </span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
