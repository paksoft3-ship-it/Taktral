"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Plus, Minus } from "lucide-react";
import SectionLabel from "@/components/ui/SectionLabel";
import faqData from "@/data/faq.json";

type Locale = "de" | "en" | "ar" | "tr";

interface FAQSectionProps {
  locale: string;
}

export default function FAQSection({ locale }: FAQSectionProps) {
  const t = useTranslations("faq");
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const validLocale = (["de", "en", "ar", "tr"].includes(locale) ? locale : "de") as Locale;

  const toggle = (i: number) => setOpenIndex(openIndex === i ? null : i);

  return (
    <section className="py-20 lg:py-28 bg-offwhite" aria-label="FAQ">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <SectionLabel className="justify-center">{t("label")}</SectionLabel>
          <h2 className="font-display text-3xl sm:text-4xl font-800 text-navy mt-4 mb-3 tracking-tight-eng">
            {t("headline")}
          </h2>
          <p className="font-body text-smoke text-base leading-relaxed max-w-xl mx-auto">
            {t("subheadline")}
          </p>
        </div>

        {/* Accordion */}
        <div className="space-y-0 border-t border-border-light" role="list">
          {faqData.map((item, i) => {
            const question = item[validLocale]?.question ?? "";
            const answer = item[validLocale]?.answer ?? "";
            const isOpen = openIndex === i;

            return (
              <div
                key={i}
                className={[
                  "border-b border-border-light transition-colors duration-200",
                  isOpen ? "border-l-2 border-l-gold pl-4 -ml-4" : "",
                ].join(" ")}
                role="listitem"
              >
                <button
                  type="button"
                  onClick={() => toggle(i)}
                  className="w-full flex items-center justify-between gap-4 py-5 text-left"
                  aria-expanded={isOpen}
                  aria-controls={`faq-answer-${i}`}
                >
                  <span className="font-display text-base font-600 text-navy leading-snug">
                    {question}
                  </span>
                  <span className="flex-shrink-0 text-gold transition-transform duration-200">
                    {isOpen ? <Minus size={18} /> : <Plus size={18} />}
                  </span>
                </button>

                {isOpen && (
                  <div
                    id={`faq-answer-${i}`}
                    className="pb-5 font-body text-sm text-smoke leading-relaxed"
                  >
                    {answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
