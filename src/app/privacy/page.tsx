import Link from "next/link";
import { ShieldCheck, Lock, Eye, FileText, Download, Trash2, ArrowLeft, CheckCircle2 } from "lucide-react";

export const metadata = {
  title: "Privacy Policy | VEYLORA Luxury Sanctuary",
  description: "Official Privacy Policy and Data Protection Framework of VEYLORA Luxury Showroom.",
};

export default function PrivacyPolicyPage() {
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
            <ShieldCheck className="w-3.5 h-3.5 text-gold-400" />
            Legal & Data Protection Framework
          </div>
          <h1 className="font-display text-3xl sm:text-5xl font-bold text-white tracking-tight">
            Privacy <span className="gold-text-gradient">Policy</span>
          </h1>
          <p className="text-sm text-neutral-400 font-mono mt-3">
            Last Updated: November 2026 • Valid for Pakistan, India, EU (GDPR), and United States (CCPA/CPRA)
          </p>
        </div>

        {/* Content Body */}
        <div className="space-y-10 text-sm leading-relaxed text-neutral-300">
          {/* Section 1: Introduction */}
          <section className="space-y-3 p-6 rounded-2xl bg-[#0F1014] border border-[#D4AF37]/30">
            <h2 className="font-display text-xl font-bold text-white flex items-center gap-2">
              <span className="text-gold-400 font-mono text-sm">01.</span>
              Our Sovereign Privacy Commitment
            </h2>
            <p>
              VEYLORA Sanctuary Ltd. (&ldquo;VEYLORA&rdquo;, &ldquo;we&rdquo;, &ldquo;us&rdquo;) operates an ultra-exclusive luxury automotive and motorcycle showroom gallery based in Sector F-6, Islamabad, Pakistan, serving discerning clientele domestically and internationally. We honor your personal privacy with the same uncompromising precision engineered into our vehicles.
            </p>
            <p>
              This Privacy Policy explains how we collect, process, safeguard, and delete your personal data in accordance with the Prevention of Electronic Crimes Act (PECA 2016, Pakistan), the Digital Personal Data Protection Act 2023 (DPDP, India), the General Data Protection Regulation (EU GDPR 2016/679), and the California Consumer Privacy Act as amended (CCPA/CPRA, USA).
            </p>
          </section>

          {/* Section 2: Data We Collect */}
          <section className="space-y-4">
            <h2 className="font-display text-xl font-bold text-white flex items-center gap-2">
              <span className="text-gold-400 font-mono text-sm">02.</span>
              Personal Data We Collect &amp; Lawful Basis
            </h2>
            <p>We process only the minimum information necessary to orchestrate test drives and showroom concierge appointments:</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
              <div className="p-4 rounded-xl bg-[#0F1014] border border-[#D4AF37]/20">
                <h3 className="font-mono text-xs uppercase tracking-wider text-gold-400 font-bold mb-1">
                  A. Client Identity &amp; Verification
                </h3>
                <p className="text-xs text-neutral-400">
                  Full legal name, verified email address, mobile telephone number, and Date of Birth (must be 18+ to verify contractual capacity and driver eligibility).
                </p>
              </div>

              <div className="p-4 rounded-xl bg-[#0F1014] border border-[#D4AF37]/20">
                <h3 className="font-mono text-xs uppercase tracking-wider text-gold-400 font-bold mb-1">
                  B. Test Drive Eligibility
                </h3>
                <p className="text-xs text-neutral-400">
                  Driver&apos;s License Number or National Identity Card number (strictly validated for insurance, liability, and vehicle allocation protocols prior to vehicle handover).
                </p>
              </div>

              <div className="p-4 rounded-xl bg-[#0F1014] border border-[#D4AF37]/20">
                <h3 className="font-mono text-xs uppercase tracking-wider text-gold-400 font-bold mb-1">
                  C. Concierge Preferences
                </h3>
                <p className="text-xs text-neutral-400">
                  Selected vehicle model, preferred appointment slot, special driving route requests, and communication history.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-[#0F1014] border border-[#D4AF37]/20">
                <h3 className="font-mono text-xs uppercase tracking-wider text-gold-400 font-bold mb-1">
                  D. Security &amp; Audit Logs
                </h3>
                <p className="text-xs text-neutral-400">
                  Client IP address, authentication timestamps, and rate-limiting audit logs to prevent brute-force attacks and credential abuse.
                </p>
              </div>
            </div>
          </section>

          {/* Section 3: Age Verification & Protection of Minors */}
          <section className="space-y-3 p-6 rounded-2xl bg-[#0F1014] border border-[#D4AF37]/30">
            <h2 className="font-display text-xl font-bold text-white flex items-center gap-2">
              <span className="text-gold-400 font-mono text-sm">03.</span>
              Age Verification &amp; Minor Protection (18+)
            </h2>
            <p>
              Under the Pakistan Contract Act 1872, Indian DPDP Act 2023 (Section 9), US Children&apos;s Online Privacy Protection Act (COPPA), and GDPR Article 8:
            </p>
            <ul className="list-disc list-inside space-y-1.5 text-xs text-neutral-400 pl-2">
              <li>Our services and high-displacement vehicles are exclusively intended for adults aged 18 and older.</li>
              <li>We mandate Date of Birth verification on membership registration.</li>
              <li>We do not knowingly collect personal information from individuals under 18 years of age without explicit verified parental/guardian authorization.</li>
            </ul>
          </section>

          {/* Section 4: Cookies & Tracking Architecture */}
          <section className="space-y-3">
            <h2 className="font-display text-xl font-bold text-white flex items-center gap-2">
              <span className="text-gold-400 font-mono text-sm">04.</span>
              Cookie Policy &amp; Zero Third-Party Tracker Architecture
            </h2>
            <p>
              Unlike conventional commercial sites, VEYLORA does not employ cross-site tracking cookies, Meta Pixels, Google Tag Manager advertising beacons, or third-party behavioral fingerprinting.
            </p>
            <div className="p-4 rounded-xl bg-[#080809] border border-[#D4AF37]/30 space-y-2 text-xs font-mono">
              <div className="flex items-center justify-between text-neutral-300">
                <span className="text-gold-400">__Host-veylora_token (or veylora_token):</span>
                <span className="text-emerald-400">Strictly Essential • HttpOnly • 1-Hour Life</span>
              </div>
              <p className="text-neutral-400 text-[11px] leading-relaxed">
                Stores your cryptographically signed HS256 JWT session. Inaccessible to JavaScript and protected against cross-site scripting (XSS).
              </p>
              <div className="flex items-center justify-between text-neutral-300 pt-2 border-t border-[#D4AF37]/20">
                <span className="text-gold-400">veylora_cookie_consent:</span>
                <span className="text-emerald-400">Functional • Client Storage</span>
              </div>
              <p className="text-neutral-400 text-[11px] leading-relaxed">
                Records your affirmative choice on our Cookie Consent Banner (Accept All vs. Reject Non-Essential).
              </p>
            </div>
            <p className="text-xs text-neutral-400">
              Typography is self-hosted with local system font fallbacks, ensuring zero IP leakage to external CDNs.
            </p>
          </section>

          {/* Section 5: User Rights (GDPR Art 15-22 & DPDP) */}
          <section className="space-y-4 p-6 rounded-2xl bg-[#0F1014] border border-[#D4AF37]/30">
            <h2 className="font-display text-xl font-bold text-white flex items-center gap-2">
              <span className="text-gold-400 font-mono text-sm">05.</span>
              Your Sovereign Rights (Access, Portability &amp; Erasure)
            </h2>
            <p>
              You maintain total control over your personal data at all times. We provide built-in self-service controls directly within your <Link href="/dashboard/user" className="text-gold-300 underline font-semibold">User Dashboard</Link>:
            </p>
            <div className="space-y-3 pt-1">
              <div className="flex items-start gap-3">
                <Download className="w-5 h-5 text-gold-400 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-bold text-white uppercase font-mono tracking-wider">
                    Right of Access &amp; Portability (GDPR Art. 15 / 20, DPDP)
                  </h4>
                  <p className="text-xs text-neutral-400">
                    Instantly download an export of your complete profile and booking reservation history in structured JSON format using the &ldquo;Download My Data&rdquo; button.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Trash2 className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-bold text-white uppercase font-mono tracking-wider">
                    Right to Erasure / Right to be Forgotten (GDPR Art. 17, DPDP)
                  </h4>
                  <p className="text-xs text-neutral-400">
                    Execute complete deletion of your account, email, phone, and test drive reservations with one click using the &ldquo;Delete My Account&rdquo; function.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Section 6: Security & Contact */}
          <section className="space-y-3">
            <h2 className="font-display text-xl font-bold text-white flex items-center gap-2">
              <span className="text-gold-400 font-mono text-sm">06.</span>
              Security Protocols &amp; Data Protection Contact
            </h2>
            <p>
              All passwords are encrypted utilizing Bcrypt with 12 salt rounds. Security headers including Content-Security-Policy (CSP), Strict-Transport-Security (HSTS), and X-Frame-Options DENY are enforced.
            </p>
            <p>
              For legal inquiries, data protection queries, or formal regulatory requests, contact our designated Data Protection Officer:
            </p>
            <div className="p-4 rounded-xl bg-[#080809] border border-[#D4AF37]/30 text-xs font-mono space-y-1">
              <div className="text-gold-300 font-bold">Office of Data Privacy &amp; Sovereign Compliance</div>
              <div className="text-neutral-400">VEYLORA Sanctuary Ltd., Boulevard 7, Sector F-6, Islamabad, Pakistan</div>
              <div className="text-neutral-400">Direct Email: <a href="mailto:privacy@veylora.com" className="text-gold-400 hover:underline">privacy@veylora.com</a></div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
