"use client";

import { useState } from "react";
import Link from "next/link";
import {
  List,
  LayoutGrid,
  Plus,
  Search,
  MoreHorizontal,
  Calendar,
  ChevronLeft,
  ChevronRight,
  AlertTriangle,
  CheckCircle,
} from "lucide-react";

// ─── Data ────────────────────────────────────────────────────────────────────

const allProjects = [
  { id: "P-1024", name: "Alpha System Redesign", client: "Globex Corp", type: "ENG", status: "LAUFEND", statusColor: "text-emerald-600 bg-emerald-50", start: "01.03.24", deadline: "15.06.24", budget: "€45.000", leiter: "SR", completion: 65, priority: null },
  { id: "P-1023", name: "Beta App Dev", client: "Acme Inc.", type: "SOFT", status: "GEPLANT", statusColor: "text-blue-600 bg-blue-50", start: "10.03.24", deadline: "20.08.24", budget: "€22.500", leiter: "MK", completion: 10, priority: null },
  { id: "P-1022", name: "Gamma Cloud Mig", client: "Umbrella Corp", type: "INFRA", status: "VERZÖGERT", statusColor: "text-red-600 bg-red-50", start: "15.02.24", deadline: "30.05.24", budget: "€120.000", leiter: "JB", completion: 45, priority: "overdue" },
  { id: "P-1021", name: "Delta Sec Audit", client: "Massive Dynamic", type: "SEC", status: "FERTIG", statusColor: "text-smoke bg-frost", start: "01.01.24", deadline: "28.02.24", budget: "€15.000", leiter: "SR", completion: 100, priority: null },
  { id: "P-1020", name: "Epsilon UX/UI", client: "Cyberdyne", type: "DESIGN", status: "LAUFEND", statusColor: "text-emerald-600 bg-emerald-50", start: "20.03.24", deadline: "10.07.24", budget: "€30.000", leiter: "AB", completion: 30, priority: null },
  { id: "P-1019", name: "Zeta Data Lake", client: "InGen", type: "DATA", status: "REVIEW", statusColor: "text-amber-600 bg-amber-50", start: "05.02.24", deadline: "12.04.24", budget: "€85.000", leiter: "MK", completion: 90, priority: null },
  { id: "P-1018", name: "Eta API Gateway", client: "Stark Ind.", type: "BACKEND", status: "LAUFEND", statusColor: "text-emerald-600 bg-emerald-50", start: "12.03.24", deadline: "01.09.24", budget: "€55.000", leiter: "JB", completion: 20, priority: null },
  { id: "P-1017", name: "Theta Mobile App", client: "Wayne Ent.", type: "MOBILE", status: "GEPLANT", statusColor: "text-blue-600 bg-blue-50", start: "01.04.24", deadline: "15.10.24", budget: "€60.000", leiter: "SR", completion: 0, priority: null },
];

// Kanban data
const kanbanColumns = [
  {
    id: "anfrage",
    label: "ANFRAGE",
    count: 3,
    cards: [
      { id: "#REQ-204", name: "Projekt Alpha – Auto", client: "Nexus Corp", tag: "HIGH PRIORITY", tagColor: "bg-gold/20 text-gold border-gold/30", date: "15. Nov", avatar: "SR" },
      { id: "#REQ-209", name: "CRM Integration", client: "Global Logistics", tag: "€25K BUDGET", tagColor: "bg-blue-50 text-blue-600 border-blue-200", date: "22. Nov", avatar: "MK" },
      { id: "#REQ-210", name: "API Gateway", client: "FinTech Sol.", tag: null, date: "01. Dez", avatar: "JB" },
    ],
  },
  {
    id: "in-bearbeitung",
    label: "IN BEARBEITUNG",
    count: 2,
    cards: [
      { id: "#DEV-106", name: "Server Migration", client: "Taktral Internal", tag: "URGENT", tag2: "INFRA", tagColor: "bg-red-50 text-red-600 border-red-200", date: "2 Days left", avatar: "AB", progress: true },
      { id: "#DEV-112", name: "Frontend Refactor", client: "Nexus Corp", tag: null, date: "30. Nov", avatar: "JS" },
    ],
  },
  {
    id: "review",
    label: "REVIEW",
    count: 4,
    cards: [
      { id: "#QA-088", name: "Security Audit", client: "BankTrust", tag: "CRITICAL", tagColor: "bg-red-50 text-red-600 border-red-200", date: "Due Today", avatar: "MK", overdue: true },
      { id: "#QA-091", name: "UX Design Review", client: "StartUp Inc.", tag: null, note: "Bitte die Farben im Dark Mode prüfen...", date: "18. Nov", avatar: "AB" },
    ],
  },
  {
    id: "abgeschlossen",
    label: "ABGESCHLOSSEN",
    count: 5,
    cards: [
      { id: "#DONE", name: "Phase 2 Complete", client: "Kunde: E.", tag: "DONE", tagColor: "bg-emerald-50 text-emerald-600 border-emerald-200", date: "Completed" },
      { id: "#DONE-2", name: "Initial Kickoff", client: "Kunde: R.", tag: "DONE", tagColor: "bg-emerald-50 text-emerald-600 border-emerald-200", date: "Completed" },
    ],
  },
];

