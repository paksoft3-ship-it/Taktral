"use client";

import { useState } from "react";
import { MessageCircle, X, Bot } from "lucide-react";

// WhatsApp SVG icon
function WhatsAppIcon({ size = 20 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

export default function FloatingActions() {
  const [expanded, setExpanded] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);

  const buttons = [
    {
      id: "whatsapp",
      label: "WhatsApp",
      icon: <WhatsAppIcon size={20} />,
      bg: "bg-[#25D366] hover:bg-[#1ebe57]",
      href: "https://wa.me/4369912345678?text=Hallo%20Taktral%2C%20ich%20hätte%20Interesse%20an%20einem%20Erstgespräch.",
      external: true,
    },
    {
      id: "chat",
      label: "E-Mail",
      icon: <MessageCircle size={20} />,
      bg: "bg-steel hover:bg-navy",
      href: "mailto:hallo@taktral.com?subject=Projektanfrage&body=Hallo%20Taktral%2C",
      external: true,
    },
    {
      id: "ai",
      label: "KI-Assistent",
      icon: <Bot size={20} />,
      bg: "bg-navy hover:bg-charcoal",
      onClick: () => setChatOpen(true),
    },
  ];

  return (
    <>
      {/* Floating button stack — bottom right */}
      <div
        className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3"
        role="region"
        aria-label="Kontakt-Optionen"
      >
        {/* Expanded action buttons */}
        {expanded && (
          <div className="flex flex-col items-end gap-2 mb-1">
            {buttons.map((btn) => (
              <div key={btn.id} className="flex items-center gap-3 group">
                {/* Label tooltip */}
                <span className="bg-charcoal text-white font-mono text-xs px-3 py-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap pointer-events-none select-none">
                  {btn.label}
                </span>

                {/* Button */}
                {btn.href ? (
                  <a
                    href={btn.href}
                    target={btn.external ? "_blank" : undefined}
                    rel={btn.external ? "noopener noreferrer" : undefined}
                    aria-label={btn.label}
                    className={`w-11 h-11 flex items-center justify-center text-white shadow-technical-lg transition-all duration-200 ${btn.bg}`}
                  >
                    {btn.icon}
                  </a>
                ) : (
                  <button
                    type="button"
                    onClick={btn.onClick}
                    aria-label={btn.label}
                    className={`w-11 h-11 flex items-center justify-center text-white shadow-technical-lg transition-all duration-200 ${btn.bg}`}
                  >
                    {btn.icon}
                  </button>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Main toggle button */}
        <button
          type="button"
          onClick={() => setExpanded((prev) => !prev)}
          aria-label={expanded ? "Kontaktoptionen schließen" : "Kontaktoptionen öffnen"}
          aria-expanded={expanded}
          className="w-14 h-14 bg-navy hover:bg-steel text-white flex items-center justify-center shadow-technical-lg transition-all duration-300 relative"
        >
          {/* Gold top accent */}
          <span className="absolute top-0 left-0 right-0 h-0.5 bg-gold" aria-hidden="true" />
          <span
            className={`transition-transform duration-300 ${expanded ? "rotate-45" : "rotate-0"}`}
          >
            {expanded ? <X size={22} /> : <MessageCircle size={22} />}
          </span>
        </button>
      </div>

      {/* AI Chat modal */}
      {chatOpen && (
        <div
          className="fixed inset-0 z-[200] flex items-end sm:items-center justify-center sm:justify-end p-4 sm:p-6"
          role="dialog"
          aria-modal="true"
          aria-label="KI-Assistent"
        >
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-charcoal/40 backdrop-blur-sm"
            onClick={() => setChatOpen(false)}
            aria-hidden="true"
          />

          {/* Chat window */}
          <div className="relative w-full max-w-sm bg-white shadow-technical-lg flex flex-col sm:mb-24 sm:mr-2 overflow-hidden">
            {/* Header */}
            <div className="bg-navy px-5 py-4 flex items-center justify-between flex-shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-gold/20 border border-gold/40 flex items-center justify-center">
                  <Bot size={16} className="text-gold" />
                </div>
                <div>
                  <p className="font-display text-sm font-700 text-white leading-none">
                    Taktral Assistent
                  </p>
                  <p className="font-mono text-[10px] text-gold mt-0.5">
                    KI-gestützt · Verfügbar 24/7
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setChatOpen(false)}
                aria-label="Chat schließen"
                className="w-8 h-8 flex items-center justify-center text-white/60 hover:text-white transition-colors"
              >
                <X size={16} />
              </button>
            </div>

            {/* Chat body */}
            <div className="flex-1 p-5 space-y-4 min-h-[260px] bg-offwhite">
              {/* Bot message */}
              <div className="flex gap-3">
                <div className="w-7 h-7 bg-navy flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Bot size={13} className="text-white" />
                </div>
                <div className="bg-white border border-border-light px-4 py-3 max-w-[85%]">
                  <p className="font-body text-sm text-charcoal leading-relaxed">
                    Guten Tag! Ich bin der Taktral-Assistent. Wie kann ich Ihnen bei Ihrem digitalen Projekt helfen?
                  </p>
                </div>
              </div>

              {/* Quick reply chips */}
              <div className="pl-10 flex flex-col gap-2">
                {[
                  "Preise & Leistungen",
                  "Wie läuft ein Projekt ab?",
                  "Menschlichen Ansprechpartner",
                ].map((chip) => (
                  <a
                    key={chip}
                    href="mailto:hallo@taktral.com"
                    className="inline-block w-fit px-3 py-2 bg-white border border-border-light hover:border-navy font-body text-xs text-navy transition-colors duration-150"
                  >
                    {chip}
                  </a>
                ))}
              </div>
            </div>

            {/* Input bar */}
            <div className="border-t border-border-light px-4 py-3 flex gap-2 bg-white flex-shrink-0">
              <input
                type="text"
                placeholder="Ihre Frage..."
                className="flex-1 bg-offwhite border border-border-light px-3 py-2 font-body text-sm text-charcoal placeholder:text-smoke/50 focus:outline-none focus:border-navy transition-colors"
              />
              <a
                href="mailto:hallo@taktral.com"
                className="px-4 py-2 bg-navy text-white font-mono text-xs hover:bg-steel transition-colors"
              >
                →
              </a>
            </div>

            {/* Disclaimer */}
            <p className="font-mono text-[9px] text-smoke/50 text-center pb-2 px-4 bg-white">
              KI-Demo · Für direkte Antworten: hallo@taktral.com
            </p>
          </div>
        </div>
      )}
    </>
  );
}
