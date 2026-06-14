import { AdminShell } from "@/components/AdminShell";
import { Card, DataTable, SectionHeader, StatusBadge } from "@/components/UI";
import { currency, reminders } from "@/lib/data";

export default function RemindersPage() {
  return (
    <AdminShell title="Subscriptions and Renewal Reminders">
      <Card>
        <SectionHeader title="Reminder queue" text="Daily scheduled checks identify renewals due in 7 days, 3 days, today, and overdue, then send configured admin/customer reminders." />
        <DataTable columns={["Subscription", "Type", "Related", "Amount", "Renewal date", "Rule"]} rows={reminders.map((reminder) => [reminder.name, reminder.type, reminder.related, currency(Number(reminder.amount)), reminder.renewal, <StatusBadge key={String(reminder.name)} value={String(reminder.rule)} />])} />
      </Card>
    </AdminShell>
  );
}
