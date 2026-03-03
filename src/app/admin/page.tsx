import { TrendingUp, TrendingDown, Minus, FolderOpen, Users, CheckCircle, Euro } from "lucide-react";
import Link from "next/link";

const kpis = [
  {
    label: "Gesamtumsatz",
    value: "€1.2M",
    trend: "+12%",
    trendUp: true,
    icon: Euro,
    note: "vs last month",
  },
  {
    label: "Neue Anfragen",
    value: "42",
    trend: "+5%",
    trendUp: true,
    icon: FolderOpen,
    note: "vs last month",
  },
  {
    label: "Abschlussquote",
    value: "68%",
    trend: "-2%",
    trendUp: false,
    icon: CheckCircle,
    note: "vs last month",
  },
  {
    label: "Ø Projektgröße",
    value: "€28.5k",
    trend: "+8%",
    trendUp: true,
    icon: Euro,
    note: "vs last month",
  },
  {
    label: "Aktive Kunden",
    value: "156",
    trend: "+15%",
    trendUp: true,
    icon: Users,
    note: "vs last month",
  },
];

const recentProjects = [
  { id: "P-1024", name: "Alpha System Redesign", client: "Globex Corp", service: "ENG", status: "LAUFEND", statusColor: "text-emerald-600 bg-emerald-50", start: "01.03.24", deadline: "15.06.24", budget: "€45.000", completion: 65 },
  { id: "P-1023", name: "Beta App Dev", client: "Acme Inc.", service: "SOFT", status: "GEPLANT", statusColor: "text-blue-600 bg-blue-50", start: "10.03.24", deadline: "20.08.24", budget: "€22.500", completion: 10 },
  { id: "P-1022", name: "Gamma Cloud Mig", client: "Umbrella Corp", service: "INFRA", status: "VERZÖGERT", statusColor: "text-red-600 bg-red-50", start: "15.02.24", deadline: "30.05.24", budget: "€120.000", completion: 45 },
  { id: "P-1021", name: "Delta Sec Audit", client: "Massive Dynamic", service: "SEC", status: "FERTIG", statusColor: "text-smoke bg-frost", start: "01.01.24", deadline: "28.02.24", budget: "€15.000", completion: 100 },
  { id: "P-1020", name: "Epsilon UX/UI", client: "Cyberdyne", service: "DESIGN", status: "LAUFEND", statusColor: "text-emerald-600 bg-emerald-50", start: "20.03.24", deadline: "10.07.24", budget: "€30.000", completion: 30 },
];

const serviceDistribution = [
  { name: "Systems Engineering", pct: 45 },
  { name: "Data Analytics", pct: 28 },
  { name: "Cloud Architecture", pct: 15 },
  { name: "Consulting", pct: 12 },
];

const revenueMonths = ["Jan", "Feb", "Mar", "Apr", "Mai", "Jun", "Jul", "Aug", "Sep", "Okt", "Nov", "Dez"];
const revenueData =    [28, 35, 42, 38, 55, 62, 58, 70, 75, 90, 110, 125];
const revenuePrevYear = [22, 28, 35, 30, 42, 48, 45, 55, 60, 72, 88, 100];
const maxRevenue = Math.max(...revenueData);

