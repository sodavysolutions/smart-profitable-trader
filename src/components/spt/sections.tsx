import Image from "next/image";
import Link from "next/link";
import type { LucideIcon } from "lucide-react";
import { FloatingChatWidget } from "@/components/spt/floating-chat-widget";
import {
  ArrowRight,
  BarChart3,
  Bot,
  CheckCircle2,
  ChevronDown,
  Clock3,
  Copy,
  Eye,
  FileCheck2,
  LineChart,
  MessageCircle,
  Radar,
  RefreshCcw,
  ShieldCheck,
  Signal,
  Sparkles,
  Target,
  WalletCards
} from "lucide-react";
import { ApplicationForm } from "@/components/ApplicationForm";
import { SPTNavbar } from "@/components/spt/spt-navbar";

const whatsappUrl = "https://wa.me/2349164753603";

const offers: Array<{
  title: string;
  subtitle: string;
  copy: string;
  bestFor: string[];
  cta: string;
  href: string;
  icon: LucideIcon;
}> = [
  {
    title: "Copy Trading",
    subtitle: "We trade on your behalf — you keep the profit",
    copy: "Invest capital through XM or Valetax. Our algo executes every trade. Profits are split 70/30 (you/SPT) below $5k, then 50/50 above $5k. Compound and scale until you upgrade to Instant Funded.",
    bestFor: ["Busy professionals who want passive income", "Beginners who prefer full automation", "Investors who want to compound steadily", "Anyone who wants algo-powered trading without lifting a finger"],
    cta: "Start Copy Trading",
    href: "/spt/copy-trading",
    icon: Copy
  },
  {
    title: "Instant Funded Account (iFunds)",
    subtitle: "Get a funded account — no challenge, no evaluation",
    copy: "Pay a one-time fee and receive a funded iFunds account instantly. $700 gets you a $10k account. $1,600 gets you a $25k account. We manage the account. Profits roll in. Recover your fee, then pure income.",
    bestFor: ["Traders ready to scale with prop firm capital", "Copy Trading graduates who want more leverage", "People who want funded exposure without passing a challenge", "Serious investors building a trading income"],
    cta: "Get Instantly Funded",
    href: "/spt/instant-funded",
    icon: WalletCards
  },
  {
    title: "VIP Signals — $50/month",
    subtitle: "Real-time algo signals on Gold, straight to Telegram",
    copy: "Get every trade alert — entry, take profit, and stop loss — delivered to your phone in real time. Powered by the Smart Profit Algo. Trade on your own broker account at your own pace.",
    bestFor: ["Traders who want to stay in control", "People learning the market with expert guidance", "Busy professionals who trade manually", "Anyone wanting algo-quality signals without full management"],
    cta: "Join VIP Signals — $50/month",
    href: "/spt/vip",
    icon: Signal
  }
];

const ecosystem = [
  ["Copy Trading", "We trade your account — you keep the profits. 70/30 below $5k, 50/50 above.", Copy],
  ["Instant Funded", "Get a $10k or $25k funded account instantly via iFunds. We manage it.", WalletCards],
  ["VIP Signals", "Real-time Gold signals with entry, TP, SL — delivered to Telegram daily.", Signal]
] as const;

const tradingPathCards = [
  ["I want passive income", "Best for investors who want their capital traded on their behalf with profit sharing.", "Start Copy Trading", "/spt/copy-trading", Copy],
  ["I want a funded account", "Best for those ready to scale with $10k–$25k prop firm capital via iFunds.", "Get Instant Funded", "/spt/instant-funded", WalletCards],
  ["I want daily signals", "Best for traders who trade manually and want algo-quality alerts on Gold.", "Join VIP Signals", "/spt/vip", Signal]
] as const;

const offerFitGuide = [
  ["Starting out / beginner investor", "Copy Trading ($200+ to start)"],
  ["Passive income seeker", "Copy Trading → Compound → Instant Funded"],
  ["Ready to scale with prop capital", "Instant Funded via iFunds"],
  ["Active trader who trades manually", "VIP Signals — $50/month"]
] as const;

