import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "@/lib/auth";
import { getUserExportData } from "@/lib/db";
import { logAuditEvent } from "@/lib/audit";

export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession();
    if (!session) {
      return NextResponse.json({ error: "Authentication required to export data." }, { status: 401 });
    }

    const data = getUserExportData(session.id);
    if (!data) {
      return NextResponse.json({ error: "User record not found." }, { status: 404 });
    }

    logAuditEvent(
      req,
      { email: session.email, role: session.role },
      "DATA_EXPORTED",
      `Personal data export package requested by user ${session.email} (GDPR Art. 15 / DPDP)`,
      "SUCCESS"
    );

    return new NextResponse(JSON.stringify(data, null, 2), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        "Content-Disposition": `attachment; filename="veylora-data-${session.id}.json"`,
      },
    });
  } catch (error) {
    console.error("Data export error:", error);
    return NextResponse.json({ error: "Failed to generate personal data export." }, { status: 500 });
  }
}
