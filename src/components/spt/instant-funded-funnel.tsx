import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  BarChart3,
  Bot,
  CheckCircle2,
  Clock3,
  LineChart,
  MessageCircle,
  Radar,
  RefreshCcw,
  ShieldAlert,
  ShieldCheck,
  Target,
  WalletCards
} from "lucide-react";

const applyHref = "/spt/apply?service=instant-funded";
const whatsappBaseUrl = "https://wa.me/2347087970133";
const whatsappHref =
  `${whatsappBaseUrl}?text=Hello%20Smart%20Profits%20Trader%20team%2C%20I%27m%20interested%20in%20the%20Instant%20Funded%20Prop%20Trading%20service.%20Please%20send%20me%20the%20available%20account%20options%2C%20setup%20requirements%2C%20profit-share%20details%2C%20risk%20guidelines%2C%20and%20how%20to%20get%20started.`;
const floatingWhatsappHref =
  `${whatsappBaseUrl}?text=Hello%20Smart%20Profits%20Trader%20team%2C%20I%27m%20interested%20in%20Instant%20Funded%20Prop%20Trading.%20Please%20help%20me%20understand%20the%20account%20options%2C%20setup%20requirements%2C%20profit-share%20structure%2C%20risk%2C%20and%20how%20to%20get%20started.`;

function MarketTexture() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      <div
        className="absolute inset-0 opacity-60"
        style={{
          backgroundImage: "linear-gradient(rgba(15,35,70,0.045) 1px, transparent 1px), linear-gradient(90deg, rgba(15,35,70,0.045) 1px, transparent 1px)",
          backgroundSize: "42px 42px"
        }}
      />
      <svg className="absolute right-0 top-10 h-64 w-[min(560px,82vw)] translate-x-1/4 opacity-50" viewBox="0 0 560 240" fill="none">
        <path d="M8 174 C62 142 95 153 136 116 C179 76 226 91 273 61 C317 34 354 50 390 88 C430 130 461 116 503 78 C529 55 544 48 552 44" stroke="rgba(32,199,111,0.22)" strokeWidth="5" strokeLinecap="round" />
        <path d="M14 203 C62 187 98 197 143 169 C196 136 236 143 287 118 C337 93 368 123 410 153 C452 184 488 163 536 125" stroke="rgba(212,163,57,0.24)" strokeWidth="2" strokeLinecap="round" strokeDasharray="8 12" />
      </svg>
      <svg className="absolute -left-20 bottom-0 h-56 w-[480px] opacity-40" viewBox="0 0 480 210" fill="none">
        {[36, 78, 120, 162, 204, 246, 288, 330, 372, 414].map((x, index) => {
          const top = [55, 34, 73, 45, 25, 62, 84, 47, 32, 59][index];
          const bottom = [138, 112, 159, 126, 103, 146, 169, 128, 111, 135][index];
          const body = [86, 62, 101, 72, 53, 88, 109, 75, 61, 85][index];
          return (
            <g key={x}>
              <path d={`M${x} ${top}V${bottom}`} stroke="rgba(7,20,39,0.14)" strokeWidth="3" strokeLinecap="round" />
              <rect x={x - 8} y={body} width="16" height="34" rx="4" fill={index % 2 ? "rgba(32,199,111,0.14)" : "rgba(212,163,57,0.13)"} stroke="rgba(7,20,39,0.1)" />
            </g>
          );
        })}
      </svg>
    </div>
  );
}

