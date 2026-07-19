"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  BarChart3,
  Bell,
  Briefcase,
  Bot,
  ChevronRight,
  ClipboardList,
  CreditCard,
  LayoutDashboard,
  LineChart,
  LogOut,
  MessageSquare,
  Megaphone,
  MessagesSquare,
  Search,
  Settings,
  TrendingUp,
  UserRoundCheck,
  Users,
} from "lucide-react";
import type { UserRole } from "@prisma/client";
import { clsx } from "clsx";

// ── Sidebar nav definition ────────────────────────────────────────────────────

type NavChild = { href: string; label: string; icon: React.ElementType };
type NavItem  = { href: string; label: string; icon: React.ElementType; pageTitle?: string; children?: NavChild[] };

const navItems: NavItem[] = [
  {
    href: "/spt/admin/dashboard",
    label: "Dashboard",
    icon: LayoutDashboard,
  },
  {
    href: "/spt/admin/leads",
    label: "Leads",
    pageTitle: "Leads & Conversations",
    icon: MessageSquare,
  },
  {
    href: "/spt/admin/applications",
    label: "Applications",
    icon: ClipboardList,
  },
  {
    href: "/spt/admin/customers",
    label: "Customers",
    icon: Users,
  },
  {
    href: "/spt/admin/subscriptions",
    label: "Subscriptions",
    icon: Bell,
  },
  {
    href: "/spt/admin/accounts",
    label: "Accounts",
    pageTitle: "Trading Accounts",
    icon: LineChart,
  },
  {
    href: "/spt/admin/finance",
    label: "Finance",
    icon: CreditCard,
  },
  {
    href: "/spt/admin/chatbot-leads",
    label: "AI Chatbot",
    pageTitle: "AI Chatbot Leads",
    icon: Bot,
    children: [
      { href: "/spt/admin/chatbot-conversations", label: "Conversations", icon: MessagesSquare },
      { href: "/spt/admin/chatbot-broadcast",     label: "Broadcast",     icon: Megaphone },
    ],
  },
  {
    href: "/spt/admin/reminders",
    label: "Reminders",
    icon: Bell,
  },
  {
    href: "/spt/admin/settings",
    label: "Settings",
    icon: Settings,
  },
];

// ── Source badge ──────────────────────────────────────────────────────────────

export function SourceBadge({ source }: { source: string }) {
  const map: Record<string, { label: string; style: string }> = {
    FORM:         { label: "Website Form",  style: "bg-blue-50 text-blue-700 ring-blue-200" },
    AI_CHATBOT:   { label: "AI Chatbot",    style: "bg-violet-50 text-violet-700 ring-violet-200" },
    WHATSAPP:     { label: "WhatsApp",      style: "bg-emerald-50 text-emerald-700 ring-emerald-200" },
    TELEGRAM:     { label: "Telegram",      style: "bg-sky-50 text-sky-700 ring-sky-200" },
    MANUAL:       { label: "Manual",        style: "bg-slate-50 text-slate-700 ring-slate-200" },
    REFERRAL:     { label: "Referral",      style: "bg-amber-50 text-amber-700 ring-amber-200" },
    CAMPAIGN:     { label: "Campaign",      style: "bg-pink-50 text-pink-700 ring-pink-200" },
  };
  const entry = map[source?.toUpperCase()] ?? { label: source ?? "Unknown", style: "bg-slate-50 text-slate-600 ring-slate-200" };
  return (
    <span className={clsx("inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ring-1", entry.style)}>
      {entry.label}
    </span>
  );
}

// ── Admin shell ───────────────────────────────────────────────────────────────

