import crypto from "crypto";
import { prisma } from "@/lib/prisma";

type SyncAction = "CREATE" | "UPDATE" | "UPSERT" | "BULK_SYNC" | "TEST";
type SyncableRecordType =
  | "Lead"
  | "Application"
  | "Customer"
  | "Subscription"
  | "Payment"
  | "Expense"
  | "AccountProgress"
  | "ProfitShare"
  | "CommunicationLog"
  | "ActivityLog";

type RowConfig = {
  tabName: string;
  headers: string[];
  map: (record: Record<string, unknown>) => unknown[];
};

type SyncResult = {
  ok: boolean;
  configured: boolean;
  message: string;
  synced?: number;
  failed?: number;
};

const SHEETS_SCOPE = "https://www.googleapis.com/auth/spreadsheets";
const TOKEN_URL = "https://oauth2.googleapis.com/token";
const SHEETS_BASE_URL = "https://sheets.googleapis.com/v4/spreadsheets";
const DEFAULT_SYNC_ENABLED = true;

function asRecord(value: unknown): Record<string, unknown> {
  return value && typeof value === "object" ? (value as Record<string, unknown>) : {};
}

function relatedName(value: unknown, key = "fullName") {
  const record = asRecord(value);
  return text(record[key]);
}

function text(value: unknown) {
  if (value === null || value === undefined) return "";
  if (value instanceof Date) return value.toISOString();
  if (typeof value === "object" && "toString" in value) return String(value);
  return String(value);
}

function boolText(value: unknown) {
  return value === true ? "Yes" : value === false ? "No" : "";
}

function phone(record: Record<string, unknown>) {
  return text(record.phoneWhatsapp) || text(record.whatsapp) || text(record.phone);
}

function location(record: Record<string, unknown>) {
  return [text(record.locationAddress), text(record.city), text(record.country)].filter(Boolean).join(", ");
}

function dateOnly(value: unknown) {
  const raw = text(value);
  return raw ? raw.slice(0, 10) : "";
}

