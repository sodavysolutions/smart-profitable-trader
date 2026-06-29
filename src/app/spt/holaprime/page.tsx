import type { Metadata } from "next";
import Link from "next/link";
import { CheckCircle2, ArrowRight, Shield, TrendingUp, Zap, DollarSign } from "lucide-react";

export const metadata: Metadata = {
  title: "Get Started with HolaPrime | Smart Profits Trader",
  description:
    "Access $10,000–$200,000 in funded prop capital through HolaPrime — our recommended prop firm partner. Instant funded and evaluation accounts available from just $50.",
};

const HOLAPRIME_URL = "https://holaprime.com?affiliateId=smartprofitsalgo";
const APPLY_URL = "https://www.smartprofitstrader.com/spt/apply";

const accounts = [
  { size: "$10,000", challenge: "$50", monthly: "$650", split: "80/20" },
  { size: "$25,000", challenge: "$100", monthly: "$1,625", split: "80/20" },
  { size: "$50,000", challenge: "$200", monthly: "$3,250", split: "80/20" },
  { size: "$100,000", challenge: "$300", monthly: "$6,500", split: "80/20" },
  { size: "$200,000", challenge: "$400", monthly: "$13,000", split: "80/20" },
];

const whyHolaPrime = [
  { icon: Zap, title: "Instant Funded Accounts", body: "Skip the challenge entirely. Get funded capital immediately with no evaluation phase." },
  { icon: Shield, title: "80/20 Profit Split", body: "Keep 80% of all profits generated. One of the best splits in the industry." },
  { icon: TrendingUp, title: "Algo-Friendly Rules", body: "HolaPrime allows EAs and automated trading — perfect for our Smart Profit Algo." },
  { icon: DollarSign, title: "From $50 to Start", body: "The lowest barrier to entry of any major prop firm. Begin your journey for just $50." },
];

const steps = [
  { step: "1", title: "Register with HolaPrime", body: "Click the button below to create your HolaPrime account through our partner link." },
  { step: "2", title: "Choose your account size", body: "Pick from $10K to $200K. Start small and scale as profits grow." },
  { step: "3", title: "Apply to Smart Profits Trader", body: "Submit your application so our team can manage the trading on your behalf." },
  { step: "4", title: "Receive monthly profit share", body: "Sit back while the Smart Profit Algo trades. Collect your 65% profit distribution monthly." },
];

export default function HolaPrimePage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-navy-950 via-[#0a2240] to-[#071F3D]">
      {/* Hero */}
      <section className="mx-auto max-w-5xl px-4 pb-12 pt-16 text-center sm:px-6 sm:pt-24">
        <span className="inline-flex items-center gap-2 rounded-full border border-profit-500/30 bg-profit-500/10 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-profit-400">
          <span className="h-1.5 w-1.5 rounded-full bg-profit-400" />
          Official Partner
        </span>

        <h1 className="mt-5 text-4xl font-extrabold leading-tight text-white sm:text-5xl lg:text-[3.25rem]">
          Access Up to <span className="text-profit-400">$200,000</span> in{" "}
          <br className="hidden sm:block" />
          Funded Prop Capital
        </h1>
        <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-slate-300">
          HolaPrime is our recommended prop firm partner. Register through our link, choose your account size, and let the Smart Profit Algo trade it for you — starting from just $50.
        </p>

        <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <a
            href={HOLAPRIME_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-profit-500 px-8 py-4 text-base font-bold text-navy-950 shadow-[0_12px_30px_rgba(32,199,111,0.3)] transition hover:bg-profit-400 sm:w-auto"
          >
            Register with HolaPrime <ArrowRight size={18} />
          </a>
          <Link
            href={APPLY_URL}
            className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-white/20 bg-white/5 px-8 py-4 text-base font-bold text-white transition hover:bg-white/10 sm:w-auto"
          >
            Apply to Smart Profits Trader
          </Link>
        </div>
      </section>

      {/* Account sizes table */}
      <section className="mx-auto max-w-4xl px-4 pb-16 sm:px-6">
        <h2 className="mb-6 text-center text-2xl font-bold text-white">Account Sizes & Projections</h2>
        <div className="overflow-hidden rounded-2xl border border-white/10">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-white/10 text-left text-xs font-bold uppercase tracking-widest text-slate-400">
                <th className="px-5 py-4">Account Size</th>
                <th className="px-5 py-4">Challenge Fee</th>
                <th className="px-5 py-4">Est. Monthly Profit*</th>
                <th className="px-5 py-4">Your Share (65%)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 bg-white/5">
              {accounts.map((row) => (
                <tr key={row.size} className="transition hover:bg-white/[0.04]">
                  <td className="px-5 py-4 font-bold text-white">{row.size}</td>
                  <td className="px-5 py-4 text-profit-400 font-semibold">{row.challenge}</td>
                  <td className="px-5 py-4 text-slate-300">{row.monthly}</td>
                  <td className="px-5 py-4 font-bold text-profit-400">
                    ${Math.round(parseFloat(row.monthly.replace(/[$,]/g, "")) * 0.65).toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-3 text-center text-xs text-slate-500">
          *Based on 13% monthly return target. Trading involves risk and returns are not guaranteed.
        </p>
      </section>

      {/* Why HolaPrime */}
      <section className="border-t border-white/10 bg-white/5 py-16">
        <div className="mx-auto max-w-5xl px-4 sm:px-6">
          <h2 className="mb-10 text-center text-2xl font-bold text-white">Why We Recommend HolaPrime</h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {whyHolaPrime.map(({ icon: Icon, title, body }) => (
              <div key={title} className="rounded-2xl border border-white/10 bg-white/5 p-6">
                <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-profit-500/20">
                  <Icon className="h-5 w-5 text-profit-400" />
                </div>
                <h3 className="mb-2 font-bold text-white">{title}</h3>
                <p className="text-sm leading-6 text-slate-400">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="mx-auto max-w-4xl px-4 py-16 sm:px-6">
        <h2 className="mb-10 text-center text-2xl font-bold text-white">How It Works</h2>
        <div className="grid gap-6 sm:grid-cols-2">
          {steps.map(({ step, title, body }) => (
            <div key={step} className="flex gap-4 rounded-2xl border border-white/10 bg-white/5 p-6">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-profit-500 text-sm font-extrabold text-navy-950">
                {step}
              </span>
              <div>
                <h3 className="font-bold text-white">{title}</h3>
                <p className="mt-1 text-sm leading-6 text-slate-400">{body}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-white/10 bg-profit-500/10 py-16">
        <div className="mx-auto max-w-2xl px-4 text-center sm:px-6">
          <h2 className="text-2xl font-extrabold text-white sm:text-3xl">
            Ready to Get Funded?
          </h2>
          <p className="mt-3 text-slate-300">
            Register with HolaPrime through our partner link, then apply to Smart Profits Trader so our team can manage your account.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <a
              href={HOLAPRIME_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-profit-500 px-8 py-4 text-base font-bold text-navy-950 shadow-[0_12px_30px_rgba(32,199,111,0.3)] transition hover:bg-profit-400 sm:w-auto"
            >
              Register with HolaPrime <ArrowRight size={18} />
            </a>
            <Link
              href={APPLY_URL}
              className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-white/20 bg-white/5 px-8 py-4 text-base font-bold text-white transition hover:bg-white/10 sm:w-auto"
            >
              Apply Now
            </Link>
          </div>
          <p className="mt-5 text-xs text-slate-500">
            Trading involves risk. Prop firm challenges can fail. Only invest what you can afford to lose.
          </p>
        </div>
      </section>
    </main>
  );
}
