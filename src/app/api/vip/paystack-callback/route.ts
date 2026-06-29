/**
 * GET /api/vip/paystack-callback
 * Paystack redirects here after payment. We verify then activate the subscription.
 */

import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { activateVipSubscription } from "@/lib/vip-engine";

const PAYSTACK_SECRET = process.env.PAYSTACK_SECRET_KEY ?? "";
const SITE_URL = "https://www.smartprofitstrader.com";

export async function GET(req: NextRequest) {
  const reference = req.nextUrl.searchParams.get("reference") ?? req.nextUrl.searchParams.get("trxref");

  if (!reference) {
    return NextResponse.redirect(`${SITE_URL}/spt/vip?error=no_reference`);
  }

  // Verify with Paystack
  const psRes = await fetch(`https://api.paystack.co/transaction/verify/${reference}`, {
    headers: { Authorization: `Bearer ${PAYSTACK_SECRET}` },
  });
  const psData = await psRes.json();

  if (!psData.status || psData.data?.status !== "success") {
    return NextResponse.redirect(`${SITE_URL}/spt/vip?error=payment_failed`);
  }

  // Find subscription record
  const sub = await prisma.vipSubscription.findFirst({
    where: { paystackRef: reference },
  });

  if (!sub) {
    return NextResponse.redirect(`${SITE_URL}/spt/vip?error=not_found`);
  }

  if (sub.status !== "ACTIVE") {
    await activateVipSubscription(sub.id);
  }

  return NextResponse.redirect(`${SITE_URL}/spt/vip/success?ref=${reference}`);
}
