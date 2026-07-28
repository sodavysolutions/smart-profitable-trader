"use client";

import { useEffect, useRef, useState } from "react";
import { SPTAdminShell } from "@/components/spt/admin-shell";
import { Card } from "@/components/UI";
import {
  AlertCircle,
  CheckCircle,
  ChevronDown,
  FileText,
  Loader2,
  MessageSquare,
  Plus,
  Send,
  Users,
  Zap,
} from "lucide-react";

// ── Types ────────────────────────────────────────────────────
type Platform = "WHATSAPP" | "TELEGRAM";
type MessageMode = "freeform" | "template";

interface SendResult {
  contactId: string;
  name: string | null;
  identifier: string;
  platform: Platform;
  ok: boolean;
  error?: string;
}

interface BroadcastResponse {
  ok: boolean;
  sent: number;
  failed: number;
  total: number;
  results: SendResult[];
}

interface Counts {
  whatsapp: number;
  telegram: number;
}

interface WaTemplate {
  id: string;
  name: string;
  status: "APPROVED" | "PENDING" | "REJECTED" | string;
  category: string;
  language: string;
  bodyText: string;
}

// ── Page ─────────────────────────────────────────────────────
export default function ChatbotBroadcastPage() {
  const [counts, setCounts] = useState<Counts | null>(null);
  const [platforms, setPlatforms] = useState<Platform[]>(["WHATSAPP", "TELEGRAM"]);
  const [mode, setMode] = useState<MessageMode>("freeform");
  const [message, setMessage] = useState("");
  const [templates, setTemplates] = useState<WaTemplate[] | null>(null);
  const [selectedTemplate, setSelectedTemplate] = useState<WaTemplate | null>(null);
  const [loadingTemplates, setLoadingTemplates] = useState(false);
  const [submittingDefaults, setSubmittingDefaults] = useState(false);
  const [defaultsResult, setDefaultsResult] = useState<string | null>(null);
  const [templateDropOpen, setTemplateDropOpen] = useState(false);
  const [sending, setSending] = useState(false);
  const [result, setResult] = useState<BroadcastResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [showResults, setShowResults] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Fetch contact counts on mount
  useEffect(() => {
    fetch("/api/spt/chatbot/broadcast")
      .then((r) => r.json())
      .then(setCounts)
      .catch(() => setCounts({ whatsapp: 0, telegram: 0 }));
  }, []);

  // Fetch templates when switching to template mode
  useEffect(() => {
    if (mode !== "template" || templates !== null) return;
    setLoadingTemplates(true);
    fetch("/api/spt/chatbot/templates")
      .then((r) => r.json())
      .then((d) => setTemplates(d.templates ?? []))
      .catch(() => setTemplates([]))
      .finally(() => setLoadingTemplates(false));
  }, [mode, templates]);

  function togglePlatform(p: Platform) {
    setPlatforms((prev) =>
      prev.includes(p) ? prev.filter((x) => x !== p) : [...prev, p]
    );
  }

  function recipientCount() {
    if (!counts) return 0;
    let n = 0;
    if (platforms.includes("WHATSAPP")) n += counts.whatsapp;
    if (platforms.includes("TELEGRAM")) n += counts.telegram;
    return n;
  }

  async function handleSubmitDefaults() {
    setSubmittingDefaults(true);
    setDefaultsResult(null);
    try {
      const res = await fetch("/api/spt/chatbot/templates", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ setupDefaults: true }),
      });
      const d = await res.json();
      const ok = d.results?.filter((r: { ok: boolean }) => r.ok).length ?? 0;
      const fail = d.results?.filter((r: { ok: boolean }) => !r.ok).length ?? 0;
      setDefaultsResult(
        fail === 0
          ? `${ok} template${ok === 1 ? "" : "s"} submitted for Meta approval. Check back in a few minutes.`
          : `${ok} submitted, ${fail} failed. Some may already exist — that is fine.`
      );
      // Refresh template list
      setTemplates(null);
    } catch {
      setDefaultsResult("Error submitting templates — try again.");
    } finally {
      setSubmittingDefaults(false);
    }
  }

  async function handleSend() {
    if (mode === "template" && !selectedTemplate) return;
    if (mode === "freeform" && !message.trim()) return;
    if (!platforms.length) return;

    const label =
      mode === "template"
        ? `template "${selectedTemplate!.name}"`
        : "this message";

    const confirmed = confirm(
      `Send ${label} to ${recipientCount()} contact${recipientCount() === 1 ? "" : "s"}?\n\nYou cannot undo this.`
    );
    if (!confirmed) return;

    setSending(true);
    setResult(null);
    setError(null);
    setShowResults(false);

    try {
      const body: Record<string, unknown> = { platforms };
      if (mode === "template") {
        body.templateName = selectedTemplate!.name;
        // Telegram gets a plain-text version of the template (no WA template API)
        body.message = selectedTemplate!.bodyText.replace(/\{\{1\}\}/g, "Friend");
      } else {
        body.message = message.trim();
      }

      const res = await fetch("/api/spt/chatbot/broadcast", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error ?? "Failed to send broadcast.");
      } else {
        setResult(data);
        setMessage("");
      }
    } catch {
      setError("Network error — could not reach the server.");
    } finally {
      setSending(false);
    }
  }

  const approvedTemplates = (templates ?? []).filter((t) => t.status === "APPROVED");
  const pendingTemplates = (templates ?? []).filter((t) => t.status === "PENDING");

  const canSend =
    !sending &&
    platforms.length > 0 &&
    (mode === "freeform" ? message.trim().length > 0 : selectedTemplate !== null);

  return (
    <SPTAdminShell title="Broadcast Center" role="SUPER_ADMIN">
      {/* Warning banner */}
      <div className="mb-5 flex items-start gap-3 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800">
        <AlertCircle size={16} className="mt-0.5 shrink-0" />
        <div>
          <p className="font-semibold">WhatsApp 24-hour window</p>
          <p className="mt-0.5 text-amber-700">
            Free-form messages only reach contacts who messaged you in the last 24 hours.
            Use <strong>Template mode</strong> to bypass this and reach everyone.
            Telegram has no restriction.
          </p>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* ── Left: composer ─────────────────────────────── */}
        <div className="lg:col-span-2 space-y-5">
          {/* Platform selector */}
          <Card>
            <p className="mb-3 text-sm font-bold text-[#0A1A3C]">Send to</p>
            <div className="flex flex-wrap gap-3">
              {(["WHATSAPP", "TELEGRAM"] as Platform[]).map((p) => {
                const active = platforms.includes(p);
                const count = p === "WHATSAPP" ? counts?.whatsapp : counts?.telegram;
                return (
                  <button
                    key={p}
                    type="button"
                    onClick={() => togglePlatform(p)}
                    className={`inline-flex items-center gap-2 rounded-xl border px-4 py-3 text-sm font-semibold transition-all ${
                      active
                        ? p === "WHATSAPP"
                          ? "border-green-300 bg-green-50 text-green-800"
                          : "border-sky-300 bg-sky-50 text-sky-800"
                        : "border-slate-200 bg-white text-slate-500 hover:border-slate-300"
                    }`}
                  >
                    <span
                      className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full ${
                        active ? "bg-current opacity-100" : "border border-slate-300"
                      }`}
                    >
                      {active && <CheckCircle size={14} className="text-white" style={{ color: "white" }} />}
                    </span>
                    {p === "WHATSAPP" ? "WhatsApp" : "Telegram"}
                    {counts !== null && (
                      <span className={`rounded-full px-2 py-0.5 text-[11px] font-bold tabular-nums ${
                        active
                          ? p === "WHATSAPP" ? "bg-green-200 text-green-800" : "bg-sky-200 text-sky-800"
                          : "bg-slate-100 text-slate-500"
                      }`}>
                        {count ?? 0}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </Card>

          {/* Message mode toggle */}
          <Card>
            <p className="mb-3 text-sm font-bold text-[#0A1A3C]">Message type</p>
            <div className="flex gap-2 rounded-xl bg-slate-100 p-1">
              <button
                type="button"
                onClick={() => setMode("freeform")}
                className={`flex-1 inline-flex items-center justify-center gap-2 rounded-lg px-4 py-2.5 text-sm font-semibold transition-all ${
                  mode === "freeform"
                    ? "bg-white text-[#0A1A3C] shadow-sm"
                    : "text-slate-500 hover:text-slate-700"
                }`}
              >
                <MessageSquare size={14} />
                Free-form
              </button>
              <button
                type="button"
                onClick={() => setMode("template")}
                className={`flex-1 inline-flex items-center justify-center gap-2 rounded-lg px-4 py-2.5 text-sm font-semibold transition-all ${
                  mode === "template"
                    ? "bg-white text-[#0A1A3C] shadow-sm"
                    : "text-slate-500 hover:text-slate-700"
                }`}
              >
                <Zap size={14} />
                Template
                <span className="rounded-full bg-green-100 px-2 py-0.5 text-[10px] font-bold text-green-700">
                  Bypasses 24h
                </span>
              </button>
            </div>

            {/* Free-form composer */}
            {mode === "freeform" && (
              <div className="mt-4">
                <textarea
                  ref={textareaRef}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  rows={8}
                  placeholder="Type your message here…&#10;&#10;Keep it clear and personal. For Telegram you can use basic HTML: <b>bold</b>, <i>italic</i>."
                  className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#0A1A3C]/20 resize-none"
                />
                <div className="mt-2 flex items-center justify-between">
                  <span className="text-xs text-slate-400">{message.length} characters</span>
                  {message.length > 1000 && (
                    <span className="text-xs font-semibold text-amber-600">
                      Long messages may be truncated on WhatsApp
                    </span>
                  )}
                </div>
              </div>
            )}

            {/* Template picker */}
            {mode === "template" && (
              <div className="mt-4 space-y-4">
                {loadingTemplates ? (
                  <div className="flex items-center gap-2 text-sm text-slate-400 py-2">
                    <Loader2 size={14} className="animate-spin" /> Loading templates…
                  </div>
                ) : templates !== null && approvedTemplates.length === 0 && pendingTemplates.length === 0 ? (
                  /* No templates at all */
                  <div className="rounded-xl border border-dashed border-slate-300 bg-slate-50 px-5 py-6 text-center">
                    <FileText size={28} className="mx-auto mb-3 text-slate-300" />
                    <p className="text-sm font-semibold text-slate-700 mb-1">No templates yet</p>
                    <p className="text-xs text-slate-500 mb-4">
                      Submit the default SPT templates to Meta for approval. Approval usually takes a few minutes to 24 hours.
                    </p>
                    <button
                      type="button"
                      onClick={handleSubmitDefaults}
                      disabled={submittingDefaults}
                      className="inline-flex items-center gap-2 rounded-lg bg-[#0A1A3C] px-5 py-2.5 text-sm font-bold text-white hover:bg-[#16A34A] disabled:opacity-50 transition-colors"
                    >
                      {submittingDefaults
                        ? <><Loader2 size={13} className="animate-spin" /> Submitting…</>
                        : <><Plus size={13} /> Submit Default Templates</>
                      }
                    </button>
                    {defaultsResult && (
                      <p className="mt-3 text-xs font-semibold text-green-700">{defaultsResult}</p>
                    )}
                  </div>
                ) : (
                  <>
                    {/* Pending notice */}
                    {pendingTemplates.length > 0 && approvedTemplates.length === 0 && (
                      <div className="flex items-start gap-2 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800">
                        <AlertCircle size={14} className="mt-0.5 shrink-0" />
                        <span>
                          {pendingTemplates.length} template{pendingTemplates.length > 1 ? "s are" : " is"} pending Meta approval.
                          Check back in a few minutes.
                        </span>
                      </div>
                    )}

                    {/* Template dropdown */}
                    {approvedTemplates.length > 0 && (
                      <div className="relative">
                        <button
                          type="button"
                          onClick={() => setTemplateDropOpen((v) => !v)}
                          className="w-full flex items-center justify-between rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-left hover:border-slate-300 transition-colors"
                        >
                          <span className={selectedTemplate ? "text-[#0A1A3C] font-semibold" : "text-slate-400"}>
                            {selectedTemplate ? selectedTemplate.name : "Select a template…"}
                          </span>
                          <ChevronDown size={15} className={`text-slate-400 transition-transform ${templateDropOpen ? "rotate-180" : ""}`} />
                        </button>
                        {templateDropOpen && (
                          <div className="absolute z-20 mt-1 w-full rounded-xl border border-slate-200 bg-white shadow-lg overflow-hidden">
                            {approvedTemplates.map((t) => (
                              <button
                                key={t.id}
                                type="button"
                                onClick={() => { setSelectedTemplate(t); setTemplateDropOpen(false); }}
                                className={`w-full text-left px-4 py-3 text-sm border-b border-slate-100 last:border-0 hover:bg-slate-50 transition-colors ${
                                  selectedTemplate?.id === t.id ? "bg-green-50 font-semibold text-green-800" : "text-[#0A1A3C]"
                                }`}
                              >
                                <p className="font-semibold">{t.name}</p>
                                <p className="text-xs text-slate-500 mt-0.5 truncate">{t.bodyText.slice(0, 80)}…</p>
                              </button>
                            ))}
                          </div>
                        )}
                      </div>
                    )}

                    {/* Template preview */}
                    {selectedTemplate && (
                      <div className="rounded-xl border border-green-200 bg-green-50 px-4 py-4">
                        <p className="text-[11px] font-bold text-green-700 uppercase tracking-wider mb-2">Preview</p>
                        <p className="text-sm text-slate-700 whitespace-pre-wrap leading-relaxed">
                          {selectedTemplate.bodyText.replace(/\{\{1\}\}/g, "[Contact Name]")}
                        </p>
                        <p className="mt-3 text-[11px] text-slate-400">
                          {"{{1}}"} is replaced with each contact&apos;s first name automatically.
                          Telegram contacts receive the same text as free-form.
                        </p>
                      </div>
                    )}

                    {/* Re-submit link */}
                    <div className="flex items-center gap-3">
                      <button
                        type="button"
                        onClick={handleSubmitDefaults}
                        disabled={submittingDefaults}
                        className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-[#0A1A3C] transition-colors disabled:opacity-50"
                      >
                        {submittingDefaults ? <Loader2 size={11} className="animate-spin" /> : <Plus size={11} />}
                        Re-submit default templates
                      </button>
                      {defaultsResult && (
                        <span className="text-xs text-green-700 font-semibold">{defaultsResult}</span>
                      )}
                    </div>
                  </>
                )}
              </div>
            )}
          </Card>

          {/* Send button */}
          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={handleSend}
              disabled={!canSend}
              className="inline-flex items-center gap-2 rounded-xl bg-[#0A1A3C] px-6 py-3 text-sm font-bold text-white shadow-sm hover:bg-[#16A34A] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {sending ? (
                <><Loader2 size={15} className="animate-spin" /> Sending…</>
              ) : (
                <><Send size={15} /> Send Broadcast</>
              )}
            </button>
            {!sending && platforms.length > 0 && counts !== null && (
              <p className="text-sm text-slate-500">
                Will reach{" "}
                <span className="font-bold text-[#0A1A3C]">{recipientCount()}</span>{" "}
                contact{recipientCount() === 1 ? "" : "s"}
              </p>
            )}
          </div>

          {/* Error */}
          {error && (
            <div className="flex items-center gap-2 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-semibold text-red-700">
              <AlertCircle size={15} className="shrink-0" />
              {error}
            </div>
          )}

          {/* Result summary */}
          {result && (
            <div className={`rounded-xl border px-4 py-4 ${result.failed === 0 ? "border-green-200 bg-green-50" : "border-amber-200 bg-amber-50"}`}>
              <div className="flex items-center gap-2 font-bold text-sm text-[#0A1A3C] mb-1">
                <CheckCircle size={15} className="text-green-600" />
                Broadcast complete
              </div>
              <p className="text-sm text-slate-600">
                <span className="font-bold text-green-700">{result.sent} sent</span>
                {result.failed > 0 && (
                  <>, <span className="font-bold text-red-600">{result.failed} failed</span></>
                )}{" "}
                out of <span className="font-semibold">{result.total}</span> contacts.
              </p>
              {result.results.length > 0 && (
                <button
                  type="button"
                  onClick={() => setShowResults((v) => !v)}
                  className="mt-2 text-xs font-semibold text-[#0A1A3C] underline underline-offset-2"
                >
                  {showResults ? "Hide" : "Show"} delivery details
                </button>
              )}
            </div>
          )}

          {/* Delivery log */}
          {showResults && result && (
            <Card>
              <p className="mb-3 text-sm font-bold text-[#0A1A3C]">Delivery log</p>
              <div className="max-h-72 overflow-y-auto space-y-1.5">
                {result.results.map((r, i) => (
                  <div key={i} className={`flex items-start gap-2 rounded-lg px-3 py-2 text-xs ${r.ok ? "bg-green-50" : "bg-red-50"}`}>
                    {r.ok
                      ? <CheckCircle size={12} className="mt-0.5 shrink-0 text-green-600" />
                      : <AlertCircle size={12} className="mt-0.5 shrink-0 text-red-600" />
                    }
                    <div className="min-w-0">
                      <p className="font-semibold text-slate-700">{r.name ?? "Unknown"}</p>
                      <p className="text-slate-400 truncate">{r.platform} · {r.identifier}</p>
                      {r.error && <p className="text-red-600 mt-0.5">{r.error}</p>}
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          )}
        </div>

        {/* ── Right: sidebar ──────────────────────────────── */}
        <div className="space-y-4">
          <Card>
            <div className="flex items-center gap-2 mb-3">
              <Users size={16} className="text-[#0A1A3C]" />
              <p className="text-sm font-bold text-[#0A1A3C]">Audience</p>
            </div>
            {counts === null ? (
              <div className="flex items-center gap-2 text-sm text-slate-400">
                <Loader2 size={13} className="animate-spin" /> Loading…
              </div>
            ) : (
              <div className="space-y-2">
                <div className="flex items-center justify-between rounded-lg bg-green-50 px-3 py-2">
                  <span className="text-sm font-semibold text-green-800">WhatsApp</span>
                  <span className="text-lg font-bold text-green-700 tabular-nums">{counts.whatsapp}</span>
                </div>
                <div className="flex items-center justify-between rounded-lg bg-sky-50 px-3 py-2">
                  <span className="text-sm font-semibold text-sky-800">Telegram</span>
                  <span className="text-lg font-bold text-sky-700 tabular-nums">{counts.telegram}</span>
                </div>
                <div className="flex items-center justify-between rounded-lg bg-slate-100 px-3 py-2">
                  <span className="text-sm font-semibold text-slate-700">Total</span>
                  <span className="text-lg font-bold text-slate-800 tabular-nums">{counts.whatsapp + counts.telegram}</span>
                </div>
              </div>
            )}
          </Card>

          <Card>
            <div className="flex items-center gap-2 mb-3">
              <Zap size={16} className="text-[#0A1A3C]" />
              <p className="text-sm font-bold text-[#0A1A3C]">Templates vs Free-form</p>
            </div>
            <ul className="space-y-3 text-xs text-slate-600">
              <li className="flex gap-2">
                <span className="mt-0.5 shrink-0 font-bold text-green-600">✓</span>
                <span><strong>Templates</strong> bypass the 24h window — reach all contacts any time.</span>
              </li>
              <li className="flex gap-2">
                <span className="mt-0.5 shrink-0 font-bold text-amber-500">!</span>
                <span><strong>Free-form</strong> only reaches contacts who messaged you in the last 24 hours.</span>
              </li>
              <li className="flex gap-2">
                <span className="mt-0.5 shrink-0 font-bold text-sky-600">i</span>
                <span>Templates must be approved by Meta first. Approval is usually within minutes to 24h.</span>
              </li>
              <li className="flex gap-2">
                <span className="mt-0.5 shrink-0 font-bold text-[#0A1A3C]">→</span>
                <span>Telegram always receives free-form text — no templates needed.</span>
              </li>
            </ul>
          </Card>

          <Card>
            <div className="flex items-center gap-2 mb-3">
              <MessageSquare size={16} className="text-[#0A1A3C]" />
              <p className="text-sm font-bold text-[#0A1A3C]">Tips</p>
            </div>
            <ul className="space-y-2.5 text-xs text-slate-600">
              <li className="flex gap-2">
                <span className="mt-0.5 shrink-0 font-bold text-[#0A1A3C]">→</span>
                <span>Keep messages short and personal. Long messages get lower open rates.</span>
              </li>
              <li className="flex gap-2">
                <span className="mt-0.5 shrink-0 font-bold text-[#0A1A3C]">→</span>
                <span>Always include a call to action — "Reply YES", "Click the link", etc.</span>
              </li>
              <li className="flex gap-2">
                <span className="mt-0.5 shrink-0 font-bold text-[#0A1A3C]">→</span>
                <span>Telegram supports <code className="bg-slate-100 px-1 rounded">&lt;b&gt;</code>, <code className="bg-slate-100 px-1 rounded">&lt;i&gt;</code>, and <code className="bg-slate-100 px-1 rounded">&lt;a href=""&gt;</code> HTML tags.</span>
              </li>
            </ul>
          </Card>
        </div>
      </div>
    </SPTAdminShell>
  );
}
