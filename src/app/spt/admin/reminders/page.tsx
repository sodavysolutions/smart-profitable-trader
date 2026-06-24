import { addDays, formatDistanceToNowStrict, isAfter, isBefore, startOfDay } from "date-fns";
import { revalidatePath } from "next/cache";
import { Card, DataTable, EmptyState, InlineNotice, SectionHeader, StatusBadge } from "@/components/UI";
import { SPTAdminShell } from "@/components/spt/admin-shell";
import { sendBirthdayMessagesForDate, sendEventBroadcastNow, sendEventBroadcastPreview } from "@/lib/message-workflows";
import { prisma } from "@/lib/prisma";
import { money, readableEnum } from "@/lib/spt-admin-format";
import { requireAdmin } from "@/lib/spt-admin-auth";
import { checkCelebrationsDaily, checkRenewalsDaily } from "@/lib/reminders";
import { getSchemaMismatchMessage, isSchemaMismatchError } from "@/lib/spt-admin-schema";

export const dynamic = "force-dynamic";

async function getReminderData() {
  const [subscriptions, birthdayPreview, christmasPreview, newYearPreview, eidPreview, independencePreview] = await Promise.all([
    prisma.subscription.findMany({
      include: { customer: true, expense: true },
      where: {
        reminderEnabled: true,
        renewalDate: { not: null }
      },
      orderBy: { renewalDate: "asc" }
    }),
    sendEventBroadcastPreview("birthday"),
    sendEventBroadcastPreview("christmas"),
    sendEventBroadcastPreview("new_year"),
    sendEventBroadcastPreview("eid"),
    sendEventBroadcastPreview("independence_day")
  ]);

  return {
    subscriptions,
    birthdayPreview,
    christmasPreview,
    newYearPreview,
    eidPreview,
    independencePreview
  };
}

async function runRenewalDispatch() {
  "use server";
  await requireAdmin();
  await checkRenewalsDaily();
  revalidatePath("/spt/admin/reminders");
  revalidatePath("/spt/admin/communications");
}

async function runTodayCelebrations() {
  "use server";
  await requireAdmin();
  await checkCelebrationsDaily();
  revalidatePath("/spt/admin/reminders");
  revalidatePath("/spt/admin/communications");
}

async function sendBirthdayCampaignNow() {
  "use server";
  await requireAdmin();
  await sendBirthdayMessagesForDate(new Date());
  revalidatePath("/spt/admin/reminders");
  revalidatePath("/spt/admin/communications");
}

async function sendEventCampaignNow(formData: FormData) {
  "use server";
  await requireAdmin();
  const eventKey = formData.get("eventKey");
  if (eventKey !== "christmas" && eventKey !== "new_year" && eventKey !== "eid" && eventKey !== "independence_day") {
    throw new Error("Invalid event workflow.");
  }

  await sendEventBroadcastNow(eventKey);
  revalidatePath("/spt/admin/reminders");
  revalidatePath("/spt/admin/communications");
}

