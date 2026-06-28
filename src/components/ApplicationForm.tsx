"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";

type Option = {
  value: string;
  label: string;
};

type ServiceKey = "vip-signals" | "copy-trading" | "instant-funded" | "evaluation" | "personal-account" | "general";

const serviceOptions: Option[] = [
  { value: "Smart Profits Trader VIP Signal Service", label: "Smart Profits Trader VIP Signal Service" },
  { value: "Copy Trading / Personal Account Trading", label: "Copy Trading / Personal Account Trading" },
  { value: "Instant Funded Prop Trading", label: "Instant Funded Prop Trading" },
  { value: "Evaluation Account Management", label: "Evaluation Account Management" },
  { value: "Personal Account Management", label: "Personal Account Management" },
  { value: "Not sure yet - I need guidance", label: "Not sure yet - I need guidance" }
];

const serviceMap: Record<ServiceKey | string, string> = {
  "vip-signals": "Smart Profits Trader VIP Signal Service",
  "copy-trading": "Copy Trading / Personal Account Trading",
  "instant-funded": "Instant Funded Prop Trading",
  evaluation: "Evaluation Account Management",
  "personal-account": "Personal Account Management",
  "funded-account": "Instant Funded Prop Trading",
  general: "Not sure yet - I need guidance"
};

const brokerOptions = ["XM", "Valetax", "Capitalxtend", "I do not have a broker account yet", "I need guidance"];
const evaluationPropFirmOptions = ["Hola Prime", "FTMO", "FundingPips", "Fxify", "I have not chosen yet", "I need guidance"];
const instantFundedProviderOptions = ["iFunds", "Tentrade", "I have not chosen yet", "I need guidance"];
const generalInvestmentOptions = ["Below $100", "$100 - $299", "$300 - $499", "$500 - $999", "$1,000 - $4,999", "$5,000 and above", "I need guidance"];
const copyInvestmentOptions = ["Below $300", "$300 - $499", "$500 - $999", "$1,000 - $4,999", "$5,000 and above"];
const profitGoalOptions = ["5% – 8% per month (steady, low risk)", "10% – 15% per month (moderate growth)", "20% – 30% per month (ambitious)", "I need guidance on realistic expectations"];
const riskStyleOptions = [
  "Conservative – Protect my capital first, grow slowly",
  "Moderate – Balanced growth with controlled drawdowns",
  "Aggressive – Maximise returns, I accept higher risk"
];
const howHeardOptions = ["Instagram", "Facebook", "YouTube", "WhatsApp group", "Referral from a friend", "Google Search", "TikTok", "Other"];

