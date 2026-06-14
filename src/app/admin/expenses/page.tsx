import { AdminShell } from "@/components/AdminShell";
import { Card, DataTable, SectionHeader, StatusBadge } from "@/components/UI";
import { currency, expenses } from "@/lib/data";

export default function ExpensesPage() {
  return (
    <AdminShell title="Business Expense Management">
      <Card>
        <SectionHeader title="Monthly expenses" text="Track Codex fees, VPS, copier, data, hosting, email, WhatsApp/SMS, staff, internet, software, and miscellaneous costs." />
        <DataTable columns={["Expense", "Category", "Amount", "Cycle", "Status", "Renewal"]} rows={expenses.map((expense) => [expense.name, expense.category, currency(Number(expense.amount)), expense.cycle, <StatusBadge key={String(expense.name)} value={String(expense.status)} />, expense.renewal])} />
      </Card>
    </AdminShell>
  );
}
