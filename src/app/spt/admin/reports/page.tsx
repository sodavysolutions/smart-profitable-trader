import Link from "next/link";
import { addMonths, endOfMonth, format, startOfMonth, subMonths } from "date-fns";
import { Card, DataTable, EmptyState, InlineNotice, SectionHeader } from "@/components/UI";
import { SPTAdminShell } from "@/components/spt/admin-shell";
import { prisma } from "@/lib/prisma";
import { money, readableEnum } from "@/lib/spt-admin-format";
import { requireAdmin } from "@/lib/spt-admin-auth";
import { getSchemaMismatchMessage, isSchemaMismatchError } from "@/lib/spt-admin-schema";

export const dynamic = "force-dynamic";

async function getReportData() {
  const now = new Date();
  const monthStarts = Array.from({ length: 6 }).map((_, index) => startOfMonth(subMonths(now, 5 - index)));

  const [payments, expenses, subscriptions, leads, customers, profitShares, evaluationProgress, fundedProgress] =
    await Promise.all([
      prisma.payment.findMany({ orderBy: { paymentDate: "asc" } }),
      prisma.expense.findMany({ orderBy: { renewalDate: "asc" } }),
      prisma.subscription.findMany({ include: { customer: true }, orderBy: { renewalDate: "asc" } }),
      prisma.lead.findMany({ orderBy: { createdAt: "desc" } }),
      prisma.customer.findMany({ orderBy: { createdAt: "desc" } }),
      prisma.profitShare.findMany({ include: { customer: true }, orderBy: { createdAt: "desc" } }),
      prisma.accountProgress.findMany({
        where: { serviceType: "EVALUATION" },
        include: { customer: true },
        orderBy: { updatedAt: "desc" }
      }),
      prisma.accountProgress.findMany({
        where: { serviceType: "INSTANT_FUNDED" },
        include: { customer: true },
        orderBy: { updatedAt: "desc" }
      })
    ]);

  return {
    now,
    monthStarts,
    payments,
    expenses,
    subscriptions,
    leads,
    customers,
    profitShares,
    evaluationProgress,
    fundedProgress
  };
}