const afterApplyItems = [
  ["Service recommendation", "We help match your goal to the best trading path."],
  ["Risk review", "We check your account type, risk comfort, and key limits."],
  ["Setup guidance", "You get clear next steps before any account setup or payment."],
  ["WhatsApp onboarding", "Our team follows up with practical onboarding details."]
] as const;

const algoSteps = [
  ["Machine Learning Analysis", "The system studies price behavior, volatility, liquidity, trends, and historical market reactions.", Radar],
  ["Strategy Testing", "Multiple strategies are tested to identify stronger setups and weaker market conditions.", BarChart3],
  ["Live Demo Validation", "Selected strategies are demo-tested in live market conditions before deployment consideration.", Eye],
  ["Weekend Optimization", "Every weekend, we review performance and optimize for current market behavior.", RefreshCcw]
] as const;

const features = [
  ["Algo-Supported Decisions", "Every trade is powered by the Smart Profit Algo — no emotions, just rules.", Bot],
  ["Weekly Optimization", "Strategies are reviewed every weekend based on live market behavior.", RefreshCcw],
  ["Two Clear Pathways", "Copy Trading for compounders. Instant Funded for scalers. Simple, structured, profitable.", LineChart],
  ["Risk-Managed Approach", "Controlled exposure, drawdown awareness, and disciplined position sizing on every trade.", ShieldCheck],
  ["Profit Tracking", "Track your balance, equity, withdrawals, and profit-share milestones clearly.", BarChart3],
  ["Clear Profit Splits", "Below $5k: 70% yours. Above $5k: 50/50. Transparent from day one.", Sparkles]
] as const;

const proofCards = ["Account Growth", "Weekly Review", "Profit Share", "Drawdown Monitoring", "Balance Tracking", "Withdrawal Tracking"];

const faqs = [
  ["Is profit guaranteed?", "No. Trading involves risk and profits are not guaranteed. Smart Profits Trader focuses on structure, risk management, and continuous optimization, but losses can still happen."],
  ["What is the Smart Profit Algo?", "The Smart Profit Algo is our algorithmic trading system that helps analyze market behavior, test strategies, validate setups, and support trading decisions."],
  ["Do I need trading experience?", "Not necessarily. If you are new, you can start with VIP signals or copy trading. If you already understand trading, choose the offer that fits your goals."],
  ["Can I use my personal account?", "Yes. Personal account trading and copy trading are designed for clients who want to use their own trading accounts."],
  ["Do you support instant funded accounts?", "Yes. We support iFunds accounts — $700 for a $10k account and $1,600 for a $25k account. We manage the trading after funding."],
  ["What is the profit split for Copy Trading?", "Below $5k account balance: 70% to you, 30% to SPT. Above $5k: 50/50. Both parties win as the account grows."],
  ["How often is the algo optimized?", "Optimization reviews are carried out every weekend to help align the trading system with current market trends and conditions."]
];

const copyTradingJourney = [
  ["Invest", "Open an XM or Valetax account. Deposit your capital. We connect and start trading."],
  ["Compound", "Profits accumulate. Your balance grows. 70% is yours below $5k — you keep compounding."],
  ["Cross $5k", "Profit split becomes 50/50. Both sides are motivated to keep growing the account."],
  ["Upgrade to Instant Funded", "Use your Copy Trading profits to fund an iFunds account. $700 → $10k. $1,600 → $25k."],
  ["Recover Your Fee", "We trade the funded account. First profits cover your fee. After that — pure income."],
  ["Scale", "Grow the funded account. Withdraw profits. Reinvest. Build a real trading income stream."]
];

const ifundsBenefits = [
  [
    "No Evaluation. No Challenge. No Waiting.",
    "Traditional prop firms make you pass Phase 1, Phase 2 before you see a cent. With iFunds, you pay once and receive a funded account immediately. We handle the trading.",
    ShieldCheck
  ],
  [
    "We Manage Everything",
    "Once funded, the Smart Profit Algo trades the account with weekly optimization. You check your dashboard. Profits roll in. No screen time required.",
    Bot
  ],
  [
    "Recover Your Cost, Then Pure Profit",
    "The first profits from the account cover your fee. After that, every dollar is income. $700 for a $10k account. $1,600 for a $25k account.",
    BarChart3
  ]
] as const;

