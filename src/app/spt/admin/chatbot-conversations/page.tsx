import { SPTAdminShell } from "@/components/spt/admin-shell";
import { Card, DataTable, EmptyState, InlineNotice, SectionHeader, StatusBadge } from "@/components/UI";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/spt-admin-auth";
import { getSchemaMismatchMessage, isSchemaMismatchError } from "@/lib/spt-admin-schema";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default async function ChatbotConversationsPage({
  searchParams,
}: {
  searchParams: Promise<{ channel?: string; status?: string; interest?: string }>;
}) {
  const session = await requireAdmin();
  const { channel, status, interest } = await searchParams;
  let conversations: any[] = [];
  let schemaNotice: string | null = null;

  try {
    conversations = await prisma.chatbotConversation.findMany({
      where: {
        ...(channel ? { channel: channel as any } : {}),
        ...(status ? { status: status as any } : {}),
        ...(interest ? { serviceInterest: interest as any } : {}),
      },
      include: {
        contact: true,
        messages: { orderBy: { createdAt: "desc" }, take: 1 },
      },
      orderBy: { updatedAt: "desc" },
    });
  } catch (error) {
    if (isSchemaMismatchError(error)) {
      schemaNotice = getSchemaMismatchMessage("Conversations");
    } else {
      const msg = error instanceof Error ? error.message : String(error);
      schemaNotice = `Could not load conversations: ${msg}`;
    }
  }

  const channelOptions = ["WEBSITE_CHAT", "WHATSAPP", "TELEGRAM", "OTHER"];
  const statusOptions = [
    "OPEN",
    "WAITING_FOR_USER",
    "WAITING_FOR_ADMIN",
    "CLOSED",
    "CONVERTED",
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
    <SPTAdminShell title="Conversations" role={session.role}>
      {schemaNotice && (
        <div className="mb-6">
          <InlineNotice title="Conversations still loading" text={schemaNotice} />
        </div>
      )}
      <Card className="mb-6">
        <SectionHeader title="Filters" />
        <form method="get" className="flex flex-wrap gap-3">
          <select
            name="channel"
            defaultValue={channel ?? ""}
            className="rounded-md border border-slate-200 px-3 py-2 text-sm"
          >
            <option value="">All channels</option>
            {channelOptions.map((c) => (
              <option key={c} value={c}>
                {c.replaceAll("_", " ")}
              </option>
            ))}
          </select>
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
            href="/spt/admin/chatbot-conversations"
            className="rounded-md border border-slate-200 px-4 py-2 text-sm font-medium text-slate-600"
          >
            Clear
          </Link>
        </form>
      </Card>
      <Card>
        <SectionHeader
          title="Conversations"
          text={`${conversations.length} conversation${conversations.length !== 1 ? "s" : ""}`}
        />
        {conversations.length ? (
          <DataTable
            columns={[
              "Contact",
              "Channel",
              "Service Interest",
              "Last Message",
              "Status",
              "Created",
              "View",
            ]}
            rows={conversations.map((conv: any) => [
              conv.contact?.fullName ??
                conv.contact?.phoneWhatsapp ??
                "Anonymous",
              conv.channel.replaceAll("_", " "),
              conv.serviceInterest?.replaceAll("_", " ") ?? "—",
              conv.messages[0]?.message
                ? conv.messages[0].message.length > 80
                  ? conv.messages[0].message.slice(0, 80) + "..."
                  : conv.messages[0].message
                : "No messages",
              <StatusBadge
                key={conv.id + "-status"}
                value={conv.status.replaceAll("_", " ")}
              />,
              new Date(conv.createdAt).toLocaleDateString(),
              <Link
                key={conv.id + "-link"}
                href={`/spt/admin/chatbot-conversations/${conv.id}`}
                className="text-profit-600 font-semibold text-sm hover:underline"
              >
                View
              </Link>,
            ])}
          />
        ) : (
          <EmptyState
            title={schemaNotice ? "Still loading" : "No conversations yet"}
            text={
              schemaNotice ??
              "Conversations will appear here as visitors chat with the AI agent."
            }
          />
        )}
      </Card>
    </SPTAdminShell>
  );
}
