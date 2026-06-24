-- Smart Profitable Trader live schema repair patch
-- Run this in the Supabase SQL Editor for the production database.
-- Safe to run more than once.

CREATE EXTENSION IF NOT EXISTS pgcrypto;

DO $$ BEGIN
  CREATE TYPE "BillingCycle" AS ENUM ('ONE_TIME', 'WEEKLY', 'MONTHLY', 'QUARTERLY', 'YEARLY');
EXCEPTION
  WHEN duplicate_object THEN NULL;
END $$ LANGUAGE plpgsql;

DO $$ BEGIN
  CREATE TYPE "SubscriptionType" AS ENUM ('CUSTOMER_SUBSCRIPTION', 'BUSINESS_EXPENSE');
EXCEPTION
  WHEN duplicate_object THEN NULL;
END $$ LANGUAGE plpgsql;

DO $$ BEGIN
  CREATE TYPE "SubscriptionStatus" AS ENUM ('ACTIVE', 'UPCOMING', 'OVERDUE', 'PAUSED', 'CANCELLED', 'EXPIRED');
EXCEPTION
  WHEN duplicate_object THEN NULL;
END $$ LANGUAGE plpgsql;

DO $$ BEGIN
  CREATE TYPE "PaymentStatus" AS ENUM ('PENDING', 'PAID', 'FAILED', 'REFUNDED', 'PARTIALLY_PAID');
EXCEPTION
  WHEN duplicate_object THEN NULL;
END $$ LANGUAGE plpgsql;

DO $$ BEGIN
  CREATE TYPE "ExpensePaymentStatus" AS ENUM ('PAID', 'UPCOMING', 'OVERDUE', 'CANCELLED');
EXCEPTION
  WHEN duplicate_object THEN NULL;
END $$ LANGUAGE plpgsql;

DO $$ BEGIN
  CREATE TYPE "ProfitShareStatus" AS ENUM ('PENDING', 'PARTIALLY_PAID', 'PAID', 'DISPUTED', 'CANCELLED');
EXCEPTION
  WHEN duplicate_object THEN NULL;
END $$ LANGUAGE plpgsql;

ALTER TABLE "Customer"
ADD COLUMN IF NOT EXISTS "dateOfBirth" TIMESTAMP(3);

CREATE TABLE IF NOT EXISTS "Expense" (
  "id" TEXT NOT NULL,
  "name" TEXT NOT NULL,
  "category" TEXT NOT NULL,
  "amount" DECIMAL(65,30) NOT NULL DEFAULT 0,
  "currency" TEXT NOT NULL DEFAULT 'USD',
  "billingCycle" "BillingCycle" NOT NULL DEFAULT 'MONTHLY',
  "dueDate" TIMESTAMP(3),
  "renewalDate" TIMESTAMP(3),
  "paymentStatus" "ExpensePaymentStatus" NOT NULL DEFAULT 'UPCOMING',
  "paymentMethod" TEXT,
  "vendor" TEXT,
  "notes" TEXT,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "Expense_pkey" PRIMARY KEY ("id")
);

CREATE TABLE IF NOT EXISTS "Subscription" (
  "id" TEXT NOT NULL,
  "name" TEXT NOT NULL,
  "type" "SubscriptionType" NOT NULL,
  "customerId" TEXT,
  "expenseId" TEXT,
  "relatedName" TEXT,
  "amount" DECIMAL(65,30) NOT NULL DEFAULT 0,
  "currency" TEXT NOT NULL DEFAULT 'USD',
  "startDate" TIMESTAMP(3),
  "renewalDate" TIMESTAMP(3),
  "billingCycle" "BillingCycle" NOT NULL DEFAULT 'MONTHLY',
  "status" "SubscriptionStatus" NOT NULL DEFAULT 'ACTIVE',
  "reminderEnabled" BOOLEAN NOT NULL DEFAULT true,
  "notes" TEXT,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "Subscription_pkey" PRIMARY KEY ("id"),
  CONSTRAINT "Subscription_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "Customer"("id") ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT "Subscription_expenseId_fkey" FOREIGN KEY ("expenseId") REFERENCES "Expense"("id") ON DELETE SET NULL ON UPDATE CASCADE
);

