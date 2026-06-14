import { PublicShell } from "@/components/PublicShell";
import { ApplicationForm } from "@/components/ApplicationForm";

export default async function ApplyPage({ params }: { params: Promise<{ service: string }> }) {
  const { service } = await params;
  return (
    <PublicShell>
      <section className="page-shell grid gap-10 py-14 lg:grid-cols-[420px_1fr]">
        <div>
          <h1 className="text-4xl font-semibold text-navy-950">Application Form</h1>
          <p className="mt-4 leading-7 text-slate-600">
            Submit your details and the system will create a CRM lead with the selected service interest, source details, and follow-up trail.
          </p>
        </div>
        <ApplicationForm initialService={service} />
      </section>
    </PublicShell>
  );
}
