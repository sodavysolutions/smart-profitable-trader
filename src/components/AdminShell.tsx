import Link from "next/link";
import { Bell, Search } from "lucide-react";
import { Brand } from "@/components/Brand";
import { navItems } from "@/lib/data";

export function AdminShell({ children, title = "Dashboard" }: { children: React.ReactNode; title?: string }) {
  return (
    <main className="min-h-screen bg-slate-100 text-slate-900">
      <aside className="fixed inset-y-0 left-0 z-20 hidden w-72 bg-navy-950 p-5 text-white lg:block">
        <Link href="/admin" aria-label="Smart Profitable Trader admin dashboard" className="mb-8 block">
          <Brand />
        </Link>
        <nav aria-label="Admin navigation" className="space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                className="flex items-center gap-3 rounded-md px-3 py-2.5 text-sm font-medium text-slate-300 hover:bg-white/10 hover:text-white"
              >
                <Icon size={18} />
                {item.label}
              </Link>
            );
          })}
        </nav>
        <div className="absolute bottom-5 left-5 right-5 rounded-md border border-white/10 bg-white/5 p-4 text-sm text-slate-300">
          <div className="font-semibold text-white">Risk reminder</div>
          <p className="mt-1 leading-5">Trading outcomes are never guaranteed. Track exposure before scaling.</p>
        </div>
      </aside>
      <section className="lg:ml-72">
        <header className="sticky top-0 z-10 border-b border-slate-200 bg-white/95 backdrop-blur">
          <div className="flex min-h-20 flex-wrap items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
            <div>
              <p className="text-sm font-medium text-profit-600">Smart Profitable Trader</p>
              <h1 className="text-2xl font-semibold tracking-normal text-navy-950">{title}</h1>
            </div>
            <div className="flex items-center gap-3">
              <div className="hidden h-10 items-center gap-2 rounded-md border border-slate-200 bg-slate-50 px-3 sm:flex">
                <Search size={17} className="text-slate-400" />
                <span className="text-sm text-slate-500">Search leads, customers, accounts</span>
              </div>
              <button type="button" aria-label="View notifications" className="grid h-10 w-10 place-items-center rounded-md border border-slate-200 bg-white text-slate-600">
                <Bell size={18} />
              </button>
              <div className="rounded-md bg-navy-950 px-3 py-2 text-sm font-semibold text-white">Admin</div>
            </div>
          </div>
        </header>
        <div className="px-4 py-6 sm:px-6 lg:px-8">{children}</div>
      </section>
    </main>
  );
}
