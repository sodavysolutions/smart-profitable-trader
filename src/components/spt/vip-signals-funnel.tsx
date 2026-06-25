import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  BarChart3,
  BellRing,
  CheckCircle2,
  Clock3,
  Gem,
  MessageCircle,
  Radar,
  ShieldCheck,
  Signal,
  Target,
  Zap
} from "lucide-react";

const applyHref = "/spt/apply?service=vip-signals";
const whatsappHref =
  "https://wa.me/2347087970133?text=Hello%20Smart%20Profitable%20Trader%20team%2C%20I%E2%80%99m%20interested%20in%20joining%20the%20VIP%20Signal%20Group.%20Please%20send%20me%20the%20details%2C%20payment%20steps%2C%20risk%20guidance%2C%20and%20how%20to%20get%20started.";
const whatsappAiHref =
  "https://wa.me/2347087970133?text=Hello%20Smart%20Profitable%20Trader%20AI%20Agent%2C%20I%E2%80%99m%20interested%20in%20the%20VIP%20Signal%20Group.%20Please%20help%20me%20understand%20how%20it%20works%2C%20the%20price%2C%20risk%2C%20recommended%20capital%2C%20and%20how%20to%20get%20started.";

function MarketBackdrop({ variant = "light" }: { variant?: "light" | "navy" | "gold" }) {
  const stroke = variant === "navy" ? "rgba(32,199,111,0.2)" : variant === "gold" ? "rgba(180,128,30,0.22)" : "rgba(7,20,39,0.09)";
  const grid = variant === "navy" ? "rgba(255,255,255,0.08)" : "rgba(15,35,70,0.06)";

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      <div
        className="absolute inset-0 opacity-70"
        style={{
          backgroundImage: `linear-gradient(${grid} 1px, transparent 1px), linear-gradient(90deg, ${grid} 1px, transparent 1px)`,
          backgroundSize: "44px 44px"
        }}
      />
      <svg className="absolute -right-14 top-8 h-72 w-[580px] opacity-70" viewBox="0 0 580 260" fill="none">
        <path d="M8 191 C62 156 93 168 135 130 C177 92 225 105 270 73 C319 38 354 62 392 103 C432 145 466 126 507 86 C533 61 553 50 572 44" stroke={stroke} strokeWidth="5" strokeLinecap="round" />
        <path d="M8 216 C63 194 101 208 146 178 C199 142 232 151 286 126 C342 100 372 132 414 166 C456 201 492 178 535 140" stroke={stroke} strokeWidth="2" strokeLinecap="round" strokeDasharray="8 12" />
      </svg>
      <svg className="absolute -left-20 bottom-0 h-64 w-[520px] opacity-55" viewBox="0 0 520 240" fill="none">
        {[
          [34, 88, 134, 112],
          [74, 64, 152, 94],
          [114, 102, 183, 135],
          [154, 73, 164, 102],
          [194, 48, 130, 76],
          [234, 82, 171, 118],
          [274, 62, 148, 94],
          [314, 96, 190, 128],
          [354, 78, 159, 103],
          [394, 54, 139, 83],
          [434, 70, 168, 112]
        ].map(([x, y1, y2, bodyY], index) => (
          <g key={x}>
            <path d={`M${x} ${y1}V${y2}`} stroke={stroke} strokeWidth="3" strokeLinecap="round" />
            <rect x={x - 8} y={bodyY} width="16" height="38" rx="4" fill={index % 2 ? "rgba(32,199,111,0.12)" : "rgba(212,163,57,0.13)"} stroke={stroke} />
          </g>
        ))}
      </svg>
    </div>
  );
}

