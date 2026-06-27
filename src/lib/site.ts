const DEFAULT_PUBLIC_SITE_URL = "https://" + "www." + "smartprofitstrader.com";
const CANONICAL_PUBLIC_SITE_URL = "https://" + "www." + "smartprofitstrader.com";

function normalizePublicSiteUrl(value?: string) {
  if (!value) return CANONICAL_PUBLIC_SITE_URL;

  const trimmed = value.trim();
  if (!trimmed) return CANONICAL_PUBLIC_SITE_URL;

  const normalized = trimmed.replace(/\/+$/, "");

  try {
    const parsed = new URL(normalized);

    if (
      parsed.hostname === "smartprofitstrader.com" ||
      parsed.hostname === "www.smartprofitstrader.com" ||
      parsed.hostname === "smart-profitable-trader.vercel.app" ||
      parsed.hostname.endsWith(".vercel.app")
    ) {
      return CANONICAL_PUBLIC_SITE_URL;
    }
  } catch {
    return normalized;
  }

  return normalized;
}

export const publicSiteUrl = normalizePublicSiteUrl(
  process.env.NEXT_PUBLIC_SITE_URL ?? process.env.NEXTAUTH_URL
);

export const emailAssetUrls = {
  logo: `${publicSiteUrl}/email-assets/logos/smart-profits-logo.jpg`,
  founder: `${publicSiteUrl}/email-assets/founder/solomon-dee-founder.jpg`,
  testimonial: `${publicSiteUrl}/email-assets/testimonials/testimonial-smartprofit-algo.jpg`
} as const;
