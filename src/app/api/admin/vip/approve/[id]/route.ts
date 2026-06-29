/**
 * POST /api/admin/vip/approve/[id]
 * Admin approves a pending crypto subscription, activating it.
 */

import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { activateVipSubscription } from "@/lib/vip-engine";

export async function POST(_req: NextRequest, { params }: { params: { id: string } }) {
  const sub = await prisma.vipSubscription.findUnique({ where: { id: params.id } });

  if (!sub) return NextResponse.json({ error: "Not found" }, { status: 404 });
  if (sub.status === "ACTIVE") return NextResponse.json({ error: "Already active" }, { status: 400 });

  await activateVipSubscription(params.id);

  return NextResponse.json({ ok: true });
}
