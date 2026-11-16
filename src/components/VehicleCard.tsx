"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Vehicle, formatPrice } from "@/lib/vehicles";
import { Gauge, Zap, Compass, ChevronRight, Calendar, Sparkles } from "lucide-react";

interface VehicleCardProps {
  vehicle: Vehicle;
  onBookTestDrive?: (vehicle: Vehicle) => void;
  splitLayout?: boolean;
}

export default function VehicleCard({
  vehicle,
  onBookTestDrive,
}: VehicleCardProps) {
  const defaultFallback = vehicle?.type === "bike" 
    ? "/images/bikes/placeholder.jpg" 
    : "/images/cars/placeholder.jpg";

  const [selectedColor, setSelectedColor] = useState(
    vehicle?.colors?.[0] || { name: "Default Finish", hex: "#D4AF37" }
  );
  const [imgSrc, setImgSrc] = useState<string>(vehicle?.image || defaultFallback);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (vehicle?.image) {
      setImgSrc(vehicle.image);
    }
    if (vehicle?.colors?.[0]) {
      setSelectedColor(vehicle.colors[0]);
    }
  }, [vehicle]);

  if (!vehicle) {
    return (
      <div className="w-full h-[320px] rounded-2xl bg-[#080809] border border-[#D4AF37]/30 animate-pulse flex items-center justify-center text-xs text-gold-400 font-mono">
        Loading Sanctuary Vehicle Showcase...
      </div>
    );
  }

  return (
    <div className="w-full luxury-card rounded-2xl overflow-hidden grid grid-cols-1 lg:grid-cols-12 gap-0 border border-[#D4AF37] hover:border-gold-400 hover:shadow-[0_0_35px_rgba(212,175,55,0.25)] transition-all duration-500 group bg-[#080809]">
      {/* ========================================================
          LEFT 7/12: Image Area Height 320px, object-cover, hover zoom 1.05x, gold glow
          NO black text box inside image, NO watermark text, NO cartoon
      ======================================================== */}
      <div className="lg:col-span-7 relative bg-gradient-to-br from-[#121318] via-[#0A0B0E] to-[#080809] p-6 sm:p-7 flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-[#D4AF37]/30 overflow-hidden">
        {/* Top Badges */}
        <div className="flex items-center justify-between mb-3 z-10">
          <div className="flex items-center gap-2">
            <span className="gold-badge text-[10px] font-mono tracking-widest uppercase px-3 py-1 rounded-full">
              {vehicle.type === "car" ? "Luxury Automobile" : "Superbike"} • {vehicle.modelCode}
            </span>
            <span className="text-[10px] font-mono text-emerald-400 flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-950/40 border border-emerald-500/30">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              IN STOCK ({vehicle.stock ?? 1})
            </span>
          </div>

          <div className="flex items-center gap-1.5 text-xs text-gold-400 font-mono">
            <Sparkles className="w-3.5 h-3.5" />
            <span>360° Studio Rotate</span>
          </div>
        </div>

        {/* Vehicle Image Frame (Strictly Height 320px, object-cover, hover zoom 1.05x) */}
        <div className="relative w-full h-[320px] my-auto flex items-center justify-center overflow-hidden rounded-xl bg-[#050608] border border-[#D4AF37]/20 shadow-inner group-hover:border-[#D4AF37]/50 transition-colors">
          <Image
            src={imgSrc}
            alt={vehicle.name}
            width={1200}
            height={800}
            onError={() => setImgSrc(defaultFallback)}
            className="w-full h-[320px] object-cover rounded-xl transition-transform duration-700 ease-out group-hover:scale-105"
            priority
          />
        </div>

        {/* Color Switcher Dots (Active Paint Picker) */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-[#D4AF37]/20 z-10">
          <div className="flex items-center gap-2.5">
            <span className="text-[11px] font-mono uppercase tracking-wider text-neutral-400">
              Exterior Finishes:
            </span>
            <div className="flex items-center gap-2">
              {vehicle.colors?.map((color) => {
                const isSelected = selectedColor.name === color.name;
                return (
                  <button
                    key={color.name}
                    onClick={() => setSelectedColor(color)}
                    title={color.name}
                    className={`w-6 h-6 rounded-full transition-all duration-200 relative ${
                      isSelected
                        ? "ring-2 ring-gold-400 ring-offset-2 ring-offset-[#080809] scale-110 shadow-gold"
                        : "opacity-75 hover:opacity-100 hover:scale-105"
                    }`}
                    style={{ backgroundColor: color.hex }}
                  />
                );
              })}
            </div>
          </div>
          <span className="text-xs text-gold-300 font-mono font-medium truncate max-w-[220px]">
            {selectedColor.name}
          </span>
        </div>
      </div>

      {/* ========================================================
          RIGHT 5/12: BIG elegant name in Fraunces font, Price in gold Rs,
          EMI/month, HP / 0-100 / Top Speed in 3 small boxes,
          Color dots, [360° Details] gold button + [Book Drive] outline button
      ======================================================== */}
      <div className="lg:col-span-5 p-6 sm:p-8 flex flex-col justify-between bg-gradient-to-b from-[#0F1014] to-[#0A0B0E] space-y-5">
        <div className="space-y-3">
          <div>
            <div className="text-xs uppercase tracking-widest text-gold-400 font-mono mb-1">
              {vehicle.tagline}
            </div>
            {/* BIG Elegant Name in Fraunces Font */}
            <h3 className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold text-white group-hover:text-gold-200 transition-colors leading-tight">
              {vehicle.name}
            </h3>
          </div>

          <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed line-clamp-2">
            {vehicle.description}
          </p>

          {/* Performance Spec Badges: HP / 0-100 / Top Speed in 3 Small Luxury Boxes */}
          <div className="grid grid-cols-3 gap-2.5 pt-2">
            <div className="p-3 rounded-xl bg-[#080809] border border-[#D4AF37]/30 text-center hover:border-gold-400/60 transition-colors">
              <Gauge className="w-4 h-4 text-gold-400 mx-auto mb-1" />
              <span className="text-[9px] uppercase tracking-wider text-neutral-400 block font-mono">
                Horsepower
              </span>
              <span className="text-xs sm:text-sm font-bold text-white font-mono">
                {vehicle.specs?.horsepower?.split("@")[0] || "Power"}
              </span>
            </div>

            <div className="p-3 rounded-xl bg-[#080809] border border-[#D4AF37]/30 text-center hover:border-gold-400/60 transition-colors">
              <Zap className="w-4 h-4 text-gold-400 mx-auto mb-1" />
              <span className="text-[9px] uppercase tracking-wider text-neutral-400 block font-mono">
                0-100 km/h
              </span>
              <span className="text-xs sm:text-sm font-bold text-white font-mono">
                {vehicle.specs?.acceleration?.split(" ")[0] || "N/A"}
              </span>
            </div>

            <div className="p-3 rounded-xl bg-[#080809] border border-[#D4AF37]/30 text-center hover:border-gold-400/60 transition-colors">
              <Compass className="w-4 h-4 text-gold-400 mx-auto mb-1" />
              <span className="text-[9px] uppercase tracking-wider text-neutral-400 block font-mono">
                Top Speed
              </span>
              <span className="text-xs sm:text-sm font-bold text-white font-mono">
                {vehicle.specs?.topSpeed?.split(" ")[0] ? `${vehicle.specs.topSpeed.split(" ")[0]} km/h` : "Max"}
              </span>
            </div>
          </div>
        </div>

        {/* Pricing & EMI Calculation Box */}
        <div className="p-4 rounded-xl bg-[#080809] border border-[#D4AF37]/40 space-y-2">
          <div className="flex items-baseline justify-between">
            <span className="text-xs font-mono uppercase tracking-wider text-neutral-400">
              Showroom Price:
            </span>
            <span className="text-xl sm:text-2xl lg:text-3xl font-display font-bold gold-text-gradient">
              {formatPrice(vehicle.price)}
            </span>
          </div>
          <div className="flex items-center justify-between text-xs pt-2 border-t border-[#D4AF37]/20 text-neutral-300 font-mono">
            <span className="text-gold-400/90 text-[11px]">
              Monthly EMI (36-60 Mo):
            </span>
            <span className="font-semibold text-white text-sm">
              {formatPrice(vehicle.emiMonthly)} / mo
            </span>
          </div>
        </div>

        {/* Action Buttons: [360° Details] gold button + [Book Drive] outline button */}
        <div className="grid grid-cols-2 gap-3 pt-1">
          <Link
            href={`/vehicle/${vehicle.id}`}
            className="btn-gold py-3.5 px-4 rounded-xl text-xs font-bold uppercase tracking-wider text-center flex items-center justify-center gap-1.5 shadow-gold hover:scale-[1.02] active:scale-95 transition-all"
          >
            <span>360° Details</span>
            <ChevronRight className="w-4 h-4 text-black" />
          </Link>

          <button
            onClick={() => onBookTestDrive && onBookTestDrive(vehicle)}
            className="py-3.5 px-4 rounded-xl text-xs font-bold uppercase tracking-wider text-center border border-[#D4AF37] text-gold-300 hover:bg-[#D4AF37]/15 hover:border-gold-300 transition-all flex items-center justify-center gap-1.5"
          >
            <Calendar className="w-4 h-4 text-gold-400" />
            <span>Book Drive</span>
          </button>
        </div>
      </div>
    </div>
  );
}
