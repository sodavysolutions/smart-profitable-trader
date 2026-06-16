import { Card, DataTable, SectionHeader, StatusBadge } from "@/components/UI";
import { SPTAdminShell } from "@/components/spt/admin-shell";
import { communications } from "@/lib/data";
import { requireAdmin } from "@/lib/spt-admin-auth";

export const dynamic = "force-dynamic";

export default async function SPTAdminCommunicationsPage() {
  const session = await requireAdmin();

  return (
    <SPTAdminShell title="Communications" role={session.role}>
      <Card>
        <SectionHeader
          title="Communication log"
          text="Sendy, WhatsApp, and SMS providers are isolated behind environment-backed service placeholders. Every sent or failed message is designed to be saved here."
        />
        <DataTable
          columns={["Recipient", "Channel", "Title", "Status", "Date"]}
          rows={communications.map((item) => [
            item.recipient,
            item.channel,
            item.title,
            <StatusBadge key={`${item.recipient}-${item.title}`} value={String(item.status)} />,
            item.date
          ])}
        />
      </Card>
    </SPTAdminShell>
  );
}
