import { revalidatePath } from "next/cache";
import { Card, DataTable, SectionHeader, StatusBadge } from "@/components/UI";
import { SPTAdminShell } from "@/components/spt/admin-shell";
import { prisma } from "@/lib/prisma";
import { money, readableEnum } from "@/lib/spt-admin-format";
import { requireAdmin } from "@/lib/spt-admin-auth";
import type { CustomerStatus, CustomerType } from "@prisma/client";

export const dynamic = "force-dynamic";

const customerTypes: CustomerType[] = ["VIP_SIGNALS", "COPY_TRADING", "INSTANT_FUNDED", "EVALUATION", "PERSONAL_ACCOUNT"];
const customerStatuses: CustomerStatus[] = ["ACTIVE", "PENDING_SETUP", "SUSPENDED", "PAUSED", "COMPLETED", "FUNDED", "CANCELLED", "LOST"];

async function updateCustomer(formData: FormData) {
  "use server";
  const session = await requireAdmin();
  const id = String(formData.get("id"));
  const status = String(formData.get("status")) as CustomerStatus;
  const currentBalance = Number(formData.get("currentBalance") ?? 0);
  const currentEquity = Number(formData.get("currentEquity") ?? 0);
  const notes = String(formData.get("notes") ?? "");

  await prisma.customer.update({
    where: { id },
    data: {
      status,
      currentBalance: Number.isFinite(currentBalance) ? currentBalance : undefined,
      currentEquity: Number.isFinite(currentEquity) ? currentEquity : undefined,
      notes: notes || undefined,
      activityLogs: {
        create: {
          type: "CUSTOMER_UPDATED",
          description: `Customer status updated to ${status}.`,
          userId: session.userId
        }
      }
    }
  });
  revalidatePath("/spt/admin/customers");
}

export default async function SPTAdminCustomersPage({ searchParams }: { searchParams: Promise<{ q?: string; type?: CustomerType; status?: CustomerStatus }> }) {
  const session = await requireAdmin();
  const { q, type, status } = await searchParams;
  const customers = await prisma.customer.findMany({
    where: {
      ...(q ? { OR: [{ fullName: { contains: q, mode: "insensitive" } }, { email: { contains: q, mode: "insensitive" } }] } : {}),
      ...(type ? { customerType: type } : {}),
      ...(status ? { status } : {})
    },
    orderBy: { createdAt: "desc" }
  });

  return (
    <SPTAdminShell title="Customers" role={session.role}>
      <Card>
        <SectionHeader title="Customer management" text="Search, filter, add notes, and update balance, equity, and customer status." action={<button className="rounded-md bg-profit-500 px-4 py-2 text-sm font-bold text-navy-950">Add Customer</button>} />
        <form className="mb-4 grid gap-3 md:grid-cols-4">
          <input name="q" defaultValue={q} placeholder="Search name or email" className="rounded-md border border-slate-200 px-3 py-2 text-sm" />
          <select name="type" defaultValue={type ?? ""} className="rounded-md border border-slate-200 px-3 py-2 text-sm">
            <option value="">All types</option>
            {customerTypes.map((item) => <option key={item} value={item}>{readableEnum(item)}</option>)}
          </select>
          <select name="status" defaultValue={status ?? ""} className="rounded-md border border-slate-200 px-3 py-2 text-sm">
            <option value="">All statuses</option>
            {customerStatuses.map((item) => <option key={item} value={item}>{readableEnum(item)}</option>)}
          </select>
          <button className="rounded-md bg-navy-950 px-4 py-2 text-sm font-bold text-white">Filter</button>
        </form>
        <DataTable
          columns={["Customer", "Email", "Type", "Platform", "Broker/Prop firm", "Balance", "Equity", "Status"]}
          rows={customers.map((item) => [item.fullName, item.email, readableEnum(item.customerType), item.accountPlatform ? readableEnum(item.accountPlatform) : "-", item.brokerOrPropFirm ?? "-", money(item.currentBalance), money(item.currentEquity), <StatusBadge key={item.id} value={readableEnum(item.status)} />])}
        />
      </Card>
      <div className="mt-6 grid gap-5 lg:grid-cols-2">
        {customers.slice(0, 10).map((customer) => (
          <Card key={customer.id}>
            <SectionHeader title={customer.fullName} text={`${readableEnum(customer.customerType)} · ${customer.email}`} />
            <form action={updateCustomer} className="grid gap-3">
              <input type="hidden" name="id" value={customer.id} />
              <div className="grid gap-3 md:grid-cols-3">
                <select name="status" defaultValue={customer.status} className="rounded-md border border-slate-200 px-3 py-2 text-sm">
                  {customerStatuses.map((item) => <option key={item} value={item}>{readableEnum(item)}</option>)}
                </select>
                <input name="currentBalance" defaultValue={customer.currentBalance.toString()} placeholder="Current balance" className="rounded-md border border-slate-200 px-3 py-2 text-sm" />
                <input name="currentEquity" defaultValue={customer.currentEquity.toString()} placeholder="Current equity" className="rounded-md border border-slate-200 px-3 py-2 text-sm" />
              </div>
              <textarea name="notes" defaultValue={customer.notes ?? ""} rows={3} placeholder="Add notes" className="rounded-md border border-slate-200 px-3 py-2 text-sm" />
              <button className="rounded-md bg-navy-950 px-4 py-2 text-sm font-bold text-white">Update Customer</button>
            </form>
          </Card>
        ))}
      </div>
    </SPTAdminShell>
  );
}
