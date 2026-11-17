"use client";

import React, { useState, useEffect, useRef } from "react";
import { ArrowRight, Compass, ShieldCheck, Sparkles } from "lucide-react";

interface InsideDriveSceneProps {
  onContinue?: () => void;
  className?: string;
}

export default function InsideDriveScene({ onContinue, className = "" }: InsideDriveSceneProps) {
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
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const handleDriveForward = () => {
    if (onContinue) {
      onContinue();
    } else {
      const nextSection = document.getElementById("showroom-all-cars");
      if (nextSection) {
        nextSection.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <section
      ref={sectionRef}
      className={`relative w-full min-h-screen bg-[#080809] text-white flex items-center py-20 px-6 sm:px-10 lg:px-16 overflow-hidden ${className}`}
    >
      {/* Precision 1px Architectural Grid Overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(212,175,55,0.05)_0%,_transparent_70%)] pointer-events-none" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#d4af3708_1px,transparent_1px),linear-gradient(to_bottom,#d4af3708_1px,transparent_1px)] bg-[size:5rem_5rem] pointer-events-none" />

      <div className="max-w-6xl mx-auto w-full relative z-10 flex flex-col items-center text-center">
        {/* Eyebrow Navigation Tag */}
        <div
          className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-[#D4AF37]/30 bg-[#0F1012] text-[#D4AF37] text-[11px] font-sans font-medium uppercase tracking-[0.25em] mb-6 transition-all duration-700 ease-out"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? "translate3d(0, 0, 0)" : "translate3d(0, 16px, 0)",
            willChange: "transform, opacity",
          }}
        >
          <Compass className="w-3.5 h-3.5 text-[#D4AF37]" />
          <span>Scene 03 · Cockpit Immersion · Beverly Hills</span>
        </div>

        {/* Main Headline */}
        <h2
          className="font-serif text-3xl sm:text-5xl lg:text-6xl font-normal tracking-tight text-[#D4AF37] mb-4 max-w-3xl leading-[1.1] transition-all duration-700 ease-out delay-100"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? "translate3d(0, 0, 0)" : "translate3d(0, 20px, 0)",
            willChange: "transform, opacity",
          }}
        >
          You Are Inside — Now Driving Forward
        </h2>

        {/* Subtitle / Interior Details Narrative */}
        <p
          className="font-sans text-neutral-400 text-xs sm:text-sm uppercase tracking-[0.2em] max-w-xl mb-10 transition-all duration-700 ease-out delay-200"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? "translate3d(0, 0, 0)" : "translate3d(0, 20px, 0)",
            willChange: "transform, opacity",
          }}
        >
          Rolls-Royce Ghost Cockpit · 445 N Canon Drive
        </p>

        {/* Media Container: aspect-[16/10] Obsidian/Gold Container (Camera INSIDE the car) */}
        <div
          className="relative w-full max-w-4xl aspect-[16/10] bg-[#0A0B0D] border border-[#D4AF37]/25 rounded-2xl overflow-hidden shadow-[0_20px_60px_-20px_rgba(0,0,0,0.95)] flex flex-col items-center justify-center p-8 mb-10 transition-all duration-1000 ease-out delay-300"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? "translate3d(0, 0, 0) scale(1)" : "translate3d(0, 24px, 0) scale(0.98)",
            willChange: "transform, opacity",
          }}
        >
          {/* Subtle Ambient Vignette */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#080809] via-transparent to-[#080809]/60 pointer-events-none" />

          {/* Placeholder Centerpiece (Ready for <video> replacement) */}
          <div className="relative z-10 flex flex-col items-center text-center">
            <div className="w-16 h-16 rounded-full border border-[#D4AF37]/35 bg-[#0F1012] flex items-center justify-center mb-4 shadow-[0_0_25px_rgba(212,175,55,0.15)]">
              <div className="w-2.5 h-2.5 rounded-full bg-[#D4AF37] animate-pulse" />
            </div>

            <span className="text-sm sm:text-base font-sans tracking-[0.25em] uppercase text-[#D4AF37] font-semibold mb-2">
              Inside Car Video Placeholder
            </span>

            <span className="text-[11px] font-sans text-neutral-500 uppercase tracking-widest max-w-xs">
              First-Person Interior Cockpit View · 4K Perspective
            </span>
          </div>

          {/* Interior Specification Badges on Glass Footer */}
          <div className="absolute bottom-4 inset-x-4 sm:inset-x-8 z-10 flex flex-wrap items-center justify-center gap-2 sm:gap-4 pt-3 border-t border-white/5">
            <div className="flex items-center gap-2 px-3 py-1 rounded-md bg-[#0F1012]/85 border border-[#D4AF37]/20 backdrop-blur-md">
              <Sparkles className="w-3 h-3 text-[#D4AF37]" />
              <span className="text-[10px] uppercase tracking-wider text-neutral-300 font-sans font-medium">
                Gold Quilted Seats
              </span>
            </div>

            <div className="flex items-center gap-2 px-3 py-1 rounded-md bg-[#0F1012]/85 border border-[#D4AF37]/20 backdrop-blur-md">
              <ShieldCheck className="w-3 h-3 text-[#D4AF37]" />
              <span className="text-[10px] uppercase tracking-wider text-neutral-300 font-sans font-medium">
                Spirit of Ecstasy
              </span>
            </div>

            <div className="flex items-center gap-2 px-3 py-1 rounded-md bg-[#0F1012]/85 border border-[#D4AF37]/20 backdrop-blur-md">
              <div className="w-2 h-2 rounded-full bg-[#D4AF37]" />
              <span className="text-[10px] uppercase tracking-wider text-neutral-300 font-sans font-medium">
                Black Leather + Gold Interior
              </span>
            </div>
          </div>
        </div>

        {/* Action Button: Drive To All Cars Hall */}
        <div
          className="flex flex-col items-center gap-3 transition-all duration-700 ease-out delay-500"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? "translate3d(0, 0, 0)" : "translate3d(0, 16px, 0)",
            willChange: "transform, opacity",
          }}
        >
          <button
            onClick={handleDriveForward}
            className="py-4 px-10 rounded-xl bg-[#D4AF37] hover:bg-[#F2E4AD] text-[#080809] text-xs uppercase tracking-[0.25em] font-semibold transition-all duration-300 shadow-[0_4px_25px_rgba(212,175,55,0.25)] hover:shadow-[0_6px_35px_rgba(212,175,55,0.45)] flex items-center gap-3 transform hover:-translate-y-0.5 active:translate-y-0"
          >
            <span>Drive To All Cars Hall</span>
            <ArrowRight className="w-4 h-4 text-[#080809]" />
          </button>

          <span className="text-[10px] text-neutral-500 uppercase tracking-widest font-sans">
            Scene 03 of 07 · Beverly Hills Fleet Engine
          </span>
        </div>
      </div>
    </section>
  );
}

export { InsideDriveScene };
