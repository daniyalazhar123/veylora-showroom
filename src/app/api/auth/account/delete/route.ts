import { NextRequest, NextResponse } from "next/server";
import { getServerSession, getActiveCookieName } from "@/lib/auth";
import { deleteUser } from "@/lib/db";
import { logAuditEvent } from "@/lib/audit";

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession();
    if (!session) {
      return NextResponse.json({ error: "Authentication required to delete account." }, { status: 401 });
    }

    // Admins cannot delete admin account through this user endpoint
    if (session.role === "admin") {
      return NextResponse.json(
        { error: "Administrative accounts cannot be self-deleted via client portal." },
        { status: 403 }
      );
    }

    const success = deleteUser(session.id);
    if (!success) {
      return NextResponse.json({ error: "User account could not be found or was already deleted." }, { status: 404 });
    }

    logAuditEvent(
      req,
      { email: session.email, role: session.role },
      "ACCOUNT_DELETED",
      `Account and all personal reservations erased for ${session.email} under GDPR Art. 17 Right to Erasure / DPDP.`,
      "SUCCESS"
    );

    const response = NextResponse.json({
      success: true,
      message: "Your VEYLORA membership account and all related personal data have been completely deleted.",
    });

    const cookieName = getActiveCookieName();
    response.cookies.set(cookieName, "", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 0,
      path: "/",
    });

    response.cookies.set("veylora_token", "", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 0,
      path: "/",
    });

    return response;
  } catch (error) {
    console.error("Account deletion error:", error);
    return NextResponse.json({ error: "Failed to process account deletion request." }, { status: 500 });
  }
}
