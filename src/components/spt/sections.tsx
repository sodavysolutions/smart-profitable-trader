import Image from "next/image";
import Link from "next/link";
import type { LucideIcon } from "lucide-react";
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

const whatsappUrl = "https://wa.me/2347087970133";
const evaluationWhatsappUrl = `${whatsappUrl}?text=${encodeURIComponent(
  "Hello Smart Profits Trader team, I'm interested in the Evaluation Prop Trading service. Please send me the recommended prop firms, account options, management process, risk guidelines, and how to get started."
)}`;

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
    title: "Smart Profits Trader VIP Signal Service",
    subtitle: "Real-time algo-powered signals — $50/month",
    copy: "Get real-time trade alerts with entry, TP, and SL delivered straight to your Telegram. Powered by the Smart Profit Algo. Join in minutes.",
    bestFor: ["Traders who want guided alerts", "Beginners who need structure", "Busy people who trade manually", "People who want a disciplined signal flow"],
    cta: "Join VIP Signals — $50/month",
    href: "/spt/vip",
    icon: Signal
  },
  {
    title: "Copy Trading / Personal Account Trading",
    subtitle: "Let your account follow professional trading execution",
    copy: "For clients who prefer a more hands-free approach, your account can follow selected trading activity or receive personal account management support.",
    bestFor: ["Busy professionals", "Investors with personal accounts", "People who prefer automation", "Clients who want managed trading support"],
    cta: "Explore Copy Trading",
    href: "/spt/copy-trading",
    icon: Copy
  },
  {
    title: "Instant Funded Prop Trading",
    subtitle: "Start with a funded account without the traditional challenge",
    copy: "Our instant funded pathway supports account setup, trading operations, progress tracking, and profit-share management.",
    bestFor: ["Faster funded access", "Prop firm capital exposure", "Structured funded-account trading", "Clients who want done-with-you support"],
    cta: "Explore Instant Funded",
    href: "/spt/instant-funded",
    icon: WalletCards
  },
  {
    title: "Evaluation Account Management",
    subtitle: "Structured support for Phase 1, Phase 2, and funded accounts",
    copy: "We support evaluation account progress with target tracking, drawdown awareness, trading-day discipline, and funded-stage preparation.",
    bestFor: ["Prop firm challenges", "Phase 1 and Phase 2 support", "Account progress tracking", "Disciplined execution"],
    cta: "Explore Evaluation",
    href: "/spt/evaluation",
    icon: Target
  }
];

const ecosystem = [
  ["VIP Signals", "Receive structured trading alerts and market opportunities.", Signal],
  ["Copy Trading", "Connect your account to selected trading activity.", Copy],
  ["Personal Trading", "Use your own broker account with a managed trading structure.", WalletCards],
  ["Prop Trading", "Get support for instant funded and evaluation accounts.", Target]
] as const;

const tradingPathCards = [
  ["I want trading signals", "Best for newer or busy traders who want guided market alerts.", "Join VIP Signals — $50/mo", "/spt/vip", Signal],
  ["I want my account managed", "Best for clients who prefer copy trading or personal account support.", "Managed Account", "/spt/copy-trading", Copy],
  ["I want prop firm support", "Best for funded accounts, instant funding, or evaluation challenges.", "Prop Firm Support", "/spt/evaluation", Target]
] as const;

const offerFitGuide = [
  ["Beginner", "VIP Signals"],
  ["Busy professional", "Copy Trading"],
  ["Prop firm trader", "Evaluation or Instant Funded"],
  ["Investor with account capital", "Personal Account Trading"]
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
  ["Algo-Supported Decisions", "Trading operations are supported by a structured algorithmic process.", Bot],
  ["Weekly Optimization", "Strategies are reviewed every weekend based on market volatility and price behavior.", RefreshCcw],
  ["Multiple Income Pathways", "Choose signals, copy trading, personal accounts, or prop firm support.", LineChart],
  ["Risk-Managed Approach", "The focus is controlled exposure, drawdown awareness, and disciplined execution.", ShieldCheck],
  ["Progress Tracking", "Track growth, phase progress, withdrawals, and account updates.", BarChart3],
  ["Professional Ecosystem", "Built around structure, communication, transparency, and sustainability.", Sparkles]
] as const;

