-- Smart Profitable Trader admin CRM bootstrap
-- 1. Replace {{ADMIN_EMAIL}} with your real admin email.
-- 2. Replace {{ADMIN_PASSWORD}} with your real admin password.
-- 3. Run this whole file in the Supabase SQL Editor once.

CREATE EXTENSION IF NOT EXISTS pgcrypto;

DO $$ BEGIN
  CREATE TYPE "UserRole" AS ENUM ('SUPER_ADMIN', 'ADMIN', 'STAFF', 'VIEWER');
EXCEPTION
  WHEN duplicate_object THEN NULL;
END $$ LANGUAGE plpgsql;

DO $$ BEGIN
  CREATE TYPE "LeadStatus" AS ENUM ('NEW', 'CONTACTED', 'INTERESTED', 'FOLLOW_UP', 'PAYMENT_PENDING', 'CONVERTED', 'NOT_INTERESTED', 'LOST');
EXCEPTION
  WHEN duplicate_object THEN NULL;
END $$ LANGUAGE plpgsql;

DO $$ BEGIN
  CREATE TYPE "CustomerType" AS ENUM ('VIP_SIGNALS', 'COPY_TRADING', 'INSTANT_FUNDED', 'EVALUATION', 'PERSONAL_ACCOUNT');
EXCEPTION
  WHEN duplicate_object THEN NULL;
END $$ LANGUAGE plpgsql;

DO $$ BEGIN
  CREATE TYPE "CustomerStatus" AS ENUM ('ACTIVE', 'PENDING_SETUP', 'SUSPENDED', 'PAUSED', 'COMPLETED', 'FUNDED', 'CANCELLED', 'LOST');
EXCEPTION
  WHEN duplicate_object THEN NULL;
END $$ LANGUAGE plpgsql;

DO $$ BEGIN
  CREATE TYPE "AccountPlatform" AS ENUM ('MT4', 'MT5', 'TRADELOCKER', 'OTHER');
EXCEPTION
  WHEN duplicate_object THEN NULL;
END $$ LANGUAGE plpgsql;

DO $$ BEGIN
  CREATE TYPE "ApplicationStatus" AS ENUM ('NEW', 'REVIEWING', 'APPROVED', 'REJECTED', 'CONVERTED');
EXCEPTION
  WHEN duplicate_object THEN NULL;
END $$ LANGUAGE plpgsql;

DO $$ BEGIN
  CREATE TYPE "CommunicationChannel" AS ENUM ('EMAIL', 'WHATSAPP', 'SMS');
EXCEPTION
  WHEN duplicate_object THEN NULL;
END $$ LANGUAGE plpgsql;

DO $$ BEGIN
  CREATE TYPE "CommunicationStatus" AS ENUM ('PENDING', 'SENT', 'FAILED');
EXCEPTION
  WHEN duplicate_object THEN NULL;
END $$ LANGUAGE plpgsql;

