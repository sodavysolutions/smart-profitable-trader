import { CustomerType } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { Card, DataTable, EmptyState, InlineNotice, ProgressBar, SectionHeader, StatusBadge } from "@/components/UI";
import { SPTAdminShell } from "@/components/spt/admin-shell";
import { prisma } from "@/lib/prisma";
import { money, readableEnum } from "@/lib/spt-admin-format";
import { normalizeText } from "@/lib/spt-admin-helpers";
import { requireAdmin } from "@/lib/spt-admin-auth";
import { getSchemaMismatchMessage, isSchemaMismatchError } from "@/lib/spt-admin-schema";
import { accountProgressSchema } from "@/lib/validation";

export const dynamic = "force-dynamic";

async function getProgressRows() {
  return prisma.accountProgress.findMany({
    include: { customer: true },
    orderBy: { updatedAt: "desc" }
  });
}

async function createAccountProgress(formData: FormData) {
  "use server";
  const session = await requireAdmin();
  const parsed = accountProgressSchema.safeParse(Object.fromEntries(formData.entries()));

  if (!parsed.success) {
    throw new Error("Invalid account progress details.");
  }

  await prisma.accountProgress.upsert({
    where: { id: `progress-${parsed.data.customerId}` },
    update: {
      serviceType: parsed.data.serviceType,
      phase: normalizeText(parsed.data.phase),
      accountSize: parsed.data.accountSize,
      currentBalance: parsed.data.currentBalance,
      currentEquity: parsed.data.currentEquity,
      profitTarget: parsed.data.profitTarget,
      currentProfit: parsed.data.currentProfit,
      growthPercentage: parsed.data.growthPercentage,
      drawdownLimit: parsed.data.drawdownLimit,
      currentDrawdown: parsed.data.currentDrawdown,
      dailyDrawdown: parsed.data.dailyDrawdown,
      maxDrawdown: parsed.data.maxDrawdown,
      daysTraded: parsed.data.daysTraded,
      minimumTradeDays: parsed.data.minimumTradeDays,
      status: parsed.data.status,
      notes: normalizeText(parsed.data.notes),
      activityLogs: {
        create: {
          type: "ACCOUNT_PROGRESS_UPDATED",
          description: `Account progress updated for customer ${parsed.data.customerId}.`,
          userId: session.userId
        }
      }
    },
    create: {
      id: `progress-${parsed.data.customerId}`,
      customerId: parsed.data.customerId,
      serviceType: parsed.data.serviceType,
      phase: normalizeText(parsed.data.phase),
      accountSize: parsed.data.accountSize,
      currentBalance: parsed.data.currentBalance,
      currentEquity: parsed.data.currentEquity,
      profitTarget: parsed.data.profitTarget,
      currentProfit: parsed.data.currentProfit,
      growthPercentage: parsed.data.growthPercentage,
      drawdownLimit: parsed.data.drawdownLimit,
      currentDrawdown: parsed.data.currentDrawdown,
      dailyDrawdown: parsed.data.dailyDrawdown,
      maxDrawdown: parsed.data.maxDrawdown,
      daysTraded: parsed.data.daysTraded,
      minimumTradeDays: parsed.data.minimumTradeDays,
      status: parsed.data.status,
      notes: normalizeText(parsed.data.notes),
      activityLogs: {
        create: {
          type: "ACCOUNT_PROGRESS_CREATED",
          description: `Account progress created for customer ${parsed.data.customerId}.`,
          userId: session.userId
        }
      }
    }
  });

  revalidatePath("/spt/admin/account-progress");
}

export default async function SPTAdminAccountProgressPage() {
  const session = await requireAdmin();
  let customers = [] as Awaited<ReturnType<typeof prisma.customer.findMany>>;
  let progressRows = [] as Awaited<ReturnType<typeof getProgressRows>>;
  let schemaNotice: string | null = null;

  try {
    [customers, progressRows] = await Promise.all([
      prisma.customer.findMany({ orderBy: { fullName: "asc" } }),
      getProgressRows()
    ]);
  } catch (error) {
    if (isSchemaMismatchError(error)) {
      schemaNotice = getSchemaMismatchMessage("Account progress");
    } else {
      throw error;
    }
  }

  return (
    <SPTAdminShell title="Account Tracking" role={session.role}>
      <Card>
        <SectionHeader title="Account tracking" text="Capture prop firm phases, copy trading balance changes, drawdown usage, and personal account updates from one place." />
        {schemaNotice && <div className="mb-5"><InlineNotice title="Account tracking is still being prepared" text={schemaNotice} /></div>}
        {!schemaNotice && <form action={createAccountProgress} className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          <label className="grid gap-1 text-sm font-medium text-slate-700">
            Customer
            <select name="customerId" required className="rounded-md border border-slate-200 px-3 py-2">
              <option value="">Select customer</option>
              {customers.map((customer) => <option key={customer.id} value={customer.id}>{customer.fullName}</option>)}
            </select>
          </label>
          <label className="grid gap-1 text-sm font-medium text-slate-700">
            Service type
            <select name="serviceType" defaultValue={CustomerType.COPY_TRADING} className="rounded-md border border-slate-200 px-3 py-2">
              {Object.values(CustomerType).map((item) => <option key={item} value={item}>{readableEnum(item)}</option>)}
            </select>
          </label>
          <label className="grid gap-1 text-sm font-medium text-slate-700">
            Phase
            <input name="phase" placeholder="Phase 1 / Funded / Active" className="rounded-md border border-slate-200 px-3 py-2" />
          </label>
          <label className="grid gap-1 text-sm font-medium text-slate-700">
            Status
            <input name="status" required placeholder="Active / In Profit / In Drawdown" className="rounded-md border border-slate-200 px-3 py-2" />
          </label>
          {[
            ["accountSize", "Account size", "0"],
            ["currentBalance", "Current balance", "0"],
            ["currentEquity", "Current equity", "0"],
            ["profitTarget", "Profit target", "0"],
            ["currentProfit", "Current profit", "0"],
            ["growthPercentage", "Growth %", "0"],
            ["drawdownLimit", "Drawdown limit", "0"],
            ["currentDrawdown", "Current drawdown", "0"],
            ["dailyDrawdown", "Daily drawdown", "0"],
            ["maxDrawdown", "Max drawdown", "0"],
            ["daysTraded", "Days traded", "0"],
            ["minimumTradeDays", "Minimum trading days", "0"]
          ].map(([name, label, defaultValue]) => (
            <label key={name} className="grid gap-1 text-sm font-medium text-slate-700">
              {label}
              <input name={name} type="number" step="0.01" min="0" defaultValue={defaultValue} className="rounded-md border border-slate-200 px-3 py-2" />
            </label>
          ))}
          <label className="md:col-span-2 xl:col-span-4 grid gap-1 text-sm font-medium text-slate-700">
            Notes
            <textarea name="notes" rows={3} className="rounded-md border border-slate-200 px-3 py-2" />
          </label>
          <div className="xl:col-span-4">
            <button className="rounded-md bg-profit-500 px-5 py-3 text-sm font-bold text-navy-950">Save Account Progress</button>
          </div>
        </form>}
      </Card>

      <div className="mt-6 grid gap-6 xl:grid-cols-2">
        <Card>
          <SectionHeader title="Live account overview" />
          {!schemaNotice && progressRows.length ? (
            <DataTable
              columns={["Customer", "Service", "Phase", "Balance", "Profit", "Status", "Updated"]}
              rows={progressRows.map((row) => [
                row.customer.fullName,
                readableEnum(row.serviceType),
                row.phase ?? "-",
                money(row.currentBalance),
                money(row.currentProfit),
                <StatusBadge key={row.id} value={row.status} />,
                row.updatedAt.toLocaleDateString()
              ])}
            />
          ) : (
            <EmptyState title="No account activity yet" text="Copy trading, prop evaluation, funded, and personal account performance will appear here once you start saving updates." />
          )}
        </Card>

        <Card>
          <SectionHeader title="Target and drawdown view" text="Use these bars for a quick operating view of how close each account is to target and how much drawdown is being used." />
          <div className="space-y-4">
            {!schemaNotice && progressRows.length ? (
              progressRows.slice(0, 8).map((row) => {
                const targetProgress = row.profitTarget.gt(0)
                  ? Math.max(0, Math.min(100, (Number(row.currentProfit) / Number(row.profitTarget)) * 100))
                  : 0;
                const drawdownProgress = row.drawdownLimit.gt(0)
                  ? Math.max(0, Math.min(100, (Number(row.currentDrawdown) / Number(row.drawdownLimit)) * 100))
                  : 0;

                return (
                  <div key={row.id} className="rounded-md border border-slate-200 p-4">
                    <div className="mb-3 flex items-start justify-between gap-3">
                      <div>
                        <p className="font-semibold text-navy-950">{row.customer.fullName}</p>
                        <p className="text-sm text-slate-500">{readableEnum(row.serviceType)} {row.phase ? `· ${row.phase}` : ""}</p>
                      </div>
                      <StatusBadge value={row.status} />
                    </div>
                    <div className="space-y-3">
                      <div>
                        <div className="mb-1 flex items-center justify-between text-xs font-medium text-slate-500">
                          <span>Target progress</span>
                          <span>{Math.round(targetProgress)}%</span>
                        </div>
                        <ProgressBar value={targetProgress} />
                      </div>
                      <div>
                        <div className="mb-1 flex items-center justify-between text-xs font-medium text-slate-500">
                          <span>Drawdown usage</span>
                          <span>{Math.round(drawdownProgress)}%</span>
                        </div>
                        <ProgressBar value={drawdownProgress} danger />
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              <EmptyState title="Nothing to monitor yet" text="These target progress and drawdown widgets will populate as soon as account tracking records are entered." />
            )}
          </div>
        </Card>
      </div>
    </SPTAdminShell>
  );
}
