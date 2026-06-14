import Link from "next/link";
import { PublicShell } from "@/components/PublicShell";

export default function ThankYouPage() {
  return (
    <PublicShell>
      <section className="page-shell py-20 text-center">
        <h1 className="text-4xl font-semibold text-navy-950">Thank you</h1>
        <p className="mx-auto mt-4 max-w-xl leading-7 text-slate-600">Your application has been received. The team can now follow up from the CRM dashboard.</p>
        <Link href="/" className="mt-8 inline-block rounded-md bg-profit-500 px-5 py-3 text-sm font-bold text-navy-950">
          Back to Homepage
        </Link>
      </section>
    </PublicShell>
  );
}
