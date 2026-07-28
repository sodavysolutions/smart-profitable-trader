/**
 * GET /api/spt/admin/cleanup-dirty-contacts
 *
 * ONE-TIME cleanup: removes the leading "=" from phoneWhatsapp fields
 * that were stored before cleanField() was added to the chatbot contact API.
 *
 * If a clean duplicate already exists, conversations are re-pointed to the
 * clean record and the dirty duplicate is deleted.
 *
 * DELETE THIS FILE after running it once.
 */

import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/spt-admin-auth";

export async function GET() {
  try {
    await requireAdmin();
  } catch {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const dirty = await prisma.chatbotContact.findMany({
    where: { phoneWhatsapp: { startsWith: "=" } },
    include: { conversations: true },
  });

  if (dirty.length === 0) {
    return NextResponse.json({ message: "No dirty records found — nothing to do." });
  }

  const log: string[] = [];

  for (const contact of dirty) {
    const cleanPhone = contact.phoneWhatsapp!.replace(/^=+/, "").trim();

    // Check if a clean version already exists
    const existing = await prisma.chatbotContact.findFirst({
      where: { phoneWhatsapp: cleanPhone },
    });

    if (existing) {
      // Re-point all conversations from dirty → clean contact
      if (contact.conversations.length > 0) {
        await prisma.chatbotConversation.updateMany({
          where: { contactId: contact.id },
          data: { contactId: existing.id },
        });
        log.push(`Merged ${contact.conversations.length} conversation(s) from dirty "${contact.fullName}" (${contact.phoneWhatsapp}) → clean "${existing.fullName}" (${cleanPhone})`);
      }
      // Delete the dirty duplicate
      await prisma.chatbotContact.delete({ where: { id: contact.id } });
      log.push(`Deleted dirty contact: ${contact.id} (${contact.phoneWhatsapp})`);
    } else {
      // No clean duplicate — just strip the = from the phone field
      await prisma.chatbotContact.update({
        where: { id: contact.id },
        data: {
          phoneWhatsapp: cleanPhone,
          fullName: contact.fullName?.replace(/^=+/, "").trim() ?? contact.fullName,
        },
      });
      log.push(`Fixed: "${contact.fullName}" ${contact.phoneWhatsapp} → ${cleanPhone}`);
    }
  }

  return NextResponse.json({ fixed: dirty.length, log });
}