const proofCards = ["Account Growth", "Weekly Review", "Profit Share", "Drawdown Monitoring", "Evaluation Progress", "Withdrawal Tracking"];

const faqs = [
  ["Is profit guaranteed?", "No. Trading involves risk and profits are not guaranteed. Smart Profits Trader focuses on structure, risk management, and continuous optimization, but losses can still happen."],
  ["What is the Smart Profit Algo?", "The Smart Profit Algo is our algorithmic trading system that helps analyze market behavior, test strategies, validate setups, and support trading decisions."],
  ["Do I need trading experience?", "Not necessarily. If you are new, you can start with VIP signals or copy trading. If you already understand trading, choose the offer that fits your goals."],
  ["Can I use my personal account?", "Yes. Personal account trading and copy trading are designed for clients who want to use their own trading accounts."],
  ["Do you support prop firm accounts?", "Yes. We support instant funded accounts and evaluation accounts, including Phase 1, Phase 2, and funded account progress tracking."],
  ["How often is the algo optimized?", "Optimization reviews are carried out every weekend to help align the trading system with current market trends and conditions."]
];

const evaluationSupportItems = [
  "Prop firm selection guidance",
  "Account size planning",
  "Phase 1 progress tracking",
  "Phase 2 progress tracking",
  "Funded account transition support",
  "Drawdown monitoring",
  "Account rule awareness",
  "Risk-managed trading operation",
  "Profit target tracking",
  "Updates and progress communication"
];

const evaluationAlgoPoints = [
  "Market behavior analysis",
  "Strategy testing",
  "Live-market demo validation",
  "Weekly optimization",
  "Drawdown awareness",
  "Risk-managed execution",
  "Prop account rule sensitivity"
];

const evaluationBenefits = [
  [
    "Reduce Emotional Trading Pressure",
    "Prop challenges can make traders emotional because every loss feels like a threat to the account. Our structured process helps reduce random decisions, revenge trading, and pressure-based execution.",
    ShieldCheck
  ],
  [
    "Track Phase Progress Professionally",
    "We monitor account growth, target progress, daily drawdown, max drawdown, phase status, and account rules so the challenge is handled with more clarity.",
    BarChart3
  ],
  [
    "Use Algo-Supported Trade Selection",
    "Our trading approach is supported by the Smart Profit Algo, weekly optimization, and live-market strategy validation to help create a more disciplined trading operation.",
    Bot
  ]
] as const;

const recommendedPropFirms = [
  ["Hola Prime ⭐", "https://holaprime.com?affiliateId=smartprofitsalgo"],
  ["FTMO", "https://trader.ftmo.com/?affiliates=dDWEICNovYoncFqgzCop"],
  ["FundingPips", "https://app.fundingpips.com/register?referral_code=64d6c082"],
  ["Fxify", "https://trader.fxify.com/purchasechallenge?affiliateId=8259"]
] as const;

const evaluationFitItems = [
  "You want to take a prop firm challenge but do not want to trade it blindly.",
  "You have failed challenges before because of risk, emotions, or poor execution.",
  "You want support for Phase 1, Phase 2, or funded account stages.",
  "You want your account progress, drawdown, and target tracked professionally.",
  "You want a structured trading process supported by algo-assisted analysis.",
  "You understand that prop firm accounts have rules that must be respected.",
  "You are willing to follow a disciplined, risk-managed approach.",
  "You understand that results are not guaranteed and accounts can still fail."
];

