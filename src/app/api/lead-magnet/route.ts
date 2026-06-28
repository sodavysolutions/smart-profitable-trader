import { NextResponse } from "next/server";
import { z } from "zod";
import { DripCategory } from "@prisma/client";
import { enrollDripSubscriber } from "@/lib/drip-engine";
import { isDisposableEmail } from "@/lib/email-guard";

const schema = z.object({
  fullName: z.string().trim().min(2, "Enter your name."),
  email: z
    .string()
    .trim()
    .email("Enter a valid email address.")
    .refine((v) => !isDisposableEmail(v), "Please use a real email address."),
  phone: z.string().trim().max(30).optional().or(z.literal("")),
  category: z.nativeEnum(DripCategory),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = schema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Invalid details", issues: parsed.error.flatten() },
        { status: 400 }
      );
    }

    const { fullName, email, phone, category } = parsed.data;

    await enrollDripSubscriber({ fullName, email, phone: phone || undefined, category });

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Lead magnet opt-in failed:", error);
    return NextResponse.json(
      { error: "Could not process your request. Please try again." },
      { status: 500 }
    );
  }
}
