"use client";

import Image from "next/image";
import Link from "next/link";
import { Sparkles, Award, ShieldCheck, ChevronRight, UserCheck } from "lucide-react";

interface Receptionist {
  id: string;
  name: string;
  role: string;
  experience: string;
  image: string;
  specialization: string;
  quote: string;
  featuredRecommendation: string;
}

const RECEPTIONISTS: Receptionist[] = [
  {
    id: "sophia",
    name: "Sophia Laurent",
    role: "Senior VIP Concierge",
    experience: "9 Years Executive Diplomatic Protocol",
    image: "/receptionists/sophia.svg",
    specialization: "Turbo Sport Sedans & Apex Supercars",
    quote: "Every client deserves an uncompromising personal arrival. I ensure your test drive is meticulously calibrated to your driving style.",
    featuredRecommendation: "Honda Civic RS Turbo & Porsche 911 GT3",
  },
  {
    id: "alexander",
    name: "Alexander Vance",
    role: "Director of Client Experience",
    experience: "14 Years Bespoke Luxury Fleet Management",
    image: "/receptionists/alexander.svg",
    specialization: "Ultra-Luxury Flagships & Executive Saloons",
    quote: "True luxury is effortless discretion. From trade-in appraisals to bespoke delivery ceremonies, your time is protected as sacred.",
    featuredRecommendation: "Toyota Corolla Altis Grande & Maybach S 680",
  },
  {
    id: "elena",
    name: "Elena Rostova",
    role: "Private Client Advisor",
    experience: "8 Years High-Performance Motorsport & Superbikes",
    image: "/receptionists/elena.svg",
    specialization: "High-Displacement Cruisers & Track Superbikes",
    quote: "Precision machines demand respectful mastery. I introduce you to the soul, torque curves, and soundscape of our two-wheel fleet.",
    featuredRecommendation: "Ducati Panigale V4 S & Harley Fat Boy 114",
  },
];

export default function ReceptionSection() {
  return (
    <section id="reception" className="w-full py-24 bg-surface relative overflow-hidden border-b border-borderGold/30">
      {/* Ambient background glow */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-gold-500/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-gold-500/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-gold-500/40 bg-gold-500/10 text-gold-300 text-xs font-semibold tracking-[0.2em] uppercase mb-4">
            <UserCheck className="w-3.5 h-3.5 text-gold-400" />
            VIP Client Reception & Concierge
          </div>
          <h2 className="font-display text-3xl sm:text-5xl font-bold text-white tracking-tight mb-4">
            Distinguished Personal <span className="gold-text-gradient">Advisors</span>
          </h2>
          <p className="font-sans text-neutral-300 text-sm sm:text-base max-w-2xl">
            Our showroom receptionists are at your disposal to tailor test drives, explain engineering nuances, and guide your private acquisition.
          </p>
          <div className="mt-3 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/60 border border-gold-500/30 text-[10px] font-mono text-gold-400/90 tracking-wider">
            <Sparkles className="w-3 h-3 text-gold-400" />
            <span>EU AI Act Transparency Disclosure: AI-Assisted Digital Concierge Advisors</span>
          </div>
        </div>

        {/* 3 Receptionist Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {RECEPTIONISTS.map((rep) => (
            <div
              key={rep.id}
              className="luxury-card rounded-2xl overflow-hidden flex flex-col group"
            >
              {/* Image Frame */}
              <div className="relative w-full aspect-[4/5] bg-black/80 overflow-hidden border-b border-borderGold/30">
                <Image
                  src={rep.image}
                  alt={`${rep.name} - ${rep.role}`}
                  width={600}
                  height={750}
                  className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-70" />

                {/* Status indicator badge */}
                <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-black/80 border border-gold-500/40 text-[10px] font-mono text-gold-400 flex items-center gap-1.5 backdrop-blur-md">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  ON SANCTUARY DUTY
                </div>

                <div className="absolute bottom-4 left-4 right-4">
                  <div className="text-[11px] font-mono tracking-widest text-gold-400/90 uppercase mb-1">
                    {rep.experience}
                  </div>
                  <h3 className="font-display text-xl font-bold text-white group-hover:text-gold-300 transition-colors">
                    {rep.name}
                  </h3>
                  <div className="text-xs text-neutral-300 font-medium">
                    {rep.role}
                  </div>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-6 flex-1 flex flex-col justify-between space-y-6">
                <div className="space-y-4">
                  <div>
                    <span className="text-[10px] uppercase font-mono tracking-wider text-gold-400/80">
                      Specialist Portfolio:
                    </span>
                    <p className="text-xs text-neutral-200 font-semibold mt-0.5">
                      {rep.specialization}
                    </p>
                  </div>

                  <p className="text-xs text-neutral-400 italic leading-relaxed border-l-2 border-gold-500/40 pl-3">
                    &ldquo;{rep.quote}&rdquo;
                  </p>

                  <div className="p-2.5 rounded bg-surface-raised border border-borderGold/20">
                    <span className="text-[10px] uppercase font-mono tracking-wider text-gold-400/70 block">
                      Curated Fleet Selection:
                    </span>
                    <span className="text-xs text-neutral-300 font-medium">
                      {rep.featuredRecommendation}
                    </span>
                  </div>
                </div>

                {/* "Choose Your Ride" CTA button */}
                <Link
                  href="/cars"
                  className="btn-gold w-full py-3 rounded-lg text-xs uppercase tracking-widest font-bold flex items-center justify-center gap-2 group-hover:shadow-gold transition-all"
                >
                  <span>Choose Your Ride</span>
                  <ChevronRight className="w-4 h-4 text-black group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Concierge Assurance */}
        <div className="p-6 rounded-xl bg-surface-card border border-borderGold/30 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full border border-gold-500/40 bg-gold-500/10 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-6 h-6 text-gold-400" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white font-display">
                Private White-Glove Hospitality Protocol
              </h4>
              <p className="text-xs text-neutral-400">
                Chilled refreshments, personal valet parking, and private consultation booths provided on arrival.
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3 shrink-0">
            <Link
              href="/cars"
              className="px-5 py-2.5 rounded-lg text-xs uppercase tracking-widest font-semibold border border-gold-500/40 text-gold-300 hover:bg-gold-500/10 transition-colors"
            >
              Browse Cars
            </Link>
            <Link
              href="/bikes"
              className="px-5 py-2.5 rounded-lg text-xs uppercase tracking-widest font-semibold border border-gold-500/40 text-gold-300 hover:bg-gold-500/10 transition-colors"
            >
              Browse Bikes
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
