import type { Metadata } from "next";
import Link from "next/link";
import { CheckCircle2, Download, Mail } from "lucide-react";

export const metadata: Metadata = {
  title: "Your Blueprint Is On Its Way | Smart Profits Trader",
  description: "Check your inbox — we've sent you the Smart Money Blueprint.",
  robots: { index: false },
};

const BLUEPRINT_URL =
  "https://docs.google.com/document/d/1xcId6yW0WU41skGRcoS630kB7sxHKmdd/export?format=pdf";

export default function ThankYouPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-gradient-to-br from-navy-950 via-[#0a2240] to-[#071F3D] px-4 py-20">
      <div className="w-full max-w-lg">
        {/* Card */}
        <div className="rounded-2xl bg-white p-8 text-center shadow-2xl sm:p-10">
          {/* Icon */}
          <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-profit-100">
            <CheckCircle2 className="h-8 w-8 text-profit-600" />
          </div>

          <h1 className="text-2xl font-extrabold text-navy-950 sm:text-3xl">
            You're in! Check your inbox.
          </h1>
          <p className="mt-3 text-base leading-7 text-slate-500">
            We've emailed your <strong className="text-slate-700">Smart Money Blueprint</strong> to you right now. Check your spam folder if you don't see it within a few minutes.
          </p>

          {/* Direct download */}
          <a
            href={BLUEPRINT_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-flex w-full items-center justify-center gap-2.5 rounded-xl bg-profit-500 px-6 py-4 text-base font-bold text-navy-950 shadow transition hover:bg-profit-400"
          >
            <Download className="h-5 w-5" />
            Download Blueprint Now
          </a>

          {/* What to expect */}
          <div className="mt-8 rounded-xl border border-slate-100 bg-slate-50 p-5 text-left">
            <div className="flex items-center gap-2 text-sm font-semibold text-slate-700">
              <Mail className="h-4 w-4 text-profit-500" />
              What happens next
            </div>
            <ul className="mt-3 grid gap-2 text-sm text-slate-600">
              <li className="flex items-start gap-2">
                <span className="mt-0.5 font-bold text-profit-500">1.</span>
                You'll receive the blueprint by email right now.
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-0.5 font-bold text-profit-500">2.</span>
                Over the next 24 hours, you'll get 10 more emails packed with insights tailored to your interest area.
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-0.5 font-bold text-profit-500">3.</span>
                After that, we'll send 2–3 emails per week helping you take your next step.
              </li>
            </ul>
          </div>

          <p className="mt-6 text-sm text-slate-500">
            Ready to get started?{" "}
            <Link href="/spt/apply" className="font-semibold text-profit-600 hover:underline">
              Apply for the programme →
            </Link>
          </p>
        </div>

        {/* Back link */}
        <p className="mt-6 text-center text-sm text-slate-400">
          <Link href="/" className="hover:text-white hover:underline">
            ← Back to Smart Profits Trader
          </Link>
        </p>
      </div>
    </main>
  );
}
