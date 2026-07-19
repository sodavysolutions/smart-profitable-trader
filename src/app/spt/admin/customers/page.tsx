import { revalidatePath } from "next/cache";
import { Card, InlineNotice, SectionHeader } from "@/components/UI";
import { SPTAdminShell } from "@/components/spt/admin-shell";
import { syncRecordToGoogleSheets } from "@/lib/google-sheets";
import { prisma } from "@/lib/prisma";
import { normalizeDate, normalizeText } from "@/lib/spt-admin-helpers";
import { requireAdmin } from "@/lib/spt-admin-auth";
import { getSchemaMismatchMessage, isSchemaMismatchError } from "@/lib/spt-admin-schema";
import { customerCreateSchema, customerUpdateSchema } from "@/lib/validation";
import type { AccountPlatform, CustomerStatus, CustomerType } from "@prisma/client";
import { CustomerForm, type CustomerActionState } from "./customer-form";
import { CustomerList } from "./customer-list";

export const dynamic = "force-dynamic";

async function createCustomer(
  _prevState: CustomerActionState,
  formData: FormData
): Promise<CustomerActionState> {
  "use server";
  try {
    const session = await requireAdmin();
    const parsed = customerCreateSchema.safeParse(Object.fromEntries(formData.entries()));
    if (!parsed.success) {
      return { ok: false, message: "Please check the form — some details are missing or invalid." };
    }

    const data = {
      fullName: parsed.data.fullName,
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
    };

    const customer = await prisma.customer.upsert({
      where: { email: parsed.data.email.trim().toLowerCase() },
      create: { email: parsed.data.email.trim().toLowerCase(), ...data },
      update: data,
    });

    try {
      await prisma.activityLog.create({
        data: {
          type: "CUSTOMER_CREATED",
          description: `Customer ${parsed.data.fullName} created from admin panel.`,
          customerId: customer.id,
          userId: session.userId,
        },
      });
    } catch { /* non-fatal */ }

    await syncRecordToGoogleSheets("Customer", customer, "UPSERT");
    revalidatePath("/spt/admin/customers");
    return { ok: true, message: `${parsed.data.fullName} has been added as a customer.` };
  } catch (error) {
    console.error("[createCustomer]", error);
    return { ok: false, message: "Something went wrong. Please try again." };
  }
}

async function updateCustomer(
  _prevState: CustomerActionState,
  formData: FormData
): Promise<CustomerActionState> {
  "use server";
  try {
    const session = await requireAdmin();
    const parsed = customerUpdateSchema.safeParse(Object.fromEntries(formData.entries()));
    if (!parsed.success) {
      return { ok: false, message: "Please check the form — some details are invalid." };
    }

    const customer = await prisma.customer.update({
      where: { id: parsed.data.id },
      data: {
        status: parsed.data.status as CustomerStatus,
        phone: normalizeText(parsed.data.phone) ?? undefined,
        whatsapp: normalizeText(parsed.data.whatsapp) ?? undefined,
        brokerOrPropFirm: normalizeText(parsed.data.brokerOrPropFirm) ?? undefined,
        accountPlatform: parsed.data.accountPlatform ? (parsed.data.accountPlatform as AccountPlatform) : undefined,
        accountLogin: normalizeText(parsed.data.accountLogin) ?? undefined,
        profitShareTier: normalizeText(parsed.data.profitShareTier) ?? undefined,
        setupFeeStatus: normalizeText(parsed.data.setupFeeStatus) ?? undefined,
        initialCapital: parsed.data.initialCapital,
        currentBalance: parsed.data.currentBalance,
        currentEquity: parsed.data.currentEquity,
        renewalDate: normalizeDate(parsed.data.renewalDate),
        dateOfBirth: normalizeDate(parsed.data.dateOfBirth),
        notes: normalizeText(parsed.data.notes) ?? undefined,
      },
    });

    try {
      await prisma.activityLog.create({
        data: {
          type: "CUSTOMER_UPDATED",
          description: `Customer record updated — status: ${parsed.data.status}.`,
          customerId: customer.id,
          userId: session.userId,
        },
      });
    } catch { /* non-fatal */ }

    await syncRecordToGoogleSheets("Customer", customer, "UPDATE");
    revalidatePath("/spt/admin/customers");
    return { ok: true, message: "Customer updated successfully." };
  } catch (error) {
    console.error("[updateCustomer]", error);
    return { ok: false, message: "Something went wrong updating the customer." };
  }
}