CREATE TABLE IF NOT EXISTS "User" (
  "id" TEXT NOT NULL,
  "name" TEXT NOT NULL,
  "email" TEXT NOT NULL,
  "passwordHash" TEXT NOT NULL,
  "role" "UserRole" NOT NULL DEFAULT 'STAFF',
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX IF NOT EXISTS "User_email_key" ON "User"("email");

CREATE TABLE IF NOT EXISTS "Lead" (
  "id" TEXT NOT NULL,
  "fullName" TEXT NOT NULL,
  "email" TEXT NOT NULL,
  "phone" TEXT,
  "whatsapp" TEXT,
  "country" TEXT,
  "city" TEXT,
  "serviceInterest" TEXT NOT NULL,
  "leadSource" TEXT,
  "campaign" TEXT,
  "status" "LeadStatus" NOT NULL DEFAULT 'NEW',
  "assignedToId" TEXT,
  "notes" TEXT,
  "lastContactedAt" TIMESTAMP(3),
  "nextFollowUpAt" TIMESTAMP(3),
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "Lead_pkey" PRIMARY KEY ("id"),
  CONSTRAINT "Lead_assignedToId_fkey" FOREIGN KEY ("assignedToId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE
);

CREATE UNIQUE INDEX IF NOT EXISTS "Lead_email_key" ON "Lead"("email");

CREATE TABLE IF NOT EXISTS "Customer" (
  "id" TEXT NOT NULL,
  "fullName" TEXT NOT NULL,
  "email" TEXT NOT NULL,
  "phone" TEXT,
  "whatsapp" TEXT,
  "dateOfBirth" TIMESTAMP(3),
  "country" TEXT,
  "city" TEXT,
  "customerType" "CustomerType" NOT NULL,
  "accountPlatform" "AccountPlatform",
  "brokerOrPropFirm" TEXT,
  "accountLogin" TEXT,
  "initialCapital" DECIMAL(65,30) NOT NULL DEFAULT 0,
  "currentBalance" DECIMAL(65,30) NOT NULL DEFAULT 0,
  "currentEquity" DECIMAL(65,30) NOT NULL DEFAULT 0,
  "status" "CustomerStatus" NOT NULL DEFAULT 'PENDING_SETUP',
  "startDate" TIMESTAMP(3),
  "renewalDate" TIMESTAMP(3),
  "profitShareTier" TEXT,
  "setupFeeStatus" TEXT,
  "notes" TEXT,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "Customer_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX IF NOT EXISTS "Customer_email_key" ON "Customer"("email");

CREATE TABLE IF NOT EXISTS "Application" (
  "id" TEXT NOT NULL,
  "fullName" TEXT NOT NULL,
  "email" TEXT NOT NULL,
  "phone" TEXT,
  "whatsapp" TEXT,
  "country" TEXT,
  "city" TEXT,
  "service" TEXT NOT NULL,
  "accountSize" TEXT,
  "startingCapital" TEXT,
  "propFirm" TEXT,
  "broker" TEXT,
  "tradingExperience" TEXT,
  "phoneWhatsapp" TEXT,
  "locationAddress" TEXT,
  "tradingExperienceYesNo" TEXT,
  "experienceRating" TEXT,
  "automatedTradingExperience" TEXT,
  "investmentAmount" TEXT,
  "expectedMonthlyProfitGoal" TEXT,
  "hasExistingTradingAccount" TEXT,
  "riskStyle" TEXT,
  "mainGoal" TEXT,
  "riskAcknowledged" BOOLEAN NOT NULL DEFAULT false,
  "preferredBroker" TEXT,
  "goldTradingExperience" TEXT,
  "signalAccountType" TEXT,
  "mtPlatform" TEXT,
  "evaluationPropFirm" TEXT,
  "evaluationStage" TEXT,
  "evaluationAccountSize" TEXT,
  "instantFundedProvider" TEXT,
  "instantFundedAccountSize" TEXT,
  "readyToPaySetupFee" TEXT,
  "personalManagementPreference" TEXT,
  "message" TEXT,
  "status" "ApplicationStatus" NOT NULL DEFAULT 'NEW',
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "Application_pkey" PRIMARY KEY ("id")
);

CREATE TABLE IF NOT EXISTS "ActivityLog" (
  "id" TEXT NOT NULL,
  "type" TEXT NOT NULL,
  "description" TEXT NOT NULL,
  "leadId" TEXT,
  "customerId" TEXT,
  "applicationId" TEXT,
  "userId" TEXT,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "ActivityLog_pkey" PRIMARY KEY ("id"),
  CONSTRAINT "ActivityLog_leadId_fkey" FOREIGN KEY ("leadId") REFERENCES "Lead"("id") ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT "ActivityLog_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "Customer"("id") ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT "ActivityLog_applicationId_fkey" FOREIGN KEY ("applicationId") REFERENCES "Application"("id") ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT "ActivityLog_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE
);

CREATE TABLE IF NOT EXISTS "CommunicationLog" (
  "id" TEXT NOT NULL,
  "channel" "CommunicationChannel" NOT NULL,
  "recipient" TEXT NOT NULL,
  "subject" TEXT,
  "message" TEXT NOT NULL,
  "status" "CommunicationStatus" NOT NULL DEFAULT 'PENDING',
  "leadId" TEXT,
  "customerId" TEXT,
  "applicationId" TEXT,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "CommunicationLog_pkey" PRIMARY KEY ("id"),
  CONSTRAINT "CommunicationLog_leadId_fkey" FOREIGN KEY ("leadId") REFERENCES "Lead"("id") ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT "CommunicationLog_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "Customer"("id") ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT "CommunicationLog_applicationId_fkey" FOREIGN KEY ("applicationId") REFERENCES "Application"("id") ON DELETE SET NULL ON UPDATE CASCADE
);

CREATE TABLE IF NOT EXISTS "Setting" (
  "id" TEXT NOT NULL,
  "key" TEXT NOT NULL,
  "value" TEXT NOT NULL,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "Setting_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX IF NOT EXISTS "Setting_key_key" ON "Setting"("key");

INSERT INTO "User" ("id", "name", "email", "passwordHash", "role", "createdAt", "updatedAt")
VALUES (
  'seed-super-admin',
  'Super Admin',
  '{{ADMIN_EMAIL}}',
  crypt('{{ADMIN_PASSWORD}}', gen_salt('bf', 12)),
  'SUPER_ADMIN',
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
)
ON CONFLICT ("email") DO UPDATE SET
  "name" = EXCLUDED."name",
  "passwordHash" = EXCLUDED."passwordHash",
  "role" = EXCLUDED."role",
  "updatedAt" = CURRENT_TIMESTAMP;

INSERT INTO "Setting" ("id", "key", "value", "createdAt", "updatedAt")
VALUES
  ('setting-company-name', 'company_name', 'Smart Profitable Trader', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
  ('setting-whatsapp-number', 'whatsapp_number', '+2347087970133', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
  ('setting-sendy-api-url', 'sendy_api_url', '', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
  ('setting-sendy-api-key', 'sendy_api_key', '', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
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
  ('setting-default-admin-email', 'default_admin_email', '{{ADMIN_EMAIL}}', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
  ('setting-logo-url', 'logo_url', '/brand/spt-logo.png', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
ON CONFLICT ("key") DO UPDATE SET
  "value" = EXCLUDED."value",
  "updatedAt" = CURRENT_TIMESTAMP;