type ViewMode = "table" | "kanban";

// ─── Component ───────────────────────────────────────────────────────────────

export default function AdminProjectsPage() {
  const [view, setView] = useState<ViewMode>("table");
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("Alle");
  const [page, setPage] = useState(1);

  const filtered = allProjects.filter((p) => {
    const matchSearch =
      !search ||
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.client.toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === "Alle" || p.status === statusFilter;
    return matchSearch && matchStatus;
  });

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl font-700 text-navy">Projekte</h1>
          <p className="font-body text-sm text-smoke mt-0.5">
            Verwalten Sie alle laufenden und abgeschlossenen Projekte.
          </p>
        </div>
        <button
          type="button"
          className="inline-flex items-center gap-2 bg-navy text-white px-4 py-2.5 font-mono text-xs hover:bg-steel transition-colors"
        >
          <Plus size={14} />
          Neues Projekt
        </button>
      </div>

      {/* Toolbar */}
      <div className="bg-white border border-[#E5E9F0] p-4 flex flex-wrap items-center gap-3">
        {/* Filters */}
        <div className="flex items-center gap-2">
          <span className="font-mono text-xs text-smoke">Status:</span>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="font-body text-sm text-charcoal border border-[#E5E9F0] px-3 py-1.5 bg-white focus:outline-none focus:border-navy"
          >
            {["Alle", "LAUFEND", "GEPLANT", "REVIEW", "VERZÖGERT", "FERTIG"].map((s) => (
              <option key={s}>{s}</option>
            ))}
          </select>
        </div>
        <div className="flex items-center gap-2">
          <span className="font-mono text-xs text-smoke">Kunde:</span>
          <select className="font-body text-sm text-charcoal border border-[#E5E9F0] px-3 py-1.5 bg-white focus:outline-none focus:border-navy">
            <option>Alle</option>
          </select>
        </div>
        <div className="flex items-center gap-2">
          <span className="font-mono text-xs text-smoke">Zeitraum:</span>
          <button
            type="button"
            className="inline-flex items-center gap-2 font-body text-sm text-charcoal border border-[#E5E9F0] px-3 py-1.5 bg-white hover:border-navy transition-colors"
          >
            <Calendar size={13} />
            Diesen Monat
          </button>
        </div>

        {/* Search */}
        <div className="ml-auto relative">
          <Search size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-smoke/50" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Suchen..."
            className="pl-9 pr-4 py-1.5 border border-[#E5E9F0] font-body text-sm focus:outline-none focus:border-navy bg-[#F8FAFC] w-48"
          />
        </div>

        {/* View toggle */}
        <div className="flex border border-[#E5E9F0]">
          <button
            type="button"
            onClick={() => setView("table")}
            className={["p-2 transition-colors", view === "table" ? "bg-navy text-white" : "text-smoke hover:text-navy"].join(" ")}
            aria-label="Tabellenansicht"
          >
            <List size={15} />
          </button>
          <button
            type="button"
            onClick={() => setView("kanban")}
            className={["p-2 transition-colors border-l border-[#E5E9F0]", view === "kanban" ? "bg-navy text-white" : "text-smoke hover:text-navy"].join(" ")}
            aria-label="Kanban-Ansicht"
          >
            <LayoutGrid size={15} />
          </button>
        </div>
      </div>

      {/* View tabs (visual only) */}
      <div className="flex gap-0 border-b border-[#E5E9F0]">
        {[
          { id: "table", label: "Tabellenansicht", icon: List },
          { id: "kanban", label: "Kanban-Board", icon: LayoutGrid },
        ].map((t) => (
          <button
            key={t.id}
            type="button"
            onClick={() => setView(t.id as ViewMode)}
            className={[
              "inline-flex items-center gap-2 px-5 py-3 font-mono text-xs transition-colors border-b-2",
              view === t.id
                ? "border-gold text-navy font-600"
                : "border-transparent text-smoke hover:text-navy",
            ].join(" ")}
          >
            <t.icon size={13} />
            {t.label}
          </button>
        ))}
      </div>

      {/* ── TABLE VIEW ───────────────────────────────────────────────────────── */}
      {view === "table" && (
        <div className="bg-white border border-[#E5E9F0]">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-[#E5E9F0] bg-[#F8FAFC]">
                  {["#", "PROJEKTNAME", "KUNDE", "TYP", "STATUS", "START", "DEADLINE", "BUDGET", "LEITER"].map((h) => (
                    <th
                      key={h}
                      className="text-left px-5 py-3 font-mono text-[10px] text-smoke uppercase tracking-wider whitespace-nowrap"
                    >
                      {h}
                    </th>
                  ))}
                  <th className="px-5 py-3" />
                </tr>
              </thead>
              <tbody>
                {filtered.map((p, i) => (
                  <tr
                    key={p.id}
                    className={[
                      "border-b border-[#E5E9F0] hover:bg-[#F8FAFC] transition-colors",
                      i === filtered.length - 1 ? "border-b-0" : "",
                    ].join(" ")}
                  >
                    <td className="px-5 py-3">
                      <span className="font-mono text-[10px] text-smoke/50">{p.id}</span>
                    </td>
                    <td className="px-5 py-3">
                      <Link
                        href={`/admin/projects/${p.id}`}
                        className="font-body text-sm font-600 text-navy hover:text-gold transition-colors"
                      >
                        {p.name}
                      </Link>
                    </td>
                    <td className="px-5 py-3">
                      <span className="font-body text-sm text-charcoal">{p.client}</span>
                    </td>
                    <td className="px-5 py-3">
                      <span className="font-mono text-[10px] text-smoke bg-frost px-2 py-0.5">
                        {p.type}
                      </span>
                    </td>
                    <td className="px-5 py-3">
                      <span className={`font-mono text-[10px] uppercase tracking-wider px-2 py-0.5 ${p.statusColor}`}>
                        {p.status}
                      </span>
                    </td>
                    <td className="px-5 py-3">
                      <span className="font-mono text-xs text-smoke">{p.start}</span>
                    </td>
                    <td className="px-5 py-3">
                      <span
                        className={[
                          "font-mono text-xs font-600",
                          p.priority === "overdue" ? "text-red-500" : "text-smoke",
                        ].join(" ")}
                      >
                        {p.deadline}
                      </span>
                    </td>
                    <td className="px-5 py-3">
                      <span className="font-mono text-sm text-navy font-600">{p.budget}</span>
                    </td>
                    <td className="px-5 py-3">
                      <div className="w-8 h-8 bg-navy flex items-center justify-center">
                        <span className="font-mono text-[10px] font-700 text-white">{p.leiter}</span>
                      </div>
                    </td>
                    <td className="px-5 py-3">
                      <button
                        type="button"
                        className="text-smoke/40 hover:text-navy transition-colors"
                        aria-label="Aktionen"
                      >
                        <MoreHorizontal size={15} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="px-5 py-3 border-t border-[#E5E9F0] flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs text-smoke">Zeige</span>
              <select className="font-mono text-xs border border-[#E5E9F0] px-2 py-1 focus:outline-none">
                <option>10</option>
                <option>25</option>
                <option>50</option>
              </select>
              <span className="font-mono text-xs text-smoke">von 42 Einträgen</span>
            </div>
            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                className="w-8 h-8 flex items-center justify-center border border-[#E5E9F0] text-smoke hover:text-navy transition-colors"
              >
                <ChevronLeft size={13} />
              </button>
              {[1, 2, 3].map((n) => (
                <button
                  key={n}
                  type="button"
                  onClick={() => setPage(n)}
                  className={[
                    "w-8 h-8 font-mono text-xs transition-colors",
                    page === n ? "bg-navy text-white" : "border border-[#E5E9F0] text-smoke hover:text-navy",
                  ].join(" ")}
                >
                  {n}
                </button>
              ))}
              <span className="font-mono text-xs text-smoke px-1">…</span>
              <button
                type="button"
                className="w-8 h-8 font-mono text-xs border border-[#E5E9F0] text-smoke hover:text-navy"
              >
                5
              </button>
              <button
                type="button"
                onClick={() => setPage((p) => p + 1)}
                className="w-8 h-8 flex items-center justify-center border border-[#E5E9F0] text-smoke hover:text-navy transition-colors"
              >
                <ChevronRight size={13} />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── KANBAN VIEW ──────────────────────────────────────────────────────── */}
      {view === "kanban" && (
        <div className="overflow-x-auto pb-4">
          <div className="flex gap-4 min-w-max">
            {kanbanColumns.map((col) => (
              <div key={col.id} className="w-64 flex flex-col gap-3">
                {/* Column header */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-[10px] text-smoke uppercase tracking-wider">
                      {col.label}
                    </span>
                    <span className="w-5 h-5 bg-[#E5E9F0] flex items-center justify-center font-mono text-[10px] text-smoke">
                      {col.count}
                    </span>
                  </div>
                  <button type="button" className="text-smoke/40 hover:text-navy transition-colors">
                    <MoreHorizontal size={14} />
                  </button>
                </div>

                {/* Cards */}
                <div className="space-y-3">
                  {col.cards.map((card) => (
                    <div
                      key={card.id}
                      className="bg-white border border-[#E5E9F0] hover:border-navy hover:shadow-sm transition-all duration-200 p-4 space-y-3"
                    >
                      <div className="flex items-start justify-between gap-2">
                        <p className="font-mono text-[10px] text-smoke/50">{card.id}</p>
                        <button type="button" className="text-smoke/30 hover:text-smoke flex-shrink-0">
                          <MoreHorizontal size={13} />
                        </button>
                      </div>

                      <div>
                        <p className="font-body text-sm font-600 text-navy leading-snug">
                          {card.name}
                        </p>
                        <p className="font-body text-xs text-smoke mt-0.5">{card.client}</p>
                      </div>

                      {/* Tags */}
                      <div className="flex flex-wrap gap-1.5">
                        {card.tag && (
                          <span className={`font-mono text-[9px] uppercase tracking-wider px-2 py-0.5 border ${card.tagColor}`}>
                            {card.tag}
                          </span>
                        )}
                        {"tag2" in card && card.tag2 && (
                          <span className="font-mono text-[9px] uppercase tracking-wider px-2 py-0.5 border bg-frost text-smoke border-border-light">
                            {card.tag2 as string}
                          </span>
                        )}
                      </div>

                      {/* Progress bar (for in-progress) */}
                      {"progress" in card && card.progress && (
                        <div className="space-y-1">
                          <div className="h-1 bg-frost overflow-hidden">
                            <div className="h-full w-3/5 bg-navy" />
                          </div>
                        </div>
                      )}

                      {/* Note */}
                      {"note" in card && card.note && (
                        <p className="font-body text-xs text-smoke/60 italic leading-snug">
                          &ldquo;{card.note as string}&rdquo;
                        </p>
                      )}

                      {/* Footer */}
                      <div className="flex items-center justify-between pt-1 border-t border-[#F0F3F9]">
                        <div className="flex items-center gap-1.5">
                          {"overdue" in card && card.overdue ? (
                            <AlertTriangle size={11} className="text-red-500" />
                          ) : (
                            <Calendar size={11} className="text-smoke/40" />
                          )}
                          <span
                            className={[
                              "font-mono text-[10px]",
                              "overdue" in card && card.overdue ? "text-red-500 font-600" : "text-smoke/60",
                            ].join(" ")}
                          >
                            {card.date}
                          </span>
                        </div>
                        {"avatar" in card && card.avatar && (
                          <div className="w-6 h-6 bg-navy flex items-center justify-center">
                            <span className="font-mono text-[9px] font-700 text-white">
                              {card.avatar as string}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}

                  {/* Add card button */}
                  <button
                    type="button"
                    className="w-full py-2.5 border border-dashed border-[#E5E9F0] font-mono text-[10px] text-smoke/50 hover:border-navy hover:text-navy transition-colors"
                  >
                    + NEUE KARTE
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
