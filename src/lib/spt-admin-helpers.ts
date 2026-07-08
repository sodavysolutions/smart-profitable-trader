import { CustomerType } from "@prisma/client";

export function normalizeText(value?: string | null) {
  const trimmed = value?.trim();
  return trimmed ? trimmed : null;
}

export function normalizeDate(value?: string | null) {
  if (!value) return null;
  const parsed = new Date(value);
  return Number.isNaN(parsed.getTime()) ? null : parsed;
}

export function inferCustomerType(service: string) {
  const normalized = service.toLowerCase();

  if (normalized.includes("vip")) return CustomerType.VIP_SIGNALS;
  if (normalized.includes("copy")) return CustomerType.COPY_TRADING;
  if (normalized.includes("funded") || normalized.includes("ifunds")) return CustomerType.INSTANT_FUNDED;

  return CustomerType.COPY_TRADING; // default to Copy Trading for unclassified
}

export function calculateProfitShareValues(totalProfit: number, clientPercentage: number, companyPercentage: number) {
  const clientShare = totalProfit * (clientPercentage / 100);
  const companyShare = totalProfit * (companyPercentage / 100);

  return {
    clientShare,
    companyShare
  };
}
