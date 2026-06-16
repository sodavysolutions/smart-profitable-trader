import { NextResponse } from "next/server";
import { z } from "zod";
import { authenticateAdmin, createAdminToken, ensureBootstrapAdmin, setAdminSession } from "@/lib/spt-admin-auth";

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6)
});

export async function POST(request: Request) {
  const body = await request.json();
  const parsed = loginSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ error: "Enter a valid email and password." }, { status: 400 });
  }

  await ensureBootstrapAdmin(parsed.data.email);

  const user = await authenticateAdmin(parsed.data.email, parsed.data.password);
  if (!user) {
    return NextResponse.json({ error: "Invalid admin login." }, { status: 401 });
  }

  const token = createAdminToken({
    userId: user.id,
    email: user.email,
    role: user.role
  });
  await setAdminSession(token);

  return NextResponse.json({ ok: true });
}
