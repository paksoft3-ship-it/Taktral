"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  FolderKanban,
  Users,
  BarChart3,
  Settings,
  ChevronLeft,
  Bell,
  LogOut,
} from "lucide-react";

const navItems = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard, exact: true },
  { href: "/admin/projects", label: "Projekte", icon: FolderKanban },
  { href: "/admin/clients", label: "Kunden", icon: Users },
  { href: "/admin/analytics", label: "Finanzen", icon: BarChart3 },
  { href: "/admin/settings", label: "Einstellungen", icon: Settings },
];

export default function AdminSidebar({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);

  const isActive = (href: string, exact?: boolean) =>
    exact ? pathname === href : pathname.startsWith(href);

  return (
    <div className="min-h-screen bg-[#F5F7FA] flex">
      {/* Sidebar */}
      <aside
        className={[
          "flex flex-col bg-white border-r border-[#E5E9F0] transition-all duration-300 flex-shrink-0",
          collapsed ? "w-16" : "w-52",
        ].join(" ")}
      >
        {/* Logo */}
        <div className="flex items-center justify-between px-4 h-16 border-b border-[#E5E9F0] flex-shrink-0">
          {!collapsed && (
            <div>
              <p className="font-display text-sm font-700 text-navy leading-none">Taktral</p>
              <p className="font-mono text-[9px] text-smoke uppercase tracking-wider mt-0.5">
                Admin
              </p>
            </div>
          )}
          {collapsed && (
            <div className="w-8 h-8 bg-navy flex items-center justify-center mx-auto">
              <span className="font-display text-xs font-800 text-white">T</span>
            </div>
          )}
          {!collapsed && (
            <button
              type="button"
              onClick={() => setCollapsed(true)}
              className="text-smoke hover:text-navy transition-colors"
              aria-label="Sidebar einklappen"
            >
              <ChevronLeft size={16} />
            </button>
          )}
        </div>

        {/* Nav */}
        <nav className="flex-1 py-4 space-y-0.5 px-2">
          {navItems.map((item) => {
            const active = isActive(item.href, item.exact);
            return (
              <Link
                key={item.href}
                href={item.href}
                title={collapsed ? item.label : undefined}
                className={[
                  "flex items-center gap-3 px-3 py-2.5 transition-all duration-150",
                  active
                    ? "bg-navy text-white"
                    : "text-smoke hover:bg-[#F0F3F9] hover:text-navy",
                  collapsed ? "justify-center" : "",
                ].join(" ")}
              >
                <item.icon size={16} className="flex-shrink-0" />
                {!collapsed && (
                  <span className="font-body text-sm font-500 truncate">{item.label}</span>
                )}
                {active && !collapsed && (
                  <span className="ml-auto w-1.5 h-1.5 bg-gold flex-shrink-0" />
                )}
              </Link>
            );
          })}
        </nav>

        {collapsed && (
          <button
            type="button"
            onClick={() => setCollapsed(false)}
            className="flex items-center justify-center py-3 text-smoke hover:text-navy border-t border-[#E5E9F0]"
            aria-label="Sidebar ausklappen"
          >
            <ChevronLeft size={16} className="rotate-180" />
          </button>
        )}

        {!collapsed && (
          <div className="border-t border-[#E5E9F0] px-4 py-4 flex items-center gap-3">
            <div className="w-8 h-8 bg-navy flex items-center justify-center flex-shrink-0">
              <span className="font-mono text-xs font-700 text-white">JD</span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-body text-xs font-600 text-navy truncate">J. Doe</p>
              <p className="font-mono text-[9px] text-smoke truncate">Admin</p>
            </div>
            <button
              type="button"
              className="text-smoke hover:text-navy transition-colors flex-shrink-0"
              aria-label="Abmelden"
            >
              <LogOut size={14} />
            </button>
          </div>
        )}
      </aside>

      {/* Main */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top bar */}
        <header className="h-16 bg-white border-b border-[#E5E9F0] flex items-center justify-between px-6 flex-shrink-0">
          <div />
          <div className="flex items-center gap-3">
            <button
              type="button"
              className="relative w-9 h-9 flex items-center justify-center text-smoke hover:text-navy transition-colors"
              aria-label="Benachrichtigungen"
            >
              <Bell size={17} />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-gold" />
            </button>
            <div className="w-8 h-8 bg-navy flex items-center justify-center">
              <span className="font-mono text-xs font-700 text-white">TA</span>
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-auto p-6">{children}</main>
      </div>
    </div>
  );
}
