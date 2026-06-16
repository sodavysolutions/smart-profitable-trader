import { Card, DataTable, ProgressBar, SectionHeader, StatusBadge } from "@/components/UI";
import { SPTAdminShell } from "@/components/spt/admin-shell";
import { currency, customers, growth } from "@/lib/data";
import { requireAdmin } from "@/lib/spt-admin-auth";

export const dynamic = "force-dynamic";

export default async function SPTAdminAccountsPage() {
  const session = await requireAdmin();
  const evaluation = customers.filter((customer) => customer.type.includes("Evaluation"));
  const funded = customers.filter((customer) => customer.type.includes("Funded"));
  const copy = customers.filter((customer) => customer.type.includes("Copy"));
  const personal = customers.filter((customer) => customer.type.includes("Personal"));

  return (
    <SPTAdminShell title="Account Tracking" role={session.role}>
      <AccountSection title="Copy Trading Subscribers" rows={copy} />
      <AccountSection title="Evaluation Account Management" rows={evaluation} evaluation />
      <AccountSection title="Funded Account Trading" rows={funded} />
      <AccountSection title="Personal Account Trade Management" rows={personal} />
    </SPTAdminShell>
  );
}

function AccountSection({ title, rows, evaluation = false }: { title: string; rows: typeof customers; evaluation?: boolean }) {
  return (
    <Card className="mb-6">
      <SectionHeader
        title={title}
        text={
          evaluation
            ? "Phase target, overall progress, daily drawdown, max drawdown, and manual update fields are represented for evaluation workflows."
            : undefined
        }
      />
      <DataTable
        caption={`${title} account tracking`}
        columns={["Client", "Firm/Broker", "Login", "Start", "Current", "Growth", "Status", evaluation ? "Drawdown usage" : "Next date"]}
        rows={rows.map((customer) => [
          customer.name,
          customer.firm,
          customer.accountLogin,
          currency(customer.initialCapital),
          currency(customer.currentBalance),
          <div key={`${customer.id}-growth`} className="w-36">
            <ProgressBar label={`${customer.name} account growth`} value={Math.max(5, Math.min(100, growth(customer.initialCapital, customer.currentBalance) * 10))} />
          </div>,
          <StatusBadge key={`${customer.id}-status`} value={customer.status} />,
          evaluation ? (
            <div key={`${customer.id}-drawdown`} className="w-28">
              <ProgressBar label={`${customer.name} drawdown usage`} value={customer.status.includes("Drawdown") ? 78 : 24} danger />
            </div>
          ) : (
            customer.renewal
          )
        ])}
      />
    </Card>
  );
}
