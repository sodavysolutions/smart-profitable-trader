"use client";

import { useState, useCallback } from "react";
import { X, MessageCircle, ChevronDown } from "lucide-react";

const WHATSAPP_LINK =
  process.env.NEXT_PUBLIC_WHATSAPP_AI_LINK ??
  "https://wa.me/2347087970133?text=Hello%20SPT%20Support%20Team%2C%20I%20need%20help%20choosing%20the%20right%20trading%20service.";

const TELEGRAM_LINK =
  process.env.NEXT_PUBLIC_TELEGRAM_BOT_LINK ?? "https://t.me/SmartProfitsTraderBot";

function trackEvent(name: string) {
  // TODO: wire up your analytics provider here (e.g. gtag, Mixpanel, Segment)
  // Example: window.gtag?.("event", name);
  console.info("[SPT Analytics]", name);
}

// WhatsApp SVG icon (official green brand colour)
function WhatsAppIcon({ size = 20 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
    </svg>
  );
}

// Telegram SVG icon
function TelegramIcon({ size = 20 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
    </svg>
  );
}

export function FloatingChatWidget() {
  const [open, setOpen] = useState(false);

  const toggle = useCallback(() => setOpen((v) => !v), []);
  const close = useCallback(() => setOpen(false), []);

  const handleWhatsApp = useCallback(() => {
    trackEvent("whatsapp_support_team_clicked");
    window.open(WHATSAPP_LINK, "_blank", "noopener,noreferrer");
  }, []);

  const handleTelegram = useCallback(() => {
    trackEvent("telegram_bot_clicked");
    window.open(TELEGRAM_LINK, "_blank", "noopener,noreferrer");
  }, []);

  return (
    <>
      {/* Backdrop — close panel when clicking outside on mobile */}
      {open && (
        <div
          className="fixed inset-0 z-40"
          onClick={close}
          aria-hidden="true"
        />
      )}

      {/* Widget container */}
      <div
        className="fixed bottom-5 right-4 z-50 flex flex-col items-end gap-3 sm:bottom-6 sm:right-6"
        role="region"
        aria-label="Chat with the SPT Support Team"
      >
        {/* Expandable panel */}
        <div
          className={[
            "w-[300px] sm:w-[320px] overflow-hidden rounded-2xl border border-slate-200/80",
            "bg-white shadow-[0_20px_60px_rgba(10,26,60,0.18)]",
            "transition-all duration-300 ease-out origin-bottom-right",
            open
              ? "opacity-100 scale-100 translate-y-0 pointer-events-auto"
              : "opacity-0 scale-95 translate-y-2 pointer-events-none",
          ].join(" ")}
          aria-hidden={!open}
        >
          {/* Panel header */}
          <div className="flex items-center justify-between bg-[#0A1A3C] px-4 py-3">
            <div className="flex items-center gap-2">
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#16A34A]">
                <MessageCircle size={14} className="text-white" />
              </span>
              <span className="text-sm font-bold text-white">SPT Support Team</span>
            </div>
            <button
              onClick={close}
              className="flex h-7 w-7 items-center justify-center rounded-full text-slate-300 transition-colors hover:bg-white/10 hover:text-white"
              aria-label="Close chat options"
            >
              <X size={15} />
            </button>
          </div>

          {/* Panel body */}
          <div className="p-4">
            <p className="text-[13px] font-semibold text-[#0A1A3C]">
              Need help choosing the right trading service?
            </p>
            <p className="mt-1 text-[12px] leading-5 text-slate-500">
              Our support team is ready to help you choose the right trading service — available 24/7.
            </p>

            <div className="mt-4 flex flex-col gap-2">
              {/* WhatsApp button */}
              <button
                onClick={handleWhatsApp}
                className="group flex w-full items-center gap-3 rounded-xl border border-[#22c55e]/30 bg-[#f0fdf4] px-4 py-3 text-left transition-all duration-200 hover:border-[#16A34A] hover:bg-[#dcfce7] hover:shadow-sm active:scale-[0.98]"
              >
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#16A34A] text-white shadow-sm transition-transform group-hover:scale-105">
                  <WhatsAppIcon size={18} />
                </span>
                <div>
                  <p className="text-[13px] font-bold text-[#15803d]">WhatsApp Support Team</p>
                  <p className="text-[11px] text-slate-500">Chat with us on WhatsApp</p>
                </div>
              </button>

              {/* Telegram button */}
              <button
                onClick={handleTelegram}
                className="group flex w-full items-center gap-3 rounded-xl border border-[#0088cc]/20 bg-[#f0f9ff] px-4 py-3 text-left transition-all duration-200 hover:border-[#0088cc] hover:bg-[#e0f2fe] hover:shadow-sm active:scale-[0.98]"
              >
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#0088cc] text-white shadow-sm transition-transform group-hover:scale-105">
                  <TelegramIcon size={18} />
                </span>
                <div>
                  <p className="text-[13px] font-bold text-[#0369a1]">Telegram Support Team</p>
                  <p className="text-[11px] text-slate-500">Chat with us on Telegram</p>
                </div>
              </button>
            </div>

            <p className="mt-3 text-center text-[10px] text-slate-400">
              SPT Support Team · Available 24/7
            </p>
          </div>
        </div>

        {/* Floating trigger button */}
        <button
          onClick={toggle}
          aria-expanded={open}
          aria-label={open ? "Close chat widget" : "Chat with the SPT Support Team"}
          className={[
            "flex items-center gap-2 rounded-full px-4 py-3 sm:px-5",
            "bg-[#0A1A3C] text-white font-bold text-[13px] sm:text-sm",
            "shadow-[0_8px_30px_rgba(10,26,60,0.35)]",
            "border-2 border-[#16A34A]",
            "transition-all duration-200",
            "hover:bg-[#16A34A] hover:border-[#16A34A] hover:shadow-[0_10px_35px_rgba(22,163,74,0.4)]",
            "active:scale-95",
            open ? "bg-[#16A34A] border-[#16A34A]" : "",
          ].join(" ")}
        >
          <MessageCircle size={18} className="shrink-0" />
          <span className="hidden sm:inline">Chat With SPT Support Team</span>
          <span className="sm:hidden">SPT Support</span>
          <ChevronDown
            size={15}
            className={[
              "shrink-0 transition-transform duration-200",
              open ? "rotate-180" : "",
            ].join(" ")}
          />
        </button>
      </div>
    </>
  );
}
