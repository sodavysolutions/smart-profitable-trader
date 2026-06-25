import { ProfitShareStatus } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { Card, DataTable, EmptyState, InlineNotice, SectionHeader, StatusBadge } from "@/components/UI";
import { SPTAdminShell } from "@/components/spt/admin-shell";
import { syncRecordToGoogleSheets } from "@/lib/google-sheets";
import { prisma } from "@/lib/prisma";
import { calculateProfitShareValues, normalizeDate, normalizeText } from "@/lib/spt-admin-helpers";
import { money, readableEnum } from "@/lib/spt-admin-format";
import { requireAdmin } from "@/lib/spt-admin-auth";
import { getSchemaMismatchMessage, isSchemaMismatchError } from "@/lib/spt-admin-schema";
import { profitShareSchema } from "@/lib/validation";

export const dynamic = "force-dynamic";

async function getProfitShareRows() {
  return prisma.profitShare.findMany({
    include: { customer: true },
    orderBy: [{ paymentDate: "desc" }, { createdAt: "desc" }]
  });
}

async function createProfitShare(formData: FormData) {
  "use server";
  const session = await requireAdmin();
  const parsed = profitShareSchema.safeParse(Object.fromEntries(formData.entries()));

  if (!parsed.success) {
    throw new Error("Invalid profit share details.");
  }

  const { clientShare, companyShare } = calculateProfitShareValues(
    parsed.data.totalProfit,
    parsed.data.clientPercentage,
    parsed.data.companyPercentage
  );

  const profitShare = await prisma.profitShare.create({
    data: {
      customerId: parsed.data.customerId,
      totalProfit: parsed.data.totalProfit,
      clientPercentage: parsed.data.clientPercentage,
      companyPercentage: parsed.data.companyPercentage,
      clientShare,
      companyShare,
      amountPaid: parsed.data.amountPaid,
      amountPending: parsed.data.amountPending,
      paymentDate: normalizeDate(parsed.data.paymentDate),
      status: parsed.data.status,
      notes: normalizeText(parsed.data.notes),
      activityLogs: {
        create: {
          type: "PROFIT_SHARE_CREATED",
          description: "Profit share record created.",
          userId: session.userId
        }
      }
    }
  });

  await syncRecordToGoogleSheets("ProfitShare", profitShare, "CREATE");
  revalidatePath("/spt/admin/profit-share");
}

export default async function SPTAdminProfitSharePage() {
  const session = await requireAdmin();
  let profitShares = [] as Awaited<ReturnType<typeof getProfitShareRows>>;
  let customers = [] as Awaited<ReturnType<typeof prisma.customer.findMany>>;
  let schemaNotice: string | null = null;

  try {
    [profitShares, customers] = await Promise.all([
      getProfitShareRows(),
      prisma.customer.findMany({ orderBy: { fullName: "asc" } })
    ]);
  } catch (error) {
    if (isSchemaMismatchError(error)) {
      schemaNotice = getSchemaMismatchMessage("Profit share");
    } else {
      throw error;
    }
  }

  return (
    <SPTAdminShell title="Profit Share" role={session.role}>
      <Card>
        <SectionHeader title="Profit-share records" text="Use 65/35 for setup-fee clients and 50/50 for no-setup-fee clients, with override support whenever a custom agreement applies." />
        {schemaNotice && <div className="mb-5"><InlineNotice title="Profit-share records are still being prepared" text={schemaNotice} /></div>}
        {!schemaNotice && <form action={createProfitShare} className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          <label className="grid gap-1 text-sm font-medium text-slate-700">
            Customer
            <select name="customerId" required className="rounded-md border border-slate-200 px-3 py-2">
              <option value="">Select customer</option>
              {customers.map((customer) => <option key={customer.id} value={customer.id}>{customer.fullName}</option>)}
            </select>
          </label>
          <label className="grid gap-1 text-sm font-medium text-slate-700">
            Total profit
            <input name="totalProfit" type="number" step="0.01" defaultValue="0" className="rounded-md border border-slate-200 px-3 py-2" />
          </label>
          <label className="grid gap-1 text-sm font-medium text-slate-700">
            Client %
            <input name="clientPercentage" type="number" step="0.01" defaultValue="65" className="rounded-md border border-slate-200 px-3 py-2" />
          </label>
          <label className="grid gap-1 text-sm font-medium text-slate-700">
            Company %
            <input name="companyPercentage" type="number" step="0.01" defaultValue="35" className="rounded-md border border-slate-200 px-3 py-2" />
          </label>
          <label className="grid gap-1 text-sm font-medium text-slate-700">
            Amount paid
            <input name="amountPaid" type="number" step="0.01" defaultValue="0" className="rounded-md border border-slate-200 px-3 py-2" />
          </label>
          <label className="grid gap-1 text-sm font-medium text-slate-700">
            Amount pending
            <input name="amountPending" type="number" step="0.01" defaultValue="0" className="rounded-md border border-slate-200 px-3 py-2" />
          </label>
          <label className="grid gap-1 text-sm font-medium text-slate-700">
            Payment date
            <input name="paymentDate" type="date" className="rounded-md border border-slate-200 px-3 py-2" />
          </label>
          <label className="grid gap-1 text-sm font-medium text-slate-700">
            Status
            <select name="status" defaultValue={ProfitShareStatus.PENDING} className="rounded-md border border-slate-200 px-3 py-2">
              {Object.values(ProfitShareStatus).map((item) => <option key={item} value={item}>{readableEnum(item)}</option>)}
            </select>
          </label>
          <label className="md:col-span-2 xl:col-span-4 grid gap-1 text-sm font-medium text-slate-700">
            Notes
            <textarea name="notes" rows={3} className="rounded-md border border-slate-200 px-3 py-2" />
          </label>
          <div className="xl:col-span-4">
            <button className="rounded-md bg-profit-500 px-5 py-3 text-sm font-bold text-navy-950">Save Profit Share</button>
          </div>
        </form>}
      </Card>

      <Card className="mt-6">
        <SectionHeader title="Profit-share history" text="This section tracks what is owed to the client, what belongs to the business, and what has already been paid out." />
        {!schemaNotice && profitShares.length ? (
          <DataTable
            columns={["Customer", "Profit", "Client %", "Company %", "Client share", "Company share", "Paid", "Pending", "Status"]}
            rows={profitShares.map((item) => [
              item.customer.fullName,
              money(item.totalProfit),
              `${Number(item.clientPercentage)}%`,
              `${Number(item.companyPercentage)}%`,
              money(item.clientShare),
              money(item.companyShare),
              money(item.amountPaid),
              money(item.amountPending),
              <StatusBadge key={item.id} value={readableEnum(item.status)} />
            ])}
          />
        ) : schemaNotice ? (
          <EmptyState title="Profit-share tracking is still being prepared" text="This section will become available once the live profit-share tables and related customer links are fully present in production." />
        ) : (
          <EmptyState title="No profit-share records yet" text="Create the first record here once a funded, evaluation, copy trading, or personal account client becomes eligible for a split." />
        )}
      </Card>
    </SPTAdminShell>
  );
}
