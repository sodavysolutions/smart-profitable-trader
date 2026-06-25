import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Bot,
  CheckCircle2,
  Clock3,
  LineChart,
  MessageCircle,
  Radar,
  ShieldCheck,
  Sparkles,
  WalletCards
} from "lucide-react";

const applyHref = "/spt/apply?service=copy-trading";
const whatsappHref =
  "https://wa.me/2347087970133?text=Hello%20Smart%20Profitable%20Trader%20team%2C%20I%E2%80%99m%20interested%20in%20the%20Copy%20Trading%20service.%20Please%20send%20me%20the%20full%20details%2C%20requirements%2C%20and%20how%20to%20get%20started";
const floatingWhatsappHref =
  "https://wa.me/2347087970133?text=Hello%20Smart%20Profitable%20Trader%20AI%20Agent%2C%20I%E2%80%99m%20interested%20in%20Copy%20Trading.%20Please%20help%20me%20understand%20how%20it%20works%2C%20the%20requirements%2C%20risk%2C%20and%20how%20to%20get%20started";

function PrimaryCTA({ children = "Apply to Join Copy Trading" }: { children?: React.ReactNode }) {
  return (
    <Link
      href={applyHref}
      className="funnel-primary inline-flex items-center justify-center gap-2 bg-navy-950 px-5 py-3 text-sm font-bold text-white hover:bg-navy-900"
    >
      {children} <ArrowRight size={16} />
    </Link>
  );
}

function WhatsAppCTA({ children = "Chat With Us on WhatsApp" }: { children?: React.ReactNode }) {
  return (
    <Link
      href={whatsappHref}
      target="_blank"
      rel="noreferrer"
      className="funnel-secondary inline-flex items-center justify-center gap-2 border border-slate-200 bg-white px-5 py-3 text-sm font-bold text-navy-950 shadow-sm hover:border-profit-500"
    >
      <MessageCircle size={16} className="text-profit-600" />
      {children}
    </Link>
  );
}

export function CopyTradingHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-slate-200/70 bg-white/92 backdrop-blur-xl">
      <div className="page-shell flex min-h-20 items-center justify-between gap-4 py-3">
        <Link href="/spt/home" className="flex items-center gap-3">
          <span className="grid h-14 w-14 place-items-center overflow-hidden rounded-xl border border-slate-200 bg-white p-1.5 shadow-soft">
            <Image src="/images/smart-profits-trader-logo.png" alt="Smart Profits Trader logo" width={160} height={160} className="h-full w-full object-contain" priority />
          </span>
          <span className="hidden leading-tight sm:block">
            <span className="block font-semibold text-navy-950">Smart Profits Trader Copy Trading</span>
            <span className="block text-xs font-semibold uppercase tracking-[0.14em] text-profit-600">A Personal Account Trading Solution</span>
          </span>
        </Link>
        <div className="flex items-center gap-2">
          <Link href={applyHref} className="funnel-header-cta rounded-md bg-navy-950 px-4 py-2.5 text-sm font-bold text-white shadow-sm hover:bg-navy-900">
            Apply Now
          </Link>
          <Link href={whatsappHref} target="_blank" rel="noreferrer" className="funnel-header-cta rounded-md bg-profit-500 px-4 py-2.5 text-sm font-bold text-navy-950 shadow-[0_12px_30px_rgba(32,199,111,0.25)] hover:bg-profit-600 hover:text-white">
            WhatsApp
          </Link>
        </div>
      </div>
    </header>
  );
}

