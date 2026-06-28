import { NextRequest, NextResponse } from "next/server";
import { processDripQueue } from "@/lib/drip-engine";

export const maxDuration = 60;

export async function GET(request: NextRequest) {
  // Verify the request is from Vercel Cron
  const authHeader = request.headers.get("authorization");
  const cronSecret = process.env.CRON_SECRET;

  if (cronSecret && authHeader !== `Bearer ${cronSecret}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const result = await processDripQueue();
    return NextResponse.json({ ok: true, ...result });
  } catch (error) {
    console.error("Drip cron failed:", error);
    return NextResponse.json({ error: "Cron job failed" }, { status: 500 });
  }
}
