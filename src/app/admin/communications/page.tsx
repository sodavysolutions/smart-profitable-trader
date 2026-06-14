import { AdminShell } from "@/components/AdminShell";
import { Card, DataTable, SectionHeader, StatusBadge } from "@/components/UI";
import { communications } from "@/lib/data";

export default function CommunicationsPage() {
  return (
    <AdminShell title="Communication System">
      <Card>
        <SectionHeader title="Communication log" text="Sendy, WhatsApp, and SMS providers are isolated behind environment-backed service placeholders. Every sent or failed message is designed to be saved here." />
        <DataTable columns={["Recipient", "Channel", "Title", "Status", "Date"]} rows={communications.map((item) => [item.recipient, item.channel, item.title, <StatusBadge key={String(item.title)} value={String(item.status)} />, item.date])} />
      </Card>
    </AdminShell>
  );
}
