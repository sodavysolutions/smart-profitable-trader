import { differenceInCalendarDays } from "date-fns";
import { sendSmsMessage, sendWhatsAppMessage } from "@/lib/integrations";

type Renewal = {
  name: string;
  related: string;
  renewalDate: Date;
  amount: number;
};

export async function checkRenewalsDaily(renewals: Renewal[]) {
  const today = new Date();
  const due = renewals
    .map((renewal) => ({ ...renewal, daysUntilRenewal: differenceInCalendarDays(renewal.renewalDate, today) }))
    .filter((renewal) => [7, 3, 0].includes(renewal.daysUntilRenewal) || renewal.daysUntilRenewal < 0);

  return Promise.all(
    due.map(async (renewal) => {
      const body = `${renewal.name} for ${renewal.related} is due in ${renewal.daysUntilRenewal} day(s). Amount: ${renewal.amount}.`;
      const whatsapp = await sendWhatsAppMessage({ recipient: process.env.ADMIN_WHATSAPP_NUMBER ?? "admin", title: "Renewal reminder", body });
      const sms = await sendSmsMessage({ recipient: process.env.ADMIN_PHONE_NUMBER ?? "admin", title: "Renewal reminder", body });
      return { renewal, whatsapp, sms };
    })
  );
}
