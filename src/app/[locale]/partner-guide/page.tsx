"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { useParams } from "next/navigation";
import { Lock, CheckCircle2, AlertTriangle, HelpCircle, DollarSign, Users, Globe } from "lucide-react";
import servicesData from "@/data/services.json";

type Locale = "de" | "en" | "ar" | "tr";

const PARTNER_PASSWORD = "taktral2024";

const pricingRanges = [
  { service: "Digitale Infrastruktur", range: "EUR 8.000 – 18.000", complexity: "Mittel–Hoch" },
  { service: "E-Commerce Systeme", range: "EUR 10.000 – 20.000", complexity: "Hoch" },
  { service: "Automatisierung & KI", range: "EUR 5.000 – 12.000", complexity: "Niedrig–Mittel" },
  { service: "Performance Marketing", range: "EUR 5.000 – 10.000", complexity: "Niedrig" },
  { service: "Mobile Applikationen", range: "EUR 12.000 – 22.000", complexity: "Hoch" },
];

const qualificationQuestions = [
  "Haben Sie ein konkretes Problem oder Ziel, das Sie durch eine digitale Lösung erreichen möchten?",
  "Welches Budget haben Sie für dieses Projekt eingeplant?",
  "Haben Sie bereits eine bestehende technische Infrastruktur (Website, CRM, ERP)?",
  "Wer ist intern für die Entscheidung verantwortlich?",
  "Was ist Ihr gewünschter Zeitrahmen für den Launch?",
  "Haben Sie schon früher mit Digitalpartnern gearbeitet? Was hat gut/schlecht funktioniert?",
];

const redFlags = [
  "Budget unter EUR 3.000 — zu klein für unsere Mindestandards",
  "Kein klares Ziel oder Problem — nur \"eine Website\" ohne konkreten Zweck",
  "Erwartung von sofortigen Ergebnissen innerhalb von 1–2 Wochen",
  "Wunsch nach 'alles für EUR X.000' ohne Umfangsdefinition",
  "Kein Entscheidungsträger am Tisch — alles muss durch viele Ebenen",
  "Vorhandene schlechte Erfahrungen mit vielen anderen Anbietern (kann auf schwierigen Kunden hinweisen)",
];

