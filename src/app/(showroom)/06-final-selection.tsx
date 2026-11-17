"use client";

import React, { useState, useEffect, useRef } from "react";
import { ArrowRight, ArrowLeft, Compass, ShieldCheck, MapPin, Sparkles } from "lucide-react";

interface FinalSelectionSceneProps {
  onProceedToTestDrive?: () => void;
  onBackToCars?: () => void;
  className?: string;
}

export default function FinalSelectionScene({
  onProceedToTestDrive,
  onBackToCars,
  className = "",
}: FinalSelectionSceneProps) {
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
      { threshold: 0.15 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const handleProceed = () => {
    if (onProceedToTestDrive) {
      onProceedToTestDrive();
    } else {
      const nextSection = document.getElementById("showroom-test-drive-booking");
      if (nextSection) {
        nextSection.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  const handleBack = () => {
    if (onBackToCars) {
      onBackToCars();
    } else {
      const carsSection = document.getElementById("showroom-all-cars");
      if (carsSection) {
        carsSection.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <section
      ref={sectionRef}
      id="showroom-final-selection"
      className={`relative w-full min-h-screen bg-[#080809] text-white flex items-center py-24 px-6 sm:px-10 lg:px-16 overflow-hidden ${className}`}
    >
      {/* Precision Ambient Atmosphere */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,_rgba(212,175,55,0.06)_0%,_transparent_65%)] pointer-events-none" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#d4af3708_1px,transparent_1px),linear-gradient(to_bottom,#d4af3708_1px,transparent_1px)] bg-[size:5rem_5rem] pointer-events-none" />

      <div className="max-w-7xl mx-auto w-full relative z-10">
        {/* Header Eyebrow */}
        <div
          className="flex items-center gap-3 mb-10 transition-all duration-700 ease-out"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? "translate3d(0, 0, 0)" : "translate3d(0, 16px, 0)",
            willChange: "transform, opacity",
          }}
        >
          <div className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]" />
          <span className="text-[11px] uppercase tracking-[0.3em] text-[#D4AF37] font-sans font-medium">
            Scene 06 · Order Summary & Curation Verification
          </span>
        </div>

        {/* 7/5 Asymmetric Split: Left = Selected Vehicle, Right = Summary Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
          {/* Left Side: 7/12 Selected Vehicle Display */}
          <div
            className="lg:col-span-7 flex flex-col justify-between p-8 sm:p-10 rounded-2xl bg-[#0F1012] border border-[#D4AF37]/30 shadow-[0_16px_50px_-20px_rgba(0,0,0,0.85)] transition-all duration-1000 ease-out delay-150"
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? "translate3d(0, 0, 0)" : "translate3d(0, 24px, 0)",
              willChange: "transform, opacity",
            }}
          >
            <div>
              <div className="inline-flex items-center gap-1.5 text-xs uppercase tracking-[0.25em] text-[#D4AF37] font-sans font-semibold mb-3">
                <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
                <span>Your Selection</span>
              </div>

              <h2 className="font-serif text-3xl sm:text-4xl text-white font-normal tracking-tight mb-2">
                Rolls-Royce Ghost Black Badge
              </h2>

              <p className="font-sans text-xs uppercase tracking-widest text-neutral-400 mb-6">
                Bespoke Beverly Hills Commission Specification
              </p>

              {/* Media Container: aspect-[16/10] Black Box with Gold Border */}
              <div className="relative w-full aspect-[16/10] bg-[#0A0B0D] border border-[#D4AF37]/25 rounded-xl overflow-hidden flex flex-col items-center justify-center p-8 text-center mb-6 shadow-inner">
                <div className="w-16 h-16 rounded-full border border-[#D4AF37]/35 bg-[#0F1012] flex items-center justify-center mb-3">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#D4AF37] animate-pulse" />
                </div>
                <span className="text-sm uppercase tracking-[0.25em] text-[#D4AF37] font-sans font-semibold mb-1">
                  Selected Vehicle Image Placeholder
                </span>
                <span className="text-[10px] uppercase tracking-wider text-neutral-500 font-sans">
                  High-Resolution Studio Specification Render Slot
                </span>
              </div>

              {/* Price & Selection Note */}
              <div className="flex items-baseline gap-3 mb-3">
                <span className="text-3xl font-serif text-[#D4AF37] font-light">
                  $420,000
                </span>
                <span className="text-xs text-neutral-400 font-sans uppercase tracking-widest">
                  USD · Base MSRP
                </span>
              </div>
            </div>

            <p className="text-[11px] font-sans text-neutral-400 italic pt-4 border-t border-white/5">
              You can change selection in Scene 4 / Scene 5. This is display only for now.
            </p>
          </div>

          {/* Right Side: 5/12 Summary Card */}
          <div
            className="lg:col-span-5 flex flex-col justify-between p-8 sm:p-10 rounded-2xl bg-[#0F1012] border border-[#D4AF37]/35 shadow-[0_20px_60px_-20px_rgba(0,0,0,0.95)] transition-all duration-1000 ease-out delay-300"
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? "translate3d(0, 0, 0)" : "translate3d(0, 24px, 0)",
              willChange: "transform, opacity",
            }}
          >
            <div>
              <div className="flex items-center justify-between pb-4 mb-6 border-b border-white/10">
                <h3 className="font-serif text-xl text-white font-normal">
                  Order Breakdown
                </h3>
                <span className="text-[10px] uppercase tracking-widest text-[#D4AF37] font-sans font-semibold">
                  Beverly Hills, CA
                </span>
              </div>

              {/* Line Items */}
              <div className="space-y-4 mb-8 text-sm font-sans">
                <div className="flex items-center justify-between text-neutral-300">
                  <span>Vehicle Price</span>
                  <span className="font-mono text-white">$420,000</span>
                </div>

                <div className="flex items-center justify-between text-neutral-300">
                  <span>Beverly Hills Tax (9.5%)</span>
                  <span className="font-mono text-white">$39,900</span>
                </div>

                <div className="flex items-center justify-between text-neutral-300">
                  <span>Delivery / Handling</span>
                  <span className="font-mono text-white">$2,500</span>
                </div>

                {/* Total Line */}
                <div className="pt-4 border-t border-[#D4AF37]/30 flex items-baseline justify-between">
                  <span className="text-xs uppercase tracking-[0.2em] text-[#F2E4AD] font-semibold">
                    Total
                  </span>
                  <span className="text-3xl sm:text-4xl font-serif text-[#D4AF37] font-normal tracking-tight">
                    $462,400
                  </span>
                </div>
              </div>

              {/* Vendor Information */}
              <div className="p-4 rounded-xl bg-[#151619] border border-white/5 mb-6 text-xs font-sans space-y-1">
                <div className="flex items-center gap-1.5 text-neutral-300 font-medium">
                  <MapPin className="w-3.5 h-3.5 text-[#D4AF37]" />
                  <span>Vendor: VEYLORA Beverly Hills</span>
                </div>
                <p className="text-neutral-400 pl-5">
                  445 N Canon Drive, Beverly Hills, CA 90210
                </p>
              </div>

              <div className="flex items-center gap-2 p-3 rounded-lg bg-[#D4AF37]/10 border border-[#D4AF37]/20 text-[11px] text-[#F2E4AD] font-sans mb-8">
                <ShieldCheck className="w-4 h-4 text-[#D4AF37] shrink-0" />
                <span>No payment taken here. Next step is Test Drive.</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3">
              <button
                onClick={handleProceed}
                className="w-full py-4 px-6 rounded-xl bg-[#D4AF37] hover:bg-[#F2E4AD] text-[#080809] text-xs uppercase tracking-[0.25em] font-semibold transition-all duration-300 shadow-[0_4px_25px_rgba(212,175,55,0.25)] hover:shadow-[0_6px_35px_rgba(212,175,55,0.45)] flex items-center justify-center gap-2 transform hover:-translate-y-0.5 active:translate-y-0"
              >
                <span>Proceed to Test Drive</span>
                <ArrowRight className="w-4 h-4 text-[#080809]" />
              </button>

              <button
                onClick={handleBack}
                className="w-full py-3.5 px-6 rounded-xl border border-[#D4AF37]/40 hover:border-[#D4AF37] bg-transparent hover:bg-[#D4AF37]/10 text-[#F2E4AD] text-xs uppercase tracking-[0.2em] font-semibold transition-all flex items-center justify-center gap-2"
              >
                <ArrowLeft className="w-4 h-4 text-[#D4AF37]" />
                <span>Back to All Cars Hall</span>
              </button>

              <p className="text-[10px] text-center text-neutral-500 uppercase tracking-widest pt-1 font-sans">
                Scene 06 of 07 · Beverly Hills Fleet Engine
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export { FinalSelectionScene };
