import Image from "next/image";
import Link from "next/link";
import { Bell, LayoutDashboard, LogOut, Search, Settings, Users, UserRoundCheck, ClipboardList, Megaphone } from "lucide-react";
import type { UserRole } from "@prisma/client";

const navItems = [
  { href: "/spt/admin/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/spt/admin/leads", label: "Leads", icon: Megaphone },
  { href: "/spt/admin/customers", label: "Customers", icon: Users },
  { href: "/spt/admin/applications", label: "Applications", icon: ClipboardList },
  { href: "/spt/admin/settings", label: "Settings", icon: Settings }
];

export function SPTAdminShell({
  children,
  title,
  role
}: {
  children: React.ReactNode;
  title: string;
  role: UserRole | string;
}) {
  return (
    <main className="min-h-screen bg-slate-100 text-slate-900">
      <aside className="fixed inset-y-0 left-0 z-20 hidden w-72 bg-navy-950 p-5 text-white lg:block">
        <Link href="/spt/admin/dashboard" className="mb-8 flex items-center gap-3">
          <span className="grid h-14 place-items-center overflow-hidden rounded-xl bg-white px-2">
            <Image src="/brand/spt-logo.png" alt="Smart Profitable Trader logo" width={180} height={80} className="h-12 w-auto object-contain" />
          </span>
          <span className="leading-tight">
            <span className="block font-semibold">SPT Admin</span>
            <span className="block text-xs uppercase tracking-[0.14em] text-profit-500">CRM Foundation</span>
          </span>
        </Link>
        <nav className="space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <Link key={item.href} href={item.href} className="flex items-center gap-3 rounded-md px-3 py-2.5 text-sm font-medium text-slate-300 hover:bg-white/10 hover:text-white">
                <Icon size={18} />
                {item.label}
              </Link>
            );
          })}
        </nav>
        <div className="absolute bottom-5 left-5 right-5 rounded-md border border-white/10 bg-white/5 p-4 text-sm text-slate-300">
          <div className="font-semibold text-white">Admin access</div>
          <p className="mt-1 leading-5">Role: {String(role).replaceAll("_", " ")}</p>
        </div>
      </aside>
      <section className="lg:pl-72">
        <header className="sticky top-0 z-10 border-b border-slate-200 bg-white/95 backdrop-blur">
          <div className="flex min-h-20 flex-wrap items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
            <div>
              <p className="text-sm font-medium text-profit-600">Smart Profitable Trader</p>
              <h1 className="text-2xl font-semibold tracking-normal text-navy-950">{title}</h1>
            </div>
            <div className="flex items-center gap-3">
              <div className="hidden h-10 items-center gap-2 rounded-md border border-slate-200 bg-slate-50 px-3 sm:flex">
                <Search size={17} className="text-slate-400" />
                <span className="text-sm text-slate-500">Search CRM records</span>
              </div>
              <button className="grid h-10 w-10 place-items-center rounded-md border border-slate-200 bg-white text-slate-600">
                <Bell size={18} />
              </button>
              <form action="/api/spt/admin/logout" method="post">
                <button className="inline-flex h-10 items-center gap-2 rounded-md bg-navy-950 px-3 text-sm font-semibold text-white">
                  <LogOut size={16} />
                  Logout
                </button>
              </form>
            </div>
          </div>
          <nav className="flex gap-2 overflow-x-auto border-t border-slate-100 px-4 py-2 lg:hidden">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link key={item.href} href={item.href} className="inline-flex items-center gap-2 whitespace-nowrap rounded-md bg-slate-100 px-3 py-2 text-sm font-semibold text-navy-950">
                  <Icon size={16} />
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </header>
        <div className="px-4 py-6 sm:px-6 lg:px-8">{children}</div>
      </section>
    </main>
  );
}

export function AdminMetricCard({ label, value, helper }: { label: string; value: string | number; helper?: string }) {
  return (
    <section className="rounded-md border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-medium text-slate-500">{label}</p>
          <p className="mt-2 text-3xl font-semibold text-navy-950">{value}</p>
          {helper && <p className="mt-2 text-sm font-semibold text-profit-600">{helper}</p>}
        </div>
        <div className="grid h-11 w-11 place-items-center rounded-md bg-slate-100 text-navy-950">
          <UserRoundCheck size={21} />
        </div>
      </div>
    </section>
  );
}
