"use client";

import { use, useState } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getVehicleById, formatPrice } from "@/lib/vehicles";
import VehicleViewer360 from "@/components/VehicleViewer360";
import TestDriveModal from "@/components/TestDriveModal";
import {
  Calendar,
  Shield,
  Gauge,
  Zap,
  CheckCircle,
  ArrowLeft,
  Sparkles,
  Award,
  ChevronRight,
} from "lucide-react";

export default function VehicleDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const vehicle = getVehicleById(id);

  if (!vehicle) {
    notFound();
  }

  const [selectedColor, setSelectedColor] = useState(vehicle.colors[0]);
  const [isTestDriveOpen, setIsTestDriveOpen] = useState(false);

  return (
    <div className="w-full min-h-screen py-12 bg-[#080809] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Navigation Breadcrumb */}
        <div className="flex items-center gap-2 text-xs font-mono text-neutral-400 mb-8">
          <Link href="/" className="hover:text-gold-400 transition-colors">
            Showroom
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-neutral-600" />
          <Link
            href={vehicle.type === "car" ? "/cars" : "/bikes"}
            className="hover:text-gold-400 transition-colors"
          >
            {vehicle.type === "car" ? "Cars" : "Bikes"}
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-neutral-600" />
          <span className="text-gold-300 font-semibold">{vehicle.name}</span>
        </div>

        {/* Title Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-8 border-b border-borderGold/30 mb-10">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-gold-500/40 bg-gold-500/10 text-gold-300 text-xs font-semibold tracking-[0.2em] uppercase mb-3">
              <Sparkles className="w-3.5 h-3.5 text-gold-400" />
              {vehicle.modelCode}
            </div>
            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-white tracking-tight">
              {vehicle.name}
            </h1>
            <p className="text-sm sm:text-base text-gold-400/90 font-mono mt-2">
              {vehicle.tagline}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center gap-4">
            <div className="p-4 rounded-xl bg-surface-card border border-borderGold/40 text-right">
              <span className="text-[10px] font-mono uppercase tracking-widest text-neutral-400 block">
                Sanctuary Acquisition Price
              </span>
              <span className="font-display text-2xl sm:text-3xl font-bold gold-text-gradient">
                {formatPrice(vehicle.price)}
              </span>
              <span className="text-xs text-neutral-300 block font-mono">
                or {formatPrice(vehicle.emiMonthly)} / month
              </span>
            </div>

            <button
              onClick={() => setIsTestDriveOpen(true)}
              className="btn-gold py-4 px-8 rounded-xl text-xs sm:text-sm font-bold uppercase tracking-widest flex items-center justify-center gap-2.5 shadow-gold-glow shrink-0 hover:scale-105 active:scale-95 transition-all"
            >
              <Calendar className="w-4 h-4 text-black" />
              <span>Book Test Drive</span>
            </button>
          </div>
        </div>

        {/* 1. 360 Rotate View (CSS transform rotate) + Color Changer */}
        <div className="mb-16">
          <div className="text-center mb-6">
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-white">
              Interactive <span className="gold-text-gradient">360° Studio Turntable</span>
            </h2>
            <p className="text-xs sm:text-sm text-neutral-400 mt-1">
              Drag horizontally or use the controls below to rotate this machine across 360 degrees.
            </p>
          </div>

          <VehicleViewer360
            vehicle={vehicle}
            selectedColor={selectedColor}
            onColorChange={(color) => setSelectedColor(color)}
          />
        </div>

        {/* 2. Specs Table & Highlighted Features (7/5 Split) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16">
          {/* Left 7 Columns: Complete Technical Specifications Table */}
          <div className="lg:col-span-7 space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full border border-gold-500/50 bg-gold-500/10 flex items-center justify-center">
                <Gauge className="w-4 h-4 text-gold-400" />
              </div>
              <h3 className="font-display text-2xl font-bold text-white">
                Technical Specifications Table
              </h3>
            </div>

            <div className="luxury-card rounded-2xl overflow-hidden border border-borderGold/40">
              <div className="divide-y divide-borderGold/20 text-xs sm:text-sm">
                <div className="p-4 flex items-center justify-between bg-surface/40 hover:bg-surface-raised transition-colors">
                  <span className="font-mono text-neutral-400 uppercase tracking-wider text-[11px]">
                    Powertrain / Engine
                  </span>
                  <span className="font-semibold text-white text-right">
                    {vehicle.specs.engine}
                  </span>
                </div>
                <div className="p-4 flex items-center justify-between hover:bg-surface-raised transition-colors">
                  <span className="font-mono text-neutral-400 uppercase tracking-wider text-[11px]">
                    Horsepower Output
                  </span>
                  <span className="font-semibold text-gold-300 text-right font-mono">
                    {vehicle.specs.horsepower}
                  </span>
                </div>
                <div className="p-4 flex items-center justify-between bg-surface/40 hover:bg-surface-raised transition-colors">
                  <span className="font-mono text-neutral-400 uppercase tracking-wider text-[11px]">
                    Maximum Torque
                  </span>
                  <span className="font-semibold text-gold-300 text-right font-mono">
                    {vehicle.specs.torque}
                  </span>
                </div>
                <div className="p-4 flex items-center justify-between hover:bg-surface-raised transition-colors">
                  <span className="font-mono text-neutral-400 uppercase tracking-wider text-[11px]">
                    Acceleration (0-100 km/h)
                  </span>
                  <span className="font-bold text-emerald-400 text-right font-mono">
                    {vehicle.specs.acceleration}
                  </span>
                </div>
                <div className="p-4 flex items-center justify-between bg-surface/40 hover:bg-surface-raised transition-colors">
                  <span className="font-mono text-neutral-400 uppercase tracking-wider text-[11px]">
                    Top Speed Capability
                  </span>
                  <span className="font-bold text-white text-right font-mono">
                    {vehicle.specs.topSpeed}
                  </span>
                </div>
                <div className="p-4 flex items-center justify-between hover:bg-surface-raised transition-colors">
                  <span className="font-mono text-neutral-400 uppercase tracking-wider text-[11px]">
                    Transmission Type
                  </span>
                  <span className="font-semibold text-white text-right">
                    {vehicle.specs.transmission}
                  </span>
                </div>
                <div className="p-4 flex items-center justify-between bg-surface/40 hover:bg-surface-raised transition-colors">
                  <span className="font-mono text-neutral-400 uppercase tracking-wider text-[11px]">
                    Fuel Grade & Octane
                  </span>
                  <span className="font-semibold text-white text-right">
                    {vehicle.specs.fuelType}
                  </span>
                </div>
                <div className="p-4 flex items-center justify-between hover:bg-surface-raised transition-colors">
                  <span className="font-mono text-neutral-400 uppercase tracking-wider text-[11px]">
                    Drive Train Architecture
                  </span>
                  <span className="font-semibold text-white text-right">
                    {vehicle.specs.driveTrain}
                  </span>
                </div>
                {vehicle.specs.consumption && (
                  <div className="p-4 flex items-center justify-between bg-surface/40 hover:bg-surface-raised transition-colors">
                    <span className="font-mono text-neutral-400 uppercase tracking-wider text-[11px]">
                      Fuel Consumption
                    </span>
                    <span className="font-semibold text-white text-right">
                      {vehicle.specs.consumption}
                    </span>
                  </div>
                )}
                {vehicle.specs.curbWeight && (
                  <div className="p-4 flex items-center justify-between hover:bg-surface-raised transition-colors">
                    <span className="font-mono text-neutral-400 uppercase tracking-wider text-[11px]">
                      Curb Weight
                    </span>
                    <span className="font-semibold text-white text-right">
                      {vehicle.specs.curbWeight}
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Right 5 Columns: Vehicle Highlights & Receptionist Pick */}
          <div className="lg:col-span-5 space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full border border-gold-500/50 bg-gold-500/10 flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-gold-400" />
              </div>
              <h3 className="font-display text-2xl font-bold text-white">
                Bespoke Equipment
              </h3>
            </div>

            <div className="luxury-card rounded-2xl p-6 border border-borderGold/40 space-y-4">
              <h4 className="text-xs font-mono uppercase tracking-widest text-gold-400">
                Key Sanctuary Inclusions
              </h4>
              <ul className="space-y-3">
                {vehicle.highlightFeatures.map((feat, i) => (
                  <li key={i} className="flex items-start gap-3 text-xs sm:text-sm text-neutral-200">
                    <CheckCircle className="w-4 h-4 text-gold-400 mt-0.5 shrink-0" />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Receptionist Endorsement Card */}
            {vehicle.receptionistRecommendation && (
              <div className="p-6 rounded-2xl bg-surface-card border border-borderGold/30 space-y-3">
                <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-gold-400">
                  <Award className="w-4 h-4 text-gold-400" />
                  VIP Receptionist Endorsement
                </div>
                <p className="text-xs sm:text-sm text-neutral-300 italic leading-relaxed">
                  &ldquo;{vehicle.receptionistRecommendation}&rdquo;
                </p>
              </div>
            )}

            {/* Booking CTA card */}
            <div className="p-6 rounded-2xl bg-gradient-to-br from-surface via-[#17181e] to-surface-card border border-gold-500/40 text-center space-y-4">
              <h4 className="font-display text-lg font-bold text-white">
                Experience {vehicle.name} Firsthand
              </h4>
              <p className="text-xs text-neutral-400">
                Schedule a 45-minute private road demonstration. Accompanied by our dedicated technical specialist.
              </p>
              <button
                onClick={() => setIsTestDriveOpen(true)}
                className="btn-gold w-full py-3.5 rounded-lg text-xs font-bold uppercase tracking-widest flex items-center justify-center gap-2 shadow-gold"
              >
                <Calendar className="w-4 h-4 text-black" />
                <span>Book Test Drive Now</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <TestDriveModal
        vehicle={vehicle}
        isOpen={isTestDriveOpen}
        onClose={() => setIsTestDriveOpen(false)}
      />
    </div>
  );
}
