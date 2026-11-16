"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { BookingRecord, AuditLogRecord } from "@/lib/db";
import {
  ShieldCheck,
  Calendar,
  Clock,
  User,
  CheckCircle,
  XCircle,
  AlertTriangle,
  RefreshCw,
  LogOut,
  FileText,
  Activity,
  Phone,
  Mail,
  Shield,
  Search,
} from "lucide-react";

export default function AdminDashboardPage() {
  const [bookings, setBookings] = useState<BookingRecord[]>([]);
  const [logs, setLogs] = useState<AuditLogRecord[]>([]);
  const [currentUser, setCurrentUser] = useState<{
    id: string;
    name: string;
    email: string;
    role: string;
  } | null>(null);

  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<"bookings" | "audit">("bookings");
  const [statusFilter, setStatusFilter] = useState<string>("ALL");
  const [searchQuery, setSearchQuery] = useState("");
  const [actionProcessingId, setActionProcessingId] = useState<string | null>(null);

  const router = useRouter();

  const loadData = async () => {
    setLoading(true);
    try {
      // 1. Current User
      const userRes = await fetch("/api/auth/me", { cache: "no-store" });
      const userData = await userRes.json();
      if (!userData.authenticated || userData.user?.role !== "admin") {
        router.push("/dashboard/user?error=admin_required");
        return;
      }
      setCurrentUser(userData.user);

      // 2. All Bookings
      const bkgRes = await fetch("/api/bookings", { cache: "no-store" });
      const bkgData = await bkgRes.json();
      if (bkgData.bookings) {
        setBookings(bkgData.bookings);
      }

      // 3. Audit Logs
      const logsRes = await fetch("/api/logs", { cache: "no-store" });
      const logsData = await logsRes.json();
      if (logsData.logs) {
        setLogs(logsData.logs);
      }
    } catch (err) {
      console.error("Admin dashboard load failed:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleUpdateStatus = async (
    bookingId: string,
    newStatus: "APPROVED" | "REJECTED" | "COMPLETED",
    notes: string
  ) => {
    setActionProcessingId(bookingId);
    try {
      const res = await fetch(`/api/bookings/${bookingId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          status: newStatus,
          adminNotes: notes,
        }),
      });

      if (res.ok) {
        await loadData();
      } else {
        const data = await res.json();
        alert(data.error || "Failed to update booking status.");
      }
    } catch {
      alert("Network error updating booking.");
    } finally {
      setActionProcessingId(null);
    }
  };

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/");
    router.refresh();
  };

  // Filter Bookings
  const filteredBookings = bookings.filter((b) => {
    const matchesStatus = statusFilter === "ALL" || b.status === statusFilter;
    const matchesSearch =
      b.userName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.vehicleName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.userEmail.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.id.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const pendingCount = bookings.filter((b) => b.status === "PENDING").length;
  const approvedCount = bookings.filter((b) => b.status === "APPROVED").length;
  const completedCount = bookings.filter((b) => b.status === "COMPLETED").length;

  return (
    <div className="w-full min-h-screen py-12 bg-[#080809] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Admin Header */}
        <div className="luxury-card rounded-2xl p-6 sm:p-8 mb-10 border border-borderGold/40 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-full border-2 border-gold-500/80 bg-gold-500/15 flex items-center justify-center shrink-0 shadow-gold">
              <ShieldCheck className="w-7 h-7 text-gold-400" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-display text-2xl sm:text-3xl font-bold text-white">
                  Executive Admin Portal
                </h1>
                <span className="bg-gold-500 text-black text-[10px] font-mono tracking-widest uppercase px-2.5 py-0.5 rounded-full font-bold">
                  DIRECTOR ACCESS
                </span>
              </div>
              <p className="text-xs text-neutral-400 font-mono mt-1">
                Active Administrator: <span className="text-gold-300 font-medium">{currentUser?.name}</span> ({currentUser?.email})
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={loadData}
              title="Refresh Showroom Ledger"
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

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
          <div className="luxury-card rounded-xl p-5 border border-borderGold/30">
            <span className="text-[10px] font-mono uppercase tracking-wider text-neutral-400 block mb-1">
              Total Reservations
            </span>
            <span className="font-display text-3xl font-bold text-white">
              {bookings.length}
            </span>
          </div>

          <div className="luxury-card rounded-xl p-5 border border-amber-500/40 bg-amber-950/20">
            <span className="text-[10px] font-mono uppercase tracking-wider text-amber-400 block mb-1">
              Pending Review
            </span>
            <span className="font-display text-3xl font-bold text-amber-300">
              {pendingCount}
            </span>
          </div>

          <div className="luxury-card rounded-xl p-5 border border-emerald-500/40 bg-emerald-950/20">
            <span className="text-[10px] font-mono uppercase tracking-wider text-emerald-400 block mb-1">
              Confirmed Drives
            </span>
            <span className="font-display text-3xl font-bold text-emerald-300">
              {approvedCount}
            </span>
          </div>

          <div className="luxury-card rounded-xl p-5 border border-borderGold/30">
            <span className="text-[10px] font-mono uppercase tracking-wider text-gold-400 block mb-1">
              Completed Drives
            </span>
            <span className="font-display text-3xl font-bold text-white">
              {completedCount}
            </span>
          </div>
        </div>

        {/* View Tabs: Bookings vs Audit Logs */}
        <div className="flex items-center gap-4 border-b border-borderGold/30 mb-8">
          <button
            onClick={() => setActiveTab("bookings")}
            className={`pb-3 text-sm font-display uppercase tracking-wider flex items-center gap-2 border-b-2 transition-all ${
              activeTab === "bookings"
                ? "border-gold-400 text-gold-300 font-bold"
                : "border-transparent text-neutral-400 hover:text-neutral-200"
            }`}
          >
            <Calendar className="w-4 h-4" />
            <span>Showroom Reservations ({bookings.length})</span>
          </button>

          <button
            onClick={() => setActiveTab("audit")}
            className={`pb-3 text-sm font-display uppercase tracking-wider flex items-center gap-2 border-b-2 transition-all ${
              activeTab === "audit"
                ? "border-gold-400 text-gold-300 font-bold"
                : "border-transparent text-neutral-400 hover:text-neutral-200"
            }`}
          >
            <Activity className="w-4 h-4" />
            <span>Security Audit Log Ledger ({logs.length})</span>
          </button>
        </div>

        {/* TAB 1: SHOWROOM RESERVATIONS */}
        {activeTab === "bookings" && (
          <div className="space-y-6">
            {/* Search and Status Filters */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="relative w-full sm:w-80">
                <Search className="w-4 h-4 text-neutral-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search client, vehicle, ref..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 rounded-lg bg-surface border border-borderGold/30 text-xs text-white focus:outline-none focus:border-gold-400"
                />
              </div>

              <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-2 sm:pb-0">
                {["ALL", "PENDING", "APPROVED", "REJECTED", "COMPLETED", "CANCELLED"].map(
                  (status) => (
                    <button
                      key={status}
                      onClick={() => setStatusFilter(status)}
                      className={`px-3 py-1.5 rounded text-[11px] font-mono uppercase tracking-wider transition-all ${
                        statusFilter === status
                          ? "bg-gold-500 text-black font-bold"
                          : "border border-borderGold/30 text-neutral-400 hover:text-white"
                      }`}
                    >
                      {status}
                    </button>
                  )
                )}
              </div>
            </div>

            {/* Bookings List */}
            {filteredBookings.length === 0 ? (
              <div className="luxury-card rounded-2xl p-12 text-center text-neutral-400 text-sm border border-borderGold/30">
                No reservations match the specified filter criteria.
              </div>
            ) : (
              <div className="space-y-4">
                {filteredBookings.map((bkg) => (
                  <div
                    key={bkg.id}
                    className="luxury-card rounded-2xl p-6 border border-borderGold/30 hover:border-borderGold/60 transition-all flex flex-col lg:flex-row lg:items-center justify-between gap-6"
                  >
                    {/* Details */}
                    <div className="space-y-3 flex-1">
                      <div className="flex flex-wrap items-center gap-3">
                        <span className="text-xs font-mono text-gold-400 font-bold uppercase">
                          REF: {bkg.id}
                        </span>
                        <span
                          className={`text-xs font-mono font-semibold px-2.5 py-0.5 rounded-full border ${
                            bkg.status === "APPROVED"
                              ? "bg-emerald-950/80 border-emerald-500/50 text-emerald-300"
                              : bkg.status === "PENDING"
                              ? "bg-amber-950/80 border-amber-500/50 text-amber-300"
                              : bkg.status === "REJECTED" || bkg.status === "CANCELLED"
                              ? "bg-red-950/80 border-red-500/50 text-red-300"
                              : "bg-blue-950/80 border-blue-500/50 text-blue-300"
                          }`}
                        >
                          {bkg.status}
                        </span>
                        <span className="text-[11px] font-mono text-neutral-400">
                          Booked: {new Date(bkg.createdAt).toLocaleDateString()}
                        </span>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <h3 className="font-display text-lg font-bold text-white">
                            {bkg.vehicleName}
                          </h3>
                          <div className="flex items-center gap-4 text-xs font-mono text-neutral-300 mt-1">
                            <span className="flex items-center gap-1">
                              <Calendar className="w-3.5 h-3.5 text-gold-400" />
                              {bkg.preferredDate}
                            </span>
                            <span className="flex items-center gap-1">
                              <Clock className="w-3.5 h-3.5 text-gold-400" />
                              {bkg.preferredTime}
                            </span>
                          </div>
                        </div>

                        <div className="space-y-1 text-xs font-mono text-neutral-300 border-l border-borderGold/20 pl-4">
                          <div className="flex items-center gap-1.5 text-white font-semibold">
                            <User className="w-3.5 h-3.5 text-gold-400" />
                            {bkg.userName}
                          </div>
                          <div className="flex items-center gap-1.5 text-neutral-400">
                            <Mail className="w-3 h-3 text-neutral-500" />
                            {bkg.userEmail}
                          </div>
                          <div className="flex items-center gap-1.5 text-neutral-400">
                            <Phone className="w-3 h-3 text-neutral-500" />
                            {bkg.userPhone}
                          </div>
                          <div className="text-[11px] text-neutral-400 pt-0.5">
                            License / CNIC: <span className="text-gold-300">{bkg.driverLicenseNumber}</span>
                          </div>
                        </div>
                      </div>

                      {bkg.specialRequests && (
                        <p className="text-xs text-neutral-400 italic bg-surface p-2 rounded border border-borderGold/20">
                          Special Request: &ldquo;{bkg.specialRequests}&rdquo;
                        </p>
                      )}

                      {bkg.adminNotes && (
                        <div className="text-xs text-gold-300/90 font-mono">
                          Admin Dispatch Note: {bkg.adminNotes}
                        </div>
                      )}
                    </div>

                    {/* Admin Action Buttons (Approve / Reject) */}
                    <div className="flex flex-row lg:flex-col items-center justify-end gap-2.5 shrink-0 pt-4 lg:pt-0 border-t lg:border-t-0 border-borderGold/20">
                      {bkg.status === "PENDING" && (
                        <>
                          <button
                            onClick={() =>
                              handleUpdateStatus(
                                bkg.id,
                                "APPROVED",
                                "VIP Test Drive Approved by Executive Director"
                              )
                            }
                            disabled={actionProcessingId === bkg.id}
                            className="btn-gold px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 shadow-gold w-full justify-center"
                          >
                            <CheckCircle className="w-4 h-4 text-black" />
                            <span>Approve Drive</span>
                          </button>

                          <button
                            onClick={() =>
                              handleUpdateStatus(
                                bkg.id,
                                "REJECTED",
                                "Bay schedule conflicts or invalid credentials"
                              )
                            }
                            disabled={actionProcessingId === bkg.id}
                            className="px-4 py-2 rounded-lg text-xs font-mono uppercase tracking-wider border border-red-500/50 text-red-400 hover:bg-red-500/10 w-full justify-center"
                          >
                            <XCircle className="w-4 h-4 inline mr-1" />
                            Reject
                          </button>
                        </>
                      )}

                      {bkg.status === "APPROVED" && (
                        <button
                          onClick={() =>
                            handleUpdateStatus(
                              bkg.id,
                              "COMPLETED",
                              "Test drive completed successfully"
                            )
                          }
                          disabled={actionProcessingId === bkg.id}
                          className="px-4 py-2 rounded-lg text-xs font-mono uppercase tracking-wider border border-blue-500/50 text-blue-300 hover:bg-blue-500/10 w-full justify-center"
                        >
                          Mark Completed
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* TAB 2: AUDIT LOG MONITOR (Prompt Requirement 8) */}
        {activeTab === "audit" && (
          <div className="space-y-4">
            <div className="p-4 rounded-xl bg-surface border border-borderGold/40 flex items-center justify-between">
              <div>
                <h3 className="font-display text-lg font-bold text-white flex items-center gap-2">
                  <Shield className="w-4 h-4 text-gold-400" />
                  Immutable Security Audit Ledger
                </h3>
                <p className="text-xs text-neutral-400">
                  Every sign-in, sign-out, test drive reservation, rate limit block, and administrative approval/rejection is stored persistently in the database ledger.
                </p>
              </div>
              <span className="text-xs font-mono text-gold-400">{logs.length} Entries Logged</span>
            </div>

            <div className="luxury-card rounded-2xl overflow-hidden border border-borderGold/30">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs font-mono">
                  <thead className="bg-[#111215] text-gold-400 uppercase tracking-wider text-[10px] border-b border-borderGold/30">
                    <tr>
                      <th className="p-4">Timestamp</th>
                      <th className="p-4">Action</th>
                      <th className="p-4">Actor</th>
                      <th className="p-4">Details</th>
                      <th className="p-4">IP Address</th>
                      <th className="p-4">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-borderGold/20 text-neutral-300">
                    {logs.map((log) => (
                      <tr key={log.id} className="hover:bg-surface-raised transition-colors">
                        <td className="p-4 whitespace-nowrap text-neutral-400">
                          {new Date(log.timestamp).toLocaleString()}
                        </td>
                        <td className="p-4 font-bold text-white whitespace-nowrap">
                          {log.action}
                        </td>
                        <td className="p-4 whitespace-nowrap">
                          <span className="text-gold-300">{log.actorEmail}</span>
                          <span className="text-[10px] text-neutral-400 block uppercase">
                            [{log.actorRole}]
                          </span>
                        </td>
                        <td className="p-4 max-w-md text-neutral-300">
                          {log.details}
                        </td>
                        <td className="p-4 text-neutral-400 whitespace-nowrap">
                          {log.ipAddress}
                        </td>
                        <td className="p-4 whitespace-nowrap">
                          <span
                            className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                              log.status === "SUCCESS"
                                ? "bg-emerald-950 text-emerald-400 border border-emerald-500/40"
                                : log.status === "WARNING"
                                ? "bg-amber-950 text-amber-400 border border-amber-500/40"
                                : "bg-red-950 text-red-400 border border-red-500/40"
                            }`}
                          >
                            {log.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
