import type { Metadata } from "next";
import Link from "next/link";
import { CheckCircle2, Zap, TrendingUp, Shield, Clock, ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "VIP Signals Membership | Smart Profits Trader",
  description: "Get real-time algo-powered trading signals delivered directly to your Telegram. $50/month. Cancel anytime.",
};

const perks = [
  { icon: Zap, title: "Real-Time Signals", body: "Receive algo-generated trade setups the moment they trigger — no delays, no second-guessing." },
  { icon: TrendingUp, title: "Entry, TP & SL Included", body: "Every signal comes with a precise entry price, take profit targets, and stop loss level." },
  { icon: Shield, title: "Risk-Managed Trades", body: "All signals are filtered through our Smart Profit Algo risk protocol. Max drawdown is controlled." },
  { icon: Clock, title: "Multiple Sessions", body: "Signals cover London, New York, and Asian sessions — trade whenever suits your schedule." },
];

const included = [
  "Telegram group access (instant signals)",
  "Gold (XAUUSD) & forex pairs",
  "Entry, TP1, TP2, and Stop Loss on every signal",
  "Market analysis & commentary",
  "Signal performance recap (weekly)",
  "Direct access to Solomon's trading desk",
];

export default function VipPage() {
  const searchParams = typeof window !== "undefined" ? new URLSearchParams(window.location.search) : null;
  const hasError = false; // handled client-side

  return (
    <main className="min-h-screen bg-gradient-to-br from-navy-950 via-[#0a2240] to-[#071F3D]">
      {/* Hero */}
      <section className="mx-auto max-w-5xl px-4 pb-12 pt-16 text-center sm:px-6 sm:pt-24">
        <span className="inline-flex items-center gap-2 rounded-full border border-profit-500/30 bg-profit-500/10 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-profit-400">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-profit-400" />
          Live Signals Active
        </span>

        <h1 className="mt-5 text-4xl font-extrabold leading-tight text-white sm:text-5xl lg:text-[3.25rem]">
          Join the <span className="text-profit-400">VIP Signals Group</span>
          <br className="hidden sm:block" />
          — Trade Smarter, Daily
        </h1>
        <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-slate-300">
          Get real-time algo-powered trading signals delivered straight to your Telegram. Entry, TP, SL — everything you need to execute with confidence.
        </p>

        <div className="mt-8 flex flex-col items-center gap-3">
          <div className="rounded-2xl border border-profit-500/30 bg-profit-500/10 px-8 py-4 text-center">
            <span className="block text-4xl font-extrabold text-profit-400">$50</span>
            <span className="block text-sm font-medium text-slate-400">per month · cancel anytime</span>
          </div>
          <Link
            href="/spt/vip/checkout"
            className="inline-flex items-center gap-2 rounded-xl bg-profit-500 px-10 py-4 text-base font-bold text-navy-950 shadow-[0_12px_30px_rgba(32,199,111,0.3)] transition hover:bg-profit-400"
          >
            Subscribe Now <ArrowRight size={18} />
          </Link>
          <p className="text-xs text-slate-500">Paystack (NGN) or USDT/USDC crypto accepted</p>
        </div>
      </section>

      {/* Perks */}
      <section className="mx-auto max-w-5xl px-4 pb-16 sm:px-6">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {perks.map(({ icon: Icon, title, body }) => (
            <div key={title} className="rounded-2xl border border-white/10 bg-white/5 p-6">
              <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-profit-500/20">
                <Icon className="h-5 w-5 text-profit-400" />
              </div>
              <h3 className="mb-2 font-bold text-white">{title}</h3>
              <p className="text-sm leading-6 text-slate-400">{body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* What's included */}
      <section className="border-t border-white/10 bg-white/5 py-16">
        <div className="mx-auto max-w-2xl px-4 sm:px-6">
          <h2 className="mb-8 text-center text-2xl font-bold text-white">Everything Included for $50/month</h2>
          <ul className="space-y-3">
            {included.map((item) => (
              <li key={item} className="flex items-start gap-3">
                <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-profit-400" />
                <span className="text-slate-300">{item}</span>
              </li>
            ))}
          </ul>
          <div className="mt-10 text-center">
            <Link
              href="/spt/vip/checkout"
              className="inline-flex items-center gap-2 rounded-xl bg-profit-500 px-10 py-4 text-base font-bold text-navy-950 shadow-[0_12px_30px_rgba(32,199,111,0.3)] transition hover:bg-profit-400"
            >
              Get Instant Access <ArrowRight size={18} />
            </Link>
            <p className="mt-3 text-xs text-slate-500">
              Access is granted within minutes of payment confirmation.
            </p>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="mx-auto max-w-2xl px-4 py-16 sm:px-6">
        <h2 className="mb-8 text-center text-2xl font-bold text-white">Common Questions</h2>
        <div className="space-y-4">
          {[
            { q: "How do I receive signals?", a: "After subscribing, you'll receive a one-time Telegram invite link by email. Join via that link and signals appear directly in the group." },
            { q: "What payment methods do you accept?", a: "Paystack for Nigerian subscribers (NGN bank transfer, cards, USSD) and USDT/USDC via TRC20 or BEP20 for international subscribers." },
            { q: "What happens when my 30 days expire?", a: "You'll receive reminder emails at 7, 3, and 1 day before expiry. If you don't renew, you'll be removed from the group automatically." },
            { q: "Can I cancel anytime?", a: "Yes. Your access runs for the full 30 days you paid for. Just don't renew and you won't be charged again." },
            { q: "What instruments do you signal?", a: "Primarily Gold (XAUUSD) and major forex pairs. High-probability setups only — typically 3–7 signals per week." },
          ].map(({ q, a }) => (
            <div key={q} className="rounded-xl border border-white/10 bg-white/5 p-5">
              <h3 className="mb-2 font-bold text-white">{q}</h3>
              <p className="text-sm leading-6 text-slate-400">{a}</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