function MiniMarketCard({ icon: Icon, title, value, tone = "green" }: { icon: typeof Signal; title: string; value: string; tone?: "green" | "gold" | "navy" }) {
  const toneClass =
    tone === "gold"
      ? "bg-amber-400/15 text-amber-700"
      : tone === "navy"
        ? "bg-navy-950 text-profit-500"
        : "bg-profit-500/15 text-profit-600";

  return (
    <div className="rounded-2xl border border-white/80 bg-white/88 p-4 shadow-[0_18px_46px_rgba(15,35,70,0.12)] backdrop-blur">
      <div className="flex items-center gap-3">
        <div className={`grid h-10 w-10 shrink-0 place-items-center rounded-xl ${toneClass}`}>
          <Icon size={19} />
        </div>
        <div>
          <p className="text-xs font-bold uppercase tracking-wide text-slate-500">{title}</p>
          <p className="mt-1 text-sm font-semibold text-navy-950">{value}</p>
        </div>
      </div>
    </div>
  );
}

function PriceActionPreview() {
  return (
    <div className="relative overflow-hidden rounded-[22px] border border-slate-200 bg-navy-950 p-5 shadow-[0_24px_70px_rgba(7,20,39,0.18)]">
      <MarketBackdrop variant="navy" />
      <div className="relative">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.14em] text-profit-400">XAUUSD market view</p>
            <h3 className="mt-2 text-xl font-semibold text-white">Signal-ready price action</h3>
          </div>
          <span className="rounded-md bg-profit-500 px-2.5 py-1 text-xs font-bold text-navy-950">LIVE</span>
        </div>
        <svg className="mt-6 h-44 w-full" viewBox="0 0 520 190" fill="none" aria-hidden="true">
          <path d="M0 150H520M0 105H520M0 60H520M0 15H520" stroke="rgba(255,255,255,0.08)" />
          <path d="M18 126 C58 112 70 130 103 95 C133 63 162 76 195 51 C235 22 267 47 299 86 C331 124 359 98 391 68 C423 38 456 45 502 21" stroke="#20c76f" strokeWidth="4" strokeLinecap="round" />
          <path d="M18 146 C65 138 94 156 136 126 C180 93 213 106 254 92 C310 72 339 118 379 139 C420 160 457 132 506 98" stroke="rgba(212,163,57,0.78)" strokeWidth="2" strokeLinecap="round" strokeDasharray="7 10" />
          {[48, 92, 136, 180, 224, 268, 312, 356, 400, 444, 488].map((x, index) => {
            const tops = [72, 52, 96, 45, 36, 69, 88, 57, 41, 68, 34];
            const bottoms = [137, 118, 154, 116, 101, 139, 158, 125, 112, 134, 103];
            const body = [98, 78, 119, 67, 59, 94, 112, 82, 64, 91, 58];
            return (
              <g key={x}>
                <path d={`M${x} ${tops[index]}V${bottoms[index]}`} stroke="rgba(255,255,255,0.62)" strokeWidth="2" strokeLinecap="round" />
                <rect x={x - 7} y={body[index]} width="14" height="30" rx="3" fill={index % 2 ? "rgba(32,199,111,0.72)" : "rgba(212,163,57,0.66)"} />
              </g>
            );
          })}
        </svg>
        <div className="mt-5 grid grid-cols-3 gap-3">
          {[
            ["Pair", "XAUUSD"],
            ["Risk", "Defined"],
            ["Review", "Weekly"]
          ].map(([label, value]) => (
            <div key={label} className="rounded-xl border border-white/10 bg-white/8 p-3">
              <p className="text-[11px] font-bold uppercase tracking-wide text-slate-400">{label}</p>
              <p className="mt-1 text-sm font-semibold text-white">{value}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function PrimaryCTA({ children = "Join the VIP Signal Group" }: { children?: React.ReactNode }) {
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

export function VipSignalsHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-slate-200/70 bg-white/92 backdrop-blur-xl">
      <div className="page-shell flex min-h-20 items-center justify-between gap-4 py-3">
        <Link href="/spt/home" className="flex items-center gap-3">
          <span className="grid h-14 w-14 place-items-center overflow-hidden rounded-xl border border-slate-200 bg-white p-1.5 shadow-soft">
            <Image src="/images/smart-profits-trader-logo.png" alt="Smart Profits Trader logo" width={160} height={160} className="h-full w-full object-contain" priority />
          </span>
          <span className="hidden leading-tight sm:block">
            <span className="block font-semibold text-navy-950">Smart Profits Trader VIP</span>
            <span className="block text-xs font-semibold uppercase tracking-[0.14em] text-profit-600">Premium XAUUSD Trading Signals</span>
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

export function VipSignalsHero() {
  return (
    <section className="overflow-hidden bg-[radial-gradient(circle_at_15%_5%,#dbeafe_0,#f8fbff_34%,#fff7f1_78%,#ffffff_100%)]">
      <div className="funnel-hero-shell py-8 sm:py-10">
        <div className="funnel-hero-panel">
          <MarketBackdrop variant="gold" />
          <div className="funnel-hero-grid">
            <div className="funnel-hero-copy hero-slide-left">
              <p className="text-sm font-bold uppercase tracking-[0.16em] text-profit-600">Smart Profits Trader VIP</p>
              <h1 className="funnel-headline mt-5 text-4xl text-navy-950 sm:text-5xl lg:text-[4rem]">
                Get High-Quality XAUUSD Trade Signals Without Spending All Day Analyzing the Market
              </h1>
              <div className="mt-6 space-y-4 text-base leading-8 text-slate-600 sm:text-lg">
                <p>
                  Join <strong>Smart Profits Trader VIP</strong> and receive structured gold trading signals powered by our <strong>Smart Profit Algo</strong> — designed for traders who want clear entries, trade direction, risk guidance, and a more professional way to participate in the market.
                </p>
                <p>
                  We trade mostly <strong>XAUUSD</strong>, target up to <strong>200 pips daily</strong>, and our internal performance tracking averages around <strong>7 winning trades out of every 10</strong> over time.
                </p>
                <p>
                  Instead of guessing, overthinking, or jumping from one random signal group to another, plug into a trading signal system built around market testing, live validation, weekly optimization, and disciplined trade selection.
                </p>
              </div>
              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
                  <p className="text-xs font-bold uppercase tracking-wide text-slate-500">VIP Access</p>
                  <p className="mt-1 text-2xl font-semibold text-navy-950">$50/month</p>
                </div>
                <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
                  <p className="text-xs font-bold uppercase tracking-wide text-slate-500">Recommended starting capital</p>
                  <p className="mt-1 text-2xl font-semibold text-navy-950">$200</p>
                </div>
              </div>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <PrimaryCTA />
                <WhatsAppCTA />
              </div>
              <p className="mt-6 rounded-[18px] border border-amber-200 bg-amber-50 p-4 text-sm leading-6 text-amber-900">
                Trading involves risk, and results are not guaranteed. Past performance, average win rate, and daily targets do not guarantee future results.
              </p>
            </div>
            <div className="funnel-hero-visual hero-slide-right relative">
              <div className="rounded-[26px] border border-slate-200 bg-white p-5 shadow-[0_24px_70px_rgba(15,35,70,0.12)]">
                <div className="rounded-[20px] bg-gradient-to-br from-slate-50 to-blue-50 p-5">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs font-bold uppercase tracking-wide text-slate-500">VIP signal console</p>
                      <h2 className="mt-2 text-2xl font-semibold text-navy-950">XAUUSD Signal Flow</h2>
                    </div>
                    <div className="grid h-11 w-11 place-items-center rounded-full bg-profit-500/15 text-profit-600">
                      <Signal size={22} />
                    </div>
                  </div>
                  <div className="mt-6 overflow-hidden rounded-2xl border border-slate-200 bg-navy-950 p-4">
                    <svg className="h-28 w-full" viewBox="0 0 420 120" fill="none" aria-hidden="true">
                      <path d="M0 92H420M0 58H420M0 24H420" stroke="rgba(255,255,255,0.08)" />
                      <path d="M14 82 C49 68 71 76 104 51 C138 26 160 45 189 68 C222 94 250 75 281 46 C318 12 351 37 405 20" stroke="#20c76f" strokeWidth="3" strokeLinecap="round" />
                      <path d="M16 101 C56 92 76 105 118 82 C156 61 192 69 232 57 C284 42 315 70 354 89 C378 101 397 94 414 83" stroke="rgba(212,163,57,0.75)" strokeWidth="2" strokeLinecap="round" strokeDasharray="6 9" />
                      {[40, 78, 116, 154, 192, 230, 268, 306, 344, 382].map((x, index) => {
                        const tops = [38, 28, 56, 34, 20, 47, 54, 32, 26, 36];
                        const bottoms = [89, 76, 98, 82, 66, 91, 103, 78, 71, 80];
                        return (
                          <g key={x}>
                            <path d={`M${x} ${tops[index]}V${bottoms[index]}`} stroke="rgba(255,255,255,0.5)" strokeWidth="2" strokeLinecap="round" />
                            <rect x={x - 5} y={(tops[index] + bottoms[index]) / 2 - 13} width="10" height="26" rx="2.5" fill={index % 2 ? "rgba(32,199,111,0.72)" : "rgba(212,163,57,0.7)"} />
                          </g>
                        );
                      })}
                    </svg>
                  </div>
                  <div className="mt-6 grid gap-3">
                    {[
                      ["Pair", "XAUUSD focus"],
                      ["Direction", "Buy or sell guidance"],
                      ["Risk", "Stop-loss and risk notes"],
                      ["Optimization", "Weekly strategy review"]
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
              <div className="funnel-float pointer-events-none absolute -left-7 -top-7 hidden w-56 rotate-[-5deg] md:block" style={{ "--float-rotate": "-5deg" } as React.CSSProperties}>
                <MiniMarketCard icon={BellRing} title="Signal alert" value="Entry, SL and TP notes" />
              </div>
              <div className="funnel-float pointer-events-none absolute -right-6 -bottom-5 hidden w-52 rotate-[5deg] md:block" style={{ "--float-rotate": "5deg" } as React.CSSProperties}>
                <MiniMarketCard icon={Gem} title="Gold focus" value="XAUUSD-first signals" tone="gold" />
              </div>
              <div className="funnel-float pointer-events-none absolute -right-5 top-20 hidden w-48 rotate-[3deg] xl:block" style={{ "--float-rotate": "3deg" } as React.CSSProperties}>
                <MiniMarketCard icon={Zap} title="Execution" value="Clear trade plan" tone="navy" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function VipSignalsPainSection() {
  return (
    <section className="relative overflow-hidden py-16">
      <MarketBackdrop />
      <div className="page-shell relative grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
        <div>
          <p className="text-sm font-bold uppercase tracking-[0.16em] text-profit-600">The problem</p>
          <h2 className="funnel-section-title mt-4 text-3xl font-semibold text-navy-950 sm:text-4xl">
            Most Traders Don’t Lose Because Forex Has No Opportunity. They Lose Because They Trade Without Structure.
          </h2>
        </div>
        <div className="rounded-[24px] border border-slate-200 bg-white p-6 leading-7 text-slate-600 shadow-soft">
          <p>Many people enter the forex market excited, but they quickly get overwhelmed.</p>
          <div className="mt-5 grid gap-3">
            {[
              "They do not know when to enter.",
              "They do not know when to exit.",
              "They chase every market move.",
              "They use poor risk management.",
              "They enter emotionally.",
              "They join too many groups and end up confused."
            ].map((item) => (
              <div key={item} className="flex gap-3 rounded-xl bg-slate-50 p-3 text-sm text-slate-700">
                <CheckCircle2 className="mt-0.5 shrink-0 text-profit-600" size={17} />
                <span>{item}</span>
              </div>
            ))}
          </div>
          <p className="mt-5">The result is simple: frustration, inconsistency, and avoidable losses.</p>
          <p className="mt-4">
            That is why we created <strong>Smart Profits Trader VIP</strong>.
          </p>
          <p className="mt-4">
            It is for people who want to trade with clearer direction, better structure, and access to signals backed by a more organized trading process.
          </p>
        </div>
      </div>
    </section>
  );
}

export function VipSignalsSolutionSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-slate-50 to-white py-16">
      <MarketBackdrop />
      <div className="page-shell relative">
        <div className="grid items-center gap-10 lg:grid-cols-[1.05fr_0.95fr]">
          <div>
            <h2 className="text-3xl font-semibold leading-tight text-navy-950 sm:text-4xl">A Simple Way to Trade Gold With More Clarity and Confidence</h2>
            <div className="mt-5 space-y-4 leading-7 text-slate-600">
              <p>Smart Profits Trader VIP gives you access to premium XAUUSD trade signals from our structured trading operation.</p>
              <p>Each signal is designed to help you know:</p>
              <ul className="grid gap-2 text-sm text-slate-700 sm:grid-cols-2">
                {["What pair we are watching", "Whether we are buying or selling", "Entry zone", "Stop-loss guidance", "Take-profit guidance", "Risk notes where necessary", "Market update when needed"].map((item) => (
                  <li key={item} className="flex gap-2 rounded-xl bg-white p-3 shadow-sm">
                    <CheckCircle2 className="mt-0.5 shrink-0 text-profit-600" size={16} />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <p>
                Our trading process is supported by the <strong>Smart Profit Algo</strong>, a sophisticated algorithmic system that helps test strategies, analyze market behavior, validate trade setups, and support better trade selection.
              </p>
              <p>Every weekend, we run optimization reviews to keep our strategy aligned with current market conditions, volatility, liquidity, and price behavior.</p>
            </div>
            <div className="mt-7">
              <PrimaryCTA />
            </div>
          </div>
          <div className="space-y-4">
            <PriceActionPreview />
            <div className="rounded-[24px] border border-slate-200 bg-white p-6 shadow-[0_24px_70px_rgba(15,35,70,0.1)]">
            <div className="grid gap-4">
              {[
                [Radar, "Market behavior analysis"],
                [BarChart3, "Trade setup validation"],
                [Clock3, "Weekend optimization reviews"],
                [Target, "Clear signal plan"]
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
      </div>
    </section>
  );
}

export function VipSignalsBenefits() {
  const benefits = [
    ["Trade With Clear Direction", "Stop guessing what to buy or sell. Our VIP signals give you structured trade ideas so you can enter the market with more clarity and a defined plan.", Target],
    ["Focus Mostly on XAUUSD", "Gold is one of the most powerful and active instruments in the market. Our VIP service focuses mostly on XAUUSD so members can follow a more specialized trading approach instead of jumping across too many pairs.", Gem],
    ["Save Time and Reduce Emotional Trading", "You do not need to sit on charts all day trying to analyze every candle. Our system helps identify trade opportunities, while you focus on execution and proper risk management.", Clock3]
  ] as const;

  return (
    <section className="page-shell py-16">
      <div className="mx-auto max-w-3xl text-center">
        <h2 className="text-3xl font-semibold leading-tight text-navy-950 sm:text-4xl">Why Join Smart Profits Trader VIP?</h2>
      </div>
      <div className="mt-10 grid gap-5 lg:grid-cols-3">
        {benefits.map(([title, text, Icon], index) => (
          <div key={title} className="funnel-card relative overflow-hidden rounded-[22px] border border-slate-200 bg-white p-6 shadow-soft">
            <MarketBackdrop variant={index === 1 ? "gold" : "light"} />
            <div className="relative">
            <div className="grid h-12 w-12 place-items-center rounded-2xl bg-navy-950 text-profit-500">
              <Icon size={22} />
            </div>
            <h3 className="mt-5 text-xl font-semibold text-navy-950">{title}</h3>
            <p className="mt-3 text-sm leading-6 text-slate-600">{text}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export function VipSignalsIncludedSection() {
  return (
    <section className="bg-gradient-to-b from-white to-blue-50 py-16">
      <div className="page-shell">
        <div className="mx-auto max-w-4xl rounded-[26px] border border-slate-200 bg-white p-6 shadow-[0_24px_70px_rgba(15,35,70,0.09)] md:p-8">
          <h2 className="text-3xl font-semibold leading-tight text-navy-950 sm:text-4xl">What You Get for $50/Month</h2>
          <p className="mt-4 leading-7 text-slate-600">
            When you join Smart Profits Trader VIP, you get access to a premium trading signal experience designed to help you trade with more structure.
          </p>
          <div className="mt-7 grid gap-3 md:grid-cols-2">
            {[
              "XAUUSD-focused trading signals",
              "Buy/sell trade direction",
              "Entry guidance",
              "Stop-loss guidance",
              "Take-profit guidance",
              "Market updates when needed",
              "Risk management reminders",
              "Weekly strategy optimization",
              "Access to a focused trading community",
              "Guidance for traders using personal accounts",
              "Guidance for traders applying signals to prop firm accounts with proper risk control"
            ].map((item) => (
              <div key={item} className="flex gap-3 rounded-2xl bg-slate-50 p-4 text-sm leading-6 text-slate-700">
                <CheckCircle2 className="mt-0.5 shrink-0 text-profit-600" size={18} />
                <span>{item}</span>
              </div>
            ))}
          </div>
          <div className="mt-8">
            <PrimaryCTA>Get VIP Access for $50/Month</PrimaryCTA>
          </div>
        </div>
      </div>
    </section>
  );
}

export function VipSignalsPerformanceSection() {
  return (
    <section className="page-shell py-16">
      <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
        <div>
          <h2 className="text-3xl font-semibold leading-tight text-navy-950 sm:text-4xl">Our Target Is Simple: Catch High-Quality Gold Moves With Controlled Risk</h2>
          <div className="mt-5 space-y-4 leading-7 text-slate-600">
            <p>
              Our daily target is up to <strong>200 pips</strong>, depending on market conditions.
            </p>
            <p>
              Based on internal tracking, our signal performance averages around <strong>7 wins out of every 10 trades</strong> over time. However, trading is not guaranteed, and every trader must apply proper risk management.
            </p>
            <p>Some days will be better than others. Some trades will lose. Some market conditions will require patience.</p>
            <p>That is why we focus on structure, discipline, and controlled exposure — not reckless entries or fake guarantees.</p>
          </div>
        </div>
        <div className="relative overflow-hidden rounded-[24px] border border-slate-200 bg-white p-6 shadow-soft">
          <MarketBackdrop variant="gold" />
          <div className="relative">
          <h3 className="text-xl font-semibold text-navy-950">Important Note</h3>
          <p className="mt-4 leading-7 text-slate-600">
            The goal is not to take every trade blindly. The goal is to follow the signal plan responsibly, use the recommended risk, and protect your account while aiming for consistent progress over time.
          </p>
          <div className="mt-6 grid gap-3">
            {["Up to 200 pips daily target", "Internal tracking: around 7 wins out of 10 over time", "Risk management required", "No guaranteed outcomes"].map((item) => (
              <div key={item} className="flex gap-3 rounded-2xl bg-slate-50 p-4 text-sm font-semibold text-navy-950">
                <ShieldCheck className="shrink-0 text-profit-600" size={18} />
                <span>{item}</span>
              </div>
            ))}
          </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function VipSignalsCapitalSection() {
  return (
    <section className="bg-slate-50 py-16">
      <div className="page-shell grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
        <div>
          <h2 className="text-3xl font-semibold leading-tight text-navy-950 sm:text-4xl">Recommended Starting Capital: $200</h2>
          <div className="mt-5 space-y-4 leading-7 text-slate-600">
            <p>
              For personal trading accounts, we recommend starting with at least <strong>$200</strong> so you have enough room to apply better risk management and avoid overexposing your account.
            </p>
            <p>You can also apply the signals on prop firm accounts, but only with proper risk management, lot sizing, and respect for your prop firm rules.</p>
          </div>
          <div className="mt-7">
            <PrimaryCTA>Join VIP and Start Trading With Structure</PrimaryCTA>
          </div>
        </div>
        <div className="rounded-[24px] border border-amber-200 bg-amber-50 p-6 text-amber-900 shadow-sm">
          <h3 className="text-xl font-semibold">Prop Firm Note</h3>
          <p className="mt-4 leading-7">
            If you are using a prop firm account, do not trade aggressively. The signals should be applied carefully based on your account size, daily drawdown, max drawdown, and trading rules.
          </p>
        </div>
      </div>
    </section>
  );
}

export function VipSignalsWhoFor() {
  return (
    <section className="page-shell py-16">
      <div className="mx-auto max-w-4xl rounded-[26px] border border-slate-200 bg-white p-6 shadow-[0_24px_70px_rgba(15,35,70,0.09)] md:p-8">
        <h2 className="text-3xl font-semibold leading-tight text-navy-950 sm:text-4xl">Smart Profits Trader VIP Is Best For You If…</h2>
        <div className="mt-7 grid gap-3 md:grid-cols-2">
          {[
            "You want to trade forex or gold but need clearer trade direction.",
            "You are tired of random signal groups with no structure.",
            "You want to focus mostly on XAUUSD.",
            "You have at least $200 recommended starting capital.",
            "You want a simple monthly signal service at $50/month.",
            "You want trade ideas supported by an algo-powered trading process.",
            "You understand that trading involves risk and proper risk management is important.",
            "You want signals you can apply to a personal account or carefully to a prop firm account."
          ].map((item) => (
            <div key={item} className="flex gap-3 rounded-2xl bg-slate-50 p-4 text-sm leading-6 text-slate-700">
              <CheckCircle2 className="mt-0.5 shrink-0 text-profit-600" size={18} />
              <span>{item}</span>
            </div>
          ))}
        </div>
        <div className="mt-8">
          <PrimaryCTA />
        </div>
      </div>
    </section>
  );
}

export function VipSignalsHowItWorks() {
  const steps = [
    ["Apply or Message Us", "Click the application button or WhatsApp us to request VIP access."],
    ["Get the Details", "We send you the payment details, group information, risk guidance, and setup instructions."],
    ["Join the VIP Group", "Once payment is confirmed, you get added to the VIP Signal Group."],
    ["Follow the Signal Plan Responsibly", "You receive signals and updates. Your job is to apply proper risk management and follow the trade plan with discipline."]
  ];

  return (
    <section className="bg-gradient-to-b from-white to-slate-50 py-16">
      <div className="page-shell">
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
          <PrimaryCTA>Apply to Join VIP</PrimaryCTA>
        </div>
      </div>
    </section>
  );
}

export function VipSignalsTrustSection() {
  return (
    <section className="page-shell py-16">
      <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
        <div>
          <h2 className="text-3xl font-semibold leading-tight text-navy-950 sm:text-4xl">Built for Traders Who Want Structure, Not Hype</h2>
          <div className="mt-5 space-y-4 leading-7 text-slate-600">
            <p>Smart Profits Trader VIP is not built around noise, fake promises, or emotional trading.</p>
            <p>We focus on:</p>
            <ul className="grid gap-2 text-sm text-slate-700 sm:grid-cols-2">
              {["XAUUSD signal opportunities", "Smart Profit Algo support", "Weekly strategy optimization", "Risk guidance", "Trade structure", "Market updates", "Controlled execution"].map((item) => (
                <li key={item} className="flex gap-2 rounded-xl bg-slate-50 p-3">
                  <CheckCircle2 className="mt-0.5 shrink-0 text-profit-600" size={16} />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <p>We do not promise guaranteed profit. We do not claim every trade will win. We do not encourage reckless lot sizes.</p>
            <p>Our goal is to help members trade with clearer direction, better discipline, and a more structured approach.</p>
          </div>
        </div>
        <div className="grid content-start gap-3 sm:grid-cols-2">
          {[
            "No guaranteed-profit claims",
            "No reckless lot sizes",
            "Risk guidance included",
            "Weekly strategy optimization",
            "Market updates",
            "Smart Profit Algo support"
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

export function VipSignalsFinalCTA() {
  return (
    <section className="page-shell py-16">
      <div className="relative overflow-hidden rounded-[28px] bg-[radial-gradient(circle_at_top_left,#dbeafe_0,#f8fbff_46%,#fff7f1_100%)] p-6 shadow-[0_24px_70px_rgba(15,35,70,0.1)] md:p-10">
        <MarketBackdrop variant="gold" />
        <div className="relative mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-semibold leading-tight text-navy-950 sm:text-4xl">Ready to Trade Gold With More Clarity?</h2>
          <div className="mt-5 space-y-3 leading-7 text-slate-600">
            <p>If you want to participate in the XAUUSD market but you do not want to trade blindly, Smart Profits Trader VIP gives you access to structured trade signals powered by our Smart Profit Algo.</p>
            <p>
              VIP access is only <strong>$50/month</strong>, and the recommended starting capital is <strong>$200</strong>.
            </p>
            <p>Click below to apply or chat with us on WhatsApp to get the full details.</p>
          </div>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <PrimaryCTA />
            <WhatsAppCTA />
          </div>
        </div>
      </div>
    </section>
  );
}

export function VipSignalsFooter() {
  return (
    <footer className="border-t border-slate-200 bg-white py-8">
      <div className="page-shell">
        <div className="flex flex-col justify-between gap-5 text-sm text-slate-500 md:flex-row md:items-start">
          <div className="max-w-2xl">
            <p>Smart Profits Trader VIP is part of the Smart Profits Trader ecosystem by Laptop Lifestyle Income.</p>
            <p className="mt-3 text-xs leading-5">
              Trading involves significant risk. Smart Profits Trader does not guarantee profits, fixed returns, or risk-free results. Daily targets, average win rate, and past performance do not guarantee future outcomes. Only trade with funds you can afford to risk.
            </p>
          </div>
          <div className="flex flex-wrap gap-4">
            {[
              ["Copy Trading", "/spt/copy-trading"],
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

export function FloatingWhatsAppButton() {
  return (
    <Link
      href={whatsappAiHref}
      target="_blank"
      rel="noreferrer"
      className="floating-whatsapp fixed z-50 inline-flex items-center justify-center gap-1.5 bg-profit-500 px-2.5 py-1.5 text-xs font-bold text-navy-950 transition hover:-translate-y-0.5 hover:bg-profit-600 hover:text-white sm:bottom-5 sm:right-5 sm:gap-2 sm:px-4 sm:py-3 sm:text-sm"
    >
      <MessageCircle size={18} />
      Ask Our WhatsApp AI Agent
    </Link>
  );
}

export function VipSignalsFunnelPage() {
  return (
    <main className="funnel-page min-h-screen bg-white">
      <VipSignalsHeader />
      <VipSignalsHero />
      <VipSignalsPainSection />
      <VipSignalsSolutionSection />
      <VipSignalsBenefits />
      <VipSignalsIncludedSection />
      <VipSignalsPerformanceSection />
      <VipSignalsCapitalSection />
      <VipSignalsWhoFor />
      <VipSignalsHowItWorks />
      <VipSignalsTrustSection />
      <VipSignalsFinalCTA />
      <VipSignalsFooter />
      <FloatingWhatsAppButton />
    </main>
  );
}