export function ApplicationForm({ initialService = "general", thankYouPath = "/thank-you" }: { initialService?: string; thankYouPath?: string }) {
  const router = useRouter();
  const [service, setService] = useState(serviceMap[initialService] ?? serviceMap.general);
  const [campaign, setCampaign] = useState("");
  const [source, setSource] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  // If a specific service was passed in, lock it — no need to ask the user
  const isServiceLocked = initialService !== "general" && Boolean(serviceMap[initialService]);

  // Auto-derive mainGoal from service so the hidden field always satisfies validation
  const derivedMainGoal = useMemo(() => {
    if (service.includes("VIP Signal")) return "Receive daily trading signals I can act on";
    if (service.includes("Copy Trading")) return "Have my trades copied automatically into my account";
    if (service.includes("Personal Account")) return "Have my personal account professionally managed";
    if (service.includes("Evaluation")) return "Pass a prop firm evaluation challenge";
    if (service.includes("Instant Funded")) return "Get an instant funded trading account";
    return "";
  }, [service]);

  const serviceSummary = useMemo(() => {
    if (service.includes("VIP Signal")) return "Tell us how you plan to use the signals and whether you already trade gold.";
    if (service.includes("Copy Trading")) return "We will confirm your broker, platform, capital level, and copy trading readiness.";
    if (service.includes("Evaluation")) return "Share your prop firm, challenge stage, and account size so the team can advise properly.";
    if (service.includes("Instant Funded")) return "We will check the provider, account size, and setup-fee readiness before next steps.";
    if (service.includes("Personal Account")) return "We will review your broker, capital, and preference for account management or copy trading.";
    return "Choose this if you want the team to recommend the best Smart Profits Trader path.";
  }, [service]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const params = new URLSearchParams(window.location.search);
    const serviceParam = params.get("service");
    if (serviceParam && serviceMap[serviceParam]) setService(serviceMap[serviceParam]);
    setCampaign(params.get("utm_campaign") ?? "");
    setSource(params.get("utm_source") ?? params.get("source") ?? "");
  }, []);

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setSubmitting(true);
    try {
      const formData = new FormData(event.currentTarget);
      const payload = Object.fromEntries(formData.entries());
      const response = await fetch("/api/applications", {
        method: "POST",
        body: JSON.stringify(payload),
        headers: { "Content-Type": "application/json" }
      });

      const result = await response.json().catch(() => null);

      if (response.ok) {
        router.push(`${thankYouPath}?service=${encodeURIComponent(service)}`);
        return;
      }

      setError(result?.error ?? "Please check your details and try submitting again.");
    } catch {
      setError("We could not submit your application. Please check your connection and try again.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={submit} aria-busy={submitting} noValidate className="grid gap-5 rounded-md border border-slate-200 bg-white p-4 shadow-soft sm:p-6">
      <input type="hidden" name="campaign" value={campaign} />
      <input type="hidden" name="source" value={source} />

      <p className="rounded-md border border-amber-200 bg-amber-50 p-4 text-sm leading-6 text-amber-900">
        Trading involves risk. Results are not guaranteed. Your answers help us understand your goals, experience, capital level, and risk profile so we can guide you toward a suitable Smart Profits Trader option.
      </p>

      <p className="text-xs text-slate-500">Fields marked <span className="font-bold text-red-500">*</span> are required.</p>

      <FormSection title="Personal Information">
        <div className="grid gap-4 md:grid-cols-2">
          <Field name="fullName" label="Full Name" placeholder="Enter your full name" autoComplete="name" required />
          <Field name="email" label="Email Address" type="email" placeholder="Enter your email address" autoComplete="email" required />
          <Field name="phoneWhatsapp" label="Phone / WhatsApp Number" type="tel" placeholder="+234..." helper="Please include your country code." autoComplete="tel" required />
          <Field name="locationAddress" label="Location / Address" placeholder="Enter your city, country, or address" autoComplete="street-address" required />
        </div>
      </FormSection>

      <FormSection title="Trading Background">
        <div className="grid gap-4">
          {isServiceLocked ? (
            <>
              {/* Hidden input carries the service value */}
              <input type="hidden" name="service" value={service} />
              {/* Show it as a read-only badge so the applicant can confirm */}
              <div className="rounded-md border-2 border-profit-200 bg-profit-50 px-4 py-3 text-sm font-semibold text-profit-800">
                Applying for: {service}
              </div>
            </>
          ) : (
            <SelectField name="service" label="Which service are you enquiring about?" value={service} onChange={setService} options={serviceOptions} required helper={serviceSummary} />
          )}
          <RadioGroup name="tradingExperienceYesNo" label="Have you traded financial markets before (forex, stocks, crypto, indices)?" options={["Yes", "No"]} required />
          <RadioGroup
            name="experienceRating"
            label="How would you rate your current trading knowledge?"
            options={["Complete beginner – I have never traded", "Some knowledge – I understand the basics", "Experienced – I trade regularly"]}
            required
          />
          <RadioGroup
            name="automatedTradingExperience"
            label="Have you used automated trading tools before (EAs, bots, copy trading, signals)?"
            options={["Yes – I have used them before", "I know about them but never used one", "No – this is completely new to me"]}
            required
          />
        </div>
      </FormSection>

      <FormSection title="Capital and Risk Profile">
        <div className="grid gap-4">
          <SelectField
            name="investmentAmount"
            label="How much capital are you working with or willing to start with?"
            options={service.includes("Copy Trading") || service.includes("Personal Account") ? copyInvestmentOptions : generalInvestmentOptions}
            required
            helper={service.includes("Copy Trading") || service.includes("Personal Account") ? "Minimum recommended starting capital for Copy Trading / Personal Account Management is $300." : "For Copy Trading and Personal Account Management, the recommended minimum is $300."}
          />
          <SelectField
            name="expectedMonthlyProfitGoal"
            label="What monthly return are you targeting?"
            options={profitGoalOptions}
            required
            helper="Trading results are never guaranteed. This helps us set realistic expectations and recommend the right approach for you."
          />
          <RadioGroup
            name="hasExistingTradingAccount"
            label="Do you currently have a live trading or prop firm account?"
            options={["Yes – I have a broker account", "Yes – I have a prop firm account", "No – I need help setting one up", "I am not sure what I need"]}
            required
          />
          <RadioGroup
            name="riskStyle"
            label="How would you describe your approach to risk?"
            options={riskStyleOptions}
            required
            helper="There is no wrong answer. This helps us match you with the right strategy and service level."
          />
          {isServiceLocked ? (
            <input type="hidden" name="mainGoal" value={derivedMainGoal} />
          ) : (
            <SelectField
              name="mainGoal"
              label="What is the primary outcome you want from joining Smart Profits Trader?"
              options={[
                "Receive daily trading signals I can act on",
                "Have my trades copied automatically into my account",
                "Have my personal account professionally managed",
                "Pass a prop firm evaluation challenge",
                "Get an instant funded trading account",
                "I need guidance – help me choose the right path"
              ]}
              required
            />
          )}
          <SelectField
            name="source"
            label="How did you hear about Smart Profits Trader?"
            options={howHeardOptions}
            helper="This helps us understand where our community is coming from."
          />
        </div>
      </FormSection>

      <FormSection title="Service Details">
        <div className="grid gap-4">
          <ServiceFields service={service} />
          <label htmlFor="application-message" className="grid gap-1 text-sm font-medium text-slate-700">
            Additional message or question
            <textarea
              id="application-message"
              name="message"
              rows={4}
              placeholder="Tell us anything else we should know about your trading goal, account, or preferred service."
              className="rounded-md border border-slate-200 px-3 py-3 text-base outline-none transition focus:border-profit-500 focus:ring-2 focus:ring-profit-100"
            />
          </label>
        </div>
      </FormSection>

      <FormSection title="Risk Acknowledgment">
        <label className="flex gap-3 rounded-md border border-slate-200 bg-slate-50 p-4 text-sm font-medium leading-6 text-slate-700">
          <input name="riskAcknowledged" type="checkbox" required className="mt-1 h-5 w-5 rounded border-slate-300 text-profit-500 focus:ring-profit-500" />
          <span>I understand that trading involves risk, results are not guaranteed, and I should only trade with funds I can afford to risk.</span>
        </label>
      </FormSection>

      {error && (
        <p role="alert" className="rounded-md border border-red-200 bg-red-50 p-3 text-sm font-semibold text-red-700">
          {error}
        </p>
      )}

      <button type="submit" disabled={submitting} className="min-h-12 rounded-md bg-profit-500 px-5 py-3 text-base font-bold text-navy-950 transition hover:bg-profit-400 disabled:cursor-not-allowed disabled:opacity-60">
        {submitting ? "Submitting..." : "Submit My Application"}
      </button>
    </form>
  );
}