const rowConfigs = {
  Lead: {
    tabName: "Leads",
    headers: [
      "Lead ID",
      "Created Date",
      "Updated Date",
      "Full Name",
      "Email",
      "Phone / WhatsApp",
      "Location / Address",
      "Service Interest",
      "Status",
      "Assigned Staff",
      "Next Follow-Up Date",
      "Notes"
    ],
    map: (record) => [
      record.id,
      record.createdAt,
      record.updatedAt,
      record.fullName,
      record.email,
      phone(record),
      location(record),
      record.serviceInterest,
      record.status,
      relatedName(record.assignedTo, "name") || text(record.assignedToId),
      dateOnly(record.nextFollowUpAt),
      record.notes
    ]
  },
  Application: {
    tabName: "Applications",
    headers: [
      "Application ID",
      "Created Date",
      "Updated Date",
      "Full Name",
      "Email",
      "Phone / WhatsApp Number",
      "Location / Address",
      "Service Interested In",
      "Trading Experience",
      "Experience Rating",
      "Automated Trading Experience",
      "Investment Amount",
      "Expected Monthly Profit Goal",
      "Existing Trading Account",
      "Risk Style",
      "Main Goal",
      "Preferred Broker",
      "Evaluation Prop Firm",
      "Evaluation Stage",
      "Evaluation Account Size",
      "Instant Funded Provider",
      "Instant Funded Account Size",
      "Ready to Pay Setup Fee",
      "Risk Acknowledged",
      "Additional Message",
      "Application Status"
    ],
    map: (record) => [
      record.id,
      record.createdAt,
      record.updatedAt,
      record.fullName,
      record.email,
      phone(record),
      location(record),
      record.service,
      record.tradingExperienceYesNo || record.tradingExperience,
      record.experienceRating,
      record.automatedTradingExperience,
      record.investmentAmount || record.startingCapital,
      record.expectedMonthlyProfitGoal,
      record.hasExistingTradingAccount,
      record.riskStyle,
      record.mainGoal,
      record.preferredBroker || record.broker,
      record.evaluationPropFirm,
      record.evaluationStage,
      record.evaluationAccountSize,
      record.instantFundedProvider || record.propFirm,
      record.instantFundedAccountSize,
      record.readyToPaySetupFee,
      boolText(record.riskAcknowledged),
      record.message,
      record.status
    ]
  },
  Customer: {
    tabName: "Customers",
    headers: [
      "Customer ID",
      "Created Date",
      "Updated Date",
      "Full Name",
      "Email",
      "Phone / WhatsApp",
      "Location / Address",
      "Customer Type",
      "Broker / Prop Firm",
      "Account Platform",
      "Account Login",
      "Initial Capital",
      "Current Balance",
      "Current Equity",
      "Status",
      "Start Date",
      "Renewal Date",
      "Profit Share Tier",
      "Setup Fee Status",
      "Notes"
    ],
    map: (record) => [
      record.id,
      record.createdAt,
      record.updatedAt,
      record.fullName,
      record.email,
      phone(record),
      location(record),
      record.customerType,
      record.brokerOrPropFirm,
      record.accountPlatform,
      record.accountLogin,
      record.initialCapital,
      record.currentBalance,
      record.currentEquity,
      record.status,
      dateOnly(record.startDate),
      dateOnly(record.renewalDate),
      record.profitShareTier,
      record.setupFeeStatus,
      record.notes
    ]
  },
  Subscription: {
    tabName: "Subscriptions",
    headers: [
      "Subscription ID",
      "Created Date",
      "Updated Date",
      "Customer / Vendor Name",
      "Subscription Type",
      "Service / Expense Category",
      "Amount",
      "Currency",
      "Billing Cycle",
      "Start Date",
      "Renewal Date",
      "Status",
      "Reminder Enabled",
      "Notes"
    ],
    map: (record) => [
      record.id,
      record.createdAt,
      record.updatedAt,
      relatedName(record.customer) || relatedName(record.expense, "vendor") || text(record.relatedName),
      record.type,
      record.name || relatedName(record.expense, "category"),
      record.amount,
      record.currency,
      record.billingCycle,
      dateOnly(record.startDate),
      dateOnly(record.renewalDate),
      record.status,
      boolText(record.reminderEnabled),
      record.notes
    ]
  },
  Payment: {
    tabName: "Payments",
    headers: [
      "Payment ID",
      "Created Date",
      "Updated Date",
      "Customer Name",
      "Service Type",
      "Amount",
      "Currency",
      "Payment Date",
      "Payment Method",
      "Payment Status",
      "Reference Number",
      "Notes"
    ],
    map: (record) => [
      record.id,
      record.createdAt,
      record.updatedAt,
      relatedName(record.customer),
      record.serviceType,
      record.amount,
      record.currency,
      dateOnly(record.paymentDate),
      record.paymentMethod,
      record.status,
      record.invoiceReference,
      record.notes
    ]
  },
  Expense: {
    tabName: "Expenses",
    headers: [
      "Expense ID",
      "Created Date",
      "Updated Date",
      "Expense Name",
      "Category",
      "Vendor",
      "Amount",
      "Currency",
      "Billing Cycle",
      "Due Date",
      "Renewal Date",
      "Payment Status",
      "Payment Method",
      "Notes"
    ],
    map: (record) => [
      record.id,
      record.createdAt,
      record.updatedAt,
      record.name,
      record.category,
      record.vendor,
      record.amount,
      record.currency,
      record.billingCycle,
      dateOnly(record.dueDate),
      dateOnly(record.renewalDate),
      record.paymentStatus,
      record.paymentMethod,
      record.notes
    ]
  },
  AccountProgress: {
    tabName: "Account Progress",
    headers: [
      "Account Progress ID",
      "Created Date",
      "Updated Date",
      "Customer Name",
      "Service Type",
      "Phase",
      "Account Size",
      "Current Balance",
      "Current Equity",
      "Profit Target",
      "Current Profit",
      "Growth Percentage",
      "Drawdown Limit",
      "Current Drawdown",
      "Daily Drawdown",
      "Max Drawdown",
      "Days Traded",
      "Minimum Trade Days",
      "Status",
      "Notes"
    ],
    map: (record) => [
      record.id,
      record.createdAt,
      record.updatedAt,
      relatedName(record.customer),
      record.serviceType,
      record.phase,
      record.accountSize,
      record.currentBalance,
      record.currentEquity,
      record.profitTarget,
      record.currentProfit,
      record.growthPercentage,
      record.drawdownLimit,
      record.currentDrawdown,
      record.dailyDrawdown,
      record.maxDrawdown,
      record.daysTraded,
      record.minimumTradeDays,
      record.status,
      record.notes
    ]
  },
  ProfitShare: {
    tabName: "Profit Share",
    headers: [
      "Profit Share ID",
      "Created Date",
      "Updated Date",
      "Customer Name",
      "Total Profit",
      "Client Percentage",
      "Company Percentage",
      "Client Share",
      "Company Share",
      "Amount Paid",
      "Amount Pending",
      "Payment Date",
      "Status",
      "Notes"
    ],
    map: (record) => [
      record.id,
      record.createdAt,
      record.updatedAt,
      relatedName(record.customer),
      record.totalProfit,
      record.clientPercentage,
      record.companyPercentage,
      record.clientShare,
      record.companyShare,
      record.amountPaid,
      record.amountPending,
      dateOnly(record.paymentDate),
      record.status,
      record.notes
    ]
  },
  CommunicationLog: {
    tabName: "Communication Logs",
    headers: [
      "Communication Log ID",
      "Created Date",
      "Channel",
      "Recipient",
      "Subject",
      "Message",
      "Status",
      "Lead",
      "Customer",
      "Application",
      "Sent At"
    ],
    map: (record) => [
      record.id,
      record.createdAt,
      record.channel,
      record.recipient,
      record.subject,
      record.message,
      record.status,
      relatedName(record.lead),
      relatedName(record.customer),
      relatedName(record.application),
      record.sentAt
    ]
  },
  ActivityLog: {
    tabName: "Activity Logs",
    headers: [
      "Activity Log ID",
      "Created Date",
      "Type",
      "Description",
      "Lead ID",
      "Customer ID",
      "Application ID",
      "Subscription ID",
      "Payment ID",
      "Expense ID",
      "Profit Share ID",
      "Account Progress ID",
      "User ID"
    ],
    map: (record) => [
      record.id,
      record.createdAt,
      record.type,
      record.description,
      record.leadId,
      record.customerId,
      record.applicationId,
      record.subscriptionId,
      record.paymentId,
      record.expenseId,
      record.profitShareId,
      record.accountProgressId,
      record.userId
    ]
  }
} satisfies Record<SyncableRecordType, RowConfig>;