export default function PartnerGuidePage() {
  const params = useParams();
  const locale = (params?.locale as string) ?? "de";
  const validLocale = (["de", "en", "ar", "tr"].includes(locale) ? locale : "de") as Locale;

  const [password, setPassword] = useState("");
  const [authenticated, setAuthenticated] = useState(false);
  const [error, setError] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === PARTNER_PASSWORD) {
      setAuthenticated(true);
      setError(false);
    } else {
      setError(true);
    }
  };

  if (!authenticated) {
    return (
      <div className="min-h-[calc(100vh-4rem)] bg-offwhite flex items-center justify-center px-4">
        <div className="bg-white border border-border-light shadow-technical p-10 w-full max-w-sm text-center">
          <div className="w-12 h-12 bg-navy mx-auto flex items-center justify-center mb-6">
            <Lock size={20} className="text-white" />
          </div>
          <h1 className="font-display text-xl font-700 text-navy mb-2">
            Partner Guide
          </h1>
          <p className="font-body text-sm text-smoke mb-8">
            Interner Bereich. Bitte Passwort eingeben.
          </p>
          <form onSubmit={handleLogin} className="space-y-4">
            <input
              type="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setError(false);
              }}
              placeholder="Passwort"
              className={[
                "w-full px-4 py-3 bg-offwhite border focus:outline-none font-body text-sm text-center tracking-widest transition-colors",
                error ? "border-red-400" : "border-border-light focus:border-navy",
              ].join(" ")}
              autoFocus
            />
            {error && (
              <p className="font-mono text-xs text-red-500">
                Falsches Passwort. Bitte erneut versuchen.
              </p>
            )}
            <button
              type="submit"
              className="w-full py-3 bg-navy text-white font-display text-sm font-600 hover:bg-steel transition-colors duration-200"
            >
              Zugang
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-offwhite min-h-screen">
      {/* Internal warning banner */}
      <div className="bg-gold/15 border-b border-gold/30 py-3">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 flex items-center gap-3">
          <AlertTriangle size={16} className="text-gold flex-shrink-0" />
          <p className="font-mono text-xs text-charcoal">
            INTERNER LEITFADEN — NICHT FÜR KUNDEN — Nur für autorisierte Partner
          </p>
        </div>
      </div>

      {/* Page header */}
      <div className="bg-navy py-12">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <h1 className="font-display text-3xl sm:text-4xl font-800 text-white tracking-tight mb-2">
            Partner-Leitfaden
          </h1>
          <p className="font-body text-white/60">
            Strukturiertes Wissen für den DACH-Partner — wie Taktral erklärt und verkauft wird.
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-12 space-y-16">

        {/* Section 1: Services explained */}
        <section>
          <div className="flex items-center gap-3 mb-8">
            <div className="w-8 h-8 bg-navy flex items-center justify-center flex-shrink-0">
              <Globe size={14} className="text-white" />
            </div>
            <h2 className="font-display text-xl font-700 text-navy">
              01 — Leistungen einfach erklärt
            </h2>
          </div>
          <div className="space-y-6">
            {servicesData.map((service) => {
              const data = service.de;
              return (
                <div
                  key={service.id}
                  className="bg-white border border-border-light p-6"
                >
                  <h3 className="font-display text-base font-700 text-navy mb-1">
                    {data.title}
                  </h3>
                  <p className="font-mono text-xs text-gold uppercase tracking-wider mb-4">
                    {data.tagline}
                  </p>
                  <div className="bg-frost border-l-4 border-gold p-4 mb-4">
                    <p className="font-mono text-[11px] text-gold uppercase tracking-widest mb-2">
                      So erklären Sie es dem Kunden:
                    </p>
                    <p className="font-body text-sm text-charcoal leading-relaxed">
                      {data.simpleExplanation}
                    </p>
                  </div>
                  <div className="bg-navy/5 p-4">
                    <p className="font-mono text-[11px] text-smoke uppercase tracking-widest mb-2">
                      Typische Kundenaussage:
                    </p>
                    <p className="font-body text-sm text-charcoal italic">
                      &ldquo;{data.clientQuestion}&rdquo;
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Section 2: Pricing */}
        <section>
          <div className="flex items-center gap-3 mb-8">
            <div className="w-8 h-8 bg-navy flex items-center justify-center flex-shrink-0">
              <DollarSign size={14} className="text-white" />
            </div>
            <h2 className="font-display text-xl font-700 text-navy">
              02 — Preisrahmen nach Leistung
            </h2>
          </div>
          <div className="bg-white border border-border-light overflow-hidden">
            <table className="w-full">
              <thead className="bg-navy text-white">
                <tr>
                  <th className="text-left px-6 py-3 font-mono text-[11px] uppercase tracking-widest">
                    Leistung
                  </th>
                  <th className="text-left px-6 py-3 font-mono text-[11px] uppercase tracking-widest">
                    Preisrahmen
                  </th>
                  <th className="text-left px-6 py-3 font-mono text-[11px] uppercase tracking-widest">
                    Komplexität
                  </th>
                </tr>
              </thead>
              <tbody>
                {pricingRanges.map((row, i) => (
                  <tr
                    key={i}
                    className={i % 2 === 0 ? "bg-white" : "bg-frost/50"}
                  >
                    <td className="px-6 py-4 font-body text-sm text-navy font-500">
                      {row.service}
                    </td>
                    <td className="px-6 py-4 font-mono text-sm text-gold font-600">
                      {row.range}
                    </td>
                    <td className="px-6 py-4 font-mono text-xs text-smoke">
                      {row.complexity}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="px-6 py-4 bg-frost/50 border-t border-border-light">
              <p className="font-body text-xs text-smoke">
                <strong>Wichtig:</strong> Diese Zahlen sind Richtwerte. Jedes Projekt wird individuell bewertet.
                Nennen Sie dem Kunden immer Spannen — nie Einzelpreise. Festpreisangebote gibt es erst nach der Analyse-Phase.
              </p>
            </div>
          </div>
        </section>

        {/* Section 3: Qualification questions */}
        <section>
          <div className="flex items-center gap-3 mb-8">
            <div className="w-8 h-8 bg-navy flex items-center justify-center flex-shrink-0">
              <HelpCircle size={14} className="text-white" />
            </div>
            <h2 className="font-display text-xl font-700 text-navy">
              03 — Qualifizierungsfragen für Potenzial-Kunden
            </h2>
          </div>
          <div className="bg-white border border-border-light p-6">
            <p className="font-body text-sm text-smoke mb-6 leading-relaxed">
              Stellen Sie diese Fragen im Erstgespräch, um zu verstehen, ob der Kunde zu Taktral passt und welches Projekt realistisch ist:
            </p>
            <ul className="space-y-3" role="list">
              {qualificationQuestions.map((q, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="font-mono text-[10px] text-gold mt-1 flex-shrink-0">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <p className="font-body text-sm text-charcoal">{q}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Section 4: Red flags */}
        <section>
          <div className="flex items-center gap-3 mb-8">
            <div className="w-8 h-8 bg-red-600 flex items-center justify-center flex-shrink-0">
              <AlertTriangle size={14} className="text-white" />
            </div>
            <h2 className="font-display text-xl font-700 text-navy">
              04 — Ausschlusskriterien (Red Flags)
            </h2>
          </div>
          <div className="bg-white border border-border-light p-6">
            <p className="font-body text-sm text-smoke mb-6 leading-relaxed">
              Wenn eines der folgenden Zeichen auftaucht, ist Vorsicht geboten. Notieren Sie dies und besprechen Sie intern, bevor Sie ein Angebot machen:
            </p>
            <ul className="space-y-3" role="list">
              {redFlags.map((flag, i) => (
                <li key={i} className="flex items-start gap-3">
                  <AlertTriangle
                    size={14}
                    className="text-red-500 flex-shrink-0 mt-0.5"
                  />
                  <p className="font-body text-sm text-charcoal">{flag}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Section 5: Remote team explanation */}
        <section>
          <div className="flex items-center gap-3 mb-8">
            <div className="w-8 h-8 bg-navy flex items-center justify-center flex-shrink-0">
              <Users size={14} className="text-white" />
            </div>
            <h2 className="font-display text-xl font-700 text-navy">
              05 — Remote-Team erklären
            </h2>
          </div>
          <div className="bg-white border border-border-light p-6 space-y-6">
            <div>
              <p className="font-mono text-[11px] text-gold uppercase tracking-widest mb-3">
                Wenn der Kunde fragt: &ldquo;Wo sitzt das Team?&rdquo;
              </p>
              <div className="bg-frost border-l-4 border-gold p-4">
                <p className="font-body text-sm text-charcoal leading-relaxed">
                  &ldquo;Unser Entwicklungsteam arbeitet remote — das ist heute bei den besten Tech-Firmen Europas der Standard. Ihr direkter Ansprechpartner für das Projekt bin ich, von hier aus [Österreich/DACH]. Ich koordiniere alles, bin für Meetings und Calls erreichbar und verantworte das Ergebnis Ihnen gegenüber persönlich. Das Entwicklungsteam kennen Sie vielleicht nicht beim Namen — aber Sie kennen das Resultat.&rdquo;
                </p>
              </div>
            </div>
            <div>
              <p className="font-mono text-[11px] text-gold uppercase tracking-widest mb-3">
                Wenn der Kunde zweifelt wegen Qualität:
              </p>
              <div className="bg-frost border-l-4 border-gold p-4">
                <p className="font-body text-sm text-charcoal leading-relaxed">
                  &ldquo;Die Codequalität sichern wir durch Festpreisangebote, schriftliche Spezifikationen und Staging-Umgebungen. Sie testen, bevor es live geht. Und: Jedes Projekt wird vollständig dokumentiert übergeben — Sie sind nie von uns abhängig. Das ist unser Qualitätsversprechen.&rdquo;
                </p>
              </div>
            </div>
            <div className="bg-navy/5 p-4">
              <p className="font-mono text-[11px] text-smoke uppercase tracking-widest mb-2">
                Wichtige Punkte:
              </p>
              <ul className="space-y-2" role="list">
                {[
                  "Der DACH-Partner (Sie) ist der sichtbare Ansprechpartner — das Team bleibt im Hintergrund",
                  "Meetings immer auf Deutsch führen — der Kunde kommuniziert nie direkt auf Englisch mit dem Technikteam",
                  "Referenzen werden auf Anfrage zur Verfügung gestellt",
                  "Bei Bedarf kann ein Video-Call mit dem Tech-Lead auf Deutsch/Englisch arrangiert werden",
                ].map((point, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <CheckCircle2 size={13} className="text-gold flex-shrink-0 mt-0.5" />
                    <span className="font-body text-sm text-charcoal">{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
}
