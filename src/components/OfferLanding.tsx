import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { ApplicationForm } from "@/components/ApplicationForm";
import { PublicShell } from "@/components/PublicShell";

export function OfferLanding({
  title,
  subtitle,
  description,
  service
}: {
  title: string;
  subtitle: string;
  description: string;
  service: string;
}) {
  return (
    <PublicShell>
      <section className="bg-[radial-gradient(circle_at_top_left,#dbeafe_0,#f8fbff_38%,#fff7f4_100%)] py-14">
        <div className="page-shell grid gap-10 lg:grid-cols-[0.85fr_1.15fr]">
          <div>
            <Link href="/" className="inline-flex items-center gap-2 text-sm font-bold text-navy-950">
              <ArrowLeft size={16} />
              Back to homepage
            </Link>
            <h1 className="mt-8 text-4xl font-semibold leading-tight text-navy-950 sm:text-5xl">{title}</h1>
            <p className="mt-4 text-lg font-semibold text-profit-600">{subtitle}</p>
            <p className="mt-5 leading-7 text-slate-600">{description}</p>
            <p className="mt-6 rounded-[18px] border border-red-200 bg-red-50 p-4 text-sm leading-6 text-red-800">
              Trading involves risk and results are not guaranteed. Apply only with funds you can afford to risk.
            </p>
          </div>
          <ApplicationForm initialService={service} />
        </div>
      </section>
    </PublicShell>
  );
}
