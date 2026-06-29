import type { Metadata } from "next";
import Link from "next/link";
import { CheckCircle2, ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Payment Confirmed — VIP Access Granted | Smart Profits Trader",
};

export default function VipSuccessPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-gradient-to-br from-navy-950 via-[#0a2240] to-[#071F3D] px-4">
      <div className="w-full max-w-md text-center">
        <CheckCircle2 className="mx-auto mb-6 h-20 w-20 text-profit-400" />
        <h1 className="mb-4 text-3xl font-extrabold text-white">Payment Confirmed!</h1>
        <p className="text-lg text-slate-300">
          Welcome to the <strong className="text-profit-400">SPT VIP Signals Group</strong>.
        </p>
        <p className="mt-3 text-slate-400">
          Check your email — your one-time Telegram invite link has been sent. The link is valid for <strong>48 hours</strong>.
        </p>

        <div className="mt-8 rounded-2xl border border-white/10 bg-white/5 p-6 text-left space-y-3">
          <p className="font-bold text-white">What happens next:</p>
          <ol className="space-y-2 text-sm text-slate-300">
            <li className="flex gap-2"><span className="font-bold text-profit-400">1.</span> Open the email from info@smartprofitstrader.com</li>
            <li className="flex gap-2"><span className="font-bold text-profit-400">2.</span> Click the Telegram invite link</li>
            <li className="flex gap-2"><span className="font-bold text-profit-400">3.</span> You&apos;ll be added to the VIP Signals group instantly</li>
            <li className="flex gap-2"><span className="font-bold text-profit-400">4.</span> You&apos;ll receive reminder emails 7, 3, and 1 day before your 30-day access expires</li>
          </ol>
        </div>

        <p className="mt-6 text-sm text-slate-500">
          Didn&apos;t receive the email? Check your spam folder or{" "}
          <a href="https://wa.me/2347087970133" target="_blank" rel="noreferrer" className="text-profit-400 hover:underline">
            message us on WhatsApp
          </a>
          .
        </p>

        <Link
          href="/spt/home"
          className="mt-8 inline-flex items-center gap-2 rounded-xl border border-white/20 bg-white/5 px-6 py-3 text-sm font-bold text-white transition hover:bg-white/10"
        >
          Back to Home <ArrowRight size={16} />
        </Link>
      </div>
    </main>
  );
}
