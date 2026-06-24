import { revalidatePath } from "next/cache";
import { Card, DataTable, SectionHeader } from "@/components/UI";
import { SPTAdminShell } from "@/components/spt/admin-shell";
import { getMessagingProviderSnapshot } from "@/lib/integrations";
import { prisma } from "@/lib/prisma";
import { normalizeText } from "@/lib/spt-admin-helpers";
import { requireAdmin } from "@/lib/spt-admin-auth";
import { settingsSchema } from "@/lib/validation";

export const dynamic = "force-dynamic";

const settingFields: Array<{ key: string; label: string; multiline?: boolean }> = [
  { key: "company_name", label: "Company name" },
  { key: "whatsapp_number", label: "WhatsApp number" },
  { key: "logo_url", label: "Logo URL" },
  { key: "default_admin_email", label: "Default admin email" },
  { key: "sendy_api_url", label: "Sendy API URL" },
  { key: "sendy_api_key", label: "Sendy API key" },
  { key: "sendy_list_id", label: "Sendy list ID" },
  { key: "sendy_transactional_endpoint", label: "Sendy transactional endpoint" },
  { key: "whatsapp_api_token", label: "WhatsApp API token" },
  { key: "whatsapp_phone_number_id", label: "WhatsApp phone number ID" },
  { key: "sms_provider", label: "SMS provider" },
  { key: "sms_api_url", label: "SMS API URL" },
  { key: "sms_api_key", label: "SMS API key" },
  { key: "sms_sender_id", label: "SMS sender ID" },
  { key: "event_date_christmas", label: "Christmas date (MM-DD)" },
  { key: "event_date_new_year", label: "New year date (MM-DD)" },
  { key: "event_date_eid", label: "Eid date (MM-DD)" },
  { key: "event_date_independence_day", label: "Independence day date (MM-DD)" },
  { key: "message_template_welcome", label: "Welcome message template", multiline: true },
  { key: "message_template_form_acknowledgement", label: "Form acknowledgement template", multiline: true },
  { key: "message_template_payment_acknowledgement", label: "Payment acknowledgement template", multiline: true },
  { key: "message_template_birthday", label: "Birthday message template", multiline: true },
  { key: "message_template_christmas", label: "Christmas message template", multiline: true },
  { key: "message_template_new_year", label: "New year message template", multiline: true },
  { key: "message_template_eid", label: "Eid message template", multiline: true },
  { key: "message_template_independence_day", label: "Independence day message template", multiline: true }
] as const;

async function saveSettings(formData: FormData) {
  "use server";
  await requireAdmin();
  const parsed = settingsSchema.safeParse(Object.fromEntries(formData.entries()));
  if (!parsed.success) {
    throw new Error("Invalid settings payload.");
  }

  for (const field of settingFields) {
    const value = normalizeText(parsed.data[field.key as keyof typeof parsed.data] as string | undefined) ?? "";
    await prisma.setting.upsert({
      where: { key: field.key },
      update: { value },
      create: { key: field.key, value }
    });
  }
  revalidatePath("/spt/admin/settings");
}

export default async function SPTAdminSettingsPage() {
  const session = await requireAdmin();
  const [settings, providerSnapshot] = await Promise.all([
    prisma.setting.findMany({ orderBy: { key: "asc" } }),
    getMessagingProviderSnapshot()
  ]);
  const values = Object.fromEntries(settings.map((setting) => [setting.key, setting.value]));

  return (
    <SPTAdminShell title="Settings" role={session.role}>
      <Card className="mb-6">
        <SectionHeader
          title="Provider status"
          text="This gives you a quick live-read of the messaging stack before you test forms, acknowledgements, or renewals."
        />
        <DataTable
          columns={["Provider", "Status", "What it covers"]}
          rows={[
            ["Sendy list sync", providerSnapshot.sendyConfigured ? "Ready" : "Needs setup", "List subscription, welcome/autoresponder entry point"],
            [
              "Sendy direct email",
              providerSnapshot.sendyTransactionalConfigured ? "Ready" : "Optional / not set",
              "Payment acknowledgements and direct one-off emails"
            ],
            ["WhatsApp", providerSnapshot.whatsappConfigured ? "Ready" : "Needs setup", "Renewal reminders and manual WhatsApp follow-ups"],
            ["SMS", providerSnapshot.smsConfigured ? "Ready" : "Needs setup", "Renewal reminders and urgent text alerts"]
          ]}
        />
      </Card>
      <Card>
        <SectionHeader
          title="Company, messaging, and integration settings"
          text="These values control your business identity, default contact paths, and the message templates used for acknowledgements, welcome sequences, and seasonal broadcasts. Keep sensitive provider secrets in Vercel too, especially API keys and tokens."
        />
        <div className="mb-4 rounded-xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-600">
          <p className="font-semibold text-slate-800">Template variables you can use</p>
          <p className="mt-1">
            Use placeholders like <code>{"{{fullName}}"}</code>, <code>{"{{firstName}}"}</code>, <code>{"{{companyName}}"}</code>,
            <code>{" {{serviceType}}"}</code>, <code>{"{{eventName}}"}</code>, and <code>{"{{birthDate}}"}</code>.
          </p>
          <p className="mt-2">
            For special event dates, use the <code>MM-DD</code> format. Example: Christmas = <code>12-25</code>. Update Eid manually each year.
          </p>
        </div>
        <form action={saveSettings} className="grid gap-4 md:grid-cols-2">
          {settingFields.map((field) => (
            <label key={field.key} className={`grid gap-1 text-sm font-medium text-slate-700 ${field.multiline ? "md:col-span-2" : ""}`}>
              {field.label}
              {field.multiline ? (
                <textarea
                  name={field.key}
                  rows={4}
                  defaultValue={values[field.key] ?? ""}
                  className="rounded-md border border-slate-200 px-3 py-2"
                />
              ) : (
                <input
                  name={field.key}
                  defaultValue={values[field.key] ?? ""}
                  className="rounded-md border border-slate-200 px-3 py-2"
                />
              )}
            </label>
          ))}
          <div className="md:col-span-2">
            <button className="rounded-md bg-profit-500 px-5 py-3 text-sm font-bold text-navy-950">Save Settings</button>
          </div>
        </form>
      </Card>
      <Card className="mt-6">
        <SectionHeader title="Current settings" />
        <DataTable
          columns={["Key", "Value"]}
          rows={settings.map((setting) => [
            setting.key,
            /(key|token|secret)/i.test(setting.key) ? "Stored value hidden in UI" : setting.value
          ])}
        />
      </Card>
    </SPTAdminShell>
  );
}
