import type { Metadata } from "next";
import { CheckCircle2 } from "lucide-react";
import { LeadMagnetForm } from "./LeadMagnetForm";

export const metadata: Metadata = {
  title: "Free Download: The Smart Money Blueprint | Smart Profits Trader",
  description:
    "Download the Smart Money Blueprint — the step-by-step system to build $10,000+/month in trading income starting from just $200. Free instant access.",
};

const blueprintHighlights = [
  "The 4-tier system from $200 to $10,000+/month",
  "How to access $200K in prop capital for just $400",
  "Copy trading income projections at every account size",
  "The 7 Golden Rules that protect your capital",
  "The full compounding roadmap — month by month",
  "12 milestones to hit on your way to financial freedom",
];

export default function SmartMoneyBlueprintPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-navy-950 via-[#0a2240] to-[#071F3D]">
      {/* Hero */}
      <section className="mx-auto max-w-6xl px-4 pb-8 pt-14 sm:px-6 sm:pt-20">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          {/* Left — copy */}
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-profit-500/30 bg-profit-500/10 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-profit-400">
              <span className="h-1.5 w-1.5 rounded-full bg-profit-400" />
              Free Download
            </span>

            <h1 className="mt-5 text-4xl font-extrabold leading-tight tracking-tight text-white sm:text-5xl lg:text-[3.25rem]">
              The Smart Money Blueprint
            </h1>
            <p className="mt-4 text-xl font-semibold text-profit-400">
              From $200 to $10,000/Month Through Algo-Powered Trading
            </p>
            <p className="mt-4 text-base leading-7 text-slate-300">
              The complete step-by-step system used by Smart Profits Trader clients to build sustainable, passive trading income — starting from as little as $200, regardless of experience.
            </p>

            <ul className="mt-7 grid gap-3 sm:grid-cols-2">
              {blueprintHighlights.map((item) => (
                <li key={item} className="flex items-start gap-2.5 text-sm leading-6 text-slate-300">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-profit-400" />
                  {item}
                </li>
              ))}
            </ul>

            {/* Blueprint preview */}
            <div className="mt-8 overflow-hidden rounded-2xl border border-white/10 shadow-2xl">
              <div className="flex items-center gap-2 border-b border-white/10 bg-white/5 px-4 py-2">
                <span className="h-2.5 w-2.5 rounded-full bg-red-400" />
                <span className="h-2.5 w-2.5 rounded-full bg-yellow-400" />
                <span className="h-2.5 w-2.5 rounded-full bg-profit-400" />
                <span className="ml-2 text-xs text-slate-400">Smart Money Blueprint.pdf</span>
              </div>
              <div className="grid grid-cols-2 gap-3 bg-white/5 p-4">
                {[
                  { label: "Start From", value: "$200" },
                  { label: "Monthly Target", value: "5–30%" },
                  { label: "Prop Capital Access", value: "$200K" },
                  { label: "Income Goal", value: "$10K+/mo" },
                ].map((stat) => (
                  <div key={stat.label} className="rounded-lg bg-white/5 p-3 text-center">
                    <p className="text-lg font-bold text-profit-400">{stat.value}</p>
                    <p className="text-xs text-slate-400">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right — form */}
          <div>
            <div className="rounded-2xl bg-white p-6 shadow-2xl sm:p-8">
              <div className="mb-6">
                <h2 className="text-xl font-bold text-navy-950">Get Instant Free Access</h2>
                <p className="mt-1 text-sm text-slate-500">
                  Enter your details below to download the blueprint and receive a tailored email series based on your trading goal.
                </p>
              </div>
              <LeadMagnetForm />
            </div>

            {/* Trust bar */}
            <div className="mt-4 flex flex-wrap items-center justify-center gap-4 text-xs text-slate-400">
              <span>✓ Instant download</span>
              <span>✓ 100% free</span>
              <span>✓ No credit card</span>
              <span>✓ Unsubscribe anytime</span>
            </div>
          </div>
        </div>
      </section>

      {/* Social proof strip */}
      <section className="border-t border-white/10 bg-white/5 py-10">
        <div className="mx-auto max-w-4xl px-4 text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-slate-400">
            Trusted by traders across
          </p>
          <p className="mt-2 text-2xl font-bold text-white">Nigeria · Ghana · UK · UAE · Canada · South Africa</p>
        </div>
      </section>
    </main>
  );
}
