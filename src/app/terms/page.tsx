import type { Metadata } from "next";
import { SPTPageShell } from "@/components/spt/sections";

export const metadata: Metadata = {
  title: "Terms of Service | Smart Profits Trader",
  description: "Smart Profits Trader terms of service — the rules and conditions governing use of our trading services.",
};

export default function TermsPage() {
  return (
    <SPTPageShell>
      <section className="page-shell py-16">
        <h1 className="text-4xl font-semibold text-navy-950">Terms of Service</h1>
        <p className="mt-2 text-sm text-slate-500">Last updated: July 2025</p>

        <div className="mt-8 max-w-4xl space-y-8 leading-7 text-slate-700">

          <div>
            <h2 className="text-xl font-semibold text-navy-950 mb-3">1. Acceptance of Terms</h2>
            <p>By accessing or using the services offered by Smart Profits Trader ("we", "us", "our") at <strong>smartprofitstrader.com</strong>, you agree to be bound by these Terms of Service. If you do not agree, please do not use our services.</p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-navy-950 mb-3">2. Services Offered</h2>
            <p>Smart Profits Trader provides the following services:</p>
            <ul className="mt-2 ml-5 list-disc space-y-1">
              <li><strong>Copy Trading Management</strong> — We trade on your behalf using your capital under a profit-share arrangement</li>
              <li><strong>VIP Trading Signals</strong> — Daily trading signals delivered via our platform</li>
              <li><strong>Instant Funded Account Coaching</strong> — Guidance and support for passing prop firm challenges</li>
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-navy-950 mb-3">3. Risk Disclaimer</h2>
            <p>Trading financial instruments including forex, commodities, indices, and contracts for difference (CFDs) involves substantial risk of loss. Past performance is not indicative of future results. You should only trade with capital you can afford to lose. Smart Profits Trader does not guarantee profits, account passes, or funded account approvals.</p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-navy-950 mb-3">4. Eligibility</h2>
            <p>You must be at least 18 years of age to use our services. By using our services, you represent that you are of legal age in your jurisdiction to engage in trading activities.</p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-navy-950 mb-3">5. Payments &amp; Refunds</h2>
            <p>All payments are processed securely via Paystack. Subscription fees (e.g. VIP Signals) are non-refundable once a billing cycle has commenced. For copy trading, our 20% profit share is only charged when profitable — there are no monthly management fees. Disputes must be raised within 7 days of a transaction.</p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-navy-950 mb-3">6. Client Responsibilities</h2>
            <p>Clients are responsible for:</p>
            <ul className="mt-2 ml-5 list-disc space-y-1">
              <li>Providing accurate personal and payment information</li>
              <li>Understanding the risks of trading before participating</li>
              <li>Complying with all applicable laws and regulations in their jurisdiction</li>
              <li>Maintaining the security of their account credentials</li>
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-navy-950 mb-3">7. Intellectual Property</h2>
            <p>All content on this website, including text, graphics, logos, and trading strategies, is the property of Smart Profits Trader and may not be copied, reproduced, or distributed without written permission.</p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-navy-950 mb-3">8. Limitation of Liability</h2>
            <p>Smart Profits Trader shall not be liable for any direct, indirect, incidental, or consequential damages arising from the use of our services, including trading losses, missed opportunities, or technical failures. Our total liability in any circumstance shall not exceed the amount you paid for the relevant service in the preceding 30 days.</p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-navy-950 mb-3">9. Termination</h2>
            <p>We reserve the right to suspend or terminate your access to our services at our discretion if you violate these terms, engage in fraudulent activity, or for any other reason with reasonable notice.</p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-navy-950 mb-3">10. Changes to Terms</h2>
            <p>We may update these Terms of Service at any time. Continued use of our services after changes are posted constitutes your acceptance of the updated terms.</p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-navy-950 mb-3">11. Governing Law</h2>
            <p>These terms are governed by the laws of the Federal Republic of Nigeria. Any disputes shall be resolved through negotiation in good faith, or if unresolved, through the appropriate courts in Nigeria.</p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-navy-950 mb-3">12. Contact</h2>
            <p>For questions about these terms, contact us at:<br />
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
