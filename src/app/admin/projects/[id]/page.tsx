import Link from "next/link";
import {
  ArrowLeft,
  Edit,
  Plus,
  Paperclip,
  Activity,
  CheckCircle2,
  Clock,
  AlertTriangle,
  Share2,
  Flag,
  Users,
  BarChart2,
  Download,
} from "lucide-react";

// Static demo project data
const project = {
  id: "P-1022",
  name: "Quantum Grid Implementation",
  status: "IN PROGRESS",
  statusColor: "text-amber-400 bg-amber-400/10 border-amber-400/30",
  client: "EnerGrid Solutions",
  type: "Infrastructure / R&D",
  budget: "$1,250,000",
  timeline: { start: "Sep 01, 2023", end: "Feb 26, 2024" },
  health: "On Track",
  healthColor: "text-emerald-400",
  sprint: { label: "Sprint 3 of 4", tasks: 14, completed: 10 },
  description:
    "Development of a comprehensive digital twin system for the new energy grid infrastructure. This project involves real-time server architecture, real-time data integration, and predictive maintenance modeling using AI algorithms. The goal is to reduce downtime by 40% and optimize load distribution across the regional substations.",
  keyDeliverables:
    "Key deliverables include the core simulation engine with mocked data sources for stress testing, the dashboard interface for operators, and the secure API gateway for sensor data ingestion.",
  milestones: [
    { title: "System Architecture Approval", date: "Completed: Oct 12, 2023", done: true },
    { title: "Alpha Prototype Release", desc: "Due: Nov 30, 2023 — Delivery of the simulation engine with mocked data sources for stress testing.", done: false, overdue: false },
    { title: "Client Beta Review", desc: "Due: Jan 01, 2024 — Access for the grid operators to gather UX feedback.", done: false, overdue: false },
    { title: "Final Deployment", desc: "Due: Feb 15, 2024 — Staged rollout to all regional control rooms.", done: false, overdue: false },
  ],
  attachments: [
    { name: "Tech_Spec_v2.pdf", size: "2.3 MB" },
    { name: "Server_Data_Map.csv", size: "847 KB" },
    { name: "Grid_Mockup_03.fig", size: "12.1 MB" },
  ],
  activity: [
    { user: "Sarah Jenkins", action: "uploaded a new file", file: "Tech_Spec_v2.pdf", time: "Oct 23, 16:22", avatar: "SJ" },
    { user: "Marcus Rios", action: "changed the status to", highlight: "IN PROGRESS", time: "Oct 22, 09:18", avatar: "MR" },
    { user: "System", action: "automatically backed up project data.", time: "Oct 21, 00:00", avatar: "SYS" },
    { user: "Sarah Jenkins", action: "Client approved the architectural draft.", time: "Oct 18, 14:05", avatar: "SJ" },
  ],
  team: [
    { name: "Sarah Jenkins", role: "Project Lead", avatar: "SJ", online: true },
    { name: "Marcus Rios", role: "Developer", avatar: "MR", online: false },
    { name: "A.B.", role: "Designer", avatar: "AB", online: true },
  ],
};

