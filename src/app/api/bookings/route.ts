import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "@/lib/auth";
import { BookingSchema } from "@/lib/validations";
import {
  getAllBookings,
  getBookingsByUserId,
  createBooking,
} from "@/lib/db";
import { checkRateLimit } from "@/lib/rate-limit";
import { logAuditEvent, getClientIp } from "@/lib/audit";

// GET Bookings: User sees only own bookings; Admin sees all
export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession();
    if (!session) {
      return NextResponse.json({ error: "Authentication required" }, { status: 401 });
    }

    if (session.role === "admin") {
      const all = getAllBookings();
      return NextResponse.json({ bookings: all, count: all.length, role: "admin" });
    } else {
      const userBookings = getBookingsByUserId(session.id);
      return NextResponse.json({ bookings: userBookings, count: userBookings.length, role: "user" });
    }
  } catch (error) {
    console.error("Fetch bookings error:", error);
    return NextResponse.json({ error: "Failed to load bookings" }, { status: 500 });
  }
}

// POST Booking: Creates new test drive reservation
export async function POST(req: NextRequest) {
  const ip = getClientIp(req);
  const rateLimitKey = `booking_${ip}`;

  // Rate Limiting: Max 5 booking attempts per minute
  const rateCheck = checkRateLimit(rateLimitKey, 5, 60000);
  if (!rateCheck.success) {
    logAuditEvent(
      req,
      { email: "anonymous", role: "guest" },
      "RATE_LIMIT_BLOCKED",
      `Rate limit exceeded on test drive booking reservation form from IP ${ip}`,
      "WARNING"
    );
    return NextResponse.json(
      {
        error: `Concierge limit reached: Maximum 5 reservations allowed per minute. Please wait ${rateCheck.resetInSeconds} seconds before submitting again.`,
        retryAfter: rateCheck.resetInSeconds,
      },
      {
        status: 429,
        headers: { "Retry-After": String(rateCheck.resetInSeconds) },
      }
    );
  }

  try {
    const session = await getServerSession();
    if (!session) {
      return NextResponse.json(
        { error: "Authentication required to book a test drive. Please log in or create an account." },
        { status: 401 }
      );
    }

    const body = await req.json();

    // Validate with Zod & Sanitize
    const parsed = BookingSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        {
          error: "Validation failed",
          details: parsed.error.flatten().fieldErrors,
        },
        { status: 400 }
      );
    }

    const data = parsed.data;

    // Create booking
    const booking = createBooking({
      userId: session.id,
      userEmail: session.email,
      userName: data.fullName,
      userPhone: data.phone,
      vehicleId: data.vehicleId,
      vehicleName: data.vehicleName,
      preferredDate: data.preferredDate,
      preferredTime: data.preferredTime,
      driverLicenseNumber: data.driverLicenseNumber,
      specialRequests: data.specialRequests,
    });

    // Record Audit Log in Database
    logAuditEvent(
      req,
      { email: session.email, role: session.role },
      "BOOKING_CREATED",
      `New test drive scheduled for ${data.vehicleName} on ${data.preferredDate} at ${data.preferredTime} by ${session.email} (License: ${data.driverLicenseNumber})`,
      "SUCCESS"
    );

    return NextResponse.json({
      success: true,
      message: "Test drive booking submitted successfully. VIP Concierge will confirm your appointment.",
      booking,
    });
  } catch (error) {
    console.error("Booking submission error:", error);
    return NextResponse.json({ error: "Failed to submit reservation" }, { status: 500 });
  }
}