const evaluationSteps = [
  ["Apply", "Complete the application form so we can understand your preferred prop firm, account size, current phase, risk level, and goal."],
  ["Account Review", "Our team reviews your account details, prop firm rules, drawdown limits, and target requirements."],
  ["Setup and Onboarding", "If accepted, we guide you through the onboarding process, account access requirements, communication, and management terms."],
  ["Evaluation Management Begins", "The account is managed using our structured trading process supported by Smart Profit Algo analysis, weekly optimization, and drawdown monitoring."],
  ["Track Phase Progress", "We monitor progress through Phase 1, Phase 2, and funded account stages while updating you on account performance and key milestones."]
];

const evaluationRiskItems = [
  "Controlled trade exposure",
  "Daily drawdown awareness",
  "Max drawdown monitoring",
  "Profit target tracking",
  "Prop firm rule awareness",
  "No reckless lot sizing",
  "No emotional overtrading",
  "Weekly trading system optimization"
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
              Smart Profits Trader gives you algo-powered signals, copy trading, and prop firm support — all structured around your goal, your risk tolerance, and your account type.
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
            <p>Through the Smart Profit Algo, weekly optimization, VIP signals, copy trading, personal account trading, and prop firm account management, we are building a complete trading business ecosystem for people who want to take trading seriously.</p>
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
            ["Choose Your Path", "Select VIP signals, copy trading, instant funded, or evaluation management."],
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
            ["Evaluation", "/spt/evaluation"],
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
    title: "Copy Trading / Personal Account Trading",
    subtitle: "A more hands-free path into structured trading operations",
    description: "Connect your account to selected trading activity or request personal account trading support. This route is designed for clients who prefer managed execution, progress tracking, and a disciplined account structure.",
    service: "copy-trading"
  },
  "instant-funded": {
    title: "Instant Funded Prop Trading",
    subtitle: "Access funded account trading support without the traditional challenge route",
    description: "Our instant funded pathway supports account setup, trading operations, progress tracking, withdrawal planning, and profit-share visibility for clients who want structured exposure to prop firm capital.",
    service: "funded-account"
  },
  evaluation: {
    title: "Evaluation Account Management",
    subtitle: "Structured support for Phase 1, Phase 2, and funded stages",
    description: "Apply for prop firm evaluation support built around target tracking, drawdown awareness, minimum trading day discipline, account updates, and funded-stage preparation.",
    service: "evaluation"
  }
} as const;

