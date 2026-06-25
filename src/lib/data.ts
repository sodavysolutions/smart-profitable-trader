import {
  BadgeDollarSign,
  Bell,
  BriefcaseBusiness,
  ChartNoAxesCombined,
  CircleDollarSign,
  ClipboardList,
  CreditCard,
  Headphones,
  Home,
  Landmark,
  LayoutDashboard,
  LineChart,
  Megaphone,
  MessageSquare,
  Receipt,
  Settings,
  ShieldCheck,
  Users
} from "lucide-react";

export const navItems = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/crm", label: "CRM Leads", icon: Megaphone },
  { href: "/admin/customers", label: "Customers", icon: Users },
  { href: "/admin/accounts", label: "Account Tracking", icon: LineChart },
  { href: "/admin/profit-share", label: "Profit Share", icon: BadgeDollarSign },
  { href: "/admin/payments", label: "Payments", icon: CreditCard },
  { href: "/admin/expenses", label: "Expenses", icon: Receipt },
  { href: "/admin/reminders", label: "Reminders", icon: Bell },
  { href: "/admin/communications", label: "Communications", icon: MessageSquare },
  { href: "/admin/reports", label: "Reports", icon: ChartNoAxesCombined },
  { href: "/admin/settings", label: "Settings", icon: Settings }
];

export const publicNav = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
  { href: "/legal", label: "Risk Disclaimer" }
];

export const services = [
  {
    title: "Smart Profits Trader VIP Signal Service",
    slug: "vip-signals",
    icon: Megaphone,
    description: "Access structured VIP trading alerts supported by Smart Profit Algo analysis and weekly optimization reviews.",
    benefits: ["VIP signal alerts", "Algo-supported market analysis", "Weekly optimization reviews", "Risk-managed trade planning"],
    audience: "Traders who want structured alerts, clearer market guidance, and a disciplined signal process.",
    requirements: "Risk acceptance, active communication channel, and understanding that trading results are not guaranteed."
  },
  {
    title: "Copy Trading Subscription",
    slug: "copy-trading",
    icon: LineChart,
    description: "Connect your account to structured copy trading with monthly renewal tracking and performance visibility.",
    benefits: ["Recurring subscription model", "Account connection support", "Renewal reminders", "Performance tracking"],
    audience: "Clients with an existing trading account who want a managed signal/copy trading structure.",
    requirements: "Broker account, MT4/MT5 access, risk acceptance, active subscription."
  },
  {
    title: "Funded Account Trading",
    slug: "funded-account",
    icon: Landmark,
    description: "Track funded prop firm accounts, withdrawals, growth, drawdown status, and profit-share due.",
    benefits: ["Withdrawal planning", "Profit-share history", "Balance growth charts", "Drawdown monitoring"],
    audience: "Funded traders and clients with prop firm capital ready for managed trading.",
    requirements: "Funded account access, prop firm rules, profit-share agreement."
  },
  {
    title: "Evaluation Account Management",
    slug: "evaluation",
    icon: ClipboardList,
    description: "Manage Phase 1, Phase 2, and funded progress with target and drawdown bars for each evaluation account.",
    benefits: ["Phase progress bars", "Daily drawdown monitoring", "Manual balance updates", "Minimum trading day tracking"],
    audience: "Clients taking prop firm challenges who need structured account management support.",
    requirements: "Prop firm account, account size, current phase, platform login, evaluation rules."
  },
  {
    title: "Personal Trading Account Management",
    slug: "personal-account",
    icon: BriefcaseBusiness,
    description: "Monitor personal account balances, equity, profit/loss, withdrawals, and profit-share model.",
    benefits: ["Capital growth tracking", "Withdrawal records", "Custom profit share", "Communication history"],
    audience: "Private clients who want their own broker account managed under clear risk rules.",
    requirements: "Broker account, starting capital, platform access, agreed risk preference."
  }
];

