import { AdminShell } from "@/components/AdminShell";
import { Card, DataTable, SectionHeader, StatusBadge } from "@/components/UI";
import { currency, profitShares } from "@/lib/data";

export default function ProfitSharePage() {
  return (
    <AdminShell title="Profit Share System">
      <Card>
        <SectionHeader title="Profit-share history" text="Setup-fee clients default to 65% client / 35% company. No-setup-fee clients default to 50% client / 50% company, with custom override support." />
        <DataTable
          columns={["Customer", "Account", "Profit", "Tier", "Client share", "Company share", "Paid", "Pending", "Status"]}
          rows={profitShares.map((item) => [
            item.customer,
            item.account,
            currency(item.totalProfit),
            item.tier,
            currency(item.clientShare),
            currency(item.companyShare),
            currency(item.paid),
            currency(item.pending),
            <StatusBadge key={item.customer} value={item.status} />
          ])}
        />
      </Card>
    </AdminShell>
  );
}
