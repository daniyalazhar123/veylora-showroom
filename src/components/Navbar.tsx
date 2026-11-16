"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Shield, User, LogOut, Menu, X, Car, Bike, Sparkles } from "lucide-react";

interface UserState {
  id: string;
  name: string;
  email: string;
  role: "admin" | "user";
}

export default function Navbar() {
  const [user, setUser] = useState<UserState | null>(null);
  const [loading, setLoading] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    async function checkAuth() {
      try {
        const res = await fetch("/api/auth/me", { cache: "no-store" });
        const data = await res.json();
        if (data.authenticated && data.user) {
          setUser(data.user);
        } else {
          setUser(null);
        }
      } catch {
        setUser(null);
      } finally {
        setLoading(false);
      }
    }
    checkAuth();
  }, [pathname]);

  const handleLogout = async () => {
    try {
      await fetch("/api/auth/logout", { method: "POST" });
      setUser(null);
      router.push("/");
      router.refresh();
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  const navLinks = [
    { href: "/", label: "Showroom" },
    { href: "/cars", label: "Cars Collection", icon: Car },
    { href: "/bikes", label: "Bikes Collection", icon: Bike },
    { href: "/#reception", label: "VIP Concierge" },
  ];

  return (
    <header className="sticky top-0 z-40 w-full glass-nav transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-full border border-gold-500/50 flex items-center justify-center bg-gold-500/10 group-hover:border-gold-400 group-hover:shadow-gold transition-all duration-300">
            <span className="font-display font-extrabold text-gold-400 text-lg tracking-wider">V</span>
          </div>
          <div className="flex flex-col">
            <span className="font-display font-bold text-xl tracking-[0.2em] gold-text-gradient">
              VEYLORA
            </span>
            <span className="text-[9px] font-sans tracking-[0.25em] text-gold-400/80 uppercase">
              Automotive Sanctuary
            </span>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm tracking-widest uppercase transition-colors duration-200 ${
                  isActive
                    ? "text-gold-400 font-semibold"
                    : "text-neutral-300 hover:text-gold-300"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* User Auth Buttons / Status */}
        <div className="hidden md:flex items-center gap-4">
          {loading ? (
            <div className="w-24 h-9 rounded bg-surface-raised animate-pulse" />
          ) : user ? (
            <div className="flex items-center gap-3">
              {user.role === "admin" ? (
                <Link
                  href="/dashboard/admin"
                  className="px-3.5 py-1.5 rounded text-xs font-semibold tracking-wider uppercase border border-gold-500/50 text-gold-300 bg-gold-500/10 hover:bg-gold-500/20 flex items-center gap-1.5 transition-all"
                >
                  <Shield className="w-3.5 h-3.5 text-gold-400" />
                  Admin Portal
                </Link>
              ) : (
                <Link
                  href="/dashboard/user"
                  className="px-3.5 py-1.5 rounded text-xs font-semibold tracking-wider uppercase border border-gold-500/40 text-gold-300 bg-surface-raised hover:border-gold-400 flex items-center gap-1.5 transition-all"
                >
                  <User className="w-3.5 h-3.5 text-gold-400" />
                  Meri Test Drive
                </Link>
              )}

              <button
                onClick={handleLogout}
                title="Secure Sign Out"
                className="p-2 rounded text-neutral-400 hover:text-gold-300 hover:bg-surface-raised transition-colors"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <Link
                href="/login"
                className="text-xs uppercase tracking-widest text-neutral-300 hover:text-gold-300 font-medium px-3 py-1.5 transition-colors"
              >
                Sign In
              </Link>
              <Link
                href="/signup"
                className="btn-gold text-xs uppercase tracking-widest px-4 py-2 rounded font-semibold flex items-center gap-1.5"
              >
                <Sparkles className="w-3.5 h-3.5 text-black" />
                Join Sanctuary
              </Link>
            </div>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 text-gold-400 hover:text-gold-300 focus:outline-none"
          aria-label="Toggle navigation menu"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-surface-card border-b border-borderGold px-4 pt-3 pb-6 flex flex-col gap-4 animate-in slide-in-from-top-4 duration-200">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="text-sm uppercase tracking-wider text-neutral-200 hover:text-gold-400 py-1"
            >
              {link.label}
            </Link>
          ))}
          <div className="pt-3 border-t border-borderGold/40 flex flex-col gap-2">
            {user ? (
              <>
                <div className="text-xs text-neutral-400">
                  Signed in as: <span className="text-gold-400 font-medium">{user.name}</span>
                </div>
                {user.role === "admin" ? (
                  <Link
                    href="/dashboard/admin"
                    onClick={() => setMobileMenuOpen(false)}
                    className="px-3 py-2 rounded text-xs font-semibold tracking-wider uppercase border border-gold-500/50 text-gold-300 bg-gold-500/10 text-center"
                  >
                    Admin Portal
                  </Link>
                ) : (
                  <Link
                    href="/dashboard/user"
                    onClick={() => setMobileMenuOpen(false)}
                    className="px-3 py-2 rounded text-xs font-semibold tracking-wider uppercase border border-gold-500/40 text-gold-300 bg-surface-raised text-center"
                  >
                    Meri Test Drive
                  </Link>
                )}
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    handleLogout();
                  }}
                  className="px-3 py-2 text-xs uppercase tracking-wider text-red-400 text-left hover:text-red-300"
                >
                  Sign Out
                </button>
              </>
            ) : (
              <div className="flex flex-col gap-2">
                <Link
                  href="/login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-4 py-2 text-xs uppercase tracking-wider text-center text-neutral-300 border border-neutral-700 rounded"
                >
                  Sign In
                </Link>
                <Link
                  href="/signup"
                  onClick={() => setMobileMenuOpen(false)}
                  className="btn-gold px-4 py-2 text-xs uppercase tracking-wider text-center rounded font-semibold"
                >
                  Join Sanctuary
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
