import { PrismaClient } from "@prisma/client";

const requiredEnv = ["DATABASE_URL", "DIRECT_URL", "NEXTAUTH_SECRET", "NEXTAUTH_URL", "ADMIN_EMAIL", "ADMIN_PASSWORD"];

// Revenue-critical: these gate real money movement and signal delivery, so a
// missing key here is treated as a launch blocker, not just a warning.
const criticalProviderEnv = {
  "Paystack (VIP payments)": ["PAYSTACK_SECRET_KEY"],
  "Telegram bot (VIP signal delivery)": ["TELEGRAM_BOT_TOKEN"]
};

const optionalProviderEnv = {
  // Sendy list delivery works if either the shared fallback list or at least
  // one per-audience list is configured (see src/lib/drip-engine.ts and
  // src/lib/message-workflows.ts).
  Sendy: {
    keys: ["SENDY_BASE_URL", "SENDY_API_KEY"],
    anyOf: [
      "SENDY_LIST_ID",
      "SENDY_LIST_ID_VIP_SIGNALS",
      "SENDY_LIST_ID_COPY_TRADING",
      "SENDY_LIST_ID_EVALUATION",
      "SENDY_LIST_ID_INSTANT_FUNDED",
      "SENDY_LIST_ID_CLIENTS"
    ]
  },
  "Sendy transactional email": { keys: ["SENDY_TRANSACTIONAL_ENDPOINT"] },
  WhatsApp: { keys: ["WHATSAPP_API_TOKEN", "WHATSAPP_PHONE_NUMBER_ID"] },
  SMS: { keys: ["SMS_API_URL", "SMS_API_KEY", "SMS_SENDER_ID"] },
  "Google Sheets": { keys: ["GOOGLE_SHEETS_CLIENT_EMAIL", "GOOGLE_SHEETS_PRIVATE_KEY", "GOOGLE_SHEETS_SPREADSHEET_ID"] }
};

const tableChecks = {
  users: (prisma) => prisma.user.count(),
  leads: (prisma) => prisma.lead.count(),
  applications: (prisma) => prisma.application.count(),
  customers: (prisma) => prisma.customer.count(),
  subscriptions: (prisma) => prisma.subscription.count(),
  payments: (prisma) => prisma.payment.count(),
  expenses: (prisma) => prisma.expense.count(),
  accountProgress: (prisma) => prisma.accountProgress.count(),
  profitShares: (prisma) => prisma.profitShare.count(),
  communications: (prisma) => prisma.communicationLog.count(),
  settings: (prisma) => prisma.setting.count(),
  syncLogs: (prisma) => prisma.syncLog.count()
};

function maskStatus(value) {
  return value ? "set" : "missing";
}

function isWeakSecret(value) {
  if (!value) return true;
  return value.length < 32 || /change|secret|password|admin/i.test(value);
}

function isWeakPassword(value) {
  if (!value) return true;
  return value.length < 12 || !/[a-z]/i.test(value) || !/[0-9]/.test(value) || !/[^a-z0-9]/i.test(value);
}

function printSection(title) {
  console.log(`\n${title}`);
  console.log("-".repeat(title.length));
}

let failed = false;
let warned = false;

printSection("Environment");
for (const key of requiredEnv) {
  const status = maskStatus(process.env[key]);
  console.log(`${key}: ${status}`);
  if (!process.env[key]) failed = true;
}

if (isWeakSecret(process.env.NEXTAUTH_SECRET)) {
  console.log("NEXTAUTH_SECRET safety: needs a long random production secret");
  failed = true;
} else {
  console.log("NEXTAUTH_SECRET safety: ok");
}

if (isWeakPassword(process.env.ADMIN_PASSWORD)) {
  console.log("ADMIN_PASSWORD safety: needs a stronger launch password");
  failed = true;
} else {
  console.log("ADMIN_PASSWORD safety: ok");
}

printSection("Critical Integrations");
for (const [label, keys] of Object.entries(criticalProviderEnv)) {
  const ready = keys.every((key) => Boolean(process.env[key]));
  console.log(`${label}: ${ready ? "configured" : "MISSING"}`);
  if (!ready) failed = true;
}

printSection("Optional Integrations");
for (const [label, { keys, anyOf }] of Object.entries(optionalProviderEnv)) {
  const keysReady = keys.every((key) => Boolean(process.env[key]));
  const anyOfReady = !anyOf || anyOf.some((key) => Boolean(process.env[key]));
  const ready = keysReady && anyOfReady;
  console.log(`${label}: ${ready ? "configured" : "not fully configured"}`);
  if (!ready) warned = true;
}

printSection("Live Database");
const prisma = new PrismaClient({ log: ["error"] });
try {
  const counts = {};
  for (const [name, check] of Object.entries(tableChecks)) {
    counts[name] = await check(prisma);
  }

  for (const [name, count] of Object.entries(counts)) {
    console.log(`${name}: ${count}`);
  }
} catch (error) {
  failed = true;
  console.log("Database status: failed");
  console.log(`Reason: ${error.message?.split("\n").filter(Boolean).at(-1) ?? "Unknown database error"}`);
} finally {
  await prisma.$disconnect();
}

printSection("Result");
if (failed) {
  console.log("Not ready for live operations yet. Fix the failed items above, then run npm run readiness again.");
  process.exit(1);
}

if (warned) {
  console.log("Core site is ready, but one or more optional integrations are not configured.");
  process.exit(0);
}

console.log("Ready for live operations.");
