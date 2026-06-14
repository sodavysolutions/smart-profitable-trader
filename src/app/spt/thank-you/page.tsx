import type { Metadata } from "next";
import Link from "next/link";
import { SPTPageShell } from "@/components/spt/sections";

export const metadata: Metadata = {
  title: "Thank You | Smart Profitable Trader",
  description: "Your Smart Profitable Trader application has been received."
};

export default function SPTThankYouPage() {
  return (
    <SPTPageShell>
      <section className="page-shell py-24 text-center">
        <h1 className="text-4xl font-semibold text-navy-950">Thank you</h1>
        <p className="mx-auto mt-4 max-w-xl leading-7 text-slate-600">
          Your application has been received. Our team will review your details and follow up with the next steps.
        </p>
        <Link href="/spt/home" className="mt-8 inline-block rounded-md bg-profit-500 px-5 py-3 text-sm font-bold text-navy-950">
          Back to SPT Homepage
        </Link>
      </section>
    </SPTPageShell>
  );
}
