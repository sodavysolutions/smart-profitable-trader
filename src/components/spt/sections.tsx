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
  LineChart,
  Radar,
  RefreshCcw,
  ShieldCheck,
  Signal,
  Sparkles,
  Target,
  WalletCards
} from "lucide-react";
import { ApplicationForm } from "@/components/ApplicationForm";

const sptLinks = [
  { href: "/spt/home#algo", label: "Algo" },
  { href: "/spt/home#offers", label: "Offers" },
  { href: "/spt/home#founder", label: "Founder" },
  { href: "/spt/home#faq", label: "FAQ" }
];

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
    title: "Smart Profitable Trader VIP Signal Service",
    subtitle: "Premium trading signals for serious traders",
    copy: "Get structured market alerts supported by our Smart Profit Algo process, weekly optimization reviews, and risk-managed trade planning.",
    bestFor: ["Traders who want guided alerts", "Beginners who need structure", "Busy people who trade manually", "People who want a disciplined signal flow"],
    cta: "Explore VIP Signals",
    href: "/spt/vip-signals",
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
  ["Is profit guaranteed?", "No. Trading involves risk and profits are not guaranteed. Smart Profitable Trader focuses on structure, risk management, and continuous optimization, but losses can still happen."],
  ["What is the Smart Profit Algo?", "The Smart Profit Algo is our algorithmic trading system that helps analyze market behavior, test strategies, validate setups, and support trading decisions."],
  ["Do I need trading experience?", "Not necessarily. If you are new, you can start with VIP signals or copy trading. If you already understand trading, choose the offer that fits your goals."],
  ["Can I use my personal account?", "Yes. Personal account trading and copy trading are designed for clients who want to use their own trading accounts."],
  ["Do you support prop firm accounts?", "Yes. We support instant funded accounts and evaluation accounts, including Phase 1, Phase 2, and funded account progress tracking."],
  ["How often is the algo optimized?", "Optimization reviews are carried out every weekend to help align the trading system with current market trends and conditions."]
];

export function SPTNavbar() {
  return (
    <header className="sticky top-0 z-40 border-b border-slate-200/70 bg-white/90 backdrop-blur-xl">
      <div className="page-shell flex h-20 items-center justify-between gap-4">
        <Link href="/spt/home" className="flex items-center gap-3">
          <span className="grid h-14 place-items-center overflow-hidden rounded-xl border border-slate-200 bg-white px-2 shadow-soft">
            <Image src="/brand/spt-logo.png" alt="Smart Profitable Trader logo" width={220} height={90} className="h-12 w-auto object-contain" priority />
          </span>
          <span className="hidden leading-tight sm:block">
            <span className="block font-semibold text-navy-950">Smart Profitable Trader</span>
            <span className="block text-xs font-semibold uppercase tracking-[0.14em] text-profit-600">by Laptop Lifestyle Income</span>
          </span>
        </Link>
        <nav className="hidden items-center gap-7 text-sm font-semibold text-slate-600 md:flex">
          {sptLinks.map((item) => (
            <Link key={item.href} href={item.href} className="hover:text-navy-950">
              {item.label}
            </Link>
          ))}
        </nav>
        <Link href="/spt/apply" className="rounded-md bg-profit-500 px-4 py-2.5 text-sm font-bold text-navy-950 shadow-[0_12px_30px_rgba(32,199,111,0.25)] transition hover:-translate-y-0.5 hover:bg-profit-600 hover:text-white">
          Apply Now
        </Link>
      </div>
    </header>
  );
}

