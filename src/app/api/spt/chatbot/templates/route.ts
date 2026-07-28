/**
 * GET  /api/spt/chatbot/templates  — list approved WhatsApp message templates
 * POST /api/spt/chatbot/templates  — create (submit) a new template to Meta
 */

import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/lib/spt-admin-auth";

export const runtime = "nodejs";

const WABA_ID = process.env.WHATSAPP_WABA_ID ?? "1350508817043002";
const API = "https://graph.facebook.com/v20.0";

// ── Default templates we submit on first setup ──────────────────────────────

export const DEFAULT_TEMPLATES = [
  {
    name: "spt_check_in",
    category: "MARKETING",
    language: "en_US",
    components: [
      {
        type: "BODY",
        text: "Hey {{1}}, just checking in from Smart Profits Trader! 😊\n\nI hope everything is going well on your end. Feel free to reply if you have any questions about your trading setup, the algo, or anything else — I am right here!\n\n— Smart Profits Trader Team",
      },
    ],
  },
  {
    name: "spt_update",
    category: "MARKETING",
    language: "en_US",
    components: [
      {
        type: "BODY",
        text: "Hi {{1}}, we have an update from Smart Profits Trader! 🚀\n\nPlease reply to this message or visit our website for more details. Our team is available 24/7 on WhatsApp and Telegram.\n\n— Smart Profits Trader Team",
      },
    ],
  },
  {
    name: "spt_welcome_back",
    category: "MARKETING",
    language: "en_US",
    components: [
      {
        type: "BODY",
        text: "Welcome back, {{1}}! 👋\n\nWe have missed you at Smart Profits Trader. If you are ready to get back on track with your trading journey, just reply to this message and we will pick up right where we left off.\n\n— Smart Profits Trader Team",
      },
    ],
  },
] as const;

// ── GET — list approved templates ────────────────────────────────────────────

export async function GET() {
  try {
    await requireAdmin();
  } catch {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const token = process.env.WHATSAPP_API_TOKEN;
  if (!token) return NextResponse.json({ error: "WHATSAPP_API_TOKEN not set" }, { status: 500 });

  const res = await fetch(
    `${API}/${WABA_ID}/message_templates?fields=id,name,status,category,language,components&limit=100`,
    { headers: { Authorization: `Bearer ${token}` } }
  );

  const data = await res.json();
  if (!res.ok) return NextResponse.json({ error: data }, { status: res.status });

  // Return all templates (not just APPROVED) so UI can show pending status too
  const templates = (data.data ?? []).map((t: {
    id: string;
    name: string;
    status: string;
    category: string;
    language: string;
    components?: { type: string; text?: string }[];
  }) => ({
    id: t.id,
    name: t.name,
    status: t.status,
    category: t.category,
    language: t.language,
    bodyText: t.components?.find((c) => c.type === "BODY")?.text ?? "",
  }));

  return NextResponse.json({ templates });
}

// ── POST — create / submit a template ────────────────────────────────────────

export async function POST(req: NextRequest) {
  try {
    await requireAdmin();
  } catch {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const token = process.env.WHATSAPP_API_TOKEN;
  if (!token) return NextResponse.json({ error: "WHATSAPP_API_TOKEN not set" }, { status: 500 });

  const body = await req.json();

  // If { setupDefaults: true } — submit all default templates
  if (body.setupDefaults) {
    const results = [];
    for (const tpl of DEFAULT_TEMPLATES) {
      const r = await fetch(`${API}/${WABA_ID}/message_templates`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
        body: JSON.stringify(tpl),
      });
      const d = await r.json();
      results.push({ name: tpl.name, ok: r.ok, response: d });
    }
    return NextResponse.json({ results });
  }

  // Otherwise pass the body directly to Meta
  const res = await fetch(`${API}/${WABA_ID}/message_templates`, {
    method: "POST",
    headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  const data = await res.json();
  return NextResponse.json(data, { status: res.ok ? 200 : res.status });
}
