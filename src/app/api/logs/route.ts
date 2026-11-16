import { NextResponse } from "next/server";
import { getServerSession } from "@/lib/auth";
import { getAuditLogs } from "@/lib/db";

export async function GET() {
  try {
    const session = await getServerSession();
    if (!session || session.role !== "admin") {
      return NextResponse.json(
        { error: "Administrative privilege required to inspect security audit ledger" },
        { status: 403 }
      );
    }

    const logs = getAuditLogs(100);
    return NextResponse.json({ logs, count: logs.length });
  } catch (error) {
    console.error("Audit log query error:", error);
    return NextResponse.json({ error: "Failed to retrieve audit log" }, { status: 500 });
  }
}