function PrimaryCTA({ children = "Apply for Instant Funded Trading" }: { children?: React.ReactNode }) {
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

export function InstantFundedHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-slate-200/70 bg-white/92 backdrop-blur-xl">
      <div className="page-shell flex min-h-20 items-center justify-between gap-4 py-3">
        <div className="flex items-center gap-3">
          <span className="grid h-14 w-14 place-items-center overflow-hidden rounded-xl border border-slate-200 bg-white p-1.5 shadow-soft">
            <Image src="/images/smart-profits-trader-logo.png" alt="Smart Profits Trader logo" width={160} height={160} className="h-full w-full object-contain" priority />
          </span>
          <span className="hidden leading-tight sm:block">
            <span className="block font-semibold text-navy-950">Smart Profits Trader Instant Funded</span>
            <span className="block text-xs font-semibold uppercase tracking-[0.14em] text-profit-600">A Prop Trading Account Growth Solution</span>
          </span>
        </div>
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

function FundedAccountPreview() {
  return (
    <div className="funnel-hero-visual hero-slide-right relative">
      <div className="rounded-[26px] border border-slate-200 bg-white p-5 shadow-[0_24px_70px_rgba(15,35,70,0.12)]">
        <div className="rounded-[20px] bg-gradient-to-br from-slate-50 to-blue-50 p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-bold uppercase tracking-wide text-slate-500">Instant funded console</p>
              <h2 className="mt-2 text-2xl font-semibold text-navy-950">Account Growth Flow</h2>
            </div>
            <div className="grid h-11 w-11 place-items-center rounded-full bg-profit-500/15 text-profit-600">
              <WalletCards size={22} />
            </div>
          </div>
          <div className="mt-6 overflow-hidden rounded-2xl border border-slate-200 bg-navy-950 p-4">
            <svg className="h-36 w-full" viewBox="0 0 460 150" fill="none" aria-hidden="true">
              <path d="M0 118H460M0 82H460M0 46H460M0 10H460" stroke="rgba(255,255,255,0.08)" />
              <path d="M18 119 C56 104 86 113 124 86 C164 58 197 66 230 42 C267 16 299 35 330 69 C362 103 388 88 430 46" stroke="#20c76f" strokeWidth="4" strokeLinecap="round" />
              <path d="M18 132 C64 122 93 136 139 112 C184 90 223 94 264 78 C315 58 346 91 384 106 C412 117 431 105 448 94" stroke="rgba(212,163,57,0.78)" strokeWidth="2" strokeLinecap="round" strokeDasharray="7 10" />
              {[48, 92, 136, 180, 224, 268, 312, 356, 400].map((x, index) => {
                const tops = [72, 52, 86, 45, 36, 69, 88, 57, 41];
                const bottoms = [137, 118, 144, 116, 101, 139, 141, 125, 112];
                const body = [98, 78, 111, 67, 59, 94, 108, 82, 64];
                return (
                  <g key={x}>
                    <path d={`M${x} ${tops[index]}V${bottoms[index]}`} stroke="rgba(255,255,255,0.62)" strokeWidth="2" strokeLinecap="round" />
                    <rect x={x - 7} y={body[index]} width="14" height="30" rx="3" fill={index % 2 ? "rgba(32,199,111,0.72)" : "rgba(212,163,57,0.66)"} />
                  </g>
                );
              })}
            </svg>
          </div>
          <div className="mt-6 grid gap-3">
            {[
              ["Account setup", "Provider rules and access guidance"],
              ["Trading management", "Algo-supported execution process"],
              ["Progress tracking", "Growth, drawdown, and withdrawals"],
              ["Profit share", "Transparent split records"]
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
        Skip Phase 1 and 2
      </div>
      <div className="funnel-float pointer-events-none absolute -right-5 bottom-10 hidden rotate-[6deg] rounded-2xl bg-white p-4 text-sm font-bold text-profit-600 shadow-xl md:block" style={{ "--float-rotate": "6deg" } as React.CSSProperties}>
        Drawdown monitoring
      </div>
    </div>
  );
}

export function InstantFundedHero() {
  return (
    <section className="overflow-hidden bg-[radial-gradient(circle_at_15%_5%,#dbeafe_0,#f8fbff_34%,#fff7f1_78%,#ffffff_100%)]">
      <div className="funnel-hero-shell py-8 sm:py-10">
        <div className="funnel-hero-panel">
          <MarketTexture />
          <div className="funnel-hero-grid">
            <div className="funnel-hero-copy hero-slide-left">
              <h1 className="funnel-headline text-4xl text-navy-950 sm:text-5xl lg:text-[4rem]">
                Get Access to Funded Trading Opportunities Without Going Through the Long Evaluation Challenge Route
              </h1>
              <div className="mt-6 space-y-4 text-base leading-8 text-slate-600 sm:text-lg">
                <p>
                  Smart Profits Trader Instant Funded helps clients access funded prop trading opportunities faster, with account setup support, structured trading management, progress tracking, and profit-share handling, all powered by our <strong>Smart Profit Algo</strong>.
                </p>
                <p>
                  Instead of struggling through Phase 1 and Phase 2 evaluations yourself, you can start with an instant funded account pathway and allow our structured trading operation to manage the trading process professionally.
                </p>
                <p>
                  Our trading decisions are supported by a machine learning-driven trading system built around strategy testing, live-market validation, weekly optimization, and risk-managed execution.
                </p>
              </div>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <PrimaryCTA />
                <WhatsAppCTA />
              </div>
              <p className="mt-6 rounded-[18px] border border-amber-200 bg-amber-50 p-4 text-sm leading-6 text-amber-900">
                Trading involves risk, and results are not guaranteed. Funded accounts can be lost if trading rules or drawdown limits are violated.
              </p>
            </div>
            <FundedAccountPreview />
          </div>
        </div>
      </div>
    </section>
  );
}

export function InstantFundedPainSection() {
  const painPoints = [
    "They fail Phase 1 before reaching the target.",
    "They pass Phase 1 but lose the account in Phase 2.",
    "They break drawdown rules.",
    "They overtrade because they are under pressure.",
    "They lack a structured system.",
    "They do not know how to manage risk on funded accounts.",
    "They get emotional when the account enters drawdown."
  ];

  return (
    <section className="page-shell py-16">
      <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
        <div>
          <h2 className="funnel-section-title text-3xl font-semibold text-navy-950 sm:text-4xl">Most People Want Prop Firm Funding, But the Evaluation Process Can Be Stressful and Difficult</h2>
          <p className="mt-5 leading-7 text-slate-600">
            Prop trading has opened the door for people to access larger trading capital, but passing evaluations is not always easy. The opportunity is real, but the process can be frustrating.
          </p>
        </div>
        <div className="rounded-[24px] border border-slate-200 bg-white p-6 shadow-soft">
          <p className="font-semibold text-navy-950">Many traders struggle because:</p>
          <div className="mt-5 grid gap-3">
            {painPoints.map((item) => (
              <div key={item} className="flex gap-3 rounded-xl bg-slate-50 p-3 text-sm leading-6 text-slate-700">
                <ShieldAlert className="mt-0.5 shrink-0 text-amber-600" size={17} />
                <span>{item}</span>
              </div>
            ))}
          </div>
          <p className="mt-5 leading-7 text-slate-600">
            That is why Smart Profits Trader created the Instant Funded pathway for clients who want a faster route to funded trading without going through the traditional challenge process alone.
          </p>
        </div>
      </div>
    </section>
  );
}

export function InstantFundedSolutionSection() {
  const items = [
    "Account selection guidance",
    "Setup support",
    "Trading management",
    "Account progress tracking",
    "Profit-share calculation",
    "Withdrawal tracking",
    "Risk and drawdown monitoring",
    "Updates and communication"
  ];

  return (
    <section className="bg-gradient-to-b from-slate-50 to-white py-16">
      <div className="page-shell grid items-center gap-10 lg:grid-cols-[1.05fr_0.95fr]">
        <div>
          <h2 className="text-3xl font-semibold leading-tight text-navy-950 sm:text-4xl">A Faster, More Structured Path Into Prop Trading</h2>
          <div className="mt-5 space-y-4 leading-7 text-slate-600">
            <p>
              With Smart Profits Trader Instant Funded, you can purchase or access an instant funded account option and allow our team to support the trading operation using a structured, risk-managed process.
            </p>
            <p>
              The goal is to help clients participate in funded trading opportunities with more structure, more discipline, and better operational support.
            </p>
          </div>
          <div className="mt-7">
            <PrimaryCTA />
          </div>
        </div>
        <div className="grid gap-3 sm:grid-cols-2">
          {items.map((item) => (
            <div key={item} className="flex gap-3 rounded-2xl border border-slate-200 bg-white p-4 text-sm font-semibold text-navy-950 shadow-sm">
              <CheckCircle2 className="mt-0.5 shrink-0 text-profit-600" size={18} />
              <span>{item}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function InstantFundedAlgoSection() {
  const points = [
    [Radar, "Strategy testing"],
    [BarChart3, "Market behavior analysis"],
    [LineChart, "Live-market demo validation"],
    [RefreshCcw, "Weekly optimization"],
    [ShieldCheck, "Risk-managed execution"],
    [Target, "Drawdown awareness"]
  ] as const;

  return (
    <section className="relative overflow-hidden py-16">
      <MarketTexture />
      <div className="page-shell relative grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
        <div>
          <h2 className="text-3xl font-semibold leading-tight text-navy-950 sm:text-4xl">Powered by the Smart Profit Algo</h2>
          <div className="mt-5 space-y-4 leading-7 text-slate-600">
            <p>
              Every trading operation is supported by our <strong>Smart Profit Algo</strong>, a sophisticated algorithmic trading system designed to analyze market behavior, test strategies, validate setups, and support better trade selection.
            </p>
            <p>
              The Smart Profit Algo uses machine learning-driven analysis to test multiple strategies under changing market conditions. Before stronger strategies are deployed, they are first demo-tested on live market behavior.
            </p>
            <p>
              Every weekend, we run optimization reviews to help align the system with current volatility, liquidity, trend behavior, and price action.
            </p>
          </div>
          <p className="mt-6 rounded-[18px] border border-amber-200 bg-amber-50 p-4 text-sm leading-6 text-amber-900">
            The algo does not remove risk. It helps us trade with more structure, discipline, and continuous improvement.
          </p>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          {points.map(([Icon, text], index) => (
            <div key={text} className="funnel-card rounded-[18px] border border-slate-200 bg-white p-5 shadow-sm">
              <div className="flex items-center justify-between">
                <Icon className="text-profit-600" />
                <span className="text-xs font-bold text-slate-400">0{index + 1}</span>
              </div>
              <h3 className="mt-4 font-semibold text-navy-950">{text}</h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function InstantFundedBenefits() {
  const benefits = [
    ["Skip the Long Evaluation Route", "Instead of spending weeks or months trying to pass Phase 1 and Phase 2, the instant funded pathway allows you to start with a funded account option faster.", Clock3],
    ["Let a Structured Trading System Handle Execution", "You do not have to sit on charts all day or make emotional decisions. Our trading operation is supported by the Smart Profit Algo, weekly optimization, and controlled risk management.", Bot],
    ["Track Progress, Withdrawals, and Profit Share Professionally", "We help monitor account growth, profit progress, drawdown status, withdrawals, and profit-share records so the process feels organized and transparent.", BarChart3]
  ] as const;

  return (
    <section className="bg-gradient-to-b from-white to-blue-50 py-16">
      <div className="page-shell">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-semibold leading-tight text-navy-950 sm:text-4xl">Why Choose Instant Funded Prop Trading?</h2>
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
      </div>
    </section>
  );
}

export function InstantFundedAccountOptions() {
  const recommendedFirms = [
    {
      name: "iFunds",
      copy: "Explore instant funded account options through iFunds and review the latest account rules, pricing, drawdown limits, and withdrawal terms before getting started.",
      href: "https://ifunds.io/?ref=vhDR3gs1018MYe2ea"
    },
    {
      name: "TenTrade",
      copy: "Explore instant funded account options through TenTrade and confirm the available account sizes, setup requirements, platform rules, and risk limits.",
      href: "https://cabinet.10tradefx.com/links/go/4596"
    }
  ];

  return (
    <section className="page-shell py-16">
      <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr]">
        <div>
          <h2 className="text-3xl font-semibold leading-tight text-navy-950 sm:text-4xl">Choose an Instant Funded Account Option That Fits Your Goal</h2>
          <p className="mt-5 leading-7 text-slate-600">
            Smart Profits Trader can help you get started with instant funded account options based on your capital, goal, and risk appetite.
          </p>
          <p className="mt-5 rounded-[18px] border border-amber-200 bg-amber-50 p-4 text-sm leading-6 text-amber-900">
            Account prices, rules, drawdown limits, and profit-share terms may vary depending on the prop firm or instant funding provider. Final details will be confirmed during application review.
          </p>
          <div className="mt-7">
            <PrimaryCTA>Check Available Instant Funded Options</PrimaryCTA>
          </div>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {[
            ["Bronze Account", "$5,000", "$400 account purchase + $50 setup fee"],
            ["Silver Account", "$10,000", "$700 account purchase + setup fee"],
            ["Higher Account Options", "Larger accounts", "May be available depending on provider rules and current availability"]
          ].map(([title, size, requirement]) => (
            <div key={title} className="rounded-[22px] border border-slate-200 bg-white p-5 shadow-soft">
              <p className="text-sm font-bold text-profit-600">{title}</p>
              <p className="mt-4 text-3xl font-semibold text-navy-950">{size}</p>
              <p className="mt-4 text-sm leading-6 text-slate-600">{requirement}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="mt-10 rounded-[26px] border border-slate-200 bg-white p-6 shadow-[0_24px_70px_rgba(15,35,70,0.09)] md:p-8">
        <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
          <div>
            <h3 className="text-2xl font-semibold leading-tight text-navy-950">Recommended Instant Funded Prop Firms</h3>
            <p className="mt-4 text-sm leading-6 text-slate-600">
              You can use our recommended links below to review available instant funded options. Account rules, pricing, drawdown limits, and withdrawal terms may change by provider, so confirm all details before purchasing or activating any account.
            </p>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            {recommendedFirms.map((firm) => (
              <div key={firm.name} className="rounded-[22px] border border-slate-200 bg-slate-50 p-5">
                <div className="flex items-start justify-between gap-4">
                  <div className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-navy-950 text-profit-500">
                    <WalletCards size={22} />
                  </div>
                  <span className="rounded-md bg-profit-500/12 px-3 py-1 text-xs font-bold uppercase tracking-wide text-profit-600">Recommended</span>
                </div>
                <h4 className="mt-5 text-xl font-semibold text-navy-950">{firm.name}</h4>
                <p className="mt-3 text-sm leading-6 text-slate-600">{firm.copy}</p>
                <Link
                  href={firm.href}
                  target="_blank"
                  rel="noreferrer"
                  className="funnel-primary mt-5 inline-flex w-full items-center justify-center gap-2 bg-navy-950 px-4 py-3 text-sm font-bold text-white hover:bg-navy-900"
                >
                  View {firm.name} Options <ArrowRight size={15} />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export function InstantFundedProfitShare() {
  return (
    <section className="bg-slate-50 py-16">
      <div className="page-shell grid items-center gap-10 lg:grid-cols-[0.9fr_1.1fr]">
        <div>
          <h2 className="text-3xl font-semibold leading-tight text-navy-950 sm:text-4xl">Clear Profit-Share Structure</h2>
          <p className="mt-5 leading-7 text-slate-600">
            Smart Profits Trader uses a simple profit-share structure for instant funded account management. This allows clients to choose the entry option that works best for them while keeping the trading operation fair, transparent, and performance-based.
          </p>
          <p className="mt-5 rounded-[18px] border border-red-200 bg-red-50 p-4 text-sm leading-6 text-red-800">
            Profit share only applies when profits are generated and withdrawals are successfully processed. Trading losses, account violations, or failed accounts can affect withdrawal eligibility.
          </p>
        </div>
        <div className="grid gap-5 md:grid-cols-2">
          {[
            ["If You Pay the Setup Fee", "65%", "Client receives", "35%", "Smart Profits Trader receives"],
            ["If You Do Not Pay the Setup Fee", "50%", "Client receives", "50%", "Smart Profits Trader receives"]
          ].map(([title, clientShare, clientLabel, sptShare, sptLabel]) => (
            <div key={title} className="rounded-[24px] border border-slate-200 bg-white p-6 shadow-soft">
              <h3 className="text-xl font-semibold text-navy-950">{title}</h3>
              <div className="mt-6 grid gap-3">
                <div className="rounded-2xl bg-profit-500/12 p-4">
                  <p className="text-4xl font-semibold text-navy-950">{clientShare}</p>
                  <p className="mt-1 text-sm font-semibold text-slate-600">{clientLabel}</p>
                </div>
                <div className="rounded-2xl bg-slate-50 p-4">
                  <p className="text-4xl font-semibold text-navy-950">{sptShare}</p>
                  <p className="mt-1 text-sm font-semibold text-slate-600">{sptLabel}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function InstantFundedWhoFor() {
  const items = [
    "You want access to funded trading opportunities without going through a long evaluation route.",
    "You want a faster way to participate in prop trading.",
    "You do not have the time or skill to trade the account yourself.",
    "You prefer a structured trading operation to manage the account.",
    "You understand funded accounts come with rules and drawdown limits.",
    "You want account progress, profit share, and withdrawals tracked professionally.",
    "You are comfortable with a performance-based model.",
    "You understand that trading involves risk and accounts can be lost."
  ];

  return (
    <section className="page-shell py-16">
      <div className="mx-auto max-w-4xl rounded-[26px] border border-slate-200 bg-white p-6 shadow-[0_24px_70px_rgba(15,35,70,0.09)] md:p-8">
        <h2 className="text-3xl font-semibold leading-tight text-navy-950 sm:text-4xl">This Instant Funded Pathway Is Best For You If...</h2>
        <div className="mt-7 grid gap-3 md:grid-cols-2">
          {items.map((item) => (
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
    </section>
  );
}

export function InstantFundedHowItWorks() {
  const steps = [
    ["Apply", "Complete the application form so we can understand your capital, preferred account size, risk level, and funding goal."],
    ["Account Review", "Our team reviews your details and recommends the most suitable instant funded account option based on availability and your goal."],
    ["Setup and Onboarding", "Once the account is purchased or activated, we guide you through setup, account access, communication, and profit-share agreement."],
    ["Trading Management Begins", "The account is managed using our structured trading process supported by the Smart Profit Algo, weekly optimization, and risk monitoring."],
    ["Track Growth and Withdrawals", "We monitor progress, track account growth, calculate profit share, and update you on withdrawal opportunities when available."]
  ];

  return (
    <section className="bg-gradient-to-b from-white to-blue-50 py-16">
      <div className="page-shell">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-semibold leading-tight text-navy-950 sm:text-4xl">How to Get Started</h2>
        </div>
        <div className="mt-10 grid gap-4 md:grid-cols-5">
          {steps.map(([title, text], index) => (
            <div key={title} className="rounded-[18px] border border-slate-200 bg-white p-5 shadow-sm">
              <span className="text-xs font-bold text-profit-600">STEP {index + 1}</span>
              <h3 className="mt-3 font-semibold text-navy-950">{title}</h3>
              <p className="mt-2 text-sm leading-6 text-slate-600">{text}</p>
            </div>
          ))}
        </div>
        <div className="mt-8 text-center">
          <PrimaryCTA>Start My Instant Funded Application</PrimaryCTA>
        </div>
      </div>
    </section>
  );
}

export function InstantFundedTrustSection() {
  const items = [
    "Controlled risk exposure",
    "Drawdown monitoring",
    "Proper trade selection",
    "Account rule awareness",
    "Weekly strategy optimization",
    "Professional progress tracking",
    "No reckless overtrading"
  ];

  return (
    <section className="page-shell py-16">
      <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
        <div>
          <h2 className="text-3xl font-semibold leading-tight text-navy-950 sm:text-4xl">Built Around Rules, Drawdown Control, and Account Protection</h2>
          <div className="mt-5 space-y-4 leading-7 text-slate-600">
            <p>Instant funded accounts are powerful, but they must be handled carefully.</p>
            <p>
              Every funded account has rules, including drawdown limits, trading restrictions, profit targets, withdrawal rules, and sometimes consistency requirements.
            </p>
            <p>
              We do not promise guaranteed withdrawals. We do not claim every account will succeed. We focus on giving each account a structured trading process and disciplined management.
            </p>
          </div>
        </div>
        <div className="grid gap-3 sm:grid-cols-2">
          {items.map((item) => (
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

export function InstantFundedFinalCTA() {
  return (
    <section className="page-shell py-16">
      <div className="overflow-hidden rounded-[28px] bg-[radial-gradient(circle_at_top_left,#dbeafe_0,#f8fbff_46%,#fff7f1_100%)] p-6 shadow-[0_24px_70px_rgba(15,35,70,0.1)] md:p-10">
        <div className="relative mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-semibold leading-tight text-navy-950 sm:text-4xl">Ready to Access Funded Trading Without the Long Challenge Process?</h2>
          <p className="mt-5 leading-7 text-slate-600">
            If you want to participate in prop trading but do not want to go through the stressful evaluation route alone, Smart Profits Trader Instant Funded may be the right path for you.
          </p>
          <p className="mt-3 leading-7 text-slate-600">
            Apply now and let us review your goal, preferred account size, and available funding options.
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

export function InstantFundedFooter() {
  return (
    <footer className="border-t border-slate-200 bg-white py-8">
      <div className="page-shell">
        <div className="flex flex-col justify-between gap-5 text-sm text-slate-500 md:flex-row md:items-start">
          <div className="max-w-2xl">
            <p>Smart Profits Trader Instant Funded is part of the Smart Profits Trader ecosystem by Laptop Lifestyle Income.</p>
            <p className="mt-3 text-xs leading-5">
              Trading involves significant risk. Smart Profits Trader does not guarantee profits, fixed returns, withdrawals, or risk-free results. Funded accounts can be lost if trading rules or drawdown limits are violated. Only participate with funds you can afford to risk.
            </p>
          </div>
          <div className="flex flex-wrap gap-4">
            {[
              ["VIP Signals", "/spt/vip-signals"],
              ["Copy Trading", "/spt/copy-trading"],
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

export function FloatingWhatsAppButton() {
  return (
    <Link
      href={floatingWhatsappHref}
      target="_blank"
      rel="noreferrer"
      className="floating-whatsapp fixed bottom-2 right-2 z-50 inline-flex items-center gap-2 bg-profit-500 px-3 py-2 text-xs font-bold text-navy-950 transition hover:-translate-y-0.5 hover:bg-profit-600 hover:text-white sm:bottom-5 sm:right-5 sm:px-4 sm:py-3 sm:text-sm"
    >
      <MessageCircle size={18} />
      <span>Chat With Us on WhatsApp</span>
    </Link>
  );
}

export function InstantFundedFunnelPage() {
  return (
    <main className="funnel-page min-h-screen bg-white">
      <InstantFundedHeader />
      <InstantFundedHero />
      <InstantFundedPainSection />
      <InstantFundedSolutionSection />
      <InstantFundedAlgoSection />
      <InstantFundedBenefits />
      <InstantFundedAccountOptions />
      <InstantFundedProfitShare />
      <InstantFundedWhoFor />
      <InstantFundedHowItWorks />
      <InstantFundedTrustSection />
      <InstantFundedFinalCTA />
      <InstantFundedFooter />
      <FloatingWhatsAppButton />
    </main>
  );
}
