import bcrypt from "bcryptjs";
import { PrismaClient, RoleName, ServiceType } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  for (const name of Object.values(RoleName)) {
    await prisma.role.upsert({
      where: { name },
      update: {},
      create: { name, description: name.replaceAll("_", " ") }
    });
  }

  const superAdminRole = await prisma.role.findUniqueOrThrow({ where: { name: "SUPER_ADMIN" } });
  await prisma.user.upsert({
    where: { email: process.env.ADMIN_EMAIL ?? "admin@smartprofitabletrader.com" },
    update: {},
    create: {
      name: "Super Admin",
      email: process.env.ADMIN_EMAIL ?? "admin@smartprofitabletrader.com",
      passwordHash: await bcrypt.hash(process.env.ADMIN_PASSWORD ?? "ChangeMe123!", 10),
      roleId: superAdminRole.id
    }
  });

  const serviceCopy: Record<ServiceType, string> = {
    COPY_TRADING: "Copy Trading Subscription",
    FUNDED_ACCOUNT: "Funded Account Trading",
    EVALUATION_ACCOUNT: "Evaluation Account Management",
    PERSONAL_ACCOUNT: "Personal Trading Account Management",
    GENERAL_INQUIRY: "General Inquiry"
  };

  for (const [type, name] of Object.entries(serviceCopy) as Array<[ServiceType, string]>) {
    await prisma.service.upsert({
      where: { type },
      update: {},
      create: { type, name, description: `${name} service workflow` }
    });
  }

  const leadNames = ["Amara Okafor", "Daniel Reed", "Grace Mensah", "Owen Carter", "Priya Shah", "Samuel Adeyemi", "Lina Brooks", "Kwame Boateng", "Maya Chen", "Ibrahim Bello"];
  for (let index = 0; index < leadNames.length; index += 1) {
    await prisma.lead.create({
      data: {
        fullName: leadNames[index],
        email: `${leadNames[index].toLowerCase().replaceAll(" ", ".")}@example.com`,
        phone: `+1 555 010${index}`,
        whatsapp: `+234 800 000 10${index}`,
        country: index % 2 ? "United States" : "Nigeria",
        city: index % 2 ? "New York" : "Lagos",
        leadSource: index % 2 ? "Referral" : "Instagram",
        campaignName: index % 2 ? "June Growth" : "Prop Firm Push",
        serviceInterest: [ServiceType.COPY_TRADING, ServiceType.FUNDED_ACCOUNT, ServiceType.EVALUATION_ACCOUNT, ServiceType.PERSONAL_ACCOUNT][index % 4],
        priority: index % 3 === 0 ? "High" : "Medium",
        notes: "Seed lead for CRM testing."
      }
    });
  }

  const customerTypes = [ServiceType.COPY_TRADING, ServiceType.FUNDED_ACCOUNT, ServiceType.EVALUATION_ACCOUNT, ServiceType.PERSONAL_ACCOUNT];
  for (let index = 0; index < 10; index += 1) {
    const type = customerTypes[index % customerTypes.length];
    const customer = await prisma.customer.create({
      data: {
        fullName: `Sample Customer ${index + 1}`,
        email: `customer${index + 1}@example.com`,
        phone: `+44 20 000${index}`,
        whatsapp: `+234 810 000 20${index}`,
        country: index % 2 ? "United Kingdom" : "Nigeria",
        customerType: type,
        platform: index % 2 ? "MT5" : "MT4",
        brokerOrPropFirm: index % 2 ? "FTMO" : "IC Markets",
        accountLogin: `${802340 + index}`,
        initialCapital: 10000 + index * 5000,
        currentBalance: 10800 + index * 5300,
        currentEquity: 10700 + index * 5250,
        status: index % 2 ? "ACTIVE" : "PENDING_SETUP",
        renewalDate: new Date(Date.now() + (index + 2) * 86400000),
        setupFeeStatus: index % 2 ? "PAID" : "PENDING",
        notes: "Seed customer for dashboard testing."
      }
    });

    await prisma.payment.create({
      data: {
        customerId: customer.id,
        serviceType: type,
        amount: 150 + index * 100,
        currency: "USD",
        status: index % 3 === 0 ? "PENDING" : "PAID",
        paymentMethod: index % 2 ? "Bank Transfer" : "Card",
        invoiceRef: `INV-${3000 + index}`
      }
    });

    await prisma.profitShare.create({
      data: {
        customerId: customer.id,
        totalProfit: 1000 + index * 750,
        clientSharePct: index % 2 ? 50 : 65,
        companySharePct: index % 2 ? 50 : 35,
        clientShare: (1000 + index * 750) * (index % 2 ? 0.5 : 0.65),
        companyShare: (1000 + index * 750) * (index % 2 ? 0.5 : 0.35),
        amountPaid: index % 3 === 0 ? (1000 + index * 750) * 0.35 : 0,
        amountPending: index % 3 === 0 ? 0 : (1000 + index * 750) * 0.35
      }
    });
  }

  for (const expense of ["Codex monthly fee", "VPS", "Trade copier", "Router data subscription", "Domain/hosting", "Email software", "WhatsApp/SMS software", "Staff/assistant", "Internet/data", "Software subscriptions"]) {
    await prisma.expense.create({
      data: {
        name: expense,
        category: expense,
        amount: 100,
        billingCycle: "MONTHLY",
        status: "UPCOMING",
        renewalDate: new Date(Date.now() + 7 * 86400000)
      }
    });
  }

  await prisma.setting.upsert({
    where: { key: "company" },
    update: {},
    create: {
      key: "company",
      value: {
        name: "Smart Profitable Trader",
        colors: ["#071427", "#20c76f", "#ffffff", "#f5f7fa"]
      }
    }
  });
}

main()
  .then(async () => prisma.$disconnect())
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });
