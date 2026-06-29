/**
 * POST /api/vip/subscribe
 *
 * Paystack flow:  creates PENDING record → returns Paystack authorization_url
 * Crypto flow:    creates PENDING_CRYPTO record → returns pending confirmation
 */

import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

const PAYSTACK_SECRET = process.env.PAYSTACK_SECRET_KEY ?? "";
const SITE_URL = "https://www.smartprofitstrader.com";
// NGN equivalent of $50 at ~₦1,600/$1
const NGN_AMOUNT_KOBO = 8000000; // ₦80,000 in kobo

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { name, email, phone, paymentMethod, cryptoTxHash, cryptoNetwork } = body;

  if (!name || !email || !phone || !paymentMethod) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }

  // --- CRYPTO ---
  if (paymentMethod === "CRYPTO") {
    if (!cryptoTxHash || !cryptoNetwork) {
      return NextResponse.json({ error: "Transaction hash and network are required" }, { status: 400 });
    }

    const sub = await prisma.vipSubscription.create({
      data: {
        name,
        email,
        phone,
        paymentMethod: "CRYPTO",
        cryptoTxHash,
        amountUSD: 50,
        status: "PENDING_CRYPTO",
      },
    });

    return NextResponse.json({ success: true, method: "CRYPTO", subscriptionId: sub.id });
  }

  // --- PAYSTACK ---
  if (paymentMethod === "PAYSTACK") {
    // Check for existing pending subscription to avoid duplicates
    const existing = await prisma.vipSubscription.findFirst({
      where: { email, status: "PENDING", paymentMethod: "PAYSTACK" },
    });

    const reference = existing?.paystackRef ?? `spt-vip-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;

    const psRes = await fetch("https://api.paystack.co/transaction/initialize", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${PAYSTACK_SECRET}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        amount: NGN_AMOUNT_KOBO,
        currency: "NGN",
        reference,
        callback_url: `${SITE_URL}/api/vip/paystack-callback`,
        metadata: { name, phone, custom_fields: [{ display_name: "Name", variable_name: "name", value: name }, { display_name: "Phone", variable_name: "phone", value: phone }] },
      }),
    });

    const psData = await psRes.json();

    if (!psData.status) {
      console.error("[VIP] Paystack init failed:", psData);
      return NextResponse.json({ error: "Payment gateway error. Try again." }, { status: 500 });
    }

    // Upsert subscription record
    if (existing) {
      await prisma.vipSubscription.update({
        where: { id: existing.id },
        data: { name, phone },
      });
    } else {
      await prisma.vipSubscription.create({
        data: { name, email, phone, paymentMethod: "PAYSTACK", paystackRef: reference, amountUSD: 50, status: "PENDING" },
      });
    }

    return NextResponse.json({ success: true, method: "PAYSTACK", authorizationUrl: psData.data.authorization_url });
  }

  return NextResponse.json({ error: "Invalid payment method" }, { status: 400 });
}
