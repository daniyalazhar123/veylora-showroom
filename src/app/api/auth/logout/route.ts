import { NextRequest, NextResponse } from "next/server";
import { getServerSession, COOKIE_NAME_PROD, COOKIE_NAME_DEV } from "@/lib/auth";
import { logAuditEvent } from "@/lib/audit";

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession();

    if (session) {
      logAuditEvent(
        req,
        { email: session.email, role: session.role },
        "LOGOUT",
        `User ${session.email} safely terminated authenticated session`,
        "SUCCESS"
      );
    }

    const response = NextResponse.json({
      success: true,
      message: "Logged out successfully",
    });

    // Clear cookies with expired date
    const clearOptions = {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax" as const,
      path: "/",
      maxAge: 0,
      expires: new Date(0),
    };

    response.cookies.set(COOKIE_NAME_PROD, "", clearOptions);
    response.cookies.set(COOKIE_NAME_DEV, "", clearOptions);

    return response;
  } catch (error) {
    console.error("Logout error:", error);
    return NextResponse.json({ error: "Logout failed" }, { status: 500 });
  }
}
