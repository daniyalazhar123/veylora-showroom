"use client";

import { useState } from "react";
import { Vehicle } from "@/lib/vehicles";
import { X, Calendar, Clock, ShieldCheck, AlertCircle, CheckCircle2, Car, Sparkles } from "lucide-react";

interface TestDriveModalProps {
  vehicle: Vehicle | null;
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

export default function TestDriveModal({
  vehicle,
  isOpen,
  onClose,
  onSuccess,
}: TestDriveModalProps) {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [preferredDate, setPreferredDate] = useState("");
  const [preferredTime, setPreferredTime] = useState("02:00 PM");
  const [driverLicenseNumber, setDriverLicenseNumber] = useState("");
  const [specialRequests, setSpecialRequests] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  if (!isOpen || !vehicle) return null;

  // Tomorrow's date as min date
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const minDateStr = tomorrow.toISOString().split("T")[0];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccessMessage(null);
    setLoading(true);

    try {
      const res = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          vehicleId: vehicle.id,
          vehicleName: vehicle.name,
          fullName,
          email,
          phone,
          preferredDate,
          preferredTime,
          driverLicenseNumber,
          specialRequests,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        if (res.status === 401) {
          setError("Please sign in to schedule your VIP test drive reservation.");
        } else if (res.status === 429) {
          setError(data.error || "Rate limit reached: Maximum 5 booking attempts allowed per minute.");
        } else if (data.details) {
          const firstError = Object.values(data.details).flat()[0] as string;
          setError(firstError || "Validation error occurred.");
        } else {
          setError(data.error || "Failed to submit booking reservation.");
        }
        setLoading(false);
        return;
      }

      setSuccessMessage(
        `Reservation confirmed! Your booking reference is ${data.booking.id}. Our Senior VIP Concierge will telephone you shortly.`
      );
      setLoading(false);

      if (onSuccess) onSuccess();

      setTimeout(() => {
        onClose();
        setSuccessMessage(null);
      }, 3000);
    } catch {
      setError("An unexpected network error occurred. Please check your connection.");
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-xl bg-surface-card border-2 border-gold-500/50 rounded-2xl shadow-gold-glow overflow-hidden">
        {/* Header */}
        <div className="p-6 bg-gradient-to-r from-[#17181d] via-[#1c1d24] to-[#121318] border-b border-borderGold/40 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full border border-gold-500/60 bg-gold-500/10 flex items-center justify-center">
              <Car className="w-5 h-5 text-gold-400" />
            </div>
            <div>
              <span className="text-[10px] font-mono tracking-widest uppercase text-gold-400">
                VIP Test Drive Reservation
              </span>
              <h3 className="font-display text-lg font-bold text-white">
                {vehicle.name}
              </h3>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-neutral-400 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 max-h-[80vh] overflow-y-auto">
          {error && (
            <div className="mb-4 p-3 rounded-lg bg-red-950/60 border border-red-500/50 text-red-200 text-xs flex items-start gap-2">
              <AlertCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          )}

          {successMessage && (
            <div className="mb-4 p-4 rounded-lg bg-emerald-950/60 border border-emerald-500/50 text-emerald-200 text-xs flex items-start gap-2">
              <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
              <span>{successMessage}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs uppercase font-mono tracking-wider text-neutral-300 mb-1">
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Tariq Mansoor"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-lg bg-surface border border-borderGold/30 text-white text-xs focus:outline-none focus:border-gold-400"
                />
              </div>

              <div>
                <label className="block text-xs uppercase font-mono tracking-wider text-neutral-300 mb-1">
                  Email Address *
                </label>
                <input
                  type="email"
                  required
                  placeholder="e.g. client@domain.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-lg bg-surface border border-borderGold/30 text-white text-xs focus:outline-none focus:border-gold-400"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs uppercase font-mono tracking-wider text-neutral-300 mb-1">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  required
                  placeholder="+92 300 1234567"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-lg bg-surface border border-borderGold/30 text-white text-xs focus:outline-none focus:border-gold-400"
                />
              </div>

              <div>
                <label className="block text-xs uppercase font-mono tracking-wider text-neutral-300 mb-1">
                  Driver License / CNIC *
                </label>
                <input
                  type="text"
                  required
                  placeholder="DL-PK-XXXXXX"
                  value={driverLicenseNumber}
                  onChange={(e) => setDriverLicenseNumber(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-lg bg-surface border border-borderGold/30 text-white text-xs focus:outline-none focus:border-gold-400"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs uppercase font-mono tracking-wider text-neutral-300 mb-1">
                  Preferred Date *
                </label>
                <input
                  type="date"
                  required
                  min={minDateStr}
                  value={preferredDate}
                  onChange={(e) => setPreferredDate(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-lg bg-surface border border-borderGold/30 text-white text-xs focus:outline-none focus:border-gold-400"
                />
              </div>

              <div>
                <label className="block text-xs uppercase font-mono tracking-wider text-neutral-300 mb-1">
                  Preferred Slot *
                </label>
                <select
                  value={preferredTime}
                  onChange={(e) => setPreferredTime(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-lg bg-surface border border-borderGold/30 text-white text-xs focus:outline-none focus:border-gold-400"
                >
                  <option value="10:00 AM">10:00 AM - Morning Briefing</option>
                  <option value="12:00 PM">12:00 PM - Midday Session</option>
                  <option value="02:00 PM">02:00 PM - Afternoon VIP Slot</option>
                  <option value="04:00 PM">04:00 PM - Golden Hour Drive</option>
                  <option value="06:00 PM">06:00 PM - Twilight Track Slot</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs uppercase font-mono tracking-wider text-neutral-300 mb-1">
                Special Concierge Requests (Optional)
              </label>
              <textarea
                rows={2}
                maxLength={300}
                placeholder="Specific track route, custom color inspection, or family accompaniment..."
                value={specialRequests}
                onChange={(e) => setSpecialRequests(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-lg bg-surface border border-borderGold/30 text-white text-xs focus:outline-none focus:border-gold-400 resize-none"
              />
            </div>

            {/* Consumer Protection & Safety Terms */}
            <div className="p-3.5 rounded-lg bg-surface border border-borderGold/30 space-y-1.5 text-[11px] text-neutral-300">
              <div className="flex items-center gap-1.5 text-gold-400 font-mono font-bold uppercase tracking-wider text-[10px]">
                <ShieldCheck className="w-3.5 h-3.5 text-gold-400 shrink-0" />
                <span>Driver Verification &amp; Complimentary Cancellation Terms</span>
              </div>
              <p className="text-neutral-400 leading-relaxed text-[11px]">
                • Drivers must be 18+ with an active driver&apos;s license presented upon arrival.<br />
                • Test drives are 100% complimentary with free cancellation prior to appointment.<br />
                • Showroom prices &amp; EMI estimates are indicative; official tax and registration calculated at formal purchase.
              </p>
            </div>

            {/* Submit */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={loading}
                className="btn-gold w-full py-3 rounded-lg text-xs font-bold uppercase tracking-widest flex items-center justify-center gap-2 shadow-gold"
              >
                {loading ? (
                  <span>Securing Reservation...</span>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4 text-black" />
                    <span>Confirm Test Drive Reservation</span>
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
