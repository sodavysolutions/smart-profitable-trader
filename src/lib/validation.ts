import { z } from "zod";

export const applicationSchema = z.object({
  fullName: z.string().min(2),
  email: z.string().email(),
  phone: z.string().min(5).optional().or(z.literal("")),
  whatsapp: z.string().optional(),
  country: z.string().optional(),
  city: z.string().optional(),
  source: z.string().optional(),
  service: z.string().min(2),
  message: z.string().optional(),
  broker: z.string().optional(),
  platform: z.string().optional(),
  accountBalance: z.string().optional(),
  propFirm: z.string().optional(),
  accountSize: z.string().optional(),
  currentPhase: z.string().optional(),
  startDate: z.string().optional(),
  fundedStatus: z.string().optional(),
  withdrawalTarget: z.string().optional(),
  tradingExperience: z.string().optional(),
  riskPreference: z.string().optional()
});
