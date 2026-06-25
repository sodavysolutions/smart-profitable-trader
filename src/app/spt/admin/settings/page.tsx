import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { Card, DataTable, InlineNotice, SectionHeader } from "@/components/UI";
import { SPTAdminShell } from "@/components/spt/admin-shell";
import {
  getGoogleSheetsSyncSnapshot,
  googleSheetTabNames,
  setGoogleSheetsSyncEnabled,
  syncAllExistingDataToGoogleSheets,
  testGoogleSheetsConnection
} from "@/lib/google-sheets";
import { getMessagingProviderSnapshot } from "@/lib/integrations";
import { prisma } from "@/lib/prisma";
import { normalizeText } from "@/lib/spt-admin-helpers";
import { requireAdmin } from "@/lib/spt-admin-auth";
import { getSchemaMismatchMessage, isSchemaMismatchError } from "@/lib/spt-admin-schema";
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

const defaultSettingValues: Record<string, string> = {
  company_name: "Smart Profits Trader",
  whatsapp_number: "+2347087970133",
  logo_url: "/images/smart-profits-trader-logo.png",
  default_admin_email: "sodavysolutions@gmail.com",
  sendy_api_url: "",
  sendy_api_key: "",
  sendy_list_id: "",
  sendy_transactional_endpoint: "",
  whatsapp_api_token: "",
  whatsapp_phone_number_id: "",
  sms_provider: "",
  sms_api_url: "",
  sms_api_key: "",
  sms_sender_id: "",
  event_date_christmas: "12-25",
  event_date_new_year: "01-01",
  event_date_eid: "",
  event_date_independence_day: "10-01",
  message_template_welcome:
    "Welcome to Smart Profits Trader. We have received your request and our team will contact you shortly.",
  message_template_form_acknowledgement:
    "Thank you for submitting your application. We are reviewing your details and will follow up with the next steps.",
  message_template_payment_acknowledgement:
    "Your payment has been received successfully. We appreciate your trust and will confirm activation shortly.",
  message_template_birthday:
    "Happy birthday from Smart Profits Trader. We appreciate you and wish you a prosperous new year ahead.",
  message_template_christmas:
    "Merry Christmas from Smart Profits Trader. Thank you for being part of our community.",
  message_template_new_year:
    "Happy New Year from Smart Profits Trader. Wishing you clarity, growth, and disciplined execution in the markets.",
  message_template_eid:
    "Warm Eid greetings from Smart Profits Trader. May this season bring peace, blessing, and progress.",
  message_template_independence_day:
    "Happy Independence Day from Smart Profits Trader. Thank you for growing with us."
};

const requiredSettingKeys = new Set<keyof typeof defaultSettingValues>([
  "company_name",
  "whatsapp_number",
  "logo_url",
  "default_admin_email",
  "message_template_welcome",
  "message_template_form_acknowledgement",
  "message_template_payment_acknowledgement",
  "message_template_birthday",
  "message_template_christmas",
  "message_template_new_year",
  "message_template_eid",
  "message_template_independence_day"
]);

function buildSettingsPayload(source: Record<string, string | undefined>) {
  return Object.fromEntries(
    settingFields.map((field) => {
      const rawValue = source[field.key];
      const normalized = normalizeText(rawValue);
      const fallback = defaultSettingValues[field.key] ?? "";

      if (requiredSettingKeys.has(field.key as keyof typeof defaultSettingValues)) {
        return [field.key, normalized && normalized.length ? normalized : fallback];
      }

      return [field.key, normalized ?? ""];
    })
  );
}