export default async function SPTAdminRemindersPage() {
  const session = await requireAdmin();
  let schemaNotice: string | null = null;
  let reminderData: Awaited<ReturnType<typeof getReminderData>> | null = null;

  try {
    reminderData = await getReminderData();
  } catch (error) {
    if (isSchemaMismatchError(error)) {
      schemaNotice = getSchemaMismatchMessage("Reminders");
    } else {
      throw error;
    }
  }

  const subscriptions = reminderData?.subscriptions ?? [];
  const birthdayPreview = reminderData?.birthdayPreview ?? [];
  const christmasPreview = reminderData?.christmasPreview ?? [];
  const newYearPreview = reminderData?.newYearPreview ?? [];
  const eidPreview = reminderData?.eidPreview ?? [];
  const independencePreview = reminderData?.independencePreview ?? [];

  const today = startOfDay(new Date());
  const inThreeDays = addDays(today, 3);
  const inSevenDays = addDays(today, 7);

  const reminderRows = subscriptions.map((subscription) => {
    const renewalDate = subscription.renewalDate!;
    let rule = "Future";

    if (isBefore(renewalDate, today)) rule = "Overdue";
    else if (+renewalDate === +today) rule = "Due today";
    else if (!isAfter(renewalDate, inThreeDays)) rule = "3-day reminder";
    else if (!isAfter(renewalDate, inSevenDays)) rule = "7-day reminder";

    return {
      id: subscription.id,
      name: subscription.name,
      type: readableEnum(subscription.type),
      related: subscription.customer?.fullName ?? subscription.expense?.name ?? subscription.relatedName ?? "-",
      amount: money(subscription.amount),
      renewalDate: renewalDate.toLocaleDateString(),
      status: readableEnum(subscription.status),
      rule,
      dueIn: formatDistanceToNowStrict(renewalDate, { addSuffix: true })
    };
  });

  const workflowRows = [
    ["Application acknowledgement", "Live", "Sent after a public application is submitted and saved."],
    ["Customer welcome message", "Live", "Sent when an application or lead is converted into a customer."],
    ["Payment acknowledgement", "Live", "Sent when a paid customer payment is recorded."],
    ["Renewal reminder workflow", "Live", "Uses WhatsApp and SMS hooks when a subscription is due in 7 days, 3 days, today, or overdue."],
    ["Christmas broadcast template", `${christmasPreview.length} recipients ready`, "Template can already be used for active customer outreach."],
    ["New year broadcast template", `${newYearPreview.length} recipients ready`, "Template can already be used for active customer outreach."],
    ["Eid broadcast template", `${eidPreview.length} recipients ready`, "Template can already be used for active customer outreach."],
    [
      "Independence day template",
      `${independencePreview.length} recipients ready`,
      "Template can already be used for active customer outreach."
    ],
    [
      "Birthday messages",
      `${birthdayPreview.length} customers with birthdays recorded`,
      "Birthdays now use the customer birthday field, so today-matched birthday messages can run truthfully."
    ]
  ];

  return (
    <SPTAdminShell title="Reminders" role={session.role}>
      <Card className="mb-6">
        <SectionHeader
          title="Workflow readiness"
          text="This is the current state of your outbound automation layer so you can see what is already live and what still depends on more customer data."
          action={
            <div className="flex flex-wrap gap-2">
              <form action={runRenewalDispatch}>
                <button className="rounded-md bg-navy-950 px-4 py-2 text-sm font-semibold text-white">Run renewal dispatch</button>
              </form>
              <form action={runTodayCelebrations}>
                <button className="rounded-md bg-profit-500 px-4 py-2 text-sm font-semibold text-navy-950">Run today's celebrations</button>
              </form>
            </div>
          }
        />
        {schemaNotice && <div className="mb-5"><InlineNotice title="Reminders are in setup mode" text={schemaNotice} /></div>}
        {!schemaNotice ? (
          <DataTable columns={["Workflow", "State", "Notes"]} rows={workflowRows} />
        ) : (
          <EmptyState title="Reminder workflows are not ready yet" text="This area will become available as soon as the subscription, settings, and communication tables are fully live in the production database." />
        )}
      </Card>
      <Card className="mb-6">
        <SectionHeader
          title="Manual campaign actions"
          text="These actions let you deliberately trigger a campaign now so you can test or send a live celebration without waiting for the daily check."
        />
        {!schemaNotice && <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-5">
          <form action={sendBirthdayCampaignNow}>
            <button className="w-full rounded-md border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-navy-950">Send today's birthdays</button>
          </form>
          {[
            ["christmas", "Send Christmas now"],
            ["new_year", "Send New Year now"],
            ["eid", "Send Eid now"],
            ["independence_day", "Send Independence Day now"]
          ].map(([eventKey, label]) => (
            <form key={eventKey} action={sendEventCampaignNow}>
              <input type="hidden" name="eventKey" value={eventKey} />
              <button className="w-full rounded-md border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-navy-950">{label}</button>
            </form>
          ))}
        </div>}
      </Card>
      <Card>
        <SectionHeader
          title="Reminder queue"
          text="This is the live renewal queue. It highlights what is overdue, due today, and coming up within the next 3 or 7 days for both customers and business expenses."
        />
        {!schemaNotice && reminderRows.length ? (
          <DataTable
            columns={["Subscription", "Type", "Related", "Amount", "Renewal date", "Due", "Rule", "Status"]}
            rows={reminderRows.map((reminder) => [
              reminder.name,
              reminder.type,
              reminder.related,
              reminder.amount,
              reminder.renewalDate,
              reminder.dueIn,
              <StatusBadge key={`rule-${reminder.id}`} value={reminder.rule} />,
              <StatusBadge key={`status-${reminder.id}`} value={reminder.status} />
            ])}
          />
        ) : schemaNotice ? (
          <EmptyState
            title="Reminder queue is not ready yet"
            text="The live renewal queue will turn on automatically once the missing reminder and subscription fields are available in the production database."
          />
        ) : (
          <EmptyState
            title="No reminders yet"
            text="Once subscriptions and recurring expenses have renewal dates with reminders enabled, the live reminder queue will populate here."
          />
        )}
      </Card>
    </SPTAdminShell>
  );
}
