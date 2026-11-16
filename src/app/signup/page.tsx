"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { UserPlus, Mail, Lock, Phone, User, Shield, AlertCircle, ArrowRight, Sparkles } from "lucide-react";

export default function SignupPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [termsConsent, setTermsConsent] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (password !== confirmPassword) {
      setError("Passwords do not match. Please re-enter.");
      return;
    }

    if (!termsConsent) {
      setError("You must acknowledge and accept VEYLORA's Terms of Service and Privacy Policy.");
      return;
    }

    // Client-side age validation (18+)
    if (dateOfBirth) {
      const birth = new Date(dateOfBirth);
      const today = new Date();
      let age = today.getFullYear() - birth.getFullYear();
      const m = today.getMonth() - birth.getMonth();
      if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) {
        age--;
      }
      if (age < 18) {
        setError("Underage restriction: You must be at least 18 years old to establish a driving membership.");
        return;
      }
    } else {
      setError("Please provide your Date of Birth for driver qualification verification.");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          phone,
          dateOfBirth,
          termsConsent,
          password,
          confirmPassword,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        if (data.details) {
          const firstErr = Object.values(data.details).flat()[0] as string;
          setError(firstErr || "Invalid membership details provided.");
        } else {
          setError(data.error || "Failed to create membership account.");
        }
        setLoading(false);
        return;
      }

      // Automatically signed in with 1-hour httpOnly cookie
      router.push("/dashboard/user");
      router.refresh();
    } catch {
      setError("An unexpected connection issue occurred. Please retry.");
      setLoading(false);
    }
  };

  return (
    <div className="w-full min-h-[calc(100vh-160px)] py-16 px-4 flex items-center justify-center bg-[#070708] relative">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[450px] bg-gold-500/10 rounded-full blur-[110px] pointer-events-none" />

      <div className="w-full max-w-lg relative z-10">
        <div className="luxury-card rounded-2xl p-8 sm:p-10 border border-borderGold/40 shadow-gold-glow">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="w-12 h-12 rounded-full border border-gold-500/50 bg-gold-500/10 flex items-center justify-center mx-auto mb-4">
              <UserPlus className="w-6 h-6 text-gold-400" />
            </div>
            <h1 className="font-display text-2xl sm:text-3xl font-bold text-white">
              Join <span className="gold-text-gradient">VEYLORA Sanctuary</span>
            </h1>
            <p className="text-xs text-neutral-400 mt-2">
              Create your privileged membership for private test drive bookings and VIP automotive invitations.
            </p>
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
                Full Legal Name *
              </label>
              <div className="relative">
                <User className="w-4 h-4 text-neutral-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  required
                  placeholder="e.g. Tariq Mansoor"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 rounded-lg bg-surface border border-borderGold/30 text-white text-xs sm:text-sm focus:outline-none focus:border-gold-400 transition-colors"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs uppercase font-mono tracking-wider text-neutral-300 mb-1.5">
                  Email Address *
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-neutral-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    required
                    placeholder="client@domain.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 rounded-lg bg-surface border border-borderGold/30 text-white text-xs sm:text-sm focus:outline-none focus:border-gold-400 transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs uppercase font-mono tracking-wider text-neutral-300 mb-1.5">
                  Phone Number *
                </label>
                <div className="relative">
                  <Phone className="w-4 h-4 text-neutral-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="tel"
                    required
                    placeholder="+92 300 1234567"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 rounded-lg bg-surface border border-borderGold/30 text-white text-xs sm:text-sm focus:outline-none focus:border-gold-400 transition-colors"
                  />
                </div>
              </div>
            </div>

            <div>
              <label className="block text-xs uppercase font-mono tracking-wider text-neutral-300 mb-1.5">
                Date of Birth (18+ Driver Qualification) *
              </label>
              <input
                type="date"
                required
                max={new Date(Date.now() - 18 * 365.25 * 24 * 3600 * 1000).toISOString().split("T")[0]}
                value={dateOfBirth}
                onChange={(e) => setDateOfBirth(e.target.value)}
                className="w-full px-3.5 py-3 rounded-lg bg-surface border border-borderGold/30 text-white text-xs sm:text-sm focus:outline-none focus:border-gold-400 transition-colors scheme-dark"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs uppercase font-mono tracking-wider text-neutral-300 mb-1.5">
                  Password (8+ Chars, Upper+Num) *
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

              <div>
                <label className="block text-xs uppercase font-mono tracking-wider text-neutral-300 mb-1.5">
                  Confirm Password *
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-neutral-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="password"
                    required
                    placeholder="••••••••"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 rounded-lg bg-surface border border-borderGold/30 text-white text-xs sm:text-sm focus:outline-none focus:border-gold-400 transition-colors"
                  />
                </div>
              </div>
            </div>

            {/* Explicit Legal Consent Checkbox (GDPR Art. 7, DPDP, PECA) */}
            <div className="p-3.5 rounded-xl bg-surface border border-borderGold/30 space-y-1.5">
              <label className="flex items-start gap-2.5 cursor-pointer text-xs text-neutral-300">
                <input
                  type="checkbox"
                  required
                  checked={termsConsent}
                  onChange={(e) => setTermsConsent(e.target.checked)}
                  className="mt-0.5 w-4 h-4 rounded border-borderGold/50 accent-[#D4AF37] cursor-pointer"
                />
                <span>
                  I confirm I am at least 18 years of age and agree to VEYLORA&apos;s{" "}
                  <Link href="/terms" target="_blank" className="text-gold-400 underline hover:text-gold-300">
                    Terms of Service
                  </Link>{" "}
                  and{" "}
                  <Link href="/privacy" target="_blank" className="text-gold-400 underline hover:text-gold-300">
                    Privacy Policy
                  </Link>.
                </span>
              </label>
            </div>

            <div className="pt-2">
              <button
                type="submit"
                disabled={loading}
                className="btn-gold w-full py-3.5 rounded-lg text-xs uppercase tracking-widest font-bold flex items-center justify-center gap-2 shadow-gold transition-all"
              >
                {loading ? (
                  <span>Establishing Membership...</span>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4 text-black" />
                    <span>Complete VIP Registration</span>
                  </>
                )}
              </button>
            </div>
          </form>

          {/* Security Notice */}
          <div className="mt-6 pt-6 border-t border-borderGold/20 text-center space-y-3">
            <div className="inline-flex items-center gap-1.5 text-[10px] font-mono text-gold-400/80">
              <Shield className="w-3.5 h-3.5 text-gold-400" />
              <span>Encrypted with HS256 & Bcrypt (12 Rounds) • No localStorage</span>
            </div>

            <p className="text-xs text-neutral-400">
              Already have an account?{" "}
              <Link href="/login" className="text-gold-300 font-semibold hover:underline">
                Sign In to Sanctuary
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
