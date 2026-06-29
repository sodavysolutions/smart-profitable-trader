"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { ArrowRight, Menu, MessageCircle, X } from "lucide-react";

const sptLinks = [
  { href: "/spt/home", label: "Home", shortLabel: "Home" },
  { href: "/spt/home#how-it-works", label: "How It Works", shortLabel: "How It Works" },
  { href: "/spt/home#trading-solutions", label: "Trading Solutions", shortLabel: "Trading Solutions" },
  { href: "/spt/holaprime", label: "Get Funded", shortLabel: "Get Funded" },
  { href: "/spt/vip", label: "VIP Signals", shortLabel: "VIP Signals" },
  { href: "/spt/home#founder", label: "Meet the Founder", shortLabel: "Founder" },
  { href: "/spt/home#faq", label: "FAQ", shortLabel: "FAQ" }
];

const whatsappUrl = "https://wa.me/2347087970133";

export function SPTNavbar() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsOpen(false);
    };

    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [isOpen]);

  const closeMenu = () => setIsOpen(false);

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/70 bg-white/92 backdrop-blur-xl">
      <div className="page-shell flex h-[72px] items-center justify-between gap-4 sm:h-20">
        <Link href="/spt/home" onClick={closeMenu} className="flex min-w-0 items-center gap-3" aria-label="Smart Profits Trader home">
          <span className="grid h-12 w-12 shrink-0 place-items-center overflow-hidden rounded-xl border border-slate-200 bg-white p-1.5 shadow-soft sm:h-14 sm:w-14">
            <Image src="/images/smart-profits-trader-logo.png" alt="Smart Profits Trader logo" width={160} height={160} className="h-full w-full object-contain" priority />
          </span>
          <span className="hidden min-w-0 leading-tight sm:block">
            <span className="block font-semibold text-navy-950">Smart Profits Trader</span>
            <span className="block text-xs font-semibold uppercase tracking-[0.14em] text-profit-600">Algo-Powered Trading Ecosystem</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-5 text-sm font-semibold text-slate-600 lg:flex" aria-label="Smart Profits Trader desktop navigation">
          {sptLinks.slice(1).map((item) => (
            <Link key={item.href} href={item.href} className="whitespace-nowrap transition hover:text-navy-950">
              {item.shortLabel}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-2 lg:flex">
          <Link href="/spt/smart-money-blueprint" className="inline-flex items-center justify-center gap-1.5 rounded-md border border-profit-500/40 bg-profit-50 px-4 py-2.5 text-sm font-bold text-profit-600 transition hover:bg-profit-100">
            🎁 Free Blueprint
          </Link>
          <Link href="/spt/apply" className="funnel-header-cta inline-flex items-center justify-center rounded-md bg-profit-500 px-4 py-2.5 text-sm font-bold text-navy-950 shadow-[0_12px_30px_rgba(32,199,111,0.25)] hover:bg-profit-600 hover:text-white">
            Apply Now
          </Link>
          <Link href={whatsappUrl} target="_blank" rel="noreferrer" className="funnel-header-cta inline-flex items-center justify-center gap-2 rounded-md border border-slate-200 bg-white px-4 py-2.5 text-sm font-bold text-navy-950 hover:border-profit-500">
            <MessageCircle size={16} className="text-profit-600" />
            WhatsApp
          </Link>
        </div>

        <button
          type="button"
          className="inline-grid h-11 w-11 shrink-0 place-items-center rounded-xl border border-slate-200 bg-white text-navy-950 shadow-sm transition hover:border-profit-500 lg:hidden"
          aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={isOpen}
          aria-controls="spt-mobile-menu"
          onClick={() => setIsOpen((current) => !current)}
        >
          {isOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      <div className={`fixed inset-x-0 top-[72px] z-50 sm:top-20 lg:hidden ${isOpen ? "pointer-events-auto" : "pointer-events-none"}`}>
        <button
          type="button"
          className={`fixed inset-0 top-[72px] bg-navy-950/28 backdrop-blur-[2px] transition-opacity duration-200 sm:top-20 ${isOpen ? "opacity-100" : "opacity-0"}`}
          aria-label="Close navigation menu"
          onClick={closeMenu}
        />
        <nav
          id="spt-mobile-menu"
          className={`relative mx-auto w-[min(calc(100%_-_24px),430px)] origin-top overflow-hidden rounded-b-2xl border border-t-0 border-slate-200 bg-white p-4 shadow-[0_24px_70px_rgba(15,35,70,0.2)] transition duration-200 ${isOpen ? "translate-y-0 opacity-100" : "-translate-y-3 opacity-0"}`}
          aria-label="Smart Profits Trader mobile navigation"
        >
          <div className="space-y-1">
            {sptLinks.map((item) => (
              <Link key={item.href} href={item.href} onClick={closeMenu} className="block rounded-xl px-4 py-3 text-base font-semibold text-navy-950 transition hover:bg-slate-50 hover:text-profit-700">
                {item.label}
              </Link>
            ))}
          </div>
          <div className="mt-4 grid gap-3">
            <Link href="/spt/smart-money-blueprint" onClick={closeMenu} className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-xl border border-profit-500/40 bg-profit-50 px-5 py-3 text-sm font-bold text-profit-600">
              🎁 Free Blueprint — Download Now
            </Link>
            <Link href="/spt/apply" onClick={closeMenu} className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-profit-500 px-5 py-3 text-sm font-bold text-navy-950 shadow-[0_12px_30px_rgba(32,199,111,0.25)]">
              Apply Now <ArrowRight size={16} />
            </Link>
            <Link href={whatsappUrl} target="_blank" rel="noreferrer" onClick={closeMenu} className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-bold text-navy-950">
              <MessageCircle size={17} className="text-profit-600" />
              WhatsApp
            </Link>
          </div>
        </nav>
      </div>
    </header>
  );
}