export const leads = [
  ["Amara Okafor", "Evaluation Account Management", "New Lead", "Instagram", "High", "2026-06-16"],
  ["Daniel Reed", "Copy Trading Subscription", "Contacted", "Referral", "Medium", "2026-06-14"],
  ["Grace Mensah", "Funded Account Trading", "Interested", "WhatsApp", "High", "2026-06-13"],
  ["Owen Carter", "Personal Trading Account Management", "Payment Pending", "Google", "High", "2026-06-17"],
  ["Priya Shah", "Copy Trading Subscription", "Follow-up Needed", "Facebook", "Low", "2026-06-18"],
  ["Samuel Adeyemi", "Evaluation Account Management", "Converted to Customer", "YouTube", "Medium", "2026-06-15"],
  ["Lina Brooks", "General Inquiry", "Not Interested", "Website", "Low", "2026-06-22"],
  ["Kwame Boateng", "Funded Account Trading", "Interested", "Campaign", "High", "2026-06-14"],
  ["Maya Chen", "Personal Trading Account Management", "Contacted", "LinkedIn", "Medium", "2026-06-20"],
  ["Ibrahim Bello", "Evaluation Account Management", "Lost", "TikTok", "Low", "2026-06-25"]
].map(([name, service, status, source, priority, followUp], index) => ({
  id: `LD-${1000 + index}`,
  name,
  email: `${name.toLowerCase().replaceAll(" ", ".")}@example.com`,
  phone: `+1 555 01${index} ${index}${index}`,
  whatsapp: `+234 80${index} 000 10${index}`,
  country: index % 2 ? "United States" : "Nigeria",
  city: index % 2 ? "New York" : "Lagos",
  service,
  status,
  source,
  campaign: index % 2 ? "June Growth" : "Prop Firm Push",
  staff: index % 3 === 0 ? "Support Desk" : "Admin Team",
  priority,
  followUp,
  lastContact: "2026-06-12",
  notes: "Qualification call pending and risk disclaimer already shared."
}));

export const customers = [
  ["Sophia Williams", "Copy Trading Subscriber", "Active", "MT5", "IC Markets", 5000, 5650, "2026-07-01"],
  ["Malik Johnson", "Funded Account Trading Client", "In Profit", "TradeLocker", "FTMO", 100000, 106800, "2026-06-28"],
  ["Aisha Bello", "Evaluation Account Client", "Phase 1", "MT5", "MyForexFunds", 50000, 53250, "2026-07-03"],
  ["Noah Smith", "Personal Trading Account Client", "Active", "MT4", "Pepperstone", 25000, 27350, "2026-06-20"],
  ["Chinedu Nwosu", "Copy Trading Subscriber", "Expiring Soon", "MT5", "Exness", 3000, 3270, "2026-06-16"],
  ["Emily Davis", "Evaluation Account Client", "Phase 2", "TradeLocker", "The5ers", 100000, 104600, "2026-07-11"],
  ["Tunde Hassan", "Funded Account Trading Client", "Withdrawal Due", "MT5", "FundedNext", 200000, 214300, "2026-06-18"],
  ["Olivia Garcia", "Personal Trading Account Client", "Paused", "Other", "Oanda", 15000, 14820, "2026-08-01"],
  ["Victor Allen", "Copy Trading Subscriber", "Active", "MT4", "FXTM", 10000, 11100, "2026-07-09"],
  ["Nadia Ali", "Evaluation Account Client", "In Drawdown", "MT5", "E8", 25000, 23880, "2026-06-30"]
].map(([name, type, status, platform, firm, capital, balance, renewal], index) => ({
  id: `CU-${2000 + index}`,
  name: String(name),
  email: `${String(name).toLowerCase().replaceAll(" ", ".")}@example.com`,
  phone: `+44 20 000${index}`,
  whatsapp: `+234 81${index} 334 20${index}`,
  country: index % 2 ? "United Kingdom" : "Nigeria",
  type: String(type),
  status: String(status),
  platform: String(platform),
  firm: String(firm),
  accountLogin: `${802340 + index}`,
  initialCapital: Number(capital),
  currentBalance: Number(balance),
  currentEquity: Number(balance) - (index % 4) * 130,
  renewal: String(renewal),
  manager: index % 2 ? "Finance Manager" : "Admin Team",
  setupFee: index % 2 === 0 ? "Paid" : "Pending",
  profitTier: index % 2 === 0 ? "65/35 setup-fee tier" : "50/50 no-setup-fee tier"
}));

export const dashboardMetrics = [
  { label: "Total Leads", value: "10", change: "+18%", icon: Megaphone },
  { label: "Active Customers", value: "8", change: "+12%", icon: Users },
  { label: "Monthly Revenue", value: "$18,640", change: "+21%", icon: CircleDollarSign },
  { label: "Profit Share Due", value: "$7,420", change: "5 pending", icon: BadgeDollarSign },
  { label: "Total Expenses", value: "$2,315", change: "2 overdue", icon: Receipt },
  { label: "Renewals Soon", value: "6", change: "next 7 days", icon: Bell }
];

