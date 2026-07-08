import Image from "next/image";
import Link from "next/link";
import { FloatingChatWidget } from "@/components/spt/floating-chat-widget";
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

// ── Links ───────────────────────────────────────────────────────────────────
const iFundsAffiliateHref = "https://ifunds.io/?ref=vhDR3gs1018MYe2ea";
const whatsappBaseUrl = "https://wa.me/2349164753603";
const whatsappHref =
  `${whatsappBaseUrl}?text=Hello%20Smart%20Profits%20Trader%20team%2C%20I%27m%20interested%20in%20getting%20a%20funded%20account%20through%20iFunds.%20Please%20help%20me%20understand%20the%20account%20options%2C%20fees%2C%20profit-share%2C%20and%20how%20to%20get%20started.`;

// ── Background texture ───────────────────────────────────────────────────────
function MarketTexture() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      <div
        className="absolute inset-0 opacity-60"
        style={{
          backgroundImage:
            "linear-gradient(rgba(15,35,70,0.045) 1px, transparent 1px), linear-gradient(90deg, rgba(15,35,70,0.045) 1px, transparent 1px)",
          backgroundSize: "42px 42px"
        }}
      />
      <svg className="absolute right-0 top-10 h-64 w-[min(560px,82vw)] translate-x-1/4 opacity-50" viewBox="0 0 560 240" fill="none">
        <path d="M8 174 C62 142 95 153 136 116 C179 76 226 91 273 61 C317 34 354 50 390 88 C430 130 461 116 503 78 C529 55 544 48 552 44" stroke="rgba(32,199,111,0.22)" strokeWidth="5" strokeLinecap="round" />
        <path d="M14 203 C62 187 98 197 143 169 C196 136 236 143 287 118 C337 93 368 123 410 153 C452 184 488 163 536 125" stroke="rgba(212,163,57,0.24)" strokeWidth="2" strokeLinecap="round" strokeDasharray="8 12" />
      </svg>
    </div>
  );
}

// ── CTA buttons ──────────────────────────────────────────────────────────────
function PrimaryCTA({ children = "Open an iFunds Account" }: { children?: React.ReactNode }) {
  return (
    <Link
      href={iFundsAffiliateHref}
      target="_blank"
      rel="noreferrer"
      className="funnel-primary inline-flex items-center justify-center gap-2 bg-navy-950 px-5 py-3 text-sm font-bold text-white hover:bg-navy-900"
    >
      {children} <ArrowRight size={16} />
    </Link>
  );
}

function AIChatCTA({ children = "Chat With Our AI Agent" }: { children?: React.ReactNode }) {
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

// ── Header ───────────────────────────────────────────────────────────────────
export function IFundsHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-slate-200/70 bg-white/92 backdrop-blur-xl">
      <div className="page-shell flex min-h-20 items-center justify-between gap-4 py-3">
        <div className="flex items-center gap-3">
          <span className="grid h-14 w-14 place-items-center overflow-hidden rounded-xl border border-slate-200 bg-white p-1.5 shadow-soft">
            <Image src="/images/smart-profits-trader-logo.png" alt="Smart Profits Trader logo" width={160} height={160} className="h-full w-full object-contain" priority />
          </span>
          <span className="hidden leading-tight sm:block">
            <span className="block font-semibold text-navy-950">Smart Profits Trader × iFunds</span>
            <span className="block text-xs font-semibold uppercase tracking-[0.14em] text-profit-600">Instant Prop Trading — No Challenge Required</span>
          </span>
        </div>
        <div className="flex items-center gap-2">
          <Link
            href={iFundsAffiliateHref}
            target="_blank"
            rel="noreferrer"
            className="funnel-header-cta rounded-md bg-navy-950 px-4 py-2.5 text-sm font-bold text-white shadow-sm hover:bg-navy-900"
          >
            Open iFunds Account
          </Link>
          <Link
            href={whatsappHref}
            target="_blank"
            rel="noreferrer"
            className="funnel-header-cta rounded-md bg-profit-500 px-4 py-2.5 text-sm font-bold text-navy-950 shadow-[0_12px_30px_rgba(32,199,111,0.25)] hover:bg-profit-600 hover:text-white"
          >
            AI Agent
          </Link>
        </div>
      </div>
    </header>
  );
}

