import { SPTAdminShell } from "@/components/spt/admin-shell";
import { Card, DataTable, EmptyState, InlineNotice, SectionHeader, StatusBadge } from "@/components/UI";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/spt-admin-auth";
import { getSchemaMismatchMessage, isSchemaMismatchError } from "@/lib/spt-admin-schema";
import { revalidatePath } from "next/cache";
import Link from "next/link";

export const dynamic = "force-dynamic";

async function convertToLead(formData: FormData) {
  "use server";
  await requireAdmin();
  const contactId = String(formData.get("contactId"));
  const contact = await prisma.chatbotContact.findUnique({ where: { id: contactId } });
  if (!contact) return;
  // Lead model uses: fullName, email (unique), phone, whatsapp, serviceInterest, status
  try {
    await prisma.lead.create({
      data: {
        fullName: contact.fullName ?? "Unknown",
        email: contact.email ?? `chatbot-${contactId}@noemail.local`,
        whatsapp: contact.phoneWhatsapp ?? undefined,
        phone: contact.phoneWhatsapp ?? undefined,
        serviceInterest: contact.serviceInterest?.replace(/_/g, " ") ?? "Not Sure",
        status: "NEW",
        leadSource: "AI Agent",
      } as any,
    });
  } catch {
    // Lead may already exist with same email — still mark as converted
  }
  await prisma.chatbotContact.update({
    where: { id: contactId },
    data: { leadStatus: "CONVERTED" },
  });
  revalidatePath("/spt/admin/chatbot-leads");
}

export default async function ChatbotLeadsPage({
  searchParams,
}: {
  searchParams: Promise<{ status?: string; interest?: string; q?: string }>;
}) {
  const session = await requireAdmin();
  const { status, interest, q } = await searchParams;
  let contacts: Awaited<ReturnType<typeof prisma.chatbotContact.findMany>> = [];
  let schemaNotice: string | null = null;

  try {
    contacts = await prisma.chatbotContact.findMany({
      where: {
        ...(status ? { leadStatus: status as any } : {}),
        ...(interest ? { serviceInterest: interest as any } : {}),
        ...(q
          ? {
              OR: [
                { fullName: { contains: q, mode: "insensitive" } },
                { email: { contains: q, mode: "insensitive" } },
                { phoneWhatsapp: { contains: q, mode: "insensitive" } },
              ],
            }
          : {}),
      },
      orderBy: { lastInteractionAt: "desc" },
    });
  } catch (error) {
    if (isSchemaMismatchError(error)) {
      schemaNotice = getSchemaMismatchMessage("AI Agent Leads");
    } else {
      const msg = error instanceof Error ? error.message : String(error);
      schemaNotice = `Could not load chatbot leads: ${msg}`;
    }
  }

  const statusOptions = [
    "NEW",
    "ENGAGED",
    "NEEDS_FOLLOW_UP",
    "APPLICATION_SENT",
    "APPLICATION_SUBMITTED",
    "COPY_TRADING_VERIFICATION_PENDING",
    "CONVERTED",
    "LOST",
  ];
  const interestOptions = [
    "VIP_SIGNALS",
    "COPY_TRADING",
    "INSTANT_FUNDED",
    "EVALUATION",
    "PERSONAL_ACCOUNT_MANAGEMENT",
    "NOT_SURE",
  ];

  return (
    <SPTAdminShell title="AI Agent Leads" role={session.role}>
      {schemaNotice && (
        <div className="mb-6">
          <InlineNotice title="AI Agent Leads still loading" text={schemaNotice} />
        </div>
      )}
      <Card className="mb-6">
        <SectionHeader title="Filters" />
        <form method="get" className="flex flex-wrap gap-3">
          <input
            name="q"
            defaultValue={q}
            placeholder="Search name, email, phone..."
            className="rounded-md border border-slate-200 px-3 py-2 text-sm w-64"
          />
          <select
            name="status"
            defaultValue={status ?? ""}
            className="rounded-md border border-slate-200 px-3 py-2 text-sm"
          >
            <option value="">All statuses</option>
            {statusOptions.map((s) => (
              <option key={s} value={s}>
                {s.replaceAll("_", " ")}
              </option>
            ))}
          </select>
          <select
            name="interest"
            defaultValue={interest ?? ""}
            className="rounded-md border border-slate-200 px-3 py-2 text-sm"
          >
            <option value="">All services</option>
            {interestOptions.map((i) => (
              <option key={i} value={i}>
                {i.replaceAll("_", " ")}
              </option>
            ))}
          </select>
          <button className="rounded-md bg-navy-950 px-4 py-2 text-sm font-bold text-white">
            Filter
          </button>
          <Link
            href="/spt/admin/chatbot-leads"
            className="rounded-md border border-slate-200 px-4 py-2 text-sm font-medium text-slate-600"
          >
            Clear
          </Link>
        </form>
      </Card>
      <Card>
        <SectionHeader
          title="AI Agent Leads"
          text={`${contacts.length} contact${contacts.length !== 1 ? "s" : ""} found`}
        />
        {contacts.length ? (
          <DataTable
            columns={[
              "Name",
              "Phone / WhatsApp",
              "Email",
              "Service Interest",
              "Source",
              "Status",
              "Last Interaction",
              "Actions",
            ]}
            rows={contacts.map((c: any) => [
              c.fullName ?? "—",
              c.phoneWhatsapp ?? "—",
              c.email ?? "—",
              c.serviceInterest?.replaceAll("_", " ") ?? "—",
              c.sourcePage ?? "—",
              <StatusBadge key={c.id + "-status"} value={c.leadStatus.replaceAll("_", " ")} />,
              c.lastInteractionAt.toLocaleDateString(),
              <form key={c.id + "-form"} action={convertToLead}>
                <input type="hidden" name="contactId" value={c.id} />
                <button
                  type="submit"
                  disabled={c.leadStatus === "CONVERTED"}
                  className="rounded-md bg-profit-500 px-3 py-1 text-xs font-bold text-navy-950 disabled:opacity-40"
                >
                  {c.leadStatus === "CONVERTED" ? "Converted" : "Convert to Lead"}
                </button>
              </form>,
            ])}
          />
        ) : (
          <EmptyState
            title={schemaNotice ? "Still loading" : "No chatbot leads yet"}
            text={
              schemaNotice ??
              "Leads will appear here as visitors interact with the AI agent."
            }
          />
        )}
      </Card>
    </SPTAdminShell>
  );
}
