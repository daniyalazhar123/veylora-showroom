"use client";

import { useState, useEffect } from "react";
import VehicleCard from "@/components/VehicleCard";
import TestDriveModal from "@/components/TestDriveModal";
import ErrorBoundary from "@/components/ErrorBoundary";
import { getVehiclesByType, Vehicle } from "@/lib/vehicles";
import { Car, Sparkles } from "lucide-react";

export default function CarsPage() {
  const [mounted, setMounted] = useState(false);
  const [cars, setCars] = useState<Vehicle[]>([]);
  const [selectedVehicleForDrive, setSelectedVehicleForDrive] = useState<Vehicle | null>(null);
  const [filterType, setFilterType] = useState<"all" | "sedan" | "suv" | "coupe">("all");

  useEffect(() => {
    setMounted(true);
    setCars(getVehiclesByType("car"));
  }, []);

  const filteredCars = cars.filter((car) => {
    if (filterType === "all") return true;
    if (filterType === "sedan")
      return car.id.includes("civic") || car.id.includes("corolla") || car.id.includes("maybach");
    if (filterType === "suv") return car.id.includes("escalade");
    if (filterType === "coupe") return car.id.includes("porsche");
    return true;
  });

  return (
    <ErrorBoundary fallbackTitle="Cars Showroom Gallery Encountered an Issue">
      <div className="w-full min-h-screen py-16 bg-[#080809] relative text-neutral-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Page Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6 border-b border-[#D4AF37]/30 pb-8">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#D4AF37]/40 bg-[#D4AF37]/10 text-gold-300 text-xs font-semibold tracking-[0.2em] uppercase mb-3">
                <Car className="w-3.5 h-3.5 text-gold-400" />
                Automotive Gallery
              </div>
              <h1 className="font-display text-4xl sm:text-5xl font-bold text-white tracking-tight">
                Luxury <span className="gold-text-gradient">Cars Collection</span>
              </h1>
              <p className="text-sm text-neutral-400 mt-2 max-w-xl">
                Inspect our premier automobile inventory including the Civic RS Turbo, Corolla Grande, Escalade-V, Porsche 911 GT3, and Maybach S 680.
              </p>
            </div>

            {/* Filter Pills */}
            <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0">
              <button
                onClick={() => setFilterType("all")}
                className={`px-4 py-2 rounded-lg text-xs uppercase font-mono tracking-wider transition-all ${
                  filterType === "all"
                    ? "bg-[#D4AF37] text-black font-bold shadow-gold"
                    : "border border-[#D4AF37]/30 text-neutral-300 hover:border-[#D4AF37]/60 bg-[#0F1012]"
                }`}
              >
                All Models ({cars.length || 5})
              </button>
              <button
                onClick={() => setFilterType("sedan")}
                className={`px-4 py-2 rounded-lg text-xs uppercase font-mono tracking-wider transition-all ${
                  filterType === "sedan"
                    ? "bg-[#D4AF37] text-black font-bold shadow-gold"
                    : "border border-[#D4AF37]/30 text-neutral-300 hover:border-[#D4AF37]/60 bg-[#0F1012]"
                }`}
              >
                Sedans
              </button>
              <button
                onClick={() => setFilterType("suv")}
                className={`px-4 py-2 rounded-lg text-xs uppercase font-mono tracking-wider transition-all ${
                  filterType === "suv"
                    ? "bg-[#D4AF37] text-black font-bold shadow-gold"
                    : "border border-[#D4AF37]/30 text-neutral-300 hover:border-[#D4AF37]/60 bg-[#0F1012]"
                }`}
              >
                SUVs
              </button>
              <button
                onClick={() => setFilterType("coupe")}
                className={`px-4 py-2 rounded-lg text-xs uppercase font-mono tracking-wider transition-all ${
                  filterType === "coupe"
                    ? "bg-[#D4AF37] text-black font-bold shadow-gold"
                    : "border border-[#D4AF37]/30 text-neutral-300 hover:border-[#D4AF37]/60 bg-[#0F1012]"
                }`}
              >
                Motorsport / GT
              </button>
            </div>
          </div>

          {/* Loading Skeleton if not mounted yet */}
          {!mounted ? (
            <div className="space-y-8 animate-pulse">
              <div className="h-80 rounded-2xl bg-[#0F1012] border border-[#D4AF37]/30" />
              <div className="h-80 rounded-2xl bg-[#0F1012] border border-[#D4AF37]/20" />
            </div>
          ) : (
            <div className="flex flex-col gap-10">
              {filteredCars.map((car) => (
                <VehicleCard
                  key={car.id}
                  vehicle={car}
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
