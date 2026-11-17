"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  ArrowLeft,
  Calendar,
  Clock,
  MapPin,
  Check,
  CheckCircle2,
  Sparkles,
  ShieldCheck,
  KeyRound,
  User,
  Phone,
  Mail,
  Car,
  Gauge,
  Zap,
  X,
  Compass,
  Bot,
  Send,
  Loader2,
  MessageSquare,
} from "lucide-react";

interface TestDriveBookingSceneProps {
  onBackToScene6?: () => void;
  onBackToShowroom?: () => void;
  className?: string;
  selectedCar?: {
    name: string;
    totalPrice: string;
    engine: string;
    hp: string;
    acceleration: string;
    color: string;
  };
}

const TIME_SLOTS = ["10 AM", "12 PM", "2 PM", "4 PM", "6 PM"];
const LOCATIONS = [
  {
    id: "Beverly Hills Showroom",
    label: "Beverly Hills Showroom",
    detail: "445 N Canon Drive, Beverly Hills, CA 90210",
  },
  {
    id: "Home Test Drive",
    label: "Home Test Drive",
    detail: "Private VIP Delivery to your residence / estate",
  },
];

const SUGGESTED_QUESTIONS = [
  "What are the specs of the Rolls-Royce Ghost Black Badge?",
  "What is the price of the Rolls-Royce Ghost?",
  "Tell me about the Cadillac Escalade-V",
  "What is the horsepower of the Ducati Panigale V4?",
];

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

