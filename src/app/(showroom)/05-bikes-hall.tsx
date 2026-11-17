"use client";

import React, { useState, useEffect, useRef } from "react";
import { ArrowRight, Compass, Sparkles, ChevronRight, Gauge, Zap, Cog } from "lucide-react";

interface BikeFleetItem {
  id: string;
  name: string;
  category: string;
  priceUsd: string;
  engine: string;
  horsepower: string;
  topSpeed: string;
}

const BEVERLY_HILLS_BIKES: BikeFleetItem[] = [
  {
    id: "ducati-panigale-v4s",
    name: "Ducati Panigale V4 S",
    category: "MotoGP Derived Superbike",
    priceUsd: "$31,500",
    engine: "1,103cc Desmosedici Stradale V4",
    horsepower: "215.5 HP",
    topSpeed: "190 mph",
  },
  {
    id: "harley-fat-boy-114",
    name: "Harley-Davidson Fat Boy 114",
    category: "Monolithic Chrome Cruiser",
    priceUsd: "$22,000",
    engine: "1,868cc Milwaukee-Eight 114 V-Twin",
    horsepower: "94 HP",
    topSpeed: "115 mph",
  },
  {
    id: "yamaha-r1m",
    name: "Yamaha YZF-R1M",
    category: "Factory Carbon Superbike",
    priceUsd: "$27,000",
    engine: "998cc Crossplane Inline-4 CP4",
    horsepower: "200 HP",
    topSpeed: "186 mph",
  },
  {
    id: "suzuki-hayabusa",
    name: "Suzuki Hayabusa",
    category: "Ultimate Sport Touring Hypersport",
    priceUsd: "$19,500",
    engine: "1,340cc DOHC Inline-4",
    horsepower: "187 HP",
    topSpeed: "186 mph (Governed)",
  },
  {
    id: "bmw-s1000rr",
    name: "BMW S1000RR",
    category: "M Package Track Superbike",
    priceUsd: "$21,000",
    engine: "999cc ShiftCam Inline-4",
    horsepower: "205 HP",
    topSpeed: "188 mph",
  },
  {
    id: "honda-cg125",
    name: "Honda CG 125 Special Edition",
    category: "Heritage Collector Commuter",
    priceUsd: "$1,850",
    engine: "124cc OHV 4-Stroke Single",
    horsepower: "11 HP",
    topSpeed: "68 mph",
  },
];

interface BikesHallSceneProps {
  onProceedToSelection?: () => void;
  onSelectBike?: (bikeId: string) => void;
  className?: string;
}

