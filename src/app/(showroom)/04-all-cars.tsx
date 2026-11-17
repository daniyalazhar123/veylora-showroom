"use client";

import React, { useState, useEffect, useRef } from "react";
import { ArrowRight, Compass, Sparkles, Gauge, ShieldCheck, ChevronRight } from "lucide-react";

interface CarFleetItem {
  id: string;
  name: string;
  category: string;
  priceUsd: string;
  engine: string;
  horsepower: string;
  acceleration: string;
  featured?: boolean;
}

const BEVERLY_HILLS_CARS: CarFleetItem[] = [
  {
    id: "rolls-royce-ghost",
    name: "Rolls-Royce Ghost Black Badge",
    category: "Ultra-Luxury Bespoke Saloon",
    priceUsd: "$420,000",
    engine: "6.75L Twin-Turbo V12",
    horsepower: "563 HP",
    acceleration: "4.6s 0-60 mph",
    featured: true,
  },
  {
    id: "cadillac-escalade-v",
    name: "Cadillac Escalade-V",
    category: "High-Performance Luxury SUV",
    priceUsd: "$154,000",
    engine: "6.2L Supercharged V8",
    horsepower: "682 HP",
    acceleration: "4.3s 0-60 mph",
    featured: true,
  },
  {
    id: "porsche-911-gt3",
    name: "Porsche 911 GT3",
    category: "Motorsport DNA Coupe",
    priceUsd: "$198,000",
    engine: "4.0L Naturally Aspirated Boxer-6",
    horsepower: "502 HP",
    acceleration: "3.2s 0-60 mph",
  },
  {
    id: "maybach-s680",
    name: "Mercedes-Maybach S 680",
    category: "Executive Chauffeur Flagship",
    priceUsd: "$235,000",
    engine: "6.0L Bi-Turbo V12",
    horsepower: "621 HP",
    acceleration: "4.5s 0-60 mph",
  },
  {
    id: "bugatti-chiron",
    name: "Bugatti Chiron",
    category: "Hypercar Masterpiece",
    priceUsd: "$3,300,000",
    engine: "8.0L Quad-Turbocharged W16",
    horsepower: "1,479 HP",
    acceleration: "2.4s 0-60 mph",
  },
  {
    id: "ferrari-f8-tributo",
    name: "Ferrari F8 Tributo",
    category: "Mid-Rear Berlinetta",
    priceUsd: "$285,000",
    engine: "3.9L Twin-Turbo V8",
    horsepower: "710 HP",
    acceleration: "2.9s 0-60 mph",
  },
  {
    id: "lamborghini-huracan",
    name: "Lamborghini Huracan",
    category: "Naturally Aspirated V10 Supercar",
    priceUsd: "$249,000",
    engine: "5.2L Naturally Aspirated V10",
    horsepower: "631 HP",
    acceleration: "3.0s 0-60 mph",
  },
  {
    id: "tesla-model-s-plaid",
    name: "Tesla Model S Plaid",
    category: "Tri-Motor Electric Super Sedan",
    priceUsd: "$90,000",
    engine: "Tri-Motor All-Wheel Drive",
    horsepower: "1,020 HP",
    acceleration: "1.99s 0-60 mph",
  },
  {
    id: "civic-rs-turbo",
    name: "Honda Civic RS Turbo",
    category: "Sport Sedan Executive",
    priceUsd: "$38,500",
    engine: "1.5L VTEC Turbocharged 4-Cyl",
    horsepower: "180 HP",
    acceleration: "7.5s 0-60 mph",
  },
  {
    id: "corolla-altis-grande",
    name: "Toyota Corolla Altis Grande",
    category: "Executive Touring Sedan",
    priceUsd: "$32,000",
    engine: "1.8L Dual VVT-i 16-Valve",
    horsepower: "138 HP",
    acceleration: "9.2s 0-60 mph",
  },
];

interface AllCarsHallSceneProps {
  onProceedToBikes?: () => void;
  onSelectCar?: (carId: string) => void;
  className?: string;
}

