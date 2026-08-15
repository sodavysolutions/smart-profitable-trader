import type { Metadata } from "next";
import { ApplicationForm } from "@/components/ApplicationForm";
import { CopyTradingHeader } from "@/components/spt/copy-trading-funnel";
import { CheckCircle2 } from "lucide-react";

export const metadata: Metadata = {
  title: "Apply for Copy Trading | Smart Profits Trader",
  description:
    "Apply for Smart Profits Trader Copy Trading. No experience needed. No broker account required upfront. Takes 2 minutes.",
};

export default function CopyTradingApplyPage() {
  return (
    // Distraction-free apply page — uses funnel header (no main site nav)
    <main className="min-h-screen bg-white">
      <CopyTradingHeader />

      <section className="page-shell grid gap-10 py-12 lg:grid-cols-[380px_1fr]">
        {/* ── Left: context panel ── */}
        <div>
          <span className="inline-block rounded-full border border-profit-200 bg-profit-50 px-3 py-1 text-[11px] font-bold uppercase tracking-widest text-profit-700">
            Step 1 of 4 — Apply
          </span>
          <h1 className="mt-4 text-3xl font-bold leading-tight text-navy-950 sm:text-4xl">
            Apply for Copy Trading
          </h1>
          <p className="mt-4 leading-7 text-slate-600">
            Fill the form below. Our team will review your details and contact you on WhatsApp within 24 hours to confirm your spot and walk you through the next steps.
          </p>

          <div className="mt-6 space-y-3">
            {[
              "Application is free — no payment required.",
              "No broker account needed yet — we help you open one.",
              "No trading experience required.",
              "Your money always stays in your own account.",
            ].map((item) => (
              <div key={item} className="flex items-start gap-2.5 text-sm text-slate-700">
                <CheckCircle2 size={15} className="mt-0.5 shrink-0 text-profit-500" />
                {item}
              </div>
            ))}
          </div>

          <div className="mt-8 rounded-[18px] border border-amber-200 bg-amber-50 p-4 text-sm leading-6 text-amber-800">
            Trading involves risk. Results are not guaranteed. Only participate with funds you can afford to risk.
          </div>

          <div className="mt-6 rounded-[18px] border border-slate-200 bg-slate-50 p-4">
            <p className="text-sm font-semibold text-navy-950">Need help first?</p>
            <p className="mt-1 text-sm text-slate-600">
              Chat with us on WhatsApp:{" "}
              <a
                href="https://wa.me/447344589579?text=Hello%2C%20I%20want%20to%20apply%20for%20Copy%20Trading%20but%20have%20a%20question%20first."
                target="_blank"
                rel="noreferrer"
                className="font-semibold text-profit-600 hover:underline"
              >
                +44 7344 589579
              </a>
            </p>
          </div>
        </div>

        {/* ── Right: form ── */}
        <ApplicationForm initialService="copy-trading" thankYouPath="/spt/thank-you" />
      </section>

      {/* Minimal footer — no links to other services */}
      <footer className="border-t border-slate-200 bg-slate-50 py-6 text-center text-xs text-slate-400">
        Smart Profits Trader · Trading involves significant risk · Results are not guaranteed
      </footer>
    </main>
  );
}
