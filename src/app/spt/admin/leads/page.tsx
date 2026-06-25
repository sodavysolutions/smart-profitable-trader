import { revalidatePath } from "next/cache";
import { Card, DataTable, EmptyState, SectionHeader, StatusBadge } from "@/components/UI";
import { SPTAdminShell } from "@/components/spt/admin-shell";
import { sendWelcomeWorkflow } from "@/lib/message-workflows";
import { prisma } from "@/lib/prisma";
import { inferCustomerType, normalizeDate, normalizeText } from "@/lib/spt-admin-helpers";
import { readableEnum } from "@/lib/spt-admin-format";
import { requireAdmin } from "@/lib/spt-admin-auth";
import { leadUpdateSchema } from "@/lib/validation";
import type { LeadStatus } from "@prisma/client";

export const dynamic = "force-dynamic";

const leadStatuses: LeadStatus[] = ["NEW", "CONTACTED", "INTERESTED", "FOLLOW_UP", "PAYMENT_PENDING", "CONVERTED", "NOT_INTERESTED", "LOST"];

async function updateLead(formData: FormData) {
  "use server";
  const session = await requireAdmin();
  const parsed = leadUpdateSchema.safeParse(Object.fromEntries(formData.entries()));

  if (!parsed.success) {
    throw new Error("Invalid lead update details.");
  }

  await prisma.lead.update({
    where: { id: parsed.data.id },
    data: {
      status: parsed.data.status,
      notes: normalizeText(parsed.data.notes) ?? undefined,
      nextFollowUpAt: normalizeDate(parsed.data.nextFollowUpAt),
      activityLogs: {
        create: {
          type: "LEAD_UPDATED",
          description: `Lead status updated to ${parsed.data.status}.`,
          userId: session.userId
        }
      }
    }
  });
  revalidatePath("/spt/admin/leads");
}

async function convertLead(formData: FormData) {
  "use server";
  const session = await requireAdmin();
  const id = String(formData.get("id"));
  const lead = await prisma.lead.findUniqueOrThrow({ where: { id } });
  const customerType = inferCustomerType(lead.serviceInterest);

  const customer = await prisma.customer.upsert({
    where: { email: lead.email },
    update: {
      fullName: lead.fullName,
      phone: lead.phone,
      whatsapp: lead.whatsapp,
      country: lead.country,
      city: lead.city,
      customerType,
      status: "PENDING_SETUP",
      notes: lead.notes
    },
    create: {
      fullName: lead.fullName,
      email: lead.email,
      phone: lead.phone,
      whatsapp: lead.whatsapp,
      country: lead.country,
      city: lead.city,
      customerType,
      status: "PENDING_SETUP",
      notes: lead.notes,
      activityLogs: {
        create: {
          type: "CONVERTED_FROM_LEAD",
          description: `Converted from lead ${lead.fullName}.`,
          userId: session.userId
        }
      }
    }
  });

  await sendWelcomeWorkflow(customer.id);

  await prisma.lead.update({
    where: { id },
    data: {
      status: "CONVERTED",
      activityLogs: {
        create: {
          type: "LEAD_CONVERTED",
          description: `Lead converted into a customer record.`,
          userId: session.userId
        }
      }
    }
  });
  revalidatePath("/spt/admin/leads");
  revalidatePath("/spt/admin/customers");
}

export default async function SPTAdminLeadsPage({ searchParams }: { searchParams: Promise<{ q?: string; status?: LeadStatus; service?: string }> }) {
  const session = await requireAdmin();
  const { q, status, service } = await searchParams;
  const leads = await prisma.lead.findMany({
    where: {
      ...(q ? { OR: [{ fullName: { contains: q, mode: "insensitive" } }, { email: { contains: q, mode: "insensitive" } }] } : {}),
      ...(status ? { status } : {}),
      ...(service ? { serviceInterest: { contains: service, mode: "insensitive" } } : {})
    },
    orderBy: { createdAt: "desc" }
  });

  return (
    <SPTAdminShell title="Lead Pipeline" role={session.role}>
      <Card>
        <SectionHeader title="Lead pipeline" text="Review new interest, update follow-up status, add notes, and convert qualified leads into customers." action={<button className="rounded-md bg-profit-500 px-4 py-2 text-sm font-bold text-navy-950">Add Lead</button>} />
        <form className="mb-4 grid gap-3 md:grid-cols-4">
          <input name="q" defaultValue={q} placeholder="Search name or email" className="rounded-md border border-slate-200 px-3 py-2 text-sm" />
          <select name="status" defaultValue={status ?? ""} className="rounded-md border border-slate-200 px-3 py-2 text-sm">
            <option value="">All statuses</option>
            {leadStatuses.map((item) => <option key={item} value={item}>{readableEnum(item)}</option>)}
          </select>
          <input name="service" defaultValue={service} placeholder="Service interest" className="rounded-md border border-slate-200 px-3 py-2 text-sm" />
          <button className="rounded-md bg-navy-950 px-4 py-2 text-sm font-bold text-white">Filter</button>
        </form>
        <DataTable
          columns={["Lead", "Email", "Phone", "Service", "Status", "Source", "Follow-up"]}
          rows={leads.map((lead) => [lead.fullName, lead.email, lead.phone ?? "-", lead.serviceInterest, <StatusBadge key={lead.id} value={readableEnum(lead.status)} />, lead.leadSource ?? "-", lead.nextFollowUpAt ? lead.nextFollowUpAt.toLocaleDateString() : "Not set"])}
        />
      </Card>
      <div className="mt-6 grid gap-5 lg:grid-cols-2">
        {leads.length ? (
          leads.slice(0, 8).map((lead) => (
            <Card key={lead.id}>
              <SectionHeader title={lead.fullName} text={`${lead.email} · ${lead.serviceInterest}`} />
              <form action={updateLead} className="grid gap-3">
                <input type="hidden" name="id" value={lead.id} />
                <select name="status" defaultValue={lead.status} className="rounded-md border border-slate-200 px-3 py-2 text-sm">
                  {leadStatuses.map((item) => <option key={item} value={item}>{readableEnum(item)}</option>)}
                </select>
                <input type="date" name="nextFollowUpAt" defaultValue={lead.nextFollowUpAt ? lead.nextFollowUpAt.toISOString().slice(0, 10) : ""} className="rounded-md border border-slate-200 px-3 py-2 text-sm" />
                <textarea name="notes" defaultValue={lead.notes ?? ""} rows={3} placeholder="Add notes" className="rounded-md border border-slate-200 px-3 py-2 text-sm" />
                <button className="rounded-md bg-navy-950 px-4 py-2 text-sm font-bold text-white">Update Lead</button>
              </form>
              <form action={convertLead} className="mt-3">
                <input type="hidden" name="id" value={lead.id} />
                <button className="rounded-md bg-profit-500 px-4 py-2 text-sm font-bold text-navy-950">Convert to Customer</button>
              </form>
            </Card>
          ))
        ) : (
          <div className="lg:col-span-2">
            <EmptyState title="No leads yet" text="New website enquiries and manually added prospects will appear here as soon as interest starts coming in." />
          </div>
        )}
      </div>
    </SPTAdminShell>
  );
}