export default function BikesHallScene({
  onProceedToSelection,
  onSelectBike,
  className = "",
}: BikesHallSceneProps) {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          }
        });
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const handleProceed = () => {
    if (onProceedToSelection) {
      onProceedToSelection();
    } else {
      const nextSection = document.getElementById("showroom-final-selection");
      if (nextSection) {
        nextSection.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <section
      ref={sectionRef}
      id="showroom-bikes-hall"
      className={`relative w-full min-h-screen bg-[#080809] text-white py-24 px-6 sm:px-10 lg:px-16 overflow-hidden ${className}`}
    >
      {/* Precision Ambient Atmosphere */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,_rgba(212,175,55,0.06)_0%,_transparent_65%)] pointer-events-none" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#d4af3708_1px,transparent_1px),linear-gradient(to_bottom,#d4af3708_1px,transparent_1px)] bg-[size:5rem_5rem] pointer-events-none" />

      <div className="max-w-7xl mx-auto w-full relative z-10">
        {/* Header Eyebrow & Title */}
        <div
          className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16 transition-all duration-700 ease-out"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? "translate3d(0, 0, 0)" : "translate3d(0, 20px, 0)",
            willChange: "transform, opacity",
          }}
        >
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-[#D4AF37]/30 bg-[#0F1012] text-[#D4AF37] text-[11px] font-sans font-medium uppercase tracking-[0.25em] mb-4">
              <Compass className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span>Scene 05 · Two-Wheel Mastery · Beverly Hills</span>
            </div>

            <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-normal tracking-tight text-[#D4AF37] leading-[1.08]">
              The Superbike Sanctuary
            </h2>
            <p className="font-sans text-neutral-400 text-xs sm:text-sm uppercase tracking-[0.2em] mt-3">
              6 Precision Superbikes & Cruisers · 445 N Canon Drive
            </p>
          </div>

          <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#0F1012] border border-[#D4AF37]/20">
            <span className="w-2 h-2 rounded-full bg-[#D4AF37]" />
            <span className="text-xs uppercase tracking-wider text-neutral-300 font-sans font-medium">
              Curated USD ($) Fleet · Factory Calibration
            </span>
          </div>
        </div>

        {/* 3 Columns Desktop / 1 Column Mobile Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-20">
          {BEVERLY_HILLS_BIKES.map((bike, idx) => (
            <div
              key={bike.id}
              className="p-6 rounded-2xl bg-[#0F1012] border border-[#D4AF37]/20 hover:border-[#D4AF37]/55 transition-all duration-500 flex flex-col justify-between shadow-[0_12px_40px_-15px_rgba(0,0,0,0.85)] group"
              style={{
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? "translate3d(0, 0, 0)" : "translate3d(0, 28px, 0)",
                transitionDelay: `${120 + idx * 70}ms`,
                willChange: "transform, opacity",
              }}
            >
              {/* Media Container: Black box with gold border */}
              <div className="relative w-full aspect-[16/10] bg-[#0A0B0D] border border-[#D4AF37]/25 group-hover:border-[#D4AF37]/60 rounded-xl overflow-hidden flex flex-col items-center justify-center p-6 text-center mb-5 transition-colors">
                <div className="w-10 h-10 rounded-full border border-[#D4AF37]/30 bg-[#0F1012] flex items-center justify-center mb-2">
                  <div className="w-2 h-2 rounded-full bg-[#D4AF37] animate-pulse" />
                </div>
                <span className="text-[11px] uppercase tracking-[0.2em] text-[#D4AF37] font-sans font-semibold">
                  Bike Image Placeholder
                </span>
                <span className="text-[9px] uppercase tracking-wider text-neutral-500 font-sans mt-0.5">
                  Studio Capture Slot
                </span>
              </div>

              {/* Information */}
              <div>
                <p className="text-[10px] uppercase tracking-[0.2em] text-neutral-400 font-sans mb-1">
                  {bike.category}
                </p>
                <h4 className="font-serif text-lg sm:text-xl text-white font-normal mb-2 leading-snug">
                  {bike.name}
                </h4>

                <div className="text-xl font-serif text-[#D4AF37] font-light mb-4">
                  {bike.priceUsd}{" "}
                  <span className="text-[10px] text-neutral-400 font-sans uppercase tracking-wider font-normal">
                    USD
                  </span>
                </div>

                <div className="flex items-center justify-between text-[11px] text-neutral-400 pt-3 border-t border-white/5 mb-5 font-sans">
                  <span>{bike.horsepower}</span>
                  <span className="w-1 h-1 rounded-full bg-[#D4AF37]/50" />
                  <span>{bike.topSpeed}</span>
                  <span className="w-1 h-1 rounded-full bg-[#D4AF37]/50" />
                  <span className="truncate max-w-[100px]">{bike.engine}</span>
                </div>
              </div>

              {/* View Details Button */}
              <button
                onClick={() => onSelectBike && onSelectBike(bike.id)}
                className="w-full py-2.5 px-4 rounded-xl border border-[#D4AF37]/40 hover:border-[#D4AF37] bg-[#151619] hover:bg-[#D4AF37]/10 text-[#F2E4AD] text-[11px] uppercase tracking-[0.2em] font-semibold transition-all flex items-center justify-center gap-1.5"
              >
                <span>View Details</span>
                <ChevronRight className="w-3.5 h-3.5 text-[#D4AF37]" />
              </button>
            </div>
          ))}
        </div>

        {/* Bottom Call to Action: Proceed to Final Selection */}
        <div
          className="flex flex-col items-center gap-3 pt-8 border-t border-white/10 text-center transition-all duration-700 ease-out delay-500"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? "translate3d(0, 0, 0)" : "translate3d(0, 16px, 0)",
            willChange: "transform, opacity",
          }}
        >
          <button
            onClick={handleProceed}
            className="py-4 px-10 rounded-xl bg-[#D4AF37] hover:bg-[#F2E4AD] text-[#080809] text-xs uppercase tracking-[0.25em] font-semibold transition-all duration-300 shadow-[0_4px_25px_rgba(212,175,55,0.25)] hover:shadow-[0_6px_35px_rgba(212,175,55,0.45)] flex items-center gap-3 transform hover:-translate-y-0.5 active:translate-y-0"
          >
            <span>Proceed to Final Selection</span>
            <ArrowRight className="w-4 h-4 text-[#080809]" />
          </button>

          <span className="text-[10px] text-neutral-500 uppercase tracking-widest font-sans">
            Scene 05 of 07 · 445 N Canon Drive, Beverly Hills
          </span>
        </div>
      </div>
    </section>
  );
}

export { BikesHallScene };
