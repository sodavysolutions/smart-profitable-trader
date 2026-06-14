import type { Metadata } from "next";
import { ApplicationForm } from "@/components/ApplicationForm";
import { SPTPageShell } from "@/components/spt/sections";

export const metadata: Metadata = {
  title: "Apply | Smart Profitable Trader",
  description: "Apply for VIP signals, copy trading, personal account trading, instant funded prop trading, or evaluation account management with Smart Profitable Trader."
};

export default async function SPTApplyPage({ searchParams }: { searchParams: Promise<{ service?: string }> }) {
  const { service } = await searchParams;

  return (
    <SPTPageShell>
      <section className="page-shell grid gap-10 py-16 lg:grid-cols-[420px_1fr]">
        <div>
          <h1 className="text-4xl font-semibold text-navy-950">Apply to Join Smart Profitable Trader</h1>
          <p className="mt-4 leading-7 text-slate-600">
            Submit your details and select the trading pathway you are interested in. Our team will review your application and follow up with the next steps.
          </p>
          <p className="mt-5 rounded-[18px] border border-red-200 bg-red-50 p-4 text-sm leading-6 text-red-800">
            Trading involves risk and results are not guaranteed. Only participate after you understand the possible risks and losses.
          </p>
        </div>
        <ApplicationForm initialService={service ?? "general"} thankYouPath="/spt/thank-you" />
      </section>
    </SPTPageShell>
  );
}
