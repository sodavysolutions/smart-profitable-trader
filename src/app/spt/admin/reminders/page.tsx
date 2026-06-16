import { Card, DataTable, SectionHeader, StatusBadge } from "@/components/UI";
import { SPTAdminShell } from "@/components/spt/admin-shell";
import { currency, reminders } from "@/lib/data";
import { requireAdmin } from "@/lib/spt-admin-auth";

export const dynamic = "force-dynamic";

export default async function SPTAdminRemindersPage() {
  const session = await requireAdmin();

  return (
    <SPTAdminShell title="Reminders" role={session.role}>
      <Card>
        <SectionHeader title="Reminder queue" text="Daily scheduled checks identify renewals due in 7 days, 3 days, today, and overdue, then send configured admin and customer reminders." />
        <DataTable
          columns={["Subscription", "Type", "Related", "Amount", "Renewal date", "Rule"]}
          rows={reminders.map((reminder) => [
            reminder.name,
            reminder.type,
            reminder.related,
            currency(Number(reminder.amount)),
            reminder.renewal,
            <StatusBadge key={String(reminder.name)} value={String(reminder.rule)} />
          ])}
        />
      </Card>
    </SPTAdminShell>
  );
}