async function saveSettings(formData: FormData) {
  "use server";
  await requireAdmin();
  const existingSettings = await prisma.setting.findMany({ orderBy: { key: "asc" } });
  const existingValues = Object.fromEntries(existingSettings.map((setting) => [setting.key, setting.value]));
  const submittedValues = Object.fromEntries(
    settingFields.map((field) => [field.key, typeof formData.get(field.key) === "string" ? String(formData.get(field.key)) : ""])
  );
  const payload = buildSettingsPayload({
    ...defaultSettingValues,
    ...existingValues,
    ...submittedValues
  });
  const parsed = settingsSchema.safeParse(payload);

  if (!parsed.success) {
    console.error("Settings validation failed", parsed.error.flatten());
    revalidatePath("/spt/admin/settings");
    return;
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

async function saveGoogleSheetsSettings(formData: FormData) {
  "use server";
  await requireAdmin();
  await setGoogleSheetsSyncEnabled(formData.get("google_sheets_sync_enabled") === "on");
  revalidatePath("/spt/admin/settings");
}

async function testGoogleSheets(formData: FormData) {
  "use server";
  await requireAdmin();
  await setGoogleSheetsSyncEnabled(formData.get("google_sheets_sync_enabled") === "on");
  const result = await testGoogleSheetsConnection();
  revalidatePath("/spt/admin/settings");
  redirect(`/spt/admin/settings?sheetsStatus=${encodeURIComponent(result.message)}`);
}

async function syncAllGoogleSheetsData(formData: FormData) {
  "use server";
  await requireAdmin();
  await setGoogleSheetsSyncEnabled(formData.get("google_sheets_sync_enabled") === "on");
  const result = await syncAllExistingDataToGoogleSheets();
  revalidatePath("/spt/admin/settings");
  redirect(`/spt/admin/settings?sheetsStatus=${encodeURIComponent(result.message)}`);
}

export default async function SPTAdminSettingsPage({ searchParams }: { searchParams: Promise<{ sheetsStatus?: string }> }) {
  const session = await requireAdmin();
  const { sheetsStatus } = await searchParams;
  let settings = [] as Awaited<ReturnType<typeof prisma.setting.findMany>>;
  let providerSnapshot = {
    sendyConfigured: false,
    sendyTransactionalConfigured: false,
    whatsappConfigured: false,
    smsConfigured: false
  };
  let googleSheetsSnapshot = {
    configured: false,
    enabled: true,
    spreadsheetId: "",
    clientEmail: "",
    lastSyncStatus: "Not run yet",
    lastSyncResult: "PENDING",
    lastSyncTime: ""
  };
  let schemaNotice: string | null = null;

  try {
    [settings, providerSnapshot, googleSheetsSnapshot] = await Promise.all([
      prisma.setting.findMany({ orderBy: { key: "asc" } }),
      getMessagingProviderSnapshot(),
      getGoogleSheetsSyncSnapshot()
    ]);
  } catch (error) {
    if (isSchemaMismatchError(error)) {
      schemaNotice = getSchemaMismatchMessage("Workspace settings");
    } else {
      throw error;
    }
  }

  const values = {
    ...defaultSettingValues,
    ...Object.fromEntries(settings.map((setting) => [setting.key, setting.value]))
  };

  return (
    <SPTAdminShell title="Workspace Settings" role={session.role}>
      {schemaNotice && (
        <div className="mb-6">
          <InlineNotice
            title="Workspace settings are still being prepared"
            text={schemaNotice}
          />
        </div>
      )}
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
      <Card className="mb-6">
        <SectionHeader
          title="Google Sheets integration"
          text="Supabase remains the main database. Google Sheets receives a reporting and backup copy when records are created, updated, or manually synced."
        />
        {sheetsStatus && (
          <div className="mb-4 rounded-xl border border-slate-200 bg-slate-50 p-4 text-sm font-semibold text-slate-700">
            {sheetsStatus}
          </div>
        )}
        <DataTable
          columns={["Setting", "Value"]}
          rows={[
            ["Spreadsheet ID", googleSheetsSnapshot.spreadsheetId || "Add GOOGLE_SHEETS_SPREADSHEET_ID in Vercel"],
            ["Service account", googleSheetsSnapshot.clientEmail || "Add GOOGLE_SHEETS_CLIENT_EMAIL in Vercel"],
            ["Automatic sync", googleSheetsSnapshot.enabled ? "Enabled" : "Disabled"],
            ["Connection", googleSheetsSnapshot.configured ? "Credentials present" : "Needs environment variables"],
            ["Last sync result", googleSheetsSnapshot.lastSyncResult],
            ["Last sync status", googleSheetsSnapshot.lastSyncStatus],
            ["Last sync time", googleSheetsSnapshot.lastSyncTime ? new Date(googleSheetsSnapshot.lastSyncTime).toLocaleString() : "Not run yet"]
          ]}
        />
        <form action={saveGoogleSheetsSettings} className="mt-4 flex flex-wrap items-center gap-3">
          <label className="inline-flex items-center gap-2 text-sm font-semibold text-slate-700">
            <input
              type="checkbox"
              name="google_sheets_sync_enabled"
              defaultChecked={googleSheetsSnapshot.enabled}
              className="h-4 w-4 rounded border-slate-300"
            />
            Sync enabled
          </label>
          <button className="rounded-md bg-navy-950 px-4 py-2 text-sm font-bold text-white">Save Google Sheets Setting</button>
        </form>
        <div className="mt-4 flex flex-wrap gap-3">
          <form action={testGoogleSheets}>
            <input type="hidden" name="google_sheets_sync_enabled" value={googleSheetsSnapshot.enabled ? "on" : ""} />
            <button className="rounded-md bg-profit-500 px-4 py-2 text-sm font-bold text-navy-950">Test Google Sheets Connection</button>
          </form>
          <form action={syncAllGoogleSheetsData}>
            <input type="hidden" name="google_sheets_sync_enabled" value={googleSheetsSnapshot.enabled ? "on" : ""} />
            <button className="rounded-md border border-navy-950 px-4 py-2 text-sm font-bold text-navy-950">Sync All Data to Google Sheets</button>
          </form>
        </div>
        <div className="mt-4 rounded-xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-600">
          <p className="font-semibold text-slate-800">Required tabs</p>
          <p className="mt-1">{googleSheetTabNames.join(", ")}</p>
          <p className="mt-2">The app will create these tabs automatically when the service account has Editor access.</p>
        </div>
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