export const chartData = [
  { month: "Jan", revenue: 8200, expenses: 2100, customers: 18 },
  { month: "Feb", revenue: 9400, expenses: 2200, customers: 21 },
  { month: "Mar", revenue: 11200, expenses: 2380, customers: 26 },
  { month: "Apr", revenue: 13400, expenses: 2500, customers: 31 },
  { month: "May", revenue: 15100, expenses: 2290, customers: 36 },
  { month: "Jun", revenue: 18640, expenses: 2315, customers: 42 }
];

export const expenses = [
  ["Codex monthly fee", "Software subscriptions", 200, "Monthly", "Paid", "2026-07-01"],
  ["VPS", "VPS", 85, "Monthly", "Upcoming", "2026-06-20"],
  ["Trade copier", "Trade copier", 350, "Monthly", "Upcoming", "2026-06-18"],
  ["Router data subscription", "Router data subscription", 70, "Monthly", "Overdue", "2026-06-10"],
  ["Domain and hosting", "Domain/hosting", 160, "Yearly", "Paid", "2027-01-15"],
  ["Email software", "Email software", 95, "Monthly", "Paid", "2026-07-05"],
  ["WhatsApp/SMS software", "WhatsApp/SMS software", 180, "Monthly", "Upcoming", "2026-06-22"],
  ["Staff assistant", "Staff/assistant", 950, "Monthly", "Paid", "2026-07-01"],
  ["Internet/data", "Internet/data", 55, "Monthly", "Overdue", "2026-06-11"],
  ["Misc tools", "Miscellaneous", 170, "One-time", "Paid", "2026-06-08"]
].map(([name, category, amount, cycle, status, renewal]) => ({ name, category, amount, cycle, status, renewal }));

export const profitShares = customers.slice(1, 8).map((customer, index) => {
  const totalProfit = [6800, 3250, 2350, 270, 4600, 14300, -180][index] ?? 1200;
  const setupTier = index % 2 === 0;
  const companyPct = setupTier ? 35 : 50;
  const companyShare = Math.max(totalProfit, 0) * (companyPct / 100);
  return {
    customer: customer.name,
    account: customer.type,
    totalProfit,
    tier: setupTier ? "Setup fee paid" : "No setup fee",
    clientShare: Math.max(totalProfit, 0) - companyShare,
    companyShare,
    paid: index % 3 === 0 ? companyShare : 0,
    pending: index % 3 === 0 ? 0 : companyShare,
    status: index % 3 === 0 ? "Paid" : index % 3 === 1 ? "Pending" : "Partially Paid"
  };
});

export const communications = [
  ["Grace Mensah", "WhatsApp", "New lead follow-up", "Sent", "2026-06-13"],
  ["Chinedu Nwosu", "Email", "Subscription renewal reminder", "Pending", "2026-06-13"],
  ["Tunde Hassan", "SMS", "Withdrawal update", "Sent", "2026-06-12"],
  ["Amara Okafor", "Email", "Evaluation welcome email", "Failed", "2026-06-12"],
  ["Noah Smith", "WhatsApp", "Account progress update", "Sent", "2026-06-11"]
].map(([recipient, channel, title, status, date]) => ({ recipient, channel, title, status, date }));

export const reminders = [
  ["Copy Trading Renewal", "Customer Subscription", "Chinedu Nwosu", 150, "2026-06-16", "7-day reminder"],
  ["Trade Copier", "Business Expense", "Vendor", 350, "2026-06-18", "3-day reminder"],
  ["Funded Withdrawal Review", "Customer Subscription", "Tunde Hassan", 0, "2026-06-18", "Today"],
  ["Router Data", "Business Expense", "ISP", 70, "2026-06-10", "Overdue"]
].map(([name, type, related, amount, renewal, rule]) => ({ name, type, related, amount, renewal, rule }));

export const features = [
  { title: "Structured account visibility", icon: Home, text: "Track copy trading, evaluations, funded accounts, and personal accounts with one operational view." },
  { title: "Risk-first operations", icon: ShieldCheck, text: "Drawdown, progress, renewals, and activity logs are built into the workflow." },
  { title: "Client communication history", icon: Headphones, text: "Email, WhatsApp, SMS, notes, calls, and follow-ups stay attached to each lead or customer." }
];

export function currency(value: number) {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(value);
}

export function growth(initial: number, current: number) {
  if (!initial) return 0;
  return ((current - initial) / initial) * 100;
}
