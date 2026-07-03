import { SPTAdminShell } from "@/components/spt/admin-shell";
import { Card, SectionHeader, StatusBadge } from "@/components/UI";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/spt-admin-auth";
import { revalidatePath } from "next/cache";
import { notFound } from "next/navigation";

export const dynamic = "force-dynamic";

async function convertContactToLead(formData: FormData) {
  "use server";
  await requireAdmin();
  const contactId = String(formData.get("contactId"));
  const convId = String(formData.get("convId"));
  const contact = await prisma.chatbotContact.findUnique({ where: { id: contactId } });
  if (!contact) return;
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
  revalidatePath(`/spt/admin/chatbot-conversations/${convId}`);
}

export default async function ConversationDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const session = await requireAdmin();
  const { id } = await params;

  const conversation = await prisma.chatbotConversation
    .findUnique({
      where: { id },
      include: {
        contact: true,
        messages: { orderBy: { createdAt: "asc" } },
      },
    })
    .catch(() => null);

  if (!conversation) notFound();

  return (
    <SPTAdminShell title="Conversation Detail" role={session.role}>
      <div className="grid gap-6 xl:grid-cols-3">
        {/* Main: message thread */}
        <div className="xl:col-span-2">
          <Card>
            <SectionHeader
              title="Conversation"
              text={`${conversation.channel.replaceAll("_", " ")} · ${new Date(
                conversation.createdAt
              ).toLocaleString()}`}
            />

            {conversation.summary && (
              <div className="mb-4 rounded-md border border-slate-200 bg-slate-50 p-4 text-sm text-slate-700">
                <p className="font-semibold text-slate-900 mb-1">AI Summary</p>
                <p>{conversation.summary}</p>
              </div>
            )}

            <div className="space-y-3">
              {conversation.messages.length === 0 && (
                <p className="text-sm text-slate-500 text-center py-8">No messages yet</p>
              )}
              {conversation.messages.map((msg: any) => (
                <div
                  key={msg.id}
                  className={`flex ${
                    msg.senderType === "USER" ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`max-w-[75%] rounded-2xl px-4 py-2.5 text-sm ${
                      msg.senderType === "USER"
                        ? "bg-navy-950 text-white rounded-tr-sm"
                        : msg.senderType === "AI_AGENT"
                        ? "bg-slate-100 text-slate-900 rounded-tl-sm"
                        : "bg-amber-50 text-amber-900 rounded-tl-sm border border-amber-200"
                    }`}
                  >
                    <p className="text-xs font-semibold mb-1 opacity-60">
                      {msg.senderType.replaceAll("_", " ")}
                    </p>
                    <p className="whitespace-pre-wrap">{msg.message}</p>
                    <p className="text-xs mt-1 opacity-50">
                      {new Date(msg.createdAt).toLocaleTimeString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Sidebar: contact + conversation info */}
        <div>
          <Card className="mb-4">
            <SectionHeader title="Contact Details" />
            <dl className="space-y-2 text-sm">
              <div>
                <dt className="font-medium text-slate-500">Name</dt>
                <dd className="text-slate-900">{conversation.contact?.fullName ?? "—"}</dd>
              </div>
              <div>
                <dt className="font-medium text-slate-500">Phone / WhatsApp</dt>
                <dd className="text-slate-900">
                  {conversation.contact?.phoneWhatsapp ?? "—"}
                </dd>
              </div>
              <div>
                <dt className="font-medium text-slate-500">Email</dt>
                <dd className="text-slate-900">{conversation.contact?.email ?? "—"}</dd>
              </div>
              <div>
                <dt className="font-medium text-slate-500">Service Interest</dt>
                <dd className="text-slate-900">
                  {conversation.contact?.serviceInterest?.replaceAll("_", " ") ?? "—"}
                </dd>
              </div>
              <div>
                <dt className="font-medium text-slate-500">Lead Status</dt>
                <dd>
                  <StatusBadge
                    value={
                      conversation.contact?.leadStatus?.replaceAll("_", " ") ?? "—"
                    }
                  />
                </dd>
              </div>
              <div>
                <dt className="font-medium text-slate-500">Source Page</dt>
                <dd className="text-slate-900">
                  {conversation.contact?.sourcePage ?? "—"}
                </dd>
              </div>
            </dl>

            {conversation.contact && conversation.contact.leadStatus !== "CONVERTED" && (
              <form action={convertContactToLead} className="mt-4">
                <input type="hidden" name="contactId" value={conversation.contact.id} />
                <input type="hidden" name="convId" value={conversation.id} />
                <button className="w-full rounded-md bg-profit-500 px-4 py-2 text-sm font-bold text-navy-950">
                  Convert to Lead
                </button>
              </form>
            )}
          </Card>

          <Card>
            <SectionHeader title="Conversation Info" />
            <dl className="space-y-2 text-sm">
              <div>
                <dt className="font-medium text-slate-500">Channel</dt>
                <dd>{conversation.channel.replaceAll("_", " ")}</dd>
              </div>
              <div>
                <dt className="font-medium text-slate-500">Status</dt>
                <dd>
                  <StatusBadge value={conversation.status.replaceAll("_", " ")} />
                </dd>
              </div>
              <div>
                <dt className="font-medium text-slate-500">Messages</dt>
                <dd>{conversation.messages.length}</dd>
              </div>
              <div>
                <dt className="font-medium text-slate-500">Started</dt>
                <dd>{new Date(conversation.createdAt).toLocaleString()}</dd>
              </div>
              <div>
                <dt className="font-medium text-slate-500">Last Updated</dt>
                <dd>{new Date(conversation.updatedAt).toLocaleString()}</dd>
              </div>
            </dl>
          </Card>
        </div>
      </div>
    </SPTAdminShell>
  );
}
