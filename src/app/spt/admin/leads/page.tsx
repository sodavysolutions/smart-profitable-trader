import { revalidatePath } from "next/cache";
import Link from "next/link";
import { MessageSquare, Phone, Mail, Calendar, User, ArrowRight } from "lucide-react";
import { SPTAdminShell, SourceBadge, AdminCard, AdminCardHeader, AdminCardBody } from "@/components/spt/admin-shell";
import { StatusBadge } from "@/components/UI";
import { AddLeadButton } from "@/components/spt/add-lead-modal";
import { DeleteButton } from "@/components/spt/delete-button";
import { prisma } from "@/lib/prisma";
import { readableEnum } from "@/lib/spt-admin-format";
import { requireAdmin } from "@/lib/spt-admin-auth";
import { inferCustomerType, normalizeDate, normalizeText } from "@/lib/spt-admin-helpers";
import { sendWelcomeWorkflow } from "@/lib/message-workflows";
import { syncRecordToGoogleSheets } from "@/lib/google-sheets";
import { leadUpdateSchema } from "@/lib/validation";
import type { LeadStatus } from "@prisma/client";

// LeadSource enum — added in schema but Prisma client regenerates on build
type LeadSource = "FORM" | "AI_CHATBOT" | "WHATSAPP" | "TELEGRAM" | "MANUAL" | "REFERRAL" | "CAMPAIGN";

export const dynamic = "force-dynamic";

const leadStatuses: LeadStatus[] = [
  "NEW", "CONTACTED", "INTERESTED", "FOLLOW_UP",
  "PAYMENT_PENDING", "CONVERTED", "NOT_INTERESTED", "LOST",
];

// ── Server actions ─────────────────────────────────────────────────────────────

async function updateLead(formData: FormData) {
  "use server";
  const session = await requireAdmin();
  const parsed = leadUpdateSchema.safeParse(Object.fromEntries(formData.entries()));
  if (!parsed.success) throw new Error("Invalid lead update details.");

  const lead = await prisma.lead.update({
    where: { id: parsed.data.id },
    data: {
      status: parsed.data.status,
      notes: normalizeText(parsed.data.notes) ?? undefined,
      nextFollowUpAt: normalizeDate(parsed.data.nextFollowUpAt),
      activityLogs: {
        create: {
          type: "LEAD_UPDATED",
          description: `Lead status updated to ${parsed.data.status}.`,
          userId: session.userId,
        },
      },
    },
  });
  await syncRecordToGoogleSheets("Lead", lead, "UPDATE");
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
      notes: lead.notes,
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
          userId: session.userId,
        },
      },
    },
  });

  await sendWelcomeWorkflow(customer.id);

  const updatedLead = await prisma.lead.update({
    where: { id },
    data: {
      status: "CONVERTED",
      activityLogs: {
        create: {
          type: "LEAD_CONVERTED",
          description: "Lead converted into a customer record.",
          userId: session.userId,
        },
      },
    },
  });
  await syncRecordToGoogleSheets("Customer", customer, "UPSERT");
  await syncRecordToGoogleSheets("Lead", updatedLead, "UPDATE");
  revalidatePath("/spt/admin/leads");
  revalidatePath("/spt/admin/customers");
}

