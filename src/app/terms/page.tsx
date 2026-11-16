import Link from "next/link";
import { FileText, Shield, AlertCircle, ArrowLeft, CheckCircle2 } from "lucide-react";

export const metadata = {
  title: "Terms of Service | VEYLORA Luxury Sanctuary",
  description: "Official VIP Test Drive and Showroom Terms of Service of VEYLORA Luxury Showroom.",
};

export default function TermsOfServicePage() {
  return (
    <div className="w-full min-h-screen py-16 bg-[#080809] text-neutral-200">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Link */}
        <div className="mb-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs font-mono text-gold-400 hover:text-gold-300 transition-colors uppercase tracking-wider"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Return to Showroom</span>
          </Link>
        </div>

        {/* Header */}
        <div className="border-b border-[#D4AF37]/30 pb-8 mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#D4AF37]/40 bg-[#D4AF37]/10 text-gold-300 text-xs font-semibold tracking-widest uppercase mb-3">
            <FileText className="w-3.5 h-3.5 text-gold-400" />
            Client Agreement &amp; Sanctuary Protocol
          </div>
          <h1 className="font-display text-3xl sm:text-5xl font-bold text-white tracking-tight">
            Terms of <span className="gold-text-gradient">Service</span>
          </h1>
          <p className="text-sm text-neutral-400 font-mono mt-3">
            Effective Date: November 2026 • Sovereign Client Protocol
          </p>
        </div>

        {/* Terms Content */}
        <div className="space-y-10 text-sm leading-relaxed text-neutral-300">
          {/* 1. Acceptance */}
          <section className="space-y-3 p-6 rounded-2xl bg-[#0F1014] border border-[#D4AF37]/30">
            <h2 className="font-display text-xl font-bold text-white flex items-center gap-2">
              <span className="text-gold-400 font-mono text-sm">01.</span>
              Acceptance of Terms
            </h2>
            <p>
              By accessing the VEYLORA digital platform, creating a client membership, or booking a test drive appointment, you expressly agree to be bound by these Terms of Service and our Privacy Policy. If you do not agree with any provision herein, you must refrain from scheduling test drives or accessing private concierge amenities.
            </p>
          </section>

          {/* 2. Driver Eligibility (18+ & License) */}
          <section className="space-y-3">
            <h2 className="font-display text-xl font-bold text-white flex items-center gap-2">
              <span className="text-gold-400 font-mono text-sm">02.</span>
              Driver Eligibility &amp; Age Verification (18+)
            </h2>
            <p>
              To ensure safe operation of high-performance vehicles (ranging from the 176 HP Civic RS Turbo to the 682 HP Escalade-V and 215.5 HP Ducati Panigale V4 S):
            </p>
            <ul className="list-disc list-inside space-y-2 text-xs text-neutral-400 pl-2">
              <li>
                <strong className="text-neutral-200">Legal Age Requirement:</strong> Drivers must be a minimum of 18 years of age at the time of reservation.
              </li>
              <li>
                <strong className="text-neutral-200">Valid Driving Credentials:</strong> A valid, unexpired government-issued Driver&apos;s License (or International Driving Permit) must be presented in person along with original identification prior to taking control of any vehicle.
              </li>
              <li>
                <strong className="text-neutral-200">Safety Verification:</strong> VEYLORA reserves the sovereign right to decline or reschedule any drive if driving credentials cannot be verified or if weather/road safety standards are not met.
              </li>
            </ul>
          </section>

          {/* 3. Pricing, EMI Estimates & Consumer Disclosures */}
          <section className="space-y-3 p-6 rounded-2xl bg-[#0F1014] border border-[#D4AF37]/30">
            <h2 className="font-display text-xl font-bold text-white flex items-center gap-2">
              <span className="text-gold-400 font-mono text-sm">03.</span>
              Indicative Pricing, EMI Estimates &amp; Consumer Disclosures
            </h2>
            <p>
              In compliance with consumer protection standards (including the Islamabad Consumer Protection Act and international fair-trade principles):
            </p>
            <ul className="list-disc list-inside space-y-2 text-xs text-neutral-400 pl-2">
              <li>
                <strong className="text-neutral-200">Indicative Pricing:</strong> All figures stated on vehicle cards and specification sheets are base showroom prices in Pakistani Rupees (PKR / Rs.) and do not constitute a binding unilateral sale offer.
              </li>
              <li>
                <strong className="text-neutral-200">EMI &amp; Financing Estimates:</strong> Monthly EMI calculations are purely illustrative, calculated upon standard 36 to 60-month financing terms with indicative down payments. Final financing packages, leasing APRs, and insurance charges are determined solely by authorized financial banking partners.
              </li>
              <li>
                <strong className="text-neutral-200">Taxes &amp; Registration:</strong> Statutory withholding taxes, advance income tax, freight, and provincial motor vehicle registration fees are finalized upon execution of formal purchase contracts.
              </li>
            </ul>
          </section>

          {/* 4. Cancellation & Rescheduling Policy */}
          <section className="space-y-3">
            <h2 className="font-display text-xl font-bold text-white flex items-center gap-2">
              <span className="text-gold-400 font-mono text-sm">04.</span>
              Complimentary Cancellation &amp; Rescheduling Policy
            </h2>
            <p>
              VIP clients may cancel or reschedule test drive reservations at any time without penalty or cancellation fees directly via their User Dashboard:
            </p>
            <div className="p-4 rounded-xl bg-[#080809] border border-[#D4AF37]/30 text-xs font-mono text-neutral-300">
              <span className="text-emerald-400 font-bold block mb-1">✓ 100% Complimentary Client Cancellation</span>
              Pending test drive appointments can be cancelled with one click under &ldquo;Meri Test Drive&rdquo; in your client dashboard prior to chauffeur or concierge dispatch.
            </div>
          </section>

          {/* 5. AI Concierge & Digital Recommendation Disclosure */}
          <section className="space-y-3 p-6 rounded-2xl bg-[#0F1014] border border-[#D4AF37]/30">
            <h2 className="font-display text-xl font-bold text-white flex items-center gap-2">
              <span className="text-gold-400 font-mono text-sm">05.</span>
              AI Concierge &amp; Synthetic Recommendation Disclosure
            </h2>
            <p>
              Under the EU Artificial Intelligence Act (EU AI Act 2024/1689, Article 50) and international consumer disclosure principles:
            </p>
            <p className="text-xs text-neutral-400">
              Digital recommendations presented by our VIP concierge advisors (Sophia Laurent, Alexander Vance, Elena Rostova) represent automated, algorithmic vehicle suggestions calibrated to driver profiles. Human VIP staff are available on showroom premises for live physical consultations.
            </p>
          </section>

          {/* 6. Governing Law & Dispute Resolution */}
          <section className="space-y-3">
            <h2 className="font-display text-xl font-bold text-white flex items-center gap-2">
              <span className="text-gold-400 font-mono text-sm">06.</span>
              Governing Law &amp; Jurisdiction
            </h2>
            <p>
              These Terms shall be construed and governed in accordance with the substantive laws of Pakistan, without regard to conflict of law principles. Any dispute arising under these Terms shall be subject to amicable VIP mediation, or the competent courts of Islamabad Capital Territory.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