export function SPTHeroSection() {
  return (
    <section className="overflow-hidden bg-[radial-gradient(circle_at_12%_8%,#dbeafe_0,#f7fbff_34%,#fff7f2_72%,#ffffff_100%)]">
      <div className="page-shell py-7 sm:py-10">
        <div className="relative overflow-hidden rounded-[28px] border border-white bg-white/72 px-4 py-12 shadow-[0_30px_90px_rgba(15,35,70,0.14)] backdrop-blur md:px-10 md:py-16 lg:px-16">
          <div className="mx-auto max-w-4xl text-center">
            <h1 className="text-4xl font-semibold leading-tight tracking-normal text-navy-950 sm:text-5xl lg:text-6xl">
              Build Smarter Trading Income With an Algo-Powered Trading Ecosystem
            </h1>
            <p className="mx-auto mt-6 max-w-3xl text-base leading-8 text-slate-600 sm:text-lg">
              Smart Profitable Trader helps you access structured trading opportunities through VIP signals, copy trading, personal account trading, instant funded prop trading, and evaluation account management, all powered by the Smart Profit Algo.
            </p>
            <p className="mx-auto mt-4 max-w-2xl text-sm leading-6 text-slate-500">
              Whether you want to trade with guidance, copy our execution, grow your personal account, or pursue prop firm funding, our ecosystem gives you a more professional way to participate in the markets.
            </p>
            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
              <Link href="/spt/home#offers" className="inline-flex items-center justify-center gap-2 rounded-md bg-navy-950 px-5 py-3 text-sm font-bold text-white shadow-lg shadow-navy-950/15 transition hover:-translate-y-0.5">
                Explore Trading Solutions <ArrowRight size={16} />
              </Link>
              <Link href="/spt/vip-signals" className="inline-flex items-center justify-center gap-2 rounded-md border border-slate-200 bg-white px-5 py-3 text-sm font-bold text-navy-950 transition hover:-translate-y-0.5 hover:border-profit-500">
                Join VIP Signals
              </Link>
            </div>
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
          Smart Profitable Trader helps traders, investors, and busy professionals access structured trading opportunities without needing to trade alone.
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
    <section id="algo" className="bg-gradient-to-b from-slate-50 to-white py-16">
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
    <section id="offers" className="page-shell py-16">
      <div className="mx-auto max-w-3xl text-center">
        <h2 className="text-3xl font-semibold text-navy-950 sm:text-4xl">Choose the Trading Path That Fits You</h2>
        <p className="mt-4 leading-7 text-slate-600">
          Different people have different goals. Smart Profitable Trader gives you multiple ways to participate in a structured trading ecosystem.
        </p>
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
                <Link href={offer.href} className="inline-flex items-center justify-center gap-2 rounded-md bg-navy-950 px-4 py-2 text-sm font-bold text-white">
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
          <h2 className="text-3xl font-semibold text-navy-950 sm:text-4xl">Why Traders and Investors Choose Smart Profitable Trader</h2>
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
        <div className="overflow-hidden rounded-[28px] bg-gradient-to-br from-blue-100 to-emerald-50 p-3 shadow-[0_24px_70px_rgba(15,35,70,0.12)]">
          <Image src="/brand/founder-portrait.png" alt="Solomon David, founder of Smart Profitable Trader" width={900} height={1200} className="h-[520px] w-full rounded-[22px] object-cover object-top max-sm:h-[420px]" />
        </div>
        <div>
          <p className="text-sm font-bold uppercase tracking-[0.16em] text-profit-600">About the Founder</p>
          <h2 className="mt-4 text-3xl font-semibold text-navy-950 sm:text-4xl">Solomon David</h2>
          <p className="mt-2 text-lg font-semibold text-slate-700">Entrepreneur, digital marketing strategist, and trading systems builder</p>
          <div className="mt-5 space-y-4 leading-7 text-slate-600">
            <p>I created Smart Profitable Trader to help everyday people access trading opportunities with more structure, better systems, and less guesswork.</p>
            <p>The ecosystem is built for traders, investors, and busy professionals who want guidance, tracking, communication, and a more organized way to participate in trading opportunities.</p>
            <p>Through the Smart Profit Algo, weekly optimization, VIP signals, copy trading, personal account trading, and prop firm account management, we are building a complete trading business ecosystem for people who want to take trading seriously.</p>
          </div>
          <p className="mt-6 font-semibold text-navy-950">- Solomon David, Founder of Smart Profitable Trader</p>
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
    <section className="bg-slate-50 py-16">
      <div className="page-shell">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-semibold text-navy-950 sm:text-4xl">How the Smart Profitable Trader Ecosystem Works</h2>
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
      <div>
        <h2 className="text-3xl font-semibold text-navy-950 sm:text-4xl">Ready to Join the Smart Profitable Trader Ecosystem?</h2>
        <p className="mt-4 leading-7 text-slate-600">
          Whether you want VIP signals, copy trading, personal account trading, or prop firm account support, Smart Profitable Trader gives you a structured path to participate in the markets with more clarity and support.
        </p>
        <div className="mt-6 grid gap-3 sm:grid-cols-2">
          <Link href="/spt/home#offers" className="inline-flex items-center justify-center gap-2 rounded-md bg-navy-950 px-5 py-3 text-sm font-bold text-white">
            Explore Trading Solutions
          </Link>
          <Link href="/spt/contact" className="inline-flex items-center justify-center gap-2 rounded-md border border-slate-200 bg-white px-5 py-3 text-sm font-bold text-navy-950">
            Speak With Us
          </Link>
        </div>
      </div>
      <ApplicationForm initialService="general" thankYouPath="/spt/thank-you" />
    </section>
  );
}

export function SPTFooter() {
  return (
    <footer className="border-t border-slate-200 bg-white py-8">
      <div className="page-shell flex flex-col justify-between gap-5 text-sm text-slate-500 md:flex-row md:items-center">
        <p>Smart Profitable Trader by Laptop Lifestyle Income. Trading involves risk and results are not guaranteed.</p>
        <div className="flex flex-wrap gap-4">
          {[
            ["VIP Signals", "/spt/vip-signals"],
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
    <main className="min-h-screen bg-white">
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
    title: "Smart Profitable Trader VIP Signal Service",
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
              <Link href="/spt/contact" className="inline-flex items-center justify-center gap-2 rounded-md border border-slate-200 bg-white px-5 py-3 text-sm font-bold text-navy-950">
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