export default async function SPTAdminReportsPage() {
  const session = await requireAdmin();
  let schemaNotice: string | null = null;
  let reportData: Awaited<ReturnType<typeof getReportData>> | null = null;

  try {
    reportData = await getReportData();
  } catch (error) {
    if (isSchemaMismatchError(error)) {
      schemaNotice = getSchemaMismatchMessage("Reports");
    } else {
      throw error;
    }
  }

  const now = reportData?.now ?? new Date();
  const monthStarts = reportData?.monthStarts ?? Array.from({ length: 6 }).map((_, index) => startOfMonth(subMonths(now, 5 - index)));
  const payments = reportData?.payments ?? [];
  const expenses = reportData?.expenses ?? [];
  const subscriptions = reportData?.subscriptions ?? [];
  const leads = reportData?.leads ?? [];
  const customers = reportData?.customers ?? [];
  const profitShares = reportData?.profitShares ?? [];
  const evaluationProgress = reportData?.evaluationProgress ?? [];
  const fundedProgress = reportData?.fundedProgress ?? [];

  const monthlyPerformance = monthStarts.map((monthStart) => {
    const monthEnd = endOfMonth(monthStart);
    const label = format(monthStart, "MMM");
    const revenue = payments
      .filter((payment) => payment.paymentDate && payment.paymentDate >= monthStart && payment.paymentDate <= monthEnd)
      .reduce((sum, payment) => sum + Number(payment.amount), 0);
    const cost = expenses
      .filter((expense) => expense.createdAt >= monthStart && expense.createdAt <= monthEnd)
      .reduce((sum, expense) => sum + Number(expense.amount), 0);
    return {
      label,
      revenue,
      cost,
      net: revenue - cost
    };
  });

  const maxBarValue = Math.max(1, ...monthlyPerformance.flatMap((month) => [month.revenue, month.cost, Math.abs(month.net)]));
  const activeCustomers = customers.filter((customer) => customer.status === "ACTIVE").length;
  const expiredSubscriptions = subscriptions.filter((subscription) => subscription.status === "EXPIRED" || subscription.status === "OVERDUE").length;
  const convertedLeads = leads.filter((lead) => lead.status === "CONVERTED").length;
  const conversionRate = leads.length ? Math.round((convertedLeads / leads.length) * 100) : 0;
  const totalRevenue = payments.reduce((sum, payment) => sum + Number(payment.amount), 0);
  const totalExpenses = expenses.reduce((sum, expense) => sum + Number(expense.amount), 0);
  const totalProfitSharePending = profitShares.reduce((sum, share) => sum + Number(share.amountPending), 0);
  const leadsByCampaign = Array.from(
    leads.reduce((map, lead) => {
      const key = lead.campaign || "Unassigned";
      map.set(key, (map.get(key) ?? 0) + 1);
      return map;
    }, new Map<string, number>())
  ).sort((a, b) => b[1] - a[1]);

  return (
    <SPTAdminShell title="Reports" role={session.role}>
      <Card>
        <SectionHeader
          title="Report filters"
          text="This foundation report is now driven by live database records. CSV export uses your actual leads, customers, payments, expenses, subscriptions, and profit-share entries."
          action={
            <Link href="/api/reports/export" className="rounded-md bg-profit-500 px-4 py-2 text-sm font-bold text-navy-950">
              Export CSV
            </Link>
          }
        />
        {schemaNotice && <div className="mb-5"><InlineNotice title="Reports are in setup mode" text={schemaNotice} /></div>}
        <div className="grid gap-3 md:grid-cols-5">
          {["Date range", "Service type", "Customer", "Staff", "Status"].map((filter) => (
            <select key={filter} aria-label={filter} className="rounded-md border border-slate-200 px-3 py-2 text-sm text-slate-600">
              <option>{filter}</option>
            </select>
          ))}
        </div>
      </Card>
      <div className="mt-6 grid gap-6 xl:grid-cols-2">
        <Card>
          <SectionHeader title="Monthly revenue vs expenses" text="A quick visual of recorded revenue, operating costs, and net outcome by month." />
          {!schemaNotice ? <div className="space-y-4">
            {monthlyPerformance.map((month) => (
              <div key={month.label}>
                <div className="mb-2 flex items-center justify-between text-sm">
                  <span className="font-semibold text-navy-950">{month.label}</span>
                  <span className="text-slate-500">
                    Revenue {money(month.revenue)} · Expenses {money(month.cost)} · Net {money(month.net)}
                  </span>
                </div>
                <div className="space-y-2">
                  <div className="h-3 overflow-hidden rounded-full bg-slate-100">
                    <div className="h-full rounded-full bg-profit-500" style={{ width: `${(month.revenue / maxBarValue) * 100}%` }} />
                  </div>
                  <div className="h-3 overflow-hidden rounded-full bg-slate-100">
                    <div className="h-full rounded-full bg-navy-950" style={{ width: `${(month.cost / maxBarValue) * 100}%` }} />
                  </div>
                </div>
              </div>
            ))}
          </div> : <EmptyState title="Reports are not ready yet" text="This reporting area will automatically come alive once the missing business tables are fully available in the live database." />}
        </Card>
        <Card>
          <SectionHeader title="Operational snapshot" text="Use this as a quick business-read panel before drilling deeper into the tables below." />
          <div className="grid gap-4 md:grid-cols-2">
            {[
              ["Total revenue", money(totalRevenue)],
              ["Total expenses", money(totalExpenses)],
              ["Profit share pending", money(totalProfitSharePending)],
              ["Active customers", activeCustomers],
              ["Expired or overdue subscriptions", expiredSubscriptions],
              ["Lead conversion rate", `${conversionRate}%`]
            ].map(([label, value]) => (
              <div key={String(label)} className="rounded-md border border-slate-200 p-4">
                <p className="text-sm font-medium text-slate-500">{label}</p>
                <p className="mt-2 text-2xl font-semibold text-navy-950">{value}</p>
              </div>
            ))}
          </div>
        </Card>
      </div>
      <Card className="mt-6">
        <SectionHeader title="Leads by campaign" text="This helps you spot which traffic sources and campaign names are currently producing demand." />
        {!schemaNotice && leadsByCampaign.length ? (
          <DataTable columns={["Campaign", "Lead count"]} rows={leadsByCampaign.map(([campaign, count]) => [campaign, count])} />
        ) : schemaNotice ? (
          <EmptyState title="Campaign reporting is not ready yet" text="As soon as the reporting schema is fully in place, campaign summaries and exports will appear here." />
        ) : (
          <EmptyState title="No lead campaigns yet" text="Campaign data will appear here once leads arrive with campaign attribution." />
        )}
      </Card>
      <div className="mt-6 grid gap-6 xl:grid-cols-2">
        <Card>
          <SectionHeader title="Evaluation account progress" text="Latest live evaluation account performance pulled from account progress records." />
          {!schemaNotice && evaluationProgress.length ? (
            <DataTable
              columns={["Customer", "Phase", "Balance", "Profit target", "Current profit", "Status"]}
              rows={evaluationProgress.slice(0, 8).map((row) => [
                row.customer.fullName,
                row.phase ?? "-",
                money(row.currentBalance),
                money(row.profitTarget),
                money(row.currentProfit),
                readableEnum(row.status)
              ])}
            />
          ) : schemaNotice ? (
            <EmptyState title="Evaluation reports are not ready yet" text="Evaluation account reporting will appear here once the missing reporting tables and columns are fully live." />
          ) : (
            <EmptyState title="No evaluation progress yet" text="Evaluation records will appear here once account progress data starts flowing in." />
          )}
        </Card>
        <Card>
          <SectionHeader title="Instant funded account progress" text="Track live funded account balances, growth, and status in one operational view." />
          {!schemaNotice && fundedProgress.length ? (
            <DataTable
              columns={["Customer", "Phase", "Balance", "Current profit", "Growth %", "Status"]}
              rows={fundedProgress.slice(0, 8).map((row) => [
                row.customer.fullName,
                row.phase ?? "-",
                money(row.currentBalance),
                money(row.currentProfit),
                `${Number(row.growthPercentage).toFixed(2)}%`,
                readableEnum(row.status)
              ])}
            />
          ) : schemaNotice ? (
            <EmptyState title="Funded account reports are not ready yet" text="This section will turn on automatically once the funded-account reporting schema is fully available in production." />
          ) : (
            <EmptyState title="No funded account progress yet" text="Funded account performance will show here as soon as those records are added." />
          )}
        </Card>
      </div>
    </SPTAdminShell>
  );
}
