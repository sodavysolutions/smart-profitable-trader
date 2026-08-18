import Image from "next/image";
import Link from "next/link";
import { FloatingChatWidget } from "@/components/spt/floating-chat-widget";
import {
  ArrowRight,
  Bot,
  CheckCircle2,
  Clock3,
  HelpCircle,
  LineChart,
  Lock,
  MessageCircle,
  Radar,
  ShieldCheck,
  Sparkles,
  WalletCards,
} from "lucide-react";

// All CTAs point to the dedicated, distraction-free apply page
const applyHref = "/spt/copy-trading/apply";
const whatsappHref =
  "https://wa.me/447344589579?text=Hello%20Smart%20Profits%20Trader%2C%20I%E2%80%99m%20interested%20in%20Copy%20Trading.%20Please%20tell%20me%20how%20to%20get%20started.";

function PrimaryCTA({ children = "Apply to Get Started" }: { children?: React.ReactNode }) {
  return (
    <Link
      href={applyHref}
      className="funnel-primary inline-flex items-center justify-center gap-2 bg-navy-950 px-5 py-3 text-sm font-bold text-white hover:bg-navy-900"
    >
      {children} <ArrowRight size={16} />
    </Link>
  );
}

function WhatsAppCTA({ children = "Ask Us on WhatsApp" }: { children?: React.ReactNode }) {
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
        {/* Logo only — no nav links so visitors stay focused on the funnel */}
        <div className="flex items-center gap-3">
          <span className="grid h-14 w-14 place-items-center overflow-hidden rounded-xl border border-slate-200 bg-white p-1.5 shadow-soft">
            <Image src="/images/smart-profits-trader-logo.png" alt="Smart Profits Trader logo" width={160} height={160} className="h-full w-full object-contain" priority />
          </span>
          <span className="hidden leading-tight sm:block">
            <span className="block font-semibold text-navy-950">Smart Profits Trader</span>
            <span className="block text-xs font-semibold uppercase tracking-[0.14em] text-profit-600">Copy Trading — We Trade, You Earn</span>
          </span>
        </div>
        <div className="flex items-center gap-2">
          <Link href={applyHref} className="funnel-header-cta rounded-md bg-navy-950 px-4 py-2.5 text-sm font-bold text-white shadow-sm hover:bg-navy-900">
            Apply Free
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
            {/* ── Left copy ── */}
            <div className="funnel-hero-copy hero-slide-left">
              <span className="inline-flex items-center gap-2 rounded-full border border-profit-500/25 bg-profit-50 px-3.5 py-1.5 text-[11px] font-bold uppercase tracking-[0.14em] text-profit-600">
                <span className="h-1.5 w-1.5 rounded-full bg-profit-500" />
                Algo-Powered Copy Trading
              </span>
              <h1 className="mt-5 text-[2.1rem] font-bold leading-[1.1] tracking-tight text-navy-950 sm:text-[2.65rem] lg:text-[3.15rem]" style={{ textWrap: "balance" } as React.CSSProperties}>
                We Trade Forex.<br />
                <span className="text-profit-600">You Keep the Profits.</span>
              </h1>
              <p className="mt-4 text-base leading-7 text-slate-600 sm:text-[1.0625rem]">
                Smart Profits Trader connects your personal trading account to our system. We handle all the trading — you watch your account grow. No experience needed. No charts. No stress.
              </p>
              <ul className="mt-5 space-y-2.5">
                {[
                  "No experience needed — we guide you through everything from scratch.",
                  "Your money stays in YOUR account at all times. We never collect or hold your funds.",
                  "Start from as little as $200 — we help you open a Valetax broker account.",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2.5 text-sm text-slate-700">
                    <CheckCircle2 size={15} className="mt-0.5 shrink-0 text-profit-500" />
                    {item}
                  </li>
                ))}
              </ul>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <PrimaryCTA>Apply Free — Takes 2 Minutes</PrimaryCTA>
                <WhatsAppCTA />
              </div>
              <p className="mt-5 rounded-[14px] border border-amber-200 bg-amber-50 px-4 py-3 text-xs leading-5 text-amber-800">
                Trading involves risk. Results are not guaranteed. Only participate with funds you can afford to risk.
              </p>
            </div>

            {/* ── Right visual ── */}
            <div className="funnel-hero-visual hero-slide-right relative">
              <div className="mb-4 grid grid-cols-3 gap-2">
                {[
                  { value: "You Keep 70%", label: "Of your profits" },
                  { value: "Weekly", label: "Optimization" },
                  { value: "From $200", label: "To start" },
                ].map(({ value, label }) => (
                  <div
                    key={label}
                    className="flex flex-col items-center rounded-xl border border-slate-200/80 bg-white/80 px-2 py-3 text-center shadow-sm backdrop-blur-sm"
                  >
                    <span className="text-[11px] font-bold leading-tight text-navy-950">{value}</span>
                    <span className="mt-0.5 text-[10px] font-medium text-slate-500">{label}</span>
                  </div>
                ))}
              </div>

              {/* Main card */}
              <div className="rounded-[26px] border border-slate-200 bg-white p-5 shadow-[0_24px_70px_rgba(15,35,70,0.12)]">
                <div className="rounded-[20px] bg-gradient-to-br from-slate-50 to-blue-50 p-5">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs font-bold uppercase tracking-wide text-slate-500">How it works</p>
                      <h2 className="mt-2 text-2xl font-semibold text-navy-950">4 Simple Steps</h2>
                    </div>
                    <div className="grid h-11 w-11 place-items-center rounded-full bg-profit-500/15 text-profit-600">
                      <Bot size={22} />
                    </div>
                  </div>
                  <div className="mt-6 grid gap-3">
                    {[
                      ["Apply Free", "Fill the short form in 2 minutes"],
                      ["We Review You", "Our team contacts you on WhatsApp"],
                      ["We Set Everything Up", "We guide you to open a broker account"],
                      ["Earn Weekly", "We trade, you track and receive profits"],
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

              <div className="funnel-float pointer-events-none absolute -left-4 top-28 hidden rotate-[-7deg] rounded-2xl bg-white p-4 text-sm font-bold text-navy-950 shadow-xl md:block" style={{ "--float-rotate": "-7deg" } as React.CSSProperties}>
                Your account stays yours
              </div>
              <div className="funnel-float pointer-events-none absolute -right-5 bottom-10 hidden rotate-[6deg] rounded-2xl bg-white p-4 text-sm font-bold text-profit-600 shadow-xl md:block" style={{ "--float-rotate": "6deg" } as React.CSSProperties}>
                No experience needed
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function CopyTradingMoneySection() {
  return (
    <section className="border-y border-slate-100 bg-[#071b17] py-10">
      <div className="page-shell">
        <div className="grid gap-6 text-center md:grid-cols-3 md:text-left">
          <div className="flex flex-col items-center gap-3 md:flex-row">
            <div className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-profit-500/20 text-profit-400">
              <Lock size={22} />
            </div>
            <div>
              <p className="font-bold text-white">Your Money Never Leaves Your Account</p>
              <p className="mt-1 text-sm text-slate-400">Your funds stay inside your personal broker account at all times. We connect through a trade-only permission — we cannot withdraw or transfer your money.</p>
            </div>
          </div>
          <div className="flex flex-col items-center gap-3 md:flex-row">
            <div className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-profit-500/20 text-profit-400">
              <ShieldCheck size={22} />
            </div>
            <div>
              <p className="font-bold text-white">You Can Disconnect Any Time</p>
              <p className="mt-1 text-sm text-slate-400">You are always in control. If you want to stop or pause, just let us know or remove the connection yourself from your broker account.</p>
            </div>
          </div>
          <div className="flex flex-col items-center gap-3 md:flex-row">
            <div className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-profit-500/20 text-profit-400">
              <WalletCards size={22} />
            </div>
            <div>
              <p className="font-bold text-white">No Hidden Fees or Upfront Charges</p>
              <p className="mt-1 text-sm text-slate-400">We take a percentage of profits only — no monthly subscription, no setup fee. If you do not profit, we do not earn either.</p>
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
          <p className="text-sm font-bold uppercase tracking-[0.16em] text-profit-600">Does This Sound Like You?</p>
          <h2 className="funnel-section-title mt-4 text-3xl font-semibold text-navy-950 sm:text-4xl">
            You Want to Make Money From Forex — But You Don't Know How to Start Safely
          </h2>
          <p className="mt-4 leading-7 text-slate-500">
            Smart Profits Trader was built for people in exactly this situation. You do not need to figure it out alone.
          </p>
        </div>
        <div className="rounded-[24px] border border-slate-200 bg-white p-6 leading-7 text-slate-600 shadow-soft">
          <div className="grid gap-3">
            {[
              "You have tried forex before and lost money — and now you are not sure who to trust.",
              "You are interested in forex but do not know which broker is genuine and safe.",
              "You have no time to sit in front of charts every day.",
              "You have joined signal groups but still do not know what you are doing.",
              "You have seen others make money from forex and want a real, structured path.",
              "You are worried about scams and want something where your money stays in your own account.",
            ].map((item) => (
              <div key={item} className="flex gap-3 rounded-xl bg-slate-50 p-3 text-sm text-slate-700">
                <CheckCircle2 className="mt-0.5 shrink-0 text-profit-600" size={17} />
                <span>{item}</span>
              </div>
            ))}
          </div>
          <div className="mt-6">
            <PrimaryCTA>Yes, This is Me — Apply Now</PrimaryCTA>
          </div>
        </div>
      </div>
    </section>
  );
}

export function CopyTradingRequirementsSection() {
  return (
    <section className="bg-gradient-to-b from-slate-50 to-white py-16">
      <div className="page-shell">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-bold uppercase tracking-[0.16em] text-profit-600">Simple Requirements</p>
          <h2 className="mt-4 text-3xl font-semibold text-navy-950 sm:text-4xl">What You Need to Get Started</h2>
          <p className="mt-4 leading-7 text-slate-600">
            You do not need any prior trading experience or a broker account. We handle the setup for you.
          </p>
        </div>
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {[
            {
              number: "01",
              title: "Starting Capital",
              desc: "Minimum $200 in your broker account. We recommend $300–$500 for better results. We will help you open a Valetax account if you do not have one yet.",
            },
            {
              number: "02",
              title: "A WhatsApp Number",
              desc: "We contact you on WhatsApp to guide you through the setup, answer questions, and send you updates.",
            },
            {
              number: "03",
              title: "A Valid ID",
              desc: "Your broker will require ID verification (NIN, international passport, or driver's licence). This is standard for all regulated brokers.",
            },
          ].map(({ number, title, desc }) => (
            <div key={title} className="rounded-[22px] border border-slate-200 bg-white p-6 shadow-soft">
              <span className="text-4xl font-black text-profit-500/30">{number}</span>
              <h3 className="mt-3 text-lg font-bold text-navy-950">{title}</h3>
              <p className="mt-2 text-sm leading-6 text-slate-600">{desc}</p>
            </div>
          ))}
        </div>
        <div className="mt-8 text-center">
          <PrimaryCTA>I Meet the Requirements — Apply Now</PrimaryCTA>
        </div>
      </div>
    </section>
  );
}

export function CopyTradingSolutionSection() {
  return (
    <section className="bg-gradient-to-b from-white to-blue-50/40 py-16">
      <div className="page-shell">
        <div className="grid items-center gap-10 lg:grid-cols-[1.05fr_0.95fr]">
          <div>
            <h2 className="funnel-section-title text-3xl font-semibold text-navy-950 sm:text-4xl">How Smart Profits Trader Copy Trading Works</h2>
            <div className="mt-5 space-y-4 leading-7 text-slate-600">
              <p>
                We connect your personal broker account to our algo-supported trading system using a <strong>read-and-execute permission</strong>. This means we can open and close trades on your behalf — but we cannot withdraw money or transfer funds. Your capital is always protected.
              </p>
              <p>
                Our <strong>Smart Profit Algo</strong> supports the trading decisions by testing strategies, analyzing market conditions, and validating setups on forex pairs and gold (XAUUSD). Every weekend, we carry out optimization reviews to align the system with current market conditions.
              </p>
              <p>
                If you do not currently have a broker account, that is perfectly fine. Our team will walk you through opening one on a trusted, regulated broker (XM or Valetax). It takes about 10 to 15 minutes.
              </p>
            </div>
            <div className="mt-7">
              <PrimaryCTA />
            </div>
          </div>
          <div className="rounded-[24px] border border-slate-200 bg-white p-6 shadow-[0_24px_70px_rgba(15,35,70,0.1)]">
            <div className="grid gap-4">
              {[
                [Radar, "Market analysis and trade validation"],
                [LineChart, "Strategy testing via the Smart Profit Algo"],
                [Clock3, "Weekend optimization reviews"],
                [ShieldCheck, "Read-execute permission only — funds protected"],
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
    ["No Experience Needed", "You do not need to understand forex, charts, or indicators. Our system handles everything. We also guide you step by step through the account setup process.", Sparkles],
    ["Your Money is Always Safe", "Your funds stay in your personal broker account. We operate through a trade-only connection — we have no ability to withdraw or move your money to another account.", Lock],
    ["We Handle the Broker Setup", "If you do not have a trading account yet, our team will guide you through opening one on a trusted broker. It takes 10–15 minutes and the account is 100% in your name.", WalletCards],
  ] as const;

  return (
    <section className="page-shell py-16">
      <div className="mx-auto max-w-3xl text-center">
        <h2 className="text-3xl font-semibold leading-tight text-navy-950 sm:text-4xl">Why Nigerians Choose Smart Profits Trader</h2>
        <p className="mt-4 leading-7 text-slate-500">We built this service for people who want real, structured exposure to forex — without the confusion or risk of trading alone.</p>
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
          <h2 className="text-3xl font-semibold leading-tight text-navy-950 sm:text-4xl">This Is For You If…</h2>
          <div className="mt-7 grid gap-3 md:grid-cols-2">
            {[
              "You are in Nigeria and want a genuine, structured way to participate in forex trading.",
              "You do not yet have a broker account — we help you open one for free.",
              "You have tried forex signals or trading before but struggled to make it consistent.",
              "You want your money to stay in your own account — not sent to anyone.",
              "You are too busy with work or business to watch charts every day.",
              "You understand that trading carries risk and you are ready to participate the right way.",
            ].map((item) => (
              <div key={item} className="flex gap-3 rounded-2xl bg-slate-50 p-4 text-sm leading-6 text-slate-700">
                <CheckCircle2 className="mt-0.5 shrink-0 text-profit-600" size={18} />
                <span>{item}</span>
              </div>
            ))}
          </div>
          <div className="mt-8">
            <PrimaryCTA>Apply to Get Started</PrimaryCTA>
          </div>
        </div>
      </div>
    </section>
  );
}

export function CopyTradingHowItWorks() {
  const steps = [
    ["Apply Free", "Fill the short application form — it takes about 2 minutes. No broker account needed yet."],
    ["We Contact You on WhatsApp", "Our team reviews your details and reaches out within 24 hours to confirm your spot and answer any questions."],
    ["We Set Up Your Account", "If you need a broker account, we walk you through opening one (XM or Valetax). Takes about 10–15 minutes. Once done, we connect it to our system."],
    ["We Trade — You Earn", "Your account starts following our trades. You monitor activity from your broker dashboard and receive your profit share regularly."],
  ];

  return (
    <section className="page-shell py-16">
      <div className="mx-auto max-w-3xl text-center">
        <h2 className="text-3xl font-semibold leading-tight text-navy-950 sm:text-4xl">How to Get Started</h2>
        <p className="mt-4 text-slate-500 leading-7">Four simple steps. No prior experience needed.</p>
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

export function CopyTradingFAQ() {
  const faqs = [
    {
      q: "Is this a scam or Ponzi scheme?",
      a: "No. Smart Profits Trader is a legitimate copy trading service. Your money is never sent to us — it stays in your personal broker account (XM or Valetax), which is in your own name. We connect to your account using a trade-only permission that allows us to open and close trades, but not to withdraw or move your funds.",
    },
    {
      q: "Do I need to send my money to you?",
      a: "No. You fund your own broker account directly. We never receive or hold your money. Think of it like this: your money is in your pocket, and we are just helping it grow by making the right moves on your behalf.",
    },
    {
      q: "What if I have never traded before?",
      a: "That is completely fine. Most of our clients started with zero trading knowledge. We guide you through everything — including opening a broker account if you don't have one. You don't need to understand charts, indicators, or trading strategies.",
    },
    {
      q: "What broker do I need to use?",
      a: "We recommend XM or Valetax — both are regulated, trusted, and accessible in Nigeria. If you don't have an account yet, our team will walk you through opening one for free.",
    },
    {
      q: "How much do I need to start?",
      a: "The minimum starting capital is $200. We recommend $300–$500 or above for better results. This money always stays in your own broker account — never with us.",
    },
    {
      q: "How do profits work?",
      a: "We operate on a profit-sharing model. You keep 70% of all profits generated on accounts below $5,000, and 50% on accounts above $5,000. If there are no profits in a period, there is nothing to share — we only earn when you earn.",
    },
    {
      q: "Can I withdraw my money whenever I want?",
      a: "Yes. Since your money is in your personal broker account, you can withdraw it at any time following your broker's standard withdrawal process. We do not place any restrictions on your funds.",
    },
  ];

  return (
    <section className="bg-slate-50 py-16">
      <div className="page-shell">
        <div className="mx-auto max-w-3xl">
          <div className="flex items-center gap-3 mb-8">
            <HelpCircle size={24} className="text-profit-600" />
            <h2 className="text-3xl font-semibold text-navy-950">Common Questions</h2>
          </div>
          <div className="grid gap-4">
            {faqs.map(({ q, a }) => (
              <div key={q} className="rounded-[18px] border border-slate-200 bg-white p-6">
                <h3 className="font-bold text-navy-950">{q}</h3>
                <p className="mt-3 text-sm leading-6 text-slate-600">{a}</p>
              </div>
            ))}
          </div>
          <div className="mt-8 text-center">
            <p className="mb-4 text-slate-600">Still have a question?</p>
            <WhatsAppCTA>Ask Us Directly on WhatsApp</WhatsAppCTA>
          </div>
        </div>
      </div>
    </section>
  );
}

export function CopyTradingTrustSection() {
  return (
    <section className="py-16">
      <div className="page-shell grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
        <div>
          <h2 className="text-3xl font-semibold leading-tight text-navy-950 sm:text-4xl">Built on Structure, Discipline, and Transparency</h2>
          <div className="mt-5 space-y-4 leading-7 text-slate-600">
            <p>Smart Profits Trader does not make guaranteed profit claims. We are honest about how trading works.</p>
            <p>
              Our approach is built around algo-supported analysis, weekly optimization, and disciplined risk management. Trading involves risk — losses can happen. But a structured system with proper monitoring is far better than trading based on emotion or guessing.
            </p>
            <p>
              You keep 70% of profits on accounts below $5,000. Above $5,000, it is a 50/50 split. We only earn when you earn.
            </p>
          </div>
        </div>
        <div className="grid gap-3 sm:grid-cols-2">
          {[
            "Your money stays in your personal account",
            "Trade-only permission — we cannot withdraw funds",
            "You can disconnect at any time",
            "Algo-supported trading, not random guessing",
            "Weekly optimization reviews",
            "No profits = no fee from us",
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
          <h2 className="text-3xl font-semibold leading-tight text-navy-950 sm:text-4xl">Ready to Get Started?</h2>
          <p className="mt-5 leading-7 text-slate-600">
            Join Smart Profits Trader Copy Trading. No experience needed, no broker account required upfront. Fill the short application form and our team will contact you on WhatsApp within 24 hours.
          </p>
          <div className="mt-3 inline-flex items-center gap-2 rounded-full border border-profit-200 bg-profit-50 px-4 py-2 text-sm font-semibold text-profit-700">
            <CheckCircle2 size={14} />
            Application is free — no payment required to apply
          </div>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <PrimaryCTA>Apply Free — Takes 2 Minutes</PrimaryCTA>
            <WhatsAppCTA />
          </div>
          <p className="mt-6 text-xs leading-5 text-slate-400">
            Trading involves risk. Results are not guaranteed. Only participate with funds you can afford to risk.
          </p>
        </div>
      </div>
    </section>
  );
}

export function CopyTradingFooter() {
  return (
    <footer className="border-t border-slate-200 bg-white py-8">
      <div className="page-shell">
        <div className="flex flex-col justify-between gap-5 text-sm text-slate-500 md:flex-row md:items-start">
          <div className="max-w-2xl">
            <p className="font-semibold text-navy-950">Smart Profits Trader Copy Trading</p>
            <p className="mt-1">Part of the Smart Profits Trader ecosystem by Laptop Lifestyle Income.</p>
            <p className="mt-3 text-xs leading-5">
              Trading involves significant risk. Smart Profits Trader does not guarantee profits, fixed returns, or risk-free results. Only trade with funds you can afford to risk. Past performance is not indicative of future results.
            </p>
          </div>
          {/* Minimal footer links — no links to other services to prevent funnel leakage */}
          <div className="flex flex-wrap gap-4">
            <Link href="/spt/risk-disclaimer" className="hover:text-navy-950">Risk Disclaimer</Link>
            <Link href="/spt/contact" className="hover:text-navy-950">Contact</Link>
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
      <CopyTradingMoneySection />
      <CopyTradingPainSection />
      <CopyTradingRequirementsSection />
      <CopyTradingSolutionSection />
      <CopyTradingBenefits />
      <CopyTradingWhoFor />
      <CopyTradingHowItWorks />
      <CopyTradingFAQ />
      <CopyTradingTrustSection />
      <CopyTradingFinalCTA />
      <CopyTradingFooter />
      <FloatingChatWidget />
    </main>
  );
}
