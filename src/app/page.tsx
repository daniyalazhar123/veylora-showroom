import Link from "next/link";
import { ArrowRight, Sparkles, MapPin } from "lucide-react";

interface CarItem {
  id: string;
  name: string;
  price: string;
  specs: string;
  link: string;
}

const FEATURED_CARS: CarItem[] = [
  {
    id: "civic-rs",
    name: "Honda Civic RS Turbo",
    price: "$28,000",
    specs: "1.5L VTEC Turbo · 180 HP",
    link: "/cars",
  },
  {
    id: "escalade-v",
    name: "Cadillac Escalade-V",
    price: "$150,000",
    specs: "6.2L Supercharged V8 · 682 HP",
    link: "/cars",
  },
  {
    id: "urus",
    name: "Lamborghini Urus",
    price: "$230,000",
    specs: "4.0L Twin-Turbo V8 · 657 HP",
    link: "/cars",
  },
];

export default function HomePage() {
  return (
    <div className="w-full flex flex-col bg-[#080809] text-neutral-100 min-h-screen">
      {/* 1. HERO SECTION */}
      <section className="relative w-full min-h-screen flex items-center justify-center text-center px-4 sm:px-6 lg:px-8 overflow-hidden bg-[#080809]">
        {/* Full-screen cinematic image/video placeholder background */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(212,175,55,0.14)_0%,_transparent_70%)] pointer-events-none" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#d4af3708_1px,transparent_1px),linear-gradient(to_bottom,#d4af3708_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#080809] via-transparent to-[#080809]/80 pointer-events-none" />

        <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center py-24">
          {/* Price Badge: "Rolls-Royce Ghost Black Badge - $462,400" (Gold) */}
          <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full border border-[#D4AF37]/50 bg-[#D4AF37]/10 text-[#D4AF37] text-xs sm:text-sm font-semibold tracking-[0.2em] uppercase mb-8 shadow-[0_0_25px_rgba(212,175,55,0.2)]">
            <Sparkles className="w-4 h-4 text-[#D4AF37]" />
            <span>Rolls-Royce Ghost Black Badge - $462,400</span>
          </div>

          {/* Title: "VEYLORA Beverly Hills" in Fraunces font */}
          <h1 className="font-display text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-white mb-6 leading-[1.08]">
            VEYLORA <span className="gold-text-gradient">Beverly Hills</span>
          </h1>

          {/* Subtitle: "Where Luxury Meets The Road." */}
          <p className="font-sans text-neutral-300 text-lg sm:text-xl lg:text-2xl font-light tracking-wide max-w-2xl mb-10">
            Where Luxury Meets The Road.
          </p>

          {/* CTA Button: "Explore Collection" (Gold) */}
          <a
            href="#collection"
            className="inline-flex items-center gap-3 bg-[#D4AF37] hover:bg-[#F2E4AD] text-[#080809] font-bold text-xs sm:text-sm uppercase tracking-[0.25em] px-9 py-4 rounded-xl shadow-[0_4px_25px_rgba(212,175,55,0.3)] hover:shadow-[0_6px_35px_rgba(212,175,55,0.5)] transition-all duration-300 transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer [will-change:transform]"
          >
            <span>Explore Collection</span>
            <ArrowRight className="w-4 h-4 text-[#080809]" />
          </a>
        </div>
      </section>

      {/* 2. CAR GRID (Tesla-Style) */}
      <section id="collection" className="w-full py-24 sm:py-32 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <span className="text-[11px] uppercase tracking-[0.3em] text-[#D4AF37] font-semibold block mb-3">
            Beverly Hills Fleet Curation
          </span>
          <h2 className="font-display text-3xl sm:text-5xl font-bold text-white tracking-tight">
            The Featured <span className="gold-text-gradient">Collection</span>
          </h2>
        </div>

        {/* 3 Columns Desktop, 1 Column Mobile */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
          {FEATURED_CARS.map((car) => (
            <div
              key={car.id}
              className="flex flex-col justify-between p-6 sm:p-8 rounded-2xl bg-[#0F1012] border border-[#D4AF37]/30 shadow-[0_16px_40px_-20px_rgba(0,0,0,0.85)] hover:border-[#D4AF37] transition-transform duration-300 ease-out hover:scale-105 [will-change:transform] group"
            >
              <div>
                {/* Image Placeholder (Black box, gold border, "Image Placeholder") */}
                <div className="relative w-full aspect-[16/10] bg-[#0A0B0D] border border-[#D4AF37]/30 rounded-xl overflow-hidden flex flex-col items-center justify-center p-6 text-center mb-6 group-hover:border-[#D4AF37]/60 transition-colors">
                  <div className="w-12 h-12 rounded-full border border-[#D4AF37]/40 bg-[#0F1012] flex items-center justify-center mb-2">
                    <span className="w-2 h-2 rounded-full bg-[#D4AF37] animate-pulse" />
                  </div>
                  <span className="text-xs uppercase tracking-[0.25em] text-[#D4AF37] font-sans font-semibold mb-1">
                    Image Placeholder
                  </span>
                  <span className="text-[10px] text-neutral-500 uppercase tracking-wider font-sans">
                    {car.specs}
                  </span>
                </div>

                {/* Name & Price */}
                <h3 className="font-display text-xl sm:text-2xl font-bold text-white mb-2">
                  {car.name}
                </h3>
                <p className="font-display text-2xl font-normal text-[#D4AF37] mb-6">
                  {car.price}
                </p>
              </div>

              {/* View Details Button */}
              <Link
                href={car.link}
                className="w-full py-3.5 px-5 rounded-xl border border-[#D4AF37]/40 text-[#F2E4AD] hover:bg-[#D4AF37]/10 hover:border-[#D4AF37] text-xs uppercase tracking-[0.2em] font-semibold text-center transition-all duration-300 [will-change:transform]"
              >
                View Details
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* 3. CALL TO ACTION */}
      <section className="w-full py-24 sm:py-32 px-4 sm:px-6 lg:px-8 border-t border-[#D4AF37]/20 bg-gradient-to-b from-[#080809] to-[#0F1012] text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(212,175,55,0.08)_0%,_transparent_60%)] pointer-events-none" />

        <div className="relative z-10 max-w-3xl mx-auto flex flex-col items-center">
          <h2 className="font-display text-3xl sm:text-5xl font-bold text-white tracking-tight mb-6">
            Ready to Experience Luxury?
          </h2>
          <p className="text-neutral-300 text-sm sm:text-base max-w-lg mb-10 font-sans">
            Schedule a private test drive at our Beverly Hills showroom or request white-glove VIP estate delivery.
          </p>

          <Link
            href="/test-drive"
            className="inline-flex items-center gap-3 bg-[#D4AF37] hover:bg-[#F2E4AD] text-[#080809] font-bold text-xs sm:text-sm uppercase tracking-[0.25em] px-10 py-4 rounded-xl shadow-[0_4px_25px_rgba(212,175,55,0.3)] hover:shadow-[0_6px_35px_rgba(212,175,55,0.5)] transition-all duration-300 transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer [will-change:transform]"
          >
            <span>Book Your Test Drive</span>
            <ArrowRight className="w-4 h-4 text-[#080809]" />
          </Link>
        </div>
      </section>

      {/* 4. FOOTER */}
      <footer className="w-full py-12 px-4 sm:px-6 lg:px-8 border-t border-[#D4AF37]/20 bg-[#050506] text-neutral-400 font-sans text-xs">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left">
          <div>
            <span className="font-display text-base font-bold text-white tracking-[0.15em] block mb-1">
              VEYLORA USA - Beverly Hills
            </span>
            <p className="flex items-center justify-center sm:justify-start gap-1.5 text-neutral-400">
              <MapPin className="w-3.5 h-3.5 text-[#D4AF37] shrink-0" />
              <span>445 N Canon Drive, Beverly Hills, CA 90210</span>
            </p>
          </div>

          <p className="text-neutral-500">
            © 2026 VEYLORA USA. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
