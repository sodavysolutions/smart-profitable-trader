const DEFAULT_PUBLIC_SITE_URL = "https://www.smartprofitstrader.com";

function normalizePublicSiteUrl(value?: string) {
  if (!value) return DEFAULT_PUBLIC_SITE_URL;

  const trimmed = value.trim();
  if (!trimmed) return DEFAULT_PUBLIC_SITE_URL;

  return trimmed.replace(/\/+$/, "");
}

export const publicSiteUrl = normalizePublicSiteUrl(
  process.env.NEXT_PUBLIC_SITE_URL ?? process.env.NEXTAUTH_URL
);

export const emailAssetUrls = {
  logo: `${publicSiteUrl}/email-assets/logos/smart-profits-logo.jpg`,
  founder: `${publicSiteUrl}/email-assets/founder/solomon-dee-founder.jpg`,
  testimonial: `${publicSiteUrl}/email-assets/testimonials/testimonial-smartprofit-algo.jpg`
} as const;

