import { Card, DataTable, SectionHeader, StatusBadge } from "@/components/UI";
import { SPTAdminShell } from "@/components/spt/admin-shell";
import { currency, profitShares } from "@/lib/data";
import { requireAdmin } from "@/lib/spt-admin-auth";

export const dynamic = "force-dynamic";

export default async function SPTAdminProfitSharePage() {
  const session = await requireAdmin();

  return (
    <SPTAdminShell title="Profit Share" role={session.role}>
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
    </SPTAdminShell>
  );
}
