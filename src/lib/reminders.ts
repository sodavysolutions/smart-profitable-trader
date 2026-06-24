import { differenceInCalendarDays } from "date-fns";
import { prisma } from "@/lib/prisma";
import { sendBirthdayMessagesForDate, sendRenewalReminder, sendSpecialEventMessagesForDate } from "@/lib/message-workflows";

type Renewal = {
  id: string;
};

export async function checkRenewalsDaily(renewalIds?: Renewal[]) {
  const today = new Date();
  const renewals = await prisma.subscription.findMany({
    where: renewalIds?.length ? { id: { in: renewalIds.map((item) => item.id) } } : { reminderEnabled: true },
    include: {
      customer: {
        select: {
          id: true,
          fullName: true,
          whatsapp: true,
          phone: true
        }
      },
      expense: {
        select: {
          name: true,
          vendor: true
        }
      }
    }
  });

  const due = renewals
    .filter((renewal) => renewal.renewalDate)
    .map((renewal) => ({ ...renewal, daysUntilRenewal: differenceInCalendarDays(renewal.renewalDate!, today) }))
    .filter((renewal) => [7, 3, 0].includes(renewal.daysUntilRenewal) || renewal.daysUntilRenewal < 0);

  return Promise.all(
    due.map(async (renewal) => ({
      renewal,
      notifications: await sendRenewalReminder(renewal)
    }))
  );
}

export async function checkCelebrationsDaily(date = new Date()) {
  const [birthdays, specialEvents] = await Promise.all([
    sendBirthdayMessagesForDate(date),
    sendSpecialEventMessagesForDate(date)
  ]);

  return {
    birthdays,
    specialEvents
  };
}