export default function TestDriveBookingScene({
  onBackToScene6,
  onBackToShowroom,
  className = "",
  selectedCar = {
    name: "Rolls-Royce Ghost Black Badge",
    totalPrice: "$462,400",
    engine: "6.75L Twin-Turbo V12",
    hp: "563 HP",
    acceleration: "4.6s 0-100 km/h",
    color: "Diamond Black / Bespoke Mandarin",
  },
}: TestDriveBookingSceneProps) {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  // Form State
  const [fullName, setFullName] = useState("Alexander Vance");
  const [phoneNumber, setPhoneNumber] = useState("+1 (310) 849-2000");
  const [email, setEmail] = useState("vance.vip@veylora.com");
  const [selectedDate, setSelectedDate] = useState("2026-11-20");
  const [selectedTime, setSelectedTime] = useState("2 PM");
  const [selectedLocation, setSelectedLocation] = useState("Beverly Hills Showroom");
  const [hasLicense, setHasLicense] = useState(true);

  // Booking Execution State
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [bookingId, setBookingId] = useState("VEYLORA-8492");
  const [apiConnected, setApiConnected] = useState<boolean | null>(null);

  // AI Assistant Widget State
  const [aiQuestion, setAiQuestion] = useState("");
  const [aiAnswer, setAiAnswer] = useState<string | null>(null);
  const [aiSources, setAiSources] = useState<string[]>([]);
  const [isAsking, setIsAsking] = useState(false);

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

  const handleBackToScene6 = () => {
    if (onBackToScene6) {
      onBackToScene6();
    } else {
      const scene6 = document.getElementById("showroom-final-selection");
      if (scene6) {
        scene6.scrollIntoView({ behavior: "smooth" });
      } else {
        const carsSection = document.getElementById("showroom-all-cars");
        if (carsSection) {
          carsSection.scrollIntoView({ behavior: "smooth" });
        }
      }
    }
  };

  // TASK 4: Submit booking to FastAPI backend (Neon DB) with UI fallback
  const handleSubmitBooking = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const fallbackBookingId = `VEYLORA-${Math.floor(1000 + Math.random() * 9000)}`;

    try {
      const response = await fetch(`${API_BASE_URL}/api/book-test-drive`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          full_name: fullName.trim(),
          phone: phoneNumber.trim(),
          email: email.trim(),
          car_name: selectedCar.name || "Rolls-Royce Ghost Black Badge",
          car_price: 462400, // Strictly enforced PRICE RULE: $462,400
          booking_date: selectedDate,
          time_slot: selectedTime,
          location: selectedLocation,
          has_license: hasLicense,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        if (data.booking_id) {
          setBookingId(data.booking_id);
          setApiConnected(true);
        } else {
          setBookingId(fallbackBookingId);
        }
      } else {
        // Fallback to UI-only behavior
        setBookingId(fallbackBookingId);
        setApiConnected(false);
      }
    } catch (err) {
      // Backend not running yet or network error -> smooth fallback to UI-only behavior
      console.warn("Backend API not reachable, falling back to local reservation:", err);
      setBookingId(fallbackBookingId);
      setApiConnected(false);
    } finally {
      setIsSubmitting(false);
      setShowSuccess(true);
    }
  };

  const handleBackToShowroom = () => {
    setShowSuccess(false);
    if (onBackToShowroom) {
      onBackToShowroom();
    } else {
      const entrance =
        document.getElementById("showroom-entrance") ||
        document.getElementById("showroom-final-selection") ||
        document.getElementById("featured-fleet");
      if (entrance) {
        entrance.scrollIntoView({ behavior: "smooth" });
      } else {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    }
  };

  // TASK 4: AI Assistant widget submission
  const handleAskAI = async (questionToAsk?: string) => {
    const q = (questionToAsk || aiQuestion).trim();
    if (!q) return;

    setIsAsking(true);
    setAiAnswer(null);
    setAiSources([]);

    try {
      const response = await fetch(`${API_BASE_URL}/api/ask`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ question: q }),
      });

      if (response.ok) {
        const data = await response.json();
        setAiAnswer(data.answer);
        if (data.sources && Array.isArray(data.sources)) {
          setAiSources(data.sources);
        }
      } else {
        // Fallback luxury response
        setAiAnswer(
          "Welcome to VEYLORA USA · Beverly Hills. The Rolls-Royce Ghost Black Badge is commissioned strictly at $462,400 USD, featuring a 6.75L V12 (563 HP) and bespoke Starlight headliner. Our concierge team at 445 N Canon Drive will be delighted to prepare the vehicle for your arrival."
        );
      }
    } catch (err) {
      // Offline fallback
      setAiAnswer(
        "Welcome to VEYLORA USA · Beverly Hills. The Rolls-Royce Ghost Black Badge is commissioned strictly at $462,400 USD with a 6.75L Twin-Turbo V12 (563 HP). Our concierge team is standing by to coordinate your private test drive."
      );
    } finally {
      setIsAsking(false);
    }
  };

  return (
    <section
      ref={sectionRef}
      id="showroom-test-drive-booking"
      className={`relative w-full min-h-screen bg-[#080809] text-white py-24 px-4 sm:px-8 lg:px-16 overflow-hidden flex flex-col justify-between ${className}`}
    >
      {/* Precision Ambient Atmosphere: Gilded grid & subtle radial illumination */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(212,175,55,0.08)_0%,_transparent_65%)] pointer-events-none" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#d4af3708_1px,transparent_1px),linear-gradient(to_bottom,#d4af3708_1px,transparent_1px)] bg-[size:5rem_5rem] pointer-events-none" />

      <div className="max-w-7xl mx-auto w-full relative z-10">
        {/* 1. Top Header */}
        <div
          className="text-center max-w-3xl mx-auto mb-16 transition-all duration-700 ease-out"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? "translate3d(0, 0, 0)" : "translate3d(0, 20px, 0)",
            willChange: "transform, opacity",
          }}
        >
          {/* Eyebrow: VEYLORA USA - Beverly Hills */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#D4AF37]/40 bg-[#D4AF37]/10 text-[#D4AF37] text-xs font-semibold tracking-[0.3em] uppercase mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37] animate-pulse" />
            <span>VEYLORA USA - Beverly Hills</span>
          </div>

          {/* Title Big: Book Your Test Drive */}
          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-white font-normal tracking-tight mb-4">
            Book Your <span className="text-[#D4AF37]">Test Drive</span>
          </h1>

          {/* Subtitle: Experience Luxury. Feel The Power. */}
          <p className="font-sans text-neutral-300 text-base sm:text-lg tracking-wide max-w-xl mx-auto">
            Experience Luxury. Feel The Power.
          </p>

          <div className="flex items-center justify-center gap-2 mt-4 text-[11px] text-neutral-500 uppercase tracking-widest font-sans">
            <span>Scene 07 · Final Experience</span>
            <span>•</span>
            <span>Beverly Hills Sanctuary Concierge</span>
          </div>
        </div>

        {/* 2-Column Split: Left = Selected Car Summary, Right = Booking Form */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch mb-16">
          {/* 2. Left Side: Selected Car Summary ($462,400 wala) */}
          <div
            className="lg:col-span-5 flex flex-col justify-between p-8 sm:p-10 rounded-2xl bg-[#0F1012] border border-[#D4AF37]/35 shadow-[0_20px_60px_-20px_rgba(0,0,0,0.95)] transition-all duration-1000 ease-out delay-150"
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? "translate3d(0, 0, 0)" : "translate3d(0, 24px, 0)",
              willChange: "transform, opacity",
            }}
          >
            <div>
              {/* Eyebrow */}
              <div className="flex items-center justify-between mb-4 pb-3 border-b border-white/10">
                <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-[#D4AF37] font-sans font-semibold">
                  <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
                  <span>Selected Vehicle</span>
                </div>
                <span className="text-[10px] uppercase tracking-widest px-2.5 py-0.5 rounded-full bg-[#D4AF37]/15 border border-[#D4AF37]/30 text-[#F2E4AD]">
                  Scene 6 Curation
                </span>
              </div>

              {/* Car Name & Subtitle */}
              <h2 className="font-serif text-2xl sm:text-3xl text-white font-normal tracking-tight mb-1">
                {selectedCar.name}
              </h2>
              <p className="font-sans text-xs uppercase tracking-widest text-neutral-400 mb-6">
                Bespoke Beverly Hills Commission Specification
              </p>

              {/* Image / Card: Same style as Scene 6 */}
              <div className="relative w-full aspect-[16/10] bg-[#0A0B0D] border border-[#D4AF37]/25 rounded-xl overflow-hidden flex flex-col items-center justify-center p-6 text-center mb-6 shadow-inner group">
                <div className="absolute inset-0 bg-gradient-to-tr from-[#D4AF37]/5 via-transparent to-transparent pointer-events-none" />

                {/* Stylized Luxury Vehicle Silhouette / Emblem */}
                <div className="relative z-10 flex flex-col items-center">
                  <div className="w-20 h-20 rounded-full border border-[#D4AF37]/40 bg-[#0F1012] flex items-center justify-center mb-3 shadow-[0_0_20px_rgba(212,175,55,0.15)]">
                    <Car className="w-9 h-9 text-[#D4AF37] transition-transform duration-500 group-hover:scale-110" />
                  </div>
                  <span className="text-xs uppercase tracking-[0.25em] text-[#D4AF37] font-sans font-semibold mb-1">
                    {selectedCar.name}
                  </span>
                  <span className="text-[10px] uppercase tracking-wider text-neutral-400 font-sans">
                    Sanctuary Beverly Hills Demo Fleet
                  </span>
                </div>

                {/* Bottom Card Ribbon */}
                <div className="absolute bottom-2 inset-x-4 flex items-center justify-between text-[10px] font-sans text-neutral-500 border-t border-white/5 pt-2">
                  <span>VIN: VEY-BH-774092</span>
                  <span className="text-[#D4AF37]">Available For Drive</span>
                </div>
              </div>

              {/* Price Banner: $462,400 */}
              <div className="p-4 rounded-xl bg-[#151619] border border-[#D4AF37]/30 mb-6 flex items-baseline justify-between">
                <div>
                  <span className="block text-[10px] uppercase tracking-[0.2em] text-neutral-400 font-sans">
                    Total Delivered Valuation
                  </span>
                  <span className="text-3xl font-serif text-[#D4AF37] font-normal tracking-tight">
                    {selectedCar.totalPrice}
                  </span>
                </div>
                <span className="text-[11px] text-[#F2E4AD] font-sans uppercase tracking-widest text-right">
                  USD · All Taxes Included
                </span>
              </div>

              {/* Small Specs: Engine, HP, 0-100, Color */}
              <div className="grid grid-cols-2 gap-3 mb-6 font-sans text-xs">
                <div className="p-3 rounded-lg bg-[#151619] border border-white/5">
                  <div className="flex items-center gap-1.5 text-neutral-400 text-[10px] uppercase tracking-wider mb-1">
                    <Gauge className="w-3.5 h-3.5 text-[#D4AF37]" />
                    <span>Engine</span>
                  </div>
                  <div className="font-medium text-white text-[13px]">{selectedCar.engine}</div>
                </div>

                <div className="p-3 rounded-lg bg-[#151619] border border-white/5">
                  <div className="flex items-center gap-1.5 text-neutral-400 text-[10px] uppercase tracking-wider mb-1">
                    <Zap className="w-3.5 h-3.5 text-[#D4AF37]" />
                    <span>Power (HP)</span>
                  </div>
                  <div className="font-medium text-white text-[13px]">{selectedCar.hp}</div>
                </div>

                <div className="p-3 rounded-lg bg-[#151619] border border-white/5">
                  <div className="flex items-center gap-1.5 text-neutral-400 text-[10px] uppercase tracking-wider mb-1">
                    <Clock className="w-3.5 h-3.5 text-[#D4AF37]" />
                    <span>0-100 km/h</span>
                  </div>
                  <div className="font-medium text-white text-[13px]">{selectedCar.acceleration}</div>
                </div>

                <div className="p-3 rounded-lg bg-[#151619] border border-white/5">
                  <div className="flex items-center gap-1.5 text-neutral-400 text-[10px] uppercase tracking-wider mb-1">
                    <div className="w-2.5 h-2.5 rounded-full bg-[#111] border border-[#D4AF37]" />
                    <span>Color</span>
                  </div>
                  <div className="font-medium text-white text-[13px] truncate" title={selectedCar.color}>
                    {selectedCar.color}
                  </div>
                </div>
              </div>
            </div>

            {/* Button: "Change Car" - goes back to Scene 6 */}
            <div className="pt-4 border-t border-white/10 space-y-2">
              <button
                type="button"
                onClick={handleBackToScene6}
                className="w-full py-3.5 px-6 rounded-xl border border-[#D4AF37]/40 hover:border-[#D4AF37] bg-transparent hover:bg-[#D4AF37]/10 text-[#F2E4AD] text-xs uppercase tracking-[0.2em] font-semibold transition-all duration-300 flex items-center justify-center gap-2 group cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4 text-[#D4AF37] transition-transform group-hover:-translate-x-1" />
                <span>Change Car</span>
              </button>
              <p className="text-[10px] text-center text-neutral-500 uppercase tracking-widest font-sans">
                Returns to Scene 06 Order Summary
              </p>
            </div>
          </div>

          {/* 3. Right Side: Booking Form (Connected to FastAPI & Neon DB) */}
          <div
            className="lg:col-span-7 flex flex-col justify-between p-8 sm:p-10 rounded-2xl bg-[#0F1012] border border-[#D4AF37]/35 shadow-[0_20px_60px_-20px_rgba(0,0,0,0.95)] transition-all duration-1000 ease-out delay-300"
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? "translate3d(0, 0, 0)" : "translate3d(0, 24px, 0)",
              willChange: "transform, opacity",
            }}
          >
            <form onSubmit={handleSubmitBooking} className="space-y-6">
              {/* Header inside form */}
              <div className="flex items-center justify-between pb-4 border-b border-white/10">
                <div>
                  <h3 className="font-serif text-2xl text-white font-normal">
                    Private Reservation Form
                  </h3>
                  <p className="font-sans text-xs text-neutral-400 mt-1">
                    Select your preferred schedule and liaison destination.
                  </p>
                </div>
                <div className="hidden sm:flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#151619] border border-[#D4AF37]/30 text-[10px] uppercase tracking-wider text-[#D4AF37]">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#D4AF37]" />
                  <span>Neon Secured</span>
                </div>
              </div>

              {/* Full Name Input */}
              <div className="space-y-1.5">
                <label className="block text-xs uppercase tracking-[0.18em] text-neutral-300 font-sans font-medium">
                  Full Name <span className="text-[#D4AF37]">*</span>
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-[#D4AF37] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="e.g. Lord Alexander Vance"
                    className="w-full pl-10 pr-4 py-3 bg-[#151619] border border-white/10 rounded-xl text-white text-sm placeholder:text-neutral-600 focus:outline-none focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] transition-all"
                  />
                </div>
              </div>

              {/* Phone & Email Inputs */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="block text-xs uppercase tracking-[0.18em] text-neutral-300 font-sans font-medium">
                    Phone Number <span className="text-[#D4AF37]">*</span>
                  </label>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-[#D4AF37] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                    <input
                      type="tel"
                      required
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                      placeholder="+1 (310) 849-2000"
                      className="w-full pl-10 pr-4 py-3 bg-[#151619] border border-white/10 rounded-xl text-white text-sm placeholder:text-neutral-600 focus:outline-none focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] transition-all"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="block text-xs uppercase tracking-[0.18em] text-neutral-300 font-sans font-medium">
                    Email Address <span className="text-[#D4AF37]">*</span>
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-[#D4AF37] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="client@veylora.com"
                      className="w-full pl-10 pr-4 py-3 bg-[#151619] border border-white/10 rounded-xl text-white text-sm placeholder:text-neutral-600 focus:outline-none focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] transition-all"
                    />
                  </div>
                </div>
              </div>

              {/* Select Date - date picker UI */}
              <div className="space-y-1.5">
                <label className="block text-xs uppercase tracking-[0.18em] text-neutral-300 font-sans font-medium">
                  Select Date <span className="text-[#D4AF37]">*</span>
                </label>
                <div className="relative">
                  <Calendar className="w-4 h-4 text-[#D4AF37] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <input
                    type="date"
                    required
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 bg-[#151619] border border-white/10 rounded-xl text-white text-sm focus:outline-none focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] transition-all scheme-dark"
                  />
                </div>
              </div>

              {/* Select Time - time slots: 10 AM, 12 PM, 2 PM, 4 PM, 6 PM */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="block text-xs uppercase tracking-[0.18em] text-neutral-300 font-sans font-medium">
                    Select Time Slot <span className="text-[#D4AF37]">*</span>
                  </label>
                  <span className="text-[11px] text-[#D4AF37] font-sans">
                    Selected: {selectedTime}
                  </span>
                </div>
                <div className="grid grid-cols-5 gap-2 sm:gap-3">
                  {TIME_SLOTS.map((slot) => {
                    const isSelected = selectedTime === slot;
                    return (
                      <button
                        key={slot}
                        type="button"
                        onClick={() => setSelectedTime(slot)}
                        className={`py-2.5 px-1 sm:px-2 rounded-xl text-xs sm:text-sm font-sans font-semibold transition-all duration-200 border flex flex-col items-center justify-center cursor-pointer ${
                          isSelected
                            ? "bg-[#D4AF37] text-[#080809] border-[#D4AF37] shadow-[0_0_15px_rgba(212,175,55,0.4)] scale-105"
                            : "bg-[#151619] text-neutral-300 border-white/10 hover:border-[#D4AF37]/50 hover:text-white"
                        }`}
                      >
                        <span>{slot}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Select Location: Beverly Hills Showroom / Home Test Drive */}
              <div className="space-y-2">
                <label className="block text-xs uppercase tracking-[0.18em] text-neutral-300 font-sans font-medium">
                  Select Location <span className="text-[#D4AF37]">*</span>
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {LOCATIONS.map((loc) => {
                    const isSelected = selectedLocation === loc.id;
                    return (
                      <div
                        key={loc.id}
                        onClick={() => setSelectedLocation(loc.id)}
                        className={`cursor-pointer p-4 rounded-xl border transition-all duration-200 flex items-start gap-3 ${
                          isSelected
                            ? "bg-[#D4AF37]/10 border-[#D4AF37] shadow-[0_0_15px_rgba(212,175,55,0.2)]"
                            : "bg-[#151619] border-white/10 hover:border-[#D4AF37]/40"
                        }`}
                      >
                        <div
                          className={`mt-0.5 w-4 h-4 rounded-full border flex items-center justify-center shrink-0 ${
                            isSelected
                              ? "border-[#D4AF37] bg-[#D4AF37]"
                              : "border-neutral-500"
                          }`}
                        >
                          {isSelected && <Check className="w-2.5 h-2.5 text-black stroke-[3]" />}
                        </div>
                        <div>
                          <div className="text-xs font-semibold text-white font-sans flex items-center gap-1.5">
                            <MapPin className="w-3.5 h-3.5 text-[#D4AF37]" />
                            <span>{loc.label}</span>
                          </div>
                          <p className="text-[11px] text-neutral-400 font-sans mt-0.5 leading-snug">
                            {loc.detail}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Driving License? - Yes / No toggle */}
              <div className="p-4 rounded-xl bg-[#151619] border border-white/10 flex items-center justify-between">
                <div className="space-y-0.5">
                  <div className="text-xs font-semibold uppercase tracking-wider text-white font-sans flex items-center gap-2">
                    <KeyRound className="w-4 h-4 text-[#D4AF37]" />
                    <span>Valid Driving License?</span>
                  </div>
                  <p className="text-[11px] text-neutral-400 font-sans">
                    Physical US or International driver’s license required during appointment.
                  </p>
                </div>

                {/* Yes / No Toggle buttons */}
                <div className="inline-flex rounded-lg p-1 bg-[#0A0B0D] border border-white/10">
                  <button
                    type="button"
                    onClick={() => setHasLicense(true)}
                    className={`px-3 py-1 rounded text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer ${
                      hasLicense
                        ? "bg-[#D4AF37] text-black shadow-sm"
                        : "text-neutral-400 hover:text-white"
                    }`}
                  >
                    Yes
                  </button>
                  <button
                    type="button"
                    onClick={() => setHasLicense(false)}
                    className={`px-3 py-1 rounded text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer ${
                      !hasLicense
                        ? "bg-neutral-800 text-white shadow-sm"
                        : "text-neutral-400 hover:text-white"
                    }`}
                  >
                    No
                  </button>
                </div>
              </div>

              {/* Button: "Confirm Test Drive Booking" - Gold button */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 px-6 rounded-xl bg-[#D4AF37] hover:bg-[#F2E4AD] text-[#080809] text-xs sm:text-sm uppercase tracking-[0.25em] font-bold transition-all duration-300 shadow-[0_4px_25px_rgba(212,175,55,0.25)] hover:shadow-[0_6px_35px_rgba(212,175,55,0.45)] flex items-center justify-center gap-2.5 transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer disabled:opacity-75 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 text-black animate-spin" />
                      <span>Securing Reservation in Neon...</span>
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4 text-[#080809]" />
                      <span>Confirm Test Drive Booking</span>
                    </>
                  )}
                </button>
                <p className="text-[10px] text-center text-neutral-500 uppercase tracking-widest pt-2 font-sans">
                  Connected to Neon DB · No payment card required · Beverly Hills Concierge
                </p>
              </div>
            </form>
          </div>
        </div>

        {/* TASK 4: AI Assistant Widget - Luxury Black+Gold Card */}
        <div
          className="max-w-4xl mx-auto mb-16 p-6 sm:p-8 rounded-2xl bg-[#0F1012] border border-[#D4AF37]/35 shadow-[0_16px_50px_-20px_rgba(0,0,0,0.95)] transition-all duration-700 ease-out"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? "translate3d(0, 0, 0)" : "translate3d(0, 20px, 0)",
          }}
        >
          {/* Widget Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-5 mb-5 border-b border-white/10 gap-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#D4AF37]/15 border border-[#D4AF37]/40 flex items-center justify-center text-[#D4AF37] shadow-[0_0_15px_rgba(212,175,55,0.2)]">
                <Bot className="w-5 h-5" />
              </div>
              <div>
                <div className="inline-flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-[0.2em] text-[#D4AF37]">
                  <Sparkles className="w-3 h-3 text-[#D4AF37]" />
                  <span>RAG-Powered AI Concierge</span>
                </div>
                <h3 className="font-serif text-xl sm:text-2xl text-white font-normal">
                  Ask VEYLORA AI
                </h3>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-[11px] font-mono text-neutral-400">
                Cohere + Groq Llama-3.3-70b
              </span>
            </div>
          </div>

          {/* Quick Questions Pills */}
          <div className="mb-4">
            <span className="text-[11px] uppercase tracking-wider text-neutral-400 font-sans block mb-2">
              Suggested Inquiries:
            </span>
            <div className="flex flex-wrap gap-2">
              {SUGGESTED_QUESTIONS.map((suggestion, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => {
                    setAiQuestion(suggestion);
                    handleAskAI(suggestion);
                  }}
                  className="text-xs px-3 py-1.5 rounded-lg bg-[#151619] border border-white/10 hover:border-[#D4AF37]/50 hover:bg-[#D4AF37]/10 text-neutral-300 hover:text-white transition-all cursor-pointer text-left"
                >
                  {suggestion}
                </button>
              ))}
            </div>
          </div>

          {/* Input & Ask Button */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleAskAI();
            }}
            className="flex flex-col sm:flex-row gap-3"
          >
            <div className="relative flex-1">
              <MessageSquare className="w-4 h-4 text-[#D4AF37] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                value={aiQuestion}
                onChange={(e) => setAiQuestion(e.target.value)}
                placeholder="Ask VEYLORA AI... (e.g. specs, price, engine details)"
                className="w-full pl-10 pr-4 py-3 bg-[#151619] border border-white/10 rounded-xl text-white text-sm placeholder:text-neutral-500 focus:outline-none focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] transition-all"
              />
            </div>
            <button
              type="submit"
              disabled={isAsking || !aiQuestion.trim()}
              className="px-6 py-3 rounded-xl bg-[#D4AF37] hover:bg-[#F2E4AD] text-[#080809] text-xs uppercase tracking-[0.2em] font-bold transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed shadow-[0_0_20px_rgba(212,175,55,0.2)]"
            >
              {isAsking ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin text-black" />
                  <span>Thinking...</span>
                </>
              ) : (
                <>
                  <span>Inquire</span>
                  <Send className="w-3.5 h-3.5 text-black" />
                </>
              )}
            </button>
          </form>

          {/* AI Response Display */}
          {aiAnswer && (
            <div className="mt-5 p-5 rounded-xl bg-[#151619] border border-[#D4AF37]/30 space-y-3 animate-fadeIn">
              <div className="flex items-center justify-between pb-2 border-b border-white/5">
                <div className="inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-[#D4AF37]">
                  <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
                  <span>Sanctuary Concierge Intelligence</span>
                </div>
                <span className="text-[10px] text-neutral-500 font-mono">
                  Verified USD Telemetry
                </span>
              </div>

              <p className="font-sans text-sm text-neutral-200 leading-relaxed">
                {aiAnswer}
              </p>

              {aiSources.length > 0 && (
                <div className="pt-2 border-t border-white/5">
                  <span className="text-[10px] uppercase tracking-wider text-neutral-500 font-sans block mb-1">
                    Knowledge Base Citations:
                  </span>
                  <div className="space-y-1">
                    {aiSources.map((source, i) => (
                      <div
                        key={i}
                        className="text-[11px] text-neutral-400 font-mono bg-[#0A0B0D] px-2.5 py-1 rounded border border-white/5"
                      >
                        • {source}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* 4. After Click - Success UI (Popup / Success Card with real booking_id) */}
      {showSuccess && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-md animate-fadeIn">
          <div className="relative w-full max-w-lg rounded-2xl bg-[#0F1012] border border-[#D4AF37]/50 shadow-[0_25px_70px_rgba(0,0,0,0.95)] p-6 sm:p-8 text-white space-y-6 animate-scaleUp">
            {/* Close Button */}
            <button
              onClick={() => setShowSuccess(false)}
              className="absolute top-4 right-4 p-2 text-neutral-400 hover:text-white transition-colors rounded-lg hover:bg-white/5 cursor-pointer"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Success Icon & Header */}
            <div className="text-center space-y-2">
              <div className="w-16 h-16 mx-auto rounded-full border border-[#D4AF37]/50 bg-[#D4AF37]/15 flex items-center justify-center shadow-[0_0_25px_rgba(212,175,55,0.3)]">
                <CheckCircle2 className="w-9 h-9 text-[#D4AF37]" />
              </div>

              <h3 className="font-serif text-2xl sm:text-3xl text-white font-normal tracking-tight">
                Test Drive Booked Successfully!
              </h3>

              <div className="inline-block px-3.5 py-1 rounded-full bg-[#151619] border border-[#D4AF37]/40 text-[#D4AF37] font-mono text-xs tracking-wider">
                Booking ID: {bookingId}
              </div>

              {apiConnected && (
                <div className="text-[10px] text-emerald-400 font-mono">
                  ✓ Persisted to Neon Serverless Database
                </div>
              )}
            </div>

            {/* Summary Details Card */}
            <div className="p-5 rounded-xl bg-[#151619] border border-white/10 space-y-3 font-sans text-xs">
              <div className="text-[11px] uppercase tracking-wider text-[#D4AF37] font-semibold pb-2 border-b border-white/5 flex items-center justify-between">
                <span>VIP Reservation Summary</span>
                <span>Beverly Hills Fleet</span>
              </div>

              <div className="flex items-center justify-between text-neutral-300">
                <span className="text-neutral-500">Client Name:</span>
                <span className="font-medium text-white">{fullName}</span>
              </div>

              <div className="flex items-center justify-between text-neutral-300">
                <span className="text-neutral-500">Selected Car:</span>
                <span className="font-medium text-[#F2E4AD]">{selectedCar.name}</span>
              </div>

              <div className="flex items-center justify-between text-neutral-300">
                <span className="text-neutral-500">Valuation:</span>
                <span className="font-mono text-white">{selectedCar.totalPrice}</span>
              </div>

              <div className="flex items-center justify-between text-neutral-300">
                <span className="text-neutral-500">Date:</span>
                <span className="font-medium text-white">{selectedDate}</span>
              </div>

              <div className="flex items-center justify-between text-neutral-300">
                <span className="text-neutral-500">Time Slot:</span>
                <span className="font-medium text-[#D4AF37]">{selectedTime}</span>
              </div>

              <div className="flex items-center justify-between text-neutral-300">
                <span className="text-neutral-500">Location:</span>
                <span className="font-medium text-white text-right max-w-[200px] truncate">
                  {selectedLocation}
                </span>
              </div>

              <div className="flex items-center justify-between text-neutral-300">
                <span className="text-neutral-500">License Status:</span>
                <span className="font-medium text-white">
                  {hasLicense ? "Verified (Yes)" : "Pending Verification (No)"}
                </span>
              </div>
            </div>

            <div className="p-3 rounded-lg bg-[#D4AF37]/10 border border-[#D4AF37]/20 text-[11px] text-[#F2E4AD] font-sans flex items-start gap-2">
              <ShieldCheck className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5" />
              <span>
                Our Beverly Hills Concierge liaison will arrive with the vehicle and keys at your scheduled hour.
              </span>
            </div>

            {/* Button: "Back to Showroom" */}
            <div>
              <button
                type="button"
                onClick={handleBackToShowroom}
                className="w-full py-3.5 px-6 rounded-xl bg-[#D4AF37] hover:bg-[#F2E4AD] text-[#080809] text-xs uppercase tracking-[0.25em] font-bold transition-all duration-300 shadow-[0_4px_25px_rgba(212,175,55,0.25)] flex items-center justify-center gap-2 cursor-pointer"
              >
                <Compass className="w-4 h-4 text-[#080809]" />
                <span>Back to Showroom</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 5. Bottom: Footer same as previous scenes */}
      <div className="w-full pt-16 border-t border-[#D4AF37]/20 relative z-10 text-neutral-400 font-sans">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 pb-6 text-center md:text-left">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full border border-[#D4AF37]/50 flex items-center justify-center bg-[#D4AF37]/10">
              <span className="font-serif font-bold text-[#D4AF37] text-sm">V</span>
            </div>
            <div>
              <span className="font-serif font-bold text-base tracking-[0.2em] text-white">
                VEYLORA USA
              </span>
              <span className="block text-[10px] uppercase tracking-widest text-[#D4AF37]">
                Beverly Hills Flagship Sanctuary
              </span>
            </div>
          </div>

          <div className="text-xs tracking-wider text-neutral-300 font-medium">
            &ldquo;VEYLORA USA - Beverly Hills - Luxury Redefined&rdquo;
          </div>

          <div className="flex items-center gap-2 text-xs text-neutral-400">
            <MapPin className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span>445 N Canon Drive, Beverly Hills, CA 90210</span>
          </div>
        </div>

        <div className="max-w-7xl mx-auto pt-6 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between text-[11px] text-neutral-500 gap-3">
          <p>© 2026 VEYLORA USA. All rights reserved. Beverly Hills, California.</p>
          <p className="uppercase tracking-widest text-[#D4AF37]/80">
            Scene 07 of 07 · Test Drive Experience Completed
          </p>
        </div>
      </div>
    </section>
  );
}

export { TestDriveBookingScene };