const ifundsSteps = [
  ["Apply", "Tell us which account size you want — $10k or $25k. We confirm your details and readiness."],
  ["Pay the Fee", "$700 for a $10k account. $1,600 for a $25k account. One-time fee via iFunds."],
  ["Account Activated", "iFunds activates your funded account. We connect it and begin trading immediately."],
  ["Profits Accumulate", "First profits cover your fee. Then it is all income. Track your balance in the dashboard."],
  ["Withdraw and Scale", "Withdraw on the iFunds schedule. Reinvest to scale. Upgrade account size when ready."]
];

const ifundsFitItems = [
  "You have copy traded and are ready to scale with more capital.",
  "You want a funded account without passing a challenge or evaluation.",
  "You want to put $700 or $1,600 to work in a professionally managed account.",
  "You want to recover your fee from profits, then enjoy pure passive income.",
  "You understand that trading involves risk and results are not guaranteed.",
  "You are ready to follow a clear, structured onboarding process."
];

export function SPTHeroSection() {
  return (
    <section className="overflow-hidden bg-[radial-gradient(circle_at_12%_8%,#dbeafe_0,#f7fbff_34%,#fff7f2_72%,#ffffff_100%)]">
      <div className="page-shell py-7 sm:py-10">
        <div className="relative overflow-hidden rounded-[28px] border border-white bg-white/72 px-4 py-12 shadow-[0_30px_90px_rgba(15,35,70,0.14)] backdrop-blur md:px-10 md:py-16 lg:px-16">
          <div className="mx-auto max-w-4xl text-center">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-profit-200 bg-profit-50 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-profit-700">
              <span className="h-1.5 w-1.5 rounded-full bg-profit-500" /> Algo-Powered Trading Ecosystem
            </div>
            <h1 className="text-4xl font-bold leading-tight tracking-tight text-navy-950 sm:text-5xl lg:text-6xl">
              Trade with a System.{" "}
              <span className="text-profit-600">Not Just a Strategy.</span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-slate-600 sm:text-lg">
              Smart Profits Trader gives you two clear paths to trading income: Copy Trading (we trade your account) or Instant Funded (we trade prop firm capital for you) — both powered by the Smart Profit Algo.
            </p>
            <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-slate-500">
              Pick your path below, apply in 2 minutes, and our team will recommend your best next step.
            </p>
            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
              <Link href="/spt/apply" className="inline-flex items-center justify-center gap-2 rounded-md bg-navy-950 px-5 py-3 text-sm font-bold text-white shadow-lg shadow-navy-950/15 transition hover:-translate-y-0.5">
                Find My Best Trading Path <ArrowRight size={16} />
              </Link>
              <Link href="/spt/home#trading-solutions" className="inline-flex items-center justify-center gap-2 rounded-md border border-slate-200 bg-white px-5 py-3 text-sm font-bold text-navy-950 transition hover:-translate-y-0.5 hover:border-profit-500">
                Compare Services
              </Link>
            </div>
          </div>

          <div className="relative mx-auto mt-10 grid max-w-5xl gap-4 md:grid-cols-3">
            {tradingPathCards.map(([title, text, label, href, Icon]) => (
              <Link key={title} href={href} className="group rounded-[18px] border border-slate-200 bg-white p-5 text-left shadow-sm transition hover:-translate-y-1 hover:border-profit-500 hover:shadow-[0_20px_55px_rgba(15,35,70,0.12)]">
                <div className="flex items-center justify-between gap-4">
                  <div className="grid h-11 w-11 place-items-center rounded-2xl bg-navy-950 text-profit-500">
                    <Icon size={21} />
                  </div>
                  <ArrowRight className="text-slate-300 transition group-hover:text-profit-600" size={18} />
                </div>
                <h2 className="mt-5 text-lg font-semibold text-navy-950">{title}</h2>
                <p className="mt-2 text-sm leading-6 text-slate-600">{text}</p>
                <p className="mt-4 text-xs font-bold uppercase tracking-wide text-profit-600">{label}</p>
              </Link>
            ))}
          </div>

          <div className="relative mx-auto mt-12 max-w-4xl">
            <div className="rounded-[24px] border border-slate-200 bg-white p-4 shadow-[0_24px_70px_rgba(15,35,70,0.12)] md:p-6">
              <div className="grid gap-4 lg:grid-cols-[1.1fr_0.9fr]">
                <div className="rounded-[18px] bg-gradient-to-br from-slate-50 to-blue-50 p-5">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs font-bold uppercase tracking-wide text-slate-500">Strategy console</p>
                      <h2 className="mt-2 text-2xl font-semibold text-navy-950">Smart Profit Algo</h2>
                    </div>
                    <div className="grid h-11 w-11 place-items-center rounded-full bg-profit-500/15 text-profit-600">
                      <Bot size={22} />
                    </div>
                  </div>
                  <div className="mt-6 grid gap-3 sm:grid-cols-2">
                    {["Weekly Optimization", "Live Market Testing", "Risk Management", "Account Tracking"].map((item, index) => (
                      <div key={item} className="rounded-xl border border-white bg-white/80 p-4 shadow-sm">
                        <p className="text-sm font-semibold text-navy-950">{item}</p>
                        <div className="mt-3 h-2 overflow-hidden rounded-full bg-slate-100">
                          <div className="h-full rounded-full bg-profit-500" style={{ width: `${[88, 74, 91, 68][index]}%` }} />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="grid content-between gap-4">
                  {[
                    ["VIP Signal Delivery", "Structured market opportunities"],
                    ["Prop Firm Support", "Instant funded and evaluation pathways"],
                    ["Risk Rules", "Trading involves risk. Results are not guaranteed."]
                  ].map(([title, text]) => (
                    <div key={title} className="rounded-[18px] border border-slate-200 bg-white p-4 shadow-sm">
                      <p className="font-semibold text-navy-950">{title}</p>
                      <p className="mt-1 text-sm text-slate-500">{text}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="pointer-events-none absolute -left-4 top-12 hidden rotate-[-7deg] rounded-2xl bg-white p-4 text-sm font-bold text-navy-950 shadow-xl md:block">
              1.5% max risk guide
            </div>
            <div className="pointer-events-none absolute -right-6 bottom-10 hidden rotate-[6deg] rounded-2xl bg-white p-4 text-sm font-bold text-profit-600 shadow-xl md:block">
              Weekend optimization
            </div>
          </div>

          <p className="mx-auto mt-7 max-w-2xl text-center text-xs leading-5 text-slate-500">
            Trading involves risk and results are not guaranteed. Our focus is structured risk management, professional execution, and continuous optimization.
          </p>
        </div>
      </div>
    </section>
  );
}

export function SPTEcosystemSection() {
  return (
    <section className="page-shell py-16">
      <div className="mx-auto max-w-3xl text-center">
        <h2 className="text-3xl font-semibold text-navy-950 sm:text-4xl">One Ecosystem. Multiple Trading Income Pathways.</h2>
        <p className="mt-4 leading-7 text-slate-600">
          Smart Profits Trader helps traders, investors, and busy professionals access structured trading opportunities without needing to trade alone.
        </p>
      </div>
      <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {ecosystem.map(([title, text, Icon]) => (
          <div key={title} className="rounded-[18px] border border-slate-200 bg-white p-5 shadow-sm">
            <Icon className="text-profit-600" />
            <h3 className="mt-4 font-semibold text-navy-950">{title}</h3>
            <p className="mt-2 text-sm leading-6 text-slate-600">{text}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export function SmartProfitAlgoSection() {
  return (
    <section id="smart-profit-algo" className="bg-gradient-to-b from-slate-50 to-white py-16">
      <div className="page-shell">
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.16em] text-profit-600">Powered by the Smart Profit Algo</p>
            <h2 className="mt-4 text-3xl font-semibold text-navy-950 sm:text-4xl">Analyze, test, optimize, and deploy with more discipline.</h2>
            <p className="mt-4 leading-7 text-slate-600">
              The Smart Profit Algo is a sophisticated algorithmic trading system that uses machine learning-driven analysis to test multiple strategies, demo-test them on live market conditions, and deploy only stronger strategies after validation.
            </p>
            <p className="mt-3 leading-7 text-slate-600">
              Every weekend, optimization reviews help align the algo with current market conditions, volatility, liquidity, trends, and price behavior.
            </p>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            {algoSteps.map(([title, text, Icon], index) => (
              <div key={title} className="rounded-[18px] border border-slate-200 bg-white p-5 shadow-sm">
                <div className="flex items-center justify-between">
                  <Icon className="text-profit-600" />
                  <span className="text-xs font-bold text-slate-400">0{index + 1}</span>
                </div>
                <h3 className="mt-4 font-semibold text-navy-950">{title}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">{text}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="mt-8 rounded-[18px] border border-amber-200 bg-amber-50 p-5 text-sm leading-6 text-amber-900">
          This does not remove risk. It gives the trading operation structure, discipline, and a consistent review process.
        </div>
      </div>
    </section>
  );
}

export function OfferCardsSection() {
  return (
    <section id="trading-solutions" className="page-shell py-16">
      <div className="mx-auto max-w-3xl text-center">
        <h2 className="text-3xl font-semibold text-navy-950 sm:text-4xl">Choose the Trading Path That Fits You</h2>
        <p className="mt-4 leading-7 text-slate-600">
          Different people have different goals. Smart Profits Trader gives you multiple ways to participate in a structured trading ecosystem.
        </p>
      </div>
      <div className="mt-8 grid gap-3 rounded-[22px] border border-slate-200 bg-slate-50 p-4 md:grid-cols-4">
        {offerFitGuide.map(([person, path]) => (
          <div key={person} className="rounded-2xl bg-white p-4 shadow-sm">
            <p className="text-xs font-bold uppercase tracking-wide text-slate-400">{person}</p>
            <p className="mt-2 text-sm font-semibold leading-6 text-navy-950">{path}</p>
          </div>
        ))}
      </div>
      <div className="mt-10 grid gap-5 lg:grid-cols-2">
        {offers.map((offer) => {
          const Icon = offer.icon;
          return (
            <div key={offer.title} className="rounded-[22px] border border-slate-200 bg-white p-6 shadow-[0_18px_50px_rgba(15,35,70,0.08)] transition hover:-translate-y-1 hover:shadow-[0_24px_60px_rgba(15,35,70,0.12)]">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                <div className="grid h-12 w-12 place-items-center rounded-2xl bg-navy-950 text-profit-500">
                  <Icon size={22} />
                </div>
                <Link
                  href={offer.href}
                  className={`inline-flex items-center justify-center gap-2 rounded-md px-4 py-2 text-sm font-bold ${offer.href === "/spt/vip" ? "bg-profit-500 text-navy-950 shadow-[0_8px_20px_rgba(32,199,111,0.3)]" : "bg-navy-950 text-white"}`}
                >
                  {offer.cta} <ArrowRight size={15} />
                </Link>
              </div>
              <h3 className="mt-5 text-2xl font-semibold text-navy-950">{offer.title}</h3>
              <p className="mt-2 font-semibold text-profit-600">{offer.subtitle}</p>
              <p className="mt-4 text-sm leading-6 text-slate-600">{offer.copy}</p>
              <div className="mt-5 grid gap-2 sm:grid-cols-2">
                {offer.bestFor.map((item) => (
                  <div key={item} className="flex gap-2 text-sm text-slate-700">
                    <CheckCircle2 className="mt-0.5 shrink-0 text-profit-600" size={16} />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

export function WhyChooseSPTSection() {
  return (
    <section className="bg-gradient-to-b from-white to-slate-50 py-16">
      <div className="page-shell">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-semibold text-navy-950 sm:text-4xl">Why Traders and Investors Choose Smart Profits Trader</h2>
        </div>
        <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {features.map(([title, text, Icon]) => (
            <div key={title} className="rounded-[18px] border border-slate-200 bg-white p-5 shadow-sm">
              <Icon className="text-profit-600" />
              <h3 className="mt-4 font-semibold text-navy-950">{title}</h3>
              <p className="mt-2 text-sm leading-6 text-slate-600">{text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function AboutFounderSection() {
  return (
    <section id="founder" className="page-shell py-16">
      <div className="grid items-center gap-10 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="min-w-0 overflow-hidden rounded-[28px] bg-gradient-to-br from-blue-100 to-emerald-50 p-3 shadow-[0_24px_70px_rgba(15,35,70,0.12)]">
          <Image src="/brand/founder-portrait.png" alt="Solomon David, founder of Smart Profits Trader" width={900} height={1200} className="h-[420px] w-full rounded-[22px] object-cover object-top sm:h-[480px] lg:h-[520px]" />
        </div>
        <div className="min-w-0">
          <p className="text-sm font-bold uppercase tracking-[0.16em] text-profit-600">About the Founder</p>
          <h2 className="mt-4 text-3xl font-semibold text-navy-950 sm:text-4xl">Solomon David</h2>
          <p className="mt-2 text-lg font-semibold text-slate-700">Entrepreneur, digital marketing strategist, and trading systems builder</p>
          <div className="mt-5 space-y-4 leading-7 text-slate-600">
            <p>I created Smart Profits Trader to help everyday people access trading opportunities with more structure, better systems, and less guesswork.</p>
            <p>The ecosystem is built for traders, investors, and busy professionals who want guidance, tracking, communication, and a more organized way to participate in trading opportunities.</p>
            <p>Through the Smart Profit Algo, weekly optimization, Copy Trading, and Instant Funded accounts via iFunds, we are building a complete trading income ecosystem for people who want consistent, structured results without the guesswork.</p>
          </div>
          <p className="mt-6 font-semibold text-navy-950">- Solomon David, Founder of Smart Profits Trader</p>
          <Link href="/spt/apply" className="mt-7 inline-flex items-center gap-2 rounded-md bg-profit-500 px-5 py-3 text-sm font-bold text-navy-950">
            Start Your Trading Journey <ArrowRight size={15} />
          </Link>
        </div>
      </div>
    </section>
  );
}

export function HowItWorksSection() {
  return (
    <section id="how-it-works" className="bg-slate-50 py-16">
      <div className="page-shell">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-semibold text-navy-950 sm:text-4xl">How the Smart Profits Trader Ecosystem Works</h2>
        </div>
        <div className="mt-10 grid gap-4 md:grid-cols-4">
          {[
            ["Choose Your Path", "Copy Trading, Instant Funded (iFunds), or VIP Signals — pick what fits your goals."],
            ["Complete the Application", "Tell us your account type, goals, and risk profile."],
            ["Get Connected", "Our team guides onboarding, setup, communication, and tracking."],
            ["Track Progress", "Follow updates, reports, renewals, and performance reviews."]
          ].map(([title, text], index) => (
            <div key={title} className="rounded-[18px] border border-slate-200 bg-white p-5 shadow-sm">
              <span className="text-xs font-bold text-profit-600">STEP {index + 1}</span>
              <h3 className="mt-3 font-semibold text-navy-950">{title}</h3>
              <p className="mt-2 text-sm leading-6 text-slate-600">{text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function ResultsTrackingSection() {
  return (
    <section className="page-shell py-16">
      <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
        <div>
          <h2 className="text-3xl font-semibold text-navy-950 sm:text-4xl">Built Around Progress, Tracking, and Optimization</h2>
          <p className="mt-4 leading-7 text-slate-600">
            Trading success requires more than random entries. From VIP signals to funded account progress, every serious trading operation should be measurable.
          </p>
          <p className="mt-4 rounded-[18px] border border-red-200 bg-red-50 p-4 text-sm leading-6 text-red-800">
            Past performance does not guarantee future results. All trading carries risk.
          </p>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          {proofCards.map((card, index) => (
            <div key={card} className="rounded-[18px] border border-slate-200 bg-white p-5 shadow-sm">
              <p className="font-semibold text-navy-950">{card}</p>
              <div className="mt-4 h-2 overflow-hidden rounded-full bg-slate-100">
                <div className="h-full rounded-full bg-profit-500" style={{ width: `${[72, 84, 64, 55, 78, 69][index]}%` }} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function FAQSection() {
  return (
    <section id="faq" className="bg-gradient-to-b from-white to-blue-50 py-16">
      <div className="page-shell">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-semibold text-navy-950 sm:text-4xl">FAQs</h2>
          <p className="mt-3 text-slate-600">Everything you need to know before getting started.</p>
        </div>
        <div className="mx-auto mt-10 max-w-4xl divide-y divide-slate-200 rounded-[22px] border border-slate-200 bg-white px-5 shadow-sm">
          {faqs.map(([question, answer]) => (
            <details key={question} className="group py-5">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-semibold text-navy-950">
                {question}
                <ChevronDown className="shrink-0 text-slate-400 transition group-open:rotate-180" size={18} />
              </summary>
              <p className="mt-3 text-sm leading-6 text-slate-600">{answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

export function FinalCTASection() {
  return (
    <section id="apply" className="page-shell grid gap-10 py-16 lg:grid-cols-[0.85fr_1.15fr]">
      <div className="min-w-0">
        <h2 className="text-3xl font-semibold text-navy-950 sm:text-4xl">Not Sure Which Trading Path Fits You?</h2>
        <p className="mt-4 leading-7 text-slate-600">
          Apply and we will review your goal, experience, account type, and risk comfort so we can recommend the most practical Smart Profits Trader option for you.
        </p>
        <div className="mt-7 grid gap-3">
          {afterApplyItems.map(([title, text], index) => (
            <div key={title} className="flex gap-3 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
              <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-profit-500/15 text-xs font-bold text-profit-600">0{index + 1}</span>
              <div>
                <p className="font-semibold text-navy-950">{title}</p>
                <p className="mt-1 text-sm leading-6 text-slate-600">{text}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-6 grid gap-3 sm:grid-cols-2">
          <Link href="/spt/home#trading-solutions" className="inline-flex items-center justify-center gap-2 rounded-md bg-navy-950 px-5 py-3 text-sm font-bold text-white">
            Explore Trading Solutions
          </Link>
          <Link href={whatsappUrl} target="_blank" rel="noreferrer" className="inline-flex items-center justify-center gap-2 rounded-md border border-slate-200 bg-white px-5 py-3 text-sm font-bold text-navy-950">
            Speak With Us
          </Link>
        </div>
      </div>
      <div className="min-w-0">
        <div className="mb-4 rounded-2xl border border-profit-500/30 bg-profit-500/10 p-4">
          <p className="font-semibold text-navy-950">Takes about 2 minutes.</p>
          <p className="mt-1 text-sm leading-6 text-slate-600">Share your details and our team will follow up with the clearest next step.</p>
        </div>
        <ApplicationForm initialService="general" thankYouPath="/spt/thank-you" />
      </div>
    </section>
  );
}

export function SPTFooter() {
  return (
    <footer className="border-t border-slate-200 bg-white py-8">
      <div className="page-shell flex flex-col justify-between gap-5 text-sm text-slate-500 md:flex-row md:items-center">
        <p>Smart Profits Trader by Laptop Lifestyle Income. Trading involves risk and results are not guaranteed.</p>
        <div className="flex flex-wrap gap-4">
          {[
            ["VIP Signals", "/spt/vip"],
            ["Copy Trading", "/spt/copy-trading"],
            ["Instant Funded", "/spt/instant-funded"],
            ["Contact", "/spt/contact"],
            ["Risk Disclaimer", "/spt/risk-disclaimer"]
          ].map(([label, href]) => (
            <Link key={href} href={href} className="hover:text-navy-950">
              {label}
            </Link>
          ))}
        </div>
      </div>
    </footer>
  );
}

export function SPTPageShell({ children }: { children: React.ReactNode }) {
  return (
    <main className="funnel-page min-h-screen bg-white">
      <SPTNavbar />
      {children}
      <SPTFooter />
      <FloatingChatWidget />
    </main>
  );
}

export function SPTHomepage() {
  return (
    <SPTPageShell>
      <SPTHeroSection />
      <SPTEcosystemSection />
      <SmartProfitAlgoSection />
      <OfferCardsSection />
      <WhyChooseSPTSection />
      <AboutFounderSection />
      <HowItWorksSection />
      <ResultsTrackingSection />
      <FAQSection />
      <FinalCTASection />
    </SPTPageShell>
  );
}

export const funnelPages = {
  "vip-signals": {
    title: "Smart Profits Trader VIP Signal Service",
    subtitle: "Structured trading alerts powered by the Smart Profit Algo",
    description: "Receive professional trading alerts supported by algo-backed market analysis, weekly optimization reviews, and risk-managed trade planning. Built for traders who want clearer opportunities without trading blindly.",
    service: "vip-signals"
  },
  "copy-trading": {
    title: "Copy Trading",
    subtitle: "We trade your account on your behalf — you keep the profit",
    description: "Invest through XM or Valetax. Our Smart Profit Algo executes every trade. Profits split 70/30 below $5k, then 50/50. Compound your balance and upgrade to Instant Funded when you are ready.",
    service: "copy-trading"
  },
  "instant-funded": {
    title: "Instant Funded Account (iFunds)",
    subtitle: "Get funded immediately — no challenge, no evaluation required",
    description: "Pay a one-time fee and receive a funded iFunds account. $700 gets a $10k account. $1,600 gets a $25k account. We manage the trading. First profits cover your fee, then it is all income.",
    service: "instant-funded"
  }
} as const;

export function SPTFunnelPage({ page }: { page: (typeof funnelPages)[keyof typeof funnelPages] }) {
  return (
    <SPTPageShell>
      <section className="bg-[radial-gradient(circle_at_top_left,#dbeafe_0,#f8fbff_38%,#fff7f4_100%)] py-16">
        <div className="page-shell grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <Link href="/spt/home" className="inline-flex items-center gap-2 text-sm font-bold text-navy-950">
              Back to SPT homepage
            </Link>
            <h1 className="mt-8 text-4xl font-semibold leading-tight text-navy-950 sm:text-5xl">{page.title}</h1>
            <p className="mt-4 text-lg font-semibold text-profit-600">{page.subtitle}</p>
            <p className="mt-5 leading-7 text-slate-600">{page.description}</p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link href={`/spt/apply?service=${page.service}`} className="inline-flex items-center justify-center gap-2 rounded-md bg-navy-950 px-5 py-3 text-sm font-bold text-white">
                Apply Now <ArrowRight size={15} />
              </Link>
              <Link href={whatsappUrl} target="_blank" rel="noreferrer" className="inline-flex items-center justify-center gap-2 rounded-md border border-slate-200 bg-white px-5 py-3 text-sm font-bold text-navy-950">
                Speak With Us
              </Link>
            </div>
            <p className="mt-6 rounded-[18px] border border-red-200 bg-red-50 p-4 text-sm leading-6 text-red-800">
              Trading involves risk. Results are not guaranteed. Apply only after you understand the risks, rules, drawdown limits, and possible losses.
            </p>
          </div>
          <div className="rounded-[24px] border border-slate-200 bg-white p-5 shadow-[0_24px_70px_rgba(15,35,70,0.1)]">
            <div className="rounded-[18px] bg-gradient-to-br from-slate-50 to-blue-50 p-5">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-bold uppercase tracking-wide text-slate-500">Offer preview</p>
                  <h2 className="mt-2 text-2xl font-semibold text-navy-950">Algo-supported pathway</h2>
                </div>
                <Clock3 className="text-profit-600" />
              </div>
              <div className="mt-6 grid gap-3">
                {["Application review", "Risk profile check", "Setup guidance", "Progress communication"].map((item, index) => (
                  <div key={item} className="rounded-xl border border-white bg-white/80 p-4 shadow-sm">
                    <div className="flex items-center justify-between gap-4">
                      <p className="text-sm font-semibold text-navy-950">{item}</p>
                      <span className="text-xs font-bold text-profit-600">0{index + 1}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </SPTPageShell>
  );
}

