import bcrypt from "bcryptjs";
import {
  AccountPlatform,
  BillingCycle,
  CommunicationChannel,
  CommunicationStatus,
  CustomerStatus,
  CustomerType,
  ExpensePaymentStatus,
  LeadStatus,
  PaymentStatus,
  PrismaClient,
  ProfitShareStatus,
  SubscriptionStatus,
  SubscriptionType,
  UserRole
} from "@prisma/client";

const prisma = new PrismaClient();

const now = new Date();
const day = 24 * 60 * 60 * 1000;

function decimal(value: number) {
  return value.toFixed(2);
}

async function main() {
  const adminEmail = (process.env.ADMIN_EMAIL ?? "admin@smartprofitabletrader.com").toLowerCase().trim();
  const adminPassword = process.env.ADMIN_PASSWORD ?? "ChangeMe123!";
  const adminPasswordHash = await bcrypt.hash(adminPassword, 12);

  const admin = await prisma.user.upsert({
    where: { email: adminEmail },
    update: {
      name: "Super Admin",
      passwordHash: adminPasswordHash,
      role: UserRole.SUPER_ADMIN
    },
    create: {
      name: "Super Admin",
      email: adminEmail,
      passwordHash: adminPasswordHash,
      role: UserRole.SUPER_ADMIN
    }
  });

  const leads = [
    ["Amara Okafor", "amara@example.com", "Copy Trading Subscription", "Instagram", "June Growth", LeadStatus.NEW],
    ["Daniel Reed", "daniel@example.com", "Smart Profitable Trader VIP Signal Service", "Referral", "VIP Push", LeadStatus.CONTACTED],
    ["Grace Mensah", "grace@example.com", "Funded Account Trading", "WhatsApp", "Funded Sprint", LeadStatus.INTERESTED],
    ["Owen Carter", "owen@example.com", "Evaluation Account Management", "Google", "Evaluation Drive", LeadStatus.FOLLOW_UP],
    ["Priya Shah", "priya@example.com", "Copy Trading Subscription", "Facebook", "Copy Conversion", LeadStatus.PAYMENT_PENDING],
    ["Samuel Adeyemi", "samuel@example.com", "Personal Trading Account Management", "YouTube", "Personal Alpha", LeadStatus.CONVERTED],
    ["Lina Brooks", "lina@example.com", "General Inquiry", "Website", "General Interest", LeadStatus.NOT_INTERESTED],
    ["Kwame Boateng", "kwame@example.com", "Funded Account Trading", "Campaign", "Funded Sprint", LeadStatus.INTERESTED],
    ["Maya Chen", "maya@example.com", "Evaluation Account Management", "LinkedIn", "Evaluation Drive", LeadStatus.CONTACTED],
    ["Ibrahim Bello", "ibrahim@example.com", "Smart Profitable Trader VIP Signal Service", "TikTok", "VIP Push", LeadStatus.LOST]
  ] as const;

  for (const [fullName, email, serviceInterest, leadSource, campaign, status] of leads) {
    await prisma.lead.upsert({
      where: { email },
      update: {
        fullName,
        phone: "+2347000000000",
        whatsapp: "+2347087970133",
        country: "Nigeria",
        city: "Lagos",
        serviceInterest,
        leadSource,
        campaign,
        status,
        assignedToId: admin.id,
        notes: "Seed lead for CRM readiness testing.",
        lastContactedAt: new Date(now.getTime() - 2 * day),
        nextFollowUpAt: new Date(now.getTime() + 3 * day)
      },
      create: {
        fullName,
        email,
        phone: "+2347000000000",
        whatsapp: "+2347087970133",
        country: "Nigeria",
        city: "Lagos",
        serviceInterest,
        leadSource,
        campaign,
        status,
        assignedToId: admin.id,
        notes: "Seed lead for CRM readiness testing.",
        lastContactedAt: new Date(now.getTime() - 2 * day),
        nextFollowUpAt: new Date(now.getTime() + 3 * day),
        activityLogs: {
          create: {
            type: "LEAD_CREATED",
            description: `Seed lead created for ${serviceInterest}.`,
            userId: admin.id
          }
        }
      }
    });
  }

  const applications = [
    ["Amina Yusuf", "amina@example.com", "Copy Trading Subscription", "5000", "IC Markets", ""],
    ["Ruth Gray", "ruth@example.com", "Smart Profitable Trader VIP Signal Service", "250", "", ""],
    ["Kelvin Hart", "kelvin@example.com", "Evaluation Account Management", "50000", "", "FTMO"],
    ["Jason Cole", "jason@example.com", "Funded Account Trading", "100000", "", "FundedNext"],
    ["Adaeze Obi", "adaeze@example.com", "Personal Trading Account Management", "10000", "Pepperstone", ""]
  ] as const;

  for (const [fullName, email, service, capital, broker, propFirm] of applications) {
    await prisma.application.upsert({
      where: { id: `seed-application-${email}` },
      update: {
        fullName,
        email,
        phone: "+2347011111111",
        whatsapp: "+2347087970133",
        country: "Nigeria",
        city: "Lagos",
        service,
        accountSize: capital,
        startingCapital: capital,
        broker: broker || null,
        propFirm: propFirm || null,
        tradingExperience: "Intermediate",
        message: "Seed application for workflow validation."
      },
      create: {
        id: `seed-application-${email}`,
        fullName,
        email,
        phone: "+2347011111111",
        whatsapp: "+2347087970133",
        country: "Nigeria",
        city: "Lagos",
        service,
        accountSize: capital,
        startingCapital: capital,
        broker: broker || null,
        propFirm: propFirm || null,
        tradingExperience: "Intermediate",
        message: "Seed application for workflow validation.",
        activityLogs: {
          create: {
            type: "APPLICATION_SUBMITTED",
            description: `Seed application submitted for ${service}.`
          }
        }
      }
    });
  }

  const customers = [
    ["Sophia Williams", "sophia@example.com", CustomerType.VIP_SIGNALS, CustomerStatus.ACTIVE, 250, 250, 250, "IC Markets", AccountPlatform.MT5],
    ["Malik Johnson", "malik@example.com", CustomerType.COPY_TRADING, CustomerStatus.ACTIVE, 5000, 5650, 5580, "IC Markets", AccountPlatform.MT5],
    ["Aisha Bello", "aisha@example.com", CustomerType.INSTANT_FUNDED, CustomerStatus.PENDING_SETUP, 100000, 106800, 105950, "FundedNext", AccountPlatform.TRADELOCKER],
    ["Noah Smith", "noah@example.com", CustomerType.EVALUATION, CustomerStatus.ACTIVE, 50000, 53250, 53020, "FTMO", AccountPlatform.MT5],
    ["Chinedu Nwosu", "chinedu@example.com", CustomerType.COPY_TRADING, CustomerStatus.ACTIVE, 3000, 3270, 3235, "Exness", AccountPlatform.MT4],
    ["Emily Davis", "emily@example.com", CustomerType.EVALUATION, CustomerStatus.ACTIVE, 100000, 104600, 103900, "The5ers", AccountPlatform.TRADELOCKER],
    ["Tunde Hassan", "tunde@example.com", CustomerType.INSTANT_FUNDED, CustomerStatus.FUNDED, 200000, 214300, 213000, "FundedNext", AccountPlatform.MT5],
    ["Olivia Garcia", "olivia@example.com", CustomerType.PERSONAL_ACCOUNT, CustomerStatus.PAUSED, 15000, 14820, 14790, "Oanda", AccountPlatform.OTHER],
    ["Victor Allen", "victor@example.com", CustomerType.COPY_TRADING, CustomerStatus.ACTIVE, 10000, 11100, 10980, "FXTM", AccountPlatform.MT4],
    ["Nadia Ali", "nadia@example.com", CustomerType.EVALUATION, CustomerStatus.SUSPENDED, 25000, 23880, 23710, "E8", AccountPlatform.MT5]
  ] as const;

  for (const [fullName, email, customerType, status, initialCapital, currentBalance, currentEquity, brokerOrPropFirm, accountPlatform] of customers) {
    const customer = await prisma.customer.upsert({
      where: { email },
      update: {
        fullName,
        phone: "+2347022222222",
        whatsapp: "+2347087970133",
        dateOfBirth: new Date(1990 + (fullName.length % 12), (fullName.length * 2) % 12, ((fullName.length * 3) % 27) + 1),
        country: "Nigeria",
        city: "Lagos",
        customerType,
        accountPlatform,
        brokerOrPropFirm,
        accountLogin: `ACC-${email.slice(0, 4).toUpperCase()}`,
        initialCapital: decimal(initialCapital),
        currentBalance: decimal(currentBalance),
        currentEquity: decimal(currentEquity),
        status,
        startDate: new Date(now.getTime() - 21 * day),
        renewalDate: new Date(now.getTime() + 14 * day),
        profitShareTier: customerType === CustomerType.COPY_TRADING || customerType === CustomerType.PERSONAL_ACCOUNT ? "NO_SETUP_FEE" : "SETUP_FEE",
        setupFeeStatus: customerType === CustomerType.COPY_TRADING ? "PENDING" : "PAID",
        notes: "Seed customer for admin and finance workflow testing."
      },
      create: {
        fullName,
        email,
        phone: "+2347022222222",
        whatsapp: "+2347087970133",
        dateOfBirth: new Date(1990 + (fullName.length % 12), (fullName.length * 2) % 12, ((fullName.length * 3) % 27) + 1),
        country: "Nigeria",
        city: "Lagos",
        customerType,
        accountPlatform,
        brokerOrPropFirm,
        accountLogin: `ACC-${email.slice(0, 4).toUpperCase()}`,
        initialCapital: decimal(initialCapital),
        currentBalance: decimal(currentBalance),
        currentEquity: decimal(currentEquity),
        status,
        startDate: new Date(now.getTime() - 21 * day),
        renewalDate: new Date(now.getTime() + 14 * day),
        profitShareTier: customerType === CustomerType.COPY_TRADING || customerType === CustomerType.PERSONAL_ACCOUNT ? "NO_SETUP_FEE" : "SETUP_FEE",
        setupFeeStatus: customerType === CustomerType.COPY_TRADING ? "PENDING" : "PAID",
        notes: "Seed customer for admin and finance workflow testing.",
        activityLogs: {
          create: {
            type: "CUSTOMER_CREATED",
            description: `Seed customer created for ${customerType}.`,
            userId: admin.id
          }
        }
      }
    });

    await prisma.accountProgress.upsert({
      where: { id: `progress-${customer.id}` },
      update: {
        serviceType: customerType,
        phase: customerType === CustomerType.EVALUATION ? "Phase 1" : customerType === CustomerType.INSTANT_FUNDED ? "Funded" : null,
        accountSize: decimal(initialCapital),
        currentBalance: decimal(currentBalance),
        currentEquity: decimal(currentEquity),
        profitTarget: decimal(customerType === CustomerType.EVALUATION ? initialCapital * 0.1 : initialCapital * 0.05),
        currentProfit: decimal(currentBalance - initialCapital),
        growthPercentage: decimal(((currentBalance - initialCapital) / initialCapital) * 100),
        drawdownLimit: decimal(initialCapital * 0.1),
        currentDrawdown: decimal(Math.max(0, initialCapital - currentEquity)),
        dailyDrawdown: decimal(Math.max(0, initialCapital - currentEquity) / 3),
        maxDrawdown: decimal(Math.max(0, initialCapital - currentEquity)),
        daysTraded: 9,
        minimumTradeDays: customerType === CustomerType.EVALUATION ? 5 : 0,
        status: status
      },
      create: {
        id: `progress-${customer.id}`,
        customerId: customer.id,
        serviceType: customerType,
        phase: customerType === CustomerType.EVALUATION ? "Phase 1" : customerType === CustomerType.INSTANT_FUNDED ? "Funded" : null,
        accountSize: decimal(initialCapital),
        currentBalance: decimal(currentBalance),
        currentEquity: decimal(currentEquity),
        profitTarget: decimal(customerType === CustomerType.EVALUATION ? initialCapital * 0.1 : initialCapital * 0.05),
        currentProfit: decimal(currentBalance - initialCapital),
        growthPercentage: decimal(((currentBalance - initialCapital) / initialCapital) * 100),
        drawdownLimit: decimal(initialCapital * 0.1),
        currentDrawdown: decimal(Math.max(0, initialCapital - currentEquity)),
        dailyDrawdown: decimal(Math.max(0, initialCapital - currentEquity) / 3),
        maxDrawdown: decimal(Math.max(0, initialCapital - currentEquity)),
        daysTraded: 9,
        minimumTradeDays: customerType === CustomerType.EVALUATION ? 5 : 0,
        status: status,
        notes: "Seed account progress entry.",
        activityLogs: {
          create: {
            type: "ACCOUNT_PROGRESS_CREATED",
            description: `Seed account progress created for ${fullName}.`,
            userId: admin.id
          }
        }
      }
    });

    await prisma.subscription.upsert({
      where: { id: `subscription-${customer.id}` },
      update: {
        name: `${fullName} Subscription`,
        type: SubscriptionType.CUSTOMER_SUBSCRIPTION,
        relatedName: fullName,
        amount: decimal(customerType === CustomerType.VIP_SIGNALS ? 150 : customerType === CustomerType.COPY_TRADING ? 300 : 500),
        currency: "USD",
        startDate: new Date(now.getTime() - 21 * day),
        renewalDate: new Date(now.getTime() + 14 * day),
        billingCycle: BillingCycle.MONTHLY,
        status: SubscriptionStatus.ACTIVE,
        reminderEnabled: true,
        notes: "Seed subscription."
      },
      create: {
        id: `subscription-${customer.id}`,
        name: `${fullName} Subscription`,
        type: SubscriptionType.CUSTOMER_SUBSCRIPTION,
        customerId: customer.id,
        relatedName: fullName,
        amount: decimal(customerType === CustomerType.VIP_SIGNALS ? 150 : customerType === CustomerType.COPY_TRADING ? 300 : 500),
        currency: "USD",
        startDate: new Date(now.getTime() - 21 * day),
        renewalDate: new Date(now.getTime() + 14 * day),
        billingCycle: BillingCycle.MONTHLY,
        status: SubscriptionStatus.ACTIVE,
        reminderEnabled: true,
        notes: "Seed subscription.",
        activityLogs: {
          create: {
            type: "SUBSCRIPTION_CREATED",
            description: `Seed subscription created for ${fullName}.`,
            userId: admin.id
          }
        }
      }
    });

    await prisma.payment.upsert({
      where: { id: `payment-${customer.id}` },
      update: {
        serviceType: customerType,
        amount: decimal(customerType === CustomerType.VIP_SIGNALS ? 150 : customerType === CustomerType.COPY_TRADING ? 300 : 750),
        currency: "USD",
        paymentDate: new Date(now.getTime() - 7 * day),
        paymentMethod: "Bank Transfer",
        status: PaymentStatus.PAID,
        invoiceReference: `INV-${customer.id.slice(-6).toUpperCase()}`,
        notes: "Seed payment record."
      },
      create: {
        id: `payment-${customer.id}`,
        customerId: customer.id,
        serviceType: customerType,
        amount: decimal(customerType === CustomerType.VIP_SIGNALS ? 150 : customerType === CustomerType.COPY_TRADING ? 300 : 750),
        currency: "USD",
        paymentDate: new Date(now.getTime() - 7 * day),
        paymentMethod: "Bank Transfer",
        status: PaymentStatus.PAID,
        invoiceReference: `INV-${customer.id.slice(-6).toUpperCase()}`,
        notes: "Seed payment record.",
        activityLogs: {
          create: {
            type: "PAYMENT_RECORDED",
            description: `Seed payment recorded for ${fullName}.`,
            userId: admin.id
          }
        }
      }
    });

    if (customerType !== CustomerType.VIP_SIGNALS) {
      const totalProfit = Math.max(0, currentBalance - initialCapital);
      const companyPercentage = customerType === CustomerType.COPY_TRADING || customerType === CustomerType.PERSONAL_ACCOUNT ? 50 : 35;
      const clientPercentage = 100 - companyPercentage;

      await prisma.profitShare.upsert({
        where: { id: `profitshare-${customer.id}` },
        update: {
          totalProfit: decimal(totalProfit),
          clientPercentage: decimal(clientPercentage),
          companyPercentage: decimal(companyPercentage),
          clientShare: decimal(totalProfit * (clientPercentage / 100)),
          companyShare: decimal(totalProfit * (companyPercentage / 100)),
          amountPaid: decimal(totalProfit * (companyPercentage / 100) * 0.5),
          amountPending: decimal(totalProfit * (companyPercentage / 100) * 0.5),
          paymentDate: new Date(now.getTime() - 5 * day),
          status: ProfitShareStatus.PARTIALLY_PAID,
          notes: "Seed profit share record."
        },
        create: {
          id: `profitshare-${customer.id}`,
          customerId: customer.id,
          totalProfit: decimal(totalProfit),
          clientPercentage: decimal(clientPercentage),
          companyPercentage: decimal(companyPercentage),
          clientShare: decimal(totalProfit * (clientPercentage / 100)),
          companyShare: decimal(totalProfit * (companyPercentage / 100)),
          amountPaid: decimal(totalProfit * (companyPercentage / 100) * 0.5),
          amountPending: decimal(totalProfit * (companyPercentage / 100) * 0.5),
          paymentDate: new Date(now.getTime() - 5 * day),
          status: ProfitShareStatus.PARTIALLY_PAID,
          notes: "Seed profit share record.",
          activityLogs: {
            create: {
              type: "PROFIT_SHARE_CREATED",
              description: `Seed profit-share record created for ${fullName}.`,
              userId: admin.id
            }
          }
        }
      });
    }

    await prisma.communicationLog.upsert({
      where: { id: `communication-${customer.id}` },
      update: {
        channel: CommunicationChannel.EMAIL,
        recipient: customer.email,
        subject: "Welcome to Smart Profitable Trader",
        message: "Your account setup is being processed. Our team will follow up with your next steps.",
        status: CommunicationStatus.SENT,
        sentAt: new Date(now.getTime() - day)
      },
      create: {
        id: `communication-${customer.id}`,
        channel: CommunicationChannel.EMAIL,
        recipient: customer.email,
        subject: "Welcome to Smart Profitable Trader",
        message: "Your account setup is being processed. Our team will follow up with your next steps.",
        status: CommunicationStatus.SENT,
        sentAt: new Date(now.getTime() - day),
        customerId: customer.id
      }
    });
  }

  const businessExpenses = [
    ["Codex monthly fee", "Software subscriptions", 200, BillingCycle.MONTHLY, ExpensePaymentStatus.PAID],
    ["VPS", "Infrastructure", 85, BillingCycle.MONTHLY, ExpensePaymentStatus.UPCOMING],
    ["Trade copier", "Operations", 350, BillingCycle.MONTHLY, ExpensePaymentStatus.UPCOMING],
    ["Router data subscription", "Internet/data", 70, BillingCycle.MONTHLY, ExpensePaymentStatus.OVERDUE],
    ["Domain/hosting", "Domain/hosting", 160, BillingCycle.YEARLY, ExpensePaymentStatus.PAID]
  ] as const;

  for (const [name, category, amount, billingCycle, paymentStatus] of businessExpenses) {
    const expense = await prisma.expense.upsert({
      where: { id: `expense-${name.toLowerCase().replaceAll(/[^a-z0-9]+/g, "-")}` },
      update: {
        name,
        category,
        amount: decimal(amount),
        currency: "USD",
        billingCycle,
        dueDate: new Date(now.getTime() + 7 * day),
        renewalDate: new Date(now.getTime() + 7 * day),
        paymentStatus,
        paymentMethod: "Card",
        vendor: "Operations Vendor",
        notes: "Seed expense record."
      },
      create: {
        id: `expense-${name.toLowerCase().replaceAll(/[^a-z0-9]+/g, "-")}`,
        name,
        category,
        amount: decimal(amount),
        currency: "USD",
        billingCycle,
        dueDate: new Date(now.getTime() + 7 * day),
        renewalDate: new Date(now.getTime() + 7 * day),
        paymentStatus,
        paymentMethod: "Card",
        vendor: "Operations Vendor",
        notes: "Seed expense record.",
        activityLogs: {
          create: {
            type: "EXPENSE_CREATED",
            description: `Seed expense created for ${name}.`,
            userId: admin.id
          }
        }
      }
    });

    await prisma.subscription.upsert({
      where: { expenseId: expense.id },
      update: {
        name,
        type: SubscriptionType.BUSINESS_EXPENSE,
        relatedName: expense.vendor,
        amount: decimal(amount),
        currency: "USD",
        startDate: new Date(now.getTime() - 30 * day),
        renewalDate: expense.renewalDate,
        billingCycle,
        status: paymentStatus === ExpensePaymentStatus.OVERDUE ? SubscriptionStatus.OVERDUE : SubscriptionStatus.ACTIVE,
        reminderEnabled: true,
        notes: `Subscription mirror for ${name}.`
      },
      create: {
        name,
        type: SubscriptionType.BUSINESS_EXPENSE,
        expenseId: expense.id,
        relatedName: expense.vendor,
        amount: decimal(amount),
        currency: "USD",
        startDate: new Date(now.getTime() - 30 * day),
        renewalDate: expense.renewalDate,
        billingCycle,
        status: paymentStatus === ExpensePaymentStatus.OVERDUE ? SubscriptionStatus.OVERDUE : SubscriptionStatus.ACTIVE,
        reminderEnabled: true,
        notes: `Subscription mirror for ${name}.`,
        activityLogs: {
          create: {
            type: "SUBSCRIPTION_CREATED",
            description: `Business expense subscription created for ${name}.`,
            userId: admin.id
          }
        }
      }
    });
  }

  const settings = {
    company_name: "Smart Profitable Trader",
    whatsapp_number: "+2347087970133",
    sendy_api_url: process.env.SENDY_BASE_URL ?? "https://sendy.laptoplifestyleincome.com/",
    sendy_api_key: process.env.SENDY_API_KEY ?? "",
    sendy_list_id: process.env.SENDY_LIST_ID ?? "",
    sendy_transactional_endpoint: process.env.SENDY_TRANSACTIONAL_ENDPOINT ?? "",
    whatsapp_api_token: process.env.WHATSAPP_API_TOKEN ?? "",
    whatsapp_phone_number_id: process.env.WHATSAPP_PHONE_NUMBER_ID ?? "",
    sms_provider: "Configure SMS provider",
    sms_api_url: process.env.SMS_API_URL ?? "",
    sms_api_key: process.env.SMS_API_KEY ?? "",
    sms_sender_id: process.env.SMS_SENDER_ID ?? "",
    event_date_christmas: "12-25",
    event_date_new_year: "01-01",
    event_date_eid: "",
    event_date_independence_day: "10-01",
    default_admin_email: adminEmail,
    logo_url: "/brand/spt-logo.png",
    message_template_welcome: "Welcome to Smart Profitable Trader. We have received your request and our team will contact you shortly.",
    message_template_form_acknowledgement: "Thank you for submitting your application. We are reviewing your details and will follow up with the next steps.",
    message_template_payment_acknowledgement: "Your payment has been received successfully. We appreciate your trust and will confirm activation shortly.",
    message_template_birthday: "Happy birthday from Smart Profitable Trader. We appreciate you and wish you a prosperous new year ahead.",
    message_template_christmas: "Merry Christmas from Smart Profitable Trader. Thank you for being part of our community.",
    message_template_new_year: "Happy New Year from Smart Profitable Trader. Wishing you clarity, growth, and disciplined execution in the markets.",
    message_template_eid: "Warm Eid greetings from Smart Profitable Trader. May this season bring peace, blessing, and progress.",
    message_template_independence_day: "Happy Independence Day from Smart Profitable Trader. Thank you for growing with us."
  } as const;

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
