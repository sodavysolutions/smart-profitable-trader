import { PublicShell } from "@/components/PublicShell";
import { ApplicationForm } from "@/components/ApplicationForm";

export default function ContactPage() {
  return (
    <PublicShell>
      <section className="page-shell grid gap-10 py-14 lg:grid-cols-[420px_1fr]">
        <div>
          <h1 className="text-4xl font-semibold text-navy-950">Contact Us</h1>
          <p className="mt-4 leading-7 text-slate-600">Send a message, start on WhatsApp, or apply for a specific service. Social links can be connected in company settings.</p>
          <div className="mt-6 space-y-3 text-sm text-slate-700">
            <p>Email: support@smartprofitabletrader.com</p>
            <p>
              WhatsApp:{" "}
              <a href="https://wa.me/2347087970133" target="_blank" rel="noreferrer" className="font-semibold text-profit-600 hover:text-navy-950">
                +234 708 797 0133
              </a>
            </p>
            <p>Social: Instagram · Facebook · LinkedIn</p>
          </div>
        </div>
        <ApplicationForm initialService="general" />
      </section>
    </PublicShell>
  );
}