CREATE UNIQUE INDEX IF NOT EXISTS "Subscription_expenseId_key" ON "Subscription"("expenseId");

CREATE TABLE IF NOT EXISTS "Payment" (
  "id" TEXT NOT NULL,
  "customerId" TEXT,
  "serviceType" TEXT NOT NULL,
  "amount" DECIMAL(65,30) NOT NULL DEFAULT 0,
  "currency" TEXT NOT NULL DEFAULT 'USD',
  "paymentDate" TIMESTAMP(3),
  "paymentMethod" TEXT,
  "status" "PaymentStatus" NOT NULL DEFAULT 'PENDING',
  "invoiceReference" TEXT,
  "notes" TEXT,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "Payment_pkey" PRIMARY KEY ("id"),
  CONSTRAINT "Payment_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "Customer"("id") ON DELETE SET NULL ON UPDATE CASCADE
);

CREATE TABLE IF NOT EXISTS "ProfitShare" (
  "id" TEXT NOT NULL,
  "customerId" TEXT NOT NULL,
  "totalProfit" DECIMAL(65,30) NOT NULL DEFAULT 0,
  "clientPercentage" DECIMAL(65,30) NOT NULL DEFAULT 65,
  "companyPercentage" DECIMAL(65,30) NOT NULL DEFAULT 35,
  "clientShare" DECIMAL(65,30) NOT NULL DEFAULT 0,
  "companyShare" DECIMAL(65,30) NOT NULL DEFAULT 0,
  "amountPaid" DECIMAL(65,30) NOT NULL DEFAULT 0,
  "amountPending" DECIMAL(65,30) NOT NULL DEFAULT 0,
  "paymentDate" TIMESTAMP(3),
  "status" "ProfitShareStatus" NOT NULL DEFAULT 'PENDING',
  "notes" TEXT,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "ProfitShare_pkey" PRIMARY KEY ("id"),
  CONSTRAINT "ProfitShare_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "Customer"("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

CREATE TABLE IF NOT EXISTS "AccountProgress" (
  "id" TEXT NOT NULL,
  "customerId" TEXT NOT NULL,
  "serviceType" "CustomerType" NOT NULL,
  "phase" TEXT,
  "accountSize" DECIMAL(65,30) NOT NULL DEFAULT 0,
  "currentBalance" DECIMAL(65,30) NOT NULL DEFAULT 0,
  "currentEquity" DECIMAL(65,30) NOT NULL DEFAULT 0,
  "profitTarget" DECIMAL(65,30) NOT NULL DEFAULT 0,
  "currentProfit" DECIMAL(65,30) NOT NULL DEFAULT 0,
  "growthPercentage" DECIMAL(65,30) NOT NULL DEFAULT 0,
  "drawdownLimit" DECIMAL(65,30) NOT NULL DEFAULT 0,
  "currentDrawdown" DECIMAL(65,30) NOT NULL DEFAULT 0,
  "dailyDrawdown" DECIMAL(65,30) NOT NULL DEFAULT 0,
  "maxDrawdown" DECIMAL(65,30) NOT NULL DEFAULT 0,
  "daysTraded" INTEGER NOT NULL DEFAULT 0,
  "minimumTradeDays" INTEGER NOT NULL DEFAULT 0,
  "status" TEXT NOT NULL,
  "notes" TEXT,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "AccountProgress_pkey" PRIMARY KEY ("id"),
  CONSTRAINT "AccountProgress_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "Customer"("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

ALTER TABLE "ActivityLog"
ADD COLUMN IF NOT EXISTS "subscriptionId" TEXT,
ADD COLUMN IF NOT EXISTS "paymentId" TEXT,
ADD COLUMN IF NOT EXISTS "expenseId" TEXT,
ADD COLUMN IF NOT EXISTS "profitShareId" TEXT,
ADD COLUMN IF NOT EXISTS "accountProgressId" TEXT;

ALTER TABLE "CommunicationLog"
ADD COLUMN IF NOT EXISTS "sentAt" TIMESTAMP(3);

DO $$ BEGIN
  ALTER TABLE "ActivityLog"
  ADD CONSTRAINT "ActivityLog_subscriptionId_fkey" FOREIGN KEY ("subscriptionId") REFERENCES "Subscription"("id") ON DELETE SET NULL ON UPDATE CASCADE;
EXCEPTION
  WHEN duplicate_object THEN NULL;
END $$ LANGUAGE plpgsql;

DO $$ BEGIN
  ALTER TABLE "ActivityLog"
  ADD CONSTRAINT "ActivityLog_paymentId_fkey" FOREIGN KEY ("paymentId") REFERENCES "Payment"("id") ON DELETE SET NULL ON UPDATE CASCADE;
EXCEPTION
  WHEN duplicate_object THEN NULL;
END $$ LANGUAGE plpgsql;

DO $$ BEGIN
  ALTER TABLE "ActivityLog"
  ADD CONSTRAINT "ActivityLog_expenseId_fkey" FOREIGN KEY ("expenseId") REFERENCES "Expense"("id") ON DELETE SET NULL ON UPDATE CASCADE;
EXCEPTION
  WHEN duplicate_object THEN NULL;
END $$ LANGUAGE plpgsql;

DO $$ BEGIN
  ALTER TABLE "ActivityLog"
  ADD CONSTRAINT "ActivityLog_profitShareId_fkey" FOREIGN KEY ("profitShareId") REFERENCES "ProfitShare"("id") ON DELETE SET NULL ON UPDATE CASCADE;
EXCEPTION
  WHEN duplicate_object THEN NULL;
END $$ LANGUAGE plpgsql;

DO $$ BEGIN
  ALTER TABLE "ActivityLog"
  ADD CONSTRAINT "ActivityLog_accountProgressId_fkey" FOREIGN KEY ("accountProgressId") REFERENCES "AccountProgress"("id") ON DELETE SET NULL ON UPDATE CASCADE;
EXCEPTION
  WHEN duplicate_object THEN NULL;
END $$ LANGUAGE plpgsql;

INSERT INTO "Setting" ("id", "key", "value", "createdAt", "updatedAt")
VALUES
  ('setting-sendy-list-id', 'sendy_list_id', '', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
  ('setting-sendy-transactional-endpoint', 'sendy_transactional_endpoint', '', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
  ('setting-whatsapp-api-token', 'whatsapp_api_token', '', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
  ('setting-whatsapp-phone-number-id', 'whatsapp_phone_number_id', '', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
  ('setting-sms-provider', 'sms_provider', '', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
  ('setting-sms-api-url', 'sms_api_url', '', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
  ('setting-sms-api-key', 'sms_api_key', '', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
  ('setting-sms-sender-id', 'sms_sender_id', '', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
  ('setting-event-date-christmas', 'event_date_christmas', '12-25', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
  ('setting-event-date-new-year', 'event_date_new_year', '01-01', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
  ('setting-event-date-eid', 'event_date_eid', '', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
  ('setting-event-date-independence-day', 'event_date_independence_day', '10-01', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
  ('setting-message-template-welcome', 'message_template_welcome', 'Welcome {{name}}. Your Smart Profitable Trader onboarding is now active.', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
  ('setting-message-template-form-acknowledgement', 'message_template_form_acknowledgement', 'Hello {{name}}, we have received your application for {{service}}. Our team will contact you shortly.', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
  ('setting-message-template-payment-acknowledgement', 'message_template_payment_acknowledgement', 'Hello {{name}}, your payment of {{amount}} for {{service}} has been received. Thank you.', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
  ('setting-message-template-birthday', 'message_template_birthday', 'Happy Birthday {{name}}. Wishing you a blessed and profitable new year ahead from Smart Profitable Trader.', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
  ('setting-message-template-christmas', 'message_template_christmas', 'Merry Christmas {{name}}. Thank you for being part of Smart Profitable Trader.', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
  ('setting-message-template-new-year', 'message_template_new_year', 'Happy New Year {{name}}. Wishing you a prosperous year ahead from Smart Profitable Trader.', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
  ('setting-message-template-eid', 'message_template_eid', 'Eid Mubarak {{name}}. Wishing you peace, joy, and abundance from Smart Profitable Trader.', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
  ('setting-message-template-independence-day', 'message_template_independence_day', 'Happy Independence Day {{name}}. Thank you for being with Smart Profitable Trader.', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
ON CONFLICT ("key") DO UPDATE SET
  "value" = EXCLUDED."value",
  "updatedAt" = CURRENT_TIMESTAMP;
