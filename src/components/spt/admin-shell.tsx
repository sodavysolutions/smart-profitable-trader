"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import {
  BarChart3,
  Bell,
  Bot,
  Briefcase,
  ChevronRight,
  ClipboardList,
  CreditCard,
  LayoutDashboard,
  LineChart,
  LogOut,
  Megaphone,
  Menu,
  MessageSquare,
  MessagesSquare,
  Search,
  Settings,
  TrendingUp,
  UserRoundCheck,
  Users,
  X,
} from "lucide-react";
import type { UserRole } from "@prisma/client";
import { clsx } from "clsx";

// ── Nav type definitions ──────────────────────────────────────────────────────

type NavChild = { href: string; label: string; icon: React.ElementType };
type NavItem  = { href: string; label: string; icon: React.ElementType; pageTitle?: string; children?: NavChild[] };

// ── Sidebar nav definition ────────────────────────────────────────────────────

const navItems: NavItem[] = [
  { href: "/spt/admin/dashboard",   label: "Dashboard",    icon: LayoutDashboard },
  { href: "/spt/admin/leads",       label: "Leads",        icon: MessageSquare,  pageTitle: "Leads & Conversations" },
  { href: "/spt/admin/applications",label: "Applications", icon: ClipboardList },
  { href: "/spt/admin/customers",   label: "Customers",    icon: Users },
  { href: "/spt/admin/subscriptions",label: "Subscriptions",icon: Bell },
  { href: "/spt/admin/accounts",    label: "Accounts",     icon: LineChart,      pageTitle: "Trading Accounts" },
  { href: "/spt/admin/finance",     label: "Finance",      icon: CreditCard },
  {
    href: "/spt/admin/chatbot-leads",
    label: "AI Chatbot",
    icon: Bot,
    pageTitle: "AI Chatbot Leads",
    children: [
      { href: "/spt/admin/chatbot-conversations", label: "Conversations", icon: MessagesSquare },
      { href: "/spt/admin/chatbot-broadcast",     label: "Broadcast",     icon: Megaphone },
    ],
  },
  { href: "/spt/admin/reminders",   label: "Reminders",   icon: Bell },
  { href: "/spt/admin/settings",    label: "Settings",    icon: Settings },
];

// ── Sidebar link ──────────────────────────────────────────────────────────────