export default function AdminProjectDetailPage() {
  const sprintPct = Math.round((project.sprint.completed / project.sprint.tasks) * 100);

  return (
    <div className="min-h-screen bg-[#1A1F2E] text-white -m-6 p-6">
      {/* Top bar */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <Link
            href="/admin/projects"
            className="font-mono text-xs text-white/40 hover:text-white transition-colors inline-flex items-center gap-1.5"
          >
            <ArrowLeft size={12} />
            Projects
          </Link>
          <span className="text-white/20">/</span>
          <span className="font-mono text-xs text-white/60">Quantum Grid Implementation</span>
        </div>
        <div className="flex items-center gap-2">
          <span className={`font-mono text-[10px] uppercase tracking-wider px-3 py-1.5 border ${project.statusColor}`}>
            {project.status}
          </span>
          <span className="font-mono text-[10px] text-white/40">— Oct 2023</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* ── Left column ──────────────────────────────────────────────────── */}
        <div className="lg:col-span-2 space-y-6">
          {/* Header */}
          <div className="flex items-start justify-between gap-4">
            <div>
              <h1 className="font-display text-2xl lg:text-3xl font-800 text-white leading-tight">
                {project.name}
              </h1>
            </div>
            <div className="flex items-center gap-2 flex-shrink-0">
              <button
                type="button"
                className="inline-flex items-center gap-2 px-4 py-2 border border-white/20 font-mono text-xs text-white/70 hover:border-white/40 hover:text-white transition-colors"
              >
                <Edit size={12} />
                Edit
              </button>
              <button
                type="button"
                className="inline-flex items-center gap-2 px-4 py-2 bg-gold text-white font-mono text-xs hover:bg-gold/80 transition-colors"
              >
                <Plus size={12} />
                New Task
              </button>
            </div>
          </div>

          {/* Overview */}
          <div className="bg-white/5 border border-white/10 p-6 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-6 h-6 bg-gold/20 border border-gold/30 flex items-center justify-center flex-shrink-0">
                <Flag size={12} className="text-gold" />
              </div>
              <h2 className="font-display text-sm font-700 text-white">Project Overview</h2>
            </div>
            <p className="font-body text-sm text-white/60 leading-relaxed">
              {project.description}
            </p>
            <p className="font-body text-sm text-white/50 leading-relaxed">
              {project.keyDeliverables}
            </p>
          </div>

          {/* Milestones */}
          <div className="bg-white/5 border border-white/10 p-6 space-y-4">
            <div className="flex items-center gap-3 mb-2">
              <BarChart2 size={14} className="text-gold" />
              <h2 className="font-display text-sm font-700 text-white">Milestones</h2>
            </div>
            <div className="space-y-4">
              {project.milestones.map((m, i) => (
                <div key={i} className="flex gap-4">
                  <div className="flex flex-col items-center flex-shrink-0 mt-1">
                    <div
                      className={[
                        "w-4 h-4 flex items-center justify-center border",
                        m.done
                          ? "bg-emerald-500/20 border-emerald-500/40"
                          : "bg-white/5 border-white/20",
                      ].join(" ")}
                    >
                      {m.done && <CheckCircle2 size={10} className="text-emerald-400" />}
                    </div>
                    {i < project.milestones.length - 1 && (
                      <div className="w-px flex-1 bg-white/10 mt-1 min-h-[20px]" />
                    )}
                  </div>
                  <div className="flex-1 pb-2">
                    <div className="flex items-start justify-between gap-2">
                      <p
                        className={[
                          "font-display text-sm font-600 leading-snug",
                          m.done ? "text-white/40 line-through" : "text-white",
                        ].join(" ")}
                      >
                        {m.title}
                      </p>
                      {m.done && (
                        <span className="font-mono text-[9px] text-emerald-400 bg-emerald-400/10 px-2 py-0.5 flex-shrink-0">
                          Completed
                        </span>
                      )}
                    </div>
                    {m.desc && (
                      <p className="font-body text-xs text-white/40 leading-snug mt-1">{m.desc}</p>
                    )}
                    {m.done && (
                      <p className="font-mono text-[10px] text-white/30 mt-1">{m.date}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Attachments */}
          <div className="bg-white/5 border border-white/10 p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <Paperclip size={14} className="text-gold" />
                <h2 className="font-display text-sm font-700 text-white">Attachments</h2>
              </div>
              <button type="button" className="font-mono text-[10px] text-gold hover:text-white transition-colors uppercase tracking-wider">
                View All
              </button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {project.attachments.map((file) => (
                <div
                  key={file.name}
                  className="bg-white/5 border border-white/10 hover:border-white/25 transition-colors p-4 flex flex-col gap-2 group cursor-pointer"
                >
                  <div className="w-8 h-8 bg-gold/20 border border-gold/20 flex items-center justify-center">
                    <Paperclip size={12} className="text-gold" />
                  </div>
                  <p className="font-body text-xs text-white/80 leading-snug truncate">{file.name}</p>
                  <div className="flex items-center justify-between">
                    <p className="font-mono text-[10px] text-white/30">{file.size}</p>
                    <Download size={11} className="text-white/20 group-hover:text-gold transition-colors" />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Activity Log */}
          <div className="bg-white/5 border border-white/10 p-6">
            <div className="flex items-center gap-3 mb-5">
              <Activity size={14} className="text-gold" />
              <h2 className="font-display text-sm font-700 text-white">Activity Log</h2>
            </div>
            <div className="space-y-4">
              {project.activity.map((item, i) => (
                <div key={i} className="flex gap-4">
                  <div
                    className={[
                      "w-7 h-7 flex items-center justify-center flex-shrink-0 text-[10px] font-700",
                      item.avatar === "SYS"
                        ? "bg-white/10 text-white/40"
                        : "bg-navy/50 border border-white/20 text-white",
                    ].join(" ")}
                  >
                    {item.avatar === "SYS" ? "⚙" : item.avatar}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-body text-xs text-white/70 leading-snug">
                      <span className="text-white font-600">{item.user}</span>{" "}
                      {item.action}{" "}
                      {item.highlight && (
                        <span className="text-amber-400 font-600">{item.highlight}</span>
                      )}
                      {item.file && (
                        <span className="text-gold font-mono">{item.file}</span>
                      )}
                    </p>
                    <p className="font-mono text-[10px] text-white/25 mt-0.5">{item.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── Right column ─────────────────────────────────────────────────── */}
        <div className="space-y-4">
          {/* Project Details */}
          <div className="bg-white/5 border border-white/10 p-5 space-y-4">
            <h3 className="font-display text-sm font-700 text-white">Project Details</h3>
            <div className="space-y-3">
              {[
                { label: "Client", value: project.client, highlight: false },
                { label: "Type", value: project.type, highlight: false },
                { label: "Budget", value: project.budget, highlight: true },
                { label: "Timeline", value: `${project.timeline.start} → ${project.timeline.end}`, highlight: false },
                { label: "Health", value: project.health, highlight: true },
              ].map((row) => (
                <div key={row.label} className="flex items-start justify-between gap-3">
                  <span className="font-mono text-[10px] text-white/30 uppercase tracking-wider flex-shrink-0">
                    {row.label}
                  </span>
                  <span
                    className={[
                      "font-body text-xs text-right leading-snug",
                      row.highlight ? "text-gold font-600" : "text-white/70",
                    ].join(" ")}
                  >
                    {row.value}
                  </span>
                </div>
              ))}
            </div>
            <div className="flex gap-2 pt-2 border-t border-white/10">
              <button
                type="button"
                className="flex-1 inline-flex items-center justify-center gap-2 py-2 border border-white/20 font-mono text-[10px] text-white/60 hover:border-white/40 hover:text-white transition-colors"
              >
                <Share2 size={11} />
                Share
              </button>
              <button
                type="button"
                className="flex-1 inline-flex items-center justify-center gap-2 py-2 border border-white/20 font-mono text-[10px] text-white/60 hover:border-white/40 hover:text-white transition-colors"
              >
                <Flag size={11} />
                Report
              </button>
            </div>
          </div>

          {/* Weekly Sprint */}
          <div className="bg-white/5 border border-white/10 p-5 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-display text-sm font-700 text-white">Weekly Sprint</h3>
              <span className="font-mono text-[10px] text-white/30">{project.sprint.label}</span>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-mono text-[10px] text-white/40">
                  Tasks Complete: {project.sprint.completed}/{project.sprint.tasks}
                </span>
                <span className="font-mono text-[10px] text-gold">{sprintPct}%</span>
              </div>
              <div className="h-2 bg-white/10 overflow-hidden">
                <div
                  className="h-full bg-gold transition-all duration-500"
                  style={{ width: `${sprintPct}%` }}
                />
              </div>
            </div>
          </div>

          {/* Team */}
          <div className="bg-white/5 border border-white/10 p-5 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Users size={13} className="text-gold" />
                <h3 className="font-display text-sm font-700 text-white">Team</h3>
              </div>
              <button type="button" className="font-mono text-[10px] text-gold hover:text-white transition-colors">
                + Add
              </button>
            </div>
            <div className="space-y-3">
              {project.team.map((member) => (
                <div key={member.avatar} className="flex items-center gap-3">
                  <div className="relative flex-shrink-0">
                    <div className="w-8 h-8 bg-navy/60 border border-white/20 flex items-center justify-center">
                      <span className="font-mono text-[10px] font-700 text-white">{member.avatar}</span>
                    </div>
                    {member.online && (
                      <span className="absolute bottom-0 right-0 w-2 h-2 bg-emerald-400 border border-[#1A1F2E]" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-body text-xs text-white/80 leading-none truncate">
                      {member.name}
                    </p>
                    <p className="font-mono text-[9px] text-gold mt-0.5">{member.role}</p>
                  </div>
                  <div
                    className={[
                      "w-1.5 h-1.5 flex-shrink-0",
                      member.online ? "bg-emerald-400" : "bg-white/20",
                    ].join(" ")}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Quick links */}
          <div className="bg-white/5 border border-white/10 p-5 space-y-2">
            <h3 className="font-display text-xs font-700 text-white/40 uppercase tracking-wider mb-3">Quick Actions</h3>
            {[
              { icon: Plus, label: "Neue Aufgabe erstellen" },
              { icon: Paperclip, label: "Datei anhängen" },
              { icon: Clock, label: "Zeit erfassen" },
              { icon: AlertTriangle, label: "Problem melden" },
            ].map((action) => (
              <button
                key={action.label}
                type="button"
                className="w-full flex items-center gap-3 py-2 px-3 text-white/50 hover:text-white hover:bg-white/5 transition-colors group"
              >
                <action.icon size={13} className="flex-shrink-0" />
                <span className="font-body text-xs">{action.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
