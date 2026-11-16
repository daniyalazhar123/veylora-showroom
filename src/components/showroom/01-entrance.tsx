"use client";

import React, { useState, useEffect, useRef } from "react";
import { ChevronDown, Volume2, VolumeX, Play, Pause, MapPin, Sparkles } from "lucide-react";

interface EntranceSceneProps {
  onEnterShowroom?: () => void;
  className?: string;
}

export default function EntranceScene({ onEnterShowroom, className = "" }: EntranceSceneProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const gateVideoRef = useRef<HTMLVideoElement>(null);
  const ladiesVideoRef = useRef<HTMLVideoElement>(null);

  const [scrollProgress, setScrollProgress] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [activeStage, setActiveStage] = useState<"gate" | "transition" | "welcome">("gate");

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const totalDist = containerRef.current.offsetHeight - windowHeight;

      if (totalDist <= 0) return;

      const currentScroll = -rect.top;
      const progress = Math.min(Math.max(currentScroll / totalDist, 0), 1);
      setScrollProgress(progress);

      if (progress < 0.4) {
        setActiveStage("gate");
      } else if (progress < 0.75) {
        setActiveStage("transition");
      } else {
        setActiveStage("welcome");
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const togglePlayback = () => {
    if (gateVideoRef.current && ladiesVideoRef.current) {
      if (isPlaying) {
        gateVideoRef.current.pause();
        ladiesVideoRef.current.pause();
      } else {
        gateVideoRef.current.play().catch(() => {});
        ladiesVideoRef.current.play().catch(() => {});
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = () => {
    const nextMute = !isMuted;
    setIsMuted(nextMute);
    if (gateVideoRef.current) gateVideoRef.current.muted = nextMute;
    if (ladiesVideoRef.current) ladiesVideoRef.current.muted = nextMute;
  };

  const gateZoom = 1 + scrollProgress * 0.45;
  const gateOpacity = Math.max(1 - scrollProgress * 1.6, 0);
  const ladiesOpacity = Math.min(Math.max((scrollProgress - 0.35) * 2, 0), 1);
  const ladiesScale = 1.08 - (scrollProgress - 0.35) * 0.08;

  return (
    <div
      ref={containerRef}
      className={`relative w-full h-[220vh] bg-[#080809] text-white ${className}`}
    >
      {/* Sticky Full-Viewport Stage */}
      <div className="sticky top-0 w-full h-screen overflow-hidden flex flex-col justify-between select-none">
        {/* Layer 1: Media Container for 445 N Canon Drive Gate Video */}
        <div
          className="absolute inset-0 transition-opacity duration-700 ease-out pointer-events-none"
          style={{
            opacity: gateOpacity,
            transform: `scale(${gateZoom})`,
            willChange: "transform, opacity",
          }}
        >
          {/* Fullscreen Video Tag with Graceful Luxury Fallback */}
          <video
            ref={gateVideoRef}
            className="w-full h-full object-cover"
            autoPlay
            loop
            muted={isMuted}
            playsInline
            poster="/vehicles/escalade.svg"
          >
            <source src="/videos/beverly-hills-gate.mp4" type="video/mp4" />
          </video>

          {/* Architectural Dark Glass & Gold Vignette */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#080809]/80 via-[#080809]/40 to-[#080809]" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_transparent_35%,_#080809_100%)]" />

          {/* Precision 1px Architectural Gate Grid Overlay */}
          <div className="absolute inset-0 opacity-25 pointer-events-none bg-[linear-gradient(to_right,#d4af3710_1px,transparent_1px),linear-gradient(to_bottom,#d4af3710_1px,transparent_1px)] bg-[size:4rem_4rem]" />
        </div>

        {/* Layer 2: Media Container for Welcome Hostesses in Black Dress */}
        <div
          className="absolute inset-0 transition-all duration-700 ease-out pointer-events-none"
          style={{
            opacity: ladiesOpacity,
            transform: `scale(${Math.max(ladiesScale, 1)})`,
            willChange: "transform, opacity",
          }}
        >
          <video
            ref={ladiesVideoRef}
            className="w-full h-full object-cover"
            autoPlay
            loop
            muted={isMuted}
            playsInline
            poster="/receptionists/sophia.svg"
          >
            <source src="/videos/welcome-hostesses.mp4" type="video/mp4" />
          </video>

          <div className="absolute inset-0 bg-gradient-to-t from-[#080809] via-[#080809]/50 to-[#080809]/75" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom,_rgba(212,175,55,0.08)_0%,_transparent_60%)]" />
        </div>

        {/* Top Header Bar: Address & Status Indicator */}
        <header className="relative z-30 pt-8 px-6 sm:px-12 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-2 h-2 rounded-full bg-[#D4AF37] animate-ping" />
            <div className="flex items-center gap-2 px-3 py-1 rounded-full border border-[#D4AF37]/30 bg-[#080809]/80 backdrop-blur-md">
              <MapPin className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span className="text-[11px] uppercase tracking-[0.25em] text-[#F2E4AD] font-medium font-sans">
                445 N Canon Dr · Beverly Hills, CA 90210
              </span>
            </div>
          </div>

          {/* Media Audio & Playback Controls */}
          <div className="flex items-center gap-2 bg-[#080809]/80 border border-[#D4AF37]/30 rounded-full px-3 py-1.5 backdrop-blur-md">
            <button
              onClick={togglePlayback}
              className="p-1 text-neutral-400 hover:text-[#D4AF37] transition-colors"
              title={isPlaying ? "Pause Scene" : "Play Scene"}
              aria-label={isPlaying ? "Pause Video" : "Play Video"}
            >
              {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
            </button>
            <span className="w-[1px] h-3 bg-[#D4AF37]/30" />
            <button
              onClick={toggleMute}
              className="p-1 text-neutral-400 hover:text-[#D4AF37] transition-colors"
              title={isMuted ? "Unmute Audio" : "Mute Audio"}
              aria-label={isMuted ? "Unmute Sound" : "Mute Sound"}
            >
              {isMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
            </button>
          </div>
        </header>

        {/* Center Hero Content (Stage Dependent) */}
        <div className="relative z-20 max-w-5xl mx-auto px-6 text-center flex flex-col items-center my-auto">
          {/* Phase 1: Gate Exterior */}
          <div
            className="transition-all duration-700 ease-out flex flex-col items-center"
            style={{
              opacity: 1 - scrollProgress * 2,
              transform: `translateY(-${scrollProgress * 40}px)`,
              pointerEvents: scrollProgress > 0.45 ? "none" : "auto",
            }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#D4AF37]/40 bg-[#D4AF37]/10 text-[#F2E4AD] text-xs font-semibold tracking-[0.3em] uppercase mb-6">
              <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
              Private Gallery Arrival
            </div>

            <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl font-normal tracking-tight text-white mb-6 leading-[1.08]">
              Welcome to <span className="text-[#D4AF37] italic">VEYLORA</span>
              <br />
              <span className="text-2xl sm:text-4xl md:text-5xl font-light tracking-widest uppercase text-neutral-200">
                Beverly Hills
              </span>
            </h1>

            <p className="font-sans text-neutral-400 text-sm sm:text-base max-w-xl font-light tracking-wide leading-relaxed">
              Step through the glass and gilded bronze gates of 445 N Canon Drive into Southern California’s premier collector showroom.
            </p>
          </div>

          {/* Phase 2: Hostesses Welcome */}
          <div
            className="absolute inset-x-0 top-1/2 -translate-y-1/2 transition-all duration-700 ease-out flex flex-col items-center px-6"
            style={{
              opacity: scrollProgress >= 0.5 ? Math.min((scrollProgress - 0.5) * 2.5, 1) : 0,
              transform: `translateY(${(1 - scrollProgress) * 30}px)`,
              pointerEvents: scrollProgress >= 0.6 ? "auto" : "none",
            }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#D4AF37]/40 bg-[#D4AF37]/10 text-[#F2E4AD] text-xs font-semibold tracking-[0.3em] uppercase mb-4">
              Executive Host Concierge
            </div>

            <h2 className="font-serif text-3xl sm:text-5xl font-normal text-white mb-3 tracking-tight">
              Your Hosts Await You
            </h2>

            <p className="font-sans text-neutral-300 text-xs sm:text-sm max-w-lg mb-6 leading-relaxed font-light">
              Sophia Laurent, Elena Rostova, and the Beverly Hills client team invite you into the private vehicle salon.
            </p>

            {onEnterShowroom && (
              <button
                onClick={onEnterShowroom}
                className="px-8 py-3.5 rounded-full bg-[#D4AF37] text-[#080809] text-xs uppercase tracking-[0.25em] font-semibold hover:bg-[#F2E4AD] transition-all transform hover:scale-105 active:scale-95 shadow-[0_4px_25px_rgba(212,175,55,0.3)]"
              >
                Enter Grand Salon
              </button>
            )}
          </div>
        </div>

        {/* Bottom Interactive Progress & Scroll to Enter Indicator */}
        <footer className="relative z-30 pb-10 px-6 flex flex-col items-center">
          <div
            className="flex flex-col items-center gap-2 text-center transition-opacity duration-500"
            style={{ opacity: Math.max(1 - scrollProgress * 1.8, 0) }}
          >
            <span className="text-[10px] uppercase tracking-[0.35em] text-[#D4AF37] font-semibold">
              Scroll to Enter
            </span>
            <div className="w-5 h-8 rounded-full border border-[#D4AF37]/40 flex items-start justify-center p-1">
              <div className="w-1 h-2 rounded-full bg-[#D4AF37] animate-bounce" />
            </div>
            <ChevronDown className="w-4 h-4 text-[#D4AF37]/70 -mt-1 animate-pulse" />
          </div>

          {/* Discreet Golden Timeline Rail */}
          <div className="w-48 sm:w-64 h-[1px] bg-white/10 mt-4 relative overflow-hidden">
            <div
              className="absolute left-0 top-0 bottom-0 bg-[#D4AF37] transition-all duration-150 ease-out"
              style={{ width: `${Math.round(scrollProgress * 100)}%` }}
            />
          </div>
          <span className="text-[9px] uppercase tracking-[0.25em] text-neutral-500 mt-2 font-mono">
            {activeStage === "gate" ? "445 N Canon Drive Gate" : activeStage === "transition" ? "Entering Gilded Foyer" : "Salon Welcome"}
          </span>
        </footer>
      </div>
    </div>
  );
}

export { EntranceScene };
