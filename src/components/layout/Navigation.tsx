"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { usePathname, useRouter, Link } from "@/i18n/navigation";
import { Menu, X, ChevronDown } from "lucide-react";

const locales = [
  { code: "de", label: "DE" },
  { code: "en", label: "EN" },
  { code: "ar", label: "AR" },
  { code: "tr", label: "TR" },
];

interface NavigationProps {
  locale: string;
}

export default function Navigation({ locale }: NavigationProps) {
  const t = useTranslations("nav");
  const pathname = usePathname();
  const router = useRouter();

  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const langRef = useRef<HTMLDivElement>(null);

  const navLinks = [
    { href: "/services", label: t("services") },
    { href: "/projects", label: t("projects") },
    { href: "/about", label: t("about") },
    { href: "/insights", label: t("insights") },
    { href: "/contact", label: t("contact") },
  ];

  // Scroll detection
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close lang dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (langRef.current && !langRef.current.contains(e.target as Node)) {
        setLangOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const handleLocaleChange = (newLocale: string) => {
    setLangOpen(false);
    router.replace(pathname, { locale: newLocale });
  };

  const isActive = (href: string) => pathname === href;

  const currentLocaleLabel =
    locales.find((l) => l.code === locale)?.label ?? "DE";

  return (
    <>
      <header
        className={[
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
          scrolled
            ? "bg-white shadow-technical border-b border-border-light"
            : "bg-white/95 backdrop-blur-sm",
        ].join(" ")}
        role="banner"
      >
        <nav
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between"
          aria-label="Main navigation"
        >
          {/* ── Logo ────────────────────────────────────────────────────── */}
          <Link
            href="/"
            className="flex items-center gap-2.5 flex-shrink-0 group"
            aria-label="Taktral – Home"
          >
            <Image
              src="/logo.png"
              alt="Taktral"
              width={120}
              height={32}
              className="h-8 w-auto object-contain"
              priority
            />
          </Link>

          {/* ── Desktop Nav Links ────────────────────────────────────────── */}
          <ul
            className="hidden lg:flex items-center gap-1"
            role="list"
          >
            {navLinks.map(({ href, label }) => (
              <li key={href}>
                <Link
                  href={href}
                  className={[
                    "relative px-3 py-1.5 font-body text-sm font-500 transition-colors duration-200",
                    "hover:text-navy",
                    "after:absolute after:bottom-0 after:left-3 after:right-3 after:h-px after:bg-gold after:transition-transform after:duration-200",
                    isActive(href)
                      ? "text-navy after:scale-x-100"
                      : "text-smoke after:scale-x-0 hover:after:scale-x-100",
                  ].join(" ")}
                  aria-current={isActive(href) ? "page" : undefined}
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>

          {/* ── Desktop Right: Lang Switcher + CTA ──────────────────────── */}
          <div className="hidden lg:flex items-center gap-3">
            {/* Language dropdown */}
            <div className="relative" ref={langRef}>
              <button
                type="button"
                onClick={() => setLangOpen((prev) => !prev)}
                className="flex items-center gap-1.5 px-3 py-1.5 font-mono text-xs text-smoke hover:text-navy border border-border-light hover:border-navy transition-all duration-200"
                aria-expanded={langOpen}
                aria-haspopup="listbox"
                aria-label="Select language"
              >
                {currentLocaleLabel}
                <ChevronDown
                  size={12}
                  className={`transition-transform duration-200 ${langOpen ? "rotate-180" : ""}`}
                  aria-hidden="true"
                />
              </button>

              {langOpen && (
                <ul
                  className="absolute top-full right-0 mt-1 bg-white border border-border-light shadow-technical py-1 min-w-[80px] z-50"
                  role="listbox"
                  aria-label="Available languages"
                >
                  {locales.map(({ code, label }) => (
                    <li key={code} role="option" aria-selected={code === locale}>
                      <button
                        type="button"
                        onClick={() => handleLocaleChange(code)}
                        className={[
                          "w-full text-left px-4 py-2 font-mono text-xs transition-colors duration-150",
                          code === locale
                            ? "text-navy bg-frost font-600"
                            : "text-smoke hover:text-navy hover:bg-frost/50",
                        ].join(" ")}
                      >
                        {label}
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {/* CTA button */}
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-navy text-white font-display text-sm font-600 hover:bg-steel transition-colors duration-200"
            >
              {t("cta")}
            </Link>
          </div>

          {/* ── Mobile Hamburger ─────────────────────────────────────────── */}
          <button
            type="button"
            className="lg:hidden flex items-center justify-center w-10 h-10 text-navy"
            onClick={() => setMobileOpen(true)}
            aria-expanded={mobileOpen}
            aria-label="Open menu"
          >
            <Menu size={22} aria-hidden="true" />
          </button>
        </nav>
      </header>

      {/* ── Mobile Overlay Menu ────────────────────────────────────────────── */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-[100] bg-navy flex flex-col"
          role="dialog"
          aria-modal="true"
          aria-label="Navigation menu"
        >
          {/* Mobile header */}
          <div className="flex items-center justify-between px-4 h-16 border-b border-white/10">
            <Link
              href="/"
              className="flex items-center gap-2.5"
              onClick={() => setMobileOpen(false)}
            >
              <Image
                src="/logo.png"
                alt="Taktral"
                width={120}
                height={32}
                className="h-8 w-auto object-contain"
              />
            </Link>
            <button
              type="button"
              className="flex items-center justify-center w-10 h-10 text-white"
              onClick={() => setMobileOpen(false)}
              aria-label="Close menu"
            >
              <X size={22} aria-hidden="true" />
            </button>
          </div>

          {/* Mobile nav links */}
          <nav className="flex-1 flex flex-col justify-center px-8 gap-2">
            {navLinks.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                onClick={() => setMobileOpen(false)}
                className={[
                  "py-3 font-display text-2xl font-700 border-b border-white/10 transition-colors duration-200",
                  "hover:text-gold",
                  isActive(href) ? "text-gold" : "text-white",
                ].join(" ")}
                aria-current={isActive(href) ? "page" : undefined}
              >
                {label}
              </Link>
            ))}
          </nav>

          {/* Mobile bottom: lang + CTA */}
          <div className="px-8 pb-12 space-y-4">
            {/* Language buttons */}
            <div className="flex gap-2">
              {locales.map(({ code, label }) => (
                <button
                  key={code}
                  type="button"
                  onClick={() => {
                    handleLocaleChange(code);
                    setMobileOpen(false);
                  }}
                  className={[
                    "px-4 py-2 font-mono text-xs border transition-colors duration-150",
                    code === locale
                      ? "border-gold text-gold bg-gold/10"
                      : "border-white/30 text-white/60 hover:border-white/60 hover:text-white",
                  ].join(" ")}
                >
                  {label}
                </button>
              ))}
            </div>

            {/* CTA */}
            <Link
              href="/contact"
              onClick={() => setMobileOpen(false)}
              className="flex items-center justify-center gap-2 w-full py-4 bg-white text-navy font-display text-sm font-700 hover:bg-frost transition-colors duration-200"
            >
              {t("cta")}
            </Link>
          </div>
        </div>
      )}

      {/* Spacer to offset fixed nav */}
      <div className="h-16" aria-hidden="true" />
    </>
  );
}
