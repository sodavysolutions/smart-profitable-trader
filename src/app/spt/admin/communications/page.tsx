import { CommunicationChannel, CommunicationStatus } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { Card, DataTable, EmptyState, InlineNotice, SectionHeader, StatusBadge } from "@/components/UI";
import { SPTAdminShell } from "@/components/spt/admin-shell";
import { prisma } from "@/lib/prisma";
import { readableEnum } from "@/lib/spt-admin-format";
import { normalizeText } from "@/lib/spt-admin-helpers";
import { requireAdmin } from "@/lib/spt-admin-auth";
import { getSchemaMismatchMessage, isSchemaMismatchError } from "@/lib/spt-admin-schema";
import { communicationLogSchema } from "@/lib/validation";

export const dynamic = "force-dynamic";

async function getCommunicationRows() {
  return prisma.communicationLog.findMany({
    include: { lead: true, customer: true, application: true },
    orderBy: [{ createdAt: "desc" }]
  });
}

async function createCommunication(formData: FormData) {
  "use server";
  const session = await requireAdmin();
  const parsed = communicationLogSchema.safeParse(Object.fromEntries(formData.entries()));

  if (!parsed.success) {
    throw new Error("Invalid communication log details.");
  }

  await prisma.communicationLog.create({
    data: {
      channel: parsed.data.channel,
      recipient: parsed.data.recipient,
      subject: normalizeText(parsed.data.subject),
      message: parsed.data.message,
      status: parsed.data.status,
      leadId: normalizeText(parsed.data.leadId) ?? undefined,
      customerId: normalizeText(parsed.data.customerId) ?? undefined,
      applicationId: normalizeText(parsed.data.applicationId) ?? undefined,
      sentAt: parsed.data.status === CommunicationStatus.SENT ? new Date() : null
    }
  });

  await prisma.activityLog.create({
    data: {
      type: "COMMUNICATION_LOGGED",
      description: `Communication logged for ${parsed.data.recipient} via ${parsed.data.channel}.`,
      leadId: normalizeText(parsed.data.leadId) ?? undefined,
      customerId: normalizeText(parsed.data.customerId) ?? undefined,
      applicationId: normalizeText(parsed.data.applicationId) ?? undefined,
      userId: session.userId
    }
  });

  revalidatePath("/spt/admin/communications");
}

