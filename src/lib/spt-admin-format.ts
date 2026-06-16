import type { Application, Customer, Lead } from "@prisma/client";

export function readableEnum(value?: string | null) {
  if (!value) return "";
  return value
    .toLowerCase()
    .split("_")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

export function money(value: number | string | { toString(): string }) {
  const parsed = Number(value);
  if (!Number.isFinite(parsed)) return "$0";
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0
  }).format(parsed);
}

export function matchesSearch(row: Pick<Lead | Customer | Application, "fullName" | "email">, search?: string) {
  if (!search) return true;
  const term = search.toLowerCase();
  return row.fullName.toLowerCase().includes(term) || row.email.toLowerCase().includes(term);
}
