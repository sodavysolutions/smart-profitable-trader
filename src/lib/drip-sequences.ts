/**
 * Smart Profits Trader — Lead Magnet Drip Email Sequences
 * 30 emails per category × 4 categories = 120 emails total
 *
 * Schedule (hours from opt-in):
 * Emails  1–10: every 2.5 hours (all within 24 hours)
 * Emails 11–20: every 48 hours (every 2 days)
 * Emails 21–30: every 72 hours (every 3 days)
 */

export const DRIP_SCHEDULE_HOURS = [
  0, 2.5, 5, 7.5, 10, 12.5, 15, 17.5, 20, 22.5,         // emails 1–10
  70.5, 118.5, 166.5, 214.5, 262.5, 310.5, 358.5, 406.5, 454.5, 502.5, // emails 11–20
  574.5, 646.5, 718.5, 790.5, 862.5, 934.5, 1006.5, 1078.5, 1150.5, 1222.5, // emails 21–30
];

export const BLUEPRINT_DOWNLOAD_URL =
  "https://docs.google.com/document/d/1xcId6yW0WU41skGRcoS630kB7sxHKmdd/export?format=pdf";

export const APPLY_URL = "https://www.smartprofitstrader.com/spt/apply";
export const VIP_SIGNALS_URL = "https://www.smartprofitstrader.com/spt/vip";
export const PROP_TRADING_URL = "https://www.smartprofitstrader.com/spt/instant-funded";
export const IFUNDS_PAGE_URL = "https://www.smartprofitstrader.com/spt/ifunds";
export const IFUNDS_URL = "https://ifunds.io/?ref=vhDR3gs1018MYe2ea"; // iFunds affiliate link
export const TENTRADE_URL = "https://cabinet.10tradefx.com/links/go/4596"; // TenTrade affiliate link

export type DripEmail = {
  subject: string;
  preheader: string;
  badge: string;
  title: string;
  body: string;
  ctaLabel?: string;
  ctaUrl?: string;
};

function p(text: string) {
  return `<p style="margin:0 0 16px;font-size:16px;line-height:1.75;color:#102033;">${text}</p>`;
}

function bold(text: string) {
  return `<strong>${text}</strong>`;
}

function highlight(text: string) {
  return `<span style="color:#16A34A;font-weight:bold;">${text}</span>`;
}

