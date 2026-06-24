import {
  ApplicationStatus,
  BillingCycle,
  CommunicationChannel,
  CommunicationStatus,
  CustomerStatus,
  CustomerType,
  ExpensePaymentStatus,
  LeadStatus,
  PaymentStatus,
  ProfitShareStatus,
  SubscriptionStatus,
  SubscriptionType
} from "@prisma/client";
import { z } from "zod";

const optionalText = z.string().trim().max(500).optional().or(z.literal(""));
const optionalDate = z.string().optional().or(z.literal(""));

export const applicationSchema = z.object({
  fullName: z.string().trim().min(2, "Enter the applicant's name."),
  email: z.string().trim().email("Enter a valid email address."),
  phone: z.string().trim().min(5).max(30).optional().or(z.literal("")),
  whatsapp: z.string().trim().max(30).optional().or(z.literal("")),
  country: z.string().trim().max(80).optional().or(z.literal("")),
  city: z.string().trim().max(80).optional().or(z.literal("")),
  source: z.string().trim().max(120).optional().or(z.literal("")),
  campaign: z.string().trim().max(120).optional().or(z.literal("")),
  service: z.string().trim().min(2, "Select a service."),
  message: z.string().trim().max(2000).optional().or(z.literal("")),
  broker: optionalText,
  platform: optionalText,
  accountBalance: optionalText,
  propFirm: optionalText,
  accountSize: optionalText,
  currentPhase: optionalText,
  startDate: optionalDate,
  fundedStatus: optionalText,
  withdrawalTarget: optionalText,
  tradingExperience: optionalText,
  riskPreference: optionalText
});

export const leadUpdateSchema = z.object({
  id: z.string().min(1),
  status: z.nativeEnum(LeadStatus),
  notes: z.string().trim().max(2000).optional().or(z.literal("")),
  nextFollowUpAt: optionalDate
});

export const customerUpdateSchema = z.object({
  id: z.string().min(1),
  status: z.nativeEnum(CustomerStatus),
  currentBalance: z.coerce.number().finite().nonnegative(),
  currentEquity: z.coerce.number().finite().nonnegative(),
  notes: z.string().trim().max(2000).optional().or(z.literal("")),
  renewalDate: optionalDate,
  dateOfBirth: optionalDate
});

export const customerCreateSchema = z.object({
  fullName: z.string().trim().min(2, "Enter the customer's name."),
  email: z.string().trim().email("Enter a valid email address."),
  phone: z.string().trim().max(30).optional().or(z.literal("")),
  whatsapp: z.string().trim().max(30).optional().or(z.literal("")),
  country: z.string().trim().max(80).optional().or(z.literal("")),
  city: z.string().trim().max(80).optional().or(z.literal("")),
  customerType: z.nativeEnum(CustomerType),
  status: z.nativeEnum(CustomerStatus),
  accountPlatform: z.string().trim().max(30).optional().or(z.literal("")),
  brokerOrPropFirm: optionalText,
  accountLogin: optionalText,
  initialCapital: z.coerce.number().finite().nonnegative(),
  currentBalance: z.coerce.number().finite().nonnegative(),
  currentEquity: z.coerce.number().finite().nonnegative(),
  startDate: optionalDate,
  renewalDate: optionalDate,
  dateOfBirth: optionalDate,
  profitShareTier: optionalText,
  setupFeeStatus: optionalText,
  notes: z.string().trim().max(2000).optional().or(z.literal(""))
});

export const applicationUpdateSchema = z.object({
  id: z.string().min(1),
  status: z.nativeEnum(ApplicationStatus)
});

export const subscriptionSchema = z.object({
  name: z.string().trim().min(2),
  type: z.nativeEnum(SubscriptionType),
  relatedName: z.string().trim().max(120).optional().or(z.literal("")),
  amount: z.coerce.number().finite().nonnegative(),
  currency: z.string().trim().min(3).max(8),
  startDate: optionalDate,
  renewalDate: optionalDate,
  billingCycle: z.nativeEnum(BillingCycle),
  status: z.nativeEnum(SubscriptionStatus),
  reminderEnabled: z.boolean().optional().default(true),
  notes: z.string().trim().max(2000).optional().or(z.literal("")),
  customerId: z.string().optional().or(z.literal("")),
  expenseId: z.string().optional().or(z.literal(""))
});

export const paymentSchema = z.object({
  customerId: z.string().optional().or(z.literal("")),
  serviceType: z.string().trim().min(2),
  amount: z.coerce.number().finite().nonnegative(),
  currency: z.string().trim().min(3).max(8),
  paymentDate: optionalDate,
  paymentMethod: optionalText,
  status: z.nativeEnum(PaymentStatus),
  invoiceReference: optionalText,
  notes: z.string().trim().max(2000).optional().or(z.literal(""))
});