function SidebarLink({
  href,
  label,
  icon: Icon,
  children,
}: {
  href: string;
  label: string;
  icon: React.ElementType;
  children?: NavChild[];
}) {
  const pathname = usePathname();
  const active    = pathname === href || pathname.startsWith(href + "/");
  const childActive = children?.some((c) => pathname === c.href || pathname.startsWith(c.href + "/")) ?? false;
  const groupActive = active || childActive;

  return (
    <div>
      <Link
        href={href}
        className={clsx(
          "group flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-150",
          groupActive
            ? "bg-white/12 text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]"
            : "text-slate-400 hover:bg-white/8 hover:text-white"
        )}
      >
        <span
          className={clsx(
            "flex h-7 w-7 shrink-0 items-center justify-center rounded-lg transition-colors",
            groupActive ? "bg-profit-500 text-white shadow-sm" : "bg-white/6 text-slate-400 group-hover:bg-white/10 group-hover:text-white"
          )}
        >
          <Icon size={15} />
        </span>
        {label}
        {groupActive && !children && <ChevronRight size={13} className="ml-auto opacity-60" />}
      </Link>

      {/* Sub-links — always visible when parent is in group */}
      {children && groupActive && (
        <div className="ml-5 mt-0.5 space-y-0.5 border-l border-white/10 pl-3">
          {children.map((child) => {
            const childIsActive = pathname === child.href || pathname.startsWith(child.href + "/");
            const CIcon = child.icon;
            return (
              <Link
                key={child.href}
                href={child.href}
                className={clsx(
                  "flex items-center gap-2 rounded-lg px-2.5 py-2 text-xs font-medium transition-all",
                  childIsActive
                    ? "text-white"
                    : "text-slate-500 hover:text-slate-300"
                )}
              >
                <CIcon size={13} />
                {child.label}
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}

export function SPTAdminShell({
  children,
  title,
  role,
}: {
  children: React.ReactNode;
  title: string;
  role: UserRole | string;
}) {
  const pathname = usePathname();

  return (
    <main className="min-h-screen bg-[#F1F5F9] text-slate-900">
      {/* ── Desktop sidebar ───────────────────────────────────────────────── */}
      <aside className="fixed inset-y-0 left-0 z-20 hidden w-64 flex-col lg:flex"
        style={{ background: "linear-gradient(180deg, #0A1A3C 0%, #0d2251 50%, #0A1A3C 100%)" }}>
        {/* Logo */}
        <Link
          href="/spt/admin/dashboard"
          className="flex shrink-0 items-center gap-3 border-b border-white/8 px-5 py-5"
        >
          <span className="grid h-10 w-10 place-items-center overflow-hidden rounded-xl bg-white/10 p-1.5 shadow ring-1 ring-white/10">
            <Image
              src="/images/smart-profits-trader-logo.png"
              alt="SPT"
              width={80}
              height={80}
              className="h-full w-full object-contain"
            />
          </span>
          <div className="min-w-0">
            <p className="truncate text-[13px] font-bold leading-tight text-white">Smart Profits Trader</p>
            <p className="text-[10px] uppercase tracking-widest text-profit-400">Admin</p>
          </div>
        </Link>

        {/* Nav */}
        <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-0.5">
          {navItems.map((item) => (
            <SidebarLink key={item.href} href={item.href} label={item.label} icon={item.icon} children={item.children} />
          ))}
        </nav>

        {/* Role pill */}
        <div className="shrink-0 border-t border-white/8 px-4 py-4">
          <div className="flex items-center gap-2.5 rounded-xl bg-white/6 px-3 py-2.5">
            <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-profit-500 text-white">
              <UserRoundCheck size={14} />
            </span>
            <div className="min-w-0">
              <p className="truncate text-[11px] font-semibold text-white">Admin</p>
              <p className="text-[10px] text-slate-400">{String(role).replaceAll("_", " ")}</p>
            </div>
          </div>
        </div>
      </aside>

      {/* ── Main content ──────────────────────────────────────────────────── */}
      <section className="lg:pl-64">
        {/* Top bar */}
        <header className="sticky top-0 z-10 border-b border-slate-200/80 bg-white/95 backdrop-blur-sm">
          <div className="flex min-h-[64px] items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
            {/* Breadcrumb + title */}
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-widest text-profit-600">
                Smart Profits Trader
              </p>
              <h1 className="text-xl font-bold tracking-tight text-navy-950">{title}</h1>
            </div>
            {/* Actions */}
            <div className="flex items-center gap-2">
              <div className="hidden h-9 items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-3 text-sm text-slate-400 sm:flex">
                <Search size={15} />
                <span>Search…</span>
              </div>
              <button className="relative grid h-9 w-9 place-items-center rounded-xl border border-slate-200 bg-white text-slate-500 hover:bg-slate-50">
                <Bell size={16} />
              </button>
              <form action="/api/spt/admin/logout" method="post">
                <button className="inline-flex h-9 items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3 text-sm font-semibold text-slate-600 hover:bg-slate-50">
                  <LogOut size={14} />
                  <span className="hidden sm:inline">Logout</span>
                </button>
              </form>
            </div>
          </div>

          {/* Mobile nav — flatten children */}
          <nav className="flex gap-1.5 overflow-x-auto border-t border-slate-100 px-4 pb-2 pt-1.5 lg:hidden">
            {navItems.flatMap((item) => [
              item,
              ...(item.children ?? []),
            ]).map((item) => {
              const Icon = item.icon;
              const active = pathname === item.href || pathname.startsWith(item.href + "/");
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={clsx(
                    "inline-flex shrink-0 items-center gap-1.5 rounded-xl px-3 py-2 text-xs font-semibold whitespace-nowrap transition-colors",
                    active
                      ? "bg-navy-950 text-white"
                      : "bg-slate-100 text-navy-950 hover:bg-slate-200"
                  )}
                >
                  <Icon size={13} />
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </header>

        {/* Page content */}
        <div className="px-4 py-6 sm:px-6 lg:px-8">{children}</div>
      </section>
    </main>
  );
}

// ── Metric card ───────────────────────────────────────────────────────────────

export function AdminMetricCard({
  label,
  value,
  helper,
  icon: Icon = TrendingUp,
  trend,
}: {
  label: string;
  value: string | number;
  helper?: string;
  icon?: React.ElementType;
  trend?: "up" | "down" | "neutral";
}) {
  return (
    <div className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm transition-shadow hover:shadow-md">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">{label}</p>
          <p className="mt-2 text-3xl font-bold tabular-nums text-navy-950">{value}</p>
          {helper && (
            <p className={clsx(
              "mt-1.5 text-xs font-semibold",
              trend === "down" ? "text-red-600" : "text-profit-600"
            )}>
              {helper}
            </p>
          )}
        </div>
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-navy-950/5 text-navy-950">
          <Icon size={18} />
        </span>
      </div>
    </div>
  );
}

// ── Section card wrapper ───────────────────────────────────────────────────────

export function AdminCard({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={clsx("rounded-2xl border border-slate-200/80 bg-white shadow-sm", className)}>
      {children}
    </div>
  );
}

export function AdminCardHeader({
  title,
  subtitle,
  action,
}: {
  title: string;
  subtitle?: string;
  action?: React.ReactNode;
}) {
  return (
    <div className="flex flex-wrap items-start justify-between gap-3 border-b border-slate-100 px-5 py-4">
      <div>
        <h2 className="text-base font-bold text-navy-950">{title}</h2>
        {subtitle && <p className="mt-0.5 text-sm text-slate-500">{subtitle}</p>}
      </div>
      {action}
    </div>
  );
}

export function AdminCardBody({ children, className }: { children: React.ReactNode; className?: string }) {
  return <div className={clsx("p-5", className)}>{children}</div>;
}

// ── Tab bar (client) ──────────────────────────────────────────────────────────

export function AdminTabBar({
  tabs,
  activeTab,
  paramName = "tab",
}: {
  tabs: { value: string; label: string; count?: number }[];
  activeTab: string;
  paramName?: string;
}) {
  const pathname = usePathname();
  return (
    <div className="flex gap-0.5 overflow-x-auto rounded-xl border border-slate-200 bg-slate-100 p-1">
      {tabs.map((tab) => {
        const isActive = activeTab === tab.value;
        const url = `${pathname}?${paramName}=${tab.value}`;
        return (
          <Link
            key={tab.value}
            href={url}
            className={clsx(
              "flex shrink-0 items-center gap-1.5 rounded-lg px-3 py-2 text-xs font-semibold whitespace-nowrap transition-all",
              isActive
                ? "bg-white text-navy-950 shadow-sm"
                : "text-slate-500 hover:text-slate-700"
            )}
          >
            {tab.label}
            {tab.count !== undefined && (
              <span className={clsx(
                "rounded-full px-1.5 py-0.5 text-[10px] font-bold tabular-nums",
                isActive ? "bg-navy-950 text-white" : "bg-slate-200 text-slate-600"
              )}>
                {tab.count}
              </span>
            )}
          </Link>
        );
      })}
    </div>
  );
}