export const googleSheetTabNames = Object.values(rowConfigs).map((config) => config.tabName);

function getGoogleSheetsConfig() {
  return {
    clientEmail: process.env.GOOGLE_SHEETS_CLIENT_EMAIL,
    privateKey: process.env.GOOGLE_SHEETS_PRIVATE_KEY?.replace(/\\n/g, "\n").replace(/\r\n/g, "\n").trim(),
    spreadsheetId: process.env.GOOGLE_SHEETS_SPREADSHEET_ID,
    projectId: process.env.GOOGLE_SHEETS_PROJECT_ID,
    privateKeyId: process.env.GOOGLE_SHEETS_PRIVATE_KEY_ID
  };
}

function isConfigured() {
  const config = getGoogleSheetsConfig();
  return Boolean(config.clientEmail && config.privateKey && config.spreadsheetId);
}

async function isAutomaticSyncEnabled() {
  try {
    const setting = await prisma.setting.findUnique({ where: { key: "google_sheets_sync_enabled" } });
    return setting?.value ? setting.value === "true" : DEFAULT_SYNC_ENABLED;
  } catch {
    return DEFAULT_SYNC_ENABLED;
  }
}

async function markSyncSnapshot(status: "SUCCESS" | "FAILED", message: string) {
  try {
    await Promise.all([
      prisma.setting.upsert({
        where: { key: "google_sheets_last_sync_status" },
        update: { value: message },
        create: { key: "google_sheets_last_sync_status", value: message }
      }),
      prisma.setting.upsert({
        where: { key: "google_sheets_last_sync_time" },
        update: { value: new Date().toISOString() },
        create: { key: "google_sheets_last_sync_time", value: new Date().toISOString() }
      }),
      prisma.setting.upsert({
        where: { key: "google_sheets_last_sync_result" },
        update: { value: status },
        create: { key: "google_sheets_last_sync_result", value: status }
      })
    ]);
  } catch (error) {
    console.error("Could not update Google Sheets sync settings:", error);
  }
}