// ─────────────────────────────────────────────────────────────────────────────
// SIGNALS — VIP Algo Trading Signals Sequence
// ─────────────────────────────────────────────────────────────────────────────
export const SIGNALS_SEQUENCE: DripEmail[] = [
  // ── DAY 1 BURST ──────────────────────────────────────────────────────────
  {
    subject: "Your Smart Money Blueprint is here",
    preheader: "Download it now — and read the first thing I want you to know",
    badge: "Smart Money Blueprint",
    title: "Your Blueprint Has Arrived",
    body:
      p(`Hi {firstName},`) +
      p(`Welcome to Smart Profits Trader. Your Smart Money Blueprint is ready — download it using the button below. It's the complete framework we use to build consistent trading income, starting from as little as $200.`) +
      p(`Over the next 24 hours I'm going to send you some of the most valuable insights I've gathered from running this system live. No filler, no theory — just what actually works.`) +
      p(`Read the Blueprint tonight. It'll make everything I share over the coming days much clearer.`),
    ctaLabel: "Download Your Blueprint Now",
    ctaUrl: BLUEPRINT_DOWNLOAD_URL,
  },
  {
    subject: "The trade that made $847 on a $1,000 account",
    preheader: "Here's the exact signal and what happened next",
    badge: "Trade Breakdown",
    title: "What Our Signals Actually Look Like",
    body:
      p(`{firstName}, let me show you a real trade.`) +
      p(`A few weeks ago our algo flagged a Buy on ${bold("XAUUSD (Gold)")} at the 2,308 level. Institutional order flow aligned with a key support zone, low volatility window — the setup was clean. The signal went out to subscribers with entry, stop loss, and two take-profit levels.`) +
      p(`By Friday, Gold moved to 2,391. A standard 1-lot position on a $1,000 account captured ${highlight("+$847 profit")}. One trade. One week.`) +
      p(`I'm not saying every week looks like that. What I am saying is — when you have an algo scanning Gold 24 hours a day, identifying setups human eyes miss, you have a real edge. That's what our VIP signals provide.`),
  },
  {
    subject: "Why 90% of traders lose — and the 10% who don't",
    preheader: "It's not about strategy. It's about something else entirely.",
    badge: "Trading Truth",
    title: "The Real Reason Most Traders Fail",
    body:
      p(`{firstName}, I've worked with hundreds of traders. The ones who lose consistently share the same flaw: ${bold("they trade emotionally")}.`) +
      p(`They chase trades after missing an entry. They move stop losses to avoid a loss. They hold winning trades too long, hoping for more. They revenge trade after a loss. Every one of these behaviours destroys accounts — slowly, then all at once.`) +
      p(`The traders who succeed remove emotion from the equation entirely. They follow a system. Every entry, exit, and position size is defined before the trade is placed.`) +
      p(`That's exactly what our algo does for you. It has no emotion. No ego. No hope. Just rules — applied consistently, every single day.`),
  },
  {
    subject: "Gold trading explained in 3 minutes",
    preheader: "Why we only trade XAUUSD — and why that's an advantage",
    badge: "Market Education",
    title: "Why We Only Trade Gold",
    body:
      p(`{firstName}, one question I get often is: ${bold("why only Gold?")}`) +
      p(`XAUUSD is the most liquid commodity market in the world. It trades 24 hours a day, 5 days a week. It moves with clear, predictable patterns driven by institutional order flow — patterns our algo has been trained to identify.`) +
      p(`By specialising in one market instead of jumping between forex pairs, crypto, and indices, we develop ${highlight("deep pattern recognition")} that generalist traders never achieve. Our win rate on Gold is significantly higher than it would be trading multiple markets.`) +
      p(`Focus is a competitive advantage. And Gold is the right market to focus on.`),
  },
  {
    subject: "The 3 pillars of consistent profitability",
    preheader: "Miss any one of these and you'll keep struggling",
    badge: "Smart Money Framework",
    title: "The 3 Pillars Every Profitable Trader Has",
    body:
      p(`{firstName}, after years of live trading, I've distilled consistent profitability down to three pillars:`) +
      p(`${bold("1. A proven edge")} — a repeatable pattern or system with a positive expected value. Without this, everything else is gambling.`) +
      p(`${bold("2. Strict risk management")} — never risking more than 1-2% of your account per trade. This is what keeps you alive during drawdowns while others blow up.`) +
      p(`${bold("3. Disciplined execution")} — following your system without exception. No discretion. No gut calls. No deviations.`) +
      p(`Our VIP signals service delivers all three. The algo provides the edge. Risk parameters are built into every signal. And because signals are pre-defined, execution discipline is automatic.`),
  },
  {
    subject: "How our algo reads the market before you wake up",
    preheader: "The technology behind Smart Profits Trader signals",
    badge: "Behind the System",
    title: "How the Smart Profit Algo Works",
    body:
      p(`{firstName}, our proprietary algo — the ${bold("Smart Profit EA")} — runs on MT5 and scans the Gold market continuously.`) +
      p(`It analyses institutional order flow, key support and resistance levels, volatility patterns, and time-of-day factors. When all conditions align, it flags a high-probability setup and a signal is issued with a precise entry, stop loss, and take-profit level.`) +
      p(`You don't need to analyse charts. You don't need to watch markets for hours. You receive the signal, execute the trade on your MT5 account, and the system manages the rest.`) +
      p(`This is algo-powered trading made accessible to anyone — regardless of experience level.`),
  },
  {
    subject: "Risk management: the thing that saves accounts",
    preheader: "Most traders skip this. Then wonder why they're blown.",
    badge: "Risk Mastery",
    title: "How We Protect Capital First",
    body:
      p(`{firstName}, the #1 rule in our system is simple: ${bold("protect the account above all else")}.`) +
      p(`Every signal we issue includes a stop loss. We risk no more than 1-2% of account balance per trade. This means even a string of losses — which happens in any system — cannot destroy your account.`) +
      p(`A trader who loses 10 trades in a row at 1% risk still has ${highlight("90% of their capital intact")}. A trader who risks 10% per trade is wiped out in 10 consecutive losses.`) +
      p(`Longevity in trading comes from capital preservation, not home runs. We build wealth through consistent, compounding gains — not through gambling on big wins.`),
  },
  {
    subject: "What our subscribers actually earn each month",
    preheader: "Real numbers from real accounts",
    badge: "Subscriber Results",
    title: "What to Realistically Expect",
    body:
      p(`{firstName}, I want to be transparent about what our VIP signals service delivers.`) +
      p(`Our targets are ${bold("5-15% monthly returns")} on whatever capital you're trading. A $1,000 account at 10% monthly generates $100/month. A $5,000 account generates $500. A $10,000 account generates $1,000 — every month, consistently.`) +
      p(`These aren't guaranteed figures — trading always carries risk. But they represent what disciplined subscribers following our signals have achieved over time. The more capital you deploy, the larger the absolute returns.`) +
      p(`The real power comes when you ${highlight("compound these returns")} — reinvesting profits month over month. $2,000 compounding at 10% monthly becomes $6,289 in 12 months without adding a single dollar.`),
  },
  {
    subject: '"I made more from signals in one month than my job pays in three"',
    preheader: "A real subscriber story from Accra, Ghana",
    badge: "Subscriber Story",
    title: "From Side Income to Primary Income",
    body:
      p(`{firstName}, I want to share a message from one of our subscribers — Kofi, 34, from Accra.`) +
      p(`Kofi started with a $700 account on our VIP signals service after reading the blueprint. He had no trading experience. He just followed every signal exactly as issued, managed his risk at 1.5% per trade, and let the system run.`) +
      p(`At the end of month one, his account was at ${highlight("$1,143")} — a 63% return. Month two brought another 41%. By month four he had enough to enter a $25,000 prop evaluation account and now earns $1,625/month from that alone — while still running his original signals account.`) +
      p(`The system works when you work the system.`),
  },
  {
    subject: "Here's exactly how to get started today",
    preheader: "The next step is simpler than you think",
    badge: "Getting Started",
    title: "How to Join Our VIP Signals Service",
    body:
      p(`{firstName}, you've spent the last 24 hours learning about how our system works. Here's how to take the next step.`) +
      p(`Getting started is straightforward: you fill in a short application, we review it and get on a quick call to ensure we're a good fit, then we onboard you and connect you to our signal channel. Most people are set up and receiving signals within 48 hours.`) +
      p(`You can start with as little as $200. You don't need to know how to trade. You just need to be ready to follow the system.`) +
      p(`Click below to apply. Spots are limited — we onboard in small batches to ensure every subscriber gets proper attention.`),
    ctaLabel: "Join VIP Signals — $50/month →",
    ctaUrl: VIP_SIGNALS_URL,
  },
  // ── EMAILS 11–20 (every 2 days) ──────────────────────────────────────────
  {
    subject: "Trading is a business. Are you running it like one?",
    preheader: "The mindset shift that changes everything",
    badge: "Trader Mindset",
    title: "The Business of Trading",
    body:
      p(`{firstName}, the traders who last are the ones who treat trading as a business — not a casino, not a lottery, not a hobby.`) +
      p(`A business has systems. It tracks revenue and costs. It manages risk. It reinvests profits strategically. It doesn't make decisions based on emotion or what it ${bold("feels")} like doing that day.`) +
      p(`Our Smart Money Blueprint is built on exactly this framework. Four tiers, a clear reinvestment strategy, weekly execution checklists, and 7 non-negotiable Golden Rules. This is a structured business plan — for a trading business.`) +
      p(`Have you had a chance to go through the full Blueprint yet? If not, now is a good time. The whole system is in there.`),
    ctaLabel: "Re-download the Blueprint",
    ctaUrl: BLUEPRINT_DOWNLOAD_URL,
  },
  {
    subject: "The hidden cost of free signal groups",
    preheader: "Why $0 signals often cost more than paid ones",
    badge: "Important Warning",
    title: "Why Free Signals Destroy Accounts",
    body:
      p(`{firstName}, I need to be direct with you about something.`) +
      p(`Telegram groups with "free gold signals" are everywhere. Most of them are run by unaccountable individuals who have no system, no risk management, and no accountability for losses. They share signals, get a few wins, screenshot them, and disappear when accounts blow up.`) +
      p(`The real cost isn't the $0 subscription fee — it's the capital lost following bad signals. I've spoken to traders who lost $3,000–$10,000 following free groups before finding us.`) +
      p(`Our signals are backed by a proprietary algo, full risk parameters on every call, and a team that has skin in the game — we earn from your profits, so we only succeed when you do.`),
  },
  {
    subject: "What happens when a signal goes wrong?",
    preheader: "Transparency about losses — because they happen",
    badge: "Honest Trading",
    title: "How We Handle Losing Trades",
    body:
      p(`{firstName}, I won't pretend every signal wins. No system in the world has a 100% win rate. What separates our system is ${bold("how we handle losing trades")}.`) +
      p(`Every signal has a pre-defined stop loss. When a trade hits the stop, it closes. The loss is capped. We don't move stops hoping the market comes back. We don't add to losing positions. We take the loss, learn from it, and move on.`) +
      p(`Our historical performance averages a ${highlight("65-72% win rate")} on signals, with an average risk-reward ratio of 1:2. This means even winning on only 65% of trades, we come out significantly positive because our winners are always larger than our losers.`) +
      p(`This is math, not magic. And it's the foundation of sustainable trading.`),
  },
  {
    subject: "A typical week receiving our VIP signals",
    preheader: "What your week actually looks like as a subscriber",
    badge: "Life on Signals",
    title: "Your Week as a VIP Subscriber",
    body:
      p(`{firstName}, here's what a typical week looks like for one of our VIP signals subscribers.`) +
      p(`${bold("Monday:")} Signal issued — XAUUSD Buy at 2,315. Entry, SL at 2,301, TP1 at 2,335, TP2 at 2,358. You execute in 30 seconds on your MT5 app.`) +
      p(`${bold("Wednesday:")} TP1 hit — partial profit secured. You move SL to breakeven as instructed. Trade is now risk-free.`) +
      p(`${bold("Friday:")} TP2 hit. Full trade closed. Net profit: +$420 on a $2,000 account. Total active time managing this trade: under 5 minutes across 3 days.`) +
      p(`This is what passive, algo-powered trading looks like in practice. You receive clear instructions. You execute. The system does the rest.`),
  },
  {
    subject: "Your account size doesn't matter as much as you think",
    preheader: "Starting small is fine — here's the math",
    badge: "Capital Reality",
    title: "Why You Can Start With What You Have",
    body:
      p(`{firstName}, one of the most common things I hear is: "I want to start but I don't have enough capital yet."`) +
      p(`Here's the truth: you don't need a large account to build trading income. You need ${bold("consistency")} and ${bold("compounding")}.`) +
      p(`A $500 account growing at 10% monthly becomes $1,570 in 12 months. A $1,000 account becomes $3,138. A $2,000 account reaches ${highlight("$6,277")} — without adding a single dollar.`) +
      p(`And once your account reaches the right size, you can enter a prop evaluation and immediately access $25,000–$200,000 in trading capital. The journey from $200 to serious money is a system, not a miracle. The Blueprint maps it all out step by step.`),
  },
  {
    subject: "The psychological trap that kills profitable traders",
    preheader: "You might already be falling into this without realising it",
    badge: "Trading Psychology",
    title: "The One Trap That Destroys Accounts",
    body:
      p(`{firstName}, there's a psychological trap that catches even experienced traders: ${bold("outcome attachment")}.`) +
      p(`This is when you become emotionally attached to whether a specific trade wins or loses — to the point where you start making decisions to influence the outcome. Moving stop losses. Closing early. Adding positions. All of it is outcome attachment in action.`) +
      p(`Our signal service removes this trap entirely. The entry is defined. The stop loss is set. The targets are clear. You execute and walk away. The outcome is out of your hands.`) +
      p(`This is why subscribers who follow signals exactly perform dramatically better than those who "adjust" them. Trust the system. The system works.`),
  },
  {
    subject: "How to hold down a full-time job AND trade profitably",
    preheader: "Most of our subscribers aren't full-time traders",
    badge: "Work-Life Trading",
    title: "Trading Around Your Life",
    body:
      p(`{firstName}, 80% of our VIP subscribers have full-time jobs. They're not sitting at charts all day. They receive our signal in the morning, set the trade on their phone in under a minute, and go about their day.`) +
      p(`MT5 handles the rest. Pending orders fill automatically when price reaches your entry. Stop losses and take profits execute without you being present.`) +
      p(`You don't need to babysit trades. You don't need to watch charts. You need ${bold("30 minutes per week")} — to place signals and review your monthly performance.`) +
      p(`That's the whole commitment. A passive income stream that runs while you work, sleep, and live your life.`),
  },
  {
    subject: "The compounding math that should excite you",
    preheader: "What $2,000 becomes in 18 months at 10% monthly",
    badge: "Wealth Building Math",
    title: "Compound Growth in Action",
    body:
      p(`{firstName}, let me show you the math that changed how I think about trading income.`) +
      p(`$2,000 starting capital, 10% monthly return, everything reinvested. No additional deposits.`) +
      p(`Month 1: $2,200. Month 6: $3,543. Month 12: ${highlight("$6,277")}. Month 18: ${highlight("$11,122")}. Month 24: $19,724.`) +
      p(`In two years, a $2,000 account becomes nearly $20,000 — from compounding alone. Add regular top-ups and the numbers accelerate further. The Blueprint maps this exact pathway to $10,000/month income. The math is clear. The system is proven. The only variable is whether you start.`),
  },
  {
    subject: "What 12 months of following signals looks like",
    preheader: "A year's progress for one of our subscribers",
    badge: "Real Progress",
    title: "12 Months on VIP Signals",
    body:
      p(`{firstName}, I want to share a 12-month summary from one of our long-term subscribers.`) +
      p(`She started with $1,000 in January. Followed every signal. Never moved a stop loss. Reinvested all profits. By December her account had grown to ${highlight("$3,138")} — a 213% return in 12 months.`) +
      p(`More importantly: she was also using those profits to fund prop evaluation challenges. By month 10 she had a $25,000 funded account earning an additional $1,625/month on top of her personal signals account.`) +
      p(`This is how the system stacks. You don't pick one service and stop there — each tier feeds the next. The Blueprint walks you through the entire pathway.`),
  },
  {
    subject: "Are you ready to take the next step?",
    preheader: "Here's what happens when you apply",
    badge: "Next Steps",
    title: "What Applying Actually Looks Like",
    body:
      p(`{firstName}, you've learned the system, seen the numbers, heard the stories. The next step is a simple application.`) +
      p(`Here's what happens: you fill out a short form telling us your goals and current situation. We review it and if there's a strong fit, we book a quick 15-minute call to answer your questions. Then we onboard you, connect you to the signal channel, and you're live within 48 hours.`) +
      p(`There's no pressure and no obligation at the application stage. It's a conversation. We genuinely only take on clients we believe the system can help.`) +
      p(`If you're ready to stop wondering and start building — click below.`),
    ctaLabel: "Join VIP Signals — $50/month →",
    ctaUrl: VIP_SIGNALS_URL,
  },
  // ── EMAILS 21–30 (every 3 days) ──────────────────────────────────────────
  {
    subject: "Why most people who want to start never do",
    preheader: "And how to make sure you're not one of them",
    badge: "Hard Truth",
    title: "The Gap Between Wanting and Doing",
    body:
      p(`{firstName}, I've been running Smart Profits Trader for several years. And the pattern I see over and over is this: the majority of people who download the blueprint, learn about the system, and express interest — never take the first step.`) +
      p(`Not because the opportunity isn't real. But because the gap between ${bold("intention")} and ${bold("action")} feels enormous. There's always a reason to wait. Not enough capital yet. Not enough time. Need to learn more first.`) +
      p(`Meanwhile, the people who did start six months ago are now running funded accounts earning thousands per month.`) +
      p(`The best time to start was six months ago. The second best time is today.`),
    ctaLabel: "Subscribe Now — $50/month →",
    ctaUrl: VIP_SIGNALS_URL,
  },
  {
    subject: "What's the worst that can happen?",
    preheader: "An honest look at the downside so you can make a clear decision",
    badge: "Risk Reality Check",
    title: "The Real Risk of Getting Started",
    body:
      p(`{firstName}, let me be completely honest about the downside.`) +
      p(`Trading always carries risk. Signals can lose. If you follow our signals with 1-2% risk per trade and we hit a drawdown period, you could be down 10-15% temporarily. On a $1,000 account, that's $100-$150.`) +
      p(`That's the realistic worst-case in a bad month. In a good month — which most months are — you're up $50-$150 on that same account.`) +
      p(`The question isn't "can I lose?" — of course you can. The question is: is the risk-adjusted opportunity worth it? If a $1,000 account can generate $1,200/year at conservative returns while the downside is capped at a few hundred dollars — that is a compelling opportunity. What's holding you back?`),
  },
  {
    subject: "The 3 types of people who join our signals service",
    preheader: "Which one are you?",
    badge: "Know Your Type",
    title: "Who Succeeds With Our Signals",
    body:
      p(`{firstName}, after years of running this service I've identified three profiles of subscribers who thrive.`) +
      p(`${bold("The Consistent Follower")} — Follows every signal exactly. No second-guessing. No adjustments. Treats it like a business with rules. These subscribers see the best results.`) +
      p(`${bold("The Patient Builder")} — Starts small, reinvests profits, and uses signals as a stepping stone to prop funding. In 12-18 months they're earning more from trading than their job.`) +
      p(`${bold("The Busy Professional")} — Has capital but no time to trade. Uses signals for a completely passive income stream that runs in the background of their career.`) +
      p(`If you see yourself in any of these three, the service is designed for you. If you're looking to get rich in 30 days with zero effort — we're not the right fit.`),
  },
  {
    subject: "We don't take everyone — here's why",
    preheader: "And what it means for your application",
    badge: "Limited Access",
    title: "Why We Have a Selection Process",
    body:
      p(`{firstName}, Smart Profits Trader doesn't accept every applicant.`) +
      p(`This isn't about exclusivity for its own sake. It's about fit. When we onboard a subscriber, we commit time to getting them set up properly, answering questions, and supporting their progress. We can only do that well for a limited number of people at a time.`) +
      p(`We're looking for people who are serious, coachable, and committed to following the system. Not people who will second-guess every signal or disappear after the first losing trade.`) +
      p(`If you're reading this, you've already demonstrated you're serious — you downloaded the blueprint, you've been reading these emails, you understand the system. The application is the next logical step. We'd love to see it.`),
    ctaLabel: "Join VIP Signals — $50/month →",
    ctaUrl: VIP_SIGNALS_URL,
  },
  {
    subject: "A personal message from Solomon",
    preheader: "Why I built this and who it's really for",
    badge: "From the Founder",
    title: "Why I Built Smart Profits Trader",
    body:
      p(`{firstName}, I want to take a moment to share something personal.`) +
      p(`I didn't start with capital or connections. I started where most of you are — trying to figure out how to build income beyond a salary, in a system that doesn't teach you how money actually works. Trading gave me that pathway, but only once I stopped guessing and built a real system.`) +
      p(`Smart Profits Trader exists because I believe everyone deserves access to a structured, algo-powered approach to building wealth through markets — not just people with $100K to invest and access to hedge funds.`) +
      p(`The Smart Money Blueprint you downloaded is that system, democratised. I hope you use it. And I hope you let us help you execute it.`),
    ctaLabel: "Join VIP Signals — $50/month →",
    ctaUrl: VIP_SIGNALS_URL,
  },
  {
    subject: "You've been thinking about this for a while now",
    preheader: "What would change if you started today instead of next month?",
    badge: "Time for Action",
    title: "What Waiting Actually Costs You",
    body:
      p(`{firstName}, you downloaded the blueprint a while ago. You've read about the system, the signals, the numbers.`) +
      p(`I want to ask you something directly: what's actually stopping you?`) +
      p(`Because here's the math of waiting. Every month you delay starting is a month of compounding you lose. If your account would earn 10% monthly, one month of delay on a $1,000 account costs you $100. A year of delay costs you the difference between $1,000 and $3,138.`) +
      p(`If it's a specific question or concern, reply to this email and ask me directly. I read every reply.`),
  },
  {
    subject: "Spots are filling — new batch closes soon",
    preheader: "We onboard in small groups for a reason",
    badge: "Limited Spots",
    title: "We're Closing This Intake Batch",
    body:
      p(`{firstName}, I want to give you a straightforward update.`) +
      p(`We're currently working through a new intake batch for VIP Signals. We onboard in small groups so each new subscriber gets proper attention during setup. Once this batch is full, the next intake won't open for several weeks.`) +
      p(`If you've been on the fence, this is the window to act. I can't hold a spot without an application submitted.`) +
      p(`The application takes 3 minutes. If we're a good fit, we'll get on a short call this week to answer your questions and get you started.`),
    ctaLabel: "Join VIP Signals — $50/month →",
    ctaUrl: VIP_SIGNALS_URL,
  },
  {
    subject: "What our long-term subscribers say",
    preheader: "Real feedback after 6–12 months on the service",
    badge: "Social Proof",
    title: "Hear From Our Subscribers",
    body:
      p(`{firstName}, here's what a few subscribers have shared with me recently.`) +
      p(`${bold(`"This is the first trading service where I actually feel like I know what's happening with my money. Transparent, consistent, and the signals are real." — James, UK`)}.`) +
      p(`${bold(`"I was sceptical at first. 8 months later I have a funded $50K prop account earning $3,250/month alongside my signals account. I wish I had started sooner." — Amara, Nigeria`)}.`) +
      p(`${bold(`"Solomon's team treats you like an investor, not just another subscriber. They actually care about your results." — Priya, Canada`)}.`) +
      p(`This is the community you'd be joining. Apply below.`),
    ctaLabel: "Join VIP Signals Group — $50/month →",
    ctaUrl: VIP_SIGNALS_URL,
  },
  {
    subject: "One last thing before I stop emailing you",
    preheader: "This is my final message — make it count",
    badge: "Final Message",
    title: "Last Email — Make a Decision Today",
    body:
      p(`{firstName}, this is the last email in this sequence.`) +
      p(`Over the past several weeks I've shared everything about how our VIP signals service works — the algo, the risk management, real subscriber results, and the full blueprint for building $10,000+/month in trading income.`) +
      p(`You now have all the information you need to make a decision. There are only two options: apply and find out if this is right for you, or close this chapter and move on.`) +
      p(`If you ever decide you're ready — the application is always open at the link below. I'd love to help you build what the blueprint describes. The door isn't closing permanently. But the discounted onboarding we offer new applicants from this sequence ends today.`),
    ctaLabel: "Join VIP Signals — Subscribe Now →",
    ctaUrl: VIP_SIGNALS_URL,
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// PROP_FIRM — Prop Trading Sequence (iFunds + TenTrade)
// ─────────────────────────────────────────────────────────────────────────────
export const PROP_FIRM_SEQUENCE: DripEmail[] = [
  // ── DAY 1 BURST ──────────────────────────────────────────────────────────
  {
    subject: "Your Smart Money Blueprint is here",
    preheader: "The roadmap from $200 to funded prop trading — starts with this",
    badge: "Smart Money Blueprint",
    title: "Your Blueprint Has Arrived",
    body:
      p(`Hi {firstName},`) +
      p(`Welcome to Smart Profits Trader. Your Smart Money Blueprint is ready — download it using the button below.`) +
      p(`Inside you will find the exact pathway we use to build trading income: ${bold("start with Copy Trading, compound profits, then upgrade to Prop Trading via iFunds or TenTrade.")} No evaluation. No challenge. No waiting for months.`) +
      p(`Over the next 24 hours I am going to break this model down step by step. Pay attention — this is not a theoretical system. This is what we actually do.`),
    ctaLabel: "Download Your Blueprint Now",
    ctaUrl: BLUEPRINT_DOWNLOAD_URL,
  },
  {
    subject: "From $700 to $500,000 in funded capital — here is how",
    preheader: "No challenge, no evaluation, no waiting. Just funded.",
    badge: "Prop Trading",
    title: "The Prop Trading Model Explained",
    body:
      p(`{firstName}, let me explain how our Prop Trading service works.`) +
      p(`Instead of making you pass Phase 1, Phase 2, and a funded stage like traditional prop firms, our Prop Trading providers — ${bold("iFunds")} and ${bold("TenTrade")} — simply require a one-time fee. Seven account sizes are available:`) +
      p(`${highlight("$700")} → ${bold("$10k")} · ${highlight("$1,600")} → ${bold("$25k")} · ${highlight("$3,000")} → ${bold("$50k")} · ${highlight("$5,000")} → ${bold("$85k")} · ${highlight("$8,500")} → ${bold("$150k")} · ${highlight("$15,000")} → ${bold("$250k")} · ${highlight("$30,000")} → ${bold("$500k")}.`) +
      p(`Smart Profits Trader manages the trading. Our Smart Profit Algo runs the account. Profits are split between you and us. The first profits cover your fee — then it is all income.`) +
      p(`Start at the level that fits your capital. Scale from there.`),
    ctaLabel: "Learn More About Prop Trading",
    ctaUrl: PROP_TRADING_URL,
  },
  {
    subject: "The math behind a $10,000 funded account",
    preheader: "Let me show you what consistent monthly returns actually look like",
    badge: "Income Projection",
    title: "What the Numbers Look Like",
    body:
      p(`{firstName}, let me put real numbers to this.`) +
      p(`A $10,000 funded account generating ${bold("8–12% per month")} produces $800–$1,200 in gross profit. After profit split, your monthly income from a single account looks like this:`) +
      p(`${highlight("Month 1:")} Profits cover your account fee. You are at zero cost.`) +
      p(`${highlight("Month 2 onwards:")} Every dollar is income. No cost basis. Pure profit.`) +
      p(`On a $25,000 account at 10% per month, gross profit is $2,500. At 50/50 split — ${highlight("$1,250 to you each month")}, from a $1,600 starting investment. Scale to a $150k account ($8,500 fee) and that monthly share grows to ${highlight("$7,500+")}.`) +
      p(`Now imagine stacking two or three accounts over time. That is when trading becomes a real income stream.`),
  },
  {
    subject: "Why we stopped doing evaluation challenges",
    preheader: "Challenges waste time. Here is what we do instead.",
    badge: "Strategic Decision",
    title: "Why We Chose iFunds Over Evaluations",
    body:
      p(`{firstName}, for a long time the prop firm model meant buying a challenge, passing Phase 1, passing Phase 2, then finally getting funded. Many clients failed. Some passed Phase 1 and failed Phase 2. Some made it to funded and then broke a rule and lost everything.`) +
      p(`The evaluation model puts all the risk and time cost on the trader. You spend money on challenges. You spend months trying to pass. And there is no guarantee.`) +
      p(`${bold("iFunds and TenTrade eliminate all of that.")} Pay once. Get funded immediately. We trade it. You earn.`) +
      p(`No evaluation. No Phase 1. No Phase 2. No performance window. Just a funded account, professionally managed, from day one.`),
  },
  {
    subject: "The journey: from $200 to $25,000 in funded capital",
    preheader: "Step by step — here is the exact pathway",
    badge: "The SPT Journey",
    title: "Copy Trading → Prop Trading — The Full Roadmap",
    body:
      p(`{firstName}, here is the complete Smart Profits Trader income roadmap:`) +
      p(`${bold("Step 1 — Copy Trading.")} Start with as little as $200. Open an XM or Valetax account. We connect it and trade it for you. Profit split: 70% to you, 30% to SPT.`) +
      p(`${bold("Step 2 — Compound.")} Do not withdraw everything. Let the balance grow. Every dollar that stays in the account grows the next month's profit base.`) +
      p(`${bold("Step 3 — Cross $5k.")} Once your account balance exceeds $5,000, the split shifts to 50/50. Both sides are incentivised to keep growing.`) +
      p(`${bold("Step 4 — Upgrade to Prop Trading.")} Use your accumulated copy trading profits to open a funded account through iFunds or TenTrade. $700 gets a $10k account. $1,600 gets a $25k account.`) +
      p(`${bold("Step 5 — Scale.")} We trade both accounts simultaneously. Your income multiplies. That is the full system.`),
    ctaLabel: "Start Your Journey",
    ctaUrl: APPLY_URL,
  },
  {
    subject: "The profit split explained simply",
    preheader: "Exactly how much you keep — at every stage",
    badge: "Profit Structure",
    title: "Your Cut at Every Stage",
    body:
      p(`{firstName}, let me make the profit split as clear as possible.`) +
      p(`${bold("Copy Trading — Below $5,000 balance:")} 70% to you, 30% to SPT.`) +
      p(`${bold("Copy Trading — $5,000 and above:")} 50% to you, 50% to SPT.`) +
      p(`${bold("Prop Trading (iFunds / TenTrade):")} We agree a profit split at onboarding. All profits are tracked and distributed on the provider's payout schedule.`) +
      p(`There are no hidden fees. No monthly management charges. No subscription costs layered on top. The split is the only thing that matters — and you see every number in your dashboard.`) +
      p(`We win when you win. That is how the model is designed.`),
  },
  {
    subject: "Who is Prop Trading best for?",
    preheader: "This is not for everyone — here is who it actually suits",
    badge: "Right Fit",
    title: "Is Prop Trading Right for You?",
    body:
      p(`{firstName}, let me be direct.`) +
      p(`Prop Trading via iFunds or TenTrade is best for people who:`) +
      p(`${bold("1.")} Have already tested Copy Trading and want to scale with more capital.`) +
      p(`${bold("2.")} Want funded exposure without the time and stress of an evaluation.`) +
      p(`${bold("3.")} Can afford the one-time fee ($700 or $1,600) and understand it is not a guaranteed return.`) +
      p(`${bold("4.")} Want a professionally managed funded account — not a DIY trading challenge.`) +
      p(`If you are completely new to trading and have zero capital, start with Copy Trading first. Build confidence. Build your balance. Then upgrade to Prop Trading when you are ready.`) +
      p(`If you already have $700–$1,600 available and want funded trading income, both iFunds and TenTrade are worth a serious look.`),
  },
  {
    subject: "What happens after you pay the Prop Trading fee",
    preheader: "Step by step — from payment to first profit",
    badge: "Onboarding Process",
    title: "The Onboarding Process After You Apply",
    body:
      p(`{firstName}, here is exactly what happens once you decide to move forward with a Prop Trading account through iFunds or TenTrade:`) +
      p(`${bold("Step 1:")} You complete the Smart Profits Trader application. We review your details and confirm your preferred provider (iFunds or TenTrade) and account size.`) +
      p(`${bold("Step 2:")} We guide you through the payment process. You pay the fee directly to your chosen provider — $700 for a $10k account, $1,600 for a $25k account.`) +
      p(`${bold("Step 3:")} The provider activates your funded account. We receive access and connect it to our trading system.`) +
      p(`${bold("Step 4:")} The Smart Profit Algo starts trading the account. You track performance in the dashboard.`) +
      p(`${bold("Step 5:")} First profits arrive. They cover your fee. After that, every payout is income.`) +
      p(`The whole process from application to live trading typically takes a few business days.`),
  },
  {
    subject: "The Gold market — why we only trade XAUUSD",
    preheader: "There is a reason we focus on one market only",
    badge: "Market Focus",
    title: "Why Gold Is the Only Market We Trade",
    body:
      p(`{firstName}, one thing that surprises people about Smart Profits Trader is that we only trade one market: ${bold("XAUUSD — Gold.")}`) +
      p(`Here is why.`) +
      p(`Gold is the most liquid commodity in the world. It trades 24 hours a day, 5 days a week. It has predictable patterns driven by institutional order flow, macroeconomic sentiment, and safe-haven demand.`) +
      p(`By specialising in ${highlight("one market instead of trading everything")}, our algo develops deep pattern recognition that generalised systems never achieve. Our entries are more precise. Our risk management is more specific. Our results are more consistent.`) +
      p(`Every account we manage — whether through Copy Trading or Prop Trading via iFunds and TenTrade — trades only Gold. This is not a limitation. It is a competitive edge.`),
  },
  {
    subject: "Last email of the day — one question for you",
    preheader: "Where are you starting from?",
    badge: "Quick Check-In",
    title: "Which Stage Are You At?",
    body:
      p(`{firstName}, I have sent you a lot today. Let me ask one simple question.`) +
      p(`${bold("Where are you right now?")}`) +
      p(`${highlight("A)")} I am brand new — I have some capital and want to start with Copy Trading.`) +
      p(`${highlight("B)")} I have $700–$1,600 and I am ready to explore Prop Trading via iFunds or TenTrade.`) +
      p(`${highlight("C)")} I already trade and I want to understand how Copy Trading fits my setup.`) +
      p(`Whichever you are, the next step is the same: complete the application form. It takes 3 minutes and tells us everything we need to match you to the right path.`) +
      p(`There is no pressure. No payment required at this stage. Just a conversation.`),
    ctaLabel: "Apply Now — 3 Minutes",
    ctaUrl: APPLY_URL,
  },
  // ── EMAILS 11–20 (every 48 hours) ─────────────────────────────────────────
  {
    subject: "The compounding effect — why patience pays",
    preheader: "What happens when you stop withdrawing everything",
    badge: "Compounding",
    title: "The Power of Letting Profits Stay",
    body:
      p(`{firstName}, most traders make one critical mistake: they withdraw every profit immediately.`) +
      p(`Compounding is the most powerful force in trading. A $1,000 account growing at 10% per month does not generate $100 every month forever. It generates ${highlight("$100 in month 1, $110 in month 2, $121 in month 3")} — because each month's profit base is larger.`) +
      p(`If you leave profits in the account for 6 months instead of withdrawing:`) +
      p(`Month 1: $1,000 → $1,100. Month 3: $1,331. Month 6: ${highlight("$1,772.")}`) +
      p(`That is 77% growth from nothing but patience. And when you cross $5,000, you have enough to open a Prop Trading account via iFunds or TenTrade and run both engines simultaneously.`) +
      p(`Withdraw profits strategically. Compound aggressively. Then scale.`),
  },
  {
    subject: "A common question — can I trust iFunds and TenTrade?",
    preheader: "Here is what you need to know before paying a fee",
    badge: "Due Diligence",
    title: "What You Should Know About iFunds and TenTrade",
    body:
      p(`{firstName}, a fair question: ${bold("Are iFunds and TenTrade legitimate and trustworthy?")}`) +
      p(`Both iFunds and TenTrade are instant funded account providers operating in the prop trading space. Like all prop firms, they have specific account rules, payout terms, and operating conditions that you need to understand before joining.`) +
      p(`What makes the Smart Profits Trader partnership work is that ${highlight("we manage the account for you.")} You are not expected to know all the rules yourself. We operate within each provider's framework and ensure the account is traded correctly.`) +
      p(`Before paying any fee, we always review your situation during onboarding and recommend the provider that best fits your goal and capital. We do not push anyone toward a fee they are not ready for.`) +
      p(`If you have questions about iFunds or TenTrade before applying, speak with us directly via WhatsApp.`),
    ctaLabel: "Apply Now",
    ctaUrl: APPLY_URL,
  },
  {
    subject: "Copy Trading for 3 months — then what?",
    preheader: "The natural upgrade point most clients hit",
    badge: "Growth Path",
    title: "When Copy Trading Graduates to Prop Trading",
    body:
      p(`{firstName}, I have had many clients start with Copy Trading and after 3–6 months of compounding, they are sitting on $800 to $2,000 in accumulated profits.`) +
      p(`At that point, they have two options:`) +
      p(`${bold("Option A:")} Keep compounding in Copy Trading. Growth continues steadily.`) +
      p(`${bold("Option B:")} Use profits to open a Prop Trading account via iFunds or TenTrade. Add a second income engine on top of the Copy Trading account.`) +
      p(`Most clients who reach that stage choose Option B. Because instead of one account growing slowly, they now have ${highlight("a $10k funded account generating $800–$1,200 a month")} on top of their Copy Trading income.`) +
      p(`That is the moment trading stops being supplemental income and starts being a serious monthly revenue stream.`),
    ctaLabel: "Explore Prop Trading",
    ctaUrl: PROP_TRADING_URL,
  },
  {
    subject: "Risk disclaimer — the part I must always say",
    preheader: "Honesty matters. Here is what you need to know about risk.",
    badge: "Risk Transparency",
    title: "What Can Go Wrong — And How We Manage It",
    body:
      p(`{firstName}, I want to be honest with you about risk.`) +
      p(`Trading involves the possibility of losing money. Neither Copy Trading nor iFunds accounts are guaranteed to generate profit every month. Markets can be unpredictable. Drawdown happens.`) +
      p(`${bold("What we do to manage risk:")}`) +
      p(`We use the Smart Profit Algo with defined risk parameters on every trade. Stop losses are set. Position sizes are controlled. We do not over-leverage. We review performance every weekend and optimize based on current market conditions.`) +
      p(`${bold("What this means for you:")}`) +
      p(`Only invest capital you can afford to risk. Do not invest your savings, emergency funds, or borrowed money. Start at a level that does not stress you financially.`) +
      p(`We operate with full transparency. You see the account. You see the trades. You see the numbers.`),
  },
  {
    subject: "Why XM and Valetax — and not any other broker",
    preheader: "We are very specific about which brokers we support. Here is why.",
    badge: "Broker Selection",
    title: "Why We Only Work With XM and Valetax",
    body:
      p(`{firstName}, for Copy Trading accounts, we only work with ${bold("XM")} and ${bold("Valetax.")} This is intentional.`) +
      p(`${bold("XM")} is a globally regulated broker with MT4 and MT5 support, competitive spreads on Gold, and strong execution. It is accessible in most countries we serve.`) +
      p(`${bold("Valetax")} is a preferred broker for clients who need specific account conditions, lower minimum deposits, or regional access where XM is limited.`) +
      p(`We do not work with random brokers because ${highlight("broker quality directly affects trade execution.")} Slippage, spread width, and server latency all impact Copy Trading performance. We have tested both XM and Valetax extensively and trust their execution for XAUUSD.`) +
      p(`If you already have an XM or Valetax account, you may be able to start within days.`),
    ctaLabel: "Apply — Check Your Eligibility",
    ctaUrl: APPLY_URL,
  },
  {
    subject: "What our weekly optimization actually looks like",
    preheader: "Every weekend we review, adjust, and prepare for the week ahead",
    badge: "Weekly Process",
    title: "What Happens Every Weekend at SPT",
    body:
      p(`{firstName}, every weekend our team runs a full optimization review of the Smart Profit Algo before markets open Monday.`) +
      p(`Here is what gets reviewed:`) +
      p(`${bold("Market behavior:")} How did volatility, trend, and liquidity behave last week? What patterns emerged?`) +
      p(`${bold("Strategy performance:")} Which setups worked? Which underperformed? Do we need to adjust parameters?`) +
      p(`${bold("Account status:")} How are our managed accounts performing? Are there any drawdown risks going into the new week?`) +
      p(`${bold("Upcoming events:")} Are there major economic announcements (NFP, CPI, FOMC) that require cautious positioning?`) +
      p(`This weekly review is why our system does not become stale. Markets change constantly. A system that does not adapt eventually stops working. Ours adapts every single week.`),
  },
  {
    subject: "Three accounts, three income streams — is this realistic?",
    preheader: "Let me show you what scaling actually looks like",
    badge: "Scaling Vision",
    title: "Building Multiple Income Streams From Trading",
    body:
      p(`{firstName}, most people think trading income comes from one account. The traders who build real income think differently.`) +
      p(`Here is what scaling looks like in the Smart Profits Trader ecosystem:`) +
      p(`${bold("Account 1:")} Copy Trading account on XM. Starting at $500. 70/30 split. Compounding monthly.`) +
      p(`${bold("Account 2:")} Prop Trading $10k account via iFunds ($700 fee). Managed by SPT. First profits cover fee.`) +
      p(`${bold("Account 3:")} Prop Trading $25k account via TenTrade ($1,600 fee) funded after Account 1 profits accumulate. Second funded income engine.`) +
      p(`Three accounts. Three income streams. All managed by the same system. All trading Gold.`) +
      p(`Is this realistic? Yes — but it takes time and consistent compounding. ${highlight("We are building something that lasts, not a get-rich-quick scheme.")} That is the difference.`),
  },
  {
    subject: "What makes Smart Profits Trader different from other services",
    preheader: "There are dozens of copy trading services. Here is what sets us apart.",
    badge: "SPT Difference",
    title: "Why Clients Choose Smart Profits Trader",
    body:
      p(`{firstName}, the managed trading space is crowded. Signal services, copy trading platforms, prop firm challenge coaches — there are hundreds. So why Smart Profits Trader?`) +
      p(`${bold("1. We manage everything.")} You do not need to analyse charts, place trades, or monitor screens. We handle execution completely.`) +
      p(`${bold("2. We use a real algo.")} The Smart Profit Algo is not gut-feel trading. It is tested, optimized weekly, and rule-based. Emotion is removed from the equation.`) +
      p(`${bold("3. Two clear pathways.")} Copy Trading for steady income. Prop Trading via iFunds or TenTrade for funded scale. Simple, structured, and designed to grow.`) +
      p(`${bold("4. Transparent profit split.")} You know exactly what you keep. No hidden fees. No surprises.`) +
      p(`${bold("5. We communicate.")} WhatsApp updates, dashboard visibility, and regular performance reviews keep you informed.`),
  },
  {
    subject: "Your questions answered — the most common ones we get",
    preheader: "Clear answers to what people always ask before starting",
    badge: "FAQ",
    title: "The Questions We Get Asked Most",
    body:
      p(`{firstName}, here are the questions I get most often — and the real answers:`) +
      p(`${bold("Q: Do I need trading experience?")} No. We handle all the trading. You invest, we execute, you share profits.`) +
      p(`${bold("Q: What is the minimum to start Copy Trading?")} We recommend starting with at least $200. More capital means more monthly profit in absolute terms.`) +
      p(`${bold("Q: Is the $700 fee refundable?")} No — it is a one-time funded account fee paid to iFunds or TenTrade. The first profits from the account recover the cost.`) +
      p(`${bold("Q: How do I receive my profits?")} Copy Trading profits are transferred from your broker account. Prop Trading profits are paid on the provider's (iFunds or TenTrade) payout schedule.`) +
      p(`${bold("Q: What if the account goes into drawdown?")} We manage drawdown proactively using stop losses and position sizing. Drawdown is monitored weekly.`),
    ctaLabel: "Apply — Get Started",
    ctaUrl: APPLY_URL,
  },
  {
    subject: "Honestly — what does month 6 look like?",
    preheader: "A realistic picture of where clients are after 6 months",
    badge: "6-Month Outlook",
    title: "What 6 Months of Compounding Looks Like",
    body:
      p(`{firstName}, I want to paint a realistic picture of where clients who stay consistent end up after 6 months.`) +
      p(`${bold("Starting capital: $500 Copy Trading account.")}`) +
      p(`Month 1: 10% return. Balance: $550. Your 70% share: $35 (kept in account).`) +
      p(`Month 3: Balance has grown to ~$665. Monthly profit increasing.`) +
      p(`Month 6: Balance approaches $800–$900. Total compounded growth without withdrawing: ${highlight("60–80%.")}.`) +
      p(`At month 6 you have two choices: start withdrawing monthly income, or put $700 of accumulated profit into a Prop Trading account via iFunds or TenTrade and add a second income engine.`) +
      p(`Most clients who get to month 6 choose to stay and scale. Because by that point, the system has proven itself and the income is real.`),
  },
  // ── EMAILS 21–30 (every 72 hours) ─────────────────────────────────────────
  {
    subject: "The VIP Signals option — for active traders",
    preheader: "If you want to be more hands-on, this is the path",
    badge: "VIP Signals",
    title: "Not Everyone Wants Full Automation — That Is Fine",
    body:
      p(`{firstName}, Copy Trading and Prop Trading are fully managed — we handle everything.`) +
      p(`But some people prefer to be more involved. They want to see the signals, understand the setup, and place trades themselves on their own account.`) +
      p(`For those people, we have ${bold("VIP Signals")}.`) +
      p(`$50 per month. Daily trade alerts on XAUUSD with entry, stop loss, and take profit — delivered to your Telegram. You execute on your broker account at your own pace.`) +
      p(`VIP Signals is not managed trading. It is guided trading. You stay in control. You see every setup. You learn as you earn.`) +
      p(`Some clients use both: VIP Signals on one account, Copy Trading on another. If you can afford to run both, the compounded learning and income is powerful.`),
    ctaLabel: "Join VIP Signals — $50/month",
    ctaUrl: VIP_SIGNALS_URL,
  },
  {
    subject: "What happens if I need to withdraw before 6 months?",
    preheader: "Life happens. Here is how withdrawals work.",
    badge: "Withdrawals",
    title: "How Withdrawals Work in Copy Trading",
    body:
      p(`{firstName}, a practical question: what if you need to withdraw money from your Copy Trading account before the 6-month mark?`) +
      p(`The answer is: you can withdraw whenever you need to. The account is yours. The broker (XM or Valetax) processes withdrawals on their standard timelines.`) +
      p(`The only thing to know is that ${bold("withdrawals reduce your compounding base.")} If you withdraw profits every month, your account grows slower. If you leave profits in, it grows faster.`) +
      p(`We always recommend: ${highlight("withdraw what you need, compound what you can.")} Life requires income. Trading also requires patience. Finding that balance is part of building a sustainable trading income.`) +
      p(`We will help you find the right withdrawal strategy during onboarding based on your financial situation.`),
  },
  {
    subject: "A message from Solomon — why I built this",
    preheader: "The personal story behind Smart Profits Trader",
    badge: "Founder Message",
    title: "Why I Created Smart Profits Trader",
    body:
      p(`{firstName}, I want to share something personal.`) +
      p(`I built Smart Profits Trader because I saw too many people trying to figure out trading on their own and failing. Not because trading is impossible — but because ${bold("trading without structure, systems, and accountability is almost impossible to sustain.")}`) +
      p(`Most people who try to trade retail end up losing. Not because they lack intelligence. Because they trade emotionally, without proper risk management, without an edge that has been tested and optimized.`) +
      p(`I wanted to create something different. A system where everyday people could access algo-powered trading outcomes without needing to become professional traders themselves.`) +
      p(`Copy Trading and Prop Trading via iFunds and TenTrade are the answer to that. You bring the capital. We bring the system. We share the results.`) +
      p(`That is what Smart Profits Trader is. That is why I built it. And that is why I want to help you get started.`),
    ctaLabel: "Apply Now",
    ctaUrl: APPLY_URL,
  },
  {
    subject: "The safest way to start — if you are not sure yet",
    preheader: "You do not have to go all-in. Start small and see.",
    badge: "Low-Risk Entry",
    title: "The Safest Way to Test Copy Trading",
    body:
      p(`{firstName}, if you are not sure yet — that is completely normal.`) +
      p(`Here is the safest way to start: ${bold("begin with a small Copy Trading account.")}`) +
      p(`$200–$300 is enough to start. You are not making huge returns at that level, but you are ${highlight("seeing the system work in real time.")} You see trades being placed. You see profits accumulating. You watch drawdown get managed.`) +
      p(`After 2–3 months of watching a small account perform, most clients are confident enough to add more capital or start Prop Trading via iFunds or TenTrade.`) +
      p(`Starting small is not a weakness. It is ${bold("smart risk management.")} We would rather you start with $200 and grow into confidence than put in $5,000 before you are ready.`) +
      p(`Apply now. Tell us your starting capital. We will guide you from there.`),
    ctaLabel: "Apply — Start Small, Scale Smart",
    ctaUrl: APPLY_URL,
  },
  {
    subject: "What our clients say — real stories from inside SPT",
    preheader: "Results are not guaranteed, but here is what is actually happening",
    badge: "Client Stories",
    title: "Inside the SPT Ecosystem",
    body:
      p(`{firstName}, I will not fabricate testimonials. What I can tell you is what actually happens inside the Smart Profits Trader ecosystem.`) +
      p(`Clients who start Copy Trading and compound consistently for 3–6 months see meaningful balance growth. They start withdrawing monthly income. Some reinvest into iFunds accounts.`) +
      p(`Clients who take the Prop Trading route via iFunds or TenTrade see their $700–$1,600 fee recovered within the first 1–2 months of trading, then shift into pure profit mode.`) +
      p(`Not every month is profitable. Not every trade wins. But the system is structured, the risk is managed, and the communication is consistent.`) +
      p(`${bold("What you can expect:")} Structured trading. Weekly updates. Transparent numbers. An honest partnership.`) +
      p(`${bold("What you should not expect:")} Guaranteed profits. Risk-free returns. Overnight wealth.`),
  },
  {
    subject: "How to talk to us before deciding",
    preheader: "No pressure, no pitch. Just a real conversation.",
    badge: "Talk to Us",
    title: "Have Questions? We Would Rather You Ask",
    body:
      p(`{firstName}, I know this is a financial decision. And financial decisions deserve proper consideration.`) +
      p(`If you have questions you want answered before applying, speak with us directly. We are available on WhatsApp — the link is below.`) +
      p(`We will tell you honestly:`) +
      p(`✓ Whether Copy Trading, iFunds, or TenTrade is the right fit for your capital and goals.`) +
      p(`✓ What realistic returns look like at your capital level.`) +
      p(`✓ What the risks are and how we manage them.`) +
      p(`✓ What the onboarding process looks like step by step.`) +
      p(`There is no pressure to join immediately. We would rather you join when you are ready and informed than rush in and regret it. Ask us anything.`),
    ctaLabel: "Chat With Us on WhatsApp",
    ctaUrl: "https://wa.me/2349164753603",
  },
  {
    subject: "One thing that separates our investors from everyone else",
    preheader: "It is not capital. It is not experience. It is this.",
    badge: "Investor Mindset",
    title: "The One Thing That Determines Success",
    body:
      p(`{firstName}, after working with many Copy Trading and Prop Trading clients, I have noticed one thing that separates the ones who build real income from the ones who give up.`) +
      p(`It is not the amount of capital they started with. It is not their trading experience. It is not even which account they chose.`) +
      p(`${bold("It is patience and consistency.")}`) +
      p(`The clients who succeed compound consistently. They do not panic during drawdown. They do not withdraw every cent of profit the moment it appears. They treat their trading account like a ${highlight("business asset that needs time to grow.")}.`) +
      p(`The ones who fail expect fast returns, withdraw impulsively during good months, or give up after a single difficult week.`) +
      p(`If you approach this as a long-term income-building tool — not a slot machine — the results compound into something real.`),
  },
  {
    subject: "We are almost at the end of this email series — but the work is just beginning",
    preheader: "The decision point is here. What are you going to do?",
    badge: "Decision Point",
    title: "The Next Step Is Yours",
    body:
      p(`{firstName}, we are near the end of this email sequence.`) +
      p(`Over the past weeks, I have walked you through the entire Smart Profits Trader system:`) +
      p(`✓ How Copy Trading works and why it is the best starting point.`) +
      p(`✓ How Prop Trading via iFunds and TenTrade eliminates evaluations and gives instant funded access.`) +
      p(`✓ The profit split structure. The income projections. The journey from $200 to multiple income streams.`) +
      p(`✓ The risks. The process. The mindset required.`) +
      p(`You now have everything you need to make an informed decision. The only thing left is to take action.`) +
      p(`${bold("Apply now.")} It takes 3 minutes. Our team will review your situation and guide you to the right starting point.`),
    ctaLabel: "Apply Now",
    ctaUrl: APPLY_URL,
  },
  {
    subject: "The final email — and a genuine invitation",
    preheader: "This is the last email. Let me leave you with something honest.",
    badge: "Final Email",
    title: "A Genuine Invitation to Start",
    body:
      p(`{firstName}, this is my final email to you.`) +
      p(`I have one ask: do not let this sit as unread emails that were interesting but never acted on.`) +
      p(`If you believe structured, algo-powered managed trading is the right tool for your financial goals — take the next step. Apply. Have a conversation with our team. Ask your questions.`) +
      p(`If the timing is not right, that is fine too. But save this email. Come back when you are ready.`) +
      p(`Smart Profits Trader is not going anywhere. Copy Trading and Prop Trading via iFunds and TenTrade are designed to grow steadily — for years. Whenever you decide to start, we will be here.`) +
      p(`Thank you for reading every email. It means more than you know.`) +
      p(`− Solomon David, Founder of Smart Profits Trader`),
    ctaLabel: "Start My Application",
    ctaUrl: APPLY_URL,
  },
];


// ─────────────────────────────────────────────────────────────────────────────
// COPY_TRADING — Copy Trading & Personal Account Management Sequence
// ─────────────────────────────────────────────────────────────────────────────
export const COPY_TRADING_SEQUENCE: DripEmail[] = [
  {
    subject: "Your Smart Money Blueprint is here",
    preheader: "The fully passive trading income roadmap starts here",
    badge: "Smart Money Blueprint",
    title: "Your Blueprint Has Arrived",
    body:
      p(`Hi {firstName},`) +
      p(`Welcome. Your Smart Money Blueprint is ready to download. It maps out the entire system we use to generate passive trading income for clients — starting from $200 with zero trading experience required.`) +
      p(`The two services you're most interested in are covered in Tier 0 (Copy Trading) and Tier 3 (Personal Account Management). Both are fully managed by our team — you provide the capital, we do the trading.`) +
      p(`Download the Blueprint and read through it tonight. Everything else I share will build on it.`),
    ctaLabel: "Download Your Blueprint",
    ctaUrl: BLUEPRINT_DOWNLOAD_URL,
  },
  {
    subject: "What 'copy trading' actually means — and what it doesn't",
    preheader: "Common misconceptions cleared up in 2 minutes",
    badge: "Copy Trading Explained",
    title: "Copy Trading: What It Really Is",
    body:
      p(`{firstName}, copy trading is one of the most misunderstood concepts in trading. Let me clear it up.`) +
      p(`True copy trading — the way we do it — connects your broker account directly to our master trading account. Every trade our Smart Profit EA places on the master is automatically replicated on your account, proportional to your balance. You don't touch anything.`) +
      p(`This is different from "signal copying" tools that require you to manually enter trades, or mirror trading services where there's a delay. Our system is ${bold("fully automatic, real-time, and runs 24/5")}.`) +
      p(`You fund your account, connect it to our master, and the system runs. That's it.`),
  },
  {
    subject: "The 70:30 split — how our profit sharing works",
    preheader: "And why there's no fee when there's no profit",
    badge: "Profit Structure",
    title: "How We Structure Our Earnings",
    body:
      p(`{firstName}, our Copy Trading model has one simple structure: ${highlight("70% to you, 30% to Smart Profits Trader")}. No monthly subscription fee. No setup cost. Profit is only shared when there IS profit.`) +
      p(`If a month produces no gain — you pay nothing. Our incentives are completely aligned with yours. We only earn when you earn.`) +
      p(`On a $1,000 account at 10% monthly: $100 gross profit. You receive $70. On a $5,000 account: $500 gross, ${bold("$350 to you")}. On a $10,000 account: $1,000 gross, ${highlight("$700 to you")} — every month, passively.`) +
      p(`The more you deposit, the more meaningful the absolute monthly income becomes.`),
  },
  {
    subject: "Which brokers do we use — and why?",
    preheader: "XM and Valetax: why we chose these two specifically",
    badge: "Broker Guide",
    title: "The Brokers Behind Our System",
    body:
      p(`{firstName}, broker selection matters enormously for copy trading. A bad broker — poor execution, wide spreads, slow fills — can turn a profitable strategy into a losing one.`) +
      p(`We use two brokers: ${bold("XM Group")} (globally regulated, MT5, tight spreads, excellent copy trading infrastructure) and ${bold("Valetax")} (algo-friendly, low minimum deposit, fast execution designed for EA trading).`) +
      p(`Both are vetted, regulated, and have been tested extensively with our EA. When you set up copy trading with us, we guide you through opening the right account with the right broker and configuring the copy trading link. The whole setup takes under 30 minutes.`),
  },
  {
    subject: "Copy trading income projections — what to realistically expect",
    preheader: "5–15% monthly target. Here's what that looks like at different account sizes.",
    badge: "Income Projections",
    title: "What You Can Realistically Earn",
    body:
      p(`{firstName}, our copy trading monthly performance target is ${bold("5–15%")}. Here's what that translates to in real money:`) +
      p(`$200 at 10%: ${bold("$14/month to you")} — modest, but a starting point. $500 at 10%: $35/month. $1,000 at 10%: ${bold("$70/month")}. $2,000 at 15%: $210/month.`) +
      p(`$5,000 at 10%: ${highlight("$350/month")}. $10,000 at 10%: ${highlight("$700/month")}. $20,000 at 12%: $1,680/month.`) +
      p(`The power comes from reinvesting profits and growing your account over time. $2,000 compounding at 10% monthly reaches $6,277 in 12 months — without adding capital. That's when the numbers get serious.`),
  },
  {
    subject: "Personal Account Management — your money, our trading",
    preheader: "Full transparency. Full control. You watch every trade live.",
    badge: "Personal Account",
    title: "The Most Transparent Option: Personal Account Management",
    body:
      p(`{firstName}, if you want maximum transparency and control, Personal Account Management is the right choice.`) +
      p(`Here's how it works: you open an MT5 account with XM or Valetax and fund it yourself. You share your MT5 ${bold("investor password")} with us (read-only — we can place trades but cannot make withdrawals). Our EA manages your account remotely.`) +
      p(`You watch ${bold("every single trade live")} from the MT5 app on your phone. Balance, equity, open trades, complete history — all visible to you in real time. Nothing happens without you seeing it.`) +
      p(`Your capital never leaves your account. You retain full withdrawal access at all times. We have zero access to your funds.`),
  },
  {
    subject: "The two tiers of Personal Account Management",
    preheader: "Different splits for different capital levels",
    badge: "PA Tiers",
    title: "Tier 3A vs Tier 3B — Which Is Yours?",
    body:
      p(`{firstName}, Personal Account Management has two tiers based on capital size.`) +
      p(`${bold("Tier 3A (below $5,000):")} ${highlight("70% to you, 30% to Smart Profits Trader")}. Minimum $200. Higher investor share to support growth at smaller capital sizes. Monthly target: 15-30%.`) +
      p(`${bold("Tier 3B ($5,000 and above):")} ${highlight("50% to you, 50% to Smart Profits Trader")}. Equal split. At this level, 50% of $5,000 growing at 20% monthly is $500/month to you — and the absolute numbers grow significantly as capital increases.`) +
      p(`As your account grows past $5,000 through reinvested profits, the split automatically upgrades. Your account becomes more efficient the larger it grows.`),
  },
  {
    subject: "PA Management income projections — the full picture",
    preheader: "What $1,000, $5,000, and $25,000 accounts earn monthly",
    badge: "PA Income",
    title: "Personal Account Monthly Income Guide",
    body:
      p(`{firstName}, here are Personal Account Management income projections at our 15-30% monthly target:`) +
      p(`$500 at 20%: ${bold("$70/month to you")} (70:30 split). $1,000 at 20%: $140/month. $3,000 at 20%: $420/month.`) +
      p(`$5,000 at 20%: ${highlight("$500/month")} (50:50 split). $10,000 at 20%: $1,000/month. $25,000 at 20%: $2,500/month.`) +
      p(`$50,000 at 20%: ${highlight("$5,000/month")}. $100,000 at 20%: $10,000/month.`) +
      p(`These figures assume consistent 20% monthly performance. Some months will be higher, some lower. The annual projection at 20% average is significant at every capital level.`),
  },
  {
    subject: "Copy Trading vs Personal Account — which is right for you?",
    preheader: "A simple way to decide",
    badge: "Decision Guide",
    title: "Choosing Between Copy Trading and PA Management",
    body:
      p(`{firstName}, both services give you fully managed trading. Here's how to choose.`) +
      p(`${bold("Choose Copy Trading if:")} You want complete simplicity. You connect your broker account to our master and walk away. Minimum $200. Returns target 5–15% monthly. Perfect for beginners and those who want zero involvement.`) +
      p(`${bold("Choose Personal Account Management if:")} You want to see every trade live. Your capital stays in your account at all times. Higher return targets (15–30% monthly). You want to retain full withdrawal access and visibility. Better suited for those with $500+ who value transparency.`) +
      p(`Many clients start with Copy Trading and transition to Personal Account Management as their confidence and capital grow. Both can run simultaneously.`),
  },
  {
    subject: "How to set up your copy trading account this week",
    preheader: "The exact steps from zero to live trading",
    badge: "Setup Guide",
    title: "From Zero to Live Copy Trading in 48 Hours",
    body:
      p(`{firstName}, here's the exact setup process for our Copy Trading service.`) +
      p(`Step 1: Submit your application. Step 2: We schedule a quick 15-minute onboarding call. Step 3: You open an MT5 account with XM or Valetax (takes 10 minutes — we guide you through it). Step 4: You deposit your starting capital (minimum $200). Step 5: We configure the copy trading link. Step 6: Live.`) +
      p(`From application to live copy trading: ${highlight("typically 24–48 hours")}. We handle all the technical setup. You just need to open the broker account and fund it.`) +
      p(`That's the full process. Simpler than most people expect.`),
    ctaLabel: "Apply for Copy Trading",
    ctaUrl: APPLY_URL,
  },
  {
    subject: "Is fully managed trading actually safe?",
    preheader: "The honest answer to the most important question",
    badge: "Safety First",
    title: "Is Giving Someone Access to Trade Your Account Safe?",
    body:
      p(`{firstName}, this is the most important question anyone asks before getting started — and it deserves a direct answer.`) +
      p(`For Personal Account Management: you share only the ${bold("investor (read-only) password")}. We cannot withdraw funds, change your password, or access your account settings. We can only open and close trades. You can verify this in MT5 documentation. Your funds are completely protected.`) +
      p(`For Copy Trading: your account connects to our master via your broker's copy trading platform. You maintain full control of your account. You can disconnect at any time. No personal credentials are shared.`) +
      p(`The risk in managed trading is market risk — the possibility of trading losses. This is the same risk as any investment. It's not a custodial risk.`),
  },
  {
    subject: "The compounding growth play that builds real wealth",
    preheader: "Why reinvesting profits is the most powerful thing you can do",
    badge: "Wealth Building",
    title: "The Power of Compounding Your Trading Returns",
    body:
      p(`{firstName}, let me show you what patient, compounding copy trading looks like over 24 months.`) +
      p(`Start with $2,000. Reinvest all monthly profits. Target: 10% monthly. No additional deposits.`) +
      p(`Month 6: $3,543. Month 12: ${highlight("$6,277")}. Month 18: $11,122. Month 24: ${highlight("$19,724")}. Month 36: $61,938.`) +
      p(`That's $2,000 becoming nearly $20,000 in 2 years — and nearly $62,000 in 3 years — without adding a single dollar. Compounding is the most powerful force in wealth building. The system does the work. You just leave it running.`),
  },
  {
    subject: "What happens to your account during a losing month?",
    preheader: "Transparency about drawdowns and how we manage them",
    badge: "Drawdown Reality",
    title: "What a Losing Month Actually Looks Like",
    body:
      p(`{firstName}, let's talk about losing months — because they happen, and you should know what to expect.`) +
      p(`Our risk management means we never risk more than 1-2% of your account on a single trade. A losing month typically looks like a drawdown of 5-10% on your account — not a wipeout.`) +
      p(`On a $2,000 copy trading account, a 7% losing month costs you $140. That's the realistic downside in a bad month. The same account earning 10% in a good month adds $140. Bad months and good months balance out — and the good months have historically outnumbered the bad.`) +
      p(`Managed trading is not risk-free. But with proper risk management built into every trade, the risk is controlled and the losses are recoverable.`),
  },
  {
    subject: "The reinvestment plan that accelerates everything",
    preheader: "How to use your monthly profits to build multiple income streams",
    badge: "Reinvestment Strategy",
    title: "How to Use Copy Trading Profits Strategically",
    body:
      p(`{firstName}, here's what the Blueprint recommends for allocating monthly trading profits:`) +
      p(`${bold("40%")} reinvested back into your copy trading or personal account — grows your base and compounds returns. ${bold("40%")} saved toward the next tier — once you've accumulated $50–$120, you can enter a prop evaluation account.`) +
      p(`${bold("20%")} into savings or emergency fund — protect yourself and never trade with money you can't afford to lose.`) +
      p(`This is how copy trading becomes the foundation of a multi-tier trading income. You don't just copy trade forever — you use the income to stack the next layer. Copy trading → prop accounts → instant funded → personal account at scale.`),
  },
  {
    subject: "Why our EA performs better than most human traders",
    preheader: "The advantages algo trading has over discretionary trading",
    badge: "Algo Edge",
    title: "Human vs. Algo: Why the Machine Wins",
    body:
      p(`{firstName}, why does our Smart Profit EA consistently outperform most discretionary traders? Five reasons.`) +
      p(`${bold("No emotion")} — no fear, greed, or revenge trading. ${bold("No fatigue")} — trades at 3am the same way it trades at 3pm. ${bold("No bias")} — doesn't hold opinions about the market direction. ${bold("Perfect execution")} — enters at the exact price defined, every time. ${bold("Consistency")} — follows its rules on the 1,000th trade exactly as it did on the first.`) +
      p(`Human traders fail on all five counts at some point. The algo never does. This is why algo-powered, professionally managed accounts produce more consistent results than most individual traders achieve on their own.`),
  },
  {
    subject: "Can you withdraw your money whenever you want?",
    preheader: "Full answer on liquidity and withdrawal rights",
    badge: "Withdrawal Rights",
    title: "Your Money Is Always Yours",
    body:
      p(`{firstName}, one concern I hear often is: "Can I get my money back when I need it?"`) +
      p(`Yes. For Personal Account Management — your account is yours. You log in to your MT5 platform and request a withdrawal from your broker directly. Smart Profits Trader has no involvement in withdrawals and no access to withdraw funds.`) +
      p(`For Copy Trading — same principle. Your broker account is yours. You can disconnect from the copy trading master at any time and withdraw your funds directly from your broker.`) +
      p(`Broker withdrawal timelines vary (typically 1-3 business days). But your access to your capital is never restricted by us. This is a fundamental principle of how we operate.`),
  },
  {
    subject: "Starting with $200 — is it worth it?",
    preheader: "The honest answer, including the realistic expectations",
    badge: "Small Start Reality",
    title: "What $200 Actually Gets You",
    body:
      p(`{firstName}, at $200 and 10% monthly, you earn $14/month in copy trading. That's not life-changing money.`) +
      p(`But here's why starting at $200 still makes sense: you're ${bold("learning by doing")}. You're building trust in the system. You're establishing the habit of reinvesting profits. You're on the path.`) +
      p(`Most people who start at $200 add more capital once they see the system working. Three months in, after seeing consistent returns, adding another $800 to bring the account to $1,000 feels very different than depositing $1,000 from scratch.`) +
      p(`The $200 start isn't about the $14/month. It's about starting the engine. The compounding begins the day you fund the account.`),
    ctaLabel: "Start with $200 — Apply Now",
    ctaUrl: APPLY_URL,
  },
  {
    subject: "What our long-term copy trading clients say",
    preheader: "6–18 months in — real feedback",
    badge: "Client Stories",
    title: "Hear from Our Copy Trading Clients",
    body:
      p(`{firstName}, here's what a few of our managed account clients have shared.`) +
      p(`${bold('"I\'ve been on the copy trading service for 14 months. Started with $1,500. Account is now at $5,200 with zero additional deposits. I don\'t do anything — the system just runs." — Daniel, London')}.`) +
      p(`${bold('"The transparency of the personal account management is what convinced me. I watch every trade live. After 8 months I moved $10,000 in and now earn $700/month passively." — Fatima, Dubai')}.`) +
      p(`${bold('"I\'m a doctor. I have capital but zero time to trade. SPT manages my account, I get monthly payouts. It\'s exactly what it says on the tin." — Dr. Emmanuel, Lagos')}.`),
  },
  {
    subject: "The opportunity cost of keeping your money in a savings account",
    preheader: "What your bank pays vs what trading returns",
    badge: "Opportunity Cost",
    title: "Your Bank Is Paying You Almost Nothing",
    body:
      p(`{firstName}, the average savings account pays 1-5% annually. Our copy trading targets 5-15% ${bold("monthly")}.`) +
      p(`On $5,000: a savings account returns $50-$250 per year. Our copy trading service targets ${highlight("$350/month")} — $4,200/year — at a conservative 10% monthly.`) +
      p(`Even in our worst case — half of our target — that's still $2,100/year vs $250/year from a savings account.`) +
      p(`Trading carries more risk than a savings account. But the risk-adjusted opportunity is significant — especially with professional management and strict risk controls built into every trade.`),
  },
  {
    subject: "Last email. Your move.",
    preheader: "Everything you need to start is already in your hands",
    badge: "Final Email",
    title: "This Is the Last Email — Make a Decision",
    body:
      p(`{firstName}, this is my final email in this series.`) +
      p(`You know how copy trading works. You know the income projections. You know the profit structure. You know how we protect your capital. You know the compounding math.`) +
      p(`If you're ready to put your capital to work with a professionally managed, algo-powered system — apply below. The application takes 3 minutes and there's no commitment. Just a conversation.`) +
      p(`If you're not ready — hold onto the Blueprint. Come back when the time is right. The door is always open.`),
    ctaLabel: "Apply — Start Earning Passively",
    ctaUrl: APPLY_URL,
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// GENERAL — Not Sure Yet Sequence (introduces all 4 tiers)
// ─────────────────────────────────────────────────────────────────────────────
export const GENERAL_SEQUENCE: DripEmail[] = [
  {
    subject: "Your Smart Money Blueprint is here",
    preheader: "Start here — it maps out 4 different paths to trading income",
    badge: "Smart Money Blueprint",
    title: "Your Blueprint Has Arrived",
    body:
      p(`Hi {firstName},`) +
      p(`Welcome to Smart Profits Trader. Your Smart Money Blueprint is ready — download it now. It's the complete guide to our 4-tier trading income system.`) +
      p(`You told us you're still exploring what's right for you — perfect. The Blueprint was designed for exactly this moment. It explains each option clearly, with the numbers, the risks, and the step-by-step pathway from where you are to where you want to be.`) +
      p(`Read it without pressure. Then I'll help you identify which path fits your situation best.`),
    ctaLabel: "Download Your Blueprint",
    ctaUrl: BLUEPRINT_DOWNLOAD_URL,
  },
  {
    subject: "4 ways to generate trading income — which is yours?",
    preheader: "A clear breakdown of every option on the table",
    badge: "The 4 Paths",
    title: "Your 4 Options for Trading Income",
    body:
      p(`{firstName}, Smart Profits Trader offers four distinct ways to build trading income. Here they are in plain English:`) +
      p(`${bold("1. Copy Trading ($200+)")} — Your broker account mirrors our master automatically. Fully passive. 70% profit to you, 5-15% monthly target.`) +
      p(`${bold("2. Evaluation Account ($50+)")} — We manage a prop firm challenge on your behalf. Access $10K–$200K in funded capital. 65% profit to you, $650–$13,000/month at scale.`) +
      p(`${bold("3. Instant Funded ($400+)")} — Skip the challenge. Trade from Day 1. 25% effective share of $5K–$85K accounts, 10-25% monthly target.`) +
      p(`${bold("4. Personal Account Management ($200+)")} — Your own broker account, fully managed by our EA. 70% (or 50% above $5K) profit to you, 15-30% monthly target.`),
  },
  {
    subject: "The Smart Money Blueprint's 4-tier system — simplified",
    preheader: "How the tiers connect into one compounding wealth machine",
    badge: "System Overview",
    title: "How the 4 Tiers Work Together",
    body:
      p(`{firstName}, the most powerful insight in the Blueprint is this: the four tiers don't just exist independently — they ${bold("feed into each other")}.`) +
      p(`You start with Copy Trading at $200. Use the profits to fund a Prop Evaluation ($50). That evaluation generates $650–$13,000/month from funded capital. Use those profits to buy an Instant Funded account. Stack the income. Add a Personal Account with accumulated capital.`) +
      p(`Within 18-24 months of consistent execution, all four tiers can be running simultaneously. The Blueprint projects ${highlight("$40,000–$110,000/month")} when all tiers are at full scale.`) +
      p(`You don't need to start all four at once. You start wherever makes sense for your current capital and situation.`),
  },
  {
    subject: "Which tier is right for you? A simple quiz.",
    preheader: "3 questions that will point you to the right starting point",
    badge: "Your Starting Point",
    title: "Finding Your Right Starting Path",
    body:
      p(`{firstName}, let's narrow down the right starting point for you with three questions.`) +
      p(`${bold("Q1: How much capital can you deploy right now?")} Under $200 → start saving toward Tier 0 or 1. $200–$499 → Copy Trading or $10K Evaluation. $500–$1,999 → any Tier 0/1/3 option. $2,000+ → all options available, including Instant Funded Bronze.`) +
      p(`${bold("Q2: Do you want passive income or active involvement?")} Passive → Copy Trading or Personal Account. Willing to understand the system → any tier.`) +
      p(`${bold("Q3: Can you wait 30 days for income to begin?")} No → Instant Funded or Copy Trading (starts immediately). Yes → Evaluation accounts (30-day wait for funding).`) +
      p(`Reply to this email with your answers and I'll give you a specific recommendation.`),
  },
  {
    subject: "The minimum to start each service — full breakdown",
    preheader: "No ambiguity. Exact costs for every option.",
    badge: "Cost Clarity",
    title: "Exactly How Much You Need to Start",
    body:
      p(`{firstName}, let me give you the exact minimum investment for every service.`) +
      p(`${bold("Copy Trading:")} $200 minimum broker deposit. Zero setup fee. Zero subscription. Profit shared only when profit is made.`) +
      p(`${bold("Evaluation Account:")} $50 total (two phases × $25 for a $10K challenge). Plus your time — 30 days for the challenge to be passed.`) +
      p(`${bold("Instant Funded:")} $400 minimum (Bronze $5K account). Trading income from Day 1.`) +
      p(`${bold("Personal Account Management:")} $200 minimum broker deposit. Same structure as Copy Trading but with full trade visibility and higher return targets.`) +
      p(`Every option has a clear entry point. The question is which fits your capital and goals right now.`),
  },
  {
    subject: "The risk profile of each service — side by side",
    preheader: "What you stand to lose vs gain at each tier",
    badge: "Risk Comparison",
    title: "Risk vs Reward Across All 4 Tiers",
    body:
      p(`{firstName}, here's an honest risk comparison across all four services.`) +
      p(`${bold("Copy Trading & Personal Account:")} Market risk only. Capital can decline if trading loses. Strong risk management limits drawdowns to 5-15% in bad months. No fixed costs.`) +
      p(`${bold("Evaluation Account:")} Market risk + fixed cost risk. The $50–$400 challenge fee is lost if the evaluation fails. The EA has a strong but not guaranteed pass rate. No capital is at risk beyond the challenge fee.`) +
      p(`${bold("Instant Funded:")} Largest upfront cost ($400–$5,800). Market risk on the funded account — if the account is closed due to rules breach, the account purchase may not be refundable. Highest return potential.`) +
      p(`Understanding the risk profile helps you choose the right starting point for your risk tolerance.`),
  },
  {
    subject: "How we're different from every other trading service",
    preheader: "5 things that set Smart Profits Trader apart",
    badge: "Why SPT",
    title: "What Makes Smart Profits Trader Different",
    body:
      p(`{firstName}, there are hundreds of trading services. Here's what makes ours different.`) +
      p(`${bold("1. Algo-powered, not discretionary")} — our Smart Profit EA removes human emotion from every trade. Consistent execution, every day.`) +
      p(`${bold("2. Performance-aligned fees")} — we earn from your profits. No monthly subscription. No fee when you don't earn.`) +
      p(`${bold("3. Full transparency")} — every trade is visible to you. We don't manage money in the dark.`) +
      p(`${bold("4. The complete system")} — from $200 copy trading to $1M+ in prop capital, we have the full pathway mapped out. You don't grow out of us.`) +
      p(`${bold("5. Real support")} — we onboard in small batches because we actually answer questions and monitor accounts.`),
  },
  {
    subject: "The 7 Golden Rules — the non-negotiables of our system",
    preheader: "These rules exist because breaking them loses money",
    badge: "Golden Rules",
    title: "7 Rules That Protect Your Capital",
    body:
      p(`{firstName}, the Smart Money Blueprint includes 7 Golden Rules. These aren't suggestions — they're the foundation of every profitable account we run.`) +
      p(`Rule 1: Always use the system (no discretionary overrides). Rule 2: Protect the account above all else — a blown account means restarting from zero. Rule 3: Withdraw regularly — unrealised profit is just a number.`) +
      p(`Rule 4: Reinvest strategically — 40% back to trading, 40% to next tier, 20% to savings. Rule 5: Scale only after consistency at the current tier. Rule 6: Diversify across firms. Rule 7: Keep records — track every trade and review monthly.`) +
      p(`The clients who follow these rules build lasting wealth. The ones who don't tend to struggle.`),
  },
  {
    subject: "What's the realistic income target in year one?",
    preheader: "Conservative projections from someone who doesn't like to oversell",
    badge: "Year One Targets",
    title: "Realistic Year One Income Expectations",
    body:
      p(`{firstName}, I want to give you realistic expectations — not the best case, not the worst case.`) +
      p(`${bold("If you start with $500 in Copy Trading:")} Month 1: $35. Month 6: $56 (on a compounded $800 balance). Month 12: $90 (on a $1,295 compounded balance). Year 1 total: ~$640.`) +
      p(`${bold("If you start with a $25K Evaluation ($120 cost):")} From month 2 onward: $1,625/month. Year 1 income: ~$17,875. Cost recovered in month 1.`) +
      p(`${bold("Combination approach:")} Start copy trading at $500 while saving for a $25K evaluation. By month 4, enter the evaluation. By month 6, you're earning $1,625+/month. This is the Blueprint in action.`),
  },
  {
    subject: "Ready to figure out your starting point?",
    preheader: "Let's map out the right path for your specific situation",
    badge: "Your Next Step",
    title: "Let's Find Your Starting Point",
    body:
      p(`{firstName}, you've spent time learning about all four services. The next step is simple: apply and let us have a conversation.`) +
      p(`The application isn't a commitment. It's a 3-minute form that tells us your goals, your current capital, and what you're trying to achieve. We review it and if there's a clear fit, we get on a 15-minute call to map out your specific starting path.`) +
      p(`No pressure. No hard sell. If we think you should start with copy trading at $200 because that fits your situation — that's what we'll recommend. We only succeed when you succeed.`),
    ctaLabel: "Apply — Find Your Starting Point",
    ctaUrl: APPLY_URL,
  },
  {
    subject: "The compounding machine — from $500 to $10,000/month",
    preheader: "Stage by stage, year by year — the blueprint made real",
    badge: "The Full Journey",
    title: "From $500 to $10,000/Month: The Full Roadmap",
    body:
      p(`{firstName}, let me walk you through the complete journey — start to $10K/month.`) +
      p(`${bold("Month 1-3:")} Copy trading at $500. Earn $35-$50/month. Reinvest everything. Save the other 40% toward a prop evaluation.`) +
      p(`${bold("Month 4:")} Enter $25K evaluation ($120 cost). Challenge begins. ${bold("Month 5:")} Challenge passed — $25K funded account live. ${bold("Month 6:")} First payout: $1,625.`) +
      p(`${bold("Month 8-12:")} Use evaluation profits to fund an iFunds $10K account ($700). Add second income stream: $625-$813/month. Total now: ~$2,400/month.`) +
      p(`${bold("Year 2:")} Scale to 3-5 funded prop accounts. Personal account opened at $5,000. Total monthly income approaching ${highlight("$5,000–$10,000")}.`),
  },
  {
    subject: "Trading is not just for finance people — here's proof",
    preheader: "The diverse backgrounds of our clients",
    badge: "Who We Work With",
    title: "Our Clients Come From Every Background",
    body:
      p(`{firstName}, one of the most common misbeliefs I hear is: "I'm not a finance person — this probably isn't for me."`) +
      p(`Our client base includes: a nurse from Birmingham who started with $300 and now earns $1,625/month from a funded prop account. A school teacher from Accra who uses copy trading to supplement her salary. A software engineer in Toronto who wanted passive income beyond his tech salary. A retired civil servant using Personal Account Management to grow his pension capital.`) +
      p(`Trading knowledge is not required. Our system handles the trading. Your role is to provide the capital and follow the Blueprint. Experience in markets is zero percent of what makes a client successful with us.`),
  },
  {
    subject: "What do you need to get started today?",
    preheader: "The complete list — shorter than you probably think",
    badge: "Getting Started",
    title: "Everything You Need to Start",
    body:
      p(`{firstName}, here's the complete list of what you need to get started with any of our services.`) +
      p(`${bold("For Copy Trading or Personal Account Management:")} A smartphone. Internet access. An MT5 broker account (we help you open it). Starting capital ($200 minimum). That's it.`) +
      p(`${bold("For Evaluation Accounts:")} The above, plus $50–$400 for the challenge fee. A willingness to wait 30 days for the account to be funded.`) +
      p(`${bold("For Instant Funded:")} The above, plus $400–$5,800 for the account purchase.`) +
      p(`You don't need trading knowledge. You don't need a computer. You don't need prior investment experience. Just capital and a commitment to following the system.`),
  },
  {
    subject: "The 12 milestones of the Smart Money Blueprint",
    preheader: "Your roadmap from Day 1 to $10,000/month",
    badge: "Milestone Map",
    title: "12 Milestones on the Path to $10K/Month",
    body:
      p(`{firstName}, the Blueprint includes 12 specific milestones. Here they are:`) +
      p(`M1: Activate copy trading with first deposit. M2: Receive first monthly payout. M3: Enter first prop evaluation. M4: Pass first challenge — account funded. M5: First prop account withdrawal.`) +
      p(`M6: Enter iFunds Instant Funded. M7: Open Personal Account at $5,000+. M8: Hold funded accounts at 3+ firms. M9: Total monthly income exceeds $2,000.`) +
      p(`M10: Total income exceeds $5,000/month. M11: Personal account reaches $25,000. M12: ${highlight("Total prop funding $500K+ — monthly income $10,000+")}.`) +
      p(`Which milestone are you targeting first? Reply and let me know.`),
  },
  {
    subject: "The most important decision you'll make about your financial future",
    preheader: "Not about money — about starting",
    badge: "Decision Point",
    title: "The Most Important Thing Isn't Which Tier — It's Starting",
    body:
      p(`{firstName}, after weeks of sharing information about our system, here's the most important thing I can tell you.`) +
      p(`The biggest mistake people make isn't choosing the wrong tier. It isn't starting with too little capital. It's ${bold("not starting at all")}.`) +
      p(`The compounding machine only starts when you make the first deposit. Every month you wait is a month of compounding lost. The people who started 12 months ago — even at $200 — are now 12 months ahead.`) +
      p(`You don't need to figure out everything. You just need to take the first step. The application is that step. We'll help you figure out the rest.`),
    ctaLabel: "Take the First Step",
    ctaUrl: APPLY_URL,
  },
  {
    subject: "What happens when you apply — step by step",
    preheader: "No mystery, no pressure — here's exactly the process",
    badge: "Process Guide",
    title: "What Happens After You Apply",
    body:
      p(`{firstName}, I know some people hesitate on the application because they're not sure what they're committing to. Let me make it completely clear.`) +
      p(`Step 1: You fill in a 3-minute form. It asks about your goals, capital, and which service interests you. No payment required.`) +
      p(`Step 2: Our team reviews your application within 24 hours. Step 3: If there's a fit, we invite you to a 15-minute video call. Step 4: On the call, we answer all your questions, confirm the right service for you, and explain exact next steps. Step 5: You decide. No pressure. No obligation.`) +
      p(`Only after you've confirmed you're happy to proceed do we move to setup. You are in full control throughout.`),
    ctaLabel: "Start the 3-Minute Application",
    ctaUrl: APPLY_URL,
  },
  {
    subject: "A personal word from Solomon",
    preheader: "Why I do this work and who I built it for",
    badge: "From the Founder",
    title: "A Message from Solomon Dee",
    body:
      p(`{firstName}, I want to share something personal.`) +
      p(`I built Smart Profits Trader because I believe access to sophisticated, algo-powered trading should not be reserved for the wealthy. A $200 deposit should unlock the same system as a $200,000 deposit — just at a different scale.`) +
      p(`The Smart Money Blueprint is the document I wish I had when I was starting. Every number in it is real. Every pathway is proven by clients who are living it right now.`) +
      p(`My goal is simple: to help as many people as possible build a trading income that gives them real financial freedom. Not quick money — lasting freedom. If that resonates with you, I'd love to work together.`),
    ctaLabel: "Work With Us",
    ctaUrl: APPLY_URL,
  },
  {
    subject: "The people who don't start — what they say 12 months later",
    preheader: "The most common regret I hear",
    badge: "Common Regret",
    title: "The #1 Thing People Say When They Waited",
    body:
      p(`{firstName}, I speak to a lot of people who come to us having found us a year or two ago and not started.`) +
      p(`Almost universally, they say the same thing: ${bold('"I wish I had started when I first learned about this."')}`) +
      p(`Not because they would have gotten rich. But because the compounding gains they missed — the $200 that would have become $1,300 — were real, and they're gone. Time in the market beats timing the market.`) +
      p(`You've had the Blueprint for a while now. If the only thing stopping you is inertia — apply today. You don't need to have everything figured out. That's what the onboarding call is for.`),
    ctaLabel: "Apply Before Another Month Passes",
    ctaUrl: APPLY_URL,
  },
  {
    subject: "3 questions I need you to answer honestly",
    preheader: "Be honest with yourself about what's really stopping you",
    badge: "Honest Questions",
    title: "Three Questions Worth Asking Yourself",
    body:
      p(`{firstName}, before this email series ends, I want to ask you three questions I ask every undecided prospect.`) +
      p(`${bold("1. Do you believe a structured, algo-powered trading system can generate consistent returns?")} If no — what evidence would change your mind? If yes — why aren't you in it yet?`) +
      p(`${bold("2. Is your current financial trajectory getting you where you want to be?")} If yes — great, keep going. If no — what's the plan to change it?`) +
      p(`${bold("3. What specifically is stopping you from applying today?")} Reply with your honest answer. I'll respond personally and address it directly.`) +
      p(`The answers to these questions are more valuable than anything else I could send you.`),
  },
  {
    subject: "The last email — and an open door",
    preheader: "This series ends here. But my door is always open.",
    badge: "Final Email",
    title: "This Is the Last Email in This Series",
    body:
      p(`{firstName}, this is the final email in the Smart Money Blueprint drip series.`) +
      p(`Over the past several weeks I've shared the complete system: 4 tiers, real numbers, income projections, risks, client stories, and the pathway from $200 to $10,000/month. You have everything you need.`) +
      p(`If you're ready — apply below. The application is open 24/7 and takes 3 minutes. If you're not ready — keep the Blueprint. Re-read it in a few months. Come back when the timing is right.`) +
      p(`Either way, I'm glad you downloaded the Blueprint. I hope it was valuable.`),
    ctaLabel: "Apply When You're Ready",
    ctaUrl: APPLY_URL,
  },
];

export const DRIP_SEQUENCES: Record<string, DripEmail[]> = {
  SIGNALS: SIGNALS_SEQUENCE,
  PROP_FIRM: PROP_FIRM_SEQUENCE,
  COPY_TRADING: COPY_TRADING_SEQUENCE,
  GENERAL: GENERAL_SEQUENCE,
};
