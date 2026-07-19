import { revalidatePath } from "next/cache";
import { Card, DataTable, EmptyState, InlineNotice, SectionHeader, StatusBadge } from "@/components/UI";
import { SPTAdminShell } from "@/components/spt/admin-shell";
import { DeleteButton } from "@/components/spt/delete-button";
import { syncRecordToGoogleSheets } from "@/lib/google-sheets";
import { prisma } from "@/lib/prisma";
import { money, readableEnum } from "@/lib/spt-admin-format";
import { normalizeDate, normalizeText } from "@/lib/spt-admin-helpers";
import { requireAdmin } from "@/lib/spt-admin-auth";
import { getSchemaMismatchMessage, isSchemaMismatchError } from "@/lib/spt-admin-schema";
import { subscriptionSchema } from "@/lib/validation";
import { SubscriptionForm } from "./subscription-form";

export const dynamic = "force-dynamic";

type ActionState = { ok: boolean; message: string } | null;

async function getSubscriptionRows() {
  return prisma.subscription.findMany({
    include: { customer: true, expense: true },
    orderBy: { renewalDate: "asc" }
  });
}

async function createSubscription(
  _prevState: ActionState,
  formData: FormData
): Promise<ActionState> {
  "use server";
  try {
    const session = await requireAdmin();
    const parsed = subscriptionSchema.safeParse({
      ...Object.fromEntries(formData.entries()),
      reminderEnabled: formData.get("reminderEnabled") === "on"
    });

    if (!parsed.success) {
      return { ok: false, message: "Please check the form — some details are missing or invalid." };
    }

    const subscription = await prisma.subscription.create({
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
      }
    });

    // Log activity separately — non-fatal if it fails
    try {
      await prisma.activityLog.create({
        data: {
          type: "SUBSCRIPTION_CREATED",
          description: `Subscription created for ${parsed.data.name}.`,
          subscriptionId: subscription.id,
          userId: session.userId,
        }
      });
    } catch {
      // Non-fatal
    }

    await syncRecordToGoogleSheets("Subscription", subscription, "CREATE");
    revalidatePath("/spt/admin/subscriptions");

    return { ok: true, message: `"${parsed.data.name}" subscription saved successfully.` };
  } catch (error) {
    console.error("[createSubscription]", error);
    return { ok: false, message: "Something went wrong saving the subscription. Please try again." };
  }
}

async function deleteSubscription(id: string) {
  "use server";
  await requireAdmin();
  await prisma.subscription.delete({ where: { id } });
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
    schemaNotice = isSchemaMismatchError(error)
      ? getSchemaMismatchMessage("Subscriptions")
      : "There was a problem loading subscriptions. Try refreshing.";
  }

  return (
    <SPTAdminShell title="Subscription Center" role={session.role}>
      <Card>
        <SectionHeader title="Subscription center" text="Track customer renewals and recurring business expenses in one place, with billing cycles, reminder flags, and renewal dates." />
        {schemaNotice && <div className="mb-5"><InlineNotice title="Subscriptions are still being prepared" text={schemaNotice} /></div>}
        {!schemaNotice && (
          <SubscriptionForm
            action={createSubscription}
            customers={customers}
            expenses={expenses}
          />
        )}
      </Card>

      <Card className="mt-6">
        <SectionHeader title="Active subscriptions" text="This list powers renewal reminders and gives you one place to monitor recurring revenue and operating commitments." />
        {!schemaNotice && subscriptions.length ? (
          <DataTable
            columns={["Name", "Type", "Related", "Amount", "Cycle", "Renewal", "Status", "Reminder", ""]}
            rows={subscriptions.map((subscription) => [
              subscription.name,
              readableEnum(subscription.type),
              subscription.customer?.fullName ?? subscription.expense?.name ?? subscription.relatedName ?? "-",
              money(subscription.amount),
              readableEnum(subscription.billingCycle),
              subscription.renewalDate ? subscription.renewalDate.toLocaleDateString() : "Not set",
              <StatusBadge key={subscription.id} value={readableEnum(subscription.status)} />,
              subscription.reminderEnabled ? "Enabled" : "Off",
              <DeleteButton key={`del-${subscription.id}`} id={subscription.id} onDelete={deleteSubscription} label="subscription" />
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
