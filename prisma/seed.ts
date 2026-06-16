import bcrypt from "bcryptjs";
import { AccountPlatform, CustomerStatus, CustomerType, LeadStatus, PrismaClient, UserRole } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const adminEmail = process.env.ADMIN_EMAIL ?? "admin@smartprofitabletrader.com";
  const adminPassword = process.env.ADMIN_PASSWORD ?? "ChangeMe123!";

  const admin = await prisma.user.upsert({
    where: { email: adminEmail },
    update: {
      name: "Super Admin",
      role: UserRole.SUPER_ADMIN
    },
    create: {
      name: "Super Admin",
      email: adminEmail,
      passwordHash: await bcrypt.hash(adminPassword, 12),
      role: UserRole.SUPER_ADMIN
    }
  });

  const leads = [
    ["Amara Okafor", "amara@example.com", "Copy Trading", "Instagram", LeadStatus.NEW],
    ["Daniel Reed", "daniel@example.com", "VIP Signals", "Referral", LeadStatus.CONTACTED],
    ["Grace Mensah", "grace@example.com", "Instant Funded", "WhatsApp", LeadStatus.INTERESTED],
    ["Owen Carter", "owen@example.com", "Evaluation", "Google", LeadStatus.FOLLOW_UP]
  ] as const;

  for (const [fullName, email, serviceInterest, leadSource, status] of leads) {
    await prisma.lead.upsert({
      where: { id: `seed-${email}` },
      update: {},
      create: {
        id: `seed-${email}`,
        fullName,
        email,
        phone: "+234 700 000 0000",
        whatsapp: "+234 708 797 0133",
        country: "Nigeria",
        city: "Lagos",
        serviceInterest,
        leadSource,
        status,
        assignedToId: admin.id,
        notes: "Seed lead for CRM testing.",
        nextFollowUpAt: new Date(Date.now() + 3 * 86400000)
      }
    });
  }

  const applications = [
    ["Maya Chen", "maya@example.com", "Copy Trading Subscription", "5000"],
    ["Ibrahim Bello", "ibrahim@example.com", "Smart Profitable Trader VIP Signal Service", "200"],
    ["Priya Shah", "priya@example.com", "Evaluation Account Management", "50000"]
  ] as const;

  for (const [fullName, email, service, startingCapital] of applications) {
    await prisma.application.upsert({
      where: { id: `seed-${email}` },
      update: {},
      create: {
        id: `seed-${email}`,
        fullName,
        email,
        phone: "+1 555 0100",
        whatsapp: "+234 708 797 0133",
        country: "Nigeria",
        city: "Lagos",
        service,
        startingCapital,
        broker: "MT5 Broker",
        tradingExperience: "Beginner",
        message: "Seed application for admin testing."
      }
    });
  }

  const customers = [
    ["Sophia Williams", "sophia@example.com", CustomerType.VIP_SIGNALS, CustomerStatus.ACTIVE],
    ["Malik Johnson", "malik@example.com", CustomerType.COPY_TRADING, CustomerStatus.ACTIVE],
    ["Aisha Bello", "aisha@example.com", CustomerType.INSTANT_FUNDED, CustomerStatus.PENDING_SETUP],
    ["Noah Smith", "noah@example.com", CustomerType.EVALUATION, CustomerStatus.ACTIVE]
  ] as const;

  for (const [fullName, email, customerType, status] of customers) {
    await prisma.customer.upsert({
      where: { id: `seed-${email}` },
      update: {},
      create: {
        id: `seed-${email}`,
        fullName,
        email,
        phone: "+44 20 0000 0000",
        whatsapp: "+234 708 797 0133",
        country: "Nigeria",
        city: "Lagos",
        customerType,
        status,
        accountPlatform: AccountPlatform.MT5,
        brokerOrPropFirm: customerType === CustomerType.EVALUATION ? "FTMO" : "IC Markets",
        accountLogin: "802340",
        initialCapital: 10000,
        currentBalance: 10850,
        currentEquity: 10790,
        startDate: new Date(),
        renewalDate: new Date(Date.now() + 30 * 86400000),
        profitShareTier: "NO_SETUP_FEE",
        setupFeeStatus: "PENDING",
        notes: "Seed customer for dashboard testing."
      }
    });
  }

  const settings = {
    company_name: "Smart Profitable Trader",
    whatsapp_number: "+2347087970133",
    sendy_api_url: "",
    sendy_api_key: "",
    sms_provider: "",
    default_admin_email: adminEmail,
    logo_url: "/brand/spt-logo.png"
  };

  for (const [key, value] of Object.entries(settings)) {
    await prisma.setting.upsert({
      where: { key },
      update: { value },
      create: { key, value }
    });
  }
}

main()
  .then(async () => prisma.$disconnect())
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });
