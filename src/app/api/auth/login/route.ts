import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const { email, password } = await request.json();
  const adminEmail = process.env.ADMIN_EMAIL ?? "admin@smartprofitabletrader.com";
  const adminPassword = process.env.ADMIN_PASSWORD ?? "ChangeMe123!";
  const hash = await bcrypt.hash(adminPassword, 10);
  const valid = email === adminEmail && (await bcrypt.compare(password, hash));

  if (!valid) {
    return NextResponse.json({ error: "Invalid login" }, { status: 401 });
  }

  return NextResponse.json({
    ok: true,
    user: {
      email,
      role: "SUPER_ADMIN"
    }
  });
}
