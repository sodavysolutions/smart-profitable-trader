import { AdminMetricCard, SPTAdminShell } from "@/components/spt/admin-shell";
import { Card, DataTable, EmptyState, InlineNotice, SectionHeader, StatusBadge } from "@/components/UI";
import { prisma } from "@/lib/prisma";
import { readableEnum } from "@/lib/spt-admin-format";
import { requireAdmin } from "@/lib/spt-admin-auth";
import { getSchemaMismatchMessage, isSchemaMismatchError } from "@/lib/spt-admin-schema";

export const dynamic = "force-dynamic";

export default async function SPTAdminDashboardPage() {
  const session = await requireAdmin();
  const today = new Date();
  let schemaNotice: string | null = null;
  let totalLeads = 0;
  let newLeads = 0;
  let totalCustomers = 0;
  let newApplications = 0;
  let pendingFollowUps = 0;
  let activeCustomers = 0;
  let vipSignalCustomers = 0;
  let copyTradingCustomers = 0;
  let instantFundedCustomers = 0;
  let evaluationCustomers = 0;
  let recentApplications: Array<{
    id: string;
    fullName: string;
    email: string;
    service: string;
    status: string;
    createdAt: Date;
  }> = [];
  let recentLeads: Array<{
    id: string;
    fullName: string;
    email: string;
    serviceInterest: string;
    status: string;
    nextFollowUpAt: Date | null;
  }> = [];

  try {
    [
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
      prisma.application.findMany({
        select: {
          id: true,
          fullName: true,
          email: true,
          service: true,
          status: true,
          createdAt: true
        },
        orderBy: { createdAt: "desc" },
        take: 6
      }),
      prisma.lead.findMany({
        select: {
          id: true,
          fullName: true,
          email: true,
          serviceInterest: true,
          status: true,
          nextFollowUpAt: true
        },
        orderBy: { createdAt: "desc" },
        take: 6
      })
    ]);
  } catch (error) {
    if (isSchemaMismatchError(error)) {
      schemaNotice = getSchemaMismatchMessage("Dashboard");
    } else {
      throw error;
    }
  }

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
      {schemaNotice && (
        <div className="mb-6">
          <InlineNotice title="Dashboard data is still being prepared" text={schemaNotice} />
        </div>
      )}
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
        {metrics.map(([label, value]) => (
          <AdminMetricCard key={label} label={String(label)} value={Number(value)} />
        ))}
      </div>
      <div className="mt-6 grid gap-6 xl:grid-cols-2">
        <Card>
          <SectionHeader title="Recent applications" text="Fresh submissions from the public funnel pages." />
          {recentApplications.length ? (
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
          ) : (
            <EmptyState
              title={schemaNotice ? "Applications are still being prepared" : "No applications yet"}
              text={
                schemaNotice
                  ? "This section will start populating normally as soon as the remaining live application fields are available."
                  : "Fresh website applications will appear here as soon as visitors begin submitting forms."
              }
            />
          )}
        </Card>
        <Card>
          <SectionHeader title="Recent leads" text="New CRM leads and follow-up status." />
          {recentLeads.length ? (
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
          ) : (
            <EmptyState
              title="No leads yet"
              text="New CRM leads and follow-up activity will appear here once prospects start entering the system."
            />
          )}
        </Card>
      </div>
    </SPTAdminShell>
  );
}