// ── Hero ─────────────────────────────────────────────────────────────────────
function AccountPreview() {
  return (
    <div className="funnel-hero-visual hero-slide-right relative">
      <div className="rounded-[26px] border border-slate-200 bg-white p-5 shadow-[0_24px_70px_rgba(15,35,70,0.12)]">
        <div className="rounded-[20px] bg-gradient-to-br from-slate-50 to-blue-50 p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-bold uppercase tracking-wide text-slate-500">iFunds Console</p>
              <h2 className="mt-2 text-2xl font-semibold text-navy-950">Your Funded Account</h2>
            </div>
            <div className="grid h-11 w-11 place-items-center rounded-full bg-profit-500/15 text-profit-600">
              <WalletCards size={22} />
            </div>
          </div>
          <div className="mt-6 overflow-hidden rounded-2xl border border-slate-200 bg-navy-950 p-4">
            <svg className="h-36 w-full" viewBox="0 0 460 150" fill="none" aria-hidden="true">
              <path d="M0 118H460M0 82H460M0 46H460M0 10H460" stroke="rgba(255,255,255,0.08)" />
              <path d="M18 119 C56 104 86 113 124 86 C164 58 197 66 230 42 C267 16 299 35 330 69 C362 103 388 88 430 46" stroke="#20c76f" strokeWidth="4" strokeLinecap="round" />
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
          <div className="mt-5 grid gap-3">
            {[
              ["Account size", "$10,000 — $25,000+"],
              ["Setup fee", "$700 → $10k · $1,600 → $25k"],
              ["No evaluation", "Get funded immediately"],
              ["Managed by SPT", "We trade — you earn"]
            ].map(([label, val]) => (
              <div key={label} className="flex items-center justify-between rounded-xl border border-white bg-white/85 px-4 py-3 shadow-sm">
                <p className="text-sm font-semibold text-navy-950">{label}</p>
                <p className="text-xs font-bold text-profit-600">{val}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="funnel-float pointer-events-none absolute -left-4 top-8 hidden rotate-[-7deg] rounded-2xl bg-white p-4 text-sm font-bold text-navy-950 shadow-xl md:block" style={{ "--float-rotate": "-7deg" } as React.CSSProperties}>
        No Phase 1 or 2
      </div>
      <div className="funnel-float pointer-events-none absolute -right-5 bottom-10 hidden rotate-[6deg] rounded-2xl bg-white p-4 text-sm font-bold text-profit-600 shadow-xl md:block" style={{ "--float-rotate": "6deg" } as React.CSSProperties}>
        SPT manages the trades
      </div>
    </div>
  );
}

export function IFundsHero() {
  return (
    <section className="overflow-hidden bg-[radial-gradient(circle_at_15%_5%,#dbeafe_0,#f8fbff_34%,#fff7f1_78%,#ffffff_100%)]">
      <div className="funnel-hero-shell py-8 sm:py-10">
        <div className="funnel-hero-panel">
          <MarketTexture />
          <div className="funnel-hero-grid">
            <div className="funnel-hero-copy hero-slide-left">
              <p className="text-sm font-bold uppercase tracking-[0.16em] text-profit-600">Powered by Smart Profits Trader</p>
              <h1 className="funnel-headline mt-4 text-4xl text-navy-950 sm:text-5xl lg:text-[4rem]">
                Get a Funded Prop Trading Account Through iFunds — No Evaluation, No Waiting
              </h1>
              <div className="mt-6 space-y-4 text-base leading-8 text-slate-600 sm:text-lg">
                <p>
                  iFunds gives you an <strong>instantly funded prop trading account</strong> with zero evaluation. Pay one fee — <strong>$700 for a $10,000 account, $1,600 for a $25,000 account</strong> — and Smart Profits Trader manages the trading for you.
                </p>
                <p>
                  The Smart Profit Algo trades the account. First profits recover your fee. After that, every withdrawal is income. No charts to watch. No evaluation to pass. Just structured, managed prop trading.
                </p>
              </div>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <PrimaryCTA />
                <AIChatCTA />
              </div>
              <p className="mt-6 rounded-[18px] border border-amber-200 bg-amber-50 p-4 text-sm leading-6 text-amber-900">
                Trading involves risk. Funded accounts can be lost if drawdown limits or platform rules are violated. Results are not guaranteed.
              </p>
            </div>
            <AccountPreview />
          </div>
        </div>
      </div>
    </section>
  );
}

// ── What is iFunds ───────────────────────────────────────────────────────────
export function IFundsWhatIsIt() {
  return (
    <section className="page-shell py-16">
      <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
        <div>
          <h2 className="text-3xl font-semibold leading-tight text-navy-950 sm:text-4xl">What Is iFunds?</h2>
          <div className="mt-5 space-y-4 leading-7 text-slate-600">
            <p>
              iFunds is an <strong>instant funding platform</strong> that gives traders access to prop firm capital without requiring a traditional evaluation phase. You pay a one-time account fee, receive a funded account immediately, and start trading right away.
            </p>
            <p>
              There is no Phase 1, no Phase 2, no monthly subscription, and no evaluation pass required. The account is yours from day one.
            </p>
            <p>
              Smart Profits Trader partners with iFunds to offer a <strong>fully managed version</strong> of this service — our trading operation handles the account using the Smart Profit Algo, weekly optimization, and disciplined risk management. You collect the profit share.
            </p>
          </div>
          <div className="mt-7 flex flex-wrap gap-3">
            <PrimaryCTA>Visit iFunds Platform</PrimaryCTA>
            <AIChatCTA>Ask Our AI Agent</AIChatCTA>
          </div>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          {([
            ["No Evaluation", "Skip Phase 1 and Phase 2. Pay the fee, get the account.", Clock3],
            ["Instant Capital Access", "$10k or $25k funded account available immediately.", WalletCards],
            ["We Manage the Trading", "SPT's algo-supported trading operation handles every trade.", Bot],
            ["Transparent Profit Share", "First profits cover your fee. Then it's all income.", BarChart3]
          ] as const).map(([title, text, Icon]) => (
            <div key={title} className="rounded-[22px] border border-slate-200 bg-white p-5 shadow-soft">
              <div className="grid h-11 w-11 place-items-center rounded-2xl bg-navy-950 text-profit-500">
                <Icon size={20} />
              </div>
              <h3 className="mt-4 font-semibold text-navy-950">{title}</h3>
              <p className="mt-2 text-sm leading-6 text-slate-600">{text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── Account options ──────────────────────────────────────────────────────────
export function IFundsAccountOptions() {
  const tiers = [
    {
      name: "Standard",
      size: "$10,000",
      fee: "$700 one-time fee",
      features: ["Instant account access", "No evaluation required", "Managed by SPT", "Profit share after fee recovery", "Gold trading — Smart Profit Algo"]
    },
    {
      name: "Advanced",
      size: "$25,000",
      fee: "$1,600 one-time fee",
      features: ["Instant account access", "No evaluation required", "Managed by SPT", "Profit share after fee recovery", "Gold trading — Smart Profit Algo"]
    }
  ];

  return (
    <section className="bg-gradient-to-b from-slate-50 to-white py-16">
      <div className="page-shell">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-semibold leading-tight text-navy-950 sm:text-4xl">iFunds Account Options</h2>
          <p className="mt-4 leading-7 text-slate-600">
            Choose the account size that fits your capital and income goal. Both accounts are managed by Smart Profits Trader from day one.
          </p>
        </div>
        <div className="mt-10 grid gap-6 md:grid-cols-2 max-w-3xl mx-auto">
          {tiers.map((tier, index) => (
            <div key={tier.name} className={`rounded-[26px] border p-6 shadow-soft ${index === 1 ? "border-profit-400 bg-profit-50/30" : "border-slate-200 bg-white"}`}>
              {index === 1 && (
                <span className="mb-4 inline-block rounded-md bg-profit-500/15 px-3 py-1 text-xs font-bold uppercase tracking-wide text-profit-600">Most Popular</span>
              )}
              <h3 className="text-xl font-semibold text-navy-950">{tier.name}</h3>
              <p className="mt-2 text-4xl font-semibold text-navy-950">{tier.size}</p>
              <p className="mt-1 text-sm font-semibold text-slate-500">{tier.fee}</p>
              <ul className="mt-6 space-y-3">
                {tier.features.map((f) => (
                  <li key={f} className="flex gap-3 text-sm leading-6 text-slate-700">
                    <CheckCircle2 className="mt-0.5 shrink-0 text-profit-600" size={16} />
                    {f}
                  </li>
                ))}
              </ul>
              <Link
                href={iFundsAffiliateHref}
                target="_blank"
                rel="noreferrer"
                className="funnel-primary mt-6 inline-flex w-full items-center justify-center gap-2 bg-navy-950 px-4 py-3 text-sm font-bold text-white hover:bg-navy-900"
              >
                Open {tier.name} Account <ArrowRight size={15} />
              </Link>
            </div>
          ))}
        </div>
        <p className="mt-8 text-center text-sm text-slate-500">
          Larger account sizes may be available depending on iFunds platform availability. Confirm directly on the iFunds platform.
        </p>
      </div>
    </section>
  );
}

// ── Pain section ─────────────────────────────────────────────────────────────
export function IFundsPainSection() {
  const painPoints = [
    "They pay evaluation fees and fail before reaching the profit target.",
    "They spend months trying to pass Phase 1 and 2, only to fail at the final stage.",
    "They break drawdown rules under pressure.",
    "They overtrade trying to hit the profit target quickly.",
    "They lack a structured system to protect the account.",
    "They get emotional when drawdown occurs.",
    "They do not know how to manage a funded account professionally."
  ];

  return (
    <section className="page-shell py-16">
      <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
        <div>
          <h2 className="funnel-section-title text-3xl font-semibold text-navy-950 sm:text-4xl">Traditional Prop Firms Make You Prove Yourself First. iFunds Funds You Immediately.</h2>
          <p className="mt-5 leading-7 text-slate-600">
            Most prop firms require weeks or months of evaluation before you see a funded account. iFunds removes all of that — one fee, instant capital, and Smart Profits Trader manages the trading.
          </p>
          <div className="mt-7">
            <PrimaryCTA>Skip the Evaluation — Start with iFunds</PrimaryCTA>
          </div>
        </div>
        <div className="rounded-[24px] border border-slate-200 bg-white p-6 shadow-soft">
          <p className="font-semibold text-navy-950">Why most traders struggle with traditional prop firms:</p>
          <div className="mt-5 grid gap-3">
            {painPoints.map((item) => (
              <div key={item} className="flex gap-3 rounded-xl bg-slate-50 p-3 text-sm leading-6 text-slate-700">
                <ShieldAlert className="mt-0.5 shrink-0 text-amber-600" size={17} />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ── How SPT manages the account ──────────────────────────────────────────────
export function IFundsSPTManagement() {
  const algoPoints = [
    [Radar, "Strategy testing", "Multiple strategies are tested under live market conditions before deployment."],
    [BarChart3, "Market analysis", "The algo studies price behavior, volatility, liquidity, and trend patterns."],
    [LineChart, "Demo validation", "Strategies are demo-tested before going live on funded accounts."],
    [RefreshCcw, "Weekly optimization", "Every weekend, strategies are reviewed and adjusted to market conditions."],
    [ShieldCheck, "Drawdown control", "Strict risk limits are applied on every trade to protect the account."],
    [Target, "Profit tracking", "Growth, profit share, and withdrawal milestones are tracked professionally."]
  ] as const;

  return (
    <section className="relative overflow-hidden py-16">
      <MarketTexture />
      <div className="page-shell relative grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
        <div>
          <h2 className="text-3xl font-semibold leading-tight text-navy-950 sm:text-4xl">Smart Profits Trader Manages the Account — You Collect the Profit</h2>
          <div className="mt-5 space-y-4 leading-7 text-slate-600">
            <p>
              Once you open your iFunds account, Smart Profits Trader takes over the trading operation. Our <strong>Smart Profit Algo</strong> executes all trades using a machine learning-driven analysis system designed for discipline and risk control.
            </p>
            <p>
              You do not need to watch charts, place trades, or make decisions. The algo handles everything — entries, exits, drawdown limits, and weekly performance reviews.
            </p>
            <p>
              First profits from the account are used to recover your setup fee. After that, every withdrawal goes through the profit-share structure — giving you a clear, performance-based income from the account.
            </p>
          </div>
          <div className="mt-7 flex flex-wrap gap-3">
            <AIChatCTA>Ask Our AI Agent How It Works</AIChatCTA>
          </div>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          {algoPoints.map(([Icon, title, text], index) => (
            <div key={title} className="funnel-card rounded-[18px] border border-slate-200 bg-white p-5 shadow-sm">
              <div className="flex items-center justify-between">
                <Icon className="text-profit-600" />
                <span className="text-xs font-bold text-slate-400">0{index + 1}</span>
              </div>
              <h3 className="mt-4 font-semibold text-navy-950">{title}</h3>
              <p className="mt-2 text-sm leading-6 text-slate-500">{text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── Profit share ─────────────────────────────────────────────────────────────
export function IFundsProfitShare() {
  return (
    <section className="bg-slate-50 py-16">
      <div className="page-shell grid items-center gap-10 lg:grid-cols-[0.9fr_1.1fr]">
        <div>
          <h2 className="text-3xl font-semibold leading-tight text-navy-950 sm:text-4xl">Clear Profit-Share Structure</h2>
          <p className="mt-5 leading-7 text-slate-600">
            Smart Profits Trader uses a simple profit-share model for iFunds account management. The split is based on whether you pay the account setup fee upfront.
          </p>
          <div className="mt-5 space-y-3 leading-7 text-slate-600">
            <p><strong>Fee recovery first:</strong> The first profits from the account are applied to recovering your iFunds account fee ($700 or $1,600).</p>
            <p><strong>Then profit share begins:</strong> After fee recovery, profits are split according to the structure below.</p>
          </div>
          <p className="mt-5 rounded-[18px] border border-red-200 bg-red-50 p-4 text-sm leading-6 text-red-800">
            Profit share only applies when profits are generated and withdrawals are successfully processed. Accounts can be lost if rules are violated.
          </p>
        </div>
        <div className="grid gap-5 md:grid-cols-2">
          {[
            ["You Pay the Setup Fee", "65%", "Your share", "35%", "SPT share"],
            ["No Setup Fee Paid", "50%", "Your share", "50%", "SPT share"]
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

// ── Who is it for ────────────────────────────────────────────────────────────
export function IFundsWhoFor() {
  const items = [
    "You want a funded prop trading account without going through a traditional evaluation.",
    "You want an experienced team to manage the account trading on your behalf.",
    "You do not have time to sit on charts or make day-to-day trading decisions.",
    "You prefer a structured, algo-supported trading operation.",
    "You understand funded accounts come with rules and drawdown limits.",
    "You want profits, withdrawals, and fee recovery tracked professionally.",
    "You are comfortable with a performance-based income model.",
    "You understand that trading involves risk and accounts can be lost."
  ];

  return (
    <section className="page-shell py-16">
      <div className="mx-auto max-w-4xl rounded-[26px] border border-slate-200 bg-white p-6 shadow-[0_24px_70px_rgba(15,35,70,0.09)] md:p-8">
        <h2 className="text-3xl font-semibold leading-tight text-navy-950 sm:text-4xl">This iFunds Pathway Is Best For You If...</h2>
        <div className="mt-7 grid gap-3 md:grid-cols-2">
          {items.map((item) => (
            <div key={item} className="flex gap-3 rounded-2xl bg-slate-50 p-4 text-sm leading-6 text-slate-700">
              <CheckCircle2 className="mt-0.5 shrink-0 text-profit-600" size={18} />
              <span>{item}</span>
            </div>
          ))}
        </div>
        <div className="mt-8 flex flex-wrap gap-3">
          <PrimaryCTA>Open My iFunds Account</PrimaryCTA>
          <AIChatCTA>Talk to Our AI Agent First</AIChatCTA>
        </div>
      </div>
    </section>
  );
}

// ── Steps ────────────────────────────────────────────────────────────────────
export function IFundsHowItWorks() {
  const steps = [
    ["1. Open an iFunds Account", "Visit iFunds using the link below and select your preferred account size — $10k ($700) or $25k ($1,600). Complete the registration and payment on the iFunds platform."],
    ["2. Notify Smart Profits Trader", "After purchasing your account, contact our AI agent on WhatsApp. Share your iFunds account details and we will begin the onboarding process."],
    ["3. Account Setup and Handover", "Our team guides you through connecting your account, setting up access, and confirming trading parameters, risk limits, and the profit-share agreement."],
    ["4. SPT Manages the Trading", "The Smart Profit Algo executes all trades. Risk is controlled on every position. You receive regular progress updates and are notified when withdrawal milestones are reached."],
    ["5. Fee Recovery, Then Income", "First account profits recover your iFunds account fee. After that, profits are split under the agreed profit-share structure — steady, trackable income."]
  ];

  return (
    <section className="bg-gradient-to-b from-white to-blue-50 py-16">
      <div className="page-shell">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-semibold leading-tight text-navy-950 sm:text-4xl">How to Get Started with iFunds + SPT</h2>
          <p className="mt-4 leading-7 text-slate-600">Five steps from zero to a fully managed funded account.</p>
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
        <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
          <PrimaryCTA>Open iFunds Account Now</PrimaryCTA>
          <AIChatCTA>Chat With Our AI Agent</AIChatCTA>
        </div>
      </div>
    </section>
  );
}

// ── Risk section ─────────────────────────────────────────────────────────────
export function IFundsTrustSection() {
  const items = [
    "Controlled risk on every trade",
    "Drawdown monitoring and alerts",
    "Proper trade selection process",
    "iFunds platform rule awareness",
    "Weekly strategy optimization",
    "Professional progress tracking",
    "No reckless overtrading",
    "Full communication with client"
  ];

  return (
    <section className="page-shell py-16">
      <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
        <div>
          <h2 className="text-3xl font-semibold leading-tight text-navy-950 sm:text-4xl">We Protect the Account Like It's Our Own</h2>
          <div className="mt-5 space-y-4 leading-7 text-slate-600">
            <p>iFunds accounts are powerful, but they must be traded carefully. Every funded account has rules — drawdown limits, consistency requirements, profit targets, and withdrawal conditions.</p>
            <p>
              Smart Profits Trader treats every account with the same discipline we apply to our own capital. We monitor drawdown, enforce risk limits, and optimize weekly to give each account the best chance of consistent performance.
            </p>
            <p>We do not promise guaranteed withdrawals or risk-free results. We do promise structure, discipline, and full transparency.</p>
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

// ── Final CTA ────────────────────────────────────────────────────────────────
export function IFundsFinalCTA() {
  return (
    <section className="page-shell py-16">
      <div className="overflow-hidden rounded-[28px] bg-[radial-gradient(circle_at_top_left,#dbeafe_0,#f8fbff_46%,#fff7f1_100%)] p-6 shadow-[0_24px_70px_rgba(15,35,70,0.1)] md:p-10">
        <div className="relative mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-semibold leading-tight text-navy-950 sm:text-4xl">
            Open Your iFunds Account and Let SPT Trade It For You
          </h2>
          <p className="mt-5 leading-7 text-slate-600">
            $700 for a $10k account. $1,600 for a $25k account. No evaluation. No challenge. No waiting.
          </p>
          <p className="mt-3 leading-7 text-slate-600">
            Click the button below to open your iFunds account, then contact our AI agent to start the onboarding process with Smart Profits Trader.
          </p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <PrimaryCTA>Open My iFunds Account</PrimaryCTA>
            <AIChatCTA>Talk to Our AI Agent</AIChatCTA>
          </div>
        </div>
      </div>
    </section>
  );
}

// ── Footer ───────────────────────────────────────────────────────────────────
export function IFundsFooter() {
  return (
    <footer className="border-t border-slate-200 bg-white py-8">
      <div className="page-shell">
        <div className="flex flex-col justify-between gap-5 text-sm text-slate-500 md:flex-row md:items-start">
          <div className="max-w-2xl">
            <p>Smart Profits Trader × iFunds is part of the Smart Profits Trader ecosystem by Laptop Lifestyle Income.</p>
            <p className="mt-1 text-xs text-slate-400">
              This page contains affiliate links to iFunds. Smart Profits Trader may earn a commission if you open an account using our link. This does not change the cost to you.
            </p>
            <p className="mt-3 text-xs leading-5">
              Trading involves significant risk. Smart Profits Trader does not guarantee profits, fixed returns, or risk-free results. Funded accounts can be lost if trading rules or drawdown limits are violated. Only participate with funds you can afford to risk.
            </p>
          </div>
          <div className="flex flex-wrap gap-4">
            {[
              ["Prop Trading", "/spt/instant-funded"],
              ["Copy Trading", "/spt/copy-trading"],
              ["VIP Signals", "/spt/vip"],
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

// ── Full page export ─────────────────────────────────────────────────────────
export function IFundsFunnelPage() {
  return (
    <main className="funnel-page min-h-screen bg-white">
      <IFundsHeader />
      <IFundsHero />
      <IFundsWhatIsIt />
      <IFundsAccountOptions />
      <IFundsPainSection />
      <IFundsSPTManagement />
      <IFundsProfitShare />
      <IFundsWhoFor />
      <IFundsHowItWorks />
      <IFundsTrustSection />
      <IFundsFinalCTA />
      <IFundsFooter />
      <FloatingChatWidget />
    </main>
  );
}
