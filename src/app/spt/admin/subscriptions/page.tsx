import { BillingCycle, SubscriptionStatus, SubscriptionType } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { Card, DataTable, EmptyState, InlineNotice, SectionHeader, StatusBadge } from "@/components/UI";
import { SPTAdminShell } from "@/components/spt/admin-shell";
import { prisma } from "@/lib/prisma";
import { money, readableEnum } from "@/lib/spt-admin-format";
import { normalizeDate, normalizeText } from "@/lib/spt-admin-helpers";
import { requireAdmin } from "@/lib/spt-admin-auth";
import { getSchemaMismatchMessage, isSchemaMismatchError } from "@/lib/spt-admin-schema";
import { subscriptionSchema } from "@/lib/validation";

export const dynamic = "force-dynamic";

const billingCycles = Object.values(BillingCycle);
const subscriptionStatuses = Object.values(SubscriptionStatus);
const subscriptionTypes = Object.values(SubscriptionType);

async function getSubscriptionRows() {
  return prisma.subscription.findMany({
    include: { customer: true, expense: true },
    orderBy: { renewalDate: "asc" }
  });
}

async function createSubscription(formData: FormData) {
  "use server";
  const session = await requireAdmin();
  const parsed = subscriptionSchema.safeParse({
    ...Object.fromEntries(formData.entries()),
    reminderEnabled: formData.get("reminderEnabled") === "on"
  });

  if (!parsed.success) {
    throw new Error("Invalid subscription details.");
  }

  await prisma.subscription.create({
    data: {
      name: parsed.data.name,
      type: parsed.data.type,
      customerId: normalizeText(parsed.data.customerId) ?? undefined,
      expenseId: normalizeText(parsed.data.expenseId) ?? undefined,
      relatedName: normalizeText(parsed.data.relatedName),
      amount: parsed.data.amount,
      currency: parsed.data.currency.toUpperCase(),
      startDate: normalizeDate(parsed.data.startDate),
      renewalDate: normalizeDate(parsed.data.renewalDate),
      billingCycle: parsed.data.billingCycle,
      status: parsed.data.status,
      reminderEnabled: parsed.data.reminderEnabled,
      notes: normalizeText(parsed.data.notes),
      activityLogs: {
        create: {
          type: "SUBSCRIPTION_CREATED",
          description: `Subscription created for ${parsed.data.name}.`,
          userId: session.userId
        }
      }
    }
  });

  revalidatePath("/spt/admin/subscriptions");
}

