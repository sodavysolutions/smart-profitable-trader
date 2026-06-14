import { NextResponse } from "next/server";
import { applicationSchema } from "@/lib/validation";

const submissions: Array<Record<string, unknown>> = [];

export async function POST(request: Request) {
  const body = await request.json();
  const parsed = applicationSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid application details", issues: parsed.error.flatten() }, { status: 400 });
  }

  const url = new URL(request.url);
  const record = {
    id: `FORM-${Date.now()}`,
    ...parsed.data,
    utmSource: url.searchParams.get("utm_source"),
    utmCampaign: url.searchParams.get("utm_campaign"),
    status: "New Lead",
    createdAt: new Date().toISOString()
  };

  submissions.push(record);

  return NextResponse.json({
    ok: true,
    message: "Application saved as a lead",
    record
  });
}

export async function GET() {
  return NextResponse.json({ submissions });
}
