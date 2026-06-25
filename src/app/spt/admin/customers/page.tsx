import { revalidatePath } from "next/cache";
import { Card, DataTable, EmptyState, InlineNotice, SectionHeader, StatusBadge } from "@/components/UI";
import { SPTAdminShell } from "@/components/spt/admin-shell";
import { syncRecordToGoogleSheets } from "@/lib/google-sheets";
import { prisma } from "@/lib/prisma";
import { normalizeDate, normalizeText } from "@/lib/spt-admin-helpers";
import { money, readableEnum } from "@/lib/spt-admin-format";
import { requireAdmin } from "@/lib/spt-admin-auth";
import { getSchemaMismatchMessage, isSchemaMismatchError } from "@/lib/spt-admin-schema";
import { customerCreateSchema, customerUpdateSchema } from "@/lib/validation";
import type { AccountPlatform, CustomerStatus, CustomerType } from "@prisma/client";

export const dynamic = "force-dynamic";

const customerTypes: CustomerType[] = ["VIP_SIGNALS", "COPY_TRADING", "INSTANT_FUNDED", "EVALUATION", "PERSONAL_ACCOUNT"];
const customerStatuses: CustomerStatus[] = ["ACTIVE", "PENDING_SETUP", "SUSPENDED", "PAUSED", "COMPLETED", "FUNDED", "CANCELLED", "LOST"];
const accountPlatforms: Array<AccountPlatform | ""> = ["", "MT4", "MT5", "TRADELOCKER", "OTHER"];

async function createCustomer(formData: FormData) {
  "use server";
  const session = await requireAdmin();
  const parsed = customerCreateSchema.safeParse(Object.fromEntries(formData.entries()));

  if (!parsed.success) {
    throw new Error("Invalid customer details.");
  }

  const customer = await prisma.customer.create({
    data: {
      fullName: parsed.data.fullName,
      email: parsed.data.email,
      phone: normalizeText(parsed.data.phone) ?? undefined,
      whatsapp: normalizeText(parsed.data.whatsapp) ?? undefined,
      country: normalizeText(parsed.data.country) ?? undefined,
      city: normalizeText(parsed.data.city) ?? undefined,
      customerType: parsed.data.customerType,
      status: parsed.data.status,
      accountPlatform: parsed.data.accountPlatform ? (parsed.data.accountPlatform as AccountPlatform) : undefined,
      brokerOrPropFirm: normalizeText(parsed.data.brokerOrPropFirm) ?? undefined,
      accountLogin: normalizeText(parsed.data.accountLogin) ?? undefined,
      initialCapital: parsed.data.initialCapital,
      currentBalance: parsed.data.currentBalance,
      currentEquity: parsed.data.currentEquity,
      startDate: normalizeDate(parsed.data.startDate),
      renewalDate: normalizeDate(parsed.data.renewalDate),
      dateOfBirth: normalizeDate(parsed.data.dateOfBirth),
      profitShareTier: normalizeText(parsed.data.profitShareTier) ?? undefined,
      setupFeeStatus: normalizeText(parsed.data.setupFeeStatus) ?? undefined,
      notes: normalizeText(parsed.data.notes) ?? undefined,
      activityLogs: {
        create: {
          type: "CUSTOMER_CREATED",
          description: `Customer ${parsed.data.fullName} was created from the admin panel.`,
          userId: session.userId
        }
      }
    }
  });
  await syncRecordToGoogleSheets("Customer", customer, "CREATE");
  revalidatePath("/spt/admin/customers");
}

async function updateCustomer(formData: FormData) {
  "use server";
  const session = await requireAdmin();
  const parsed = customerUpdateSchema.safeParse(Object.fromEntries(formData.entries()));

  if (!parsed.success) {
    throw new Error("Invalid customer update details.");
  }

  const customer = await prisma.customer.update({
    where: { id: parsed.data.id },
    data: {
      status: parsed.data.status,
      currentBalance: parsed.data.currentBalance,
      currentEquity: parsed.data.currentEquity,
      notes: normalizeText(parsed.data.notes) ?? undefined,
      renewalDate: normalizeDate(parsed.data.renewalDate),
      dateOfBirth: normalizeDate(parsed.data.dateOfBirth),
      activityLogs: {
        create: {
          type: "CUSTOMER_UPDATED",
          description: `Customer status updated to ${parsed.data.status}.`,
          userId: session.userId
        }
      }
    }
  });
  await syncRecordToGoogleSheets("Customer", customer, "UPDATE");
  revalidatePath("/spt/admin/customers");
}

