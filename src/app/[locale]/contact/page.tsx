"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { useParams } from "next/navigation";
import SectionLabel from "@/components/ui/SectionLabel";
import { Mail, Clock, Globe, Send, ArrowRight } from "lucide-react";
import servicesData from "@/data/services.json";

type Locale = "de" | "en" | "ar" | "tr";

export default function ContactPage() {
  const params = useParams();
  const locale = (params?.locale as string) ?? "de";
  const validLocale = (["de", "en", "ar", "tr"].includes(locale) ? locale : "de") as Locale;
  const t = useTranslations("contact");

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    company: "",
    email: "",
    phone: "",
    service: "",
    budget: "",
    description: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In production: send to API endpoint
    setSubmitted(true);
  };

  const steps = [
    {
      num: "01",
      title: t("step1Title"),
      desc: t("step1Desc"),
    },
    {
      num: "02",
      title: t("step2Title"),
      desc: t("step2Desc"),
    },
    {
      num: "03",
      title: t("step3Title"),
      desc: t("step3Desc"),
    },
  ];

  return (
    <>
      {/* Hero */}
      <section className="bg-navy py-16 lg:py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-blueprint opacity-20 pointer-events-none" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <SectionLabel light className="mb-6">{t("label")}</SectionLabel>
            <h1 className="font-display text-4xl sm:text-5xl font-800 text-white leading-tight tracking-tight-eng mb-4">
              {t("headline")}
            </h1>
            <p className="font-body text-lg text-white/60 leading-relaxed">
              {t("subheadline")}
            </p>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gold/30" />
      </section>

      {/* Main content */}
      <section className="py-16 lg:py-24 bg-offwhite">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-16">
            {/* Left: process + contact info */}
            <div className="lg:col-span-2 space-y-10">
              {/* Process steps */}
              <div>
                <div className="relative space-y-0">
                  {/* Vertical connector line */}
                  <div className="absolute left-[15px] top-8 bottom-8 w-px bg-border-light" />

                  {steps.map((step, i) => (
                    <div key={i} className="flex gap-5 items-start py-4">
                      <div className="flex-shrink-0 w-8 h-8 border border-gold text-gold font-mono text-xs flex items-center justify-center bg-white z-10 relative">
                        {step.num}
                      </div>
                      <div className="pt-0.5">
                        <h3 className="font-display text-base font-700 text-navy mb-1">
                          {step.title}
                        </h3>
                        <p className="font-body text-sm text-smoke leading-relaxed">
                          {step.desc}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Contact info */}
              <div className="border-t border-border-light pt-8 space-y-5">
                <div className="flex items-center gap-3">
                  <Mail size={16} className="text-gold flex-shrink-0" />
                  <a
                    href="mailto:hallo@taktral.com"
                    className="font-body text-sm text-charcoal hover:text-navy transition-colors"
                  >
                    hallo@taktral.com
                  </a>
                </div>
                <div className="flex items-center gap-3">
                  <Clock size={16} className="text-gold flex-shrink-0" />
                  <span className="font-body text-sm text-smoke">
                    {t("response")}
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <Globe size={16} className="text-gold flex-shrink-0" />
                  <span className="font-body text-sm text-smoke">
                    {t("languages")}
                  </span>
                </div>
              </div>
            </div>

            {/* Right: form */}
            <div className="lg:col-span-3">
              {submitted ? (
                <div className="bg-white border border-border-light p-10 text-center space-y-4">
                  <div className="w-12 h-12 bg-navy mx-auto flex items-center justify-center">
                    <Send size={20} className="text-white" />
                  </div>
                  <h2 className="font-display text-2xl font-700 text-navy">
                    Anfrage erhalten!
                  </h2>
                  <p className="font-body text-sm text-smoke max-w-sm mx-auto">
                    Wir melden uns innerhalb von 24 Stunden bei Ihnen. Bitte überprüfen Sie Ihren Posteingang.
                  </p>
                </div>
              ) : (
                <div className="bg-white border border-border-light p-8 lg:p-10">
                  <h2 className="font-display text-xl font-700 text-navy mb-6">
                    {t("formTitle")}
                  </h2>

                  <form onSubmit={handleSubmit} className="space-y-5" noValidate>
                    {/* Name row */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label
                          htmlFor="firstName"
                          className="block font-mono text-[11px] text-navy uppercase tracking-wider mb-1.5"
                        >
                          {t("firstName")}
                        </label>
                        <input
                          id="firstName"
                          name="firstName"
                          type="text"
                          required
                          value={formData.firstName}
                          onChange={handleChange}
                          placeholder="Max"
                          className="w-full px-4 py-3 bg-offwhite border border-border-light focus:border-navy focus:outline-none transition-colors font-body text-sm text-charcoal placeholder:text-smoke/50"
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="lastName"
                          className="block font-mono text-[11px] text-navy uppercase tracking-wider mb-1.5"
                        >
                          {t("lastName")}
                        </label>
                        <input
                          id="lastName"
                          name="lastName"
                          type="text"
                          required
                          value={formData.lastName}
                          onChange={handleChange}
                          placeholder="Mustermann"
                          className="w-full px-4 py-3 bg-offwhite border border-border-light focus:border-navy focus:outline-none transition-colors font-body text-sm text-charcoal placeholder:text-smoke/50"
                        />
                      </div>
                    </div>

                    {/* Company */}
                    <div>
                      <label
                        htmlFor="company"
                        className="block font-mono text-[11px] text-navy uppercase tracking-wider mb-1.5"
                      >
                        {t("company")}
                      </label>
                      <input
                        id="company"
                        name="company"
                        type="text"
                        required
                        value={formData.company}
                        onChange={handleChange}
                        placeholder="Muster GmbH"
                        className="w-full px-4 py-3 bg-offwhite border border-border-light focus:border-navy focus:outline-none transition-colors font-body text-sm text-charcoal placeholder:text-smoke/50"
                      />
                    </div>

                    {/* Email + Phone */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label
                          htmlFor="email"
                          className="block font-mono text-[11px] text-navy uppercase tracking-wider mb-1.5"
                        >
                          {t("emailField")}
                        </label>
                        <input
                          id="email"
                          name="email"
                          type="email"
                          required
                          value={formData.email}
                          onChange={handleChange}
                          placeholder="max@firma.de"
                          className="w-full px-4 py-3 bg-offwhite border border-border-light focus:border-navy focus:outline-none transition-colors font-body text-sm text-charcoal placeholder:text-smoke/50"
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="phone"
                          className="block font-mono text-[11px] text-navy uppercase tracking-wider mb-1.5"
                        >
                          {t("phone")}
                        </label>
                        <input
                          id="phone"
                          name="phone"
                          type="tel"
                          value={formData.phone}
                          onChange={handleChange}
                          placeholder="+43 123 456789"
                          className="w-full px-4 py-3 bg-offwhite border border-border-light focus:border-navy focus:outline-none transition-colors font-body text-sm text-charcoal placeholder:text-smoke/50"
                        />
                      </div>
                    </div>

                    {/* Service + Budget */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label
                          htmlFor="service"
                          className="block font-mono text-[11px] text-navy uppercase tracking-wider mb-1.5"
                        >
                          {t("serviceInterest")}
                        </label>
                        <select
                          id="service"
                          name="service"
                          value={formData.service}
                          onChange={handleChange}
                          className="w-full px-4 py-3 bg-offwhite border border-border-light focus:border-navy focus:outline-none transition-colors font-body text-sm text-charcoal appearance-none"
                        >
                          <option value="">—</option>
                          {servicesData.map((s) => (
                            <option key={s.id} value={s.id}>
                              {s[validLocale]?.title ?? s.de.title}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label
                          htmlFor="budget"
                          className="block font-mono text-[11px] text-navy uppercase tracking-wider mb-1.5"
                        >
                          {t("budgetRange")}
                        </label>
                        <select
                          id="budget"
                          name="budget"
                          value={formData.budget}
                          onChange={handleChange}
                          className="w-full px-4 py-3 bg-offwhite border border-border-light focus:border-navy focus:outline-none transition-colors font-body text-sm text-charcoal appearance-none"
                        >
                          <option value="">—</option>
                          <option value="5k-10k">{t("budget1")}</option>
                          <option value="10k-20k">{t("budget2")}</option>
                          <option value="20k+">{t("budget3")}</option>
                        </select>
                      </div>
                    </div>

                    {/* Description */}
                    <div>
                      <label
                        htmlFor="description"
                        className="block font-mono text-[11px] text-navy uppercase tracking-wider mb-1.5"
                      >
                        {t("description")}
                      </label>
                      <textarea
                        id="description"
                        name="description"
                        rows={5}
                        required
                        value={formData.description}
                        onChange={handleChange}
                        placeholder={
                          validLocale === "de"
                            ? "Beschreiben Sie kurz Ihre Herausforderung oder Ihr Ziel..."
                            : validLocale === "tr"
                            ? "Zorluğunuzu veya hedefinizi kısaca açıklayın..."
                            : validLocale === "ar"
                            ? "صف تحديك أو هدفك باختصار..."
                            : "Briefly describe your challenge or goal..."
                        }
                        className="w-full px-4 py-3 bg-offwhite border border-border-light focus:border-navy focus:outline-none transition-colors font-body text-sm text-charcoal placeholder:text-smoke/50 resize-none"
                      />
                    </div>

                    {/* Submit */}
                    <div className="pt-2">
                      <button
                        type="submit"
                        className="w-full flex items-center justify-center gap-2 bg-navy hover:bg-steel text-white font-display text-sm font-700 py-4 px-8 transition-colors duration-200 group"
                      >
                        {t("submit")}
                        <ArrowRight
                          size={16}
                          className="transition-transform duration-200 group-hover:translate-x-0.5"
                        />
                      </button>
                      <p className="font-body text-xs text-smoke text-center mt-3">
                        {t("privacyNote")}
                      </p>
                    </div>
                  </form>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