export function SPTFunnelPage({ page }: { page: (typeof funnelPages)[keyof typeof funnelPages] }) {
  if (page.service === "evaluation") {
    return <EvaluationManagementFunnel />;
  }

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

function EvaluationCTAButtons({ className = "" }: { className?: string }) {
  return (
    <div className={`flex flex-col gap-3 sm:flex-row ${className}`}>
      <Link href="/spt/apply?service=evaluation" className="funnel-primary inline-flex items-center justify-center gap-2 bg-navy-950 px-5 py-3 text-sm font-bold text-white">
        Apply for Evaluation Management <ArrowRight size={15} />
      </Link>
      <Link href={evaluationWhatsappUrl} target="_blank" rel="noreferrer" className="funnel-secondary inline-flex items-center justify-center gap-2 border border-slate-200 bg-white px-5 py-3 text-sm font-bold text-navy-950 hover:border-profit-500">
        <MessageCircle size={16} />
        Chat With Us on WhatsApp
      </Link>
    </div>
  );
}

function EvaluationSectionHeader({ title, children }: { title: string; children?: React.ReactNode }) {
  return (
    <div className="mx-auto max-w-3xl text-center">
      <h2 className="funnel-section-title text-3xl font-semibold text-navy-950 sm:text-4xl">{title}</h2>
      {children ? <div className="mt-4 space-y-4 leading-7 text-slate-600">{children}</div> : null}
    </div>
  );
}

function EvaluationManagementFunnel() {
  return (
    <SPTPageShell>
      <section className="overflow-hidden bg-[radial-gradient(circle_at_12%_8%,#dbeafe_0,#f7fbff_34%,#fff7f2_72%,#ffffff_100%)] py-8 sm:py-10">
        <div className="funnel-hero-shell">
          <div className="funnel-hero-panel">
            <div className="funnel-hero-grid">
              <div className="funnel-hero-copy hero-slide-left">
                <h1 className="funnel-headline text-4xl text-navy-950 sm:text-5xl lg:text-[4rem]">
                  Stop Failing Prop Firm Challenges Alone. Trade Your Evaluation With a More Structured System.
                </h1>
                <p className="mt-6 text-lg leading-8 text-slate-600">
                  Smart Profits Trader Evaluation Management helps traders and investors approach prop firm challenges with structured account management, risk control, phase tracking, and algo-supported trade selection powered by the <strong className="font-semibold text-navy-950">Smart Profit Algo</strong>.
                </p>
                <p className="mt-4 leading-7 text-slate-600">
                  Whether you are starting Phase 1, moving into Phase 2, or trying to protect a funded account, our goal is to help you trade with more discipline, less emotion, and a clearer process.
                </p>
                <p className="mt-4 leading-7 text-slate-600">
                  Prop firm challenges are not just about making profit. You must also protect drawdown, obey trading rules, manage risk, and stay consistent long enough to reach the target. That is where structure matters.
                </p>
                <EvaluationCTAButtons className="mt-8" />
                <p className="mt-6 rounded-md border border-red-200 bg-red-50 p-4 text-sm leading-6 text-red-800">
                  Trading involves risk, and results are not guaranteed. Prop firm accounts can fail if targets are not reached, rules are broken, or drawdown limits are violated.
                </p>
              </div>
              <div className="funnel-hero-visual hero-slide-right relative">
                <div className="rounded-[26px] border border-slate-200 bg-white p-5 shadow-[0_24px_70px_rgba(15,35,70,0.12)]">
                  <div className="rounded-[20px] bg-gradient-to-br from-slate-50 to-blue-50 p-5">
                    <div className="flex items-center justify-between gap-5">
                      <div>
                        <p className="text-xs font-bold uppercase tracking-wide text-slate-500">Evaluation console</p>
                        <h2 className="mt-2 text-2xl font-semibold text-navy-950">Phase-by-phase control</h2>
                      </div>
                      <Target className="shrink-0 text-profit-600" size={30} />
                    </div>
                    <div className="mt-6 grid gap-3">
                      {["Phase 1 target", "Phase 2 target", "Daily drawdown", "Funded transition"].map((item, index) => (
                        <div key={item} className="funnel-card rounded-xl border border-white bg-white/85 p-4 shadow-sm">
                          <div className="flex items-center justify-between gap-4">
                            <p className="text-sm font-semibold text-navy-950">{item}</p>
                            <span className="text-xs font-bold text-profit-600">0{index + 1}</span>
                          </div>
                          <div className="mt-3 h-2 overflow-hidden rounded-full bg-slate-100">
                            <div className="h-full rounded-full bg-profit-500" style={{ width: `${[58, 44, 72, 38][index]}%` }} />
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="mt-5 rounded-md border border-amber-200 bg-amber-50 p-4 text-sm leading-6 text-amber-900">
                      Built for rule awareness, drawdown control, and disciplined execution.
                    </div>
                  </div>
                </div>
                <div className="funnel-float pointer-events-none absolute -left-4 top-8 hidden rotate-[-7deg] rounded-2xl bg-white p-4 text-sm font-bold text-navy-950 shadow-xl md:block" style={{ "--float-rotate": "-7deg" } as React.CSSProperties}>
                  Drawdown first
                </div>
                <div className="funnel-float pointer-events-none absolute -right-5 bottom-10 hidden rotate-[6deg] rounded-2xl bg-white p-4 text-sm font-bold text-profit-600 shadow-xl md:block" style={{ "--float-rotate": "6deg" } as React.CSSProperties}>
                  Phase tracking
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="page-shell py-16">
        <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr]">
          <div>
            <h2 className="funnel-section-title text-3xl font-semibold text-navy-950 sm:text-4xl">
              Most Traders Don't Fail Prop Challenges Because the Target Is Impossible. They Fail Because They Trade Under Pressure Without a System.
            </h2>
            <div className="mt-5 space-y-4 leading-7 text-slate-600">
              <p>Prop firm evaluations look simple on paper: reach the profit target, protect the drawdown, follow the rules, pass Phase 1, pass Phase 2, and get funded.</p>
              <p>But in real market conditions, many traders struggle. They overtrade because they want to pass quickly, increase lot size after a loss, break daily drawdown rules, hold losing trades too long, enter without a clear setup, and become emotional when the account is close to target.</p>
              <p>The problem is not always lack of opportunity. The problem is lack of structure.</p>
            </div>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {["Overtrading", "Revenge lot sizing", "Daily drawdown breaks", "Poor setup discipline", "Emotional target pressure", "Phase-to-phase inconsistency"].map((item) => (
              <div key={item} className="funnel-card flex gap-3 rounded-md border border-slate-200 bg-white p-4 shadow-sm">
                <ShieldCheck className="mt-0.5 shrink-0 text-profit-600" size={18} />
                <span className="text-sm font-semibold text-slate-700">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-slate-50 py-16">
        <div className="page-shell">
          <EvaluationSectionHeader title="A More Professional Way to Approach Phase 1, Phase 2, and Funded Accounts">
            <p>Smart Profits Trader Evaluation Management is designed for clients who want support managing prop firm evaluation accounts.</p>
            <p>Instead of treating the challenge like gambling, we treat it like a serious trading operation that requires patience, discipline, and proper risk control.</p>
          </EvaluationSectionHeader>
          <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
            {evaluationSupportItems.map((item) => (
              <div key={item} className="funnel-card rounded-md border border-slate-200 bg-white p-4 text-sm font-semibold leading-6 text-navy-950 shadow-sm">
                {item}
              </div>
            ))}
          </div>
          <div className="mt-8 flex justify-center">
            <Link href="/spt/apply?service=evaluation" className="funnel-primary inline-flex items-center justify-center gap-2 bg-profit-500 px-5 py-3 text-sm font-bold text-navy-950 hover:bg-profit-600 hover:text-white">
              Apply for Evaluation Management <ArrowRight size={15} />
            </Link>
          </div>
        </div>
      </section>

      <section className="page-shell py-16">
        <div className="grid items-start gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.16em] text-profit-600">Powered by the Smart Profit Algo</p>
            <h2 className="funnel-section-title mt-4 text-3xl font-semibold text-navy-950 sm:text-4xl">Analyze market behavior, validate setups, and support better trade selection.</h2>
            <div className="mt-5 space-y-4 leading-7 text-slate-600">
              <p>Our trading operation is supported by the Smart Profit Algo, a sophisticated algorithmic trading system designed to analyze market behavior, test multiple strategies, validate setups, and support better trade selection.</p>
              <p>The system uses machine learning-driven analysis to test strategies under different market conditions. Stronger strategies are demo-tested on live market behavior before being considered for deployment.</p>
              <p>Every weekend, we run optimization reviews to help align the trading system with current volatility, liquidity, trend behavior, and price action.</p>
            </div>
            <p className="mt-5 rounded-md border border-amber-200 bg-amber-50 p-4 text-sm leading-6 text-amber-900">
              The algo does not remove risk or guarantee passing. It helps support a more structured and disciplined trading process.
            </p>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {evaluationAlgoPoints.map((item) => (
              <div key={item} className="funnel-card flex gap-3 rounded-md border border-slate-200 bg-white p-4 shadow-sm">
                <Bot className="mt-0.5 shrink-0 text-profit-600" size={18} />
                <span className="text-sm font-semibold text-slate-700">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-gradient-to-b from-white to-slate-50 py-16">
        <div className="page-shell">
          <EvaluationSectionHeader title="Why Use Smart Profits Trader for Your Evaluation Account?" />
          <div className="mt-10 grid gap-4 lg:grid-cols-3">
            {evaluationBenefits.map(([title, text, Icon]) => (
              <div key={title} className="funnel-card rounded-md border border-slate-200 bg-white p-6 shadow-sm">
                <Icon className="text-profit-600" />
                <h3 className="mt-4 text-xl font-semibold text-navy-950">{title}</h3>
                <p className="mt-3 text-sm leading-6 text-slate-600">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="page-shell py-16">
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <h2 className="funnel-section-title text-3xl font-semibold text-navy-950 sm:text-4xl">Recommended Prop Firms You Can Start With</h2>
            <div className="mt-5 space-y-4 leading-7 text-slate-600">
              <p>If you do not already have a prop firm account, you can start by choosing one of the prop firms we recommend.</p>
              <p>Different prop firms have different rules, drawdown limits, account sizes, payout terms, and trading conditions. Before buying any challenge, make sure you understand the rules clearly.</p>
            </div>
            <p className="mt-5 rounded-md border border-amber-200 bg-amber-50 p-4 text-sm leading-6 text-amber-900">
              Some of these links may be affiliate or referral links. This does not change the importance of reviewing each firm's rules before purchasing an account.
            </p>
            <Link href={evaluationWhatsappUrl} target="_blank" rel="noreferrer" className="funnel-primary mt-6 inline-flex items-center justify-center gap-2 bg-navy-950 px-5 py-3 text-sm font-bold text-white">
              <MessageCircle size={16} />
              Chat With Us Before Choosing a Prop Firm
            </Link>
          </div>
          {/* HolaPrime featured banner */}
          <Link href="/spt/holaprime" className="group mt-2 mb-4 flex items-center justify-between gap-4 rounded-xl border-2 border-profit-500 bg-gradient-to-r from-profit-500/10 to-transparent p-5 transition hover:bg-profit-500/15">
            <div>
              <span className="inline-block rounded-full bg-profit-500 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-widest text-navy-950 mb-1.5">Recommended Partner</span>
              <h3 className="font-bold text-navy-950">Hola Prime — Our #1 Recommended Prop Firm</h3>
              <p className="mt-0.5 text-sm text-slate-600">From $50 · Up to $200K funded · 80/20 profit split · EA-friendly</p>
            </div>
            <span className="inline-flex shrink-0 items-center gap-1.5 rounded-lg bg-profit-500 px-4 py-2 text-sm font-bold text-navy-950 transition group-hover:bg-profit-600 group-hover:text-white">
              Get Started <ArrowRight size={15} />
            </span>
          </Link>

          <div className="grid gap-3 sm:grid-cols-2">
            {recommendedPropFirms.map(([name, href]) => (
              <Link key={name} href={href} target="_blank" rel="noreferrer" className="funnel-card group rounded-md border border-slate-200 bg-white p-5 shadow-sm hover:border-profit-500">
                <div className="flex items-center justify-between gap-4">
                  <h3 className="font-semibold text-navy-950">{name}</h3>
                  <ArrowRight className="text-slate-400 transition group-hover:text-profit-600" size={17} />
                </div>
                <p className="mt-2 text-xs font-semibold uppercase tracking-wide text-slate-400">Open prop firm link</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-slate-50 py-16">
        <div className="page-shell">
          <EvaluationSectionHeader title="This Evaluation Management Service Is Best For You If..." />
          <div className="mt-10 grid gap-3 md:grid-cols-2">
            {evaluationFitItems.map((item) => (
              <div key={item} className="funnel-card flex gap-3 rounded-md border border-slate-200 bg-white p-4 shadow-sm">
                <CheckCircle2 className="mt-0.5 shrink-0 text-profit-600" size={18} />
                <span className="text-sm leading-6 text-slate-700">{item}</span>
              </div>
            ))}
          </div>
          <div className="mt-8 flex justify-center">
            <Link href="/spt/apply?service=evaluation" className="funnel-primary inline-flex items-center justify-center gap-2 bg-profit-500 px-5 py-3 text-sm font-bold text-navy-950 hover:bg-profit-600 hover:text-white">
              Apply to See If You Qualify <ArrowRight size={15} />
            </Link>
          </div>
        </div>
      </section>

      <section className="page-shell py-16">
        <EvaluationSectionHeader title="How to Get Started" />
        <div className="mt-10 grid gap-4 lg:grid-cols-5">
          {evaluationSteps.map(([title, text], index) => (
            <div key={title} className="funnel-card rounded-md border border-slate-200 bg-white p-5 shadow-sm">
              <span className="text-xs font-bold text-profit-600">STEP {index + 1}</span>
              <h3 className="mt-3 font-semibold text-navy-950">{title}</h3>
              <p className="mt-2 text-sm leading-6 text-slate-600">{text}</p>
            </div>
          ))}
        </div>
        <div className="mt-8 flex justify-center">
          <Link href="/spt/apply?service=evaluation" className="funnel-primary inline-flex items-center justify-center gap-2 bg-navy-950 px-5 py-3 text-sm font-bold text-white">
            Start My Evaluation Application <ArrowRight size={15} />
          </Link>
        </div>
      </section>

      <section className="bg-gradient-to-b from-slate-50 to-white py-16">
        <div className="page-shell grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <h2 className="funnel-section-title text-3xl font-semibold text-navy-950 sm:text-4xl">Built Around Drawdown Control, Rule Awareness, and Disciplined Execution</h2>
            <div className="mt-5 space-y-4 leading-7 text-slate-600">
              <p>Prop firm accounts must be managed carefully. One bad trading day can damage or fail an account if risk is not controlled.</p>
              <p>We do not promise that every account will pass. We do not promise guaranteed funding. We do not promise guaranteed payouts.</p>
              <p>Our goal is to give each evaluation account a more professional, structured, and risk-managed trading process.</p>
            </div>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {evaluationRiskItems.map((item) => (
              <div key={item} className="funnel-card flex gap-3 rounded-md border border-slate-200 bg-white p-4 shadow-sm">
                <FileCheck2 className="mt-0.5 shrink-0 text-profit-600" size={18} />
                <span className="text-sm font-semibold text-slate-700">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="apply" className="page-shell grid gap-10 py-16 lg:grid-cols-[0.85fr_1.15fr]">
        <div>
          <h2 className="funnel-section-title text-3xl font-semibold text-navy-950 sm:text-4xl">Ready to Approach Your Prop Firm Challenge With More Structure?</h2>
          <p className="mt-5 leading-7 text-slate-600">
            If you want to take a prop firm evaluation but do not want to trade it alone, Smart Profits Trader Evaluation Management may be the right path for you.
          </p>
          <p className="mt-4 leading-7 text-slate-600">
            Apply now and let us review your prop firm, account size, phase, and trading goal.
          </p>
          <EvaluationCTAButtons className="mt-8" />
          <p className="mt-6 rounded-md border border-red-200 bg-red-50 p-4 text-sm leading-6 text-red-800">
            Trading involves significant risk. Smart Profits Trader does not guarantee passing evaluations, funded approval, withdrawals, fixed returns, or risk-free results. Prop firm accounts can fail if targets are not reached, rules are violated, or drawdown limits are exceeded. Only participate with funds you can afford to risk.
          </p>
        </div>
        <ApplicationForm initialService="evaluation" thankYouPath="/spt/thank-you" />
      </section>
    </SPTPageShell>
  );
}
