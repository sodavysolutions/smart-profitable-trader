import { PublicShell } from "@/components/PublicShell";
import { Card } from "@/components/UI";

export default function AboutPage() {
  return (
    <PublicShell>
      <section className="page-shell py-14">
        <h1 className="text-4xl font-semibold text-navy-950">About Smart Profits Trader</h1>
        <p className="mt-4 max-w-3xl leading-7 text-slate-600">
          Smart Profits Trader is designed around disciplined account management, transparent operations, client communication, and risk-aware growth.
        </p>
        <div className="mt-10 grid gap-5 md:grid-cols-2">
          {[
            ["Mission", "Help clients access structured trading solutions with clear communication, responsible risk controls, and organized progress tracking."],
            ["Vision", "Become a trusted operating system for trading service delivery across copy trading, prop firm, and personal account management."],
            ["Values", "Clarity, discipline, consistency, transparency, and client accountability."],
            ["Risk management philosophy", "Growth only matters when drawdown, account rules, and capital exposure are respected."]
          ].map(([title, text]) => (
            <Card key={title}>
              <h2 className="text-xl font-semibold text-navy-950">{title}</h2>
              <p className="mt-3 leading-7 text-slate-600">{text}</p>
            </Card>
          ))}
        </div>
      </section>
    </PublicShell>
  );
}
