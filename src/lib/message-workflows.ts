import { CommunicationChannel, CommunicationStatus, type CommunicationLog, type Subscription } from "@prisma/client";
import { addSendySubscriber, sendSendyTransactionalEmail, sendSmsMessage, sendWhatsAppMessage } from "@/lib/integrations";
import { prisma } from "@/lib/prisma";

type TemplateContext = Record<string, string | number | null | undefined>;
export type EventKey = "birthday" | "christmas" | "new_year" | "eid" | "independence_day";

type LogCommunicationInput = {
  channel: CommunicationChannel;
  recipient: string;
  subject?: string | null;
  message: string;
  status?: CommunicationStatus;
  leadId?: string | null;
  customerId?: string | null;
  applicationId?: string | null;
};

type LifecycleMessageArgs = {
  channel?: CommunicationChannel;
  recipient: string;
  subject: string;
  message: string;
  leadId?: string | null;
  customerId?: string | null;
  applicationId?: string | null;
  send?: () => Promise<{ ok: boolean; configured: boolean; status: number; response: string }>;
};

type RenewalRecord = Subscription & {
  customer: { id: string; fullName: string; whatsapp: string | null; phone: string | null } | null;
  expense: { name: string; vendor: string | null } | null;
};

const eventTitles: Record<EventKey, string> = {
  birthday: "Happy birthday from Smart Profits Trader",
  christmas: "Christmas greetings from Smart Profits Trader",
  new_year: "Happy New Year from Smart Profits Trader",
  eid: "Warm Eid greetings from Smart Profits Trader",
  independence_day: "Happy Independence Day from Smart Profits Trader"
};

const defaultEventDates: Partial<Record<Exclude<EventKey, "birthday">, string>> = {
  christmas: "12-25",
  new_year: "01-01",
  independence_day: "10-01"
};

function interpolateTemplate(template: string, context: TemplateContext) {
  return template.replace(/\{\{\s*([\w.]+)\s*\}\}/g, (_, key: string) => {
    const value = context[key];
    return value === null || value === undefined ? "" : String(value);
  });
}

async function getSettingMap(keys: string[]) {
  const settings = await prisma.setting.findMany({
    where: { key: { in: keys } }
  });

  return Object.fromEntries(settings.map((setting) => [setting.key, setting.value]));
}

export async function createCommunicationLog(input: LogCommunicationInput) {
  return prisma.communicationLog.create({
    data: {
      channel: input.channel,
      recipient: input.recipient,
      subject: input.subject ?? null,
      message: input.message,
      status: input.status ?? CommunicationStatus.PENDING,
      leadId: input.leadId ?? undefined,
      customerId: input.customerId ?? undefined,
      applicationId: input.applicationId ?? undefined
    }
  });
}

async function updateCommunicationLog(log: CommunicationLog, result: { ok: boolean; configured: boolean; response: string }) {
  return prisma.communicationLog.update({
    where: { id: log.id },
    data: {
      status: result.ok ? CommunicationStatus.SENT : result.configured ? CommunicationStatus.FAILED : CommunicationStatus.PENDING,
      message: result.ok ? log.message : `${log.message}\n\nDispatch result: ${result.response}`,
      sentAt: result.ok ? new Date() : null
    }
  });
}

async function logLifecycleActivity(
  type: string,
  description: string,
  links: Pick<LogCommunicationInput, "leadId" | "customerId" | "applicationId">
) {
  await prisma.activityLog.create({
    data: {
      type,
      description,
      leadId: links.leadId ?? undefined,
      customerId: links.customerId ?? undefined,
      applicationId: links.applicationId ?? undefined
    }
  });
}