function ServiceFields({ service }: { service: string }) {
  if (service.includes("VIP Signal")) {
    return (
      <>
        <RadioGroup name="goldTradingExperience" label="Do you already trade XAUUSD / Gold?" options={["Yes", "No", "I am interested but have not traded gold before"]} />
        <SelectField name="signalAccountType" label="Do you want to use the signals on a personal account or prop firm account?" options={["Personal trading account", "Prop firm account", "Both", "Not sure yet"]} />
        <SelectField name="preferredBroker" label="Preferred broker" options={brokerOptions} />
      </>
    );
  }

  if (service.includes("Copy Trading")) {
    return (
      <>
        <SelectField name="preferredBroker" label="Preferred broker" options={brokerOptions} required />
        <RadioGroup name="mtPlatform" label="Do you already have MT4 or MT5?" options={["MT4", "MT5", "I do not know", "I need help setting it up"]} />
      </>
    );
  }

  if (service.includes("Evaluation")) {
    return (
      <>
        <SelectField name="evaluationPropFirm" label="Which evaluation prop firm are you using or considering?" options={evaluationPropFirmOptions} required />
        <SelectField name="evaluationStage" label="What stage are you currently in?" options={["I have not bought a challenge yet", "Phase 1", "Phase 2", "Funded account", "Failed before and want to try again", "I need guidance"]} required />
        <SelectField name="evaluationAccountSize" label="What account size are you considering or currently using?" options={["$5,000", "$10,000", "$25,000", "$50,000", "$100,000", "Not sure yet"]} />
      </>
    );
  }

  if (service.includes("Instant Funded")) {
    return (
      <>
        <SelectField name="instantFundedProvider" label="Which instant funded provider are you interested in?" options={instantFundedProviderOptions} required />
        <SelectField name="instantFundedAccountSize" label="What instant funded account size are you interested in?" options={["$5,000", "$10,000", "$25,000", "$50,000", "Higher account size", "Not sure yet"]} />
        <RadioGroup name="readyToPaySetupFee" label="Are you ready to pay the account/setup fee if accepted?" options={["Yes", "Not yet", "I need more details first"]} required />
      </>
    );
  }

  if (service.includes("Personal Account")) {
    return (
      <>
        <SelectField name="preferredBroker" label="Preferred broker" options={brokerOptions} required />
        <SelectField name="personalManagementPreference" label="Do you want full account management or copy trading?" options={["Full personal account management", "Copy trading", "I need guidance"]} />
      </>
    );
  }

  return <p className="rounded-md bg-slate-50 p-3 text-sm leading-6 text-slate-600">Select the closest service above. If you are unsure, the team will use your answers to recommend the most suitable option.</p>;
}

function FormSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="grid gap-4 rounded-md border border-slate-200 bg-slate-50/60 p-4">
      <h2 className="text-base font-semibold text-navy-950">{title}</h2>
      {children}
    </section>
  );
}

function Field({
  name,
  label,
  type = "text",
  required = false,
  autoComplete,
  inputMode,
  placeholder,
  helper
}: {
  name: string;
  label: string;
  type?: string;
  required?: boolean;
  autoComplete?: string;
  inputMode?: React.HTMLAttributes<HTMLInputElement>["inputMode"];
  placeholder?: string;
  helper?: string;
}) {
  const id = `application-${name}`;

  return (
    <label htmlFor={id} className="grid min-w-0 gap-1.5 text-sm font-semibold text-slate-800">
      <span>
        {label}
        {required && <span className="ml-1 text-red-500">*</span>}
      </span>
      <input
        id={id}
        name={name}
        type={type}
        required={required}
        autoComplete={autoComplete}
        inputMode={inputMode}
        placeholder={placeholder}
        className="w-full rounded-md border-2 border-slate-300 bg-white px-3 py-3 text-base text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-profit-500 focus:ring-2 focus:ring-profit-100"
      />
      {helper && <span className="text-xs font-normal leading-5 text-slate-500">{helper}</span>}
    </label>
  );
}

function SelectField({
  name,
  label,
  options,
  required = false,
  helper,
  value,
  onChange
}: {
  name: string;
  label: string;
  options: Array<string | Option>;
  required?: boolean;
  helper?: string;
  value?: string;
  onChange?: (value: string) => void;
}) {
  const id = `application-${name}`;

  return (
    <label htmlFor={id} className="grid min-w-0 gap-1.5 text-sm font-semibold text-slate-800">
      <span>
        {label}
        {required && <span className="ml-1 text-red-500">*</span>}
      </span>
      <select
        id={id}
        name={name}
        required={required}
        value={value}
        onChange={onChange ? (event) => onChange(event.target.value) : undefined}
        defaultValue={value ? undefined : ""}
        className="w-full rounded-md border-2 border-slate-300 bg-white px-3 py-3 text-base text-slate-900 outline-none transition focus:border-profit-500 focus:ring-2 focus:ring-profit-100"
      >
        <option value="" disabled>
          — Select an option —
        </option>
        {options.map((option) => {
          const item = typeof option === "string" ? { value: option, label: option } : option;
          return (
            <option key={item.value} value={item.value}>
              {item.label}
            </option>
          );
        })}
      </select>
      {helper && <span className="text-xs font-normal leading-5 text-slate-500">{helper}</span>}
    </label>
  );
}

function RadioGroup({ name, label, options, required = false, helper }: { name: string; label: string; options: string[]; required?: boolean; helper?: string }) {
  return (
    <fieldset className="grid gap-2">
      <legend className="text-sm font-semibold text-slate-800">
        {label}
        {required && <span className="ml-1 text-red-500">*</span>}
      </legend>
      <div className="grid gap-2 sm:grid-cols-2">
        {options.map((option, index) => (
          <label key={option} className="flex min-h-12 cursor-pointer items-start gap-3 rounded-md border-2 border-slate-300 bg-white p-3 text-sm font-medium leading-5 text-slate-700 transition hover:border-profit-400 hover:bg-profit-50 has-[:checked]:border-profit-500 has-[:checked]:bg-profit-50">
            <input name={name} type="radio" value={option} required={required && index === 0} className="mt-0.5 h-4 w-4 border-slate-300 text-profit-500 focus:ring-profit-500" />
            <span>{option}</span>
          </label>
        ))}
      </div>
      {helper && <p className="text-xs leading-5 text-slate-500">{helper}</p>}
    </fieldset>
  );
}