async function logSyncAttempt(recordType: string, recordId: string, action: SyncAction, status: "SUCCESS" | "FAILED", errorMessage?: string) {
  try {
    await prisma.syncLog.create({
      data: {
        recordType,
        recordId,
        action,
        status,
        errorMessage
      }
    });
  } catch (error) {
    console.error("Could not write Google Sheets SyncLog:", error);
  }
}

function base64Url(input: string) {
  return Buffer.from(input).toString("base64").replace(/=/g, "").replace(/\+/g, "-").replace(/\//g, "_");
}

async function getAccessToken() {
  const config = getGoogleSheetsConfig();

  if (!config.clientEmail || !config.privateKey) {
    throw new Error("Google Sheets credentials are not configured.");
  }

  const now = Math.floor(Date.now() / 1000);
  const header = base64Url(JSON.stringify({ alg: "RS256", typ: "JWT", kid: config.privateKeyId }));
  const claimSet = base64Url(
    JSON.stringify({
      iss: config.clientEmail,
      scope: SHEETS_SCOPE,
      aud: TOKEN_URL,
      exp: now + 3600,
      iat: now
    })
  );
  const unsignedToken = `${header}.${claimSet}`;
  const privateKeyObj = crypto.createPrivateKey({
    key: config.privateKey,
    format: "pem",
    type: "pkcs8"
  });
  const signature = crypto.createSign("RSA-SHA256").update(unsignedToken).sign(privateKeyObj, "base64url");
  const response = await fetch(TOKEN_URL, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer",
      assertion: `${unsignedToken}.${signature}`
    })
  });

  if (!response.ok) {
    throw new Error(`Google auth failed: ${await response.text()}`);
  }

  const body = (await response.json()) as { access_token?: string };
  if (!body.access_token) throw new Error("Google auth did not return an access token.");

  return body.access_token;
}

async function sheetsRequest<T>(path: string, init: RequestInit = {}) {
  const config = getGoogleSheetsConfig();
  if (!config.spreadsheetId) throw new Error("GOOGLE_SHEETS_SPREADSHEET_ID is not configured.");

  const token = await getAccessToken();
  const response = await fetch(`${SHEETS_BASE_URL}/${config.spreadsheetId}${path}`, {
    ...init,
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
      ...(init.headers ?? {})
    }
  });

  if (!response.ok) {
    throw new Error(`Google Sheets API failed: ${await response.text()}`);
  }

  return response.json() as Promise<T>;
}

function quoteSheetName(tabName: string) {
  return `'${tabName.replace(/'/g, "''")}'`;
}

async function ensureSheetTab(config: RowConfig) {
  const metadata = await sheetsRequest<{ sheets?: Array<{ properties?: { title?: string } }> }>("");
  const tabs = new Set(metadata.sheets?.map((sheet) => sheet.properties?.title).filter(Boolean));

  if (!tabs.has(config.tabName)) {
    await sheetsRequest(":batchUpdate", {
      method: "POST",
      body: JSON.stringify({
        requests: [{ addSheet: { properties: { title: config.tabName } } }]
      })
    });
  }

  const headerRange = `${quoteSheetName(config.tabName)}!1:1`;
  const existingHeader = await sheetsRequest<{ values?: string[][] }>(`/values/${encodeURIComponent(headerRange)}`);
  const firstHeaderCell = existingHeader.values?.[0]?.[0];

  if (!firstHeaderCell) {
    await sheetsRequest(`/values/${encodeURIComponent(headerRange)}?valueInputOption=RAW`, {
      method: "PUT",
      body: JSON.stringify({ values: [config.headers] })
    });
  }
}

