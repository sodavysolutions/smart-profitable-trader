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
    ctaLabel: "Apply for VIP Signals",
    ctaUrl: APPLY_URL,
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
    ctaLabel: "Apply for VIP Signals",
    ctaUrl: APPLY_URL,
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
    ctaLabel: "Apply Now",
    ctaUrl: APPLY_URL,
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
    ctaLabel: "Submit Your Application",
    ctaUrl: APPLY_URL,
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
    ctaLabel: "Apply to Work With Us",
    ctaUrl: APPLY_URL,
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
    ctaLabel: "Apply Before This Batch Closes",
    ctaUrl: APPLY_URL,
  },
  {
    subject: "What our long-term subscribers say",
    preheader: "Real feedback after 6–12 months on the service",
    badge: "Social Proof",
    title: "Hear From Our Subscribers",
    body:
      p(`{firstName}, here's what a few subscribers have shared with me recently.`) +
      p(`${bold('"This is the first trading service where I actually feel like I know what's happening with my money. Transparent, consistent, and the signals are real." — James, UK')}.`) +
      p(`${bold('"I was sceptical at first. 8 months later I have a funded $50K prop account earning $3,250/month alongside my signals account. I wish I had started sooner." — Amara, Nigeria')}.`) +
      p(`${bold('"Solomon's team treats you like an investor, not just another subscriber. They actually care about your results." — Priya, Canada')}.`) +
      p(`This is the community you'd be joining. Apply below.`),
    ctaLabel: "Join the Community",
    ctaUrl: APPLY_URL,
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
    ctaLabel: "Apply — Final Chance at Intro Pricing",
    ctaUrl: APPLY_URL,
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// PROP_FIRM — Evaluation & Instant Funded Sequence
// ─────────────────────────────────────────────────────────────────────────────
export const PROP_FIRM_SEQUENCE: DripEmail[] = [
  {
    subject: "Your Smart Money Blueprint is here",
    preheader: "The complete roadmap from $50 to $200K in funded capital",
    badge: "Smart Money Blueprint",
    title: "Your Blueprint Has Arrived",
    body:
      p(`Hi {firstName},`) +
      p(`Welcome to Smart Profits Trader. Your Smart Money Blueprint is ready — download it now. Pay particular attention to Tiers 1 and 2: Evaluation Accounts and Instant Funded. These are the fastest routes to serious trading capital in the system.`) +
      p(`Starting from as little as $50, you can access $10,000 to $200,000 in prop firm capital — with Smart Profits Trader managing the trading on your behalf. I'll explain exactly how this works over the coming emails.`) +
      p(`Download the Blueprint first. Then we'll build on it together.`),
    ctaLabel: "Download Your Blueprint",
    ctaUrl: BLUEPRINT_DOWNLOAD_URL,
  },
  {
    subject: "How to access $200,000 in trading capital for $400",
    preheader: "The prop firm model explained simply",
    badge: "Prop Trading Explained",
    title: "The Leverage Play — Evaluation Accounts",
    body:
      p(`{firstName}, here's a concept that changes everything about how people think about trading capital.`) +
      p(`Prop firms give traders access to large funded accounts — $10,000 to $200,000 — after passing a trading challenge. The challenge fee ranges from ${highlight("$50 to $400 total")}. Pass the challenge, and the firm funds your account with their capital.`) +
      p(`Smart Profits Trader manages the challenge trading using our Smart Profit EA. We target completing ${bold("each evaluation phase in 15 days")}. Once funded, we trade the prop account and split profits with you.`) +
      p(`On a $100,000 funded account at 10% monthly return, you receive ${highlight("$6,500 every month")} — from a $300 initial investment. That's the power of this model.`),
  },
  {
    subject: "The evaluation account table you need to see",
    preheader: "Every account size, cost, and monthly income mapped out",
    badge: "Numbers Breakdown",
    title: "Evaluation Account Income Projections",
    body:
      p(`{firstName}, let me give you the exact numbers from our Blueprint.`) +
      p(`${bold("$10K account:")} $50 total cost → $650/month to you (65% of $1,000 monthly profit) — ROI in under 1 month.`) +
      p(`${bold("$25K account:")} $120 total cost → $1,625/month — ROI in under 1 month.`) +
      p(`${bold("$50K account:")} $200 total cost → $3,250/month — ROI in under 1 month.`) +
      p(`${bold("$100K account:")} $300 total cost → $6,500/month — ROI in under 1 month.`) +
      p(`${bold("$200K account:")} $400 total cost → $13,000/month — ROI in under 1 month.`) +
      p(`The profit split is ${highlight("65% to you, 35% to Smart Profits Trader")}. Income begins the month after the challenge is passed — approximately 30 days from start.`),
  },
  {
    subject: "What happens if the evaluation fails?",
    preheader: "Being transparent about the risk before you decide",
    badge: "Honest Risk Disclosure",
    title: "The Risk You Need to Know About",
    body:
      p(`{firstName}, I want to be completely transparent about the risk in evaluation accounts.`) +
      p(`If our EA exceeds the prop firm's drawdown limits during the challenge — the challenge fails. The fee paid ($50–$400) is ${bold("lost and the challenge must be restarted")} from scratch with a new fee.`) +
      p(`Our Smart Profit EA has been engineered specifically to stay within prop firm rules — targeting 10% profit while keeping daily and total drawdown well within limits. But no algo has a 100% pass rate. Challenges can fail.`) +
      p(`This is why the Blueprint recommends starting with the smallest account size you're comfortable with, confirming success before scaling. The entry cost is low for exactly this reason — the risk is manageable.`),
  },
  {
    subject: "Instant Funded — trade from Day 1 with no challenge",
    preheader: "Skip the evaluation. Start earning immediately.",
    badge: "Instant Funded",
    title: "No Challenge. No Waiting. Just Trading.",
    body:
      p(`{firstName}, if you'd rather skip the evaluation process entirely, there's a second path: ${bold("Instant Funded accounts through iFunds")}.`) +
      p(`You purchase a funded account directly — no challenge phases to pass. Smart Profits Trader begins managing it from Day 1. Returns target ${highlight("10–25% monthly")} on account sizes from $5,000 to $85,000.`) +
      p(`The trade-off is higher upfront cost ($400–$5,800 depending on account size) versus the challenge route ($50–$400). But there's no waiting period, no risk of challenge failure, and trading income starts immediately.`) +
      p(`For people who want to go faster and have more capital to deploy — Instant Funded is the fast lane.`),
  },
  {
    subject: "Instant Funded income projections — the numbers that matter",
    preheader: "What each package earns and how quickly you recover your cost",
    badge: "iFunds Numbers",
    title: "Instant Funded Profit Projections",
    body:
      p(`{firstName}, here are the Instant Funded income figures from our blueprint. iFunds retains 50% of gross profit first, then the remaining 50% is split 50/50 (or 65/35 if you pay the setup fee).`) +
      p(`${bold("Bronze — $5,000 account:")} $400 total, targeting $313–$406/month. ROI in ~1 month.`) +
      p(`${bold("Silver — $10,000 account:")} $700 total, targeting $625–$813/month.`) +
      p(`${bold("Gold — $25,000 account:")} $1,600 total, targeting $1,563–$2,031/month.`) +
      p(`${bold("Diamond — $50,000 account:")} $3,000 total, targeting ${highlight("$3,125–$4,063/month")}.`) +
      p(`${bold("Platinum — $85,000 account:")} $5,000 total, targeting ${highlight("$5,313–$6,906/month")}. ROI in under 1 month.`),
  },
  {
    subject: "Evaluation vs Instant Funded — which is right for you?",
    preheader: "A simple framework for choosing your path",
    badge: "Decision Guide",
    title: "Choosing Your Prop Firm Route",
    body:
      p(`{firstName}, both routes lead to the same destination — funded prop trading with Smart Profits Trader managing your account. The right choice depends on your situation.`) +
      p(`${bold("Choose Evaluation if:")} You have limited capital to start ($50–$400), you're happy to wait 30 days for income to begin, and you want to minimise upfront cost. Best starting point.`) +
      p(`${bold("Choose Instant Funded if:")} You have $400–$5,800 available, you want income from Day 1, and you don't want the risk of challenge failure costing you the entry fee.`) +
      p(`Many subscribers start with an evaluation account to prove the system works for them, then reinvest profits into Instant Funded accounts to scale faster. The Blueprint recommends this exact progression.`),
  },
  {
    subject: "How we pass prop firm evaluations with the Smart Profit EA",
    preheader: "The technology behind the challenge strategy",
    badge: "EA Strategy",
    title: "How Our EA Passes Prop Challenges",
    body:
      p(`{firstName}, passing prop firm evaluations requires a specific approach — one that's very different from normal trading.`) +
      p(`Our Smart Profit EA is calibrated for prop firm rules: a maximum daily drawdown of 4% and total drawdown of 8% (industry standard). The EA targets the profit threshold — usually 8-10% — within the allowed timeframe, while staying comfortably within both drawdown limits.`) +
      p(`We target completing each phase in 15 days, giving a buffer before the 30-day deadline. This is not aggressive trading — it's calculated, systematic execution designed specifically to meet prop firm requirements.`) +
      p(`The same EA then continues managing the funded account, simply adjusted for the different rules that apply post-funding.`),
  },
  {
    subject: "The multi-firm scaling strategy that generates $42,000+/month",
    preheader: "Stage 5 of the Smart Money Blueprint explained",
    badge: "Scale Strategy",
    title: "Running Multiple Funded Accounts",
    body:
      p(`{firstName}, Stage 5 of the Smart Money Blueprint is where things get genuinely life-changing.`) +
      p(`Once you've successfully passed and funded one prop account, you replicate across multiple firms. FTMO, FundedNext, The 5%ers, Alpha Capital Group — there are at least 8 top-tier firms you can run simultaneously.`) +
      p(`At $200,000 per firm at 10% monthly, each account generates $13,000/month to you. Running just ${bold("5 firms simultaneously")} at scale generates ${highlight("$65,000/month")}.`) +
      p(`This isn't a dream — it's the logical endpoint of the system. Start with one $10K evaluation. Prove it. Scale to five firms. The Blueprint maps every step.`),
  },
  {
    subject: "Here's how to get your first funded account",
    preheader: "The exact steps to start this week",
    badge: "Getting Started",
    title: "Your First Step Into Prop Trading",
    body:
      p(`{firstName}, getting your first prop evaluation or instant funded account with us is straightforward.`) +
      p(`Submit your application. We'll review it, get on a quick call to understand your goals and budget, then recommend the right account size and prop firm for your situation. We handle the trading — you receive monthly profit distributions.`) +
      p(`The minimum to start is $50 (for a $10K evaluation). Within 30 days of starting, you could be receiving ${highlight("$650/month")} from a $10K funded account.`) +
      p(`Apply below and let's map out your specific roadmap.`),
    ctaLabel: "Apply for Prop Trading",
    ctaUrl: APPLY_URL,
  },
  {
    subject: "Prop trading is not gambling — here's the difference",
    preheader: "And why people confuse the two",
    badge: "Education",
    title: "Prop Trading vs Gambling",
    body:
      p(`{firstName}, I hear this concern often: "Isn't prop trading just gambling with borrowed money?"`) +
      p(`It isn't — and here's why. Gambling has a negative expected value by design. The house always wins over time. Systematic trading with a positive edge — like our Smart Profit EA — has a ${bold("positive expected value")} when applied correctly over hundreds of trades.`) +
      p(`Prop firm accounts give us capital to express that positive edge at scale. The firm takes on the capital risk in exchange for a share of profits. If we trade well, everyone wins. If we don't — the firm loses their capital, and we lose only the initial challenge fee.`) +
      p(`This asymmetric risk structure is one of the most attractive things about the prop model. Limited downside, significant upside.`),
  },
  {
    subject: "The 7 Golden Rules of our trading system",
    preheader: "These are non-negotiable. Break them and the system breaks.",
    badge: "Golden Rules",
    title: "The Non-Negotiable Rules",
    body:
      p(`{firstName}, the Smart Money Blueprint includes 7 Golden Rules that govern how we manage every account. They're worth knowing.`) +
      p(`Rule 1: Always use the system. Rule 2: Protect the account above all else. Rule 3: Withdraw regularly — don't leave everything in one account. Rule 4: Reinvest strategically (40% back to trading, 40% to next challenge, 20% to savings).`) +
      p(`Rule 5: Scale only after consistency — don't rush to $100K accounts before mastering $25K. Rule 6: Diversify across 4-6 firms minimum. Rule 7: Keep records — review monthly performance and adjust.`) +
      p(`These rules exist because the traders who ignore them are the ones who lose. The ones who follow them build lasting wealth.`),
  },
  {
    subject: "Which prop firms do we target? Full list inside.",
    preheader: "The 9 firms in our multi-firm scaling strategy",
    badge: "Prop Firm Guide",
    title: "Our Target Prop Firm Portfolio",
    body:
      p(`{firstName}, for multi-firm scaling, the Blueprint recommends these firms. Each has been selected for reliability, payout track record, and EA-friendly rules.`) +
      p(`${bold("FTMO")} — $200K max, gold standard. ${bold("FundedNext")} — flexible rules, generous scaling. ${bold("The 5%ers")} — lifetime funding, no time limit. ${bold("The 8%ers")} — newer entrant, strong payouts. ${bold("Alpha Capital Group")} — good for EA traders.`) +
      p(`${bold("ThinkCapital")} — competitive splits. ${bold("Audacity Capital")} — instant funding available. ${bold("iFunds")} — our Instant Funded partner, $85K max, static drawdown model.`) +
      p(`Smart Profits Trader has relationships and specific EA configurations for each of these firms. When you work with us, you benefit from that knowledge immediately.`),
  },
  {
    subject: "Withdraw early. Withdraw often. Here's why.",
    preheader: "One of the most important rules in the entire blueprint",
    badge: "Withdrawal Strategy",
    title: "Why Regular Withdrawals Are Non-Negotiable",
    body:
      p(`{firstName}, one of the Golden Rules that beginners often ignore is ${bold("Rule 3: Withdraw Regularly")}.`) +
      p(`It's tempting to leave profits in a funded account and watch the number grow. But prop firms can change rules, suspend payouts, or in rare cases, shut down. Every dollar of unrealised profit sitting in a prop account is money you don't yet have.`) +
      p(`Our withdrawal strategy: withdraw every month as soon as you hit the eligible threshold. Take the money out. It's yours.`) +
      p(`The reinvestment plan is equally important — 40% back into trading capital, 40% into the next challenge or tier, 20% into savings. This structure accelerates growth while protecting what you've built.`),
  },
  {
    subject: "What does a typical month look like on a funded account?",
    preheader: "From challenge pass to first withdrawal — the timeline",
    badge: "Real Timeline",
    title: "Month 1 After Your Account Is Funded",
    body:
      p(`{firstName}, here's a realistic month-by-month timeline for someone starting with a $25K evaluation.`) +
      p(`${bold("Week 1-2:")} Challenge Phase 1 begins. EA trades within rules. Target: 8% profit in 15 days.`) +
      p(`${bold("Week 3-4:")} Phase 1 passed. Phase 2 begins immediately. Same process.`) +
      p(`${bold("Month 2:")} Account is funded. EA begins live trading on $25K. Target: 10% — $2,500 gross.`) +
      p(`${bold("Month 2 payout:")} You receive ${highlight("$1,625")} (65% split). The $120 total cost was recovered in month 1 when profit was shared at Phase 2 completion (some firms pay on funded account only — we advise the specific rules for each firm).`),
  },
  {
    subject: "The question I get asked most: 'Is this too good to be true?'",
    preheader: "My honest answer",
    badge: "Honest Conversation",
    title: "Addressing the Scepticism Directly",
    body:
      p(`{firstName}, the most common question I receive is: "This all sounds too good to be true — what's the catch?"`) +
      p(`Fair question. Here's the complete picture. Evaluation accounts can fail (the EA has a strong but not perfect pass rate). Prop firms can change rules or delay payouts. Monthly returns of 10% are targets, not guarantees. Some months will underperform. Some challenges will need to be retaken.`) +
      p(`The system works over time — with consistent execution, proper risk management, and realistic expectations. It's not a get-rich-quick scheme. It's a structured, methodical approach to building trading income using institutional-grade tools.`) +
      p(`If you're looking for a guarantee with zero risk — trading isn't that. If you're looking for a serious system with a clear edge — this is it.`),
  },
  {
    subject: "The starter path: how to begin with just $50",
    preheader: "The exact sequence for getting started at the minimum",
    badge: "Minimum Start Guide",
    title: "Starting With $50 — Step by Step",
    body:
      p(`{firstName}, you don't need hundreds or thousands to start. Here is the exact path from $50.`) +
      p(`Step 1: Apply with Smart Profits Trader and select the $10K evaluation account. Total cost: ${bold("$50")} (two phases × $25 each).`) +
      p(`Step 2: We set up the EA on your MT5 demo account for Phase 1 of the challenge. Trading begins. We target completion in 15 days.`) +
      p(`Step 3: Phase 1 passed. Phase 2 begins. Same process. Phase 2 passed — your $10K account is now funded.`) +
      p(`Step 4: Month 1 of live trading on the funded account. At 10% return, you receive ${highlight("$650")} — 13x your total investment. This is the starting point of your prop trading business.`),
    ctaLabel: "Start With a $50 Evaluation",
    ctaUrl: APPLY_URL,
  },
  {
    subject: "What separates our clients from DIY prop traders",
    preheader: "The advantage of having an expert team manage your accounts",
    badge: "Why Use SPT",
    title: "DIY vs. Managed Prop Trading",
    body:
      p(`{firstName}, a common question: "Why not just buy the EA and manage my own prop accounts?"`) +
      p(`You could. But here's what that requires: understanding prop firm rules deeply (they vary by firm and change often), knowing how to configure the EA for each firm's specific requirements, monitoring accounts during volatile market events, handling edge cases and drawdown scenarios, and maintaining multiple accounts simultaneously across different platforms.`) +
      p(`Smart Profits Trader does all of this. We've already made the mistakes, learned the rules, and built the infrastructure. You access the results without the learning curve.`) +
      p(`Your time has value. Our service lets you deploy capital productively while you focus on everything else in your life.`),
  },
  {
    subject: "Scaling to $500K in funded accounts — is it realistic?",
    preheader: "The numbers behind Stage 5 of the blueprint",
    badge: "Scale Vision",
    title: "The $500K Funded Portfolio",
    body:
      p(`{firstName}, Stage 5 of the Blueprint is running $500K–$1M across multiple prop firms simultaneously. Let's look at whether that's realistic.`) +
      p(`To reach $500K in funded capital, you need roughly 5 × $100K accounts (or 10 × $50K, or 2-3 × $200K FTMO accounts). Each $100K challenge costs $300. Five challenges cost $1,500 total.`) +
      p(`At 10% monthly on $500K: $50,000 gross profit. Your 65% split: ${highlight("$32,500/month")}.`) +
      p(`Is it realistic? For someone starting now, reinvesting profits, and scaling systematically — yes, within 18-24 months. Not easy. Not overnight. But achievable through the Blueprint framework.`),
  },
  {
    subject: "Final push — this is your moment",
    preheader: "I've shared everything. Now it's your move.",
    badge: "Your Move",
    title: "Everything You Need Is Already in Your Hands",
    body:
      p(`{firstName}, you have the Blueprint. You understand how evaluation accounts and instant funded programs work. You've seen the income numbers.`) +
      p(`You know that a $50 investment can unlock $650/month from a $10K funded account. You know that scaling to multiple accounts can generate $32,000+/month. You know Smart Profits Trader manages the trading so you don't have to.`) +
      p(`The only thing missing is your application. It takes 3 minutes. There's no commitment at the application stage — just a conversation about whether we're the right fit for your goals.`) +
      p(`Apply below. Let's get your first funded account set up.`),
    ctaLabel: "Apply Now — Get Started This Week",
    ctaUrl: APPLY_URL,
  },
  {
    subject: "One more thing before I stop writing to you",
    preheader: "This is the last email in this sequence",
    badge: "Final Message",
    title: "The Last Email — Make It Count",
    body:
      p(`{firstName}, this is my last email in this series. You've received everything I can share in writing.`) +
      p(`If you haven't applied yet — ask yourself honestly: what am I waiting for? If it's a specific concern or question, reply to this email and I'll answer it personally. I read every reply.`) +
      p(`If you've decided this isn't for you right now — no hard feelings. Keep the Blueprint. Come back when you're ready.`) +
      p(`And if you're ready now — click below. Let's build your prop trading income together.`),
    ctaLabel: "Apply — Final Email",
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