export default function AdminDashboard() {
  return (
    <div className="space-y-6">
      {/* Page header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl font-700 text-navy">Analytics Overview</h1>
          <p className="font-body text-sm text-smoke mt-1">Taktral interne Übersicht</p>
        </div>
        <div className="flex items-center gap-2">
          {["This Week", "This Month", "This Quarter", "Custom"].map((t, i) => (
            <button
              key={t}
              type="button"
              className={[
                "font-mono text-xs px-3 py-1.5 transition-colors",
                i === 1
                  ? "bg-navy text-white"
                  : "text-smoke hover:text-navy border border-[#E5E9F0] bg-white",
              ].join(" ")}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      {/* KPI cards */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
        {kpis.map((kpi) => (
          <div key={kpi.label} className="bg-white border border-[#E5E9F0] p-5 space-y-3">
            <div className="flex items-center justify-between">
              <p className="font-body text-xs text-smoke">{kpi.label}</p>
              <kpi.icon size={14} className="text-smoke/40" />
            </div>
            <p className="font-display text-2xl font-800 text-navy">{kpi.value}</p>
            <div className="flex items-center gap-1">
              {kpi.trendUp ? (
                <TrendingUp size={11} className="text-emerald-500" />
              ) : (
                <TrendingDown size={11} className="text-red-400" />
              )}
              <span
                className={[
                  "font-mono text-[10px]",
                  kpi.trendUp ? "text-emerald-600" : "text-red-500",
                ].join(" ")}
              >
                {kpi.trend}
              </span>
              <span className="font-mono text-[10px] text-smoke/50">{kpi.note}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Revenue chart + Service distribution */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Revenue chart */}
        <div className="lg:col-span-2 bg-white border border-[#E5E9F0] p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="font-display text-base font-700 text-navy">Revenue Trends</h2>
              <p className="font-body text-xs text-smoke mt-0.5">
                Comparing current year vs previous year performance
              </p>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1.5">
                <div className="w-3 h-3 bg-navy" />
                <span className="font-mono text-[10px] text-smoke">2023</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-3 h-3 border border-dashed border-smoke/40" />
                <span className="font-mono text-[10px] text-smoke">2022</span>
              </div>
            </div>
          </div>

          {/* Simple bar + line chart */}
          <div className="relative h-48">
            <div className="absolute inset-0 flex items-end gap-1">
              {revenueData.map((val, i) => (
                <div key={i} className="flex-1 flex flex-col items-center gap-1">
                  {/* Current year bar */}
                  <div
                    className={[
                      "w-full transition-all",
                      i === 10 ? "bg-gold" : "bg-navy/20",
                    ].join(" ")}
                    style={{ height: `${(val / maxRevenue) * 100}%` }}
                  />
                </div>
              ))}
            </div>
            {/* Y axis labels */}
            <div className="absolute left-0 top-0 h-full flex flex-col justify-between pointer-events-none">
              {["€150k", "€112k", "€75k", "€37k", "€0"].map((l) => (
                <span key={l} className="font-mono text-[9px] text-smoke/40">{l}</span>
              ))}
            </div>
          </div>

          {/* X axis */}
          <div className="flex gap-1 mt-2">
            {revenueMonths.map((m) => (
              <div key={m} className="flex-1 text-center">
                <span className="font-mono text-[9px] text-smoke/50">{m}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Service distribution */}
        <div className="bg-white border border-[#E5E9F0] p-6">
          <h2 className="font-display text-base font-700 text-navy mb-6">Service Distribution</h2>
          <div className="space-y-4">
            {serviceDistribution.map((s) => (
              <div key={s.name} className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="font-body text-xs text-charcoal">{s.name}</span>
                  <span className="font-mono text-xs text-navy font-600">{s.pct}%</span>
                </div>
                <div className="h-1.5 bg-frost overflow-hidden">
                  <div
                    className="h-full bg-navy transition-all duration-500"
                    style={{ width: `${s.pct}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Projects table */}
      <div className="bg-white border border-[#E5E9F0]">
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#E5E9F0]">
          <h2 className="font-display text-base font-700 text-navy">Recent Projects</h2>
          <Link
            href="/admin/projects"
            className="font-mono text-xs text-gold hover:text-navy transition-colors uppercase tracking-wider"
          >
            View All
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-[#E5E9F0]">
                {["PROJECT NAME", "CLIENT", "SERVICE", "BUDGET", "STATUS", "COMPLETION"].map((h) => (
                  <th
                    key={h}
                    className="text-left px-6 py-3 font-mono text-[10px] text-smoke uppercase tracking-wider"
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {recentProjects.map((p, i) => (
                <tr
                  key={p.id}
                  className={[
                    "border-b border-[#E5E9F0] hover:bg-[#F8FAFC] transition-colors",
                    i === recentProjects.length - 1 ? "border-b-0" : "",
                  ].join(" ")}
                >
                  <td className="px-6 py-4">
                    <Link href={`/admin/projects/${p.id}`} className="hover:text-gold transition-colors">
                      <p className="font-body text-sm font-600 text-navy">{p.name}</p>
                      <p className="font-mono text-[10px] text-smoke/50">{p.id}</p>
                    </Link>
                  </td>
                  <td className="px-6 py-4">
                    <span className="font-body text-sm text-steel hover:underline cursor-pointer">
                      {p.client}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="font-mono text-[10px] text-smoke bg-frost px-2 py-0.5">
                      {p.service}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="font-mono text-sm text-navy font-600">{p.budget}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`font-mono text-[10px] uppercase tracking-wider px-2 py-0.5 ${p.statusColor}`}>
                      {p.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3 min-w-[80px]">
                      <div className="flex-1 h-1.5 bg-frost overflow-hidden">
                        <div
                          className="h-full bg-navy transition-all"
                          style={{ width: `${p.completion}%` }}
                        />
                      </div>
                      <span className="font-mono text-[10px] text-smoke flex-shrink-0">
                        {p.completion}%
                      </span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="px-6 py-3 border-t border-[#E5E9F0]">
          <p className="font-mono text-[10px] text-smoke/50">
            Showing 5 of 145 active projects
          </p>
        </div>
      </div>
    </div>
  );
}