export default async function SPTAdminCommunicationsPage() {
  const session = await requireAdmin();
  let communications = [] as Awaited<ReturnType<typeof getCommunicationRows>>;
  let leads = [] as Awaited<ReturnType<typeof prisma.lead.findMany>>;
  let customers = [] as Awaited<ReturnType<typeof prisma.customer.findMany>>;
  let applications = [] as Awaited<ReturnType<typeof prisma.application.findMany>>;
  let schemaNotice: string | null = null;

  try {
    [communications, leads, customers, applications] = await Promise.all([
      getCommunicationRows(),
      prisma.lead.findMany({ orderBy: { fullName: "asc" } }),
      prisma.customer.findMany({ orderBy: { fullName: "asc" } }),
      prisma.application.findMany({ orderBy: { fullName: "asc" } })
    ]);
  } catch (error) {
    if (isSchemaMismatchError(error)) {
      schemaNotice = getSchemaMismatchMessage("Communications");
    } else {
      throw error;
    }
  }

  return (
    <SPTAdminShell title="Communications" role={session.role}>
      <Card>
        <SectionHeader
          title="Log a communication"
          text="Use this for manual follow-ups, internal notes, or any outreach that happens outside the automated workflows. Every touchpoint should still be recorded here so each lead, customer, or application keeps a clean history."
        />
        {schemaNotice && <div className="mb-5"><InlineNotice title="Communications are in setup mode" text={schemaNotice} /></div>}
        {!schemaNotice && <form action={createCommunication} className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          <label className="grid gap-1 text-sm font-medium text-slate-700">
            Recipient
            <input name="recipient" required className="rounded-md border border-slate-200 px-3 py-2" />
          </label>
          <label className="grid gap-1 text-sm font-medium text-slate-700">
            Channel
            <select name="channel" defaultValue={CommunicationChannel.EMAIL} className="rounded-md border border-slate-200 px-3 py-2">
              {Object.values(CommunicationChannel).map((item) => (
                <option key={item} value={item}>
                  {readableEnum(item)}
                </option>
              ))}
            </select>
          </label>
          <label className="grid gap-1 text-sm font-medium text-slate-700">
            Status
            <select name="status" defaultValue={CommunicationStatus.PENDING} className="rounded-md border border-slate-200 px-3 py-2">
              {Object.values(CommunicationStatus).map((item) => (
                <option key={item} value={item}>
                  {readableEnum(item)}
                </option>
              ))}
            </select>
          </label>
          <label className="grid gap-1 text-sm font-medium text-slate-700">
            Subject/title
            <input name="subject" className="rounded-md border border-slate-200 px-3 py-2" />
          </label>
          <label className="grid gap-1 text-sm font-medium text-slate-700">
            Related lead
            <select name="leadId" defaultValue="" className="rounded-md border border-slate-200 px-3 py-2">
              <option value="">Not linked</option>
              {leads.map((lead) => (
                <option key={lead.id} value={lead.id}>
                  {lead.fullName}
                </option>
              ))}
            </select>
          </label>
          <label className="grid gap-1 text-sm font-medium text-slate-700">
            Related customer
            <select name="customerId" defaultValue="" className="rounded-md border border-slate-200 px-3 py-2">
              <option value="">Not linked</option>
              {customers.map((customer) => (
                <option key={customer.id} value={customer.id}>
                  {customer.fullName}
                </option>
              ))}
            </select>
          </label>
          <label className="grid gap-1 text-sm font-medium text-slate-700">
            Related application
            <select name="applicationId" defaultValue="" className="rounded-md border border-slate-200 px-3 py-2">
              <option value="">Not linked</option>
              {applications.map((application) => (
                <option key={application.id} value={application.id}>
                  {application.fullName}
                </option>
              ))}
            </select>
          </label>
          <label className="md:col-span-2 xl:col-span-4 grid gap-1 text-sm font-medium text-slate-700">
            Message body
            <textarea name="message" rows={4} required className="rounded-md border border-slate-200 px-3 py-2" />
          </label>
          <div className="xl:col-span-4">
            <button className="rounded-md bg-profit-500 px-5 py-3 text-sm font-bold text-navy-950">Save Communication</button>
          </div>
        </form>}
      </Card>

      <Card className="mt-6">
        <SectionHeader
          title="Communication log"
          text="Automated acknowledgements, welcome messages, renewal reminders, and manual communication records all land here. Sent, failed, and pending items stay visible so your team can track delivery and follow up confidently."
        />
        {!schemaNotice && communications.length ? (
          <DataTable
            columns={["Recipient", "Channel", "Title", "Status", "Linked record", "Date"]}
            rows={communications.map((item) => [
              item.recipient,
              readableEnum(item.channel),
              item.subject ?? "Untitled",
              <StatusBadge key={item.id} value={readableEnum(item.status)} />,
              item.customer?.fullName ?? item.lead?.fullName ?? item.application?.fullName ?? "Unlinked",
              (item.sentAt ?? item.createdAt).toLocaleDateString()
            ])}
          />
        ) : schemaNotice ? (
          <EmptyState
            title="Communications are not live yet"
            text="This section will become available as soon as the missing communication tables and related columns are fully present in the live database."
          />
        ) : (
          <EmptyState
            title="No communication logs yet"
            text="As soon as welcome messages, acknowledgements, follow-ups, or manual outreach notes are logged, they will appear here."
          />
        )}
      </Card>
    </SPTAdminShell>
  );
}
