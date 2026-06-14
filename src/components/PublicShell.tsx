import Link from "next/link";
import { Brand } from "@/components/Brand";

const funnelNav = [
  { href: "/#algo", label: "Algo" },
  { href: "/#offers", label: "Offers" },
  { href: "/#founder", label: "Founder" },
  { href: "/#faq", label: "FAQ" }
];

export function PublicShell({ children }: { children: React.ReactNode }) {
  return (
    <main className="min-h-screen bg-white">
      <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/95 backdrop-blur">
        <div className="page-shell flex h-20 items-center justify-between gap-6">
          <Link href="/" className="rounded-md bg-navy-950 px-3 py-2">
            <Brand />
          </Link>
          <nav className="hidden items-center gap-7 text-sm font-medium text-slate-600 md:flex">
            {funnelNav.map((item) => (
              <Link key={item.href} href={item.href} className="hover:text-navy-950">
                {item.label}
              </Link>
            ))}
          </nav>
          <Link href="/#apply" className="rounded-md bg-profit-500 px-4 py-2 text-sm font-bold text-navy-950">
            Apply Now
          </Link>
        </div>
      </header>
      {children}
    </main>
  );
}
