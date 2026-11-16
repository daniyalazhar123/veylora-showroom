import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "@/lib/auth";
import { BookingStatusUpdateSchema } from "@/lib/validations";
import { getBookingById, updateBookingStatus } from "@/lib/db";
import { logAuditEvent } from "@/lib/audit";

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getServerSession();
    if (!session) {
      return NextResponse.json({ error: "Authentication required" }, { status: 401 });
    }

    const { id } = await params;
    const body = await req.json();

    const parsed = BookingStatusUpdateSchema.safeParse({ ...body, bookingId: id });
    if (!parsed.success) {
      return NextResponse.json(
        {
          error: "Validation failed",
          details: parsed.error.flatten().fieldErrors,
        },
        { status: 400 }
      );
    }

    const existingBooking = getBookingById(id);
    if (!existingBooking) {
      return NextResponse.json({ error: "Booking record not found" }, { status: 404 });
    }

    const { status, adminNotes } = parsed.data;

    // Role-based authorization:
    // If user: can only cancel their own booking (status: CANCELLED)
    if (session.role !== "admin") {
      if (existingBooking.userId !== session.id) {
        logAuditEvent(
          req,
          { email: session.email, role: session.role },
          "SECURITY_DENIED",
          `Unauthorized attempt by ${session.email} to modify booking ${id} belonging to another client`,
          "FAILURE"
        );
        return NextResponse.json(
          { error: "Access denied. You can only manage your own reservations." },
          { status: 403 }
        );
      }

      if (status !== "CANCELLED") {
        return NextResponse.json(
          { error: "Clients are only permitted to cancel pending reservations." },
          { status: 403 }
        );
      }

      const updated = updateBookingStatus(id, "CANCELLED", "Cancelled by client request");
      logAuditEvent(
        req,
        { email: session.email, role: session.role },
        "BOOKING_CANCELLED",
        `Reservation ${id} for ${existingBooking.vehicleName} cancelled by client ${session.email}`,
        "SUCCESS"
      );

      return NextResponse.json({
        success: true,
        message: "Test drive reservation cancelled",
        booking: updated,
      });
    }

    // Admin branch: can set APPROVED, REJECTED, COMPLETED, CANCELLED
    const updated = updateBookingStatus(
      id,
      status,
      adminNotes || existingBooking.adminNotes,
      session.email
    );

    const actionType =
      status === "APPROVED"
        ? "BOOKING_APPROVED"
        : status === "REJECTED"
        ? "BOOKING_REJECTED"
        : "BOOKING_CANCELLED";

    logAuditEvent(
      req,
      { email: session.email, role: session.role },
      actionType,
      `Booking ${id} for ${existingBooking.vehicleName} status updated to ${status} by Admin ${session.email}. Notes: ${adminNotes || "N/A"}`,
      "SUCCESS"
    );

    return NextResponse.json({
      success: true,
      message: `Reservation successfully updated to ${status}`,
      booking: updated,
    });
  } catch (error) {
    console.error("Booking update error:", error);
    return NextResponse.json({ error: "Failed to update reservation" }, { status: 500 });
  }
}
