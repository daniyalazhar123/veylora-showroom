"use client";

import { useState, useEffect } from "react";
import { Sparkles, KeyRound, ChevronRight } from "lucide-react";

interface DoorEntranceProps {
  onEnter?: () => void;
}

export default function DoorEntranceModal({ onEnter }: DoorEntranceProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [isOpening, setIsOpening] = useState(false);

  useEffect(() => {
    // Check if user has already visited in this session
    try {
      const hasVisited = window.sessionStorage.getItem("veylora_doors_visited");
      if (!hasVisited) {
        setIsVisible(true);
        // Automatically start opening doors after 1.2s, dismiss at 2.5s
        const openTimer = setTimeout(() => {
          setIsOpening(true);
        }, 1200);

        const dismissTimer = setTimeout(() => {
          handleClose();
        }, 2500);

        return () => {
          clearTimeout(openTimer);
          clearTimeout(dismissTimer);
        };
      }
    } catch {
      // Fallback if sessionStorage is restricted
      setIsVisible(false);
    }
  }, []);

  const handleClose = () => {
    setIsOpening(true);
    try {
      window.sessionStorage.setItem("veylora_doors_visited", "true");
    } catch {
      // Ignore sessionStorage errors
    }

    setTimeout(() => {
      setIsVisible(false);
      if (onEnter) onEnter();
    }, 400);
  };

  // When dismissed: NEVER keep fixed inset-0 z-[9999] in DOM
  if (!isVisible) {
    return null;
  }

  return (
    <div
      onClick={handleClose}
      className={`fixed inset-0 z-50 flex items-center justify-center bg-black/95 transition-opacity duration-500 cursor-pointer ${
        isOpening ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
      style={{
        display: isVisible ? "flex" : "none",
        pointerEvents: isOpening ? "none" : "auto",
      }}
      aria-label="Welcome to VEYLORA Showroom Entrance Doors"
      role="dialog"
      aria-modal="true"
    >
      {/* Background Ambience */}
      <div className="absolute inset-0 bg-ambient-grid opacity-60 pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-gold-500/10 rounded-full blur-[100px] pointer-events-none" />

      {/* Central Announcement Banner */}
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative z-30 max-w-xl mx-4 text-center p-8 rounded-2xl bg-surface-card border-2 border-gold-500/50 shadow-gold-glow flex flex-col items-center"
      >
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-gold-500/40 bg-gold-500/10 text-gold-300 text-xs font-semibold tracking-[0.2em] uppercase mb-4 animate-pulse">
          <Sparkles className="w-3.5 h-3.5 text-gold-400" />
          The Sanctuary Experience
        </div>

        <h1 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-white mb-3">
          Welcome to VEYLORA Showroom
        </h1>

        <p className="font-sans text-neutral-300 text-xs sm:text-sm leading-relaxed mb-6 max-w-md">
          Step across the gilded threshold into Pakistan’s preeminent luxury automotive & motorcycle sanctuary.
        </p>

        {/* Action Button */}
        <button
          onClick={handleClose}
          className="btn-gold px-8 py-3 rounded-xl text-xs sm:text-sm font-bold tracking-[0.2em] uppercase flex items-center gap-2 shadow-gold hover:scale-105 active:scale-95 transition-all"
        >
          <KeyRound className="w-4 h-4 text-black" />
          <span>Enter Showroom</span>
          <ChevronRight className="w-4 h-4 text-black" />
        </button>

        <span className="text-[10px] font-mono text-gold-400/80 mt-3 tracking-widest block">
          CLICK ANYWHERE TO ENTER
        </span>
      </div>

      {/* Left Double Door Wing */}
      <div
        className={`absolute top-0 left-0 w-1/2 h-full bg-gradient-to-r from-[#0d0e11] via-[#15161a] to-[#0a0a0c] border-r-2 border-gold-500/60 transition-transform duration-1000 ease-[cubic-bezier(0.77,0,0.175,1)] z-20 flex items-center justify-end pr-8 ${
          isOpening ? "-translate-x-full" : "translate-x-0"
        }`}
        style={{
          boxShadow: "inset 0 0 50px rgba(0,0,0,0.95)",
        }}
      >
        <div className="w-5 h-28 rounded-full bg-gradient-to-b from-gold-300 via-gold-500 to-gold-700 shadow-gold border border-gold-200/50 flex items-center justify-center">
          <div className="w-1.5 h-20 bg-black/50 rounded-full" />
        </div>
      </div>

      {/* Right Double Door Wing */}
      <div
        className={`absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-[#0d0e11] via-[#15161a] to-[#0a0a0c] border-l-2 border-gold-500/60 transition-transform duration-1000 ease-[cubic-bezier(0.77,0,0.175,1)] z-20 flex items-center justify-start pl-8 ${
          isOpening ? "translate-x-full" : "translate-x-0"
        }`}
        style={{
          boxShadow: "inset 0 0 50px rgba(0,0,0,0.95)",
        }}
      >
        <div className="w-5 h-28 rounded-full bg-gradient-to-b from-gold-300 via-gold-500 to-gold-700 shadow-gold border border-gold-200/50 flex items-center justify-center">
          <div className="w-1.5 h-20 bg-black/50 rounded-full" />
        </div>
      </div>
    </div>
  );
}
