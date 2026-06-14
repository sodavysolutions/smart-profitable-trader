import type { Metadata } from "next";
import { SPTPageShell } from "@/components/spt/sections";

export const metadata: Metadata = {
  title: "Risk Disclaimer | Smart Profitable Trader",
  description: "Read the Smart Profitable Trader risk disclaimer. Trading involves risk and results are not guaranteed."
};

export default function SPTRiskDisclaimerPage() {
  return (
    <SPTPageShell>
      <section className="page-shell py-16">
        <h1 className="text-4xl font-semibold text-navy-950">Risk Disclaimer</h1>
        <div className="mt-6 max-w-4xl space-y-5 leading-7 text-slate-700">
          <p>Trading foreign exchange, contracts for difference, crypto, commodities, indices, or other leveraged instruments involves significant risk and may not be suitable for every client.</p>
          <p>Smart Profitable Trader does not guarantee profits, returns, pass rates, withdrawals, or funding outcomes. Past performance, examples, testimonials, or dashboard figures do not guarantee future results.</p>
          <p>The Smart Profit Algo supports analysis, testing, optimization, and trading decisions, but it cannot remove market risk. Losses, drawdown, failed accounts, missed targets, or unfavorable results can still happen.</p>
          <p>Clients should only trade with funds they can afford to risk and should understand all broker, prop firm, platform, leverage, drawdown, and withdrawal rules before participating.</p>
        </div>
      </section>
    </SPTPageShell>
  );
}