async function createLead(formData: FormData) {
  "use server";
  await requireAdmin();
  const fullName = String(formData.get("fullName") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim().toLowerCase();
  const phone = String(formData.get("phone") ?? "").trim() || undefined;
  const country = String(formData.get("country") ?? "").trim() || undefined;
  const serviceInterest = String(formData.get("serviceInterest") ?? "").trim();
  const source = String(formData.get("source") ?? "MANUAL");
  const status = String(formData.get("status") ?? "NEW") as LeadStatus;
  const notes = String(formData.get("notes") ?? "").trim() || undefined;

  if (!fullName || !email || !serviceInterest) throw new Error("Name, email and service are required.");

  const lead = await prisma.lead.create({
    data: {
      fullName,
      email,
      phone,
      whatsapp: phone,
      country,
      serviceInterest,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      source: source as any,
      status,
      notes,
      leadSource: source,
    },
  });

  await syncRecordToGoogleSheets("Lead", lead, "CREATE").catch(() => {});
  revalidatePath("/spt/admin/leads");
}

async function deleteLead(id: string) {
  "use server";
  await requireAdmin();
  await prisma.lead.delete({ where: { id } });
  revalidatePath("/spt/admin/leads");
}

async function deleteChatbotContact(id: string) {
  "use server";
  await requireAdmin();
  // Cascade: messages deleted via onDelete:Cascade on ChatbotMessage → conversation
  // Conversations deleted manually first
  const convs = await prisma.chatbotConversation.findMany({ where: { contactId: id }, select: { id: true } });
  for (const conv of convs) {
    await prisma.chatbotMessage.deleteMany({ where: { conversationId: conv.id } });
  }
  await prisma.chatbotConversation.deleteMany({ where: { contactId: id } });
  await prisma.chatbotContact.delete({ where: { id } });
  revalidatePath("/spt/admin/leads");
}

// ── Tab definitions ─────────────────────────────────────────────────────────────

type TabKey = "all" | "form" | "ai_chatbot" | "whatsapp" | "telegram" | "follow_ups" | "converted";

const TABS: { value: TabKey; label: string }[] = [
  { value: "all",         label: "All Leads" },
  { value: "form",        label: "Form" },
  { value: "ai_chatbot",  label: "AI Chatbot" },
  { value: "whatsapp",    label: "WhatsApp" },
  { value: "telegram",    label: "Telegram" },
  { value: "follow_ups",  label: "Follow-Ups" },
  { value: "converted",   label: "Converted" },
];

// ── Page ────────────────────────────────────────────────────────────────────────

export default async function SPTAdminLeadsPage({
  searchParams,
}: {
  searchParams: Promise<{
    q?: string;
    status?: LeadStatus;
    service?: string;
    source?: string;
    tab?: TabKey;
  }>;
}) {
  const session = await requireAdmin();
  const { q, status, service, source, tab = "all" } = await searchParams;

  // Build filter from tab
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const tabFilter: Record<string, any> = {};
  if (tab === "form")       tabFilter.source = "FORM";
  if (tab === "ai_chatbot") tabFilter.source = "AI_CHATBOT";
  if (tab === "whatsapp")   tabFilter.source = "WHATSAPP";
  if (tab === "telegram")   tabFilter.source = "TELEGRAM";
  if (tab === "follow_ups") tabFilter.nextFollowUpAt = { lte: new Date() };
  if (tab === "converted")  tabFilter.status = "CONVERTED";

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const where: Record<string, any> = {
    ...tabFilter,
    ...(q
      ? {
          OR: [
            { fullName: { contains: q, mode: "insensitive" } },
            { email: { contains: q, mode: "insensitive" } },
            { phone: { contains: q, mode: "insensitive" } },
          ],
        }
      : {}),
    ...(status ? { status } : {}),
    ...(service ? { serviceInterest: { contains: service, mode: "insensitive" } } : {}),
    ...(source ? { source: source as LeadSource } : {}),
  };

  const [leads, chatbotContacts, allLeadCount] = await Promise.all([
    prisma.lead.findMany({ where, orderBy: { createdAt: "desc" } }),
    // Surface chatbot contacts in AI Chatbot tab
    (tab === "ai_chatbot" || tab === "all")
      ? prisma.chatbotContact.findMany({
          orderBy: { createdAt: "desc" },
          take: 20,
          include: { conversations: { take: 1, orderBy: { createdAt: "desc" } } },
        })
      : Promise.resolve([]),
    prisma.lead.count(),
  ]);

  // Tab counts
  const [formCount, chatbotCount, waCount, tgCount, followUpCount, convertedCount] =
    await Promise.all([
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      prisma.lead.count({ where: { source: "FORM" } as any }),
      prisma.chatbotContact.count(),
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      prisma.lead.count({ where: { source: "WHATSAPP" } as any }),
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      prisma.lead.count({ where: { source: "TELEGRAM" } as any }),
      prisma.lead.count({ where: { nextFollowUpAt: { lte: new Date() } } }),
      prisma.lead.count({ where: { status: "CONVERTED" } }),
    ]);

  const tabsWithCounts = TABS.map((t) => ({
    ...t,
    count:
      t.value === "all"        ? allLeadCount
      : t.value === "form"      ? formCount
      : t.value === "ai_chatbot"? chatbotCount
      : t.value === "whatsapp"  ? waCount
      : t.value === "telegram"  ? tgCount
      : t.value === "follow_ups"? followUpCount
      : convertedCount,
  }));

  return (
    <SPTAdminShell title="Leads & Conversations" role={session.role}>
      {/* ── Tab bar ── */}
      <div className="mb-5 flex gap-0.5 overflow-x-auto rounded-xl border border-slate-200 bg-slate-100 p-1">
        {tabsWithCounts.map((t) => {
          const isActive = tab === t.value;
          return (
            <Link
              key={t.value}
              href={`/spt/admin/leads?tab=${t.value}`}
              className={`flex shrink-0 items-center gap-1.5 rounded-lg px-3 py-2 text-xs font-semibold whitespace-nowrap transition-all ${
                isActive
                  ? "bg-white text-navy-950 shadow-sm"
                  : "text-slate-500 hover:text-slate-700"
              }`}
            >
              {t.label}
              <span className={`rounded-full px-1.5 py-0.5 text-[10px] font-bold tabular-nums ${
                isActive ? "bg-navy-950 text-white" : "bg-slate-200 text-slate-600"
              }`}>
                {t.count}
              </span>
            </Link>
          );
        })}
      </div>

      {/* ── Filters ── */}
      <form method="GET" className="mb-5 grid gap-2 sm:grid-cols-2 lg:grid-cols-5">
        <input type="hidden" name="tab" value={tab} />
        <input
          name="q"
          defaultValue={q}
          placeholder="Search name, email, phone…"
          className="col-span-2 rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm shadow-sm focus:border-navy-950 focus:outline-none"
        />
        <select
          name="status"
          defaultValue={status ?? ""}
          className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm shadow-sm"
        >
          <option value="">All statuses</option>
          {leadStatuses.map((s) => (
            <option key={s} value={s}>{readableEnum(s)}</option>
          ))}
        </select>
        <input
          name="service"
          defaultValue={service}
          placeholder="Service interest"
          className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm shadow-sm"
        />
        <button className="rounded-xl bg-navy-950 px-4 py-2 text-sm font-bold text-white hover:bg-navy-900">
          Filter
        </button>
      </form>

      {/* ── AI Chatbot contacts surface ── */}
      {(tab === "ai_chatbot" || tab === "all") && chatbotContacts.length > 0 && (
        <AdminCard className="mb-6">
          <AdminCardHeader
            title="AI Chatbot Contacts"
            subtitle="Prospects who interacted with the website AI agent"
            action={
              <Link
                href="/spt/admin/chatbot-conversations"
                className="text-xs font-semibold text-profit-600 hover:underline"
              >
                View all conversations →
              </Link>
            }
          />
          <AdminCardBody className="p-0">
            <div className="divide-y divide-slate-100">
              {chatbotContacts.map((contact) => (
                <div key={contact.id} className="flex items-center gap-4 px-5 py-3.5">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-violet-100 text-violet-700">
                    <MessageSquare size={14} />
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-semibold text-navy-950">
                      {contact.fullName ?? "Unknown"}
                    </p>
                    <p className="text-xs text-slate-500">
                      {contact.email ?? contact.phoneWhatsapp ?? "No contact info"}
                    </p>
                  </div>
                  <SourceBadge source="AI_CHATBOT" />
                  <StatusBadge value={readableEnum(contact.leadStatus)} />
                  {contact.conversations[0] && (
                    <Link
                      href={`/spt/admin/chatbot-conversations/${contact.conversations[0].id}`}
                      className="shrink-0 rounded-lg bg-slate-100 px-2 py-1 text-xs font-semibold text-navy-950 hover:bg-slate-200"
                    >
                      View chat
                    </Link>
                  )}
                  <DeleteButton id={contact.id} onDelete={deleteChatbotContact} label="contact" />
                </div>
              ))}
            </div>
          </AdminCardBody>
        </AdminCard>
      )}

      {/* ── Leads table ── */}
      <AdminCard>
        <AdminCardHeader
          title={tab === "all" ? "All Leads" : (tabsWithCounts.find(t => t.value === tab)?.label ?? "Leads")}
          subtitle="Manage prospects, update status, add notes, and convert to customers."
          action={<AddLeadButton onAdd={createLead} />}
        />
        <AdminCardBody className="p-0">
          {leads.length === 0 ? (
            <div className="flex flex-col items-center gap-3 px-6 py-14 text-center">
              <span className="flex h-12 w-12 items-center justify-center rounded-full bg-slate-100 text-slate-400">
                <User size={22} />
              </span>
              <div>
                <p className="font-semibold text-navy-950">No leads yet</p>
                <p className="mt-1 max-w-sm text-sm text-slate-500">
                  When prospects interact with your AI Agent, WhatsApp, Telegram, or website forms, their records will appear here.
                </p>
              </div>
              <AddLeadButton onAdd={createLead} />
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-slate-100 text-sm">
                <thead className="bg-slate-50">
                  <tr>
                    {["Lead", "Contact", "Service", "Source", "Status", "Follow-up", "Actions"].map((col) => (
                      <th key={col} className="whitespace-nowrap px-4 py-3 text-left text-[11px] font-semibold uppercase tracking-wide text-slate-500">
                        {col}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50 bg-white">
                  {leads.map((lead) => (
                    <tr key={lead.id} className="group hover:bg-slate-50/70">
                      <td className="px-4 py-3.5">
                        <div>
                          <p className="font-semibold text-navy-950">{lead.fullName}</p>
                          {lead.country && (
                            <p className="text-xs text-slate-400">{lead.country}</p>
                          )}
                        </div>
                      </td>
                      <td className="px-4 py-3.5">
                        <div className="flex flex-col gap-0.5">
                          <a href={`mailto:${lead.email}`} className="flex items-center gap-1 text-xs text-slate-600 hover:text-navy-950">
                            <Mail size={11} /> {lead.email}
                          </a>
                          {lead.phone && (
                            <a href={`https://wa.me/${lead.whatsapp ?? lead.phone}`} target="_blank" rel="noreferrer" className="flex items-center gap-1 text-xs text-slate-600 hover:text-emerald-600">
                              <Phone size={11} /> {lead.phone}
                            </a>
                          )}
                        </div>
                      </td>
                      <td className="px-4 py-3.5">
                        <span className="text-xs text-slate-700">{lead.serviceInterest}</span>
                      </td>
                      <td className="px-4 py-3.5">
                        <SourceBadge source={((lead as any).source ?? lead.leadSource ?? "MANUAL")} />
                      </td>
                      <td className="px-4 py-3.5">
                        <StatusBadge value={readableEnum(lead.status)} />
                      </td>
                      <td className="px-4 py-3.5">
                        <div className="flex items-center gap-1 text-xs text-slate-500">
                          <Calendar size={11} />
                          {lead.nextFollowUpAt
                            ? lead.nextFollowUpAt.toLocaleDateString()
                            : "Not set"}
                        </div>
                      </td>
                      <td className="px-4 py-3.5">
                        <div className="flex items-center gap-2">
                          <Link
                            href={`/spt/admin/leads/${lead.id}`}
                            className="inline-flex items-center gap-1 rounded-lg bg-slate-100 px-2.5 py-1 text-xs font-semibold text-navy-950 hover:bg-slate-200"
                          >
                            View <ArrowRight size={11} />
                          </Link>
                          <DeleteButton id={lead.id} onDelete={deleteLead} label="lead" />
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </AdminCardBody>
      </AdminCard>

      {/* ── Inline edit cards ── */}
      {leads.length > 0 && (
        <div className="mt-6 grid gap-4 lg:grid-cols-2">
          {leads.slice(0, 6).map((lead) => (
            <AdminCard key={lead.id}>
              <AdminCardHeader
                title={lead.fullName}
                subtitle={`${lead.email} · ${lead.serviceInterest}`}
                action={<SourceBadge source={((lead as any).source ?? lead.leadSource ?? "MANUAL")} />}
              />
              <AdminCardBody>
                <form action={updateLead} className="grid gap-2.5">
                  <input type="hidden" name="id" value={lead.id} />
                  <div className="grid gap-2 sm:grid-cols-2">
                    <select
                      name="status"
                      defaultValue={lead.status}
                      className="rounded-xl border border-slate-200 px-3 py-2 text-sm focus:border-navy-950 focus:outline-none"
                    >
                      {leadStatuses.map((s) => (
                        <option key={s} value={s}>{readableEnum(s)}</option>
                      ))}
                    </select>
                    <input
                      type="date"
                      name="nextFollowUpAt"
                      defaultValue={lead.nextFollowUpAt ? lead.nextFollowUpAt.toISOString().slice(0, 10) : ""}
                      className="rounded-xl border border-slate-200 px-3 py-2 text-sm focus:border-navy-950 focus:outline-none"
                    />
                  </div>
                  <textarea
                    name="notes"
                    defaultValue={lead.notes ?? ""}
                    rows={2}
                    placeholder="Add notes…"
                    className="rounded-xl border border-slate-200 px-3 py-2 text-sm focus:border-navy-950 focus:outline-none"
                  />
                  <button className="w-full rounded-xl bg-navy-950 py-2 text-sm font-bold text-white hover:bg-navy-900">
                    Update
                  </button>
                </form>
                <form action={convertLead} className="mt-2">
                  <input type="hidden" name="id" value={lead.id} />
                  <button
                    type="submit"
                    className="w-full rounded-xl bg-profit-500 px-4 py-2 text-sm font-bold text-navy-950 hover:bg-profit-400"
                  >
                    Convert to Customer →
                  </button>
                </form>
              </AdminCardBody>
            </AdminCard>
          ))}
        </div>
      )}
    </SPTAdminShell>
  );
}