export default function AllCarsHallScene({
  onProceedToBikes,
  onSelectCar,
  className = "",
}: AllCarsHallSceneProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [activeCarId, setActiveCarId] = useState<string | null>(null);
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
    if (onProceedToBikes) {
      onProceedToBikes();
    } else {
      const nextSection = document.getElementById("showroom-bikes-hall");
      if (nextSection) {
        nextSection.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <section
      ref={sectionRef}
      id="showroom-all-cars"
      className={`relative w-full min-h-screen bg-[#080809] text-white py-24 px-6 sm:px-10 lg:px-16 overflow-hidden ${className}`}
    >
      {/* Precision Background Atmosphere */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(212,175,55,0.06)_0%,_transparent_65%)] pointer-events-none" />
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
              <span>Scene 04 · Grand Automotive Gallery · Beverly Hills</span>
            </div>

            <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-normal tracking-tight text-[#D4AF37] leading-[1.08]">
              The Beverly Hills Fleet
            </h2>
            <p className="font-sans text-neutral-400 text-xs sm:text-sm uppercase tracking-[0.2em] mt-3">
              10 Curated Flagships · 445 N Canon Drive
            </p>
          </div>

          <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#0F1012] border border-[#D4AF37]/20">
            <span className="w-2 h-2 rounded-full bg-[#D4AF37]" />
            <span className="text-xs uppercase tracking-wider text-neutral-300 font-sans font-medium">
              All Prices USD ($) · Immediate Delivery
            </span>
          </div>
        </div>

        {/* 7/5 Asymmetric Showcase for Flagship Vehicle */}
        {BEVERLY_HILLS_CARS[0] && (
          <div
            className="mb-16 p-8 sm:p-10 rounded-2xl bg-[#0F1012] border border-[#D4AF37]/30 shadow-[0_20px_60px_-20px_rgba(0,0,0,0.9)] transition-all duration-1000 ease-out delay-100"
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? "translate3d(0, 0, 0)" : "translate3d(0, 24px, 0)",
              willChange: "transform, opacity",
            }}
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              {/* 7/12 Media Box */}
              <div className="lg:col-span-7">
                <div className="relative w-full aspect-[16/10] bg-[#0A0B0D] border border-[#D4AF37]/25 rounded-xl overflow-hidden flex flex-col items-center justify-center p-8 text-center shadow-inner">
                  <div className="w-14 h-14 rounded-full border border-[#D4AF37]/35 bg-[#0F1012] flex items-center justify-center mb-3">
                    <div className="w-2.5 h-2.5 rounded-full bg-[#D4AF37] animate-pulse" />
                  </div>
                  <span className="text-xs uppercase tracking-[0.25em] text-[#D4AF37] font-sans font-semibold mb-1">
                    Car Image Placeholder
                  </span>
                  <span className="text-[10px] uppercase tracking-wider text-neutral-500 font-sans">
                    {BEVERLY_HILLS_CARS[0].name} · Salon Spotlight
                  </span>
                </div>
              </div>

              {/* 5/12 Details */}
              <div className="lg:col-span-5 flex flex-col justify-between">
                <div>
                  <div className="inline-flex items-center gap-1.5 text-[10px] uppercase tracking-[0.25em] text-[#D4AF37] font-sans font-semibold mb-2">
                    <Sparkles className="w-3 h-3 text-[#D4AF37]" />
                    <span>Grand Sanctuary Flagship</span>
                  </div>
                  <h3 className="font-serif text-2xl sm:text-3xl text-white font-normal mb-1">
                    {BEVERLY_HILLS_CARS[0].name}
                  </h3>
                  <p className="text-xs uppercase tracking-wider text-neutral-400 font-sans mb-4">
                    {BEVERLY_HILLS_CARS[0].category}
                  </p>

                  <div className="text-3xl font-serif text-[#D4AF37] font-light mb-6">
                    {BEVERLY_HILLS_CARS[0].priceUsd}{" "}
                    <span className="text-xs text-neutral-400 font-sans uppercase tracking-widest font-normal">
                      USD
                    </span>
                  </div>

                  <div className="grid grid-cols-3 gap-2.5 mb-6 text-center">
                    <div className="p-2.5 rounded-lg bg-[#151619] border border-white/5">
                      <span className="block text-[9px] uppercase tracking-wider text-neutral-500 font-sans">Engine</span>
                      <span className="text-xs font-medium text-white">{BEVERLY_HILLS_CARS[0].engine}</span>
                    </div>
                    <div className="p-2.5 rounded-lg bg-[#151619] border border-white/5">
                      <span className="block text-[9px] uppercase tracking-wider text-neutral-500 font-sans">Power</span>
                      <span className="text-xs font-medium text-white">{BEVERLY_HILLS_CARS[0].horsepower}</span>
                    </div>
                    <div className="p-2.5 rounded-lg bg-[#151619] border border-white/5">
                      <span className="block text-[9px] uppercase tracking-wider text-neutral-500 font-sans">0-60</span>
                      <span className="text-xs font-medium text-white">{BEVERLY_HILLS_CARS[0].acceleration}</span>
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => onSelectCar && onSelectCar(BEVERLY_HILLS_CARS[0].id)}
                  className="w-full py-3 px-5 rounded-xl border border-[#D4AF37]/50 hover:border-[#D4AF37] bg-[#D4AF37]/10 hover:bg-[#D4AF37]/20 text-[#F2E4AD] text-xs uppercase tracking-[0.2em] font-semibold transition-all flex items-center justify-center gap-2"
                >
                  <span>View Details</span>
                  <ChevronRight className="w-3.5 h-3.5 text-[#D4AF37]" />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Gallery Grid of Remaining Fleet */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-20">
          {BEVERLY_HILLS_CARS.slice(1).map((car, idx) => (
            <div
              key={car.id}
              className="p-6 rounded-2xl bg-[#0F1012] border border-[#D4AF37]/20 hover:border-[#D4AF37]/50 transition-all duration-500 flex flex-col justify-between shadow-[0_10px_35px_-15px_rgba(0,0,0,0.85)] group"
              style={{
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? "translate3d(0, 0, 0)" : "translate3d(0, 30px, 0)",
                transitionDelay: `${150 + idx * 60}ms`,
                willChange: "transform, opacity",
              }}
            >
              {/* Media Container: Black box with gold border */}
              <div className="relative w-full aspect-[16/10] bg-[#0A0B0D] border border-[#D4AF37]/25 group-hover:border-[#D4AF37]/60 rounded-xl overflow-hidden flex flex-col items-center justify-center p-6 text-center mb-5 transition-colors">
                <div className="w-10 h-10 rounded-full border border-[#D4AF37]/30 bg-[#0F1012] flex items-center justify-center mb-2">
                  <div className="w-2 h-2 rounded-full bg-[#D4AF37] animate-pulse" />
                </div>
                <span className="text-[11px] uppercase tracking-[0.2em] text-[#D4AF37] font-sans font-semibold">
                  Car Image Placeholder
                </span>
                <span className="text-[9px] uppercase tracking-wider text-neutral-500 font-sans mt-0.5">
                  Studio Capture Slot
                </span>
              </div>

              {/* Information */}
              <div>
                <p className="text-[10px] uppercase tracking-[0.2em] text-neutral-400 font-sans mb-1">
                  {car.category}
                </p>
                <h4 className="font-serif text-lg sm:text-xl text-white font-normal mb-2 leading-snug">
                  {car.name}
                </h4>

                <div className="text-xl font-serif text-[#D4AF37] font-light mb-4">
                  {car.priceUsd}{" "}
                  <span className="text-[10px] text-neutral-400 font-sans uppercase tracking-wider font-normal">
                    USD
                  </span>
                </div>

                <div className="flex items-center justify-between text-[11px] text-neutral-400 pt-3 border-t border-white/5 mb-5 font-sans">
                  <span>{car.horsepower}</span>
                  <span className="w-1 h-1 rounded-full bg-[#D4AF37]/50" />
                  <span>{car.engine}</span>
                  <span className="w-1 h-1 rounded-full bg-[#D4AF37]/50" />
                  <span>{car.acceleration}</span>
                </div>
              </div>

              {/* View Details Button */}
              <button
                onClick={() => onSelectCar && onSelectCar(car.id)}
                className="w-full py-2.5 px-4 rounded-xl border border-[#D4AF37]/40 hover:border-[#D4AF37] bg-[#151619] hover:bg-[#D4AF37]/10 text-[#F2E4AD] text-[11px] uppercase tracking-[0.2em] font-semibold transition-all flex items-center justify-center gap-1.5"
              >
                <span>View Details</span>
                <ChevronRight className="w-3.5 h-3.5 text-[#D4AF37]" />
              </button>
            </div>
          ))}
        </div>

        {/* Bottom Call to Action: Proceed to Bikes Hall */}
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
            <span>Proceed to Bikes Hall</span>
            <ArrowRight className="w-4 h-4 text-[#080809]" />
          </button>

          <span className="text-[10px] text-neutral-500 uppercase tracking-widest font-sans">
            Scene 04 of 07 · 445 N Canon Drive, Beverly Hills
          </span>
        </div>
      </div>
    </section>
  );
}

export { AllCarsHallScene };
