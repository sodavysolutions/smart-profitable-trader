import Link from "next/link";
import { PublicShell } from "@/components/PublicShell";
import { Card } from "@/components/UI";
import { services } from "@/lib/data";

export default function ServicesPage() {
  return (
    <PublicShell>
      <section className="page-shell py-14">
        <h1 className="text-4xl font-semibold text-navy-950">Trading Services</h1>
        <p className="mt-4 max-w-3xl leading-7 text-slate-600">Choose the service that matches your account stage. Every application becomes a lead record for fast follow-up.</p>
        <div className="mt-10 grid gap-6">
          {services.map((service) => (
            <Card key={service.title}>
              <div className="grid gap-6 lg:grid-cols-[1fr_260px]">
                <div>
                  <h2 className="text-2xl font-semibold text-navy-950">{service.title}</h2>
                  <p className="mt-3 leading-7 text-slate-600">{service.description}</p>
                  <div className="mt-5 grid gap-4 md:grid-cols-3">
                    <Info title="Benefits" items={service.benefits} />
                    <Info title="Who it is for" items={[service.audience]} />
                    <Info title="Requirements" items={[service.requirements]} />
                  </div>
                </div>
                <Link href={`/apply/${service.slug}`} className="self-start rounded-md bg-profit-500 px-5 py-3 text-center text-sm font-bold text-navy-950">
                  Apply for {service.title}
                </Link>
              </div>
            </Card>
          ))}
        </div>
      </section>
    </PublicShell>
  );
}

function Info({ title, items }: { title: string; items: string[] }) {
  return (
    <div>
      <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-500">{title}</h3>
      <ul className="mt-3 space-y-2 text-sm leading-6 text-slate-600">
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </div>
  );
}
