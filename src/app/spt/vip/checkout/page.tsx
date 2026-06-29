"use client";

import { useState } from "react";
import { ArrowRight, Copy, CheckCircle2 } from "lucide-react";

const CRYPTO_WALLETS = [
  {
    network: "TRC20",
    coin: "USDT / USDC",
    address: "TNZUoUMagqyktuHbjJLGfwG1mL2N7GiwVM",
    color: "text-red-400",
    badge: "bg-red-500/10 border-red-500/30 text-red-400",
  },
  {
    network: "BEP20",
    coin: "USDT / USDC",
    address: "0x00b6cb559b7b581f49282595b872e47589c51e70",
    color: "text-yellow-400",
    badge: "bg-yellow-500/10 border-yellow-500/30 text-yellow-400",
  },
];

export default function VipCheckoutPage() {
  const [method, setMethod] = useState<"PAYSTACK" | "CRYPTO">("PAYSTACK");
  const [cryptoNetwork, setCryptoNetwork] = useState("TRC20");
  const [copiedAddr, setCopiedAddr] = useState<string | null>(null);
  const [form, setForm] = useState({ name: "", email: "", phone: "", cryptoTxHash: "" });
  const [loading, setLoading] = useState(false);
  const [cryptoDone, setCryptoDone] = useState(false);
  const [error, setError] = useState("");

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  }

  async function copyAddress(addr: string) {
    await navigator.clipboard.writeText(addr);
    setCopiedAddr(addr);
    setTimeout(() => setCopiedAddr(null), 2000);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/vip/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, paymentMethod: method, cryptoNetwork }),
      });

      const data = await res.json();

      if (!data.success) {
        setError(data.error ?? "Something went wrong. Please try again.");
        return;
      }

      if (method === "PAYSTACK" && data.authorizationUrl) {
        window.location.href = data.authorizationUrl;
      } else if (method === "CRYPTO") {
        setCryptoDone(true);
      }
    } catch {
      setError("Network error. Please check your connection and try again.");
    } finally {
      setLoading(false);
    }
  }

  const selectedWallet = CRYPTO_WALLETS.find((w) => w.network === cryptoNetwork) ?? CRYPTO_WALLETS[0];

  if (cryptoDone) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-gradient-to-br from-navy-950 via-[#0a2240] to-[#071F3D] px-4">
        <div className="w-full max-w-md rounded-2xl border border-profit-500/30 bg-white/5 p-8 text-center">
          <CheckCircle2 className="mx-auto mb-4 h-14 w-14 text-profit-400" />
          <h1 className="mb-3 text-2xl font-extrabold text-white">Submission Received!</h1>
          <p className="text-slate-300">
            Your transaction has been submitted for review. Once we confirm your payment on-chain, you&apos;ll receive your Telegram invite link by email within <strong>1–2 hours</strong>.
          </p>
          <p className="mt-4 text-sm text-slate-400">
            Sent to: <span className="text-profit-400">{form.email}</span>
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-navy-950 via-[#0a2240] to-[#071F3D] py-16 px-4">
      <div className="mx-auto max-w-lg">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-extrabold text-white">Subscribe to VIP Signals</h1>
          <p className="mt-2 text-slate-400">$50 / month · 30-day access · instant Telegram invite</p>
        </div>

        <div className="rounded-2xl border border-white/10 bg-white/5 p-6 sm:p-8">
          {/* Payment method toggle */}
          <div className="mb-6 grid grid-cols-2 gap-2 rounded-xl border border-white/10 bg-white/5 p-1">
            {(["PAYSTACK", "CRYPTO"] as const).map((m) => (
              <button
                key={m}
                type="button"
                onClick={() => setMethod(m)}
                className={`rounded-lg py-2.5 text-sm font-bold transition ${
                  method === m
                    ? "bg-profit-500 text-navy-950"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                {m === "PAYSTACK" ? "💳 Paystack (NGN)" : "₿ Crypto (USDT/USDC)"}
              </button>
            ))}
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Common fields */}
            <div>
              <label className="mb-1 block text-sm font-semibold text-slate-300">Full Name</label>
              <input
                name="name"
                value={form.name}
                onChange={handleChange}
                required
                placeholder="John Doe"
                className="w-full rounded-xl border border-white/10 bg-white/10 px-4 py-3 text-white placeholder-slate-500 focus:border-profit-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="mb-1 block text-sm font-semibold text-slate-300">Email Address</label>
              <input
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                required
                placeholder="you@email.com"
                className="w-full rounded-xl border border-white/10 bg-white/10 px-4 py-3 text-white placeholder-slate-500 focus:border-profit-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="mb-1 block text-sm font-semibold text-slate-300">Phone Number (linked to your Telegram)</label>
              <input
                name="phone"
                type="tel"
                value={form.phone}
                onChange={handleChange}
                required
                placeholder="+234 70 0000 0000"
                className="w-full rounded-xl border border-white/10 bg-white/10 px-4 py-3 text-white placeholder-slate-500 focus:border-profit-500 focus:outline-none"
              />
              <p className="mt-1 text-xs text-slate-500">Use the phone number registered on your Telegram account.</p>
            </div>

            {/* Crypto-specific fields */}
            {method === "CRYPTO" && (
              <div className="space-y-4">
                {/* Network selector */}
                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-300">Select Network</label>
                  <div className="grid grid-cols-2 gap-2">
                    {CRYPTO_WALLETS.map((w) => (
                      <button
                        key={w.network}
                        type="button"
                        onClick={() => setCryptoNetwork(w.network)}
                        className={`rounded-xl border px-4 py-3 text-left transition ${
                          cryptoNetwork === w.network
                            ? `${w.badge} border-current`
                            : "border-white/10 bg-white/5 text-slate-400 hover:border-white/20"
                        }`}
                      >
                        <span className="block text-sm font-bold">{w.network}</span>
                        <span className="block text-xs opacity-70">{w.coin}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Wallet address */}
                <div>
                  <label className="mb-1 block text-sm font-semibold text-slate-300">Send exactly <span className="text-profit-400">$50 USDT or USDC</span> to:</label>
                  <div className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/10 px-4 py-3">
                    <code className="flex-1 break-all text-xs text-profit-400">{selectedWallet.address}</code>
                    <button
                      type="button"
                      onClick={() => copyAddress(selectedWallet.address)}
                      className="shrink-0 text-slate-400 hover:text-white"
                      title="Copy address"
                    >
                      {copiedAddr === selectedWallet.address ? (
                        <CheckCircle2 size={16} className="text-profit-400" />
                      ) : (
                        <Copy size={16} />
                      )}
                    </button>
                  </div>
                  <p className="mt-1 text-xs text-red-400">⚠️ Only send on the <strong>{selectedWallet.network}</strong> network. Sending on the wrong network will result in loss of funds.</p>
                </div>

                {/* TX hash */}
                <div>
                  <label className="mb-1 block text-sm font-semibold text-slate-300">Transaction Hash (after payment)</label>
                  <input
                    name="cryptoTxHash"
                    value={form.cryptoTxHash}
                    onChange={handleChange}
                    required={method === "CRYPTO"}
                    placeholder="0x... or T..."
                    className="w-full rounded-xl border border-white/10 bg-white/10 px-4 py-3 text-white placeholder-slate-500 focus:border-profit-500 focus:outline-none font-mono text-xs"
                  />
                  <p className="mt-1 text-xs text-slate-500">Copy the TX ID from your wallet after sending payment.</p>
                </div>
              </div>
            )}

            {error && <p className="rounded-lg bg-red-500/10 px-4 py-3 text-sm text-red-400">{error}</p>}

            <button
              type="submit"
              disabled={loading}
              className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-profit-500 px-6 py-4 text-base font-bold text-navy-950 shadow-[0_12px_30px_rgba(32,199,111,0.3)] transition hover:bg-profit-400 disabled:opacity-60"
            >
              {loading ? "Processing…" : method === "PAYSTACK" ? "Pay with Paystack →" : "Submit Payment →"}
              {!loading && <ArrowRight size={18} />}
            </button>

            {method === "PAYSTACK" && (
              <p className="text-center text-xs text-slate-500">You&apos;ll be redirected to Paystack to complete payment securely. ₦80,000 (~$50 USD).</p>
            )}
          </form>
        </div>
      </div>
    </main>
  );
}