async function upsertRow(config: RowConfig, record: Record<string, unknown>) {
  await ensureSheetTab(config);

  const recordId = text(record.id);
  if (!recordId) throw new Error(`Cannot sync ${config.tabName} record without an id.`);

  const values = config.map(record).map(text);
  const idRange = `${quoteSheetName(config.tabName)}!A:A`;
  const existingIds = await sheetsRequest<{ values?: string[][] }>(`/values/${encodeURIComponent(idRange)}`);
  const rowIndex = existingIds.values?.findIndex((row) => row[0] === recordId) ?? -1;

  if (rowIndex >= 1) {
    const targetRow = rowIndex + 1;
    const updateRange = `${quoteSheetName(config.tabName)}!A${targetRow}:${columnName(config.headers.length)}${targetRow}`;
    await sheetsRequest(`/values/${encodeURIComponent(updateRange)}?valueInputOption=USER_ENTERED`, {
      method: "PUT",
      body: JSON.stringify({ values: [values] })
    });
    return;
  }

  const appendRange = `${quoteSheetName(config.tabName)}!A:${columnName(config.headers.length)}`;
  await sheetsRequest(`/values/${encodeURIComponent(appendRange)}:append?valueInputOption=USER_ENTERED&insertDataOption=INSERT_ROWS`, {
    method: "POST",
    body: JSON.stringify({ values: [values] })
  });
}

function columnName(index: number) {
  let name = "";
  let current = index;
  while (current > 0) {
    const remainder = (current - 1) % 26;
    name = String.fromCharCode(65 + remainder) + name;
    current = Math.floor((current - 1) / 26);
  }
  return name;
}

export async function syncRecordToGoogleSheets(
  recordType: SyncableRecordType,
  record: Record<string, unknown>,
  action: SyncAction = "UPSERT",
  options: { force?: boolean } = {}
): Promise<SyncResult> {
  const recordId = text(record.id);
  const configured = isConfigured();

  if (!configured) {
    await logSyncAttempt(recordType, recordId, action, "FAILED", "Google Sheets credentials are not configured.");
    await markSyncSnapshot("FAILED", "Google Sheets credentials are not configured.");
    return { ok: false, configured: false, message: "Google Sheets credentials are not configured." };
  }

  if (!options.force && !(await isAutomaticSyncEnabled())) {
    return { ok: true, configured: true, message: "Google Sheets automatic sync is disabled." };
  }

  try {
    await upsertRow(rowConfigs[recordType], record);
    await logSyncAttempt(recordType, recordId, action, "SUCCESS");
    await markSyncSnapshot("SUCCESS", `${recordType} ${recordId} synced successfully.`);
    return { ok: true, configured: true, message: "Synced to Google Sheets." };
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown Google Sheets sync error.";
    console.error(`Google Sheets sync failed for ${recordType} ${recordId}:`, error);
    await logSyncAttempt(recordType, recordId, action, "FAILED", message);
    await markSyncSnapshot("FAILED", message);
    return { ok: false, configured: true, message };
  }
}

export async function testGoogleSheetsConnection(): Promise<SyncResult> {
  if (!isConfigured()) {
    await markSyncSnapshot("FAILED", "Google Sheets credentials are not configured.");
    await logSyncAttempt("GoogleSheets", "connection", "TEST", "FAILED", "Google Sheets credentials are not configured.");
    return { ok: false, configured: false, message: "Google Sheets credentials are not configured." };
  }

  try {
    await sheetsRequest("");
    await Promise.all(Object.values(rowConfigs).map(ensureSheetTab));
    await logSyncAttempt("GoogleSheets", "connection", "TEST", "SUCCESS");
    await markSyncSnapshot("SUCCESS", "Google Sheets connection test passed.");
    return { ok: true, configured: true, message: "Google Sheets connection test passed." };
  } catch (error) {
    const message = error instanceof Error ? error.message : "Google Sheets connection test failed.";
    await logSyncAttempt("GoogleSheets", "connection", "TEST", "FAILED", message);
    await markSyncSnapshot("FAILED", message);
    return { ok: false, configured: true, message };
  }
}

