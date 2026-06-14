import { AdminShell } from "@/components/AdminShell";
import { Card, DataTable, ProgressBar, SectionHeader, StatusBadge } from "@/components/UI";
import { currency, customers, growth } from "@/lib/data";

export default function CustomersPage() {
  return (
    <AdminShell title="Customer Management">
      <Card>
        <SectionHeader title="Customers" text="Manage customer category, platform, broker or prop firm, capital, balance, renewal, payment history, profit share, communications, and notes." />
        <DataTable
          columns={["Customer", "Type", "Platform", "Broker/Prop firm", "Balance", "Growth", "Status", "Renewal"]}
          rows={customers.map((customer) => [
            <span key={customer.id} className="font-semibold text-navy-950">{customer.name}</span>,
            customer.type,
            customer.platform,
            customer.firm,
            currency(customer.currentBalance),
            <div key={customer.id} className="w-32"><ProgressBar value={Math.max(5, Math.min(100, growth(customer.initialCapital, customer.currentBalance) * 10))} danger={customer.status.includes("Drawdown")} /></div>,
            <StatusBadge key={customer.id} value={customer.status} />,
            customer.renewal
          ])}
        />
      </Card>
    </AdminShell>
  );
}
