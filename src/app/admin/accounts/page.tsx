import { AdminShell } from "@/components/AdminShell";
import { Card, DataTable, ProgressBar, SectionHeader, StatusBadge } from "@/components/UI";
import { currency, customers, growth } from "@/lib/data";

export default function AccountsPage() {
  const evaluation = customers.filter((customer) => customer.type.includes("Evaluation"));
  const funded = customers.filter((customer) => customer.type.includes("Funded"));
  const copy = customers.filter((customer) => customer.type.includes("Copy"));
  const personal = customers.filter((customer) => customer.type.includes("Personal"));
  return (
    <AdminShell title="Service-Specific Account Tracking">
      <AccountSection title="Copy Trading Subscribers" rows={copy} />
      <AccountSection title="Evaluation Account Management" rows={evaluation} evaluation />
      <AccountSection title="Funded Account Trading" rows={funded} />
      <AccountSection title="Personal Account Trade Management" rows={personal} />
    </AdminShell>
  );
}

function AccountSection({ title, rows, evaluation = false }: { title: string; rows: typeof customers; evaluation?: boolean }) {
  return (
    <Card className="mb-6">
      <SectionHeader title={title} text={evaluation ? "Phase target, overall progress, daily drawdown, max drawdown, and manual update fields are represented for evaluation workflows." : undefined} />
      <DataTable
        columns={["Client", "Firm/Broker", "Login", "Start", "Current", "Growth", "Status", evaluation ? "Drawdown usage" : "Next date"]}
        rows={rows.map((customer) => [
          customer.name,
          customer.firm,
          customer.accountLogin,
          currency(customer.initialCapital),
          currency(customer.currentBalance),
          <div key={customer.id} className="w-36"><ProgressBar value={Math.max(5, Math.min(100, growth(customer.initialCapital, customer.currentBalance) * 10))} /></div>,
          <StatusBadge key={customer.id} value={customer.status} />,
          evaluation ? <div key={customer.id} className="w-28"><ProgressBar value={customer.status.includes("Drawdown") ? 78 : 24} danger /></div> : customer.renewal
        ])}
      />
    </Card>
  );
}
