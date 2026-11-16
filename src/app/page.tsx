"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import DoorEntranceModal from "@/components/DoorEntranceModal";
import ReceptionSection from "@/components/ReceptionSection";
import VehicleCard from "@/components/VehicleCard";
import TestDriveModal from "@/components/TestDriveModal";
import ErrorBoundary from "@/components/ErrorBoundary";
import { VEHICLES, Vehicle } from "@/lib/vehicles";
import { Sparkles, Shield, Award, Car, Bike, Compass, KeyRound, ChevronDown } from "lucide-react";

export default function HomePage() {
  const [mounted, setMounted] = useState(false);
  const [selectedVehicleForDrive, setSelectedVehicleForDrive] = useState<Vehicle | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <ErrorBoundary fallbackTitle="VEYLORA Sanctuary Showroom Encountered an Issue">
      <div className="w-full flex flex-col bg-[#080809] text-neutral-100 min-h-screen">
        {/* 1. Showroom Entry Modal (Shows ONCE for 2.5s on first visit, then removes from DOM) */}
        <DoorEntranceModal />

        {/* Hero Section with Welcome Headline & Showroom Atmosphere */}
        <section className="relative w-full overflow-hidden bg-gradient-to-b from-[#0F1012] via-[#080809] to-[#080809] border-b border-[#D4AF37]/30 py-20 lg:py-24">
          <div className="absolute inset-0 bg-ambient-grid opacity-60 pointer-events-none" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[450px] bg-gold-500/10 rounded-full blur-[130px] pointer-events-none" />

          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 flex flex-col items-center text-center">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#D4AF37]/40 bg-[#D4AF37]/10 text-gold-300 text-xs font-semibold tracking-[0.25em] uppercase mb-6 animate-pulse">
              <Sparkles className="w-3.5 h-3.5 text-gold-400" />
              The Sanctuary Experience
            </div>

            <h1 className="font-display text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-white mb-6 max-w-4xl leading-[1.1]">
              Welcome to <span className="gold-text-gradient">VEYLORA</span> Showroom
            </h1>

            <p className="font-sans text-neutral-300 text-base sm:text-lg lg:text-xl max-w-2xl leading-relaxed mb-10">
              Step across the gilded threshold into Pakistan’s preeminent automotive and motorcycle gallery. Exquisite engineering, uncompromised security, and bespoke VIP service.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4">
              <a
                href="#featured-fleet"
                className="btn-gold px-7 py-3.5 rounded-xl text-xs sm:text-sm uppercase tracking-widest font-bold flex items-center gap-2 shadow-gold hover:scale-105 active:scale-95 transition-all"
              >
                <span>Inspect Collection</span>
                <ChevronDown className="w-4 h-4 text-black" />
              </a>
              <Link
                href="/cars"
                className="px-6 py-3.5 rounded-xl text-xs sm:text-sm uppercase tracking-widest font-semibold border border-[#D4AF37]/50 text-gold-300 bg-[#0F1012] hover:bg-[#D4AF37]/10 hover:border-gold-400 transition-all"
              >
                Explore Luxury Cars
              </Link>
              <Link
                href="/bikes"
                className="px-6 py-3.5 rounded-xl text-xs sm:text-sm uppercase tracking-widest font-semibold border border-[#D4AF37]/50 text-gold-300 bg-[#0F1012] hover:bg-[#D4AF37]/10 hover:border-gold-400 transition-all"
              >
                Explore Superbikes
              </Link>
            </div>
          </div>
        </section>

        {/* 2. Reception Section with 3 Professional Receptionists */}
        <ReceptionSection />

        {/* 3. Featured Rides (7/5 Split & Asymmetric Showcase) */}
        <section id="featured-fleet" className="w-full py-24 bg-[#080809] relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#D4AF37]/30 bg-[#D4AF37]/10 text-gold-300 text-xs font-semibold tracking-[0.2em] uppercase mb-3">
                  <Sparkles className="w-3.5 h-3.5 text-gold-400" />
                  Featured Flagships
                </div>
                <h2 className="font-display text-3xl sm:text-5xl font-bold text-white tracking-tight">
                  The Curated <span className="gold-text-gradient">Showroom Floor</span>
                </h2>
              </div>
              <div className="flex items-center gap-4">
                <Link
                  href="/cars"
                  className="px-5 py-2.5 rounded-lg text-xs uppercase tracking-wider font-semibold border border-[#D4AF37]/40 text-gold-300 hover:bg-[#D4AF37]/10 bg-[#0F1012] flex items-center gap-2 transition-all"
                >
                  <Car className="w-4 h-4 text-gold-400" />
                  <span>All Cars ({VEHICLES.filter((v) => v.type === "car").length})</span>
                </Link>
                <Link
                  href="/bikes"
                  className="px-5 py-2.5 rounded-lg text-xs uppercase tracking-wider font-semibold border border-[#D4AF37]/40 text-gold-300 hover:bg-[#D4AF37]/10 bg-[#0F1012] flex items-center gap-2 transition-all"
                >
                  <Bike className="w-4 h-4 text-gold-400" />
                  <span>All Bikes ({VEHICLES.filter((v) => v.type === "bike").length})</span>
                </Link>
              </div>
            </div>

            {!mounted ? (
              <div className="space-y-12 animate-pulse">
                <div className="h-80 rounded-2xl bg-[#0F1012] border border-[#D4AF37]/30" />
                <div className="h-80 rounded-2xl bg-[#0F1012] border border-[#D4AF37]/20" />
              </div>
            ) : (
              <div className="space-y-12">
                <VehicleCard
                  vehicle={VEHICLES[0]} // Civic RS
                  onBookTestDrive={(v) => setSelectedVehicleForDrive(v)}
                />
                <VehicleCard
                  vehicle={VEHICLES[2]} // Escalade-V
                  onBookTestDrive={(v) => setSelectedVehicleForDrive(v)}
                />
                <VehicleCard
                  vehicle={VEHICLES[3]} // Porsche 911 GT3
                  onBookTestDrive={(v) => setSelectedVehicleForDrive(v)}
                />
                <VehicleCard
                  vehicle={VEHICLES[5]} // Honda CG 125 Special Edition
                  onBookTestDrive={(v) => setSelectedVehicleForDrive(v)}
                />
              </div>
            )}
          </div>
        </section>

        {/* 4. Luxury Sanctuary Pillars */}
        <section className="w-full py-20 bg-[#0F1012] border-y border-[#D4AF37]/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="p-8 rounded-2xl bg-[#151619] border border-[#D4AF37]/30 space-y-4">
                <div className="w-12 h-12 rounded-full border border-gold-500/50 bg-gold-500/10 flex items-center justify-center">
                  <Compass className="w-6 h-6 text-gold-400" />
                </div>
                <h3 className="font-display text-xl font-bold text-white">
                  360° Studio Visualization
                </h3>
                <p className="text-xs text-neutral-400 leading-relaxed">
                  Interact with every millimeter of mechanical perfection in real-time. Rotate from aerodynamic splitters to titanium exhaust geometry with customizable bespoke paints.
                </p>
              </div>

              <div className="p-8 rounded-2xl bg-[#151619] border border-[#D4AF37]/30 space-y-4">
                <div className="w-12 h-12 rounded-full border border-gold-500/50 bg-gold-500/10 flex items-center justify-center">
                  <Award className="w-6 h-6 text-gold-400" />
                </div>
                <h3 className="font-display text-xl font-bold text-white">
                  Dedicated VIP Reception
                </h3>
                <p className="text-xs text-neutral-400 leading-relaxed">
                  Every reservation is overseen by our formal concierge team. Experience white-glove arrival protocols, private track briefings, and transparent flexible financing options.
                </p>
              </div>

              <div className="p-8 rounded-2xl bg-[#151619] border border-[#D4AF37]/30 space-y-4">
                <div className="w-12 h-12 rounded-full border border-gold-500/50 bg-gold-500/10 flex items-center justify-center">
                  <Shield className="w-6 h-6 text-gold-400" />
                </div>
                <h3 className="font-display text-xl font-bold text-white">
                  Cryptographic Sanctuary Security
                </h3>
                <p className="text-xs text-neutral-400 leading-relaxed">
                  Client privacy is immutable. Our architecture utilizes 1-hour HS256 JWTs locked inside httpOnly cookies, Zod schema sanitization, and automated rate limiting to protect your data.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Test Drive Modal */}
        <TestDriveModal
          vehicle={selectedVehicleForDrive}
          isOpen={!!selectedVehicleForDrive}
          onClose={() => setSelectedVehicleForDrive(null)}
        />
      </div>
    </ErrorBoundary>
  );
}
