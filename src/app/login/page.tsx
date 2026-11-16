"use client";

import { useState, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Lock, Mail, Shield, AlertCircle, ArrowRight, Sparkles, UserCheck } from "lucide-react";

function LoginFormContent() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const router = useRouter();
  const searchParams = useSearchParams();
  const from = searchParams.get("from");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        if (res.status === 429) {
          setError(
            data.error || "Rate limit reached: Maximum 5 login attempts allowed per minute."
          );
        } else if (data.details) {
          const firstErr = Object.values(data.details).flat()[0] as string;
          setError(firstErr || "Invalid input provided.");
        } else {
          setError(data.error || "Authentication failed.");
        }
        setLoading(false);
        return;
      }

      // Successful login - token is in httpOnly cookie!
      const targetRoute =
        from || (data.user?.role === "admin" ? "/dashboard/admin" : "/dashboard/user");

      router.push(targetRoute);
      router.refresh();
    } catch {
      setError("An unexpected connection issue occurred. Please retry.");
      setLoading(false);
    }
  };

  const handleQuickFill = (role: "admin" | "user") => {
    if (role === "admin") {
      setEmail("admin@veylora.com");
      setPassword("Admin@123");
    } else {
      setEmail("user@veylora.com");
      setPassword("User@123");
    }
    setError(null);
  };

  return (
    <div className="w-full min-h-[calc(100vh-160px)] py-16 px-4 flex items-center justify-center bg-[#070708] relative">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[400px] bg-gold-500/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="w-full max-w-md relative z-10">
        {/* Card */}
        <div className="luxury-card rounded-2xl p-8 sm:p-10 border border-borderGold/40 shadow-gold-glow">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="w-12 h-12 rounded-full border border-gold-500/50 bg-gold-500/10 flex items-center justify-center mx-auto mb-4">
              <Lock className="w-6 h-6 text-gold-400" />
            </div>
            <h1 className="font-display text-2xl sm:text-3xl font-bold text-white">
              Concierge <span className="gold-text-gradient">Sign In</span>
            </h1>
            <p className="text-xs text-neutral-400 mt-2">
              Access your VIP test drive bookings and private sanctuary fleet privileges.
            </p>
          </div>

          {/* Quick Demo Credentials Autofill */}
          <div className="mb-6 p-3 rounded-xl bg-surface border border-borderGold/30">
            <span className="text-[10px] font-mono uppercase tracking-wider text-gold-400 block mb-2 text-center">
              Quick Test Credentials:
            </span>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => handleQuickFill("admin")}
                className="py-1.5 px-2 rounded bg-surface-raised border border-gold-500/30 hover:border-gold-400 text-[11px] font-mono text-gold-300 transition-colors"
              >
                Auto-fill Admin
              </button>
              <button
                type="button"
                onClick={() => handleQuickFill("user")}
                className="py-1.5 px-2 rounded bg-surface-raised border border-gold-500/30 hover:border-gold-400 text-[11px] font-mono text-neutral-300 transition-colors"
              >
                Auto-fill Client
              </button>
            </div>
          </div>

          {/* Error Banner */}
          {error && (
            <div className="mb-6 p-3.5 rounded-lg bg-red-950/70 border border-red-500/50 text-red-200 text-xs flex items-start gap-2.5">
              <AlertCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs uppercase font-mono tracking-wider text-neutral-300 mb-1.5">
                Email Address
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-neutral-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  required
                  placeholder="admin@veylora.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 rounded-lg bg-surface border border-borderGold/30 text-white text-xs sm:text-sm focus:outline-none focus:border-gold-400 transition-colors"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs uppercase font-mono tracking-wider text-neutral-300 mb-1.5">
                Password
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-neutral-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  required
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 rounded-lg bg-surface border border-borderGold/30 text-white text-xs sm:text-sm focus:outline-none focus:border-gold-400 transition-colors"
                />
              </div>
            </div>

            <div className="pt-2">
              <button
                type="submit"
                disabled={loading}
                className="btn-gold w-full py-3.5 rounded-lg text-xs uppercase tracking-widest font-bold flex items-center justify-center gap-2 shadow-gold transition-all"
              >
                {loading ? (
                  <span>Authenticating...</span>
                ) : (
                  <>
                    <span>Enter Sanctuary</span>
                    <ArrowRight className="w-4 h-4 text-black" />
                  </>
                )}
              </button>
            </div>
          </form>

          {/* Security Notice */}
          <div className="mt-6 pt-6 border-t border-borderGold/20 text-center space-y-3">
            <div className="inline-flex items-center gap-1.5 text-[10px] font-mono text-gold-400/80">
              <Shield className="w-3.5 h-3.5 text-gold-400" />
              <span>Token Expire in 1 Hour • HttpOnly Cookie • No localStorage</span>
            </div>

            <p className="text-xs text-neutral-400">
              Do not have a sanctuary membership?{" "}
              <Link href="/signup" className="text-gold-300 font-semibold hover:underline">
                Create Account
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center text-gold-400 font-mono text-sm">
          Loading Veylora Security Portal...
        </div>
      }
    >
      <LoginFormContent />
    </Suspense>
  );
}