export async function dispatchLifecycleMessage(args: LifecycleMessageArgs) {
  const log = await createCommunicationLog({
    channel: args.channel ?? CommunicationChannel.EMAIL,
    recipient: args.recipient,
    subject: args.subject,
    message: args.message,
    leadId: args.leadId,
    customerId: args.customerId,
    applicationId: args.applicationId
  });

  if (!args.send) {
    return log;
  }

  const result = await args.send();
  const updated = await updateCommunicationLog(log, result);

  await logLifecycleActivity(
    result.ok ? "COMMUNICATION_SENT" : result.configured ? "COMMUNICATION_FAILED" : "COMMUNICATION_PENDING_PROVIDER",
    `${args.subject} via ${(args.channel ?? CommunicationChannel.EMAIL).toLowerCase()} for ${args.recipient}: ${result.response}`,
    args
  );

  return updated;
}

function buildServiceTag(service: string) {
  return service
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

function monthDayKey(date: Date) {
  const month = `${date.getMonth() + 1}`.padStart(2, "0");
  const day = `${date.getDate()}`.padStart(2, "0");
  return `${month}-${day}`;
}

async function getCompanySettingMap() {
  return getSettingMap([
    "company_name",
    "message_template_birthday",
    "message_template_christmas",
    "message_template_new_year",
    "message_template_eid",
    "message_template_independence_day",
    "event_date_christmas",
    "event_date_new_year",
    "event_date_eid",
    "event_date_independence_day"
  ]);
}

function buildEventContext(customer: {
  fullName: string;
  email: string;
  customerType: string;
  dateOfBirth?: Date | null;
}, companyName: string, eventKey: EventKey) {
  return {
    fullName: customer.fullName,
    firstName: customer.fullName.split(" ")[0] ?? customer.fullName,
    email: customer.email,
    companyName,
    serviceType: customer.customerType,
    eventName: eventTitles[eventKey],
    birthDate: customer.dateOfBirth ? customer.dateOfBirth.toLocaleDateString() : ""
  };
}

async function dispatchCustomerEventMessage(customer: {
  id: string;
  fullName: string;
  email: string;
  whatsapp: string | null;
  phone: string | null;
  customerType: string;
  dateOfBirth?: Date | null;
}, eventKey: EventKey, template: string, companyName: string) {
  const message = interpolateTemplate(template, buildEventContext(customer, companyName, eventKey));
  const subject = eventTitles[eventKey];
  const tags = [eventKey, customer.customerType.toLowerCase()];
  const deliveries = [];

  if (customer.email) {
    deliveries.push(
      dispatchLifecycleMessage({
        channel: CommunicationChannel.EMAIL,
        recipient: customer.email,
        subject,
        message,
        customerId: customer.id,
        send: async () =>
          sendSendyTransactionalEmail({
            recipient: customer.fullName,
            email: customer.email,
            name: customer.fullName,
            title: subject,
            body: message,
            tags
          })
      })
    );
  }

  if (customer.whatsapp) {
    const whatsapp = customer.whatsapp;
    deliveries.push(
      dispatchLifecycleMessage({
        channel: CommunicationChannel.WHATSAPP,
        recipient: whatsapp,
        subject,
        message,
        customerId: customer.id,
        send: async () =>
          sendWhatsAppMessage({
            recipient: whatsapp,
            title: subject,
            body: message
          })
      })
    );
  }

  if (customer.phone) {
    const phone = customer.phone;
    deliveries.push(
      dispatchLifecycleMessage({
        channel: CommunicationChannel.SMS,
        recipient: phone,
        subject,
        message,
        customerId: customer.id,
        send: async () =>
          sendSmsMessage({
            recipient: phone,
            title: subject,
            body: message
          })
      })
    );
  }

  return Promise.all(deliveries);
}

export async function sendApplicationAcknowledgement(applicationId: string) {
  const [application, settings] = await Promise.all([
    prisma.application.findUnique({ where: { id: applicationId } }),
    getSettingMap(["message_template_form_acknowledgement", "company_name"])
  ]);

  if (!application) {
    throw new Error("Application not found for acknowledgement workflow.");
  }

  const template =
    settings.message_template_form_acknowledgement ??
    "Hello {{fullName}}, we received your {{service}} application and our team will review it shortly.";

  const message = interpolateTemplate(template, {
    fullName: application.fullName,
    service: application.service,
    companyName: settings.company_name ?? "Smart Profits Trader"
  });

  return dispatchLifecycleMessage({
    recipient: application.email,
    subject: "We received your Smart Profits Trader application",
    message,
    applicationId: application.id,
    send: async () => {
      const directEmail = await sendSendyTransactionalEmail({
        recipient: application.fullName,
        email: application.email,
        name: application.fullName,
        title: "We received your Smart Profits Trader application",
        body: message,
        tags: [buildServiceTag(application.service), "application"]
      });

      if (directEmail.configured && directEmail.ok) {
        return directEmail;
      }

      return addSendySubscriber({
        recipient: application.fullName,
        email: application.email,
        name: application.fullName,
        title: "Sendy list subscription",
        body: message,
        tags: [buildServiceTag(application.service), "application"]
      });
    }
  });
}

export async function sendWelcomeWorkflow(customerId: string) {
  const [customer, settings] = await Promise.all([
    prisma.customer.findUnique({ where: { id: customerId } }),
    getSettingMap(["message_template_welcome", "company_name"])
  ]);

  if (!customer) {
    throw new Error("Customer not found for welcome workflow.");
  }

  const template =
    settings.message_template_welcome ??
    "Hello {{fullName}}, welcome to {{companyName}}. Your {{serviceType}} profile is now active in our trading ecosystem.";

  const message = interpolateTemplate(template, {
    fullName: customer.fullName,
    companyName: settings.company_name ?? "Smart Profits Trader",
    serviceType: customer.customerType
  });

  return dispatchLifecycleMessage({
    recipient: customer.email,
    subject: "Welcome to Smart Profits Trader",
    message,
    customerId: customer.id,
    send: async () => {
      const directEmail = await sendSendyTransactionalEmail({
        recipient: customer.fullName,
        email: customer.email,
        name: customer.fullName,
        title: "Welcome to Smart Profits Trader",
        body: message,
        tags: [customer.customerType.toLowerCase(), "welcome"]
      });

      if (directEmail.configured && directEmail.ok) {
        return directEmail;
      }

      return addSendySubscriber({
        recipient: customer.fullName,
        email: customer.email,
        name: customer.fullName,
        title: "Welcome to Smart Profits Trader",
        body: message,
        tags: [customer.customerType.toLowerCase(), "welcome"]
      });
    }
  });
}

export async function sendPaymentAcknowledgement(paymentId: string) {
  const [payment, settings] = await Promise.all([
    prisma.payment.findUnique({
      where: { id: paymentId },
      include: { customer: true }
    }),
    getSettingMap(["message_template_payment_acknowledgement", "company_name"])
  ]);

  if (!payment?.customer?.email) {
    return null;
  }

  const template =
    settings.message_template_payment_acknowledgement ??
    "Hello {{fullName}}, we have recorded your payment for {{serviceType}}. Thank you for choosing {{companyName}}.";

  const message = interpolateTemplate(template, {
    fullName: payment.customer.fullName,
    companyName: settings.company_name ?? "Smart Profits Trader",
    serviceType: payment.serviceType,
    amount: payment.amount.toString(),
    currency: payment.currency
  });

  return dispatchLifecycleMessage({
    recipient: payment.customer.email,
    subject: "Payment received by Smart Profits Trader",
    message,
    customerId: payment.customerId,
    send: async () =>
      sendSendyTransactionalEmail({
        recipient: payment.customer!.fullName,
        email: payment.customer!.email,
        name: payment.customer!.fullName,
        title: "Payment received by Smart Profits Trader",
        body: message,
        tags: ["payment", buildServiceTag(payment.serviceType)]
      })
  });
}

export async function sendEventBroadcastPreview(eventKey: EventKey) {
  const settings = await getCompanySettingMap();
  const customers = await prisma.customer.findMany({
    where: eventKey === "birthday" ? { dateOfBirth: { not: null } } : undefined,
    orderBy: { fullName: "asc" },
    take: 100
  });

  const template = settings[`message_template_${eventKey}`] ?? "";

  return customers.map((customer) => ({
    customerId: customer.id,
    fullName: customer.fullName,
    email: customer.email,
    preview: interpolateTemplate(template, {
      ...buildEventContext(customer, settings.company_name ?? "Smart Profits Trader", eventKey)
    })
  }));
}

export async function sendEventBroadcastNow(eventKey: Exclude<EventKey, "birthday">) {
  const settings = await getCompanySettingMap();
  const customers = await prisma.customer.findMany({
    orderBy: { fullName: "asc" }
  });

  const template = settings[`message_template_${eventKey}`] ?? "";
  const companyName = settings.company_name ?? "Smart Profits Trader";

  return Promise.all(
    customers.map((customer) => dispatchCustomerEventMessage(customer, eventKey, template, companyName))
  );
}

export async function sendBirthdayMessagesForDate(date = new Date()) {
  const settings = await getCompanySettingMap();
  const customers = await prisma.customer.findMany({
    where: { dateOfBirth: { not: null } },
    orderBy: { fullName: "asc" }
  });

  const matches = customers.filter((customer) => customer.dateOfBirth && monthDayKey(customer.dateOfBirth) === monthDayKey(date));
  const template = settings.message_template_birthday ?? "";
  const companyName = settings.company_name ?? "Smart Profits Trader";

  return Promise.all(matches.map((customer) => dispatchCustomerEventMessage(customer, "birthday", template, companyName)));
}

export async function sendSpecialEventMessagesForDate(date = new Date()) {
  const settings = await getCompanySettingMap();
  const dateKey = monthDayKey(date);
  const companyName = settings.company_name ?? "Smart Profits Trader";
  const customers = await prisma.customer.findMany({
    orderBy: { fullName: "asc" }
  });

  const matchingEvents = (["christmas", "new_year", "eid", "independence_day"] as const).filter((eventKey) => {
    const configuredDate =
      settings[`event_date_${eventKey}`] ||
      defaultEventDates[eventKey as keyof typeof defaultEventDates] ||
      "";

    return configuredDate === dateKey;
  });

  const results = [];

  for (const eventKey of matchingEvents) {
    const template = settings[`message_template_${eventKey}`] ?? "";
    const deliveries = await Promise.all(
      customers.map((customer) => dispatchCustomerEventMessage(customer, eventKey, template, companyName))
    );

    results.push({
      eventKey,
      deliveries
    });
  }

  return results;
}

export async function sendRenewalReminder(renewal: RenewalRecord) {
  const relatedName = renewal.customer?.fullName ?? renewal.expense?.name ?? renewal.relatedName ?? renewal.name;
  const renewalDate = renewal.renewalDate?.toLocaleDateString() ?? "Not set";
  const amount = `${renewal.currency} ${renewal.amount.toString()}`;
  const body = `${renewal.name} for ${relatedName} renews on ${renewalDate}. Amount due: ${amount}.`;

  const notifications = [];

  if (renewal.customer?.whatsapp) {
    const whatsapp = await sendWhatsAppMessage({
      recipient: renewal.customer.whatsapp,
      title: "Subscription renewal reminder",
      body
    });

    notifications.push(
      await dispatchLifecycleMessage({
        channel: CommunicationChannel.WHATSAPP,
        recipient: renewal.customer.whatsapp,
        subject: "Subscription renewal reminder",
        message: body,
        customerId: renewal.customer.id,
        send: async () => whatsapp
      })
    );
  }

  if (renewal.customer?.phone) {
    const sms = await sendSmsMessage({
      recipient: renewal.customer.phone,
      title: "Subscription renewal reminder",
      body
    });

    notifications.push(
      await dispatchLifecycleMessage({
        channel: CommunicationChannel.SMS,
        recipient: renewal.customer.phone,
        subject: "Subscription renewal reminder",
        message: body,
        customerId: renewal.customer.id,
        send: async () => sms
      })
    );
  }

  return notifications;
}
