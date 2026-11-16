"use client";

import React, { useState, useEffect, useRef } from "react";
import { Gauge, Zap, Cog, ShieldCheck, ChevronRight } from "lucide-react";

interface SelectCarSceneProps {
  onContinue?: () => void;
  className?: string;
}

export default function SelectCarScene({ onContinue, className = "" }: SelectCarSceneProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    // Fade-in trigger when section enters viewport
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

  return (
    <section
      ref={sectionRef}
      className={`relative w-full min-h-screen bg-[#080809] text-white flex items-center py-16 px-6 sm:px-10 lg:px-16 overflow-hidden ${className}`}
    >
      {/* Subtle Beverly Hills Architectural Background */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(212,175,55,0.06)_0%,_transparent_60%)] pointer-events-none" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#d4af3708_1px,transparent_1px),linear-gradient(to_bottom,#d4af3708_1px,transparent_1px)] bg-[size:5rem_5rem] pointer-events-none" />

      <div className="max-w-7xl mx-auto w-full relative z-10">
        {/* Top Eyebrow */}
        <div
          className={`flex items-center gap-3 mb-8 transition-all duration-700 ease-out ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          <div className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]" />
          <span className="text-[11px] uppercase tracking-[0.3em] text-[#D4AF37] font-sans font-medium">
            Scene 02 · Fleet Curation · Beverly Hills Sanctuary
          </span>
        </div>

        {/* 7/12 and 5/12 Layout Split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Side: 7/12 Media Container */}
          <div
            className={`lg:col-span-7 transition-all duration-1000 ease-out delay-150 ${
              isVisible ? "opacity-100 translate-x-0 scale-100" : "opacity-0 -translate-x-6 scale-[0.98]"
            }`}
          >
            <div className="relative w-full aspect-[16/10] bg-[#0F1012] border border-[#D4AF37]/25 rounded-2xl overflow-hidden shadow-[0_12px_40px_-15px_rgba(0,0,0,0.9)] flex items-center justify-center">
              {/* HTML5 Video Tag with Black Fallback */}
              <video
                className={`w-full h-full object-cover transition-opacity duration-700 ${
                  videoLoaded ? "opacity-100" : "opacity-0"
                }`}
                autoPlay
                loop
                muted
                playsInline
                onLoadedData={() => setVideoLoaded(true)}
              >
                <source src="/videos/rolls-royce-ghost.mp4" type="video/mp4" />
              </video>

              {/* Dark Luxury Placeholder Box (Shows when video file is pending upload) */}
              <div
                className={`absolute inset-0 bg-[#0A0B0D] flex flex-col items-center justify-center p-8 text-center transition-opacity duration-500 ${
                  videoLoaded ? "opacity-0 pointer-events-none" : "opacity-100"
                }`}
              >
                <div className="w-16 h-16 rounded-full border border-[#D4AF37]/30 bg-[#D4AF37]/5 flex items-center justify-center mb-4">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#D4AF37] animate-pulse" />
                </div>
                <p className="text-sm font-sans tracking-[0.25em] uppercase text-[#D4AF37] font-semibold mb-1">
                  Car Video Placeholder
                </p>
                <p className="text-xs text-neutral-500 font-sans tracking-wider max-w-sm">
                  Rolls-Royce Ghost Black Badge · 4K Studio Reel Slot
                </p>
              </div>

              {/* Subtle 1px Inner Border Glow */}
              <div className="absolute inset-0 pointer-events-none rounded-2xl border border-white/5" />

              {/* Badge Overlay */}
              <div className="absolute top-4 left-4 z-10 px-3 py-1 rounded-md bg-[#080809]/80 border border-[#D4AF37]/30 backdrop-blur-md">
                <span className="text-[10px] uppercase tracking-[0.2em] text-[#F2E4AD] font-medium font-sans">
                  Private Salon Floor
                </span>
              </div>
            </div>
          </div>

          {/* Right Side: 5/12 Car Detail Card */}
          <div
            className={`lg:col-span-5 transition-all duration-1000 ease-out delay-300 ${
              isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-6"
            }`}
          >
            <div className="p-8 sm:p-10 rounded-2xl bg-[#0F1012] border border-[#D4AF37]/30 shadow-[0_16px_50px_-20px_rgba(0,0,0,0.85)] flex flex-col justify-between">
              {/* Heading */}
              <div>
                <p className="text-[11px] uppercase tracking-[0.25em] text-[#D4AF37] font-sans font-medium mb-2">
                  Bespoke Commission
                </p>
                <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-normal tracking-tight text-[#D4AF37] mb-3 leading-tight">
                  Select Your Rolls-Royce Ghost
                </h2>
                <p className="text-xs uppercase tracking-[0.18em] text-neutral-400 font-sans mb-6">
                  Black Badge Edition · Beverly Hills Specification
                </p>

                {/* Price Display */}
                <div className="pb-6 mb-6 border-b border-white/10 flex items-baseline gap-3">
                  <span className="text-3xl sm:text-4xl font-serif text-white font-light tracking-tight">
                    $420,000
                  </span>
                  <span className="text-xs text-neutral-400 font-sans uppercase tracking-wider">
                    USD · MSRP
                  </span>
                </div>

                {/* Specifications Grid */}
                <div className="grid grid-cols-2 gap-4 mb-8">
                  <div className="p-3.5 rounded-xl bg-[#151619] border border-white/5">
                    <div className="flex items-center gap-2 text-neutral-400 mb-1">
                      <Cog className="w-3.5 h-3.5 text-[#D4AF37]" />
                      <span className="text-[10px] uppercase tracking-wider font-sans">Engine</span>
                    </div>
                    <span className="text-sm font-medium text-white tracking-wide">6.75L V12</span>
                  </div>

                  <div className="p-3.5 rounded-xl bg-[#151619] border border-white/5">
                    <div className="flex items-center gap-2 text-neutral-400 mb-1">
                      <Zap className="w-3.5 h-3.5 text-[#D4AF37]" />
                      <span className="text-[10px] uppercase tracking-wider font-sans">Power</span>
                    </div>
                    <span className="text-sm font-medium text-white tracking-wide">563 HP</span>
                  </div>

                  <div className="p-3.5 rounded-xl bg-[#151619] border border-white/5">
                    <div className="flex items-center gap-2 text-neutral-400 mb-1">
                      <Gauge className="w-3.5 h-3.5 text-[#D4AF37]" />
                      <span className="text-[10px] uppercase tracking-wider font-sans">0–60 MPH</span>
                    </div>
                    <span className="text-sm font-medium text-white tracking-wide">4.6 Seconds</span>
                  </div>

                  <div className="p-3.5 rounded-xl bg-[#151619] border border-white/5">
                    <div className="flex items-center gap-2 text-neutral-400 mb-1">
                      <ShieldCheck className="w-3.5 h-3.5 text-[#D4AF37]" />
                      <span className="text-[10px] uppercase tracking-wider font-sans">Drivetrain</span>
                    </div>
                    <span className="text-sm font-medium text-white tracking-wide">All-Wheel Drive</span>
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <div>
                <button
                  onClick={onContinue}
                  className="w-full py-4 px-6 rounded-xl bg-[#D4AF37] hover:bg-[#F2E4AD] text-[#080809] text-xs uppercase tracking-[0.25em] font-semibold transition-all duration-300 shadow-[0_4px_20px_rgba(212,175,55,0.25)] hover:shadow-[0_6px_28px_rgba(212,175,55,0.4)] flex items-center justify-center gap-2 transform hover:-translate-y-0.5 active:translate-y-0"
                >
                  <span>Sit Inside - Continue</span>
                  <ChevronRight className="w-4 h-4 text-[#080809]" />
                </button>
                <p className="text-[10px] text-center text-neutral-500 uppercase tracking-widest mt-3 font-sans">
                  Scene 02 of 07 · 445 N Canon Dr
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export { SelectCarScene };
