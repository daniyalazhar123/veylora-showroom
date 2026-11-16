"use client";

import { useState, useEffect } from "react";
import VehicleCard from "@/components/VehicleCard";
import TestDriveModal from "@/components/TestDriveModal";
import ErrorBoundary from "@/components/ErrorBoundary";
import { getVehiclesByType, Vehicle } from "@/lib/vehicles";
import { Bike, Sparkles } from "lucide-react";

export default function BikesPage() {
  const [mounted, setMounted] = useState(false);
  const [bikes, setBikes] = useState<Vehicle[]>([]);
  const [selectedVehicleForDrive, setSelectedVehicleForDrive] = useState<Vehicle | null>(null);
  const [filterCategory, setFilterCategory] = useState<"all" | "commuter" | "superbike" | "cruiser">("all");

  useEffect(() => {
    setMounted(true);
    setBikes(getVehiclesByType("bike"));
  }, []);

  const filteredBikes = bikes.filter((bike) => {
    if (filterCategory === "all") return true;
    if (filterCategory === "commuter") return bike.id.includes("cg125");
    if (filterCategory === "superbike") return bike.id.includes("panigale") || bike.id.includes("r1m");
    if (filterCategory === "cruiser") return bike.id.includes("fatboy");
    return true;
  });

  return (
    <ErrorBoundary fallbackTitle="Bikes Showroom Gallery Encountered an Issue">
      <div className="w-full min-h-screen py-16 bg-[#080809] relative text-neutral-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Page Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6 border-b border-[#D4AF37]/30 pb-8">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#D4AF37]/40 bg-[#D4AF37]/10 text-gold-300 text-xs font-semibold tracking-[0.2em] uppercase mb-3">
                <Bike className="w-3.5 h-3.5 text-gold-400" />
                Two-Wheel Apex Division
              </div>
              <h1 className="font-display text-4xl sm:text-5xl font-bold text-white tracking-tight">
                Superbikes & <span className="gold-text-gradient">Heritage Fleet</span>
              </h1>
              <p className="text-sm text-neutral-400 mt-2 max-w-xl">
                From the legendary Honda CG 125 Special Edition to the 215.5 HP Ducati Panigale V4 S, Yamaha R1M, and Harley Fat Boy 114.
              </p>
            </div>

            {/* Filter Pills */}
            <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0">
              <button
                onClick={() => setFilterCategory("all")}
                className={`px-4 py-2 rounded-lg text-xs uppercase font-mono tracking-wider transition-all ${
                  filterCategory === "all"
                    ? "bg-[#D4AF37] text-black font-bold shadow-gold"
                    : "border border-[#D4AF37]/30 text-neutral-300 hover:border-[#D4AF37]/60 bg-[#0F1012]"
                }`}
              >
                All Machines ({bikes.length || 4})
              </button>
              <button
                onClick={() => setFilterCategory("commuter")}
                className={`px-4 py-2 rounded-lg text-xs uppercase font-mono tracking-wider transition-all ${
                  filterCategory === "commuter"
                    ? "bg-[#D4AF37] text-black font-bold shadow-gold"
                    : "border border-[#D4AF37]/30 text-neutral-300 hover:border-[#D4AF37]/60 bg-[#0F1012]"
                }`}
              >
                Heritage / Commuter
              </button>
              <button
                onClick={() => setFilterCategory("superbike")}
                className={`px-4 py-2 rounded-lg text-xs uppercase font-mono tracking-wider transition-all ${
                  filterCategory === "superbike"
                    ? "bg-[#D4AF37] text-black font-bold shadow-gold"
                    : "border border-[#D4AF37]/30 text-neutral-300 hover:border-[#D4AF37]/60 bg-[#0F1012]"
                }`}
              >
                Superbikes
              </button>
              <button
                onClick={() => setFilterCategory("cruiser")}
                className={`px-4 py-2 rounded-lg text-xs uppercase font-mono tracking-wider transition-all ${
                  filterCategory === "cruiser"
                    ? "bg-[#D4AF37] text-black font-bold shadow-gold"
                    : "border border-[#D4AF37]/30 text-neutral-300 hover:border-[#D4AF37]/60 bg-[#0F1012]"
                }`}
              >
                Power Cruisers
              </button>
            </div>
          </div>

          {!mounted ? (
            <div className="space-y-8 animate-pulse">
              <div className="h-80 rounded-2xl bg-[#0F1012] border border-[#D4AF37]/30" />
              <div className="h-80 rounded-2xl bg-[#0F1012] border border-[#D4AF37]/20" />
            </div>
          ) : (
            <div className="flex flex-col gap-10">
              {filteredBikes.map((bike) => (
                <VehicleCard
                  key={bike.id}
                  vehicle={bike}
                  onBookTestDrive={(v) => setSelectedVehicleForDrive(v)}
                />
              ))}
            </div>
          )}
        </div>

        <TestDriveModal
          vehicle={selectedVehicleForDrive}
          isOpen={!!selectedVehicleForDrive}
          onClose={() => setSelectedVehicleForDrive(null)}
        />
      </div>
    </ErrorBoundary>
  );
}
