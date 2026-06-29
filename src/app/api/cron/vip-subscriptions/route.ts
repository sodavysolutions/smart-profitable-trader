/**
 * POST /api/cron/vip-subscriptions
 * Run daily via cron-job.org to send reminder emails and remove expired members.
 */

import { NextRequest, NextResponse } from "next/server";
import { processVipSubscriptions } from "@/lib/vip-engine";

const CRON_SECRET = process.env.CRON_SECRET ?? "";

export async function POST(req: NextRequest) {
  const auth = req.headers.get("authorization");
  if (CRON_SECRET && auth !== `Bearer ${CRON_SECRET}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const result = await processVipSubscriptions();
  return NextResponse.json({ ok: true, ...result });
}

export async function GET(req: NextRequest) {
  return POST(req);
}
