import type { Metadata } from "next";
import { ApplicationForm } from "@/components/ApplicationForm";
import { SPTPageShell } from "@/components/spt/sections";

export const metadata: Metadata = {
  title: "Contact | Smart Profitable Trader",
  description: "Contact Smart Profitable Trader for VIP signals, copy trading, prop trading, and evaluation account support."
};

export default function SPTContactPage() {
  return (
    <SPTPageShell>
      <section className="page-shell grid gap-10 py-16 lg:grid-cols-[420px_1fr]">
        <div>
          <h1 className="text-4xl font-semibold text-navy-950">Contact Smart Profitable Trader</h1>
          <p className="mt-4 leading-7 text-slate-600">
            Send a message, request a consultation, or apply for the trading pathway that fits your goals.
          </p>
          <div className="mt-6 space-y-3 text-sm text-slate-700">
            <p>Email: support@smartprofitabletrader.com</p>
            <p>
              WhatsApp:{" "}
              <a href="https://wa.me/2347087970133" target="_blank" rel="noreferrer" className="font-semibold text-profit-600 hover:text-navy-950">
                +234 708 797 0133
              </a>
            </p>
            <p>Social: Instagram, Facebook, LinkedIn</p>
          </div>
        </div>
        <ApplicationForm initialService="general" thankYouPath="/spt/thank-you" />
      </section>
    </SPTPageShell>
  );
}
