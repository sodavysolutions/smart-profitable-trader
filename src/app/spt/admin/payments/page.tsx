import { Card, DataTable, SectionHeader, StatusBadge } from "@/components/UI";
import { SPTAdminShell } from "@/components/spt/admin-shell";
import { currency, customers } from "@/lib/data";
import { requireAdmin } from "@/lib/spt-admin-auth";

export const dynamic = "force-dynamic";

export default async function SPTAdminPaymentsPage() {
  const session = await requireAdmin();
  const payments = customers.map((customer, index) => ({
    customer: customer.name,
    service: customer.type,
    amount: [500, 150, 1200, 2500, 150, 900, 3800, 750, 150, 650][index],
    method: index % 2 ? "Bank Transfer" : "Card",
    status: index % 4 === 0 ? "Pending" : "Paid",
    reference: `INV-${3000 + index}`
  }));

  return (
    <SPTAdminShell title="Payments" role={session.role}>
      <Card>
        <SectionHeader title="Revenue records" text="Customer payments, setup fees, subscriptions, profit-share payments, evaluation fees, funded account fees, and personal management fees." />
        <DataTable
          columns={["Customer", "Service", "Amount", "Method", "Status", "Reference"]}
          rows={payments.map((payment) => [
            payment.customer,
            payment.service,
            currency(payment.amount),
            payment.method,
            <StatusBadge key={payment.reference} value={payment.status} />,
            payment.reference
          ])}
        />
      </Card>
    </SPTAdminShell>
  );
}