export default async function SPTAdminCustomersPage({ searchParams }: { searchParams: Promise<{ q?: string; type?: CustomerType; status?: CustomerStatus }> }) {
  const session = await requireAdmin();
  const { q, type, status } = await searchParams;
  let customers = [] as Awaited<ReturnType<typeof prisma.customer.findMany>>;
  let schemaNotice: string | null = null;

  try {
    customers = await prisma.customer.findMany({
      where: {
        ...(q ? { OR: [{ fullName: { contains: q, mode: "insensitive" } }, { email: { contains: q, mode: "insensitive" } }] } : {}),
        ...(type ? { customerType: type } : {}),
        ...(status ? { status } : {})
      },
      orderBy: { createdAt: "desc" }
    });
  } catch (error) {
    if (isSchemaMismatchError(error)) {
      schemaNotice = getSchemaMismatchMessage("Customer management");
    } else {
      throw error;
    }
  }

  return (
    <SPTAdminShell title="Customer Records" role={session.role}>
      <Card>
        <SectionHeader title="Customer records" text="Search, filter, add notes, and keep balances, equity, status, renewal dates, and birthdays up to date." />
        {schemaNotice && <div className="mb-5"><InlineNotice title="Customer records are still being prepared" text={schemaNotice} /></div>}
        {!schemaNotice && <details className="mb-5 rounded-xl border border-slate-200 bg-slate-50/60 p-4">
          <summary className="cursor-pointer list-none text-sm font-bold text-navy-950">Add customer</summary>
          <form action={createCustomer} className="mt-4 grid gap-3 md:grid-cols-2">
            <input name="fullName" placeholder="Full name" className="rounded-md border border-slate-200 px-3 py-2 text-sm" />
            <input name="email" type="email" placeholder="Email address" className="rounded-md border border-slate-200 px-3 py-2 text-sm" />
            <input name="phone" placeholder="Phone number" className="rounded-md border border-slate-200 px-3 py-2 text-sm" />
            <input name="whatsapp" placeholder="WhatsApp number" className="rounded-md border border-slate-200 px-3 py-2 text-sm" />
            <input name="country" placeholder="Country" className="rounded-md border border-slate-200 px-3 py-2 text-sm" />
            <input name="city" placeholder="City" className="rounded-md border border-slate-200 px-3 py-2 text-sm" />
            <select name="customerType" defaultValue="COPY_TRADING" className="rounded-md border border-slate-200 px-3 py-2 text-sm">
              {customerTypes.map((item) => <option key={item} value={item}>{readableEnum(item)}</option>)}
            </select>
            <select name="status" defaultValue="PENDING_SETUP" className="rounded-md border border-slate-200 px-3 py-2 text-sm">
              {customerStatuses.map((item) => <option key={item} value={item}>{readableEnum(item)}</option>)}
            </select>
            <select name="accountPlatform" defaultValue="" className="rounded-md border border-slate-200 px-3 py-2 text-sm">
              <option value="">Account platform</option>
              {accountPlatforms.filter(Boolean).map((item) => <option key={item} value={item}>{readableEnum(item)}</option>)}
            </select>
            <input name="brokerOrPropFirm" placeholder="Broker or prop firm" className="rounded-md border border-slate-200 px-3 py-2 text-sm" />
            <input name="accountLogin" placeholder="Account login" className="rounded-md border border-slate-200 px-3 py-2 text-sm" />
            <input name="profitShareTier" placeholder="Profit share tier" className="rounded-md border border-slate-200 px-3 py-2 text-sm" />
            <input name="setupFeeStatus" placeholder="Setup fee status" className="rounded-md border border-slate-200 px-3 py-2 text-sm" />
            <input name="initialCapital" type="number" step="0.01" min="0" defaultValue="0" placeholder="Initial capital" className="rounded-md border border-slate-200 px-3 py-2 text-sm" />
            <input name="currentBalance" type="number" step="0.01" min="0" defaultValue="0" placeholder="Current balance" className="rounded-md border border-slate-200 px-3 py-2 text-sm" />
            <input name="currentEquity" type="number" step="0.01" min="0" defaultValue="0" placeholder="Current equity" className="rounded-md border border-slate-200 px-3 py-2 text-sm" />
            <label className="grid gap-1 text-sm font-medium text-slate-700">
              Start date
              <input name="startDate" type="date" className="rounded-md border border-slate-200 px-3 py-2 text-sm" />
            </label>
            <label className="grid gap-1 text-sm font-medium text-slate-700">
              Renewal date
              <input name="renewalDate" type="date" className="rounded-md border border-slate-200 px-3 py-2 text-sm" />
            </label>
            <label className="grid gap-1 text-sm font-medium text-slate-700">
              Birthday
              <input name="dateOfBirth" type="date" className="rounded-md border border-slate-200 px-3 py-2 text-sm" />
            </label>
            <textarea name="notes" rows={3} placeholder="Internal notes" className="rounded-md border border-slate-200 px-3 py-2 text-sm md:col-span-2" />
            <div className="md:col-span-2">
              <button className="rounded-md bg-profit-500 px-4 py-2 text-sm font-bold text-navy-950">Create customer</button>
            </div>
          </form>
        </details>}
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
          columns={["Customer", "Email", "Type", "Platform", "Birthday", "Broker/Prop firm", "Balance", "Equity", "Status"]}
          rows={customers.map((item) => [item.fullName, item.email, readableEnum(item.customerType), item.accountPlatform ? readableEnum(item.accountPlatform) : "-", item.dateOfBirth ? item.dateOfBirth.toLocaleDateString() : "-", item.brokerOrPropFirm ?? "-", money(item.currentBalance), money(item.currentEquity), <StatusBadge key={item.id} value={readableEnum(item.status)} />])}
        />
      </Card>
      <div className="mt-6 grid gap-5 lg:grid-cols-2">
        {!schemaNotice && customers.length ? (
          customers.slice(0, 10).map((customer) => (
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
                <div className="grid gap-3 md:grid-cols-2">
                  <label className="grid gap-1 text-sm font-medium text-slate-700">
                    Renewal date
                    <input type="date" name="renewalDate" defaultValue={customer.renewalDate ? customer.renewalDate.toISOString().slice(0, 10) : ""} className="rounded-md border border-slate-200 px-3 py-2 text-sm" />
                  </label>
                  <label className="grid gap-1 text-sm font-medium text-slate-700">
                    Birthday
                    <input type="date" name="dateOfBirth" defaultValue={customer.dateOfBirth ? customer.dateOfBirth.toISOString().slice(0, 10) : ""} className="rounded-md border border-slate-200 px-3 py-2 text-sm" />
                  </label>
                </div>
                <textarea name="notes" defaultValue={customer.notes ?? ""} rows={3} placeholder="Add notes" className="rounded-md border border-slate-200 px-3 py-2 text-sm" />
                <button className="rounded-md bg-navy-950 px-4 py-2 text-sm font-bold text-white">Update Customer</button>
              </form>
            </Card>
          ))
        ) : schemaNotice ? (
          <div className="lg:col-span-2">
            <EmptyState title="Customer records are still being prepared" text="As soon as the live database update is fully in place, this page will start showing customer search, birthdays, and balance tracking." />
          </div>
        ) : (
          <div className="lg:col-span-2">
            <EmptyState title="No customers yet" text="Converted leads, approved applications, and manually created client records will appear here once you start onboarding clients." />
          </div>
        )}
      </div>
    </SPTAdminShell>
  );
}
