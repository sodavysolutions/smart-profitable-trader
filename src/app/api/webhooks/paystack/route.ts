/**
 * POST /api/webhooks/paystack
 * Paystack sends charge.success events here as a backup confirmation.
 * Add this URL in your Paystack dashboard → Settings → API Keys & Webhooks.
 */

import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import { prisma } from "@/lib/prisma";
import { activateVipSubscription } from "@/lib/vip-engine";

const PAYSTACK_SECRET = process.env.PAYSTACK_SECRET_KEY ?? "";

export async function POST(req: NextRequest) {
  const rawBody = await req.text();
  const signature = req.headers.get("x-paystack-signature") ?? "";

  // Verify the webhook came from Paystack
  const hash = crypto.createHmac("sha512", PAYSTACK_SECRET).update(rawBody).digest("hex");
  if (hash !== signature) {
    return NextResponse.json({ error: "Invalid signature" }, { status: 401 });
  }

  const event = JSON.parse(rawBody);

  if (event.event === "charge.success") {
    const reference = event.data?.reference as string;
    if (!reference) return NextResponse.json({ ok: true });

    const sub = await prisma.vipSubscription.findFirst({ where: { paystackRef: reference } });
    if (sub && sub.status !== "ACTIVE") {
      await activateVipSubscription(sub.id);
    }
  }

  return NextResponse.json({ ok: true });
}