function SidebarLink({
  href,
  label,
  icon: Icon,
  children: subLinks,
}: {
  href: string;
  label: string;
  icon: React.ElementType;
  children?: NavChild[];
}) {
  const pathname = usePathname();
  const active      = pathname === href || pathname.startsWith(href + "/");
  const childActive = subLinks?.some((c) => pathname === c.href || pathname.startsWith(c.href + "/")) ?? false;
  const groupActive = active || childActive;

  return (
    <div className="nav-item">
      <Link
        href={href}
        className={clsx(
          "group relative flex items-center gap-3 rounded-xl px-3 py-[10px] text-sm font-medium",
          "transition-all duration-200 ease-out",
          groupActive
            ? "bg-white/[0.09] text-white"
            : "text-slate-400 hover:bg-white/[0.05] hover:text-slate-200"
        )}
      >
        {/* Animated left accent bar */}
        <span
          className={clsx(
            "absolute left-0 top-1/2 -translate-y-1/2 rounded-r-full",
            "transition-all duration-300 ease-out",
            groupActive
              ? "h-6 w-[3px] bg-profit-500 opacity-100 shadow-[0_0_10px_rgba(32,199,111,0.8)]"
              : "h-0 w-[3px] bg-profit-500 opacity-0"
          )}
        />

        {/* Icon */}
        <span
          className={clsx(
            "relative flex h-[30px] w-[30px] shrink-0 items-center justify-center rounded-lg",
            "transition-all duration-200 ease-out",
            groupActive
              ? "bg-profit-500 text-white shadow-[0_4px_14px_rgba(32,199,111,0.42)]"
              : "bg-white/[0.06] text-slate-400 group-hover:bg-white/[0.11] group-hover:text-white group-hover:scale-110"
          )}
        >
          <Icon size={14} />
        </span>

        <span className="flex-1 leading-tight">{label}</span>

        {groupActive && !subLinks && (
          <ChevronRight size={12} className="opacity-40" />
        )}
      </Link>

      {/* Sub-links */}
      {subLinks && groupActive && (
        <div className="ml-[52px] mt-1 space-y-0.5">
          {subLinks.map((child) => {
            const childIsActive = pathname === child.href || pathname.startsWith(child.href + "/");
            const CIcon = child.icon;
            return (
              <Link
                key={child.href}
                href={child.href}
                className={clsx(
                  "flex items-center gap-2.5 rounded-lg px-2.5 py-[7px] text-xs font-medium",
                  "transition-all duration-150 ease-out",
                  childIsActive
                    ? "bg-white/[0.07] text-profit-400"
                    : "text-slate-500 hover:bg-white/[0.05] hover:text-slate-300"
                )}
              >
                <CIcon size={12} />
                {child.label}
                {childIsActive && (
                  <span className="ml-auto h-1.5 w-1.5 rounded-full bg-profit-500 shadow-[0_0_6px_rgba(32,199,111,0.75)]" />
                )}
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}

// ── Source badge ──────────────────────────────────────────────────────────────

export function SourceBadge({ source }: { source: string }) {
  const map: Record<string, { label: string; style: string }> = {
    FORM:       { label: "Website Form", style: "bg-blue-50 text-blue-700 ring-blue-200" },
    AI_CHATBOT: { label: "AI Chatbot",   style: "bg-violet-50 text-violet-700 ring-violet-200" },
    WHATSAPP:   { label: "WhatsApp",     style: "bg-emerald-50 text-emerald-700 ring-emerald-200" },
    TELEGRAM:   { label: "Telegram",     style: "bg-sky-50 text-sky-700 ring-sky-200" },
    MANUAL:     { label: "Manual",       style: "bg-slate-50 text-slate-700 ring-slate-200" },
    REFERRAL:   { label: "Referral",     style: "bg-amber-50 text-amber-700 ring-amber-200" },
    CAMPAIGN:   { label: "Campaign",     style: "bg-pink-50 text-pink-700 ring-pink-200" },
  };
  const entry = map[source?.toUpperCase()] ?? { label: source ?? "Unknown", style: "bg-slate-50 text-slate-600 ring-slate-200" };
  return (
    <span className={clsx("inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ring-1", entry.style)}>
      {entry.label}
    </span>
  );
}

// ── Admin shell ───────────────────────────────────────────────────────────────

export function SPTAdminShell({
  children,
  title,
  role,
}: {
  children: React.ReactNode;
  title: string;
  role: UserRole | string;
}) {
  const pathname   = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  // Close on route change
  useEffect(() => { setMobileOpen(false); }, [pathname]);

  // Lock body scroll while drawer is open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  return (
    <main className="min-h-screen bg-[#EFF2F7] text-slate-900">

      {/* ── Mobile overlay ────────────────────────────────── */}
      <div
        aria-hidden
        onClick={() => setMobileOpen(false)}
        className={clsx(
          "fixed inset-0 z-30 bg-[#071427]/65 backdrop-blur-sm",
          "transition-all duration-300 ease-out lg:hidden",
          mobileOpen ? "opacity-100" : "pointer-events-none opacity-0"
        )}
      />

      {/* ── Sidebar ───────────────────────────────────────── */}
      <aside
        className={clsx(
          "fixed inset-y-0 left-0 z-40 flex w-[260px] flex-col overflow-hidden",
          "transition-transform duration-300 ease-out",
          "lg:translate-x-0",
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        )}
        style={{ background: "linear-gradient(168deg, #0e2040 0%, #071427 52%, #091a31 100%)" }}
      >
        {/* Dot-grid texture overlay */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-[0.035]"
          style={{
            backgroundImage: "radial-gradient(rgba(255,255,255,1) 1px, transparent 1px)",
            backgroundSize: "22px 22px",
          }}
        />
        {/* Ambient green glow at bottom */}
        <div
          aria-hidden
          className="pointer-events-none absolute bottom-0 left-0 right-0 h-60 opacity-100"
          style={{ background: "radial-gradient(ellipse at 50% 110%, rgba(32,199,111,0.12) 0%, transparent 72%)" }}
        />
        {/* Top shimmer stripe */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-profit-500/30 to-transparent"
        />

        {/* Sidebar content */}
        <div className="relative flex flex-1 flex-col overflow-hidden">

          {/* Logo area */}
          <div className="flex shrink-0 items-center justify-between px-4 py-[18px]">
            <Link href="/spt/admin/dashboard" className="flex items-center gap-3 group">
              <span className="relative grid h-[42px] w-[42px] place-items-center overflow-hidden rounded-xl bg-white/[0.09] p-1.5 ring-1 ring-white/[0.12] transition-all duration-200 group-hover:ring-profit-500/30 group-hover:shadow-[0_0_18px_rgba(32,199,111,0.18)]">
                <Image
                  src="/images/smart-profits-trader-logo.png"
                  alt="SPT"
                  width={80}
                  height={80}
                  className="h-full w-full object-contain"
                />
              </span>
              <div className="min-w-0">
                <p className="truncate text-[13px] font-bold leading-snug text-white">Smart Profits Trader</p>
                <p className="flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-[0.12em] text-profit-400">
                  <span className="relative flex h-[7px] w-[7px]">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-profit-400 opacity-70" />
                    <span className="relative inline-flex h-[7px] w-[7px] rounded-full bg-profit-500" />
                  </span>
                  Live Admin
                </p>
              </div>
            </Link>

            {/* Mobile close */}
            <button
              onClick={() => setMobileOpen(false)}
              className="grid h-7 w-7 place-items-center rounded-lg text-slate-500 transition-all hover:bg-white/10 hover:text-white lg:hidden"
            >
              <X size={15} />
            </button>
          </div>

          {/* Divider */}
          <div className="mx-4 h-px bg-gradient-to-r from-transparent via-white/[0.09] to-transparent" />

          {/* Nav */}
          <nav className="admin-sidebar-scroll flex-1 overflow-y-auto px-3 py-4 space-y-[2px]">
            {navItems.map((item) => (
              <SidebarLink
                key={item.href}
                href={item.href}
                label={item.label}
                icon={item.icon}
                children={item.children}
              />
            ))}
          </nav>

          {/* Divider */}
          <div className="mx-4 h-px bg-gradient-to-r from-transparent via-white/[0.09] to-transparent" />

          {/* Role pill */}
          <div className="shrink-0 px-4 py-4">
            <div className="flex items-center gap-2.5 rounded-xl bg-white/[0.05] px-3 py-3 ring-1 ring-white/[0.07]">
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-profit-500 text-white shadow-[0_0_14px_rgba(32,199,111,0.42)]">
                <UserRoundCheck size={13} />
              </span>
              <div className="min-w-0 flex-1">
                <p className="truncate text-[11px] font-bold text-white">Admin Portal</p>
                <p className="text-[10px] text-slate-500">{String(role).replaceAll("_", " ")}</p>
              </div>
              <span className="glow-pulse relative flex h-2 w-2 rounded-full bg-profit-500" />
            </div>
          </div>
        </div>
      </aside>

      {/* ── Main content ──────────────────────────────────── */}
      <section className="min-h-screen lg:pl-[260px]">

        {/* Header */}
        <header className="sticky top-0 z-20 border-b border-slate-200/60 bg-white/[0.97] backdrop-blur-xl">
          <div className="flex min-h-[64px] items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">

            {/* Left: hamburger + title */}
            <div className="flex min-w-0 items-center gap-3">
              <button
                onClick={() => setMobileOpen(true)}
                aria-label="Open menu"
                className={clsx(
                  "grid h-9 w-9 shrink-0 place-items-center rounded-xl",
                  "border border-slate-200 bg-white text-slate-600 shadow-sm",
                  "transition-all duration-150 hover:border-slate-300 hover:bg-slate-50 hover:text-navy-950",
                  "lg:hidden"
                )}
              >
                <Menu size={17} />
              </button>

              <div className="min-w-0">
                <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-profit-600">
                  Smart Profits Trader
                </p>
                <h1 className="truncate text-[20px] font-bold tracking-tight text-navy-950 leading-tight">
                  {title}
                </h1>
              </div>
            </div>

            {/* Right: actions */}
            <div className="flex shrink-0 items-center gap-2">
              {/* Search */}
              <div className={clsx(
                "hidden h-9 cursor-pointer items-center gap-2 rounded-xl",
                "border border-slate-200/80 bg-slate-50/80 px-3 text-slate-400",
                "transition-all duration-150 hover:border-slate-300 hover:bg-slate-100 hover:text-slate-600",
                "sm:flex"
              )}>
                <Search size={14} />
                <span className="text-xs font-medium">Search…</span>
              </div>

              {/* Notification bell */}
              <button className={clsx(
                "relative grid h-9 w-9 place-items-center rounded-xl",
                "border border-slate-200 bg-white text-slate-500 shadow-sm",
                "transition-all duration-150 hover:border-slate-300 hover:bg-slate-50 hover:text-navy-950"
              )}>
                <Bell size={15} />
                <span className="absolute right-[9px] top-[9px] flex h-[7px] w-[7px]">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-profit-500 opacity-65" />
                  <span className="relative inline-flex h-[7px] w-[7px] rounded-full bg-profit-500" />
                </span>
              </button>

              {/* Logout */}
              <form action="/api/spt/admin/logout" method="post">
                <button className={clsx(
                  "inline-flex h-9 items-center gap-1.5 rounded-xl px-3 text-sm font-semibold",
                  "border border-slate-200 bg-white text-slate-600 shadow-sm",
                  "transition-all duration-150 hover:border-red-200 hover:bg-red-50 hover:text-red-600"
                )}>
                  <LogOut size={14} />
                  <span className="hidden sm:inline">Logout</span>
                </button>
              </form>
            </div>
          </div>

          {/* Green gradient accent line */}
          <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-profit-500/30 to-transparent" />
        </header>

        {/* Page content */}
        <div className="admin-content px-4 py-7 sm:px-6 lg:px-8">
          {children}
        </div>
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
    <div className={clsx(
      "group relative overflow-hidden rounded-2xl border border-slate-200/80 bg-white p-5",
      "shadow-[0_2px_8px_rgba(7,20,39,0.05)]",
      "transition-all duration-250 hover:-translate-y-1 hover:shadow-[0_12px_36px_rgba(7,20,39,0.10)] hover:border-profit-500/20",
    )}>
      {/* Subtle corner glow on hover */}
      <div className="pointer-events-none absolute -right-6 -top-6 h-20 w-20 rounded-full bg-profit-500/0 transition-all duration-300 group-hover:bg-profit-500/5 blur-xl" />

      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0 flex-1">
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">{label}</p>
          <p className="admin-metric-value mt-2 text-[28px] font-bold tabular-nums leading-none text-navy-950">
            {value}
          </p>
          {helper && (
            <p className={clsx(
              "mt-2 flex items-center gap-1 text-xs font-semibold",
              trend === "down" ? "text-red-600" : "text-profit-600"
            )}>
              {trend === "up" && <span className="text-[10px]">↑</span>}
              {trend === "down" && <span className="text-[10px]">↓</span>}
              {helper}
            </p>
          )}
        </div>
        <span className={clsx(
          "flex h-10 w-10 shrink-0 items-center justify-center rounded-xl",
          "bg-navy-950/5 text-navy-950",
          "transition-all duration-200 group-hover:bg-profit-500 group-hover:text-white group-hover:shadow-[0_4px_14px_rgba(32,199,111,0.36)]"
        )}>
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
    <div className={clsx(
      "rounded-2xl border border-slate-200/80 bg-white",
      "shadow-[0_2px_8px_rgba(7,20,39,0.05)]",
      className
    )}>
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
      <div className="flex items-start gap-3">
        {/* Left accent bar */}
        <span className="mt-[3px] h-5 w-[3px] shrink-0 rounded-full bg-gradient-to-b from-profit-500 to-profit-600" />
        <div>
          <h2 className="text-base font-bold text-navy-950">{title}</h2>
          {subtitle && <p className="mt-0.5 text-sm text-slate-500">{subtitle}</p>}
        </div>
      </div>
      {action}
    </div>
  );
}

export function AdminCardBody({ children, className }: { children: React.ReactNode; className?: string }) {
  return <div className={clsx("p-5", className)}>{children}</div>;
}

// ── Tab bar ───────────────────────────────────────────────────────────────────

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
    <div className="flex gap-0.5 overflow-x-auto rounded-xl border border-slate-200/80 bg-slate-100/80 p-1 backdrop-blur-sm">
      {tabs.map((tab) => {
        const isActive = activeTab === tab.value;
        const url = `${pathname}?${paramName}=${tab.value}`;
        return (
          <Link
            key={tab.value}
            href={url}
            className={clsx(
              "flex shrink-0 items-center gap-1.5 rounded-lg px-3 py-[7px] text-xs font-semibold whitespace-nowrap",
              "transition-all duration-150",
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
