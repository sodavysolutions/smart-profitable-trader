import type { Metadata } from "next";
import { SPTPageShell } from "@/components/spt/sections";

export const metadata: Metadata = {
  title: "Privacy Policy | Smart Profits Trader",
  description: "Smart Profits Trader privacy policy — how we collect, use, and protect your personal information.",
};

export default function PrivacyPolicyPage() {
  return (
    <SPTPageShell>
      <section className="page-shell py-16">
        <h1 className="text-4xl font-semibold text-navy-950">Privacy Policy</h1>
        <p className="mt-2 text-sm text-slate-500">Last updated: July 2025</p>

        <div className="mt-8 max-w-4xl space-y-8 leading-7 text-slate-700">

          <div>
            <h2 className="text-xl font-semibold text-navy-950 mb-3">1. Who We Are</h2>
            <p>Smart Profits Trader ("we", "us", or "our") operates the website <strong>smartprofitstrader.com</strong> and provides trading education, copy trading management, VIP signals, and funded account coaching services. Our primary contact is <a href="mailto:support@smartprofitstrader.com" className="text-[#16A34A] underline">support@smartprofitstrader.com</a>.</p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-navy-950 mb-3">2. Information We Collect</h2>
            <p>We collect information you provide directly to us, including:</p>
            <ul className="mt-2 ml-5 list-disc space-y-1">
              <li>Name, email address, and phone number when you contact us or sign up for a service</li>
              <li>Payment information processed securely through Paystack (we do not store card details)</li>
              <li>Messages and enquiries sent via our website chat widget, WhatsApp, or Telegram</li>
              <li>Usage data such as pages visited, time on site, and browser type (via analytics)</li>
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-navy-950 mb-3">3. How We Use Your Information</h2>
            <p>We use your information to:</p>
            <ul className="mt-2 ml-5 list-disc space-y-1">
              <li>Provide, manage, and improve our trading services</li>
              <li>Process payments and send receipts</li>
              <li>Communicate with you about your account, services, and promotions</li>
              <li>Respond to enquiries and provide customer support</li>
              <li>Send educational content and trading insights (you may unsubscribe at any time)</li>
              <li>Comply with legal obligations</li>
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-navy-950 mb-3">4. WhatsApp &amp; Messaging</h2>
            <p>When you message us via WhatsApp or Telegram, your phone number and message content are processed to provide support and respond to your enquiries. We use Meta's WhatsApp Business API and do not share your messaging data with third parties for marketing purposes.</p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-navy-950 mb-3">5. Sharing Your Information</h2>
            <p>We do not sell or rent your personal information. We may share it with:</p>
            <ul className="mt-2 ml-5 list-disc space-y-1">
              <li><strong>Service providers</strong> who help us operate our business (e.g. payment processors, email platforms, cloud services)</li>
              <li><strong>Legal authorities</strong> if required by law or to protect our rights</li>
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-navy-950 mb-3">6. Data Retention</h2>
            <p>We retain your personal information for as long as necessary to provide our services and comply with legal obligations. You may request deletion of your data at any time by emailing us.</p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-navy-950 mb-3">7. Your Rights</h2>
            <p>You have the right to access, correct, or delete your personal information. To exercise these rights, contact us at <a href="mailto:support@smartprofitstrader.com" className="text-[#16A34A] underline">support@smartprofitstrader.com</a>. We will respond within 30 days.</p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-navy-950 mb-3">8. Cookies</h2>
            <p>Our website may use cookies to improve your experience. You can disable cookies in your browser settings, though some features may not function correctly.</p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-navy-950 mb-3">9. Security</h2>
            <p>We implement appropriate technical and organisational measures to protect your personal data against unauthorised access, loss, or misuse.</p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-navy-950 mb-3">10. Changes to This Policy</h2>
            <p>We may update this Privacy Policy from time to time. Changes will be posted on this page with an updated date. Continued use of our services after changes constitutes acceptance of the updated policy.</p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-navy-950 mb-3">11. Contact Us</h2>
            <p>For any privacy-related questions, contact us at:<br />
              <strong>Smart Profits Trader</strong><br />
              Email: <a href="mailto:support@smartprofitstrader.com" className="text-[#16A34A] underline">support@smartprofitstrader.com</a><br />
              Website: <a href="https://www.smartprofitstrader.com" className="text-[#16A34A] underline">www.smartprofitstrader.com</a>
            </p>
          </div>

        </div>
      </section>
    </SPTPageShell>
  );
}