export async function syncAllExistingDataToGoogleSheets(): Promise<SyncResult> {
  if (!isConfigured()) {
    await markSyncSnapshot("FAILED", "Google Sheets credentials are not configured.");
    await logSyncAttempt("GoogleSheets", "bulk-sync", "BULK_SYNC", "FAILED", "Google Sheets credentials are not configured.");
    return { ok: false, configured: false, message: "Google Sheets credentials are not configured.", synced: 0, failed: 0 };
  }

  const datasets: Array<[SyncableRecordType, Array<Record<string, unknown>>]> = [
    ["Lead", await prisma.lead.findMany({ include: { assignedTo: true }, orderBy: { createdAt: "asc" } })],
    ["Application", await prisma.application.findMany({ orderBy: { createdAt: "asc" } })],
    ["Customer", await prisma.customer.findMany({ orderBy: { createdAt: "asc" } })],
    ["Subscription", await prisma.subscription.findMany({ include: { customer: true, expense: true }, orderBy: { createdAt: "asc" } })],
    ["Payment", await prisma.payment.findMany({ include: { customer: true }, orderBy: { createdAt: "asc" } })],
    ["Expense", await prisma.expense.findMany({ orderBy: { createdAt: "asc" } })],
    ["AccountProgress", await prisma.accountProgress.findMany({ include: { customer: true }, orderBy: { createdAt: "asc" } })],
    ["ProfitShare", await prisma.profitShare.findMany({ include: { customer: true }, orderBy: { createdAt: "asc" } })],
    [
      "CommunicationLog",
      await prisma.communicationLog.findMany({ include: { lead: true, customer: true, application: true }, orderBy: { createdAt: "asc" } })
    ],
    ["ActivityLog", await prisma.activityLog.findMany({ orderBy: { createdAt: "asc" } })]
  ];

  let synced = 0;
  let failed = 0;

  for (const [recordType, records] of datasets) {
    for (const record of records) {
      const result = await syncRecordToGoogleSheets(recordType, record, "BULK_SYNC", { force: true });
      if (result.ok) {
        synced += 1;
      } else {
        failed += 1;
      }
    }
  }

  const message = `Google Sheets bulk sync finished. Synced: ${synced}. Failed: ${failed}.`;
  await markSyncSnapshot(failed ? "FAILED" : "SUCCESS", message);
  return { ok: failed === 0, configured: true, message, synced, failed };
}

export async function getGoogleSheetsSyncSnapshot() {
  const [enabled, settings, latestLog] = await Promise.all([
    isAutomaticSyncEnabled(),
    prisma.setting.findMany({
      where: {
        key: {
          in: ["google_sheets_last_sync_status", "google_sheets_last_sync_time", "google_sheets_last_sync_result"]
        }
      }
    }),
    prisma.syncLog.findFirst({ orderBy: { createdAt: "desc" } }).catch(() => null)
  ]);
  const settingMap = Object.fromEntries(settings.map((setting) => [setting.key, setting.value]));
  const config = getGoogleSheetsConfig();

  return {
    configured: isConfigured(),
    enabled,
    spreadsheetId: config.spreadsheetId ?? "",
    clientEmail: config.clientEmail ?? "",
    lastSyncStatus: settingMap.google_sheets_last_sync_status ?? latestLog?.status ?? "Not run yet",
    lastSyncResult: settingMap.google_sheets_last_sync_result ?? latestLog?.status ?? "PENDING",
    lastSyncTime: settingMap.google_sheets_last_sync_time ?? latestLog?.createdAt?.toISOString() ?? ""
  };
}

export async function setGoogleSheetsSyncEnabled(enabled: boolean) {
  await prisma.setting.upsert({
    where: { key: "google_sheets_sync_enabled" },
    update: { value: String(enabled) },
    create: { key: "google_sheets_sync_enabled", value: String(enabled) }
  });
}
