import { AdminMetricCard, SPTAdminShell } from "@/components/spt/admin-shell";
import { Card, DataTable, SectionHeader, StatusBadge } from "@/components/UI";
import { prisma } from "@/lib/prisma";
import { readableEnum } from "@/lib/spt-admin-format";
import { requireAdmin } from "@/lib/spt-admin-auth";

export const dynamic = "force-dynamic";

export default async function SPTAdminDashboardPage() {
  const session = await requireAdmin();
  const today = new Date();

  const [
    totalLeads,
    newLeads,
    totalCustomers,
    newApplications,
    pendingFollowUps,
    activeCustomers,
    vipSignalCustomers,
    copyTradingCustomers,
    instantFundedCustomers,
    evaluationCustomers,
    recentApplications,
    recentLeads
  ] = await Promise.all([
    prisma.lead.count(),
    prisma.lead.count({ where: { status: "NEW" } }),
    prisma.customer.count(),
    prisma.application.count({ where: { status: "NEW" } }),
    prisma.lead.count({ where: { nextFollowUpAt: { lte: today } } }),
    prisma.customer.count({ where: { status: "ACTIVE" } }),
    prisma.customer.count({ where: { customerType: "VIP_SIGNALS" } }),
    prisma.customer.count({ where: { customerType: "COPY_TRADING" } }),
    prisma.customer.count({ where: { customerType: "INSTANT_FUNDED" } }),
    prisma.customer.count({ where: { customerType: "EVALUATION" } }),
    prisma.application.findMany({ orderBy: { createdAt: "desc" }, take: 6 }),
    prisma.lead.findMany({ orderBy: { createdAt: "desc" }, take: 6 })
  ]);

  const metrics = [
    ["Total leads", totalLeads],
    ["New leads", newLeads],
    ["Total customers", totalCustomers],
    ["New applications", newApplications],
    ["Pending follow-ups", pendingFollowUps],
    ["Active customers", activeCustomers],
    ["VIP signal customers", vipSignalCustomers],
    ["Copy trading customers", copyTradingCustomers],
    ["Instant funded customers", instantFundedCustomers],
    ["Evaluation customers", evaluationCustomers]
  ];

  return (
    <SPTAdminShell title="Admin Dashboard" role={session.role}>
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
        {metrics.map(([label, value]) => (
          <AdminMetricCard key={label} label={String(label)} value={Number(value)} />
        ))}
      </div>
      <div className="mt-6 grid gap-6 xl:grid-cols-2">
        <Card>
          <SectionHeader title="Recent applications" text="Fresh submissions from the public funnel pages." />
          <DataTable
            columns={["Name", "Email", "Service", "Status", "Date"]}
            rows={recentApplications.map((item) => [
              item.fullName,
              item.email,
              item.service,
              <StatusBadge key={item.id} value={readableEnum(item.status)} />,
              item.createdAt.toLocaleDateString()
            ])}
          />
        </Card>
        <Card>
          <SectionHeader title="Recent leads" text="New CRM leads and follow-up status." />
          <DataTable
            columns={["Name", "Email", "Service", "Status", "Follow-up"]}
            rows={recentLeads.map((item) => [
              item.fullName,
              item.email,
              item.serviceInterest,
              <StatusBadge key={item.id} value={readableEnum(item.status)} />,
              item.nextFollowUpAt ? item.nextFollowUpAt.toLocaleDateString() : "Not set"
            ])}
          />
        </Card>
      </div>
    </SPTAdminShell>
  );
}