export default async function SPTAdminSubscriptionsPage() {
  const session = await requireAdmin();
  let subscriptions = [] as Awaited<ReturnType<typeof getSubscriptionRows>>;
  let customers = [] as Awaited<ReturnType<typeof prisma.customer.findMany>>;
  let expenses = [] as Awaited<ReturnType<typeof prisma.expense.findMany>>;
  let schemaNotice: string | null = null;

  try {
    [subscriptions, customers, expenses] = await Promise.all([
      getSubscriptionRows(),
      prisma.customer.findMany({ orderBy: { fullName: "asc" } }),
      prisma.expense.findMany({ orderBy: { name: "asc" } })
    ]);
  } catch (error) {
    if (isSchemaMismatchError(error)) {
      schemaNotice = getSchemaMismatchMessage("Subscriptions");
    } else {
      throw error;
    }
  }

  return (
    <SPTAdminShell title="Subscription Center" role={session.role}>
      <Card>
        <SectionHeader title="Subscription center" text="Track customer renewals and recurring business expenses in one place, with billing cycles, reminder flags, and renewal dates." />
        {schemaNotice && <div className="mb-5"><InlineNotice title="Subscriptions are still being prepared" text={schemaNotice} /></div>}
        {!schemaNotice && <form action={createSubscription} className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          <label className="grid gap-1 text-sm font-medium text-slate-700">
            Subscription name
            <input name="name" required className="rounded-md border border-slate-200 px-3 py-2" />
          </label>
          <label className="grid gap-1 text-sm font-medium text-slate-700">
            Type
            <select name="type" defaultValue={SubscriptionType.CUSTOMER_SUBSCRIPTION} className="rounded-md border border-slate-200 px-3 py-2">
              {subscriptionTypes.map((item) => <option key={item} value={item}>{readableEnum(item)}</option>)}
            </select>
          </label>
          <label className="grid gap-1 text-sm font-medium text-slate-700">
            Related customer
            <select name="customerId" defaultValue="" className="rounded-md border border-slate-200 px-3 py-2">
              <option value="">Not linked</option>
              {customers.map((customer) => <option key={customer.id} value={customer.id}>{customer.fullName}</option>)}
            </select>
          </label>
          <label className="grid gap-1 text-sm font-medium text-slate-700">
            Related expense
            <select name="expenseId" defaultValue="" className="rounded-md border border-slate-200 px-3 py-2">
              <option value="">Not linked</option>
              {expenses.map((expense) => <option key={expense.id} value={expense.id}>{expense.name}</option>)}
            </select>
          </label>
          <label className="grid gap-1 text-sm font-medium text-slate-700">
            Related name
            <input name="relatedName" className="rounded-md border border-slate-200 px-3 py-2" />
          </label>
          <label className="grid gap-1 text-sm font-medium text-slate-700">
            Amount
            <input name="amount" type="number" step="0.01" min="0" defaultValue="0" className="rounded-md border border-slate-200 px-3 py-2" />
          </label>
          <label className="grid gap-1 text-sm font-medium text-slate-700">
            Currency
            <input name="currency" defaultValue="USD" className="rounded-md border border-slate-200 px-3 py-2" />
          </label>
          <label className="grid gap-1 text-sm font-medium text-slate-700">
            Billing cycle
            <select name="billingCycle" defaultValue={BillingCycle.MONTHLY} className="rounded-md border border-slate-200 px-3 py-2">
              {billingCycles.map((item) => <option key={item} value={item}>{readableEnum(item)}</option>)}
            </select>
          </label>
          <label className="grid gap-1 text-sm font-medium text-slate-700">
            Start date
            <input name="startDate" type="date" className="rounded-md border border-slate-200 px-3 py-2" />
          </label>
          <label className="grid gap-1 text-sm font-medium text-slate-700">
            Renewal date
            <input name="renewalDate" type="date" className="rounded-md border border-slate-200 px-3 py-2" />
          </label>
          <label className="grid gap-1 text-sm font-medium text-slate-700">
            Status
            <select name="status" defaultValue={SubscriptionStatus.ACTIVE} className="rounded-md border border-slate-200 px-3 py-2">
              {subscriptionStatuses.map((item) => <option key={item} value={item}>{readableEnum(item)}</option>)}
            </select>
          </label>
          <label className="flex items-center gap-3 rounded-md border border-slate-200 px-3 py-2 text-sm font-medium text-slate-700">
            <input type="checkbox" name="reminderEnabled" defaultChecked className="h-4 w-4" />
            Reminder enabled
          </label>
          <label className="md:col-span-2 xl:col-span-4 grid gap-1 text-sm font-medium text-slate-700">
            Notes
            <textarea name="notes" rows={3} className="rounded-md border border-slate-200 px-3 py-2" />
          </label>
          <div className="xl:col-span-4">
            <button className="rounded-md bg-profit-500 px-5 py-3 text-sm font-bold text-navy-950">Save Subscription</button>
          </div>
        </form>}
      </Card>

      <Card className="mt-6">
        <SectionHeader title="Active subscriptions" text="This list powers renewal reminders and gives you one place to monitor recurring revenue and operating commitments." />
        {!schemaNotice && subscriptions.length ? (
          <DataTable
            columns={["Name", "Type", "Related", "Amount", "Cycle", "Renewal", "Status", "Reminder"]}
            rows={subscriptions.map((subscription) => [
              subscription.name,
              readableEnum(subscription.type),
              subscription.customer?.fullName ?? subscription.expense?.name ?? subscription.relatedName ?? "-",
              money(subscription.amount),
              readableEnum(subscription.billingCycle),
              subscription.renewalDate ? subscription.renewalDate.toLocaleDateString() : "Not set",
              <StatusBadge key={subscription.id} value={readableEnum(subscription.status)} />,
              subscription.reminderEnabled ? "Enabled" : "Off"
            ])}
          />
        ) : schemaNotice ? (
          <EmptyState title="Subscriptions are still being prepared" text="This section will come online as soon as the live subscription and expense tables are available in production." />
        ) : (
          <EmptyState title="No subscriptions yet" text="Add your first customer plan or recurring business bill here so renewals and reminders have a reliable source of truth." />
        )}
      </Card>
    </SPTAdminShell>
  );
}
