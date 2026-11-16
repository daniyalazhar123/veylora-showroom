"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ShieldCheck, Cookie, Check, X } from "lucide-react";

export default function CookieConsentBanner() {
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    try {
      const consent = localStorage.getItem("veylora_cookie_consent");
      if (!consent) {
        setShowBanner(true);
      }
    } catch {
      // In case localStorage is blocked
      setShowBanner(false);
    }
  }, []);

  const handleConsent = (choice: "accepted" | "rejected") => {
    try {
      localStorage.setItem("veylora_cookie_consent", choice);
      // Also write simple cookie for edge/middleware reference if needed
      document.cookie = `veylora_consent=${choice}; path=/; max-age=31536000; SameSite=Lax`;
    } catch {
      // Ignore storage errors
    }
    setShowBanner(false);
  };

  if (!showBanner) return null;

  return (
    <div className="fixed bottom-0 inset-x-0 z-50 p-4 sm:p-6 bg-gradient-to-t from-black via-[#0A0B0E] to-transparent pointer-events-none">
      <div className="max-w-5xl mx-auto p-5 sm:p-6 rounded-2xl bg-[#0F1014] border border-[#D4AF37]/50 shadow-[0_0_40px_rgba(0,0,0,0.95)] pointer-events-auto backdrop-blur-xl">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          {/* Information */}
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-full border border-gold-500/50 bg-gold-500/10 flex items-center justify-center">
                <Cookie className="w-3.5 h-3.5 text-gold-400" />
              </div>
              <span className="font-display font-bold text-sm text-white tracking-wider uppercase">
                Privacy &amp; Sovereign Cookie Consent
              </span>
            </div>
            <p className="text-xs text-neutral-300 leading-relaxed max-w-2xl">
              We employ only strictly essential <span className="text-gold-300 font-mono">httpOnly</span> authentication cookies to maintain your VIP sanctuary session. We do not use third-party advertising trackers or sell your personal data. Under GDPR, DPDP, and PECA, you have the equal right to reject non-essential cookies.
            </p>
            <div className="flex items-center gap-4 text-[11px] font-mono text-neutral-400 pt-1">
              <Link href="/privacy" className="text-gold-400 underline hover:text-gold-300">
                Read Privacy Policy
              </Link>
              <span>•</span>
              <Link href="/terms" className="text-gold-400 underline hover:text-gold-300">
                Terms of Service
              </Link>
            </div>
          </div>

          {/* Equal Accept / Reject Buttons (Equal Prominence) */}
          <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0">
            <button
              onClick={() => handleConsent("rejected")}
              className="w-full sm:w-auto px-5 py-2.5 rounded-xl text-xs font-mono font-bold uppercase tracking-wider border border-[#D4AF37]/40 text-neutral-300 hover:text-white hover:bg-neutral-800/80 transition-colors flex items-center justify-center gap-1.5"
            >
              <X className="w-3.5 h-3.5 text-neutral-400" />
              <span>Reject Non-Essential</span>
            </button>

            <button
              onClick={() => handleConsent("accepted")}
              className="w-full sm:w-auto btn-gold px-6 py-2.5 rounded-xl text-xs font-mono font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 shadow-gold hover:scale-[1.02] active:scale-95 transition-all text-black"
            >
              <Check className="w-3.5 h-3.5 text-black" />
              <span>Accept All Cookies</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
