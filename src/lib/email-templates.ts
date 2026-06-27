/**
 * Smart Profits Trader — branded HTML email template system.
 * All system emails (application acknowledgement, welcome, payment, events)
 * are wrapped in this template before being sent via Sendy.
 */

export type EmailTemplateOptions = {
  /** Short hidden preview text shown in inbox before the email is opened */
  preheader?: string;
  /** Small uppercase label shown under the logo (e.g. "Application Received") */
  badge: string;
  /** Main headline */
  title: string;
  /** Subtitle shown below the headline */
  subtitle?: string;
  /** Main body HTML — paragraphs, callout boxes, etc. */
  bodyHtml: string;
  /** Optional primary CTA button */
  cta?: {
    label: string;
    href: string;
  };
};

const LOGO_URL = "https://www.smartprofitstrader.com/email-assets/logos/smart-profits-logo.jpg";
const FOUNDER_PHOTO_URL = "https://www.smartprofitstrader.com/email-assets/founder/solomon-dee-founder.jpg";
const SITE_URL = "https://www.smartprofitstrader.com";

export function buildEmailHtml(options: EmailTemplateOptions): string {
  const { preheader, badge, title, subtitle, bodyHtml, cta } = options;

  const preheaderHtml = preheader
    ? `<div style="display:none;max-height:0;overflow:hidden;opacity:0;color:transparent;">${escapeHtml(preheader)}</div>`
    : "";

  const subtitleHtml = subtitle
    ? `<p style="margin:10px 0 0;color:#475569;font-size:15px;line-height:1.65;">${escapeHtml(subtitle)}</p>`
    : "";

  const ctaHtml = cta
    ? `
    <table cellpadding="0" cellspacing="0" role="presentation" style="margin:28px 0;" width="100%">
      <tbody>
        <tr>
          <td style="text-align:center;">
            <a href="${cta.href}" style="display:inline-block;background:#16A34A;color:#ffffff;text-decoration:none;font-weight:bold;font-size:15px;padding:13px 26px;border-radius:7px;">${escapeHtml(cta.label)}</a>
          </td>
        </tr>
      </tbody>
    </table>`
    : "";

  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <title>Smart Profits Trader</title>
</head>
<body style="margin:0;padding:0;background:#F7FAF8;font-family:Arial,Helvetica,'Helvetica Neue',sans-serif;color:#102033;">
${preheaderHtml}
<table cellpadding="0" cellspacing="0" role="presentation" style="background:#F7FAF8;padding:24px 0;" width="100%">
  <tbody>
    <tr>
      <td align="center">
        <table cellpadding="0" cellspacing="0" role="presentation" style="width:600px;max-width:94%;background:#ffffff;border:1px solid #E5E7EB;border-radius:16px;overflow:hidden;" width="600">
          <tbody>

            <!-- Header -->
            <tr>
              <td style="padding:22px 28px 18px;text-align:left;border-bottom:1px solid #EEF2F1;">
                <table cellpadding="0" cellspacing="0" role="presentation" width="100%">
                  <tbody>
                    <tr>
                      <td style="vertical-align:middle;" width="56">
                        <img alt="Smart Profits Trader" height="44" src="${LOGO_URL}" style="display:block;width:44px;height:44px;border:0;border-radius:8px;" width="44" />
                      </td>
                      <td style="vertical-align:middle;padding-left:12px;">
                        <p style="margin:0;color:#071F3D;font-size:17px;font-weight:bold;">Smart Profits Trader</p>
                        <p style="margin:3px 0 0;color:#16A34A;font-size:11px;font-weight:bold;letter-spacing:1.2px;text-transform:uppercase;">${escapeHtml(badge)}</p>
                      </td>
                    </tr>
                  </tbody>
                </table>
                <h1 style="margin:22px 0 0;color:#071F3D;font-size:28px;line-height:1.22;font-weight:800;">${escapeHtml(title)}</h1>
                ${subtitleHtml}
              </td>
            </tr>

            <!-- Body -->
            <tr>
              <td style="padding:28px;">
                ${bodyHtml}
                ${ctaHtml}

                <!-- Founder signature -->
                <table cellpadding="0" cellspacing="0" role="presentation" style="border-top:1px solid #E5E7EB;padding-top:20px;margin-top:26px;" width="100%">
                  <tbody>
                    <tr>
                      <td style="vertical-align:middle;" width="68">
                        <img alt="Solomon Dee" height="56" src="${FOUNDER_PHOTO_URL}" style="display:block;width:56px;height:56px;border-radius:50%;border:2px solid #16A34A;object-fit:cover;" width="56" />
                      </td>
                      <td style="vertical-align:middle;padding-left:12px;">
                        <p style="margin:0;color:#071F3D;font-size:15px;font-weight:bold;">Solomon Dee</p>
                        <p style="margin:3px 0 0;color:#64748B;font-size:13px;">Founder, Smart Profits Trader</p>
                        <p style="margin:3px 0 0;font-size:13px;"><a href="${SITE_URL}" style="color:#16A34A;text-decoration:none;">smartprofitstrader.com</a></p>
                      </td>
                    </tr>
                  </tbody>
                </table>

                <p style="margin:24px 0 0;color:#64748B;font-size:12px;line-height:1.6;">Trading involves risk. Past results do not guarantee future performance. Only trade with capital you can afford to risk.</p>
                <p style="margin:16px 0 0;color:#64748B;font-size:13px;line-height:1.6;">If you no longer wish to receive these emails, <unsubscribe>click here to unsubscribe</unsubscribe>.</p>
              </td>
            </tr>

            <!-- Footer -->
            <tr>
              <td style="background:#071F3D;text-align:center;padding:16px 20px;color:#CBD5E1;font-size:12px;line-height:1.6;">
                Smart Profits Trader &mdash; Algo-Powered Trading Ecosystem<br>
                <a href="${SITE_URL}" style="color:#86EFAC;text-decoration:none;">smartprofitstrader.com</a>
              </td>
            </tr>

          </tbody>
        </table>
      </td>
    </tr>
  </tbody>
</table>
</body>
</html>`;
}

/**
 * Wrap a plain-text message in a simple styled callout box for use inside bodyHtml.
 */
export function calloutBox(text: string, variant: "green" | "blue" | "neutral" = "green"): string {
  const styles: Record<typeof variant, { bg: string; border: string; label: string }> = {
    green: { bg: "#F2FBF5", border: "#D9EDE0", label: "#16A34A" },
    blue: { bg: "#EFF6FF", border: "#BFDBFE", label: "#1D4ED8" },
    neutral: { bg: "#F8FAFC", border: "#E2E8F0", label: "#475569" },
  };
  const s = styles[variant];
  return `
  <table cellpadding="0" cellspacing="0" role="presentation" style="margin:22px 0;background:${s.bg};border:1px solid ${s.border};border-radius:12px;" width="100%">
    <tbody>
      <tr>
        <td style="padding:18px;">
          <p style="margin:0;color:#334155;font-size:15px;line-height:1.7;">${text}</p>
        </td>
      </tr>
    </tbody>
  </table>`;
}

/** Safely escape HTML special characters for use in text nodes */
function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

/**
 * Build the body HTML for an application acknowledgement email.
 */
export function buildApplicationAcknowledgementBody(fullName: string, service: string, companyName: string): string {
  const firstName = fullName.split(" ")[0] ?? fullName;
  return `
  <p style="margin:0 0 16px;font-size:16px;line-height:1.75;color:#102033;">Hi ${escapeHtml(firstName)},</p>
  <p style="margin:0 0 16px;font-size:16px;line-height:1.75;color:#102033;">Thank you for applying to <strong>${escapeHtml(companyName)}</strong>. We have received your application for the <strong>${escapeHtml(service)}</strong> service.</p>
  ${calloutBox(`Our team will review your application and reach out to you shortly to discuss next steps, confirm details, and guide you through the onboarding process.`, "green")}
  <p style="margin:0 0 16px;font-size:16px;line-height:1.75;color:#102033;">While you wait, feel free to explore our website for more information about how our services work and what to expect.</p>
  <p style="margin:0 0 16px;font-size:16px;line-height:1.75;color:#102033;">If you have any urgent questions, you can reach us directly on WhatsApp and we will respond as quickly as possible.</p>`;
}

/**
 * Build the body HTML for a welcome email (new customer).
 */
export function buildWelcomeBody(fullName: string, serviceType: string, companyName: string): string {
  const firstName = fullName.split(" ")[0] ?? fullName;
  return `
  <p style="margin:0 0 16px;font-size:16px;line-height:1.75;color:#102033;">Hi ${escapeHtml(firstName)},</p>
  <p style="margin:0 0 16px;font-size:16px;line-height:1.75;color:#102033;">Welcome to <strong>${escapeHtml(companyName)}</strong>. Your account is now active and your <strong>${escapeHtml(serviceType)}</strong> profile has been set up in our system.</p>
  ${calloutBox(`Our team will be in touch to walk you through the next steps, confirm your trading setup, and get everything running smoothly.`, "green")}
  <p style="margin:0 0 16px;font-size:16px;line-height:1.75;color:#102033;">We are glad to have you with us. Our goal is to make this a structured, disciplined, and results-driven experience for you.</p>
  <p style="margin:0 0 16px;font-size:16px;line-height:1.75;color:#102033;">If you have any questions at any time, please reach out to us on WhatsApp and we will assist you right away.</p>`;
}

/**
 * Build the body HTML for a payment acknowledgement email.
 */
export function buildPaymentAcknowledgementBody(fullName: string, serviceType: string, amount: string, currency: string, companyName: string): string {
  const firstName = fullName.split(" ")[0] ?? fullName;
  return `
  <p style="margin:0 0 16px;font-size:16px;line-height:1.75;color:#102033;">Hi ${escapeHtml(firstName)},</p>
  <p style="margin:0 0 16px;font-size:16px;line-height:1.75;color:#102033;">We have received your payment for <strong>${escapeHtml(serviceType)}</strong>. Thank you for your trust in <strong>${escapeHtml(companyName)}</strong>.</p>
  ${calloutBox(`<strong>Amount received:</strong> ${escapeHtml(currency)} ${escapeHtml(amount)}<br><strong>Service:</strong> ${escapeHtml(serviceType)}`, "green")}
  <p style="margin:0 0 16px;font-size:16px;line-height:1.75;color:#102033;">Your account records have been updated. If you have any questions about your payment or subscription, please do not hesitate to reach out.</p>`;
}
