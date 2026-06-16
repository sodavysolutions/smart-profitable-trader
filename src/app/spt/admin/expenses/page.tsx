import { Card, DataTable, SectionHeader, StatusBadge } from "@/components/UI";
import { SPTAdminShell } from "@/components/spt/admin-shell";
import { currency, expenses } from "@/lib/data";
import { requireAdmin } from "@/lib/spt-admin-auth";

export const dynamic = "force-dynamic";

export default async function SPTAdminExpensesPage() {
  const session = await requireAdmin();

  return (
    <SPTAdminShell title="Expenses" role={session.role}>
      <Card>
        <SectionHeader title="Monthly expenses" text="Track Codex fees, VPS, copier, data, hosting, email, WhatsApp/SMS, staff, internet, software, and miscellaneous costs." />
        <DataTable
          columns={["Expense", "Category", "Amount", "Cycle", "Status", "Renewal"]}
          rows={expenses.map((expense) => [
            expense.name,
            expense.category,
            currency(Number(expense.amount)),
            expense.cycle,
            <StatusBadge key={String(expense.name)} value={String(expense.status)} />,
            expense.renewal
          ])}
        />
      </Card>
    </SPTAdminShell>
  );
}
