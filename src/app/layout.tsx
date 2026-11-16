import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CookieConsentBanner from "@/components/CookieConsentBanner";

export const metadata: Metadata = {
  title: "VEYLORA | Cars & Bikes Luxury Showroom",
  description:
    "Step into VEYLORA - The pinnacle luxury automotive and motorcycle sanctuary. Featuring Civic RS, Corolla Grande, Escalade, Porsche 911 GT3, Panigale V4, CG 125 and bespoke VIP concierge experiences.",
  icons: {
    icon: "/brand/logo.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <body className="min-h-screen bg-background text-neutral-100 antialiased flex flex-col selection:bg-gold-500 selection:text-black">
        <Navbar />
        <main className="flex-1 flex flex-col">{children}</main>
        <Footer />
        <CookieConsentBanner />
      </body>
    </html>
  );
}
