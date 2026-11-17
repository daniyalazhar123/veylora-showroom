import Link from "next/link";
import { ShieldCheck, Lock, Award, Clock, MapPin, Phone, Mail } from "lucide-react";

export default function Footer() {
  return (
    <footer className="w-full bg-[#050506] border-t border-borderGold/30 mt-auto pt-16 pb-12 text-neutral-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-borderGold/20">
          {/* Brand Manifesto */}
          <div className="space-y-4 md:col-span-1">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full border border-gold-500/50 flex items-center justify-center bg-gold-500/10">
                <span className="font-display font-bold text-gold-400 text-sm">V</span>
              </div>
              <span className="font-display font-bold text-lg tracking-[0.2em] gold-text-gradient">
                VEYLORA
              </span>
            </div>
            <p className="text-xs leading-relaxed text-neutral-400">
              Where peerless mechanical engineering meets sovereign luxury. An elite sanctuary for collectors, drivers, and automotive connoisseurs.
            </p>
            <div className="flex items-center gap-2 pt-2">
              <Award className="w-4 h-4 text-gold-400" />
              <span className="text-[11px] uppercase tracking-wider text-gold-400/90 font-medium">
                Official VIP Dealer Partner
              </span>
            </div>
          </div>

          {/* Quick Collection Links */}
          <div className="space-y-3">
            <h4 className="font-display text-sm tracking-wider uppercase text-neutral-200">
              Sanctuary Collections
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/cars" className="hover:text-gold-400 transition-colors">
                  Honda Civic RS Turbo
                </Link>
              </li>
              <li>
                <Link href="/cars" className="hover:text-gold-400 transition-colors">
                  Toyota Corolla Altis Grande
                </Link>
              </li>
              <li>
                <Link href="/cars" className="hover:text-gold-400 transition-colors">
                  Cadillac Escalade-V
                </Link>
              </li>
              <li>
                <Link href="/cars" className="hover:text-gold-400 transition-colors">
                  Porsche 911 GT3
                </Link>
              </li>
              <li>
                <Link href="/bikes" className="hover:text-gold-400 transition-colors">
                  Honda CG 125 Special Edition
                </Link>
              </li>
              <li>
                <Link href="/bikes" className="hover:text-gold-400 transition-colors">
                  Ducati Panigale V4 S
                </Link>
              </li>
            </ul>
          </div>

          {/* Concierge & Showroom */}
          <div className="space-y-3">
            <h4 className="font-display text-sm tracking-wider uppercase text-neutral-200">
              Concierge Hours
            </h4>
            <div className="space-y-2 text-xs">
              <div className="flex items-start gap-2">
                <Clock className="w-3.5 h-3.5 text-gold-400 mt-0.5 shrink-0" />
                <span>Mon – Sat: 09:00 AM – 09:00 PM<br />Sunday: By Private VIP Appointment</span>
              </div>
              <div className="flex items-start gap-2 pt-2">
                <MapPin className="w-3.5 h-3.5 text-gold-400 mt-0.5 shrink-0" />
                <span>445 N Canon Drive, Beverly Hills, CA 90210</span>
              </div>
              <div className="flex items-center gap-2 pt-1">
                <Phone className="w-3.5 h-3.5 text-gold-400 shrink-0" />
                <span>+1 (310) 849-2000</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-gold-400 shrink-0" />
                <span>concierge@veylora.com</span>
              </div>
            </div>
          </div>

          {/* Security & Cryptographic Assurances */}
          <div className="space-y-3">
            <h4 className="font-display text-sm tracking-wider uppercase text-neutral-200 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-gold-400" />
              Security Protocol
            </h4>
            <div className="p-3 rounded bg-surface border border-borderGold/30 space-y-2 text-[11px] leading-relaxed">
              <div className="flex items-center gap-1.5 text-gold-300 font-medium">
                <Lock className="w-3 h-3 text-gold-400" />
                HS256 JWT & HttpOnly Protection
              </div>
              <p className="text-neutral-400">
                Credentials and session keys are secured exclusively inside encrypted <span className="text-gold-300 font-mono">httpOnly</span> cookies with SameSite=Lax. Zero exposure to client localStorage or XSS injection.
              </p>
              <div className="text-[10px] text-gold-400/80 font-mono pt-1">
                Rate-Limited • CSRF Protected • CSP Enforced
              </div>
            </div>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-neutral-400 gap-4">
          <p>© 2026 VEYLORA USA - Beverly Hills. All rights reserved.</p>
          <div className="flex flex-wrap items-center gap-6">
            <Link href="/privacy" className="hover:text-gold-400 transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-gold-400 transition-colors">
              Terms of Service
            </Link>
            <Link href="/login" className="hover:text-gold-400 transition-colors">
              Concierge Access
            </Link>
            <Link href="/dashboard/admin" className="hover:text-gold-400 transition-colors">
              Administrative Portal
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
