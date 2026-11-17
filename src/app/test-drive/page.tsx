"use client";

import TestDriveBookingScene from "@/app/(showroom)/07-test-drive-booking";
import ErrorBoundary from "@/components/ErrorBoundary";

export default function TestDrivePage() {
  return (
    <ErrorBoundary fallbackTitle="Test Drive Booking Encountered an Issue">
      <main className="w-full min-h-screen bg-[#080809]">
        <TestDriveBookingScene />
      </main>
    </ErrorBoundary>
  );
}