export const expenseSchema = z.object({
  name: z.string().trim().min(2),
  category: z.string().trim().min(2),
  amount: z.coerce.number().finite().nonnegative(),
  currency: z.string().trim().min(3).max(8),
  billingCycle: z.nativeEnum(BillingCycle),
  dueDate: optionalDate,
  renewalDate: optionalDate,
  paymentStatus: z.nativeEnum(ExpensePaymentStatus),
  paymentMethod: optionalText,
  vendor: optionalText,
  notes: z.string().trim().max(2000).optional().or(z.literal(""))
});

export const accountProgressSchema = z.object({
  customerId: z.string().min(1),
  serviceType: z.nativeEnum(CustomerType),
  phase: optionalText,
  accountSize: z.coerce.number().finite().nonnegative(),
  currentBalance: z.coerce.number().finite().nonnegative(),
  currentEquity: z.coerce.number().finite().nonnegative(),
  profitTarget: z.coerce.number().finite().nonnegative(),
  currentProfit: z.coerce.number().finite(),
  growthPercentage: z.coerce.number().finite(),
  drawdownLimit: z.coerce.number().finite().nonnegative(),
  currentDrawdown: z.coerce.number().finite().nonnegative(),
  dailyDrawdown: z.coerce.number().finite().nonnegative(),
  maxDrawdown: z.coerce.number().finite().nonnegative(),
  daysTraded: z.coerce.number().int().nonnegative(),
  minimumTradeDays: z.coerce.number().int().nonnegative(),
  status: z.string().trim().min(2),
  notes: z.string().trim().max(2000).optional().or(z.literal(""))
});

export const profitShareSchema = z.object({
  customerId: z.string().min(1),
  totalProfit: z.coerce.number().finite(),
  clientPercentage: z.coerce.number().finite().min(0).max(100),
  companyPercentage: z.coerce.number().finite().min(0).max(100),
  amountPaid: z.coerce.number().finite().nonnegative(),
  amountPending: z.coerce.number().finite().nonnegative(),
  paymentDate: optionalDate,
  status: z.nativeEnum(ProfitShareStatus),
  notes: z.string().trim().max(2000).optional().or(z.literal(""))
});

export const communicationLogSchema = z.object({
  recipient: z.string().trim().min(2),
  channel: z.nativeEnum(CommunicationChannel),
  subject: optionalText,
  message: z.string().trim().min(2).max(4000),
  status: z.nativeEnum(CommunicationStatus),
  leadId: z.string().optional().or(z.literal("")),
  customerId: z.string().optional().or(z.literal("")),
  applicationId: z.string().optional().or(z.literal("")),
  sentAt: optionalDate
});

export const settingsSchema = z.object({
  company_name: z.string().trim().min(2),
  whatsapp_number: z.string().trim().min(5),
  sendy_api_url: z.string().trim().optional().or(z.literal("")),
  sendy_api_key: z.string().trim().optional().or(z.literal("")),
  sendy_list_id: z.string().trim().optional().or(z.literal("")),
  sendy_transactional_endpoint: z.string().trim().optional().or(z.literal("")),
  whatsapp_api_token: z.string().trim().optional().or(z.literal("")),
  whatsapp_phone_number_id: z.string().trim().optional().or(z.literal("")),
  sms_provider: z.string().trim().optional().or(z.literal("")),
  sms_api_url: z.string().trim().optional().or(z.literal("")),
  sms_api_key: z.string().trim().optional().or(z.literal("")),
  sms_sender_id: z.string().trim().optional().or(z.literal("")),
  event_date_christmas: z.string().trim().optional().or(z.literal("")),
  event_date_new_year: z.string().trim().optional().or(z.literal("")),
  event_date_eid: z.string().trim().optional().or(z.literal("")),
  event_date_independence_day: z.string().trim().optional().or(z.literal("")),
  default_admin_email: z.string().trim().email(),
  logo_url: z.string().trim().min(1),
  message_template_welcome: z.string().trim().min(2),
  message_template_form_acknowledgement: z.string().trim().min(2),
  message_template_payment_acknowledgement: z.string().trim().min(2),
  message_template_birthday: z.string().trim().min(2),
  message_template_christmas: z.string().trim().min(2),
  message_template_new_year: z.string().trim().min(2),
  message_template_eid: z.string().trim().min(2),
  message_template_independence_day: z.string().trim().min(2)
});