export function CopyTradingHero() {
  return (
    <section className="overflow-hidden bg-[radial-gradient(circle_at_15%_5%,#dbeafe_0,#f8fbff_34%,#fff7f1_78%,#ffffff_100%)]">
      <div className="funnel-hero-shell py-8 sm:py-10">
        <div className="funnel-hero-panel">
          <div className="funnel-hero-grid">
            <div className="funnel-hero-copy hero-slide-left">
              <p className="text-sm font-bold uppercase tracking-[0.16em] text-profit-600">Smart Profits Trader Copy Trading</p>
              <h1 className="funnel-headline mt-5 text-4xl text-navy-950 sm:text-5xl lg:text-[4rem]">
                Let Your Trading Account Follow a Smarter Algo-Powered System — Even If You Don’t Have Time to Trade Yourself
              </h1>
              <div className="mt-6 space-y-4 text-base leading-8 text-slate-600 sm:text-lg">
                <p>
                  Smart Profits Trader Copy Trading helps busy people participate in the forex and gold market by connecting their trading account to a structured trading system powered by the <strong>Smart Profit Algo</strong>.
                </p>
                <p>
                  Instead of spending hours analyzing charts, chasing signals, or making emotional trading decisions, your account can follow selected trades from our risk-managed trading operation.
                </p>
              </div>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <PrimaryCTA />
                <WhatsAppCTA />
              </div>
              <p className="mt-6 rounded-[18px] border border-amber-200 bg-amber-50 p-4 text-sm leading-6 text-amber-900">
                Trading involves risk, and results are not guaranteed. Our focus is structured execution, risk management, and continuous optimization.
              </p>
            </div>
            <div className="funnel-hero-visual hero-slide-right relative">
              <div className="rounded-[26px] border border-slate-200 bg-white p-5 shadow-[0_24px_70px_rgba(15,35,70,0.12)]">
                <div className="rounded-[20px] bg-gradient-to-br from-slate-50 to-blue-50 p-5">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs font-bold uppercase tracking-wide text-slate-500">Personal account console</p>
                      <h2 className="mt-2 text-2xl font-semibold text-navy-950">Copy Trading Flow</h2>
                    </div>
                    <div className="grid h-11 w-11 place-items-center rounded-full bg-profit-500/15 text-profit-600">
                      <Bot size={22} />
                    </div>
                  </div>
                  <div className="mt-6 grid gap-3">
                    {[
                      ["Account Connected", "Personal account transparency"],
                      ["Algo-Supported Execution", "Structured trading process"],
                      ["Weekly Optimization", "Market condition reviews"],
                      ["Risk Monitoring", "Controlled exposure approach"]
                    ].map(([title, text], index) => (
                      <div key={title} className="rounded-xl border border-white bg-white/85 p-4 shadow-sm">
                        <div className="flex items-center justify-between gap-4">
                          <div>
                            <p className="text-sm font-semibold text-navy-950">{title}</p>
                            <p className="mt-1 text-xs text-slate-500">{text}</p>
                          </div>
                          <span className="text-xs font-bold text-profit-600">0{index + 1}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="funnel-float pointer-events-none absolute -left-4 top-8 hidden rotate-[-7deg] rounded-2xl bg-white p-4 text-sm font-bold text-navy-950 shadow-xl md:block" style={{ "--float-rotate": "-7deg" } as React.CSSProperties}>
                Your account stays yours
              </div>
              <div className="funnel-float pointer-events-none absolute -right-5 bottom-10 hidden rotate-[6deg] rounded-2xl bg-white p-4 text-sm font-bold text-profit-600 shadow-xl md:block" style={{ "--float-rotate": "6deg" } as React.CSSProperties}>
                Weekly optimization
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function CopyTradingPainSection() {
  return (
    <section className="page-shell py-16">
      <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
        <div>
          <p className="text-sm font-bold uppercase tracking-[0.16em] text-profit-600">The problem</p>
          <h2 className="funnel-section-title mt-4 text-3xl font-semibold text-navy-950 sm:text-4xl">
            You Want to Benefit From Forex, But You Don’t Have the Time, Skill, or Emotional Control to Trade Properly
          </h2>
        </div>
        <div className="rounded-[24px] border border-slate-200 bg-white p-6 leading-7 text-slate-600 shadow-soft">
          <p>The forex market creates real opportunities, but most people struggle because they try to trade without a system.</p>
          <div className="mt-5 grid gap-3">
            {[
              "Some people are too busy with work or business.",
              "Some do not know how to analyze the market.",
              "Some enter trades emotionally.",
              "Some jump from one signal group to another.",
              "Some lose money because they do not understand risk management."
            ].map((item) => (
              <div key={item} className="flex gap-3 rounded-xl bg-slate-50 p-3 text-sm text-slate-700">
                <CheckCircle2 className="mt-0.5 shrink-0 text-profit-600" size={17} />
                <span>{item}</span>
              </div>
            ))}
          </div>
          <p className="mt-5">
            That is why Smart Profits Trader created a more structured path.
          </p>
          <p className="mt-4">
            Our Copy Trading service is designed for people who want trading exposure without spending all day in front of charts. You keep your trading account, you stay in control of your funds, and your account follows selected trading activity from our system.
          </p>
        </div>
      </div>
    </section>
  );
}

export function CopyTradingSolutionSection() {
  return (
    <section className="bg-gradient-to-b from-slate-50 to-white py-16">
      <div className="page-shell">
        <div className="grid items-center gap-10 lg:grid-cols-[1.05fr_0.95fr]">
          <div>
            <h2 className="funnel-section-title text-3xl font-semibold text-navy-950 sm:text-4xl">A More Structured Way to Participate in the Markets</h2>
            <div className="mt-5 space-y-4 leading-7 text-slate-600">
              <p>
                With Smart Profits Trader Copy Trading, your account is connected to our trading operation and follows selected trades powered by the <strong>Smart Profit Algo</strong>.
              </p>
              <p>
                The Smart Profit Algo supports our trading decisions by testing strategies, analyzing market behavior, validating setups, and helping us stay aligned with current market conditions.
              </p>
              <p>
                Every weekend, we carry out optimization reviews to improve the system based on market trends, volatility, liquidity, and price behavior.
              </p>
              <p>
                This does not remove risk, but it gives the trading process more structure, discipline, and consistency than trading randomly.
              </p>
            </div>
            <div className="mt-7">
              <PrimaryCTA />
            </div>
          </div>
          <div className="rounded-[24px] border border-slate-200 bg-white p-6 shadow-[0_24px_70px_rgba(15,35,70,0.1)]">
            <div className="grid gap-4">
              {[
                [Radar, "Market behavior analysis"],
                [LineChart, "Strategy testing and validation"],
                [Clock3, "Weekend optimization reviews"],
                [ShieldCheck, "Risk-managed execution"]
              ].map(([Icon, text]) => {
                const TypedIcon = Icon as typeof Radar;
                return (
                  <div key={text as string} className="flex items-center gap-4 rounded-2xl bg-slate-50 p-4">
                    <div className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-profit-500/15 text-profit-600">
                      <TypedIcon size={21} />
                    </div>
                    <p className="font-semibold text-navy-950">{text as string}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function CopyTradingBenefits() {
  const benefits = [
    ["Save Time and Avoid Chart Stress", "You do not need to spend your day watching candles, studying indicators, or waiting for trade setups. The system handles trade execution while you focus on your work, business, or daily life.", Clock3],
    ["Follow a Structured Trading Process", "Instead of guessing or trading emotionally, your account follows a process supported by strategy testing, market analysis, weekly optimization, and risk-managed execution.", Sparkles],
    ["Stay in Control of Your Own Account", "Your money remains in your trading account. You can monitor activity, track performance, and maintain transparency while your account follows the trading setup.", WalletCards]
  ] as const;

  return (
    <section className="page-shell py-16">
      <div className="mx-auto max-w-3xl text-center">
        <h2 className="text-3xl font-semibold leading-tight text-navy-950 sm:text-4xl">Why This Works Better Than Trying to Trade Alone</h2>
      </div>
      <div className="mt-10 grid gap-5 lg:grid-cols-3">
        {benefits.map(([title, text, Icon]) => (
          <div key={title} className="funnel-card rounded-[22px] border border-slate-200 bg-white p-6 shadow-soft">
            <div className="grid h-12 w-12 place-items-center rounded-2xl bg-navy-950 text-profit-500">
              <Icon size={22} />
            </div>
            <h3 className="mt-5 text-xl font-semibold text-navy-950">{title}</h3>
            <p className="mt-3 text-sm leading-6 text-slate-600">{text}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export function CopyTradingWhoFor() {
  return (
    <section className="bg-gradient-to-b from-white to-blue-50 py-16">
      <div className="page-shell">
        <div className="mx-auto max-w-4xl rounded-[26px] border border-slate-200 bg-white p-6 shadow-[0_24px_70px_rgba(15,35,70,0.09)] md:p-8">
          <h2 className="text-3xl font-semibold leading-tight text-navy-950 sm:text-4xl">This Copy Trading Service Is Best For You If…</h2>
          <div className="mt-7 grid gap-3 md:grid-cols-2">
            {[
              "You want to benefit from forex or gold trading but do not have time to trade manually.",
              "You are tired of jumping from one signal group to another.",
              "You have tried trading before but struggled with consistency.",
              "You prefer a more hands-free trading approach.",
              "You want your personal trading account to follow a structured system.",
              "You understand that trading carries risk and you want a more disciplined approach."
            ].map((item) => (
              <div key={item} className="flex gap-3 rounded-2xl bg-slate-50 p-4 text-sm leading-6 text-slate-700">
                <CheckCircle2 className="mt-0.5 shrink-0 text-profit-600" size={18} />
                <span>{item}</span>
              </div>
            ))}
          </div>
          <div className="mt-8">
            <PrimaryCTA>Apply to See If You Qualify</PrimaryCTA>
          </div>
        </div>
      </div>
    </section>
  );
}

export function CopyTradingHowItWorks() {
  const steps = [
    ["Apply", "Complete the short application form so we can understand your account size, broker, trading goal, and risk level."],
    ["Get Reviewed", "Our team reviews your details and confirms if copy trading is suitable for your account."],
    ["Connect Your Account", "If approved, we guide you through the account connection and setup process."],
    ["Track Progress", "Once connected, your account follows selected trades from our system while you monitor activity and receive updates."]
  ];

  return (
    <section className="page-shell py-16">
      <div className="mx-auto max-w-3xl text-center">
        <h2 className="text-3xl font-semibold leading-tight text-navy-950 sm:text-4xl">How to Get Started</h2>
      </div>
      <div className="mt-10 grid gap-4 md:grid-cols-4">
        {steps.map(([title, text], index) => (
          <div key={title} className="rounded-[18px] border border-slate-200 bg-white p-5 shadow-sm">
            <span className="text-xs font-bold text-profit-600">STEP {index + 1}</span>
            <h3 className="mt-3 font-semibold text-navy-950">{title}</h3>
            <p className="mt-2 text-sm leading-6 text-slate-600">{text}</p>
          </div>
        ))}
      </div>
      <div className="mt-8 text-center">
        <PrimaryCTA>Start My Application</PrimaryCTA>
      </div>
    </section>
  );
}

export function CopyTradingTrustSection() {
  return (
    <section className="bg-slate-50 py-16">
      <div className="page-shell grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
        <div>
          <h2 className="text-3xl font-semibold leading-tight text-navy-950 sm:text-4xl">Built Around Risk Management, Not Hype</h2>
          <div className="mt-5 space-y-4 leading-7 text-slate-600">
            <p>Smart Profits Trader does not promote reckless trading or guaranteed-profit claims.</p>
            <p>
              Our approach is built around structure, controlled exposure, weekly optimization, and account monitoring. The goal is to trade with a clear process instead of emotional decisions.
            </p>
            <p>
              Every trade still carries risk. Losses can happen. But with a structured system, proper monitoring, and disciplined execution, trading becomes more professional than simply guessing your way through the market.
            </p>
          </div>
        </div>
        <div className="grid gap-3 sm:grid-cols-2">
          {[
            "Algo-supported trading decisions",
            "Weekly optimization reviews",
            "Account progress monitoring",
            "Risk-managed execution",
            "Transparent personal account setup",
            "No guaranteed-profit claims"
          ].map((item) => (
            <div key={item} className="flex gap-3 rounded-2xl border border-slate-200 bg-white p-4 text-sm font-semibold text-navy-950 shadow-sm">
              <ShieldCheck className="shrink-0 text-profit-600" size={18} />
              <span>{item}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function CopyTradingFinalCTA() {
  return (
    <section className="page-shell py-16">
      <div className="overflow-hidden rounded-[28px] bg-[radial-gradient(circle_at_top_left,#dbeafe_0,#f8fbff_46%,#fff7f1_100%)] p-6 shadow-[0_24px_70px_rgba(15,35,70,0.1)] md:p-10">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-semibold leading-tight text-navy-950 sm:text-4xl">Ready to Stop Trading Alone?</h2>
          <p className="mt-5 leading-7 text-slate-600">
            If you want to participate in forex or gold trading but do not have the time, skill, or confidence to trade manually, Smart Profits Trader Copy Trading may be the right path for you.
          </p>
          <p className="mt-3 leading-7 text-slate-600">
            Apply now and let us review your account to see if you qualify.
          </p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <PrimaryCTA />
            <WhatsAppCTA />
          </div>
        </div>
      </div>
    </section>
  );
}

export function FloatingWhatsAppButton() {
  return (
    <Link
      href={floatingWhatsappHref}
      target="_blank"
      rel="noreferrer"
      className="floating-whatsapp fixed bottom-2 right-2 z-50 inline-flex items-center gap-2 bg-profit-500 px-3 py-2 text-sm font-bold text-navy-950 transition hover:-translate-y-0.5 hover:bg-profit-600 hover:text-white sm:bottom-5 sm:right-5 sm:px-4 sm:py-3"
    >
      <MessageCircle size={18} />
      <span className="hidden sm:inline">Ask Our WhatsApp AI Agent</span>
      <span className="sm:hidden">WhatsApp AI</span>
    </Link>
  );
}

export function CopyTradingFooter() {
  return (
    <footer className="border-t border-slate-200 bg-white py-8">
      <div className="page-shell">
        <div className="flex flex-col justify-between gap-5 text-sm text-slate-500 md:flex-row md:items-start">
          <div className="max-w-2xl">
            <p>Smart Profits Trader Copy Trading is part of the Smart Profits Trader ecosystem by Laptop Lifestyle Income.</p>
            <p className="mt-3 text-xs leading-5">
              Trading involves significant risk. Smart Profits Trader does not guarantee profits, fixed returns, or risk-free results. Only trade with funds you can afford to risk.
            </p>
          </div>
          <div className="flex flex-wrap gap-4">
            {[
              ["VIP Signals", "/spt/vip-signals"],
              ["Instant Funded", "/spt/instant-funded"],
              ["Evaluation Management", "/spt/evaluation"],
              ["Risk Disclaimer", "/spt/risk-disclaimer"],
              ["Contact", "/spt/contact"]
            ].map(([label, href]) => (
              <Link key={href} href={href} className="hover:text-navy-950">
                {label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

export function CopyTradingFunnelPage() {
  return (
    <main className="funnel-page min-h-screen bg-white">
      <CopyTradingHeader />
      <CopyTradingHero />
      <CopyTradingPainSection />
      <CopyTradingSolutionSection />
      <CopyTradingBenefits />
      <CopyTradingWhoFor />
      <CopyTradingHowItWorks />
      <CopyTradingTrustSection />
      <CopyTradingFinalCTA />
      <CopyTradingFooter />
      <FloatingWhatsAppButton />
    </main>
  );
}
