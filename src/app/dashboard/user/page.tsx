"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { BookingRecord } from "@/lib/db";
import { VEHICLES, Vehicle } from "@/lib/vehicles";
import TestDriveModal from "@/components/TestDriveModal";
import {
  Calendar,
  Clock,
  Car,
  User,
  Shield,
  CheckCircle2,
  AlertCircle,
  XCircle,
  Plus,
  RefreshCw,
  LogOut,
  Sparkles,
  Download,
  Trash2,
  FileSpreadsheet,
} from "lucide-react";
import { useRouter } from "next/navigation";

export default function UserDashboardPage() {
  const [bookings, setBookings] = useState<BookingRecord[]>([]);
  const [currentUser, setCurrentUser] = useState<{
    id: string;
    name: string;
    email: string;
    role: string;
    phone?: string;
  } | null>(null);

  const [loading, setLoading] = useState(true);
  const [cancellingId, setCancellingId] = useState<string | null>(null);
  const [modalVehicle, setModalVehicle] = useState<Vehicle | null>(null);
  const [exportingData, setExportingData] = useState(false);
  const [deletingAccount, setDeletingAccount] = useState(false);
  const router = useRouter();

  const handleDownloadData = async () => {
    setExportingData(true);
    try {
      const res = await fetch("/api/auth/account/export");
      if (!res.ok) {
        alert("Failed to export personal data package.");
        return;
      }
      const blob = await res.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `veylora-data-${currentUser?.id || "export"}.json`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch {
      alert("Error occurred while downloading data export.");
    } finally {
      setExportingData(false);
    }
  };

  const handleDeleteAccount = async () => {
    const confirmation = prompt(
      "CONFIRM ACCOUNT ERASURE (GDPR Art. 17 / DPDP):\n\nType 'DELETE' below to permanently erase your VEYLORA membership, test drive records, and personal profile from our database."
    );

    if (confirmation !== "DELETE") {
      alert("Account deletion cancelled. Your records remain intact.");
      return;
    }

    setDeletingAccount(true);
    try {
      const res = await fetch("/api/auth/account/delete", { method: "POST" });
      const data = await res.json();

      if (res.ok) {
        alert("Your account and personal data have been completely deleted.");
        router.push("/");
        router.refresh();
      } else {
        alert(data.error || "Failed to process account deletion.");
      }
    } catch {
      alert("Network error during account deletion request.");
    } finally {
      setDeletingAccount(false);
    }
  };

  const fetchUserDataAndBookings = async () => {
    setLoading(true);
    try {
      // 1. Current user
      const userRes = await fetch("/api/auth/me", { cache: "no-store" });
      const userData = await userRes.json();
      if (!userData.authenticated) {
        router.push("/login?from=/dashboard/user");
        return;
      }
      setCurrentUser(userData.user);

      // 2. User's own bookings only
      const bkgRes = await fetch("/api/bookings", { cache: "no-store" });
      const bkgData = await bkgRes.json();
      if (bkgData.bookings) {
        setBookings(bkgData.bookings);
      }
    } catch (err) {
      console.error("Dashboard fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserDataAndBookings();
  }, []);

  const handleCancelBooking = async (bookingId: string) => {
    if (!confirm("Are you sure you want to cancel this scheduled test drive reservation?")) {
      return;
    }

    setCancellingId(bookingId);
    try {
      const res = await fetch(`/api/bookings/${bookingId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: "CANCELLED" }),
      });

      if (res.ok) {
        await fetchUserDataAndBookings();
      } else {
        const data = await res.json();
        alert(data.error || "Failed to cancel reservation.");
      }
    } catch {
      alert("Network error cancelling reservation.");
    } finally {
      setCancellingId(null);
    }
  };

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/");
    router.refresh();
  };

  const getStatusBadge = (status: BookingRecord["status"]) => {
    switch (status) {
      case "APPROVED":
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-950/80 border border-emerald-500/50 text-emerald-300 text-xs font-mono font-semibold">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
            CONFIRMED
          </span>
        );
      case "PENDING":
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-950/80 border border-amber-500/50 text-amber-300 text-xs font-mono font-semibold">
            <Clock className="w-3.5 h-3.5 text-amber-400 animate-spin" />
            PENDING REVIEW
          </span>
        );
      case "CANCELLED":
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-950/80 border border-red-500/50 text-red-300 text-xs font-mono font-semibold">
            <XCircle className="w-3.5 h-3.5 text-red-400" />
            CANCELLED
          </span>
        );
      case "COMPLETED":
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-950/80 border border-blue-500/50 text-blue-300 text-xs font-mono font-semibold">
            <Sparkles className="w-3.5 h-3.5 text-blue-400" />
            COMPLETED
          </span>
        );
      default:
        return (
          <span className="px-3 py-1 rounded-full bg-neutral-800 text-neutral-300 text-xs font-mono">
            {status}
          </span>
        );
    }
  };

  return (
    <div className="w-full min-h-screen py-12 bg-[#080809] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* User Greeting & Bar */}
        <div className="luxury-card rounded-2xl p-6 sm:p-8 mb-10 border border-borderGold/40 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-full border-2 border-gold-500/60 bg-gold-500/10 flex items-center justify-center shrink-0">
              <User className="w-7 h-7 text-gold-400" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-display text-2xl sm:text-3xl font-bold text-white">
                  {currentUser?.name || "VIP Client"}
                </h1>
                <span className="gold-badge text-[10px] font-mono tracking-widest uppercase px-2.5 py-0.5 rounded-full">
                  Privileged Member
                </span>
              </div>
              <p className="text-xs text-neutral-400 font-mono mt-1">
                {currentUser?.email} • {currentUser?.phone || "+92 300 0000000"}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setModalVehicle(VEHICLES[0])}
              className="btn-gold px-4 py-2.5 rounded-lg text-xs uppercase tracking-wider font-bold flex items-center gap-1.5 shadow-gold"
            >
              <Plus className="w-4 h-4 text-black" />
              <span>New Reservation</span>
            </button>

            <button
              onClick={fetchUserDataAndBookings}
              title="Refresh Bookings"
              className="p-2.5 rounded-lg border border-borderGold/30 text-neutral-300 hover:text-gold-300 hover:bg-surface-raised transition-colors"
            >
              <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
            </button>

            <button
              onClick={handleLogout}
              className="px-3.5 py-2.5 rounded-lg border border-red-500/30 text-red-400 hover:bg-red-500/10 text-xs uppercase font-mono tracking-wider flex items-center gap-1.5 transition-colors"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Sign Out</span>
            </button>
          </div>
        </div>

        {/* Section: "Meri Test Drive" (Prompt Requirement 5) */}
        <div className="mb-8 flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-borderGold/30 pb-4">
          <div>
            <div className="inline-flex items-center gap-2 text-gold-400 text-xs font-mono uppercase tracking-widest mb-1">
              <Shield className="w-3.5 h-3.5" />
              <span>Client Confidential Ledger</span>
            </div>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-white">
              Meri Test Drive{" "}
              <span className="text-base sm:text-lg font-sans text-neutral-400 font-normal">
                (My Private Reservations)
              </span>
            </h2>
          </div>
          <span className="text-xs font-mono text-gold-400/90">
            {bookings.length} {bookings.length === 1 ? "Reservation" : "Reservations"} On Record
          </span>
        </div>

        {/* Bookings List */}
        {loading ? (
          <div className="space-y-4">
            {[1, 2].map((i) => (
              <div
                key={i}
                className="h-32 rounded-xl bg-surface-card border border-borderGold/20 animate-pulse"
              />
            ))}
          </div>
        ) : bookings.length === 0 ? (
          <div className="luxury-card rounded-2xl p-12 text-center space-y-4 border border-borderGold/30">
            <Car className="w-12 h-12 text-gold-400/50 mx-auto" />
            <h3 className="font-display text-xl font-bold text-white">
              No Active Test Drives Scheduled Yet
            </h3>
            <p className="text-xs text-neutral-400 max-w-md mx-auto">
              You haven&apos;t reserved any test drives yet. Select a vehicle from our showroom to book your private VIP demonstration.
            </p>
            <div className="pt-2">
              <Link
                href="/cars"
                className="btn-gold px-6 py-3 rounded-lg text-xs font-bold uppercase tracking-widest inline-flex items-center gap-2"
              >
                <span>Browse Sanctuary Fleet</span>
              </Link>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            {bookings.map((bkg) => (
              <div
                key={bkg.id}
                className="luxury-card rounded-xl p-6 border border-borderGold/30 hover:border-borderGold/60 transition-all flex flex-col lg:flex-row lg:items-center justify-between gap-6"
              >
                {/* Vehicle & Date Info */}
                <div className="space-y-2">
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="text-xs font-mono text-gold-400 uppercase tracking-wider">
                      REF: {bkg.id}
                    </span>
                    {getStatusBadge(bkg.status)}
                  </div>

                  <h3 className="font-display text-xl font-bold text-white">
                    {bkg.vehicleName}
                  </h3>

                  <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-neutral-300">
                    <div className="flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-gold-400" />
                      <span>{bkg.preferredDate}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-gold-400" />
                      <span>{bkg.preferredTime}</span>
                    </div>
                    <div>
                      License / ID: <span className="text-white font-semibold">{bkg.driverLicenseNumber ? `***${bkg.driverLicenseNumber.slice(-4)}` : "Verified"}</span>
                    </div>
                  </div>

                  {bkg.adminNotes && (
                    <div className="p-2.5 rounded bg-surface border border-borderGold/20 text-xs text-neutral-300 mt-2">
                      <span className="text-gold-400 font-mono text-[10px] uppercase block tracking-wider">
                        Concierge Dispatch Note:
                      </span>
                      {bkg.adminNotes}
                    </div>
                  )}

                  {bkg.specialRequests && (
                    <p className="text-[11px] text-neutral-400 italic">
                      Special Request: &ldquo;{bkg.specialRequests}&rdquo;
                    </p>
                  )}
                </div>

                {/* Actions */}
                <div className="flex items-center gap-3 shrink-0">
                  <Link
                    href={`/vehicle/${bkg.vehicleId}`}
                    className="px-4 py-2 rounded-lg text-xs font-mono uppercase tracking-wider border border-gold-500/40 text-gold-300 hover:bg-gold-500/10 transition-colors"
                  >
                    View Specs
                  </Link>

                  {bkg.status === "PENDING" && (
                    <button
                      onClick={() => handleCancelBooking(bkg.id)}
                      disabled={cancellingId === bkg.id}
                      className="px-4 py-2 rounded-lg text-xs font-mono uppercase tracking-wider border border-red-500/40 text-red-400 hover:bg-red-500/10 transition-colors"
                    >
                      {cancellingId === bkg.id ? "Cancelling..." : "Cancel Reservation"}
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Privacy & Data Protection Controls (GDPR Art. 15 / 17 & DPDP) */}
        <div className="mt-16 p-6 sm:p-8 rounded-2xl bg-[#0F1014] border border-[#D4AF37]/30 shadow-luxury space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#D4AF37]/20 pb-4">
            <div>
              <div className="flex items-center gap-2 text-xs font-mono text-gold-400 uppercase tracking-widest">
                <Shield className="w-3.5 h-3.5" />
                <span>Sovereign Data Rights &amp; Privacy Controls</span>
              </div>
              <h3 className="font-display text-lg sm:text-xl font-bold text-white mt-1">
                Personal Data Governance (GDPR &amp; DPDP)
              </h3>
            </div>
            <div className="flex items-center gap-2 text-xs font-mono text-neutral-400">
              <Link href="/privacy" className="hover:text-gold-300 underline">
                Privacy Policy
              </Link>
              <span>•</span>
              <Link href="/terms" className="hover:text-gold-300 underline">
                Terms of Service
              </Link>
            </div>
          </div>

          <p className="text-xs text-neutral-400 leading-relaxed">
            You hold uncompromised sovereign authority over your personal information. Under the EU GDPR (Articles 15, 17, 20) and Indian DPDP Act 2023, you can export a full copy of your records or permanently erase your profile and booking reservations.
          </p>

          <div className="flex flex-wrap items-center gap-4 pt-2">
            <button
              onClick={handleDownloadData}
              disabled={exportingData}
              className="px-5 py-2.5 rounded-xl text-xs font-mono font-bold uppercase tracking-wider border border-gold-500/50 text-gold-300 hover:bg-gold-500/10 transition-colors flex items-center gap-2"
            >
              <Download className="w-4 h-4 text-gold-400" />
              <span>{exportingData ? "Preparing Export..." : "Download My Data (JSON)"}</span>
            </button>

            <button
              onClick={handleDeleteAccount}
              disabled={deletingAccount}
              className="px-5 py-2.5 rounded-xl text-xs font-mono font-bold uppercase tracking-wider border border-red-500/50 text-red-400 hover:bg-red-500/10 transition-colors flex items-center gap-2"
            >
              <Trash2 className="w-4 h-4 text-red-400" />
              <span>{deletingAccount ? "Erasing Records..." : "Delete My Account"}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Booking Modal */}
      <TestDriveModal
        vehicle={modalVehicle}
        isOpen={!!modalVehicle}
        onClose={() => setModalVehicle(null)}
        onSuccess={() => fetchUserDataAndBookings()}
      />
    </div>
  );
}
