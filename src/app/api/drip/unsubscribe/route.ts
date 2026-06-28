import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: NextRequest) {
  const token = request.nextUrl.searchParams.get("token");

  if (!token) {
    return new NextResponse("Invalid unsubscribe link.", { status: 400 });
  }

  try {
    await prisma.dripSubscriber.update({
      where: { unsubscribeToken: token },
      data: { unsubscribed: true },
    });

    return new NextResponse(
      `<!doctype html><html><head><meta charset="utf-8"><title>Unsubscribed</title>
      <style>body{font-family:sans-serif;display:flex;align-items:center;justify-content:center;min-height:100vh;margin:0;background:#f8fafc;}
      .box{text-align:center;padding:2rem;max-width:420px;}
      h1{color:#071F3D;font-size:1.5rem;}p{color:#475569;}</style></head>
      <body><div class="box">
      <h1>You've been unsubscribed</h1>
      <p>You won't receive any more emails from Smart Profits Trader's blueprint series.</p>
      <p><a href="https://www.smartprofitstrader.com" style="color:#16A34A;">Visit our website</a></p>
      </div></body></html>`,
      { headers: { "Content-Type": "text/html" } }
    );
  } catch {
    return new NextResponse("Unsubscribe link not found or already used.", { status: 404 });
  }
}