async function deleteCustomer(id: string) {
  "use server";
  await requireAdmin();
  await prisma.customer.delete({ where: { id } });
  revalidatePath("/spt/admin/customers");
}

export default async function SPTAdminCustomersPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; type?: CustomerType; status?: CustomerStatus }>;
}) {
  const session = await requireAdmin();
  const { q, type, status } = await searchParams;

  type CustomerWithSubs = Awaited<
    ReturnType<typeof prisma.customer.findMany<{ include: { subscriptions: { select: { name: true; status: true } } } }>>
  >[number];

  let customers: CustomerWithSubs[] = [];
  let schemaNotice: string | null = null;

  try {
    customers = await prisma.customer.findMany({
      where: {
        ...(q ? { OR: [{ fullName: { contains: q, mode: "insensitive" } }, { email: { contains: q, mode: "insensitive" } }] } : {}),
        ...(type ? { customerType: type } : {}),
        ...(status ? { status } : {}),
      },
      include: { subscriptions: { select: { name: true, status: true } } },
      orderBy: { createdAt: "desc" },
    });
  } catch (error) {
    schemaNotice = isSchemaMismatchError(error)
      ? getSchemaMismatchMessage("Customer management")
      : "There was a problem loading customer records. Try refreshing.";
  }

  return (
    <SPTAdminShell title="Customer Records" role={session.role}>

      {/* Search / filter bar */}
      <Card className="mb-6">
        <form className="flex flex-wrap gap-3">
          <input
            name="q"
            defaultValue={q}
            placeholder="Search name or email…"
            className="rounded-md border border-slate-200 px-3 py-2 text-sm flex-1 min-w-[180px]"
          />
          <select name="type" defaultValue={type ?? ""} className="rounded-md border border-slate-200 px-3 py-2 text-sm">
            <option value="">All service types</option>
            <option value="VIP_SIGNALS">VIP Signals</option>
            <option value="COPY_TRADING">Copy Trading</option>
            <option value="INSTANT_FUNDED">Instant Funded</option>
            <option value="PERSONAL_ACCOUNT">Personal Account</option>
          </select>
          <select name="status" defaultValue={status ?? ""} className="rounded-md border border-slate-200 px-3 py-2 text-sm">
            <option value="">All statuses</option>
            {["ACTIVE","FUNDED","PENDING_SETUP","PAUSED","SUSPENDED","COMPLETED","CANCELLED","LOST"].map((s) => (
              <option key={s} value={s}>{s.replace(/_/g, " ")}</option>
            ))}
          </select>
          <button className="rounded-md bg-[#0A1A3C] px-4 py-2 text-sm font-bold text-white">Filter</button>
        </form>
      </Card>

      {/* Customer list */}
      <Card className="mb-6">
        <SectionHeader
          title="Customer records"
          text="Click Edit on any row to update details. Use the filter above to find specific customers."
        />
        {schemaNotice && <div className="mb-5"><InlineNotice title="Customer records are still being prepared" text={schemaNotice} /></div>}
        {!schemaNotice && (
          <CustomerList
            initialCustomers={customers}
            updateAction={updateCustomer}
            deleteAction={deleteCustomer}
          />
        )}
      </Card>

      {/* Add new customer */}
      {!schemaNotice && (
        <Card>
          <details>
            <summary className="cursor-pointer list-none text-sm font-bold text-[#0A1A3C] select-none">
              ＋ Add new customer
            </summary>
            <div className="mt-5">
              <CustomerForm action={createCustomer} />
            </div>
          </details>
        </Card>
      )}

    </SPTAdminShell>
  );
}
